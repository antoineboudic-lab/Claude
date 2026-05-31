'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/Logo'

type Step = 'loading' | 'form' | 'success' | 'invalid'

export default function TeamSetupPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('loading')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const supabase = createClient()
    const hash = window.location.hash.slice(1)
    const params = new URLSearchParams(hash)
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')

    if (!accessToken || !refreshToken) {
      setStep('invalid')
      return
    }

    supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
      .then(({ error }) => {
        if (error) { setStep('invalid'); return }
        setStep('form')
      })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setSubmitting(true)
    setError('')

    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({
      password,
      data: { full_name: name.trim() || undefined },
    })

    if (updateError) {
      setError(updateError.message)
      setSubmitting(false)
      return
    }

    setStep('success')
    setTimeout(() => router.push('/dashboard/team'), 1500)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: 12,
    border: '1.5px solid #E2E8F0', fontSize: 14, color: '#0F172A',
    fontFamily: 'var(--font-sans)', background: '#FFFFFF', outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <main style={{ background: '#EFF6FF', minHeight: '100vh', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="inline-flex items-center">
          <Logo size="md" />
        </Link>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ background: '#2563EB', height: 4 }} />
            <div style={{ padding: '32px' }}>
              <AnimatePresence mode="wait">
                {step === 'loading' && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ textAlign: 'center', padding: '20px 0' }}>
                    <Loader2 size={28} style={{ color: '#2563EB', margin: '0 auto 12px', display: 'block', animation: 'spin 1s linear infinite' }} />
                    <p style={{ margin: 0, fontSize: 14, color: '#64748B' }}>Setting up your account…</p>
                  </motion.div>
                )}

                {step === 'invalid' && (
                  <motion.div key="invalid" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
                    <AlertCircle size={36} style={{ color: '#EF4444', margin: '0 auto 12px', display: 'block' }} />
                    <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 900, color: '#0F172A' }}>Link expired</h2>
                    <p style={{ margin: '0 0 20px', fontSize: 14, color: '#64748B' }}>
                      This setup link has expired or already been used. Reply to your setup email to request a new one.
                    </p>
                    <a href="mailto:antoine@opuslearn.ai?subject=New setup link needed"
                      style={{ display: 'inline-block', padding: '10px 20px', borderRadius: 10, background: '#2563EB', color: '#FFFFFF', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                      Request a new link
                    </a>
                  </motion.div>
                )}

                {step === 'form' && (
                  <motion.div key="form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 900, color: '#0F172A' }}>Activate your account</h1>
                    <p style={{ margin: '0 0 24px', fontSize: 14, color: '#64748B' }}>Set your name and a password to access your team dashboard.</p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>Your name</label>
                        <input value={name} onChange={e => setName(e.target.value)}
                          placeholder="Sophie Martin" style={inputStyle} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>Password</label>
                        <div style={{ position: 'relative' }}>
                          <input type={showPassword ? 'text' : 'password'} value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="At least 8 characters" required style={{ ...inputStyle, paddingRight: 44 }} />
                          <button type="button" onClick={() => setShowPassword(v => !v)}
                            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex' }}>
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {error && (
                        <p style={{ margin: 0, fontSize: 13, color: '#EF4444' }}>{error}</p>
                      )}

                      <button type="submit" disabled={submitting}
                        style={{ padding: '13px', borderRadius: 12, background: '#2563EB', color: '#FFFFFF', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: submitting ? 0.7 : 1 }}>
                        {submitting ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : null}
                        {submitting ? 'Activating…' : 'Activate account →'}
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '8px 0' }}>
                    <CheckCircle2 size={40} style={{ color: '#10B981', margin: '0 auto 12px', display: 'block' }} />
                    <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 900, color: '#0F172A' }}>You're all set</h2>
                    <p style={{ margin: 0, fontSize: 14, color: '#64748B' }}>Taking you to your team dashboard…</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
