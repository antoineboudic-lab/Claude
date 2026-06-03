import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateCode } from '@/lib/growth/referrals'

// GET  /api/referrals?userId=xxx  → get or create referral for user
// POST /api/referrals             → track click { code }
// PUT  /api/referrals             → record signup { code, referredUserId }

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })

  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from('referrals')
    .select('code, clicks, signups, conversions, reward_xp')
    .eq('referrer_id', userId)
    .single()

  if (existing) return NextResponse.json(existing)

  const code = generateCode(userId)
  const { data, error } = await supabase
    .from('referrals')
    .insert({ referrer_id: userId, code })
    .select('code, clicks, signups, conversions, reward_xp')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

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
  const { code, referredUserId } = await req.json()
  if (!code || !referredUserId) return NextResponse.json({ error: 'code and referredUserId required' }, { status: 400 })

  const supabase = createAdminClient()
  const { data: referral } = await supabase
    .from('referrals').select('id, referrer_id, signups').eq('code', code).single()

  if (!referral) return NextResponse.json({ error: 'not found' }, { status: 404 })

  await Promise.all([
    supabase.from('referrals').update({ signups: referral.signups + 1 }).eq('id', referral.id),
    supabase.from('referral_events').insert({
      referral_id: referral.id,
      event_type: 'signup',
      referred_user_id: referredUserId,
    }),
  ])

  return NextResponse.json({ ok: true })
}
