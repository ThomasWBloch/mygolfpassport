-- Admin-only push: tell the app owner when someone finishes onboarding.
--
-- "Finished onboarding" = profiles.full_name goes from empty to filled in
-- (the profile row itself is created at signup, before onboarding). The
-- push goes only to the user id stored in the Vault secret 'admin_user_id'
-- (create once, directly — never committed:
--   select vault.create_secret('<admin auth.users id>', 'admin_user_id', 'Receives admin-only pushes');
-- ). Without the secret this no-ops rather than erroring out the write,
-- same as private.notify_push. Delivery goes through send-push, so the
-- admin's own profiles.push_enabled / registered device still apply.

create or replace function private.notify_admin_new_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin_id uuid;
  v_total int;
begin
  if coalesce(trim(old.full_name), '') <> '' or coalesce(trim(new.full_name), '') = '' then
    return new;
  end if;

  select decrypted_secret::uuid into v_admin_id
  from vault.decrypted_secrets
  where name = 'admin_user_id';

  if v_admin_id is null or new.id = v_admin_id then
    return new;
  end if;

  select count(*) into v_total
  from public.profiles
  where coalesce(trim(full_name), '') <> '';

  perform private.notify_push(
    array[v_admin_id],
    'New player',
    new.full_name
      || case when new.home_club is not null then ' (' || new.home_club || ')' else '' end
      || ' finished onboarding – player #' || v_total
  );
  return new;
end;
$$;

drop trigger if exists trg_notify_admin_new_signup on public.profiles;
create trigger trg_notify_admin_new_signup
  after update of full_name on public.profiles
  for each row execute function private.notify_admin_new_signup();
