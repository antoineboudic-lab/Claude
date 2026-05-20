import { createHmac } from 'crypto'
import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ai-literacy-tau.vercel.app'

function makeToken(userId: string): string {
  return createHmac('sha256', process.env.CRON_SECRET ?? 'dev').update(userId).digest('hex')
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('u')
  const token = searchParams.get('t')

  if (!userId || !token) {
    return NextResponse.redirect(`${BASE_URL}/unsubscribe?error=invalid`)
  }

  const expected = makeToken(userId)
  // Constant-time compare to prevent timing attacks
  if (token.length !== expected.length || !token.split('').every((c, i) => c === expected[i])) {
    return NextResponse.redirect(`${BASE_URL}/unsubscribe?error=invalid`)
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('user_progress')
    .update({ digest_opt_out: true })
    .eq('user_id', userId)

  if (error) {
    console.error('[unsubscribe]', error)
    return NextResponse.redirect(`${BASE_URL}/unsubscribe?error=server`)
  }

  return NextResponse.redirect(`${BASE_URL}/unsubscribe?done=1`)
}
