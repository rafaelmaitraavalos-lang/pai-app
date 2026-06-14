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
  const [isPT, setIsPT]   = useState(false)
  const [isSlow, setIsSlow] = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
    const grade = localStorage.getItem('pai_grade') ?? ''
    // Elementary grades: elem, fund1, fund2, K, 1st-5th
    setIsSlow(['elem', 'fund1', 'fund2', 'K', '1st', '2nd', '3rd', '4th', '5th'].includes(grade))
  }, [])

  if (phase === 'done') return <GameComplete slug="signal-drop" />

  if (phase === 'intro') return (
    <GameIntro
      title={isPT ? 'Queda de Sinal' : 'Signal Drop'}
      type="catch"
      description={
        isPT
          ? 'Dados de treinamento estão caindo. A IA aprende com exemplos rotulados — pegue os bons, esquive dos ruins.'
          : 'Training data is falling. AI learns from labeled examples — catch the clean ones, dodge the junk.'
      }
      howToPlay={isPT ? [
        'Itens caem do topo.',
        'PEGUE dados de treinamento rotulados e verificados.',
        'ESQUIVE de dados não rotulados, enviesados ou comprometidos.',
        'Sua pontuação acompanha quantos dados limpos você coletou.',
      ] : [
        'Items fall from the top.',
        'CATCH labeled, verified training data.',
        'DODGE unlabeled, biased, or compromised data.',
        'Your score tracks how much clean data you collected.',
      ]}
      onStart={() => setPhase('game')}
      onBack={() => router.push('/games')}
      isPT={isPT}
    />
  )

  return (
    <div style={{ height: '100vh', background: BLACK, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: BLACK, borderBottom: '1px solid #111', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 18, letterSpacing: '-0.02em', color: GREEN }}>PAI</span>
        <button onClick={() => router.push('/games')} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#444', background: 'none', border: 'none', cursor: 'pointer', touchAction: 'manipulation' }}>
          {isPT ? '← Jogos' : '← Games'}
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <PongGame onComplete={() => setPhase('done')} slow={isSlow} />
      </div>
    </div>
  )
}
