'use client'

import { useState } from 'react'
import GameComplete from '../../components/GameComplete'
import { useRouter } from 'next/navigation'
import ConnectionsGame, { type CompletionResult } from '../../components/ConnectionsGame'
import puzzle from '../../data/puzzles/data-trails'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'

export default function DataTrailsPage() {
  const router = useRouter()
  const [result, setResult] = useState<CompletionResult | null>(null)
  const [key, setKey] = useState(0)


  if (result) return <GameComplete slug="data-trails" />

  return (
    <div style={{ minHeight: '100vh', background: '#f9f6f0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', background: BLACK, borderBottom: '1px solid #111', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 18, letterSpacing: '-0.02em', color: GREEN }}>PAI</span>
        <button onClick={() => router.push('/games')} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6, touchAction: 'manipulation' }}>
          ← Games
        </button>
      </div>
      <div style={{ width: '100%', maxWidth: 620, padding: '32px 16px 80px' }}>
        <ConnectionsGame key={key} puzzle={puzzle} onComplete={r => setResult(r)} />
      </div>
    </div>
  )
}
