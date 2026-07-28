# 📱 My Golf Passport — Mobile app status (Claude Code thread)

Last updated: July 2026

## What this file is

The React Native/Expo app in `apps/mobile` is being built in a separate
Claude Code thread from the Cowork-tracked web work documented in
`PROJECT_REFERENCE.md` / `PROJECT_HISTORY.md` at the repo root. Those two
files track the **web app's course-database cleanup pipeline** and use
their own Cowork session numbering — this file tracks **mobile-specific
build state** and is not part of that numbering. Don't merge the two.

## Current state

All core screens are built and live-tested on device via Expo Go: Home,
Courses (full Atlas drill-down + Nearby Courses), Social
(Friends/Leaderboard/Messages), You tab (Courses/Countries/Badges
accordions, Edit Profile), Log flow (search → rate/note/date → save),
public profile pages for other users, a course-detail screen, a club
page, and "My Map".

**Round editing and deletion** are both live from the You tab's Courses
accordion: a pencil icon opens `/log?edit=<roundId>` to change
rating/date/note (via the `update_round` Postgres RPC — `rounds` has no
client-facing UPDATE policy); a trash icon deletes the round and
re-evaluates/revokes any badges that round was propping up, surfacing a
"Badge X has also been removed" alert if so. Deletion needed the full
badge-criteria logic from `apps/web/src/lib/badges.ts` (per-club credit
caps, continent bucketing, 12 criteria types), which was too large/
nuanced to safely re-implement in Postgres SQL, so it's ported
near-verbatim into a **Supabase Edge Function**
(`supabase/functions/delete-round`, Deno/TypeScript) instead — this is
the first Edge Function in the project, alongside the existing
`submit_course_edit` / `update_round` RPCs. Called from
`apps/mobile/lib/log.ts`'s `deleteRound()` via
`supabase.functions.invoke(...)`, which auto-attaches the caller's JWT;
the function does its own ownership check before deleting (mirrors
web's `/api/rounds/delete` route: cookie-auth client to identify the
caller, service-role client for the privileged delete + badge cleanup).

**"Show it off"** (the You tab's passport-card share button) is also
live: it reuses web's existing `/api/share-card` endpoint and Mapbox
renderer (`buildInviteImage`) rather than adding a client-side
screenshot dependency. That endpoint only took a cookie session before,
which mobile has none of, so it now also accepts a Bearer token
(`Authorization: Bearer <access_token>`, validated via a plain anon-key
`auth.getUser(token)` call — see `apps/web/src/app/api/share-card/route.ts`).
Mobile downloads the PNG with `expo-file-system` (`File.downloadFileAsync`
to a fixed cache filename, deleting any leftover from a previous share
first — the native `idempotent` download option turned out not to be
reliably honored by Expo Go's bundled native module version) and hands
it to the native share sheet via `expo-sharing`; both packages work in
plain Expo Go, no custom dev client needed. Fixing this also surfaced a
real bug in `apps/web/src/proxy.ts` (this Next.js version's middleware
equivalent): it was redirecting **any** unauthenticated request to
`/api/*` routes to the HTML `/welcome` page instead of letting the route
return its own error — now fixed for all API routes, not just this one.

**"My Map"** (`apps/mobile/app/map.tsx`) is fully built, not deferred:
a world map (WebView-based, see below) showing every country the user
has stamped, tapping a country drills into a per-course cluster map
(played courses vs. unplayed, toggle to show only played) with
pagination past Supabase/PostgREST's 1000-row default cap. Built via a
WebView wrapping Leaflet (matching web's own map library) rather than
`react-native-maps`, sidestepping the native-module/dev-client build
requirement.

**Mid-build correction (earlier this thread):** several mobile screens
(Social rows, the Courses tab) had briefly been built from general
design-token judgment instead of reading the actual web source
component, causing real mismatches. Root-caused and fixed; the working
rule since has been to always read the real web source file before
laying out any screen, not just for data logic — this has held for
every feature since (Map, profile pages, round edit/delete, etc.).

## Deliberately deferred (still open)

- **Push notifications** — not built at all. Real remote push on iOS
  needs a custom Expo dev-client build (same Apple-Developer-account
  blocker `react-native-maps` would have hit), which Thomas still needs
  to check he can get on his phone before this is worth starting.
Everything else that was previously listed here as deferred (the Map,
course-detail screen, other-user profile view, SharePassport,
ProfileRatingsReviews, the Feedback tile, "Show it off") has since been
built.

## Flagged as possibly stale (per Thomas, earlier this thread)

- The "Design og struktur 2.0" and "Struktur og design" docs in the
  Google Drive "My Golf Passport" folder may no longer reflect current
  thinking — check before treating them as current spec.
- `PROJECT_REFERENCE.md`'s Business model section ("Free first 6 months
  · €19/år premium efter traction") is stale — pricing-at-launch has
  moved away from paid-after-6-months per Thomas; exact new model not
  yet specified. Worth reconciling next time PROJECT_REFERENCE.md is
  updated (that file is Cowork's to maintain).

## Where the real specs live

- `apps/web/src` — the actual behavior to match. Read the real component
  before porting any UI, not just the shared design tokens.
- `supabase/functions/` — Edge Functions deployed for mobile (currently
  just `delete-round`); check here alongside Postgres RPCs when tracing
  how a privileged write reaches the database.
- `apps/web/src/proxy.ts` — the auth gate every web request (including
  API routes) passes through. Any new Next.js API route mobile needs to
  call directly (as opposed to going through Supabase directly, or an
  Edge Function) needs a Bearer-token branch like `/api/share-card`'s,
  and won't be reachable at all unless `path.startsWith('/api/')` keeps
  its exemption here.
- Google Drive folder **"My Golf Passport"** — has a marketing/PR plan
  (`Markedsføringsplan MGP`), a Claude project-reference doc, product
  decision notes, and Gherkin user-story specs. Not automatically visible
  to a fresh thread — requires an explicit search via the Drive connector.
