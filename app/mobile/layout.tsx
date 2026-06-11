export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#111', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 430, minHeight: '100vh', position: 'relative', background: '#fff', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}
