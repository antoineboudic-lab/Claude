'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/Logo'
import { GrainOverlay } from '@/components/editorial/Atmosphere'
import {
  PAPER, PAPER_2, INK, INK_SOFT, INK_FAINT,
  COBALT, RULE, SERIF, SANS,
} from '@/components/editorial/theme'

type Step = 'loading' | 'form' | 'success' | 'invalid'

export default function TeamSetupPage() {
  const [step, setStep] = useState<Step>('loading')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
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

    const nameParam = new URLSearchParams(window.location.search).get('name')
    if (nameParam) {
      const parts = nameParam.trim().split(' ')
      setFirstName(parts[0] ?? '')
      setLastName(parts.slice(1).join(' '))
    }

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
    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ')
    const { error: updateError } = await supabase.auth.updateUser({
      password,
      data: { full_name: fullName || undefined },
    })

    if (updateError) {
      setError(updateError.message)
      setSubmitting(false)
      return
    }

    setStep('success')
    // Hard navigation so the new page reads the session fresh from cookies
    // (avoids a race with onAuthStateChange SIGNED_OUT in the SPA context)
    setTimeout(() => { window.location.href = '/dashboard/team' }, 1500)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: 6,
    border: `1.5px solid ${RULE}`, fontSize: 14, color: INK,
    fontFamily: SANS, background: PAPER_2, outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <main style={{ background: PAPER, minHeight: '100vh', fontFamily: SANS, display: 'flex', flexDirection: 'column' }}>
      <GrainOverlay />
      <nav style={{ position: 'relative', padding: '16px 24px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${RULE}` }}>
        <Link href="/" className="inline-flex items-center">
          <Logo size="md" />
        </Link>
      </nav>

      <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ background: PAPER_2, border: `1px solid ${RULE}`, borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 3px rgba(26,27,31,0.04)' }}>
            <div style={{ background: COBALT, height: 4 }} />
            <div style={{ padding: '32px' }}>
              <AnimatePresence mode="wait">
                {step === 'loading' && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ textAlign: 'center', padding: '20px 0' }}>
                    <Loader2 size={28} style={{ color: COBALT, margin: '0 auto 12px', display: 'block', animation: 'spin 1s linear infinite' }} />
                    <p style={{ margin: 0, fontSize: 14, color: INK_SOFT, fontFamily: SANS }}>Setting up your account…</p>
                  </motion.div>
                )}

                {step === 'invalid' && (
                  <motion.div key="invalid" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
                    <AlertCircle size={36} style={{ color: '#EF4444', margin: '0 auto 12px', display: 'block' }} />
                    <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', color: INK, fontFamily: SERIF }}>Link expired</h2>
                    <p style={{ margin: '0 0 20px', fontSize: 14, color: INK_SOFT, fontFamily: SANS }}>
                      This setup link has expired or already been used. Reply to your setup email to request a new one.
                    </p>
                    <a href="mailto:antoine@opuslearn.ai?subject=New setup link needed"
                      style={{ display: 'inline-block', padding: '10px 20px', borderRadius: 3, background: COBALT, color: '#FFFFFF', fontSize: 13, fontWeight: 600, textDecoration: 'none', fontFamily: SANS }}>
                      Request a new link
                    </a>
                  </motion.div>
                )}

                {step === 'form' && (
                  <motion.div key="form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 style={{ margin: '0 0 6px', fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em', color: INK, fontFamily: SERIF }}>Activate your account</h1>
                    <p style={{ margin: '0 0 24px', fontSize: 14, color: INK_SOFT, fontFamily: SANS }}>Set your name and a password to access your team dashboard.</p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: INK_SOFT, marginBottom: 6, fontFamily: SANS }}>First name</label>
                          <input value={firstName} onChange={e => setFirstName(e.target.value)}
                            placeholder="Sophie" style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: INK_SOFT, marginBottom: 6, fontFamily: SANS }}>Last name</label>
                          <input value={lastName} onChange={e => setLastName(e.target.value)}
                            placeholder="Martin" style={inputStyle} />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: INK_SOFT, marginBottom: 6, fontFamily: SANS }}>Password</label>
                        <div style={{ position: 'relative' }}>
                          <input type={showPassword ? 'text' : 'password'} value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="At least 8 characters" required style={{ ...inputStyle, paddingRight: 44 }} />
                          <button type="button" onClick={() => setShowPassword(v => !v)}
                            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: INK_FAINT, display: 'flex' }}>
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {error && (
                        <p style={{ margin: 0, fontSize: 13, color: '#EF4444', fontFamily: SANS }}>{error}</p>
                      )}

                      <button type="submit" disabled={submitting}
                        style={{ padding: '13px', borderRadius: 3, background: COBALT, color: '#FFFFFF', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: submitting ? 0.7 : 1, fontFamily: SANS }}>
                        {submitting ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : null}
                        {submitting ? 'Activating…' : 'Activate account →'}
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '8px 0' }}>
                    <CheckCircle2 size={40} style={{ color: '#10B981', margin: '0 auto 12px', display: 'block' }} />
                    <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em', color: INK, fontFamily: SERIF }}>You&apos;re all set</h2>
                    <p style={{ margin: 0, fontSize: 14, color: INK_SOFT, fontFamily: SANS }}>Taking you to your team dashboard…</p>
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
