'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle2, AlertCircle, Zap } from 'lucide-react'
import Logo from '@/components/Logo'

function UnsubscribeContent() {
  const params = useSearchParams()
  const done = params.get('done') === '1'
  const error = params.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#EFF6FF', fontFamily: 'var(--font-sans)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Logo size="md" />
        </div>

        <div className="rounded-2xl p-8 text-center"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

          {done ? (
            <>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: '#F0FDF4' }}>
                <CheckCircle2 size={26} style={{ color: '#10B981' }} />
              </div>
              <h1 className="text-2xl font-black mb-2" style={{ color: '#0F172A' }}>
                You're unsubscribed
              </h1>
              <p className="text-sm leading-relaxed mb-7" style={{ color: '#64748B' }}>
                You won't receive weekly digest emails anymore. Your account and all your progress are still safe.
              </p>
              <p className="text-xs mb-6" style={{ color: '#94A3B8' }}>
                Changed your mind? You can re-enable weekly digests in{' '}
                <Link href="/dashboard/settings" className="underline hover:text-slate-600 transition-colors" style={{ color: '#2563EB' }}>
                  Settings → Preferences
                </Link>.
              </p>
              <Link href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: '#2563EB', boxShadow: '0 4px 14px rgba(37,99,235,0.2)' }}>
                Go to my dashboard
              </Link>
            </>
          ) : error ? (
            <>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: '#FEF2F2' }}>
                <AlertCircle size={26} style={{ color: '#EF4444' }} />
              </div>
              <h1 className="text-2xl font-black mb-2" style={{ color: '#0F172A' }}>
                Link invalid or expired
              </h1>
              <p className="text-sm leading-relaxed mb-7" style={{ color: '#64748B' }}>
                This unsubscribe link didn't work. You can manage email preferences directly from your settings.
              </p>
              <Link href="/dashboard/settings"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: '#2563EB', boxShadow: '0 4px 14px rgba(37,99,235,0.2)' }}>
                Go to Settings
              </Link>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: '#EFF6FF' }}>
                <Zap size={26} style={{ color: '#2563EB' }} />
              </div>
              <h1 className="text-2xl font-black mb-2" style={{ color: '#0F172A' }}>
                Manage email preferences
              </h1>
              <p className="text-sm leading-relaxed mb-7" style={{ color: '#64748B' }}>
                To unsubscribe from weekly digests, use the link in the email footer or visit Settings.
              </p>
              <Link href="/dashboard/settings"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: '#2563EB', boxShadow: '0 4px 14px rgba(37,99,235,0.2)' }}>
                Go to Settings
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense>
      <UnsubscribeContent />
    </Suspense>
  )
}
