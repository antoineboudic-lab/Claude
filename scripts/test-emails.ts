/**
 * Sends one test copy of every user-facing email to a given address.
 * Usage: npx tsx scripts/test-emails.ts [recipient]
 */
import 'dotenv/config'
import * as dotenvLocal from 'dotenv'
import path from 'path'

dotenvLocal.config({ path: path.resolve(process.cwd(), '.env.local') })

import { Resend } from 'resend'

import {
  sendSignupEmail,
  sendWelcomeEmail,
  sendLeadWelcomeEmail,
  sendActivationEmail,
  sendReengagementEmail,
  sendUpgradeEmail,
  sendWeeklyDigestEmail,
  sendTeamInviteEmail,
  sendNudgeEmail,
  sendSocialShareAdminAlert,
  sendSocialShareApprovedEmail,
} from '../src/lib/growth/email'

// Verbose send for debugging failures
const resend = new Resend(process.env.RESEND_API_KEY)
async function verboseSend(subject: string, html: string) {
  const { data, error } = await resend.emails.send({
    from: 'OpusLearn <hello@opuslearn.ai>',
    to: TO,
    subject,
    html,
  })
  if (error) console.log(`   Resend error: ${JSON.stringify(error)}`)
  return !error
}

const TO = process.argv[2] ?? 'antoine.boudic@gmail.com'
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.opuslearn.ai'

type Result = { name: string; ok: boolean }

async function run() {
  console.log(`\nSending all emails to ${TO}\n`)

  const results: Result[] = []

  const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

  async function send(name: string, promise: Promise<boolean>) {
    try {
      const ok = await promise
      results.push({ name, ok })
      console.log(`${ok ? '✅' : '❌'} ${name}`)
    } catch (e) {
      results.push({ name, ok: false })
      console.log(`❌ ${name} — ERROR: ${e}`)
    }
    await delay(700) // stay under Resend's 10/min rate limit
  }

  await send('1. Signup', sendSignupEmail(TO, 'Antoine'))

  await send('2. Welcome (post-assessment)', sendWelcomeEmail(TO, 'Antoine', 'Marketing'))

  await send('3. Lead welcome (pre-signup)', sendLeadWelcomeEmail(TO, 'Antoine'))

  await send('4. Activation (no lesson started)', sendActivationEmail(TO, 'Antoine'))

  await send('5. Re-engagement (7d inactive, streak 4, 12 lessons left)',
    sendReengagementEmail(TO, 'Antoine', 4, 12))

  await send('6. Upgrade (track completed)',
    sendUpgradeEmail(TO, 'Antoine', 'AI for Marketing'))

  await send('7. Weekly digest (active week)',
    sendWeeklyDigestEmail(TO, 'Antoine', {
      thisWeekLessons: 3,
      totalLessons: 14,
      streak: 5,
      srDue: 8,
      trackLabel: 'Marketing',
      nextLessonTitle: 'Using AI for Campaign Briefs',
      nextLessonUrl: `${BASE}/tracks/marketing/lessons/marketing-m3-l1`,
      unsubscribeUrl: `${BASE}/unsubscribe?token=test`,
    }))

  await send('8. Weekly digest (inactive week)',
    sendWeeklyDigestEmail(TO, 'Antoine', {
      thisWeekLessons: 0,
      totalLessons: 14,
      streak: 0,
      srDue: 0,
      unsubscribeUrl: `${BASE}/unsubscribe?token=test`,
    }))

  await send('9. Team invite (with tracks)',
    sendTeamInviteEmail(TO, 'Sophie Martin', 'Accenture Strategy', `${BASE}/join?ref=abc123`, ['marketing', 'leadership']))

  await send('10. Team nudge',
    sendNudgeEmail(TO, 'Antoine', 'Accenture Strategy', 'Sophie Martin', `${BASE}/unsubscribe?token=test`))

  await send('11. Social share admin alert',
    sendSocialShareAdminAlert(TO, 'Antoine Boudic', TO, 'linkedin', 'https://linkedin.com/posts/test'))

  await send('12. Social share approved',
    sendSocialShareApprovedEmail(TO, 'Antoine', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)))

  const passed = results.filter(r => r.ok).length
  console.log(`\n${passed}/${results.length} sent successfully`)

  const failed = results.filter(r => !r.ok)
  if (failed.length) {
    console.log('\nFailed:')
    failed.forEach(r => console.log(`  - ${r.name}`))
    process.exit(1)
  }
}

run().catch(err => { console.error(err); process.exit(1) })
