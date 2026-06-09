'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { WORLDS, WORLD_IDS } from '../../data'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const BLACK = '#0a0a0a'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

export default function MobileHome() {
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

  const worldRoute = (id: number) => id === 1 ? '/mobile/lessons' : `/mobile/world/${id}`

  return (
    <div style={{ minHeight: '100%', background: '#f5f5f5', fontFamily: BODY, display: 'flex', flexDirection: 'column', maxWidth: 480, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ background: BLACK, padding: '18px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: DISP, fontSize: 26, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
        <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#fff', opacity: 0.4 }}>AI Literacy</span>
      </div>

      {/* Section label */}
      <div style={{ padding: '20px 20px 10px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM }}>Worlds</span>
        <div style={{ flex: 1, borderTop: `1px solid ${FAINT}` }} />
      </div>

      {/* World list */}
      <div style={{ flex: 1, padding: '0 16px 40px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {WORLD_IDS.map(wid => {
          const world    = WORLDS[wid]
          const unlocked = worldUnlocked(wid)
          const isActive = wid === activeWorldId
          const isDone   = worldDone(wid)

          return (
            <div
              key={wid}
              onClick={unlocked ? () => router.push(worldRoute(wid)) : undefined}
              style={{
                background: unlocked ? '#fff' : '#fafafa',
                border: `1.5px solid ${unlocked ? BLACK : FAINT}`,
                boxShadow: unlocked ? `5px 5px 0 0 ${BLACK}` : 'none',
                cursor: unlocked ? 'pointer' : 'default',
                opacity: unlocked ? 1 : 0.5,
                padding: '18px 16px',
                userSelect: 'none',
              }}
            >
              {/* Top row: number + level */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: BODY, fontSize: 11, color: DIM, letterSpacing: '0.04em' }}>
                  W{String(wid).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: BODY, fontSize: 11, color: DIM }}>
                  {world.level}
                </span>
              </div>

              {/* Title */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontFamily: DISP, fontSize: 20, letterSpacing: '-0.01em', color: BLACK, lineHeight: 1.1, flex: 1 }}>
                  {world.title}
                </span>
                {unlocked && !isDone && (
                  <span style={{ fontFamily: DISP, fontSize: 18, color: BLACK, flexShrink: 0 }}>→</span>
                )}
                {isDone && (
                  <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM, border: `1px solid ${FAINT}`, padding: '3px 8px', flexShrink: 0 }}>Done</span>
                )}
                {!unlocked && (
                  <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: FAINT, border: `1px solid ${FAINT}`, padding: '3px 8px', flexShrink: 0 }}>Locked</span>
                )}
              </div>

              {/* Active indicator */}
              {isActive && (
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 0 3px ${GREEN}44` }} />
                  <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: BLACK }}>In Progress</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
