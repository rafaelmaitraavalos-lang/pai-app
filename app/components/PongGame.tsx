'use client'

import { useEffect, useRef, useState } from 'react'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const RED   = '#FF3B3B'
const BLACK = '#0a0a0a'

// shouldCatch = true  → GREEN header → HIT IT
// shouldCatch = false → RED header  → LET IT PAST
const ITEMS = [
  { label: 'Expert-verified diagnoses',          shouldCatch: true  },
  { label: 'Native speaker transcriptions',      shouldCatch: true  },
  { label: '3 radiologists per scan',            shouldCatch: true  },
  { label: 'Court-confirmed fraud cases',        shouldCatch: true  },
  { label: 'Certified biologist labels',         shouldCatch: true  },
  { label: 'Independent fact-checkers',          shouldCatch: true  },
  { label: 'Domain expert annotations',          shouldCatch: true  },
  { label: 'Peer-reviewed ground truth',         shouldCatch: true  },
  { label: 'Surveillance footage',               shouldCatch: false },
  { label: 'No labels — raw data',               shouldCatch: false },
  { label: 'Machine auto-translated',            shouldCatch: false },
  { label: 'Biased hiring history',              shouldCatch: false },
  { label: '$0.01 labels, 20 seconds each',      shouldCatch: false },
  { label: 'One hospital, global model',         shouldCatch: false },
  { label: 'Over-policed neighborhood data',     shouldCatch: false },
  { label: 'Collected without user consent',     shouldCatch: false },
  { label: 'Only 1-star and 5-star reviews',     shouldCatch: false },
  { label: 'Half the respondents misread it',    shouldCatch: false },
]

const VERDICTS = [
  { min: 0.9, text: "CLEAN DATASET.", sub: "Your AI is sharp. That's how it's done." },
  { min: 0.7, text: "MOSTLY CLEAN.", sub: "Some bad examples slipped in. Your model has minor issues." },
  { min: 0.5, text: "NOISY TRAINING SET.", sub: "Your AI learned some wrong patterns. It'll make mistakes." },
  { min: 0,   text: "YOU BUILT A BROKEN AI.", sub: "Too much bias got through. Your model is going to cause real problems." },
]

const FACTS = [
  "AI doesn't label its own training data — humans do. The labels carry the biases of whoever made them.",
  "More data doesn't fix bad data. A model trained on a million bad examples is worse than one trained on a thousand good ones.",
  "Amazon's hiring AI was trained on real hiring decisions. The bias in those decisions was real. The model learned both.",
  "A model trained on data from one hospital may fail for patients at another. Who's in the data matters.",
  "Workers paid $0.01 per label with 20 seconds each can't give careful annotations. Cheap labeling creates cheap models.",
  "When data is collected without consent, the privacy violation happens before the model even exists.",
]

const TOTAL    = ITEMS.length
const PADDLE_H = 80
const PADDLE_W = 12
const BALL_R   = 11
const LIVES    = 3
const AI_SPEED = 4.5

type Phase = 'intro' | 'countdown' | 'playing' | 'facts' | 'end'

function shuffle<T>(a: T[]): T[] {
  const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[b[i], b[j]] = [b[j], b[i]] } return b
}

interface GS {
  bx: number; by: number; vx: number; vy: number
  aiY: number        // AI paddle center (0–H)
  playerY: number    // player paddle center (0–H)
  lives: number; score: number; idx: number
  decided: boolean   // player already made decision this pass
  flash: { text: string; good: boolean; t: number } | null
  items: typeof ITEMS
  spawned: boolean
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
  const [factIdx,   setFactIdx]   = useState(0)

  function spawnBall(g: GS, W: number, H: number) {
    const speed = 5 + g.idx * 0.15
    g.bx = W * 0.5; g.by = H * (0.3 + Math.random() * 0.4)
    g.vx = speed * (Math.random() > 0.5 ? 1 : -1)
    g.vy = (Math.random() - 0.5) * speed * 0.6
    g.decided = false
  }

  function startGame() {
    gs.current = {
      bx: 0, by: 0, vx: 0, vy: 0,
      aiY: 0, playerY: 0,
      lives: LIVES, score: 0, idx: 0,
      decided: false, flash: null,
      items: shuffle(ITEMS), spawned: false,
    }
    setLives(LIVES); setScore(0); setIdx(0)
    setCountdown(3); setPhase('countdown')
  }

