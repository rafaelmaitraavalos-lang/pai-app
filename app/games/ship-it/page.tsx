'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GameComplete from '../../components/GameComplete'
import GameIntro from '../../components/GameIntro'
import TheAnalyst from '../../components/TheAnalyst'
import rounds from '../../data/rounds/ship-it'
import roundsPT from '../../data/rounds/ship-it_pt'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'

export default function ShipItPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'intro' | 'game' | 'done'>('intro')
  const [isPT, setIsPT] = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
  }, [])

  if (phase === 'done') return <GameComplete slug="ship-it" />

  if (phase === 'intro') return (
    <GameIntro
      title={isPT ? 'Lançar' : 'Ship It'}
      type="decide"
      description={
        isPT
          ? 'Você é um líder de produto decidindo se funcionalidades de IA estão prontas para lançar. Construa rápido — mas com responsabilidade.'
          : "You're a product lead deciding whether AI features are ready to ship. Build fast — but build responsibly."
      }
      howToPlay={isPT ? [
        'Leia cada cenário de produto — uma decisão real que equipes enfrentam.',
        'Decida: lançar, lançar com cautela, pausar ou isso é um alerta.',
        'Sua credibilidade sobe quando suas decisões se sustentam.',
      ] : [
        'Read each product scenario — a real decision teams face.',
        'Decide: ship it, ship cautiously, pause, or this is a red flag.',
        'Your credibility rises when your calls hold up.',
      ]}
      onStart={() => setPhase('game')}
      onBack={() => router.push('/home')}
      isPT={isPT}
    />
  )

  return (
    <div style={{ height: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ background: BLACK, padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 22, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
        <button onClick={() => router.push('/home')} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}>
          {isPT ? '← Início' : '← Home'}
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 640, height: '100%', overflowY: 'auto', padding: '32px 7vw 80px' }}>
          <TheAnalyst rounds={isPT ? roundsPT : rounds} onComplete={() => setPhase('done')} isPT={isPT} />
        </div>
      </div>
    </div>
  )
}
