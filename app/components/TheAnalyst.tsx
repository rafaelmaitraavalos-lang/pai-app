'use client'

import { useState, useEffect, useCallback } from 'react'
import type { AnalystRound, Choice } from '../data/analystRounds'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type PaiState = 'idle' | 'talking' | 'celebrate' | 'doubt' | 'thinking'
type Phase    = 'intro' | 'choosing' | 'outcome' | 'complete'

export interface AnalystResult {
  credibility: number
  roundsWon:   number
}

interface Props {
  rounds:      AnalystRound[]
  onComplete?: (result: AnalystResult) => void
}

// ─────────────────────────────────────────────────────────────────────────────
// Palette (inherits app identity exactly)
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  cream:    '#F2EBE0',
  mist:     '#FAF6F0',
  caramel:  '#BA7517',
  dark:     '#7A4A0A',
  brown:    '#3D1A00',
  brown60:  '#9A5A10',
  line:     '#E5D4BA',
  white:    '#FFFFFF',
  correct:  '#27AE60',
  wrong:    '#C0392B',
  neutral:  '#888',
}

// ─────────────────────────────────────────────────────────────────────────────
// PAI Analyst orb — dark, professional, distinct from the warm lesson orb
// ─────────────────────────────────────────────────────────────────────────────

const PAI_ANIM: Record<PaiState, string> = {
  idle:      'paiAnalystIdle 3s ease-in-out infinite',
  talking:   'paiAnalystTalking 0.85s ease-in-out infinite',
  celebrate: 'paiAnalystCelebrate 0.65s ease-out',
  doubt:     'paiAnalystDoubt 0.55s ease-in-out',
  thinking:  'paiAnalystThinking 2s ease-in-out infinite',
}

