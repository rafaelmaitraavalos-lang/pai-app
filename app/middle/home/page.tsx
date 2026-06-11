'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ELEMENTARY_WORLDS, MIDDLE_SCHOOL_WORLD_IDS, MIDDLE_SCHOOL_LESSONS } from '../../data/elementary'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const BLACK = '#0a0a0a'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

export default function MiddleSchoolHome() {
  const router = useRouter()
  const [done, setDone]         = useState<Record<number, boolean>>({})
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(localStorage.getItem('pai_username') ?? '')
    const map: Record<number, boolean> = {}
    MIDDLE_SCHOOL_WORLD_IDS.forEach(wid => {
      const world = ELEMENTARY_WORLDS[wid]
      // A world is "done" when ALL its modules are done
      const allDone = world?.modules.every(m => localStorage.getItem(`pai_lesson_${m.id}_done`) === 'true') ?? false
      map[wid] = allDone
    })
    setDone(map)
  }, [])

  const signOut = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    localStorage.removeItem('pai_onboarding_done')
    localStorage.removeItem('pai_username')
    localStorage.removeItem('pai_handbook_seen')
    router.replace('/')
  }

  const activeId = MIDDLE_SCHOOL_WORLD_IDS.find(id => !done[id]) ?? null

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: BODY, display: 'flex', flexDirection: 'column' }}>

      <div style={{ background: BLACK, padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 22, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {username && (
            <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: GREEN, opacity: 0.7 }}>{username}</span>
          )}
          <button onClick={signOut} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', opacity: 0.4, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            Sign out
          </button>
        </div>
      </div>

      <main style={{ maxWidth: 860, width: '100%', margin: '0 auto', padding: '24px 7vw 80px', paddingRight: 'calc(7vw + 12px)' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>Contents</span>
          <div style={{ flex: 1, borderTop: `1px solid ${FAINT}` }} />
        </div>

        <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MIDDLE_SCHOOL_WORLD_IDS.map((id, idx) => {
            const lesson   = MIDDLE_SCHOOL_LESSONS[id]
            const isActive = id === activeId
            const isDone   = done[id]

            return (
              <div
                key={id}
                onClick={() => router.push(`/middle/world/${id}`)}
                style={{
                  display: 'flex', alignItems: 'center',
                  padding: '15px 16px',
                  background: '#EBEBEB',
                  border: `1.5px solid ${BLACK}`,
                  boxShadow: `6px 6px 0 0 ${BLACK}`,
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <span style={{ fontFamily: BODY, fontSize: 12, color: DIM, width: 36, flexShrink: 0 }}>
                  W{String(idx + 1).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: DISP, fontSize: 'clamp(13px, 3.8vw, 17px)', letterSpacing: '-0.01em', flex: 1, minWidth: 0, color: BLACK }}>
                  {lesson?.title ?? ELEMENTARY_WORLDS[id]?.title}
                </span>
                {isActive && !isDone && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 14 }}>
                    <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 0 3px ${GREEN}44` }} />
                    In Progress
                  </span>
                )}
                {isDone && (
                  <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM, border: `1px solid ${FAINT}`, padding: '2px 7px', marginRight: 14 }}>Done</span>
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
