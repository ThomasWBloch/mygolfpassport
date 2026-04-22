# Finnish golf club name verification — batch 1 (normalized matches)

Generated 2026-04-19.

Scope: the 9 DB clubs whose normalized name matches an SGL (Suomen Golfliitto, golf.fi) entry but whose exact spelling differs. All other DB clubs either matched SGL exactly (86, no action) or need coordinate-based review (batch 2).

Rule applied: **club's own website beats SGL's registered name** when they disagree. Finnish "Oy" (company) and "ry" (association) are legal-entity suffixes, not brand names — kept out of DB names unless the club itself uses them as brand.

## HIGH-CONFIDENCE CORRECTIONS (2)

| # | Current | Suggested | Reason |
|---|---|---|---|
| 1 | `Hiisi Golf` | `Hiisi-Golf` | Domain hiisi-golf.fi, Facebook "Hiisi-Golf Ry", all directories (1Golf.eu, Hole19, AllSquareGolf) use hyphenated form. SGL also uses hyphen. |
| 2 | `vola Golf` | `Vola-Golf` | Site vola.fi and Facebook "Vola-Golf \| Mäntyharju" both use hyphenated form. Also fixes typo (lowercase "v"). SGL: "Vola-Golf". |

## MEDIUM-CONFIDENCE CORRECTIONS (1)

| # | Current | Suggested | Reason |
|---|---|---|---|
| 3 | `Santa Claus Golf` | `Santa Claus Golf Club` | SGL registers as "Santa Claus Golf Club"; domain santaclausgolfclub.fi and English title "Santa Claus Golf Club" support formal name (club renamed from "Golf Club of Rovaniemi" to "Santa Claus Golf Club" in 2017). Finnish pages still use shorter "Santa Claus Golf" as marketing form. |

## NO CHANGE NEEDED (6)

SGL's registered names include "Club" or "ry" suffixes, but the clubs themselves consistently market under the shorter form already present in DB. Per rule, club's own branding wins.

| # | DB name | SGL name | Why keep DB name |
|---|---|---|---|
| 4 | `Eke Golf` | `Eke Golf ry` | Site ekegolf.fi footer/header use "Eke Golf"; "ry" only appears in legal-entity listing alongside "Eke Golf Oy". |
| 5 | `Golf Virrat` | `Golf-Virrat` | Site golfvirrat.fi and Facebook both use "Golf Virrat" (space). Mixed in external directories but club's own usage is space form. |
| 6 | `Kullo Golf` | `Kullo Golf Club` | Site kullogolf.fi title "Etusivu \| Kullo Golf", footer "© Kullo Golf". Legal entities are "KGC Ry" and "Kullo Golf Oy" separately. |
| 7 | `Master Golf` | `Master Golf Club` | Site mastergolf.fi title "Master Golf \| Master Golf", no "Club" suffix in branding. |
| 8 | `Pickala Golf` | `Pickala Golf Club` | Site pickalagolf.fi footer "Pickala Golf, Golfkuja 5, 02580 Siuntio". Navigation section titled "Pickala Golf". |
| 9 | `Virpiniemi Golf` | `Virpiniemi Golf Club` | Site virpiniemigolf.fi footer "Virpiniemi Golf, Virpiniementie 501". "Virpiniemi Golf Club Ry" is one of two legal structures; primary brand is "Virpiniemi Golf". |

## SUMMARY

- Recommended renames: **2 high-confidence, 1 medium-confidence** (3 total)
- Keep as-is: **6** (SGL uses legal-entity forms, clubs market with shorter names)

Next: batch 2 covers the 36 coordinate-matches where the DB name differs notably from the SGL name (e.g. "Iitti Golf" vs "Iitin Golfseura", "HIFK Golf - Paloheinä" vs "HIFK Golf"). Those need per-club verification because some coord-matches are false positives (e.g. "GolfStar Kurk Golf" landed on "Vuosaari Golf" 1km away — "Kurk Golf" is actually in the SGL-missing list).
