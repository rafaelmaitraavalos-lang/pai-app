'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

// ─── types ────────────────────────────────────────────────────────────────────
const COLORS = ['#ff4466','#ff8c00','#ffdd00','#44ff88','#00ccff','#8844ff','#ff44cc','#bbbbbb']
type HeadStyle = 'round'|'square'|'antenna'
type LegStyle  = 'basic'|'wheels'|'rockets'
type Extra     = 'none'|'rockets'|'propeller'|'magnet'
type Phase     = 'build'|'paint'|'choose'|'game'
type MiniGame  = 'rocket'|'stars'|'race'
interface Cfg { head:HeadStyle; legs:LegStyle; extra:Extra; color:string; eye:string }
const DEF: Cfg = { head:'round', legs:'basic', extra:'none', color:'#00ccff', eye:'#ffdd00' }

// ─── particles ────────────────────────────────────────────────────────────────
interface P { id:number; x:number; y:number; vx:number; vy:number; life:number; ml:number; c:string; s:number; t?:string }
let _uid=0; const uid=()=>++_uid
const burst=(x:number,y:number,c:string,n=12,sp=2): P[] =>
  Array.from({length:n},(_,i)=>{const a=(i/n)*Math.PI*2+Math.random()*.5,s=(.4+Math.random())*sp; return {id:uid(),x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-.6,life:30,ml:30,c,s:2+Math.random()*6}})
const trail=(x:number,y:number,c:string): P =>
  ({id:uid(),x,y,vx:(Math.random()-.5)*.8,vy:.8+Math.random()*2,life:14,ml:14,c,s:3+Math.random()*5})
const floatTxt=(x:number,y:number,t:string,c:string): P =>
  ({id:uid(),x,y,vx:(Math.random()-.5)*.4,vy:-2,life:42,ml:42,c,s:16,t})
const tickPs=(ps:P[]):P[] =>
  ps.map(p=>({...p,x:p.x+p.vx,y:p.y+p.vy,vy:p.vy+.13,life:p.life-1})).filter(p=>p.life>0)

// ─── static star layouts (generated once) ────────────────────────────────────
const W=340, H_RF=400, H_SC=380, H_SR=300
const STARS_SLOW = Array.from({length:28},()=>({x:Math.random()*W,y:Math.random()*H_RF,s:1,o:.25+Math.random()*.3,spd:.04}))
const STARS_MED  = Array.from({length:14},()=>({x:Math.random()*W,y:Math.random()*H_RF,s:1.5,o:.4+Math.random()*.4,spd:.1}))
const STARS_FAST = Array.from({length:7}, ()=>({x:Math.random()*W,y:Math.random()*H_RF,s:2.5,o:.6+Math.random()*.4,spd:.22}))
const ALL_STARS  = [...STARS_SLOW,...STARS_MED,...STARS_FAST]

// ─── Robot SVG ────────────────────────────────────────────────────────────────
function Robot({cfg,size=140,mood='idle',flame=false,tilt=0,shield=false}:
  {cfg:Cfg;size?:number;mood?:'idle'|'happy'|'oops';flame?:boolean;tilt?:number;shield?:boolean}) {
  const {color:C,eye:E}=cfg
  const mouth = mood==='happy'
    ? <path d="M 85 80 Q 100 94 115 80" stroke={E} strokeWidth="4" fill="none" strokeLinecap="round"/>
    : mood==='oops'
    ? <ellipse cx="100" cy="82" rx="11" ry="8" fill="#333"/>
    : <rect x="84" y="79" width="32" height="5" rx="2" fill={E} opacity=".7"/>
  return (
    <svg width={size} height={size*1.3} viewBox="0 0 200 260"
      style={{overflow:'visible',transform:`rotate(${tilt}deg)`,transition:'transform .08s',filter:shield?`drop-shadow(0 0 8px ${E}) drop-shadow(0 0 16px ${E})`:'none'}}>
      {/* rocket flames */}
      {flame&&cfg.legs==='rockets'&&<>
        <ellipse cx="74" cy="232" rx="9" ry="20" fill="#ff8800" opacity=".85"><animate attributeName="ry" values="20;12;20" dur=".25s" repeatCount="indefinite"/></ellipse>
        <ellipse cx="74" cy="232" rx="5" ry="11" fill="#ffe000" opacity=".9"><animate attributeName="ry" values="11;6;11" dur=".25s" repeatCount="indefinite"/></ellipse>
        <ellipse cx="126" cy="232" rx="9" ry="20" fill="#ff8800" opacity=".85"><animate attributeName="ry" values="20;12;20" dur=".25s" repeatCount="indefinite"/></ellipse>
        <ellipse cx="126" cy="232" rx="5" ry="11" fill="#ffe000" opacity=".9"><animate attributeName="ry" values="11;6;11" dur=".25s" repeatCount="indefinite"/></ellipse>
      </>}
      {flame&&cfg.extra==='rockets'&&<>
        <ellipse cx="22" cy="140" rx="7" ry="16" fill="#ff8800" opacity=".85"><animate attributeName="rx" values="7;4;7" dur=".2s" repeatCount="indefinite"/></ellipse>
        <ellipse cx="178" cy="140" rx="7" ry="16" fill="#ff8800" opacity=".85"><animate attributeName="rx" values="7;4;7" dur=".2s" repeatCount="indefinite"/></ellipse>
      </>}
      {/* shield bubble */}
      {shield&&<ellipse cx="100" cy="130" rx="85" ry="105" fill="none" stroke={E} strokeWidth="3" opacity=".6"><animate attributeName="opacity" values=".6;.2;.6" dur=".6s" repeatCount="indefinite"/></ellipse>}
      {/* legs */}
      {cfg.legs==='basic'&&<><rect x="68" y="180" width="22" height="38" rx="5" fill={C}/><rect x="110" y="180" width="22" height="38" rx="5" fill={C}/><rect x="58" y="212" width="38" height="10" rx="4" fill={E}/><rect x="104" y="212" width="38" height="10" rx="4" fill={E}/></>}
      {cfg.legs==='wheels'&&<><rect x="68" y="180" width="22" height="22" rx="4" fill={C}/><rect x="110" y="180" width="22" height="22" rx="4" fill={C}/><circle cx="79" cy="213" r="18" fill="#222"/><circle cx="79" cy="213" r="9" fill="#444"/><circle cx="79" cy="213" r="5" fill={E}/><circle cx="121" cy="213" r="18" fill="#222"/><circle cx="121" cy="213" r="9" fill="#444"/><circle cx="121" cy="213" r="5" fill={E}/></>}
      {cfg.legs==='rockets'&&<><rect x="64" y="172" width="30" height="14" rx="4" fill={C}/><rect x="106" y="172" width="30" height="14" rx="4" fill={C}/><ellipse cx="79" cy="200" rx="16" ry="24" fill={C}/><ellipse cx="121" cy="200" rx="16" ry="24" fill={C}/><polygon points="79,176 65,190 93,190" fill="#ff4400"/><polygon points="121,176 107,190 135,190" fill="#ff4400"/></>}
      {/* body */}
      <rect x="48" y="98" width="104" height="84" rx="14" fill={C}/>
      <rect x="60" y="112" width="80" height="54" rx="8" fill="rgba(0,0,0,.18)"/>
      <circle cx="80" cy="139" r="10" fill={E} opacity=".9"/>
      <circle cx="100" cy="139" r="10" fill={E} opacity=".9"/>
      <circle cx="120" cy="139" r="10" fill={E} opacity=".9"/>
      <rect x="60" y="112" width="80" height="8" rx="3" fill={E} opacity=".55"/>
      {/* side rockets */}
      {cfg.extra==='rockets'&&<><ellipse cx="22" cy="120" rx="12" ry="28" fill={E}/><polygon points="22,92 10,110 34,110" fill="#ff4400"/><ellipse cx="178" cy="120" rx="12" ry="28" fill={E}/><polygon points="178,92 166,110 190,110" fill="#ff4400"/></>}
      {/* arms */}
      <rect x="18" y="104" width="30" height="56" rx="12" fill={C}/>
      <rect x="152" y="104" width="30" height="56" rx="12" fill={C}/>
      {cfg.extra==='magnet'
        ?<><path d="M 22,162 Q 22,182 33,182 Q 44,182 44,162" stroke={E} strokeWidth="8" fill="none" strokeLinecap="round"/><circle cx="168" cy="164" r="14" fill={E}/></>
        :<><circle cx="33" cy="164" r="14" fill={E}/><circle cx="167" cy="164" r="14" fill={E}/></>}
      {/* head */}
      {cfg.head==='round'  &&<circle cx="100" cy="62" r="42" fill={C}/>}
      {cfg.head==='square' &&<rect x="58" y="20" width="84" height="84" rx="16" fill={C}/>}
      {cfg.head==='antenna'&&<><circle cx="100" cy="62" r="42" fill={C}/><line x1="100" y1="20" x2="100" y2="4" stroke={E} strokeWidth="5" strokeLinecap="round"/><circle cx="100" cy="3" r="8" fill={E}/></>}
      {cfg.extra==='propeller'&&<><rect x="56" y="18" width="88" height="9" rx="4" fill={E}><animateTransform attributeName="transform" type="rotate" from="0 100 22" to="360 100 22" dur=".4s" repeatCount="indefinite"/></rect><circle cx="100" cy="22" r="8" fill={C}/></>}
      {/* eyes */}
      <circle cx="84" cy="58" r="14" fill={E}/><circle cx="116" cy="58" r="14" fill={E}/>
      <circle cx="84" cy="58" r="7" fill="white"/><circle cx="116" cy="58" r="7" fill="white"/>
      <circle cx="87" cy="55" r="4" fill="#111"/><circle cx="119" cy="55" r="4" fill="#111"/>
      <circle cx="89" cy="53" r="2" fill="white" opacity=".9"/><circle cx="121" cy="53" r="2" fill="white" opacity=".9"/>
      {mouth}
    </svg>
  )
}

