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
      <circle cx="14" cy="15" r="6.5" stroke="white" strokeWidth="2.2" fill="none" />
      <path d="M10.5 17L14 12L17.5 17" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
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
