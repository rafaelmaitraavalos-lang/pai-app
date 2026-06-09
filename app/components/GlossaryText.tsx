'use client'

import { useState, useRef, useEffect, useCallback, Fragment } from 'react'
import { createPortal } from 'react-dom'
import { glossary } from '../data/glossary'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Segment =
  | { type: 'text'; value: string }
  | { type: 'term'; key: string; id: string }

type PopPos = { left: number; top: number; caretY: number }

// ─────────────────────────────────────────────────────────────────────────────
// Constants — mirrors DefinitionName.tsx
// ─────────────────────────────────────────────────────────────────────────────

const BLACK      = '#0a0a0a'
const DIM        = '#555555'
const GREEN      = '#3DF542'
const POP_W      = 240
const POP_H_EST  = 96
const SCALE_FULL = 1.06
const SCALE_OPEN = 0.88
const ZOOM_DUR   = 320
const POPUP_DUR  = 0.5
const WRAPPER_ID = 'lesson-content-wrapper'

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function parseBody(text: string): Segment[] {
  const out: Segment[] = []
  const re = /\{\{([^}]+)\}\}/g
  let last = 0; let n = 0; let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push({ type: 'text', value: text.slice(last, m.index) })
    out.push({ type: 'term', key: m[1], id: `${m[1]}-${n++}` })
    last = m.index + m[0].length
  }
  if (last < text.length) out.push({ type: 'text', value: text.slice(last) })
  return out
}

function computePos(rect: DOMRect): PopPos {
  // Inside phone frame: coordinates must be relative to the phone screen container
  const phoneScreen = document.getElementById('mobile-phone-screen')
  if (phoneScreen) {
    const cr = phoneScreen.getBoundingClientRect()
    const midY = (rect.top - cr.top) + rect.height / 2
    let top = midY - POP_H_EST / 2
    if (top < 8) top = 8
    if (top + 120 > cr.height) top = cr.height - 120
    return { left: 20, top, caretY: midY - top }
  }
  // Desktop: viewport-relative
  const midY = rect.top + rect.height / 2
  let top = midY - POP_H_EST / 2
  if (top < 8) top = 8
  if (top + 120 > window.innerHeight) top = window.innerHeight - 120
  return { left: 20, top, caretY: midY - top }
}

function defBody(def: string): string {
  const idx = def.indexOf(' — ')
  return idx > -1 ? def.slice(idx + 3) : def
}

function setWrapperShift(shiftRight = false) {
  const col = document.getElementById('lesson-text-col') as HTMLElement | null
  if (!col) return
  col.style.transform = shiftRight ? 'translateX(200px)' : 'translateX(0)'
}

// ─────────────────────────────────────────────────────────────────────────────
// Popover — identical visual style to fake/DefinitionName
// ─────────────────────────────────────────────────────────────────────────────

function Popover({
  label, def, pos, onClose, closing,
}: {
  label: string; def: string; pos: PopPos; onClose: () => void; closing: boolean
}) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [onClose])

  const body = defBody(def)

  const portalTarget = document.getElementById('mobile-phone-screen') ?? document.body

  return createPortal(
    <div
      onClick={e => e.stopPropagation()}
      style={{
        position: 'fixed',
        left: pos.left,
        top: pos.top,
        width: POP_W,
        zIndex: 9999,
        background: '#ffffff',
        border: `1.5px solid ${BLACK}`,
        boxShadow: `4px 4px 0 0 ${BLACK}`,
        padding: '12px 14px',
        transformOrigin: 'right center',
        animation: closing
          ? `defShrink ${POPUP_DUR}s cubic-bezier(0.34,1.2,0.64,1) forwards`
          : `defGrow   ${POPUP_DUR}s cubic-bezier(0.34,1.2,0.64,1)`,
      }}
    >
      {/* Right-pointing caret — popup is to the left of the word */}
      <div style={{ position: 'absolute', right: -9, top: pos.caretY - 7 }}>
        <div style={{ width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: `9px solid ${BLACK}` }} />
        <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '8px solid #ffffff', position: 'absolute', top: -5, right: 2 }} />
      </div>

      {/* Term label — Archivo Black */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 10,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: BLACK,
        paddingBottom: 6,
        marginBottom: 6,
        borderBottom: '1px solid #e0e0e0',
      }}>
        {label}
      </div>

      {/* Definition — Inter */}
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: DIM, lineHeight: 1.55 }}>
        {body}
      </div>
    </div>,
    portalTarget
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// GlossaryTerm — mirrors DefinitionName behavior
// ─────────────────────────────────────────────────────────────────────────────

function GlossaryTerm({
  termKey, isOpen, onOpen, onClose,
}: {
  termKey: string
  instanceId: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}) {
  const btnRef     = useRef<HTMLButtonElement>(null)
  const [pos,      setPos]     = useState<PopPos | null>(null)
  const [closing,  setClosing] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)

  const entry = glossary[termKey]

  useEffect(() => {
    if (!entry && process.env.NODE_ENV !== 'production') {
      console.warn(`[GlossaryText] Unknown term key: "${termKey}"`)
    }
  }, [entry, termKey])

  const close = useCallback(() => {
    setWrapperShift(false)
    onClose()
    setClosing(false)
  }, [onClose])

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    if (openTimer.current)  clearTimeout(openTimer.current)
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (!btnRef.current?.contains(e.target as Node)) close()
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [isOpen, close])

  const toggle = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation()
    if (isOpen) { close(); return }
    if (closeTimer.current) clearTimeout(closeTimer.current)

    setWrapperShift(true)
    if (btnRef.current) setPos(computePos(btnRef.current.getBoundingClientRect()))
    onOpen()
    setClosing(false)
  }, [isOpen, close, onOpen])

  if (!entry) return <span>{termKey}</span>

  return (
    <>
      <button
        ref={btnRef}
        onClick={toggle}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(e) } }}
        aria-label={`Definition of ${entry.label}`}
        aria-expanded={isOpen && !closing}
        style={{
          background: 'none', border: 'none', padding: 0, margin: 0,
          font: 'inherit', fontSize: 'inherit', lineHeight: 'inherit',
          fontFamily: 'var(--font-display)',
          color: BLACK,
          textDecorationLine: 'underline',
          textDecorationStyle: (isOpen && !closing) ? 'dotted' : 'solid',
          textDecorationColor: GREEN,
          textDecorationThickness: '2px',
          textUnderlineOffset: '3px',
          cursor: 'pointer',
          display: 'inline',
        }}
      >
        {entry.label}
      </button>

      {isOpen && pos && (
        <Popover
          label={entry.label}
          def={entry.def}
          pos={pos}
          onClose={close}
          closing={closing}
        />
      )}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// GlossaryText — drop-in <p> replacement with glossary support
// ─────────────────────────────────────────────────────────────────────────────

export default function GlossaryText({
  text, className, style,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
}) {
  const [openId, setOpenId] = useState<string | null>(null)
  const segments = parseBody(text)
  const close = useCallback(() => setOpenId(null), [])

  return (
    <p className={className} style={style}>
      {segments.map((seg, i) =>
        seg.type === 'text'
          ? <Fragment key={i}>{seg.value}</Fragment>
          : <GlossaryTerm
              key={seg.id}
              termKey={seg.key}
              instanceId={seg.id}
              isOpen={openId === seg.id}
              onOpen={() => setOpenId(seg.id)}
              onClose={close}
            />
      )}
    </p>
  )
}
