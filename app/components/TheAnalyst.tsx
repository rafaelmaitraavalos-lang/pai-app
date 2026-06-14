'use client'

import { useState, useEffect, useCallback } from 'react'
import type { AnalystRound, Choice } from '../data/analystRounds'

type Phase = 'intro' | 'choosing' | 'outcome' | 'complete'

export interface AnalystResult {
  credibility: number
  roundsWon:   number
}

interface Props {
  rounds:      AnalystRound[]
  onComplete?: (result: AnalystResult) => void
  isPT?:       boolean
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


// ── Credibility meter ─────────────────────────────────────────────────────────

function CredMeter({ value, isPT }: { value: number; isPT?: boolean }) {
  const pct  = (value / 1000) * 100
  const tier = isPT
    ? (value >= 800 ? 'Preciso' : value >= 600 ? 'Credível' : value >= 400 ? 'Desenvolvendo' : 'Imprudente')
    : (value >= 800 ? 'Sharp' : value >= 600 ? 'Credible' : value >= 400 ? 'Developing' : 'Reckless')

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>{isPT ? 'Credibilidade' : 'Credibility'}</span>
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

function CaseFile({ round, visible, isPT }: { round: AnalystRound; visible: boolean; isPT?: boolean }) {
  return (
    <div style={{ background: '#EBEBEB', border: `1.5px solid ${BLACK}`, boxShadow: `6px 6px 0 0 ${BLACK}`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.35s ease, transform 0.35s ease' }}>
      {/* Header */}
      <div style={{ padding: '10px 16px', borderBottom: `1px solid ${FAINT}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#E0E0E0' }}>
        <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>
          {isPT ? 'Arquivo' : 'Case File'} #{String(round.id).padStart(2, '0')}
        </span>
        <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: BLACK, border: `1px solid ${round.era === 'test' ? BLACK : FAINT}`, padding: '1px 7px' }}>
          {round.era === 'training' ? (isPT ? 'Treinamento' : 'Training') : (isPT ? '★ Teste' : '★ Test')}
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

function OutcomePanel({ round, selected, visible, isPT }: { round: AnalystRound; selected: Choice; visible: boolean; isPT?: boolean }) {
  if (!visible) return null
  const outcome      = round.outcomes[selected]
  const isGood       = outcome.delta > 0
  const isBest       = selected === round.best
  const isGoodEnough = round.good?.includes(selected)
  const tag          = isBest
    ? (isPT ? 'Melhor leitura' : 'Best read')
    : isGoodEnough
    ? (isPT ? 'Suficiente' : 'Good enough')
    : (isPT ? 'Errou' : 'Missed')

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
            {isPT ? 'Melhor leitura' : 'Best read'}: {isPT ? CHOICE_LABELS_PT[round.best] : CHOICE_LABELS[round.best]}
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

const CHOICE_LABELS_PT: Record<Choice, string> = {
  big:   'Investe pesado',
  small: 'Investe pouco',
  pass:  'Passa',
  bluff: 'Desmascara o blefe',
}

function ChoiceGrid({ selected, phase, round, onPick, isPT }: { selected: Choice | null; phase: Phase; round: AnalystRound; onPick: (c: Choice) => void; isPT?: boolean }) {
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
            {isPT ? CHOICE_LABELS_PT[c] : CHOICE_LABELS[c]}
            {revealed && c === round.best && !isSelected && (
              <div style={{ fontSize: 8, letterSpacing: '0.10em', color: CORRECT, marginTop: 3 }}>{isPT ? '← MELHOR' : '← BEST'}</div>
            )}
          </button>
        )
      })}
    </div>
  )
}

// ── End screen ────────────────────────────────────────────────────────────────

function EndScreen({ credibility, roundsWon, total, onBack, isPT }: { credibility: number; roundsWon: number; total: number; onBack: () => void; isPT?: boolean }) {
  const xp    = credibility >= 800 ? 200 : credibility >= 600 ? 150 : credibility >= 400 ? 100 : 75
  const title = isPT
    ? (credibility >= 800 ? 'Analista Preciso' : credibility >= 600 ? 'Leitor Credível' : credibility >= 400 ? 'Em Treinamento' : 'Imprudente')
    : (credibility >= 800 ? 'Sharp Analyst' : credibility >= 600 ? 'Credible Reader' : credibility >= 400 ? 'In Training' : 'Reckless')
  const msg = isPT
    ? (credibility >= 800
      ? "A maioria dos adultos cai em todo ciclo de hype. Você não caiu. Essa é a habilidade inteira."
      : credibility >= 600
      ? "Boa leitura de padrões. Alguns ciclos te enganaram. É assim que funciona."
      : "Os padrões estão lá. Você está começando a vê-los. Estude o histórico novamente.")
    : (credibility >= 800
      ? "Most adults fall for every hype cycle. You just didn't. That's the whole skill."
      : credibility >= 600
      ? "Good pattern recognition. A few cycles fooled you. That's how it goes."
      : "The patterns are there. You're starting to see them. Study the history again.")

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingTop: 16, textAlign: 'center', maxWidth: 400, margin: '0 auto' }}>
      <div>
        <p style={{ margin: '0 0 4px', fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>{isPT ? 'Avaliação final' : 'Final rating'}</p>
        <h2 style={{ margin: 0, fontFamily: DISP, fontSize: 36, letterSpacing: '-0.02em', color: BLACK, fontWeight: 400 }}>{title}</h2>
        <p style={{ margin: '6px 0 0', fontFamily: DISP, fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: DIM }}>
          {credibility} / 1000 · {roundsWon}/{total} {isPT ? 'corretos' : 'correct'}
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
        {isPT ? 'Voltar às aulas →' : 'Back to lessons →'}
      </button>
    </div>
  )
}

// ── Main component (game logic unchanged) ─────────────────────────────────────

export default function TheAnalyst({ rounds, onComplete, isPT }: Props) {
  const [roundIdx,     setRoundIdx]     = useState(0)
  const [credibility,  setCredibility]  = useState(500)
  const [prevCred,     setPrevCred]     = useState(500)
  const [phase,        setPhase]        = useState<Phase>('intro')
  const [selected,     setSelected]     = useState<Choice | null>(null)
  const [showCase,     setShowCase]     = useState(false)
  const [showChoices,  setShowChoices]  = useState(false)
  const [eraShiftDone, setEraShiftDone] = useState(false)
  const [roundsWon,    setRoundsWon]    = useState(0)

  const round     = rounds[roundIdx]
  const isTest    = round?.era === 'test'
  const prevEra   = roundIdx > 0 ? rounds[roundIdx - 1].era : null
  const firstTest = isTest && prevEra === 'training' && !eraShiftDone

  useEffect(() => {
    if (phase !== 'intro') return
    const timers: ReturnType<typeof setTimeout>[] = []
    if (firstTest) {
      setEraShiftDone(true)
    }
    timers.push(setTimeout(() => { setShowCase(true); setPhase('choosing'); setShowChoices(true) }, 120))
    return () => timers.forEach(clearTimeout)
  }, [phase, round, firstTest]) // eslint-disable-line

  const handleChoice = useCallback((choice: Choice) => {
    if (selected || phase !== 'choosing') return
    setSelected(choice)
    const outcome = round.outcomes[choice]
    const newCred = Math.max(0, Math.min(1000, credibility + outcome.delta))
    const isWin   = choice === round.best || !!round.good?.includes(choice)
    if (isWin) setRoundsWon(w => w + 1)
    setTimeout(() => { setPrevCred(credibility); setCredibility(newCred); setPhase('outcome') }, 400)
  }, [selected, phase, round, credibility])

  const nextRound = useCallback(() => {
    if (roundIdx >= rounds.length - 1) { setPhase('complete'); onComplete?.({ credibility, roundsWon }); return }
    setSelected(null); setShowCase(false); setShowChoices(false)
    setTimeout(() => { setRoundIdx(i => i + 1); setPhase('intro') }, 420)
  }, [roundIdx, rounds.length, credibility, roundsWon, onComplete])

  if (phase === 'complete') {
    return <EndScreen credibility={credibility} roundsWon={roundsWon} total={rounds.length} onBack={() => onComplete?.({ credibility, roundsWon })} isPT={isPT} />
  }

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative', paddingBottom: 90 }}>

      <CredMeter value={credibility} isPT={isPT} />

      {/* Round dots */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>
          {isPT ? `Rodada ${roundIdx + 1} de ${rounds.length}` : `Round ${roundIdx + 1} of ${rounds.length}`}
        </span>
        <div style={{ display: 'flex', gap: 5 }}>
          {rounds.map((r, i) => <div key={r.id} style={{ width: 8, height: 8, borderRadius: '50%', background: i < roundIdx ? BLACK : i === roundIdx ? GREEN : FAINT, transition: 'background 0.3s' }} />)}
        </div>
      </div>

      <CaseFile round={round} visible={showCase} isPT={isPT} />

      {phase === 'outcome' && selected && <OutcomePanel round={round} selected={selected} visible isPT={isPT} />}

      {showChoices && (
        <>
          <p style={{ fontFamily: BODY, fontSize: 12, color: DIM, margin: '14px 0 6px', fontStyle: 'italic' }}>
            {isPT ? 'Como você responde — continua financiando pesquisa de IA?' : 'How do you respond — keep funding AI research?'}
          </p>
          <ChoiceGrid selected={selected} phase={phase} round={round} onPick={handleChoice} isPT={isPT} />
        </>
      )}

      {phase === 'outcome' && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
          <button onClick={nextRound} style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#EBEBEB', color: BLACK, padding: '10px 22px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: `4px 4px 0 0 ${BLACK}`, animation: 'popIn 0.3s ease-out 0.3s both' }}>
            {roundIdx >= rounds.length - 1 ? (isPT ? 'Ver resultados →' : 'See results →') : (isPT ? 'Próximo arquivo →' : 'Next case →')}
          </button>
        </div>
      )}

    </div>
  )
}
