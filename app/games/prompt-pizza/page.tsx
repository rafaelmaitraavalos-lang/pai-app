'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

// ── palette ────────────────────────────────────────────────────────────────
const PINK  = '#ff2d78'
const GREEN = '#39ff14'

// ── orders ─────────────────────────────────────────────────────────────────
interface Order {
  customer: string
  order:    string
  hint:     string
  required: string[][]   // one synonym per group must appear
  forbidden: string[]
  time:     number
}

const ORDERS: Order[] = [
  {
    customer: 'Marco 🧑',
    order:    '"Just a plain cheese pizza, nothing fancy."',
    hint:     'Say: cheese + pizza',
    required: [['cheese','cheesy'],['pizza']],
    forbidden:['pepperoni','sausage','mushroom','bacon','no cheese'],
    time: 60,
  },
  {
    customer: 'Sofia 👩',
    order:    '"Pepperoni pizza with extra sauce. No mushrooms!"',
    hint:     'Say: pepperoni + extra sauce. Avoid: mushroom',
    required: [['pepperoni'],['extra sauce','more sauce','lots of sauce']],
    forbidden:['mushroom','fungi'],
    time: 55,
  },
  {
    customer: 'Jake 🧔',
    order:    '"Vegetarian pizza with bell peppers and onions. Gluten-free crust please!"',
    hint:     'Say: vegetarian + bell pepper + onion + gluten free',
    required: [['vegetarian','veggie'],['bell pepper','capsicum'],['onion'],['gluten free','gluten-free','no gluten']],
    forbidden:['meat','pepperoni','sausage','chicken','beef','pork'],
    time: 55,
  },
  {
    customer: 'Priya 👩‍🦱',
    order:    '"Spicy buffalo chicken, thin crust, light on cheese!"',
    hint:     'Say: buffalo + chicken + thin crust + light cheese',
    required: [['buffalo','hot sauce'],['chicken'],['thin crust','thin'],['light cheese','less cheese','light on cheese']],
    forbidden:['thick crust','deep dish','extra cheese','no cheese'],
    time: 50,
  },
  {
    customer: 'Ben 🧑‍🍳',
    order:    '"BBQ pulled pork with jalapeños. Ranch base, NO tomato sauce!"',
    hint:     'Say: BBQ + pork + jalapeño + ranch. Avoid: tomato sauce',
    required: [['bbq','barbecue','barbeque'],['pork','pulled pork'],['jalapeño','jalapeno'],['ranch']],
    forbidden:['tomato sauce','marinara','red sauce'],
    time: 50,
  },
  {
    customer: 'Lia 🧕',
    order:    '"Vegan margherita, fresh basil, dairy-free cheese, crispy crust!"',
    hint:     'Say: vegan + basil + dairy free + crispy',
    required: [['vegan','plant based','plant-based'],['basil'],['dairy free','dairy-free','no dairy'],['crispy','crispy crust']],
    forbidden:['mozzarella','parmesan','regular cheese'],
    time: 45,
  },
  {
    customer: 'Zara 👱‍♀️',
    order:    '"Supreme pizza: pepperoni, sausage, olives, bell peppers, onions. Well done thin crust!"',
    hint:     'Say: pepperoni + sausage + olive + bell pepper + onion + thin + well done',
    required: [['pepperoni'],['sausage'],['olive'],['bell pepper'],['onion'],['thin'],['well done','extra crispy','crispy']],
    forbidden:['thick','deep dish','soft'],
    time: 45,
  },
]

// ── helpers ─────────────────────────────────────────────────────────────────
function evaluate(text: string, order: Order) {
  const t = text.toLowerCase()
  const missing   = order.required.filter(g => !g.some(k => t.includes(k))).map(g => g[0])
  const violated  = order.forbidden.filter(k => t.includes(k))
  return { ok: missing.length === 0 && violated.length === 0, missing, violated }
}

