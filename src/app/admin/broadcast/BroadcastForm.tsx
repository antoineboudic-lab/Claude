'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, Mail, Bell, ChevronLeft, Send, Loader2 } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

type EmailState = { status: 'idle' } | { status: 'loading' } | { status: 'success'; sent: number } | { status: 'error'; message: string }
type PushState = { status: 'idle' } | { status: 'loading' } | { status: 'success'; sent: number } | { status: 'error'; message: string }

// ── Shared styles ─────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: 16,
  padding: 24,
  flex: 1,
  minWidth: 0,
}

const label: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: '#475569',
  marginBottom: 6,
  letterSpacing: '0.02em',
}

const input: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid #E2E8F0',
  borderRadius: 9,
  fontSize: 13,
  color: '#0F172A',
  background: '#F8FAFC',
  outline: 'none',
  boxSizing: 'border-box',
}

const selectStyle: React.CSSProperties = {
  ...input,
  cursor: 'pointer',
}

const fieldGroup: React.CSSProperties = {
  marginBottom: 16,
}

const btn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '10px 20px',
  borderRadius: 9,
  background: '#2563EB',
  color: '#FFFFFF',
  fontSize: 13,
  fontWeight: 600,
  border: 'none',
  cursor: 'pointer',
  marginTop: 4,
}

const btnDisabled: React.CSSProperties = {
  ...btn,
  opacity: 0.6,
  cursor: 'not-allowed',
}

function StatusBanner({ state }: { state: EmailState | PushState }) {
  if (state.status === 'idle' || state.status === 'loading') return null
  if (state.status === 'success') {
    return (
      <div style={{ marginTop: 14, padding: '10px 14px', background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 9, fontSize: 13, color: '#15803D', fontWeight: 600 }}>
        Sent to {state.sent} recipient{state.sent !== 1 ? 's' : ''} successfully.
      </div>
    )
  }
  return (
    <div style={{ marginTop: 14, padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 9, fontSize: 13, color: '#DC2626', fontWeight: 600 }}>
      Error: {state.message}
    </div>
  )
}

// ── Email Section ─────────────────────────────────────────────────────────────

function EmailSection() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [audience, setAudience] = useState('all')
  const [state, setState] = useState<EmailState>({ status: 'idle' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!subject.trim() || !body.trim()) return
    setState({ status: 'loading' })
    try {
      const res = await fetch('/api/admin/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'email', subject: subject.trim(), body: body.trim(), audience }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`)
      setState({ status: 'success', sent: json.sent ?? 0 })
    } catch (err) {
      setState({ status: 'error', message: err instanceof Error ? err.message : 'Unknown error' })
    }
  }

  const loading = state.status === 'loading'

  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Mail size={16} style={{ color: '#2563EB' }} />
        </div>
        <div>
          <p style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>Email Blast</p>
          <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Send via Resend to selected audience</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={fieldGroup}>
          <label style={label} htmlFor="email-subject">Subject</label>
          <input
            id="email-subject"
            style={input}
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Your announcement subject…"
            required
            disabled={loading}
          />
        </div>

        <div style={fieldGroup}>
          <label style={label} htmlFor="email-body">Message</label>
          <textarea
            id="email-body"
            style={{ ...input, resize: 'vertical', minHeight: 130, fontFamily: 'inherit' }}
            rows={6}
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Write your message here…"
            required
            disabled={loading}
          />
        </div>

        <div style={fieldGroup}>
          <label style={label} htmlFor="email-audience">Audience</label>
          <select
            id="email-audience"
            style={selectStyle}
            value={audience}
            onChange={e => setAudience(e.target.value)}
            disabled={loading}
          >
            <option value="all">All users</option>
            <option value="active7d">Active last 7 days</option>
            <option value="active30d">Active last 30 days</option>
          </select>
        </div>

        <button type="submit" style={loading ? btnDisabled : btn} disabled={loading}>
          {loading
            ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>
            : <><Send size={14} /> Send Email</>}
        </button>
      </form>

      <StatusBanner state={state} />

      {state.status === 'success' && (
        <button
          style={{ ...btn, background: 'transparent', color: '#94A3B8', border: '1px solid #E2E8F0', marginTop: 10 }}
          onClick={() => { setState({ status: 'idle' }); setSubject(''); setBody('') }}
        >
          Send another
        </button>
      )}
    </div>
  )
}

// ── Push Section ──────────────────────────────────────────────────────────────

function PushSection() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [url, setUrl] = useState('')
  const [state, setState] = useState<PushState>({ status: 'idle' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    setState({ status: 'loading' })
    try {
      const res = await fetch('/api/admin/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'push', title: title.trim(), body: body.trim(), url: url.trim() || undefined }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`)
      setState({ status: 'success', sent: json.sent ?? 0 })
    } catch (err) {
      setState({ status: 'error', message: err instanceof Error ? err.message : 'Unknown error' })
    }
  }

  const loading = state.status === 'loading'

  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bell size={16} style={{ color: '#F97316' }} />
        </div>
        <div>
          <p style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>Push Notification</p>
          <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Send to all subscribed browsers</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={fieldGroup}>
          <label style={label} htmlFor="push-title">Title</label>
          <input
            id="push-title"
            style={input}
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Notification title"
            required
            disabled={loading}
          />
        </div>

        <div style={fieldGroup}>
          <label style={label} htmlFor="push-body">Body</label>
          <input
            id="push-body"
            style={input}
            type="text"
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Short notification message"
            required
            disabled={loading}
          />
        </div>

        <div style={fieldGroup}>
          <label style={label} htmlFor="push-url">URL (optional)</label>
          <input
            id="push-url"
            style={input}
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="/dashboard"
            disabled={loading}
          />
        </div>

        <button type="submit" style={loading ? btnDisabled : btn} disabled={loading}>
          {loading
            ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>
            : <><Bell size={14} /> Send Push</>}
        </button>
      </form>

      <StatusBanner state={state} />

      {state.status === 'success' && (
        <button
          style={{ ...btn, background: 'transparent', color: '#94A3B8', border: '1px solid #E2E8F0', marginTop: 10 }}
          onClick={() => { setState({ status: 'idle' }); setTitle(''); setBody(''); setUrl('') }}
        >
          Send another
        </button>
      )}
    </div>
  )
}

// ── Page component ────────────────────────────────────────────────────────────

export function BroadcastForm() {
  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: 'var(--font-sans)' }}>

      {/* Top nav */}
      <div style={{ background: '#0F172A', padding: '0 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: 'linear-gradient(135deg, #2563EB, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={12} style={{ color: '#fff' }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>AI Literacy</span>
            </Link>
            <span style={{ color: '#334155', fontSize: 13 }}>/</span>
            <Link href="/admin" style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textDecoration: 'none' }}>Admin</Link>
            <span style={{ color: '#334155', fontSize: 13 }}>/</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8' }}>Broadcast</span>
          </div>
          <Link
            href="/admin"
            style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#64748B', textDecoration: 'none', padding: '5px 12px', borderRadius: 7, border: '1px solid #1E293B' }}
          >
            <ChevronLeft size={13} /> Back
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 32px 80px' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: '0 0 4px', letterSpacing: '-0.03em' }}>
            Broadcast
          </h1>
          <p style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>
            Send announcements to your users via email or push notification
          </p>
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <EmailSection />
          <PushSection />
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
