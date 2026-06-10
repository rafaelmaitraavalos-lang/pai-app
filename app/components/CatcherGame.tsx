'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { CatcherGame } from '../data/catcherGames'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'
const DIM   = '#555555'
const GREY  = '#EBEBEB'
const RED   = '#FF3B3B'

const LIVES       = 3
const TOTAL_ITEMS = 20   // items per game
const FALL_STEPS  = 12   // how many ticks an item takes to reach bottom
const BASE_TICK   = 420  // ms per tick (gets faster over time)

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface FallingItem {
  id:          number
  text:        string
  shouldCatch: boolean
  lane:        0 | 1        // 0 = left, 1 = right
  step:        number       // 0 (top) → FALL_STEPS (bottom)
}

interface FlashMsg {
  text:  string
  good:  boolean
  id:    number
}

type Phase = 'intro' | 'playing' | 'facts' | 'end'

interface Props {
  game:        CatcherGame
  onComplete?: (score: number, total: number) => void
}

export default function CatcherGame({ game, onComplete }: Props) {
  const [phase,      setPhase]      = useState<Phase>('intro')
  const [queue,      setQueue]      = useState<{ text: string; shouldCatch: boolean }[]>([])
  const [items,      setItems]      = useState<FallingItem[]>([])
  const [catcher,    setCatcher]    = useState<0 | 1>(0)   // lane player is in
  const [lives,      setLives]      = useState(LIVES)
  const [caught,     setCaught]     = useState(0)
  const [spawned,    setSpawned]    = useState(0)
  const [flashes,    setFlashes]    = useState<FlashMsg[]>([])
  const [factIdx,    setFactIdx]    = useState(0)
  const [finalScore, setFinalScore] = useState(0)
  const tickRef    = useRef<ReturnType<typeof setInterval> | null>(null)
  const idRef      = useRef(0)
  const livesRef   = useRef(LIVES)
  const caughtRef  = useRef(0)
  const spawnedRef = useRef(0)
  const queueRef   = useRef<{ text: string; shouldCatch: boolean }[]>([])

  const addFlash = (text: string, good: boolean) => {
    const id = ++idRef.current
    setFlashes(f => [...f, { text, good, id }])
    setTimeout(() => setFlashes(f => f.filter(x => x.id !== id)), 900)
  }

  const buildQueue = useCallback(() => {
    const catchItems = shuffle(game.items.catch).slice(0, TOTAL_ITEMS / 2).map(t => ({ text: t, shouldCatch: true }))
    const dodgeItems = shuffle(game.items.dodge).slice(0, TOTAL_ITEMS / 2).map(t => ({ text: t, shouldCatch: false }))
    return shuffle([...catchItems, ...dodgeItems])
  }, [game])

  const endGame = useCallback((finalCaught: number) => {
    if (tickRef.current) clearInterval(tickRef.current)
    setFinalScore(finalCaught)
    setItems([])
    setFlashes([])
    setFactIdx(0)
    setPhase('facts')
    onComplete?.(finalCaught, TOTAL_ITEMS / 2)
  }, [onComplete])

  const startGame = useCallback(() => {
    const q = buildQueue()
    setQueue(q)
    queueRef.current = q
    setItems([])
    setCatcher(0)
    setLives(LIVES)
    setCaught(0)
    setSpawned(0)
    setFlashes([])
    livesRef.current  = LIVES
    caughtRef.current = 0
    spawnedRef.current = 0
    setPhase('playing')
  }, [buildQueue])

  // Main game tick
  useEffect(() => {
    if (phase !== 'playing') return

    const tickMs = Math.max(BASE_TICK * 0.35, BASE_TICK - spawned * 10) / FALL_STEPS
    let tickCount = 0
    tickRef.current = setInterval(() => {
      tickCount++

      setItems(prev => {
        const moved = prev.map(item => ({ ...item, step: item.step + 1 }))

        // Check items that reached bottom (step >= FALL_STEPS)
        let newLives  = livesRef.current
        let newCaught = caughtRef.current
        const landed: FallingItem[] = []

        for (const item of moved) {
          if (item.step < FALL_STEPS) continue
          landed.push(item)

          // Determine if catcher is in same lane
          const inLane = item.lane === (catcher as 0 | 1)

          if (inLane) {
            if (item.shouldCatch) {
              // Caught a good item
              newCaught++
              addFlash(pick(game.catchReacts), true)
            } else {
              // Caught a bad item (should have dodged)
              newLives--
              addFlash(pick(game.dodgeReacts), false)
            }
          } else {
            if (!item.shouldCatch) {
              // Dodged correctly
              addFlash(pick(game.dodgeReacts), true)
            } else {
              // Missed a catch item
              newLives--
              addFlash(pick(game.missReacts), false)
            }
          }
        }

        livesRef.current  = newLives
        caughtRef.current = newCaught
        setLives(newLives)
        setCaught(newCaught)

        const remaining = moved.filter(i => i.step < FALL_STEPS)

        // Check end conditions
        if (newLives <= 0) {
          setTimeout(() => endGame(newCaught), 300)
          return remaining
        }
        if (spawnedRef.current >= queueRef.current.length && remaining.length === 0) {
          setTimeout(() => endGame(newCaught), 400)
          return remaining
        }

        // Spawn new item every 2 ticks if queue has items and max 2 items on screen
        const canSpawn = tickCount % 2 === 0
          && spawnedRef.current < queueRef.current.length
          && remaining.length < 2

        if (canSpawn) {
          const next = queueRef.current[spawnedRef.current]
          spawnedRef.current++
          setSpawned(spawnedRef.current)
          const newItem: FallingItem = {
            id:          ++idRef.current,
            text:        next.text,
            shouldCatch: next.shouldCatch,
            lane:        (Math.random() < 0.5 ? 0 : 1) as 0 | 1,
            step:        0,
          }
          return [...remaining, newItem]
        }

        return remaining
      })
    }, tickMs)

    return () => { if (tickRef.current) clearInterval(tickRef.current) }
  }, [phase, catcher, endGame, game]) // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard controls
  useEffect(() => {
    if (phase !== 'playing') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  setCatcher(0)
      if (e.key === 'ArrowRight') setCatcher(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase])

  const endScreen = () => {
    const total = TOTAL_ITEMS / 2
    const pct   = finalScore / total
    if (pct === 1)    return game.endScreens.perfect
    if (pct >= 0.75)  return game.endScreens.great
    if (pct >= 0.5)   return game.endScreens.ok
    return game.endScreens.bad
  }

  const wrap: React.CSSProperties = {
    height: '100%', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '20px', fontFamily: BODY,
  }

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (phase === 'intro') return (
    <div style={wrap}>
      <div style={{ maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <p style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>Catcher</p>
          <h1 style={{ fontFamily: DISP, fontSize: 32, color: BLACK, margin: '0 0 16px', lineHeight: 1.1 }}>{game.title}</h1>
          <p style={{ fontFamily: BODY, fontSize: 14, color: BLACK, lineHeight: 1.65, margin: 0 }}>{game.intro}</p>
        </div>
        <div style={{ background: GREY, border: `1.5px solid ${BLACK}`, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontFamily: DISP, fontSize: 11, color: BLACK, margin: 0 }}>← → Move your catcher between lanes</p>
          <p style={{ fontFamily: BODY, fontSize: 12, color: DIM, margin: 0 }}>Items fall in two columns. Get under labeled data to catch it. Stay away from noise.</p>
        </div>
        <button onClick={startGame} style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 0', border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 #555`, cursor: 'pointer' }}>
          {game.ctaLabel}
        </button>
      </div>
    </div>
  )

  // ── Playing ────────────────────────────────────────────────────────────────
  if (phase === 'playing') {
    const LANE_W = 'calc(50% - 4px)'
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', userSelect: 'none' }}>

        {/* HUD */}
        <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {Array.from({ length: LIVES }, (_, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i < lives ? GREEN : GREY, border: `1.5px solid ${BLACK}`, transition: 'background 0.2s' }} />
            ))}
          </div>
          <span style={{ fontFamily: DISP, fontSize: 11, color: DIM }}>{caught} {game.hudLabel}</span>
          <span style={{ fontFamily: DISP, fontSize: 10, color: DIM }}>{spawned}/{TOTAL_ITEMS}</span>
        </div>

        {/* Flash messages */}
        <div style={{ position: 'relative', height: 28, flexShrink: 0 }}>
          {flashes.map(f => (
            <div key={f.id} style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              fontFamily: DISP, fontSize: 11, color: f.good ? GREEN : RED,
              letterSpacing: '0.08em', whiteSpace: 'nowrap',
              animation: 'flashUp 0.9s ease-out forwards',
            }}>
              {f.text}
            </div>
          ))}
        </div>

        {/* Game field — two lanes */}
        <div style={{ flex: 1, display: 'flex', gap: 8, padding: '0 16px', position: 'relative', minHeight: 0 }}>

          {[0, 1].map(lane => (
            <div
              key={lane}
              onClick={() => setCatcher(lane as 0 | 1)}
              style={{
                width: LANE_W, position: 'relative', overflow: 'hidden',
                border: `1.5px solid ${catcher === lane ? BLACK : GREY}`,
                background: catcher === lane ? '#f8f8f8' : '#fff',
                transition: 'border-color 0.15s, background 0.15s',
                cursor: 'pointer',
              }}
            >
              {/* Lane label */}
              <div style={{ position: 'absolute', top: 8, left: 0, right: 0, textAlign: 'center', fontFamily: DISP, fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: GREY }}>
                {lane === 0 ? 'LEFT' : 'RIGHT'}
              </div>

              {/* Falling items in this lane */}
              {items.filter(i => i.lane === lane).map(item => {
                const topPct = (item.step / FALL_STEPS) * 100
                return (
                  <div key={item.id} style={{
                    position: 'absolute',
                    top:   `${topPct}%`,
                    left:  8, right: 8,
                    transform: 'translateY(-50%)',
                    background: item.shouldCatch ? GREY : '#fff',
                    border: `1.5px solid ${item.shouldCatch ? BLACK : GREY}`,
                    padding: '8px 10px',
                    transition: 'top 0.12s linear',
                  }}>
                    {item.shouldCatch && (
                      <div style={{ fontFamily: DISP, fontSize: 7, letterSpacing: '0.1em', textTransform: 'uppercase', color: GREEN, marginBottom: 3 }}>labeled</div>
                    )}
                    <div style={{ fontFamily: BODY, fontSize: 11, color: BLACK, lineHeight: 1.3 }}>{item.text}</div>
                  </div>
                )
              })}

              {/* Catcher at bottom */}
              {catcher === lane && (
                <div style={{
                  position: 'absolute', bottom: 8, left: 8, right: 8,
                  height: 36,
                  background: BLACK,
                  border: `1.5px solid ${GREEN}`,
                  boxShadow: `0 0 12px ${GREEN}66`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: DISP, fontSize: 9, color: GREEN, letterSpacing: '0.12em' }}>CATCH</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tap zone labels */}
        <div style={{ display: 'flex', gap: 8, padding: '8px 16px 12px', flexShrink: 0 }}>
          {[0, 1].map(lane => (
            <button
              key={lane}
              onClick={() => setCatcher(lane as 0 | 1)}
              style={{
                flex: 1, padding: '10px 0',
                fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                background: catcher === lane ? BLACK : GREY,
                color:      catcher === lane ? '#fff' : DIM,
                border: `1.5px solid ${BLACK}`,
                cursor: 'pointer',
                transition: 'all 0.1s',
              }}
            >
              {lane === 0 ? '← Left' : 'Right →'}
            </button>
          ))}
        </div>

        <style>{`
          @keyframes flashUp {
            0%   { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-18px); }
          }
        `}</style>
      </div>
    )
  }

  // ── Facts ─────────────────────────────────────────────────────────────────
  if (phase === 'facts') {
    const fact   = game.facts[factIdx]
    const isLast = factIdx === game.facts.length - 1
    return (
      <div style={wrap}>
        <div style={{ maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: 0 }}>
            Fact {factIdx + 1} of {game.facts.length}
          </p>
          <div style={{ background: GREY, border: `1.5px solid ${BLACK}`, boxShadow: `6px 6px 0 0 ${BLACK}`, padding: '24px 20px' }}>
            <p style={{ fontFamily: BODY, fontSize: 14, color: BLACK, lineHeight: 1.7, margin: 0 }}>{fact}</p>
          </div>
          <button
            onClick={() => isLast ? setPhase('end') : setFactIdx(f => f + 1)}
            style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 0', border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 #555`, cursor: 'pointer' }}
          >
            {isLast ? 'See results →' : 'Next →'}
          </button>
        </div>
      </div>
    )
  }

  // ── End ───────────────────────────────────────────────────────────────────
  return (
    <div style={wrap}>
      <div style={{ maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'center' }}>
        <div>
          <p style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 12px' }}>Training complete</p>
          <div style={{ fontFamily: DISP, fontSize: 64, color: BLACK, lineHeight: 1, letterSpacing: '-0.03em' }}>
            {finalScore}<span style={{ fontSize: 32, color: DIM }}>/{TOTAL_ITEMS / 2}</span>
          </div>
          <p style={{ fontFamily: DISP, fontSize: 11, color: DIM, margin: '4px 0 0', letterSpacing: '0.08em' }}>clean examples caught</p>
        </div>
        <div style={{ background: GREY, border: `1.5px solid ${BLACK}`, boxShadow: `6px 6px 0 0 ${BLACK}`, padding: '20px' }}>
          <p style={{ fontFamily: BODY, fontSize: 14, color: BLACK, lineHeight: 1.6, margin: 0 }}>{endScreen()}</p>
        </div>
        <button onClick={startGame} style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 0', border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 #555`, cursor: 'pointer' }}>
          Play again
        </button>
      </div>
    </div>
  )
}
