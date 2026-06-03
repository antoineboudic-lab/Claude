-- Fix: infinite recursion in team_members RLS policies
--
-- The team_members policies queried team_members within their own USING/WITH CHECK
-- clauses. PostgreSQL evaluates every applicable policy when a query hits the
-- table, so evaluating the policy triggered itself → infinite recursion.
--
-- This also broke every other table whose policies queried team_members
-- (user_progress, profiles, teams, team_invites), because PostgreSQL still
-- applies team_members RLS when those subqueries run.
--
-- Fix: SECURITY DEFINER helper functions query team_members while bypassing
-- RLS, so there is no re-entrant policy evaluation.

-- ── Helper functions ──────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION is_team_admin(p_team_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM team_members
    WHERE team_id = p_team_id
      AND user_id = auth.uid()
      AND role    = 'admin'
      AND status  = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION is_team_member(p_team_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM team_members
    WHERE team_id = p_team_id
      AND user_id = auth.uid()
      AND status  = 'active'
  );
$$;

-- Used by team_admin_progress_read and team_member_profile_read to check
-- whether the current user shares a team with a given user_id.
CREATE OR REPLACE FUNCTION is_same_team_admin_of(p_subject_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM team_members admin_row
    JOIN team_members subject_row ON admin_row.team_id = subject_row.team_id
    WHERE admin_row.user_id   = auth.uid()
      AND admin_row.role      = 'admin'
      AND admin_row.status    = 'active'
      AND subject_row.user_id = p_subject_user_id
      AND subject_row.status  = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION shares_team_with(p_other_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM team_members me
    JOIN team_members other ON me.team_id = other.team_id
    WHERE me.user_id    = auth.uid()
      AND me.status     = 'active'
      AND other.user_id = p_other_user_id
      AND other.status  = 'active'
  );
$$;

-- ── Fix self-referential policies on team_members ─────────────────────────────

DROP POLICY IF EXISTS "team_members_admin_all"    ON team_members;
DROP POLICY IF EXISTS "team_members_member_read"  ON team_members;

CREATE POLICY "team_members_admin_all" ON team_members
  FOR ALL
  USING     (is_team_admin(team_id))
  WITH CHECK(is_team_admin(team_id));

CREATE POLICY "team_members_member_read" ON team_members
  FOR SELECT
  USING (is_team_member(team_id));

-- ── Fix downstream policies that queried team_members ─────────────────────────

-- teams
DROP POLICY IF EXISTS "teams_member_read" ON teams;
CREATE POLICY "teams_member_read" ON teams
  FOR SELECT USING (is_team_member(id));

-- team_invites
DROP POLICY IF EXISTS "team_invites_admin_all" ON team_invites;
CREATE POLICY "team_invites_admin_all" ON team_invites
  FOR ALL
  USING     (is_team_admin(team_id))
  WITH CHECK(is_team_admin(team_id));

-- user_progress (team admin can read a member's progress)
DROP POLICY IF EXISTS "team_admin_progress_read" ON user_progress;
CREATE POLICY "team_admin_progress_read" ON user_progress
  FOR SELECT USING (is_same_team_admin_of(user_id));

-- profiles (team members can read teammate profiles)
DROP POLICY IF EXISTS "team_member_profile_read" ON profiles;
CREATE POLICY "team_member_profile_read" ON profiles
  FOR SELECT USING (shares_team_with(user_id));
