'use client'

import { useRouter } from 'next/navigation'
import { WORLDS, WORLD_IDS } from '../data'

export default function Dev() {
  const router = useRouter()

  const clearAll = () => {
    Object.values(WORLDS).forEach(w =>
      w.modules.forEach(m => localStorage.removeItem(`pai_lesson_${m.id}_done`))
    )
    localStorage.removeItem('pai_onboarding_screen')
  }

  const completeAll = () => {
    Object.values(WORLDS).forEach(w =>
      w.modules.forEach(m => localStorage.setItem(`pai_lesson_${m.id}_done`, 'true'))
    )
  }

  return (
    <div className="min-h-screen bg-[#F2EBE0] font-sans" style={{ animation: 'pageIn 0.2s ease-out' }}>
      {/* Header */}
      <div className="px-8 py-5 border-b border-[#E5D4BA] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-lg bg-[#3D1A00] text-[#F5C050] text-[11px] font-black uppercase tracking-widest">
            Dev Mode
          </span>
          <span className="font-black text-[#3D1A00]">All lessons unlocked</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { clearAll(); router.push('/reset') }}
            className="px-4 py-2 rounded-xl border-2 border-[#DDD0BC] bg-white text-sm font-black text-[#3D1A00] hover:border-red-300 hover:text-red-600 transition-colors cursor-pointer"
          >
            Clear all progress
          </button>
          <button
            onClick={completeAll}
            className="px-4 py-2 rounded-xl border-2 border-[#BA7517] bg-[#BA7517] text-white text-sm font-black hover:bg-[#C8851F] transition-colors cursor-pointer"
          >
            Complete all
          </button>
          <button
            onClick={() => router.push('/home')}
            className="px-4 py-2 rounded-xl border-2 border-[#DDD0BC] bg-white text-sm font-black text-[#3D1A00] hover:border-[#BA7517]/50 transition-colors cursor-pointer"
          >
            ← Home
          </button>
        </div>
      </div>

      {/* Worlds */}
      <div className="px-8 py-8 max-w-4xl">
        {WORLD_IDS.map(worldId => {
          const world = WORLDS[worldId]
          return (
            <div key={worldId} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#BA7517] text-white text-[11px] font-black uppercase tracking-[0.12em]">
                  World {worldId}
                </span>
                <h2 className="font-black text-[#3D1A00] text-lg">{world.title}</h2>
                <span className="text-sm text-[#9A5A10] font-semibold">{world.level}</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {world.modules.map((mod, i) => (
                  <button
                    key={mod.id}
                    onClick={() => router.push(`/lesson/${mod.id}`)}
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-[#DDD0BC] text-left hover:border-[#BA7517]/50 hover:shadow-sm active:scale-[0.98] cursor-pointer transition-all duration-150"
                  >
                    <span className="text-xs font-black text-[#BA7517] w-6 text-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm font-bold text-[#3D1A00] leading-tight">{mod.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}

        {/* Games */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#BA7517] text-white text-[11px] font-black uppercase tracking-[0.12em]">
              Games
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: 'Connections (standalone)', path: '/games/connections' },
              { label: 'Sort the Timeline (standalone)', path: '/games/timeline' },
              { label: 'Timeline — after Lesson 1', path: '/lesson/1/game' },
              { label: 'The Analyst (standalone)', path: '/games/analyst' },
            ].map(item => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white border-2 border-[#DDD0BC] text-left hover:border-[#BA7517]/50 hover:shadow-sm active:scale-[0.98] cursor-pointer transition-all"
              >
                <span className="text-sm font-bold text-[#3D1A00] leading-tight">{item.label}</span>
                <span className="text-xs text-[#9A5A10] shrink-0">{item.path}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Other screens */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#3D1A00] text-white text-[11px] font-black uppercase tracking-[0.12em]">
              Other screens
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: 'Onboarding', path: '/' },
              { label: 'Home', path: '/home' },
              { label: 'World 1 Map', path: '/lessons' },
              { label: 'World 2 Map', path: '/world/2' },
              { label: 'World 3 Map', path: '/world/3' },
              { label: 'World 4 Map', path: '/world/4' },
              { label: 'Reset progress', path: '/reset' },
            ].map(item => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-[#DDD0BC] text-left hover:border-[#BA7517]/50 hover:shadow-sm active:scale-[0.98] cursor-pointer transition-all"
              >
                <span className="text-sm font-bold text-[#3D1A00]">{item.label}</span>
                <span className="text-xs text-[#9A5A10] ml-auto">{item.path}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
