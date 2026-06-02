import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { sendSocialShareAdminAlert, sendSocialShareApprovedEmail } from '@/lib/growth/email'

export const runtime = 'nodejs'

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? 'antoine.boudic@gmail.com')
  .split(',').map(e => e.trim().toLowerCase()).filter(Boolean)

function isAdminEmail(email: string | undefined) {
  return ADMIN_EMAILS.includes(email?.toLowerCase() ?? '')
}

// POST /api/social-shares — authenticated user submits a share
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { platform, post_url } = await req.json() as { platform?: string; post_url?: string }
  if (!platform || !['linkedin', 'instagram'].includes(platform)) {
    return NextResponse.json({ error: 'Invalid platform' }, { status: 400 })
  }
  if (!post_url || !post_url.startsWith('http')) {
    return NextResponse.json({ error: 'Invalid post URL' }, { status: 400 })
  }

  const admin = createAdminClient()

  // Check for existing pending/approved submission
  const { data: existing } = await admin
    .from('social_shares')
    .select('id, status')
    .eq('user_id', user.id)
    .in('status', ['pending', 'approved'])
    .limit(1)
    .single()

  if (existing) {
    return NextResponse.json(
      { error: existing.status === 'approved' ? 'already_rewarded' : 'already_pending' },
      { status: 409 },
    )
  }

  const { data: share, error } = await admin
    .from('social_shares')
    .insert({ user_id: user.id, platform, post_url })
    .select('id, platform, post_url, status, created_at')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Notify admin
  const userEmail = user.email ?? ''
  const userName = user.user_metadata?.full_name ?? userEmail.split('@')[0]
  await sendSocialShareAdminAlert(ADMIN_EMAILS[0], userName, userEmail, platform, post_url)

  return NextResponse.json(share)
}

// GET /api/social-shares?own=1 — authenticated user: get their own share status
// GET /api/social-shares        — admin: list all shares with user info
export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()

  // User fetching their own share status
  if (req.nextUrl.searchParams.get('own') === '1') {
    const { data } = await admin
      .from('social_shares')
      .select('id, platform, post_url, status, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    return NextResponse.json(data ?? null)
  }

  if (!isAdminEmail(user.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const status = req.nextUrl.searchParams.get('status') // 'pending' | 'approved' | 'rejected' | null (all)

  let query = admin
    .from('social_shares')
    .select('id, user_id, platform, post_url, status, reviewed_at, created_at')
    .order('created_at', { ascending: false })
    .limit(200)

  if (status) query = query.eq('status', status)

  const { data: shares, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Enrich with user emails
  const userIds = [...new Set((shares ?? []).map(s => s.user_id))]
  const { data: usersData } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const usersMap = Object.fromEntries(
    (usersData?.users ?? []).filter(u => userIds.includes(u.id)).map(u => [
      u.id,
      { email: u.email, name: (u.user_metadata as { full_name?: string })?.full_name ?? u.email },
    ])
  )

  const enriched = (shares ?? []).map(s => ({ ...s, user: usersMap[s.user_id] ?? { email: '—', name: '—' } }))
  return NextResponse.json(enriched)
}

// PATCH /api/social-shares — admin: approve or reject
export async function PATCH(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id, action } = await req.json() as { id?: string; action?: 'approve' | 'reject' }
  if (!id || !action || !['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const admin = createAdminClient()

  const { data: share } = await admin
    .from('social_shares')
    .select('id, user_id, platform, status')
    .eq('id', id)
    .single()

  if (!share) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (share.status !== 'pending') return NextResponse.json({ error: 'Already reviewed' }, { status: 409 })

  const newStatus = action === 'approve' ? 'approved' : 'rejected'
  await admin.from('social_shares').update({ status: newStatus, reviewed_at: new Date().toISOString() }).eq('id', id)

  if (action === 'approve') {
    // Extend subscription by 30 days
    const { data: sub } = await admin
      .from('subscriptions')
      .select('current_period_end, status')
      .eq('user_id', share.user_id)
      .single()

    const base = sub?.current_period_end
      ? new Date(sub.current_period_end)
      : new Date()
    const extended = new Date(base.getTime() + 30 * 24 * 60 * 60 * 1000)

    if (sub) {
      await admin.from('subscriptions').update({
        current_period_end: extended.toISOString(),
        updated_at: new Date().toISOString(),
      }).eq('user_id', share.user_id)
    } else {
      // No subscription yet — create a gifted month
      await admin.from('subscriptions').insert({
        user_id: share.user_id,
        status: 'active',
        plan: 'pro_monthly',
        current_period_end: extended.toISOString(),
        updated_at: new Date().toISOString(),
      })
    }

    // Email the user
    const { data: userData } = await admin.auth.admin.getUserById(share.user_id)
    const userEmail = userData?.user?.email ?? ''
    const userName = (userData?.user?.user_metadata as { full_name?: string })?.full_name
      ?? userEmail.split('@')[0]
    if (userEmail) {
      await sendSocialShareApprovedEmail(userEmail, userName, extended)
    }
  }

  return NextResponse.json({ ok: true })
}
