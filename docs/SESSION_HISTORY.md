# My Golf Passport — Session History & State Recap

*Last updated: 2026-05-12 (Session 47)*
*Maintainer: Thomas + Claude — partner reference document*

This file is the single-page handover for anyone picking up MGP work mid-flight. It consolidates the persistent memory from ~25 working sessions into one document: what the project is, what's been built, what's open, and the conventions to respect when shipping further changes.

---

## 1. Executive summary

My Golf Passport (MGP) is a web app (Next.js 16 + React 19 + Supabase) that lets golfers stamp courses they have played — a passport metaphor for course collection. It is hosted at `mygolfpassport.vercel.app`. The app is in **v2 beta** with a soft-launch target on **June 1 2026**. After soft launch the plan is a native iOS/Android build (~Sept–Oct 2026); the web app is therefore positioned as a bridge, not the long-term shipping surface.

Two phases of work have happened so far:

1. **Phase 1 — Data coverage (Sessions ~22–35).** Building the core course database. ~36 500 courses across 149 countries are now in Supabase, with website/email/phone enrichment per club where federation APIs allowed. EU + USA + Canada + Australia are done. Coverage-first strategy: breadth before depth, MVP does not depend on per-course contact data.
2. **Phase 2 — Design redesign (Sessions 37–46).** The "Adventure" design system — passport / travel-diary aesthetic — was rolled out across every signed-in surface plus the new pre-auth flow (`/welcome`, `/signin`, `/signup`). Sprint 1 → Sprint 7 + Sprint A/B/C burndowns. ~70 commits.

Session 47 (this session) is a recap + UX audit pass before the partner takes the last design changes to the finish line.

**Live URL:** `https://mygolfpassport.vercel.app`
**Repo:** `C:\Users\thoma\mygolfpassport` (push to `origin/main`, partner uses Claude Code on main directly)
**Cowork-local state folder** (gitignored, not in repo): `My Golf Passport - build project/` — contains `PROJECT_STATE.md`, design mockups, scratchpad reports, manual lists.

---

## 2. Architecture & tech stack

- **Framework:** Next.js 16.2.2 (App Router) + React 19, TypeScript
- **Styling:** Tailwind v4 with `@theme inline` design tokens; widespread inline `style={{}}` props that read from `var(--color-mgp-*)` CSS variables
- **Backend:** Supabase (Postgres + Auth + Storage). Service-role key used server-side to bypass RLS for cross-user reads (feed, leaderboard)
- **Maps:** Leaflet (`/map`)
- **Fonts:** Cormorant Garamond (display) · Inter (body) · Special Elite (stamp/typewriter)
- **Mobile-first:** 430px max-width wrapper inherited from `src/app/layout.tsx`. No desktop-specific layout
- **Design source of truth:** `src/lib/design-tokens.ts` (TypeScript) + `src/app/globals.css` (CSS variables mirror)

### Route inventory (live)

Pages: `/` · `/welcome` · `/signin` · `/signup` · `/signup/check-email` · `/forgot-password` · `/reset-password` · `/login` (deprecated redirect) · `/onboarding` · `/survey` · `/map` · `/courses` · `/courses/[id]` · `/clubs/[country]/[club]` · `/profile` · `/profile/edit` · `/profile/[user_id]` · `/profile/courses/[country]` · `/friends` · `/leaderboard` · `/messages` · `/messages/[conversation_id]` · `/log` · `/badges` · `/badge-demo` (internal preview)

API routes: `/api/auth/callback` · `/api/conversations` · `/api/courses/nearby` · `/api/delete-account` · `/api/friend-request-notify` · `/api/friendships` · `/api/rounds/delete` · `/api/welcome`

### Bottom navigation (5 slots)

Defined in `src/components/BottomNav.tsx`. Four tabs + center FAB:

| Slot   | Icon | Label    | Href        | Match prefixes                       |
|--------|------|----------|-------------|--------------------------------------|
| Tab 1  | ⌂    | FEED     | `/`         | `/`                                  |
| Tab 2  | ⊕    | MAP      | `/map`      | `/map`, `/courses`, `/clubs`         |
| FAB    | +    | (Stamp)  | `/log`      | (no prefix matching)                 |
| Tab 3  | ∞    | FRIENDS  | `/friends`  | `/friends`, `/leaderboard`, `/messages` |
| Tab 4  | ◯    | YOU      | `/profile`  | `/profile`, `/badges`                |

