'use client'

export default function OfflinePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F0FDFA',
        padding: '24px',
        textAlign: 'center',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0D9488, #22D3EE)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          fontSize: 32,
        }}
      >
        ⚡
      </div>

      <h1
        style={{
          fontSize: '1.625rem',
          fontWeight: 900,
          color: '#0F172A',
          marginBottom: 10,
          letterSpacing: '-0.02em',
        }}
      >
        You&apos;re offline
      </h1>

      <p
        style={{
          fontSize: '0.9375rem',
          color: '#64748B',
          lineHeight: 1.65,
          maxWidth: 340,
          marginBottom: 32,
        }}
      >
        Check your connection and try again. Lessons you&apos;ve already visited are available in your cache.
      </p>

      <button
        onClick={() => window.location.reload()}
        style={{
          padding: '12px 28px',
          borderRadius: 12,
          background: '#0F172A',
          color: '#FFFFFF',
          border: 'none',
          fontSize: '0.875rem',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
        }}
      >
        Try again
      </button>
    </main>
  )
}
