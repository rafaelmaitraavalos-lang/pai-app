'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isElementaryGrade } from '../data/elementary'
import { LANG_STRINGS } from '../data/onboardingStrings'

const DISP  = "'Archivo Black', 'Arial Black', sans-serif"
const BODY  = "'Inter', system-ui, sans-serif"
const BLACK = '#0a0a0a'
const GREY  = '#EBEBEB'
const GREEN = '#3DF542'
const DIM   = '#555555'

const COUNTRIES = [
  { flag: '🇺🇸', name: 'English',    lang: 'en' },
  { flag: '🇧🇷', name: 'Português',  lang: 'pt' },
]

// EN keys — used for internal state & routing logic, never change
const GRADES      = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th']
const GOALS       = ['Make games','Understand the future','Make art','Build robots','Become smarter with tech']
const LEVELS      = ['Nothing at all',"I've used ChatGPT",'I know some coding','I build AI projects']
const FREQUENCIES = ['Never','A few times','Pretty often','Constantly']
const USAGE_TILES = [
  'ChatGPT','YouTube','Siri / Alexa','Netflix / Spotify',
  'Google Search','TikTok / Instagram','Midjourney / DALL-E','Google Maps',
  'Face ID','Autocomplete','Social media filters','Spam filter',
]

const NON_OBVIOUS = new Set([
  'YouTube','Netflix / Spotify','TikTok / Instagram','Google Maps',
  'Face ID','Autocomplete','Social media filters','Spam filter',
])

function shortName(tile: string): string {
  const map: Record<string, string> = {
    'Netflix / Spotify': 'Spotify', 'TikTok / Instagram': 'TikTok',
    'Google Maps': 'Maps', 'Midjourney / DALL-E': 'Midjourney', 'Siri / Alexa': 'Alexa',
  }
  return map[tile] ?? tile
}

type FlipPhase = 'front' | 'squishing' | 'back'

function OptionRow({ label, selected, onSelect }: { label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', padding: '13px 14px', marginBottom: 8,
        background: selected ? BLACK : GREY,
        color: selected ? '#fff' : BLACK,
        border: `1.5px solid ${BLACK}`,
        boxShadow: selected ? 'none' : `3px 3px 0 0 ${BLACK}`,
        transform: selected ? 'translate(3px,3px)' : 'none',
        fontFamily: BODY, fontSize: 14, fontWeight: 600,
        textAlign: 'left', cursor: 'pointer', transition: 'all 0.12s ease',
      }}
    >
      <span>{label}</span>
      {selected && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7l3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  )
}

function CTA({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <div style={{ padding: '8px 20px 24px', flexShrink: 0 }}>
      <button
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        style={{
          width: '100%', padding: '14px 0',
          background: disabled ? '#D4D4D4' : BLACK,
          color: disabled ? '#999' : '#fff',
          border: `1.5px solid ${disabled ? '#D4D4D4' : BLACK}`,
          boxShadow: disabled ? 'none' : `4px 4px 0 0 #555`,
          fontFamily: DISP, fontSize: 13, letterSpacing: '0.1em',
          textTransform: 'uppercase', cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.12s',
        }}
      >
        {label}
      </button>
    </div>
  )
}

