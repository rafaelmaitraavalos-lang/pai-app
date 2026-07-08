import { NextRequest, NextResponse } from 'next/server'

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

export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  if (!checkServerRate(ip)) {
    return NextResponse.json(
      { reply: 'You\'ve sent a lot of questions today! Come back in an hour and keep exploring. 🐷' },
      { status: 429 }
    )
  }

  if (!GROQ_API_KEY) {
    return NextResponse.json(
      { reply: 'Chat is not configured yet — GROQ_API_KEY is missing.' },
      { status: 503 }
    )
  }

  const { message, lessonTitle, currentStop, allStops, history } = await req.json()

  // Build curriculum context
  const currentContext = `CURRENT SLIDE — "${currentStop.title}"\n${currentStop.body}`
  const otherContext   = (allStops as { title: string; body: string }[])
    .filter((s: { title: string }) => s.title !== currentStop.title)
    .map((s: { title: string; body: string }) => `"${s.title}": ${s.body}`)
    .join('\n\n')

  const systemPrompt = `You are PAI, a friendly AI tutor built into an AI literacy course called PAI for Kids.
A student is reading a lesson called "${lessonTitle}".

RULES (follow strictly):
- Answer ONLY using the curriculum content below. No outside knowledge.
- If the answer isn't in the content, say: "That's not in this lesson — great question to explore later!"
- Be warm, encouraging, and age-appropriate. Keep it to 2–3 sentences max unless a longer answer is clearly needed.
- Never make up facts, people, or events beyond the provided text.

=== CURRICULUM CONTENT ===
${currentContext}

--- REST OF THIS LESSON ---
${otherContext}
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
        max_tokens:  200,
        temperature: 0.4,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Groq error:', err)
      return NextResponse.json({ reply: 'PAI is taking a quick break. Try again in a moment!' }, { status: 502 })
    }

    const data  = await res.json()
    const reply = data?.choices?.[0]?.message?.content ?? 'No response from PAI.'
    return NextResponse.json({ reply })
  } catch (e) {
    return NextResponse.json({ reply: 'Could not reach PAI right now. Check your connection!' }, { status: 503 })
  }
}
