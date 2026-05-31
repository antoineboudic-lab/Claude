import { ImageResponse } from 'next/og'

export function generateImageMetadata() {
  return [
    { contentType: 'image/png', size: { width: 32,  height: 32  }, id: '32'  },
    { contentType: 'image/png', size: { width: 192, height: 192 }, id: '192' },
    { contentType: 'image/png', size: { width: 512, height: 512 }, id: '512' },
  ]
}

export default async function Icon({ id }: { id: Promise<string> | string }) {
  const resolvedId = typeof id === 'string' ? id : await id
  const dim = resolvedId === '512' ? 512 : resolvedId === '192' ? 192 : 32
  const radius = Math.round(dim * 0.25)
  const scale = dim / 28

  const cx = 14 * scale
  const cy = 15 * scale
  const r = 6.5 * scale
  const sw = 2.2 * scale

  const x1 = 10.5 * scale
  const y1 = 17 * scale
  const x2 = 14 * scale
  const y2 = 12 * scale
  const x3 = 17.5 * scale
  const y3 = 17 * scale

  return new ImageResponse(
    (
      <div
        style={{
          width: dim,
          height: dim,
          background: '#2563EB',
          borderRadius: radius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} fill="none">
          <circle cx={cx} cy={cy} r={r} stroke="white" strokeWidth={sw} />
          <path
            d={`M${x1} ${y1} L${x2} ${y2} L${x3} ${y3}`}
            stroke="white"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { width: dim, height: dim },
  )
}
