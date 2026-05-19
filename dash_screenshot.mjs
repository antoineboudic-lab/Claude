import { chromium } from './node_modules/playwright/index.mjs'
import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs'
const { stringToBase64URL } = await import('./node_modules/@supabase/ssr/dist/main/utils/base64url.js')

const SUPABASE_URL = 'https://xqmgonqnqqzhuaivfgsj.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxbWdvbnFucXF6aHVhaXZmZ3NqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODk5ODEzNCwiZXhwIjoyMDk0NTc0MTM0fQ.ixDZvTDs7aDKlxvTq_P_hQhqdVGP6aEz58wwtLKJPz4'
const COOKIE_NAME = 'sb-xqmgonqnqqzhuaivfgsj-auth-token'

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const { data, error } = await admin.auth.admin.generateLink({
  type: 'magiclink', email: 'antoine.boudic@gmail.com',
  options: { redirectTo: 'http://localhost:3000/' }
})
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

// Full valid AssessmentResult matching the AssessmentResult type
const assessmentResult = {
  answers: {
    name: 'Antoine',
    role: 'marketing',
    subRole: 'Content Marketing Manager',
    roleDescription: 'I manage content strategy and creation for a B2B SaaS company',
    industry: 'technology',
    companySize: 'scaleup',
    currentTools: ['chatgpt'],
    experience: 'some',
    skillScore: 1,
    challenge: 'Creating consistent high-quality content at scale',
    goals: ['save-time', 'better-content', 'competitive-advantage'],
    timePerWeek: 'moderate'
  },
  primaryTrackId: 'marketing',
  customPath: [
    { trackId: 'marketing', lessonId: 'marketing-m1-l1', moduleId: 'marketing-m1', lessonTitle: "What AI Actually Is (and Isn't) for Marketers", moduleTitle: 'AI Fundamentals for Marketers', moduleIndex: 0, lessonIndex: 0, score: 95, priority: 'essential' },
    { trackId: 'marketing', lessonId: 'marketing-m1-l2', moduleId: 'marketing-m1', lessonTitle: 'Picking Your AI Toolkit', moduleTitle: 'AI Fundamentals for Marketers', moduleIndex: 0, lessonIndex: 1, score: 92, priority: 'essential' },
    { trackId: 'marketing', lessonId: 'marketing-m1-l3', moduleId: 'marketing-m1', lessonTitle: 'Prompt Engineering Basics', moduleTitle: 'AI Fundamentals for Marketers', moduleIndex: 0, lessonIndex: 2, score: 90, priority: 'essential' },
    { trackId: 'marketing', lessonId: 'marketing-m2-l1', moduleId: 'marketing-m2', lessonTitle: 'AI for Blog Posts and Long-Form Content', moduleTitle: 'Content Creation at Speed', moduleIndex: 1, lessonIndex: 0, score: 88, priority: 'essential' },
    { trackId: 'marketing', lessonId: 'marketing-m2-l2', moduleId: 'marketing-m2', lessonTitle: 'Social Media Content at Scale', moduleTitle: 'Content Creation at Speed', moduleIndex: 1, lessonIndex: 1, score: 85, priority: 'essential' },
    { trackId: 'marketing', lessonId: 'marketing-m3-l1', moduleId: 'marketing-m3', lessonTitle: 'AI-Assisted Campaign Planning', moduleTitle: 'Campaign Strategy & Planning', moduleIndex: 2, lessonIndex: 0, score: 82, priority: 'recommended' },
    { trackId: 'marketing', lessonId: 'marketing-m3-l2', moduleId: 'marketing-m3', lessonTitle: 'Audience Research with AI', moduleTitle: 'Campaign Strategy & Planning', moduleIndex: 2, lessonIndex: 1, score: 78, priority: 'recommended' },
  ],
  estimatedWeeks: 4,
  totalLessons: 7,
  essentialCount: 5,
  reasoning: 'Based on your content marketing role and intermediate AI experience, I\'ve prioritised practical content creation workflows over fundamentals you may already know.'
}

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })

await ctx.addCookies([{
  name: COOKIE_NAME, value: encoded,
  domain: 'localhost', path: '/', secure: false, httpOnly: false,
  sameSite: 'Lax', expires: expiresAt + 3600,
}])

const page = await ctx.newPage()
page.on('console', msg => {
  const t = msg.text()
  if (!t.includes('React DevTools') && !t.includes('HMR') && !t.includes('Download') && !t.includes('Multiple GoTrueClient')) {
    console.log('[browser]', msg.type(), t.slice(0, 200))
  }
})

await page.addInitScript(({ assessment }) => {
  localStorage.setItem('ai-literacy-assessment', JSON.stringify(assessment))
}, { assessment: assessmentResult })

await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle', timeout: 60000 })
console.log('url:', page.url())

await page.waitForTimeout(2000)
console.log('url after settle:', page.url())

await page.screenshot({ path: '/tmp/dash1.png' })
await page.evaluate(() => window.scrollTo(0, 600))
await page.waitForTimeout(400)
await page.screenshot({ path: '/tmp/dash2.png' })
await page.evaluate(() => window.scrollTo(0, 1300))
await page.waitForTimeout(400)
await page.screenshot({ path: '/tmp/dash3.png' })

await browser.close()
console.log('done')
