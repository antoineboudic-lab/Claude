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
const params = new URLSearchParams(hash)
const accessToken = params.get('access_token')
const refreshToken = params.get('refresh_token')
const expiresAt = parseInt(params.get('expires_at') ?? '0', 10)
if (!accessToken) { console.error('no token'); process.exit(1) }

const { data: { user } } = await admin.auth.admin.getUserById('43b0c94d-8a33-45ad-9962-4709ba98d034')
const session = { access_token: accessToken, token_type: 'bearer', expires_in: 3600, expires_at: expiresAt, refresh_token: refreshToken, user }
const encoded = 'base64-' + stringToBase64URL(JSON.stringify(session))

const today = new Date().toISOString().split('T')[0]

// SR queue with cards due today
const srQueue = [
  {
    id: 'marketing-m1-l1-q0',
    lessonId: 'marketing-m1-l1', trackId: 'marketing',
    lessonTitle: "What AI Actually Is (and Isn't) for Marketers",
    question: 'Which of the following best describes how large language models (LLMs) generate text?',
    options: ['They search the internet for relevant information', 'They predict the next most likely token based on patterns in training data', 'They retrieve pre-written answers from a database', 'They use logical rules programmed by engineers'],
    correct: 1,
    explanation: 'LLMs work by predicting the next token (word piece) based on statistical patterns learned during training — not by searching the internet or retrieving stored answers.',
    interval: 1, repetitions: 0, easeFactor: 2.5, nextReviewDate: today, lastReviewDate: null,
  },
  {
    id: 'marketing-m1-l1-q1',
    lessonId: 'marketing-m1-l1', trackId: 'marketing',
    lessonTitle: "What AI Actually Is (and Isn't) for Marketers",
    question: 'What is the main limitation marketers should keep in mind when using AI-generated content?',
    options: ['AI cannot write in different tones', 'AI may produce confident-sounding but inaccurate information', 'AI only works for short-form content', 'AI requires internet access to generate text'],
    correct: 1,
    explanation: 'AI models can "hallucinate" — generating plausible-sounding but factually incorrect information. Always verify facts, statistics, and specific claims before publishing.',
    interval: 1, repetitions: 0, easeFactor: 2.5, nextReviewDate: today, lastReviewDate: null,
  },
  {
    id: 'marketing-m1-l2-q0',
    lessonId: 'marketing-m1-l2', trackId: 'marketing',
    lessonTitle: 'Picking Your AI Toolkit',
    question: 'When selecting an AI writing tool for your marketing team, what should be the primary consideration?',
    options: ['The tool with the most features', 'How well it integrates with your existing workflow and use cases', 'Whichever tool is most popular on social media', 'The cheapest available option'],
    correct: 1,
    explanation: 'The best tool is the one your team will actually use. Workflow integration and fit with your specific use cases matters far more than feature count or brand recognition.',
    interval: 1, repetitions: 0, easeFactor: 2.5, nextReviewDate: today, lastReviewDate: null,
  },
]

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
await ctx.addCookies([{ name: COOKIE_NAME, value: encoded, domain: 'localhost', path: '/', secure: false, httpOnly: false, sameSite: 'Lax', expires: expiresAt + 3600 }])

const page = await ctx.newPage()
await page.addInitScript(({ srQueue }) => {
  localStorage.setItem('ai-literacy-sr-queue', JSON.stringify(srQueue))
}, { srQueue })

// Screenshot 1: question before answering
await page.goto('http://localhost:3000/review', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(1200)
await page.screenshot({ path: '/tmp/review1.png' })

// Screenshot 2: after selecting an answer (correct)
await page.locator('button', { hasText: 'They predict the next most likely token' }).click()
await page.waitForTimeout(500)
await page.screenshot({ path: '/tmp/review2.png' })

await browser.close()
console.log('done')
