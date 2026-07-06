'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Settings, Users, ArrowLeft, Save, Check, Loader2,
  Zap, ChevronRight, Mail, Building2, Briefcase, Target,
  Crown, AlertCircle, Copy, ExternalLink, UserPlus, X,
  Lock, Eye, EyeOff, Camera,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabase/client'
import {
  getAdminTeam, getMemberTeam, createTeam, createInvite,
  type Team, type TeamMember,
} from '@/lib/supabase/teams'
import { getAllTracks } from '@/lib/curriculum'
import type { TrackId } from '@/lib/curriculum/types'
import {
  PAPER, PAPER_2, PANEL, INK, INK_SOFT, INK_FAINT,
  COBALT, RULE, SERIF, MONO, SANS,
} from "@/components/editorial/theme"

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'preferences', label: 'Preferences', icon: Settings },
  { id: 'team', label: 'Team', icon: Users },
] as const
type Tab = typeof TABS[number]['id']

const TRACK_COLORS: Record<string, string> = {
  marketing: '#E04D2A', finance: '#F59E0B', hr: '#10B981',
  sales: '#3B82F6', operations: '#22D3EE', leadership: '#F97316',
  legal: '#0284C7', product: '#14B8A6', customer: '#DC2626', consulting: '#0EA5E9', it: '#6366F1',
}

const PLAN_OPTIONS = [
  { id: 'starter', label: 'Starter', seats: '15 seats', desc: 'Small teams getting started', color: '#10B981' },
  { id: 'growth', label: 'Growth', seats: '50 seats', desc: 'Growing teams at scale', color: COBALT },
  { id: 'enterprise', label: 'Enterprise', seats: 'Unlimited', desc: 'Large organisations', color: '#7C3AED' },
] as const

// ─── Saved badge ──────────────────────────────────────────────────────────────

function SavedBadge({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg"
          style={{ background: '#F0FDF4', color: '#10B981', border: '1px solid #BBF7D0' }}
        >
          <Check size={11} /> Saved
        </motion.span>
      )}
    </AnimatePresence>
  )
}

