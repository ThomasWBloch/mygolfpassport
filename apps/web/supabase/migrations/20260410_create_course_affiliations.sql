CREATE TABLE IF NOT EXISTS public.course_affiliations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE public.course_affiliations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own affiliations"
  ON public.course_affiliations
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can read affiliations"
  ON public.course_affiliations
  FOR SELECT
  USING (true);
