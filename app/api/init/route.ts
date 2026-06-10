import { NextResponse } from 'next/server'
import { getSql } from "@/lib/db"

// GET /api/init — run once to create DB tables (dev only)
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Run manually in production' }, { status: 403 })
  }

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
  return NextResponse.json({ ok: true, message: 'Tables created' })
}
