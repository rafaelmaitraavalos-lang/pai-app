'use client'

import { useEffect, useRef, useState } from 'react'
import GAMES_PT from '../data/gamesContent_pt'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const BLACK = '#0a0a0a'
const DIM   = '#555'

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
  { min: 3000, h: 'YOUR AI HAS SURPASSED ALL BENCHMARKS OF HUMAN UNDERSTANDING.', s: 'That rally was something special. The training set was immaculate.' },
  { min: 1500, h: 'EXCEPTIONAL DATASET.', s: 'Your AI is brilliantly trained. Data scientists are weeping with joy.' },
  { min: 800,  h: 'SOLID TRAINING SET.', s: 'Your model will work. Right most of the time. Mostly.' },
  { min: 300,  h: 'NOISY DATA.', s: 'Your AI has absorbed significant bias. It will make very confident mistakes.' },
  { min: 0,    h: 'YOU HAVE A HORRIBLY BIASED AI.', s: 'This should concern everyone involved. Especially your users.' },
]

const VERDICTS_PT = [
  { min: 3000, h: 'SUA IA SUPEROU TODOS OS BENCHMARKS DO ENTENDIMENTO HUMANO.', s: 'Esse rally foi algo especial. O conjunto de treinamento estava impecável.' },
  { min: 1500, h: 'CONJUNTO DE DADOS EXCEPCIONAL.', s: 'A sua IA é brilhantemente treinada. Cientistas de dados estão chorando de alegria.' },
  { min: 800,  h: 'CONJUNTO DE TREINAMENTO SÓLIDO.', s: 'O seu modelo vai funcionar. Vai acertar na maior parte do tempo. Em sua maioria.' },
  { min: 300,  h: 'DADOS RUIDOSOS.', s: 'A sua IA absorveu viés significativo. Vai cometer erros com muita confiança.' },
  { min: 0,    h: 'VOCÊ TEM UMA IA HORRIVELMENTE TENDENCIOSA.', s: 'Isso deveria preocupar a todos os envolvidos. Especialmente seus usuários.' },
]

const _pt = GAMES_PT['signal-drop']
const FACTS_EN = [
  "AI doesn't label its own training data — humans do. The labels carry the biases of whoever made them.",
  "More data doesn't fix bad data. A model trained on a million bad examples is worse than one trained on a thousand good ones.",
  "Amazon's hiring AI was trained on real hiring decisions. The bias in those decisions was real. The model learned both.",
  "A model trained on data from one hospital may fail for patients at another.",
  "Workers paid $0.01 per label with 20 seconds each can't give careful annotations. Cheap labeling creates cheap models.",
  "When data is collected without consent, the privacy violation happens before the model even exists.",
]
const FACTS_PT: string[] = typeof _pt?.facts === 'string'
  ? (_pt.facts as string).split('. ').filter((s: string) => s.trim().length > 20).map((s: string) => s.trim())
  : Array.isArray(_pt?.facts) ? (_pt.facts as string[]) : FACTS_EN

const PADDLE_H  = 80
const PADDLE_W  = 12
const BALL_R    = 11
const DOT_R     = 7
const LIVES     = 3
const BASE_SPD  = 4.5
const RED       = '#FF3B3B'

type Phase = 'intro' | 'countdown' | 'playing' | 'facts' | 'end'

function shuffle<T>(a: T[]): T[] {
  const b = [...a]; for (let i = b.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]] } return b
}

// ── Web Audio helpers ─────────────────────────────────────────────────────────
let _actx: AudioContext | null = null
function getAudio() {
  if (!_actx) _actx = new (window.AudioContext || (window as any).webkitAudioContext)()
  return _actx
}
function beep(freq: number, type: OscillatorType, duration: number, gain = 0.15, freqEnd?: number) {
  try {
    const ctx = getAudio()
    const osc = ctx.createOscillator()
    const env = ctx.createGain()
    osc.connect(env); env.connect(ctx.destination)
    osc.type = type; osc.frequency.setValueAtTime(freq, ctx.currentTime)
    if (freqEnd) osc.frequency.linearRampToValueAtTime(freqEnd, ctx.currentTime + duration)
    env.gain.setValueAtTime(gain, ctx.currentTime)
    env.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.start(); osc.stop(ctx.currentTime + duration)
  } catch {}
}

