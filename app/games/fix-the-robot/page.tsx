'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const PINK   = '#ff2d78'
const GREEN  = '#39ff14'
const YELLOW = '#ffdd00'

// ── Robot ──────────────────────────────────────────────────────────────────

type Mood = 'idle' | 'happy' | 'sad' | 'thinking'

const Robot = ({ mood }: { mood: Mood }) => {
  const eye = mood === 'happy' ? GREEN : mood === 'sad' ? PINK : mood === 'thinking' ? YELLOW : '#555'
  return (
    <svg viewBox="0 0 100 130" width="88" height="114" style={{ filter: `drop-shadow(0 0 14px ${eye}66)` }}>
      <line x1="50" y1="18" x2="50" y2="4" stroke="#444" strokeWidth="2.5"/>
      <circle cx="50" cy="3" r="4" fill={eye} style={{ filter: `drop-shadow(0 0 6px ${eye})` }}/>
      <rect x="15" y="18" width="70" height="56" rx="10" fill="#111" stroke="#2a2a2a" strokeWidth="1.5"/>
      <rect x="24" y="30" width="20" height="14" rx="3" fill="#000"/>
      <rect x="56" y="30" width="20" height="14" rx="3" fill="#000"/>
      <rect x={mood === 'happy' ? 28 : 26} y="33" width="12" height="8" rx="2" fill={eye}
        style={{ filter: `drop-shadow(0 0 5px ${eye})` }}/>
      <rect x={mood === 'happy' ? 60 : 58} y="33" width="12" height="8" rx="2" fill={eye}
        style={{ filter: `drop-shadow(0 0 5px ${eye})` }}/>
      {mood === 'idle'     && <line x1="33" y1="56" x2="67" y2="56" stroke="#444" strokeWidth="2.5" strokeLinecap="round"/>}
      {mood === 'happy'    && <path d="M33 53 Q50 64 67 53" stroke={GREEN} strokeWidth="2.5" fill="none" strokeLinecap="round"/>}
      {mood === 'sad'      && <path d="M33 61 Q50 51 67 61" stroke={PINK}  strokeWidth="2.5" fill="none" strokeLinecap="round"/>}
      {mood === 'thinking' && <g>
        <circle cx="39" cy="57" r="2.5" fill={YELLOW}/>
        <circle cx="50" cy="57" r="2.5" fill={YELLOW}/>
        <circle cx="61" cy="57" r="2.5" fill={YELLOW}/>
      </g>}
      <rect x="22" y="77" width="56" height="42" rx="7" fill="#0d0d0d" stroke="#222" strokeWidth="1.5"/>
      <circle cx="38" cy="98" r="5" fill={mood === 'happy' ? GREEN  : '#181818'} stroke="#2a2a2a" strokeWidth="1"/>
      <circle cx="50" cy="98" r="5" fill={mood === 'thinking' ? YELLOW : '#181818'} stroke="#2a2a2a" strokeWidth="1"/>
      <circle cx="62" cy="98" r="5" fill={mood === 'sad' ? PINK   : '#181818'} stroke="#2a2a2a" strokeWidth="1"/>
      <rect x="5"  y="80" width="15" height="28" rx="5" fill="#111" stroke="#222" strokeWidth="1.5"/>
      <rect x="80" y="80" width="15" height="28" rx="5" fill="#111" stroke="#222" strokeWidth="1.5"/>
    </svg>
  )
}

// ── Round data ─────────────────────────────────────────────────────────────

interface Seg {
  text: string
  chip?: boolean
  wrong?: boolean
  fix?: string
}

interface Round {
  difficulty: 'easy' | 'medium' | 'hard'
  time: number
  segs: Seg[]
  explanation: string
}

const t = (text: string): Seg => ({ text })
const c = (text: string): Seg => ({ text, chip: true })
const w = (text: string, fix: string): Seg => ({ text, chip: true, wrong: true, fix })

