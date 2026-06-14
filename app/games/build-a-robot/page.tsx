'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// ─── types ───────────────────────────────────────────────────────────────────
const BODY_COLORS   = ['#ff4466','#ff8c00','#ffdd00','#44ff88','#00ccff','#8844ff','#ff44cc','#bbbbbb','#ffffff','#ff6644','#44ffdd','#cc44ff']
const DETAIL_COLORS = ['#ffdd00','#00ccff','#ff4466','#44ff88','#ffffff','#ff8c00','#8844ff','#ff44cc','#aaffdd','#111111','#ffaaaa','#aaaaff']
const BOT_NAMES = ['SPARK','BYTE','PIXEL','NOVA','ZENO','BOLT','CHIP','ECHO','FLUX','NANO']
const BOT_SUFF  = ['BOT','TRON','DROID','MECH','PRIME','UNIT','MAX','CORE']
const genName = () => BOT_NAMES[Math.floor(Math.random()*BOT_NAMES.length)]+'-'+BOT_SUFF[Math.floor(Math.random()*BOT_SUFF.length)]

type HeadStyle  = 'round'|'square'|'antenna'|'helmet'
type EyeStyle   = 'normal'|'big'|'visor'|'cyclops'
type MouthStyle = 'smile'|'grill'|'speaker'|'beak'
type ArmStyle   = 'basic'|'claws'|'laser'|'fins'
type LegStyle   = 'basic'|'wheels'|'rockets'|'tank'
type BackStyle  = 'none'|'jetpack'|'wings'|'cape'
type Phase      = 'build'|'paint'|'done'

interface Cfg {
  head: HeadStyle; eyes: EyeStyle; mouth: MouthStyle
  arms: ArmStyle;  legs: LegStyle; back: BackStyle
  bodyColor: string; detailColor: string
}

const DEF: Cfg = {
  head:'round', eyes:'normal', mouth:'smile',
  arms:'basic', legs:'basic', back:'none',
  bodyColor:'#00ccff', detailColor:'#ffdd00',
}

// ─── styles ───────────────────────────────────────────────────────────────────
const S = {
  page: { minHeight:'100vh', background:'#000', display:'flex' as const, flexDirection:'column' as const, alignItems:'center' as const, justifyContent:'center' as const, padding:'20px 16px' },
  title: (c:string) => ({ color:c, fontFamily:'monospace', fontWeight:900, textShadow:`0 0 12px ${c},0 0 32px ${c}55` }),
  btn: (c:string) => ({ background:'none', border:`2px solid ${c}`, borderRadius:8, color:c, fontFamily:'monospace', fontWeight:900, fontSize:14, letterSpacing:2, padding:'13px 24px', cursor:'pointer' as const, boxShadow:`0 0 12px ${c}44` }),
  outline: { background:'none', border:'2px solid #2a2a2a', borderRadius:8, color:'#444', fontFamily:'monospace', fontWeight:900, fontSize:13, letterSpacing:1, padding:'12px 24px', cursor:'pointer' as const },
}

