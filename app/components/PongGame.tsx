'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const RED   = '#FF3B3B'
const BLACK = '#0a0a0a'

// ── Game data ─────────────────────────────────────────────────────────────────
// shouldCatch = true  → HIT it back (good data)
// shouldCatch = false → LET IT PAST (bad data)
const ITEMS = [
  // Obviously good
  { icon: '🩺', label: 'X-rays reviewed\nby 3 radiologists each',          shouldCatch: true  },
  { icon: '🚩', label: 'Emails flagged as spam\nby real users',             shouldCatch: true  },
  { icon: '🔬', label: 'Diagnoses confirmed\nby biopsy results',            shouldCatch: true  },
  { icon: '🎤', label: 'Audio transcribed\nby native speakers',             shouldCatch: true  },
  // Obviously bad
  { icon: '📸', label: '1M scraped photos\nno labels at all',               shouldCatch: false },
  { icon: '📹', label: 'Scraped from\nsurveillance cameras',                shouldCatch: false },
  { icon: '🤖', label: 'Auto-translated\nnever human-reviewed',             shouldCatch: false },
  // Tricky — looks good, is bad
  { icon: '🏢', label: 'Hiring records from\ntop tech companies',           shouldCatch: false }, // historical bias
  { icon: '🌐', label: '10M labeled images\n$0.01 per label, 20 sec each', shouldCatch: false }, // cheap labels
  { icon: '🏥', label: 'Patient data from\none hospital, used globally',    shouldCatch: false }, // no generalization
  { icon: '📊', label: 'Survey results —\nhalf misread the question',       shouldCatch: false }, // bad source
  { icon: '🚔', label: 'Crime data from a block\nthat was over-policed',    shouldCatch: false }, // systemic bias
  { icon: '⭐', label: 'Reviews from only\n1-star and 5-star users',        shouldCatch: false }, // selection bias
  { icon: '🕵️', label: 'Behavior data collected\nwithout user disclosure', shouldCatch: false }, // consent
  // Tricky — looks bad, is good
  { icon: '📋', label: '200 examples\nby certified domain experts',         shouldCatch: true  }, // small but quality
  { icon: '🌍', label: 'Posts labeled by\nnative speakers of each language',shouldCatch: true  },
  { icon: '⚖️', label: 'Fraud cases verified\nby court records',            shouldCatch: true  },
  { icon: '📰', label: 'Articles fact-checked\nby 3 journalists each',      shouldCatch: true  },
]

const TOTAL    = ITEMS.length
const PADDLE_H = 90
const PADDLE_W = 12
const BALL_R   = 14
const LIVES    = 3

interface Ball { x: number; y: number; vx: number; vy: number }

type Phase = 'intro' | 'playing' | 'result' | 'facts' | 'end'

const FACTS = [
  "Supervised learning uses labeled examples. Someone had to mark every single one.",
  "AI doesn't label its own training data — humans do. The labels carry the biases of whoever made them.",
  "More data doesn't fix bad data. A model is only as good as its training set.",
  "Amazon's hiring AI was trained on years of real hiring decisions. The bias in those decisions was real. The model learned both.",
  "A model trained on data from one hospital may fail for patients at another. Representation matters.",
  "Workers paid $0.01 per label with 30 seconds each can't give careful annotations. Cheap labeling creates cheap models.",
  "When data is collected without telling people it will train AI, consent is broken before the model even exists.",
]

