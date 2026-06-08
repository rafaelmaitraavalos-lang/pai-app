'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ELEMENTARY_WORLDS, ELEMENTARY_WORLD_IDS, ELEMENTARY_WORLD_IDS_PT } from '../../data/elementary'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const BLACK = '#0a0a0a'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

export default function ElementaryHome() {
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
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: BODY, display: 'flex', flexDirection: 'column' }}>
      {/* Black PAI header */}
      <div style={{ background: BLACK, padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 22, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
        <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', opacity: 0.5 }}>{isPT ? 'Para Estudantes' : 'For Students'}</span>
      </div>

      <main style={{ maxWidth: 860, width: '100%', margin: '0 auto', padding: '24px 7vw 80px', paddingRight: 'calc(7vw + 12px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>{label}</span>
          <div style={{ flex: 1, borderTop: `1px solid ${FAINT}` }} />
        </div>

        <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {worldIds.map((wid, idx) => {
            const world    = ELEMENTARY_WORLDS[wid]
            const isActive = idx === 0

            return (
              <div key={wid} onClick={() => router.push(`/elementary/world/${wid}`)}
                style={{ display: 'flex', alignItems: 'center', padding: '15px 16px', background: '#EBEBEB', border: `1.5px solid ${BLACK}`, boxShadow: `6px 6px 0 0 ${BLACK}`, cursor: 'pointer', userSelect: 'none' }}>
                <span style={{ fontFamily: BODY, fontSize: 12, color: DIM, width: 36, flexShrink: 0 }}>W{String(idx + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: DISP, fontSize: 17, letterSpacing: '-0.01em', flex: 1, color: BLACK }}>{world.title}</span>
                {isActive && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 14 }}>
                    <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 0 3px ${GREEN}44` }} />
                    {startHere}
                  </span>
                )}
                <span style={{ fontFamily: DISP, fontSize: 14, color: DIM }}>→</span>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
