'use client'

import { useState, useEffect, useRef, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import Logo from '@/components/Logo'
import type { LucideIcon } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { useTranslations } from 'next-intl'

type AuthStep = 'form' | 'verify' | 'forgot' | 'reset-sent'

export function AuthModal() {
  const t = useTranslations('auth')
  const { modalView, closeModal, openSignIn, openSignUp, prefillEmail } = useAuth()
  const [step, setStep] = useState<AuthStep>('form')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)
  const supabase = useRef(createClient())

  const isOpen = modalView !== 'closed'
  const isSignUp = modalView === 'signup'

  useEffect(() => {
    if (isOpen) {
      setStep('form')
      setError('')
      setPassword('')
      if (prefillEmail) setEmail(prefillEmail)
      setTimeout(() => emailRef.current?.focus(), 100)
    }
  }, [isOpen, modalView, prefillEmail])

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
      const redirectTo = `${window.location.origin}/auth/callback?next=/auth/reset`
      const { error } = await supabase.current.auth.resetPasswordForEmail(email, { redirectTo })
      if (error) throw error
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
          options: { data: { full_name: name } },
        })
        if (error) throw error
        setStep('verify')
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
                  {step === 'verify' ? (
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
                        onClick={closeModal}
                        className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: '#2563EB', boxShadow: '0 4px 16px rgba(37,99,235,0.25)', fontFamily: 'var(--font-sans)' }}
                      >
                        {t('gotIt')}
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
                      <p className="text-sm mb-7" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                        {isSignUp ? t('createToTrack') : t('signInToContinue')}
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-3">
                        <AnimatePresence>
                          {isSignUp && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.18 }}
                            >
                              <Field icon={User} type="text" placeholder={t('namePlaceholder')}
                                value={name} onChange={setName} required={isSignUp} />
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
                            <span className="underline cursor-pointer hover:text-slate-500" style={{ color: '#64748B' }}>{t('termsLink')}</span>
                            {' '}{t('and')}{' '}
                            <span className="underline cursor-pointer hover:text-slate-500" style={{ color: '#64748B' }}>{t('privacyLink')}</span>.
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
