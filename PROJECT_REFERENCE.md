# ⛳ My Golf Passport — Project Reference
**Thomas Bloch · Updated April 16, 2026 (session 5)**

## Important instruction to Claude
Read this file carefully before doing anything else. Thomas is not a developer. He runs on a **Windows PC**. He copy-pastes messages to Claude Code (running in a separate window) and can run SQL in the Supabase SQL Editor.

**Critical communication rules:**
- Give **one concrete instruction at a time**
- Never ask him to open a terminal or run scripts himself — everything goes through Claude Code
- **Always end Claude Code messages with: When done, push to GitHub.** — except for scripts that only run locally and don't need to be in the repo
- When SQL needs to be run, provide the exact SQL and say "Kør dette i Supabase SQL Editor"
- When Claude Code asks for approval (Yes/No), tell Thomas to type **1** and press Enter
- Be very concrete and clear — one thing at a time
- Update PROJECT_REFERENCE.md at the end of each session and push to GitHub

## Who I am
I am not a developer. I run on a **Windows PC**. I copy-paste messages to Claude Code and can run SQL in the Supabase SQL Editor. Claude Code pushes to GitHub automatically.

## Language
The app is in English — all UI text, database content, and country names are in English. Danish only in: email templates, welcome messages, survey, and user-facing communication directed at Danish beta testers.

## Tech stack
- **Framework:** Next.js
- **Database:** Supabase (West EU Ireland)
- **Styling:** Tailwind CSS
- **Deploy:** Vercel
- **GitHub:** github.com/ThomasWBloch/mygolfpassport
- **Live:** mygolfpassport.vercel.app

## Workflow
- Send message to Claude Code → it writes code and pushes to GitHub → Vercel deploys automatically
- SQL changes are run manually in Supabase SQL Editor
- Scripts are run via Claude Code with e.g. node --env-file=.env.local scripts/name.mjs
- Always end Claude Code messages with "When done, push to GitHub" — unless it's a local-only script

## Supabase tables

### profiles
id, full_name, handicap, home_club, home_country, avatar_url, allow_round_requests_friends, allow_round_requests_strangers, show_in_search, show_course_count, total_xp, level

### courses
id, name, club, country, flag, address, latitude, longitude, holes, par, website, phone, founded_year, is_major, golfapi_id
- One club can have multiple courses (e.g. Himmerland Old + Himmerland New)
- All country names are in English

### rounds
id, user_id, course_id, rating, note, played_at

### top100_rankings
id, course_id, year, rank, list_name

### friendships
id, user_id, friend_id, status (pending/accepted/declined), created_at
- All friendship mutations go through /api/friendships PATCH route server-side

### course_affiliations
id, user_id, course_id, created_at

### bucket_list
id, user_id, course_id, created_at

### conversations
id, participant_1 (user_id), participant_2 (user_id), created_at

### messages
id, conversation_id, sender_id, content, created_at, read_at
- Supabase Realtime enabled

### survey_responses
id, user_id, created_at, design_rating, navigation_rating, mobile_works, tried_features (text[]), favorite_feature, missing_feature, connected_others (boolean), find_friends_rating, sent_message (boolean), messaging_missing, found_courses, missing_courses, would_pay, max_price, best_thing, improvements, other_comments

### badges
id, key, name, emoji, description, tier, criteria_type, criteria_value, xp_reward, image_url, created_at
- 26 badges seeded

### user_badges
id, user_id, badge_id, earned_at

### xp_events
id, user_id, xp_amount, reason, created_at

## Course database — session 5 status
**Total courses: ~29,708 across 19 countries**
**Coordinate coverage: 99.5% (~29,561 with coordinates)**

### Country breakdown
USA 19,117 · England 2,638 · Germany 1,599 · France 914 · Sweden 712 · Spain 631 · Scotland 629 · Netherlands 501 · Italy 484 · Ireland 439 · Denmark 412 · Finland 314 · Austria 298 · Wales 212 · Belgium 194 · Switzerland 176 · Norway 168 · Portugal 168 · Northern Ireland 102

### Data sources
- GolfAPI.io (search endpoint only — 0.1 credit per page, 200 clubs per page)
- Photon geocoding (free, keyless, OpenStreetMap-based)
- Nominatim as fallback

### GolfAPI.io key facts
- Trial expires: April 29, 2026 — cancel before then if not continuing
- Credits remaining: ~3.5
- Recommended: wait for new 50 credits before importing more countries
- Search endpoint: 0.1 credit per page — ONLY use this
- Detail endpoints: 1.0 credit each — DO NOT USE
- Subscription portal: https://billing.stripe.com/p/login/4gwbKd61XfsIfOo3cc

