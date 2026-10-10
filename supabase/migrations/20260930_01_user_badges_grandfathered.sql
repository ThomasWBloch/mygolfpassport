-- Lets a specific earned badge survive the re-checks that normally revoke a
-- badge whose criteria are no longer met (web rounds/delete + rounds/[id],
-- and the delete-round Edge Function all skip rows with grandfathered = true).
--
-- Used once, when On a Roll changed from "3 courses logged within 30 days" to
-- "3 different courses played on 3 days in a row": Ole Mork, Casper Hjorth and
-- Anders Lillelund had earned it under the old rule and keep it.
-- The flag is only ever set by hand/migration; clients can't write user_badges.

alter table public.user_badges
  add column grandfathered boolean not null default false;

update public.user_badges ub
set grandfathered = true
from public.badges b, public.profiles p
where ub.badge_id = b.id and b.key = 'on_a_roll'
  and ub.user_id = p.id
  and p.full_name in ('Ole Mørk', 'Casper Hjorth', 'Anders Lillelund');
