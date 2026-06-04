'use client'

import { useState, useEffect, useCallback } from 'react'
import type { AnalystRound, Choice } from '../data/analystRounds'

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

// ── Hearth palette ────────────────────────────────────────────────────────────

const DISP    = "var(--font-display, 'Arial Black', sans-serif)"
const BODY    = "var(--font-body, system-ui, sans-serif)"
const BLACK   = '#0a0a0a'
const FAINT   = '#d8d8d8'
const DIM     = '#555555'
const GREEN   = '#3DF542'
const CORRECT = '#27AE60'
const WRONG   = '#C0392B'

// ── PAI orb (kept — distinctive mascot) ──────────────────────────────────────

const PAI_ANIM: Record<PaiState, string> = {
  idle:      'paiAnalystIdle 3s ease-in-out infinite',
  talking:   'paiAnalystTalking 0.85s ease-in-out infinite',
  celebrate: 'paiAnalystCelebrate 0.65s ease-out',
  doubt:     'paiAnalystDoubt 0.55s ease-in-out',
  thinking:  'paiAnalystThinking 2s ease-in-out infinite',
}

function PaiOrb({ paiState }: { paiState: PaiState }) {
  return (
    <div style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0, background: 'radial-gradient(circle at 34% 30%, #3e3028, #1e1812)', boxShadow: '0 4px 18px rgba(0,0,0,0.40)', animation: PAI_ANIM[paiState], position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20%', left: '22%', width: '26%', height: '20%', borderRadius: '50%', background: 'rgba(245,238,224,0.28)', filter: 'blur(1px)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid rgba(245,238,224,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(245,238,224,0.40)' }} />
        </div>
      </div>
    </div>
  )
}

// ── Speech bubble — Hearth hard-shadow style ──────────────────────────────────

function SpeechBubble({ msg, msgKey }: { msg: string | null; msgKey: number }) {
  if (!msg) return null
  return (
    <div key={msgKey} style={{ background: '#fff', border: `1.5px solid ${BLACK}`, boxShadow: `3px 3px 0 0 ${BLACK}`, padding: '10px 14px', maxWidth: 260, fontSize: 13, fontFamily: BODY, color: BLACK, lineHeight: 1.5, animation: 'popIn 0.22s ease-out', position: 'relative', marginBottom: 8 }}>
      {msg}
      <div style={{ position: 'absolute', bottom: -7, left: 16, width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `7px solid ${BLACK}` }} />
    </div>
  )
}

// ── Credibility meter ─────────────────────────────────────────────────────────

function CredMeter({ value }: { value: number }) {
  const pct  = (value / 1000) * 100
  const tier = value >= 800 ? 'Sharp' : value >= 600 ? 'Credible' : value >= 400 ? 'Developing' : 'Reckless'

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>Credibility</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM }}>{tier}</span>
          <span style={{ fontFamily: DISP, fontSize: 13, color: BLACK, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        </div>
      </div>
      <div style={{ height: 6, background: FAINT }}>
        <div style={{ height: '100%', background: BLACK, width: `${pct}%`, transition: 'width 0.6s cubic-bezier(0.34,1.1,0.64,1)' }} />
      </div>
    </div>
  )
}

// ── Case file — hard-shadow editorial box ─────────────────────────────────────