function PaiOrb({ paiState }: { paiState: PaiState }) {
  return (
    <div style={{
      width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
      background: 'radial-gradient(circle at 34% 30%, #3e3028, #1e1812)',
      boxShadow: paiState === 'celebrate'
        ? `0 0 0 6px rgba(186,117,23,0.22), 0 8px 24px rgba(0,0,0,0.45)`
        : '0 4px 18px rgba(0,0,0,0.40)',
      animation: PAI_ANIM[paiState],
      position: 'relative',
    }}>
      {/* Lens highlight */}
      <div style={{
        position: 'absolute', top: '20%', left: '22%',
        width: '26%', height: '20%', borderRadius: '50%',
        background: 'rgba(245,238,224,0.28)', filter: 'blur(1px)',
      }} />
      {/* Inner ring glyph */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 18, height: 18, borderRadius: '50%',
          border: '1.5px solid rgba(245,238,224,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'rgba(245,238,224,0.40)',
          }} />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Speech bubble — anchored to orb in bottom-left corner
// ─────────────────────────────────────────────────────────────────────────────

function SpeechBubble({ msg, msgKey }: { msg: string | null; msgKey: number }) {
  if (!msg) return null
  return (
    <div
      key={msgKey}
      style={{
        background: C.white, borderRadius: 12, padding: '11px 15px',
        maxWidth: 280, boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        fontSize: 13, fontWeight: 600, color: C.brown, lineHeight: 1.5,
        animation: 'popIn 0.28s ease-out', position: 'relative',
        marginBottom: 8,
      }}
    >
      {msg}
      <div style={{
        position: 'absolute', bottom: -7, left: 18,
        width: 0, height: 0,
        borderLeft: '7px solid transparent',
        borderRight: '7px solid transparent',
        borderTop: `7px solid ${C.white}`,
      }} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Credibility meter
// ─────────────────────────────────────────────────────────────────────────────

function CredMeter({ value, prev }: { value: number; prev: number }) {
  const pct = (value / 1000) * 100

  const tier =
    value >= 800 ? { label: 'Sharp',      color: C.correct   } :
    value >= 600 ? { label: 'Credible',   color: C.caramel   } :
    value >= 400 ? { label: 'Developing', color: C.brown60   } :
                   { label: 'Reckless',   color: C.wrong     }

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.brown60 }}>
          Credibility
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: tier.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {tier.label}
          </span>
          <span style={{ fontSize: 14, fontWeight: 900, color: C.brown, fontVariantNumeric: 'tabular-nums' }}>
            {value}
          </span>
        </div>
      </div>
      <div style={{ height: 8, background: C.line, borderRadius: 4, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 4,
          background: `linear-gradient(to right, ${tier.color}88, ${tier.color})`,
          width: `${pct}%`,
          transition: 'width 0.6s cubic-bezier(0.34,1.1,0.64,1)',
        }} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Case file card
// ─────────────────────────────────────────────────────────────────────────────

function CaseFile({ round, visible }: { round: AnalystRound; visible: boolean }) {
  return (
    <div style={{
      background: C.mist, borderRadius: 14,
      boxShadow: '0 4px 20px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.06)',
      border: `1px solid ${C.line}`,
      overflow: 'hidden', position: 'relative',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(10px)',
      transition: 'opacity 0.4s ease, transform 0.4s ease',
    }}>
      {/* Header strip */}
      <div style={{
        background: C.cream, borderBottom: `1px solid ${C.line}`,
        padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 10, fontWeight: 900, color: C.brown60, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
          Case File #{String(round.id).padStart(2, '0')}
        </span>
        {/* Era stamp */}
        <div style={{
          padding: '2px 10px', borderRadius: 4,
          background: round.era === 'training' ? `${C.caramel}18` : `${C.brown}14`,
          border: `1px solid ${round.era === 'training' ? C.caramel : C.brown}50`,
          fontSize: 9, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: round.era === 'training' ? C.caramel : C.brown,
        }}>
          {round.era === 'training' ? 'Training' : '★ Test'}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 18px 20px' }}>
        <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, color: C.brown60, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {round.year} · {round.source}
        </p>
        <blockquote style={{
          margin: 0, padding: '14px 16px',
          background: C.white, borderRadius: 10,
          borderLeft: `3px solid ${C.caramel}`,
          fontSize: 15, fontWeight: 600, color: C.brown, lineHeight: 1.6,
          fontStyle: 'italic',
        }}>
          "{round.claim}"
        </blockquote>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Outcome panel — slides in below case file after choice
// ─────────────────────────────────────────────────────────────────────────────

function OutcomePanel({
  round, selected, visible,
}: {
  round: AnalystRound; selected: Choice; visible: boolean
}) {
  if (!visible) return null
  const outcome = round.outcomes[selected]
  const isGood  = outcome.delta > 0
  const isBest  = selected === round.best
  const isGoodEnough = round.good?.includes(selected)

  const tag = isBest ? 'Best read' : isGoodEnough ? 'Good enough' : 'Missed'
  const tagColor = isBest ? C.correct : isGoodEnough ? C.caramel : C.wrong

  return (
    <div style={{ animation: 'outcomeSlide 0.35s ease-out', marginTop: 12 }}>
      <div style={{
        background: C.white, borderRadius: 12,
        border: `2px solid ${isGood ? C.correct : C.wrong}30`,
        padding: '14px 16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: tagColor }}>
            {tag}
          </span>
          <span style={{
            fontSize: 13, fontWeight: 900,
            color: isGood ? C.correct : C.wrong,
          }}>
            {outcome.delta > 0 ? '+' : ''}{outcome.delta}
          </span>
        </div>
        <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 600, color: C.brown, lineHeight: 1.5 }}>
          {outcome.pai}
        </p>
        {!isBest && (
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: C.brown60 }}>
            Best read: <strong style={{ color: C.brown }}>{CHOICE_LABELS[round.best]}</strong>
          </p>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Choice buttons
// ─────────────────────────────────────────────────────────────────────────────

const CHOICE_LABELS: Record<Choice, string> = {
  big:   'Fund it big',
  small: 'Fund it small',
  pass:  'Pass',
  bluff: 'Call the bluff',
}

const CHOICE_STYLE: Record<Choice, { bg: string; border: string; text: string }> = {
  big:   { bg: '#2c1800', border: '#2c1800', text: '#f5ede0' },
  small: { bg: '#5a3200', border: '#5a3200', text: '#f5ede0' },
  pass:  { bg: 'transparent', border: C.line, text: C.brown },
  bluff: { bg: C.caramel, border: C.dark, text: '#f5ede0' },
}

function ChoiceGrid({
  selected, phase, round, onPick,
}: {
  selected: Choice | null; phase: Phase; round: AnalystRound; onPick: (c: Choice) => void
}) {
  const choices: Choice[] = ['big', 'small', 'pass', 'bluff']
  const revealed = phase === 'outcome'

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14,
    }}>
      {choices.map(c => {
        const isSelected = selected === c
        const isBest     = c === round.best
        const isGoodAlt  = round.good?.includes(c)
        const isWrong    = revealed && isSelected && !isBest && !isGoodAlt
        const isCorrect  = revealed && (c === round.best || (isGoodAlt && isSelected))

        const baseStyle  = CHOICE_STYLE[c]
        let bg     = isSelected ? baseStyle.bg : 'transparent'
        let border = isSelected ? baseStyle.border : C.line
        let text   = isSelected ? baseStyle.text : C.brown

        if (revealed) {
          if (isCorrect && isSelected) { bg = `${C.correct}15`; border = C.correct; text = C.brown }
          if (isWrong)                 { bg = `${C.wrong}10`;   border = C.wrong;   text = C.brown }
          if (c === round.best && !isSelected) { border = `${C.correct}55`; text = C.brown }
        }

        return (
          <button
            key={c}
            onClick={() => !selected && !revealed && onPick(c)}
            disabled={!!selected || revealed}
            style={{
              padding: '13px 12px', borderRadius: 10,
              border: `2px solid ${border}`, background: bg, color: text,
              fontSize: 13, fontWeight: 700, cursor: selected ? 'default' : 'pointer',
              textAlign: 'center', transition: 'all 0.15s ease',
              transform: 'translateY(0)',
              boxShadow: isSelected && !revealed ? '0 3px 10px rgba(0,0,0,0.12)' : 'none',
            }}
            onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
          >
            {CHOICE_LABELS[c]}
            {revealed && c === round.best && !isSelected && (
              <div style={{ fontSize: 10, fontWeight: 800, color: C.correct, marginTop: 2, letterSpacing: '0.06em' }}>
                ← BEST READ
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// End screen
// ─────────────────────────────────────────────────────────────────────────────

function EndScreen({
  credibility, roundsWon, total, onBack,
}: {
  credibility: number; roundsWon: number; total: number; onBack: () => void
}) {
  const xp =
    credibility >= 800 ? 200 :
    credibility >= 600 ? 150 :
    credibility >= 400 ? 100 : 75

  const msg =
    credibility >= 800
      ? "Most adults fall for every hype cycle. You just didn't. That's the whole skill."
      : credibility >= 600
      ? "Good pattern recognition. A few cycles fooled you. That's how it goes."
      : "The patterns are there. You're starting to see them. Study the history again."

  const title =
    credibility >= 800 ? 'Sharp Analyst' :
    credibility >= 600 ? 'Credible Reader' :
    credibility >= 400 ? 'In Training' : 'Reckless'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingTop: 16, textAlign: 'center', maxWidth: 400, margin: '0 auto' }}>
      {/* Orb */}
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'radial-gradient(circle at 34% 30%, #3e3028, #1e1812)',
        boxShadow: '0 8px 28px rgba(0,0,0,0.35), 0 0 0 8px rgba(186,117,23,0.15)',
        animation: 'paiAnalystCelebrate 0.7s ease-out',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: '20%', left: '22%', width: '26%', height: '20%', borderRadius: '50%', background: 'rgba(245,238,224,0.28)', filter: 'blur(1px)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', border: '1.5px solid rgba(245,238,224,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(245,238,224,0.40)' }} />
          </div>
        </div>
      </div>

      {/* Title */}
      <div>
        <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: C.brown60 }}>
          Final rating
        </p>
        <p style={{ margin: 0, fontSize: 26, fontWeight: 900, color: C.brown }}>{title}</p>
        <p style={{ margin: '4px 0 0', fontSize: 14, fontWeight: 700, color: C.caramel }}>
          {credibility} / 1000 credibility · {roundsWon}/{total} correct reads
        </p>
      </div>

      {/* PAI's closing line */}
      <div style={{
        background: C.white, borderRadius: 14, padding: '16px 20px',
        boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
        fontSize: 15, fontWeight: 700, color: C.brown, lineHeight: 1.55,
        animation: 'popIn 0.3s ease-out 0.3s both',
      }}>
        "{msg}"
      </div>

      {/* XP */}
      <div style={{ animation: 'xpPop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.5s both' }}>
        <p style={{ margin: 0, fontSize: 60, fontWeight: 900, color: C.caramel, lineHeight: 1 }}>+{xp}</p>
        <p style={{ margin: '2px 0 0', fontSize: 18, fontWeight: 800, color: C.brown60 }}>XP</p>
      </div>

      <button
        onClick={onBack}
        style={{
          padding: '13px 32px', borderRadius: 24,
          background: C.brown, color: '#f5ede0',
          fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer',
          boxShadow: `0 5px 0 ${C.caramel}88`,
        }}
      >
        Back to lessons
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function TheAnalyst({ rounds, onComplete }: Props) {
  const [roundIdx,      setRoundIdx]      = useState(0)
  const [credibility,   setCredibility]   = useState(500)
  const [prevCred,      setPrevCred]      = useState(500)
  const [phase,         setPhase]         = useState<Phase>('intro')
  const [selected,      setSelected]      = useState<Choice | null>(null)
  const [paiState,      setPaiState]      = useState<PaiState>('talking')
  const [paiMsg,        setPaiMsg]        = useState<string | null>(null)
  const [paiKey,        setPaiKey]        = useState(0)
  const [showCase,      setShowCase]      = useState(false)
  const [showChoices,   setShowChoices]   = useState(false)
  const [eraShiftDone,  setEraShiftDone]  = useState(false)
  const [roundsWon,     setRoundsWon]     = useState(0)

  const round    = rounds[roundIdx]
  const isTest   = round?.era === 'test'
  const prevEra  = roundIdx > 0 ? rounds[roundIdx - 1].era : null
  const firstTest = isTest && prevEra === 'training' && !eraShiftDone

  const say = useCallback((msg: string) => {
    setPaiMsg(msg)
    setPaiKey(k => k + 1)
  }, [])

  // ── Round start ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'intro') return

    const timers: ReturnType<typeof setTimeout>[] = []

    if (firstTest) {
      setPaiState('thinking')
      say("Alright. You've seen the history. Now let's see if you actually learned the pattern — this next one's not in your notes.")
      setEraShiftDone(true)
      timers.push(setTimeout(() => {
        setPaiState('talking')
        say(round.paiIntro)
        timers.push(setTimeout(() => setShowCase(true), 600))
        timers.push(setTimeout(() => {
          setPhase('choosing')
          setPaiState('idle')
          setPaiMsg(null)
          setShowChoices(true)
        }, 2800))
      }, 2600))
    } else {
      setPaiState('talking')
      say(round.paiIntro)
      timers.push(setTimeout(() => setShowCase(true), 700))
      timers.push(setTimeout(() => {
        setPhase('choosing')
        setPaiState('idle')
        setPaiMsg(null)
        setShowChoices(true)
      }, 2500))
    }

    return () => timers.forEach(clearTimeout)
  }, [phase, round, firstTest]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Player makes a choice ────────────────────────────────────────────────
  const handleChoice = useCallback((choice: Choice) => {
    if (selected || phase !== 'choosing') return
    setSelected(choice)

    const outcome = round.outcomes[choice]
    const newCred = Math.max(0, Math.min(1000, credibility + outcome.delta))
    const isGood  = outcome.delta > 0
    const isWin   = choice === round.best || !!round.good?.includes(choice)

    if (isWin) setRoundsWon(w => w + 1)

    setPaiState('thinking')
    setPaiMsg(null)

    const t1 = setTimeout(() => {
      setPrevCred(credibility)
      setCredibility(newCred)
      setPhase('outcome')
      setPaiState(isGood ? 'celebrate' : 'doubt')
      say(outcome.pai)
    }, 600)

    const t2 = setTimeout(() => {
      if (!isGood) setPaiState('doubt')
    }, 1200)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [selected, phase, round, credibility, say])

  // ── Advance to next round ────────────────────────────────────────────────
  const nextRound = useCallback(() => {
    if (roundIdx >= rounds.length - 1) {
      setPhase('complete')
      onComplete?.({ credibility, roundsWon })
      return
    }

    setPaiState('thinking')
    setPaiMsg(null)
    setSelected(null)
    setShowCase(false)
    setShowChoices(false)

    setTimeout(() => {
      setRoundIdx(i => i + 1)
      setPhase('intro')
    }, 420)
  }, [roundIdx, rounds.length, credibility, roundsWon, onComplete])

  // ─────────────────────────────────────────────────────────────────────────
  // Complete phase
  // ─────────────────────────────────────────────────────────────────────────

  if (phase === 'complete') {
    return (
      <EndScreen
        credibility={credibility}
        roundsWon={roundsWon}
        total={rounds.length}
        onBack={() => onComplete?.({ credibility, roundsWon })}
      />
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Main game render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 16px', position: 'relative', paddingBottom: 90 }}>

      {/* Credibility meter */}
      <CredMeter value={credibility} prev={prevCred} />

      {/* Round indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: C.brown60, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Round {roundIdx + 1} of {rounds.length}
        </span>
        <div style={{ display: 'flex', gap: 5 }}>
          {rounds.map((r, i) => (
            <div
              key={r.id}
              style={{
                width: 8, height: 8, borderRadius: '50%',
                background: i < roundIdx ? C.caramel : i === roundIdx ? C.brown : C.line,
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
      </div>

      {/* Case file */}
      <CaseFile round={round} visible={showCase} />

      {/* Outcome */}
      {phase === 'outcome' && selected && (
        <OutcomePanel round={round} selected={selected} visible={true} />
      )}

      {/* Choice buttons */}
      {showChoices && (
        <ChoiceGrid
          selected={selected}
          phase={phase}
          round={round}
          onPick={handleChoice}
        />
      )}

      {/* Next button */}
      {phase === 'outcome' && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
          <button
            onClick={nextRound}
            style={{
              padding: '12px 32px', borderRadius: 24,
              background: C.brown, color: '#f5ede0',
              fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer',
              boxShadow: `0 4px 0 ${C.caramel}88`, animation: 'popIn 0.3s ease-out 0.3s both',
            }}
          >
            {roundIdx >= rounds.length - 1 ? 'See results' : 'Next case →'}
          </button>
        </div>
      )}

      {/* PAI orb — fixed bottom-left */}
      <div style={{
        position: 'fixed', bottom: 20, left: 20, zIndex: 60,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8,
      }}>
        <SpeechBubble msg={paiMsg} msgKey={paiKey} />
        <PaiOrb paiState={paiState} />
      </div>
    </div>
  )
}
