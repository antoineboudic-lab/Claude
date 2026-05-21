'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, X, Loader2 } from 'lucide-react'

interface Props {
  defaultPrompt: string
  color: string
}

export default function PromptSandbox({ defaultPrompt, color }: Props) {
  const [open, setOpen] = useState(false)
  const [prompt, setPrompt] = useState(defaultPrompt)
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const isDirty = prompt !== defaultPrompt

  async function run() {
    if (!prompt.trim() || loading) return
    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl
    setResponse('')
    setLoading(true)
    try {
      const res = await fetch('/api/sandbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: ctrl.signal,
      })
      if (!res.ok || !res.body) {
        setResponse('Something went wrong. Please try again.')
        return
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setResponse(prev => prev + decoder.decode(value, { stream: true }))
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setResponse('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    abortRef.current?.abort()
    setPrompt(defaultPrompt)
    setResponse('')
    setLoading(false)
  }

  function close() {
    abortRef.current?.abort()
    setOpen(false)
    setResponse('')
    setPrompt(defaultPrompt)
    setLoading(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-all hover:opacity-80"
        style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
      >
        <Play size={9} fill="currentColor" />
        Try it
      </button>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18 }}
        className="mt-3 rounded-xl overflow-hidden"
        style={{ border: `1px solid ${color}28`, background: '#FFFFFF' }}
      >
        {/* Sandbox header */}
        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{ background: `${color}08`, borderBottom: `1px solid ${color}18` }}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>
            AI Sandbox
          </span>
          <span className="text-[10px]" style={{ color: '#94A3B8' }}>— edit the prompt, then run it</span>
          <button onClick={close} className="ml-auto hover:opacity-60 transition-opacity">
            <X size={12} style={{ color: '#94A3B8' }} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Editable prompt */}
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            rows={4}
            className="w-full px-3 py-2.5 rounded-lg text-[13px] leading-relaxed outline-none resize-none transition-all"
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              color: '#334155',
              fontFamily: 'var(--font-sans)',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = '#FFFFFF' }}
            onBlur={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC' }}
          />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={run}
              disabled={loading || !prompt.trim()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40"
              style={{ background: color }}
            >
              {loading ? (
                <Loader2 size={11} className="animate-spin" />
              ) : (
                <Play size={10} fill="currentColor" />
              )}
              {loading ? 'Running…' : 'Run prompt'}
            </button>

            {(isDirty || response) && (
              <button
                onClick={reset}
                className="flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-60"
                style={{ color: '#94A3B8' }}
              >
                <RotateCcw size={10} />
                Reset
              </button>
            )}

            {!response && !loading && (
              <span className="ml-auto text-[10px]" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
                Powered by Claude
              </span>
            )}
          </div>

          {/* Streaming response */}
          <AnimatePresence>
            {(response || loading) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-lg px-4 py-3"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                    AI Response
                  </span>
                  {loading && !response && (
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 border-t-transparent animate-spin inline-block" />
                  )}
                </div>
                <p
                  className="text-[13px] leading-relaxed whitespace-pre-wrap"
                  style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}
                >
                  {response}
                  {loading && <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle rounded-sm animate-pulse" style={{ background: color }} />}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
