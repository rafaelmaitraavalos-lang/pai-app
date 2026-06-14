'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import GameComplete from '../../components/GameComplete'
import GameIntro from '../../components/GameIntro'
import TheAnalyst from '../../components/TheAnalyst'
import analystRounds from '../../data/analystRounds'
import analystRoundsPT from '../../data/analystRounds_pt'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'

export default function AnalystPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'intro' | 'game' | 'done'>('intro')
  const [isPT,  setIsPT]  = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
  }, [])

  if (phase === 'done') return <GameComplete slug="analyst" />

  const rounds = isPT ? analystRoundsPT : analystRounds

  if (phase === 'intro') return (
    <GameIntro
      title={isPT ? 'O Analista' : 'The Analyst'}
      type="decide"
      description={
        isPT
          ? 'Você é um investidor em IA lendo afirmações reais da história. Cada caso mostra o que pessoas influentes disseram sobre IA na época.'
          : "You're an AI investor reading real claims from history. Each case shows what influential people said about AI at the time."
      }
      howToPlay={isPT ? [
        'Leia o arquivo do caso — uma citação real de uma fonte real.',
        'Decida: você financiaria pesquisa de IA com base nessa afirmação?',
        'Sua credibilidade sobe quando você lê os sinais corretamente.',
        'Os casos de treinamento vêm das lições. Os de teste são novos.',
      ] : [
        'Read the case file — a real quote from a real source.',
        'Decide: would you fund AI research based on this claim?',
        'Your credibility score rises when you read the signals correctly.',
        'Training cases come from your lessons. Test cases are new.',
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
          {isPT ? '← Home' : '← Home'}
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 640, height: '100%', overflowY: 'auto', padding: '32px 7vw 80px' }}>
          <TheAnalyst rounds={rounds} onComplete={() => setPhase('done')} isPT={isPT} />
        </div>
      </div>
    </div>
  )
}
