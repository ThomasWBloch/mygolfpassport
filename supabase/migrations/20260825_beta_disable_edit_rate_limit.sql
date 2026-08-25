-- Temporarily disable the per-user daily rate limit on course-edit
-- submissions (public.submit_course_edit) for the beta period, so testers
-- backfilling their full course history aren't capped at 5 corrections/day.
-- Thomas asked for this 2026-08-25. RESTORE the `>= 5` check (see the
-- previous CREATE OR REPLACE of this function) before App Store launch —
-- the per-course limit (50/day) is untouched and still protects against
-- a single course being spammed.

create or replace function public.submit_course_edit(
  p_course_id uuid,
  p_type text,
  p_message text,
  p_source_url text default null
)
returns uuid
language plpgsql
security definer
set search_path = 'public', 'pg_temp'
as $function$
declare
  v_user_id uuid := auth.uid();
  v_count_course int;
  v_new_id uuid;
begin
  if v_user_id is null then
    raise exception 'unauthorized' using errcode = '28000';
  end if;

  -- Per-user rate limit disabled for the beta period (see comment above).

  -- Rate limit per course (unchanged)
  select count(*) into v_count_course
  from public.course_edit_submissions
  where course_id = p_course_id
    and created_at > now() - interval '1 day';
  if v_count_course >= 50 then
    raise exception 'rate_limit_course' using errcode = '53400';
  end if;

  -- Insert (CHECK constraints on table enforce type/message/url shape)
  insert into public.course_edit_submissions
    (course_id, user_id, type, message, source_url)
  values
    (p_course_id, v_user_id, p_type, p_message, p_source_url)
  returning id into v_new_id;

  return v_new_id;
end;
$function$;
