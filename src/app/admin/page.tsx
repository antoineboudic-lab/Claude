import { createAdminClient } from '@/lib/supabase/admin'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  Users, Zap, BookOpen, Target, TrendingUp, Bell,
  Flame, Award, ArrowRight, CheckCircle2, Circle,
} from 'lucide-react'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? 'antoine.boudic@gmail.com')
  .split(',').map(e => e.trim().toLowerCase()).filter(Boolean)

// ─── Types ─────────────────────────────────────────────────────────────────────

interface AuthUser {
  id: string
  email?: string
  created_at: string
  last_sign_in_at: string | null
  user_metadata: { full_name?: string }
}

interface ProgressRow {
  user_id: string
  xp: number
  streak: number
  last_active_date: string | null
  completed_lessons: string[]
  completed_modules: string[]
  completed_tracks: string[]
  earned_badges: string[]
  updated_at: string
}

interface AssessmentRow {
  user_id: string
  primary_track_id: string
  created_at: string
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

const TRACK_COLORS: Record<string, string> = {
  marketing: '#EC4899', finance: '#F59E0B', hr: '#10B981', sales: '#8B5CF6',
  operations: '#22D3EE', leadership: '#F97316', legal: '#6366F1',
  product: '#14B8A6', customer: '#F43F5E', consulting: '#0EA5E9',
}
const TRACK_LABELS: Record<string, string> = {
  marketing: 'Marketing', finance: 'Finance', hr: 'HR', sales: 'Sales',
  operations: 'Ops', leadership: 'Leadership', legal: 'Legal',
  product: 'Product', customer: 'Customer', consulting: 'Consulting',
}

function fmt(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })
}

