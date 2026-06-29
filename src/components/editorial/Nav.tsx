'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Search, Zap, BookOpen, LogOut, ArrowRight, Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Logo from '@/components/Logo'
import GlobalSearch from '@/components/GlobalSearch'
import { useAuth } from '@/context/AuthContext'
import { PAPER, PAPER_2, INK, INK_SOFT, INK_FAINT, COBALT, SANS, RULE } from './theme'

type NavId = 'program' | 'tracks' | 'teams' | 'pricing' | 'blog'

// The editorial marketing navbar, shared across landing + secondary pages.
// `active` highlights the current tab in ink; everything else matches the landing
// exactly (scroll-solid background, ⌘K search, auth avatar dropdown, mobile menu).
export default function EditorialNav({ active }: { active?: NavId }) {
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

  // On a secondary page the brand/in-page anchors must point back to the landing.
  const navItems: { id: NavId; label: string; href: string }[] = [
    { id: 'program', label: tNav('program'), href: '/#program' },
    { id: 'tracks', label: tNav('tracks'), href: '/tracks' },
    { id: 'teams', label: tNav('forTeams'), href: '/teams' },
    { id: 'pricing', label: tNav('pricing'), href: '/pricing' },
    { id: 'blog', label: 'Blog', href: '/blog' },
  ]

  return (
    <>
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-200"
      style={{
        background: solidBg ? 'rgba(251,250,246,0.86)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px) saturate(1.1)' : 'none',
        borderBottom: solidBg ? `1px solid ${RULE}` : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo size="md" color="dark" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => {
            const isActive = active === item.id
            const cls = 'text-sm transition-opacity hover:opacity-60'
            const st = { color: isActive ? INK : INK_SOFT, fontFamily: SANS, fontWeight: isActive ? 600 : 500 } as const
            return item.href.startsWith('/') ? (
              <Link key={item.id} href={item.href} className={cls} style={st}>{item.label}</Link>
            ) : (
              <a key={item.id} href={item.href} className={cls} style={st}>{item.label}</a>
            )
          })}
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
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl transition-colors hover:bg-black/5">
                    <div className="w-8 h-8 flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: COBALT, fontFamily: SANS, borderRadius: 3 }}>
                      {initials}
                    </div>
                    <span className="text-sm font-medium" style={{ color: INK, fontFamily: SANS }}>
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
                        style={{ background: PAPER_2, border: `1px solid ${RULE}`, boxShadow: '0 16px 40px rgba(26,27,31,0.16)' }}
                      >
                        <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.10)' }}>
                          <p className="text-xs font-medium truncate" style={{ color: INK_FAINT, fontFamily: SANS }}>
                            {user.email}
                          </p>
                        </div>
                        <div className="p-1.5">
                          <Link href="/dashboard" onClick={() => setAvatarOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-black/5"
                            style={{ color: INK_SOFT, fontFamily: SANS }}>
                            <Zap size={14} /> {tNav('dashboard')}
                          </Link>
                          <Link href="/tracks" onClick={() => setAvatarOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-black/5"
                            style={{ color: INK_SOFT, fontFamily: SANS }}>
                            <BookOpen size={14} /> {tNav('allTracks')}
                          </Link>
                          <button onClick={() => { signOut(); setAvatarOpen(false) }}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-red-50 hover:text-red-600"
                            style={{ color: INK_FAINT, fontFamily: SANS }}>
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
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-black/5"
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
                {navItems.map(item => (
                  <a key={item.id}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center py-3.5 text-sm font-medium border-b transition-colors hover:text-blue-600"
                    style={{ color: active === item.id ? INK : INK_SOFT, fontFamily: SANS, fontWeight: active === item.id ? 600 : 500, borderColor: 'rgba(0,0,0,0.10)' }}>
                    {item.label}
                  </a>
                ))}
              </div>
              {!loading && (
                <div className="pt-4 space-y-2" style={{ borderTop: '1px solid rgba(0,0,0,0.12)' }}>
                  {user ? (
                    <>
                      <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 py-3 px-4 rounded-xl text-sm font-medium w-full transition-colors hover:bg-black/5"
                        style={{ color: INK_SOFT, fontFamily: SANS }}>
                        <Zap size={14} /> {tNav('dashboard')}
                      </Link>
                      <button onClick={() => { signOut(); setMobileOpen(false) }}
                        className="flex items-center gap-2 py-3 px-4 rounded-xl text-sm w-full transition-colors hover:bg-red-50 hover:text-red-600"
                        style={{ color: INK_FAINT, fontFamily: SANS }}>
                        <LogOut size={14} /> {tNav('signOut')}
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { openSignIn(); setMobileOpen(false) }}
                        className="w-full py-3 text-sm font-medium rounded-xl transition-colors hover:bg-black/5"
                        style={{ color: INK_SOFT, fontFamily: SANS, border: '1px solid rgba(0,0,0,0.12)' }}>
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
