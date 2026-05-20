import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? 'antoine.boudic@gmail.com')
  .split(',').map(e => e.trim().toLowerCase()).filter(Boolean)

// ── Auth helper ───────────────────────────────────────────────────────────────

async function requireAdmin(): Promise<NextResponse | null> {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const email = (session.user.email ?? '').toLowerCase()
  if (!ADMIN_EMAILS.includes(email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 401 })
  }
  return null
}

// ── GET /api/admin/impersonate?userId=<id> ────────────────────────────────────

export async function GET(req: NextRequest) {
  const authError = await requireAdmin()
  if (authError) return authError

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'userId query parameter is required' }, { status: 400 })
  }

  const admin = createAdminClient()

  // Fetch the target user
  const { data: { user }, error: userError } = await admin.auth.admin.getUserById(userId)
  if (userError || !user) {
    return NextResponse.json({ error: userError?.message ?? 'User not found' }, { status: 404 })
  }

  if (!user.email) {
    return NextResponse.json({ error: 'Target user has no email address' }, { status: 400 })
  }

  // Generate magic link
  const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
    type: 'magiclink',
    email: user.email,
  })

  if (linkError || !linkData?.properties?.action_link) {
    return NextResponse.json({ error: linkError?.message ?? 'Failed to generate magic link' }, { status: 500 })
  }

  const actionLink = linkData.properties.action_link
  const displayName = (user.user_metadata as { full_name?: string })?.full_name ?? user.email

  // Return confirmation HTML in the admin dark theme
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Impersonate — AI Literacy Admin</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      background: #0F172A;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      padding: 24px;
    }
    .card {
      background: #1E293B;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 40px;
      max-width: 440px;
      width: 100%;
      text-align: center;
    }
    .logo {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 32px;
    }
    .logo-icon {
      width: 32px;
      height: 32px;
      border-radius: 9px;
      background: linear-gradient(135deg, #2563EB, #22D3EE);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo-text {
      font-size: 15px;
      font-weight: 800;
      color: #FFFFFF;
    }
    .warning-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(234, 179, 8, 0.1);
      border: 1px solid rgba(234, 179, 8, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      font-size: 22px;
    }
    .title {
      font-size: 18px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }
    .subtitle {
      font-size: 13px;
      color: #64748B;
      line-height: 1.5;
      margin-bottom: 24px;
    }
    .user-box {
      background: #0F172A;
      border: 1px solid #1E293B;
      border-radius: 10px;
      padding: 14px 18px;
      margin-bottom: 28px;
      text-align: left;
    }
    .user-label {
      font-size: 11px;
      font-weight: 600;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 4px;
    }
    .user-name {
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 2px;
    }
    .user-email {
      font-size: 12px;
      color: #64748B;
    }
    .user-id {
      font-size: 11px;
      color: #334155;
      font-family: monospace;
      margin-top: 6px;
    }
    .btn-continue {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 12px 28px;
      border-radius: 10px;
      background: #EAB308;
      color: #0F172A;
      text-decoration: none;
      font-size: 14px;
      font-weight: 700;
      width: 100%;
      margin-bottom: 10px;
      transition: opacity 0.15s;
    }
    .btn-continue:hover { opacity: 0.88; }
    .btn-cancel {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 11px 28px;
      border-radius: 10px;
      background: transparent;
      border: 1px solid #334155;
      color: #64748B;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      width: 100%;
      transition: border-color 0.15s;
    }
    .btn-cancel:hover { border-color: #475569; color: #94A3B8; }
    .notice {
      margin-top: 20px;
      font-size: 11px;
      color: #334155;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">
      <div class="logo-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      </div>
      <span class="logo-text">AI Literacy Admin</span>
    </div>

    <div class="warning-icon">⚠️</div>
    <h1 class="title">Impersonate User</h1>
    <p class="subtitle">
      You are about to sign in as this user. You will be fully authenticated as them in the app.
    </p>

    <div class="user-box">
      <p class="user-label">Target account</p>
      <p class="user-name">${escapeHtml(displayName)}</p>
      <p class="user-email">${escapeHtml(user.email)}</p>
      <p class="user-id">${escapeHtml(user.id)}</p>
    </div>

    <a href="${escapeAttr(actionLink)}" class="btn-continue">
      Continue — sign in as this user
    </a>
    <a href="/admin" class="btn-cancel">Cancel</a>

    <p class="notice">
      This magic link is single-use and expires in 24 hours.
      You will be logged out of your admin account upon clicking continue.
    </p>
  </div>
</body>
</html>`

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}

// ── Escape helpers to prevent XSS in the generated HTML ──────────────────────

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
}
