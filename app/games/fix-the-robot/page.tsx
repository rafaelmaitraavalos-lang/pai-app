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
  options: string[]   // correct fix is first; will be shuffled at runtime
  explanation: string
}

const t = (text: string): Seg => ({ text })
const c = (text: string): Seg => ({ text, chip: true })
const w = (text: string, fix: string): Seg => ({ text, chip: true, wrong: true, fix })

const ROUNDS: Round[] = [
  {
    difficulty: 'easy', time: 25,
    segs: [t('AI stands for '), c('Artificial'), t(' '), w('Pizza', 'Intelligence')],
    options: ['Intelligence', 'Memory', 'Processing', 'Vision'],
    explanation: '🤖 AI stands for Artificial INTELLIGENCE — the ability of computers to think and learn.',
  },
  {
    difficulty: 'easy', time: 25,
    segs: [t('Siri and Alexa are '), w('robot dogs', 'voice assistants'), t(' that use AI')],
    options: ['voice assistants', 'search engines', 'game controllers', 'smart cameras'],
    explanation: '🔊 Siri and Alexa are VOICE ASSISTANTS — AI that listens and responds to what you say.',
  },
  {
    difficulty: 'easy', time: 25,
    segs: [t('AI '), c('learns'), t(' by studying '), w('millions of pizzas', 'lots of data')],
    options: ['lots of data', 'real brains', 'movies and songs', 'math problems'],
    explanation: '📊 AI learns from DATA — billions of examples like photos, sentences, and numbers.',
  },
  {
    difficulty: 'medium', time: 20,
    segs: [t('AI finds '), w('rhymes', 'patterns'), t(' in '), c('data'), t(' to get smarter')],
    options: ['patterns', 'songs', 'pictures', 'music'],
    explanation: '🔍 AI finds PATTERNS in data — like noticing that "furry + four legs + meows = cat."',
  },
  {
    difficulty: 'medium', time: 20,
    segs: [t('ChatGPT is a large '), w('painting', 'language'), t(' model that '), c('generates text')],
    options: ['language', 'picture', 'video', 'sound'],
    explanation: '💬 ChatGPT is a LANGUAGE model — trained on text to read, write, and answer questions.',
  },
  {
    difficulty: 'medium', time: 20,
    segs: [t('AI that only does one task, like play chess, is called '), w('general', 'narrow'), t(' AI')],
    options: ['narrow', 'basic', 'beginner', 'limited'],
    explanation: '♟️ That\'s NARROW AI — expert at one job. GENERAL AI could do anything, and doesn\'t exist yet.',
  },
  {
    difficulty: 'medium', time: 20,
    segs: [t('When AI learns '), c('unfair ideas'), t(' from bad data, it\'s called '), w('a glitch', 'bias')],
    options: ['bias', 'a bug', 'a crash', 'an error'],
    explanation: '⚖️ That\'s BIAS — when bad training data makes AI act unfairly toward certain groups of people.',
  },
  {
    difficulty: 'hard', time: 14,
    segs: [t('Fake AI '), c('videos'), t(' of real people saying things they never said are called '), w('cartoons', 'deepfakes')],
    options: ['deepfakes', 'memes', 'filters', 'animations'],
    explanation: '🎭 Those are DEEPFAKES — AI-made fake videos that look very real and can spread misinformation.',
  },
  {
    difficulty: 'hard', time: 14,
    segs: [t('The challenge of making AI do what '), c('humans'), t(' actually want is called the '), w('debugging', 'alignment'), t(' problem')],
    options: ['alignment', 'training', 'programming', 'testing'],
    explanation: '🎯 The ALIGNMENT problem — making sure AI\'s goals perfectly match what humans actually care about.',
  },
  {
    difficulty: 'hard', time: 14,
    segs: [t('AI that could do any intellectual task a '), c('human'), t(' can do would be called '), w('narrow', 'general'), t(' AI')],
    options: ['general', 'universal', 'human-level', 'super'],
    explanation: '🌐 That\'s GENERAL AI (AGI) — it doesn\'t exist yet. All current AI is narrow, not general.',
  },
]

