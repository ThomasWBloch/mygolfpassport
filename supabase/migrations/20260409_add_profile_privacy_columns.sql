-- Add privacy/social preference columns to profiles
-- Run in Supabase Dashboard → SQL Editor

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS allow_round_requests_friends  boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS allow_round_requests_strangers boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS show_in_search               boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS show_course_count            boolean DEFAULT true;
