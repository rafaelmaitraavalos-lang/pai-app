// Monkey test — seeded random walks with invariant monitors.
//
// Failure class F from QA-DOCTRINE-2026-08-01.md: scripted flows only test the
// sequences their authors imagined. The monkey clicks whatever is clickable,
// presses back/forward, reloads, types garbage — and after every action checks
// invariants that must hold no matter what a child does:
//
//   I1  no page errors
//   I2  the student is never left on another track's content page
//       (recomputed from CURRENT localStorage — if the monkey signs out
//        mid-walk, the expectation adapts, exactly like a real kid)
//   I3  never a dead end (a page with nothing interactive)
//   I4  no dev artifacts in visible text
//   I5  never stuck off-origin
//
// Seeded PRNG → every run is replayable: report the seed, rerun with --seed.
//
// Usage:
//   node scripts/test_monkey.mjs --base http://localhost:3200 --steps 120
//   node scripts/test_monkey.mjs --seed 1234 --personas pt-fund2,anon

import { chromium } from 'playwright'

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : d }
const BASE = arg('base', 'http://localhost:3000')
const STEPS = parseInt(arg('steps', '120'))
const SEED = parseInt(arg('seed', '42'))
const WHICH = arg('personas', 'en-elem,pt-fund2,pt-medio,anon').split(',')

const PERSONAS = {
  anon:       null,
  'en-elem':  { lang: 'en', grade: 'elem' },
  'en-middle':{ lang: 'en', grade: 'middle' },
  'pt-fund1': { lang: 'pt', grade: 'fund1' },
  'pt-fund2': { lang: 'pt', grade: 'fund2' },
  'pt-medio': { lang: 'pt', grade: 'medio' },
}

