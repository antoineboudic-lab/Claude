-- ============================================================
-- OpusLearn — Full Database Setup Script
-- Run this in a fresh Supabase project (SQL Editor)
-- Applies all migrations in order: 001 → 007
-- ============================================================

-- ------------------------------------------------------------
-- Migration: 001_initial.sql
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- Migration: 002_teams.sql
-- ------------------------------------------------------------
-- ─────────────────────────────────────────────────────────────────────────────
-- AI Literacy — Teams schema
-- Run in: Supabase dashboard → SQL Editor → New Query → Run
-- ─────────────────────────────────────────────────────────────────────────────

-- ── User profiles (public display name / avatar) ──────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  user_id      UUID    PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email        TEXT,
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "profiles_upsert_own" ON profiles
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Trigger: keep profiles in sync when a user signs up / updates their metadata
CREATE OR REPLACE FUNCTION handle_user_profile()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO profiles (user_id, display_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email
  )
  ON CONFLICT (user_id) DO UPDATE
    SET display_name = COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        email        = NEW.email,
        updated_at   = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_user_profile();

-- ── Teams ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS teams (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT        NOT NULL,
  plan         TEXT        NOT NULL DEFAULT 'starter',  -- starter | growth | enterprise
  created_by   UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  seat_limit   INTEGER     NOT NULL DEFAULT 15,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Team creator (admin) can manage their team
CREATE POLICY "teams_admin_all" ON teams
  FOR ALL USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Team members can read team info
CREATE POLICY "teams_member_read" ON teams
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_id = teams.id
        AND user_id = auth.uid()
        AND status  = 'active'
    )
  );

-- ── Team members ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS team_members (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id          UUID        NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id          UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  email            TEXT        NOT NULL,
  display_name     TEXT,
  role             TEXT        NOT NULL DEFAULT 'member',  -- admin | member
  assigned_tracks  TEXT[]      NOT NULL DEFAULT '{}',
  status           TEXT        NOT NULL DEFAULT 'active',  -- active | pending
  invited_by       UUID        REFERENCES auth.users(id),
  joined_at        TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS team_members_team_id  ON team_members(team_id);
CREATE INDEX IF NOT EXISTS team_members_user_id  ON team_members(user_id);
CREATE INDEX IF NOT EXISTS team_members_email    ON team_members(email);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Admins can manage all members of their teams
CREATE POLICY "team_members_admin_all" ON team_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM team_members AS me
      WHERE me.team_id = team_members.team_id
        AND me.user_id = auth.uid()
        AND me.role    = 'admin'
        AND me.status  = 'active'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members AS me
      WHERE me.team_id = team_members.team_id
        AND me.user_id = auth.uid()
        AND me.role    = 'admin'
        AND me.status  = 'active'
    )
  );

-- Members can read all members in the same team
CREATE POLICY "team_members_member_read" ON team_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members AS me
      WHERE me.team_id = team_members.team_id
        AND me.user_id = auth.uid()
        AND me.status  = 'active'
    )
  );

-- Members can update their own record (e.g. join)
CREATE POLICY "team_members_self_update" ON team_members
  FOR UPDATE USING (user_id = auth.uid())
  WITH CHECK  (user_id = auth.uid());

-- ── Team invites ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS team_invites (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id          UUID        NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  email            TEXT        NOT NULL,
  token            UUID        NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  invited_by       UUID        NOT NULL REFERENCES auth.users(id),
  assigned_tracks  TEXT[]      NOT NULL DEFAULT '{}',
  status           TEXT        NOT NULL DEFAULT 'pending',  -- pending | accepted | expired
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at       TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days')
);

CREATE INDEX IF NOT EXISTS team_invites_token ON team_invites(token);

ALTER TABLE team_invites ENABLE ROW LEVEL SECURITY;

-- Anyone can read an invite by its token (needed to render the /join page)
CREATE POLICY "team_invites_public_read_by_token" ON team_invites
  FOR SELECT USING (true);

