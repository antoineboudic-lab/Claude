'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UserPlus, Trash2, Edit2, Check, X, Copy, CheckCheck,
  Clock, CheckCircle2, Users, Mail, Link as LinkIcon,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import {
  getAdminTeam, getTeamMembersWithProgress, getTeamInvites,
  createInvite, removeTeamMember, updateMemberTracks, revokeInvite,
  type Team, type TeamMember, type TeamInvite,
} from '@/lib/supabase/teams'

const TRACKS = [
  { id: 'marketing',  label: 'Marketing',        color: '#EC4899' },
  { id: 'finance',    label: 'Finance',           color: '#F59E0B' },
  { id: 'hr',         label: 'HR',                color: '#10B981' },
  { id: 'sales',      label: 'Sales',             color: '#8B5CF6' },
  { id: 'operations', label: 'Operations',        color: '#22D3EE' },
  { id: 'leadership', label: 'Leadership',        color: '#F97316' },
  { id: 'legal',      label: 'Legal',             color: '#6366F1' },
  { id: 'product',    label: 'Product',           color: '#14B8A6' },
  { id: 'customer',   label: 'Customer Success',  color: '#F43F5E' },
  { id: 'consulting', label: 'Consulting',        color: '#0EA5E9' },
]

function TrackPicker({ selected, onChange }: { selected: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TRACKS.map(t => {
        const on = selected.includes(t.id)
        return (
          <button key={t.id}
            type="button"
            onClick={() => onChange(on ? selected.filter(x => x !== t.id) : [...selected, t.id])}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: on ? `${t.color}15` : '#F8FAFC',
              color: on ? t.color : '#94A3B8',
              border: `1px solid ${on ? t.color + '40' : '#E2E8F0'}`,
            }}>
            {on && <Check size={10} />}
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

function EditTracksModal({ member, onSave, onClose }: {
  member: TeamMember
  onSave: (id: string, tracks: string[]) => Promise<void>
  onClose: () => void
}) {
  const [tracks, setTracks] = useState(member.assigned_tracks ?? [])
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)
    await onSave(member.id, tracks)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg rounded-2xl p-6"
        style={{ background: '#FFFFFF', boxShadow: '0 24px 64px rgba(0,0,0,0.12)' }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-black" style={{ color: '#0F172A' }}>
            Edit tracks — {member.display_name ?? member.email.split('@')[0]}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={16} />
          </button>
        </div>
        <p className="text-xs mb-4" style={{ color: '#64748B' }}>
          Select the tracks this member should complete. They can still browse all tracks — this controls which ones appear as their assigned curriculum.
        </p>
        <TrackPicker selected={tracks} onChange={setTracks} />
        <div className="flex gap-3 mt-6">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-slate-100"
            style={{ color: '#64748B', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            Cancel
          </button>
          <button onClick={save} disabled={saving}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: '#7C3AED' }}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function MemberCard({ member, onEdit, onRemove }: {
  member: TeamMember
  onEdit: (m: TeamMember) => void
  onRemove: (id: string) => Promise<void>
}) {
  const [removing, setRemoving] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const lessons = member.lesson_count ?? 0
  const xp = member.xp ?? 0
  const tracks = member.assigned_tracks ?? []
  const done = member.completed_tracks ?? []
  const initials = (member.display_name ?? member.email).slice(0, 2).toUpperCase()
  const isPending = member.status === 'pending'

  async function handleRemove() {
    setRemoving(true)
    await onRemove(member.id)
  }

  return (
    <div className="rounded-2xl p-5 transition-shadow hover:shadow-md"
      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ background: isPending ? '#CBD5E1' : `hsl(${(member.email.charCodeAt(0) * 47) % 360},55%,55%)` }}>
            {initials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold truncate" style={{ color: '#0F172A' }}>
                {member.display_name ?? member.email.split('@')[0]}
              </p>
              {isPending && (
                <span className="flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                  style={{ background: '#FEF3C7', color: '#D97706' }}>
                  <Clock size={9} /> Pending
                </span>
              )}
              {member.role === 'admin' && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                  style={{ background: '#EDE9FE', color: '#7C3AED' }}>Admin</span>
              )}
            </div>
            <p className="text-xs truncate" style={{ color: '#94A3B8' }}>{member.email}</p>
          </div>
        </div>
        {member.role !== 'admin' && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={() => onEdit(member)}
              className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              style={{ color: '#64748B' }} title="Edit tracks">
              <Edit2 size={13} />
            </button>
            {confirm ? (
              <div className="flex items-center gap-1">
                <button onClick={handleRemove} disabled={removing}
                  className="p-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                  style={{ color: '#EF4444' }} title="Confirm remove">
                  <Check size={13} />
                </button>
                <button onClick={() => setConfirm(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  style={{ color: '#94A3B8' }}>
                  <X size={13} />
                </button>
              </div>
            ) : (
              <button onClick={() => setConfirm(true)}
                className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                style={{ color: '#CBD5E1' }} title="Remove member">
                <Trash2 size={13} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Stats */}
      {!isPending && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'XP', value: xp.toLocaleString(), color: '#7C3AED' },
            { label: 'Lessons', value: lessons, color: '#10B981' },
            { label: 'Tracks done', value: done.filter(t => tracks.includes(t)).length, color: '#F59E0B' },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-2.5 text-center"
              style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
              <p className="text-sm font-black" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px]" style={{ color: '#94A3B8' }}>{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Assigned tracks */}
      {tracks.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>Assigned tracks</p>
          <div className="flex flex-wrap gap-1.5">
            {tracks.map(t => {
              const track = TRACKS.find(tr => tr.id === t)
              const completed = done.includes(t)
              return (
                <span key={t}
                  className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg"
                  style={{
                    background: completed ? `${track?.color ?? '#7C3AED'}15` : '#F8FAFC',
                    color: completed ? (track?.color ?? '#7C3AED') : '#94A3B8',
                    border: `1px solid ${completed ? (track?.color ?? '#7C3AED') + '30' : '#E2E8F0'}`,
                  }}>
                  {completed && <CheckCircle2 size={9} />}
                  {track?.label ?? t}
                </span>
              )
            })}
          </div>
        </div>
      )}

      {tracks.length === 0 && !isPending && (
        <button onClick={() => onEdit(member)}
          className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline"
          style={{ color: '#7C3AED' }}>
          <Edit2 size={11} /> Assign tracks
        </button>
      )}
    </div>
  )
}

export default function MembersPage() {
  const { user } = useAuth()
  const [team, setTeam] = useState<Team | null>(null)
  const [members, setMembers] = useState<TeamMember[]>([])
  const [invites, setInvites] = useState<TeamInvite[]>([])
  const [loading, setLoading] = useState(true)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteTracks, setInviteTracks] = useState<string[]>([])
  const [inviting, setInviting] = useState(false)
  const [newInvite, setNewInvite] = useState<TeamInvite | null>(null)
  const [copied, setCopied] = useState(false)

  async function reload(teamId: string) {
    const [m, inv] = await Promise.all([
      getTeamMembersWithProgress(teamId),
      getTeamInvites(teamId),
    ])
    setMembers(m)
    setInvites(inv)
  }

  useEffect(() => {
    if (!user) return
    getAdminTeam(user.id).then(async t => {
      if (!t) { setLoading(false); return }
      setTeam(t)
      await reload(t.id)
      setLoading(false)
    })
  }, [user])

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault()
    if (!team || !user || !inviteEmail) return
    setInviting(true)
    const inv = await createInvite(team.id, inviteEmail, inviteTracks, user.id)
    if (inv) {
      setNewInvite(inv)
      setInviteEmail('')
      setInviteTracks([])
      await reload(team.id)
    }
    setInviting(false)
  }

  async function handleUpdateTracks(memberId: string, tracks: string[]) {
    await updateMemberTracks(memberId, tracks)
    if (team) await reload(team.id)
  }

  async function handleRemove(memberId: string) {
    await removeTeamMember(memberId)
    if (team) await reload(team.id)
  }

  async function handleRevokeInvite(inviteId: string) {
    await revokeInvite(inviteId)
    if (team) await reload(team.id)
  }

  function copyInviteLink(token: string) {
    const url = `${window.location.origin}/join/${token}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: '#7C3AED', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (!team) return null

  const activeMembers = members.filter(m => m.status === 'active')
  const pendingMembers = members.filter(m => m.status === 'pending')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black" style={{ color: '#0F172A' }}>Members</h1>
          <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>
            {activeMembers.length} active · {pendingMembers.length} pending · {team.seat_limit} seat limit
          </p>
        </div>
        <button
          onClick={() => { setShowInvite(true); setNewInvite(null) }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: '#7C3AED' }}>
          <UserPlus size={14} /> Invite member
        </button>
      </div>

      {/* Invite panel */}
      <AnimatePresence>
        {showInvite && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}>
            <div className="rounded-2xl p-6"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              {newInvite ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 size={18} style={{ color: '#10B981' }} />
                    <p className="text-sm font-bold" style={{ color: '#0F172A' }}>Invite created!</p>
                  </div>
                  <p className="text-xs mb-3" style={{ color: '#64748B' }}>
                    Share this link with <strong>{newInvite.email}</strong>. It expires in 7 days.
                  </p>
                  <div className="flex items-center gap-2 p-3 rounded-xl"
                    style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <LinkIcon size={13} style={{ color: '#94A3B8', flexShrink: 0 }} />
                    <code className="text-xs flex-1 truncate" style={{ color: '#334155' }}>
                      {typeof window !== 'undefined' ? `${window.location.origin}/join/${newInvite.token}` : `…/join/${newInvite.token}`}
                    </code>
                    <button
                      onClick={() => copyInviteLink(newInvite.token)}
                      className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
                      style={{ background: copied ? '#D1FAE5' : '#EDE9FE', color: copied ? '#10B981' : '#7C3AED' }}>
                      {copied ? <><CheckCheck size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                    </button>
                  </div>
                  <button onClick={() => { setShowInvite(false); setNewInvite(null) }}
                    className="mt-4 text-xs font-semibold hover:underline"
                    style={{ color: '#94A3B8' }}>
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInvite} className="space-y-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-black" style={{ color: '#0F172A' }}>Invite a new member</h3>
                    <button type="button" onClick={() => setShowInvite(false)} style={{ color: '#94A3B8' }}>
                      <X size={15} />
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#334155' }}>Work email</label>
                    <div className="flex items-center gap-2 px-3 rounded-xl"
                      style={{ border: '1.5px solid #E2E8F0', background: '#FAFBFC' }}>
                      <Mail size={13} style={{ color: '#94A3B8' }} />
                      <input
                        type="email" required
                        value={inviteEmail}
                        onChange={e => setInviteEmail(e.target.value)}
                        placeholder="colleague@company.com"
                        className="flex-1 py-2.5 text-sm outline-none bg-transparent"
                        style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: '#334155' }}>
                      Assign tracks <span style={{ color: '#94A3B8', fontWeight: 400 }}>(optional — can be set later)</span>
                    </label>
                    <TrackPicker selected={inviteTracks} onChange={setInviteTracks} />
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setShowInvite(false)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-slate-100"
                      style={{ color: '#64748B', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      Cancel
                    </button>
                    <button type="submit" disabled={inviting}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                      style={{ background: '#7C3AED' }}>
                      {inviting ? 'Creating…' : 'Create invite link'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active members grid */}
      {activeMembers.length > 0 && (
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#94A3B8' }}>
            Active members ({activeMembers.length})
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeMembers.map(m => (
              <MemberCard key={m.id} member={m} onEdit={setEditingMember} onRemove={handleRemove} />
            ))}
          </div>
        </div>
      )}

      {/* Pending invites */}
      {(pendingMembers.length > 0 || invites.length > 0) && (
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#94A3B8' }}>
            Pending invites ({pendingMembers.length + invites.length})
          </p>
          <div className="rounded-2xl overflow-hidden"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            {invites.map((inv, i) => (
              <div key={inv.id}
                className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-slate-50"
                style={{ borderBottom: i < invites.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ background: '#FEF3C7', color: '#D97706' }}>
                  {inv.email.slice(0, 1).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: '#334155' }}>{inv.email}</p>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>
                    Expires {new Date(inv.expires_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => copyInviteLink(inv.token)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
                    style={{ background: '#EDE9FE', color: '#7C3AED' }}>
                    <Copy size={10} /> Copy link
                  </button>
                  <button onClick={() => handleRevokeInvite(inv.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    style={{ color: '#CBD5E1' }} title="Revoke invite">
                    <X size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty */}
      {activeMembers.length === 0 && pendingMembers.length === 0 && invites.length === 0 && (
        <div className="rounded-2xl p-12 text-center"
          style={{ background: '#FFFFFF', border: '2px dashed #E2E8F0' }}>
          <Users size={32} className="mx-auto mb-4" style={{ color: '#CBD5E1' }} />
          <p className="text-sm font-bold mb-1" style={{ color: '#0F172A' }}>No members yet</p>
          <p className="text-xs mb-4" style={{ color: '#94A3B8' }}>Invite your first team member to get started.</p>
          <button onClick={() => setShowInvite(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: '#7C3AED' }}>
            <UserPlus size={13} /> Send first invite
          </button>
        </div>
      )}

      {/* Edit tracks modal */}
      {editingMember && (
        <EditTracksModal
          member={editingMember}
          onSave={handleUpdateTracks}
          onClose={() => setEditingMember(null)}
        />
      )}
    </div>
  )
}
