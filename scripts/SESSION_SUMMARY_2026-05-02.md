# UK + Ireland Pass 1 session summary (2026-05-01/02)

## Coord fixes applied

| Country | Clubs | Course rows | Auto-fix bucket |
|---|---:|---:|---|
| Ireland (ROI + NI) | 73 + 1 (Mount Juliet manual) | 82 | 27 high + 46 medium-consensus + 1 manual |
| Scotland | 13 | 15 | 4 high + 9 medium-consensus |
| Wales | 2 | 2 | 1 high + 1 medium-consensus |
| **Total** | **89** | **99** | — |

## Worst single fixes

- **Lakeside Golf Club** (Wales): 270 km off — was in Cambridgeshire (England), now South Wales
- **Brecon Golf Club** (Wales): 186 km off — was in Manchester area, now Powys
- **Royal Curragh Golf Club** (Ireland): 182 km off
- **Killeen Castle** (Ireland): 160 km off
- **Uphall Golf Club** (Scotland): 155 km off — was in Northumberland (England), now West Lothian

## Ireland Pass 2 forsmag (websites + addresses)

| Field | Clubs | Notes |
|---|---:|---|
| website | 91 | 49 høj-conf + 42 medium-conf, batchwise review |
| address | 4 | Kun hvor DB-adresse var "-" eller manglede |
| phone | 0 | Applied i Batch 1 men reverted (Thomas droppede phone fra scope) |

## Key findings

1. **3 føderationer = samme Terraces CMS** (Ireland, Scotland, Wales). Endpoint `POST /api/clubs/FindClubs` med `{Page:1,PageSize:1000}` virker identisk.
2. **Ireland's geocoding er historisk ringe** — 17% af klubber havde DB-coord-fejl vs Scotland/Wales' 2%.
3. **UK OSM website-coverage = 90%** vs Ireland's 25% — Pass 2 bliver meget hurtigere for UK.
4. **St. Andrews-fallback bug:** 5 Scotland-klubber havde præcis (56.3435, -2.8024) som geocoding-fallback.

## Manual review queues per country

- Ireland: 33 (typos + bad URLs + no-match)
- Scotland: 76 flagged + 114 no-source-match
- Wales: 18 flagged + 45 no-source-match (53% no-match — usædvanligt højt, mest non-canonical names)

## Næste skridt

England Pass 1 er klar. Scripts ligger i `scripts/england/`:
- `backup-england.mjs` (2.671 courses / 2.035 distinct clubs)
- `scrape-england-osm.mjs` (GB-query med England-bbox + addr:country=GB-ENG)
- `fetch-eg-clubs.mjs` (prøver englandgolf.org/api/clubs/FindClubs — Terraces-formodet, ikke verificeret)
- `audit-england-coords.mjs` (single-source-tolerant)
- `apply-england-coords.mjs` (high + medium-consensus)

Anbefaling: kør i ny session post-token-reset. England's 2.035 klubber kræver flere review-rundetures end de tre tidligere lande.