const ROUNDS_PT: Round[] = [
  {
    difficulty: 'easy', time: 25,
    segs: [t('IA quer dizer '), c('Inteligência'), t(' '), w('Pizza', 'Artificial')],
    options: ['Artificial', 'Memória', 'Processamento', 'Visão'],
    explanation: '🤖 IA significa Inteligência ARTIFICIAL — a capacidade dos computadores de pensar e aprender.',
  },
  {
    difficulty: 'easy', time: 25,
    segs: [t('Siri e Alexa são '), w('cães robôs', 'assistentes de voz'), t(' que usam IA')],
    options: ['assistentes de voz', 'motores de busca', 'controles de jogo', 'câmeras inteligentes'],
    explanation: '🔊 Siri e Alexa são ASSISTENTES DE VOZ — IA que ouve e responde ao que você fala.',
  },
  {
    difficulty: 'easy', time: 25,
    segs: [t('A IA '), c('aprende'), t(' estudando '), w('milhões de pizzas', 'muitos dados')],
    options: ['muitos dados', 'cérebros reais', 'filmes e músicas', 'problemas de matemática'],
    explanation: '📊 A IA aprende com DADOS — bilhões de exemplos como fotos, frases e números.',
  },
  {
    difficulty: 'medium', time: 20,
    segs: [t('A IA encontra '), w('rimas', 'padrões'), t(' nos '), c('dados'), t(' para ficar mais inteligente')],
    options: ['padrões', 'músicas', 'imagens', 'sons'],
    explanation: '🔍 A IA encontra PADRÕES nos dados — como perceber que "peludo + 4 patas + mia = gato".',
  },
  {
    difficulty: 'medium', time: 20,
    segs: [t('ChatGPT é um grande modelo de '), w('pintura', 'linguagem'), t(' que '), c('gera texto')],
    options: ['linguagem', 'imagem', 'vídeo', 'som'],
    explanation: '💬 ChatGPT é um modelo de LINGUAGEM — treinado em textos para ler, escrever e responder perguntas.',
  },
  {
    difficulty: 'medium', time: 20,
    segs: [t('Uma IA que só faz uma tarefa, como jogar xadrez, é chamada de IA '), w('geral', 'estreita')],
    options: ['estreita', 'básica', 'iniciante', 'limitada'],
    explanation: '♟️ Isso é IA ESTREITA — especialista numa coisa. IA GERAL poderia fazer tudo, e ainda não existe.',
  },
  {
    difficulty: 'medium', time: 20,
    segs: [t('Quando a IA aprende '), c('ideias injustas'), t(' de dados ruins, isso se chama '), w('falha', 'viés')],
    options: ['viés', 'um bug', 'uma travada', 'um erro'],
    explanation: '⚖️ Isso é VIÉS — quando dados ruins fazem a IA agir de forma injusta com certas pessoas.',
  },
  {
    difficulty: 'hard', time: 14,
    segs: [t('Vídeos falsos de IA de pessoas reais dizendo coisas que nunca disseram se chamam '), w('desenhos', 'deepfakes')],
    options: ['deepfakes', 'memes', 'filtros', 'animações'],
    explanation: '🎭 São DEEPFAKES — vídeos falsos feitos por IA que parecem muito reais e podem espalhar mentiras.',
  },
  {
    difficulty: 'hard', time: 14,
    segs: [t('O desafio de fazer a IA fazer o que os '), c('humanos'), t(' querem de verdade se chama problema de '), w('depuração', 'alinhamento')],
    options: ['alinhamento', 'treinamento', 'programação', 'teste'],
    explanation: '🎯 O problema de ALINHAMENTO — garantir que os objetivos da IA correspondam ao que os humanos se importam.',
  },
  {
    difficulty: 'hard', time: 14,
    segs: [t('Uma IA que pudesse fazer qualquer tarefa que um '), c('humano'), t(' pode fazer seria chamada de IA '), w('estreita', 'geral')],
    options: ['geral', 'universal', 'de nível humano', 'super'],
    explanation: '🌐 Isso seria IA GERAL (IAG) — não existe ainda. Toda IA atual é estreita, não geral.',
  },
]

