'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, Users, DollarSign, Zap, ArrowRight,
  ChevronDown, ChevronUp, Check, X, BarChart3, Target,
} from 'lucide-react'
import {
  runScenario, fmt, SCENARIO_DEFAULTS, SCENARIO_META,
  type ScenarioId, type ScenarioInputs,
} from '@/lib/growth/pricing'
import Link from 'next/link'

const SCENARIO_IDS: ScenarioId[] = ['freemium', 'trial', 'annual', 'b2b']

// ─── Slider ───────────────────────────────────────────────────────────────────

function Slider({
  label, value, min, max, step = 1, unit = '',
  onChange,
}: {
  label: string; value: number; min: number; max: number; step?: number; unit?: string
  onChange: (v: number) => void
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>{label}</span>
        <span className="text-xs font-black" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
          {unit === '$' ? `$${value}` : `${value}${unit}`}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: '#7C3AED', background: '#E2E8F0' }}
      />
    </div>
  )
}

// ─── Metric card ──────────────────────────────────────────────────────────────

function Metric({ label, value, sub, color = '#0F172A' }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
      <p className="text-xs font-medium mb-1" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{label}</p>
      <p className="text-xl font-black" style={{ color, fontFamily: 'var(--font-sans)' }}>{value}</p>
      {sub && <p className="text-xs mt-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{sub}</p>}
    </div>
  )
}

// ─── Scenario card ────────────────────────────────────────────────────────────

