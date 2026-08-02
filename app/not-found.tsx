import Link from 'next/link'

// Bilingual by design (like the welcome screen): a 404 renders before any
// client code can know the student's language, and the default Next.js page
// was English-only with no way back — adversarial review finding 9a.
export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', background: '#F5F5F5', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: 24,
      fontFamily: "var(--font-body, system-ui, sans-serif)",
    }}>
      <div style={{
        background: '#fff', border: '1.5px solid #0a0a0a',
        boxShadow: '8px 8px 0 0 #0a0a0a', padding: '40px 32px',
        maxWidth: 420, width: '100%', textAlign: 'center',
      }}>
        <div style={{ fontFamily: "var(--font-display, 'Arial Black', sans-serif)", fontSize: 48, color: '#3DF542', letterSpacing: '-0.03em' }}>PAI</div>
        <h1 style={{ fontFamily: "var(--font-display, 'Arial Black', sans-serif)", fontSize: 20, color: '#0a0a0a', margin: '18px 0 6px' }}>
          Page not found · Página não encontrada
        </h1>
        <p style={{ fontSize: 13, color: '#555', margin: '0 0 24px', lineHeight: 1.6 }}>
          This lesson or page doesn&apos;t exist.<br />Esta aula ou página não existe.
        </p>
        <Link href="/" style={{
          display: 'inline-block', background: '#0a0a0a', color: '#fff',
          fontFamily: "var(--font-display, 'Arial Black', sans-serif)",
          fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '13px 28px', textDecoration: 'none',
          boxShadow: '4px 4px 0 0 #555',
        }}>
          Go home · Voltar ao início
        </Link>
      </div>
    </div>
  )
}
