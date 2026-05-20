'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Award, CheckCircle2, Download, Copy, Check,
  ArrowLeft, Lock, ExternalLink, Share2,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useGame } from '@/context/GameContext'
import { getTrack } from '@/lib/curriculum'
import { loadLatestAssessment } from '@/lib/supabase/db'
import type { TrackId } from '@/lib/curriculum/types'

// ─── Track skills ─────────────────────────────────────────────────────────────

const TRACK_SKILLS: Record<TrackId, string[]> = {
  marketing:   ['AI copywriting & content creation', 'Prompt engineering for marketers', 'Campaign automation', 'Content strategy with AI'],
  finance:     ['Financial modelling with AI', 'Automated report generation', 'Risk analysis & forecasting', 'AI-assisted research'],
  hr:          ['AI-powered talent acquisition', 'L&D automation & personalisation', 'HR analytics & insights', 'Performance management with AI'],
  sales:       ['AI prospect research', 'Proposal & outreach writing', 'CRM automation', 'Sales intelligence & forecasting'],
  operations:  ['Process automation', 'AI decision support systems', 'Quality operations', 'Workflow optimisation with AI'],
  leadership:  ['AI strategy & vision-setting', 'Change management', 'Team AI enablement', 'Ethical AI governance'],
  legal:       ['Contract analysis with AI', 'AI-assisted legal research', 'Risk assessment', 'Document automation'],
  product:     ['AI user research', 'Roadmap prioritisation', 'PRD writing with AI', 'Feature ideation & validation'],
  customer:    ['Customer health monitoring', 'AI-driven churn prevention', 'CS operations automation', 'AI-powered QBRs'],
  consulting:  ['Research synthesis', 'Structured analysis with AI', 'Proposal & slide writing', 'Client intelligence'],
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateCertId(userId: string, trackId: string): string {
  let hash = 0
  const input = `cert-v1-${userId}-${trackId}`
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) - hash) + input.charCodeAt(i)
    hash |= 0
  }
  const num = Math.abs(hash).toString(10).padStart(8, '0').slice(0, 5)
  return `AIL-${trackId.slice(0, 3).toUpperCase()}-2026-${num}`
}

