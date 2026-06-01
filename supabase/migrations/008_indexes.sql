-- Performance indexes for scale
-- These tables had no indexes beyond PKs — full table scans at 100k+ rows.

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id
  ON user_progress(user_id);

CREATE INDEX IF NOT EXISTS idx_user_progress_last_active_date
  ON user_progress(last_active_date);


CREATE INDEX IF NOT EXISTS idx_user_assessments_user_id_created
  ON user_assessments(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_assessments_created_at
  ON user_assessments(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_email_log_user_sequence
  ON email_log(user_id, sequence);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id
  ON subscriptions(user_id);

CREATE INDEX IF NOT EXISTS idx_subscriptions_status
  ON subscriptions(status)
  WHERE status IN ('active', 'trialing');
