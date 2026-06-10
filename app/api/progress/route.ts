import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

const COOKIE = 'pai_session'

// GET /api/progress — load progress for current user
export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE)?.value
  if (!token) return NextResponse.json({ progress: {} })

  const rows = await sql`
    SELECT u.progress FROM users u
    JOIN sessions s ON s.user_id = u.id
    WHERE s.token = ${token}
  `
  return NextResponse.json({ progress: rows[0]?.progress ?? {} })
}

// POST /api/progress — save progress for current user
export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE)?.value
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { progress } = await req.json()
  if (!progress || typeof progress !== 'object') {
    return NextResponse.json({ error: 'Invalid progress' }, { status: 400 })
  }

  await sql`
    UPDATE users SET progress = ${JSON.stringify(progress)}::jsonb
    FROM sessions
    WHERE sessions.token = ${token} AND users.id = sessions.user_id
  `
  return NextResponse.json({ ok: true })
}
