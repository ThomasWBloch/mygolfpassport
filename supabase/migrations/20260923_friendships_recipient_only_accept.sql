-- Friend requests could be self-accepted: the INSERT policy never
-- constrained status (so a client could insert an already-'accepted' row),
-- and the UPDATE policy let either party change any column. Accepting now
-- belongs to the recipient only, and user_id/friend_id are immutable from
-- the client — otherwise the recipient could rewrite user_id to befriend a
-- third party who never asked.

drop policy if exists "Users can send friend requests" on public.friendships;
drop policy if exists "Users can update own friendships" on public.friendships;

create policy "Users can send friend requests"
  on public.friendships for insert to authenticated
  with check (auth.uid() = user_id and status = 'pending' and user_id <> friend_id);

create policy "Recipients can accept friend requests"
  on public.friendships for update to authenticated
  using (auth.uid() = friend_id and status = 'pending')
  with check (auth.uid() = friend_id and status = 'accepted');

revoke update on public.friendships from anon, authenticated;
grant update (status) on public.friendships to authenticated;
