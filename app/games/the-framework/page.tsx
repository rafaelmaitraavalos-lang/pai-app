'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GameComplete from '../../components/GameComplete'
import GameIntro from '../../components/GameIntro'
import TheAnalyst from '../../components/TheAnalyst'
import rounds from '../../data/rounds/the-framework'
import roundsPT from '../../data/rounds/the-framework_pt'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'

export default function TheFrameworkPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'intro' | 'game' | 'done'>('intro')
  const [isPT, setIsPT] = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
  }, [])

  if (phase === 'done') return <GameComplete slug="the-framework" />

  if (phase === 'intro') return (
    <GameIntro
      title={isPT ? 'O Framework' : 'The Framework'}
      type="decide"
      description={
        isPT
          ? 'Você é membro de um conselho de ética avaliando dilemas reais sobre como sistemas de IA devem ser construídos e usados.'
          : "You're an ethics board member evaluating real dilemmas about how AI systems should be built and used."
      }
      howToPlay={isPT ? [
        'Leia cada dilema ético sobre IA.',
        'Decida a resposta correta com base no que você aprendeu.',
        'Sua credibilidade sobe quando seu raciocínio se sustenta.',
      ] : [
        'Read each ethical dilemma about AI.',
        'Decide the right response based on what you\'ve learned.',
        'Your credibility rises when your reasoning holds up.',
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
