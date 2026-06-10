import { NextRequest, NextResponse } from 'next/server'
import { getSql } from "@/lib/db"

const COOKIE = 'pai_session'

async function ensureTables() {
  await getSql()`CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username TEXT UNIQUE NOT NULL, lang TEXT NOT NULL DEFAULT 'en', grade TEXT, goal TEXT, level TEXT, frequency TEXT, usage_data JSONB DEFAULT '[]'::jsonb, progress JSONB DEFAULT '{}'::jsonb, created_at TIMESTAMPTZ DEFAULT NOW())`
  await getSql()`CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, created_at TIMESTAMPTZ DEFAULT NOW())`
}

// GET /api/progress — load progress for current user
export async function GET(req: NextRequest) {
  await ensureTables()
  const token = req.cookies.get(COOKIE)?.value
  if (!token) return NextResponse.json({ progress: {} })

  const rows = await getSql()`
    SELECT u.progress FROM users u
    JOIN sessions s ON s.user_id = u.id
    WHERE s.token = ${token}
  `
  return NextResponse.json({ progress: rows[0]?.progress ?? {} })
}

// POST /api/progress — save progress for current user
export async function POST(req: NextRequest) {
  await ensureTables()
  const token = req.cookies.get(COOKIE)?.value
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { progress } = await req.json()
  if (!progress || typeof progress !== 'object') {
    return NextResponse.json({ error: 'Invalid progress' }, { status: 400 })
  }

  await getSql()`
    UPDATE users SET progress = ${JSON.stringify(progress)}::jsonb
    FROM sessions
    WHERE sessions.token = ${token} AND users.id = sessions.user_id
  `
  return NextResponse.json({ ok: true })
}