// ─── Section card ─────────────────────────────────────────────────────────────

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: PAPER_2, border: `1px solid ${RULE}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-5" style={{ color: INK_FAINT, fontFamily: MONO }}>
        {title}
      </p>
      {children}
    </div>
  )
}

// ─── Text field ───────────────────────────────────────────────────────────────

function Field({
  icon: Icon, label, value, onChange, placeholder, type = 'text',
}: {
  icon: React.ElementType; label: string; value: string
  onChange: (v: string) => void; placeholder: string; type?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: INK_SOFT, fontFamily: SANS }}>
        {label}
      </label>
      <div className="relative">
        <Icon size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: INK_FAINT }} />
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
          style={{ background: PANEL, border: `1.5px solid ${RULE}`, color: INK, fontFamily: SANS }}
          onFocus={e => { e.currentTarget.style.borderColor = COBALT; e.currentTarget.style.background = PAPER_2 }}
          onBlur={e => { e.currentTarget.style.borderColor = RULE; e.currentTarget.style.background = PANEL }}
        />
      </div>
    </div>
  )
}

// ─── Profile tab ──────────────────────────────────────────────────────────────

function PasswordField({
  label, value, onChange, placeholder, show, onToggle,
}: {
  label: string; value: string; onChange: (v: string) => void
  placeholder: string; show: boolean; onToggle: () => void
}) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: INK_SOFT, fontFamily: SANS }}>
        {label}
      </label>
      <div className="relative">
        <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: INK_FAINT }} />
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all"
          style={{ background: PANEL, border: `1.5px solid ${RULE}`, color: INK, fontFamily: SANS }}
          onFocus={e => { e.currentTarget.style.borderColor = COBALT; e.currentTarget.style.background = PAPER_2 }}
          onBlur={e => { e.currentTarget.style.borderColor = RULE; e.currentTarget.style.background = PANEL }}
        />
        <button
          type="button" onClick={onToggle}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors hover:text-slate-500"
          style={{ color: INK_FAINT }}
        >
          {show ? <EyeOff size={13} /> : <Eye size={13} />}
        </button>
      </div>
    </div>
  )
}

function ProfileTab({ user }: { user: { email?: string; user_metadata?: Record<string, string>; app_metadata?: Record<string, string> } }) {
  const isOAuth = !!(user.app_metadata?.provider && user.app_metadata.provider !== 'email')
  const [name, setName] = useState(user.user_metadata?.full_name ?? '')
  const [jobTitle, setJobTitle] = useState(user.user_metadata?.job_title ?? '')
  const [company, setCompany] = useState(user.user_metadata?.company ?? '')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  // Avatar
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? null
  )
  const [avatarUploading, setAvatarUploading] = useState(false)
  const [avatarError, setAvatarError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Password change
  const [pwOpen, setPwOpen] = useState(false)
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pwLoading, setPwLoading] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSaved, setPwSaved] = useState(false)

  const supabase = useRef(createClient())

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarError('')
    setAvatarUploading(true)

    const body = new FormData()
    body.append('file', file)

    const res = await fetch('/api/user/avatar', { method: 'POST', body })
    const json = await res.json()

    if (!res.ok) {
      setAvatarError(json.error ?? 'Upload failed')
      setAvatarUploading(false)
      return
    }

    const url = `${json.url}?t=${Date.now()}`
    await supabase.current.auth.updateUser({ data: { avatar_url: url } })
    setAvatarUrl(url)
    setAvatarUploading(false)
    // Reset input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.current.auth.updateUser({
      data: { full_name: name, job_title: jobTitle, company },
    })
    setLoading(false)
    if (error) { setError(error.message); return }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault()
    setPwError('')
    if (newPw !== confirmPw) { setPwError('New passwords do not match.'); return }
    if (newPw.length < 6) { setPwError('New password must be at least 6 characters.'); return }
    setPwLoading(true)

    // Re-authenticate with current password first
    const { error: authErr } = await supabase.current.auth.signInWithPassword({
      email: user.email ?? '',
      password: currentPw,
    })
    if (authErr) {
      setPwLoading(false)
      setPwError('Current password is incorrect.')
      return
    }

    const { error: updateErr } = await supabase.current.auth.updateUser({ password: newPw })
    setPwLoading(false)
    if (updateErr) { setPwError(updateErr.message); return }

    setPwSaved(true)
    setCurrentPw('')
    setNewPw('')
    setConfirmPw('')
    setTimeout(() => { setPwSaved(false); setPwOpen(false) }, 3000)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: easing }}
      className="space-y-5">
      <SectionCard title="Personal info">
        {/* Avatar picker */}
        <div className="flex items-center gap-5 mb-6 pb-6" style={{ borderBottom: `1px solid ${RULE}` }}>
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${COBALT}, #22D3EE)` }}>
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="Profile" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg font-black text-white" style={{ fontFamily: SANS }}>
                  {name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : user.email?.slice(0, 2).toUpperCase()}
                </span>
              )}
              {avatarUploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl" style={{ background: 'rgba(0,0,0,0.4)' }}>
                  <Loader2 size={18} className="animate-spin text-white" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={avatarUploading}
              className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: COBALT, boxShadow: '0 2px 6px rgba(36,64,216,0.4)' }}
            >
              <Camera size={11} className="text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div>
            <p className="text-sm font-semibold mb-0.5" style={{ color: INK, fontFamily: SANS }}>Profile picture</p>
            <p className="text-xs" style={{ color: INK_FAINT, fontFamily: SANS }}>JPEG, PNG, WebP or GIF — max 2 MB</p>
            {avatarError && (
              <p className="text-xs mt-1.5 font-semibold" style={{ color: '#EF4444', fontFamily: SANS }}>{avatarError}</p>
            )}
          </div>
        </div>

        <form onSubmit={save} className="space-y-4">
          <Field icon={User} label="Display name" value={name} onChange={setName} placeholder="Your full name" />
          <Field icon={Briefcase} label="Job title" value={jobTitle} onChange={setJobTitle} placeholder="e.g. Marketing Manager" />
          <Field icon={Building2} label="Company" value={company} onChange={setCompany} placeholder="Your company name" />
          <Field icon={Mail} label="Email" value={user.email ?? ''} onChange={() => {}} placeholder="" type="email" />

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', fontFamily: SANS }}>
                <AlertCircle size={13} className="flex-shrink-0" />{error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit" disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: COBALT, boxShadow: '0 4px 14px rgba(36,64,216,0.2)', fontFamily: SANS }}
            >
              {loading ? <><Loader2 size={13} className="animate-spin" /> Saving…</> : <><Save size={13} /> Save changes</>}
            </button>
            <SavedBadge show={saved} />
          </div>
        </form>
      </SectionCard>

      <SectionCard title="Password">
        {isOAuth ? (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: PAPER, border: `1px solid ${RULE}` }}>
            <Lock size={13} style={{ color: INK_FAINT, flexShrink: 0 }} />
            <p className="text-sm" style={{ color: INK_SOFT, fontFamily: SANS }}>
              Password is managed by your sign-in provider ({user.app_metadata?.provider === 'linkedin_oidc' ? 'LinkedIn' : 'Google'}).
            </p>
          </div>
        ) : (
        <>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: INK, fontFamily: SANS }}>Change password</p>
            <p className="text-xs mt-0.5" style={{ color: INK_FAINT, fontFamily: SANS }}>
              {pwOpen ? 'Enter your current and new password below.' : 'Update your account password.'}
            </p>
          </div>
          {!pwOpen && (
            <button
              onClick={() => setPwOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors hover:opacity-80"
              style={{ background: PANEL, color: COBALT, fontFamily: SANS }}
            >
              Change <ChevronRight size={12} />
            </button>
          )}
        </div>

        <AnimatePresence>
          {pwOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <form onSubmit={changePassword} className="space-y-3 mt-5">
                <PasswordField
                  label="Current password" value={currentPw} onChange={setCurrentPw}
                  placeholder="Your current password" show={showCurrent} onToggle={() => setShowCurrent(v => !v)}
                />
                <PasswordField
                  label="New password" value={newPw} onChange={setNewPw}
                  placeholder="Min. 6 characters" show={showNew} onToggle={() => setShowNew(v => !v)}
                />
                <PasswordField
                  label="Confirm new password" value={confirmPw} onChange={setConfirmPw}
                  placeholder="Repeat new password" show={showConfirm} onToggle={() => setShowConfirm(v => !v)}
                />

                <AnimatePresence>
                  {pwError && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                      style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', fontFamily: SANS }}>
                      <AlertCircle size={13} className="flex-shrink-0" />{pwError}
                    </motion.div>
                  )}
                  {pwSaved && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                      style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#10B981', fontFamily: SANS }}>
                      <Check size={13} /> Password updated successfully
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="submit" disabled={pwLoading || !currentPw || !newPw || !confirmPw}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: COBALT, boxShadow: '0 4px 14px rgba(36,64,216,0.2)', fontFamily: SANS }}
                  >
                    {pwLoading ? <><Loader2 size={13} className="animate-spin" /> Updating…</> : <><Lock size={13} /> Update password</>}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPwOpen(false); setPwError(''); setCurrentPw(''); setNewPw(''); setConfirmPw('') }}
                    className="text-xs font-semibold transition-colors hover:text-slate-600"
                    style={{ color: INK_FAINT, fontFamily: SANS }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        </>
        )}
      </SectionCard>
    </motion.div>
  )
}

