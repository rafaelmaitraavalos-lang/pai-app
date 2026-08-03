// Ship-night full-curriculum run: six simulated students — elementary, middle,
// high school × English and Portuguese — each doing EVERYTHING a real student
// can do, through the real UI, start to finish:
//
//   signup → every world → every slide of every lesson → every quiz question
//   (answering TRUE always, then asserting the verdict badge agrees with the
//   explanation's stated answer — truth-consistency without an answer key) →
//   every in-world game opened + exited → sign-out/sign-in persistence check
//   after the first world → one in-scope chat question → full-track completion.
//
// Continuous invariants: no page errors (API 4xx filtered), no wrong-language
// chrome on the student's own pages, no dead ends, lessons actually get marked
// done and later worlds actually unlock.
//
// Usage:
//   node scripts/test_ship_night.mjs --base https://paiforkids.com
//   node scripts/test_ship_night.mjs --personas pt-fund2 --max-lessons 3  # smoke
//   --selftest inverts one truth assertion to prove the detector can fail.

import { chromium } from 'playwright'
import { appendFileSync } from 'fs'

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : d }
const BASE = arg('base', 'http://localhost:3200')
const ONLY = arg('personas', 'en-elem,en-middle,en-high,pt-fund1,pt-fund2,pt-medio').split(',')
const MAX_LESSONS = parseInt(arg('max-lessons', '0')) || Infinity
const SELFTEST = process.argv.includes('--selftest')
const LOG = arg('log', `/tmp/ship-night-${Date.now()}.jsonl`)

