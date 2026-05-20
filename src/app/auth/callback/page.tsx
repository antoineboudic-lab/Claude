'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

// Handles the implicit-flow redirect from Supabase.
// The tokens arrive in the URL hash: #access_token=...&refresh_token=...&type=recovery
// Hash fragments are client-only — they are never sent to the server.
export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    const params = new URLSearchParams(hash)

    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')
    const type = params.get('type')

    const next = new URLSearchParams(window.location.search).get('next') ?? '/dashboard'

    if (accessToken && refreshToken) {
      const supabase = createClient()
      supabase.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ error }) => {
          if (error) {
            router.replace('/auth/reset?error=invalid')
          } else if (type === 'recovery') {
            router.replace('/auth/reset')
          } else {
            router.replace(next)
          }
        })
    } else {
      // No tokens in hash — link is invalid or already used
      router.replace('/auth/reset?error=invalid')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F1F5F9' }}>
      <Loader2 size={28} className="animate-spin" style={{ color: '#2563EB' }} />
    </div>
  )
}
