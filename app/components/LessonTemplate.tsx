'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import GlossaryText from './GlossaryText'

export interface Stop {
  tag:    string
  year?:  string
  title:  string
  body:   string
  image?: string
}

export interface Question {
  difficulty:  'Easy' | 'Medium' | 'Hard'
  tag:         string
  stopTitle:   string
  question:    string
  answer:      boolean
  verdict:     string
  explanation: string
}

interface Props {
  id:              number
  title:           string
  stops:           Stop[]
  questions:       Question[]
  completionPage?: string
}

// Mirrors fake/module tokens exactly
const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const DIM   = '#555555'
const FAINT = '#d8d8d8'
const BLACK = '#0a0a0a'

type Phase = 'timeline' | 'quiz' | 'complete'

export default function LessonTemplate({ id, title, stops, questions, completionPage }: Props) {
  const router = useRouter()
  const [phase,     setPhase]     = useState<Phase>('timeline')
  const [stopIndex, setStopIndex] = useState(0)
  const [cardDir,   setCardDir]   = useState<'right' | 'left' | null>(null)
  const [qIndex,    setQIndex]    = useState(0)
  const [selected,  setSelected]  = useState<boolean | null>(null)

  const stop     = stops[stopIndex]
  const question = questions[qIndex]
  const isCorrect = selected !== null && selected === question?.answer
  const hasImage  = !!stop?.image

  const timelineNext = () => {
    if (stopIndex === stops.length - 1) { setPhase('quiz'); return }
    setCardDir('right')
    setStopIndex(i => i + 1)
  }
  const timelineBack = () => {
    setCardDir('left')
    setStopIndex(i => i - 1)
  }
  const nextQuestion = () => {
    if (qIndex === questions.length - 1) {
      localStorage.setItem(`pai_lesson_${id}_done`, 'true')
      if (completionPage) router.push(completionPage)
      else setPhase('complete')
      return
    }
    setSelected(null)
    setQIndex(i => i + 1)
  }
  const skip = () => {
    localStorage.setItem(`pai_lesson_${id}_done`, 'true')
    router.push('/lessons')
  }

  // ── Complete ────────────────────────────────────────────────────────────────
  if (phase === 'complete') {
    return (
      <main style={{ height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <div style={{ width: '100%', padding: '0 7vw', textAlign: 'center' }}>
          <div style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, marginBottom: 16 }}>Lesson complete</div>
          <div style={{ animation: 'xpPop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.2s both' }}>
            <p style={{ fontFamily: DISP, fontSize: 80, lineHeight: 1, color: BLACK, margin: 0, letterSpacing: '-0.03em' }}>+100</p>
            <p style={{ fontFamily: DISP, fontSize: 20, color: DIM, margin: '4px 0 0', letterSpacing: '0.06em' }}>XP</p>
          </div>
          <h1 style={{ fontFamily: DISP, fontSize: 36, letterSpacing: '-0.02em', color: BLACK, margin: '28px 0 20px', fontWeight: 400 }}>{title}</h1>
          <div style={{ borderTop: `1px solid ${FAINT}`, marginBottom: 20 }} />
          <button onClick={() => router.push('/lessons')} style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#EBEBEB', color: BLACK, padding: '10px 28px', border: 'none', cursor: 'pointer', boxShadow: `4px 4px 0 0 ${BLACK}` }}>
            Back to lessons →
          </button>
        </div>
      </main>
    )
  }

  // ── Quiz — same structure as slide ──────────────────────────────────────────
  if (phase === 'quiz') {
    const btnState = (val: boolean) => {
      if (selected === null) return 'default'
      if (val === question.answer) return 'correct'
      if (val === selected) return 'wrong'
      return 'dimmed'
    }

    return (
      <main style={{ height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <div style={{ width: '100%', padding: '0 7vw', display: 'flex', flexDirection: 'column', gap: 0, transform: 'scale(1.06)', transformOrigin: 'center center', transition: 'transform 0.28s ease' }}>

          {/* Kicker */}
          <div>
            <div style={{ paddingBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
              <div style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ color: BLACK }}>Quiz</span>
                <span style={{ color: FAINT }}>·</span>
                <button onClick={skip} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM, padding: 0 }}>Lesson {id}</button>
                <span style={{ color: FAINT }}>·</span>
                <span style={{ color: DIM }}>{title}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM }}>{qIndex + 1} / {questions.length}</span>
                <button onClick={skip} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: FAINT, padding: 0 }}>Skip</button>
              </div>
            </div>
            <div style={{ borderTop: `1px solid ${BLACK}` }} />
          </div>

          {/* Question */}
          <div key={qIndex} style={{ paddingTop: 36, paddingBottom: 20, animation: 'slideInFromRight 0.28s ease-out' }}>
            <div style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, marginBottom: 12 }}>
              {question.tag} · {question.difficulty}
            </div>
            <h2 style={{ fontFamily: DISP, fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: BLACK, margin: '0 0 24px', fontWeight: 400, maxWidth: '70ch' }}>
              {question.question}
            </h2>
            <div style={{ borderTop: `1px solid ${FAINT}`, marginBottom: 24 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 560 }}>
              {([true, false] as const).map(val => {
                const state = btnState(val)
                const bg  = state === 'correct' ? '#27AE60' : state === 'wrong' ? '#C0392B' : state === 'dimmed' ? FAINT : '#EBEBEB'
                const clr = state === 'correct' || state === 'wrong' ? '#fff' : state === 'dimmed' ? DIM : BLACK
                return (
                  <button key={String(val)} onClick={() => selected === null && setSelected(val)} disabled={selected !== null} style={{ fontFamily: DISP, fontSize: 15, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '22px 12px', background: bg, color: clr, border: 'none', cursor: selected === null ? 'pointer' : 'default', boxShadow: state === 'default' ? `4px 4px 0 0 ${BLACK}` : 'none', transition: 'all 0.12s' }}>
                    {val ? 'True' : 'False'}
                  </button>
                )
              })}
            </div>
            {selected !== null && (
              <div style={{ marginTop: 20, maxWidth: 560, animation: 'slideUpFade 0.3s ease-out' }}>
                <div style={{ borderTop: `1px solid ${FAINT}`, paddingTop: 16 }}>
                  <p style={{ fontFamily: DISP, fontSize: 13, letterSpacing: '0.04em', color: isCorrect ? '#27AE60' : '#C0392B', margin: '0 0 8px' }}>{question.verdict}</p>
                  <p style={{ fontFamily: BODY, fontSize: 15, color: BLACK, margin: 0, lineHeight: 1.65, maxWidth: '60ch' }}>{question.explanation}</p>
                </div>
              </div>
            )}
          </div>

          {/* Nav */}
          <div style={{ borderTop: `2px solid ${BLACK}` }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, paddingBottom: 20, gap: 20 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {questions.map((_, i) => <div key={i} style={{ width: i === qIndex ? 20 : 6, height: 6, borderRadius: 3, background: i < qIndex ? BLACK : i === qIndex ? GREEN : FAINT }} />)}
            </div>
            {selected !== null && (
              <button onClick={nextQuestion} style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#EBEBEB', color: BLACK, padding: '10px 22px', border: 'none', cursor: 'pointer', boxShadow: `4px 4px 0 0 ${BLACK}` }}>
                {qIndex === questions.length - 1 ? 'Finish →' : 'Next →'}
              </button>
            )}
          </div>
          <div style={{ borderTop: `1px solid ${FAINT}`, paddingTop: 14, paddingBottom: 0, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: BODY, fontSize: 13, color: DIM }}>Lesson {id} · {title} · Quiz</span>
            <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM }}>Q{qIndex + 1} of {questions.length}</span>
          </div>

        </div>
      </main>
    )
  }

  // ── Slides — mirrors fake/module/page.tsx exactly ──────────────────────────
  return (
    <main style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff' }}>

      {/* Black PAI header */}
      <div style={{ background: BLACK, padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 22, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
        <button onClick={() => router.push('/lessons')} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}>
          ← Home
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div
        id="lesson-content-wrapper"
        style={{ width: '100%', padding: '0 7vw', display: 'flex', flexDirection: 'column', gap: 0, transform: 'scale(1.06)', transformOrigin: 'center center', transition: 'transform 0.28s ease' }}
      >

        {/* Kicker — same as fake */}
        <div>
          <div style={{ paddingBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            <div style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ color: BLACK }}>{stop.tag}</span>
              <span style={{ color: FAINT }}>·</span>
              <button onClick={() => router.push('/lessons')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM, padding: 0 }}>
                Lesson {id}
              </button>
              <span style={{ color: FAINT }}>·</span>
              <span style={{ color: DIM }}>{title}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
              {stop.year && <span style={{ fontFamily: BODY, fontSize: 13, color: DIM }}>{stop.year}</span>}
              <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM }}>{stopIndex + 1} / {stops.length}</span>
              <button onClick={skip} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: FAINT, padding: 0 }}>Skip</button>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${BLACK}` }} />
        </div>

        {/* Two-column grid — same as fake */}
        <div
          key={stopIndex}
          style={{
            display: 'grid',
            gridTemplateColumns: hasImage ? '1fr 300px' : '1fr',
            gap: 0,
            paddingTop: 44,
            paddingBottom: 32,
            animation: cardDir ? `${cardDir === 'right' ? 'slideInFromRight' : 'slideInFromLeft'} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)` : undefined,
          }}
        >
          {/* Left: headline + body */}
          <div style={{ paddingRight: hasImage ? 52 : 0, borderRight: hasImage ? `1px solid ${FAINT}` : 'none', display: 'flex', flexDirection: 'column' }}>
            <h1 style={{
              fontFamily: DISP, fontWeight: 400,
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              lineHeight: 1, letterSpacing: '-0.03em',
              margin: '0 0 28px', color: BLACK,
              textShadow: `5px 5px 0 ${FAINT}`,
            }}>
              {stop.title}
            </h1>

            <div style={{ borderTop: `1px solid ${FAINT}`, marginBottom: 24 }} />

            <div id="lesson-text-col" style={{ transition: 'transform 0.28s ease' }}>
              <GlossaryText
                text={stop.body}
                style={{ fontFamily: BODY, fontSize: 18, lineHeight: 1.65, color: BLACK, margin: 0, fontWeight: 400, maxWidth: '54ch' }}
              />
            </div>

            {!hasImage && stop.year && (
              <div style={{ marginTop: 'auto', fontFamily: DISP, fontSize: 'clamp(5rem, 14vw, 12rem)', letterSpacing: '-0.04em', color: FAINT, lineHeight: 1, userSelect: 'none' }}>
                {stop.year}
              </div>
            )}
          </div>

          {/* Right: image — same as fake */}
          {hasImage && (
            <div style={{ paddingLeft: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: '#f0edea', aspectRatio: '3/4', overflow: 'hidden', boxShadow: `10px 10px 0 0 ${BLACK}` }}>
                <img src={stop.image} alt={stop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
            </div>
          )}
        </div>

        {/* Navigation — same as fake */}
        <div style={{ borderTop: `2px solid ${BLACK}` }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, paddingBottom: 20, gap: 20 }}>
          <button disabled={stopIndex === 0} onClick={stopIndex > 0 ? timelineBack : undefined} style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none', border: `1.5px solid ${BLACK}`, color: BLACK, padding: '10px 22px', cursor: stopIndex > 0 ? 'pointer' : 'not-allowed', opacity: stopIndex === 0 ? 0.3 : 1 }}>
            ← Back
          </button>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {stops.map((_, i) => <div key={i} style={{ width: i === stopIndex ? 20 : 6, height: 6, borderRadius: 3, background: i < stopIndex ? BLACK : i === stopIndex ? GREEN : FAINT, transition: 'width 0.9s cubic-bezier(0.34,1.1,0.64,1), background 0.7s ease' }} />)}
          </div>
          <button onClick={timelineNext} style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', background: '#EBEBEB', color: BLACK, padding: '10px 22px', border: 'none', cursor: 'pointer', boxShadow: `4px 4px 0 0 ${BLACK}` }}>
            {stopIndex === stops.length - 1 ? 'Take the quiz →' : 'Next slide →'}
          </button>
        </div>

        {/* Footer — same as fake */}
        <div style={{ borderTop: `1px solid ${FAINT}`, paddingTop: 14, paddingBottom: 0, display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: BODY, fontSize: 13, color: DIM }}>Lesson {id} · {title} · Slide {stopIndex + 1} of {stops.length}</span>
          <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM }}>Slide</span>
        </div>

      </div>
      </div>

    </main>
  )
}
