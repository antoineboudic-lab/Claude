'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, BookOpen, ArrowLeft } from 'lucide-react'
import Logo from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'
import { PAPER, INK, INK_SOFT, INK_FAINT, COBALT, COBALT_TX, RULE, SANS } from '@/components/editorial/theme'

export default function BlogNav({ backToPost = false }: { backToPost?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, openSignIn, signOut } = useAuth()

  return (
    <div className="sticky top-0 z-40" style={{ background: 'rgba(251,250,246,0.85)', backdropFilter: 'blur(12px)' }}>
      <nav className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: mobileOpen ? 'none' : `1px solid ${RULE}` }}>
        <Link href="/" className="flex items-center gap-2">
          <Logo size="md" />
        </Link>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          {backToPost ? (
            <Link href="/blog" className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70" style={{ color: INK_SOFT, fontFamily: SANS }}>
              <ArrowLeft size={13} /> Blog
            </Link>
          ) : (
            <Link href="/tracks" className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70" style={{ color: INK_SOFT, fontFamily: SANS }}>
              <BookOpen size={14} /> All tracks
            </Link>
          )}
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: INK_SOFT, fontFamily: SANS }}>
                Dashboard
              </Link>
              <button onClick={signOut} className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: INK_FAINT, fontFamily: SANS }}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <button onClick={openSignIn} className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: INK_SOFT, fontFamily: SANS }}>
                Sign in
              </button>
              <Link href="/assessment" className="px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: COBALT, borderRadius: 3, fontFamily: SANS }}>
                Get started free
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-black/[0.04]"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
          style={{ color: INK }}
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
            style={{ background: PAPER, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}
          >
            <div className="px-6 pb-5 pt-2 space-y-0.5">
              {backToPost ? (
                <Link href="/blog" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-3 text-sm font-medium border-b transition-opacity hover:opacity-70" style={{ color: INK_SOFT, fontFamily: SANS, borderColor: RULE }}>
                  <ArrowLeft size={15} /> Back to blog
                </Link>
              ) : (
                <Link href="/tracks" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-3 text-sm font-medium border-b transition-opacity hover:opacity-70" style={{ color: INK_SOFT, fontFamily: SANS, borderColor: RULE }}>
                  <BookOpen size={15} /> All tracks
                </Link>
              )}
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-3 text-sm font-medium border-b transition-opacity hover:opacity-70" style={{ color: INK_SOFT, fontFamily: SANS, borderColor: RULE }}>
                    Dashboard
                  </Link>
                  <button onClick={() => { signOut(); setMobileOpen(false) }} className="w-full flex items-center gap-3 py-3 text-sm font-medium transition-opacity hover:opacity-70" style={{ color: INK_FAINT, fontFamily: SANS }}>
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { openSignIn(); setMobileOpen(false) }} className="w-full flex items-center gap-3 py-3 text-sm font-medium border-b transition-opacity hover:opacity-70" style={{ color: INK_SOFT, fontFamily: SANS, borderColor: RULE }}>
                    Sign in
                  </button>
                  <Link href="/assessment" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-3 text-sm font-semibold transition-opacity hover:opacity-70" style={{ color: COBALT_TX, fontFamily: SANS }}>
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
