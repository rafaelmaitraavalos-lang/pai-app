'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// ── palette ─────────────────────────────────────────────────────────────────
const COLORS = [
  '#ff4466','#ff8c00','#ffdd00','#44ff88',
  '#00ccff','#8844ff','#ff44cc','#cccccc',
]

// ── robot config ─────────────────────────────────────────────────────────────
type HeadStyle = 'round' | 'square' | 'antenna'
type LegStyle  = 'basic' | 'wheels' | 'rockets'
type Extra     = 'none'  | 'rockets' | 'propeller' | 'magnet'
type Phase     = 'build' | 'paint' | 'choose' | 'game'
type MiniGame  = 'rocket' | 'stars' | 'race'

interface Cfg {
  head:  HeadStyle
  legs:  LegStyle
  extra: Extra
  color: string
  eye:   string
}
const DEFAULT: Cfg = { head:'round', legs:'basic', extra:'none', color:'#00ccff', eye:'#ffdd00' }

// ── Robot SVG ────────────────────────────────────────────────────────────────
function Robot({ cfg, size=140, mood='idle', flame=false }:
  { cfg:Cfg; size?:number; mood?:'idle'|'happy'|'oops'; flame?:boolean }) {
  const { color, eye } = cfg
  const mouth =
    mood==='happy' ? <path d="M 85 80 Q 100 94 115 80" stroke={eye} strokeWidth="4" fill="none" strokeLinecap="round"/> :
    mood==='oops'  ? <ellipse cx="100" cy="82" rx="10" ry="7" fill="#333"/> :
                     <rect x="84" y="79" width="32" height="5" rx="2" fill={eye} opacity="0.7"/>

  return (
    <svg width={size} height={size*1.3} viewBox="0 0 200 260" style={{overflow:'visible'}}>

      {/* ── rocket leg flames ── */}
      {flame && cfg.legs==='rockets' && <>
        <ellipse cx="74" cy="232" rx="9" ry="20" fill="#ff8800" opacity="0.85">
          <animate attributeName="ry" values="20;12;20" dur="0.25s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="74" cy="232" rx="5" ry="11" fill="#ffe000" opacity="0.9">
          <animate attributeName="ry" values="11;6;11" dur="0.25s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="126" cy="232" rx="9" ry="20" fill="#ff8800" opacity="0.85">
          <animate attributeName="ry" values="20;12;20" dur="0.25s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="126" cy="232" rx="5" ry="11" fill="#ffe000" opacity="0.9">
          <animate attributeName="ry" values="11;6;11" dur="0.25s" repeatCount="indefinite"/>
        </ellipse>
      </>}
      {flame && cfg.extra==='rockets' && <>
        <ellipse cx="22" cy="140" rx="7" ry="16" fill="#ff8800" opacity="0.85">
          <animate attributeName="rx" values="7;4;7" dur="0.2s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="178" cy="140" rx="7" ry="16" fill="#ff8800" opacity="0.85">
          <animate attributeName="rx" values="7;4;7" dur="0.2s" repeatCount="indefinite"/>
        </ellipse>
      </>}

      {/* ── legs ── */}
      {cfg.legs==='basic' && <>
        <rect x="68" y="180" width="22" height="38" rx="5" fill={color}/>
        <rect x="110" y="180" width="22" height="38" rx="5" fill={color}/>
        <rect x="58" y="212" width="38" height="10" rx="4" fill={eye}/>
        <rect x="104" y="212" width="38" height="10" rx="4" fill={eye}/>
      </>}
      {cfg.legs==='wheels' && <>
        <rect x="68" y="180" width="22" height="22" rx="4" fill={color}/>
        <rect x="110" y="180" width="22" height="22" rx="4" fill={color}/>
        <circle cx="79"  cy="213" r="18" fill="#222"/><circle cx="79"  cy="213" r="9" fill="#444"/><circle cx="79"  cy="213" r="5" fill={eye}/>
        <circle cx="121" cy="213" r="18" fill="#222"/><circle cx="121" cy="213" r="9" fill="#444"/><circle cx="121" cy="213" r="5" fill={eye}/>
      </>}
      {cfg.legs==='rockets' && <>
        <rect x="64" y="172" width="30" height="14" rx="4" fill={color}/>
        <rect x="106" y="172" width="30" height="14" rx="4" fill={color}/>
        <ellipse cx="79"  cy="200" rx="16" ry="24" fill={color}/>
        <ellipse cx="121" cy="200" rx="16" ry="24" fill={color}/>
        <polygon points="79,176 65,190 93,190" fill="#ff4400"/>
        <polygon points="121,176 107,190 135,190" fill="#ff4400"/>
      </>}

      {/* ── body ── */}
      <rect x="48" y="98" width="104" height="84" rx="14" fill={color}/>
      <rect x="60" y="112" width="80" height="54" rx="8" fill="rgba(0,0,0,0.18)"/>
      {/* lights */}
      <circle cx="80"  cy="139" r="10" fill={eye} opacity="0.9"/>
      <circle cx="100" cy="139" r="10" fill={eye} opacity="0.9"/>
      <circle cx="120" cy="139" r="10" fill={eye} opacity="0.9"/>
      <rect x="60" y="112" width="80" height="8" rx="3" fill={eye} opacity="0.55"/>

      {/* ── side rockets (extra) ── */}
      {cfg.extra==='rockets' && <>
        <ellipse cx="22" cy="120" rx="12" ry="28" fill={eye}/>
        <polygon points="22,92 10,110 34,110" fill="#ff4400"/>
        <ellipse cx="178" cy="120" rx="12" ry="28" fill={eye}/>
        <polygon points="178,92 166,110 190,110" fill="#ff4400"/>
      </>}

      {/* ── arms ── */}
      <rect x="18" y="104" width="30" height="56" rx="12" fill={color}/>
      <rect x="152" y="104" width="30" height="56" rx="12" fill={color}/>
      {cfg.extra==='magnet' ? <>
        <path d="M 22,162 Q 22,182 33,182 Q 44,182 44,162" stroke={eye} strokeWidth="8" fill="none" strokeLinecap="round"/>
        <circle cx="168" cy="164" r="14" fill={eye}/>
      </> : <>
        <circle cx="33"  cy="164" r="14" fill={eye}/>
        <circle cx="167" cy="164" r="14" fill={eye}/>
      </>}

      {/* ── head ── */}
      {cfg.head==='round'   && <circle cx="100" cy="62" r="42" fill={color}/>}
      {cfg.head==='square'  && <rect x="58" y="20" width="84" height="84" rx="16" fill={color}/>}
      {cfg.head==='antenna' && <>
        <circle cx="100" cy="62" r="42" fill={color}/>
        <line x1="100" y1="20" x2="100" y2="4" stroke={eye} strokeWidth="5" strokeLinecap="round"/>
        <circle cx="100" cy="3" r="8" fill={eye}/>
      </>}

      {/* ── propeller (extra) ── */}
      {cfg.extra==='propeller' && <>
        <rect x="56" y="18" width="88" height="9" rx="4" fill={eye}>
          <animateTransform attributeName="transform" type="rotate" from="0 100 22" to="360 100 22" dur="0.4s" repeatCount="indefinite"/>
        </rect>
        <circle cx="100" cy="22" r="8" fill={color}/>
      </>}

      {/* ── eyes ── */}
      <circle cx="84"  cy="58" r="14" fill={eye}/>
      <circle cx="116" cy="58" r="14" fill={eye}/>
      <circle cx="84"  cy="58" r="7" fill="white"/>
      <circle cx="116" cy="58" r="7" fill="white"/>
      <circle cx="87"  cy="55" r="4" fill="#111"/>
      <circle cx="119" cy="55" r="4" fill="#111"/>
      <circle cx="89"  cy="53" r="2" fill="white" opacity="0.9"/>
      <circle cx="121" cy="53" r="2" fill="white" opacity="0.9"/>

      {/* ── mouth ── */}
      {mouth}
    </svg>
  )
}

