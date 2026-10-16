-- Tighten Data API grants on course_championships.
--
-- 20261016_course_championships.sql granted only SELECT to anon/authenticated,
-- but the public schema's default privileges had already handed both roles the
-- full set at CREATE TABLE time, so they ended up with INSERT, UPDATE, DELETE,
-- TRUNCATE, REFERENCES and TRIGGER as well.
--
-- Writes were never actually possible: RLS is on and only a SELECT policy
-- exists. TRUNCATE is the exception — RLS does not apply to it — though
-- PostgREST does not expose it, so there was no route in from the app either.
-- This is tidying the grant to match the intent, not closing a live hole.
--
-- course_championships is reference data: read by everyone, written only by
-- service_role scripts. See AGENTS.md.

revoke all on public.course_championships from anon, authenticated;
grant select on public.course_championships to anon, authenticated;
