-- Friend requests could be duplicated: friendships had no uniqueness rule,
-- so two people sending each other a request at the same time (or one
-- person re-sending after the other had already accepted) left an accepted
-- row AND a pending row for the same pair. Accepting one never cleared the
-- other, so the UI showed a friend with a pending request on the same person.
--
-- 1. Dedupe existing rows — one row per unordered pair, accepted preferred,
--    otherwise the oldest.
-- 2. Unique index on the unordered pair (either direction), so it can't recur.
-- 3. public.send_friend_request(target): the one place requests are created.
--    - no row yet            -> insert pending            ('sent')
--    - they already asked me -> accept it                 ('accepted')
--      (crossing requests become a friendship; the existing accepted-trigger
--       pushes "X accepted your friend request" to them)
--    - I already asked       -> no-op                     ('already_sent')
--    - already friends       -> no-op                     ('already_friends')
--    A per-pair advisory lock serialises two requests sent at the same moment.
--    Clients that still insert directly now get a unique-violation error
--    instead of creating a duplicate.

delete from public.friendships f
using (
  select id,
         row_number() over (
           partition by least(user_id, friend_id), greatest(user_id, friend_id)
           order by (status = 'accepted') desc, created_at, id
         ) as rn
  from public.friendships
) d
where f.id = d.id and d.rn > 1;

create unique index friendships_pair_unique
  on public.friendships (least(user_id, friend_id), greatest(user_id, friend_id));

create or replace function public.send_friend_request(p_target uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_me uuid := auth.uid();
  v_row public.friendships%rowtype;
  v_id uuid;
begin
  if v_me is null then
    raise exception 'Not authenticated' using errcode = '28000';
  end if;
  if p_target is null or p_target = v_me then
    raise exception 'Invalid target' using errcode = '22023';
  end if;
  if not exists (select 1 from public.profiles where id = p_target) then
    raise exception 'Unknown user' using errcode = '22023';
  end if;

  perform pg_advisory_xact_lock(
    hashtextextended(least(v_me, p_target)::text || ':' || greatest(v_me, p_target)::text, 0)
  );

  select * into v_row
  from public.friendships
  where (user_id = v_me and friend_id = p_target)
     or (user_id = p_target and friend_id = v_me)
  limit 1;

  if found then
    if v_row.status = 'accepted' then
      return jsonb_build_object('outcome', 'already_friends', 'friendship_id', v_row.id);
    elsif v_row.user_id = v_me then
      return jsonb_build_object('outcome', 'already_sent', 'friendship_id', v_row.id);
    else
      update public.friendships set status = 'accepted' where id = v_row.id;
      return jsonb_build_object('outcome', 'accepted', 'friendship_id', v_row.id);
    end if;
  end if;

  insert into public.friendships (user_id, friend_id, status)
  values (v_me, p_target, 'pending')
  returning id into v_id;
  return jsonb_build_object('outcome', 'sent', 'friendship_id', v_id);
end;
$$;

revoke execute on function public.send_friend_request(uuid) from public, anon;
grant execute on function public.send_friend_request(uuid) to authenticated, service_role;
