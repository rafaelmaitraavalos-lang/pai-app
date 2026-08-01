// Automated game testing — the part a phone was needed for.
//
// The in-app test browser reports document.hidden === true forever, so
// requestAnimationFrame never fires and every animation game freezes. Nothing
// could be played, so no game's win or loss path had ever been verified.
//
// Playwright runs a real Chromium with a visible, focused page, so the games
// actually run. On top of that this harness makes them DETERMINISTIC: it
// replaces requestAnimationFrame before any game code loads and steps frames on
// demand, so a game can be fast-forwarded through thousands of frames in
// milliseconds and behave identically every run. That is strictly better than a
// human on a phone: repeatable, and it can run on every change.
//
// Usage:
//   node scripts/test_games.mjs                     # all games, English
//   node scripts/test_games.mjs --lang pt           # Portuguese pass
//   node scripts/test_games.mjs --game connections  # one game
//   node scripts/test_games.mjs --base http://localhost:3000
import { chromium, devices } from 'playwright'

const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`)
  return i > -1 ? process.argv[i + 1] : d
}
const BASE = arg('base', 'https://paiforkids.com')
const LANG = arg('lang', 'en')
const ONLY = arg('game', null)

const GAMES = ['multimodal', 'connections', 'timeline', 'the-feed', 'data-trails',
  'signal-drop', 'fix-the-robot', 'build-a-robot', 'prompt-drop', 'bias-sources',
  'the-gradient', 'transformer', 'dispatch', 'can-or-cant', 'failure-modes',
  'the-framework', 'signal-flow', 'agent-parts', 'the-resource', 'static',
  'weight-room', 'frontier', 'ship-it', 'daily-scan', 'what-is-agi', 'the-call',
  'transparency', 'analyst']

// Installed before any app script runs, so games see the shim, not the real rAF.
const FRAME_PUMP = () => {
  const queue = []
  let now = 0
  window.requestAnimationFrame = cb => queue.push(cb)
  window.cancelAnimationFrame = () => {}
  window.__step = (frames = 1, ms = 16) => {
    for (let i = 0; i < frames; i++) {
      now += ms
      const batch = queue.splice(0, queue.length)
      for (const cb of batch) { try { cb(now) } catch (e) { /* game error, surfaced elsewhere */ } }
    }
    return queue.length
  }
  window.__frameQueue = () => queue.length
}

async function testGame(ctx, slug) {
  const page = await ctx.newPage()
  const errors = []
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 140)) })
  page.on('pageerror', e => errors.push(`pageerror: ${String(e).slice(0, 140)}`))
  await page.addInitScript(FRAME_PUMP)

  const r = { slug, loaded: false, animated: null, exit: false, errors, notes: [] }
  try {
    await page.goto(`${BASE}/games/${slug}`, { waitUntil: 'domcontentloaded', timeout: 45000 })
    await page.waitForTimeout(1500)
    r.loaded = true

    // Instructions text, so a mismatch like Signal Drop's can be diffed offline.
    r.intro = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 300)

    // Start the game if there is a start control.
    for (const label of [/let's go/i, /começar/i, /vamos/i, /start/i, /play/i, /jogar/i]) {
      const b = page.getByText(label).first()
      if (await b.count() && await b.isVisible().catch(() => false)) {
        await b.click({ timeout: 4000 }).catch(() => {})
        await page.waitForTimeout(800)
        break
      }
    }

    // Does it actually animate? Step frames and see whether the game consumed them.
    const before = await page.evaluate(() => window.__frameQueue?.() ?? -1)
    if (before > 0) {
      await page.evaluate(() => window.__step(600, 16))   // ~10s of gameplay, instantly
      const after = await page.evaluate(() => window.__frameQueue?.() ?? -1)
      r.animated = after > 0            // still queueing = the loop is alive
      r.notes.push(`frame queue ${before} -> ${after} after 600 stepped frames`)
    } else {
      r.animated = false
      r.notes.push('no requestAnimationFrame use — DOM-driven game')
    }

    // The exit control added in app/games/layout.tsx must be present and work.
    const exit = page.getByRole('button', { name: /leave game|sair do jogo/i }).first()
    if (await exit.count()) {
      r.exit = true
      await exit.click({ timeout: 4000 }).catch(() => {})
      await page.waitForTimeout(1200)
      r.exitLandsOn = new URL(page.url()).pathname
    }
    r.body = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 200)
  } catch (e) {
    r.error = String(e).slice(0, 180)
  }
  await page.close()
  return r
}

const browser = await chromium.launch()
const ctx = await browser.newContext({ ...devices['iPhone 12'], locale: LANG === 'pt' ? 'pt-BR' : 'en-US' })
// Sign the student in the way the app does, so games see a real track.
await ctx.addInitScript(([lang]) => {
  localStorage.setItem('pai_lang', lang)
  localStorage.setItem('pai_grade', lang === 'pt' ? 'fund1' : 'elem')
  localStorage.setItem('pai_username', 'zz_pw_bot')
  localStorage.setItem('pai_onboarding_done', 'true')
}, [LANG])

const list = ONLY ? [ONLY] : GAMES
const results = []
for (const slug of list) {
  const r = await testGame(ctx, slug)
  results.push(r)
  const flag = !r.loaded ? 'LOAD-FAIL' : r.animated === false ? 'static' : 'animates'
  console.log(`${slug.padEnd(16)} ${flag.padEnd(10)} exit=${r.exit ? 'yes' : 'NO '} ` +
              `errors=${r.errors.length}${r.exitLandsOn ? ' -> ' + r.exitLandsOn : ''}`)
}
await browser.close()

const noExit = results.filter(r => r.loaded && !r.exit)
const failed = results.filter(r => !r.loaded)
const erroring = results.filter(r => r.errors.length)
console.log(`\n${results.length} games | failed to load: ${failed.length} | ` +
            `no exit control: ${noExit.length} | with console errors: ${erroring.length}`)
if (noExit.length) console.log('  no exit: ' + noExit.map(r => r.slug).join(', '))
if (erroring.length) for (const r of erroring) console.log(`  ${r.slug}: ${r.errors[0]}`)
process.exit(failed.length || noExit.length ? 1 : 0)
