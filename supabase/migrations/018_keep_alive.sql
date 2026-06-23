-- Lightweight keep-alive endpoint. An external scheduler (the
-- .github/workflows/keep-alive.yml GitHub Action) calls this on a schedule so
-- the free-tier project registers activity and does not auto-pause after ~7
-- days of inactivity. Returns the current time; executes a real query so it
-- counts as database activity. Exposes no data, safe for anon.
CREATE OR REPLACE FUNCTION public.keep_alive()
RETURNS timestamptz
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$ SELECT now(); $$;

GRANT EXECUTE ON FUNCTION public.keep_alive() TO anon, authenticated;
