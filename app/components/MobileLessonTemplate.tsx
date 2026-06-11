'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GlossaryText from './GlossaryText'
import { LESSON_IMAGES } from '../data/lessonImages'
import { SLIDE_IMAGES } from '../data/slideImages'
import TRANSLATIONS from '../data/lessonTranslations'
import type { Stop, Question } from './LessonTemplate'

interface Props {
  id:              number
  title:           string
  stops:           Stop[]
  questions:       Question[]
  completionPage?: string
  theme?:          'elementary'
}

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const DIM   = '#555555'
const FAINT = '#d8d8d8'
const BLACK = '#0a0a0a'
const BASE  = '/mobile'

type Phase = 'timeline' | 'quiz' | 'complete'

export default function MobileLessonTemplate({ id, title: titleEN, stops: stopsEN, questions: questionsEN, completionPage, theme }: Props) {
  const router = useRouter()
  const [phase,     setPhase]     = useState<Phase>('timeline')
  const [stopIndex, setStopIndex] = useState(0)
  const [cardDir,   setCardDir]   = useState<'right' | 'left' | null>(null)
  const [qIndex,    setQIndex]    = useState(0)
  const [selected,  setSelected]  = useState<boolean | null>(null)
  const [lang,      setLang]      = useState('en')

  useEffect(() => { setLang(localStorage.getItem('pai_lang') ?? 'en') }, [])

  const tx        = TRANSLATIONS[lang]?.[id]
  const title     = tx?.title     ?? titleEN
  const stops     = tx ? stopsEN.map((s, i)     => ({ ...s, title: tx.stops[i]?.title     ?? s.title,     body: tx.stops[i]?.body         ?? s.body         })) : stopsEN
  const questions = tx ? questionsEN.map((q, i) => ({ ...q, question: tx.questions[i]?.question ?? q.question, verdict: tx.questions[i]?.verdict ?? q.verdict, explanation: tx.questions[i]?.explanation ?? q.explanation })) : questionsEN

  const stop       = stops[stopIndex]
  const question   = questions[qIndex]
  const isCorrect  = selected !== null && selected === question?.answer
  const slideImage = stop?.image ?? SLIDE_IMAGES[id]?.[stopIndex] ?? LESSON_IMAGES[id]
  const hasImage   = !!slideImage

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
    router.push(`${BASE}/home`)
  }

  const header = (
    <div style={{ background: BLACK, padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
      <span style={{ fontFamily: DISP, fontSize: 20, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
      <button onClick={() => router.push(`${BASE}/home`)} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6, padding: '8px 0 8px 16px' }}>
        ← Home
      </button>
    </div>
  )

  // ── Complete ────────────────────────────────────────────────────────────────
  if (phase === 'complete') {
    return (
      <main style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff', maxWidth: 480, margin: '0 auto' }}>
        {header}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', padding: '0 20px', textAlign: 'center' }}>
            <div style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, marginBottom: 16 }}>Lesson complete</div>
            <div style={{ animation: 'xpPop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.2s both' }}>
              <p style={{ fontFamily: DISP, fontSize: 72, lineHeight: 1, color: BLACK, margin: 0, letterSpacing: '-0.03em' }}>+100</p>
              <p style={{ fontFamily: DISP, fontSize: 18, color: DIM, margin: '4px 0 0', letterSpacing: '0.06em' }}>XP</p>
            </div>
            <h1 style={{ fontFamily: DISP, fontSize: 28, letterSpacing: '-0.02em', color: BLACK, margin: '24px 0 16px', fontWeight: 400 }}>{title}</h1>
            <div style={{ borderTop: `1px solid ${FAINT}`, marginBottom: 16 }} />
            <button onClick={() => router.push(`${BASE}/home`)} style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#EBEBEB', color: BLACK, padding: '12px 28px', border: 'none', cursor: 'pointer', boxShadow: `4px 4px 0 0 ${BLACK}` }}>
              Back to lessons →
            </button>
          </div>
        </div>
      </main>
    )
  }

  // ── Quiz ────────────────────────────────────────────────────────────────────
  if (phase === 'quiz') {
    const btnState = (val: boolean) => {
      if (selected === null) return 'default'
      if (val === question.answer) return 'correct'
      if (val === selected) return 'wrong'
      return 'dimmed'
    }

    return (
      <main style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff', maxWidth: 480, margin: '0 auto' }}>
        {header}
        <div style={{ flex: 1, padding: '24px 20px 80px' }}>

          {/* Kicker */}
          <div style={{ paddingBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ color: BLACK }}>Quiz</span>
              <span style={{ color: FAINT }}>·</span>
              <span style={{ color: DIM }}>{title}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM }}>{qIndex + 1} / {questions.length}</span>
              <button onClick={skip} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: FAINT, padding: 0 }}>Skip</button>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${BLACK}` }} />

          {/* Question */}
          <div key={qIndex} style={{ paddingTop: 28, paddingBottom: 20, animation: 'slideInFromRight 0.28s ease-out' }}>
            <div style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, marginBottom: 10 }}>
              {question.tag} · {question.difficulty}
            </div>
            <h2 style={{ fontFamily: DISP, fontSize: 'clamp(1.3rem, 5.5vw, 2rem)', lineHeight: 1.15, letterSpacing: '-0.02em', color: BLACK, margin: '0 0 20px', fontWeight: 400 }}>
              {question.question}
            </h2>
            <div style={{ borderTop: `1px solid ${FAINT}`, marginBottom: 20 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {([true, false] as const).map(val => {
                const state = btnState(val)
                const bg  = state === 'correct' ? '#27AE60' : state === 'wrong' ? '#C0392B' : state === 'dimmed' ? FAINT : '#EBEBEB'
                const clr = state === 'correct' || state === 'wrong' ? '#fff' : state === 'dimmed' ? DIM : BLACK
                return (
                  <button key={String(val)} onClick={() => selected === null && setSelected(val)} disabled={selected !== null}
                    style={{ fontFamily: DISP, fontSize: 18, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '22px 16px', background: bg, color: clr, border: 'none', cursor: selected === null ? 'pointer' : 'default', boxShadow: state === 'default' ? `4px 4px 0 0 ${BLACK}` : 'none', transition: 'all 0.12s', width: '100%' }}>
                    {val ? 'True' : 'False'}
                  </button>
                )
              })}
            </div>
            {selected !== null && (
              <div style={{ marginTop: 18, animation: 'slideUpFade 0.3s ease-out' }}>
                <div style={{ borderTop: `1px solid ${FAINT}`, paddingTop: 14 }}>
                  <p style={{ fontFamily: DISP, fontSize: 13, letterSpacing: '0.04em', color: isCorrect ? '#27AE60' : '#C0392B', margin: '0 0 8px' }}>{question.verdict}</p>
                  <p style={{ fontFamily: BODY, fontSize: 15, color: BLACK, margin: 0, lineHeight: 1.65 }}>{question.explanation}</p>
                </div>
              </div>
            )}
          </div>

          {/* Nav */}
          <div style={{ borderTop: `2px solid ${BLACK}` }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, paddingBottom: 16, gap: 16 }}>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center', flexWrap: 'wrap' }}>
              {questions.map((_, i) => <div key={i} style={{ width: i === qIndex ? 18 : 5, height: 5, borderRadius: 3, background: i < qIndex ? BLACK : i === qIndex ? GREEN : FAINT }} />)}
            </div>
            {selected !== null && (
              <button onClick={nextQuestion} style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#EBEBEB', color: BLACK, padding: '12px 22px', border: 'none', cursor: 'pointer', boxShadow: `4px 4px 0 0 ${BLACK}`, flexShrink: 0 }}>
                {qIndex === questions.length - 1 ? 'Finish →' : 'Next →'}
              </button>
            )}
          </div>
        </div>
      </main>
    )
  }

  // ── Slides ──────────────────────────────────────────────────────────────────
  const slideBg = theme === 'elementary'
    ? (stopIndex % 2 === 0 ? '#00FF88' : '#FF3DB8')
    : '#fff'

  return (
    <main style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: slideBg, maxWidth: 480, margin: '0 auto', transition: 'background 0.4s ease' }}>
      {header}
      <div style={{ flex: 1, padding: '0 20px 80px' }}>

        {/* Kicker */}
        <div style={{ paddingTop: 20, paddingBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ color: BLACK }}>{stop.tag}</span>
            <span style={{ color: FAINT }}>·</span>
            <span style={{ color: DIM }}>{title}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {stop.year && <span style={{ fontFamily: BODY, fontSize: 12, color: DIM }}>{stop.year}</span>}
            <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM }}>{stopIndex + 1} / {stops.length}</span>
            <button onClick={skip} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: FAINT, padding: 0 }}>Skip</button>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${BLACK}` }} />

        {/* Content */}
        <div
          key={stopIndex}
          style={{
            paddingTop: 28,
            paddingBottom: 24,
            animation: cardDir ? `${cardDir === 'right' ? 'slideInFromRight' : 'slideInFromLeft'} 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)` : undefined,
          }}
        >
          <h1 style={{
            fontFamily: DISP, fontWeight: 400,
            fontSize: 'clamp(2rem, 8vw, 3.5rem)',
            lineHeight: 1.05, letterSpacing: '-0.03em',
            margin: '0 0 16px', color: BLACK,
          }}>
            {stop.title}
          </h1>

          {/* Image below title on mobile */}
          {hasImage && (
            <div style={{ marginBottom: 20, aspectRatio: '4/3', overflow: 'hidden', boxShadow: `6px 6px 0 0 ${BLACK}` }}>
              <img src={slideImage} alt={stop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </div>
          )}

          <div style={{ borderTop: `1px solid ${FAINT}`, marginBottom: 18 }} />

          <GlossaryText
            text={stop.body}
            style={{ fontFamily: BODY, fontSize: 16, lineHeight: 1.7, color: BLACK, margin: 0, fontWeight: 400 }}
          />

          {!hasImage && stop.year && (
            <div style={{ marginTop: 24, fontFamily: DISP, fontSize: 'clamp(4rem, 18vw, 9rem)', letterSpacing: '-0.04em', color: FAINT, lineHeight: 1, userSelect: 'none' }}>
              {stop.year}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ borderTop: `2px solid ${BLACK}` }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, paddingBottom: 16, gap: 16 }}>
          <button disabled={stopIndex === 0} onClick={stopIndex > 0 ? timelineBack : undefined}
            style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none', border: `1.5px solid ${BLACK}`, color: BLACK, padding: '12px 18px', cursor: stopIndex > 0 ? 'pointer' : 'not-allowed', opacity: stopIndex === 0 ? 0.3 : 1, flexShrink: 0 }}>
            ← Back
          </button>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center', flexWrap: 'wrap' }}>
            {stops.map((_, i) => <div key={i} style={{ width: i === stopIndex ? 18 : 5, height: 5, borderRadius: 3, background: i < stopIndex ? BLACK : i === stopIndex ? GREEN : FAINT, transition: 'width 0.9s cubic-bezier(0.34,1.1,0.64,1), background 0.7s ease' }} />)}
          </div>
          <button onClick={timelineNext}
            style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#EBEBEB', color: BLACK, padding: '12px 18px', border: 'none', cursor: 'pointer', boxShadow: `4px 4px 0 0 ${BLACK}`, flexShrink: 0 }}>
            {stopIndex === stops.length - 1 ? 'Quiz →' : 'Next →'}
          </button>
        </div>

        <div style={{ borderTop: `1px solid ${FAINT}`, paddingTop: 12 }}>
          <span style={{ fontFamily: BODY, fontSize: 12, color: DIM }}>Lesson {id} · {title} · Slide {stopIndex + 1} of {stops.length}</span>
        </div>
      </div>
    </main>
  )
}
