'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isElementaryGrade } from '../data/elementary'

const DISP  = "'Archivo Black', 'Arial Black', sans-serif"
const BODY  = "'Inter', system-ui, sans-serif"
const BLACK = '#0a0a0a'
const GREY  = '#EBEBEB'
const GREEN = '#3DF542'
const DIM   = '#555555'

const COUNTRIES = [
  { flag: '🇺🇸', name: 'United States', lang: 'en' },
  { flag: '🇲🇽', name: 'México',        lang: 'es' },
  { flag: '🇧🇷', name: 'Brasil',        lang: 'pt' },
  { flag: '🇬🇧', name: 'UK',            lang: 'en' },
  { flag: '🇨🇦', name: 'Canada',        lang: 'en' },
  { flag: '🇦🇺', name: 'Australia',     lang: 'en' },
  { flag: '🇪🇸', name: 'España',        lang: 'es' },
  { flag: '🇫🇷', name: 'France',        lang: 'fr' },
  { flag: '🇩🇪', name: 'Deutschland',   lang: 'de' },
  { flag: '🇯🇵', name: '日本',           lang: 'ja' },
  { flag: '🇨🇳', name: '中国',           lang: 'zh' },
  { flag: '🇰🇷', name: '한국',           lang: 'ko' },
  { flag: '🇮🇳', name: 'भारत',          lang: 'hi' },
  { flag: '🇦🇷', name: 'Argentina',     lang: 'es' },
  { flag: '🇵🇭', name: 'Pilipinas',     lang: 'tl' },
  { flag: '🌍',  name: 'Other',         lang: 'en' },
]

const GRADES    = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th']
const GRADES_PT = ['1º ano','2º ano','3º ano','4º ano','5º ano','6º ano','7º ano','8º ano','9º ano','1º Médio','2º Médio','3º Médio']

const GOALS    = ['Make games','Understand the future','Make art','Build robots','Become smarter with tech']
const GOALS_PT = ['Criar jogos','Entender o futuro','Criar arte','Construir robôs','Me tornar mais inteligente com tecnologia']

const LEVELS    = ['Nothing at all',"I've used ChatGPT",'I know some coding','I build AI projects']
const LEVELS_PT = ['Nada ainda','Já usei o ChatGPT','Sei um pouco de programação','Já crio projetos com IA']

const FREQUENCIES    = ['Never', 'A few times', 'Pretty often', 'Constantly']
const FREQUENCIES_PT = ['Nunca', 'Algumas vezes', 'Bastante', 'Constantemente']

const USAGE_TILES = [
  'ChatGPT', 'YouTube', 'Siri / Alexa', 'Netflix / Spotify',
  'Google Search', 'TikTok / Instagram', 'Midjourney / DALL-E', 'Google Maps',
  'Face ID', 'Autocomplete', 'Snapchat filters', 'Spam filter',
]

const USAGE_TILES_PT = [
  'ChatGPT', 'YouTube', 'Siri / Alexa', 'Netflix / Spotify',
  'Google Busca', 'TikTok / Instagram', 'Midjourney / DALL-E', 'Google Maps',
  'Face ID', 'Autocompletar', 'Filtros Snapchat', 'Filtro de spam',
]

