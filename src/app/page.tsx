'use client'

import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  Sparkles, Target, TrendingUp, Briefcase, HeartHandshake,
  Megaphone, Settings, ArrowRight, Check, Star, Zap, Award,
  LineChart, GraduationCap, ClipboardList, CheckCircle2,
  ChevronRight, ChevronDown, Play, Route, LogOut, BookOpen, X, Users,
  Brain, Layers, BarChart3, Menu, Scale, Package, Headphones, BarChart,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

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
                Join 3,200+ professionals mastering AI
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                Free forever · No credit card required
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={openSignIn} className="text-sm font-medium transition-colors hover:text-slate-900"
                style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                Sign in
              </button>
              <Link href="/assessment"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
                Build my learning plan <ArrowRight size={13} />
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
  const { user, loading, openSignIn, signOut } = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? '?'

  const solidBg = scrolled || mobileOpen

  return (
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
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#7C3AED' }}>
            <Zap size={13} className="text-white" />
          </div>
          <span className="text-lg font-black tracking-tight" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
            AI Literacy
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Program', href: '#program' },
            { label: 'Tracks', href: '/tracks' },
            { label: 'For teams', href: '/teams' },
            { label: 'Pricing', href: '#pricing' },
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
          {/* Desktop auth */}
          {!loading && (
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button onClick={() => setAvatarOpen(v => !v)}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl transition-colors hover:bg-slate-100">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
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
                            <Zap size={14} /> Dashboard
                          </Link>
                          <Link href="/tracks" onClick={() => setAvatarOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-slate-50"
                            style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                            <BookOpen size={14} /> All tracks
                          </Link>
                          <button onClick={() => { signOut(); setAvatarOpen(false) }}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-red-50 hover:text-red-600"
                            style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                            <LogOut size={14} /> Sign out
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
                    Sign in
                  </button>
                  <Link href="/assessment"
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
                    Build my plan
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
                {['Program', 'Tracks', 'Pricing', 'About'].map(item => (
                  <a key={item}
                    href={item === 'Tracks' ? '/tracks' : `#${item.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center py-3.5 text-sm font-medium border-b transition-colors hover:text-violet-600"
                    style={{ color: '#475569', fontFamily: 'var(--font-sans)', borderColor: '#F8FAFC' }}>
                    {item}
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
                        <Zap size={14} /> Dashboard
                      </Link>
                      <button onClick={() => { signOut(); setMobileOpen(false) }}
                        className="flex items-center gap-2 py-3 px-4 rounded-xl text-sm w-full transition-colors hover:bg-red-50 hover:text-red-600"
                        style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                        <LogOut size={14} /> Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { openSignIn(); setMobileOpen(false) }}
                        className="w-full py-3 text-sm font-medium rounded-xl transition-colors hover:bg-slate-50"
                        style={{ color: '#64748B', fontFamily: 'var(--font-sans)', border: '1px solid #E2E8F0' }}>
                        Sign in
                      </button>
                      <Link href="/assessment" onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white"
                        style={{ background: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
                        Build my plan <ArrowRight size={13} />
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
  )
}

// ─── Dashboard Mockup ─────────────────────────────────────────────────────────

function DashboardMockup() {
  const modules = [
    { title: 'AI Foundations', progress: 100, color: '#10B981' },
    { title: 'ChatGPT for Business', progress: 75, color: '#7C3AED' },
    { title: 'Prompt Engineering', progress: 40, color: '#3B82F6' },
    { title: 'AI Strategy', progress: 10, color: '#F59E0B' },
    { title: 'Team AI Adoption', progress: 0, color: '#CBD5E1' },
  ]
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-3xl"
        style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(124,58,237,0.07) 0%, transparent 70%)' }} />
      <div className="relative rounded-2xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}>
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <div>
            <p className="text-xs font-medium mb-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>Your Learning Path</p>
            <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>Marketing Track</p>
          </div>
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold"
            style={{ background: '#EDE9FE', color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
            AI-Personalised
          </span>
        </div>
        <div className="grid grid-cols-3 px-5 py-4 gap-2" style={{ borderBottom: '1px solid #F1F5F9' }}>
          {[{ label: 'Completed', value: '1/5', color: '#10B981' }, { label: 'In Progress', value: '2', color: '#7C3AED' }, { label: 'Streak', value: '7 days', color: '#F59E0B' }].map(s => (
            <div key={s.label} className="text-center">
              <p className="text-base font-black" style={{ color: s.color, fontFamily: 'var(--font-sans)' }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{s.label}</p>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 space-y-3">
          {modules.map((mod, i) => (
            <motion.div key={mod.title} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: mod.progress === 100 ? mod.color : mod.progress > 0 ? 'transparent' : '#F8FAFC', border: mod.progress > 0 && mod.progress < 100 ? `2px solid ${mod.color}` : 'none' }}>
                {mod.progress === 100 && <Check size={10} color="white" />}
                {mod.progress > 0 && mod.progress < 100 && <div className="w-1.5 h-1.5 rounded-full" style={{ background: mod.color }} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium" style={{ color: mod.progress === 0 ? '#CBD5E1' : '#0F172A', fontFamily: 'var(--font-sans)' }}>{mod.title}</p>
                  <p className="text-xs font-bold" style={{ color: mod.color, fontFamily: 'var(--font-sans)' }}>{mod.progress}%</p>
                </div>
                <div className="h-1 rounded-full" style={{ background: '#F1F5F9' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${mod.progress}%` }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full" style={{ background: mod.color }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mx-5 mb-5 p-3 rounded-xl" style={{ background: '#F5F3FF', border: '1px solid #DDD6FE' }}>
          <p className="text-xs font-semibold mb-0.5" style={{ color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>Next up</p>
          <p className="text-sm font-semibold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>Writing AI prompts for campaign briefs</p>
          <p className="text-xs mt-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>15 min · Prompt Engineering module</p>
        </div>
      </div>
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -right-4 px-3 py-2 rounded-xl text-xs font-semibold"
        style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#059669', fontFamily: 'var(--font-sans)', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CheckCircle2 size={11} className="inline mr-1" />AI Foundation Complete
      </motion.div>
      <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl text-xs font-semibold"
        style={{ background: '#FFFBEB', border: '1px solid #FDE68A', color: '#D97706', fontFamily: 'var(--font-sans)', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <Zap size={11} className="inline mr-1" />7-day streak!
      </motion.div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative pt-24 sm:pt-32 pb-20 sm:pb-28" style={{ background: '#FFFFFF' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 60%)' }} />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 xl:gap-20 items-center">
        <motion.div variants={stagger(0.12)} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: '#EDE9FE', color: '#7C3AED', fontFamily: 'var(--font-sans)', border: '1px solid #DDD6FE' }}>
            <Sparkles size={11} /> Personalised AI Training for Business Leaders
          </motion.div>

          <motion.h1 variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
            Master AI<br /><span style={{ color: '#7C3AED' }}>Without Code</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
            A personalised learning path shaped by your role, industry, and goals.
            Join thousands of business professionals who now lead with AI — no technical background required.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-6">
            <Link href="/assessment"
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-base text-white transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: '#7C3AED', fontFamily: 'var(--font-sans)', boxShadow: '0 4px 16px rgba(124,58,237,0.28)' }}>
              Find My Learning Path <ArrowRight size={16} />
            </Link>
            <a href="#program"
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-base transition-all hover:bg-slate-50"
              style={{ border: '1px solid #E2E8F0', color: '#475569', fontFamily: 'var(--font-sans)' }}>
              <Play size={14} /> See How It Works
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-10">
            {['Free forever', 'No credit card required', 'Start in 2 minutes'].map(t => (
              <div key={t} className="flex items-center gap-1.5 text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                <Check size={11} color="#10B981" /> {t}
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {['#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EC4899'].map((color, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: color, zIndex: 5 - i }}>
                  {['A', 'B', 'C', 'D', 'E'][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />)}
                <span className="text-sm font-bold ml-1.5" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>4.9</span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>From 3,200+ professionals</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easing }}
          className="hidden md:flex items-center justify-center py-8 px-4">
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  )
}

// ─── Social Proof ─────────────────────────────────────────────────────────────

function SocialProof() {
  const companies = ['McKinsey', 'Deloitte', 'KPMG', 'Goldman Sachs', "L'Oréal", 'Nestlé', 'Airbus', 'BNP Paribas', 'Accenture', 'BCG']
  const stats = [
    { n: '3,200+', label: 'Professionals trained' },
    { n: '94%', label: 'Completion rate' },
    { n: '4.9/5', label: 'Average rating' },
    { n: '4.2 hrs', label: 'Saved per week on average' },
  ]
  return (
    <div style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div className="py-8">
        <p className="text-center text-xs font-semibold mb-6 tracking-widest uppercase" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
          Trusted by professionals at
        </p>
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="flex gap-16 flex-nowrap w-max">
            {[...companies, ...companies].map((c, i) => (
              <span key={i} className="text-sm font-semibold whitespace-nowrap" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{c}</span>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6"
        style={{ borderTop: '1px solid #E2E8F0' }}>
        {stats.map(s => (
          <div key={s.n} className="text-center">
            <p className="text-2xl sm:text-3xl font-black mb-1" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>{s.n}</p>
            <p className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    { number: '01', icon: ClipboardList, title: 'Take the Assessment', desc: 'Answer 5 quick questions about your role, industry, and goals. Takes 3 minutes and shapes everything that follows.', color: '#7C3AED' },
    { number: '02', icon: Route, title: 'Get Your Path', desc: 'Our AI engine builds your personalised curriculum — the right modules, in the right order, at the right depth for who you are.', color: '#3B82F6' },
    { number: '03', icon: GraduationCap, title: 'Learn & Apply', desc: 'Short, practical lessons you can apply the same day. Real exercises using tools you already have.', color: '#10B981' },
  ]
  const { ref, isInView } = useReveal()
  return (
    <section id="program" className="py-20 sm:py-28" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} variants={stagger(0.12)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>How it works</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              Three steps to AI fluency
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(step => {
              const Icon = step.icon
              return (
                <motion.div key={step.title} variants={fadeUp}
                  className="p-7 rounded-2xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-4xl font-black leading-none" style={{ color: '#EDE9FE', fontFamily: 'var(--font-sans)' }}>{step.number}</span>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: step.color + '12' }}>
                      <Icon size={17} style={{ color: step.color }} />
                    </div>
                  </div>
                  <h3 className="text-lg font-black mb-2" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Role Tracks ──────────────────────────────────────────────────────────────

const TRACKS = [
  { id: 'marketing',  icon: Megaphone,    label: 'Marketing',        color: '#EC4899', skills: ['AI copywriting', 'Campaign automation', 'Content strategy', 'Data analysis'] },
  { id: 'finance',    icon: LineChart,    label: 'Finance',          color: '#F59E0B', skills: ['Financial modelling', 'Report generation', 'Risk analysis', 'Forecasting'] },
  { id: 'hr',         icon: HeartHandshake, label: 'HR & People',   color: '#10B981', skills: ['Talent acquisition', 'L&D automation', 'HR analytics', 'Engagement'] },
  { id: 'sales',      icon: TrendingUp,   label: 'Sales',            color: '#7C3AED', skills: ['Prospect research', 'Proposal writing', 'CRM automation', 'Pipeline AI'] },
  { id: 'operations', icon: Settings,     label: 'Operations',       color: '#06B6D4', skills: ['Process automation', 'Decision support', 'Supply chain AI', 'Quality ops'] },
  { id: 'leadership', icon: Briefcase,    label: 'Leadership',       color: '#F97316', skills: ['AI strategy', 'Change management', 'Team enablement', 'Executive decisions'] },
  { id: 'legal',      icon: Scale,        label: 'Legal',            color: '#6366F1', skills: ['Contract analysis', 'Legal research', 'Risk assessment', 'AI governance'] },
  { id: 'product',    icon: Package,      label: 'Product',          color: '#14B8A6', skills: ['User research', 'Roadmap prioritisation', 'PRD writing', 'AI product strategy'] },
  { id: 'customer',   icon: Headphones,   label: 'Customer Success', color: '#F43F5E', skills: ['Health monitoring', 'Churn prevention', 'Personalisation', 'CS operations'] },
  { id: 'consulting', icon: BarChart,     label: 'Consulting',       color: '#0EA5E9', skills: ['Research synthesis', 'Structured analysis', 'Slide writing', 'Client communication'] },
]

function RoleTracks() {
  const { ref, isInView } = useReveal()
  return (
    <section id="tracks" className="py-20 sm:py-28" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} variants={stagger(0.08)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>Role-based tracks</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              Built for your job, not a generic audience
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              Every track is designed around the real tasks you face — not abstract AI theory.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRACKS.map(track => {
              const Icon = track.icon
              return (
                <motion.div key={track.id} variants={fadeUp}>
                  <Link href={`/tracks/${track.id}`}
                    className="group block p-6 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div className="h-0.5 w-8 rounded-full mb-5" style={{ background: track.color }} />
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: track.color + '12' }}>
                        <Icon size={19} style={{ color: track.color }} />
                      </div>
                      <ChevronRight size={15} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: track.color }} />
                    </div>
                    <h3 className="text-base font-black mb-3" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>{track.label}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {track.skills.map(skill => (
                        <span key={skill} className="text-xs px-2 py-0.5 rounded-md font-medium"
                          style={{ background: '#F8FAFC', color: '#64748B', fontFamily: 'var(--font-sans)', border: '1px solid #E2E8F0' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: Brain, title: 'Adaptive AI personalisation', desc: 'Your path updates as you learn. The more you do, the more accurately it maps to where you are.', color: '#7C3AED' },
  { icon: Target, title: 'Role-specific content', desc: 'Every lesson, exercise, and example is tailored to your job function — not recycled from a generic course.', color: '#3B82F6' },
  { icon: Layers, title: 'Practical exercises', desc: 'Apply what you learn immediately. Every module ends with a real task using tools you already have access to.', color: '#10B981' },
  { icon: BarChart3, title: 'Progress tracking', desc: "See exactly where you are, what you've mastered, and what comes next — with XP, streaks, and milestones.", color: '#F59E0B' },
  { icon: Award, title: 'Verified certificates', desc: 'Earn credentials that signal AI literacy to your employer — tied to your specific role and track.', color: '#EC4899' },
  { icon: Users, title: 'Peer community', desc: 'Learn alongside professionals from your industry. Share wins, ask questions, and stay accountable together.', color: '#06B6D4' },
]

function Features() {
  const { ref, isInView } = useReveal()
  return (
    <section className="py-20 sm:py-28" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} variants={stagger(0.08)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>Everything you need</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              Designed for how professionals actually learn
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => {
              const Icon = f.icon
              return (
                <motion.div key={f.title} variants={fadeUp} className="p-6 rounded-2xl"
                  style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: f.color + '12' }}>
                    <Icon size={18} style={{ color: f.color }} />
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

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  { name: 'Sophie Armand', role: 'Head of Marketing', company: "L'Oréal Paris", avatar: 'SA', color: '#EC4899', quote: 'I went from intimidated by AI to running three AI-assisted campaigns in two months. The Marketing track understood exactly where I needed to start.' },
  { name: 'James Whitfield', role: 'VP Finance', company: 'Goldman Sachs', avatar: 'JW', color: '#F59E0B', quote: 'The Finance track cut straight to what matters. No filler, no hype — just practical tools I use every week now in FP&A and reporting.' },
  { name: 'Priya Nair', role: 'CHRO', company: 'Accenture', avatar: 'PN', color: '#10B981', quote: "The assessment nailed my needs better than I could have myself. Three weeks in and I've already built an AI-assisted onboarding process for our team." },
  { name: 'Marcus Reid', role: 'Account Executive', company: 'Salesforce', avatar: 'MR', color: '#8B5CF6', quote: "I was spending 3 hours a week on prospect research. After the Sales track, that's down to 40 minutes — and the quality of my outreach has gone up significantly." },
  { name: 'Clara Dubois', role: 'Senior Legal Counsel', company: 'BNP Paribas', avatar: 'CD', color: '#6366F1', quote: "I was sceptical AI could work in legal. The Legal track changed my mind completely. I reviewed a 60-page contract in 20 minutes last week — with better notes than usual." },
  { name: 'Tom Nakamura', role: 'Product Manager', company: 'Notion', avatar: 'TN', color: '#14B8A6', quote: "The Product track is genuinely the best thing I've done for my career this year. I now go from user interview to draft PRD in one afternoon instead of three days." },
]

function Testimonials() {
  const { ref, isInView } = useReveal()
  return (
    <section className="py-20 sm:py-28" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} variants={stagger(0.12)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>What people say</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              Real results from real professionals
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <motion.div key={t.name} variants={fadeUp} className="p-7 rounded-2xl flex flex-col"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid #F1F5F9' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
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
    a: 'Yes. The free plan gives you full access to Module 1 of your track — 4 complete lessons — with no credit card required. Professional and Team plans also include a 7-day free trial.',
  },
  {
    q: 'Is there a plan for teams or companies?',
    a: 'Yes. The Team plan starts at $39/seat/month and includes a team dashboard, manager progress view, and group challenges. For larger rollouts or enterprise pricing, reach out via the contact page.',
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const { ref, isInView } = useReveal()
  return (
    <section className="py-20 sm:py-28" style={{ background: '#F8FAFC' }}>
      <div className="max-w-3xl mx-auto px-6">
        <motion.div ref={ref} variants={stagger(0.08)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              Common questions
            </h2>
          </motion.div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} variants={fadeUp}
                className="rounded-2xl overflow-hidden"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold pr-4" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
                    <ChevronDown size={16} style={{ color: '#94A3B8' }} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const plans = [
  {
    name: 'Free', monthlyPrice: '0', annualPrice: '0',
    desc: 'Start with your full first module — no card needed',
    features: ['Full Module 1 of your track (4 lessons)', 'Role assessment & personalised path', 'Lesson exercises & quiz', 'XP & progress tracking'],
    cta: 'Start Free', highlight: false,
  },
  {
    name: 'Professional', monthlyPrice: '49', annualPrice: '39',
    desc: '7-day free trial · Full access to your personalised path',
    features: ['All lessons in your track', 'AI-personalised curriculum', 'All 10 role tracks', 'Progress analytics & streaks', 'Verified certificate', 'Priority support'],
    cta: 'Start 7-Day Free Trial', highlight: true,
  },
  {
    name: 'Team', monthlyPrice: '39', annualPrice: '31',
    desc: 'Per seat — built for teams learning together',
    features: ['Everything in Professional', 'Team dashboard', 'Manager progress view', 'Group challenges', 'Custom onboarding', 'Dedicated CSM'],
    cta: 'Talk to Sales', highlight: false,
  },
]

function Pricing() {
  const [annual, setAnnual] = useState(false)
  const { ref, isInView } = useReveal()
  const { openSignUp } = useAuth()

  return (
    <section id="pricing" className="py-20 sm:py-28" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} variants={stagger(0.1)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>Pricing</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-8" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              Simple, transparent pricing
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="text-sm font-medium" style={{ color: annual ? '#94A3B8' : '#0F172A', fontFamily: 'var(--font-sans)' }}>Monthly</span>
              <button onClick={() => setAnnual(!annual)}
                className="w-11 h-6 rounded-full relative transition-colors"
                style={{ background: annual ? '#7C3AED' : '#E2E8F0' }}>
                <motion.div animate={{ x: annual ? 23 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-sm" />
              </button>
              <span className="text-sm font-medium" style={{ color: annual ? '#0F172A' : '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                Annual <span className="px-1.5 py-0.5 rounded text-xs font-semibold ml-1"
                  style={{ background: '#DCFCE7', color: '#16A34A' }}>−20%</span>
              </span>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {plans.map(plan => (
              <motion.div key={plan.name} variants={fadeUp} className={`relative rounded-2xl overflow-hidden${plan.highlight ? ' sm:col-span-2 lg:col-span-1' : ''}`}
                style={plan.highlight
                  ? { background: '#7C3AED', boxShadow: '0 20px 48px rgba(124,58,237,0.25)' }
                  : { background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                {plan.highlight && (
                  <div className="text-center py-1.5 text-xs font-bold tracking-wider"
                    style={{ background: 'rgba(0,0,0,0.12)', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-sans)' }}>
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <p className="text-sm font-semibold mb-1"
                    style={{ color: plan.highlight ? 'rgba(255,255,255,0.65)' : '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-5xl font-black" style={{ fontFamily: 'var(--font-sans)', color: plan.highlight ? '#FFFFFF' : '#0F172A' }}>
                      ${annual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    {plan.monthlyPrice !== '0' && (
                      <span className="text-sm mb-2" style={{ color: plan.highlight ? 'rgba(255,255,255,0.45)' : '#94A3B8', fontFamily: 'var(--font-sans)' }}>/seat/mo</span>
                    )}
                  </div>
                  <p className="text-sm mb-7" style={{ color: plan.highlight ? 'rgba(255,255,255,0.55)' : '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                    {plan.desc}
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
                    <button
                      className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
                      style={{ background: '#0F172A', color: '#FFFFFF', fontFamily: 'var(--font-sans)' }}>
                      {plan.cta}
                    </button>
                  ) : (
                    <Link href="/assessment"
                      className="flex items-center justify-center w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
                      style={plan.highlight
                        ? { background: '#FFFFFF', color: '#7C3AED', fontFamily: 'var(--font-sans)' }
                        : { background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#475569', fontFamily: 'var(--font-sans)' }
                      }>
                      {plan.cta}
                    </Link>
                  )}
                  {plan.highlight && (
                    <p className="text-center text-xs mt-2.5" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-sans)' }}>
                      Free for 7 days &middot; $49/mo after &middot; Cancel anytime
                    </p>
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

  const team = [
    {
      name: 'Marie Leconte',
      role: 'CEO & Co-founder',
      initials: 'ML',
      color: '#7C3AED',
      prev: 'McKinsey & Company',
      bio: 'Former McKinsey partner who spent 12 years watching businesses struggle to operationalise new technologies. Built the AI Literacy curriculum after 200+ interviews with leaders across finance, marketing, and operations.',
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
      num: '01', bg: '#EDE9FE', color: '#7C3AED',
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
    <section id="about" className="py-20 sm:py-28" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} variants={stagger(0.1)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={fadeUp} className="max-w-3xl mb-16">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>About us</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              We started because we saw a gap nobody was filling
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              AI capabilities were advancing at speed. Business professionals were being left behind — not for lack of intelligence, but for lack of access to the right kind of training. We built AI Literacy to close that gap.
            </p>
          </motion.div>

          {/* Quote + Stats */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden p-10"
              style={{ background: '#0F172A' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(124,58,237,0.15) 0%, transparent 65%)' }} />
              <div className="relative">
                <div className="w-1 h-10 rounded-full mb-7" style={{ background: '#7C3AED' }} />
                <blockquote className="text-xl lg:text-2xl font-black leading-snug mb-6 text-white" style={{ fontFamily: 'var(--font-sans)' }}>
                  &ldquo;Every professional deserves to harness AI &mdash; not just those with an engineering degree. We built the platform we wished existed when AI changed everything.&rdquo;
                </blockquote>
                <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-sans)' }}>
                  Marie Leconte &mdash; CEO &amp; Co-founder, AI Literacy
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
            <p className="text-xs font-bold tracking-widest uppercase mb-8 text-center" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>The team</p>
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
                      <p className="text-xs mt-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>Previously: {member.prev}</p>
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
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#7C3AED' }}>
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.07) 0%, transparent 60%)' }} />
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <motion.div ref={ref} variants={stagger(0.12)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.p variants={fadeUp} className="text-sm font-bold tracking-widest uppercase mb-4"
            style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-sans)' }}>
            Get Started Today
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 text-white"
            style={{ fontFamily: 'var(--font-sans)' }}>
            Ready to lead with AI?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg mb-10"
            style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-sans)' }}>
            Take the 3-minute assessment. Get your personalised path. Start learning today.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/assessment"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-base transition-all hover:scale-[1.02]"
              style={{ background: '#FFFFFF', color: '#7C3AED', fontFamily: 'var(--font-sans)', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
              Take the Free Assessment <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-6 text-sm"
            style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-sans)' }}>
            No credit card required · Free plan available · Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-16" style={{ background: '#0F172A' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#7C3AED' }}>
                <Zap size={13} className="text-white" />
              </div>
              <span className="text-base font-black" style={{ fontFamily: 'var(--font-sans)', color: '#F1F5F9' }}>AI Literacy</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              AI training built for business professionals. No code required.
            </p>
          </div>
          {[
            {
              title: 'Programme',
              links: [
                { label: 'How it works', href: '/#program' },
                { label: 'Tracks', href: '/tracks' },
                { label: 'Assessment', href: '/assessment' },
                { label: 'Certificates', href: '/certificates' },
              ],
            },
            {
              title: 'Company',
              links: [
                { label: 'About', href: '/#about' },
                { label: 'Blog', href: '/blog' },
                { label: 'Careers', href: '/careers' },
                { label: 'Press', href: '/press' },
              ],
            },
            {
              title: 'Support',
              links: [
                { label: 'Help centre', href: '/help' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
              ],
            },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-sm font-bold mb-4" style={{ fontFamily: 'var(--font-sans)', color: '#E2E8F0' }}>{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-slate-200"
                      style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>© 2026 AI Literacy. All rights reserved.</p>
          <p className="text-xs" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>Built for professionals who want to stay ahead.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <main style={{ background: '#FFFFFF', color: '#0F172A', minHeight: '100vh' }}>
      <StickySignUpBar />
      <Navbar />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <RoleTracks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <About />
      <FinalCTA />
      <Footer />
    </main>
  )
}
