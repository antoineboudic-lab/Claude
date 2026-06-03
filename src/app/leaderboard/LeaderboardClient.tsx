'use client'

import Link from 'next/link'
import { Zap, Award, Flame, BookOpen, Trophy, ArrowRight, ChevronLeft } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import type { LeaderboardEntry } from '@/app/api/leaderboard/route'

function MedalIcon({ rank }: { rank: number }) {
  const colors: Record<number, string> = { 1: '#F59E0B', 2: '#94A3B8', 3: '#CD7F32' }
  const color = colors[rank]
  if (!color) return <span style={{ fontSize: 14, fontWeight: 700, color: '#64748B' }}>{rank}</span>
  return <Award size={20} style={{ color }} />
}

function AvatarInitial({ name, size = 36 }: { name: string; size?: number }) {
  const palettes = [
    { bg: '#DBEAFE', color: '#1E40AF' },
    { bg: '#D1FAE5', color: '#065F46' },
    { bg: '#FEF3C7', color: '#92400E' },
    { bg: '#FCE7F3', color: '#9D174D' },
    { bg: '#EDE9FE', color: '#5B21B6' },
    { bg: '#CFFAFE', color: '#164E63' },
  ]
  const idx = name.charCodeAt(0) % palettes.length
  const palette = palettes[idx]
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: palette.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <span style={{ fontSize: size * 0.4, fontWeight: 700, color: palette.color }}>
        {name[0]?.toUpperCase() ?? '?'}
      </span>
    </div>
  )
}

export default function LeaderboardClient({ entries }: { entries: LeaderboardEntry[] }) {
  const { user } = useAuth()

  const myRank = user ? (entries.find(e => e.userId === user.id)?.rank ?? null) : null
  const totalXP = entries.reduce((sum, e) => sum + e.xp, 0)
  const maxLessons = entries.length > 0 ? entries[0].lessons : 0
  const maxStreak = entries.length > 0 ? Math.max(...entries.map(e => e.streak)) : 0

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: 'var(--font-sans)' }}>
      <nav style={{
        background: '#0F172A', height: 52, display: 'flex', alignItems: 'center',
        padding: '0 24px', position: 'sticky', top: 0, zIndex: 50, gap: 8,
      }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', color: '#94A3B8' }}>
          <ChevronLeft size={16} />
        </Link>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <Zap size={20} style={{ color: '#2563EB' }} />
          <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15 }}>OpusLearn</span>
        </Link>
        <span style={{ color: '#475569', fontSize: 15 }}>/</span>
        <Link href="/leaderboard" style={{ color: '#94A3B8', fontSize: 15, textDecoration: 'none', fontWeight: 500 }}>
          Leaderboard
        </Link>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', margin: '0 0 8px', letterSpacing: '-0.03em' }}>
            Leaderboard
          </h1>
          <p style={{ fontSize: 15, color: '#64748B', margin: 0 }}>Top learners this week by XP</p>
          {myRank && myRank <= 20 && (
            <p style={{ fontSize: 13, color: '#2563EB', marginTop: 6, fontWeight: 600 }}>
              You are in the top 20!
            </p>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 24px' }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Zap size={15} style={{ color: '#2563EB' }} />
            </div>
            <p style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: '0 0 2px', letterSpacing: '-0.03em', lineHeight: 1 }}>
              {totalXP.toLocaleString()}
            </p>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Total XP earned</p>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 24px' }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <BookOpen size={15} style={{ color: '#059669' }} />
            </div>
            <p style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: '0 0 2px', letterSpacing: '-0.03em', lineHeight: 1 }}>
              {maxLessons}
            </p>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Most lessons completed</p>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 24px' }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Flame size={15} style={{ color: '#D97706' }} />
            </div>
            <p style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: '0 0 2px', letterSpacing: '-0.03em', lineHeight: 1 }}>
              {maxStreak}
            </p>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Longest streak (days)</p>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden' }}>
          {entries.length === 0 ? (
            <div style={{ padding: '64px 24px', textAlign: 'center', color: '#CBD5E1' }}>
              <Trophy size={40} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.4 }} />
              <p style={{ fontSize: 15, margin: 0 }}>No learners yet — be the first!</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  {['Rank', 'Learner', 'XP', 'Lessons', 'Streak', 'Tracks', 'Badges'].map(h => (
                    <th key={h} style={{
                      padding: '12px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600,
                      color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries.map(entry => {
                  const isMe = user?.id === entry.userId
                  return (
                    <tr key={entry.userId} style={{ borderBottom: '1px solid #F8FAFC', background: isMe ? '#EFF6FF' : 'transparent' }}>
                      <td style={{ padding: '14px 20px', width: 56 }}>
                        {entry.rank <= 3 ? (
                          <MedalIcon rank={entry.rank} />
                        ) : (
                          <span style={{ fontSize: 14, fontWeight: 500, color: '#64748B' }}>{entry.rank}</span>
                        )}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <AvatarInitial name={entry.name} />
                          <span style={{ fontSize: 14, fontWeight: isMe ? 700 : 500, color: '#0F172A' }}>
                            {entry.name}
                            {isMe && <span style={{ fontSize: 12, color: '#2563EB', fontWeight: 600, marginLeft: 6 }}>(you)</span>}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{entry.xp.toLocaleString()}</span>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: 14, color: '#475569' }}>{entry.lessons}</span>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Flame size={13} style={{ color: '#F59E0B' }} />
                          <span style={{ fontSize: 14, color: '#475569' }}>{entry.streak}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: 14, color: '#475569' }}>{entry.tracks}</span>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: 14, color: '#475569' }}>{entry.badges}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <Link href="/dashboard" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: '#2563EB', fontWeight: 600, fontSize: 14, textDecoration: 'none',
          }}>
            See your progress <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
