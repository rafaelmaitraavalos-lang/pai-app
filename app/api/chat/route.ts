import { NextRequest, NextResponse } from 'next/server'
import { searchCorpus } from '../../../lib/chatCorpus'
import { getSql } from '../../../lib/db'
import { bumpAndCheck } from '../../../lib/chatLimits'

const GROQ_API_KEY = process.env.GROQ_API_KEY ?? ''
const MODEL        = process.env.GROQ_MODEL ?? 'llama-3.1-8b-instant'
const SESSION_COOKIE = 'pai_session'

// ── Per-account monthly cap (the real limit — one row per user per month) ──
const MONTHLY_LIMIT = 50

async function ensureChatUsageTable() {
  await getSql()`
    CREATE TABLE IF NOT EXISTS chat_usage (
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      month   TEXT NOT NULL,
      count   INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (user_id, month)
    )
  `
}

function currentMonthKey(): string {
  return new Date().toISOString().slice(0, 7) // "2026-07"
}

async function getUserIdFromSession(req: NextRequest): Promise<number | null> {
  const token = req.cookies.get(SESSION_COOKIE)?.value
  if (!token) return null
  const rows = await getSql()`SELECT user_id FROM sessions WHERE token = ${token}`
  return rows[0]?.user_id ?? null
}

async function getMonthlyCount(userId: number, month: string): Promise<number> {
  const rows = await getSql()`SELECT count FROM chat_usage WHERE user_id = ${userId} AND month = ${month}`
  return rows[0]?.count ?? 0
}

async function incrementMonthlyCount(userId: number, month: string): Promise<number> {
  const rows = await getSql()`
    INSERT INTO chat_usage (user_id, month, count) VALUES (${userId}, ${month}, 1)
    ON CONFLICT (user_id, month) DO UPDATE SET count = chat_usage.count + 1
    RETURNING count
  `
  return rows[0]?.count ?? 1
}

// ── Per-IP burst guard (in-memory, secondary — resets on redeploy) ─────────
// High on purpose: a whole classroom on shared wifi shows up as ONE IP, so this
// only needs to stop scripted hammering — per-person fairness is the account
// cap's job, and the sitewide breaker in lib/chatLimits.ts caps total cost.
const ipBucket = new Map<string, { count: number; resetAt: number }>()
const SERVER_LIMIT_PER_HOUR = 600   // per IP
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
    monthlyLimitReached: `You've used all ${MONTHLY_LIMIT} of your questions for this month. More open up next month!`,
    anonLimit: 'You\'ve asked a lot of questions today! Sign in to keep track of your own questions, or come back tomorrow.',
    siteBusy: 'So many students are chatting with me today that I need to rest until tomorrow. The lessons, quizzes, and games are all still open!',
    notConfigured: 'Chat is not configured yet — GROQ_API_KEY is missing.',
    groqDown: 'PAI is taking a quick break. Try again in a moment!',
    unreachable: 'Could not reach PAI right now. Check your connection!',
    noResponse: 'No response from PAI.',
  },
  pt: {
    rateLimited: 'Você já fez muitas perguntas hoje! Volte em uma hora para continuar explorando.',
    monthlyLimitReached: `Você já usou todas as suas ${MONTHLY_LIMIT} perguntas deste mês. Mais perguntas liberam no próximo mês!`,
    anonLimit: 'Você já fez muitas perguntas hoje! Entre na sua conta para acompanhar suas próprias perguntas, ou volte amanhã.',
    siteBusy: 'Tantos estudantes estão conversando comigo hoje que preciso descansar até amanhã. As aulas, os quizzes e os jogos continuam abertos!',
    notConfigured: 'O chat ainda não está configurado — falta a GROQ_API_KEY.',
    groqDown: 'O PAI está fazendo uma pausa rápida. Tente de novo em instantes!',
    unreachable: 'Não foi possível falar com o PAI agora. Verifique sua conexão!',
    noResponse: 'Sem resposta do PAI.',
  },
} as const

export async function POST(req: NextRequest) {
  const { message, lessonTitle, currentStop, allStops, history, track, lang, lessonId } = await req.json()
  const L = lang === 'pt' ? MSG.pt : MSG.en

  // Burst guard by IP (secondary — the real cap is per-account below)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  if (!checkServerRate(ip)) {
    return NextResponse.json({ reply: L.rateLimited }, { status: 429 })
  }

  // Per-account monthly cap — 50 questions/month per person, tracked server-side
  let userId: number | null = null
  let remaining = MONTHLY_LIMIT
  try {
    await ensureChatUsageTable()
    userId = await getUserIdFromSession(req)
    if (userId) {
      const used = await getMonthlyCount(userId, currentMonthKey())
      if (used >= MONTHLY_LIMIT) {
        return NextResponse.json({ reply: L.monthlyLimitReached, remaining: 0 }, { status: 429 })
      }
      remaining = MONTHLY_LIMIT - used
    }
  } catch (e) {
    console.error('Chat usage check failed:', e)
  }

  // Sitewide daily circuit breaker + anonymous per-IP cap (Postgres — survives
  // redeploys; see lib/chatLimits.ts). If the counter is unreachable we let the
  // message through: chat should not die when the database does, and the IP
  // burst guard above still applies.
  try {
    const breaker = await bumpAndCheck(userId == null ? ip : null)
    if (!breaker.ok) {
      return NextResponse.json(
        breaker.reason === 'global'
          ? { reply: L.siteBusy }
          : { reply: L.anonLimit, remaining: 0 },
        { status: 429 },
      )
    }
  } catch (e) {
    console.error('Chat breaker check failed (allowing message):', e)
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

    if (userId) {
      try {
        const used = await incrementMonthlyCount(userId, currentMonthKey())
        remaining = Math.max(0, MONTHLY_LIMIT - used)
      } catch (e) {
        console.error('Chat usage increment failed:', e)
      }
    }

    return NextResponse.json({ reply, remaining })
  } catch {
    return NextResponse.json({ reply: L.unreachable }, { status: 503 })
  }
}
