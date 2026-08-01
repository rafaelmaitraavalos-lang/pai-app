'use client'

// Every game gets a way out.
//
// Games that finish through GameComplete offer "Back to <world>", but several —
// Connections among them — end on a "Play again" screen with no exit, and no
// game shows any exit while it is being played. A child who opened a game was
// stuck there. This layout puts one persistent control on every /games/* page.
//
// It sends them to the home that matches their track, so a Brazilian
// middle-school student lands on their own Portuguese home rather than the
// English high-school one.

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { studentTrack, homeRoute } from '../data/track'

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isPT, setIsPT] = useState(false)
  const [home, setHome] = useState('/home')

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
    const track = studentTrack(localStorage.getItem('pai_grade'), localStorage.getItem('pai_lang'))
    setHome(track ? homeRoute(track) : '/home')
  }, [])

  return (
    <>
      {/* overflow-x clip: any game content that overflows (e.g. a heading a
          few px too wide at 280px) would widen the mobile layout viewport and
          drag the fixed Exit button past the visible edge. */}
      <div style={{ overflowX: 'clip' }}>{children}</div>
      <button
        onClick={() => router.push(home)}
        aria-label={isPT ? 'Sair do jogo' : 'Leave game'}
        style={{
          position: 'fixed',
          top: 'calc(env(safe-area-inset-top, 0px) + 12px)',
          right: 'min(12px, 3vw)',
          zIndex: 60,
          fontFamily: "var(--font-display, 'Arial Black', sans-serif)",
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#0a0a0a',
          background: '#3DF542',
          border: '2px solid #0a0a0a',
          boxShadow: '3px 3px 0 0 #0a0a0a',
          padding: '10px 12px',
          cursor: 'pointer',
          touchAction: 'manipulation',
        }}
      >
        {isPT ? '✕ Sair' : '✕ Exit'}
      </button>
    </>
  )
}
