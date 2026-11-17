-- "New player finished onboarding" push now goes to a list of recipients
-- (vault secret `new_signup_push_recipients`, comma-separated user ids)
-- instead of only `admin_user_id`. Falls back to `admin_user_id` if the
-- list secret isn't set. The secret itself is created out-of-band (repo is
-- public; ids are not committed).

create or replace function private.notify_admin_new_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_recipients uuid[];
  v_total int;
begin
  if coalesce(trim(old.full_name), '') <> '' or coalesce(trim(new.full_name), '') = '' then
    return new;
  end if;

  select array_agg(trim(x)::uuid)
  into v_recipients
  from vault.decrypted_secrets s,
       unnest(string_to_array(s.decrypted_secret, ',')) as x
  where s.name = 'new_signup_push_recipients'
    and trim(x) <> '';

  if v_recipients is null then
    select array[decrypted_secret::uuid] into v_recipients
    from vault.decrypted_secrets
    where name = 'admin_user_id';
  end if;

  -- don't notify someone about their own onboarding
  v_recipients := array_remove(v_recipients, new.id);

  if v_recipients is null or array_length(v_recipients, 1) is null then
    return new;
  end if;

  select count(*) into v_total
  from public.profiles
  where coalesce(trim(full_name), '') <> '';

  perform private.notify_push(
    v_recipients,
    'New player',
    new.full_name
      || case when new.home_club is not null then ' (' || new.home_club || ')' else '' end
      || ' finished onboarding – player #' || v_total
  );
  return new;
end;
$function$;

revoke execute on function private.notify_admin_new_signup() from public, anon, authenticated;
