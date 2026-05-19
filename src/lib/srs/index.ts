export interface SRItem {
  id: string              // `${lessonId}-q${index}`
  lessonId: string
  trackId: string
  lessonTitle: string
  question: string
  options: string[]
  correct: number
  explanation: string
  // SM-2 fields
  interval: number        // days until next review
  repetitions: number     // successful reviews in a row
  easeFactor: number      // starts at 2.5, min 1.3
  nextReviewDate: string  // YYYY-MM-DD
  lastReviewDate: string | null
}

export type SRQuality = 0 | 1 | 2 | 3 | 4 | 5

export const STORAGE_KEY = 'ai-literacy-sr-queue'

function todayISO(): string {
  return new Date().toISOString().split('T')[0]
}

function addDays(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

// SM-2 core algorithm
export function sm2Update(item: SRItem, quality: SRQuality): SRItem {
  let { interval, repetitions, easeFactor } = item

  if (quality >= 3) {
    interval = repetitions === 0 ? 1 : repetitions === 1 ? 6 : Math.round(interval * easeFactor)
    repetitions += 1
    easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  } else {
    repetitions = 0
    interval = 1
  }

  return {
    ...item,
    interval,
    repetitions,
    easeFactor,
    nextReviewDate: addDays(interval),
    lastReviewDate: todayISO(),
  }
}

export function loadQueue(): SRItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as SRItem[]) : []
  } catch {
    return []
  }
}

export function saveQueue(items: SRItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

export function getDueItems(queue: SRItem[]): SRItem[] {
  const today = todayISO()
  return queue.filter(item => item.nextReviewDate <= today)
}

export function getDueCount(): number {
  if (typeof window === 'undefined') return 0
  return getDueItems(loadQueue()).length
}

export function addLessonToQueue(
  lessonId: string,
  trackId: string,
  lessonTitle: string,
  quiz: { question: string; options: string[]; correct: number; explanation: string }[],
): void {
  const queue = loadQueue()
  const tomorrow = addDays(1)

  const newItems: SRItem[] = quiz
    .map((q, i) => ({ id: `${lessonId}-q${i}`, q }))
    .filter(({ id }) => !queue.find(item => item.id === id))
    .map(({ id, q }) => ({
      id,
      lessonId,
      trackId,
      lessonTitle,
      question: q.question,
      options: q.options,
      correct: q.correct,
      explanation: q.explanation,
      interval: 1,
      repetitions: 0,
      easeFactor: 2.5,
      nextReviewDate: tomorrow,
      lastReviewDate: null,
    }))

  if (newItems.length > 0) saveQueue([...queue, ...newItems])
}

export function updateItemInQueue(updated: SRItem): void {
  const queue = loadQueue()
  saveQueue(queue.map(item => (item.id === updated.id ? updated : item)))
}
