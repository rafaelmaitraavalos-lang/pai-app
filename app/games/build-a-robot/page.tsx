'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// ─── types ───────────────────────────────────────────────────────────────────
const BODY_COLORS   = ['#ff4466','#ff8c00','#ffdd00','#44ff88','#00ccff','#8844ff','#ff44cc','#bbbbbb','#ffffff','#ff6644','#44ffdd','#cc44ff']
const DETAIL_COLORS = ['#ffdd00','#00ccff','#ff4466','#44ff88','#ffffff','#ff8c00','#8844ff','#ff44cc','#aaffdd','#111111','#ffaaaa','#aaaaff']
const BOT_NAMES = ['SPARK','BYTE','PIXEL','NOVA','ZENO','BOLT','CHIP','ECHO','FLUX','NANO']
const BOT_SUFF  = ['BOT','TRON','DROID','MECH','PRIME','UNIT','MAX','CORE']
const genName   = () => BOT_NAMES[Math.floor(Math.random()*BOT_NAMES.length)]+'-'+BOT_SUFF[Math.floor(Math.random()*BOT_SUFF.length)]

type HeadStyle  = 'round'|'square'|'dome'|'helmet'
type MouthStyle = 'smile'|'grill'|'speaker'|'beak'
type ArmStyle   = 'basic'|'claw'|'laser'
type Phase      = 'build'|'paint'|'done'

interface Build {
  head:      HeadStyle
  mouth:     MouthStyle
  arms:      ArmStyle
  eyes:      number   // 0-3
  antennae:  number   // 0-2
  rockets:   number   // 0-4
  wheels:    number   // 0-4
  wings:     number   // 0-2
  bodyColor:   string
  detailColor: string
}

const DEF: Build = {
  head:'round', mouth:'smile', arms:'basic',
  eyes:2, antennae:0, rockets:0, wheels:0, wings:0,
  bodyColor:'#00ccff', detailColor:'#ffdd00',
}

const HEADS:  HeadStyle[]  = ['round','square','dome','helmet']
const MOUTHS: MouthStyle[] = ['smile','grill','speaker','beak']
const ARMS:   ArmStyle[]   = ['basic','claw','laser']

// ─── styles ──────────────────────────────────────────────────────────────────
const S = {
  page: {minHeight:'100vh',background:'#000',display:'flex' as const,flexDirection:'column' as const,alignItems:'center' as const,padding:'16px 12px 80px'},
  btn:  (c:string)=>({background:'none',border:`2px solid ${c}`,borderRadius:8,color:c,fontFamily:'monospace',fontWeight:900,fontSize:14,letterSpacing:2,padding:'13px 24px',cursor:'pointer' as const,boxShadow:`0 0 12px ${c}44`}),
  out:  {background:'none',border:'2px solid #2a2a2a',borderRadius:8,color:'#444',fontFamily:'monospace',fontWeight:900,fontSize:13,letterSpacing:1,padding:'12px 24px',cursor:'pointer' as const},
}

// ─── Robot SVG ───────────────────────────────────────────────────────────────
const WX: number[][] = [[],[100],[79,121],[68,100,132],[60,84,116,140]]
// rocket positions: [left-body, right-body, left-leg, right-leg]
const RKT = [[18,132],[182,132],[62,202],[138,202]]