Hidden on auth/onboarding routes (`/welcome`, `/signin`, `/signup`, `/signup/check-email`, `/auth/callback`, `/login`, `/forgot-password`, `/reset-password`, `/onboarding`, `/survey`, `/badge-demo`) and on individual chat threads (`/messages/<id>`).

### Database (Supabase) — key tables

- `profiles` (user identity, handicap, home_club, home_country, avatar_url, 5 privacy toggles)
- `courses` (~36 500 rows; club + country + flag + coords + website/email/phone where scraped; `is_displayed` flag hides 5 939 combo-component rows globally)
- `rounds` (user × course log events with rating + played_at)
- `friendships` (pending/accepted, bi-directional rows)
- `messages` + conversations
- `badges` + `user_badges` (12 badge symbols, 4 tier colors via WaxSealBadge)

---

## 3. Phase 1 — Data coverage history

This phase is **complete** for v2 beta. Background here only so the partner understands why the DB is the shape it is.

The course master data was originally imported from "Golfapi" (commercial provider). Sessions 22–37 layered federation-scraped enrichment on top (websites, emails, phones, coordinates, holes). The strategy was always **coverage-first**: get every country to a workable baseline before perfecting any one country.

### Per-country pass status (Pass 2a = federation enrichment)

| Country        | Sessions  | Klub-niveau website | Notes                                                     |
|----------------|-----------|---------------------|-----------------------------------------------------------|
| 🇪🇸 Spain       | S33       | 95.7 %              | RFEG embedded JSON; 583 klubber                            |
| 🇩🇪 Germany     | S33       | 97.1 %              | DGV GraphQL; 831 klubber, no auth                          |
| 🇫🇷 France      | S32       | 89.6 %              | ffgolf.org sitemap; 524 klubber                            |
| 🇧🇪 Belgium     | S31       | 86.4 %              | golf.be richest federation; 88 klubber                     |
| 🇮🇹 Italy       | S28       | 32.2 %              | FIG Cloudflare-blocked; partial                            |
| 🇦🇹 Austria     | S29       | 76.1 %              | ÖGV HTML; 218 klubber                                      |
| 🇨🇭 Switzerland | S30       | 49.6 %              | SwissGolf JS array; 117 klubber                            |
| 🇳🇱 Holland     | S27       | 69.6 %              | NGF public API; 253 klubber                                |
| 🇨🇿 Czech       | S34       | 43.1 %              | ČGF dual-listing; 116 klubber                              |
| 🇵🇱 Poland      | S34       | 62.8 %              | PZG; 26 klubber                                            |
| 🇩🇰 🇮🇸 🇳🇴 🇸🇪 Nordic | S34   | 89–98 %            | golfbox.dk JSONP; 764 klubber total                        |
| 🇵🇹 Portugal    | S35       | +9.8 pp             | FPG scoring system                                         |
| 🇸🇮 Slovenia    | S35       | 59.1 %              | GZS qStom CMS                                              |
| 🇭🇺 Hungary     | S35       | 40–44 %             | MGSZ has fewer klubber than DB                             |
| 🇬🇧 UK (Eng/Sco/Wal) | S25–26 | high              | Terraces /api/clubs/FindClubs                              |
| 🇮🇪 Ireland     | S24       | 22 %                | OSM + federation fallback                                  |
| 🇺🇸 USA         | S35       | 43.7 %              | OpenGolfAPI bulk CSV; 12 487 klubber                       |
| 🇨🇦 Canada      | S36       | 42.0 %              | Golf Canada WP REST                                        |
| 🇦🇺 Australia   | S37       | 41.7 %              | golf.com.au Terraces; via Chrome extension for CF-bypass   |

Remaining ~110 micro-holes (SK, EE, LT, LV, UA, BG, CY, LU, RO, RU + 1–2-klub micro-states) live in `SMALL_EU_MANUAL_LIST.xlsx` for human follow-up. They are **not** on the v2 beta critical path.

### Important data-pipeline guardrails (saved from incidents)

- **Combo courses are never deleted.** Combo-component rows (the 9-hole halves of an 18-hole loop, etc.) are soft-hidden via `is_displayed=false` since 2026-05-04. ~5 939 rows globally are now hidden, 3 165 canonical rows visible. UI queries MUST filter on this flag.
- **Coverage is reported at the klub level, not the row level.** Multiple course rows per klub → use `COUNT(DISTINCT club)` for honest coverage numbers.
- **Match scripts must use AND, not OR, on (similarity, distance).** Otherwise twin names from far-apart locations slip through. Plus a per-field confidence pattern: each updated field validates against its own source's confidence, never "best of" at entry level.
- **PROJECT_STATE.md is Cowork-local, not in git.** The `My Golf Passport - build project/` folder is gitignored since 2ed1ce9. Don't `git add` it without an explicit confirmation.

