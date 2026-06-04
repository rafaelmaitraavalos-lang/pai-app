'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TimelineGame from '../../../components/TimelineGame'
import timelinePuzzle from '../../../data/timelinePuzzle'

export default function Lesson1Game() {
  const router = useRouter()
  const [showContinue, setShowContinue] = useState(false)

  const handleComplete = () => {
    // Wait for the XP + completion animations to finish before surfacing the button
    setTimeout(() => setShowContinue(true), 2200)
  }

  return (
    <div
      className="h-screen bg-[#F2EBE0] font-sans flex flex-col overflow-hidden"
      style={{ animation: 'pageIn 0.25s ease-out' }}
    >
      {/* Header — matches lesson template style */}
      <div className="flex-shrink-0 px-8 py-4 border-b border-[#E5D4BA] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/home')}
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
          Bonus round
        </span>
      </div>

      {/* Game */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[580px] mx-auto px-4 py-6">
          <TimelineGame
            puzzle={timelinePuzzle}
            onComplete={handleComplete}
          />

          {/* Continue button — appears after completion animations settle */}
          {showContinue && (
            <div
              className="flex justify-center mt-8 mb-4"
              style={{ animation: 'popIn 0.35s ease-out' }}
            >
              <button
                onClick={() => router.push('/home')}
                className="px-8 py-3.5 rounded-2xl bg-[#BA7517] text-white font-black text-base shadow-[0_5px_0_#7A4A0A] active:shadow-none active:translate-y-1 cursor-pointer hover:bg-[#C8851F] select-none transition-all duration-100"
              >
                Continue to World 1 →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
