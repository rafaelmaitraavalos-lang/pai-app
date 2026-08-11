'use client'

import { useEffect, useState } from 'react'

// Starburst "Bonus AI Handbook" sticker. Replaces the fixed centered header
// text that printed OVER usernames on narrow screens (2026-08-04): that
// element was position:fixed at 50% with no awareness of its neighbors —
// this one lives in normal page flow, so it cannot collide by construction.
// Opens the handbook via a window event, so any page can host it without
// context plumbing.
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'
const DISP  = "var(--font-display, 'Arial Black', sans-serif)"

const SPIKES = 28
const POINTS = Array.from({ length: SPIKES * 2 }, (_, i) => {
  const r = i % 2 ? 55 : 62
  const a = (Math.PI * i) / SPIKES - Math.PI / 2
  return `${(64 + r * Math.cos(a)).toFixed(2)},${(64 + r * Math.sin(a)).toFixed(2)}`
}).join(' ')

export default function HandbookSticker({ size = 116 }: { size?: number }) {
  const [isPT, setIsPT] = useState(false)
  useEffect(() => { setIsPT(localStorage.getItem('pai_lang') === 'pt') }, [])

  const lines: [string, number, number][] = isPT
    ? [['BÔNUS', 46, 15], ['MANUAL', 76, 24], ['DE IA', 98, 14]]
    : [['BONUS', 46, 15], ['AI', 79, 36], ['HANDBOOK', 100, 13]]

  return (
    <button
      onClick={() => window.dispatchEvent(new Event('pai:open-handbook'))}
      aria-label={isPT ? 'Abrir o Manual de IA (conteúdo bônus)' : 'Open the AI Handbook (bonus content)'}
      style={{
        background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        transform: 'rotate(-8deg)', transition: 'transform 0.15s',
        filter: `drop-shadow(4px 4px 0 ${GREEN}59)`,
        touchAction: 'manipulation', flexShrink: 0, lineHeight: 0,
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'rotate(-4deg) scale(1.06)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'rotate(-8deg)')}
    >
      <svg width={size} height={size} viewBox="0 0 128 128" role="img" aria-hidden="true">
        <polygon points={POINTS} fill={BLACK} />
        {lines.map(([txt, y, fs]) => (
          <text key={txt} x="64" y={y} textAnchor="middle" fill={GREEN}
            style={{ fontFamily: DISP, fontSize: fs, letterSpacing: '0.02em' }}>
            {txt}
          </text>
        ))}
      </svg>
    </button>
  )
}