// ─── Robot SVG ───────────────────────────────────────────────────────────────
function Robot({ cfg, size = 140 }: { cfg: Cfg; size?: number }) {
  const C = cfg.bodyColor, D = cfg.detailColor

  const capeEl = cfg.back === 'cape'
    ? <path d="M 52 104 Q 100 124 148 104 L 172 245 Q 100 265 28 245 Z" fill={D} opacity=".45"/>
    : null

  const wingsEl = cfg.back === 'wings'
    ? <>
        <path d="M 48 118 C 8 92 -4 158 22 166 L 48 148 Z" fill={D} opacity=".75"/>
        <path d="M 152 118 C 192 92 204 158 178 166 L 152 148 Z" fill={D} opacity=".75"/>
      </>
    : null

  const legsEl = cfg.legs === 'wheels'
    ? <>
        <rect x="68" y="180" width="22" height="22" rx="4" fill={C}/><rect x="110" y="180" width="22" height="22" rx="4" fill={C}/>
        <circle cx="79" cy="213" r="18" fill="#222"/><circle cx="79" cy="213" r="9" fill="#444"/><circle cx="79" cy="213" r="5" fill={D}/>
        <circle cx="121" cy="213" r="18" fill="#222"/><circle cx="121" cy="213" r="9" fill="#444"/><circle cx="121" cy="213" r="5" fill={D}/>
      </>
    : cfg.legs === 'rockets'
    ? <>
        <rect x="64" y="172" width="30" height="14" rx="4" fill={C}/><rect x="106" y="172" width="30" height="14" rx="4" fill={C}/>
        <ellipse cx="79" cy="200" rx="16" ry="24" fill={C}/><ellipse cx="121" cy="200" rx="16" ry="24" fill={C}/>
        <polygon points="79,176 65,190 93,190" fill="#ff4400"/><polygon points="121,176 107,190 135,190" fill="#ff4400"/>
      </>
    : cfg.legs === 'tank'
    ? <>
        <rect x="50" y="180" width="100" height="14" rx="5" fill={C}/>
        <rect x="44" y="190" width="112" height="28" rx="10" fill={C}/>
        {[0,1,2,3,4,5,6].map(i=><rect key={i} x={48+i*14} y="189" width="10" height="29" rx="3" fill={D} opacity=".35"/>)}
      </>
    : <>
        <rect x="68" y="180" width="22" height="38" rx="5" fill={C}/><rect x="110" y="180" width="22" height="38" rx="5" fill={C}/>
        <rect x="58" y="212" width="38" height="10" rx="4" fill={D}/><rect x="104" y="212" width="38" height="10" rx="4" fill={D}/>
      </>

  const armsEl = cfg.arms === 'claws'
    ? <>
        <rect x="18" y="104" width="30" height="52" rx="12" fill={C}/><rect x="152" y="104" width="30" height="52" rx="12" fill={C}/>
        <line x1="22" y1="162" x2="13" y2="178" stroke={D} strokeWidth="5" strokeLinecap="round"/>
        <line x1="33" y1="162" x2="33" y2="180" stroke={D} strokeWidth="5" strokeLinecap="round"/>
        <line x1="44" y1="162" x2="53" y2="178" stroke={D} strokeWidth="5" strokeLinecap="round"/>
        <line x1="156" y1="162" x2="147" y2="178" stroke={D} strokeWidth="5" strokeLinecap="round"/>
        <line x1="167" y1="162" x2="167" y2="180" stroke={D} strokeWidth="5" strokeLinecap="round"/>
        <line x1="178" y1="162" x2="187" y2="178" stroke={D} strokeWidth="5" strokeLinecap="round"/>
      </>
    : cfg.arms === 'laser'
    ? <>
        <rect x="18" y="104" width="30" height="52" rx="12" fill={C}/><rect x="152" y="104" width="30" height="52" rx="12" fill={C}/>
        <rect x="6" y="152" width="32" height="11" rx="5" fill={D}/>
        <circle cx="5" cy="157" r="5" fill={D} opacity=".55"/>
        <rect x="162" y="152" width="32" height="11" rx="5" fill={D}/>
        <circle cx="195" cy="157" r="5" fill={D} opacity=".55"/>
      </>
    : cfg.arms === 'fins'
    ? <>
        <polygon points="18,104 48,104 36,162 6,150" fill={C}/>
        <polygon points="182,104 152,104 164,162 194,150" fill={C}/>
        <line x1="28" y1="110" x2="16" y2="148" stroke={D} strokeWidth="2.5" opacity=".5"/>
        <line x1="38" y1="107" x2="26" y2="156" stroke={D} strokeWidth="2.5" opacity=".5"/>
        <line x1="172" y1="110" x2="184" y2="148" stroke={D} strokeWidth="2.5" opacity=".5"/>
        <line x1="162" y1="107" x2="174" y2="156" stroke={D} strokeWidth="2.5" opacity=".5"/>
      </>
    : <>
        <rect x="18" y="104" width="30" height="56" rx="12" fill={C}/><rect x="152" y="104" width="30" height="56" rx="12" fill={C}/>
        <circle cx="33" cy="164" r="14" fill={D}/><circle cx="167" cy="164" r="14" fill={D}/>
      </>

  const headEl = cfg.head === 'square'
    ? <rect x="58" y="20" width="84" height="84" rx="16" fill={C}/>
    : cfg.head === 'antenna'
    ? <><circle cx="100" cy="62" r="42" fill={C}/><line x1="100" y1="20" x2="100" y2="2" stroke={D} strokeWidth="5" strokeLinecap="round"/><circle cx="100" cy="1" r="9" fill={D}/></>
    : cfg.head === 'helmet'
    ? <>
        <rect x="52" y="22" width="96" height="82" rx="22" fill={C}/>
        <rect x="52" y="22" width="96" height="32" rx="22" fill="rgba(0,0,0,.22)"/>
        <rect x="62" y="29" width="76" height="18" rx="9" fill={D} opacity=".28"/>
      </>
    : <circle cx="100" cy="62" r="42" fill={C}/>

  const eyesEl = cfg.eyes === 'visor'
    ? <rect x="62" y="48" width="76" height="24" rx="12" fill={D} opacity=".88"/>
    : cfg.eyes === 'cyclops'
    ? <>
        <circle cx="100" cy="58" r="22" fill={D}/>
        <circle cx="100" cy="58" r="11" fill="white"/>
        <circle cx="103" cy="55" r="7" fill="#111"/>
        <circle cx="106" cy="52" r="3" fill="white" opacity=".9"/>
      </>
    : cfg.eyes === 'big'
    ? <>
        <circle cx="80" cy="58" r="18" fill={D}/><circle cx="120" cy="58" r="18" fill={D}/>
        <circle cx="80" cy="58" r="9" fill="white"/><circle cx="120" cy="58" r="9" fill="white"/>
        <circle cx="83" cy="55" r="5" fill="#111"/><circle cx="123" cy="55" r="5" fill="#111"/>
        <circle cx="85" cy="52" r="3" fill="white" opacity=".9"/><circle cx="125" cy="52" r="3" fill="white" opacity=".9"/>
      </>
    : <>
        <circle cx="84" cy="58" r="14" fill={D}/><circle cx="116" cy="58" r="14" fill={D}/>
        <circle cx="84" cy="58" r="7" fill="white"/><circle cx="116" cy="58" r="7" fill="white"/>
        <circle cx="87" cy="55" r="4" fill="#111"/><circle cx="119" cy="55" r="4" fill="#111"/>
        <circle cx="89" cy="53" r="2" fill="white" opacity=".9"/><circle cx="121" cy="53" r="2" fill="white" opacity=".9"/>
      </>

  const mouthEl = cfg.mouth === 'grill'
    ? <>
        <rect x="74" y="74" width="52" height="16" rx="5" fill="rgba(0,0,0,.28)"/>
        {[0,1,2,3].map(i=><rect key={i} x={78+i*11} y="77" width="7" height="10" rx="2" fill={D} opacity=".8"/>)}
      </>
    : cfg.mouth === 'speaker'
    ? <>
        <circle cx="100" cy="81" r="13" fill="rgba(0,0,0,.28)"/>
        <circle cx="100" cy="81" r="7" fill={D} opacity=".8"/>
        <circle cx="100" cy="81" r="3" fill="rgba(0,0,0,.4)"/>
      </>
    : cfg.mouth === 'beak'
    ? <polygon points="87,75 113,75 100,91" fill={D} opacity=".9"/>
    : <path d="M 82 78 Q 100 95 118 78" stroke={D} strokeWidth="4.5" fill="none" strokeLinecap="round"/>

  const jetpackEl = cfg.back === 'jetpack'
    ? <>
        <rect x="62" y="79" width="15" height="32" rx="6" fill="#252525" stroke={D} strokeWidth="1.5"/>
        <rect x="123" y="79" width="15" height="32" rx="6" fill="#252525" stroke={D} strokeWidth="1.5"/>
        <circle cx="70" cy="81" r="5" fill={D} opacity=".65"/>
        <circle cx="131" cy="81" r="5" fill={D} opacity=".65"/>
      </>
    : null

  return (
    <svg width={size} height={size*1.3} viewBox="0 0 200 260" style={{ overflow:'visible' }}>
      {capeEl}
      {wingsEl}
      {legsEl}
      <rect x="48" y="98" width="104" height="84" rx="14" fill={C}/>
      <rect x="60" y="112" width="80" height="54" rx="8" fill="rgba(0,0,0,.18)"/>
      <circle cx="80" cy="139" r="10" fill={D} opacity=".9"/>
      <circle cx="100" cy="139" r="10" fill={D} opacity=".9"/>
      <circle cx="120" cy="139" r="10" fill={D} opacity=".9"/>
      <rect x="60" y="112" width="80" height="8" rx="3" fill={D} opacity=".5"/>
      {armsEl}
      {headEl}
      {eyesEl}
      {mouthEl}
      {jetpackEl}
    </svg>
  )
}

