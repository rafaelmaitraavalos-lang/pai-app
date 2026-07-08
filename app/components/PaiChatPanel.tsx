'use client'

import { useState, useRef, useEffect } from 'react'

const DISP        = "var(--font-display, 'Arial Black', sans-serif)"
const BODY        = "var(--font-body, system-ui, sans-serif)"
const GREEN       = '#3DF542'
const BLACK       = '#0a0a0a'
const DIM         = '#555555'
const DAILY_LIMIT = 30

function getDailyUsage(): number {
  if (typeof window === 'undefined') return 0
  const key = `pai_chat_${new Date().toISOString().slice(0, 10)}`
  return parseInt(localStorage.getItem(key) ?? '0', 10)
}

function incrementDailyUsage() {
  const key   = `pai_chat_${new Date().toISOString().slice(0, 10)}`
  const count = getDailyUsage() + 1
  localStorage.setItem(key, String(count))
  return count
}

interface Stop { title: string; body: string }
interface Props {
  lessonTitle: string
  stops:       Stop[]
  currentStop: Stop
  onClose:     () => void
}
interface Message { role: 'user' | 'assistant'; content: string }

export default function PaiChatPanel({ lessonTitle, stops, currentStop, onClose }: Props) {
  const [messages,  setMessages]  = useState<Message[]>([
    { role: 'assistant', content: `Hi! I'm PAI 🐷 Ask me anything about this lesson and I'll explain it — I only use what's right here on the slide.` },
  ])
  const [input,     setInput]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [usedToday, setUsedToday] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => { setUsedToday(getDailyUsage()) }, [])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])
  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 120) }, [])

  const remaining = Math.max(0, DAILY_LIMIT - usedToday)

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    if (remaining <= 0) {
      setMessages(m => [...m, { role: 'assistant', content: "You've used all your questions for today — come back tomorrow! Curiosity is a superpower. 🐷✨" }])
      return
    }
    setInput('')
    const next: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setLoading(true)
    setUsedToday(incrementDailyUsage())

    try {
      const res  = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, lessonTitle, currentStop, allStops: stops, history: next.slice(-6) }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.reply ?? 'Sorry, I couldn\'t get a response.' }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Can\'t reach PAI right now — try again in a moment!' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.3)' }} />

      {/* Vertical chat panel — bottom-right */}
      <div style={{
        position:      'fixed',
        bottom:        24,
        right:         24,
        zIndex:        51,
        width:         380,
        maxWidth:      'calc(100vw - 32px)',
        height:        560,
        maxHeight:     'calc(100vh - 48px)',
        display:       'flex',
        flexDirection: 'column',
        background:    BLACK,
        border:        `2px solid ${GREEN}`,
        boxShadow:     `8px 8px 0 0 ${GREEN}44`,
        animation:     'chatPopIn 0.22s cubic-bezier(0.34,1.4,0.64,1)',
      }}>

        {/* PAI dancing header */}
        <div style={{
          background:    '#111',
          borderBottom:  `1px solid #1e1e1e`,
          padding:       '16px 16px 0',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          flexShrink:    0,
        }}>
          <video
            src="/pig.mp4"
            autoPlay loop muted playsInline
            style={{ width: 72, height: 72, objectFit: 'contain' }}
          />
          <div style={{ textAlign: 'center', paddingBottom: 12 }}>
            <div style={{ fontFamily: DISP, fontSize: 16, letterSpacing: '-0.01em', color: GREEN, lineHeight: 1 }}>PAI</div>
            <div style={{ fontFamily: BODY, fontSize: 11, color: DIM, marginTop: 2 }}>{lessonTitle}</div>
          </div>

          {/* Close + counter row */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1e1e1e', padding: '8px 0' }}>
            <span style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: remaining > 5 ? '#333' : '#C0392B' }}>
              {remaining} questions left today
            </span>
            <button
              onClick={onClose}
              style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none', border: '1px solid #2a2a2a', color: '#444', padding: '4px 10px', cursor: 'pointer' }}
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start', gap: 4 }}>
              {m.role === 'assistant' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 2 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>🐷</div>
                  <span style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: GREEN }}>PAI</span>
                </div>
              )}
              <div style={{
                maxWidth:   '88%',
                padding:    '10px 13px',
                fontFamily: BODY,
                fontSize:   13,
                lineHeight: 1.55,
                color:      m.role === 'user' ? BLACK : '#e0e0e0',
                background: m.role === 'user' ? GREEN : '#161616',
                border:     m.role === 'user' ? 'none' : '1px solid #222',
                borderRadius: m.role === 'user'
                  ? '12px 12px 2px 12px'
                  : '2px 12px 12px 12px',
              }}>
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 2 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>🐷</div>
                <span style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: GREEN }}>PAI</span>
              </div>
              <div style={{ padding: '10px 14px', background: '#161616', border: '1px solid #222', borderRadius: '2px 12px 12px 12px' }}>
                <span style={{ display: 'inline-flex', gap: 3 }}>
                  {[0,1,2].map(i => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, display: 'inline-block', animation: `dotBounce 1.2s ${i * 0.2}s infinite` }} />
                  ))}
                </span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '10px 12px 14px', borderTop: '1px solid #1a1a1a', display: 'flex', gap: 8, flexShrink: 0 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask PAI something..."
            style={{
              flex:        1,
              fontFamily:  BODY,
              fontSize:    13,
              background:  '#111',
              border:      `1px solid #2a2a2a`,
              borderRadius: 8,
              color:       '#fff',
              padding:     '9px 12px',
              outline:     'none',
            }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            style={{
              fontFamily:   DISP,
              fontSize:     10,
              letterSpacing:'0.1em',
              textTransform:'uppercase',
              background:   input.trim() && !loading ? GREEN : '#1a1a1a',
              color:        input.trim() && !loading ? BLACK : '#333',
              border:       'none',
              borderRadius: 8,
              padding:      '9px 14px',
              cursor:       input.trim() && !loading ? 'pointer' : 'default',
              flexShrink:   0,
              transition:   'background 0.15s',
            }}
          >
            →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes chatPopIn {
          from { transform: scale(0.85) translateY(20px); opacity: 0; transform-origin: bottom right; }
          to   { transform: scale(1) translateY(0);       opacity: 1; transform-origin: bottom right; }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%            { transform: translateY(-5px); opacity: 1;   }
        }
      `}</style>
    </>
  )
}
