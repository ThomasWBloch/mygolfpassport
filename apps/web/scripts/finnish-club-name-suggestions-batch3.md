# Finnish golf club name verification — batch 3 (DB-only clubs)

Generated 2026-04-19.

Scope: the 62 DB clubs that had no SGL match in batch 2, plus the `Oma` entry deferred from batch 2. Classified into: rescued SGL-matches (my algorithm missed them), consolidation/merge candidates, non-golf data to delete, junk/placeholder to delete, and genuine non-SGL clubs to keep as-is.

## RESCUED SGL MATCHES (7)

My earlier matcher missed these because (a) the greedy coord match consumed the SGL entry for a different DB club, or (b) the Finnish spelling diverged beyond the normalize() threshold. Cross-checking DB addresses against the SGL-only list surfaces them.

| # | Current | Suggested | Reason |
|---|---|---|---|
| 1 | `Hirvihaaran Golf` | `Hirvihaara Golf Mäntsälä` | SGL-only list entry (Hirvihaara, www.hirvihaarangolf.fi); DB addr "Vanha Soukkiontie 945, Hirvihaara" matches. |
| 2 | `Oulujokilaakson golf` | `Oulujokilaakson Golfklubi` | SGL-only list entry `Oulujokilaakson Golfklubi ry` (the "ry" is legal suffix); DB addr "Sattulantie 60, Muhos" matches. |
| 3 | `Vuosaari Golf` | `Vuosaari Golf Helsinki` | SGL's "Vuosaari Golf Helsinki" was incorrectly grabbed by "GolfStar Kurk Golf" in batch 2. DB addr "Eteläreimarintie 9, Helsinki" is the Vuosaari Golf address. |
| 4 | `SHG Luukki` | `Suur-Helsingin Golf` | SHG = Suur-Helsingin Golf; Luukki is another of their course areas (Lakisto was also renamed in batch 2). |
| 5 | `Vanajanlinna` | `Linna Golf` | Course name is `Linna Golf`, addr "Vanajalinnantie 485" matches Linna Golf. Same club as `Laukanlampi golf club` in batch 2. |
| 6 | `Nokia River Golf - NRG` | `Nokia River Golf` | Strip abbreviation suffix. Merges with `Nokia DG` rename from batch 2. |
| 7 | `Viipurin Golf - Kahilanniemi` | `Viipurin Golf` | Strip course subname. Same club as `Viipurin Golf - Etelä-Saimaa` from batch 2. |

## MERGE / CONSOLIDATE (2 pairs → 1)

| # | Keep | Merge | Reason |
|---|---|---|---|
| 8 | `Härmä Golf & Academy` (batch 2 target) | `Härmä Golf 12` | DB addr "Areenantie 4, Ylihärmä" is the 12-hole adjunct at Härmä Golf. Course name "12-hole course" becomes a course under the Härmä Golf & Academy club. |
| 9 | `Parkkivuoren Golf` | `Parkkivuoren golfseura ry` | Two DB rows for same club (one with "ry" suffix, one without, both at same ballpark). Not a SGL member. Consolidate to `Parkkivuoren Golf`. |

## DELETE — non-golf entries (20)

Disc golf, frisbee golf, ice golf, snow golf, winter golf, and simulator entries. Mygolfpassport is a golf-course product; these do not belong.

| # | DB name | Type |
|---|---|---|
| 10 | `Keskusliikuntapuiston frisbeegolfrata` | Frisbee golf (Kaarina) |
| 11 | `Köykkyri DiscGolfPark` | Disc golf (Kempele) |
| 12 | `Lahden Frisbee Golf` | Frisbee golf (Lahti) |
| 13 | `Mellilä FGR` | Frisbee Golf Rata (Mellilä) |
| 14 | `Mäntän frisbeegolfrata` | Frisbee golf (Mänttä) |
| 15 | `Märynummen kyläyhdistys` | Course "Märynummi - Frisbeegolf" |
| 16 | `Naissaari` | Course "Naissaaren frisbeegolfrata" |
| 17 | `Nummijärvi Frisbeegolf` | Frisbee golf |
| 18 | `Pikkarala monirata-alue` | "Multi-track area" / disc golf (Oulu) |
| 19 | `Prodigy` | Disc golf (Lieto) |
| 20 | `Prodigy Disc` | Disc golf (Piikkiö) |
| 21 | `Ranuan Kristillisen kansanopiston frisbeegolfrata` | Frisbee golf (Ranua) |
| 22 | `Rauma DGP` | Disc Golf Park |
| 23 | `Tuomiojärvi DGP` | Disc Golf Park (Jyväskylä) |
| 24 | `Vimpelinvaara DGP 18` | Disc Golf Park (Taivalkoski) |
| 25 | `Vuorilammen frisbeegolfrata` | Frisbee golf (Jyväskylä) |
| 26 | `IceGolf Oulu` | Seasonal ice golf novelty |
| 27 | `Jämi Snow Golf` | Snow golf novelty |
| 28 | `Outokummun talvigolf` | Winter golf novelty |
| 29 | `Meri-Toppila 2014 par56` | Par-56 suggests disc golf |
| 30 | `Linna Golf simulator Sports Coach / Golf Coat` | Indoor simulator, not a physical course |