const NON_OBVIOUS = new Set([
  'YouTube', 'Netflix / Spotify', 'TikTok / Instagram', 'Google Maps',
  'Face ID', 'Autocomplete', 'Snapchat filters', 'Spam filter',
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
        textAlign: 'left', cursor: 'pointer',
        transition: 'all 0.12s ease',
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

export default function Onboarding() {
  const router = useRouter()
  const TOTAL_STEPS = 6

  const [screen, setScreen]       = useState(0)
  const [visible, setVisible]     = useState(true)
  const [country, setCountry]     = useState<typeof COUNTRIES[0] | null>(null)
  const [grade, setGrade]         = useState<string | null>(null)
  const [goal, setGoal]           = useState<string | null>(null)
  const [level, setLevel]         = useState<string | null>(null)
  const [frequency, setFrequency] = useState<string | null>(null)
  const [screenFlip, setScreenFlip] = useState<FlipPhase>('front')
  const [usage, setUsage]         = useState<string[]>([])
  const [stage, setStage]         = useState<'onboard' | 'reveal'>('onboard')

  const [revealPhase, setRevealPhase]   = useState<0 | 1 | 2>(0)
  const [revealVisible, setRevealVisible] = useState(false)
  const [glowedTiles, setGlowedTiles]   = useState<Set<string>>(new Set())
  const [countDisplay, setCountDisplay] = useState(0)
  const [animComplete, setAnimComplete] = useState(false)
  const [kickerFlip, setKickerFlip]     = useState<FlipPhase>('front')

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

  // Reveal: fade in
  useEffect(() => {
    if (stage !== 'reveal' || revealVisible) return
    const t = setTimeout(() => setRevealVisible(true), 50)
    return () => clearTimeout(t)
  }, [stage, revealVisible])

  // Reveal phase 0: staggered glow + counter
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
      const grade = localStorage.getItem('pai_grade')
      router.push(isElementaryGrade(grade) ? '/elementary/home' : '/home')
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

  const isPT = country?.lang === 'pt'
  const t    = (en: string, pt: string) => isPT ? pt : en

  const grades      = isPT ? GRADES_PT      : GRADES
  const goals       = isPT ? GOALS_PT       : GOALS
  const levels      = isPT ? LEVELS_PT      : LEVELS
  const frequencies = isPT ? FREQUENCIES_PT : FREQUENCIES

  const showCTA     = screen !== 1 && (screen !== 5 || screenFlip === 'back')
  const canContinue = ([true, true, !!grade, !!goal, !!level, true, true][screen]) ?? true
  const btnLabel    =
    screen === 0 ? t('Get Started', 'Começar') :
    screen === 5 ? t("Let's see", 'Vamos ver') :
    screen === 6 ? t("That's it!", 'É isso!')  : t('Continue', 'Continuar')

  const usageTiles     = isPT ? USAGE_TILES_PT : USAGE_TILES
  const userNonObvious = usage.filter(u => NON_OBVIOUS.has(u))
  const exampleNames   = userNonObvious.length > 0 ? userNonObvious.slice(0, 4).map(shortName) : ['YouTube', 'Maps', 'Spotify', 'Face ID']
  const bubbleText     = isPT
    ? exampleNames.join(', ') + ' — nenhum desses parece IA. Mas todos são.'
    : exampleNames.join(', ') + ' — none of those feel like AI. But they all are.'

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

  // ── Reveal ──────────────────────────────────────────────────────────────────
  if (stage === 'reveal') {
    return (
      <div style={{ ...page, opacity: revealVisible ? 1 : 0, transform: revealVisible ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 220ms ease, transform 220ms ease' }}>
        <div style={{ ...card, minHeight: 620 }}>
          {header}

          {revealPhase === 0 && (
            <>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', gap: 16, overflowY: 'auto' }}>
                <div style={{ textAlign: 'center' }}>
                  <div key={countDisplay} style={{ fontFamily: DISP, fontSize: 80, color: BLACK, lineHeight: 1 }}>
                    {countDisplay}
                  </div>
                  <p style={{ fontFamily: DISP, fontSize: 16, color: BLACK, margin: '4px 0 0' }}>
                    {isPT
                      ? `${usage.length === 1 ? 'ferramenta de IA' : 'ferramentas de IA'} usadas hoje`
                      : `AI ${usage.length === 1 ? 'tool' : 'tools'} used today`}
                  </p>
                  <p style={{ fontFamily: BODY, fontSize: 13, color: DIM, margin: '4px 0 0', opacity: animComplete ? 1 : 0, transition: 'opacity 0.5s' }}>
                    {t("And it's not even noon.", 'E ainda não é meio-dia.')}
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
                        {usageTiles[i]}
                      </div>
                    )
                  })}
                </div>
              </div>
              <CTA label={t('Continue', 'Continuar')} onClick={advanceReveal} disabled={!animComplete} />
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
                    <h2 style={{ fontFamily: DISP, fontSize: 26, color: BLACK, margin: 0 }}>{t("Here's the thing.", 'Olha só.')}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ background: GREY, border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${BLACK}`, padding: '16px 18px' }}>
                        <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{t('You said', 'Você disse')}</p>
                        <p style={{ fontFamily: DISP, fontSize: 22, color: BLACK, margin: 0 }}>&ldquo;{frequency}&rdquo;</p>
                      </div>
                      <div style={{ background: BLACK, border: `1.5px solid ${BLACK}`, padding: '16px 18px' }}>
                        <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 8px' }}>{t('Reality', 'Realidade')}</p>
                        <p style={{ fontFamily: DISP, fontSize: 22, color: '#fff', margin: 0 }}>
                          {isPT
                            ? `${usage.length} ${usage.length === 1 ? 'interação com IA' : 'interações com IA'}`
                            : `${usage.length} AI ${usage.length === 1 ? 'interaction' : 'interactions'}`}
                        </p>
                        <p style={{ fontFamily: BODY, fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: '4px 0 0' }}>{t('before noon', 'antes do meio-dia')}</p>
                      </div>
                    </div>
                  </div>
                  <CTA label={t('Continue', 'Continuar')} onClick={advanceReveal} />
                </>
              ) : (
                <>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 20px', gap: 20, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ background: GREY, border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${BLACK}`, padding: '16px 20px', maxWidth: 280 }}>
                      <p style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: BLACK, lineHeight: 1.6, margin: '0 0 8px' }}>{bubbleText}</p>
                      <p style={{ fontFamily: DISP, fontSize: 12, color: BLACK, margin: 0 }}>{t("That's what this course is actually about.", 'É disso que esse curso realmente trata.')}</p>
                    </div>
                    {userNonObvious.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                        {userNonObvious.map(t => (
                          <span key={t} style={{ padding: '6px 12px', background: BLACK, color: '#fff', fontFamily: BODY, fontSize: 12, fontWeight: 600, border: `1.5px solid ${BLACK}` }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '8px 20px 24px', flexShrink: 0 }}>
                    <button
                      onClick={advanceReveal}
                      style={{
                        width: '100%', padding: '14px 0',
                        background: GREEN, color: BLACK,
                        border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${BLACK}`,
                        fontFamily: DISP, fontSize: 13, letterSpacing: '0.1em',
                        textTransform: 'uppercase', cursor: 'pointer',
                      }}
                    >
                      {t('Start Learning →', 'Começar a Aprender →')}
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

        {/* Progress segments */}
        {screen > 0 && (
          <div style={{ padding: '12px 20px 0', display: 'flex', gap: 4, flexShrink: 0 }}>
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 3, background: i < screen ? BLACK : '#D4D4D4', transition: 'background 0.3s' }} />
            ))}
          </div>
        )}

        {/* Content */}
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
                <div style={{ fontFamily: BODY, fontSize: 11, color: DIM, marginTop: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{t('Your AI Learning Buddy', 'Sua Parceira de Aprendizado em IA')}</div>
              </div>
              <div style={{ background: GREY, border: `1.5px solid ${BLACK}`, boxShadow: `3px 3px 0 0 ${BLACK}`, padding: '12px 20px', maxWidth: 260 }}>
                <p style={{ fontFamily: BODY, fontSize: 13, color: BLACK, margin: 0, lineHeight: 1.6 }}>{t('Quick setup — 6 questions, about 2 minutes.', 'Configuração rápida — 6 perguntas, cerca de 2 minutos.')}</p>
              </div>
            </div>
          )}

          {/* 1: Country */}
          {screen === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>Step 01 / 06</p>
                <h2 style={{ fontFamily: DISP, fontSize: 22, color: BLACK, margin: '0 0 4px', lineHeight: 1.1 }}>Where are you from?</h2>
                <p style={{ fontFamily: BODY, fontSize: 12, color: DIM, margin: 0 }}>Sets your language automatically. / Define seu idioma.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                {COUNTRIES.map(c => (
                  <button
                    key={c.name}
                    onClick={() => selectCountry(c)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      padding: '10px 4px 8px', gap: 5,
                      background: country?.name === c.name ? BLACK : GREY,
                      color: country?.name === c.name ? '#fff' : BLACK,
                      border: `1.5px solid ${BLACK}`,
                      boxShadow: country?.name === c.name ? 'none' : `3px 3px 0 0 ${BLACK}`,
                      transform: country?.name === c.name ? 'translate(3px,3px)' : 'none',
                      cursor: 'pointer', transition: 'all 0.12s',
                    }}
                  >
                    <span style={{ fontSize: 20, lineHeight: 1 }}>{c.flag}</span>
                    <span style={{ fontFamily: BODY, fontSize: 9, fontWeight: 700, lineHeight: 1.3, textAlign: 'center' }}>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2: Grade */}
          {screen === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{t('Step', 'Passo')} 02 / 06</p>
                <h2 style={{ fontFamily: DISP, fontSize: 22, color: BLACK, margin: 0 }}>{t('What grade are you in?', 'Em que série você está?')}</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {grades.map(g => (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
                    style={{
                      padding: '13px 8px', textAlign: 'center',
                      background: grade === g ? BLACK : GREY,
                      color: grade === g ? '#fff' : BLACK,
                      border: `1.5px solid ${BLACK}`,
                      boxShadow: grade === g ? 'none' : `3px 3px 0 0 ${BLACK}`,
                      transform: grade === g ? 'translate(3px,3px)' : 'none',
                      fontFamily: DISP, fontSize: 13, cursor: 'pointer',
                      transition: 'all 0.12s',
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3: Goal */}
          {screen === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{t('Step', 'Passo')} 03 / 06</p>
                <h2 style={{ fontFamily: DISP, fontSize: 22, color: BLACK, margin: 0 }}>{t('Why do you want to learn AI?', 'Por que você quer aprender sobre IA?')}</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {goals.map((label, i) => (
                  <OptionRow key={label} label={label} selected={goal === GOALS[i]} onSelect={() => setGoal(GOALS[i])} />
                ))}
              </div>
            </div>
          )}

          {/* 4: Level */}
          {screen === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{t('Step', 'Passo')} 04 / 06</p>
                <h2 style={{ fontFamily: DISP, fontSize: 22, color: BLACK, margin: 0 }}>{t('How much do you already know?', 'O quanto você já sabe?')}</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {levels.map((label, i) => (
                  <OptionRow key={label} label={label} selected={level === LEVELS[i]} onSelect={() => setLevel(LEVELS[i])} />
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
                    <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{t('Step', 'Passo')} 05 / 06</p>
                    <h2 style={{ fontFamily: DISP, fontSize: 20, color: BLACK, margin: 0, lineHeight: 1.2 }}>{t('How often do you think you use AI per day?', 'Com que frequência você usa IA por dia?')}</h2>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {frequencies.map((label, i) => (
                      <OptionRow key={label} label={label} selected={frequency === FREQUENCIES[i]} onSelect={() => { if (!frequency) triggerScreenFlip(FREQUENCIES[i]) }} />
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, textAlign: 'center' }}>
                  <div style={{ background: GREY, border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${BLACK}`, padding: '16px 20px', maxWidth: 240 }}>
                    <p style={{ fontFamily: DISP, fontSize: 18, color: BLACK, margin: 0 }}>&ldquo;{t("Let's take a look together.", 'Vamos dar uma olhada juntos.')}&rdquo;</p>
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
                <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>{t('Step', 'Passo')} 06 / 06</p>
                <h2 style={{ fontFamily: DISP, fontSize: 22, color: BLACK, margin: '0 0 4px' }}>{t('Have you used any of these today?', 'Você usou algum desses hoje?')}</h2>
                <p style={{ fontFamily: BODY, fontSize: 12, color: DIM, margin: 0 }}>{t('Tap everything that applies.', 'Toque em tudo que se aplica.')}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {USAGE_TILES.map((tile, i) => {
                  const sel = usage.includes(tile)
                  return (
                    <button
                      key={tile}
                      onClick={() => toggleUsage(tile)}
                      style={{
                        padding: '11px 12px', textAlign: 'left',
                        background: sel ? BLACK : GREY,
                        color: sel ? '#fff' : BLACK,
                        border: `1.5px solid ${BLACK}`,
                        boxShadow: sel ? 'none' : `3px 3px 0 0 ${BLACK}`,
                        transform: sel ? 'translate(3px,3px)' : 'none',
                        fontFamily: BODY, fontSize: 12, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.12s',
                      }}
                    >
                      {usageTiles[i]}
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
