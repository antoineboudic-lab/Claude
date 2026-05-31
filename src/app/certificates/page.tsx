'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Award, CheckCircle2, ArrowRight, Shield, Building2, Star, ExternalLink } from 'lucide-react'
import Logo from '@/components/Logo'
import { useGame } from '@/context/GameContext'
import { useAuth } from '@/context/AuthContext'
import { getTrack } from '@/lib/curriculum'
import type { TrackId } from '@/lib/curriculum/types'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function stagger(delay = 0.1) {
  return { hidden: {}, visible: { transition: { staggerChildren: delay } } }
}

function EarnedCertificates({ completedTracks }: { completedTracks: string[] }) {
  if (completedTracks.length === 0) return null
  return (
    <section style={{ background: '#F0FDF4', borderBottom: '1px solid #BBF7D0', padding: '24px 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <CheckCircle2 size={16} color="#10B981" />
          <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#065F46', fontFamily: 'var(--font-sans)' }}>
            Your earned certificates
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {completedTracks.map(trackId => {
            const track = getTrack(trackId as TrackId)
            if (!track) return null
            return (
              <Link
                key={trackId}
                href={`/certificates/${trackId}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 14px', borderRadius: '10px',
                  background: '#FFFFFF', border: `1px solid ${track.color}30`,
                  textDecoration: 'none', fontFamily: 'var(--font-sans)',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: track.color, flexShrink: 0 }} />
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0F172A' }}>{track.title}</span>
                <ExternalLink size={12} color="#94A3B8" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const TRACKS = [
  { name: 'AI for Marketing',        color: '#E04D2A', skills: ['AI copywriting', 'Campaign automation', 'Content strategy'] },
  { name: 'AI for Finance',          color: '#F59E0B', skills: ['Financial modelling', 'Report generation', 'Risk analysis'] },
  { name: 'AI for HR',               color: '#10B981', skills: ['Talent acquisition', 'L&D automation', 'HR analytics'] },
  { name: 'AI for Sales',            color: '#2563EB', skills: ['Prospect research', 'Proposal writing', 'CRM automation'] },
  { name: 'AI for Operations',       color: '#06B6D4', skills: ['Process automation', 'Decision support', 'Quality ops'] },
  { name: 'AI for Leaders',          color: '#F97316', skills: ['AI strategy', 'Change management', 'Team enablement'] },
  { name: 'AI for Legal',            color: '#0284C7', skills: ['Contract analysis', 'Legal research', 'Risk assessment'] },
  { name: 'AI for Product',          color: '#14B8A6', skills: ['User research', 'Roadmap prioritisation', 'PRD writing'] },
  { name: 'AI for Customer Success', color: '#DC2626', skills: ['Health monitoring', 'Churn prevention', 'CS operations'] },
  { name: 'AI for Consulting',       color: '#0EA5E9', skills: ['Research synthesis', 'Structured analysis', 'Slide writing'] },
]

const LOGOS = ['McKinsey', 'Deloitte', 'Goldman Sachs', 'Accenture', 'L\'Oréal', 'Nestlé']

export default function CertificatesPage() {
  const { state } = useGame()
  const { user } = useAuth()

  return (
    <main style={{ background: '#EFF6FF', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <Logo size="md" />
        </Link>
        <Link href="/assessment"
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: '#2563EB' }}>
          Get certified
        </Link>
      </nav>

      {user && <EarnedCertificates completedTracks={state.completedTracks} />}

      {/* Hero */}
      <section className="py-20 sm:py-28" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div variants={stagger(0.1)} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: '#DBEAFE', color: '#2563EB', border: '1px solid #BFDBFE' }}>
              <Award size={11} /> Verified credentials
            </motion.div>
            <motion.h1 variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5"
              style={{ color: '#0F172A' }}>
              Certificates that<br /><span style={{ color: '#2563EB' }}>mean something</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto" style={{ color: '#64748B' }}>
              Every OpusLearn certificate is tied to a specific role and a verified set of applied skills — not a course completion checkbox.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/assessment"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white transition-all hover:opacity-90"
                style={{ background: '#2563EB', boxShadow: '0 4px 16px rgba(37,99,235,0.28)' }}>
                Start earning your certificate <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Certificate preview */}
      <section className="py-20" style={{ background: '#EFF6FF' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#2563EB' }}>What you earn</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-5" style={{ color: '#0F172A' }}>
                A role-specific, verifiable credential
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#64748B' }}>
                Each certificate is publicly verifiable via a unique URL. Share it on LinkedIn, attach it to your CV, or link from your email signature.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Shield, text: 'Tamper-proof digital certificate with unique verification URL' },
                  { icon: Building2, text: 'Recognised by HR teams at 200+ companies' },
                  { icon: Award, text: 'Tied to specific skills demonstrated in applied exercises' },
                  { icon: CheckCircle2, text: 'Shareable directly to LinkedIn with one click' },
                ].map(item => {
                  const Icon = item.icon
                  return (
                    <li key={item.text} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#DBEAFE' }}>
                        <Icon size={15} style={{ color: '#2563EB' }} />
                      </div>
                      <p className="text-sm leading-relaxed pt-1" style={{ color: '#475569' }}>{item.text}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
            {/* Certificate mockup */}
            <div className="relative">
              <div className="rounded-2xl p-8"
                style={{ background: '#FFFFFF', border: '2px solid #E2E8F0', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: '#2563EB' }}>
                      <Award size={11} className="text-white" />
                    </div>
                    <span className="text-xs font-black" style={{ color: '#0F172A' }}>OpusLearn</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-md font-semibold" style={{ background: '#DBEAFE', color: '#2563EB' }}>Verified</span>
                </div>
                <div className="text-center py-6" style={{ borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9' }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>Certificate of Completion</p>
                  <p className="text-2xl font-black mb-1" style={{ color: '#0F172A' }}>AI for Marketing</p>
                  <p className="text-sm" style={{ color: '#64748B' }}>Awarded to <strong style={{ color: '#2563EB' }}>Sophie Armand</strong></p>
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Issued May 2026</p>
                    <p className="text-xs font-medium mt-0.5" style={{ color: '#0F172A' }}>ID: AIL-MKT-2026-4821</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#F59E0B" color="#F59E0B" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available certificates */}
      <section className="py-20" style={{ background: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tight mb-3" style={{ color: '#0F172A' }}>10 role-specific certificates</h2>
            <p className="text-base" style={{ color: '#64748B' }}>Complete your track to earn your certificate.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRACKS.map(t => (
              <div key={t.name} className="p-6 rounded-2xl"
                style={{ background: '#EFF6FF', border: '1px solid #E2E8F0' }}>
                <div className="h-0.5 w-8 rounded-full mb-4" style={{ background: t.color }} />
                <p className="text-base font-black mb-3" style={{ color: '#0F172A' }}>{t.name}</p>
                <div className="space-y-1">
                  {t.skills.map(s => (
                    <div key={s} className="flex items-center gap-2 text-xs" style={{ color: '#64748B' }}>
                      <CheckCircle2 size={11} style={{ color: t.color }} /> {s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-16" style={{ background: '#EFF6FF', borderTop: '1px solid #E2E8F0' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-8" style={{ color: '#CBD5E1' }}>Recognised by professionals at</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {LOGOS.map(l => (
              <span key={l} className="text-sm font-bold" style={{ color: '#CBD5E1' }}>{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: '#2563EB' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Ready to get certified?</h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>Take the 3-minute assessment to find your track and start earning.</p>
          <Link href="/assessment"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:scale-[1.02]"
            style={{ background: '#FFFFFF', color: '#2563EB' }}>
            Take the Assessment <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}