// ─── ROCKET FLY ───────────────────────────────────────────────────────────────
interface RObj { id:number; x:number; y:number; type:'star'|'gem'|'fuel'|'shield'|'asteroid'|'comet' }
interface LWall { id:number; x:number; gapTop:number; gapH:number }

interface RFState {
  robotY:number; vy:number; tilt:number
  fuel:number; shield:number
  items:RObj[]; hazards:RObj[]; walls:LWall[]
  particles:P[]; bgOff:number; shake:number
  score:number; combo:number; comboTimer:number
  lives:number; timeLeft:number
  wallCooldown:number; started:boolean
}

const RF0: RFState = {
  robotY:50,vy:0,tilt:0,fuel:100,shield:0,
  items:[],hazards:[],walls:[],particles:[],bgOff:0,shake:0,
  score:0,combo:0,comboTimer:0,lives:3,timeLeft:60,wallCooldown:0,started:false
}

export function RocketFly({cfg,onDone}:{cfg:Cfg;onDone:(s:number)=>void}) {
  const [gs,setGs] = useState<RFState>(RF0)
  const gsRef = useRef(gs)
  useEffect(()=>{gsRef.current=gs},[gs])
  const boostRef         = useRef(false)
  const doneRef          = useRef(false)
  const boostIntervalRef = useRef<NodeJS.Timeout|null>(null)

  // each boost gives a reliable upward kick (clamped so rapid taps can stack)
  const doBoost = useCallback(()=>{
    const s=gsRef.current
    if(!s.started){
      setGs(p=>({...p,started:true,vy:-8,fuel:Math.max(0,p.fuel-18)}))
      boostRef.current=true; setTimeout(()=>{boostRef.current=false},120)
      return
    }
    if(s.fuel<10) return
    // stronger impulse: always subtracts 7 so even max-fall (vy=9) becomes vy=2 in one tap
    setGs(p=>({...p,vy:Math.max(p.vy-7,-9),fuel:Math.max(0,p.fuel-18)}))
    boostRef.current=true; setTimeout(()=>{boostRef.current=false},120)
  },[])

  // hold-to-boost: fire on press, then every 150ms while held
  const startBoost = useCallback(()=>{
    doBoost()
    boostIntervalRef.current = setInterval(doBoost, 150)
  },[doBoost])
  const stopBoost = useCallback(()=>{
    if(boostIntervalRef.current){ clearInterval(boostIntervalRef.current); boostIntervalRef.current=null }
  },[])

  useEffect(()=>{
    const kd=(e:KeyboardEvent)=>{if(e.code==='Space'||e.code==='ArrowUp'){e.preventDefault();doBoost()}}
    window.addEventListener('keydown',kd)
    return ()=>window.removeEventListener('keydown',kd)
  },[doBoost])

  // main game loop
  useEffect(()=>{
    const loop=setInterval(()=>{
      const s=gsRef.current
      if(!s.started||doneRef.current) return
      const elapsed = 60-s.timeLeft
      const spd = 1.0 + elapsed*0.022 // speed increases over time

      // physics
      const newVy   = Math.min(s.vy+1.4, 9)
      const newY    = Math.max(3,Math.min(93,s.robotY - newVy*.6))
      const newTilt = Math.max(-20,Math.min(20,newVy*2.5))
      const newFuel = Math.min(100,s.fuel+1.6)
      const newShield= Math.max(0,s.shield-1)
      const newBg   = s.bgOff + spd*2
      const newShake= Math.max(0,s.shake-1)

      // robot hitbox in pixels
      const rPxX=55, rPxY=(1-(newY/100))*H_RF, rR=22, rBot=30

      let ps=[...s.particles]

      // trail when recently boosted
      if(boostRef.current){
        const exhaustY=rPxY+rBot
        ps.push(trail(rPxX,exhaustY,cfg.color))
        if(cfg.extra==='rockets'){ps.push(trail(15,rPxY+10,cfg.eye));ps.push(trail(W-15,rPxY+10,cfg.eye))}
      }

      // move items & hazards
      let newItems = s.items.map(o=>({...o,x:o.x-spd*(o.type==='comet'?1.6:1)})).filter(o=>o.x>-8)
      let newHaz   = s.hazards.map(o=>({...o,x:o.x-spd*(o.type==='comet'?1.4:1.1),y:o.type==='comet'?o.y+.18:o.y})).filter(o=>o.x>-8)
      const newWalls= s.walls.map(w=>({...w,x:w.x-spd*.9})).filter(w=>w.x>-4)

      // spawn items
      if(Math.random()<.018) newItems.push({id:uid(),x:102,y:8+Math.random()*80,type:'star'})
      if(Math.random()<.005) newItems.push({id:uid(),x:102,y:10+Math.random()*76,type:'gem'})
      if(Math.random()<.008) newItems.push({id:uid(),x:102,y:15+Math.random()*65,type:'fuel'})
      if(Math.random()<.003) newItems.push({id:uid(),x:102,y:15+Math.random()*65,type:'shield'})

      // spawn hazards — ramp up over time
      if(Math.random()<(.010+elapsed*.0007)) newHaz.push({id:uid(),x:102,y:5+Math.random()*85,type:'asteroid'})
      if(Math.random()<(.003+elapsed*.0002)) newHaz.push({id:uid(),x:105+Math.random()*10,y:Math.random()<.5?-5:95,type:'comet'})

      // spawn laser wall — gap shrinks over time
      let newWallCD=s.wallCooldown-1
      if(newWallCD<=0&&Math.random()<.012){
        const gapH=Math.max(14, 32-elapsed*0.24+Math.random()*10)
        const gapTop=5+Math.random()*(85-gapH)
        newWalls.push({id:uid(),x:100,gapTop,gapH})
        newWallCD=Math.max(50,90-elapsed*0.5)|0
      }

      // collect items
      let newScore=s.score, newCombo=s.combo, newComboTimer=s.comboTimer-1
      if(newComboTimer<0){newComboTimer=0;newCombo=0}

      newItems=newItems.filter(o=>{
        const ox=o.x/100*W, oy=o.y/100*H_RF
        const dist=Math.sqrt((ox-rPxX)**2+(oy-rPxY)**2)
        if(dist>36) return true
        // collect!
        const pts=o.type==='gem'?5:1
        newCombo++; newComboTimer=25
        const mult=newCombo>=4?3:newCombo>=2?2:1
        const earned=pts*mult
        newScore+=earned
        ps.push(...burst(ox,oy,o.type==='gem'?'#00ccff':'#ffdd00',10,2))
        ps.push(floatTxt(ox,oy-20,`+${earned}${mult>1?` x${mult}`:''}`,o.type==='gem'?'#00ccff':'#ffdd00'))
        if(o.type==='fuel') {setGs(p=>({...p,fuel:Math.min(100,p.fuel+35)})); return false}
        if(o.type==='shield') {setGs(p=>({...p,shield:120})); return false}
        return false
      })

      // hit hazards
      let newLives=s.lives
      let hitShake=newShake
      newHaz=newHaz.filter(o=>{
        if(newShield>0) return true // shielded
        const ox=o.x/100*W, oy=o.y/100*H_RF
        const dist=Math.sqrt((ox-rPxX)**2+(oy-rPxY)**2)
        if(dist>30) return true
        newLives=Math.max(0,newLives-1)
        ps.push(...burst(ox,oy,'#ff4400',14,2.5))
        ps.push(floatTxt(rPxX,rPxY-30,'OUCH!','#ff4400'))
        hitShake=8; newCombo=0
        return false
      })

      // hit walls
      const robotYTop = 100-newY-8  // % from top
      const robotYBot = 100-newY+8
      newWalls.forEach(w=>{
        if(newShield>0) return
        if(w.x<28&&w.x>10){
          const inGap = robotYTop>=w.gapTop && robotYBot<=w.gapTop+w.gapH
          if(!inGap){
            newLives=Math.max(0,newLives-1)
            ps.push(...burst(rPxX,rPxY,'#ff4400',12,2.5))
            hitShake=10; newCombo=0
          }
        }
      })

      // out of bounds
      if(newY<=3||newY>=93) newLives=Math.max(0,newLives-1)

      ps=tickPs(ps)

      const died=newLives<=0
      setGs(p=>({...p,
        robotY:newY,vy:newVy,tilt:newTilt,fuel:newFuel,shield:newShield,
        items:newItems,hazards:newHaz,walls:newWalls,
        particles:ps,bgOff:newBg,shake:hitShake,
        score:newScore,combo:newCombo,comboTimer:newComboTimer,
        lives:newLives,wallCooldown:newWallCD,
      }))
      if(died&&!doneRef.current){doneRef.current=true;setTimeout(()=>onDone(newScore),400)}
    },50)
    return ()=>clearInterval(loop)
  },[cfg,onDone])

  // timer
  useEffect(()=>{
    const t=setInterval(()=>{
      setGs(p=>{
        if(!p.started||doneRef.current) return p
        if(p.timeLeft<=1&&!doneRef.current){doneRef.current=true;setTimeout(()=>onDone(p.score),200);return p}
        return{...p,timeLeft:p.timeLeft-1}
      })
    },1000)
    return ()=>clearInterval(t)
  },[onDone])

  const {robotY,vy,tilt,fuel,shield,items,hazards,walls,particles,bgOff,shake,score,lives,timeLeft,started,combo}=gs
  const robotPxY = (1-robotY/100)*H_RF
  const fuelC = fuel>50?'#44ff88':fuel>20?'#ffdd00':'#ff4466'
  const shakeX = gs.shake>0?(Math.random()-.5)*gs.shake*1.5:0

  return(
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
      {/* HUD */}
      <div style={{width:W,display:'flex',justifyContent:'space-between',alignItems:'center',fontFamily:'monospace',fontSize:12}}>
        <span>{[...Array(3)].map((_,i)=><span key={i} style={{fontSize:16}}>{i<lives?'❤️':'🖤'}</span>)}</span>
        <div style={{textAlign:'center'}}>
          <span style={{color:'#ffdd00',fontWeight:900,fontSize:15}}>⭐ {score}</span>
          {combo>=2&&<span style={{color:'#ff8c00',fontSize:10,marginLeft:6}}>x{combo>=4?3:2} COMBO!</span>}
        </div>
        <span style={{color:timeLeft<=8?'#ff4466':'#888'}}>⏱ {timeLeft}s</span>
      </div>
      {/* Fuel bar */}
      <div style={{width:W,height:6,background:'#111',borderRadius:3,overflow:'hidden',position:'relative'}}>
        <div style={{height:'100%',width:`${fuel}%`,background:fuelC,borderRadius:3,transition:'width .05s,background .3s',boxShadow:`0 0 8px ${fuelC}`}}/>
        <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,display:'flex',alignItems:'center',paddingLeft:6}}>
          <span style={{color:'#ffffff44',fontSize:9,fontFamily:'monospace',letterSpacing:1}}>FUEL</span>
        </div>
      </div>
      {/* Game area */}
      <div style={{position:'relative',width:W,height:H_RF,background:'#020208',border:'1px solid #0a0a2a',borderRadius:10,overflow:'hidden',transform:`translate(${shakeX}px,${shake>0?(Math.random()-.5)*shake:0}px)`}}>
        {/* Parallax stars */}
        {ALL_STARS.map((star,i)=>{
          const x=((star.x-bgOff*star.spd)%W+W)%W
          return <div key={i} style={{position:'absolute',left:x,top:star.y,width:star.s,height:star.s,background:`rgba(255,255,255,${star.o})`,borderRadius:'50%'}}/>
        })}
        {/* Nebula glow */}
        <div style={{position:'absolute',left:'30%',top:'20%',width:200,height:200,background:`radial-gradient(circle, ${cfg.color}18 0%, transparent 70%)`,borderRadius:'50%',pointerEvents:'none'}}/>

        {/* Laser walls */}
        {walls.map(w=>{
          const wx=w.x/100*W
          const gapTopPx=w.gapTop/100*H_RF
          const gapBotPx=(w.gapTop+w.gapH)/100*H_RF
          return <div key={w.id}>
            <div style={{position:'absolute',left:wx-4,top:0,width:8,height:gapTopPx,background:'linear-gradient(180deg,#ff2200,#ff6600)',boxShadow:'0 0 12px #ff4400,0 0 24px #ff440066',borderRadius:2}}/>
            <div style={{position:'absolute',left:wx-3,top:gapTopPx,width:6,height:gapBotPx-gapTopPx,background:`${cfg.color}11`,border:`1px dashed ${cfg.color}44`}}/>
            <div style={{position:'absolute',left:wx-4,top:gapBotPx,width:8,height:H_RF-gapBotPx,background:'linear-gradient(0deg,#ff2200,#ff6600)',boxShadow:'0 0 12px #ff4400,0 0 24px #ff440066',borderRadius:2}}/>
          </div>
        })}

        {/* Items */}
        {items.map(o=>(
          <div key={o.id} style={{position:'absolute',left:`${o.x}%`,top:`${o.y}%`,fontSize:o.type==='gem'?22:18,transform:'translate(-50%,-50%)',userSelect:'none',filter:o.type==='gem'?'drop-shadow(0 0 6px #00ccff)':o.type==='fuel'?'drop-shadow(0 0 6px #44ff88)':'none'}}>
            {o.type==='star'?'⭐':o.type==='gem'?'💎':o.type==='fuel'?'⛽':'🛡️'}
          </div>
        ))}
        {/* Hazards */}
        {hazards.map(o=>(
          <div key={o.id} style={{position:'absolute',left:`${o.x}%`,top:`${o.y}%`,fontSize:o.type==='comet'?26:20,transform:'translate(-50%,-50%) rotate(135deg)',userSelect:'none'}}>
            {o.type==='comet'?'☄️':'🪨'}
          </div>
        ))}

        {/* Robot */}
        <div style={{position:'absolute',left:18,top:robotPxY,transform:'translateY(-50%)',zIndex:10}}>
          <Robot cfg={cfg} size={55} mood="idle" flame={boostRef.current} tilt={tilt} shield={shield>0}/>
        </div>

        {/* Particles */}
        {particles.map(p=>(
          p.t
            ?<div key={p.id} style={{position:'absolute',left:p.x,top:p.y,color:p.c,fontFamily:'monospace',fontWeight:900,fontSize:p.s,whiteSpace:'nowrap',opacity:p.life/p.ml,pointerEvents:'none',transform:'translate(-50%,-50%)',textShadow:`0 0 8px ${p.c}`}}>{p.t}</div>
            :<div key={p.id} style={{position:'absolute',left:p.x,top:p.y,width:p.s,height:p.s,background:p.c,borderRadius:'50%',opacity:p.life/p.ml,pointerEvents:'none',transform:'translate(-50%,-50%)',boxShadow:`0 0 4px ${p.c}`}}/>
        ))}

        {/* Start overlay */}
        {!started&&(
          <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,.7)',gap:12}}>
            <Robot cfg={cfg} size={80} mood="happy"/>
            <div style={{color:'#fff',fontFamily:'monospace',fontWeight:900,fontSize:20,textShadow:`0 0 20px ${cfg.color}`}}>TAP TO FLY!</div>
            <div style={{color:'#666',fontFamily:'monospace',fontSize:11,textAlign:'center',padding:'0 24px'}}>Collect ⭐💎⛽🛡️ — dodge 🪨☄️ — fly through laser gaps!</div>
          </div>
        )}
      </div>
      {/* Controls */}
      <button
        onPointerDown={startBoost} onPointerUp={stopBoost} onPointerLeave={stopBoost}
        style={{...S.btn(cfg.color),width:W,fontSize:20,padding:'16px 0',userSelect:'none',opacity:fuel<5?.5:1,boxShadow:`0 0 ${fuel>0?20:4}px ${cfg.color}66`}}>
        🚀 BOOST {fuel<5?'(charging…)':''}
      </button>
      <div style={{color:'#333',fontFamily:'monospace',fontSize:10}}>Hold BOOST or SPACE / ↑ to fly!</div>
    </div>
  )
}

