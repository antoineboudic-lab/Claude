import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'AI Literacy — Master AI Without Writing Code'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{
        background: '#FFFFFF',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '72px 80px',
        fontFamily: 'system-ui, sans-serif',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: '#7C3AED', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontSize: 22, fontWeight: 900 }}>⚡</span>
          </div>
          <span style={{ fontSize: 24, fontWeight: 900, color: '#0F172A' }}>AI Literacy</span>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            fontSize: 13, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: '#7C3AED',
          }}>
            For business professionals
          </div>
          <div style={{
            display: 'flex', flexDirection: 'column',
            fontSize: 68, fontWeight: 900, color: '#0F172A',
            lineHeight: 1.05, letterSpacing: -2,
          }}>
            <span>Master AI Without</span>
            <span>Writing Code</span>
          </div>
          <div style={{ fontSize: 26, color: '#64748B', fontWeight: 400, marginTop: 8 }}>
            Role-specific tracks built for your job — not abstract theory.
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 48 }}>
          {[
            { n: '3,200+', label: 'Professionals trained' },
            { n: '10', label: 'Role tracks' },
            { n: '94%', label: 'Completion rate' },
            { n: '4.9/5', label: 'Learner rating' },
          ].map(({ n, label }) => (
            <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: '#0F172A' }}>{n}</span>
              <span style={{ fontSize: 15, color: '#94A3B8', fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
