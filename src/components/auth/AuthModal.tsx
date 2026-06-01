'use client'

import { useState, useEffect, useRef, forwardRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import type { LucideIcon } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { useTranslations } from 'next-intl'

type AuthStep = 'form' | 'payment' | 'verify' | 'forgot' | 'reset-sent'

export function AuthModal() {
  const t = useTranslations('auth')
  const { modalView, closeModal, openSignIn, openSignUp, prefillEmail, prefillFirstName } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState<AuthStep>('form')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [paymentLoading, setPaymentLoading] = useState<'monthly' | 'annual' | null>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const supabase = useRef(createClient())

  const isOpen = modalView !== 'closed'
  const isSignUp = modalView === 'signup'

  useEffect(() => {
    if (isOpen) {
      setStep('form')
      setError('')
      setPassword('')
      setFirstName(prefillFirstName)
      setLastName('')
      if (prefillEmail) setEmail(prefillEmail)
      setTimeout(() => emailRef.current?.focus(), 100)
    }
  }, [isOpen, modalView, prefillEmail, prefillFirstName])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeModal])

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Something went wrong')
      setStep('reset-sent')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isSignUp) {
        const { error } = await supabase.current.auth.signUp({
          email, password,
          options: {
            data: { full_name: [firstName, lastName].filter(Boolean).join(' ') },
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        })
        if (error) throw error
        setStep('payment')
      } else {
        const { error } = await supabase.current.auth.signInWithPassword({ email, password })
        if (error) throw error
        if (!rememberMe) {
          // Move session from localStorage → sessionStorage so it clears on tab close
          Object.keys(localStorage)
            .filter(k => k.startsWith('sb-'))
            .forEach(k => {
              const v = localStorage.getItem(k)
              if (v) sessionStorage.setItem(k, v)
              localStorage.removeItem(k)
            })
        }
        closeModal()
        const next = new URLSearchParams(window.location.search).get('next')
        router.push(next ?? '/dashboard')
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t('errors.generic')
      if (msg.includes('Invalid login credentials')) setError(t('errors.wrongCredentials'))
      else if (msg.includes('User already registered')) setError(t('errors.emailExists'))
      else if (msg.includes('Password should be at least')) setError(t('errors.passwordTooShort'))
      else if (msg.includes('fetch') || msg.includes('Failed')) setError(t('errors.connectionError'))
      else setError(msg)
    } finally {
      setLoading(false)
    }
  }

  async function handleOAuth(provider: 'google' | 'linkedin_oidc') {
    setLoading(true)
    setError('')
    try {
      const { error } = await supabase.current.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) throw error
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t('errors.generic')
      setError(msg)
      setLoading(false)
    }
  }

  async function handleCheckout(plan: 'monthly' | 'annual' | 'free') {
    if (plan === 'free') {
      closeModal()
      window.location.href = '/dashboard'
      return
    }
    setPaymentLoading(plan)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const json = await res.json() as { url?: string; error?: string }
      if (!res.ok || !json.url) {
        // Not authenticated yet (email confirm required) — fall back to verify step
        setPaymentLoading(null)
        setStep('verify')
        return
      }
      window.location.href = json.url
    } catch {
      setPaymentLoading(null)
      setStep('verify')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)' }}
            onClick={closeModal}
          >
            {/* Modal card */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-md rounded-2xl overflow-hidden"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 24px 64px rgba(0,0,0,0.12)' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Purple top accent */}
              <div className="h-1 w-full" style={{ background: '#2563EB' }} />

              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-slate-100"
                style={{ color: '#94A3B8' }}
              >
                <X size={15} />
              </button>

              <div className="px-8 pt-7 pb-9">
                {/* Logo */}
                <div className="mb-7">
                  <Logo size="sm" />
                </div>

                <AnimatePresence mode="wait">
                  {step === 'payment' ? (
                    <motion.div key="payment" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="py-2">
                      <h2 className="text-xl font-black mb-1" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                        Start your 7-day free trial
                      </h2>
                      <p className="text-sm mb-5" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                        No charge until your trial ends. Cancel anytime.
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {/* Monthly */}
                        <button onClick={() => handleCheckout('monthly')} disabled={!!paymentLoading}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, border: '2px solid #2563EB', background: '#EFF6FF', cursor: 'pointer', opacity: paymentLoading && paymentLoading !== 'monthly' ? 0.5 : 1 }}>
                          <div style={{ textAlign: 'left' }}>
                            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#0F172A', fontFamily: 'var(--font-sans)' }}>Pro — Monthly</p>
                            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748B', fontFamily: 'var(--font-sans)' }}>All tracks, all lessons, AI tutor</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            {paymentLoading === 'monthly'
                              ? <Loader2 size={16} style={{ color: '#2563EB', animation: 'spin 1s linear infinite' }} />
                              : <><p style={{ margin: 0, fontSize: 16, fontWeight: 900, color: '#2563EB', fontFamily: 'var(--font-sans)' }}>$12.99</p><p style={{ margin: 0, fontSize: 11, color: '#64748B', fontFamily: 'var(--font-sans)' }}>/month</p></>
                            }
                          </div>
                        </button>
                        {/* Annual */}
                        <button onClick={() => handleCheckout('annual')} disabled={!!paymentLoading}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, border: '2px solid #10B981', background: '#F0FDF4', cursor: 'pointer', opacity: paymentLoading && paymentLoading !== 'annual' ? 0.5 : 1, position: 'relative' }}>
                          <div style={{ position: 'absolute', top: -10, right: 12, background: '#10B981', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, fontFamily: 'var(--font-sans)' }}>SAVE 23%</div>
                          <div style={{ textAlign: 'left' }}>
                            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#0F172A', fontFamily: 'var(--font-sans)' }}>Pro — Annual</p>
                            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748B', fontFamily: 'var(--font-sans)' }}>$119.88/yr · best value</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            {paymentLoading === 'annual'
                              ? <Loader2 size={16} style={{ color: '#10B981', animation: 'spin 1s linear infinite' }} />
                              : <><p style={{ margin: 0, fontSize: 16, fontWeight: 900, color: '#10B981', fontFamily: 'var(--font-sans)' }}>$9.99</p><p style={{ margin: 0, fontSize: 11, color: '#64748B', fontFamily: 'var(--font-sans)' }}>/month</p></>
                            }
                          </div>
                        </button>
                        {/* Free */}
                        <button onClick={() => handleCheckout('free')} disabled={!!paymentLoading}
                          className="w-full py-2.5 text-sm font-medium transition-all hover:text-slate-700"
                          style={{ color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                          Continue for free →
                        </button>
                      </div>
                    </motion.div>
                  ) : step === 'verify' ? (
                    <motion.div
                      key="verify"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-4"
                    >
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: '#F0FDF4' }}>
                        <CheckCircle2 size={28} style={{ color: '#10B981' }} />
                      </div>
                      <h2 className="text-2xl font-black mb-2" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                        {t('checkEmail')}
                      </h2>
                      <p className="text-sm mb-6 leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                        {t('confirmSent', { email })}
                      </p>
                      <button
                        onClick={() => { closeModal(); router.push('/pricing') }}
                        className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: '#2563EB', boxShadow: '0 4px 16px rgba(37,99,235,0.25)', fontFamily: 'var(--font-sans)' }}
                      >
                        See plans &amp; start for free →
                      </button>
                      <button
                        onClick={closeModal}
                        className="mt-3 w-full py-2.5 rounded-xl text-sm font-medium transition-all hover:text-slate-700"
                        style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}
                      >
                        Continue without upgrading
                      </button>
                    </motion.div>
                  ) : step === 'forgot' ? (
                    <motion.div key="forgot" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      <button
                        type="button"
                        onClick={() => { setStep('form'); setError('') }}
                        className="flex items-center gap-1.5 text-xs mb-6 transition-colors hover:text-slate-700"
                        style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {t('backToSignIn')}
                      </button>
                      <h2 className="text-2xl font-black mb-1" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                        {t('resetPassword')}
                      </h2>
                      <p className="text-sm mb-7" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                        {t('resetDesc')}
                      </p>
                      <form onSubmit={handleForgot} className="space-y-3">
                        <Field ref={emailRef} icon={Mail} type="email" placeholder={t('emailPlaceholder')}
                          value={email} onChange={setEmail} required />
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
                            {loading ? <><Loader2 size={14} className="animate-spin" /> {t('sending')}</> : t('sendReset')}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  ) : step === 'reset-sent' ? (
                    <motion.div key="reset-sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: '#EFF6FF' }}>
                        <Mail size={28} style={{ color: '#2563EB' }} />
                      </div>
                      <h2 className="text-2xl font-black mb-2" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                        {t('checkEmail')}
                      </h2>
                      <p className="text-sm mb-6 leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                        {t('resetSent', { email })}
                      </p>
                      <button
                        onClick={closeModal}
                        className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: '#2563EB', boxShadow: '0 4px 16px rgba(37,99,235,0.25)', fontFamily: 'var(--font-sans)' }}
                      >
                        {t('gotIt')}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {/* Tabs */}
                      <div className="flex rounded-xl p-1 mb-7" style={{ background: '#EFF6FF', border: '1px solid #E2E8F0' }}>
                        {(['signin', 'signup'] as const).map(tab => (
                          <button
                            key={tab}
                            onClick={() => tab === 'signin' ? openSignIn() : openSignUp()}
                            className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                            style={{
                              fontFamily: 'var(--font-sans)',
                              background: modalView === tab ? '#FFFFFF' : 'transparent',
                              color: modalView === tab ? '#2563EB' : '#94A3B8',
                              boxShadow: modalView === tab ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                            }}
                          >
                            {tab === 'signin' ? t('signIn') : t('signUp')}
                          </button>
                        ))}
                      </div>

                      <h2 className="text-2xl font-black mb-1" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                        {isSignUp ? t('startJourney') : t('welcomeBack')}
                      </h2>
                      <p className="text-sm mb-5" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                        {isSignUp ? t('createToTrack') : t('signInToContinue')}
                      </p>

                      {/* Social buttons */}
                      <div className="space-y-2.5 mb-5">
                        <button
                          type="button"
                          onClick={() => handleOAuth('google')}
                          disabled={loading}
                          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-slate-50 disabled:opacity-50"
                          style={{ border: '1.5px solid #E2E8F0', color: '#0F172A', background: '#FFFFFF', fontFamily: 'var(--font-sans)' }}
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                            <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
                          </svg>
                          Continue with Google
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOAuth('linkedin_oidc')}
                          disabled={loading}
                          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                          style={{ border: '1.5px solid #0A66C2', color: '#FFFFFF', background: '#0A66C2', fontFamily: 'var(--font-sans)' }}
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <rect width="18" height="18" rx="3" fill="#0A66C2"/>
                            <path d="M4.5 7H6.5V13.5H4.5V7ZM5.5 6C4.948 6 4.5 5.552 4.5 5C4.5 4.448 4.948 4 5.5 4C6.052 4 6.5 4.448 6.5 5C6.5 5.552 6.052 6 5.5 6ZM13.5 13.5H11.5V10.25C11.5 9.284 10.716 8.5 9.75 8.5C8.784 8.5 8 9.284 8 10.25V13.5H6V7H8V8C8.386 7.386 9.144 7 10 7C11.933 7 13.5 8.567 13.5 10.5V13.5Z" fill="white"/>
                          </svg>
                          Continue with LinkedIn
                        </button>
                      </div>

                      {/* Divider */}
                      <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px" style={{ background: '#E2E8F0' }} />
                        <span className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>or continue with email</span>
                        <div className="flex-1 h-px" style={{ background: '#E2E8F0' }} />
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-3">
                        <AnimatePresence>
                          {isSignUp && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.18 }}
                            >
                              <div className="flex gap-2">
                                <Field icon={User} type="text" placeholder="First name"
                                  value={firstName} onChange={setFirstName} required={isSignUp} />
                                <Field icon={User} type="text" placeholder="Last name"
                                  value={lastName} onChange={setLastName} required={isSignUp} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <Field ref={emailRef} icon={Mail} type="email" placeholder={t('emailPlaceholder')}
                          value={email} onChange={setEmail} required />

                        <div className="relative">
                          <Field icon={Lock} type={showPw ? 'text' : 'password'}
                            placeholder={isSignUp ? t('passwordCreate') : t('password')}
                            value={password} onChange={setPassword} required minLength={6} />
                          <button
                            type="button"
                            onClick={() => setShowPw(v => !v)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:text-slate-500"
                            style={{ color: '#CBD5E1' }}
                          >
                            {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>

                        {!isSignUp && (
                          <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <div
                              onClick={() => setRememberMe(v => !v)}
                              className="relative w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                              style={{
                                background: rememberMe ? '#2563EB' : '#FFFFFF',
                                border: rememberMe ? '1.5px solid #2563EB' : '1.5px solid #CBD5E1',
                              }}
                            >
                              {rememberMe && (
                                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                                  <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={e => setRememberMe(e.target.checked)}
                              className="sr-only"
                            />
                            <span className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                              {t('rememberMe')}
                            </span>
                          </label>
                        )}

                        <AnimatePresence>
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                              style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', fontFamily: 'var(--font-sans)' }}
                            >
                              <AlertCircle size={14} className="flex-shrink-0" />
                              {error}
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
                            {loading
                              ? <><Loader2 size={14} className="animate-spin" /> {isSignUp ? t('creatingAccount') : t('signingIn')}</>
                              : isSignUp ? t('signUp') : t('signIn')
                            }
                          </button>
                        </div>

                        {isSignUp && (
                          <p className="text-center text-xs pt-1" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                            {t('terms')}{' '}
                            <Link href="/terms" target="_blank" className="underline hover:text-slate-500 transition-colors" style={{ color: '#64748B' }}>{t('termsLink')}</Link>
                            {' '}{t('and')}{' '}
                            <Link href="/privacy" target="_blank" className="underline hover:text-slate-500 transition-colors" style={{ color: '#64748B' }}>{t('privacyLink')}</Link>.
                          </p>
                        )}

                        {!isSignUp && (
                          <p className="text-center text-xs pt-1" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                            <button type="button" onClick={() => { setStep('forgot'); setError('') }} className="underline hover:text-slate-500 transition-colors" style={{ color: '#64748B' }}>
                              {t('forgotPassword')}
                            </button>
                          </p>
                        )}
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Field ────────────────────────────────────────────────────────────────────

const Field = forwardRef<HTMLInputElement, {
  icon: LucideIcon
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  minLength?: number
}>(({ icon: Icon, type, placeholder, value, onChange, required, minLength }, ref) => (
  <div className="relative">
    <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#CBD5E1' }} />
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
      minLength={minLength}
      className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
      style={{
        background: '#EFF6FF',
        border: '1.5px solid #E2E8F0',
        color: '#0F172A',
        fontFamily: 'var(--font-sans)',
      }}
      onFocus={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.background = '#FFFFFF' }}
      onBlur={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#EFF6FF' }}
    />
  </div>
))
Field.displayName = 'Field'
