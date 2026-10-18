-- Indexes for per-user lookups (feed, profile, friends list, RLS checks).
-- rounds and friendships had no index on user_id / friend_id, so every
-- per-user query was a sequential scan that grows with the table.
create index if not exists idx_rounds_user_id on public.rounds (user_id);
create index if not exists idx_friendships_user_id on public.friendships (user_id);
create index if not exists idx_friendships_friend_id on public.friendships (friend_id);