function mulberry32(a) {
  return () => {
    a |= 0; a = a + 0x6D2B79F5 | 0
    let t = Math.imul(a ^ a >>> 15, 1 | a)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

// Track model (mirrors app/data/track.ts)
const ELEM = new Set(['K', '1st', '2nd', '3rd', '4th', '5th', 'fund1', 'elem'])
const studentTrack = (grade, lang) =>
  !grade ? null :
  grade === 'fund2' ? 'middle-pt' :
  ELEM.has(grade) ? (grade === 'fund1' || lang === 'pt' ? 'elem-pt' : 'elem-en') :
  grade === 'middle' ? 'middle-en' : 'high'

const urlTrack = path => {
  let m
  if ((m = path.match(/^\/elementary\/lesson\/(\d+)/))) {
    const id = +m[1]
    return id >= 311 ? 'middle-pt' : id >= 211 ? 'middle-en' : id >= 131 ? 'elem-pt' : 'elem-en'
  }
  if ((m = path.match(/^\/(?:elementary|middle)\/world\/(\d+)/))) {
    const id = +m[1]
    return id >= 261 ? 'middle-pt' : id >= 201 ? 'middle-en' : id >= 104 ? 'elem-pt' : 'elem-en'
  }
  if (path === '/elementary/middle-pt') return 'middle-pt'
  if (path === '/elementary/home') return 'elem'          // both elem tracks
  if (path === '/middle/home') return 'middle-en'
  if (/^\/(home|lessons|world\/\d+|lesson\/\d+)$/.test(path)) return 'high'
  return 'shared'                                          // games, about, onboarding
}

const DEV_TOKENS = [/\[object Object\]/, /\bNaN\b/, /\[SENSITIVE\]/i, /lorem ipsum/i]
const GARBAGE = ['zzz', '💀🐷💀', 'a'.repeat(80), '<script>alert(1)</script>', 'ação çãô', '   ', '0']

const violations = []
const browser = await chromium.launch()

for (const personaName of WHICH) {
  const persona = PERSONAS[personaName]
  const rand = mulberry32(SEED + personaName.length * 1000 + [...personaName].reduce((a, c) => a + c.charCodeAt(0), 0))
  const ctx = await browser.newContext({ viewport: { width: 900, height: 800 } })
  if (persona) await ctx.addInitScript(p => {
    try {
    localStorage.setItem('pai_lang', p.lang)
    localStorage.setItem('pai_grade', p.grade)
    localStorage.setItem('pai_username', 'zz_monkey_bot')
    localStorage.setItem('pai_onboarding_done', 'true')
    } catch {} // transitional about:blank documents deny storage access
  }, persona)
  const page = await ctx.newPage()
  const pageErrs = []
  page.on('pageerror', e => pageErrs.push('pageerror: ' + String(e).slice(0, 160)))
  page.on('console', m => {
    if (m.type() !== 'error') return
    // 4xx from our REST endpoints are semantic replies (unknown username,
    // taken username, rate cap) — the browser logs them as resource errors,
    // but they are the app working. A 4xx on anything else (image, chunk,
    // font) is a real defect and still flags.
    if (/Failed to load resource/.test(m.text()) && /\/api\//.test(m.location()?.url ?? '')) return
    pageErrs.push('console: ' + m.text().slice(0, 160) + ' @ ' + (m.location()?.url ?? '?').slice(-60))
  })

  const trail = []
  const violate = (inv, msg) => {
    violations.push({ persona: personaName, seed: SEED, inv, msg, trail: trail.slice(-6) })
    console.log(`  VIOLATION [${personaName}] ${inv}: ${msg}`)
  }

  await page.goto(BASE + (persona ? '' : '/'), { waitUntil: 'domcontentloaded' }).catch(() => {})
  await page.waitForTimeout(1200)

  for (let step = 0; step < STEPS; step++) {
    const r = rand()
    let action = 'noop'
    try {
      if (r < 0.55) {
        const els = page.locator('button:visible, a:visible, [style*="cursor: pointer"]:visible, [style*="cursor:pointer"]:visible')
        const n = await els.count()
        if (n) {
          const el = els.nth(Math.floor(rand() * n))
          const label = ((await el.textContent().catch(() => '')) || '').replace(/\s+/g, ' ').trim().slice(0, 28)
          action = `click "${label}"`
          await el.click({ timeout: 3000, force: false }).catch(() => { action += ' (unclickable)' })
        }
      } else if (r < 0.67) { action = 'back'; await page.goBack({ timeout: 5000 }).catch(() => {}) }
      else if (r < 0.72) { action = 'forward'; await page.goForward({ timeout: 5000 }).catch(() => {}) }
      else if (r < 0.82) { action = 'reload'; await page.reload({ timeout: 15000 }).catch(() => {}) }
      else if (r < 0.90) {
        const inputs = page.locator('input:visible')
        if (await inputs.count()) {
          const g = GARBAGE[Math.floor(rand() * GARBAGE.length)]
          action = `type ${JSON.stringify(g.slice(0, 12))}`
          await inputs.first().fill(g).catch(() => {})
        }
      } else if (r < 0.95) { action = 'scroll'; await page.mouse.wheel(0, (rand() - 0.3) * 900) }
      else { const k = ['Enter', 'Escape', 'Tab'][Math.floor(rand() * 3)]; action = `key ${k}`; await page.keyboard.press(k).catch(() => {}) }

      await page.waitForTimeout(450)

      // Recover if the monkey escaped the app (about:blank, external link)
      if (!page.url().startsWith(BASE)) {
        await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {})
        await page.waitForTimeout(600)
        if (!page.url().startsWith(BASE)) { violate('I5', `stuck off-origin at ${page.url()}`); break }
      }

      const path = new URL(page.url()).pathname
      trail.push(`${step}:${action} → ${path}`)

      // I1 page errors
      if (pageErrs.length) { violate('I1', pageErrs.join(' | ')); pageErrs.length = 0 }

      // I2 wrong-track content (recomputed from live storage; give guards a beat)
      const { grade, lang } = await page.evaluate(() => ({ grade: localStorage.getItem('pai_grade'), lang: localStorage.getItem('pai_lang') }))
      const st = studentTrack(grade, lang)
      const ut = urlTrack(path)
      const wrong = st && ut !== 'shared' && ut !== st && !(ut === 'elem' && (st === 'elem-en' || st === 'elem-pt'))
      if (wrong) {
        await page.waitForTimeout(1200)   // guard redirect in flight?
        const path2 = new URL(page.url()).pathname
        if (path2 === path) violate('I2', `student track=${st} left on ${path} (track=${ut})`)
      }

      // I3 dead end + I4 dev tokens (cheap, every 3rd step)
      if (step % 3 === 0) {
        const nInter = await page.locator('button:visible, a:visible, [style*="cursor"]:visible').count()
        if (nInter === 0) violate('I3', `dead end at ${path} after ${action}`)
        const text = await page.evaluate(() => document.body.innerText.slice(0, 4000))
        for (const t of DEV_TOKENS) if (t.test(text)) violate('I4', `${t} visible at ${path}`)
      }
    } catch (e) {
      trail.push(`${step}:${action} → EXCEPTION`)
    }
  }
  console.log(`  [${personaName}] walked ${STEPS} steps (seed ${SEED})`)
  await ctx.close()
}
await browser.close()

console.log(`\nmonkey: ${WHICH.length} personas × ${STEPS} steps, seed ${SEED}`)
if (violations.length) {
  console.log(`${violations.length} INVARIANT VIOLATIONS (replay with --seed ${SEED}):`)
  for (const v of violations) console.log(`  [${v.persona}] ${v.inv} ${v.msg}\n     trail: ${v.trail.join('  ')}`)
  process.exit(1)
}
console.log('PASS — all invariants held.')
