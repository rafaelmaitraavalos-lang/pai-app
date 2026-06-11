import { NextRequest, NextResponse } from 'next/server'
import { getSql } from "@/lib/db"
import { randomUUID } from 'crypto'

const COOKIE  = 'pai_session'
const MAX_AGE = 60 * 60 * 24 * 365 // 1 year

// Auto-create tables on first use — idempotent
async function ensureTables() {
  await getSql()`
    CREATE TABLE IF NOT EXISTS users (
      id         SERIAL PRIMARY KEY,
      username   TEXT UNIQUE NOT NULL,
      lang       TEXT NOT NULL DEFAULT 'en',
      grade      TEXT,
      goal       TEXT,
      level      TEXT,
      frequency  TEXT,
      usage_data JSONB DEFAULT '[]'::jsonb,
      progress   JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
  await getSql()`
    CREATE TABLE IF NOT EXISTS sessions (
      token      TEXT PRIMARY KEY,
      user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

// POST /api/auth — login or create account
export async function POST(req: NextRequest) {
  await ensureTables()

  const { username, lang, grade, goal, level, frequency, usage, mode } = await req.json()

  if (!username || typeof username !== 'string') {
    return NextResponse.json({ error: 'Username required' }, { status: 400 })
  }

  const clean = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '')
  if (!clean) {
    return NextResponse.json({ error: 'Invalid username' }, { status: 400 })
  }

  // Find or create user
  let user = (await getSql()`SELECT * FROM users WHERE username = ${clean}`)[0]
  const isNew = !user

  // Mode constraints — enforce signup vs login intent
  if (mode === 'signup' && !isNew) {
    return NextResponse.json({ error: 'That username is taken' }, { status: 409 })
  }
  if (mode === 'login' && isNew) {
    return NextResponse.json({ error: 'No account with that username' }, { status: 404 })
  }

  if (!user) {
    const rows = await getSql()`
      INSERT INTO users (username, lang, grade, goal, level, frequency, usage_data)
      VALUES (${clean}, ${lang ?? 'en'}, ${grade ?? null}, ${goal ?? null},
              ${level ?? null}, ${frequency ?? null}, ${JSON.stringify(usage ?? [])})
      RETURNING *
    `
    user = rows[0]
  } else if (grade) {
    // Returning user completing / updating profile — save it
    const rows = await getSql()`
      UPDATE users SET
        lang       = ${lang ?? user.lang},
        grade      = ${grade},
        goal       = ${goal ?? user.goal},
        level      = ${level ?? user.level},
        frequency  = ${frequency ?? user.frequency},
        usage_data = ${JSON.stringify(usage ?? user.usage_data)}::jsonb
      WHERE id = ${user.id}
      RETURNING *
    `
    user = rows[0]
  }

  // Create session token
  const token = randomUUID()
  await getSql()`INSERT INTO sessions (token, user_id) VALUES (${token}, ${user.id})`

  const res = NextResponse.json({ user: sanitize(user), isNew })
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  })
  return res
}

// GET /api/auth — validate session, return current user
export async function GET(req: NextRequest) {
  await ensureTables()
  const token = req.cookies.get(COOKIE)?.value
  if (!token) return NextResponse.json({ user: null })

  const rows = await getSql()`
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
  if (token) await getSql()`DELETE FROM sessions WHERE token = ${token}`
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(COOKIE)
  return res
}

function sanitize(u: Record<string, unknown>) {
  return {
    id:        u.id,
    username:  u.username,
    lang:      u.lang,
    grade:     u.grade,
    goal:      u.goal,
    level:     u.level,
    frequency: u.frequency,
    usage:     u.usage_data,
    progress:  u.progress ?? {},
  }
}
