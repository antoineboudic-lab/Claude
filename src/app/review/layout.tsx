import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Review Session',
  description: 'Spaced repetition review — reinforce what you have learned.',
  robots: { index: false, follow: false },
}

export default function ReviewLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