function Robot({ b, size=220 }: { b:Build; size?:number }) {
  const C = b.bodyColor, D = b.detailColor
  const headCY  = 66
  const headTopY = (b.head==='square'||b.head==='helmet') ? 26 : b.head==='dome' ? headCY-38 : headCY-40
  const eyeY    = b.head==='helmet' ? 62 : headCY
  const mY      = b.head==='helmet' ? 84 : 82

  // antennae
  const antEl = b.antennae===0 ? null
    : b.antennae===1
    ? <><line x1={100} y1={headTopY} x2={100} y2={headTopY-22} stroke={D} strokeWidth="5" strokeLinecap="round"/><circle cx={100} cy={headTopY-24} r={8} fill={D}/></>
    : <><line x1={83} y1={headTopY+4} x2={79} y2={headTopY-18} stroke={D} strokeWidth="4" strokeLinecap="round"/><circle cx={79} cy={headTopY-20} r={7} fill={D}/><line x1={117} y1={headTopY+4} x2={121} y2={headTopY-18} stroke={D} strokeWidth="4" strokeLinecap="round"/><circle cx={121} cy={headTopY-20} r={7} fill={D}/></>

  // head
  const headEl = b.head==='square'
    ? <rect x={60} y={26} width={80} height={80} rx={14} fill={C}/>
    : b.head==='dome'
    ? <ellipse cx={100} cy={headCY} rx={46} ry={40} fill={C}/>
    : b.head==='helmet'
    ? <><rect x={56} y={26} width={88} height={80} rx={20} fill={C}/><rect x={56} y={26} width={88} height={28} rx={20} fill="rgba(0,0,0,.22)"/><rect x={64} y={32} width={72} height={16} rx={8} fill={D} opacity=".28"/></>
    : <circle cx={100} cy={headCY} r={40} fill={C}/>

  // eyes
  const eyeEl = b.eyes===0 ? null
    : b.eyes===1
    ? <><circle cx={100} cy={eyeY} r={17} fill={D}/><circle cx={100} cy={eyeY} r={8} fill="white"/><circle cx={103} cy={eyeY-3} r={5} fill="#111"/><circle cx={106} cy={eyeY-6} r={2.5} fill="white" opacity=".9"/></>
    : b.eyes===2
    ? <><circle cx={84} cy={eyeY} r={13} fill={D}/><circle cx={116} cy={eyeY} r={13} fill={D}/><circle cx={84} cy={eyeY} r={6.5} fill="white"/><circle cx={116} cy={eyeY} r={6.5} fill="white"/><circle cx={87} cy={eyeY-3} r={4} fill="#111"/><circle cx={119} cy={eyeY-3} r={4} fill="#111"/><circle cx={89} cy={eyeY-5} r={2} fill="white" opacity=".9"/><circle cx={121} cy={eyeY-5} r={2} fill="white" opacity=".9"/></>
    : <><circle cx={78} cy={eyeY+2} r={10} fill={D}/><circle cx={100} cy={eyeY-3} r={12} fill={D}/><circle cx={122} cy={eyeY+2} r={10} fill={D}/><circle cx={78} cy={eyeY+2} r={5} fill="white"/><circle cx={100} cy={eyeY-3} r={6} fill="white"/><circle cx={122} cy={eyeY+2} r={5} fill="white"/><circle cx={80} cy={eyeY} r={3} fill="#111"/><circle cx={102} cy={eyeY-5} r={3.5} fill="#111"/><circle cx={124} cy={eyeY} r={3} fill="#111"/></>

  // mouth
  const mouthEl = b.mouth==='grill'
    ? <><rect x={76} y={mY-6} width={48} height={14} rx={4} fill="rgba(0,0,0,.28)"/>{[0,1,2,3].map(i=><rect key={i} x={79+i*10} y={mY-3} width={7} height={8} rx={2} fill={D} opacity=".8"/>)}</>
    : b.mouth==='speaker'
    ? <><circle cx={100} cy={mY} r={12} fill="rgba(0,0,0,.28)"/><circle cx={100} cy={mY} r={6} fill={D} opacity=".8"/><circle cx={100} cy={mY} r={3} fill="rgba(0,0,0,.4)"/></>
    : b.mouth==='beak'
    ? <polygon points={`88,${mY-5} 112,${mY-5} 100,${mY+9}`} fill={D} opacity=".9"/>
    : <path d={`M 84 ${mY} Q 100 ${mY+14} 116 ${mY}`} stroke={D} strokeWidth="4.5" fill="none" strokeLinecap="round"/>

  // arm ends
  const handL = b.arms==='claw'
    ? <><line x1={22} y1={170} x2={13} y2={186} stroke={D} strokeWidth="5" strokeLinecap="round"/><line x1={32} y1={170} x2={32} y2={188} stroke={D} strokeWidth="5" strokeLinecap="round"/><line x1={42} y1={170} x2={51} y2={186} stroke={D} strokeWidth="5" strokeLinecap="round"/></>
    : b.arms==='laser'
    ? <><rect x={7} y={158} width={30} height={11} rx={5} fill={D}/><circle cx={5} cy={163} r={4.5} fill={D} opacity=".5"/></>
    : <circle cx={32} cy={168} r={14} fill={D}/>
  const handR = b.arms==='claw'
    ? <><line x1={158} y1={170} x2={149} y2={186} stroke={D} strokeWidth="5" strokeLinecap="round"/><line x1={168} y1={170} x2={168} y2={188} stroke={D} strokeWidth="5" strokeLinecap="round"/><line x1={178} y1={170} x2={187} y2={186} stroke={D} strokeWidth="5" strokeLinecap="round"/></>
    : b.arms==='laser'
    ? <><rect x={163} y={158} width={30} height={11} rx={5} fill={D}/><circle cx={195} cy={163} r={4.5} fill={D} opacity=".5"/></>
    : <circle cx={168} cy={168} r={14} fill={D}/>

  // wings
  const wingsEl = b.wings===0 ? null
    : b.wings===1
    ? <path d="M 52 120 C 8 94 -2 162 24 168 L 52 150 Z" fill={D} opacity=".7"/>
    : <><path d="M 52 120 C 8 94 -2 162 24 168 L 52 150 Z" fill={D} opacity=".7"/><path d="M 148 120 C 192 94 202 162 176 168 L 148 150 Z" fill={D} opacity=".7"/></>

  // rockets
  const rocketsEl = RKT.slice(0,b.rockets).map(([rx,ry],i)=>{
    const small = i>=2
    const rxi=small?7:10, ryi=small?16:24
    return (
      <g key={i}>
        <ellipse cx={rx} cy={ry} rx={rxi} ry={ryi} fill={D}/>
        <polygon points={`${rx},${ry-ryi} ${rx-rxi},${ry-ryi+10} ${rx+rxi},${ry-ryi+10}`} fill="#ff4400"/>
        <ellipse cx={rx} cy={ry+ryi} rx={small?4:6} ry={small?6:9} fill="#ff8800" opacity=".85">
          <animate attributeName="ry" values={`${small?6:9};${small?3:5};${small?6:9}`} dur=".28s" repeatCount="indefinite"/>
        </ellipse>
      </g>
    )
  })

  // legs + wheels
  const wheelXS = WX[b.wheels]
  const legsEl = b.wheels===0
    ? <><rect x={68} y={198} width={22} height={40} rx={5} fill={C}/><rect x={110} y={198} width={22} height={40} rx={5} fill={C}/><rect x={58} y={232} width={38} height={9} rx={3} fill={D}/><rect x={104} y={232} width={38} height={9} rx={3} fill={D}/></>
    : <>{[68,110].map(lx=><rect key={lx} x={lx} y={198} width={22} height={26} rx={5} fill={C}/>)}{wheelXS.map((wx,i)=><g key={i}><circle cx={wx} cy={242} r={17} fill="#1a1a1a"/><circle cx={wx} cy={242} r={8} fill="#2a2a2a"/><circle cx={wx} cy={242} r={4.5} fill={D}/>{[0,1,2,3].map(s=>{const a=s/4*Math.PI*2;return <line key={s} x1={wx} y1={242} x2={wx+Math.cos(a)*8} y2={242+Math.sin(a)*8} stroke={D} strokeWidth="2" opacity=".4"/>})}</g>)}</>

  return (
    <svg width={size} height={size*1.38} viewBox="0 0 200 272" style={{overflow:'visible'}}>
      {wingsEl}
      {rocketsEl}
      {legsEl}
      <rect x={52} y={114} width={96} height={84} rx={13} fill={C}/>
      <rect x={62} y={126} width={76} height={55} rx={7} fill="rgba(0,0,0,.18)"/>
      <circle cx={80} cy={153} r={9} fill={D} opacity=".9"/>
      <circle cx={100} cy={153} r={9} fill={D} opacity=".9"/>
      <circle cx={120} cy={153} r={9} fill={D} opacity=".9"/>
      <rect x={62} y={126} width={76} height={8} rx={3} fill={D} opacity=".5"/>
      <rect x={20} y={118} width={32} height={54} rx={11} fill={C}/>
      <rect x={148} y={118} width={32} height={54} rx={11} fill={C}/>
      {handL}{handR}
      {headEl}{eyeEl}{mouthEl}{antEl}
    </svg>
  )
}

