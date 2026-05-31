import type { TrackId } from '../curriculum/types'

export type Role = TrackId | 'other'
export type Experience = 'none' | 'some' | 'regular'
export type TimeCommitment = 'light' | 'moderate' | 'intensive'
export type Industry =
  | 'technology' | 'financial-services' | 'consulting'
  | 'consumer-retail' | 'healthcare' | 'manufacturing'
  | 'media' | 'government' | 'other-industry'
export type CompanySize = 'startup' | 'scaleup' | 'midmarket' | 'enterprise'

export interface AssessmentAnswers {
  name: string
  roles: Role[]
  role?: Role        // kept for backward compat with existing DB rows
  subRole: string
  roleDescription: string
  industry: Industry
  companySize: CompanySize
  currentTools: string[]
  experience: Experience        // derived from currentTools
  skillScore: number            // 0–2 from skill check
  challenge: string
  goals: string[]
  timePerWeek: TimeCommitment
}

export interface PriorityLesson {
  trackId: TrackId
  lessonId: string
  moduleId: string
  lessonTitle: string
  moduleTitle: string
  moduleIndex: number
  lessonIndex: number
  score: number
  priority: 'essential' | 'recommended' | 'optional'
}

export interface AssessmentResult {
  answers: AssessmentAnswers
  primaryTrackId: TrackId
  customPath: PriorityLesson[]
  estimatedWeeks: number
  totalLessons: number
  essentialCount: number
  reasoning: string
}
