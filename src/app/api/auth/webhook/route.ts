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

  if (body.type !== 'INSERT' || body.schema !== 'auth' || body.table !== 'users') {
    return NextResponse.json({ received: true })
  }

  const id = body.record.id as string
  const email = body.record.email as string
  const meta = body.record.raw_user_meta_data as Record<string, unknown> | null
  const name = (meta?.full_name as string | undefined)
    ?? (email ? email.split('@')[0] : 'there')

  const admin = createAdminClient()

  if (email) {
    await sendSignupEmail(email, name)
  }

  if (id && email) {
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
