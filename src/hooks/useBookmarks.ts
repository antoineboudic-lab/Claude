'use client'

import { useEffect, useState } from 'react'

export interface Bookmark {
  lessonId: string
  trackId: string
  title: string
  addedAt: string
}

const STORAGE_KEY = 'ai-literacy-bookmarks'

function loadFromStorage(): Bookmark[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    setBookmarks(loadFromStorage())
  }, [])

  // Persist to localStorage on every change
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
    } catch {}
  }, [bookmarks])

  function addBookmark(lessonId: string, trackId: string, title: string): void {
    setBookmarks(prev => {
      if (prev.some(b => b.lessonId === lessonId)) return prev
      return [...prev, { lessonId, trackId, title, addedAt: new Date().toISOString() }]
    })
  }

  function removeBookmark(lessonId: string): void {
    setBookmarks(prev => prev.filter(b => b.lessonId !== lessonId))
  }

  function isBookmarked(lessonId: string): boolean {
    return bookmarks.some(b => b.lessonId === lessonId)
  }

  const sortedBookmarks = [...bookmarks].sort(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
  )

  return { bookmarks: sortedBookmarks, addBookmark, removeBookmark, isBookmarked }
}
