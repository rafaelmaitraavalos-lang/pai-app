import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

let _sql: NeonQueryFunction<false, false> | null = null

function isValidPostgresUrl(u: string | undefined): u is string {
  return !!u && /^postgres(ql)?:\/\//.test(u)
}

// Local dev on this machine has no readable Neon credentials (Vercel stores
// them as write-only "sensitive" vars, so `vercel env pull` yields the literal
// string "[SENSITIVE]"). In that case, and only outside production, back the
// same tagged-template interface with an embedded PGlite database persisted
// to .dev-db/ so signup/login/progress flows work offline.
function makePgliteSql(): NeonQueryFunction<false, false> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PGlite } = require('@electric-sql/pglite')
  const db = new PGlite('./.dev-db')
  const tag = async (strings: TemplateStringsArray, ...values: unknown[]) => {
    const text = strings.reduce((acc, s, i) => acc + '$' + i + s)
    const res = await db.query(text, values)
    return res.rows
  }
  console.warn('[db] DATABASE_URL missing or unreadable — using local PGlite dev database (.dev-db/)')
  return tag as unknown as NeonQueryFunction<false, false>
}

export function getSql(): NeonQueryFunction<false, false> {
  if (!_sql) {
    if (isValidPostgresUrl(process.env.DATABASE_URL)) {
      _sql = neon(process.env.DATABASE_URL)
    } else if (process.env.NODE_ENV !== 'production') {
      _sql = makePgliteSql()
    } else {
      throw new Error('DATABASE_URL is not set — add Neon via Vercel Storage')
    }
  }
  return _sql
}