  useEffect(() => {
    if (phase !== 'countdown') return
    if (countdown <= 0) { setPhase('playing'); return }
    const t = setTimeout(() => setCountdown(c => c - 1), 850)
    return () => clearTimeout(t)
  }, [phase, countdown])

  useEffect(() => {
    if (phase !== 'playing') return
    const cv = canvasRef.current; if (!cv) return
    const ctx = cv.getContext('2d')!

    const resize = () => { cv.width = cv.clientWidth; cv.height = cv.clientHeight }
    resize(); window.addEventListener('resize', resize)

    const loop = (now: number) => {
      const g = gs.current; if (!g) return
      const W = cv.width, H = cv.height

      if (!g.spawned && W > 0 && H > 0) {
        g.aiY = H / 2; g.playerY = H / 2
        spawnBall(g, W, H); g.spawned = true
      }

      const PLAYER_X = W - 28
      const AI_X     = 18

      // ── AI paddle tracks ball ────────────────────────────────────────────
      const aiTarget = g.by
      const aiDiff   = aiTarget - g.aiY
      g.aiY += Math.sign(aiDiff) * Math.min(AI_SPEED, Math.abs(aiDiff))

      // ── Physics ──────────────────────────────────────────────────────────
      g.bx += g.vx; g.by += g.vy
      if (g.by - BALL_R < 0)   { g.by = BALL_R;     g.vy =  Math.abs(g.vy) }
      if (g.by + BALL_R > H)   { g.by = H - BALL_R; g.vy = -Math.abs(g.vy) }

      // AI paddle (left)
      if (g.bx - BALL_R <= AI_X + PADDLE_W && g.vx < 0) {
        if (Math.abs(g.by - g.aiY) < PADDLE_H / 2) {
          g.bx = AI_X + PADDLE_W + BALL_R
          g.vx = Math.abs(g.vx) * 1.04
          const rel = (g.by - g.aiY) / (PADDLE_H / 2)
          g.vy = rel * Math.abs(g.vx) * 0.7
          g.decided = false  // new pass coming toward player
        } else if (g.bx < AI_X) {
          // AI missed — reset ball
          spawnBall(g, W, H)
        }
      }

      // Player paddle (right)
      if (g.bx + BALL_R >= PLAYER_X && g.vx > 0 && !g.decided) {
        const hit = Math.abs(g.by - g.playerY) < PADDLE_H / 2
        g.decided = true
        const item = g.items[g.idx]
        const correct = hit === item.shouldCatch

        if (correct) {
          g.score++; setScore(g.score)
          g.flash = { text: hit ? '✓ Good data — into the set' : '✓ Right — reject that', good: true, t: now }
        } else {
          g.lives--; setLives(g.lives)
          g.flash = { text: hit ? '✗ That was bad data' : '✗ That was clean data', good: false, t: now }
        }

        if (hit) {
          // bounce back for rallying
          g.bx = PLAYER_X - BALL_R
          g.vx = -Math.abs(g.vx) * 1.04
          const rel = (g.by - g.playerY) / (PADDLE_H / 2)
          g.vy = rel * Math.abs(g.vx) * 0.7
        }

        // Advance to next item
        g.idx++; setIdx(g.idx)
        if (g.lives <= 0 || g.idx >= TOTAL) {
          setTimeout(() => { setPhase('facts'); onComplete?.() }, 800)
        } else if (!hit) {
          // Miss — reset ball
          setTimeout(() => { if (gs.current) { spawnBall(gs.current, W, H) } }, 500)
        }
      }

      // Ball off right edge (no paddle contact)
      if (g.bx > W + 20 && !g.decided) {
        g.decided = true
        const item = g.items[Math.min(g.idx, TOTAL - 1)]
        if (!item.shouldCatch) { g.score++; setScore(g.score); g.flash = { text: '✓ Right — reject that', good: true, t: now } }
        else                   { g.lives--; setLives(g.lives); g.flash = { text: '✗ That was clean data', good: false, t: now } }
        g.idx++; setIdx(g.idx)
        if (g.lives <= 0 || g.idx >= TOTAL) setTimeout(() => { setPhase('facts'); onComplete?.() }, 800)
        else setTimeout(() => { if (gs.current) spawnBall(gs.current, W, H) }, 500)
      }

      // ── Render ───────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = BLACK; ctx.fillRect(0, 0, W, H)

      // Scan lines
      for (let y = 0; y < H; y += 4) { ctx.fillStyle = 'rgba(255,255,255,0.025)'; ctx.fillRect(0, y, W, 2) }

      // White border
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 2
      ctx.strokeRect(1, 1, W - 2, H - 2)

      // White dotted divider
      ctx.setLineDash([5, 10]); ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke()
      ctx.setLineDash([])

      // AI paddle
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.fillRect(AI_X, g.aiY - PADDLE_H / 2, PADDLE_W, PADDLE_H)

      // Player paddle (green glow)
      ctx.fillStyle = GREEN; ctx.shadowColor = GREEN; ctx.shadowBlur = 16
      ctx.fillRect(PLAYER_X, g.playerY - PADDLE_H / 2, PADDLE_W, PADDLE_H)
      ctx.shadowBlur = 0

      // Ball
      const flash = g.flash
      const flashAge = flash ? Math.min(1, (now - flash.t) / 300) : 1
      const bc = flash && flashAge < 1 ? (flash.good ? GREEN : RED) : '#fff'
      ctx.fillStyle = bc; ctx.shadowColor = bc; ctx.shadowBlur = bc === '#fff' ? 8 : 24
      ctx.beginPath(); ctx.arc(g.bx, g.by, BALL_R, 0, Math.PI * 2); ctx.fill()
      ctx.shadowBlur = 0

      // Flash text
      if (flash && flashAge < 1) {
        ctx.globalAlpha = 1 - flashAge
        ctx.fillStyle = flash.good ? GREEN : RED
        ctx.font = `700 13px ${BODY}`; ctx.textAlign = 'center'
        ctx.fillText(flash.text, W / 2, H * 0.1)
        ctx.globalAlpha = 1
      }

      // Lives
      for (let i = 0; i < LIVES; i++) {
        ctx.beginPath(); ctx.arc(16 + i * 16, 16, 5, 0, Math.PI * 2)
        ctx.fillStyle = i < g.lives ? GREEN : '#222'
        ctx.shadowColor = i < g.lives ? GREEN : 'none'; ctx.shadowBlur = i < g.lives ? 6 : 0
        ctx.fill(); ctx.shadowBlur = 0
      }

      // Progress bar right edge
      const prog = g.idx / TOTAL
      ctx.fillStyle = '#1a1a1a'; ctx.fillRect(W - 5, 0, 5, H)
      ctx.fillStyle = GREEN; ctx.shadowColor = GREEN; ctx.shadowBlur = 4
      ctx.fillRect(W - 5, H * (1 - prog), 5, H * prog)
      ctx.shadowBlur = 0

      frameRef.current = requestAnimationFrame(loop)
    }
    frameRef.current = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(frameRef.current); window.removeEventListener('resize', resize) }
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  const onPointer = (e: React.PointerEvent) => {
    if ((phase !== 'playing' && phase !== 'countdown') || !gs.current) return
    const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return
    gs.current.playerY = Math.max(PADDLE_H / 2, Math.min(rect.height - PADDLE_H / 2,
      (e.clientY - rect.top)))
  }

  const item = gs.current?.items[Math.min(idx, TOTAL - 1)] ?? ITEMS[0]
  const color = item.shouldCatch ? GREEN : RED

  const verdict = VERDICTS.find(v => score / TOTAL >= v.min) ?? VERDICTS[VERDICTS.length - 1]

  // ── Intro ──────────────────────────────────────────────────────────────
  if (phase === 'intro') return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, background: BLACK, overflowY: 'auto' }}>
      <div style={{ maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div>
          <p style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: GREEN, margin: '0 0 10px', opacity: 0.6 }}>Signal Drop · W1 M3</p>
          <h1 style={{ fontFamily: DISP, fontSize: 38, color: '#fff', margin: '0 0 12px', lineHeight: 1 }}>Sort the Data</h1>
          <p style={{ fontFamily: BODY, fontSize: 14, color: '#666', lineHeight: 1.6, margin: 0 }}>Rally the ball. Each pass brings a new data example. The color tells you what to do.</p>
        </div>
        <div style={{ border: '1px solid #222', background: '#0d0d0d' }}>
          <div style={{ padding: '13px 18px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 14, height: 14, background: GREEN, flexShrink: 0, boxShadow: `0 0 8px ${GREEN}` }} />
            <span style={{ fontFamily: BODY, fontSize: 14, color: '#ccc' }}>Green — hit it back (good data)</span>
          </div>
          <div style={{ padding: '13px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 14, height: 14, background: RED, flexShrink: 0, boxShadow: `0 0 8px ${RED}` }} />
            <span style={{ fontFamily: BODY, fontSize: 14, color: '#ccc' }}>Red — let it past (bad data)</span>
          </div>
        </div>
        <button onClick={startGame} style={{ fontFamily: DISP, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: GREEN, color: BLACK, padding: '16px 0', border: 'none', cursor: 'pointer', touchAction: 'manipulation', boxShadow: `0 0 28px ${GREEN}55` }}>
          Start
        </button>
      </div>
    </div>
  )

  // ── Countdown ────────────────────────────────────────────────────────────
  if (phase === 'countdown') return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: BLACK }}>
      <div key={countdown} style={{
        fontFamily: DISP, fontSize: countdown > 0 ? 130 : 72, color: countdown > 0 ? '#fff' : GREEN,
        lineHeight: 1, letterSpacing: '-0.04em',
        textShadow: `0 0 60px ${countdown > 0 ? 'rgba(255,255,255,0.25)' : GREEN}`,
        animation: 'countPop 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards',
      }}>
        {countdown > 0 ? countdown : 'GO'}
      </div>
      <style>{`@keyframes countPop { 0% { transform: scale(1.5); opacity: 0; } 40% { opacity: 1; } 100% { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  )

  // ── Playing ───────────────────────────────────────────────────────────────
  if (phase === 'playing') return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BLACK }} onPointerMove={onPointer}>
      {/* Colored item header — the whole game signal */}
      <div style={{
        background: color, padding: '10px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: `0 0 30px ${color}66`,
        transition: 'background 0.15s, box-shadow 0.15s',
      }}>
        <span style={{ fontFamily: DISP, fontSize: 18, color: BLACK, letterSpacing: '-0.01em', textAlign: 'center' }}>
          {item.label}
        </span>
      </div>
      <canvas ref={canvasRef} style={{ flex: 1, display: 'block', width: '100%', touchAction: 'none', cursor: 'none' }} />
    </div>
  )

  // ── Facts ─────────────────────────────────────────────────────────────────
  if (phase === 'facts') {
    const isLast = factIdx === FACTS.length - 1
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, background: BLACK, overflowY: 'auto' }}>
        <div style={{ maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <p style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: GREEN, opacity: 0.5, margin: 0 }}>{factIdx + 1} / {FACTS.length}</p>
          <div style={{ border: '1px solid #1e1e1e', padding: '24px 22px', background: '#0d0d0d' }}>
            <p style={{ fontFamily: BODY, fontSize: 16, color: '#ccc', lineHeight: 1.7, margin: 0 }}>{FACTS[factIdx]}</p>
          </div>
          <button onClick={() => isLast ? setPhase('end') : setFactIdx(f => f + 1)}
            style={{ fontFamily: DISP, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: GREEN, color: BLACK, padding: '15px 0', border: 'none', cursor: 'pointer', touchAction: 'manipulation', boxShadow: `0 0 18px ${GREEN}55` }}>
            {isLast ? 'See results →' : 'Next →'}
          </button>
        </div>
      </div>
    )
  }

  // ── End ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, background: BLACK, overflowY: 'auto' }}>
      <div style={{ maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', gap: 22, textAlign: 'center' }}>
        <div>
          <div style={{ fontFamily: DISP, fontSize: 72, color: GREEN, lineHeight: 1, letterSpacing: '-0.03em', textShadow: `0 0 40px ${GREEN}66` }}>
            {score}<span style={{ fontSize: 36, color: '#333' }}>/{TOTAL}</span>
          </div>
        </div>
        <div style={{ border: '1px solid #1e1e1e', padding: '22px', background: '#0d0d0d' }}>
          <p style={{ fontFamily: DISP, fontSize: 20, color: score / TOTAL >= 0.7 ? GREEN : RED, margin: '0 0 8px', lineHeight: 1.2 }}>{verdict.text}</p>
          <p style={{ fontFamily: BODY, fontSize: 14, color: '#888', margin: 0, lineHeight: 1.55 }}>{verdict.sub}</p>
        </div>
        <button onClick={startGame} style={{ fontFamily: DISP, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: GREEN, color: BLACK, padding: '15px 0', border: 'none', cursor: 'pointer', touchAction: 'manipulation', boxShadow: `0 0 22px ${GREEN}66` }}>
          Play again
        </button>
      </div>
    </div>
  )
}
