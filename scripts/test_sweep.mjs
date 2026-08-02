// Absence sweep — every route × every persona, asserting what must NOT be there.
//
// Failure class B from QA-DOCTRINE-2026-08-01.md: the old suites asserted the
// right thing exists ("page renders"), never that the wrong thing is absent —
// which is how English chrome lived on Portuguese pages for weeks. This sweep
// is mechanical: token lists and invariants, no judgment, no priors.
//
// Per (route, persona) it asserts:
//   • no page errors / console errors (small documented allowlist)
//   • not blank (≥ 40 chars of text, ≥ 1 interactive element)
//   • no horizontal overflow
//   • no dev artifacts: [object Object], \bundefined\b, \bNaN\b, [SENSITIVE],
//     lorem ipsum, TODO:, .tsx, app/components/, app/data/
//   • no wrong-language CHROME tokens (content words like "machine learning"
//     inside PT prose are fine; "Sign out" / "Up next" / "Módulos" are not)
//   • wrong-track personas end up on THEIR home, not on the page
//   • /games/* pages show the fixed Exit control
//
// The route list is GENERATED (filesystem for games, id ranges from
// app/data/track.ts for content) — nothing hand-remembered.
//
// Usage:
//   node scripts/test_sweep.mjs --base http://localhost:3200          # trimmed
//   node scripts/test_sweep.mjs --base http://localhost:3200 --full   # all personas
//   node scripts/test_sweep.mjs --only /middle/world/261

import { chromium } from 'playwright'
import { readdirSync, readFileSync } from 'fs'

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : d }
const BASE = arg('base', 'http://localhost:3000')
const FULL = process.argv.includes('--full')
const ONLY = arg('only', null)

// ── Track model (mirrors app/data/track.ts — keep in sync) ──────────────────

const lessonTrack = id =>
  id >= 9001 ? 'shared' :
  id >= 311 && id <= 358 ? 'middle-pt' :
  id >= 211 && id <= 258 ? 'middle-en' :
  id >= 161 && id <= 164 ? 'gone' :
  id >= 131 && id <= 158 ? 'elem-pt' :
  id >= 101 && id <= 128 ? 'elem-en' : 'high'

const worldTrack = id =>
  id >= 261 && id <= 265 ? 'middle-pt' :
  id >= 201 && id <= 205 ? 'middle-en' :
  id >= 104 && id <= 106 ? 'elem-pt' :
  id >= 101 && id <= 103 ? 'elem-en' : 'high'

const HOME = {
  'elem-en': '/elementary/home', 'elem-pt': '/elementary/home',
  'middle-en': '/middle/home', 'middle-pt': '/elementary/middle-pt',
  high: '/home',
}

const PERSONAS = {
  anon:        null,
  'en-elem':   { lang: 'en', grade: 'elem',   track: 'elem-en' },
  'en-middle': { lang: 'en', grade: 'middle', track: 'middle-en' },
  'en-high':   { lang: 'en', grade: 'high',   track: 'high' },
  'pt-fund1':  { lang: 'pt', grade: 'fund1',  track: 'elem-pt' },
  'pt-fund2':  { lang: 'pt', grade: 'fund2',  track: 'middle-pt' },
  'pt-medio':  { lang: 'pt', grade: 'medio',  track: 'high' },
}

// ── Route inventory (generated) ─────────────────────────────────────────────

