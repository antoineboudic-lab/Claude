'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import {
  Sparkles, Target, TrendingUp, Briefcase, HeartHandshake,
  Megaphone, Settings, ArrowRight, Check, Star, Zap, Award,
  LineChart, GraduationCap, ClipboardList, CheckCircle2,
  ChevronRight, ChevronDown, Play, Route, LogOut, BookOpen, X, Users,
  Brain, Layers, BarChart3, Menu, Scale, Package, Headphones, BarChart, Search,
  Flame, LayoutDashboard,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/context/AuthContext'
import { useGame } from '@/context/GameContext'
import Logo from '@/components/Logo'
import GlobalSearch from '@/components/GlobalSearch'
import { useGeo } from '@/hooks/useGeo'

// ─── Animation ────────────────────────────────────────────────────────────────

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easing } },
}

function stagger(delay = 0.1) {
  return { hidden: {}, visible: { transition: { staggerChildren: delay } } }
}

function useReveal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return { ref, isInView }
}

// ─── StickySignUpBar ──────────────────────────────────────────────────────────

function StickySignUpBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const { user, openSignUp, openSignIn } = useAuth()
  const tBar = useTranslations('home.stickyBar')
  const tNav = useTranslations('nav')

  useEffect(() => {
    if (dismissed || user) return
    const handler = () => setVisible(window.scrollY > window.innerHeight * 0.85)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [user, dismissed])

  return (
    <AnimatePresence>
      {visible && !dismissed && !user && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 38 }}
          className="fixed bottom-0 left-0 right-0 z-50 px-6 py-4"
          style={{ background: '#FFFFFF', boxShadow: '0 -1px 0 #E2E8F0, 0 -8px 32px rgba(0,0,0,0.06)' }}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                {tBar('title', { count: '3,200' })}
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                {tBar('sub')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={openSignIn} className="text-sm font-medium transition-colors hover:text-slate-900"
                style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                {tNav('signIn')}
              </button>
              <Link href="/assessment"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: '#2563EB', fontFamily: 'var(--font-sans)' }}>
                {tBar('buildPlan')} <ArrowRight size={13} />
              </Link>
              <button onClick={() => setDismissed(true)}
                className="w-7 h-7 rounded-md flex items-center justify-center transition-colors hover:bg-slate-100"
                style={{ color: '#94A3B8' }}>
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { user, loading, openSignIn, signOut } = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const tNav = useTranslations('nav')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setAvatarOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(v => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? '?'

  const solidBg = scrolled || mobileOpen

  return (
    <>
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-200"
      style={{
        background: solidBg ? 'rgba(255,255,255,0.98)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: solidBg ? '1px solid #E2E8F0' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo size="md" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: tNav('program'), href: '#program' },
            { label: tNav('tracks'), href: '/tracks' },
            { label: tNav('forTeams'), href: '/teams' },
            { label: tNav('pricing'), href: '#pricing' },
          ].map(item => (
            item.href.startsWith('/') ? (
              <Link key={item.label} href={item.href}
                className="text-sm font-medium transition-colors hover:text-slate-900"
                style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href}
                className="text-sm font-medium transition-colors hover:text-slate-900"
                style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                {item.label}
              </a>
            )
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-slate-100"
            style={{ color: '#64748B', fontFamily: 'var(--font-sans)', border: '1px solid #E2E8F0', background: '#EFF6FF' }}
          >
            <Search size={13} />
            <span>{tNav('search')}</span>
            <kbd style={{ fontSize: '10px', color: '#94A3B8', background: '#E2E8F0', borderRadius: '3px', padding: '1px 5px' }}>⌘K</kbd>
          </button>

          {/* Desktop auth */}
          {!loading && (
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button onClick={() => setAvatarOpen(v => !v)}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl transition-colors hover:bg-slate-100">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: '#2563EB', fontFamily: 'var(--font-sans)' }}>
                      {initials}
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                      {user.user_metadata?.full_name?.split(' ')[0] ?? user.email?.split('@')[0]}
                    </span>
                  </button>
                  <AnimatePresence>
                    {avatarOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -4 }}
                        transition={{ duration: 0.12 }}
                        className="absolute right-0 mt-2 w-52 rounded-xl overflow-hidden"
                        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                      >
                        <div className="px-4 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <p className="text-xs font-medium truncate" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                            {user.email}
                          </p>
                        </div>
                        <div className="p-1.5">
                          <Link href="/dashboard" onClick={() => setAvatarOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-slate-50"
                            style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                            <Zap size={14} /> {tNav('dashboard')}
                          </Link>
                          <Link href="/tracks" onClick={() => setAvatarOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-slate-50"
                            style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                            <BookOpen size={14} /> {tNav('allTracks')}
                          </Link>
                          <button onClick={() => { signOut(); setAvatarOpen(false) }}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-red-50 hover:text-red-600"
                            style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                            <LogOut size={14} /> {tNav('signOut')}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <button onClick={openSignIn} className="text-sm font-medium transition-colors hover:text-slate-900"
                    style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                    {tNav('signIn')}
                  </button>
                  <Link href="/assessment"
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: '#2563EB', fontFamily: 'var(--font-sans)' }}>
                    {tNav('buildMyPlan')}
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-slate-100"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            style={{ color: '#475569' }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
            style={{ background: '#FFFFFF', borderTop: '1px solid #F1F5F9' }}
          >
            <div className="px-6 pb-6 pt-2">
              <div className="mb-2">
                {[
                  { label: tNav('program'), href: '#program' },
                  { label: tNav('tracks'), href: '/tracks' },
                  { label: tNav('forTeams'), href: '/teams' },
                  { label: tNav('pricing'), href: '#pricing' },
                ].map(item => (
                  <a key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center py-3.5 text-sm font-medium border-b transition-colors hover:text-blue-600"
                    style={{ color: '#475569', fontFamily: 'var(--font-sans)', borderColor: '#EFF6FF' }}>
                    {item.label}
                  </a>
                ))}
              </div>
              {!loading && (
                <div className="pt-4 space-y-2" style={{ borderTop: '1px solid #E2E8F0' }}>
                  {user ? (
                    <>
                      <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 py-3 px-4 rounded-xl text-sm font-medium w-full transition-colors hover:bg-slate-50"
                        style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                        <Zap size={14} /> {tNav('dashboard')}
                      </Link>
                      <button onClick={() => { signOut(); setMobileOpen(false) }}
                        className="flex items-center gap-2 py-3 px-4 rounded-xl text-sm w-full transition-colors hover:bg-red-50 hover:text-red-600"
                        style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                        <LogOut size={14} /> {tNav('signOut')}
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { openSignIn(); setMobileOpen(false) }}
                        className="w-full py-3 text-sm font-medium rounded-xl transition-colors hover:bg-slate-50"
                        style={{ color: '#64748B', fontFamily: 'var(--font-sans)', border: '1px solid #E2E8F0' }}>
                        {tNav('signIn')}
                      </button>
                      <Link href="/assessment" onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white"
                        style={{ background: '#2563EB', fontFamily: 'var(--font-sans)' }}>
                        {tNav('buildMyPlan')} <ArrowRight size={13} />
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    {searchOpen && <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />}
    </>
  )
}

// ─── Hero Visual ──────────────────────────────────────────────────────────────

const HERO_ROLES = [
  {
    role: 'Marketing Manager', track: 'Marketing Track',
    accent: '#2563EB', bg: '#DBEAFE',
    lesson: 'Writing AI prompts for campaign briefs',
    module: 'Prompt Engineering', progress: 68, xp: 1240, done: 8,
    insight: 'Prompt Engineering is 3× more relevant for your role — prioritised first.',
  },
  {
    role: 'Chief Financial Officer', track: 'Finance Track',
    accent: '#3B82F6', bg: '#DBEAFE',
    lesson: 'AI-powered financial forecasting models',
    module: 'AI for Finance', progress: 45, xp: 820, done: 5,
    insight: 'AI forecasting saves finance leaders 6+ hours per week on average.',
  },
  {
    role: 'HR Director', track: 'HR Track',
    accent: '#10B981', bg: '#D1FAE5',
    lesson: 'Automating candidate screening with AI',
    module: 'HR Automation', progress: 82, xp: 1580, done: 12,
    insight: 'HR teams using AI screening cut time-to-hire by 40% on average.',
  },
  {
    role: 'Sales Lead', track: 'Sales Track',
    accent: '#F59E0B', bg: '#FEF3C7',
    lesson: 'AI-driven prospect research & outreach',
    module: 'AI for Sales', progress: 31, xp: 640, done: 4,
    insight: 'Sales teams using AI research close 22% more deals. Starting here.',
  },
]

function HeroVisual() {
  const [idx, setIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const role = HERO_ROLES[idx]

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_ROLES.length), 4000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    setTyped('')
    let i = 0
    const full = role.lesson
    const t = setInterval(() => {
      i++
      setTyped(full.slice(0, i))
      if (i >= full.length) clearInterval(t)
    }, 36)
    return () => clearInterval(t)
  }, [idx])

  return (
    <div className="relative select-none">
      {/* Ambient glow */}
      <div
        className="absolute -inset-10 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 60% 50%, ${role.accent}22 0%, transparent 65%)`,
          transition: 'background 0.8s ease',
        }}
      />

      {/* Card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 24px 64px rgba(0,0,0,0.09), 0 4px 16px rgba(0,0,0,0.04)' }}
      >
        {/* Colour-shifting accent strip */}
        <motion.div
          className="h-1 w-full"
          animate={{ background: role.accent }}
          transition={{ duration: 0.8 }}
        />

        {/* Header: live indicator + role chip */}
        <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ background: '#10B981' }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#10B981' }} />
              </span>
              <span className="text-xs font-medium" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>AI-Personalised</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={`role-${idx}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="text-xs font-semibold px-2.5 py-1 rounded-md"
                style={{ background: role.bg, color: role.accent, fontFamily: 'var(--font-sans)' }}
              >
                {role.role}
              </motion.span>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={`track-${idx}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="text-sm font-bold"
              style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}
            >
              {role.track}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
          {[
            { label: 'Lessons done', value: String(role.done), color: role.accent },
            { label: 'XP earned', value: role.xp.toLocaleString(), color: role.accent },
            { label: 'Day streak', value: '7 🔥', color: '#F59E0B' },
          ].map((s, i) => (
            <div key={i} className="text-center px-3" style={{ borderRight: i < 2 ? '1px solid #F1F5F9' : 'none' }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${s.value}-${idx}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="text-sm font-black"
                  style={{ color: s.color, fontFamily: 'var(--font-sans)' }}
                >
                  {s.value}
                </motion.p>
              </AnimatePresence>
              <p className="text-xs mt-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Current lesson + progress */}
        <div className="px-5 py-4 space-y-3">
          <div className="p-3.5 rounded-xl" style={{ background: '#EFF6FF', border: '1px solid #F1F5F9' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
              Now learning
            </p>
            <p className="text-sm font-semibold leading-snug mb-3 min-h-[38px]" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
              {typed}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
                style={{ color: role.accent }}
              >|</motion.span>
            </p>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{role.module}</span>
              <motion.span
                animate={{ color: role.accent }}
                transition={{ duration: 0.7 }}
                className="text-xs font-bold"
                style={{ fontFamily: 'var(--font-sans)' }}
              >{role.progress}%</motion.span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
              <motion.div
                className="h-full rounded-full"
                animate={{ width: `${role.progress}%`, background: role.accent }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* AI insight */}
          <div className="p-3.5 rounded-xl" style={{ background: '#EFF6FF', border: '1px solid #DBEAFE' }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles size={10} style={{ color: '#2563EB' }} />
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>
                AI insight
              </p>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={`insight-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xs leading-relaxed"
                style={{ color: '#1E3A8A', fontFamily: 'var(--font-sans)' }}
              >
                {role.insight}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating badge — top right */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -right-5 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap"
        style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#059669', fontFamily: 'var(--font-sans)', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
      >
        <CheckCircle2 size={11} /> Module complete
      </motion.div>

      {/* Floating badge — bottom left */}
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -bottom-4 -left-5 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap"
        style={{ background: '#DBEAFE', border: '1px solid #BFDBFE', color: '#2563EB', fontFamily: 'var(--font-sans)', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
      >
        <Zap size={11} /> +150 XP earned
      </motion.div>

      {/* Role indicator dots */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {HERO_ROLES.map((r, i) => (
          <motion.div
            key={i}
            animate={{ width: i === idx ? 16 : 6, background: i === idx ? r.accent : '#CBD5E1' }}
            transition={{ duration: 0.3 }}
            className="h-1.5 rounded-full"
          />
        ))}
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const ROLE_PILLS = [
  { label: 'Marketing', color: '#E04D2A', id: 'marketing' },
  { label: 'Finance', color: '#F59E0B', id: 'finance' },
  { label: 'HR', color: '#10B981', id: 'hr' },
  { label: 'Sales', color: '#3B82F6', id: 'sales' },
  { label: 'Operations', color: '#06B6D4', id: 'operations' },
  { label: 'Leadership', color: '#F97316', id: 'leadership' },
  { label: 'Legal', color: '#0284C7', id: 'legal' },
  { label: 'Product', color: '#14B8A6', id: 'product' },
  { label: 'Customer Success', color: '#DC2626', id: 'customer' },
  { label: 'Consulting', color: '#0EA5E9', id: 'consulting' },
  { label: 'IT & Technology', color: '#6366F1', id: 'it' },
]

function Hero() {
  const tHero = useTranslations('home.hero')
  return (
    <section className="relative overflow-hidden" style={{ background: '#FFFFFF', paddingTop: '7rem', paddingBottom: '5rem' }}>
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: 'absolute', top: -180, right: -120, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <motion.div variants={stagger(0.1)} initial="hidden" animate="visible" className="text-center">

          {/* Label */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold mb-8"
            style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #DBEAFE', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
            <Zap size={10} /> {tHero('badge')}
          </motion.div>

          {/* Headline — oversized */}
          <motion.h1 variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)', fontWeight: 800,
              fontSize: 'clamp(2.75rem, 8vw, 5.25rem)',
              lineHeight: 1.06, letterSpacing: '-0.03em',
              color: '#0F172A', marginBottom: '1.5rem',
            }}>
            The AI skills<br />
            <span style={{ color: '#2563EB' }}>{tHero('headingAccent')}</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={fadeUp}
            style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, color: '#64748B', maxWidth: '36rem', margin: '0 auto 2.5rem' }}>
            {tHero('subheading')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="/assessment"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl font-bold text-white transition-all hover:opacity-92 hover:scale-[1.02] active:scale-[0.99]"
              style={{ background: '#2563EB', fontSize: '1rem', fontFamily: 'var(--font-sans)', padding: '1rem 2rem', boxShadow: '0 8px 28px rgba(37,99,235,0.32)' }}>
              {tHero('cta')} <ArrowRight size={16} />
            </Link>
            <a href="#program"
              className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all hover:bg-slate-50"
              style={{ border: '2px solid #E2E8F0', color: '#475569', fontSize: '1rem', fontFamily: 'var(--font-sans)', padding: '1rem 2rem' }}>
              <Play size={14} /> {tHero('seeHowItWorks')}
            </a>
          </motion.div>

          {/* Trust row */}
          <motion.div variants={fadeUp} className="flex items-center justify-center flex-wrap gap-6 mb-14">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A', fontFamily: 'var(--font-sans)' }}>4.9/5</span>
              <span style={{ fontSize: '0.8125rem', color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{tHero('rating', { count: '3,200' })}</span>
            </div>
            <div style={{ width: 1, height: 16, background: '#E2E8F0' }} className="hidden sm:block" />
            {[tHero('trustFree'), tHero('trustNoCard'), tHero('trustStart')].map(label => (
              <div key={label} className="flex items-center gap-1.5" style={{ fontSize: '0.8125rem', color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                <Check size={11} color="#10B981" /> {label}
              </div>
            ))}
          </motion.div>

          {/* Role pills */}
          <motion.div variants={fadeUp}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#CBD5E1', marginBottom: '0.875rem', fontFamily: 'var(--font-sans)' }}>
              {tHero('pickYourRole')}
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {ROLE_PILLS.map(r => (
                <Link key={r.id} href={`/tracks/${r.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: `${r.color}12`, color: r.color, border: `1.5px solid ${r.color}35`, padding: '0.4rem 1rem', fontFamily: 'var(--font-sans)' }}>
                  {r.label}
                </Link>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

// ─── Social Proof ─────────────────────────────────────────────────────────────

function SocialProof() {
  const tSocial = useTranslations('home.social')
  const companies = ['McKinsey', 'Deloitte', 'KPMG', 'Goldman Sachs', "L'Oréal", 'Nestlé', 'Airbus', 'BNP Paribas', 'Accenture', 'BCG']
  const stats = [
    { n: '3,200+', label: tSocial('stats.trained') },
    { n: '94%', label: tSocial('stats.completion') },
    { n: '4.9/5', label: tSocial('stats.rating') },
    { n: '4.2 hrs', label: tSocial('stats.saved') },
  ]
  return (
    <div style={{ background: '#2563EB' }}>
      {/* Big stats */}
      <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
        {stats.map(s => (
          <div key={s.n} className="text-center">
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: '#FFFFFF', lineHeight: 1, marginBottom: '0.375rem' }}>{s.n}</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)' }}>{s.label}</p>
          </div>
        ))}
      </div>
      {/* Company ticker */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }} className="py-6">
        <p className="text-center font-bold mb-5 tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-sans)', fontSize: '0.625rem' }}>
          {tSocial('professionalsFrom')}
        </p>
        <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)' }}>
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="flex gap-12 flex-nowrap w-max items-center">
            {[...companies, ...companies].map((c, i) => (
              <span key={i} className="whitespace-nowrap text-sm font-bold"
                style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-sans)', letterSpacing: '0.01em' }}>{c}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const tHIW = useTranslations('home.howItWorks')
  const steps = [
    {
      number: '01', icon: ClipboardList, title: tHIW('step1Title'), color: '#2563EB', bg: '#DBEAFE',
      desc: tHIW('step1Desc'),
      detail: tHIW('step1Detail'),
      tag: tHIW('step1Tag'),
    },
    {
      number: '02', icon: Route, title: tHIW('step2Title'), color: '#3B82F6', bg: '#DBEAFE',
      desc: tHIW('step2Desc'),
      detail: tHIW('step2Detail'),
      tag: tHIW('step2Tag'),
    },
    {
      number: '03', icon: GraduationCap, title: tHIW('step3Title'), color: '#10B981', bg: '#D1FAE5',
      desc: tHIW('step3Desc'),
      detail: tHIW('step3Detail'),
      tag: tHIW('step3Tag'),
    },
  ]
  const { ref, isInView } = useReveal()
  return (
    <section id="program" className="py-16 sm:py-24" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} variants={stagger(0.12)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>{tHIW('sectionLabel')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              {tHIW('heading')}
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              {tHIW('sub')}
            </p>
          </motion.div>

          {/* Steps — connected layout */}
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-px pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent 8%, #E2E8F0 20%, #E2E8F0 80%, transparent 92%)' }} />

            <div className="grid md:grid-cols-3 gap-6 relative">
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div key={step.title} variants={fadeUp} className="group relative">
                    {/* Arrow between cards (desktop) */}
                    {i < 2 && (
                      <div className="hidden md:flex absolute -right-3 top-14 z-10 w-6 h-6 rounded-full items-center justify-center"
                        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                        <ChevronRight size={12} style={{ color: '#94A3B8' }} />
                      </div>
                    )}

                    <div className="relative p-7 rounded-2xl h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5"
                      style={{ background: '#FFFFFF', border: '2px solid #F1F5F9' }}>
                      {/* Giant decorative number */}
                      <span className="absolute -top-3 -right-1 font-black leading-none select-none pointer-events-none"
                        style={{ fontSize: '7rem', color: '#EFF6FF', fontFamily: 'var(--font-sans)' }}>
                        {step.number}
                      </span>

                      {/* Step header */}
                      <div className="flex items-center gap-3 mb-5 relative">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ background: step.color }}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{ background: step.bg, color: step.color, fontFamily: 'var(--font-sans)' }}>
                          {step.tag}
                        </span>
                      </div>

                      <h3 className="text-lg font-black mb-2.5 relative" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-5" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                        {step.desc}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-1.5 pt-4" style={{ borderTop: `2px solid ${step.color}15` }}>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: step.color }} />
                        <span className="text-xs font-semibold" style={{ color: step.color, fontFamily: 'var(--font-sans)' }}>
                          {step.detail}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* CTA below steps */}
          <motion.div variants={fadeUp} className="text-center mt-12">
            <Link href="/assessment"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: '#2563EB', fontFamily: 'var(--font-sans)', boxShadow: '0 4px 16px rgba(37,99,235,0.2)' }}>
              {tHIW('cta')} <ArrowRight size={14} />
            </Link>
            <p className="mt-3 text-xs" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
              {tHIW('ctaSub')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Role Tracks ──────────────────────────────────────────────────────────────

const TRACKS = [
  { id: 'marketing',  icon: Megaphone,    label: 'Marketing',        color: '#E04D2A', skills: ['AI copywriting', 'Campaign automation', 'Content strategy', 'Data analysis'] },
  { id: 'finance',    icon: LineChart,    label: 'Finance',          color: '#F59E0B', skills: ['Financial modelling', 'Report generation', 'Risk analysis', 'Forecasting'] },
  { id: 'hr',         icon: HeartHandshake, label: 'HR & People',   color: '#10B981', skills: ['Talent acquisition', 'L&D automation', 'HR analytics', 'Engagement'] },
  { id: 'sales',      icon: TrendingUp,   label: 'Sales',            color: '#2563EB', skills: ['Prospect research', 'Proposal writing', 'CRM automation', 'Pipeline AI'] },
  { id: 'operations', icon: Settings,     label: 'Operations',       color: '#06B6D4', skills: ['Process automation', 'Decision support', 'Supply chain AI', 'Quality ops'] },
  { id: 'leadership', icon: Briefcase,    label: 'Leadership',       color: '#F97316', skills: ['AI strategy', 'Change management', 'Team enablement', 'Executive decisions'] },
  { id: 'legal',      icon: Scale,        label: 'Legal',            color: '#0284C7', skills: ['Contract analysis', 'Legal research', 'Risk assessment', 'AI governance'] },
  { id: 'product',    icon: Package,      label: 'Product',          color: '#14B8A6', skills: ['User research', 'Roadmap prioritisation', 'PRD writing', 'AI product strategy'] },
  { id: 'customer',   icon: Headphones,   label: 'Customer Success', color: '#DC2626', skills: ['Health monitoring', 'Churn prevention', 'Personalisation', 'CS operations'] },
  { id: 'consulting', icon: BarChart,     label: 'Consulting',       color: '#0EA5E9', skills: ['Research synthesis', 'Structured analysis', 'Slide writing', 'Client communication'] },
  { id: 'it',        icon: Zap,          label: 'IT & Technology',  color: '#6366F1', skills: ['AI scripting & automation', 'Cybersecurity with AI', 'IT operations', 'AI governance'] },
]

const TRACK_PREVIEWS: Record<string, { headline: string; modules: { title: string; lessons: string[] }[] }> = {
  marketing:  { headline: 'Your AI toolkit for campaigns, copy, and growth', modules: [{ title: 'AI Copywriting', lessons: ['Write campaign briefs with AI in 10 minutes', 'Generating 50 ad variants from one prompt'] }, { title: 'Campaign Automation', lessons: ['Auto-scheduling content across channels', 'AI-powered A/B testing workflows'] }, { title: 'Audience Intelligence', lessons: ['Segmenting audiences with AI analysis', 'Predicting campaign ROI before launch'] }] },
  finance:    { headline: 'AI that cuts your reporting time in half', modules: [{ title: 'Financial Modelling', lessons: ['Building dynamic forecasts with AI', 'Automating variance analysis reports'] }, { title: 'AI for FP&A', lessons: ['AI-assisted scenario planning', 'Generating board-ready summaries from data'] }, { title: 'Risk & Compliance', lessons: ['Using AI for risk flag detection', 'Automating regulatory reporting'] }] },
  hr:         { headline: 'Hire faster, develop better, retain longer', modules: [{ title: 'AI Talent Acquisition', lessons: ['Screening 200 CVs in under an hour', 'Writing inclusive job descriptions with AI'] }, { title: 'L&D Automation', lessons: ['Building personalised learning plans at scale', 'AI-driven skills gap analysis'] }, { title: 'HR Analytics', lessons: ['Predicting attrition before it happens', 'Automating your employee pulse reports'] }] },
  sales:      { headline: 'Spend less time researching, more time closing', modules: [{ title: 'AI Prospect Research', lessons: ['Building a 50-lead list in 20 minutes', 'Finding trigger events with AI tools'] }, { title: 'Outreach & Proposals', lessons: ['Personalising cold emails at scale', 'Generating winning proposals in 30 minutes'] }, { title: 'Pipeline Intelligence', lessons: ['AI-powered deal scoring', 'Forecasting close rates from CRM data'] }] },
  operations: { headline: 'Automate the repeatable. Focus on what matters.', modules: [{ title: 'Process Automation', lessons: ['Mapping and automating manual workflows', 'Building AI decision trees for ops'] }, { title: 'Supply Chain AI', lessons: ['Demand forecasting with AI tools', 'Using AI to identify supply chain risks'] }, { title: 'Quality & Reporting', lessons: ['Automated anomaly detection in ops data', 'AI-assisted root cause analysis'] }] },
  leadership: { headline: 'Lead your organisation through the AI transition', modules: [{ title: 'AI Strategy', lessons: ['Building your organisation\'s AI roadmap', 'Evaluating AI tools without a technical background'] }, { title: 'Change Management', lessons: ['Communicating AI adoption to your team', 'Managing resistance to AI transformation'] }, { title: 'Executive Decisions', lessons: ['Using AI for strategic scenario planning', 'AI-assisted competitive intelligence'] }] },
  legal:      { headline: 'Review faster. Research deeper. Risk less.', modules: [{ title: 'Contract Analysis', lessons: ['Reviewing a 60-page contract in 20 minutes', 'Flagging risk clauses automatically'] }, { title: 'Legal Research', lessons: ['AI-assisted case law research', 'Building legal memos with AI assistance'] }, { title: 'AI Governance', lessons: ['AI liability frameworks for counsel', 'Drafting AI usage policies for clients'] }] },
  product:    { headline: 'From user insight to shipped feature — faster', modules: [{ title: 'User Research AI', lessons: ['Synthesising 50 interviews in one afternoon', 'AI-assisted Jobs-to-be-Done analysis'] }, { title: 'Roadmap & PRD', lessons: ['Prioritising your backlog with AI scoring', 'Generating a full PRD from discovery notes'] }, { title: 'AI Product Strategy', lessons: ['Deciding where AI adds value in your product', 'Writing AI feature specs that engineering ships'] }] },
  customer:   { headline: 'Prevent churn before it happens', modules: [{ title: 'Health Monitoring', lessons: ['Building an AI churn prediction model', 'Automated health score alerts'] }, { title: 'Personalisation at Scale', lessons: ['AI-tailored QBR prep for every account', 'Personalising onboarding with AI'] }, { title: 'CS Operations', lessons: ['Automating your renewal pipeline', 'AI-assisted escalation routing'] }] },
  consulting: { headline: 'Deliver deeper insights, faster', modules: [{ title: 'Research & Synthesis', lessons: ['Synthesising 100-page reports in minutes', 'AI-powered competitive landscape analysis'] }, { title: 'Structured Analysis', lessons: ['Building frameworks with AI assistance', 'Issue tree generation from project briefs'] }, { title: 'Client Deliverables', lessons: ['Drafting executive slide narratives with AI', 'AI-assisted proposal writing'] }] },
  it: { headline: 'Script faster. Secure smarter. Document better.', modules: [{ title: 'AI Scripting & Automation', lessons: ['Generate working Bash and Python scripts from plain English', 'Debug and refine scripts in minutes with AI'] }, { title: 'Cybersecurity with AI', lessons: ['AI-assisted log analysis and threat detection', 'Secure code review and vulnerability scanning'] }, { title: 'IT Operations', lessons: ['Automate helpdesk triage and response drafting', 'AI-powered incident post-mortems in minutes'] }] },
}

function RoleTracks() {
  const [active, setActive] = useState('marketing')
  const { ref, isInView } = useReveal()
  const track = TRACKS.find(t => t.id === active)!
  const preview = TRACK_PREVIEWS[active]
  const Icon = track.icon
  const tTracks = useTranslations('home.tracks')

  return (
    <section id="tracks" className="py-14 sm:py-20" style={{ background: '#EFF6FF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} variants={stagger(0.08)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>{tTracks('sectionLabel')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              {tTracks('heading')}
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              {tTracks('sub')}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid lg:grid-cols-[280px_1fr] gap-6 items-start">
            {/* Role selector — left */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {TRACKS.map(t => {
                const TIcon = t.icon
                const isActive = t.id === active
                return (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-left transition-all flex-shrink-0 lg:w-full"
                    style={{
                      background: isActive ? t.color : 'transparent',
                      border: isActive ? 'none' : '1px solid transparent',
                      boxShadow: isActive ? `0 4px 14px ${t.color}35` : 'none',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: isActive ? 'rgba(255,255,255,0.25)' : '#E2E8F0' }}>
                      <TIcon size={13} style={{ color: isActive ? '#FFFFFF' : '#94A3B8' }} />
                    </div>
                    <span className="text-sm font-semibold whitespace-nowrap"
                      style={{ color: isActive ? '#FFFFFF' : '#64748B' }}>
                      {t.label}
                    </span>
                    {isActive && <ChevronRight size={13} className="ml-auto hidden lg:block" style={{ color: 'rgba(255,255,255,0.7)' }} />}
                  </button>
                )
              })}
            </div>

            {/* Preview panel — right */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="rounded-2xl overflow-hidden"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              >
                {/* Header */}
                <div className="px-7 py-6" style={{ background: track.color }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.2)' }}>
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-0.5"
                          style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-sans)' }}>
                          {track.label} Track
                        </p>
                        <h3 className="text-base font-black text-white" style={{ fontFamily: 'var(--font-sans)' }}>
                          {preview.headline}
                        </h3>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)' }}>
                      <Sparkles size={11} style={{ color: '#FFFFFF' }} />
                      <span className="text-xs font-semibold text-white" style={{ fontFamily: 'var(--font-sans)' }}>
                        {tTracks('personalised')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Modules */}
                <div className="p-7">
                  <div className="grid sm:grid-cols-3 gap-4">
                    {preview.modules.map((mod, mi) => (
                      <div key={mod.title} className="p-4 rounded-xl" style={{ background: '#EFF6FF', border: '1px solid #E2E8F0' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                            style={{ background: track.color }}>
                            <span className="text-[9px] font-black text-white" style={{ fontFamily: 'var(--font-sans)' }}>
                              {String(mi + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <p className="text-xs font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                            {mod.title}
                          </p>
                        </div>
                        <ul className="space-y-2">
                          {mod.lessons.map(lesson => (
                            <li key={lesson} className="flex items-start gap-1.5">
                              <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: track.color }} />
                              <span className="text-xs leading-snug" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                                {lesson}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Footer CTA */}
                  <div className="mt-5 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4"
                    style={{ borderTop: '1px solid #F1F5F9' }}>
                    <p className="text-sm" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                      {tTracks('notYourRole')}{' '}
                      <span style={{ color: '#0F172A', fontWeight: 600 }}>
                        {tTracks('assessmentTailors')}
                      </span>
                    </p>
                    <Link href="/assessment"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex-shrink-0 transition-all hover:opacity-90"
                      style={{ background: track.color, fontFamily: 'var(--font-sans)' }}>
                      {tTracks('getPath', { track: track.label })} <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: Brain, title: 'Adaptive AI personalisation', desc: 'Your path updates as you learn. The more you do, the more accurately it maps to where you are.', color: '#2563EB' },
  { icon: Target, title: 'Role-specific content', desc: 'Every lesson, exercise, and example is tailored to your job function — not recycled from a generic course.', color: '#3B82F6' },
  { icon: Layers, title: 'Practical exercises', desc: 'Apply what you learn immediately. Every module ends with a real task using tools you already have access to.', color: '#10B981' },
  { icon: BarChart3, title: 'Progress tracking', desc: "See exactly where you are, what you've mastered, and what comes next — with XP, streaks, and milestones.", color: '#F59E0B' },
  { icon: Award, title: 'Verified certificates', desc: 'Earn credentials that signal AI literacy to your employer — tied to your specific role and track.', color: '#E04D2A' },
  { icon: Users, title: 'Peer community', desc: 'Learn alongside professionals from your industry. Share wins, ask questions, and stay accountable together.', color: '#06B6D4' },
]

function Features() {
  const { ref, isInView } = useReveal()
  const [hero, ...rest] = FEATURES
  const HeroIcon = hero.icon
  const tFeatures = useTranslations('home.features')
  return (
    <section className="py-14 sm:py-20" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} variants={stagger(0.08)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>{tFeatures('sectionLabel')}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A', lineHeight: 1.1 }}>
                {tFeatures('heading')}
              </h2>
            </div>
            <Link href="/assessment" className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white flex-shrink-0 transition-all hover:opacity-90"
              style={{ background: '#2563EB', fontFamily: 'var(--font-sans)' }}>
              {tFeatures('cta')} <ArrowRight size={13} />
            </Link>
          </motion.div>

          {/* Hero feature — dark banner */}
          <motion.div variants={fadeUp} className="relative mb-5 rounded-2xl overflow-hidden p-8 sm:p-12"
            style={{ background: '#0F172A' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 90% 50%, ${hero.color}22 0%, transparent 60%)` }} />
            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
              style={{ fontSize: '10rem', fontFamily: 'var(--font-sans)', fontWeight: 800, color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>01</div>
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: hero.color }}>
                <HeroIcon size={24} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-black text-white" style={{ fontFamily: 'var(--font-sans)' }}>{hero.title}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full hidden sm:inline"
                    style={{ background: `${hero.color}25`, color: hero.color, fontFamily: 'var(--font-sans)' }}>{tFeatures('coreFeature')}</span>
                </div>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-sans)', maxWidth: '44rem' }}>
                  {hero.desc}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 5-feature grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((f, fi) => {
              const Icon = f.icon
              return (
                <motion.div key={f.title} variants={fadeUp} className="p-7 rounded-2xl transition-all hover:shadow-md hover:-translate-y-0.5"
                  style={{
                    background: '#FAFAFA',
                    borderTop: '1px solid #E2E8F0',
                    borderRight: '1px solid #E2E8F0',
                    borderBottom: '1px solid #E2E8F0',
                    borderLeft: `3px solid ${f.color}`,
                    borderRadius: '1rem',
                  }}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: f.color }}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <span className="text-sm font-black" style={{ color: `${f.color}40`, fontFamily: 'var(--font-sans)' }}>0{fi + 2}</span>
                  </div>
                  <h3 className="text-base font-black mb-2" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Teams ────────────────────────────────────────────────────────────────────

const TEAM_FEATURES = [
  { icon: BarChart3, label: 'Live progress dashboard', desc: "See every team member's XP, streaks, and lesson completions in real time." },
  { icon: Target, label: 'Custom track assignment', desc: 'Assign role-specific tracks per member — Finance for your analysts, Marketing for your growth team.' },
  { icon: Award, label: 'Team leaderboard', desc: 'Healthy competition drives completion. Your team can see who is leading the pack.' },
  { icon: Users, label: 'Invite in seconds', desc: 'Send invite links by email. Members join with one click — no IT setup required.' },
]

function TeamsSection() {
  const { ref, isInView } = useReveal()
  const tTeams = useTranslations('home.teams')
  return (
    <section className="py-14 sm:py-20 overflow-hidden" style={{ background: '#EFF6FF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} variants={stagger(0.1)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div>
              <motion.p variants={fadeUp} className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>{tTeams('sectionLabel')}</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5"
                style={{ fontFamily: 'var(--font-sans)', color: '#0F172A', lineHeight: 1.1 }}>
                {tTeams('heading')}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base leading-relaxed mb-10"
                style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                {tTeams('sub')}
              </motion.p>
              <div className="space-y-5 mb-10">
                {TEAM_FEATURES.map(f => {
                  const Icon = f.icon
                  return (
                    <motion.div key={f.label} variants={fadeUp} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#DBEAFE' }}>
                        <Icon size={16} style={{ color: '#2563EB' }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold mb-0.5" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>{f.label}</p>
                        <p className="text-sm" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>{f.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
                <Link href="/teams"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: '#2563EB', boxShadow: '0 4px 16px rgba(37,99,235,0.25)', fontFamily: 'var(--font-sans)' }}>
                  {tTeams('seeTeamPlans')}
                </Link>
                <Link href="/dashboard/team/create"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:bg-white"
                  style={{ color: '#475569', border: '1px solid #E2E8F0', background: 'transparent', fontFamily: 'var(--font-sans)' }}>
                  {tTeams('createTeam')}
                </Link>
              </motion.div>
            </div>

            {/* Right: dashboard mockup */}
            <motion.div variants={fadeUp} className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 rounded-3xl opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, #2563EB 0%, transparent 70%)' }} />

              <div className="relative rounded-2xl overflow-hidden"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
                {/* Window chrome */}
                <div className="px-5 py-3.5 flex items-center gap-2" style={{ borderBottom: '1px solid #F1F5F9', background: '#EFF6FF' }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: '#DC2626' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#10B981' }} />
                  <div className="mx-3 flex-1 h-6 rounded-md flex items-center px-3 text-xs" style={{ background: '#F1F5F9', color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                    opuslearn.ai/dashboard/team
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-5 space-y-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: 'Members', value: '24', color: '#2563EB' },
                      { label: 'Total XP', value: '18.4k', color: '#F59E0B' },
                      { label: 'Lessons', value: '312', color: '#10B981' },
                      { label: 'Tracks done', value: '9', color: '#E04D2A' },
                    ].map(s => (
                      <div key={s.label} className="p-3 rounded-xl" style={{ background: '#EFF6FF', border: '1px solid #E2E8F0' }}>
                        <p className="text-lg font-black mb-0.5" style={{ color: s.color, fontFamily: 'var(--font-sans)' }}>{s.value}</p>
                        <p className="text-[10px]" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Leaderboard */}
                  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
                    <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: '1px solid #F1F5F9', background: '#EFF6FF' }}>
                      <BarChart3 size={12} style={{ color: '#2563EB' }} />
                      <p className="text-xs font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>Leaderboard</p>
                    </div>
                    <div className="divide-y" style={{ borderColor: '#F1F5F9' }}>
                      {[
                        { name: 'Sophie A.', track: 'Marketing', xp: 1840, pct: 100, medal: '🥇', avatarColor: '#E04D2A' },
                        { name: 'James W.', track: 'Finance', xp: 1610, pct: 87, medal: '🥈', avatarColor: '#F59E0B' },
                        { name: 'Priya N.', track: 'HR', xp: 1390, pct: 75, medal: '🥉', avatarColor: '#10B981' },
                        { name: 'Marcus R.', track: 'Sales', xp: 1140, pct: 62, medal: '#4', avatarColor: '#3B82F6' },
                      ].map((m, i) => (
                        <div key={m.name} className="flex items-center gap-3 px-4 py-3">
                          <span className="w-6 text-center text-sm flex-shrink-0">{m.medal.startsWith('#') ?
                            <span className="text-[10px] font-bold" style={{ color: '#CBD5E1' }}>{m.medal}</span> : m.medal}
                          </span>
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                            style={{ background: m.avatarColor }}>
                            {m.name.slice(0, 2)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-xs font-semibold truncate" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>{m.name}</p>
                              <p className="text-xs font-black ml-2 flex-shrink-0" style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>{m.xp.toLocaleString()} XP</p>
                            </div>
                            <div className="h-1.5 rounded-full" style={{ background: '#E2E8F0' }}>
                              <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: i === 0 ? '#F59E0B' : '#2563EB' }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Track pills */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Marketing', color: '#E04D2A', pct: 83 },
                      { label: 'Finance', color: '#F59E0B', pct: 67 },
                      { label: 'Sales', color: '#3B82F6', pct: 50 },
                      { label: 'HR', color: '#10B981', pct: 100 },
                    ].map(t => (
                      <div key={t.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold"
                        style={{ background: `${t.color}10`, color: t.color, border: `1px solid ${t.color}25`, fontFamily: 'var(--font-sans)' }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: t.color }} />
                        {t.label} · {t.pct}%
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-6 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#10B98112' }}>
                  <Award size={15} style={{ color: '#10B981' }} />
                </div>
                <div>
                  <p className="text-xs font-black" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>HR track complete!</p>
                  <p className="text-[10px]" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>Priya N. just finished</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  { name: 'Sophie Armand', role: 'Head of Marketing', company: "L'Oréal Paris", avatar: 'SA', color: '#E04D2A', track: 'Marketing', quote: 'I went from intimidated by AI to running three AI-assisted campaigns in two months. The Marketing track understood exactly where I needed to start.' },
  { name: 'James Whitfield', role: 'VP Finance', company: 'Goldman Sachs', avatar: 'JW', color: '#F59E0B', track: 'Finance', quote: 'The Finance track cut straight to what matters. No filler, no hype — just practical tools I use every week now in FP&A and reporting.' },
  { name: 'Priya Nair', role: 'CHRO', company: 'Accenture', avatar: 'PN', color: '#10B981', track: 'HR & People', quote: "The assessment nailed my needs better than I could have myself. Three weeks in and I've already built an AI-assisted onboarding process for our team." },
  { name: 'Marcus Reid', role: 'Account Executive', company: 'Salesforce', avatar: 'MR', color: '#3B82F6', track: 'Sales', quote: "I was spending 3 hours a week on prospect research. After the Sales track, that's down to 40 minutes — and the quality of my outreach has gone up significantly." },
  { name: 'Clara Dubois', role: 'Senior Legal Counsel', company: 'BNP Paribas', avatar: 'CD', color: '#0284C7', track: 'Legal', quote: "I was sceptical AI could work in legal. The Legal track changed my mind completely. I reviewed a 60-page contract in 20 minutes last week — with better notes than usual." },
  { name: 'Tom Nakamura', role: 'Product Manager', company: 'Notion', avatar: 'TN', color: '#14B8A6', track: 'Product', quote: "The Product track is genuinely the best thing I've done for my career this year. I now go from user interview to draft PRD in one afternoon instead of three days." },
]

function Testimonials() {
  const { ref, isInView } = useReveal()
  const tTestimonials = useTranslations('home.testimonials')
  const featured = TESTIMONIALS[3] // Marcus Reid — concrete time-saving stat
  const rest = TESTIMONIALS.filter((_, i) => i !== 3)
  return (
    <section className="py-14 sm:py-20" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} variants={stagger(0.1)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>{tTestimonials('sectionLabel')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              {tTestimonials('heading')}
            </h2>
          </motion.div>

          {/* Featured testimonial */}
          <motion.div variants={fadeUp} className="relative mb-5 p-8 sm:p-10 rounded-2xl overflow-hidden"
            style={{ background: '#0F172A', boxShadow: '0 20px 48px rgba(15,23,42,0.18)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(37,99,235,0.18) 0%, transparent 60%)' }} />
            {/* Big decorative quote mark */}
            <div className="absolute top-6 right-8 pointer-events-none select-none hidden sm:block"
              style={{ fontSize: '8rem', lineHeight: 1, color: 'rgba(255,255,255,0.03)', fontFamily: 'Georgia, serif', fontWeight: 700 }}>&ldquo;</div>
            <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />)}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${featured.color}20`, color: featured.color, fontFamily: 'var(--font-sans)' }}>
                    {featured.track} Track
                  </span>
                </div>
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-black leading-snug mb-7 text-white"
                  style={{ fontFamily: 'var(--font-sans)' }}>
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                    style={{ background: featured.color }}>
                    {featured.avatar}
                  </div>
                  <div>
                    <p className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-sans)' }}>{featured.name}</p>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-sans)' }}>
                      {featured.role} · {featured.company}
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex flex-col items-center justify-center gap-3 text-center px-8 py-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', minWidth: 160 }}>
                <p className="text-4xl font-black text-white" style={{ fontFamily: 'var(--font-sans)' }}>−78%</p>
                <p className="text-xs leading-snug" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-sans)' }}>
                  {tTestimonials('timeOnResearch')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Remaining testimonials — colored left-border cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map(t => (
              <motion.div key={t.name} variants={fadeUp} className="p-6 rounded-2xl flex flex-col transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{
                  background: '#FFFFFF',
                  borderTop: '1px solid #E2E8F0',
                  borderRight: '1px solid #E2E8F0',
                  borderBottom: '1px solid #E2E8F0',
                  borderLeft: `3px solid ${t.color}`,
                  borderRadius: '1rem',
                }}>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />)}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${t.color}12`, color: t.color, fontFamily: 'var(--font-sans)' }}>
                    {t.track}
                  </span>
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #F1F5F9' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: 'Do I need a technical background?',
    a: 'Not at all. Every track is built for business professionals who want to use AI in their role — without learning to code. The content assumes zero technical knowledge and focuses entirely on practical application.',
  },
  {
    q: 'How long does a track take to complete?',
    a: 'Most tracks take 4–6 hours in total, split across 16–20 lessons of 15–20 minutes each. You can go at your own pace and pick up where you left off on any device.',
  },
  {
    q: 'What makes this different from a generic AI course?',
    a: "Every lesson, exercise, and example is tailored to your specific role. A Finance director and a Marketing manager get completely different content — because the AI use cases that matter to them are completely different. That's the whole point.",
  },
  {
    q: 'What do I get when I complete a track?',
    a: 'You earn a verified certificate tied to your specific role track — shareable directly to LinkedIn and with your employer. You also keep lifetime access to all course materials after completion.',
  },
  {
    q: 'Can I try it before committing?',
    a: 'Yes — everything is free during launch. No credit card, no trial period. Create an account and get full access to all tracks and lessons at no cost.',
  },
  {
    q: 'Is there a plan for teams or companies?',
    a: 'Yes. Team pricing is custom based on team size and needs. It includes a team dashboard, manager progress view, and group challenges. Book a demo and we\'ll walk you through the options.',
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const { ref, isInView } = useReveal()
  const tFAQ = useTranslations('home.faq')
  return (
    <section className="py-14 sm:py-20 relative overflow-hidden" style={{ background: '#0F172A' }}>
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(37,99,235,0.12) 0%, transparent 55%)' }} />

      <div className="max-w-3xl mx-auto px-6 relative">
        <motion.div ref={ref} variants={stagger(0.08)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>{tFAQ('sectionLabel')}</p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ fontFamily: 'var(--font-sans)', color: '#FFFFFF', lineHeight: 1.08 }}>
              {tFAQ('heading')}
            </h2>
          </motion.div>
          <div className="flex flex-col gap-2">
            {FAQS.map((faq, i) => {
              const isOpen = open === i
              return (
                <motion.div key={i} variants={fadeUp}
                  className="rounded-2xl overflow-hidden transition-all"
                  style={{
                    background: isOpen ? 'rgba(37,99,235,0.15)' : 'rgba(255,255,255,0.04)',
                    border: isOpen ? '1px solid rgba(37,99,235,0.4)' : '1px solid rgba(255,255,255,0.07)',
                  }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-xs font-black flex-shrink-0 tabular-nums"
                        style={{ color: isOpen ? '#93C5FD' : 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-sans)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: isOpen ? '#FFFFFF' : 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-sans)' }}>
                        {faq.q}
                      </span>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.18 }} className="flex-shrink-0">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: isOpen ? '#2563EB' : 'rgba(255,255,255,0.08)' }}>
                        <span style={{ fontSize: '1rem', lineHeight: 1, color: isOpen ? '#FFFFFF' : 'rgba(255,255,255,0.4)', fontWeight: 300 }}>+</span>
                      </div>
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)', paddingLeft: '4rem' }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const plans = [
  {
    name: 'Free', monthlyPrice: '0', annualPrice: '0', monthlyPriceAED: '0', annualPriceAED: '0',
    desc: 'Start with your full first module — no card needed',
    features: ['Full Module 1 of your track (4 lessons)', 'Role assessment & personalised path', 'Lesson exercises & quiz', 'XP & progress tracking'],
    cta: 'Start Free', highlight: false,
  },
  {
    name: 'Professional', monthlyPrice: '12.99', annualPrice: '9.99', monthlyPriceAED: '45.99', annualPriceAED: '36.58',
    desc: 'Free at launch · Full access to your personalised path',
    features: ['All lessons in your track', 'AI-personalised curriculum', 'All 10 role tracks', 'Progress analytics & streaks', 'Verified certificate', 'Priority support'],
    cta: 'Get started free', highlight: true,
  },
  {
    name: 'Team', monthlyPrice: '', annualPrice: '', monthlyPriceAED: '', annualPriceAED: '',
    desc: 'Custom pricing for your team size and needs',
    features: ['Everything in Professional', 'Team dashboard', 'Manager progress view', 'Group challenges', 'Custom onboarding', 'Dedicated CSM'],
    cta: 'Talk to Sales', highlight: false,
  },
]

const LAUNCH_FREE = process.env.NEXT_PUBLIC_LAUNCH_FREE === 'true'

function Pricing() {
  const [annual, setAnnual] = useState(false)
  const { ref, isInView } = useReveal()
  const { openSignUp, user } = useAuth()
  const { isUAE } = useGeo()
  const tHomePricing = useTranslations('home.pricing')

  return (
    <section id="pricing" className="py-14 sm:py-20" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} variants={stagger(0.1)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>{tHomePricing('sectionLabel')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-8" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              {tHomePricing('heading')}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="text-sm font-medium" style={{ color: annual ? '#94A3B8' : '#0F172A', fontFamily: 'var(--font-sans)' }}>{tHomePricing('monthly')}</span>
              <button onClick={() => setAnnual(!annual)}
                className="w-11 h-6 rounded-full relative transition-colors"
                style={{ background: annual ? '#2563EB' : '#E2E8F0' }}>
                <motion.div animate={{ x: annual ? 23 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-sm" />
              </button>
              <span className="text-sm font-medium" style={{ color: annual ? '#0F172A' : '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                {tHomePricing('annual')} <span className="px-1.5 py-0.5 rounded text-xs font-semibold ml-1"
                  style={{ background: '#DCFCE7', color: '#16A34A' }}>{tHomePricing('annualDiscount')}</span>
              </span>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {plans.map(plan => (
              <motion.div key={plan.name} variants={fadeUp} className={`relative rounded-2xl overflow-hidden${plan.highlight ? ' sm:col-span-2 lg:col-span-1' : ''}`}
                style={plan.highlight
                  ? { background: '#2563EB', boxShadow: '0 24px 56px rgba(37,99,235,0.35)' }
                  : { background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                {plan.highlight && (
                  <>
                    {/* Decorative rings */}
                    <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
                      style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
                    <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none"
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }} />
                    <div className="text-center py-2 text-[10px] font-black tracking-[0.18em]"
                      style={{ background: 'rgba(0,0,0,0.15)', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-sans)', letterSpacing: '0.2em' }}>
                      FREE AT LAUNCH
                    </div>
                  </>
                )}
                <div className="p-8">
                  <p className="text-xs font-black uppercase tracking-widest mb-2"
                    style={{ color: plan.highlight ? 'rgba(255,255,255,0.5)' : '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
                    {plan.name}
                  </p>
                  {plan.highlight ? (
                    <div className="mb-1">
                      <div className="flex items-start gap-0.5">
                        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: isUAE ? '0.9rem' : '1.25rem', lineHeight: 1, marginTop: '0.5rem', color: '#FFFFFF' }}>{isUAE ? 'AED' : '$'}</span>
                        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '3.25rem', lineHeight: 1, color: '#FFFFFF' }}>0</span>
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-sans)', alignSelf: 'flex-end', marginBottom: '0.2rem', marginLeft: '2px' }}>{tHomePricing('perSeatMo')}</span>
                      </div>
                      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-sans)' }}>
                        <span style={{ textDecoration: 'line-through' }}>{isUAE ? 'AED 45.99/mo' : '$12.99/mo'}</span>{' '}— free during launch
                      </p>
                    </div>
                  ) : (
                    <>
                      {(() => {
                        const raw = annual
                          ? (isUAE ? plan.annualPriceAED : plan.annualPrice)
                          : (isUAE ? plan.monthlyPriceAED : plan.monthlyPrice)
                        if (!raw) {
                          return (
                            <div className="flex items-end gap-1.5 mb-1">
                              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '2.25rem', lineHeight: 1, color: '#0F172A' }}>Custom</span>
                            </div>
                          )
                        }
                        const [intPart, decPart] = raw.includes('.') ? raw.split('.') : [raw, null]
                        return (
                          <div className="flex items-start gap-0.5 mb-1">
                            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: isUAE ? '0.9rem' : '1.25rem', lineHeight: 1, marginTop: '0.5rem', color: '#0F172A' }}>{isUAE ? 'AED' : '$'}</span>
                            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '3rem', lineHeight: 1, color: '#0F172A' }}>{intPart}</span>
                            {decPart && (
                              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.25rem', lineHeight: 1, marginTop: '0.5rem', color: '#64748B' }}>.{decPart}</span>
                            )}
                            <span className="text-sm" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)', alignSelf: 'flex-end', marginBottom: '0.2rem', marginLeft: '2px' }}>{tHomePricing('perSeatMo')}</span>
                          </div>
                        )
                      })()}
                    </>
                  )}
                  <p className="text-sm mb-7" style={{ color: plan.highlight ? 'rgba(255,255,255,0.55)' : '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                    {plan.highlight ? 'Free for everyone during launch — no card needed' : plan.desc}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map(feat => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm"
                        style={{ color: plan.highlight ? 'rgba(255,255,255,0.85)' : '#475569', fontFamily: 'var(--font-sans)' }}>
                        <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: plan.highlight ? '#86EFAC' : '#10B981' }} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  {plan.name === 'Team' ? (
                    <Link href="/teams/demo"
                      className="flex items-center justify-center w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
                      style={{ background: '#0F172A', color: '#FFFFFF', fontFamily: 'var(--font-sans)' }}>
                      {plan.cta}
                    </Link>
                  ) : plan.highlight ? (
                    user ? (
                      <Link href="/dashboard"
                        className="flex items-center justify-center w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
                        style={{ background: '#FFFFFF', color: '#2563EB', fontFamily: 'var(--font-sans)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                        Go to Dashboard
                      </Link>
                    ) : (
                      <button
                        onClick={() => openSignUp()}
                        className="flex items-center justify-center w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
                        style={{ background: '#FFFFFF', color: '#2563EB', fontFamily: 'var(--font-sans)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', border: 'none', cursor: 'pointer' }}>
                        Get started free
                      </button>
                    )
                  ) : (
                    <Link href="/assessment"
                      className="flex items-center justify-center w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
                      style={plan.highlight
                        ? { background: '#FFFFFF', color: '#2563EB', fontFamily: 'var(--font-sans)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }
                        : { background: '#EFF6FF', border: '1px solid #E2E8F0', color: '#475569', fontFamily: 'var(--font-sans)' }
                      }>
                      {plan.cta}
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const { ref, isInView } = useReveal()
  const tAbout = useTranslations('home.about')

  const team = [
    {
      name: 'Marie Leconte',
      role: 'CEO & Co-founder',
      initials: 'ML',
      color: '#2563EB',
      prev: 'McKinsey & Company',
      bio: 'Former McKinsey partner who spent 12 years watching businesses struggle to operationalise new technologies. Built the OpusLearn curriculum after 200+ interviews with leaders across finance, marketing, and operations.',
    },
    {
      name: 'Thomas Reeves',
      role: 'CTO & Co-founder',
      initials: 'TR',
      color: '#3B82F6',
      prev: 'Salesforce AI',
      bio: 'Led AI product at Salesforce for 6 years before realising the biggest bottleneck was not the technology, but the professionals tasked with using it. Built the adaptive path engine from the ground up.',
    },
    {
      name: 'Aisha Okonkwo',
      role: 'Head of Learning Design',
      initials: 'AO',
      color: '#10B981',
      prev: 'Deloitte',
      bio: 'Former L&D Director at Deloitte with a background in cognitive science. Redesigned every module around behaviour change rather than information transfer — the reason our completion rate sits at 94%.',
    },
  ]

  const stats = [
    { value: '3,200+', label: 'Professionals trained' },
    { value: '10', label: 'Role-specific tracks' },
    { value: '94%', label: 'Completion rate' },
    { value: '4.9/5', label: 'Learner rating' },
  ]

  const values = [
    {
      num: '01', bg: '#DBEAFE', color: '#2563EB',
      title: 'Role-first, always',
      desc: 'Generic AI training fails because it ignores context. We build every lesson around a specific role, with examples and exercises drawn directly from that world.',
    },
    {
      num: '02', bg: '#ECFDF5', color: '#10B981',
      title: 'Practical over theoretical',
      desc: 'Every module ends with something you can apply today — not a quiz about definitions, but a real output you produce using tools you already have.',
    },
    {
      num: '03', bg: '#EFF6FF', color: '#3B82F6',
      title: 'No code, no compromise',
      desc: 'We prove that the highest-leverage AI skills for business professionals have nothing to do with Python. Fluency starts with understanding, not syntax.',
    },
  ]

  return (
    <section id="about" className="py-14 sm:py-20" style={{ background: '#EFF6FF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} variants={stagger(0.1)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={fadeUp} className="max-w-3xl mb-16">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>{tAbout('sectionLabel')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              {tAbout('heading')}
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              {tAbout('sub')}
            </p>
          </motion.div>

          {/* Quote + Stats */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden p-10"
              style={{ background: '#0F172A' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(37,99,235,0.15) 0%, transparent 65%)' }} />
              <div className="relative">
                <div className="w-1 h-10 rounded-full mb-7" style={{ background: '#2563EB' }} />
                <blockquote className="text-xl lg:text-2xl font-black leading-snug mb-6 text-white" style={{ fontFamily: 'var(--font-sans)' }}>
                  &ldquo;Every professional deserves to harness AI &mdash; not just those with an engineering degree. We built the platform we wished existed when AI changed everything.&rdquo;
                </blockquote>
                <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-sans)' }}>
                  Marie Leconte &mdash; CEO &amp; Co-founder, OpusLearn
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {stats.map(s => (
                <div key={s.label} className="p-6 rounded-2xl flex flex-col justify-center"
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <p className="text-3xl font-black mb-1" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>{s.value}</p>
                  <p className="text-xs font-medium" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Values */}
          <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-5 mb-16">
            {values.map(v => (
              <div key={v.title} className="p-7 rounded-2xl"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ background: v.bg }}>
                  <span className="text-sm font-black" style={{ color: v.color, fontFamily: 'var(--font-sans)' }}>{v.num}</span>
                </div>
                <h3 className="text-base font-black mb-2" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>{v.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Team */}
          <motion.div variants={fadeUp}>
            <p className="text-xs font-bold tracking-widest uppercase mb-8 text-center" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>{tAbout('theTeam')}</p>
            <div className="grid md:grid-cols-3 gap-6">
              {team.map(member => (
                <div key={member.name} className="p-7 rounded-2xl"
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                      style={{ background: member.color }}>
                      {member.initials}
                    </div>
                    <div>
                      <p className="text-sm font-black" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>{member.name}</p>
                      <p className="text-xs font-semibold" style={{ color: member.color, fontFamily: 'var(--font-sans)' }}>{member.role}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{tAbout('previously')} {member.prev}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>{member.bio}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  const { ref, isInView } = useReveal()
  const tFinalCTA = useTranslations('home.finalCta')
  return (
    <section className="relative overflow-hidden" style={{ background: '#0F172A' }}>
      {/* Top purple band */}
      <div style={{ height: 6, background: 'linear-gradient(90deg, #2563EB, #E04D2A, #F59E0B)' }} />

      {/* Decorative giant text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(8rem, 25vw, 22rem)', color: 'rgba(255,255,255,0.025)', lineHeight: 1, whiteSpace: 'nowrap' }}>
          AI
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24 sm:py-32 text-center relative">
        <motion.div ref={ref} variants={stagger(0.12)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold mb-8"
            style={{ background: 'rgba(37,99,235,0.2)', color: '#93C5FD', border: '1px solid rgba(37,99,235,0.35)', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
            <Zap size={10} /> {tFinalCTA('badge')}
          </motion.div>
          <motion.h2 variants={fadeUp}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', lineHeight: 1.08, letterSpacing: '-0.03em', color: '#FFFFFF', marginBottom: '1.5rem' }}>
            Start leading<br /><span style={{ color: '#93C5FD' }}>{tFinalCTA('headingAccent')}</span>
          </motion.h2>
          <motion.p variants={fadeUp}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', color: 'rgba(255,255,255,0.5)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            {tFinalCTA('sub')}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/assessment"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: '#2563EB', fontSize: '1rem', fontFamily: 'var(--font-sans)', padding: '1rem 2rem', boxShadow: '0 8px 28px rgba(37,99,235,0.4)' }}>
              {tFinalCTA('cta')} <ArrowRight size={16} />
            </Link>
            <Link href="/tracks"
              className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all"
              style={{ border: '2px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: '1rem', fontFamily: 'var(--font-sans)', padding: '1rem 2rem' }}>
              {tFinalCTA('browseAllTracks')}
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-6 text-sm"
            style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-sans)' }}>
            {tFinalCTA('note')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const tFooter = useTranslations('home.footer')
  return (
    <footer style={{ background: '#0A0F1E' }}>
      {/* Brand statement band */}
      <div className="relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.12) 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#2563EB' }}>
                <Zap size={14} className="text-white" />
              </div>
              <span className="text-lg font-black" style={{ fontFamily: 'var(--font-sans)', color: '#F1F5F9' }}>OpusLearn</span>
            </div>
            <p className="text-lg font-black" style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.2)', maxWidth: '28rem', lineHeight: 1.4 }}>
              {tFooter('aiTrainingTagline')}
            </p>
          </div>
          <Link href="/assessment"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white flex-shrink-0 transition-all hover:opacity-90"
            style={{ background: '#2563EB', fontFamily: 'var(--font-sans)' }}>
            {tFooter('startForFree')} <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-sans)' }}>{tFooter('thePlatform')}</p>
            <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
              {tFooter('platformDesc')}
            </p>
          </div>
          {[
            {
              title: tFooter('programme'),
              links: [
                { label: tFooter('links.howItWorks'), href: '/#program' },
                { label: tFooter('links.tracks'), href: '/tracks' },
                { label: tFooter('links.assessment'), href: '/assessment' },
                { label: tFooter('links.certificates'), href: '/certificates' },
              ],
            },
            {
              title: tFooter('company'),
              links: [
                { label: tFooter('links.about'), href: '/#about' },
                { label: tFooter('links.blog'), href: '/blog' },
                { label: tFooter('links.careers'), href: '/careers' },
                { label: tFooter('links.press'), href: '/press' },
              ],
            },
            {
              title: tFooter('support'),
              links: [
                { label: tFooter('links.helpCentre'), href: '/help' },
                { label: tFooter('links.contact'), href: '/contact' },
                { label: tFooter('links.privacy'), href: '/privacy' },
                { label: tFooter('links.terms'), href: '/terms' },
              ],
            },
          ].map(col => (
            <div key={col.title}>
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-sans)' }}>{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-slate-300"
                      style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>© 2026 OpusLearn. {tFooter('rights')}</p>
          <div className="flex items-center gap-4">
            {['#2563EB', '#E04D2A', '#F59E0B', '#10B981', '#06B6D4'].map(c => (
              <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <p className="text-xs" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>{tFooter('tagline2')}</p>
        </div>
      </div>
    </footer>
  )
}


// ─── Landing page ─────────────────────────────────────────────────────────────

export default function LandingPage() {
  const { user, loading, openSignIn } = useAuth()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  useEffect(() => { setMounted(true) }, [])

  // Redirect signed-in users to dashboard; dashboard handles the /assessment redirect if needed
  useEffect(() => {
    if (!mounted || loading || !user) return
    router.replace('/dashboard')
  }, [mounted, loading, user, router])

  // Auto-open sign-in modal when redirected here with ?signin=1 (e.g. from /admin gate)
  useEffect(() => {
    if (!mounted || loading) return
    const params = new URLSearchParams(window.location.search)
    if (params.get('signin') === '1' && !user) openSignIn()
  }, [mounted, loading, user, openSignIn])

  // Don't render anything until auth is resolved — prevents flash for signed-in users
  if (!mounted || loading || user) return null

  return (
    <main style={{ background: '#FFFFFF', color: '#0F172A', minHeight: '100vh' }}>
      <StickySignUpBar />
      <Navbar />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <RoleTracks />
      <Features />
      <TeamsSection />
      <Testimonials />
      <Pricing />
      <FAQ />
      <About />
      <FinalCTA />
      <Footer />
    </main>
  )
}
