// Durable cost guards for chat, backed by Postgres so they survive redeploys.
// These complement the per-account monthly cap in app/api/chat/route.ts:
// that cap is about fairness (one kid's allowance); these are about the bill —
// a sitewide ceiling on total questions per day, plus a per-IP daily cap for
// visitors who aren't signed in (the monthly cap can't see them).
import { getSql } from './db'

export const GLOBAL_DAILY_LIMIT = 75_000 // whole site, per day — caps the worst-case Groq bill at ~$10/day
export const ANON_DAILY_PER_IP  = 200    // not-signed-in visitors, per IP per day — abuse guard, generous for shared wifi

let tableReady = false
async function ensureTable() {
  if (tableReady) return
  await getSql()`
    CREATE TABLE IF NOT EXISTS chat_counters (
      day   DATE NOT NULL,
      scope TEXT NOT NULL,
      count INTEGER NOT NULL DEFAULT 1,
      PRIMARY KEY (day, scope)
    )
  `
  tableReady = true
}

export type BreakerCheck =
  | { ok: true }
  | { ok: false; reason: 'global' | 'anon' }

// Atomically bump today's sitewide counter (and, for anonymous visitors, their
// per-IP counter), then report whether any ceiling is exceeded. Counting the
// refused request is fine — refusals cost nothing and rows expire at midnight UTC.
export async function bumpAndCheck(anonIp: string | null): Promise<BreakerCheck> {
  await ensureTable()
  const rows = (anonIp
    ? await getSql()`
        INSERT INTO chat_counters (day, scope)
        VALUES (CURRENT_DATE, 'global'), (CURRENT_DATE, ${`anon:${anonIp}`})
        ON CONFLICT (day, scope) DO UPDATE SET count = chat_counters.count + 1
        RETURNING scope, count
      `
    : await getSql()`
        INSERT INTO chat_counters (day, scope)
        VALUES (CURRENT_DATE, 'global')
        ON CONFLICT (day, scope) DO UPDATE SET count = chat_counters.count + 1
        RETURNING scope, count
      `) as { scope: string; count: number }[]

  for (const r of rows) {
    if (r.scope === 'global' && r.count > GLOBAL_DAILY_LIMIT) return { ok: false, reason: 'global' }
    if (r.scope.startsWith('anon:') && r.count > ANON_DAILY_PER_IP) return { ok: false, reason: 'anon' }
  }
  return { ok: true }
}
