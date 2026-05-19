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

      // After sign-in, honour ?next= param (e.g. from /dashboard redirect),
      // otherwise send new users without an assessment to /assessment
      if (event === 'SIGNED_IN' && typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search)
        const next = params.get('next')
        if (next) {
          setTimeout(() => { window.location.href = next }, 400)
          return
        }
        const alreadyOnAssessment = window.location.pathname.startsWith('/assessment')
        const hasAssessment = !!localStorage.getItem('ai-literacy-assessment')
        if (!hasAssessment && !alreadyOnAssessment) {
          setTimeout(() => { window.location.href = '/assessment' }, 400)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = useCallback(async () => {
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
