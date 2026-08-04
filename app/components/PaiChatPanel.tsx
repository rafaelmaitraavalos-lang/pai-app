'use client'

import { useState, useRef, useEffect } from 'react'
import AutoplayVideo from './AutoplayVideo'

const DISP  = "var(--font-display, 'Arial Black', sans-serif)"
const BODY  = "var(--font-body, system-ui, sans-serif)"
const GREEN = '#3DF542'
const BLACK = '#0a0a0a'
const LESSON_NUDGE_AT = 8   // questions in one lesson before PAI gently points back to the lesson

// Local count of questions asked in this lesson today — only used to time the
// nudge, so localStorage is fine (the real limits are enforced server-side).
function incrementLessonUsage(lessonId: number): number {
  if (typeof window === 'undefined') return 0
  const key   = `pai_chat_lesson_${lessonId}_${new Date().toISOString().slice(0, 10)}`
  const count = parseInt(localStorage.getItem(key) ?? '0', 10) + 1
  localStorage.setItem(key, String(count))
  return count
}

interface Stop { title: string; body: string }
interface Props {
  lessonId:    number
  lessonTitle: string
  stops:       Stop[]
  currentStop: Stop
  track:       'elementary' | 'middle' | 'highschool'
  lang:        string
  onClose:     () => void
}
interface Message { role: 'user' | 'assistant'; content: string }

const T = {
  en: {
    greetingElem: 'Hi! Ask me anything about this slide.',
    greeting:     'Ask me anything about this lesson — I can also pull in other lessons if it helps.',
    unreachable:  'Cannot reach PAI right now. Try again in a moment.',
    placeholderElem: 'Ask PAI...',
    placeholder:     'Ask about this lesson...',
    close: 'close',
    noResponse: 'No response.',
    leftThisMonth: (n: number) => `${n} left this month`,
    lessonNudge: 'Great questions! Let\'s finish this lesson and see what comes next — I\'ll be right here if you need me.',
  },
  pt: {
    greetingElem: 'Oi! Me pergunte qualquer coisa sobre este slide.',
    greeting:     'Me pergunte qualquer coisa sobre esta aula — também posso usar outras aulas se ajudar.',
    unreachable:  'Não foi possível falar com o PAI agora. Tente de novo em instantes.',
    placeholderElem: 'Pergunte ao PAI...',
    placeholder:     'Pergunte sobre esta aula...',
    close: 'fechar',
    noResponse: 'Sem resposta.',
    leftThisMonth: (n: number) => `${n} restantes este mês`,
    lessonNudge: 'Ótimas perguntas! Vamos terminar esta aula e ver o que vem a seguir — estarei bem aqui se você precisar de mim.',
  },
} as const

