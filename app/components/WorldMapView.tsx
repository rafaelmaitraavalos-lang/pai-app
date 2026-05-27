'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { WorldData } from '../data'

interface Props {
  world: WorldData
}

// SVG coordinate space — same regardless of module count
const VW = 390

// Build evenly-spaced vertical positions for N modules
function buildPositions(n: number) {
  const spacing = 110
  const startY = 80
  return Array.from({ length: n }, (_, i) => ({ x: 195, y: startY + i * spacing }))
}

function buildPaths(positions: { x: number; y: number }[]) {
  return positions.slice(0, -1).map((p, i) =>
    `M ${p.x} ${p.y} L ${positions[i + 1].x} ${positions[i + 1].y}`
  )
}

export default function WorldMapView({ world }: Props) {
  const router = useRouter()
  const [completed, setCompleted] = useState<Set<number>>(new Set())

  useEffect(() => {
    const c = new Set<number>()
    world.modules.forEach(m => {
      if (localStorage.getItem(`pai_lesson_${m.id}_done`) === 'true') c.add(m.id)
    })
    setCompleted(c)
  }, [world])

  const isDone     = (id: number) => completed.has(id)
  const isUnlocked = (id: number) => id === world.modules[0].id || completed.has(id - 1)
  const currentId  = world.modules.find(m => isUnlocked(m.id) && !isDone(m.id))?.id

  const handleTap = (id: number) => {
    if (!isUnlocked(id)) return
    router.push(`/lesson/${id}`)
  }

  const totalXP       = completed.size * 100
  const level         = Math.floor(totalXP / 300) + 1
  const worldProgress = Math.round((completed.size / world.modules.length) * 100)

  const POS   = buildPositions(world.modules.length)
  const PATHS = buildPaths(POS)
  const VH    = 80 + (world.modules.length - 1) * 110 + 70  // startY + spans + bottom padding

  const px = (x: number) => `${(x / VW) * 100}%`
  const py = (y: number) => `${(y / VH) * 100}%`

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 border-r border-[#E5D4BA] flex flex-col overflow-y-auto">
        <div className="px-6 pt-7 pb-5 border-b border-[#E5D4BA]">
          <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#BA7517] mb-1">
            World {world.displayId ?? world.id}
          </div>
          <div className="font-black text-[#3D1A00] text-[15px] leading-snug mb-4">{world.title}</div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-[#9A5A10]">Progress</span>
            <span className="text-[11px] font-black text-[#BA7517]">
              {completed.size} / {world.modules.length}
            </span>
          </div>
          <div className="h-2 bg-[#E5D4BA] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#BA7517] rounded-full transition-[width] duration-700"
              style={{ width: `${worldProgress}%` }}
            />
          </div>
        </div>

        <div className="px-4 py-5">
          <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#9A5A10]/50 mb-2.5 px-2">
            Modules
          </div>
          <div className="flex flex-col gap-0.5">
            {world.modules.map(mod => {
              const done    = isDone(mod.id)
              const unlocked = isUnlocked(mod.id)
              const current = mod.id === currentId
              return (
                <button
                  key={mod.id}
                  onClick={unlocked ? () => handleTap(mod.id) : undefined}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors w-full ${
                    current ? 'bg-[#BA7517]/10' : unlocked ? 'hover:bg-[#BA7517]/5' : ''
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    done || current ? 'bg-[#BA7517]' : unlocked ? 'bg-[#DDD0BC]' : 'bg-[#E5D4BA]'
                  }`} />
                  <span className={`text-[12px] leading-snug ${
                    current   ? 'font-black text-[#3D1A00]' :
                    done      ? 'font-semibold text-[#BA7517]' :
                    unlocked  ? 'font-medium text-[#9A5A10]' :
                                'font-medium text-[#9A5A10]/40'
                  }`}>
                    {mod.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </aside>

      {/* Map */}
      <main className="flex-1 flex justify-center overflow-y-auto py-8 px-6">
        <div className="w-full" style={{ maxWidth: '400px' }}>
          {/* XP bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-black uppercase tracking-[0.15em] text-[#BA7517]">
                Level {level}
              </span>
              <span className="text-[11px] font-bold text-[#9A5A10]">
                {completed.size} / {world.modules.length} modules · {totalXP} XP
              </span>
            </div>
            <div className="h-2.5 bg-[#E5D4BA] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#BA7517] rounded-full transition-[width] duration-700"
                style={{ width: `${worldProgress}%` }}
              />
            </div>
          </div>

          {/* Oval map */}
          <div className="relative w-full" style={{ paddingBottom: `${(VH / VW) * 100}%` }}>
            <div className="absolute inset-0">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox={`0 0 ${VW} ${VH}`}
                preserveAspectRatio="none"
              >
                {PATHS.map((d, i) => (
                  <path
                    key={i} d={d} fill="none" stroke="#BA7517" strokeWidth="3"
                    strokeLinecap="round"
                    opacity={isDone(world.modules[i].id) ? 0.9 : 0.28}
                    strokeDasharray={isDone(world.modules[i].id) ? undefined : '6 8'}
                  />
                ))}
              </svg>

              {world.modules.map((mod, i) => {
                const { x, y } = POS[i]
                const unlocked = isUnlocked(mod.id)
                const done     = isDone(mod.id)
                const current  = mod.id === currentId

                return (
                  <button
                    key={mod.id}
                    onClick={() => handleTap(mod.id)}
                    disabled={!unlocked}
                    className={`absolute z-10 flex items-center gap-3 px-5 rounded-full font-black transition-all duration-150 ${
                      unlocked
                        ? 'shadow-[0_4px_0_#7A4A0A] active:shadow-none active:translate-y-1 cursor-pointer'
                        : 'cursor-default'
                    }`}
                    style={{
                      width: '200px', height: '58px',
                      left: `calc(${px(x)} - 100px)`,
                      top:  `calc(${py(y)} - 29px)`,
                      background: unlocked ? '#BA7517' : '#EDE3D4',
                      border: unlocked ? 'none' : '2px solid #D4C4AE',
                      animation: current ? 'glowPulse 2s ease-in-out infinite' : undefined,
                    }}
                  >
                    {!unlocked && (
                      <div
                        className="absolute rounded-full flex items-center justify-center"
                        style={{ width: '22px', height: '22px', top: '-9px', right: '-6px', background: '#C4AE94' }}
                      >
                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
                          <rect x="1" y="5" width="9" height="7" rx="1.5" fill="white" />
                          <path d="M3 5V3.5a2.5 2.5 0 015 0V5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}
                    {done ? (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
                        <path d="M3.5 9l4 4.5 7-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span
                        className="text-base font-black shrink-0 w-5 text-center"
                        style={{ color: unlocked ? 'white' : '#BBA98C' }}
                      >
                        {i + 1}
                      </span>
                    )}
                    <span
                      className="text-sm font-bold text-left leading-tight"
                      style={{ color: unlocked ? 'white' : '#BBA98C' }}
                    >
                      {mod.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