const ROUNDS: Round[] = [
  {
    difficulty: 'easy', time: 25,
    segs: [t('AI stands for '), c('Artificial'), t(' '), w('Pizza', 'Intelligence')],
    explanation: '🤖 AI stands for Artificial INTELLIGENCE — the ability of computers to think and learn.',
  },
  {
    difficulty: 'easy', time: 25,
    segs: [t('Siri and Alexa are '), w('robot dogs', 'voice assistants'), t(' that use AI')],
    explanation: '🔊 Siri and Alexa are VOICE ASSISTANTS — AI that listens and responds to what you say.',
  },
  {
    difficulty: 'easy', time: 25,
    segs: [t('AI '), c('learns'), t(' by studying '), w('millions of pizzas', 'lots of data')],
    explanation: '📊 AI learns from DATA — billions of examples like photos, sentences, and numbers.',
  },
  {
    difficulty: 'medium', time: 18,
    segs: [t('AI finds '), w('rhymes', 'patterns'), t(' in '), c('data'), t(' to get smarter')],
    explanation: '🔍 AI finds PATTERNS in data — like noticing that "furry + four legs + meows = cat."',
  },
  {
    difficulty: 'medium', time: 18,
    segs: [t('ChatGPT is a large '), w('painting', 'language'), t(' model that '), c('generates text')],
    explanation: '💬 ChatGPT is a LANGUAGE model — trained on text to read, write, and answer questions.',
  },
  {
    difficulty: 'medium', time: 18,
    segs: [t('AI that only does one task, like play chess, is called '), w('general', 'narrow'), t(' AI')],
    explanation: '♟️ That\'s NARROW AI — expert at one job. GENERAL AI could do anything, and doesn\'t exist yet.',
  },
  {
    difficulty: 'medium', time: 18,
    segs: [t('When AI learns '), c('unfair ideas'), t(' from bad data, it\'s called '), w('a glitch', 'bias')],
    explanation: '⚖️ That\'s BIAS — when bad training data makes AI act unfairly toward certain groups of people.',
  },
  {
    difficulty: 'hard', time: 12,
    segs: [t('Fake AI '), c('videos'), t(' of real people saying things they never said are called '), w('cartoons', 'deepfakes')],
    explanation: '🎭 Those are DEEPFAKES — AI-made fake videos that look very real and can spread misinformation.',
  },
  {
    difficulty: 'hard', time: 12,
    segs: [t('The challenge of making AI do what '), c('humans'), t(' actually want is called the '), w('debugging', 'alignment'), t(' problem')],
    explanation: '🎯 The ALIGNMENT problem — making sure AI\'s goals perfectly match what humans actually care about.',
  },
  {
    difficulty: 'hard', time: 12,
    segs: [t('AI that could do any intellectual task a '), c('human'), t(' can do would be called '), w('narrow', 'general'), t(' AI')],
    explanation: '🌐 That\'s GENERAL AI (AGI) — it doesn\'t exist yet. All current AI is narrow, not general.',
  },
]

// ── Types ──────────────────────────────────────────────────────────────────

type Screen = 'title' | 'play' | 'result' | 'gameover'

// ── Component ──────────────────────────────────────────────────────────────

