'use client'

import { useState } from 'react'
import ConnectionsGame, { type CompletionResult } from '../../components/ConnectionsGame'
import samplePuzzle from '../../data/samplePuzzle'

// ─────────────────────────────────────────────────────────────────────────────
// Swap `samplePuzzle` for any puzzle object that matches the Puzzle type.
// The game engine lives in app/components/ConnectionsGame.tsx.
// ─────────────────────────────────────────────────────────────────────────────

export default function ConnectionsPage() {
  const [result, setResult] = useState<CompletionResult | null>(null)
  const [key, setKey] = useState(0) // bump to reset the game

  const handleComplete = (r: CompletionResult) => {
    setResult(r)
  }

  return (
    <div
      className="min-h-screen bg-[#f9f6f0] font-sans flex flex-col items-center"
      style={{ animation: 'pageIn 0.3s ease-out' }}
    >
      {/* Header */}
      <div className="w-full border-b border-[#e0ddd8] bg-white flex items-center justify-center py-4 mb-8">
        <h1 className="text-lg font-black text-[#1a1a1a] tracking-tight">Connections</h1>
      </div>

      {/* Game */}
      <div className="w-full px-4" style={{ maxWidth: 620 }}>
        <ConnectionsGame
          key={key}
          puzzle={samplePuzzle}
          onComplete={handleComplete}
        />

        {/* Play again — appears after game ends */}
        {result && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => { setResult(null); setKey(k => k + 1) }}
              className="px-6 py-2.5 rounded-full border-2 border-[#2a2a2a] text-[#2a2a2a] font-bold text-sm hover:bg-[#2a2a2a] hover:text-white transition-colors cursor-pointer"
            >
              Play again
            </button>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <p className="mt-12 text-xs text-[#aaa] text-center px-4">
        Engine in <code className="font-mono">app/components/ConnectionsGame.tsx</code> ·
        Data in <code className="font-mono">app/data/samplePuzzle.ts</code>
      </p>
    </div>
  )
}
