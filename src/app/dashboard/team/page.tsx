'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, TrendingUp, Award, Zap, BookOpen, ArrowRight,
  CheckCircle2, Clock, UserPlus, ChevronRight, BarChart3,
  Target, MessageSquare, Edit2, X, Check, CalendarDays,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import {
  getAdminTeam, getTeamMembersWithProgress, getTeamStats,
  getTeamGoal, upsertTeamGoal, deleteTeamGoal,
  setWelcomeMessage, getWelcomeMessage,
  type Team, type TeamMember, type TeamGoal,
} from '@/lib/supabase/teams'
import {
  PAPER_2, PANEL, INK, INK_SOFT, INK_FAINT,
  COBALT, RULE, SERIF, MONO, SANS,
} from "@/components/editorial/theme"

const TRACK_COLORS: Record<string, string> = {
  marketing: '#E04D2A', finance: '#F59E0B', hr: '#10B981',
  sales: '#3B82F6', operations: '#22D3EE', leadership: '#F97316',
  legal: '#0284C7', product: '#14B8A6', customer: '#DC2626', consulting: '#0EA5E9', it: '#6366F1',
}
const TRACK_LABELS: Record<string, string> = {
  marketing: 'Marketing', finance: 'Finance', hr: 'HR',
  sales: 'Sales', operations: 'Operations', leadership: 'Leadership',
  legal: 'Legal', product: 'Product', customer: 'Customer Success', consulting: 'Consulting', it: 'IT & Technology',
}

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

function MemberRow({ member, rank }: { member: TeamMember; rank: number }) {
  const lessons = member.lesson_count ?? 0
  const tracks = member.assigned_tracks ?? []
  const done = member.completed_tracks ?? []
  const progress = tracks.length > 0 ? Math.round((done.filter(t => tracks.includes(t)).length / tracks.length) * 100) : 0
  const initials = (member.display_name ?? member.email).slice(0, 2).toUpperCase()

  return (
    <div className="flex items-center gap-4 py-3.5 px-5 transition-colors hover:bg-slate-50 rounded-xl -mx-1">
      <span className="w-6 text-center text-xs font-bold" style={{ color: INK_FAINT }}>{rank}</span>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ background: [COBALT,'#E04D2A','#F59E0B','#10B981','#3B82F6','#22D3EE','#F97316','#0284C7','#DC2626','#0EA5E9'][rank % 10] }}>
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: INK }}>
          {member.display_name ?? member.email.split('@')[0]}
        </p>
        <p className="text-xs truncate" style={{ color: INK_FAINT }}>{member.email}</p>
      </div>
      <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
        {tracks.slice(0, 3).map(t => (
          <span key={t} className="w-2 h-2 rounded-full" style={{ background: TRACK_COLORS[t] ?? INK_FAINT }} title={TRACK_LABELS[t]} />
        ))}
        {tracks.length > 3 && <span className="text-[10px]" style={{ color: INK_FAINT }}>+{tracks.length - 3}</span>}
      </div>
      <div className="w-20 flex-shrink-0">
        <div className="flex items-center justify-between text-xs mb-1">
          <span style={{ color: INK_FAINT }}>{progress}%</span>
          <span style={{ color: INK_SOFT }}>{lessons}L</span>
        </div>
        <div className="h-1.5 rounded-full" style={{ background: RULE }}>
          <div className="h-full rounded-full" style={{ width: `${progress}%`, background: COBALT, transition: 'width 0.8s ease' }} />
        </div>
      </div>
      <div className="w-16 text-right flex-shrink-0">
        <p className="text-sm font-bold" style={{ color: COBALT }}>{(member.xp ?? 0).toLocaleString()}</p>
        <p className="text-[10px]" style={{ color: INK_FAINT }}>XP</p>
      </div>
    </div>
  )
}

