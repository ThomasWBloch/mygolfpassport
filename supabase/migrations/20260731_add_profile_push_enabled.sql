-- "Allow push notifications" toggle in Edit Profile. Checked by the
-- send-push Edge Function (the single choke point every push path goes
-- through) rather than in each trigger/digest caller.
alter table public.profiles
  add column if not exists push_enabled boolean not null default true;
