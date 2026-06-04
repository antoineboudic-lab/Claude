import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { generateCode } from '@/lib/growth/referrals'

// GET  /api/referrals?userId=xxx  → get or create referral for authenticated user
// POST /api/referrals             → track click { code } (public — called on landing page)
// PUT  /api/referrals             → record signup { code, referredUserId } (auth required)

export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = req.nextUrl.searchParams.get('userId')
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })

  if (userId !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const admin = createAdminClient()

  const { data: existing } = await admin
    .from('referrals')
    .select('code, clicks, signups, conversions, reward_xp')
    .eq('referrer_id', userId)
    .single()

  if (existing) return NextResponse.json(existing)

  const code = generateCode(userId)
  const { data, error } = await admin
    .from('referrals')
    .insert({ referrer_id: userId, code })
    .select('code, clicks, signups, conversions, reward_xp')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// Public: called when someone visits a referral landing page — no auth needed
export async function POST(req: NextRequest) {
  const { code } = await req.json()
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })

  const supabase = createAdminClient()
  const { data: referral } = await supabase
    .from('referrals').select('id, clicks').eq('code', code).single()

  if (!referral) return NextResponse.json({ error: 'not found' }, { status: 404 })

  await Promise.all([
    supabase.from('referrals').update({ clicks: referral.clicks + 1 }).eq('id', referral.id),
    supabase.from('referral_events').insert({ referral_id: referral.id, event_type: 'click' }),
  ])

  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { code, referredUserId } = await req.json()
  if (!code || !referredUserId) return NextResponse.json({ error: 'code and referredUserId required' }, { status: 400 })

  if (referredUserId !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const admin = createAdminClient()
  const { data: referral } = await admin
    .from('referrals').select('id, referrer_id, signups').eq('code', code).single()

  if (!referral) return NextResponse.json({ error: 'not found' }, { status: 404 })

  await Promise.all([
    admin.from('referrals').update({ signups: referral.signups + 1 }).eq('id', referral.id),
    admin.from('referral_events').insert({
      referral_id: referral.id,
      event_type: 'signup',
      referred_user_id: referredUserId,
    }),
  ])

  return NextResponse.json({ ok: true })
}
