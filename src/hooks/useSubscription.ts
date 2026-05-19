'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabase/client'

export interface Subscription {
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'inactive'
  plan: 'pro_monthly' | 'pro_annual' | null
  currentPeriodEnd: string | null
  trialEnd: string | null
}

const CACHE_KEY = 'ai-literacy-subscription'
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

function loadCache(userId: string): Subscription | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, expiresAt, uid } = JSON.parse(raw)
    if (uid !== userId || Date.now() > expiresAt) return null
    return data
  } catch { return null }
}

function saveCache(userId: string, sub: Subscription) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data: sub, expiresAt: Date.now() + CACHE_TTL, uid: userId }))
  } catch {}
}

export function clearSubscriptionCache() {
  try { localStorage.removeItem(CACHE_KEY) } catch {}
}

export function useSubscription() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    if (!user) {
      setSubscription(null)
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { data } = await supabase
      .from('subscriptions')
      .select('status, plan, current_period_end, trial_end')
      .eq('user_id', user.id)
      .single()

    const sub: Subscription = data
      ? {
          status: data.status,
          plan: data.plan,
          currentPeriodEnd: data.current_period_end,
          trialEnd: data.trial_end,
        }
      : { status: 'inactive', plan: null, currentPeriodEnd: null, trialEnd: null }

    setSubscription(sub)
    saveCache(user.id, sub)
    setLoading(false)
  }, [user])

  useEffect(() => {
    if (!user) {
      setSubscription(null)
      setLoading(false)
      return
    }

    const cached = loadCache(user.id)
    if (cached) {
      setSubscription(cached)
      setLoading(false)
    }

    refresh()
  }, [user, refresh])

  const isPro = subscription?.status === 'active' || subscription?.status === 'trialing'
  const isTrialing = subscription?.status === 'trialing'

  return { subscription, isPro, isTrialing, loading, refresh }
}