// ─── Preferences tab ──────────────────────────────────────────────────────────

const DAILY_GOALS = [
  { value: '1', label: '1 lesson / week', desc: 'Light touch' },
  { value: '3', label: '3 lessons / week', desc: 'Steady pace' },
  { value: '5', label: '5 lessons / week', desc: 'Committed' },
  { value: '7', label: 'Daily', desc: 'Full focus' },
]

function PreferencesTab() {
  const { user } = useAuth()
  const tracks = getAllTracks()
  const [primaryTrack, setPrimaryTrack] = useState<TrackId | ''>('')
  const [dailyGoal, setDailyGoal] = useState('3')
  const [emailDigest, setEmailDigest] = useState(true)
  const [saved, setSaved] = useState(false)
  const supabase = useRef(createClient())

  useEffect(() => {
    // Load digest preference from Supabase, with localStorage fallback
    async function load() {
      if (user) {
        const { data } = await supabase.current
          .from('user_progress')
          .select('digest_opt_out')
          .eq('user_id', user.id)
          .single()
        if (data) setEmailDigest(!data.digest_opt_out)
      }
      try {
        const raw = localStorage.getItem('opuslearn-preferences')
        if (raw) {
          const p = JSON.parse(raw)
          if (p.primaryTrack) setPrimaryTrack(p.primaryTrack)
          if (p.dailyGoal) setDailyGoal(p.dailyGoal)
        }
      } catch { /* ignore */ }
    }
    load()
  }, [user])

  async function save() {
    localStorage.setItem('opuslearn-preferences', JSON.stringify({ primaryTrack, dailyGoal, emailDigest }))
    if (user) {
      await supabase.current
        .from('user_progress')
        .upsert({ user_id: user.id, digest_opt_out: !emailDigest }, { onConflict: 'user_id' })
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: easing }}
      className="space-y-5">
      <SectionCard title="Learning track">
        <p className="text-sm mb-4" style={{ color: INK_SOFT, fontFamily: SANS }}>
          Pick your primary focus area. This personalises your dashboard recommendations.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {tracks.map(t => {
            const color = TRACK_COLORS[t.id] ?? COBALT
            const selected = primaryTrack === t.id
            return (
              <button
                key={t.id}
                onClick={() => setPrimaryTrack(t.id as TrackId)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all"
                style={{
                  background: selected ? `${color}12` : PANEL,
                  border: selected ? `1.5px solid ${color}` : `1.5px solid ${RULE}`,
                }}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="text-xs font-semibold truncate" style={{ color: selected ? color : INK_SOFT, fontFamily: SANS }}>
                  {t.title}
                </span>
              </button>
            )
          })}
        </div>
      </SectionCard>

      <SectionCard title="Weekly goal">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {DAILY_GOALS.map(g => {
            const selected = dailyGoal === g.value
            return (
              <button
                key={g.value}
                onClick={() => setDailyGoal(g.value)}
                className="flex flex-col items-center gap-1 py-4 rounded-xl transition-all"
                style={{
                  background: selected ? COBALT : PANEL,
                  border: selected ? `1.5px solid ${COBALT}` : `1.5px solid ${RULE}`,
                }}
              >
                <span className="text-sm font-black" style={{ color: selected ? PAPER_2 : INK, fontFamily: SANS }}>
                  {g.value === '7' ? '7' : g.value}
                </span>
                <span className="text-[10px] font-semibold" style={{ color: selected ? '#BFDBFE' : INK_FAINT, fontFamily: SANS }}>
                  {g.desc}
                </span>
              </button>
            )
          })}
        </div>
      </SectionCard>

      <SectionCard title="Notifications">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: INK, fontFamily: SANS }}>Weekly progress digest</p>
            <p className="text-xs mt-0.5" style={{ color: INK_FAINT, fontFamily: SANS }}>A summary of your learning activity each week</p>
          </div>
          <button
            onClick={() => setEmailDigest(v => !v)}
            className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
            style={{ background: emailDigest ? COBALT : RULE }}
          >
            <span
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all"
              style={{ left: emailDigest ? '1.375rem' : '0.125rem' }}
            />
          </button>
        </div>
      </SectionCard>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: COBALT, boxShadow: '0 4px 14px rgba(36,64,216,0.2)', fontFamily: SANS }}
        >
          <Save size={13} /> Save preferences
        </button>
        <SavedBadge show={saved} />
      </div>
    </motion.div>
  )
}

