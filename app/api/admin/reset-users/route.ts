import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

const SECRET = process.env.ADMIN_RESET_SECRET ?? 'pai-reset-2026'

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const users = await getSql()`SELECT username, grade, created_at FROM users ORDER BY created_at DESC`
  return NextResponse.json({ count: users.length, users })
}

export async function DELETE(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const sessions = await getSql()`DELETE FROM sessions RETURNING id`
  const users    = await getSql()`DELETE FROM users RETURNING username`
  return NextResponse.json({
    deleted: { sessions: sessions.length, users: users.map((u: Record<string, string>) => u.username) },
  })
}
