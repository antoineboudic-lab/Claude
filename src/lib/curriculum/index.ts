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
import { itTrack } from './tracks/it'
import { marketingSubRoles } from './subroles/marketing'
import { financeSubRoles } from './subroles/finance'
import { hrSubRoles } from './subroles/hr'
import { salesSubRoles } from './subroles/sales'
import { operationsSubRoles } from './subroles/operations'
import { legalSubRoles } from './subroles/legal'
import { productSubRoles } from './subroles/product'
import { customerSubRoles } from './subroles/customer'
import { consultingSubRoles } from './subroles/consulting'
import { itSubRoles } from './subroles/it'
import type { Track, TrackId } from './types'
import type { SubRoleLessons, SubRoleModule } from './subroles/types'

export const TRACK_IDS: TrackId[] = ['marketing', 'finance', 'hr', 'sales', 'operations', 'leadership', 'legal', 'product', 'customer', 'consulting', 'it']

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
  itTrack,
]

const _subRoleLessons: Partial<Record<TrackId, SubRoleLessons>> = {
  marketing: marketingSubRoles,
  finance: financeSubRoles,
  hr: hrSubRoles,
  sales: salesSubRoles,
  operations: operationsSubRoles,
  legal: legalSubRoles,
  product: productSubRoles,
  customer: customerSubRoles,
  consulting: consultingSubRoles,
  it: itSubRoles,
}

export function getAllTracks(): Track[] {
  return _allTracks
}

export function getTrack(id: TrackId): Track | undefined {
  return _allTracks.find(t => t.id === id)
}

export function getSubRoleModule(trackId: TrackId, subRoleId: string): SubRoleModule | undefined {
  return _subRoleLessons[trackId]?.[subRoleId]
}

export function getSubRoleLessonsForTrack(trackId: TrackId): SubRoleLessons | undefined {
  return _subRoleLessons[trackId]
}

export function getLesson(trackId: TrackId, lessonId: string) {
  const track = getTrack(trackId)
  if (!track) return undefined

  // Search main track modules
  for (const mod of track.modules) {
    const lesson = mod.lessons.find(l => l.id === lessonId)
    if (lesson) return { lesson, module: mod, track }
  }

  // Search sub-role modules
  const subRoles = _subRoleLessons[trackId]
  if (subRoles) {
    for (const [subRoleId, subrole] of Object.entries(subRoles)) {
      const lesson = subrole.lessons.find(l => l.id === lessonId)
      if (lesson) {
        return {
          lesson,
          module: {
            id: `${trackId}-${subRoleId}`,
            title: subrole.title,
            description: subrole.description,
            lessons: subrole.lessons,
          },
          track,
        }
      }
    }
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
export type { SubRoleModule, SubRoleLessons } from './subroles/types'
export type { Lesson, Module, InlineCheck, OutputComparison, ApplyThisWeek } from './types'
