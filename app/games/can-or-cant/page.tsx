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

export default function CanOrCantPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'intro' | 'game' | 'done'>('intro')
  const [isPT, setIsPT] = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
  }, [])

  if (phase === 'done') return <GameComplete slug="can-or-cant" />

  if (phase === 'intro') return (
    <GameIntro
      title={isPT ? 'Pode ou Não Pode' : 'Can or Can\'t'}
      type="catch"
      description={
        isPT
          ? '2025: a IA faz algumas coisas excepcionalmente bem e falha surpreendentemente em outras. Pegue o que ela realmente consegue fazer.'
          : '2025: AI can do some things remarkably well and fails surprisingly hard at others. Catch what it can actually do.'
      }
      howToPlay={isPT ? [
        'Itens caem do topo.',
        'PEGUE coisas que a IA genuinamente consegue fazer em 2025.',
        'ESQUIVE de coisas que a IA ainda não faz de forma confiável.',
        'Sua pontuação mede o quanto você conhece as capacidades atuais da IA.',
      ] : [
        'Items fall from the top.',
        'CATCH things AI genuinely can do in 2025.',
        'DODGE things AI cannot reliably do yet.',
        'Your score tracks how accurately you know current AI capabilities.',
      ]}
      onStart={() => setPhase('game')}
      onBack={() => router.push('/games')}
      isPT={isPT}
    />
  )

  const game = isPT ? CATCHER_GAMES_PT['can-or-cant'] : CATCHER_GAMES['can-or-cant']

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