export default function FixTheRobot() {
  const router = useRouter()
  const [screen,   setScreen]   = useState<Screen>('title')
  const [idx,      setIdx]      = useState(0)
  const [score,    setScore]    = useState(0)
  const [streak,   setStreak]   = useState(0)
  const [timeLeft, setTimeLeft] = useState(ROUNDS[0].time)
  const [picked,   setPicked]   = useState<Seg | null>(null)
  const [correct,  setCorrect]  = useState<boolean | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const round = ROUNDS[idx]

  useEffect(() => {
    if (screen !== 'play') return
    setTimeLeft(round.time)
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current!); handlePick(null); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current!)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, idx])

  function handlePick(seg: Seg | null) {
    clearInterval(timerRef.current!)
    const isRight = seg?.wrong === true
    const pts = isRight ? 100 + timeLeft * 10 : 0
    setPicked(seg)
    setCorrect(isRight)
    setScore(s => s + pts)
    setStreak(st => isRight ? st + 1 : 0)
    setScreen('result')
  }

  function next() {
    setPicked(null); setCorrect(null)
    if (idx + 1 >= ROUNDS.length) { setScreen('gameover'); return }
    setIdx(i => i + 1)
    setScreen('play')
  }

  function restart() {
    setIdx(0); setScore(0); setStreak(0); setPicked(null); setCorrect(null); setScreen('title')
  }

  const timerPct   = (timeLeft / round.time) * 100
  const timerColor = timerPct > 50 ? GREEN : timerPct > 25 ? YELLOW : PINK
  const diffColor  = round.difficulty === 'easy' ? GREEN : round.difficulty === 'medium' ? YELLOW : PINK
  const mood: Mood = screen === 'play' ? 'thinking' : correct ? 'happy' : correct === false ? 'sad' : 'idle'
  const wrongSeg   = round.segs.find(s => s.wrong)

  // ── title ────────────────────────────────────────────────────────────────
  if (screen === 'title') return (
    <div style={S.root}>
      <button onClick={() => router.back()} style={S.backBtn}>← back</button>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: 18 }}>
        <Robot mood="idle"/>
        <h1 style={{ ...S.neon(PINK), fontSize: 36, letterSpacing: 4, textAlign:'center', lineHeight: 1.2 }}>
          FIX THE ROBOT
        </h1>
        <p style={{ color:'#666', fontFamily:'monospace', fontSize: 13, textAlign:'center', maxWidth: 300, lineHeight: 1.7 }}>
          The robot says something wrong.<br/>
          Tap the broken word to fix it!
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap: 8, width: 280 }}>
          {([
            [GREEN,  'Easy',   '3 rounds · obvious mistakes · 25s each'],
            [YELLOW, 'Medium', '4 rounds · sneaky mistakes  · 18s each'],
            [PINK,   'Hard',   '3 rounds · tricky mistakes  · 12s each'],
          ] as const).map(([c,label,desc]) => (
            <div key={label} style={{ display:'flex', gap: 10 }}>
              <span style={{ color: c, fontFamily:'monospace', fontSize: 11, flexShrink: 0, marginTop: 1 }}>■</span>
              <span style={{ color:'#777', fontFamily:'monospace', fontSize: 12 }}>
                <b style={{ color: c }}>{label}:</b> {desc}
              </span>
            </div>
          ))}
        </div>
        <button style={S.bigBtn(GREEN)} onClick={() => setScreen('play')}>START →</button>
      </div>
    </div>
  )

  // ── result ───────────────────────────────────────────────────────────────
  if (screen === 'result') {
    const pts = correct ? 100 + timeLeft * 10 : 0
    return (
      <div style={S.root}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: 14, width:'100%', maxWidth: 460 }}>
          <Robot mood={mood}/>

          <div style={{ ...S.neon(correct ? GREEN : PINK), fontSize: 22, letterSpacing: 3 }}>
            {picked === null ? '⏱ TIME UP' : correct ? '✓ FIXED IT!' : '✗ WRONG WORD'}
          </div>

          {/* Show corrected sentence */}
          <div style={{ background:'#0d0d0d', border:`1px solid ${correct ? GREEN : PINK}33`,
            borderRadius: 10, padding:'14px 16px', width:'100%',
            boxShadow:`0 0 18px ${correct ? GREEN : PINK}22` }}>
            <div style={{ fontFamily:'monospace', fontSize: 11, color:'#444', marginBottom: 8 }}>CORRECTED SENTENCE:</div>
            <div style={{ fontFamily:'monospace', fontSize: 14, color:'#ccc', lineHeight: 1.7 }}>
              {round.segs.map((seg, i) => {
                if (seg.wrong) return (
                  <span key={i}>
                    <span style={{ textDecoration:'line-through', color: PINK }}>{seg.text}</span>
                    {' '}
                    <span style={{ color: GREEN, fontWeight: 900 }}>{seg.fix}</span>
                  </span>
                )
                return <span key={i}>{seg.text}</span>
              })}
            </div>
          </div>

          <div style={{ color:'#aaa', fontFamily:'monospace', fontSize: 13, textAlign:'center',
            maxWidth: 320, lineHeight: 1.6, background:'#080808', border:'1px solid #1a1a1a',
            borderRadius: 8, padding:'10px 14px' }}>
            {round.explanation}
          </div>

          {streak > 1 && (
            <div style={{ color: YELLOW, fontFamily:'monospace', fontSize: 13, letterSpacing: 1 }}>
              🔥 {streak} in a row!
            </div>
          )}

          <div style={{ color: correct ? GREEN : '#333', fontFamily:'monospace', fontSize: 20, letterSpacing: 2 }}>
            {correct ? `+${pts} pts` : '+0 pts'}
          </div>
          <div style={{ color:'#333', fontFamily:'monospace', fontSize: 11 }}>Total: {score} pts</div>

          <button style={S.bigBtn(correct ? GREEN : PINK)} onClick={next}>
            {idx + 1 >= ROUNDS.length ? 'SEE RESULTS →' : 'NEXT →'}
          </button>
        </div>
      </div>
    )
  }

  // ── gameover ─────────────────────────────────────────────────────────────
  if (screen === 'gameover') {
    const maxScore = ROUNDS.reduce((a, r) => a + 100 + r.time * 10, 0)
    const pct   = Math.round((score / maxScore) * 100)
    const grade = pct >= 90 ? 'S' : pct >= 75 ? 'A' : pct >= 55 ? 'B' : pct >= 35 ? 'C' : 'D'
    const gc    = pct >= 75 ? GREEN : pct >= 55 ? YELLOW : PINK
    return (
      <div style={S.root}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: 16 }}>
          <Robot mood="happy"/>
          <div style={{ ...S.neon(GREEN), fontSize: 26, letterSpacing: 3 }}>ROBOT FIXED!</div>
          <div style={{ ...S.neon(gc), fontSize: 80, letterSpacing: 8 }}>{grade}</div>
          <div style={{ color: GREEN, fontFamily:'monospace', fontSize: 22, letterSpacing: 2 }}>{score} pts</div>
          <div style={{ color:'#333', fontFamily:'monospace', fontSize: 11 }}>{ROUNDS.length} rounds · max {maxScore} pts</div>
          <div style={{ color:'#555', fontFamily:'monospace', fontSize: 12, textAlign:'center', maxWidth: 280, lineHeight: 1.7, marginTop: 4 }}>
            {pct >= 75
              ? 'Great job! You really know your AI vocab.'
              : pct >= 50
              ? 'Nice work — keep learning those AI terms!'
              : 'Keep practicing — you\'ll fix that robot soon!'}
          </div>
          <button style={S.bigBtn(PINK)} onClick={restart}>PLAY AGAIN →</button>
          <button onClick={() => router.back()} style={{ background:'none', border:'none', color:'#333',
            fontFamily:'monospace', fontSize: 11, cursor:'pointer', marginTop: 4 }}>← back</button>
        </div>
      </div>
    )
  }

  // ── play ─────────────────────────────────────────────────────────────────
  return (
    <div style={S.root}>
      {/* HUD */}
      <div style={{ width:'100%', maxWidth: 460, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 6 }}>
        <span style={{ color:'#333', fontFamily:'monospace', fontSize: 11 }}>
          {idx + 1} / {ROUNDS.length}
          &nbsp;&nbsp;
          <span style={{ color: diffColor }}>{'■'.repeat(round.difficulty === 'easy' ? 1 : round.difficulty === 'medium' ? 2 : 3)}</span>
          <span style={{ color:'#1a1a1a' }}>{'■'.repeat(3 - (round.difficulty === 'easy' ? 1 : round.difficulty === 'medium' ? 2 : 3))}</span>
          &nbsp;{round.difficulty}
        </span>
        <span style={{ color: GREEN, fontFamily:'monospace', fontSize: 12 }}>{score} pts</span>
      </div>

      {/* Timer bar */}
      <div style={{ width:'100%', maxWidth: 460, height: 4, background:'#0d0d0d', borderRadius: 2, marginBottom: 14, overflow:'hidden' }}>
        <div style={{ height:'100%', borderRadius: 2, width:`${timerPct}%`,
          background: timerColor, transition:'width 1s linear, background 0.3s',
          boxShadow:`0 0 8px ${timerColor}` }}/>
      </div>

      <Robot mood="thinking"/>

      {/* Speech bubble */}
      <div style={{ width:'100%', maxWidth: 420, marginTop: 8 }}>
        {/* Bubble tail */}
        <div style={{ width: 0, height: 0, marginLeft: 48,
          borderLeft:'10px solid transparent',
          borderRight:'10px solid transparent',
          borderBottom:`12px solid #1a1a1a` }}/>
        <div style={{ background:'#0d0d0d', border:'1px solid #222', borderRadius: 12,
          padding:'16px 18px', boxShadow:'0 4px 24px rgba(0,0,0,0.8)' }}>

          <div style={{ fontFamily:'monospace', fontSize: 11, color:'#444', marginBottom: 10, letterSpacing: 1 }}>
            I THINK...
          </div>

          {/* Sentence */}
          <div style={{ fontSize: 16, lineHeight: 2, color:'#ccc', fontFamily:'monospace' }}>
            {round.segs.map((seg, i) => {
              if (!seg.chip) return <span key={i}>{seg.text}</span>
              return (
                <button
                  key={i}
                  onClick={() => handlePick(seg)}
                  style={{
                    display:'inline',
                    padding:'3px 10px',
                    margin:'0 3px',
                    background: '#0d1a0d',
                    border:`1.5px solid ${GREEN}44`,
                    borderRadius: 6,
                    color: '#88cc44',
                    fontFamily:'monospace',
                    fontSize: 15,
                    cursor:'pointer',
                    verticalAlign:'middle',
                    transition:'all 0.1s',
                    boxShadow:`0 0 8px ${GREEN}18`,
                  }}
                >
                  {seg.text}
                </button>
              )
            })}
          </div>

          <div style={{ marginTop: 12, fontFamily:'monospace', fontSize: 11, color:'#333' }}>
            TAP THE WRONG WORD ↑
          </div>
        </div>
      </div>

      {/* Timer display */}
      <div style={{ marginTop: 12, color: timerColor, fontFamily:'monospace', fontSize: 13,
        textShadow:`0 0 8px ${timerColor}`, letterSpacing: 1 }}>
        {timeLeft}s
      </div>
    </div>
  )
}

// ── Styles ─────────────────────────────────────────────────────────────────
const S = {
  root: {
    minHeight: '100vh', background: '#000',
    display: 'flex' as const, flexDirection: 'column' as const,
    alignItems: 'center' as const, justifyContent: 'center' as const,
    padding: '24px 16px',
  },
  neon: (c: string) => ({
    color: c, fontFamily: 'monospace', fontWeight: 900,
    textShadow: `0 0 10px ${c}, 0 0 30px ${c}55`,
  }),
  bigBtn: (c: string) => ({
    width: '100%' as const, maxWidth: 300, padding: '14px 0',
    background: 'none', border: `2px solid ${c}`, borderRadius: 6,
    color: c, fontFamily: 'monospace', fontSize: 15, fontWeight: 900,
    letterSpacing: 2, cursor: 'pointer' as const,
    boxShadow: `0 0 12px ${c}44`,
  }),
  backBtn: {
    position: 'fixed' as const, top: 14, left: 16,
    background: 'none', border: 'none', color: '#333',
    fontFamily: 'monospace', fontSize: 12, cursor: 'pointer' as const, letterSpacing: 1,
  },
}
