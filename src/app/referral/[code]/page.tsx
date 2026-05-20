import Link from 'next/link'
import { Zap, User } from 'lucide-react'
import { createAdminClient } from '@/lib/supabase/admin'

export default async function ReferralPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const admin = createAdminClient()

  const { data: referral } = await admin
    .from('referrals')
    .select('id, referrer_id, clicks, code')
    .eq('code', code)
    .single()

  if (!referral) {
    return (
      <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: 'var(--font-sans)' }}>
        <nav style={{
          background: '#0F172A',
          height: 52,
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <Zap size={20} style={{ color: '#2563EB' }} />
            <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15 }}>AI Literacy</span>
          </Link>
        </nav>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 52px)',
          padding: '80px 24px',
          textAlign: 'center',
        }}>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 16,
            padding: '48px 40px',
            maxWidth: 420,
            width: '100%',
          }}>
            <p style={{ fontSize: 40, marginBottom: 16 }}>🔗</p>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '0 0 12px' }}>
              Invalid referral link
            </h1>
            <p style={{ fontSize: 15, color: '#64748B', margin: '0 0 32px', lineHeight: 1.6 }}>
              This referral link is no longer valid or has expired.
            </p>
            <Link
              href="/?signup=1"
              style={{
                display: 'inline-block',
                background: '#2563EB',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 15,
                padding: '12px 28px',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              Sign up free
            </Link>
          </div>
        </div>
      </div>
    )
  }

  await admin
    .from('referrals')
    .update({ clicks: referral.clicks + 1 })
    .eq('id', referral.id)

  await admin
    .from('referral_events')
    .insert({ referral_id: referral.id, event_type: 'click' })

  const { data: userResult } = await admin.auth.admin.getUserById(referral.referrer_id)
  const referrerUser = userResult?.user
  const referrerName =
    (referrerUser?.user_metadata as { full_name?: string } | undefined)?.full_name ??
    referrerUser?.email?.split('@')[0] ??
    'A friend'
  const firstName = referrerName.split(' ')[0]

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: 'var(--font-sans)' }}>
      <nav style={{
        background: '#0F172A',
        height: 52,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <Zap size={20} style={{ color: '#2563EB' }} />
          <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15 }}>AI Literacy</span>
        </Link>
      </nav>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 24px',
        maxWidth: 560,
        margin: '0 auto',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: '#DBEAFE',
          border: '1px solid #BFDBFE',
          borderRadius: 999,
          padding: '8px 16px',
          marginBottom: 32,
        }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#2563EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <User size={14} style={{ color: '#FFFFFF' }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1E40AF' }}>
            Invited by {referrerName}
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 2.8rem)',
          fontWeight: 900,
          color: '#0F172A',
          textAlign: 'center',
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          margin: '0 0 20px',
        }}>
          Your AI learning path starts here
        </h1>

        <p style={{
          fontSize: 17,
          color: '#475569',
          textAlign: 'center',
          lineHeight: 1.65,
          margin: '0 0 40px',
          maxWidth: 480,
        }}>
          Join {firstName} on AI Literacy — the fastest way for professionals to master AI for their job.
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          marginBottom: 40,
          alignSelf: 'stretch',
          maxWidth: 360,
          margin: '0 auto 40px',
        }}>
          {[
            'Personalised to your role',
            '15 min/day',
            'Free forever',
          ].map((bullet) => (
            <div key={bullet} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#2563EB', fontWeight: 700, fontSize: 16 }}>✓</span>
              <span style={{ fontSize: 15, color: '#334155', fontWeight: 500 }}>{bullet}</span>
            </div>
          ))}
        </div>

        <Link
          href={`/?signup=1&ref=${code}`}
          style={{
            display: 'inline-block',
            background: '#2563EB',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: 16,
            padding: '14px 36px',
            borderRadius: 12,
            textDecoration: 'none',
            marginBottom: 20,
            boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
          }}
        >
          Get started free →
        </Link>

        <p style={{ fontSize: 14, color: '#94A3B8', margin: '0 0 48px' }}>
          Already have an account?{' '}
          <Link href="/?signin=1" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600 }}>
            Sign in
          </Link>
        </p>

        <p style={{ fontSize: 13, color: '#CBD5E1', textAlign: 'center' }}>
          AI Literacy · ailiteracy.com
        </p>
      </div>
    </div>
  )
}