// ─── BUILD PHASE ─────────────────────────────────────────────────────────────
function BuildPhase({ cfg, setCfg, next, isPT }: { cfg: Cfg; setCfg: (c:Cfg)=>void; next: ()=>void; isPT: boolean }) {
  const set = (k: keyof Cfg) => (v: string) => setCfg({ ...cfg, [k]: v as never })
  const C = cfg.bodyColor

  const Chip = ({ val, cur, setVal, label, sub }: { val:string; cur:string; setVal:(v:string)=>void; label:string; sub:string }) => (
    <button onClick={()=>setVal(val)} style={{
      padding:'9px 12px', borderRadius:8, cursor:'pointer', textAlign:'left',
      background: cur===val ? C : '#111', border:`2px solid ${cur===val ? C : '#2a2a2a'}`,
      color: cur===val ? '#000' : '#aaa', fontFamily:'monospace', transition:'all .12s', flex:'1 1 110px',
    }}>
      <div style={{fontWeight:900,fontSize:12}}>{label}</div>
      <div style={{fontSize:10,opacity:.65,marginTop:2}}>{sub}</div>
    </button>
  )

  const Sec = ({ label, children }: { label:string; children:React.ReactNode }) => (
    <div style={{marginBottom:14}}>
      <div style={{fontFamily:'monospace',fontSize:10,color:'#555',letterSpacing:2,marginBottom:7,textTransform:'uppercase'}}>{label}</div>
      <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>{children}</div>
    </div>
  )

  return (
    <div style={S.page}>
      <h1 style={{...S.title(C),fontSize:24,margin:'0 0 4px'}}>{isPT?'MONTE SEU ROBÔ':'BUILD YOUR ROBOT'}</h1>
      <p style={{color:'#444',fontFamily:'monospace',fontSize:10,margin:'0 0 16px',letterSpacing:1}}>{isPT?'ESCOLHA AS PEÇAS!':'PICK YOUR PARTS!'}</p>
      <div style={{display:'flex',gap:20,width:'100%',maxWidth:620,flexWrap:'wrap',justifyContent:'center'}}>
        <div style={{flex:1,minWidth:240}}>
          <Sec label={isPT?'Cabeça':'Head'}>
            <Chip val="round"   cur={cfg.head} setVal={set('head')} label={isPT?'🔵 Redonda':'🔵 Round'}    sub={isPT?'Cara amigável':'Friendly face'}/>
            <Chip val="square"  cur={cfg.head} setVal={set('head')} label={isPT?'🟦 Quadrada':'🟦 Square'}   sub={isPT?'Forte e durão':'Strong & tough'}/>
            <Chip val="antenna" cur={cfg.head} setVal={set('head')} label={isPT?'📡 Antena':'📡 Antenna'}   sub={isPT?'Super sinal':'Super signal'}/>
            <Chip val="helmet"  cur={cfg.head} setVal={set('head')} label={isPT?'⛑️ Capacete':'⛑️ Helmet'}    sub={isPT?'Proteção total':'Full protection'}/>
          </Sec>
          <Sec label={isPT?'Olhos':'Eyes'}>
            <Chip val="normal"  cur={cfg.eyes} setVal={set('eyes')} label={isPT?'👀 Normal':'👀 Normal'}     sub={isPT?'Dois olhos':'Two eyes'}/>
            <Chip val="big"     cur={cfg.eyes} setVal={set('eyes')} label={isPT?'🌟 Grandes':'🌟 Big Eyes'}  sub={isPT?'Super expressivo':'Super expressive'}/>
            <Chip val="visor"   cur={cfg.eyes} setVal={set('eyes')} label={isPT?'🕶️ Visor':'🕶️ Visor'}        sub={isPT?'Óculos robótico':'Robot shades'}/>
            <Chip val="cyclops" cur={cfg.eyes} setVal={set('eyes')} label={isPT?'🔮 Ciclope':'🔮 Cyclops'}   sub={isPT?'Um olho poderoso':'One powerful eye'}/>
          </Sec>
          <Sec label={isPT?'Boca':'Mouth'}>
            <Chip val="smile"   cur={cfg.mouth} setVal={set('mouth')} label={isPT?'😊 Sorriso':'😊 Smile'}   sub={isPT?'Sempre feliz':'Always happy'}/>
            <Chip val="grill"   cur={cfg.mouth} setVal={set('mouth')} label={isPT?'🤖 Grade':'🤖 Grill'}     sub={isPT?'Clássico robô':'Classic robot'}/>
            <Chip val="speaker" cur={cfg.mouth} setVal={set('mouth')} label={isPT?'🔊 Falante':'🔊 Speaker'} sub={isPT?'Música embutida':'Built-in music'}/>
            <Chip val="beak"    cur={cfg.mouth} setVal={set('mouth')} label={isPT?'🐦 Bico':'🐦 Beak'}       sub={isPT?'Parte pássaro':'Part bird'}/>
          </Sec>
          <Sec label={isPT?'Braços':'Arms'}>
            <Chip val="basic"  cur={cfg.arms} setVal={set('arms')} label={isPT?'💪 Básico':'💪 Basic'}     sub={isPT?'Mãos redondas':'Round hands'}/>
            <Chip val="claws"  cur={cfg.arms} setVal={set('arms')} label={isPT?'🦀 Garras':'🦀 Claws'}     sub={isPT?'Garras afiadas':'Sharp claws'}/>
            <Chip val="laser"  cur={cfg.arms} setVal={set('arms')} label={isPT?'🔫 Laser':'🔫 Laser'}      sub={isPT?'Canhões de luz':'Light cannons'}/>
            <Chip val="fins"   cur={cfg.arms} setVal={set('arms')} label={isPT?'🐟 Aletas':'🐟 Fins'}      sub={isPT?'Aerodinâmico':'Aerodynamic'}/>
          </Sec>
          <Sec label={isPT?'Pernas':'Legs'}>
            <Chip val="basic"   cur={cfg.legs} setVal={set('legs')} label={isPT?'🦿 Andador':'🦿 Walker'}  sub={isPT?'Vai a qualquer lugar':'Go anywhere'}/>
            <Chip val="wheels"  cur={cfg.legs} setVal={set('legs')} label={isPT?'🛞 Rodas':'🛞 Wheels'}    sub={isPT?'Super rápido!':'Super fast!'}/>
            <Chip val="rockets" cur={cfg.legs} setVal={set('legs')} label={isPT?'🚀 Foguetes':'🚀 Rockets'} sub={isPT?'Para voar!':'For flying!'}/>
            <Chip val="tank"    cur={cfg.legs} setVal={set('legs')} label={isPT?'🪖 Esteira':'🪖 Tracks'}   sub={isPT?'Inquebrável!':'Unbreakable!'}/>
          </Sec>
          <Sec label={isPT?'Costas':'Back'}>
            <Chip val="none"    cur={cfg.back} setVal={set('back')} label={isPT?'— Nenhum':'— None'}        sub={isPT?'Simples':'Keep it clean'}/>
            <Chip val="jetpack" cur={cfg.back} setVal={set('back')} label={isPT?'🚀 Mochila':'🚀 Jetpack'}  sub={isPT?'Voa de verdade':'Actually flies'}/>
            <Chip val="wings"   cur={cfg.back} setVal={set('back')} label={isPT?'🪽 Asas':'🪽 Wings'}       sub={isPT?'Como um pássaro':'Like a bird'}/>
            <Chip val="cape"    cur={cfg.back} setVal={set('back')} label={isPT?'🦸 Capa':'🦸 Cape'}        sub={isPT?'Herói total!':'Total hero!'}/>
          </Sec>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16,paddingTop:8}}>
          <Robot cfg={cfg} size={140}/>
          <button style={S.btn(C)} onClick={next}>{isPT?'PINTAR →':'PAINT IT →'}</button>
        </div>
      </div>
    </div>
  )
}

