<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Supabase migrations — Data API GRANT boilerplate

From **2026-10-30** Supabase no longer auto-grants Data API access to new tables in `public`. Without explicit GRANTs, supabase-js / PostgREST returns error code `42501`. Every new `CREATE TABLE public.xxx` must include the block below in the same migration:

```sql
-- New table boilerplate
create table public.your_table (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  -- ...other columns...
  created_at timestamptz not null default now()
);

-- Data API grants (required from 2026-10-30 on new tables)
grant select on public.your_table to anon;
grant select, insert, update, delete on public.your_table to authenticated;
grant select, insert, update, delete on public.your_table to service_role;

-- RLS + policies
alter table public.your_table enable row level security;

create policy "users read own rows"
  on public.your_table for select to authenticated
  using (auth.uid() = user_id);

create policy "users insert own rows"
  on public.your_table for insert to authenticated
  with check (auth.uid() = user_id);

-- Tighten the authenticated grant if the table holds reference data (e.g. only service_role should write).
-- Never leave INSERT/UPDATE policies as `WITH CHECK (true)` — always scope to auth.uid() or revoke.
```

Rules of thumb:
- **User-owned data** (rounds, notes, friends): policies must scope to `auth.uid() = user_id`.
- **Reference data** (courses, badges-catalog, country_courses): no `authenticated` INSERT/UPDATE/DELETE policy — only service_role writes via scripts.
- **SECURITY DEFINER functions**: `revoke execute ... from public, anon, authenticated` and `grant execute ... to service_role` unless they're meant for end users. Always pin `set search_path = public`.