// ─── Team tab ─────────────────────────────────────────────────────────────────

function TeamTab({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(true)
  const [adminTeam, setAdminTeam] = useState<Team | null>(null)
  const [memberInfo, setMemberInfo] = useState<{ team: Team; member: TeamMember } | null>(null)

  // Create team form
  const [teamName, setTeamName] = useState('')
  const [plan, setPlan] = useState<'starter' | 'growth' | 'enterprise'>('starter')
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')

  // Invite form
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviting, setInviting] = useState(false)
  const [inviteSuccess, setInviteSuccess] = useState(false)
  const [inviteError, setInviteError] = useState('')

  // Copy invite link
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function load() {
      const [admin, member] = await Promise.all([
        getAdminTeam(userId),
        getMemberTeam(userId),
      ])
      setAdminTeam(admin)
      setMemberInfo(member)
      setLoading(false)
    }
    load()
  }, [userId])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!teamName.trim()) return
    setCreating(true)
    setCreateError('')
    const team = await createTeam(userId, teamName.trim(), plan)
    if (!team) { setCreateError('Failed to create team. Please try again.'); setCreating(false); return }
    setAdminTeam(team)
    setCreating(false)
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault()
    if (!adminTeam || !inviteEmail.trim()) return
    setInviting(true)
    setInviteError('')
    const result = await createInvite(adminTeam.id, inviteEmail.trim(), [], userId)
    setInviting(false)
    if (!result) { setInviteError('Failed to send invite. Please try again.'); return }
    setInviteSuccess(true)
    setInviteEmail('')
    setTimeout(() => setInviteSuccess(false), 4000)
  }

  function copyInviteLink() {
    if (!adminTeam) return
    const url = `${window.location.origin}/join/${adminTeam.id}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 size={22} className="animate-spin" style={{ color: COBALT }} />
      </div>
    )
  }

  const team = adminTeam ?? memberInfo?.team ?? null
  const isAdmin = !!adminTeam

  // Already in a team
  if (team) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: easing }}
        className="space-y-5">
        <SectionCard title="Your team">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(36,64,216,0.12)' }}>
              <Users size={20} style={{ color: COBALT }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg truncate" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>
                {team.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-lg capitalize"
                  style={{ background: PANEL, color: COBALT, fontFamily: SANS }}>
                  {team.plan}
                </span>
                {isAdmin && (
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-lg"
                    style={{ background: '#FEF3C7', color: '#D97706', fontFamily: SANS }}>
                    <Crown size={10} /> Admin
                  </span>
                )}
              </div>
            </div>
            <Link
              href="/dashboard/team"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors hover:opacity-80 flex-shrink-0"
              style={{ background: 'rgba(36,64,216,0.12)', color: COBALT, fontFamily: SANS }}
            >
              Manage <ExternalLink size={11} />
            </Link>
          </div>
        </SectionCard>

        {isAdmin && (
          <SectionCard title="Invite members">
            <p className="text-sm mb-4" style={{ color: INK_SOFT, fontFamily: SANS }}>
              Invite people by email or share the team link.
            </p>

            <form onSubmit={handleInvite} className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: INK_FAINT }} />
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: PANEL, border: `1.5px solid ${RULE}`, color: INK, fontFamily: SANS }}
                  onFocus={e => { e.currentTarget.style.borderColor = COBALT; e.currentTarget.style.background = PAPER_2 }}
                  onBlur={e => { e.currentTarget.style.borderColor = RULE; e.currentTarget.style.background = PANEL }}
                />
              </div>
              <button
                type="submit" disabled={inviting}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 flex-shrink-0"
                style={{ background: COBALT, fontFamily: SANS }}
              >
                {inviting ? <Loader2 size={13} className="animate-spin" /> : <UserPlus size={13} />}
                Invite
              </button>
            </form>

            <AnimatePresence>
              {inviteSuccess && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm mb-3"
                  style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#10B981', fontFamily: SANS }}>
                  <Check size={13} /> Invite sent successfully
                </motion.div>
              )}
              {inviteError && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm mb-3"
                  style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', fontFamily: SANS }}>
                  <AlertCircle size={13} className="flex-shrink-0" />{inviteError}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 px-3 py-2.5 rounded-xl text-xs truncate"
                style={{ background: PANEL, border: `1px solid ${RULE}`, color: INK_SOFT, fontFamily: SANS }}>
                {typeof window !== 'undefined' ? `${window.location.origin}/join/${team.id}` : ''}
              </div>
              <button
                onClick={copyInviteLink}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2.5 rounded-xl transition-all hover:opacity-80 flex-shrink-0"
                style={{ background: copied ? '#F0FDF4' : 'rgba(36,64,216,0.12)', color: copied ? '#10B981' : COBALT, fontFamily: SANS }}
              >
                {copied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy link</>}
              </button>
            </div>
          </SectionCard>
        )}
      </motion.div>
    )
  }

  // No team — show create form
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: easing }}
      className="space-y-5">
      <SectionCard title="Create your team">
        <p className="text-sm mb-6" style={{ color: INK_SOFT, fontFamily: SANS }}>
          Set up a team workspace to assign tracks, track progress, and manage your organisation's AI learning.
        </p>

        <form onSubmit={handleCreate} className="space-y-5">
          <Field icon={Users} label="Team name" value={teamName} onChange={setTeamName} placeholder="e.g. Acme Corp" />

          <div>
            <label className="block text-xs font-semibold mb-3" style={{ color: INK_SOFT, fontFamily: SANS }}>
              Plan
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PLAN_OPTIONS.map(p => {
                const selected = plan === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlan(p.id)}
                    className="flex flex-col items-start gap-1 p-4 rounded-xl text-left transition-all"
                    style={{
                      background: selected ? `${p.color}10` : PANEL,
                      border: selected ? `1.5px solid ${p.color}` : `1.5px solid ${RULE}`,
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm font-black" style={{ color: selected ? p.color : INK, fontFamily: SANS }}>
                        {p.label}
                      </span>
                      {selected && <Check size={13} style={{ color: p.color }} />}
                    </div>
                    <span className="text-xs font-semibold" style={{ color: p.color, fontFamily: SANS }}>
                      {p.seats}
                    </span>
                    <span className="text-xs" style={{ color: INK_FAINT, fontFamily: SANS }}>
                      {p.desc}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <AnimatePresence>
            {createError && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', fontFamily: SANS }}>
                <AlertCircle size={13} className="flex-shrink-0" />{createError}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit" disabled={creating || !teamName.trim()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: COBALT, boxShadow: '0 4px 14px rgba(36,64,216,0.2)', fontFamily: SANS }}
          >
            {creating ? <><Loader2 size={13} className="animate-spin" /> Creating…</> : <><Zap size={13} /> Create team</>}
          </button>
        </form>
      </SectionCard>

      <div className="rounded-2xl p-6" style={{ background: PANEL, border: `1px solid rgba(36,64,216,0.12)` }}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(36,64,216,0.12)' }}>
            <Target size={16} style={{ color: COBALT }} />
          </div>
          <div>
            <p className="text-sm font-bold mb-1" style={{ color: INK, fontFamily: SANS }}>
              Already have a team invite?
            </p>
            <p className="text-xs leading-relaxed" style={{ color: INK_SOFT, fontFamily: SANS }}>
              Check your email for an invite link from your team admin. Clicking it will automatically add you to their workspace.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('profile')
  const [isInTeam, setIsInTeam] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) { router.replace('/'); return }
    if (!user) return
    Promise.all([getAdminTeam(user.id), getMemberTeam(user.id)]).then(([admin, member]) => {
      const inTeam = !!(admin || member)
      setIsInTeam(inTeam)
      if (!inTeam && tab === 'team') setTab('profile')
    })
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: PAPER }}>
        <Loader2 size={24} className="animate-spin" style={{ color: COBALT }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderColor: RULE }}>
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm transition-colors hover:text-slate-700"
            style={{ color: INK_FAINT, fontFamily: SANS }}
          >
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <span style={{ color: RULE }}>/</span>
          <span className="text-sm font-semibold" style={{ color: INK, fontFamily: SANS }}>Settings</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: easing }}
          className="mb-8"
        >
          <h1 className="text-3xl mb-1" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>Settings</h1>
          <p className="text-sm" style={{ color: INK_SOFT, fontFamily: SANS }}>
            Manage your profile, learning preferences, and team.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl mb-8" style={{ background: PANEL, border: `1px solid ${RULE}`, width: 'fit-content' }}>
          {TABS.filter(t => t.id !== 'team' || isInTeam).map(t => {
            const Icon = t.icon
            const active = tab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-semibold uppercase tracking-[0.12em] transition-all"
                style={{
                  background: active ? PAPER_2 : 'transparent',
                  color: active ? COBALT : INK_FAINT,
                  boxShadow: active ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                  fontFamily: MONO,
                }}
              >
                <Icon size={13} />
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {tab === 'profile' && <ProfileTab key="profile" user={user as { email?: string; user_metadata?: Record<string, string>; app_metadata?: Record<string, string> }} />}
          {tab === 'preferences' && <PreferencesTab key="preferences" />}
          {tab === 'team' && <TeamTab key="team" userId={user.id} />}
        </AnimatePresence>
      </div>
    </div>
  )
}
