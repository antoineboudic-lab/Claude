'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, Check, ArrowRight, Building2 } from 'lucide-react'
import Logo from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'
import { createTeam, getAdminTeam } from '@/lib/supabase/teams'
import type { Team } from '@/lib/supabase/teams'
import {
  PAPER, PAPER_2, PANEL, INK, INK_SOFT, INK_FAINT,
  COBALT, RULE, SERIF, SANS,
} from "@/components/editorial/theme"

const PLANS = [
  { id: 'starter' as const, label: 'Starter', seats: '5–15 seats', price: '$49/seat/mo', color: '#10B981' },
  { id: 'growth' as const, label: 'Growth', seats: '16–50 seats', price: '$39/seat/mo', color: COBALT, popular: true },
  { id: 'enterprise' as const, label: 'Enterprise', seats: '50+ seats', price: 'Custom', color: '#0EA5E9' },
]

export default function CreateTeamPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [name, setName] = useState('')
  const [plan, setPlan] = useState<Team['plan']>('starter')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (loading || !user) return
    // Already has a team — redirect
    getAdminTeam(user.id).then(t => {
      if (t) router.replace('/dashboard/team')
    })
  }, [user, loading, router])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !name.trim()) return
    setCreating(true)
    setError('')
    const team = await createTeam(user.id, name.trim(), plan)
    if (team) {
      router.replace('/dashboard/team')
    } else {
      setError('Could not create team. Please try again.')
      setCreating(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: PAPER }}>
      <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: COBALT, borderTopColor: 'transparent' }} />
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: PAPER, fontFamily: SANS }}>
      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${RULE}` }}>
        <Link href="/" className="flex items-center gap-2">
          <Logo size="md" />
        </Link>
        <Link href="/dashboard" className="text-sm font-medium hover:underline" style={{ color: INK_SOFT }}>
          Back to my dashboard
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg mt-12">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(36,64,216,0.12)' }}>
            <Users size={26} style={{ color: COBALT }} />
          </div>
          <h1 className="text-3xl mb-2" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>Create your team</h1>
          <p className="text-base" style={{ color: INK_SOFT }}>
            Set up your team workspace to invite members, assign tracks, and track progress.
          </p>
        </div>

        <form onSubmit={handleCreate} className="space-y-6">
          {/* Team name */}
          <div className="rounded-2xl p-6"
            style={{ background: PAPER_2, border: `1px solid ${RULE}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <label className="block text-sm font-bold mb-2" style={{ color: INK }}>
              Team name
            </label>
            <div className="flex items-center gap-2 px-4 rounded-xl"
              style={{ border: `1.5px solid ${RULE}`, background: PANEL }}
              onFocus={(e) => (e.currentTarget.style.borderColor = COBALT)}
              onBlur={(e) => (e.currentTarget.style.borderColor = RULE)}>
              <Building2 size={15} style={{ color: INK_FAINT }} />
              <input
                type="text" required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Acme Corp — Marketing Team"
                className="flex-1 py-3 text-sm outline-none bg-transparent"
                style={{ color: INK, fontFamily: SANS }}
              />
            </div>
          </div>

          {/* Plan selection */}
          <div className="rounded-2xl p-6"
            style={{ background: PAPER_2, border: `1px solid ${RULE}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <label className="block text-sm font-bold mb-4" style={{ color: INK }}>
              Team plan
            </label>
            <div className="space-y-3">
              {PLANS.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlan(p.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left"
                  style={{
                    border: `2px solid ${plan === p.id ? p.color : RULE}`,
                    background: plan === p.id ? `${p.color}06` : PANEL,
                  }}>
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: plan === p.id ? p.color : INK_FAINT }}>
                    {plan === p.id && <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>{p.label}</span>
                      {p.popular && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                          style={{ background: 'rgba(36,64,216,0.12)', color: COBALT }}>Most popular</span>
                      )}
                    </div>
                    <span className="text-xs" style={{ color: INK_FAINT }}>{p.seats}</span>
                  </div>
                  <span className="text-sm font-bold flex-shrink-0" style={{ color: plan === p.id ? p.color : INK_SOFT }}>
                    {p.price}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: INK_FAINT }}>
              You can change your plan at any time. Billing starts when you add paid seats.
            </p>
          </div>

          {error && (
            <p className="text-sm text-center font-medium" style={{ color: '#EF4444' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={creating || !name.trim()}
            className="w-full py-4 rounded-xl font-semibold text-base text-white transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ background: COBALT, boxShadow: '0 4px 16px rgba(36,64,216,0.25)' }}>
            {creating ? (
              <span className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
                style={{ borderColor: 'rgba(255,255,255,0.5)', borderTopColor: 'transparent' }} />
            ) : (
              <><Check size={16} /> Create team</>
            )}
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: INK_FAINT }}>
          Looking for individual access?{' '}
          <Link href="/dashboard" className="font-semibold hover:underline" style={{ color: COBALT }}>
            Go to your personal dashboard
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
