# 📱 My Golf Passport — Mobile app status (Claude Code thread)

Last updated: August 7, 2026

## What this file is

The React Native/Expo app in `apps/mobile` is being built in a separate
Claude Code thread from the Cowork-tracked web work documented in
`PROJECT_REFERENCE.md` / `PROJECT_HISTORY.md` at the repo root. Those two
files track the **web app's course-database cleanup pipeline** and use
their own Cowork session numbering — this file tracks **mobile-specific
build state** and is not part of that numbering. Don't merge the two.

## Current state

**Testing has moved off Expo Go onto a custom EAS dev-client build** —
Expo Go dropped remote push notification support entirely, so push
required its own compiled dev-client (`expo-dev-client`, EAS project
`@my-golf-passport/mygolfpassport`, bundle id `com.mygolfpassport.app`
on both platforms, real display name "My Golf Passport" — the scaffold
still had `name: "mobile"` until now). Thomas got an Apple Developer
account, built and installed the dev client once (needed his own
interactive Apple ID login + device registration — not something a
Claude Code thread can do), and now reconnects to the same Metro dev
server as before (`npx expo start`, LAN mode) from that app instead of
Expo Go. Any future native dependency will need a new EAS build the
same way; JS-only changes still hot-reload exactly like before.

**Push notifications are fully built**: token registration
(`apps/mobile/lib/push.ts`, upserts into `public.push_tokens`), a
generic sender (`supabase/functions/send-push`, service_role-only), 5
instant DB-trigger-driven notifications (friend request sent/accepted
+ friend-of-friend fan-out, new message, home-club signup), and a
daily digest (`private.run_daily_digest()`, pg_cron at 18:00 UTC) that
batches "friend logged N rounds / earned N badges today" into one push
per active friend instead of one push per event — otherwise importing
a round history would spam every friend once per round. All of it is
DB-trigger/cron driven rather than duplicated in web+mobile client
code, so it fires regardless of which client made the write. Every
layer was tested live end-to-end on Thomas's device (real pushes, not
just code review) before being committed.

All core screens are built and live-tested on device: Home,
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

## Beta launch push (Aug 1–7, 2026)

Goal: get to a 20-30 person beta with distribution "trivially easy" for
non-technical testers on both platforms — see the full requirement
written up in this thread's own memory if picking this up fresh
(hard requirement, testers must self-serve any time, not depend on
Thomas/Claude being active).

- **EAS Update (OTA)** set up (`expo-updates`, `runtimeVersion.policy:
  "appVersion"`, one update-channel per build profile). Preview/production
  builds now auto-fetch JS updates in the background, no login/launcher
  screen. Any future native-module change still needs a fresh build.
- **~20-item pre-beta punch list** done (2026-08-02, commit `b3ca447`):
  badge-tap navigation, badges now actually awarded on mobile (were
  never wired up before — new `award-badges` Edge Function, all 6
  existing users backfilled), nearby-courses/map toggle fixes, profile
  Courses/Countries accordion merge, course-detail location map,
  stamp-animation polish, round-date-optional fix, UI radius/border
  consistency pass, and more.
- **Android push notifications (FCM)**: Firebase project created,
  `google-services.json` wired into `app.json`
  (`android.googleServicesFile`), FCM V1 service-account key uploaded
  to EAS credentials, new Android build shipped. Not yet confirmed
  end-to-end on a physical Android device — Thomas's Android-testing
  friend hasn't had a chance to test yet as of this writing.
- **iOS TestFlight**: production build #4 (commit `6598257`, the first
  build to include the full punch list + OTA + Firebase work — build #3
  predated all of it and was never submitted) submitted to App Store
  Connect via `eas submit`. Internal testing (no Apple review needed)
  confirmed working on Thomas's own device via the TestFlight app.
  External testing (the 20-30 beta group, needs Apple's ~hours-long beta
  review) not yet started.
- **Daily-digest privacy bug fixed** (2026-08-07, migration
  `20260807_daily_digest_respect_hide_from_feeds.sql`): `private.
  run_daily_digest()` was pushing "X logged N rounds today" to friends
  even when the actor had `hide_from_feeds` on — the in-app feed already
  respected that flag (`isActorVisible` in `lib/feed.ts`), the push
  digest didn't. Now it does.
- Supabase dashboard security-advisor warnings — Thomas has addressed
  these himself (not done in this thread; verify with `get_advisors` if
  picking this up fresh and it matters).

## Deliberately deferred (still open)

- **Bucket-list-club notifications** ("en klub du har på din bucketlist
  får en ny spiller tilknyttet") — explicitly parked by Thomas; the
  other 5 notification types are built.
- **Android oversized system font** — parked; likely just the test
  device's own system text-size setting (RN `allowFontScaling`
  inherits it, never explicitly disabled), not a code bug. Not worth
  the RN 0.81/React 19 rendering-shim workaround unless confirmed
  otherwise.
- **Onboarding illustration** → real screenshot of a populated "My Map"
  — blocked on getting one from the Android-testing friend.
- Leaderboard of top-rated courses, Top 100/major-courses list, "Welcome
  back" login copy rewrite — explicitly deferred by Thomas, not scoped.

Everything else that was previously listed here as deferred (the Map,
course-detail screen, other-user profile view, SharePassport,
ProfileRatingsReviews, the Feedback tile, "Show it off", push
notifications, sharing a build with a second person — superseded by
EAS Update + TestFlight) has since been built or superseded.

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
- `supabase/functions/` — Edge Functions deployed for mobile
  (`delete-round`, `send-push`); check here alongside Postgres RPCs
  when tracing how a privileged write reaches the database.
- `supabase/migrations/` — versioned SQL for the push-notification
  schema/triggers/cron job. The Vault secret they depend on
  (`service_role_key_for_push`) is stored separately and never
  committed — see the comment at the top of
  `20260731_push_notification_triggers.sql`.
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
