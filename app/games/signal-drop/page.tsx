'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GameComplete from '../../components/GameComplete'
import GameIntro from '../../components/GameIntro'
import PongGame from '../../components/PongGame'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'

export default function SignalDropPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'intro' | 'game' | 'done'>('intro')
  const [isPT, setIsPT]     = useState(false)
  const [isSlow, setIsSlow] = useState(false)
  const [backRoute, setBackRoute] = useState('/home')

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
    const grade = localStorage.getItem('pai_grade') ?? ''
    const elemGrades = ['elem', 'fund1', 'K', '1st', '2nd', '3rd', '4th', '5th']
    const midPTGrades = ['fund2']
    const midGrades   = ['middle']
    setIsSlow([...elemGrades, ...midPTGrades].includes(grade))
    if (elemGrades.includes(grade))       setBackRoute('/elementary/home')
    else if (midPTGrades.includes(grade)) setBackRoute('/elementary/middle-pt')
    else if (midGrades.includes(grade))   setBackRoute('/middle/home')
    else                                  setBackRoute('/home')
  }, [])

  if (phase === 'done') return <GameComplete slug="signal-drop" />

  if (phase === 'intro') return (
    <GameIntro
      title={isPT ? 'Queda de Sinal' : 'Signal Drop'}
      type="catch"
      description={
        isPT
          ? 'Você é o paddle. A bola carrega dados de treinamento. Mantenha o rally vivo para coletar dados limpos — deixe a bola cair e você perde qualidade.'
          : "You're the paddle. The ball carries training data. Keep the rally going to collect clean data — let it drop and you lose quality."
      }
      howToPlay={isPT ? [
        'Mova o paddle para rebater a bola.',
        'Combos aumentam sua pontuação — não deixe cair.',
        'Cada rally representa dados de treinamento sendo coletados.',
        'Sua pontuação acompanha quantos dados limpos você coletou.',
      ] : [
        'Items fall from the top.',
        'CATCH labeled, verified training data.',
        'DODGE unlabeled, biased, or compromised data.',
        'Your score tracks how much clean data you collected.',
      ]}
      onStart={() => setPhase('game')}
      onBack={() => router.push(backRoute)}
      isPT={isPT}
    />
  )

  return (
    <div style={{ height: '100vh', background: BLACK, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: BLACK, borderBottom: '1px solid #111', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 18, letterSpacing: '-0.02em', color: GREEN }}>PAI</span>
        <button onClick={() => router.push(backRoute)} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#444', background: 'none', border: 'none', cursor: 'pointer', touchAction: 'manipulation' }}>
          {isPT ? '← Jogos' : '← Games'}
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <PongGame onComplete={() => setPhase('done')} slow={isSlow} skipIntro />
      </div>
    </div>
  )
}
