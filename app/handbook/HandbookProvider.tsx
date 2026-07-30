'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import {
  STARTER_ENTRIES, UNLOCKABLE_ENTRIES,
  ELEMENTARY_STARTER_ENTRIES, ELEMENTARY_UNLOCKABLE_ENTRIES,
  ELEMENTARY_STARTER_ENTRIES_PT, ELEMENTARY_UNLOCKABLE_ENTRIES_PT,
  MIDDLE_STARTER_ENTRIES, MIDDLE_UNLOCKABLE_ENTRIES,
  MIDDLE_STARTER_ENTRIES_PT, MIDDLE_UNLOCKABLE_ENTRIES_PT,
  STARTER_ENTRIES_PT, UNLOCKABLE_ENTRIES_PT,
  LOCKED_COUNT, type HandbookEntry,
} from './entries'

const DISP  = "'Archivo Black', 'Arial Black', sans-serif"
const BODY  = "'Inter', system-ui, sans-serif"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'
const DIM   = '#555555'
const GREY  = '#EBEBEB'
const CREAM = '#FAFAF8'
const FAINT = '#d8d8d8'

type Level = 'elementary' | 'middle' | 'default'

function getLevel(pathname: string): Level {
  if (pathname.startsWith('/elementary') || pathname.startsWith('/mobile/elementary')) return 'elementary'
  if (pathname.startsWith('/middle') || pathname.startsWith('/mobile/middle')) return 'middle'
  return 'default'
}

function getEntries(level: Level, isPT: boolean) {
  if (level === 'elementary') return {
    starters:   isPT ? ELEMENTARY_STARTER_ENTRIES_PT   : ELEMENTARY_STARTER_ENTRIES,
    unlockPool: isPT ? ELEMENTARY_UNLOCKABLE_ENTRIES_PT : ELEMENTARY_UNLOCKABLE_ENTRIES,
  }
  if (level === 'middle') return {
    starters:   isPT ? MIDDLE_STARTER_ENTRIES_PT   : MIDDLE_STARTER_ENTRIES,
    unlockPool: isPT ? MIDDLE_UNLOCKABLE_ENTRIES_PT : MIDDLE_UNLOCKABLE_ENTRIES,
  }
  return {
    starters:   isPT ? STARTER_ENTRIES_PT   : STARTER_ENTRIES,
    unlockPool: isPT ? UNLOCKABLE_ENTRIES_PT : UNLOCKABLE_ENTRIES,
  }
}

// ── Index view ────────────────────────────────────────────────────────────────

