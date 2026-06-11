'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

// ── palette ────────────────────────────────────────────────────────────────
const PINK  = '#ff2d78'
const GREEN = '#39ff14'

// ── rounds ─────────────────────────────────────────────────────────────────
interface Round {
  image:    string      // Pexels photo URL
  label:    string      // short pizza name shown under image
  hint:     string      // "I can see: ..."
  required: string[][]  // one synonym per group must appear
  forbidden: string[]
  time:     number
}

const ROUNDS: Round[] = [
  {
    image:    'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=800',
    label:    'Classic Margherita',
    hint:     'I can see: cheese, tomato, basil',
    required: [['cheese','cheesy','mozzarella'],['tomato','tomato sauce','marinara'],['basil']],
    forbidden:[],
    time: 60,
  },
  {
    image:    'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&w=800',
    label:    'Pepperoni',
    hint:     'I can see: pepperoni, cheese, pizza',
    required: [['pepperoni'],['cheese','mozzarella'],['pizza']],
    forbidden:[],
    time: 55,
  },
  {
    image:    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    label:    'Veggie Supreme',
    hint:     'I can see: vegetables, bell pepper, mushroom, onion',
    required: [['vegetable','veggie','vegetarian'],['bell pepper','pepper'],['mushroom'],['onion']],
    forbidden:['meat','pepperoni','chicken','sausage'],
    time: 55,
  },
  {
    image:    'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=800',
    label:    'BBQ Chicken',
    hint:     'I can see: chicken, BBQ sauce, onion',
    required: [['chicken'],['bbq','barbecue','barbeque'],['onion']],
    forbidden:['tomato sauce','marinara','red sauce'],
    time: 50,
  },
  {
    image:    'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=800',
    label:    'Hawaiian',
    hint:     'I can see: pineapple, ham, cheese',
    required: [['pineapple'],['ham'],['cheese','mozzarella']],
    forbidden:[],
    time: 50,
  },
  {
    image:    'https://images.pexels.com/photos/3682837/pexels-photo-3682837.jpeg?auto=compress&cs=tinysrgb&w=800',
    label:    'Mushroom & Garlic',
    hint:     'I can see: mushroom, garlic, cheese, thin crust',
    required: [['mushroom'],['garlic'],['cheese','mozzarella'],['thin crust','thin']],
    forbidden:[],
    time: 50,
  },
  {
    image:    'https://images.pexels.com/photos/1049627/pexels-photo-1049627.jpeg?auto=compress&cs=tinysrgb&w=800',
    label:    'Supreme',
    hint:     'I can see: pepperoni, sausage, olive, bell pepper, onion',
    required: [['pepperoni'],['sausage'],['olive'],['bell pepper','pepper'],['onion']],
    forbidden:[],
    time: 45,
  },
]

// ── helpers ─────────────────────────────────────────────────────────────────
function evaluate(text: string, round: Round) {
  const t = text.toLowerCase()
  const missing  = round.required.filter(g => !g.some(k => t.includes(k))).map(g => g[0])
  const violated = round.forbidden.filter(k => t.includes(k))
  return { ok: missing.length === 0 && violated.length === 0, missing, violated }
}

