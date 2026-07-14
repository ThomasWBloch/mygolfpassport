# Norwegian golf club name verification — batch 3 / FINAL (clubs 101–139)

Generated 2026-04-17.

## HIGH-CONFIDENCE CORRECTIONS (12)

| # | Current | Suggested | Reason |
|---|---|---|---|
| 108 | `Sola Golf Club` | `Sola Golfklubb` | Site solagk.no uses Norwegian form "Sola Golfklubb" throughout. See also FLAGGED — #109 is same organisation |
| 111 | `Solum Golf Club` | `Solum Golfklubb` | Site solumgolf.club / "solum-golfklubb" in header uses Norwegian form "Solum Golfklubb" |
| 112 | `Soon Golf Course` | `Soon Golfklubb` | Site soongolf.no uses "Soon Golfklubb" (formal Norwegian form); "Golf Course" is a mislabelling |
| 113 | `Sorknes Golf club` | `Sorknes Golfklubb` | Lowercase "c" + English form; site sorknesgk.no uses "Sorknes Golfklubb" |
| 117 | `Stjørdal Golf Club` | `Stjørdal Golfklubb` | Site stjordal.golf uses Norwegian form "Stjørdal Golfklubb" |
| 118 | `Stord Golf Park` | `Stord Golfklubb` | Site stordgolf.com explicitly uses "Stord Golfklubb" (header/footer/copyright). "Stord Golfpark" is a separate minigolf/facility entity |
| 120 | `Sunnfjord Golfclub` | `Sunnfjord Golfklubb` | Site sunnfjordgk.no / sunnfjord-golfklubb.no uses Norwegian form "Sunnfjord Golfklubb" |
| 123 | `Tromsø Golf Club` | `Tromsø Golfklubb` | Site tromsogolf.com uses Norwegian form "Tromsø Golfklubb" consistently |
| 126 | `Tyrifjord Golf Club` | `Tyrifjord Golfklubb` | Site tyrifjord-golfklubb.no uses Norwegian form "Tyrifjord Golfklubb" |
| 129 | `Ullensaker Golf As` | `Ullensaker Golfklubb` | Site ugk.no uses "Ullensaker Golfklubb" (formal sporting club name); "As" is corporate suffix and incorrectly capitalised |
| 134 | `Vesterålen golfbane` | `Vesterålen Golfklubb` | Site vestgolf.com uses "Vesterålen Golfklubb" (club, founded 1999); "golfbane" means "golf course" and is lowercase |
| 135 | `Vestfold Golf Club` | `Vestfold Golfklubb` | Site vgk.no uses Norwegian form "Vestfold Golfklubb" (founded 1958, Vear) |

## MEDIUM-CONFIDENCE CORRECTIONS (3)

- #110 `Solnør Gaard Golfbane AS` → see FLAGGED — same organisation as #139 Ålesund Golfklubb; Solnør Gaard is the course name, not a separate club
- #128 `Tønsberg Golfklubb` — already correct (batch 2 renamed "re Golf" → "Tønsberg Golfklubb"). Verify this is not a duplicate row; if #128 and the batch-2 renamed row refer to the same DB row then no change. Site tonsberggolf.no confirmed.
- #130 `Utsikten Golfpark` — already correct (batch 2 renamed "Kvinesdal og omegn golfklubb" → "Utsikten Golfpark"). Same dedup check as #128. Site utsiktengolf.no confirmed.
- #137 `Voss Golf og Aktivitetspark` → `Voss Golfklubb` (or keep as-is). Site vossgolf.no uses "Voss Golf" as brand but official club registration is Voss Golfklubb. "Voss Golf og Aktivitetspark" is the facility name. Acceptable either way; recommend `Voss Golfklubb` for consistency.

## FLAGGED (3 — duplicates / organisational issues)