// ─── STAR CATCH ───────────────────────────────────────────────────────────────
interface SCObj { id:number; x:number; y:number; vy:number; type:'small'|'big'|'gem'|'bomb'|'magnet' }
interface SCState {
  robotX:number; vx:number
  items:SCObj[]; particles:P[]
  magnetTimer:number; comboCount:number; comboTimer:number
  score:number; lives:number; timeLeft:number; started:boolean; shake:number
}
const SC0: SCState = {robotX:50,vx:0,items:[],particles:[],magnetTimer:0,comboCount:0,comboTimer:0,score:0,lives:3,timeLeft:60,started:false,shake:0}

export function StarCatch({cfg,onDone}:{cfg:Cfg;onDone:(s:number)=>void}) {
  const [gs,setGs] = useState<SCState>(SC0)
  const gsRef = useRef(gs)
  useEffect(()=>{gsRef.current=gs},[gs])
  const leftRef=useRef(false), rightRef=useRef(false)
  const doneRef=useRef(false)

  const baseRadius = cfg.extra==='magnet'?26:16

  useEffect(()=>{
    const loop=setInterval(()=>{
      const s=gsRef.current
      if(!s.started||doneRef.current) return

      // robot movement (smooth acceleration)
      const accel = leftRef.current?-1.8:rightRef.current?1.8:0
      const newVx  = (s.vx+accel)*.82  // friction
      const newX   = Math.max(6,Math.min(94,s.robotX+newVx))

      const elapsed = 60-s.timeLeft
      const spd = 1.0+elapsed*.02
      const catchR = s.magnetTimer>0 ? baseRadius+20 : baseRadius
      const fallSpd = (vy: number) => vy + elapsed*.012

      let newItems=s.items.map(o=>({...o,y:o.y+o.vy*spd})).filter(o=>o.y<102)
      if(Math.random()<(.030+elapsed*.0009)) newItems.push({id:uid(),x:5+Math.random()*90,y:-3,vy:fallSpd(.7+Math.random()*.8),type:'small'})
      if(Math.random()<(.010+elapsed*.0005)) newItems.push({id:uid(),x:5+Math.random()*90,y:-3,vy:fallSpd(1+Math.random()*1),type:'big'})
      if(Math.random()<.006) newItems.push({id:uid(),x:5+Math.random()*90,y:-3,vy:fallSpd(.6+Math.random()*.5),type:'gem'})
      if(Math.random()<(.008+elapsed*.0006)) newItems.push({id:uid(),x:5+Math.random()*90,y:-3,vy:fallSpd(.9+Math.random()*.7),type:'bomb'})
      if(Math.random()<.004) newItems.push({id:uid(),x:5+Math.random()*90,y:-3,vy:.5,type:'magnet'})

      // catch check (robot at y=84%)
      let newScore=s.score, newLives=s.lives, newCombo=s.comboCount, newComboTimer=s.comboTimer-1, newMagnet=Math.max(0,s.magnetTimer-1)
      if(newComboTimer<0){newComboTimer=0; newCombo=0}
      let ps=[...s.particles]
      let hitShake=Math.max(0,s.shake-1)

      newItems=newItems.filter(o=>{
        const ox=o.x/100*W, oy=o.y/100*H_SC
        const rx=newX/100*W, ry=84/100*H_SC
        const dist=Math.sqrt((ox-rx)**2+(oy-ry)**2)
        if(o.y<75) return true  // not low enough yet (unless magnet)
        if(dist>catchR*3.4) return true

        if(o.type==='bomb'){
          newLives=Math.max(0,newLives-1)
          ps.push(...burst(ox,oy,'#ff4400',14,2.5))
          ps.push(floatTxt(ox,oy,'💥 OUCH!','#ff4400'))
          hitShake=10; newCombo=0
          return false
        }
        const pts=o.type==='gem'?5:o.type==='big'?3:1
        newCombo++; newComboTimer=20
        const mult=newCombo>=6?4:newCombo>=4?3:newCombo>=2?2:1
        const earned=pts*mult
        newScore+=earned
        ps.push(...burst(ox,oy,o.type==='gem'?'#00ccff':o.type==='big'?'#ff8c00':'#ffdd00',o.type==='gem'?14:8,1.8))
        ps.push(floatTxt(ox,oy-15,`+${earned}${mult>1?` x${mult}`:''}`,o.type==='gem'?'#00ccff':'#ffdd00'))
        if(o.type==='magnet'){newMagnet=160;ps.push(floatTxt(ox,oy-15,'🧲 MAGNET!','#ff8c00'))}
        return false
      })

      ps=tickPs(ps)
      const died=newLives<=0
      setGs(p=>({...p,robotX:newX,vx:newVx,items:newItems,particles:ps,magnetTimer:newMagnet,comboCount:newCombo,comboTimer:newComboTimer,score:newScore,lives:newLives,shake:hitShake}))
      if(died&&!doneRef.current){doneRef.current=true;setTimeout(()=>onDone(newScore),400)}
    },50)
    return ()=>clearInterval(loop)
  },[cfg,onDone,baseRadius])

  useEffect(()=>{
    const t=setInterval(()=>setGs(p=>{
      if(!p.started||doneRef.current) return p
      if(p.timeLeft<=1&&!doneRef.current){doneRef.current=true;setTimeout(()=>onDone(p.score),200);return p}
      return{...p,timeLeft:p.timeLeft-1}
    }),1000)
    return ()=>clearInterval(t)
  },[onDone])

  useEffect(()=>{
    const kd=(e:KeyboardEvent)=>{if(e.code==='ArrowLeft')leftRef.current=true;if(e.code==='ArrowRight')rightRef.current=true}
    const ku=(e:KeyboardEvent)=>{if(e.code==='ArrowLeft')leftRef.current=false;if(e.code==='ArrowRight')rightRef.current=false}
    window.addEventListener('keydown',kd); window.addEventListener('keyup',ku)
    return ()=>{window.removeEventListener('keydown',kd);window.removeEventListener('keyup',ku)}
  },[])

  const {robotX,items,particles,magnetTimer,comboCount,score,lives,timeLeft,started,shake}=gs
  const shakeX=shake>0?(Math.random()-.5)*shake*1.5:0

  return(
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
      <div style={{width:W,display:'flex',justifyContent:'space-between',alignItems:'center',fontFamily:'monospace',fontSize:12}}>
        <span>{[...Array(3)].map((_,i)=><span key={i} style={{fontSize:16}}>{i<lives?'❤️':'🖤'}</span>)}</span>
        <div style={{textAlign:'center'}}>
          <span style={{color:'#ffdd00',fontWeight:900,fontSize:15}}>⭐ {score}</span>
          {comboCount>=2&&<span style={{color:'#ff8c00',fontSize:10,marginLeft:6}}>x{comboCount>=6?4:comboCount>=4?3:2} COMBO!</span>}
        </div>
        <span style={{color:timeLeft<=8?'#ff4466':'#888'}}>⏱ {timeLeft}s</span>
      </div>
      {magnetTimer>0&&<div style={{width:W,height:4,background:'#111',borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',width:`${(magnetTimer/160)*100}%`,background:'#ff8c00',boxShadow:'0 0 6px #ff8c00'}}/></div>}
      <div style={{position:'relative',width:W,height:H_SC,background:'linear-gradient(180deg,#000814 0%,#001a3a 60%,#000a0a 100%)',border:'1px solid #001428',borderRadius:10,overflow:'hidden',transform:`translate(${shakeX}px,0)`}}>
        {/* City skyline silhouette */}
        {[8,45,70,100,150,190,230,268,300,330].map((bx,i)=>{
          const bh=20+[30,50,40,60,25,55,35,45,28,42][i]
          return <div key={i} style={{position:'absolute',left:bx,bottom:0,width:22+i%3*8,height:bh,background:'#0a0a1a',borderRadius:'2px 2px 0 0'}}/>
        })}
        {/* Window lights on buildings */}
        {[{x:12,y:H_SC-25},{x:50,y:H_SC-45},{x:75,y:H_SC-35},{x:155,y:H_SC-50},{x:235,y:H_SC-45}].map((w,i)=>(
          <div key={i} style={{position:'absolute',left:w.x,top:w.y,width:4,height:4,background:cfg.eye,borderRadius:1,opacity:.6}}/>
        ))}
        {/* Falling items */}
        {items.map(o=>(
          <div key={o.id} style={{position:'absolute',left:`${o.x}%`,top:`${o.y}%`,fontSize:o.type==='big'?26:o.type==='bomb'?24:o.type==='gem'?22:18,transform:'translate(-50%,-50%)',userSelect:'none',filter:o.type==='gem'?'drop-shadow(0 0 8px #00ccff)':o.type==='bomb'?'drop-shadow(0 0 6px #ff4400)':'none'}}>
            {o.type==='small'?'⭐':o.type==='big'?'🌟':o.type==='gem'?'💎':o.type==='bomb'?'💣':'🧲'}
          </div>
        ))}
        {/* Magnet aura */}
        {magnetTimer>0&&<div style={{position:'absolute',left:`${robotX}%`,top:'84%',width:baseRadius*2+40,height:baseRadius*2+40,borderRadius:'50%',background:'rgba(255,140,0,.06)',border:'1px dashed rgba(255,140,0,.3)',transform:'translate(-50%,-50%)',transition:'all .1s'}}/>}
        {/* Ground */}
        <div style={{position:'absolute',bottom:28,left:0,right:0,height:2,background:'rgba(255,255,255,.08)'}}/>
        {/* Robot */}
        <div style={{position:'absolute',left:`${robotX}%`,top:'84%',transform:'translateX(-50%) translateY(-70%)',transition:'left .02s'}}>
          <Robot cfg={cfg} size={55} mood="idle"/>
        </div>
        {/* Particles */}
        {particles.map(p=>(
          p.t
            ?<div key={p.id} style={{position:'absolute',left:p.x,top:p.y,color:p.c,fontFamily:'monospace',fontWeight:900,fontSize:p.s,whiteSpace:'nowrap',opacity:p.life/p.ml,pointerEvents:'none',transform:'translate(-50%,-50%)',textShadow:`0 0 8px ${p.c}`}}>{p.t}</div>
            :<div key={p.id} style={{position:'absolute',left:p.x,top:p.y,width:p.s,height:p.s,background:p.c,borderRadius:'50%',opacity:p.life/p.ml,pointerEvents:'none',transform:'translate(-50%,-50%)'}}/>
        ))}
        {!started&&(
          <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,.7)',gap:12}}>
            <Robot cfg={cfg} size={80} mood="happy"/>
            <div style={{color:'#fff',fontFamily:'monospace',fontWeight:900,fontSize:20,textShadow:`0 0 20px ${cfg.eye}`}}>TAP TO START!</div>
            <div style={{color:'#666',fontFamily:'monospace',fontSize:11,textAlign:'center',padding:'0 24px'}}>Catch ⭐🌟💎🧲 — dodge 💣 bombs!</div>
          </div>
        )}
      </div>
      <div style={{display:'flex',gap:10,width:W}}>
        <button
          onPointerDown={()=>{if(!gs.started)setGs(p=>({...p,started:true}));leftRef.current=true}}
          onPointerUp={()=>{leftRef.current=false}} onPointerLeave={()=>{leftRef.current=false}}
          style={{...S.btn(cfg.eye),flex:1,fontSize:28,padding:'18px 0',userSelect:'none'}}>◀</button>
        <button
          onPointerDown={()=>{if(!gs.started)setGs(p=>({...p,started:true}));rightRef.current=true}}
          onPointerUp={()=>{rightRef.current=false}} onPointerLeave={()=>{rightRef.current=false}}
          style={{...S.btn(cfg.eye),flex:1,fontSize:28,padding:'18px 0',userSelect:'none'}}>▶</button>
      </div>
      <div style={{color:'#333',fontFamily:'monospace',fontSize:10}}>Hold ◀ ▶ or arrow keys — catch stars, dodge bombs!</div>
    </div>
  )
}

// ─── SPEED RACE ───────────────────────────────────────────────────────────────
const GROUND_Y=75  // % from top
interface SRObj { id:number; x:number; y:number; type:'coin'|'boost' }
interface SRObs { id:number; x:number; h:number; type:'low'|'tall' }
interface SRState {
  robotY:number; vy:number; jumps:number
  obstacles:SRObs[]; coins:SRObj[]; particles:P[]
  boostTimer:number; score:number; lives:number; timeLeft:number
  bgOff:number; groundOff:number; started:boolean; shake:number; frame:number
}
const SR0: SRState = {robotY:GROUND_Y,vy:0,jumps:0,obstacles:[],coins:[],particles:[],boostTimer:0,score:0,lives:3,timeLeft:60,bgOff:0,groundOff:0,started:false,shake:0,frame:0}

export function SpeedRace({cfg,onDone}:{cfg:Cfg;onDone:(s:number)=>void}) {
  const [gs,setGs]=useState<SRState>(SR0)
  const gsRef=useRef(gs)
  useEffect(()=>{gsRef.current=gs},[gs])
  const doneRef=useRef(false)

  // first tap starts AND jumps simultaneously
  const doJump=useCallback(()=>{
    const s=gsRef.current
    if(!s.started){setGs(p=>({...p,started:true,vy:-9,jumps:1}));return}
    if(s.jumps>=2) return
    const newVy = s.jumps===0 ? -9 : -7   // first jump strong, double jump keeps momentum
    setGs(p=>({...p,vy:newVy,jumps:p.jumps+1}))
  },[])

  useEffect(()=>{
    const kd=(e:KeyboardEvent)=>{if(e.code==='Space'||e.code==='ArrowUp'){e.preventDefault();doJump()}}
    window.addEventListener('keydown',kd)
    return ()=>window.removeEventListener('keydown',kd)
  },[doJump])

  useEffect(()=>{
    const loop=setInterval(()=>{
      const s=gsRef.current
      if(!s.started||doneRef.current) return
      const elapsed=60-s.timeLeft
      const spd=(1.0+elapsed*.027)*(s.boostTimer>0?1.8:1)
      const newFrame=s.frame+1

      // physics
      const onGround=s.robotY>=GROUND_Y
      const newVy=onGround?Math.min(0,s.vy):s.vy+1.8
      const newY=Math.min(GROUND_Y,s.robotY+newVy*.5)
      const newJumps=newY>=GROUND_Y?0:s.jumps
      const newBg=s.bgOff+spd*.4
      const newGround=s.groundOff+spd*2
      const newBoost=Math.max(0,s.boostTimer-1)
      const newShake=Math.max(0,s.shake-1)

      let obs=s.obstacles.map(o=>({...o,x:o.x-spd})).filter(o=>o.x>-10)
      let coins=s.coins.map(o=>({...o,x:o.x-spd})).filter(o=>o.x>-5)
      let ps=[...s.particles]

      // spawn — obstacles start tiny (8px) and grow to 48px over 60 seconds
      const obstH = Math.min(8 + elapsed*0.66 + Math.random()*(4+elapsed*0.28), 50)
      if(Math.random()<(.010+elapsed*.00025)) obs.push({id:uid(),x:102,h:obstH,type:Math.random()<.3?'tall':'low'})
      if(Math.random()<.035) coins.push({id:uid(),x:102,y:GROUND_Y-8-Math.random()*20,type:'coin'})
      if(Math.random()<.003) coins.push({id:uid(),x:102,y:GROUND_Y-12,type:'boost'})

      // robot hitbox
      const rPxX=18/100*W, rPxY=newY/100*H_SR, rW=14, rH=18

      // collect
      let newScore=s.score
      let newBoostT=newBoost
      coins=coins.filter(o=>{
        const ox=o.x/100*W, oy=o.y/100*H_SR
        const hit=Math.abs(ox-rPxX)<rW+12&&Math.abs(oy-rPxY)<rH+12
        if(!hit) return true
        if(o.type==='boost'){newBoostT=80;ps.push(floatTxt(ox,oy,'⚡ BOOST!','#ffdd00'))}
        else{newScore++;ps.push(floatTxt(ox,oy,'+1','#ffdd00'))}
        ps.push(...burst(ox,oy,o.type==='boost'?'#ffdd00':'#ff8c00',6,1.5))
        return false
      })

      // obstacles
      let newLives=s.lives
      let hitShk=newShake
      if(s.boostTimer<=0){
        obs.forEach(o=>{
          const ox=o.x/100*W
          const oBot=GROUND_Y/100*H_SR
          const oTop=oBot-o.h
          const hit=ox<rPxX+rW&&ox+10>rPxX-rW&&rPxY>oTop&&rPxY<oBot+8
          if(hit){
            newLives=Math.max(0,newLives-1)
            ps.push(...burst(rPxX,rPxY,'#ff4400',10,2))
            ps.push(floatTxt(rPxX,rPxY-20,'OUCH!','#ff4400'))
            hitShk=8
          }
        })
        // remove hit obstacles
        obs=obs.filter(o=>{
          const ox=o.x/100*W, oBot=GROUND_Y/100*H_SR, oTop=oBot-o.h
          return !(ox<rPxX+rW&&ox+10>rPxX-rW&&rPxY>oTop&&rPxY<oBot+8)
        })
      }

      ps=tickPs(ps)
      const died=newLives<=0
      setGs(p=>({...p,robotY:newY,vy:newVy,jumps:newJumps,obstacles:obs,coins,particles:ps,boostTimer:newBoostT,score:newScore,lives:newLives,bgOff:newBg,groundOff:newGround,shake:hitShk,frame:newFrame}))
      if(died&&!doneRef.current){doneRef.current=true;setTimeout(()=>onDone(newScore),400)}
    },50)
    return ()=>clearInterval(loop)
  },[cfg,onDone])

  useEffect(()=>{
    const t=setInterval(()=>setGs(p=>{
      if(!p.started||doneRef.current) return p
      if(p.timeLeft<=1&&!doneRef.current){doneRef.current=true;setTimeout(()=>onDone(p.score),200);return p}
      return{...p,timeLeft:p.timeLeft-1}
    }),1000)
    return ()=>clearInterval(t)
  },[onDone])

  const {robotY,obstacles,coins,particles,boostTimer,score,lives,timeLeft,bgOff,groundOff,started,shake,jumps,frame}=gs
  const shakeX=shake>0?(Math.random()-.5)*shake*1.5:0
  const bobY=robotY>=GROUND_Y?Math.sin(frame*.4)*1.5:0  // running bob

  return(
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
      <div style={{width:W,display:'flex',justifyContent:'space-between',alignItems:'center',fontFamily:'monospace',fontSize:12}}>
        <span>{[...Array(3)].map((_,i)=><span key={i} style={{fontSize:16}}>{i<lives?'❤️':'🖤'}</span>)}</span>
        <span style={{color:'#ffdd00',fontWeight:900,fontSize:15}}>🪙 {score}</span>
        <span style={{color:timeLeft<=8?'#ff4466':'#888'}}>⏱ {timeLeft}s</span>
      </div>
      {boostTimer>0&&<div style={{width:W,height:4,background:'#111',borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',width:`${(boostTimer/80)*100}%`,background:'#ffdd00',boxShadow:'0 0 8px #ffdd00',transition:'width .05s'}}/></div>}
      <div style={{position:'relative',width:W,height:H_SR,overflow:'hidden',borderRadius:10,border:'1px solid #1a1400',transform:`translate(${shakeX}px,0)`}}>
        {/* Sky gradient */}
        <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#0a0420 0%,#1a0830 40%,#0a1428 100%)'}}/>
        {/* Distant city silhouettes */}
        {[0,40,80,120,160,200,240,290,320].map((bx,i)=>{
          const bh=30+[20,40,30,50,15,45,25,35,20][i]
          const scrolled=((bx-bgOff*.3)%W+W)%W
          return <div key={i} style={{position:'absolute',left:scrolled,bottom:H_SR*(1-GROUND_Y/100)-2,width:28,height:bh,background:'#100820',borderRadius:'2px 2px 0 0'}}/>
        })}
        {/* Scrolling ground */}
        <div style={{position:'absolute',left:0,right:0,top:`${GROUND_Y}%`,bottom:0,background:'#1a0f00'}}/>
        {/* Ground dashes */}
        {[0,60,120,180,240,300,360].map((_,i)=>{
          const gx=((i*60-groundOff)%(W+60)+W+60)%W-30
          return <div key={i} style={{position:'absolute',left:gx,top:`${GROUND_Y}%`,width:40,height:3,background:'#3a2800',borderRadius:2}}/>
        })}
        {/* Boost trail */}
        {boostTimer>0&&[...Array(5)].map((_,i)=>(
          <div key={i} style={{position:'absolute',left:`${18-i*2}%`,top:`${robotY+bobY-(i*.5)}%`,width:8-i,height:8-i,background:'#ffdd00',borderRadius:'50%',opacity:(1-i/5)*.6,transform:'translate(-50%,-50%)'}}/>
        ))}
        {/* Obstacles */}
        {obstacles.map(o=>{
          const oBot=GROUND_Y/100*H_SR, oTop=oBot-o.h
          return <div key={o.id} style={{position:'absolute',left:`${o.x}%`,top:oTop,width:12,height:o.h,background:o.type==='tall'?'linear-gradient(180deg,#ff2200,#aa1100)':'linear-gradient(180deg,#ff6600,#cc4400)',borderRadius:'4px 4px 0 0',boxShadow:`0 0 10px ${o.type==='tall'?'#ff220066':'#ff660066'}`,border:`1px solid ${o.type==='tall'?'#ff4400':'#ff8800'}`}}/>
        })}
        {/* Coins & boosts */}
        {coins.map(o=>(
          <div key={o.id} style={{position:'absolute',left:`${o.x}%`,top:`${o.y}%`,fontSize:o.type==='boost'?22:18,transform:'translate(-50%,-50%)',userSelect:'none',filter:o.type==='boost'?'drop-shadow(0 0 8px #ffdd00)':'none'}}>
            {o.type==='boost'?'⚡':'🪙'}
          </div>
        ))}
        {/* Robot */}
        <div style={{position:'absolute',left:'12%',top:`${robotY+bobY}%`,transform:'translateY(-80%)',transition:'top .02s'}}>
          <Robot cfg={cfg} size={52} mood="idle" flame={boostTimer>0} tilt={jumps>0?-8:0}/>
        </div>
        {/* Particles */}
        {particles.map(p=>(
          p.t
            ?<div key={p.id} style={{position:'absolute',left:p.x,top:p.y,color:p.c,fontFamily:'monospace',fontWeight:900,fontSize:p.s,whiteSpace:'nowrap',opacity:p.life/p.ml,pointerEvents:'none',transform:'translate(-50%,-50%)',textShadow:`0 0 8px ${p.c}`}}>{p.t}</div>
            :<div key={p.id} style={{position:'absolute',left:p.x,top:p.y,width:p.s,height:p.s,background:p.c,borderRadius:'50%',opacity:p.life/p.ml,pointerEvents:'none',transform:'translate(-50%,-50%)'}}/>
        ))}
        {!started&&(
          <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,.75)',gap:12}}>
            <Robot cfg={cfg} size={80} mood="happy"/>
            <div style={{color:'#fff',fontFamily:'monospace',fontWeight:900,fontSize:20,textShadow:`0 0 20px ${cfg.color}`}}>TAP TO RACE!</div>
            <div style={{color:'#666',fontFamily:'monospace',fontSize:11,textAlign:'center',padding:'0 24px'}}>Double-jump walls! Collect 🪙 coins and ⚡ boosts!</div>
          </div>
        )}
      </div>
      <button onPointerDown={doJump}
        style={{...S.btn(cfg.color),width:W,fontSize:20,padding:'16px 0',userSelect:'none',background:jumps>=2?'rgba(255,255,255,.05)':'none'}}>
        {jumps===0?'🏃 JUMP!':jumps===1?'✨ DOUBLE JUMP!':'⏳ (landing…)'}
      </button>
      <div style={{color:'#333',fontFamily:'monospace',fontSize:10}}>Tap JUMP or SPACE / ↑ · Double jump in mid-air!</div>
    </div>
  )
}

// ─── BUILD PHASE ──────────────────────────────────────────────────────────────
function BuildPhase({cfg,setCfg,next}:{cfg:Cfg;setCfg:(c:Cfg)=>void;next:()=>void}) {
  const set=(k:keyof Cfg)=>(v:string)=>setCfg({...cfg,[k]:v as never})
  const Chip=({val,cur,setVal,label,sub}:{val:string;cur:string;setVal:(v:string)=>void;label:string;sub:string})=>(
    <button onClick={()=>setVal(val)} style={{padding:'10px 14px',borderRadius:8,cursor:'pointer',textAlign:'left',background:cur===val?cfg.color:'#111',border:`2px solid ${cur===val?cfg.color:'#2a2a2a'}`,color:cur===val?'#000':'#aaa',fontFamily:'monospace',transition:'all .15s',flex:'1 1 120px'}}>
      <div style={{fontWeight:900,fontSize:13}}>{label}</div>
      <div style={{fontSize:10,opacity:.7,marginTop:2}}>{sub}</div>
    </button>
  )
  const Sec=({label,children}:{label:string;children:React.ReactNode})=>(
    <div style={{marginBottom:18}}>
      <div style={{fontFamily:'monospace',fontSize:10,color:'#555',letterSpacing:2,marginBottom:8,textTransform:'uppercase'}}>{label}</div>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{children}</div>
    </div>
  )
  return(
    <div style={S.page}>
      <h1 style={{...S.title(cfg.color),fontSize:28,margin:'0 0 4px'}}>BUILD YOUR ROBOT</h1>
      <p style={{color:'#444',fontFamily:'monospace',fontSize:10,margin:'0 0 20px',letterSpacing:1}}>PICK YOUR PARTS, THEN PAINT IT!</p>
      <div style={{display:'flex',gap:20,width:'100%',maxWidth:560,flexWrap:'wrap',justifyContent:'center'}}>
        <div style={{flex:1,minWidth:220}}>
          <Sec label="Head">
            <Chip val="round"   cur={cfg.head} setVal={set('head')} label="🔵 Round"   sub="Classic friendly face"/>
            <Chip val="square"  cur={cfg.head} setVal={set('head')} label="🟦 Square"  sub="Strong & tough"/>
            <Chip val="antenna" cur={cfg.head} setVal={set('head')} label="📡 Antenna" sub="Super brain boost"/>
          </Sec>
          <Sec label="Legs">
            <Chip val="basic"   cur={cfg.legs} setVal={set('legs')} label="🦿 Walker"  sub="Go anywhere"/>
            <Chip val="wheels"  cur={cfg.legs} setVal={set('legs')} label="🛞 Wheels"  sub="Unlocks Speed Race!"/>
            <Chip val="rockets" cur={cfg.legs} setVal={set('legs')} label="🚀 Rockets" sub="Unlocks Rocket Fly!"/>
          </Sec>
          <Sec label="Extra Gear">
            <Chip val="none"      cur={cfg.extra} setVal={set('extra')} label="— None"       sub="Keep it clean"/>
            <Chip val="rockets"   cur={cfg.extra} setVal={set('extra')} label="🚀 Boosters"  sub="Side rockets!"/>
            <Chip val="propeller" cur={cfg.extra} setVal={set('extra')} label="🌀 Propeller" sub="Spin on top"/>
            <Chip val="magnet"    cur={cfg.extra} setVal={set('extra')} label="🧲 Magnet"    sub="Wider catch range"/>
          </Sec>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16,paddingTop:8}}>
          <Robot cfg={cfg} size={120} mood="happy"/>
          <button style={S.btn(cfg.color)} onClick={next}>PAINT IT →</button>
        </div>
      </div>
    </div>
  )
}

// ─── PAINT PHASE ─────────────────────────────────────────────────────────────
function PaintPhase({cfg,setCfg,next,back}:{cfg:Cfg;setCfg:(c:Cfg)=>void;next:()=>void;back:()=>void}) {
  return(
    <div style={S.page}>
      <h1 style={{...S.title(cfg.color),fontSize:28,margin:'0 0 4px'}}>PAINT YOUR ROBOT</h1>
      <p style={{color:'#444',fontFamily:'monospace',fontSize:10,margin:'0 0 20px',letterSpacing:1}}>CHOOSE YOUR COLORS!</p>
      <div style={{display:'flex',gap:28,flexWrap:'wrap',justifyContent:'center',alignItems:'flex-start'}}>
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          {(['color','eye'] as const).map(key=>(
            <div key={key}>
              <div style={{fontFamily:'monospace',fontSize:10,color:'#555',letterSpacing:2,marginBottom:10,textTransform:'uppercase'}}>{key==='color'?'Body Color':'Eye & Detail Color'}</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
                {COLORS.map(c=>(
                  <button key={c} onClick={()=>setCfg({...cfg,[key]:c})} style={{width:46,height:46,borderRadius:8,background:c,cursor:'pointer',border:`3px solid ${cfg[key]===c?'#fff':'transparent'}`,boxShadow:cfg[key]===c?`0 0 14px ${c}`:'none',transition:'all .15s'}}/>
                ))}
              </div>
            </div>
          ))}
          <div style={{display:'flex',gap:10}}>
            <button style={S.outline} onClick={back}>← back</button>
            <button style={S.btn(cfg.color)} onClick={next}>LET'S PLAY →</button>
          </div>
        </div>
        <Robot cfg={cfg} size={150} mood="happy"/>
      </div>
    </div>
  )
}

// ─── CHOOSE PHASE ─────────────────────────────────────────────────────────────
function ChoosePhase({cfg,play,back}:{cfg:Cfg;play:(g:MiniGame)=>void;back:()=>void}) {
  const canRocket=cfg.legs==='rockets'||cfg.extra==='rockets'
  const canRace=cfg.legs==='wheels'
  const Card=({emoji,name,color,desc,tag,onClick}:{emoji:string;name:string;color:string;desc:string;tag?:string;onClick:()=>void})=>(
    <button onClick={onClick} style={{background:'#080808',border:`2px solid ${color}44`,borderRadius:12,padding:'14px 16px',cursor:'pointer',textAlign:'left',transition:'all .15s',width:'100%'}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=color;e.currentTarget.style.background='#111'}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=`${color}44`;e.currentTarget.style.background='#080808'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
        <span style={{fontFamily:'monospace',fontWeight:900,fontSize:15,color}}>{emoji} {name}</span>
        {tag&&<span style={{fontFamily:'monospace',fontSize:9,color,background:`${color}22`,padding:'2px 6px',borderRadius:4}}>{tag}</span>}
      </div>
      <div style={{fontFamily:'monospace',fontSize:11,color:'#555',lineHeight:1.6}}>{desc}</div>
    </button>
  )
  return(
    <div style={S.page}>
      <Robot cfg={cfg} size={110} mood="happy"/>
      <h2 style={{...S.title(cfg.color),fontSize:24,margin:'10px 0 4px'}}>CHOOSE YOUR GAME!</h2>
      <div style={{display:'flex',flexDirection:'column',gap:10,width:'100%',maxWidth:340,marginTop:16}}>
        {canRocket&&<Card emoji="🚀" name="Rocket Fly" color={cfg.color} tag="ROCKETS" desc="Boost in short bursts! Dodge asteroids ☄️, fly through laser walls, and collect stars & gems. Combo for big points!" onClick={()=>play('rocket')}/>}
        <Card emoji="⭐" name="Star Catch" color={cfg.eye} desc="Slide left and right to catch falling stars! Avoid 💣 bombs — catch 🧲 magnets for auto-collect power!" onClick={()=>play('stars')}/>
        {canRace&&<Card emoji="🏁" name="Speed Race" color={cfg.color} tag="WHEELS" desc="You're rolling fast! Jump and DOUBLE JUMP over walls. Catch ⚡ boosts to go turbo!" onClick={()=>play('race')}/>}
        {!canRocket&&!canRace&&<p style={{color:'#333',fontFamily:'monospace',fontSize:11,textAlign:'center',lineHeight:1.8}}>Tip: add Rocket Legs or Wheels to unlock 2 more games!</p>}
      </div>
      <button style={{...S.outline,marginTop:20}} onClick={back}>← rebuild</button>
    </div>
  )
}

// ─── GAME OVER ────────────────────────────────────────────────────────────────
function GameOver({cfg,score,game,again,choose,rebuild}:{cfg:Cfg;score:number;game:MiniGame;again:()=>void;choose:()=>void;rebuild:()=>void}) {
  const grade=score>=60?'S':score>=35?'A':score>=18?'B':score>=7?'C':'D'
  const gc=score>=35?'#44ff88':score>=18?'#ffdd00':'#ff4466'
  const msg=score>=60?'INCREDIBLE!':score>=35?'AMAZING!':score>=18?'GREAT JOB!':score>=7?'GOOD TRY!':'KEEP GOING!'
  return(
    <div style={S.page}>
      <Robot cfg={cfg} size={100} mood={score>=18?'happy':'oops'}/>
      <div style={{...S.title(gc),fontSize:56,margin:'8px 0 0',letterSpacing:4}}>{grade}</div>
      <div style={{color:gc,fontFamily:'monospace',fontSize:22,letterSpacing:2,margin:'4px 0'}}>{score} pts</div>
      <div style={{color:gc,fontFamily:'monospace',fontSize:13,marginBottom:4}}>{msg}</div>
      <div style={{color:'#333',fontFamily:'monospace',fontSize:10,marginBottom:24}}>{game==='rocket'?'stars & gems collected':game==='stars'?'stars caught':'coins collected'}</div>
      <div style={{display:'flex',flexDirection:'column',gap:10,width:'100%',maxWidth:280}}>
        <button style={S.btn(cfg.color)} onClick={again}>PLAY AGAIN →</button>
        <button style={S.btn(cfg.eye)}   onClick={choose}>TRY ANOTHER GAME →</button>
        <button style={S.outline}        onClick={rebuild}>← REBUILD ROBOT</button>
      </div>
    </div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function BuildARobot() {
  const [phase,setPhase]=useState<Phase>('build')
  const [cfg,setCfg]=useState<Cfg>(DEF)
  const [game,setGame]=useState<MiniGame>('stars')
  const [score,setScore]=useState(0)
  const [done,setDone]=useState(false)

  const playGame=(g:MiniGame)=>{setGame(g);setDone(false);setScore(0);setPhase('game')}
  const handleDone=(s:number)=>{setScore(s);setDone(true)}

  if(phase==='build') return <BuildPhase cfg={cfg} setCfg={setCfg} next={()=>setPhase('paint')}/>
  if(phase==='paint') return <PaintPhase cfg={cfg} setCfg={setCfg} next={()=>setPhase('choose')} back={()=>setPhase('build')}/>
  if(phase==='choose') return <ChoosePhase cfg={cfg} play={playGame} back={()=>setPhase('paint')}/>
  if(phase==='game'&&done) return <GameOver cfg={cfg} score={score} game={game} again={()=>playGame(game)} choose={()=>setPhase('choose')} rebuild={()=>setPhase('build')}/>

  return(
    <div style={{minHeight:'100vh',background:'#000',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'12px 16px',gap:0}}>
      <button onClick={()=>setPhase('choose')} style={{position:'fixed',top:14,left:16,background:'none',border:'none',color:'#333',fontFamily:'monospace',fontSize:12,cursor:'pointer',letterSpacing:1}}>← back</button>
      {phase==='game'&&game==='rocket'&&<RocketFly cfg={cfg} onDone={handleDone}/>}
      {phase==='game'&&game==='stars'&&<StarCatch cfg={cfg} onDone={handleDone}/>}
      {phase==='game'&&game==='race'&&<SpeedRace cfg={cfg} onDone={handleDone}/>}
    </div>
  )
}

// ─── styles ───────────────────────────────────────────────────────────────────
const S={
  page:{minHeight:'100vh',background:'#000',display:'flex' as const,flexDirection:'column' as const,alignItems:'center' as const,justifyContent:'center' as const,padding:'20px 16px'},
  title:(c:string)=>({color:c,fontFamily:'monospace',fontWeight:900,textShadow:`0 0 12px ${c},0 0 32px ${c}55`}),
  btn:(c:string)=>({background:'none',border:`2px solid ${c}`,borderRadius:8,color:c,fontFamily:'monospace',fontWeight:900,fontSize:14,letterSpacing:2,padding:'13px 24px',cursor:'pointer' as const,boxShadow:`0 0 12px ${c}44`,transition:'box-shadow .2s'}),
  outline:{background:'none',border:'2px solid #2a2a2a',borderRadius:8,color:'#444',fontFamily:'monospace',fontWeight:900,fontSize:13,letterSpacing:1,padding:'12px 24px',cursor:'pointer' as const},
}