// ── BUILD PHASE ───────────────────────────────────────────────────────────────
function BuildPhase({ cfg, setCfg, next }: { cfg:Cfg; setCfg:(c:Cfg)=>void; next:()=>void }) {
  const set = (k: keyof Cfg) => (v: string) => setCfg({ ...cfg, [k]: v as never })
  const Section = ({ label, children }: { label:string; children:React.ReactNode }) => (
    <div style={{ marginBottom:20 }}>
      <div style={{ fontFamily:'monospace', fontSize:11, color:'#888', letterSpacing:2, marginBottom:8, textTransform:'uppercase' }}>{label}</div>
      <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>{children}</div>
    </div>
  )
  const Chip = ({ val, cur, setVal, label, sub }: { val:string; cur:string; setVal:(v:string)=>void; label:string; sub:string }) => (
    <button onClick={() => setVal(val)} style={{
      padding:'10px 16px', borderRadius:8, cursor:'pointer', textAlign:'left',
      background: cur===val ? cfg.color : '#111',
      border: `2px solid ${cur===val ? cfg.color : '#333'}`,
      color: cur===val ? '#000' : '#aaa',
      fontFamily:'monospace', transition:'all 0.15s',
    }}>
      <div style={{ fontWeight:900, fontSize:13 }}>{label}</div>
      <div style={{ fontSize:10, opacity:0.7, marginTop:2 }}>{sub}</div>
    </button>
  )
  return (
    <div style={S.page}>
      <h1 style={{ ...S.title(cfg.color), fontSize:32, margin:'0 0 4px' }}>BUILD YOUR ROBOT</h1>
      <p style={{ color:'#555', fontFamily:'monospace', fontSize:11, margin:'0 0 24px' }}>Pick parts, then paint it!</p>
      <div style={{ display:'flex', gap:24, width:'100%', maxWidth:560, flexWrap:'wrap', justifyContent:'center' }}>
        <div style={{ flex:1, minWidth:200 }}>
          <Section label="Head">
            <Chip val="round"   cur={cfg.head} setVal={set('head')} label="🔵 Round"   sub="Friendly & classic"/>
            <Chip val="square"  cur={cfg.head} setVal={set('head')} label="🟦 Square"  sub="Tough & sturdy"/>
            <Chip val="antenna" cur={cfg.head} setVal={set('head')} label="📡 Antenna" sub="Super smart"/>
          </Section>
          <Section label="Legs">
            <Chip val="basic"   cur={cfg.legs} setVal={set('legs')} label="🦿 Basic"   sub="Walk anywhere"/>
            <Chip val="wheels"  cur={cfg.legs} setVal={set('legs')} label="🛞 Wheels"  sub="Unlock Speed Race!"/>
            <Chip val="rockets" cur={cfg.legs} setVal={set('legs')} label="🚀 Rockets" sub="Unlock Rocket Fly!"/>
          </Section>
          <Section label="Extra">
            <Chip val="none"      cur={cfg.extra} setVal={set('extra')} label="✗ None"       sub="Keep it simple"/>
            <Chip val="rockets"   cur={cfg.extra} setVal={set('extra')} label="🚀 Boosters"  sub="Fly even higher!"/>
            <Chip val="propeller" cur={cfg.extra} setVal={set('extra')} label="🌀 Propeller" sub="Hover in style"/>
            <Chip val="magnet"    cur={cfg.extra} setVal={set('extra')} label="🧲 Magnet"    sub="Pull in stars!"/>
          </Section>
        </div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16, paddingTop:12 }}>
          <Robot cfg={cfg} size={130} mood="happy"/>
          <button style={S.btn(cfg.color)} onClick={next}>PAINT IT →</button>
        </div>
      </div>
    </div>
  )
}

