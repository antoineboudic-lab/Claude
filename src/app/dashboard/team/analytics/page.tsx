'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Zap, BookOpen, Award, TrendingUp, CheckCircle2, Users, Download, Activity } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import {
  getAdminTeam, getTeamMembersWithProgress, getTeamStats,
  type Team, type TeamMember,
} from '@/lib/supabase/teams'

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

const ALL_TRACKS = Object.keys(TRACK_LABELS)

function exportCSV(members: TeamMember[], teamName: string) {
  const headers = ['Name', 'Email', 'XP', 'Lessons', 'Streak', 'Assigned Tracks', 'Completed Tracks']
  const rows = members
    .filter(m => m.status === 'active')
    .sort((a, b) => (b.xp ?? 0) - (a.xp ?? 0))
    .map(m => [
      m.display_name ?? m.email.split('@')[0],
      m.email,
      m.xp ?? 0,
      m.lesson_count ?? 0,
      m.streak ?? 0,
      (m.assigned_tracks ?? []).map(t => TRACK_LABELS[t] ?? t).join('; '),
      (m.completed_tracks ?? []).map(t => TRACK_LABELS[t] ?? t).join('; '),
    ])
  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${teamName.replace(/\s+/g, '-').toLowerCase()}-progress-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function LeaderboardRow({ member, rank, max }: { member: TeamMember; rank: number; max: number }) {
  const xp = member.xp ?? 0
  const lessons = member.lesson_count ?? 0
  const pct = max > 0 ? (xp / max) * 100 : 0
  const initials = (member.display_name ?? member.email).slice(0, 2).toUpperCase()
  const medals = ['🥇', '🥈', '🥉']

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.05, duration: 0.4 }}
      className="flex items-center gap-4 py-3.5 px-5 rounded-2xl"
      style={{
        background: rank === 1 ? '#FFFBEB' : '#FFFFFF',
        border: `1px solid ${rank === 1 ? '#FDE68A' : '#E2E8F0'}`,
      }}>
      <span className="w-8 text-center text-lg flex-shrink-0">
        {rank <= 3 ? medals[rank - 1] : <span className="text-xs font-bold" style={{ color: '#CBD5E1' }}>#{rank}</span>}
      </span>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ background: `hsl(${(member.email.charCodeAt(0) * 47) % 360},55%,55%)` }}>
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-bold truncate" style={{ color: '#0F172A' }}>
            {member.display_name ?? member.email.split('@')[0]}
          </p>
          <p className="text-sm font-black flex-shrink-0 ml-3" style={{ color: '#0D9488' }}>
            {xp.toLocaleString()} XP
          </p>
        </div>
        <div className="h-2 rounded-full" style={{ background: '#E2E8F0' }}>
          <div className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${pct}%`, background: rank === 1 ? '#F59E0B' : '#0D9488' }} />
        </div>
        <div className="flex items-center gap-4 mt-1 text-xs" style={{ color: '#94A3B8' }}>
          <span>{lessons} lessons</span>
          <span>{member.completed_tracks?.length ?? 0} tracks done</span>
          <span>{member.streak ?? 0}🔥 streak</span>
        </div>
      </div>
    </motion.div>
  )
}

interface ActivityBucket { label: string; count: number; color: string }

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [team, setTeam] = useState<Team | null>(null)
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [activityBuckets, setActivityBuckets] = useState<ActivityBucket[] | null>(null)

  useEffect(() => {
    if (!user) return
    getAdminTeam(user.id).then(async t => {
      if (!t) { setLoading(false); return }
      setTeam(t)
      const m = await getTeamMembersWithProgress(t.id)
      setMembers(m)
      setLoading(false)
      fetch(`/api/team/weekly-activity?teamId=${t.id}`)
        .then(r => r.json())
        .then(data => setActivityBuckets(data.buckets ?? []))
        .catch(() => {})
    })
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: '#0D9488', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (!team) return null

  const active = members.filter(m => m.status === 'active')
  const ranked = [...active].sort((a, b) => (b.xp ?? 0) - (a.xp ?? 0))
  const maxXP = ranked[0]?.xp ?? 1
  const stats = getTeamStats(members)

  // Track completion matrix: for each track, how many members are assigned / done
  const trackMatrix = ALL_TRACKS.map(track => {
    const assigned = active.filter(m => m.assigned_tracks?.includes(track))
    const completed = assigned.filter(m => m.completed_tracks?.includes(track))
    const inProgress = assigned.filter(m =>
      !m.completed_tracks?.includes(track) &&
      (m.completed_lessons ?? []).some(l => l.startsWith(track))
    )
    return { track, assigned: assigned.length, completed: completed.length, inProgress: inProgress.length }
  }).filter(t => t.assigned > 0)

  // Activity distribution: how many members completed 0, 1-5, 6-10, 10+ lessons
  const buckets = [
    { label: '0 lessons', count: active.filter(m => (m.lesson_count ?? 0) === 0).length, color: '#E2E8F0' },
    { label: '1–5 lessons', count: active.filter(m => (m.lesson_count ?? 0) >= 1 && (m.lesson_count ?? 0) <= 5).length, color: '#99F6E4' },
    { label: '6–15 lessons', count: active.filter(m => (m.lesson_count ?? 0) >= 6 && (m.lesson_count ?? 0) <= 15).length, color: '#5EEAD4' },
    { label: '16+ lessons', count: active.filter(m => (m.lesson_count ?? 0) > 15).length, color: '#0D9488' },
  ]
  const maxBucket = Math.max(...buckets.map(b => b.count), 1)

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black" style={{ color: '#0F172A' }}>Analytics</h1>
          <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>Progress and activity across your team</p>
        </div>
        {active.length > 0 && (
          <button
            onClick={() => exportCSV(members, team.name)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
            style={{ background: '#F0FDFA', color: '#475569', border: '1px solid #E2E8F0' }}>
            <Download size={14} /> Export CSV
          </button>
        )}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Active members', value: stats.total, color: '#0D9488' },
          { icon: Zap, label: 'Total XP earned', value: stats.totalXP.toLocaleString(), color: '#F59E0B', str: true },
          { icon: BookOpen, label: 'Lessons completed', value: stats.totalLessons, color: '#10B981' },
          { icon: Award, label: 'Tracks completed', value: stats.completedTracks, color: '#E04D2A' },
        ].map(({ icon: Icon, label, value, color, str }) => (
          <div key={label} className="p-5 rounded-2xl"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${color}12` }}>
              <Icon size={15} style={{ color }} />
            </div>
            <p className="text-2xl font-black mb-0.5" style={{ color: '#0F172A' }}>{str ? value : value}</p>
            <p className="text-xs" style={{ color: '#94A3B8' }}>{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Trophy size={15} style={{ color: '#F59E0B' }} />
            <h2 className="text-sm font-black" style={{ color: '#0F172A' }}>Leaderboard</h2>
          </div>
          {ranked.length === 0 ? (
            <div className="rounded-2xl p-10 text-center"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <p className="text-sm" style={{ color: '#94A3B8' }}>No active members with progress yet.</p>
            </div>
          ) : (
            ranked.map((m, i) => <LeaderboardRow key={m.id} member={m} rank={i + 1} max={maxXP} />)
          )}
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Activity recency */}
          {activityBuckets && activityBuckets.some(b => b.count > 0) && (
            <div className="rounded-2xl p-5"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 mb-5">
                <Activity size={14} style={{ color: '#0D9488' }} />
                <p className="text-sm font-bold" style={{ color: '#0F172A' }}>Member activity</p>
              </div>
              <div className="space-y-3">
                {activityBuckets.filter(b => b.count > 0).map(b => {
                  const maxCount = Math.max(...activityBuckets.map(x => x.count), 1)
                  return (
                    <div key={b.label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span style={{ color: '#475569' }}>{b.label}</span>
                        <span className="font-semibold" style={{ color: '#64748B' }}>{b.count}</span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: '#F1F5F9' }}>
                        <div className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${(b.count / maxCount) * 100}%`, background: b.color }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Activity distribution */}
          <div className="rounded-2xl p-5"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={14} style={{ color: '#0D9488' }} />
              <p className="text-sm font-bold" style={{ color: '#0F172A' }}>Engagement levels</p>
            </div>
            <div className="space-y-3">
              {buckets.map(b => (
                <div key={b.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span style={{ color: '#475569' }}>{b.label}</span>
                    <span style={{ color: '#94A3B8' }}>{b.count} member{b.count !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: '#F1F5F9' }}>
                    <div className="h-full rounded-full transition-all duration-800"
                      style={{ width: `${(b.count / maxBucket) * 100}%`, background: b.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Track completion heatmap */}
          {trackMatrix.length > 0 && (
            <div className="rounded-2xl p-5"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle2 size={14} style={{ color: '#10B981' }} />
                <p className="text-sm font-bold" style={{ color: '#0F172A' }}>Track completion</p>
              </div>
              <div className="space-y-3">
                {trackMatrix.map(({ track, assigned, completed, inProgress }) => {
                  const color = TRACK_COLORS[track] ?? '#0D9488'
                  const completePct = assigned > 0 ? (completed / assigned) * 100 : 0
                  const progressPct = assigned > 0 ? ((completed + inProgress) / assigned) * 100 : 0
                  return (
                    <div key={track}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                          <span style={{ color: '#334155' }}>{TRACK_LABELS[track]}</span>
                        </div>
                        <span style={{ color: '#94A3B8' }}>{completed}/{assigned} done</span>
                      </div>
                      <div className="relative h-2 rounded-full" style={{ background: '#F1F5F9' }}>
                        {/* In progress */}
                        <div className="absolute inset-y-0 left-0 rounded-full opacity-30"
                          style={{ width: `${progressPct}%`, background: color }} />
                        {/* Completed */}
                        <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-800"
                          style={{ width: `${completePct}%`, background: color }} />
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center gap-4 mt-4 pt-3 text-[10px]" style={{ borderTop: '1px solid #F1F5F9', color: '#94A3B8' }}>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-2 rounded-sm" style={{ background: '#0D9488' }} />
                  Completed
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-2 rounded-sm opacity-30" style={{ background: '#0D9488' }} />
                  In progress
                </div>
              </div>
            </div>
          )}

          {/* Team avg */}
          <div className="rounded-2xl p-5"
            style={{ background: '#CCFBF1', border: '1px solid #99F6E4' }}>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#0D9488' }}>Team average</p>
            <div className="space-y-2">
              {[
                { label: 'Lessons per member', value: stats.avgLessons },
                { label: 'Active this week', value: `${stats.activeThisWeek}/${stats.total}` },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between text-sm">
                  <span style={{ color: '#115E59' }}>{s.label}</span>
                  <span className="font-bold" style={{ color: '#134E4A' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
