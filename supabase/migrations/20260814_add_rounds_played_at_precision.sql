-- Supports the stepped year/month/day "played date" picker — a round can
-- now have day, month, or year precision (or no date at all, unchanged).
-- played_at stays a real `date`, always encoding the START of whatever
-- period is known (year-only -> Jan 1, month-only -> the 1st), so every
-- existing sort on played_at (DB-level .order() and client-side string/
-- date compares) keeps working with zero code changes — only display
-- formatting needs to become precision-aware.

alter table public.rounds
  add column played_at_precision text
    check (played_at_precision in ('day', 'month', 'year'));

update public.rounds
  set played_at_precision = 'day'
  where played_at is not null;

alter table public.rounds
  add constraint rounds_played_at_precision_null_check
    check ((played_at is null) = (played_at_precision is null));

alter table public.rounds
  add constraint rounds_played_at_precision_year_check
    check (
      played_at_precision is distinct from 'year'
      or (extract(month from played_at) = 1 and extract(day from played_at) = 1)
    );

alter table public.rounds
  add constraint rounds_played_at_precision_month_check
    check (
      played_at_precision is distinct from 'month'
      or extract(day from played_at) = 1
    );

-- update_round RPC — new p_played_at_precision param, cascaded to combo-
-- fan-out children alongside played_at exactly like the existing cascade.
-- The old 4-arg signature is dropped (not just replaced) so there's no
-- ambiguous overload once the client starts calling the 5-arg version.
drop function if exists public.update_round(uuid, integer, date, text);

create function public.update_round(
  p_round_id uuid,
  p_rating integer,
  p_played_at date,
  p_played_at_precision text,
  p_note text
)
returns void
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $function$
declare
  v_user_id uuid := auth.uid();
  v_round record;
begin
  if v_user_id is null then
    raise exception 'unauthorized' using errcode = '28000';
  end if;

  select id, user_id, parent_round_id, played_at into v_round
  from public.rounds
  where id = p_round_id;

  if v_round.id is null then
    raise exception 'round_not_found' using errcode = 'P0002';
  end if;
  if v_round.user_id != v_user_id then
    raise exception 'not_authorized' using errcode = '42501';
  end if;
  if v_round.parent_round_id is not null then
    raise exception 'combo_child_round' using errcode = '22023';
  end if;

  if p_rating is not null and (p_rating < 1 or p_rating > 10) then
    raise exception 'invalid_rating' using errcode = '22023';
  end if;
  if p_note is not null and char_length(p_note) > 1000 then
    raise exception 'note_too_long' using errcode = '22023';
  end if;
  if (p_played_at is null) != (p_played_at_precision is null) then
    raise exception 'played_at_precision_mismatch' using errcode = '22023';
  end if;

  update public.rounds
  set rating = p_rating, played_at = p_played_at, played_at_precision = p_played_at_precision, note = p_note
  where id = p_round_id;

  if p_played_at is distinct from v_round.played_at then
    update public.rounds
    set played_at = p_played_at, played_at_precision = p_played_at_precision
    where parent_round_id = p_round_id;
  end if;
end;
$function$;

-- public_rounds view (Vennekilde's site) — forward-compat, cheap to add now.
-- New column appended at the end: CREATE OR REPLACE VIEW requires existing
-- columns to stay in their original position, only additions at the end
-- are allowed.
create or replace view public.public_rounds as
select
  r.id,
  r.user_id,
  r.course_id,
  r.played_at,
  case when p.show_ratings_public then r.rating else null end as rating,
  case when p.show_ratings_public then r.note else null end as note,
  r.created_at,
  r.played_at_precision
from public.rounds r
join public.profiles p on p.id = r.user_id
where p.is_public = true
  and r.parent_round_id is null;
