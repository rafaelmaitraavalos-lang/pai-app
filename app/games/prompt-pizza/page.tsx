'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

// ── palette ────────────────────────────────────────────────────────────────
const PINK  = '#ff2d78'
const GREEN = '#39ff14'

// ── shared pizza base elements ─────────────────────────────────────────────
function PizzaBase({ sauce }: { sauce: string }) {
  return (
    <>
      <rect width="340" height="240" fill="#180800"/>
      <circle cx={170} cy={115} r={108} fill="#c47a1e"/>
      <circle cx={170} cy={115} r={97}  fill="#9e5a0a"/>
      <circle cx={170} cy={115} r={90}  fill={sauce}/>
    </>
  )
}

// Mozzarella blobs given as [dx,dy,rx,ry] offsets from center
type Blob = [number,number,number,number]
function Mozz({ blobs, cx=170, cy=115 }: { blobs: Blob[]; cx?: number; cy?: number }) {
  return <>
    {blobs.map(([dx,dy,rx,ry],i) =>
      <ellipse key={i} cx={cx+dx} cy={cy+dy} rx={rx} ry={ry} fill="#f0e898" opacity="0.90"/>
    )}
  </>
}

// ── pizza illustrations ────────────────────────────────────────────────────
function PizzaIllustration({ type }: { type: string }) {
  const cx = 170, cy = 115

  if (type === 'margherita') {
    const blobs: Blob[] = [[-18,-28,30,21],[22,-38,24,18],[-38,8,26,19],[20,22,30,21],[-14,34,23,16],[34,-6,19,14],[0,2,16,14]]
    const basil: [number,number,number][] = [[-22,-38,-30],[30,18,20],[-30,22,160],[14,-52,45]]
    return (
      <svg width="100%" height="240" viewBox="0 0 340 240">
        <PizzaBase sauce="#cc2020"/>
        <Mozz blobs={blobs}/>
        {basil.map(([dx,dy,rot],i)=>(
          <g key={i}>
            <ellipse cx={cx+dx} cy={cy+dy} rx={15} ry={9} fill="#157a15" opacity="0.95"
              transform={`rotate(${rot} ${cx+dx} ${cy+dy})`}/>
            <line x1={cx+dx-6} y1={cy+dy} x2={cx+dx+6} y2={cy+dy} stroke="#0f5a0f" strokeWidth="1.5"
              transform={`rotate(${rot} ${cx+dx} ${cy+dy})`}/>
          </g>
        ))}
        <text x={cx} y={232} textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#ffffff99">Classic Margherita</text>
      </svg>
    )
  }

  if (type === 'pepperoni') {
    const pepPos: [number,number][] = [
      [0,0],[52,0],[-52,0],[0,52],[0,-52],
      [38,34],[38,-34],[-38,34],[-38,-34]
    ]
    return (
      <svg width="100%" height="240" viewBox="0 0 340 240">
        <PizzaBase sauce="#d4a020"/>
        <circle cx={cx} cy={cy} r={88} fill="#f2da78" opacity="0.55"/>
        {pepPos.map(([dx,dy],i)=>(
          <g key={i}>
            <circle cx={cx+dx} cy={cy+dy} r={14} fill="#8a0c0c"/>
            <circle cx={cx+dx} cy={cy+dy} r={10} fill="#c01212"/>
            <circle cx={cx+dx+3} cy={cy+dy-3} r={3} fill="#6a0808" opacity="0.75"/>
            <circle cx={cx+dx-4} cy={cy+dy+3} r={2} fill="#6a0808" opacity="0.55"/>
          </g>
        ))}
        <text x={cx} y={232} textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#ffffff99">Pepperoni</text>
      </svg>
    )
  }

  if (type === 'veggie') {
    const blobs: Blob[] = [[-16,-26,28,20],[24,-34,22,17],[-36,8,24,18],[22,20,28,20],[-12,34,22,16],[32,-4,18,14]]
    const greenPepper: [number,number,number,number][] = [[-40,-20,8,26],[-45,15,8,20],[-20,-50,8,22]]
    const redPepper: [number,number,number,number][]   = [[30,-40,8,22],[38,10,8,20]]
    const yellowPepper: [number,number,number,number][]= [[10,40,8,18],[-30,35,8,16]]
    const mushrooms: [number,number][] = [[-8,-8],[28,-28],[-32,-30],[10,28]]
    const onions: [number,number][]   = [[40,-15],[-10,45]]
    return (
      <svg width="100%" height="240" viewBox="0 0 340 240">
        <PizzaBase sauce="#c82020"/>
        <Mozz blobs={blobs}/>
        {greenPepper.map(([dx,dy,w,h],i)=>
          <rect key={i} x={cx+dx} y={cy+dy} width={w} height={h} rx={3} fill="#1e9a1e" opacity="0.92"/>
        )}
        {redPepper.map(([dx,dy,w,h],i)=>
          <rect key={i} x={cx+dx} y={cy+dy} width={w} height={h} rx={3} fill="#cc1818" opacity="0.92"/>
        )}
        {yellowPepper.map(([dx,dy,w,h],i)=>
          <rect key={i} x={cx+dx} y={cy+dy} width={w} height={h} rx={3} fill="#d4c010" opacity="0.92"/>
        )}
        {mushrooms.map(([dx,dy],i)=>(
          <g key={i}>
            <ellipse cx={cx+dx} cy={cy+dy} rx={14} ry={9} fill="#7a4010"/>
            <ellipse cx={cx+dx} cy={cy+dy+3} rx={12} ry={5} fill="#5a2c08"/>
          </g>
        ))}
        {onions.map(([dx,dy],i)=>(
          <g key={i}>
            <ellipse cx={cx+dx} cy={cy+dy} rx={13} ry={9} fill="none" stroke="#d0b0e0" strokeWidth="3"/>
            <ellipse cx={cx+dx} cy={cy+dy} rx={8}  ry={5} fill="none" stroke="#d0b0e0" strokeWidth="1.5"/>
          </g>
        ))}
        <text x={cx} y={232} textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#ffffff99">Veggie Supreme</text>
      </svg>
    )
  }

  if (type === 'bbq') {
    const blobs: Blob[] = [[-16,-26,26,19],[22,-32,22,17],[-34,10,24,18],[22,22,26,20],[-14,34,20,15],[32,-6,18,13]]
    const chicken: Blob[] = [[0,0,18,14],[40,-25,16,12],[-40,10,17,12],[10,38,15,11],[-20,-42,16,12],[38,28,14,11],[-8,-10,12,9]]
    const onions: [number,number][] = [[-38,-30],[-10,44],[36,12]]
    return (
      <svg width="100%" height="240" viewBox="0 0 340 240">
        <PizzaBase sauce="#4a1e08"/>
        <Mozz blobs={blobs}/>
        {chicken.map(([dx,dy,rx,ry],i)=>(
          <g key={i}>
            <ellipse cx={cx+dx} cy={cy+dy} rx={rx} ry={ry} fill="#c8901a"/>
            <ellipse cx={cx+dx} cy={cy+dy} rx={rx-4} ry={ry-3} fill="#d8a030" opacity="0.65"/>
          </g>
        ))}
        {onions.map(([dx,dy],i)=>(
          <g key={i}>
            <ellipse cx={cx+dx} cy={cy+dy} rx={12} ry={8} fill="none" stroke="#ffffffaa" strokeWidth="2.5"/>
            <ellipse cx={cx+dx} cy={cy+dy} rx={7}  ry={4} fill="none" stroke="#ffffff88" strokeWidth="1.5"/>
          </g>
        ))}
        <text x={cx} y={232} textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#ffffff99">BBQ Chicken</text>
      </svg>
    )
  }

  if (type === 'hawaiian') {
    const blobs: Blob[] = [[-16,-26,28,20],[22,-34,22,18],[-36,8,24,18],[20,22,28,20],[-12,34,22,16],[32,-6,18,13]]
    const pineapple: [number,number,number,number][] = [[0,-46,18,14],[42,10,16,12],[-42,10,16,12],[12,40,14,12],[-20,-22,14,11],[30,-26,14,11]]
    const ham: [number,number,number,number][] = [[-28,10,20,12],[-10,-38,18,12],[34,-18,16,12],[28,32,18,12],[-38,-18,16,11]]
    return (
      <svg width="100%" height="240" viewBox="0 0 340 240">
        <PizzaBase sauce="#c82020"/>
        <Mozz blobs={blobs}/>
        {pineapple.map(([dx,dy,w,h],i)=>(
          <g key={i}>
            <rect x={cx+dx-w/2} y={cy+dy-h/2} width={w} height={h} rx={3} fill="#e0c010"/>
            <line x1={cx+dx-w/4} y1={cy+dy-h/2+2} x2={cx+dx-w/4} y2={cy+dy+h/2-2} stroke="#c0a000" strokeWidth="1"/>
            <line x1={cx+dx+w/4} y1={cy+dy-h/2+2} x2={cx+dx+w/4} y2={cy+dy+h/2-2} stroke="#c0a000" strokeWidth="1"/>
          </g>
        ))}
        {ham.map(([dx,dy,w,h],i)=>(
          <rect key={i} x={cx+dx-w/2} y={cy+dy-h/2} width={w} height={h} rx={4} fill="#e87090" opacity="0.92"/>
        ))}
        <text x={cx} y={232} textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#ffffff99">Hawaiian</text>
      </svg>
    )
  }

  if (type === 'mushroom') {
    const mushrooms: [number,number][] = [[0,-40],[38,-20],[52,14],[-52,14],[-38,-20],[20,40],[-20,40],[0,8],[30,-6],[-30,-6]]
    const garlic: [number,number][] = [[-28,24],[44,-32],[-44,-32],[16,-50],[-16,-50],[44,32]]
    return (
      <svg width="100%" height="240" viewBox="0 0 340 240">
        <PizzaBase sauce="#f0e8c0"/>
        {/* Cream cheese layer */}
        <circle cx={cx} cy={cy} r={88} fill="#f8f0c0" opacity="0.55"/>
        {mushrooms.map(([dx,dy],i)=>(
          <g key={i}>
            <ellipse cx={cx+dx} cy={cy+dy}   rx={15} ry={10} fill="#8b5a20"/>
            <ellipse cx={cx+dx-2} cy={cy+dy-2} rx={7}  ry={4}  fill="#a07030" opacity="0.65"/>
            <rect    x={cx+dx-3}  y={cy+dy+7}  width={6} height={8} rx={2} fill="#c8a060"/>
          </g>
        ))}
        {garlic.map(([dx,dy],i)=>(
          <g key={i}>
            <ellipse cx={cx+dx} cy={cy+dy} rx={8} ry={6} fill="#f8f0d8" opacity="0.92"/>
            <line x1={cx+dx} y1={cy+dy-4} x2={cx+dx} y2={cy+dy+4} stroke="#d8c880" strokeWidth="1.2"/>
          </g>
        ))}
        <text x={cx} y={232} textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#22222299">Mushroom &amp; Garlic</text>
      </svg>
    )
  }

  if (type === 'supreme') {
    const blobs: Blob[] = [[-16,-24,24,18],[20,-32,20,16],[-32,10,22,16],[20,20,24,18],[-12,32,20,14]]
    const pep: [number,number][] = [[-42,-14],[42,-14],[0,-48],[36,30],[-36,30]]
    const sausage: Blob[] = [[10,10,11,9],[-10,-14,12,9],[8,-36,10,8],[-38,22,10,8],[40,14,9,8]]
    const greenPep: [number,number,number,number][] = [[-28,-40,6,18],[46,0,6,18]]
    const olives: [number,number][] = [[-10,20],[28,-10],[-34,-14]]
    const onions: [number,number][] = [[20,42],[-20,-50]]
    return (
      <svg width="100%" height="240" viewBox="0 0 340 240">
        <PizzaBase sauce="#c02020"/>
        <Mozz blobs={blobs}/>
        {sausage.map(([dx,dy,rx,ry],i)=>(
          <ellipse key={i} cx={cx+dx} cy={cy+dy} rx={rx} ry={ry} fill="#7a3808"/>
        ))}
        {pep.map(([dx,dy],i)=>(
          <g key={i}>
            <circle cx={cx+dx} cy={cy+dy} r={13} fill="#8a0c0c"/>
            <circle cx={cx+dx} cy={cy+dy} r={9}  fill="#c01212"/>
          </g>
        ))}
        {greenPep.map(([dx,dy,w,h],i)=>(
          <rect key={i} x={cx+dx} y={cy+dy} width={w} height={h} rx={2} fill="#1a8a1a" opacity="0.92"/>
        ))}
        {olives.map(([dx,dy],i)=>(
          <g key={i}>
            <ellipse cx={cx+dx} cy={cy+dy} rx={9} ry={7} fill="#1a1a1a"/>
            <ellipse cx={cx+dx} cy={cy+dy} rx={5} ry={3} fill="#2a8a2a"/>
          </g>
        ))}
        {onions.map(([dx,dy],i)=>(
          <g key={i}>
            <ellipse cx={cx+dx} cy={cy+dy} rx={12} ry={8} fill="none" stroke="#d0c0e8" strokeWidth="2.5"/>
            <ellipse cx={cx+dx} cy={cy+dy} rx={7}  ry={4} fill="none" stroke="#d0c0e8" strokeWidth="1.5"/>
          </g>
        ))}
        <text x={cx} y={232} textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#ffffff99">Supreme</text>
      </svg>
    )
  }

  return (
    <svg width="100%" height="240" viewBox="0 0 340 240">
      <PizzaBase sauce="#cc2020"/>
    </svg>
  )
}