-- Admins can manage invites for their teams
CREATE POLICY "team_invites_admin_all" ON team_invites
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM team_members AS me
      WHERE me.team_id = team_invites.team_id
        AND me.user_id = auth.uid()
        AND me.role    = 'admin'
        AND me.status  = 'active'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members AS me
      WHERE me.team_id = team_invites.team_id
        AND me.user_id = auth.uid()
        AND me.role    = 'admin'
        AND me.status  = 'active'
    )
  );

-- ── Allow team admins to read member progress ─────────────────────────────────
CREATE POLICY "team_admin_progress_read" ON user_progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM team_members admin_row
      JOIN team_members subject_row ON admin_row.team_id = subject_row.team_id
      WHERE admin_row.user_id   = auth.uid()
        AND admin_row.role      = 'admin'
        AND admin_row.status    = 'active'
        AND subject_row.user_id = user_progress.user_id
        AND subject_row.status  = 'active'
    )
  );

-- Allow team members to read teammate profiles
CREATE POLICY "team_member_profile_read" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM team_members me
      JOIN team_members other ON me.team_id = other.team_id
      WHERE me.user_id    = auth.uid()
        AND me.status     = 'active'
        AND other.user_id = profiles.user_id
        AND other.status  = 'active'
    )
  );

-- ── Convenience view: team member with progress ───────────────────────────────
CREATE OR REPLACE VIEW team_member_progress AS
  SELECT
    tm.id,
    tm.team_id,
    tm.user_id,
    tm.email,
    tm.display_name,
    tm.role,
    tm.assigned_tracks,
    tm.status,
    tm.joined_at,
    tm.created_at,
    COALESCE(up.xp, 0)                          AS xp,
    COALESCE(up.streak, 0)                       AS streak,
    COALESCE(up.completed_lessons, '{}')         AS completed_lessons,
    COALESCE(up.completed_tracks, '{}')          AS completed_tracks,
    COALESCE(up.earned_badges, '{}')             AS earned_badges,
    COALESCE(array_length(up.completed_lessons, 1), 0) AS lesson_count
  FROM team_members tm
  LEFT JOIN user_progress up ON tm.user_id = up.user_id;

-- ------------------------------------------------------------
-- Migration: 003_growth.sql
-- ------------------------------------------------------------
-- ─── Leads (pre-signup email capture) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  email         text        NOT NULL,
  source        text        DEFAULT 'assessment',  -- 'assessment' | 'landing' | 'blog'
  role          text,
  metadata      jsonb       DEFAULT '{}',
  converted_at  timestamptz,
  created_at    timestamptz DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS leads_email_idx ON leads (lower(email));

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "leads_insert" ON leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "leads_service_read" ON leads FOR SELECT USING (false);

GRANT INSERT ON leads TO anon, authenticated;

-- ─── Email log ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS email_log (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  lead_id    uuid        REFERENCES leads(id)       ON DELETE SET NULL,
  email      text        NOT NULL,
  sequence   text        NOT NULL,  -- 'welcome' | 'activation' | 'reengagement' | 'upgrade'
  step       integer     DEFAULT 1,
  status     text        DEFAULT 'sent',
  sent_at    timestamptz DEFAULT now()
);

ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "email_log_user_read" ON email_log FOR SELECT USING (auth.uid() = user_id);

GRANT SELECT ON email_log TO authenticated;

-- ─── Referrals ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS referrals (
  id           uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id  uuid    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code         text    NOT NULL,
  clicks       integer DEFAULT 0,
  signups      integer DEFAULT 0,
  conversions  integer DEFAULT 0,
  reward_xp    integer DEFAULT 0,
  created_at   timestamptz DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS referrals_code_idx ON referrals (code);
CREATE UNIQUE INDEX IF NOT EXISTS referrals_user_idx ON referrals (referrer_id);

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "referrals_owner"   ON referrals FOR ALL    USING (auth.uid() = referrer_id);
CREATE POLICY "referrals_public"  ON referrals FOR SELECT TO anon, authenticated USING (true);

GRANT SELECT ON referrals TO anon, authenticated;

-- ─── Referral events ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS referral_events (
  id               uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  referral_id      uuid    NOT NULL REFERENCES referrals(id) ON DELETE CASCADE,
  event_type       text    NOT NULL,  -- 'click' | 'signup' | 'conversion'
  referred_user_id uuid,
  metadata         jsonb   DEFAULT '{}',
  created_at       timestamptz DEFAULT now()
);

ALTER TABLE referral_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ref_events_insert" ON referral_events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "ref_events_owner"  ON referral_events FOR SELECT USING (
  referral_id IN (SELECT id FROM referrals WHERE referrer_id = auth.uid())
);

