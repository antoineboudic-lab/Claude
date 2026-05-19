'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ai-literacy-notes'

function loadFromStorage(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function useNotes() {
  const [notes, setNotes] = useState<Record<string, string>>({})

  // Load from localStorage on mount
  useEffect(() => {
    setNotes(loadFromStorage())
  }, [])

  // Persist to localStorage on every change
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    } catch {}
  }, [notes])

  function getNote(lessonId: string): string {
    return notes[lessonId] ?? ''
  }

  function setNote(lessonId: string, text: string): void {
    setNotes(prev => {
      const next = { ...prev }
      if (text.trim() === '') {
        delete next[lessonId]
      } else {
        next[lessonId] = text
      }
      return next
    })
  }

  function getAllNotes(): { lessonId: string; text: string }[] {
    return Object.entries(notes)
      .filter(([, text]) => text.trim() !== '')
      .map(([lessonId, text]) => ({ lessonId, text }))
  }

  return { getNote, setNote, getAllNotes }
}
