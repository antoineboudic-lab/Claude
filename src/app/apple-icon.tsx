import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  const { width, height } = size
  const radius = Math.round(width * 0.22)
  const boltSize = Math.round(width * 0.52)

  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          background: 'linear-gradient(135deg, #0D9488 0%, #6366F1 50%, #22D3EE 100%)',
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
    { width, height },
  )
}
