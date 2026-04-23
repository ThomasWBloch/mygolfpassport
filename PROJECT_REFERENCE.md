# ⛳ My Golf Passport — Project Reference
**Thomas Bloch · Updated April 23, 2026 (session 16 — Tyskland batch 1 sletning gennemført)**

## Sådan bruger du denne fil
Denne fil er **aktiv state** — kun det Claude skal bruge for at arbejde lige nu. Historiske sessions og detaljer ligger i `PROJECT_HISTORY.md` (vedhæftes kun når specifikt relevant).

**Procedure hver session:**
1. Start ny chat-tråd
2. Vedhæft denne fil + PROJECT_HISTORY.md hvis du skal tilbage i tiden
3. Skriv: "Dette er mit project reference — session X"
4. Arbejd som normalt
5. Slut-af-session: Claude Code opdaterer dokumenterne direkte på disk via str_replace og pusher til GitHub (indført session 13 efter token-evaluering)

**Format-regel:** Hold denne fil ~200 linjer. Flyt færdige sessioner til PROJECT_HISTORY.md. Gentag ikke information der står flere steder — tematisk sektion vinder over Done-sektion.

**Hotfix-konvention (indført april 23, 2026):** Parallelle hotfixes der ikke passer ind i session-progressionen navngives "Hotfix · <dato>" i PROJECT_HISTORY.md. Session-nummerering forbeholdes planlagte feature/cleanup-sessioner.

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
Home, /courses, /map, /log, /profile (med delete-icons), /profile/[user_id] (uden delete), /profile/courses/[country], /friends (unaccent-søgning), /leaderboard (5 tabs), /clubs/[club] (hero + courses + social accordions), /login (signup+signin toggle, password confirmation på signup, "Forgot password?"-link), /forgot-password (email input, altid success-besked af security-hensyn), /reset-password (ny password + confirm via email-link). Se PROJECT_HISTORY.md for detaljer.

---

## 📗 Forbunds-baseret cleanup playbook (sammenfatning)

8 trin: (1) Check scraping-regler, (2) Find klub-liste, (3) Scrape+normaliser, (4) Match DB mod forbund, (5) Rename-batches, (6) Slet junk, (7) Import manglende, (8) Fyld adresse/website/telefon.

**Regel:** Klubbens eget website slår forbundet ved uenighed om staveform.

**Alternative kilder når forbundet ikke virker** (session 12): OSM (CC BY-SA), per-klub scraping af egne websites, Wikipedia (CC BY-SA), officiel henvendelse til forbund.

