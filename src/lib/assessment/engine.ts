import type { AssessmentAnswers, AssessmentResult, PriorityLesson, Role } from './types'
import type { TrackId } from '../curriculum/types'
import { getTrack } from '../curriculum'

export const ROLE_TO_TRACK: Record<string, TrackId> = {
  marketing: 'marketing',
  finance: 'finance',
  hr: 'hr',
  sales: 'sales',
  operations: 'operations',
  leadership: 'leadership',
  legal: 'legal',
  product: 'product',
  customer: 'customer',
  consulting: 'consulting',
  it: 'it',
  other: 'leadership',
}

export function deriveExperience(tools: string[]): 'none' | 'some' | 'regular' {
  if (!tools.length || (tools.length === 1 && tools[0] === 'none')) return 'none'
  if (tools.length >= 3) return 'regular'
  return 'some'
}

const GOAL_MODULE_BOOST: Record<string, number[]> = {
  'save-time': [1, 2],
  'better-decisions': [2, 3],
  'lead-ai': [3, 4],
  'stay-competitive': [1, 2, 3],
  'upskill-team': [4],
  'client-value': [1, 2],
  'understand-basics': [0, 1],
}

const CHALLENGE_MODULE_BOOST: Record<string, number[]> = {
  'content-volume': [1],
  'personalization': [2, 3],
  'roi-proof': [3],
  'competitor-speed': [2],
  'manual-reporting': [1, 2],
  'forecast-accuracy': [2],
  'data-silos': [2, 3],
  'communication': [3, 4],
  'recruiting-time': [1, 2],
  'employee-scale': [2],
  'people-data': [3],
  'hr-change': [4],
  'prospecting': [1, 2],
  'pitch-personalization': [2],
  'deal-risk': [3],
  'sales-admin': [1],
  'process-docs': [1],
  'supply-chain': [2],
  'quality-detection': [2],
  'slow-reporting': [3],
  'ai-strategy': [1, 2],
  'team-resistance': [2, 3],
  'business-case': [1, 2],
  'ai-governance': [3],
  'general': [1, 2],
  // Legal
  'contract-volume': [1, 2],
  'research-speed': [2, 3],
  'risk-visibility': [2, 3],
  'legal-comms': [3, 4],
  // Product
  'research-synthesis': [1, 2],
  'prioritisation': [2, 3],
  'prd-quality': [2],
  'stakeholder-alignment': [3, 4],
  // Customer Success
  'account-scale': [1, 2],
  'churn-signals': [2, 3],
  'onboarding-consistency': [2],
  'renewal-prep': [3, 4],
  // Consulting
  'research-time': [1, 2],
  'deck-production': [2, 3],
  'differentiation': [2, 3],
  'client-comms': [3, 4],
  // IT
  'scripting': [1, 2],
  'security-posture': [2, 3],
  'docs-knowledge': [1, 2],
  'alert-fatigue': [2, 3],
}

const TIME_TO_WEEKS: Record<string, number> = {
  light: 20,
  moderate: 8,
  intensive: 4,
}

const GOAL_LABELS: Record<string, string> = {
  'save-time': 'saving time on routine tasks',
  'better-decisions': 'making better decisions with data',
  'lead-ai': 'leading AI adoption in your organisation',
  'stay-competitive': 'staying ahead of the competition',
  'upskill-team': 'upskilling your team',
  'client-value': 'delivering more value to clients',
  'understand-basics': 'building a solid AI foundation',
}

export function buildAssessmentResult(answers: AssessmentAnswers): AssessmentResult {
  // Backward compat: old DB rows have `role` (singular), new ones use `roles`
  const effectiveRoles: Role[] = answers.roles?.length
    ? answers.roles
    : (answers.role ? [answers.role] : ['marketing' as Role])

  const primaryTrackId = ROLE_TO_TRACK[effectiveRoles[0]] as TrackId

  const allLessons: PriorityLesson[] = []

  // Distribute essential/recommended slots proportionally across tracks
  const essentialPerTrack = Math.max(3, Math.ceil(5 / effectiveRoles.length))
  const recommendedPerTrack = Math.max(5, Math.ceil(12 / effectiveRoles.length))

  for (const role of effectiveRoles) {
    const trackId = ROLE_TO_TRACK[role] as TrackId
    const track = getTrack(trackId)
    if (!track) continue

    const lessons: PriorityLesson[] = []

    track.modules.forEach((mod, modIdx) => {
      let moduleScore = 1

      if (modIdx === 0) {
        if (answers.experience === 'none') moduleScore += 4
        else if (answers.experience === 'some') moduleScore += 1
        else moduleScore -= 2
        if (answers.skillScore <= 1) moduleScore += 2
        else if (answers.skillScore >= 3) moduleScore -= 1
      }

      for (const goal of answers.goals) {
        if (GOAL_MODULE_BOOST[goal]?.includes(modIdx)) moduleScore += 2
      }

      const effectiveChallenges = answers.challenges?.length
        ? answers.challenges
        : (answers.challenge ? [answers.challenge] : [])
      for (const ch of effectiveChallenges) {
        if (CHALLENGE_MODULE_BOOST[ch]?.includes(modIdx)) moduleScore += 2
      }

      mod.lessons.forEach((lesson, lessonIdx) => {
        lessons.push({
          trackId,
          lessonId: lesson.id,
          moduleId: mod.id,
          lessonTitle: lesson.title,
          moduleTitle: mod.title,
          moduleIndex: modIdx,
          lessonIndex: lessonIdx,
          score: moduleScore - lessonIdx * 0.3,
          priority: 'optional',
        })
      })
    })

    const sorted = [...lessons].sort((a, b) => b.score - a.score)
    sorted.forEach((l, i) => {
      if (i < essentialPerTrack) l.priority = 'essential'
      else if (i < essentialPerTrack + recommendedPerTrack) l.priority = 'recommended'
    })

    lessons.sort((a, b) => a.moduleIndex * 10 + a.lessonIndex - (b.moduleIndex * 10 + b.lessonIndex))
    allLessons.push(...lessons)
  }

  const goalText = answers.goals
    .map(g => GOAL_LABELS[g])
    .filter(Boolean)
    .slice(0, 2)
    .join(' and ')

  const trackLabel = effectiveRoles.length > 1 ? `${effectiveRoles.length} tracks` : 'your track'

  const reasoning = goalText
    ? `Your path spans ${trackLabel} and is built around ${goalText}. The lessons marked Essential are the highest-impact starting points for your specific goals and roles.`
    : 'Your path is sequenced to build practical AI capability across your selected roles, starting where you are right now.'

  return {
    answers,
    primaryTrackId,
    customPath: allLessons,
    estimatedWeeks: TIME_TO_WEEKS[answers.timePerWeek] ?? 8,
    totalLessons: allLessons.length,
    essentialCount: allLessons.filter(l => l.priority === 'essential').length,
    reasoning,
  }
}
