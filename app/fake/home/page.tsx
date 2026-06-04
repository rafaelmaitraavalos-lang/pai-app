'use client'

// /fake/home — editorial world map. Hearth Design Kit.
// Isolated. No shared components or styles modified.

import { useState } from 'react'

const W1_MODULES = [
  {
    n: '01', title: 'History of AI', active: true,
    slides: ['Before Computers', 'Ada Lovelace', 'The Turing Test', 'The Birth of AI', 'The AI Winters', 'Deep Blue', 'Everything Changes', 'You Are In It'],
  },
  {
    n: '02', title: 'What AI Does', active: false,
    slides: ['The Magic Trick', 'How You Learned', 'Show It Enough Cats', 'Garbage In', 'No One Is Home', 'Why It Feels Like Magic', 'Where It Breaks', 'The Mirror'],
  },
  {
    n: '03', title: 'AI In Your Life', active: false,
    slides: ['Already Everywhere', 'The Feed', 'Search Is Sorted', 'Face in the Crowd', 'The Resume Filter', 'Your Doctor Uses It', 'The Map Decides', 'The Invisible Layer'],
  },
  {
    n: '04', title: 'Narrow vs General AI', active: false,
    slides: ['One Trick Ponies', 'Deep Blue Again', 'The Spectrum', 'ChatGPT Is Still Narrow', 'Why This Matters', 'The AGI Question', 'What We Can Measure', 'Where We Actually Are'],
  },
  {
    n: '05', title: 'How AI Learns', active: false,
    slides: ['It Was Not Programmed', 'Supervised Learning', 'Unsupervised Learning', 'The Training Data Problem', 'Reinforcement Learning', 'It Never Stops Being Wrong', 'Who Does The Real Work', 'Learning Without Understanding'],
  },
  {
    n: '06', title: 'What AI Gets Wrong', active: false,
    slides: ['Confident and Wrong', 'The Hallucination Problem', 'Bias Is Baked In', 'The Edge Case', 'When Context Disappears', 'The Accountability Gap', 'Failure At Scale', 'Why We Deploy Anyway'],
  },
  {
    n: '07', title: 'What Is AI?', active: false,
    slides: ['The Definitions Problem', 'The Turing Frame', 'What We Know It Does', 'What We Know It Is Not', 'The Question We Started With', 'Intelligence Without Understanding', 'The Moving Goalposts', 'Where That Leaves Us'],
  },
  {
    n: '08', title: 'AI and Society', active: false,
    slides: ['The Speed Problem', 'Jobs and Automation', 'Power and Access', 'The Surveillance Layer', 'Who Owns the Data', 'Democracy and Influence', 'The Governance Gap', 'What Comes Next'],
  },
]

const LOCKED_WORLDS = [
  { n: '02', title: 'How AI Works',         desc: 'Neural networks, training data, and why the math actually works.' },
  { n: '03', title: 'AI in the Real World', desc: 'Healthcare, hiring, surveillance. Where AI decisions affect real people.' },
  { n: '04', title: 'Bias and Fairness',    desc: 'Who gets hurt when the model is wrong, and why it keeps happening.' },
  { n: '05', title: 'How to Read AI Hype',  desc: 'Pattern recognition for the next wave. Dartmouth is always happening somewhere.' },
]

const DISP  = 'var(--fk-display)'
const BODY  = 'var(--fk-body)'
const ACC   = 'var(--fake-accent)'
const GREEN = '#3DF542'
const DIM   = '#555555'
const FAINT = '#d8d8d8'
const BLACK = '#0a0a0a'

