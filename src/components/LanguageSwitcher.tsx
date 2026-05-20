'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config'

interface Props {
  compact?: boolean
}

export function LanguageSwitcher({ compact = false }: Props) {
  const currentLocale = useLocale()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function switchLocale(locale: Locale) {
    setOpen(false)
    await fetch('/api/locale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locale }),
    })
    startTransition(() => router.refresh())
  }

  const current = currentLocale as Locale
  const flag = localeFlags[current] ?? '🌐'
  const name = localeNames[current] ?? current.toUpperCase()

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(v => !v)}
        disabled={isPending}
        aria-label="Select language"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: compact ? '5px 8px' : '6px 12px',
          borderRadius: 8,
          border: '1px solid #E2E8F0',
          background: '#FFFFFF',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 500,
          color: '#0F172A',
          fontFamily: 'var(--font-sans)',
          transition: 'border-color 0.15s',
          opacity: isPending ? 0.6 : 1,
        }}
      >
        <span style={{ fontSize: 16 }}>{flag}</span>
        {!compact && <span>{name}</span>}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: '#94A3B8', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          right: 0,
          zIndex: 200,
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          minWidth: 180,
          overflow: 'hidden',
          maxHeight: 360,
          overflowY: 'auto',
        }}>
          {locales.map(locale => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '10px 14px',
                border: 'none',
                background: locale === current ? '#EFF6FF' : 'transparent',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: locale === current ? 600 : 400,
                color: locale === current ? '#2563EB' : '#0F172A',
                fontFamily: 'var(--font-sans)',
                textAlign: 'left',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => { if (locale !== current) (e.currentTarget as HTMLButtonElement).style.background = '#F8FAFC' }}
              onMouseLeave={e => { if (locale !== current) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
            >
              <span style={{ fontSize: 18 }}>{localeFlags[locale]}</span>
              <span>{localeNames[locale]}</span>
              {locale === current && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 'auto', color: '#2563EB' }}>
                  <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