function CaseFile({ round, visible }: { round: AnalystRound; visible: boolean }) {
  return (
    <div style={{ background: '#EBEBEB', border: `1.5px solid ${BLACK}`, boxShadow: `6px 6px 0 0 ${BLACK}`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.35s ease, transform 0.35s ease' }}>
      {/* Header */}
      <div style={{ padding: '10px 16px', borderBottom: `1px solid ${FAINT}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#E0E0E0' }}>
        <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>
          Case File #{String(round.id).padStart(2, '0')}
        </span>
        <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: BLACK, border: `1px solid ${round.era === 'test' ? BLACK : FAINT}`, padding: '1px 7px' }}>
          {round.era === 'training' ? 'Training' : '★ Test'}
        </span>
      </div>
      {/* Body */}
      <div style={{ padding: '16px 16px 18px' }}>
        <p style={{ margin: '0 0 12px', fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM }}>
          {round.year} · {round.source}
        </p>
        <blockquote style={{ margin: 0, padding: '12px 14px', background: '#fff', border: `1.5px solid ${FAINT}`, fontFamily: BODY, fontSize: 15, color: BLACK, lineHeight: 1.65, fontStyle: 'italic' }}>
          "{round.claim}"
        </blockquote>
      </div>
    </div>
  )
}

// ── Outcome panel ─────────────────────────────────────────────────────────────

function OutcomePanel({ round, selected, visible }: { round: AnalystRound; selected: Choice; visible: boolean }) {
  if (!visible) return null
  const outcome      = round.outcomes[selected]
  const isGood       = outcome.delta > 0
  const isBest       = selected === round.best
  const isGoodEnough = round.good?.includes(selected)
  const tag          = isBest ? 'Best read' : isGoodEnough ? 'Good enough' : 'Missed'

  return (
    <div style={{ animation: 'slideUpFade 0.3s ease-out', marginTop: 12 }}>
      <div style={{ background: '#EBEBEB', border: `1.5px solid ${BLACK}`, boxShadow: `4px 4px 0 0 ${isGood ? CORRECT : WRONG}`, padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: isGood ? CORRECT : WRONG }}>{tag}</span>
          <span style={{ fontFamily: DISP, fontSize: 13, color: isGood ? CORRECT : WRONG }}>{outcome.delta > 0 ? '+' : ''}{outcome.delta}</span>
        </div>
        <p style={{ margin: '0 0 10px', fontFamily: BODY, fontSize: 13, color: BLACK, lineHeight: 1.55 }}>{outcome.pai}</p>
        {!isBest && (
          <p style={{ margin: 0, fontFamily: DISP, fontSize: 9, letterSpacing: '0.10em', textTransform: 'uppercase', color: DIM }}>
            Best read: {CHOICE_LABELS[round.best]}
          </p>
        )}
      </div>
    </div>
  )
}

// ── Choice buttons ────────────────────────────────────────────────────────────

const CHOICE_LABELS: Record<Choice, string> = {
  big:   'Fund it big',
  small: 'Fund it small',
  pass:  'Pass',
  bluff: 'Call the bluff',
}

function ChoiceGrid({ selected, phase, round, onPick }: { selected: Choice | null; phase: Phase; round: AnalystRound; onPick: (c: Choice) => void }) {
  const choices: Choice[] = ['big', 'small', 'pass', 'bluff']
  const revealed = phase === 'outcome'

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
      {choices.map(c => {
        const isSelected   = selected === c
        const isBest       = c === round.best
        const isGoodAlt    = round.good?.includes(c)
        const isWrong      = revealed && isSelected && !isBest && !isGoodAlt
        const isCorrect    = revealed && (c === round.best || (isGoodAlt && isSelected))

        let bg     = isSelected ? BLACK : '#EBEBEB'
        let color  = isSelected ? '#fff' : BLACK
        let shadow = isSelected && !revealed ? `4px 4px 0 0 ${BLACK}` : `3px 3px 0 0 ${BLACK}`

        if (revealed) {
          if (isCorrect && isSelected)        { bg = CORRECT; color = '#fff'; shadow = `3px 3px 0 0 ${CORRECT}` }
          if (isWrong)                        { bg = WRONG;   color = '#fff'; shadow = `3px 3px 0 0 ${WRONG}` }
          if (isBest && !isSelected)          { shadow = `3px 3px 0 0 ${CORRECT}` }
        }

        return (
          <button key={c} onClick={() => !selected && !revealed && onPick(c)} disabled={!!selected || revealed} style={{ padding: '13px 10px', background: bg, color, border: `1.5px solid ${BLACK}`, boxShadow: shadow, fontFamily: DISP, fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', cursor: selected ? 'default' : 'pointer', textAlign: 'center', transition: 'all 0.12s ease' }}>
            {CHOICE_LABELS[c]}
            {revealed && c === round.best && !isSelected && (
              <div style={{ fontSize: 8, letterSpacing: '0.10em', color: CORRECT, marginTop: 3 }}>← BEST</div>
            )}
          </button>
        )
      })}
    </div>
  )
}

// ── End screen ────────────────────────────────────────────────────────────────

function EndScreen({ credibility, roundsWon, total, onBack }: { credibility: number; roundsWon: number; total: number; onBack: () => void }) {
  const xp    = credibility >= 800 ? 200 : credibility >= 600 ? 150 : credibility >= 400 ? 100 : 75
  const title = credibility >= 800 ? 'Sharp Analyst' : credibility >= 600 ? 'Credible Reader' : credibility >= 400 ? 'In Training' : 'Reckless'
  const msg   = credibility >= 800
    ? "Most adults fall for every hype cycle. You just didn't. That's the whole skill."
    : credibility >= 600
    ? "Good pattern recognition. A few cycles fooled you. That's how it goes."
    : "The patterns are there. You're starting to see them. Study the history again."

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingTop: 16, textAlign: 'center', maxWidth: 400, margin: '0 auto' }}>
      <div>
        <p style={{ margin: '0 0 4px', fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>Final rating</p>
        <h2 style={{ margin: 0, fontFamily: DISP, fontSize: 36, letterSpacing: '-0.02em', color: BLACK, fontWeight: 400 }}>{title}</h2>
        <p style={{ margin: '6px 0 0', fontFamily: DISP, fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: DIM }}>
          {credibility} / 1000 · {roundsWon}/{total} correct
        </p>
      </div>

      <div style={{ background: '#EBEBEB', border: `1.5px solid ${BLACK}`, boxShadow: `6px 6px 0 0 ${BLACK}`, padding: '16px 20px', animation: 'popIn 0.3s ease-out 0.3s both', width: '100%' }}>
        <p style={{ margin: 0, fontFamily: BODY, fontSize: 15, color: BLACK, lineHeight: 1.6, fontStyle: 'italic' }}>"{msg}"</p>
      </div>

      <div style={{ animation: 'xpPop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.5s both' }}>
        <p style={{ margin: 0, fontFamily: DISP, fontSize: 60, letterSpacing: '-0.03em', color: BLACK, lineHeight: 1 }}>+{xp}</p>
        <p style={{ margin: '2px 0 0', fontFamily: DISP, fontSize: 14, letterSpacing: '0.04em', textTransform: 'uppercase', color: DIM }}>XP</p>
      </div>

      <button onClick={onBack} style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#EBEBEB', color: BLACK, padding: '12px 32px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: `4px 4px 0 0 ${BLACK}` }}>
        Back to lessons →
      </button>
    </div>
  )
}

// ── Main component (game logic unchanged) ─────────────────────────────────────

export default function TheAnalyst({ rounds, onComplete }: Props) {
  const [roundIdx,     setRoundIdx]     = useState(0)
  const [credibility,  setCredibility]  = useState(500)
  const [prevCred,     setPrevCred]     = useState(500)
  const [phase,        setPhase]        = useState<Phase>('intro')
  const [selected,     setSelected]     = useState<Choice | null>(null)
  const [paiState,     setPaiState]     = useState<PaiState>('talking')
  const [paiMsg,       setPaiMsg]       = useState<string | null>(null)
  const [paiKey,       setPaiKey]       = useState(0)
  const [showCase,     setShowCase]     = useState(false)
  const [showChoices,  setShowChoices]  = useState(false)
  const [eraShiftDone, setEraShiftDone] = useState(false)
  const [roundsWon,    setRoundsWon]    = useState(0)

  const round     = rounds[roundIdx]
  const isTest    = round?.era === 'test'
  const prevEra   = roundIdx > 0 ? rounds[roundIdx - 1].era : null
  const firstTest = isTest && prevEra === 'training' && !eraShiftDone

  const say = useCallback((msg: string) => { setPaiMsg(msg); setPaiKey(k => k + 1) }, [])

  useEffect(() => {
    if (phase !== 'intro') return
    const timers: ReturnType<typeof setTimeout>[] = []
    if (firstTest) {
      setPaiState('thinking')
      say("Alright. You've seen the history. Now let's see if you actually learned the pattern — this next one's not in your notes.")
      setEraShiftDone(true)
      timers.push(setTimeout(() => {
        setPaiState('talking'); say(round.paiIntro)
        timers.push(setTimeout(() => setShowCase(true), 600))
        timers.push(setTimeout(() => { setPhase('choosing'); setPaiState('idle'); setPaiMsg(null); setShowChoices(true) }, 2800))
      }, 2600))
    } else {
      setPaiState('talking'); say(round.paiIntro)
      timers.push(setTimeout(() => setShowCase(true), 700))
      timers.push(setTimeout(() => { setPhase('choosing'); setPaiState('idle'); setPaiMsg(null); setShowChoices(true) }, 2500))
    }
    return () => timers.forEach(clearTimeout)
  }, [phase, round, firstTest]) // eslint-disable-line

  const handleChoice = useCallback((choice: Choice) => {
    if (selected || phase !== 'choosing') return
    setSelected(choice)
    const outcome = round.outcomes[choice]
    const newCred = Math.max(0, Math.min(1000, credibility + outcome.delta))
    const isWin   = choice === round.best || !!round.good?.includes(choice)
    if (isWin) setRoundsWon(w => w + 1)
    setPaiState('thinking'); setPaiMsg(null)
    setTimeout(() => { setPrevCred(credibility); setCredibility(newCred); setPhase('outcome'); setPaiState(outcome.delta > 0 ? 'celebrate' : 'doubt'); say(outcome.pai) }, 600)
  }, [selected, phase, round, credibility, say])

  const nextRound = useCallback(() => {
    if (roundIdx >= rounds.length - 1) { setPhase('complete'); onComplete?.({ credibility, roundsWon }); return }
    setPaiState('thinking'); setPaiMsg(null); setSelected(null); setShowCase(false); setShowChoices(false)
    setTimeout(() => { setRoundIdx(i => i + 1); setPhase('intro') }, 420)
  }, [roundIdx, rounds.length, credibility, roundsWon, onComplete])

  if (phase === 'complete') {
    return <EndScreen credibility={credibility} roundsWon={roundsWon} total={rounds.length} onBack={() => onComplete?.({ credibility, roundsWon })} />
  }

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative', paddingBottom: 90 }}>

      <CredMeter value={credibility} />

      {/* Round dots */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>Round {roundIdx + 1} of {rounds.length}</span>
        <div style={{ display: 'flex', gap: 5 }}>
          {rounds.map((r, i) => <div key={r.id} style={{ width: 8, height: 8, borderRadius: '50%', background: i < roundIdx ? BLACK : i === roundIdx ? GREEN : FAINT, transition: 'background 0.3s' }} />)}
        </div>
      </div>

      <CaseFile round={round} visible={showCase} />

      {phase === 'outcome' && selected && <OutcomePanel round={round} selected={selected} visible />}

      {showChoices && <ChoiceGrid selected={selected} phase={phase} round={round} onPick={handleChoice} />}

      {phase === 'outcome' && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
          <button onClick={nextRound} style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#EBEBEB', color: BLACK, padding: '10px 22px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: `4px 4px 0 0 ${BLACK}`, animation: 'popIn 0.3s ease-out 0.3s both' }}>
            {roundIdx >= rounds.length - 1 ? 'See results →' : 'Next case →'}
          </button>
        </div>
      )}

      {/* PAI orb — fixed bottom-left */}
      <div style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
        <SpeechBubble msg={paiMsg} msgKey={paiKey} />
        <PaiOrb paiState={paiState} />
      </div>
    </div>
  )
}