// ─── PAINT PHASE ─────────────────────────────────────────────────────────────
function PaintPhase({ cfg, setCfg, next, back, isPT }: { cfg:Cfg; setCfg:(c:Cfg)=>void; next:()=>void; back:()=>void; isPT:boolean }) {
  return (
    <div style={S.page}>
      <h1 style={{...S.title(cfg.bodyColor),fontSize:24,margin:'0 0 4px'}}>{isPT?'PINTE SEU ROBÔ':'PAINT YOUR ROBOT'}</h1>
      <p style={{color:'#444',fontFamily:'monospace',fontSize:10,margin:'0 0 16px',letterSpacing:1}}>{isPT?'ESCOLHA SUAS CORES!':'CHOOSE YOUR COLORS!'}</p>
      <div style={{display:'flex',gap:28,flexWrap:'wrap',justifyContent:'center',alignItems:'flex-start'}}>
        <div style={{display:'flex',flexDirection:'column',gap:18}}>
          {(['bodyColor','detailColor'] as const).map(key=>(
            <div key={key}>
              <div style={{fontFamily:'monospace',fontSize:10,color:'#555',letterSpacing:2,marginBottom:9,textTransform:'uppercase'}}>
                {key==='bodyColor'?(isPT?'Cor do Corpo':'Body Color'):(isPT?'Cor dos Detalhes':'Detail Color')}
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:7}}>
                {(key==='bodyColor'?BODY_COLORS:DETAIL_COLORS).map(c=>(
                  <button key={c} onClick={()=>setCfg({...cfg,[key]:c})}
                    style={{width:40,height:40,borderRadius:8,background:c,cursor:'pointer',border:`3px solid ${cfg[key]===c?'#fff':'transparent'}`,boxShadow:cfg[key]===c?`0 0 14px ${c}`:'none',transition:'all .12s'}}/>
                ))}
              </div>
            </div>
          ))}
          <div style={{display:'flex',gap:10}}>
            <button style={S.outline} onClick={back}>{isPT?'← voltar':'← back'}</button>
            <button style={S.btn(cfg.bodyColor)} onClick={next}>{isPT?'PRONTO! →':'DONE! →'}</button>
          </div>
        </div>
        <Robot cfg={cfg} size={160}/>
      </div>
    </div>
  )
}

