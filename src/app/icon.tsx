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
  const radius = Math.round(dim * 0.22)
  const boltSize = Math.round(dim * 0.52)

  return new ImageResponse(
    (
      <div
        style={{
          width: dim,
          height: dim,
          background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #22D3EE 100%)',
          borderRadius: radius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width={boltSize}
          height={boltSize}
          viewBox="0 0 24 24"
          fill="white"
        >
          <polygon points="13,2 4,14 11,14 11,22 20,10 13,10" />
        </svg>
      </div>
    ),
    { width: dim, height: dim },
  )
}
