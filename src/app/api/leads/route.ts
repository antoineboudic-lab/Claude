import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendLeadWelcomeEmail } from '@/lib/growth/email'

export async function POST(req: NextRequest) {
  let body: { email?: string; name?: string; role?: string; source?: string; metadata?: Record<string, unknown> }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid body' }, { status: 400 }) }

  const email = body.email?.trim().toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const supabase = createAdminClient()

  // Check for existing lead (unique index is on lower(email), not column — can't use upsert onConflict)
  const { data: existing } = await supabase
    .from('leads')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  let lead: { id: string }

  if (existing) {
    const { data: updated, error: updateError } = await supabase
      .from('leads')
      .update({ source: body.source ?? 'assessment', role: body.role ?? null, metadata: body.metadata ?? {} })
      .eq('id', existing.id)
      .select('id')
      .single()
    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 })
    lead = updated!
  } else {
    const { data: inserted, error: insertError } = await supabase
      .from('leads')
      .insert({ email, source: body.source ?? 'assessment', role: body.role ?? null, metadata: body.metadata ?? {} })
      .select('id')
      .single()
    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 })
    lead = inserted!
  }

  // Log to email_log and schedule activation email (fires in 24h via cron)
  await supabase.from('email_log').insert({
    lead_id: lead.id,
    email,
    sequence: 'activation',
    step: 1,
    status: 'scheduled',
  })

  // Send lead welcome email (if RESEND_API_KEY set)
  const name = body.name?.trim() || email.split('@')[0]
  sendLeadWelcomeEmail(email, name).catch(() => {})

  return NextResponse.json({ ok: true, id: lead.id })
}
