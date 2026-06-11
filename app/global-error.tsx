'use client'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: 32, background: '#fff' }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>Something went wrong</h2>
        <pre style={{ background: '#f5f5f5', padding: 16, fontSize: 12, overflow: 'auto', marginBottom: 16, whiteSpace: 'pre-wrap' }}>
          {error?.message}
          {'\n'}
          {error?.stack}
          {'\n'}
          digest: {error?.digest}
        </pre>
        <button onClick={reset} style={{ padding: '8px 16px', cursor: 'pointer' }}>Try again</button>
      </body>
    </html>
  )
}
