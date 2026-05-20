'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Eye, EyeOff, Zap, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Step = 'loading' | 'form' | 'success' | 'invalid'

export default function ResetPasswordPage() {
  const [step, setStep] = useState<Step>('loading')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = useRef(createClient())

  useEffect(() => {
    // Supabase puts the recovery tokens in the URL hash:
    // #access_token=...&refresh_token=...&type=recovery
    const hash = window.location.hash.slice(1)
    const params = new URLSearchParams(hash)
    const type = params.get('type')
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')

    if (type === 'recovery' && accessToken && refreshToken) {
      supabase.current.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ error }) => {
          if (error) setStep('invalid')
          else setStep('form')
        })
    } else {
      // Maybe the session is already set (PKCE flow) — check for active session
      supabase.current.auth.getSession().then(({ data }) => {
        if (data.session) setStep('form')
        else setStep('invalid')
      })
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.current.auth.updateUser({ password })
      if (error) throw error
      setStep('success')
      setTimeout(() => { window.location.href = '/dashboard' }, 2000)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      if (msg.includes('Password should be at least')) setError('Password must be at least 6 characters.')
      else setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(180deg, #DBEAFE 0px, #EFF6FF 200px, #FFFFFF 600px)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 24px 64px rgba(0,0,0,0.10)' }}
      >
        <div className="h-1 w-full" style={{ background: '#2563EB' }} />
        <div className="px-8 pt-7 pb-9">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#2563EB' }}>
              <Zap size={13} className="text-white" />
            </div>
            <span className="font-black text-sm" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>OpusLearn</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 'loading' && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                <Loader2 size={28} className="animate-spin mx-auto" style={{ color: '#2563EB' }} />
              </motion.div>
            )}

            {step === 'invalid' && (
              <motion.div key="invalid" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#FEF2F2' }}>
                  <AlertCircle size={28} style={{ color: '#EF4444' }} />
                </div>
                <h2 className="text-2xl font-black mb-2" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                  Link expired
                </h2>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                  This reset link is invalid or has expired. Request a new one from the sign-in page.
                </p>
                <a
                  href="/"
                  className="block w-full py-3.5 rounded-xl text-sm font-semibold text-white text-center transition-all hover:opacity-90"
                  style={{ background: '#2563EB', boxShadow: '0 4px 16px rgba(37,99,235,0.25)', fontFamily: 'var(--font-sans)' }}
                >
                  Back to sign in
                </a>
              </motion.div>
            )}

            {step === 'form' && (
              <motion.div key="form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-black mb-1" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                  Set new password
                </h2>
                <p className="text-sm mb-7" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                  Choose a strong password for your account.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <div className="relative">
                      <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#CBD5E1' }} />
                      <input
                        type={showPw ? 'text' : 'password'}
                        placeholder="New password (min. 6 chars)"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength={6}
                        autoFocus
                        className="w-full pl-11 pr-11 py-3.5 rounded-xl text-sm outline-none transition-all"
                        style={{ background: '#EFF6FF', border: '1.5px solid #E2E8F0', color: '#0F172A', fontFamily: 'var(--font-sans)' }}
                        onFocus={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.background = '#FFFFFF' }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#EFF6FF' }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPw(v => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:text-slate-500"
                      style={{ color: '#CBD5E1' }}
                    >
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>

                  <div className="relative">
                    <div className="relative">
                      <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#CBD5E1' }} />
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Confirm new password"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        required
                        className="w-full pl-11 pr-11 py-3.5 rounded-xl text-sm outline-none transition-all"
                        style={{ background: '#EFF6FF', border: '1.5px solid #E2E8F0', color: '#0F172A', fontFamily: 'var(--font-sans)' }}
                        onFocus={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.background = '#FFFFFF' }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#EFF6FF' }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowConfirm(v => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:text-slate-500"
                      style={{ color: '#CBD5E1' }}
                    >
                      {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                        style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', fontFamily: 'var(--font-sans)' }}
                      >
                        <AlertCircle size={14} className="flex-shrink-0" />{error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                      style={{ background: '#2563EB', boxShadow: '0 4px 16px rgba(37,99,235,0.25)', fontFamily: 'var(--font-sans)' }}
                    >
                      {loading ? <><Loader2 size={14} className="animate-spin" /> Updating…</> : 'Update password'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#F0FDF4' }}>
                  <CheckCircle2 size={28} style={{ color: '#10B981' }} />
                </div>
                <h2 className="text-2xl font-black mb-2" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                  Password updated
                </h2>
                <p className="text-sm" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                  Redirecting you to the dashboard…
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
