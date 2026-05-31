import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { upsertSubscription, getUserIdByCustomerId } from '@/lib/supabase/subscriptions'

export const runtime = 'nodejs'

function toIso(epoch: number | null | undefined): string | null {
  if (!epoch) return null
  return new Date(epoch * 1000).toISOString()
}

async function handleSubscription(sub: Stripe.Subscription) {
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id
  const userId = await getUserIdByCustomerId(customerId)
  if (!userId) {
    console.error('[webhook] no user for customer', customerId)
    return
  }

  const item = sub.items.data[0]
  const priceId = item?.price.id ?? null
  const plan = priceId === process.env.STRIPE_ANNUAL_PRICE_ID ? 'pro_annual' : 'pro_monthly'

  // In trial mode, current_period_end may be null — fall back to billing_cycle_anchor
  const rawSub = sub as unknown as Record<string, unknown>
  const periodEnd = (rawSub.current_period_end as number | null)
    ?? (rawSub.billing_cycle_anchor as number | null)
    ?? null

  await upsertSubscription(userId, {
    stripe_customer_id: customerId,
    stripe_subscription_id: sub.id,
    status: sub.status as 'active' | 'trialing' | 'past_due' | 'canceled' | 'inactive',
    plan,
    current_period_end: toIso(periodEnd),
    trial_end: toIso(sub.trial_end ?? null),
  })
}

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('[webhook] signature verification failed', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode !== 'subscription') break
        const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id
        const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id
        if (!customerId || !subscriptionId) break

        const userId = session.metadata?.supabase_user_id
        if (userId) {
          await upsertSubscription(userId, {
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            status: 'trialing',
          })
        }

        const sub = await stripe.subscriptions.retrieve(subscriptionId)
        await handleSubscription(sub)
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscription(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id
        const userId = await getUserIdByCustomerId(customerId)
        if (userId) {
          await upsertSubscription(userId, {
            status: 'canceled',
            stripe_subscription_id: sub.id,
          })
        }
        break
      }
    }
  } catch (err) {
    console.error('[webhook] handler error', event.type, err)
    return NextResponse.json({ error: 'Handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
