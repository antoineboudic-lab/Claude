'use client'

import { Suspense, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Logo from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'
import { loadLatestAssessment } from '@/lib/supabase/db'

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
    <main className="min-h-screen flex flex-col items-center justify-center gap-5"
      style={{ background: 'linear-gradient(180deg, #F8FAFF 0%, #EFF6FF 100%)', fontFamily: 'var(--font-sans)' }}>
      <Logo size="lg" />
      <div className="flex items-center gap-2 text-sm" style={{ color: '#64748B' }}>
        <motion.span
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex">
          <Sparkles size={15} style={{ color: '#2563EB' }} />
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
