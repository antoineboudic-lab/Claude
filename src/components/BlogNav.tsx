'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, BookOpen, ArrowLeft } from 'lucide-react'
import Logo from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'

export default function BlogNav({ backToPost = false }: { backToPost?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, openSignIn, signOut } = useAuth()

  return (
    <div className="sticky top-0 z-40" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)' }}>
      <nav className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: mobileOpen ? 'none' : '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <Logo size="md" />
        </Link>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          {backToPost ? (
            <Link href="/blog" className="flex items-center gap-1.5 text-sm transition-colors hover:text-slate-900" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              <ArrowLeft size={13} /> Blog
            </Link>
          ) : (
            <Link href="/tracks" className="flex items-center gap-1.5 text-sm transition-colors hover:text-slate-900" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              <BookOpen size={14} /> All tracks
            </Link>
          )}
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-slate-900" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                Dashboard
              </Link>
              <button onClick={signOut} className="text-sm font-medium transition-colors hover:text-slate-900" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <button onClick={openSignIn} className="text-sm font-medium transition-colors hover:text-slate-900" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                Sign in
              </button>
              <Link href="/assessment" className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: '#2563EB', fontFamily: 'var(--font-sans)' }}>
                Get started free
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-slate-100"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
          style={{ color: '#475569' }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="blog-mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}
          >
            <div className="px-6 pb-5 pt-2 space-y-0.5">
              {backToPost ? (
                <Link href="/blog" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-3 text-sm font-medium border-b transition-colors hover:text-blue-600" style={{ color: '#475569', fontFamily: 'var(--font-sans)', borderColor: '#F1F5F9' }}>
                  <ArrowLeft size={15} /> Back to blog
                </Link>
              ) : (
                <Link href="/tracks" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-3 text-sm font-medium border-b transition-colors hover:text-blue-600" style={{ color: '#475569', fontFamily: 'var(--font-sans)', borderColor: '#F1F5F9' }}>
                  <BookOpen size={15} /> All tracks
                </Link>
              )}
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-3 text-sm font-medium border-b transition-colors hover:text-blue-600" style={{ color: '#475569', fontFamily: 'var(--font-sans)', borderColor: '#F1F5F9' }}>
                    Dashboard
                  </Link>
                  <button onClick={() => { signOut(); setMobileOpen(false) }} className="w-full flex items-center gap-3 py-3 text-sm font-medium transition-colors hover:text-red-500" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { openSignIn(); setMobileOpen(false) }} className="w-full flex items-center gap-3 py-3 text-sm font-medium border-b transition-colors hover:text-blue-600" style={{ color: '#475569', fontFamily: 'var(--font-sans)', borderColor: '#F1F5F9' }}>
                    Sign in
                  </button>
                  <Link href="/assessment" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-3 text-sm font-semibold transition-colors" style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>
                    Get started free →
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
