-- profiles.is_hidden: internal/test accounts (e.g. the Google Play review
-- login) that must keep working but should never show up to other players
-- in leaderboards or player search. Set only from the database
-- (service_role / SQL editor): a trigger keeps clients from changing it.

alter table public.profiles
  add column if not exists is_hidden boolean not null default false;

create or replace function private.protect_profiles_is_hidden()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if coalesce(auth.role(), '') in ('authenticated', 'anon') then
    if tg_op = 'INSERT' then
      new.is_hidden := false;
    else
      new.is_hidden := old.is_hidden;
    end if;
  end if;
  return new;
end;
$$;

revoke execute on function private.protect_profiles_is_hidden() from public, anon, authenticated;

drop trigger if exists trg_protect_profiles_is_hidden on public.profiles;
create trigger trg_protect_profiles_is_hidden
  before insert or update on public.profiles
  for each row execute function private.protect_profiles_is_hidden();
