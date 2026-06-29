// ─── Editorial design system — shared tokens ─────────────────────────────────
// Single source of truth for the warm "ink-on-paper" editorial theme used across
// the marketing site (landing + tracks, teams, blog, pricing). Mirrors the token
// block in src/app/page.tsx so every surface matches exactly.

export const PAPER = '#FBFAF6'        // page surface — warm off-white paper
export const PAPER_2 = '#FFFFFF'      // raised inset / card surface — clean white
export const PANEL = '#F2F0E8'        // deeper contrast band
export const INK = '#1A1B1F'          // primary text — warm near-black ink
export const INK_SOFT = 'rgba(26,27,31,0.66)'   // secondary text
export const INK_FAINT = 'rgba(26,27,31,0.44)'  // tertiary / captions
export const COBALT = '#2440D8'       // signature blue — button fills (white text)
export const COBALT_TX = '#2440D8'    // cobalt accent text / numerals on paper
export const COBALT_GLOW = '#AEBCFF'  // aurora glow source — soft light bloom
export const LIGHT = '#1A1B1F'        // explicit contrast surface (inverted/ink CTAs)
export const RULE = 'rgba(0,0,0,0.10)' // hairline on paper

export const SERIF = 'var(--font-serif)'
export const MONO = 'var(--font-mono)'
export const SANS = 'var(--font-sans)'

export const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easing } },
}

export function stagger(delay = 0.1) {
  return { hidden: {}, visible: { transition: { staggerChildren: delay } } }
}

// Fine fractal-noise film — the "printed on stock" texture flat fills never have.
export const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")"