function ModuleBox({ m, expanded, onToggle }: {
  m: typeof W1_MODULES[0]
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      {/* Module header — hard shadow */}
      <div
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center',
          padding: '15px 16px',
          background: '#EBEBEB',
          border: `1.5px solid ${BLACK}`,
          boxShadow: `6px 6px 0 0 ${BLACK}`,
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span style={{ fontFamily: BODY, fontSize: 12, color: DIM, width: 32, flexShrink: 0 }}>{m.n}</span>
        <span style={{ fontFamily: DISP, fontSize: 17, letterSpacing: '-0.01em', flex: 1, color: BLACK }}>{m.title}</span>
        {m.active && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 14 }}>
            <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 0 3px ${GREEN}44` }} />
            In Progress
          </span>
        )}
        <span style={{ fontFamily: DISP, fontSize: 18, color: BLACK, lineHeight: 1, transition: 'transform 0.55s cubic-bezier(0.34, 1.2, 0.64, 1)', transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}>+</span>
      </div>

      {/* Smooth height transition — always in DOM, slides modules below down */}
      <div style={{
        display: 'grid',
        gridTemplateRows: expanded ? '1fr' : '0fr',
        transition: 'grid-template-rows 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), margin-top 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        marginTop: expanded ? 14 : 0,
      }}>
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div style={{ paddingBottom: 8, marginLeft: 24 }}>

            {/* Slide sub-boxes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 20, paddingRight: 8 }}>
              {m.slides.map((slide, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '9px 12px', background: '#EBEBEB', border: `1.5px solid ${BLACK}`, boxShadow: `3px 3px 0 0 ${BLACK}`, cursor: 'pointer', animation: expanded ? `fkSlideItem 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.045}s both` : 'none' }}>
                  <span style={{ fontFamily: BODY, fontSize: 11, color: FAINT, width: 20, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontFamily: BODY, fontSize: 14, color: m.active && i === 0 ? BLACK : DIM, flex: 1 }}>{slide}</span>
                  {m.active && i === 0 && <span style={{ fontFamily: DISP, fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: GREEN }}>Current</span>}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#EBEBEB', color: BLACK, padding: '10px 22px', border: `1.5px solid ${BLACK}`, cursor: 'pointer', boxShadow: `4px 4px 0 0 ${BLACK}` }}>
                {m.active ? 'Resume →' : 'Start →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FakeHome() {
  const [expanded, setExpanded] = useState<string | null>('01')

  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: '0 7vw 80px', paddingRight: 'calc(7vw + 12px)' }}>

      {/* ── Contents label ────────────────────────────────────────────── */}
      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: DIM }}>Contents</span>
        <div style={{ flex: 1, borderTop: `1px solid ${FAINT}` }} />
      </div>

      {/* ── World 1 — plain label, then module boxes ──────────────────── */}
      <section style={{ marginTop: 24, paddingLeft: 24 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16 }}>
          <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: ACC }}>W01</span>
          <h2 style={{ fontFamily: DISP, fontSize: 30, letterSpacing: '-0.02em', lineHeight: 1, margin: 0, fontWeight: 400 }}>What Is AI?</h2>
          <span style={{ fontFamily: BODY, fontSize: 13, color: DIM }}>8 modules · Beginner</span>
        </div>

        {W1_MODULES.map((m) => (
          <ModuleBox
            key={m.n}
            m={m}
            expanded={expanded === m.n}
            onToggle={() => setExpanded(expanded === m.n ? null : m.n)}
          />
        ))}
      </section>

      {/* ── Locked worlds ─────────────────────────────────────────────── */}
      {LOCKED_WORLDS.map((w) => (
        <section key={w.n} style={{ marginTop: 44 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
            <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: FAINT }}>W{w.n}</span>
            <h2 style={{ fontFamily: DISP, fontSize: 26, letterSpacing: '-0.02em', lineHeight: 1, margin: 0, fontWeight: 400, color: FAINT }}>{w.title}</h2>
            <span style={{ fontFamily: DISP, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: FAINT, border: `1px solid ${FAINT}`, padding: '2px 7px', alignSelf: 'center' }}>Locked</span>
          </div>
          <div style={{ borderTop: `1px solid ${FAINT}` }} />
          <p style={{ fontFamily: BODY, fontSize: 14, color: FAINT, margin: '12px 0 0', lineHeight: 1.6, maxWidth: '60ch' }}>{w.desc}</p>
        </section>
      ))}

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <div style={{ marginTop: 72, borderTop: `2px solid ${BLACK}`, paddingTop: 20 }}>
        <div style={{ fontFamily: BODY, fontSize: 13, color: DIM, display: 'flex', justifyContent: 'space-between' }}>
          <span>PAI — AI Literacy</span>
          <span>Issue 001 · Jun 2026</span>
        </div>
      </div>
    </main>
  )
}
