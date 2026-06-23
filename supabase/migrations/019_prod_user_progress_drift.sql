-- Schema drift repair: production's user_progress was missing four columns
-- that the app and crons depend on (present on the dev project but never
-- applied to prod during the project migration). Without these:
--   - the weekly-digest cron errors (selects/updates last_digest_at,
--     last_digest_lesson_count) regardless of CRON_SECRET
--   - the spaced-repetition review feature has nowhere to store its queue
--     (sr_queue)
-- Types and defaults match the dev project (nqxymjeoidlqtwxuhkhy) exactly.
ALTER TABLE public.user_progress
  ADD COLUMN IF NOT EXISTS digest_opt_out           BOOLEAN     NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS last_digest_at           TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_digest_lesson_count INTEGER     NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS sr_queue                 JSONB       NOT NULL DEFAULT '[]'::jsonb;
