'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { STARTER_ENTRIES, LOCKED_COUNT, type HandbookEntry } from './entries'

const DISP  = "'Archivo Black', 'Arial Black', sans-serif"
const BODY  = "'Inter', system-ui, sans-serif"
const BLACK = '#0a0a0a'
const GREY  = '#EBEBEB'
const GREEN = '#3DF542'
const DIM   = '#555555'
const FAINT = '#d8d8d8'

type TutorialStep = 'intro' | 'spotlight' | 'panel' | 'done'

// ── PAI Orb ───────────────────────────────────────────────────────────────────

function PaiOrb({ size = 48, talking = false }: { size?: number; talking?: boolean }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: 'radial-gradient(circle at 34% 30%, #3e3028, #1e1812)',
      boxShadow: '0 4px 18px rgba(0,0,0,0.40)',
      animation: talking
        ? 'paiAnalystTalking 0.85s ease-in-out infinite'
        : 'paiAnalystIdle 3s ease-in-out infinite',
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

// ── Tutorial: centered intro / done dialog ────────────────────────────────────

function TutorialDialog({ text, ctaLabel, onCta, onSkip }: {
  text: string
  ctaLabel: string
  onCta: () => void
  onSkip?: () => void
}) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 510, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{
        background: '#fff', border: `1.5px solid ${BLACK}`,
        boxShadow: `8px 8px 0 0 ${BLACK}`,
        maxWidth: 380, width: '100%', padding: 24,
        display: 'flex', flexDirection: 'column', gap: 20,
        animation: 'popIn 0.22s ease-out',
      }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <PaiOrb size={52} talking />
          <div>
            <div style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM, marginBottom: 6 }}>PAI</div>
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
              border: 'none', fontFamily: BODY, fontSize: 12,
              cursor: 'pointer', width: '100%',
            }}>Skip tutorial</button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Tutorial: spotlight dialog floating above the handbook button ──────────────

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
      {/* Arrow pointing down toward the button */}
      <div style={{
        position: 'absolute', bottom: -8, left: 22,
        width: 0, height: 0,
        borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
        borderTop: `8px solid ${BLACK}`,
      }} />
      <div style={{
        position: 'absolute', bottom: -6, left: 23,
        width: 0, height: 0,
        borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
        borderTop: `7px solid #fff`,
      }} />
    </div>
  )
}

// ── Entry detail view ─────────────────────────────────────────────────────────

