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
