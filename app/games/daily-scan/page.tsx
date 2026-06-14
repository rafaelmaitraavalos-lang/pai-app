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

export default function DailyScanPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'intro' | 'game' | 'done'>('intro')
  const [isPT, setIsPT] = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
  }, [])

  if (phase === 'done') return <GameComplete slug="daily-scan" />

  if (phase === 'intro') return (
    <GameIntro
      title={isPT ? 'Varredura Diária' : 'Daily Scan'}
      type="catch"
      description={
        isPT
          ? 'A IA está ao seu redor todos os dias. Pegue as coisas genuinamente alimentadas por IA — esquive das que não são.'
          : 'AI is all around you every day. Catch the things that are genuinely AI-powered — dodge the ones that aren\'t.'
      }
      howToPlay={isPT ? [
        'Itens caem do topo.',
        'PEGUE apps e sistemas que genuinamente usam IA.',
        'ESQUIVE de coisas que parecem IA mas não são.',
        'Sua pontuação acompanha quantas interações reais de IA você identificou.',
      ] : [
        'Items fall from the top.',
        'CATCH apps and systems that genuinely use AI.',
        'DODGE things that just look like AI but aren\'t.',
        'Your score tracks how many real AI interactions you spotted.',
      ]}
      onStart={() => setPhase('game')}
      onBack={() => router.push('/games')}
      isPT={isPT}
    />
  )

  const game = isPT ? CATCHER_GAMES_PT['daily-scan'] : CATCHER_GAMES['daily-scan']

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