// ── rounds ─────────────────────────────────────────────────────────────────
interface Round {
  type:      string
  label:     string
  hint:      string
  required:  string[][]
  forbidden: string[]
  time:      number
}

const ROUNDS: Round[] = [
  {
    type:     'margherita',
    label:    'Classic Margherita',
    hint:     'I can see: tomato sauce, melted mozzarella, fresh basil leaves',
    required: [['cheese','cheesy','mozzarella'],['tomato','tomato sauce','marinara'],['basil']],
    forbidden:[],
    time: 65,
  },
  {
    type:     'pepperoni',
    label:    'Pepperoni',
    hint:     'I can see: pepperoni slices, golden cheese, tomato sauce',
    required: [['pepperoni'],['cheese','mozzarella'],['tomato','sauce']],
    forbidden:[],
    time: 60,
  },
  {
    type:     'veggie',
    label:    'Veggie Supreme',
    hint:     'I can see: green, red, yellow bell peppers, mushrooms, onion — no meat',
    required: [['vegetable','veggie','vegetarian','bell pepper','pepper'],['mushroom'],['onion']],
    forbidden:['meat','pepperoni','chicken','sausage'],
    time: 60,
  },
  {
    type:     'bbq',
    label:    'BBQ Chicken',
    hint:     'I can see: dark brown BBQ sauce, golden chicken pieces, onion rings',
    required: [['chicken'],['bbq','barbecue','barbeque'],['onion']],
    forbidden:['tomato sauce','marinara','red sauce'],
    time: 55,
  },
  {
    type:     'hawaiian',
    label:    'Hawaiian',
    hint:     'I can see: pineapple chunks, pink ham slices, cheese, tomato sauce',
    required: [['pineapple'],['ham'],['cheese','mozzarella']],
    forbidden:[],
    time: 55,
  },
  {
    type:     'mushroom',
    label:    'Mushroom & Garlic',
    hint:     'I can see: cream/white sauce, lots of mushrooms, garlic pieces',
    required: [['mushroom'],['garlic'],['cream','white sauce','cream sauce']],
    forbidden:[],
    time: 50,
  },
  {
    type:     'supreme',
    label:    'Supreme',
    hint:     'I can see: pepperoni, sausage crumbles, green olives, green pepper, onion',
    required: [['pepperoni'],['sausage'],['olive'],['pepper','green pepper','bell pepper'],['onion']],
    forbidden:[],
    time: 45,
  },
]