### UK data notes
GolfAPI does not separate UK countries — all UK courses returned under England. Fixed by:
1. Coordinate bounding boxes (Scotland/Wales/Northern Ireland)
2. City name matching (St Andrews, Cardiff etc.)
3. Photon geocoding on remaining unclassified courses

### Countries still to import (waiting for credits)
Canada 🇨🇦, Australia 🇦🇺, New Zealand 🇳🇿, Japan 🇯🇵, South Africa 🇿🇦, rest of world

## API routes
- POST /api/welcome
- POST /api/friend-request-notify
- PATCH /api/friendships
- GET /api/courses/nearby?course_id=X&user_id=Y (returns 5 nearest unplayed courses, Haversine)

## Badge system
### XP rewards
- New course: +100 XP · New country: +500 XP
- Badge Common: +200 · Uncommon: +400 · Rare: +800 · Legendary: +1500
- Level = Math.floor(total_xp / 500) + 1

### Level titles
1-2: Beginner · 3-5: Explorer · 6-10: Adventurer · 11-20: Gold Explorer · 21+: Platinum

## Pages that work
- Home (/) — passport card, quick actions, map teaser, badges, friends feed
- /courses — searchable course list with country filter
- /map — world map with played courses
- /log — log a new course
- /profile — own profile with accordions (Courses, Countries, Badges)
- /profile/[user_id] — public profile
- /friends — friends list, find players, requests
- /leaderboard — Friends/Country/Continent/World/Club tabs

## Shared components
- src/components/PassportCard.tsx
- src/components/ProfileAccordions.tsx (Courses, Countries expandable, Badges)

## Performance optimizations
Parallel Supabase queries (Promise.all) on 6 pages: Home, Profile, Public profile, Friends, Messages, Course detail

## System user
- Name: My Golf Passport
- UUID: 042f06f7-96fa-48b5-89da-a3907fa463b7

## Test users
- Thomas Bloch — thomas_bloch@hotmail.com — 5c09ac48-4360-42f3-b257-8ffee76c2674
- Thomas Vennekilde — beta tester, active
- My Golf Passport (system) — 042f06f7-96fa-48b5-89da-a3907fa463b7
- 8 beta testers invited — April 14, 2026

## Design tokens
- Green: #1a5c38 · Gold: #c9a84c · White bg: #fff · Grey bg: #f2f4f0
- Border: #e5e7eb · Border-radius: 14px
- Font: -apple-system, SF Pro Display, Segoe UI

## Business model
- Free first 6 months — focus on user growth
- €19/year premium after traction
- Free limit: 25 logged courses
- Facebook sharing always free
- Exit target: $3-5M within 3 years
- Most likely buyers: GolfNow, Golf Genius, Strava

## Parked — next sessions

### Map popup (course list per country)
- Max 5 courses shown + "See all X →"
- Click opens slide-up panel with full list
- Sorted alphabetically
- Search field in panel

### Leaderboard improvements
- Show "Add friend" button for users you don't follow
- Hide button for system user (My Golf Passport)

### All courses map view
- Leaflet with clustering (groups nearby courses into numbered icons)
- Build after coordinate import is complete

### Social feed
- Friends + friends of friends
- One card per user per day (bulk logging = one grouped card)
- Card shows: name + home club + course name + star rating
- Reactions: 2-3 golf-themed (👍 🏌️ 🔥) + comment option
- Comments: simple, no threading
- Notifications: reaction on your post, comment on your post, friend logs course you've played
- Sharing: automatic when logging, private toggle available
- Bulk import on first login: shown as one grouped card

### Club view
- Group courses under parent club
- Select which 9-hole combination was played (e.g. Himmerland Blå+Rød)

### Score entry
- Stableford points and/or stroke count
- Optional — not required when logging
- Private/shared toggle
- If shared: shown in feed

### Global course import (waiting for new API credits)
- Canada, Australia, New Zealand, Japan, South Africa + rest of world
- Same approach: GolfAPI search endpoint + Photon geocoding

### Survey follow-up
- Read beta tester responses and adjust priorities

### Profile photo / avatar upload
- Supabase Storage bucket avatars ready — phase 2

### Email notifications
- Requires custom SMTP — parked until after beta

### Share card
- Facebook/Instagram/WhatsApp share card
- Always free for all users
- Should use real user data

### Fantasy golf integration
- Already built separately — phase 2

### Badge graphics
- Phase 2 — emoji for now

---
*Last updated: April 16, 2026 (session 5) — Session focus: GolfAPI European + USA import, UK deduplication and country reassignment, Photon geocoding (99.5% coverage), All Courses page fixes. Next session: social feed, map improvements, or continue global course import.*
