'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, BookOpen, Dumbbell, Compass } from 'lucide-react'
import { getLesson, getTrack } from '@/lib/curriculum'
import type { TrackId } from '@/lib/curriculum/types'

type Message = { role: 'user' | 'assistant'; content: string }
type Mode = 'ask' | 'practice' | 'navigate'

function parseLessonPath(pathname: string) {
  const match = pathname.match(/\/tracks\/([^/]+)\/lessons\/([^/]+)/)
  if (!match) return null
  return { trackId: match[1] as TrackId, lessonId: match[2] }
}

const MODES: { id: Mode; label: string; Icon: React.FC<{ size: number }> }[] = [
  { id: 'ask', label: 'Ask', Icon: BookOpen },
  { id: 'practice', label: 'Practice', Icon: Dumbbell },
  { id: 'navigate', label: 'Navigate', Icon: Compass },
]

function getStarters(mode: Mode, lessonTitle?: string, pageType?: string) {
  if (mode === 'practice') return [
    'Give me a prompt to improve',
    'Start a roleplay scenario',
    "Quiz me on what I've learned",
  ]
  if (mode === 'navigate') return [
    'What should I learn next?',
    'Which track is right for me?',
    'How long does this course take?',
  ]
  if (lessonTitle) return [
    `Explain "${lessonTitle}" differently`,
    'Give me a real-world example',
    "What's the most important takeaway?",
  ]
  if (pageType === 'dashboard') return [
    'How do I make the most of my path?',
    'Which lessons matter most?',
    'How should I prioritise my time?',
  ]
  return [
    'What is prompt engineering?',
    'Which track is right for me?',
    'How is AI used in business?',
  ]
}

