'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Zap } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function stagger(delay = 0.1) {
  return { hidden: {}, visible: { transition: { staggerChildren: delay } } }
}

const POSTS = [
  {
    slug: 'marketing-ai-briefs',
    category: 'Marketing',
    categoryColor: '#EC4899',
    title: 'How Marketing Teams Are Using AI to Write Better Campaign Briefs',
    excerpt: 'The best marketing teams aren\'t replacing their creative instincts with AI — they\'re using it to sharpen their thinking before a single word of copy is written.',
    author: 'Sophie Armand',
    authorRole: 'Head of Marketing, L\'Oréal',
    date: 'May 12, 2026',
    readTime: '8 min read',
    featured: true,
  },
  {
    slug: 'finance-prompting-mistakes',
    category: 'Finance',
    categoryColor: '#F59E0B',
    title: 'The 5 AI Prompting Mistakes Finance Professionals Make',
    excerpt: 'Most finance teams get poor results from AI not because the model is bad, but because the prompts are structured the wrong way for analytical tasks.',
    author: 'James Whitfield',
    authorRole: 'VP Finance, Goldman Sachs',
    date: 'May 5, 2026',
    readTime: '6 min read',
    featured: false,
  },
  {
    slug: 'hr-ai-literacy-strategy',
    category: 'HR & People',
    categoryColor: '#10B981',
    title: 'Why Your HR Team Needs an AI Literacy Strategy in 2026',
    excerpt: 'The organisations closing the AI skills gap fastest aren\'t the ones with the biggest budgets — they\'re the ones where HR took ownership of the problem.',
    author: 'Priya Nair',
    authorRole: 'CHRO, Accenture',
    date: 'April 28, 2026',
    readTime: '5 min read',
    featured: false,
  },
  {
    slug: 'sales-ai-journey',
    category: 'Sales',
    categoryColor: '#7C3AED',
    title: 'From Sceptic to Advocate: One Sales Leader\'s AI Journey',
    excerpt: 'Six months ago, I thought AI in sales was overhyped. Then I used it to cut my proposal prep time by 70%. Here\'s what changed my mind.',
    author: 'Marc Fontaine',
    authorRole: 'Regional Sales Director, Salesforce',
    date: 'April 20, 2026',
    readTime: '7 min read',
    featured: false,
  },
  {
    slug: 'operations-decision-support',
    category: 'Operations',
    categoryColor: '#06B6D4',
    title: 'AI as a Decision Support Layer: What Operations Leaders Get Wrong',
    excerpt: 'The mistake isn\'t adopting AI too quickly — it\'s deploying it in the wrong part of the decision-making process. Here\'s the framework that actually works.',
    author: 'Elena Morozova',
    authorRole: 'COO, Airbus',
    date: 'April 14, 2026',
    readTime: '9 min read',
    featured: false,
  },
  {
    slug: 'leadership-ai-change',
    category: 'Leadership',
    categoryColor: '#F97316',
    title: 'The Executive\'s Guide to Leading AI Transformation Without Losing Your Team',
    excerpt: 'The biggest barrier to enterprise AI adoption isn\'t the technology — it\'s the fear and uncertainty it creates in people. Here\'s how to lead through it.',
    author: 'Marie Leconte',
    authorRole: 'CEO, AI Literacy',
    date: 'April 7, 2026',
    readTime: '10 min read',
    featured: false,
  },
]

export default function BlogPage() {
  const featured = POSTS[0]
  const rest = POSTS.slice(1)

  return (
    <main style={{ background: '#F8FAFC', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#7C3AED' }}>
            <Zap size={13} className="text-white" />
          </div>
          <span className="font-black text-base" style={{ color: '#0F172A' }}>AI Literacy</span>
        </Link>
        <Link href="/assessment"
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: '#7C3AED' }}>
          Get started
        </Link>
      </nav>

      {/* Header */}
      <section className="py-16 sm:py-20" style={{ background: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div variants={stagger(0.1)} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#7C3AED' }}>Blog</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight mb-4" style={{ color: '#0F172A' }}>
              Practical AI for<br />business professionals
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg max-w-xl" style={{ color: '#64748B' }}>
              Real stories, frameworks, and tactics from professionals who are making AI work in their day-to-day roles.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured post */}
      <section className="pb-8" style={{ background: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="rounded-2xl p-8 sm:p-10 cursor-pointer transition-all hover:shadow-md"
              style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold text-white"
                  style={{ background: featured.categoryColor }}>{featured.category}</span>
                <span className="text-xs font-medium" style={{ color: '#94A3B8' }}>Featured</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4 max-w-2xl" style={{ color: '#0F172A' }}>
                {featured.title}
              </h2>
              <p className="text-base leading-relaxed mb-6 max-w-2xl" style={{ color: '#64748B' }}>{featured.excerpt}</p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: featured.categoryColor }}>
                    {featured.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>{featured.author}</p>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>{featured.authorRole}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs" style={{ color: '#94A3B8' }}>{featured.date}</span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: '#94A3B8' }}>
                    <Clock size={11} /> {featured.readTime}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#7C3AED' }}>
                    Read more <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-12 pb-24" style={{ background: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <motion.div key={post.slug}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.4 }}
                className="rounded-2xl p-6 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md flex flex-col"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold text-white self-start mb-4"
                  style={{ background: post.categoryColor }}>{post.category}</span>
                <h3 className="text-base font-black mb-3 flex-1" style={{ color: '#0F172A', lineHeight: 1.4 }}>{post.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#64748B' }}>{post.excerpt}</p>
                <div className="pt-4 flex items-center justify-between" style={{ borderTop: '1px solid #E2E8F0' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ background: post.categoryColor }}>
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <p className="text-xs font-medium" style={{ color: '#475569' }}>{post.author.split(' ')[0]}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs" style={{ color: '#94A3B8' }}>
                    <Clock size={10} /> {post.readTime}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
