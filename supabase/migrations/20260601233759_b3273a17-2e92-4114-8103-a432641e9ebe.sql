
CREATE TABLE public.funnel_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL UNIQUE,
  path text NOT NULL,
  user_agent text,
  converted boolean NOT NULL DEFAULT false,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_funnel_visits_last_seen ON public.funnel_visits(last_seen_at DESC);
CREATE INDEX idx_funnel_visits_path ON public.funnel_visits(path);

GRANT SELECT, INSERT, UPDATE ON public.funnel_visits TO anon, authenticated;
GRANT ALL ON public.funnel_visits TO service_role;

ALTER TABLE public.funnel_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can insert visits"
  ON public.funnel_visits FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "anyone can update visits"
  ON public.funnel_visits FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "anyone can read visits"
  ON public.funnel_visits FOR SELECT
  TO anon, authenticated
  USING (true);
