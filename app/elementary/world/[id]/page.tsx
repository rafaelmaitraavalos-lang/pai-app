'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ELEMENTARY_WORLDS } from '../../../data/elementary'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const BLACK = '#0a0a0a'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

export default function ElementaryWorldPage() {
  const router  = useRouter()
  const params  = useParams()
  const worldId = parseInt(params.id as string)
  const world   = ELEMENTARY_WORLDS[worldId]
  const [done, setDone] = useState<Record<number, boolean>>({})

  useEffect(() => {
    if (!world) return
    const map: Record<number, boolean> = {}
    world.modules.forEach(m => { map[m.id] = localStorage.getItem(`pai_lesson_${m.id}_done`) === 'true' })
    setDone(map)
  }, [world])

  if (!world) return <div style={{ padding: 40, fontFamily: BODY }}>World not found.</div>

  const activeId = world.modules.find(m => !done[m.id])?.id ?? null

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: BODY, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: BLACK, padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 22, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
        <button onClick={() => router.push('/elementary/home')} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}>← Home</button>
      </div>

      <main style={{ maxWidth: 860, width: '100%', margin: '0 auto', padding: '24px 7vw 80px', paddingRight: 'calc(7vw + 12px)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 24 }}>
          <h1 style={{ fontFamily: DISP, fontSize: 32, letterSpacing: '-0.02em', margin: 0, fontWeight: 400, color: BLACK }}>{world.title}</h1>
        </div>

        <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {world.modules.map((m, i) => {
            const isCurrent = m.id === activeId
            const isDone    = done[m.id]
            return (
              <div key={m.id} onClick={() => router.push(`/elementary/lesson/${m.id}`)}
                style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', background: '#EBEBEB', border: `1.5px solid ${BLACK}`, boxShadow: `6px 6px 0 0 ${BLACK}`, cursor: 'pointer', userSelect: 'none' }}>
                <span style={{ fontFamily: BODY, fontSize: 12, color: DIM, width: 32, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: DISP, fontSize: 16, letterSpacing: '-0.01em', flex: 1, color: BLACK }}>{m.title}</span>
                {isDone && <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM, marginRight: 14 }}>Done</span>}
                {isCurrent && !isDone && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 14 }}>
                    <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 0 3px ${GREEN}44` }} />
                    Current
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
