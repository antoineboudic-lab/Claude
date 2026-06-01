import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder', {
  apiVersion: '2026-04-22.dahlia',
})

export const STRIPE_PRICES = {
  monthly: process.env.STRIPE_MONTHLY_PRICE_ID ?? '',
  annual:  process.env.STRIPE_ANNUAL_PRICE_ID  ?? '',
} as const

export const STRIPE_PRICES_AED = {
  monthly: process.env.STRIPE_MONTHLY_PRICE_ID_AED ?? '',
  annual:  process.env.STRIPE_ANNUAL_PRICE_ID_AED  ?? '',
} as const

export type StripePlan = keyof typeof STRIPE_PRICES

export const UAE_COUNTRY_CODE = 'AE'
