'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { STARTER_ENTRIES, LOCKED_COUNT, type HandbookEntry } from './entries'

const DISP  = "'Archivo Black', 'Arial Black', sans-serif"
const BODY  = "'Inter', system-ui, sans-serif"
const BLACK = '#0a0a0a'
const GREEN = '#3DF542'
const DIM   = '#555555'
const FAINT = '#d8d8d8'
const CREAM = '#FAFAF8'

type TutorialStep = 'intro' | 'spotlight' | 'panel' | 'done'

// ── PAI Orb ───────────────────────────────────────────────────────────────────

function PaiOrb({ size = 48, talking = false }: { size?: number; talking?: boolean }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: 'radial-gradient(circle at 34% 30%, #3e3028, #1e1812)',
      boxShadow: '0 4px 18px rgba(0,0,0,0.40)',
      animation: talking ? 'paiAnalystTalking 0.85s ease-in-out infinite' : 'paiAnalystIdle 3s ease-in-out infinite',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: '20%', left: '22%', width: '26%', height: '20%', borderRadius: '50%', background: 'rgba(245,238,224,0.28)', filter: 'blur(1px)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '33%', height: '33%', borderRadius: '50%', border: '1.5px solid rgba(245,238,224,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '30%', height: '30%', borderRadius: '50%', background: 'rgba(245,238,224,0.40)' }} />
        </div>
      </div>
    </div>
  )
}

// ── Tutorial: centered dialog ─────────────────────────────────────────────────

function TutorialDialog({ text, ctaLabel, onCta, onSkip }: {
  text: string; ctaLabel: string; onCta: () => void; onSkip?: () => void
}) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 510, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{
        background: '#fff', border: `1.5px solid ${BLACK}`, boxShadow: `8px 8px 0 0 ${BLACK}`,
        maxWidth: 380, width: '100%', padding: 24,
        display: 'flex', flexDirection: 'column', gap: 20,
        animation: 'popIn 0.22s ease-out',
      }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <PaiOrb size={52} talking />
          <div>
            <div style={{ fontFamily: DISP, fontSize: 18, letterSpacing: '-0.02em', color: GREEN, marginBottom: 4, lineHeight: 1 }}>PAI</div>
            <p style={{ fontFamily: BODY, fontSize: 14, color: BLACK, lineHeight: 1.65, margin: 0 }}>{text}</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={onCta} style={{
            padding: '13px 0', background: BLACK, color: '#fff',
            border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${DIM}`,
            fontFamily: DISP, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer', width: '100%',
          }}>{ctaLabel}</button>
          {onSkip && (
            <button onClick={onSkip} style={{
              padding: '8px 0', background: 'transparent', color: DIM,
              border: 'none', fontFamily: BODY, fontSize: 12, cursor: 'pointer', width: '100%',
            }}>Skip tutorial</button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Tutorial: spotlight dialog above HB button ────────────────────────────────

function SpotlightDialog({ text }: { text: string }) {
  return (
    <div style={{
      position: 'fixed', bottom: 82, left: 20, zIndex: 510,
      maxWidth: 268, background: '#fff',
      border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${BLACK}`,
      padding: 16, animation: 'popIn 0.22s ease-out',
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <PaiOrb size={36} talking />
        <p style={{ fontFamily: BODY, fontSize: 13, color: BLACK, lineHeight: 1.6, margin: 0 }}>{text}</p>
      </div>
      <div style={{ position: 'absolute', bottom: -8, left: 22, width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: `8px solid ${BLACK}` }} />
      <div style={{ position: 'absolute', bottom: -6, left: 23, width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `7px solid #fff` }} />
    </div>
  )
}

// ── Index page ────────────────────────────────────────────────────────────────

