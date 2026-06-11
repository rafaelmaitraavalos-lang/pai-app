'use client'

import { useEffect, useRef, useState } from 'react'
import GAMES_PT from '../data/gamesContent_pt'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const BLACK = '#0a0a0a'

// Data items shown on the ball — educational flavour, not a mechanic
const ITEMS_EN = [
  'Expert-verified diagnoses', '3 radiologists per scan', 'Native speaker transcriptions',
  'Court-confirmed fraud cases', 'Independent fact-checkers', 'Peer-reviewed ground truth',
  'Surveillance footage', 'No labels — raw data', 'Machine auto-translated',
  'Biased hiring history', '$0.01 labels, 20 seconds each', 'One hospital, global model',
  'Over-policed neighborhood data', 'No user consent', 'Only 1-star and 5-star reviews',
  'Half misread the question', 'Domain expert annotations', 'Certified biologist labels',
]

const ITEMS_PT = [
  'Diagnósticos verificados por especialistas', '3 radiologistas por exame',
  'Transcrições por falantes nativos', 'Casos de fraude confirmados em juízo',
  'Checadores de fatos independentes', 'Verdade de referência revisada por pares',
  'Imagens de câmeras de vigilância', 'Sem rótulos — dados brutos',
  'Traduzido automaticamente por máquina', 'Histórico de contratações com viés',
  'Rótulos a US$0,01 — 20 segundos cada', 'Um hospital, modelo global',
  'Dados de bairro com policiamento excessivo', 'Sem consentimento do usuário',
  'Só avaliações de 1 e 5 estrelas', 'Metade interpretou mal a pergunta',
  'Anotações de especialistas do domínio', 'Rótulos de biólogos certificados',
]

const VERDICTS_EN = [
  { min: 3000, h: 'YOUR AI HAS SURPASSED ALL BENCHMARKS OF HUMAN UNDERSTANDING.',  s: 'That rally was something special. The training set was immaculate.' },
  { min: 1500, h: 'EXCEPTIONAL DATASET.',    s: 'Your AI is brilliantly trained. Data scientists are weeping with joy.' },
  { min: 800,  h: 'SOLID TRAINING SET.',     s: 'Your model will work. It will be right most of the time. Mostly.' },
  { min: 300,  h: 'NOISY DATA.',             s: 'Your AI has absorbed significant bias. It will make very confident mistakes.' },
  { min: 0,    h: 'YOU HAVE A HORRIBLY BIASED AI.', s: 'This should concern everyone involved. Especially your users.' },
]

const VERDICTS_PT = [
  { min: 3000, h: 'SUA IA SUPEROU TODOS OS BENCHMARKS DO ENTENDIMENTO HUMANO.', s: 'Esse rally foi algo especial. O conjunto de treinamento estava impecável.' },
  { min: 1500, h: 'CONJUNTO DE DADOS EXCEPCIONAL.', s: 'A sua IA é brilhantemente treinada. Cientistas de dados estão chorando de alegria.' },
  { min: 800,  h: 'CONJUNTO DE TREINAMENTO SÓLIDO.', s: 'O seu modelo vai funcionar. Vai acertar na maior parte do tempo. Em sua maioria.' },
  { min: 300,  h: 'DADOS RUIDOSOS.', s: 'A sua IA absorveu viés significativo. Vai cometer erros com muita confiança.' },
  { min: 0,    h: 'VOCÊ TEM UMA IA HORRIVELMENTE TENDENCIOSA.', s: 'Isso deveria preocupar a todos os envolvidos. Especialmente seus usuários.' },
]

const FACTS_EN = [
  "AI doesn't label its own training data — humans do. The labels carry the biases of whoever made them.",
  "More data doesn't fix bad data. A model trained on a million bad examples is worse than one trained on a thousand good ones.",
  "Amazon's hiring AI was trained on real hiring decisions. The bias in those decisions was real. The model learned both.",
  "A model trained on data from one hospital may fail for patients at another.",
  "Workers paid $0.01 per label with 20 seconds each can't give careful annotations. Cheap labeling creates cheap models.",
  "When data is collected without consent, the privacy violation happens before the model even exists.",
]

const _pt = GAMES_PT['signal-drop']
const FACTS_PT: string[] = typeof _pt?.facts === 'string'
  ? (_pt.facts as string).split('. ').filter((s: string) => s.trim().length > 20).map((s: string) => s.trim())
  : Array.isArray(_pt?.facts) ? (_pt.facts as string[]) : FACTS_EN

const PADDLE_H = 80
const PADDLE_W = 12
const BALL_R   = 11
const LIVES    = 3
const BASE_SPD = 5

