# Italy match report
Generated: 2026-05-04T12:41:06

2-source: OSM + LC. Per-felt-confidence per kilde. (FIG dead end — confirmed via 3 probes.)
Scope: website (OSM), phone (LC→OSM). Address/coords/email skippet (DB allerede god / kolonne mangler).

## Summary

| Bucket | Clubs | Courses |
|---|---:|---:|
| High conf | 5 | 7 |
| Medium conf | 1 | 1 |
| Low conf | 0 | 0 |
| Review (coord-audit kandidat) | 189 | 293 |
| Review (DB allerede fuld) | 73 | 146 |
| No match | 33 | 37 |

## Field-fill projection

| Field | Clubs | Courses |
|---|---:|---:|
| website | 2 | 2 |
| phone | 6 | 8 |

## High confidence (recommended to apply)

### Golf Club Cervino (Italy, 1 courses)

- DB: lat=45.9361125492592, lon=7.62883734931431, website=null, phone=null
- OSM (low, 25m, sim=0.438): name="Golf Club del Cervino - Ingresso", website=null, phone=null, email=null
- LC  (high, 197m, sim=1): name="Golf Club Del Cervino", phone="+39 (0)166 949131", region="Aosta Valley", percorsi=7.8(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from lc(high, 197m, sim=1)
```sql
UPDATE courses SET
  phone = '+39 (0)166 949131'
WHERE id IN (
  'cae6c915-306a-4ebf-b6ec-23e5e77560ea'
);
```

### Golf Club Punta Ala (Italy, 1 courses)

- DB: lat=42.8000061493389, lon=10.7707113426697, website=null, phone=null
- OSM (high, 212m, sim=0.75): name="Punta Ala GC", website=null, phone=null, email=null
- LC  (high, 193m, sim=1): name="Golf Club Punta Ala", phone="+39 0564 922121", region="Tuscany", percorsi=Punta Ala(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from lc(high, 193m, sim=1)
```sql
UPDATE courses SET
  phone = '+39 0564 922121'
WHERE id IN (
  'eac1b559-a38d-4fb5-aa1c-f5f4b88c64cc'
);
```

### Golf Club Valdichiana (Italy, 1 courses)

- DB: lat=43.2198024842619, lon=11.8193469040933, website=null, phone=null
- OSM (high, 102m, sim=1): name="Golf Club Valdichiana", website="https://www.golfclubvaldichiana.it/", phone="+39 0577 624439", email=null
- LC  (high, 108m, sim=0.818): name="Golf Club Val di Chiana", phone="0039 0577 624439", region="Tuscany", percorsi=Golf Club Valdichiana(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 102m, sim=1)
  - phone: from lc(high, 108m, sim=0.818)
```sql
UPDATE courses SET
  website = 'https://www.golfclubvaldichiana.it/',
  phone = '0039 0577 624439'
WHERE id IN (
  '83afa559-2e3f-449c-bdc4-dfd6d8eabf6d'
);
```

### Golf Continental Verbania (Italy, 3 courses)

- DB: lat=45.9479998084213, lon=8.47572585440781, website=null, phone=null
- OSM (low, 126m, sim=0.6): name="Golf & Sporting Club Verbania", website="http://www.golfverbania.it", phone="+39 0323 80800; +39 3402198005; +39 0323 800854", email="info@golfverbania.it"
- LC  (high, 26m, sim=1): name="Golf Continental Verbania", phone="+39 323 80800", region="Piedmont", percorsi=Golf & Sporting Club Verbania(9)

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - phone: from lc(high, 26m, sim=1)
```sql
UPDATE courses SET
  phone = '+39 323 80800'
WHERE id IN (
  '0ba0067b-b792-40a6-9d3d-0382f1251192',
  '5a599c72-27be-4184-879c-d73402374790',
  'bc9fac7d-e342-456e-b4f8-50afe6eb1437'
);
```

### Ugolino Golf Club (Italy, 1 courses)

- DB: lat=43.6975547526125, lon=11.2965829389365, website=null, phone=null
- OSM (low, 78m, sim=0.583): name="Golf dell'Ugolino", website=null, phone=null, email=null
- LC  (high, 57m, sim=1): name="Circolo Golf Ugolino", phone="+39 055 2301009", region="Tuscany", percorsi=Firenze Circolo Golf Ugolino(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from lc(high, 57m, sim=1)
```sql
UPDATE courses SET
  phone = '+39 055 2301009'
WHERE id IN (
  '0c398b53-10b1-41ef-b78b-9e38d0952189'
);
```

## Medium confidence (review before applying)

### I Girasoli Golf Club (Italy, 1 courses)

- DB: lat=44.857810375997, lon=7.81772658133006, website=null, phone=null
- OSM (medium, 454m, sim=1): name="Golf Club I Girasoli", website="https://www.girasoligolf.it/", phone="+39 011 979 5088", email="info@girasoligolf.it"
- LC  (high, 62m, sim=1): name="Golf Club I Girasoli", phone="+39 (0)11 9795088", region="Piedmont", percorsi=8.0(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 454m, sim=1)
  - phone: from lc(high, 62m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.girasoligolf.it/',
  phone = '+39 (0)11 9795088'
WHERE id IN (
  'b30e0c07-c4fa-413f-a5ef-9d28763dcf5d'
);
```

## Low confidence (manual decision)

## Review — coord-audit kandidater

Match fundet i OSM/LC, men kun ved low conf — typisk fordi DB-coords er off med >1km.
Marco Simone-mønstret: navn matcher 1:1, gadeadresse identisk, men DB-coord er forkert.
Disse skal cross-checkes af audit-italy-coords.mjs (næste tur).

### Abano Golf (Italy, 1 courses)

- DB: lat=45.3652399, lon=11.7959957, website=null, phone=null
- OSM (high, 96m, sim=1): name="Abano Golf", website=null, phone=null, email=null
- LC  (no-match, 217962m, sim=0.5): name="Golf Club Ambrosiano", phone="+39 (0)39 6887124", region="Lombardy", percorsi=8.2(18)

### Adriatic Golf Club Cervia (Italy, 9 courses)

- DB: lat=44.2868132, lon=12.3381495, website=null, phone=null
- OSM (high, 223m, sim=1): name="Adriatic Golf Club Cervia", website=null, phone=null, email=null
- LC  (low, 820m, sim=1): name="Adriatic Golf Club Cervia", phone="+39 (0)544 992786", region="Emilia-Romagna", percorsi=Red & Blue (Rosso & Blu)(18)

### Ai Colli di Bergamo Golf (Italy, 1 courses)

- DB: lat=45.6965575, lon=9.6286839, website=null, phone=null
- OSM (low, 345m, sim=0.25): name="Golf Club Parco Dei Colli", website=null, phone=null, email=null
- LC  (no-match, 144121m, sim=0.563): name="Golf Club Colli Berici", phone="+39 0444 601780", region="Veneto", percorsi=Golf Club Colli Berici S.R.L. Ssd(18)

### Alisei Golf & Country Club (Italy, 1 courses)

- DB: lat=43.9308422, lon=10.2303839, website="http://www.golfalisei.it", phone=null
- OSM (medium, 397m, sim=1): name="Alisei Golf & Country Club", website="http://www.golfalisei.it", phone=null, email=null
- LC  (low, 477m, sim=0.333): name="Alisei Golf & Country Club Pietrasanta", phone="+39 (0) 584 1810181", region="Tuscany", percorsi=Golfalisei Golf Course(6)

### Allegroitalia Siracusa Golf Monasteri (Italy, 1 courses)

- DB: lat=37.0498869, lon=15.1468894, website=null, phone=null
- OSM (low, 305m, sim=0.344): name="I Monasteri Golf & Spa", website="https://www.wyndhamhotels.com/dolce/siracusa-italy/dolce-siracusa-i-monasteri-golf-and-spa/overview", phone="+39 0931 1760043", email=null
- LC  (low, 239m, sim=0.438): name="Borgo di Luce I Monasteri Golf Resort & SPA", phone="+39 0931 184 9044", region="Sicily", percorsi=I Monasteri(18)

### Antognolla Golf (Italy, 1 courses)

- DB: lat=43.2239714, lon=12.3277329, website=null, phone=null
- OSM (low, 1193m, sim=1): name="Antognolla Golf", website=null, phone=null, email=null
- LC  (low, 3224m, sim=1): name="Antognolla Golf Club", phone="+39 075 5842008", region="Umbria", percorsi=9.0(18)

### Arenzano (Italy, 1 courses)

- DB: lat=44.3973864, lon=8.6775322, website=null, phone=null
- OSM (low, 467m, sim=0.364): name="Golf & Tennis Club Pineta di Arenzano", website="https://www.golfarenzano.com/", phone="+39 010 9111 817", email="segreteria@golfarenzano.com"
- LC  (low, 26m, sim=0.533): name="Golf della Pineta di Arenzano", phone="+39 0104714220 / +39 320 6329026", region="Liguria", percorsi=Golf Club Arenzano(9)

### Argentario Golf Club (Italy, 1 courses)

- DB: lat=42.4214361, lon=11.1892741, website=null, phone=null
- OSM (medium, 451m, sim=1): name="Argentario Golf Club", website=null, phone=null, email=null
- LC  (low, 707m, sim=0.526): name="Argentario Golf & Wellness Resort", phone="+39 0564 888 525", region="Tuscany", percorsi=Argentario golf course(18)

### Arona (Italy, 5 courses)

- DB: lat=45.7094197, lon=8.5808962, website=null, phone=null
- OSM (low, 1108m, sim=1): name="Arona Golf Club", website="http://www.aronagolf.it/", phone=null, email=null
- LC  (low, 18610m, sim=1): name="Arona Golf Club", phone="+39 321907034", region="Piedmont", percorsi=7.0(9)

### Barolo Golf Club (Italy, 2 courses)

- DB: lat=41.963316, lon=12.6401473, website=null, phone=null
- OSM (low, 375m, sim=0.333): name="Marco Simone Golf and Country Club", website="https://www.golfmarcosimone.com", phone=null, email=null
- LC  (low, 597m, sim=0.333): name="Marco Simone Golf & Country Club", phone="+39 0774 366469", region="Lazio", percorsi=Campionato (Championship Course)(18)

### Bogliaco Golf Resort (Italy, 1 courses)

- DB: lat=45.6656032, lon=10.6445137, website=null, phone=null
- OSM (low, 664m, sim=1): name="Golf Bogliaco", website="https://www.golfbogliaco.com/", phone="+39 0365 643006", email="info@golfbogliaco.com"
- LC  (low, 600m, sim=1): name="Golf Bogliaco", phone="+39 0365 643006", region="Lombardy", percorsi=Circolo Del Golf Bogliaco(18)

### Bormio golf club (Italy, 1 courses)

- DB: lat=46.4692482, lon=10.3721712, website=null, phone=null
- OSM (low, 843m, sim=1): name="Bormio Golf club", website=null, phone=null, email=null
- LC  (low, 3475m, sim=1): name="Golf Club Bormio", phone="+39 342 910730", region="Lombardy", percorsi=7.3(9)

### Break Point Golf Club (Italy, 1 courses)

- DB: lat=46.0713875, lon=11.2218966, website=null, phone=null
- OSM (medium, 440m, sim=1): name="Break Point Golf Club ASD", website=null, phone=null, email=null
- LC  (no-match, 178524m, sim=0.462): name="Green Club Lainate", phone="+39 02 9370869", region="Lombardy", percorsi=7.0(18)

### bricch golf (Italy, 1 courses)

- DB: lat=45.6480635, lon=9.1212095, website=null, phone=null
- OSM (high, 14m, sim=1): name="Bricch golf", website=null, phone=null, email=null
- LC  (no-match, 1244m, sim=0.2): name="Barlassina Country Club", phone="+39 (0)362 560621", region="Lombardy", percorsi=Barlassina(18)

### Buena Vista Social Golf (Italy, 1 courses)

- DB: lat=45.774281, lon=9.2130426, website=null, phone=null
- OSM (medium, 265m, sim=1): name="Buena Vista Social Golf", website=null, phone=null, email=null
- LC  (no-match, 142685m, sim=0.389): name="Golf del Ducato - La Rocca", phone="+39 0521 834037 ", region="Emilia-Romagna", percorsi=8.3(18)

### BuenaVistaSocialClub (Italy, 1 courses)

- DB: lat=45.774281, lon=9.2130426, website=null, phone=null
- OSM (low, 265m, sim=0.7): name="Buena Vista Social Golf", website=null, phone=null, email=null
- LC  (no-match, Infinitym, sim=0.35): name="Botanic Golf Sacuba", phone="+39 3517852125", region="Sardinia", percorsi=6.5(9)

### Ca’ della Nave Golf Club (Italy, 2 courses)

- DB: lat=45.5474341, lon=12.1551546, website=null, phone="0039 041 822 8500"
- OSM (low, 630m, sim=1): name="Golf Club Cà della Nave", website=null, phone=null, email=null
- LC  (high, 53m, sim=1): name="Golf Ca' Della Nave", phone="0039 041 822 8500", region="Veneto", percorsi=7.6(18)

### Campanino golf club (Italy, 1 courses)

- DB: lat=44.4452141, lon=11.0922722, website=null, phone=null
- OSM (low, 14m, sim=0.091): name="Golf Club Monteveglio Asd", website="http://www.golfclubmonteveglio.it/", phone="+39 051 670 5387", email=null
- LC  (low, 198m, sim=0.091): name="Golf Club Monteveglio", phone="+39 51 6705387", region="Emilia-Romagna", percorsi=Golf Course Monteveglio(9)

### Campo Comunale Golf Premeno Piandisole (Italy, 1 courses)

- DB: lat=45.9840351, lon=8.6088238, website=null, phone=null
- OSM (low, 157m, sim=0.303): name="Golf Club Piandisole", website="https://www.golfpiandisole.com/", phone="+39 0323 587100", email="info@golfpiandisole.it"
- LC  (low, 35m, sim=0.212): name="Golf Premeno", phone="+39 0332 978101", region="Piedmont", percorsi=Campo Golf Premeno(9)

### Campodoglio Golf Club (Italy, 1 courses)

- DB: lat=45.538097, lon=9.8971571, website=null, phone=null
- OSM (no-match, 203390m, sim=0.545): name="Golf Club Cansiglio", website="http://www.golfclubcansiglio.it", phone="+39 0438 585398; +39 349 0058822", email=null
- LC  (low, 2317m, sim=1): name="Campodoglio Golf", phone="+39 030 737139", region="Lombardy", percorsi=Campo d’Oglio(9)

### Capriva Castello di Spessa (Italy, 1 courses)

- DB: lat=45.9474387, lon=13.5013775, website=null, phone=null
- OSM (low, 165m, sim=0.652): name="Golf & Country Club Castello di Spessa", website=null, phone=null, email=null
- LC  (low, 287m, sim=0.652): name="Castello di Spessa Golf & Country Club", phone="+39 0481 881009", region="Friuli-Venezia Giulia", percorsi=Golf & Country Club Castello Di Spessa(18)

### Carimate Golf Club (Italy, 1 courses)

- DB: lat=45.7022114, lon=9.1147975, website=null, phone="+39 (0)31 790226"
- OSM (low, 881m, sim=1): name="Golf Club Carimate", website=null, phone=null, email=null
- LC  (medium, 325m, sim=1): name="Golf Club Carimate", phone="+39 (0)31 790226", region="Lombardy", percorsi=Carimate Golf Club A.S.D.(18)

### Cascina i Merli (Italy, 1 courses)

- DB: lat=45.1286466, lon=7.5977779, website=null, phone=null
- OSM (low, 640m, sim=0.652): name="Golf Club Druento - Cascina I Merli", website="http://www.golfdruento.com", phone=null, email=null
- LC  (low, 609m, sim=0.652): name="Golf Druento Cascina I Merli", phone="+39 392 5431235", region="Piedmont", percorsi=6.7(9)

### Castellaro Golf Resort (Italy, 1 courses)

- DB: lat=43.856683, lon=7.8776401, website=null, phone="+39 0184 482641"
- OSM (high, 130m, sim=1): name="Castellaro Golf Resort", website=null, phone="+39 0184 482600", email=null
- LC  (high, 130m, sim=1): name="Castellaro Golf Club", phone="+39 0184 482641", region="Liguria", percorsi=Golf Club Castellaro(9)

### CastellArquato (Italy, 1 courses)

- DB: lat=44.8655869, lon=9.9204368, website="https://www.golfclubcastellarquato.com/", phone=null
- OSM (high, 152m, sim=0.933): name="Golf Club Castell'Arquato", website="https://www.golfclubcastellarquato.com/", phone=null, email=null
- LC  (low, 2761m, sim=0.933): name="Golf Club Castell'Arquato", phone="+39 523 895557", region="Emilia-Romagna", percorsi=7.5(18)

### Castello di tolcinasco (Italy, 9 courses)

- DB: lat=45.3640512, lon=9.1868341, website=null, phone="+390290722740"
- OSM (low, 393m, sim=0.526): name="Golf Tolcinasco", website=null, phone=null, email=null
- LC  (high, 153m, sim=1): name="Castello Tolcinasco Golf Resort & Spa", phone="+390290722740", region="Lombardy", percorsi=Yellow & Red (Giallo & Rosso)(18)

### Cavour Green Golf (Italy, 1 courses)

- DB: lat=45.5656001, lon=9.0364407, website=null, phone=null
- OSM (low, 33m, sim=0.417): name="Green Club Golf", website=null, phone=null, email=null
- LC  (low, 231m, sim=0): name="Green Club Lainate", phone="+39 02 9370869", region="Lombardy", percorsi=7.0(18)

### Circolo del Golf Roma Acquasanta (Italy, 1 courses)

- DB: lat=41.8515456, lon=12.5416712, website=null, phone=null
- OSM (high, 171m, sim=1): name="Circolo del Golf di Roma Acquasanta", website=null, phone=null, email=null
- LC  (low, 531m, sim=1): name="Circolo del Golf di Roma Acquasanta", phone="+39 067 803 407", region="Lazio", percorsi=Roma Acquasanta(18)

### Circolo Golf degli Ulivi (Italy, 1 courses)

- DB: lat=45.5961832, lon=10.7159651, website=null, phone=null
- OSM (low, 409m, sim=0.625): name="Ca' degli Ulivi Golf", website="https://www.golfclubcadegliulivi.it/", phone="+39 045 6279030", email="info@golfclubcadegliulivi.it"
- LC  (low, 765m, sim=0.625): name="Circolo Golf Ca' Degli Ulivi", phone="+39 045 6279030", region="Veneto", percorsi=Percorso Championship(18)

### Circolo Golf Margara (Italy, 2 courses)

- DB: lat=41.8524034, lon=12.5396821, website=null, phone=null
- OSM (low, 19m, sim=0.267): name="Circolo del Golf di Roma Acquasanta", website=null, phone=null, email=null
- LC  (low, 358m, sim=0.267): name="Circolo del Golf di Roma Acquasanta", phone="+39 067 803 407", region="Lazio", percorsi=Roma Acquasanta(18)

### Circolo Golf Napoli (Italy, 1 courses)

- DB: lat=40.851368, lon=14.1050031, website=null, phone="+39 81 5264296"
- OSM (high, 159m, sim=1): name="Circolo del Golf di Napoli", website=null, phone=null, email=null
- LC  (high, 143m, sim=1): name="Circolo Golf Napoli", phone="+39 81 5264296", region="Campania", percorsi=9.0(9)

### Colombera (Italy, 2 courses)

- DB: lat=45.5038359, lon=9.9767553, website=null, phone="0039 389 627 6236"
- OSM (low, 412m, sim=0.6): name="La Colombera Golf Club S.r.l.", website=null, phone=null, email=null
- LC  (medium, 399m, sim=1): name="La Colombera Golf Club", phone="0039 389 627 6236", region="Lombardy", percorsi=Percorso Azzurro(12)

### Conero Golf Club (Italy, 1 courses)

- DB: lat=43.5118837, lon=13.5856892, website=null, phone="+39 071 7360613"
- OSM (high, 24m, sim=1): name="Conero Golf Club", website=null, phone=null, email=null
- LC  (medium, 417m, sim=1): name="Conero Golf Club", phone="+39 071 7360613", region="Marche", percorsi=Conero Golf Club S.R.L. Ssd(18)

### Cosmopolitan Golf & Beach Resort (Italy, 1 courses)

- DB: lat=43.6295048, lon=10.2937974, website=null, phone=null
- OSM (no-match, 1263m, sim=0.667): name="Cosmopolitan Golf", website=null, phone=null, email=null
- LC  (low, 640m, sim=0.667): name="Cosmopolitan Golf & Country Club", phone="+39 050 33633", region="Tuscany", percorsi=Cosmopolitan(18)

### Country Club Castelgandolfo (Italy, 1 courses)

- DB: lat=41.737986, lon=12.6294905, website=null, phone=null
- OSM (medium, 450m, sim=1): name="Castelgandolfo Golf Club Resort", website=null, phone=null, email=null
- LC  (low, 729m, sim=1): name="Castelgandolfo Golf Club", phone="+39 (0)6 9312301", region="Lazio", percorsi=Castelgandolfo(18)

### Croara Country Club (Italy, 1 courses)

- DB: lat=44.9245802, lon=9.5851945, website=null, phone="+39 (0)523 977105"
- OSM (high, 84m, sim=1): name="Golf Croara Country Club", website=null, phone=null, email=null
- LC  (high, 63m, sim=1): name="Golf Croara Country Club", phone="+39 (0)523 977105", region="Emilia-Romagna", percorsi=A.S.D. Croara Country Club(18)

### Cus Ferrara Golf (Italy, 1 courses)

- DB: lat=44.8533793, lon=11.6298395, website=null, phone="+39 (0)532 708535"
- OSM (medium, 322m, sim=1): name="CUS Ferrara Golf", website=null, phone=null, email=null
- LC  (high, 16m, sim=0.846): name="C.U.S. Ferrara Golf", phone="+39 (0)532 708535", region="Emilia-Romagna", percorsi=C.U.S. Golf Ferrara(18)

### Dolomiti Golfclub (Italy, 2 courses)

- DB: lat=46.8812187, lon=11.4406977, website=null, phone=null
- OSM (low, 15m, sim=0.192): name="Golfclub Sterzing - Golf Club Vipiteno", website="https://www.golf.bz.it", phone=null, email=null
- LC  (low, 213m, sim=0.118): name="Golf Club Sterzing Vipiteno", phone="+39 333 8154350", region="Trentino-Alto Adige/Südtirol", percorsi=5.5(7)

### Donnafugata Golf (Italy, 2 courses)

- DB: lat=36.8711246, lon=14.4825213, website=null, phone=null
- OSM (no-match, 1051463m, sim=0.444): name="Golf Club Roncegno - Valsugana Golf", website="https://www.golfclubroncegno.it/", phone="+39 0461 773337", email="info@golfclubroncegno.it"
- LC  (low, 564m, sim=1): name="Donnafugata Golf Resort & Spa", phone="+39 0932 914 275", region="Sicily", percorsi=South Course - Links(18)

### Elba golf acquabona (Italy, 1 courses)

- DB: lat=42.782423, lon=10.3449263, website=null, phone=null
- OSM (low, 7m, sim=0.643): name="Golf Course Acquabona", website=null, phone=null, email=null
- LC  (low, 272m, sim=0.737): name="Elba Golf Club Dell'Acquabona", phone="+39 565 940066", region="Tuscany", percorsi=6.0(9)

### Feudo Montalto Golf Club (Italy, 1 courses)

- DB: lat=44.95554, lon=8.1278108, website=null, phone=null
- OSM (low, 58m, sim=0.357): name="Golf Club Feudo", website=null, phone=null, email=null
- LC  (low, 962821m, sim=1): name="Feudo Montalto Golf Club", phone="+39 (0)963 89000", region="Calabria", percorsi=3.3(9)

### Fioranello Golf Club (Italy, 1 courses)

- DB: lat=41.7735014, lon=12.5800133, website=null, phone="+39 (0)6 7138080"
- OSM (high, 193m, sim=1): name="Fioranello Golf Club", website=null, phone=null, email=null
- LC  (high, 193m, sim=1): name="Fioranello Golf Club", phone="+39 (0)6 7138080", region="Lazio", percorsi=6.9(18)

### Folgaria (Italy, 1 courses)

- DB: lat=45.9170363, lon=11.1670014, website=null, phone=null
- OSM (low, 2636m, sim=1): name="Club Golf Folgaria", website=null, phone=null, email=null
- LC  (low, 1660m, sim=1): name="Golf Club Folgaria", phone="+39 3334998644    +390464720480", region="Trentino-Alto Adige/Südtirol", percorsi=8.3(18)

### GC Aviano (Italy, 1 courses)

- DB: lat=46.0508766, lon=12.5634232, website=null, phone=null
- OSM (low, 493m, sim=0.467): name="Golf Club Castel d'Aviano", website=null, phone=null, email=null
- LC  (low, 138m, sim=0.111): name="Golf Pordenone", phone="+39 434 652305", region="Friuli-Venezia Giulia", percorsi=Ass. Sportiva Golf Club Castel D&#x27;Aviano(18)

### GC Le Cicogne (Italy, 1 courses)

- DB: lat=44.2889998, lon=11.8591761, website=null, phone=null
- OSM (low, 498m, sim=0.7): name="Golf Club Le Cicogne", website=null, phone=null, email=null
- LC  (low, 25m, sim=0.571): name="Golf Club Faenza (Le Cicogne)", phone="+39 546 622410", region="Emilia-Romagna", percorsi=Golf Club Faenza Le Cicogne(9)

### GC Le Pavoniere Golf and Country Club (Italy, 1 courses)

- DB: lat=43.8483969, lon=11.0608265, website=null, phone=null
- OSM (low, 1173m, sim=0.75): name="Golf Club Le Pavoniere", website=null, phone=null, email=null
- LC  (low, 583m, sim=0.75): name="Golf & Country Club Le Pavoniere", phone="+390574620855", region="Tuscany", percorsi=Le Pavoniere(18)

### GC Savigliano (Italy, 1 courses)

- DB: lat=44.6543346, lon=7.7036055, website=null, phone=null
- OSM (low, 8309m, sim=0.769): name="Golf Club di Savigliano", website=null, phone=null, email=null
- LC  (no-match, 88297m, sim=0.538): name="Golf Club Cavaglià", phone="+39 0161 966771", region="Piedmont", percorsi=Golf Club Cavaglia&#x27;(18)

### GC Terme di Saturnia (Italy, 1 courses)

- DB: lat=42.6595052, lon=11.5170708, website=null, phone=null
- OSM (low, 962m, sim=0.824): name="Terme Di Saturnia Spa & Golf", website="https://www.termedisaturnia.it/golf", phone="+39 0564 600844", email="segreteriagolf@termedisaturnia.it"
- LC  (low, 349m, sim=0.824): name="Terme di Saturnia Golf Club", phone="+39 (0)564 600 844", region="Tuscany", percorsi=Saturnia golf course(18)

### Golf & Country Club Caldese (Italy, 2 courses)

- DB: lat=41.963316, lon=12.6401473, website=null, phone=null
- OSM (low, 375m, sim=0.25): name="Marco Simone Golf and Country Club", website="https://www.golfmarcosimone.com", phone=null, email=null
- LC  (low, 597m, sim=0.25): name="Marco Simone Golf & Country Club", phone="+39 0774 366469", region="Lazio", percorsi=Campionato (Championship Course)(18)

### Golf & Country Club Castello Di Spessa (Italy, 1 courses)

- DB: lat=45.9474387, lon=13.5013775, website=null, phone="+39 0481 881009"
- OSM (high, 165m, sim=1): name="Golf & Country Club Castello di Spessa", website=null, phone=null, email=null
- LC  (medium, 287m, sim=1): name="Castello di Spessa Golf & Country Club", phone="+39 0481 881009", region="Friuli-Venezia Giulia", percorsi=Golf & Country Club Castello Di Spessa(18)

### Golf & Country Club Gorizia (Italy, 1 courses)

- DB: lat=45.9464122, lon=13.501141, website=null, phone=null
- OSM (low, 122m, sim=0.133): name="Golf & Country Club Castello di Spessa", website=null, phone=null, email=null
- LC  (low, 350m, sim=0.133): name="Castello di Spessa Golf & Country Club", phone="+39 0481 881009", region="Friuli-Venezia Giulia", percorsi=Golf & Country Club Castello Di Spessa(18)

### Golf Borgo di Camuzzago (Italy, 2 courses)

- DB: lat=45.6073525, lon=9.4255261, website=null, phone=null
- OSM (low, 412m, sim=0.682): name="Antico Borgo Camuzzago Golf Club", website="https://www.camuzzagogolf.it/", phone="+39 039 623549", email="info@camuzzagogolf.it"
- LC  (low, 4115m, sim=1): name="Golf borgo di Camuzzago", phone="+39 39 623549/+39 345 4774593", region="Lombardy", percorsi=Antico Borgo Camuzzago Golf Club S.R.L.(9)

### Golf Castell’Arquato’arquato (Italy, 1 courses)

- DB: lat=44.8681997, lon=9.9204419, website=null, phone=null
- OSM (low, 333m, sim=0.652): name="Golf Club Castell'Arquato", website="https://www.golfclubcastellarquato.com/", phone=null, email=null
- LC  (no-match, 3023m, sim=0.652): name="Golf Club Castell'Arquato", phone="+39 523 895557", region="Emilia-Romagna", percorsi=7.5(18)

### Golf Cento (Italy, 1 courses)

- DB: lat=44.7151228, lon=11.2826965, website=null, phone=null
- OSM (high, 244m, sim=1): name="Golf Club Cento", website=null, phone=null, email=null
- LC  (low, 82m, sim=0.278): name="Golf Club Augusto Fava Cento", phone="+39 51 6830504", region="Emilia-Romagna", percorsi=Golf Club Augusto Fava Cento Asd(9)

### Golf Club Ambrosiano (Italy, 1 courses)

- DB: lat=45.3318245, lon=9.0011308, website=null, phone="+39 (0)39 6887124"
- OSM (low, 537m, sim=1): name="Golf club Ambrosiano", website=null, phone=null, email=null
- LC  (medium, 473m, sim=1): name="Golf Club Ambrosiano", phone="+39 (0)39 6887124", region="Lombardy", percorsi=8.2(18)

### Golf Club Asiago (Italy, 1 courses)

- DB: lat=45.8548269, lon=11.53655, website=null, phone="+39 0424 462721"
- OSM (no-match, 58153m, sim=0.5): name="Abano Golf", website=null, phone=null, email=null
- LC  (high, 130m, sim=1): name="Golf Club Asiago", phone="+39 0424 462721", region="Veneto", percorsi=Circolo Golf Asiago(18)

### Golf Club Bergamo L'Albenza (Italy, 9 courses)

- DB: lat=45.7447802, lon=9.5675775, website=null, phone="+39 035 640028"
- OSM (high, 117m, sim=1): name="Golf Club Bergamo \"L'Albenza\"", website=null, phone=null, email=null
- LC  (high, 177m, sim=1): name="Golf Club Bergamo L’Albenza", phone="+39 035 640028", region="Lombardy", percorsi=Red & Blue (Rosso & Blu)(18)

### Golf Club Bologna (Italy, 1 courses)

- DB: lat=44.5019301, lon=11.1636883, website=null, phone="+39 (0)51 969100"
- OSM (high, 198m, sim=1): name="Golf Club Bologna", website=null, phone="+39 051 969100", email="info@golfclubbologna.it"
- LC  (high, 27m, sim=1): name="Golf Club Bologna", phone="+39 (0)51 969100", region="Emilia-Romagna", percorsi=8.1(18)

### golf club carezza (Italy, 1 courses)

- DB: lat=46.4100798, lon=11.5951091, website=null, phone=null
- OSM (low, 42m, sim=0.438): name="Golf Club Karersee - Golf Club Carezza", website="http://www.carezzagolf.com/", phone="+39 0471 612200", email="info@carezzagolf.com"
- LC  (low, 288m, sim=0.438): name="Golf & Country Südtirol - Golf Club Carezza", phone="+39 0471 1888 164", region="Trentino-Alto Adige/Südtirol", percorsi=The Mountain Beast(9)

### Golf Club Castell'Arquato (Italy, 1 courses)

- DB: lat=44.8655868, lon=9.9204368, website="https://www.golfclubcastellarquato.com/", phone=null
- OSM (high, 152m, sim=1): name="Golf Club Castell'Arquato", website="https://www.golfclubcastellarquato.com/", phone=null, email=null
- LC  (low, 2761m, sim=1): name="Golf Club Castell'Arquato", phone="+39 523 895557", region="Emilia-Romagna", percorsi=7.5(18)

### Golf Club Cavaglià (Italy, 1 courses)

- DB: lat=45.3896299, lon=8.1300719, website=null, phone="+39 0161 966771"
- OSM (low, 441m, sim=0.125): name="UNA Golf", website=null, phone=null, email=null
- LC  (high, 68m, sim=1): name="Golf Club Cavaglià", phone="+39 0161 966771", region="Piedmont", percorsi=Golf Club Cavaglia&#x27;(18)

### Golf Club Centro d'Italia (Italy, 1 courses)

- DB: lat=42.4308495, lon=12.8836081, website=null, phone=null
- OSM (high, 9m, sim=1): name="Golf Club Centro d'Italia", website=null, phone=null, email=null
- LC  (low, 155m, sim=0.579): name="Golf Club Rieti - Centro Italia", phone="+39 746 229035", region="Lazio", percorsi=Golf Club Centro D&#x27;Italia(9)

### Golf Club Cherasco (Italy, 1 courses)

- DB: lat=44.6599693, lon=7.8765331, website=null, phone="+39 (0)172 489772"
- OSM (low, 341m, sim=0.3): name="Le Chiocciole", website=null, phone=null, email=null
- LC  (high, 169m, sim=1): name="Golf Club Cherasco", phone="+39 (0)172 489772", region="Piedmont", percorsi=Asd Golf Club Cherasco(18)

### Golf Club Città di Asti (Italy, 1 courses)

- DB: lat=43.4766479, lon=12.1736971, website=null, phone=null
- OSM (no-match, 240825m, sim=0.5): name="Golf Villa Giusti", website=null, phone=null, email=null
- LC  (low, 64m, sim=0.2): name="Golf & Country Club Caldese", phone="+39 75 8510197", region="Umbria", percorsi=Golf & Country Club Caldese(9)

### Golf Club Colli Berici (Italy, 1 courses)

- DB: lat=45.4817702, lon=11.4592737, website=null, phone="+39 0444 601780"
- OSM (no-match, 165947m, sim=0.538): name="Golf Club Poggio dei Medici", website="https://www.golfpoggiodeimedici.com/", phone=null, email=null
- LC  (medium, 343m, sim=1): name="Golf Club Colli Berici", phone="+39 0444 601780", region="Veneto", percorsi=Golf Club Colli Berici S.R.L. Ssd(18)

### Golf Club Como (Italy, 2 courses)

- DB: lat=45.7083584, lon=9.1176674, website=null, phone=null
- OSM (low, 568m, sim=0.25): name="Golf Club Carimate", website=null, phone=null, email=null
- LC  (low, 401m, sim=0.25): name="Golf Club Carimate", phone="+39 (0)31 790226", region="Lombardy", percorsi=Carimate Golf Club A.S.D.(18)

### Golf Club Cri Cri (Italy, 1 courses)

- DB: lat=41.8627985, lon=14.0754282, website=null, phone=null
- OSM (low, 12m, sim=0.583): name="Golf Club \"Moda Cri Cri\"", website=null, phone=null, email=null
- LC  (no-match, 497349m, sim=0.429): name="Golf Croara Country Club", phone="+39 (0)523 977105", region="Emilia-Romagna", percorsi=A.S.D. Croara Country Club(18)

### Golf Club Eppan (Italy, 1 courses)

- DB: lat=46.4953176, lon=11.2560184, website=null, phone=null
- OSM (low, 688m, sim=1): name="Golf Club Eppan", website="https://www.golfandcountry.it/the-blue-monster-golfclub-eppan/", phone=null, email=null
- LC  (low, 798m, sim=0.217): name="Golf & Country Südtirol - Golfclub Eppan", phone="+39 0471 1888 164", region="Trentino-Alto Adige/Südtirol", percorsi=The Blue Monster(9)

### Golf Club Fontevivo (Italy, 1 courses)

- DB: lat=43.6896115, lon=10.8516464, website=null, phone=null
- OSM (medium, 291m, sim=1): name="Golf Club Fontevivo", website=null, phone=null, email=null
- LC  (low, 14m, sim=0.176): name="Golf Club San Miniato A.S.D.", phone="+39 571 419012", region="Tuscany", percorsi=Golf Club Fontevivo(9)

### Golf Club Grado (Italy, 1 courses)

- DB: lat=45.7058408496099, lon=13.4627702678862, website=null, phone=null
- OSM (low, 845m, sim=1): name="Golf Club Grado", website="https://www.tenuta-primero.com/", phone="+39 0431 896 896", email=null
- LC  (low, 1628m, sim=1): name="Golf Club Grado", phone="+39 431 896896", region="Friuli-Venezia Giulia", percorsi=7.7(18)

### Golf Club Gressoney Monte Rosa (Italy, 1 courses)

- DB: lat=45.7841878, lon=7.8241285, website=null, phone="+39 125356314"
- OSM (high, 60m, sim=1): name="Golf Club Gressoney Monte Rosa", website=null, phone=null, email=null
- LC  (high, 20m, sim=0.95): name="Golf Club Gressoney Monterosa", phone="+39 125356314", region="Aosta Valley", percorsi=Golf Club Gressoney(12)

### Golf Club La Castelluccia (Italy, 2 courses)

- DB: lat=41.963316, lon=12.6401473, website=null, phone=null
- OSM (low, 375m, sim=0.083): name="Marco Simone Golf and Country Club", website="https://www.golfmarcosimone.com", phone=null, email=null
- LC  (low, 597m, sim=0.083): name="Marco Simone Golf & Country Club", phone="+39 0774 366469", region="Lazio", percorsi=Campionato (Championship Course)(18)

### Golf Club La Margherita (Italy, 1 courses)

- DB: lat=44.8578319, lon=7.8177642, website=null, phone="+39 011 9795113"
- OSM (low, 454m, sim=0): name="Golf Club I Girasoli", website="https://www.girasoligolf.it/", phone="+39 011 979 5088", email="info@girasoligolf.it"
- LC  (high, 139m, sim=1): name="Golf Club La Margherita", phone="+39 011 9795113", region="Piedmont", percorsi=La Margherita Golf Club(18)

### Golf Club La Rocca (Italy, 1 courses)

- DB: lat=44.7139495, lon=10.2263338, website=null, phone=null
- OSM (low, 844m, sim=1): name="Golf Club La Rocca", website=null, phone=null, email=null
- LC  (low, 695m, sim=0.417): name="Golf del Ducato - La Rocca", phone="+39 0521 834037 ", region="Emilia-Romagna", percorsi=8.3(18)

### Golf Club Lana - Gutshof Brandis (Italy, 1 courses)

- DB: lat=46.5951101, lon=11.162509, website=null, phone=null
- OSM (low, 440m, sim=0.2): name="Golfclub Lana", website=null, phone=null, email=null
- LC  (low, 12m, sim=0.2): name="Golf Club Lana", phone="+39 0473 564696", region="Trentino-Alto Adige/Südtirol", percorsi=8.1(9)

### Golf Club Le Betulle (Italy, 1 courses)

- DB: lat=45.482428, lon=7.980676, website=null, phone=null
- OSM (medium, 415m, sim=1): name="Golf Club Le Betulle", website=null, phone=null, email=null
- LC  (low, 46m, sim=0.5): name="Golf Club Biella Le Betulle", phone="+39 (0)15 679151", region="Piedmont", percorsi=Biella golfcourse(18)

### Golf Club Lecco (Italy, 1 courses)

- DB: lat=45.7957762, lon=9.3131344, website="https://golfclublecco.it", phone=null
- OSM (medium, 475m, sim=1): name="Golf Club Lecco", website="https://golfclublecco.it", phone=null, email=null
- LC  (low, 840m, sim=1): name="Golf Club Lecco", phone="+39 0341 579525", region="Lombardy", percorsi=7.3(18)

### Golf Club Lignano (Italy, 2 courses)

- DB: lat=45.6631877, lon=13.0750889, website=null, phone="+39 0431 428025"
- OSM (low, 682m, sim=1): name="Golf Club Lignano", website="https://golflignano.it/", phone="+39 0431 428025", email="info@golflignano.it"
- LC  (medium, 423m, sim=1): name="Golf Club Lignano", phone="+39 0431 428025", region="Friuli-Venezia Giulia", percorsi=Lignano(18)

### golf club madesimo (Italy, 1 courses)

- DB: lat=46.4483242, lon=9.3644014, website=null, phone=null
- OSM (low, 676m, sim=1): name="Golf Club Madesimo", website=null, phone=null, email=null
- LC  (no-match, 1017491m, sim=0.5): name="Le Madonie Golf Club", phone="+39 (0)921 934387", region="Sicily", percorsi=7.7(18)

### Golf Club Marigola (Italy, 1 courses)

- DB: lat=44.0852105, lon=9.904964, website=null, phone="+39 0187 970193"
- OSM (high, 34m, sim=1): name="Golf Club Marigola", website=null, phone=null, email=null
- LC  (high, 146m, sim=1): name="Golf Club Marigola", phone="+39 0187 970193", region="Liguria", percorsi=Marigola 9(9)

### Golf Club Milano (Italy, 1 courses)

- DB: lat=45.6111249, lon=9.2917128, website=null, phone=null
- OSM (low, 657m, sim=1): name="Golf Club Milano", website="https://www.golfclubmilano.com/", phone="+39 039 303081", email="info@golfclubmilano.com"
- LC  (low, 519m, sim=1): name="Golf Club Milano", phone="+39 039 303081", region="Lombardy", percorsi=Milano Old Course - Red/Blue (1 + 2)(18)

### Golf Club Mulino Cerrione (Italy, 2 courses)

- DB: lat=45.4693827, lon=8.0584656, website=null, phone="+39 015 2587994"
- OSM (no-match, 286984m, sim=0.6): name="Golf Club Molino del Pero", website="https://www.molinodelpero.it/", phone="+39 051 6770506;+39 051 18893177", email="info@golfmolinodelpero.i"
- LC  (high, 62m, sim=1): name="Golf Club Il Mulino Cerrione", phone="+39 015 2587994", region="Piedmont", percorsi=Circolo Golf Cerrione Il Mulino(9)

### Golf Club Padova (Italy, 9 courses)

- DB: lat=45.2952536, lon=11.7366279, website=null, phone="+39 049 9130078"
- OSM (high, 161m, sim=1): name="Golf Club Padova", website=null, phone=null, email=null
- LC  (high, 39m, sim=1): name="Golf Club Padova", phone="+39 049 9130078", region="Veneto", percorsi=7.8(18)

### Golf Club Parco De Medici Roma (Italy, 9 courses)

- DB: lat=41.8134125, lon=12.4091793, website=null, phone=null
- OSM (low, 265m, sim=0.333): name="Sheraton Golf Club Parco de' Medici", website="http://www.sheratongolfroma.com/", phone="+39 06 6528 7345", email="info@golfparcodemedici.com"
- LC  (low, 2365m, sim=0.706): name="Parco De' Medici Golf Club", phone="+39 6 65287345", region="Lazio", percorsi=White-Blue Course(18)

### Golf Club Petersberg (Italy, 1 courses)

- DB: lat=46.3928117, lon=11.3775682, website=null, phone="+39 0471 615122"
- OSM (low, 182m, sim=0.323): name="Golfplatz Petersberg - Golf Club Petersberg", website=null, phone=null, email=null
- LC  (high, 42m, sim=1): name="Golf Club Petersberg", phone="+39 0471 615122", region="Trentino-Alto Adige/Südtirol", percorsi=8.5(18)

### Golf Club Pustertal (Italy, 1 courses)

- DB: lat=46.7779899, lon=11.9321683, website=null, phone="+39 0474 412192"
- OSM (low, 46m, sim=0.5): name="Golfclub Pustertal", website="https://www.golfpustertal.com/", phone="+39 0474 412192", email=null
- LC  (high, 40m, sim=1): name="Golf Club Pustertal", phone="+39 0474 412192", region="Trentino-Alto Adige/Südtirol", percorsi=7.9(9)

### Golf Club Quarrata (Italy, 1 courses)

- DB: lat=43.8814826, lon=10.9793471, website=null, phone="+39 (0) 573 705 167"
- OSM (high, 121m, sim=1): name="Golf Club Quarrata", website=null, phone=null, email=null
- LC  (high, 121m, sim=1): name="Golf Club Quarrata", phone="+39 (0) 573 705 167", region="Tuscany", percorsi=Golf Club di Quarrata(9)

### GOLF CLUB SALUZZO (Italy, 1 courses)

- DB: lat=44.6314058, lon=7.4465342, website=null, phone="+39 175 055227"
- OSM (low, 925m, sim=1): name="Golf Club Saluzzo", website=null, phone=null, email=null
- LC  (high, 7m, sim=1): name=" Golf Club Saluzzo", phone="+39 175 055227", region="Piedmont", percorsi=Golf Castellar Asd(9)

### golf club san giovanni dei boschi (Italy, 1 courses)

- DB: lat=46.1327713, lon=13.0683005, website=null, phone=null
- OSM (low, 121m, sim=0.105): name="Golf Club Udine", website=null, phone=null, email=null
- LC  (low, 531m, sim=0.105): name="Udine Golf Club", phone="+39 (0)432 800418", region="Friuli-Venezia Giulia", percorsi=8.2(18)

### Golf Club San Vito (Italy, 1 courses)

- DB: lat=45.416489, lon=9.0131142, website=null, phone=null
- OSM (medium, 375m, sim=1): name="Golf Club San Vito", website=null, phone=null, email=null
- LC  (no-match, 123528m, sim=0.636): name="Golf Club San Vigilio", phone="+39 030 91801", region="Lombardy", percorsi=Benaco & Solferino Course(18)

### Golf Club Sappada (Italy, 1 courses)

- DB: lat=46.5613723, lon=12.6846799, website=null, phone=null
- OSM (medium, 304m, sim=1): name="Golf Club Sappada", website=null, phone=null, email=null
- LC  (no-match, 369478m, sim=0.444): name="Circolo Golf L'Abbadia", phone="+39 (0) 577 924 153", region="Tuscany", percorsi=CIRCOLO GOLF L&#x27;ABBADIA(9)

### Golf Club Siepelunga (Italy, 1 courses)

- DB: lat=44.4636962, lon=11.3639898, website=null, phone="+39 051 477977"
- OSM (high, 100m, sim=1): name="Golf Club Siepelunga", website=null, phone="+39 051 477977", email=null
- LC  (no-match, 8545m, sim=0.5): name="Casalunga Golf Club", phone="+39 51/6050164", region="Emilia-Romagna", percorsi=7.6(9)

### Golf club Tesino (Italy, 1 courses)

- DB: lat=46.0693085, lon=11.608091, website=null, phone=null
- OSM (low, 638m, sim=0.4): name="Tesino Golf Club La Farfalla", website="https://www.tesinogolf.com/", phone="+39 0461 593253; +39 347 291 8358", email="info@tesinogolf.com"
- LC  (low, 527m, sim=0.4): name="Tesino Golf Club La Farfalla", phone="+39 461593253", region="Trentino-Alto Adige/Südtirol", percorsi=9.2(9)

### Golf Club Tirrenia (Italy, 1 courses)

- DB: lat=43.6246254, lon=10.2951688, website=null, phone="+39 050 37518"
- OSM (low, 529m, sim=1): name="Golf Club Tirrenia", website="https://www.golftirrenia.it/", phone="+39 050 37518", email="info@golftirrenia.it"
- LC  (high, 163m, sim=1): name="Tirrenia Golf Club", phone="+39 050 37518", region="Tuscany", percorsi=8.3(9)

### Golf Club Toscana (Italy, 1 courses)

- DB: lat=43.7847842, lon=11.2021199, website=null, phone=null
- OSM (low, 16m, sim=0.154): name="Golf Club Parco Di Firenze", website="https://www.parcodifirenze.it/", phone="+39 055 755627", email="golf@parcodifirenze.it"
- LC  (low, 160m, sim=0.154): name="Golf Club Parco Di Firenze", phone="+39 055785627", region="Tuscany", percorsi=Asd Golf Club Parco Di Firenze(9)

### Golf Club Toscana Castelfalfi (Italy, 9 courses)

- DB: lat=43.5379568, lon=10.8598929, website=null, phone=null
- OSM (low, 259m, sim=0.579): name="Golf Club Castelfalfi", website=null, phone=null, email=null
- LC  (low, 466m, sim=0.579): name="Castelfalfi Golf Club", phone="+39 0571 890200", region="Tuscany", percorsi=Lake Course(9)

### Golf Club Udine (Italy, 1 courses)

- DB: lat=46.1281153, lon=13.0707389, website=null, phone="+39 (0)432 800418"
- OSM (low, 605m, sim=1): name="Golf Club Udine", website=null, phone=null, email=null
- LC  (high, 21m, sim=1): name="Udine Golf Club", phone="+39 (0)432 800418", region="Friuli-Venezia Giulia", percorsi=8.2(18)

### Golf Club Vicenza (Italy, 2 courses)

- DB: lat=45.537808, lon=11.4799627, website=null, phone="+39 0444 340448"
- OSM (high, 49m, sim=1): name="Golf Club Vicenza", website=null, phone=null, email=null
- LC  (medium, 341m, sim=1): name="Golf Club Vicenza", phone="+39 0444 340448", region="Veneto", percorsi=Golf Club Vicenza S.R.L. - Ssd(9)

### Golf Club Villa Carolina (Italy, 3 courses)

- DB: lat=44.7072207, lon=8.6983454, website=null, phone=null
- OSM (high, 117m, sim=1): name="Golf Club Villa Carolina", website=null, phone=null, email=null
- LC  (low, 2481m, sim=1): name="Golf Club Villa Carolina", phone="+39 0143 467355", region="Piedmont", percorsi=Paradiso Course(18)

### Golf Club Volturno (Napoli) (Italy, 1 courses)

- DB: lat=40.9826865, lon=13.9730352, website=null, phone=null
- OSM (low, 213m, sim=0.533): name="Golf Club Volturno", website=null, phone=null, email=null
- LC  (low, 452m, sim=0.533): name="Golf Club Volturno", phone="+39 815095150", region="Campania", percorsi=6.8(18)

### Golf Colline Del Gavi (Italy, 10 courses)

- DB: lat=42.651305, lon=11.5214922, website=null, phone=null
- OSM (low, 50m, sim=0.143): name="Terme Di Saturnia Spa & Golf", website="https://www.termedisaturnia.it/golf", phone="+39 0564 600844", email="segreteriagolf@termedisaturnia.it"
- LC  (low, 633m, sim=0.143): name="Terme di Saturnia Golf Club", phone="+39 (0)564 600 844", region="Tuscany", percorsi=Saturnia golf course(18)

### Golf Crema (Italy, 2 courses)

- DB: lat=45.3602276, lon=9.6514056, website=null, phone="+39 373231357"
- OSM (low, 797m, sim=1): name="Golf Crema", website="http://www.golfcremaresort.com/", phone="+39 0373 231357", email="info@golfcremaresort.com"
- LC  (high, 93m, sim=1): name="Golf Club Crema", phone="+39 373231357", region="Lombardy", percorsi=7.6(18)

### Golf Dei Laghi (Italy, 1 courses)

- DB: lat=45.8092174, lon=8.6606813, website="https://www.golfdeilaghi.it/", phone=null
- OSM (medium, 363m, sim=1): name="Golf dei Laghi", website="https://www.golfdeilaghi.it/", phone=null, email=null
- LC  (low, 538m, sim=1): name="Golf Dei Laghi", phone="+39 (0)332 978101", region="Lombardy", percorsi=7.5(18)

### GOLF FEUDO DI ASTI (Italy, 1 courses)

- DB: lat=44.8260127, lon=8.2026863, website=null, phone=null
- OSM (no-match, 15536m, sim=0.5): name="Golf Club Feudo", website=null, phone=null, email=null
- LC  (low, 16873m, sim=0.833): name="Golf Feudo D'Asti", phone="+39 0141294230", region="Piedmont", percorsi=A.S.D. Golf Feudo D&#x27;Asti(18)

### Golf Fiuggi terme & country club (Italy, 1 courses)

- DB: lat=41.7776362, lon=13.2236256, website=null, phone=null
- OSM (low, 259m, sim=0.5): name="Golf Club Fiuggi", website=null, phone=null, email=null
- LC  (low, 452m, sim=0.583): name="Golf  Club Fiuggi 1928", phone="+39 0775 515 640", region="Lazio", percorsi=Golf Fiuggi Terme(18)

### Golf Garlenda (Italy, 1 courses)

- DB: lat=44.0347053, lon=8.1129836, website=null, phone="+39 0182 580012"
- OSM (high, 158m, sim=1): name="Garlenda Golf Club", website=null, phone=null, email=null
- LC  (high, 65m, sim=1): name="Garlenda Golf Club", phone="+39 0182 580012", region="Liguria", percorsi=Garlenda(18)

### Golf il Torrazzo (Italy, 2 courses)

- DB: lat=45.1639603, lon=9.9835217, website=null, phone=null
- OSM (high, 34m, sim=0.727): name="Golf II Torrazzo", website=null, phone=null, email=null
- LC  (no-match, 243021m, sim=0.5): name="Arezzo Golf Club", phone=null, region="Tuscany", percorsi=Arezzo Golf Course(?)

### Golf Le Primule (Italy, 1 courses)

- DB: lat=45.2710604, lon=7.9549735, website=null, phone=null
- OSM (high, 0m, sim=1): name="Golf Le Primule", website=null, phone=null, email=null
- LC  (no-match, 102603m, sim=0.5): name="Golf Club Carimate", phone="+39 (0)31 790226", region="Lombardy", percorsi=Carimate Golf Club A.S.D.(18)

### Golf Le Rovedine (Italy, 2 courses)

- DB: lat=45.3935755, lon=9.2151086, website=null, phone="+39 02 57606420"
- OSM (low, 712m, sim=0.533): name="Le Rovedine Golf Club Milano", website="https://www.rovedine.com/", phone="+39 02 57606420", email="info@rovedine.com"
- LC  (high, 229m, sim=1): name="Golf Le Rovedine", phone="+39 02 57606420", region="Lombardy", percorsi=7.8(18)

### Golf Les Iles (Italy, 1 courses)

- DB: lat=45.7377236, lon=7.4073254, website=null, phone=null
- OSM (low, 272m, sim=0.125): name="Golf Club Aosta", website="http://golfaostabrissogne.com/contatti-golf-club-aosta-brissogne/", phone="+39 378 303 3912", email=null
- LC  (low, 160m, sim=0.2): name="Golf Club Aosta Brissogne", phone="+39 165 762932", region="Aosta Valley", percorsi=Golf Les Iles(9)

### Golf Montecatini Terme (Italy, 1 courses)

- DB: lat=43.8489146, lon=10.8595816, website=null, phone=null
- OSM (low, 134m, sim=0.647): name="Montecatini Golf", website=null, phone=null, email=null
- LC  (no-match, 2207m, sim=0.647): name="Montecatini Golf & Country Club", phone="+39 0572 62218", region="Tuscany", percorsi=18-Hole Course(18)

### Golf Nazionale (Italy, 1 courses)

- DB: lat=42.210043, lon=12.285186, website=null, phone="+39 0761 609308"
- OSM (high, 188m, sim=1): name="Golf Nazionale", website=null, phone=null, email=null
- LC  (high, 188m, sim=1): name="Golf Nazionale", phone="+39 0761 609308", region="Lazio", percorsi=Golf Nazionale course(18)

### GOLF PANORAMA (Italy, 1 courses)

- DB: lat=45.8397203, lon=8.7541338, website=null, phone=null
- OSM (no-match, 1050m, sim=0.25): name="Golf Club Varese", website="https://www.golfclubvarese.it/", phone="+39 332 229302", email="info@golfclubvarese.it"
- LC  (low, 951m, sim=0.25): name="Golf Club Varese", phone="+39 (0)332 229302", region="Lombardy", percorsi=Varese(18)

### Golf Pordenone (Italy, 1 courses)

- DB: lat=46.0503126, lon=12.5655094, website=null, phone="+39 434 652305"
- OSM (low, 320m, sim=0.133): name="Golf Club Castel d'Aviano", website=null, phone=null, email=null
- LC  (high, 95m, sim=1): name="Golf Pordenone", phone="+39 434 652305", region="Friuli-Venezia Giulia", percorsi=Ass. Sportiva Golf Club Castel D&#x27;Aviano(18)

### Golf Salsomaggiore Terme (Italy, 1 courses)

- DB: lat=44.780782, lon=9.9432603, website=null, phone=null
- OSM (low, 86m, sim=0.684): name="Salsomaggiore Golf & Country Club", website="http://www.salsomaggioregolfclub.com/", phone="+39 0524 574128", email="info@salsomaggioregolfclub.com"
- LC  (no-match, 3357m, sim=0.684): name="Salsomaggiore Golf", phone="+39 0524583102", region="Emilia-Romagna", percorsi=Salsomaggiore Golf Ssd S.R.L.(18)

### Golf Senza Confini (Italy, 1 courses)

- DB: lat=46.5001221, lon=13.5828934, website=null, phone=null
- OSM (low, 348m, sim=0.591): name="Golf Senza Confini Tarvisio", website="http://www.golfsenzaconfini.com", phone="+39 0428 2047", email="office@golfsenzaconfini.com"
- LC  (low, 204m, sim=0.591): name="Golf Senza Confini Tarvisio", phone="+39 0428 2047", region="Friuli-Venezia Giulia", percorsi=Tarvisio(18)

### Golf Zerman (Italy, 2 courses)

- DB: lat=45.5794755, lon=12.2686586, website=null, phone=null
- OSM (low, 363m, sim=0.133): name="Golf Club Villa Condulmer", website="https://www.golfvillacondulmer.com/", phone="+39 041 457062", email="info@golfvillacondulmer.com"
- LC  (low, 882m, sim=1): name="Golf Zerman", phone="+39 328 194 2494", region="Veneto", percorsi=Ass.Ne Sportiva Golf Zerman(9)

### Golfclub Passeier (Italy, 1 courses)

- DB: lat=46.7726613, lon=11.2266496, website=null, phone=null
- OSM (low, 227m, sim=0.654): name="Golfclub Passeier - Passiria", website="https://www.golfclubpasseier.com/", phone=null, email=null
- LC  (low, 295m, sim=0.3): name="Golf Club Passiria Merano (Passeier Meran)", phone="+39 473 641488", region="Trentino-Alto Adige/Südtirol", percorsi=Golf Club Passiria Merano(18)

### Golfclub St. Vigil Seis (Italy, 1 courses)

- DB: lat=46.538941, lon=11.5431586, website=null, phone=null
- OSM (low, 45m, sim=0.55): name="Golfclub San Vigilio Siusi - St.Vigil Seis", website="https://www.golfstvigilseis.it/", phone="+39 0471 708708", email=null
- LC  (low, 1570m, sim=1): name="Golfclub St. Vigil Seis", phone="+39 0471 708708", region="Trentino-Alto Adige/Südtirol", percorsi=St. Vigil Seis(18)

### Grado24 (Italy, 1 courses)

- DB: lat=45.6384551, lon=13.6005982, website=null, phone=null
- OSM (low, 13473m, sim=0.714): name="Golf Club Grado", website="https://www.tenuta-primero.com/", phone="+39 0431 896 896", email=null
- LC  (low, 13215m, sim=0.714): name="Golf Club Grado", phone="+39 431 896896", region="Friuli-Venezia Giulia", percorsi=7.7(18)

### Grugliasco Circolo Golf (Italy, 1 courses)

- DB: lat=45.0568746, lon=7.5901073, website=null, phone=null
- OSM (low, 818m, sim=1): name="Circolo Golf Grugliasco", website=null, phone=null, email=null
- LC  (no-match, 247443m, sim=0.6): name="Golf Bogliaco", phone="+39 0365 643006", region="Lombardy", percorsi=Circolo Del Golf Bogliaco(18)

### Il Bosco Golf Club (Italy, 1 courses)

- DB: lat=45.7861491, lon=12.5083375, website="https://www.golfclubilbosco.it/", phone=null
- OSM (high, 12m, sim=1): name="ASD Il Bosco Golf Club", website="https://www.golfclubilbosco.it/", phone=null, email=null
- LC  (no-match, 145864m, sim=0.5): name="Golf Bogliaco", phone="+39 0365 643006", region="Lombardy", percorsi=Circolo Del Golf Bogliaco(18)

### Il Laghetto (Italy, 1 courses)

- DB: lat=45.437205, lon=9.323172, website=null, phone=null
- OSM (low, 844m, sim=0.875): name="Golf Club Il Lagetto", website=null, phone=null, email=null
- LC  (no-match, 134439m, sim=0.5): name="Golf Club La Margherita", phone="+39 011 9795113", region="Piedmont", percorsi=La Margherita Golf Club(18)

### Il Picciolo Golf Club (Italy, 1 courses)

- DB: lat=37.8520221, lon=15.0994162, website=null, phone=null
- OSM (low, 309m, sim=0.615): name="Il Picciolo Etna Golf Resort", website="https://www.ilpiccioloetnagolfresort.com/", phone="+39 0942 986384", email="info@ilpiccioloetnagolfresort.com"
- LC  (low, 428m, sim=0.348): name="Sicilia’s Picciolo Etna Golf", phone="+39 (0)942 986384", region="Sicily", percorsi=Il Picciolo Golf Club(18)

### IS ARENAS 2 (Italy, 1 courses)

- DB: lat=39.2169182, lon=9.1570681, website=null, phone=null
- OSM (low, 109129m, sim=0.818): name="Golf Club Is Arenas", website=null, phone=null, email=null
- LC  (low, 108625m, sim=0.818): name="Is Arenas Golf & Country Club", phone="+39 335 125 8322", region="Sardinia", percorsi=Is Arenas(18)

### Is Arenas Golf & Country Club (Italy, 1 courses)

- DB: lat=40.0540524187741, lon=8.47587806246667, website=null, phone=null
- OSM (low, 825m, sim=1): name="Golf Club Is Arenas", website=null, phone=null, email=null
- LC  (low, 1262m, sim=1): name="Is Arenas Golf & Country Club", phone="+39 335 125 8322", region="Sardinia", percorsi=Is Arenas(18)

### Is Molas Resort (Italy, 9 courses)

- DB: lat=38.996004, lon=8.9601703, website=null, phone=null
- OSM (low, 978m, sim=1): name="Is Molas Golf Club", website="https://www.ismolas.it/", phone="+39 070 9241006", email="ismolashotel@ismolas.it"
- LC  (low, 676m, sim=1): name="Is Molas Golf Resort", phone="+39 070 9241006", region="Sardinia", percorsi=Yellow Course(9)

### Ita Donnafugata (Italy, 2 courses)

- DB: lat=36.8798936, lon=14.5668227, website=null, phone=null
- OSM (no-match, 1004319m, sim=0.4): name="Golf Club Ca' Amata", website="https://www.golfcaamata.it/", phone="+39 0423 493 537", email="info@golfcaamata.it"
- LC  (low, 7028m, sim=0.733): name="Donnafugata Golf Resort & Spa", phone="+39 0932 914 275", region="Sicily", percorsi=South Course - Links(18)

### L'Abbadia Golf Club (Italy, 1 courses)

- DB: lat=43.4240494, lon=11.1428724, website=null, phone="+39 (0) 577 924 153"
- OSM (high, 28m, sim=1): name="Golf L'Abbadia", website=null, phone=null, email=null
- LC  (high, 176m, sim=1): name="Circolo Golf L'Abbadia", phone="+39 (0) 577 924 153", region="Tuscany", percorsi=CIRCOLO GOLF L&#x27;ABBADIA(9)

### La Mandria (Italy, 2 courses)

- DB: lat=45.2050476, lon=7.5450227, website=null, phone=null
- OSM (low, 0m, sim=0.5): name="Circolo Golf Torino La Mandria", website="https://www.circologolftorino.it/", phone="+39 011 9235440", email="info@circologolftorino.it"
- LC  (low, 982m, sim=0.5): name="Circolo Golf Torino La Mandria", phone="+39 011 9235440", region="Piedmont", percorsi=Pitch & putt(9)

### La Pinetina Golf Club (Italy, 1 courses)

- DB: lat=45.717666, lon=8.9527804, website=null, phone="+39 (0)31 933202"
- OSM (no-match, 265494m, sim=0.5): name="Circolo Golf Venezia", website="https://www.circologolfvenezia.it/", phone="+39 041 731333", email="info@circologolfvenezia.it"
- LC  (medium, 287m, sim=1): name="La Pinetina Golf Club", phone="+39 (0)31 933202", region="Lombardy", percorsi=8.1(18)

### Lainate Golf Club (Italy, 1 courses)

- DB: lat=45.5656001, lon=9.0364407, website=null, phone=null
- OSM (low, 33m, sim=0): name="Green Club Golf", website=null, phone=null, email=null
- LC  (low, 231m, sim=0.538): name="Green Club Lainate", phone="+39 02 9370869", region="Lombardy", percorsi=7.0(18)

### Lanzo (Italy, 1 courses)

- DB: lat=45.9750335, lon=9.0377673, website=null, phone="+39 031 839060"
- OSM (high, 128m, sim=1): name="Golf Club Lanzo", website=null, phone=null, email=null
- LC  (high, 128m, sim=1): name="Lanzo Golf Club", phone="+39 031 839060", region="Lombardy", percorsi=7.7(9)

### Le Fronde Golf Club (Italy, 1 courses)

- DB: lat=45.0760512, lon=7.4018926, website=null, phone=null
- OSM (low, 1127m, sim=1): name="Golf Club Le Fronde", website=null, phone=null, email=null
- LC  (low, 843m, sim=1): name="Le Fronde Golf Club", phone="+39 11 9328053", region="Piedmont", percorsi=8.0(18)

### Le madonie (Italy, 1 courses)

- DB: lat=37.853282, lon=14.1520766, website=null, phone=null
- OSM (low, 28133m, sim=1): name="Le Madonie Golf", website=null, phone=null, email=null
- LC  (low, 24441m, sim=1): name="Le Madonie Golf Club", phone="+39 (0)921 934387", region="Sicily", percorsi=7.7(18)

### Le Saie Golf Club (Italy, 1 courses)

- DB: lat=45.1230122, lon=7.7775114, website=null, phone=null
- OSM (no-match, 766696m, sim=0.429): name="Golf Club Salerno", website="https://golfclubsalerno.it/", phone="+39 089 200300", email="info@golfclubsalerno.it"
- LC  (low, 1058045m, sim=1): name="Le Saie Golf Club", phone="+39 095 8320291", region="Sicily", percorsi=Le Saie Golf Course(18)

### Living Garden (Italy, 1 courses)

- DB: lat=45.5807415, lon=8.1835541, website=null, phone="+39 15 980556"
- OSM (low, 473m, sim=0.077): name="Golf Club Cossato", website=null, phone=null, email=null
- LC  (medium, 309m, sim=1): name="Golf Club Living Garden", phone="+39 15 980556", region="Piedmont", percorsi=4.0(9)

### Marco Polo Golf Club (Italy, 1 courses)

- DB: lat=41.963316, lon=12.6401473, website=null, phone=null
- OSM (low, 375m, sim=0.583): name="Marco Simone Golf and Country Club", website="https://www.golfmarcosimone.com", phone=null, email=null
- LC  (low, 597m, sim=0.583): name="Marco Simone Golf & Country Club", phone="+39 0774 366469", region="Lazio", percorsi=Campionato (Championship Course)(18)

### MAREMMELLO (Italy, 1 courses)

- DB: lat=42.5960283, lon=11.2234774, website=null, phone=null
- OSM (no-match, 467602m, sim=0.5): name="Golf Club Mirabell", website="https://www.mirabell.it/de/golf/mirabell-golfclub/", phone=null, email=null
- LC  (low, 5097m, sim=1): name="Maremmello Circolo Golf", phone="+39 564 886217", region="Tuscany", percorsi=6.8(9)

### Matilde di Canossa Golf Club (Italy, 1 courses)

- DB: lat=44.675888, lon=10.5321444, website=null, phone=null
- OSM (medium, 262m, sim=1): name="Matilde di Canossa Golf Club", website=null, phone=null, email=null
- LC  (low, 329m, sim=0.6): name="Terra Di Canossa Golf Club", phone="+39 342 512 1318", region="Emilia-Romagna", percorsi=7.4(18)

### Menaggio & Cadenabbia Golf Club (Italy, 1 courses)

- DB: lat=46.0228472, lon=9.2135561, website=null, phone=null
- OSM (no-match, 191962m, sim=0.474): name="Reggio Emilia Golf Club", website=null, phone=null, email=null
- LC  (low, 700m, sim=1): name="Menaggio & Cadenabbia Golf Club", phone="+39 0344 32103", region="Lombardy", percorsi=Menaggio e Cadenabbia(18)

### Modena Golf & Country Club (Italy, 2 courses)

- DB: lat=44.5435551, lon=10.9016551, website=null, phone="+39 (0)59 553482"
- OSM (low, 340m, sim=0.75): name="Modena Golf e Country Club", website=null, phone=null, email=null
- LC  (high, 38m, sim=1): name="Modena Golf & Country Club", phone="+39 (0)59 553482", region="Emilia-Romagna", percorsi=Bernhard Langer Course(18)

### Monte Cimone (Italy, 1 courses)

- DB: lat=44.2342247, lon=10.7805291, website=null, phone=null
- OSM (low, 799m, sim=1): name="Monte Cimone Golf Club", website="https://www.montecimonegolfclub.com/", phone="+39 0536 61372", email="golfclub@appenninobianco.it"
- LC  (low, 739m, sim=1): name="Monte Cimone Golf Club", phone="+39 (0)536 61372", region="Emilia-Romagna", percorsi=7.4(9)

### Montebelluna 9 Buche (Italy, 1 courses)

- DB: lat=45.7986338, lon=12.0347612, website=null, phone=null
- OSM (no-match, 29653m, sim=0.35): name="9 Buche", website=null, phone=null, email=null
- LC  (low, 183m, sim=0.6): name="Golf Club Montebelluna", phone="+39 0423 301195", region="Veneto", percorsi=6.3(9)

### Montebelluna Golf Club (Italy, 2 courses)

- DB: lat=45.7986338, lon=12.0347612, website=null, phone="+39 0423 301195"
- OSM (no-match, 167685m, sim=0.583): name="Golf Club Monteveglio Asd", website="http://www.golfclubmonteveglio.it/", phone="+39 051 670 5387", email=null
- LC  (high, 183m, sim=1): name="Golf Club Montebelluna", phone="+39 0423 301195", region="Veneto", percorsi=6.3(9)

### Montelupo Golf Club (Italy, 3 courses)

- DB: lat=43.7377606, lon=10.9887838, website=null, phone="+39 0571 541004"
- OSM (high, 53m, sim=1): name="Montelupo Golf Club", website=null, phone=null, email=null
- LC  (high, 82m, sim=1): name="Montelupo Golf Club", phone="+39 0571 541004", region="Tuscany", percorsi=7.5(9)

### Monticello Golf Club (Italy, 2 courses)

- DB: lat=45.7528763, lon=9.0179624, website=null, phone="+39 (0)31 928055"
- OSM (low, 679m, sim=1): name="Golf Club Monticello", website=null, phone=null, email=null
- LC  (high, 131m, sim=1): name="Golf Club Monticello", phone="+39 (0)31 928055", region="Lombardy", percorsi=Rosso(18)

### Musella Golf (Italy, 1 courses)

- DB: lat=45.4233324, lon=11.093442, website=null, phone=null
- OSM (no-match, 308241m, sim=0.5): name="Castellaro Golf Resort", website=null, phone="+39 0184 482600", email=null
- LC  (low, Infinitym, sim=1): name="Golf Musella", phone="+39 045 876 9837", region="Veneto", percorsi=Parco Del Golf Musella(?)

### Oasi di Magliano - I Fiordalisi Golf Club (Italy, 1 courses)

- DB: lat=44.1726429, lon=12.0776113, website=null, phone=null
- OSM (no-match, 213532m, sim=0.346): name="Tesino Golf Club La Farfalla", website="https://www.tesinogolf.com/", phone="+39 0461 593253; +39 347 291 8358", email="info@tesinogolf.com"
- LC  (low, 841m, sim=1): name="Oasi di Magliano- I Fiordalisi Golf  Club", phone="+39 3 801 920 097", region="Emilia-Romagna", percorsi=Golf Club I Fiordalisi(9)

### Oasi Golf Club (Italy, 2 courses)

- DB: lat=45.5539628, lon=9.1775419, website=null, phone=null
- OSM (low, 8m, sim=0.154): name="Golf su Pista - Oasi del Divertimento", website=null, phone="+39 02 6193057", email="oasideldivertimento@tiscali.it"
- LC  (low, 524757m, sim=1): name="Oasi Golf Club", phone="+39 (0)6 92746252", region="Lazio", percorsi=6.5(18)

### Olgiata Golf Club (Italy, 4 courses)

- DB: lat=42.0385075, lon=12.3681522, website=null, phone="+39 (0)6 30 889141"
- OSM (high, 101m, sim=1): name="Olgiata Golf Club", website=null, phone=null, email=null
- LC  (high, 102m, sim=1): name="Olgiata Golf Club", phone="+39 (0)6 30 889141", region="Lazio", percorsi=Percorso Ovest(18)

### Origini Golf Mantova (Italy, 1 courses)

- DB: lat=45.1137951, lon=10.6895282, website=null, phone=null
- OSM (low, 69m, sim=0.467): name="Mantova Golf", website=null, phone=null, email=null
- LC  (no-match, 246733m, sim=0.533): name="Circolo Golf Torino La Mandria", phone="+39 011 9235440", region="Piedmont", percorsi=Pitch & putt(9)

### Panorama Golf (Italy, 1 courses)

- DB: lat=45.8222957, lon=8.8532441, website=null, phone="+39 0332 330356"
- OSM (no-match, 168710m, sim=0.625): name="Parma Golf & Country Club", website="https://www.parmagolf.it/", phone="+39 345 9018222", email="info@parmagolf.it"
- LC  (medium, 367m, sim=1): name="Panorama Golf", phone="+39 0332 330356", region="Lombardy", percorsi=9 Hole Golf Course(9)

### Parco dei Colli (Italy, 1 courses)

- DB: lat=45.7566557, lon=9.7542192, website=null, phone=null
- OSM (low, 11889m, sim=1): name="Golf Club Parco Dei Colli", website=null, phone=null, email=null
- LC  (no-match, 474391m, sim=0.636): name="Parco di Roma Golf Club", phone="+39 (0)6 3313381", region="Lazio", percorsi=Parco di Roma(18)

### PARCO DEL GOLF MUSELLA (Italy, 1 courses)

- DB: lat=45.7759957, lon=9.2151181, website=null, phone=null
- OSM (low, 27m, sim=0.167): name="Buena Vista Social Golf", website=null, phone=null, email=null
- LC  (no-match, 271222m, sim=0.538): name="Golf Club Parco Di Firenze", phone="+39 055785627", region="Tuscany", percorsi=Asd Golf Club Parco Di Firenze(9)

### Parco di Roma Golf Club (Italy, 2 courses)

- DB: lat=41.9611156, lon=12.4764326, website=null, phone=null
- OSM (low, 784m, sim=1): name="Parco di Roma Golf Club", website=null, phone=null, email=null
- LC  (low, 678m, sim=1): name="Parco di Roma Golf Club", phone="+39 (0)6 3313381", region="Lazio", percorsi=Parco di Roma(18)

### Piacenza golf (Italy, 1 courses)

- DB: lat=44.8476352, lon=9.6665313, website=null, phone=null
- OSM (low, 161451m, sim=0.75): name="Golf Club Vicenza", website=null, phone=null, email=null
- LC  (low, 161551m, sim=0.75): name="Golf Club Vicenza", phone="+39 0444 340448", region="Veneto", percorsi=Golf Club Vicenza S.R.L. - Ssd(9)

### Pinerolo Golf Club (Italy, 1 courses)

- DB: lat=41.963316, lon=12.6401473, website=null, phone=null
- OSM (low, 375m, sim=0.083): name="Marco Simone Golf and Country Club", website="https://www.golfmarcosimone.com", phone=null, email=null
- LC  (low, 597m, sim=0.083): name="Marco Simone Golf & Country Club", phone="+39 0774 366469", region="Lazio", percorsi=Campionato (Championship Course)(18)

### Poggio dei Medici (Italy, 2 courses)

- DB: lat=43.9920112, lon=11.3346939, website="https://www.golfpoggiodeimedici.com/", phone=null
- OSM (high, 9m, sim=1): name="Golf Club Poggio dei Medici", website="https://www.golfpoggiodeimedici.com/", phone=null, email=null
- LC  (low, 541m, sim=1): name="Poggio dei Medici Golf & Country Club", phone="+39 3760622288", region="Tuscany", percorsi=Poggio dei Medici(18)

### PUNTALDIA (Italy, 1 courses)

- DB: lat=40.8140434, lon=9.6854304, website=null, phone="+39 0784 864477"
- OSM (low, 506m, sim=1): name="Golf Club Puntaldía", website=null, phone=null, email=null
- LC  (medium, 317m, sim=1): name="Golf Club Puntaldia", phone="+39 0784 864477", region="Sardinia", percorsi=7.4(9)

### Reggio Emilia (Italy, 1 courses)

- DB: lat=44.6086674, lon=10.5940667, website=null, phone=null
- OSM (low, 12085m, sim=1): name="Reggio Emilia Golf Club", website=null, phone=null, email=null
- LC  (no-match, 89886m, sim=0.538): name="Poggio dei Medici Golf & Country Club", phone="+39 3760622288", region="Tuscany", percorsi=Poggio dei Medici(18)

### Reggio Emilia Golf (Italy, 1 courses)

- DB: lat=44.6627783, lon=10.7270362, website=null, phone=null
- OSM (high, 42m, sim=1): name="Reggio Emilia Golf Club", website=null, phone=null, email=null
- LC  (no-match, 88337m, sim=0.538): name="Poggio dei Medici Golf & Country Club", phone="+39 3760622288", region="Tuscany", percorsi=Poggio dei Medici(18)

### Riolo Golf - La Torre (Italy, 1 courses)

- DB: lat=44.2648116, lon=11.7337541, website=null, phone="+39 546 74035"
- OSM (no-match, 168706m, sim=0.467): name="Golf Pra' delle Torri", website="https://www.golfpradelletorri.it/", phone="+39 0421 299570", email="info@golfcaorle.it"
- LC  (high, 80m, sim=0.818): name="Golf & Country Club Riolo Terme", phone="+39 546 74035", region="Emilia-Romagna", percorsi=Riolo Golf La Torre(18)

### Riva dei Tessali (Italy, 1 courses)

- DB: lat=40.4524009, lon=16.9080877, website=null, phone=null
- OSM (no-match, 582889m, sim=0.667): name="Riva Toscana", website=null, phone=null, email=null
- LC  (low, 314m, sim=0.667): name="Riva dei Tessali Hotel & Golf Resort", phone="+39 (0)99 8431844", region="Apulia", percorsi=Riva dei Tessali(18)

### Riva Toscana Golf Resort (Italy, 1 courses)

- DB: lat=42.9419375, lon=10.7221386, website=null, phone="+39 0566 028036"
- OSM (medium, 398m, sim=1): name="Riva Toscana", website=null, phone=null, email=null
- LC  (high, 61m, sim=1): name="Riva Toscana Golf Resort & SPA", phone="+39 0566 028036", region="Tuscany", percorsi=Riva Toscana Championship Course(?)

### Riviera Golf Club - Executive Course (Italy, 1 courses)

- DB: lat=43.9465797, lon=12.6907078, website=null, phone=null
- OSM (low, 17m, sim=0.412): name="Riviera Golf Club", website="https://www.rivieragolfresort.com/", phone="+39 0541 956499", email="info@rivieragolfresort.com"
- LC  (low, 275m, sim=0.412): name="Riviera Golf Resort", phone="+39 0541 955009", region="Emilia-Romagna", percorsi=Riviera Golf Club(18)

### Royal Park I Roveri (Italy, 2 courses)

- DB: lat=45.1885339, lon=7.5644047, website=null, phone=null
- OSM (low, 598m, sim=0.421): name="I Roveri", website="https://www.royalparkgolf.it/", phone=null, email=null
- LC  (low, 1163m, sim=1): name="Royal Park I Roveri", phone="+39 011 9235500", region="Piedmont", percorsi=Allianz Bank Course by Hurdzan-Fry(18)

### San Domenico Golf (Italy, 1 courses)

- DB: lat=40.8699069, lon=17.4002293, website=null, phone=null
- OSM (low, 748m, sim=1): name="San Domenico Golf", website=null, phone=null, email=null
- LC  (low, 664m, sim=1): name="San Domenico Golf", phone="+39 080 4829200", region="Apulia", percorsi=San Domenico Links(18)

### San Donato Golf (Italy, 1 courses)

- DB: lat=42.4020865, lon=13.240953, website=null, phone="+39 (0)862601212"
- OSM (medium, 333m, sim=1): name="San Donato Golf", website=null, phone=null, email=null
- LC  (medium, 311m, sim=1): name="San Donato Golf", phone="+39 (0)862601212", region="Abruzzo", percorsi=6.1(18)

### San Valentino Golf Club (Italy, 1 courses)

- DB: lat=44.5277122, lon=10.6886547, website=null, phone=null
- OSM (low, 713m, sim=0.846): name="Golf Club S. Valentino", website=null, phone=null, email=null
- LC  (low, 600m, sim=1): name="San Valentino Golf Club", phone="+39 (0)536 854033", region="Emilia-Romagna", percorsi=8.2(18)

### San Valentino Old Course (Italy, 1 courses)

- DB: lat=44.5277122, lon=10.6886547, website=null, phone=null
- OSM (low, 713m, sim=0.647): name="Golf Club S. Valentino", website=null, phone=null, email=null
- LC  (low, 600m, sim=0.765): name="San Valentino Golf Club", phone="+39 (0)536 854033", region="Emilia-Romagna", percorsi=8.2(18)

### Sant'Arnica (Italy, 1 courses)

- DB: lat=37.3684522, lon=15.0770171, website=null, phone=null
- OSM (low, 950478m, sim=0.727): name="Golf Sant'Anna", website=null, phone=null, email=null
- LC  (no-match, 438378m, sim=0.5): name="San Domenico Golf", phone="+39 080 4829200", region="Apulia", percorsi=San Domenico Links(18)

### Serravalle Golf Club (Italy, 1 courses)

- DB: lat=44.7270073, lon=8.848624, website=null, phone=null
- OSM (no-match, 1090m, sim=0.1): name="La Bollina Golf Club", website=null, phone=null, email=null
- LC  (low, 891m, sim=1): name="Serravalle Golf Club", phone="+39 0143 62065", region="Piedmont", percorsi=Serravalle Golf Club Ssd A R.L.(18)

### St. Anna Golf (Italy, 1 courses)

- DB: lat=44.4049436, lon=8.6426002, website=null, phone=null
- OSM (low, 376m, sim=0.778): name="Golf Sant'Anna", website=null, phone=null, email=null
- LC  (low, 619m, sim=0.5): name="Golf Club Genova St. Anna", phone="+39 010 9135322", region="Liguria", percorsi=St. Anna Golf(18)

### Tanka Golf Villasimius (Italy, 1 courses)

- DB: lat=39.1326416, lon=9.5145269, website=null, phone=null
- OSM (low, 24m, sim=0.294): name="Tanka Golf Club", website="http://www.golftanka.it/", phone="+39 342 8856244", email=null
- LC  (low, 1867m, sim=1): name="Tanka Golf Villasimius", phone="+39 347 1724373", region="Sardinia", percorsi=8.3(18)

### Torre dei Ronchi (Italy, 1 courses)

- DB: lat=44.4412938125176, lon=7.57885412178382, website=null, phone=null
- OSM (medium, 287m, sim=1): name="Torre dei Ronchi Golf Club", website=null, phone=null, email=null
- LC  (low, 1071m, sim=1): name="Torre Dei Ronchi Golf Club Asd", phone="+39 320 0370224", region="Piedmont", percorsi=5.5(9)

### Torrenova Golf Club (Italy, 1 courses)

- DB: lat=43.3946485, lon=13.668355, website=null, phone=null
- OSM (low, 726m, sim=0.375): name="Torrenova Golf Club Potenza Picena", website=null, phone=null, email=null
- LC  (low, Infinitym, sim=1): name="Torrenova Golf Club", phone="+39 350 002 8506", region="Marche", percorsi=8.0(9)

### Trieste Golf Club (Italy, 1 courses)

- DB: lat=45.6422103, lon=13.8414467, website=null, phone="+39 (0)40 226159"
- OSM (high, 22m, sim=1): name="Golf Club Trieste", website=null, phone=null, email=null
- LC  (medium, 314m, sim=1): name="Trieste Golf Club", phone="+39 (0)40 226159", region="Friuli-Venezia Giulia", percorsi=6.5(18)

### USD Golf Club Santa Maria Maggiore (Italy, 2 courses)

- DB: lat=46.1350542, lon=8.4666225, website=null, phone=null
- OSM (low, 1289m, sim=0.833): name="Golf Santa Maria Maggiore", website="http://www.golfsantamaria.it", phone="+39 389 8760223", email="info@golfsantamaria.it"
- LC  (no-match, 188074m, sim=0.417): name="Salsomaggiore Golf", phone="+39 0524583102", region="Emilia-Romagna", percorsi=Salsomaggiore Golf Ssd S.R.L.(18)

### Valtellina Golf Club Spa (Italy, 2 courses)

- DB: lat=46.1534801, lon=9.8147989, website=null, phone=null
- OSM (low, 1859m, sim=1): name="Valtellina Golf Club", website=null, phone=null, email=null
- LC  (low, 3261m, sim=1): name="Valtellina Golf Club", phone="+39 342 354009", region="Lombardy", percorsi=8.5(18)

### Varvarusa Golf Club (Italy, 1 courses)

- DB: lat=41.545332, lon=14.0561754, website=null, phone=null
- OSM (low, 2011m, sim=1): name="Varvarusa Golf Club", website="http://www.varvarusa.it/", phone=null, email=null
- LC  (no-match, 592566m, sim=0.556): name="Golf Club Margara", phone="+39 (0)131 778555", region="Piedmont", percorsi=La Guazzetta(18)

### Vigevano (Italy, 1 courses)

- DB: lat=45.3023949, lon=8.9011354, website=null, phone="+39 (0)381 346628"
- OSM (low, 145m, sim=0.4): name="Golf Club Vigevano \"S.Martretta\"", website="http://www.golfvigevano.it/", phone="+39 381 346628", email=null
- LC  (medium, 388m, sim=1): name="Vigevano Golf Club", phone="+39 (0)381 346628", region="Lombardy", percorsi=7.6(18)

### Villa Carolina - I Tigli (Italy, 1 courses)

- DB: lat=44.7072207, lon=8.6983454, website=null, phone=null
- OSM (low, 117m, sim=0.636): name="Golf Club Villa Carolina", website=null, phone=null, email=null
- LC  (no-match, 2481m, sim=0.636): name="Golf Club Villa Carolina", phone="+39 0143 467355", region="Piedmont", percorsi=Paradiso Course(18)

### Villa d'Este (Italy, 1 courses)

- DB: lat=45.7779774, lon=9.1401147, website=null, phone="+39 (0)31 200200"
- OSM (low, 697m, sim=1): name="Golf Villa D'Este", website=null, phone=null, email=null
- LC  (medium, 290m, sim=1): name="Golf Club Villa d'Este", phone="+39 (0)31 200200", region="Lombardy", percorsi=Villa d&#x27;Este(18)

### Villa Giusti (Italy, 1 courses)

- DB: lat=45.406088, lon=10.7944846, website=null, phone="+39 45 7190043"
- OSM (high, 38m, sim=1): name="Golf Villa Giusti", website=null, phone=null, email=null
- LC  (medium, 380m, sim=1): name="Circolo Golf Villa Giusti", phone="+39 45 7190043", region="Veneto", percorsi=Golf Club Villa Giusti(18)

### Villafranca le Vigne (Italy, 1 courses)

- DB: lat=42.1950098, lon=12.2900761, website=null, phone=null
- OSM (low, 168m, sim=0.118): name="Terre dei Consoli Golf Club & Resort", website="http://www.terredeiconsoli.it/", phone="+39 0761699888", email=null
- LC  (low, 495m, sim=0.118): name="Terre Dei Consoli", phone="+39 761699888", region="Lazio", percorsi=Championship Course(18)

### virginia golf club (Italy, 1 courses)

- DB: lat=53.8340832, lon=-7.0937717, website=null, phone=null
- OSM (no-match, 1699730m, sim=0.625): name="Golf Club Tirrenia", website="https://www.golftirrenia.it/", phone="+39 050 37518", email="info@golftirrenia.it"
- LC  (low, 1457563m, sim=1): name="Virginia Golf", phone="+39 3932020393", region="Lombardy", percorsi=7.4(9)

### Zerman (Italy, 1 courses)

- DB: lat=45.5794755, lon=12.2686586, website=null, phone=null
- OSM (low, 363m, sim=0.133): name="Golf Club Villa Condulmer", website="https://www.golfvillacondulmer.com/", phone="+39 041 457062", email="info@golfvillacondulmer.com"
- LC  (low, 882m, sim=1): name="Golf Zerman", phone="+39 328 194 2494", region="Veneto", percorsi=Ass.Ne Sportiva Golf Zerman(9)

### Zoate (Italy, 1 courses)

- DB: lat=45.4049084, lon=9.3621534, website=null, phone="+39 02 90632183"
- OSM (no-match, 38068m, sim=0.571): name="Golf Club Lazzate", website="https://golfclublazzate.it/", phone="+39 333 43 36 303", email=null
- LC  (high, 73m, sim=1): name="Zoate Golf Club", phone="+39 02 90632183", region="Lombardy", percorsi=7.4(18)

## Review — DB allerede fuld (ingen action)

DB har både website og phone; ingen enrichment nødvendig. Inkluderet for fuldstændighed.

### Acaya Golf Club (Italy, 1 courses)

- DB: lat=40.3449148, lon=18.3162861, website="https://www.acayagolfresort.com/", phone="+39 (0)832 861385"
- OSM (high, 72m, sim=0.8): name="Acaia Golf Resort", website="https://www.acayagolfresort.com/", phone=null, email=null
- LC  (medium, 434m, sim=1): name="Acaya Golf Resort & Spa", phone="+39 (0)832 861385", region="Apulia", percorsi=Acaya Golf course(18)

### Albarella Golf Club (Italy, 1 courses)

- DB: lat=45.0752457, lon=12.3523222, website="https://www.albarella.it/golf", phone="+39 0426 332600"
- OSM (high, 99m, sim=1): name="Albarella Golf Club", website="https://www.albarella.it/golf", phone="+39 0426 332600", email=null
- LC  (low, 317m, sim=0.6): name="Albarella Golf Links", phone="+39 0426 330124", region="Veneto", percorsi=Albarella golf course(18)

### Albisola Golf Club (Italy, 3 courses)

- DB: lat=44.3432476, lon=8.4974079, website="https://www.golfclubalbisola.it/index.html", phone="+39 19 489679"
- OSM (high, 34m, sim=1): name="Golf Club Albisola", website="https://www.golfclubalbisola.it/index.html", phone="+39 019 489679", email=null
- LC  (high, 33m, sim=1): name="Golf Club Albisola", phone="+39 19 489679", region="Liguria", percorsi=Filanda Golf Club S.S.Dilet.R.L.(9)

### Alta Badia Golf Club (Italy, 2 courses)

- DB: lat=46.5395546, lon=11.88743, website="https://www.golfaltabadia.it/", phone="+39 0471 836655"
- OSM (medium, 354m, sim=1): name="Golf Club Alta Badia", website="https://www.golfaltabadia.it/", phone="+39 0471 836655", email="info@golfaltabadia.it"
- LC  (high, 146m, sim=1): name="Golf Club Alta Badia", phone="+39 0471 836655", region="Trentino-Alto Adige/Südtirol", percorsi=7.0(9)

### Archi di Claudio (Italy, 2 courses)

- DB: lat=41.8419006, lon=12.5608544, website="https://www.archidiclaudiogolf.it/", phone="+39 6 7187550"
- OSM (high, 178m, sim=1): name="Archi di Claudio Golf Club", website="https://www.archidiclaudiogolf.it/", phone="+39 06 7187550", email=null
- LC  (medium, 492m, sim=1): name="Archi Di Claudio Golf Club", phone="+39 6 7187550", region="Lazio", percorsi=Archi Di Claudio Golf Club A.S.D.(9)

### Argenta Golf Club (Italy, 1 courses)

- DB: lat=44.6318399, lon=11.8091876, website="https://www.argentagolf.it/", phone="+39 0532 852545"
- OSM (high, 218m, sim=1): name="Argenta Golf Club", website="https://www.argentagolf.it/", phone="+39 0532 852545", email="segreteria@argentagolf.it"
- LC  (low, 5108m, sim=1): name="Argenta Golf Club", phone="+39 0532 852545", region="Emilia-Romagna", percorsi=7.4(18)

### Arzaga Golf Club (Italy, 9 courses)

- DB: lat=45.5117585, lon=10.4699961, website="https://www.arzagagolf.it/", phone="+39 030 6806266"
- OSM (high, 112m, sim=1): name="Arzaga Golf Club", website="https://www.arzagagolf.it/", phone="+39 030 6806266", email="golf@arzagagolf.it"
- LC  (low, 668m, sim=1): name="Arzaga Golf Club", phone="+39 030 6806266", region="Lombardy", percorsi=Gary Player(9)

### ASD Barlassina Country Club (Italy, 2 courses)

- DB: lat=45.6590798, lon=9.1167615, website="https://www.barlassinacountryclub.it/", phone="+39 (0)362 560621"
- OSM (high, 223m, sim=1): name="Golf Barlassina Country Club", website="https://www.barlassinacountryclub.it/", phone="+39 0362 56 06 21;+39 0362 56 06 22", email=null
- LC  (medium, 267m, sim=1): name="Barlassina Country Club", phone="+39 (0)362 560621", region="Lombardy", percorsi=Barlassina(18)

### ASD Golf Club Frassanelle (Italy, 1 courses)

- DB: lat=45.3817569, lon=11.672, website="https://www.golffrassanelle.it/", phone="+39 (0)49 9910722"
- OSM (high, 223m, sim=1): name="Golf Club Frassanelle", website="https://www.golffrassanelle.it/", phone="+39 049 9910722", email="info@golffrassanelle.it"
- LC  (medium, 483m, sim=1): name="Golf Club Frassanelle", phone="+39 (0)49 9910722", region="Veneto", percorsi=Frassanelle Golf Club(18)

### Asolo Golf Club (Italy, 3 courses)

- DB: lat=45.8577644, lon=11.9338644, website="https://www.asologolf.it/", phone="+39 0423 942211"
- OSM (medium, 398m, sim=1): name="Asolo Golf Club", website="https://www.asologolf.it/", phone="+39 0423 942211", email="info@asologolf.it"
- LC  (low, 636m, sim=1): name="Asolo Golf Club", phone="+39 (0)423 942211", region="Veneto", percorsi=Red Course(9)

### Barialto (Italy, 1 courses)

- DB: lat=40.9883608, lon=16.9097621, website="https://www.barialtogolfclub.com/", phone="+39 080 6977105"
- OSM (high, 224m, sim=1): name="Barialto Golf Club", website="https://www.barialtogolfclub.com/", phone="+39 080 697 7105", email="info@barialtogolfclub.com"
- LC  (high, 224m, sim=1): name="Barialto Golf Club", phone="+39 080 6977105", region="Apulia", percorsi=7.0(18)

### Bogogno Golf Resort (Italy, 2 courses)

- DB: lat=45.6528358, lon=8.529424, website="http://www.golfbogogno.com/", phone="+39 (0)322 864137"
- OSM (high, 7m, sim=1): name="Golf Club Bogogno", website="http://www.golfbogogno.com/", phone="+39 0322 863 794", email=null
- LC  (medium, 457m, sim=1): name="Bogogno Golf Resort", phone="+39 (0)322 864137", region="Piedmont", percorsi=Bonara Course(18)

### Ca Amata Golf Club (Italy, 3 courses)

- DB: lat=45.694428, lon=11.9399635, website="https://www.golfcaamata.it/", phone="+39 423 493537"
- OSM (high, 163m, sim=1): name="Golf Club Ca' Amata", website="https://www.golfcaamata.it/", phone="+39 0423 493 537", email="info@golfcaamata.it"
- LC  (high, 163m, sim=1): name="Golf Club Ca' Amata", phone="+39 423 493537", region="Veneto", percorsi=Ca Amata Castelfranco(18)

### Casalunga (Italy, 2 courses)

- DB: lat=44.496009, lon=11.4605961, website="http://www.casalungagolfresort.com/", phone="+39 51/6050164"
- OSM (high, 96m, sim=1): name="Golf Club Casalunga", website="http://www.casalungagolfresort.com/", phone="+39 0516050164", email="info@casalungagolfresort.com"
- LC  (high, 118m, sim=1): name="Casalunga Golf Club", phone="+39 51/6050164", region="Emilia-Romagna", percorsi=7.6(9)

### Castelconturbia Golf (Italy, 9 courses)

- DB: lat=45.6515251, lon=8.5732865, website="http://golfclubcastelconturbia.org", phone="+39 (0)322 832093"
- OSM (high, 13m, sim=1): name="Golf Club Castelconturbia", website="http://golfclubcastelconturbia.org", phone="+39 0322 832093;+39 0322 832338", email="info@golfclubcastelconturbia.it"
- LC  (high, 158m, sim=1): name="Golf Club Castelconturbia", phone="+39 (0)322 832093", region="Piedmont", percorsi=Chestnut and Pines course (blue-yellow)(18)

### Centanni Golf Club (Italy, 2 courses)

- DB: lat=43.7442501, lon=11.3328067, website="https://www.golfclubcentanni.it/", phone="+39 (0) 55 630 122"
- OSM (high, 93m, sim=1): name="Golf Club Centanni", website="https://www.golfclubcentanni.it/", phone=null, email=null
- LC  (high, 93m, sim=1): name="Golf Club Centanni", phone="+39 (0) 55 630 122", region="Tuscany", percorsi=A.s.d. Golf Club Centanni(9)

### chervò golf san vigilio (Italy, 9 courses)

- DB: lat=45.4086834, lon=10.5930987, website="https://www.chervogolfsanvigilio.it/", phone="+39 030 91801"
- OSM (high, 17m, sim=1): name="Chervò Golf San Vigilio", website="https://www.chervogolfsanvigilio.it/", phone="+39 030 91801", email=null
- LC  (low, 196m, sim=0.611): name="Golf Club San Vigilio", phone="+39 030 91801", region="Lombardy", percorsi=Benaco & Solferino Course(18)

### Circolo Golf Sestriere (Italy, 1 courses)

- DB: lat=44.9555503, lon=6.8821968, website="https://www.vialattea.it/Sport/Golf", phone="+39 122 799411 - 76243"
- OSM (high, 167m, sim=0.9): name="Golf Club Sestrieres", website="https://www.vialattea.it/Sport/Golf", phone=null, email=null
- LC  (high, 243m, sim=0.9): name="Sestrieres Golf Club", phone="+39 122 799411 - 76243", region="Piedmont", percorsi=6.8(18)

### Circolo Golf Venezia (Italy, 1 courses)

- DB: lat=45.3453115, lon=12.3169536, website="https://www.circologolfvenezia.it/", phone="+39 (0)41 731333"
- OSM (high, 238m, sim=1): name="Circolo Golf Venezia", website="https://www.circologolfvenezia.it/", phone="+39 041 731333", email="info@circologolfvenezia.it"
- LC  (high, 205m, sim=1): name="Circolo Golf Venezia", phone="+39 (0)41 731333", region="Veneto", percorsi=7.7(18)

### Cortina Golf (Italy, 1 courses)

- DB: lat=46.522229, lon=12.1495792, website="https://www.cortinagolf.it/", phone="+39 436 860952"
- OSM (high, 149m, sim=1): name="Cortina Golf", website="https://www.cortinagolf.it/", phone="+39 0436 860952", email=null
- LC  (medium, 336m, sim=1): name="Cortina Golf Club", phone="+39 436 860952", region="Veneto", percorsi=Associazione Golf Cortina(9)

### Franciacorta Golf Club (Italy, 9 courses)

- DB: lat=45.6239333, lon=9.99846, website="https://www.franciacortagolfclub.it/", phone="+39 030 984167"
- OSM (high, 23m, sim=1): name="Golf Club Franciacorta", website="https://www.franciacortagolfclub.it/", phone="+39 030 984167", email="segreteria@franciacortagolfclub.it"
- LC  (high, 83m, sim=1): name="Franciacorta Golf Club", phone="+39 030 984167", region="Lombardy", percorsi=Satèn(9)

### Gardagolf Country Club (Italy, 9 courses)

- DB: lat=45.5440491, lon=10.5169263, website="https://www.gardagolf.it/", phone="+39 0365 674707"
- OSM (high, 143m, sim=1): name="Gardagolf Country Club", website="https://www.gardagolf.it/", phone="+39 0365 674707", email=null
- LC  (medium, 255m, sim=1): name="GardaGolf Country Club", phone="+39 0365 674707", region="Lombardy", percorsi=Red & White (Rosso & Bianco)(18)

### Golf Brianza Country Club (Italy, 3 courses)

- DB: lat=45.6424419, lon=9.3524387, website="https://www.brianzagolf.it/", phone="+39 039 6829079"
- OSM (high, 12m, sim=1): name="Golf Brianza Country Club", website="https://www.brianzagolf.it/", phone="+39 039 6829079", email="brianzagolf@tin.it"
- LC  (low, 548m, sim=1): name="Golf Brianza Country Club", phone="+39 (0)39 6829089", region="Lombardy", percorsi=8.2(18)

### Golf Ca 'Degli Ulivi (Italy, 2 courses)

- DB: lat=45.5967219, lon=10.7095997, website="https://www.golfclubcadegliulivi.it/", phone="+39 045 6279030"
- OSM (high, 90m, sim=1): name="Ca' degli Ulivi Golf", website="https://www.golfclubcadegliulivi.it/", phone="+39 045 6279030", email="info@golfclubcadegliulivi.it"
- LC  (low, 706m, sim=1): name="Circolo Golf Ca' Degli Ulivi", phone="+39 045 6279030", region="Veneto", percorsi=Percorso Championship(18)

### Golf Club Alpino di Stresa (Italy, 1 courses)

- DB: lat=45.8647635, lon=8.512832, website="https://www.golfalpino.it/", phone="+39 351 900 3252"
- OSM (medium, 430m, sim=1): name="Golf Club Alpino di Stresa", website="https://www.golfalpino.it/", phone=null, email=null
- LC  (high, 9m, sim=1): name="Alpino Di Stresa Golf Club", phone="+39 351 900 3252", region="Piedmont", percorsi=7.9(9)

### Golf Club Cansiglio (Italy, 1 courses)

- DB: lat=46.0676002, lon=12.4127001, website="http://www.golfclubcansiglio.it", phone="+39 0438 585398; +39 349 0058822"
- OSM (medium, 399m, sim=1): name="Golf Club Cansiglio", website="http://www.golfclubcansiglio.it", phone="+39 0438 585398; +39 349 0058822", email=null
- LC  (low, 9001m, sim=1): name="Golf Club Cansiglio", phone="+39 3490058822​​​​", region="Veneto", percorsi=Cansiglio Golf Club(18)

### Golf Club Casentino (Italy, 1 courses)

- DB: lat=43.7087078, lon=11.7628015, website="https://www.golfclubcasentino.it/", phone="+39 0575 529810"
- OSM (high, 115m, sim=1): name="Golf Club Casentino", website="https://www.golfclubcasentino.it/", phone="+39 0575 529810", email=null
- LC  (low, 778m, sim=1): name="Golf Club Casentino", phone="+39 0575 529810", region="Tuscany", percorsi=6.9(13)

### GOLF CLUB DES ILES BORROMEES (Italy, 1 courses)

- DB: lat=45.8529786, lon=8.5482506, website="http://www.golfdesilesborromees.it/", phone="+39 0323 929285"
- OSM (medium, 486m, sim=1): name="Golf Club des Iles Borromées", website="http://www.golfdesilesborromees.it/", phone="+39 0323 929285", email="info@golfdesiles.it"
- LC  (low, 1136m, sim=1): name="Golf Club Des Iles Borromées", phone="+39 (0)323 929285", region="Piedmont", percorsi=Golf Club Des Iles Borromees(18)

### Golf Club I Lauri (Italy, 1 courses)

- DB: lat=43.0568842, lon=13.7793291, website="http://www.golfclubilauri.com/", phone="0039 0735 72525"
- OSM (high, 12m, sim=1): name="Golf club I Lauri", website="http://www.golfclubilauri.com/", phone="+39 0735 72525", email="info@golfclubilauri.com"
- LC  (medium, 391m, sim=1): name="Golf Club I Lauri", phone="0039 0735 72525", region="Marche", percorsi=I Lauri(?)

### Golf Club Jesolo (Italy, 1 courses)

- DB: lat=45.5045725, lon=12.6091943, website="https://golfjesolo.it/", phone="+39 0421 372 862"
- OSM (medium, 285m, sim=1): name="Golf Club Jesolo", website="https://golfjesolo.it/", phone="+39 0421 372862", email="segreteria@golfclubjesolo.it"
- LC  (medium, 481m, sim=1): name="Golf Club Jesolo", phone="+39 0421 372 862", region="Veneto", percorsi=6.9(18)

### Golf Club Lamborghini (Italy, 1 courses)

- DB: lat=43.0562623, lon=12.1027758, website="http://www.lamborghinionline.it/pagine/golf-club", phone="+39 075 837582"
- OSM (high, 51m, sim=1): name="Golf Club Lamborghini", website="http://www.lamborghinionline.it/pagine/golf-club", phone="+39 075 837582", email="info@lamborghinigolf.it"
- LC  (low, 290m, sim=0.55): name="Golf Club Lamborghini-Panicale", phone="+39 075 837582", region="Umbria", percorsi=Golf Club Lamborghini-panicale(9)

### Golf Club le Fonti (Italy, 1 courses)

- DB: lat=44.3773265, lon=11.5823788, website="https://www.golfclublefonti.it/", phone="+39 051 6951958"
- OSM (high, 20m, sim=1): name="Golf Club Le Fonti", website="https://www.golfclublefonti.it/", phone="+39 051 695 1958", email="info@golfclublefonti.it"
- LC  (medium, 392m, sim=1): name="Golf Club Le Fonti", phone="+39 051 6951958", region="Emilia-Romagna", percorsi=7.8(18)

### Golf Club Monferrato (Italy, 1 courses)

- DB: lat=45.137613, lon=8.3956526, website="https://www.golfclubmonferrato.it/", phone="+39 0142 408915"
- OSM (high, 172m, sim=1): name="Golf Club Monferrato", website="https://www.golfclubmonferrato.it/", phone="+39 0142 408915", email=null
- LC  (low, Infinitym, sim=1): name="Golf Club Monferrato", phone="+39 0142 408915", region="Piedmont", percorsi=6.8(9)

### Golf Club Montecchia (Italy, 1 courses)

- DB: lat=45.3871002, lon=11.7582791, website="https://www.golfmontecchia.it/", phone="+39 049 8055550"
- OSM (medium, 338m, sim=1): name="Golf Club della Montecchia", website="https://www.golfmontecchia.it/", phone="+39 049 8055550", email="info@golfmontecchia.it"
- LC  (medium, 297m, sim=1): name="Golf della Montecchia", phone="+39 049 8055550", region="Veneto", percorsi=Rosso & Bianco(18)

### Golf Club Monteveglio (Italy, 1 courses)

- DB: lat=44.4452141, lon=11.0922722, website="http://www.golfclubmonteveglio.it/", phone="+39 51 6705387"
- OSM (high, 14m, sim=1): name="Golf Club Monteveglio Asd", website="http://www.golfclubmonteveglio.it/", phone="+39 051 670 5387", email=null
- LC  (high, 198m, sim=1): name="Golf Club Monteveglio", phone="+39 51 6705387", region="Emilia-Romagna", percorsi=Golf Course Monteveglio(9)

### Golf Club Palermo Parco Airoldi (Italy, 1 courses)

- DB: lat=38.1486722, lon=13.3487394, website="https://www.golfclubpalermo.com/", phone="+39 (0)91 543 534"
- OSM (high, 60m, sim=1): name="Golf Club Palermo - Parco Airoldi", website="https://www.golfclubpalermo.com/", phone="+39 091 543534", email=null
- LC  (medium, 328m, sim=1): name="Golf Club Palermo Parco Airoldi", phone="+39 (0)91 543 534", region="Sicily", percorsi=Villa Airoldi Golf Course(9)

### Golf Club Paradiso del Garda (Italy, 1 courses)

- DB: lat=45.4246509, lon=10.7100128, website="https://www.golfclubparadiso.it/", phone="+39 045 6405802"
- OSM (high, 139m, sim=1): name="Golf Club Paradiso del Garda", website="https://www.golfclubparadiso.it/", phone="+39 0365 913540", email="info-golf@parchotels.it"
- LC  (high, 166m, sim=1): name="Golf Club Paradiso del Garda", phone="+39 045 6405802", region="Veneto", percorsi=Paradiso del Garda(18)

### Golf Club Perugia (Italy, 1 courses)

- DB: lat=43.0843158, lon=12.3176779, website="https://www.golfclubperugia.it/", phone="+39 (0)75 5172204"
- OSM (high, 58m, sim=1): name="Golf Club Perugia", website="https://www.golfclubperugia.it/", phone=null, email="segreteria@golfclubperugia.it"
- LC  (medium, 276m, sim=1): name="Golf Club Perugia", phone="+39 (0)75 5172204", region="Umbria", percorsi=Circolo Golf Perugia(18)

### Golf Club Rendena (Italy, 1 courses)

- DB: lat=46.120112, lon=10.757703, website="http://www.golfrendena.it", phone="+39 0465 806049"
- OSM (medium, 443m, sim=1): name="Golf Rendena", website="http://www.golfrendena.it", phone="+39 0465 806049", email="info@golfrendena.it"
- LC  (medium, 346m, sim=1): name="Golf Club Rendena", phone="+39 0465 806049", region="Trentino-Alto Adige/Südtirol", percorsi=7.5(9)

### Golf Club Roncegno-Valsugana (Italy, 1 courses)

- DB: lat=46.0483034, lon=11.4170057, website="https://www.golfclubroncegno.it/", phone="+39 0461 773337"
- OSM (medium, 260m, sim=1): name="Golf Club Roncegno - Valsugana Golf", website="https://www.golfclubroncegno.it/", phone="+39 0461 773337", email="info@golfclubroncegno.it"
- LC  (low, 373m, sim=0.444): name="Roncegno Golf Club", phone="+39 0461 773337", region="Trentino-Alto Adige/Südtirol", percorsi=7.6(9)

### Golf club Salerno (Italy, 1 courses)

- DB: lat=40.5919401, lon=14.8765658, website="https://golfclubsalerno.it/", phone="+39 089200300"
- OSM (high, 85m, sim=1): name="Golf Club Salerno", website="https://golfclubsalerno.it/", phone="+39 089 200300", email="info@golfclubsalerno.it"
- LC  (high, 85m, sim=1): name="Golf Club Salerno", phone="+39 089200300", region="Campania", percorsi=6.3(9)

### Golf Club Santo Stefano (Italy, 1 courses)

- DB: lat=44.8325084, lon=10.7729605, website="http://www.golfsantostefano.it/", phone="+39 522 65915"
- OSM (high, 45m, sim=1): name="Golf Club Santo Stefano", website="http://www.golfsantostefano.it/", phone="+39 522 65915", email=null
- LC  (no-match, 172744m, sim=0.467): name="Golf della Pineta di Arenzano", phone="+39 0104714220 / +39 320 6329026", region="Liguria", percorsi=Golf Club Arenzano(9)

### Golf Club Terme di Galzignano (Italy, 1 courses)

- DB: lat=45.2905726, lon=11.7642531, website="http://www.golfclubgalzignano.it/", phone="+39 49 9195100"
- OSM (high, 61m, sim=1): name="Golf Club Terme di Galzignano", website="http://www.golfclubgalzignano.it/", phone="+39 049 9195100", email="termegolf@galzignano.it"
- LC  (high, 162m, sim=1): name="Golf Club Terme Di Galzignano", phone="+39 49 9195100", region="Veneto", percorsi=7.6(9)

### Golf Club Varese (Italy, 1 courses)

- DB: lat=45.8358757, lon=8.765491, website="https://www.golfclubvarese.it/", phone="+39 (0)332 229302"
- OSM (high, 138m, sim=1): name="Golf Club Varese", website="https://www.golfclubvarese.it/", phone="+39 332 229302", email="info@golfclubvarese.it"
- LC  (high, 86m, sim=1): name="Golf Club Varese", phone="+39 (0)332 229302", region="Lombardy", percorsi=Varese(18)

### Golf Club Verona (Italy, 3 courses)

- DB: lat=45.3949705, lon=10.8195797, website="https://www.golfclubverona.com/", phone="+39 045 510060"
- OSM (medium, 466m, sim=1): name="Golf Club Verona", website="https://www.golfclubverona.com/", phone="+39 045 510060", email=null
- LC  (low, 2013m, sim=1): name="Golf Club Verona", phone="+39 045 510060", region="Veneto", percorsi=Verona(18)

### Golf Club Villa Paradiso (Italy, 2 courses)

- DB: lat=45.6407156, lon=9.4914522, website="https://en.golfvillaparadiso.com/", phone="+39 039 6887124"
- OSM (high, 22m, sim=1): name="Golf Club Villa Paradiso", website="https://en.golfvillaparadiso.com/", phone="+39 039 6887124", email="segreteria@golfvillaparadiso.com"
- LC  (low, 595m, sim=1): name="Villa Paradiso Golf Club", phone="+39 039 6887124", region="Lombardy", percorsi=The Executive Course(9)

### Golf della Montecchia (Italy, 9 courses)

- DB: lat=45.3871002, lon=11.7582791, website="https://www.golfmontecchia.it/", phone="+39 049 8055550"
- OSM (medium, 338m, sim=1): name="Golf Club della Montecchia", website="https://www.golfmontecchia.it/", phone="+39 049 8055550", email="info@golfmontecchia.it"
- LC  (medium, 297m, sim=1): name="Golf della Montecchia", phone="+39 049 8055550", region="Veneto", percorsi=Rosso & Bianco(18)

### Golf il Cerreto di Miglianico (Italy, 1 courses)

- DB: lat=42.3738931, lon=14.2800905, website="https://golfilcerreto.it/index.php", phone="+39 0871 305685"
- OSM (medium, 271m, sim=1): name="\"Il Cerreto di Miglianico\"", website="https://golfilcerreto.it/index.php", phone="+39 0871 305685", email="segreteria@golfilcerreto.it"
- LC  (low, 837m, sim=1): name="Golf Il Cerreto Di Miglianico", phone="+39 0871 305 685", region="Abruzzo", percorsi=Asd Miglianico Golf & Country Club(18)

### Golf Il Colombaro (Italy, 1 courses)

- DB: lat=45.5872943, lon=10.5248889, website="https://www.colombarogolf.com", phone="+39 365 5531"
- OSM (high, 7m, sim=1): name="Il Colombaro", website="https://www.colombarogolf.com", phone="+3903655531", email="golf@ilcolombaro.com"
- LC  (high, 133m, sim=1): name="Colombaro Golf", phone="+39 365 5531", region="Lombardy", percorsi=Golf Club Colombaro(9)

### Golf Mare Di Roma (Italy, 1 courses)

- DB: lat=41.5993237, lon=12.4972136, website="https://www.golfmarediroma.it/", phone="+39 06 9133250"
- OSM (high, 76m, sim=0.8): name="Golf Club MareDiRoma", website="https://www.golfmarediroma.it/", phone="+39 06 9133250", email="info@golfmarediroma.it"
- LC  (low, 536m, sim=0.8): name="Marediroma Golf Club", phone="+39 6 9133250", region="Lazio", percorsi=A.S.Marediroma Golf Club(9)

### Golf Monza (Italy, 1 courses)

- DB: lat=45.5871608, lon=9.2375904, website="http://www.golfmonza.com/", phone="+39 039 790072"
- OSM (high, 5m, sim=1): name="Golf Monza", website="http://www.golfmonza.com/", phone="+39 039 790072", email="info@golfmonza.com"
- LC  (no-match, 174761m, sim=0.5): name="Modena Golf & Country Club", phone="+39 (0)59 553482", region="Emilia-Romagna", percorsi=Bernhard Langer Course(18)

### I Ciliegi Golf Club (Italy, 1 courses)

- DB: lat=45.0020128, lon=7.7577511, website="https://iciliegigolfclub.it/", phone="+39 011 8609802"
- OSM (high, 157m, sim=1): name="Golf Club i Ciliegi", website="https://iciliegigolfclub.it/", phone=null, email=null
- LC  (high, 157m, sim=1): name="Golf Club I Ciliegi", phone="+39 011 8609802", region="Piedmont", percorsi=7.7(9)

### La Rossera (Italy, 1 courses)

- DB: lat=45.6610691, lon=9.8503672, website="http://www.rossera.it/", phone="+39 035 838600"
- OSM (high, 38m, sim=1): name="Golf Club La Rossera", website="http://www.rossera.it/", phone="+39 035 838600", email="info@rossera.it"
- LC  (high, 38m, sim=1): name="Golf Club La Rossera", phone="+39 035 838600", region="Lombardy", percorsi=La Rossera Golf Country Club(9)

### Le Robinie Golf Club (Italy, 1 courses)

- DB: lat=45.6434557, lon=8.8747657, website="https://golf.lerobinie.com/", phone="+39 0331 329260"
- OSM (high, 20m, sim=1): name="Le Robinie Golf Club", website="https://golf.lerobinie.com/", phone="+39 0331 329260", email=null
- LC  (low, 547m, sim=0.5): name="Le Robinie Golf Club Milano", phone="+39 0331 329260", region="Lombardy", percorsi=Le Robinie(18)

### Marco Simone Golf & Country Club (Italy, 2 courses)

- DB: lat=41.9618051, lon=12.6348999, website="https://www.golfmarcosimone.com", phone="+39 0774 366469"
- OSM (high, 180m, sim=1): name="Marco Simone Golf and Country Club", website="https://www.golfmarcosimone.com", phone=null, email=null
- LC  (high, 180m, sim=1): name="Marco Simone Golf & Country Club", phone="+39 0774 366469", region="Lazio", percorsi=Campionato (Championship Course)(18)

### Molinetto Country Club (Italy, 1 courses)

- DB: lat=45.5166976, lon=9.3109322, website="https://www.molinettocountryclub.it/", phone="+39 02 92105128"
- OSM (high, 67m, sim=1): name="Molinetto Country Club", website="https://www.molinettocountryclub.it/", phone="+39 02 92105128", email="info@molinettocountryclub.it"
- LC  (high, 67m, sim=1): name="Molinetto Country Club", phone="+39 02 92105128", region="Lombardy", percorsi=7.8(18)

### Molino del Pero (Italy, 1 courses)

- DB: lat=44.2753731, lon=11.2873077, website="https://www.molinodelpero.it/", phone="+39 051 6770506;+39 051 18893177"
- OSM (high, 22m, sim=1): name="Golf Club Molino del Pero", website="https://www.molinodelpero.it/", phone="+39 051 6770506;+39 051 18893177", email="info@golfmolinodelpero.i"
- LC  (low, 2785m, sim=1): name="Molino Del Pero Golf Club", phone="+39 (0)51 18893177", region="Emilia-Romagna", percorsi=Circolo Golf Molino Del Pero Asd(18)

### Molino Del Pero Golf Club (Italy, 1 courses)

- DB: lat=44.2753731, lon=11.2873077, website="https://www.molinodelpero.it/", phone="+39 051 6770506;+39 051 18893177"
- OSM (high, 22m, sim=1): name="Golf Club Molino del Pero", website="https://www.molinodelpero.it/", phone="+39 051 6770506;+39 051 18893177", email="info@golfmolinodelpero.i"
- LC  (low, 2785m, sim=1): name="Molino Del Pero Golf Club", phone="+39 (0)51 18893177", region="Emilia-Romagna", percorsi=Circolo Golf Molino Del Pero Asd(18)

### Moncalieri Golf Club (Italy, 1 courses)

- DB: lat=45.0065601, lon=7.6822263, website="http://www.moncalierigolfclub.com/", phone="+39 11-6479918/9"
- OSM (high, 167m, sim=1): name="Moncalieri Golf Club", website="http://www.moncalierigolfclub.com/", phone="+39 11-6479918/9", email=null
- LC  (low, 473m, sim=0.714): name="Moncalieri Golf Club Ssd", phone="+39 011 6479918 -19", region="Piedmont", percorsi=Moncalieri Golf Club(9)

### Parco di Firenze (Italy, 1 courses)

- DB: lat=43.783614, lon=11.2040558, website="https://www.parcodifirenze.it/", phone="+39 055785627"
- OSM (high, 197m, sim=1): name="Golf Club Parco Di Firenze", website="https://www.parcodifirenze.it/", phone="+39 055 755627", email="golf@parcodifirenze.it"
- LC  (medium, 292m, sim=1): name="Golf Club Parco Di Firenze", phone="+39 055785627", region="Tuscany", percorsi=Asd Golf Club Parco Di Firenze(9)

### Pevero Golf Club (Italy, 1 courses)

- DB: lat=41.0993574, lon=9.5429113, website="http://www.peverogolfclub.com/", phone="+39 0789 958000"
- OSM (medium, 356m, sim=1): name="Pevero Golf Club", website="http://www.peverogolfclub.com/", phone="+39 0789 958000", email=null
- LC  (low, 765m, sim=1): name="Pevero Golf Club", phone="+39 0789 976400", region="Sardinia", percorsi=Pevero(18)

### Pra delle Torri (Italy, 1 courses)

- DB: lat=45.5756669, lon=12.8121985, website="https://www.golfpradelletorri.it/", phone="+39 0421 299570"
- OSM (high, 225m, sim=1): name="Golf Pra' delle Torri", website="https://www.golfpradelletorri.it/", phone="+39 0421 299570", email="info@golfcaorle.it"
- LC  (low, 383m, sim=0.682): name="Pra' Delle Torri Golf Caorle", phone="+39 0421 299570", region="Veneto", percorsi=7.9(18)

### Rimini Verucchio Golf Club (Italy, 1 courses)

- DB: lat=44.0218074, lon=12.4250842, website="https://www.riminiverucchiogolf.com/", phone="+39 0541 678122"
- OSM (medium, 388m, sim=1): name="Rimini - Verucchio Golf Club", website="https://www.riminiverucchiogolf.com/", phone="+39 0541 678122", email=null
- LC  (medium, 341m, sim=1): name="Rimini Verucchio Golf Club", phone="+39 0541 678122", region="Emilia-Romagna", percorsi=Rimini Verucchio Golf Club Asd(18)

### Riviera Golf Resort (Italy, 1 courses)

- DB: lat=43.9465797, lon=12.6907078, website="https://www.rivieragolfresort.com/", phone="+39 0541 955009"
- OSM (high, 17m, sim=1): name="Riviera Golf Club", website="https://www.rivieragolfresort.com/", phone="+39 0541 956499", email="info@rivieragolfresort.com"
- LC  (medium, 275m, sim=1): name="Riviera Golf Resort", phone="+39 0541 955009", region="Emilia-Romagna", percorsi=Riviera Golf Club(18)

### Royal Golf La Bagnaia (Italy, 1 courses)

- DB: lat=43.2194699, lon=11.292447, website="https://www.royalgolflabagnaia.com/enquiries/", phone="+39 366 655 0031"
- OSM (high, 159m, sim=1): name="Royal Golf La Bagnaia", website="https://www.royalgolflabagnaia.com/enquiries/", phone="+39 3666550031", email=null
- LC  (high, 159m, sim=1): name="Royal Golf La Bagnaia", phone="+39 366 655 0031", region="Tuscany", percorsi=7.8(18)

### Salice Terme Golf & Country (Italy, 1 courses)

- DB: lat=44.9241068, lon=9.024409, website="https://www.salicetermegolf-country.it/", phone="+39 383 933370"
- OSM (high, 123m, sim=1): name="Golf Salice Terme", website="https://www.salicetermegolf-country.it/", phone="+39 383 933370", email="segreteria@salicetermegolf-country.it"
- LC  (low, 587m, sim=1): name="Salice Terme Golf&Country", phone="+39 0383 933370", region="Piedmont", percorsi=Salice Terme(9)

### Stupinigi Golf Club (Italy, 1 courses)

- DB: lat=45.0189147, lon=7.6264239, website="http://www.golfclubstupinigi.com/", phone="+39 011 3472640"
- OSM (high, 18m, sim=1): name="Golf Club Stupinigi", website="http://www.golfclubstupinigi.com/", phone="+39 011 3472640", email="stupinigigolf@libero.it"
- LC  (no-match, 236574m, sim=0.364): name="Golf Club San Vigilio", phone="+39 030 91801", region="Lombardy", percorsi=Benaco & Solferino Course(18)

### Tarquinia (Italy, 1 courses)

- DB: lat=42.25522, lon=11.6994327, website="http://www.tarquiniacountryclub.it/", phone="+39 766 812109"
- OSM (high, 166m, sim=1): name="Tarquinia Country Club", website="http://www.tarquiniacountryclub.it/", phone="+39 0766 812109", email="info@tarquiniacountryclub.com"
- LC  (high, 166m, sim=1): name="Tarquinia Country Club", phone="+39 766 812109", region="Lazio", percorsi=7.8(9)

### Terre dei Consoli Golf Club (Italy, 4 courses)

- DB: lat=42.1950098, lon=12.2900761, website="http://www.terredeiconsoli.it/", phone="+39 761699888"
- OSM (high, 168m, sim=1): name="Terre dei Consoli Golf Club & Resort", website="http://www.terredeiconsoli.it/", phone="+39 0761699888", email=null
- LC  (medium, 495m, sim=1): name="Terre Dei Consoli", phone="+39 761699888", region="Lazio", percorsi=Championship Course(18)

### Valcurone (Italy, 2 courses)

- DB: lat=44.8327137, lon=9.0415183, website="http://www.golfvalcurone.com/", phone="+39 0131 784514"
- OSM (medium, 343m, sim=1): name="Golf Valcurone", website="http://www.golfvalcurone.com/", phone="+39 0131 784514", email="info@golfvalcurone.com"
- LC  (low, 842m, sim=1): name="Golf & Country Valcurone", phone="+39 (0)131 784514", region="Piedmont", percorsi=Golf & Country Valcurone Ssd A R.L.(18)

### Verdura Golf & Spa Resort (Italy, 2 courses)

- DB: lat=37.4742229, lon=13.1964316, website="https://www.roccofortehotels.com/hotels-and-resorts/verdura-golf-and-spa-resort/", phone="+39 09259982134"
- OSM (high, 47m, sim=1): name="Verdura Golf & Spa Resort", website="https://www.roccofortehotels.com/hotels-and-resorts/verdura-golf-and-spa-resort/", phone="+39 0925 998001", email="reservations.verdura@roccofortehotels.com"
- LC  (medium, 354m, sim=1): name="Verdura Resort", phone="+39 09259982134", region="Sicily", percorsi=West Course(18)

### Versilia Golf Club (Italy, 2 courses)

- DB: lat=43.9844048, lon=10.1722291, website="https://www.versiliagolfresort.com", phone="+39 0584 881574"
- OSM (high, 177m, sim=1): name="Versilia Golf Club", website="https://www.versiliagolfresort.com", phone=null, email=null
- LC  (high, 177m, sim=1): name="Versilia Golf Resort", phone="+39 0584 881574", region="Tuscany", percorsi=Versilia Golf Club(18)

### Villa Condulmer (Italy, 1 courses)

- DB: lat=45.5776574, lon=12.2660802, website="https://www.golfvillacondulmer.com/", phone="+39 041 457062"
- OSM (medium, 423m, sim=1): name="Golf Club Villa Condulmer", website="https://www.golfvillacondulmer.com/", phone="+39 041 457062", email="info@golfvillacondulmer.com"
- LC  (high, 189m, sim=1): name="Villa Condulmer Golf Club", phone="+39 041 457062", region="Veneto", percorsi=8.2(27)

## No match in OSM/LC

- Ancora Golf Club (Italy, 2 courses) — DB lat=45.6272111, lon=12.4638332
- Bastardina (Italy, 1 courses) — DB lat=44.9831013, lon=9.4897803
- Brolo Bassano Golf Club (Italy, 1 courses) — DB lat=45.7704501, lon=11.7271388
- bvsg (Italy, 1 courses) — DB lat=45.782867, lon=9.2325793
- Cagliari Golf Club (Italy, 1 courses) — DB lat=38.8950452, lon=8.8667128
- Carney Park (Italy, 1 courses) — DB lat=40.8358846, lon=14.2487679
- circolo golf cuneo (Italy, 1 courses) — DB lat=44.4580704, lon=7.5581367
- Franciacorta Pallavicini (Italy, 1 courses) — DB lat=45.7795805, lon=10.425873
- gfre (Italy, 1 courses) — DB lat=45.6384551, lon=13.6005982
- Golf Club Alpiaz Montecampione (Italy, 1 courses) — DB lat=null, lon=null
- Golf Club Bellosguardo (Italy, 1 courses) — DB lat=43.7358439, lon=10.9029156
- Golf Club La Castelluccia NEW 18 (Italy, 1 courses) — DB lat=41.9810211, lon=12.3933012
- Golf Club La Castelluccia NEW 9 (Italy, 1 courses) — DB lat=41.8933203, lon=12.4829321
- Golf del Ducato Parma (Italy, 1 courses) — DB lat=44.8159141, lon=10.2844759
- golf fiuffi terme & country club (Italy, 1 courses) — DB lat=41.7985608, lon=13.2204887
- Golf in Milano (Italy, 1 courses) — DB lat=45.4700017, lon=9.2634333
- Golf Ponte di legno GC (Italy, 1 courses) — DB lat=46.258603, lon=10.508662
- Golf Resort Club (Italy, 1 courses) — DB lat=45.362828, lon=9.6874573
- Golfclub Sterzing (Italy, 1 courses) — DB lat=46.8992271, lon=11.431456
- La Romanina (Italy, 1 courses) — DB lat=41.8406386, lon=12.5996071
- le costiere (Italy, 1 courses) — DB lat=43.6337324, lon=10.2892778
- Limbadi (Italy, 1 courses) — DB lat=38.1035389, lon=15.6397556
- Montechiarello golf club (Italy, 1 courses) — DB lat=38.0799416, lon=15.6369539
- P.d.M. executive (Italy, 1 courses) — DB lat=41.8933203, lon=12.4829321
- PDM 9 Buche (Italy, 1 courses) — DB lat=41.8933203, lon=12.4829321
- Pian delle Betulle (Italy, 1 courses) — DB lat=46.030987, lon=9.381641
- Rapallo Golf Club (Italy, 2 courses) — DB lat=44.3541321, lon=9.1946639
- Rotoballe golf trophy (Italy, 2 courses) — DB lat=null, lon=null
- Rovigolf Country Club (Italy, 1 courses) — DB lat=45.0753893, lon=11.8026553
- San Floriano (Italy, 1 courses) — DB lat=45.9441278, lon=13.6252288
- Tiber Golf Club NEW (Italy, 2 courses) — DB lat=41.7875758, lon=12.370383
- Torino blu (Italy, 1 courses) — DB lat=45.0677551, lon=7.6824892
- V.C. (Italy, 1 courses) — DB lat=39.9238818, lon=16.4741515