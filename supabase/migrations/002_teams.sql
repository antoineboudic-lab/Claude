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
