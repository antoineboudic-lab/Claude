'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Eye, EyeOff, Zap, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabase/client'

type AuthStep = 'form' | 'verify'

export function AuthModal() {
  const { modalView, closeModal, openSignIn, openSignUp } = useAuth()
  const [step, setStep] = useState<AuthStep>('form')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)
  const supabase = useRef(createClient())

  const isOpen = modalView !== 'closed'
  const isSignUp = modalView === 'signup'

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('form')
      setError('')
      setPassword('')
      setTimeout(() => emailRef.current?.focus(), 100)
    }
  }, [isOpen, modalView])

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeModal])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        const { error } = await supabase.current.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        })
        if (error) throw error
        setStep('verify')
      } else {
        const { error } = await supabase.current.auth.signInWithPassword({ email, password })
        if (error) throw error
        closeModal()
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      // Make Supabase errors friendlier
      if (msg.includes('Invalid login credentials')) setError('Incorrect email or password.')
      else if (msg.includes('User already registered')) setError('An account with this email already exists.')
      else if (msg.includes('Password should be at least')) setError('Password must be at least 6 characters.')
      else if (msg.includes('fetch') || msg.includes('Failed')) setError('Connection error — check your internet and try again.')
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
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={closeModal}
          >
            {/* Modal card */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-md rounded-3xl overflow-hidden"
              style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.1)' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Gradient top bar */}
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #8B5CF6, #22D3EE)' }} />

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ color: '#64748B' }}
              >
                <X size={16} />
              </button>

              <div className="px-8 pt-8 pb-10">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #22D3EE)' }}>
                    <Zap size={15} className="text-white" />
                  </div>
                  <span className="font-bold text-white" style={{ fontFamily: 'var(--font-sans)' }}>AI Literacy</span>
                </div>

                {/* Verify email state */}
                <AnimatePresence mode="wait">
                  {step === 'verify' ? (
                    <motion.div
                      key="verify"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-4"
                    >
                      <CheckCircle2 size={48} color="#22D3EE" className="mx-auto mb-4" />
                      <h2 className="text-2xl font-black mb-2" style={{ fontFamily: 'var(--font-sans)', color: '#F1F5F9' }}>
                        Check your email
                      </h2>
                      <p className="text-sm mb-6" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                        We sent a confirmation link to <strong style={{ color: '#94A3B8' }}>{email}</strong>.
                        Click it to activate your account.
                      </p>
                      <button
                        onClick={closeModal}
                        className="w-full py-3 rounded-xl text-sm font-semibold text-white"
                        style={{ background: 'linear-gradient(135deg, #8B5CF6, #22D3EE)', fontFamily: 'var(--font-sans)' }}
                      >
                        Got it
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {/* Tabs */}
                      <div className="flex rounded-xl p-1 mb-8" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        {(['signin', 'signup'] as const).map(tab => (
                          <button
                            key={tab}
                            onClick={() => tab === 'signin' ? openSignIn() : openSignUp()}
                            className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                            style={{
                              fontFamily: 'var(--font-sans)',
                              background: modalView === tab ? 'rgba(139,92,246,0.15)' : 'transparent',
                              color: modalView === tab ? '#A78BFA' : '#475569',
                              border: modalView === tab ? '1px solid rgba(139,92,246,0.3)' : '1px solid transparent',
                            }}
                          >
                            {tab === 'signin' ? 'Sign in' : 'Create account'}
                          </button>
                        ))}
                      </div>

                      <h2 className="text-2xl font-black mb-1" style={{ fontFamily: 'var(--font-sans)', color: '#F1F5F9' }}>
                        {isSignUp ? 'Start your AI journey' : 'Welcome back'}
                      </h2>
                      <p className="text-sm mb-8" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                        {isSignUp ? 'Create your account to track progress and save your path.' : 'Sign in to continue where you left off.'}
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name (sign up only) */}
                        <AnimatePresence>
                          {isSignUp && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Field
                                icon={User}
                                type="text"
                                placeholder="Your name"
                                value={name}
                                onChange={setName}
                                required={isSignUp}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <Field
                          ref={emailRef}
                          icon={Mail}
                          type="email"
                          placeholder="Email address"
                          value={email}
                          onChange={setEmail}
                          required
                        />

                        <div className="relative">
                          <Field
                            icon={Lock}
                            type={showPw ? 'text' : 'password'}
                            placeholder={isSignUp ? 'Create a password' : 'Password'}
                            value={password}
                            onChange={setPassword}
                            required
                            minLength={6}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPw(v => !v)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:text-slate-300"
                            style={{ color: '#475569' }}
                          >
                            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#FCA5A5', fontFamily: 'var(--font-sans)' }}
                            >
                              <AlertCircle size={14} className="flex-shrink-0" />
                              {error}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                          style={{
                            background: 'linear-gradient(135deg, #8B5CF6, #22D3EE)',
                            boxShadow: '0 0 24px rgba(139,92,246,0.3)',
                            fontFamily: 'var(--font-sans)',
                          }}
                        >
                          {loading
                            ? <><Loader2 size={15} className="animate-spin" /> {isSignUp ? 'Creating account…' : 'Signing in…'}</>
                            : isSignUp ? 'Create account' : 'Sign in'
                          }
                        </button>

                        {/* Sign up legal */}
                        {isSignUp && (
                          <p className="text-center text-xs" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
                            By creating an account you agree to our{' '}
                            <span className="underline cursor-pointer hover:text-slate-400" style={{ color: '#475569' }}>Terms</span>
                            {' '}and{' '}
                            <span className="underline cursor-pointer hover:text-slate-400" style={{ color: '#475569' }}>Privacy Policy</span>.
                          </p>
                        )}

                        {/* Forgot password (sign in only) */}
                        {!isSignUp && (
                          <p className="text-center text-xs" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                            <button type="button" className="underline hover:text-slate-300 transition-colors">
                              Forgot your password?
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

// ─── Field component ──────────────────────────────────────────────────────────

import { forwardRef } from 'react'
import type { LucideIcon } from 'lucide-react'

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
    <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#475569' }} />
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
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#F1F5F9',
        fontFamily: 'var(--font-sans)',
      }}
      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)' }}
      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
    />
  </div>
))
Field.displayName = 'Field'
