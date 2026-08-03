// Harvest visible text from every game AS PLAYED by a Portuguese student:
// intro → start → early play → (best-effort) a few interactions deep.
// Flags likely-English chrome; dumps all strings for human/editor review.
import { chromium } from 'playwright'
import { readdirSync, writeFileSync } from 'fs'

const BASE = process.argv[2] ?? 'http://localhost:3200'
const LANG = process.argv[3] ?? 'pt'
const GAMES = readdirSync(new URL('../app/games', import.meta.url), { withFileTypes: true })
  .filter(d => d.isDirectory()).map(d => d.name)

// English chrome that must not face a PT student. Loanwords Brazilian PT
// legitimately uses (game, deepfake, machine learning, token, prompt, feed,
// online, chatbot) are deliberately NOT flagged.
const EN_FLAGS = [
  /\b(Click|Tap|Drag|Press|Choose|Select|Match|Guess)\b/,
  /\b(Score|Points?|Level|Round|Time left|Timer|Lives)\b/,
  /\b(Correct|Wrong|Right|Great|Nice|Oops|Try again|Game over|You win|You lose)\b/i,
  /\b(Start|Begin|Next|Continue|Submit|Done|Finish|Skip|Back|Exit|Quit|Play)\b/,
  /\b(the|your|you are|this is|how to)\b/i,
]

const START_RE = /jogar|começar|iniciar|let's go|start|play|começa/i
const results = []
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 900, height: 800 }, locale: 'pt-BR' })
await ctx.addInitScript(p => { try {
  localStorage.setItem('pai_lang', p); localStorage.setItem('pai_grade', 'fund2')
  localStorage.setItem('pai_username', 'zz_qa_ptgames'); localStorage.setItem('pai_onboarding_done', 'true')
} catch {} }, LANG)
const page = await ctx.newPage()

for (const slug of GAMES) {
  const entry = { slug, stages: [], flags: [] }
  try {
    await page.goto(`${BASE}/games/${slug}`, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForTimeout(1500)
    const grab = async stage => {
      const t = (await page.evaluate(() => document.body.innerText)).replace(/\s+/g, ' ').trim()
      entry.stages.push({ stage, text: t.slice(0, 900) })
      for (const re of EN_FLAGS) {
        const m = t.match(re)
        if (m) entry.flags.push(`${stage}: "${m[0]}" in: ...${t.slice(Math.max(0, m.index - 40), m.index + 45)}...`)
      }
    }
    await grab('intro')
    // advance up to 3 screens: start buttons, then generic click-through
    for (let depth = 0; depth < 3; depth++) {
      const btns = page.locator('button:visible')
      const n = await btns.count()
      let clicked = false
      for (let i = 0; i < n; i++) {
        const label = ((await btns.nth(i).textContent().catch(() => '')) || '').trim()
        if (START_RE.test(label) && !/sair|exit/i.test(label)) {
          await btns.nth(i).click({ timeout: 3000 }).catch(() => {})
          clicked = true
          break
        }
      }
      if (!clicked) break
      await page.waitForTimeout(1800)
      await grab(`play-${depth + 1}`)
    }
  } catch (e) {
    entry.flags.push('LOAD/PLAY ERROR: ' + String(e).split('\n')[0])
  }
  results.push(entry)
  console.log(`${slug}: ${entry.stages.length} stages, ${entry.flags.length} EN flags`)
}
await browser.close()

writeFileSync('/private/tmp/claude-502/-Users-sonali/2cb44b2e-1a89-4466-b323-9ad11106455b/scratchpad/pt-games-harvest.json', JSON.stringify(results, null, 1))
const flagged = results.filter(r => r.flags.length)
console.log(`\n${flagged.length}/${results.length} games with English flags:`)
for (const f of flagged) { console.log(`\n== ${f.slug}`); f.flags.slice(0, 6).forEach(x => console.log('  ' + x)) }
