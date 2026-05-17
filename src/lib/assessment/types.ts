import type { TrackId } from '../curriculum/types'

export type Role = TrackId | 'other'
export type Experience = 'none' | 'some' | 'regular'
export type TimeCommitment = 'light' | 'moderate' | 'intensive'

export interface AssessmentAnswers {
  name: string
  role: Role
  experience: Experience
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
