-- Aggregated average rating + review count per course, used by the mobile
-- course browse/search list (previously only shown on the course-detail
-- page). security_invoker so it respects the querying user's own RLS
-- instead of running as the view owner — matches how a direct query
-- against public.rounds already behaves for this same data today.
create view public.course_rating_summary
with (security_invoker = true) as
select
  course_id,
  avg(rating)::numeric(3,1) as avg_rating,
  count(rating) as rating_count
from public.rounds
where rating is not null
group by course_id;

-- Data API grants (required from 2026-10-30 on new relations)
grant select on public.course_rating_summary to anon;
grant select on public.course_rating_summary to authenticated;
grant select on public.course_rating_summary to service_role;
