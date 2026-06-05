'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import posthog from 'posthog-js'

export type ModalView = 'closed' | 'signin' | 'signup'

interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  modalView: ModalView
  prefillEmail: string
  prefillFirstName: string
  openSignIn: () => void
  openSignUp: (email?: string, firstName?: string) => void
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
  const [prefillFirstName, setPrefillFirstName] = useState('')
  const supabase = useRef(createClient())
  const router = useRouter()

  const wasSignedIn = useRef(false)

  useEffect(() => {
    const client = supabase.current
    client.auth.getSession().then(async ({ data }) => {
      setSession(data.session)
      if (data.session) {
        const { data: { user } } = await client.auth.getUser()
        setUser(user)
        wasSignedIn.current = !!user
      } else {
        setUser(null)
        wasSignedIn.current = false
      }
      setLoading(false)
    })

    const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (typeof window === 'undefined') return

      if (event === 'SIGNED_IN' && !wasSignedIn.current) {
        wasSignedIn.current = true
        const isNewUser = session?.user?.created_at === session?.user?.last_sign_in_at
        posthog.capture(isNewUser ? 'sign_up' : 'sign_in', { email: session?.user?.email })
      }

      if (event === 'SIGNED_OUT') {
        wasSignedIn.current = false
        posthog.reset()
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
      user, session, loading, modalView, prefillEmail, prefillFirstName,
      openSignIn: () => setModalView('signin'),
      openSignUp: (email?: string, firstName?: string) => { setPrefillEmail(email ?? ''); setPrefillFirstName(firstName ?? ''); setModalView('signup') },
      closeModal: () => { setModalView('closed'); setPrefillEmail(''); setPrefillFirstName('') },
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
