import { createClient } from './client'
import type { GameState } from '@/lib/gamification'
import type { AssessmentResult } from '@/lib/assessment/types'

// ── Progress ──────────────────────────────────────────────────────────────────

export async function loadUserProgress(userId: string): Promise<GameState | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error || !data) return null

  return {
    xp: data.xp ?? 0,
    streak: data.streak ?? 0,
    longestStreak: data.longest_streak ?? 0,
    lastActiveDate: data.last_active_date ?? null,
    activityDates: data.activity_dates ?? [],
    completedLessons: data.completed_lessons ?? [],
    completedModules: data.completed_modules ?? [],
    completedTracks: data.completed_tracks ?? [],
    earnedBadges: data.earned_badges ?? [],
    totalQuizzesPerfect: data.total_quizzes_perfect ?? 0,
  }
}

export async function saveUserProgress(userId: string, state: GameState): Promise<void> {
  const supabase = createClient()
  await supabase.from('user_progress').upsert(
    {
      user_id: userId,
      xp: state.xp,
      streak: state.streak,
      last_active_date: state.lastActiveDate,
      completed_lessons: state.completedLessons,
      completed_modules: state.completedModules,
      completed_tracks: state.completedTracks,
      earned_badges: state.earnedBadges,
      total_quizzes_perfect: state.totalQuizzesPerfect,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  )
}

// ── Assessment ────────────────────────────────────────────────────────────────

export async function loadLatestAssessment(userId: string): Promise<AssessmentResult | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('user_assessments')
    .select('*')
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