export default function PongGame({ onComplete }: { onComplete?: () => void }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const paddleYRef   = useRef(0.5)   // 0–1 fraction of canvas height
  const ballRef      = useRef<Ball>({ x: 0, y: 0, vx: 0, vy: 0 })
  const livesRef     = useRef(LIVES)
  const scoreRef     = useRef(0)
  const itemIdxRef   = useRef(0)
  const resolvedRef  = useRef(false)  // current ball has been judged
  const frameRef     = useRef(0)
  const playingRef   = useRef(false)
  const shuffledRef  = useRef<typeof ITEMS>([])
  const flashRef     = useRef<{ text: string; good: boolean; t: number } | null>(null)
  const resultRef    = useRef<{ correct: boolean; item: typeof ITEMS[0] } | null>(null)

  const [phase,       setPhase]       = useState<Phase>('intro')
  const [lives,       setLives]       = useState(LIVES)
  const [score,       setScore]       = useState(0)
  const [itemIdx,     setItemIdx]     = useState(0)
  const [factIdx,     setFactIdx]     = useState(0)
  const [lastResult,  setLastResult]  = useState<{ correct: boolean; item: typeof ITEMS[0] } | null>(null)

  const currentItem = shuffledRef.current[Math.min(itemIdxRef.current, TOTAL - 1)]

  const spawnBall = useCallback((cw: number, ch: number, speedMult = 1) => {
    const speed = (3.5 + itemIdxRef.current * 0.08) * speedMult
    ballRef.current = {
      x:  cw * 0.15,
      y:  ch * (0.3 + Math.random() * 0.4),
      vx: speed,
      vy: (Math.random() - 0.5) * speed * 0.8,
    }
    resolvedRef.current = false
  }, [])

  const startGame = useCallback(() => {
    // Shuffle items
    const s = [...ITEMS]
    for (let i = s.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [s[i], s[j]] = [s[j], s[i]]
    }
    shuffledRef.current = s
    itemIdxRef.current  = 0
    livesRef.current    = LIVES
    scoreRef.current    = 0
    playingRef.current  = true
    setLives(LIVES)
    setScore(0)
    setItemIdx(0)
    setLastResult(null)
    flashRef.current  = null
    resultRef.current = null

    const cv = canvasRef.current
    if (cv) spawnBall(cv.clientWidth, cv.clientHeight)
    setPhase('playing')
  }, [spawnBall])

  // Game loop
  useEffect(() => {
    if (phase !== 'playing') return
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')!

    const resize = () => {
      cv.width  = cv.clientWidth
      cv.height = cv.clientHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cv)

    const draw = (now: number) => {
      if (!playingRef.current) return
      const W = cv.width, H = cv.height
      const b = ballRef.current
      const py = paddleYRef.current * H
      const item = shuffledRef.current[Math.min(itemIdxRef.current, TOTAL - 1)]

      // ── Physics ────────────────────────────────────────────────────────────
      if (!resolvedRef.current) {
        b.x += b.vx
        b.y += b.vy
        // Wall bounce top/bottom
        if (b.y - BALL_R < 0)    { b.y = BALL_R;     b.vy = Math.abs(b.vy) }
        if (b.y + BALL_R > H)    { b.y = H - BALL_R; b.vy = -Math.abs(b.vy) }
        // Left wall bounce
        if (b.x - BALL_R < 0)   { b.x = BALL_R;     b.vx = Math.abs(b.vx) }

        // Paddle zone (right edge)
        const paddleX = W - 32
        const inPaddleX = b.x + BALL_R >= paddleX && b.x + BALL_R <= paddleX + PADDLE_W + 6
        const inPaddleY = b.y >= py - PADDLE_H / 2 && b.y <= py + PADDLE_H / 2

        if (inPaddleX && b.vx > 0) {
          if (inPaddleY) {
            // HIT
            const correct = item.shouldCatch
            resolvedRef.current = true
            if (correct) {
              scoreRef.current++
              setScore(scoreRef.current)
              flashRef.current = { text: 'Good data — keep it', good: true, t: now }
            } else {
              livesRef.current--
              setLives(livesRef.current)
              flashRef.current = { text: "That's biased data — let it through", good: false, t: now }
            }
            resultRef.current = { correct, item }
            setLastResult({ correct, item })
            b.vx = -Math.abs(b.vx) * 1.05  // bounce back faster
            const rel = (b.y - py) / (PADDLE_H / 2)
            b.vy = rel * Math.abs(b.vx) * 0.8
            setTimeout(() => nextItem(W, H), 900)
          } else if (b.x > paddleX + PADDLE_W) {
            // PAST paddle — MISS
            const correct = !item.shouldCatch
            resolvedRef.current = true
            if (correct) {
              scoreRef.current++
              setScore(scoreRef.current)
              flashRef.current = { text: 'Right — bad data, let it go', good: true, t: now }
            } else {
              livesRef.current--
              setLives(livesRef.current)
              flashRef.current = { text: 'That was clean data — hit it back', good: false, t: now }
            }
            resultRef.current = { correct, item }
            setLastResult({ correct, item })
            setTimeout(() => nextItem(W, H), 900)
          }
        }

        // Ball off right edge (no paddle)
        if (b.x - BALL_R > W + 20 && !resolvedRef.current) {
          const correct = !item.shouldCatch
          resolvedRef.current = true
          if (correct) { scoreRef.current++; setScore(scoreRef.current); flashRef.current = { text: 'Right — bad data, let it go', good: true, t: now } }
          else          { livesRef.current--; setLives(livesRef.current); flashRef.current = { text: 'That was clean data — hit it back', good: false, t: now } }
          resultRef.current = { correct, item }
          setLastResult({ correct, item })
          setTimeout(() => nextItem(W, H), 900)
        }
      }

      // ── Render ─────────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = BLACK
      ctx.fillRect(0, 0, W, H)

      // Scan lines
      ctx.fillStyle = 'rgba(0,0,0,0.06)'
      for (let y = 0; y < H; y += 4) { ctx.fillRect(0, y, W, 2) }

      // Center dotted divider
      ctx.setLineDash([4, 8])
      ctx.strokeStyle = '#1a1a1a'
      ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke()
      ctx.setLineDash([])

      // Left wall (subtle)
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(0, 0, 4, H)

      // Paddle
      const paddleX = W - 32
      const py2 = paddleYRef.current * H
      const grad = ctx.createLinearGradient(paddleX, 0, paddleX + PADDLE_W, 0)
      grad.addColorStop(0, GREEN)
      grad.addColorStop(1, '#1aff1a')
      ctx.fillStyle = grad
      ctx.shadowColor = GREEN
      ctx.shadowBlur  = 16
      ctx.beginPath()
      ctx.roundRect(paddleX, py2 - PADDLE_H / 2, PADDLE_W, PADDLE_H, 4)
      ctx.fill()
      ctx.shadowBlur = 0

      // Ball
      const flash = flashRef.current
      const flashAge = flash ? (now - flash.t) / 400 : 1
      const ballColor = flash && flashAge < 1
        ? (flash.good ? GREEN : RED)
        : '#ffffff'
      ctx.fillStyle = ballColor
      ctx.shadowColor = ballColor
      ctx.shadowBlur  = ballColor === '#ffffff' ? 8 : 20
      ctx.beginPath()
      ctx.arc(b.x, b.y, BALL_R, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      // Flash message
      if (flash && flashAge < 1) {
        ctx.globalAlpha = 1 - flashAge
        ctx.fillStyle   = flash.good ? GREEN : RED
        ctx.font        = `bold 11px ${DISP}`
        ctx.textAlign   = 'center'
        ctx.fillText(flash.text, W / 2, H * 0.15 + flashAge * -20)
        ctx.globalAlpha = 1
      }

      // HUD — lives
      const dotR = 5, dotGap = 14
      for (let i = 0; i < LIVES; i++) {
        ctx.beginPath()
        ctx.arc(18 + i * dotGap, 18, dotR, 0, Math.PI * 2)
        ctx.fillStyle = i < livesRef.current ? GREEN : '#222'
        ctx.shadowColor = i < livesRef.current ? GREEN : 'transparent'
        ctx.shadowBlur  = i < livesRef.current ? 8 : 0
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Score
      ctx.fillStyle   = GREEN
      ctx.font        = `bold 13px ${DISP}`
      ctx.textAlign   = 'right'
      ctx.fillText(`${scoreRef.current}/${TOTAL}`, W - 40, 22)

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frameRef.current)
      ro.disconnect()
    }
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  const nextItem = useCallback((W: number, H: number) => {
    itemIdxRef.current++
    setItemIdx(itemIdxRef.current)
    if (livesRef.current <= 0 || itemIdxRef.current >= TOTAL) {
      playingRef.current = false
      setPhase('facts')
      onComplete?.()
      return
    }
    spawnBall(W, H)
  }, [spawnBall, onComplete])

  // Pointer tracking
  const onPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    paddleYRef.current = Math.max(0.05, Math.min(0.95, (e.clientY - rect.top) / rect.height))
  }

  const DISP_STYLE = { fontFamily: DISP }
  const BODY_STYLE = { fontFamily: BODY }

  // ── Intro ────────────────────────────────────────────────────────────────
  if (phase === 'intro') return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, background: BLACK }}>
      <div style={{ maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div>
          <p style={{ ...DISP_STYLE, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: GREEN, margin: '0 0 10px', opacity: 0.7 }}>Signal Drop · W1 M3</p>
          <h1 style={{ ...DISP_STYLE, fontSize: 38, color: '#fff', margin: '0 0 14px', lineHeight: 1 }}>Sort the Data</h1>
          <p style={{ ...BODY_STYLE, fontSize: 14, color: '#888', lineHeight: 1.65, margin: 0 }}>
            A data example flies at your paddle. You decide what goes into the training set.
          </p>
        </div>
        <div style={{ border: `1px solid #222`, background: '#0d0d0d', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #1a1a1a' }}>
            <span style={{ ...DISP_STYLE, fontSize: 10, color: GREEN, letterSpacing: '0.1em' }}>HIT IT BACK</span>
            <span style={{ ...BODY_STYLE, fontSize: 12, color: '#666', marginLeft: 10 }}>→ good, labeled training data</span>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <span style={{ ...DISP_STYLE, fontSize: 10, color: RED, letterSpacing: '0.1em' }}>LET IT PAST</span>
            <span style={{ ...BODY_STYLE, fontSize: 12, color: '#666', marginLeft: 10 }}>→ biased, unlabeled, or bad</span>
          </div>
        </div>
        <p style={{ ...BODY_STYLE, fontSize: 11, color: '#444', margin: 0, textAlign: 'center' }}>Some will try to trick you. Read carefully.</p>
        <button onClick={startGame} style={{ ...DISP_STYLE, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', background: GREEN, color: BLACK, padding: '15px 0', border: 'none', cursor: 'pointer', boxShadow: `0 0 24px ${GREEN}66` }}>
          Start
        </button>
      </div>
    </div>
  )

  // ── Playing ──────────────────────────────────────────────────────────────
  if (phase === 'playing') {
    const item = shuffledRef.current[Math.min(itemIdxRef.current, TOTAL - 1)]
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: BLACK }}>
        {/* Item description — always readable at top */}
        <div style={{ padding: '10px 16px 8px', borderBottom: '1px solid #111', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <span style={{ fontSize: 28, lineHeight: 1 }}>{item?.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ ...BODY_STYLE, fontSize: 12, color: '#ccc', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{item?.label}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {Array.from({ length: LIVES }, (_, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i < lives ? GREEN : '#222', boxShadow: i < lives ? `0 0 6px ${GREEN}` : 'none' }} />
              ))}
            </div>
            <span style={{ ...DISP_STYLE, fontSize: 9, color: '#333', letterSpacing: '0.1em' }}>{score}/{TOTAL}</span>
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          onPointerMove={onPointer}
          style={{ flex: 1, display: 'block', touchAction: 'none', cursor: 'none', width: '100%' }}
        />

        {/* Last result feedback */}
        {lastResult && (
          <div style={{ padding: '6px 16px', background: lastResult.correct ? '#0a1a0a' : '#1a0a0a', borderTop: `1px solid ${lastResult.correct ? '#0f2a0f' : '#2a0f0f'}`, flexShrink: 0 }}>
            <span style={{ ...BODY_STYLE, fontSize: 11, color: lastResult.correct ? GREEN : RED }}>
              {lastResult.correct ? '✓ ' : '✗ '}{lastResult.item.shouldCatch ? 'Good labeled data — keep it.' : 'This had issues — should have let it past.'}
            </span>
          </div>
        )}
      </div>
    )
  }

  // ── Facts ────────────────────────────────────────────────────────────────
  if (phase === 'facts') {
    const isLast = factIdx === FACTS.length - 1
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, background: BLACK }}>
        <div style={{ maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ ...DISP_STYLE, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: GREEN, opacity: 0.6, margin: 0 }}>
            {factIdx + 1} / {FACTS.length}
          </p>
          <div style={{ border: '1px solid #1e1e1e', padding: '22px 20px', background: '#0d0d0d' }}>
            <p style={{ ...BODY_STYLE, fontSize: 14, color: '#ccc', lineHeight: 1.75, margin: 0 }}>{FACTS[factIdx]}</p>
          </div>
          <button onClick={() => isLast ? setPhase('end') : setFactIdx(f => f + 1)}
            style={{ ...DISP_STYLE, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', background: GREEN, color: BLACK, padding: '14px 0', border: 'none', cursor: 'pointer', boxShadow: `0 0 16px ${GREEN}55` }}>
            {isLast ? 'See results →' : 'Next →'}
          </button>
        </div>
      </div>
    )
  }

  // ── End ──────────────────────────────────────────────────────────────────
  const pct = score / TOTAL
  const msg = pct >= 0.9 ? "Clean training set. PAI learned from the right examples."
            : pct >= 0.7 ? "Mostly clean. A few bad examples slipped into the model."
            : pct >= 0.5 ? "Noisy data. The model will learn some wrong patterns."
            :              "Too much bias got through. This is how broken models are built."
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, background: BLACK }}>
      <div style={{ maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'center' }}>
        <div>
          <p style={{ ...DISP_STYLE, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: GREEN, opacity: 0.6, margin: '0 0 12px' }}>Training complete</p>
          <div style={{ ...DISP_STYLE, fontSize: 72, color: GREEN, lineHeight: 1, letterSpacing: '-0.03em', textShadow: `0 0 40px ${GREEN}66` }}>
            {score}<span style={{ fontSize: 36, color: '#333' }}>/{TOTAL}</span>
          </div>
        </div>
        <div style={{ border: '1px solid #1e1e1e', padding: '20px', background: '#0d0d0d' }}>
          <p style={{ ...BODY_STYLE, fontSize: 14, color: '#bbb', lineHeight: 1.65, margin: 0 }}>{msg}</p>
        </div>
        <button onClick={startGame} style={{ ...DISP_STYLE, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', background: GREEN, color: BLACK, padding: '14px 0', border: 'none', cursor: 'pointer', boxShadow: `0 0 20px ${GREEN}66` }}>
          Play again
        </button>
      </div>
    </div>
  )
}
