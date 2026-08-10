-- Public profile-sharing setup for Vennekilde's standalone website (reads
-- the same Supabase project via the anon key, no login/app download
-- needed). Adds an is_public opt-in and exposes only the intentionally
-- safe subset of data through dedicated views — never through the raw
-- tables, which stay locked to authenticated (the existing app's own
-- friends/feed/leaderboard model, unchanged) or the row owner.
--
-- Design note: RLS can only gate whole rows, not individual columns, so
-- rating/note visibility (independently opt-in via show_ratings_public)
-- is implemented as column-nulling inside public_rounds rather than a raw
-- RLS policy on rounds — see that view below.

alter table public.profiles
  add column if not exists is_public boolean not null default false,
  add column if not exists show_ratings_public boolean not null default false,
  add column if not exists allow_messages_from_strangers boolean not null default false;

-- ── public_profiles ─────────────────────────────────────────────────────
-- Never referral_code, marketing_opt_in, push_enabled,
-- allow_round_requests_*, allow_messages_from_strangers, hide_from_feeds,
-- show_in_search, or is_public itself. No security_invoker: runs as owner
-- so it can bypass the now-restricted profiles RLS and apply its own
-- is_public filter instead.
create view public.public_profiles as
select
  id,
  full_name,
  avatar_url,
  handicap,
  home_club,
  home_country,
  show_course_count
from public.profiles
where is_public = true;

grant select on public.public_profiles to anon;
grant select on public.public_profiles to authenticated;
grant select on public.public_profiles to service_role;

-- ── public_rounds ───────────────────────────────────────────────────────
create view public.public_rounds as
select
  r.id,
  r.user_id,
  r.course_id,
  r.played_at,
  case when p.show_ratings_public then r.rating else null end as rating,
  case when p.show_ratings_public then r.note else null end as note,
  r.created_at
from public.rounds r
join public.profiles p on p.id = r.user_id
where p.is_public = true
  and r.parent_round_id is null;

grant select on public.public_rounds to anon;
grant select on public.public_rounds to authenticated;
grant select on public.public_rounds to service_role;

-- ── public_badges ───────────────────────────────────────────────────────
create view public.public_badges as
select
  ub.user_id,
  ub.badge_id,
  ub.earned_at,
  b.emoji,
  b.name,
  b.description,
  b.tier
from public.user_badges ub
join public.profiles p on p.id = ub.user_id
join public.badges b on b.id = ub.badge_id
where p.is_public = true;

grant select on public.public_badges to anon;
grant select on public.public_badges to authenticated;
grant select on public.public_badges to service_role;

-- ── Lock down the raw tables' anon exposure ────────────────────────────
-- The old "Public profiles" / "User badges readable by all" policies
-- exposed every column of every row to anon (no login). Anon access now
-- goes exclusively through the views above. Authenticated behavior is
-- unchanged in both cases — the app's existing social features already
-- rely on reading other users' basic profile fields and badges.
drop policy if exists "Public profiles" on public.profiles;

create policy "Authenticated users can read all profiles"
  on public.profiles
  for select
  to authenticated
  using (true);

drop policy if exists "User badges readable by all" on public.user_badges;

create policy "Authenticated users can read all user badges"
  on public.user_badges
  for select
  to authenticated
  using (true);

-- rounds already had no anon SELECT policy at all (only "Enable read
-- access for all users" for authenticated), so it was already safe from
-- anon and needed no change — public_rounds above is the only anon path.

-- ── Stranger-messaging opt-in ───────────────────────────────────────────
-- Previously any authenticated user could start a conversation with
-- anyone — the old ALL policy only checked that the caller was one of the
-- two participants, not that the other party consented. New conversations
-- now require either an accepted friendship, or the other party having
-- opted into allow_messages_from_strangers. Existing conversations are
-- untouched (WITH CHECK only gates new inserts/updates, not existing
-- rows).
drop policy if exists "Users can see their own conversations" on public.conversations;

create policy "Participants manage their conversations"
  on public.conversations
  for all
  to authenticated
  using (auth.uid() = participant_1 or auth.uid() = participant_2)
  with check (
    (auth.uid() = participant_1 or auth.uid() = participant_2)
    and (
      exists (
        select 1 from public.friendships f
        where f.status = 'accepted'
          and ((f.user_id = participant_1 and f.friend_id = participant_2)
            or (f.user_id = participant_2 and f.friend_id = participant_1))
      )
      or exists (
        select 1 from public.profiles p
        where p.id = case when auth.uid() = participant_1 then participant_2 else participant_1 end
          and p.allow_messages_from_strangers = true
      )
    )
  );
