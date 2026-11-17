-- Diagnostics for push registration on devices. The mobile app writes one
-- row whenever registerForPushNotifications() stops without saving a token
-- (permission not granted, missing projectId, token fetch threw, upsert
-- failed), so we can see WHY a device never shows up in push_tokens.
-- Write-only for clients; only service_role reads.
create table public.push_registration_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  platform text,
  app_version text,
  step text not null,
  detail text,
  created_at timestamptz not null default now()
);

create index push_registration_log_user_id_idx on public.push_registration_log(user_id, created_at desc);

-- Data API grants (required from 2026-10-30 on new tables) — tightened:
-- clients may only insert; no anon access, no client reads.
grant insert on public.push_registration_log to authenticated;
grant select, insert, update, delete on public.push_registration_log to service_role;

alter table public.push_registration_log enable row level security;

create policy "users insert own push registration log"
  on public.push_registration_log for insert to authenticated
  with check (auth.uid() = user_id);
