'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ELEMENTARY_WORLDS } from '../../../data/elementary'
import { worldTrack, isPTTrack, homeRoute } from '../../../data/track'
import { useTrackGuard } from '../../../components/useTrackGuard'

const DISP  = "var(--font-display,'Arial Black',sans-serif)"
const BODY  = "var(--font-body,system-ui,sans-serif)"
const GREEN = '#3DF542'
const BLACK = '#0a0a0a'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

export default function MiddleWorldPage() {
  const params  = useParams()
  const router  = useRouter()
  const worldId = parseInt(params.id as string)
  const world   = ELEMENTARY_WORLDS[worldId]
  const track   = worldTrack(worldId)
  const isPT    = isPTTrack(track)
  const home    = homeRoute(track)
  const allowed = useTrackGuard(track)
  const isElemWorld = track === 'elem-en' || track === 'elem-pt'
  const [done, setDone] = useState<Record<number, boolean>>({})

  // Canonical URL for elementary worlds is /elementary/world/[id]
  useEffect(() => {
    if (isElemWorld) router.replace(`/elementary/world/${worldId}`)
  }, [isElemWorld, worldId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!world) return
    const map: Record<number, boolean> = {}
    world.modules.forEach(m => {
      map[m.id] = localStorage.getItem(`pai_lesson_${m.id}_done`) === 'true'
    })
    setDone(map)
  }, [world])

  if (!world || !allowed || isElemWorld) return null

  const activeId = world.modules.find(m => !done[m.id])?.id ?? null

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: BODY, display: 'flex', flexDirection: 'column' }}>

      <div style={{ background: BLACK, padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <button onClick={() => router.push(home)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: DISP, fontSize: 22, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</button>
        <button onClick={() => router.push(home)} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', opacity: 0.5, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          {isPT ? '← Início' : '← Home'}
        </button>
      </div>

      <main style={{ maxWidth: 860, width: '100%', margin: '0 auto', padding: '24px 7vw 80px', paddingRight: 'calc(7vw + 12px)' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <img src="/pai-mascot.png" alt="PAI" style={{ width: 56, height: 56, objectFit: 'contain', flexShrink: 0 }} />
          <div>
            <p style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM, margin: '0 0 6px' }}>
              W{String(worldId - (isPT ? 260 : 200)).padStart(2, '0')} · {isPT ? 'Intermediário' : 'Intermediate'}
            </p>
            <h1 style={{ fontFamily: DISP, fontSize: 28, letterSpacing: '-0.02em', color: BLACK, margin: 0, fontWeight: 400 }}>
              {world.title}
            </h1>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
          <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>{isPT ? 'Módulos' : 'Modules'}</span>
          <div style={{ flex: 1, borderTop: `1px solid ${FAINT}` }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {world.modules.map((mod, idx) => {
            const isDone   = done[mod.id]
            const isActive = mod.id === activeId
            const isGame   = (mod as any).type === 'game'
            const handleClick = () => isGame && (mod as any).gameUrl
              ? router.push((mod as any).gameUrl)
              : router.push(`/elementary/lesson/${mod.id}`)

            return (
              <div
                key={mod.id}
                onClick={handleClick}
                style={{
                  display: 'flex', alignItems: 'center', padding: '13px 16px',
                  background: isGame ? BLACK : isDone ? '#f5f5f5' : '#EBEBEB',
                  border: `1.5px solid ${isGame ? BLACK : isDone ? FAINT : BLACK}`,
                  boxShadow: isGame || !isDone ? `4px 4px 0 0 ${BLACK}` : 'none',
                  cursor: 'pointer', userSelect: 'none',
                  opacity: !isGame && isDone ? 0.6 : 1,
                }}
              >
                <span style={{ fontFamily: BODY, fontSize: 11, color: isGame ? GREEN : DIM, width: 36, flexShrink: 0 }}>
                  {isGame ? '🎮' : String(idx + 1).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: DISP, fontSize: 'clamp(12px, 3.5vw, 15px)', letterSpacing: '-0.01em', flex: 1, minWidth: 0, color: isGame ? GREEN : BLACK }}>
                  {mod.title}
                </span>
                {!isGame && isActive && !isDone && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: DISP, fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 12 }}>
                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: GREEN, boxShadow: `0 0 0 3px ${GREEN}44` }} />
                    {isPT ? 'A seguir' : 'Up next'}
                  </span>
                )}
                {!isGame && isDone && (
                  <span style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM, border: `1px solid ${FAINT}`, padding: '2px 6px', marginRight: 12 }}>{isPT ? 'Concluído' : 'Done'}</span>
                )}
                {isGame && <span style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: GREEN, marginRight: 12 }}>{isPT ? 'Jogar' : 'Play'}</span>}
                <span style={{ fontFamily: DISP, fontSize: 13, color: isGame ? GREEN : DIM }}>→</span>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
