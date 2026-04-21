# ⛳ My Golf Passport — Project Reference
**Thomas Bloch · Updated April 21, 2026 (session 13 — England light-cleanup gennemført)**

## Sådan bruger du denne fil
Denne fil er **aktiv state** — kun det Claude skal bruge for at arbejde lige nu. Historiske sessions og detaljer ligger i `PROJECT_HISTORY.md` (vedhæftes kun når specifikt relevant).

**Procedure hver session:**
1. Start ny chat-tråd
2. Vedhæft denne fil + PROJECT_HISTORY.md hvis du skal tilbage i tiden
3. Skriv: "Dette er mit project reference — session X"
4. Arbejd som normalt
5. Slut-af-session: Claude Code opdaterer dokumenterne direkte på disk via str_replace og pusher til GitHub (indført session 13 efter token-evaluering)

**Format-regel:** Hold denne fil ~200 linjer. Flyt færdige sessioner til PROJECT_HISTORY.md. Gentag ikke information der står flere steder — tematisk sektion vinder over Done-sektion.

---

## Important instruction to Claude
Thomas er ikke udvikler. Han kører Windows, copy-paster til Claude Code i separat vindue, og kan køre SQL i Supabase SQL Editor. Claude Code pusher til GitHub automatisk.

**Kommunikationsregler:**
- Én konkret instruktion ad gangen — **aldrig** stable 2-3 SQL'er eller spørgsmål ovenpå hinanden. Vent på bekræftelse før næste.
- Aldrig bede Thomas åbne terminal eller køre scripts selv — alt går gennem Claude Code
- Afslut altid Claude Code-beskeder med: **"When done, push to GitHub."** (undtagen local-only scripts)
- SQL gives eksakt: "Kør dette i Supabase SQL Editor"
- Claude Code "Yes/No"-prompts → Thomas skriver **1** + Enter
- Gæt aldrig — kør en SQL-query eller spørg

**Destruktive SQL-regler (indført session 13 efter fejl):**
- Før UPDATE country på en bane: check om samme `golfapi_id` findes i destination-landet. Hvis ja → SLET kopien, ikke flyt.
- Før DELETE: check brugerdata-referencer (rounds + bucket_list) for de specifikke ID'er
- Ved destruktive scripts i Claude Code: hardcoded ID-liste, dry-run mode default, backup-JSON først

## Tech stack
- **Framework:** Next.js · **Database:** Supabase (West EU Ireland) · **Styling:** Tailwind CSS
- **Deploy:** Vercel · **GitHub:** github.com/ThomasWBloch/mygolfpassport · **Live:** mygolfpassport.vercel.app
- Git Bash: højreklik projektmappe → "Vis flere indstillinger" → "Git Bash Here" → `claude`

## Language
App er på engelsk (UI, DB, lande). Dansk kun i: email-templates, welcome-beskeder, survey, beta-tester-kommunikation.

---

## Supabase tables (summary)

| Tabel | Nøgle-felter / Noter |
|---|---|
| **profiles** | id, full_name, handicap, home_club, home_country, + normalized-generated-columns (session 10). `home_country` er authoritative for country/continent. |
| **courses** | id, name, club, country, holes, par, website, phone, is_combo, + normalized-generated-columns (session 9). Combo-mekanisme: " + " split matcher 9-huls base, 9-huls combo-parts skjules. |
| **rounds** | id, user_id, course_id, rating, note, played_at |
| **friendships** | user_id, friend_id, status. Mutationer via /api/friendships PATCH. |
| **bucket_list, top100_rankings, conversations, messages, survey_responses, badges, user_badges** | standard. Realtime på messages. |
| **course_affiliations** | DEAD CODE — erstattes af user_clubs (se Parked). |
| **xp_events, profiles.total_xp, profiles.level, badges.xp_reward** | XP-system fjernet fra UI, kolonner findes stadig. |

**Postgres extensions aktive (session 9):** `unaccent`, `pg_trgm` + custom `public.immutable_unaccent(text)` wrapper (nødvendig fordi generated columns kræver IMMUTABLE).

