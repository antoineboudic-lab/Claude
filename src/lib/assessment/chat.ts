import type { Role, Industry, CompanySize, TimeCommitment } from './types'

// Separates the assistant's visible reply from the structured profile state
// in the /api/assessment-chat stream.
export const STATE_SENTINEL = '<<<PROFILE-JSON>>>'

// Partial profile the model accumulates over the conversation. Field names
// mirror AssessmentAnswers so the finished profile drops straight into
// buildAssessmentResult.
export interface ChatProfile {
  name?: string
  roles?: Role[]
  subRole?: string
  roleDescription?: string
  industry?: Industry
  companySize?: CompanySize
  currentTools?: string[]
  skillScore?: number
  challenges?: string[]
  goals?: string[]
  timePerWeek?: TimeCommitment
}

export interface ChatState {
  profile: ChatProfile
  suggestions: string[]
  done: boolean
}

// The fields the conversation must fill before the path is final
export const REQUIRED_FIELDS: (keyof ChatProfile)[] = [
  'roles', 'subRole', 'roleDescription', 'industry', 'companySize',
  'currentTools', 'challenges', 'goals', 'timePerWeek',
]

export function profileCompleteness(profile: ChatProfile): number {
  const filled = REQUIRED_FIELDS.filter(f => {
    const v = profile[f]
    return Array.isArray(v) ? v.length > 0 : v !== undefined && v !== ''
  }).length
  return filled / REQUIRED_FIELDS.length
}

// Parse a raw stream chunk into visible text + trailing state JSON (if the
// sentinel has appeared). Tolerant of partial JSON while still streaming.
export function splitStreamText(raw: string): { visible: string; stateRaw: string | null } {
  const idx = raw.indexOf(STATE_SENTINEL)
  if (idx < 0) return { visible: raw, stateRaw: null }
  return {
    visible: raw.slice(0, idx).trimEnd(),
    stateRaw: raw.slice(idx + STATE_SENTINEL.length).trim() || null,
  }
}

export function parseChatState(stateRaw: string): ChatState | null {
  try {
    const parsed = JSON.parse(stateRaw)
    if (typeof parsed !== 'object' || parsed === null) return null
    return {
      profile: typeof parsed.profile === 'object' && parsed.profile !== null ? parsed.profile : {},
      suggestions: Array.isArray(parsed.suggestions)
        ? parsed.suggestions.filter((s: unknown) => typeof s === 'string').slice(0, 4)
        : [],
      done: parsed.done === true,
    }
  } catch {
    return null
  }
}