// ── pizza SVG (used only on title / result / gameover) ─────────────────────
function PizzaSVG({ mood }: { mood: 'wait' | 'happy' | 'sad' }) {
  const face =
    mood === 'happy' ? 'M 36 56 Q 50 68 64 56' :
    mood === 'sad'   ? 'M 36 62 Q 50 52 64 62' :
                       'M 38 58 L 62 58'
  const eyeColor = mood === 'sad' ? PINK : mood === 'happy' ? GREEN : '#fff'
  return (
    <svg width="90" height="90" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="46" fill="#c47a1e" />
      <circle cx="50" cy="50" r="38" fill="#e03030" />
      <circle cx="50" cy="50" r="32" fill="#f5c842" />
      {mood !== 'wait' && <>
        <circle cx="50" cy="32" r="5" fill={mood==='happy'?'#bb2020':'#555'} />
        <circle cx="34" cy="44" r="5" fill={mood==='happy'?'#bb2020':'#555'} />
        <circle cx="66" cy="44" r="5" fill={mood==='happy'?'#bb2020':'#555'} />
        <circle cx="40" cy="60" r="5" fill={mood==='happy'?'#bb2020':'#555'} />
        <circle cx="60" cy="60" r="5" fill={mood==='happy'?'#bb2020':'#555'} />
      </>}
      <circle cx="40" cy="46" r="4" fill={eyeColor} />
      <circle cx="60" cy="46" r="4" fill={eyeColor} />
      <path d={face} stroke={eyeColor} strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// ── types ───────────────────────────────────────────────────────────────────
type Screen = 'title' | 'play' | 'result' | 'gameover'
interface Result { ok: boolean; missing: string[]; violated: string[]; points: number }

// ── game ─────────────────────────────────────────────────────────────────────
export default function PromptPizzaGame() {
  const router = useRouter()

  const [screen,   setScreen]   = useState<Screen>('title')
  const [idx,      setIdx]      = useState(0)
  const [prompt,   setPrompt]   = useState('')
  const [score,    setScore]    = useState(0)
  const [timeLeft, setTimeLeft] = useState(ROUNDS[0].time)
  const [result,   setResult]   = useState<Result | null>(null)
  const [shake,    setShake]    = useState(false)

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const round = ROUNDS[idx]

  useEffect(() => {
    if (screen !== 'play') return
    setTimeLeft(round.time)
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current!); handleTimeout(); return 0 }
        return t - 1
      })
    }, 1000)
    setTimeout(() => inputRef.current?.focus(), 50)
    return () => clearInterval(timerRef.current!)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, idx])

  function handleTimeout() { finalise(evaluate(prompt, round)) }

  function submit() {
    if (!prompt.trim()) { triggerShake(); return }
    clearInterval(timerRef.current!)
    finalise(evaluate(prompt, round))
  }

  function finalise(res: ReturnType<typeof evaluate>) {
    const timeBonus = timeLeft * 3
    const base = res.ok ? 200 : Math.max(0, (1 - res.missing.length * 0.3 - res.violated.length * 0.4)) * 100
    const pts  = Math.round(res.ok ? base + timeBonus : base)
    setResult({ ...res, points: pts })
    setScore(s => s + pts)
    setScreen('result')
  }

  function next() {
    setPrompt(''); setResult(null)
    if (idx + 1 >= ROUNDS.length) { setScreen('gameover') }
    else { setIdx(i => i + 1); setScreen('play') }
  }

  function restart() {
    setIdx(0); setScore(0); setPrompt(''); setResult(null); setScreen('title')
  }

  function triggerShake() { setShake(true); setTimeout(() => setShake(false), 400) }

  const timerPct   = (timeLeft / round.time) * 100
  const timerColor = timerPct > 50 ? GREEN : timerPct > 25 ? '#ffdd00' : PINK

  // ── title ──────────────────────────────────────────────────────────────────
  if (screen === 'title') return (
    <div style={S.root}>
      <button onClick={() => router.back()} style={S.backBtn}>← back</button>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20 }}>
        <PizzaSVG mood="happy" />
        <h1 style={{ ...S.neon(PINK), fontSize:44, letterSpacing:4, textAlign:'center', margin:0 }}>
          PROMPT<br />PIZZA
        </h1>
        <p style={{ color:'#aaa', fontFamily:'monospace', fontSize:13, textAlign:'center', maxWidth:280, lineHeight:1.6, margin:0 }}>
          Look at the pizza photo.<br />
          Write the AI prompt that made it.<br />
          Describe every topping you see!
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:8, width:260 }}>
          {[
            ['Describe', 'Name every topping and ingredient you can see'],
            ['Be specific','The more detail in your prompt, the better'],
            ['Speed','Faster answers earn more bonus points'],
          ].map(([t,d]) => (
            <div key={t} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
              <span style={{ color:GREEN, fontFamily:'monospace', fontSize:12, flexShrink:0 }}>▸</span>
              <span style={{ color:'#ccc', fontFamily:'monospace', fontSize:12 }}>
                <b style={{color:GREEN}}>{t}:</b> {d}
              </span>
            </div>
          ))}
        </div>
        <button style={S.bigBtn(PINK)} onClick={() => setScreen('play')}>START →</button>
      </div>
    </div>
  )

  // ── result ─────────────────────────────────────────────────────────────────
  if (screen === 'result' && result) return (
    <div style={S.root}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16, width:'100%', maxWidth:460 }}>
        <PizzaSVG mood={result.ok ? 'happy' : 'sad'} />
        <div style={{ ...S.neon(result.ok ? GREEN : PINK), fontSize:26, letterSpacing:3 }}>
          {result.ok ? '✓ GREAT PROMPT!' : '✗ MISSING DETAILS'}
        </div>
        {!result.ok && (
          <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:8 }}>
            {result.missing.length > 0 && (
              <div style={S.feedbackBox(PINK)}>
                <span style={{ color:PINK, fontFamily:'monospace', fontSize:11 }}>SHOULD HAVE MENTIONED</span>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:4 }}>
                  {result.missing.map(m => <Tag key={m} label={m} color={PINK} />)}
                </div>
              </div>
            )}
            {result.violated.length > 0 && (
              <div style={S.feedbackBox('#ff8800')}>
                <span style={{ color:'#ff8800', fontFamily:'monospace', fontSize:11 }}>THAT PIZZA DOESN'T HAVE</span>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:4 }}>
                  {result.violated.map(v => <Tag key={v} label={v} color="#ff8800" />)}
                </div>
              </div>
            )}
          </div>
        )}
        <div style={{ color: result.ok ? GREEN : '#aaa', fontFamily:'monospace', fontSize:22, letterSpacing:2 }}>
          +{result.points} pts
        </div>
        <div style={{ color:'#555', fontFamily:'monospace', fontSize:12 }}>Total: {score} pts</div>
        <button style={S.bigBtn(GREEN)} onClick={next}>
          {idx + 1 >= ROUNDS.length ? 'SEE SCORE →' : 'NEXT PIZZA →'}
        </button>
      </div>
    </div>
  )

  // ── game over ──────────────────────────────────────────────────────────────
  if (screen === 'gameover') {
    const max = ROUNDS.length * 200 + ROUNDS.reduce((a,r) => a+r.time*3, 0)
    const pct = Math.round((score / max) * 100)
    const grade = pct>=90?'S':pct>=75?'A':pct>=55?'B':pct>=35?'C':'D'
    const gc    = pct>=75?GREEN:pct>=55?'#ffdd00':PINK
    return (
      <div style={S.root}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20 }}>
          <PizzaSVG mood="happy" />
          <div style={{ ...S.neon(GREEN), fontSize:28, letterSpacing:4 }}>RESTAURANT CLOSED</div>
          <div style={{ ...S.neon(gc), fontSize:72, letterSpacing:8 }}>{grade}</div>
          <div style={{ color:GREEN, fontFamily:'monospace', fontSize:24, letterSpacing:2 }}>{score} pts</div>
          <div style={{ color:'#555', fontFamily:'monospace', fontSize:11 }}>{ROUNDS.length} pizzas · max {max} pts</div>
          <button style={S.bigBtn(PINK)} onClick={restart}>PLAY AGAIN →</button>
          <button onClick={() => router.back()} style={{ background:'none', border:'none', color:'#444', fontFamily:'monospace', fontSize:12, cursor:'pointer' }}>
            ← back
          </button>
        </div>
      </div>
    )
  }

  // ── play ───────────────────────────────────────────────────────────────────
  return (
    <div style={S.root}>
      {/* HUD */}
      <div style={{ width:'100%', maxWidth:520, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <span style={{ color:'#444', fontFamily:'monospace', fontSize:11 }}>
          PIZZA {idx+1} / {ROUNDS.length}
        </span>
        <span style={{ color:GREEN, fontFamily:'monospace', fontSize:13, letterSpacing:1 }}>
          {score} pts
        </span>
      </div>

      {/* Timer bar */}
      <div style={{ width:'100%', maxWidth:520, height:4, background:'#111', borderRadius:2, marginBottom:16, overflow:'hidden' }}>
        <div style={{
          height:'100%', borderRadius:2,
          width:`${timerPct}%`,
          background: timerColor,
          transition:'width 1s linear, background 0.3s',
          boxShadow:`0 0 8px ${timerColor}`,
        }} />
      </div>

      <div style={{ width:'100%', maxWidth:520, display:'flex', flexDirection:'column', gap:14 }}>

        {/* Pizza photo */}
        <div style={{ position:'relative', borderRadius:8, overflow:'hidden', border:`1px solid #222` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={round.image}
            alt={round.label}
            style={{ width:'100%', height:240, objectFit:'cover', display:'block' }}
          />
          <div style={{
            position:'absolute', bottom:0, left:0, right:0,
            padding:'8px 12px',
            background:'linear-gradient(transparent, #000c)',
            fontFamily:'monospace', fontSize:12, color:'#fff', letterSpacing:1,
          }}>
            {round.label}
          </div>
        </div>

        {/* Instruction */}
        <div style={{ color:'#555', fontFamily:'monospace', fontSize:11, textAlign:'center', letterSpacing:1 }}>
          WRITE THE AI PROMPT THAT MADE THIS PIZZA ↓
        </div>

        {/* Prompt input */}
        <div style={{ position:'relative' }}>
          <div style={{
            padding:'2px 2px', borderRadius:6,
            background:`linear-gradient(135deg, ${PINK}, ${GREEN})`,
            animation: shake ? 'shake 0.4s ease' : undefined,
          }}>
            <textarea
              ref={inputRef}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
              rows={3}
              placeholder="Describe the pizza you see... (Enter to submit)"
              style={{
                width:'100%', boxSizing:'border-box' as const,
                background:'#0a0a0a', color:'#fff',
                border:'none', borderRadius:5,
                padding:'10px 12px',
                fontFamily:'monospace', fontSize:13, lineHeight:1.6,
                resize:'none', outline:'none',
              }}
            />
          </div>
        </div>

        {/* Hint */}
        <div style={{ color:'#333', fontFamily:'monospace', fontSize:10, letterSpacing:1, textAlign:'center' }}>
          hint: {round.hint}
        </div>

        <button style={S.bigBtn(GREEN)} onClick={submit}>
          SUBMIT PROMPT →
        </button>

        <div style={{ textAlign:'center', color:timerColor, fontFamily:'monospace', fontSize:11,
          textShadow:`0 0 6px ${timerColor}`, letterSpacing:2 }}>
          {timeLeft}s remaining
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-6px)}
          40%{transform:translateX(6px)}
          60%{transform:translateX(-4px)}
          80%{transform:translateX(4px)}
        }
      `}</style>
    </div>
  )
}

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      border:`1px solid ${color}`, color, borderRadius:4,
      padding:'2px 8px', fontFamily:'monospace', fontSize:11,
    }}>
      {label}
    </span>
  )
}

const S = {
  root: {
    minHeight:'100vh', background:'#000',
    display:'flex' as const, flexDirection:'column' as const,
    alignItems:'center' as const, justifyContent:'center' as const,
    padding:'24px 16px', gap:0,
  },
  neon: (c: string) => ({
    color:c, fontFamily:'monospace', fontWeight:900,
    textShadow:`0 0 10px ${c}, 0 0 30px ${c}55`,
  }),
  bigBtn: (c: string) => ({
    width:'100%' as const, maxWidth:320, padding:'14px 0',
    background:'none', border:`2px solid ${c}`, borderRadius:6,
    color:c, fontFamily:'monospace', fontSize:15, fontWeight:900,
    letterSpacing:2, cursor:'pointer' as const,
    boxShadow:`0 0 12px ${c}55`, transition:'box-shadow 0.2s',
  }),
  feedbackBox: (c: string) => ({
    background:'#0d0d0d', border:`1px solid ${c}44`,
    borderRadius:6, padding:'10px 14px',
  }),
  backBtn: {
    position:'fixed' as const, top:14, left:16,
    background:'none', border:'none', color:'#444',
    fontFamily:'monospace', fontSize:12, cursor:'pointer' as const, letterSpacing:1,
  },
}
