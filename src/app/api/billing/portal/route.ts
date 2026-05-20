import { NextResponse } from 'next/server'
import { createSupabaseServerClient as createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import { getSubscriptionByUserId } from '@/lib/supabase/subscriptions'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opuslearn.ai'

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sub = await getSubscriptionByUserId(user.id)
  if (!sub?.stripe_customer_id) {
    return NextResponse.json({ error: 'No subscription found' }, { status: 404 })
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: sub.stripe_customer_id,
    return_url: `${BASE_URL}/dashboard`,
  })

  return NextResponse.json({ url: session.url })
}
