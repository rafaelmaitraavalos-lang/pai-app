'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import GameComplete from '../../components/GameComplete'
import TheAnalyst from '../../components/TheAnalyst'
import rounds from '../../data/rounds/the-resource'
import type { AnalystResult } from '../../components/TheAnalyst'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'

export default function TheResourcePage() {
  const router = useRouter()
  const [done, setDone] = useState(false)

  const handleComplete = (_r: any) => { setDone(true) }


  if (done) return <GameComplete slug="the-resource" />

  return (
    <div style={{ height: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ background: BLACK, padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 22, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
        <button onClick={() => router.push('/games')} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}>
          ← Games
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 640, height: '100%', overflowY: 'auto', padding: '32px 7vw 80px' }}>
          <TheAnalyst rounds={rounds} onComplete={handleComplete} />
        </div>
      </div>
    </div>
  )
}
