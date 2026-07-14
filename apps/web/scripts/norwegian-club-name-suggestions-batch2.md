# Norwegian golf club name verification — batch 2 (clubs 51–100)

Generated 2026-04-17.

## HIGH-CONFIDENCE CORRECTIONS (13)

| # | Current | Suggested | Reason |
|---|---|---|---|
| 52 | `Karasjok / Kárášjohka Golfklubb` | `Karasjok Golfklubb` | Site karasjokgolf.no uses plain "Karasjok Golfklubb" in header/footer; Sami form only appears as translation |
| 55 | `Klas Lønne` | `Lønne Golfklubb` *(see FLAGGED — club likely closed)* | Real club name is "Lønne Golfklubb" at Lønne in Sannidal (Kragerø); "Klas" appears to be a corruption. Wikipedia marks club 2003–2019 |
| 58 | `Kongsvinger Golfklubb` | `Kongsvingers Golfklubb` | Site kongsvingergolf.no uses genitive-s form "Kongsvingers Golfklubb" throughout |
| 62 | `Kvinesdal og omegn golfklubb` | `Utsikten Golfpark` | Club rebranded; site utsiktengolf.no uses "Utsikten Golfpark" (formerly Kvinesdal & Omegn Golfklubb) |
| 66 | `Lillestrom Golfklubb` | `Lillestrøm Golfklubb` | Missing ø. Site lilgk.no uses "Lillestrøm Golfklubb" |
| 68 | `Lommedalen Golf Club` | `Lommedalen Golfklubb` | Site lommedalengk.no uses Norwegian form "Lommedalen Golfklubb" |
| 72 | `Miklagard Golf club` | `Miklagard Golf` | Site miklagardgolf.no brands itself as "Miklagard Golf" (not Golfklubb; "club" is casing error) |
| 78 | `Narvik Golf Club` | `Narvik Golfklubb` | Norwegian form; Facebook and directory listings use "Narvik Golfklubb" (also "Narvik Golfklubb – Skjomen Golfpark") |
| 83 | `Nordvegen Golf Course` | `Nordvegen Golfklubb` | Site nordvegengolf.no + listings use "Nordvegen Golfklubb" |
| 84 | `Norefjell golfklubb` | `Norefjell Golfklubb` | Capitalisation — site norefjell-golf.no uses "Norefjell Golfklubb" |
| 89 | `Oppdal Golklubb` | `Oppdal Golfklubb` | Typo — missing "f". Site oppdalgolfklubb.no |
| 93 | `Polarsirkelen Golf` | `Polarsirkelen Golfklubb` | Formal club name is "Polarsirkelen Golfklubb" per listings; site uses "Polarsirkelen Golf" as brand but club is Golfklubb |
| 97 | `re Golf` | `Tønsberg Golfklubb` | Club was renamed from "Re Golfklubb" to "Tønsberg Golfklubb"; site tonsberggolf.no — club still plays Re Golfbane (near Ramnes, matches the 59.35/10.25 coords) |
| 99 | `Romerike Golfklubb` (trailing tab) | `Romerike Golfklubb` | Strip trailing whitespace |

## MEDIUM-CONFIDENCE CORRECTIONS (5)

- #59 `Kragerø Golf AS` → `Kragerø Golfklubb` (site kragk.no uses "Kragerø Golfklubb"; "AS" suffix is the corporate entity, not the sporting club name)
- #71 `Meland Golf Club` → `Meland Golfklubb` (site melandgolf.no uses both "Meland Golf" brand and "melandgolfklubb" in URL/org; formal name is Meland Golfklubb)
- #77 `Mørk Golfklubb` → `Mørk golfklubb` (site morkgolf.no uses lowercase "g" — "Mørk golfklubb" — though both appear). Current capitalised form is fine; keep if preferring consistent capitalisation.
- #80 `Nesfjellet Golfklubb` → `Nesfjellet Golf` (site nesfjellet.no brands it "Nesfjellet Golf"; formal registration is Nesbyen Golfklubb, but public-facing name is Nesfjellet Golf). **Flag as ambiguous.**
- #85 `Norsjø Golfpark AS` → `Norsjø Golfklubb` (site golfparken.no uses "Norsjø Golfklubb" as org name; "Norsjø Golfpark" is the facility/park; "AS" is corporate suffix)
- #86 `Nøtterøy GK` → `Nøtterøy Golfklubb` (full form; site notteroygolf.no uses "Nøtterøy Golfklubb". Note also: site domain uses "golf", not "golfklubb")
- #88 `Onsøy GK` → `Onsøy Golfklubb` (site onsoygolfklubb.no uses "Onsøy Golfklubb")
- #90 `Oppegård GK` → `Oppegård Golfklubb` (site oppegardgk.no uses "Oppegård Golfklubb")
- #57 `Kongsberg GK` → `Kongsberg Golfklubb` (site kongsberggolf.no — domain differs. Note: site title actually says "Kongsberg Golfbane"; club entity is Kongsberg Golfklubb)

