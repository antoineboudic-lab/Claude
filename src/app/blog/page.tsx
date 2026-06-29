'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import EditorialNav from '@/components/editorial/Nav'
import EditorialFooter from '@/components/editorial/Footer'
import { GrainOverlay, AuroraGlow } from '@/components/editorial/Atmosphere'
import {
  PAPER, PAPER_2, INK, INK_SOFT, INK_FAINT,
  COBALT, COBALT_TX, RULE, SERIF, MONO, SANS, fadeUp, stagger,
} from '@/components/editorial/theme'

const POSTS = [
  {
    slug: 'marketing-ai-briefs',
    category: 'Marketing',
    categoryColor: '#E04D2A',
    title: 'How Marketing Teams Are Using AI to Write Better Campaign Briefs',
    excerpt: 'The best marketing teams aren\'t replacing their creative instincts with AI — they\'re using it to sharpen their thinking before a single word of copy is written.',
    author: 'OpusLearn Team',
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
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'May 5, 2026',
    readTime: '6 min read',
    featured: false,
  },
  {
    slug: 'hr-opuslearn-strategy',
    category: 'HR & People',
    categoryColor: '#10B981',
    title: 'Why Your HR Team Needs an OpusLearn Strategy in 2026',
    excerpt: 'The organisations closing the AI skills gap fastest aren\'t the ones with the biggest budgets — they\'re the ones where HR took ownership of the problem.',
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'April 28, 2026',
    readTime: '5 min read',
    featured: false,
  },
  {
    slug: 'sales-ai-journey',
    category: 'Sales',
    categoryColor: '#2563EB',
    title: 'From Sceptic to Advocate: One Sales Leader\'s AI Journey',
    excerpt: 'Six months ago, I thought AI in sales was overhyped. Then I used it to cut my proposal prep time by 70%. Here\'s what changed my mind.',
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
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
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
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
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'April 7, 2026',
    readTime: '10 min read',
    featured: false,
  },
  {
    slug: 'legal-ai-contract-review',
    category: 'Legal',
    categoryColor: '#0284C7',
    title: 'How In-House Counsel Are Using AI to Review Contracts Faster — Without Cutting Corners',
    excerpt: 'AI won\'t replace legal judgment. But lawyers who use it to cut first-pass review time by 60% will replace those who don\'t. Here\'s the workflow that actually holds up.',
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'March 31, 2026',
    readTime: '7 min read',
    featured: false,
  },
  {
    slug: 'product-ai-discovery',
    category: 'Product',
    categoryColor: '#14B8A6',
    title: 'The PM\'s Unfair Advantage: Using AI to Go from User Interview to PRD in Half the Time',
    excerpt: 'The best PMs aren\'t writing better PRDs — they\'re synthesising discovery faster, spotting patterns earlier, and spending the time they save on the decisions that actually matter.',
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'March 24, 2026',
    readTime: '8 min read',
    featured: false,
  },
  {
    slug: 'customer-success-ai-retention',
    category: 'Customer Success',
    categoryColor: '#DC2626',
    title: 'How Our CS Team Cut Churn by 18% Using AI to Spot At-Risk Accounts Earlier',
    excerpt: 'We weren\'t missing the signals — we were drowning in them. AI didn\'t replace our CSMs\' instincts; it gave them the bandwidth to actually act on what they already knew.',
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'March 17, 2026',
    readTime: '6 min read',
    featured: false,
  },
  {
    slug: 'consulting-ai-research',
    category: 'Consulting',
    categoryColor: '#0EA5E9',
    title: 'From 3 Days to 4 Hours: How AI Is Compressing the Research Phase of Strategy Work',
    excerpt: 'The insight hasn\'t changed — the partner still has to think. But the desk research that used to burn an analyst\'s week now takes an afternoon. Here\'s what that changes.',
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'March 10, 2026',
    readTime: '9 min read',
    featured: false,
  },
]

