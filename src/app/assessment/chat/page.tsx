'use client'

import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, ArrowUp, ArrowRight, Check, User, Building2, Briefcase,
  Wrench, Target, Flag, Clock, BookOpen,
} from 'lucide-react'
import Logo from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'
import { buildAssessmentResult, deriveExperience } from '@/lib/assessment/engine'
import { saveAssessment } from '@/lib/supabase/db'
import {
  splitStreamText, parseChatState, profileCompleteness,
  type ChatProfile,
} from '@/lib/assessment/chat'
import type { AssessmentAnswers, AssessmentResult } from '@/lib/assessment/types'
import { getTrack } from '@/lib/curriculum'
import type { TrackId } from '@/lib/curriculum/types'
import { GrainOverlay } from '@/components/editorial/Atmosphere'
import {
  PAPER, PAPER_2, PANEL, INK, INK_SOFT, INK_FAINT,
  COBALT, COBALT_TX, RULE, SERIF, MONO, SANS,
} from '@/components/editorial/theme'

const OPENING_MESSAGE =
  "Hey — I'm your OpusLearn guide. Give me about three minutes and a few honest answers, and I'll build you an AI learning path shaped around your actual job. You'll see it take form on the right as we talk.\n\nFirst things first: what should I call you?"

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const TIME_LABELS: Record<string, string> = {
  light: '~1 hour / week',
  moderate: '2–3 hours / week',
  intensive: '5+ hours / week',
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-2">
      {[0, 1, 2].map(i => (
        <motion.span key={i}
          animate={{ y: [0, -4, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: COBALT }}
        />
      ))}
    </div>
  )
}

// ─── Progress ring ────────────────────────────────────────────────────────────

function ProgressRing({ pct, size = 44 }: { pct: number; size?: number }) {
  const r = (size - 6) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={RULE} strokeWidth={4} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={COBALT} strokeWidth={4} strokeLinecap="round"
          strokeDasharray={c}
          animate={{ strokeDashoffset: c * (1 - pct) }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black tabular-nums"
        style={{ color: COBALT_TX, fontFamily: MONO }}>
        {Math.round(pct * 100)}%
      </span>
    </div>
  )
}

// ─── Profile fact rows ────────────────────────────────────────────────────────

