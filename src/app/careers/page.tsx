'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Clock, Zap, Heart, Globe, Laptop } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function stagger(delay = 0.1) {
  return { hidden: {}, visible: { transition: { staggerChildren: delay } } }
}

const ROLES = [
  {
    title: 'Senior Curriculum Designer',
    team: 'Learning',
    location: 'Paris or Remote',
    type: 'Full-time',
    color: '#2563EB',
    desc: 'Own the end-to-end design of new role tracks — from learning objectives through to lesson structure, exercises, and assessment. You\'ll work with subject matter experts and apply cognitive science principles to build content that actually changes behaviour.',
    skills: ['Instructional design', 'Curriculum development', 'Content strategy', 'Learning analytics'],
  },
  {
    title: 'Full-Stack Engineer',
    team: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    color: '#3B82F6',
    desc: 'Build and scale the core platform — the adaptive path engine, lesson delivery system, and learner analytics dashboard. You\'ll work in a small, high-ownership team shipping real product weekly.',
    skills: ['Next.js', 'TypeScript', 'Supabase', 'AI/ML integration'],
  },
  {
    title: 'Head of Growth',
    team: 'Growth',
    location: 'Paris',
    type: 'Full-time',
    color: '#10B981',
    desc: 'Own the entire acquisition funnel from first touch to paid conversion. You\'ll design and run experiments across SEO, content, paid, and partnerships — with full budget ownership and a direct line to leadership.',
    skills: ['Growth strategy', 'Paid acquisition', 'SEO/content', 'Analytics'],
  },
  {
    title: 'AI Learning Coach',
    team: 'Success',
    location: 'Remote',
    type: 'Full-time',
    color: '#F59E0B',
    desc: 'Work directly with learners and enterprise clients to help them get maximum value from their tracks. You\'re part coach, part account manager — you know the platform deeply and help people apply what they\'re learning in their real roles.',
    skills: ['Customer success', 'Coaching', 'Enterprise accounts', 'AI tools knowledge'],
  },
]

const PERKS = [
  { icon: Globe, title: 'Remote-first', desc: 'Work from anywhere — we optimise for async and trust your time management.' },
  { icon: Laptop, title: 'Full equipment budget', desc: '€2,500 to set up your home office exactly the way you want it.' },
  { icon: Heart, title: 'Health & wellbeing', desc: 'Full health coverage plus a €100/month wellbeing stipend for whatever keeps you well.' },
  { icon: Zap, title: 'Learning budget', desc: '€1,500/year for courses, conferences, and books. We practice what we preach.' },
]

export default function CareersPage() {
  return (
    <main style={{ background: '#EFF6FF', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#2563EB' }}>
            <Zap size={13} className="text-white" />
          </div>
          <span className="font-black text-base" style={{ color: '#0F172A' }}>AI Literacy</span>
        </Link>
        <a href="mailto:jobs@ailiteracy.com"
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: '#2563EB' }}>
          Send your CV
        </a>
      </nav>

      {/* Hero */}
      <section className="py-20 sm:py-28" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div variants={stagger(0.1)} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#2563EB' }}>Careers</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] mb-5" style={{ color: '#0F172A' }}>
              Build the future of<br /><span style={{ color: '#2563EB' }}>professional learning</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed max-w-2xl" style={{ color: '#64748B' }}>
              We're a small, focused team on a mission to make every business professional AI-fluent. We move fast, own our work end-to-end, and genuinely care about the problem we're solving.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16" style={{ background: '#EFF6FF' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PERKS.map(p => {
              const Icon = p.icon
              return (
                <div key={p.title} className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: '#DBEAFE' }}>
                    <Icon size={17} style={{ color: '#2563EB' }} />
                  </div>
                  <p className="text-sm font-black mb-1" style={{ color: '#0F172A' }}>{p.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{p.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-16 pb-24" style={{ background: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-black mb-8" style={{ color: '#0F172A' }}>Open positions</h2>
          <div className="space-y-4">
            {ROLES.map((role, i) => (
              <motion.div key={role.title}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.2 }}
                className="rounded-2xl p-7 transition-all hover:shadow-md cursor-pointer group"
                style={{ background: '#EFF6FF', border: '1px solid #E2E8F0' }}>
                <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs px-2.5 py-1 rounded-full font-semibold text-white"
                        style={{ background: role.color }}>{role.team}</span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: '#94A3B8' }}>
                        <MapPin size={10} /> {role.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: '#94A3B8' }}>
                        <Clock size={10} /> {role.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-black" style={{ color: '#0F172A' }}>{role.title}</h3>
                  </div>
                  <a href="mailto:jobs@ailiteracy.com"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex-shrink-0"
                    style={{ background: role.color }}>
                    Apply <ArrowRight size={13} />
                  </a>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748B' }}>{role.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map(s => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-md font-medium"
                      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#475569' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl text-center" style={{ background: '#EFF6FF', border: '1px solid #E2E8F0' }}>
            <p className="text-base font-black mb-2" style={{ color: '#0F172A' }}>Don't see your role?</p>
            <p className="text-sm mb-4" style={{ color: '#64748B' }}>We're always looking for great people. Send us a note about who you are and what you'd build.</p>
            <a href="mailto:jobs@ailiteracy.com"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: '#2563EB' }}>
              Write to us <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
