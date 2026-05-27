'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const GRADES = ['K','1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th']
const ELEMENTARY_GRADES = new Set(['K','1st','2nd','3rd','4th','5th'])

const GOALS = [
  'Make games',
  'Understand the future',
  'Make art',
  'Build robots',
  'Become smarter with tech',
]

const LEVELS = [
  'Nothing at all',
  "I've used ChatGPT",
  'I know some coding',
  'I build AI projects',
]

const FREQUENCIES = ['Never', 'A few times', 'Pretty often', 'Constantly']

const USAGE_TILES = [
  'ChatGPT',
  'YouTube',
  'Siri / Alexa',
  'Netflix / Spotify',
  'Google Search',
  'TikTok / Instagram',
  'Midjourney / DALL-E',
  'Google Maps',
  'Face ID',
  'Autocomplete',
  'Snapchat filters',
  'Spam filter',
]

const NON_OBVIOUS = new Set([
  'YouTube', 'Netflix / Spotify', 'TikTok / Instagram', 'Google Maps',
  'Face ID', 'Autocomplete', 'Snapchat filters', 'Spam filter',
])

function shortName(tile: string): string {
  const map: Record<string, string> = {
    'Netflix / Spotify': 'Spotify',
    'TikTok / Instagram': 'TikTok',
    'Google Maps': 'Maps',
    'Midjourney / DALL-E': 'Midjourney',
    'Siri / Alexa': 'Alexa',
  }
  return map[tile] ?? tile
}

type FlipPhase = 'front' | 'squishing' | 'back'

function Mascot({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  const dim = size === 'lg' ? 'w-44 h-44' : 'w-28 h-28'
  const ring = size === 'lg' ? 'inset-5' : 'inset-4'
  return (
    <div style={{ animation: 'paiFloat 3s ease-in-out infinite' }}>
      <div
        className={`relative ${dim} rounded-full`}
        style={{
          background: 'radial-gradient(circle at 40% 33%, #FFE08A, #D4780A 80%)',
          boxShadow:
            size === 'lg'
              ? '0 20px 52px rgba(186,117,23,0.32), 0 0 0 12px rgba(186,117,23,0.08), inset 0 -10px 20px rgba(0,0,0,0.12)'
              : '0 10px 28px rgba(186,117,23,0.30), 0 0 0 6px rgba(186,117,23,0.08), inset 0 -6px 12px rgba(0,0,0,0.12)',
        }}
      >
        <div
          className={`absolute ${ring} rounded-full`}
          style={{
            border: '1.5px solid rgba(255,255,255,0.22)',
            background: 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.18), transparent 65%)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: '18%', left: '20%', width: '30%', height: '20%',
            background: 'rgba(255,255,255,0.38)',
            filter: 'blur(5px)',
          }}
        />
      </div>
    </div>
  )
}

