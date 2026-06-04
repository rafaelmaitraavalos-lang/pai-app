'use client'

import { useState } from 'react'
import TimelineGame from '../../components/TimelineGame'
import timelinePuzzle from '../../data/timelinePuzzle'

export default function TimelinePage() {
  const [key, setKey] = useState(0)

  return (
    <div
      className="min-h-screen bg-[#F5F1EB] flex flex-col items-center"
      style={{ animation: 'pageIn 0.3s ease-out' }}
    >
      {/* Header */}
      <div className="w-full border-b border-[#E0DDD8] bg-white flex items-center justify-center py-4 mb-6">
        <h1 className="text-base font-black text-[#1a1a1a] tracking-tight">
          Sort the Timeline
        </h1>
      </div>

      {/* Game */}
      <div className="w-full pb-12" style={{ maxWidth: 580 }}>
        <TimelineGame
          key={key}
          puzzle={timelinePuzzle}
          onComplete={(xp) => console.log(`Game complete — ${xp} XP earned`)}
        />
      </div>

      {/* Dev reset */}
      <button
        onClick={() => setKey(k => k + 1)}
        className="fixed bottom-4 right-4 px-3 py-1.5 text-[11px] font-black text-[#aaa] border border-[#ddd] rounded-full bg-white hover:border-[#BA7517] hover:text-[#BA7517] transition-colors cursor-pointer"
      >
        Reset
      </button>
    </div>
  )
}
