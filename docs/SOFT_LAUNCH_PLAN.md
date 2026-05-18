# Soft launch plan — focus group → summer rollout → native app

*Drafted: 2026-05-12 (Session 47)*
*Target focus-group date: ~2026-06-12 (T+1 month)*
*Native app target: TestFlight beta by ~2026-09-15, public submission ~2026-10-01*

---

## Overview — three phases

```
NOW ───────────────► FOCUS GROUP ──────► SUMMER ROLLOUT ───────► NATIVE LAUNCH
2026-05-12           2026-06-12           Jun-Aug 2026             Oct 2026
 │                    │                    │                       │
 │  Phase A           │   Phase B          │      Phase C          │
 │  (4 weeks)         │   (~10 weeks)      │      (parallel)       │
 │                    │                    │                       │
 │  Stabilise +       │  Scale infra +     │     Build RN/Expo     │
 │  redesign          │  iterate on        │     app from same     │
 │  onboarding        │  feedback          │     codebase          │
```

Phase C (native app build) runs in **parallel** with Phase B starting roughly 2026-07-01. The web app continues to be the canonical product through summer; native goes live before season ends.

---

## Phase A — focus group readiness (4 weeks, 2026-05-12 → 2026-06-12)

The goal is a stable, end-to-end product that 6 people can sign up to and use without an operator over the shoulder. This is **not** "feature complete" — it is "no embarrassing breakages on the happy path".

### Week 1 (2026-05-12 → 2026-05-18) — infrastructure + IA cleanup

| Task                                                                | Owner   | Status |
|---------------------------------------------------------------------|---------|--------|
| Buy `mygolfpassport.com` domain on Cloudflare                       | Thomas  | open   |
| Connect domain to Vercel (DNS + SSL)                                | Thomas  | open   |
| Upgrade Vercel to Pro tier ($20/mo)                                 | Thomas  | open   |
| Create Resend account, verify domain (DNS records via Cloudflare)   | Thomas  | open   |
| Plug Resend SMTP into Supabase Auth → SMTP settings                 | Thomas  | open   |
| Update Supabase URL Config: prod redirect → `https://mygolfpassport.com/auth/callback` | Thomas | open |
| Send 2 test sign-ups through full email-confirmation flow            | Both    | open   |
| Drop duplicate "Edit profile" card on `/profile`                    | Partner | open   |
| Drop "← Home" text links from secondary top-bars                    | Partner | open   |
| Bump BottomNav tab labels 9 → 11 px                                 | Partner | open   |
| Relabel "FEED" → "HOME" + swap ∞ for PeopleIcon                     | Partner | open   |
| Make PassportCard stat boxes clickable                              | Partner | open   |

**Acceptance check end of week 1:** sign up from a fresh email, receive confirmation email from `mygolfpassport.com` (not vercel.app), confirm, land on `/onboarding`, complete onboarding, see passport hero. No errors in browser console, no errors in Supabase logs.

### Week 2 (2026-05-19 → 2026-05-25) — onboarding redesign + bug bash

| Task                                                                | Owner   | Status |
|---------------------------------------------------------------------|---------|--------|
| Redesign `/onboarding` (Adventure-styled passport-stamping ceremony) | Partner | open   |
| Expand home_country dropdown from 11 to 100+ countries              | Partner | open   |
| Fix broken Skip button (currently bouncer-loops back to /onboarding) | Partner | open   |
| Add geolocation onboarding step (with permission rationale screen)  | Partner | open   |
| Test friend-add flow end-to-end with 2 test users                    | Thomas  | open   |
| Test course-search + log-round flow on slowest-known network (4G throttle) | Both | open |
| Audit error states: what does the user see when network drops mid-log? | Partner | open |
| Fix `IS ARENAS 2` phantom-row in Cagliari (orphan from S28)          | Cowork  | open   |

**Acceptance check end of week 2:** all 5 focus-group test flows (signup, log, friend, message, map) complete without error on Chrome iOS + Safari iOS.

### Week 3 (2026-05-26 → 2026-06-01) — pre-flight + invitations

