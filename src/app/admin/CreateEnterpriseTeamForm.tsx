'use client'

import { useState } from 'react'
import { Building2, CheckCircle2, Loader2 } from 'lucide-react'

export function CreateEnterpriseTeamForm() {
  const [companyName, setCompanyName] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminFirstName, setAdminFirstName] = useState('')
  const [adminLastName, setAdminLastName] = useState('')
  const [seatLimit, setSeatLimit] = useState('999')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const res = await fetch('/api/admin/create-enterprise-team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName: companyName.trim(),
        adminEmail: adminEmail.trim(),
        adminName: [adminFirstName.trim(), adminLastName.trim()].filter(Boolean).join(' '),
        seatLimit: parseInt(seatLimit) || 999,
      }),
    })

    const json = await res.json() as { ok?: boolean; error?: string }
    if (!res.ok || !json.ok) {
      setStatus('error')
      setError(json.error ?? 'Something went wrong.')
      return
    }

    setStatus('success')
    setCompanyName('')
    setAdminEmail('')
    setAdminFirstName('')
    setAdminLastName('')
    setSeatLimit('999')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', borderRadius: 8,
    border: '1px solid #E2E8F0', fontSize: 13, color: '#0F172A',
    fontFamily: 'var(--font-sans)', background: '#FFFFFF', outline: 'none',
    boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 11, fontWeight: 600,
    color: '#64748B', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em',
  }

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', marginBottom: 24 }}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Building2 size={14} style={{ color: '#2563EB' }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Create Enterprise Team</span>
      </div>

      {status === 'success' ? (
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <CheckCircle2 size={18} style={{ color: '#10B981', flexShrink: 0 }} />
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Team created — setup email sent</p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748B' }}>The admin will receive an email to activate their account.</p>
          </div>
          <button onClick={() => setStatus('idle')}
            style={{ marginLeft: 'auto', fontSize: 12, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
            Create another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ padding: '20px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr 1fr 80px auto', gap: 12, alignItems: 'flex-end' }}>
            <div>
              <label style={labelStyle}>Company name</label>
              <input value={companyName} onChange={e => setCompanyName(e.target.value)}
                placeholder="Acme Corp" required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Admin email</label>
              <input type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)}
                placeholder="admin@acme.com" required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>First name</label>
              <input value={adminFirstName} onChange={e => setAdminFirstName(e.target.value)}
                placeholder="Sophie" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Last name</label>
              <input value={adminLastName} onChange={e => setAdminLastName(e.target.value)}
                placeholder="Martin" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Seats</label>
              <input type="number" value={seatLimit} onChange={e => setSeatLimit(e.target.value)}
                min={1} style={inputStyle} />
            </div>
            <button type="submit" disabled={status === 'loading'}
              style={{
                padding: '8px 16px', borderRadius: 8, background: '#2563EB', color: '#FFFFFF',
                fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                opacity: status === 'loading' ? 0.7 : 1,
              }}>
              {status === 'loading' ? <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> : null}
              {status === 'loading' ? 'Creating…' : 'Create & send email'}
            </button>
          </div>
          {status === 'error' && (
            <p style={{ margin: '10px 0 0', fontSize: 12, color: '#EF4444' }}>{error}</p>
          )}
        </form>
      )}
    </div>
  )
}
