# Finnish golf club name verification — batch 2 (coordinate matches)

Generated 2026-04-19.

Scope: the 36 DB clubs whose coordinates matched an SGL club within ~2 km but whose names differed notably from SGL's registered name. All verified where non-obvious — site URL checked for 8 cases that needed disambiguation (operator vs club, legal vs marketing name, false positive detection).

Rule applied (same as batch 1): **club's own website beats SGL's registered name**. Finnish "-n" possessive suffix (Kajaani → Kajaanin) and "Golfseura" (registered association) are kept when SGL uses them, since they match how the clubs themselves brand on their sites.

## HIGH-CONFIDENCE RENAMES (30)

### Same-address, formal/canonical form (22)

| # | Current | Suggested | Reason |
|---|---|---|---|
| 1 | `Härmä Golf` | `Härmä Golf & Academy` | Same address (Vaasantie 22 Ylihärmä). SGL full name. |
| 2 | `HIFK Golf - Paloheinä` | `HIFK Golf` | Same address. Paloheinä is the course subname, not part of club name. |
| 3 | `Iitti Golf` | `Iitin Golfseura` | Same address (Iitintie 684). Finnish possessive form. |
| 4 | `Kajaani Golf` | `Kajaanin Golf` | Same address (Mainuantie 350). Finnish possessive form. |
| 5 | `Kanava Golf` | `Kanavagolf Vääksy` | Same address (Tehtaantie 3). SGL uses joined form + city. |
| 6 | `Katin Golf Oy` | `Katinkulta Golf` | Same address (Katinkullantie 15 Vuokatti). "Katin Golf Oy" is an abbreviated legal variant; SGL's branding is `Katinkulta Golf`. |
| 7 | `Keimola Golf - KGV` | `Keimola Golf` | Same address. "KGV" is abbreviation suffix, not part of name. |
| 8 | `Kemin Golfklubi` | `Kemin Golf Klubi` | Same address. SGL spaces the words. |
| 9 | `Kultaranta Golf` | `Kultaranta Golf Club Naantali` | Same address (Särkänsalmentie 178). SGL full form. |
| 10 | `Messilä Golf` | `Messilän Golf` | Same address (Messiläntie 240). Finnish possessive form. |
| 11 | `Muurame Golf` | `Muuramen Golfseura` | Same address (Pyyppöläntie 316). Possessive + "Golfseura". |
| 12 | `Nivalan Seudun Golf - NSG` | `Nivalan Seudun Golf` | Same address. Strip abbreviation suffix. |
| 13 | `Nordcenter` | `Nordcenter Golf & Country Club` | Same address (Åminnen kartanon tie 4). SGL full form. |
| 14 | `Oulun Golfkerho - OGK` | `Oulun Golfkerho` | Same address (Mikonmäentie 201). Strip abbreviation. |
| 15 | `Paltamo Golf` | `Paltamon Golf` | Same address (Golftie 9). Possessive form. |
| 16 | `Peuramaa Golf` | `Peuramaa Golf Hjortlandet` | Same address. SGL full bilingual form (Hjortlandet = Swedish). |
| 17 | `Pietarsaaren Golf Jakobstad` | `Jakobstads Golf - Pietarsaaren Golf` | Same address. SGL canonical bilingual (Swedish-first) form. |
| 18 | `Porvoo Golf` | `Porvoo Golf - Borgå Golf` | Same address (Klubitie 46). Bilingual form (Finnish-Swedish). |
| 19 | `Vierumäki Golf` | `Vierumäen Golfseura` | Same address (Kaskelantie 10). Possessive + "Golfseura". |
| 20 | `Viipurin Golf - Etelä-Saimaa` | `Viipurin Golf` | Same address. Strip region subname. |
| 21 | `Kalafornia, Porin Golfkerho` | `Porin Golfkerho` | Same address (Kalaforniantie, Pori). "Kalafornia" is the course-area prefix, not part of club name. |
| 22 | `Puula Golf` | `PuulaGolf` | Same road (Syvälahdentie 20-23). SGL writes joined; domain is puulagolf.fi. |

### Site-verified (club website checked) (6)