export default function BlogPage() {
  const featured = POSTS[0]
  const rest = POSTS.slice(1)

  return (
    <main style={{ background: PAPER, minHeight: '100vh' }}>
      <GrainOverlay />
      <EditorialNav active="blog" />

      {/* Header */}
      <section className="relative overflow-hidden" style={{ borderBottom: `1px solid ${RULE}` }}>
        <AuroraGlow style={{ width: 640, height: 640, top: -240, left: '50%', transform: 'translateX(-50%)', opacity: 0.4 }} />
        <div className="relative max-w-5xl mx-auto px-6 pt-40 pb-16">
          <motion.div variants={stagger(0.1)} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.18em] mb-4" style={{ color: COBALT_TX, fontFamily: MONO }}>
              The OpusLearn Journal
            </motion.p>
            <motion.h1 variants={fadeUp} className="mb-5" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2.6rem, 5.5vw, 4rem)', lineHeight: 1.03, letterSpacing: '-0.03em', color: INK }}>
              Practical AI for<br /><span style={{ fontStyle: 'italic', color: COBALT_TX }}>business professionals</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg max-w-xl leading-relaxed" style={{ color: INK_SOFT, fontFamily: SANS }}>
              Real stories, frameworks, and tactics from professionals who are making AI work in their day-to-day roles.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured post */}
      <section className="pt-14">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Link href={`/blog/${featured.slug}`}
              className="block p-8 sm:p-10 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: PAPER_2, border: `1px solid ${RULE}`, borderRadius: 10, boxShadow: '0 1px 3px rgba(26,27,31,0.04)' }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] px-2.5 py-1"
                  style={{ border: `1px solid ${RULE}`, color: INK_SOFT, borderRadius: 4, fontFamily: MONO }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: featured.categoryColor }} />
                  {featured.category}
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: COBALT_TX, fontFamily: MONO }}>Featured</span>
              </div>
              <h2 className="mb-4 max-w-2xl" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1.12, letterSpacing: '-0.02em', color: INK }}>
                {featured.title}
              </h2>
              <p className="text-base leading-relaxed mb-6 max-w-2xl" style={{ color: INK_SOFT, fontFamily: SANS }}>{featured.excerpt}</p>
              <div className="flex items-center justify-between flex-wrap gap-4 pt-5" style={{ borderTop: `1px solid ${RULE}` }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: COBALT }}>
                    {featured.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: INK, fontFamily: SANS }}>{featured.author}</p>
                    <p className="text-xs" style={{ color: INK_FAINT, fontFamily: SANS }}>{featured.authorRole}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] uppercase tracking-[0.12em]" style={{ color: INK_FAINT, fontFamily: MONO }}>{featured.date}</span>
                  <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.12em]" style={{ color: INK_FAINT, fontFamily: MONO }}>
                    <Clock size={11} /> {featured.readTime}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: COBALT_TX, fontFamily: SANS }}>
                    Read more <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-12 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-7">
            <h2 className="text-[11px] uppercase tracking-[0.2em]" style={{ color: INK_FAINT, fontFamily: MONO }}>
              Latest articles
            </h2>
            <div className="flex-1 h-px" style={{ background: RULE }} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <motion.div key={post.slug}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.4 }}>
                <Link href={`/blog/${post.slug}`}
                  className="p-6 transition-all hover:-translate-y-0.5 hover:shadow-md flex flex-col h-full"
                  style={{ background: PAPER_2, border: `1px solid ${RULE}`, borderRadius: 8, boxShadow: '0 1px 3px rgba(26,27,31,0.04)' }}>
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 self-start mb-4"
                    style={{ border: `1px solid ${RULE}`, color: INK_SOFT, borderRadius: 4, fontFamily: MONO }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: post.categoryColor }} />
                    {post.category}
                  </span>
                  <h3 className="mb-3 flex-1" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '1.15rem', lineHeight: 1.25, letterSpacing: '-0.01em', color: INK }}>{post.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: INK_SOFT, fontFamily: SANS }}>{post.excerpt}</p>
                  <div className="pt-4 flex items-center justify-between" style={{ borderTop: `1px solid ${RULE}` }}>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ background: COBALT }}>
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <p className="text-xs font-medium" style={{ color: INK_SOFT, fontFamily: SANS }}>{post.author.split(' ')[0]}</p>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.12em]" style={{ color: INK_FAINT, fontFamily: MONO }}>
                      <Clock size={10} /> {post.readTime}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <EditorialFooter />
    </main>
  )
}
