'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GameComplete from '../../components/GameComplete'
import ConnectionsGame from '../../components/ConnectionsGame'
import puzzle from '../../data/puzzles/what-is-agi'
import puzzlePT from '../../data/puzzles/what-is-agi_pt'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'

export default function WhatIsAgiPage() {
  const router = useRouter()
  const [done, setDone] = useState(false)
  const [isPT, setIsPT] = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
  }, [])

  if (done) return <GameComplete slug="what-is-agi" />

  return (
    <div style={{ height: '100vh', background: '#f9f6f0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: BLACK, borderBottom: '1px solid #111', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 18, letterSpacing: '-0.02em', color: GREEN }}>PAI</span>
        <button onClick={() => router.push('/games')} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6, touchAction: 'manipulation' }}>
          {isPT ? '← Jogos' : '← Games'}
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '24px 16px 80px' }}>
        <ConnectionsGame key={isPT ? 'pt' : 'en'} puzzle={isPT ? puzzlePT : puzzle} onComplete={() => setDone(true)} isPT={isPT} />
      </div>
    </div>
  )
}