function IndexView({ onSelect, onClose, unlockedIds, isPT, tourIdx, level }: {
  onSelect: (e: HandbookEntry, idx: number) => void
  onClose:  () => void
  unlockedIds: Set<string>
  isPT:     boolean
  tourIdx:  number   // -1 = no tour; 0..N = highlight this entry
  level:    Level
}) {
  const { starters, unlockPool } = getEntries(level, isPT)
  const unlocked   = unlockPool.filter(e => unlockedIds.has(e.id))
  const stillLocked = unlockPool.length - unlocked.length
  const allEntries = [...starters, ...unlocked]
  const inTour = tourIdx >= 0

  return (
    <>
      <div style={{ background: BLACK, padding: '10px 18px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: DISP, fontSize: 20, color: GREEN, letterSpacing: '-0.02em' }}>PAI</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: BODY, fontSize: 22, padding: 0, lineHeight: 1 }}>×</button>
      </div>
      <div style={{ padding: '14px 16px 4px', flexShrink: 0 }}>
        <span style={{ fontFamily: BODY, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM }}>{isPT ? 'Manual' : 'Handbook'}</span>
        {inTour && (
          <span style={{ fontFamily: BODY, fontSize: 10, color: GREEN, marginLeft: 10, opacity: 0.8 }}>
            {isPT ? `↓ Leia entrada ${tourIdx + 1}` : `↓ Read entry ${tourIdx + 1}`}
          </span>
        )}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 16px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {allEntries.map((entry, i) => {
          const isHighlighted = inTour && i === tourIdx
          const isDimmed      = inTour && i !== tourIdx && i < tourIdx

          return (
            <button
              key={entry.id}
              onClick={() => onSelect(entry, i)}
              style={{
                padding: '12px 14px', textAlign: 'left', cursor: 'pointer',
                background: isHighlighted ? BLACK : CREAM,
                border: `1.5px solid ${isHighlighted ? GREEN : BLACK}`,
                boxShadow: isHighlighted
                  ? `3px 3px 0 0 ${GREEN}, 0 0 0 4px rgba(61,245,66,0.18)`
                  : `3px 3px 0 0 ${BLACK}`,
                display: 'flex', alignItems: 'center', gap: 12,
                opacity: isDimmed ? 0.45 : 1,
                transition: 'all 0.2s',
                animation: isHighlighted ? 'hbPulse 1.8s ease-in-out infinite' : undefined,
              }}
            >
              <span style={{ fontFamily: BODY, fontSize: 10, color: isHighlighted ? GREEN : DIM, width: 20, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: DISP, fontSize: 12, lineHeight: 1.2, flex: 1, color: isHighlighted ? GREEN : BLACK }}>{entry.title}</span>
              <span style={{ fontFamily: BODY, fontSize: 12, color: isHighlighted ? GREEN : DIM }}>{isHighlighted ? (isPT ? '→ ler' : '→ read') : '→'}</span>
            </button>
          )
        })}
        {Array.from({ length: Math.max(0, stillLocked) }, (_, i) => (
          <div key={`locked-${i}`} style={{
            padding: '12px 14px',
            background: '#f5f4f0',
            border: `1.5px solid ${FAINT}`,
            opacity: 0.5,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontFamily: BODY, fontSize: 10, color: FAINT, width: 20, flexShrink: 0 }}>{String(allEntries.length + i + 1).padStart(2, '0')}</span>
            <span style={{ fontFamily: DISP, fontSize: 12, color: FAINT, flex: 1 }}>🔒 {isPT ? 'Bloqueado' : 'Locked'}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes hbPulse {
          0%, 100% { box-shadow: 3px 3px 0 0 ${GREEN}, 0 0 0 4px rgba(61,245,66,0.18); }
          50%       { box-shadow: 3px 3px 0 0 ${GREEN}, 0 0 0 8px rgba(61,245,66,0.35); }
        }
      `}</style>
    </>
  )
}

// ── Entry view ────────────────────────────────────────────────────────────────

function EntryView({ entry, onBack, isPT, tourIdx, totalStarters, onTourAdvance }: {
  entry:         HandbookEntry
  onBack:        () => void
  isPT:          boolean
  tourIdx:       number
  totalStarters: number
  onTourAdvance: () => void
}) {
  const inTour    = tourIdx >= 0
  const isLast    = tourIdx >= totalStarters - 1
  const nextLabel = isLast
    ? (isPT ? 'Concluir →' : 'Done →')
    : (isPT ? `Próxima entrada →` : `Next entry →`)

  const handleBack = () => {
    if (inTour) onTourAdvance()
    onBack()
  }

  return (
    <>
      <div style={{ background: BLACK, padding: '10px 18px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontFamily: DISP, fontSize: 16, padding: 0, lineHeight: 1 }}>←</button>
        <span style={{ fontFamily: DISP, fontSize: 20, color: GREEN, letterSpacing: '-0.02em' }}>PAI</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{ fontFamily: BODY, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, marginBottom: 6 }}>{isPT ? 'Entrada' : 'Entry'}</div>
          <h2 style={{ fontFamily: DISP, fontSize: 18, color: BLACK, margin: '0 0 14px', lineHeight: 1.15 }}>{entry.title}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {entry.body.split('\n\n').map((p, i) => (
              <p key={i} style={{ fontFamily: BODY, fontSize: 13, color: BLACK, lineHeight: 1.75, margin: 0 }}>{p}</p>
            ))}
          </div>
        </div>
        <div style={{ background: GREEN, border: `1.5px solid ${BLACK}`, boxShadow: `3px 3px 0 0 ${BLACK}`, padding: '12px 16px' }}>
          <div style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: BLACK, marginBottom: 6 }}>{isPT ? 'FAÇA' : 'DO'}</div>
          <p style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: BLACK, margin: 0, lineHeight: 1.55 }}>{entry.doLine}</p>
        </div>
        {entry.links && entry.links.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM }}>{isPT ? 'EXPERIMENTE' : 'TRY IT'}</div>
            {entry.links.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: '#fff',
                  border: `1.5px solid ${BLACK}`,
                  boxShadow: `3px 3px 0 0 ${BLACK}`,
                  fontFamily: DISP, fontSize: 12, color: BLACK,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                }}
              >
                {link.label}
                <span style={{ opacity: 0.4, fontSize: 14 }}>↗</span>
              </a>
            ))}
          </div>
        )}
        {inTour && (
          <button
            onClick={handleBack}
            style={{
              fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
              background: BLACK, color: GREEN, padding: '12px 0',
              border: `1.5px solid ${GREEN}`, cursor: 'pointer',
              boxShadow: `3px 3px 0 0 ${GREEN}`,
              marginTop: 4,
            }}
          >
            {nextLabel}
          </button>
        )}
      </div>
    </>
  )
}

// ── Handbook bar + spotlight ──────────────────────────────────────────────────

function HBButton({ onClick }: { onClick: () => void }) {
  const [isPT, setIsPT] = useState(false)
  useEffect(() => { setIsPT(localStorage.getItem('pai_lang') === 'pt') }, [])

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 48 }}>
      {/* Quiet, always-there bottom bar — no auto-popup, no forced spotlight */}
      <button
        onClick={onClick}
        aria-label="Open bonus content"
        style={{
          width: '100%',
          background: BLACK,
          borderTop: `1.5px solid ${GREEN}`,
          borderBottom: 'none', borderLeft: 'none', borderRight: 'none',
          cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
          paddingTop: 8,
          paddingBottom: 'max(8px, calc(8px + env(safe-area-inset-bottom, 0px)))',
          transition: 'all 0.3s',
          touchAction: 'manipulation',
        }}
      >
        <span style={{ fontFamily: BODY, fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM, userSelect: 'none' }}>
          {isPT ? 'CONTEÚDO BÔNUS' : 'BONUS CONTENT'}
        </span>
        <span style={{ fontFamily: DISP, fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase', color: GREEN, userSelect: 'none' }}>
          {isPT ? 'MANUAL DE IA' : 'AI HANDBOOK'}
        </span>
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
  const [selectedIdx, setSelectedIdx]     = useState(-1)
  const [unlockedIds, setUnlockedIds]     = useState<Set<string>>(new Set())
  const [isPT, setIsPT]                   = useState(false)
  const [tourIdx, setTourIdx]             = useState(-1)

  const level = getLevel(pathname)

  const advanceTour = useCallback(() => {
    const { starters } = getEntries(level, isPT)
    setTourIdx(prev => {
      const next = prev + 1
      if (next >= starters.length) {
        localStorage.setItem('pai_handbook_seen', 'true')
        return -1
      }
      return next
    })
  }, [level, isPT])

  useEffect(() => {
    setMounted(true)
    const lang = localStorage.getItem('pai_lang') ?? 'en'
    setIsPT(lang === 'pt')

    // Compute unlocked entries based on current level
    const currentLevel = getLevel(pathname)
    const { unlockPool } = getEntries(currentLevel, lang === 'pt')
    const ids = new Set<string>()
    for (const entry of unlockPool) {
      if (entry.unlocksAt && localStorage.getItem(`pai_lesson_${entry.unlocksAt}_done`)) {
        ids.add(entry.id)
      }
    }
    setUnlockedIds(ids)
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  // Don't hide on /home, /elementary/home, or /games — only hide on actual lesson/game pages
  const focusedRoute = /^\/(lesson\/|games\/[^/]+|complete|elementary\/lesson|elementary\/world)/.test(pathname)
  if (!mounted || pathname === '/') return null

  const openPopup = () => {
    setSelectedEntry(null)
    setSelectedIdx(-1)
    setOpen(true)
    setTimeout(() => setVisible(true), 20)
  }

  const closePopup = () => {
    setVisible(false)
    setTourIdx(-1)
    localStorage.setItem('pai_handbook_seen', 'true')
    setTimeout(() => { setOpen(false); setSelectedEntry(null); setSelectedIdx(-1) }, 220)
  }

  const selectEntry = (entry: HandbookEntry, idx: number) => {
    setVisible(false)
    setTimeout(() => { setSelectedEntry(entry); setSelectedIdx(idx); setVisible(true) }, 180)
  }

  const backToIndex = () => {
    setVisible(false)
    setTimeout(() => { setSelectedEntry(null); setSelectedIdx(-1); setVisible(true) }, 180)
  }

  const handleHBClick = () => {
    if (open) closePopup()
    else openPopup()
  }

  const { starters } = getEntries(level, isPT)

  return (
    <>
      {!focusedRoute && <HBButton onClick={handleHBClick} />}

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
              ? <EntryView
                  entry={selectedEntry}
                  onBack={backToIndex}
                  isPT={isPT}
                  tourIdx={tourIdx}
                  totalStarters={starters.length}
                  onTourAdvance={advanceTour}
                />
              : <IndexView
                  onSelect={selectEntry}
                  onClose={closePopup}
                  unlockedIds={unlockedIds}
                  isPT={isPT}
                  tourIdx={tourIdx}
                  level={level}
                />
            }
          </div>
        </>
      )}
    </>
  )
}
