-- Championship badges: major steps 20-100, plus Ryder Cup, Solheim Cup and
-- Olympic venue ladders. Depends on 20261016_course_championships.sql.
--
-- Tournament names appear in the DESCRIPTION only, never in the badge name:
-- the names are trademarks, and describing what a course hosted is factual use
-- while branding our own feature with the mark is not. Same reasoning as the
-- Claret Jug decision — symbols are generic too (loving cup, heraldic shield,
-- laurel wreath; no tournament trophy, no Olympic rings).
--
-- badge NAME is the join key to badgeSymbol() in WaxSealBadge.tsx — renaming a
-- badge silently drops it back to the emoji fallback. The emoji column is kept
-- populated for exactly that fallback.
--
-- xp_reward is filled to stay consistent with the existing rows; nothing reads
-- it any more (XP was dropped in favour of the stamp-collection metaphor).

insert into public.badges (key, name, emoji, description, tier, criteria_type, criteria_value, xp_reward)
values
  ('major_pedigree', 'Championship Pedigree', '🏛️', 'Play 20 major championship venues', 'rare', 'major_count', '{"count": 20}'::jsonb, 800),
  ('major_quarter', 'The Silver Quarter', '🥈', 'Play 25 major championship venues', 'rare', 'major_count', '{"count": 25}'::jsonb, 800),
  ('major_curator', 'Keeper of the Game', '🏆', 'Play 50 major championship venues', 'legendary', 'major_count', '{"count": 50}'::jsonb, 1500),
  ('major_historian', 'Major Historian', '📜', 'Play 75 major championship venues', 'legendary', 'major_count', '{"count": 75}'::jsonb, 1500),
  ('major_immortal', 'The Immortal Hundred', '💯', 'Play 100 major championship venues', 'legendary', 'major_count', '{"count": 100}'::jsonb, 1500),
  ('team_cup_first', 'Into the Arena', '🛡️', 'Play a course that has hosted the Ryder Cup', 'uncommon', 'ryder_count', '{"count": 1}'::jsonb, 400),
  ('team_cup_five', 'The Away Team', '🛡️', 'Play 5 Ryder Cup venues', 'rare', 'ryder_count', '{"count": 5}'::jsonb, 800),
  ('team_cup_ten', 'Captain''s Pick', '🛡️', 'Play 10 Ryder Cup venues', 'legendary', 'ryder_count', '{"count": 10}'::jsonb, 1500),
  ('solheim_first', 'Ladies First', '🛡️', 'Play a course that has hosted the Solheim Cup', 'uncommon', 'solheim_count', '{"count": 1}'::jsonb, 400),
  ('solheim_five', 'Across the Pond', '🛡️', 'Play 5 Solheim Cup venues', 'rare', 'solheim_count', '{"count": 5}'::jsonb, 800),
  ('solheim_ten', 'Continental Divide', '🛡️', 'Play 10 Solheim Cup venues', 'legendary', 'solheim_count', '{"count": 10}'::jsonb, 1500),
  ('games_first', 'Where Nations Played', '🌿', 'Play a course that has hosted Olympic golf', 'rare', 'olympic_count', '{"count": 1}'::jsonb, 800),
  ('games_all', 'The Complete Games', '🌿', 'Play five courses that have hosted Olympic golf', 'legendary', 'olympic_count', '{"count": 5}'::jsonb, 1500)
on conflict (key) do nothing;