**Forbund per land:** DGU (DK — JS-renderet ✗), SGF (SE ✓), NGF (NO ✓), SGL (FI ✓), GSÍ (IS ✓), NGF Nederland (NL — ikke lovligt ✗), England Golf (EN — JS-renderet + DotGolf ISV-API kræver licens ✗, session 13), DGV (DE — JS-renderet centralt, 17 Landesgolfverbände, ikke praktisk ✗ — bruger Thomas' eget ark i stedet, session 15), Scottish/Wales Golf + Golf Ireland (UK — afventer filosofi-beslutning).

**Light-cleanup metode (session 13):** Når forbunds-metoden ikke kan bruges, kan rent SQL-baseret cleanup opnå gode resultater uden re-import. ~6% af DB-fejl fanges via koordinat-bbox + golfapi_id-duplikat-check + pattern-matching på navne. Egner sig til baner hvor koordinater er way-off, klassifikation er forkert, navne har placeholders, eller junk-rækker mangler sletning.

**Nordic cleanup status:** Komplet for DK/SE/NO/FI/IS. Se PROJECT_HISTORY.md for per-land-detaljer og kendte huller.

**UK status efter session 13:** England light-cleanup gennemført (61 baner fjernet, 15 auto-koordinater, 20+ manuelle koordinater + websites, Haverfordwest tilføjet). Scotland/Wales/NI fik spill-over ændringer. Fuld UK-cleanup venter stadig på forbunds-adgang eller partner-beslutning.

---

## 🔄 Multi-sløjfe-filosofi (låst session 15)

Gælder globalt for alle klubber med flere baner/sløjfer.

- **9-huls sløjfer** kombineres frit til alle mulige 18-huls combos: C(N,2) = N×(N-1)/2
  - 3 sløjfer (A, B, C) → 3 combos (A+B, A+C, B+C)
  - 4 sløjfer → 6 combos
  - 5 sløjfer → 10 combos
- **Atomare 18-huls baner** (med eget navn som Championship, Old, Master) er **udelte**. Kan ikke indgå i combos eller splittes.
- **Symmetri-duplikater** (A+B ≠ B+A) og **X+X combos** (A+A) findes ikke — de skal slettes ved oprydning.
- **Klubbens interne hybrid-varianter ignoreres** (fx "Nijmeegse 10-18 + Noord"). Medlemmer må bruge nærmeste legitime combo.
- **En klub** = set of (atomare 18-huls baner) + set of (sløjfer der kombineres).

Eksempler:
- Islands Korpa: 3 sløjfer → 3 combos ✅
- Furesø: 3 sløjfer → 3 combos ✅
- Het Rijk van Nijmegen: 3 sløjfer + 1 atomar 18-huls = 4 synlige baner
- UK Old+New-klubber: 2 atomare 18-huls = 2 separate baner
- WINSTONgolf: 3 atomare 18-huls (WINSTONlinks, WINSTONkranich, WINSTONopen) = 3 separate baner

Outliers (sjældne 4-5-sløjfe-klubber med mærkværdige lokale regler) blokeres individuelt hvis nødvendigt.

---

## 💼 Business model (sammenfatning)

- Free first 6 months · €19/år premium efter traction · Free limit: 25 loggede baner · Facebook sharing altid gratis
- Exit target: $3-5M inden for 3 år. Mest sandsynlige købere: GolfNow, Golf Genius, Strava.
- **Payment (besluttet session 8):** Kun App Store + Google Play via RevenueCat. Ingen egen Stripe. Aktiveres ved native app lancering.
- **Native transition:** Alle brugerdata bevares, kun UI-lag genopbygges som React Native. API/DB/business rules genbruges 1:1.
- **Subscription schema** (forberedes inden lifetime invitations): `subscription_tier` ('free'/'premium'/'lifetime'), `subscription_source`, `subscription_expires_at` på profiles.

---

## 🎯 Session 17 — start her

**Igangværende:** Tyskland full-cleanup. Batch 1 sletning gennemført session 16 (1599 → 1539 rækker). Trin 5 (rename) og trin 7 (import) står tilbage.

**Session 16 resultater:**
- Slettet 60 rækker: 47 junk (disc-golf, simulatorer, placeholders, 21 Swingolf-klubber) + 9 King's Rock (KR-klub fejlklassificeret som Germany, se PROJECT_HISTORY) + 4 specialtegn-duplikater (Förde × 2, Hechingen × 2)
- Prefix-review: 7 ægte / 13 falske af 20
- Produktbeslutninger: Swingolf slettes globalt (ikke rigtig golf). #15 Neusaß = én klub med dobbelt-navn "Golfclub Glashofen-Neusaß / Neusasser Golfclub e.V."
- Ark-autoritativ-reglen nuanceret: klubbens eget website slår arket ved uenighed om staveform

**Næste skridt (prioriteret):**
1. Trin 5 rename-batches (699 rækker: 692 exact + 7 verificerede prefix). Duplikat-check først — undgå UPDATE-kollisioner.
2. Trin 6b residual DB-no-match (~139 legit-kandidater tilbage). Bucket-for-bucket review.
3. Trin 7 import (48 ark-no-match + 13 falske prefix-positiver = 61 ark-klubber der skal tilføjes).
4. Trin 8 fyld metadata (adresse/website/telefon fra ark).

Filerne ligger i `scripts/germany/`:
- `germany-clubs-thomas.json` — master-data (760 klubber)
- `match-report.md` — fuld rapport (session 15)
- `match-result.json` — strukturerede match-data (session 15)

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
- **🔥 Custom SMTP (Resend/Postmark) — high priority før næste invite-bølge** — Supabase default rate limits (3-4/time per address, 30/time totalt) rammer allerede ved normal test. Blokerer invite-bølger og forgot-password i produktion. Resend er simplest (3.000 mails/md gratis, 5-min setup). *Eleveret fra parked til high-priority april 23, 2026 efter rate limit ramt under auth-hotfix testning.*
- **Custom email templates (MGP-branding)** — reset/confirm/invite emails bruger pt. Supabase default. Customizes i Dashboard → Auth → Email Templates. 10-15 min arbejde efter custom SMTP er sat op.
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
- **`ON DELETE CASCADE` på `profiles_id_fkey`** — Manglende cascade betyder bruger-sletning kræver to DELETEs (profiles først, så auth.users). Simpel migration. Opdaget under auth-hotfix april 23, 2026.

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