// ─── BUILD PHASE ─────────────────────────────────────────────────────────────
function BuildPhase({ b, setB, next, isPT }: { b:Build; setB:(x:Build)=>void; next:()=>void; isPT:boolean }) {
  const C = b.bodyColor
  const upd = (k:keyof Build,v:string|number) => setB({...b,[k]:v})
  const cyc = <T extends string>(arr:T[],cur:T):T => arr[(arr.indexOf(cur)+1)%arr.length]

  const HL  = {round:'Round',  square:'Square', dome:'Dome',    helmet:'Helmet'}
  const ML  = {smile:'Smile',  grill:'Grill',   speaker:'Speaker', beak:'Beak'}
  const AL  = {basic:'Hands',  claw:'Claws',    laser:'Laser'}
  const HLP = {round:'Redonda',square:'Quadrada',dome:'Cúpula', helmet:'Capacete'}
  const MLP = {smile:'Sorriso',grill:'Grade',   speaker:'Falante', beak:'Bico'}
  const ALP = {basic:'Mãos',   claw:'Garras',   laser:'Laser'}

  const Cycler = ({emoji,label,val,onCyc}:{emoji:string;label:string;val:string;onCyc:()=>void}) => (
    <button onClick={onCyc} style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'#0e0e0e',border:`2px solid #222`,borderRadius:10,padding:'11px 14px',cursor:'pointer',width:'100%',transition:'border-color .12s'}}
      onMouseEnter={e=>e.currentTarget.style.borderColor=C} onMouseLeave={e=>e.currentTarget.style.borderColor='#222'}>
      <span style={{fontFamily:'monospace',fontSize:12,color:'#555'}}>{emoji} {label}</span>
      <span style={{display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontFamily:'monospace',fontSize:13,color:C,fontWeight:900}}>{val}</span>
        <span style={{fontFamily:'monospace',fontSize:11,color:C,opacity:.5}}>▶</span>
      </span>
    </button>
  )

  const Stepper = ({emoji,label,val,max,onChg}:{emoji:string;label:string;val:number;max:number;onChg:(n:number)=>void}) => (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'#0e0e0e',border:'2px solid #1a1a1a',borderRadius:10,padding:'11px 14px'}}>
      <span style={{fontFamily:'monospace',fontSize:12,color:'#555'}}>{emoji} {label}</span>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <button onClick={()=>onChg(Math.max(0,val-1))} style={{width:32,height:32,borderRadius:7,background:'#161616',border:'2px solid #2a2a2a',color:'#666',fontFamily:'monospace',fontWeight:900,fontSize:20,cursor:'pointer',lineHeight:'1',display:'flex',alignItems:'center',justifyContent:'center'}}>−</button>
        <span style={{fontFamily:'monospace',fontWeight:900,fontSize:20,color:val>0?C:'#333',minWidth:22,textAlign:'center' as const}}>{val}</span>
        <button onClick={()=>onChg(Math.min(max,val+1))} disabled={val>=max} style={{width:32,height:32,borderRadius:7,background:val<max?C:'#111',border:`2px solid ${val<max?C:'#1a1a1a'}`,color:'#000',fontFamily:'monospace',fontWeight:900,fontSize:20,cursor:val<max?'pointer':'default',lineHeight:'1',display:'flex',alignItems:'center',justifyContent:'center',opacity:val>=max?.3:1}}>+</button>
      </div>
    </div>
  )

  return (
    <div style={S.page}>
      <div style={{fontFamily:'monospace',fontWeight:900,fontSize:22,color:C,letterSpacing:2,marginBottom:4,textShadow:`0 0 18px ${C}`}}>
        {isPT?'MONTE SEU ROBÔ':'BUILD YOUR ROBOT'}
      </div>
      <div style={{fontFamily:'monospace',fontSize:10,color:'#333',letterSpacing:2,marginBottom:18}}>{isPT?'TOQUE + PARA ADICIONAR PEÇAS':'TAP + TO ADD PARTS'}</div>

      <div style={{filter:`drop-shadow(0 0 28px ${C}55)`,marginBottom:22}}>
        <Robot b={b} size={250}/>
      </div>

      <div style={{width:'100%',maxWidth:360,display:'flex',flexDirection:'column',gap:7}}>
        <div style={{fontFamily:'monospace',fontSize:9,color:'#333',letterSpacing:2,textTransform:'uppercase' as const,marginBottom:1}}>{isPT?'FORMA':'SHAPE'}</div>
        <Cycler emoji="🧢" label={isPT?'Cabeça':'Head'}  val={isPT?HLP[b.head]:HL[b.head]}   onCyc={()=>upd('head',  cyc(HEADS,b.head))}/>
        <Cycler emoji="👄" label={isPT?'Boca':'Mouth'}   val={isPT?MLP[b.mouth]:ML[b.mouth]} onCyc={()=>upd('mouth', cyc(MOUTHS,b.mouth))}/>
        <Cycler emoji="💪" label={isPT?'Braços':'Arms'}  val={isPT?ALP[b.arms]:AL[b.arms]}   onCyc={()=>upd('arms',  cyc(ARMS,b.arms))}/>

        <div style={{fontFamily:'monospace',fontSize:9,color:'#333',letterSpacing:2,textTransform:'uppercase' as const,margin:'10px 0 1px'}}>{isPT?'PEÇAS':'PARTS'}</div>
        <Stepper emoji="👁️" label={isPT?'Olhos':'Eyes'}        val={b.eyes}     max={3} onChg={v=>upd('eyes',v)}/>
        <Stepper emoji="📡" label={isPT?'Antenas':'Antennae'}  val={b.antennae} max={2} onChg={v=>upd('antennae',v)}/>
        <Stepper emoji="🚀" label={isPT?'Foguetes':'Rockets'}  val={b.rockets}  max={4} onChg={v=>upd('rockets',v)}/>
        <Stepper emoji="🛞" label={isPT?'Rodas':'Wheels'}      val={b.wheels}   max={4} onChg={v=>upd('wheels',v)}/>
        <Stepper emoji="🪽" label={isPT?'Asas':'Wings'}        val={b.wings}    max={2} onChg={v=>upd('wings',v)}/>

        <div style={{height:12}}/>
        <button style={S.btn(C)} onClick={next}>{isPT?'PINTAR →':'PAINT IT →'}</button>
      </div>
    </div>
  )
}

