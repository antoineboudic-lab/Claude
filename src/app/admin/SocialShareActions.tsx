'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

export function SocialShareActions({ shareId }: { shareId: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'approved' | 'rejected'>('idle')

  async function act(action: 'approve' | 'reject') {
    setStatus('loading')
    const res = await fetch('/api/social-shares', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: shareId, action }),
    })
    if (res.ok) {
      setStatus(action === 'approve' ? 'approved' : 'rejected')
    } else {
      setStatus('idle')
    }
  }

  if (status === 'approved') return <span style={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>✓ Approved</span>
  if (status === 'rejected') return <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>Rejected</span>

  return (
    <div style={{ display: 'flex', gap: 6 }}>
      <button
        onClick={() => act('approve')}
        disabled={status === 'loading'}
        style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: '#DCFCE7', color: '#166534', border: 'none', cursor: 'pointer', opacity: status === 'loading' ? 0.6 : 1 }}
      >
        <CheckCircle2 size={11} /> Approve
      </button>
      <button
        onClick={() => act('reject')}
        disabled={status === 'loading'}
        style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: '#FEE2E2', color: '#991B1B', border: 'none', cursor: 'pointer', opacity: status === 'loading' ? 0.6 : 1 }}
      >
        <XCircle size={11} /> Reject
      </button>
    </div>
  )
}
