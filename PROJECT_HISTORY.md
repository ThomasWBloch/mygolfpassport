# ⛳ My Golf Passport — Project History
**Historisk arkiv · Sidst opdateret April 21, 2026**

Denne fil indeholder alt historisk indhold fra tidligere sessioner, nordisk cleanup-dokumentation, og detaljerede beskrivelser af funktioner der er bygget og gennemført. Vedhæft kun når du har brug for at gå tilbage i tiden. Den aktive state ligger i `PROJECT_REFERENCE.md`.

---

## 🗂 Indhold

1. [Detaljerede Supabase-tabeller (alle felter)](#detaljerede-supabase-tabeller)
2. [Pages-detaljer](#pages-detaljer)
3. [Shared components](#shared-components)
4. [Performance optimizations](#performance-optimizations)
5. [Badge system (detaljer)](#badge-system-detaljer)
6. [Nordic data cleanup — fuld dokumentation](#nordic-data-cleanup--fuld-dokumentation)
7. [Forbunds-baseret cleanup playbook (fuld version)](#forbunds-baseret-cleanup-playbook-fuld-version)
8. [Island cleanup — session 11 (fuld dokumentation)](#island-cleanup--session-11-fuld-dokumentation)
9. [Session 12 — Holland research (fuld dokumentation)](#session-12--holland-research-fuld-dokumentation)
10. [Session 13 — England light-cleanup (fuld dokumentation)](#session-13--england-light-cleanup-fuld-dokumentation)
11. [Data cleanup — kendte huller per land](#data-cleanup--kendte-huller-per-land)
12. [Business model (fuld dokumentation)](#business-model-fuld-dokumentation)
13. [Scripts (fuld dokumentation)](#scripts-fuld-dokumentation)
14. [Done — per session](#done--per-session)

---

## Detaljerede Supabase-tabeller

### profiles
id, full_name, handicap, home_club, home_country, avatar_url, allow_round_requests_friends, allow_round_requests_strangers, show_in_search, show_course_count, total_xp, level, **full_name_normalized**, **home_club_normalized**
- Note: total_xp og level kolonner findes i DB men bruges ikke længere i UI (XP-systemet fjernet session 6)
- home_country er authoritative for country/continent computation (fix fra session 8 — var tidligere derived from home_club string-match)
- **full_name_normalized / home_club_normalized** (added session 10): generated columns = `lower(immutable_unaccent(full_name/home_club))`. GIN trigram-indexes på begge. Bruges af friend-søgning så tyskere kan søge "Furesø golfklub" som "Fureso golfklub".
- **Vigtig observation (session 10):** `home_club` er fritekst uden normalisering. Test-brugere viser inkonsistens: "Elisefarm" (kort), "Furesø golfklub" (lille g), "Ishøj Golf Center" (fuldt), "Outrup Golfbane" (bane-navn ikke klub). Brugere oprettet FØR danske data-cleanup (session 6) kan have gamle/forkerte klubnavne der ikke længere findes i courses-tabellen.

### courses
id, name, club, country, flag, address, latitude, longitude, holes, par, website, phone, founded_year, is_major, golfapi_id, is_combo, **name_normalized**, **club_normalized**
- One club can have multiple courses (e.g. Himmerland Old + Himmerland New)
- is_combo = true for combination courses (e.g. "Parkvej + Hestkøb") — visible in UI with smart combinations
- 9-hole courses that are part of combos are hidden from UI, standalone 9-hole courses remain visible
- All country names are in English
- **name_normalized / club_normalized** (added session 9): generated columns = `lower(unaccent(name/club))`. GIN trigram-indexes på begge. Bruges af alle courses-søgninger så brugere kan søge uden diakritiske tegn ("Horsholm" → "Hørsholm", "Goteborg" → "Göteborg")
- **Postgres extensions aktiveret (session 9):** `unaccent`, `pg_trgm`
- **Custom function:** `public.immutable_unaccent(text)` — IMMUTABLE wrapper om unaccent (nødvendig fordi generated columns kræver IMMUTABLE, og built-in unaccent er kun STABLE)

### rounds
id, user_id, course_id, rating, note, played_at

### top100_rankings
id, course_id, year, rank, list_name

### friendships
id, user_id, friend_id, status (pending/accepted/declined), created_at
- All friendship mutations go through /api/friendships PATCH route server-side

### course_affiliations
id, user_id, course_id, created_at
- **Status (session 10):** Tabellen er reelt dead code — der er intet UI hvor brugere tilføjer sig selv. Klub-side "Club members"-sektion læser herfra men viser altid 0 fordi tabellen er tom. Skal erstattes af user_clubs-tabellen (parked).

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
- xp_reward column exists but is no longer used (XP system removed)

### user_badges
id, user_id, badge_id, earned_at
- Badges are re-evaluated automatically when a round is deleted (session 8 addition)

### xp_events
id, user_id, xp_amount, reason, created_at
- Table exists but is no longer written to (XP system removed)

---

## Pages-detaljer

- **Home (/)** — passport card, quick actions, map teaser, badges, friends feed
- **/courses** — searchable course list med country filter (149 lande), grupperet by klub, kombo-logik implementeret
- **/map** — world map with played courses, popup viser top 5 baner per land med klub·bane og rating
- **/log** — log a new course (bruger CourseBrowser mode="log", samme visning som /courses)
- **/profile** — own profile with accordions (Courses, Countries, Badges). 🗑 delete icon per round (session 8)
- **/profile/[user_id]** — public profile (no delete icons — isOwnProfile defaults to false)
- **/profile/courses/[country]** — alle baner bruger har spillet i et land, med rating og noter, sorteret bedste først
- **/friends** — friends list, find players (excludes system user from search), requests. Unaccent-søgning (session 10)
- **/leaderboard** — Friends/Country/Continent/World/Club tabs. Add friend-knap på alle non-Friends tabs. System user skjult.
- **/clubs/[club]** — klub-detalje-side. Viser hero-card, courses-liste, og 3 social accordions (Club members, Golfers who've played, Friends who've played). Club members-sektionen er reelt tom fordi course_affiliations-tabellen ikke populeres af noget UI — skal erstattes af user_clubs-logik.

---

## Shared components

- `src/components/PassportCard.tsx` — ingen XP/level længere
- `src/components/CourseBrowser.tsx` — mode="browse" (default) eller mode="log". Implementerer kombo-logik filtering
- `src/components/LogForm.tsx` — bruger CourseBrowser mode="log"
- `src/components/ProfileAccordions.tsx` (Courses, Countries expandable, Badges) — isOwnProfile prop (session 8) styrer synlighed af 🗑 delete-ikoner
- `src/components/CourseEntry.tsx` — har roundId + isOwnProfile prop (session 8)
- `src/components/FriendsPageClient.tsx` — friend-søgning, venneliste, pending requests. Unaccent (session 10)
- `src/components/GolfersListAccordion.tsx` — genbrugelig accordion til klub-siden
- `src/components/ClubMembersAccordion.tsx` — ældre ubrugt komponent (kan slettes i cleanup-session)

---

## Performance optimizations

Parallel Supabase queries (Promise.all) på 6 sider: Home, Profile, Public profile, Friends, Messages, Course detail.

---

## Badge system (detaljer)

- 26 badges seeded
- Badges optjenes ved antal baner, lande, specifikke destinationer osv.
- XP-systemet er fjernet fra UI — badges står alene
- Level-titler (Gold Explorer, Platinum osv.) er fjernet — kan evt. genindføres baseret på antal baner på et senere tidspunkt
- **Automatisk badge-revurdering ved sletning af runder** (session 8): fetchUserData + evaluateCriteria i src/lib/badges.ts genbruges af delete-route. Hvis criteria ikke længere er opfyldt, fjernes badgen fra user_badges.

---

## Nordic data cleanup — fuld dokumentation

**Metode-gennembrud session 7:** Brug af nationale golfforbund som primær kilde i stedet for GolfAPI/per-klub webscraping. 0 credits brugt, højere datakvalitet, ensartet struktur.

### Status per nordisk land

| Land | Forbund | Courses | Klubber | Adresse | Website | Koord | Batches |
|---|---|---|---|---|---|---|---|
| 🇩🇰 Danmark | DGU | 343 | - | 100% | - | 100% verificeret | (session 6) |
| 🇳🇴 Norge | NGF (golfforbundet.no) | 166 | 137 | 166 (100%) | 156 (94%) | 166 (100%) | 3 |
| 🇸🇪 Sverige | SGF (golf.se) | 707 | 437 | 706 (~100%) | 601 (85%) | 707 (100%) | 9 |
| 🇫🇮 Finland | SGL (golf.fi) | 285 | 157 | 282 (99%) | 257 (90%) | 284 (100%) | 4 |
| 🇮🇸 Island | GSÍ (rastimar.golf.is) | 66 | 55 | 63 (95%) | 56 (85%) | 66 (100%) | (session 11, nuke+reimport) |

Website coverage i Sverige/Finland er lavere fordi ikke alle klubber er forbundsmedlemmer (små P&P-baner, private klubber, Holiday Club-resorts).

### Finland verification — session 8
Sammenlignet DB mod SGL (134 klubber hos forbundet vs 157 i DB):
- **98.5% dækning** (132 af 134 SGL-klubber findes hos os)
- **2 SGL-only klubber** — begge korrekt fravalgt i batch 4:
  - Aavasaksa Golf: har ingen finsk bane (spiller i svensk Tureholm)
  - Pitkäjärvi Golf Club: indendørs træningshal + disc-golf, ikke udendørs bane
- **25 DB-only klubber:** små non-SGL klubber (Holiday Club resorts, P&P, private). Forventet og korrekt.
- **Konklusion:** Trin 7 i playbook'en blev udført korrekt for Finland. Ingen action kræves.

### Vigtige ændringer per land (session 7)

**Norge (ny):**
- ~55 navne-renames (3 batcher)
- 3 slettet (Modum lukket + 2 duplikater: Sola/Solastranden, Ålesund/Solnør Gaard)
- 3 koord-fejl rettet (Karasjok fra Polen, re Golf fra Chile, Vanylven fra nordlige Norge)
- Hemsedal adresse rettet (scrape havde forkert admin-adresse)

**Finland (ny):**
- 44 klub-renames
- 29 sletninger (20 disc-golf/frisbee-golf/simulator-rækker + 2 SGL-klubber uden finsk bane)
- 4 merges
- SGL's embedded JSON på /pelaajalle/kenttaopas/ gav komplet data på én URL

**Sverige (session 6-7):**
- ~150 renames (Swedish form, diakritiske tegn, afkortninger udvidet)
- Rebrands: Stannum Golf, SAIK Golfklubb, Hinton Golf Club, Flädje Golf, Holma Stångenäs m.fl.
- Konsolideringer: Hinton Golf Club (Kvarnby/Rönnebäck/Sofiedal under én klub), Husby/HaningeStrand merge
- Slettet: Sturup Park (lukket 2014)

**Danmark (session 6):**
- Komplet cleanup gennemført
- 343 baner, duplikater fjernet, navne og koordinater verificeret
- NB: Danmark blev cleaned FØR forbunds-metoden — kan evt. genbehandles med DGU som kilde
- **DGU-tilgængelighed:** DGU's klubliste er i JavaScript og kan ikke scrape'es med standard metoder. Evt. alternativ kilde kræves hvis Danmark skal verificeres samme vej som NO/FI.

### Vigtig regel — klubbens eget website slår forbundet

Når forbundet og klubbens eget website er uenige om staveform, **vinder klubbens eget website altid**. Eksempel: SGF siger "Värnamo Golfklubb", men varnamogolf.se bruger "Värnamo Golf" i header/footer/breadcrumb → vi bruger "Värnamo Golf".

---

## Forbunds-baseret cleanup playbook (fuld version)

Denne metode kan gentages for alle lande hvor der findes et nationalt forbund med offentlig klub-liste online.

### De 8 trin

1. **Check scraping-regler først** — Hent robots.txt på forbundets domæne. Tjek ToS. De tre nordiske forbund tillader alle scraping af offentlige klub-lister. **Vigtigt (session 12):** Ikke alle forbund tillader det. NGF Nederland (golf.nl) har eksplicit restriktiv copyright-tekst + hollandsk databaserets-beskyttelse = ikke lovligt.
2. **Find klub-listen** — Typiske URL-mønstre: /kentat, /klubbar, /seurat, /banguide, /kenttaopas. Kig efter embedded JSON (Finland), server-rendered tabel (Norge/Sverige), eller WP-sitemap-entries. Pas på JavaScript-renderede lister (som DGU og golf.nl) — kræver headless browser eller alternativ kilde.
3. **Scrape + normaliser** — Ét script dumper til `<country>-clubs-<forbund>.json` med navn, adresse, by, postnummer, website, telefon, email og koordinater. Én kørsel; ingen API-credits.
4. **Match DB mod forbund** — Klassificer hver DB-klub som Exact match / Normalized match / Koordinat-match / DB-only / Forbund-only.
5. **Rename-batches** — Markdown-batch-fil per gruppe (typisk 30-50 klubber). Høj/medium/lav confidence. Rename-scripts efter user-approval.
6. **Slet non-golf / junk** — Disc-golf, frisbee-golf, ice-golf, snow-golf, simulator-rækker. Placeholder-rækker ("Pete", "omn", tomme adresser).
7. **Import manglende klubber** — Kun klubber med reel udendørs bane. Sæt ry, AS, Oy osv. udenfor klubnavn — juridisk entity-form, ikke brand.
8. **Fyld adresse + website + telefon** — Fra forbundets JSON. Conservative policy: overskriv ikke eksisterende adresser, overskriv website når DB er tom.

### Principper
- GolfAPI-credits er total-budget, ikke per-call — 0.1 credit max = 0.1 credit ialt. For forbund-baseret cleanup bruges GolfAPI aldrig.
- Check scripts/ før nye scripts — `reimport-country.mjs` håndterer både fresh imports og reimports.
- Rigtig forbund per land: DGU (DK — JS-renderet, vanskelig), SGF (SE), NGF (NO), SGL (FI), GSÍ (IS — via rastimar.golf.is, research done session 10), England Golf (EN), Scottish Golf (SC), Wales Golf (WA), Golf Ireland (IE), NGF Nederland (NL — ikke scrape-lovligt, se session 12).

### Alternative kilder når forbundet ikke virker (session 12)
Når forbundet er JS-renderet OG restriktivt (som NGF Nederland):
- ❌ Scraping af forbundets site — copyright/databaseret-krænkelse
- ❌ Kommercielle partnere (leadingcourses.com osv.) — copyright
- ✅ OpenStreetMap (CC BY-SA) — offentlig master-liste for klubber med koordinater
- ✅ Per-klub scraping af klubbernes egne websites — offentlige marketing-sider
- ✅ Officiel henvendelse til forbundet med brev — kan tage uger, men kan give grønt lys
- ✅ Wikipedia (CC BY-SA) — fakta om NGF-klubliste kan genbruges, men kan være forældet

### Preflight-check (altid før nuke+reimport)
```sql
SELECT 'rounds', COUNT(*) FROM rounds r JOIN courses c ON c.id = r.course_id WHERE c.country = 'X'
UNION ALL SELECT 'bucket_list', COUNT(*) FROM bucket_list b JOIN courses c ON c.id = b.course_id WHERE c.country = 'X'
UNION ALL SELECT 'top100_rankings', COUNT(*) FROM top100_rankings t JOIN courses c ON c.id = t.course_id WHERE c.country = 'X'
UNION ALL SELECT 'course_affiliations', COUNT(*) FROM course_affiliations ca JOIN courses c ON c.id = ca.course_id WHERE c.country = 'X';
```
- Alle nuller → nuke+reimport er sikker
- Enkelte rækker (< 5 fra test-data) → case-by-case
- Mange → fald tilbage til selektiv batch-cleanup

---

## Island cleanup — session 11 (fuld dokumentation)

**Nuke+reimport gennemført.** DB reduceret fra 114 rodede rækker til 66 rene baner (63 GSÍ-baner + 3 Korpa-combos). Alt forbundsverificeret.

### Resultat
- **Før:** 114 courses med ~65 junk/duplikater, koordinater i Toronto/Wales/Sverige, klub/bane-swaps, placeholder-navne ("18-hole course", "gsf", "SVG", "9")
- **Efter:** 66 courses, 100% koordinater, 85% websites, 95% telefon/adresse, 0 duplikater, 0 junk
- **Metode:** Nuke+reimport fra GSÍ (ikke selektiv batch-cleanup) — valgt efter preflight SQL-check viste 0 brugerdata-referencer

### Kilde
- rastimar.golf.is — GSÍ's officielle bane-site
- Remix-baseret: `window.__remixContext` pre-hydreret payload hentet med kun 2 requests (ingen per-klub-loop nødvendig)
- 58 klubber, 63 baner i /vellir (5 flere end nested i /klubbar — fangede både separate og affiliate-baner)

### Combo-struktur
- **GR's Korpa:** 3 × 9-huls sløjfer (Áin, Landið, Sjórinn) **skjulte via combo-mekanisme**
- **Genererede combos:** Korpa - Áin + Korpa - Landið (×3 varianter)
- Andre klubber med kun 1 × 9-huls sløjfe (GKG Mýrin, Oddur Ljúflingur, Keilir Sveinskotsvöllur, Mosfellsbæjar Bakkakot, Thorsvöllur) → ingen combos, 9-huls forbliver synlige

**Combo-navngivning (vigtig design-beslutning):** Combo-mekanismen fra DK Parkvej+Hestkøb er navne-baseret — den splitter combo-navn på ` + ` og matcher hver halvdel mod et eksakt 9-huls bane-navn. Derfor bruges dobbelt-prefix: `"Korpa - Áin + Korpa - Landið"` (ikke `"Korpa - Áin + Landið"` som ville efterlade 2 af 3 sløjfer synlige).

**Par-værdi for combos:** GSÍ leverer 9-huls par som "par ved 2× spil" (dvs. Thorsvöllur 9h par 66 = 2×33 per sløjfe). Combo-par blev derfor manuelt sat til 72 (standard islandsk 18-huls par) via SQL-UPDATE, ikke summen af de to sløjfers GSÍ-par.

### Files bevaret
- `scripts/iceland-clubs-gsi.json` (58 klubber)
- `scripts/iceland-courses-gsi.json` (63 baner)
- `scripts/iceland-match-report.md` (præ-nuke klassifikations-rapport)
- `scripts/reimport-iceland-from-gsi.mjs` (destructive — genkørsel sletter Island)
- `scripts/courses-backup-2026-04-20.json` (42.700 rækker pre-nuke, 22MB)

### Åben problemstilling (ikke blokerende)
9-huls par-værdier for Korpa-sløjferne + Thorsvöllur m.fl. er "par ved 2× spil" fra GSÍ — misvisende. Reel 9-huls par for Korpa Áin er 36, ikke 72. Ikke rettet endnu da samme mønster muligvis findes i andre 9-huls baner i DB. Skal undersøges bredere før rettelse.

---

## Session 12 — Holland research (fuld dokumentation)

**Status:** Research gennemført, cleanup IKKE påbegyndt. Afventer produktbeslutning om multi-sløjfe-klubber.

### Hvad vi fandt

**DB-tilstand:**
- 501 rækker, 258 unikke klubber (NGF har 269 officielt)
- 0 websites, 0 telefoner, **par = NULL for alle 501 rækker**
- 174 combo-rækker fordelt på 20 klubber = massivt opblæst
- 100% koordinater, 99% adresser
- Preflight SQL: **0 brugerdata-referencer** (rounds/bucket_list/top100/course_affiliations alle 0)

**Kilde-problem (juridisk):**
- NGF/golf.nl har eksplicit restriktiv copyright + hollandsk databaserets-beskyttelse = **ikke scrape-lovligt**
- Leadingcourses.com (kommerciel NGF-partner) — samme problem
- DGU-lignende situation: klublisten er JS-renderet, kan ikke scrape'es uden headless browser

**Data-kaos i DB:**
- Dobbelt combo-formater (`Blue-Red` OG `Red + Blue`)
- Symmetri-duplikater (`Red+White` OG `White+Red`)
- Samme-sløjfe-2x nonsens (`Red+Red`, `Yellow+Yellow`)
- Hybrid-navne (`NB10-18 & zuid`, `oost & NB1-9`)
- Manglende 9-huls base-rækker for nogle klubber
- Combo-mekanismen skjuler det værste på UI-niveau, så det ser bedre ud i appen end i DB

**Det reelle produktproblem (opdaget via Het Rijk van Nijmegens eget website):**

Klubben selv anerkender **13 "baner"** til handicap-formål:
- 3 × 9-huls Groesbeekse sløjfer (Noord, Oost, Zuid)
- 1 × 18-huls separat (Nijmeegse Baan)
- 3 × 18-huls Groesbeekse combos
- **6 × hybrid combos** der blander Nijmeegse 1-9 eller 10-18 med Groesbeekse-sløjfer

Disse 6 hybrid-combos er ikke junk. De er legitime klub-baner fordi handicap-systemet regner forskellig course rating/slope for hver kombination. Men de forvirrer ikke-medlemmer fuldstændig og udfordrer MGP's passport-filosofi.

### Dette er en produktbeslutning — ikke en data-opgave

Samme problem findes i (mindst):
- Islands Korpa (3 × 9-huls sløjfer — simpel model valgt session 11)
- Furesø (DK)
- Barsebäck (SE — Master + Donald Ross)
- UK 36-huls klubber (Old + New, 3607 baner venter)
- Tyskland (1599 baner venter)

**Filosofi-valg på bordet (låser mønstret for ALLE fremtidige lande):**

| | Beskrivelse |
|---|---|
| **A. Simplicitet** | Kun basis-baner (3 × 9-huls skjult + 3 × 18-huls combos + separate 18-huls). Ikke-medlemmer er glade, klubmedlemmer må "logge tæt nok på". |
| **B. Medlems-perfektion** | Alle 10-13 varianter synlige. Præcist, men rodet. Passport bliver meningsløs hvis én klub tæller som 10 baner. |
| **C. Hierarkisk** | Simpelhed som default + "flere varianter"-fold-ud-knap til nørderne. Kræver UI-arbejde. |
| **D. Udskyd** | Lad Holland stå. Fokusér på UK i stedet. Samme problem kommer tilbage. |

**Thomas' foreløbige holdning:** Simplicitet (A) med fold ud-løsning til de supernørdede (C) = A+C hybrid.

### Dokument til partner-diskussion
`MGP_Holland_Produktbeslutning.md` (april 21, 2026) — indeholder: Kontekst, 4 designmuligheder med pros/cons, 6 konkrete spørgsmål (bucket list, badges, passport-tælling, UK-konsekvens, onboarding, hvornår filosofien låses).

### Hvis partner-beslutning er A eller A+C
Holland er 2-3 sessioner arbejde, metode:
1. OpenStreetMap (CC BY-SA) som master-liste — gir ~270 klubber med koordinater
2. Per-klub scraping af klubbernes egne websites (lovligt, offentlige marketing-sider)
3. Combo-generering efter Island-mønstret (dobbelt-prefix navngivning)
4. Nuke+reimport-script (preflight er ren, så det er sikkert)

### Hvis partner-beslutning er C (hierarkisk)
Kræver UI-arbejde før data-cleanup giver mening. Ny komponent der viser basis-baner + "flere varianter"-ekspansion.

### Hvis partner-beslutning er D (udskyd)
Holland forbliver som er (rodet men funktionelt pga combo-mekanismen). UK starter som næste cleanup.

---

## Session 13 — England light-cleanup (fuld dokumentation)

**Status:** Gennemført. 61 baner fjernet netto fra England, 20+ manuelle koordinatfix, 0 way-off koordinater i hele UK.

### Udgangspunktet
England-cleanup blev oprindeligt planlagt som forbunds-baseret (playbook fra Norden). Tidligt fandt vi at:
- **England Golf** (englandgolf.org) er JS-renderet via DotGolf-platform
- **DotGolf ISV-API** eksisterer (`isvapi.whsplatform.englandgolf.org`) men kræver licens som Independent Software Vendor (Club Systems, Intelligent Golf, HandicapMaster niveau)
- **Golfshake** er direkte konkurrent med forbudsklausul mod at bevare data
- **Alternative kilder** (OSM + per-klub scraping) ville kræve 6-10 sessioner for fuld dækning

**Valg:** Light-cleanup — rent SQL-baseret oprydning uden re-import. Scope: mis-klassifikation, way-off koordinater, åbenlys junk, placeholder-navne.

### Metode
1. **Preflight check:** 0 brugerdata-referencer til England → fuldt grønt lys
2. **State-måling:** 2.732 baner, 99,96% koordinater, 0% websites, 0% par, 274 combos markeret
3. **Bbox-outliers:** 67 baner med koordinater uden for England-bbox
4. **Junk-detektor:** 40 rækker med problematiske navne

### Udførte aktioner (rækkefølge)

**1. Reklassifikation (første runde, 22 rækker)**
- 13 baner England → Scotland (skotske koordinater i England-rækker)
- 4 baner → Northern Ireland (Dungannon, Dunmurry, Gracehill, Larne)
- 5 baner → Wales (Golf Tycroes, Hawarden, Pontnewydd, RAF St Athan, Saron)

**2. Duplikat-opdagelse (første kritiske fund)**
Efter reklassifikation: 17 ægte duplikater opstod fordi de flyttede baner allerede fandtes i destination-landet med samme `golfapi_id`. Vi skulle have slettet i stedet for at flytte.

**Fix:** Slettede de 17 netop-flyttede rækker (den "nye" kopi i destination-landet). De originale rækker blev bevaret urørt.

**Metode-læring:** Før UPDATE country, altid check om samme `golfapi_id` findes i destination-landet. Hvis ja → SLET i stedet for at flytte.

**3. Junk-sletning (5 rækker)**
- 2 Driving Range-rækker (Stanmore, Thamesview)
- 2 Golf Simulator-rækker (Queenwood, Haigh Hall)
- 1 Whiston Hall duplikat (identisk række)

**4. Koordinat-analyse (59 way-off baner i hele UK)**
- 48 England + 6 Scotland + 2 Wales + 3 NI
- Alle havde korrekte adresser, men Photon-geocoding havde fejl-matchet globalt tvetydige stednavne til "Kington, Australia" osv.
- **Ikke GolfAPI-fejl** — vores egen `geocode-all-missing.mjs` manglede `countrycode=GB` filter

**5. Yderligere klassifikations-opdagelse (gruppe B, 30 rækker)**
Ved gennemgang af way-off baner fandt vi at mange var fejl-klassificeret som England: Covesea Links, Loch Lomond, Elie Sports, Mains of Taymouth etc. har korrekte klub-navne og adresser der peger mod Scotland/Wales/NI, men lå i England-tabellen med way-off koordinater.

**Fix:** Samme procedure — 20 duplikater slettet (havde kopier i rigtigt land via golfapi_id), 10 rækker flyttet (ingen duplikater fandtes).

**6. Navne-normalisering (56 rækker)**
"Sunningdale-mønsteret": GolfAPI havde importeret multi-bane-klubber med sløjfe-navne alene som bane-navn (Sunningdale/Old, Berkshire/Red, Wentworth/West osv.).

**Fix:** Tilføjede " Course" til alle. Kun "helt sikre" kategorier — single-word farver/retninger og specifikke korte ord (Wee, Spa, Bay, Lee, Ver, Rye, Fen). Placeholder-tal ("18", "9", "1562", "1905") blev sprunget over — kræver klub-by-klub research.

**7. Automatisk re-geocoding (Claude Code-script)**
`scripts/regeocode-uk-broken-coords.mjs` blev bygget med:
- Hardcoded ID-liste (40 baner)
- Dry-run mode default, --live flag kræves for at skrive
- Backup-JSON af alle 40 rækker før første UPDATE
- Photon-query med `countrycode=GB` filter
- Filter: kun accepter resultat hvor osm_value='golf_course' OR name indeholder 'golf'/'club'

**Resultat: 13 baner auto-fixet**, 23 fejlede (Photon fandt intet, eller fandt kun falske positiver).

**8. Fallback-script forsøg**
`scripts/regeocode-uk-fallback.mjs` prøvede 4 forskellige query-strategier for de 23 fejlede. Dry-run viste at Photon fuzzy-matcher til "random golfbane i UK" hvis intet ord-match — 14 af 18 matches var forkerte klubber.

**Fix:** Afbrød fallback-scriptet. Kørte --live for kun 2 bekræftede matches (Melville Golf Centre, St Mary's Hotel). De resterende 21 håndteret manuelt.

**9. Manuel koordinat-research (21 baner, 17 unikke klubber)**
Thomas googlede hver klub, fandt rigtige koordinater på Google Maps. Ved research opdagede han:
- **Whitehall Golf Club ×3** skulle være i Wales, ikke England (Nelson, Caerphilly)
- **Kames Country Club** lukket — slet
- **Freystrop Golf Club** fantom-klub der ikke kunne findes — slet
- **Haverfordwest Golf Club** aktivt men manglede i DB — tilføj som ny række
- **Loudoun Golf Club** officielt stavemåde "Loudoun Gowf Club" (historisk)
- **Mountain View Ranch** hedder reelt "Castle Heights Golf Club" (9-huls)
- **Meon Valley** hovedbane hedder "Championship Course"
- **Vale Resort "Welsh National"** hedder "Wales National Course" på klubbens egen side

**10. SQL-pakke til manuelle fix (6 statements)**
1. Slet Kames + Freystrop (2 rækker)
2. Indsæt Haverfordwest Golf Club (1 ny række, Wales, 18 huller, website + telefon)
3. Flyt Whitehall ×3 til Wales (3 opdateringer)
4. Koordinat-UPDATE med CASE-statement (22 baner)
5. Klub- og banenavne-opdatering (7 rækker)
6. Website-fyld (16 rækker)

### Endeligt resultat

**Før session 13:**
- England 2.732 baner, 48 way-off koordinater
- Scotland 677 baner, 6 way-off
- Wales 81 baner, 2 way-off
- Northern Ireland 117 baner, 3 way-off

**Efter session 13:**
- England 2.671 baner (−61), 0 way-off ✅
- Scotland 679 baner (+2), 0 way-off ✅
- Wales 97 baner (+16), 0 way-off ✅
- Northern Ireland 117 baner (±0), 0 way-off ✅
- **Total: 3.564 UK-baner, 0 koordinatfejl**

### Files bevaret
- `scripts/regeocode-uk-broken-coords.mjs` (hardcoded IDs, dry-run mode, UK bbox filter)
- `scripts/regeocode-uk-fallback.mjs` (kun 2 manuelle korrektioner, resten afbrudt)
- `scripts/regeocode-uk-backup-2026-04-21T08-16-41.json` (pre-update, 36 rækker)
- `scripts/regeocode-uk-fallback-backup-2026-04-21T08-28-54.json` (pre-update, 2 rækker)
- `scripts/regeocode-uk-success.csv` (13 auto-opdateringer)
- `scripts/regeocode-uk-failed.csv` (23 fejlede)
- Commit: `2acb324`

### Kritiske lærdomme der låser fremtidig metode

1. **UPDATE country før DELETE: altid check golfapi_id-duplikater først.** Hvis destination-landet allerede har klubben med samme golfapi_id → SLET kilde-rækken, ikke flyt.
2. **Photon fuzzy-match er farlig for ukendte klubber.** Photon vælger "random golfbane i UK" hvis intet ord-match findes. Brug aldrig Photon-fallback uden eksplicit ord-validering mod klubnavn.
3. **Claude Code destruktive scripts skal have:** hardcoded ID-liste (ikke SQL WHERE-queries der kan misforstås), dry-run mode default, backup-JSON før første skrivning.
4. **Manuel Google Maps-research er effektivt.** 20 klubber på 30 minutter — hurtigere end at iterere videre på scripts.
5. **Klubbens eget website afslører ofte mere end koordinater:** rigtige navn, website, telefon, banenavne. Kombiner koordinat-research med metadata-fyld.
6. **Cross-country duplikat-detektion SKAL bruge golfapi_id, ikke (club, name, country).** USA har Rolling Hills ×12 som reelle forskellige klubber — (club, name, country)-match ville fejlagtigt flagge dem som duplikater.

### Uafsluttede items fra session 13 (overført til Parked)
- **Kington Golf Club, Stowe Golf Club, Flint Golf Club** — koordinater OK men Photon fandt *andre* legitime golfklubber tæt på. Thomas kunne også overveje manuel verifikation senere.
- **Priskilly Forest Country House** (Wales) — har Photon-fejl-koordinater (ligger i Rutland) men ikke way-off nok til at blive fanget af bbox-checken. Tag i Wales light-cleanup.
- **GolfAPI validitets-stikprøve** — aftalt i session 13 men ikke udført. 20 tilfældige England-baner mod klubbens website skulle afgøre om GolfAPI-data er troværdigt nok til fortsat brug.
- **Placeholder-tal-navne** (Montrose "1562", Whittlebury "1905" etc.) — 7 rækker kræver klub-by-klub research.

---

## Data cleanup — kendte huller per land

### 🇸🇪 Sverige
- 45 klubber: scrape fejlede (404/timeout) — kandidat til ny kørsel
- 62 klubber: ingen URL i stash
- ~100 klubber: kunne ikke verificeres præcist pga mangelfuld adresse
- **Tureholm / Övertorneå Golf check** — den svenske bane brugt af finske Aavasaksa Golf. Er den i DB?

### 🇳🇴 Norge
- 10 klubber uden website (små/ikke-dedikerede sites): Stavanger, Tysnes, Vildmarken, Land, Narvik, Salten, Sandane, Høken, Lønne m.fl.
- 75 klubber uden postnummer (scrape droppet pga 4-cifret postal/year kollision)
- 24 klubber hvor Nominatim ikke kunne finde adressen (små veje)

### 🇫🇮 Finland
- 25 små non-SGL-klubber uden website (alle har koordinater, så stoppet der)
- Session 8: Verificeret at Finland er komplet mod SGL (98.5% dækning, 2 fravalg er korrekte)

### 🇮🇸 Island — COMPLETED session 11 ✅
- Nuke+reimport fra GSÍ (rastimar.golf.is) gennemført
- 114 → 66 baner, 100% koordinater, 85% websites
- Se egen sektion for detaljer

### 🇳🇱 Holland — research only session 12
- Se Session 12-sektion ovenfor. Afventer produktbeslutning.

### 🇬🇧 UK — stor klassifikations-opgave
**Problem:** Alle UK-baner (England, Scotland, Wales, Northern Ireland) blev importeret samlet fra GolfAPI under "England" og delt op via bounding boxes + by-navne (`reimport-uk.mjs`). Analyse session 7 viste at ~60-70% af de 81 "walisiske" baner faktisk ligger i Skotland eller England.

**Omfang:** ~3,607 baner
- England: 2,732 · Scotland: 677 · Wales: 81 (mange mis-klassificerede) · Northern Ireland: 117

**Løsningstilgang:** Kør forbunds-baseret cleanup per UK-land (England Golf, Scottish Golf, Wales Golf, Golf Ireland for Northern Ireland). **Blokeret af:** Multi-sløjfe-filosofi-beslutning fra Holland-diskussion (36-huls klubber Old+New er standard).

**Estimat:** Mindst 1 session per UK-land, 4 sessioner total.

### 🌍 Koordinat-forsikring — globalt
De 30 største lande har fået bounding-box-tjek planlagt men ikke kørt. Kan køres som validation efter hver nations cleanup for at fange grotesker (som Karasjok der lå i Polen).

### 📐 Avanceret combo-klassificering
Combo-scriptet fanger kun " + " mønsteret. Andre skjulte kombo-strukturer der bør undersøges:
- New Zealand: Takapuna "Front 9" / "Back 9" mønster
- Generelt: North/South, Red/Blue/White, A/B/C, Old/New mønstre
- ~~Iceland: 3 klubber har 3+ 9-huls sløjfer~~ ✅ Løst session 11
- **Holland: 20 klubber med multi-sløjfe-strukturer** — afventer filosofi-beslutning

---

## Business model (fuld dokumentation)

- Free first 6 months — focus on user growth
- €19/year premium after traction
- Free limit: 25 logged courses
- Facebook sharing always free
- Exit target: $3-5M within 3 years
- Most likely buyers: GolfNow, Golf Genius, Strava

**Payment strategy (besluttet session 8):** Abonnement-betaling KUN gennem App Store (iOS) og Google Play (Android) — ingen egen Stripe-integration. Betaling aktiveres samtidig med native app lancering (ikke før). RevenueCat anvendes som abstraktion over begge stores (gratis op til $2.5M ARR). Lifetime-brugere markeres via `subscription_tier = 'lifetime'` i profiles-tabellen.

**Native transition (besluttet session 8):** Alle brugerdata (profiler, runder, venskaber, beskeder, badges, bucket list) bevares automatisk i Supabase. Native app bliver bare en ny frontend på samme backend. Beta-testere og tidlige brugere beholder deres konti 1:1 — ingen migration, ingen re-registrering. Kun UI-laget (React-komponenter) skal genopbygges som React Native. API routes, database-logik og business rules genbruges 1:1.

### Subscription schema (forberedes inden lifetime invitations)
Tilføjes til profiles-tabellen når vi er klar:
```
subscription_tier: 'free' | 'premium' | 'lifetime'
subscription_source: 'web' | 'ios_iap' | 'android_iap' | 'granted'
subscription_expires_at: timestamp (null for lifetime)
```
Ikke implementeret endnu — bør tilføjes før næste bølge af invitations hvis de skal have lifetime.

---

## Scripts (fuld dokumentation)

### Data import & cleanup
- `reimport-country.mjs` — reimporterer ét land fra GolfAPI. Sletter eksisterende data for landet, henter fra API, geocoder via Photon, markerer is_combo. Genbruger koordinater fra tidligere import.
- `reimport-uk.mjs` — UK-specifik import via bounding boxes + by-navne. **Obsolet efter UK re-klassificering**
- `geocode-all-missing.mjs` — geocoder alle baner med latitude IS NULL via Photon
- `backup-courses.mjs` — laver fuld backup af courses tabellen til JSON
- `split-combo-courses.mjs` — markerer baner med " + " i navn som is_combo = true (SAFE version — opretter IKKE nye baner)

### Forbunds-baserede scrape scripts (session 6-7)
- Sverige (SGF): script kaldet i session 6
- Norge (NGF): scrape fra golfforbundet.no, session 7
- Finland (SGL): scrape fra golf.fi /pelaajalle/kenttaopas/ embedded JSON, session 7
- **Finland scrape-fil bevaret:** scripts/finnish-clubs-golffi.json (54.5 KB, session 8 bekræftet eksisterer)
- Island (GSÍ): reimport-iceland-from-gsi.mjs + iceland-clubs-gsi.json + iceland-courses-gsi.json

### Verification & validation scripts
- `verify-france-names.mjs` — verificerer franske banenavne mod OSM (95%+ accuracy confirmed)
- `validate-danish-clubs-vs-osm.mjs` — sammenligner danske klubnavne med OSM data (Excel output)
- `verify-danish-club-names.mjs` — verificerer danske klubnavne via web search
- `add-danish-websites.mjs` — samler websites til danske klubber
- `verify-danish-clubs-batch.mjs` — batch-behandling af klubnavne + websites i grupper af 100

### Visualization tools
- `generate-denmark-map.mjs` — genererer interaktivt Leaflet kort med alle danske baner
- Output: `/public/denmark-golf-map.html` (tilgængelig på https://mygolfpassport.vercel.app/denmark-golf-map.html)

### GolfAPI.io facts
- Credits remaining: ~0.2 (af 50 nye credits købt session 6)
- Search endpoint: 0.1 credit per page, 200 klubber per side — ONLY use this
- Detail endpoints: 1.0 credit each — DO NOT USE
- **Efter session 7:** Forbunds-baseret metode erstatter GolfAPI for cleanup. Credits holdes i reserve til sjældne tilfælde.
- Subscription portal: https://billing.stripe.com/p/login/4gwbKd61XfsIfOo3cc

### Backup
- Full backup saved: `scripts/courses-backup-2026-04-20.json` (42.700 rækker, 22MB — pre-Island-nuke backup)
- Tidligere backup stadig tilgængelig: `scripts/courses-backup-2026-04-16-final.json`
- Ny backup kan laves med `scripts/backup-courses.mjs` (bruger dagens dato i filnavn)

---

## Done — per session

### Session 13 (April 21, 2026) — England light-cleanup
- ✅ **UK koordinat-cleanup gennemført** — 15 automatiske + 20+ manuelle koordinater opdateret. 0 way-off koordinater tilbage på 3.564 UK-baner.
- ✅ **England reklassifikation** — 47 mis-klassificerede baner korrigeret (13 → Scotland originalt, 4 → Northern Ireland, 5 → Wales, plus 20 gruppe B til Scotland/Wales)
- ✅ **Duplikat-oprydning** — 37 duplikater fjernet via golfapi_id-match (17 fra første reklassifikations-fejl, 20 fra gruppe B-fejl, 3 Whitehall flyttet til Wales uden duplikat)
- ✅ **Junk-sletning** — 5 rækker (2 driving ranges, 2 simulators, 1 Whiston Hall duplikat)
- ✅ **Navne-normalisering** — 56 rækker: "Old", "New", "Red" etc. → "Old Course", "New Course", "Red Course" (Sunningdale-mønster)
- ✅ **Manuel koordinatfix + websites** — 20 baner med koordinater fra Google Maps + 16 websites fyldt via klub-website research
- ✅ **Haverfordwest Golf Club tilføjet** — ny række efter opdagelse under manuel research af Freystrop (der viste sig at være fantom-klub, slettet)
- ✅ **Scripts pushet til GitHub** — commit 2acb324: `regeocode-uk-broken-coords.mjs`, `regeocode-uk-fallback.mjs`, backups + success/failed CSV'er
- ✅ **Metode-læring** dokumenteret: UPDATE country kan skabe duplikater, Photon fuzzy-match er farlig uden ord-validering, cross-country duplikater skal findes via golfapi_id ikke (club, name, country)
- ✅ **Repo-dokumentations-rutine ændret** — PROJECT_REFERENCE.md i repo var 7 sessioner bagud (session 5); gennemsynkronisering via Claude Code. Fremtidige opdateringer via str_replace, ikke regenerering.

### Session 12 (April 21, 2026) — research only
- ✅ **Holland research gennemført — ingen cleanup-kørsel** — Scope-ændring efter kompleksitets-opdagelse
  - Juridisk afklaring: NGF/golf.nl har restriktiv copyright + hollandsk databaseret → ikke scrape-lovligt. Samme for leadingcourses.com.
  - DB-analyse: 501 rækker, 258 klubber, 0 websites, 0 par-værdier, 174 combo-rækker på 20 klubber. Preflight: 0 brugerdata-referencer.
  - Data-kaos dokumenteret: Dobbelt combo-formater, symmetri-duplikater, X+X nonsens, hybrid-navne. Combo-mekanismen skjuler det værste på UI-niveau.
  - Klub-struktur opdaget: Het Rijk van Nijmegen anerkender 13 "baner" officielt pga handicap-systemets course rating/slope-beregning.
  - Konklusion: Dette er en produktbeslutning, ikke en data-opgave.
- ✅ **Partner-diskussionsdokument skrevet** — `MGP_Holland_Produktbeslutning.md`
- ✅ **Format-refaktor af reference-dokumentet** — Split til PROJECT_REFERENCE.md (aktiv, ~180 linjer) og PROJECT_HISTORY.md (historisk). Mål: reducere token-forbrug ved session-start fra 25k til ~8k.

### Session 11 (April 20, 2026)
- ✅ **Island cleanup gennemført via nuke+reimport fra GSÍ** — 114 rodede rækker → 66 rene baner
  - Scrape: rastimar.golf.is via `window.__remixContext` pre-hydreret payload
  - Preflight SQL-check: bekræftet 0 brugerdata-referencer → nuke-tilgang sikker
  - Combo-navngivning: Dobbelt-prefix ("Korpa - Áin + Korpa - Landið")
  - Par-fix: Manuel SQL-UPDATE af combo-par til 72
- ✅ **Ny metode-variant etableret: Nuke+reimport når brugerdata-check er ren**

### Session 10
- ✅ **Friend-søgning med unaccent** — FriendsPageClient opdateret til `full_name_normalized` og `home_club_normalized`. Tyskere kan søge "hjort" og finde Casper Hjorth. Commit: 7b76f7f.
- ✅ **Island research — rastimar.golf.is kortlagt** — GSÍ's officielle bane-site giver fuld åben adgang via `/klubbar` og `/vellir`.
- ✅ **Bekræftet datakvalitets-issue med home_club** — fritekst med inkonsistens, værdier er frosne på tidspunkt for onboarding.

### Session 9
- ✅ International specialtegns-søgning implementeret via Postgres unaccent + generated columns (name_normalized, club_normalized på courses) med GIN trigram-indexes. normalizeSearch helper i src/lib/search.ts. CourseBrowser, ProfileClient, OnboardingClient opdateret. Home_country prioriteres i søgeresultater.

### Session 8
- ✅ System user skjult fra leaderboard + Find players
- ✅ Continent-tab bug fixet
- ✅ Slet-runde med automatisk badge-revurdering
- ✅ Finland verificeret komplet mod SGL
- ✅ Payment strategy besluttet (App Store + Google Play + RevenueCat)
- ✅ Native transition plan dokumenteret

### Sessions 1-7
Initial build: Next.js + Supabase setup, passport card, course DB import fra GolfAPI, badges (26 seeded), XP-system (senere fjernet), home/courses/map/log/profile/friends/leaderboard/clubs-sider, messaging med Realtime, survey, Sverige+Finland+Norge+Danmark forbunds-cleanup, combo-mekanisme (Parkvej+Hestkøb mønster).

---

*Historisk arkiv. Vedhæft kun denne fil til Claude-samtaler hvis du skal tilbage i tiden. Den aktive state ligger altid i PROJECT_REFERENCE.md.*
