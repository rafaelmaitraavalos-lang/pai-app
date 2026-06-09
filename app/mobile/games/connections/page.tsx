'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ConnectionsGame, { type CompletionResult } from '../../../components/ConnectionsGame'
import samplePuzzle from '../../../data/samplePuzzle'

export default function MobileConnectionsPage() {
  const router = useRouter()
  const [result, setResult] = useState<CompletionResult | null>(null)
  const [key, setKey] = useState(0)

  return (
    <div className="min-h-full bg-[#f9f6f0] flex flex-col" style={{ animation: 'pageIn 0.3s ease-out' }}>
      <div className="flex-shrink-0 px-5 py-3 border-b border-[#e0ddd8] bg-white flex items-center justify-between">
        <button onClick={() => router.push('/mobile/home')} className="text-[#1a1a1a] font-black text-sm">← Home</button>
        <h1 className="text-base font-black text-[#1a1a1a] tracking-tight">Connections</h1>
        <div className="w-12" />
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-12">
        <ConnectionsGame key={key} puzzle={samplePuzzle} onComplete={setResult} />
        {result && (
          <div className="flex justify-center mt-6">
            <button onClick={() => { setResult(null); setKey(k => k + 1) }} className="px-6 py-2.5 rounded-full border-2 border-[#2a2a2a] text-[#2a2a2a] font-bold text-sm cursor-pointer">
              Play again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
