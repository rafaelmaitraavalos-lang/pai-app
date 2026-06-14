'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ELEMENTARY_WORLDS } from '../../../../data/elementary'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const BLACK = '#0a0a0a'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

export default function MobileElementaryWorldPage() {
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
    <div style={{ minHeight: '100%', background: '#f5f5f5', fontFamily: BODY, display: 'flex', flexDirection: 'column', maxWidth: 480, margin: '0 auto' }}>
      <div style={{ background: BLACK, padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 20, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
        <button onClick={() => router.push('/mobile/elementary/home')} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6, padding: '8px 0 8px 16px' }}>← Home</button>
      </div>

      <main style={{ width: '100%', padding: '20px 20px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <img src="/pai-mascot.png" alt="PAI" style={{ width: 44, height: 44, objectFit: 'contain', flexShrink: 0 }} />
          <h1 style={{ fontFamily: DISP, fontSize: 26, letterSpacing: '-0.02em', margin: 0, fontWeight: 400, color: BLACK, lineHeight: 1.1 }}>{world.title}</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {world.modules.map((m, i) => {
            const isCurrent = m.id === activeId
            const isDone    = done[m.id]
            const isGame    = (m as any).type === 'game'
            const handleClick = () => isGame && (m as any).gameUrl
              ? router.push((m as any).gameUrl)
              : router.push(`/mobile/elementary/lesson/${m.id}`)
            return (
              <div key={m.id} onClick={handleClick}
                style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', background: isGame ? BLACK : '#EBEBEB', border: `1.5px solid ${BLACK}`, boxShadow: `5px 5px 0 0 ${BLACK}`, cursor: 'pointer', userSelect: 'none', gap: 10 }}>
                <span style={{ fontFamily: BODY, fontSize: 11, color: isGame ? GREEN : DIM, width: 28, flexShrink: 0 }}>{isGame ? '🎮' : String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: DISP, fontSize: 15, letterSpacing: '-0.01em', flex: 1, color: isGame ? GREEN : BLACK, lineHeight: 1.2 }}>{m.title}</span>
                {!isGame && isDone && <span style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM, flexShrink: 0 }}>Done</span>}
                {!isGame && isCurrent && !isDone && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: DISP, fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', flexShrink: 0 }}>
                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: GREEN, boxShadow: `0 0 0 3px ${GREEN}44` }} />
                    Current
                  </span>
                )}
                {isGame && <span style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: GREEN, flexShrink: 0 }}>Play</span>}
                <span style={{ fontFamily: DISP, fontSize: 14, color: isGame ? GREEN : DIM, flexShrink: 0 }}>→</span>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
