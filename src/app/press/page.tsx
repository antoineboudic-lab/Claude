'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, Mail } from 'lucide-react'
import Logo from '@/components/Logo'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function stagger(delay = 0.1) {
  return { hidden: {}, visible: { transition: { staggerChildren: delay } } }
}

// Verifiable product facts only — no invented coverage or metrics
const STATS = [
  { value: '11', label: 'Role-specific tracks' },
  { value: '286', label: 'Hands-on lessons' },
  { value: '14', label: 'Languages supported' },
  { value: 'Free', label: 'Full access at launch' },
]

export default function PressPage() {
  return (
    <main style={{ background: '#EFF6FF', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <Logo size="md" />
        </Link>
        <a href="mailto:press@opuslearn.ai"
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: '#2563EB' }}>
          Press contact
        </a>
      </nav>

      {/* Hero */}
      <section className="py-20 sm:py-24" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div variants={stagger(0.1)} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#2563EB' }}>Press & Media</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight mb-5" style={{ color: '#0F172A' }}>
              Press & media
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg max-w-2xl" style={{ color: '#64748B' }}>
              OpusLearn is an AI-literacy platform that teaches business professionals to use AI
              in their actual job — through role-specific tracks, hands-on practice with live AI,
              and lessons personalised to each learner. For press enquiries, interviews, or media
              assets, contact{' '}
              <a href="mailto:press@opuslearn.ai" style={{ color: '#2563EB', fontWeight: 600 }}>press@opuslearn.ai</a>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12" style={{ background: '#EFF6FF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black mb-1" style={{ color: '#2563EB' }}>{s.value}</p>
                <p className="text-xs font-medium" style={{ color: '#94A3B8' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press kit */}
      <section className="py-16 pb-24" style={{ background: '#EFF6FF' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black mb-8" style={{ color: '#0F172A' }}>Press kit</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: 'Brand logos & wordmarks', desc: 'SVG and PNG in light and dark variants' },
              { title: 'Product screenshots', desc: 'Platform UI, dashboard, lesson views' },
            ].map(asset => (
              <div key={asset.title} className="p-6 rounded-2xl flex items-center justify-between gap-4"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                <div>
                  <p className="text-sm font-black mb-0.5" style={{ color: '#0F172A' }}>{asset.title}</p>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>{asset.desc}</p>
                </div>
                <button className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors hover:bg-blue-50"
                  style={{ background: '#DBEAFE' }}>
                  <Download size={14} style={{ color: '#2563EB' }} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 p-8 rounded-2xl flex items-center gap-5 flex-wrap"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#DBEAFE' }}>
              <Mail size={18} style={{ color: '#2563EB' }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-black mb-0.5" style={{ color: '#0F172A' }}>Press contact</p>
              <p className="text-sm" style={{ color: '#64748B' }}>
                For interviews, comment requests, or custom assets:{' '}
                <a href="mailto:press@opuslearn.ai" style={{ color: '#2563EB', fontWeight: 600 }}>press@opuslearn.ai</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
