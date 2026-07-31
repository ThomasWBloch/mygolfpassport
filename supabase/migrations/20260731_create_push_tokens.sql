-- Push notification tokens — one row per registered device (a user can
-- have multiple devices). expo_push_token is unique so re-registering the
-- same device (e.g. reinstall) upserts instead of duplicating.
create table public.push_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  expo_push_token text not null unique,
  device_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index push_tokens_user_id_idx on public.push_tokens(user_id);

-- Data API grants (required from 2026-10-30 on new tables)
grant select on public.push_tokens to anon;
grant select, insert, update, delete on public.push_tokens to authenticated;
grant select, insert, update, delete on public.push_tokens to service_role;

alter table public.push_tokens enable row level security;

-- User-owned data: scoped to auth.uid() = user_id. No anon/authenticated
-- SELECT policy — tokens aren't something other users or clients should
-- ever read; only service_role (via the send-push Edge Function, which
-- uses the service-role key and bypasses RLS) reads across users.
create policy "users manage own push tokens"
  on public.push_tokens for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
