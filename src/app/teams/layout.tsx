import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Literacy for Teams',
  description: 'Upskill your entire team in AI with role-specific tracks, team progress dashboards, and group certificates. Plans for teams of 5 to 500+.',
  openGraph: {
    title: 'AI Literacy for Teams — Upskill Every Function',
    description: 'Role-specific AI tracks for every team. Team dashboard, group certificates, and SSO for enterprise. Plans from 5 seats.',
  },
}

export default function TeamsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
