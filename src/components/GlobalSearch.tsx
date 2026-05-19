'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { getAllTracks } from '@/lib/curriculum'

const TRACK_COLORS: Record<string, string> = {
  marketing: '#E04D2A', finance: '#F59E0B', hr: '#10B981', sales: '#3B82F6',
  operations: '#22D3EE', leadership: '#F97316', legal: '#0284C7',
  product: '#14B8A6', customer: '#DC2626', consulting: '#0EA5E9',
}
const TRACK_NAMES: Record<string, string> = {
  marketing: 'Marketing', finance: 'Finance', hr: 'HR', sales: 'Sales',
  operations: 'Operations', leadership: 'Leadership', legal: 'Legal',
  product: 'Product', customer: 'Customer Success', consulting: 'Consulting',
}

interface SearchItem { lessonId: string; trackId: string; title: string; description: string; moduleName: string }

const buildIndex = (): SearchItem[] =>
  getAllTracks().flatMap(track =>
    track.modules.flatMap(mod =>
      mod.lessons.map(lesson => ({
        lessonId: lesson.id,
        trackId: track.id,
        title: lesson.title,
        description: lesson.description ?? '',
        moduleName: mod.title,
      }))
    )
  )

export default function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [highlighted, setHighlighted] = useState(0)
  const [index] = useState<SearchItem[]>(buildIndex)

  const results = query.trim()
    ? index.filter(item => {
        const q = query.toLowerCase()
        return item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.moduleName.toLowerCase().includes(q)
      }).slice(0, 8)
    : []

  const navigate = useCallback((item: SearchItem) => {
    router.push(`/tracks/${item.trackId}/lessons/${item.lessonId}`)
    onClose()
  }, [router, onClose])

  useEffect(() => {
    if (open) {
      setQuery('')
      setHighlighted(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => { setHighlighted(0) }, [query])

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, results.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)) }
      if (e.key === 'Enter' && results[highlighted]) navigate(results[highlighted])
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [open, results, highlighted, navigate, onClose])

  if (!open) return null

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', justifyContent: 'center' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)' }}
      />
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', zIndex: 1, marginTop: '15vh', width: '100%', maxWidth: '512px',
          background: '#fff', borderRadius: '12px', boxShadow: '0 20px 60px rgba(15,23,42,0.18)',
          overflow: 'hidden', fontFamily: 'var(--font-sans)',
        }}
      >
        {/* Input row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', borderBottom: '1px solid #E2E8F0' }}>
          <Search size={16} color="#94A3B8" style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search lessons, topics..."
            style={{
              flex: 1, border: 'none', outline: 'none', fontSize: '14px',
              color: '#0F172A', background: 'transparent', fontFamily: 'var(--font-sans)',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            <kbd style={{ fontSize: '11px', color: '#94A3B8', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '2px 5px' }}>⌘K</kbd>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex' }}>
              <X size={14} color="#94A3B8" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
          {!query.trim() && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '32px 16px', color: '#94A3B8' }}>
              <Search size={20} color="#CBD5E1" />
              <span style={{ fontSize: '13px' }}>Start typing to search lessons...</span>
            </div>
          )}
          {query.trim() && results.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px 16px', fontSize: '13px', color: '#94A3B8' }}>
              No lessons found
            </div>
          )}
          {results.map((item, i) => (
            <div
              key={`${item.trackId}-${item.lessonId}`}
              onClick={() => navigate(item)}
              onMouseEnter={() => setHighlighted(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 16px', cursor: 'pointer',
                background: highlighted === i ? '#F0FDFA' : 'transparent',
                transition: 'background 0.1s',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: TRACK_COLORS[item.trackId] ?? '#94A3B8', flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '12px', color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {TRACK_NAMES[item.trackId] ?? item.trackId} · {item.moduleName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