// ── Persistent paddle slide sound ─────────────────────────────────────────────
let _padOsc: OscillatorNode | null = null
let _padGain: GainNode | null = null
let _padMoving = false

function startPaddle() {
  if (_padMoving) return; _padMoving = true
  try {
    const ctx = getAudio()
    _padOsc  = ctx.createOscillator()
    _padGain = ctx.createGain()
    _padOsc.connect(_padGain); _padGain.connect(ctx.destination)
    _padOsc.type = 'sine'; _padOsc.frequency.setValueAtTime(520, ctx.currentTime)
    _padGain.gain.setValueAtTime(0, ctx.currentTime)
    _padGain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.04)
    _padOsc.start()
  } catch {}
}

function stopPaddle() {
  if (!_padMoving) return; _padMoving = false
  try {
    const ctx = getAudio()
    if (_padGain) {
      _padGain.gain.setValueAtTime(_padGain.gain.value, ctx.currentTime)
      _padGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.06)
    }
    if (_padOsc) { _padOsc.stop(ctx.currentTime + 0.07); _padOsc = null; _padGain = null }
    beep(380, 'sine', 0.05, 0.06)   // soft stop-click
  } catch {}
}

const sfx = {
  hit:       () => beep(320, 'sine',     0.07, 0.2, 500),  // satisfying ping
  ballWall:  () => beep(600, 'sine',     0.05, 0.06, 300),  // ball bounce whoosh
  bad:       () => beep(90,  'sawtooth', 0.18, 0.22, 60),
  miss:      () => beep(180, 'triangle', 0.22, 0.15, 80),
  combo:     (n: number) => beep(200 + n * 30, 'sine', 0.08, 0.12, 300 + n * 40),
  countdown: (n: number) => {
    if (n > 0) beep(n === 1 ? 440 : 330, 'sine', 0.12, 0.25)
    else {
      // GO! — ascending fanfare
      beep(523, 'sine', 0.08, 0.2)
      setTimeout(() => beep(659, 'sine', 0.08, 0.2), 80)
      setTimeout(() => beep(784, 'sine', 0.15, 0.25), 160)
    }
  },
}

interface RedDot { id: number; x: number; y: number; vy: number; spd: number }
interface Pop { id: number; text: string; x: number; y: number }
interface Board { username: string; best: number }

interface GS {
  bx: number; by: number; vx: number; vy: number
  aiY: number; playerY: number; prevPlayerY: number
  lives: number; totalScore: number; combo: number; rallies: number
  itemIdx: number; items: string[]
  redDots: RedDot[]; dotIdCounter: number
  spawned: boolean
  missFlash: number
  respawnPending: boolean
}

