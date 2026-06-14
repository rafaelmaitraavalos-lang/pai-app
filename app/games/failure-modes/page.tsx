'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GameComplete from '../../components/GameComplete'
import GameIntro from '../../components/GameIntro'
import ConnectionsGame from '../../components/ConnectionsGame'
import puzzle from '../../data/puzzles/failure-modes'
import puzzlePT from '../../data/puzzles/failure-modes_pt'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'

export default function FailureModesPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'intro' | 'game' | 'done'>('intro')
  const [isPT, setIsPT] = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
  }, [])

  if (phase === 'done') return <GameComplete slug="failure-modes" />

  if (phase === 'intro') return (
    <GameIntro
      title={isPT ? 'Modos de Falha' : 'Failure Modes'}
      type="group"
      description={
        isPT
          ? 'Quando as decisões de IA dão errado, elas dão errado de maneiras reconhecíveis. Agrupe estas cartas em 4 tipos de falhas de IA.'
          : 'When AI decisions go wrong, they go wrong in recognizable ways. Group these cards into 4 types of AI failures.'
      }
      howToPlay={isPT ? [
        '16 cartas, 4 categorias ocultas.',
        'Selecione 4 cartas que você acha que pertencem juntas e envie.',
        'Você tem 4 erros antes do jogo terminar.',
        'Os grupos mais difíceis valem a pena notar — procure os complicados.',
      ] : [
        '16 cards, 4 hidden categories.',
        'Select 4 cards you think belong together and submit.',
        'You get 4 mistakes before the game ends.',
        'Harder groups are worth noticing — look for the tricky ones.',
      ]}
      onStart={() => setPhase('game')}
      onBack={() => router.push('/games')}
      isPT={isPT}
    />
  )

  return (
    <div style={{ height: '100vh', background: '#f9f6f0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: BLACK, borderBottom: '1px solid #111', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 18, letterSpacing: '-0.02em', color: GREEN }}>PAI</span>
        <button onClick={() => router.push('/games')} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6, touchAction: 'manipulation' }}>
          {isPT ? '← Jogos' : '← Games'}
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '24px 16px 80px' }}>
        <ConnectionsGame key={isPT ? 'pt' : 'en'} puzzle={isPT ? puzzlePT : puzzle} onComplete={() => setPhase('done')} isPT={isPT} />
      </div>
    </div>
  )
}