---

## 4. Phase 2 — Design redesign history

The Adventure design system was conceived in Session 37 and rolled out sprint by sprint through Session 46. Below is the timeline. For full per-commit detail, the per-session `project_session_NN_close.md` memory files exist in the Cowork memory directory.

### Adventure design system — what it is

A passport / travel-diary aesthetic:

- **Palette:** dark forest passport-cover green (`--color-mgp-cover #1f3a2e`) · brass gold accent (`--color-mgp-gold #c9a84c`) · cream paper (`--color-mgp-cream #f4ecd8`) · stamp-ink red/blue/purple
- **Typography:** Cormorant Garamond (display) · Inter (body) · Special Elite (stamp/eyebrow — typewriter mono, **never** for body)
- **Stamps as core mechanic:** logging a round = stamping the passport. Stamps are not decoration; they're the collection metric. `PassportStamp.tsx` is the shared component
- **Brand rules:** `border-radius: 0` on cards (paper is not rounded); stamps have `rotate(-4° to -12°)` for handstamped feel; hero blocks have `border-bottom: 3px double gold` (passport-cover edge)
- **Adventure CTA hierarchy** (Session 45 STAMP/LOG/ADD convention):
  - **STAMP** = metaphor + celebration (hero stamp CTA, success toast, "VISITED" stamp)
  - **LOG** = transactional button ("+ LOG NEW ROUND" on visit-block, sticky CTA, `/map` empty state)
  - **ADD** = relational/list actions ("+ Add friend", "+ Add to bucket list")
  - Never mix tracks. "+ STAMP THIS COURSE" as a regular button is wrong — should be "+ LOG ROUND"

Token source of truth: `src/lib/design-tokens.ts`. Mirror CSS variables in `src/app/globals.css`. Mockup HTML files in `My Golf Passport - build project/design-system/` (Cowork-local).

### Sprint timeline

- **Sprint 1 (S38, commit `5b232f3`)** — Adventure tokens + BottomNav foundation
- **Sprint 2.1 (S38, `10f74f9`)** — Feed pivot: home becomes social feed with friends' rounds/badges/connections
- **Sprint 2.2 (S38, `9db7224`)** — CourseHero passport-stamp redesign
- **Sprint 2.3 (S38, `a710c32`)** — Token rollout `/courses` + `/log`
- **Sprint 2.4 (S38, `9d23533`)** — `/clubs` chrome
- **Sprint 2.5 (S38, `8d12e46`)** — BucketListButton + CollapsibleCard polish
- **Sprint 3 (S40, `d88ec28` + `82d7fcd` + `b3501e0`)** — Profile split (public view + `/profile/edit` settings) + privacy controls + UserAvatar fix + Adventure chrome on `/map`, `/friends`, `/leaderboard`, `/messages`, `/profile/[user_id]`. **App Store-blocker for Sign-out + Delete-account closed**
- **Sprint 4 (S40, 10 commits ending `3fe9f56`)** — WaxSealBadge component + `/badges` grid + badge surfaces on Feed/Profile/Hero. Generic loving-cup trophy (Claret-Jug shape avoided for IP reasons — R&A holds rights)
- **Sprint 5.1–5.5 (S41, 9 commits ending `495a62c`)** — PassportCard shell + accordions + Friends + Leaderboard tokenized. SVG line-icons replace system emojis. Audit #11 (external-link ↗), #12 (Remove-friend confirm modal), #25 (premium tooltip), #26 (leaderboard headers) closed
- **Sprint 6 (S42, 4 commits ending `ff0dbeb`)** — Audit-burndown: #28 (drop login social-proof), #27 (solo-self empty states), #22 (CourseBrowser pagination 50-club chunks), #16 (privacy DB defaults flipped ON→OFF for new sign-ups, migration `20260507_privacy_defaults_off.sql`)
- **Sprint 7 (S43, 13 commits ending `b70a6d7`)** — Home redesign (PassportCard + 2x2 HomeNavTiles + feed folded under); Log overhaul (passport-stamp success, atlas empty state, ✓ Played search tag, FAB reset via `?t=` param, re-log "Round #N" copy); Audit #4 closed (`/log` country dropdown 17→149); shared `BackButton` (router.back() with fallback); lint cleanup (6 errors fixed); 9-hole combo UI filter on `/clubs` page
- **Sprint A/B/C (S43–44, 3 commits ending `03ea993`)** — Navigation audit burndown: re-log unified reset via `resetForNewSearch()` helper; BottomNav hidden on `/badge-demo` + chat threads; nearby-courses fetch errors surfaced (not silent fallback for permission denied)
- **S45 (14 commits, started with Sprint C overflow)** — `/messages` chat thread Adventure'd (postcard bubbles); leaderboard action button wraps; `/map` height-capped + popup tokenized; `/profile/courses/[country]` redesign; CountryAccordion redesign; course/club social cards consolidated to shared `GolfersListAccordion`; course log-flow with sticky `CourseStickyLogCta`; profile-card buttons tokenized; en-GB locale enforced (last `da-DK` reference gone)
- **S46 (2 commits ending `abb42cb`)** — Onboarding redesign Trin 0 + Trin 1: new `/welcome` marketing landing page; auth suite (`/signin`, `/signup`, `/signup/check-email`, `/forgot-password`, `/reset-password`) with shared CSS in `globals.css`; old `/login` deprecated to redirect; Supabase URL config updated with 4 redirects (prod + localhost × callback + reset)
- **S47 (this session — 2026-05-12)** — Recap + UX audit + handover docs

