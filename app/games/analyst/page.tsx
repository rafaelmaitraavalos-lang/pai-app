'use client'

import { useRouter } from 'next/navigation'
import TheAnalyst from '../../components/TheAnalyst'
import analystRounds from '../../data/analystRounds'
import type { AnalystResult } from '../../components/TheAnalyst'

export default function AnalystPage() {
  const router = useRouter()

  const handleComplete = (_r: AnalystResult) => {
    router.push('/lessons')
  }

  return (
    <div
      className="h-screen bg-[#F2EBE0] font-sans flex flex-col overflow-hidden"
      style={{ animation: 'pageIn 0.3s ease-out' }}
    >
      {/* Header */}
      <div className="flex-shrink-0 px-8 py-4 border-b border-[#E5D4BA] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/lessons')}
            className="flex items-center gap-1.5 text-[#BA7517] font-black text-sm active:opacity-70 hover:opacity-80 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="#BA7517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Lessons
          </button>
          <div className="w-px h-4 bg-[#DDD0BC]" />
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[#BA7517]">Lesson 1</span>
            <span className="text-[#DDD0BC] mx-2">·</span>
            <span className="font-black text-[#3D1A00] text-sm">History of AI</span>
          </div>
        </div>
        <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[#BA7517]">
          The Analyst
        </span>
      </div>

      {/* Sidebar + main */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* Sidebar */}
        <aside className="w-60 flex-shrink-0 border-r border-[#E5D4BA] flex flex-col overflow-y-auto">
          <div className="px-6 pt-7 pb-5 border-b border-[#E5D4BA]">
            <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#BA7517] mb-1">World 1</div>
            <div className="font-black text-[#3D1A00] text-[15px] leading-snug">History of AI</div>
          </div>
          <div className="px-4 py-5">
            <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#9A5A10]/50 mb-3 px-2">
              The Analyst
            </div>
            <p className="px-2 text-[12px] text-[#9A5A10] font-medium leading-relaxed">
              8 case files. 4 calls each. You read the pattern — or you don't.
            </p>
            <div className="mt-5 px-2">
              <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#BA7517]/60 mb-2">Rounds</div>
              <div className="flex gap-1.5 flex-wrap">
                {analystRounds.map((r, i) => (
                  <div
                    key={r.id}
                    className="text-[10px] font-black px-2 py-0.5 rounded-full"
                    style={{
                      background: r.era === 'training' ? 'rgba(186,117,23,0.10)' : 'rgba(61,26,0,0.08)',
                      color: r.era === 'training' ? '#BA7517' : '#3D1A00',
                    }}
                  >
                    {r.era === 'training' ? `T${i + 1}` : `★${i - 3}`}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-[#9A5A10]/60 font-medium">
                T = training · ★ = test
              </p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-h-0 overflow-y-auto py-8 px-4">
          <TheAnalyst
            rounds={analystRounds}
            onComplete={handleComplete}
          />
        </main>
      </div>
    </div>
  )
}