## FLAGGED (3)

- **#55 `Klas Lønne` — LIKELY CLOSED.** Wikipedia marks Lønne Golfklubb / Lønne golfbane with "2003–2019" use period and "(closed?)" annotation. Facebook page exists but no recent activity signal found. If corrected to `Lønne Golfklubb`, recommend verifying operational status before keeping in active DB. The "Klas" prefix is inexplicable — appears to be data corruption.
- **#74 `Modum Golfklubb` — CLOSED.** TeeOff.no lists it as "Nedlagt!" (shut down). No working official website. Only contact is golf@modum.net. Recommend marking closed / removing from active DB.
- **#76 `Moss & Rygge Golfklubb` — DUPLICATE RISK.** Batch 1 renamed `Evje Golfpark` → `Moss & Rygge Golfklubb`. Site evjegolf.no is the single club — one membership, one 18-hole course at Evjesund. If #76 in batch 2 is the same row (same facility / ~59.47, 10.79 area), it IS the same entity as the renamed row and should be deduplicated. Verify by coordinates: if both rows resolve to Evje Golfpark / Larkollen / Moss, they are the same — keep one, delete the other. If #76 is a different Moss/Rygge facility (unlikely — there is no second Moss/Rygge golf club), confirm via coordinates.

Additionally:
- **Karasjok Golfklubb** was stripped of national NGF player rights effective 2026-01-01 (over 4,600 members had to transfer). The club still exists and operates with local playing rights. Not closed, but notable.

## NO CHANGE NEEDED (30)

Jæren Golfklubb · Karmøy Golfklubb · Kjekstad Golfklubb · Klæbu Golfklubb · Kragerø Golfklubb (if AS stripped) · Kristiansand Golfklubb · Krokhol Golfklubb · Kvitfjell Golf · Land Golfklubb · Larvik Golfklubb · Lofoten Links · Losby Golfklubb · Mandal Golfklubb · Mjøsen Golfklubb · Molde Golfklubb · Mørk Golfklubb (if preferred capitalisation) · Nes Golfklubb · Nordfjord Golfklubb · Nordhaug Golfklubb · Ogna Golfklubb · Oslo Golfklubb · Oustøen Country Club · Preikestolen Golfklubb · Randaberg Golfklubb · Rauma Golfklubb · Ringerike Golfklubb · Romerike Golfklubb · Røros Golfklubb · Karasjok Golfklubb (if simplified from Sami-prefixed form) · Tønsberg Golfklubb (if #97 renamed)

## Category counts

- HIGH: 13
- MEDIUM: 9
- FLAGGED (closure/duplicate/special): 3
- NO CHANGE: ~30

## Notes

- `Kvitfjell Golf` — site kvitfjell.no uses "Kvitfjell Golf" (not Golfklubb). Org name is just "Kvitfjell Golf". Keep as-is.
- `Lofoten Links` — site lofotenlinks.no uses "Lofoten Links" as full name. Keep as-is.
- `Oustøen Country Club` — site occ.no, private club, name confirmed.
- `Land Golfklubb` — no dedicated website found; uses 3rd-party booking. Name confirmed via directory listings.
- `Narvik Golfklubb` — no dedicated website; best presence is Facebook.
- `Modum Golfklubb` — closed.
- `Lønne Golfklubb` — likely closed (2003–2019 per Wikipedia).
