import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { AdminGate } from './AdminGate'

export const metadata: Metadata = { title: 'Admin | AI Literacy', robots: { index: false } }

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminGate>{children}</AdminGate>
}
