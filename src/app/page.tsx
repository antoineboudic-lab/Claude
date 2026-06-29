'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import {
  Sparkles, Target, TrendingUp, Briefcase, HeartHandshake,
  Megaphone, Settings, ArrowRight, Check, Zap, Award,
  LineChart, Play, LogOut, BookOpen, X, Users,
  Brain, Layers, BarChart3, Menu, Scale, Package, Headphones, BarChart, Search, Globe,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/context/AuthContext'
import { useGame } from '@/context/GameContext'
import Logo from '@/components/Logo'
import GlobalSearch from '@/components/GlobalSearch'
import { useGeo } from '@/hooks/useGeo'

// ─── Editorial design system ────────────────────────────────────────────────
// "OpusLearn as a numbered composition": ink on paper, a distinctive serif for
// display, monospace for metadata, and a signature cobalt as the brand blue.
// Warm editorial DARK theme. Token names kept for continuity, values inverted:
// PAPER is now the dark page surface; INK is now the light primary text.
const PAPER = '#141518'        // page surface — warm near-black
const PAPER_2 = '#1C1E24'      // raised inset / card surface
const PANEL = '#0F1013'        // deeper contrast band (former ink sections)
const INK = '#F2F1EA'          // primary text — warm paper white
const INK_SOFT = 'rgba(242,241,234,0.62)'  // secondary text
const INK_FAINT = 'rgba(242,241,234,0.40)' // tertiary / captions
const COBALT = '#2440D8'       // signature blue — button fills (white text)
const COBALT_TX = '#8A9DFF'    // lifted cobalt — accent text / numerals on dark
const COBALT_GLOW = '#2E4BE0'  // aurora glow source
const LIGHT = '#F2F1EA'        // explicit light surface (inverted CTAs)
const RULE = 'rgba(255,255,255,0.12)'      // hairline on dark
const SERIF = 'var(--font-serif)'
const MONO = 'var(--font-mono)'
const SANS = 'var(--font-sans)'

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

// ─── Editorial craft: grain, kinetic headline, running folios ─────────────────

// Fine fractal-noise film over the whole page — the "printed on stock" texture
// that flat AI fills never have. soft-light reads correctly on paper AND ink.
const GRAIN_URL = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")"

function GrainOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30"
      style={{ backgroundImage: GRAIN_URL, backgroundSize: '160px 160px', opacity: 0.22, mixBlendMode: 'soft-light' }} />
  )
}

// Soft cobalt aurora bloom — atmospheric depth behind headlines on the dark
// theme. Lives inside an overflow-hidden section so it never bleeds.
function AuroraGlow({ style }: { style?: React.CSSProperties }) {
  return (
    <div aria-hidden className="pointer-events-none absolute rounded-full"
      style={{
        background: `radial-gradient(circle, ${COBALT_GLOW}66 0%, ${COBALT_GLOW}26 34%, transparent 68%)`,
        filter: 'blur(40px)',
        ...style,
      }} />
  )
}

// Framed product screenshot — a browser-style window so real (light) product
// shots read as a focal visual on the dark page.
function ScreenFrame({ src, alt, label, priority }: { src: string; alt: string; label?: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden"
      style={{ border: `1px solid ${RULE}`, borderRadius: 10, background: PAPER_2, boxShadow: '0 40px 90px -45px rgba(0,0,0,0.85)' }}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: `1px solid ${RULE}`, background: 'rgba(255,255,255,0.03)' }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.16)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.16)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.16)' }} />
        {label && <span className="ml-3 truncate text-[11px]" style={{ fontFamily: MONO, color: INK_FAINT }}>{label}</span>}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block w-full" loading={priority ? 'eager' : 'lazy'} />
    </div>
  )
}

// Editorial photograph — real human imagery carried into the warm-dark palette
// with a cobalt duotone wash + the same film grain as the page, so photography
// reads as intentional craft rather than dropped-in stock. Caption sits in the
// lower-left like a magazine plate.
function EditorialPhoto({ src, alt, eyebrow, caption, aspect = '4 / 3', className = '' }: { src: string; alt: string; eyebrow?: string; caption?: string; aspect?: string; className?: string }) {
  return (
    <figure className={`group relative overflow-hidden ${className}`}
      style={{ border: `1px solid ${RULE}`, borderRadius: 6, background: PANEL }}>
      <div className="relative w-full" style={{ aspectRatio: aspect }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          style={{ filter: 'grayscale(1) contrast(1.08) brightness(0.92)' }} />
        {/* cobalt monotone — maps the grayscale plate to a single brand hue so the
            photography reads as an intentional editorial duotone, not dropped-in stock */}
        <div aria-hidden className="absolute inset-0"
          style={{ background: COBALT, mixBlendMode: 'color', opacity: 0.62 }} />
        {/* depth wash + bottom fade for caption legibility */}
        <div aria-hidden className="absolute inset-0"
          style={{ background: `radial-gradient(130% 90% at 25% 0%, rgba(36,64,216,0.32), transparent 58%), linear-gradient(180deg, rgba(15,16,19,0.20) 0%, rgba(15,16,19,0.82) 100%)` }} />
        {/* matching film grain */}
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: GRAIN_URL, backgroundSize: '160px 160px', opacity: 0.25, mixBlendMode: 'soft-light' }} />
      </div>
      {(eyebrow || caption) && (
        <figcaption className="absolute left-5 bottom-4 right-5">
          {eyebrow && (
            <p className="text-[10px] uppercase tracking-[0.2em] mb-1.5" style={{ fontFamily: MONO, color: COBALT_TX }}>{eyebrow}</p>
          )}
          {caption && (
            <p style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '1.08rem', lineHeight: 1.25, color: INK, maxWidth: '26rem' }}>{caption}</p>
          )}
        </figcaption>
      )}
    </figure>
  )
}

