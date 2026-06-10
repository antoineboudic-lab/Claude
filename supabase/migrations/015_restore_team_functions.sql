-- ─────────────────────────────────────────────────────────────────────────────
-- Restore team functions, policies, and team_goals
--
-- The June 2026 Supabase project migration copied tables but not functions or
-- triggers. This left the new project with:
--   - none of the team RLS helper functions (is_team_admin, is_team_member,
--     shares_team_with, is_same_team_admin_of)
--   - team_members policies still using the SELF-REFERENTIAL pattern that
--     migration 011 replaced — Postgres raises "infinite recursion detected
--     in policy" on any team_members query, so team features error outright
--   - no on_team_created trigger (team creators were never added as admins)
--   - no team_goals table at all (it was created ad-hoc on prod and never
--     captured in a migration — this file is now its canonical DDL)
--
-- Everything here is idempotent and matches the live prod definitions, so it
-- is a no-op when run against a database that already has them.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. team_goals table ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS team_goals (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id    UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  deadline   DATE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE team_goals ENABLE ROW LEVEL SECURITY;

-- ── 2. SECURITY DEFINER helpers (bypass RLS, so policies can use them
--       without recursing into the table they protect) ─────────────────────────

CREATE OR REPLACE FUNCTION is_team_member(p_team_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM team_members
    WHERE team_id = p_team_id AND user_id = auth.uid() AND status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION is_team_admin(p_team_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM team_members
    WHERE team_id = p_team_id AND user_id = auth.uid()
      AND role = 'admin' AND status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION shares_team_with(p_other_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1
    FROM team_members me
    JOIN team_members other ON me.team_id = other.team_id
    WHERE me.user_id = auth.uid() AND me.status = 'active'
      AND other.user_id = p_other_user_id AND other.status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION is_same_team_admin_of(p_subject_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1
    FROM team_members admin_row
    JOIN team_members subject_row ON admin_row.team_id = subject_row.team_id
    WHERE admin_row.user_id = auth.uid() AND admin_row.role = 'admin'
      AND admin_row.status = 'active'
      AND subject_row.user_id = p_subject_user_id AND subject_row.status = 'active'
  );
$$;

-- ── 3. Non-recursive policies (replace any self-referential versions) ─────────

DROP POLICY IF EXISTS "teams_member_read" ON teams;
CREATE POLICY "teams_member_read" ON teams
  FOR SELECT USING (is_team_member(id));

DROP POLICY IF EXISTS "team_members_member_read" ON team_members;
CREATE POLICY "team_members_member_read" ON team_members
  FOR SELECT USING (is_team_member(team_id));

DROP POLICY IF EXISTS "team_members_admin_all" ON team_members;
CREATE POLICY "team_members_admin_all" ON team_members
  FOR ALL USING (is_team_admin(team_id))
  WITH CHECK (is_team_admin(team_id));

DROP POLICY IF EXISTS "team_goals_member_read" ON team_goals;
CREATE POLICY "team_goals_member_read" ON team_goals
  FOR SELECT USING (is_team_member(team_id));

DROP POLICY IF EXISTS "team_goals_admin_all" ON team_goals;
CREATE POLICY "team_goals_admin_all" ON team_goals
  FOR ALL USING (is_team_admin(team_id))
  WITH CHECK (is_team_admin(team_id));

-- ── 4. Team-creation trigger: creator joins as active admin ───────────────────

CREATE OR REPLACE FUNCTION handle_team_created()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
  DECLARE
    v_email TEXT;
    v_name  TEXT;
  BEGIN
    SELECT email INTO v_email FROM auth.users WHERE id = NEW.created_by;
    v_name := split_part(v_email, '@', 1);

    INSERT INTO team_members (team_id, user_id, email, display_name, role, status, joined_at)
    VALUES (NEW.id, NEW.created_by, v_email, v_name, 'admin', 'active', NOW())
    ON CONFLICT DO NOTHING;

    RETURN NEW;
  END;
$$;

DROP TRIGGER IF EXISTS on_team_created ON teams;
CREATE TRIGGER on_team_created
  AFTER INSERT ON teams
  FOR EACH ROW EXECUTE FUNCTION handle_team_created();
