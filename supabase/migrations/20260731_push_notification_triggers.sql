-- Instant push notifications for: new friend request, friend request
-- accepted, new message, home-club signup, and friend-of-friend
-- ("golfven har fået en ny golfven"). All fire via DB triggers (not
-- duplicated in web/mobile API code) so they work regardless of which
-- client made the write, calling the send-push Edge Function over HTTP
-- via pg_net. The Edge Function's own service_role key is never embedded
-- in this file — it's read from Supabase Vault (stored separately, not
-- via migration) by name.
--
-- NOTE: this migration assumes a Vault secret named
-- 'service_role_key_for_push' already exists (create it once via
-- `select vault.create_secret('<service_role_key>', 'service_role_key_for_push', '...')`
-- run directly, never committed). Without it, private.notify_push()
-- silently no-ops instead of erroring out the write it's attached to.

create extension if not exists pg_net;

create schema if not exists private;

-- Shared helper: fan a push out to one or more users via the send-push
-- Edge Function. Lives in `private`, which PostgREST never exposes, so
-- no anon/authenticated grants are needed — only trigger functions in
-- this same migration call it.
create or replace function private.notify_push(
  p_user_ids uuid[],
  p_title text,
  p_body text,
  p_data jsonb default '{}'::jsonb
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_service_role_key text;
begin
  if p_user_ids is null or array_length(p_user_ids, 1) is null then
    return;
  end if;

  select decrypted_secret into v_service_role_key
  from vault.decrypted_secrets
  where name = 'service_role_key_for_push';

  if v_service_role_key is null then
    return; -- secret not configured — no-op rather than error out the write
  end if;

  perform net.http_post(
    url := 'https://twqsuitdrczohozgpdlr.supabase.co/functions/v1/send-push',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || v_service_role_key
    ),
    body := jsonb_build_object(
      'user_ids', to_jsonb(p_user_ids),
      'title', p_title,
      'body', p_body,
      'data', p_data
    )
  );
end;
$$;

-- ── Friend request sent (friendships INSERT, status = 'pending') ───────
create or replace function private.notify_friend_request_sent()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sender_name text;
begin
  if new.status <> 'pending' then
    return new;
  end if;
  select full_name into v_sender_name from public.profiles where id = new.user_id;
  perform private.notify_push(
    array[new.friend_id],
    'My Golf Passport',
    coalesce(v_sender_name, 'Someone') || ' sent you a friend request'
  );
  return new;
end;
$$;

drop trigger if exists trg_notify_friend_request_sent on public.friendships;
create trigger trg_notify_friend_request_sent
  after insert on public.friendships
  for each row execute function private.notify_friend_request_sent();

-- ── Friend request accepted + friend-of-friend fan-out ──────────────────
-- (friendships UPDATE, status: pending -> accepted)
create or replace function private.notify_friendship_accepted()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sender_name text;   -- original requester (new.user_id)
  v_accepter_name text; -- who accepted (new.friend_id)
  v_other_friends uuid[];
begin
  if old.status = new.status or new.status <> 'accepted' then
    return new;
  end if;

  select full_name into v_sender_name from public.profiles where id = new.user_id;
  select full_name into v_accepter_name from public.profiles where id = new.friend_id;

  -- Notify the original requester that their request was accepted.
  perform private.notify_push(
    array[new.user_id],
    'My Golf Passport',
    coalesce(v_accepter_name, 'Someone') || ' accepted your friend request'
  );

  -- Friend-of-friend: everyone already friends with the requester (except
  -- the accepter) hears that the requester made a new connection, and
  -- vice versa — mirrors apps/*/lib/feed.ts's "friendship" feed item.
  select array_agg(other_id) into v_other_friends
  from (
    select case when user_id = new.user_id then friend_id else user_id end as other_id
    from public.friendships
    where status = 'accepted'
      and (user_id = new.user_id or friend_id = new.user_id)
      and case when user_id = new.user_id then friend_id else user_id end <> new.friend_id
  ) s;
  if v_other_friends is not null then
    perform private.notify_push(
      v_other_friends,
      'My Golf Passport',
      coalesce(v_sender_name, 'A golf friend') || ' just connected with ' || coalesce(v_accepter_name, 'someone new')
    );
  end if;

  select array_agg(other_id) into v_other_friends
  from (
    select case when user_id = new.friend_id then friend_id else user_id end as other_id
    from public.friendships
    where status = 'accepted'
      and (user_id = new.friend_id or friend_id = new.friend_id)
      and case when user_id = new.friend_id then friend_id else user_id end <> new.user_id
  ) s;
  if v_other_friends is not null then
    perform private.notify_push(
      v_other_friends,
      'My Golf Passport',
      coalesce(v_accepter_name, 'A golf friend') || ' just connected with ' || coalesce(v_sender_name, 'someone new')
    );
  end if;

  return new;
end;
$$;

drop trigger if exists trg_notify_friendship_accepted on public.friendships;
create trigger trg_notify_friendship_accepted
  after update on public.friendships
  for each row execute function private.notify_friendship_accepted();

-- ── New message (messages INSERT) ───────────────────────────────────────
create or replace function private.notify_new_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_recipient uuid;
  v_sender_name text;
begin
  select case when participant_1 = new.sender_id then participant_2 else participant_1 end
  into v_recipient
  from public.conversations
  where id = new.conversation_id;

  if v_recipient is null then
    return new;
  end if;

  select full_name into v_sender_name from public.profiles where id = new.sender_id;

  perform private.notify_push(
    array[v_recipient],
    coalesce(v_sender_name, 'New message'),
    left(new.content, 120)
  );
  return new;
end;
$$;

drop trigger if exists trg_notify_new_message on public.messages;
create trigger trg_notify_new_message
  after insert on public.messages
  for each row execute function private.notify_new_message();

-- ── Home-club signup (profiles INSERT with home_club set) ──────────────
create or replace function private.notify_home_club_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_other_members uuid[];
begin
  if new.home_club_normalized is null then
    return new;
  end if;

  select array_agg(id) into v_other_members
  from public.profiles
  where home_club_normalized = new.home_club_normalized
    and id <> new.id;

  if v_other_members is not null then
    perform private.notify_push(
      v_other_members,
      'My Golf Passport',
      coalesce(new.full_name, 'A new player') || ' from ' || coalesce(new.home_club, 'your home club') || ' just joined'
    );
  end if;

  return new;
end;
$$;

drop trigger if exists trg_notify_home_club_signup on public.profiles;
create trigger trg_notify_home_club_signup
  after insert on public.profiles
  for each row execute function private.notify_home_club_signup();
