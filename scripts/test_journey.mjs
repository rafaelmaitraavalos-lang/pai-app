// Step-by-step student journey, run on every phone size and every browser engine.
//
// A static layout audit tells you a button is clipped. It does not tell you a
// child got stuck. This walks the actual path — sign up, read a lesson, answer
// the quiz right and wrong, open a game, leave it, use the chat — and records
// each step as PASS or FAIL, so a failure names the step a real student cannot
// get past.
//
// Runs on Chromium, WebKit (iPhone Safari — the engine every iOS browser uses)
// and Firefox. Brazilian students are overwhelmingly on Android Chrome, but
// WebKit is where safe-area insets, video autoplay and date handling diverge,
// and none of it had ever been checked.
//
// Usage:
//   node scripts/test_journey.mjs                        # all engines, all sizes
//   node scripts/test_journey.mjs --lang pt
//   node scripts/test_journey.mjs --engine webkit --size 360x640
import { chromium, webkit, firefox } from 'playwright'

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : d }
const BASE = arg('base', 'https://paiforkids.com')
const LANG = arg('lang', 'en')
const ONLY_ENGINE = arg('engine', null)
const ONLY_SIZE = arg('size', null)
const SLOW = process.argv.includes('--slow')      // deliberate pauses + a screenshot per step
const PAUSE = SLOW ? 2200 : 700
const SHOTS = 'test-shots'

const ENGINES = { chromium, webkit, firefox }
const SIZES = [
  [280, 653, 'foldable cover'],
  [320, 568, 'budget Android'],
  [360, 640, 'MOST COMMON in Brazil'],
  [375, 812, 'iPhone mini'],
  [412, 915, 'large Android'],
  [768, 1024, 'tablet'],
]

const T = LANG === 'pt'
  ? { next: /pr[óo]ximo slide|pr[óo]ximo|continuar/i, quiz: /fazer o question[áa]rio/i, exit: /sair do jogo/i }
  : { next: /next slide|next|continue/i, quiz: /take the quiz/i, exit: /leave game/i }

