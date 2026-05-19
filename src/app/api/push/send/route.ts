import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import webpush from 'web-push'

export const runtime = 'nodejs'

let vapidSet = false
function ensureVapid() {
  if (vapidSet) return
  const pub = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
  const priv = process.env.VAPID_PRIVATE_KEY
  if (!pub || !priv) throw new Error('VAPID keys not configured')
  webpush.setVapidDetails('mailto:hello@ailiteracy.com', pub, priv)
  vapidSet = true
}

export interface PushPayload {
  title: string
  body: string
  url?: string
  icon?: string
}

export async function POST(req: Request) {
  // Internal-only: validate with CRON_SECRET
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try { ensureVapid() } catch {
    return NextResponse.json({ error: 'Push not configured' }, { status: 503 })
  }

  const { userId, payload } = await req.json() as { userId?: string; payload: PushPayload }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )

  let query = supabase.from('push_subscriptions').select('endpoint, keys')
  if (userId) query = query.eq('user_id', userId)

  const { data: subs, error } = await query
  if (error || !subs?.length) return NextResponse.json({ sent: 0 })

  let sent = 0
  const staleEndpoints: string[] = []

  await Promise.all(subs.map(async (sub) => {
    try {
      await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: sub.keys as { p256dh: string; auth: string } },
        JSON.stringify(payload),
      )
      sent++
    } catch (err: unknown) {
      // 410 = subscription expired/unsubscribed
      if (err && typeof err === 'object' && 'statusCode' in err && (err as { statusCode: number }).statusCode === 410) {
        staleEndpoints.push(sub.endpoint)
      }
    }
  }))

  // Clean up expired subscriptions
  if (staleEndpoints.length > 0) {
    await supabase.from('push_subscriptions').delete().in('endpoint', staleEndpoints)
  }

  return NextResponse.json({ sent })
}
