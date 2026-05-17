import { ImageResponse } from 'next/og'
import { getTrack } from '@/lib/curriculum'
import type { TrackId } from '@/lib/curriculum/types'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const TRACK_META: Record<string, { color: string; label: string; tagline: string }> = {
  marketing:  { color: '#EC4899', label: 'Marketing',        tagline: 'Write better briefs, campaigns, and copy — in half the time.' },
  finance:    { color: '#F59E0B', label: 'Finance',          tagline: 'Turn data into insight with AI-powered analysis and commentary.' },
  hr:         { color: '#10B981', label: 'HR & People',      tagline: 'Hire smarter, engage better, and scale your people operations.' },
  sales:      { color: '#8B5CF6', label: 'Sales',            tagline: 'Personalise at scale. Research faster. Close more deals.' },
  operations: { color: '#22D3EE', label: 'Operations',       tagline: 'Document processes, cut admin, and make better decisions.' },
  leadership: { color: '#F97316', label: 'Leadership',       tagline: 'Build and execute an AI strategy your team will actually follow.' },
  legal:      { color: '#6366F1', label: 'Legal',            tagline: 'Review, research, and advise with AI confidence.' },
  product:    { color: '#14B8A6', label: 'Product',          tagline: 'Discover, prioritise, and ship better products with AI.' },
  customer:   { color: '#F43F5E', label: 'Customer Success', tagline: 'Retain, expand, and delight customers with AI.' },
  consulting: { color: '#0EA5E9', label: 'Consulting',       tagline: 'Research, analyse, and deliver with AI as your edge.' },
}

export default function OGImage({ params }: { params: { trackId: string } }) {
  const meta = TRACK_META[params.trackId]
  if (!meta) return new ImageResponse(<div>Not found</div>, { ...size })

  const track = getTrack(params.trackId as TrackId)
  const totalLessons = track ? track.modules.reduce((a, m) => a + m.lessons.length, 0) : 16

  return new ImageResponse(
    (
      <div style={{
        background: '#FFFFFF',
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'space-between',
        padding: '72px 80px',
        fontFamily: 'system-ui, sans-serif',
        borderTop: `8px solid ${meta.color}`,
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

        {/* Track */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              background: meta.color + '18', borderRadius: 100,
              padding: '6px 18px', fontSize: 14, fontWeight: 700,
              color: meta.color, letterSpacing: 1, textTransform: 'uppercase',
            }}>
              Role track
            </div>
          </div>
          <div style={{
            fontSize: 72, fontWeight: 900, color: '#0F172A',
            lineHeight: 1, letterSpacing: -2,
          }}>
            AI for {meta.label}
          </div>
          <div style={{ fontSize: 28, color: '#64748B', fontWeight: 400 }}>
            {meta.tagline}
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
          {[
            { n: `${totalLessons} lessons`, label: '15–20 min each' },
            { n: '4 modules', label: 'Practical exercises' },
            { n: 'Certificate', label: 'Verified on completion' },
          ].map(({ n, label }) => (
            <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 26, fontWeight: 900, color: '#0F172A' }}>{n}</span>
              <span style={{ fontSize: 15, color: '#94A3B8', fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