// ── pizza SVG ───────────────────────────────────────────────────────────────
function PizzaSVG({ mood }: { mood: 'wait' | 'happy' | 'sad' }) {
  const face =
    mood === 'happy' ? 'M 36 56 Q 50 68 64 56' :
    mood === 'sad'   ? 'M 36 62 Q 50 52 64 62' :
                       'M 38 58 L 62 58'
  const eyeColor = mood === 'sad' ? PINK : mood === 'happy' ? GREEN : '#fff'
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      {/* crust */}
      <circle cx="50" cy="50" r="46" fill="#c47a1e" />
      {/* sauce */}
      <circle cx="50" cy="50" r="38" fill="#e03030" />
      {/* cheese */}
      <circle cx="50" cy="50" r="32" fill="#f5c842" />
      {/* toppings */}
      {mood !== 'wait' && <>
        <circle cx="50" cy="32" r="5" fill={mood==='happy'?'#bb2020':'#555'} />
        <circle cx="34" cy="44" r="5" fill={mood==='happy'?'#bb2020':'#555'} />
        <circle cx="66" cy="44" r="5" fill={mood==='happy'?'#bb2020':'#555'} />
        <circle cx="40" cy="60" r="5" fill={mood==='happy'?'#bb2020':'#555'} />
        <circle cx="60" cy="60" r="5" fill={mood==='happy'?'#bb2020':'#555'} />
      </>}
      {/* face */}
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

  const [screen,     setScreen]     = useState<Screen>('title')
  const [orderIdx,   setOrderIdx]   = useState(0)
  const [prompt,     setPrompt]     = useState('')
  const [score,      setScore]      = useState(0)
  const [timeLeft,   setTimeLeft]   = useState(ORDERS[0].time)
  const [result,     setResult]     = useState<Result | null>(null)
  const [shake,      setShake]      = useState(false)

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const order = ORDERS[orderIdx]

  // ── timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== 'play') return
    setTimeLeft(order.time)
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          handleTimeout()
          return 0
        }
        return t - 1
      })
    }, 1000)
    setTimeout(() => inputRef.current?.focus(), 50)
    return () => clearInterval(timerRef.current!)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, orderIdx])

  function handleTimeout() {
    const res = evaluate(prompt, order)
    finalise(res)
  }

  function submit() {
    if (!prompt.trim()) { triggerShake(); return }
    clearInterval(timerRef.current!)
    const res = evaluate(prompt, order)
    finalise(res)
  }

  function finalise(res: ReturnType<typeof evaluate>) {
    const timeBonus = timeLeft * 3
    const base      = res.ok ? 200 : Math.max(0, (1 - res.missing.length * 0.3 - res.violated.length * 0.4)) * 100
    const pts       = Math.round(res.ok ? base + timeBonus : base)
    setResult({ ...res, points: pts })
    setScore(s => s + pts)
    setScreen('result')
  }

  function nextOrder() {
    setPrompt('')
    setResult(null)
    if (orderIdx + 1 >= ORDERS.length) {
      setScreen('gameover')
    } else {
      setOrderIdx(i => i + 1)
      setScreen('play')
    }
  }

  function restart() {
    setOrderIdx(0); setScore(0); setPrompt(''); setResult(null); setScreen('title')
  }

  function triggerShake() {
    setShake(true); setTimeout(() => setShake(false), 400)
  }

  const timerPct = (timeLeft / order.time) * 100
  const timerColor = timerPct > 50 ? GREEN : timerPct > 25 ? '#ffdd00' : PINK

  // ── title screen ───────────────────────────────────────────────────────────
  if (screen === 'title') return (
    <div style={styles.root}>
      <button onClick={() => router.back()} style={styles.backBtn}>← back</button>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:24 }}>
        <PizzaSVG mood="happy" />
        <h1 style={{ ...styles.neonText(PINK), fontSize:48, letterSpacing:4, textAlign:'center' }}>
          PROMPT<br />PIZZA
        </h1>
        <p style={{ color:'#aaa', fontFamily:'monospace', fontSize:13, textAlign:'center', maxWidth:280, lineHeight:1.6 }}>
          Customers give orders.<br />
          You write the AI prompt.<br />
          Get every ingredient right!
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:8, width:260 }}>
          {[['Required','List every ingredient they ask for'],['Forbidden','Never mention what they said NO to'],['Speed','Faster = more bonus points']].map(([t,d])=>(
            <div key={t} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
              <span style={{ color:GREEN, fontFamily:'monospace', fontSize:12, flexShrink:0 }}>▸</span>
              <span style={{ color:'#ccc', fontFamily:'monospace', fontSize:12 }}><b style={{color:GREEN}}>{t}:</b> {d}</span>
            </div>
          ))}
        </div>
        <button style={styles.bigBtn(PINK)} onClick={() => setScreen('play')}>
          START →
        </button>
      </div>
    </div>
  )

  // ── result screen ──────────────────────────────────────────────────────────
  if (screen === 'result' && result) return (
    <div style={styles.root}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:18, width:'100%', maxWidth:460 }}>
        <PizzaSVG mood={result.ok ? 'happy' : 'sad'} />

        <div style={{ ...styles.neonText(result.ok ? GREEN : PINK), fontSize:28, letterSpacing:3 }}>
          {result.ok ? '✓ PERFECT ORDER' : '✗ WRONG ORDER'}
        </div>

        {!result.ok && (
          <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:8 }}>
            {result.missing.length > 0 && (
              <div style={styles.feedbackBox(PINK)}>
                <span style={{ color:PINK, fontFamily:'monospace', fontSize:11 }}>MISSING</span>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:4 }}>
                  {result.missing.map(m => <Tag key={m} label={m} color={PINK} />)}
                </div>
              </div>
            )}
            {result.violated.length > 0 && (
              <div style={styles.feedbackBox('#ff8800')}>
                <span style={{ color:'#ff8800', fontFamily:'monospace', fontSize:11 }}>SHOULD NOT INCLUDE</span>
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
        <div style={{ color:'#666', fontFamily:'monospace', fontSize:12 }}>
          Total: {score} pts
        </div>

        <button style={styles.bigBtn(GREEN)} onClick={nextOrder}>
          {orderIdx + 1 >= ORDERS.length ? 'SEE SCORE →' : 'NEXT ORDER →'}
        </button>
      </div>
    </div>
  )

  // ── game over ─────────────────────────────────────────────────────────────
  if (screen === 'gameover') {
    const max   = ORDERS.length * 200 + ORDERS.reduce((a,o) => a+o.time*3,0)
    const pct   = Math.round((score / max) * 100)
    const grade = pct >= 90 ? 'S' : pct >= 75 ? 'A' : pct >= 55 ? 'B' : pct >= 35 ? 'C' : 'D'
    const gradeColor = pct >= 75 ? GREEN : pct >= 55 ? '#ffdd00' : PINK
    return (
      <div style={styles.root}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20 }}>
          <PizzaSVG mood="happy" />
          <div style={{ ...styles.neonText(GREEN), fontSize:32, letterSpacing:4 }}>RESTAURANT CLOSED</div>
          <div style={{ ...styles.neonText(gradeColor), fontSize:72, letterSpacing:8 }}>{grade}</div>
          <div style={{ color:GREEN, fontFamily:'monospace', fontSize:24, letterSpacing:2 }}>{score} pts</div>
          <div style={{ color:'#555', fontFamily:'monospace', fontSize:11 }}>{ORDERS.length} orders · max {max} pts</div>
          <button style={styles.bigBtn(PINK)} onClick={restart}>PLAY AGAIN →</button>
          <button onClick={() => router.back()} style={{ background:'none', border:'none', color:'#444', fontFamily:'monospace', fontSize:12, cursor:'pointer' }}>
            ← back
          </button>
        </div>
      </div>
    )
  }

  // ── play screen ────────────────────────────────────────────────────────────
  return (
    <div style={styles.root}>
      {/* HUD */}
      <div style={{ width:'100%', maxWidth:520, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <span style={{ color:'#444', fontFamily:'monospace', fontSize:11 }}>
          ORDER {orderIdx+1} / {ORDERS.length}
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
        {/* Customer order */}
        <div style={styles.card}>
          <div style={{ color:'#555', fontFamily:'monospace', fontSize:10, marginBottom:4, letterSpacing:1 }}>
            CUSTOMER
          </div>
          <div style={{ color:GREEN, fontFamily:'monospace', fontSize:13, marginBottom:8 }}>
            {order.customer}
          </div>
          <div style={{ color:'#fff', fontFamily:'monospace', fontSize:14, lineHeight:1.6 }}>
            {order.order}
          </div>
          <div style={{ color:'#444', fontFamily:'monospace', fontSize:10, marginTop:8, borderTop:'1px solid #222', paddingTop:8 }}>
            hint: {order.hint}
          </div>
        </div>

        {/* Pizza preview */}
        <div style={{ display:'flex', justifyContent:'center' }}>
          <PizzaSVG mood="wait" />
        </div>

        {/* Prompt input */}
        <div style={{ position:'relative' }}>
          <div style={{ color:'#444', fontFamily:'monospace', fontSize:10, marginBottom:6, letterSpacing:1 }}>
            YOUR PROMPT →
          </div>
          <div style={{
            padding: '2px 2px',
            borderRadius: 6,
            background: `linear-gradient(135deg, ${PINK}, ${GREEN})`,
            animation: shake ? 'shake 0.4s ease' : undefined,
          }}>
            <textarea
              ref={inputRef}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
              rows={3}
              placeholder='Type your AI prompt here... (Enter to submit)'
              style={{
                width:'100%', boxSizing:'border-box',
                background:'#0a0a0a', color:'#fff',
                border:'none', borderRadius:5,
                padding:'10px 12px',
                fontFamily:'monospace', fontSize:13, lineHeight:1.6,
                resize:'none', outline:'none',
              }}
            />
          </div>
        </div>

        <button
          style={styles.bigBtn(GREEN)}
          onClick={submit}
        >
          SUBMIT PROMPT →
        </button>

        {/* Timer */}
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

// ── small components ──────────────────────────────────────────────────────────
function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      border: `1px solid ${color}`, color, borderRadius:4,
      padding:'2px 8px', fontFamily:'monospace', fontSize:11,
      textTransform:'lowercase',
    }}>
      {label}
    </span>
  )
}

