'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GameComplete from '../../components/GameComplete'
import GameIntro from '../../components/GameIntro'
import PongGame from '../../components/PongGame'
import { studentTrack, homeRoute } from '../../data/track'

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
    const track = studentTrack(localStorage.getItem('pai_grade'), localStorage.getItem('pai_lang'))
    setIsSlow(track === 'elem-en' || track === 'elem-pt' || track === 'middle-pt')
    setBackRoute(track ? homeRoute(track) : '/home')
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
        'Move the paddle to bounce the ball.',
        "Combos raise your score — don't let the ball drop.",
        'Each rally is training data being collected.',
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