**Course DB status:** ~42,700 baner i 149 lande. ~35,000 synlige (9-huls combo-parts skjult). 99% koordinater.

**UK status efter session 13:** 0 way-off koordinater på 3.564 UK-baner. Fordelt: England 2.671, Scotland 679, Wales 97, Northern Ireland 117.

---

## System user
- Name: My Golf Passport · UUID: `042f06f7-96fa-48b5-89da-a3907fa463b7`
- Skjult fra /leaderboard og /friends Find players. Synlig i /messages (welcome-beskeder).
- ALDRIG hardkodet UUID i kode — brug `SYSTEM_USER_ID` fra `@/lib/constants`.

## Test users
- Thomas Bloch — 5c09ac48-4360-42f3-b257-8ffee76c2674 (Elisefarm, DK)
- Thomas Vennekilde — beta tester (Ishøj Golf Center, DK)
- Casper Hjorth — 0b260cd9-6473-46a7-9356-425b14d7a783 (Furesø golfklub, DK)
- Ole Mørk — 7de540f9-90b2-40d5-b44d-10f21b18b06e (Outrup Golfbane, DK)
- 8 beta testers invited April 14, 2026

## Design tokens
Green `#1a5c38` · Gold `#c9a84c` · White bg `#fff` · Grey bg `#f2f4f0` · Border `#e5e7eb` · Border-radius 14px · Font: -apple-system, SF Pro Display, Segoe UI

## Core libraries (stier)
- `src/lib/constants.ts` — `SYSTEM_USER_ID` mv.
- `src/lib/badges.ts` — `fetchUserData` + `evaluateCriteria` eksporteret til API-routes
- `src/lib/search.ts` — `normalizeSearch(q)` matcher Postgres unaccent. NFD + eksplicitte regler for ø/æ/ß/ð/þ/ł. Bruges i CourseBrowser, ProfileClient, OnboardingClient, FriendsPageClient.

## API routes
- POST /api/welcome · POST /api/friend-request-notify · PATCH /api/friendships
- GET /api/courses/nearby?course_id=X&user_id=Y (5 nærmeste uspillede, Haversine)
- POST /api/rounds/delete — sletter runde + revurderer badges

## Pages oversigt
Home, /courses, /map, /log, /profile (med delete-icons), /profile/[user_id] (uden delete), /profile/courses/[country], /friends (unaccent-søgning), /leaderboard (5 tabs), /clubs/[club] (hero + courses + social accordions). Se PROJECT_HISTORY.md for detaljer.

---

## 📗 Forbunds-baseret cleanup playbook (sammenfatning)

8 trin: (1) Check scraping-regler, (2) Find klub-liste, (3) Scrape+normaliser, (4) Match DB mod forbund, (5) Rename-batches, (6) Slet junk, (7) Import manglende, (8) Fyld adresse/website/telefon.

**Regel:** Klubbens eget website slår forbundet ved uenighed om staveform.

**Alternative kilder når forbundet ikke virker** (session 12): OSM (CC BY-SA), per-klub scraping af egne websites, Wikipedia (CC BY-SA), officiel henvendelse til forbund.

**Forbund per land:** DGU (DK — JS-renderet ✗), SGF (SE ✓), NGF (NO ✓), SGL (FI ✓), GSÍ (IS ✓), NGF Nederland (NL — ikke lovligt ✗), England Golf (EN — JS-renderet + DotGolf ISV-API kræver licens ✗, session 13), Scottish/Wales Golf + Golf Ireland (UK — afventer filosofi-beslutning).

**Light-cleanup metode (session 13):** Når forbunds-metoden ikke kan bruges, kan rent SQL-baseret cleanup opnå gode resultater uden re-import. ~6% af DB-fejl fanges via koordinat-bbox + golfapi_id-duplikat-check + pattern-matching på navne. Egner sig til baner hvor koordinater er way-off, klassifikation er forkert, navne har placeholders, eller junk-rækker mangler sletning.