// ── PAINT PHASE ───────────────────────────────────────────────────────────────
function PaintPhase({ cfg, setCfg, next, back }: { cfg:Cfg; setCfg:(c:Cfg)=>void; next:()=>void; back:()=>void }) {
  return (
    <div style={S.page}>
      <h1 style={{ ...S.title(cfg.color), fontSize:32, margin:'0 0 4px' }}>PAINT YOUR ROBOT</h1>
      <p style={{ color:'#555', fontFamily:'monospace', fontSize:11, margin:'0 0 24px' }}>Choose your colors!</p>
      <div style={{ display:'flex', gap:32, flexWrap:'wrap', justifyContent:'center', alignItems:'flex-start' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
          {/* Body color */}
          <div>
            <div style={{ fontFamily:'monospace', fontSize:11, color:'#888', letterSpacing:2, marginBottom:10, textTransform:'uppercase' }}>Body Color</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
              {COLORS.map(c => (
                <button key={c} onClick={() => setCfg({ ...cfg, color:c })} style={{
                  width:44, height:44, borderRadius:8, background:c, cursor:'pointer',
                  border:`3px solid ${cfg.color===c ? '#fff' : 'transparent'}`,
                  boxShadow: cfg.color===c ? `0 0 12px ${c}` : 'none',
                  transition:'all 0.15s',
                }}/>
              ))}
            </div>
          </div>
          {/* Eye / accent color */}
          <div>
            <div style={{ fontFamily:'monospace', fontSize:11, color:'#888', letterSpacing:2, marginBottom:10, textTransform:'uppercase' }}>Eye & Detail Color</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
              {COLORS.map(c => (
                <button key={c} onClick={() => setCfg({ ...cfg, eye:c })} style={{
                  width:44, height:44, borderRadius:8, background:c, cursor:'pointer',
                  border:`3px solid ${cfg.eye===c ? '#fff' : 'transparent'}`,
                  boxShadow: cfg.eye===c ? `0 0 12px ${c}` : 'none',
                  transition:'all 0.15s',
                }}/>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button style={S.outlineBtn} onClick={back}>← back</button>
            <button style={S.btn(cfg.color)} onClick={next}>LET'S PLAY →</button>
          </div>
        </div>
        <Robot cfg={cfg} size={160} mood="happy"/>
      </div>
    </div>
  )
}

// ── CHOOSE GAME PHASE ─────────────────────────────────────────────────────────
function ChoosePhase({ cfg, play, back }: { cfg:Cfg; play:(g:MiniGame)=>void; back:()=>void }) {
  const canRocket = cfg.legs==='rockets' || cfg.extra==='rockets'
  const canRace   = cfg.legs==='wheels'
  return (
    <div style={S.page}>
      <Robot cfg={cfg} size={120} mood="happy"/>
      <h2 style={{ ...S.title(cfg.color), fontSize:26, margin:'12px 0 4px' }}>PICK A GAME!</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:12, width:'100%', maxWidth:340, marginTop:16 }}>
        {canRocket && (
          <GameCard
            emoji="🚀" name="Rocket Fly" color={cfg.color}
            desc="Tap BOOST to fly in short bursts! Dodge asteroids, collect stars."
            onClick={() => play('rocket')}
          />
        )}
        <GameCard
          emoji="⭐" name="Star Catch" color={cfg.eye}
          desc="Move left and right to catch falling stars before they hit the ground!"
          onClick={() => play('stars')}
        />
        {canRace && (
          <GameCard
            emoji="🏁" name="Speed Race" color={cfg.color}
            desc="You're rolling fast! Tap JUMP to leap over incoming walls."
            onClick={() => play('race')}
          />
        )}
        {!canRocket && !canRace && (
          <p style={{ color:'#444', fontFamily:'monospace', fontSize:11, textAlign:'center' }}>
            Tip: add Rocket Legs or Wheels to unlock more games!
          </p>
        )}
      </div>
      <button style={{ ...S.outlineBtn, marginTop:20 }} onClick={back}>← rebuild</button>
    </div>
  )
}

function GameCard({ emoji, name, color, desc, onClick }:
  { emoji:string; name:string; color:string; desc:string; onClick:()=>void }) {
  return (
    <button onClick={onClick} style={{
      background:'#0d0d0d', border:`2px solid ${color}44`, borderRadius:10,
      padding:'14px 16px', cursor:'pointer', textAlign:'left', transition:'border 0.15s',
    }}
    onMouseEnter={e => (e.currentTarget.style.borderColor=color)}
    onMouseLeave={e => (e.currentTarget.style.borderColor=`${color}44`)}
    >
      <div style={{ fontFamily:'monospace', fontWeight:900, fontSize:15, color, marginBottom:4 }}>
        {emoji} {name}
      </div>
      <div style={{ fontFamily:'monospace', fontSize:11, color:'#666', lineHeight:1.5 }}>{desc}</div>
    </button>
  )
}

// ── ROCKET FLY GAME ───────────────────────────────────────────────────────────
interface Obj { id:number; x:number; y:number; w:number; h:number }

function RocketFly({ cfg, onDone }: { cfg:Cfg; onDone:(score:number)=>void }) {
  const W=320, H=380
  const [robotY,  setRobotY]  = useState(50)   // % from bottom
  const [vy,      setVy]      = useState(0)
  const [fuel,    setFuel]    = useState(100)
  const [stars,   setStars]   = useState<Obj[]>([])
  const [rocks,   setRocks]   = useState<Obj[]>([])
  const [score,   setScore]   = useState(0)
  const [lives,   setLives]   = useState(3)
  const [time,    setTime]    = useState(35)
  const [over,    setOver]    = useState(false)
  const [boosting,setBoosting]= useState(false)
  const nextId = useRef(0)
  const stateRef = useRef({ robotY:50, vy:0, fuel:100, stars:[] as Obj[], rocks:[] as Obj[], score:0, lives:3, over:false, boosting:false })

  // sync state into ref so interval callbacks can read latest
  useEffect(() => { stateRef.current = { robotY, vy, fuel, stars, rocks, score, lives, over, boosting } }, [robotY, vy, fuel, stars, rocks, score, lives, over, boosting])

  // game loop
  useEffect(() => {
    if (over) return
    const loop = setInterval(() => {
      const s = stateRef.current
      if (s.over) return

      // physics
      const gravity = 1.2
      const boostF  = -3.5
      const newVy   = s.boosting && s.fuel > 0 ? s.vy + boostF : s.vy + gravity
      const clamped = Math.max(-8, Math.min(6, newVy))
      const newY    = Math.max(2, Math.min(88, s.robotY - clamped * 0.6))

      // fuel
      const newFuel = s.boosting && s.fuel > 0
        ? Math.max(0, s.fuel - 2.5)
        : Math.min(100, s.fuel + 1)

      // move stars & rocks left
      const spd = 1.4
      const newStars = s.stars
        .map(o => ({ ...o, x: o.x - spd }))
        .filter(o => o.x > -5)
      const newRocks = s.rocks
        .map(o => ({ ...o, x: o.x - spd * 1.1 }))
        .filter(o => o.x > -8)

      // spawn
      if (Math.random() < 0.025) {
        newStars.push({ id: nextId.current++, x:105, y: 10 + Math.random()*75, w:3, h:3 })
      }
      if (Math.random() < 0.018) {
        const h = 8 + Math.random() * 16
        newRocks.push({ id: nextId.current++, x:105, y: 5 + Math.random()*80, w:8, h })
      }

      // collect stars (robot at ~x=18%, w=10%)
      const rLeft=12, rRight=28, rTop=newY-8, rBottom=newY+8
      let pts = 0
      const remaining = newStars.filter(o => {
        const hit = o.x>rLeft && o.x<rRight && o.y>rTop && o.y<rBottom
        if (hit) pts++
        return !hit
      })

      // hit rocks
      let newLives = s.lives
      const safeRocks = newRocks.filter(o => {
        const hit = o.x<rRight && o.x+o.w>rLeft && o.y<rBottom && o.y+o.h>rTop
        if (hit) newLives = Math.max(0, newLives - 1)
        return !hit
      })

      const died = newLives <= 0 || newY <= 2 || newY >= 88
      setRobotY(newY); setVy(clamped); setFuel(newFuel)
      setStars(remaining); setRocks(safeRocks)
      setScore(p => p + pts)
      setLives(newLives)
      if (died) { setOver(true); onDone(s.score + pts) }
    }, 50)
    return () => clearInterval(loop)
  }, [over, onDone])

  // countdown
  useEffect(() => {
    if (over) return
    const t = setInterval(() => {
      setTime(p => {
        if (p <= 1) { setOver(true); onDone(stateRef.current.score); return 0 }
        return p - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [over, onDone])

  const boost = useCallback(() => setBoosting(true), [])
  const stopBoost = useCallback(() => setBoosting(false), [])

  useEffect(() => {
    const kd = (e: KeyboardEvent) => { if (e.code==='Space'||e.code==='ArrowUp') { e.preventDefault(); setBoosting(true) } }
    const ku = (e: KeyboardEvent) => { if (e.code==='Space'||e.code==='ArrowUp') setBoosting(false) }
    window.addEventListener('keydown', kd)
    window.addEventListener('keyup', ku)
    return () => { window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku) }
  }, [])

  const fuelColor = fuel > 50 ? '#44ff88' : fuel > 20 ? '#ffdd00' : '#ff4466'

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
      {/* HUD */}
      <div style={{ width:W, display:'flex', justifyContent:'space-between', alignItems:'center', fontFamily:'monospace', fontSize:12 }}>
        <span style={{ color:'#ffdd00' }}>{'❤️'.repeat(lives)}{'🖤'.repeat(3-lives)}</span>
        <span style={{ color:'#44ff88', letterSpacing:1 }}>⭐ {score}</span>
        <span style={{ color: time<=10 ? '#ff4466' : '#888' }}>⏱ {time}s</span>
      </div>
      {/* Fuel bar */}
      <div style={{ width:W, height:5, background:'#111', borderRadius:3, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${fuel}%`, background:fuelColor, borderRadius:3, transition:'width 0.05s, background 0.3s', boxShadow:`0 0 6px ${fuelColor}` }}/>
      </div>
      {/* Game area */}
      <div style={{ position:'relative', width:W, height:H, background:'#050510', border:'1px solid #1a1a3a', borderRadius:8, overflow:'hidden' }}>
        {/* Stars bg */}
        {[...Array(20)].map((_,i) => (
          <div key={i} style={{ position:'absolute', left:`${(i*47)%100}%`, top:`${(i*31)%100}%`, width:2, height:2, background:'#ffffff22', borderRadius:'50%' }}/>
        ))}
        {/* Robot */}
        <div style={{ position:'absolute', left:'15%', bottom:`${robotY}%`, transform:'translateY(50%)', transition:'bottom 0.05s' }}>
          <Robot cfg={cfg} size={55} mood="idle" flame={boosting && fuel>0}/>
        </div>
        {/* Stars */}
        {stars.map(o => (
          <div key={o.id} style={{ position:'absolute', left:`${o.x}%`, top:`${o.y}%`, fontSize:18, userSelect:'none', pointerEvents:'none' }}>⭐</div>
        ))}
        {/* Asteroids */}
        {rocks.map(o => (
          <div key={o.id} style={{ position:'absolute', left:`${o.x}%`, top:`${o.y}%`, fontSize:22, userSelect:'none', pointerEvents:'none' }}>☄️</div>
        ))}
      </div>
      {/* Controls */}
      <button
        onPointerDown={boost} onPointerUp={stopBoost} onPointerLeave={stopBoost}
        style={{ ...S.btn(cfg.color), width:W, fontSize:18, padding:'16px 0', userSelect:'none', opacity: fuel>0?1:0.4 }}
      >
        🚀 BOOST {fuel <= 0 ? '(recharging…)' : ''}
      </button>
      <div style={{ color:'#333', fontFamily:'monospace', fontSize:10 }}>Hold BOOST or hold SPACE / ↑</div>
    </div>
  )
}

// ── STAR CATCH GAME ───────────────────────────────────────────────────────────
function StarCatch({ cfg, onDone }: { cfg:Cfg; onDone:(score:number)=>void }) {
  const W=320, H=380
  const [robotX,  setRobotX]  = useState(50)   // % from left
  const [stars,   setStars]   = useState<Obj[]>([])
  const [score,   setScore]   = useState(0)
  const [time,    setTime]    = useState(35)
  const [over,    setOver]    = useState(false)
  const nextId   = useRef(0)
  const robotRef = useRef(50)
  const stateRef = useRef({ robotX:50, stars:[] as Obj[], score:0, over:false })

  useEffect(() => { stateRef.current = { robotX, stars, score, over } }, [robotX, stars, score, over])

  const hasMagnet = cfg.extra==='magnet'
  const catchRadius = hasMagnet ? 22 : 12

  useEffect(() => {
    if (over) return
    const loop = setInterval(() => {
      const s = stateRef.current
      if (s.over) return
      const spd = 1.2
      const newStars = s.stars
        .map(o => ({ ...o, y: o.y + spd }))
        .filter(o => o.y < 95)
      if (Math.random() < 0.04) {
        newStars.push({ id: nextId.current++, x: 5 + Math.random()*90, y: 0, w:3, h:3 })
      }
      // catch check — robot spans ~12% wide
      const rl = robotRef.current - catchRadius
      const rr = robotRef.current + catchRadius
      let pts = 0
      const remaining = newStars.filter(o => {
        const hit = o.x>=rl && o.x<=rr && o.y>=78
        if (hit) pts++
        return !hit
      })
      setStars(remaining)
      if (pts > 0) setScore(p => p + pts)
    }, 50)
    return () => clearInterval(loop)
  }, [over, hasMagnet])

  useEffect(() => {
    if (over) return
    const t = setInterval(() => setTime(p => {
      if (p <= 1) { setOver(true); onDone(stateRef.current.score); return 0 }
      return p - 1
    }), 1000)
    return () => clearInterval(t)
  }, [over, onDone])

  const moveLeft  = useCallback(() => { setRobotX(x => { const n=Math.max(8,x-8); robotRef.current=n; return n }) }, [])
  const moveRight = useCallback(() => { setRobotX(x => { const n=Math.min(92,x+8); robotRef.current=n; return n }) }, [])

  useEffect(() => {
    const kd = (e:KeyboardEvent) => {
      if (e.code==='ArrowLeft')  { e.preventDefault(); moveLeft() }
      if (e.code==='ArrowRight') { e.preventDefault(); moveRight() }
    }
    window.addEventListener('keydown', kd)
    return () => window.removeEventListener('keydown', kd)
  }, [moveLeft, moveRight])

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
      <div style={{ width:W, display:'flex', justifyContent:'space-between', fontFamily:'monospace', fontSize:12 }}>
        <span style={{ color:'#44ff88', letterSpacing:1 }}>⭐ {score}</span>
        <span style={{ color: time<=10 ? '#ff4466':'#888' }}>⏱ {time}s</span>
      </div>
      <div style={{ position:'relative', width:W, height:H, background:'#000a0a', border:'1px solid #0a2a1a', borderRadius:8, overflow:'hidden' }}>
        {/* Stars falling */}
        {stars.map(o => (
          <div key={o.id} style={{ position:'absolute', left:`${o.x}%`, top:`${o.y}%`, fontSize:20, userSelect:'none', pointerEvents:'none', transform:'translate(-50%,-50%)' }}>⭐</div>
        ))}
        {/* Magnet field */}
        {hasMagnet && <div style={{ position:'absolute', left:`${robotX}%`, top:'75%', width:100, height:100, borderRadius:'50%', background:'rgba(255,200,0,0.05)', transform:'translate(-50%,-50%)', border:'1px dashed #ffdd0033' }}/>}
        {/* Robot */}
        <div style={{ position:'absolute', left:`${robotX}%`, bottom:'5%', transform:'translateX(-50%)' }}>
          <Robot cfg={cfg} size={55} mood="idle"/>
        </div>
        {/* Ground line */}
        <div style={{ position:'absolute', bottom:'12%', left:0, right:0, height:1, background:'#ffffff11' }}/>
      </div>
      <div style={{ display:'flex', gap:12, width:W }}>
        <button onPointerDown={moveLeft}  style={{ ...S.btn(cfg.eye), flex:1, fontSize:22, padding:'14px 0' }}>◀</button>
        <button onPointerDown={moveRight} style={{ ...S.btn(cfg.eye), flex:1, fontSize:22, padding:'14px 0' }}>▶</button>
      </div>
      <div style={{ color:'#333', fontFamily:'monospace', fontSize:10 }}>Tap ◀ ▶ or use arrow keys</div>
    </div>
  )
}

// ── SPEED RACE GAME ───────────────────────────────────────────────────────────
function SpeedRace({ cfg, onDone }: { cfg:Cfg; onDone:(score:number)=>void }) {
  const W=320, H=280
  const GROUND = 68  // % from top where ground is
  const [robotY,  setRobotY]  = useState(GROUND)
  const [vy,      setVy]      = useState(0)
  const [walls,   setWalls]   = useState<Obj[]>([])
  const [coins,   setCoins]   = useState<Obj[]>([])
  const [score,   setScore]   = useState(0)
  const [lives,   setLives]   = useState(3)
  const [time,    setTime]    = useState(35)
  const [over,    setOver]    = useState(false)
  const nextId  = useRef(0)
  const stateRef= useRef({ robotY:GROUND, vy:0, walls:[] as Obj[], coins:[] as Obj[], score:0, lives:3, over:false })

  useEffect(() => { stateRef.current = { robotY, vy, walls, coins, score, lives, over } }, [robotY, vy, walls, coins, score, lives, over])

  useEffect(() => {
    if (over) return
    const loop = setInterval(() => {
      const s = stateRef.current
      if (s.over) return
      const spd = 1.5
      // physics
      const onGround = s.robotY >= GROUND
      const newVy = onGround ? Math.min(0, s.vy) : s.vy + 2
      const newY  = Math.min(GROUND, s.robotY + newVy * 0.5)
      // move objects
      const newWalls = s.walls.map(o=>({...o,x:o.x-spd})).filter(o=>o.x>-10)
      const newCoins = s.coins.map(o=>({...o,x:o.x-spd})).filter(o=>o.x>-5)
      // spawn
      if (Math.random()<0.018) newWalls.push({ id:nextId.current++, x:105, y:GROUND-20, w:7, h:22 })
      if (Math.random()<0.03) newCoins.push({ id:nextId.current++, x:105, y:GROUND-30-Math.random()*15, w:3, h:3 })
      // robot hitbox: x=15-22%, y=newY-20 to newY
      const rL=13, rR=24, rT=newY-22, rB=newY+2
      // collect coins
      let pts=0
      const remCoins = newCoins.filter(o=>{ const hit=o.x>rL&&o.x<rR&&o.y>rT&&o.y<rB; if(hit)pts++; return !hit })
      // hit walls
      let newLives=s.lives
      const remWalls = newWalls.filter(o=>{ const hit=o.x<rR&&o.x+o.w>rL&&o.y<rB&&o.y+o.h>rT; if(hit)newLives=Math.max(0,newLives-1); return !hit })
      const died=newLives<=0
      setRobotY(newY); setVy(newVy); setWalls(remWalls); setCoins(remCoins)
      setScore(p=>p+pts); setLives(newLives)
      if (died) { setOver(true); onDone(s.score+pts) }
    }, 50)
    return () => clearInterval(loop)
  }, [over, onDone])

  useEffect(() => {
    if (over) return
    const t=setInterval(()=>setTime(p=>{
      if(p<=1){setOver(true);onDone(stateRef.current.score);return 0}
      return p-1
    }),1000)
    return ()=>clearInterval(t)
  }, [over, onDone])

  const jump = useCallback(() => {
    const s = stateRef.current
    if (s.robotY >= GROUND - 2) setVy(-7)
  }, [])

  useEffect(() => {
    const kd=(e:KeyboardEvent)=>{ if(e.code==='Space'||e.code==='ArrowUp'){e.preventDefault();jump()} }
    window.addEventListener('keydown',kd)
    return ()=>window.removeEventListener('keydown',kd)
  }, [jump])

  const groundY = (GROUND / 100) * H

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
      <div style={{ width:W, display:'flex', justifyContent:'space-between', fontFamily:'monospace', fontSize:12 }}>
        <span style={{ color:'#ffdd00' }}>{'❤️'.repeat(lives)}{'🖤'.repeat(3-lives)}</span>
        <span style={{ color:'#44ff88' }}>🪙 {score}</span>
        <span style={{ color:time<=10?'#ff4466':'#888' }}>⏱ {time}s</span>
      </div>
      <div style={{ position:'relative', width:W, height:H, background:'#0a0400', border:'1px solid #2a1a00', borderRadius:8, overflow:'hidden' }}>
        {/* Ground */}
        <div style={{ position:'absolute', top:groundY, left:0, right:0, height:4, background:'#3a2000' }}/>
        {/* Scrolling ground pattern */}
        {[...Array(8)].map((_,i)=>(
          <div key={i} style={{ position:'absolute', top:groundY+4, left:`${(i*14+Date.now()/50)%100}%`, width:'10%', height:12, background:'#2a1500', borderRadius:2 }}/>
        ))}
        {/* Walls */}
        {walls.map(o=>(
          <div key={o.id} style={{ position:'absolute', left:`${o.x}%`, top:`${o.y}%`, width:`${o.w}%`, height:`${o.h}%`, background:'#ff4400', borderRadius:3 }}/>
        ))}
        {/* Coins */}
        {coins.map(o=>(
          <div key={o.id} style={{ position:'absolute', left:`${o.x}%`, top:`${o.y}%`, fontSize:16, userSelect:'none', pointerEvents:'none', transform:'translate(-50%,-50%)' }}>🪙</div>
        ))}
        {/* Robot */}
        <div style={{ position:'absolute', left:'15%', top:`${robotY}%`, transform:'translateY(-80%)' }}>
          <Robot cfg={cfg} size={52} mood="idle" flame={robotY < GROUND - 5}/>
        </div>
      </div>
      <button onPointerDown={jump} style={{ ...S.btn(cfg.color), width:W, fontSize:20, padding:'16px 0' }}>
        🏃 JUMP
      </button>
      <div style={{ color:'#333', fontFamily:'monospace', fontSize:10 }}>Tap JUMP or SPACE / ↑</div>
    </div>
  )
}

// ── GAME OVER SCREEN ──────────────────────────────────────────────────────────
function GameOver({ cfg, score, game, again, choose, rebuild }:
  { cfg:Cfg; score:number; game:MiniGame; again:()=>void; choose:()=>void; rebuild:()=>void }) {
  const grade = score>=50?'S':score>=30?'A':score>=15?'B':score>=5?'C':'D'
  const gc    = score>=30?'#44ff88':score>=15?'#ffdd00':'#ff4466'
  return (
    <div style={S.page}>
      <Robot cfg={cfg} size={110} mood="happy"/>
      <div style={{ ...S.title(gc), fontSize:52, margin:'8px 0 0' }}>{grade}</div>
      <div style={{ color:gc, fontFamily:'monospace', fontSize:22, letterSpacing:2, marginBottom:4 }}>{score} pts</div>
      <div style={{ color:'#444', fontFamily:'monospace', fontSize:11, marginBottom:24 }}>
        {game==='rocket'?'stars collected':game==='stars'?'stars caught':'coins collected'}
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%', maxWidth:280 }}>
        <button style={S.btn(cfg.color)} onClick={again}>PLAY AGAIN →</button>
        <button style={S.btn(cfg.eye)}   onClick={choose}>CHOOSE GAME →</button>
        <button style={S.outlineBtn}     onClick={rebuild}>← REBUILD ROBOT</button>
      </div>
    </div>
  )
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function BuildARobot() {
  const router  = useRouter()
  const [phase, setPhase]   = useState<Phase>('build')
  const [cfg,   setCfg]     = useState<Cfg>(DEFAULT)
  const [game,  setGame]    = useState<MiniGame>('stars')
  const [score, setScore]   = useState(0)
  const [done,  setDone]    = useState(false)

  const playGame = (g: MiniGame) => { setGame(g); setDone(false); setScore(0); setPhase('game') }
  const handleDone = (s: number) => { setScore(s); setDone(true) }

  if (phase === 'build') return (
    <BuildPhase cfg={cfg} setCfg={setCfg} next={() => setPhase('paint')}/>
  )
  if (phase === 'paint') return (
    <PaintPhase cfg={cfg} setCfg={setCfg} next={() => setPhase('choose')} back={() => setPhase('build')}/>
  )
  if (phase === 'choose') return (
    <ChoosePhase cfg={cfg} play={playGame} back={() => setPhase('paint')}/>
  )
  if (phase === 'game' && done) return (
    <GameOver cfg={cfg} score={score} game={game}
      again={() => playGame(game)}
      choose={() => setPhase('choose')}
      rebuild={() => setPhase('build')}
    />
  )

  return (
    <div style={{ minHeight:'100vh', background:'#000', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'16px', gap:0 }}>
      <button onClick={() => setPhase('choose')} style={{ position:'fixed', top:14, left:16, background:'none', border:'none', color:'#444', fontFamily:'monospace', fontSize:12, cursor:'pointer', letterSpacing:1 }}>
        ← back
      </button>
      {phase==='game' && game==='rocket' && <RocketFly cfg={cfg} onDone={handleDone}/>}
      {phase==='game' && game==='stars'  && <StarCatch cfg={cfg} onDone={handleDone}/>}
      {phase==='game' && game==='race'   && <SpeedRace cfg={cfg} onDone={handleDone}/>}
    </div>
  )
}

// ── shared styles ─────────────────────────────────────────────────────────────
const S = {
  page: {
    minHeight:'100vh', background:'#000',
    display:'flex' as const, flexDirection:'column' as const,
    alignItems:'center' as const, justifyContent:'center' as const,
    padding:'24px 16px', gap:0,
  },
  title: (c:string) => ({
    color:c, fontFamily:'monospace', fontWeight:900,
    textShadow:`0 0 12px ${c}, 0 0 32px ${c}55`,
  }),
  btn: (c:string) => ({
    background:'none', border:`2px solid ${c}`, borderRadius:8,
    color:c, fontFamily:'monospace', fontWeight:900,
    fontSize:14, letterSpacing:2, padding:'13px 24px',
    cursor:'pointer' as const, boxShadow:`0 0 10px ${c}44`,
    transition:'box-shadow 0.2s',
  }),
  outlineBtn: {
    background:'none', border:'2px solid #333', borderRadius:8,
    color:'#555', fontFamily:'monospace', fontWeight:900,
    fontSize:13, letterSpacing:1, padding:'12px 24px',
    cursor:'pointer' as const,
  },
}