// ── shuffle helper ─────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Types ──────────────────────────────────────────────────────────────────

type Screen = 'title' | 'play' | 'result' | 'gameover'
type Phase  = 'find' | 'replace'   // find the wrong word, then pick the replacement

// ── Component ──────────────────────────────────────────────────────────────

export default function FixTheRobot() {
  const router = useRouter()
  const [screen,       setScreen]       = useState<Screen>('title')
  const [phase,        setPhase]        = useState<Phase>('find')
  const [idx,          setIdx]          = useState(0)
  const [score,        setScore]        = useState(0)
  const [streak,       setStreak]       = useState(0)
  const [timeLeft,     setTimeLeft]     = useState(ROUNDS[0].time)
  const [foundCorrect, setFoundCorrect] = useState(false)   // clicked the right chip in 'find'
  const [fixedCorrect, setFixedCorrect] = useState<boolean | null>(null)   // picked right option
  const [shuffled,     setShuffled]     = useState<string[]>([])
  const [isPT,         setIsPT]         = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => { setIsPT(localStorage.getItem('pai_lang') === 'pt') }, [])

  const rounds = isPT ? ROUNDS_PT : ROUNDS
  const round  = rounds[idx]

  // shuffle options whenever round changes
  useEffect(() => {
    setShuffled(shuffle(round.options))
  }, [idx, round.options])

  // timer only runs during 'find' phase
  useEffect(() => {
    if (screen !== 'play' || phase !== 'find') return
    setTimeLeft(round.time)
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current!); handleTimeout(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current!)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, idx, phase])

  function handleTimeout() {
    // ran out of time — didn't find the wrong word
    setFoundCorrect(false)
    setFixedCorrect(false)
    setScreen('result')
  }

  function handleChipClick(seg: Seg) {
    clearInterval(timerRef.current!)
    if (seg.wrong) {
      // Found the right chip! Now ask them to replace it
      setFoundCorrect(true)
      setPhase('replace')
    } else {
      // Clicked a correct word — wrong!
      setFoundCorrect(false)
      setFixedCorrect(false)
      setStreak(0)
      setScreen('result')
    }
  }

  function handleOptionPick(option: string) {
    const fix = round.segs.find(s => s.wrong)?.fix ?? ''
    const isRight = option === fix
    setFixedCorrect(isRight)
    const pts = isRight ? 100 + timeLeft * 10 : 40   // partial credit for finding but wrong replacement
    setScore(s => s + pts)
    setStreak(st => isRight ? st + 1 : 0)
    setScreen('result')
  }

  function next() {
    setFoundCorrect(false); setFixedCorrect(null); setPhase('find')
    if (idx + 1 >= rounds.length) { setScreen('gameover'); return }
    setIdx(i => i + 1)
    setScreen('play')
  }

  function restart() {
    setIdx(0); setScore(0); setStreak(0)
    setFoundCorrect(false); setFixedCorrect(null); setPhase('find')
    setScreen('title')
  }

  const timerPct   = (timeLeft / round.time) * 100
  const timerColor = timerPct > 50 ? GREEN : timerPct > 25 ? YELLOW : PINK
  const diffColor  = round.difficulty === 'easy' ? GREEN : round.difficulty === 'medium' ? YELLOW : PINK
  const wrongSeg   = round.segs.find(s => s.wrong)

  // mood during play depends on phase
  const playMood: Mood = phase === 'find' ? 'thinking' : 'happy'
  const resultMood: Mood = fixedCorrect ? 'happy' : 'sad'

  // ── title ────────────────────────────────────────────────────────────────
  if (screen === 'title') return (
    <div style={S.root}>
      <button onClick={() => router.back()} style={S.backBtn}>{isPT ? '← voltar' : '← back'}</button>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: 18 }}>
        <img src="/pai-mascot.png" alt="PAI" style={{ width: 70, height: 70, objectFit: 'contain', background: '#000', borderRadius: 8 }} />
        <Robot mood="idle"/>
        <h1 style={{ ...S.neon(PINK), fontSize: 36, letterSpacing: 4, textAlign:'center', lineHeight: 1.2 }}>
          {isPT ? 'CONSERTE O ROBÔ' : 'FIX THE ROBOT'}
        </h1>
        <div style={{ background:'#0d0d0d', border:'1px solid #222', borderRadius:10, padding:'14px 18px', maxWidth:300 }}>
          <p style={{ color:'#aaa', fontFamily:'monospace', fontSize: 13, textAlign:'center', lineHeight: 1.8, margin:0 }}>
            {isPT ? <>
              <span style={{color:YELLOW,fontWeight:900}}>Etapa 1:</span> O robô diz algo errado.<br/>
              <span style={{color:GREEN,fontWeight:900}}>Encontre</span> a palavra errada e toque nela.<br/><br/>
              <span style={{color:YELLOW,fontWeight:900}}>Etapa 2:</span> Toque na <span style={{color:GREEN,fontWeight:900}}>substituição correta</span><br/>
              entre as opções mostradas.
            </> : <>
              <span style={{color:YELLOW,fontWeight:900}}>Step 1:</span> The robot says something wrong.<br/>
              <span style={{color:GREEN,fontWeight:900}}>Find</span> the wrong word and tap it.<br/><br/>
              <span style={{color:YELLOW,fontWeight:900}}>Step 2:</span> Tap the <span style={{color:GREEN,fontWeight:900}}>correct</span> replacement<br/>
              from the options shown.
            </>}
          </p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap: 8, width: 280 }}>
          {isPT ? ([
            [GREEN,  'Fácil',  '3 rodadas · erros óbvios · 25s'],
            [YELLOW, 'Médio',  '4 rodadas · erros sutis  · 20s'],
            [PINK,   'Difícil','3 rodadas · erros difíceis · 14s'],
          ] as const).map(([c,label,desc]) => (
            <div key={label} style={{ display:'flex', gap: 10 }}>
              <span style={{ color: c, fontFamily:'monospace', fontSize: 11, flexShrink: 0, marginTop: 1 }}>■</span>
              <span style={{ color:'#777', fontFamily:'monospace', fontSize: 12 }}>
                <b style={{ color: c }}>{label}:</b> {desc}
              </span>
            </div>
          )) : ([
            [GREEN,  'Easy',   '3 rounds · obvious mistakes · 25s'],
            [YELLOW, 'Medium', '4 rounds · sneaky mistakes  · 20s'],
            [PINK,   'Hard',   '3 rounds · tricky mistakes  · 14s'],
          ] as const).map(([c,label,desc]) => (
            <div key={label} style={{ display:'flex', gap: 10 }}>
              <span style={{ color: c, fontFamily:'monospace', fontSize: 11, flexShrink: 0, marginTop: 1 }}>■</span>
              <span style={{ color:'#777', fontFamily:'monospace', fontSize: 12 }}>
                <b style={{ color: c }}>{label}:</b> {desc}
              </span>
            </div>
          ))}
        </div>
        <button style={S.bigBtn(GREEN)} onClick={() => setScreen('play')}>{isPT ? 'COMEÇAR →' : 'START →'}</button>
      </div>
    </div>
  )

  // ── result ───────────────────────────────────────────────────────────────
  if (screen === 'result') {
    const pts = fixedCorrect ? 100 + timeLeft * 10 : fixedCorrect === false && foundCorrect ? 40 : 0
    const headline =
      !foundCorrect   ? (timeLeft <= 0 ? (isPT ? '⏱ TEMPO ESGOTADO' : '⏱ TIME UP') : (isPT ? '✗ PALAVRA ERRADA' : '✗ WRONG WORD')) :
      fixedCorrect    ? (isPT ? '✓ CONSERTADO!' : '✓ FIXED!') :
                        (isPT ? '✗ SUBSTITUIÇÃO ERRADA' : '✗ WRONG REPLACEMENT')
    const headlineColor = fixedCorrect ? GREEN : PINK

    return (
      <div style={S.root}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: 14, width:'100%', maxWidth: 460 }}>
          <Robot mood={resultMood}/>

          <div style={{ ...S.neon(headlineColor), fontSize: 22, letterSpacing: 3 }}>
            {headline}
          </div>

          {/* Show corrected sentence */}
          <div style={{ background:'#0d0d0d', border:`1px solid ${fixedCorrect ? GREEN : PINK}33`,
            borderRadius: 10, padding:'14px 16px', width:'100%',
            boxShadow:`0 0 18px ${fixedCorrect ? GREEN : PINK}22` }}>
            <div style={{ fontFamily:'monospace', fontSize: 11, color:'#444', marginBottom: 8, letterSpacing:1 }}>{isPT ? 'FRASE CORRIGIDA:' : 'CORRECTED SENTENCE:'}</div>
            <div style={{ fontFamily:'monospace', fontSize: 14, color:'#ccc', lineHeight: 1.8 }}>
              {round.segs.map((seg, i) => {
                if (seg.wrong) return (
                  <span key={i}>
                    <span style={{ textDecoration:'line-through', color: PINK, opacity:0.7 }}>{seg.text}</span>
                    {' '}
                    <span style={{ color: GREEN, fontWeight: 900, background:'#002200', padding:'1px 6px', borderRadius:4 }}>{seg.fix}</span>
                  </span>
                )
                if (seg.chip) return (
                  <span key={i} style={{ color:'#88cc44', background:'#0d1a0d', padding:'1px 8px', borderRadius:4, margin:'0 2px' }}>{seg.text}</span>
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
              🔥 {streak} {isPT ? 'seguidos!' : 'in a row!'}
            </div>
          )}

          <div style={{ color: pts > 0 ? GREEN : '#333', fontFamily:'monospace', fontSize: 20, letterSpacing: 2 }}>
            {pts > 0 ? `+${pts} pts` : '+0 pts'}
          </div>
          <div style={{ color:'#333', fontFamily:'monospace', fontSize: 11 }}>{isPT ? 'Total:' : 'Total:'} {score} pts</div>

          <button style={S.bigBtn(fixedCorrect ? GREEN : PINK)} onClick={next}>
            {idx + 1 >= rounds.length ? (isPT ? 'VER RESULTADOS →' : 'SEE RESULTS →') : (isPT ? 'PRÓXIMO →' : 'NEXT →')}
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
          <video src="/pai3.mp4" autoPlay loop muted playsInline style={{ width: 90, height: 90, objectFit: 'contain', background: '#000', borderRadius: 8 }} />
          <Robot mood="happy"/>
          <div style={{ ...S.neon(GREEN), fontSize: 26, letterSpacing: 3 }}>{isPT ? 'ROBÔ CONSERTADO!' : 'ROBOT FIXED!'}</div>
          <div style={{ ...S.neon(gc), fontSize: 80, letterSpacing: 8 }}>{grade}</div>
          <div style={{ color: GREEN, fontFamily:'monospace', fontSize: 22, letterSpacing: 2 }}>{score} pts</div>
          <div style={{ color:'#333', fontFamily:'monospace', fontSize: 11 }}>{rounds.length} {isPT ? 'rodadas · máx' : 'rounds · max'} {maxScore} pts</div>
          <div style={{ color:'#555', fontFamily:'monospace', fontSize: 12, textAlign:'center', maxWidth: 280, lineHeight: 1.7, marginTop: 4 }}>
            {isPT
              ? (pct >= 75 ? 'Ótimo trabalho! Você realmente conhece o vocabulário de IA.' : pct >= 50 ? 'Bom trabalho — continue aprendendo os termos de IA!' : 'Continue praticando — você vai consertar esse robô em breve!')
              : (pct >= 75 ? 'Great job! You really know your AI vocab.' : pct >= 50 ? 'Nice work — keep learning those AI terms!' : 'Keep practicing — you\'ll fix that robot soon!')}
          </div>
          <button style={S.bigBtn(PINK)} onClick={restart}>{isPT ? 'JOGAR DE NOVO →' : 'PLAY AGAIN →'}</button>
          <button onClick={() => router.back()} style={{ background:'none', border:'none', color:'#333',
            fontFamily:'monospace', fontSize: 11, cursor:'pointer', marginTop: 4 }}>{isPT ? '← voltar' : '← back'}</button>
        </div>
      </div>
    )
  }

  // ── play: FIND phase ──────────────────────────────────────────────────────
  if (phase === 'find') return (
    <div style={S.root}>
      {/* HUD */}
      <div style={{ width:'100%', maxWidth: 460, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 6 }}>
        <span style={{ color:'#333', fontFamily:'monospace', fontSize: 11 }}>
          {idx + 1} / {rounds.length}
          &nbsp;&nbsp;
          <span style={{ color: diffColor }}>{'■'.repeat(round.difficulty === 'easy' ? 1 : round.difficulty === 'medium' ? 2 : 3)}</span>
          <span style={{ color:'#1a1a1a' }}>{'■'.repeat(3 - (round.difficulty === 'easy' ? 1 : round.difficulty === 'medium' ? 2 : 3))}</span>
          &nbsp;{isPT ? (round.difficulty === 'easy' ? 'fácil' : round.difficulty === 'medium' ? 'médio' : 'difícil') : round.difficulty}
        </span>
        <span style={{ color: GREEN, fontFamily:'monospace', fontSize: 12 }}>{score} pts</span>
      </div>

      {/* Timer bar */}
      <div style={{ width:'100%', maxWidth: 460, height: 4, background:'#0d0d0d', borderRadius: 2, marginBottom: 14, overflow:'hidden' }}>
        <div style={{ height:'100%', borderRadius: 2, width:`${timerPct}%`,
          background: timerColor, transition:'width 1s linear, background 0.3s',
          boxShadow:`0 0 8px ${timerColor}` }}/>
      </div>

      <Robot mood={playMood}/>

      {/* Step label */}
      <div style={{ marginTop:10, marginBottom:4, fontFamily:'monospace', fontSize:11, color:'#555', letterSpacing:2 }}>
        {isPT ? 'ETAPA 1 DE 2' : 'STEP 1 OF 2'}
      </div>
      <div style={{ ...S.neon(PINK), fontSize:22, letterSpacing:3, marginBottom:10 }}>
        {isPT ? 'ENCONTRE A PALAVRA ERRADA' : 'FIND THE WRONG WORD'}
      </div>

      {/* Speech bubble */}
      <div style={{ width:'100%', maxWidth: 420 }}>
        <div style={{ width: 0, height: 0, marginLeft: 48,
          borderLeft:'10px solid transparent',
          borderRight:'10px solid transparent',
          borderBottom:`12px solid #1a1a1a` }}/>
        <div style={{ background:'#0d0d0d', border:'1px solid #222', borderRadius: 12,
          padding:'16px 18px', boxShadow:'0 4px 24px rgba(0,0,0,0.8)' }}>

          <div style={{ fontFamily:'monospace', fontSize: 11, color:'#444', marginBottom: 10, letterSpacing: 1 }}>
            {isPT ? 'O ROBÔ DIZ...' : 'THE ROBOT SAYS...'}
          </div>

          {/* Sentence — chips are clickable */}
          <div style={{ fontSize: 16, lineHeight: 2.2, color:'#ccc', fontFamily:'monospace' }}>
            {round.segs.map((seg, i) => {
              if (!seg.chip) return <span key={i}>{seg.text}</span>
              return (
                <button
                  key={i}
                  onClick={() => handleChipClick(seg)}
                  style={{
                    display:'inline',
                    padding:'4px 12px',
                    margin:'0 3px',
                    background: '#100018',
                    border:`2px solid ${PINK}88`,
                    borderRadius: 6,
                    color: '#ff88bb',
                    fontFamily:'monospace',
                    fontSize: 15,
                    cursor:'pointer',
                    verticalAlign:'middle',
                    transition:'all 0.1s',
                    boxShadow:`0 0 10px ${PINK}22`,
                  }}
                >
                  {seg.text}
                </button>
              )
            })}
          </div>

          <div style={{ marginTop: 14, fontFamily:'monospace', fontSize: 12, color: PINK,
            letterSpacing:1, display:'flex', alignItems:'center', gap:6 }}>
            <span style={{fontSize:16}}>☝️</span> {isPT ? 'TOQUE NA PALAVRA ERRADA ACIMA' : 'TAP THE WRONG WORD ABOVE'}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, color: timerColor, fontFamily:'monospace', fontSize: 13,
        textShadow:`0 0 8px ${timerColor}`, letterSpacing: 1 }}>
        {timeLeft}s
      </div>
    </div>
  )

  // ── play: REPLACE phase ───────────────────────────────────────────────────
  return (
    <div style={S.root}>
      {/* HUD */}
      <div style={{ width:'100%', maxWidth: 460, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 14 }}>
        <span style={{ color:'#333', fontFamily:'monospace', fontSize: 11 }}>
          {idx + 1} / {rounds.length}
        </span>
        <span style={{ color: GREEN, fontFamily:'monospace', fontSize: 12 }}>{score} pts</span>
      </div>

      <Robot mood="happy"/>

      {/* Step label */}
      <div style={{ marginTop:10, marginBottom:4, fontFamily:'monospace', fontSize:11, color:'#555', letterSpacing:2 }}>
        {isPT ? 'ETAPA 2 DE 2' : 'STEP 2 OF 2'}
      </div>
      <div style={{ ...S.neon(GREEN), fontSize:20, letterSpacing:2, marginBottom:10, textAlign:'center' }}>
        {isPT ? '✓ ACHOU! AGORA CONSERTE.' : '✓ FOUND IT! NOW FIX IT.'}
      </div>

      {/* Sentence with wrong word shown crossed out */}
      <div style={{ width:'100%', maxWidth: 420, background:'#0d0d0d', border:`1px solid ${PINK}44`,
        borderRadius:12, padding:'14px 18px', marginBottom:18 }}>
        <div style={{ fontFamily:'monospace', fontSize:11, color:'#444', marginBottom:8, letterSpacing:1 }}>
          {isPT ? 'A PALAVRA ERRADA ERA:' : 'THE WRONG WORD WAS:'}
        </div>
        <div style={{ fontSize: 15, lineHeight: 2, color:'#ccc', fontFamily:'monospace' }}>
          {round.segs.map((seg, i) => {
            if (seg.wrong) return (
              <span key={i} style={{
                background:`${PINK}22`, border:`2px solid ${PINK}88`,
                borderRadius:6, padding:'3px 10px', color: PINK,
                textDecoration:'line-through', textDecorationColor: PINK,
                fontWeight:900,
              }}>{seg.text}</span>
            )
            if (seg.chip) return (
              <span key={i} style={{ color:'#88cc44', background:'#0d1a0d',
                padding:'2px 8px', borderRadius:4, margin:'0 2px' }}>{seg.text}</span>
            )
            return <span key={i}>{seg.text}</span>
          })}
        </div>
      </div>

      {/* Replacement options */}
      <div style={{ width:'100%', maxWidth: 420 }}>
        <div style={{ fontFamily:'monospace', fontSize:12, color:'#555', letterSpacing:2, marginBottom:12, textAlign:'center' }}>
          {isPT ? 'TOQUE NA SUBSTITUIÇÃO CORRETA ↓' : 'TAP THE CORRECT REPLACEMENT ↓'}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {shuffled.map((opt, i) => (
            <button key={i} onClick={() => handleOptionPick(opt)}
              style={{
                padding:'14px 10px',
                background:'#060606',
                border:`2px solid ${GREEN}55`,
                borderRadius:8,
                color: GREEN,
                fontFamily:'monospace',
                fontSize:14,
                fontWeight:900,
                cursor:'pointer',
                boxShadow:`0 0 10px ${GREEN}18`,
                transition:'all 0.1s',
              }}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=`${GREEN}18`}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background='#060606'}}
            >
              {opt}
            </button>
          ))}
        </div>
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
    padding: '24px 16px', gap: 0,
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
