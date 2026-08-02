// Real-flow suite: language SELECTION, back/forward, sign-out/in, shared
// computers. Every other suite injects pai_lang into localStorage before
// loading — which is exactly why none of them caught the 2026-08-01 bugs.
// This one only ever does what a student can do: click, type, press back.
//
// Scenarios:
//   S1 PT middle-school signup lands on the PT home, zero English chrome
//   S2 world -> lesson stay PT; refresh stays PT; back button stays PT
//   S3 shared computer: EN student browses+signs out, PT student signs up,
//      then mashes the back button — no English page may survive; deep
//      English URLs redirect to the PT student's own home
//   S4 sign out, sign back in — track and language restored
//   S5 localStorage wiped but session cookie alive — profile heals from DB
//   S6 every grade in both languages lands on its correct home
//   S7 double-Enter on the username step cannot skip the grade screen
//   S8 onboarding fits 1366x768 and 1280x720 laptops — language buttons
//      actually clickable (they were unreachable: page clips overflow)
//
// Usage:
//   node scripts/test_flows.mjs                       # local dev server
//   node scripts/test_flows.mjs --base https://paiforkids.com
//   node scripts/test_flows.mjs --engine webkit --only S3

import { chromium, webkit, firefox } from 'playwright'

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : d }
const BASE   = arg('base', 'http://localhost:3000')
const ENGINE = arg('engine', 'chromium')
const ONLY   = arg('only', null)
const ENGINES = { chromium, webkit, firefox }

const RUN = `${Date.now().toString(36)}${Math.floor(Math.random() * 1e4)}`
let userSeq = 0
const freshUser = tag => `zz_qa_${tag}_${RUN}_${userSeq++}`

