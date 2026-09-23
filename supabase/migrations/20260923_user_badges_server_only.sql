-- The owner-INSERT policy on user_badges let any user grant themselves any
-- badge straight from the client. Badges are now only ever written by the
-- award-badges / delete-round Edge Functions and the rounds API routes, all
-- of which use the service role, so clients keep read access only.

drop policy if exists "User badges insertable by owner" on public.user_badges;

revoke insert, update, delete on public.user_badges from anon, authenticated;
