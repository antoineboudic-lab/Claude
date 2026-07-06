'use client'

import { Suspense, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Logo from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'
import { loadLatestAssessment } from '@/lib/supabase/db'
import { GrainOverlay } from '@/components/editorial/Atmosphere'
import { PAPER, INK_SOFT, COBALT, SANS } from '@/components/editorial/theme'

// Smart entry point for the assessment. The conversational chat is the default
// experience; returning users with a completed assessment skip to their
// results; the classic form lives at /assessment/form as a fallback.
function AssessmentRouter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading } = useAuth()
  const routed = useRef(false)

  useEffect(() => {
    if (loading || routed.current) return
    routed.current = true

    // Deliberate retake (from the results page) — start a fresh chat,
    // skipping the completed-assessment guard.
    if (searchParams.get('retake') === '1') {
      router.replace('/assessment/chat')
      return
    }

    let cancelled = false
    async function route() {
      try {
        if (localStorage.getItem('opuslearn-assessment')) {
          router.replace('/assessment/results')
          return
        }
        if (user) {
          const remote = await loadLatestAssessment(user.id)
          if (remote && !cancelled) {
            localStorage.setItem('opuslearn-assessment', JSON.stringify(remote))
            router.replace('/assessment/results')
            return
          }
        }
      } catch { /* fall through to the chat */ }
      if (!cancelled) router.replace('/assessment/chat')
    }
    route()
    return () => { cancelled = true }
  }, [user, loading, router, searchParams])

  return <AssessmentSplash />
}

function AssessmentSplash() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center gap-5"
      style={{ background: PAPER, fontFamily: SANS }}>
      <GrainOverlay />
      <Logo size="lg" />
      <div className="flex items-center gap-2 text-sm" style={{ color: INK_SOFT }}>
        <motion.span
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex">
          <Sparkles size={15} style={{ color: COBALT }} />
        </motion.span>
        Setting up your assessment…
      </div>
    </main>
  )
}

export default function AssessmentEntry() {
  return (
    <Suspense fallback={<AssessmentSplash />}>
      <AssessmentRouter />
    </Suspense>
  )
}