// Chrome markers that must never appear on a Portuguese page / vice versa.
// Content words (Alan Turing, software, machine learning) are deliberately
// excluded — only UI chrome the app itself renders.
const EN_CHROME = /\b(modules|up next|intermediate|sign out|your worlds|start here|contents|lesson complete|take the quiz|world complete|leave game|current|that's it)\b/i
const PT_CHROME = /\b(módulos|a seguir|intermediário|seus mundos|começar aqui|conteúdo|fazer o questionário)\b/i

const results = []
let failures = 0

function record(scenario, name, ok, detail = '') {
  results.push({ scenario, name, ok, detail })
  if (!ok) failures++
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${name}${detail && !ok ? ` — ${detail}` : ''}`)
}

async function text(page) {
  return (await page.evaluate(() => document.body.innerText)).replace(/\s+/g, ' ')
}

async function assertNoEnglishChrome(scenario, page, label) {
  const t = await text(page)
  const m = t.match(EN_CHROME)
  record(scenario, `${label}: no English chrome`, !m, m ? `found "${m[0]}" at ${page.url()}` : '')
}

async function clickText(page, re, what) {
  const el = page.locator('button, a, [style*="cursor: pointer"], [style*="cursor:pointer"]').filter({ hasText: re }).first()
  await el.click({ timeout: 10_000 })
  return what
}

async function settle(page, ms = 600) {
  await page.waitForTimeout(ms)
  await page.waitForLoadState('domcontentloaded').catch(() => {})
}

// ── Real-UI onboarding helpers ──────────────────────────────────────────────

async function startOnboarding(page) {
  // /reset wipes pai_* localStorage AND the session cookie, then lands on "/".
  // Without it a signed-in context bounces straight past onboarding.
  await page.goto(BASE + '/reset', { waitUntil: 'domcontentloaded' })
  await page.waitForURL('**/', { timeout: 10_000 }).catch(() => {})
  await settle(page)
  // Older builds had a broken /reset that left the session alive and bounced
  // to a signed-in home — sign out through the UI so the flows still run
  // (and the language assertions, not a stuck harness, decide pass/fail).
  const started = await page.locator('button', { hasText: /Get Started/i }).count()
  if (!started) {
    await clickText(page, /Sign out|^Sair$/i, 'signout-fallback')
    await settle(page, 1200)
  }
  await clickText(page, /Get Started/i, 'start')
  await settle(page, 500)
}

async function chooseLanguage(page, lang) {
  await clickText(page, lang === 'pt' ? /Português/ : /^\s*🇺🇸?\s*English/i, 'lang')
  await settle(page, 800)
}

async function signupThroughGrade(page, { lang, username, gradeRe }) {
  await startOnboarding(page)
  await chooseLanguage(page, lang)
  await clickText(page, lang === 'pt' ? /Sou novo aqui/i : /I'm new here/i, 'mode')
  await settle(page, 500)
  await page.locator('input').fill(username)
  await clickText(page, lang === 'pt' ? /Continuar/i : /Continue/i, 'username')
  await settle(page, 1200)
  await clickText(page, gradeRe, 'grade')
  await settle(page, 500)
  await clickText(page, lang === 'pt' ? /É isso/i : /That's it/i, 'done')
  await settle(page, 1500)
}

async function login(page, { lang, username }) {
  await startOnboarding(page)
  await chooseLanguage(page, lang)
  await clickText(page, lang === 'pt' ? /Já tenho uma conta/i : /I have an account/i, 'mode')
  await settle(page, 500)
  await page.locator('input').fill(username)
  await clickText(page, lang === 'pt' ? /Continuar/i : /Continue/i, 'login')
  await settle(page, 1800)
}

async function signOut(page, lang) {
  await clickText(page, lang === 'pt' ? /^Sair$/i : /Sign out/i, 'signout')
  await settle(page, 1200)
}

const path = page => new URL(page.url()).pathname

// ── Scenarios ───────────────────────────────────────────────────────────────

async function S1(ctx) {
  console.log('S1: PT middle-school signup lands on PT home')
  const page = await ctx.newPage()
  const user = freshUser('s1')
  await signupThroughGrade(page, { lang: 'pt', username: user, gradeRe: /Fundamental II/ })
  record('S1', 'lands on /elementary/middle-pt', path(page) === '/elementary/middle-pt', `at ${path(page)}`)
  await assertNoEnglishChrome('S1', page, 'PT middle home')
  await page.close()
  return user
}

async function S2(ctx, user) {
  console.log('S2: world → lesson stay PT; refresh + back stay PT')
  const page = await ctx.newPage()
  await login(page, { lang: 'pt', username: user })
  record('S2', 'login returns to middle-pt', path(page) === '/elementary/middle-pt', `at ${path(page)}`)

  await clickText(page, /O Que É a IA/i, 'world 1')
  await settle(page, 1200)
  record('S2', 'world page is /middle/world/261', path(page) === '/middle/world/261', `at ${path(page)}`)
  await assertNoEnglishChrome('S2', page, 'PT world page')

  await clickText(page, /Definindo a IA/i, 'module 1')
  await settle(page, 1500)
  record('S2', 'lesson page reached', /\/lesson\/311$/.test(path(page)), `at ${path(page)}`)
  await assertNoEnglishChrome('S2', page, 'PT lesson')

  await page.reload({ waitUntil: 'domcontentloaded' })
  await settle(page, 1000)
  await assertNoEnglishChrome('S2', page, 'PT lesson after refresh')

  await page.goBack(); await settle(page, 1200)
  await assertNoEnglishChrome('S2', page, 'back 1 (world)')
  await page.goBack(); await settle(page, 1200)
  await assertNoEnglishChrome('S2', page, 'back 2 (home)')
  await page.close()
}

async function S3(ctx) {
  console.log('S3: shared computer — EN student then PT student, back-button mash')
  const page = await ctx.newPage()

  // Student A: English elementary, browses into a world, signs out.
  await signupThroughGrade(page, { lang: 'en', username: freshUser('s3a'), gradeRe: /Elementary/i })
  record('S3', 'A lands on /elementary/home', path(page) === '/elementary/home', `at ${path(page)}`)
  await clickText(page, /Meet AI/i, 'A world 1')
  await settle(page, 1200)
  record('S3', 'A world page reached', path(page) === '/elementary/world/101', `at ${path(page)}`)
  await clickText(page, /← HOME/i, 'A back home')
  await settle(page, 1200)
  await signOut(page, 'en')
  record('S3', 'A signed out to onboarding', path(page) === '/', `at ${path(page)}`)

  // Student B: Portuguese Fundamental II on the same browser.
  const userB = freshUser('s3b')
  await signupThroughGrade(page, { lang: 'pt', username: userB, gradeRe: /Fundamental II/ })
  record('S3', 'B lands on /elementary/middle-pt', path(page) === '/elementary/middle-pt', `at ${path(page)}`)

  // Deep English URLs (leftover tabs, bookmarks) must bounce B to B's home.
  await page.goto(BASE + '/elementary/world/101', { waitUntil: 'domcontentloaded' })
  await settle(page, 1600)
  record('S3', 'EN world URL redirects B home', path(page) === '/elementary/middle-pt', `at ${path(page)}`)
  await page.goto(BASE + '/elementary/home', { waitUntil: 'domcontentloaded' })
  await settle(page, 1600)
  record('S3', 'EN elem home redirects B home', path(page) === '/elementary/middle-pt', `at ${path(page)}`)

  // B mashes the back button through A's English history. Whatever renders,
  // no English chrome may survive (bouncing to B's home or onboarding is fine).
  for (let i = 1; i <= 4; i++) {
    await page.goBack().catch(() => {})
    await settle(page, 1400)
    await assertNoEnglishChrome('S3', page, `B back-press ${i} (${path(page)})`)
  }
  await page.close()
  return userB
}

async function S4(ctx, user) {
  console.log('S4: sign out, sign back in — track and language restored')
  const page = await ctx.newPage()
  await login(page, { lang: 'pt', username: user })
  record('S4', 'login lands middle-pt', path(page) === '/elementary/middle-pt', `at ${path(page)}`)
  await signOut(page, 'pt')
  record('S4', 'signed out to onboarding', path(page) === '/', `at ${path(page)}`)
  await login(page, { lang: 'pt', username: user })
  record('S4', 're-login lands middle-pt', path(page) === '/elementary/middle-pt', `at ${path(page)}`)
  await assertNoEnglishChrome('S4', page, 'after re-login')
  await page.reload({ waitUntil: 'domcontentloaded' })
  await settle(page, 1200)
  record('S4', 'refresh keeps middle-pt', path(page) === '/elementary/middle-pt', `at ${path(page)}`)
  await page.close()
}

async function S5(ctx, user) {
  console.log('S5: wiped localStorage + live cookie — profile heals from DB')
  const page = await ctx.newPage()
  await login(page, { lang: 'pt', username: user })
  await page.evaluate(() => localStorage.clear())
  await page.goto(BASE + '/home', { waitUntil: 'domcontentloaded' })
  await settle(page, 2000)
  record('S5', 'healed to middle-pt', path(page) === '/elementary/middle-pt', `at ${path(page)}`)
  const lang = await page.evaluate(() => localStorage.getItem('pai_lang'))
  record('S5', 'pai_lang restored to pt', lang === 'pt', `got ${lang}`)
  await page.close()
}

async function S6(ctx) {
  console.log('S6: every grade in both languages lands on its correct home')
  const cases = [
    ['en', /Elementary/i,    '/elementary/home'],
    ['en', /Middle School/i, '/middle/home'],
    ['en', /High School/i,   '/home'],
    ['pt', /Fundamental I \(/, '/elementary/home'],
    ['pt', /Fundamental II/,   '/elementary/middle-pt'],
    ['pt', /Ensino Médio/,     '/home'],
  ]
  for (const [lang, gradeRe, expected] of cases) {
    const page = await ctx.newPage()
    await signupThroughGrade(page, { lang, username: freshUser('s6'), gradeRe })
    record('S6', `${lang} ${gradeRe} → ${expected}`, path(page) === expected, `at ${path(page)}`)
    await page.close()
  }
}

async function S7(ctx) {
  console.log('S7: double-Enter on username cannot skip the grade screen')
  const page = await ctx.newPage()
  await startOnboarding(page)
  await chooseLanguage(page, 'pt')
  await clickText(page, /Sou novo aqui/i, 'mode')
  await settle(page, 500)
  await page.locator('input').fill(freshUser('s7'))
  await page.keyboard.press('Enter')
  await page.keyboard.press('Enter')   // impatient kid
  await settle(page, 1800)
  const onGrade = (await text(page)).includes('série')
  record('S7', 'grade screen shown after double-Enter', onGrade, `at ${path(page)}`)
  if (onGrade) {
    await clickText(page, /Fundamental II/, 'grade')
    await settle(page, 400)
    await clickText(page, /É isso/i, 'done')
    await settle(page, 1500)
    record('S7', 'lands on middle-pt', path(page) === '/elementary/middle-pt', `at ${path(page)}`)
  }
  await page.close()
}

async function S9(ctx, user) {
  console.log('S9: two tabs open — sign-out in one, the other must not strand the student')
  const tab1 = await ctx.newPage()
  await login(tab1, { lang: 'pt', username: user })
  const tab2 = await ctx.newPage()
  await tab2.goto(BASE + '/elementary/middle-pt', { waitUntil: 'domcontentloaded' })
  await settle(tab2, 1200)
  record('S9', 'tab2 shows PT home', path(tab2) === '/elementary/middle-pt', `at ${path(tab2)}`)
  await signOut(tab1, 'pt')
  // tab2 now has wiped storage + dead cookie; interacting must not crash or
  // leave the student on a track page as a ghost.
  const errs = []
  tab2.on('pageerror', e => errs.push(String(e)))
  await tab2.reload({ waitUntil: 'domcontentloaded' })
  await settle(tab2, 1800)
  record('S9', 'tab2 lands on onboarding after remote sign-out', path(tab2) === '/', `at ${path(tab2)}`)
  record('S9', 'tab2 no page errors', errs.length === 0, errs[0] ?? '')
  await tab1.close(); await tab2.close()
}

async function S10(ctx, user) {
  console.log('S10: refresh mid-quiz — no crash, still PT, quiz recoverable')
  const page = await ctx.newPage()
  const errs = []
  page.on('pageerror', e => errs.push(String(e)))
  await login(page, { lang: 'pt', username: user })
  await page.goto(BASE + '/elementary/lesson/311', { waitUntil: 'domcontentloaded' })
  await settle(page, 1200)
  // Advance to the quiz (PULAR skips the timeline)
  await clickText(page, /^Pular$/i, 'skip to quiz').catch(() => {})
  await settle(page, 1000)
  const onQuiz = await page.locator('button', { hasText: /^Verdadeiro$/i }).count()
  record('S10', 'quiz reachable via skip', onQuiz > 0, `at ${path(page)}`)
  await page.reload({ waitUntil: 'domcontentloaded' })
  await settle(page, 1200)
  const text = await page.evaluate(() => document.body.innerText)
  record('S10', 'lesson recovers after mid-quiz refresh', text.length > 120, `${text.length} chars`)
  record('S10', 'still Portuguese after refresh', !EN_CHROME.test(text.replace(/\s+/g, ' ')), '')
  record('S10', 'no page errors', errs.length === 0, errs[0] ?? '')
  await page.close()
}

async function S11(ctx, user) {
  console.log('S11: chat backend down — child gets a polite message, not a crash')
  const page = await ctx.newPage()
  const errs = []
  page.on('pageerror', e => errs.push(String(e)))
  await page.route('**/api/chat', route => route.abort())
  await login(page, { lang: 'pt', username: user })
  await page.goto(BASE + '/elementary/lesson/311', { waitUntil: 'domcontentloaded' })
  await settle(page, 1200)
  const trigger = page.getByRole('button', { name: /conversar com o pai/i }).first()
  await trigger.click({ timeout: 8000 })
  await settle(page, 800)
  const input = page.locator('input[type=text], input:not([type])').last()
  await input.fill('O que é IA?')
  await input.press('Enter')
  await settle(page, 2500)
  const text = await page.evaluate(() => document.body.innerText)
  record('S11', 'graceful unreachable message shown', /Não foi possível falar com o PAI/i.test(text), text.slice(-120))
  record('S11', 'no page errors with chat down', errs.length === 0, errs[0] ?? '')
  await page.close()
}

async function S8(engine) {
  console.log('S8: onboarding usable on 1366x768 and 1280x720 laptops')
  for (const [w, h] of [[1366, 768], [1280, 720]]) {
    const browser = await ENGINES[engine].launch()
    const ctx = await browser.newContext({ viewport: { width: w, height: h } })
    const page = await ctx.newPage()
    await startOnboarding(page)
    const box = await page.locator('button', { hasText: 'Português' }).first().boundingBox()
    const visible = !!box && box.y >= 0 && box.y + box.height <= h && box.x >= 0
    record('S8', `${w}x${h}: language buttons on-screen`, visible, box ? `y=${Math.round(box.y)} h=${Math.round(box.height)}` : 'not found')
    if (visible) {
      await chooseLanguage(page, 'pt')
      const modeBtn = await page.locator('button', { hasText: /Sou novo aqui/i }).first().boundingBox()
      const ok = !!modeBtn && modeBtn.y >= 0 && modeBtn.y + modeBtn.height <= h
      record('S8', `${w}x${h}: auth buttons on-screen`, ok, modeBtn ? `y=${Math.round(modeBtn.y)}` : 'not found')
    }
    await browser.close()
  }
}

// ── Runner ──────────────────────────────────────────────────────────────────

const want = s => !ONLY || ONLY.split(',').includes(s)

const browser = await ENGINES[ENGINE].launch()
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'pt-BR' })

// A scenario that blows up (stuck page, missing button) is a failure of that
// scenario, not of the harness — record it and keep going.
async function run(name, fn) {
  if (!want(name)) return null
  try {
    return await fn()
  } catch (e) {
    record(name, `${name} aborted`, false, String(e).split('\n')[0].slice(0, 140))
    return null
  }
}

let s1User = null
let s3User = null
try {
  s1User = await run('S1', () => S1(ctx))
  await run('S2', async () => S2(ctx, s1User ?? (s1User = await S1(ctx))))
  s3User = await run('S3', () => S3(ctx))
  await run('S4', async () => S4(ctx, s3User ?? s1User ?? (s1User = await S1(ctx))))
  await run('S5', async () => S5(ctx, s3User ?? s1User ?? (s1User = await S1(ctx))))
  await run('S6', () => S6(ctx))
  await run('S7', () => S7(ctx))
  await run('S9', async () => S9(ctx, s3User ?? s1User ?? (s1User = await S1(ctx))))
  await run('S10', async () => S10(ctx, s3User ?? s1User))
  await run('S11', async () => S11(ctx, s3User ?? s1User))
} finally {
  await browser.close()
}
await run('S8', () => S8(ENGINE))

const pass = results.filter(r => r.ok).length
console.log(`\n${pass}/${results.length} checks passed (${ENGINE}, base ${BASE})`)
if (failures) {
  console.log('FAILURES:')
  results.filter(r => !r.ok).forEach(r => console.log(`  ${r.scenario} · ${r.name} — ${r.detail}`))
  process.exit(1)
}
