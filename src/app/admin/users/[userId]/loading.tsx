export default function UserDetailLoading() {
  const shimmer = {
    background: 'linear-gradient(90deg, #E2E8F0 25%, #EFF6FF 50%, #E2E8F0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: 8,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: 'var(--font-sans)' }}>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }`}</style>

      {/* Nav */}
      <div style={{ background: '#0F172A', height: 52 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 32px 80px' }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ ...shimmer, height: 14, width: 320 }} />
        </div>

        {/* Profile card */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '28px 32px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ ...shimmer, width: 64, height: 64, borderRadius: 16, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ ...shimmer, height: 22, width: 200, marginBottom: 10 }} />
            <div style={{ ...shimmer, height: 14, width: 280, marginBottom: 8 }} />
            <div style={{ display: 'flex', gap: 24 }}>
              <div style={{ ...shimmer, height: 12, width: 120 }} />
              <div style={{ ...shimmer, height: 12, width: 140 }} />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 24px' }}>
              <div style={{ ...shimmer, width: 32, height: 32, borderRadius: 9, marginBottom: 12 }} />
              <div style={{ ...shimmer, height: 28, width: 70, marginBottom: 8 }} />
              <div style={{ ...shimmer, height: 12, width: 100 }} />
            </div>
          ))}
        </div>

        {/* Progress card */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '24px', marginBottom: 20 }}>
          <div style={{ ...shimmer, height: 16, width: 160, marginBottom: 18 }} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ ...shimmer, height: 24, width: 80, borderRadius: 6 }} />
            ))}
          </div>
          <div style={{ ...shimmer, height: 12, width: 220, marginBottom: 12 }} />
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ ...shimmer, height: 22, width: 110, borderRadius: 5 }} />
            ))}
          </div>
        </div>

        {/* Assessment table */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ ...shimmer, height: 16, width: 180 }} />
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ padding: '14px 24px', borderBottom: i < 2 ? '1px solid #F1F5F9' : 'none', display: 'flex', gap: 32 }}>
              <div style={{ ...shimmer, height: 14, width: 100 }} />
              <div style={{ ...shimmer, height: 22, width: 80, borderRadius: 5 }} />
            </div>
          ))}
        </div>

        {/* Subscription + email side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20, marginBottom: 20 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '24px' }}>
            <div style={{ ...shimmer, height: 16, width: 120, marginBottom: 18 }} />
            <div style={{ ...shimmer, height: 24, width: 90, borderRadius: 6, marginBottom: 12 }} />
            <div style={{ ...shimmer, height: 14, width: 160 }} />
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ ...shimmer, height: 16, width: 140 }} />
            </div>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ padding: '12px 24px', borderBottom: i < 3 ? '1px solid #F1F5F9' : 'none', display: 'flex', gap: 32 }}>
                <div style={{ ...shimmer, height: 14, width: 80 }} />
                <div style={{ ...shimmer, height: 14, width: 40 }} />
                <div style={{ ...shimmer, height: 14, width: 60 }} />
                <div style={{ ...shimmer, height: 14, width: 90 }} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
