import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { randomUUID } from 'crypto'

const COOKIE = 'pai_session'
const MAX_AGE = 60 * 60 * 24 * 365 // 1 year

// POST /api/auth — login or create account
export async function POST(req: NextRequest) {
  const { username, lang, grade, goal, level, frequency, usage } = await req.json()

  if (!username || typeof username !== 'string') {
    return NextResponse.json({ error: 'Username required' }, { status: 400 })
  }

  const clean = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '')
  if (!clean) {
    return NextResponse.json({ error: 'Invalid username' }, { status: 400 })
  }

  // Find or create user
  let user = (await sql`SELECT * FROM users WHERE username = ${clean}`)[0]

  if (!user) {
    // New user — create with profile data
    const rows = await sql`
      INSERT INTO users (username, lang, grade, goal, level, frequency, usage_data)
      VALUES (${clean}, ${lang ?? 'en'}, ${grade ?? null}, ${goal ?? null},
              ${level ?? null}, ${frequency ?? null}, ${JSON.stringify(usage ?? [])})
      RETURNING *
    `
    user = rows[0]
  }

  // Create session
  const token = randomUUID()
  await sql`INSERT INTO sessions (token, user_id) VALUES (${token}, ${user.id})`

  const res = NextResponse.json({ user: sanitize(user) })
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  })
  return res
}

// GET /api/auth — validate session and return current user
export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE)?.value
  if (!token) return NextResponse.json({ user: null })

  const rows = await sql`
    SELECT u.* FROM users u
    JOIN sessions s ON s.user_id = u.id
    WHERE s.token = ${token}
  `
  if (!rows[0]) return NextResponse.json({ user: null })
  return NextResponse.json({ user: sanitize(rows[0]) })
}

// DELETE /api/auth — logout
export async function DELETE(req: NextRequest) {
  const token = req.cookies.get(COOKIE)?.value
  if (token) await sql`DELETE FROM sessions WHERE token = ${token}`
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(COOKIE)
  return res
}

function sanitize(u: Record<string, unknown>) {
  return {
    id: u.id,
    username: u.username,
    lang: u.lang,
    grade: u.grade,
    goal: u.goal,
    level: u.level,
    frequency: u.frequency,
    usage: u.usage_data,
    progress: u.progress ?? {},
  }
}
