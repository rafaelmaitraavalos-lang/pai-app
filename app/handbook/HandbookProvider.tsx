'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { STARTER_ENTRIES, LOCKED_COUNT, type HandbookEntry } from './entries'

const DISP  = "'Archivo Black', 'Arial Black', sans-serif"
const BODY  = "'Inter', system-ui, sans-serif"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'
const DIM   = '#555555'
const GREY  = '#EBEBEB'
const CREAM = '#FAFAF8'
const FAINT = '#d8d8d8'

// ── Index view ────────────────────────────────────────────────────────────────

function IndexView({ onSelect, onClose }: { onSelect: (e: HandbookEntry) => void; onClose: () => void }) {
  return (
    <>
      <div style={{ background: BLACK, padding: '10px 18px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: DISP, fontSize: 20, color: GREEN, letterSpacing: '-0.02em' }}>PAI</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: BODY, fontSize: 22, padding: 0, lineHeight: 1 }}>×</button>
      </div>
      <div style={{ padding: '14px 16px 4px', flexShrink: 0 }}>
        <span style={{ fontFamily: BODY, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM }}>Handbook</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 16px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {STARTER_ENTRIES.map((entry, i) => (
          <button key={entry.id} onClick={() => onSelect(entry)} style={{
            padding: '12px 14px', textAlign: 'left', cursor: 'pointer',
            background: CREAM,
            border: `1.5px solid ${BLACK}`,
            boxShadow: `3px 3px 0 0 ${BLACK}`,
            display: 'flex', alignItems: 'center', gap: 12,
            transition: 'all 0.1s',
          }}>
            <span style={{ fontFamily: BODY, fontSize: 10, color: DIM, width: 20, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontFamily: DISP, fontSize: 12, lineHeight: 1.2, flex: 1, color: BLACK }}>{entry.title}</span>
            <span style={{ fontFamily: BODY, fontSize: 12, color: DIM }}>→</span>
          </button>
        ))}
        {Array.from({ length: LOCKED_COUNT }, (_, i) => (
          <div key={`locked-${i}`} style={{
            padding: '12px 14px',
            background: '#f5f4f0',
            border: `1.5px solid ${FAINT}`,
            opacity: 0.5,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontFamily: BODY, fontSize: 10, color: FAINT, width: 20, flexShrink: 0 }}>{String(STARTER_ENTRIES.length + i + 1).padStart(2, '0')}</span>
            <span style={{ fontFamily: DISP, fontSize: 12, color: FAINT, flex: 1 }}>🔒 Locked</span>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Entry view ────────────────────────────────────────────────────────────────

function EntryView({ entry, onBack }: { entry: HandbookEntry; onBack: () => void }) {
  return (
    <>
      <div style={{ background: BLACK, padding: '10px 18px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontFamily: DISP, fontSize: 16, padding: 0, lineHeight: 1 }}>←</button>
        <span style={{ fontFamily: DISP, fontSize: 20, color: GREEN, letterSpacing: '-0.02em' }}>PAI</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{ fontFamily: BODY, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, marginBottom: 6 }}>Entry</div>
          <h2 style={{ fontFamily: DISP, fontSize: 18, color: BLACK, margin: '0 0 14px', lineHeight: 1.15 }}>{entry.title}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {entry.body.split('\n\n').map((p, i) => (
              <p key={i} style={{ fontFamily: BODY, fontSize: 13, color: BLACK, lineHeight: 1.75, margin: 0 }}>{p}</p>
            ))}
          </div>
        </div>
        <div style={{ background: GREEN, border: `1.5px solid ${BLACK}`, boxShadow: `3px 3px 0 0 ${BLACK}`, padding: '12px 16px' }}>
          <div style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: BLACK, marginBottom: 6 }}>DO</div>
          <p style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: BLACK, margin: 0, lineHeight: 1.55 }}>{entry.doLine}</p>
        </div>
      </div>
    </>
  )
}

// ── HB button ─────────────────────────────────────────────────────────────────

function HBButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open handbook"
      style={{
        position: 'fixed', bottom: 24, left: 20, zIndex: 40,
        width: 44, height: 44,
        background: BLACK,
        border: `1.5px solid ${GREEN}`,
        boxShadow: `4px 4px 0 0 ${GREEN}`,
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'handbookPulse 2s ease-in-out infinite',
      }}
    >
      <span style={{ fontFamily: DISP, fontSize: 9, color: GREEN, letterSpacing: '0.06em', userSelect: 'none' }}>HB</span>
    </button>
  )
}

// ── Provider ──────────────────────────────────────────────────────────────────

export default function HandbookProvider() {
  const pathname = usePathname()
  const [mounted, setMounted]             = useState(false)
  const [open, setOpen]                   = useState(false)
  const [visible, setVisible]             = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<HandbookEntry | null>(null)

  useEffect(() => {
    setMounted(true)
    const onboardingDone = localStorage.getItem('pai_onboarding_done')
    const seen           = localStorage.getItem('pai_handbook_seen')
    if (onboardingDone && !seen) {
      setTimeout(() => { setOpen(true); setVisible(true) }, 400)
    }
  }, [])

  if (!mounted || pathname === '/') return null

  const openPopup = () => {
    setSelectedEntry(null)
    setOpen(true)
    setTimeout(() => setVisible(true), 20)
  }

  const closePopup = () => {
    setVisible(false)
    localStorage.setItem('pai_handbook_seen', 'true')
    setTimeout(() => { setOpen(false); setSelectedEntry(null) }, 220)
  }

  const selectEntry = (entry: HandbookEntry) => {
    setVisible(false)
    setTimeout(() => { setSelectedEntry(entry); setVisible(true) }, 180)
  }

  const backToIndex = () => {
    setVisible(false)
    setTimeout(() => { setSelectedEntry(null); setVisible(true) }, 180)
  }

  return (
    <>
      <HBButton onClick={open ? closePopup : openPopup} />

      {open && (
        <>
          <div
            onClick={closePopup}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 45 }}
          />
          <div style={{
            position: 'fixed', bottom: 80, left: 20,
            width: 'min(340px, calc(100vw - 40px))',
            maxHeight: 'calc(100vh - 120px)',
            background: '#fff',
            border: `1.5px solid ${BLACK}`,
            boxShadow: `8px 8px 0 0 ${BLACK}`,
            zIndex: 50,
            display: 'flex', flexDirection: 'column',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 220ms ease, transform 220ms ease',
          }}>
            {selectedEntry
              ? <EntryView entry={selectedEntry} onBack={backToIndex} />
              : <IndexView onSelect={selectEntry} onClose={closePopup} />
            }
          </div>
        </>
      )}
    </>
  )
}
