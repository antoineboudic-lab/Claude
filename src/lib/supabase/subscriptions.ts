import { createClient } from '@supabase/supabase-js'

export interface SubscriptionRow {
  id: string
  user_id: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'inactive'
  plan: 'pro_monthly' | 'pro_annual' | null
  current_period_end: string | null
  trial_end: string | null
  updated_at: string
}

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
}

export async function getSubscriptionByUserId(userId: string): Promise<SubscriptionRow | null> {
  const { data } = await getAdmin()
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single()
  return data ?? null
}

export async function getSubscriptionByCustomerId(customerId: string): Promise<SubscriptionRow | null> {
  const { data } = await getAdmin()
    .from('subscriptions')
    .select('*')
    .eq('stripe_customer_id', customerId)
    .single()
  return data ?? null
}

export async function upsertSubscription(
  userId: string,
  fields: Partial<Omit<SubscriptionRow, 'id' | 'user_id'>>,
): Promise<void> {
  await getAdmin().from('subscriptions').upsert(
    { user_id: userId, ...fields, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' },
  )
}

export async function getUserIdByCustomerId(customerId: string): Promise<string | null> {
  const { data } = await getAdmin()
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', customerId)
    .single()
  return data?.user_id ?? null
}
