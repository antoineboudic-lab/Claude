interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'dark' | 'light'
  markOnly?: boolean
}

const sizes = {
  sm: { mark: 24, text: 13, gap: 8 },
  md: { mark: 28, text: 14, gap: 10 },
  lg: { mark: 36, text: 18, gap: 12 },
}

export function LogoMark({ size = 28, color = '#2563EB' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="7" fill={color} />
      {/* O */}
      <circle cx="11" cy="14" r="5.5" stroke="white" strokeWidth="2.5" />
      {/* L */}
      <path d="M19.5 9V20H24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Logo({ size = 'md', color = 'dark', markOnly = false }: LogoProps) {
  const { mark, text, gap } = sizes[size]
  const textColor = color === 'dark' ? '#0F172A' : '#F1F5F9'

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap }}>
      <LogoMark size={mark} />
      {!markOnly && (
        <span style={{
          fontSize: text,
          fontWeight: 900,
          color: textColor,
          letterSpacing: '-0.3px',
          lineHeight: 1,
        }}>
          OpusLearn
        </span>
      )}
    </span>
  )
}
