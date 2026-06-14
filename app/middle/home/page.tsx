'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ELEMENTARY_WORLDS, MIDDLE_SCHOOL_WORLD_IDS, MIDDLE_SCHOOL_LESSONS } from '../../data/elementary'

const GAMES = [
  { title: 'Signal Drop',        gameUrl: '/games/signal-drop' },
  { title: 'Fix the Robot',      gameUrl: '/games/fix-the-robot' },
  { title: 'Build-a-Robot',      gameUrl: '/games/build-a-robot' },
  { title: 'The Analyst',        gameUrl: '/games/analyst' },
  { title: 'Static',             gameUrl: '/games/static' },
  { title: 'Weight Room',        gameUrl: '/games/weight-room' },
  { title: 'The Feed',           gameUrl: '/games/the-feed' },
  { title: 'Failure Modes',      gameUrl: '/games/failure-modes' },
  { title: 'Data Trails',        gameUrl: '/games/data-trails' },
  { title: 'The Call',           gameUrl: '/games/the-call' },
  { title: 'Daily Scan',         gameUrl: '/games/daily-scan' },
  { title: 'The Framework',      gameUrl: '/games/the-framework' },
  { title: 'Bias Sources',       gameUrl: '/games/bias-sources' },
  { title: 'Transparency Types', gameUrl: '/games/transparency' },
  { title: "Can or Can't",       gameUrl: '/games/can-or-cant' },
  { title: 'What Is AGI',        gameUrl: '/games/what-is-agi' },
  { title: 'The Resource',       gameUrl: '/games/the-resource' },
  { title: 'Signal Flow',        gameUrl: '/games/signal-flow' },
  { title: 'The Gradient',       gameUrl: '/games/the-gradient' },
  { title: 'Transformer Parts',  gameUrl: '/games/transformer' },
  { title: 'Prompt Drop',        gameUrl: '/games/prompt-drop' },
  { title: 'Agent Parts',        gameUrl: '/games/agent-parts' },
  { title: 'Ship It',            gameUrl: '/games/ship-it' },
  { title: 'Multimodal',         gameUrl: '/games/multimodal' },
  { title: 'Frontier Concepts',  gameUrl: '/games/frontier' },
  { title: 'Dispatch',           gameUrl: '/games/dispatch' },
  { title: 'Connections',        gameUrl: '/games/connections' },
  { title: 'Timeline',           gameUrl: '/games/timeline' },
]

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
    Object.keys(localStorage).filter(k => k.startsWith('pai_')).forEach(k => localStorage.removeItem(k))
    router.replace('/')
  }

  const activeId = MIDDLE_SCHOOL_WORLD_IDS.find(id => !done[id]) ?? null

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: BODY, display: 'flex', flexDirection: 'column' }}>

      <div style={{ background: BLACK, padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <button onClick={() => router.push('/middle/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: DISP, fontSize: 22, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {username && (
            <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: GREEN, opacity: 0.7 }}>{username}</span>
          )}
          <Link href="/about" style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', opacity: 0.4, textDecoration: 'none' }}>About</Link>
          <button onClick={signOut} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', opacity: 0.4, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            Sign out
          </button>
        </div>
      </div>

      <main style={{ maxWidth: 860, width: '100%', margin: '0 auto', padding: '24px 7vw 80px', paddingRight: 'calc(7vw + 12px)' }}>

        {/* PAI mascot greeting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, padding: '0 4px' }}>
          <img src="/pai-mascot.png" alt="PAI" style={{ width: 80, height: 80, objectFit: 'contain', flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: DISP, fontSize: 22, color: BLACK, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              {username ? `Hey, ${username}!` : 'Hey there!'}
            </div>
            <div style={{ fontFamily: BODY, fontSize: 13, color: DIM, marginTop: 4 }}>Ready to learn about AI?</div>
          </div>
        </div>

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

        {/* Games section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, margin: '32px 0 16px' }}>
          <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>Games</span>
          <div style={{ flex: 1, borderTop: `1px solid ${FAINT}` }} />
        </div>
        <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {GAMES.map(g => (
            <div key={g.gameUrl} onClick={() => router.push(g.gameUrl)}
              style={{ display: 'flex', alignItems: 'center', padding: '14px 16px',
                background: BLACK, border: `1.5px solid ${BLACK}`, boxShadow: `6px 6px 0 0 ${BLACK}`,
                cursor: 'pointer', userSelect: 'none' }}>
              <span style={{ fontFamily: BODY, fontSize: 12, color: GREEN, width: 36, flexShrink: 0 }}>🎮</span>
              <span style={{ fontFamily: DISP, fontSize: 16, letterSpacing: '-0.01em', flex: 1, color: GREEN }}>{g.title}</span>
              <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: GREEN, marginRight: 14 }}>Play</span>
              <span style={{ fontFamily: DISP, fontSize: 14, color: GREEN }}>→</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
