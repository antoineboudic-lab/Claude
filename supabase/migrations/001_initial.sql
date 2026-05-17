-- ─────────────────────────────────────────────────────────────────────────────
-- AI Literacy — initial schema
-- Run this once in: Supabase dashboard → SQL Editor → New Query → Run
-- ─────────────────────────────────────────────────────────────────────────────

-- ── User progress (mirrors GameState from lib/gamification/index.ts) ──────────
CREATE TABLE IF NOT EXISTS user_progress (
  user_id              UUID    PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  xp                   INTEGER NOT NULL DEFAULT 0,
  streak               INTEGER NOT NULL DEFAULT 0,
  last_active_date     DATE,
  completed_lessons    TEXT[]  NOT NULL DEFAULT '{}',
  completed_modules    TEXT[]  NOT NULL DEFAULT '{}',
  completed_tracks     TEXT[]  NOT NULL DEFAULT '{}',
  earned_badges        TEXT[]  NOT NULL DEFAULT '{}',
  total_quizzes_perfect INTEGER NOT NULL DEFAULT 0,
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_progress_select" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_progress_upsert" ON user_progress
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── User assessments ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_assessments (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  primary_track_id TEXT        NOT NULL,
  answers          JSONB       NOT NULL DEFAULT '{}',
  custom_path      JSONB       NOT NULL DEFAULT '[]',
  estimated_weeks  INTEGER,
  total_lessons    INTEGER,
  essential_count  INTEGER,
  reasoning        TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE user_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_assessments_select" ON user_assessments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_assessments_insert" ON user_assessments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Latest assessment per user (convenience view)
CREATE OR REPLACE VIEW latest_user_assessment AS
  SELECT DISTINCT ON (user_id) *
  FROM user_assessments
  ORDER BY user_id, created_at DESC;