function timeAgo(d: string | null) {
  if (!d) return '—'
  const days = Math.floor((Date.now() - new Date(d).getTime()) / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  return fmt(d)
}

function pct(a: number, b: number) {
  if (b === 0) return '0%'
  return `${Math.round((a / b) * 100)}%`
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color: string
}) {
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <div style={{ width: 32, height: 32, borderRadius: 9, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
        <Icon size={15} style={{ color }} />
      </div>
      <p style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: '0 0 2px', letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>{label}</p>
      {sub && <p style={{ fontSize: 11, color: '#CBD5E1', margin: '4px 0 0', fontWeight: 600 }}>{sub}</p>}
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes((user.email ?? '').toLowerCase())) redirect('/')

  const admin = createAdminClient()

  // Fetch in parallel
  const [
    { data: { users: rawUsers } },
    { data: progressRows },
    { data: assessmentRows },
    { count: pushCount },
  ] = await Promise.all([
    admin.auth.admin.listUsers({ perPage: 1000 }),
    admin.from('user_progress').select('*').order('xp', { ascending: false }),
    admin.from('user_assessments')
      .select('user_id, primary_track_id, created_at')
      .order('created_at', { ascending: false }),
    admin.from('push_subscriptions').select('*', { count: 'exact', head: true }),
  ])

  const users: AuthUser[] = (rawUsers ?? []) as unknown as AuthUser[]
  const progress: ProgressRow[] = progressRows ?? []
  const assessments: AssessmentRow[] = assessmentRows ?? []

  const progressById = Object.fromEntries(progress.map(p => [p.user_id, p]))
  const latestAssessmentByUser = Object.fromEntries(assessments.map(a => [a.user_id, a]))

  const today = new Date().toISOString().split('T')[0]
  const minus7 = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0]

  // ── Core metrics
  const totalUsers = users.length
  const withAssessment = new Set(assessments.map(a => a.user_id)).size
  const withAnyLesson = progress.filter(p => (p.completed_lessons?.length ?? 0) > 0).length
  const withFiveLessons = progress.filter(p => (p.completed_lessons?.length ?? 0) >= 5).length
  const withModule = progress.filter(p => (p.completed_modules?.length ?? 0) > 0).length
  const withTrack = progress.filter(p => (p.completed_tracks?.length ?? 0) > 0).length
  const activeToday = progress.filter(p => p.last_active_date === today).length
  const active7d = progress.filter(p => p.last_active_date != null && p.last_active_date >= minus7).length
  const withStreak = progress.filter(p => (p.streak ?? 0) > 0).length
  const totalLessons = progress.reduce((s, p) => s + (p.completed_lessons?.length ?? 0), 0)
  const totalXP = progress.reduce((s, p) => s + (p.xp ?? 0), 0)
  const avgXP = progress.length > 0 ? Math.round(totalXP / progress.length) : 0
  const avgLessons = progress.length > 0 ? (totalLessons / progress.length).toFixed(1) : '0'
  const avgStreak = withStreak > 0
    ? Math.round(progress.filter(p => p.streak > 0).reduce((s, p) => s + p.streak, 0) / withStreak)
    : 0

  // ── 30-day signup chart
  const days30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    return d.toISOString().split('T')[0]
  })
  const signupsByDay = Object.fromEntries(days30.map(d => [d, 0]))
  users.forEach(u => {
    const day = u.created_at.split('T')[0]
    if (day in signupsByDay) signupsByDay[day]++
  })
  const maxDay = Math.max(...Object.values(signupsByDay), 1)

  // ── Track distribution
  const trackCounts: Record<string, number> = {}
  assessments.forEach(a => { trackCounts[a.primary_track_id] = (trackCounts[a.primary_track_id] ?? 0) + 1 })
  const topTracks = Object.entries(trackCounts).sort((a, b) => b[1] - a[1])

  // ── Funnel steps
  const funnel = [
    { label: 'Signed up', n: totalUsers, icon: Users },
    { label: 'Took assessment', n: withAssessment, icon: Target },
    { label: 'Completed ≥1 lesson', n: withAnyLesson, icon: BookOpen },
    { label: 'Completed ≥5 lessons', n: withFiveLessons, icon: BookOpen },
    { label: 'Completed a module', n: withModule, icon: Award },
    { label: 'Completed a track', n: withTrack, icon: Award },
  ]

  // ── Top 15 users by XP (with profile data)
  const topUsers = progress.slice(0, 15).map(p => {
    const u = users.find(u => u.id === p.user_id)
    const a = latestAssessmentByUser[p.user_id]
    return { p, u, a }
  })

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: 'var(--font-sans)' }}>
      {/* Top nav */}
      <div style={{ background: '#0F172A', padding: '0 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: 'linear-gradient(135deg, #7C3AED, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={12} style={{ color: '#fff' }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>AI Literacy</span>
            </Link>
            <span style={{ color: '#334155', fontSize: 13 }}>/</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8' }}>Admin</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 11, background: '#DC2626', color: '#FFFFFF', padding: '2px 8px', borderRadius: 4, fontWeight: 700, letterSpacing: '0.05em' }}>INTERNAL</span>
            <span style={{ fontSize: 12, color: '#64748B' }}>{user.email}</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 32px 80px' }}>

        {/* Page title */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', margin: '0 0 4px', letterSpacing: '-0.03em' }}>Overview</h1>
          <p style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>
            Live data · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* ── Stat row 1: volume */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
          <StatCard icon={Users} label="Total users" value={totalUsers} color="#7C3AED" />
          <StatCard icon={Zap} label="Active today" value={activeToday} sub={`${pct(activeToday, totalUsers)} of users`} color="#22D3EE" />
          <StatCard icon={TrendingUp} label="Active 7d" value={active7d} sub={`${pct(active7d, totalUsers)} of users`} color="#10B981" />
          <StatCard icon={Bell} label="Push subscribers" value={pushCount ?? 0} sub={`${pct(pushCount ?? 0, totalUsers)} opted in`} color="#F59E0B" />
        </div>

        {/* ── Stat row 2: engagement */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          <StatCard icon={BookOpen} label="Lessons completed" value={totalLessons.toLocaleString()} sub={`${avgLessons} avg per user`} color="#6366F1" />
          <StatCard icon={Zap} label="Total XP earned" value={totalXP.toLocaleString()} sub={`${avgXP.toLocaleString()} avg per user`} color="#F97316" />
          <StatCard icon={Flame} label="Users with streak" value={withStreak} sub={`${avgStreak}d avg streak`} color="#EF4444" />
          <StatCard icon={Award} label="Tracks completed" value={withTrack} sub={`${pct(withTrack, totalUsers)} completion rate`} color="#EC4899" />
        </div>

        {/* ── Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>

          {/* 30-day signups */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '24px 24px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp size={14} style={{ color: '#22D3EE' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Signups — last 30 days</span>
              </div>
              <span style={{ fontSize: 12, color: '#94A3B8' }}>
                {Object.values(signupsByDay).reduce((a, b) => a + b, 0)} total
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 80 }}>
              {days30.map((day, i) => {
                const count = signupsByDay[day]
                const h = Math.max((count / maxDay) * 100, count > 0 ? 6 : 2)
                const isToday = day === today
                const showLabel = i % 6 === 0
                const label = new Date(day + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                return (
                  <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }} title={`${label}: ${count}`}>
                    <div style={{
                      width: '100%', borderRadius: '3px 3px 0 0',
                      height: `${h}%`, minHeight: 2,
                      background: isToday ? '#7C3AED' : count > 0 ? '#22D3EE' : '#F1F5F9',
                      opacity: count === 0 ? 0.5 : 1,
                    }} />
                    {showLabel && (
                      <span style={{ fontSize: 9, color: '#CBD5E1', marginTop: 4, whiteSpace: 'nowrap' }}>{label}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Track distribution */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <Target size={14} style={{ color: '#7C3AED' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Track distribution</span>
            </div>
            {topTracks.length === 0 ? (
              <p style={{ fontSize: 13, color: '#CBD5E1' }}>No assessments yet</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {topTracks.map(([track, count]) => {
                  const color = TRACK_COLORS[track] ?? '#94A3B8'
                  const p = withAssessment > 0 ? Math.round((count / withAssessment) * 100) : 0
                  return (
                    <div key={track}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                        <span style={{ color: '#475569', fontWeight: 500 }}>{TRACK_LABELS[track] ?? track}</span>
                        <span style={{ color, fontWeight: 700 }}>{count} · {p}%</span>
                      </div>
                      <div style={{ height: 5, borderRadius: 3, background: '#F1F5F9' }}>
                        <div style={{ height: '100%', borderRadius: 3, width: `${p}%`, background: color }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Funnel + streak health row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

          {/* Acquisition funnel */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: '0 0 18px' }}>Activation funnel</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {funnel.map((step, i) => {
                const prev = i === 0 ? totalUsers : funnel[i - 1].n
                const dropPct = i === 0 ? 100 : prev > 0 ? Math.round((step.n / funnel[0].n) * 100) : 0
                const barW = funnel[0].n > 0 ? Math.round((step.n / funnel[0].n) * 100) : 0
                const colors = ['#7C3AED', '#6366F1', '#22D3EE', '#10B981', '#F59E0B', '#EC4899']
                const color = colors[i]
                return (
                  <div key={step.label} style={{ paddingBottom: 14, borderBottom: i < funnel.length - 1 ? '1px solid #F8FAFC' : 'none', marginBottom: i < funnel.length - 1 ? 14 : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>{step.label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{step.n}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color, minWidth: 32, textAlign: 'right' }}>{dropPct}%</span>
                      </div>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: '#F1F5F9' }}>
                      <div style={{ height: '100%', borderRadius: 2, width: `${barW}%`, background: color, transition: 'width 0.4s' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Streak health */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: '0 0 18px' }}>Streak health</p>
            {(() => {
              const streakBuckets = [
                { label: '0 days (inactive)', n: progress.filter(p => p.streak === 0).length, color: '#E2E8F0' },
                { label: '1–3 days', n: progress.filter(p => p.streak >= 1 && p.streak <= 3).length, color: '#FDE68A' },
                { label: '4–7 days', n: progress.filter(p => p.streak >= 4 && p.streak <= 7).length, color: '#F97316' },
                { label: '8–14 days', n: progress.filter(p => p.streak >= 8 && p.streak <= 14).length, color: '#EF4444' },
                { label: '15+ days 🔥', n: progress.filter(p => p.streak >= 15).length, color: '#7C3AED' },
              ]
              const maxN = Math.max(...streakBuckets.map(b => b.n), 1)
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {streakBuckets.map(b => (
                    <div key={b.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                        <span style={{ color: '#475569' }}>{b.label}</span>
                        <span style={{ fontWeight: 700, color: b.color === '#E2E8F0' ? '#CBD5E1' : b.color }}>
                          {b.n} · {pct(b.n, progress.length)}
                        </span>
                      </div>
                      <div style={{ height: 5, borderRadius: 3, background: '#F1F5F9' }}>
                        <div style={{ height: '100%', borderRadius: 3, width: `${Math.round((b.n / maxN) * 100)}%`, background: b.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              )
            })()}
          </div>
        </div>

        {/* ── Users table */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={14} style={{ color: '#7C3AED' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>All Users</span>
            </div>
            <span style={{ fontSize: 12, background: '#EDE9FE', color: '#7C3AED', padding: '3px 10px', borderRadius: 6, fontWeight: 600 }}>
              {totalUsers} total
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  {['User', 'Track', 'XP', 'Lessons', 'Streak', 'Badges', 'Last active', 'Joined'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => {
                  const p = progressById[u.id]
                  const a = latestAssessmentByUser[u.id]
                  const name = u.user_metadata?.full_name ?? u.email?.split('@')[0] ?? '—'
                  const trackColor = a ? (TRACK_COLORS[a.primary_track_id] ?? '#94A3B8') : '#CBD5E1'
                  const lessons = p?.completed_lessons?.length ?? 0
                  const hasProgress = lessons > 0
                  return (
                    <tr key={u.id}
                      style={{ borderBottom: i < users.length - 1 ? '1px solid #F8FAFC' : 'none', background: 'transparent' }}
                      onMouseOver={e => (e.currentTarget.style.background = '#FAFBFC')}
                      onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 8, background: hasProgress ? '#EDE9FE' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: hasProgress ? '#7C3AED' : '#CBD5E1', flexShrink: 0 }}>
                            {name[0]?.toUpperCase() ?? '?'}
                          </div>
                          <div>
                            <p style={{ margin: 0, fontWeight: 600, color: '#0F172A' }}>{name}</p>
                            <p style={{ margin: 0, fontSize: 11, color: '#CBD5E1' }}>{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {a
                          ? <span style={{ padding: '2px 8px', borderRadius: 5, fontSize: 11, fontWeight: 600, background: `${trackColor}15`, color: trackColor }}>{TRACK_LABELS[a.primary_track_id] ?? a.primary_track_id}</span>
                          : <span style={{ color: '#E2E8F0', fontSize: 12 }}>—</span>}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: p?.xp ? '#F59E0B' : '#E2E8F0' }}>
                        {p?.xp ? p.xp.toLocaleString() : '—'}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontWeight: 600, color: lessons > 0 ? '#10B981' : '#E2E8F0' }}>{lessons || '—'}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {p?.streak ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#F97316', fontWeight: 700 }}>
                            <Flame size={12} /> {p.streak}
                          </span>
                        ) : <span style={{ color: '#E2E8F0' }}>—</span>}
                      </td>
                      <td style={{ padding: '12px 16px', color: p?.earned_badges?.length ? '#EC4899' : '#E2E8F0', fontWeight: 600 }}>
                        {p?.earned_badges?.length || '—'}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#94A3B8', whiteSpace: 'nowrap' }}>
                        {timeAgo(p?.updated_at ?? u.last_sign_in_at)}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#CBD5E1', whiteSpace: 'nowrap' }}>
                        {fmt(u.created_at)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
