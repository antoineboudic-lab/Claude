import { chromium } from './node_modules/playwright/index.mjs'
import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs'
const { stringToBase64URL } = await import('./node_modules/@supabase/ssr/dist/main/utils/base64url.js')

const fs = await import('fs')
const env = fs.readFileSync('.env.local', 'utf8')
const SUPABASE_URL = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim()
const SERVICE_KEY = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim()
const projectRef = new URL(SUPABASE_URL).hostname.split('.')[0]
const COOKIE_NAME = `sb-${projectRef}-auth-token`

const admin = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { autoRefreshToken: false, persistSession: false } })
const { data, error } = await admin.auth.admin.generateLink({
  type: 'magiclink', email: 'antoine.boudic@gmail.com',
  options: { redirectTo: 'http://localhost:3000/' }
})
if (error) { console.error(error); process.exit(1) }
const resp = await fetch(data.properties.action_link, { redirect: 'manual' })
const hash = (resp.headers.get('location') ?? '').split('#')[1] ?? ''
const params = new URLSearchParams(hash)
const accessToken = params.get('access_token')
const expiresAt = parseInt(params.get('expires_at') ?? '0', 10)
if (!accessToken) { console.error('no token, location:', resp.headers.get('location')); process.exit(1) }
const { data: { user } } = await admin.auth.admin.getUserById(data.user.id)
const session = { access_token: accessToken, token_type: 'bearer', expires_in: 3600, expires_at: expiresAt, refresh_token: params.get('refresh_token'), user }
const encoded = 'base64-' + stringToBase64URL(JSON.stringify(session))

const assessmentResult = {
  answers: {
    name: 'Antoine', role: 'marketing', subRole: 'Content Marketing Manager',
    roleDescription: 'I manage content strategy and creation for a B2B SaaS company',
    industry: 'technology', companySize: 'scaleup', currentTools: ['chatgpt'],
    experience: 'some', skillScore: 1,
    challenge: 'Creating consistent high-quality content at scale',
    goals: ['save-time', 'better-content', 'competitive-advantage'], timePerWeek: 'moderate'
  },
  primaryTrackId: 'marketing',
  customPath: [
    { trackId: 'marketing', lessonId: 'marketing-m1-l1', moduleId: 'marketing-m1', lessonTitle: "What AI Actually Is (and Isn't) for Marketers", moduleTitle: 'AI Fundamentals for Marketers', moduleIndex: 0, lessonIndex: 0, score: 95, priority: 'essential' },
    { trackId: 'marketing', lessonId: 'marketing-m1-l2', moduleId: 'marketing-m1', lessonTitle: 'Picking Your AI Toolkit', moduleTitle: 'AI Fundamentals for Marketers', moduleIndex: 0, lessonIndex: 1, score: 92, priority: 'essential' },
    { trackId: 'marketing', lessonId: 'marketing-m1-l3', moduleId: 'marketing-m1', lessonTitle: 'Prompt Engineering Basics', moduleTitle: 'AI Fundamentals for Marketers', moduleIndex: 0, lessonIndex: 2, score: 90, priority: 'essential' },
  ],
  estimatedWeeks: 4, totalLessons: 7, essentialCount: 5,
  reasoning: 'Based on your content marketing role and intermediate AI experience.'
}

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const CHUNK = 3180
const cookies = []
for (let i = 0; i * CHUNK < encoded.length; i++) {
  cookies.push({ name: `${COOKIE_NAME}.${i}`, value: encoded.slice(i * CHUNK, (i + 1) * CHUNK) })
}
await ctx.addCookies(cookies.map(c => ({
  ...c, url: 'http://localhost:3000', sameSite: 'Lax',
})))
const page = await ctx.newPage()
await page.addInitScript(({ assessment }) => {
  localStorage.setItem('ai-literacy-assessment', JSON.stringify(assessment))
}, { assessment: assessmentResult })

// Dashboard FIRST (before client-side token rotation)
await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(2000)
console.log('dashboard url:', page.url())
for (const [i, y] of [0, 750, 1500].entries()) {
  await page.evaluate(y => window.scrollTo(0, y), y)
  await page.waitForTimeout(500)
  await page.screenshot({ path: `/tmp/audit2_dashboard_${i + 1}.png` })
}

// Lesson: walk the stepper
await page.goto('http://localhost:3000/tracks/marketing/lessons/marketing-m1-l3', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(1500)
// scroll to bottom of read tab, click Continue (goNext)
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(600)
await page.screenshot({ path: '/tmp/audit2_lesson_read_bottom.png' })
const cont = page.locator('button:has-text("Continue")').last()
if (await cont.count()) { await cont.click(); await page.waitForTimeout(1000) }
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(400)
await page.screenshot({ path: '/tmp/audit2_lesson_exercise.png' })
console.log('exercise tab')

// complete exercise checkboxes ("Mark done" buttons)
const markBtns = page.locator('button:has-text("Mark done")')
const n = await markBtns.count()
for (let i = 0; i < n; i++) { await markBtns.nth(0).click().catch(() => {}); await page.waitForTimeout(250) }
const markCont = page.locator('button:has-text("Mark done & continue")').first()
if (await markCont.count()) { await markCont.click().catch(() => {}); await page.waitForTimeout(1000) }
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(400)
await page.screenshot({ path: '/tmp/audit2_lesson_quiz.png' })
console.log('quiz tab url:', page.url())

// try to reach Lab step by clicking its stepper icon
const lab = page.locator('text=Apply').first()
if (await lab.count()) { await lab.click().catch(() => {}); await page.waitForTimeout(1000) }
await page.screenshot({ path: '/tmp/audit2_lesson_lab.png' })

// certificates
await page.goto('http://localhost:3000/certificates', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(1500)
await page.screenshot({ path: '/tmp/audit2_certificates.png' })
console.log('certificates url:', page.url())

await browser.close()
console.log('all done')
