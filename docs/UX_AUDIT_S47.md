# UX Audit — Session 47 (2026-05-12)

*Scope: navigation redundancy, font-size readability, information hierarchy, full UX flow*
*Trigger: Thomas reports duplication between top nav, bottom nav, and in-page content. Also reports difficulty reading small text on his screen.*
*Auditor: Claude (Cowork). Pre-partner-handover audit before final design changes.*

---

## Executive summary

The Adventure design system has been rolled out cleanly and the chrome is consistent across every signed-in surface. The two real problems are:

1. **Triple-pathing.** Several primary destinations (`/map`, `/friends`, `/badges`, `/leaderboard`, `/messages`, `/profile`) are reachable from three different places: the bottom nav tab, the top bar, and an in-page tile or counter. The home page in particular shows the same destination twice in a single viewport (e.g. `/map` lives in both the BottomNav MAP tab and the HomeNavTiles "Atlas" tile).

2. **Chrome typography is too small.** The codebase has 31 occurrences of `fontSize: 9`, 81 of `fontSize: 10`, and 69 of `fontSize: 11` — almost entirely in navigation, eyebrows, stamps, and metadata. The BottomNav tab labels themselves are 9 px. For a user with average vision on a small phone (~5.5"), the chrome is below the WCAG-recommended floor.

Both problems are fixable in a focused half-day. There are no architectural blockers — only a handful of components to edit. The audit closes with a recommended Sprint plan in §6.

---

## 1. Navigation redundancy — the core issue

### 1.1 The "triple-pathing" matrix

For each major destination, here is where the user can currently click to get there:

| Destination     | Bottom nav        | Top bar                 | In-page tile / link                                          |
|-----------------|-------------------|-------------------------|--------------------------------------------------------------|
| `/`             | FEED tab (⌂)      | M-monogram + brand text | —                                                            |
| `/map`          | MAP tab (⊕)       | (none)                  | HomeNavTiles "Atlas" tile (home)                             |
| `/log`          | Center FAB (+)    | (none)                  | "+ LOG NEW ROUND" on `/courses/[id]`, `/map` empty state, etc |
| `/friends`      | FRIENDS tab (∞)   | (none)                  | HomeNavTiles "Companions" tile (home)                        |
| `/leaderboard`  | (FRIENDS prefix)  | "Leaderboard →" on /friends | HomeNavTiles "Standings" tile (home)                     |
| `/messages`     | (FRIENDS prefix)  | ✉ icon on /             | —                                                            |
| `/profile`      | YOU tab (◯)       | Avatar (most pages)     | —                                                            |
| `/profile/edit` | (none)            | (none)                  | PassportCard "Edit ›" pill **+** "Edit profile & settings" card on `/profile` (two on the same page) |
| `/badges`       | (YOU prefix)      | (none)                  | HomeNavTiles "Trophy room" tile (home) + PassportCard wax-seal strip |
| `/courses/[id]` | (MAP prefix)      | (none)                  | Map markers, course lists, club page, friend profile rounds  |

### 1.2 The home page is the worst offender

The home page (`src/app/page.tsx`) shows **all four BottomNav targets** on screen simultaneously:

- Top bar: "My Golf Passport" link (→ `/`, but you're already on `/`) + ✉ (→ `/messages`) + avatar (→ `/profile`)
- HomeNavTiles 2×2 grid: Atlas (→ `/map`), Trophy room (→ `/badges`), Standings (→ `/leaderboard`), Companions (→ `/friends`)
- BottomNav directly under: FEED, MAP, FRIENDS, YOU + FAB

The Atlas tile (→ `/map`) and the MAP tab (also → `/map`) are roughly **40 px apart vertically**. The Companions tile (→ `/friends`) and the FRIENDS tab (also → `/friends`) are similarly stacked. This is duplication the user notices.

`HomeNavTiles.tsx` even acknowledges this in its own header comment:

> *"The Atlas + Companions entries deliberately overlap with BottomNav (MAP + FRIENDS) — the visual stamp indicators add stat-context that the abstract BottomNav icons cannot."*

The justification is reasonable (the stamps show personal stats — "12 / 149 countries", "3 pending requests") but the result is still visual duplication. There are two clean ways to resolve this; see §6.

### 1.3 The "← Home" back-link in top bars is a third copy

Most secondary screens (`/friends`, `/leaderboard`, `/map`, `/messages`, `/profile/[user_id]`) have a top bar with **both** an M-monogram (linked to `/`) and a small "← Home" text link (also to `/`). That's two affordances to the same destination, 13 px apart. The M-monogram alone would suffice.

Exception: `/profile/edit` and `/badges` use `<BackButton>` (router.back() with fallback) which is *not* a duplicate — it goes wherever the user came from. Keep those.

### 1.4 `/profile` has duplicated "Edit profile" affordance

In `src/app/profile/page.tsx`:

- Line 178–197: PassportCard `topRightAction` slot renders an "Edit ›" pill in the top-right of the hero
- Line 209–246: Below the accordions, a full "Settings — Edit profile & settings" card

Both link to `/profile/edit`. The pill alone is enough. The settings card duplicates without adding new info.

### 1.5 The ✉ icon only exists on home

The `/messages` inbox is reachable from the home top-bar (✉) and via the FRIENDS-tab prefix matching, but **not** as its own dedicated tab. Inside the BottomNav, going to FRIENDS lands the user on `/friends`, and they must remember that messages live "under" friends. The current arrangement makes message access discoverable only from home — moving away and back again is a 2-step path.

There is no easy fix here without changing the 4-tab BottomNav structure. Document as a known gap.

---

## 2. Font-size & readability

### 2.1 The data

Hard-coded `fontSize` count across `src/**/*.tsx`:

| Size  | Count | Used for                                  | Verdict                       |
|-------|-------|-------------------------------------------|-------------------------------|
| 6     | 1     | "SOON" badge on /welcome                  | Unreadable — bump or remove   |
| 8     | 3     | FeedCard "PLAYED" stamp, HomeNavTiles red-dashed badge, Leaderboard dropdown arrow | Unreadable — bump to 10       |
| 9     | 31    | BottomNav tab labels, eyebrows, stamp meta | Borderline — bump to 11       |
| 10    | 81    | Eyebrows, captions, metadata              | Floor                         |
| 11    | 69    | Section headers, labels                   | OK                            |
| 12    | 40    | Captions (matches `caption` token)        | OK                            |
| 13+   | 113   | Body, headings                            | OK                            |

The design tokens file (`src/lib/design-tokens.ts`) defines `micro: 9` and `eyebrow: 10` — i.e. the tokens themselves enshrine "9 px is a valid chrome size". This is the root issue: the code is consistent with the tokens, but the tokens are too small.

### 2.2 Concrete offenders

**Critical (8 px — fix in this sprint):**

| File                                       | Line | What it styles                                              |
|--------------------------------------------|------|-------------------------------------------------------------|
| `src/components/FeedCard.tsx`              | 135  | "PLAYED" year stamp (44 px dashed-red circle)               |
| `src/components/HomeNavTiles.tsx`          | 217  | Atlas tile red-dashed "12/149" stamp text                   |
| `src/app/welcome/page.tsx`                 | 171  | "SOON" decoration on `/welcome` (opacity 0.7 — invisible)   |

**Important (9 px — fix in this sprint):**

| File                                       | Line  | What it styles                                              |
|--------------------------------------------|-------|-------------------------------------------------------------|
| `src/components/BottomNav.tsx`             | 142   | **All four nav tab labels (FEED/MAP/FRIENDS/YOU)**          |
| `src/components/PassportCard.tsx`          | 168   | "PASSPORT HOLDER" eyebrow above the user's name             |
| `src/components/PassportCard.tsx`          | 273   | "COURSES" / "COUNTRIES" / "BADGES" labels under the stats   |
| `src/components/HomeNavTiles.tsx`          | 175   | Tile subtitle ("Browse the map", etc.)                      |
| `src/app/profile/page.tsx`                 | 226   | "SETTINGS" eyebrow on the Edit-profile card                 |
| (≈ 25 more — see grep output for full list) |       |                                                             |

**Noteworthy (10 px — keep but verify on real device):**

The 81 occurrences of `fontSize: 10` are scattered — mostly eyebrows and metadata. They are at the bottom of the readable range, not below it. Worth a real-device check on a 4.7" iPhone SE before deciding whether to bump globally.

### 2.3 Recommended typography fix

Update `src/lib/design-tokens.ts` `typography.size` scale:

```ts
size: {
  display1: 32, display2: 28,
  h1: 24, h2: 20, h3: 17,
  body: 15, bodySmall: 13,
  caption: 12,
  eyebrow: 11,    // was 10 — bump
  microMin: 10,   // was 9 (renamed `micro`) — bump and rename for clarity
}
```

Then a small find-and-replace pass:

- `fontSize: 9` → `fontSize: 11` (≈ 31 sites)
- `fontSize: 8` → `fontSize: 10` (3 sites)
- `fontSize: 6` → remove or bump to 10 (1 site)

`fontSize: 10` and `fontSize: 11` can stay where they are — they only get problematic if combined with low-contrast colours (e.g. `--color-mgp-ink-3 #8a7d5f` on cream is already ~3.8:1 contrast, borderline). After the bump, re-check.

---

## 3. Information hierarchy — per-screen findings

### 3.1 Home (`/`)

- **Issue:** Three competing primary surfaces stack vertically — PassportCard hero, HomeNavTiles 2×2 grid, "Recent stamps from your circle" feed. None is clearly the primary action.
- **Issue:** PassportCard stat boxes (Courses · Countries · Badges, lines 242–284 in `PassportCard.tsx`) are **non-clickable**. They display 26 px display-font numerals and a 9 px stamp label — they look like CTAs but do nothing. Per S45 backlog, these should link to courses-accordion / countries-accordion / `/badges` respectively.
- **Issue:** Top bar shows "My Golf Passport" full brand text. On `/` this is fine. On every other page it is the M-monogram + the same text — and the text is just navigation back to `/`. Two affordances to one place.

### 3.2 `/profile` (own profile)

- **Issue:** Two paths to `/profile/edit` on a single screen — see §1.4.
- **Issue:** "PASSPORT HOLDER" eyebrow at 9 px is the smallest readable label in the hero. The user name (24 px Cormorant) and stats (26 px) dwarf everything else.
- **Note:** Avatar in top-right links to `/profile`, which is where you already are — soft no-op.

### 3.3 `/profile/[user_id]` (other user's profile)

- **Issue:** Badge wax-seal strip on `PassportCard` is **not** linked here (intentional, per `badgesHref` prop being undefined). But the strip looks visually identical to the own-profile version which *is* linked. Affordance mismatch — appears clickable, isn't.
- **Issue:** "Send message" button + "Friend" action button (`ProfileFriendButton`) sit below the passport with equal visual weight. Unclear which is primary.

### 3.4 `/friends`

- **Issue:** "Leaderboard →" inline link in the title bar at 11 px is the third path to `/leaderboard` (after the FRIENDS tab prefix and the Companions tile on home). Reasonable as a cross-link inside the section, but adds to the redundancy count.
- **Issue:** Three accordions (Your Friends / Find Players / Pending Requests) compete for attention. Pending Requests has a gold-warning border when there are items, which is a good signal — but the section title is the same 11 px as the others. Could promote pending-with-items higher in the section visual weight.

### 3.5 `/leaderboard`

- **Issue:** "⭐ Premium" pill at 10 px with title tooltip — usable on desktop, invisible affordance on touch. Consider explicit pricing-modal trigger.
- **Issue:** Tabbed interface (Friends / Country / Continent / Club / World) — current solo-self empty states (Sprint 6) are good, but the tabs themselves at 11 px on a 4-tab row are tight.

### 3.6 `/map`

- **Issue:** Map height capped at `min(50vh, 420px)` (S45 fix). Good — page is scrollable now.
- **Note:** "Countries visited" accordion below the map is the only persistent CTA — when the map is populated, there is no single primary action.

### 3.7 `/messages`

- **Issue:** Message preview row layout: sender name (14 px), preview (13 px), timestamp (10 px stamp). Read state distinguished only by font-weight (bold = unread). On a fast scan, weight alone is a subtle cue — consider an unread dot.

### 3.8 `/badges`

- **Issue:** "LOCKED" tag on unearned badges is 9 px (line 214). "Earned {date}" is 9 px (line 249). Both should bump to 11 in the typography fix.
- **Note:** Static visuals only — no CTAs. Hierarchy is clean.

### 3.9 `/courses/[id]`

- **Issue:** Two LOG-round CTAs on screen at once when in-page button is visible:
  - Visit-block "+ LOG NEW ROUND" gold button (visible in-page when scrolled to)
  - `CourseStickyLogCta` floating pill at the viewport bottom (`IntersectionObserver` fades when visit-block is visible — S45 added this)
- The IntersectionObserver fix is correct in principle. Verify on real device that the fade actually triggers smoothly.
- **Issue:** "See all reviews ›" at 10 px is subtle. "Stamped in your passport" at 11 px competes with the date stamp at 12 px.

### 3.10 `/log`

- The page chrome itself is clean. Inside, `LogForm.tsx` has its own typography scale with multiple `fontSize: 9` and `fontSize: 10` values for field labels, stamps, and helpers. These get covered by the global typography fix.

### 3.11 `/welcome` (pre-auth landing)

- **Issue:** "SOON" badge at 6 px with 0.7 opacity is essentially invisible. Bump to 10 px or remove.
- **Note:** Otherwise the Adventure styling is clean — sticky 500-lifetime banner, hero, marquee, 7 feature sections, final CTA. This is S46's most polished surface.

### 3.12 `/onboarding`

- **Critical:** Still pre-Adventure. Dark-glass-green style + 11-country dropdown (DB has 100+ countries) + broken Skip button. This is the most important remaining redesign before soft launch. Partner can tackle this directly per S46 close notes.

---

## 4. Quick-reference: what to change and where

| Change                                                                          | File(s)                                          | Lines                       | Effort  |
|---------------------------------------------------------------------------------|--------------------------------------------------|-----------------------------|---------|
| Bump BottomNav tab labels 9 → 11                                                | `src/components/BottomNav.tsx`                   | 142                         | 1 min   |
| Relabel BottomNav "FEED" → "HOME"                                               | `src/components/BottomNav.tsx`                   | 36                          | 1 min   |
| Swap ∞ infinity icon → PeopleIcon for FRIENDS tab                              | `src/components/BottomNav.tsx`                   | 39                          | 5 min   |
| Make PassportCard stat boxes clickable (Courses/Countries/Badges)               | `src/components/PassportCard.tsx`                | 242–284                     | 30 min  |
| Bump 3 occurrences of `fontSize: 8` → 10                                        | `FeedCard.tsx`, `HomeNavTiles.tsx`, `LeaderboardTabs.tsx` | (see §2.2)              | 5 min   |
| Bump 31 occurrences of `fontSize: 9` → 11                                       | Various                                          | (grep `fontSize: 9`)        | 30 min  |
| Remove `fontSize: 6` "SOON" badge                                               | `src/app/welcome/page.tsx`                       | 171                         | 1 min   |
| Drop duplicate "Edit profile & settings" card on `/profile`                     | `src/app/profile/page.tsx`                       | 209–246                     | 2 min   |
| Drop "← Home" text link in top bars (keep M-monogram link)                      | Most secondary pages                             | (see §1.3)                  | 20 min  |
| Decide on HomeNavTiles strategy (cut vs differentiate vs reskin as widgets)     | `src/components/HomeNavTiles.tsx`                | whole file                  | 1–2 hrs |

---

## 5. Recommended Sprint plan (for partner)

### Sprint 47.1 — Readability & quick wins (≈ 1.5 hours)

1. Bottom nav: bump labels to 11 px, "FEED" → "HOME", swap ∞ for PeopleIcon
2. Find-and-replace `fontSize: 8` → 10 (3 sites), `fontSize: 9` → 11 (31 sites), remove `fontSize: 6` (1 site)
3. Update `src/lib/design-tokens.ts` `typography.size` — `eyebrow: 11`, rename `micro` → `microMin: 10`
4. Drop the duplicate "Edit profile & settings" card from `/profile`
5. Drop "← Home" text links across secondary pages (keep M-monogram)

**Outcome:** chrome readable on a 4.7" phone, two pieces of low-hanging redundancy removed. One push, can be live within an hour.

### Sprint 47.2 — Home redundancy (≈ 2 hours)

This needs a small design decision before code. Two options:

**Option A — Cut HomeNavTiles entirely.** The BottomNav already covers /map and /friends. Trophy room and Standings can be reached via the YOU and FRIENDS tabs respectively (current prefix matching). This frees vertical space for the feed and makes the home page about "what's happening with my circle" rather than "where to go next."

**Option B — Reskin HomeNavTiles as *stat widgets*, not nav.** The current tiles show "12 / 149 countries", badge count, friend count — these are *stats*, not navigation. Lean into that: present them as decorative passport stat-cards that happen to be tappable, not as a 2×2 nav grid that visually competes with the BottomNav. Drop the "Atlas" / "Companions" naming — use only the stats. The user reads it as "here is my progress", not "here are my links".

Recommend Option B. It preserves the personal-stat value HomeNavTiles already provides, doesn't waste S43's work, and visually de-emphasises the redundancy.

3. Make PassportCard stat boxes clickable (Courses → courses-accordion, Countries → countries-accordion, Badges → /badges). Already on the backlog — easy companion fix.

**Outcome:** home page feels less menu-heavy. Stats stay glanceable; nav is no longer doubled.

### Sprint 47.3 — Onboarding redesign (≈ 1–2 sessions, larger lift)

Out of audit scope but called out repeatedly across S43/S45/S46 close memos as the **#1 thing left**. Should be tackled after the readability fixes land. The S46 close memo has the full proposal (passport-stamping ceremony, portrait upload, first-stamp tutorial). `OnboardingClient.tsx` is the file.

---

## 6. Things deliberately *not* changing

A few items I considered flagging but decided to leave alone:

- **The BottomNav 5-slot structure itself.** Adding a fifth slot for `/messages` would mean rebuilding the layout (currently 2 + FAB + 2). Not worth disturbing.
- **The Cormorant + Inter + Special Elite font stack.** Adventure tone is locked in. Don't touch.
- **The PassportCard hero shell.** Sprint 5.1 polished this and it landed cleanly. The clickable-stats change is additive, not a redesign.
- **Stamp rotation, perforated edges, brand colours.** These are the soul of the product.

---

## 7. Verification notes

This audit cross-checked the agent's findings against actual code on `main` (2026-05-12). Confirmed live:

- `BottomNav.tsx:142` — `fontSize: 9` on tab labels ✓
- `HomeNavTiles.tsx:175, 217` — `fontSize: 9` subtitle, `fontSize: 8` red-dashed stamp ✓
- `FeedCard.tsx:135` — `fontSize: 8` PLAYED stamp ✓
- `PassportCard.tsx:168, 273` — `fontSize: 9` eyebrow + stats label ✓
- `src/app/profile/page.tsx:178–197` and `:209–246` — two paths to `/profile/edit` on the same page ✓
- `HomeNavTiles.tsx` comment block acknowledges deliberate overlap with BottomNav ✓
- All routes mapped against the live `BottomNav.tsx` `TABS` constant + `ROUTES_WITHOUT_NAV` set ✓

Not verified (audit-agent limitation, partner should sanity-check on real device):

- Actual contrast ratios of `ink-3` colour on `cream` backgrounds at the proposed bumped sizes
- IntersectionObserver fade on `CourseStickyLogCta` (S45 work)
- Solo-self empty-states on a fresh user with zero rounds (S42 work)

---

*Companion document: `docs/SESSION_HISTORY.md` for full project state. Per-finding interactive view: see the Cowork artifact attached to this session.*
