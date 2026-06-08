'use client'

import { useRouter } from 'next/navigation'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const BLACK = '#0a0a0a'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

export default function MobileWorld5Complete() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100svh', background: '#fff', display: 'flex', flexDirection: 'column', fontFamily: BODY }}>
      <div style={{ background: BLACK, padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 20, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center', gap: 24 }}>
        <div style={{ animation: 'xpPop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.2s both' }}>
          <p style={{ fontFamily: DISP, fontSize: 72, lineHeight: 1, color: BLACK, margin: 0, letterSpacing: '-0.03em' }}>W5</p>
          <p style={{ fontFamily: DISP, fontSize: 14, color: GREEN, margin: '4px 0 0', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Complete</p>
        </div>

        <div style={{ borderTop: `1px solid ${FAINT}`, width: '100%' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <p style={{ fontFamily: DISP, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: DIM, margin: 0 }}>What&apos;s next?</p>
          <button
            onClick={() => router.push('/mobile/world/6')}
            style={{ width: '100%', padding: '16px', background: '#EBEBEB', border: `1.5px solid ${BLACK}`, boxShadow: `5px 5px 0 0 ${BLACK}`, fontFamily: DISP, fontSize: 14, letterSpacing: '-0.01em', color: BLACK, cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span>World 6 — Neural Networks</span>
            <span>→</span>
          </button>
          <button
            onClick={() => router.push('/mobile/home')}
            style={{ width: '100%', padding: '14px', background: '#fff', border: `1.5px solid ${FAINT}`, fontFamily: DISP, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: DIM, cursor: 'pointer' }}
          >
            Back to all worlds
          </button>
        </div>
      </div>
    </div>
  )
}
