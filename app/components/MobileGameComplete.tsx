'use client'

import { useRouter } from 'next/navigation'
import { GAMES } from '../data/games'
import { WORLDS, WORLD_IDS } from '../data'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

interface Props { slug: string }

export default function MobileGameComplete({ slug }: Props) {
  const router = useRouter()
  const game = GAMES.find(g => g.slug === slug)
  if (!game) return null

  const world        = WORLDS[game.world]
  const nextMod      = world?.modules[game.module]
  const worldRoute   = `/mobile/world/${game.world}`
  const nextWorldIdx = WORLD_IDS.indexOf(game.world) + 1
  const nextWorldId  = !nextMod && nextWorldIdx < WORLD_IDS.length ? WORLD_IDS[nextWorldIdx] : null

  return (
    <main style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      {/* Header */}
      <div style={{ background: BLACK, padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 20, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', padding: '0 20px', textAlign: 'center' }}>
          <div style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, marginBottom: 16 }}>
            Game complete
          </div>
          <div style={{ animation: 'xpPop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.2s both' }}>
            <p style={{ fontFamily: DISP, fontSize: 72, lineHeight: 1, color: BLACK, margin: 0, letterSpacing: '-0.03em' }}>+100</p>
            <p style={{ fontFamily: DISP, fontSize: 18, color: DIM, margin: '4px 0 0', letterSpacing: '0.06em' }}>XP</p>
          </div>
          <h1 style={{ fontFamily: DISP, fontSize: 28, letterSpacing: '-0.02em', color: BLACK, margin: '24px 0 16px', fontWeight: 400 }}>{game.title}</h1>
          <div style={{ borderTop: `1px solid ${FAINT}`, marginBottom: 16 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {nextMod && (
              <button
                onClick={() => router.push(`/mobile/lesson/${nextMod.id}`)}
                style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 28px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: `4px 4px 0 0 #555` }}
              >
                Next: {nextMod.title} →
              </button>
            )}
            {!nextMod && nextWorldId && (
              <button
                onClick={() => router.push(`/mobile/world/${nextWorldId}`)}
                style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 28px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: `4px 4px 0 0 #555` }}
              >
                Next World: {WORLDS[nextWorldId]?.title} →
              </button>
            )}
            <button
              onClick={() => router.push(worldRoute)}
              style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', color: DIM, padding: '12px 28px', border: `1.5px solid ${FAINT}`, cursor: 'pointer' }}
            >
              Back to {world?.title ?? 'World'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
