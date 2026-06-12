'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GlossaryText from './GlossaryText'
import { LESSON_IMAGES } from '../data/lessonImages'
import { SLIDE_IMAGES } from '../data/slideImages'
import TRANSLATIONS from '../data/lessonTranslations'
import { WORLDS, WORLD_IDS, getLessonWorldId, WORLD_TITLES_PT } from '../data'
import { ELEMENTARY_WORLDS, MIDDLE_SCHOOL_LESSONS, ELEMENTARY_WORLD_IDS, ELEMENTARY_WORLD_IDS_PT, MIDDLE_SCHOOL_WORLD_IDS, MIDDLE_SCHOOL_WORLD_IDS_PT } from '../data/elementary'

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
  theme?:          'elementary'
}

// Mirrors fake/module tokens exactly
const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const DIM   = '#555555'
const FAINT = '#d8d8d8'
const BLACK = '#0a0a0a'

type Phase = 'timeline' | 'quiz' | 'complete'

export default function LessonTemplate({ id, title: titleEN, stops: stopsEN, questions: questionsEN, completionPage, theme }: Props) {
  const router = useRouter()
  const [phase,     setPhase]     = useState<Phase>('timeline')
  const [stopIndex, setStopIndex] = useState(0)
  const [cardDir,   setCardDir]   = useState<'right' | 'left' | null>(null)
  const [qIndex,    setQIndex]    = useState(0)

  // Apply translation overlay if available for the user's language
  const [lang, setLang] = useState('en')
  useEffect(() => { setLang(localStorage.getItem('pai_lang') ?? 'en') }, [])
  const isPT = lang === 'pt'
  const ui = {
    lessonComplete:  isPT ? 'Aula concluída'       : 'Lesson complete',
    worldComplete:   isPT ? 'Mundo concluído'       : 'World complete',
    next:            isPT ? 'Próxima →'              : 'Next →',
    finish:          isPT ? 'Finalizar →'            : 'Finish →',
    nextLesson:      isPT ? 'Próximo:'               : 'Next:',
    nextWorld:       isPT ? 'Próximo Mundo:'         : 'Next World:',
    backTo:          isPT ? 'Voltar para'            : 'Back to',
    trueBtn:         isPT ? 'Verdadeiro'             : 'True',
    falseBtn:        isPT ? 'Falso'                  : 'False',
    backWorld:       isPT ? '← Mundo'               : '← World',
    backSlide:       isPT ? '← Voltar'              : '← Back',
    nextSlide:       isPT ? 'Próximo slide →'        : 'Next slide →',
    takeQuiz:        isPT ? 'Fazer o questionário →' : 'Take the quiz →',
    skip:            isPT ? 'Pular'                  : 'Skip',
  }
  const tx      = TRANSLATIONS[lang]?.[id]
  const title     = tx?.title     ?? titleEN
  const stops     = tx ? stopsEN.map((s, i)     => ({ ...s, title: tx.stops[i]?.title ?? s.title, body: tx.stops[i]?.body ?? s.body }))         : stopsEN
  const questions = tx ? questionsEN.map((q, i) => ({ ...q, question: tx.questions[i]?.question ?? q.question, verdict: tx.questions[i]?.verdict ?? q.verdict, explanation: tx.questions[i]?.explanation ?? q.explanation })) : questionsEN
  const [selected,  setSelected]  = useState<boolean | null>(null)

  const stop     = stops[stopIndex]
  const question = questions[qIndex]
  const isCorrect = selected !== null && selected === question?.answer
  // Priority: stop's own image → slide-specific Wikipedia image → lesson-level Unsplash fallback
  const slideImage = stop?.image ?? SLIDE_IMAGES[id]?.[stopIndex] ?? LESSON_IMAGES[id]
  const hasImage   = !!slideImage

  const timelineNext = () => {
    if (stopIndex === stops.length - 1) {
      if (questions.length === 0) { finish(); return }
      setPhase('quiz'); return
    }
    setCardDir('right')
    setStopIndex(i => i + 1)
  }
  const timelineBack = () => {
    setCardDir('left')
    setStopIndex(i => i - 1)
  }
  const nextQuestion = () => {
    if (qIndex === questions.length - 1) { finish(); return }
    setSelected(null)
    setQIndex(i => i + 1)
  }
  // Detect middle/elementary lesson by checking lesson data
  const msLesson = MIDDLE_SCHOOL_LESSONS[id]
  const rawWorldId = msLesson ? msLesson.worldId : getLessonWorldId(id)
  const isMidElem  = rawWorldId >= 100
  const world      = isMidElem ? ELEMENTARY_WORLDS[rawWorldId] : WORLDS[rawWorldId]
  const currentWorldRoute = isMidElem
    ? (rawWorldId >= 200 ? `/middle/world/${rawWorldId}` : `/elementary/home`)
    : (rawWorldId === 1 ? '/lessons' : `/world/${rawWorldId}`)

  // Determine if this is the very last lesson of the student's entire curriculum
  const modIdx         = world?.modules.findIndex(m => m.id === id) ?? -1
  const nextLesson     = world?.modules.slice(modIdx + 1).find(m => m.type !== 'game')
  const isLastLesson   = !nextLesson
  const allElemIds     = [...ELEMENTARY_WORLD_IDS, ...ELEMENTARY_WORLD_IDS_PT,
                          ...MIDDLE_SCHOOL_WORLD_IDS, ...MIDDLE_SCHOOL_WORLD_IDS_PT]
  const nextHSWorldIdx = WORLD_IDS.indexOf(rawWorldId) + 1
  const hasNextWorld   = isMidElem
    ? allElemIds.indexOf(rawWorldId) < allElemIds.length - 1 && allElemIds.indexOf(rawWorldId) !== -1
    : nextHSWorldIdx < WORLD_IDS.length
  const isEndOfCurriculum = isLastLesson && !hasNextWorld

  const finish = () => {
    localStorage.setItem(`pai_lesson_${id}_done`, 'true')
    import('@/lib/progress').then(m => m.syncProgress()).catch(() => {})
    if (isEndOfCurriculum) { setPhase('complete'); return }
    if (completionPage) { router.push(completionPage); return }
    setPhase('complete')
  }

  const skip = () => {
    localStorage.setItem(`pai_lesson_${id}_done`, 'true')
    router.push(currentWorldRoute)
  }

  // ── Complete ────────────────────────────────────────────────────────────────
  if (phase === 'complete') {
    const modIdx     = world?.modules.findIndex(m => m.id === id) ?? -1
    // Skip game-type modules when looking for next lesson
    const nextModule = world?.modules.slice(modIdx + 1).find(m => m.type !== 'game')
    const nextWorldIdx = isMidElem ? -1 : WORLD_IDS.indexOf(rawWorldId) + 1
    const nextWorldId  = (!isMidElem && nextWorldIdx < WORLD_IDS.length) ? WORLD_IDS[nextWorldIdx] : null
    const nextWorldRoute = nextWorldId ? `/world/${nextWorldId}` : null
    const isLastInWorld  = !nextModule
    // For elementary, route next lesson to /elementary/lesson/; otherwise /lesson/
    const nextLessonRoute = nextModule
      ? (isMidElem ? `/elementary/lesson/${nextModule.id}` : `/lesson/${nextModule.id}`)
      : null
    // Use completionPage as back destination when provided
    const backDest = completionPage ?? currentWorldRoute

    return (
      <main style={{ height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <div style={{ width: '100%', maxWidth: 480, padding: '0 7vw', textAlign: 'center' }}>
          <div style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, marginBottom: 16 }}>{ui.lessonComplete}</div>
          <div style={{ animation: 'xpPop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.2s both' }}>
            <p style={{ fontFamily: DISP, fontSize: 80, lineHeight: 1, color: BLACK, margin: 0, letterSpacing: '-0.03em' }}>+100</p>
            <p style={{ fontFamily: DISP, fontSize: 20, color: DIM, margin: '4px 0 0', letterSpacing: '0.06em' }}>XP</p>
          </div>
          <h1 style={{ fontFamily: DISP, fontSize: 36, letterSpacing: '-0.02em', color: BLACK, margin: '28px 0 8px', fontWeight: 400 }}>{title}</h1>

          {isLastInWorld && world && (
            <p style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: GREEN, margin: '0 0 20px' }}>
              {ui.worldComplete}
            </p>
          )}

          <div style={{ borderTop: `1px solid ${FAINT}`, marginBottom: 24 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {nextLessonRoute && nextModule && (
              <button
                onClick={() => router.push(nextLessonRoute)}
                style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 28px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: `4px 4px 0 0 #555` }}
              >
                {ui.nextLesson} {(isPT && TRANSLATIONS['pt']?.[nextModule.id]?.title) || nextModule.title} →
              </button>
            )}
            {isLastInWorld && nextWorldRoute && nextWorldId && (
              <button
                onClick={() => router.push(nextWorldRoute)}
                style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: BLACK, color: '#fff', padding: '14px 28px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: `4px 4px 0 0 #555` }}
              >
                {ui.nextWorld} {(isPT ? WORLD_TITLES_PT[nextWorldId] : null) ?? (WORLDS[nextWorldId] ?? ELEMENTARY_WORLDS[nextWorldId])?.title} →
              </button>
            )}
            <button
              onClick={() => router.push(backDest)}
              style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', color: DIM, padding: '10px 28px', border: `1.5px solid ${FAINT}`, cursor: 'pointer' }}
            >
              {ui.backTo} {(isPT ? WORLD_TITLES_PT[rawWorldId] : null) ?? world?.title ?? (isPT ? 'Mundo' : 'World')}
            </button>
          </div>
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
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <div style={{ width: '100%', padding: '0 7vw', display: 'flex', flexDirection: 'column', gap: 0, transform: 'scale(1.06)', transformOrigin: 'center center', transition: 'transform 0.28s ease' }}>

          {/* Kicker */}
          <div>
            <div style={{ paddingBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
              <div style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ color: BLACK }}>{isPT ? 'Questionário' : 'Quiz'}</span>
                <span style={{ color: FAINT }}>·</span>
                <button onClick={skip} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM, padding: 0 }}>{isPT ? 'Aula' : 'Lesson'} {id}</button>
                <span style={{ color: FAINT }}>·</span>
                <span style={{ color: DIM }}>{title}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM }}>{qIndex + 1} / {questions.length}</span>
                <button onClick={skip} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: FAINT, padding: 0 }}>{ui.skip}</button>
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
                    {val ? ui.trueBtn : ui.falseBtn}
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
                {qIndex === questions.length - 1 ? ui.finish : ui.next}
              </button>
            )}
          </div>
          <div style={{ borderTop: `1px solid ${FAINT}`, paddingTop: 14, paddingBottom: 0, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: BODY, fontSize: 13, color: DIM }}>{isPT ? 'Aula' : 'Lesson'} {id} · {title} · {isPT ? 'Questionário' : 'Quiz'}</span>
            <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM }}>Q{qIndex + 1} {isPT ? 'de' : 'of'} {questions.length}</span>
          </div>

        </div>
      </main>
    )
  }

  // ── Slides — mirrors fake/module/page.tsx exactly ──────────────────────────
  const isElem    = theme === 'elementary'
  const slideBg   = isElem ? '#FAFAFA' : '#fff'
  const slideAccent = isElem ? (stopIndex % 2 === 0 ? '#FF3DB8' : '#00FF88') : GREEN
  // For regular lessons: no background highlight on title/tag; green only for interactive elements
  const slideText   = slideAccent          // buttons, dots, image shadow
  const highlightBg = isElem ? slideAccent : 'transparent'  // title span + tag badge

  return (
    <main className="lesson-slide-main" style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: slideBg, transition: 'background 0.4s ease, color 0.4s ease', overflow: 'hidden' }}>

      {/* Black PAI header — workshopped design */}
      <div style={{ background: BLACK, padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: DISP, fontSize: 22, letterSpacing: '-0.02em', color: GREEN, lineHeight: 1 }}>PAI</span>
        <button onClick={() => router.push(currentWorldRoute)} style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}>
          {ui.backWorld}
        </button>
      </div>

      {/* Scrollable content area — flex:1 with overflow so nav never gets cut off */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
      <div
        id="lesson-content-wrapper"
        className="lesson-slide-scaler"
        style={{ width: '100%', padding: '0 7vw', display: 'flex', flexDirection: 'column', gap: 0 }}
      >

        {/* Kicker — same as fake */}
        <div>
          <div style={{ paddingBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            <div style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ color: BLACK, background: highlightBg, padding: '1px 5px' }}>{stop.tag}</span>
              <span style={{ color: FAINT }}>·</span>
              <button onClick={() => router.push(currentWorldRoute)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM, padding: 0 }}>
                {isPT ? 'Aula' : 'Lesson'} {id}
              </button>
              <span style={{ color: FAINT }}>·</span>
              <span style={{ color: DIM }}>{title}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
              {stop.year && <span style={{ fontFamily: BODY, fontSize: 13, color: DIM }}>{stop.year}</span>}
              <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM }}>{stopIndex + 1} / {stops.length}</span>
              <button onClick={skip} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: FAINT, padding: 0 }}>{ui.skip}</button>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${BLACK}` }} />
        </div>

        {/* Two-column grid — same as fake */}
        <div
          key={stopIndex}
          className={hasImage ? 'lesson-slide-grid' : undefined}
          style={{
            display: hasImage ? undefined : 'grid',
            gridTemplateColumns: hasImage ? undefined : '1fr',
            gap: 0,
            paddingTop: 44,
            paddingBottom: 32,
            animation: cardDir ? `${cardDir === 'right' ? 'slideInFromRight' : 'slideInFromLeft'} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)` : undefined,
          }}
        >
          {/* Left: headline + body */}
          <div className={hasImage ? 'lesson-slide-text' : undefined} style={{ paddingRight: hasImage ? 52 : 0, borderRight: hasImage ? `1px solid ${FAINT}` : 'none', display: 'flex', flexDirection: 'column' }}>

            {/* Image stacked above title — only shown on mobile via CSS */}
            {hasImage && (
              <div className="lesson-slide-image-top" style={{ display: 'none', marginBottom: 18, aspectRatio: '4/3', overflow: 'hidden', boxShadow: `6px 6px 0 0 ${slideText}` }}>
                <img src={slideImage!} alt={stop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
            )}

            <h1 className="lesson-slide-title" style={{
              fontFamily: DISP, fontWeight: 400,
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              lineHeight: 1.15, letterSpacing: '-0.03em',
              margin: '0 0 28px', color: BLACK,
            }}>
              <span style={{ background: highlightBg, padding: highlightBg === 'transparent' ? '2px 0' : '2px 6px', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' } as React.CSSProperties}>
                {stop.title}
              </span>
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
            <div className="lesson-slide-image" style={{ paddingLeft: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: '#f0edea', aspectRatio: '3/4', overflow: 'hidden', boxShadow: `10px 10px 0 0 ${slideText}` }}>
                <img src={slideImage} alt={stop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
            </div>
          )}
        </div>

        {/* Footer inside scroller */}
        <div style={{ borderTop: `1px solid ${FAINT}`, paddingTop: 14, paddingBottom: 14, display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: BODY, fontSize: 13, color: DIM }}>{isPT ? 'Aula' : 'Lesson'} {id} · {title} · Slide {stopIndex + 1} {isPT ? 'de' : 'of'} {stops.length}</span>
          <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM }}>Slide</span>
        </div>

      </div>
      </div>

      {/* Navigation — fixed at bottom, never clipped */}
      <div style={{ flexShrink: 0, background: slideBg, borderTop: `2px solid ${BLACK}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 7vw', gap: 20 }}>
          <button disabled={stopIndex === 0} onClick={stopIndex > 0 ? timelineBack : undefined} style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none', border: `1.5px solid ${BLACK}`, color: BLACK, padding: '10px 22px', cursor: stopIndex > 0 ? 'pointer' : 'not-allowed', opacity: stopIndex === 0 ? 0.3 : 1 }}>
            {ui.backSlide}
          </button>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {stops.map((_, i) => <div key={i} style={{ width: i === stopIndex ? 20 : 6, height: 6, borderRadius: 3, background: i < stopIndex ? slideText : i === stopIndex ? slideText : FAINT, transition: 'width 0.9s cubic-bezier(0.34,1.1,0.64,1), background 0.7s ease' }} />)}
          </div>
          <button onClick={timelineNext} style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', background: slideText, color: BLACK, padding: '10px 22px', border: 'none', cursor: 'pointer', boxShadow: `4px 4px 0 0 ${BLACK}` }}>
            {stopIndex === stops.length - 1 ? ui.takeQuiz : ui.nextSlide}
          </button>
        </div>
      </div>

    </main>
  )
}
