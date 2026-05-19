'use client'

import {
  useState, useRef, useEffect, useCallback,
  forwardRef, useImperativeHandle,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, Send, RotateCcw, MessageCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

// ─── Types ────────────────────────────────────────────────────────────────────

type Message = { role: 'user' | 'assistant'; content: string }

export interface AITutorHandle {
  /** Open the panel, optionally pre-fill and auto-send a question */
  open: (question?: string) => void
}

interface AITutorProps {
  lessonTitle: string
  trackId: string
  lessonContent?: string
  keyTakeaways?: string[]
  color: string
  /** Render as a fixed floating bubble (lesson page) vs inline (legacy) */
  floating?: boolean
}

// ─── Starter questions ────────────────────────────────────────────────────────

const TRACK_ROLE: Record<string, string> = {
  marketing: 'marketer', finance: 'finance professional', hr: 'HR professional',
  sales: 'sales rep', operations: 'ops manager', leadership: 'leader',
  legal: 'lawyer', product: 'product manager', customer: 'CS manager',
  consulting: 'consultant',
}

function starterQuestions(trackId: string) {
  const role = TRACK_ROLE[trackId] ?? 'professional'
  return [
    `Give me a concrete example from a ${role}'s day-to-day`,
    "What's the #1 mistake beginners make here?",
    'How do I know if I\'m applying this correctly?',
  ]
}

// ─── Component ────────────────────────────────────────────────────────────────

const AITutor = forwardRef<AITutorHandle, AITutorProps>(function AITutor(
  { lessonTitle, trackId, lessonContent, keyTakeaways, color, floating = false },
  ref,
) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [usedStarters, setUsedStarters] = useState(false)
  const [unread, setUnread] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const starters = starterQuestions(trackId)

  // Expose open() to parent via ref
  useImperativeHandle(ref, () => ({
    open(question?: string) {
      setOpen(true)
      if (question) {
        // Small delay so the panel is mounted before sending
        setTimeout(() => sendMessage(question), 80)
      }
    },
  }))

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, streaming])

  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`
  }, [input])

  // Mark unread badge when a response arrives while closed
  useEffect(() => {
    if (!open && messages.some(m => m.role === 'assistant' && m.content)) {
      setUnread(true)
    }
    if (open) setUnread(false)
  }, [messages, open])

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || streaming) return

    const userMsg: Message = { role: 'user', content: trimmed }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setUsedStarters(true)
    setStreaming(true)
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          messages: history,
          lessonTitle,
          trackId,
          lessonContent,
          keyTakeaways,
        }),
      })

      if (!res.ok || !res.body) throw new Error('Request failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        const snap = accumulated
        setMessages(prev => {
          const next = [...prev]
          next[next.length - 1] = { role: 'assistant', content: snap }
          return next
        })
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setMessages(prev => {
        const next = [...prev]
        next[next.length - 1] = {
          role: 'assistant',
          content: 'Something went wrong — please try again.',
        }
        return next
      })
    } finally {
      setStreaming(false)
    }
  }, [messages, streaming, lessonTitle, trackId, lessonContent, keyTakeaways])

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      sendMessage(input)
    }
  }

  function reset() {
    abortRef.current?.abort()
    setMessages([])
    setUsedStarters(false)
    setStreaming(false)
  }

  const atLimit = messages.filter(m => m.role === 'user').length >= 12

  // ── Shared chat panel ──────────────────────────────────────────────────────

  const ChatPanel = (
    <motion.div
      key="tutor-panel"
      initial={floating ? { opacity: 0, y: 12, scale: 0.97 } : { opacity: 0, y: 6 }}
      animate={floating ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0 }}
      exit={floating ? { opacity: 0, y: 12, scale: 0.97 } : { opacity: 0, y: 6 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: floating
          ? '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 4px 24px rgba(0,0,0,0.06)',
        ...(floating && {
          position: 'fixed',
          bottom: 88,
          right: 20,
          width: 'min(380px, calc(100vw - 32px))',
          zIndex: 49,
        }),
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', borderBottom: '1px solid #F1F5F9',
        background: 'linear-gradient(135deg, #FAFAFA, #FFFFFF)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            background: `linear-gradient(135deg, ${color}, ${color}99)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Sparkles size={13} style={{ color: '#fff' }} />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: 0 }}>AI Tutor</p>
            <p style={{ fontSize: 10, color: '#94A3B8', margin: 0 }}>powered by Claude</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {messages.length > 0 && (
            <button onClick={reset} title="New conversation" style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#CBD5E1', padding: 4, borderRadius: 6,
              display: 'flex', alignItems: 'center',
            }}>
              <RotateCcw size={13} />
            </button>
          )}
          <button onClick={() => setOpen(false)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#CBD5E1', padding: 4, borderRadius: 6,
            display: 'flex', alignItems: 'center',
          }}>
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{
        minHeight: 80, maxHeight: 340, overflowY: 'auto',
        padding: '14px 14px 6px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {messages.length === 0 && (
          <div style={{ padding: '4px 0 8px' }}>
            <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 10, textAlign: 'center' }}>
              Ask anything about <em>&ldquo;{lessonTitle}&rdquo;</em>
            </p>
            {!usedStarters && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {starters.map(q => (
                  <button key={q} onClick={() => sendMessage(q)} style={{
                    textAlign: 'left', padding: '8px 12px', borderRadius: 10,
                    border: `1px solid ${color}22`, background: `${color}07`,
                    fontSize: 12, color: '#475569', cursor: 'pointer',
                    lineHeight: 1.45, fontFamily: 'var(--font-sans)',
                    transition: 'background 0.15s',
                  }}>
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {messages.map((m, i) => {
          const isUser = m.role === 'user'
          const isLastAssistant = !isUser && i === messages.length - 1
          const isStreamingThis = isLastAssistant && streaming

          return (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column',
              alignItems: isUser ? 'flex-end' : 'flex-start', gap: 3,
            }}>
              {!isUser && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: 5,
                    background: `linear-gradient(135deg, ${color}, ${color}88)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Sparkles size={8} style={{ color: '#fff' }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#94A3B8' }}>AI Tutor</span>
                </div>
              )}
              <div style={{
                maxWidth: '88%', padding: '9px 12px',
                borderRadius: isUser ? '12px 12px 3px 12px' : '3px 12px 12px 12px',
                background: isUser ? color : '#EFF6FF',
                color: isUser ? '#FFFFFF' : '#334155',
                fontSize: 13, lineHeight: 1.6,
              }}>
                {isUser ? (
                  <span>{m.content}</span>
                ) : (
                  <div>
                    {m.content ? (
                      <ReactMarkdown components={{
                        p: ({ children }) => <p style={{ margin: '0 0 5px', lineHeight: 1.65 }}>{children}</p>,
                        strong: ({ children }) => <strong style={{ fontWeight: 700, color: '#0F172A' }}>{children}</strong>,
                        ul: ({ children }) => <ul style={{ margin: '4px 0', paddingLeft: 16 }}>{children}</ul>,
                        ol: ({ children }) => <ol style={{ margin: '4px 0', paddingLeft: 16 }}>{children}</ol>,
                        li: ({ children }) => <li style={{ marginBottom: 2 }}>{children}</li>,
                        code: ({ children }) => (
                          <code style={{ background: '#DBEAFE', color: '#2563EB', borderRadius: 4, padding: '1px 5px', fontSize: 12 }}>
                            {children}
                          </code>
                        ),
                      }}>
                        {m.content}
                      </ReactMarkdown>
                    ) : (
                      <ThinkingDots color={color} />
                    )}
                    {isStreamingThis && m.content && (
                      <span style={{
                        display: 'inline-block', width: 6, height: 13,
                        background: color, borderRadius: 1, marginLeft: 2,
                        verticalAlign: 'text-bottom',
                        animation: 'tutor-blink 0.8s step-end infinite',
                      }} />
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {atLimit && (
          <p style={{ fontSize: 11, color: '#CBD5E1', textAlign: 'center', marginTop: 4 }}>
            Limit reached.{' '}
            <button onClick={reset} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color, fontSize: 11, textDecoration: 'underline',
              padding: 0, fontFamily: 'var(--font-sans)',
            }}>
              Start fresh
            </button>
          </p>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: '6px 10px 10px', borderTop: '1px solid #F1F5F9' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: 6,
          background: '#EFF6FF', border: '1px solid #E2E8F0',
          borderRadius: 12, padding: '7px 7px 7px 12px',
        }}>
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={streaming || atLimit}
            placeholder={atLimit ? 'Limit reached — start fresh ↑' : 'Ask a question… (⌘↵ to send)'}
            style={{
              flex: 1, resize: 'none', border: 'none', background: 'transparent',
              fontSize: 13, color: '#334155', fontFamily: 'var(--font-sans)',
              outline: 'none', lineHeight: 1.5, minHeight: 22, maxHeight: 120, padding: 0,
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || streaming || atLimit}
            style={{
              width: 30, height: 30, borderRadius: 8, border: 'none', flexShrink: 0,
              background: input.trim() && !streaming && !atLimit ? color : '#E2E8F0',
              color: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: input.trim() && !streaming && !atLimit ? 'pointer' : 'not-allowed',
              transition: 'background 0.15s',
            }}
          >
            <Send size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  )

  // ── Floating mode: fixed bubble + panel ───────────────────────────────────

  if (floating) {
    return (
      <>
        <AnimatePresence>{open && ChatPanel}</AnimatePresence>

        {/* Bubble button */}
        <motion.button
          onClick={() => { setOpen(v => !v); setUnread(false) }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          style={{
            position: 'fixed', bottom: 20, right: 80, zIndex: 49,
            width: 48, height: 48, borderRadius: '50%',
            background: open
              ? '#0F172A'
              : `linear-gradient(135deg, ${color}, ${color}cc)`,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            transition: 'background 0.2s',
          }}
          aria-label="AI Tutor"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={18} style={{ color: '#fff' }} />
              </motion.span>
            ) : (
              <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <MessageCircle size={18} style={{ color: '#fff' }} />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Unread dot */}
          <AnimatePresence>
            {unread && !open && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                style={{
                  position: 'absolute', top: 2, right: 2,
                  width: 10, height: 10, borderRadius: '50%',
                  background: '#EF4444', border: '2px solid #fff',
                }}
              />
            )}
          </AnimatePresence>
        </motion.button>

        {/* Tooltip on first render */}
        <AnimatePresence>
          {!open && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ delay: 1.5, duration: 0.3 }}
              style={{
                position: 'fixed', bottom: 30, right: 136, zIndex: 49,
                background: '#0F172A', color: '#FFFFFF', borderRadius: 10,
                padding: '7px 12px', fontSize: 12, fontWeight: 600,
                fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap',
                pointerEvents: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              Ask the AI Tutor
              <span style={{
                position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%)',
                width: 0, height: 0,
                borderTop: '5px solid transparent', borderBottom: '5px solid transparent',
                borderLeft: '6px solid #0F172A',
              }} />
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          @keyframes tutor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        `}</style>
      </>
    )
  }

  // ── Inline mode (legacy) ──────────────────────────────────────────────────

  return (
    <div style={{ fontFamily: 'var(--font-sans)' }}>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: '12px 16px', background: '#FAFAFA',
              border: '1px solid #E2E8F0', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
            }}
          >
            <div style={{ width: 28, height: 28, borderRadius: 8, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={13} style={{ color }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#334155', margin: 0 }}>Ask the AI Tutor</p>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>Questions about this lesson? Ask anything.</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>{open && ChatPanel}</AnimatePresence>
      <style>{`@keyframes tutor-blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  )
})

export default AITutor

// ─── Thinking dots ────────────────────────────────────────────────────────────

function ThinkingDots({ color }: { color: string }) {
  return (
    <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center', height: 18 }}>
      {[0, 150, 300].map(delay => (
        <span key={delay} style={{
          width: 5, height: 5, borderRadius: '50%', background: color,
          animation: `tutor-pulse 1.2s ${delay}ms ease-in-out infinite`,
        }} />
      ))}
      <style>{`@keyframes tutor-pulse{0%,100%{opacity:.2;transform:scale(.9)}50%{opacity:.9;transform:scale(1.1)}}`}</style>
    </span>
  )
}
