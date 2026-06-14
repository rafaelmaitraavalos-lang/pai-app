'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GameIntro from '../../components/GameIntro'
import TimelineGame from '../../components/TimelineGame'
import timelinePuzzle from '../../data/timelinePuzzle'
import timelinePuzzlePT from '../../data/timelinePuzzle_pt'

export default function TimelinePage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'intro' | 'game'>('intro')
  const [isPT, setIsPT]   = useState(false)
  const [key, setKey]     = useState(0)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
  }, [])

  if (phase === 'intro') return (
    <GameIntro
      title={isPT ? 'Linha do Tempo' : 'Timeline'}
      type="decide"
      description={
        isPT
          ? 'Coloque os momentos da IA em ordem cronológica e separe o real do exagero.'
          : 'Sort AI moments into chronological order and separate the real from the hype.'
      }
      howToPlay={isPT ? [
        'Arraste os cartões para colocá-los na ordem certa.',
        'Um cartão já está fixo como âncora.',
        'Erros revelam onde o cartão realmente pertence.',
        'Depois, separe os fatos reais dos exageros.',
      ] : [
        'Drag cards into the correct chronological order.',
        'One card is already fixed as your anchor.',
        'Mistakes reveal where the card actually belongs.',
        'Then sort the real facts from the hype.',
      ]}
      onStart={() => setPhase('game')}
      onBack={() => router.push('/games')}
      isPT={isPT}
    />
  )

  return (
    <div
      className="min-h-screen bg-[#F5F1EB] flex flex-col items-center"
      style={{ animation: 'pageIn 0.3s ease-out' }}
    >
      <div className="w-full border-b border-[#E0DDD8] bg-white flex items-center justify-between py-4 px-6 mb-6">
        <button
          onClick={() => router.push('/games')}
          className="text-[11px] font-black tracking-widest uppercase text-[#aaa] hover:text-[#333] transition-colors cursor-pointer bg-transparent border-none"
        >
          {isPT ? '← Jogos' : '← Games'}
        </button>
        <h1 className="text-base font-black text-[#1a1a1a] tracking-tight">
          {isPT ? 'Linha do Tempo' : 'Sort the Timeline'}
        </h1>
        <div style={{ width: 60 }} />
      </div>

      <div className="w-full pb-12" style={{ maxWidth: 580 }}>
        <TimelineGame
          key={key}
          puzzle={isPT ? timelinePuzzlePT : timelinePuzzle}
          onComplete={() => console.log('done')}
        />
      </div>

      <button
        onClick={() => setKey(k => k + 1)}
        className="fixed bottom-4 right-4 px-3 py-1.5 text-[11px] font-black text-[#aaa] border border-[#ddd] rounded-full bg-white hover:border-[#BA7517] hover:text-[#BA7517] transition-colors cursor-pointer"
      >
        {isPT ? 'Reiniciar' : 'Reset'}
      </button>
    </div>
  )
}
