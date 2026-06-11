'use client'

import { useRouter } from 'next/navigation'
import { GAMES } from '../data/games'
import { WORLDS, WORLD_IDS } from '../data'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const BLACK = '#0a0a0a'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

interface Props { slug: string }

export default function GameComplete({ slug }: Props) {
  const router = useRouter()
  const game = GAMES.find(g => g.slug === slug)
  if (!game) return null

  const world        = WORLDS[game.world]
  const nextMod      = world?.modules[game.module] // game.module is 1-indexed → modules[game.module] is the next
  const worldRoute   = game.world === 1 ? '/lessons' : `/world/${game.world}`
  const nextWorldIdx = WORLD_IDS.indexOf(game.world) + 1
  const nextWorldId  = !nextMod && nextWorldIdx < WORLD_IDS.length ? WORLD_IDS[nextWorldIdx] : null

  return (
    <main style={{ height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div style={{ width: '100%', maxWidth: 480, padding: '0 7vw', textAlign: 'center' }}>
        <div style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, marginBottom: 16 }}>
          Game complete
        </div>
        <div style={{ animation: 'xpPop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.2s both' }}>
          <p style={{ fontFamily: DISP, fontSize: 80, lineHeight: 1, color: BLACK, margin: 0, letterSpacing: '-0.03em' }}>+100</p>
          <p style={{ fontFamily: DISP, fontSize: 20, color: DIM, margin: '4px 0 0', letterSpacing: '0.06em' }}>XP</p>
        </div>
        <h1 style={{ fontFamily: DISP, fontSize: 36, letterSpacing: '-0.02em', color: BLACK, margin: '28px 0 8px', fontWeight: 400 }}>{game.title}</h1>
        <div style={{ borderTop: `1px solid ${FAINT}`, marginBottom: 24 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {nextMod && (
            <button
              onClick={() => router.push(`/lesson/${nextMod.id}`)}
              style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 28px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: '4px 4px 0 0 #555' }}
            >
              Next: {nextMod.title} →
            </button>
          )}
          {!nextMod && nextWorldId && (
            <button
              onClick={() => router.push(`/world/${nextWorldId}`)}
              style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 28px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: '4px 4px 0 0 #555' }}
            >
              Next World: {WORLDS[nextWorldId]?.title} →
            </button>
          )}
          <button
            onClick={() => router.push(worldRoute)}
            style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', color: DIM, padding: '10px 28px', border: `1.5px solid ${FAINT}`, cursor: 'pointer' }}
          >
            Back to {world?.title ?? 'World'}
          </button>
        </div>
      </div>
    </main>
  )
}
