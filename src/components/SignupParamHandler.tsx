'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export function SignupParamHandler() {
  const params = useSearchParams()
  const { openSignUp } = useAuth()

  useEffect(() => {
    if (params.get('signup') === '1') {
      const email = params.get('email') ?? ''
      const firstName = params.get('name') ?? ''
      openSignUp(email, firstName)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