export default function FloatingAssistant() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<Mode>('ask')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const lessonContext = parseLessonPath(pathname)
  const lessonData = lessonContext ? getLesson(lessonContext.trackId, lessonContext.lessonId) : null
  const trackData = lessonContext ? getTrack(lessonContext.trackId) : null
  const pageType = lessonContext
    ? 'lesson'
    : pathname.startsWith('/dashboard')
    ? 'dashboard'
    : pathname.startsWith('/tracks')
    ? 'tracks'
    : 'other'

  const lessonTitle = lessonData?.lesson.title
  const lessonSummary = lessonData?.lesson.description
  const trackId = lessonContext?.trackId
  const accentColor = trackData?.color ?? '#4F46E5'

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => textareaRef.current?.focus(), 200)
  }, [open])

  const handleModeChange = (m: Mode) => {
    setMode(m)
    setMessages([])
  }

  const submit = useCallback(async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || loading) return

    const userMsg: Message = { role: 'user', content }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, lessonTitle, trackId, lessonSummary, pageType, mode }),
      })
      const data = await res.json()
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.response ?? 'Sorry, something went wrong.' },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }, [input, messages, loading, lessonTitle, trackId, lessonSummary, pageType, mode])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      submit()
    }
  }

  const starters = getStarters(mode, lessonTitle, pageType)

  return (
    <div className="fixed bottom-5 right-5 z-50" style={{ fontFamily: 'var(--font-sans)' }}>
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              bottom: '62px',
              right: 0,
              width: 'min(360px, calc(100vw - 24px))',
              background: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.07)',
              overflow: 'hidden',
              border: '1px solid #E2E8F0',
            }}
          >
            {/* Header */}
            <div style={{ background: '#0F172A', padding: '14px 16px 0' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div style={{ background: accentColor, borderRadius: '6px', padding: '4px 5px', display: 'flex', flexShrink: 0 }}>
                    <Sparkles size={11} color="#fff" />
                  </div>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#FFFFFF', whiteSpace: 'nowrap' }}>AI Assistant</span>
                  {lessonTitle && (
                    <span style={{ fontSize: '0.6875rem', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>
                      · {lessonTitle}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', display: 'flex', padding: '2px', flexShrink: 0, marginLeft: '8px' }}
                >
                  <X size={14} />
                </button>
              </div>

              {/* Mode tabs */}
              <div className="flex" style={{ gap: '2px', paddingBottom: '1px' }}>
                {MODES.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => handleModeChange(id)}
                    style={{
                      flex: 1,
                      padding: '6px 4px',
                      borderRadius: '6px 6px 0 0',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.6875rem',
                      fontWeight: mode === id ? 600 : 400,
                      background: mode === id ? '#FFFFFF' : 'transparent',
                      color: mode === id ? '#0F172A' : '#64748B',
                      transition: 'all 0.15s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    <Icon size={11} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat area */}
            <div
              ref={scrollRef}
              style={{ maxHeight: '300px', minHeight: '140px', overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              {messages.length === 0 && (
                <div>
                  <p style={{ fontSize: '0.6875rem', color: '#94A3B8', textAlign: 'center', marginBottom: '10px' }}>
                    {mode === 'ask' && 'Ask anything about AI or this lesson'}
                    {mode === 'practice' && 'Practice your AI skills with a sparring partner'}
                    {mode === 'navigate' && 'Find the right lessons and plan your path'}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {starters.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => submit(prompt)}
                        style={{
                          textAlign: 'left',
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          padding: '8px 10px',
                          fontSize: '0.75rem',
                          color: '#475569',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-sans)',
                          lineHeight: 1.4,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.borderColor = '#CBD5E1' }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#E2E8F0' }}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      padding: '8px 11px',
                      borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      maxWidth: '86%',
                      lineHeight: 1.6,
                      background: m.role === 'user' ? '#0F172A' : '#F8FAFC',
                      color: m.role === 'user' ? '#FFFFFF' : '#334155',
                      border: m.role === 'assistant' ? '1px solid #E2E8F0' : 'none',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    fontSize: '0.875rem',
                    padding: '7px 14px',
                    borderRadius: '12px 12px 12px 2px',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    color: '#94A3B8',
                    letterSpacing: '0.05em',
                  }}>
                    <span style={{ display: 'inline-block', animation: 'assistant-dot 1.2s ease-in-out infinite' }}>·</span>
                    <span style={{ display: 'inline-block', animation: 'assistant-dot 1.2s ease-in-out 0.2s infinite' }}>·</span>
                    <span style={{ display: 'inline-block', animation: 'assistant-dot 1.2s ease-in-out 0.4s infinite' }}>·</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div style={{ borderTop: '1px solid #F1F5F9', padding: '10px 12px', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                placeholder="Ask anything… ⌘↵ to send"
                style={{
                  flex: 1,
                  resize: 'none',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '7px 10px',
                  fontSize: '0.75rem',
                  color: '#0F172A',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  lineHeight: 1.5,
                  background: '#FFFFFF',
                  maxHeight: '72px',
                  overflowY: 'auto',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = '#94A3B8' }}
                onBlur={e => { e.currentTarget.style.borderColor = '#E2E8F0' }}
              />
              <button
                onClick={() => submit()}
                disabled={!input.trim() || loading}
                style={{
                  background: !input.trim() || loading ? '#F1F5F9' : '#0F172A',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px',
                  cursor: !input.trim() || loading ? 'not-allowed' : 'pointer',
                  color: !input.trim() || loading ? '#CBD5E1' : '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.15s',
                }}
              >
                <Send size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: '#0F172A',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.12)',
          position: 'relative',
          zIndex: 1,
        }}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} style={{ display: 'flex' }}>
              <X size={18} color="#FFFFFF" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} style={{ display: 'flex' }}>
              <MessageCircle size={18} color="#FFFFFF" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <motion.span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid rgba(79, 70, 229, 0.35)',
              pointerEvents: 'none',
            }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.button>

      <style>{`
        @keyframes assistant-dot {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-2px); }
        }
      `}</style>
    </div>
  )
}
