'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ELEMENTARY_WORLDS, ELEMENTARY_WORLD_IDS, ELEMENTARY_WORLD_IDS_PT } from '../../../data/elementary'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const BLACK = '#0a0a0a'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

export default function MobileElementaryHome() {
  const router = useRouter()
  const [done, setDone] = useState<Record<number, boolean>>({})
  const [isPT, setIsPT] = useState(false)

  useEffect(() => {
    setIsPT(localStorage.getItem('pai_lang') === 'pt')
    const map: Record<number, boolean> = {}
    Object.values(ELEMENTARY_WORLDS).forEach(w =>
      w.modules.forEach(m => { map[m.id] = localStorage.getItem(`pai_lesson_${m.id}_done`) === 'true' })
    )
    setDone(map)
  }, [])

  const worldIds = isPT ? ELEMENTARY_WORLD_IDS_PT : ELEMENTARY_WORLD_IDS
  const label    = isPT ? 'Seus Mundos' : 'Your Worlds'
  const startHere = isPT ? 'Começar aqui' : 'Start here'

  return (
    <div style={{ minHeight: '100%', background: '#f5f5f5', fontFamily: BODY, display: 'flex', flexDirection: 'column', maxWidth: 480, margin: '0 auto' }}>
      <div style={{ background: BLACK, padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 26, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
        <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', opacity: 0.5 }}>{isPT ? 'Para Estudantes' : 'For Students'}</span>
      </div>

      <main style={{ width: '100%', padding: '20px 20px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <video src="/pig.mp4" autoPlay loop muted playsInline style={{ width: 72, height: 72, objectFit: 'contain', flexShrink: 0 }} />
          <div style={{ fontFamily: DISP, fontSize: 20, color: BLACK, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            {isPT ? 'Olá! Vamos aprender?' : 'Hey! Ready to learn?'}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>{label}</span>
          <div style={{ flex: 1, borderTop: `1px solid ${FAINT}` }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {worldIds.map((wid, idx) => {
            const world    = ELEMENTARY_WORLDS[wid]
            const isActive = idx === 0

            return (
              <div key={wid} onClick={() => router.push(`/mobile/elementary/world/${wid}`)}
                style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', background: '#EBEBEB', border: `1.5px solid ${BLACK}`, boxShadow: `5px 5px 0 0 ${BLACK}`, cursor: 'pointer', userSelect: 'none', gap: 10 }}>
                <span style={{ fontFamily: BODY, fontSize: 11, color: DIM, width: 32, flexShrink: 0 }}>W{String(idx + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: DISP, fontSize: 15, letterSpacing: '-0.01em', flex: 1, color: BLACK, lineHeight: 1.2 }}>{world.title}</span>
                {isActive && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: DISP, fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', flexShrink: 0 }}>
                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: GREEN, boxShadow: `0 0 0 3px ${GREEN}44` }} />
                    {startHere}
                  </span>
                )}
                <span style={{ fontFamily: DISP, fontSize: 14, color: DIM, flexShrink: 0 }}>→</span>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
