'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GameComplete from '../../components/GameComplete'
import GameIntro from '../../components/GameIntro'
import TheAnalyst from '../../components/TheAnalyst'
import rounds from '../../data/rounds/dispatch'
import roundsPT from '../../data/rounds/dispatch_pt'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'

export default function DispatchPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'intro' | 'game' | 'done'>('intro')
  const [isPT, setIsPT] = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
  }, [])

  if (phase === 'done') return <GameComplete slug="dispatch" />

  if (phase === 'intro') return (
    <GameIntro
      title={isPT ? 'Despacho' : 'Dispatch'}
      type="decide"
      description={
        isPT
          ? 'Você é um analista de inteligência avaliando afirmações geopolíticas sobre dominância e estratégia em IA.'
          : "You're an intelligence analyst evaluating geopolitical claims about AI dominance and strategy."
      }
      howToPlay={isPT ? [
        'Leia cada despacho — uma afirmação real sobre IA e poder global.',
        'Decida o quanto levá-la a sério.',
        'Sua credibilidade sobe quando você interpreta os sinais corretamente.',
      ] : [
        'Read each dispatch — a real claim about AI and global power.',
        'Decide how seriously to take it.',
        'Your credibility rises when you read the signals correctly.',
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
