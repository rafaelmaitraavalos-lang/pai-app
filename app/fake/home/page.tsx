'use client'

// /fake/home — uses real WORLDS data so module names always match the app.

import { useState } from 'react'
import { WORLDS, WORLD_IDS } from '../../data'
import { getSlideTitles } from '../../data/slideIndex'

const DISP  = 'var(--fk-display)'
const BODY  = 'var(--fk-body)'
const ACC   = 'var(--fake-accent)'
const GREEN = '#3DF542'
const DIM   = '#555555'
const FAINT = '#d8d8d8'
const BLACK = '#0a0a0a'

function ModuleBox({ m, expanded, onToggle, isFirst }: {
  m: { id: number; title: string }
  expanded: boolean
  onToggle: () => void
  isFirst: boolean
}) {
  const slides = getSlideTitles(m.id)

  return (
    <div style={{ marginBottom: 10 }}>
      {/* Module header */}
      <div onClick={onToggle} style={{ display: 'flex', alignItems: 'center', padding: '15px 16px', background: '#EBEBEB', border: `1.5px solid ${BLACK}`, boxShadow: `6px 6px 0 0 ${BLACK}`, cursor: 'pointer', userSelect: 'none' }}>
        <span style={{ fontFamily: BODY, fontSize: 12, color: DIM, width: 32, flexShrink: 0 }}>
          {String(m.id).padStart(2, '0')}
        </span>
        <span style={{ fontFamily: DISP, fontSize: 17, letterSpacing: '-0.01em', flex: 1, color: BLACK }}>{m.title}</span>
        {isFirst && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 14 }}>
            <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 0 3px ${GREEN}44` }} />
            In Progress
          </span>
        )}
        <span style={{ fontFamily: DISP, fontSize: 18, color: BLACK, lineHeight: 1, transition: 'transform 0.55s cubic-bezier(0.34, 1.2, 0.64, 1)', transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}>+</span>
      </div>

      {/* Slide list — smooth unfurl */}
      <div style={{
        display: 'grid',
        gridTemplateRows: expanded ? '1fr' : '0fr',
        transition: 'grid-template-rows 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), margin-top 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        marginTop: expanded ? 14 : 0,
      }}>
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div style={{ paddingBottom: 8, marginLeft: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 20, paddingRight: 6 }}>
              {slides.map((title, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '9px 12px', background: '#EBEBEB', border: `1.5px solid ${BLACK}`, boxShadow: `3px 3px 0 0 ${BLACK}`, cursor: 'pointer', animation: expanded ? `fkSlideItem 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.04}s both` : 'none' }}>
                  <span style={{ fontFamily: BODY, fontSize: 11, color: FAINT, width: 20, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontFamily: BODY, fontSize: 14, color: DIM, flex: 1 }}>{title}</span>
                  {isFirst && i === 0 && <span style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: GREEN }}>Current</span>}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#EBEBEB', color: BLACK, padding: '10px 22px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: `4px 4px 0 0 ${BLACK}` }}>
                {isFirst ? 'Resume →' : 'Start →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FakeHome() {
  const [expanded, setExpanded] = useState<string | null>('1')

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '0 7vw 80px', paddingRight: 'calc(7vw + 12px)' }}>

      {/* Contents label */}
      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>Contents</span>
        <div style={{ flex: 1, borderTop: `1px solid ${FAINT}` }} />
      </div>

      {/* One section per world */}
      {WORLD_IDS.map(wid => {
        const world = WORLDS[wid]
        return (
          <section key={wid} style={{ marginTop: 24, paddingLeft: 24 }}>

            {/* World label — plain, no box */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16 }}>
              <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: ACC }}>
                W{String(wid).padStart(2, '0')}
              </span>
              <h2 style={{ fontFamily: DISP, fontSize: 28, letterSpacing: '-0.02em', lineHeight: 1, margin: 0, fontWeight: 400 }}>
                {world.title}
              </h2>
              <span style={{ fontFamily: BODY, fontSize: 13, color: DIM }}>{world.level}</span>
            </div>

            {world.modules.map((m, i) => (
              <ModuleBox
                key={m.id}
                m={m}
                isFirst={wid === 1 && i === 0}
                expanded={expanded === String(m.id)}
                onToggle={() => setExpanded(expanded === String(m.id) ? null : String(m.id))}
              />
            ))}
          </section>
        )
      })}

      {/* Footer */}
      <div style={{ marginTop: 72, borderTop: `2px solid ${BLACK}`, paddingTop: 20 }}>
        <div style={{ fontFamily: BODY, fontSize: 13, color: DIM, display: 'flex', justifyContent: 'space-between' }}>
          <span>PAI — AI Literacy</span>
          <span>Jun 2026</span>
        </div>
      </div>
    </main>
  )
}