function FactRow({ icon: Icon, label, value }: { icon: typeof User; label: string; value?: string }) {
  const known = !!value
  return (
    <div className="flex items-center gap-3 py-2" style={{ opacity: known ? 1 : 0.45 }}>
      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
        style={{ background: known ? 'rgba(36,64,216,0.12)' : PANEL }}>
        <Icon size={13} style={{ color: known ? COBALT : INK_FAINT }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: INK_FAINT, fontFamily: MONO }}>{label}</p>
        <AnimatePresence mode="wait">
          <motion.p key={value ?? 'empty'}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            className="text-[13px] font-semibold truncate"
            style={{ color: known ? INK : INK_FAINT, fontFamily: SANS }}>
            {value ?? '···'}
          </motion.p>
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {known && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}>
            <Check size={13} color="#10B981" strokeWidth={3} />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Live path panel ──────────────────────────────────────────────────────────

function PathPanel({ profile, result, done, building, onStart }: {
  profile: ChatProfile
  result: AssessmentResult | null
  done: boolean
  building: boolean
  onStart: () => void
}) {
  const pct = profileCompleteness(profile)
  const track = result ? getTrack(result.primaryTrackId as TrackId) : undefined
  const essentials = useMemo(
    () => result?.customPath.filter(l => l.priority === 'essential').slice(0, 6) ?? [],
    [result],
  )

  return (
    <motion.div layout className="rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: PAPER_2,
        border: done ? `1.5px solid ${COBALT}` : `1px solid ${RULE}`,
        boxShadow: done
          ? '0 24px 64px rgba(36,64,216,0.18)'
          : '0 12px 40px rgba(26,27,31,0.06)',
        transition: 'border 0.5s, box-shadow 0.5s',
      }}>

      {/* Header */}
      <div className="flex items-center gap-3.5 px-6 pt-6 pb-4">
        <ProgressRing pct={done ? 1 : pct} />
        <div>
          <p className="text-[15px]" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>
            {done ? 'Your path is ready' : 'Your learning path'}
          </p>
          <p className="text-xs" style={{ color: INK_FAINT, fontFamily: SANS }}>
            {done ? 'Built from everything you just told me' : 'Building live as you talk'}
          </p>
        </div>
      </div>

      {/* Profile facts */}
      <div className="px-6 pb-2">
        <FactRow icon={Briefcase} label="Role"
          value={profile.subRole ?? (profile.roles?.length ? getTrack(profile.roles[0] as TrackId)?.title : undefined)} />
        <FactRow icon={Building2} label="World"
          value={profile.industry || profile.companySize
            ? [profile.industry?.replace('-', ' '), profile.companySize].filter(Boolean).join(' · ')
            : undefined} />
        <FactRow icon={Wrench} label="AI today"
          value={profile.currentTools?.length
            ? (profile.currentTools[0] === 'none' ? 'Starting fresh' : profile.currentTools.join(', '))
            : undefined} />
        <FactRow icon={Target} label="Fix first"
          value={profile.challenges?.length ? profile.challenges.join(', ').replace(/-/g, ' ') : undefined} />
        <FactRow icon={Flag} label="Aiming for"
          value={profile.goals?.length ? profile.goals.join(', ').replace(/-/g, ' ') : undefined} />
        <FactRow icon={Clock} label="Time"
          value={profile.timePerWeek ? TIME_LABELS[profile.timePerWeek] : undefined} />
      </div>

      {/* Path preview */}
      <div className="mt-2 px-6 pb-6 flex-1">
        <AnimatePresence mode="wait">
          {result && track ? (
            <motion.div key="path" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="rounded-2xl p-4 mb-3"
                style={{ background: `${track.color}0D`, border: `1px solid ${track.color}25` }}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-sm font-black" style={{ color: track.color, fontFamily: SANS }}>
                    {track.title}
                  </p>
                  <span className="w-2 h-2 rounded-full" style={{ background: track.color }} />
                </div>
                <p className="text-xs tabular-nums" style={{ color: INK_SOFT, fontFamily: MONO }}>
                  {result.totalLessons} lessons · {result.essentialCount} essential · ~{result.estimatedWeeks} weeks
                </p>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: INK_FAINT, fontFamily: MONO }}>
                Starting with
              </p>
              <div className="space-y-1.5">
                <AnimatePresence>
                  {essentials.map((l, i) => (
                    <motion.div key={l.lessonId}
                      layout
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ delay: i * 0.07, type: 'spring', stiffness: 300, damping: 26 }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl"
                      style={{ background: PANEL, border: `1px solid ${RULE}` }}>
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0"
                        style={{ background: `${track.color}15`, color: track.color, fontFamily: MONO }}>
                        {i + 1}
                      </span>
                      <p className="text-xs font-medium truncate" style={{ color: INK_SOFT, fontFamily: SANS }}>
                        {l.lessonTitle}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div key="skeleton" exit={{ opacity: 0 }} className="space-y-1.5 pt-1">
              {[64, 82, 71, 88, 58].map((w, i) => (
                <motion.div key={i}
                  animate={{ opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.18 }}
                  className="h-8 rounded-xl"
                  style={{ background: PANEL, width: `${w}%` }}
                />
              ))}
              <p className="text-xs pt-3" style={{ color: INK_FAINT, fontFamily: SANS }}>
                Lessons appear here once I know your role…
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <AnimatePresence>
        {done && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }} className="px-6 pb-6">
            <motion.button
              onClick={onStart}
              disabled={building}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              animate={building ? {} : { boxShadow: ['0 8px 28px rgba(36,64,216,0.25)', '0 8px 36px rgba(36,64,216,0.45)', '0 8px 28px rgba(36,64,216,0.25)'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold text-white"
              style={{ background: COBALT, fontFamily: SANS }}>
              {building ? 'Building your path…' : <>Start my path <ArrowRight size={15} /></>}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ChatAssessmentPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: OPENING_MESSAGE },
  ])
  const [profile, setProfile] = useState<ChatProfile>({})
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [done, setDone] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [building, setBuilding] = useState(false)
  const [error, setError] = useState('')
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, streaming])

  useEffect(() => {
    if (!streaming && !done) inputRef.current?.focus()
  }, [streaming, done])

  // Provisional path: recomputes whenever the profile gains information
  const result = useMemo<AssessmentResult | null>(() => {
    if (!profile.roles?.length) return null
    const answers: AssessmentAnswers = {
      name: profile.name ?? '',
      roles: profile.roles,
      subRole: profile.subRole ?? '',
      roleDescription: profile.roleDescription ?? '',
      industry: profile.industry ?? 'other-industry',
      companySize: profile.companySize ?? 'scaleup',
      currentTools: profile.currentTools ?? [],
      experience: deriveExperience(profile.currentTools ?? []),
      skillScore: profile.skillScore ?? 1,
      challenges: profile.challenges ?? [],
      goals: profile.goals ?? [],
      timePerWeek: profile.timePerWeek ?? 'moderate',
    }
    try { return buildAssessmentResult(answers) } catch { return null }
  }, [profile])

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || streaming || done) return
    setError('')
    setInput('')
    setSuggestions([])
    const history = [...messages, { role: 'user' as const, content: trimmed }]
    setMessages([...history, { role: 'assistant', content: '' }])
    setStreaming(true)
    try {
      const res = await fetch('/api/assessment-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error ?? 'Something went wrong — try again')
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let raw = ''
      while (true) {
        const { done: streamDone, value } = await reader.read()
        if (streamDone) break
        raw += decoder.decode(value, { stream: true })
        const { visible } = splitStreamText(raw)
        setMessages([...history, { role: 'assistant', content: visible }])
      }
      const { visible, stateRaw } = splitStreamText(raw)
      setMessages([...history, { role: 'assistant', content: visible }])
      if (stateRaw) {
        const state = parseChatState(stateRaw)
        if (state) {
          setProfile(prev => ({ ...prev, ...state.profile }))
          setSuggestions(state.done ? [] : state.suggestions)
          if (state.done) setDone(true)
        }
      }
    } catch (e) {
      setMessages(prev => prev.slice(0, -1))
      setError(e instanceof Error ? e.message : 'Something went wrong — try again')
    } finally {
      setStreaming(false)
    }
  }, [messages, streaming, done])

  const startPath = useCallback(async () => {
    if (!result || building) return
    setBuilding(true)
    try {
      localStorage.setItem('opuslearn-assessment', JSON.stringify(result))
      if (user) await saveAssessment(user.id, result).catch(() => {})
    } catch { /* localStorage unavailable — results page will fall back */ }
    router.push('/assessment/results')
  }, [result, building, user, router])

  return (
    <main className="relative min-h-screen flex flex-col" style={{ background: PAPER, fontFamily: SANS }}>
      <GrainOverlay />

      {/* Header */}
      <header className="relative flex items-center justify-between px-5 sm:px-8 py-4">
        <Link href="/"><Logo size="md" /></Link>
        <div className="flex items-center gap-5">
          <span className="hidden sm:inline text-[11px] uppercase tracking-[0.18em]" style={{ color: INK_FAINT, fontFamily: MONO }}>≈ 3 minutes</span>
          <Link href="/assessment/form" className="text-xs font-medium hover:underline" style={{ color: COBALT_TX }}>
            Prefer the classic form? →
          </Link>
        </div>
      </header>

      <div className="relative flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 pb-6 grid lg:grid-cols-[1fr_380px] gap-6 items-start">

        {/* ── Chat column ──
            Mobile: cap to the *visible* viewport (dvh) minus the header and the
            cookie banner that overlays the bottom ~120px, so the question is up
            top and the input bar is reachable above the banner on first paint.
            Desktop (lg): unchanged two-column height. */}
        <div className="flex flex-col rounded-3xl overflow-hidden h-[calc(100dvh-220px)] min-h-[400px] lg:h-[calc(100vh-110px)] lg:min-h-[480px]"
          style={{ background: PAPER_2, border: `1px solid ${RULE}`, boxShadow: '0 12px 40px rgba(26,27,31,0.06)' }}>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-8 space-y-6">
            {messages.map((m, i) => (
              m.role === 'assistant' ? (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 max-w-[92%]">
                  <motion.div
                    animate={streaming && i === messages.length - 1 ? { scale: [1, 1.12, 1] } : {}}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: COBALT }}>
                    <Sparkles size={13} color="#fff" />
                  </motion.div>
                  <div className="text-[15px] leading-[1.7] whitespace-pre-wrap px-4 py-2.5"
                    style={{ color: INK, background: PANEL, borderRadius: '16px 16px 16px 4px', fontFamily: SANS }}>
                    {m.content || (streaming && i === messages.length - 1 ? <TypingDots /> : null)}
                  </div>
                </motion.div>
              ) : (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end">
                  <div className="max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed text-white"
                    style={{ background: COBALT, borderRadius: '16px 16px 4px 16px', fontFamily: SANS }}>
                    {m.content}
                  </div>
                </motion.div>
              )
            ))}
            {error && (
              <p className="text-xs text-center" style={{ color: '#DC2626' }}>{error}</p>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <AnimatePresence>
            {suggestions.length > 0 && !streaming && !done && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="px-5 sm:px-8 pb-3 flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <motion.button key={s}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.07, type: 'spring', stiffness: 400, damping: 24 }}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => send(s)}
                    className="px-3.5 py-2 rounded-full text-[13px] font-semibold transition-colors"
                    style={{ background: 'rgba(36,64,216,0.06)', color: COBALT_TX, border: '1px solid rgba(36,64,216,0.20)', fontFamily: SANS }}>
                    {s}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <form
            onSubmit={e => { e.preventDefault(); send(input) }}
            className="flex items-center gap-2.5 px-5 sm:px-8 py-4"
            style={{ borderTop: `1px solid ${RULE}` }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={streaming || done}
              placeholder={done ? 'All set — your path is ready →' : 'Type your answer…'}
              className="flex-1 px-4 py-3 rounded-2xl text-[15px] outline-none transition-shadow focus:ring-2"
              style={{ background: PAPER, border: `1px solid ${RULE}`, color: INK, fontFamily: SANS }}
            />
            <motion.button
              type="submit"
              disabled={!input.trim() || streaming || done}
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
              className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-opacity disabled:opacity-30"
              style={{ background: COBALT }}>
              <ArrowUp size={17} color="#fff" strokeWidth={2.5} />
            </motion.button>
          </form>
        </div>

        {/* ── Path panel ── */}
        <div className="lg:sticky lg:top-5">
          <PathPanel profile={profile} result={result} done={done} building={building} onStart={startPath} />
          <p className="flex items-center justify-center gap-1.5 text-[11px] mt-3" style={{ color: INK_FAINT, fontFamily: SANS }}>
            <BookOpen size={11} /> You can change everything later
          </p>
        </div>
      </div>
    </main>
  )
}
