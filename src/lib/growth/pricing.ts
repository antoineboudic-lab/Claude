// ─── Pricing Scenario Engine ──────────────────────────────────────────────────

export type ScenarioId = 'freemium' | 'trial' | 'annual' | 'b2b'

export interface ScenarioInputs {
  monthlyVisitors: number
  signupRate: number       // % of visitors who sign up
  conversionRate: number   // % of signups who go paid
  monthlyChurn: number     // % of paid users who churn per month
  avgTeamSize: number      // for B2B only
  cac: number              // cost to acquire one paying customer ($)
  monthlyPrice: number
  annualPrice: number
  teamPrice: number        // per seat per month
}

export interface ScenarioOutput {
  id: ScenarioId
  name: string
  tagline: string
  inputs: ScenarioInputs
  // Monthly steady state (month 12)
  newPaidPerMonth: number
  steadyStatePaid: number
  mrr: number
  arr: number
  ltv: number
  ltvCacRatio: number
  paybackMonths: number
  // 12-month cumulative
  totalRevenue12m: number
  totalCustomers12m: number
}

export const SCENARIO_DEFAULTS: Record<ScenarioId, ScenarioInputs> = {
  freemium: {
    monthlyVisitors: 5000,
    signupRate: 18,
    conversionRate: 4,
    monthlyChurn: 8,
    avgTeamSize: 0,
    cac: 55,
    monthlyPrice: 19,
    annualPrice: 149,
    teamPrice: 49,
  },
  trial: {
    monthlyVisitors: 5000,
    signupRate: 22,
    conversionRate: 14,
    monthlyChurn: 5,
    avgTeamSize: 0,
    cac: 38,
    monthlyPrice: 19,
    annualPrice: 149,
    teamPrice: 49,
  },
  annual: {
    monthlyVisitors: 5000,
    signupRate: 20,
    conversionRate: 9,
    monthlyChurn: 3,   // monthly equivalent of ~32% annual churn
    avgTeamSize: 0,
    cac: 42,
    monthlyPrice: 24,  // monthly is expensive to push annual
    annualPrice: 99,
    teamPrice: 41,
  },
  b2b: {
    monthlyVisitors: 5000,
    signupRate: 12,
    conversionRate: 8,
    monthlyChurn: 3,
    avgTeamSize: 10,
    cac: 480,
    monthlyPrice: 25,
    annualPrice: 199,
    teamPrice: 39,
  },
}

export const SCENARIO_META: Record<ScenarioId, { name: string; tagline: string; color: string; pros: string[]; cons: string[] }> = {
  freemium: {
    name: 'Freemium',
    tagline: 'Maximum top-of-funnel. Lowest short-term revenue.',
    color: '#3B82F6',
    pros: ['Lowest friction to sign up', 'Large free user base for upsell', 'Easy to go viral'],
    cons: ['Low conversion rate', 'Free users consume infrastructure', 'Slow revenue growth'],
  },
  trial: {
    name: '7-Day Free Trial',
    tagline: 'Best conversion rate. Creates urgency and full-value experience.',
    color: '#0D9488',
    pros: ['3× higher conversion than freemium', 'Users experience full product', 'Lower churn (users committed)'],
    cons: ['Some drop-off at trial end', 'Need strong day-1 activation', 'Requires email nurture'],
  },
  annual: {
    name: 'Annual-First',
    tagline: 'Best LTV and cash flow. Upfront revenue from day one.',
    color: '#10B981',
    pros: ['12× revenue per customer upfront', 'Much lower churn (switching cost)', 'Better cash flow for growth'],
    cons: ['Higher barrier to first purchase', 'Need compelling annual discount', 'Refund risk in first 30 days'],
  },
  b2b: {
    name: 'B2B Teams-First',
    tagline: 'Highest ACV. Sell once, activate many.',
    color: '#F59E0B',
    pros: ['10× individual revenue per deal', 'Low churn (org-wide adoption)', 'Predictable enterprise ARR'],
    cons: ['Long sales cycle (4–8 weeks)', 'High CAC from sales effort', 'Needs dedicated CS'],
  },
}

export function runScenario(id: ScenarioId, inputs: ScenarioInputs): ScenarioOutput {
  const meta = SCENARIO_META[id]
  const isB2B = id === 'b2b'

  const signupsPerMonth   = Math.round(inputs.monthlyVisitors * inputs.signupRate / 100)
  const newPaidPerMonth   = Math.round(signupsPerMonth * inputs.conversionRate / 100)

  // Geometric series: paid(n) = newPaid / churnRate * (1 - (1-churnRate)^n)
  const churnRate = inputs.monthlyChurn / 100
  const steadyStatePaid = churnRate > 0
    ? Math.round(newPaidPerMonth / churnRate)
    : newPaidPerMonth * 12

  const revenuePerPaid = isB2B
    ? inputs.teamPrice * inputs.avgTeamSize
    : inputs.monthlyPrice

  const mrr = steadyStatePaid * revenuePerPaid
  const arr = mrr * 12

  // LTV = ARPU / monthly churn
  const ltv = churnRate > 0 ? Math.round(revenuePerPaid / churnRate) : revenuePerPaid * 24
  const ltvCacRatio = Math.round((ltv / inputs.cac) * 10) / 10
  const paybackMonths = Math.round(inputs.cac / revenuePerPaid)

  // 12-month cumulative revenue (sum of MRR each month as base grows)
  let totalRevenue12m = 0
  let paid = 0
  for (let m = 1; m <= 12; m++) {
    paid = paid * (1 - churnRate) + newPaidPerMonth
    totalRevenue12m += Math.round(paid) * revenuePerPaid
  }
  const totalCustomers12m = newPaidPerMonth * 12

  return {
    id,
    name: meta.name,
    tagline: meta.tagline,
    inputs,
    newPaidPerMonth,
    steadyStatePaid,
    mrr,
    arr,
    ltv,
    ltvCacRatio,
    paybackMonths,
    totalRevenue12m,
    totalCustomers12m,
  }
}

export function fmt(n: number, currency = true): string {
  if (currency) {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000)     return `$${(n / 1_000).toFixed(1)}K`
    return `$${Math.round(n)}`
  }
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`
  return String(Math.round(n))
}
