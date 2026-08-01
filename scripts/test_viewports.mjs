// Layout sweep across the phone sizes Brazilian students actually have.
//
// The audience is not iPhones. Cheap and older Androids dominate, and the most
// common single size in Brazil is 360x640 — narrower and shorter than any
// iPhone. A layout that only ever gets checked at 375x812 will break for most
// of these kids, so this sweeps the real spread, including a 280px foldable
// cover screen and a 320px budget phone.
//
// For every page at every size it checks four things that actually strand a
// child: the page scrolling sideways, fixed controls sitting on top of the text
// being read, content clipped off the edge, and tap targets too small to hit.
//
// Usage:
//   node scripts/test_viewports.mjs
//   node scripts/test_viewports.mjs --lang pt --base http://localhost:3000
import { chromium } from 'playwright'

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : d }
const BASE = arg('base', 'https://paiforkids.com')
const LANG = arg('lang', 'en')

// width x height, with why each one is in the list.
const SIZES = [
  [280, 653, 'foldable cover screen'],
  [320, 568, 'old/budget Android, smallest in real use'],
  [360, 640, 'MOST COMMON Android size in Brazil'],
  [360, 780, 'common tall budget Android'],
  [375, 667, 'iPhone SE'],
  [375, 812, 'iPhone X-13 mini'],
  [390, 844, 'iPhone 12-15'],
  [412, 915, 'large Android (Moto/Samsung A-series)'],
  [768, 1024, 'tablet portrait'],
]

const PAGES = [
  ['/home', 'home'],
  ['/lesson/1', 'lesson (high school)'],
  ['/elementary/lesson/101', 'lesson (elementary)'],
  ['/games/connections', 'game with a grid'],
  ['/games/multimodal', 'game intro'],
  ['/lessons', 'lesson index'],
]

const AUDIT = () => {
  const d = document.documentElement
  const out = { overflow: d.scrollWidth > d.clientWidth + 2, sideways: d.scrollWidth - d.clientWidth, issues: [] }
  // fixed controls covering text
  for (const e of document.querySelectorAll('*')) {
    if (getComputedStyle(e).position !== 'fixed') continue
    const r = e.getBoundingClientRect()
    if (r.width < 8 || r.height < 8) continue
    const under = document.elementsFromPoint(r.x + r.width / 2, r.y + r.height / 2)
      .filter(x => x !== e && !e.contains(x))
    const t = under.find(x => x.innerText && x.innerText.trim().length > 40 &&
      ['P', 'DIV', 'SPAN', 'LI', 'H1', 'H2'].includes(x.tagName))
    if (t) out.issues.push({ type: 'fixed control covers text', covers: t.innerText.trim().slice(0, 45) })
  }
  // content wider than the screen
  for (const e of document.querySelectorAll('body *')) {
    const r = e.getBoundingClientRect()
    if (r.width > 0 && r.right > d.clientWidth + 2 && r.width <= d.clientWidth * 2) {
      out.issues.push({ type: 'clipped at right edge', tag: e.tagName, overhang: Math.round(r.right - d.clientWidth),
        text: (e.innerText || '').trim().slice(0, 35) })
      break
    }
  }
  // tap targets
  for (const e of document.querySelectorAll('button,a,[role=button]')) {
    const r = e.getBoundingClientRect()
    if (r.width === 0) continue
    if (r.width < 32 || r.height < 32) {
      out.issues.push({ type: 'tap target under 32px', label: (e.innerText || '').trim().slice(0, 18),
        size: `${Math.round(r.width)}x${Math.round(r.height)}` })
    }
  }
  return out
}

const browser = await chromium.launch()
const findings = []

for (const [w, h, why] of SIZES) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: w < 700,
    hasTouch: w < 700, deviceScaleFactor: 2, locale: LANG === 'pt' ? 'pt-BR' : 'en-US' })
  await ctx.addInitScript(([lang]) => {
    localStorage.setItem('pai_lang', lang)
    localStorage.setItem('pai_grade', lang === 'pt' ? 'fund1' : 'elem')
    localStorage.setItem('pai_username', 'zz_pw_bot')
    localStorage.setItem('pai_onboarding_done', 'true')
  }, [LANG])

  let line = `${String(w).padStart(3)}x${String(h).padEnd(4)} ${why.padEnd(38)}`
  let bad = 0
  for (const [path, label] of PAGES) {
    const page = await ctx.newPage()
    try {
      await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 40000 })
      await page.waitForTimeout(1200)
      const a = await page.evaluate(AUDIT)
      if (a.overflow) { findings.push({ w, h, path, label, type: 'PAGE SCROLLS SIDEWAYS', detail: `${a.sideways}px` }); bad++ }
      for (const i of a.issues) { findings.push({ w, h, path, label, type: i.type, detail: JSON.stringify(i) }); bad++ }
    } catch (e) {
      findings.push({ w, h, path, label, type: 'page failed to load', detail: String(e).slice(0, 90) }); bad++
    }
    await page.close()
  }
  console.log(line + (bad ? `${bad} issue(s)` : 'clean'))
  await ctx.close()
}
await browser.close()

const bySeverity = t => t === 'PAGE SCROLLS SIDEWAYS' || t === 'page failed to load' ? 0
  : t === 'fixed control covers text' || t === 'clipped at right edge' ? 1 : 2
findings.sort((a, b) => bySeverity(a.type) - bySeverity(b.type))

console.log(`\n${findings.length} finding(s):\n`)
const seen = new Set()
for (const f of findings) {
  const key = `${f.type}|${f.path}|${f.detail}`
  if (seen.has(key)) continue
  seen.add(key)
  console.log(`  [${f.w}x${f.h}] ${f.path}  ${f.type}\n      ${f.detail}`)
}
process.exit(findings.some(f => bySeverity(f.type) === 0) ? 1 : 0)
