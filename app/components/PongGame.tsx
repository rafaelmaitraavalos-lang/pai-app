'use client'

import { useEffect, useRef, useState } from 'react'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const RED   = '#FF3B3B'
const BLACK = '#0a0a0a'

const ITEMS = [
  { icon: '🩺', label: 'X-rays reviewed by 3 radiologists each',         shouldCatch: true  },
  { icon: '🚩', label: 'Emails flagged as spam by real users',            shouldCatch: true  },
  { icon: '🔬', label: 'Diagnoses confirmed by biopsy results',           shouldCatch: true  },
  { icon: '🎤', label: 'Audio transcribed by native speakers',            shouldCatch: true  },
  { icon: '⚖️', label: 'Fraud cases confirmed by court records',          shouldCatch: true  },
  { icon: '📰', label: 'Articles fact-checked by 3 journalists each',     shouldCatch: true  },
  { icon: '📸', label: '1 million scraped photos — no labels at all',     shouldCatch: false },
  { icon: '📹', label: 'Footage scraped from surveillance cameras',       shouldCatch: false },
  { icon: '🤖', label: 'Auto-translated — never reviewed by a human',    shouldCatch: false },
  { icon: '🏢', label: 'Hiring records from top tech companies',          shouldCatch: false }, // looks good — historical bias
  { icon: '🌐', label: '10M labeled images — $0.01 per label, 20 sec',   shouldCatch: false }, // looks good — cheap labels
  { icon: '🏥', label: 'Patient data from one hospital, used globally',   shouldCatch: false }, // looks good — no generalization
  { icon: '🚔', label: 'Crime data from an over-policed neighborhood',    shouldCatch: false }, // looks good — systemic bias
  { icon: '🕵️', label: 'Behavior data collected without user disclosure', shouldCatch: false }, // consent issue
  { icon: '⭐', label: 'Reviews from only 1-star and 5-star users',       shouldCatch: false }, // selection bias
  { icon: '📋', label: '200 examples reviewed by certified experts',      shouldCatch: true  }, // small but quality
]

const FACTS = [
  "Supervised learning uses labeled examples. Someone had to mark every single one.",
  "AI doesn't label its own training data — humans do. The labels carry the biases of whoever made them.",
  "More data doesn't fix bad data. A model is only as good as its training set.",
  "Amazon's hiring AI was trained on real hiring decisions. The bias in those decisions was real. The model learned both.",
  "A model trained on one hospital's data may fail for patients at another. Representation matters.",
  "Workers paid $0.01 per label with 20 seconds each can't give careful annotations. Cheap labeling creates cheap models.",
  "When data is collected without telling people it will train AI, consent is broken before the model even exists.",
]

const TOTAL    = ITEMS.length
const PADDLE_H = 88
const PADDLE_W = 14
const BALL_R   = 12
const LIVES    = 3

type Phase = 'intro' | 'countdown' | 'playing' | 'facts' | 'end'

// All mutable game state in one ref — no stale closure issues
interface GS {
  bx: number; by: number; vx: number; vy: number
  paddleY: number
  lives: number
  score: number
  idx: number
  resolved: boolean
  resolvedAt: number
  flash: { text: string; good: boolean; t: number } | null
  items: typeof ITEMS
  spawned: boolean   // ball not yet placed — spawn on first frame
}

