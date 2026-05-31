import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

const FROM = 'OpusLearn <hello@opuslearn.ai>'
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opuslearn.ai'

// ─── Logo SVG (inline for email client compatibility) ─────────────────────────

const LOGO_MARK = `<svg width="30" height="30" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;"><rect width="28" height="28" rx="7" fill="#2563EB"/><circle cx="14" cy="15" r="6.5" stroke="white" stroke-width="2.2" fill="none"/><path d="M10.5 17L14 12L17.5 17" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`

// ─── Layout helpers ───────────────────────────────────────────────────────────

function baseHtml(content: string, footerExtra = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>OpusLearn</title>
</head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#FFFFFF;border-radius:16px;border:1px solid #E2E8F0;overflow:hidden;">

        <!-- Accent bar -->
        <tr><td style="background:#2563EB;height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>

        <!-- Logo header -->
        <tr><td style="padding:24px 36px 20px;border-bottom:1px solid #F1F5F9;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">${LOGO_MARK}</td>
              <td style="padding-left:10px;vertical-align:middle;font-size:15px;font-weight:900;color:#0F172A;letter-spacing:-0.3px;line-height:1;">OpusLearn</td>
            </tr>
          </table>
        </td></tr>

        <!-- Body content -->
        ${content}

        <!-- Footer -->
        <tr><td style="padding:24px 36px;background:#F8FAFF;border-top:1px solid #E2E8F0;text-align:center;">
          ${footerExtra ? `<p style="margin:0 0 10px;font-size:13px;color:#64748B;">${footerExtra}</p>` : ''}
          <p style="margin:0 0 6px;font-size:12px;color:#94A3B8;line-height:1.5;">
            You're receiving this because you signed up at <a href="${BASE_URL}" style="color:#94A3B8;text-decoration:underline;">opuslearn.ai</a>.
          </p>
          <p style="margin:0;font-size:12px;color:#CBD5E1;">
            <a href="${BASE_URL}/unsubscribe" style="color:#CBD5E1;text-decoration:underline;">Unsubscribe</a>
            &nbsp;&middot;&nbsp;
            <a href="${BASE_URL}/privacy" style="color:#CBD5E1;text-decoration:underline;">Privacy policy</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function row(content: string, pb = 20): string {
  return `<tr><td style="padding:0 36px ${pb}px;">${content}</td></tr>`
}

function spacer(h = 8): string {
  return `<tr><td style="height:${h}px;font-size:0;line-height:0;">&nbsp;</td></tr>`
}

function btn(label: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0">
    <tr>
      <td style="border-radius:10px;background:#2563EB;box-shadow:0 4px 14px rgba(37,99,235,0.3);">
        <a href="${href}" style="display:inline-block;padding:14px 30px;font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;letter-spacing:0.1px;">${label}</a>
      </td>
    </tr>
  </table>`
}

function infoBox(content: string, variant: 'blue' | 'amber' | 'green' = 'blue'): string {
  const styles = {
    blue:  { bg: '#EFF6FF', border: '#BFDBFE', text: '#1E40AF' },
    amber: { bg: '#FFFBEB', border: '#FDE68A', text: '#92400E' },
    green: { bg: '#F0FDF4', border: '#BBF7D0', text: '#166534' },
  }
  const s = styles[variant]
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${s.bg};border:1px solid ${s.border};border-radius:12px;">
    <tr><td style="padding:16px 20px;font-size:14px;color:${s.text};line-height:1.5;">${content}</td></tr>
  </table>`
}

function statsGrid(cells: { value: string; label: string; color?: string }[]): string {
  const cols = cells.map((c, i) => `
    <td style="padding:18px 16px;text-align:center;${i < cells.length - 1 ? 'border-right:1px solid #E2E8F0;' : ''}width:${Math.floor(100 / cells.length)}%;">
      <p style="margin:0 0 4px;font-size:28px;font-weight:900;color:${c.color ?? '#0F172A'};line-height:1;">${c.value}</p>
      <p style="margin:0;font-size:11px;font-weight:600;color:#94A3B8;text-transform:uppercase;letter-spacing:0.5px;">${c.label}</p>
    </td>`).join('')
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#FAFBFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;"><tr>${cols}</tr></table>`
}

function trackBadge(label: string): string {
  return `<span style="display:inline-block;background:#EFF6FF;border:1px solid #BFDBFE;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:700;color:#2563EB;letter-spacing:0.2px;">${label}</span>`
}

// ─── 1. Signup email (immediate on account creation) ─────────────────────────

function signupHtml(name: string): string {
  return baseHtml(`
    ${spacer(8)}
    ${row(`
      <h1 style="margin:0 0 10px;font-size:26px;font-weight:900;color:#0F172A;line-height:1.2;">You're in, ${name} — let's go!</h1>
      <p style="margin:0;font-size:15px;color:#475569;line-height:1.6;">Your OpusLearn account is confirmed. Your personalised AI learning path is ready on your dashboard — start your first lesson in under 15 minutes.</p>
    `, 20)}
    ${row(btn('Go to my dashboard →', `${BASE_URL}/dashboard`))}
    ${spacer(24)}
    ${row(`
      <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:0.5px;">Free vs Pro</p>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="padding:16px 20px;border-bottom:1px solid #F1F5F9;vertical-align:top;width:50%;border-right:1px solid #E2E8F0;">
            <p style="margin:0 0 6px;font-size:14px;font-weight:800;color:#0F172A;">Free</p>
            <p style="margin:0 0 10px;font-size:12px;color:#64748B;">Always free</p>
            <table role="presentation" cellpadding="0" cellspacing="0">
              ${['First lesson per track', 'Your personalised path', 'Progress tracking', 'XP &amp; streaks'].map(f => `
                <tr>
                  <td style="padding:3px 8px 3px 0;font-size:13px;color:#22C55E;vertical-align:top;">✓</td>
                  <td style="padding:3px 0;font-size:13px;color:#475569;">${f}</td>
                </tr>`).join('')}
            </table>
          </td>
          <td style="padding:16px 20px;border-bottom:1px solid #F1F5F9;vertical-align:top;background:#EFF6FF;width:50%;">
            <p style="margin:0 0 2px;font-size:14px;font-weight:800;color:#0F172A;">Pro</p>
            <p style="margin:0 0 10px;font-size:12px;color:#64748B;">$12.99<span style="color:#94A3B8;">/mo</span> &nbsp;·&nbsp; 7-day free trial</p>
            <table role="presentation" cellpadding="0" cellspacing="0">
              ${['All lessons unlocked', 'AI-powered tutor', 'Completion certificates', 'Advanced case studies'].map(f => `
                <tr>
                  <td style="padding:3px 8px 3px 0;font-size:13px;color:#2563EB;vertical-align:top;font-weight:700;">✓</td>
                  <td style="padding:3px 0;font-size:13px;color:#1E40AF;font-weight:500;">${f}</td>
                </tr>`).join('')}
            </table>
          </td>
        </tr>
      </table>
    `, 20)}
    ${row(`
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="border-radius:10px;border:2px solid #2563EB;">
            <a href="${BASE_URL}/pricing" style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:700;color:#2563EB;text-decoration:none;letter-spacing:0.1px;">Start 7-day free Pro trial →</a>
          </td>
        </tr>
      </table>
    `, 8)}
    ${row(`<p style="margin:0;font-size:12px;color:#94A3B8;">No credit card required to start. Cancel anytime.</p>`, 28)}
  `)
}

// ─── 2. Welcome email (post-assessment, knows the track) ─────────────────────

function welcomeHtml(name: string, trackLabel: string): string {
  return baseHtml(`
    ${spacer(8)}
    ${row(`
      ${trackBadge(trackLabel + ' Track')}
      <h1 style="margin:12px 0 10px;font-size:26px;font-weight:900;color:#0F172A;line-height:1.2;">Welcome to OpusLearn, ${name}!</h1>
      <p style="margin:0;font-size:15px;color:#475569;line-height:1.6;">Your personalised <strong>${trackLabel}</strong> learning path is ready. Most professionals complete their first lesson in under 15 minutes — and notice a difference in their work within a week.</p>
    `, 20)}
    ${row(`
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:12px;">
        <tr>
          <td style="padding:18px 20px;">
            <p style="margin:0 0 3px;font-size:11px;font-weight:700;color:#2563EB;text-transform:uppercase;letter-spacing:1px;">Your first lesson</p>
            <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#0F172A;">AI Fundamentals for Business Professionals</p>
            <p style="margin:0;font-size:13px;color:#64748B;">12 min &nbsp;·&nbsp; No technical background needed &nbsp;·&nbsp; Free</p>
          </td>
        </tr>
      </table>
    `, 20)}
    ${row(btn('Start my first lesson →', `${BASE_URL}/dashboard`))}
    ${spacer(16)}
    ${row(`
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        ${[
          ['✅', 'Free forever — no credit card needed'],
          ['⚡', '15 min/day is all it takes'],
          ['🏆', 'Earn XP, badges and certificates'],
        ].map(([icon, text]) => `
          <tr>
            <td style="padding:5px 10px 5px 0;font-size:14px;color:#475569;vertical-align:top;white-space:nowrap;">${icon}</td>
            <td style="padding:5px 0;font-size:14px;color:#475569;">${text}</td>
          </tr>`).join('')}
      </table>
    `, 28)}
  `)
}

// ─── 3. Lead welcome email (pre-signup, after email capture on results page) ──

function leadWelcomeHtml(name: string, email: string): string {
  const signupUrl = `${BASE_URL}/?signup=1&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`
  return baseHtml(`
    ${spacer(8)}
    ${row(`
      <h1 style="margin:0 0 10px;font-size:26px;font-weight:900;color:#0F172A;line-height:1.2;">Your AI learning path is ready, ${name}</h1>
      <p style="margin:0;font-size:15px;color:#475569;line-height:1.6;">You completed the assessment and we've built your personalised curriculum. Create your free account to access it — takes 30 seconds, no credit card needed.</p>
    `, 20)}
    ${row(infoBox(`
      <strong style="display:block;margin-bottom:6px;font-size:13px;color:#1E40AF;text-transform:uppercase;letter-spacing:0.5px;">What's waiting for you</strong>
      <table role="presentation" cellpadding="0" cellspacing="0">
        ${['Your role-specific lesson plan', 'Priority modules based on your goals', 'First lesson ready to start immediately'].map(s => `
          <tr>
            <td style="padding:4px 10px 4px 0;font-size:14px;color:#1D4ED8;vertical-align:top;">✓</td>
            <td style="padding:4px 0;font-size:14px;color:#1E3A8A;">${s}</td>
          </tr>`).join('')}
      </table>
    `))}
    ${spacer(20)}
    ${row(btn('Create my free account →', signupUrl))}
    ${spacer(12)}
    ${row(`<p style="margin:0;font-size:13px;color:#94A3B8;">Free forever · No credit card required · Takes 30 seconds</p>`, 28)}
  `)
}

// ─── 4. Activation email (day 1–3, no lesson started) ────────────────────────

function activationHtml(name: string): string {
  return baseHtml(`
    ${spacer(8)}
    ${row(`
      <h1 style="margin:0 0 10px;font-size:26px;font-weight:900;color:#0F172A;line-height:1.2;">Your path is waiting, ${name}</h1>
      <p style="margin:0;font-size:15px;color:#475569;line-height:1.6;">You completed your assessment but haven't started your first lesson yet. Professionals who start within 24 hours are <strong>4× more likely</strong> to finish their track.</p>
    `, 20)}
    ${row(infoBox(`⏱️ <strong>Your personalised plan expires in 48 hours</strong> — we'll reset it if you don't start soon. Pick up right where you left off.`, 'amber'))}
    ${spacer(20)}
    ${row(btn('Pick up where I left off →', `${BASE_URL}/dashboard`))}
    ${spacer(12)}
    ${row(`<p style="margin:0;font-size:13px;color:#94A3B8;">Takes just 12 minutes to complete your first lesson. Your progress is saved automatically.</p>`, 28)}
  `)
}

// ─── 4. Re-engagement email (7 days inactive) ────────────────────────────────

function reengagementHtml(name: string, streak: number, lessonsLeft: number): string {
  return baseHtml(`
    ${spacer(8)}
    ${row(`
      <h1 style="margin:0 0 10px;font-size:26px;font-weight:900;color:#0F172A;line-height:1.2;">Miss you, ${name} 👀</h1>
      <p style="margin:0;font-size:15px;color:#475569;line-height:1.6;">It's been a week since your last session. You're closer to finishing than you think — <strong>${lessonsLeft} lesson${lessonsLeft !== 1 ? 's' : ''} left</strong> to complete your track.</p>
    `, 20)}
    ${streak > 0 ? row(infoBox(`🔥 <strong>You had a ${streak}-day streak.</strong> Don't let all that momentum reset to zero — jump back in today.`, 'amber')) + spacer(20) : ''}
    ${row(`
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#FAFBFF;border:1px solid #E2E8F0;border-radius:12px;">
        <tr>
          <td style="padding:16px 20px;border-right:1px solid #E2E8F0;text-align:center;width:50%;">
            <p style="margin:0 0 2px;font-size:28px;font-weight:900;color:#0F172A;">${lessonsLeft}</p>
            <p style="margin:0;font-size:11px;font-weight:600;color:#94A3B8;text-transform:uppercase;letter-spacing:0.5px;">Lessons left</p>
          </td>
          <td style="padding:16px 20px;text-align:center;width:50%;">
            <p style="margin:0 0 2px;font-size:28px;font-weight:900;color:${streak > 0 ? '#F59E0B' : '#94A3B8'};">${streak > 0 ? `🔥 ${streak}` : '–'}</p>
            <p style="margin:0;font-size:11px;font-weight:600;color:#94A3B8;text-transform:uppercase;letter-spacing:0.5px;">Day streak</p>
          </td>
        </tr>
      </table>
    `, 20)}
    ${row(btn('Continue learning →', `${BASE_URL}/dashboard`))}
    ${spacer(12)}
    ${row(`<p style="margin:0;font-size:13px;color:#94A3B8;">Your progress is saved exactly where you left off.</p>`, 28)}
  `)
}

// ─── 5. Upgrade email (track completed, no subscription) ─────────────────────

function upgradeHtml(name: string, completedTrack: string): string {
  const features = [
    ['🗂️', 'All 10 role-specific tracks'],
    ['📜', 'Verified completion certificates'],
    ['🤖', 'AI-powered lesson recommendations'],
    ['📊', 'Weekly progress reports'],
    ['🔓', 'Advanced modules + real-world case studies'],
    ['👥', 'Team learning & leaderboard'],
  ]
  return baseHtml(`
    ${spacer(8)}
    ${row(infoBox(`🎉 <strong>You completed ${completedTrack}!</strong> You're now in the top 11% of AI-literate professionals on the platform.`, 'green'))}
    ${spacer(20)}
    ${row(`
      <h1 style="margin:0 0 10px;font-size:26px;font-weight:900;color:#0F172A;line-height:1.2;">Ready for the next level, ${name}?</h1>
      <p style="margin:0;font-size:15px;color:#475569;line-height:1.6;">You've proven you can do this. Upgrading to Pro unlocks the full library — so you can keep building on the momentum you've built.</p>
    `, 20)}
    ${row(`
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;">
        ${features.map(([icon, text], i) => `
          <tr>
            <td style="padding:11px 16px;${i < features.length - 1 ? 'border-bottom:1px solid #F1F5F9;' : ''}vertical-align:middle;width:32px;font-size:16px;">${icon}</td>
            <td style="padding:11px 16px 11px 4px;${i < features.length - 1 ? 'border-bottom:1px solid #F1F5F9;' : ''}font-size:14px;color:#334155;font-weight:500;">${text}</td>
          </tr>`).join('')}
      </table>
    `, 20)}
    ${row(`
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:12px;">
        <tr>
          <td style="padding:16px 20px;">
            <p style="margin:0 0 2px;font-size:22px;font-weight:900;color:#0F172A;">$12.99<span style="font-size:14px;font-weight:500;color:#64748B;">/month</span> &nbsp; <span style="font-size:14px;font-weight:500;color:#64748B;">or</span> &nbsp; $119.88<span style="font-size:14px;font-weight:500;color:#64748B;">/year</span></p>
            <p style="margin:0;font-size:13px;color:#64748B;">Cancel anytime &nbsp;·&nbsp; 7-day free trial included</p>
          </td>
        </tr>
      </table>
    `, 20)}
    ${row(btn('Upgrade to Pro →', `${BASE_URL}/#pricing`))}
    ${spacer(12)}
    ${row(`<p style="margin:0;font-size:12px;color:#94A3B8;">No long-term commitment. Cancel or downgrade anytime.</p>`, 28)}
  `)
}

// ─── 6. Weekly digest ─────────────────────────────────────────────────────────

export interface WeeklyStats {
  thisWeekLessons: number
  totalLessons: number
  streak: number
  srDue: number
  trackLabel?: string
  nextLessonTitle?: string
  nextLessonUrl?: string
  unsubscribeUrl: string
}

function weeklyDigestHtml(name: string, stats: WeeklyStats): string {
  const { thisWeekLessons, totalLessons, streak, srDue, trackLabel, nextLessonTitle, nextLessonUrl, unsubscribeUrl } = stats

  const streakColor = streak >= 7 ? '#F97316' : streak > 0 ? '#F59E0B' : '#94A3B8'
  const streakDisplay = streak > 0 ? `🔥 ${streak}` : '–'

  const heroMsg = thisWeekLessons === 0
    ? 'No lessons this week yet. Your progress is exactly where you left it — jump back in today.'
    : thisWeekLessons === 1
    ? 'You completed <strong>1 lesson</strong> this week. One more today keeps your momentum going.'
    : `You completed <strong>${thisWeekLessons} lessons</strong> this week — that puts you ahead of 73% of learners on the platform.`

  return baseHtml(`
    ${spacer(8)}
    ${row(`
      <h1 style="margin:0 0 10px;font-size:24px;font-weight:900;color:#0F172A;line-height:1.2;">
        ${thisWeekLessons > 0 ? `${thisWeekLessons} lesson${thisWeekLessons !== 1 ? 's' : ''} this week, ${name} 🎯` : `Your weekly update, ${name}`}
      </h1>
      <p style="margin:0;font-size:15px;color:#475569;line-height:1.6;">${heroMsg}</p>
    `, 20)}
    ${row(statsGrid([
      { value: String(thisWeekLessons), label: 'This week', color: thisWeekLessons > 0 ? '#2563EB' : '#94A3B8' },
      { value: streakDisplay, label: streak > 0 ? `${streak}-day streak` : 'No streak yet', color: streakColor },
      { value: String(totalLessons), label: 'Total lessons', color: '#0F172A' },
    ]))}
    ${spacer(4)}
    ${nextLessonTitle && nextLessonUrl ? `
    ${row(`
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#FFFFFF;border:1px solid #BFDBFE;border-radius:12px;">
        <tr>
          <td style="padding:16px 20px;">
            <p style="margin:0 0 3px;font-size:11px;font-weight:700;color:#2563EB;text-transform:uppercase;letter-spacing:1px;">Up next</p>
            <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#0F172A;">${nextLessonTitle}</p>
            <p style="margin:0;font-size:13px;color:#94A3B8;">${trackLabel ?? 'Your track'} &nbsp;·&nbsp; ~15 min</p>
          </td>
        </tr>
      </table>
    `)}
    ${spacer(4)}` : ''}
    ${srDue > 0 ? `
    ${row(infoBox(`🃏 <strong>${srDue} card${srDue !== 1 ? 's' : ''} due for review</strong> — 5 minutes of spaced repetition locks in what you've learned.`, 'amber'))}
    ${spacer(4)}` : ''}
    ${row(btn(nextLessonTitle ? 'Continue learning →' : 'Go to my dashboard →', nextLessonUrl ?? `${BASE_URL}/dashboard`))}
    ${spacer(12)}
    ${row(`<p style="margin:0;font-size:12px;color:#CBD5E1;text-align:center;"><a href="${unsubscribeUrl}" style="color:#CBD5E1;text-decoration:underline;">Unsubscribe from weekly digests</a></p>`, 28)}
  `)
}

// ─── 7. Team invite ───────────────────────────────────────────────────────────

function teamInviteHtml(inviterName: string, teamName: string, joinUrl: string, assignedTracks?: string[]): string {
  return baseHtml(`
    ${spacer(8)}
    ${row(`
      <h1 style="margin:0 0 10px;font-size:26px;font-weight:900;color:#0F172A;line-height:1.2;">You've been invited to join ${teamName}</h1>
      <p style="margin:0;font-size:15px;color:#475569;line-height:1.6;"><strong>${inviterName}</strong> has invited you to learn AI on OpusLearn — the professional AI training platform built for people who work in business, not engineering.</p>
    `, 20)}
    ${assignedTracks && assignedTracks.length > 0 ? row(infoBox(`📚 <strong>Your assigned track${assignedTracks.length > 1 ? 's' : ''}:</strong> ${assignedTracks.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}`, 'blue')) + spacer(20) : ''}
    ${row(`
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        ${[
          ['⚡', '15 minutes a day is all it takes'],
          ['🏆', 'Earn XP, badges and certificates'],
          ['📊', 'Track your team\'s progress together'],
        ].map(([icon, text]) => `
          <tr>
            <td style="padding:5px 10px 5px 0;font-size:14px;color:#475569;vertical-align:top;white-space:nowrap;">${icon}</td>
            <td style="padding:5px 0;font-size:14px;color:#475569;">${text}</td>
          </tr>`).join('')}
      </table>
    `, 20)}
    ${row(btn('Accept invitation →', joinUrl))}
    ${spacer(12)}
    ${row(`
      <p style="margin:0;font-size:12px;color:#94A3B8;">Or paste this link: <a href="${joinUrl}" style="color:#64748B;word-break:break-all;">${joinUrl}</a><br>This invitation expires in 7 days.</p>
    `, 28)}
  `)
}

// ─── 8. Team nudge (admin → inactive team member) ────────────────────────────

function nudgeHtml(memberName: string, teamName: string, adminName: string, unsubUrl: string): string {
  return baseHtml(`
    ${spacer(8)}
    ${row(`
      <h1 style="margin:0 0 10px;font-size:26px;font-weight:900;color:#0F172A;line-height:1.2;">Hey ${memberName}, your team misses you 👋</h1>
      <p style="margin:0;font-size:15px;color:#475569;line-height:1.6;"><strong>${adminName}</strong> from <strong>${teamName}</strong> noticed you haven't been on recently and wanted to check in. Your learning path is still there — pick up exactly where you left off.</p>
    `, 20)}
    ${row(infoBox(`⚡ <strong>Even 15 minutes today</strong> keeps your streak alive and your team moving together.`, 'blue'))}
    ${spacer(20)}
    ${row(btn('Jump back in →', `${BASE_URL}/dashboard`))}
    ${spacer(12)}
    ${row(`<p style="margin:0;font-size:12px;color:#94A3B8;">Sent by your team admin on behalf of ${teamName}.</p>`, 28)}
  `, `<a href="${unsubUrl}" style="color:#94A3B8;text-decoration:underline;font-size:12px;">Unsubscribe from team nudges</a>`)
}

// ─── Send functions ───────────────────────────────────────────────────────────

export type EmailSequence = 'signup' | 'welcome' | 'activation' | 'reengagement' | 'upgrade'

async function send(to: string, subject: string, html: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false
  const { error } = await getResend().emails.send({ from: FROM, to, subject, html })
  return !error
}

export function sendSignupEmail(to: string, name: string): Promise<boolean> {
  return send(to, `Welcome to OpusLearn, ${name} — let's get started`, signupHtml(name))
}

export function sendWelcomeEmail(to: string, name: string, trackLabel: string): Promise<boolean> {
  return send(to, `Your ${trackLabel} learning path is ready, ${name} ⚡`, welcomeHtml(name, trackLabel))
}

export function sendLeadWelcomeEmail(to: string, name: string): Promise<boolean> {
  return send(to, `Your personalised AI learning path is ready, ${name}`, leadWelcomeHtml(name, to))
}

export function sendActivationEmail(to: string, name: string): Promise<boolean> {
  return send(to, `${name}, your AI learning path is waiting`, activationHtml(name))
}

export function sendReengagementEmail(to: string, name: string, streak: number, lessonsLeft: number): Promise<boolean> {
  return send(to, `Miss you, ${name} — ${lessonsLeft} lesson${lessonsLeft !== 1 ? 's' : ''} left in your track`, reengagementHtml(name, streak, lessonsLeft))
}

export function sendUpgradeEmail(to: string, name: string, completedTrack: string): Promise<boolean> {
  return send(to, `🎉 You completed ${completedTrack} — here's what's next`, upgradeHtml(name, completedTrack))
}

export function sendTeamInviteEmail(to: string, inviterName: string, teamName: string, joinUrl: string, assignedTracks?: string[]): Promise<boolean> {
  return send(to, `${inviterName} invited you to join ${teamName} on OpusLearn`, teamInviteHtml(inviterName, teamName, joinUrl, assignedTracks))
}

export function sendNudgeEmail(to: string, memberName: string, teamName: string, adminName: string, unsubUrl: string): Promise<boolean> {
  return send(to, `${adminName} from ${teamName} is checking in on you`, nudgeHtml(memberName, teamName, adminName, unsubUrl))
}

// ─── Weekly digest ────────────────────────────────────────────────────────────

function weeklySubject(name: string, thisWeek: number): string {
  if (thisWeek === 0) return `Time to get back on track, ${name} 👋`
  if (thisWeek === 1) return `1 lesson this week — keep going, ${name}!`
  if (thisWeek < 4) return `${thisWeek} lessons this week, ${name} — you're building momentum 🎯`
  return `${thisWeek} lessons this week, ${name} — that's a strong week 🔥`
}

export function sendWeeklyDigestEmail(to: string, name: string, stats: WeeklyStats): Promise<boolean> {
  return send(to, weeklySubject(name, stats.thisWeekLessons), weeklyDigestHtml(name, stats))
}
