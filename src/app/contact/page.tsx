'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Mail, Building2, MessageCircle, Check } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid #E2E8F0',
    background: '#EFF6FF',
    color: '#0F172A',
    fontSize: '14px',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
  }

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
        <Link href="/help" className="text-sm font-medium transition-colors hover:text-slate-900" style={{ color: '#64748B' }}>
          Help centre
        </Link>
      </nav>

      <section className="py-16 sm:py-24" style={{ background: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_400px] gap-16 items-start">
            {/* Left */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#2563EB' }}>Contact</p>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-5" style={{ color: '#0F172A' }}>
                Get in touch
              </h1>
              <p className="text-base leading-relaxed mb-10" style={{ color: '#64748B' }}>
                Whether you have a question, want to explore team pricing, or just want to say hello — we'd love to hear from you. We respond to every message within one business day.
              </p>

              <div className="space-y-5">
                {[
                  { icon: Mail, label: 'General enquiries', value: 'hello@ailiteracy.com', color: '#2563EB' },
                  { icon: Building2, label: 'Enterprise & team sales', value: 'sales@ailiteracy.com', color: '#10B981' },
                  { icon: MessageCircle, label: 'Press & media', value: 'press@ailiteracy.com', color: '#F59E0B' },
                ].map(item => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: item.color + '15' }}>
                        <Icon size={17} style={{ color: item.color }} />
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-0.5" style={{ color: '#94A3B8' }}>{item.label}</p>
                        <a href={`mailto:${item.value}`} className="text-sm font-semibold transition-colors hover:opacity-80"
                          style={{ color: '#0F172A' }}>{item.value}</a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl p-8" style={{ background: '#EFF6FF', border: '1px solid #E2E8F0' }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#ECFDF5' }}>
                    <Check size={22} style={{ color: '#10B981' }} />
                  </div>
                  <p className="text-lg font-black mb-2" style={{ color: '#0F172A' }}>Message sent</p>
                  <p className="text-sm" style={{ color: '#64748B' }}>We'll get back to you within one business day.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#475569' }}>Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="Your name"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#475569' }}>Email</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="you@company.com"
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#475569' }}>Subject</label>
                    <select
                      value={form.subject}
                      onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                      style={inputStyle}>
                      <option value="">Select a topic</option>
                      <option>General question</option>
                      <option>Team or enterprise pricing</option>
                      <option>Technical issue</option>
                      <option>Partnership</option>
                      <option>Press enquiry</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#475569' }}>Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      placeholder="How can we help?"
                      style={{ ...inputStyle, resize: 'none' }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                    style={{ background: '#2563EB' }}>
                    Send message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
