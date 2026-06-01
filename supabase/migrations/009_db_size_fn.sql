-- Returns the current database size in MB.
-- Used by the usage-alerts cron to monitor Supabase free tier limits.
CREATE OR REPLACE FUNCTION get_db_size_mb()
RETURNS numeric
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT round(pg_database_size(current_database()) / 1024.0 / 1024.0, 2);
$$;
