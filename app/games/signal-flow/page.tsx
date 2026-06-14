'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GameComplete from '../../components/GameComplete'
import GameIntro from '../../components/GameIntro'
import CatcherGame from '../../components/CatcherGame'
import { CATCHER_GAMES } from '../../data/catcherGames'
import { CATCHER_GAMES_PT } from '../../data/catcherGames_pt'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'

export default function SignalFlowPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'intro' | 'game' | 'done'>('intro')
  const [isPT, setIsPT] = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
  }, [])

  if (phase === 'done') return <GameComplete slug="signal-flow" />

  if (phase === 'intro') return (
    <GameIntro
      title={isPT ? 'Fluxo de Sinal' : 'Signal Flow'}
      type="catch"
      description={
        isPT
          ? 'Os dados fluem por uma rede neural camada por camada. Pegue os cálculos válidos — esquive dos que interrompem o fluxo.'
          : 'Data flows through a neural network layer by layer. Catch the valid computations — dodge the ones that break the flow.'
      }
      howToPlay={isPT ? [
        'Itens caem do topo.',
        'PEGUE computações válidas de redes neurais.',
        'ESQUIVE de valores e operações que quebrariam a rede.',
        'Sua pontuação mede o quão limpo é o seu forward pass.',
      ] : [
        'Items fall from the top.',
        'CATCH valid neural network computations.',
        'DODGE values and operations that would break the network.',
        'Your score tracks how clean your forward pass is.',
      ]}
      onStart={() => setPhase('game')}
      onBack={() => router.push('/games')}
      isPT={isPT}
    />
  )

  const game = isPT ? CATCHER_GAMES_PT['signal-flow'] : CATCHER_GAMES['signal-flow']

  return (
    <div style={{ height: '100vh', background: BLACK, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: BLACK, borderBottom: '1px solid #111', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 18, letterSpacing: '-0.02em', color: GREEN }}>PAI</span>
        <button onClick={() => router.push('/games')} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6, touchAction: 'manipulation' }}>
          {isPT ? '← Jogos' : '← Games'}
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <CatcherGame key={isPT ? 'pt' : 'en'} game={game} onComplete={() => setPhase('done')} isPT={isPT} />
      </div>
    </div>
  )
}
