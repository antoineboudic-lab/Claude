'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, ChevronDown } from 'lucide-react'

type Message = { role: 'user' | 'assistant'; content: string }

interface AITutorProps {
  lessonTitle: string
  trackId: string
  lessonSummary?: string
  color: string
}

export default function AITutor({ lessonTitle, trackId, lessonSummary, color }: AITutorProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const submit = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, lessonTitle, trackId, lessonSummary }),
      })
      const data = await res.json()
      if (data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      submit()
    }
  }

  const atLimit = messages.length >= 20

  return (
    <div style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Collapsed trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full rounded-xl px-4 py-3"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', cursor: 'pointer' }}
      >
        <Bot size={16} color={color} />
        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Ask a question about this lesson</span>
      </button>

      {/* Expanded panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="tutor-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.75rem', marginTop: '0.5rem' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0F172A' }}>AI Tutor</span>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', lineHeight: 1 }}>
                <X size={14} />
              </button>
            </div>

            {/* Chat area */}
            <div
              ref={scrollRef}
              className="flex flex-col gap-2 px-4 py-3"
              style={{ maxHeight: '16rem', overflowY: 'auto' }}
            >
              {messages.length === 0 && (
                <p style={{ fontSize: '0.75rem', color: '#94A3B8', textAlign: 'center', margin: '1.5rem 0' }}>
                  Ask anything about this lesson...
                </p>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-1`}>
                  {m.role === 'assistant' && <Bot size={14} color={color} style={{ flexShrink: 0, marginBottom: 2 }} />}
                  <div
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.75rem',
                      maxWidth: '80%',
                      lineHeight: 1.5,
                      background: m.role === 'user' ? color : '#F8FAFC',
                      color: m.role === 'user' ? '#FFFFFF' : '#334155',
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start items-end gap-1">
                  <Bot size={14} color={color} style={{ flexShrink: 0, marginBottom: 2 }} />
                  <div style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: '0.75rem', background: '#F8FAFC', color: '#334155' }}>
                    <span className="flex gap-1 items-center">
                      <span style={{ animation: 'pulse 1s infinite', animationDelay: '0ms' }}>•</span>
                      <span style={{ animation: 'pulse 1s infinite', animationDelay: '150ms' }}>•</span>
                      <span style={{ animation: 'pulse 1s infinite', animationDelay: '300ms' }}>•</span>
                    </span>
                  </div>
                </div>
              )}
              {atLimit && (
                <p style={{ fontSize: '0.7rem', color: '#94A3B8', textAlign: 'center', marginTop: '0.5rem' }}>
                  <button onClick={() => setMessages([])} style={{ background: 'none', border: 'none', cursor: 'pointer', color: color, textDecoration: 'underline', fontSize: '0.7rem' }}>
                    Start a new conversation →
                  </button>
                </p>
              )}
            </div>

            {/* Input row */}
            <div className="flex items-end gap-2 px-4 py-3" style={{ borderTop: '1px solid #F1F5F9' }}>
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading || atLimit}
                placeholder="Ask a question... (⌘↵ to send)"
                style={{
                  flex: 1,
                  resize: 'none',
                  border: '1px solid #E2E8F0',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.75rem',
                  color: '#0F172A',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  lineHeight: 1.5,
                  background: atLimit ? '#F8FAFC' : '#FFFFFF',
                }}
              />
              <button
                onClick={submit}
                disabled={!input.trim() || loading || atLimit}
                style={{
                  background: !input.trim() || loading || atLimit ? '#E2E8F0' : color,
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  cursor: !input.trim() || loading || atLimit ? 'not-allowed' : 'pointer',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
