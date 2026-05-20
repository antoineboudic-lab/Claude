'use client'

import { useAuth } from '@/context/AuthContext'

export function AdminNavEmail() {
  const { user } = useAuth()
  return <span style={{ fontSize: 12, color: '#64748B' }}>{user?.email ?? ''}</span>
}