export default function PaiChatPanel({ lessonId, lessonTitle, stops, currentStop, track, lang, onClose }: Props) {
  const tx = lang === 'pt' ? T.pt : T.en
  const [messages,  setMessages]  = useState<Message[]>([
    { role: 'assistant', content: track === 'elementary' ? tx.greetingElem : tx.greeting },
  ])
  const [input,     setInput]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [remaining, setRemaining] = useState<number | null>(null)  // null = unknown until server tells us
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])
  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 120) }, [])

  const send = async () => {
    const text = input.trim()
    if (!text || loading || remaining === 0) return
    setInput('')
    const next: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setLoading(true)

    try {
      const res  = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, lessonId, lessonTitle, currentStop, allStops: stops, history: next.slice(-6), track, lang }),
      })
      const data = await res.json()
      if (typeof data.remaining === 'number') setRemaining(data.remaining)
      // An error status with no reply text (5xx, malformed body) reads as the
      // polite "can't reach PAI" message, not a bare "No response." — real
      // 429s carry their own explanatory reply and still show it.
      setMessages(m => [...m, { role: 'assistant', content: data.reply ?? (res.ok ? tx.noResponse : tx.unreachable) }])
      // After a burst of questions in one lesson, gently point back to the lesson — once per lesson per day.
      if (res.ok && incrementLessonUsage(lessonId) === LESSON_NUDGE_AT) {
        setMessages(m => [...m, { role: 'assistant', content: tx.lessonNudge }])
      }
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: tx.unreachable }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.25)' }} />

      {/* Speech bubble — floats directly above the chat button, bottom-left */}
      <div style={{
        position:      'fixed',
        // clears the chat button: its 20px offset + 56px height + 12px gap
        bottom:        'calc(env(safe-area-inset-bottom, 0px) + 88px)',
        left:          12,
        zIndex:        51,
        width:         340,
        maxWidth:      'calc(100vw - 32px)',
        height:        460,
        maxHeight:     'calc(100vh - 160px)',
        display:       'flex',
        flexDirection: 'column',
        background:    BLACK,
        border:        `2px solid ${GREEN}`,
        boxShadow:     `6px 6px 0 0 ${GREEN}55`,
        animation:     'chatPopIn 0.2s cubic-bezier(0.34,1.3,0.64,1)',
      }}>

        {/* Bubble tail — triangle pointing down toward the chat button */}
        <div style={{
          position:    'absolute',
          bottom:      -14,
          left:        48,
          width:       0,
          height:      0,
          borderLeft:  '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop:   `14px solid ${GREEN}`,
        }} />
        <div style={{
          position:    'absolute',
          bottom:      -10,
          left:        50,
          width:       0,
          height:      0,
          borderLeft:  '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop:   `12px solid ${BLACK}`,
        }} />

        {/* Header — PAI label + close */}
        <div style={{ padding: '10px 14px 8px', borderBottom: `1px solid #1a1a1a`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AutoplayVideo src="/pig.mp4" style={{ width: 28, height: 28, objectFit: 'contain' }} />
            <span style={{ fontFamily: DISP, fontSize: 13, letterSpacing: '-0.01em', color: GREEN }}>PAI</span>
            <span style={{ fontFamily: BODY, fontSize: 10, color: '#444' }}>{lessonTitle}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {remaining !== null && (
              <span style={{ fontFamily: BODY, fontSize: 9, color: remaining === 0 ? '#e05' : '#444' }}>
                {tx.leftThisMonth(remaining)}
              </span>
            )}
            <button onClick={onClose} style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'none', border: '1px solid #222', color: '#444', padding: '3px 8px', cursor: 'pointer' }}>
              {tx.close}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px 8px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth:     '90%',
                padding:      '8px 12px',
                fontFamily:   BODY,
                fontSize:     track === 'elementary' ? 14 : 13,
                lineHeight:   1.5,
                color:        m.role === 'user' ? BLACK : '#e0e0e0',
                background:   m.role === 'user' ? GREEN : '#141414',
                border:       m.role === 'user' ? 'none' : '1px solid #222',
                borderRadius: m.role === 'user' ? '10px 10px 2px 10px' : '2px 10px 10px 10px',
              }}>
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '8px 14px', background: '#141414', border: '1px solid #222', borderRadius: '2px 10px 10px 10px', display: 'flex', gap: 4, alignItems: 'center' }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: GREEN, display: 'inline-block', animation: `dotBounce 1.2s ${i*0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '8px 10px 12px', borderTop: '1px solid #1a1a1a', display: 'flex', gap: 6, flexShrink: 0 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={track === 'elementary' ? tx.placeholderElem : tx.placeholder}
            style={{ flex: 1, fontFamily: BODY, fontSize: 13, background: '#0e0e0e', border: '1px solid #222', borderRadius: 6, color: '#fff', padding: '8px 11px', outline: 'none' }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading || remaining === 0}
            style={{
              fontFamily: DISP, fontSize: 16,
              background: input.trim() && !loading && remaining !== 0 ? GREEN : '#181818',
              color:      input.trim() && !loading && remaining !== 0 ? BLACK : '#333',
              border: 'none', borderRadius: 6, padding: '8px 13px',
              cursor: input.trim() && !loading && remaining !== 0 ? 'pointer' : 'default',
              flexShrink: 0, transition: 'background 0.12s',
            }}
          >
            →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes chatPopIn {
          from { transform: scale(0.88) translateY(10px); opacity: 0; transform-origin: bottom left; }
          to   { transform: scale(1)    translateY(0);    opacity: 1; transform-origin: bottom left; }
        }
        @keyframes dotBounce {
          0%,80%,100% { transform: translateY(0);    opacity: 0.4; }
          40%         { transform: translateY(-4px); opacity: 1;   }
        }
      `}</style>
    </>
  )
}
