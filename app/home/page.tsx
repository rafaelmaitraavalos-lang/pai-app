'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { WORLDS, WORLD_IDS } from '../data'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const BLACK = '#0a0a0a'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

export default function Home() {
  const router = useRouter()
  const [done, setDone] = useState<Record<number, boolean>>({})

  useEffect(() => {
    const map: Record<number, boolean> = {}
    Object.values(WORLDS).forEach(w =>
      w.modules.forEach(m => { map[m.id] = localStorage.getItem(`pai_lesson_${m.id}_done`) === 'true' })
    )
    setDone(map)
  }, [])

  const worldDone     = (id: number) => WORLDS[id].modules.every(m => done[m.id])
  const worldUnlocked = (id: number) => id === 1 || worldDone(id - 1)

  const activeWorldId = (() => {
    for (const wid of WORLD_IDS) {
      if (!worldUnlocked(wid)) break
      if (!worldDone(wid)) return wid
    }
    return null
  })()

  const worldRoute = (id: number) => id === 1 ? '/lessons' : `/world/${id}`

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: BODY, display: 'flex', flexDirection: 'column' }}>

      {/* Black PAI header */}
      <div style={{ background: BLACK, padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 22, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
        <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', opacity: 0.5 }}>AI Literacy</span>
      </div>

      <main style={{ maxWidth: 860, width: '100%', margin: '0 auto', padding: '24px 7vw 80px', paddingRight: 'calc(7vw + 12px)' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>Contents</span>
          <div style={{ flex: 1, borderTop: `1px solid ${FAINT}` }} />
        </div>

        <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {WORLD_IDS.map(wid => {
            const world    = WORLDS[wid]
            const unlocked = worldUnlocked(wid)
            const isActive = wid === activeWorldId

            return (
              <div
                key={wid}
                onClick={unlocked ? () => router.push(worldRoute(wid)) : undefined}
                style={{
                  display: 'flex', alignItems: 'center',
                  padding: '15px 16px',
                  background: unlocked ? '#EBEBEB' : '#f5f5f5',
                  border: `1.5px solid ${unlocked ? BLACK : FAINT}`,
                  boxShadow: unlocked ? `6px 6px 0 0 ${BLACK}` : 'none',
                  cursor: unlocked ? 'pointer' : 'default',
                  opacity: unlocked ? 1 : 0.45,
                  userSelect: 'none',
                }}
              >
                <span style={{ fontFamily: BODY, fontSize: 12, color: DIM, width: 36, flexShrink: 0 }}>
                  W{String(wid).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: DISP, fontSize: 17, letterSpacing: '-0.01em', flex: 1, color: BLACK }}>
                  {world.title}
                </span>
                <span style={{ fontFamily: BODY, fontSize: 12, color: DIM, marginRight: 16 }}>
                  {world.level}
                </span>
                {isActive && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 14 }}>
                    <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 0 3px ${GREEN}44` }} />
                    In Progress
                  </span>
                )}
                {!unlocked && (
                  <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: FAINT, border: `1px solid ${FAINT}`, padding: '2px 7px' }}>Locked</span>
                )}
                {unlocked && (
                  <span style={{ fontFamily: DISP, fontSize: 14, color: DIM }}>→</span>
                )}
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
