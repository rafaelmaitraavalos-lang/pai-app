'use client'

import { useRouter } from 'next/navigation'
import { GAMES, TYPE_LABEL, WORLD_NAMES, type GameType } from '../data/games'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'
const DIM   = '#555555'
const FAINT = '#d8d8d8'
const GREY  = '#EBEBEB'

const TYPE_COLOR: Record<GameType, string> = {
  interstitial: '#3DF542',
  catcher:      '#FFE14D',
  connections:  '#A8D8FF',
}

const worlds = Array.from(new Set(GAMES.map(g => g.world)))

export default function GamesHub() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: BODY }}>

      {/* Header */}
      <div style={{ background: BLACK, padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: DISP, fontSize: 22, color: GREEN, letterSpacing: '-0.02em' }}>PAI</span>
        <button onClick={() => router.push('/home')} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}>
          ← Home
        </button>
      </div>

      <main style={{ maxWidth: 860, margin: '0 auto', padding: '28px 7vw 80px' }}>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
          <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>24 Games</span>
          <div style={{ flex: 1, borderTop: `1px solid ${FAINT}` }} />
          <div style={{ display: 'flex', gap: 12 }}>
            {(['interstitial','catcher','connections'] as GameType[]).map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 8, height: 8, background: TYPE_COLOR[t], border: `1px solid ${BLACK}` }} />
                <span style={{ fontFamily: BODY, fontSize: 10, color: DIM }}>{TYPE_LABEL[t]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Worlds */}
        {worlds.map(wid => {
          const games = GAMES.filter(g => g.world === wid)
          return (
            <div key={wid} style={{ marginBottom: 28 }}>
              {/* World label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>W{String(wid).padStart(2,'0')}</span>
                <span style={{ fontFamily: DISP, fontSize: 12, color: BLACK }}>{WORLD_NAMES[wid]}</span>
                <div style={{ flex: 1, borderTop: `1px solid ${FAINT}` }} />
              </div>

              {/* Game rows */}
              <div style={{ paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {games.map(game => (
                  <div
                    key={game.slug}
                    onClick={game.built ? () => router.push(`/games/${game.slug}`) : undefined}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '11px 14px',
                      background: game.built ? GREY : '#f9f9f9',
                      border: `1.5px solid ${game.built ? BLACK : FAINT}`,
                      boxShadow: game.built ? `4px 4px 0 0 ${BLACK}` : 'none',
                      cursor: game.built ? 'pointer' : 'default',
                      opacity: game.built ? 1 : 0.5,
                      userSelect: 'none',
                    }}
                  >
                    {/* Type pip */}
                    <div style={{ width: 8, height: 8, flexShrink: 0, background: TYPE_COLOR[game.type], border: `1px solid ${BLACK}`, opacity: game.built ? 1 : 0.4 }} />

                    {/* Title */}
                    <span style={{ fontFamily: DISP, fontSize: 14, color: BLACK, flex: 1 }}>{game.title}</span>

                    {/* Module tag */}
                    <span style={{ fontFamily: BODY, fontSize: 10, color: DIM }}>M{game.module}</span>

                    {/* Type label */}
                    <span style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: game.built ? BLACK : FAINT, border: `1px solid ${game.built ? BLACK : FAINT}`, padding: '2px 6px' }}>
                      {TYPE_LABEL[game.type]}
                    </span>

                    {game.built && <span style={{ fontFamily: DISP, fontSize: 12, color: DIM }}>→</span>}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </main>
    </div>
  )
}
