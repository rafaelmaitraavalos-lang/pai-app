// /fake/module — editorial lesson slide. Hearth Design Kit: Archivo Black display, Inter body.
// Isolated. No shared components or styles modified.

import Link from 'next/link'
import DefinitionName from '../DefinitionName'

const DISP  = 'var(--fk-display)'
const BODY  = 'var(--fk-body)'
const ACC   = 'var(--fake-accent)'
const GREEN = '#3DF542'
const DIM   = '#555555'
const FAINT = '#d8d8d8'
const BLACK = '#0a0a0a'

export default function FakeModule() {
  return (
    <main style={{ height: 'calc(100vh - 80px)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <div id="fk-zoom-wrapper" style={{ width: '100%', padding: '0 7vw', display: 'flex', flexDirection: 'column', gap: 0, transform: 'scale(1.06)', transformOrigin: 'center center', transition: 'transform 0.28s ease' }}>

        {/* ── Kicker bar ─────────────────────────────────────────────── */}
        <div>
          <div style={{ paddingBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            <div style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ color: ACC }}>Myth Bust</span>
              <span style={{ color: FAINT }}>·</span>
              <Link href="/fake/home" style={{ color: DIM, textDecoration: 'none', fontFamily: DISP }}>World 1</Link>
              <span style={{ color: FAINT }}>·</span>
              <span style={{ color: DIM }}>History of AI</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
              <span style={{ fontFamily: BODY, fontSize: 13, color: DIM }}>400 BC</span>
              <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM }}>1 / 8</span>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${BLACK}` }} />
        </div>

        {/* ── Two-column grid ────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 0, paddingTop: 44, paddingBottom: 32 }}>

          {/* Left: headline + body */}
          <div style={{ paddingRight: 52, borderRight: `1px solid ${FAINT}`, display: 'flex', flexDirection: 'column' }}>
            <h1 style={{
              fontFamily: DISP, fontWeight: 400,
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              lineHeight: 1, letterSpacing: '-0.03em',
              margin: '0 0 28px', color: BLACK,
              textShadow: `5px 5px 0 ${FAINT}`,
            }}>
              Before Computers
            </h1>

            <div style={{ borderTop: `1px solid ${FAINT}`, marginBottom: 24 }} />

            <p style={{ fontFamily: BODY, fontSize: 18, lineHeight: 1.65, color: BLACK, margin: '0 0 20px', maxWidth: '54ch', fontWeight: 400 }}>
              <DefinitionName>Aristotle</DefinitionName> spent his life trying to formalize logic: a set
              of rules where if you follow them correctly you always reach the right
              answer. He wasn't building a machine. He was asking whether reasoning
              itself could be mechanical.
            </p>

            <p style={{
              fontFamily: BODY, fontSize: 18, lineHeight: 1.65,
              color: BLACK, margin: 0, maxWidth: '54ch',
              borderLeft: `3px solid ${ACC}`,
              paddingLeft: 16,
            }}>
              That question is 2,500 years old. AI didn't start with computers.
              It started with that question.
            </p>
          </div>

          {/* Right: image + caption */}
          <div style={{ paddingLeft: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: '#f0edea', aspectRatio: '3/4', overflow: 'hidden', boxShadow: `10px 10px 0 0 ${BLACK}` }}>
              <img
                src="/images/w1m1/aristotle.png"
                alt="Aristotle"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />
            </div>
            <p style={{ fontFamily: BODY, fontSize: 12, color: DIM, margin: 0, lineHeight: 1.5 }}>
              <strong style={{ fontFamily: DISP, fontWeight: 400, color: BLACK }}>Aristotle</strong>, 384–322 BC. First to systematize
              formal logic as a discipline.
            </p>
          </div>
        </div>

        {/* ── Navigation ─────────────────────────────────────────────── */}
        <div style={{ borderTop: `2px solid ${BLACK}` }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, paddingBottom: 20, gap: 20 }}>
          <button className="fk-nav-btn" disabled>← Back</button>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} style={{ width: i === 0 ? 20 : 6, height: 6, borderRadius: 3, background: i === 0 ? BLACK : FAINT }} />
            ))}
          </div>
          <Link href="/fake/module" style={{
            fontFamily: DISP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
            textDecoration: 'none', background: '#EBEBEB', color: BLACK,
            padding: '10px 22px', display: 'inline-block', boxShadow: `4px 4px 0 0 ${BLACK}`,
          }}>
            Next slide →
          </Link>
        </div>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <div style={{ borderTop: `1px solid ${FAINT}`, paddingTop: 14, paddingBottom: 0, display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: BODY, fontSize: 13, color: DIM }}>World 1 · History of AI · Slide 1 of 8</span>
          <span style={{ fontFamily: DISP, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: DIM }}>2 Min Read</span>
        </div>

      </div>
    </main>
  )
}