function IndexPage({ tutorialMode, highlightIdx, onSelect, onTutorialContinue }: {
  tutorialMode: boolean
  highlightIdx: number
  onSelect: (e: HandbookEntry) => void
  onTutorialContinue: () => void
}) {
  const allHighlighted = highlightIdx >= STARTER_ENTRIES.length - 1
  return (
    <>
      <div style={{ background: BLACK, padding: '10px 18px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: DISP, fontSize: 11, color: GREEN, letterSpacing: '0.1em' }}>INDEX</span>
        <span style={{ fontFamily: BODY, fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>PAI Handbook</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tutorialMode && (
          <div style={{
            background: '#EBEBEB', border: `1.5px solid ${BLACK}`, boxShadow: `3px 3px 0 0 ${BLACK}`,
            padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start',
            marginBottom: 4, animation: 'popIn 0.22s ease-out',
          }}>
            <PaiOrb size={32} talking />
            <p style={{ fontFamily: BODY, fontSize: 12, color: BLACK, lineHeight: 1.6, margin: 0 }}>
              These three are already unlocked. The rest fill in as you learn. Read through them, then we'll begin.
            </p>
          </div>
        )}

        {STARTER_ENTRIES.map((entry, i) => {
          const lit = tutorialMode && i <= highlightIdx
          return (
            <button key={entry.id} onClick={() => onSelect(entry)} style={{
              padding: '12px 14px', textAlign: 'left', cursor: 'pointer',
              background: lit ? BLACK : CREAM,
              color: lit ? '#fff' : BLACK,
              border: `1px solid ${lit ? GREEN : '#d8d4c8'}`,
              boxShadow: lit ? `3px 3px 0 0 ${GREEN}` : `3px 3px 0 0 ${FAINT}`,
              transition: 'all 0.4s ease',
              animation: (tutorialMode && i === highlightIdx) ? 'tileGlow 0.5s ease-out' : undefined,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontFamily: BODY, fontSize: 10, color: lit ? 'rgba(255,255,255,0.5)' : DIM, width: 20, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: DISP, fontSize: 12, lineHeight: 1.2, flex: 1 }}>{entry.title}</span>
              <span style={{ fontFamily: BODY, fontSize: 12, color: lit ? 'rgba(255,255,255,0.45)' : DIM }}>→</span>
            </button>
          )
        })}

        {Array.from({ length: LOCKED_COUNT }, (_, i) => (
          <div key={`locked-${i}`} style={{
            padding: '12px 14px', background: '#f5f4f0',
            border: `1px solid ${FAINT}`, opacity: 0.6,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontFamily: BODY, fontSize: 10, color: FAINT, width: 20, flexShrink: 0 }}>{String(STARTER_ENTRIES.length + i + 1).padStart(2, '0')}</span>
            <span style={{ fontFamily: DISP, fontSize: 12, color: FAINT, flex: 1 }}>🔒 Locked</span>
          </div>
        ))}

        {tutorialMode && allHighlighted && (
          <button onClick={onTutorialContinue} style={{
            marginTop: 8, padding: '12px 0', width: '100%',
            background: GREEN, color: BLACK,
            border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${BLACK}`,
            fontFamily: DISP, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer', animation: 'popIn 0.3s ease-out',
          }}>Done Reading →</button>
        )}
      </div>
    </>
  )
}

// ── Entry page ────────────────────────────────────────────────────────────────

function EntryPage({ entry, onBack }: { entry: HandbookEntry; onBack: () => void }) {
  return (
    <>
      <div style={{ background: BLACK, padding: '10px 18px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: DISP, fontSize: 14, padding: 0, opacity: 0.8, lineHeight: 1 }}>←</button>
        <span style={{ fontFamily: DISP, fontSize: 11, color: GREEN, letterSpacing: '0.1em' }}>HANDBOOK</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
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
        <div>
          <div style={{ fontFamily: BODY, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, marginBottom: 8 }}>Try It</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[0, 1].map(i => (
              <div key={i} style={{ padding: '16px 10px', background: '#f0ede6', border: `1px solid #c8c8c8`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b8b4a8' }}>Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// ── Book modal ────────────────────────────────────────────────────────────────

const FLIP_MS = 780
const FLIP_EASE = `transform ${FLIP_MS}ms cubic-bezier(0.4,0,0.2,1)`

function BookModal({ onClose, tutorialMode, highlightIdx, onTutorialContinue }: {
  onClose: () => void
  tutorialMode: boolean
  highlightIdx: number
  onTutorialContinue: () => void
}) {
  const [coverAngle, setCoverAngle]     = useState(0)
  const [indexAngle, setIndexAngle]     = useState(0)
  const [coverAnim, setCoverAnim]       = useState(false)
  const [indexAnim, setIndexAnim]       = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<HandbookEntry | null>(null)
  const [coverOpen, setCoverOpen]       = useState(false)
  const [indexOpen, setIndexOpen]       = useState(false)

  const openCover = () => {
    if (coverOpen) return
    setCoverAnim(true)
    setCoverAngle(-175)
    setTimeout(() => { setCoverOpen(true); setCoverAnim(false) }, FLIP_MS)
  }

  const selectEntry = (entry: HandbookEntry) => {
    setSelectedEntry(entry)
    setIndexAnim(true)
    setIndexAngle(-175)
    setTimeout(() => { setIndexOpen(true); setIndexAnim(false) }, FLIP_MS)
  }

  const goBack = () => {
    setIndexAnim(true)
    setIndexAngle(0)
    setTimeout(() => { setSelectedEntry(null); setIndexOpen(false); setIndexAnim(false) }, FLIP_MS)
  }

  const layer = (angle: number, anim: boolean, zIdx: number, ptrNone: boolean) => ({
    position: 'absolute' as const, inset: 0,
    transformOrigin: 'left center',
    transform: `rotateY(${angle}deg)`,
    transition: anim ? FLIP_EASE : 'none',
    transformStyle: 'preserve-3d' as const,
    zIndex: zIdx,
    pointerEvents: (ptrNone ? 'none' : 'auto') as 'none' | 'auto',
  })

  const backFace = {
    position: 'absolute' as const, inset: 0,
    backfaceVisibility: 'hidden' as const,
    transform: 'rotateY(180deg)',
    background: '#ede9de',
    border: `1.5px solid ${BLACK}`,
  }

  return (
    <>
      <div
        onClick={tutorialMode ? undefined : onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', zIndex: 45 }}
      />

      {/* Outer container — green border lives here, never rotates away */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '88vw', maxWidth: 360,
        height: '80vh', maxHeight: 540,
        zIndex: 50,
        border: `2px solid ${GREEN}`,
        background: BLACK,
        animation: 'modalIn 0.9s cubic-bezier(0.16,1,0.3,1)',
      }}>

        {/* Page-edge stack on the right */}
        {[
          { r: -3, t: 0, b: 0, w: 5, bg: '#f0ece0', bd: '#d8d4c8' },
          { r: -7, t: 2, b: 2, w: 4, bg: '#e8e4d4', bd: '#ccc8b8' },
          { r: -10, t: 4, b: 4, w: 3, bg: '#dedad0', bd: '#beb8a8' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', top: s.t, bottom: s.b, right: s.r, width: s.w, background: s.bg, border: `1px solid ${s.bd}` }} />
        ))}

        {/* Book — shared perspective */}
        <div style={{ position: 'relative', width: '100%', height: '100%', perspective: '1100px' }}>

          {/* Layer 1 — Entry content */}
          <div style={{ position: 'absolute', inset: 6, zIndex: 1, background: CREAM, border: `1.5px solid ${BLACK}`, display: 'flex', flexDirection: 'column', overflow: 'hidden', pointerEvents: indexOpen ? 'auto' : 'none' }}>
            {selectedEntry && <EntryPage entry={selectedEntry} onBack={goBack} />}
          </div>

          {/* Layer 2 — Index page (inset 6px — black gap + green outer border frames it) */}
          <div style={{
            position: 'absolute', top: 6, left: 6, right: 6, bottom: 6,
            transformOrigin: '-6px center',
            transform: `rotateY(${indexAngle}deg)`,
            transition: indexAnim ? FLIP_EASE : 'none',
            transformStyle: 'preserve-3d',
            zIndex: 2,
            pointerEvents: indexOpen && !indexAnim ? 'none' : 'auto',
          }}>
            {/* Front: index content */}
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: CREAM, border: `1.5px solid ${BLACK}`, display: 'flex', flexDirection: 'column', overflow: 'hidden', pointerEvents: coverOpen && !indexOpen ? 'auto' : 'none' }}>
              <IndexPage tutorialMode={tutorialMode} highlightIdx={highlightIdx} onSelect={selectEntry} onTutorialContinue={onTutorialContinue} />
            </div>
            {/* Back: cream — visible as index page swings away */}
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: '#ede9de', border: `1.5px solid ${BLACK}` }} />
          </div>

          {/* Layer 3 — Cover (full size, no back face — disappears cleanly past 90°) */}
          <div style={layer(coverAngle, coverAnim, 3, coverOpen && !coverAnim)}>
            <div
              onClick={!coverOpen ? openCover : undefined}
              style={{
                position: 'absolute', inset: 0,
                backfaceVisibility: 'hidden',
                background: BLACK,
                cursor: !coverOpen ? 'pointer' : 'default',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 18, padding: '0 28px',
              }}
            >
              <div style={{ position: 'absolute', top: 18, left: 18, right: 18, borderTop: `1px solid rgba(61,245,66,0.2)` }} />
              <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18, borderTop: `1px solid rgba(61,245,66,0.2)` }} />
              <div style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.22em', color: GREEN, opacity: 0.5 }}>PAI</div>
              <div style={{ fontFamily: DISP, fontSize: 34, color: GREEN, letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.05, textShadow: '0 0 32px rgba(61,245,66,0.55)' }}>HANDBOOK</div>
              <div style={{ width: 48, height: 1.5, background: GREEN, opacity: 0.3 }} />
              <div style={{ fontFamily: BODY, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: GREEN, opacity: 0.4 }}>tap to open</div>
            </div>
            {/* No back face — cover vanishes cleanly past 90°, revealing index */}
          </div>
        </div>
      </div>
    </>
  )
}

// ── Handbook button ───────────────────────────────────────────────────────────

function HandbookButton({ onClick, zIndex, isSpotlit }: {
  onClick: () => void; zIndex: number; isSpotlit: boolean
}) {
  return (
    <button
      onClick={onClick}
      aria-label="Open handbook"
      style={{
        position: 'fixed', bottom: 24, left: 20, zIndex,
        width: 44, height: 44,
        background: BLACK,
        border: `1.5px solid ${GREEN}`,
        boxShadow: isSpotlit
          ? `4px 4px 0 0 ${GREEN}, 0 0 18px 6px rgba(61,245,66,0.65)`
          : `4px 4px 0 0 ${GREEN}`,
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: isSpotlit
          ? 'handbookPulseStrong 1.8s ease-in-out infinite'
          : 'handbookPulse 2s ease-in-out infinite',
      }}
    >
      <span style={{ fontFamily: DISP, fontSize: 9, color: GREEN, letterSpacing: '0.06em', userSelect: 'none' }}>HB</span>
    </button>
  )
}

// ── Provider ──────────────────────────────────────────────────────────────────

export default function HandbookProvider() {
  const pathname = usePathname()
  const [mounted, setMounted]           = useState(false)
  const [tutorialStep, setTutorialStep] = useState<TutorialStep | null>(null)
  const [panelOpen, setPanelOpen]       = useState(false)
  const [highlightIdx, setHighlightIdx] = useState(-1)

  useEffect(() => {
    setMounted(true)
    const onboardingDone = localStorage.getItem('pai_onboarding_done')
    const tutorialSeen   = localStorage.getItem('pai_handbook_seen')
    if (onboardingDone && !tutorialSeen) setTutorialStep('intro')
  }, [])

  useEffect(() => {
    if (tutorialStep !== 'panel') return
    setHighlightIdx(-1)
    const timers: ReturnType<typeof setTimeout>[] = []
    STARTER_ENTRIES.forEach((_, i) => {
      timers.push(setTimeout(() => setHighlightIdx(i), 700 + i * 1300))
    })
    return () => timers.forEach(clearTimeout)
  }, [tutorialStep])

  if (!mounted || pathname === '/') return null

  const skipTutorial     = () => { localStorage.setItem('pai_handbook_seen', 'true'); setTutorialStep(null); setPanelOpen(false) }
  const completeTutorial = () => { localStorage.setItem('pai_handbook_seen', 'true'); setTutorialStep(null); setPanelOpen(false) }

  const handleButtonClick = () => {
    if (tutorialStep === 'spotlight') {
      setTutorialStep('panel')
      setPanelOpen(true)
      return
    }
    setPanelOpen(p => !p)
  }

  const handlePanelClose = () => {
    setPanelOpen(false)
    if (tutorialStep === 'panel') setTutorialStep('done')
  }

  const handleTutorialContinue = () => {
    setPanelOpen(false)
    setTutorialStep('done')
  }

  const showDim    = tutorialStep === 'intro' || tutorialStep === 'spotlight' || tutorialStep === 'done'
  const buttonZIdx = tutorialStep === 'spotlight' ? 520 : 40

  return (
    <>
      <HandbookButton onClick={handleButtonClick} zIndex={buttonZIdx} isSpotlit={tutorialStep === 'spotlight'} />

      {showDim && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)', zIndex: 500 }} />}

      {tutorialStep === 'intro' && (
        <TutorialDialog
          text="Welcome. I'm PAI. I'm going to teach you how AI actually works, and just as importantly, how to actually use it. Before we start, let me show you something."
          ctaLabel="OK"
          onCta={() => setTutorialStep('spotlight')}
          onSkip={skipTutorial}
        />
      )}
      {tutorialStep === 'spotlight' && (
        <SpotlightDialog text="See that button? That's your handbook. Tap it any time you want to know how to actually do something with AI. Go ahead, tap it." />
      )}
      {tutorialStep === 'done' && (
        <TutorialDialog
          text="Great. Now you know what AI even is, and how to use this handbook. You're ready to learn."
          ctaLabel="Start Learning"
          onCta={completeTutorial}
        />
      )}

      {panelOpen && (
        <BookModal
          onClose={handlePanelClose}
          tutorialMode={tutorialStep === 'panel'}
          highlightIdx={highlightIdx}
          onTutorialContinue={handleTutorialContinue}
        />
      )}
    </>
  )
}