// Lesson ids parsed from the ACTUAL data files. (First version used the id
// ranges written in elementary.ts comments — which turned out to overcount:
// world 103 has 2 lessons, not 8. Comments are priors; files are evidence.)
const dataDir = new URL('../app/data/', import.meta.url)
const elemSrc = readFileSync(new URL('elementary.ts', dataDir), 'utf-8')
const importOf = {}
for (const m of elemSrc.matchAll(/import (_\w+) from '\.\/lessons\/(\w+)'/g)) importOf[m[1]] = m[2]
function lessonCount(file) {
  const src = readFileSync(new URL(`lessons/${file}.ts`, dataDir), 'utf-8')
  return [...src.matchAll(/^  (\d+): \{/gm)].length
}
const ELEM_LESSONS = []
for (const m of elemSrc.matchAll(/remap\((_\w+), (\d+), \d+\)/g)) {
  const n = lessonCount(importOf[m[1]])
  for (let i = 0; i < n; i++) ELEM_LESSONS.push(parseInt(m[2]) + i)
}
const MIDDLE_LESSONS = []
for (const m of elemSrc.matchAll(/const W\d+_LESSONS = (_wm_\w+)/g)) {
  const src = readFileSync(new URL(`lessons/${importOf[m[1]]}.ts`, dataDir), 'utf-8')
  for (const id of src.matchAll(/^  (\d+): \{/gm)) MIDDLE_LESSONS.push(parseInt(id[1]))
}

const GAME_SLUGS = readdirSync(new URL('../app/games', import.meta.url), { withFileTypes: true })
  .filter(d => d.isDirectory()).map(d => d.name)

const routes = []
routes.push({ path: '/', track: 'onboarding' })
routes.push({ path: '/about', track: 'shared' })
for (const t of ['elem-en', 'middle-en', 'high']) routes.push({ path: HOME[t], track: t === 'elem-en' ? 'elem' : t })
routes.push({ path: '/elementary/middle-pt', track: 'middle-pt' })
routes.push({ path: '/lessons', track: 'high' })
for (let w = 2; w <= 8; w++) routes.push({ path: `/world/${w}`, track: 'high' })
for (const w of [101, 102, 103, 104, 105, 106]) routes.push({ path: `/elementary/world/${w}`, track: worldTrack(w) })
for (const w of [201, 202, 203, 204, 205, 261, 262, 263, 264, 265]) routes.push({ path: `/middle/world/${w}`, track: worldTrack(w) })
for (let l = 1; l <= 15; l++) routes.push({ path: `/lesson/${l}`, track: 'high' })
for (const l of ELEM_LESSONS) routes.push({ path: `/elementary/lesson/${l}`, track: lessonTrack(l) })
for (const l of MIDDLE_LESSONS) routes.push({ path: `/elementary/lesson/${l}`, track: lessonTrack(l) })
routes.push({ path: '/games', track: 'signed', game: false })
for (const g of GAME_SLUGS) routes.push({ path: `/games/${g}`, track: 'signed', game: true })

// 'elem' = the shared elementary home (both elem tracks belong).
// 'signed' = any signed-in student, but NOT anonymous (games hub + games).
const belongs = (routeTrack, personaTrack) =>
  routeTrack === 'shared' || routeTrack === 'onboarding' ? true :
  routeTrack === 'signed' ? !!personaTrack :
  routeTrack === 'elem' ? personaTrack === 'elem-en' || personaTrack === 'elem-pt' :
  routeTrack === personaTrack

// ── Token lists ─────────────────────────────────────────────────────────────

const DEV_TOKENS = [/\[object Object\]/, /\bundefined\b/, /\bNaN\b/, /\[SENSITIVE\]/i,
  /lorem ipsum/i, /TODO:/, /\.tsx\b/, /app\/components\//, /app\/data\//]

const EN_CHROME = [/Sign out/i, /Up next/i, /Start here/i, /Your Worlds/i, /Take the quiz/i,
  /Lesson complete/i, /World complete/i, /Mistakes remaining/i, /Play again/i, /How to play/i,
  /Leave game/i, /← Home/i, /← World/i, /Next slide/i, /\bModules\b/i, /\bIntermediate\b/]

const PT_CHROME = [/\bSair\b/, /A seguir/i, /Começar aqui/i, /Seus Mundos/i, /Fazer o questionário/i,
  /Aula concluída/i, /Mundo concluído/i, /Erros restantes/i, /Jogar de novo/i, /Como jogar/i,
  /← Início/i, /← Mundo/i, /Próximo slide/i, /\bMódulos\b/i, /\bIntermediário\b/i]

// Expected chrome language for (route, persona): content language on
// single-language pages, persona language on shared/bilingual ones.
function expectedLang(route, persona) {
  if (route.track === 'elem-pt' || route.track === 'middle-pt') return 'pt'
  if (route.track === 'elem-en' || route.track === 'middle-en') return 'en'
  if (route.track === 'onboarding') return null            // bilingual by design
  if (route.track === 'high' || route.track === 'shared' || route.track === 'elem' || route.track === 'signed')
    return persona ? persona.lang : 'en'
  return null
}

// ── Runner ──────────────────────────────────────────────────────────────────

const failures = []
let checked = 0

function personasFor(route, i) {
  if (FULL) return Object.keys(PERSONAS)
  const owners = Object.entries(PERSONAS).filter(([, p]) => p && belongs(route.track, p.track)).map(([k]) => k)
  const strangers = Object.entries(PERSONAS).filter(([, p]) => p && !belongs(route.track, p.track)).map(([k]) => k)
  const picks = new Set(['anon'])
  if (route.track === 'shared' || route.track === 'onboarding' || route.track === 'high' || route.track === 'elem' || route.track === 'signed') {
    // bilingual surfaces: one EN and one PT persona
    picks.add(route.track === 'high' ? 'en-high' : 'en-elem')
    picks.add(route.track === 'high' ? 'pt-medio' : 'pt-fund1')
  } else {
    if (owners.length) picks.add(owners[0])
    if (strangers.length) picks.add(strangers[i % strangers.length])  // rotate strangers
  }
  return [...picks]
}

const browser = await chromium.launch()

for (const [personaName, persona] of Object.entries(PERSONAS)) {
  const wanted = routes.filter((r, i) => (!ONLY || r.path === ONLY) && personasFor(r, i).includes(personaName))
  if (!wanted.length) continue
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: persona?.lang === 'pt' ? 'pt-BR' : 'en-US' })
  if (persona) {
    await ctx.addInitScript(p => {
      try {
      localStorage.setItem('pai_lang', p.lang)
      localStorage.setItem('pai_grade', p.grade)
      localStorage.setItem('pai_username', 'zz_sweep_bot')
      localStorage.setItem('pai_onboarding_done', 'true')
      } catch {} // transitional about:blank documents deny storage access
    }, persona)
  }
  const page = await ctx.newPage()
  const errs = []
  page.on('pageerror', e => errs.push('pageerror: ' + String(e).slice(0, 160)))
  page.on('console', m => {
    if (m.type() !== 'error') return
    // Semantic 4xx replies from our own REST endpoints are not defects.
    if (/Failed to load resource/.test(m.text()) && /\/api\//.test(m.location()?.url ?? '')) return
    errs.push('console: ' + m.text().slice(0, 160) + ' @ ' + (m.location()?.url ?? '?').slice(-60))
  })

  for (const route of wanted) {
    errs.length = 0
    const fail = msg => failures.push({ persona: personaName, path: route.path, msg })
    try {
      await page.goto(BASE + route.path, { waitUntil: 'domcontentloaded', timeout: 45000 })
      await page.waitForTimeout(1100)   // guards + redirects settle
      checked++

      const finalPath = new URL(page.url()).pathname
      const text = (await page.evaluate(() => document.body.innerText)).replace(/\s+/g, ' ')
      const nInteractive = await page.locator('button, a, input, [style*="cursor: pointer"], [style*="cursor:pointer"]').count()

      const allowed = persona ? belongs(route.track, persona.track) : (route.track === 'shared' || route.track === 'onboarding')

      if (!allowed) {
        // Wrong-track (or anonymous) visitors must be redirected away.
        // Recheck once after extra settle before flagging — client guards
        // hydrate late on a loaded dev server, and a one-shot check produced
        // transient false alarms during mutation validation.
        const expected = persona ? HOME[persona.track] : '/'
        let fp = finalPath
        for (let r = 0; r < 3 && fp === route.path; r++) {
          await page.waitForTimeout(2500)   // serverless cold starts can make the heal round-trip slow
          fp = new URL(page.url()).pathname
        }
        if (fp === route.path) fail(`wrong-track persona was NOT redirected (stayed on ${fp})`)
        else if (fp !== expected && fp !== '/') fail(`redirected to ${fp}, expected ${expected}`)
        continue  // content checks don't apply to a page we were bounced from
      }

      if (finalPath !== route.path && route.track !== 'onboarding') {
        // Allowed persona got bounced — that's a routing bug (unless canonicalization)
        fail(`allowed persona redirected away to ${finalPath}`)
        continue
      }

      if (text.length < 40) fail(`blank page (${text.length} chars)`)
      if (nInteractive === 0) fail('no interactive elements (dead end)')

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      if (overflow > 2) fail(`horizontal overflow by ${overflow}px`)

      for (const t of DEV_TOKENS) if (t.test(text)) fail(`dev artifact: ${t}`)

      const lang = expectedLang(route, persona)
      if (lang === 'pt') for (const t of EN_CHROME) { if (t.test(text)) { fail(`English chrome on PT surface: ${t}`); break } }
      if (lang === 'en') for (const t of PT_CHROME) { if (t.test(text)) { fail(`Portuguese chrome on EN surface: ${t}`); break } }

      if (route.game) {
        const exit = await page.locator('button', { hasText: /✕ (Exit|Sair)/i }).count()
        if (!exit) fail('no Exit control on game page')
      }

      for (const e of errs) fail(e)
    } catch (e) {
      fail('load failed: ' + String(e).split('\n')[0].slice(0, 140))
    }
  }
  await ctx.close()
}
await browser.close()

console.log(`\nswept ${checked} page loads across ${Object.keys(PERSONAS).length} personas (${FULL ? 'full' : 'trimmed'} matrix)`)
if (failures.length) {
  console.log(`${failures.length} FAILURES:`)
  const byMsg = {}
  for (const f of failures) (byMsg[`${f.msg}`] ??= []).push(`${f.persona} ${f.path}`)
  for (const [msg, where] of Object.entries(byMsg))
    console.log(`  ${msg}\n      ${where.slice(0, 8).join(', ')}${where.length > 8 ? ` (+${where.length - 8} more)` : ''}`)
  process.exit(1)
}
console.log('PASS — nothing forbidden found anywhere.')