GRANT INSERT, SELECT ON referral_events TO anon, authenticated;

-- ------------------------------------------------------------
-- Migration: 004_push_subscriptions.sql
-- ------------------------------------------------------------
-- ─── Push notification subscriptions ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  endpoint    text        UNIQUE NOT NULL,
  keys        jsonb       NOT NULL,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own subscriptions"
  ON push_subscriptions
  FOR ALL
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------
-- Migration: 005_email_prefs.sql
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- Migration: 006_auth_webhook.sql
-- ------------------------------------------------------------
-- Set up database triggers to call our /api/auth/webhook on user create + email confirm
-- Run once in: Supabase dashboard → SQL Editor → New Query → Run

-- pg_net is pre-installed in Supabase — this just ensures it's active
create extension if not exists pg_net;

-- Function called by both triggers below
create or replace function call_auth_webhook()
returns trigger
language plpgsql
security definer
as $$
begin
  begin
    perform net.http_post(
      url  := 'https://www.opuslearn.ai/api/auth/webhook',
      body := jsonb_build_object(
        'type',       tg_op,
        'table',      tg_table_name,
        'schema',     tg_table_schema,
        'record',     row_to_json(new)::jsonb,
        'old_record', case when tg_op = 'UPDATE' then row_to_json(old)::jsonb else null::jsonb end
      ),
      headers := jsonb_build_object(
        'Content-Type',              'application/json',
        'x-supabase-webhook-secret', '0e173b9bc5691b0977ab4a5e6fbbb1df696fb3f3de5f5c1e725ce837c8a87256'
      )
    );
  exception when others then
    null; -- webhook failure must never block user creation
  end;
  return new;
end;
$$;

-- Drop old triggers if they exist
drop trigger if exists auth_users_insert_webhook on auth.users;
drop trigger if exists auth_users_confirm_webhook on auth.users;

-- Fires on new user creation (handles Supabase auto-confirm mode — email_confirmed_at set immediately)
create trigger auth_users_insert_webhook
  after insert on auth.users
  for each row
  execute function call_auth_webhook();

-- Fires when email_confirmed_at changes null → timestamp (user clicked confirmation link)
create trigger auth_users_confirm_webhook
  after update of email_confirmed_at on auth.users
  for each row
  when (old.email_confirmed_at is null and new.email_confirmed_at is not null)
  execute function call_auth_webhook();

-- ------------------------------------------------------------
-- Migration: 007_subscriptions.sql
-- ------------------------------------------------------------
-- Create subscriptions table for Stripe subscription tracking
create table if not exists public.subscriptions (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null references auth.users(id) on delete cascade unique,
  stripe_customer_id      text,
  stripe_subscription_id  text,
  status                  text not null default 'inactive'
                            check (status in ('active', 'trialing', 'past_due', 'canceled', 'inactive')),
  plan                    text check (plan in ('pro_monthly', 'pro_annual')),
  current_period_end      timestamptz,
  trial_end               timestamptz,
  updated_at              timestamptz not null default now()
);

-- Indexes for fast lookups by Stripe IDs (used in webhook handler)
create index if not exists subscriptions_stripe_customer_id_idx  on public.subscriptions (stripe_customer_id);
create index if not exists subscriptions_stripe_subscription_id_idx on public.subscriptions (stripe_subscription_id);

-- RLS: users can only read their own subscription
alter table public.subscriptions enable row level security;

create policy "Users can read own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Service role (used by webhook) bypasses RLS automatically

