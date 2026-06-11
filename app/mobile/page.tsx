export default function MobilePreview() {
  const shell: React.CSSProperties = {
    minHeight: '100vh',
    background: '#e8e8e8',
    backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)',
    backgroundSize: '22px 22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0',
  }

  const device: React.CSSProperties = {
    position: 'relative',
    width: 390,
    height: 'min(844px, calc(100vh - 40px))',
    background: 'linear-gradient(165deg, #2c2c2c 0%, #101010 60%, #0a0a0a 100%)',
    borderRadius: 52,
    boxShadow: [
      '0 70px 140px rgba(0,0,0,0.45)',
      '0 20px 50px rgba(0,0,0,0.25)',
      '0 0 0 1.5px rgba(255,255,255,0.13)',
      'inset 0 1px 0 rgba(255,255,255,0.08)',
    ].join(', '),
    flexShrink: 0,
    overflow: 'hidden',
  }

  const screen: React.CSSProperties = {
    position: 'absolute',
    top: 6, left: 6, right: 6, bottom: 6,
    borderRadius: 46,
    background: '#000',
    overflow: 'hidden',
  }

  const btn: React.CSSProperties = {
    position: 'absolute', background: '#1e1e1e',
    boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.06)',
  }

  return (
    <div style={shell}>
      <div style={device}>
        {/* Volume / silent buttons */}
        <div style={{ ...btn, left: -3, top: 130, width: 3, height: 26, borderRadius: '2px 0 0 2px' }} />
        <div style={{ ...btn, left: -3, top: 172, width: 3, height: 62, borderRadius: '2px 0 0 2px' }} />
        <div style={{ ...btn, left: -3, top: 244, width: 3, height: 62, borderRadius: '2px 0 0 2px' }} />
        {/* Power */}
        <div style={{ ...btn, right: -3, top: 192, width: 3, height: 82, borderRadius: '0 2px 2px 0', boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.06)' }} />

        <div style={screen}>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
            width: 126, height: 34, background: '#000', borderRadius: 22, zIndex: 10, pointerEvents: 'none',
          }} />

          {/* The real app — identical to what a phone user sees */}
          <iframe
            src="/"
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            title="PAI mobile preview"
          />

          {/* Home indicator */}
          <div style={{
            position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
            width: 134, height: 5, background: 'rgba(0,0,0,0.18)', borderRadius: 3,
            zIndex: 10, pointerEvents: 'none',
          }} />
        </div>
      </div>
    </div>
  )
}
