'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, CheckCircle2, Users, BookOpen, ArrowRight, AlertCircle, Clock } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { getInviteByToken, acceptInvite, type TeamInvite } from '@/lib/supabase/teams'

const TRACK_COLORS: Record<string, string> = {
  marketing: '#E04D2A', finance: '#F59E0B', hr: '#10B981',
  sales: '#3B82F6', operations: '#22D3EE', leadership: '#F97316',
  legal: '#0284C7', product: '#14B8A6', customer: '#DC2626', consulting: '#0EA5E9',
}
const TRACK_LABELS: Record<string, string> = {
  marketing: 'Marketing', finance: 'Finance', hr: 'HR',
  sales: 'Sales', operations: 'Operations', leadership: 'Leadership',
  legal: 'Legal', product: 'Product', customer: 'Customer Success', consulting: 'Consulting',
}

export default function JoinPage() {
  const params = useParams()
  const token = params.token as string
  const router = useRouter()
  const { user, loading, openSignIn, openSignUp } = useAuth()

  const [invite, setInvite] = useState<TeamInvite | null>(null)
  const [fetching, setFetching] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [expired, setExpired] = useState(false)
  const [accepting, setAccepting] = useState(false)
  const [joined, setJoined] = useState(false)
  const [welcomeMsg, setWelcomeMsg] = useState<string | null>(null)

  // Store token so we can process it after auth
  useEffect(() => {
    if (token) localStorage.setItem('pending-invite-token', token)
  }, [token])

  useEffect(() => {
    if (!token) return
    getInviteByToken(token).then(inv => {
      if (!inv) { setNotFound(true); setFetching(false); return }
      if (inv.status !== 'pending' || new Date(inv.expires_at) < new Date()) {
        setExpired(true); setFetching(false); return
      }
      setInvite(inv)
      setFetching(false)
      // Load welcome message (public endpoint, no auth required)
      fetch(`/api/team/welcome?token=${token}`)
        .then(r => r.json())
        .then(data => { if (data.message) setWelcomeMsg(data.message) })
        .catch(() => {})
    })
  }, [token])

  // Auto-process invite if user just signed in with a pending token
  useEffect(() => {
    if (!user || !invite || joined) return
    const pending = localStorage.getItem('pending-invite-token')
    if (pending === token) {
      handleAccept()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, invite])

  async function handleAccept() {
    if (!user || !invite) return
    setAccepting(true)
    const displayName = user.user_metadata?.full_name
      ?? user.email?.split('@')[0]
      ?? 'Team member'
    const ok = await acceptInvite(token, user.id, displayName, user.email ?? invite.email)
    if (ok) {
      localStorage.removeItem('pending-invite-token')
      setJoined(true)
      setTimeout(() => router.replace('/dashboard'), 2500)
    }
    setAccepting(false)
  }

  if (fetching || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F0FDFA' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: '#0D9488', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: '#F0FDFA', fontFamily: 'var(--font-sans)' }}>
        <AlertCircle size={40} className="mb-4" style={{ color: '#CBD5E1' }} />
        <h1 className="text-2xl font-black mb-2" style={{ color: '#0F172A' }}>Invite not found</h1>
        <p className="text-base mb-8 max-w-sm" style={{ color: '#64748B' }}>
          This invite link doesn't exist or has already been used.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
          style={{ background: '#0D9488' }}>
          Go to AI Literacy
        </Link>
      </div>
    )
  }

  if (expired) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: '#F0FDFA', fontFamily: 'var(--font-sans)' }}>
        <Clock size={40} className="mb-4" style={{ color: '#FCD34D' }} />
        <h1 className="text-2xl font-black mb-2" style={{ color: '#0F172A' }}>Invite expired</h1>
        <p className="text-base mb-8 max-w-sm" style={{ color: '#64748B' }}>
          This invite link has expired. Ask your team admin to send a new one.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
          style={{ background: '#0D9488' }}>
          Go to AI Literacy
        </Link>
      </div>
    )
  }

  if (joined) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: '#F0FDFA', fontFamily: 'var(--font-sans)' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
          <CheckCircle2 size={56} className="mx-auto mb-5" style={{ color: '#10B981' }} />
          <h1 className="text-3xl font-black mb-2" style={{ color: '#0F172A' }}>
            You're in! 🎉
          </h1>
          <p className="text-base mb-3" style={{ color: '#64748B' }}>
            You've joined <strong style={{ color: '#0F172A' }}>
              {(invite as TeamInvite & { teams?: { name: string } }).teams?.name ?? 'the team'}
            </strong>.
          </p>
          <p className="text-sm" style={{ color: '#94A3B8' }}>Redirecting to your dashboard…</p>
        </motion.div>
      </div>
    )
  }

  const teamName = (invite as TeamInvite & { teams?: { name: string } })?.teams?.name ?? 'a team'
  const assignedTracks = invite?.assigned_tracks ?? []

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: '#F0FDFA', fontFamily: 'var(--font-sans)' }}>
      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 px-6 py-4 flex items-center"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#0D9488' }}>
            <Zap size={13} className="text-white" />
          </div>
          <span className="font-black text-base" style={{ color: '#0F172A' }}>AI Literacy</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mt-8">

        {/* Card */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center"
            style={{ background: 'linear-gradient(135deg, #CCFBF1, #F0FDF4)', borderBottom: '1px solid #E2E8F0' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <Users size={26} style={{ color: '#0D9488' }} />
            </div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#0D9488' }}>Team invitation</p>
            <h1 className="text-2xl font-black mb-1" style={{ color: '#0F172A' }}>
              You've been invited to join
            </h1>
            <p className="text-xl font-black" style={{ color: '#0D9488' }}>{teamName}</p>
          </div>

          <div className="p-8">
            {/* Assigned tracks */}
            {assignedTracks.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#94A3B8' }}>
                  Your assigned tracks
                </p>
                <div className="flex flex-wrap gap-2">
                  {assignedTracks.map(t => (
                    <span key={t}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
                      style={{
                        background: `${TRACK_COLORS[t] ?? '#0D9488'}12`,
                        color: TRACK_COLORS[t] ?? '#0D9488',
                        border: `1px solid ${TRACK_COLORS[t] ?? '#0D9488'}30`,
                      }}>
                      <BookOpen size={10} />
                      {TRACK_LABELS[t] ?? t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Welcome message from admin */}
            {welcomeMsg && (
              <div className="mb-5 p-4 rounded-xl"
                style={{ background: '#F0FDFA', border: '1px solid #CCFBF1' }}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
                  style={{ color: '#0D9488' }}>Message from your team</p>
                <p className="text-sm leading-relaxed" style={{ color: '#334155' }}>{welcomeMsg}</p>
              </div>
            )}

            {/* What you get */}
            <div className="space-y-2.5 mb-7">
              {[
                'Access to all 10 role-specific AI tracks',
                'Progress tracked alongside your team',
                'Individual AI Literacy certificate on completion',
                'AI practice tool for each lesson',
              ].map(item => (
                <div key={item} className="flex items-center gap-2.5 text-sm" style={{ color: '#475569' }}>
                  <CheckCircle2 size={14} style={{ color: '#10B981', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>

            {/* CTA */}
            {user ? (
              <button
                onClick={handleAccept}
                disabled={accepting}
                className="w-full py-4 rounded-xl font-semibold text-base text-white transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: '#0D9488', boxShadow: '0 4px 16px rgba(13,148,136,0.25)' }}>
                {accepting ? (
                  <span className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
                    style={{ borderColor: 'rgba(255,255,255,0.5)', borderTopColor: 'transparent' }} />
                ) : (
                  <>Accept invitation <ArrowRight size={15} /></>
                )}
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={openSignUp}
                  className="w-full py-4 rounded-xl font-semibold text-base text-white transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ background: '#0D9488', boxShadow: '0 4px 16px rgba(13,148,136,0.25)' }}>
                  Create account & join <ArrowRight size={15} />
                </button>
                <button
                  onClick={openSignIn}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:bg-slate-100"
                  style={{ color: '#475569', background: '#F0FDFA', border: '1px solid #E2E8F0' }}>
                  I already have an account — sign in
                </button>
                <p className="text-center text-xs" style={{ color: '#94A3B8' }}>
                  Free forever · No credit card required
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
