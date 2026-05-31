'use client'

import { useState } from 'react'
import { Building2, Trash2 } from 'lucide-react'

interface TeamRow {
  id: string
  name: string
  plan: string
  created_by: string
  seat_limit: number
  created_at: string
}

interface AdminUser {
  id: string
  email?: string
  user_metadata: { full_name?: string }
}

interface Props {
  teams: TeamRow[]
  membersByTeam: Record<string, { active: number; pending: number }>
  users: AdminUser[]
}

const PLAN_COLORS: Record<string, string> = {
  starter: '#94A3B8', growth: '#22D3EE', enterprise: '#2563EB',
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })
}

export function AdminTeamsTable({ teams: initialTeams, membersByTeam: initialMembersByTeam, users }: Props) {
  const [teams, setTeams] = useState(initialTeams)
  const [membersByTeam] = useState(initialMembersByTeam)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(teamId: string) {
    setDeleting(teamId)
    const res = await fetch('/api/admin/delete-team', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamId }),
    })
    if (res.ok) {
      setTeams(prev => prev.filter(t => t.id !== teamId))
    }
    setDeleting(null)
    setConfirmDelete(null)
  }

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Building2 size={14} style={{ color: '#2563EB' }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>All Teams</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              {['Team', 'Plan', 'Admin', 'Active members', 'Pending', 'Seats', 'Created', ''].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '40px 16px', textAlign: 'center', color: '#CBD5E1', fontSize: 13 }}>No teams yet</td>
              </tr>
            ) : teams.map((t, i) => {
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
                  <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                    {confirmDelete === t.id ? (
                      <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                        <button onClick={() => handleDelete(t.id)} disabled={deleting === t.id}
                          style={{ fontSize: 11, padding: '3px 8px', borderRadius: 5, background: '#FEE2E2', color: '#DC2626', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
                          {deleting === t.id ? '…' : 'Confirm'}
                        </button>
                        <button onClick={() => setConfirmDelete(null)}
                          style={{ fontSize: 11, padding: '3px 8px', borderRadius: 5, background: '#F1F5F9', color: '#64748B', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button onClick={() => setConfirmDelete(t.id)}
                        style={{ fontSize: 11, padding: '3px 8px', borderRadius: 5, background: '#FFF1F2', color: '#E11D48', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Trash2 size={10} /> Delete
                      </button>
                    )}
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
