'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import Logo from '@/components/Logo'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main
      style={{ background: '#EFF6FF', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}
      className="flex flex-col items-center justify-center px-6 text-center"
    >
      <Link href="/" className="flex items-center gap-2 mb-12">
        <Logo size="md" />
      </Link>

      <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#2563EB' }}>
        Something went wrong
      </p>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4" style={{ color: '#0F172A' }}>
        Unexpected error
      </h1>
      <p className="text-lg mb-10 max-w-sm" style={{ color: '#64748B' }}>
        Something went wrong on our end. Try refreshing — if the problem persists, contact support.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
          style={{ background: '#2563EB' }}
        >
          <RefreshCw size={15} /> Try again
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#475569' }}
        >
          <ArrowLeft size={15} /> Back to home
        </Link>
      </div>
    </main>
  )
}
