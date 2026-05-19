import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder', {
  apiVersion: '2026-04-22.dahlia',
})

export const STRIPE_PRICES = {
  monthly: process.env.STRIPE_MONTHLY_PRICE_ID ?? '',
  annual:  process.env.STRIPE_ANNUAL_PRICE_ID  ?? '',
} as const

export type StripePlan = keyof typeof STRIPE_PRICES
