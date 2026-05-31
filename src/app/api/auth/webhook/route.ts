import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendSignupEmail } from '@/lib/growth/email'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-supabase-webhook-secret')
  if (!secret || secret !== process.env.SUPABASE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json() as {
    type: 'INSERT' | 'UPDATE' | 'DELETE'
    table: string
    schema: string
    record: Record<string, unknown>
    old_record: Record<string, unknown> | null
  }

  if (body.schema !== 'auth' || body.table !== 'users') {
    return NextResponse.json({ received: true })
  }

  const id = body.record.id as string
  const email = body.record.email as string
  const meta = body.record.raw_user_meta_data as Record<string, unknown> | null
  const name = (meta?.full_name as string | undefined)
    ?? (email ? email.split('@')[0] : 'there')
  const emailConfirmedAt = body.record.email_confirmed_at as string | null
  const oldEmailConfirmedAt = body.old_record?.email_confirmed_at as string | null

  // Send welcome email only once the account is confirmed, so the dashboard link works:
  // - INSERT with email_confirmed_at set: Supabase auto-confirm is ON, user is immediately active
  // - UPDATE where email_confirmed_at changes null → value: user just clicked confirmation link
  const shouldSendWelcome =
    (body.type === 'INSERT' && !!emailConfirmedAt) ||
    (body.type === 'UPDATE' && !oldEmailConfirmedAt && !!emailConfirmedAt)

  if (!shouldSendWelcome || !email) {
    return NextResponse.json({ received: true })
  }

  const admin = createAdminClient()

  await sendSignupEmail(email, name)

  if (id) {
    await admin.from('email_log').insert({
      user_id: id,
      email,
      sequence: 'onboarding',
      step: 0,
      status: 'sent',
      sent_at: new Date().toISOString(),
    })
  }

  return NextResponse.json({ received: true })
}