function EntryDetail({ entry, onBack }: { entry: HandbookEntry; onBack: () => void }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '14px 20px 0', flexShrink: 0 }}>
        <button onClick={onBack} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: BODY, fontSize: 12, color: DIM, padding: 0,
        }}>← Back</button>
      </div>
      <div style={{ padding: '16px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{ fontFamily: BODY, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, marginBottom: 6 }}>Handbook Entry</div>
          <h2 style={{ fontFamily: DISP, fontSize: 19, color: BLACK, margin: '0 0 14px', lineHeight: 1.15 }}>{entry.title}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {entry.body.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontFamily: BODY, fontSize: 13, color: BLACK, lineHeight: 1.75, margin: 0 }}>{para}</p>
            ))}
          </div>
        </div>

        {/* DO callout */}
        <div style={{
          background: GREEN, border: `1.5px solid ${BLACK}`,
          boxShadow: `3px 3px 0 0 ${BLACK}`, padding: '12px 16px',
        }}>
          <div style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: BLACK, marginBottom: 6 }}>DO</div>
          <p style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: BLACK, margin: 0, lineHeight: 1.55 }}>{entry.doLine}</p>
        </div>

        {/* Try-it tile placeholders */}
        <div>
          <div style={{ fontFamily: BODY, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, marginBottom: 8 }}>Try It</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[0, 1].map(i => (
              <div key={i} style={{
                padding: '18px 12px', background: '#F5F5F5',
                border: `1.5px solid #C8C8C8`,
                boxShadow: '2px 2px 0 0 #C8C8C8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C0C0C0' }}>Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Handbook modal ────────────────────────────────────────────────────────────

function HandbookPanel({
  onClose, tutorialMode, highlightIdx, activeEntry, setActiveEntry, onTutorialContinue,
}: {
  onClose: () => void
  tutorialMode: boolean
  highlightIdx: number
  activeEntry: HandbookEntry | null
  setActiveEntry: (e: HandbookEntry | null) => void
  onTutorialContinue: () => void
}) {
  const allHighlighted = highlightIdx >= STARTER_ENTRIES.length - 1

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={tutorialMode ? undefined : onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 45 }}
      />

      {/* Centered modal */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '92vw', maxWidth: 520,
        maxHeight: '85vh',
        background: '#fff', border: `1.5px solid ${BLACK}`,
        boxShadow: `8px 8px 0 0 ${BLACK}`,
        zIndex: 50, display: 'flex', flexDirection: 'column',
        animation: 'popIn 0.22s ease-out',
      }}>
        {/* Header */}
        <div style={{
          background: BLACK, padding: '12px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
        }}>
          <span style={{ fontFamily: DISP, fontSize: 14, color: GREEN, letterSpacing: '0.04em' }}>HANDBOOK</span>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: '#fff',
            cursor: 'pointer', fontFamily: DISP, fontSize: 11,
            opacity: 0.65, padding: 0, letterSpacing: '0.06em',
          }}>✕</button>
        </div>

        {activeEntry ? (
          <EntryDetail entry={activeEntry} onBack={() => setActiveEntry(null)} />
        ) : (
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

            {/* Tutorial PAI bubble */}
            {tutorialMode && (
              <div style={{ padding: '14px 14px 6px', flexShrink: 0 }}>
                <div style={{
                  background: GREY, border: `1.5px solid ${BLACK}`,
                  boxShadow: `3px 3px 0 0 ${BLACK}`, padding: '12px 14px',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  animation: 'popIn 0.22s ease-out',
                }}>
                  <PaiOrb size={34} talking />
                  <p style={{ fontFamily: BODY, fontSize: 12, color: BLACK, lineHeight: 1.65, margin: 0 }}>
                    These three are already unlocked. The rest fill in as you learn. Read through them, then we'll begin.
                  </p>
                </div>
              </div>
            )}

            {/* Entry list */}
            <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              {STARTER_ENTRIES.map((entry, i) => {
                const lit = tutorialMode && i <= highlightIdx
                const popping = tutorialMode && i === highlightIdx
                return (
                  <button key={entry.id} onClick={() => setActiveEntry(entry)} style={{
                    padding: '14px 16px', textAlign: 'left', cursor: 'pointer',
                    background: lit ? BLACK : GREY,
                    color: lit ? '#fff' : BLACK,
                    border: `1.5px solid ${BLACK}`,
                    boxShadow: lit ? `4px 4px 0 0 ${GREEN}` : `4px 4px 0 0 ${BLACK}`,
                    transition: 'all 0.4s ease',
                    animation: popping ? 'tileGlow 0.5s ease-out' : undefined,
                  }}>
                    <div style={{
                      fontFamily: BODY, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: lit ? 'rgba(255,255,255,0.55)' : DIM, marginBottom: 4,
                    }}>Entry {String(i + 1).padStart(2, '0')}</div>
                    <div style={{ fontFamily: DISP, fontSize: 13, lineHeight: 1.2 }}>{entry.title}</div>
                  </button>
                )
              })}

              {/* Locked placeholders */}
              {Array.from({ length: LOCKED_COUNT }, (_, i) => (
                <div key={`locked-${i}`} style={{
                  padding: '14px 16px', background: '#F7F7F7',
                  border: `1.5px solid ${FAINT}`, opacity: 0.65,
                }}>
                  <div style={{ fontFamily: BODY, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: FAINT, marginBottom: 4 }}>
                    Entry {String(STARTER_ENTRIES.length + i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ fontFamily: DISP, fontSize: 13, color: FAINT, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 10, opacity: 0.6 }}>🔒</span> Locked
                  </div>
                </div>
              ))}
            </div>

            {/* Tutorial continue button */}
            {tutorialMode && allHighlighted && (
              <div style={{ padding: '10px 14px 20px', flexShrink: 0 }}>
                <button onClick={onTutorialContinue} style={{
                  width: '100%', padding: '13px 0',
                  background: GREEN, color: BLACK,
                  border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${BLACK}`,
                  fontFamily: DISP, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: 'pointer', animation: 'popIn 0.3s ease-out',
                }}>Done Reading →</button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

// ── Handbook button ───────────────────────────────────────────────────────────

function HandbookButton({ onClick, zIndex, isSpotlit }: {
  onClick: () => void
  zIndex: number
  isSpotlit: boolean
}) {
  return (
    <button
      onClick={onClick}
      aria-label="Open handbook"
      style={{
        position: 'fixed', bottom: 24, left: 20, zIndex,
        width: 44, height: 44,
        background: BLACK,
        border: `1.5px solid ${BLACK}`,
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: isSpotlit
          ? 'handbookPulseStrong 1.8s ease-in-out infinite'
          : 'handbookPulse 2s ease-in-out infinite',
        transition: 'animation 0.3s',
      }}
    >
      <span style={{ fontFamily: DISP, fontSize: 9, color: GREEN, letterSpacing: '0.06em', userSelect: 'none' }}>HB</span>
    </button>
  )
}

// ── Provider ──────────────────────────────────────────────────────────────────

export default function HandbookProvider() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [tutorialStep, setTutorialStep] = useState<TutorialStep | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [activeEntry, setActiveEntry] = useState<HandbookEntry | null>(null)
  const [highlightIdx, setHighlightIdx] = useState(-1)

  useEffect(() => {
    setMounted(true)
    const done = localStorage.getItem('pai_onboarding_done')
    if (done) setTutorialStep('intro')
  }, [])

  // Highlight entries sequentially during 'panel' tutorial step
  useEffect(() => {
    if (tutorialStep !== 'panel') return
    setHighlightIdx(-1)
    const timers: ReturnType<typeof setTimeout>[] = []
    STARTER_ENTRIES.forEach((_, i) => {
      timers.push(setTimeout(() => setHighlightIdx(i), 700 + i * 1300))
    })
    return () => timers.forEach(clearTimeout)
  }, [tutorialStep])

  // Don't render on the onboarding page
  if (!mounted || pathname === '/') return null

  const skipTutorial = () => {

    setTutorialStep(null)
    setPanelOpen(false)
  }

  const completeTutorial = () => {

    setTutorialStep(null)
    setPanelOpen(false)
  }

  const handleButtonClick = () => {
    if (tutorialStep === 'spotlight') {
      setTutorialStep('panel')
      setPanelOpen(true)
      return
    }
    setPanelOpen(p => !p)
    if (panelOpen) setActiveEntry(null)
  }

  const handlePanelClose = () => {
    setPanelOpen(false)
    setActiveEntry(null)
    if (tutorialStep === 'panel') setTutorialStep('done')
  }

  const handleTutorialContinue = () => {
    setPanelOpen(false)
    setActiveEntry(null)
    setTutorialStep('done')
  }

  const showDim = tutorialStep === 'intro' || tutorialStep === 'spotlight' || tutorialStep === 'done'
  const buttonZIndex = tutorialStep === 'spotlight' ? 520 : 40

  return (
    <>
      <HandbookButton
        onClick={handleButtonClick}
        zIndex={buttonZIndex}
        isSpotlit={tutorialStep === 'spotlight'}
      />

      {/* Dim overlay for intro / spotlight / done steps */}
      {showDim && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)', zIndex: 500 }} />
      )}

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
        <HandbookPanel
          onClose={handlePanelClose}
          tutorialMode={tutorialStep === 'panel'}
          highlightIdx={highlightIdx}
          activeEntry={activeEntry}
          setActiveEntry={setActiveEntry}
          onTutorialContinue={handleTutorialContinue}
        />
      )}
    </>
  )
}
