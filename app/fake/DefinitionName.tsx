'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

const BLACK = '#0a0a0a'
const GREEN = '#3DF542'
const DIM   = '#555555'

const DEFS: Record<string, string> = {
  'Aristotle': 'Ancient Greek philosopher (384–322 BC). The first to try to write down the rules of logical reasoning itself.',
}

const POP_W      = 260
const WRAPPER_ID = 'fk-zoom-wrapper'
const SCALE_FULL = 1.06
const SCALE_OPEN = 0.88
const ZOOM_DUR   = 320

type Pos = { left: number; top: number; caretX: number; caretY: number; above: boolean }

function computePos(rect: DOMRect): Pos {
  const vw = window.innerWidth
  const vh = window.innerHeight

  // Sit just to the left of the word's shifted position
  let left = rect.left - POP_W - 14
  if (left < 8) left = 8

  // Vertically center on the word
  const midY = rect.top + rect.height / 2
  let top = midY - 48
  if (top < 8) top = 8
  if (top + 120 > vh) top = vh - 120

  const caretY = midY - top

  return { left, top, caretX: 0, caretY, above: false }
}

export default function DefinitionName({ children }: { children: string }) {
  const [open,    setOpen]    = useState(false)
  const [closing, setClosing] = useState(false)
  const [pos,     setPos]     = useState<Pos | null>(null)
  const btnRef                = useRef<HTMLButtonElement>(null)
  const closeTimer            = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openTimer             = useRef<ReturnType<typeof setTimeout> | null>(null)

  const POPUP_DUR = 0.5

  const setWrapperScale = (scale: number, shiftRight = false) => {
    const w = document.getElementById(WRAPPER_ID) as HTMLElement | null
    if (!w) return
    w.style.transition = `transform ${ZOOM_DUR}ms ease`
    // shiftRight pushes content away from the left popup
    w.style.transform  = shiftRight
      ? `scale(${scale}) translateX(160px)`
      : `scale(${scale})`
  }

  const close = useCallback(() => {
    setClosing(true)
    setWrapperScale(SCALE_FULL)
    closeTimer.current = setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, POPUP_DUR * 1000)
  }, [])

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    if (openTimer.current)  clearTimeout(openTimer.current)
  }, [])

  useEffect(() => {
    if (!open) return
    const click = (e: MouseEvent) => {
      if (!btnRef.current?.contains(e.target as Node)) close()
    }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('click', click)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('click', click)
      document.removeEventListener('keydown', esc)
    }
  }, [open, close])

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (open) { close(); return }
    if (closeTimer.current) clearTimeout(closeTimer.current)

    setWrapperScale(SCALE_OPEN, true)

    // Read position after zoom settles
    openTimer.current = setTimeout(() => {
      if (btnRef.current) setPos(computePos(btnRef.current.getBoundingClientRect()))
      setOpen(true)
      setClosing(false)
    }, ZOOM_DUR)
  }

  const def = DEFS[children]

  return (
    <>
      <button
        ref={btnRef}
        onClick={toggle}
        aria-expanded={open && !closing}
        style={{
          background: 'none', border: 'none', padding: 0, margin: 0,
          font: 'inherit', cursor: 'pointer', display: 'inline',
          fontFamily: 'var(--fk-display)', fontWeight: 400, color: BLACK,
          textDecoration: 'underline',
          textDecorationColor: GREEN,
          textDecorationStyle: (open && !closing) ? 'dotted' : 'solid',
          textDecorationThickness: '2px',
          textUnderlineOffset: '3px',
        }}
      >
        {children}
      </button>

      {open && pos && def && createPortal(
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'fixed',
            left: pos.left,
            ...(pos.above
              ? { bottom: window.innerHeight - pos.top }
              : { top: pos.top }),
            width: POP_W,
            zIndex: 9999,
            background: '#ffffff',
            border: `1.5px solid ${BLACK}`,
            boxShadow: `4px 4px 0 0 ${BLACK}`,
            padding: '12px 14px',
            transformOrigin: 'top center',
            animation: closing
              ? `fkShrink ${POPUP_DUR}s cubic-bezier(0.34,1.2,0.64,1) forwards`
              : `fkGrow   ${POPUP_DUR}s cubic-bezier(0.34,1.2,0.64,1)`,
          }}
        >
          {/* Right-pointing caret — popup is to the far left */}
          <div style={{ position: 'absolute', right: -9, top: pos.caretY - 7 }}>
            <div style={{ width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: `9px solid ${BLACK}` }} />
            <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '8px solid #ffffff', position: 'absolute', top: -5, right: 2 }} />
          </div>

          <div style={{ fontFamily: 'var(--fk-display)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: BLACK, paddingBottom: 6, marginBottom: 6, borderBottom: '1px solid #e0e0e0' }}>
            {children}
          </div>
          <div style={{ fontFamily: 'var(--fk-body)', fontSize: 13, color: DIM, lineHeight: 1.55 }}>
            {def}
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @keyframes fkGrow   { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
        @keyframes fkShrink { from { opacity:1; transform:scale(1); } to { opacity:0; transform:scale(0.85); } }
      `}</style>
    </>
  )
}
