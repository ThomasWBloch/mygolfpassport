-- course_championships — which courses have hosted which championship.
--
-- Sources: Majorbaner.xlsx (200 rows) and Cups og OL.docx (Ryder Cup 40,
-- Solheim Cup 20, Olympics 5), matched against public.courses and reviewed in
-- MGP_turneringsbaner_review.xlsx. 249 of 265 rows resolved to a course_id.
--
-- Why a table and not four booleans: a course can host several championships
-- (24 major venues are also Ryder Cup venues) and the same one repeatedly, so
-- the year belongs on the row. That also lets a course page say "hosted The
-- Open in 1970, 1978 and 1984" later on.
--
-- courses.is_major is kept as a derived flag, maintained by the trigger below,
-- so the three existing major_count badges keep working untouched.

create table public.course_championships (
  id         uuid primary key default gen_random_uuid(),
  course_id  uuid not null references public.courses(id) on delete cascade,
  category   text not null check (category in ('major', 'ryder_cup', 'solheim_cup', 'olympics')),
  year       integer check (year is null or year between 1860 and 2100),
  status     text not null default 'hosted' check (status in ('hosted', 'upcoming')),
  note       text,
  created_at timestamptz not null default now()
);

comment on table public.course_championships is
  'Championship venues. Reference data — written by service_role scripts only.';
comment on column public.course_championships.year is
  'Year hosted. NULL means "has hosted, year not recorded".';
comment on column public.course_championships.status is
  'upcoming = awarded but not yet played (e.g. Riviera, Olympics 2028). Excluded from is_major.';

-- One row per course/category/year. NULLs never collide in a plain unique
-- index, so fold them onto a sentinel to keep "year unknown" rows unique too.
create unique index course_championships_unique_idx
  on public.course_championships (course_id, category, coalesce(year, -1));

create index course_championships_course_idx   on public.course_championships (course_id);
create index course_championships_category_idx on public.course_championships (category, status);

-- Data API grants (required from 2026-10-30 on new tables)
grant select on public.course_championships to anon;
grant select on public.course_championships to authenticated;
grant select, insert, update, delete on public.course_championships to service_role;

-- Reference data: world-readable, no authenticated write policy.
alter table public.course_championships enable row level security;

create policy "championships are public read"
  on public.course_championships for select
  to anon, authenticated
  using (true);

-- ── Derived courses.is_major ────────────────────────────────────────────────
-- Recomputed from scratch for the affected course(s) on every change, so it
-- cannot drift out of sync with the rows. 'upcoming' does not count.

create or replace function public.sync_course_is_major()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_old uuid;
  v_new uuid;
begin
  if tg_op in ('UPDATE', 'DELETE') then v_old := old.course_id; end if;
  if tg_op in ('INSERT', 'UPDATE') then v_new := new.course_id; end if;

  update public.courses c
     set is_major = exists (
           select 1
             from public.course_championships cc
            where cc.course_id = c.id
              and cc.category  = 'major'
              and cc.status    = 'hosted'
         )
   where c.id = any (array_remove(array[v_old, v_new], null));

  return null;
end;
$$;

revoke execute on function public.sync_course_is_major() from public, anon, authenticated;
grant  execute on function public.sync_course_is_major() to service_role;

create trigger trg_sync_course_is_major
  after insert or update or delete on public.course_championships
  for each row execute function public.sync_course_is_major();

-- Table starts empty, so this just asserts the baseline before the data load.
update public.courses set is_major = false where is_major is distinct from false;
