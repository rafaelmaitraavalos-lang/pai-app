'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ELEMENTARY_WORLDS, MIDDLE_SCHOOL_WORLD_IDS_PT } from '../../data/elementary'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const BLACK = '#0a0a0a'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

export default function MiddlePtHome() {
  const router = useRouter()
  const [done, setDone]         = useState<Record<number, boolean>>({})
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(localStorage.getItem('pai_username') ?? '')
    const map: Record<number, boolean> = {}
    MIDDLE_SCHOOL_WORLD_IDS_PT.forEach(wid => {
      const world = ELEMENTARY_WORLDS[wid]
      map[wid] = world?.modules.every(m => localStorage.getItem(`pai_lesson_${m.id}_done`) === 'true') ?? false
    })
    setDone(map)
  }, [])

  const signOut = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    Object.keys(localStorage).filter(k => k.startsWith('pai_')).forEach(k => localStorage.removeItem(k))
    router.replace('/')
  }

  const firstUndoneIdx = MIDDLE_SCHOOL_WORLD_IDS_PT.findIndex(wid => !done[wid])

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: BODY, display: 'flex', flexDirection: 'column' }}>

      <div style={{ background: BLACK, padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <button onClick={() => router.push('/elementary/middle-pt')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: DISP, fontSize: 22, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {username && <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: GREEN, opacity: 0.7 }}>{username}</span>}
          <Link href="/about" style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', opacity: 0.4, textDecoration: 'none' }}>Sobre</Link>
          <button onClick={signOut} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', opacity: 0.4, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            Sair
          </button>
        </div>
      </div>

      <main style={{ maxWidth: 860, width: '100%', margin: '0 auto', padding: '24px 7vw 80px', paddingRight: 'calc(7vw + 12px)' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>Conteúdo</span>
          <div style={{ flex: 1, borderTop: `1px solid ${FAINT}` }} />
        </div>

        <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MIDDLE_SCHOOL_WORLD_IDS_PT.map((wid, idx) => {
            const world    = ELEMENTARY_WORLDS[wid]
            const isActive = idx === firstUndoneIdx
            const isDone   = done[wid] ?? false

            return (
              <div
                key={wid}
                onClick={() => router.push(`/middle/world/${wid}`)}
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
                  {world?.title}
                </span>
                {isActive && !isDone && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 14 }}>
                    <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 0 3px ${GREEN}44` }} />
                    Em andamento
                  </span>
                )}
                {isDone && (
                  <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM, border: `1px solid ${FAINT}`, padding: '2px 7px', marginRight: 14 }}>Concluído</span>
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
