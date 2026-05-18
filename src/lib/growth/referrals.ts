import { createClient } from '@/lib/supabase/client'

const REWARD_XP = 100 // XP awarded to referrer when referred user completes first lesson

// ─── Generate a unique referral code from userId ──────────────────────────────

export function generateCode(userId: string): string {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789'
  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash + userId.charCodeAt(i)) >>> 0
  }
  let code = ''
  let n = hash
  for (let i = 0; i < 7; i++) {
    code += chars[n % chars.length]
    n = Math.floor(n / chars.length)
  }
  return code
}

// ─── Ensure the user has a referral row ──────────────────────────────────────

export async function ensureReferral(userId: string): Promise<{ code: string } | null> {
  const supabase = createClient()
  const code = generateCode(userId)

  const { data: existing } = await supabase
    .from('referrals')
    .select('code')
    .eq('referrer_id', userId)
    .single()

  if (existing) return existing

  const { data, error } = await supabase
    .from('referrals')
    .insert({ referrer_id: userId, code })
    .select('code')
    .single()

  if (error) return null
  return data
}

// ─── Track a referral click (called when /join?ref=CODE is visited) ───────────

export async function trackReferralClick(code: string): Promise<void> {
  const supabase = createClient()
  const { data: referral } = await supabase
    .from('referrals')
    .select('id, clicks')
    .eq('code', code)
    .single()

  if (!referral) return

  await supabase
    .from('referrals')
    .update({ clicks: referral.clicks + 1 })
    .eq('id', referral.id)

  await supabase.from('referral_events').insert({
    referral_id: referral.id,
    event_type: 'click',
  })
}

// ─── Record a referral signup ─────────────────────────────────────────────────

export async function recordReferralSignup(code: string, referredUserId: string): Promise<void> {
  const supabase = createClient()
  const { data: referral } = await supabase
    .from('referrals')
    .select('id, signups')
    .eq('code', code)
    .single()

  if (!referral) return

  await supabase
    .from('referrals')
    .update({ signups: referral.signups + 1 })
    .eq('id', referral.id)

  await supabase.from('referral_events').insert({
    referral_id: referral.id,
    event_type: 'signup',
    referred_user_id: referredUserId,
  })
}

// ─── Award referral XP (called when referred user completes first lesson) ─────

export async function awardReferralXP(referredUserId: string): Promise<void> {
  const supabase = createClient()

  const { data: event } = await supabase
    .from('referral_events')
    .select('referral_id')
    .eq('referred_user_id', referredUserId)
    .eq('event_type', 'signup')
    .single()

  if (!event) return

  const { data: referral } = await supabase
    .from('referrals')
    .select('id, referrer_id, conversions, reward_xp')
    .eq('id', event.referral_id)
    .single()

  if (!referral) return

  // Update referral stats
  await supabase
    .from('referrals')
    .update({
      conversions: referral.conversions + 1,
      reward_xp: referral.reward_xp + REWARD_XP,
    })
    .eq('id', referral.id)

  // Credit XP to referrer's progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('xp')
    .eq('user_id', referral.referrer_id)
    .single()

  if (progress) {
    await supabase
      .from('user_progress')
      .update({ xp: progress.xp + REWARD_XP })
      .eq('user_id', referral.referrer_id)
  }

  await supabase.from('referral_events').insert({
    referral_id: referral.id,
    event_type: 'conversion',
    referred_user_id: referredUserId,
  })
}

// ─── Get referral stats for a user ───────────────────────────────────────────

export async function getReferralStats(userId: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('referrals')
    .select('code, clicks, signups, conversions, reward_xp')
    .eq('referrer_id', userId)
    .single()
  return data ?? null
}
