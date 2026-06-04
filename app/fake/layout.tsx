// Fake prototype layout — fully isolated. No shared styles modified.
// Uses Hearth Design Kit fonts (self-hosted, no Google Fonts call).

import Link from 'next/link'

export default function FakeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <style>{`
        /* ── Self-hosted fonts (Hearth Design Kit) ────────────────────── */
        @font-face {
          font-family: 'Archivo Black';
          src: url('/fonts/archivo-black-latin-ext.woff2') format('woff2');
          font-weight: 400;
          font-display: swap;
          unicode-range: U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF;
        }
        @font-face {
          font-family: 'Archivo Black';
          src: url('/fonts/archivo-black-latin.woff2') format('woff2');
          font-weight: 400;
          font-display: swap;
        }
        @font-face {
          font-family: 'Inter';
          src: url('/fonts/inter-var-latin-ext.woff2') format('woff2');
          font-weight: 100 900;
          font-display: swap;
          unicode-range: U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF;
        }
        @font-face {
          font-family: 'Inter';
          src: url('/fonts/inter-var-latin.woff2') format('woff2');
          font-weight: 100 900;
          font-display: swap;
        }

        /* ── Hearth tokens — scoped to fake routes only ───────────────── */
        :root {
          --fk-display: 'Archivo Black', 'Arial Black', sans-serif;
          --fk-body:    'Inter', system-ui, sans-serif;
          --fake-accent: #6B6B6B; /* locked to grey */
        }

        /* ── Scoped utility classes (all prefixed fk-) ────────────────── */
        .fk-row { transition: background 0.12s ease; cursor: pointer; }
        .fk-row:hover { background: #f5f3ee; }
        .fk-row:hover .fk-row-arrow { opacity: 1; transform: translateX(3px); }
        .fk-row-arrow { opacity: 0; transition: opacity 0.12s, transform 0.12s; }

        .fk-proto-link {
          opacity: 0.55; transition: opacity 0.12s;
          color: #fff; text-decoration: none;
          font-family: var(--fk-display);
          font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
        }
        .fk-proto-link:hover { opacity: 1; }

        .fk-nav-btn {
          background: none; border: 1.5px solid #0a0a0a; color: #0a0a0a;
          padding: 10px 22px;
          font-family: var(--fk-display); font-size: 11px;
          letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer; transition: all 0.12s;
          text-decoration: none; display: inline-block;
        }
        .fk-nav-btn:hover { background: #0a0a0a; color: #fff; }
        .fk-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .fk-nav-btn:disabled:hover { background: none; color: #0a0a0a; }

        @keyframes fkSlideItem {
          from { transform: translateY(-10px); }
          to   { transform: translateY(0); }
        }
        @keyframes fkExpandContainer {
          from { opacity: 0; transform: translateY(-6px) scaleY(0.96); transform-origin: top; }
          to   { opacity: 1; transform: translateY(0) scaleY(1); transform-origin: top; }
        }
      `}</style>

      {/* PAI header — same black bar as real app */}
      <div style={{ background: '#0a0a0a', padding: '8px 7vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--fk-display)', fontSize: 22, letterSpacing: '-0.02em', color: '#3DF542', lineHeight: 1 }}>PAI</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link href="/fake/home" className="fk-proto-link" style={{ opacity: 0.6, fontSize: 9, letterSpacing: '0.14em' }}>Home</Link>
          <Link href="/fake/module" className="fk-proto-link" style={{ opacity: 0.6, fontSize: 9, letterSpacing: '0.14em' }}>Module</Link>
          <span style={{ fontFamily: 'var(--fk-display)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3DF542', opacity: 0.5 }}>◆ Prototype</span>
        </div>
      </div>

      {children}
    </div>
  )
}
