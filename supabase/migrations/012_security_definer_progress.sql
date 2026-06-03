-- Workaround: supautils (loaded for the authenticator role) intercepts RLS
-- policy evaluation and retains a cached reference to team_members that
-- survives all DROP/DISABLE attempts. SECURITY DEFINER functions run as
-- postgres (BYPASSRLS), so they are unaffected by supautils hooks while
-- still using auth.uid() to scope access to the calling user's own row.

CREATE OR REPLACE FUNCTION load_my_progress()
RETURNS TABLE (
  xp INTEGER, streak INTEGER,
  last_active_date DATE,
  completed_lessons TEXT[], completed_modules TEXT[],
  completed_tracks TEXT[], earned_badges TEXT[],
  total_quizzes_perfect INTEGER
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT xp, streak, last_active_date,
         completed_lessons, completed_modules, completed_tracks,
         earned_badges, total_quizzes_perfect
  FROM user_progress WHERE user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION save_my_progress(
  p_xp INTEGER, p_streak INTEGER, p_last_active_date DATE,
  p_completed_lessons TEXT[], p_completed_modules TEXT[],
  p_completed_tracks TEXT[], p_earned_badges TEXT[],
  p_total_quizzes_perfect INTEGER
)
RETURNS VOID
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  INSERT INTO user_progress (
    user_id, xp, streak, last_active_date,
    completed_lessons, completed_modules, completed_tracks,
    earned_badges, total_quizzes_perfect, updated_at
  ) VALUES (
    auth.uid(), p_xp, p_streak, p_last_active_date,
    p_completed_lessons, p_completed_modules, p_completed_tracks,
    p_earned_badges, p_total_quizzes_perfect, NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    xp = EXCLUDED.xp, streak = EXCLUDED.streak,
    last_active_date = EXCLUDED.last_active_date,
    completed_lessons = EXCLUDED.completed_lessons,
    completed_modules = EXCLUDED.completed_modules,
    completed_tracks = EXCLUDED.completed_tracks,
    earned_badges = EXCLUDED.earned_badges,
    total_quizzes_perfect = EXCLUDED.total_quizzes_perfect,
    updated_at = EXCLUDED.updated_at;
$$;

GRANT EXECUTE ON FUNCTION load_my_progress() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION save_my_progress(INTEGER,INTEGER,DATE,TEXT[],TEXT[],TEXT[],TEXT[],INTEGER) TO authenticated;
