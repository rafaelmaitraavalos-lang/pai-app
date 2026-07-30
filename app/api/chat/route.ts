import { NextRequest, NextResponse } from 'next/server'
import { searchCorpus } from '../../../lib/chatCorpus'

const GROQ_API_KEY = process.env.GROQ_API_KEY ?? ''
const MODEL        = process.env.GROQ_MODEL ?? 'llama-3.1-8b-instant'

// ── Server-side rate limiter (in-memory, per IP) ──────────────────────────
// Resets on redeploy — a soft guard against runaway usage, not security.
const ipBucket = new Map<string, { count: number; resetAt: number }>()
const SERVER_LIMIT_PER_HOUR = 120   // per IP
const SERVER_WINDOW_MS      = 60 * 60 * 1000

function checkServerRate(ip: string): boolean {
  const now  = Date.now()
  const slot = ipBucket.get(ip)
  if (!slot || now > slot.resetAt) {
    ipBucket.set(ip, { count: 1, resetAt: now + SERVER_WINDOW_MS })
    return true
  }
  if (slot.count >= SERVER_LIMIT_PER_HOUR) return false
  slot.count++
  return true
}

const MSG = {
  en: {
    rateLimited: 'You\'ve sent a lot of questions today! Come back in an hour and keep exploring.',
    notConfigured: 'Chat is not configured yet — GROQ_API_KEY is missing.',
    groqDown: 'PAI is taking a quick break. Try again in a moment!',
    unreachable: 'Could not reach PAI right now. Check your connection!',
    noResponse: 'No response from PAI.',
  },
  pt: {
    rateLimited: 'Você já fez muitas perguntas hoje! Volte em uma hora para continuar explorando.',
    notConfigured: 'O chat ainda não está configurado — falta a GROQ_API_KEY.',
    groqDown: 'O PAI está fazendo uma pausa rápida. Tente de novo em instantes!',
    unreachable: 'Não foi possível falar com o PAI agora. Verifique sua conexão!',
    noResponse: 'Sem resposta do PAI.',
  },
} as const

export async function POST(req: NextRequest) {
  const { message, lessonTitle, currentStop, allStops, history, track, lang, lessonId } = await req.json()
  const L = lang === 'pt' ? MSG.pt : MSG.en

  // Rate limit by IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  if (!checkServerRate(ip)) {
    return NextResponse.json({ reply: L.rateLimited }, { status: 429 })
  }

  if (!GROQ_API_KEY) {
    return NextResponse.json({ reply: L.notConfigured }, { status: 503 })
  }

  // Build curriculum context — current slide + rest of this lesson, always included.
  const currentContext = `CURRENT SLIDE — "${currentStop.title}"\n${currentStop.body}`
  const otherContext   = (allStops as { title: string; body: string }[])
    .filter((s: { title: string }) => s.title !== currentStop.title)
    .map((s: { title: string; body: string }) => `"${s.title}": ${s.body}`)
    .join('\n\n')

  // Whole-curriculum retrieval — only pull in OTHER lessons if they're actually
  // relevant to this question, so we're not pasting the entire app every time.
  let otherLessonsContext = ''
  try {
    const matches = searchCorpus(message, lang === 'pt' ? 'pt' : 'en', Number(lessonId), 4)
    if (matches.length) {
      otherLessonsContext = matches
        .map(m => `[Lesson: "${m.lessonTitle}" — Slide: "${m.slideTitle}"]\n${m.text}`)
        .join('\n\n')
    }
  } catch (e) {
    console.error('Corpus search failed:', e)
  }

  const audienceRules = track === 'elementary'
    ? `AUDIENCE: Elementary school kids (ages 6–11).
- Use very simple words a 7-year-old would understand.
- Maximum 2 short sentences. Never more.
- Warm and encouraging tone. No jargon.
- No emojis.`
    : track === 'middle'
    ? `AUDIENCE: Middle school students (ages 11–14).
- Clear, conversational language. 2–3 sentences max.
- No emojis.`
    : `AUDIENCE: High school students (ages 14+).
- Clear and direct. Up to 3–4 sentences if needed.
- No emojis.`

  const languageRule = lang === 'pt'
    ? 'LANGUAGE: Respond ONLY in Brazilian Portuguese, regardless of what language the student writes in.'
    : 'LANGUAGE: Respond ONLY in English, regardless of what language the student writes in.'

  const notInCurriculumLine = lang === 'pt'
    ? 'Isso não está no curso — mas é uma ótima pergunta!'
    : 'That is not in this course — but it is a great question!'

  const systemPrompt = `You are PAI, an AI tutor inside a course called PAI for Kids.
A student is reading a lesson called "${lessonTitle}".

${audienceRules}
${languageRule}

CONTENT RULES:
- Answer ONLY using the curriculum content below (the current slide, the rest of this lesson, and — if relevant to the question — the other lesson excerpts provided). No outside knowledge.
- The "OTHER RELEVANT LESSONS" section is only sometimes useful — ignore it if it doesn't actually help answer the question.
- If the answer is not in any of the content below, say exactly: "${notInCurriculumLine}"
- Never make up facts, people, dates, or events beyond what is provided.
- No emojis anywhere in your response.

=== CURRENT LESSON ===
${currentContext}

--- REST OF THIS LESSON ---
${otherContext}
=== END CURRENT LESSON ===

=== OTHER RELEVANT LESSONS (use only if helpful) ===
${otherLessonsContext || '(none found for this question)'}
=== END ===`

  const messages = [
    { role: 'system', content: systemPrompt },
    ...(history as { role: string; content: string }[])
      .filter((m: { role: string }) => m.role !== 'system')
      .slice(-8),  // last 4 turns
  ]

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens:  250,
        temperature: 0.4,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Groq error:', err)
      return NextResponse.json({ reply: L.groqDown }, { status: 502 })
    }

    const data  = await res.json()
    const reply = data?.choices?.[0]?.message?.content ?? L.noResponse
    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json({ reply: L.unreachable }, { status: 503 })
  }
}
