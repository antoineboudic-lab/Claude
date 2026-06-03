'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, CheckCircle2, Trash2, Loader2 } from 'lucide-react'

export function LeadActions({ id, converted }: { id: string; converted: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [done, setDone] = useState<string | null>(null)

  async function run(action: string) {
    setLoading(action)
    try {
      const method = action === 'delete' ? 'DELETE' : 'PATCH'
      const body = action === 'delete' ? { id } : { id, action }
      const res = await fetch('/api/leads', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (res.ok) {
        setDone(action)
        if (action === 'delete') router.refresh()
        else setTimeout(() => router.refresh(), 600)
      }
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <button
        onClick={() => run('invite')}
        disabled={!!loading || done === 'invite'}
        title="Send invite email"
        style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 6, border: '1px solid #E2E8F0', background: done === 'invite' ? '#F0FDF4' : '#FFFFFF', color: done === 'invite' ? '#10B981' : '#475569', fontSize: 12, fontWeight: 600, cursor: loading || done === 'invite' ? 'default' : 'pointer', fontFamily: 'var(--font-sans)' }}
      >
        {loading === 'invite' ? <Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} /> : <Mail size={11} />}
        {done === 'invite' ? 'Sent' : 'Invite'}
      </button>

      {!converted && (
        <button
          onClick={() => run('convert')}
          disabled={!!loading || done === 'convert'}
          title="Mark as converted"
          style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 6, border: '1px solid #E2E8F0', background: done === 'convert' ? '#F0FDF4' : '#FFFFFF', color: done === 'convert' ? '#10B981' : '#475569', fontSize: 12, fontWeight: 600, cursor: loading || done === 'convert' ? 'default' : 'pointer', fontFamily: 'var(--font-sans)' }}
        >
          {loading === 'convert' ? <Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} /> : <CheckCircle2 size={11} />}
          {done === 'convert' ? 'Converted' : 'Convert'}
        </button>
      )}

      <button
        onClick={() => { if (confirm('Delete this lead?')) run('delete') }}
        disabled={!!loading}
        title="Delete lead"
        style={{ display: 'flex', alignItems: 'center', padding: '4px 8px', borderRadius: 6, border: '1px solid #FEE2E2', background: '#FFF5F5', color: '#EF4444', cursor: loading ? 'default' : 'pointer', fontFamily: 'var(--font-sans)' }}
      >
        {loading === 'delete' ? <Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={11} />}
      </button>
    </div>
  )
}