const ROUNDS_PT: Round[] = [
  {
    type:     'margherita',
    label:    'Margherita Clássica',
    hint:     'Vejo: molho de tomate, mussarela derretida, folhas de manjericão fresco',
    required: [['queijo','mussarela'],['tomate','molho de tomate'],['manjericão']],
    forbidden:[],
    time: 65,
  },
  {
    type:     'pepperoni',
    label:    'Pepperoni',
    hint:     'Vejo: fatias de pepperoni, queijo dourado, molho de tomate',
    required: [['pepperoni'],['queijo','mussarela'],['tomate','molho']],
    forbidden:[],
    time: 60,
  },
  {
    type:     'veggie',
    label:    'Supremo Vegetariano',
    hint:     'Vejo: pimentões verdes, vermelhos e amarelos, cogumelos, cebola — sem carne',
    required: [['vegetariano','vegano','pimentão','legume','verdura'],['cogumelo'],['cebola']],
    forbidden:['carne','pepperoni','frango','linguiça'],
    time: 60,
  },
  {
    type:     'bbq',
    label:    'Frango BBQ',
    hint:     'Vejo: molho BBQ escuro, pedaços de frango dourados, anéis de cebola',
    required: [['frango'],['bbq','churrasco'],['cebola']],
    forbidden:['molho de tomate','marinara'],
    time: 55,
  },
  {
    type:     'hawaiian',
    label:    'Havaiana',
    hint:     'Vejo: pedaços de abacaxi, fatias de presunto rosado, queijo, molho de tomate',
    required: [['abacaxi'],['presunto'],['queijo','mussarela']],
    forbidden:[],
    time: 55,
  },
  {
    type:     'mushroom',
    label:    'Cogumelo e Alho',
    hint:     'Vejo: molho branco cremoso, muitos cogumelos, pedaços de alho',
    required: [['cogumelo'],['alho'],['creme','molho branco','nata']],
    forbidden:[],
    time: 50,
  },
  {
    type:     'supreme',
    label:    'Suprema',
    hint:     'Vejo: pepperoni, linguiça, azeitonas verdes, pimentão verde, cebola',
    required: [['pepperoni'],['linguiça','salsicha'],['azeitona'],['pimentão'],['cebola']],
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

// ── pizza face SVG (title / result / gameover) ─────────────────────────────
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
  const [isPT,     setIsPT]     = useState(false)

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const rounds = isPT ? ROUNDS_PT : ROUNDS
  const round  = rounds[idx]

  useEffect(() => { setIsPT(localStorage.getItem('pai_lang') === 'pt') }, [])

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
    if (idx + 1 >= rounds.length) { setScreen('gameover') }
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
      <button onClick={() => router.back()} style={S.backBtn}>{isPT ? '← voltar' : '← back'}</button>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20 }}>
        <PizzaSVG mood="happy" />
        <h1 style={{ ...S.neon(PINK), fontSize:44, letterSpacing:4, textAlign:'center', margin:0 }}>
          {isPT ? <>PIZZA<br />COM<br />PROMPT</> : <>PROMPT<br />PIZZA</>}
        </h1>
        <p style={{ color:'#aaa', fontFamily:'monospace', fontSize:13, textAlign:'center', maxWidth:280, lineHeight:1.6, margin:0 }}>
          {isPT
            ? <>Veja a ilustração da pizza.<br />Escreva o prompt de IA que a criou.<br />Descreva cada ingrediente que vê!</>
            : <>Look at the pizza illustration.<br />Write the AI prompt that made it.<br />Describe every topping you see!</>}
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:8, width:260 }}>
          {(isPT
            ? [['Descreva','Nomeie cada ingrediente que você vê'],['Seja específico','Quanto mais detalhe, melhor'],['Velocidade','Respostas rápidas ganham pontos bônus']]
            : [['Describe','Name every topping and ingredient you see'],['Be specific','The more detail in your prompt, the better'],['Speed','Faster answers earn more bonus points']]
          ).map(([t,d]) => (
            <div key={t} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
              <span style={{ color:GREEN, fontFamily:'monospace', fontSize:12, flexShrink:0 }}>▸</span>
              <span style={{ color:'#ccc', fontFamily:'monospace', fontSize:12 }}>
                <b style={{color:GREEN}}>{t}:</b> {d}
              </span>
            </div>
          ))}
        </div>
        <button style={S.bigBtn(PINK)} onClick={() => setScreen('play')}>{isPT ? 'COMEÇAR →' : 'START →'}</button>
      </div>
    </div>
  )

  // ── result ─────────────────────────────────────────────────────────────────
  if (screen === 'result' && result) return (
    <div style={S.root}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16, width:'100%', maxWidth:460 }}>
        <PizzaSVG mood={result.ok ? 'happy' : 'sad'} />
        <div style={{ ...S.neon(result.ok ? GREEN : PINK), fontSize:26, letterSpacing:3 }}>
          {result.ok
            ? (isPT ? '✓ ÓTIMO PROMPT!' : '✓ GREAT PROMPT!')
            : (isPT ? '✗ DETALHES FALTANDO' : '✗ MISSING DETAILS')}
        </div>
        {!result.ok && (
          <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:8 }}>
            {result.missing.length > 0 && (
              <div style={S.feedbackBox(PINK)}>
                <span style={{ color:PINK, fontFamily:'monospace', fontSize:11 }}>{isPT ? 'DEVERIA TER MENCIONADO' : 'SHOULD HAVE MENTIONED'}</span>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:4 }}>
                  {result.missing.map(m => <Tag key={m} label={m} color={PINK} />)}
                </div>
              </div>
            )}
            {result.violated.length > 0 && (
              <div style={S.feedbackBox('#ff8800')}>
                <span style={{ color:'#ff8800', fontFamily:'monospace', fontSize:11 }}>{isPT ? 'ESSA PIZZA NÃO TEM' : "THAT PIZZA DOESN'T HAVE"}</span>
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
          {idx + 1 >= rounds.length
            ? (isPT ? 'VER PONTUAÇÃO →' : 'SEE SCORE →')
            : (isPT ? 'PRÓXIMA PIZZA →' : 'NEXT PIZZA →')}
        </button>
      </div>
    </div>
  )

  // ── game over ──────────────────────────────────────────────────────────────
  if (screen === 'gameover') {
    const max = rounds.length * 200 + rounds.reduce((a,r) => a+r.time*3, 0)
    const pct = Math.round((score / max) * 100)
    const grade = pct>=90?'S':pct>=75?'A':pct>=55?'B':pct>=35?'C':'D'
    const gc    = pct>=75?GREEN:pct>=55?'#ffdd00':PINK
    return (
      <div style={S.root}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20 }}>
          <PizzaSVG mood="happy" />
          <div style={{ ...S.neon(GREEN), fontSize:28, letterSpacing:4 }}>{isPT ? 'RESTAURANTE FECHADO' : 'RESTAURANT CLOSED'}</div>
          <div style={{ ...S.neon(gc), fontSize:72, letterSpacing:8 }}>{grade}</div>
          <div style={{ color:GREEN, fontFamily:'monospace', fontSize:24, letterSpacing:2 }}>{score} pts</div>
          <div style={{ color:'#555', fontFamily:'monospace', fontSize:11 }}>{rounds.length} {isPT ? 'pizzas · máx' : 'pizzas · max'} {max} pts</div>
          <button style={S.bigBtn(PINK)} onClick={restart}>{isPT ? 'JOGAR DE NOVO →' : 'PLAY AGAIN →'}</button>
          <button onClick={() => router.back()} style={{ background:'none', border:'none', color:'#444', fontFamily:'monospace', fontSize:12, cursor:'pointer' }}>
            {isPT ? '← voltar' : '← back'}
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
          {isPT ? 'PIZZA' : 'PIZZA'} {idx+1} / {rounds.length}
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

        {/* Pizza illustration */}
        <div style={{ position:'relative', borderRadius:8, overflow:'hidden', border:`1px solid #222` }}>
          <PizzaIllustration type={round.type} />
        </div>

        {/* Instruction */}
        <div style={{ color:'#555', fontFamily:'monospace', fontSize:11, textAlign:'center', letterSpacing:1 }}>
          {isPT ? 'ESCREVA O PROMPT DE IA QUE CRIOU ESSA PIZZA ↓' : 'WRITE THE AI PROMPT THAT MADE THIS PIZZA ↓'}
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
              placeholder={isPT ? 'Descreva a pizza que você vê... (Enter para enviar)' : 'Describe the pizza you see... (Enter to submit)'}
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
          {isPT ? 'ENVIAR PROMPT →' : 'SUBMIT PROMPT →'}
        </button>

        <div style={{ textAlign:'center', color:timerColor, fontFamily:'monospace', fontSize:11,
          textShadow:`0 0 6px ${timerColor}`, letterSpacing:2 }}>
          {isPT ? `${timeLeft}s restantes` : `${timeLeft}s remaining`}
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
