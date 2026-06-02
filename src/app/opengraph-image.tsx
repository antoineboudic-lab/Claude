import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'OpusLearn — Master AI Without Writing Code'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  const tracks = [
    { label: 'Marketing', color: '#E04D2A' },
    { label: 'Finance', color: '#F59E0B' },
    { label: 'HR', color: '#10B981' },
    { label: 'Sales', color: '#3B82F6' },
    { label: 'Leadership', color: '#F97316' },
    { label: 'Legal', color: '#0284C7' },
    { label: 'Product', color: '#14B8A6' },
    { label: 'Operations', color: '#22D3EE' },
  ]

  return new ImageResponse(
    (
      <div style={{
        width: 1200, height: 630,
        display: 'flex', flexDirection: 'column',
        background: '#0F172A',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background glows */}
        <div style={{
          position: 'absolute', top: -150, left: -100,
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: -150, right: -100,
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Content */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          position: 'relative',
        }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width={56} height={56}
              src={`data:image/svg+xml,${encodeURIComponent('<svg width="56" height="56" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="7" fill="#2563EB"/><circle cx="14" cy="15" r="6.5" stroke="white" stroke-width="2.2" fill="none"/><path d="M10.5 17L14 12L17.5 17" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>')}`}
              alt="OpusLearn logo"
            />
            <span style={{ fontSize: 30, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
              OpusLearn
            </span>
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              fontSize: 13, fontWeight: 700, color: '#60A5FA',
              letterSpacing: '2.5px', textTransform: 'uppercase', display: 'flex',
            }}>
              AI TRAINING FOR BUSINESS PROFESSIONALS
            </div>
            <div style={{
              display: 'flex', flexDirection: 'column',
              fontSize: 74, fontWeight: 900,
              lineHeight: 1.0, letterSpacing: '-2.5px',
            }}>
              <span style={{ color: '#FFFFFF' }}>Master AI</span>
              <span style={{ color: '#60A5FA' }}>Without Writing Code</span>
            </div>
            <div style={{
              fontSize: 22, color: '#94A3B8', fontWeight: 400,
              lineHeight: 1.4, display: 'flex',
            }}>
              Personalised learning paths for your role — apply AI from day one.
            </div>
          </div>

          {/* Track badges */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tracks.map(t => (
              <div key={t.label} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 12px', borderRadius: 20,
                background: `${t.color}18`,
                border: `1px solid ${t.color}45`,
              }}>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: t.color, display: 'flex',
                }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#CBD5E1' }}>
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