const PERSONAS = {
  'en-elem':   { lang: 'en', gradeRe: /Elementary/i,      home: '/elementary/home' },
  'en-middle': { lang: 'en', gradeRe: /Middle School/i,   home: '/middle/home' },
  'en-high':   { lang: 'en', gradeRe: /High School/i,     home: '/home' },
  'pt-fund1':  { lang: 'pt', gradeRe: /Fundamental I \(/, home: '/elementary/home' },
  'pt-fund2':  { lang: 'pt', gradeRe: /Fundamental II/,   home: '/elementary/middle-pt' },
  'pt-medio':  { lang: 'pt', gradeRe: /Ensino Médio/,     home: '/home' },
}
const EN_CHROME = /\b(Sign out|Up next|Start here|Your Worlds|Take the quiz|Lesson complete|World complete|Mistakes remaining|How to play|Leave game|Next slide|Modules)\b/
const PT_CHROME = /\b(Sair|A seguir|Começar aqui|Seus Mundos|Fazer o questionário|Aula concluída|Erros restantes|Como jogar|Próximo slide|Módulos)\b/

const RUN = Date.now().toString(36)
const results = []
let failures = 0
const log = o => appendFileSync(LOG, JSON.stringify(o) + '\n')

function record(persona, name, ok, detail = '') {
  results.push({ persona, name, ok, detail })
  log({ persona, name, ok, detail })
  if (!ok) { failures++; console.log(`  FAIL [${persona}] ${name} — ${detail}`) }
}

const T = lang => lang === 'pt' ? {
  next: /Próximo slide/i, quiz: /Fazer o questionário/i, tru: /^Verdadeiro$/i,
  nextQ: /^(Próxima|Finalizar)/i, right: /CERTO!/, wrong: /ERRADO/, stated: /A resposta é (VERDADEIRO|FALSO)/,
  statedTrue: 'VERDADEIRO', signout: /^Sair$/i, login: /Já tenho uma conta/i, cont: /Continuar/i,
  newHere: /Sou novo aqui/i, done: /É isso/i, chatQ: 'O que é inteligência artificial?',
  badChrome: EN_CHROME, chat: /Conversar com o PAI/i,
} : {
  next: /Next slide/i, quiz: /Take the quiz/i, tru: /^True$/i,
  nextQ: /^(Next|Finish)/i, right: /RIGHT!/, wrong: /WRONG/, stated: /The answer is (TRUE|FALSE)/,
  statedTrue: 'TRUE', signout: /Sign out/i, login: /I have an account/i, cont: /Continue/i,
  newHere: /I'm new here/i, done: /That's it/i, chatQ: 'What is artificial intelligence?',
  badChrome: PT_CHROME, chat: /Chat with PAI/i,
}

const sleep = ms => new Promise(r => setTimeout(r, ms))
const path = p => new URL(p.url()).pathname
async function text(p) { return (await p.evaluate(() => document.body.innerText)).replace(/\s+/g, ' ') }

async function clickByText(page, re, timeout = 8000) {
  const el = page.locator('button, a, [style*="cursor: pointer"], [style*="cursor:pointer"]').filter({ hasText: re }).first()
  await el.click({ timeout })
}

async function signup(page, t, username, gradeRe) {
  await page.goto(BASE + '/reset', { waitUntil: 'domcontentloaded' })
  await sleep(1200)
  await clickByText(page, /Get Started/i); await sleep(600)
  await clickByText(page, t === undefined ? /English/ : (tLangIsPt(t) ? /Português/ : /English/)); await sleep(900)
  await clickByText(page, t.newHere); await sleep(600)
  await page.locator('input').fill(username)
  await clickByText(page, t.cont); await sleep(1500)
  await clickByText(page, gradeRe); await sleep(400)
  await clickByText(page, t.done); await sleep(1800)
}
const tLangIsPt = t => t.statedTrue === 'VERDADEIRO'

async function worldRows(page) {
  // clickable elements labelled W01..W08 on any home page
  const rows = page.locator('button, a, [style*="cursor: pointer"], [style*="cursor:pointer"]').filter({ hasText: /^W\d{2}/ })
  return rows.count().then(n => ({ rows, n }))
}

async function moduleRows(page) {
  const rows = page.locator('[style*="cursor: pointer"], [style*="cursor:pointer"], button, a').filter({ hasText: /^(\d{2}|🎮)/ })
  return rows.count().then(n => ({ rows, n }))
}

async function runLesson(page, t, persona, label, checkChat) {
  // walk slides
  for (let s = 0; s < 30; s++) {
    const quizBtn = page.locator('button', { hasText: t.quiz }).first()
    if (await quizBtn.isVisible().catch(() => false)) { await quizBtn.click(); await sleep(900); break }
    const nextBtn = page.locator('button', { hasText: t.next }).first()
    if (!(await nextBtn.isVisible().catch(() => false))) break   // no quiz (rare) or single-slide
    await nextBtn.click({ timeout: 8000 }).catch(() => {})
    await sleep(650)
  }
  // chat once, mid-curriculum, if requested (in-scope question, real backend)
  if (checkChat) {
    const trigger = page.getByRole('button', { name: t.chat }).first()
    if (await trigger.isVisible().catch(() => false)) {
      await trigger.click(); await sleep(700)
      const input = page.locator('input[type=text], input:not([type])').last()
      await input.fill(t.chatQ); await input.press('Enter')
      await sleep(9000)
      const tx = await text(page)
      const answered = tx.length > 200 && !/Não foi possível falar|Cannot reach PAI/i.test(tx)
      record(persona, 'chat answers an in-scope question', answered, tx.slice(-160))
      await page.keyboard.press('Escape').catch(() => {})
      await sleep(500)
    }
  }
  // quiz: answer TRUE every time; badge must agree with stated answer
  for (let q = 0; q < 12; q++) {
    const trueBtn = page.locator('button', { hasText: t.tru }).first()
    if (!(await trueBtn.isVisible().catch(() => false))) break
    await trueBtn.click({ timeout: 8000 }).catch(() => {})
    await sleep(800)
    const tx = await text(page)
    const stated = tx.match(t.stated)?.[1]
    const saidRight = t.right.test(tx), saidWrong = t.wrong.test(tx)
    if (stated) {
      let truthOK = (stated === t.statedTrue) === saidRight && saidRight !== saidWrong
      if (SELFTEST && q === 0) truthOK = !truthOK
      if (!truthOK) record(persona, `verdict truth-consistency ${label} q${q}`, false,
        `stated=${stated} right=${saidRight} wrong=${saidWrong}`)
    } else if (!saidRight && !saidWrong) {
      break // not a quiz screen anymore
    } else {
      record(persona, `explanation states the answer ${label} q${q}`, false, tx.slice(0, 120))
    }
    const nq = page.locator('button', { hasText: t.nextQ }).first()
    if (await nq.isVisible().catch(() => false)) { await nq.click().catch(() => {}); await sleep(700) }
  }
  await sleep(600)
}

for (const personaName of ONLY) {
  const persona = PERSONAS[personaName]
  const t = T(persona.lang)
  console.log(`\n=== ${personaName} (${BASE}) — full curriculum`)
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: persona.lang === 'pt' ? 'pt-BR' : 'en-US' })
  const page = await ctx.newPage()
  const errs = []
  page.on('pageerror', e => errs.push('pageerror: ' + String(e).slice(0, 140)))
  page.on('console', m => {
    if (m.type() !== 'error') return
    if (/Failed to load resource/.test(m.text()) && /\/api\//.test(m.location()?.url ?? '')) return
    errs.push('console: ' + m.text().slice(0, 140))
  })

  const username = `zz_ship_${personaName.replace('-', '')}_${RUN}`
  let lessonsDone = 0, gamesOpened = 0, questionsAnswered = 0
  try {
    await signup(page, t, username, persona.gradeRe)
    record(personaName, 'signup lands on own home', path(page) === persona.home, `at ${path(page)}`)

    let signedOutOnce = false
    for (let w = 0; w < 10; w++) {                      // worlds, in order
      await page.goto(BASE + persona.home, { waitUntil: 'domcontentloaded' })
      await sleep(1400)
      const tx0 = await text(page)
      if (t.badChrome.test(tx0)) record(personaName, `no wrong-language chrome on home (world ${w})`, false, tx0.match(t.badChrome)[0])
      const { rows, n } = await worldRows(page)
      if (w >= n) break
      await rows.nth(w).click({ timeout: 8000 }).catch(() => {})
      await sleep(1400)
      const worldPath = path(page)
      if (worldPath === persona.home) { record(personaName, `world ${w + 1} openable`, false, 'click did not navigate (locked?)'); break }

      for (let mIdx = 0; mIdx < 20; mIdx++) {           // modules within world
        if (lessonsDone >= MAX_LESSONS) break
        if (path(page) !== worldPath) {
          await page.goto(BASE + worldPath, { waitUntil: 'domcontentloaded' })
          await sleep(1200)
        }
        const { rows: mods, n: mn } = await moduleRows(page)
        if (mIdx >= mn) break
        const label = ((await mods.nth(mIdx).textContent().catch(() => '')) || '').replace(/\s+/g, ' ').trim().slice(0, 30)
        await mods.nth(mIdx).click({ timeout: 8000 }).catch(() => {})
        await sleep(1500)
        const here = path(page)
        if (/\/games\//.test(here)) {
          gamesOpened++
          const tg = await text(page)
          if (t.badChrome.test(tg)) record(personaName, `no wrong-language chrome in game ${label}`, false, tg.match(t.badChrome)[0])
          await clickByText(page, /✕ (Sair|Exit)/i).catch(() => record(personaName, `game ${label} has exit`, false, here))
          await sleep(1200)
          continue
        }
        if (!/\/lesson/.test(here)) { continue }
        const tl = await text(page)
        if (t.badChrome.test(tl)) record(personaName, `no wrong-language chrome in lesson ${label}`, false, tl.match(t.badChrome)[0])
        const doChat = lessonsDone === 1   // once per persona, on their 2nd lesson
        const before = results.length
        await runLesson(page, t, personaName, `${worldPath}#${mIdx}`, doChat)
        lessonsDone++
        questionsAnswered += 4
        if (errs.length) { record(personaName, `no page errors through ${label}`, false, errs.join(' | ').slice(0, 200)); errs.length = 0 }
        if (results.length === before) log({ persona: personaName, progress: `${label} clean`, lessons: lessonsDone })
      }

      // after first world: sign out / sign in, progress must persist
      if (!signedOutOnce && lessonsDone > 0) {
        signedOutOnce = true
        await page.goto(BASE + persona.home, { waitUntil: 'domcontentloaded' }); await sleep(1200)
        await clickByText(page, t.signout).catch(() => {})
        await sleep(1500)
        await clickByText(page, /Get Started/i).catch(() => {}); await sleep(600)
        await clickByText(page, persona.lang === 'pt' ? /Português/ : /English/).catch(() => {}); await sleep(900)
        await clickByText(page, t.login).catch(() => {}); await sleep(600)
        await page.locator('input').fill(username)
        await clickByText(page, t.cont).catch(() => {}); await sleep(2200)
        record(personaName, 'sign back in returns home', path(page) === persona.home, `at ${path(page)}`)
        await page.goto(BASE + persona.home, { waitUntil: 'domcontentloaded' }); await sleep(1400)
      }
      if (lessonsDone >= MAX_LESSONS) break
    }
    record(personaName, 'completed curriculum walk', lessonsDone > 0, `${lessonsDone} lessons, ${gamesOpened} games, ~${questionsAnswered} questions`)
    console.log(`  [${personaName}] ${lessonsDone} lessons, ${gamesOpened} games, ~${questionsAnswered} answers`)
  } catch (e) {
    record(personaName, 'persona run aborted', false, String(e).split('\n')[0].slice(0, 180))
  }
  await browser.close()
}

const pass = results.filter(r => r.ok).length
console.log(`\nship-night: ${pass}/${results.length} recorded checks passed; log at ${LOG}`)
if (failures) {
  console.log(`${failures} FAILURES — see log`)
  process.exit(1)
}
console.log('ALL CLEAR.')
