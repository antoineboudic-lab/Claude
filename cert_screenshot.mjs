import { chromium } from './node_modules/playwright/index.mjs'
import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs'
const { stringToBase64URL } = await import('./node_modules/@supabase/ssr/dist/main/utils/base64url.js')

const SUPABASE_URL = 'https://xqmgonqnqqzhuaivfgsj.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxbWdvbnFucXF6aHVhaXZmZ3NqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODk5ODEzNCwiZXhwIjoyMDk0NTc0MTM0fQ.ixDZvTDs7aDKlxvTq_P_hQhqdVGP6aEz58wwtLKJPz4'
const COOKIE_NAME = 'sb-xqmgonqnqqzhuaivfgsj-auth-token'

const admin = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { autoRefreshToken: false, persistSession: false } })
const { data, error } = await admin.auth.admin.generateLink({ type: 'magiclink', email: 'antoine.boudic@gmail.com', options: { redirectTo: 'http://localhost:3000/' } })
if (error) { console.error(error); process.exit(1) }

const resp = await fetch(data.properties.action_link, { redirect: 'manual' })
const location = resp.headers.get('location') ?? ''
const hash = location.includes('#') ? location.split('#')[1] : ''
const urlParams = new URLSearchParams(hash)
const accessToken = urlParams.get('access_token')
const refreshToken = urlParams.get('refresh_token')
const expiresAt = parseInt(urlParams.get('expires_at') ?? '0', 10)
if (!accessToken) { console.error('no token'); process.exit(1) }

const { data: { user } } = await admin.auth.admin.getUserById('43b0c94d-8a33-45ad-9962-4709ba98d034')
const session = { access_token: accessToken, token_type: 'bearer', expires_in: 3600, expires_at: expiresAt, refresh_token: refreshToken, user }
const encoded = 'base64-' + stringToBase64URL(JSON.stringify(session))

const assessment = {
  answers: { name: 'Antoine Boudic', role: 'marketing', subRole: 'Content Marketing Manager', roleDescription: '', industry: 'technology', companySize: 'scaleup', currentTools: ['chatgpt'], experience: 'some', skillScore: 1, challenge: '', goals: [], timePerWeek: 'moderate' },
  primaryTrackId: 'marketing',
  customPath: [],
  estimatedWeeks: 4,
  totalLessons: 20,
  essentialCount: 5,
  reasoning: ''
}

// Game state with marketing track completed
const gameState = {
  xp: 1680,
  streak: 12,
  longestStreak: 14,
  lastActiveDate: new Date().toISOString().split('T')[0],
  activityDates: [new Date().toISOString().split('T')[0]],
  completedLessons: ['marketing-m1-l1','marketing-m1-l2','marketing-m1-l3','marketing-m1-l4','marketing-m2-l1','marketing-m2-l2','marketing-m2-l3','marketing-m2-l4','marketing-m3-l1','marketing-m3-l2','marketing-m3-l3','marketing-m3-l4','marketing-m4-l1','marketing-m4-l2','marketing-m4-l3','marketing-m4-l4','marketing-m5-l1','marketing-m5-l2','marketing-m5-l3','marketing-m5-l4'],
  completedModules: ['marketing-m1','marketing-m2','marketing-m3','marketing-m4','marketing-m5'],
  completedTracks: ['marketing'],
  earnedBadges: ['first_lesson','track_complete','module_complete','streak_7','streak_3'],
  totalQuizzesPerfect: 4,
}

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })

await ctx.addCookies([{ name: COOKIE_NAME, value: encoded, domain: 'localhost', path: '/', secure: false, httpOnly: false, sameSite: 'Lax', expires: expiresAt + 3600 }])

const page = await ctx.newPage()
await page.addInitScript(({ assessment, gameState }) => {
  localStorage.setItem('ai-literacy-assessment', JSON.stringify(assessment))
  localStorage.setItem('ai-literacy-game-state', JSON.stringify(gameState))
}, { assessment, gameState })

await page.goto('http://localhost:3000/certificates/marketing', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(1500)
await page.screenshot({ path: '/tmp/cert.png', fullPage: false })
console.log('done')
await browser.close()