| Task                                                                | Owner   | Status |
|---------------------------------------------------------------------|---------|--------|
| Send 6 focus-group invitations (date + venue + 45-min block, buffer to 60) | Thomas  | open   |
| Confirm 6 attendees commit + collect dietary preferences + phone numbers (needed for Task 3 SMS-share test) | Thomas  | open   |
| Confirm pair assignments — ideally one iPhone + one Android per pair | Thomas  | open   |
| Set up Sentry (or Vercel Analytics) for error monitoring             | Cowork  | open   |
| Add basic feature flag for "Focus group mode" (banner + feedback link) | Cowork | open   |
| Create dedicated Supabase row for tracking focus-group sign-ups (`is_focus_group_user` boolean) | Cowork | open |
| Print 6 paper copies of consent form + recording-release             | Thomas  | open   |
| Prepare 6 name tags + welcome card with personal QR-code to `/welcome` | Thomas | open   |
| Charge / test 2 backup recording devices (phone + voice recorder)    | Thomas  | open   |

**Acceptance check end of week 3:** dry-run the full focus-group flow with 1 person who has never seen the app. Time how long sign-up + first-round-log takes. Target: under 3 minutes for both combined (the script's priority-question threshold). Also dry-run Task 3 (share-passport-via-SMS) with that person — sender finds the affordance in under 30 sec; recipient lands somewhere that names the sender. If either fails, that's the first thing to fix in week 4.

### Week 4 (2026-06-02 → 2026-06-08) — final polish + dry run

| Task                                                                | Owner   | Status |
|---------------------------------------------------------------------|---------|--------|
| Final dry-run with 2 test users (same physical location, same WiFi) | Thomas  | open   |
| Capture and triage anything that breaks                              | Both    | open   |
| Freeze deploys 24 hours before session (no surprise regressions)     | Both    | open   |
| Print moderator script (`docs/FOCUS_GROUP_SCRIPT.md`)               | Thomas  | open   |
| Set up venue: 6 chairs + power + WiFi password card                 | Thomas  | open   |
| Order refreshments (light snacks + water, 45-min block — no full coffee setup) | Thomas  | open   |
| Verify share-passport-via-SMS affordance exists in production (or note its absence as a Task 3 finding-in-advance) | Both | open |

**Hard freeze: 2026-06-11 23:00.** No production deploys between then and the session start.

---

## Phase A — what we are NOT doing before the focus group

Important to be explicit about scope cuts:

- **No new theme.** Adventure stays. Theme swap is a Phase B activity.
- **No native app work yet.** Phase C starts after the focus group.
- **No `/legal/privacy` + `/legal/terms` stubs.** App Store blocker, not web blocker — handle in Phase C.
- **No avatar upload UI.** Component is ready, but not user-facing.
- **No payment / pricing surfaces.** "Free in beta" copy is sufficient.
- **No Apple/Google sign-in.** Email + password through Resend is enough for 6 testers.
- **No social aggregation in feed.** Peter-Bugge's-16-rounds-dominates-feed issue is acceptable for 6 testers.
- **No country-badge custom illustrations.** Generic SVG flags are fine.

---

## Phase B — summer wider rollout (2026-06-13 → 2026-08-31)

After the focus group, you will have ~15-25 concrete improvements to make. The infrastructure should be ready to absorb 50-200 users without operator attention.

### Infrastructure scale-up — what changes when

| User count | Action needed | Cost change |
|------------|---------------|-------------|
| 6 (focus group) | Current free Supabase + Resend free tier is fine | $21/mo (Vercel Pro + domain) |
| 50 | Watch Supabase egress (250 MB included free) | Same |
| 100 | Upgrade Resend → Pro ($20/mo). Free tier caps at 3 000 emails/month and 100/day | $41/mo |
| 250 | Upgrade Supabase → Pro ($25/mo). 8 GB DB + 250 GB transfer + daily backups | $66/mo |
| 1 000 | Monitor specific queries. Consider Supabase compute add-on if read latency creeps | $66-100/mo |
| 5 000+ | Phase C native app should be live by here, so traffic distributes | re-evaluate |

### Code-level scaling improvements (do in Phase B)

These are not Phase A blockers but become important when you have many users:

- **Round-aggregation in feed.** Group same-user rounds within a 6-hour window → "Peter added 16 courses". Currently each round is its own card. Becomes essential at 50+ active users.
- **Server-side pagination for `/courses` and `/log` search.** Currently caps at 2 000 rows then client-paginates. Switch to keyset pagination so query time stays flat.
- **Database indexes audit.** Run `EXPLAIN ANALYZE` on the 10 most-frequent queries (feed, leaderboard, course-search by name+country). Add indexes on `(country, club_normalized)`, `(user_id, played_at DESC)`, `(actor_id, created_at DESC)` if missing.
- **Image CDN for avatars.** Once avatar upload goes live, use Supabase Storage → public bucket → Vercel image-optimisation proxy. Don't serve user-uploaded images directly.
- **Rate-limit `/api/courses/nearby`** to prevent geo-spam (1 request per user per 10 seconds).

### Feature work driven by focus-group feedback

This part is intentionally a placeholder — fill in after the session. Likely candidates based on existing backlog:

- New theme exploration (you flagged this — start a parallel sprint after the focus group)
- Onboarding tweaks based on observed pain points
- Round-aggregation in feed
- Per-country course-name cleanup
- Mail "report a course error" mailto flow
- Apple/Google Sign-in (native prep)

### Marketing & invitations during Phase B

- **Open the gates slowly.** Don't push to social media or golf forums until you have observed 20-30 real users sign-up without bugs.
- **Personal invites first.** Friends of focus-group members, your own network. Aim for 30-50 in June.
- **Friend-of-friend in July.** Use the existing friend-request flow as the invitation mechanism (the friend's email gets a "join me on MGP" link).
- **Cold reach in August.** Local club newsletters, golf-club WhatsApp groups. By this point you have ~100 users and a stable product.
- **Press release / wider PR is for after native launch**, not now.

---

## Phase C — native app foundation (parallel start ~2026-07-01)

Recommendation: **React Native + Expo**. Reasoning:

- **One codebase, two platforms** (iOS + Android). You ship to both at once.
- **`src/lib/design-tokens.ts` is already portable** — the file was designed for this exact transition (per `reference_mgp_design_system.md`). Colors, typography, spacing carry over with no edits.
- **Expo manages App Store + Play Store deployment** via EAS Build + EAS Submit. Avoids a lot of Xcode and Android Studio pain.
- **You and I can work together on it the same way we work on the web app.** Same JS/TS, same React mental model, same Supabase client.
- **Expo Router uses file-based routing** that mirrors Next.js's App Router. The conceptual transfer is almost 1:1.

The alternative — fully native Swift + Kotlin — would take 2-3x as long and you would need real iOS and Android engineers. Capacitor wrapping the web app feels hacky and often fails App Store review. PWA is fine as a stop-gap but does not give you App Store presence (the long-term goal you stated).

### Native rollout milestones

```
Jul 01-14 ─ Setup
            ├─ Expo project init in monorepo (mobile/ subdir, share lib/)
            ├─ Port design-tokens.ts → React Native StyleSheet
            ├─ Set up EAS Build (iOS + Android)
            ├─ Test build on a real iPhone + Android device
            └─ Replicate auth flow (Supabase RN SDK)

Jul 15-Aug 15 ─ Core flows
            ├─ /welcome + auth suite
            ├─ /onboarding
            ├─ Home feed + PassportCard
            ├─ /log search + log-round
            ├─ /map (react-native-maps with same Leaflet UX)
            ├─ /profile + accordions
            └─ Bottom tab bar + FAB

Aug 16-Sep 15 ─ Social + polish
            ├─ /friends + friend requests
            ├─ /messages
            ├─ /leaderboard
            ├─ /badges + WaxSealBadge port
            ├─ Apple Sign-in + Google Sign-in
            ├─ Push notifications (Expo Notifications)
            ├─ App icon + splash screen
            ├─ Offline cache for own rounds
            └─ Pull-to-refresh on lists

Sep 16-Oct 01 ─ Submission
            ├─ TestFlight beta (50 testers via focus-group + early summer users)
            ├─ Fix what beta finds
            ├─ /legal/privacy + /legal/terms pages live (App Store blocker)
            ├─ App Store + Play Store submission
            └─ Marketing assets (screenshots, copy, video)

Oct 01+ ── Public on App Store + Play Store
```

### Native-specific decisions deferred to that phase

- Pricing tier enforcement (25-course cap for basic users, friend-feature gating)
- "First 500 lifetime premium" tracking (need user-number counter)
- Push notification topics (friend-request, leaderboard-changes, area-discovery)
- Haptic feedback on log-success + badge-unlock
- Native country-badge illustrations (Welsh dragon, Eiffel, etc.)

---

## Budget breakdown — monthly running cost

| Service          | Now (1-week)         | Focus group         | Phase B (100+ users)  | Native launch        |
|------------------|----------------------|---------------------|------------------------|----------------------|
| Domain (.com)    | $1/mo amortised      | $1/mo               | $1/mo                  | $1/mo                |
| Vercel           | Pro $20/mo           | Pro $20/mo          | Pro $20/mo             | Pro $20/mo           |
| Supabase         | Free                 | Free                | Pro $25/mo             | Pro $25/mo           |
| Resend           | Free (3 000/mo)      | Free                | Pro $20/mo             | Pro $20/mo           |
| Sentry           | Free (5k events/mo)  | Free                | Free                   | Team $26/mo (maybe)  |
| EAS Build (Expo) | —                    | —                   | —                      | $19/mo (Production)  |
| Apple Dev Acct   | —                    | —                   | $99/yr (~$8/mo)        | $8/mo                |
| Google Play Acct | —                    | —                   | $25 one-time           | one-time             |
| **Total**        | **~$21/mo**          | **~$21/mo**         | **~$66/mo**            | **~$120/mo**         |

All in low triple-digits monthly even at full native launch. The early-adopter "first 500 lifetime premium" promo means revenue is delayed until user 501, so this should come out of personal/founder budget for ~6 months.

---

## Risk register

| Risk                                                          | Probability | Impact | Mitigation |
|---------------------------------------------------------------|-------------|--------|------------|
| Resend deliverability bad (mails to spam)                     | Medium      | High   | DKIM + SPF + DMARC during week 1. Test from 3 different email providers before focus group |
| Onboarding redesign not done by week 2 end                    | Medium      | High   | Cut scope to minimum: passport-stamp ceremony + name/club/country/handicap. Skip portrait upload + tutorial for v1 |
| Focus-group venue WiFi fails                                  | Low         | High   | Bring backup mobile hotspot + ensure app works on cellular |
| 1-2 focus-group participants drop out                         | High        | Low    | Recruit 8, expect 6. Anyone extra is bonus data |
| Supabase free tier kicks in mid-summer (250MB egress)         | Medium      | Medium | Monitor weekly. Upgrade preemptively when ≥150 MB used |
| Theme swap derails Phase B momentum                           | Medium      | High   | Time-box theme exploration. Don't replace Adventure unless new design is in production-ready state in <3 weeks |
| Native build hits an unforeseen Supabase RN-SDK limitation    | Low         | High   | Spike a basic auth + log-round flow in first week of Phase C. Find the wall early, not late |
| App Store rejection over `/legal` stubs                       | High        | Medium | Build the pages in week 1 of Phase C, not week 12 |
| Native app icon / splash screen rushed in final week          | High        | Low    | Commission illustrator in August, not late September |

---

## What success looks like

By milestone:

- **Focus group complete (2026-06-12):** in 45 minutes, 6 users complete sign-up + log a first round + share their passport via SMS to their pair partner (viral-loop validation), with <5 critical issues observed. Friend-add happens as a side-effect of the share flow rather than as its own task.
- **End of summer (2026-08-31):** 100+ users, <5% drop-off between signup and first log, an active friend graph with average 3+ connections per user, no production incidents in past 30 days.
- **Native launch (2026-10-01):** App Store + Play Store live, 200+ downloads in first week from existing user base, App Store rating ≥ 4.2.

---

## What I will do vs what you will do vs what your partner will do

Roles for the next 4 weeks:

- **Thomas:** focus group recruitment, venue, refreshments, domain purchase, Vercel/Supabase upgrades, decision-making on theme direction
- **Cowork (this assistant):** Supabase migrations, audit scripts, infrastructure config, documentation, focus-group logging setup
- **Partner (Claude Code on main):** all UI/code changes in `src/`. Onboarding redesign, bug-bash fixes, IA cleanup

Phase C native work I can also lead through Claude Code — same pattern as the web app.

---

*Companion documents: `docs/FOCUS_GROUP_SCRIPT.md` (moderator's guide), `docs/UX_AUDIT_S47.md` (current state audit), `docs/SESSION_HISTORY.md` (full project context).*
