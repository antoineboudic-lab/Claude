import { NextResponse } from 'next/server'
import { createSupabaseServerClient as createClient } from '@/lib/supabase/server'
import { stripe, STRIPE_PRICES, type StripePlan } from '@/lib/stripe'
import { getSubscriptionByUserId, upsertSubscription } from '@/lib/supabase/subscriptions'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opuslearn.ai'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let plan: StripePlan = 'monthly'
  try {
    const body = await req.json()
    if (body.plan === 'annual') plan = 'annual'
  } catch {}

  const priceId = STRIPE_PRICES[plan]
  if (!priceId) {
    return NextResponse.json({ error: 'Stripe price not configured' }, { status: 500 })
  }

  // Find or create Stripe customer
  let customerId: string | undefined
  const existing = await getSubscriptionByUserId(user.id)
  if (existing?.stripe_customer_id) {
    customerId = existing.stripe_customer_id
  } else {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    })
    customerId = customer.id
    await upsertSubscription(user.id, { stripe_customer_id: customerId })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: { trial_period_days: 7 },
    allow_promotion_codes: true,
    success_url: `${BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${BASE_URL}/dashboard`,
    metadata: { supabase_user_id: user.id, plan },
  })

  return NextResponse.json({ url: session.url })
}
