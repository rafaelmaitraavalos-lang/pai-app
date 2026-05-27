'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { WORLDS, WORLD_IDS } from '../data'

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 opacity-40">
      <rect x="3" y="8.5" width="12" height="8" rx="2" stroke="#9A5A10" strokeWidth="1.7" />
      <path d="M6 8.5V6a3 3 0 016 0v2.5" stroke="#9A5A10" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export default function Home() {
  const router = useRouter()

  // Track how many lessons are done per world
  const [doneCounts, setDoneCounts] = useState<Record<number, number>>({})

  useEffect(() => {
    const counts: Record<number, number> = {}
    for (const world of Object.values(WORLDS)) {
      counts[world.id] = world.modules.filter(
        m => localStorage.getItem(`pai_lesson_${m.id}_done`) === 'true'
      ).length
    }
    setDoneCounts(counts)
  }, [])

  const worldDone = (id: number) =>
    (doneCounts[id] ?? 0) >= WORLDS[id].modules.length

  const isWorldUnlocked = (id: number) => id === 1 || id === 6 || worldDone(id - 1)

  const totalXP    = Object.values(doneCounts).reduce((s, n) => s + n, 0) * 100
  const level      = Math.floor(totalXP / 300) + 1
  const xpInLevel  = totalXP % 300
  const levelProgress = (xpInLevel / 300) * 100

  return (
    <div
      className="h-screen bg-[#F2EBE0] font-sans flex flex-col overflow-hidden"
      style={{ animation: 'pageIn 0.3s ease-out' }}
    >
      {/* Top bar */}
      <div className="flex-shrink-0 px-8 py-4 border-b border-[#E5D4BA] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full" style={{ background: 'radial-gradient(circle at 40% 33%, #FFE08A, #D4780A 80%)' }} />
          <span className="font-black text-[#3D1A00] text-lg tracking-tight">PAI</span>
        </div>
        <span className="text-sm font-bold text-[#9A5A10]">AI Literacy</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 flex-shrink-0 border-r border-[#E5D4BA] flex flex-col overflow-y-auto">
          <div className="px-6 py-8">
            <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#BA7517] mb-5">Your progress</div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-black text-[#3D1A00] text-sm">Level {level}</span>
              <span className="text-[11px] font-bold text-[#9A5A10]">{xpInLevel} / 300 XP</span>
            </div>
            <div className="h-2.5 bg-[#E5D4BA] rounded-full overflow-hidden mb-7">
              <div className="h-full bg-[#BA7517] rounded-full transition-[width] duration-700" style={{ width: `${levelProgress}%` }} />
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#9A5A10]/50 mb-3">Stats</div>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-[#9A5A10]">Total XP</span>
                <span className="text-xs font-black text-[#3D1A00]">{totalXP}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-[#9A5A10]">Worlds unlocked</span>
                <span className="text-xs font-black text-[#3D1A00]">
                  {WORLD_IDS.filter(id => isWorldUnlocked(id)).length} / {WORLD_IDS.length}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto px-10 py-10">
          <div className="max-w-3xl">
            <h1 className="font-black text-[#3D1A00] mb-1" style={{ fontSize: '28px' }}>Learn AI</h1>
            <p className="text-[#9A5A10] font-semibold mb-8">
              {Object.values(doneCounts).some(n => n > 0) ? 'Pick up where you left off.' : 'Start your first lesson.'}
            </p>

            <div className="flex flex-col gap-3">
              {WORLD_IDS.map(worldId => {
                const world    = WORLDS[worldId]
                const done     = doneCounts[worldId] ?? 0
                const progress = Math.round((done / world.modules.length) * 100)
                const unlocked = isWorldUnlocked(worldId)
                const route    = worldId === 1 ? '/lessons' : `/world/${worldId}`

                return (
                  <button
                    key={worldId}
                    onClick={unlocked ? () => router.push(route) : undefined}
                    disabled={!unlocked}
                    className={`w-full text-left bg-white rounded-2xl border-2 px-7 py-5 flex items-center gap-7 transition-all duration-150 ${
                      unlocked
                        ? 'border-[#DDD0BC] shadow-sm cursor-pointer hover:shadow-md hover:border-[#BA7517]/40 active:scale-[0.99]'
                        : 'border-[#E5D4BA] cursor-not-allowed opacity-55'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-base flex-shrink-0 ${
                      unlocked ? 'bg-[#BA7517] text-white' : 'bg-[#E5D4BA] text-[#A89070]'
                    }`}>
                      {worldId}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[11px] font-black uppercase tracking-[0.12em] mb-0.5 ${unlocked ? 'text-[#BA7517]' : 'text-[#C4AE94]'}`}>
                        World {worldId} · {world.level}
                      </div>
                      <div className={`font-black text-lg leading-tight ${unlocked ? 'text-[#3D1A00]' : 'text-[#A89070]'}`}>
                        {world.title}
                      </div>
                      <div className={`text-sm font-semibold mt-0.5 ${unlocked ? 'text-[#9A5A10]' : 'text-[#C4AE94]'}`}>
                        {world.modules.length} lessons
                      </div>
                    </div>
                    {unlocked ? (
                      <div className="flex-shrink-0 w-44">
                        <div className="flex justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#9A5A10]">Progress</span>
                          <span className="text-xs font-black text-[#BA7517]">{progress}%</span>
                        </div>
                        <div className="h-2 bg-[#E5D4BA] rounded-full overflow-hidden">
                          <div className="h-full bg-[#BA7517] rounded-full transition-[width] duration-700" style={{ width: `${progress}%` }} />
                        </div>
                        <p className="text-xs font-black text-[#BA7517] mt-2.5 text-right">
                          {progress === 100 ? 'Complete ✓' : done > 0 ? 'Continue →' : 'Start →'}
                        </p>
                      </div>
                    ) : (
                      <LockIcon />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
