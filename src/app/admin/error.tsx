'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => { console.error('[Admin]', error) }, [error])

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)', padding: 24 }}>
      <div style={{ maxWidth: 480, width: '100%' }}>
        <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: '32px 36px' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#7F1D1D30', border: '1px solid #7F1D1D', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <AlertTriangle size={18} style={{ color: '#EF4444' }} />
          </div>
          <h1 style={{ color: '#F1F5F9', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>Admin page failed to load</h1>
          <p style={{ color: '#64748B', fontSize: 13, margin: '0 0 24px', lineHeight: 1.6 }}>
            The server returned an error. This is almost always caused by a missing environment variable in Vercel.
          </p>

          <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Check these vars in Vercel → Settings → Environment Variables:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
            {[
              { key: 'SUPABASE_SERVICE_ROLE_KEY', note: 'Required — missing = instant crash' },
              { key: 'NEXT_PUBLIC_SUPABASE_URL', note: 'Required' },
              { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', note: 'Required' },
              { key: 'NEXT_PUBLIC_ADMIN_EMAILS', note: 'e.g. antoine.boudic@gmail.com' },
            ].map(({ key, note }) => (
              <div key={key} style={{ background: '#0F172A', borderRadius: 8, padding: '10px 14px' }}>
                <code style={{ color: '#22D3EE', fontSize: 12, fontFamily: 'monospace' }}>{key}</code>
                <p style={{ color: '#475569', fontSize: 11, margin: '3px 0 0' }}>{note}</p>
              </div>
            ))}
          </div>

          <p style={{ color: '#475569', fontSize: 12, margin: '0 0 20px' }}>
            After adding any missing variable, go to <strong style={{ color: '#64748B' }}>Vercel → Deployments → Redeploy</strong> to apply it.
          </p>

          <button
            onClick={reset}
            style={{ padding: '9px 20px', borderRadius: 8, background: '#2563EB', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
