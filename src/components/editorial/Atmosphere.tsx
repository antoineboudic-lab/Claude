import { COBALT_GLOW, GRAIN_URL } from './theme'

// Fine film grain over the whole page — soft-light reads correctly on paper.
export function GrainOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30"
      style={{ backgroundImage: GRAIN_URL, backgroundSize: '160px 160px', opacity: 0.22, mixBlendMode: 'soft-light' }} />
  )
}

// Soft cobalt aurora bloom — atmospheric depth behind headlines. Lives inside an
// overflow-hidden section so it never bleeds.
export function AuroraGlow({ style }: { style?: React.CSSProperties }) {
  return (
    <div aria-hidden className="pointer-events-none absolute rounded-full"
      style={{
        background: `radial-gradient(circle, ${COBALT_GLOW}66 0%, ${COBALT_GLOW}26 34%, transparent 68%)`,
        filter: 'blur(40px)',
        ...style,
      }} />
  )
}