// Headline word that rotates through role nouns — dramatises the whole
// role-specific premise in one kinetic beat. Sits on its own line so the
// varying word width never reflows the rest of the headline.
function CyclingWord({ words, style }: { words: string[]; style?: React.CSSProperties }) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI(p => (p + 1) % words.length), 2300)
    return () => clearInterval(t)
  }, [words.length, reduce])
  if (reduce) {
    return <em style={{ fontStyle: 'italic', ...style }}>{words[0]}</em>
  }
  return (
    <span style={{ position: 'relative', display: 'inline-block', verticalAlign: 'baseline' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.em key={words[i]}
          initial={{ y: '0.42em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-0.42em', opacity: 0 }}
          transition={{ duration: 0.42, ease: easing }}
          style={{ display: 'inline-block', fontStyle: 'italic', whiteSpace: 'nowrap', ...style }}>
          {words[i]}
        </motion.em>
      </AnimatePresence>
    </span>
  )
}

// Running folios — a magazine page-rail in the left margin that tracks the
// active "Op." section as you scroll. Only on wide screens where margin exists.
const FOLIOS = [
  { id: '01', label: 'Role-specific AI literacy' },
  { id: '02', label: 'How it works' },
  { id: '03', label: 'Role-based tracks' },
  { id: '04', label: 'Everything you need' },
  { id: '05', label: 'For teams' },
  { id: '06', label: 'Pricing' },
  { id: '07', label: 'Before you ask' },
  { id: '08', label: 'The thesis' },
]

function RunningFolio() {
  const [active, setActive] = useState('01')
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-folio]'))
    if (!els.length) return
    const io = new IntersectionObserver(
      entries => {
        const vis = entries.filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (vis[0]) setActive((vis[0].target as HTMLElement).dataset.folio || '01')
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <nav aria-hidden className="hidden min-[1440px]:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-2.5"
      title={FOLIOS.find(f => f.id === active)?.label}>
      {FOLIOS.map(f => {
        const on = f.id === active
        return (
          <div key={f.id} className="flex items-center gap-2.5" style={{ height: 14 }}>
            <span className="block transition-all duration-300"
              style={{ width: on ? 20 : 7, height: 1, background: on ? COBALT_TX : RULE }} />
            <span className="text-[10px] tabular-nums transition-colors duration-300"
              style={{ fontFamily: MONO, color: on ? COBALT_TX : INK_FAINT }}>{f.id}</span>
          </div>
        )
      })}
    </nav>
  )
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
          style={{ background: PAPER, boxShadow: `0 -1px 0 ${RULE}, 0 -8px 32px rgba(21,23,28,0.07)` }}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '1.05rem', color: INK, lineHeight: 1.2 }}>
                {tBar('title')}
              </p>
              <p className="text-xs mt-0.5" style={{ color: INK_FAINT, fontFamily: SANS }}>
                {tBar('sub')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={openSignIn} className="text-sm transition-colors"
                style={{ color: INK_SOFT, fontFamily: SANS, fontWeight: 500 }}>
                {tNav('signIn')}
              </button>
              <Link href="/assessment"
                className="flex items-center gap-2 px-5 py-2.5 text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: COBALT, borderRadius: 3, fontFamily: SANS, fontWeight: 600, letterSpacing: '-0.01em' }}>
                {tBar('buildPlan')} <ArrowRight size={13} />
              </Link>
              <button onClick={() => setDismissed(true)}
                className="w-7 h-7 rounded-md flex items-center justify-center transition-colors hover:bg-black/5"
                style={{ color: INK_FAINT }}>
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
        background: solidBg ? 'rgba(18,19,22,0.86)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px) saturate(1.1)' : 'none',
        borderBottom: solidBg ? `1px solid ${RULE}` : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo size="md" color="light" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: tNav('program'), href: '#program' },
            { label: tNav('tracks'), href: '/tracks' },
            { label: tNav('forTeams'), href: '/teams' },
            { label: tNav('pricing'), href: '#pricing' },
            { label: 'Blog', href: '/blog' },
          ].map(item => (
            item.href.startsWith('/') ? (
              <Link key={item.label} href={item.href}
                className="text-sm transition-opacity hover:opacity-60"
                style={{ color: INK_SOFT, fontFamily: SANS, fontWeight: 500 }}>
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href}
                className="text-sm transition-opacity hover:opacity-60"
                style={{ color: INK_SOFT, fontFamily: SANS, fontWeight: 500 }}>
                {item.label}
              </a>
            )
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs transition-opacity hover:opacity-70"
            style={{ color: INK_SOFT, fontFamily: SANS, border: `1px solid ${RULE}`, background: 'transparent', borderRadius: 3 }}
          >
            <Search size={12} />
            <span>{tNav('search')}</span>
            <kbd style={{ fontSize: '10px', color: INK_FAINT, border: `1px solid ${RULE}`, borderRadius: 2, padding: '0px 4px' }}>⌘K</kbd>
          </button>

          {/* Desktop auth */}
          {!loading && (
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button onClick={() => setAvatarOpen(v => !v)}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl transition-colors hover:bg-white/5">
                    <div className="w-8 h-8 flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: COBALT, fontFamily: SANS, borderRadius: 3 }}>
                      {initials}
                    </div>
                    <span className="text-sm font-medium" style={{ color: INK, fontFamily: 'var(--font-sans)' }}>
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
                        style={{ background: PAPER_2, border: `1px solid ${RULE}`, boxShadow: '0 16px 40px rgba(0,0,0,0.55)' }}
                      >
                        <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                          <p className="text-xs font-medium truncate" style={{ color: INK_FAINT, fontFamily: 'var(--font-sans)' }}>
                            {user.email}
                          </p>
                        </div>
                        <div className="p-1.5">
                          <Link href="/dashboard" onClick={() => setAvatarOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-white/5"
                            style={{ color: INK_SOFT, fontFamily: 'var(--font-sans)' }}>
                            <Zap size={14} /> {tNav('dashboard')}
                          </Link>
                          <Link href="/tracks" onClick={() => setAvatarOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-white/5"
                            style={{ color: INK_SOFT, fontFamily: 'var(--font-sans)' }}>
                            <BookOpen size={14} /> {tNav('allTracks')}
                          </Link>
                          <button onClick={() => { signOut(); setAvatarOpen(false) }}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-red-50 hover:text-red-600"
                            style={{ color: INK_FAINT, fontFamily: 'var(--font-sans)' }}>
                            <LogOut size={14} /> {tNav('signOut')}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <button onClick={openSignIn}
                    className="text-sm transition-opacity hover:opacity-60"
                    style={{ color: INK_SOFT, fontFamily: SANS, fontWeight: 500 }}>
                    {tNav('signIn')}
                  </button>
                  <Link href="/assessment"
                    className="px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: COBALT, fontFamily: SANS, borderRadius: 3 }}>
                    {tNav('buildMyPlan')}
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-white/5"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            style={{ color: INK_SOFT }}
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
            style={{ background: PAPER, borderTop: `1px solid ${RULE}` }}
          >
            <div className="px-6 pb-6 pt-2">
              <div className="mb-2">
                {[
                  { label: tNav('program'), href: '#program' },
                  { label: tNav('tracks'), href: '/tracks' },
                  { label: tNav('forTeams'), href: '/teams' },
                  { label: tNav('pricing'), href: '#pricing' },
                  { label: 'Blog', href: '/blog' },
                ].map(item => (
                  <a key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center py-3.5 text-sm font-medium border-b transition-colors hover:text-blue-600"
                    style={{ color: INK_SOFT, fontFamily: 'var(--font-sans)', borderColor: 'rgba(255,255,255,0.1)' }}>
                    {item.label}
                  </a>
                ))}
              </div>
              {!loading && (
                <div className="pt-4 space-y-2" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                  {user ? (
                    <>
                      <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 py-3 px-4 rounded-xl text-sm font-medium w-full transition-colors hover:bg-white/5"
                        style={{ color: INK_SOFT, fontFamily: 'var(--font-sans)' }}>
                        <Zap size={14} /> {tNav('dashboard')}
                      </Link>
                      <button onClick={() => { signOut(); setMobileOpen(false) }}
                        className="flex items-center gap-2 py-3 px-4 rounded-xl text-sm w-full transition-colors hover:bg-red-50 hover:text-red-600"
                        style={{ color: INK_FAINT, fontFamily: 'var(--font-sans)' }}>
                        <LogOut size={14} /> {tNav('signOut')}
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { openSignIn(); setMobileOpen(false) }}
                        className="w-full py-3 text-sm font-medium rounded-xl transition-colors hover:bg-white/5"
                        style={{ color: INK_SOFT, fontFamily: 'var(--font-sans)', border: '1px solid rgba(255,255,255,0.12)' }}>
                        {tNav('signIn')}
                      </button>
                      <Link href="/assessment" onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white"
                        style={{ background: COBALT, fontFamily: SANS, borderRadius: 3 }}>
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

const HERO_ROLE_WORDS = ['marketer', 'analyst', 'recruiter', 'seller', 'operator', 'founder', 'lawyer']

function Hero() {
  const tHero = useTranslations('home.hero')

  return (
    <section data-folio="01" className="relative overflow-hidden" style={{ background: PAPER, paddingTop: '6.5rem' }}>
      <AuroraGlow style={{ width: 880, height: 880, top: -340, right: -200, opacity: 0.6 }} />
      <AuroraGlow style={{ width: 520, height: 520, bottom: -300, left: -160, opacity: 0.32 }} />
      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-[1fr_1.04fr] gap-y-12 lg:gap-x-14 pt-10 lg:pt-12 pb-16 lg:pb-24 items-center">

          {/* ── Left: the clear message ── */}
          <motion.div variants={stagger(0.08)} initial="hidden" animate="visible">

            <motion.h1 variants={fadeUp}
              style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2.6rem, 5.4vw, 4.6rem)', lineHeight: 1.0, letterSpacing: '-0.015em', color: INK, marginBottom: '1.5rem' }}>
              Master the AI skills your job{' '}
              <em style={{ fontStyle: 'italic', color: COBALT_TX }}>actually</em> needs.
            </motion.h1>

            <motion.p variants={fadeUp}
              style={{ fontFamily: SANS, fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)', lineHeight: 1.6, color: INK_SOFT, maxWidth: '32rem', marginBottom: '1.6rem' }}>
              OpusLearn builds a learning path around your exact role, then teaches you to apply AI to real work — in 15 minutes a day. No coding, no jargon, no generic courses.
            </motion.p>

            {/* What you actually do — 3 plain steps */}
            <motion.ul variants={fadeUp} className="mb-8 space-y-3">
              {[
                ['1', 'Take a 3-minute assessment about your role'],
                ['2', 'Get a learning path personalised to your work'],
                ['3', 'Learn and apply — 15 minutes a day'],
              ].map(([n, t]) => (
                <li key={n} className="flex items-center gap-3">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-full text-[11px]"
                    style={{ border: `1px solid ${RULE}`, color: COBALT_TX, fontFamily: MONO }}>{n}</span>
                  <span style={{ fontFamily: SANS, fontSize: '1rem', color: INK }}>{t}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-7">
              <Link href="/assessment"
                className="group inline-flex items-center gap-2.5 px-7 py-4 text-white transition-opacity hover:opacity-90"
                style={{ background: COBALT, borderRadius: 4, fontFamily: SANS, fontSize: '16px', letterSpacing: '-0.01em', fontWeight: 600 }}>
                Take the free assessment
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#program"
                className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
                style={{ color: INK, fontFamily: SANS, fontSize: '15px', fontWeight: 500 }}>
                <Play size={11} fill={INK} /> See how it works
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: real product screenshot ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easing }}
            className="lg:mt-1">
            <ScreenFrame src="/landing/assessment.png" priority
              alt="The OpusLearn assessment building a personalised learning path in real time"
              label="opuslearn.ai/assessment" />
            <p className="mt-4 flex items-center gap-2 px-1" style={{ fontFamily: SANS, fontSize: '0.92rem', color: INK_FAINT }}>
              <Sparkles size={13} style={{ color: COBALT_TX }} />
              Your path builds live as you answer — no two learners get the same one.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Social Proof ─────────────────────────────────────────────────────────────

// Counts up to a target when scrolled into view; respects reduced-motion.
function CountUp({ to, duration = 1.5 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!isInView) return
    if (reduce) { setVal(to); return }
    let raf = 0
    let start = 0
    const step = (t: number) => {
      if (!start) start = t
      const p = Math.min((t - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)  // easeOutCubic
      setVal(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [isInView, to, duration, reduce])
  return <span ref={ref}>{val}</span>
}

function SocialProof() {
  const tSocial = useTranslations('home.social')
  const { ref, isInView } = useReveal()
  // Verifiable product facts only — no invented social proof
  const stats = [
    { icon: Layers,   to: 11,  label: tSocial('stats.tracks'),    note: 'From Marketing to Legal — one for your exact function.' },
    { icon: BookOpen, to: 286, label: tSocial('stats.lessons'),   note: 'Every one ends in a real task you ship — never a quiz.' },
    { icon: Globe,    to: 14,  label: tSocial('stats.languages'), note: 'Learn in your language, wherever your team works.' },
    { icon: Check,    to: 4,   label: tSocial('stats.steps'),     note: 'Read, watch, try, apply — the rhythm of every lesson.' },
  ]
  return (
    <section className="relative overflow-hidden" style={{ background: PANEL }}>
      <AuroraGlow style={{ width: 760, height: 760, top: -360, left: '50%', transform: 'translateX(-50%)', opacity: 0.2 }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div ref={ref} variants={stagger(0.1)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-4" style={{ borderTop: `1px solid ${RULE}` }}>
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div key={s.label} variants={fadeUp}
                className="group relative px-5 sm:px-8 py-10 sm:py-12 border-[rgba(255,255,255,0.12)] [&:nth-child(2n)]:border-l [&:nth-child(n+3)]:border-t sm:[&:nth-child(n+2)]:border-l sm:[&:nth-child(n+3)]:border-t-0">
                {/* cobalt rule wipes in on hover */}
                <span aria-hidden className="absolute left-0 top-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full" style={{ background: COBALT }} />
                <div className="flex items-center justify-between mb-5">
                  <Icon size={17} strokeWidth={1.6} style={{ color: COBALT_TX }} />
                  <span className="text-[11px] tabular-nums" style={{ fontFamily: MONO, color: 'rgba(243,242,236,0.32)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2.6rem, 5vw, 3.8rem)', color: INK, lineHeight: 1, marginBottom: '0.7rem' }}>
                  <CountUp to={s.to} />
                </p>
                <p className="text-[10.5px] uppercase tracking-[0.18em] mb-2.5" style={{ fontFamily: MONO, color: 'rgba(243,242,236,0.6)' }}>{s.label}</p>
                <p style={{ fontFamily: SANS, fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(243,242,236,0.42)' }}>{s.note}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const tHIW = useTranslations('home.howItWorks')
  const steps = [
    { number: '01', title: tHIW('step1Title'), desc: tHIW('step1Desc'), detail: tHIW('step1Detail') },
    { number: '02', title: tHIW('step2Title'), desc: tHIW('step2Desc'), detail: tHIW('step2Detail') },
    { number: '03', title: tHIW('step3Title'), desc: tHIW('step3Desc'), detail: tHIW('step3Detail') },
  ]
  const { ref, isInView } = useReveal()
  return (
    <section id="program" data-folio="02" style={{ background: PAPER }}>
      <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28">
        <motion.div ref={ref} variants={stagger(0.1)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>

          {/* Heading */}
          <motion.div variants={fadeUp} className="pb-12 max-w-3xl">
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2.1rem, 4vw, 3.4rem)', lineHeight: 1.04, letterSpacing: '-0.015em', color: INK, marginBottom: '1.1rem' }}>
              {tHIW('heading')}
            </h2>
            <p style={{ fontFamily: SANS, fontSize: '1.08rem', lineHeight: 1.6, color: INK_SOFT }}>
              {tHIW('sub')}
            </p>
          </motion.div>

          {/* Three movements — hairline-divided, numbered serif */}
          <div className="grid md:grid-cols-3" style={{ borderTop: `1px solid ${RULE}` }}>
            {steps.map((step) => (
              <motion.div key={step.number} variants={fadeUp}
                className="py-9 md:px-9 md:first:pl-0 border-[#D8D5C9] border-t first:border-t-0 md:border-t-0 md:border-l md:first:border-l-0">
                <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '2.6rem', lineHeight: 1, color: COBALT_TX, marginBottom: '1.1rem' }}>
                  {step.number}
                </div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '1.4rem', lineHeight: 1.15, color: INK, marginBottom: '0.6rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: SANS, fontSize: '0.95rem', lineHeight: 1.6, color: INK_SOFT }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="pt-12 flex items-center gap-6 flex-wrap" style={{ borderTop: `1px solid ${RULE}` }}>
            <Link href="/assessment"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-white transition-opacity hover:opacity-90"
              style={{ background: COBALT, borderRadius: 3, fontFamily: SANS, fontSize: '15.5px', fontWeight: 600, letterSpacing: '-0.01em' }}>
              {tHIW('cta')} <ArrowRight size={15} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Role Tracks ──────────────────────────────────────────────────────────────

const TRACKS = [
  { id: 'marketing',  icon: Megaphone,    label: 'Marketing',        color: '#2563EB', skills: ['AI copywriting', 'Campaign automation', 'Content strategy', 'Data analysis'] },
  { id: 'finance',    icon: LineChart,    label: 'Finance',          color: '#2563EB', skills: ['Financial modelling', 'Report generation', 'Risk analysis', 'Forecasting'] },
  { id: 'hr',         icon: HeartHandshake, label: 'HR & People',   color: '#2563EB', skills: ['Talent acquisition', 'L&D automation', 'HR analytics', 'Engagement'] },
  { id: 'sales',      icon: TrendingUp,   label: 'Sales',            color: '#2563EB', skills: ['Prospect research', 'Proposal writing', 'CRM automation', 'Pipeline AI'] },
  { id: 'operations', icon: Settings,     label: 'Operations',       color: '#2563EB', skills: ['Process automation', 'Decision support', 'Supply chain AI', 'Quality ops'] },
  { id: 'leadership', icon: Briefcase,    label: 'Leadership',       color: '#2563EB', skills: ['AI strategy', 'Change management', 'Team enablement', 'Executive decisions'] },
  { id: 'legal',      icon: Scale,        label: 'Legal',            color: '#2563EB', skills: ['Contract analysis', 'Legal research', 'Risk assessment', 'AI governance'] },
  { id: 'product',    icon: Package,      label: 'Product',          color: '#2563EB', skills: ['User research', 'Roadmap prioritisation', 'PRD writing', 'AI product strategy'] },
  { id: 'customer',   icon: Headphones,   label: 'Customer Success', color: '#2563EB', skills: ['Health monitoring', 'Churn prevention', 'Personalisation', 'CS operations'] },
  { id: 'consulting', icon: BarChart,     label: 'Consulting',       color: '#2563EB', skills: ['Research synthesis', 'Structured analysis', 'Slide writing', 'Client communication'] },
  { id: 'it',        icon: Zap,          label: 'IT & Technology',  color: '#2563EB', skills: ['AI scripting & automation', 'Cybersecurity with AI', 'IT operations', 'AI governance'] },
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
  const tTracks = useTranslations('home.tracks')

  return (
    <section id="tracks" data-folio="03" style={{ background: PAPER, borderTop: `1px solid ${RULE}` }}>
      <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
        <motion.div ref={ref} variants={stagger(0.08)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="pb-12 max-w-3xl">
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2.1rem, 4vw, 3.4rem)', lineHeight: 1.04, letterSpacing: '-0.015em', color: INK, marginBottom: '1.1rem' }}>
              {tTracks('heading')}
            </h2>
            <p style={{ fontFamily: SANS, fontSize: '1.08rem', lineHeight: 1.6, color: INK_SOFT }}>
              {tTracks('sub')}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid lg:grid-cols-[250px_1fr] items-start" style={{ borderTop: `1px solid ${RULE}` }}>
            {/* Role selector — editorial index */}
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible lg:border-r" style={{ borderColor: RULE }}>
              {TRACKS.map((t, i) => {
                const isActive = t.id === active
                return (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className="group flex items-baseline gap-3 px-4 py-3 text-left transition-colors flex-shrink-0 lg:w-full hover:bg-white/5"
                    style={{ background: isActive ? 'rgba(36,64,216,0.06)' : 'transparent', borderBottom: `1px solid ${RULE}` }}
                  >
                    <span className="text-[11px] tabular-nums" style={{ fontFamily: MONO, color: isActive ? COBALT : INK_FAINT }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="whitespace-nowrap" style={{ fontFamily: SERIF, fontSize: '1.08rem', color: isActive ? COBALT : INK }}>
                      {t.label}
                    </span>
                    {isActive && <ArrowRight size={13} className="ml-auto hidden lg:block self-center" style={{ color: COBALT_TX}} />}
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
                className="lg:pl-10 py-8"
              >
                <div className="mb-7">
                  <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)', lineHeight: 1.08, color: INK, maxWidth: '32rem' }}>
                    {preview.headline}
                  </h3>
                </div>

                {/* Modules — hairline columns */}
                <div className="grid sm:grid-cols-3" style={{ borderTop: `1px solid ${RULE}` }}>
                  {preview.modules.map((mod, mi) => (
                    <div key={mod.title} className="py-6 sm:pr-6 sm:pl-6 sm:first:pl-0 border-[#D8D5C9] border-t first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0">
                      <span className="text-[11px] tabular-nums" style={{ fontFamily: MONO, color: COBALT_TX}}>
                        {String(mi + 1).padStart(2, '0')}
                      </span>
                      <p style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '1.12rem', color: INK, margin: '0.4rem 0 0.9rem', lineHeight: 1.2 }}>
                        {mod.title}
                      </p>
                      <ul className="space-y-2">
                        {mod.lessons.map(lesson => (
                          <li key={lesson} style={{ fontFamily: SANS, fontSize: '0.86rem', lineHeight: 1.5, color: INK_SOFT }}>
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-7 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  style={{ borderTop: `1px solid ${RULE}` }}>
                  <p style={{ fontFamily: SANS, fontSize: '0.92rem', color: INK_SOFT }}>
                    {tTracks('notYourRole')}{' '}
                    <span style={{ color: INK, fontWeight: 600 }}>
                      {tTracks('assessmentTailors')}
                    </span>
                  </p>
                  <Link href="/assessment"
                    className="inline-flex items-center gap-2.5 px-5 py-3 text-white flex-shrink-0 transition-opacity hover:opacity-90"
                    style={{ background: COBALT, borderRadius: 3, fontFamily: SANS, fontSize: '14px', fontWeight: 600, letterSpacing: '-0.005em' }}>
                    {tTracks('getPath', { track: track.label })} <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Real product visual — grounds the "this is what you get" claim */}
          <motion.div variants={fadeUp} className="mt-16 grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-12 items-center">
            <ScreenFrame src="/landing/track.png" alt="An OpusLearn role track page showing modules, lessons, and a personalised sample"
              label="opuslearn.ai/tracks/marketing" />
            <div>
              <p style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '1.32rem', lineHeight: 1.28, color: INK, marginBottom: '0.9rem' }}>
                Every track opens with a sample, then rebuilds itself around your role.
              </p>
              <p style={{ fontFamily: SANS, fontSize: '0.95rem', lineHeight: 1.6, color: INK_SOFT }}>
                Module order, examples, and exercises shift with your seniority and goals — a Marketing Director and a Growth Manager get different versions of the same track.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: Brain, title: 'Adaptive AI personalisation', desc: 'Your path updates as you learn. The more you do, the more accurately it maps to where you are.', color: '#2563EB' },
  { icon: Target, title: 'Role-specific content', desc: 'Every lesson, exercise, and example is tailored to your job function — not recycled from a generic course.', color: '#2563EB' },
  { icon: Layers, title: 'Practical exercises', desc: 'Apply what you learn immediately. Every module ends with a real task using tools you already have access to.', color: '#2563EB' },
  { icon: BarChart3, title: 'Progress tracking', desc: "See exactly where you are, what you've mastered, and what comes next — with XP, streaks, and milestones.", color: '#2563EB' },
  { icon: Award, title: 'Verified certificates', desc: 'Earn credentials that signal AI literacy to your employer — tied to your specific role and track.', color: '#2563EB' },
  { icon: Users, title: 'Peer community', desc: 'Learn alongside professionals from your industry. Share wins, ask questions, and stay accountable together.', color: '#2563EB' },
]

function Features() {
  const { ref, isInView } = useReveal()
  const tFeatures = useTranslations('home.features')
  const accent = '#6E86F7'              // lighter cobalt for legibility on ink
  return (
    <section data-folio="04" className="relative overflow-hidden" style={{ background: PANEL }}>
      <AuroraGlow style={{ width: 700, height: 700, top: -260, left: '38%', opacity: 0.34 }} />
      <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28">
        <motion.div ref={ref} variants={stagger(0.07)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="pb-12 max-w-3xl">
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2.1rem, 4vw, 3.4rem)', lineHeight: 1.04, letterSpacing: '-0.015em', color: INK }}>
              {tFeatures('heading')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp}
                className="py-8 md:px-7 lg:px-8 border-[rgba(255,255,255,0.13)] border-t md:border-l md:[&:nth-child(3n+1)]:border-l-0">
                <span className="text-[12px] tabular-nums" style={{ fontFamily: MONO, color: accent }}>{String(i + 1).padStart(2, '0')}</span>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '1.32rem', lineHeight: 1.18, color: INK, margin: '0.5rem 0 0.6rem' }}>{f.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: '0.92rem', lineHeight: 1.6, color: 'rgba(243,242,236,0.55)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="pt-12">
            <Link href="/assessment"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 transition-opacity hover:opacity-90"
              style={{ background: LIGHT, color: PAPER, borderRadius: 3, fontFamily: SANS, fontSize: '15px', fontWeight: 600, letterSpacing: '-0.01em' }}>
              {tFeatures('cta')} <ArrowRight size={15} />
            </Link>
          </motion.div>
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
    <section data-folio="05" className="overflow-hidden" style={{ background: PAPER, borderTop: `1px solid ${RULE}` }}>
      <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
        <motion.div ref={ref} variants={stagger(0.09)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div>
              <motion.h2 variants={fadeUp} className="mb-5"
                style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2.1rem, 4vw, 3.4rem)', lineHeight: 1.04, letterSpacing: '-0.015em', color: INK }}>
                {tTeams('heading')}
              </motion.h2>
              <motion.p variants={fadeUp} className="mb-10"
                style={{ color: INK_SOFT, fontFamily: SANS, fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '34rem' }}>
                {tTeams('sub')}
              </motion.p>
              <div className="mb-10">
                {TEAM_FEATURES.map((f, i) => (
                  <motion.div key={f.label} variants={fadeUp} className="flex items-start gap-5 py-5"
                    style={{ borderTop: `1px solid ${RULE}` }}>
                    <span className="text-[12px] tabular-nums pt-1 flex-shrink-0" style={{ fontFamily: MONO, color: COBALT_TX}}>{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="mb-1" style={{ color: INK, fontFamily: SERIF, fontWeight: 500, fontSize: '1.18rem', lineHeight: 1.2 }}>{f.label}</p>
                      <p style={{ color: INK_SOFT, fontFamily: SANS, fontSize: '0.92rem', lineHeight: 1.55 }}>{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
                <Link href="/teams"
                  className="inline-flex items-center gap-2 px-6 py-3.5 transition-opacity hover:opacity-90"
                  style={{ background: COBALT, color: '#fff', borderRadius: 3, fontFamily: SANS, fontSize: '15px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                  {tTeams('seeTeamPlans')}
                </Link>
                <Link href="/dashboard/team/create"
                  className="inline-flex items-center gap-2 px-6 py-3.5 transition-colors hover:bg-white/5"
                  style={{ color: INK_SOFT, border: `1px solid ${RULE}`, background: 'transparent', borderRadius: 3, fontFamily: SANS, fontSize: '15px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                  {tTeams('createTeam')}
                </Link>
              </motion.div>
            </div>

            {/* Right: dashboard mockup */}
            <motion.div variants={fadeUp} className="relative">
              <div className="relative overflow-hidden"
                style={{ background: PAPER_2, border: `1px solid ${RULE}`, borderRadius: 6, boxShadow: '0 1px 0 rgba(0,0,0,0.02), 0 18px 50px -28px rgba(21,23,28,0.4)' }}>
                {/* Window chrome */}
                <div className="px-5 py-3.5 flex items-center gap-2" style={{ borderBottom: `1px solid ${RULE}`, background: PAPER }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
                  <div className="mx-3 flex-1 h-6 rounded flex items-center px-3 text-[11px]" style={{ background: PAPER_2, color: INK_FAINT, fontFamily: MONO }}>
                    opuslearn.ai/dashboard/team
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-5 space-y-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: 'Members', value: '24' },
                      { label: 'Total XP', value: '18.4k' },
                      { label: 'Lessons', value: '312' },
                      { label: 'Tracks done', value: '9' },
                    ].map(s => (
                      <div key={s.label} className="p-3" style={{ background: PAPER, border: `1px solid ${RULE}`, borderRadius: 4 }}>
                        <p className="mb-0.5" style={{ color: INK, fontFamily: SERIF, fontWeight: 600, fontSize: '1.35rem', lineHeight: 1 }}>{s.value}</p>
                        <p className="text-[9.5px] uppercase tracking-[0.1em]" style={{ color: INK_FAINT, fontFamily: MONO }}>{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Leaderboard */}
                  <div className="overflow-hidden" style={{ border: `1px solid ${RULE}`, borderRadius: 4 }}>
                    <div className="px-4 py-2.5 flex items-center gap-2" style={{ borderBottom: `1px solid ${RULE}`, background: PAPER }}>
                      <span className="text-[9.5px] uppercase tracking-[0.16em]" style={{ color: COBALT_TX, fontFamily: MONO }}>Leaderboard</span>
                    </div>
                    <div>
                      {[
                        { name: 'Sophie A.', xp: 1840, pct: 100, medal: '01' },
                        { name: 'James W.', xp: 1610, pct: 87, medal: '02' },
                        { name: 'Priya N.', xp: 1390, pct: 75, medal: '03' },
                        { name: 'Marcus R.', xp: 1140, pct: 62, medal: '04' },
                      ].map((m, i) => (
                        <div key={m.name} className="flex items-center gap-3 px-4 py-3" style={{ borderTop: i === 0 ? 'none' : `1px solid ${RULE}` }}>
                          <span className="w-5 text-[10px] tabular-nums flex-shrink-0" style={{ color: i === 0 ? COBALT : INK_FAINT, fontFamily: MONO }}>{m.medal}</span>
                          <div className="w-7 h-7 flex items-center justify-center text-[10px] flex-shrink-0"
                            style={{ background: i === 0 ? COBALT : PAPER_2, color: i === 0 ? '#fff' : INK_SOFT, fontFamily: MONO, borderRadius: 3 }}>
                            {m.name.slice(0, 2)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-xs truncate" style={{ color: INK, fontFamily: SANS, fontWeight: 600 }}>{m.name}</p>
                              <p className="text-[11px] ml-2 flex-shrink-0 tabular-nums" style={{ color: INK_SOFT, fontFamily: MONO }}>{m.xp.toLocaleString()} XP</p>
                            </div>
                            <div className="h-1 rounded-full" style={{ background: PAPER_2 }}>
                              <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: COBALT }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Track pills */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Marketing', pct: 83 },
                      { label: 'Finance', pct: 67 },
                      { label: 'Sales', pct: 50 },
                      { label: 'HR', pct: 100 },
                    ].map(t => (
                      <div key={t.label} className="flex items-center gap-1.5 px-3 py-1.5 text-[11px]"
                        style={{ background: PAPER, color: INK_SOFT, border: `1px solid ${RULE}`, borderRadius: 3, fontFamily: SANS, fontWeight: 600 }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: COBALT }} />
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
                className="absolute -bottom-4 -left-6 hidden sm:flex items-center gap-2.5 px-4 py-2.5"
                style={{ background: PANEL, borderRadius: 5, boxShadow: '0 14px 40px -18px rgba(21,23,28,0.6)' }}>
                <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: '#6E86F7', fontFamily: MONO }}>Live</span>
                <div>
                  <p className="text-xs" style={{ color: INK, fontFamily: SANS, fontWeight: 600 }}>HR track complete</p>
                  <p className="text-[10px]" style={{ color: 'rgba(243,242,236,0.5)', fontFamily: SANS }}>Priya N. just finished</p>
                </div>
              </motion.div>
            </motion.div>
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
    <section data-folio="07" style={{ background: PANEL }}>
      <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
        <motion.div ref={ref} variants={stagger(0.06)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.h2 variants={fadeUp} className="mb-14 max-w-2xl"
            style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.05, letterSpacing: '-0.015em', color: INK }}>
            {tFAQ('heading')}
          </motion.h2>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.13)' }}>
            {FAQS.map((faq, i) => {
              const isOpen = open === i
              return (
                <motion.div key={i} variants={fadeUp} style={{ borderBottom: '1px solid rgba(255,255,255,0.13)' }}>
                  <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-start justify-between gap-5 py-6 text-left">
                    <div className="flex items-start gap-5 min-w-0">
                      <span className="text-[12px] tabular-nums pt-1.5 flex-shrink-0"
                        style={{ fontFamily: MONO, color: isOpen ? '#6E86F7' : 'rgba(243,242,236,0.32)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '1.3rem', lineHeight: 1.25, color: isOpen ? PAPER : 'rgba(243,242,236,0.78)' }}>
                        {faq.q}
                      </span>
                    </div>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.18 }}
                      className="flex-shrink-0 pt-1 leading-none"
                      style={{ fontSize: '1.5rem', color: isOpen ? '#6E86F7' : 'rgba(243,242,236,0.4)', fontWeight: 300, fontFamily: SANS }}>+</motion.span>
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
                        <p className="pb-7" style={{ color: 'rgba(243,242,236,0.55)', fontFamily: SANS, fontSize: '0.98rem', lineHeight: 1.65, paddingLeft: '2.6rem', maxWidth: '38rem' }}>
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
    <section id="pricing" data-folio="06" style={{ background: PAPER, borderTop: `1px solid ${RULE}` }}>
      <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
        <motion.div ref={ref} variants={stagger(0.09)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="mb-8" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2.1rem, 4vw, 3.4rem)', lineHeight: 1.05, letterSpacing: '-0.015em', color: INK }}>
              {tHomePricing('heading')}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="text-sm" style={{ color: annual ? INK_FAINT : INK, fontFamily: SANS, fontWeight: 500 }}>{tHomePricing('monthly')}</span>
              <button onClick={() => setAnnual(!annual)}
                className="w-11 h-6 rounded-full relative transition-colors"
                style={{ background: annual ? COBALT : 'rgba(255,255,255,0.16)' }}>
                <motion.div animate={{ x: annual ? 23 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-5 h-5 rounded-full absolute top-0.5" style={{ background: LIGHT }} />
              </button>
              <span className="text-sm" style={{ color: annual ? INK : INK_FAINT, fontFamily: SANS, fontWeight: 500 }}>
                {tHomePricing('annual')} <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-[0.1em] ml-1"
                  style={{ background: 'transparent', border: `1px solid ${COBALT}`, color: COBALT_TX, fontFamily: MONO, borderRadius: 2 }}>{tHomePricing('annualDiscount')}</span>
              </span>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {plans.map(plan => (
              <motion.div key={plan.name} variants={fadeUp} className={`relative overflow-hidden${plan.highlight ? ' sm:col-span-2 lg:col-span-1' : ''}`}
                style={plan.highlight
                  ? { background: COBALT, borderRadius: 6, boxShadow: '0 24px 56px -28px rgba(36,64,216,0.6)' }
                  : { background: PAPER_2, border: `1px solid ${RULE}`, borderRadius: 6 }}>
                {plan.highlight && (
                  <>
                    {/* Decorative rings */}
                    <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
                      style={{ border: '1px solid rgba(255,255,255,0.12)' }} />
                    <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none"
                      style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
                  </>
                )}
                <div className="p-8">
                  <p className="text-[11px] uppercase tracking-[0.18em] mb-3"
                    style={{ color: plan.highlight ? 'rgba(255,255,255,0.6)' : INK_FAINT, fontFamily: MONO }}>
                    {plan.name}
                  </p>
                  {plan.highlight ? (
                    <div className="mb-1">
                      <div className="flex items-start gap-0.5">
                        <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: isUAE ? '1rem' : '1.4rem', lineHeight: 1, marginTop: '0.55rem', color: '#FFFFFF' }}>{isUAE ? 'AED' : '$'}</span>
                        <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: '3.5rem', lineHeight: 1, color: '#FFFFFF' }}>0</span>
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: SANS, alignSelf: 'flex-end', marginBottom: '0.3rem', marginLeft: '4px' }}>{tHomePricing('perSeatMo')}</span>
                      </div>
                      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: SANS }}>
                        <span style={{ textDecoration: 'line-through' }}>{isUAE ? 'AED 45.99/mo' : '$12.99/mo'}</span>{' '}normally
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
                              <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: '2.5rem', lineHeight: 1, color: INK }}>Custom</span>
                            </div>
                          )
                        }
                        const [intPart, decPart] = raw.includes('.') ? raw.split('.') : [raw, null]
                        return (
                          <div className="flex items-start gap-0.5 mb-1">
                            <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: isUAE ? '1rem' : '1.4rem', lineHeight: 1, marginTop: '0.55rem', color: INK }}>{isUAE ? 'AED' : '$'}</span>
                            <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: '3.25rem', lineHeight: 1, color: INK }}>{intPart}</span>
                            {decPart && (
                              <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: '1.4rem', lineHeight: 1, marginTop: '0.55rem', color: INK_SOFT }}>.{decPart}</span>
                            )}
                            <span className="text-sm" style={{ color: INK_FAINT, fontFamily: SANS, alignSelf: 'flex-end', marginBottom: '0.3rem', marginLeft: '4px' }}>{tHomePricing('perSeatMo')}</span>
                          </div>
                        )
                      })()}
                    </>
                  )}
                  <p className="text-sm mb-7" style={{ color: plan.highlight ? 'rgba(255,255,255,0.6)' : INK_SOFT, fontFamily: SANS, lineHeight: 1.5 }}>
                    {plan.highlight ? 'Free for everyone during launch — no card needed' : plan.desc}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map(feat => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm"
                        style={{ color: plan.highlight ? 'rgba(255,255,255,0.88)' : INK_SOFT, fontFamily: SANS, lineHeight: 1.45 }}>
                        <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: plan.highlight ? 'rgba(255,255,255,0.9)' : COBALT_TX }} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  {plan.name === 'Team' ? (
                    <Link href="/teams/demo"
                      className="flex items-center justify-center w-full py-3.5 text-sm transition-colors hover:bg-white/5"
                      style={{ background: 'transparent', color: INK, border: `1px solid ${RULE}`, fontFamily: SANS, fontWeight: 600, borderRadius: 3 }}>
                      {plan.cta}
                    </Link>
                  ) : plan.highlight ? (
                    user ? (
                      <Link href="/dashboard"
                        className="flex items-center justify-center w-full py-3.5 text-sm transition-opacity hover:opacity-90"
                        style={{ background: LIGHT, color: COBALT, fontFamily: SANS, fontWeight: 600, borderRadius: 3 }}>
                        Go to Dashboard
                      </Link>
                    ) : (
                      <button
                        onClick={() => openSignUp()}
                        className="flex items-center justify-center w-full py-3.5 text-sm transition-opacity hover:opacity-90"
                        style={{ background: LIGHT, color: COBALT, fontFamily: SANS, fontWeight: 600, borderRadius: 3, border: 'none', cursor: 'pointer' }}>
                        Get started free
                      </button>
                    )
                  ) : (
                    <Link href="/assessment"
                      className="flex items-center justify-center w-full py-3.5 text-sm transition-colors hover:bg-white/5"
                      style={{ background: 'transparent', border: `1px solid ${RULE}`, color: INK_SOFT, fontFamily: SANS, fontWeight: 600, borderRadius: 3 }}>
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


  const stats = [
    { value: '11', label: 'Role-specific tracks' },
    { value: '286', label: 'Hands-on lessons' },
    { value: '14', label: 'Languages supported' },
    { value: '100%', label: 'Lessons with hands-on practice' },
  ]

  const values = [
    {
      num: '01', bg: '#DBEAFE', color: '#2563EB',
      title: 'Role-first, always',
      desc: 'Generic AI training fails because it ignores context. We build every lesson around a specific role, with examples and exercises drawn directly from that world.',
    },
    {
      num: '02', bg: '#DBEAFE', color: '#2563EB',
      title: 'Practical over theoretical',
      desc: 'Every module ends with something you can apply today — not a quiz about definitions, but a real output you produce using tools you already have.',
    },
    {
      num: '03', bg: '#DBEAFE', color: '#2563EB',
      title: 'No code, no compromise',
      desc: 'We prove that the highest-leverage AI skills for business professionals have nothing to do with Python. Fluency starts with understanding, not syntax.',
    },
  ]

  return (
    <section id="about" data-folio="08" style={{ background: PAPER, borderTop: `1px solid ${RULE}` }}>
      <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28">
        <motion.div ref={ref} variants={stagger(0.09)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={fadeUp} className="max-w-3xl mb-16">
            <h2 className="mb-5" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2.1rem, 4vw, 3.4rem)', lineHeight: 1.05, letterSpacing: '-0.015em', color: INK }}>
              {tAbout('heading')}
            </h2>
            <p style={{ color: INK_SOFT, fontFamily: SANS, fontSize: '1.1rem', lineHeight: 1.6 }}>
              {tAbout('sub')}
            </p>
          </motion.div>

          {/* Human spread — real people, editorial duotone treatment */}
          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4 mb-16">
            <EditorialPhoto src="/landing/stock/team.jpg" aspect="16 / 11"
              alt="A team working together on laptops around a table"
              caption="The professionals AI is reshaping fastest never wrote a line of code." />
            <EditorialPhoto src="/landing/stock/professional.jpg" aspect="16 / 11"
              alt="Two colleagues celebrating a win at their desk"
              caption="Real output on day one — applied to the work already on your desk." />
          </motion.div>

          {/* Quote + Stats */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16 items-stretch">
            <motion.div variants={fadeUp} className="relative overflow-hidden p-10 flex flex-col justify-center"
              style={{ background: PANEL, borderRadius: 6 }}>
              <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '3.5rem', lineHeight: 0.6, color: '#6E86F7', display: 'block', marginBottom: '1rem' }}>&ldquo;</span>
              <blockquote style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)', lineHeight: 1.32, color: INK, marginBottom: '1.75rem', letterSpacing: '-0.01em' }}>
                Every professional deserves to harness AI &mdash; not just those with an engineering degree. We built the platform we wished existed when AI changed everything.
              </blockquote>
              <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: 'rgba(243,242,236,0.45)', fontFamily: MONO }}>
                The OpusLearn team
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {stats.map(s => (
                <div key={s.label} className="p-6 flex flex-col justify-center"
                  style={{ background: PAPER_2, border: `1px solid ${RULE}`, borderRadius: 5 }}>
                  <p className="mb-1.5" style={{ color: INK, fontFamily: SERIF, fontWeight: 600, fontSize: '2.4rem', lineHeight: 1 }}>{s.value}</p>
                  <p className="text-[10.5px] uppercase tracking-[0.12em]" style={{ color: INK_FAINT, fontFamily: MONO, lineHeight: 1.4 }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Values */}
          <motion.div variants={fadeUp} className="grid md:grid-cols-3" style={{ borderTop: `1px solid ${RULE}` }}>
            {values.map((v) => (
              <div key={v.title}
                className="py-9 md:px-8 border-[#D8D5C9] border-t first:border-t-0 md:border-t-0 md:border-l md:first:border-l-0">
                <span className="text-[12px] tabular-nums" style={{ color: COBALT_TX, fontFamily: MONO }}>{v.num}</span>
                <h3 className="mb-2 mt-3" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '1.32rem', lineHeight: 1.2, color: INK }}>{v.title}</h3>
                <p style={{ color: INK_SOFT, fontFamily: SANS, fontSize: '0.92rem', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
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
    <section className="relative overflow-hidden" style={{ background: PANEL }}>
      {/* Hairline cobalt rule */}
      <div style={{ height: 3, background: COBALT }} />
      <AuroraGlow style={{ width: 820, height: 820, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.4 }} />

      {/* Decorative giant serif text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(9rem, 28vw, 26rem)', color: 'rgba(255,255,255,0.028)', lineHeight: 1, whiteSpace: 'nowrap' }}>
          Opus
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24 sm:py-32 text-center relative">
        <motion.div ref={ref} variants={stagger(0.12)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.h2 variants={fadeUp}
            style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2.6rem, 7vw, 4.6rem)', lineHeight: 1.04, letterSpacing: '-0.02em', color: INK, marginBottom: '1.5rem' }}>
            Start leading <em style={{ fontStyle: 'italic', color: '#6E86F7' }}>{tFinalCTA('headingAccent')}</em>
          </motion.h2>
          <motion.p variants={fadeUp}
            style={{ fontFamily: SANS, fontSize: '1.125rem', color: 'rgba(243,242,236,0.55)', marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: '34rem', marginInline: 'auto' }}>
            {tFinalCTA('sub')}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/assessment"
              className="inline-flex items-center justify-center gap-2.5 transition-opacity hover:opacity-90"
              style={{ background: COBALT, color: '#fff', fontSize: '15.5px', fontFamily: SANS, fontWeight: 600, letterSpacing: '-0.01em', padding: '1rem 2rem', borderRadius: 3 }}>
              {tFinalCTA('cta')} <ArrowRight size={16} />
            </Link>
            <Link href="/tracks"
              className="inline-flex items-center justify-center gap-2 transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(243,242,236,0.7)', fontSize: '15.5px', fontFamily: SANS, fontWeight: 600, letterSpacing: '-0.01em', padding: '1rem 2rem', borderRadius: 3 }}>
              {tFinalCTA('browseAllTracks')}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const tFooter = useTranslations('home.footer')
  return (
    <footer style={{ background: PANEL }}>
      {/* Brand statement band */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          <div>
            <span className="block mb-4" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '1.7rem', letterSpacing: '-0.01em', color: INK }}>OpusLearn</span>
            <p style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: 'rgba(243,242,236,0.85)', maxWidth: '30rem', lineHeight: 1.22, letterSpacing: '-0.01em' }}>
              {tFooter('aiTrainingTagline')}
            </p>
          </div>
          <Link href="/assessment"
            className="flex items-center gap-2 px-6 py-3.5 text-sm flex-shrink-0 transition-opacity hover:opacity-90"
            style={{ background: LIGHT, color: PAPER, borderRadius: 3, fontFamily: SANS, fontWeight: 600, letterSpacing: '-0.01em' }}>
            {tFooter('startForFree')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.2em] mb-4" style={{ color: '#6E86F7', fontFamily: MONO }}>{tFooter('thePlatform')}</p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(243,242,236,0.5)', fontFamily: SANS }}>
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
              <p className="text-[10.5px] uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(243,242,236,0.4)', fontFamily: MONO }}>{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm transition-colors"
                      style={{ color: 'rgba(243,242,236,0.6)', fontFamily: SANS }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: 'rgba(243,242,236,0.35)', fontFamily: MONO }}>© 2026 OpusLearn · {tFooter('rights')}</p>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: COBALT }} />
          <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: 'rgba(243,242,236,0.35)', fontFamily: MONO }}>{tFooter('tagline2')}</p>
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
    <main style={{ background: PAPER, color: INK, minHeight: '100vh' }}>
      <GrainOverlay />
      <StickySignUpBar />
      <Navbar />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <RoleTracks />
      <Features />
      <TeamsSection />
      <Pricing />
      <FAQ />
      <About />
      <FinalCTA />
      <Footer />
    </main>
  )
}