function ScenarioCard({
  id, inputs, selected, onSelect, onChangeInputs,
}: {
  id: ScenarioId
  inputs: ScenarioInputs
  selected: boolean
  onSelect: () => void
  onChangeInputs: (inputs: ScenarioInputs) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const meta = SCENARIO_META[id]
  const result = runScenario(id, inputs)
  const isB2B = id === 'b2b'

  function update(key: keyof ScenarioInputs, value: number) {
    onChangeInputs({ ...inputs, [key]: value })
  }

  return (
    <motion.div
      layout
      onClick={onSelect}
      className="rounded-2xl overflow-hidden cursor-pointer transition-all"
      style={{
        background: '#FFFFFF',
        border: `2px solid ${selected ? meta.color : '#E2E8F0'}`,
        boxShadow: selected ? `0 0 0 4px ${meta.color}15` : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Header */}
      <div className="h-1" style={{ background: meta.color }} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-md"
                style={{ background: `${meta.color}18`, color: meta.color, fontFamily: 'var(--font-sans)' }}>
                {meta.name}
              </span>
              {selected && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-md"
                  style={{ background: '#ECFDF5', color: '#059669', fontFamily: 'var(--font-sans)' }}>
                  Selected
                </span>
              )}
            </div>
            <p className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{meta.tagline}</p>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Metric label="Month-12 ARR" value={fmt(result.arr)} color={meta.color} />
          <Metric label="Steady-state MRR" value={fmt(result.mrr)} />
          <Metric label="LTV : CAC" value={`${result.ltvCacRatio}×`}
            color={result.ltvCacRatio >= 3 ? '#10B981' : result.ltvCacRatio >= 2 ? '#F59E0B' : '#EF4444'} />
          <Metric label="Payback" value={`${result.paybackMonths}mo`} />
        </div>

        {/* Cumulative 12m */}
        <div className="p-3 rounded-xl mb-4"
          style={{ background: `${meta.color}10`, border: `1px solid ${meta.color}25` }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: meta.color, fontFamily: 'var(--font-sans)' }}>
              12-month cumulative revenue
            </span>
            <span className="text-base font-black" style={{ color: meta.color, fontFamily: 'var(--font-sans)' }}>
              {fmt(result.totalRevenue12m)}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
              Paying customers acquired
            </span>
            <span className="text-xs font-bold" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              {fmt(result.totalCustomers12m, false)}
            </span>
          </div>
        </div>

        {/* Pros / Cons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            {meta.pros.map(p => (
              <div key={p} className="flex items-start gap-1.5 mb-1.5">
                <Check size={11} style={{ color: '#10B981', marginTop: 2, flexShrink: 0 }} />
                <span className="text-xs" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>{p}</span>
              </div>
            ))}
          </div>
          <div>
            {meta.cons.map(c => (
              <div key={c} className="flex items-start gap-1.5 mb-1.5">
                <X size={11} style={{ color: '#EF4444', marginTop: 2, flexShrink: 0 }} />
                <span className="text-xs" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expand/collapse assumptions */}
        <button
          onClick={e => { e.stopPropagation(); setExpanded(v => !v) }}
          className="flex items-center gap-1.5 text-xs font-semibold w-full transition-colors hover:opacity-70"
          style={{ color: meta.color, fontFamily: 'var(--font-sans)' }}
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          Adjust assumptions
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="pt-4 space-y-4">
                <Slider label="Monthly visitors" value={inputs.monthlyVisitors} min={500} max={50000} step={500} onChange={v => update('monthlyVisitors', v)} />
                <Slider label="Signup rate" value={inputs.signupRate} min={1} max={40} unit="%" onChange={v => update('signupRate', v)} />
                <Slider label="Paid conversion rate" value={inputs.conversionRate} min={1} max={30} unit="%" onChange={v => update('conversionRate', v)} />
                <Slider label="Monthly churn" value={inputs.monthlyChurn} min={1} max={20} unit="%" onChange={v => update('monthlyChurn', v)} />
                <Slider label="CAC (cost per customer)" value={inputs.cac} min={5} max={1000} step={5} unit="$" onChange={v => update('cac', v)} />
                <Slider label={isB2B ? 'Avg team price/seat/mo' : 'Monthly price'} value={isB2B ? inputs.teamPrice : inputs.monthlyPrice} min={5} max={isB2B ? 200 : 99} unit="$"
                  onChange={v => update(isB2B ? 'teamPrice' : 'monthlyPrice', v)} />
                {isB2B && (
                  <Slider label="Avg team size (seats)" value={inputs.avgTeamSize} min={3} max={50} onChange={v => update('avgTeamSize', v)} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Comparison bar chart ─────────────────────────────────────────────────────

function ComparisonBar({ scenarios }: { scenarios: Array<{ id: ScenarioId; arr: number; revenue12m: number }> }) {
  const maxArr = Math.max(...scenarios.map(s => s.arr))
  const maxRev = Math.max(...scenarios.map(s => s.revenue12m))

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
      <div className="px-6 py-5" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <h3 className="font-black text-base" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
          Scenario comparison
        </h3>
        <p className="text-xs mt-1" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
          Based on current assumptions — adjust sliders to model your situation
        </p>
      </div>
      <div className="px-6 py-5 space-y-5">
        {/* ARR */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
            Steady-state ARR
          </p>
          {scenarios.map(s => {
            const meta = SCENARIO_META[s.id]
            return (
              <div key={s.id} className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>{meta.name}</span>
                  <span className="text-xs font-black" style={{ color: meta.color, fontFamily: 'var(--font-sans)' }}>{fmt(s.arr)}</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: '#F1F5F9' }}>
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.arr / maxArr) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ background: meta.color }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* 12-month cumulative */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
            12-month cumulative revenue
          </p>
          {scenarios.map(s => {
            const meta = SCENARIO_META[s.id]
            return (
              <div key={s.id} className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>{meta.name}</span>
                  <span className="text-xs font-black" style={{ color: meta.color, fontFamily: 'var(--font-sans)' }}>{fmt(s.revenue12m)}</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: '#F1F5F9' }}>
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.revenue12m / maxRev) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                    style={{ background: meta.color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GrowthAdminPage() {
  const [inputs, setInputs] = useState({ ...SCENARIO_DEFAULTS })
  const [selected, setSelected] = useState<ScenarioId>('trial')

  const results = SCENARIO_IDS.map(id => runScenario(id, inputs[id]))
  const selectedResult = results.find(r => r.id === selected)!

  const ACQUISITION_CHANNELS = [
    {
      name: 'Assessment funnel + email gate',
      status: 'live',
      description: 'Visitors complete the AI assessment. Email captured before showing personalized results. Triggers activation sequence.',
      automationLevel: 100,
      estimatedCAC: '$0 (organic)',
    },
    {
      name: 'Welcome email sequence',
      status: 'live',
      description: '4-email sequence triggered on signup: welcome (day 0), activation nudge (day 1), progress check (day 3), social proof (day 7).',
      automationLevel: 100,
      estimatedCAC: '$0 (owned)',
    },
    {
      name: 'Referral program',
      status: 'live',
      description: 'Every user gets a unique share link in their dashboard. Referrer earns +100 XP when the referred user completes their first lesson.',
      automationLevel: 100,
      estimatedCAC: '~$5 (XP cost)',
    },
    {
      name: 'Re-engagement sequence',
      status: 'live',
      description: 'Triggered after 7 days of inactivity. Shows remaining lessons and streak at risk. Personalized by role.',
      automationLevel: 100,
      estimatedCAC: '$0 (owned)',
    },
    {
      name: 'Track completion → upgrade',
      status: 'live',
      description: 'When a user finishes a track, automated email surfaces Pro benefits and what they unlocked. High-intent moment.',
      automationLevel: 100,
      estimatedCAC: '$0 (owned)',
    },
    {
      name: 'LinkedIn share cards',
      status: 'planned',
      description: 'Auto-generated OG image cards for track completion and certificates. Users share → viral reach → new sign-ups.',
      automationLevel: 90,
      estimatedCAC: '$2–8 (creative)',
    },
    {
      name: 'B2B outbound (teams)',
      status: 'planned',
      description: 'Targeted outreach to L&D managers and CHROs at 500–5000 person companies. Demo → team trial → close.',
      automationLevel: 30,
      estimatedCAC: '$400–600',
    },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC', fontFamily: 'var(--font-sans)' }}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/admin" className="text-xs font-medium transition-colors hover:text-slate-700"
                style={{ color: '#94A3B8' }}>Admin</Link>
              <span style={{ color: '#CBD5E1' }}>/</span>
              <span className="text-xs font-semibold" style={{ color: '#334155' }}>Growth Strategy</span>
            </div>
            <h1 className="text-3xl font-black" style={{ color: '#0F172A' }}>Customer Acquisition Strategy</h1>
            <p className="text-sm mt-1" style={{ color: '#64748B' }}>
              4 pricing scenarios with live projections · Fully automated acquisition stack
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: '#ECFDF5', border: '1px solid #A7F3D0' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold" style={{ color: '#059669' }}>5 channels live</span>
          </div>
        </div>

        {/* Acquisition channels */}
        <div className="mb-10">
          <h2 className="text-lg font-black mb-4" style={{ color: '#0F172A' }}>Automated Acquisition Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {ACQUISITION_CHANNELS.map(ch => (
              <div key={ch.name} className="p-5 rounded-2xl"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-bold leading-snug pr-3" style={{ color: '#0F172A' }}>{ch.name}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex-shrink-0 ${ch.status === 'live' ? '' : ''}`}
                    style={{
                      background: ch.status === 'live' ? '#ECFDF5' : '#FEF3C7',
                      color: ch.status === 'live' ? '#059669' : '#D97706',
                    }}>
                    {ch.status === 'live' ? '● LIVE' : '○ PLANNED'}
                  </span>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#64748B' }}>{ch.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#94A3B8' }}>Automation</p>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-20 rounded-full" style={{ background: '#E2E8F0' }}>
                        <div className="h-full rounded-full"
                          style={{ width: `${ch.automationLevel}%`, background: ch.automationLevel === 100 ? '#10B981' : '#F59E0B' }} />
                      </div>
                      <span className="text-xs font-bold" style={{ color: ch.automationLevel === 100 ? '#10B981' : '#F59E0B' }}>
                        {ch.automationLevel}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#94A3B8' }}>Est. CAC</p>
                    <p className="text-xs font-black" style={{ color: '#0F172A' }}>{ch.estimatedCAC}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing scenarios */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black" style={{ color: '#0F172A' }}>Pricing Scenarios</h2>
            <p className="text-xs" style={{ color: '#94A3B8' }}>Click a scenario to select it · Expand to adjust assumptions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {SCENARIO_IDS.map(id => (
              <ScenarioCard
                key={id}
                id={id}
                inputs={inputs[id]}
                selected={selected === id}
                onSelect={() => setSelected(id)}
                onChangeInputs={v => setInputs(prev => ({ ...prev, [id]: v }))}
              />
            ))}
          </div>

          <ComparisonBar scenarios={results.map(r => ({ id: r.id, arr: r.arr, revenue12m: r.totalRevenue12m }))} />
        </div>

        {/* Recommendation */}
        <div className="rounded-2xl p-6" style={{ background: '#F5F3FF', border: '1px solid #EDE9FE' }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: '#7C3AED' }}>
              <Zap size={15} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-black mb-1" style={{ color: '#4C1D95' }}>Recommended strategy: 7-Day Free Trial</p>
              <p className="text-sm leading-relaxed" style={{ color: '#5B21B6' }}>
                The free trial model delivers the best balance of conversion rate (3× freemium), churn (5% vs 8%), and LTV:CAC ratio.
                Paired with the automated email gate on assessment results and the referral program, it creates a self-reinforcing acquisition loop
                that requires zero ongoing manual effort. Start with trial, add B2B outbound once MRR exceeds $10K to layer in high-ACV deals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
