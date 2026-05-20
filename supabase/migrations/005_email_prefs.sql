-- ─────────────────────────────────────────────────────────────────────────────
-- Email preferences — add to user_progress
-- Run in: Supabase dashboard → SQL Editor → New Query → Run
-- ─────────────────────────────────────────────────────────────────────────────

-- digest_opt_out: true = unsubscribed from weekly digest
-- last_digest_at: when the last digest was sent (prevents double-sending)
-- last_digest_lesson_count: lesson count snapshot at send time (used to compute "this week" delta)

ALTER TABLE user_progress
  ADD COLUMN IF NOT EXISTS digest_opt_out            BOOLEAN      NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS last_digest_at            TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_digest_lesson_count  INTEGER      NOT NULL DEFAULT 0;

-- Allow service role to update these columns (bypasses RLS)
-- No additional policy needed — SUPABASE_SERVICE_ROLE_KEY bypasses RLS already.

-- sr_queue column (used by the cron) — add if it doesn't exist
ALTER TABLE user_progress
  ADD COLUMN IF NOT EXISTS sr_queue JSONB NOT NULL DEFAULT '[]';