// ─── DONE PHASE ──────────────────────────────────────────────────────────────
function DonePhase({ cfg, rebuild, isPT, botName }: { cfg:Cfg; rebuild:()=>void; isPT:boolean; botName:string }) {
  const router = useRouter()
  const C = cfg.bodyColor, D = cfg.detailColor

  const power = Math.min(99,
    (cfg.arms==='claws'?28:cfg.arms==='laser'?38:cfg.arms==='fins'?12:10)
    +(cfg.legs==='rockets'?32:cfg.legs==='tank'?26:cfg.legs==='wheels'?18:10)
    +(cfg.back==='jetpack'?18:cfg.back==='wings'?14:cfg.back==='cape'?6:0)
    +(cfg.head==='helmet'?14:0))

  const speed = Math.min(99,
    (cfg.legs==='wheels'?42:cfg.legs==='rockets'?36:cfg.legs==='tank'?5:14)
    +(cfg.back==='jetpack'?24:cfg.back==='wings'?20:cfg.back==='cape'?4:0)
    +(cfg.arms==='fins'?18:0))

  const brain = Math.min(99,
    (cfg.head==='antenna'?36:cfg.head==='helmet'?22:cfg.head==='square'?12:10)
    +(cfg.eyes==='cyclops'?26:cfg.eyes==='visor'?18:cfg.eyes==='big'?8:5)
    +(cfg.arms==='laser'?14:0))

  const Bar = ({ label, val, color }: { label:string; val:number; color:string }) => (
    <div style={{marginBottom:11}}>
      <div style={{display:'flex',justifyContent:'space-between',fontFamily:'monospace',fontSize:11,marginBottom:4}}>
        <span style={{color:'#555'}}>{label}</span>
        <span style={{color,fontWeight:900}}>{val}</span>
      </div>
      <div style={{height:8,background:'#111',borderRadius:4,overflow:'hidden'}}>
        <div style={{height:'100%',width:`${val}%`,background:color,borderRadius:4,boxShadow:`0 0 8px ${color}66`}}/>
      </div>
    </div>
  )

  const partSummary = isPT
    ? [
        `🧠 Cabeça: ${cfg.head==='round'?'Redonda':cfg.head==='square'?'Quadrada':cfg.head==='antenna'?'Antena':'Capacete'}`,
        `👀 Olhos: ${cfg.eyes==='normal'?'Normal':cfg.eyes==='big'?'Grandes':cfg.eyes==='visor'?'Visor':'Ciclope'}`,
        `💬 Boca: ${cfg.mouth==='smile'?'Sorriso':cfg.mouth==='grill'?'Grade':cfg.mouth==='speaker'?'Falante':'Bico'}`,
        `💪 Braços: ${cfg.arms==='basic'?'Básico':cfg.arms==='claws'?'Garras':cfg.arms==='laser'?'Laser':'Aletas'}`,
        `🦵 Pernas: ${cfg.legs==='basic'?'Andador':cfg.legs==='wheels'?'Rodas':cfg.legs==='rockets'?'Foguetes':'Esteira'}`,
        `🎒 Costas: ${cfg.back==='none'?'Nenhum':cfg.back==='jetpack'?'Mochila':cfg.back==='wings'?'Asas':'Capa'}`,
      ]
    : [
        `🧠 Head: ${cfg.head==='round'?'Round':cfg.head==='square'?'Square':cfg.head==='antenna'?'Antenna':'Helmet'}`,
        `👀 Eyes: ${cfg.eyes==='normal'?'Normal':cfg.eyes==='big'?'Big Eyes':cfg.eyes==='visor'?'Visor':'Cyclops'}`,
        `💬 Mouth: ${cfg.mouth==='smile'?'Smile':cfg.mouth==='grill'?'Grill':cfg.mouth==='speaker'?'Speaker':'Beak'}`,
        `💪 Arms: ${cfg.arms==='basic'?'Basic':cfg.arms==='claws'?'Claws':cfg.arms==='laser'?'Laser':'Fins'}`,
        `🦵 Legs: ${cfg.legs==='basic'?'Walker':cfg.legs==='wheels'?'Wheels':cfg.legs==='rockets'?'Rockets':'Tracks'}`,
        `🎒 Back: ${cfg.back==='none'?'None':cfg.back==='jetpack'?'Jetpack':cfg.back==='wings'?'Wings':'Cape'}`,
      ]

  return (
    <div style={{...S.page,gap:0}}>
      <div style={{fontFamily:'monospace',fontSize:10,color:C,letterSpacing:3,marginBottom:4}}>
        {isPT?'✨ ROBÔ COMPLETO!':'✨ ROBOT COMPLETE!'}
      </div>
      <div style={{fontFamily:'monospace',fontWeight:900,fontSize:30,color:'#fff',letterSpacing:2,marginBottom:2,textShadow:`0 0 20px ${C}`}}>
        {botName}
      </div>
      <div style={{fontFamily:'monospace',fontSize:10,color:'#444',letterSpacing:2,marginBottom:18}}>
        {isPT?'UNIDADE DE IA PERSONALIZADA':'CUSTOM AI UNIT'}
      </div>

      <div style={{display:'flex',gap:24,flexWrap:'wrap',justifyContent:'center',alignItems:'flex-start',width:'100%',maxWidth:580}}>
        <Robot cfg={cfg} size={160}/>

        <div style={{flex:1,minWidth:220}}>
          <div style={{width:'100%',marginBottom:16}}>
            <Bar label={isPT?'⚡ PODER':'⚡ POWER'} val={power} color="#ff4466"/>
            <Bar label={isPT?'💨 VELOCIDADE':'💨 SPEED'} val={speed} color="#44ff88"/>
            <Bar label={isPT?'🧠 INTELIGÊNCIA':'🧠 BRAINS'} val={brain} color="#00ccff"/>
          </div>

          <div style={{fontFamily:'monospace',fontSize:9,color:'#333',lineHeight:1.9}}>
            {partSummary.map((s,i)=><div key={i}>{s}</div>)}
          </div>
        </div>
      </div>

      <div style={{fontFamily:'monospace',fontSize:11,color:'#444',textAlign:'center',maxWidth:300,lineHeight:1.75,margin:'20px 0 22px'}}>
        {isPT
          ? `Assim como ${botName}, todo robô de IA tem partes diferentes que mudam como ele pensa, aprende e age!`
          : `Just like ${botName}, every AI robot has different parts that change how it thinks, learns, and acts!`}
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:10,width:'100%',maxWidth:280}}>
        <button style={S.btn(C)} onClick={rebuild}>{isPT?'← REMONTAR':'← REBUILD'}</button>
        <button style={S.outline} onClick={()=>router.back()}>{isPT?'VOLTAR AO INÍCIO':'BACK TO HOME'}</button>
      </div>
    </div>
  )
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function BuildARobot() {
  const [phase,   setPhase]   = useState<Phase>('build')
  const [cfg,     setCfg]     = useState<Cfg>(DEF)
  const [isPT,    setIsPT]    = useState(false)
  const [botName, setBotName] = useState('')

  useEffect(()=>{
    setIsPT(localStorage.getItem('pai_lang')==='pt')
    setBotName(genName())
  },[])

  const rebuild = () => { setPhase('build'); setBotName(genName()) }

  if (phase==='build') return <BuildPhase cfg={cfg} setCfg={setCfg} next={()=>setPhase('paint')} isPT={isPT}/>
  if (phase==='paint') return <PaintPhase cfg={cfg} setCfg={setCfg} next={()=>setPhase('done')} back={()=>setPhase('build')} isPT={isPT}/>
  return <DonePhase cfg={cfg} rebuild={rebuild} isPT={isPT} botName={botName||'ROBO-MAX'}/>
}
