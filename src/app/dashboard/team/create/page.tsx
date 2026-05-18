'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Users, Check, ArrowRight, Building2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { createTeam, getAdminTeam } from '@/lib/supabase/teams'
import type { Team } from '@/lib/supabase/teams'

const PLANS = [
  { id: 'starter' as const, label: 'Starter', seats: '5–15 seats', price: '$49/seat/mo', color: '#10B981' },
  { id: 'growth' as const, label: 'Growth', seats: '16–50 seats', price: '$39/seat/mo', color: '#7C3AED', popular: true },
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
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8FAFC' }}>
      <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: '#7C3AED', borderTopColor: 'transparent' }} />
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: '#F8FAFC', fontFamily: 'var(--font-sans)' }}>
      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#7C3AED' }}>
            <Zap size={13} className="text-white" />
          </div>
          <span className="font-black text-base" style={{ color: '#0F172A' }}>AI Literacy</span>
        </Link>
        <Link href="/dashboard" className="text-sm font-medium hover:underline" style={{ color: '#64748B' }}>
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
            style={{ background: '#EDE9FE' }}>
            <Users size={26} style={{ color: '#7C3AED' }} />
          </div>
          <h1 className="text-3xl font-black mb-2" style={{ color: '#0F172A' }}>Create your team</h1>
          <p className="text-base" style={{ color: '#64748B' }}>
            Set up your team workspace to invite members, assign tracks, and track progress.
          </p>
        </div>

        <form onSubmit={handleCreate} className="space-y-6">
          {/* Team name */}
          <div className="rounded-2xl p-6"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <label className="block text-sm font-bold mb-2" style={{ color: '#0F172A' }}>
              Team name
            </label>
            <div className="flex items-center gap-2 px-4 rounded-xl"
              style={{ border: '1.5px solid #E2E8F0', background: '#FAFBFC' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#7C3AED')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#E2E8F0')}>
              <Building2 size={15} style={{ color: '#94A3B8' }} />
              <input
                type="text" required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Acme Corp — Marketing Team"
                className="flex-1 py-3 text-sm outline-none bg-transparent"
                style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}
              />
            </div>
          </div>

          {/* Plan selection */}
          <div className="rounded-2xl p-6"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <label className="block text-sm font-bold mb-4" style={{ color: '#0F172A' }}>
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
                    border: `2px solid ${plan === p.id ? p.color : '#E2E8F0'}`,
                    background: plan === p.id ? `${p.color}06` : '#FAFBFC',
                  }}>
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: plan === p.id ? p.color : '#CBD5E1' }}>
                    {plan === p.id && <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: '#0F172A' }}>{p.label}</span>
                      {p.popular && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                          style={{ background: '#EDE9FE', color: '#7C3AED' }}>Most popular</span>
                      )}
                    </div>
                    <span className="text-xs" style={{ color: '#94A3B8' }}>{p.seats}</span>
                  </div>
                  <span className="text-sm font-bold flex-shrink-0" style={{ color: plan === p.id ? p.color : '#64748B' }}>
                    {p.price}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: '#94A3B8' }}>
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
            style={{ background: '#7C3AED', boxShadow: '0 4px 16px rgba(124,58,237,0.25)' }}>
            {creating ? (
              <span className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
                style={{ borderColor: 'rgba(255,255,255,0.5)', borderTopColor: 'transparent' }} />
            ) : (
              <><Check size={16} /> Create team</>
            )}
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: '#94A3B8' }}>
          Looking for individual access?{' '}
          <Link href="/dashboard" className="font-semibold hover:underline" style={{ color: '#7C3AED' }}>
            Go to your personal dashboard
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
