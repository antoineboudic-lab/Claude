import { createAdminClient } from '@/lib/supabase/admin'
import { AdminNavEmail } from './AdminNavEmail'
import Link from 'next/link'
import {
  Users, Zap, BookOpen, Target, TrendingUp, Bell,
  Flame, Award, Mail, Building2, Share2, UserPlus,
  BarChart3, CheckCircle2, XCircle, RefreshCw,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

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
  digest_opt_out?: boolean
  updated_at: string
}

interface AssessmentRow {
  user_id: string
  primary_track_id: string
  created_at: string
}

interface EmailLogRow {
  id: string
  email: string
  sequence: string
  step: number
  status: string
  sent_at: string
}

interface TeamRow {
  id: string
  name: string
  plan: string
  created_by: string
  seat_limit: number
  created_at: string
}

interface TeamMemberRow {
  team_id: string
  status: string
}

interface LeadRow {
  id: string
  email: string
  source: string | null
  role: string | null
  converted_at: string | null
  created_at: string
}

interface ReferralRow {
  id: string
  referrer_id: string
  code: string
  clicks: number
  signups: number
  conversions: number
  reward_xp: number
  created_at: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TRACK_COLORS: Record<string, string> = {
  marketing: '#E04D2A', finance: '#F59E0B', hr: '#10B981', sales: '#3B82F6',
  operations: '#22D3EE', leadership: '#F97316', legal: '#0284C7',
  product: '#14B8A6', customer: '#DC2626', consulting: '#0EA5E9',
}
const TRACK_LABELS: Record<string, string> = {
  marketing: 'Marketing', finance: 'Finance', hr: 'HR', sales: 'Sales',
  operations: 'Ops', leadership: 'Leadership', legal: 'Legal',
  product: 'Product', customer: 'Customer', consulting: 'Consulting',
}
const SEQUENCE_COLORS: Record<string, string> = {
  welcome: '#2563EB', activation: '#10B981', reengagement: '#F97316',
  upgrade: '#8B5CF6', 'weekly-digest': '#22D3EE', nudge: '#F59E0B',
}
const PLAN_COLORS: Record<string, string> = {
  starter: '#94A3B8', growth: '#22D3EE', enterprise: '#2563EB',
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

// ─── Components ──────────────────────────────────────────────────────────────

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

function TabNav({ active, userCount, leadsCount, teamsCount }: {
  active: string; userCount: number; leadsCount: number; teamsCount: number
}) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: `Users (${userCount})`, icon: Users },
    { id: 'emails', label: 'Emails', icon: Mail },
    { id: 'teams', label: `Teams (${teamsCount})`, icon: Building2 },
    { id: 'leads', label: `Leads (${leadsCount})`, icon: UserPlus },
    { id: 'referrals', label: 'Referrals', icon: Share2 },
  ]
  return (
    <div style={{ display: 'flex', gap: 3, background: '#1E293B', borderRadius: 12, padding: 5, marginBottom: 32, flexWrap: 'wrap' }}>
      {tabs.map(t => {
        const isActive = active === t.id
        return (
          <Link key={t.id} href={`/admin?tab=${t.id}`} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8,
            fontSize: 12, fontWeight: 600, textDecoration: 'none',
            background: isActive ? '#FFFFFF' : 'transparent',
            color: isActive ? '#0F172A' : '#64748B',
          }}>
            <t.icon size={12} />
            {t.label}
          </Link>
        )
      })}
    </div>
  )
}

function TableHead({ cols }: { cols: string[] }) {
  return (
    <thead>
      <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
        {cols.map(h => (
          <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
            {h}
          </th>
        ))}
      </tr>
    </thead>
  )
}

