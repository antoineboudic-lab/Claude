import { chromium } from './node_modules/playwright/index.mjs'

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const page = await ctx.newPage()

await page.goto('https://ai-literacy-tau.vercel.app', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(1500)

// Full page height
const fullHeight = await page.evaluate(() => document.body.scrollHeight)
console.log('full height:', fullHeight)

// Take shots every ~850px
const shots = Math.ceil(fullHeight / 850)
for (let i = 0; i < shots; i++) {
  const y = i * 850
  await page.evaluate(y => window.scrollTo(0, y), y)
  await page.waitForTimeout(500)
  await page.screenshot({ path: `/tmp/site${i+1}.png` })
  console.log(`shot ${i+1} at y=${y}`)
}

await browser.close()
console.log('done, total shots:', shots)
