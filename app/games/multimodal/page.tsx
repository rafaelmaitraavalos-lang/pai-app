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

export default function MultimodalPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'intro' | 'game' | 'done'>('intro')
  const [isPT, setIsPT] = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
  }, [])

  if (phase === 'done') return <GameComplete slug="multimodal" />

  if (phase === 'intro') return (
    <GameIntro
      title={isPT ? 'Multimodal' : 'Multimodal'}
      type="catch"
      description={
        isPT
          ? 'A IA moderna trabalha com texto, imagens, áudio e muito mais. Pegue capacidades multimodais genuínas — esquive das que não são.'
          : 'Modern AI works with text, images, audio, and more. Catch genuine multimodal capabilities — dodge the things that aren\'t.'
      }
      howToPlay={isPT ? [
        'Itens caem do topo.',
        'PEGUE capacidades multimodais genuínas de IA.',
        'ESQUIVE de coisas de modalidade única ou que não são IA.',
        'Sua pontuação mede o quanto você entende o que a IA moderna processa.',
      ] : [
        'Items fall from the top.',
        'CATCH genuine multimodal AI capabilities.',
        'DODGE single-modality or non-AI things.',
        'Your score tracks how well you understand what modern AI can process.',
      ]}
      onStart={() => setPhase('game')}
      onBack={() => router.push('/games')}
      isPT={isPT}
    />
  )

  const game = isPT ? CATCHER_GAMES_PT['multimodal'] : CATCHER_GAMES['multimodal']

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
