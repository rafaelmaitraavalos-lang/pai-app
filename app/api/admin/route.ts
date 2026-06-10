import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

export async function GET() {
  const rows = await getSql()`
    SELECT id, username, grade, created_at FROM users ORDER BY id
  `
  return NextResponse.json(rows)
}
