import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}
const FROM = 'OpusLearn <onboarding@resend.dev>'
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opuslearn.ai'

export type EmailSequence = 'welcome' | 'activation' | 'reengagement' | 'upgrade'

// ─── Templates ────────────────────────────────────────────────────────────────

function baseHtml(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#EFF6FF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#EFF6FF;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:16px;border:1px solid #E2E8F0;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        <!-- Header -->
        <tr><td style="background:#2563EB;padding:4px 0;"></td></tr>
        <tr><td style="padding:28px 36px 20px;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#2563EB;width:28px;height:28px;border-radius:8px;text-align:center;vertical-align:middle;">
                <span style="color:#fff;font-size:14px;">⚡</span>
              </td>
              <td style="padding-left:10px;font-size:14px;font-weight:900;color:#0F172A;letter-spacing:-0.3px;">OpusLearn</td>
            </tr>
          </table>
        </td></tr>
        <!-- Content -->
        ${content}
        <!-- Footer -->
        <tr><td style="padding:24px 36px;border-top:1px solid #F1F5F9;text-align:center;">
          <p style="margin:0;font-size:12px;color:#94A3B8;">
            You're receiving this because you signed up at opuslearn.ai.<br>
            <a href="${BASE_URL}/unsubscribe" style="color:#94A3B8;">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function btn(text: string, href: string): string {
  return `<a href="${href}" style="display:inline-block;background:#2563EB;color:#fff;font-weight:600;font-size:14px;padding:14px 28px;border-radius:10px;text-decoration:none;box-shadow:0 4px 16px rgba(37,99,235,0.25);">${text}</a>`
}

function row(content: string): string {
  return `<tr><td style="padding:0 36px 20px;">${content}</td></tr>`
}

// ─── Sequence builders ────────────────────────────────────────────────────────

function welcomeHtml(name: string, trackLabel: string): string {
  return baseHtml(`
    ${row(`<h1 style="margin:0 0 8px;font-size:26px;font-weight:900;color:#0F172A;line-height:1.15;">Welcome, ${name}! 👋</h1>
           <p style="margin:0;font-size:15px;color:#64748B;line-height:1.6;">Your personalised <strong>${trackLabel}</strong> learning path is ready. It takes most professionals just 15 minutes a day to transform how they work with AI.</p>`)}
    ${row(`<table cellpadding="0" cellspacing="0" style="background:#EFF6FF;border:1px solid #DBEAFE;border-radius:12px;width:100%;">
             <tr><td style="padding:20px 24px;">
               <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#2563EB;text-transform:uppercase;letter-spacing:1px;">Your first lesson</p>
               <p style="margin:0 0 16px;font-size:15px;font-weight:600;color:#0F172A;">AI Fundamentals for Business Professionals</p>
               <p style="margin:0;font-size:13px;color:#94A3B8;">12 min · No technical background needed</p>
             </td></tr>
           </table>`)}
    ${row(btn('Start my first lesson →', `${BASE_URL}/dashboard`))}
    ${row(`<table cellpadding="0" cellspacing="0">
             ${['✅ Free forever — no credit card needed', '⚡ 15 min/day is all it takes', '🏆 Earn XP and certificates'].map(t => `<tr><td style="padding:4px 0;font-size:13px;color:#64748B;">${t}</td></tr>`).join('')}
           </table>`)}`
  )
}

function activationHtml(name: string): string {
  return baseHtml(`
    ${row(`<h1 style="margin:0 0 8px;font-size:24px;font-weight:900;color:#0F172A;">Your path is waiting, ${name}</h1>
           <p style="margin:0;font-size:15px;color:#64748B;line-height:1.6;">You completed your AI assessment but haven't started your first lesson yet. Professionals who start within 24 hours are <strong>4× more likely</strong> to finish their track.</p>`)}
    ${row(`<table cellpadding="0" cellspacing="0" style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:12px;width:100%;">
             <tr><td style="padding:16px 20px;">
               <p style="margin:0;font-size:14px;color:#92400E;">⏱️ <strong>Your personalised plan expires in 48 hours</strong> — we'll reset it if you don't start soon.</p>
             </td></tr>
           </table>`)}
    ${row(btn('Pick up where I left off →', `${BASE_URL}/dashboard`))}
    ${row(`<p style="margin:0;font-size:13px;color:#94A3B8;">Takes just 12 minutes to complete your first lesson.</p>`)}`
  )
}

function reengagementHtml(name: string, streak: number, lessonsLeft: number): string {
  return baseHtml(`
    ${row(`<h1 style="margin:0 0 8px;font-size:24px;font-weight:900;color:#0F172A;">Miss you, ${name} 👀</h1>
           <p style="margin:0;font-size:15px;color:#64748B;line-height:1.6;">It's been a week since you last logged in. You have <strong>${lessonsLeft} lessons left</strong> to complete your track — you're closer than you think.</p>`)}
    ${streak > 0 ? row(`<table cellpadding="0" cellspacing="0" style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:12px;width:100%;">
             <tr><td style="padding:16px 20px;">
               <p style="margin:0;font-size:14px;color:#92400E;">🔥 You had a <strong>${streak}-day streak</strong>. Don't let it reset to zero.</p>
             </td></tr>
           </table>`) : ''}
    ${row(btn('Continue learning →', `${BASE_URL}/dashboard`))}
    ${row(`<p style="margin:0;font-size:13px;color:#94A3B8;">Your progress is saved. Jump right back in.</p>`)}`
  )
}

function upgradeHtml(name: string, completedTrack: string): string {
  return baseHtml(`
    ${row(`<h1 style="margin:0 0 8px;font-size:24px;font-weight:900;color:#0F172A;">🎉 You completed ${completedTrack}!</h1>
           <p style="margin:0;font-size:15px;color:#64748B;line-height:1.6;">${name}, you're now ahead of 89% of your peers in AI literacy. Here's what upgrading to Pro unlocks for you:</p>`)}
    ${row(`<table cellpadding="0" cellspacing="0" style="width:100%;">
             ${['🗂️ All 10 role-specific tracks', '📜 Verified completion certificates', '🤖 AI-powered lesson recommendations', '📊 Weekly progress reports', '🔓 Advanced modules + case studies'].map(f =>
               `<tr><td style="padding:6px 0;font-size:14px;color:#334155;border-bottom:1px solid #F1F5F9;">${f}</td></tr>`
             ).join('')}
           </table>`)}
    ${row(`<div style="margin-top:8px;">${btn('Upgrade to Pro — $19/mo →', `${BASE_URL}/#pricing`)}</div>`)}
    ${row(`<p style="margin:0;font-size:12px;color:#94A3B8;">Cancel anytime. 30-day money-back guarantee.</p>`)}`
  )
}

// ─── Send functions ───────────────────────────────────────────────────────────

export async function sendWelcomeEmail(to: string, name: string, trackLabel: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false
  const { error } = await getResend().emails.send({
    from: FROM,
    to,
    subject: `Welcome to OpusLearn, ${name}! Your path is ready ⚡`,
    html: welcomeHtml(name, trackLabel),
  })
  return !error
}

export async function sendActivationEmail(to: string, name: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false
  const { error } = await getResend().emails.send({
    from: FROM,
    to,
    subject: `${name}, your AI learning path is waiting`,
    html: activationHtml(name),
  })
  return !error
}

export async function sendReengagementEmail(
  to: string, name: string, streak: number, lessonsLeft: number,
): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false
  const { error } = await getResend().emails.send({
    from: FROM,
    to,
    subject: `Miss you, ${name} — ${lessonsLeft} lessons left in your track`,
    html: reengagementHtml(name, streak, lessonsLeft),
  })
  return !error
}

export async function sendUpgradeEmail(to: string, name: string, completedTrack: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false
  const { error } = await getResend().emails.send({
    from: FROM,
    to,
    subject: `🎉 You completed ${completedTrack} — here's what's next`,
    html: upgradeHtml(name, completedTrack),
  })
  return !error
}

// ─── Weekly digest ─────────────────────────────────────────────────────────────

export interface WeeklyStats {
  thisWeekLessons: number  // lessons completed since last digest
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
  const streakEmoji = streak >= 7 ? '🔥' : streak > 0 ? '⚡' : '💤'
  const streakLabel = streak > 0 ? `${streak}-day streak` : 'No streak yet'

  const heroMsg = thisWeekLessons === 0
    ? `No lessons this week yet — your progress is waiting where you left off.`
    : thisWeekLessons === 1
    ? `You completed <strong>1 lesson</strong> this week. One more today keeps your momentum going.`
    : `You completed <strong>${thisWeekLessons} lessons</strong> this week — that's ahead of 73% of learners.`

  return baseHtml(`
    ${row(`
      <h1 style="margin:0 0 6px;font-size:24px;font-weight:900;color:#0F172A;line-height:1.2;">
        ${thisWeekLessons > 0 ? `${thisWeekLessons} lesson${thisWeekLessons !== 1 ? 's' : ''} this week, ${name} 🎯` : `Your weekly update, ${name}`}
      </h1>
      <p style="margin:0;font-size:15px;color:#64748B;line-height:1.6;">${heroMsg}</p>
    `)}

    ${row(`
      <table cellpadding="0" cellspacing="0" style="background:#EFF6FF;border:1px solid #E2E8F0;border-radius:12px;width:100%;">
        <tr>
          <td style="padding:18px 20px;border-right:1px solid #E2E8F0;text-align:center;width:33%;">
            <p style="margin:0 0 3px;font-size:30px;font-weight:900;color:#2563EB;">${thisWeekLessons}</p>
            <p style="margin:0;font-size:11px;font-weight:600;color:#64748B;text-transform:uppercase;letter-spacing:0.5px;">This week</p>
          </td>
          <td style="padding:18px 20px;border-right:1px solid #E2E8F0;text-align:center;width:33%;">
            <p style="margin:0 0 3px;font-size:30px;font-weight:900;color:${streakColor};">${streakEmoji} ${streak}</p>
            <p style="margin:0;font-size:11px;font-weight:600;color:#64748B;text-transform:uppercase;letter-spacing:0.5px;">${streakLabel}</p>
          </td>
          <td style="padding:18px 20px;text-align:center;width:33%;">
            <p style="margin:0 0 3px;font-size:30px;font-weight:900;color:#0F172A;">${totalLessons}</p>
            <p style="margin:0;font-size:11px;font-weight:600;color:#64748B;text-transform:uppercase;letter-spacing:0.5px;">Total lessons</p>
          </td>
        </tr>
      </table>
    `)}

    ${nextLessonTitle && nextLessonUrl ? row(`
      <table cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #DBEAFE;border-radius:12px;width:100%;">
        <tr><td style="padding:16px 20px;">
          <p style="margin:0 0 2px;font-size:11px;font-weight:700;color:#2563EB;text-transform:uppercase;letter-spacing:1px;">Up next</p>
          <p style="margin:0 0 12px;font-size:15px;font-weight:600;color:#0F172A;">${nextLessonTitle}</p>
          <p style="margin:0;font-size:13px;color:#94A3B8;">${trackLabel ?? 'Your track'} · ~15 min</p>
        </td></tr>
      </table>
    `) : ''}

    ${srDue > 0 ? row(`
      <table cellpadding="0" cellspacing="0" style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:12px;width:100%;">
        <tr><td style="padding:14px 20px;">
          <p style="margin:0;font-size:14px;color:#92400E;">🃏 <strong>${srDue} card${srDue !== 1 ? 's' : ''} due for review</strong> — 5 minutes now locks in what you've learned.</p>
        </td></tr>
      </table>
    `) : ''}

    ${row(btn(nextLessonTitle ? 'Continue learning →' : 'Go to my dashboard →', nextLessonUrl ?? `${BASE_URL}/dashboard`))}

    ${row(`<p style="margin:0;font-size:12px;color:#CBD5E1;text-align:center;">
      <a href="${unsubscribeUrl}" style="color:#CBD5E1;text-decoration:underline;">Unsubscribe from weekly digests</a>
    </p>`)}
  `)
}

// ─── Team nudge ───────────────────────────────────────────────────────────────

function nudgeHtml(memberName: string, teamName: string, adminName: string, unsubUrl: string): string {
  return baseHtml(`
    ${row(`<h1 style="margin:0 0 8px;font-size:24px;font-weight:900;color:#0F172A;">Hey ${memberName}, your team misses you 👋</h1>
           <p style="margin:0;font-size:15px;color:#64748B;line-height:1.6;"><strong>${adminName}</strong> from <strong>${teamName}</strong> noticed you haven't been on recently and wanted to check in. Your learning path is still waiting — pick up right where you left off.</p>`)}
    ${row(`<table cellpadding="0" cellspacing="0" style="background:#EFF6FF;border:1px solid #DBEAFE;border-radius:12px;width:100%;">
             <tr><td style="padding:16px 20px;">
               <p style="margin:0;font-size:14px;color:#1E3A8A;">⚡ Your progress is saved. Even 15 minutes today keeps your streak alive.</p>
             </td></tr>
           </table>`)}
    ${row(btn('Jump back in →', `${BASE_URL}/dashboard`))}
    ${row(`<p style="margin:0;font-size:12px;color:#CBD5E1;text-align:center;">Sent by your team admin · <a href="${unsubUrl}" style="color:#CBD5E1;">Unsubscribe</a></p>`)}
  `)
}

export async function sendNudgeEmail(
  to: string, memberName: string, teamName: string, adminName: string, unsubUrl: string,
): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false
  const { error } = await getResend().emails.send({
    from: FROM,
    to,
    subject: `${adminName} from ${teamName} is checking in on you`,
    html: nudgeHtml(memberName, teamName, adminName, unsubUrl),
  })
  return !error
}

function weeklySubject(name: string, thisWeek: number): string {
  if (thisWeek === 0) return `Time to get back on track, ${name} 👋`
  if (thisWeek === 1) return `1 lesson this week — keep going, ${name}!`
  if (thisWeek < 4) return `${thisWeek} lessons this week, ${name} — you're building momentum 🎯`
  return `${thisWeek} lessons this week, ${name} — that's a strong week 🔥`
}

export async function sendWeeklyDigestEmail(
  to: string,
  name: string,
  stats: WeeklyStats,
): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false
  const { error } = await getResend().emails.send({
    from: FROM,
    to,
    subject: weeklySubject(name, stats.thisWeekLessons),
    html: weeklyDigestHtml(name, stats),
  })
  return !error
}
