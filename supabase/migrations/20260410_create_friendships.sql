-- ── friendships table ────────────────────────────────────────────────────────
-- Stores friend connections between users.
-- A friendship is represented as two rows: (A→B) and (B→A) once accepted,
-- or a single pending row (requester→recipient) before acceptance.

CREATE TABLE IF NOT EXISTS public.friendships (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status       text NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now(),

  -- Prevent duplicate pairs in either direction
  UNIQUE (requester_id, recipient_id),
  -- Prevent self-friendship
  CHECK (requester_id <> recipient_id)
);

-- ── Indexes ───────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS friendships_requester_idx ON public.friendships (requester_id);
CREATE INDEX IF NOT EXISTS friendships_recipient_idx ON public.friendships (recipient_id);

-- ── Row Level Security ────────────────────────────────────────────────────────
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;

-- Users can see friendships they are part of
CREATE POLICY "Users can view own friendships"
  ON public.friendships FOR SELECT
  USING (auth.uid() = requester_id OR auth.uid() = recipient_id);

-- Only the requester can send a friend request
CREATE POLICY "Users can send friend requests"
  ON public.friendships FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

-- Either party can update (accept/decline) or delete (unfriend)
CREATE POLICY "Users can update own friendships"
  ON public.friendships FOR UPDATE
  USING (auth.uid() = requester_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can delete own friendships"
  ON public.friendships FOR DELETE
  USING (auth.uid() = requester_id OR auth.uid() = recipient_id);

-- ── updated_at trigger ────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS friendships_updated_at ON public.friendships;
CREATE TRIGGER friendships_updated_at
  BEFORE UPDATE ON public.friendships
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
