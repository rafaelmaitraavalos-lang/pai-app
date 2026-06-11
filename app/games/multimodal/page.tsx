'use client'

import { useRouter } from 'next/navigation'
import CatcherGame from '../../components/CatcherGame'
import { CATCHER_GAMES } from '../../data/catcherGames'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'

export default function MultimodalPage() {
  const router = useRouter()

  return (
    <div style={{ height: '100vh', background: BLACK, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: BLACK, borderBottom: '1px solid #111', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 18, letterSpacing: '-0.02em', color: GREEN }}>PAI</span>
        <button onClick={() => router.push('/games')} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#444', background: 'none', border: 'none', cursor: 'pointer', touchAction: 'manipulation' }}>
          ← Games
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <CatcherGame game={CATCHER_GAMES['multimodal']} onComplete={() => router.push('/games')} />
      </div>
    </div>
  )
}
