'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Check, ChevronDown } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

type FeedbackType = 'bug' | 'suggestion' | 'other'

const TYPES: { id: FeedbackType; label: string; emoji: string }[] = [
  { id: 'bug',        label: 'Bug report',  emoji: '🐛' },
  { id: 'suggestion', label: 'Suggestion',  emoji: '💡' },
  { id: 'other',      label: 'Other',       emoji: '💬' },
]

export default function FeedbackButton() {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<FeedbackType>('bug')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [page, setPage] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    setPage(window.location.pathname)
  }, [open])

  useEffect(() => {
    if (user?.email) setEmail(user.email)
  }, [user])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!description.trim()) return
    setLoading(true)
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, page, description, email }),
      })
      setSent(true)
      setTimeout(() => {
        setOpen(false)
        setSent(false)
        setDescription('')
        setType('bug')
      }, 2200)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 left-5 z-40" style={{ fontFamily: 'var(--font-sans)' }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 left-0 w-80 rounded-2xl overflow-hidden"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #F1F5F9', background: '#EFF6FF' }}>
              <div className="flex items-center gap-2">
                <MessageSquare size={14} style={{ color: '#2563EB' }} />
                <span className="text-sm font-bold" style={{ color: '#0F172A' }}>Share feedback</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: '#DBEAFE', color: '#2563EB' }}>BETA</span>
              </div>
              <button onClick={() => setOpen(false)} className="hover:opacity-70 transition-opacity">
                <X size={14} style={{ color: '#94A3B8' }} />
              </button>
            </div>

            {sent ? (
              <div className="px-4 py-8 flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#DCFCE7' }}>
                  <Check size={22} style={{ color: '#16A34A' }} />
                </div>
                <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>Thanks — feedback sent!</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>We read everything.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 space-y-3">
                {/* Type selector */}
                <div className="flex gap-2">
                  {TYPES.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(t.id)}
                      className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                      style={{
                        background: type === t.id ? '#EFF6FF' : '#F8FAFC',
                        border: `1px solid ${type === t.id ? '#2563EB' : '#E2E8F0'}`,
                        color: type === t.id ? '#2563EB' : '#64748B',
                      }}
                    >
                      {t.emoji} {t.label}
                    </button>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <textarea
                    required
                    rows={4}
                    placeholder={
                      type === 'bug'
                        ? 'What happened? What did you expect?'
                        : type === 'suggestion'
                        ? 'What would make this better?'
                        : 'What's on your mind?'
                    }
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
                    style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A', lineHeight: 1.6 }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.background = '#FFFFFF' }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC' }}
                  />
                </div>

                {/* Email */}
                <input
                  type="email"
                  placeholder="Your email (optional — for follow-up)"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.background = '#FFFFFF' }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC' }}
                />

                <button
                  type="submit"
                  disabled={loading || !description.trim()}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40"
                  style={{ background: '#2563EB' }}
                >
                  {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <><Send size={13} /> Send feedback</>
                  )}
                </button>

                <p className="text-[10px] text-center" style={{ color: '#CBD5E1' }}>
                  Sent to the OpusLearn team · Page: {page}
                </p>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg"
        style={{ background: open ? '#1D4ED8' : '#2563EB', boxShadow: '0 4px 14px rgba(37,99,235,0.35)' }}
      >
        <MessageSquare size={14} />
        Feedback
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }}>BETA</span>
      </motion.button>
    </div>
  )
}
