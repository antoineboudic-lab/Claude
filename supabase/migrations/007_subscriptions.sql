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