- **#109 `Sola Golfklubb, Solastranden` — DUPLICATE of #108.** Site solagk.no confirms Sola Golfklubb and Solastranden Golfklubb merged; Sola Golfklubb now operates both Forus and Solastranden courses under one club. #109 is a course (Solastranden), not a separate club. Recommend: **delete #109 or merge into #108 Sola Golfklubb.** Solastranden should be a course row, not a club row.
- **#110 `Solnør Gaard Golfbane AS` — DUPLICATE of #139 Ålesund Golfklubb.** Site aalesundgk.no/english/about-solnor-gaard-golf-course confirms Solnør Gaard Golfbane is the course operated by Ålesund Golfklubb. "AS" suffix indicates corporate entity only. Recommend: **delete #110 or merge into #139.** Solnør Gaard should be a course row under Ålesund Golfklubb.
- **#127 `Tysnes Golfklubb` — NO DEDICATED WEBSITE.** Club exists (6-hole + 18-hole Pitch & Putt at Uggdal, Hordaland), Facebook page exists as "DalenGolfklubb" which is unusual. Name confirmed via tourism listings, but site presence weak. Not a rename — just note uncertainty on operational status.

## NO CHANGE NEEDED (24)

Sandefjord Golfklubb · Sandnes Golfklubb · Sauda Golfklubb · Selbu Golfklubb · Selje Golfklubb · Ski Golfklubb · Skjeberg Golfklubb · Stavanger Golfklubb · Stiklestad Golfklubb · Stranda Golfklubb · Sunnmøre Golfklubb · Tjøme Golfklubb · Trondheim Golfklubb · Trysil Golfklubb · Tønsberg Golfklubb (if already renamed per batch 2) · Utsikten Golfpark (if already renamed per batch 2) · Valdres Golfklubb · Vanylven Golfklubb · Varanger Golfklubb · Vildmarken Golfklubb · Østmarka Golfklubb · Ålesund Golfklubb

## Category counts

- HIGH: 12
- MEDIUM: 4
- FLAGGED (duplicate/special): 3
- NO CHANGE: ~24

## Notes

- **Sola merger:** Sola Golfklubb + Solastranden Golfklubb merged. Now Sola Golfklubb operates 3 courses (Forus 18, Solastranden 18, Forus short courses) under one membership. Both #108 and #109 refer to the same club.
- **Ålesund / Solnør Gaard:** One club (Ålesund Golfklubb) operating Solnør Gaard Golfbane as its 18-hole course, plus a smaller 6-hole training facility near Ålesund city.
- **Sandnes Golfklubb** plays at Bærheim Golfpark (the facility) — site sandnesgolfklubb.no.
- **Sandefjord Golfklubb** — site branded "Sandefjord Golf" but formal club name is Sandefjord Golfklubb ("SGK").
- **Valdres Golfklubb** — site valdresgolf.no brands "Valdres Golf" but registered as Valdres Golfklubb.
- **Voss Golf og Aktivitetspark** — site vossgolf.no; facility also uses "Voss Golfbaner" in footer. Registered club: Voss Golfklubb.
- **Vildmarken Golfklubb** — no dedicated website found. Name confirmed via directory listings (Albrecht, Yelp, Bergen byleksikon). Founded 2000, opened 2004 in Øvredalen, Os.
- **Varanger Golfklubb** — site varangergolf.no only on http (not https).
- **Trondheim Golfklubb** — uses unusual domain golfklubben.no; beware of "trondheim.golf" which is a separate indoor golf centre.
- **Stavanger Golfklubb** — no dedicated website domain confirmed in search; club exists (founded 1956, Hafrsfjord), presence confirmed via Instagram @stavangergk and directories. URL omitted from JSON.
- **Tysnes Golfklubb** — no dedicated website found. URL omitted from JSON.
- **Vildmarken Golfklubb** — no dedicated website found. URL omitted from JSON.
- **Tønsberg Golfklubb / Vestfold Golfklubb** — these are two DIFFERENT clubs both in Vestfold. Tønsberg uses Re Golfbane at Ramnes; Vestfold (founded 1958) uses Vear near Tønsberg. Do not merge.
