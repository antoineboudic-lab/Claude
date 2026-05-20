'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? 'antoine.boudic@gmail.com')
  .split(',').map(e => e.trim().toLowerCase()).filter(Boolean)

export function AdminGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB', animation: 'pulse 1s infinite' }} />
          <span style={{ color: '#475569', fontSize: 13 }}>Checking access...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={15} style={{ color: '#fff' }} />
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF' }}>OpusLearn</span>
          </div>
          <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: '32px 40px' }}>
            <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 6px' }}>Admin access required</p>
            <p style={{ color: '#475569', fontSize: 12, margin: '0 0 24px' }}>Sign in with your admin account to continue</p>
            <Link href="/?next=/admin&signin=1" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '10px 24px', borderRadius: 9, background: '#2563EB',
              color: '#FFFFFF', textDecoration: 'none', fontSize: 13, fontWeight: 600,
            }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!ADMIN_EMAILS.includes((user.email ?? '').toLowerCase())) {
    return (
      <div style={{ minHeight: '100vh', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={15} style={{ color: '#fff' }} />
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF' }}>OpusLearn Admin</span>
          </div>
          <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: '32px 40px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#7F1D1D20', border: '1px solid #7F1D1D', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <span style={{ color: '#EF4444', fontSize: 18 }}>✕</span>
            </div>
            <p style={{ color: '#EF4444', fontSize: 14, fontWeight: 600, margin: '0 0 8px' }}>Access denied</p>
            <p style={{ color: '#475569', fontSize: 12, margin: '0 0 4px' }}>Signed in as: <span style={{ color: '#64748B' }}>{user.email}</span></p>
            <p style={{ color: '#334155', fontSize: 11, margin: '0 0 24px' }}>This account is not in the admin list.</p>
            <Link href="/dashboard" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 20px', borderRadius: 8, background: '#1E293B',
              border: '1px solid #334155', color: '#94A3B8', textDecoration: 'none', fontSize: 12,
            }}>
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
