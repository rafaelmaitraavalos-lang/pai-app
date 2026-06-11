'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { CatcherGame, CatcherItem } from '../data/catcherGames'

const DISP = "var(--font-display, 'Arial Black', sans-serif)"
const BODY = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const RED   = '#FF3B3B'
const BLACK = '#0a0a0a'
const DIM   = '#555'

const LIVES        = 3
const TOTAL_ITEMS  = 20
const BASKET_W     = 130   // px
const BASKET_H     = 14
const ITEM_W       = 160
const CATCH_ZONE   = 60    // px from bottom where basket can catch

interface FallingItem {
  id:          number
  icon:        string
  label:       string
  shouldCatch: boolean
  x:           number
  xFrac:       number
  startTime:   number
  duration:    number
  done:        boolean
}

interface Flash { id: number; text: string; good: boolean; x: number; y: number }

type Phase = 'intro' | 'playing' | 'facts' | 'end'

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }
function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[b[i], b[j]] = [b[j], b[i]] }
  return b
}

interface Props { game: CatcherGame; onComplete?: (score: number, total: number) => void }

export default function CatcherGame({ game, onComplete }: Props) {
  const [phase,   setPhase]   = useState<Phase>('intro')
  const [lives,   setLives]   = useState(LIVES)
  const [score,   setScore]   = useState(0)
  const [total,   setTotal]   = useState(0)
  const [items,   setItems]   = useState<FallingItem[]>([])
  const [flashes, setFlashes] = useState<Flash[]>([])
  const [basketX, setBasketX] = useState(0.5)  // 0–1 fraction
  const [factIdx, setFactIdx] = useState(0)
  const [finalScore, setFinalScore] = useState(0)
  const [shake,   setShake]   = useState(false)

  const containerRef  = useRef<HTMLDivElement>(null)
  const basketXRef    = useRef(0.5)
  const livesRef      = useRef(LIVES)
  const scoreRef      = useRef(0)
  const totalRef      = useRef(0)
  const queueRef      = useRef<{ icon: string; label: string; shouldCatch: boolean }[]>([])
  const spawnedRef    = useRef(0)
  const frameRef      = useRef<number>(0)
  const lastSpawnRef  = useRef(0)
  const idRef         = useRef(0)
  const flashIdRef    = useRef(0)
  const playingRef    = useRef(false)

  const addFlash = (text: string, good: boolean, x: number, y: number) => {
    const id = ++flashIdRef.current
    setFlashes(f => [...f.slice(-4), { id, text, good, x, y }])
    setTimeout(() => setFlashes(f => f.filter(fl => fl.id !== id)), 900)
  }

  const triggerShake = () => { setShake(true); setTimeout(() => setShake(false), 400) }

  const endGame = useCallback((finalCaught: number) => {
    playingRef.current = false
    cancelAnimationFrame(frameRef.current)
    setFinalScore(finalCaught)
    setItems([])
    setFlashes([])
    setFactIdx(0)
    setTimeout(() => setPhase('facts'), 300)
    onComplete?.(finalCaught, TOTAL_ITEMS / 2)
  }, [onComplete])

  const startGame = useCallback(() => {
    const catchItems = shuffle(game.items.catch).slice(0, TOTAL_ITEMS / 2).map((t: CatcherItem) => ({ ...t, shouldCatch: true }))
    const dodgeItems = shuffle(game.items.dodge).slice(0, TOTAL_ITEMS / 2).map((t: CatcherItem) => ({ ...t, shouldCatch: false }))
    queueRef.current  = shuffle([...catchItems, ...dodgeItems])
    spawnedRef.current = 0
    livesRef.current  = LIVES
    scoreRef.current  = 0
    totalRef.current  = 0
    lastSpawnRef.current = 0
    basketXRef.current = 0.5
    playingRef.current = true
    setLives(LIVES)
    setScore(0)
    setTotal(0)
    setItems([])
    setFlashes([])
    setBasketX(0.5)
    setPhase('playing')
  }, [game])

  // Game loop
  useEffect(() => {
    if (phase !== 'playing') return
    let last = performance.now()

    const loop = (now: number) => {
      if (!playingRef.current) return
      const dt = now - last
      last = now

      const container = containerRef.current
      if (!container) { frameRef.current = requestAnimationFrame(loop); return }
      const h = container.clientHeight

      // Speed: starts at 4.5s fall, ends at 2.2s
      const speed = Math.max(2200, 4500 - spawnedRef.current * 60)
      const spawnInterval = Math.max(1400, 3000 - spawnedRef.current * 40)

      // Spawn
      if (spawnedRef.current < queueRef.current.length) {
        if (now - lastSpawnRef.current > spawnInterval) {
          lastSpawnRef.current = now
          const next = queueRef.current[spawnedRef.current++]
          // Keep away from edges
          const xFrac = 0.1 + Math.random() * 0.8
          const newItem: FallingItem = {
            id: ++idRef.current,
            icon: next.icon,
            label: next.label,
            shouldCatch: next.shouldCatch,
            x: 0, xFrac,
            startTime: now,
            duration: speed,
            done: false,
          }
          setItems(prev => [...prev, newItem])
        }
      }

      setItems(prev => {
        const updated: FallingItem[] = []
        let newLives = livesRef.current
        let newScore = scoreRef.current
        let newTotal = totalRef.current
        let missed   = false

        for (const item of prev) {
          if (item.done) continue
          const elapsed = now - item.startTime
          const progress = elapsed / item.duration   // 0→1
          const yPx = progress * h

          // Basket pixel position
          const bx = basketXRef.current * container.clientWidth
          const itemCenterX = item.xFrac * container.clientWidth

          // Catch zone check
          if (yPx >= h - CATCH_ZONE - BASKET_H && yPx <= h - BASKET_H + 10) {
            const inBasket = Math.abs(itemCenterX - bx) < (BASKET_W / 2 + ITEM_W / 4)
            if (inBasket) {
              if (item.shouldCatch) {
                newScore++
                newTotal++
                addFlash(pick(game.catchReacts), true, item.xFrac, 0.7)
              } else {
                newLives--
                missed = true
                addFlash(pick(game.dodgeReacts), false, item.xFrac, 0.7)
              }
              updated.push({ ...item, done: true })
              continue
            }
          }

          // Fell past bottom
          if (yPx > h + 20) {
            if (item.shouldCatch) {
              newLives--
              missed = true
              addFlash(pick(game.missReacts), false, item.xFrac, 0.85)
            }
            // silently dodge unlabeled
            updated.push({ ...item, done: true })
            continue
          }

          updated.push({ ...item, x: item.xFrac })
        }

        // Persist live state
        if (newLives !== livesRef.current) {
          livesRef.current = newLives
          setLives(newLives)
          if (missed) triggerShake()
        }
        if (newScore !== scoreRef.current) { scoreRef.current = newScore; setScore(newScore) }
        if (newTotal !== totalRef.current) { totalRef.current = newTotal; setTotal(newTotal) }

        const active = updated.filter(i => !i.done)

        // End conditions
        if (newLives <= 0) { setTimeout(() => endGame(newScore), 300); return active }
        if (spawnedRef.current >= queueRef.current.length && active.length === 0) {
          setTimeout(() => endGame(newScore), 400)
          return active
        }
        return active
      })

      frameRef.current = requestAnimationFrame(loop)
    }

    frameRef.current = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(frameRef.current) }
  }, [phase, endGame, game])

  // Pointer / touch tracking
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== 'playing') return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(0.05, Math.min(0.95, (e.clientX - rect.left) / rect.width))
    basketXRef.current = x
    setBasketX(x)
  }

  const endScreen = () => {
    const pct = finalScore / (TOTAL_ITEMS / 2)
    if (pct === 1)   return game.endScreens.perfect
    if (pct >= 0.75) return game.endScreens.great
    if (pct >= 0.5)  return game.endScreens.ok
    return game.endScreens.bad
  }

  // ── Intro ────────────────────────────────────────────────────────────────
  if (phase === 'intro') return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, background: BLACK }}>
      <div style={{ maxWidth: 400, width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <p style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: GREEN, margin: '0 0 10px', opacity: 0.7 }}>Catcher · W1 M3</p>
          <h1 style={{ fontFamily: DISP, fontSize: 36, color: '#fff', margin: '0 0 16px', lineHeight: 1 }}>{game.title}</h1>
          <p style={{ fontFamily: BODY, fontSize: 14, color: '#aaa', lineHeight: 1.65, margin: 0 }}>{game.intro}</p>
        </div>
        <div style={{ border: '1.5px solid #222', padding: '14px 16px', background: '#0d0d0d', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontFamily: DISP, fontSize: 10, color: GREEN, letterSpacing: '0.1em' }}>CATCH — good labeled data</div>
          <div style={{ fontFamily: BODY, fontSize: 11, color: '#666', lineHeight: 1.5 }}>Verified, thoughtfully labeled, trustworthy. Move under it.</div>
          <div style={{ borderTop: '1px solid #222', paddingTop: 8, fontFamily: DISP, fontSize: 10, color: RED, letterSpacing: '0.1em' }}>DODGE — noise or bad data</div>
          <div style={{ fontFamily: BODY, fontSize: 11, color: '#666', lineHeight: 1.5 }}>Unlabeled, biased, or collected without care. Let it fall.</div>
        </div>
        <p style={{ fontFamily: BODY, fontSize: 11, color: '#444', margin: 0, textAlign: 'center' }}>Move with mouse or finger · Read carefully</p>
        <button onClick={startGame} style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', background: GREEN, color: BLACK, padding: '15px 0', border: 'none', cursor: 'pointer', boxShadow: `0 0 24px ${GREEN}66` }}>
          {game.ctaLabel}
        </button>
      </div>
    </div>
  )

  // ── Playing ──────────────────────────────────────────────────────────────
  if (phase === 'playing') {
    const container = containerRef.current
    const w = container?.clientWidth ?? 400
    const h = container?.clientHeight ?? 600
    const bxPx = basketX * w

    return (
      <div
        ref={containerRef}
        onPointerMove={onPointerMove}
        style={{ height: '100%', background: BLACK, position: 'relative', overflow: 'hidden', cursor: 'none', touchAction: 'none' }}
      >
        {/* Scanline overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)', pointerEvents: 'none', zIndex: 1 }} />

        {/* HUD */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, background: 'linear-gradient(to bottom, #000, transparent)' }}>
          <div style={{ display: 'flex', gap: 7 }}>
            {Array.from({ length: LIVES }, (_, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i < lives ? GREEN : '#222', boxShadow: i < lives ? `0 0 8px ${GREEN}` : 'none', transition: 'all 0.3s' }} />
            ))}
          </div>
          <span style={{ fontFamily: DISP, fontSize: 12, color: GREEN, letterSpacing: '0.1em' }}>{score} CAUGHT</span>
          <span style={{ fontFamily: DISP, fontSize: 10, color: '#333', letterSpacing: '0.1em' }}>{spawnedRef.current}/{TOTAL_ITEMS}</span>
        </div>

        {/* Progress bar — right edge */}
        <div style={{ position: 'absolute', top: 16, right: 14, bottom: 44, width: 4, background: '#1a1a1a', borderRadius: 2, zIndex: 10 }}>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: `${(spawnedRef.current / TOTAL_ITEMS) * 100}%`,
            background: GREEN,
            boxShadow: `0 0 8px ${GREEN}`,
            borderRadius: 2,
            transition: 'height 0.3s ease',
          }} />
        </div>

        {/* Falling items */}
        {items.map(item => {
          const elapsed = performance.now() - item.startTime
          const progress = Math.min(1, elapsed / item.duration)
          const yPx = progress * h
          const xPx = item.xFrac * w - ITEM_W / 2

          return (
            <div key={item.id} style={{
              position: 'absolute',
              top: yPx,
              left: xPx,
              width: ITEM_W,
              transform: 'translateY(-50%)',
              background: '#0f0f0f',
              border: '1.5px solid #222',
              padding: '14px 12px 12px',
              zIndex: 5,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 36, lineHeight: 1, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontFamily: BODY, fontSize: 11, color: '#bbb', lineHeight: 1.45, whiteSpace: 'pre-line' }}>
                {item.label}
              </div>
            </div>
          )
        })}

        {/* Flash messages */}
        {flashes.map(f => (
          <div key={f.id} style={{
            position: 'absolute',
            left: `${f.x * 100}%`,
            top: `${f.y * 100}%`,
            transform: 'translateX(-50%)',
            fontFamily: DISP, fontSize: 11,
            color: f.good ? GREEN : RED,
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 20,
            animation: 'floatUp 0.9s ease-out forwards',
          }}>
            {f.text}
          </div>
        ))}

        {/* Basket */}
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: bxPx - BASKET_W / 2,
          width: BASKET_W,
          height: BASKET_H,
          background: GREEN,
          boxShadow: `0 0 20px ${GREEN}, 0 0 40px ${GREEN}66, 0 0 80px ${GREEN}33`,
          animation: shake ? 'shakeX 0.35s ease-out' : undefined,
          zIndex: 10,
        }}>
          {/* Scanner line in basket */}
          <div style={{ position: 'absolute', top: '50%', left: 4, right: 4, height: 1, background: BLACK, opacity: 0.4 }} />
        </div>

        {/* Bottom glow */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: `linear-gradient(to top, ${GREEN}11, transparent)`, pointerEvents: 'none', zIndex: 2 }} />

        <style>{`
          @keyframes floatUp {
            0%   { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-32px); }
          }
          @keyframes shakeX {
            0%, 100% { transform: translateX(0); }
            20%       { transform: translateX(-6px); }
            60%       { transform: translateX(6px); }
          }
        `}</style>
      </div>
    )
  }

  // ── Facts ────────────────────────────────────────────────────────────────
  if (phase === 'facts') {
    const isLast = factIdx === game.facts.length - 1
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, background: BLACK }}>
        <div style={{ maxWidth: 400, width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: GREEN, opacity: 0.6, margin: 0 }}>
            {factIdx + 1} / {game.facts.length}
          </p>
          <div style={{ border: `1.5px solid #222`, padding: '22px 20px', background: '#0d0d0d' }}>
            <p style={{ fontFamily: BODY, fontSize: 14, color: '#ccc', lineHeight: 1.75, margin: 0 }}>{game.facts[factIdx]}</p>
          </div>
          <button onClick={() => isLast ? setPhase('end') : setFactIdx(f => f + 1)}
            style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', background: GREEN, color: BLACK, padding: '14px 0', border: 'none', cursor: 'pointer', boxShadow: `0 0 16px ${GREEN}55` }}>
            {isLast ? 'See results →' : 'Next →'}
          </button>
        </div>
      </div>
    )
  }

  // ── End ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, background: BLACK }}>
      <div style={{ maxWidth: 400, width: '100%', display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'center' }}>
        <div>
          <p style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: GREEN, opacity: 0.6, margin: '0 0 12px' }}>Training complete</p>
          <div style={{ fontFamily: DISP, fontSize: 72, color: GREEN, lineHeight: 1, letterSpacing: '-0.03em', textShadow: `0 0 40px ${GREEN}88` }}>
            {finalScore}<span style={{ fontSize: 36, color: '#333' }}>/{TOTAL_ITEMS / 2}</span>
          </div>
        </div>
        <div style={{ border: '1.5px solid #222', padding: '20px', background: '#0d0d0d' }}>
          <p style={{ fontFamily: BODY, fontSize: 14, color: '#ccc', lineHeight: 1.6, margin: 0 }}>{endScreen()}</p>
        </div>
        <button onClick={startGame} style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', background: GREEN, color: BLACK, padding: '14px 0', border: 'none', cursor: 'pointer', boxShadow: `0 0 20px ${GREEN}66` }}>
          Play again
        </button>
      </div>
    </div>
  )
}
