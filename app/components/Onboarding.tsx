'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { isElementaryGrade } from '../data/elementary'
import { LANG_STRINGS } from '../data/onboardingStrings'
import { loadProgress, applyProgress } from '@/lib/progress'

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

const GRADES      = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th']
const GOALS       = ['Make games','Understand the future','Make art','Build robots','Become smarter with tech']
const LEVELS      = ['Nothing at all',"I've used ChatGPT",'I know some coding','I build AI projects']
const FREQUENCIES = ['Never','A few times','Pretty often','Constantly']
const USAGE_TILES = [
  'ChatGPT','YouTube','Siri / Alexa','Netflix / Spotify',
  'Google Search','TikTok / Instagram','Midjourney / DALL-E','Google Maps',
  'Face ID','Autocomplete','Social media filters','Spam filter',
]

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
  // Steps: 0=welcome, 1=language, 2=username, 3=grade, 4=goal, 5=level, 6=frequency, 7=usage
  const TOTAL_STEPS = 7

  const [screen, setScreen]         = useState(0)
  const [visible, setVisible]       = useState(true)
  const [country, setCountry]       = useState<typeof COUNTRIES[0] | null>(null)
  const [username, setUsername]      = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [usernameLoading, setUsernameLoading] = useState(false)
  const [saving, setSaving]               = useState(false)
  const [grade, setGrade]           = useState<string | null>(null)
  const [goal, setGoal]             = useState<string | null>(null)
  const [level, setLevel]           = useState<string | null>(null)
  const [frequency, setFrequency]   = useState<string | null>(null)
  const [usage, setUsage]           = useState<string[]>([])
  const usernameRef = useRef<HTMLInputElement>(null)

  const L = LANG_STRINGS[country?.lang ?? 'en'] ?? LANG_STRINGS.en

  useEffect(() => {
    if (localStorage.getItem('pai_onboarding_done') === 'true') {
      const g = localStorage.getItem('pai_grade')
      router.replace(isElementaryGrade(g) ? `${basePath}/elementary/home` : `${basePath}/home`)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (screen === 2) setTimeout(() => usernameRef.current?.focus(), 300)
  }, [screen])

  useEffect(() => {
    if (screen > 0) {
      const t = setTimeout(() => setVisible(true), 40)
      return () => clearTimeout(t)
    }
  }, [screen])

  useEffect(() => {
    if (country) {
      localStorage.setItem('pai_country', country.name)
      localStorage.setItem('pai_lang', country.lang)
    }
  }, [country])
  useEffect(() => { if (grade) localStorage.setItem('pai_grade', grade) }, [grade])
  useEffect(() => { if (goal)  localStorage.setItem('pai_goal', goal)   }, [goal])
  useEffect(() => { if (level) localStorage.setItem('pai_level', level) }, [level])

  const selectFrequency = (option: string) => {
    setFrequency(option)
    localStorage.setItem('pai_frequency', option)
  }

  const toggleUsage = (item: string) => {
    setUsage(prev => {
      const next = prev.includes(item) ? prev.filter(u => u !== item) : [...prev, item]
      localStorage.setItem('pai_usage', JSON.stringify(next))
      return next
    })
  }

  const goHome = (grade: string | null) => {
    localStorage.setItem('pai_onboarding_done', 'true')
    router.push(isElementaryGrade(grade) ? `${basePath}/elementary/home` : `${basePath}/home`)
  }

  const submitUsername = async () => {
    const clean = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '')
    if (!clean) { setUsernameError('Please enter a username'); return }
    setUsernameLoading(true)
    setUsernameError('')
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: clean,
          lang: country?.lang ?? 'en',
        }),
      })
      const data = await res.json()
      if (!res.ok) { setUsernameError(data.error ?? 'Something went wrong'); return }

      const user = data.user
      localStorage.setItem('pai_username', user.username)

      // Returning user — load their profile + progress and go straight home
      if (user.grade) {
        localStorage.setItem('pai_lang',      user.lang ?? 'en')
        localStorage.setItem('pai_grade',     user.grade)
        if (user.goal)      localStorage.setItem('pai_goal',      user.goal)
        if (user.level)     localStorage.setItem('pai_level',     user.level)
        if (user.frequency) localStorage.setItem('pai_frequency', user.frequency)
        if (user.usage)     localStorage.setItem('pai_usage',     JSON.stringify(user.usage))
        applyProgress(user.progress ?? {})
        goHome(user.grade)
        return
      }

      // New user — continue onboarding
      setVisible(false)
      setTimeout(() => setScreen(s => s + 1), 220)
    } catch {
      setUsernameError('Something went wrong. Check your connection.')
    } finally {
      setUsernameLoading(false)
    }
  }

  const advance = async () => {
    if (screen === TOTAL_STEPS) {
      // Final step — AWAIT the profile save so grade is in DB before we navigate
      const g = localStorage.getItem('pai_grade')
      setSaving(true)
      try {
        await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: localStorage.getItem('pai_username'),
            lang: country?.lang ?? 'en',
            grade: g,
            goal:  localStorage.getItem('pai_goal'),
            level: localStorage.getItem('pai_level'),
            frequency: localStorage.getItem('pai_frequency'),
            usage: JSON.parse(localStorage.getItem('pai_usage') ?? '[]'),
          }),
        })
      } catch {}
      goHome(g)
      return
    }
    if (screen === 2) { submitUsername(); return }
    setVisible(false)
    setTimeout(() => setScreen(s => s + 1), 220)
  }

  const selectCountry = (c: typeof COUNTRIES[0]) => {
    if (country) return
    setCountry(c)
    setTimeout(() => { setVisible(false); setTimeout(() => setScreen(s => s + 1), 220) }, 380)
  }

  const showCTA     = screen !== 1
  const canContinue = ([true, true, !!username.trim(), !!grade, !!goal, !!level, !!frequency, true, true][screen]) ?? true
  const btnLabel    = screen === 0 ? L.btnStart : screen === TOTAL_STEPS ? (saving ? '...' : L.btnDone) : (usernameLoading ? '...' : L.btnContinue)

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

          {/* 2: Username */}
          {screen === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{L.step} 01 / 07</p>
                <h2 style={{ fontFamily: DISP, fontSize: 22, color: BLACK, margin: '0 0 4px', lineHeight: 1.1 }}>Choose a username</h2>
                <p style={{ fontFamily: BODY, fontSize: 12, color: DIM, margin: 0 }}>This is how you sign in. Pick one and remember it.</p>
              </div>
              <div>
                <input
                  ref={usernameRef}
                  type="text"
                  value={username}
                  onChange={e => { setUsername(e.target.value); setUsernameError('') }}
                  onKeyDown={e => e.key === 'Enter' && canContinue && submitUsername()}
                  placeholder="e.g. coollearner42"
                  maxLength={30}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  style={{
                    width: '100%', padding: '13px 14px',
                    fontFamily: BODY, fontSize: 16,
                    border: `1.5px solid ${usernameError ? '#e53e3e' : BLACK}`,
                    boxShadow: `3px 3px 0 0 ${usernameError ? '#e53e3e' : BLACK}`,
                    background: '#fff', color: BLACK,
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
                {usernameError && (
                  <p style={{ fontFamily: BODY, fontSize: 12, color: '#e53e3e', margin: '8px 0 0' }}>{usernameError}</p>
                )}
                <p style={{ fontFamily: BODY, fontSize: 11, color: DIM, margin: '8px 0 0' }}>
                  Only letters, numbers, and underscores. Already have one? Just type it to sign back in.
                </p>
              </div>
            </div>
          )}

          {/* 3: Grade */}
          {screen === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{L.step} 02 / 07</p>
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

          {/* 4: Goal */}
          {screen === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{L.step} 03 / 07</p>
                <h2 style={{ fontFamily: DISP, fontSize: 22, color: BLACK, margin: 0 }}>{L.goalQ}</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {L.goals.map((label, i) => (
                  <OptionRow key={GOALS[i]} label={label} selected={goal === GOALS[i]} onSelect={() => setGoal(GOALS[i])} />
                ))}
              </div>
            </div>
          )}

          {/* 5: Level */}
          {screen === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{L.step} 04 / 07</p>
                <h2 style={{ fontFamily: DISP, fontSize: 22, color: BLACK, margin: 0 }}>{L.levelQ}</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {L.levels.map((label, i) => (
                  <OptionRow key={LEVELS[i]} label={label} selected={level === LEVELS[i]} onSelect={() => setLevel(LEVELS[i])} />
                ))}
              </div>
            </div>
          )}

          {/* 6: Frequency */}
          {screen === 6 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{L.step} 05 / 07</p>
                <h2 style={{ fontFamily: DISP, fontSize: 20, color: BLACK, margin: 0, lineHeight: 1.2 }}>{L.freqQ}</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {L.freqs.map((label, i) => (
                  <OptionRow key={FREQUENCIES[i]} label={label} selected={frequency === FREQUENCIES[i]} onSelect={() => selectFrequency(FREQUENCIES[i])} />
                ))}
              </div>
            </div>
          )}

          {/* 7: Usage tiles */}
          {screen === 7 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{L.step} 06 / 07</p>
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
