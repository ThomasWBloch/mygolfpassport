# France Pass 2a — ffgolf federation + OSM

Session 32 (2026-05-05). Federation-first 2-source pipeline (genbrug af AT/BE).

## Status før Pass 2a

- 914 rows / 599 distinct klubber, 100% coords (Session 23 ferdig)
- Website: 408 rows / 377 klubber = 62.9% klub-niveau
- Phone: 0% (helt åbent)
- Email: 0% (helt åbent)

## Datakilder

**ffgolf.org** (Fédération Française de Golf) — 747 klubber i sitemap, detail-pages eksponerer phone, email, website, address og lat/lon i struktureret HTML. Direkte curl virker (Session 23's localStorage-stunt unødvendig — det var en arkitektur-detalje, ikke en data-detalje).

**OpenStreetMap** (Overpass) — ~1149 elementer, 363 website / 169 phone / 89 email. Bruges som fallback for ffgolf-orphans.

## Kør-rækkefølge

```bash
# 0. backup (sikkerhed)
node --env-file=.env.local scripts/france/backup-france.mjs

# 1. scrape ffgolf — ~20 min med 1.5s rate-limit (747 fetches)
node scripts/france/scrape-ffgolf-france.mjs

# 2. scrape OSM — ~30 sek
node scripts/france/scrape-france-osm.mjs

# 3. match begge mod DB
node --env-file=.env.local scripts/france/match-france.mjs

# 4. review france-match-report.md før apply
```

## Reparse uden refetch

Hvis parser-fix opdages efter scrape:

```bash
node scripts/france/scrape-ffgolf-france.mjs --reparse
```

Læser raw-ffgolf/*.html og kører parser på dem uden refetch.

## Match-thresholds

- **High**: dist≤250m+sim≥0.7 ELLER sim≥0.9 ELLER boostedSim≥0.95+boost>0
- **Medium**: dist≤500m+sim≥0.6 ELLER sim≥0.8 ELLER boostedSim≥0.85+boost>0
- **Low**: dist≤1500m+sim≥0.5 ELLER sim≥0.7 ELLER boostedSim≥0.75+boost≥0.4
- **Orphan**: ingen ffgolf-match (forventet ~80-150 klubber)

Trust hierarki: ffgolf > OSM > DB (Golfapi).

## Forventet outcome

Sammenligneligt med Belgium-pattern (golf.be):

- Website klub-niveau: 62.9% → ~85-90%
- Phone klub-niveau: 0% → ~80%
- Email klub-niveau: 0% → ~80%
