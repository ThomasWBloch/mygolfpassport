-- Android beta sign-ups collected on /beta.
--
-- Testers type the Gmail they use in Google Play; the owners add them to the
-- Play Console tester list and send the install link. Contains personal data
-- (email addresses) and is written only by the /api/beta/android route using
-- the service role.
--
-- Deliberately NOT the usual AGENTS.md boilerplate: no anon/authenticated
-- access at all. The public schema's default privileges hand anon and
-- authenticated every privilege on a new table, so they are revoked
-- explicitly (see 20261016_course_championships_grants.sql). RLS is on with no
-- policies, which also denies anything that slips through.

create table public.android_beta_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null check (char_length(email) <= 254),
  created_at timestamptz not null default now()
);

create unique index android_beta_signups_email_key
  on public.android_beta_signups (lower(email));

alter table public.android_beta_signups enable row level security;

revoke all on public.android_beta_signups from public, anon, authenticated;
grant select, insert, update, delete on public.android_beta_signups to service_role;
