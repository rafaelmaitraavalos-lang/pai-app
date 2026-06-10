'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { CatcherGame } from '../data/catcherGames'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'
const DIM   = '#555555'
const GREY  = '#EBEBEB'
const RED   = '#FF4444'

const LIVES = 3
const ROUND_COUNT = 16  // total items per game

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

type Phase = 'intro' | 'playing' | 'feedback' | 'facts' | 'end'
type Feedback = 'correct-catch' | 'correct-dodge' | 'wrong' | 'miss'

interface Item {
  text:      string
  shouldCatch: boolean
}

interface Props {
  game:       CatcherGame
  onComplete?: (score: number, total: number) => void
}

export default function CatcherGame({ game, onComplete }: Props) {
  const [phase,    setPhase]    = useState<Phase>('intro')
  const [items,    setItems]    = useState<Item[]>([])
  const [idx,      setIdx]      = useState(0)
  const [lives,    setLives]    = useState(LIVES)
  const [caught,   setCaught]   = useState(0)  // correct catches
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [fbText,   setFbText]   = useState('')
  const [timerPct, setTimerPct] = useState(100)
  const [factIdx,  setFactIdx]  = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Build shuffled item sequence on start
  const startGame = useCallback(() => {
    const catchItems = shuffle(game.items.catch).slice(0, ROUND_COUNT / 2).map(t => ({ text: t, shouldCatch: true }))
    const dodgeItems = shuffle(game.items.dodge).slice(0, ROUND_COUNT / 2).map(t => ({ text: t, shouldCatch: false }))
    setItems(shuffle([...catchItems, ...dodgeItems]))
    setIdx(0); setLives(LIVES); setCaught(0); setFeedback(null)
    setPhase('playing')
  }, [game])

  const currentItem = items[idx]

  // Timer for each item — speeds up as game progresses
  useEffect(() => {
    if (phase !== 'playing') return
    const duration = Math.max(2500, 5000 - idx * 100) // gets faster
    const start = Date.now()
    setTimerPct(100)

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.max(0, 100 - (elapsed / duration) * 100)
      setTimerPct(pct)
      if (pct === 0) {
        clearInterval(timerRef.current!)
        // Time's up — treat as miss if it was a catch item
        if (currentItem?.shouldCatch) {
          showFeedback('miss', pick(game.missReacts))
          setLives(l => l - 1)
        } else {
          // dodged by not acting — counts as correct
          showFeedback('correct-dodge', pick(game.dodgeReacts))
        }
      }
    }, 50)

    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [phase, idx]) // eslint-disable-line react-hooks/exhaustive-deps

  const showFeedback = (type: Feedback, text: string) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setFeedback(type)
    setFbText(text)
    setPhase('feedback')
    setTimeout(() => {
      setFeedback(null)
      setFbText('')
      const nextIdx = idx + 1
      const nextLives = type === 'wrong' || type === 'miss' ? lives - 1 : lives
      if (nextLives <= 0 || nextIdx >= items.length) {
        setPhase('facts')
        setFactIdx(0)
      } else {
        setIdx(nextIdx)
        setPhase('playing')
      }
    }, 1100)
  }

  const handleCatch = () => {
    if (phase !== 'playing') return
    if (currentItem.shouldCatch) {
      setCaught(c => c + 1)
      showFeedback('correct-catch', pick(game.catchReacts))
    } else {
      setLives(l => l - 1)
      showFeedback('wrong', pick(game.missReacts))
    }
  }

  const handleDodge = () => {
    if (phase !== 'playing') return
    if (!currentItem.shouldCatch) {
      showFeedback('correct-dodge', pick(game.dodgeReacts))
    } else {
      setLives(l => l - 1)
      showFeedback('wrong', pick(game.missReacts))
    }
  }

  const endScreen = () => {
    const pct = caught / (items.filter(i => i.shouldCatch).length || 1)
    if (pct === 1)    return game.endScreens.perfect
    if (pct >= 0.8)   return game.endScreens.great
    if (pct >= 0.6)   return game.endScreens.ok
    return game.endScreens.bad
  }

  const wrap: React.CSSProperties = {
    minHeight: '100%', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '24px 20px', fontFamily: BODY,
  }

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (phase === 'intro') return (
    <div style={wrap}>
      <div style={{ maxWidth: 440, width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <p style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 8px' }}>Catcher</p>
          <h1 style={{ fontFamily: DISP, fontSize: 32, color: BLACK, margin: '0 0 16px', lineHeight: 1.1 }}>{game.title}</h1>
          <p style={{ fontFamily: BODY, fontSize: 15, color: BLACK, lineHeight: 1.65, margin: 0 }}>{game.intro}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, background: GREY, border: `1.5px solid ${BLACK}`, padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontFamily: DISP, fontSize: 20, color: GREEN }}>CATCH</div>
            <div style={{ fontFamily: BODY, fontSize: 11, color: DIM, marginTop: 2 }}>labeled data</div>
          </div>
          <div style={{ flex: 1, background: GREY, border: `1.5px solid ${BLACK}`, padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontFamily: DISP, fontSize: 20, color: RED }}>DODGE</div>
            <div style={{ fontFamily: BODY, fontSize: 11, color: DIM, marginTop: 2 }}>unlabeled noise</div>
          </div>
        </div>
        <button
          onClick={startGame}
          style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 0', border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 #555`, cursor: 'pointer', width: '100%' }}
        >
          {game.ctaLabel}
        </button>
      </div>
    </div>
  )

  // ── Playing / Feedback ─────────────────────────────────────────────────────
  if (phase === 'playing' || phase === 'feedback') {
    const fbColor = feedback === 'correct-catch' || feedback === 'correct-dodge' ? GREEN
                  : feedback ? RED : 'transparent'
    return (
      <div style={wrap}>
        <div style={{ maxWidth: 440, width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* HUD */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {Array.from({ length: LIVES }, (_, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i < lives ? GREEN : GREY, border: `1.5px solid ${BLACK}` }} />
              ))}
            </div>
            <span style={{ fontFamily: DISP, fontSize: 11, color: DIM, letterSpacing: '0.08em' }}>
              {caught} {game.hudLabel}
            </span>
            <span style={{ fontFamily: DISP, fontSize: 10, color: DIM, letterSpacing: '0.1em' }}>
              {idx + 1} / {items.length}
            </span>
          </div>

          {/* Timer bar */}
          <div style={{ height: 3, background: GREY, border: `1px solid ${BLACK}` }}>
            <div style={{ height: '100%', background: timerPct > 40 ? BLACK : RED, width: `${timerPct}%`, transition: 'width 50ms linear, background 0.3s' }} />
          </div>

          {/* Item card */}
          <div style={{
            background: phase === 'feedback' ? fbColor : GREY,
            border: `1.5px solid ${BLACK}`,
            boxShadow: `6px 6px 0 0 ${BLACK}`,
            padding: '28px 20px',
            textAlign: 'center',
            minHeight: 120,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'background 0.15s',
          }}>
            {phase === 'feedback' ? (
              <>
                <div style={{ fontFamily: DISP, fontSize: 22, color: BLACK, lineHeight: 1.2 }}>
                  {feedback === 'correct-catch' || feedback === 'correct-dodge' ? '✓' : '✗'}
                </div>
                <div style={{ fontFamily: BODY, fontSize: 14, color: BLACK, fontWeight: 600 }}>{fbText}</div>
              </>
            ) : (
              <>
                <div style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM, marginBottom: 4 }}>
                  {currentItem?.shouldCatch ? 'Incoming data' : 'Incoming signal'}
                </div>
                <div style={{ fontFamily: DISP, fontSize: 17, color: BLACK, lineHeight: 1.3 }}>
                  {currentItem?.text}
                </div>
              </>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button
              onClick={handleCatch}
              disabled={phase === 'feedback'}
              style={{
                fontFamily: DISP, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
                background: BLACK, color: GREEN, padding: '16px 0',
                border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${GREEN}`,
                cursor: phase === 'feedback' ? 'default' : 'pointer',
                opacity: phase === 'feedback' ? 0.4 : 1,
              }}
            >
              {game.catchLabel}
            </button>
            <button
              onClick={handleDodge}
              disabled={phase === 'feedback'}
              style={{
                fontFamily: DISP, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
                background: '#fff', color: BLACK, padding: '16px 0',
                border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${BLACK}`,
                cursor: phase === 'feedback' ? 'default' : 'pointer',
                opacity: phase === 'feedback' ? 0.4 : 1,
              }}
            >
              {game.dodgeLabel}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Facts ─────────────────────────────────────────────────────────────────
  if (phase === 'facts') {
    const fact = game.facts[factIdx]
    const isLast = factIdx === game.facts.length - 1
    return (
      <div style={wrap}>
        <div style={{ maxWidth: 440, width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: 0 }}>
            Fact {factIdx + 1} of {game.facts.length}
          </p>
          <div style={{ background: GREY, border: `1.5px solid ${BLACK}`, boxShadow: `6px 6px 0 0 ${BLACK}`, padding: '24px 20px' }}>
            <p style={{ fontFamily: BODY, fontSize: 15, color: BLACK, lineHeight: 1.7, margin: 0 }}>{fact}</p>
          </div>
          <button
            onClick={() => {
              if (isLast) { setPhase('end') ; onComplete?.(caught, items.filter(i => i.shouldCatch).length) }
              else setFactIdx(f => f + 1)
            }}
            style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 0', border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 #555`, cursor: 'pointer', width: '100%' }}
          >
            {isLast ? 'See results →' : 'Next →'}
          </button>
        </div>
      </div>
    )
  }

  // ── End ───────────────────────────────────────────────────────────────────
  const total = items.filter(i => i.shouldCatch).length
  return (
    <div style={wrap}>
      <div style={{ maxWidth: 440, width: '100%', display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'center' }}>
        <div>
          <p style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, margin: '0 0 12px' }}>Training complete</p>
          <div style={{ fontFamily: DISP, fontSize: 64, color: BLACK, lineHeight: 1, letterSpacing: '-0.03em' }}>
            {caught}<span style={{ fontSize: 32, color: DIM }}>/{total}</span>
          </div>
          <p style={{ fontFamily: DISP, fontSize: 11, color: DIM, margin: '4px 0 0', letterSpacing: '0.08em' }}>clean examples caught</p>
        </div>
        <div style={{ background: GREY, border: `1.5px solid ${BLACK}`, boxShadow: `6px 6px 0 0 ${BLACK}`, padding: '20px' }}>
          <p style={{ fontFamily: BODY, fontSize: 14, color: BLACK, lineHeight: 1.6, margin: 0 }}>{endScreen()}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={startGame}
            style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 0', border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 #555`, cursor: 'pointer' }}
          >
            Play again
          </button>
        </div>
      </div>
    </div>
  )
}
