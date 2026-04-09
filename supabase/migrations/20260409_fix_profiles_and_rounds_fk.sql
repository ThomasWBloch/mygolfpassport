-- ============================================================
-- Migration: fix_profiles_and_rounds_fk
-- ============================================================
-- 1. Auto-create a profile row whenever a new auth user signs up
-- 2. Fix rounds.user_id FK so it references auth.users, not profiles
--
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- ── 1. Trigger: auto-create profile on first signup ──────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Drop trigger if it already exists so we can recreate cleanly
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Backfill: create profile rows for any existing auth users
-- that don't yet have one
INSERT INTO public.profiles (id)
SELECT id FROM auth.users
ON CONFLICT (id) DO NOTHING;


-- ── 2. Fix rounds.user_id FK ─────────────────────────────────

-- Drop whichever FK currently exists on rounds.user_id
-- (may reference profiles or auth.users — we drop both variants)
ALTER TABLE public.rounds
  DROP CONSTRAINT IF EXISTS rounds_user_id_fkey;

ALTER TABLE public.rounds
  DROP CONSTRAINT IF EXISTS rounds_user_id_fkey1;

-- Re-add FK pointing directly to auth.users
ALTER TABLE public.rounds
  ADD CONSTRAINT rounds_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES auth.users (id)
  ON DELETE CASCADE;