export default function TeamOverviewPage() {
  const { user } = useAuth()
  const [team, setTeam] = useState<Team | null>(null)
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [goal, setGoal] = useState<TeamGoal | null>(null)
  const [welcomeMsg, setWelcomeMsg] = useState<string | null>(null)
  const [editingGoal, setEditingGoal] = useState(false)
  const [goalTitle, setGoalTitle] = useState('')
  const [goalDeadline, setGoalDeadline] = useState('')
  const [savingGoal, setSavingGoal] = useState(false)
  const [editingWelcome, setEditingWelcome] = useState(false)
  const [welcomeDraft, setWelcomeDraft] = useState('')
  const [savingWelcome, setSavingWelcome] = useState(false)

  useEffect(() => {
    if (!user) return
    getAdminTeam(user.id).then(async t => {
      if (!t) { setLoading(false); return }
      setTeam(t)
      const [m, g, w] = await Promise.all([
        getTeamMembersWithProgress(t.id),
        getTeamGoal(t.id),
        getWelcomeMessage(t.id),
      ])
      setMembers(m)
      setGoal(g)
      setWelcomeMsg(w)
      setLoading(false)
    })
  }, [user])

  async function handleSaveGoal() {
    if (!team || !user || !goalTitle.trim()) return
    setSavingGoal(true)
    const g = await upsertTeamGoal(team.id, goalTitle.trim(), goalDeadline || null, user.id)
    setGoal(g)
    setEditingGoal(false)
    setSavingGoal(false)
  }

  async function handleDeleteGoal() {
    if (!team) return
    await deleteTeamGoal(team.id)
    setGoal(null)
    setEditingGoal(false)
  }

  async function handleSaveWelcome() {
    if (!team) return
    setSavingWelcome(true)
    await setWelcomeMessage(team.id, welcomeDraft)
    setWelcomeMsg(welcomeDraft || null)
    setEditingWelcome(false)
    setSavingWelcome(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: COBALT, borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (!team) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center gap-4">
        <p className="text-sm font-semibold" style={{ color: INK, fontFamily: SANS }}>
          You don&apos;t have admin access to a team.
        </p>
        <a href="/dashboard" className="text-sm font-semibold underline" style={{ color: COBALT, fontFamily: SANS }}>
          Back to dashboard
        </a>
      </div>
    )
  }

  const stats = getTeamStats(members)
  const activeMembers = members.filter(m => m.status === 'active')
  const pending = members.filter(m => m.status === 'pending')
  const topMembers = [...activeMembers].sort((a, b) => (b.xp ?? 0) - (a.xp ?? 0)).slice(0, 5)

  // Track completion overview
  const allTracks = Array.from(new Set(activeMembers.flatMap(m => m.assigned_tracks ?? [])))
  const trackCompletion = allTracks.map(track => {
    const assigned = activeMembers.filter(m => m.assigned_tracks?.includes(track))
    const completed = assigned.filter(m => m.completed_tracks?.includes(track))
    return { track, assigned: assigned.length, completed: completed.length }
  }).sort((a, b) => b.assigned - a.assigned)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>Team Overview</h1>
          <p className="text-sm mt-0.5" style={{ color: INK_SOFT }}>
            {activeMembers.length} active member{activeMembers.length !== 1 ? 's' : ''}
            {pending.length > 0 && ` · ${pending.length} invite${pending.length !== 1 ? 's' : ''} pending`}
          </p>
        </div>
        <Link href="/dashboard/team/members"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: COBALT }}>
          <UserPlus size={14} /> Invite member
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Active members', value: stats.total, color: COBALT },
          { icon: BookOpen, label: 'Total lessons done', value: stats.totalLessons, color: '#10B981' },
          { icon: Zap, label: 'Total XP earned', value: stats.totalXP.toLocaleString(), color: '#F59E0B', str: true },
          { icon: Award, label: 'Tracks completed', value: stats.completedTracks, color: '#E04D2A' },
        ].map(({ icon: Icon, label, value, color, str }, i) => (
          <motion.div key={label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.45, ease: easing }}
            className="p-5 rounded-2xl"
            style={{ background: PAPER_2, border: `1px solid ${RULE}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${color}12` }}>
              <Icon size={16} style={{ color }} />
            </div>
            <p className="text-2xl font-black mb-0.5" style={{ color: INK }}>{str ? value : value}</p>
            <p className="text-xs" style={{ color: INK_FAINT }}>{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Member leaderboard */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden"
          style={{ background: PAPER_2, border: `1px solid ${RULE}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${RULE}` }}>
            <div className="flex items-center gap-2">
              <TrendingUp size={15} style={{ color: COBALT }} />
              <p className="text-sm" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>Top learners</p>
            </div>
            <Link href="/dashboard/team/analytics"
              className="text-xs font-semibold flex items-center gap-1 hover:underline"
              style={{ color: COBALT }}>
              Full leaderboard <ChevronRight size={11} />
            </Link>
          </div>
          <div className="p-2">
            {topMembers.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm" style={{ color: INK_FAINT }}>No active members yet.</p>
                <Link href="/dashboard/team/members"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: COBALT }}>
                  <UserPlus size={13} /> Invite your first member
                </Link>
              </div>
            ) : (
              topMembers.map((m, i) => <MemberRow key={m.id} member={m} rank={i + 1} />)
            )}
          </div>
          {activeMembers.length > 5 && (
            <div className="px-5 py-3" style={{ borderTop: `1px solid ${RULE}` }}>
              <Link href="/dashboard/team/members"
                className="text-xs font-semibold flex items-center gap-1 hover:underline"
                style={{ color: INK_SOFT }}>
                View all {activeMembers.length} members <ArrowRight size={11} />
              </Link>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Track completion */}
          <div className="rounded-2xl p-5"
            style={{ background: PAPER_2, border: `1px solid ${RULE}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={15} style={{ color: '#10B981' }} />
              <p className="text-sm" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>Track coverage</p>
            </div>
            {trackCompletion.length === 0 ? (
              <p className="text-xs" style={{ color: INK_FAINT }}>No tracks assigned yet.</p>
            ) : (
              <div className="space-y-3">
                {trackCompletion.slice(0, 6).map(({ track, assigned, completed }) => {
                  const pct = assigned > 0 ? Math.round((completed / assigned) * 100) : 0
                  const color = TRACK_COLORS[track] ?? COBALT
                  return (
                    <div key={track}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                          <span style={{ color: INK_SOFT }}>{TRACK_LABELS[track] ?? track}</span>
                        </div>
                        <span style={{ color: INK_FAINT }}>{completed}/{assigned}</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: RULE }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color, transition: 'width 0.8s ease' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Pending invites */}
          {pending.length > 0 && (
            <div className="rounded-2xl p-5"
              style={{ background: '#FFFBEB', border: '1px solid #FDE68A', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} style={{ color: '#D97706' }} />
                <p className="text-sm font-bold" style={{ color: '#92400E' }}>
                  {pending.length} invite{pending.length !== 1 ? 's' : ''} pending
                </p>
              </div>
              <div className="space-y-2">
                {pending.slice(0, 3).map(m => (
                  <div key={m.id} className="flex items-center gap-2 text-xs">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold"
                      style={{ background: '#FEF3C7', color: '#D97706' }}>
                      {m.email.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="truncate flex-1" style={{ color: '#78350F' }}>{m.email}</span>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/team/members"
                className="mt-3 flex items-center gap-1 text-xs font-semibold hover:underline"
                style={{ color: '#D97706' }}>
                Manage invites <ChevronRight size={11} />
              </Link>
            </div>
          )}

          {/* Team goal */}
          <div className="rounded-2xl p-5"
            style={{ background: PAPER_2, border: `1px solid ${RULE}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target size={14} style={{ color: COBALT }} />
                <p className="text-sm" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>Team goal</p>
              </div>
              {!editingGoal && (
                <button onClick={() => { setGoalTitle(goal?.title ?? ''); setGoalDeadline(goal?.deadline ?? ''); setEditingGoal(true) }}
                  className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
                  style={{ color: INK_FAINT }}>
                  <Edit2 size={12} />
                </button>
              )}
            </div>
            {editingGoal ? (
              <div className="space-y-2.5">
                <input
                  type="text"
                  value={goalTitle}
                  onChange={e => setGoalTitle(e.target.value)}
                  placeholder="e.g. Complete AI Fundamentals by Q3"
                  className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                  style={{ border: `1.5px solid ${COBALT}`, background: PANEL, color: INK, fontFamily: SANS }}
                />
                <div className="flex items-center gap-1.5">
                  <CalendarDays size={12} style={{ color: INK_FAINT }} />
                  <input
                    type="date"
                    value={goalDeadline}
                    onChange={e => setGoalDeadline(e.target.value)}
                    className="flex-1 px-2 py-1.5 rounded-lg text-xs outline-none"
                    style={{ border: `1px solid ${RULE}`, background: PANEL, color: INK_SOFT, fontFamily: SANS }}
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSaveGoal} disabled={savingGoal || !goalTitle.trim()}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: COBALT }}>
                    <Check size={11} /> {savingGoal ? 'Saving…' : 'Save'}
                  </button>
                  <button onClick={() => setEditingGoal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:bg-slate-100"
                    style={{ color: INK_SOFT, border: `1px solid ${RULE}` }}>
                    <X size={11} />
                  </button>
                </div>
                {goal && (
                  <button onClick={handleDeleteGoal}
                    className="text-xs hover:underline"
                    style={{ color: '#EF4444' }}>
                    Remove goal
                  </button>
                )}
              </div>
            ) : goal ? (
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: INK_SOFT }}>{goal.title}</p>
                {goal.deadline && (
                  <p className="flex items-center gap-1 text-xs" style={{ color: INK_FAINT }}>
                    <CalendarDays size={10} />
                    Due {new Date(goal.deadline).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                )}
              </div>
            ) : (
              <button onClick={() => { setGoalTitle(''); setGoalDeadline(''); setEditingGoal(true) }}
                className="text-xs font-semibold hover:underline"
                style={{ color: COBALT }}>
                + Set a team goal
              </button>
            )}
          </div>

          {/* Welcome message */}
          <div className="rounded-2xl p-5"
            style={{ background: PAPER_2, border: `1px solid ${RULE}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare size={14} style={{ color: '#10B981' }} />
                <p className="text-sm" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>Welcome message</p>
              </div>
              {!editingWelcome && (
                <button onClick={() => { setWelcomeDraft(welcomeMsg ?? ''); setEditingWelcome(true) }}
                  className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
                  style={{ color: INK_FAINT }}>
                  <Edit2 size={12} />
                </button>
              )}
            </div>
            {editingWelcome ? (
              <div className="space-y-2.5">
                <textarea
                  value={welcomeDraft}
                  onChange={e => setWelcomeDraft(e.target.value)}
                  placeholder="Write a short welcome note for new members joining via invite…"
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl text-xs outline-none resize-none"
                  style={{ border: '1.5px solid #10B981', background: PANEL, color: INK, fontFamily: SANS, lineHeight: 1.6 }}
                />
                <div className="flex gap-2">
                  <button onClick={handleSaveWelcome} disabled={savingWelcome}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: '#10B981' }}>
                    <Check size={11} /> {savingWelcome ? 'Saving…' : 'Save'}
                  </button>
                  <button onClick={() => setEditingWelcome(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:bg-slate-100"
                    style={{ color: INK_SOFT, border: `1px solid ${RULE}` }}>
                    <X size={11} />
                  </button>
                </div>
              </div>
            ) : welcomeMsg ? (
              <p className="text-xs leading-relaxed" style={{ color: INK_SOFT }}>{welcomeMsg}</p>
            ) : (
              <button onClick={() => { setWelcomeDraft(''); setEditingWelcome(true) }}
                className="text-xs font-semibold hover:underline"
                style={{ color: '#10B981' }}>
                + Add welcome message
              </button>
            )}
            {!editingWelcome && (
              <p className="mt-2 text-[10px]" style={{ color: INK_FAINT }}>
                Shown to new members on the invite page
              </p>
            )}
          </div>

          {/* Quick links */}
          <div className="rounded-2xl p-5"
            style={{ background: PAPER_2, border: `1px solid ${RULE}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase mb-3" style={{ color: INK_FAINT, fontFamily: MONO }}>Quick actions</p>
            {[
              { href: '/dashboard/team/members', icon: UserPlus, label: 'Invite team members', color: COBALT },
              { href: '/dashboard/team/analytics', icon: BarChart3, label: 'View full analytics', color: '#10B981' },
              { href: '/tracks', icon: BookOpen, label: 'Browse all tracks', color: '#F59E0B' },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}10` }}>
                  <item.icon size={13} style={{ color: item.color }} />
                </div>
                <span className="text-sm font-medium flex-1" style={{ color: INK_SOFT }}>{item.label}</span>
                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: INK_FAINT }} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Empty state CTA */}
      {activeMembers.length === 0 && (
        <div className="rounded-2xl p-10 text-center"
          style={{ background: PAPER_2, border: `2px dashed ${RULE}` }}>
          <Users size={36} className="mx-auto mb-4" style={{ color: INK_FAINT }} />
          <h3 className="text-lg mb-2" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>Your team is empty</h3>
          <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: INK_SOFT }}>
            Invite your first team member to start tracking progress and assigning role-specific tracks.
          </p>
          <Link href="/dashboard/team/members"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
            style={{ background: COBALT }}>
            <UserPlus size={14} /> Invite your first member
          </Link>
        </div>
      )}
    </div>
  )
}