**Nordic cleanup status:** Komplet for DK/SE/NO/FI/IS. Se PROJECT_HISTORY.md for per-land-detaljer og kendte huller.

**UK status efter session 13:** England light-cleanup gennemført (61 baner fjernet, 15 auto-koordinater, 20+ manuelle koordinater + websites, Haverfordwest tilføjet). Scotland/Wales/NI fik spill-over ændringer. Fuld UK-cleanup venter stadig på forbunds-adgang eller partner-beslutning.

---

## 💼 Business model (sammenfatning)

- Free first 6 months · €19/år premium efter traction · Free limit: 25 loggede baner · Facebook sharing altid gratis
- Exit target: $3-5M inden for 3 år. Mest sandsynlige købere: GolfNow, Golf Genius, Strava.
- **Payment (besluttet session 8):** Kun App Store + Google Play via RevenueCat. Ingen egen Stripe. Aktiveres ved native app lancering.
- **Native transition:** Alle brugerdata bevares, kun UI-lag genopbygges som React Native. API/DB/business rules genbruges 1:1.
- **Subscription schema** (forberedes inden lifetime invitations): `subscription_tier` ('free'/'premium'/'lifetime'), `subscription_source`, `subscription_expires_at` på profiles.

---

## 🔴 Session 14 — start her

**Partner-diskussion stadig på bordet:** Multi-sløjfe-klub-filosofien fra Holland-analysen er ikke blevet besluttet endnu. Læs `MGP_Holland_Produktbeslutning.md` hvis tiden er inde.

**Mulige næste opgaver:**
1. **GolfAPI validitets-stikprøve** (aftalt i session 13 men ikke udført): Tag 20 tilfældige England-baner og verificer mod klubbens website. Afgør om GolfAPI-data er troværdigt nok til at fortsætte.
2. **Wales light-cleanup** — mindre end England (97 baner nu), samme metode
3. **Scotland light-cleanup** — 679 baner, forbund-API måske anderledes tilgængeligt end England Golf
4. **Northern Ireland light-cleanup** — kun 117 baner
5. **Partner-møde om Holland-filosofi** hvis partner er klar
6. **Andre features** (social feed, subscription schema, etc. — se Parked)

**Metode-læringer fra session 13 (vigtige):**
- Destruktive SQL-rutiner: altid tjek golfapi_id-duplikater før UPDATE country
- Photon fuzzy-matcher til "random golfbane i UK" hvis intet ord-match → ikke brug fallback-scripts uden ord-validering
- Claude Code destruktive scripts skal have: hardcoded IDs, dry-run default, backup-JSON
- 20-30 manuelle Google Maps-lookups er rimeligt for "Photon kender dem ikke"-baner
- Når Photon fejler: klubbens eget website er kilden, og ofte afslører det også website + telefon

---

## 🅿️ Parked — andre next sessions

### 🟡 Medium: user_clubs join-tabel (1 session, SQL klar)
Brugere op til 5 klubber (1 primær + 4 sekundære). Ny tabel `user_clubs` med generated normalized-column, trigger der synker `is_primary=true` til `profiles.home_club`. Onboarding urørt. Klub-side erstatter course_affiliations-query. Full SQL skrevet session 10, parkeret af Thomas ("kolde fødder"). Klub-side "Club members"-sektionen venter på dette.

### 🟡 UK fortsættelse (3 sessioner) — BLOKERET af multi-sløjfe-filosofi
Scotland (679) · Wales (97) · Northern Ireland (117). England er lighttet gennem session 13 men har stadig ikke: par-værdier, website for 99%+, klub-verificering mod officielle kilder. Fuld UK-cleanup kræver samme filosofi-valg som Holland.

### 🟡 Andre lande
Tyskland (1,599) via DGV · Holland (501) afventer produktbeslutning · Belgien (194) via KBGF.

### 🟡 Danmark mod DGU — forhindret
DGU JS-renderet. Kræver headless browser eller alternativ kilde.

