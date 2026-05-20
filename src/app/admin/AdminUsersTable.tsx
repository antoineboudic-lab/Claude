'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Flame, CheckCircle2, XCircle, ExternalLink, Search } from 'lucide-react'

interface AdminUser {
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

interface Props {
  users: AdminUser[]
  progressById: Record<string, ProgressRow>
  latestAssessmentByUser: Record<string, AssessmentRow>
}

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

export function AdminUsersTable({ users, progressById, latestAssessmentByUser }: Props) {
  const [query, setQuery] = useState('')

  const filtered = query.trim() === ''
    ? users
    : users.filter(u => {
        const name = (u.user_metadata?.full_name ?? '').toLowerCase()
        const email = (u.email ?? '').toLowerCase()
        const q = query.toLowerCase()
        return name.includes(q) || email.includes(q)
      })

  return (
    <div>
      <div style={{ padding: '12px 24px 16px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
            <Search size={14} style={{ color: '#94A3B8' }} />
          </span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name or email…"
            style={{
              width: '100%',
              padding: '10px 14px 10px 36px',
              border: '1px solid #E2E8F0',
              borderRadius: 8,
              fontSize: 13,
              outline: 'none',
              fontFamily: 'var(--font-sans)',
              color: '#0F172A',
              background: '#FFFFFF',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <p style={{ fontSize: 12, color: '#94A3B8', margin: '8px 0 0' }}>
          {query.trim() === ''
            ? `${users.length} users`
            : `Showing ${filtered.length} of ${users.length} users`}
        </p>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              {['User', 'Track', 'XP', 'Lessons', 'Streak', 'Badges', 'Digest', 'Last active', 'Joined', ''].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ padding: '40px 16px', textAlign: 'center', color: '#CBD5E1', fontSize: 13 }}>
                  No users match your search
                </td>
              </tr>
            ) : filtered.map((u, i) => {
              const p = progressById[u.id]
              const a = latestAssessmentByUser[u.id]
              const name = u.user_metadata?.full_name ?? u.email?.split('@')[0] ?? '—'
              const trackColor = a ? (TRACK_COLORS[a.primary_track_id] ?? '#94A3B8') : '#CBD5E1'
              const lessons = p?.completed_lessons?.length ?? 0
              return (
                <tr key={u.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #EFF6FF' : 'none' }}>
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
                    {a
                      ? <span style={{ padding: '2px 8px', borderRadius: 5, fontSize: 11, fontWeight: 600, background: `${trackColor}15`, color: trackColor }}>{TRACK_LABELS[a.primary_track_id] ?? a.primary_track_id}</span>
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
                  <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Link href={`/admin/users/${u.id}`} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 5, background: '#EFF6FF', color: '#2563EB', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                        <ExternalLink size={10} /> View
                      </Link>
                      <Link href={`/api/admin/impersonate?userId=${u.id}`} target="_blank" style={{ fontSize: 11, padding: '3px 8px', borderRadius: 5, background: '#FFFBEB', color: '#D97706', textDecoration: 'none', fontWeight: 600 }}>
                        Impersonate
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