export default function PongGame({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gs        = useRef<GS | null>(null)
  const frameRef  = useRef(0)

  const [phase,     setPhase]     = useState<Phase>('intro')
  const [lives,     setLives]     = useState(LIVES)
  const [score,     setScore]     = useState(0)
  const [idx,       setIdx]       = useState(0)
  const [countdown, setCountdown] = useState(3)
  const [factIdx, setFactIdx] = useState(0)
  const [lastMsg, setLastMsg] = useState<{ text: string; good: boolean } | null>(null)

  function shuffle<T>(a: T[]): T[] {
    const b = [...a]
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));[b[i], b[j]] = [b[j], b[i]]
    }
    return b
  }

  function spawnBall(g: GS, W: number, H: number) {
    const speed = 3.8 + g.idx * 0.1
    g.bx = W * 0.15
    g.by = H * (0.3 + Math.random() * 0.4)
    g.vx = speed
    g.vy = (Math.random() - 0.5) * speed * 0.7
    g.resolved = false
    g.resolvedAt = 0
  }

  function resolve(g: GS, hit: boolean, W: number, H: number, now: number) {
    if (g.resolved) return
    g.resolved   = true
    g.resolvedAt = now
    const item    = g.items[g.idx]
    const correct = hit === item.shouldCatch
    if (correct) { g.score++; g.flash = { text: item.shouldCatch ? '✓ Good data — keep it' : '✓ Right — let the bad data go', good: true,  t: now } }
    else          { g.lives--; g.flash = { text: item.shouldCatch ? '✗ That was clean data — hit it back' : '✗ Bad data got through', good: false, t: now } }
    setScore(g.score)
    setLives(g.lives)
    setLastMsg({ text: g.flash!.text, good: correct })
  }

  function startGame() {
    const cv = canvasRef.current
    if (!cv) return
    const W = cv.clientWidth, H = cv.clientHeight
    cv.width = W; cv.height = H

    const g: GS = {
      bx: 0, by: 0, vx: 0, vy: 0,
      paddleY: 0.5,
      lives: LIVES, score: 0, idx: 0,
      resolved: false, resolvedAt: 0,
      flash: null,
      items: shuffle(ITEMS),
      spawned: false,  // spawn on first game-loop frame when canvas has real dimensions
    }
    gs.current = g
    setLives(LIVES); setScore(0); setIdx(0); setLastMsg(null)
    setCountdown(3)
    setPhase('countdown')
  }

  useEffect(() => {
    if (phase !== 'countdown') return
    if (countdown <= 0) { setPhase('playing'); return }
    const t = setTimeout(() => setCountdown(c => c - 1), 900)
    return () => clearTimeout(t)
  }, [phase, countdown])

  useEffect(() => {
    if (phase !== 'playing') return
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')!

    const resize = () => { cv.width = cv.clientWidth; cv.height = cv.clientHeight }
    resize()
    window.addEventListener('resize', resize)

    const loop = (now: number) => {
      const g = gs.current
      if (!g) return
      const W = cv.width, H = cv.height

      // Spawn ball on first real frame (canvas has correct dimensions now)
      if (!g.spawned && W > 0 && H > 0) { spawnBall(g, W, H); g.spawned = true }

      const py = g.paddleY * H
      const paddleX = W - 38

      // ── Advance next item after pause ──────────────────────────────────
      if (g.resolved && now - g.resolvedAt > 700) {
        g.idx++
        setIdx(g.idx)
        if (g.lives <= 0 || g.idx >= TOTAL) {
          setPhase('facts')
          onComplete?.()
          return
        }
        spawnBall(g, W, H)
      }

      // ── Physics ────────────────────────────────────────────────────────
      if (!g.resolved) {
        g.bx += g.vx; g.by += g.vy
        if (g.by - BALL_R < 0)   { g.by = BALL_R;     g.vy =  Math.abs(g.vy) }
        if (g.by + BALL_R > H)   { g.by = H - BALL_R; g.vy = -Math.abs(g.vy) }
        if (g.bx - BALL_R < 0)  { g.bx = BALL_R;     g.vx =  Math.abs(g.vx) }

        // Paddle hit
        if (g.bx + BALL_R >= paddleX && g.vx > 0) {
          const hit = g.by >= py - PADDLE_H / 2 && g.by <= py + PADDLE_H / 2
          if (hit) {
            resolve(g, true, W, H, now)
            g.vx = -Math.abs(g.vx) * 1.06
            const rel = (g.by - py) / (PADDLE_H / 2)
            g.vy = rel * Math.abs(g.vx) * 0.75
          } else if (g.bx > paddleX + PADDLE_W + 4) {
            resolve(g, false, W, H, now)
          }
        }
        if (g.bx - BALL_R > W + 10 && !g.resolved) resolve(g, false, W, H, now)
      }

      // ── Render ─────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = BLACK; ctx.fillRect(0, 0, W, H)

      // Scan lines
      for (let y = 0; y < H; y += 4) { ctx.fillStyle = 'rgba(0,0,0,0.07)'; ctx.fillRect(0, y, W, 2) }

      // White border
      ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 2
      ctx.strokeRect(1, 1, W - 2, H - 2)

      // Divider — white dots
      ctx.setLineDash([6, 10]); ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke()
      ctx.setLineDash([])

      // Left wall — white
      ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(0, 0, 4, H)

      // Paddle
      ctx.fillStyle = GREEN
      ctx.shadowColor = GREEN; ctx.shadowBlur = 18
      ctx.fillRect(paddleX, py - PADDLE_H / 2, PADDLE_W, PADDLE_H)
      ctx.shadowBlur = 0

      // Ball
      const flash = g.flash
      const flashAge = flash ? Math.min(1, (now - flash.t) / 350) : 1
      const ballC = flash && flashAge < 1 ? (flash.good ? GREEN : RED) : '#fff'
      ctx.fillStyle = ballC
      ctx.shadowColor = ballC; ctx.shadowBlur = ballC === '#fff' ? 6 : 22
      ctx.beginPath(); ctx.arc(g.bx, g.by, BALL_R, 0, Math.PI * 2); ctx.fill()
      ctx.shadowBlur = 0

      // Flash text on canvas
      if (flash && flashAge < 1) {
        ctx.globalAlpha = 1 - flashAge
        ctx.fillStyle   = flash.good ? GREEN : RED
        ctx.font        = `700 12px ${BODY}`
        ctx.textAlign   = 'center'
        ctx.fillText(flash.text, W / 2, H * 0.12)
        ctx.globalAlpha = 1
      }

      // Lives dots
      for (let i = 0; i < LIVES; i++) {
        ctx.beginPath(); ctx.arc(16 + i * 16, 16, 5, 0, Math.PI * 2)
        ctx.fillStyle   = i < g.lives ? GREEN : '#222'
        ctx.shadowColor = i < g.lives ? GREEN : 'transparent'
        ctx.shadowBlur  = i < g.lives ? 8 : 0
        ctx.fill(); ctx.shadowBlur = 0
      }

      // Progress bar — right edge
      const prog = (g.idx / TOTAL)
      ctx.fillStyle = '#1a1a1a'; ctx.fillRect(W - 6, 0, 6, H)
      ctx.fillStyle = GREEN
      ctx.shadowColor = GREEN; ctx.shadowBlur = 6
      ctx.fillRect(W - 6, H * (1 - prog), 6, H * prog)
      ctx.shadowBlur = 0

      frameRef.current = requestAnimationFrame(loop)
    }
    frameRef.current = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(frameRef.current); window.removeEventListener('resize', resize) }
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  const onPointer = (e: React.PointerEvent) => {
    if (phase !== 'playing' || !gs.current) return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    gs.current.paddleY = Math.max(0.05, Math.min(0.95, (e.clientY - rect.top) / rect.height))
  }

  const currentItem = gs.current?.items[Math.min(idx, TOTAL - 1)] ?? ITEMS[0]

  // ── Intro ────────────────────────────────────────────────────────────────
  if (phase === 'intro') return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, background: BLACK, overflowY: 'auto' }}>
      <div style={{ maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <p style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: GREEN, margin: '0 0 10px', opacity: 0.6 }}>Signal Drop · W1 M3</p>
          <h1 style={{ fontFamily: DISP, fontSize: 38, color: '#fff', margin: '0 0 14px', lineHeight: 1 }}>Sort the Data</h1>
          <p style={{ fontFamily: BODY, fontSize: 15, color: '#777', lineHeight: 1.65, margin: 0 }}>A data example flies at your paddle. You decide what goes into the training set.</p>
        </div>
        <div style={{ border: '1px solid #222', background: '#0d0d0d' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: DISP, fontSize: 12, color: GREEN, letterSpacing: '0.08em' }}>HIT IT BACK</span>
            <span style={{ fontFamily: BODY, fontSize: 13, color: '#555' }}>good, labeled training data</span>
          </div>
          <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: DISP, fontSize: 12, color: RED, letterSpacing: '0.08em' }}>LET IT PAST</span>
            <span style={{ fontFamily: BODY, fontSize: 13, color: '#555' }}>biased, unlabeled, or bad</span>
          </div>
        </div>
        <p style={{ fontFamily: BODY, fontSize: 13, color: '#3a3a3a', margin: 0, textAlign: 'center' }}>Some will try to trick you. Read carefully.</p>
        <button onClick={startGame} style={{ fontFamily: DISP, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: GREEN, color: BLACK, padding: '16px 0', border: 'none', touchAction: 'manipulation', cursor: 'pointer', boxShadow: `0 0 28px ${GREEN}55` }}>
          Start
        </button>
      </div>
    </div>
  )

  // ── Countdown ────────────────────────────────────────────────────────────
  if (phase === 'countdown') return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: BLACK }} onPointerMove={onPointer}>
      <div style={{ textAlign: 'center' }}>
        <div key={countdown} style={{
          fontFamily: DISP, fontSize: countdown > 0 ? 120 : 64,
          color: countdown > 0 ? '#fff' : GREEN,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          textShadow: `0 0 60px ${countdown > 0 ? 'rgba(255,255,255,0.3)' : GREEN}`,
          animation: 'countPop 0.85s cubic-bezier(0.34,1.56,0.64,1) forwards',
        }}>
          {countdown > 0 ? countdown : 'GO'}
        </div>
      </div>
      <style>{`
        @keyframes countPop {
          0%   { transform: scale(1.4); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )

  // ── Playing ──────────────────────────────────────────────────────────────
  if (phase === 'playing') return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: BLACK }} onPointerMove={onPointer}>
      {/* Big readable item panel */}
      <div style={{ padding: '14px 20px 12px', borderBottom: '1px solid #111', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <span style={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>{currentItem.icon}</span>
        <span style={{ fontFamily: BODY, fontSize: 17, color: '#ddd', lineHeight: 1.45, flex: 1 }}>{currentItem.label}</span>
        <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
          {Array.from({ length: LIVES }, (_, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i < lives ? GREEN : '#222', boxShadow: i < lives ? `0 0 7px ${GREEN}` : 'none' }} />
          ))}
        </div>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} style={{ flex: 1, display: 'block', width: '100%', touchAction: 'none', cursor: 'none' }} />

      {/* Feedback strip */}
      {lastMsg && (
        <div style={{ padding: '8px 20px', background: lastMsg.good ? '#0a1a0a' : '#1a0a0a', borderTop: `1px solid ${lastMsg.good ? '#0f2a0f' : '#2a0f0f'}`, flexShrink: 0 }}>
          <span style={{ fontFamily: BODY, fontSize: 13, color: lastMsg.good ? GREEN : RED }}>{lastMsg.text}</span>
        </div>
      )}
    </div>
  )

  // ── Facts ────────────────────────────────────────────────────────────────
  if (phase === 'facts') {
    const isLast = factIdx === FACTS.length - 1
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, background: BLACK }}>
        <div style={{ maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <p style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: GREEN, opacity: 0.5, margin: 0 }}>{factIdx + 1} / {FACTS.length}</p>
          <div style={{ border: '1px solid #1e1e1e', padding: '24px 22px', background: '#0d0d0d' }}>
            <p style={{ fontFamily: BODY, fontSize: 16, color: '#ccc', lineHeight: 1.75, margin: 0 }}>{FACTS[factIdx]}</p>
          </div>
          <button onClick={() => isLast ? setPhase('end') : setFactIdx(f => f + 1)}
            style={{ fontFamily: DISP, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: GREEN, color: BLACK, padding: '15px 0', border: 'none', touchAction: 'manipulation', cursor: 'pointer', boxShadow: `0 0 18px ${GREEN}55` }}>
            {isLast ? 'See results →' : 'Next →'}
          </button>
        </div>
      </div>
    )
  }

  // ── End ──────────────────────────────────────────────────────────────────
  const pct = score / TOTAL
  const msg = pct >= 0.9 ? 'Clean training set. PAI learned from the right examples.'
            : pct >= 0.7 ? 'Mostly clean. A few bad examples slipped through.'
            : pct >= 0.5 ? 'Noisy data. The model will learn some wrong patterns.'
            :              'Too much bias got through. This is how broken models are built.'
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, background: BLACK }}>
      <div style={{ maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', gap: 22, textAlign: 'center' }}>
        <div>
          <p style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: GREEN, opacity: 0.5, margin: '0 0 12px' }}>Training complete</p>
          <div style={{ fontFamily: DISP, fontSize: 72, color: GREEN, lineHeight: 1, letterSpacing: '-0.03em', textShadow: `0 0 40px ${GREEN}66` }}>
            {score}<span style={{ fontSize: 36, color: '#333' }}>/{TOTAL}</span>
          </div>
        </div>
        <div style={{ border: '1px solid #1e1e1e', padding: '22px', background: '#0d0d0d' }}>
          <p style={{ fontFamily: BODY, fontSize: 15, color: '#bbb', lineHeight: 1.65, margin: 0 }}>{msg}</p>
        </div>
        <button onClick={startGame} style={{ fontFamily: DISP, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: GREEN, color: BLACK, padding: '15px 0', border: 'none', touchAction: 'manipulation', cursor: 'pointer', boxShadow: `0 0 22px ${GREEN}66` }}>
          Play again
        </button>
      </div>
    </div>
  )
}
