'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import GameComplete from '../../components/GameComplete'
import TheAnalyst from '../../components/TheAnalyst'
import analystRounds from '../../data/analystRounds'
import analystRoundsPT from '../../data/analystRounds_pt'
import type { AnalystResult } from '../../components/TheAnalyst'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'

export default function AnalystPage() {
  const router = useRouter()
  const [done, setDone] = useState(false)
  const [isPT, setIsPT] = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
  }, [])

  const handleComplete = (_r: any) => { setDone(true) }

  if (done) return <GameComplete slug="analyst" />

  const rounds = isPT ? analystRoundsPT : analystRounds

  return (
    <div style={{ height: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Black PAI header */}
      <div style={{ background: BLACK, padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 22, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
        <button onClick={() => router.push('/home')} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}>
          {isPT ? '← Início' : '← Home'}
        </button>
      </div>

      {/* Game */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 640, height: '100%', overflowY: 'auto', padding: '32px 7vw 80px' }}>
          <TheAnalyst rounds={rounds} onComplete={handleComplete} isPT={isPT} />
        </div>
      </div>
    </div>
  )
}
