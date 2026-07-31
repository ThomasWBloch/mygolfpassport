-- Daily digest: "ven har stemplet bane(r)" and "ven har fået badge(s)" are
-- batched into one push per active friend per day instead of one push per
-- round/badge — a friend logging 50 rounds in a burst (e.g. importing
-- history) would otherwise spam every one of their friends 50 times.
--
-- One push per active friend (not one combined push listing everyone) —
-- if both Peter and Anna were active today, their mutual friend gets two
-- separate notifications, one about each.
create or replace function private.run_daily_digest()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_window_start timestamptz := now() - interval '24 hours';
  r record;
  v_friends uuid[];
  v_parts text[];
  v_body text;
begin
  for r in
    select
      p.id as user_id,
      p.full_name,
      coalesce(rc.round_count, 0) as round_count,
      coalesce(bc.badge_count, 0) as badge_count
    from public.profiles p
    left join (
      select user_id, count(*) as round_count
      from public.rounds
      where created_at >= v_window_start
        and parent_round_id is null
      group by user_id
    ) rc on rc.user_id = p.id
    left join (
      select user_id, count(*) as badge_count
      from public.user_badges
      where earned_at >= v_window_start
      group by user_id
    ) bc on bc.user_id = p.id
    where coalesce(rc.round_count, 0) > 0 or coalesce(bc.badge_count, 0) > 0
  loop
    select array_agg(other_id) into v_friends
    from (
      select case when user_id = r.user_id then friend_id else user_id end as other_id
      from public.friendships
      where status = 'accepted'
        and (user_id = r.user_id or friend_id = r.user_id)
    ) s;

    if v_friends is null then
      continue;
    end if;

    v_parts := array[]::text[];
    if r.round_count > 0 then
      v_parts := v_parts || (r.round_count || case when r.round_count = 1 then ' round' else ' rounds' end);
    end if;
    if r.badge_count > 0 then
      v_parts := v_parts || (r.badge_count || case when r.badge_count = 1 then ' badge' else ' badges' end);
    end if;
    v_body := coalesce(r.full_name, 'A golf friend') || ' logged ' || array_to_string(v_parts, ' and ') || ' today';

    perform private.notify_push(v_friends, 'My Golf Passport', v_body);
  end loop;
end;
$$;

-- Runs once daily at 18:00 UTC (~19-20:00 in Denmark depending on DST) —
-- an evening recap time. Adjust the schedule string to change it.
select cron.schedule(
  'push-daily-digest',
  '0 18 * * *',
  $$select private.run_daily_digest();$$
);
