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
