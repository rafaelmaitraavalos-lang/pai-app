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

export default function BiasSourcesPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'intro' | 'game' | 'done'>('intro')
  const [isPT, setIsPT] = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
  }, [])

  if (phase === 'done') return <GameComplete slug="bias-sources" />

  if (phase === 'intro') return (
    <GameIntro
      title={isPT ? 'Fontes de Viés' : 'Bias Sources'}
      type="catch"
      description={
        isPT
          ? 'O viés na IA começa com os dados. Pegue fontes reais de viés em sistemas de IA — esquive do que não é realmente uma fonte de viés.'
          : 'AI bias starts with data. Catch real sources of bias in AI systems — dodge the things that aren\'t actually bias sources.'
      }
      howToPlay={isPT ? [
        'Itens caem do topo.',
        'PEGUE fontes genuínas de viés na IA.',
        'ESQUIVE de coisas que não introduzem viés de verdade.',
        'Sua pontuação mede o quanto você entende a origem do viés.',
      ] : [
        'Items fall from the top.',
        'CATCH genuine sources of AI bias.',
        'DODGE things that don\'t actually introduce bias.',
        'Your score tracks how well you understand where bias comes from.',
      ]}
      onStart={() => setPhase('game')}
      onBack={() => router.push('/games')}
      isPT={isPT}
    />
  )

  const game = isPT ? CATCHER_GAMES_PT['bias-sources'] : CATCHER_GAMES['bias-sources']

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