// ── styles ────────────────────────────────────────────────────────────────────
const styles = {
  root: {
    minHeight: '100vh',
    background: '#000',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: '24px 16px',
    gap: 0,
  },
  neonText: (color: string) => ({
    color,
    fontFamily: 'monospace',
    fontWeight: 900,
    textShadow: `0 0 10px ${color}, 0 0 30px ${color}55`,
  }),
  bigBtn: (color: string) => ({
    width: '100%' as const,
    maxWidth: 320,
    padding: '14px 0',
    background: 'none',
    border: `2px solid ${color}`,
    borderRadius: 6,
    color,
    fontFamily: 'monospace',
    fontSize: 15,
    fontWeight: 900,
    letterSpacing: 2,
    cursor: 'pointer' as const,
    boxShadow: `0 0 12px ${color}55`,
    transition: 'box-shadow 0.2s, background 0.2s',
  }),
  card: {
    background: '#0d0d0d',
    border: '1px solid #222',
    borderRadius: 8,
    padding: '14px 16px',
  },
  feedbackBox: (color: string) => ({
    background: '#0d0d0d',
    border: `1px solid ${color}44`,
    borderRadius: 6,
    padding: '10px 14px',
  }),
  backBtn: {
    position: 'fixed' as const,
    top: 14, left: 16,
    background: 'none',
    border: 'none',
    color: '#444',
    fontFamily: 'monospace',
    fontSize: 12,
    cursor: 'pointer' as const,
    letterSpacing: 1,
  },
}
