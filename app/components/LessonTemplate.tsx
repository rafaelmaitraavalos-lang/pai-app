'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export interface Stop {
  tag: string
  year?: string
  title: string
  body: string
  image?: string
}

export interface Question {
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tag: string
  stopTitle: string
  question: string
  answer: boolean
  verdict: string
  explanation: string
}

interface Props {
  id: number
  title: string
  stops: Stop[]
  questions: Question[]
  completionPage?: string
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function Mascot() {
  return (
    <div style={{ animation: 'paiFloat 3s ease-in-out infinite' }}>
      <div className="relative w-36 h-36 rounded-full" style={{ background: 'radial-gradient(circle at 40% 33%, #FFE08A, #D4780A 80%)', boxShadow: '0 16px 40px rgba(186,117,23,0.28), 0 0 0 10px rgba(186,117,23,0.07)' }}>
        <div className="absolute inset-5 rounded-full" style={{ border: '1.5px solid rgba(255,255,255,0.22)', background: 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.18), transparent 65%)' }} />
        <div className="absolute rounded-full" style={{ top: '18%', left: '20%', width: '30%', height: '20%', background: 'rgba(255,255,255,0.38)', filter: 'blur(5px)' }} />
      </div>
    </div>
  )
}

function TagPill({ label, solid = false }: { label: string; solid?: boolean }) {
  if (solid) {
    return <span className="inline-block px-3 py-1 rounded-full bg-[#BA7517] text-white text-[11px] font-black uppercase tracking-[0.10em]">{label}</span>
  }
  return (
    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-[0.10em] text-[#BA7517]" style={{ background: 'rgba(186,117,23,0.10)', border: '1px solid rgba(186,117,23,0.22)' }}>
      {label}
    </span>
  )
}

function CheckIcon() {
  return <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2.5 7.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function XIcon() {
  return <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 2l9 9M11 2l-9 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" /></svg>
}

type Phase = 'timeline' | 'quiz' | 'complete'

// ── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({ title, stops, stopIndex, phase, qIndex, questions }: {
  title: string
  stops: Stop[]
  stopIndex: number
  phase: Phase
  qIndex: number
  questions: Question[]
}) {
  return (
    <aside className="w-60 flex-shrink-0 flex flex-col border-r border-[#E5D4BA] overflow-y-auto">
      <div className="px-6 pt-8 pb-5 border-b border-[#E5D4BA]">
        <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#BA7517] mb-1">World 1</div>
        <div className="font-black text-[#3D1A00] text-[14px] leading-snug">{title}</div>
      </div>

      <div className="flex-1 px-4 py-5">
        <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#9A5A10]/50 mb-2.5 px-2">Slides</div>
        <div className="flex flex-col gap-0.5">
          {stops.map((s, i) => {
            const done = phase !== 'timeline' || i < stopIndex
            const current = phase === 'timeline' && i === stopIndex
            return (
              <div key={i} className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-colors ${current ? 'bg-[#BA7517]/10' : ''}`}>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${done || current ? 'bg-[#BA7517]' : 'bg-[#DDD0BC]'}`} />
                <span className={`text-[12px] leading-snug transition-colors ${current ? 'font-black text-[#3D1A00]' : done ? 'font-semibold text-[#BA7517]' : 'font-medium text-[#9A5A10]/60'}`}>
                  {s.title}
                </span>
              </div>
            )
          })}
        </div>

        {phase !== 'timeline' && (
          <>
            <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#9A5A10]/50 mb-2.5 px-2 mt-5">Quiz</div>
            <div className="flex flex-col gap-0.5">
              {questions.map((q, i) => {
                const done = phase === 'complete' || i < qIndex
                const current = phase === 'quiz' && i === qIndex
                return (
                  <div key={i} className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg ${current ? 'bg-[#BA7517]/10' : ''}`}>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${done || current ? 'bg-[#BA7517]' : 'bg-[#DDD0BC]'}`} />
                    <span className={`text-[12px] leading-snug ${current ? 'font-black text-[#3D1A00]' : done ? 'font-semibold text-[#BA7517]' : 'font-medium text-[#9A5A10]/60'}`}>
                      Q{i + 1} · {q.difficulty}
                    </span>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </aside>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function LessonTemplate({ id, title, stops, questions, completionPage }: Props) {
  const router = useRouter()

  const [phase, setPhase] = useState<Phase>('timeline')
  const [stopIndex, setStopIndex] = useState(0)
  const [cardDir, setCardDir] = useState<'right' | 'left' | null>(null)
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState<boolean | null>(null)
  const [qDir, setQDir] = useState<'right' | 'left' | null>(null)

  const timelineNext = () => {
    if (stopIndex === stops.length - 1) { setPhase('quiz'); return }
    setCardDir('right')
    setStopIndex(i => i + 1)
  }
  const timelineBack = () => {
    setCardDir('left')
    setStopIndex(i => i - 1)
  }
  const handleAnswer = (val: boolean) => {
    if (selected !== null) return
    setSelected(val)
  }
  const nextQuestion = () => {
    if (qIndex === questions.length - 1) {
      localStorage.setItem(`pai_lesson_${id}_done`, 'true')
      if (completionPage) {
        router.push(completionPage)
      } else {
        setPhase('complete')
      }
      return
    }
    setQDir('right')
    setSelected(null)
    setQIndex(i => i + 1)
  }

  const stop = stops[stopIndex]
  const question = questions[qIndex]
  const isCorrect = selected !== null && selected === question?.answer
  const timelineProgress = ((stopIndex + 1) / stops.length) * 100
  const quizProgress = ((qIndex + 1) / questions.length) * 100

  const sidebarProps = { title, stops, stopIndex, phase, qIndex, questions }

  // ── Complete ──────────────────────────────────────────────────────────────
  if (phase === 'complete') {
    return (
      <div className="min-h-screen bg-[#F2EBE0] font-sans flex flex-col" style={{ animation: 'pageIn 0.3s ease-out' }}>
        <div className="flex flex-1">
          <Sidebar {...sidebarProps} />
          <main className="flex-1 flex items-center justify-center px-10 py-16">
            <div className="flex flex-col items-center text-center gap-7 max-w-sm">
              <Mascot />
              <div style={{ animation: 'xpPop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both' }}>
                <p className="font-black text-[#BA7517] leading-none tabular-nums" style={{ fontSize: '80px' }}>+100</p>
                <p className="text-2xl font-black text-[#9A5A10]">XP</p>
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-[#3D1A00]">Lesson complete.</h1>
                <p className="text-[#9A5A10] font-semibold">That's the full story. You're on your way.</p>
              </div>
              <button
                onClick={() => router.push('/lessons')}
                className="w-full py-4 rounded-2xl font-black text-lg bg-[#BA7517] text-white shadow-[0_5px_0_#7A4A0A] active:shadow-none active:translate-y-1 cursor-pointer select-none transition-all duration-100"
              >
                Back to lessons
              </button>
            </div>
          </main>
        </div>
      </div>
    )
  }

  // ── Quiz ──────────────────────────────────────────────────────────────────
  if (phase === 'quiz') {
    const btnState = (val: boolean) => {
      if (selected === null) return 'default'
      if (val === question.answer) return 'correct'
      if (val === selected) return 'wrong'
      return 'dimmed'
    }
    const btnCls: Record<string, string> = {
      default: 'bg-white border-[#DDD0BC] text-[#3D1A00] cursor-pointer hover:shadow-md hover:border-[#BA7517]/40 active:scale-[0.98]',
      correct: 'bg-green-500 border-green-500 text-white',
      wrong:   'bg-red-500 border-red-500 text-white',
      dimmed:  'bg-white border-[#E5D4BA] text-[#3D1A00] opacity-25',
    }

    return (
      <div className="min-h-screen bg-[#F2EBE0] font-sans flex flex-col" style={{ animation: 'pageIn 0.2s ease-out' }}>
        {/* Quiz top bar */}
        <div className="px-8 py-4 flex items-center justify-between bg-[#F2EBE0]">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#BA7517]">Lesson {id} · {title}</p>
            <p className="text-sm font-bold text-[#9A5A10] mt-0.5">Quiz</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => { localStorage.setItem(`pai_lesson_${id}_done`, 'true'); router.back() }}
              className="text-[11px] font-black uppercase tracking-widest text-[#BBA98C] hover:text-[#BA7517] transition-colors cursor-pointer"
            >
              Skip
            </button>
            <span className="text-sm font-black text-[#9A5A10]">{qIndex + 1} / {questions.length}</span>
          </div>
        </div>
        <div className="h-1 bg-[#E5D4BA]">
          <div className="h-full bg-[#BA7517] transition-[width] duration-500" style={{ width: `${quizProgress}%` }} />
        </div>

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <Sidebar {...sidebarProps} />

          <main className="flex-1 flex items-start justify-center px-10 py-10 overflow-y-auto">
            <div className="w-full max-w-2xl">
              <div
                key={qIndex}
                className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.07)] p-10"
                style={{ animation: qDir ? `${qDir === 'right' ? 'slideInFromRight' : 'slideInFromLeft'} 0.28s ease-out` : undefined }}
              >
                <div className="mb-5">
                  <TagPill label={question.tag} solid />
                  <h2 className="font-black text-[#3D1A00] mt-3 leading-tight" style={{ fontSize: '24px' }}>
                    {question.stopTitle}
                  </h2>
                </div>

                <div className="border-2 border-[#E5D4BA] rounded-xl px-6 py-5 mb-6">
                  <p className="font-semibold text-[#3D1A00] italic leading-relaxed" style={{ fontSize: '16px' }}>
                    {question.question}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  {([true, false] as const).map(val => {
                    const state = btnState(val)
                    return (
                      <button
                        key={String(val)}
                        onClick={() => handleAnswer(val)}
                        disabled={selected !== null}
                        className={`flex items-center justify-center gap-2 py-6 rounded-2xl border-2 font-black text-xl transition-all duration-150 ${btnCls[state]}`}
                      >
                        {state === 'correct' && <CheckIcon />}
                        {state === 'wrong' && <XIcon />}
                        {val ? 'True' : 'False'}
                      </button>
                    )
                  })}
                </div>

                {selected !== null && (
                  <div className="border-2 border-[#E5D4BA] rounded-xl px-6 py-5" style={{ animation: 'slideUpFade 0.3s ease-out' }}>
                    <p className={`font-black text-lg mb-2 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>{question.verdict}</p>
                    <p className="text-[#3D1A00] font-medium leading-relaxed" style={{ fontSize: '15px' }}>{question.explanation}</p>
                  </div>
                )}
              </div>

              {selected !== null && (
                <div className="mt-4" style={{ animation: 'slideUpFade 0.25s ease-out' }}>
                  <button
                    onClick={nextQuestion}
                    className="w-full py-4 rounded-2xl font-black text-lg bg-[#BA7517] text-white shadow-[0_5px_0_#7A4A0A] active:shadow-none active:translate-y-1 cursor-pointer hover:bg-[#C8851F] select-none transition-all duration-100"
                  >
                    {qIndex === questions.length - 1 ? 'Finish' : 'Next →'}
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    )
  }

  // ── Timeline ──────────────────────────────────────────────────────────────
  return (
    <div className="h-screen bg-[#F2EBE0] font-sans flex flex-col overflow-hidden" style={{ animation: 'pageIn 0.25s ease-out' }}>

      {/* Top bar */}
      <div className="flex-shrink-0 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/lessons')}
            className="flex items-center gap-1.5 text-[#BA7517] font-black text-sm active:opacity-70 hover:opacity-80 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="#BA7517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Lessons
          </button>
          <div className="w-px h-4 bg-[#DDD0BC]" />
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[#BA7517]">Lesson {id}</span>
            <span className="text-[#DDD0BC] mx-2">·</span>
            <span className="font-black text-[#3D1A00] text-sm">{title}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => { localStorage.setItem(`pai_lesson_${id}_done`, 'true'); router.push('/lessons') }}
            className="text-[11px] font-black uppercase tracking-widest text-[#BBA98C] hover:text-[#BA7517] transition-colors cursor-pointer"
          >
            Skip
          </button>
          <span className="font-black text-[#9A5A10] text-sm tabular-nums">{stopIndex + 1} / {stops.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex-shrink-0 h-1 bg-[#E5D4BA]">
        <div className="h-full bg-[#BA7517] transition-[width] duration-500" style={{ width: `${timelineProgress}%` }} />
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar {...sidebarProps} />

        <main className="flex-1 min-h-0 relative overflow-hidden">
          {/* Outer: centering only — never animated so transform stays intact */}
          <div
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'calc(100% - 80px)',
              maxWidth: '1024px',
              height: '520px',
              maxHeight: 'calc(100% - 80px)',
            }}
          >
          {/* Inner: slide animation only — no positioning transform to conflict */}
          <div
            key={stopIndex}
            className="w-full h-full bg-white rounded-2xl overflow-hidden flex"
            style={{
              boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
              animation: cardDir ? `${cardDir === 'right' ? 'slideInFromRight' : 'slideInFromLeft'} 0.3s ease-out` : undefined,
            }}
          >
            {/* Left: image or accent panel */}
            <div className="flex-shrink-0 relative" style={{ width: '45%' }}>
              {stop.image ? (
                <img
                  src={stop.image}
                  alt={stop.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'linear-gradient(145deg, #FFE08A 0%, #D4780A 100%)' }}
                >
                  {stop.year && (
                    <span
                      className="font-black text-white/20 leading-none text-center px-6 select-none"
                      style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
                    >
                      {stop.year}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Right: text */}
            <div className="flex flex-col flex-1 px-14 py-12 overflow-y-auto min-h-0">
              {/* Tag + year */}
              <div className="flex items-center gap-3 mb-6">
                <TagPill label={stop.tag} />
                {stop.year && (
                  <span className="font-black uppercase tracking-[0.14em] text-[#9A5A10]/45" style={{ fontSize: '11px' }}>
                    {stop.year}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2
                className="font-black text-[#3D1A00] mb-6 leading-tight"
                style={{ fontSize: '32px' }}
              >
                {stop.title}
              </h2>

              {/* Body */}
              <p
                className="text-[#3D1A00] font-medium flex-1"
                style={{ fontSize: '16px', lineHeight: '1.75', maxWidth: '52ch' }}
              >
                {stop.body}
              </p>

              {/* Nav */}
              <div className="flex items-center gap-3 pt-10">
                <button
                  onClick={stopIndex > 0 ? timelineBack : undefined}
                  className={`px-6 py-3 rounded-xl font-black text-sm transition-all duration-100 ${
                    stopIndex > 0
                      ? 'bg-white border-2 border-[#DDD0BC] text-[#3D1A00] hover:border-[#BA7517]/50 cursor-pointer active:scale-[0.97]'
                      : 'bg-white border-2 border-[#E5D4BA] text-[#C4AE94] cursor-not-allowed'
                  }`}
                >
                  ← Back
                </button>
                <button
                  onClick={timelineNext}
                  className="flex-1 py-3 rounded-xl font-black text-sm bg-[#BA7517] text-white shadow-[0_4px_0_#7A4A0A] active:shadow-none active:translate-y-0.5 cursor-pointer hover:bg-[#C8851F] select-none transition-all duration-100"
                >
                  {stopIndex === stops.length - 1 ? 'Take the quiz →' : 'Next →'}
                </button>
              </div>
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  )
}
