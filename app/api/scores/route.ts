import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

const COOKIE = 'pai_session'

async function ensureTable() {
  await getSql()`
    CREATE TABLE IF NOT EXISTS game_scores (
      id         SERIAL PRIMARY KEY,
      user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
      game_slug  TEXT NOT NULL,
      score      INTEGER NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
  await getSql()`
    CREATE INDEX IF NOT EXISTS game_scores_slug_score ON game_scores(game_slug, score DESC)
  `
}

// POST — save a score
export async function POST(req: NextRequest) {
  await ensureTable()
  const token = req.cookies.get(COOKIE)?.value
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { slug, score } = await req.json()
  if (!slug || typeof score !== 'number') return NextResponse.json({ error: 'Invalid' }, { status: 400 })

  const userRows = await getSql()`
    SELECT u.id FROM users u JOIN sessions s ON s.user_id = u.id WHERE s.token = ${token}
  `
  if (!userRows[0]) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  const userId = userRows[0].id as number

  await getSql()`
    INSERT INTO game_scores (user_id, game_slug, score) VALUES (${userId}, ${slug}, ${score})
  `
  return NextResponse.json({ ok: true })
}

// GET — leaderboard for a game
export async function GET(req: NextRequest) {
  await ensureTable()
  const slug = new URL(req.url).searchParams.get('slug') ?? 'signal-drop'

  const rows = await getSql()`
    SELECT u.username, MAX(gs.score) AS best
    FROM game_scores gs
    JOIN users u ON u.id = gs.user_id
    WHERE gs.game_slug = ${slug}
    GROUP BY u.username
    ORDER BY best DESC
    LIMIT 10
  `
  return NextResponse.json({ scores: rows })
}
