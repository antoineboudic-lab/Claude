import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendActivationEmail } from '@/lib/growth/email'

export async function POST(req: NextRequest) {
  let body: { email?: string; role?: string; source?: string; metadata?: Record<string, unknown> }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid body' }, { status: 400 }) }

  const email = body.email?.trim().toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const supabase = createAdminClient()

  // Upsert lead — update role/metadata if already exists
  const { data: lead, error } = await supabase
    .from('leads')
    .upsert(
      {
        email,
        source: body.source ?? 'assessment',
        role: body.role ?? null,
        metadata: body.metadata ?? {},
      },
      { onConflict: 'email', ignoreDuplicates: false },
    )
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Log to email_log and schedule activation email (fires in 24h via cron)
  await supabase.from('email_log').insert({
    lead_id: lead.id,
    email,
    sequence: 'activation',
    step: 1,
    status: 'scheduled',
  })

  // Send immediate activation teaser (if RESEND_API_KEY set)
  const name = email.split('@')[0]
  sendActivationEmail(email, name).catch(() => {})

  return NextResponse.json({ ok: true, id: lead.id })
}
