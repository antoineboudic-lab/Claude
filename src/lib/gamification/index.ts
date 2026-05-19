export type BadgeId =
  | 'first_lesson'
  | 'perfect_score'
  | 'streak_3'
  | 'streak_7'
  | 'streak_14'
  | 'streak_30'
  | 'module_complete'
  | 'track_complete'
  | 'three_tracks'
  | 'early_bird'
  | 'dedicated'

export interface Badge {
  id: BadgeId
  name: string
  description: string
  icon: string
  xp: number
}

export interface Level {
  level: number
  title: string
  minXP: number
  maxXP: number
  color: string
}

export interface GameState {
  xp: number
  streak: number
  longestStreak: number
  lastActiveDate: string | null
  activityDates: string[]   // ISO date strings (YYYY-MM-DD) of days with lesson activity
  completedLessons: string[]
  completedModules: string[]
  completedTracks: string[]
  earnedBadges: BadgeId[]
  totalQuizzesPerfect: number
}

// ─── Badges ───────────────────────────────────────────────────────────────

export const BADGES: Record<BadgeId, Badge> = {
  first_lesson: {
    id: 'first_lesson',
    name: 'First Step',
    description: 'Completed your first lesson',
    icon: '🎯',
    xp: 0,
  },
  perfect_score: {
    id: 'perfect_score',
    name: 'Sharp Mind',
    description: 'Scored 100% on a quiz',
    icon: '💡',
    xp: 0,
  },
  streak_3: {
    id: 'streak_3',
    name: 'On a Roll',
    description: 'Learned 3 days in a row',
    icon: '🔥',
    xp: 0,
  },
  streak_7: {
    id: 'streak_7',
    name: '7-Day Streak',
    description: 'Learned 7 days in a row',
    icon: '🔥',
    xp: 0,
  },
  streak_14: {
    id: 'streak_14',
    name: 'Two Weeks Strong',
    description: 'Learned 14 days in a row',
    icon: '⚡',
    xp: 0,
  },
  streak_30: {
    id: 'streak_30',
    name: 'Committed',
    description: 'Learned 30 days in a row',
    icon: '💎',
    xp: 0,
  },
  module_complete: {
    id: 'module_complete',
    name: 'Module Master',
    description: 'Completed a full module',
    icon: '📚',
    xp: 0,
  },
  track_complete: {
    id: 'track_complete',
    name: 'Track Champion',
    description: 'Completed a full track',
    icon: '🏆',
    xp: 0,
  },
  three_tracks: {
    id: 'three_tracks',
    name: 'Polymath',
    description: 'Completed 3 tracks',
    icon: '🌟',
    xp: 0,
  },
  early_bird: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Completed a lesson before 8am',
    icon: '🌅',
    xp: 0,
  },
  dedicated: {
    id: 'dedicated',
    name: 'Dedicated',
    description: 'Completed 10 lessons',
    icon: '🎓',
    xp: 0,
  },
}

// ─── Levels ───────────────────────────────────────────────────────────────

export const LEVELS: Level[] = [
  { level: 1, title: 'Explorer',     minXP: 0,    maxXP: 199,   color: '#64748B' },
  { level: 2, title: 'Learner',      minXP: 200,  maxXP: 499,   color: '#22D3EE' },
  { level: 3, title: 'Practitioner', minXP: 500,  maxXP: 999,   color: '#10B981' },
  { level: 4, title: 'Specialist',   minXP: 1000, maxXP: 1999,  color: '#3B82F6' },
  { level: 5, title: 'Expert',       minXP: 2000, maxXP: 3999,  color: '#F59E0B' },
  { level: 6, title: 'AI Leader',    minXP: 4000, maxXP: 99999, color: '#E04D2A' },
]

// ─── XP rewards ───────────────────────────────────────────────────────────

export const XP = {
  LESSON_COMPLETE: 50,
  EXERCISE_COMPLETE: 25,
  QUIZ_PASS: 30,
  QUIZ_PERFECT: 50,
  MODULE_COMPLETE: 100,
  TRACK_COMPLETE: 500,
  DAILY_STREAK: 10,
} as const

// ─── Helpers ──────────────────────────────────────────────────────────────

export function getLevelForXP(xp: number): Level {
  return LEVELS.slice().reverse().find(l => xp >= l.minXP) ?? LEVELS[0]
}

export function getProgressToNextLevel(xp: number): number {
  const current = getLevelForXP(xp)
  if (current.level === LEVELS.length) return 100
  const range = current.maxXP - current.minXP + 1
  const earned = xp - current.minXP
  return Math.min(100, Math.round((earned / range) * 100))
}

export const DEFAULT_STATE: GameState = {
  xp: 0,
  streak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  activityDates: [],
  completedLessons: [],
  completedModules: [],
  completedTracks: [],
  earnedBadges: [],
  totalQuizzesPerfect: 0,
}