function formatDate(iso: string | null): string {
  const d = iso ? new Date(iso) : new Date()
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ─── Certificate visual ───────────────────────────────────────────────────────

function Certificate({
  name, trackTitle, trackId, color, skills, certId, issuedDate, certRef,
}: {
  name: string
  trackTitle: string
  trackId: string
  color: string
  skills: string[]
  certId: string
  issuedDate: string
  certRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={certRef}
      id="certificate"
      style={{
        background: '#FFFFFF',
        border: `1px solid #E2E8F0`,
        borderRadius: '16px',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)',
        maxWidth: '680px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
        position: 'relative',
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: '5px', background: `linear-gradient(90deg, ${color}, ${color}99)` }} />

      {/* Subtle background pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `radial-gradient(circle, ${color}08 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '36px 40px 32px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Award size={16} color="#FFFFFF" />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>AI Literacy</p>
              <p style={{ fontSize: '0.625rem', color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1 }}>Verified Credential</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', borderRadius: '20px', background: `${color}12`, border: `1px solid ${color}30` }}>
            <CheckCircle2 size={11} color={color} />
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, color, letterSpacing: '0.02em' }}>Verified</span>
          </div>
        </div>

        {/* Certificate body */}
        <div style={{ textAlign: 'center', padding: '24px 0 28px', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9', marginBottom: '24px' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Certificate of Completion
          </p>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '6px' }}>This certifies that</p>
          <p style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '10px' }}>
            {name || 'Your Name'}
          </p>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '8px' }}>has successfully completed</p>
          <p style={{ fontSize: '1.375rem', fontWeight: 800, color, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            {trackTitle}
          </p>
          <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>
            demonstrating applied AI proficiency across all modules
          </p>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '28px' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Skills demonstrated
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>
            {skills.map(skill => (
              <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle2 size={9} color={color} />
                </div>
                <span style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.4 }}>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px solid #F1F5F9' }}>
          <div>
            <p style={{ fontSize: '0.6875rem', color: '#94A3B8', marginBottom: '2px' }}>Issued</p>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0F172A' }}>{issuedDate}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px' }}>
              <Award size={18} color={color} />
            </div>
            <p style={{ fontSize: '0.5625rem', color: '#CBD5E1', letterSpacing: '0.06em', textTransform: 'uppercase' }}>AI Literacy</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.6875rem', color: '#94A3B8', marginBottom: '2px' }}>Certificate ID</p>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0F172A', fontFamily: 'monospace', letterSpacing: '0.04em' }}>{certId}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Not earned state ─────────────────────────────────────────────────────────

function NotEarned({ trackTitle, trackId, color, lessonsCompleted, totalLessons }: {
  trackTitle: string; trackId: string; color: string; lessonsCompleted: number; totalLessons: number
}) {
  const pct = Math.round((lessonsCompleted / Math.max(totalLessons, 1)) * 100)
  return (
    <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center', fontFamily: 'var(--font-sans)' }}>
      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
        <Lock size={26} color="#94A3B8" />
      </div>
      <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Certificate not yet earned</h2>
      <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '24px', lineHeight: 1.6 }}>
        Complete all modules in the <strong style={{ color }}>{trackTitle}</strong> track to earn your certificate.
      </p>
      <div style={{ background: '#EFF6FF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Progress</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color }}>
            {lessonsCompleted}/{totalLessons} lessons
          </span>
        </div>
        <div style={{ height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '3px', transition: 'width 0.6s ease' }} />
        </div>
      </div>
      <Link
        href={`/tracks/${trackId}`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '12px 24px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600,
          background: color, color: '#FFFFFF', textDecoration: 'none',
        }}
      >
        Continue learning <ExternalLink size={14} />
      </Link>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CertificatePage() {
  const params = useParams()
  const router = useRouter()
  const trackId = params.trackId as TrackId
  const { user, loading: authLoading, openSignIn } = useAuth()
  const { state, loading: gameLoading } = useGame() as ReturnType<typeof useGame> & { loading?: boolean }
  const [name, setName] = useState('')
  const [copied, setCopied] = useState(false)
  const certRef = useRef<HTMLDivElement>(null)

  const track = getTrack(trackId)
  const color = track?.color ?? '#2563EB'
  const skills = TRACK_SKILLS[trackId] ?? []
  const earned = state.completedTracks.includes(trackId)

  // Count lessons completed in this track
  const trackLessons = track ? track.modules.flatMap(m => m.lessons) : []
  const completedInTrack = trackLessons.filter(l => state.completedLessons.includes(l.id)).length

  // Load user name from assessment
  useEffect(() => {
    if (!user) return
    const localRaw = typeof window !== 'undefined' ? localStorage.getItem('ai-literacy-assessment') : null
    if (localRaw) {
      try {
        const parsed = JSON.parse(localRaw)
        if (parsed?.answers?.name) { setName(parsed.answers.name); return }
      } catch {}
    }
    loadLatestAssessment(user.id).then(r => { if (r?.answers?.name) setName(r.answers.name) })
  }, [user])

  if (!track) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)' }}>
        <p style={{ color: '#94A3B8' }}>Track not found.</p>
      </main>
    )
  }

  const certId = user ? generateCertId(user.id, trackId) : 'AIL-XXX-2026-00000'
  const issuedDate = formatDate(state.lastActiveDate)
  const verifyUrl = typeof window !== 'undefined' ? window.location.href : `https://opuslearn.ai/certificates/${trackId}`
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verifyUrl)}&title=${encodeURIComponent(`I earned my ${track.title} Certificate from AI Literacy`)}`

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(verifyUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => window.print()

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #certificate, #certificate * { visibility: visible !important; }
          #certificate {
            position: fixed !important;
            inset: 0 !important;
            margin: auto !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            max-width: 100% !important;
            width: 100% !important;
          }
        }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#EFF6FF', fontFamily: 'var(--font-sans)' }}>
        {/* Nav */}
        <nav style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/certificates" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', textDecoration: 'none', fontSize: '0.8125rem' }}>
              <ArrowLeft size={15} /> Certificates
            </Link>
            <span style={{ color: '#E2E8F0' }}>/</span>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0F172A' }}>{track.title}</span>
          </div>
        </nav>

        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px' }}>
          {!user && !authLoading ? (
            /* Sign-in gate */
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Lock size={26} color="#94A3B8" />
              </div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Sign in to view certificate</h2>
              <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '24px' }}>Your certificate is waiting. Sign in to view and download it.</p>
              <button onClick={openSignIn} style={{ padding: '12px 28px', borderRadius: '10px', background: color, color: '#FFFFFF', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}>
                Sign in
              </button>
            </motion.div>
          ) : earned ? (
            /* Earned state */
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
              {/* Title */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '20px', background: `${color}12`, border: `1px solid ${color}25`, marginBottom: '10px' }}>
                  <Award size={12} color={color} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color }}>Certificate earned</span>
                </div>
                <h1 style={{ fontSize: '1.625rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
                  {track.title}
                </h1>
              </div>

              {/* Certificate */}
              <Certificate
                name={name || user?.email?.split('@')[0] || 'Learner'}
                trackTitle={track.title}
                trackId={trackId}
                color={color}
                skills={skills}
                certId={certId}
                issuedDate={issuedDate}
                certRef={certRef}
              />

              {/* Action buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={handleDownload}
                  style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 20px', borderRadius: '10px', background: '#0F172A', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'var(--font-sans)' }}
                >
                  <Download size={14} /> Download PDF
                </button>
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 20px', borderRadius: '10px', background: '#0A66C2', color: '#FFFFFF', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}
                >
                  <Share2 size={14} /> Share on LinkedIn
                </a>
                <button
                  onClick={handleCopyLink}
                  style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 20px', borderRadius: '10px', background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'var(--font-sans)' }}
                >
                  {copied ? <><Check size={14} color="#10B981" /> Copied!</> : <><Copy size={14} /> Copy link</>}
                </button>
              </div>

              <p style={{ fontSize: '0.75rem', color: '#94A3B8', textAlign: 'center' }}>
                Certificate ID: <span style={{ fontFamily: 'monospace', color: '#64748B', fontWeight: 600 }}>{certId}</span>
              </p>
            </motion.div>
          ) : (
            /* Not yet earned */
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: 'center' }}>
              <NotEarned
                trackTitle={track.title}
                trackId={trackId}
                color={color}
                lessonsCompleted={completedInTrack}
                totalLessons={trackLessons.length}
              />
            </motion.div>
          )}
        </div>
      </main>
    </>
  )
}
