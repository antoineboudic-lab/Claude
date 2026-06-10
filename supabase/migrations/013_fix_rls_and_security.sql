-- ─────────────────────────────────────────────────────────────────────────────
-- 013: Fix RLS and security issues flagged by Supabase security advisor
--
-- Root cause: migration 011 (SECURITY DEFINER helper functions + RLS fixes)
-- was never applied to production. As a result:
--   - team_members had RLS disabled (all team data publicly readable)
--   - team_goals had RLS disabled and only a weak creator-check policy
--   - latest_user_assessment view ran as owner, bypassing RLS
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. SECURITY DEFINER helper functions (from migration 011) ─────────────────
-- These bypass RLS when querying team_members, preventing recursive policy
-- evaluation once RLS is re-enabled on that table.

CREATE OR REPLACE FUNCTION public.is_team_admin(p_team_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM team_members
    WHERE team_id = p_team_id AND user_id = auth.uid()
      AND role = 'admin' AND status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_team_member(p_team_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM team_members
    WHERE team_id = p_team_id AND user_id = auth.uid() AND status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_same_team_admin_of(p_subject_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1
    FROM team_members admin_row
    JOIN team_members subject_row ON admin_row.team_id = subject_row.team_id
    WHERE admin_row.user_id = auth.uid() AND admin_row.role = 'admin'
      AND admin_row.status = 'active'
      AND subject_row.user_id = p_subject_user_id AND subject_row.status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION public.shares_team_with(p_other_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1
    FROM team_members me
    JOIN team_members other ON me.team_id = other.team_id
    WHERE me.user_id = auth.uid() AND me.status = 'active'
      AND other.user_id = p_other_user_id AND other.status = 'active'
  );
$$;

-- ── 2. Re-enable RLS on team_members and restore policies ─────────────────────

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "team_members_admin_all"   ON public.team_members;
DROP POLICY IF EXISTS "team_members_member_read" ON public.team_members;
DROP POLICY IF EXISTS "team_members_self_update" ON public.team_members;

CREATE POLICY "team_members_admin_all" ON public.team_members
  FOR ALL
  USING (is_team_admin(team_id)) WITH CHECK (is_team_admin(team_id));

CREATE POLICY "team_members_member_read" ON public.team_members
  FOR SELECT USING (is_team_member(team_id));

CREATE POLICY "team_members_self_update" ON public.team_members
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- ── 3. Fix policies on related tables that should use helper functions ─────────

-- teams: members (not just creator) can read their team
DROP POLICY IF EXISTS "teams_member_read" ON public.teams;
CREATE POLICY "teams_member_read" ON public.teams
  FOR SELECT USING (is_team_member(id));

-- team_invites: any team admin (not just creator) can manage invites
DROP POLICY IF EXISTS "team_invites_admin_all" ON public.team_invites;
CREATE POLICY "team_invites_admin_all" ON public.team_invites
  FOR ALL
  USING (is_team_admin(team_id)) WITH CHECK (is_team_admin(team_id));

-- user_progress: team admin can read member progress
DROP POLICY IF EXISTS "team_admin_progress_read" ON public.user_progress;
CREATE POLICY "team_admin_progress_read" ON public.user_progress
  FOR SELECT USING (is_same_team_admin_of(user_id));

-- profiles: team members can read each other's profiles
DROP POLICY IF EXISTS "team_member_profile_read" ON public.profiles;
CREATE POLICY "team_member_profile_read" ON public.profiles
  FOR SELECT USING (shares_team_with(user_id));

-- ── 4. Enable RLS on team_goals ───────────────────────────────────────────────
-- Table was created ad-hoc in the dashboard; it had a weak creator-only
-- policy but RLS was never enabled, so the policy was silently bypassed.

ALTER TABLE public.team_goals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "team_goals_write" ON public.team_goals;

CREATE POLICY "team_goals_admin_all" ON public.team_goals
  FOR ALL
  USING (is_team_admin(team_id)) WITH CHECK (is_team_admin(team_id));

CREATE POLICY "team_goals_member_read" ON public.team_goals
  FOR SELECT USING (is_team_member(team_id));

-- ── 5. Fix latest_user_assessment view (security invoker) ─────────────────────
-- Without security_invoker=true the view runs as the owner role, bypassing
-- RLS on user_assessments.

DROP VIEW IF EXISTS public.latest_user_assessment;
CREATE VIEW public.latest_user_assessment WITH (security_invoker = true) AS
  SELECT DISTINCT ON (user_id)
    id, user_id, primary_track_id, answers,
    custom_path, estimated_weeks, total_lessons,
    essential_count, reasoning, created_at
  FROM public.user_assessments
  ORDER BY user_id, created_at DESC;

-- ── 6. Fix function search_path and restrict public execute ───────────────────

CREATE OR REPLACE FUNCTION public.call_auth_webhook()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  BEGIN
    PERFORM net.http_post(
      url     := 'https://www.opuslearn.ai/api/auth/webhook',
      body    := jsonb_build_object(
        'type',       tg_op,
        'table',      tg_table_name,
        'schema',     tg_table_schema,
        'record',     row_to_json(NEW)::jsonb,
        'old_record', CASE WHEN tg_op = 'UPDATE' THEN row_to_json(OLD)::jsonb ELSE NULL::jsonb END
      ),
      headers := jsonb_build_object(
        'Content-Type',              'application/json',
        'x-supabase-webhook-secret', '0e173b9bc5691b0977ab4a5e6fbbb1df696fb3f3de5f5c1e725ce837c8a87256'
      )
    );
  EXCEPTION WHEN others THEN
    NULL;
  END;
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.call_auth_webhook() FROM PUBLIC;

CREATE OR REPLACE FUNCTION public.get_db_size_mb()
RETURNS numeric LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT round(pg_database_size(current_database()) / 1024.0 / 1024.0, 2);
$$;
REVOKE EXECUTE ON FUNCTION public.get_db_size_mb() FROM PUBLIC;

REVOKE EXECUTE ON FUNCTION public.handle_user_profile() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_team_created()  FROM PUBLIC;

REVOKE EXECUTE ON FUNCTION public.load_my_progress() FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.load_my_progress() TO authenticated;

REVOKE EXECUTE ON FUNCTION
  public.save_my_progress(INTEGER,INTEGER,DATE,TEXT[],TEXT[],TEXT[],TEXT[],INTEGER)
FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION
  public.save_my_progress(INTEGER,INTEGER,DATE,TEXT[],TEXT[],TEXT[],TEXT[],INTEGER)
TO authenticated;