// ─── PAINT PHASE ─────────────────────────────────────────────────────────────
function PaintPhase({ b, setB, next, back, isPT }: { b:Build; setB:(x:Build)=>void; next:()=>void; back:()=>void; isPT:boolean }) {
  return (
    <div style={S.page}>
      <div style={{fontFamily:'monospace',fontWeight:900,fontSize:22,color:b.bodyColor,letterSpacing:2,marginBottom:4,textShadow:`0 0 18px ${b.bodyColor}`}}>{isPT?'PINTE SEU ROBÔ':'PAINT YOUR ROBOT'}</div>
      <div style={{fontFamily:'monospace',fontSize:10,color:'#333',letterSpacing:2,marginBottom:18}}>{isPT?'ESCOLHA SUAS CORES!':'CHOOSE YOUR COLORS!'}</div>
      <div style={{filter:`drop-shadow(0 0 28px ${b.bodyColor}55)`,marginBottom:22}}><Robot b={b} size={200}/></div>
      <div style={{width:'100%',maxWidth:360,display:'flex',flexDirection:'column',gap:18}}>
        {(['bodyColor','detailColor'] as const).map(key=>(
          <div key={key}>
            <div style={{fontFamily:'monospace',fontSize:9,color:'#444',letterSpacing:2,marginBottom:9,textTransform:'uppercase' as const}}>
              {key==='bodyColor'?(isPT?'Cor do Corpo':'Body Color'):(isPT?'Cor dos Detalhes':'Detail Color')}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:7}}>
              {(key==='bodyColor'?BODY_COLORS:DETAIL_COLORS).map(c=>(
                <button key={c} onClick={()=>setB({...b,[key]:c})}
                  style={{height:42,borderRadius:8,background:c,cursor:'pointer',border:`3px solid ${b[key]===c?'#fff':'transparent'}`,boxShadow:b[key]===c?`0 0 14px ${c}`:'none',transition:'all .12s'}}/>
              ))}
            </div>
          </div>
        ))}
        <div style={{display:'flex',gap:10}}>
          <button style={S.out} onClick={back}>{isPT?'← voltar':'← back'}</button>
          <button style={S.btn(b.bodyColor)} onClick={next}>{isPT?'PRONTO! →':'DONE! →'}</button>
        </div>
      </div>
    </div>
  )
}

