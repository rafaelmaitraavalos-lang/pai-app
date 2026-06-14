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

export default function WeightRoomPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'intro' | 'game' | 'done'>('intro')
  const [isPT, setIsPT] = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
  }, [])

  if (phase === 'done') return <GameComplete slug="weight-room" />

  if (phase === 'intro') return (
    <GameIntro
      title={isPT ? 'Sala de Pesos' : 'Weight Room'}
      type="catch"
      description={
        isPT
          ? 'O treinamento da rede neural está em andamento. Pegue as práticas que fazem as redes aprenderem — esquive das que as quebram.'
          : 'Neural network training is underway. Catch the practices that make networks learn — dodge the ones that break them.'
      }
      howToPlay={isPT ? [
        'Itens caem do topo.',
        'PEGUE boas práticas de treinamento que ajudam a rede a aprender.',
        'ESQUIVE de práticas ruins que causam falhas ou viés.',
        'Sua pontuação acompanha quantas boas atualizações você capturou.',
      ] : [
        'Items fall from the top.',
        'CATCH good training practices that help the network learn.',
        'DODGE bad practices that cause failure or bias.',
        'Your score tracks how many good updates you captured.',
      ]}
      onStart={() => setPhase('game')}
      onBack={() => router.push('/games')}
      isPT={isPT}
    />
  )

  const game = isPT ? CATCHER_GAMES_PT['weight-room'] : CATCHER_GAMES['weight-room']

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
