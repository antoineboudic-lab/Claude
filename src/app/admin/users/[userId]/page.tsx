import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import {
  Zap, ChevronLeft, User, Calendar, Clock, BookOpen,
  Flame, Award, CreditCard, Mail, ExternalLink,
} from 'lucide-react'

// ─── Constants ────────────────────────────────────────────────────────────────

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

// ─── Types ────────────────────────────────────────────────────────────────────

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
  id: string
  user_id: string
  primary_track_id: string
  created_at: string
}

interface EmailLogRow {
  id: string
  sequence: string
  step: number
  status: string
  sent_at: string
}

interface SubscriptionRow {
  id: string
  user_id: string
  plan: string
  status: string
  current_period_end: string | null
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(d: string | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })
}

function fmtFull(d: string | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: 16,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      ...style,
    }}>
      {children}
    </div>
  )
}

function CardHeader({ icon: Icon, title, right }: {
  icon: React.ElementType
  title: string
  right?: React.ReactNode
}) {
  return (
    <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon size={14} style={{ color: '#2563EB' }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{title}</span>
      </div>
      {right}
    </div>
  )
}

function StatMini({ icon: Icon, label, value, color }: {
  icon: React.ElementType
  label: string
  value: string | number
  color: string
}) {
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <div style={{ width: 32, height: 32, borderRadius: 9, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
        <Icon size={15} style={{ color }} />
      </div>
      <p style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: '0 0 2px', letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>{label}</p>
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
    <tr>
      <td colSpan={cols} style={{ padding: '32px 16px', textAlign: 'center', color: '#CBD5E1', fontSize: 13 }}>
        {message}
      </td>
    </tr>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  const admin = createAdminClient()

  const [
    userResult,
    { data: progressData },
    { data: assessmentsData },
    { data: emailsData },
    { data: subscriptionData },
  ] = await Promise.all([
    admin.auth.admin.getUserById(userId),
    admin.from('user_progress').select('*').eq('user_id', userId).single(),
    admin.from('user_assessments').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    admin.from('email_log').select('*').eq('user_id', userId).order('sent_at', { ascending: false }).limit(20),
    admin.from('subscriptions').select('*').eq('user_id', userId).single(),
  ])

  const user = userResult.data?.user
  const progress = progressData as ProgressRow | null
  const assessments = (assessmentsData ?? []) as AssessmentRow[]
  const emails = (emailsData ?? []) as EmailLogRow[]
  const subscription = subscriptionData as SubscriptionRow | null

  const name = (user?.user_metadata as { full_name?: string } | undefined)?.full_name
    ?? user?.email?.split('@')[0]
    ?? 'Unknown user'
  const initial = name[0]?.toUpperCase() ?? '?'

  // ── Subscription helpers
  const SUB_STATUS_STYLE: Record<string, { bg: string; color: string }> = {
    active:    { bg: '#D1FAE5', color: '#065F46' },
    trialing:  { bg: '#DBEAFE', color: '#1E40AF' },
    past_due:  { bg: '#FEF3C7', color: '#92400E' },
    canceled:  { bg: '#F1F5F9', color: '#64748B' },
  }
  const subStyle = subscription?.status
    ? (SUB_STATUS_STYLE[subscription.status] ?? { bg: '#F1F5F9', color: '#64748B' })
    : null

  const PLAN_LABELS: Record<string, string> = {
    pro_monthly: 'Pro Monthly',
    pro_annual:  'Pro Annual',
    free:        'Free',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: 'var(--font-sans)' }}>

      {/* ── Top nav */}
      <div style={{ background: '#0F172A', padding: '0 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: 'linear-gradient(135deg, #2563EB, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={12} style={{ color: '#fff' }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>OpusLearn</span>
            </Link>
            <span style={{ color: '#334155', fontSize: 13 }}>/</span>
            <Link href="/admin" style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', textDecoration: 'none' }}>Admin</Link>
            <span style={{ color: '#334155', fontSize: 13 }}>/</span>
            <Link href="/admin?tab=users" style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', textDecoration: 'none' }}>Users</Link>
            <span style={{ color: '#334155', fontSize: 13 }}>/</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#F8FAFC' }}>{name}</span>
          </div>

          {/* Back link */}
          <Link href="/admin?tab=users" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#94A3B8', textDecoration: 'none' }}>
            <ChevronLeft size={13} /> Back to users
          </Link>

        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 32px 80px' }}>

        {/* ── Profile card */}
        <Card style={{ padding: '28px 32px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>

            {/* Avatar */}
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: '#2563EB', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '1.5rem', fontWeight: 900,
              color: '#FFFFFF', flexShrink: 0, letterSpacing: '-0.02em',
            }}>
              {initial}
            </div>

            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                {name}
              </h1>
              <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 10px' }}>{user?.email ?? '—'}</p>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#94A3B8' }}>
                  <Calendar size={12} />
                  <span>Joined {fmtFull(user?.created_at)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#94A3B8' }}>
                  <Clock size={12} />
                  <span>Last sign in {fmtFull(user?.last_sign_in_at ?? null)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#94A3B8' }}>
                  <User size={12} />
                  <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#CBD5E1' }}>{userId}</span>
                </div>
              </div>
            </div>

            {/* Impersonate button */}
            <a
              href={`/api/admin/impersonate?userId=${userId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                background: '#F97316', color: '#FFFFFF', textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <ExternalLink size={11} /> Impersonate
            </a>

          </div>
        </Card>

        {/* ── Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
          <StatMini icon={Zap} label="XP earned" value={(progress?.xp ?? 0).toLocaleString()} color="#F59E0B" />
          <StatMini icon={BookOpen} label="Lessons completed" value={progress?.completed_lessons?.length ?? 0} color="#2563EB" />
          <StatMini icon={Flame} label="Current streak" value={progress?.streak ? `${progress.streak}d` : '0d'} color="#F97316" />
          <StatMini icon={Award} label="Badges earned" value={progress?.earned_badges?.length ?? 0} color="#E04D2A" />
        </div>

        {/* ── Progress card */}
        <Card style={{ marginBottom: 20 }}>
          <CardHeader icon={BookOpen} title="Learning Progress" />
          <div style={{ padding: '20px 24px' }}>
            {!progress ? (
              <p style={{ fontSize: 13, color: '#CBD5E1', margin: 0 }}>No progress data yet.</p>
            ) : (
              <>
                {/* Completed tracks */}
                <div style={{ marginBottom: 18 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>
                    Completed tracks ({progress.completed_tracks?.length ?? 0})
                  </p>
                  {(progress.completed_tracks?.length ?? 0) === 0 ? (
                    <span style={{ fontSize: 13, color: '#CBD5E1' }}>None yet</span>
                  ) : (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {progress.completed_tracks.map(track => {
                        const color = TRACK_COLORS[track] ?? '#94A3B8'
                        return (
                          <span key={track} style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: `${color}18`, color, border: `1px solid ${color}30` }}>
                            {TRACK_LABELS[track] ?? track}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Completed modules count */}
                <div style={{ marginBottom: 18, paddingTop: 16, borderTop: '1px solid #F1F5F9' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>
                    Modules completed
                  </p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    {progress.completed_modules?.length ?? 0}
                  </p>
                </div>

                {/* Completed lessons (first 10) */}
                <div style={{ paddingTop: 16, borderTop: '1px solid #F1F5F9' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>
                    Recent lessons ({progress.completed_lessons?.length ?? 0} total
                    {(progress.completed_lessons?.length ?? 0) > 10 ? ', showing first 10' : ''})
                  </p>
                  {(progress.completed_lessons?.length ?? 0) === 0 ? (
                    <span style={{ fontSize: 13, color: '#CBD5E1' }}>None yet</span>
                  ) : (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {(progress.completed_lessons ?? []).slice(0, 10).map(lessonId => (
                        <span key={lessonId} style={{ padding: '3px 8px', borderRadius: 5, fontSize: 11, fontWeight: 500, background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0', fontFamily: 'monospace' }}>
                          {lessonId}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </Card>

        {/* ── Assessment history */}
        <Card style={{ marginBottom: 20, overflow: 'hidden' }}>
          <CardHeader
            icon={Award}
            title="Assessment History"
            right={
              <span style={{ fontSize: 12, background: '#DBEAFE', color: '#2563EB', padding: '3px 10px', borderRadius: 6, fontWeight: 600 }}>
                {assessments.length} total
              </span>
            }
          />
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <TableHead cols={['Date', 'Track', '']} />
              <tbody>
                {assessments.length === 0 ? (
                  <EmptyRow cols={3} message="No assessments taken yet" />
                ) : (
                  assessments.map((a, i) => {
                    const color = TRACK_COLORS[a.primary_track_id] ?? '#94A3B8'
                    const label = TRACK_LABELS[a.primary_track_id] ?? a.primary_track_id
                    return (
                      <tr key={a.id ?? i} style={{ borderBottom: i < assessments.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                        <td style={{ padding: '12px 16px', color: '#475569', whiteSpace: 'nowrap' }}>
                          {fmt(a.created_at)}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: `${color}15`, color }}>
                            {label}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          {i === 0 && (
                            <span style={{ fontSize: 10, fontWeight: 700, background: '#0F172A', color: '#F8FAFC', padding: '2px 7px', borderRadius: 4, letterSpacing: '0.05em' }}>
                              LATEST
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ── Subscription + Email history */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20, marginBottom: 20 }}>

          {/* Subscription card */}
          <Card>
            <CardHeader icon={CreditCard} title="Subscription" />
            <div style={{ padding: '20px 24px' }}>
              {!subscription ? (
                <div>
                  <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, background: '#F1F5F9', color: '#64748B', marginBottom: 12 }}>
                    Free plan
                  </span>
                  <p style={{ fontSize: 12, color: '#CBD5E1', margin: 0 }}>No paid subscription</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>Plan</p>
                    <p style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      {PLAN_LABELS[subscription.plan] ?? subscription.plan}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>Status</p>
                    {subStyle && (
                      <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: subStyle.bg, color: subStyle.color }}>
                        {subscription.status}
                      </span>
                    )}
                  </div>
                  {subscription.current_period_end && (
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>Period ends</p>
                      <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>{fmtFull(subscription.current_period_end)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Email history */}
          <Card style={{ overflow: 'hidden' }}>
            <CardHeader
              icon={Mail}
              title="Email History"
              right={
                <span style={{ fontSize: 12, color: '#94A3B8' }}>Last 20</span>
              }
            />
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <TableHead cols={['Sequence', 'Step', 'Status', 'Sent']} />
                <tbody>
                  {emails.length === 0 ? (
                    <EmptyRow cols={4} message="No emails sent to this user" />
                  ) : (
                    emails.map((e, i) => {
                      const color = SEQUENCE_COLORS[e.sequence] ?? '#94A3B8'
                      return (
                        <tr key={e.id ?? i} style={{ borderBottom: i < emails.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                          <td style={{ padding: '10px 16px' }}>
                            <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: `${color}15`, color }}>
                              {e.sequence}
                            </span>
                          </td>
                          <td style={{ padding: '10px 16px', color: '#94A3B8' }}>#{e.step}</td>
                          <td style={{ padding: '10px 16px', fontWeight: 600, fontSize: 12, color: e.status === 'sent' ? '#10B981' : '#F97316' }}>
                            {e.status}
                          </td>
                          <td style={{ padding: '10px 16px', color: '#CBD5E1', whiteSpace: 'nowrap' }}>
                            {fmt(e.sent_at)}
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </Card>

        </div>

      </div>
    </div>
  )
}
