'use client'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#050505', color: '#ededed', fontFamily: 'system-ui, sans-serif', margin: 0 }}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem' }}>
          <div style={{ maxWidth: '28rem', width: '100%' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>☢️</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Critical System Failure
            </h2>
            <p style={{ color: '#a3a3a3', fontFamily: 'monospace', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              [FATAL] {error.message || "Shelter systems offline. All personnel evacuate."}
            </p>
            <button
              onClick={reset}
              style={{
                backgroundColor: '#39ff14', color: '#000', border: 'none', padding: '0.75rem 2rem',
                fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer',
                fontSize: '1rem', width: '100%',
              }}
            >
              EMERGENCY RESTART
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
