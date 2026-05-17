import Link from 'next/link'
import { Zap, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main style={{ background: '#F8FAFC', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}
      className="flex flex-col items-center justify-center px-6 text-center">
      <Link href="/" className="flex items-center gap-2 mb-12">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#7C3AED' }}>
          <Zap size={13} className="text-white" />
        </div>
        <span className="font-black text-base" style={{ color: '#0F172A' }}>AI Literacy</span>
      </Link>

      <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#7C3AED' }}>404</p>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4" style={{ color: '#0F172A' }}>
        Page not found
      </h1>
      <p className="text-lg mb-10 max-w-sm" style={{ color: '#64748B' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
          style={{ background: '#7C3AED' }}>
          <ArrowLeft size={15} /> Back to home
        </Link>
        <Link href="/tracks"
          className="px-6 py-3 rounded-xl text-sm font-semibold"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#475569' }}>
          Browse tracks
        </Link>
      </div>
    </main>
  )
}
