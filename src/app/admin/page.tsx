import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import { Users, Zap, BookOpen, Target, TrendingUp, Award, Clock } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserRow {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
  user_metadata: { full_name?: string }
}

interface ProgressRow {
  user_id: string
  xp: number
  streak: number
  completed_lessons: string[]
  completed_tracks: string[]
  earned_badges: string[]
  updated_at: string
}

interface AssessmentRow {
  user_id: string
  primary_track_id: string
  essential_count: number
  total_lessons: number
  created_at: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TRACK_COLORS: Record<string, string> = {
  marketing: '#EC4899',
  finance: '#F59E0B',
  hr: '#10B981',
  sales: '#8B5CF6',
  operations: '#22D3EE',
  leadership: '#F97316',
}

function fmt(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function timeAgo(date: string | null) {
  if (!date) return '—'
  const diff = Date.now() - new Date(date).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days}d ago`
  return fmt(date)
}

// ─── Server Component ─────────────────────────────────────────────────────────

export default async function AdminPage() {
  const admin = createAdminClient()

  const { data: { users } } = await admin.auth.admin.listUsers({ perPage: 500 })
  const typedUsers = (users ?? []) as unknown as UserRow[]

  const { data: progressRows } = await admin
    .from('user_progress')
    .select('*')
    .order('updated_at', { ascending: false })
  const progress: ProgressRow[] = progressRows ?? []

  const { data: assessmentRows } = await admin
    .from('user_assessments')
    .select('user_id, primary_track_id, essential_count, total_lessons, created_at')
    .order('created_at', { ascending: false })
  const assessments: AssessmentRow[] = assessmentRows ?? []

  const progressById = Object.fromEntries(progress.map(p => [p.user_id, p]))
  const assessmentById = Object.fromEntries(assessments.map(a => [a.user_id, a]))

  const totalUsers = typedUsers.length
  const usersWithProgress = progress.filter(p => p.completed_lessons.length > 0).length
  const totalLessonsCompleted = progress.reduce((acc, p) => acc + (p.completed_lessons?.length ?? 0), 0)
  const totalXP = progress.reduce((acc, p) => acc + (p.xp ?? 0), 0)
  const usersWithAssessment = new Set(assessments.map(a => a.user_id)).size

  const trackCounts: Record<string, number> = {}
  assessments.forEach(a => {
    trackCounts[a.primary_track_id] = (trackCounts[a.primary_track_id] ?? 0) + 1
  })
  const sortedTracks = Object.entries(trackCounts).sort((a, b) => b[1] - a[1])

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().split('T')[0]
  })
  const signupsByDay = Object.fromEntries(last7.map(d => [d, 0]))
  typedUsers.forEach(u => {
    const day = u.created_at.split('T')[0]
    if (day in signupsByDay) signupsByDay[day]++
  })
  const maxSignups = Math.max(...Object.values(signupsByDay), 1)

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC', color: '#0F172A' }}>
      {/* Nav */}
      <nav className="px-8 py-4 flex items-center justify-between"
        style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #22D3EE)' }}>
              <Zap size={13} className="text-white" />
            </div>
            <span className="font-bold text-white text-sm" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              AI Literacy
            </span>
          </Link>
          <span style={{ color: '#E2E8F0' }}>/</span>
          <span className="text-sm font-semibold" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>Admin</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-lg font-semibold"
          style={{ background: '#FEE2E2', color: '#DC2626', fontFamily: 'var(--font-sans)', border: '1px solid #FECACA' }}>
          Internal only
        </span>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
            Backend Overview
          </h1>
          <p className="text-sm" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
            Live data from Supabase · refreshes on page load
          </p>
        </div>

        {/* ── Top stats ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Users, label: 'Total users', value: totalUsers, color: '#7C3AED' },
            { icon: Target, label: 'Took assessment', value: usersWithAssessment, color: '#22D3EE' },
            { icon: BookOpen, label: 'Lessons completed', value: totalLessonsCompleted, color: '#10B981' },
            { icon: Zap, label: 'Total XP earned', value: totalXP.toLocaleString(), color: '#F59E0B' },
          ].map(stat => (
            <div key={stat.label} className="p-5 rounded-2xl"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${stat.color}12` }}>
                <stat.icon size={15} style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-black mb-0.5" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Charts row ─────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          {/* Signups last 7 days */}
          <div className="p-6 rounded-2xl"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={15} style={{ color: '#22D3EE' }} />
              <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                Signups — last 7 days
              </p>
            </div>
            <div className="flex items-end gap-2 h-24">
              {last7.map(day => {
                const count = signupsByDay[day]
                const h = maxSignups > 0 ? Math.max((count / maxSignups) * 100, count > 0 ? 8 : 2) : 2
                const label = new Date(day + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short' })
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1">
                    <p className="text-xs font-bold" style={{ color: count > 0 ? '#22D3EE' : '#E2E8F0', fontFamily: 'var(--font-sans)', minHeight: 16 }}>
                      {count > 0 ? count : ''}
                    </p>
                    <div className="w-full rounded-t-lg transition-all"
                      style={{ height: `${h}%`, background: count > 0 ? 'linear-gradient(180deg, #22D3EE, #7C3AED)' : '#F1F5F9', minHeight: 4 }} />
                    <p className="text-[10px]" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>{label}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Track distribution */}
          <div className="p-6 rounded-2xl"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-2 mb-6">
              <Target size={15} style={{ color: '#7C3AED' }} />
              <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                Track distribution
              </p>
            </div>
            {sortedTracks.length === 0 ? (
              <p className="text-sm" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>No assessments taken yet</p>
            ) : (
              <div className="space-y-3">
                {sortedTracks.map(([track, count]) => {
                  const color = TRACK_COLORS[track] ?? '#94A3B8'
                  const pct = Math.round((count / usersWithAssessment) * 100)
                  return (
                    <div key={track}>
                      <div className="flex items-center justify-between text-xs mb-1.5" style={{ fontFamily: 'var(--font-sans)' }}>
                        <span className="capitalize font-medium" style={{ color: '#475569' }}>{track}</span>
                        <span style={{ color }}>{count} user{count !== 1 ? 's' : ''} · {pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: '#F1F5F9' }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Users table ────────────────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid #F1F5F9', background: '#FAFBFC' }}>
            <div className="flex items-center gap-2">
              <Users size={15} style={{ color: '#7C3AED' }} />
              <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>All Users</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-lg"
              style={{ background: '#EDE9FE', color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
              {totalUsers} total
            </span>
          </div>

          {typedUsers.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>No users yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    {['User', 'Track', 'XP', 'Lessons', 'Badges', 'Last active', 'Joined'].map(h => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: '#CBD5E1' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {typedUsers.map((u, i) => {
                    const p = progressById[u.id]
                    const a = assessmentById[u.id]
                    const name = u.user_metadata?.full_name ?? u.email?.split('@')[0] ?? '—'
                    const trackColor = a ? (TRACK_COLORS[a.primary_track_id] ?? '#94A3B8') : '#CBD5E1'
                    return (
                      <tr key={u.id}
                        style={{ borderBottom: i < typedUsers.length - 1 ? '1px solid #F8FAFC' : 'none' }}
                        className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium" style={{ color: '#0F172A' }}>{name}</p>
                            <p className="text-xs mt-0.5" style={{ color: '#CBD5E1' }}>{u.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {a ? (
                            <span className="px-2 py-0.5 rounded text-xs font-semibold capitalize"
                              style={{ background: `${trackColor}12`, color: trackColor }}>
                              {a.primary_track_id}
                            </span>
                          ) : (
                            <span style={{ color: '#E2E8F0' }}>—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold" style={{ color: p ? '#F59E0B' : '#E2E8F0' }}>
                            {p ? p.xp.toLocaleString() : '—'}
                          </span>
                        </td>
                        <td className="px-6 py-4" style={{ color: p?.completed_lessons?.length ? '#10B981' : '#E2E8F0' }}>
                          {p?.completed_lessons?.length ?? '—'}
                        </td>
                        <td className="px-6 py-4" style={{ color: p?.earned_badges?.length ? '#EC4899' : '#E2E8F0' }}>
                          {p?.earned_badges?.length ?? '—'}
                        </td>
                        <td className="px-6 py-4" style={{ color: '#94A3B8' }}>
                          {timeAgo(p?.updated_at ?? u.last_sign_in_at)}
                        </td>
                        <td className="px-6 py-4" style={{ color: '#94A3B8' }}>
                          {fmt(u.created_at)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