### 🟡 Cross-country duplikat-oprydning (ny, session 13)
Opdaget under England-cleanup: 500+ potentielle duplikater i USA (Rolling Hills ×12, Hillcrest ×10, osv.) — men de fleste er reelle forskellige klubber. Ægte duplikater identificeres via golfapi_id-match, ikke (club, name, country)-match. Egen session.

### 🟡 Priskilly Forest (NW Wales) koordinat-fejl
Har Photon-fejl-koordinater (ligger i Rutland) men ikke way-off nok til at blive fanget af session 13's bbox-check. Tag i Wales light-cleanup.

### 🟢 Features
- **Social feed** (friends + friends of friends, 1 kort/bruger/dag, golf-emoji-reaktioner, kommentarer uden tråde, notifikationer)
- **Subscription schema** i profiles (før lifetime invitations)
- **Survey follow-up** (læs beta-tester svar, juster prioriteter)
- **Profile photo upload** (Supabase Storage bucket klar, phase 2)
- **Email notifications** (kræver custom SMTP, parkeret til efter beta)
- **Share card** (FB/IG/WA, altid gratis, mockup findes: mygolfpassport_sharecard.html)
- **Fantasy golf integration** (allerede bygget separat, phase 2)
- **Badge graphics** (emoji for nu, phase 2)
- **All courses map view** (Leaflet + clustering, efter social feed)
- **Score entry** (Stableford/slag, valgfrit, privat/delt toggle)
- **Popular clubs** (top-10 klubber som onboarding-opdagelse, efter user_clubs)
- **Avanceret combo-klassificering** (North/South, Red/Blue, A/B/C, Old/New, NZ Takapuna Front/Back 9, Holland 20 combo-klubber)
- **Navne-normalisering på tværs af DB** (session 13 fandt: "18-hole course" som generic name, placeholder-tal som navne, osv. — kræver beslutning om fx Sunningdale-mønster skal eftermøbleres globalt)

### 🧹 Cleanup (tech debt)
- `src/components/ClubMembersAccordion.tsx` — ubrugt, kan slettes
- `course_affiliations`-tabellen — droppes efter user_clubs implementeret

### 🎨 Native app + redesign
- **Native (React Native/Expo):** 4-6 uger, al Supabase-logik genbruges. App Store $99/år + Google Play $25.
- **Redesign via Claude Design:** Workflow noteret session 8 — link repo → Claude Design læser Tailwind config → sprint-baseret handoff. Mockup med premium passport-æstetik findes. Overvej at vente til efter beta-survey.

---

## 📜 Scripts (sammenfatning)

**Import & cleanup:** `reimport-country.mjs`, `reimport-uk.mjs` (obsolet), `geocode-all-missing.mjs`, `backup-courses.mjs`, `split-combo-courses.mjs`
**Forbunds-scrapes:** Sverige (SGF), Norge (NGF), Finland (SGL, fil bevaret: `scripts/finnish-clubs-golffi.json`), Island (GSÍ, fil bevaret: `scripts/reimport-iceland-from-gsi.mjs`)
**UK regeocoding (session 13):** `scripts/regeocode-uk-broken-coords.mjs` (hovedscript, hardcoded IDs, dry-run default), `scripts/regeocode-uk-fallback.mjs` (2 manuelle korrektioner efter dry-run review)
**Verification:** `verify-france-names.mjs`, danske clubs batch-scripts, `verify-danish-club-names.mjs`
**Visualization:** `generate-denmark-map.mjs` → `/public/denmark-golf-map.html`

**GolfAPI.io:** ~0.2 credits tilbage. Search endpoint 0.1/call. **Forbunds-metoden erstatter GolfAPI efter session 7.**

**Backup:** `scripts/courses-backup-2026-04-20.json` (42.700 rækker, 22MB, pre-Island-nuke)

---

## Partner access
- Supabase team collaboration sat op (Developer role)
- Partner Onboarding Guide: `MGP_Partner_Guide_Courses_Database.docx`

---

*Last updated: April 21, 2026 (session 13 — England light-cleanup gennemført). Fremtidige opdateringer sker via Claude Code str_replace direkte på repo-fil, ikke regenerering.*
