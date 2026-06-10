'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface TimelineCard {
  id: string
  moment: string
  year: string
  yearValue: number
  description: string
  era: string           // e.g. "Ancient" "Modern AI" — shown as a tag
  explanation?: string  // PAI says this on wrong placement
}

export interface HypeRealityCard {
  id: string
  type: 'hype' | 'reality'
  text: string
  explanation?: string  // shown when the card is sorted into the wrong column
}

export interface TimelinePuzzle {
  id: string
  intro: string
  anchorId: string      // card id that starts pre-placed (with year visible)
  r1: {
    cards: TimelineCard[]
    feedback: { perfect: string; close: string; off: string }
  }
  r2: {
    intro: string
    cards: HypeRealityCard[]
    completion: string
  }
}

interface Props {
  puzzle: TimelinePuzzle
  onComplete?: (xp: number) => void
}

// ─────────────────────────────────────────────────────────────────────────────
// Palette (inherits app identity)
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  cream:    '#F2EBE0',
  caramel:  '#BA7517',
  dark:     '#7A4A0A',
  brown:    '#3D1A00',
  brown60:  '#9A5A10',
  white:    '#FFFFFF',
  mist:     '#F5EDE0',
  line:     '#E5D4BA',
  wrong:    '#C0392B',
  right:    '#27AE60',
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
// Era tag — matches slide aesthetic (MYTH BUST style)
// ─────────────────────────────────────────────────────────────────────────────

function EraTag({ era }: { era: string }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 20,
      background: 'rgba(186,117,23,0.10)', color: C.caramel,
      fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em',
    }}>
      {era}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Current card — the one being placed (full size, no year)
// ─────────────────────────────────────────────────────────────────────────────

