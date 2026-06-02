'use client'

import { useState, useEffect, useCallback } from 'react'
import { Gift, Share2, ExternalLink, CheckCircle2, Clock, Send, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Shared text ──────────────────────────────────────────────────────────────

const LINKEDIN_TEXT = encodeURIComponent(
  `I've been using OpusLearn to build my AI skills at work — it's been a game changer.\n\nPersonalised learning paths across Marketing, Sales, Finance, HR and more — all focused on practical AI applications.\n\nHighly recommend if you want to stay ahead. 🎓\n\nhttps://www.opuslearn.ai`
)

const LINKEDIN_URL = `https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.opuslearn.ai&summary=${LINKEDIN_TEXT}`
const INSTAGRAM_URL = `https://www.instagram.com/`

// ─── Status hook ─────────────────────────────────────────────────────────────

type ShareStatus = 'loading' | 'idle' | 'submitting' | 'pending' | 'approved'

export function useShareStatus(userId: string) {
  const [status, setStatus] = useState<ShareStatus>('loading')

  useEffect(() => {
    fetch('/api/social-shares?own=1')
      .then(r => r.json())
      .then((data: { status?: string } | null) => {
        if (data?.status === 'approved') setStatus('approved')
        else if (data?.status === 'pending') setStatus('pending')
        else setStatus('idle')
      })
      .catch(() => setStatus('idle'))
  }, [userId])

  const markPending = useCallback(() => setStatus('pending'), [])

  return { status, markPending }
}

// ─── Form ─────────────────────────────────────────────────────────────────────

function ShareForm({ onSuccess, compact = false }: { onSuccess: () => void; compact?: boolean }) {
  const [platform, setPlatform] = useState<'linkedin' | 'instagram'>('linkedin')
  const [postUrl, setPostUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!postUrl.trim()) return
    setSubmitting(true)
    setError('')

    const res = await fetch('/api/social-shares', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform, post_url: postUrl.trim() }),
    })
    const data = await res.json()
    setSubmitting(false)

    if (res.ok || data.error === 'already_pending') {
      onSuccess()
      return
    }
    if (data.error === 'already_rewarded') {
      onSuccess()
      return
    }
    setError('Something went wrong — please try again.')
  }

  return (
    <>
      <p className="text-[10px] font-bold uppercase tracking-widest mb-2"
        style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
        Step 1 — Post on social media
      </p>
      <div className={`flex gap-2 ${compact ? 'mb-3' : 'mb-4'}`}>
        <a
          href={LINKEDIN_URL}
          target="_blank" rel="noopener noreferrer"
          onClick={() => setPlatform('linkedin')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
          style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', textDecoration: 'none', fontFamily: 'var(--font-sans)' }}
        >
          <Share2 size={11} /> LinkedIn <ExternalLink size={10} />
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank" rel="noopener noreferrer"
          onClick={() => setPlatform('instagram')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
          style={{ background: '#FDF4FF', color: '#A855F7', border: '1px solid #E9D5FF', textDecoration: 'none', fontFamily: 'var(--font-sans)' }}
        >
          <Share2 size={11} /> Instagram <ExternalLink size={10} />
        </a>
      </div>

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
            style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#334155', fontFamily: 'var(--font-sans)', outline: 'none' }}
            required
          />
          <button
            type="submit"
            disabled={submitting || !postUrl.trim()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold"
            style={{ background: '#10B981', color: '#FFFFFF', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1, fontFamily: 'var(--font-sans)' }}
          >
            <Send size={11} />
            {submitting ? 'Sending…' : 'Submit'}
          </button>
        </div>
        {error && <p className="mt-2 text-xs" style={{ color: '#DC2626', fontFamily: 'var(--font-sans)' }}>{error}</p>}
      </form>
    </>
  )
}

// ─── Sidebar card ─────────────────────────────────────────────────────────────

export function ShareAndEarn({ userId }: { userId: string }) {
  const { status, markPending } = useShareStatus(userId)

  if (status === 'loading') return null

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

        {status === 'pending' && (
          <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
            <Clock size={14} style={{ color: '#D97706', marginTop: 1, flexShrink: 0 }} />
            <p className="text-xs font-medium" style={{ color: '#92400E', fontFamily: 'var(--font-sans)' }}>
              Your submission is under review — we'll email you once approved (usually within 24h).
            </p>
          </div>
        )}

        {status === 'idle' && <ShareForm onSuccess={markPending} />}
      </div>
    </div>
  )
}

// ─── Full-width banner (main column) ─────────────────────────────────────────

export function ShareAndEarnBanner({ userId }: { userId: string }) {
  const { status, markPending } = useShareStatus(userId)
  const [expanded, setExpanded] = useState(false)

  if (status === 'loading' || status === 'pending' || status === 'approved') return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.45 }}
      className="mb-6 rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #ECFDF5, #F0FDF4)', border: '1px solid #A7F3D0' }}
    >
      <div className="px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
            <Gift size={16} color="#FFFFFF" />
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: '#064E3B', fontFamily: 'var(--font-sans)' }}>
              Get 1 month free — share OpusLearn on social media
            </p>
            <p className="text-xs" style={{ color: '#059669', fontFamily: 'var(--font-sans)' }}>
              Post on LinkedIn or Instagram → paste the link → get 30 days added to your plan
            </p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold flex-shrink-0 transition-all hover:opacity-90"
          style={{ background: '#10B981', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
        >
          {expanded ? 'Hide' : 'Claim now'} <ArrowRight size={13} />
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden', borderTop: '1px solid #A7F3D0' }}
          >
            <div className="px-5 py-4" style={{ background: '#FFFFFF' }}>
              <ShareForm onSuccess={() => { markPending(); setExpanded(false) }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Popup modal (fires once when rule matches) ───────────────────────────────

const POPUP_KEY = 'opus-share-popup-seen'

export function ShareAndEarnPopup({ userId, completedLessons }: { userId: string; completedLessons: number }) {
  const { status, markPending } = useShareStatus(userId)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Rule: ≥3 lessons, no submission, never shown before
    if (completedLessons < 3) return
    if (status !== 'idle') return
    if (typeof localStorage !== 'undefined' && localStorage.getItem(POPUP_KEY)) return

    const t = setTimeout(() => setOpen(true), 6000)
    return () => clearTimeout(t)
  }, [status, completedLessons])

  function dismiss() {
    setOpen(false)
    if (typeof localStorage !== 'undefined') localStorage.setItem(POPUP_KEY, '1')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed z-50 rounded-3xl overflow-hidden"
            style={{
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '100%', maxWidth: 480,
              background: '#FFFFFF',
              boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
            }}
          >
            {/* Header */}
            <div className="relative px-8 pt-8 pb-6"
              style={{ background: 'linear-gradient(135deg, #ECFDF5, #F0FDF4)', borderBottom: '1px solid #A7F3D0' }}>
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white"
                style={{ color: '#94A3B8' }}
              >
                <X size={16} />
              </button>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                <Gift size={22} color="#FFFFFF" />
              </div>
              <h2 className="text-2xl font-black mb-1" style={{ color: '#064E3B', fontFamily: 'var(--font-sans)' }}>
                You've earned this — get 1 month free
              </h2>
              <p className="text-sm" style={{ color: '#059669', fontFamily: 'var(--font-sans)' }}>
                You've completed {completedLessons} lessons. Share that with your network and we'll add 30 days to your plan.
              </p>
            </div>

            {/* Form */}
            <div className="px-8 py-6">
              <ShareForm
                onSuccess={() => { markPending(); dismiss() }}
                compact
              />
              <button
                onClick={dismiss}
                className="mt-4 w-full text-xs text-center transition-colors hover:text-slate-500"
                style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