// ─── DONE PHASE ──────────────────────────────────────────────────────────────
function DonePhase({ b, rebuild, isPT, botName }: { b:Build; rebuild:()=>void; isPT:boolean; botName:string }) {
  const router = useRouter()
  const C = b.bodyColor
  const power = Math.min(99, b.rockets*16 + (b.arms==='claw'?22:b.arms==='laser'?30:8) + b.wings*7  + (b.head==='helmet'?12:4))
  const speed  = Math.min(99, b.wheels*18  + b.rockets*10 + b.wings*14)
  const brain  = Math.min(99, b.eyes*8     + b.antennae*20 + (b.head==='dome'?16:b.head==='helmet'?12:6))

  const Bar = ({label,val,color}:{label:string;val:number;color:string}) => (
    <div style={{marginBottom:11}}>
      <div style={{display:'flex',justifyContent:'space-between',fontFamily:'monospace',fontSize:11,marginBottom:4}}>
        <span style={{color:'#555'}}>{label}</span><span style={{color,fontWeight:900}}>{val}</span>
      </div>
      <div style={{height:8,background:'#111',borderRadius:4,overflow:'hidden'}}>
        <div style={{height:'100%',width:`${val}%`,background:color,borderRadius:4,boxShadow:`0 0 8px ${color}66`}}/>
      </div>
    </div>
  )

  const parts = isPT
    ? [`👁️ ${b.eyes} ${b.eyes===1?'olho':'olhos'}`,`📡 ${b.antennae} antena${b.antennae!==1?'s':''}`,`🚀 ${b.rockets} foguete${b.rockets!==1?'s':''}`,`🛞 ${b.wheels} roda${b.wheels!==1?'s':''}`,`🪽 ${b.wings} asa${b.wings!==1?'s':''}`]
    : [`👁️ ${b.eyes} eye${b.eyes!==1?'s':''}`,`📡 ${b.antennae} antenn${b.antennae!==1?'ae':'a'}`,`🚀 ${b.rockets} rocket${b.rockets!==1?'s':''}`,`🛞 ${b.wheels} wheel${b.wheels!==1?'s':''}`,`🪽 ${b.wings} wing${b.wings!==1?'s':''}`]

  return (
    <div style={S.page}>
      <div style={{fontFamily:'monospace',fontSize:10,color:C,letterSpacing:3,marginBottom:4}}>{isPT?'✨ ROBÔ COMPLETO!':'✨ ROBOT COMPLETE!'}</div>
      <div style={{fontFamily:'monospace',fontWeight:900,fontSize:28,color:'#fff',letterSpacing:2,marginBottom:2,textShadow:`0 0 20px ${C}`}}>{botName}</div>
      <div style={{fontFamily:'monospace',fontSize:10,color:'#444',letterSpacing:2,marginBottom:18}}>{isPT?'UNIDADE DE IA PERSONALIZADA':'CUSTOM AI UNIT'}</div>
      <div style={{display:'flex',gap:24,flexWrap:'wrap',justifyContent:'center',alignItems:'flex-start',width:'100%',maxWidth:560}}>
        <div style={{filter:`drop-shadow(0 0 28px ${C}55)`}}><Robot b={b} size={190}/></div>
        <div style={{flex:1,minWidth:200}}>
          <Bar label={isPT?'⚡ PODER':'⚡ POWER'}           val={power} color="#ff4466"/>
          <Bar label={isPT?'💨 VELOCIDADE':'💨 SPEED'}       val={speed} color="#44ff88"/>
          <Bar label={isPT?'🧠 INTELIGÊNCIA':'🧠 BRAINS'}   val={brain} color="#00ccff"/>
          <div style={{fontFamily:'monospace',fontSize:10,color:'#333',lineHeight:2,marginTop:12}}>
            {parts.map((p,i)=><div key={i}>{p}</div>)}
          </div>
        </div>
      </div>
      <div style={{fontFamily:'monospace',fontSize:11,color:'#444',textAlign:'center',maxWidth:300,lineHeight:1.75,margin:'20px 0 22px'}}>
        {isPT?`Assim como ${botName}, todo robô de IA tem peças únicas que mudam como ele aprende!`:`Just like ${botName}, every AI robot has unique parts that change how it learns!`}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10,width:'100%',maxWidth:280}}>
        <button style={S.btn(C)} onClick={rebuild}>{isPT?'← REMONTAR':'← REBUILD'}</button>
        <button style={S.out} onClick={()=>router.back()}>{isPT?'VOLTAR':'BACK TO HOME'}</button>
      </div>
    </div>
  )
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function BuildARobot() {
  const [phase,   setPhase]   = useState<Phase>('build')
  const [b,       setB]       = useState<Build>(DEF)
  const [isPT,    setIsPT]    = useState(false)
  const [botName, setBotName] = useState('')

  useEffect(()=>{
    setIsPT(localStorage.getItem('pai_lang')==='pt')
    setBotName(genName())
  },[])

  const rebuild = () => { setPhase('build'); setBotName(genName()) }

  if (phase==='build') return <BuildPhase b={b} setB={setB} next={()=>setPhase('paint')} isPT={isPT}/>
  if (phase==='paint') return <PaintPhase b={b} setB={setB} next={()=>setPhase('done')} back={()=>setPhase('build')} isPT={isPT}/>
  return <DonePhase b={b} rebuild={rebuild} isPT={isPT} botName={botName||'ROBO-MAX'}/>
}