### What's live after S46

Every signed-in surface uses Adventure tokens. The pre-auth funnel (`/welcome → /signin/signup → /signup/check-email → /onboarding`) is Adventure'd up to but **not including** `/onboarding` itself — that page is still dark-glass-green and has a broken Skip button and an 11-country dropdown (DB has 100+).

---

## 5. Current open items (prioritised for partner pickup)

These are what's left on the path to soft launch. Ordered by Thomas's priority as captured in S45/S46 closes.

### 🔴 Must-have (blocks soft launch)

1. **Domain + email infrastructure.** Buy `mygolfpassport.com` or `.golf` (Cloudflare DNS), connect to Vercel, create Resend account, verify domain via DNS, plug Resend SMTP into Supabase Auth, update Supabase URL Config. Built-in SMTP is rate-limited to 3–4 emails/hour and will choke soft launch. **No code change — config only.**
2. **Onboarding redesign (Trin 2+).** `OnboardingClient.tsx` is the only remaining pre-Adventure surface. Should be a passport-stamping ceremony: name + home club + home country + handicap, in cream/paper tokens. Bonus: portrait upload + first-stamp tutorial. Per Session 45 backlog: "molto importante for new-user conversion." **Est. 1–2 sessions.**
3. **Bottom navigation typography revamp.** Tab labels are 9 px (unreadable on small phones). "FEED" should be relabelled "HOME". The ∞ infinity icon for FRIENDS should swap to a PeopleIcon (already exists in `FriendsPageClient.tsx`). **Est. 30 min.**
4. **Clickable counter boxes on PassportCard.** Courses / Countries / Badges (lines 242–284 in `src/components/PassportCard.tsx`) are currently inert. Should link to courses-accordion / countries-accordion / `/badges`. **Est. 30 min.**

### 🟡 Should-have

