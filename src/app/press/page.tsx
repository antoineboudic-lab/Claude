'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, ExternalLink, Zap, Mail } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function stagger(delay = 0.1) {
  return { hidden: {}, visible: { transition: { staggerChildren: delay } } }
}

const COVERAGE = [
  {
    outlet: 'TechCrunch',
    date: 'April 2026',
    headline: 'AI Literacy raises €4M seed to bring role-specific AI training to enterprise',
    excerpt: '"The startup distinguishes itself by going deep on specific business roles rather than offering generic AI courses — a bet that appears to be paying off."',
    color: '#10B981',
  },
  {
    outlet: 'Les Echos',
    date: 'March 2026',
    headline: 'La startup qui veut former tous les cadres à l\'intelligence artificielle',
    excerpt: '"Avec 3 200 professionnels formés en moins d\'un an, AI Literacy s\'impose comme la référence de la formation IA pour les non-techniciens."',
    color: '#0D9488',
  },
  {
    outlet: 'Forbes',
    date: 'February 2026',
    headline: 'The 10 EdTech Companies Closing the AI Skills Gap in 2026',
    excerpt: '"AI Literacy made our list for one reason: their completion rate. While most online platforms struggle to hit 15%, they\'re sitting at 94%."',
    color: '#F59E0B',
  },
  {
    outlet: 'Harvard Business Review',
    date: 'January 2026',
    headline: 'What executives need to know about AI fluency — and how to build it',
    excerpt: '"Role-specific training programmes, such as those offered by AI Literacy, show consistently stronger outcomes than general AI literacy courses."',
    color: '#3B82F6',
  },
]

const STATS = [
  { value: '3,200+', label: 'Professionals trained' },
  { value: '94%', label: 'Completion rate' },
  { value: '4.9/5', label: 'Learner satisfaction' },
  { value: '€4M', label: 'Seed funding raised' },
]

export default function PressPage() {
  return (
    <main style={{ background: '#F0FDFA', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#0D9488' }}>
            <Zap size={13} className="text-white" />
          </div>
          <span className="font-black text-base" style={{ color: '#0F172A' }}>AI Literacy</span>
        </Link>
        <a href="mailto:press@ailiteracy.com"
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: '#0D9488' }}>
          Press contact
        </a>
      </nav>

      {/* Hero */}
      <section className="py-20 sm:py-24" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div variants={stagger(0.1)} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#0D9488' }}>Press & Media</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight mb-5" style={{ color: '#0F172A' }}>
              News & coverage
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg max-w-2xl" style={{ color: '#64748B' }}>
              For press enquiries, interviews, or media assets, contact us at{' '}
              <a href="mailto:press@ailiteracy.com" style={{ color: '#0D9488', fontWeight: 600 }}>press@ailiteracy.com</a>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12" style={{ background: '#F0FDFA', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black mb-1" style={{ color: '#0D9488' }}>{s.value}</p>
                <p className="text-xs font-medium" style={{ color: '#94A3B8' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press coverage */}
      <section className="py-16" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black mb-8" style={{ color: '#0F172A' }}>In the press</h2>
          <div className="space-y-5">
            {COVERAGE.map((item, i) => (
              <motion.div key={item.outlet}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.2 }}
                className="p-7 rounded-2xl" style={{ background: '#F0FDFA', border: '1px solid #E2E8F0' }}>
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black px-3 py-1 rounded-lg"
                      style={{ background: item.color + '15', color: item.color }}>{item.outlet}</span>
                    <span className="text-xs" style={{ color: '#94A3B8' }}>{item.date}</span>
                  </div>
                  <ExternalLink size={14} style={{ color: '#CBD5E1' }} />
                </div>
                <p className="text-base font-black mb-3" style={{ color: '#0F172A', lineHeight: 1.4 }}>{item.headline}</p>
                <p className="text-sm leading-relaxed italic" style={{ color: '#64748B' }}>{item.excerpt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press kit */}
      <section className="py-16 pb-24" style={{ background: '#F0FDFA' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black mb-8" style={{ color: '#0F172A' }}>Press kit</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: 'Brand logos & wordmarks', desc: 'SVG and PNG in light and dark variants', size: '2.4 MB' },
              { title: 'Founder photos', desc: 'High-resolution photos of Marie Leconte and Thomas Reeves', size: '8.1 MB' },
              { title: 'Product screenshots', desc: 'Platform UI, dashboard, lesson views', size: '5.7 MB' },
              { title: 'Company fact sheet', desc: 'One-pager with key stats, background, and quotes', size: '320 KB' },
            ].map(asset => (
              <div key={asset.title} className="p-6 rounded-2xl flex items-center justify-between gap-4"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                <div>
                  <p className="text-sm font-black mb-0.5" style={{ color: '#0F172A' }}>{asset.title}</p>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>{asset.desc}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#CBD5E1' }}>{asset.size}</p>
                </div>
                <button className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors hover:bg-violet-50"
                  style={{ background: '#CCFBF1' }}>
                  <Download size={14} style={{ color: '#0D9488' }} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 p-8 rounded-2xl flex items-center gap-5 flex-wrap"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#CCFBF1' }}>
              <Mail size={18} style={{ color: '#0D9488' }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-black mb-0.5" style={{ color: '#0F172A' }}>Press contact</p>
              <p className="text-sm" style={{ color: '#64748B' }}>
                For interviews, comment requests, or custom assets:{' '}
                <a href="mailto:press@ailiteracy.com" style={{ color: '#0D9488', fontWeight: 600 }}>press@ailiteracy.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
