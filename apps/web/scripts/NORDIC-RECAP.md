# Nordic club-data cleanup — Norge, Sverige, Finland

Arbejde udført via de nationale golfforbunds egne websites som primær kilde. **Ingen GolfAPI-credits brugt** til disse tre lande — al metadata (klubnavn, adresse, website, telefon, koordinater) hentet gratis fra forbundet.

## Resultat per land

| Land | Forbund | Courses | Klubber | Adresse | Website | Koord | Batches |
|---|---|---:|---:|---:|---:|---:|---|
| 🇳🇴 Norge | NGF (golfforbundet.no) | 166 | 137 | 166 (100 %) | 156 (94 %) | 166 (100 %) | 3 |
| 🇸🇪 Sverige | SGF (golf.se) | 707 | 437 | 706 (≈100 %) | 601 (85 %) | 707 (100 %) | 9 |
| 🇫🇮 Finland | SGL (golf.fi) | 285 | 157 | 282 (99 %) | 257 (90 %) | 284 (100 %) | 4 |

Dækningen af website i Sverige/Finland er lavere fordi ikke alle klubber er forbundsmedlemmer (fx små P&P-baner, private klubber, Holiday Club-resorts). Koordinater er 100 % da de var komplette inden cleanup.

## Ændringer per land

| Land | Klub-renames | Sletninger | Merges | Imports | Primære fund |
|---|---:|---:|---:|---:|---|
| 🇳🇴 Norge | ~20 | få | få | 0 | Gennemgående "Golfklubb" vs. "Golf Club" (norsk form vinder når klubbens eget site bruger det) |
| 🇸🇪 Sverige | mange | få | få | 0 | Svensk staveform som klubben selv bruger vinder over SGF's formelle registrering |
| 🇫🇮 Finland | 44 | 29 | 4 | 0 | SGL's embedded JSON på `/pelaajalle/kenttaopas/` gav komplet data på én URL. 20 disc-golf/frisbee-golf/simulator-rækker slettet. 2 SGL-klubber vurderet uegnede (indoor-hal, klub uden finsk bane) |

## Metode — reusable playbook per land

Denne fremgang kan gentages for alle resterende lande hvor der findes et nationalt forbund med en klub-liste online.

1. **Check scraping-regler først**
   Hent `robots.txt` på forbundets domæne. Tjek ToS. De tre nordiske forbund tillader alle scraping af offentlige klub-lister.

2. **Find klub-listen**
   Typiske URL-mønstre: `/kentat`, `/klubbar`, `/seurat`, `/banguide`, `/kenttaopas`. Kig efter embedded JSON (Finland), server-rendered tabel (Norge/Sverige), eller WP-sitemap-entries.

3. **Scrape + normaliser**
   Ét script der dumper til `<country>-clubs-<forbund>.json` med navn, adresse, by, postnummer, website, telefon, email og koordinater. Én kørsel; ingen API-credits.

4. **Match DB mod forbund**
   Klassificer hver DB-klub som:
   - *Exact match* (intet at gøre)
   - *Normalized match* (små staveforskelle — fx possessiv `-n`-suffix på finsk, `Golfklubb` vs `Golf Club` på norsk)
   - *Koordinat-match* (samme sted, andet navn — fx `HIFK Golf - Paloheinä` → `HIFK Golf`)
   - *DB-only* (ikke medlem — keep, delete, eller investigate)
   - *Forbund-only* (missing from DB — import)

5. **Rename-batches**
   Skriv markdown-batch-fil per gruppe (typisk 30-50 klubber). For hver: **klubbens eget website slår forbundet** når de er uenige. Høj-/medium-/lav-konfidens inddeling. Kør rename-scripts efter user-approval.

6. **Slet non-golf / junk**
   Disc-golf, frisbee-golf, ice-golf, snow-golf, simulator-rækker hører ikke hjemme i golf-databasen. Placeholder-rækker ("Pete", "omn", tomme adresser) er data-junk.

7. **Import manglende klubber**
   Kun klubber med reel udendørs bane. Sæt `ry`, `AS`, `Oy` osv. udenfor klubnavn — det er juridisk entity-form, ikke brand.

8. **Fyld adresse + website + telefon**
   Fra forbundets JSON. Conservative policy: overskriv *ikke* eksisterende adresser, *overskriv* website når DB er tom.

## Vigtige regler (fra feedback memory)

- **Klubbens eget website slår forbundet** når de er uenige om staveform. Eksempel: SGF siger `Värnamo Golfklubb`, men hvis `varnamogolf.se` bruger `Värnamo Golf` overalt i header/footer/breadcrumb, bruger vi `Värnamo Golf`.
- **Rigtig forbund per land** — DGU (DK), SGF (SE), NGF (NO), SGL (FI), GSÍ (IS), England Golf (EN). Undgå at citere "DGU" i svenske analyser.
- **GolfAPI-credits er total-budget, ikke per-call** — 0.1 credit max = 0.1 credit ialt. Men for forbund-baseret cleanup bruger vi aldrig GolfAPI.
- **Check `scripts/` før nye scripts** — `reimport-country.mjs` håndterer både fresh imports og reimports. Dubletter koster både credits og tid.

## Resterende arbejde i Norden

- **Sverige:** Tureholm / Övertorneå Golf check — den svenske bane brugt af finske Aavasaksa Golf — er den i DB?
- **Finland:** 25 små non-SGL-klubber uden website (Bogey, Ladun maja, Pellonnokka mfl.) — har alle koordinater, stopper her per user-regel.
- **Island:** ikke påbegyndt (GSÍ, golf.is).
