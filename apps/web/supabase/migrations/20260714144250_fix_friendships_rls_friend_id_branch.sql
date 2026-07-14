-- Restores the friend_id branch of friendships RLS. The live policy had
-- diverged from the original 20260410_create_friendships.sql migration
-- down to a single "Own friendships" FOR ALL USING (auth.uid() = user_id)
-- policy, which left the addressee side (friend_id) with zero RLS access
-- to incoming requests -- web currently works around this with a
-- service-role bypass in app/api/friendships/route.ts. This restores the
-- original 4-policy design so any authenticated client (web or mobile)
-- can read/accept/decline its own incoming requests without needing a
-- service-role key.

drop policy if exists "Own friendships" on public.friendships;
drop policy if exists "Users can view own friendships" on public.friendships;
drop policy if exists "Users can send friend requests" on public.friendships;
drop policy if exists "Users can update own friendships" on public.friendships;
drop policy if exists "Users can delete own friendships" on public.friendships;

create policy "Users can view own friendships"
  on public.friendships for select
  using (auth.uid() = user_id or auth.uid() = friend_id);

create policy "Users can send friend requests"
  on public.friendships for insert
  with check (auth.uid() = user_id);

create policy "Users can update own friendships"
  on public.friendships for update
  using (auth.uid() = user_id or auth.uid() = friend_id);

create policy "Users can delete own friendships"
  on public.friendships for delete
  using (auth.uid() = user_id or auth.uid() = friend_id);