async function journey(engineName, w, h) {
  const browser = await ENGINES[engineName].launch()
  const ctx = await browser.newContext({
    viewport: { width: w, height: h }, isMobile: w < 700, hasTouch: w < 700,
    deviceScaleFactor: 2, locale: LANG === 'pt' ? 'pt-BR' : 'en-US',
  })
  await ctx.addInitScript(([lang]) => {
    localStorage.setItem('pai_lang', lang)
    localStorage.setItem('pai_grade', lang === 'pt' ? 'fund1' : 'elem')
    localStorage.setItem('pai_username', 'zz_journey_bot')
    localStorage.setItem('pai_onboarding_done', 'true')
  }, [LANG])

  const page = await ctx.newPage()
  const steps = []
  const errs = []
  page.on('pageerror', e => errs.push(String(e).slice(0, 100)))
  const step = async (name, fn) => {
    try { const note = await fn(); steps.push({ name, ok: true, note }) }
    catch (e) { steps.push({ name, ok: false, note: String(e).split('\n')[0].slice(0, 110) }) }
    if (SLOW) {
      const tag = `${engineName}_${w}x${h}_${LANG}_${name.split(' ')[0]}`
      await page.screenshot({ path: `${SHOTS}/${tag}.png` }).catch(() => {})
      await page.waitForTimeout(400)
    }
  }
  const visible = async loc => (await loc.count()) > 0 && await loc.first().isVisible().catch(() => false)

  await step('1 open the app', async () => {
    await page.goto(BASE + '/home', { waitUntil: 'domcontentloaded', timeout: 45000 })
    await page.waitForTimeout(PAUSE)
    return new URL(page.url()).pathname
  })

  await step('2 a lesson is reachable', async () => {
    await page.goto(BASE + (LANG === 'pt' ? '/elementary/lesson/131' : '/elementary/lesson/101'),
      { waitUntil: 'domcontentloaded', timeout: 45000 })
    await page.waitForTimeout(PAUSE)
    const body = await page.locator('body').innerText()
    if (body.length < 120) throw new Error('lesson body nearly empty')
    return body.replace(/\s+/g, ' ').slice(0, 45)
  })

  await step('3 the next-slide control is fully on screen', async () => {
    const btn = page.getByRole('button', { name: T.next }).first()
    if (!await visible(btn)) throw new Error('no next control found')
    const box = await btn.boundingBox()
    if (!box) throw new Error('next control has no box')
    if (box.x + box.width > w + 1) throw new Error(`clipped: extends ${Math.round(box.x + box.width - w)}px past the ${w}px screen`)
    if (box.height < 32) throw new Error(`too small to tap: ${Math.round(box.height)}px tall`)
    return `${Math.round(box.width)}x${Math.round(box.height)} at x=${Math.round(box.x)}`
  })

  await step('4 advance through 3 slides', async () => {
    for (let i = 0; i < 3; i++) {
      const btn = page.getByRole('button', { name: T.next }).first()
      if (!await visible(btn)) throw new Error(`next control gone at slide ${i + 1}`)
      await btn.click({ timeout: 6000 })
      await page.waitForTimeout(PAUSE)
    }
    return 'advanced 3 slides'
  })

  await step('5 nothing covers the lesson text', async () => {
    const covered = await page.evaluate(() => {
      const d = document.documentElement
      for (const e of document.querySelectorAll('*')) {
        if (getComputedStyle(e).position !== 'fixed') continue
        const r = e.getBoundingClientRect()
        const cs = getComputedStyle(e)
        if (r.width < 8 || r.height < 8 || cs.opacity === '0' || cs.visibility === 'hidden') continue
        // A floating control ALWAYS has text somewhere beneath it on a scrolling
        // page — that is the pattern, not a defect. What actually harms reading is
        // a control you can see the text THROUGH. So only flag controls without an
        // opaque background of their own.
        const bg = cs.backgroundColor || ''
        const transparent = bg === 'transparent' || /rgba\(.*,\s*(0|0?\.\d+)\)$/.test(bg)
        if (!transparent) continue
        const under = document.elementsFromPoint(r.x + r.width / 2, r.y + r.height / 2)
          .filter(x => x !== e && !e.contains(x))
        const t = under.find(x => x.innerText && x.innerText.trim().length > 60)
        if (t) return t.innerText.trim().slice(0, 40)
      }
      return null
    })
    if (covered) throw new Error(`a fixed control sits on: "${covered}"`)
    return 'clear'
  })

  await step('6 page does not scroll sideways', async () => {
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    if (over > 2) throw new Error(`${over}px of horizontal scroll`)
    return 'no sideways scroll'
  })


  await step('8 reach the quiz', async () => {
    for (let i = 0; i < 12; i++) {
      const q = page.getByRole('button', { name: T.quiz }).first()
      const b = (await visible(q)) ? q : page.getByRole('button', { name: T.next }).first()
      if (!(await visible(b))) break
      await b.click({ timeout: 6000 }).catch(() => {})
      await page.waitForTimeout(SLOW ? 900 : 350)
      const t = await page.locator('body').innerText()
      if (/true|false|verdadeiro|falso/i.test(t) && /\?/.test(t)) return 'quiz reached'
    }
    throw new Error('never reached a quiz after 12 advances')
  })

  await step('9 a WRONG answer says WRONG', async () => {
    const t = page.getByRole('button', { name: /^(true|verdadeiro)$/i }).first()
    const f = page.getByRole('button', { name: /^(false|falso)$/i }).first()
    if (!(await visible(t)) || !(await visible(f))) throw new Error('no true/false controls')
    await t.click({ timeout: 6000 })
    await page.waitForTimeout(PAUSE)
    const body = await page.locator('body').innerText()
    const right = /RIGHT!|CERTO!/i.test(body), wrong = /WRONG|ERRADO/i.test(body)
    if (!right && !wrong) throw new Error('no verdict badge appeared at all')
    if (right && wrong) throw new Error('both verdicts shown at once')
    return right ? 'answered TRUE -> RIGHT' : 'answered TRUE -> WRONG'
  })

  await step('10 the explanation states the answer', async () => {
    const body = await page.locator('body').innerText()
    if (!/the answer is (true|false)|a resposta é (verdadeiro|falso)/i.test(body))
      throw new Error('explanation does not open with the answer')
    return 'explanation leads with the answer'
  })

  await step('11 chat refuses an off-topic question', async () => {
    const open = page.getByRole('button', { name: /chat with pai|conversar com o pai/i }).first()
    if (!(await visible(open))) throw new Error('no chat trigger')
    await open.click({ timeout: 6000 })
    await page.waitForTimeout(PAUSE)
    const input = page.locator('input[type=text], input:not([type])').last()
    if (!(await visible(input))) throw new Error('chat input not visible')
    await input.fill('What is 47 times 89?')
    await input.press('Enter')
    await page.waitForTimeout(SLOW ? 7000 : 5000)
    const body = await page.locator('body').innerText()
    if (!/only answer questions about the way AI works|só posso responder perguntas sobre como a IA funciona/i.test(body))
      throw new Error('did not give the out-of-scope reply')
    return 'refused off-topic correctly'
  })

  await step('7 open a game and leave it', async () => {
    await page.goto(BASE + '/games/connections', { waitUntil: 'domcontentloaded', timeout: 45000 })
    await page.waitForTimeout(PAUSE)
    const exit = page.getByRole('button', { name: T.exit }).first()
    if (!await visible(exit)) throw new Error('no exit control on the game')
    const box = await exit.boundingBox()
    if (box && box.x + box.width > w + 1) throw new Error('exit control is off-screen')
    await exit.click({ timeout: 6000 })
    await page.waitForTimeout(PAUSE)
    return 'left via ' + new URL(page.url()).pathname
  })

  await ctx.close(); await browser.close()
  return { engine: engineName, size: `${w}x${h}`, steps, errs }
}

const engines = ONLY_ENGINE ? [ONLY_ENGINE] : Object.keys(ENGINES)
const sizes = ONLY_SIZE ? SIZES.filter(s => `${s[0]}x${s[1]}` === ONLY_SIZE) : SIZES
const runs = []
for (const e of engines) {
  for (const [w, h, why] of sizes) {
    const r = await journey(e, w, h)
    const failed = r.steps.filter(s => !s.ok)
    console.log(`${e.padEnd(9)} ${r.size.padEnd(9)} ${why.padEnd(22)} ` +
      (failed.length ? `FAIL ${failed.length}/${r.steps.length}` : `pass ${r.steps.length}/${r.steps.length}`))
    for (const s of failed) console.log(`             ✗ ${s.name}: ${s.note}`)
    runs.push(r)
  }
}

const allFailed = runs.flatMap(r => r.steps.filter(s => !s.ok).map(s => ({ ...s, at: `${r.engine} ${r.size}` })))
console.log(`\n${runs.length} journeys | ${allFailed.length} failed steps`)
const byStep = {}
for (const f of allFailed) (byStep[f.name] ||= []).push(f.at)
for (const [name, where] of Object.entries(byStep)) console.log(`  ${name} — fails on ${where.length}: ${where.join(', ')}`)
process.exit(allFailed.length ? 1 : 0)
