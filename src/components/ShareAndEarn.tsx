'use client'

import { useState, useEffect } from 'react'
import { Gift, Share2, ExternalLink, CheckCircle2, Clock, Send } from 'lucide-react'

const LINKEDIN_TEXT = encodeURIComponent(
  `I've been using OpusLearn to build my AI skills at work — it's been a game changer.\n\nPersonalised learning paths across Marketing, Sales, Finance, HR and more — all focused on practical AI applications.\n\nHighly recommend if you want to stay ahead. 🎓\n\nhttps://www.opuslearn.ai`
)
const INSTAGRAM_TEXT = encodeURIComponent(
  `Building my AI skills with OpusLearn 🎓 Personalised learning paths that actually fit my job. Check it out: www.opuslearn.ai`
)

type ShareStatus = 'idle' | 'submitting' | 'pending' | 'approved' | 'already_pending' | 'already_rewarded'

export function ShareAndEarn({ userId }: { userId: string }) {
  const [platform, setPlatform] = useState<'linkedin' | 'instagram'>('linkedin')
  const [postUrl, setPostUrl] = useState('')
  const [status, setStatus] = useState<ShareStatus>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/social-shares?own=1')
      .then(r => r.json())
      .then((data: { status?: string } | null) => {
        if (data?.status === 'approved') setStatus('approved')
        else if (data?.status === 'pending') setStatus('pending')
      })
      .catch(() => {})
  }, [userId])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!postUrl.trim()) return
    setStatus('submitting')
    setError('')

    const res = await fetch('/api/social-shares', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform, post_url: postUrl.trim() }),
    })
    const data = await res.json()

    if (!res.ok) {
      if (data.error === 'already_rewarded') { setStatus('approved'); return }
      if (data.error === 'already_pending') { setStatus('already_pending'); return }
      setStatus('idle')
      setError('Something went wrong — please try again.')
      return
    }
    setStatus('pending')
  }

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #10B981, #2563EB)' }} />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <Gift size={14} style={{ color: '#10B981' }} />
          <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
            Get 1 month free
          </p>
        </div>
        <p className="text-xs mb-4 leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
          Share OpusLearn on LinkedIn or Instagram and get 30 days added to your subscription — free.
        </p>

        {status === 'approved' && (
          <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
            <CheckCircle2 size={14} style={{ color: '#10B981', marginTop: 1, flexShrink: 0 }} />
            <p className="text-xs font-medium" style={{ color: '#166534', fontFamily: 'var(--font-sans)' }}>
              Your free month has been applied. Thank you for sharing!
            </p>
          </div>
        )}

        {(status === 'pending' || status === 'already_pending') && (
          <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
            <Clock size={14} style={{ color: '#D97706', marginTop: 1, flexShrink: 0 }} />
            <p className="text-xs font-medium" style={{ color: '#92400E', fontFamily: 'var(--font-sans)' }}>
              Your submission is under review — we'll email you once approved (usually within 24h).
            </p>
          </div>
        )}

        {(status === 'idle' || status === 'submitting') && (
          <>
            {/* Step 1 */}
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
              Step 1 — Post on social media
            </p>
            <div className="flex gap-2 mb-4">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.opuslearn.ai&summary=${LINKEDIN_TEXT}`}
                target="_blank" rel="noopener noreferrer"
                onClick={() => setPlatform('linkedin')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', textDecoration: 'none', fontFamily: 'var(--font-sans)' }}
              >
                <Share2 size={11} /> LinkedIn <ExternalLink size={10} />
              </a>
              <a
                href={`https://www.instagram.com/`}
                target="_blank" rel="noopener noreferrer"
                onClick={() => setPlatform('instagram')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                style={{ background: '#FDF4FF', color: '#A855F7', border: '1px solid #E9D5FF', textDecoration: 'none', fontFamily: 'var(--font-sans)' }}
              >
                <Share2 size={11} /> Instagram <ExternalLink size={10} />
              </a>
            </div>

            {/* Step 2 */}
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
              Step 2 — Paste your post URL
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={postUrl}
                  onChange={e => setPostUrl(e.target.value)}
                  placeholder="https://linkedin.com/posts/..."
                  className="flex-1 px-3 py-2 rounded-lg text-xs"
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    color: '#334155',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                  }}
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'submitting' || !postUrl.trim()}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: '#10B981',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                    opacity: status === 'submitting' ? 0.7 : 1,
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  <Send size={11} />
                  {status === 'submitting' ? 'Sending…' : 'Submit'}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-xs" style={{ color: '#DC2626', fontFamily: 'var(--font-sans)' }}>{error}</p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
