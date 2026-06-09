export const metadata = {
  title: 'PAI — Learn AI',
  description: 'Your personal AI learning buddy',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100svh',
      background: '#e8e8e8',
      backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)',
      backgroundSize: '22px 22px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 0',
    }}>

      {/* Phone shell */}
      <div style={{
        position: 'relative',
        width: 390,
        height: 'min(844px, calc(100svh - 40px))',
        background: 'linear-gradient(165deg, #2c2c2c 0%, #101010 60%, #0a0a0a 100%)',
        borderRadius: 52,
        boxShadow: [
          '0 70px 140px rgba(0,0,0,0.45)',
          '0 20px 50px rgba(0,0,0,0.25)',
          '0 0 0 1.5px rgba(255,255,255,0.13)',
          'inset 0 1px 0 rgba(255,255,255,0.08)',
        ].join(', '),
        flexShrink: 0,
      }}>

        {/* Silent / volume buttons */}
        <div style={{ position: 'absolute', left: -3, top: 130, width: 3, height: 26, background: '#1e1e1e', borderRadius: '2px 0 0 2px', boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', left: -3, top: 172, width: 3, height: 62, background: '#1e1e1e', borderRadius: '2px 0 0 2px', boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', left: -3, top: 244, width: 3, height: 62, background: '#1e1e1e', borderRadius: '2px 0 0 2px', boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.06)' }} />
        {/* Power button */}
        <div style={{ position: 'absolute', right: -3, top: 192, width: 3, height: 82, background: '#1e1e1e', borderRadius: '0 2px 2px 0', boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.06)' }} />

        {/* Screen area */}
        <div style={{
          position: 'absolute',
          top: 6, left: 6, right: 6, bottom: 6,
          borderRadius: 46,
          background: '#fff',
          overflow: 'hidden',
        }}>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 126,
            height: 34,
            background: '#000',
            borderRadius: 22,
            zIndex: 20,
            pointerEvents: 'none',
          }} />

          {/* Scrollable content — fills screen, clips at edges */}
          <div style={{
            position: 'absolute',
            inset: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}>
            {children}
          </div>

          {/* Home indicator */}
          <div style={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 134,
            height: 5,
            background: 'rgba(0,0,0,0.18)',
            borderRadius: 3,
            zIndex: 20,
            pointerEvents: 'none',
          }} />
        </div>
      </div>
    </div>
  )
}
