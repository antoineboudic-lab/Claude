import { getAllTracks } from '@/lib/curriculum'
import type { QuizQuestion } from '@/lib/curriculum/types'

export interface DailyChallenge {
  question: QuizQuestion
  trackId: string
  trackTitle: string
  trackColor: string
  date: string
}

export interface ChallengeEntry {
  answered: number
  correct: boolean
  xpAwarded: number
}

const CHALLENGE_LOG_KEY = 'opuslearn-challenge-log'

function seedRandom(seed: number): number {
  // Simple deterministic hash
  let s = seed ^ 0x12345678
  s = ((s >>> 16) ^ s) * 0x45d9f3b
  s = ((s >>> 16) ^ s) * 0x45d9f3b
  s = (s >>> 16) ^ s
  return (s >>> 0) / 0xffffffff
}

export function getDailyChallenge(date?: string): DailyChallenge {
  const dateStr = date ?? new Date().toISOString().split('T')[0]

  const all: Array<{ q: QuizQuestion; trackId: string; trackTitle: string; trackColor: string }> = []
  for (const track of getAllTracks()) {
    for (const mod of track.modules) {
      for (const lesson of mod.lessons) {
        for (const q of lesson.quiz) {
          all.push({ q, trackId: track.id, trackTitle: track.title, trackColor: track.color })
        }
      }
    }
  }

  // Date-based deterministic seed: sum char codes of YYYYMMDD
  const seed = dateStr.replace(/-/g, '').split('').reduce((acc, c) => acc * 31 + c.charCodeAt(0), 0)
  const idx = Math.floor(seedRandom(seed) * all.length)
  const { q, trackId, trackTitle, trackColor } = all[idx]

  return { question: q, trackId, trackTitle, trackColor, date: dateStr }
}

export function loadChallengeLog(): Record<string, ChallengeEntry> {
  try {
    const raw = localStorage.getItem(CHALLENGE_LOG_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

export function saveChallengeEntry(date: string, entry: ChallengeEntry): void {
  try {
    const log = loadChallengeLog()
    log[date] = entry
    localStorage.setItem(CHALLENGE_LOG_KEY, JSON.stringify(log))
  } catch {}
}

export function getChallengeStreak(): number {
  const log = loadChallengeLog()
  const today = new Date()
  let streak = 0
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    if (log[dateStr]) {
      streak++
    } else {
      break
    }
  }
  return streak
}
