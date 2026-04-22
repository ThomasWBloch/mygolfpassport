# Danish golf club name verification — clubs 41–70

Generated 2026-04-17.

## HIGH-CONFIDENCE CORRECTIONS (6)

| # | Current | Suggested | Reason |
|---|---|---|---|
| 1 | `Greve Ny Golfklub` | `Greve Golfklub` | Club's own website (grevegolf.dk) and DGU call it just "Greve Golfklub". No "Ny" in the actual name — appears to be spurious in our DB. |
| 2 | `Harekær` | `Golf Club Harekær` | The club's own website (harekaer.dk) and DGU list it as "Golf Club Harekær". Our DB has the location name only. |
| 3 | `Harrevig Golfklub` | `Harre Vig Golfklub` | Club's own website (harreviggolf.dk) title is "Harre Vig Golfklub" (two words). DGU uses the two-word form. |
| 4 | `Hedens Golf` | `Hedens Golfklub` | Club's own website (hedensgolf.dk) title is "Hedens Golfklub". DB drops the "klub". |
| 5 | `Hillerød GK` | `Hillerød Golf Klub` | Club's own site (hillerodgolf.dk) title is "Hillerød Golf Klub". Expand abbreviation. |
| 6 | `Hjarbæk Fjord` | `Hjarbæk Fjord Golfcenter` | Club's own website (hfgc.dk) and Facebook use "Hjarbæk Fjord Golfcenter". DGU uses "Hjarbæk Fjord Golf Klub". "Hjarbæk Fjord" alone is a location, not a club. |

## MEDIUM-CONFIDENCE CORRECTIONS (6)

**`Great Northern` → `Great Northern Golf Club`** (Medium)
"Great Northern" is the full resort brand (greatnorthern.dk) — the golf club within is titled "Great Northern Golf Club" on their own site. Keeping just "Great Northern" is acceptable if you want the resort-level grouping.

**`Gyldensteen Golf` → `H.C. Andersen Golf`** (Medium-High, but also needs coordinate review)
The facility was **renamed in 2013** — "the golf course lost the right to the name Gyldensteen and is now called H.C. Andersen Golf" (per golfbladet.com, Top 100 Golf Courses). Same 18-hole seaside course near Bogense. Earlier we set the coordinates to 55.5673, 10.1598 (Gyldensteensvej) — H.C. Andersen Golf is at 55.5607, 10.1114 per Photon's hit for "Golfklub Bogense" (tagged `golf_course`). Coordinate should move too.

**`Hals Golf Klub` → `Hals Seaside Golf`** (Medium)
Club's own website (halsgolf.dk) is titled "Hals Seaside Golf", and DGU lists the club as "Hals Seaside Golf". Appears to be a rebrand; many directories (GolfPass, Albrecht) still show the old name, so both are in circulation.

**`Hammel Golfklub` → `Hammel Golf Klub`** (Medium — spacing only)
Club's own website (hammelgolfklub.dk) uses three words "Hammel Golf Klub" consistently. DGU and Albrecht use the three-word form. Our DB collapses it.

**`Herning Golfklub` → `Herning Golf Klub`** (Medium — spacing only)
Club's own website (herninggolfklub.dk) uses three words "Herning Golf Klub". DGU, Albrecht, Visit-Herning all use the three-word form.

**`Himmerland Golf Klub` → `HimmerLand Golf & Spa Resort`** (Medium — rebrand)
The club has rebranded itself as "HimmerLand Golf & Spa Resort" (note: capital L in middle — odd styling). Top 100 Golf Courses, GolfPass, Expedia, Albrecht, Leading Courses all use the rebranded name. Keeping `Himmerland Golf Klub` is defensible for traditional naming; changing aligns with current branding. Courses like "Old Course" and "New Course" (which we already have as the club's courses) are consistent with the resort layout.

## FLAGGED FOR REVIEW — no rename suggested

**`Herlev`** — The only golf club in Herlev Municipality is **Hjortespring Golfklub** (already in our DB, entry 68). The old "Skovlunde Herlev Golf Club" merged into Hjortespring in 2011 and no longer exists independently. "Herlev" is likely a stale/duplicate entry. Recommend deleting after checking coords and merging any FK refs into Hjortespring.

**`Gyttegård Golf Club`** — Mixed usage: the club's own site (spil-golf.dk) uses "Gyttegård Golf Klub" (Danish form) internally, while GolfPass and other international directories use "Gyttegård Golf Club" (English form). No strong correction — either is fine.

## NO CHANGE NEEDED (16 clubs)

All match their own websites:

Golfklubben Storstrømmen · Grenaa Golfklub · Gudhjem Golfklub · Haderslev Golfklub · Halsted Kloster Golfklub · Haunstrup Golfklub · Hedeland Golfklub · Hedensted Golf Klub · Helsingør Golf Club · Henne Golfklub · Himmelbjerg Golf Club · Hirtshals Golfklub · Hjørring Golfklub · Hjortespring Golfklub · Holbæk Golfklub · Holmsland Klit Golfklub
