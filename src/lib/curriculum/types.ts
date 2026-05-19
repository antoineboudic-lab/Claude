export type TrackId = 'marketing' | 'finance' | 'hr' | 'sales' | 'operations' | 'leadership' | 'legal' | 'product' | 'customer' | 'consulting'
export type Level = 'beginner' | 'intermediate' | 'advanced'

export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface Exercise {
  title: string
  description: string
  steps: string[]
  tool: string
}

export interface InlineCheck {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface OutputComparison {
  label: string
  vague: { prompt: string; output: string }
  improved: { prompt: string; output: string }
  insight: string
}

export interface ApplyThisWeek {
  action: string
  promptTemplate: string
  tool: string
}

export interface Lesson {
  id: string
  title: string
  duration: number // minutes
  description: string
  content: string // markdown
  keyTakeaways: string[]
  exercise: Exercise
  quiz: QuizQuestion[]
  inlineCheck?: InlineCheck
  outputComparison?: OutputComparison
  applyThisWeek?: ApplyThisWeek
  reflection?: string
}

export interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

export interface Track {
  id: TrackId
  title: string
  tagline: string
  description: string
  color: string
  level: Level
  modules: Module[]
}
