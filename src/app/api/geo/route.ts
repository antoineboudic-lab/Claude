import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const country = req.headers.get('x-vercel-ip-country') ?? ''
  const res = NextResponse.json({ country, isUAE: country === 'AE' })
  res.headers.set('Cache-Control', 'private, max-age=3600')
  return res
}
