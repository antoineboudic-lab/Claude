'use client'

import {
  createContext, useCallback, useContext, useEffect, useRef, useState,
} from 'react'
import {
  BadgeId, GameState, XP, DEFAULT_STATE,
  getLevelForXP, BADGES,
} from '@/lib/gamification'
import { useAuth } from '@/context/AuthContext'
import { loadUserProgress, saveUserProgress } from '@/lib/supabase/db'
import posthog from 'posthog-js'

interface XPEvent {
  id: string
  label: string
  amount: number
}

interface GameContextValue {
  state: GameState
  syncing: boolean
  addXP: (amount: number, label: string) => void
  completeLesson: (lessonId: string, moduleId: string, trackId: string) => void
  completePerfectQuiz: () => void
  xpEvents: XPEvent[]
  newBadge: BadgeId | null
  clearNewBadge: () => void
  justCompletedTrack: string | null
  clearJustCompletedTrack: () => void
}

const GameContext = createContext<GameContextValue | null>(null)

const STORAGE_KEY = 'opuslearn-game-state'

function loadLocalState(): GameState {
  if (typeof window === 'undefined') return DEFAULT_STATE
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : DEFAULT_STATE
  } catch {
    return DEFAULT_STATE
  }
}

function saveLocalState(state: GameState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

// Merge two states: union arrays, take max XP/streak
function mergeStates(local: GameState, remote: GameState): GameState {
  return {
    xp: Math.max(local.xp, remote.xp),
    streak: Math.max(local.streak, remote.streak),
    longestStreak: Math.max(local.longestStreak ?? 0, remote.longestStreak ?? 0),
    lastActiveDate: local.lastActiveDate ?? remote.lastActiveDate,
    activityDates: Array.from(new Set([...(local.activityDates ?? []), ...(remote.activityDates ?? [])])),
    completedLessons: Array.from(new Set([...local.completedLessons, ...remote.completedLessons])),
    completedModules: Array.from(new Set([...local.completedModules, ...remote.completedModules])),
    completedTracks: Array.from(new Set([...local.completedTracks, ...remote.completedTracks])),
    earnedBadges: Array.from(new Set([...local.earnedBadges, ...remote.earnedBadges])) as BadgeId[],
    totalQuizzesPerfect: Math.max(local.totalQuizzesPerfect, remote.totalQuizzesPerfect),
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [state, setState] = useState<GameState>(DEFAULT_STATE)
  const [syncing, setSyncing] = useState(false)
  const [xpEvents, setXPEvents] = useState<XPEvent[]>([])
  const [newBadge, setNewBadge] = useState<BadgeId | null>(null)
  const [justCompletedTrack, setJustCompletedTrack] = useState<string | null>(null)
  const eventId = useRef(0)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Track last synced user to avoid re-syncing on every render
  const syncedUserId = useRef<string | null>(null)
  // Detect newly completed tracks without modifying completeLesson's setState callback
  const prevCompletedTracksRef = useRef<string[] | null>(null)

  // Load local state on mount
  useEffect(() => {
    setState(loadLocalState())
  }, [])

  // Persist to localStorage on every state change
  useEffect(() => {
    saveLocalState(state)
  }, [state])

  // Sync with Supabase when user logs in
  useEffect(() => {
    if (!user || syncedUserId.current === user.id) return
    syncedUserId.current = user.id

    async function syncOnLogin() {
      setSyncing(true)
      try {
        const remote = await loadUserProgress(user!.id)
        const local = loadLocalState()
        if (remote) {
          const merged = mergeStates(local, remote)
          setState(merged)
          saveLocalState(merged)
          // Push merged state back if it's ahead of remote
          if (merged.xp > remote.xp || merged.completedLessons.length > remote.completedLessons.length) {
            await saveUserProgress(user!.id, merged)
          }
        } else {
          // First sign-in: push local progress to Supabase
          await saveUserProgress(user!.id, local)
        }
      } catch {
        // Supabase unavailable — local state is still valid
      } finally {
        setSyncing(false)
      }
    }

    syncOnLogin()
  }, [user])

  // Reset sync tracking on logout
  useEffect(() => {
    if (!user) syncedUserId.current = null
  }, [user])

  // Debounced save to Supabase on every state change (when signed in)
  useEffect(() => {
    if (!user) return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      saveUserProgress(user.id, state).catch(() => {})
    }, 1500)
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [state, user])

  // Show completion celebration for newly completed tracks (not on initial load)
  useEffect(() => {
    if (prevCompletedTracksRef.current === null) {
      prevCompletedTracksRef.current = state.completedTracks
      return
    }
    const newTracks = state.completedTracks.filter(t => !prevCompletedTracksRef.current!.includes(t))
    if (newTracks.length > 0) setJustCompletedTrack(newTracks[0])
    prevCompletedTracksRef.current = state.completedTracks
  }, [state.completedTracks])

  const pushXPEvent = useCallback((label: string, amount: number) => {
    const id = String(eventId.current++)
    setXPEvents(prev => [...prev, { id, label, amount }])
    setTimeout(() => setXPEvents(prev => prev.filter(e => e.id !== id)), 3000)
  }, [])

  const awardBadge = useCallback((state: GameState, badgeId: BadgeId): GameState => {
    if (state.earnedBadges.includes(badgeId)) return state
    setNewBadge(badgeId)
    return { ...state, earnedBadges: [...state.earnedBadges, badgeId] }
  }, [])

  const updateStreak = useCallback((state: GameState): GameState => {
    const today = new Date().toISOString().split('T')[0]
    if (state.lastActiveDate === today) return state
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    const newStreak = state.lastActiveDate === yesterday ? state.streak + 1 : 1
    const newLongest = Math.max(state.longestStreak ?? 0, newStreak)
    // Keep activityDates to last 90 days to avoid unbounded growth
    const existing = state.activityDates ?? []
    const cutoff = new Date(Date.now() - 90 * 86400000).toISOString().split('T')[0]
    const newDates = Array.from(new Set([...existing, today])).filter(d => d >= cutoff)
    return { ...state, streak: newStreak, longestStreak: newLongest, lastActiveDate: today, activityDates: newDates }
  }, [])

  const addXP = useCallback((amount: number, label: string) => {
    setState(prev => {
      const next = { ...prev, xp: prev.xp + amount }
      pushXPEvent(label, amount)
      return next
    })
  }, [pushXPEvent])

  const completeLesson = useCallback((
    lessonId: string,
    moduleId: string,
    trackId: string,
  ) => {
    setState(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev
      let next: GameState = { ...prev, completedLessons: [...prev.completedLessons, lessonId] }

      next = updateStreak(next)
      next = { ...next, xp: next.xp + XP.LESSON_COMPLETE }
      pushXPEvent('Lesson complete', XP.LESSON_COMPLETE)

      if (next.streak > 1) {
        next = { ...next, xp: next.xp + XP.DAILY_STREAK }
        pushXPEvent(`${next.streak}-day streak`, XP.DAILY_STREAK)
      }

      // Streak milestone bonuses
      if (next.streak === 3)  { next = { ...next, xp: next.xp + 25 }; pushXPEvent('3-day streak bonus!', 25) }
      if (next.streak === 7)  { next = { ...next, xp: next.xp + 75 }; pushXPEvent('7-day streak bonus!', 75) }
      if (next.streak === 14) { next = { ...next, xp: next.xp + 150 }; pushXPEvent('14-day streak bonus!', 150) }
      if (next.streak === 30) { next = { ...next, xp: next.xp + 300 }; pushXPEvent('30-day streak bonus!', 300) }

      if (next.completedLessons.length === 1) next = awardBadge(next, 'first_lesson')
      if (next.completedLessons.length === 10) next = awardBadge(next, 'dedicated')
      if (next.streak === 3)  next = awardBadge(next, 'streak_3')
      if (next.streak === 7)  next = awardBadge(next, 'streak_7')
      if (next.streak === 14) next = awardBadge(next, 'streak_14')
      if (next.streak === 30) next = awardBadge(next, 'streak_30')

      const hour = new Date().getHours()
      if (hour < 8) next = awardBadge(next, 'early_bird')

      posthog.capture('lesson_complete', { lesson_id: lessonId, module_id: moduleId, track_id: trackId, total_lessons: next.completedLessons.length })

      const moduleLessons = [1, 2, 3, 4].map(i => `${moduleId}-l${i}`)
      const moduleComplete = moduleLessons.every(l => next.completedLessons.includes(l))
      if (moduleComplete && !next.completedModules.includes(moduleId)) {
        next = { ...next, completedModules: [...next.completedModules, moduleId] }
        next = { ...next, xp: next.xp + XP.MODULE_COMPLETE }
        pushXPEvent('Module complete!', XP.MODULE_COMPLETE)
        next = awardBadge(next, 'module_complete')
        posthog.capture('module_complete', { module_id: moduleId, track_id: trackId })
      }

      const trackModules = [1, 2, 3, 4, 5].map(i => `${trackId}-m${i}`)
      const trackComplete = trackModules.every(m => next.completedModules.includes(m))
      if (trackComplete && !next.completedTracks.includes(trackId)) {
        next = { ...next, completedTracks: [...next.completedTracks, trackId] }
        next = { ...next, xp: next.xp + XP.TRACK_COMPLETE }
        pushXPEvent('Track complete!', XP.TRACK_COMPLETE)
        next = awardBadge(next, 'track_complete')
        if (next.completedTracks.length === 3) next = awardBadge(next, 'three_tracks')
        posthog.capture('track_complete', { track_id: trackId, total_tracks: next.completedTracks.length })
      }

      return next
    })
  }, [updateStreak, pushXPEvent, awardBadge])

  const completePerfectQuiz = useCallback(() => {
    setState(prev => {
      let next = {
        ...prev,
        xp: prev.xp + XP.QUIZ_PERFECT,
        totalQuizzesPerfect: prev.totalQuizzesPerfect + 1,
      }
      pushXPEvent('Perfect score!', XP.QUIZ_PERFECT)
      next = awardBadge(next, 'perfect_score')
      return next
    })
  }, [pushXPEvent, awardBadge])

  const clearNewBadge = useCallback(() => setNewBadge(null), [])
  const clearJustCompletedTrack = useCallback(() => setJustCompletedTrack(null), [])

  return (
    <GameContext.Provider value={{
      state, syncing, addXP, completeLesson, completePerfectQuiz,
      xpEvents, newBadge, clearNewBadge,
      justCompletedTrack, clearJustCompletedTrack,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
