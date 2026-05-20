export default function AdminLoading() {
  const shimmer = { background: 'linear-gradient(90deg, #1E293B 25%, #263548 50%, #1E293B 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: 8 }

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: 'var(--font-sans)' }}>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }`}</style>

      {/* Nav */}
      <div style={{ background: '#0F172A', height: 52 }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 32px 80px' }}>
        {/* Title */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ ...shimmer, height: 28, width: 140, marginBottom: 8 }} />
          <div style={{ ...shimmer, height: 14, width: 280 }} />
        </div>

        {/* Tab nav */}
        <div style={{ height: 46, borderRadius: 12, background: '#1E293B', marginBottom: 32 }} />

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 24px' }}>
              <div style={{ ...shimmer, width: 32, height: 32, borderRadius: 9, marginBottom: 12, background: '#F1F5F9' }} />
              <div style={{ ...shimmer, height: 32, width: 80, marginBottom: 8, background: '#F1F5F9' }} />
              <div style={{ ...shimmer, height: 12, width: 120, background: '#F1F5F9' }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 24px' }}>
              <div style={{ ...shimmer, width: 32, height: 32, borderRadius: 9, marginBottom: 12, background: '#F1F5F9' }} />
              <div style={{ ...shimmer, height: 32, width: 80, marginBottom: 8, background: '#F1F5F9' }} />
              <div style={{ ...shimmer, height: 12, width: 120, background: '#F1F5F9' }} />
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, height: 180 }} />
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, height: 180 }} />
        </div>

        {/* Table */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', height: 300 }} />
      </div>
    </div>
  )
}
