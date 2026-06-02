CREATE TABLE social_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('linkedin', 'instagram')),
  post_url text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE social_shares ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own social_shares" ON social_shares
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own social_shares" ON social_shares
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_social_shares_user_id ON social_shares (user_id);
CREATE INDEX idx_social_shares_status ON social_shares (status);
