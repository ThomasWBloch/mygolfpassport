-- "On a Roll" changes from "3 courses logged within 30 days" to
-- "3 different courses played on 3 days in a row": one course per day, by the
-- day each round was PLAYED (played_at with precision 'day'), nothing else.
--
-- The new criteria_type 'courses_on_consecutive_days' is understood by the
-- award-badges and delete-round Edge Functions (deployed) and by
-- apps/web/src/lib/badges.ts. APPLY THIS ONLY AFTER THAT WEB CODE IS LIVE:
-- the web API routes re-check earned badges on round edit/delete, and a
-- build that doesn't know the new type treats it as "not earned" and would
-- take the badge away from people who have it.
--
-- Existing holders keep the badge until their next round edit/delete, when
-- it is re-checked against the new rule (that's how every badge works).

update public.badges
set criteria_type = 'courses_on_consecutive_days',
    criteria_value = '{"days": 3}'::jsonb,
    description = 'Play 3 different courses on 3 days in a row'
where key = 'on_a_roll';
