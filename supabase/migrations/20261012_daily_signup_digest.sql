-- Daily 20:00 (Danish time) push to the app owners: how many people signed up
-- in the last 24 hours, how many of them finished their profile, and the
-- total number of players.
--
-- Recipients live in the Vault secret 'signup_digest_recipients' (comma-
-- separated auth user ids — created directly, not committed, because this repo
-- is public):
--   select vault.create_secret('<uuid1>,<uuid2>', 'signup_digest_recipients', '...');
-- To add or remove a recipient: select vault.update_secret(<secret id>, '<new list>');
--
-- pg_cron runs in UTC, and 20:00 Danish time is 18:00 UTC in summer (CEST) but
-- 19:00 UTC in winter (CET). The job therefore fires at both 18:00 and 19:00
-- UTC, and the function only sends when it is actually 20:xx in Copenhagen —
-- so it stays at 20:00 across the daylight-saving changes.
--
-- Delivery goes through private.notify_push -> send-push, so each recipient's
-- own profiles.push_enabled / registered device still applies.

create or replace function private.run_daily_signup_digest(
  p_force boolean default false,   -- skip the 20:00 gate (manual runs)
  p_only uuid[] default null       -- override the recipient list (test sends)
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  c_system constant uuid := '042f06f7-96fa-48b5-89da-a3907fa463b7';
  v_list text;
  v_recipients uuid[];
  v_new int;
  v_done int;
  v_total int;
  v_body text;
begin
  if not p_force and extract(hour from (now() at time zone 'Europe/Copenhagen')) <> 20 then
    return;
  end if;

  if p_only is not null then
    v_recipients := p_only;
  else
    select decrypted_secret into v_list
    from vault.decrypted_secrets where name = 'signup_digest_recipients';
    if v_list is null then
      return; -- not configured: no-op rather than error
    end if;
    select array_agg(trim(x)::uuid) into v_recipients from unnest(string_to_array(v_list, ',')) as x;
  end if;

  select count(*), count(*) filter (where coalesce(trim(full_name), '') <> '')
  into v_new, v_done
  from public.profiles
  where created_at >= now() - interval '24 hours' and id <> c_system;

  select count(*) into v_total
  from public.profiles
  where coalesce(trim(full_name), '') <> '' and id <> c_system;

  v_body := case when v_new = 1 then '1 ny tilmelding' else v_new || ' nye tilmeldinger' end
            || ' det seneste døgn';
  if v_new > 0 then
    v_body := v_body || ' (' || v_done || ' har oprettet profilen)';
  end if;
  v_body := v_body || ' – ' || v_total || ' spillere i alt';

  perform private.notify_push(v_recipients, 'Nye spillere', v_body);
end;
$$;

select cron.schedule(
  'daily-signup-digest',
  '0 18,19 * * *',
  $$select private.run_daily_signup_digest();$$
);