5. **Tile eyebrow font sizes** (Atlas / Trophy room / Standings / Companions in `HomeNavTiles.tsx`). Currently 9 px on small phones — unreadable. Bump to 10–11 or revisit layout. **Est. 30 min.**
6. **Round-aggregation in feed.** Currently each round = own FeedCard, so a power user (Peter Bugge's 16 rounds) dominates the feed. Group same-user rounds within a time window → "Peter Bugge added 16 courses to his passport". **Est. 2–3 hours.**
7. **Per-country course-name audit.** Find courses with `isGenericCourseName=true` per country and count. Sub-task: investigate Aarhus Golf Klub (missing or bug?). **Varies by country.**

### 🟢 Nice-to-have / parked

8. "Report a course error" mailto flow on course-page
9. `/login` Adventure redesign (page still exists for bookmarks but redirects)
10. `/legal/privacy` + `/legal/terms` stubs (App Store-blocker for native phase)
11. Stamp-redesign creative session (`PassportStamp.tsx` variants — rectangular, oval, jagged-edge)
12. Avatar upload UI (component is ready, needs storage + upload endpoint)
13. Native-app prep: country-badge custom illustrations, Apple/Google Sign-in, app-icon, splash, push-notifications

### Top-bar verification on routes not fully audited

Audit agent in S43 could not reach all routes. Verify pattern (M-monogram link to `/` + BackButton/← Home + ProfileButton) on:

- `/map`, `/friends`, `/leaderboard`, `/messages` (list), `/profile/[user_id]`, `/profile/courses/[country]`

This is partly done (S45 touched most of them) but a full sweep still owed.

### S47 audit additions

See `docs/UX_AUDIT_S47.md` (this session) for navigation-redundancy + font-size findings. Top S47 recommendations:

- Cut HomeNavTiles down (or differentiate) so it does not duplicate BottomNav for /map + /friends
- Establish a 10 px minimum chrome label size; remove `fontSize: 8` entirely (only 3 occurrences)
- Decide whether top-bar back-text ("← Home") should disappear in favour of just the M-logo, since both lead to `/`

---

## 6. Pricing model (for marketing copy / legal review)

- **Web app (v2 beta):** free for everyone, no caps
- **First 500 native-app users:** lifetime premium, all features kept forever (early-adopter promo)
- **501+ native-app users:** free basic tier — max 25 courses logged, no friend features. Grandfather rule: if a user already logged >25 in web phase they keep them but cannot log more until upgrading
- **Premium:** yearly fee OR one-time lifetime, full features. Price not yet set

Copy rules: "Free in beta" OK. "Free forever" **not** OK (overcommits). "First 500 lifetime" claim is active on `/welcome` and must be removed via Vercel deploy once we hit 500 signups.

---

## 7. Collaboration conventions (saved from incidents — please respect)

These are concrete process rules that came from things going wrong. They are not preferences, they are guardrails.

- **Work directly on `main` from Claude Code.** No worktrees, no feature branches. Avoids Cowork ↔ CC divergence. Every CC session should start with `git checkout main && git pull`.
- **Cowork has direct Supabase MCP access** — run SQL via `execute_sql` directly, never paste SQL in chat for Thomas to run manually. Always require an explicit "yes" before destructive `UPDATE`/`DELETE`.
- **Thomas never runs terminal commands himself.** Bake all bash/npm/dev-server commands into CC prompts, never tell him to "run X" in his terminal.
- **CC prompts must be clearly marked** with a separator + heading. Number them when multiple. Keep explanation outside the prompt block.
- **Never inline JavaScript in CC prompts.** The chat renderer autolinks `.property` tokens; use Edit/Write directly on the main repo and describe changes in prose.
- **CC checkpoint commits — no `read -p`.** Non-interactive bash hangs forever on `read`. Stage-only prompts → Thomas pastes output → send commit-message manually → he commits. UI commits: show the full diff, not just `--stat`.
- **Verify unusual club names before renaming.** Sheet data alone is not enough — actively web-verify joke/odd club names.
- **`PROJECT_STATE.md` is gitignored.** The Cowork-local `My Golf Passport - build project/` folder is not in the repo. Don't `git add` it.
- **No `const URL = ...` in scripts** — shadowing the global `URL` constructor makes `new URL()` silently fail in try-catch. Use `LISTING_URL` / `BASE_URL`.

---

## 8. Reference appendix — where to look for more detail

The Cowork memory folder (not in repo, lives on Thomas's machine at `…\spaces\…\memory\`) holds ~80 atomic memory files. Worth-knowing entry points:

- `project_session_46_close.md` — last session's full recap
- `project_session_45_close.md` — `/messages` chat + leaderboard + map + log-flow detail
- `project_design_sprint_status.md` — sprint-by-sprint design rollout log
- `reference_ux_audit_session_37.md` — original 28-item walkthrough audit
- `reference_ux_audit_session_43.md` — 7-item navigation audit
- `reference_mgp_design_system.md` — token files, mockup locations, brand rules
- `reference_action_verb_convention.md` — STAMP/LOG/ADD copy rules
- `project_pricing_model.md` — pricing tier detail
- `feedback_*` files — incident-driven process guardrails

In the Cowork-local build folder (`My Golf Passport - build project/`):

- `ONBOARDING_AUDIT.md` — 16-point review of old onboarding + 12-step proposal
- `PROJECT_STATE.md` — current sprint state snapshot
- `SESSION_HISTORY.md` — older version of this document
- `design-system/welcome-hero-mockup-v4.html` — `/welcome` final mockup
- `design-system/auth-suite-mockup.html` — auth flow mockup
- `design-system/full-screens-adventure.html` — 5 full-screen mockups
- `SMALL_EU_MANUAL_LIST.xlsx` — micro-country data backlog (~110 clubs)

---

*This document is intentionally exhaustive. For day-to-day work just read sections 4 (Adventure design system), 5 (open items), and 7 (collaboration conventions). The rest is background for when something surprises you.*
