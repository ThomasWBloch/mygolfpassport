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

Core screens are built and live-tested on device via Expo Go: Home,
Courses, Social (Friends/Leaderboard/Messages), You/Profile, Log flow,
Edit Profile.

**Mid-build correction (this thread):** several mobile screens (Social
rows, the Courses tab) had been built from general design-token judgment
instead of reading the actual web source component. This produced real
mismatches — missing avatars, wrong data groupings, and in the Courses
tab's case, an entirely wrong reference component. Root-caused and fixed;
the working rule going forward is to always read the real web source file
before laying out any screen, not just for data logic.

Fixed as a result of that correction:
- **Avatar system** — photo-or-initials-disc (matches web's `UserAvatar`,
  same 8-color name hash) on Friends/Leaderboard/Messages rows and the
  chat thread header.
- **Courses tab rebuilt.** It had been built against `CourseBrowser.tsx`,
  which turned out to only be the search widget nested inside web's real
  `/courses` page — a 4-level "Atlas" drill-down (Overview → Continent →
  Country → course list) with an always-visible "Nearby Courses" panel.
  Mobile now mirrors that structure: `NearbyCoursesPanel` (permission
  state machine, "Hide played" toggle persisted via AsyncStorage, falls
  back to the user's last-round coordinates when location is denied —
  native-only per memory `project_log_nearby_fallback`, since that
  fallback was deliberately kept off the web build), a continent grid as
  the default landing state, drilling into a country grid, then the
  existing club-grouped course list with Load More pagination.
- Log flow's course search got the same club-grouped list + Load More,
  plus its own simpler "Courses near you" (mirrors `CourseBrowser`'s
  log-mode nearby list — a separate, simpler feature from the Atlas
  panel above).

Other recent additions: native date picker on the Log flow (capped at
today; needed `themeVariant="light"` — OS dark mode otherwise renders the
picker's text invisible against the app's fixed light palette), country
filter on course search (Courses tab + Log flow) with normalization
fixes so accented course/club names match plain-text search.

## Deliberately deferred

- **The Leaflet map equivalent ("My Map").** Explicit scope decision with
  Thomas — would need a native maps library (e.g. `react-native-maps`)
  and cluster-marker logic rebuilt from scratch. Everything else in the
  Atlas was built; this piece was intentionally left out.
- Course-detail screen (viewing a single course) doesn't exist yet, so
  nearby-course taps currently just filter to that course's country
  instead of opening a detail view.
- Other-user profile-view screen — Social rows aren't tappable through to
  a profile yet because there's nowhere to send the user.
- SharePassport (referral invite), ShareCard (share image),
  ProfileRatingsReviews, and the Feedback link tile on the You/profile tab.

## Known bug — not yet fixed

Thomas reported after testing the Atlas rebuild: some courses appear
more than once for what should be the same course/combo. Likely the
reverse-order / self-pair combo duplication the web side already solved
via `courses.is_displayed` (see `PROJECT_REFERENCE.md`'s combo-display
section). Mobile's main course-fetch paths already filter
`is_displayed = true`, so this needs investigation — possibly a query
path that skips the filter, or a client-side grouping edge case. Not
yet root-caused.

## Flagged as possibly stale (per Thomas, this session)

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
- Google Drive folder **"My Golf Passport"** — has a marketing/PR plan
  (`Markedsføringsplan MGP`), a Claude project-reference doc, product
  decision notes, and Gherkin user-story specs. Not automatically visible
  to a fresh thread — requires an explicit search via the Drive connector.
