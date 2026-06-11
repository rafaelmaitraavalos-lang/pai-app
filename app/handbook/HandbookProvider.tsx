'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { STARTER_ENTRIES, UNLOCKABLE_ENTRIES, STARTER_ENTRIES_PT, UNLOCKABLE_ENTRIES_PT, LOCKED_COUNT, type HandbookEntry } from './entries'

const DISP  = "'Archivo Black', 'Arial Black', sans-serif"
const BODY  = "'Inter', system-ui, sans-serif"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'
const DIM   = '#555555'
const GREY  = '#EBEBEB'
const CREAM = '#FAFAF8'
const FAINT = '#d8d8d8'

// ── Index view ────────────────────────────────────────────────────────────────

function IndexView({ onSelect, onClose, unlockedIds, isPT }: { onSelect: (e: HandbookEntry) => void; onClose: () => void; unlockedIds: Set<string>; isPT: boolean }) {
  const starters   = isPT ? STARTER_ENTRIES_PT   : STARTER_ENTRIES
  const unlockPool = isPT ? UNLOCKABLE_ENTRIES_PT : UNLOCKABLE_ENTRIES
  const unlocked   = unlockPool.filter(e => unlockedIds.has(e.id))
  const stillLocked = (isPT ? UNLOCKABLE_ENTRIES_PT.length : LOCKED_COUNT) - unlocked.length
  const allEntries = [...starters, ...unlocked]

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
        {allEntries.map((entry, i) => (
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
        {Array.from({ length: Math.max(0, stillLocked) }, (_, i) => (
          <div key={`locked-${i}`} style={{
            padding: '12px 14px',
            background: '#f5f4f0',
            border: `1.5px solid ${FAINT}`,
            opacity: 0.5,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontFamily: BODY, fontSize: 10, color: FAINT, width: 20, flexShrink: 0 }}>{String(allEntries.length + i + 1).padStart(2, '0')}</span>
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

// ── HB button + welcome tooltip ───────────────────────────────────────────────

function HBButton({ onClick, showWelcome, username }: { onClick: () => void; showWelcome: boolean; username: string }) {
  return (
    <div style={{ position: 'fixed', bottom: 24, left: 20, zIndex: 40 }}>
      {/* PAI welcome tooltip */}
      {showWelcome && (
        <div style={{
          position: 'absolute', bottom: 54, left: 0,
          background: BLACK, color: GREEN,
          border: `1.5px solid ${GREEN}`,
          boxShadow: `3px 3px 0 0 ${GREEN}`,
          padding: '10px 14px',
          width: 200,
          pointerEvents: 'none',
        }}>
          {/* Speech bubble arrow pointing down-left */}
          <div style={{
            position: 'absolute', bottom: -8, left: 14,
            width: 0, height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: `8px solid ${GREEN}`,
          }} />
          <div style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4, opacity: 0.6 }}>PAI</div>
          <div style={{ fontFamily: DISP, fontSize: 13, lineHeight: 1.3 }}>
            Welcome, {username}!
          </div>
          <div style={{ fontFamily: BODY, fontSize: 11, color: '#fff', marginTop: 6, lineHeight: 1.4, opacity: 0.85 }}>
            Tap here to open your handbook ↓
          </div>
        </div>
      )}

      <button
        onClick={onClick}
        aria-label="Open handbook"
        style={{
          width: 44, height: 44,
          background: BLACK,
          border: `1.5px solid ${GREEN}`,
          boxShadow: showWelcome ? `0 0 0 4px rgba(61,245,66,0.25), 4px 4px 0 0 ${GREEN}` : `4px 4px 0 0 ${GREEN}`,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'handbookPulse 2s ease-in-out infinite',
          transition: 'box-shadow 0.3s',
        }}
      >
        <span style={{ fontFamily: DISP, fontSize: 9, color: GREEN, letterSpacing: '0.06em', userSelect: 'none' }}>HB</span>
      </button>
    </div>
  )
}

// ── Provider ──────────────────────────────────────────────────────────────────

export default function HandbookProvider() {
  const pathname = usePathname()
  const [mounted, setMounted]             = useState(false)
  const [open, setOpen]                   = useState(false)
  const [visible, setVisible]             = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<HandbookEntry | null>(null)
  const [unlockedIds, setUnlockedIds]     = useState<Set<string>>(new Set())
  const [showWelcome, setShowWelcome]     = useState(false)
  const [username, setUsername]           = useState('')
  const [isPT, setIsPT]                   = useState(false)

  useEffect(() => {
    setMounted(true)
    const onboardingDone = localStorage.getItem('pai_onboarding_done')
    const seen           = localStorage.getItem('pai_handbook_seen')
    const storedName     = localStorage.getItem('pai_username') ?? ''
    const lang           = localStorage.getItem('pai_lang') ?? 'en'
    setUsername(storedName)
    setIsPT(lang === 'pt')
    // Re-check on every route change so it fires after onboarding redirect
    if (onboardingDone && !seen && pathname !== '/') {
      setTimeout(() => setShowWelcome(true), 800)
    }
    // Compute which unlockable entries the user has earned
    const unlockables = lang === 'pt' ? UNLOCKABLE_ENTRIES_PT : UNLOCKABLE_ENTRIES
    const ids = new Set<string>()
    for (const entry of unlockables) {
      if (entry.unlocksAt && localStorage.getItem(`pai_lesson_${entry.unlocksAt}_done`)) {
        ids.add(entry.id)
      }
    }
    setUnlockedIds(ids)
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  const focusedRoute = /^\/(lesson|games|complete|elementary\/lesson|elementary\/world)/.test(pathname)
  if (!mounted || pathname === '/') return null

  const openPopup = () => {
    setShowWelcome(false)
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
      {!focusedRoute && <HBButton onClick={open ? closePopup : openPopup} showWelcome={showWelcome} username={username} />}

      {open && (
        <>
          <div
            onClick={closePopup}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 45 }}
          />
          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: visible ? 'translate(-50%, -50%)' : 'translate(-50%, calc(-50% + 10px))',
            width: 'min(480px, calc(100vw - 40px))',
            maxHeight: 'calc(100vh - 80px)',
            background: '#fff',
            border: `1.5px solid ${BLACK}`,
            boxShadow: `8px 8px 0 0 ${BLACK}`,
            zIndex: 50,
            display: 'flex', flexDirection: 'column',
            opacity: visible ? 1 : 0,
            transition: 'opacity 220ms ease, transform 220ms ease',
          }}>
            {selectedEntry
              ? <EntryView entry={selectedEntry} onBack={backToIndex} />
              : <IndexView onSelect={selectEntry} onClose={closePopup} unlockedIds={unlockedIds} isPT={isPT} />
            }
          </div>
        </>
      )}
    </>
  )
}
