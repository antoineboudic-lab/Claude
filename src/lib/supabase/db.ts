import { createClient } from './client'
import type { BadgeId, GameState } from '@/lib/gamification'
import type { AssessmentResult } from '@/lib/assessment/types'

// ── Progress ──────────────────────────────────────────────────────────────────

type ProgressRow = {
  xp: number
  streak: number
  last_active_date: string | null
  completed_lessons: string[]
  completed_modules: string[]
  completed_tracks: string[]
  earned_badges: string[]
  total_quizzes_perfect: number
}

export async function loadUserProgress(_userId: string): Promise<GameState | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .rpc('load_my_progress')
    .maybeSingle() as { data: ProgressRow | null; error: unknown }

  if (error || !data) return null

  return {
    xp: data.xp ?? 0,
    streak: data.streak ?? 0,
    longestStreak: 0,
    lastActiveDate: data.last_active_date ?? null,
    activityDates: [],
    completedLessons: data.completed_lessons ?? [],
    completedModules: data.completed_modules ?? [],
    completedTracks: data.completed_tracks ?? [],
    earnedBadges: (data.earned_badges ?? []) as BadgeId[],
    totalQuizzesPerfect: data.total_quizzes_perfect ?? 0,
  }
}

export async function saveUserProgress(_userId: string, state: GameState): Promise<void> {
  const supabase = createClient()
  await supabase.rpc('save_my_progress', {
    p_xp: state.xp,
    p_streak: state.streak,
    p_last_active_date: state.lastActiveDate ?? null,
    p_completed_lessons: state.completedLessons,
    p_completed_modules: state.completedModules,
    p_completed_tracks: state.completedTracks,
    p_earned_badges: state.earnedBadges,
    p_total_quizzes_perfect: state.totalQuizzesPerfect,
  })
}

// ── Assessment ────────────────────────────────────────────────────────────────

export async function loadLatestAssessment(userId: string): Promise<AssessmentResult | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('user_assessments')
    .select('primary_track_id, answers, custom_path, estimated_weeks, total_lessons, essential_count, reasoning')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error || !data) return null

  return {
    primaryTrackId: data.primary_track_id,
    answers: data.answers,
    customPath: data.custom_path,
    estimatedWeeks: data.estimated_weeks ?? 8,
    totalLessons: data.total_lessons ?? 20,
    essentialCount: data.essential_count ?? 5,
    reasoning: data.reasoning ?? '',
  }
}

export async function saveAssessment(userId: string, result: AssessmentResult): Promise<void> {
  const supabase = createClient()
  await supabase.from('user_assessments').insert({
    user_id: userId,
    primary_track_id: result.primaryTrackId,
    answers: result.answers,
    custom_path: result.customPath,
    estimated_weeks: result.estimatedWeeks,
    total_lessons: result.totalLessons,
    essential_count: result.essentialCount,
    reasoning: result.reasoning,
  })
}
