'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { WorldData } from '../data'
import { getSlideTitles } from '../data/slideIndex'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const BLACK = '#0a0a0a'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

export default function WorldModuleView({ world }: { world: WorldData }) {
  const router = useRouter()
  const [done,     setDone]     = useState<Record<number, boolean>>({})
  const [expanded, setExpanded] = useState<number | null>(null)

  useEffect(() => {
    const map: Record<number, boolean> = {}
    world.modules.forEach(m => {
      map[m.id] = localStorage.getItem(`pai_lesson_${m.id}_done`) === 'true'
    })
    setDone(map)

    // Auto-open the first incomplete module
    const first = world.modules.find(m => !map[m.id])
    if (first) setExpanded(first.id)
  }, [world])

  const activeId = world.modules.find(m => !done[m.id])?.id ?? null

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}>
      <div style={{ maxWidth: 860, width: '100%', margin: '0 auto', padding: '24px 7vw 80px', paddingRight: 'calc(7vw + 12px)' }}>

        {/* World label */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 24 }}>
          <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: GREEN }}>W{String(world.id).padStart(2, '0')}</span>
          <h1 style={{ fontFamily: DISP, fontSize: 32, letterSpacing: '-0.02em', lineHeight: 1, margin: 0, fontWeight: 400, color: BLACK }}>{world.title}</h1>
          <span style={{ fontFamily: BODY, fontSize: 13, color: DIM }}>{world.level}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
          <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>Modules</span>
          <div style={{ flex: 1, borderTop: `1px solid ${FAINT}` }} />
        </div>

        {/* Module accordion boxes */}
        <div style={{ paddingLeft: 24 }}>
          {world.modules.map((m, i) => {
            const isDone    = done[m.id]
            const isCurrent = m.id === activeId
            const isOpen    = expanded === m.id

            return (
              <div key={m.id} style={{ marginBottom: 10 }}>

                {/* Module box */}
                <div
                  onClick={() => setExpanded(isOpen ? null : m.id)}
                  style={{
                    display: 'flex', alignItems: 'center',
                    padding: '14px 16px',
                    background: '#EBEBEB',
                    border: `1.5px solid ${BLACK}`,
                    boxShadow: `6px 6px 0 0 ${BLACK}`,
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  <span style={{ fontFamily: BODY, fontSize: 12, color: DIM, width: 32, flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontFamily: DISP, fontSize: 16, letterSpacing: '-0.01em', flex: 1, color: BLACK }}>
                    {m.title}
                  </span>
                  {isDone && (
                    <span style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM, marginRight: 14 }}>Done</span>
                  )}
                  {isCurrent && !isDone && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 14 }}>
                      <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 0 3px ${GREEN}44` }} />
                      In Progress
                    </span>
                  )}
                  <span style={{ fontFamily: DISP, fontSize: 18, color: BLACK, lineHeight: 1, transition: 'transform 0.55s cubic-bezier(0.34, 1.2, 0.64, 1)', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}>+</span>
                </div>

                {/* Smooth expand — contents */}
                <div style={{
                  display: 'grid',
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), margin-top 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  marginTop: isOpen ? 14 : 0,
                }}>
                  <div style={{ overflow: 'hidden', minHeight: 0 }}>
                    <div style={{ paddingBottom: 8, marginLeft: 24 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 20, paddingRight: 8 }}>
                        {getSlideTitles(m.id).map((title, si) => (
                          <div
                            key={si}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 14,
                              padding: '9px 12px',
                              background: '#EBEBEB',
                              border: `1.5px solid ${BLACK}`,
                              boxShadow: `3px 3px 0 0 ${BLACK}`,
                              animation: isOpen ? `fkSlideItem 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${si * 0.04}s both` : 'none',
                            }}
                          >
                            <span style={{ fontFamily: BODY, fontSize: 11, color: FAINT, width: 20, flexShrink: 0 }}>
                              {String(si + 1).padStart(2, '0')}
                            </span>
                            <span style={{ fontFamily: BODY, fontSize: 14, color: DIM, flex: 1 }}>{title}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => router.push(`/lesson/${m.id}`)}
                          style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#EBEBEB', color: BLACK, padding: '10px 22px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: `4px 4px 0 0 ${BLACK}` }}
                        >
                          {isDone ? 'Review →' : isCurrent ? 'Resume →' : 'Start →'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