## DELETE — junk / placeholder data (8)

Rows with no real club name (random characters, single words, person names masquerading as club names, empty addresses).

| # | DB name | Evidence |
|---|---|---|
| 31 | `Lxhtxkxngxs` | Scrambled/nonsense name, empty address |
| 32 | `omn` | 3-letter placeholder, empty address |
| 33 | `Pete` | First name, empty address |
| 34 | `Talviharjoittelu` | Finnish for "winter training"; addr "M Hokkinen" is a person's name |
| 35 | `Valley` | Single word, addr "Vihti" only; likely fragment of a course name, not a club |
| 36 | `VG range` | 2-letter abbrev, empty address |
| 37 | `RTG` | 3-letter abbrev, empty address, coord in Lapland wilderness |
| 38 | `Oma` (from batch 2) | Finnish "oma" = "own"; placeholder, empty address, coord 1.7km from Tammer-Golf but no real association |

## KEEP AS-IS — genuine non-SGL clubs (22)

These appear to be real small clubs / pay-per-play facilities / P&P courses that are not SGL members. Kept in DB without rename.

| # | DB name | Notes |
|---|---|---|
| 39 | `Bogey Kouvolan Golfkeskus` | "Golfkeskus" = golf center (Kouvola) |
| 40 | `Holiday Club Kuusamon Golf` | Holiday Club property with Petäjäkangas course (Kuusamo) |
| 41 | `Koillisgolf` | Small club (Pudasjärvi) |
| 42 | `Kotka Golf, P&P Koivulankenttä` | Pitch & Putt course (Kotka) |
| 43 | `Ladun maja` | Small course with Finnish name ("ski cabin"), Jyväskylä |
| 44 | `Lillmärsän C` | Hanko, likely small Åland/coastal course |
| 45 | `Pellonnokka Golf&Country Club` | Private, Homeyard course (Salo) |
| 46 | `Peltola Golf` | 3 courses (Par3/Paula/Saku) in Turenki |
| 47 | `Puijo` | Small course (Kuopio) |
| 48 | `Punkalaitumen Golf ry` | Small club with "ry" |
| 49 | `Puumala Golf` | Small club (Puumala) |
| 50 | `Rantalinna Golf` | Possibly small seasonal; verify later |
| 51 | `Ranua Golf` | 9-hole in Lapland |
| 52 | `Season Golf` | Pay-per-play (Espoo) |
| 53 | `Suomen HCP Golf` | Malmi area (Helsinki), possibly range/HCP service |
| 54 | `Suomussalmi` | Remote northern (Jätkänpuisto course) |
| 55 | `Terola Club` | Short Game Course |
| 56 | `Valkjärvi Golf Club` | Small (Perttula) |
| 57 | `Vantaan Golfpuisto` | "Golfpuisto" = golf park (Vantaa) |
| 58 | `Vihajärvi Country Club` | Small northern (Puolanka) |
| 59 | `Viisari` | Hämeenlinna — may be local name of another club's course; investigate |
| 60 | `Väntti Golf` | Small (Mäntyharju) |
| 61 | `Wenoxa golf` | Åland (Taalintehdas) |
| 62 | `W-golf mäntsälä` | Small (Mäntsälä) |

## SUMMARY

- **Rescued SGL matches** (rename): **7**
- **Consolidations** (merge): **2 pairs → 2 renames**
- **Delete non-golf**: **20** (frisbee/disc/ice/snow/winter/simulator)
- **Delete junk**: **8** (includes `Oma` from batch 2)
- **Keep as-is**: **22 to 24** (some KEEPs may be re-classified later if they turn out to be non-golf)

Total actions: 9 renames + 28 deletions. After batch 3, Finland DB goes from 192 → approx 152 unique clubs (9 renames shrink by net ~2 via consolidation; 28 deletions remove separate clubs; some have multiple courses).

Because batch 3 includes deletions, it needs user sign-off before any rows are removed. Rename proposals can run independently with dry-run confirmation.
