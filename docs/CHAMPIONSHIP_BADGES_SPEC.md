# Championship badges — implementation spec

Written 2026-10-16. Data is already live in Supabase; this covers the code.

## What already exists

- `public.course_championships` (257 rows) — `course_id`, `category`
  (`major` | `ryder_cup` | `solheim_cup` | `olympics`), `year`, `status`
  (`hosted` | `upcoming`), `note`.
- `courses.is_major` is maintained by trigger `trg_sync_course_is_major` from
  the `major` + `hosted` rows. 192 courses.
- 13 new rows in `public.badges` (migration `20261016_championship_badges.sql`)
  using three new `criteria_type` values: `ryder_count`, `solheim_count`,
  `olympic_count`.

Current pools (status = 'hosted'): major 192, ryder_cup 39, solheim_cup 20,
olympics 4. Olympics also holds two `upcoming` rows (Riviera 2028, Royal
Queensland 2032) which must NOT be counted until they flip to `hosted`.

## Step 1 — badge evaluation

THREE files hold the same logic and must stay in step, as they already do for
`major_count`:

- `apps/web/src/lib/badges.ts` (`fetchUserData`, `evaluateCriteria`) — used by
  the web routes `rounds/delete` and `rounds/[id]`
- `supabase/functions/award-badges/index.ts` — the only writer of `user_badges`
- `supabase/functions/delete-round/index.ts` — the mobile delete path, which
  re-evaluates and REVOKES

The third one is easy to miss and expensive to miss. Its `evaluateCriteria`
ends in `default: return false`, so a `criteria_type` it does not know is read
as "not earned" — a mobile user deleting any round would strip every new badge
from their account. Grep for `major_count` before assuming the list is
complete; that grep returns three files.

### fetchUserData

`majorCount` is today derived from `creditableRounds` filtered on
`courses.is_major`. The three new counts follow the same rule — only
creditable rounds count, so the per-club credit cap and the 9-hole rule behave
identically. Do NOT count synthetic loop rounds (`parent_round_id IS NOT NULL`).

Add one query for the course ids the user has actually played:

    const playedIds = [...new Set(creditableRounds.map(r => r.courseId))]
    // chunk playedIds in batches of 200 for the .in() filter
    select course_id, category from course_championships
      where course_id in (...) and status = 'hosted'

Then, per category, count the distinct `course_id` values that come back:

    ryderCount    = distinct course_id where category = 'ryder_cup'
    solheimCount  = distinct course_id where category = 'solheim_cup'
    olympicCount  = distinct course_id where category = 'olympics'

Filtering on the user's played ids keeps the query small — do not fetch the
whole table. `majorCount` stays as it is; leaving it on `is_major` means the
existing three major badges keep their current behaviour exactly.

### evaluateCriteria

Three new cases, identical in shape to `major_count`:

    case 'ryder_count':   return data.ryderCount   >= (cv.count as number)
    case 'solheim_count': return data.solheimCount >= (cv.count as number)
    case 'olympic_count': return data.olympicCount >= (cv.count as number)

Also add the three counts to the `UserData` type in both files.

### Why olympic_count 4 and not "all olympic venues"

`games_all` ("The Complete Games") is `olympic_count >= 4`, a fixed number, not
"every hosted venue". If it were dynamic, flipping Riviera to `hosted` in 2028
would grow the pool to 5 and the revoke pass in `rounds/delete` and
`rounds/[id]` would take the badge away from whoever had already earned it.
A fixed 4 cannot regress. Revisit by adding a new step after 2028.

## Step 2 — wax seal symbols

`apps/web/src/components/WaxSealBadge.tsx` AND
`apps/mobile/components/WaxSealBadge.tsx` — both copies need this.

### 2a. Roman numeral pill overflows at four characters

In `renderSymbol`, case `'trophy'`, the modifier pill is 24 units wide and the
font size is `modifier.length > 1 ? 11 : 13`. The new steps introduce `XX`,
`XXV`, `L`, `LXXV` and `C`. `LXXV` at font size 11 runs past the pill edge.

Replace the font size expression with:

    modifier.length >= 4 ? 8.5 : modifier.length >= 2 ? 10.5 : 13

### 2b. Two new symbols

`shield` — heraldic heater shield, stroked outline, with a charge clipped to
the shield path. Two variants distinguish the team events: `fess` (horizontal
band) for Ryder Cup, `chevron` for Solheim Cup. Carries the same Roman numeral
pill as the trophy. Deliberately NOT a cup shape — neither tournament trophy
may be reproduced.

`laurel` — two laurel branches curving up from a knot at the bottom, five
leaves a side. Centre is an open ring for the first step and a five-pointed
star for the complete set. NOT the Olympic rings, which the IOC enforces
hard.

Exact path data is in `docs/badge-symbols-new.tsx.txt`, written to drop into
`renderSymbol` with minimal editing — the paths are already in the component's
coordinate space (viewBox -40 -40 80 80, symbol roughly ±17 units, pill at
y 14-28).

### 2c. badgeSymbol() entries

The lookup is by badge NAME. Add:

    'Championship Pedigree' -> ['trophy', 'XX']
    'The Silver Quarter'    -> ['trophy', 'XXV']
    'Keeper of the Game'    -> ['trophy', 'L']
    'Major Historian'       -> ['trophy', 'LXXV']
    'The Immortal Hundred'  -> ['trophy', 'C']
    'Into the Arena'        -> ['shield-fess', 'I']
    'The Away Team'         -> ['shield-fess', 'V']
    "Captain's Pick"        -> ['shield-fess', 'X']
    'Ladies First'          -> ['shield-chev', 'I']
    'Across the Pond'       -> ['shield-chev', 'V']
    'Continental Divide'    -> ['shield-chev', 'X']
    'Where Nations Played'  -> ['laurel', null]
    'The Complete Games'    -> ['laurel', 'star']

Leave the three existing major entries untouched.

## Step 3 — deploy, then award

The edge functions do not run from the repo. Both must be deployed, and
**together** — if `award-badges` ships with the new cases while `delete-round`
does not, a mobile delete revokes what the award just granted.

    npx supabase functions deploy award-badges --project-ref twqsuitdrczohozgpdlr
    npx supabase functions deploy delete-round --project-ref twqsuitdrczohozgpdlr

The web change needs a commit, push and Vercel deploy.

### Awarding (Cowork runs this, not Claude Code)

Once both steps are deployed, `award-badges` is called once per user with the
service-role key and `{ user_id }` in the body. It only inserts, never revokes.

## Reference preview

`My Golf Passport - build project/mgp-badges-preview.html` renders all 16
championship badges exactly as the component should draw them. Use it to check
the result.
