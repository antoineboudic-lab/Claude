'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

export type ModalView = 'closed' | 'signin' | 'signup'

interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  modalView: ModalView
  openSignIn: () => void
  openSignUp: () => void
  closeModal: () => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [modalView, setModalView] = useState<ModalView>('closed')
  const supabase = useRef(createClient())

  useEffect(() => {
    const client = supabase.current
    client.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (typeof window === 'undefined') return

      // After sign-in, honour ?next= param, otherwise go to /dashboard
      if (event === 'SIGNED_IN') {
        const params = new URLSearchParams(window.location.search)
        const next = params.get('next')
        setTimeout(() => { window.location.href = next ?? '/dashboard' }, 400)
      }

      // After sign-out, always return to home
      if (event === 'SIGNED_OUT') {
        window.location.href = '/'
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = useCallback(async () => {
    // Clear any tokens stored in sessionStorage (Remember me = false path)
    Object.keys(sessionStorage)
      .filter(k => k.startsWith('sb-'))
      .forEach(k => sessionStorage.removeItem(k))
    await supabase.current.auth.signOut()
  }, [])

  return (
    <AuthContext.Provider value={{
      user, session, loading, modalView,
      openSignIn: () => setModalView('signin'),
      openSignUp: () => setModalView('signup'),
      closeModal: () => setModalView('closed'),
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