function OptionCard({
  label, selected, onSelect,
}: { label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl border-2 text-left transition-all duration-150 active:scale-[0.98] ${
        selected
          ? 'border-[#BA7517] bg-[#FFF8EE] shadow-[0_4px_14px_rgba(186,117,23,0.18)]'
          : 'border-[#DDD0BC] bg-white hover:border-[#BA7517]/40 hover:shadow-md'
      }`}
    >
      <span className={`font-bold text-[15px] ${selected ? 'text-[#7A4A0A]' : 'text-[#3D1A00]'}`}>
        {label}
      </span>
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${selected ? 'border-[#BA7517] bg-[#BA7517]' : 'border-[#DDD0BC]'}`}>
        {selected && (
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M2 5.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </button>
  )
}

export default function Onboarding() {
  const router = useRouter()

  // ── Onboard state ──────────────────────────────────────────────────────────
  const [screen, setScreen] = useState(0)
  const [visible, setVisible] = useState(true)
  const [grade, setGrade] = useState<string | null>(null)
  const [goal, setGoal] = useState<string | null>(null)
  const [level, setLevel] = useState<string | null>(null)
  const [frequency, setFrequency] = useState<string | null>(null)
  const [screenFlip, setScreenFlip] = useState<FlipPhase>('front')  // screen 4 flip
  const [usage, setUsage] = useState<string[]>([])

  // ── Stage ──────────────────────────────────────────────────────────────────
  const [stage, setStage] = useState<'onboard' | 'reveal'>('onboard')

  // ── Reveal state ───────────────────────────────────────────────────────────
  const [revealPhase, setRevealPhase] = useState<0 | 1 | 2>(0)
  const [revealVisible, setRevealVisible] = useState(false)
  const [glowedTiles, setGlowedTiles] = useState<Set<string>>(new Set())
  const [countDisplay, setCountDisplay] = useState(0)
  const [animComplete, setAnimComplete] = useState(false)
  const [kickerFlip, setKickerFlip] = useState<FlipPhase>('front')

  // ── Onboard effects ────────────────────────────────────────────────────────
  useEffect(() => {
    if (screen > 0 && stage === 'onboard') {
      const t = setTimeout(() => setVisible(true), 40)
      return () => clearTimeout(t)
    }
  }, [screen, stage])

  useEffect(() => { if (grade) localStorage.setItem('pai_grade', grade) }, [grade])
  useEffect(() => { if (goal) localStorage.setItem('pai_goal', goal) }, [goal])
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
    setUsage((prev) => {
      const next = prev.includes(item) ? prev.filter(u => u !== item) : [...prev, item]
      localStorage.setItem('pai_usage', JSON.stringify(next))
      return next
    })
  }

  const advance = () => {
    if (screen === 5) {
      setVisible(false)
      setTimeout(() => setStage('reveal'), 220)
      return
    }
    setVisible(false)
    setTimeout(() => setScreen(s => s + 1), 220)
  }

  // ── Reveal effects ─────────────────────────────────────────────────────────

  // Fade in whenever revealVisible is false (handles both entry and phase transitions)
  useEffect(() => {
    if (stage !== 'reveal' || revealVisible) return
    const t = setTimeout(() => setRevealVisible(true), 50)
    return () => clearTimeout(t)
  }, [stage, revealVisible])

  // Phase 0: staggered tile glow + counter
  useEffect(() => {
    if (stage !== 'reveal' || revealPhase !== 0) return

    const selected = USAGE_TILES.filter(t => usage.includes(t))
    const timers: ReturnType<typeof setTimeout>[] = []

    selected.forEach((tile, i) => {
      const t = setTimeout(() => {
        setGlowedTiles(prev => new Set([...prev, tile]))
      }, 300 + i * 200)
      timers.push(t)
    })

    const target = selected.length
    if (target === 0) {
      const t = setTimeout(() => setAnimComplete(true), 800)
      timers.push(t)
      return () => timers.forEach(clearTimeout)
    }

    let current = 0
    const tickMs = Math.max(80, 1200 / target)
    let counter: ReturnType<typeof setInterval>

    const starter = setTimeout(() => {
      counter = setInterval(() => {
        current++
        setCountDisplay(current)
        if (current >= target) {
          clearInterval(counter)
          const done = setTimeout(() => setAnimComplete(true), 600)
          timers.push(done)
        }
      }, tickMs)
    }, 200)

    timers.push(starter)
    return () => {
      timers.forEach(clearTimeout)
      clearInterval(counter)
    }
  }, [stage, revealPhase, usage])

  const advanceReveal = () => {
    if (revealPhase === 2) { router.push(grade && ELEMENTARY_GRADES.has(grade) ? '/world/6' : '/home'); return }

    if (revealPhase === 1) {
      setKickerFlip('squishing')
      setTimeout(() => {
        setRevealPhase(2)
        setKickerFlip('back')
      }, 300)
      return
    }

    // 0 → 1
    setRevealVisible(false)
    setTimeout(() => {
      setRevealPhase(1)
      setAnimComplete(false)
    }, 220)
  }

  // ── Derived ────────────────────────────────────────────────────────────────
  const TOTAL_STEPS = 5
  const progress = screen > 0 ? (screen / TOTAL_STEPS) * 100 : 0

  const showCTA = screen !== 4 || screenFlip === 'back'
  const canContinue = [true, !!grade, !!goal, !!level, true, true][screen] ?? true

  const btnLabel =
    screen === 0 ? 'Get Started' :
    screen === 4 ? "Let's see" :
    screen === 5 ? "That's it!" : 'Continue'

  const userNonObvious = usage.filter(u => NON_OBVIOUS.has(u))
  const exampleNames = userNonObvious.length > 0
    ? userNonObvious.slice(0, 4).map(shortName)
    : ['YouTube', 'Maps', 'Spotify', 'Face ID']
  const bubbleText = exampleNames.join(', ') + ' — none of those feel like AI. But they all are.'

  // ── Reveal render ──────────────────────────────────────────────────────────
  if (stage === 'reveal') {
    return (
      <div className={`min-h-screen bg-[#F2EBE0] font-sans flex items-center justify-center px-6 py-10 transition-all duration-[220ms] ease-in-out ${revealVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col" style={{ minHeight: '620px' }}>

        {/* Phase 0: Glow + counter */}
        {revealPhase === 0 && (
          <>
            <div className="flex-1 flex flex-col px-5 pt-8 pb-2 gap-5 overflow-y-auto">
              {/* Counter */}
              <div className="text-center">
                <div
                  className="text-[88px] font-black text-[#BA7517] leading-none tabular-nums"
                  style={{ animation: countDisplay > 0 ? 'countPop 0.15s ease-out' : undefined }}
                  key={countDisplay}
                >
                  {countDisplay}
                </div>
                <p className="text-[#3D1A00] font-black text-xl mt-1">
                  AI {usage.length === 1 ? 'tool' : 'tools'} used today
                </p>
                <p className={`text-[#9A5A10] font-medium text-sm mt-1 transition-opacity duration-500 ${animComplete ? 'opacity-100' : 'opacity-0'}`}>
                  And it's not even noon.
                </p>
              </div>

              {/* Tile grid */}
              <div className="grid grid-cols-2 gap-2">
                {USAGE_TILES.map(tile => {
                  const selected = usage.includes(tile)
                  const glowed = glowedTiles.has(tile)
                  return (
                    <div
                      key={tile}
                      className={`px-4 py-3 rounded-xl border-2 font-bold text-sm text-left leading-snug transition-[background-color,border-color,color,opacity] duration-500 ${
                        glowed
                          ? 'border-[#BA7517] bg-[#BA7517] text-white'
                          : selected
                          ? 'border-[#DDD0BC] bg-white text-[#3D1A00] opacity-40'
                          : 'border-[#DDD0BC] bg-white text-[#3D1A00] opacity-15'
                      }`}
                      style={glowed ? { animation: 'tileGlow 0.45s ease-out' } : undefined}
                    >
                      {tile}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="px-5 pb-10 pt-4">
              <button
                onClick={animComplete ? advanceReveal : undefined}
                disabled={!animComplete}
                className={`w-full py-[15px] rounded-2xl font-black text-lg select-none transition-all duration-300 ${
                  animComplete
                    ? 'bg-[#BA7517] text-white shadow-[0_5px_0_#7A4A0A] active:shadow-none active:translate-y-1 cursor-pointer'
                    : 'bg-[#D9C9AE] text-[#A89070] shadow-[0_5px_0_#C4B49A] cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </>
        )}

        {/* Phase 1 + 2: comparison and kicker (with flip between them) */}
        {revealPhase >= 1 && (
          <div
            className="flex flex-col flex-1"
            style={{
              transform: kickerFlip === 'squishing' ? 'scaleX(0)' : 'scaleX(1)',
              transition: 'transform 300ms ease-in-out',
              transformOrigin: 'center',
            }}
          >
            {kickerFlip !== 'back' ? (
              /* Phase 1: Comparison */
              <>
                <div className="flex-1 flex flex-col px-5 pt-10 pb-2 gap-6 justify-center">
                  <h2 className="text-2xl font-black text-[#3D1A00]">Here's the thing.</h2>
                  <div className="flex flex-col gap-3">
                    <div className="bg-white rounded-2xl px-5 py-5">
                      <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#9A5A10] mb-2">You said</p>
                      <p className="text-2xl font-black text-[#3D1A00]">"{frequency}"</p>
                    </div>
                    <div className="rounded-2xl px-5 py-5" style={{ background: '#BA7517' }}>
                      <p className="text-[11px] font-black uppercase tracking-[0.15em] text-white/70 mb-2">Reality</p>
                      <p className="text-2xl font-black text-white">
                        {usage.length} AI {usage.length === 1 ? 'interaction' : 'interactions'}
                      </p>
                      <p className="text-white/75 font-semibold text-sm mt-0.5">before noon</p>
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-10 pt-4">
                  <button
                    onClick={advanceReveal}
                    className="w-full py-[15px] rounded-2xl font-black text-lg bg-[#BA7517] text-white shadow-[0_5px_0_#7A4A0A] active:shadow-none active:translate-y-1 cursor-pointer hover:bg-[#C8851F] select-none transition-all duration-100"
                  >
                    Continue
                  </button>
                </div>
              </>
            ) : (
              /* Phase 2: Kicker */
              <>
                <div className="flex-1 flex flex-col px-5 pt-8 pb-2 gap-5 items-center justify-center text-center">
                  <div className="relative bg-white rounded-2xl px-6 py-4 shadow-sm max-w-[17rem]">
                    <p className="font-bold text-[#3D1A00] text-[15px] leading-relaxed">{bubbleText}</p>
                    <p className="font-black text-[#3D1A00] text-sm mt-2">
                      That's what this course is actually about.
                    </p>
                    <div
                      className="absolute -bottom-[11px] left-1/2 -translate-x-1/2"
                      style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '12px solid white' }}
                    />
                  </div>

                  <Mascot size="sm" />

                  {/* Non-obvious tiles the user tapped */}
                  {userNonObvious.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {userNonObvious.map(t => (
                        <span
                          key={t}
                          className="px-3 py-1.5 rounded-full bg-[#BA7517] text-white font-bold text-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-5 pb-10 pt-4">
                  <button
                    onClick={advanceReveal}
                    className="w-full py-[15px] rounded-2xl font-black text-lg bg-[#BA7517] text-white shadow-[0_5px_0_#7A4A0A] active:shadow-none active:translate-y-1 cursor-pointer hover:bg-[#C8851F] select-none transition-all duration-100"
                  >
                    Start learning
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

  // ── Onboard render ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F2EBE0] font-sans flex items-center justify-center px-6 py-10">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col" style={{ minHeight: '640px' }}>

      {/* Progress bar */}
      <div className="px-5 pt-5 pb-1">
        <div className="h-3 bg-[#E5D4BA] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#BA7517] rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Screen content */}
      <div
        className={`flex-1 flex flex-col px-5 pt-5 pb-2 transition-all duration-[220ms] ease-in-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        {screen === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 gap-8 text-center">
            <Mascot />
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-[#3D1A00] tracking-tight">Meet PAI</h1>
              <p className="text-[#9A5A10] font-semibold text-base">Your personal AI learning buddy</p>
            </div>
          </div>
        )}

        {screen === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#BA7517] mb-1.5">Step 1 of 5</p>
              <h2 className="text-2xl font-black text-[#3D1A00] leading-tight">What grade are you in?</h2>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {GRADES.map(g => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`py-3.5 rounded-xl border-2 font-black text-sm transition-all duration-150 active:scale-[0.93] ${
                    grade === g
                      ? 'border-[#BA7517] bg-[#BA7517] text-white shadow-[0_4px_12px_rgba(186,117,23,0.35)]'
                      : 'border-[#DDD0BC] bg-white text-[#3D1A00] hover:border-[#BA7517]/50 hover:shadow-sm'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {screen === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#BA7517] mb-1.5">Step 2 of 5</p>
              <h2 className="text-2xl font-black text-[#3D1A00] leading-tight">Why do you want to learn AI?</h2>
            </div>
            <div className="flex flex-col gap-2.5">
              {GOALS.map(label => (
                <OptionCard key={label} label={label} selected={goal === label} onSelect={() => setGoal(label)} />
              ))}
            </div>
          </div>
        )}

        {screen === 3 && (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#BA7517] mb-1.5">Step 3 of 5</p>
              <h2 className="text-2xl font-black text-[#3D1A00] leading-tight">How much do you already know?</h2>
            </div>
            <div className="flex flex-col gap-2.5">
              {LEVELS.map(label => (
                <OptionCard key={label} label={label} selected={level === label} onSelect={() => setLevel(label)} />
              ))}
            </div>
          </div>
        )}

        {screen === 4 && (
          <div
            className="flex flex-col flex-1"
            style={{
              transform: screenFlip === 'squishing' ? 'scaleX(0)' : 'scaleX(1)',
              transition: 'transform 300ms ease-in-out',
              transformOrigin: 'center',
            }}
          >
            {screenFlip !== 'back' ? (
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#BA7517] mb-1.5">Step 4 of 5</p>
                  <h2 className="text-2xl font-black text-[#3D1A00] leading-tight">
                    How often do you think you use AI per day?
                  </h2>
                </div>
                <div className="flex flex-col gap-2.5">
                  {FREQUENCIES.map(label => (
                    <OptionCard
                      key={label}
                      label={label}
                      selected={frequency === label}
                      onSelect={() => { if (!frequency) triggerScreenFlip(label) }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 gap-6 text-center">
                <div className="relative bg-white rounded-2xl px-6 py-4 shadow-sm max-w-xs">
                  <p className="font-black text-[#3D1A00] text-xl">"Let's take a look together."</p>
                  <div
                    className="absolute -bottom-[11px] left-1/2 -translate-x-1/2"
                    style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '12px solid white' }}
                  />
                </div>
                <Mascot size="sm" />
              </div>
            )}
          </div>
        )}

        {screen === 5 && (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#BA7517] mb-1.5">Step 5 of 5</p>
              <h2 className="text-2xl font-black text-[#3D1A00] leading-tight">
                Have you used any of these today?
              </h2>
              <p className="text-[#9A5A10] font-medium text-sm mt-1.5">Tap everything that applies.</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {USAGE_TILES.map(tile => {
                const selected = usage.includes(tile)
                return (
                  <button
                    key={tile}
                    onClick={() => toggleUsage(tile)}
                    className={`px-4 py-3.5 rounded-xl border-2 font-bold text-sm text-left leading-snug transition-all duration-150 active:scale-[0.95] ${
                      selected
                        ? 'border-[#BA7517] bg-[#BA7517] text-white shadow-[0_4px_12px_rgba(186,117,23,0.30)]'
                        : 'border-[#DDD0BC] bg-white text-[#3D1A00] hover:border-[#BA7517]/50'
                    }`}
                  >
                    {tile}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {showCTA && (
        <div className="px-5 pb-10 pt-4">
          <button
            onClick={canContinue ? advance : undefined}
            disabled={!canContinue}
            className={`w-full py-[15px] rounded-2xl font-black text-lg select-none transition-all duration-100 ${
              canContinue
                ? 'bg-[#BA7517] text-white shadow-[0_5px_0_#7A4A0A] active:shadow-none active:translate-y-1 cursor-pointer hover:bg-[#C8851F]'
                : 'bg-[#D9C9AE] text-[#A89070] shadow-[0_5px_0_#C4B49A] cursor-not-allowed'
            }`}
          >
            {btnLabel}
          </button>
        </div>
      )}
    </div>
    </div>
  )
}
