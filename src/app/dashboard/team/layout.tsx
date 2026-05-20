'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'
import { LayoutDashboard, Users, BarChart3, BookOpen, LogOut, ChevronRight } from 'lucide-react'
import Logo from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'
import { getAdminTeam } from '@/lib/supabase/teams'
import type { Team } from '@/lib/supabase/teams'

const NAV = [
  { href: '/dashboard/team', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/team/members', label: 'Members', icon: Users },
  { href: '/dashboard/team/analytics', label: 'Analytics', icon: BarChart3 },
]

export default function TeamDashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [team, setTeam] = useState<Team | null>(null)
  const [checking, setChecking] = useState(true)
  const isCreatePage = pathname === '/dashboard/team/create'

  useEffect(() => {
    // Create page handles its own auth — skip team checks
    if (isCreatePage) { setChecking(false); return }
    if (loading) return
    if (!user) { router.replace('/'); return }

    getAdminTeam(user.id).then(t => {
      if (!t) {
        router.replace('/dashboard/team/create')
      } else {
        setTeam(t)
      }
      setChecking(false)
    })
  }, [user, loading, router, isCreatePage])

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#EFF6FF' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: '#2563EB', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  // Create page has its own standalone layout — skip the sidebar
  if (isCreatePage) return <>{children}</>

  if (!user || !team) return null

  const initials = user.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email?.slice(0, 2).toUpperCase() ?? '?'

  return (
    <div className="min-h-screen flex" style={{ background: '#EFF6FF', fontFamily: 'var(--font-sans)' }}>
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0"
        style={{ background: '#FFFFFF', borderRight: '1px solid #E2E8F0', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        {/* Logo */}
        <div className="px-5 py-5" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <Link href="/">
            <Logo size="sm" />
          </Link>
        </div>

        {/* Team name */}
        <div className="px-5 py-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: '#94A3B8' }}>Team</p>
          <p className="text-sm font-bold truncate" style={{ color: '#0F172A' }}>{team.name}</p>
          <span className="text-[10px] font-semibold capitalize px-1.5 py-0.5 rounded-md mt-1 inline-block"
            style={{ background: '#DBEAFE', color: '#2563EB' }}>{team.plan}</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(item => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: active ? '#DBEAFE' : 'transparent',
                  color: active ? '#2563EB' : '#64748B',
                }}>
                <Icon size={16} />
                {item.label}
              </Link>
            )
          })}

          <div className="pt-4 mt-4" style={{ borderTop: '1px solid #F1F5F9' }}>
            <Link href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-500 hover:bg-slate-50">
              <BookOpen size={16} />
              My learning
            </Link>
          </div>
        </nav>

        {/* User */}
        <div className="px-4 py-4" style={{ borderTop: '1px solid #F1F5F9' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: '#2563EB' }}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: '#0F172A' }}>
                {user.user_metadata?.full_name ?? user.email?.split('@')[0]}
              </p>
              <p className="text-[10px] truncate" style={{ color: '#94A3B8' }}>Admin</p>
            </div>
            <button onClick={signOut} className="text-slate-400 hover:text-slate-600 transition-colors">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: '#2563EB' }}>
            <Zap size={11} className="text-white" />
          </div>
          <span className="font-black text-sm" style={{ color: '#0F172A' }}>Team — {team.name}</span>
        </Link>
        <div className="flex items-center gap-3">
          {NAV.map(item => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}
                className="p-1.5 rounded-lg transition-colors"
                style={{ background: active ? '#DBEAFE' : 'transparent', color: active ? '#2563EB' : '#94A3B8' }}>
                <Icon size={16} />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 lg:pt-0 pt-14 min-w-0">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs mb-6" style={{ color: '#94A3B8' }}>
            <span>{team.name}</span>
            <ChevronRight size={11} />
            <span style={{ color: '#334155', fontWeight: 600 }}>
              {NAV.find(n => n.exact ? pathname === n.href : pathname.startsWith(n.href))?.label ?? 'Team'}
            </span>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