export default function Onboarding({ basePath = '' }: { basePath?: string }) {
  const router = useRouter()
  const TOTAL_STEPS = 6

  const [screen, setScreen]           = useState(0)
  const [visible, setVisible]         = useState(true)
  const [country, setCountry]         = useState<typeof COUNTRIES[0] | null>(null)
  const [grade, setGrade]             = useState<string | null>(null)
  const [goal, setGoal]               = useState<string | null>(null)
  const [level, setLevel]             = useState<string | null>(null)
  const [frequency, setFrequency]     = useState<string | null>(null)
  const [screenFlip, setScreenFlip]   = useState<FlipPhase>('front')
  const [usage, setUsage]             = useState<string[]>([])
  const [stage, setStage]             = useState<'onboard' | 'reveal'>('onboard')

  const [revealPhase, setRevealPhase]     = useState<0 | 1 | 2>(0)
  const [revealVisible, setRevealVisible] = useState(false)
  const [glowedTiles, setGlowedTiles]     = useState<Set<string>>(new Set())
  const [countDisplay, setCountDisplay]   = useState(0)
  const [animComplete, setAnimComplete]   = useState(false)
  const [kickerFlip, setKickerFlip]       = useState<FlipPhase>('front')

  // L is the active language strings — falls back to EN until a country is picked
  const L = LANG_STRINGS[country?.lang ?? 'en'] ?? LANG_STRINGS.en

  useEffect(() => {
    if (screen > 0 && stage === 'onboard') {
      const t = setTimeout(() => setVisible(true), 40)
      return () => clearTimeout(t)
    }
  }, [screen, stage])

  useEffect(() => {
    if (country) {
      localStorage.setItem('pai_country', country.name)
      localStorage.setItem('pai_lang', country.lang)
    }
  }, [country])
  useEffect(() => { if (grade) localStorage.setItem('pai_grade', grade) }, [grade])
  useEffect(() => { if (goal)  localStorage.setItem('pai_goal', goal)   }, [goal])
  useEffect(() => { if (level) localStorage.setItem('pai_level', level) }, [level])

  const triggerScreenFlip = (option: string) => {
    setFrequency(option)
    localStorage.setItem('pai_frequency', option)
    setTimeout(() => {
      setScreenFlip('squishing')
      setTimeout(() => setScreenFlip('back'), 300)
    }, 500)
  }

  const toggleUsage = (item: string) => {
    setUsage(prev => {
      const next = prev.includes(item) ? prev.filter(u => u !== item) : [...prev, item]
      localStorage.setItem('pai_usage', JSON.stringify(next))
      return next
    })
  }

  const advance = () => {
    if (screen === TOTAL_STEPS) {
      setVisible(false)
      setTimeout(() => setStage('reveal'), 220)
      return
    }
    setVisible(false)
    setTimeout(() => setScreen(s => s + 1), 220)
  }

  const selectCountry = (c: typeof COUNTRIES[0]) => {
    if (country) return
    setCountry(c)
    setTimeout(() => advance(), 380)
  }

  useEffect(() => {
    if (stage !== 'reveal' || revealVisible) return
    const t = setTimeout(() => setRevealVisible(true), 50)
    return () => clearTimeout(t)
  }, [stage, revealVisible])

  useEffect(() => {
    if (stage !== 'reveal' || revealPhase !== 0) return
    const selected = USAGE_TILES.filter(t => usage.includes(t))
    const timers: ReturnType<typeof setTimeout>[] = []
    selected.forEach((tile, i) => {
      timers.push(setTimeout(() => setGlowedTiles(prev => new Set([...prev, tile])), 300 + i * 200))
    })
    const target = selected.length
    if (target === 0) {
      timers.push(setTimeout(() => setAnimComplete(true), 800))
      return () => timers.forEach(clearTimeout)
    }
    let current = 0
    const tickMs = Math.max(80, 1200 / target)
    let counter: ReturnType<typeof setInterval>
    timers.push(setTimeout(() => {
      counter = setInterval(() => {
        current++
        setCountDisplay(current)
        if (current >= target) {
          clearInterval(counter)
          timers.push(setTimeout(() => setAnimComplete(true), 600))
        }
      }, tickMs)
    }, 200))
    return () => { timers.forEach(clearTimeout); clearInterval(counter) }
  }, [stage, revealPhase, usage])

  const advanceReveal = () => {
    if (revealPhase === 2) {
      const g = localStorage.getItem('pai_grade')
      localStorage.setItem('pai_onboarding_done', 'true')
      router.push(isElementaryGrade(g) ? `${basePath}/elementary/home` : `${basePath}/home`)
      return
    }
    if (revealPhase === 1) {
      setKickerFlip('squishing')
      setTimeout(() => { setRevealPhase(2); setKickerFlip('back') }, 300)
      return
    }
    setRevealVisible(false)
    setTimeout(() => { setRevealPhase(1); setAnimComplete(false) }, 220)
  }

  const showCTA     = screen !== 1 && (screen !== 5 || screenFlip === 'back')
  const canContinue = ([true, true, !!grade, !!goal, !!level, true, true][screen]) ?? true
  const btnLabel    =
    screen === 0 ? L.btnStart :
    screen === 5 ? L.btnLookSee :
    screen === 6 ? L.btnDone : L.btnContinue

  const userNonObvious = usage.filter(u => NON_OBVIOUS.has(u))
  const exampleNames   = userNonObvious.length > 0 ? userNonObvious.slice(0, 4).map(shortName) : ['YouTube', 'Maps', 'Spotify', 'Face ID']
  const bubbleText     = exampleNames.join(', ') + L.bubbleSuffix

  const card: React.CSSProperties = {
    width: '100%', maxWidth: 440, background: '#fff',
    border: `1.5px solid ${BLACK}`, boxShadow: `8px 8px 0 0 ${BLACK}`,
    minHeight: 640, display: 'flex', flexDirection: 'column',
  }
  const page: React.CSSProperties = {
    minHeight: '100vh', background: '#F5F5F5', fontFamily: BODY,
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 20px',
  }
  const header = (
    <div style={{ background: BLACK, padding: '10px 20px', flexShrink: 0 }}>
      <span style={{ fontFamily: DISP, fontSize: 20, color: GREEN, letterSpacing: '-0.02em' }}>PAI</span>
    </div>
  )

  // ── Reveal ───────────────────────────────────────────────────────────────────
  if (stage === 'reveal') {
    return (
      <div style={{ ...page, opacity: revealVisible ? 1 : 0, transform: revealVisible ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 220ms ease, transform 220ms ease' }}>
        <div style={{ ...card, minHeight: 620 }}>
          {header}

          {revealPhase === 0 && (
            <>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', gap: 16, overflowY: 'auto' }}>
                <div style={{ textAlign: 'center' }}>
                  <div key={countDisplay} style={{ fontFamily: DISP, fontSize: 80, color: BLACK, lineHeight: 1 }}>{countDisplay}</div>
                  <p style={{ fontFamily: DISP, fontSize: 16, color: BLACK, margin: '4px 0 0' }}>
                    {usage.length === 1 ? L.toolSingular : L.toolPlural}
                  </p>
                  <p style={{ fontFamily: BODY, fontSize: 13, color: DIM, margin: '4px 0 0', opacity: animComplete ? 1 : 0, transition: 'opacity 0.5s' }}>
                    {L.notNoon}
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  {USAGE_TILES.map((tile, i) => {
                    const sel    = usage.includes(tile)
                    const glowed = glowedTiles.has(tile)
                    return (
                      <div key={tile} style={{
                        padding: '10px 12px',
                        background: glowed ? BLACK : GREY,
                        color: glowed ? '#fff' : sel ? BLACK : '#BBB',
                        border: `1.5px solid ${glowed ? BLACK : '#D4D4D4'}`,
                        fontFamily: BODY, fontSize: 12, fontWeight: 600,
                        transition: 'all 0.4s ease',
                      }}>
                        {L.tiles[i]}
                      </div>
                    )
                  })}
                </div>
              </div>
              <CTA label={L.btnContinue} onClick={advanceReveal} disabled={!animComplete} />
            </>
          )}

          {revealPhase >= 1 && (
            <div style={{
              display: 'flex', flexDirection: 'column', flex: 1,
              transform: kickerFlip === 'squishing' ? 'scaleX(0)' : 'scaleX(1)',
              transition: 'transform 300ms ease-in-out', transformOrigin: 'center',
            }}>
              {kickerFlip !== 'back' ? (
                <>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 20px', gap: 16, justifyContent: 'center' }}>
                    <h2 style={{ fontFamily: DISP, fontSize: 26, color: BLACK, margin: 0 }}>{L.heresThing}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ background: GREY, border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${BLACK}`, padding: '16px 18px' }}>
                        <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{L.youSaid}</p>
                        <p style={{ fontFamily: DISP, fontSize: 22, color: BLACK, margin: 0 }}>&ldquo;{frequency}&rdquo;</p>
                      </div>
                      <div style={{ background: BLACK, border: `1.5px solid ${BLACK}`, padding: '16px 18px' }}>
                        <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 8px' }}>{L.reality}</p>
                        <p style={{ fontFamily: DISP, fontSize: 22, color: '#fff', margin: 0 }}>
                          {usage.length} {usage.length === 1 ? L.interactionSingular : L.interactionPlural}
                        </p>
                        <p style={{ fontFamily: BODY, fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: '4px 0 0' }}>{L.beforeNoon}</p>
                      </div>
                    </div>
                  </div>
                  <CTA label={L.btnContinue} onClick={advanceReveal} />
                </>
              ) : (
                <>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 20px', gap: 20, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ background: GREY, border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${BLACK}`, padding: '16px 20px', maxWidth: 280 }}>
                      <p style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: BLACK, lineHeight: 1.6, margin: '0 0 8px' }}>{bubbleText}</p>
                      <p style={{ fontFamily: DISP, fontSize: 12, color: BLACK, margin: 0 }}>{L.courseAbout}</p>
                    </div>
                    {userNonObvious.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                        {userNonObvious.map(tile => (
                          <span key={tile} style={{ padding: '6px 12px', background: BLACK, color: '#fff', fontFamily: BODY, fontSize: 12, fontWeight: 600, border: `1.5px solid ${BLACK}` }}>
                            {tile}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '8px 20px 24px', flexShrink: 0 }}>
                    <button onClick={advanceReveal} style={{
                      width: '100%', padding: '14px 0',
                      background: GREEN, color: BLACK,
                      border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${BLACK}`,
                      fontFamily: DISP, fontSize: 13, letterSpacing: '0.1em',
                      textTransform: 'uppercase', cursor: 'pointer',
                    }}>
                      {L.startLearning}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── Onboard ──────────────────────────────────────────────────────────────────
  return (
    <div style={page}>
      <div style={card}>
        {header}

        {screen > 0 && (
          <div style={{ padding: '12px 20px 0', display: 'flex', gap: 4, flexShrink: 0 }}>
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 3, background: i < screen ? BLACK : '#D4D4D4', transition: 'background 0.3s' }} />
            ))}
          </div>
        )}

        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          padding: screen === 0 ? '32px 20px 20px' : '20px 20px 16px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 220ms ease, transform 220ms ease',
          overflowY: 'auto',
        }}>

          {/* 0: Welcome */}
          {screen === 0 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, textAlign: 'center' }}>
              <div>
                <div style={{ fontFamily: DISP, fontSize: 72, color: GREEN, lineHeight: 1, letterSpacing: '-0.03em', textShadow: `4px 4px 0 ${BLACK}` }}>PAI</div>
                <div style={{ fontFamily: BODY, fontSize: 11, color: DIM, marginTop: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Your AI Learning Buddy</div>
              </div>
              <div style={{ background: GREY, border: `1.5px solid ${BLACK}`, boxShadow: `3px 3px 0 0 ${BLACK}`, padding: '12px 20px', maxWidth: 260 }}>
                <p style={{ fontFamily: BODY, fontSize: 13, color: BLACK, margin: 0, lineHeight: 1.6 }}>Quick setup — 6 questions, about 2 minutes.</p>
              </div>
            </div>
          )}

          {/* 1: Country */}
          {screen === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>Step 01 / 06</p>
                <h2 style={{ fontFamily: DISP, fontSize: 22, color: BLACK, margin: '0 0 4px', lineHeight: 1.1 }}>What language do you speak?</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {COUNTRIES.map(c => (
                  <button key={c.name} onClick={() => selectCountry(c)} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    padding: '32px 8px 28px', gap: 12,
                    background: country?.name === c.name ? BLACK : GREY,
                    color: country?.name === c.name ? '#fff' : BLACK,
                    border: `1.5px solid ${BLACK}`,
                    boxShadow: country?.name === c.name ? 'none' : `3px 3px 0 0 ${BLACK}`,
                    transform: country?.name === c.name ? 'translate(3px,3px)' : 'none',
                    cursor: 'pointer', transition: 'all 0.12s',
                  }}>
                    <span style={{ fontSize: 48, lineHeight: 1 }}>{c.flag}</span>
                    <span style={{ fontFamily: DISP, fontSize: 15, fontWeight: 700, lineHeight: 1.3, textAlign: 'center' }}>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2: Grade */}
          {screen === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{L.step} 02 / 06</p>
                <h2 style={{ fontFamily: DISP, fontSize: 22, color: BLACK, margin: 0 }}>{L.gradeQ}</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {L.grades.map((display, i) => (
                  <button key={GRADES[i]} onClick={() => setGrade(GRADES[i])} style={{
                    padding: '13px 8px', textAlign: 'center',
                    background: grade === GRADES[i] ? BLACK : GREY,
                    color: grade === GRADES[i] ? '#fff' : BLACK,
                    border: `1.5px solid ${BLACK}`,
                    boxShadow: grade === GRADES[i] ? 'none' : `3px 3px 0 0 ${BLACK}`,
                    transform: grade === GRADES[i] ? 'translate(3px,3px)' : 'none',
                    fontFamily: DISP, fontSize: 13, cursor: 'pointer', transition: 'all 0.12s',
                  }}>
                    {display}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3: Goal */}
          {screen === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{L.step} 03 / 06</p>
                <h2 style={{ fontFamily: DISP, fontSize: 22, color: BLACK, margin: 0 }}>{L.goalQ}</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {L.goals.map((label, i) => (
                  <OptionRow key={GOALS[i]} label={label} selected={goal === GOALS[i]} onSelect={() => setGoal(GOALS[i])} />
                ))}
              </div>
            </div>
          )}

          {/* 4: Level */}
          {screen === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{L.step} 04 / 06</p>
                <h2 style={{ fontFamily: DISP, fontSize: 22, color: BLACK, margin: 0 }}>{L.levelQ}</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {L.levels.map((label, i) => (
                  <OptionRow key={LEVELS[i]} label={label} selected={level === LEVELS[i]} onSelect={() => setLevel(LEVELS[i])} />
                ))}
              </div>
            </div>
          )}

          {/* 5: Frequency + flip */}
          {screen === 5 && (
            <div style={{
              display: 'flex', flexDirection: 'column', flex: 1,
              transform: screenFlip === 'squishing' ? 'scaleX(0)' : 'scaleX(1)',
              transition: 'transform 300ms ease-in-out', transformOrigin: 'center',
            }}>
              {screenFlip !== 'back' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{L.step} 05 / 06</p>
                    <h2 style={{ fontFamily: DISP, fontSize: 20, color: BLACK, margin: 0, lineHeight: 1.2 }}>{L.freqQ}</h2>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {L.freqs.map((label, i) => (
                      <OptionRow key={FREQUENCIES[i]} label={label} selected={frequency === FREQUENCIES[i]} onSelect={() => { if (!frequency) triggerScreenFlip(FREQUENCIES[i]) }} />
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, textAlign: 'center' }}>
                  <div style={{ background: GREY, border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${BLACK}`, padding: '16px 20px', maxWidth: 240 }}>
                    <p style={{ fontFamily: DISP, fontSize: 18, color: BLACK, margin: 0 }}>&ldquo;{L.flipQuote}&rdquo;</p>
                  </div>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'radial-gradient(circle at 40% 33%, #FFE08A, #D4780A 80%)', border: `2px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${BLACK}` }} />
                </div>
              )}
            </div>
          )}

          {/* 6: Usage tiles */}
          {screen === 6 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{L.step} 06 / 06</p>
                <h2 style={{ fontFamily: DISP, fontSize: 22, color: BLACK, margin: '0 0 4px' }}>{L.usageQ}</h2>
                <p style={{ fontFamily: BODY, fontSize: 12, color: DIM, margin: 0 }}>{L.usageSub}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {USAGE_TILES.map((tile, i) => {
                  const sel = usage.includes(tile)
                  return (
                    <button key={tile} onClick={() => toggleUsage(tile)} style={{
                      padding: '11px 12px', textAlign: 'left',
                      background: sel ? BLACK : GREY,
                      color: sel ? '#fff' : BLACK,
                      border: `1.5px solid ${BLACK}`,
                      boxShadow: sel ? 'none' : `3px 3px 0 0 ${BLACK}`,
                      transform: sel ? 'translate(3px,3px)' : 'none',
                      fontFamily: BODY, fontSize: 12, fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.12s',
                    }}>
                      {L.tiles[i]}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

        </div>

        {showCTA && <CTA label={btnLabel} onClick={advance} disabled={!canContinue} />}
      </div>
    </div>
  )
}