function EmptyRow({ cols, message }: { cols: number; message: string }) {
  return (
    <tr><td colSpan={cols} style={{ padding: '40px 16px', textAlign: 'center', color: '#CBD5E1', fontSize: 13 }}>{message}</td></tr>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab = 'overview' } = await searchParams

  const admin = createAdminClient()

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in environment variables')
  }

  // ── Always-fetched core data
  const [
    listUsersResult,
    { data: progressRows },
    { data: assessmentRows },
    { count: pushCount },
    { count: leadsTotal },
    { count: teamsTotal },
  ] = await Promise.all([
    admin.auth.admin.listUsers({ perPage: 1000 }),
    admin.from('user_progress').select('*').order('xp', { ascending: false }),
    admin.from('user_assessments').select('user_id, primary_track_id, created_at').order('created_at', { ascending: false }),
    admin.from('push_subscriptions').select('*', { count: 'exact', head: true }),
    admin.from('leads').select('*', { count: 'exact', head: true }),
    admin.from('teams').select('*', { count: 'exact', head: true }),
  ])

  const users: AuthUser[] = (listUsersResult.data?.users ?? []) as unknown as AuthUser[]
  const progress: ProgressRow[] = progressRows ?? []
  const assessments: AssessmentRow[] = assessmentRows ?? []

  const progressById = Object.fromEntries(progress.map(p => [p.user_id, p]))
  const latestAssessmentByUser = Object.fromEntries(assessments.map(a => [a.user_id, a]))

  const today = new Date().toISOString().split('T')[0]
  const minus7day = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0]

  // ── Computed metrics
  const totalUsers = users.length
  const withAssessment = new Set(assessments.map(a => a.user_id)).size
  const withAnyLesson = progress.filter(p => (p.completed_lessons?.length ?? 0) > 0).length
  const withFiveLessons = progress.filter(p => (p.completed_lessons?.length ?? 0) >= 5).length
  const withModule = progress.filter(p => (p.completed_modules?.length ?? 0) > 0).length
  const withTrack = progress.filter(p => (p.completed_tracks?.length ?? 0) > 0).length
  const activeToday = progress.filter(p => p.last_active_date === today).length
  const active7d = progress.filter(p => p.last_active_date != null && p.last_active_date >= minus7day).length
  const withStreak = progress.filter(p => (p.streak ?? 0) > 0).length
  const totalLessons = progress.reduce((s, p) => s + (p.completed_lessons?.length ?? 0), 0)
  const totalXP = progress.reduce((s, p) => s + (p.xp ?? 0), 0)
  const avgXP = progress.length > 0 ? Math.round(totalXP / progress.length) : 0
  const avgLessons = progress.length > 0 ? (totalLessons / progress.length).toFixed(1) : '0'
  const avgStreak = withStreak > 0
    ? Math.round(progress.filter(p => p.streak > 0).reduce((s, p) => s + p.streak, 0) / withStreak) : 0

  // ── 30-day signups
  const days30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (29 - i)); return d.toISOString().split('T')[0]
  })
  const signupsByDay = Object.fromEntries(days30.map(d => [d, 0]))
  users.forEach(u => { const day = u.created_at.split('T')[0]; if (day in signupsByDay) signupsByDay[day]++ })
  const maxDay = Math.max(...Object.values(signupsByDay), 1)

  // ── Track distribution — count unique users per track (latest assessment wins)
  const trackByUser: Record<string, string> = {}
  // assessments are ordered newest-first, so first occurrence = latest track per user
  assessments.forEach(a => { if (!trackByUser[a.user_id]) trackByUser[a.user_id] = a.primary_track_id })
  const trackCounts: Record<string, number> = {}
  Object.values(trackByUser).forEach(t => { trackCounts[t] = (trackCounts[t] ?? 0) + 1 })
  const topTracks = Object.entries(trackCounts).sort((a, b) => b[1] - a[1])
  const uniqueTrackUsers = Object.values(trackCounts).reduce((s, n) => s + n, 0)

  // ── Activation funnel
  const funnel = [
    { label: 'Signed up', n: totalUsers },
    { label: 'Took assessment', n: withAssessment },
    { label: 'Completed ≥1 lesson', n: withAnyLesson },
    { label: 'Completed ≥5 lessons', n: withFiveLessons },
    { label: 'Completed a module', n: withModule },
    { label: 'Completed a track', n: withTrack },
  ]
  const funnelColors = ['#2563EB', '#0284C7', '#22D3EE', '#10B981', '#F59E0B', '#E04D2A']

  // ── Tab-specific data
  let emailLogs: EmailLogRow[] = []
  let teams: TeamRow[] = []
  let teamMembers: TeamMemberRow[] = []
  let leads: LeadRow[] = []
  let referrals: ReferralRow[] = []

  if (tab === 'emails') {
    const { data } = await admin.from('email_log').select('id, email, sequence, step, status, sent_at').order('sent_at', { ascending: false }).limit(100)
    emailLogs = data ?? []
  }
  if (tab === 'teams') {
    const [{ data: td }, { data: md }] = await Promise.all([
      admin.from('teams').select('*').order('created_at', { ascending: false }),
      admin.from('team_members').select('team_id, status'),
    ])
    teams = td ?? []
    teamMembers = md ?? []
  }
  if (tab === 'leads') {
    const { data } = await admin.from('leads').select('*').order('created_at', { ascending: false }).limit(200)
    leads = data ?? []
  }
  if (tab === 'referrals') {
    const { data } = await admin.from('referrals').select('*').order('signups', { ascending: false })
    referrals = data ?? []
  }

  // ── Email tab derived
  const emailCountsBySeq = emailLogs.reduce((acc, e) => {
    acc[e.sequence] = (acc[e.sequence] ?? 0) + 1; return acc
  }, {} as Record<string, number>)
  const minus7iso = new Date(Date.now() - 7 * 86400000).toISOString()
  const emailsLast7d = emailLogs.filter(e => e.sent_at >= minus7iso).length

  // ── Teams tab derived
  const membersByTeam = teamMembers.reduce((acc, m) => {
    if (!acc[m.team_id]) acc[m.team_id] = { active: 0, pending: 0 }
    if (m.status === 'active') acc[m.team_id].active++; else acc[m.team_id].pending++
    return acc
  }, {} as Record<string, { active: number; pending: number }>)

  // ── Leads tab derived
  const convertedLeads = leads.filter(l => l.converted_at != null).length
  const leadsBySource = leads.reduce((acc, l) => {
    const src = l.source ?? 'unknown'; acc[src] = (acc[src] ?? 0) + 1; return acc
  }, {} as Record<string, number>)

  // ── Referrals tab derived
  const totalClicks = referrals.reduce((s, r) => s + r.clicks, 0)
  const totalSignups = referrals.reduce((s, r) => s + r.signups, 0)
  const totalConversions = referrals.reduce((s, r) => s + r.conversions, 0)

  const tabTitle: Record<string, string> = {
    overview: 'Overview', users: 'Users', emails: 'Emails',
    teams: 'Teams', leads: 'Leads', referrals: 'Referrals',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: 'var(--font-sans)' }}>

      {/* ── Top nav */}
      <div style={{ background: '#0F172A', padding: '0 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: 'linear-gradient(135deg, #2563EB, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={12} style={{ color: '#fff' }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>AI Literacy</span>
            </Link>
            <span style={{ color: '#334155', fontSize: 13 }}>/</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8' }}>Admin</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href={`/admin?tab=${tab}`} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#475569', textDecoration: 'none' }}>
              <RefreshCw size={11} /> Refresh
            </Link>
            <span style={{ fontSize: 11, background: '#DC2626', color: '#FFFFFF', padding: '2px 8px', borderRadius: 4, fontWeight: 700, letterSpacing: '0.05em' }}>INTERNAL</span>
            <AdminNavEmail />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 32px 80px' }}>

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', margin: '0 0 4px', letterSpacing: '-0.03em' }}>
            {tabTitle[tab] ?? 'Admin'}
          </h1>
          <p style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>
            Live data · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <TabNav active={tab} userCount={totalUsers} leadsCount={leadsTotal ?? 0} teamsCount={teamsTotal ?? 0} />

        {/* ═══════════════════ OVERVIEW ═══════════════════ */}
        {tab === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
              <StatCard icon={Users} label="Total users" value={totalUsers} color="#2563EB" />
              <StatCard icon={Zap} label="Active today" value={activeToday} sub={`${pct(activeToday, totalUsers)} of users`} color="#22D3EE" />
              <StatCard icon={TrendingUp} label="Active 7d" value={active7d} sub={`${pct(active7d, totalUsers)} of users`} color="#10B981" />
              <StatCard icon={Bell} label="Push subscribers" value={pushCount ?? 0} sub={`${pct(pushCount ?? 0, totalUsers)} opted in`} color="#F59E0B" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
              <StatCard icon={BookOpen} label="Lessons completed" value={totalLessons.toLocaleString()} sub={`${avgLessons} avg per user`} color="#0284C7" />
              <StatCard icon={Zap} label="Total XP earned" value={totalXP.toLocaleString()} sub={`${avgXP.toLocaleString()} avg per user`} color="#F97316" />
              <StatCard icon={Flame} label="Users with streak" value={withStreak} sub={`${avgStreak}d avg streak`} color="#EF4444" />
              <StatCard icon={Award} label="Tracks completed" value={withTrack} sub={`${pct(withTrack, totalUsers)} completion rate`} color="#E04D2A" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
              {/* 30-day signups chart */}
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
                          width: '100%', borderRadius: '3px 3px 0 0', height: `${h}%`, minHeight: 2,
                          background: isToday ? '#2563EB' : count > 0 ? '#22D3EE' : '#F1F5F9',
                          opacity: count === 0 ? 0.5 : 1,
                        }} />
                        {showLabel && <span style={{ fontSize: 9, color: '#CBD5E1', marginTop: 4, whiteSpace: 'nowrap' }}>{label}</span>}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Track distribution */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                  <Target size={14} style={{ color: '#2563EB' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Track distribution</span>
                </div>
                {topTracks.length === 0 ? (
                  <p style={{ fontSize: 13, color: '#CBD5E1' }}>No assessments yet</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {topTracks.map(([track, count]) => {
                      const color = TRACK_COLORS[track] ?? '#94A3B8'
                      const p = uniqueTrackUsers > 0 ? Math.round((count / uniqueTrackUsers) * 100) : 0
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {/* Activation funnel */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: '0 0 18px' }}>Activation funnel</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {funnel.map((step, i) => {
                    const dropPct = funnel[0].n > 0 ? Math.round((step.n / funnel[0].n) * 100) : 0
                    const barW = funnel[0].n > 0 ? Math.round((step.n / funnel[0].n) * 100) : 0
                    const color = funnelColors[i]
                    return (
                      <div key={step.label} style={{ paddingBottom: 14, borderBottom: i < funnel.length - 1 ? '1px solid #EFF6FF' : 'none', marginBottom: i < funnel.length - 1 ? 14 : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <span style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>{step.label}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{step.n}</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color, minWidth: 32, textAlign: 'right' }}>{dropPct}%</span>
                          </div>
                        </div>
                        <div style={{ height: 4, borderRadius: 2, background: '#F1F5F9' }}>
                          <div style={{ height: '100%', borderRadius: 2, width: `${barW}%`, background: color }} />
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
                  const buckets = [
                    { label: '0 days (inactive)', n: progress.filter(p => p.streak === 0).length, color: '#E2E8F0' },
                    { label: '1–3 days', n: progress.filter(p => p.streak >= 1 && p.streak <= 3).length, color: '#FDE68A' },
                    { label: '4–7 days', n: progress.filter(p => p.streak >= 4 && p.streak <= 7).length, color: '#F97316' },
                    { label: '8–14 days', n: progress.filter(p => p.streak >= 8 && p.streak <= 14).length, color: '#EF4444' },
                    { label: '15+ days 🔥', n: progress.filter(p => p.streak >= 15).length, color: '#2563EB' },
                  ]
                  const maxN = Math.max(...buckets.map(b => b.n), 1)
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {buckets.map(b => (
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
          </>
        )}

        {/* ═══════════════════ USERS ═══════════════════ */}
        {tab === 'users' && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Users size={14} style={{ color: '#2563EB' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>All Users</span>
              </div>
              <span style={{ fontSize: 12, background: '#DBEAFE', color: '#2563EB', padding: '3px 10px', borderRadius: 6, fontWeight: 600 }}>
                {totalUsers} total
              </span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <TableHead cols={['User', 'Track', 'XP', 'Lessons', 'Streak', 'Badges', 'Digest', 'Last active', 'Joined']} />
                <tbody>
                  {users.map((u, i) => {
                    const p = progressById[u.id]
                    const a = latestAssessmentByUser[u.id]
                    const name = u.user_metadata?.full_name ?? u.email?.split('@')[0] ?? '—'
                    const trackColor = a ? (TRACK_COLORS[a.primary_track_id] ?? '#94A3B8') : '#CBD5E1'
                    const lessons = p?.completed_lessons?.length ?? 0
                    return (
                      <tr key={u.id} style={{ borderBottom: i < users.length - 1 ? '1px solid #EFF6FF' : 'none' }}>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 8, background: lessons > 0 ? '#DBEAFE' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: lessons > 0 ? '#2563EB' : '#CBD5E1', flexShrink: 0 }}>
                              {name[0]?.toUpperCase() ?? '?'}
                            </div>
                            <div>
                              <p style={{ margin: 0, fontWeight: 600, color: '#0F172A' }}>{name}</p>
                              <p style={{ margin: 0, fontSize: 11, color: '#CBD5E1' }}>{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          {a ? <span style={{ padding: '2px 8px', borderRadius: 5, fontSize: 11, fontWeight: 600, background: `${trackColor}15`, color: trackColor }}>{TRACK_LABELS[a.primary_track_id] ?? a.primary_track_id}</span>
                            : <span style={{ color: '#E2E8F0' }}>—</span>}
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 700, color: p?.xp ? '#F59E0B' : '#E2E8F0' }}>
                          {p?.xp ? p.xp.toLocaleString() : '—'}
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 600, color: lessons > 0 ? '#10B981' : '#E2E8F0' }}>
                          {lessons || '—'}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          {p?.streak ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#F97316', fontWeight: 700 }}>
                              <Flame size={12} /> {p.streak}
                            </span>
                          ) : <span style={{ color: '#E2E8F0' }}>—</span>}
                        </td>
                        <td style={{ padding: '12px 16px', color: p?.earned_badges?.length ? '#E04D2A' : '#E2E8F0', fontWeight: 600 }}>
                          {p?.earned_badges?.length || '—'}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          {p?.digest_opt_out
                            ? <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94A3B8', fontSize: 11 }}><XCircle size={11} /> off</span>
                            : <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#10B981', fontSize: 11 }}><CheckCircle2 size={11} /> on</span>}
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
        )}

        {/* ═══════════════════ EMAILS ═══════════════════ */}
        {tab === 'emails' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              <StatCard icon={Mail} label="Total emails (last 100)" value={emailLogs.length} color="#2563EB" />
              <StatCard icon={TrendingUp} label="Sent last 7 days" value={emailsLast7d} color="#10B981" />
              <StatCard icon={Mail} label="Sequences active" value={Object.keys(emailCountsBySeq).length} color="#F59E0B" />
              <StatCard icon={Users} label="Unique recipients" value={new Set(emailLogs.map(e => e.email)).size} color="#8B5CF6" />
            </div>

            {Object.keys(emailCountsBySeq).length > 0 && (
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '24px', marginBottom: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: '0 0 18px' }}>By sequence</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {Object.entries(emailCountsBySeq).sort((a, b) => b[1] - a[1]).map(([seq, count]) => {
                    const color = SEQUENCE_COLORS[seq] ?? '#94A3B8'
                    const maxCount = Math.max(...Object.values(emailCountsBySeq))
                    return (
                      <div key={seq}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, marginBottom: 5 }}>
                          <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: `${color}15`, color }}>{seq}</span>
                          <span style={{ color, fontWeight: 700 }}>{count}</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 3, background: '#F1F5F9' }}>
                          <div style={{ height: '100%', borderRadius: 3, width: `${Math.round((count / maxCount) * 100)}%`, background: color }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={14} style={{ color: '#2563EB' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Recent sends</span>
                <span style={{ fontSize: 12, color: '#94A3B8', marginLeft: 'auto' }}>Last 100</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <TableHead cols={['To', 'Sequence', 'Step', 'Status', 'Sent']} />
                  <tbody>
                    {emailLogs.length === 0 ? <EmptyRow cols={5} message="No emails sent yet" /> : emailLogs.map((e, i) => {
                      const color = SEQUENCE_COLORS[e.sequence] ?? '#94A3B8'
                      return (
                        <tr key={e.id} style={{ borderBottom: i < emailLogs.length - 1 ? '1px solid #EFF6FF' : 'none' }}>
                          <td style={{ padding: '10px 16px', color: '#475569' }}>{e.email}</td>
                          <td style={{ padding: '10px 16px' }}>
                            <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: `${color}15`, color }}>{e.sequence}</span>
                          </td>
                          <td style={{ padding: '10px 16px', color: '#94A3B8' }}>#{e.step}</td>
                          <td style={{ padding: '10px 16px', fontWeight: 600, color: e.status === 'sent' ? '#10B981' : '#F97316', fontSize: 12 }}>{e.status}</td>
                          <td style={{ padding: '10px 16px', color: '#CBD5E1', whiteSpace: 'nowrap' }}>{timeAgo(e.sent_at)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ═══════════════════ TEAMS ═══════════════════ */}
        {tab === 'teams' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
              <StatCard icon={Building2} label="Total teams" value={teams.length} color="#2563EB" />
              <StatCard icon={Users} label="Active members" value={teamMembers.filter(m => m.status === 'active').length} color="#10B981" />
              <StatCard icon={UserPlus} label="Pending invites" value={teamMembers.filter(m => m.status !== 'active').length} color="#F59E0B" />
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Building2 size={14} style={{ color: '#2563EB' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>All Teams</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <TableHead cols={['Team', 'Plan', 'Admin', 'Active members', 'Pending', 'Seats', 'Created']} />
                  <tbody>
                    {teams.length === 0 ? <EmptyRow cols={7} message="No teams yet" /> : teams.map((t, i) => {
                      const adminUser = users.find(u => u.id === t.created_by)
                      const members = membersByTeam[t.id] ?? { active: 0, pending: 0 }
                      const planColor = PLAN_COLORS[t.plan] ?? '#94A3B8'
                      return (
                        <tr key={t.id} style={{ borderBottom: i < teams.length - 1 ? '1px solid #EFF6FF' : 'none' }}>
                          <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0F172A' }}>{t.name}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: `${planColor}15`, color: planColor, textTransform: 'capitalize' }}>{t.plan}</span>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#475569' }}>
                            {adminUser?.user_metadata?.full_name ?? adminUser?.email ?? '—'}
                          </td>
                          <td style={{ padding: '12px 16px', fontWeight: 600, color: members.active > 0 ? '#10B981' : '#E2E8F0' }}>{members.active || '—'}</td>
                          <td style={{ padding: '12px 16px', fontWeight: 600, color: members.pending > 0 ? '#F59E0B' : '#E2E8F0' }}>{members.pending || '—'}</td>
                          <td style={{ padding: '12px 16px', color: '#94A3B8' }}>{t.seat_limit}</td>
                          <td style={{ padding: '12px 16px', color: '#CBD5E1', whiteSpace: 'nowrap' }}>{fmt(t.created_at)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ═══════════════════ LEADS ═══════════════════ */}
        {tab === 'leads' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              <StatCard icon={UserPlus} label="Total leads" value={leads.length} color="#2563EB" />
              <StatCard icon={CheckCircle2} label="Converted to users" value={convertedLeads} sub={`${pct(convertedLeads, leads.length)} rate`} color="#10B981" />
              {Object.entries(leadsBySource).slice(0, 2).map(([src, count]) => (
                <StatCard key={src} icon={Target} label={`Source: ${src}`} value={count} sub={`${pct(count, leads.length)} of leads`} color="#F59E0B" />
              ))}
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 8 }}>
                <UserPlus size={14} style={{ color: '#2563EB' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>All Leads</span>
                <span style={{ fontSize: 12, color: '#94A3B8', marginLeft: 'auto' }}>Pre-signup email captures</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <TableHead cols={['Email', 'Source', 'Role', 'Converted', 'Captured']} />
                  <tbody>
                    {leads.length === 0 ? <EmptyRow cols={5} message="No leads yet" /> : leads.map((l, i) => (
                      <tr key={l.id} style={{ borderBottom: i < leads.length - 1 ? '1px solid #EFF6FF' : 'none' }}>
                        <td style={{ padding: '10px 16px', color: '#475569', fontWeight: 500 }}>{l.email}</td>
                        <td style={{ padding: '10px 16px' }}>
                          {l.source
                            ? <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: '#EFF6FF', color: '#2563EB' }}>{l.source}</span>
                            : <span style={{ color: '#E2E8F0' }}>—</span>}
                        </td>
                        <td style={{ padding: '10px 16px', color: '#94A3B8' }}>{l.role ?? '—'}</td>
                        <td style={{ padding: '10px 16px' }}>
                          {l.converted_at
                            ? <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#10B981', fontSize: 12, fontWeight: 600 }}><CheckCircle2 size={12} /> {fmt(l.converted_at)}</span>
                            : <span style={{ color: '#E2E8F0' }}>—</span>}
                        </td>
                        <td style={{ padding: '10px 16px', color: '#CBD5E1', whiteSpace: 'nowrap' }}>{timeAgo(l.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ═══════════════════ REFERRALS ═══════════════════ */}
        {tab === 'referrals' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              <StatCard icon={Share2} label="Referrers" value={referrals.length} color="#2563EB" />
              <StatCard icon={TrendingUp} label="Total clicks" value={totalClicks} color="#22D3EE" />
              <StatCard icon={Users} label="Signups via referral" value={totalSignups} sub={totalClicks > 0 ? `${pct(totalSignups, totalClicks)} click→signup` : undefined} color="#10B981" />
              <StatCard icon={Award} label="Conversions" value={totalConversions} sub={totalSignups > 0 ? `${pct(totalConversions, totalSignups)} signup→paid` : undefined} color="#F59E0B" />
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Share2 size={14} style={{ color: '#2563EB' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>All Referrals</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <TableHead cols={['Referrer', 'Code', 'Clicks', 'Signups', 'Conversions', 'XP rewarded', 'Since']} />
                  <tbody>
                    {referrals.length === 0 ? <EmptyRow cols={7} message="No referrals yet" /> : referrals.map((r, i) => {
                      const referrerUser = users.find(u => u.id === r.referrer_id)
                      const convRate = r.clicks > 0 ? Math.round((r.signups / r.clicks) * 100) : 0
                      return (
                        <tr key={r.id} style={{ borderBottom: i < referrals.length - 1 ? '1px solid #EFF6FF' : 'none' }}>
                          <td style={{ padding: '10px 16px', color: '#475569' }}>
                            {referrerUser?.user_metadata?.full_name ?? referrerUser?.email ?? '—'}
                          </td>
                          <td style={{ padding: '10px 16px' }}>
                            <code style={{ fontSize: 12, background: '#F8FAFC', padding: '2px 6px', borderRadius: 4, color: '#2563EB', fontFamily: 'monospace' }}>{r.code}</code>
                          </td>
                          <td style={{ padding: '10px 16px', fontWeight: 600, color: r.clicks > 0 ? '#22D3EE' : '#E2E8F0' }}>{r.clicks || '—'}</td>
                          <td style={{ padding: '10px 16px', fontWeight: 600, color: r.signups > 0 ? '#10B981' : '#E2E8F0' }}>{r.signups || '—'}</td>
                          <td style={{ padding: '10px 16px', fontWeight: 600, color: r.conversions > 0 ? '#F59E0B' : '#E2E8F0' }}>
                            {r.conversions || '—'}
                            {r.clicks > 0 && <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 400, marginLeft: 4 }}>({convRate}%)</span>}
                          </td>
                          <td style={{ padding: '10px 16px', fontWeight: 600, color: r.reward_xp > 0 ? '#F97316' : '#E2E8F0' }}>
                            {r.reward_xp > 0 ? `+${r.reward_xp.toLocaleString()}` : '—'}
                          </td>
                          <td style={{ padding: '10px 16px', color: '#CBD5E1', whiteSpace: 'nowrap' }}>{fmt(r.created_at)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
