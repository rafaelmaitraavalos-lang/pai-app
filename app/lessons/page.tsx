import { WORLDS } from '../data'
import WorldMapView from '../components/WorldMapView'

export default function World1Map() {
  const world = WORLDS[1]
  return (
    <div
      className="h-screen bg-[#F2EBE0] font-sans flex flex-col overflow-hidden"
      style={{ animation: 'pageIn 0.3s ease-out' }}
    >
      <div className="flex-shrink-0 px-8 py-4 border-b border-[#E5D4BA] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="/home"
            className="flex items-center gap-1.5 text-[#BA7517] font-black text-sm hover:opacity-80 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="#BA7517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Home
          </a>
          <div className="w-px h-4 bg-[#DDD0BC]" />
          <span className="font-black text-[#3D1A00] text-sm">World 1 — {world.title}</span>
        </div>
      </div>
      <WorldMapView world={world} />
    </div>
  )
}
