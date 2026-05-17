import { marketingTrack } from './tracks/marketing'
import { financeTrack } from './tracks/finance'
import { hrTrack } from './tracks/hr'
import { salesTrack } from './tracks/sales'
import { operationsTrack } from './tracks/operations'
import { leadershipTrack } from './tracks/leadership'
import { legalTrack } from './tracks/legal'
import { productTrack } from './tracks/product'
import { customerTrack } from './tracks/customer'
import { consultingTrack } from './tracks/consulting'
import type { Track, TrackId } from './types'

export const TRACK_IDS: TrackId[] = ['marketing', 'finance', 'hr', 'sales', 'operations', 'leadership', 'legal', 'product', 'customer', 'consulting']

const _allTracks: Track[] = [
  marketingTrack,
  financeTrack,
  hrTrack,
  salesTrack,
  operationsTrack,
  leadershipTrack,
  legalTrack,
  productTrack,
  customerTrack,
  consultingTrack,
]

export function getAllTracks(): Track[] {
  return _allTracks
}

export function getTrack(id: TrackId): Track | undefined {
  return _allTracks.find(t => t.id === id)
}

export function getLesson(trackId: TrackId, lessonId: string) {
  const track = getTrack(trackId)
  if (!track) return undefined
  for (const mod of track.modules) {
    const lesson = mod.lessons.find(l => l.id === lessonId)
    if (lesson) return { lesson, module: mod, track }
  }
  return undefined
}

export function getNextLesson(trackId: TrackId, lessonId: string) {
  const track = getTrack(trackId)
  if (!track) return undefined
  const allLessons = track.modules.flatMap(m => m.lessons)
  const idx = allLessons.findIndex(l => l.id === lessonId)
  return idx >= 0 && idx < allLessons.length - 1 ? allLessons[idx + 1] : undefined
}

export type { Track, TrackId }
export type { Lesson, Module } from './types'
