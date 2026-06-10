-- ─────────────────────────────────────────────────────────────────────────────
-- Server-authoritative progress
--
-- 1. Persist longest_streak and activity_dates (previously localStorage-only,
--    so the streak calendar reset on every new device).
-- 2. save_my_progress now MERGES instead of overwriting: array columns union,
--    counters take GREATEST, streak follows the most recent activity date.
--    A stale device can no longer clobber progress earned elsewhere.
-- 3. save_my_progress returns the merged row so the client can adopt the
--    server's view immediately after writing.
--
-- Note: load/save keep the SECURITY DEFINER pattern from migration 012.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE user_progress
  ADD COLUMN IF NOT EXISTS longest_streak INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS activity_dates TEXT[] NOT NULL DEFAULT '{}';

-- Backfill: longest streak is at least the current streak
UPDATE user_progress SET longest_streak = streak WHERE longest_streak < streak;

DROP FUNCTION IF EXISTS load_my_progress();
CREATE FUNCTION load_my_progress()
RETURNS TABLE (
  xp INTEGER, streak INTEGER, longest_streak INTEGER,
  last_active_date DATE, activity_dates TEXT[],
  completed_lessons TEXT[], completed_modules TEXT[],
  completed_tracks TEXT[], earned_badges TEXT[],
  total_quizzes_perfect INTEGER
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT xp, streak, longest_streak, last_active_date, activity_dates,
         completed_lessons, completed_modules, completed_tracks,
         earned_badges, total_quizzes_perfect
  FROM user_progress WHERE user_id = auth.uid();
$$;

DROP FUNCTION IF EXISTS save_my_progress(INTEGER,INTEGER,DATE,TEXT[],TEXT[],TEXT[],TEXT[],INTEGER);

-- Dedupe an array preserving first-occurrence order (completedLessons order
-- feeds "recent activity" on the dashboard, so plain DISTINCT won't do).
CREATE OR REPLACE FUNCTION array_union_ordered(a TEXT[], b TEXT[])
RETURNS TEXT[]
LANGUAGE sql IMMUTABLE AS $$
  SELECT COALESCE(
    ARRAY(
      SELECT x FROM unnest(a || b) WITH ORDINALITY AS t(x, ord)
      GROUP BY x ORDER BY MIN(ord)
    ),
    '{}'
  );
$$;

CREATE FUNCTION save_my_progress(
  p_xp INTEGER, p_streak INTEGER, p_longest_streak INTEGER,
  p_last_active_date DATE, p_activity_dates TEXT[],
  p_completed_lessons TEXT[], p_completed_modules TEXT[],
  p_completed_tracks TEXT[], p_earned_badges TEXT[],
  p_total_quizzes_perfect INTEGER
)
RETURNS TABLE (
  xp INTEGER, streak INTEGER, longest_streak INTEGER,
  last_active_date DATE, activity_dates TEXT[],
  completed_lessons TEXT[], completed_modules TEXT[],
  completed_tracks TEXT[], earned_badges TEXT[],
  total_quizzes_perfect INTEGER
)
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  INSERT INTO user_progress AS up (
    user_id, xp, streak, longest_streak, last_active_date, activity_dates,
    completed_lessons, completed_modules, completed_tracks, earned_badges,
    total_quizzes_perfect, updated_at
  ) VALUES (
    auth.uid(), p_xp, p_streak, GREATEST(p_longest_streak, p_streak),
    p_last_active_date, COALESCE(p_activity_dates, '{}'),
    COALESCE(p_completed_lessons, '{}'), COALESCE(p_completed_modules, '{}'),
    COALESCE(p_completed_tracks, '{}'), COALESCE(p_earned_badges, '{}'),
    p_total_quizzes_perfect, NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    xp = GREATEST(up.xp, EXCLUDED.xp),
    -- streak belongs to whichever device was active most recently;
    -- on a tie, take the larger value (GREATEST ignores NULLs in Postgres)
    streak = CASE
      WHEN up.last_active_date IS NULL THEN EXCLUDED.streak
      WHEN EXCLUDED.last_active_date IS NULL THEN up.streak
      WHEN EXCLUDED.last_active_date > up.last_active_date THEN EXCLUDED.streak
      WHEN EXCLUDED.last_active_date = up.last_active_date THEN GREATEST(up.streak, EXCLUDED.streak)
      ELSE up.streak
    END,
    longest_streak = GREATEST(up.longest_streak, EXCLUDED.longest_streak),
    last_active_date = GREATEST(up.last_active_date, EXCLUDED.last_active_date),
    activity_dates = (
      SELECT COALESCE(ARRAY(SELECT DISTINCT d FROM unnest(up.activity_dates || EXCLUDED.activity_dates) d ORDER BY d), '{}')
    ),
    completed_lessons = array_union_ordered(up.completed_lessons, EXCLUDED.completed_lessons),
    completed_modules = array_union_ordered(up.completed_modules, EXCLUDED.completed_modules),
    completed_tracks  = array_union_ordered(up.completed_tracks,  EXCLUDED.completed_tracks),
    earned_badges     = array_union_ordered(up.earned_badges,     EXCLUDED.earned_badges),
    total_quizzes_perfect = GREATEST(up.total_quizzes_perfect, EXCLUDED.total_quizzes_perfect),
    updated_at = NOW()
  RETURNING up.xp, up.streak, up.longest_streak, up.last_active_date, up.activity_dates,
            up.completed_lessons, up.completed_modules, up.completed_tracks,
            up.earned_badges, up.total_quizzes_perfect;
$$;

-- Backward-compatible overload for clients deployed before this migration
-- (the old 8-param signature). Forwards to the merging implementation, so
-- old clients stop clobbering too; they just don't supply longest_streak or
-- activity_dates. PostgREST resolves the overload by named arguments.
CREATE FUNCTION save_my_progress(
  p_xp INTEGER, p_streak INTEGER, p_last_active_date DATE,
  p_completed_lessons TEXT[], p_completed_modules TEXT[],
  p_completed_tracks TEXT[], p_earned_badges TEXT[],
  p_total_quizzes_perfect INTEGER
)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  PERFORM 1 FROM save_my_progress(
    p_xp, p_streak, 0, p_last_active_date, '{}'::TEXT[],
    p_completed_lessons, p_completed_modules, p_completed_tracks,
    p_earned_badges, p_total_quizzes_perfect
  );
END $$;

GRANT EXECUTE ON FUNCTION load_my_progress() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION save_my_progress(INTEGER,INTEGER,INTEGER,DATE,TEXT[],TEXT[],TEXT[],TEXT[],TEXT[],INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION save_my_progress(INTEGER,INTEGER,DATE,TEXT[],TEXT[],TEXT[],TEXT[],INTEGER) TO authenticated;