type Phase = 'intro' | 'countdown' | 'playing' | 'facts' | 'end'

function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[b[i], b[j]] = [b[j], b[i]] }
  return b
}

interface PopUp { id: number; text: string; x: number; y: number; t: number }

interface GS {
  bx: number; by: number; vx: number; vy: number
  aiY: number; playerY: number
  lives: number
  totalScore: number
  combo: number          // current rally streak
  rallies: number        // total hits ever (drives speed)
  itemIdx: number        // which item to show on ball
  items: string[]
  spawned: boolean
  flash: { text: string; t: number } | null
}

export default function PongGame({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gs        = useRef<GS | null>(null)
  const frameRef  = useRef(0)
  const popIdRef  = useRef(0)

  const [phase,     setPhase]     = useState<Phase>('intro')
  const [lives,     setLives]     = useState(LIVES)
  const [score,     setScore]     = useState(0)
  const [combo,     setCombo]     = useState(0)
  const [countdown, setCountdown] = useState(3)
  const [factIdx,   setFactIdx]   = useState(0)
  const [pops,      setPops]      = useState<PopUp[]>([])
  const [isPT,      setIsPT]      = useState(false)

  useEffect(() => { setIsPT(localStorage.getItem('pai_lang') === 'pt') }, [])

  const ITEMS    = isPT ? ITEMS_PT    : ITEMS_EN
  const VERDICTS = isPT ? VERDICTS_PT : VERDICTS_EN
  const FACTS    = isPT ? FACTS_PT    : FACTS_EN

  function addPop(text: string, x: number, y: number) {
    const id = ++popIdRef.current
    setPops(p => [...p.slice(-5), { id, text, x, y, t: performance.now() }])
    setTimeout(() => setPops(p => p.filter(pp => pp.id !== id)), 900)
  }

  function spawnBall(g: GS, W: number, H: number) {
    const speed = Math.min(BASE_SPD * 3.5, BASE_SPD * (1 + g.rallies * 0.18))
    g.bx = W * 0.5; g.by = H * (0.25 + Math.random() * 0.5)
    g.vx = speed; g.vy = (Math.random() - 0.5) * speed * 0.65
  }

  function startGame() {
    const shuffled = shuffle([...ITEMS])
    gs.current = {
      bx: 0, by: 0, vx: 0, vy: 0,
      aiY: 0, playerY: 0,
      lives: LIVES, totalScore: 0, combo: 0, rallies: 0,
      itemIdx: 0, items: shuffled,
      spawned: false, flash: null,
    }
    setLives(LIVES); setScore(0); setCombo(0); setPops([])
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

      const PLAYER_X = W - 30
      const AI_X     = 18

      // AI tracks ball
      const aiSpd = Math.min(24, 3.5 * (1 + g.rallies * 0.06))
      const aiDiff = g.by - g.aiY
      g.aiY += Math.sign(aiDiff) * Math.min(aiSpd, Math.abs(aiDiff))

      // Physics
      g.bx += g.vx; g.by += g.vy
      if (g.by - BALL_R < 0)   { g.by = BALL_R;     g.vy =  Math.abs(g.vy) }
      if (g.by + BALL_R > H)   { g.by = H - BALL_R; g.vy = -Math.abs(g.vy) }

      // AI paddle — bounce and keep rally
      if (g.bx - BALL_R <= AI_X + PADDLE_W && g.vx < 0) {
        if (Math.abs(g.by - g.aiY) < PADDLE_H / 2 + 4) {
          g.bx = AI_X + PADDLE_W + BALL_R
          g.rallies++
          const speed = Math.min(BASE_SPD * 3.5, BASE_SPD * (1 + g.rallies * 0.18))
          g.vx = Math.abs(speed)
          const rel = (g.by - g.aiY) / (PADDLE_H / 2)
          g.vy = rel * speed * 0.65
          // Cycle to next item
          g.itemIdx = (g.itemIdx + 1) % g.items.length
        } else if (g.bx < AI_X - 4) {
          // AI missed — reset
          g.combo = 0; setCombo(0)
          spawnBall(g, W, H)
        }
      }

      // Player paddle
      if (g.bx + BALL_R >= PLAYER_X && g.vx > 0) {
        const hit = Math.abs(g.by - g.playerY) < PADDLE_H / 2 + 4
        if (hit) {
          // Score! combo builds
          g.combo++
          g.rallies++
          const pts = g.combo * 10
          g.totalScore += pts
          setScore(g.totalScore)
          setCombo(g.combo)
          addPop(`+${pts}`, g.bx / W, g.by / H)

          g.bx = PLAYER_X - BALL_R
          const speed = Math.min(BASE_SPD * 3.5, BASE_SPD * (1 + g.rallies * 0.18))
          g.vx = -Math.abs(speed)
          const rel = (g.by - g.playerY) / (PADDLE_H / 2)
          g.vy = rel * speed * 0.65
          g.itemIdx = (g.itemIdx + 1) % g.items.length
        } else if (g.bx > PLAYER_X + PADDLE_W) {
          // Missed — lose life, reset combo
          g.lives--; g.combo = 0
          setLives(g.lives); setCombo(0)
          g.flash = { text: 'Miss!', t: now }
          if (g.lives <= 0) { setTimeout(() => { setPhase('facts'); onComplete?.() }, 600); return }
          spawnBall(g, W, H)
        }
      }

      // ── Render ────────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H); ctx.fillStyle = BLACK; ctx.fillRect(0, 0, W, H)
      for (let y = 0; y < H; y += 4) { ctx.fillStyle = 'rgba(255,255,255,0.018)'; ctx.fillRect(0, y, W, 2) }

      // Border + divider
      ctx.strokeStyle = 'rgba(255,255,255,0.14)'; ctx.lineWidth = 2; ctx.strokeRect(1, 1, W - 2, H - 2)
      ctx.setLineDash([5, 10]); ctx.strokeStyle = 'rgba(255,255,255,0.16)'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke(); ctx.setLineDash([])

      // AI paddle
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(AI_X, g.aiY - PADDLE_H / 2, PADDLE_W, PADDLE_H)

      // Player paddle — green glow
      ctx.fillStyle = GREEN; ctx.shadowColor = GREEN; ctx.shadowBlur = 14
      ctx.fillRect(PLAYER_X, g.playerY - PADDLE_H / 2, PADDLE_W, PADDLE_H); ctx.shadowBlur = 0

      // Ball — white with glow
      ctx.fillStyle = '#fff'; ctx.shadowColor = GREEN; ctx.shadowBlur = 18
      ctx.beginPath(); ctx.arc(g.bx, g.by, BALL_R, 0, Math.PI * 2); ctx.fill()
      ctx.shadowBlur = 0; ctx.fillStyle = GREEN
      ctx.beginPath(); ctx.arc(g.bx, g.by, BALL_R * 0.35, 0, Math.PI * 2); ctx.fill()

      // Miss flash
      if (g.flash) {
        const age = Math.min(1, (now - g.flash.t) / 300)
        if (age < 1) {
          ctx.globalAlpha = 1 - age
          ctx.fillStyle = '#ff6b6b'; ctx.font = `700 14px ${BODY}`; ctx.textAlign = 'center'
          ctx.fillText(g.flash.text, W / 2, H * 0.12)
          ctx.globalAlpha = 1
        } else { g.flash = null }
      }

      // Lives
      for (let i = 0; i < LIVES; i++) {
        ctx.beginPath(); ctx.arc(16 + i * 16, 16, 5, 0, Math.PI * 2)
        ctx.fillStyle = i < g.lives ? GREEN : '#222'
        ctx.shadowColor = i < g.lives ? GREEN : 'none'; ctx.shadowBlur = i < g.lives ? 6 : 0
        ctx.fill(); ctx.shadowBlur = 0
      }

      // Score top right
      ctx.fillStyle = GREEN; ctx.font = `700 13px ${DISP}`; ctx.textAlign = 'right'
      ctx.fillText(g.totalScore.toLocaleString(), W - 10, 22)

      // Combo indicator
      if (g.combo > 1) {
        ctx.fillStyle = `rgba(61,245,66,${Math.min(1, g.combo / 8)})`
        ctx.font = `700 10px ${BODY}`; ctx.textAlign = 'right'
        ctx.fillText(`×${g.combo} COMBO`, W - 10, 38)
      }

      frameRef.current = requestAnimationFrame(loop)
    }
    frameRef.current = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(frameRef.current); window.removeEventListener('resize', resize) }
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  const onPointer = (e: React.PointerEvent) => {
    if (!gs.current) return
    const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return
    gs.current.playerY = Math.max(PADDLE_H / 2, Math.min(rect.height - PADDLE_H / 2, e.clientY - rect.top))
  }

  const currentItem = gs.current?.items[gs.current.itemIdx % ITEMS.length] ?? ITEMS[0]
  const verdict = [...VERDICTS].sort((a, b) => b.min - a.min).find(v => score >= v.min) ?? VERDICTS[VERDICTS.length - 1]

  if (phase === 'intro') return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, background: BLACK, overflowY: 'auto' }}>
      <div style={{ maxWidth: 360, width: '100%', display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div>
          <p style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: GREEN, margin: '0 0 10px', opacity: 0.6 }}>Signal Drop · W1 M3</p>
          <h1 style={{ fontFamily: DISP, fontSize: 38, color: '#fff', margin: '0 0 12px', lineHeight: 1 }}>Sort the Data</h1>
          <p style={{ fontFamily: BODY, fontSize: 14, color: '#666', lineHeight: 1.6, margin: 0 }}>Rally the ball. Every hit scores points. Longer rallies score more. Don't miss.</p>
        </div>
        <div style={{ border: '1px solid #222', background: '#0d0d0d', padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontFamily: BODY, fontSize: 13, color: '#888' }}>Each hit: <span style={{ color: GREEN, fontWeight: 700 }}>+10 pts × your combo</span></div>
          <div style={{ fontFamily: BODY, fontSize: 13, color: '#888' }}>Miss: combo resets, lose a life</div>
        </div>
        <button onClick={startGame} style={{ fontFamily: DISP, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: GREEN, color: BLACK, padding: '16px 0', border: 'none', cursor: 'pointer', touchAction: 'manipulation', boxShadow: `0 0 28px ${GREEN}55` }}>
          Start
        </button>
      </div>
    </div>
  )

  if (phase === 'countdown') return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: BLACK }}>
      <div key={countdown} style={{ fontFamily: DISP, fontSize: countdown > 0 ? 130 : 72, color: countdown > 0 ? '#fff' : GREEN, lineHeight: 1, letterSpacing: '-0.04em', textShadow: `0 0 60px ${countdown > 0 ? 'rgba(255,255,255,0.25)' : GREEN}`, animation: 'countPop 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards' }}>
        {countdown > 0 ? countdown : 'GO'}
      </div>
      <style>{`@keyframes countPop { 0% { transform: scale(1.5); opacity:0 } 40% { opacity:1 } 100% { transform:scale(1); opacity:1 } }`}</style>
    </div>
  )

  if (phase === 'playing') return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BLACK }} onPointerMove={onPointer}>
      {/* Current item label */}
      <div style={{ padding: '8px 16px', borderBottom: '1px solid #111', flexShrink: 0, textAlign: 'center' }}>
        <span style={{ fontFamily: BODY, fontSize: 12, color: '#444', letterSpacing: '0.04em' }}>{currentItem}</span>
      </div>

      {/* Canvas */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', touchAction: 'none', cursor: 'none' }} />

        {/* Floating +points popups */}
        {pops.map(p => (
          <div key={p.id} style={{
            position: 'absolute',
            left: `${p.x * 100}%`, top: `${p.y * 100}%`,
            transform: 'translate(-50%, -50%)',
            fontFamily: DISP, fontSize: 18, color: GREEN,
            letterSpacing: '-0.02em',
            pointerEvents: 'none',
            textShadow: `0 0 12px ${GREEN}`,
            animation: 'popUp 0.9s ease-out forwards',
          }}>
            {p.text}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes popUp {
          0%   { opacity: 1; transform: translate(-50%, -50%) scale(1.3); }
          40%  { opacity: 1; transform: translate(-50%, calc(-50% - 20px)) scale(1); }
          100% { opacity: 0; transform: translate(-50%, calc(-50% - 50px)) scale(0.8); }
        }
      `}</style>
    </div>
  )

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

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, background: BLACK, overflowY: 'auto' }}>
      <div style={{ maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', gap: 22, textAlign: 'center' }}>
        <div style={{ fontFamily: DISP, fontSize: 72, color: GREEN, lineHeight: 1, letterSpacing: '-0.03em', textShadow: `0 0 40px ${GREEN}66` }}>
          {score.toLocaleString()}
        </div>
        <div style={{ border: '1px solid #1e1e1e', padding: '22px', background: '#0d0d0d' }}>
          <p style={{ fontFamily: DISP, fontSize: 18, color: GREEN, margin: '0 0 10px', lineHeight: 1.2 }}>{verdict.h}</p>
          <p style={{ fontFamily: BODY, fontSize: 14, color: '#888', margin: 0, lineHeight: 1.55 }}>{verdict.s}</p>
        </div>
        <button onClick={startGame} style={{ fontFamily: DISP, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: GREEN, color: BLACK, padding: '15px 0', border: 'none', cursor: 'pointer', touchAction: 'manipulation', boxShadow: `0 0 22px ${GREEN}66` }}>
          Play again
        </button>
      </div>
    </div>
  )
}