function CurrentCard({
  card,
  dragging,
  onPointerDown,
}: {
  card: TimelineCard
  dragging: boolean
  onPointerDown: (e: React.PointerEvent) => void
}) {
  return (
    <div
      onPointerDown={onPointerDown}
      style={{
        background: C.white, borderRadius: 14, padding: '16px 18px',
        boxShadow: dragging
          ? '0 20px 40px rgba(0,0,0,0.18)'
          : '0 4px 16px rgba(0,0,0,0.09)',
        cursor: dragging ? 'grabbing' : 'grab',
        userSelect: 'none', touchAction: 'none',
        display: 'flex', alignItems: 'flex-start', gap: 12,
        maxWidth: 420,
        transform: dragging ? 'scale(1.03) rotate(1.5deg)' : 'scale(1) rotate(0)',
        transition: dragging ? 'none' : 'transform 0.2s ease, box-shadow 0.2s ease',
        opacity: dragging ? 0 : 1,  // hide original when floating copy is shown
      }}
    >
      {/* Grip */}
      <span style={{ color: '#C4AE94', fontSize: 18, lineHeight: 1, paddingTop: 2, flexShrink: 0 }}>
        ⠿
      </span>
      <div style={{ flex: 1 }}>
        <EraTag era={card.era} />
        <p style={{ margin: '6px 0 4px', fontSize: 15, fontWeight: 800, color: C.brown, lineHeight: 1.3 }}>
          {card.moment}
        </p>
        <p style={{ margin: 0, fontSize: 12, color: C.brown60, fontWeight: 500, lineHeight: 1.4 }}>
          {card.description}
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Timeline pill — a placed card on the timeline strip
// ─────────────────────────────────────────────────────────────────────────────

function TimelinePill({
  card,
  yearRevealed,
  yearJustRevealed,
  wrong,
}: {
  card: TimelineCard | undefined
  yearRevealed: boolean
  yearJustRevealed: boolean
  wrong: boolean
}) {
  if (!card) return null
  return (
    <div style={{
      background: C.white, borderRadius: 10, padding: '8px 12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      minWidth: 110, maxWidth: 140,
      border: `2px solid ${wrong ? C.wrong : C.line}`,
      display: 'flex', flexDirection: 'column', gap: 4,
      animation: wrong ? 'wrongFlash 0.6s ease' : yearJustRevealed ? 'cardSettle 0.4s ease-out' : undefined,
      flexShrink: 0,
    }}>
      <EraTag era={card.era} />
      <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: C.brown, lineHeight: 1.3 }}>
        {card.moment.length > 22 ? card.moment.slice(0, 21) + '…' : card.moment}
      </p>
      {/* Year — only shown after placement */}
      <div style={{ minHeight: 18 }}>
        {yearRevealed && (
          <span style={{
            fontSize: 12, fontWeight: 900, color: C.caramel,
            display: 'block',
            animation: yearJustRevealed ? 'yearStamp 0.4s cubic-bezier(0.34,1.56,0.64,1)' : undefined,
          }}>
            {card.year}
          </span>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Round 2 — Hype vs Reality two-column sort
// ─────────────────────────────────────────────────────────────────────────────

function Round2({
  puzzle,
  onDone,
}: {
  puzzle: TimelinePuzzle
  onDone: () => void
}) {
  const [shuffled] = useState(() => shuffle(puzzle.r2.cards))
  const [answers, setAnswers] = useState<Record<string, 'hype' | 'reality' | null>>(
    () => Object.fromEntries(puzzle.r2.cards.map(c => [c.id, null]))
  )
  const [submitted, setSubmitted] = useState(false)
  const [allCorrect, setAllCorrect] = useState(false)

  const allAnswered = shuffled.every(c => answers[c.id] !== null)

  const check = () => {
    const correct = shuffled.every(c => answers[c.id] === c.type)
    setSubmitted(true)
    setAllCorrect(correct)
    if (correct) setTimeout(onDone, 800)
  }

  const retry = () => {
    setSubmitted(false)
    setAnswers(Object.fromEntries(puzzle.r2.cards.map(c => [c.id, null])))
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 16px' }}>
      <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 800, color: C.caramel, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 16px' }}>
        Round 2 — Hype vs Reality
      </p>

      {submitted && !allCorrect && (
        <div style={{ background: '#FFF5F5', border: `1px solid ${C.wrong}`, borderRadius: 10, padding: '10px 14px', marginBottom: 14, fontSize: 13, fontWeight: 600, color: '#7a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', animation: 'popIn 0.2s ease-out' }}>
          <span>A couple got mixed up — check the ones marked wrong.</span>
          <button onClick={retry} style={{ marginLeft: 10, fontSize: 12, fontWeight: 800, color: C.caramel, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Try again
          </button>
        </div>
      )}

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {/* Hype column */}
        <div>
          <div style={{ textAlign: 'center', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.wrong, marginBottom: 8, padding: '6px 0', border: `2px solid ${C.wrong}20`, borderRadius: 8, background: `${C.wrong}08` }}>
            Hype
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 60 }}>
            {shuffled.filter(c => answers[c.id] === 'hype').map(c => (
              <HypeCard key={c.id} card={c} answer="hype" correct={c.type === 'hype'} showResult={submitted} onRemove={() => setAnswers(p => ({ ...p, [c.id]: null }))} />
            ))}
          </div>
        </div>

        {/* Reality column */}
        <div>
          <div style={{ textAlign: 'center', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.right, marginBottom: 8, padding: '6px 0', border: `2px solid ${C.right}20`, borderRadius: 8, background: `${C.right}08` }}>
            Reality
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 60 }}>
            {shuffled.filter(c => answers[c.id] === 'reality').map(c => (
              <HypeCard key={c.id} card={c} answer="reality" correct={c.type === 'reality'} showResult={submitted} onRemove={() => setAnswers(p => ({ ...p, [c.id]: null }))} />
            ))}
          </div>
        </div>
      </div>

      {/* Unplaced pool */}
      {shuffled.some(c => answers[c.id] === null) && (
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px', textAlign: 'center' }}>
            Tap to assign →
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {shuffled.filter(c => answers[c.id] === null).map(c => (
              <UnassignedCard key={c.id} card={c} onAssign={val => setAnswers(p => ({ ...p, [c.id]: val }))} />
            ))}
          </div>
        </div>
      )}

      {!submitted && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <button
            onClick={check}
            disabled={!allAnswered}
            style={{
              padding: '12px 32px', borderRadius: 24,
              background: allAnswered ? C.brown : '#ccc',
              color: 'white', fontWeight: 800, fontSize: 14, border: 'none',
              cursor: allAnswered ? 'pointer' : 'not-allowed',
              boxShadow: allAnswered ? `0 4px 0 ${C.brown}88` : '0 4px 0 #aaa',
            }}
          >
            Check answers
          </button>
        </div>
      )}
    </div>
  )
}

function UnassignedCard({ card, onAssign }: { card: HypeRealityCard; onAssign: (v: 'hype' | 'reality') => void }) {
  return (
    <div style={{ background: C.white, borderRadius: 10, padding: '12px 14px', border: `2px solid ${C.line}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 600, color: C.brown, lineHeight: 1.4 }}>{card.text}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => onAssign('hype')} style={{ flex: 1, padding: '7px 0', borderRadius: 8, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer', border: `2px solid ${C.wrong}40`, background: `${C.wrong}10`, color: C.wrong }}>
          Hype
        </button>
        <button onClick={() => onAssign('reality')} style={{ flex: 1, padding: '7px 0', borderRadius: 8, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer', border: `2px solid ${C.right}40`, background: `${C.right}10`, color: C.right }}>
          Reality
        </button>
      </div>
    </div>
  )
}

function HypeCard({ card, answer, correct, showResult, onRemove }: {
  card: HypeRealityCard; answer: 'hype' | 'reality'; correct: boolean; showResult: boolean; onRemove: () => void
}) {
  const borderColor = showResult ? (correct ? C.right : C.wrong) : C.line
  return (
    <div style={{ background: C.white, borderRadius: 10, padding: '10px 12px', border: `2px solid ${borderColor}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'border-color 0.2s' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: C.brown, lineHeight: 1.4, flex: 1 }}>{card.text}</p>
        {!showResult && (
          <button onClick={onRemove} style={{ color: '#ccc', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, padding: 0, lineHeight: 1, flexShrink: 0 }}>✕</button>
        )}
        {showResult && !correct && (
          <span style={{ color: C.wrong, fontSize: 12, flexShrink: 0 }}>✕</span>
        )}
      </div>
      {showResult && !correct && card.explanation && (
        <p style={{
          margin: '8px 0 0', fontSize: 12, fontWeight: 600, color: '#7a1a1a',
          lineHeight: 1.5, borderTop: `1px solid ${C.wrong}22`, paddingTop: 8,
          animation: 'slideUpFade 0.35s ease-out 0.25s both',
        }}>
          {card.explanation}
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

interface PlacedState {
  card: TimelineCard
  yearRevealed: boolean
  yearJustRevealed: boolean
  wrong: boolean
}

type Phase = 'intro' | 'round1' | 'round2-intro' | 'round2' | 'complete'

export default function TimelineGame({ puzzle, onComplete }: Props) {
  // Fall back to the last card if anchorId doesn't match anything
  const anchorCard = puzzle.r1.cards.find(c => c.id === puzzle.anchorId)
    ?? puzzle.r1.cards[puzzle.r1.cards.length - 1]
  const otherCards = puzzle.r1.cards.filter(c => c.id !== anchorCard.id)

  // ── State ──────────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>('intro')

  const [placed, setPlaced] = useState<PlacedState[]>([
    { card: anchorCard, yearRevealed: true, yearJustRevealed: false, wrong: false }
  ])
  const [deck, setDeck]     = useState<TimelineCard[]>(() => shuffle(otherCards))
  const [lives, setLives]   = useState(3)
  const [lostLife, setLostLife] = useState<number | null>(null) // index of just-lost life

  // ── Drag state ─────────────────────────────────────────────────────────────
  const [dragging, setDragging]     = useState(false)
  const [dragX, setDragX]           = useState(0)
  const [dragY, setDragY]           = useState(0)
  const [hoveredGap, setHoveredGap] = useState<number | null>(null)

  const cardRef      = useRef<HTMLDivElement>(null)
  const timelineRef  = useRef<HTMLDivElement>(null)
  const gapRefs      = useRef<Array<HTMLElement | null>>([])

  const currentCard = deck[0] ?? null

  // ── Gap detection ───────────────────────────────────────────────────────────
  const detectGap = useCallback((clientX: number, clientY: number) => {
    if (!timelineRef.current) return

    const tRect = timelineRef.current.getBoundingClientRect()
    // Expand detection zone generously for mobile
    if (clientY < tRect.top - 80 || clientY > tRect.bottom + 40) {
      setHoveredGap(null)
      return
    }

    let best: number | null = null
    let bestDist = Infinity

    gapRefs.current.forEach((el, i) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = (r.left + r.right) / 2
      const dist = Math.abs(clientX - cx)
      if (dist < bestDist) { bestDist = dist; best = i }
    })

    setHoveredGap(best)
  }, [])

  // ── Pointer handlers ────────────────────────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!currentCard || phase !== 'round1') return
    e.preventDefault()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setDragging(true)
    setDragX(e.clientX)
    setDragY(e.clientY)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    setDragX(e.clientX)
    setDragY(e.clientY)
    detectGap(e.clientX, e.clientY)
  }

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragging || !currentCard) return
    setDragging(false)

    if (hoveredGap === null) { setHoveredGap(null); return }

    // Sorted placed cards
    const sorted = [...placed].sort((a, b) => a.card.yearValue - b.card.yearValue)
    const left  = sorted[hoveredGap - 1]?.card.yearValue ?? -Infinity
    const right = sorted[hoveredGap]?.card.yearValue ?? Infinity
    const isCorrect = currentCard.yearValue > left && currentCard.yearValue < right

    // Find correct gap index in sorted placed
    const correctIdx = sorted.findIndex(p => p.card.yearValue > currentCard.yearValue)
    const correctGap = correctIdx === -1 ? sorted.length : correctIdx

    // Always insert at correct position
    const newPlaced: PlacedState = {
      card: currentCard,
      yearRevealed: true,
      yearJustRevealed: true,
      wrong: !isCorrect,
    }

    setPlaced(prev => {
      const sorted2 = [...prev].sort((a, b) => a.card.yearValue - b.card.yearValue)
      const insertAt = sorted2.findIndex(p => p.card.yearValue > currentCard.yearValue)
      const at = insertAt === -1 ? sorted2.length : insertAt
      sorted2.splice(at, 0, newPlaced)
      return sorted2
    })

    // Remove year-just-revealed flag after animation
    setTimeout(() => {
      setPlaced(prev => prev.map(p =>
        p.card.id === currentCard.id ? { ...p, yearJustRevealed: false, wrong: false } : p
      ))
    }, 600)

    // Advance deck
    setDeck(prev => prev.slice(1))
    setHoveredGap(null)

    if (!isCorrect) {
      const newLives = lives - 1
      setLives(newLives)
      setLostLife(2 - (lives - 1)) // index from right → left
      setTimeout(() => setLostLife(null), 700)
    }
  }, [dragging, currentCard, hoveredGap, placed, lives])

  // ── Round 1 complete ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase === 'round1' && deck.length === 0 && currentCard === null) {
      setTimeout(() => setPhase('round2-intro'), 1200)
    }
  }, [deck, currentCard, phase])

  // ── Sorted placed cards for display ─────────────────────────────────────────
  const sortedPlaced = [...placed].sort((a, b) => a.card.yearValue - b.card.yearValue)
  const gaps = sortedPlaced.length + 1  // gaps: before first, between each pair, after last

  // ─────────────────────────────────────────────────────────────────────────────
  // Render — Intro
  // ─────────────────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingTop: 20 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'radial-gradient(circle at 40% 33%, #FFE08A, #D4780A 80%)', boxShadow: '0 8px 24px rgba(186,117,23,0.30)', animation: 'paiFloat 3s ease-in-out infinite' }} />
        <div style={{ background: C.white, borderRadius: 16, padding: '18px 24px', maxWidth: 360, textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: 15, fontWeight: 700, color: C.brown, lineHeight: 1.5, animation: 'popIn 0.3s ease-out' }}>
          {puzzle.intro}
        </div>
        <button
          onClick={() => setPhase('round1')}
          style={{ padding: '13px 36px', borderRadius: 24, background: C.caramel, color: 'white', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer', boxShadow: `0 5px 0 ${C.dark}` }}
        >
          Let's rebuild it
        </button>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Render — Round 2 intro
  // ─────────────────────────────────────────────────────────────────────────────
  if (phase === 'round2-intro') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingTop: 20 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'radial-gradient(circle at 40% 33%, #FFE08A, #D4780A 80%)', boxShadow: '0 8px 24px rgba(186,117,23,0.30)', animation: 'paiFloat 3s ease-in-out infinite' }} />
        <div style={{ background: C.white, borderRadius: 16, padding: '18px 24px', maxWidth: 360, textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: 15, fontWeight: 700, color: C.brown, lineHeight: 1.5, animation: 'popIn 0.3s ease-out' }}>
          {puzzle.r2.intro}
        </div>
        <button
          onClick={() => setPhase('round2')}
          style={{ padding: '13px 36px', borderRadius: 24, background: C.brown, color: 'white', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer', boxShadow: `0 5px 0 ${C.caramel}88` }}
        >
          Show me
        </button>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Render — Round 2
  // ─────────────────────────────────────────────────────────────────────────────
  if (phase === 'round2') {
    return (
      <Round2
        puzzle={puzzle}
        onDone={() => {
          setPhase('complete')
          setTimeout(() => onComplete?.(150), 600)
        }}
      />
    )
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Render — Complete
  // ─────────────────────────────────────────────────────────────────────────────
  if (phase === 'complete') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, paddingTop: 20, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'radial-gradient(circle at 40% 33%, #FFE08A, #D4780A 80%)', boxShadow: '0 8px 24px rgba(186,117,23,0.30)', animation: 'paiFloat 3s ease-in-out infinite' }} />
        <div style={{ animation: 'xpPop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.1s both' }}>
          <p style={{ margin: 0, fontSize: 64, fontWeight: 900, color: C.caramel, lineHeight: 1 }}>+150</p>
          <p style={{ margin: '2px 0 0', fontSize: 20, fontWeight: 800, color: C.brown60 }}>XP</p>
        </div>
        <div style={{ background: C.white, borderRadius: 16, padding: '16px 22px', maxWidth: 380, boxShadow: '0 4px 16px rgba(0,0,0,0.07)', fontSize: 15, fontWeight: 700, color: C.brown, lineHeight: 1.5, animation: 'popIn 0.3s ease-out 0.3s both' }}>
          {puzzle.r2.completion}
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Render — Round 1 (main game)
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div
      style={{ maxWidth: 680, margin: '0 auto', padding: '0 16px', position: 'relative' }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Lives */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', marginBottom: 16 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: 4 }}>Lives</span>
        {[0, 1, 2].map(i => {
          const active = i < lives
          return (
            <div
              key={i}
              style={{
                width: 12, height: 12, borderRadius: '50%',
                background: active ? C.caramel : '#ddd',
                transition: 'background 0.3s',
                animation: lostLife === i ? 'lifeOut 0.5s ease-out' : undefined,
              }}
            />
          )
        })}
      </div>

      {/* Current card to place */}
      <div style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        {currentCard ? (
          <>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              Drag onto the timeline
            </p>
            <div ref={cardRef} style={{ width: '100%', maxWidth: 420 }}>
              <CurrentCard
                card={currentCard}
                dragging={dragging}
                onPointerDown={handlePointerDown}
              />
            </div>
          </>
        ) : (
          <p style={{ fontSize: 13, fontWeight: 700, color: C.brown60, textAlign: 'center' }}>
            All cards placed!
          </p>
        )}
      </div>

      {/* Timeline strip */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        {/* The line itself */}
        <div style={{
          position: 'absolute', top: '50%', left: 0, right: 0, height: 3,
          background: `linear-gradient(to right, ${C.caramel}60, ${C.caramel}, ${C.caramel}60)`,
          borderRadius: 2, transform: 'translateY(-50%)', zIndex: 0,
        }} />

        {/* Scrollable container */}
        <div
          ref={timelineRef}
          style={{
            overflowX: 'auto', overflowY: 'visible',
            padding: '16px 8px',
            display: 'flex', alignItems: 'center',
            gap: 0, position: 'relative', zIndex: 1,
            scrollbarWidth: 'none',
          }}
        >
          {Array.from({ length: gaps }).map((_, gapIdx) => {
            const isHovered = dragging && hoveredGap === gapIdx
            return (
              <div key={`g-${gapIdx}`} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {/* Gap drop zone */}
                <div
                  ref={el => { gapRefs.current[gapIdx] = el }}
                  style={{
                    width: isHovered ? 64 : 18,
                    height: isHovered ? 70 : 50,
                    borderRadius: 8,
                    background: isHovered ? `${C.caramel}18` : 'transparent',
                    border: isHovered ? `2px dashed ${C.caramel}` : '2px solid transparent',
                    transition: 'width 0.15s ease, height 0.15s ease, background 0.15s, border-color 0.15s',
                    flexShrink: 0,
                    cursor: dragging ? 'copy' : 'default',
                  }}
                />

                {/* Placed card */}
                {gapIdx < sortedPlaced.length && (
                  <TimelinePill
                    card={sortedPlaced[gapIdx].card}
                    yearRevealed={sortedPlaced[gapIdx].yearRevealed}
                    yearJustRevealed={sortedPlaced[gapIdx].yearJustRevealed}
                    wrong={sortedPlaced[gapIdx].wrong}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile scroll hint */}
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 32, background: `linear-gradient(to right, transparent, ${C.cream})`, pointerEvents: 'none' }} />
      </div>

      {/* Remaining count */}
      <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
        {deck.length} card{deck.length !== 1 ? 's' : ''} remaining
      </p>

      {/* Floating dragged card */}
      {dragging && currentCard && (
        <div style={{
          position: 'fixed',
          left: dragX - 180,
          top: dragY - 44,
          width: 360,
          background: C.white,
          borderRadius: 14,
          padding: '14px 18px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.22)',
          pointerEvents: 'none',
          zIndex: 200,
          transform: 'scale(1.04) rotate(2deg)',
          display: 'flex', alignItems: 'flex-start', gap: 12,
        }}>
          <span style={{ color: '#C4AE94', fontSize: 18, lineHeight: 1, paddingTop: 2 }}>⠿</span>
          <div>
            <EraTag era={currentCard.era} />
            <p style={{ margin: '6px 0 4px', fontSize: 15, fontWeight: 800, color: C.brown, lineHeight: 1.3 }}>
              {currentCard.moment}
            </p>
            <p style={{ margin: 0, fontSize: 12, color: C.brown60, fontWeight: 500 }}>
              {currentCard.description}
            </p>
          </div>
        </div>
      )}

    </div>
  )
}
