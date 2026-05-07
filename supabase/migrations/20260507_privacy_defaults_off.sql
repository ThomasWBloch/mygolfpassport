-- Audit #16 (Sprint 6 / Session 42, 2026-05-07) — flip 3 privacy-toggle
-- defaults ON → OFF so new sign-ups land in a private-by-default state.
--
-- Only DEFAULT is changed; existing rows keep whatever the user already
-- chose. Verified after apply: all 9 existing profiles still have all 3
-- toggles ON (their explicit selection preserved).
--
-- Rationale: App-Store privacy-prep + audit Session 37 #16. Strangers toggle
-- was already OFF, hide_from_feeds intentionally left FALSE so the social
-- feed is non-empty for new users.

ALTER TABLE public.profiles
  ALTER COLUMN allow_round_requests_friends SET DEFAULT false;

ALTER TABLE public.profiles
  ALTER COLUMN show_in_search SET DEFAULT false;

ALTER TABLE public.profiles
  ALTER COLUMN show_course_count SET DEFAULT false;
