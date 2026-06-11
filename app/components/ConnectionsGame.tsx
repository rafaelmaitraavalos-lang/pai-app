'use client'

import { useState, useMemo, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Types — public contract
// ─────────────────────────────────────────────────────────────────────────────

export interface PuzzleGroup {
  name: string
  difficulty: 1 | 2 | 3 | 4
  cards: [string, string, string, string]
  reveal?: string
}

export interface Puzzle {
  id: string
  title: string
  groups: [PuzzleGroup, PuzzleGroup, PuzzleGroup, PuzzleGroup]
}

export interface CompletionResult {
  solved: boolean
  mistakes: number
}

interface Props {
  puzzle: Puzzle
  onComplete?: (result: CompletionResult) => void
  isPT?: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const MAX_MISTAKES = 4

// NYT-style difficulty colours
const DIFF_COLOR: Record<number, { bg: string; fg: string }> = {
  1: { bg: '#F9DF6D', fg: '#1a1001' },
  2: { bg: '#A0C35A', fg: '#0d1a00' },
  3: { bg: '#B0C4EF', fg: '#05103a' },
  4: { bg: '#BA81C5', fg: '#ffffff' },
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function SolvedRow({ group, fresh }: { group: PuzzleGroup; fresh: boolean }) {
  const { bg, fg } = DIFF_COLOR[group.difficulty]
  return (
    <div
      style={{
        background: bg,
        color: fg,
        borderRadius: 10,
        padding: '14px 18px',
        animation: fresh ? 'solveIn 0.38s ease-out' : undefined,
      }}
    >
      <p style={{ margin: 0, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7 }}>
        {group.name}
      </p>
      <p style={{ margin: '4px 0 0', fontSize: 15, fontWeight: 700 }}>
        {group.cards.join(' · ')}
      </p>
    </div>
  )
}

function Card({
  text,
  selected,
  shaking,
  onClick,
}: {
  text: string
  selected: boolean
  shaking: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        minHeight: 76,
        borderRadius: 10,
        border: 'none',
        padding: '8px 6px',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 700,
        lineHeight: 1.25,
        textAlign: 'center',
        background: selected ? '#2a2a2a' : '#e8e8e8',
        color: selected ? '#ffffff' : '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        transition: 'background 0.12s ease, transform 0.12s ease, box-shadow 0.12s ease',
        transform: selected ? 'scale(0.95)' : 'scale(1)',
        boxShadow: selected ? '0 2px 8px rgba(0,0,0,0.18)' : '0 1px 3px rgba(0,0,0,0.08)',
        animation: shaking && selected ? 'shake 0.5s ease' : undefined,
      }}
    >
      {text}
    </button>
  )
}

function Btn({
  children,
  onClick,
  disabled,
  primary,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  primary?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 20px',
        borderRadius: 24,
        border: primary ? 'none' : '2px solid #c8c8c8',
        background: primary ? (disabled ? '#b0b0b0' : '#2a2a2a') : '#ffffff',
        color: primary ? '#ffffff' : disabled ? '#aaa' : '#222',
        fontSize: 14,
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.15s, opacity 0.15s',
        opacity: disabled && !primary ? 0.45 : 1,
      }}
    >
      {children}
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main game component
// ─────────────────────────────────────────────────────────────────────────────

export default function ConnectionsGame({ puzzle, onComplete, isPT = false }: Props) {
  const allCards = useMemo(() => puzzle.groups.flatMap(g => g.cards), [puzzle])

  const [grid, setGrid]     = useState<string[]>(() => shuffle(allCards))
  const [selected, setSel]  = useState<string[]>([])
  const [solved, setSolved] = useState<PuzzleGroup[]>([])
  const [mistakes, setErr]  = useState(0)
  const [phase, setPhase]   = useState<'playing' | 'won' | 'lost'>('playing')
  const [shaking, setShake] = useState(false)
  const [oneAway, setOneAway] = useState(false)
  const [freshRow, setFreshRow] = useState<string | null>(null) // group name → trigger solveIn

  const groupOf = useCallback(
    (card: string) => puzzle.groups.find(g => g.cards.includes(card)),
    [puzzle]
  )

  // ── Card click ──────────────────────────────────────────────────────────

  const clickCard = (card: string) => {
    if (phase !== 'playing' || shaking) return
    setSel(prev =>
      prev.includes(card)
        ? prev.filter(c => c !== card)
        : prev.length < 4
        ? [...prev, card]
        : prev
    )
    setOneAway(false)
  }

  // ── Submit ──────────────────────────────────────────────────────────────

  const submit = useCallback(() => {
    if (selected.length !== 4 || phase !== 'playing' || shaking) return

    const groups   = selected.map(groupOf)
    const names    = new Set(groups.map(g => g?.name))

    if (names.size === 1 && groups[0]) {
      // ✓ Correct
      const group       = groups[0]
      const nextSolved  = [...solved, group]

      setSolved(nextSolved)
      setGrid(prev => prev.filter(c => !group.cards.includes(c)))
      setSel([])
      setOneAway(false)
      setFreshRow(group.name)
      setTimeout(() => setFreshRow(null), 500)

      if (nextSolved.length === puzzle.groups.length) {
        setPhase('won')
        onComplete?.({ solved: true, mistakes })
      }
    } else {
      // ✗ Wrong — detect one-away
      const counts = new Map<string, number>()
      groups.forEach(g => g && counts.set(g.name, (counts.get(g.name) ?? 0) + 1))
      setOneAway(Math.max(0, ...counts.values()) === 3)

      const nextErr = mistakes + 1
      setErr(nextErr)
      setShake(true)

      setTimeout(() => {
        setShake(false)
        setSel([])

        if (nextErr >= MAX_MISTAKES) {
          // Auto-reveal remaining groups (sorted by difficulty)
          const remaining = puzzle.groups
            .filter(g => !solved.some(s => s.name === g.name))
            .sort((a, b) => a.difficulty - b.difficulty)
          setSolved(prev => [...prev, ...remaining])
          setGrid([])
          setPhase('lost')
          onComplete?.({ solved: false, mistakes: nextErr })
        }
      }, 580)
    }
  }, [selected, phase, shaking, groupOf, solved, mistakes, puzzle, onComplete])

  // ── Sorted solved rows (always display easy→hard) ───────────────────────

  const sortedSolved = [...solved].sort((a, b) => a.difficulty - b.difficulty)

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', maxWidth: 580, margin: '0 auto', padding: '0 12px' }}>

      {/* Title */}
      <h2 style={{ textAlign: 'center', fontSize: 17, fontWeight: 800, margin: '0 0 18px', color: '#111', letterSpacing: '-0.01em' }}>
        {puzzle.title}
      </h2>

      {/* Solved rows */}
      {sortedSolved.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: grid.length ? 8 : 0 }}>
          {sortedSolved.map(g => (
            <SolvedRow key={g.name} group={g} fresh={freshRow === g.name} />
          ))}
        </div>
      )}

      {/* 4×4 card grid */}
      {grid.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {grid.map(card => (
            <Card
              key={card}
              text={card}
              selected={selected.includes(card)}
              shaking={shaking}
              onClick={() => clickCard(card)}
            />
          ))}
        </div>
      )}

      {/* One-away hint */}
      <div style={{ height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
        {oneAway && (
          <span style={{ fontSize: 13, fontWeight: 600, color: '#555', animation: 'popIn 0.25s ease-out' }}>
            {isPT ? 'Quase lá…' : 'One away…'}
          </span>
        )}
      </div>

      {/* Mistake dots */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#777' }}>{isPT ? 'Erros restantes:' : 'Mistakes remaining:'}</span>
        <div style={{ display: 'flex', gap: 5 }}>
          {Array.from({ length: MAX_MISTAKES }).map((_, i) => {
            const filled = i < MAX_MISTAKES - mistakes
            return (
              <div
                key={i}
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: '50%',
                  background: filled ? '#2a2a2a' : '#d4d4d4',
                  transition: 'background 0.3s ease',
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Controls */}
      {phase === 'playing' && (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
          <Btn onClick={() => setGrid(prev => shuffle(prev))}>{isPT ? 'Embaralhar' : 'Shuffle'}</Btn>
          <Btn onClick={() => { setSel([]); setOneAway(false) }} disabled={selected.length === 0}>
            {isPT ? 'Desmarcar todos' : 'Deselect all'}
          </Btn>
          <Btn onClick={submit} disabled={selected.length !== 4 || shaking} primary>
            {isPT ? 'Confirmar' : 'Submit'}
          </Btn>
        </div>
      )}

      {/* Win state */}
      {phase === 'won' && (
        <div style={{ textAlign: 'center', padding: '16px 0 8px', animation: 'popIn 0.4s ease-out' }}>
          <p style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#111' }}>
            {isPT ? 'Resolvido!' : 'Solved it!'}
          </p>
          <p style={{ margin: 0, fontSize: 14, color: '#555', fontWeight: 600 }}>
            {isPT
              ? (mistakes === 0 ? 'Perfeito — sem erros.' : `${mistakes} erro${mistakes !== 1 ? 's' : ''}.`)
              : (mistakes === 0 ? 'Perfect — no mistakes.' : `${mistakes} mistake${mistakes !== 1 ? 's' : ''}.`)}
          </p>
        </div>
      )}

      {/* Loss state */}
      {phase === 'lost' && (
        <div style={{ textAlign: 'center', padding: '16px 0 8px', animation: 'popIn 0.4s ease-out' }}>
          <p style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#111' }}>
            {isPT ? 'Boa tentativa!' : 'Nice try!'}
          </p>
          <p style={{ margin: 0, fontSize: 14, color: '#555', fontWeight: 600 }}>
            {isPT ? 'Tente novamente.' : 'Better luck next time.'}
          </p>
        </div>
      )}
    </div>
  )
}