export default function PongGame({ onComplete }: { onComplete?: () => void }) {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const gs          = useRef<GS | null>(null)
  const frameRef    = useRef(0)
  const popIdRef    = useRef(0)
  const finalScore  = useRef(0)

  const [phase,     setPhase]     = useState<Phase>('intro')
  const [lives,     setLives]     = useState(LIVES)
  const [score,     setScore]     = useState(0)
  const [combo,     setCombo]     = useState(0)
  const [countdown, setCountdown] = useState(3)
  const [factIdx,   setFactIdx]   = useState(0)
  const [pops,      setPops]      = useState<Pop[]>([])
  const [board,     setBoard]     = useState<Board[]>([])
  const [isPT,      setIsPT]      = useState(false)

  useEffect(() => { setIsPT(localStorage.getItem('pai_lang') === 'pt') }, [])

  const ITEMS    = isPT ? ITEMS_PT    : ITEMS_EN
  const VERDICTS = isPT ? VERDICTS_PT : VERDICTS_EN
  const FACTS    = isPT ? FACTS_PT    : FACTS_EN

  function addPop(text: string, x: number, y: number) {
    const id = ++popIdRef.current
    setPops(p => [...p.slice(-6), { id, text, x, y }])
    setTimeout(() => setPops(p => p.filter(pp => pp.id !== id)), 900)
  }

  function spawnBall(g: GS, W: number, H: number, slowdown = false) {
    // After a miss, slow the ball down slightly then it picks back up
    const baseSpeed = slowdown
      ? Math.max(BASE_SPD, BASE_SPD * (1 + g.rallies * 0.18) * 0.55)
      : Math.min(BASE_SPD * 3.5, BASE_SPD * (1 + g.rallies * 0.18))
    // Always aim ball toward player at moderate angle (not random chaos)
    const angle = (Math.random() * 0.4 - 0.2)  // -0.2 to +0.2 radians (gentle)
    g.bx = W * 0.35
    g.by = H * 0.5
    g.vx = baseSpeed * Math.cos(angle)
    g.vy = baseSpeed * Math.sin(angle) * (Math.random() > 0.5 ? 1 : -1)
    g.respawnPending = false
  }

  async function saveScore(s: number) {
    try {
      await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: 'signal-drop', score: s }),
      })
    } catch {}
  }

  async function loadBoard() {
    try {
      const r = await fetch('/api/scores?slug=signal-drop')
      const { scores } = await r.json()
      setBoard(scores ?? [])
    } catch {}
  }

  function startGame() {
    const shuffled = shuffle([...ITEMS])
    gs.current = {
      bx: 0, by: 0, vx: 0, vy: 0,
      aiY: 0, playerY: 0,
      lives: LIVES, totalScore: 0, combo: 0, rallies: 0,
      redDots: [], dotIdCounter: 0,
      prevPlayerY: 0,
      itemIdx: 0, items: shuffled,
      spawned: false, missFlash: 0, respawnPending: false,
    }
    finalScore.current = 0
    setLives(LIVES); setScore(0); setCombo(0); setPops([])
    setCountdown(3); setPhase('countdown')
  }

  useEffect(() => {
    if (phase !== 'countdown') return
    sfx.countdown(countdown)
    if (countdown <= 0) { setPhase('playing'); return }
    const t = setTimeout(() => setCountdown(c => c - 1), 850)
    return () => clearTimeout(t)
  }, [phase, countdown])

  // Arrow key support — track held keys, apply movement in game loop
  const keysRef       = useRef<Set<string>>(new Set())
  useEffect(() => {
    if (phase !== 'playing') return
    const onDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); keysRef.current.add(e.key) }
    }
    const onUp = (e: KeyboardEvent) => keysRef.current.delete(e.key)
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup',   onUp)
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); keysRef.current.clear() }
  }, [phase])

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
      if (g.respawnPending) return (frameRef.current = requestAnimationFrame(loop), undefined)

      const PLAYER_X = W - 30
      const AI_X     = 18
      const speed    = Math.hypot(g.vx, g.vy)

      // Apply held arrow keys — fast and smooth
      const keySpeed = 9
      const prevY = g.playerY
      if (keysRef.current.has('ArrowUp'))   g.playerY = Math.max(PADDLE_H/2, g.playerY - keySpeed)
      if (keysRef.current.has('ArrowDown')) g.playerY = Math.min(H - PADDLE_H/2, g.playerY + keySpeed)
      // Continuous slide sound while key held; stop-click when released
      if (Math.abs(g.playerY - prevY) > 1) { startPaddle() }
      else if (_padMoving) { stopPaddle() }
      g.prevPlayerY = g.playerY

      // Red dots spawn on player hits (see player hit section below)

      // ── Move + check red dots ──────────────────────────────────────────────
      g.redDots = g.redDots.filter(d => {
        d.x += d.spd
        d.y += d.vy
        if (d.y - DOT_R < 0)   { d.y = DOT_R;     d.vy =  Math.abs(d.vy) }
        if (d.y + DOT_R > H)   { d.y = H - DOT_R; d.vy = -Math.abs(d.vy) }
        // Hit player paddle?
        if (d.x + DOT_R >= PLAYER_X && d.x - DOT_R <= PLAYER_X + PADDLE_W) {
          if (Math.abs(d.y - g.playerY) < PADDLE_H / 2 + DOT_R) {
            // Ouch — reset combo, flash
            g.combo = 0; g.missFlash = now
            setCombo(0); sfx.bad()
            addPop('✗ bad data!', (PLAYER_X - 40) / W, d.y / H)
            return false // remove dot
          }
        }
        return d.x < W + 20  // remove when off screen
      })

      // AI always tracks ball perfectly — guarantee it hits every time
      const targetY = g.by + (g.vx < 0 ? (g.bx / speed) * g.vy : 0)
      const aiTarget = Math.max(PADDLE_H/2, Math.min(H - PADDLE_H/2, targetY))
      const aiDiff   = aiTarget - g.aiY
      // AI moves fast enough to always intercept
      g.aiY += Math.sign(aiDiff) * Math.min(speed * 1.1, Math.abs(aiDiff))

      // Physics
      g.bx += g.vx; g.by += g.vy
      if (g.by - BALL_R < 0)   { g.by = BALL_R;     g.vy =  Math.abs(g.vy); sfx.ballWall() }
      if (g.by + BALL_R > H)   { g.by = H - BALL_R; g.vy = -Math.abs(g.vy); sfx.ballWall() }

      // AI paddle — always hits
      if (g.bx - BALL_R <= AI_X + PADDLE_W && g.vx < 0) {
        if (Math.abs(g.by - g.aiY) < PADDLE_H / 2 + BALL_R) {
          g.bx = AI_X + PADDLE_W + BALL_R
          g.rallies++
          const spd = Math.min(BASE_SPD * 3.5, BASE_SPD * (1 + g.rallies * 0.18))
          const rel = (g.by - g.aiY) / (PADDLE_H / 2)
          g.vx = Math.abs(spd)
          g.vy = rel * spd * 0.7
          g.itemIdx = (g.itemIdx + 1) % g.items.length
          sfx.hit()
        }
      }

      // Player paddle
      if (g.bx + BALL_R >= PLAYER_X && g.vx > 0) {
        const hit = Math.abs(g.by - g.playerY) < PADDLE_H / 2 + BALL_R
        if (hit) {
          g.combo++; g.rallies++
          const pts = g.combo * 10
          g.totalScore += pts
          finalScore.current = g.totalScore
          setScore(g.totalScore); setCombo(g.combo)
          sfx.combo(g.combo)
          addPop(`+${pts}`, g.bx / W, g.by / H)
          g.bx = PLAYER_X - BALL_R
          const spd = Math.min(BASE_SPD * 3.5, BASE_SPD * (1 + g.rallies * 0.18))
          const rel = (g.by - g.playerY) / (PADDLE_H / 2)
          g.vx = -Math.abs(spd)
          g.vy = rel * spd * 0.7
          g.itemIdx = (g.itemIdx + 1) % g.items.length
          // Spawn a red dot every 2 hits (more frequent as rallies build)
          const spawnEvery = Math.max(1, 3 - Math.floor(g.rallies / 6))
          if (g.combo % spawnEvery === 0) {
            const dotSpd = 3.5 + g.rallies * 0.1
            g.redDots.push({
              id: ++g.dotIdCounter,
              x: W * 0.08,
              y: H * (0.1 + Math.random() * 0.8),
              vy: (Math.random() - 0.5) * dotSpd * 0.6,
              spd: dotSpd,
            })
          }
        } else if (g.bx > PLAYER_X + PADDLE_W) {
          // Miss
          g.lives--; g.combo = 0; g.missFlash = now
          setLives(g.lives); setCombo(0); sfx.miss()
          if (g.lives <= 0) {
            const fs = g.totalScore
            finalScore.current = fs
            stopPaddle()
            setPhase('facts')
            saveScore(fs)
            loadBoard()
            onComplete?.()
            return
          }
          // Brief pause then slow respawn
          g.respawnPending = true
          setTimeout(() => {
            if (gs.current) {
              spawnBall(gs.current, W, H, true)  // slowdown = true
            }
          }, 700)
        }
      }

      // ── Render ────────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H); ctx.fillStyle = BLACK; ctx.fillRect(0, 0, W, H)
      for (let y = 0; y < H; y += 4) { ctx.fillStyle = 'rgba(255,255,255,0.018)'; ctx.fillRect(0, y, W, 2) }

      ctx.strokeStyle = 'rgba(255,255,255,0.14)'; ctx.lineWidth = 2; ctx.strokeRect(1,1,W-2,H-2)
      ctx.setLineDash([5,10]); ctx.strokeStyle = 'rgba(255,255,255,0.16)'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(W/2,0); ctx.lineTo(W/2,H); ctx.stroke(); ctx.setLineDash([])

      // Miss flash — red tint
      if (g.missFlash && now - g.missFlash < 500) {
        ctx.fillStyle = `rgba(255,50,50,${0.15 * (1 - (now - g.missFlash)/500)})`
        ctx.fillRect(0, 0, W, H)
      }

      // AI paddle
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(AI_X, g.aiY - PADDLE_H/2, PADDLE_W, PADDLE_H)

      // Player paddle
      ctx.fillStyle = GREEN; ctx.shadowColor = GREEN; ctx.shadowBlur = 14
      ctx.fillRect(PLAYER_X, g.playerY - PADDLE_H/2, PADDLE_W, PADDLE_H); ctx.shadowBlur = 0

      // Ball
      if (!g.respawnPending) {
        ctx.fillStyle = '#fff'; ctx.shadowColor = GREEN; ctx.shadowBlur = 18
        ctx.beginPath(); ctx.arc(g.bx, g.by, BALL_R, 0, Math.PI*2); ctx.fill()
        ctx.shadowBlur = 0; ctx.fillStyle = GREEN
        ctx.beginPath(); ctx.arc(g.bx, g.by, BALL_R*0.35, 0, Math.PI*2); ctx.fill()
      }

      // Red obstacle dots
      for (const d of g.redDots) {
        ctx.fillStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 14
        ctx.beginPath(); ctx.arc(d.x, d.y, DOT_R, 0, Math.PI*2); ctx.fill()
        ctx.shadowBlur = 0
        ctx.fillStyle = '#fff'
        ctx.beginPath(); ctx.arc(d.x, d.y, DOT_R*0.35, 0, Math.PI*2); ctx.fill()
      }

      // Lives
      for (let i = 0; i < LIVES; i++) {
        ctx.beginPath(); ctx.arc(16+i*16, 16, 5, 0, Math.PI*2)
        ctx.fillStyle = i < g.lives ? GREEN : '#222'
        ctx.shadowColor = i < g.lives ? GREEN : 'none'; ctx.shadowBlur = i < g.lives ? 6 : 0
        ctx.fill(); ctx.shadowBlur = 0
      }

      // Score
      ctx.fillStyle = GREEN; ctx.font = `700 13px ${DISP}`; ctx.textAlign = 'right'
      ctx.fillText(g.totalScore.toLocaleString(), W-10, 22)
      if (g.combo > 1) {
        ctx.fillStyle = `rgba(61,245,66,${Math.min(1, g.combo/8)})`
        ctx.font = `700 10px ${BODY}`
        ctx.fillText(`×${g.combo} COMBO`, W-10, 38)
      }

      frameRef.current = requestAnimationFrame(loop)
    }
    frameRef.current = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(frameRef.current); window.removeEventListener('resize', resize) }
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  const onPointer = (e: React.PointerEvent) => {
    if (!gs.current) return
    const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return
    const newY = Math.max(PADDLE_H/2, Math.min(rect.height - PADDLE_H/2, e.clientY - rect.top))
    const moved = Math.abs(newY - gs.current.playerY)
    gs.current.playerY = newY
    if (moved > 2) startPaddle()
    else if (_padMoving) stopPaddle()
  }

  const currentItem = gs.current?.items[gs.current.itemIdx % ITEMS.length] ?? ITEMS[0]
  const fs = finalScore.current
  const verdict = [...VERDICTS].sort((a,b) => b.min - a.min).find(v => fs >= v.min) ?? VERDICTS[VERDICTS.length-1]

  if (phase === 'intro') return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:28, background:BLACK, overflowY:'auto' }}>
      <div style={{ maxWidth:360, width:'100%', display:'flex', flexDirection:'column', gap:22 }}>
        <div>
          <p style={{ fontFamily:DISP, fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:GREEN, margin:'0 0 10px', opacity:0.6 }}>Signal Drop · W1 M3</p>
          <h1 style={{ fontFamily:DISP, fontSize:38, color:'#fff', margin:'0 0 12px', lineHeight:1 }}>Sort the Data</h1>
          <p style={{ fontFamily:BODY, fontSize:14, color:'#666', lineHeight:1.6, margin:0 }}>Rally the ball. Combos score more. Don't miss.</p>
        </div>
        <div style={{ border:'1px solid #222', background:'#0d0d0d', padding:'14px 18px', display:'flex', flexDirection:'column', gap:6 }}>
          <div style={{ fontFamily:BODY, fontSize:13, color:'#888' }}>Hit: <span style={{ color:GREEN, fontWeight:700 }}>+10 × combo</span></div>
          <div style={{ fontFamily:BODY, fontSize:13, color:'#888' }}>Miss: combo resets — arrow keys or pointer</div>
        </div>
        <button onClick={startGame} style={{ fontFamily:DISP, fontSize:12, letterSpacing:'0.14em', textTransform:'uppercase', background:GREEN, color:BLACK, padding:'16px 0', border:'none', cursor:'pointer', touchAction:'manipulation', boxShadow:`0 0 28px ${GREEN}55` }}>
          Start
        </button>
        {board.length > 0 && (
          <div style={{ border:'1px solid #1a1a1a', background:'#080808' }}>
            <div style={{ padding:'8px 14px', borderBottom:'1px solid #1a1a1a', fontFamily:DISP, fontSize:9, letterSpacing:'0.14em', color:DIM }}>TOP SCORES</div>
            {board.slice(0,5).map((b,i) => (
              <div key={b.username} style={{ padding:'7px 14px', display:'flex', justifyContent:'space-between', borderBottom: i<4?'1px solid #111':'none' }}>
                <span style={{ fontFamily:BODY, fontSize:12, color:'#555' }}>{i+1}. {b.username}</span>
                <span style={{ fontFamily:DISP, fontSize:12, color:GREEN }}>{Number(b.best).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  if (phase === 'countdown') return (
    <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', background:BLACK }}>
      <div key={countdown} style={{ fontFamily:DISP, fontSize: countdown>0?130:72, color: countdown>0?'#fff':GREEN, lineHeight:1, letterSpacing:'-0.04em', textShadow:`0 0 60px ${countdown>0?'rgba(255,255,255,0.25)':GREEN}`, animation:'countPop 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards' }}>
        {countdown > 0 ? countdown : 'GO'}
      </div>
      <style>{`@keyframes countPop{0%{transform:scale(1.5);opacity:0}40%{opacity:1}100%{transform:scale(1);opacity:1}}`}</style>
    </div>
  )

  if (phase === 'playing') return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', background:BLACK }} onPointerMove={onPointer}>
      <div style={{ padding:'7px 16px', borderBottom:'1px solid #111', flexShrink:0, textAlign:'center' }}>
        <span style={{ fontFamily:BODY, fontSize:12, color:'#383838' }}>{currentItem}</span>
      </div>
      <div style={{ flex:1, position:'relative', minHeight:0 }}>
        <canvas ref={canvasRef} style={{ display:'block', width:'100%', height:'100%', touchAction:'none', cursor:'none' }} />
        {pops.map(p => (
          <div key={p.id} style={{
            position:'absolute', left:`${p.x*100}%`, top:`${p.y*100}%`,
            transform:'translate(-50%,-50%)',
            fontFamily:DISP, fontSize:20, color:GREEN,
            pointerEvents:'none', textShadow:`0 0 14px ${GREEN}`,
            animation:'popUp 0.9s ease-out forwards',
          }}>{p.text}</div>
        ))}
      </div>
      <style>{`@keyframes popUp{0%{opacity:1;transform:translate(-50%,-50%) scale(1.3)}40%{opacity:1;transform:translate(-50%,calc(-50% - 18px)) scale(1)}100%{opacity:0;transform:translate(-50%,calc(-50% - 50px)) scale(0.8)}}`}</style>
    </div>
  )

  if (phase === 'facts') {
    const isLast = factIdx === FACTS.length - 1
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:28, background:BLACK, overflowY:'auto' }}>
        <div style={{ maxWidth:380, width:'100%', display:'flex', flexDirection:'column', gap:18 }}>
          <p style={{ fontFamily:DISP, fontSize:9, letterSpacing:'0.16em', textTransform:'uppercase', color:GREEN, opacity:0.5, margin:0 }}>{factIdx+1} / {FACTS.length}</p>
          <div style={{ border:'1px solid #1e1e1e', padding:'24px 22px', background:'#0d0d0d' }}>
            <p style={{ fontFamily:BODY, fontSize:16, color:'#ccc', lineHeight:1.7, margin:0 }}>{FACTS[factIdx]}</p>
          </div>
          <button onClick={() => isLast ? setPhase('end') : setFactIdx(f => f+1)}
            style={{ fontFamily:DISP, fontSize:12, letterSpacing:'0.14em', textTransform:'uppercase', background:GREEN, color:BLACK, padding:'15px 0', border:'none', cursor:'pointer', touchAction:'manipulation', boxShadow:`0 0 18px ${GREEN}55` }}>
            {isLast ? 'See results →' : 'Next →'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:28, background:BLACK, overflowY:'auto' }}>
      <div style={{ maxWidth:380, width:'100%', display:'flex', flexDirection:'column', gap:20, textAlign:'center' }}>
        <div style={{ fontFamily:DISP, fontSize:72, color:GREEN, lineHeight:1, letterSpacing:'-0.03em', textShadow:`0 0 40px ${GREEN}66` }}>
          {fs.toLocaleString()}
        </div>
        <div style={{ border:'1px solid #1e1e1e', padding:'20px', background:'#0d0d0d' }}>
          <p style={{ fontFamily:DISP, fontSize:17, color:GREEN, margin:'0 0 8px', lineHeight:1.2 }}>{verdict.h}</p>
          <p style={{ fontFamily:BODY, fontSize:14, color:'#777', margin:0, lineHeight:1.55 }}>{verdict.s}</p>
        </div>

        {/* Leaderboard */}
        {board.length > 0 && (
          <div style={{ border:'1px solid #1a1a1a', background:'#080808', textAlign:'left' }}>
            <div style={{ padding:'8px 14px', borderBottom:'1px solid #1a1a1a', fontFamily:DISP, fontSize:9, letterSpacing:'0.14em', color:DIM }}>LEADERBOARD</div>
            {board.slice(0,8).map((b,i) => (
              <div key={b.username} style={{ padding:'7px 14px', display:'flex', justifyContent:'space-between', borderBottom: i<board.slice(0,8).length-1?'1px solid #111':'none' }}>
                <span style={{ fontFamily:BODY, fontSize:12, color: i===0?GREEN:'#555' }}>{i+1}. {b.username}</span>
                <span style={{ fontFamily:DISP, fontSize:12, color: i===0?GREEN:DIM }}>{Number(b.best).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display:'flex', gap:10 }}>
          <button onClick={startGame} style={{ flex:1, fontFamily:DISP, fontSize:12, letterSpacing:'0.14em', textTransform:'uppercase', background:GREEN, color:BLACK, padding:'14px 0', border:'none', cursor:'pointer', touchAction:'manipulation', boxShadow:`0 0 22px ${GREEN}66` }}>
            Retry
          </button>
          <button onClick={() => { loadBoard(); setPhase('intro') }} style={{ fontFamily:DISP, fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', background:'transparent', color:DIM, padding:'14px 16px', border:'1px solid #222', cursor:'pointer', touchAction:'manipulation' }}>
            Menu
          </button>
        </div>
      </div>
    </div>
  )
}