| # | Current | Suggested | Verification |
|---|---|---|---|
| 23 | `Kotojärvi Golf` | `Koto Golf` | Site kotogolf.fi redirects to kotoclub.fi → page header uses "Koto Golf" (with "Koto Club" for dining/events). Kotojärvi is the lake name. |
| 24 | `Nokia DG` | `Nokia River Golf` | Site nrg.fi redirects to nokiarivergolf.fi → footer: "Nokia River Golf ry \| Alastalontie 33, 37120 Nokia". "DG" likely disc-golf confusion or abbrev. |
| 25 | `Vihti Golf Center` | `Vihti Golf Club` | Site vihtigolf.fi uses "Vihti Golf Club Ry" formally; "Vihti Golf Center" doesn't match site, SGL, or any public listing. |
| 26 | `GolfStar Hirvensalon Golf` | `Hirvensalon Golf` | Site hirvensalongolf.fi header/footer: "Hirvensalon Golf". GolfStar is the commercial operator, not the club. |
| 27 | `Laajasalon golfkenttä` | `Helsingin Golf` | Site laajasalongolf.fi states "Helsingin Golf Ry" is the club; Laajasalo is the course name. |
| 28 | `Laukanlampi golf club` | `Linna Golf` | SGL: Linna Golf at Vanajanlinnantie 485. Site linnagolf.fi. Laukanlampi is a pond/course area within the Linna Golf facility. |

### False positives corrected (3)

These three coord matches picked the wrong SGL entry; the correct SGL match is in the "SGL-only" list (not previously matched).

| # | Current | Coord-match (WRONG) | Correct match | Verification |
|---|---|---|---|---|
| 29 | `Espoon Golf Seura - EGS` | Löfkulla Golf | `Espoon Golfseura` | Site espoogolf.fi: "Espoon Golfseura (EGS)" with courses EGS + GG. Löfkulla is a different Espoo club. |
| 30 | `GolfStar Kurk Golf` | Vuosaari Golf Helsinki | `Kurk Golf` | Site kurkgolf.fi header "Etusivu \| Kurk Golf"; caddiemaster email kurk@golfstar.fi (GolfStar is operator). DB coord was wrong (pointed to Vuosaari in Helsinki, not Evitskog). |
| 31 | `SHG Lakisto` | *(matched correctly but name form)* | `Suur-Helsingin Golf` | SHG = Suur-Helsingin Golf. Site shg.fi. Lakisto is one of the club's course areas. |
| 32 | `PGC - Park` | *(matched correctly but name form)* | `Pickala Golf` | PGC = Pickala Golf Club. Park is one of Pickala's three courses. Renaming to `Pickala Golf` **consolidates with existing DB club** of that name (batch 1 kept short form). |

## NO CHANGE / SPECIAL (4)

| # | Current | Suggested SGL | Decision | Reason |
|---|---|---|---|---|
| 33 | `Bjärkas Golf` | Bjärkas Golf & Country Club | **No change** | Site bjarkasgolf.com main heading uses "Bjärkas Golf"; "& CC" only appears in membership context. Club's own branding is short form. |
| 34 | `Eckerö Golf` | Eckerö Golf/Kyrkoby GK | **No change** | SGL's "/Kyrkoby GK" is not user-facing; club is known as "Eckerö Golf" (Åland). |
| 35 | `Holiday Club Golf Saimaa` | Holiday Club Golf | **No change** | 1.75 km distance + same street (Kohonkankaantie 11). DB's "Saimaa" suffix distinguishes it from other Holiday Club Finland properties — keep the descriptive form. |
| 36 | `Oma` | Tammer-Golf (1.72km) | **Delete** | "Oma" (= "own" in Finnish) is placeholder/junk text; DB address empty; coord match is spurious. Defer deletion to DB-only cleanup batch. |

## SUMMARY

- Recommended renames: **30** (22 address-match + 6 site-verified + 2 abbreviation expansions)
- False positive fixes: already counted above (3 — EGS, Kurk, and the abbrev expansions are captured)
- No change: **3** (Bjärkas, Eckerö, Holiday Club Saimaa — club's branding differs from SGL)
- Flagged for deletion: **1** (`Oma`)

After batch 2 applies, 31 of the 36 rows get a rename, and `PGC - Park` merges into existing `Pickala Golf`. Remaining coord-match issue: `Oma` stays for the DB-only junk cleanup batch (batch 3).

Next: batch 3 covers the 62 DB-only clubs (filter out junk/frisbee-golf/ice-golf/simulator entries, identify genuine clubs not in SGL's membership).
