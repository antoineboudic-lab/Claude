'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

export type ModalView = 'closed' | 'signin' | 'signup'

interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  modalView: ModalView
  prefillEmail: string
  openSignIn: () => void
  openSignUp: (email?: string) => void
  closeModal: () => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [modalView, setModalView] = useState<ModalView>('closed')
  const [prefillEmail, setPrefillEmail] = useState('')
  const supabase = useRef(createClient())
  const router = useRouter()

  const wasSignedIn = useRef(false)

  useEffect(() => {
    const client = supabase.current
    client.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
      wasSignedIn.current = !!data.session?.user
      setLoading(false)
    })

    const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (typeof window === 'undefined') return

      // Only redirect on a genuine new sign-in (user was previously logged out).
      // SIGNED_IN also fires on token refresh and tab focus — ignore those.
      if (event === 'SIGNED_IN' && !wasSignedIn.current) {
        wasSignedIn.current = true
        const params = new URLSearchParams(window.location.search)
        const next = params.get('next')
        router.push(next ?? '/dashboard')
      }

      if (event === 'SIGNED_OUT') {
        wasSignedIn.current = false
        router.push('/')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const signOut = useCallback(async () => {
    // Clear any tokens stored in sessionStorage (Remember me = false path)
    Object.keys(sessionStorage)
      .filter(k => k.startsWith('sb-'))
      .forEach(k => sessionStorage.removeItem(k))
    await supabase.current.auth.signOut()
  }, [])

  return (
    <AuthContext.Provider value={{
      user, session, loading, modalView, prefillEmail,
      openSignIn: () => setModalView('signin'),
      openSignUp: (email?: string) => { setPrefillEmail(email ?? ''); setModalView('signup') },
      closeModal: () => { setModalView('closed'); setPrefillEmail('') },
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
