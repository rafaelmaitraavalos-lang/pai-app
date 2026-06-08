'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TimelineGame from '../../../components/TimelineGame'
import timelinePuzzle from '../../../data/timelinePuzzle'

export default function MobileTimelinePage() {
  const router = useRouter()
  const [key, setKey] = useState(0)

  return (
    <div className="min-h-screen bg-[#F5F1EB] flex flex-col" style={{ animation: 'pageIn 0.3s ease-out' }}>
      <div className="flex-shrink-0 px-5 py-3 border-b border-[#E0DDD8] bg-white flex items-center justify-between">
        <button onClick={() => router.push('/mobile/home')} className="text-[#BA7517] font-black text-sm">← Home</button>
        <h1 className="text-base font-black text-[#1a1a1a] tracking-tight">Sort the Timeline</h1>
        <button onClick={() => setKey(k => k + 1)} className="text-xs text-[#aaa] font-black">Reset</button>
      </div>
      <div className="flex-1 overflow-y-auto pb-12 px-4 pt-4">
        <TimelineGame key={key} puzzle={timelinePuzzle} onComplete={() => {}} />
      </div>
    </div>
  )
}
