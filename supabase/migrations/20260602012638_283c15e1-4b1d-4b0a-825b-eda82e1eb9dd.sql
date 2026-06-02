-- Drop overly permissive write policies
DROP POLICY IF EXISTS "anyone can insert visits" ON public.funnel_visits;
DROP POLICY IF EXISTS "anyone can update visits" ON public.funnel_visits;

-- Secure RPC for recording visits (only safe path for anon writes)
CREATE OR REPLACE FUNCTION public.track_funnel_visit(
  _session_id text,
  _path text,
  _user_agent text,
  _converted boolean DEFAULT false
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _session_id IS NULL OR length(_session_id) < 4 OR length(_session_id) > 128 THEN
    RAISE EXCEPTION 'invalid session_id';
  END IF;
  IF _path IS NULL OR length(_path) > 256 OR _path !~ '^/' THEN
    RAISE EXCEPTION 'invalid path';
  END IF;

  INSERT INTO public.funnel_visits (session_id, path, user_agent, converted, last_seen_at)
  VALUES (
    _session_id,
    _path,
    NULLIF(left(coalesce(_user_agent, ''), 512), ''),
    coalesce(_converted, false),
    now()
  )
  ON CONFLICT (session_id) DO UPDATE
    SET path = EXCLUDED.path,
        user_agent = EXCLUDED.user_agent,
        last_seen_at = now(),
        converted = public.funnel_visits.converted OR EXCLUDED.converted;
END;
$$;

-- Ensure unique constraint exists for ON CONFLICT
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'funnel_visits_session_id_key'
  ) THEN
    ALTER TABLE public.funnel_visits ADD CONSTRAINT funnel_visits_session_id_key UNIQUE (session_id);
  END IF;
END $$;

REVOKE ALL ON FUNCTION public.track_funnel_visit(text, text, text, boolean) FROM public;
GRANT EXECUTE ON FUNCTION public.track_funnel_visit(text, text, text, boolean) TO anon, authenticated;