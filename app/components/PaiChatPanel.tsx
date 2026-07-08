'use client'

import { useState, useRef, useEffect } from 'react'

const DISP        = "var(--font-display, 'Arial Black', sans-serif)"
const BODY        = "var(--font-body, system-ui, sans-serif)"
const GREEN       = '#3DF542'
const BLACK       = '#0a0a0a'
const DIM         = '#555555'
const DAILY_LIMIT = 30   // questions per user per day

function getDailyUsage(): number {
  if (typeof window === 'undefined') return 0
  const key  = `pai_chat_${new Date().toISOString().slice(0, 10)}`
  return parseInt(localStorage.getItem(key) ?? '0', 10)
}

function incrementDailyUsage() {
  const key   = `pai_chat_${new Date().toISOString().slice(0, 10)}`
  const count = getDailyUsage() + 1
  localStorage.setItem(key, String(count))
  return count
}

interface Stop {
  title: string
  body:  string
}

interface Props {
  lessonTitle: string
  stops:       Stop[]
  currentStop: Stop
  onClose:     () => void
}

interface Message {
  role:    'user' | 'assistant'
  content: string
}

export default function PaiChatPanel({ lessonTitle, stops, currentStop, onClose }: Props) {
  const [messages,    setMessages]    = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hey! I'm PAI. Ask me anything about "${currentStop.title}" — I'll only use what's in this lesson.`,
    },
  ])
  const [input,       setInput]       = useState('')
  const [loading,     setLoading]     = useState(false)
  const [usedToday,   setUsedToday]   = useState(0)

  useEffect(() => { setUsedToday(getDailyUsage()) }, [])

  const remaining = Math.max(0, DAILY_LIMIT - usedToday)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    if (remaining <= 0) {
      setMessages(m => [...m, { role: 'assistant', content: 'You\'ve used all your questions for today! Come back tomorrow — curiosity is a superpower. 🐷✨' }])
      return
    }
    setInput('')
    const next: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setLoading(true)
    const newCount = incrementDailyUsage()
    setUsedToday(newCount)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message:      text,
          lessonTitle,
          currentStop,
          allStops:     stops,
          history:      next.slice(-6), // last 3 turns
        }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.reply ?? 'Sorry, I couldn\'t get a response.' }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Couldn\'t reach PAI right now. Make sure Ollama is running.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.45)' }}
      />

      {/* Panel — slides up from bottom */}
      <div style={{
        position:     'fixed',
        bottom:       0,
        left:         0,
        right:        0,
        zIndex:       51,
        maxHeight:    '70vh',
        display:      'flex',
        flexDirection:'column',
        background:   BLACK,
        borderTop:    `2px solid ${GREEN}`,
        animation:    'chatSlideUp 0.25s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: `1px solid #222`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <video src="/pig.mp4" autoPlay loop muted playsInline style={{ width: 32, height: 32, objectFit: 'contain' }} />
            <div>
              <span style={{ fontFamily: DISP, fontSize: 13, letterSpacing: '-0.01em', color: GREEN }}>PAI</span>
              <span style={{ fontFamily: BODY, fontSize: 11, color: '#555', marginLeft: 8 }}>{lessonTitle}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: remaining > 5 ? '#444' : '#C0392B' }}>
              {remaining} left today
            </span>
            <button
              onClick={onClose}
              style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'none', border: '1px solid #333', color: DIM, padding: '5px 10px', cursor: 'pointer' }}
            >
              Close
            </button>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth:   '78%',
                padding:    '10px 14px',
                fontFamily: BODY,
                fontSize:   14,
                lineHeight: 1.55,
                color:      m.role === 'user' ? BLACK : '#e8e8e8',
                background: m.role === 'user' ? GREEN : '#161616',
                border:     m.role === 'user' ? 'none' : '1px solid #2a2a2a',
              }}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '10px 14px', background: '#161616', border: '1px solid #2a2a2a', color: '#555', fontFamily: BODY, fontSize: 14 }}>
                <span style={{ animation: 'pulse 1s infinite' }}>···</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '12px 24px 20px', borderTop: '1px solid #222', display: 'flex', gap: 10, flexShrink: 0 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask about this slide..."
            style={{
              flex:       1,
              fontFamily: BODY,
              fontSize:   14,
              background: '#111',
              border:     `1px solid #333`,
              color:      '#fff',
              padding:    '10px 14px',
              outline:    'none',
            }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            style={{
              fontFamily:  DISP,
              fontSize:    11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background:  input.trim() && !loading ? GREEN : '#222',
              color:       input.trim() && !loading ? BLACK : '#444',
              border:      'none',
              padding:     '10px 18px',
              cursor:      input.trim() && !loading ? 'pointer' : 'default',
              flexShrink:  0,
            }}
          >
            Send
          </button>
        </div>
      </div>

      <style>{`
        @keyframes chatSlideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
      `}</style>
    </>
  )
}
