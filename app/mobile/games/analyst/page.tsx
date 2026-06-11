'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TheAnalyst from '../../../components/TheAnalyst'
import analystRounds from '../../../data/analystRounds'
import MobileGameComplete from '../../../components/MobileGameComplete'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'

export default function MobileAnalystPage() {
  const router = useRouter()
  const [done, setDone] = useState(false)

  if (done) return <MobileGameComplete slug="analyst" />

  return (
    <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: BLACK, padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 20, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
        <button onClick={() => router.push('/mobile/home')} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6, padding: '8px 0 8px 16px' }}>
          ← Home
        </button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: '100%', overflowY: 'auto', padding: '24px 20px 80px' }}>
          <TheAnalyst rounds={analystRounds} onComplete={() => setDone(true)} />
        </div>
      </div>
    </div>
  )
}
