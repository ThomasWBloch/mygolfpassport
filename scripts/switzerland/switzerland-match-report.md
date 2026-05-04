# Switzerland match report
Generated: 2026-05-04T18:23:23

2-source: SwissGolf federation + OSM. Federation-first per-felt-confidence.
Trust hierarki: SwissGolf > OSM > DB (Golfapi).
Scope: website ONLY (email/phone droppet — federation eksponerer dem ikke).

## Summary

| Bucket | Clubs | Courses |
|---|---:|---:|
| High conf | 43 | 81 |
| Medium conf | 15 | 29 |
| Low conf | 44 | 50 |
| No match | 0 | 0 |
| Orphans (no SwissGolf match) | 14 | 15 |

## Field-fill projection (excl. orphans)

| Field | Clubs | Courses |
|---|---:|---:|
| website | 58 | 110 |

## High confidence (recommended to apply)

### Bad Ragaz (Switzerland, 1 courses)

- DB: lat=47.0002103, lon=9.5058327, web=null
- SwissGolf (high, 243m, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=49): name="Bad Ragaz", web="https://www.golfclubragaz.ch/", plz/ort="null "
- OSM (medium, 406m, sim=1): name="Golf Club Bad Ragaz", web="https://www.golfclubragaz.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 243m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfclubragaz.ch/'
WHERE id IN (
  'ed3e61e3-f3c3-4cea-903d-64aa2e057056'
);
```

### Crans-sur-Sierre Golf Club (Switzerland, 2 courses)

- DB: lat=46.30518, lon=7.4673662, web=null
- SwissGolf (high, 204m, sim=1, boost=+0.27[jaccard:0.67], secondary, id=58): name="Crans-sur-Sierre", web="https://www.golfcrans.ch/fr/", plz/ort="null "
- OSM (low, 603m, sim=0.333): name="Severiano Ballesteros Course", web=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from swissgolf(high, 204m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfcrans.ch/fr/'
WHERE id IN (
  '48680408-a7c7-4922-9f17-8200ede2a6ae',
  'bf8e520d-db5a-49ff-8b24-261c5eddc370'
);
```

### Dolder Golfclub Zürich (Switzerland, 1 courses)

- DB: lat=47.3706214, lon=8.5728618, web=null
- SwissGolf (low, 205m, sim=0.462, boost=+0.2[jaccard:0.50], primary, id=60): name="Dolder", web="https://www.doldergolf.ch/", plz/ort="null "
- OSM (high, 13m, sim=1): name="Dolder Golfclub Zürich", web="https://www.doldergolf.ch"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 13m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.doldergolf.ch'
WHERE id IN (
  '94573c9d-6151-49cc-a4de-fa4010d63729'
);
```

### GC Davos (Switzerland, 1 courses)

- DB: lat=46.7988086, lon=9.8402547, web=null
- SwissGolf (high, 144m, sim=1, boost=+0.4[jaccard:1.00], secondary, id=59): name="Davos", web="https://www.golf-davos.ch/", plz/ort="null "
- OSM (high, 178m, sim=1): name="Golf Club Davos", web="http://www.golfdavos.ch"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 144m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golf-davos.ch/'
WHERE id IN (
  '1acdca76-ad80-4cd2-8adf-447e4dec85b1'
);
```

### GC Flühli-Sörenberg (Switzerland, 1 courses)

- DB: lat=46.8654048, lon=8.0206549, web=null
- SwissGolf (high, 130m, sim=1, boost=+0.4[jaccard:1.00], primary, id=65): name="Flühli-Sörenberg", web="https://www.gcfs.ch/", plz/ort="null "
- OSM (high, 19m, sim=1): name="Golfclub Flühli-Sörenberg", web="https://www.gcfs.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 130m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.gcfs.ch/'
WHERE id IN (
  '3094dc4b-07db-42b1-ada8-a56c8635e8cc'
);
```

### Golf & Country Club de Bonmont (Switzerland, 1 courses)

- DB: lat=46.4015257, lon=6.1492272, web=null
- SwissGolf (high, 188m, sim=1, secondary, id=52): name="Bonmont", web="https://www.bonmont.com/", plz/ort="null "
- OSM (medium, 399m, sim=1): name="Golf de Bonmont", web="https://www.bonmont.com/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 188m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.bonmont.com/'
WHERE id IN (
  '0cab9978-3b10-497d-a2ef-d39e09d266b3'
);
```

### Golf Club Aaretal (Switzerland, 1 courses)

- DB: lat=46.8124998, lon=7.5805357, web=null
- SwissGolf (high, 183m, sim=1, boost=+0.2[jaccard:0.50], primary, id=45): name="Aaretal", web="https://www.golfaaretal.ch/", plz/ort="null "
- OSM (high, 18m, sim=1): name="Golf Club Aaretal", web="https://www.golfaaretal.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 183m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfaaretal.ch/'
WHERE id IN (
  '02527d61-beca-420e-97a7-4246395dbb4d'
);
```

### Golf Club Axenstein (Switzerland, 1 courses)

- DB: lat=46.9882614, lon=8.621836, web=null
- SwissGolf (high, 207m, sim=1, boost=+0.2[jaccard:0.50], primary, id=48): name="Axenstein", web="http://www.golfclub-axenstein.ch/", plz/ort="null "
- OSM (high, 89m, sim=1): name="Golf Club Axenstein", web="https://golfclub-axenstein.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 207m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golfclub-axenstein.ch/'
WHERE id IN (
  'f736ef07-023a-45a8-93b6-38267cee4e83'
);
```

### Golf Club du Domaine du Brésil (Switzerland, 1 courses)

- DB: lat=46.6746605, lon=6.5902219, web=null
- SwissGolf (high, 119m, sim=1, boost=+0.27[jaccard:0.67], primary, id=11): name="Domaine du Brésil", web="https://www.golfbresil.ch/", plz/ort="null "
- OSM (high, 33m, sim=1): name="Golf du Domaine du Brésil", web="https://www.golfbresil.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 119m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfbresil.ch/'
WHERE id IN (
  'a117cf94-7462-4660-8feb-ca0a63609da7'
);
```

### Golf Club Gruyère (Switzerland, 1 courses)

- DB: lat=46.7019748, lon=7.1056681, web=null
- SwissGolf (medium, 354m, sim=1, boost=+0.2[jaccard:0.50], secondary, id=69): name="Gruyère", web=null, plz/ort="null "
- OSM (high, 29m, sim=1): name="Golf Resort la Gruyère", web="https://www.golfresort-lagruyere.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 29m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfresort-lagruyere.ch/'
WHERE id IN (
  '0dab1b2e-a7e2-40bc-aef2-8828f9f8d583'
);
```

### Golf Club Heidiland (Switzerland, 1 courses)

- DB: lat=46.9975295, lon=9.5166906, web=null
- SwissGolf (high, 249m, sim=1, boost=+0.6[city:ragaz,jaccard:0.50], primary, id=70): name="Heidiland", web="https://www.gcheidiland.ch/", plz/ort="7310 Bad Ragaz"
- OSM (high, 65m, sim=1): name="Golf Club Heidiland", web="https://www.gcheidiland.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 249m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.gcheidiland.ch/'
WHERE id IN (
  '166e4c04-2e5a-4b5b-8341-9b4583112e21'
);
```

### Golf club Lugano (Switzerland, 1 courses)

- DB: lat=45.9779062, lon=8.8853513, web=null
- SwissGolf (low, 678m, sim=1, boost=+0.2[jaccard:0.50], secondary, id=81): name="Lugano", web="https://www.golflugano.ch/", plz/ort="null "
- OSM (high, 41m, sim=1): name="Golf Club Lugano", web="https://www.golflugano.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 41m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golflugano.ch/'
WHERE id IN (
  'c654b1b4-0b46-4607-bd09-7e973bc6fcd5'
);
```

### Golf Club Matterhorn (Switzerland, 2 courses)

- DB: lat=46.087597, lon=7.7791295, web=null
- SwissGolf (high, 166m, sim=1, boost=+0.2[jaccard:0.50], primary, id=84): name="Matterhorn", web="http://www.golfclubmatterhorn.ch/", plz/ort="null "
- OSM (medium, 387m, sim=1): name="Golf Club Matterhorn", web="https://www.golfclubmatterhorn.ch/"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from swissgolf(high, 166m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golfclubmatterhorn.ch/'
WHERE id IN (
  '7147d810-3314-467d-b80d-76eef420efc3',
  'f30fe899-70ca-4724-b2a6-678bb18b786b'
);
```

### Golf de la Veille-Batie (Switzerland, 1 courses)

- DB: lat=46.2883024, lon=6.1199092, web=null
- SwissGolf (high, 210m, sim=0.923, boost=+0.2[jaccard:0.50], pitch-putt, id=186): name="Golf de la Vieille-Bâtie", web="http://www.golf-vieille-batie.ch", plz/ort="null "
- OSM (high, 8m, sim=0.923): name="Golf de la Vieille-Bâtie", web=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 210m, sim=0.923)
```sql
UPDATE courses SET
  website = 'http://www.golf-vieille-batie.ch'
WHERE id IN (
  'f8a97f0f-f0fe-4cc1-8bfe-28936e7ea666'
);
```

### Golf Entfelden (Switzerland, 3 courses)

- DB: lat=47.3477636, lon=8.0482895, web=null
- SwissGolf (high, 234m, sim=1, boost=+0.2[jaccard:0.50], secondary, id=14): name="Entfelden", web="https://www.aarau-west.ch/golf/", plz/ort="null "
- OSM (medium, 386m, sim=1): name="Golfclub Entfelden", web="https://www.aarau-west.ch/golf/"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from swissgolf(high, 234m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.aarau-west.ch/golf/'
WHERE id IN (
  '21b7f9c0-1a77-44d7-b0b7-3600fae4e939',
  '2776b08b-c908-44ef-b20a-7853f1573e62',
  '7e94456f-32f1-4fe4-979e-6fca32c97ac9'
);
```

### Golf Fricktal (Switzerland, 1 courses)

- DB: lat=47.5070185, lon=8.0412001, web=null
- SwissGolf (high, 171m, sim=1, boost=+0.2[jaccard:0.50], primary, id=66): name="Fricktal", web="https://www.golf-fricktal.ch", plz/ort="null "
- OSM (medium, 409m, sim=1): name="Golf Fricktal", web="https://www.golf-fricktal.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 171m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golf-fricktal.ch'
WHERE id IN (
  '66585c2b-c99f-4fa0-80dc-b89783b663f1'
);
```

### Golf Gams Werdenberg (Switzerland, 2 courses)

- DB: lat=47.2020027, lon=9.4712305, web=null
- SwissGolf (low, 798m, sim=1, boost=+0.27[jaccard:0.67], secondary, id=15): name="Gams-Werdenberg", web="http://www.golfgams.ch/home.html", plz/ort="null "
- OSM (high, 247m, sim=1): name="Golf Gams-Werdenberg", web="https://golfgams.ch/"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 247m, sim=1)
```sql
UPDATE courses SET
  website = 'https://golfgams.ch/'
WHERE id IN (
  '1a461805-1686-4d1a-a1df-63e7e08d8b8b',
  'e2a17163-d9f6-4c60-8733-90e6e0d2ad6f'
);
```

### Golf Gerre Losone (Switzerland, 1 courses)

- DB: lat=46.1777288, lon=8.7500142, web=null
- SwissGolf (high, 171m, sim=1, boost=+0.27[jaccard:0.67], secondary, id=80): name="Gerre Losone", web="https://www.golflosone.ch/it/", plz/ort="null "
- OSM (high, 153m, sim=1): name="Golf Gerre Losone", web="https://www.golflosone.ch"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 171m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golflosone.ch/it/'
WHERE id IN (
  'db3da89a-6d3e-4507-9b3d-ee5d43586ba9'
);
```

### Golf Meggen (Switzerland, 1 courses)

- DB: lat=47.0475787, lon=8.3562203, web=null
- SwissGolf (high, 220m, sim=1, boost=+0.2[jaccard:0.50], primary, id=85): name="Meggen", web="https://www.golfmeggen.ch/", plz/ort="null "
- OSM (high, 1m, sim=1): name="Golf Meggen", web="https://www.golfmeggen.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 220m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfmeggen.ch/'
WHERE id IN (
  '5fe7a561-1d66-45fc-848c-b3b4aa0144f4'
);
```

### Golf Patriziale Ascona (Switzerland, 1 courses)

- DB: lat=46.1490716, lon=8.7826197, web=null
- SwissGolf (high, 230m, sim=1, boost=+0.27[jaccard:0.67], secondary, id=5): name="Patriziale Ascona", web="https://golfascona.ch", plz/ort="null "
- OSM (medium, 327m, sim=1): name="Golf Club Patriziale Ascona", web="http://www.golfascona.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 230m, sim=1)
```sql
UPDATE courses SET
  website = 'https://golfascona.ch'
WHERE id IN (
  '8f2718dd-f769-4d0d-bda9-1c07aaea4e04'
);
```

### Golf Rastenmoos (Switzerland, 2 courses)

- DB: lat=47.1044617, lon=8.2295047, web=null
- SwissGolf (high, 166m, sim=1, boost=+0.2[jaccard:0.50], primary, id=91): name="Rastenmoos", web="https://www.fairplaygolf-schweiz.ch", plz/ort="null "
- OSM (high, 39m, sim=1): name="Golf Rastenmoos", web="https://golfrastenmoos.ch/"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from swissgolf(high, 166m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.fairplaygolf-schweiz.ch'
WHERE id IN (
  'b3465605-6708-45de-a2a7-8c7a7456392c',
  'd0d1b026-b863-46e0-a23c-0470e975efae'
);
```

### Golf Weid-Hauenstein (Switzerland, 2 courses)

- DB: lat=47.3809421, lon=7.8726209, web=null
- SwissGolf (high, 110m, sim=1, boost=+0.27[jaccard:0.67], primary, id=103): name="Weid Hauenstein", web="https://www.golf-hauenstein.ch/", plz/ort="null "
- OSM (high, 135m, sim=1): name="Golf Weid Hauenstein", web="https://www.golf-hauenstein.ch/"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from swissgolf(high, 110m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golf-hauenstein.ch/'
WHERE id IN (
  '4c60e9de-0a9a-4aec-b5e5-2ebb227bf238',
  '63dcbf6f-97e7-40ed-a899-839e28746a6c'
);
```

### Golf Ybrig (Switzerland, 2 courses)

- DB: lat=47.0610043, lon=8.8555361, web=null
- SwissGolf (high, 5m, sim=1, boost=+0.6[city:studen,jaccard:0.50], secondary, id=41): name="Ybrig", web="https://www.golfybrig.ch/", plz/ort="8845 Studen"
- OSM (high, 247m, sim=1): name="Golf Club Ybrig", web="https://www.golfybrig.ch/"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from swissgolf(high, 5m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfybrig.ch/'
WHERE id IN (
  '21dd2da3-fd52-4282-a256-c1b04c2015df',
  'e97665e6-3a88-4c7d-97af-92d21280ddfc'
);
```

### Golf-Club Riederalp (Switzerland, 1 courses)

- DB: lat=46.3782021, lon=8.0334815, web=null
- SwissGolf (high, 27m, sim=1, boost=+0.2[jaccard:0.50], primary, id=30): name="Riederalp", web="https://www.golfclub-riederalp.ch/sites/de/", plz/ort="null "
- OSM (low, 214m, sim=0.474): name="Golfplatz Riederalp", web="https://www.golfclub-riederalp.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 27m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfclub-riederalp.ch/sites/de/'
WHERE id IN (
  '89424a67-18d4-40f0-87c2-54f289644f0a'
);
```

### Golfclub Ennetsee Holzhäusern (Switzerland, 3 courses)

- DB: lat=47.1502832, lon=8.4412652, web=null
- SwissGolf (high, 186m, sim=0.69, boost=+0.67[city:rotkreuz,jaccard:0.67], secondary, id=62): name="Ennetsee / Golfpark Holzhäusern", web="https://www.ennetsee-golf.ch/", plz/ort="6343 Rotkreuz"
- OSM (low, 675m, sim=0.6): name="Golfpark Holzhäusern", web="http://www.golfparkholzhaeusern.ch/"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from swissgolf(high, 186m, sim=0.69)
```sql
UPDATE courses SET
  website = 'https://www.ennetsee-golf.ch/'
WHERE id IN (
  '2d7a5911-757d-4889-8e76-f4ff67528df2',
  '419a4d9d-d3d9-4b68-bdfb-c2a76c710a57',
  '4a5b1e95-5581-4e5b-a348-d1c2d47f472d'
);
```

### Golfclub Erlen (Switzerland, 1 courses)

- DB: lat=47.5448629, lon=9.2391277, web=null
- SwissGolf (high, 138m, sim=1, boost=+0.4[jaccard:1.00], secondary, id=63): name="Erlen", web="https://erlengolf.ch/", plz/ort="null "
- OSM (medium, 269m, sim=1): name="Golfclub Erlen", web=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 138m, sim=1)
```sql
UPDATE courses SET
  website = 'https://erlengolf.ch/'
WHERE id IN (
  '1b3a197a-c991-4a2a-8257-0f8d6e25674e'
);
```

### Golfclub Unterengstringen (Switzerland, 1 courses)

- DB: lat=47.4038265, lon=8.4142346, web=null
- SwissGolf (high, 133m, sim=1, primary, id=98): name="Unterengstringen", web="https://www.golfunterengstringen.ch/", plz/ort="null "
- OSM (high, 23m, sim=1): name="Golfclub Unterengstringen", web="https://www.golfunterengstringen.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 133m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfunterengstringen.ch/'
WHERE id IN (
  '0d7e1029-4c3e-4b4e-822d-85bc42aee50e'
);
```

### Golfclub Wylihof (Switzerland, 9 courses)

- DB: lat=47.22496, lon=7.5912367, web=null
- SwissGolf (high, 87m, sim=1, boost=+0.4[jaccard:1.00], secondary, id=40): name="Wylihof", web="https://www.golfclub.ch/", plz/ort="null "
- OSM (medium, 397m, sim=1): name="Golfclub Wylihof", web="https://www.golfclub.ch/"

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from swissgolf(high, 87m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfclub.ch/'
WHERE id IN (
  '16684432-39f5-4a9e-891f-e4d249db434e',
  '3073282e-db73-4ce3-8b69-046b5a9321a6',
  '852e825a-873e-4ef4-8266-ae6533306b74',
  '97b3c230-aced-4789-823f-4042a1701477',
  '998bf4a5-9752-4330-b9be-c46cf5f7788a',
  'a74ed597-a734-422b-a4f7-86ab2e919e18',
  'ba4dc822-618c-47e6-860b-c8a298604439',
  'c050d87f-4170-43e8-9908-e50285968242',
  'ffeb8f1d-80ab-47d4-bd6e-ecde661047d7'
);
```

### Golfparc Signal de Bougy (Switzerland, 1 courses)

- DB: lat=46.4837756, lon=6.3462238, web=null
- SwissGolf (high, 237m, sim=0.769, boost=+0.95[city:bougy,jaccard:0.75,typo:golfparc~golfpark], secondary, id=23): name="La Côte / Golfpark Signal de Bougy", web="https://www.golfclublacote.ch/", plz/ort="1172 Bougy-Villars"
- OSM (low, 577m, sim=0.81): name="Golf Parc du Signal de Bougy", web=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 237m, sim=0.769)
```sql
UPDATE courses SET
  website = 'https://www.golfclublacote.ch/'
WHERE id IN (
  'c5251ed8-d286-49c4-9fc6-2e9920c625da'
);
```

### Golfpark Moossee (Switzerland, 3 courses)

- DB: lat=47.0276968, lon=7.4634864, web=null
- SwissGolf (high, 3m, sim=0.762, boost=+0.57[db-name-substring,jaccard:0.67], secondary, id=8): name="Bern / Golfpark Moossee", web="https://www.golfclub-bern.ch/", plz/ort="null "
- OSM (low, 693m, sim=1): name="Golfpark Moossee", web="http://www.golfparkmoossee.ch"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from swissgolf(high, 3m, sim=0.762)
```sql
UPDATE courses SET
  website = 'https://www.golfclub-bern.ch/'
WHERE id IN (
  '26fc4c79-f8b7-487a-89ed-639b7c687e27',
  '70073510-e8a7-41c8-ace5-26bac1bac124',
  'd05f3554-c613-4f70-87d3-02f517888f88'
);
```

### Golfpark Thalwil (Switzerland, 1 courses)

- DB: lat=47.2905727, lon=8.5493682, web=null
- SwissGolf (high, 90m, sim=0.75, driving-range, id=178): name="Golf Park Thalwil", web="https://www.golfparkthalwil.ch", plz/ort="null "
- OSM (high, 4m, sim=1): name="GolfPark Thalwil", web="https://www.golfparkthalwil.ch"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 90m, sim=0.75)
```sql
UPDATE courses SET
  website = 'https://www.golfparkthalwil.ch'
WHERE id IN (
  '86143dd6-b2f8-447d-80f6-86f84f2b718e'
);
```

### Golfpark Waldkirch (Switzerland, 13 courses)

- DB: lat=47.4639421, lon=9.2493342, web=null
- SwissGolf (high, 56m, sim=0.643, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=38): name="Waldkirch / Golfpark Waldkirch", web="https://www.gcwaldkirch.ch/", plz/ort="null "
- OSM (high, 226m, sim=1): name="Golfpark Waldkirch", web="http://www.golfwaldkirch.ch/"

**Proposed UPDATE** (alle 13 course rows for klub, overall=high):
  - website: from swissgolf(high, 56m, sim=0.643)
```sql
UPDATE courses SET
  website = 'https://www.gcwaldkirch.ch/'
WHERE id IN (
  '1a9018c2-b7dd-4c49-8c18-88c98d1e7e86',
  '2012e395-d9aa-45ef-8464-f1543a3bbb36',
  '51a6ef44-e9d1-4eda-9798-b23e7a1930f2',
  '5eb40292-2cdb-4aa3-abf5-60ed918cc313',
  '8bdaeafb-0e9e-4ee5-82fd-b679a6e478dc',
  '8dbf8683-b5b7-4551-b016-b4a7920b161e',
  'a16ef4ec-a1c9-44a5-a660-7e31d9317bee',
  'a847934c-00eb-4307-8e91-6634f6eebd31',
  'ada0be45-c1c3-41bf-8fb4-b1735d0365d3',
  'bb88d647-b927-4a82-894c-d8d1e01f3a02',
  'bdec7a24-9a80-410c-9f89-ba5c8611db54',
  'd0db25c1-5034-4c70-94f0-8b49d3713ef0',
  'e07a03d3-186a-432c-ab87-06682419f4ff'
);
```

### Golfpark Zürichsee (Nuolen) (Switzerland, 2 courses)

- DB: lat=47.1980359, lon=8.8974636, web=null
- SwissGolf (low, 163m, sim=0.36, secondary, id=104): name="Zürichsee", web="https://www.golfpark.ch/de/", plz/ort="null "
- OSM (high, 138m, sim=1): name="Golfpark Zürichsee Nuolen", web="https://www.golfpark.ch/"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 138m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfpark.ch/'
WHERE id IN (
  'd6f7df3c-fd36-439d-b49a-6ab0eb8d8aad',
  'dc927b82-8826-4e49-94ae-7755368c83ba'
);
```

### Golfplatz Rheinfelden (Switzerland, 5 courses)

- DB: lat=47.5444238, lon=7.7761719, web=null
- SwissGolf (high, 33m, sim=0.524, boost=+0.6[city:rheinfelden,jaccard:0.50], primary, id=29): name="Rheinfelden", web="http://www.golfzentrum.ch/de/Home/", plz/ort="4310 Rheinfelden"
- OSM (low, 205m, sim=0.524): name="Golfclub Rheinfelden", web="https://www.golfzentrum.ch/de/Home/"

**Proposed UPDATE** (alle 5 course rows for klub, overall=high):
  - website: from swissgolf(high, 33m, sim=0.524)
```sql
UPDATE courses SET
  website = 'http://www.golfzentrum.ch/de/Home/'
WHERE id IN (
  '767f886a-b7e8-42a0-bd54-5c01e478549c',
  '840e025d-ee56-41de-8e3b-b510bcf45006',
  'b6c4045d-5052-48e2-b48d-88c864540150',
  'ccd529cf-ad1a-4abf-99df-19c65c4267b2',
  'ec7aa0ca-b80a-40b1-87cd-2ed88b176eb4'
);
```

### Heidental (Switzerland, 1 courses)

- DB: lat=47.3822475, lon=7.9662138, web=null
- SwissGolf (high, 122m, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=18): name="Heidental", web="https://www.golfheidental.ch/", plz/ort="null "
- OSM (medium, 390m, sim=1): name="Golfclub Heidental", web="https://www.golfheidental.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 122m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfheidental.ch/'
WHERE id IN (
  'b493c1e5-3581-4d00-9bef-496aa9967ac3'
);
```

### Interlaken-Unterseen (Switzerland, 1 courses)

- DB: lat=46.6763968, lon=7.8258724, web=null
- SwissGolf (low, 541m, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=20): name="Interlaken-Unterseen", web="https://www.interlakengolf.ch/", plz/ort="null "
- OSM (high, 161m, sim=1): name="Golfclub Interlaken-Unterseen", web="https://www.interlakengolf.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 161m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.interlakengolf.ch/'
WHERE id IN (
  '51512269-ee5c-4971-ae64-0b127111dc02'
);
```

### Lavaux Golf (Switzerland, 1 courses)

- DB: lat=46.5071054, lon=6.7759344, web=null
- SwissGolf (high, 183m, sim=1, boost=+0.2[jaccard:0.50], secondary, id=74): name="Lavaux", web="http://golflavaux.ch/", plz/ort="null "
- OSM (medium, 398m, sim=1): name="Golf de Lavaux", web="https://www.golflavaux.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 183m, sim=1)
```sql
UPDATE courses SET
  website = 'http://golflavaux.ch/'
WHERE id IN (
  'e2ebe010-557b-4671-9e6f-911faeaa705a'
);
```

### Les Coullaux (Switzerland, 2 courses)

- DB: lat=46.3535841, lon=6.8843324, web=null
- SwissGolf (high, 131m, sim=1, boost=+1.1[city:chessel,db-name-substring,jaccard:1.00], primary, id=77): name="Les Coullaux", web="https://www.golflescoullaux.ch/", plz/ort="1846 Chessel"
- OSM (high, 20m, sim=1): name="Golf Club les Coullaux", web="https://www.golflescoullaux.ch/"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from swissgolf(high, 131m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golflescoullaux.ch/'
WHERE id IN (
  '18b68c55-6840-49fb-9cab-decbc0082f72',
  '68b0dc5e-5756-4e30-88bb-a8713e030682'
);
```

### Limpachtal (Switzerland, 1 courses)

- DB: lat=47.1311737, lon=7.5058354, web=null
- SwissGolf (high, 54m, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=79): name="Limpachtal", web="http://www.golf-limpachtal.ch/", plz/ort="null "
- OSM (low, 613m, sim=1): name="Golf Limpachtal", web="https://www.golf-limpachtal.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 54m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf-limpachtal.ch/'
WHERE id IN (
  '4c21bdf6-ae43-40e0-a0d2-3be16b9d1e3a'
);
```

### Neuchatel (Switzerland, 1 courses)

- DB: lat=47.0329069, lon=6.9955934, web=null
- SwissGolf (low, 4574m, sim=1, boost=+0.8[city:saint,jaccard:1.00], secondary, id=87): name="Neuchâtel", web="https://www.golfdeneuchatel.ch/", plz/ort="2072 Saint-Blaise"
- OSM (high, 175m, sim=1): name="Golf & Country Club de Neuchâtel", web="https://www.golfdeneuchatel.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 175m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfdeneuchatel.ch/'
WHERE id IN (
  'b0d10c27-90f2-4157-8fa1-4301d134827f'
);
```

### Sion Golf Club (Switzerland, 1 courses)

- DB: lat=46.2414428, lon=7.3796982, web=null
- SwissGolf (high, 167m, sim=1, boost=+0.2[jaccard:0.50], secondary, id=95): name="Sion", web="https://www.golfsion.ch/", plz/ort="null "
- OSM (high, 239m, sim=1): name="Golf Club de Sion", web="http://www.golfclubsion.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 167m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfsion.ch/'
WHERE id IN (
  'e630424e-2ce3-4a2c-b714-8903ba2e3a96'
);
```

### Swiss Golf Bubikon (Switzerland, 1 courses)

- DB: lat=47.2614007, lon=8.8301605, web=null
- SwissGolf (high, 140m, sim=0.538, boost=+0.4[city:bubikon], primary, id=56): name="Bubikon", web="https://www.swissgolfbubikon.ch/", plz/ort="8608 Bubikon"
- OSM (medium, 307m, sim=1): name="Swiss Golf Bubikon", web="https://www.swissgolfbubikon.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from swissgolf(high, 140m, sim=0.538)
```sql
UPDATE courses SET
  website = 'https://www.swissgolfbubikon.ch/'
WHERE id IN (
  '76092cf4-ba59-43d5-bd5c-1b5361019c56'
);
```

### Winterberg Golf & Academy (Switzerland, 1 courses)

- DB: lat=47.4577486, lon=8.6850701, web=null
- SwissGolf (low, 491m, sim=0.556, primary, id=39): name="Winterberg", web="https://www.golf-winterberg.ch/home/index.html?home=1#section1", plz/ort="null "
- OSM (high, 134m, sim=1): name="Winterberg Golf & Academy", web="https://www.golf-winterberg.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 134m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golf-winterberg.ch/'
WHERE id IN (
  'a5148ba6-6d64-4d04-8d57-36f0f7b1587d'
);
```

## Medium confidence (review before applying)

### Bürgenstock Golf Club (Switzerland, 1 courses)

- DB: lat=47.0003117, lon=8.3983261, web=null
- SwissGolf (low, 660m, sim=1, boost=+0.2[jaccard:0.50], primary, id=57): name="Bürgenstock", web="https://www.golfclub-buergenstock.ch/", plz/ort="null "
- OSM (medium, 499m, sim=1): name="Bürgenstock Golf Course", web="https://www.golfclub-buergenstock.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 499m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfclub-buergenstock.ch/'
WHERE id IN (
  '904ae6a5-e958-4e6b-b096-dc676475a076'
);
```

### GC Flühli-Sörenberg 18-Loch (Switzerland, 1 courses)

- DB: lat=46.8677562, lon=8.0157953, web=null
- SwissGolf (medium, 499m, sim=0.667, boost=+0.27[jaccard:0.67], primary, id=65): name="Flühli-Sörenberg", web="https://www.gcfs.ch/", plz/ort="null "
- OSM (low, 470m, sim=0.667): name="Golfclub Flühli-Sörenberg", web="https://www.gcfs.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from swissgolf(medium, 499m, sim=0.667)
```sql
UPDATE courses SET
  website = 'https://www.gcfs.ch/'
WHERE id IN (
  '4ccdc18a-225b-4444-ab03-093f83308fe5'
);
```

### GC Schinznach Bad (Switzerland, 1 courses)

- DB: lat=47.4606781, lon=8.1643321, web=null
- SwissGolf (medium, 399m, sim=1, boost=+0.8[city:schinznach,jaccard:1.00], primary, id=33): name="Schinznach Bad", web="https://golf-schinznach.ch/", plz/ort="5116 Schinznach Bad"
- OSM (medium, 365m, sim=1): name="Golf Schinznach Bad", web="http://www.golfsuisse.ch/golfclubs/overview.cfm?clubnr=43"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from swissgolf(medium, 399m, sim=1)
```sql
UPDATE courses SET
  website = 'https://golf-schinznach.ch/'
WHERE id IN (
  'f076d276-e874-4f07-a295-caab34ecd415'
);
```

### Golf & Country Club Blumisberg (Switzerland, 1 courses)

- DB: lat=46.8745563, lon=7.2881376, web=null
- SwissGolf (medium, 288m, sim=1, boost=+0.4[city:wünnewil], secondary, id=50): name="Blumisberg", web="https://www.blumisberg.ch", plz/ort="3184 Wünnewil"
- OSM (medium, 406m, sim=1): name="Golf & Country Club Blumisberg", web="http://www.golf-blumisberg.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from swissgolf(medium, 288m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.blumisberg.ch'
WHERE id IN (
  'fcd2a4da-49b2-4123-adca-e20e68cf269e'
);
```

### GOLF CLUB DE GENEVE (Switzerland, 1 courses)

- DB: lat=46.2237572, lon=6.1953294, web=null
- SwissGolf (medium, 358m, sim=1, boost=+0.2[jaccard:0.50], secondary, id=67): name="Genève", web="http://www.golfgeneve.ch/", plz/ort="null "
- OSM (high, 57m, sim=1): name="Golf Club de Genève", web="https://www.golfgeneve.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from swissgolf(medium, 358m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golfgeneve.ch/'
WHERE id IN (
  '050bbb7e-86dc-492a-9294-8cbeed980ac7'
);
```

### Golf Club de Lausanne (Switzerland, 1 courses)

- DB: lat=46.562504, lon=6.6737007, web=null
- SwissGolf (medium, 414m, sim=1, boost=+0.2[jaccard:0.50], secondary, id=25): name="Lausanne", web="https://golflausanne.ch/", plz/ort="null "
- OSM (high, 134m, sim=1): name="Golf Club de Lausanne", web="https://golflausanne.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from swissgolf(medium, 414m, sim=1)
```sql
UPDATE courses SET
  website = 'https://golflausanne.ch/'
WHERE id IN (
  '4801e9ed-99e3-43e2-a9b7-4a7524ec0788'
);
```

### GOLF CLUB MONTREUX (Switzerland, 1 courses)

- DB: lat=46.3190815, lon=6.9467781, web=null
- SwissGolf (medium, 415m, sim=1, boost=+0.2[jaccard:0.50], secondary, id=86): name="Montreux", web="http://www.golfmontreux.ch/", plz/ort="null "
- OSM (high, 19m, sim=1): name="Golf Club Montreux", web="https://www.golfmontreux.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from swissgolf(medium, 415m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golfmontreux.ch/'
WHERE id IN (
  '8c714734-fd01-4f37-9b2c-96cda353b0b8'
);
```

### Golf Club Thunersee (Switzerland, 1 courses)

- DB: lat=46.7480633, lon=7.5996098, web=null
- SwissGolf (medium, 275m, sim=1, boost=+0.2[jaccard:0.50], primary, id=36): name="Thunersee", web="http://www.golfthunersee.ch/", plz/ort="null "
- OSM (high, 57m, sim=1): name="Golf Club Thunersee", web="https://www.golfthunersee.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from swissgolf(medium, 275m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golfthunersee.ch/'
WHERE id IN (
  '915b0767-0213-49ed-889e-765ba91fb5d3'
);
```

### Golf Emmental (Switzerland, 1 courses)

- DB: lat=47.0276804, lon=7.6294846, web=null
- SwissGolf (medium, 303m, sim=1, boost=+0.2[jaccard:0.50], secondary, id=10): name="Emmental", web="https://www.golfemmental.ch/", plz/ort="null "
- OSM (medium, 357m, sim=1): name="Golf Emmental", web="https://golfemmental.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from swissgolf(medium, 303m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfemmental.ch/'
WHERE id IN (
  'd4550cac-aa0a-4c15-b434-9e764ed1ab84'
);
```

### Golf Lipperswil (Switzerland, 9 courses)

- DB: lat=47.6134083, lon=9.0495276, web=null
- SwissGolf (medium, 282m, sim=1, boost=+0.2[jaccard:0.50], secondary, id=26): name="Lipperswil", web="https://golfswitzerland.ch/", plz/ort="null "
- OSM (medium, 389m, sim=1): name="Golf Club Lipperswil", web="https://golfswitzerland.ch/"

**Proposed UPDATE** (alle 9 course rows for klub, overall=medium):
  - website: from swissgolf(medium, 282m, sim=1)
```sql
UPDATE courses SET
  website = 'https://golfswitzerland.ch/'
WHERE id IN (
  '2405c7ee-f0a2-4af1-b7cb-31fb6114e04e',
  '349ccc6b-9877-49fd-9a9f-8f131f639c89',
  '34f07ee6-99aa-4df6-ac2d-9a9b45e09275',
  '4649a512-def2-4a45-a04a-a0d31f4d8c01',
  '6755da15-89c1-4acb-bdef-76b8773abf70',
  '9aa71fb2-dcbc-4349-8b3b-bd35c055e28b',
  'a4126ccd-d6c7-4b6c-93a8-d628aab3be9f',
  'a63a6b61-f36f-4001-8295-20fe0a404154',
  'aa3622b6-197f-4c2e-a8e2-ac8fe55421b4'
);
```

### Golf-Club Arosa (Switzerland, 1 courses)

- DB: lat=46.7884382, lon=9.6819762, web=null
- SwissGolf (medium, 350m, sim=1, boost=+0.2[jaccard:0.50], secondary, id=47): name="Arosa", web="https://www.golfarosa.ch/", plz/ort="null "
- OSM (medium, 405m, sim=1): name="Golf Club Arosa", web="https://www.golfarosa.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from swissgolf(medium, 350m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfarosa.ch/'
WHERE id IN (
  '7958215e-0e1e-4ce3-a422-22a7965cd01d'
);
```

### Golfpark Oberkirch (Switzerland, 3 courses)

- DB: lat=47.1517928, lon=8.1068883, web=null
- SwissGolf (low, 637m, sim=0.643, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=89): name="Oberkirch / Golfpark Oberkirch", web="https://golfclub-oberkirch.ch/", plz/ort="null "
- OSM (medium, 415m, sim=1): name="Golfpark Oberkirch", web="http://www.golfpark-oberkirch.ch/"

**Proposed UPDATE** (alle 3 course rows for klub, overall=medium):
  - website: from osm(medium, 415m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golfpark-oberkirch.ch/'
WHERE id IN (
  '4e22c4b6-7140-4441-a275-4be352a78de6',
  '8606a8a1-8b66-4392-987e-48154dfb98a6',
  'ba9a6dc7-2c41-4fb6-90c0-27638280eb13'
);
```

### Golfpark Otelfingen (Switzerland, 5 courses)

- DB: lat=47.4548548, lon=8.4017009, web=null
- SwissGolf (low, 2733m, sim=0.731, boost=+0.57[db-name-substring,jaccard:0.67], secondary, id=72): name="Lägern / Golfpark Otelfingen", web="https://gc-laegern.ch/", plz/ort="null "
- OSM (medium, 285m, sim=1): name="Golfpark Otelfingen", web="http://www.golfotelfingen.ch/"

**Proposed UPDATE** (alle 5 course rows for klub, overall=medium):
  - website: from osm(medium, 285m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golfotelfingen.ch/'
WHERE id IN (
  '1370e1eb-83ee-4515-856e-e2a1ed258810',
  '6c25915b-be8b-4399-aa06-ae6f69b549fe',
  '8fa6b517-c6e2-4946-8e02-db8d8e378553',
  'ac29989b-be24-495a-8ec6-99d997560af2',
  'ca7950c3-e99d-4c02-806c-6019fecfaf38'
);
```

### Payerne (Switzerland, 1 courses)

- DB: lat=46.8159672, lon=6.9478684, web=null
- SwissGolf (low, 967m, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=90): name="Payerne", web="http://www.golfpayerne.ch/", plz/ort="null "
- OSM (medium, 376m, sim=1): name="Golf Club de Payerne", web="https://www.golfpayerne.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 376m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfpayerne.ch/'
WHERE id IN (
  '31d40cef-7f32-416f-97b2-eeea8d896b5d'
);
```

### Schloss Goldenberg (Switzerland, 1 courses)

- DB: lat=47.5730603, lon=8.6492773, web=null
- SwissGolf (medium, 430m, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=68): name="Schloss Goldenberg", web="http://www.golfclubschlossgoldenberg.ch/", plz/ort="null "
- OSM (low, 894m, sim=1): name="Golfclub Schloss Goldenberg", web="https://golfclubschlossgoldenberg.ch/"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from swissgolf(medium, 430m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golfclubschlossgoldenberg.ch/'
WHERE id IN (
  'c2f0d0db-2c57-4572-9ba6-f38ff852ea9c'
);
```

## Low confidence (manual decision)

### Andermatt Golf Course (Switzerland, 1 courses)

- DB: lat=46.6369433, lon=8.5946374, web=null
- SwissGolf (low, 990m, sim=0.281, secondary, id=162): name="Andermatt Realp: Anlage Andermatt", web="https://www.andermatt-golf.ch", plz/ort="null "
- OSM (low, 1583m, sim=1): name="Andermatt", web="https://www.andermatt-swissalps.ch/de/ski-golf/golf.html"

### Birsgolf Zwingen (Switzerland, 1 courses)

- DB: lat=47.4377543, lon=7.5280899, web=null
- SwissGolf (low, 860m, sim=0.125, primary, id=73): name="Laufental", web="https://www.birs-golf.ch/", plz/ort="null "
- OSM (low, 888m, sim=0.75): name="BIRS-Golf Zwingen", web=null

### Breitenloo (Switzerland, 1 courses)

- DB: lat=47.1301054, lon=7.4065122, web=null
- SwissGolf (low, 99628m, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=54): name="Breitenloo", web="https://breitenloo.ch/", plz/ort="null "
- OSM (low, 99884m, sim=1): name="Golf Club Breitenloo", web="https://www.breitenloo.ch/"

### Bunavistagolf (Switzerland, 1 courses)

- DB: lat=46.7918682, lon=9.2577578, web=null
- SwissGolf (low, 892m, sim=0.647, boost=+0.65[city:sagogn,name-token:sagogn], secondary, id=31): name="Buna Vista Sagogn", web="https://www.bunavistagolf.ch/", plz/ort="7152 Sagogn"
- OSM (no-match, 1101m, sim=0.647): name="Buna Vista Golf Sagogn", web="http://www.bunavista.ch/"

### Chessel (Switzerland, 1 courses)

- DB: lat=46.3495725, lon=6.8944469, web=null
- SwissGolf (low, 976m, sim=0.125, primary, id=77): name="Les Coullaux", web="https://www.golflescoullaux.ch/", plz/ort="1846 Chessel"
- OSM (low, 887m, sim=0.125): name="Golf Club les Coullaux", web="https://www.golflescoullaux.ch/"

### City Golf Basel Bachgraben (Switzerland, 1 courses)

- DB: lat=47.5609109, lon=7.5530866, web=null
- SwissGolf (low, 236m, sim=0.19, boost=+0.2[jaccard:0.50], pitch-putt, id=190): name="City Golf", web="https://citygolf.ch/", plz/ort="null "
- OSM (no-match, 66880m, sim=0.333): name="Golf Club Sempachersee", web="https://www.golf-sempachersee.ch/"

### Country Club La Largue (Switzerland, 1 courses)

- DB: lat=46.8715791, lon=7.2886384, web=null
- SwissGolf (low, 219m, sim=0.2, secondary, id=50): name="Blumisberg", web="https://www.blumisberg.ch", plz/ort="3184 Wünnewil"
- OSM (low, 199m, sim=0.2): name="Golf & Country Club Blumisberg", web="http://www.golf-blumisberg.ch/"

### Domaine Impérial (Switzerland, 1 courses)

- DB: lat=46.4239425, lon=6.2655115, web=null
- SwissGolf (low, 3115m, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=61): name="Domaine Impérial", web="https://www.golfdomaineimperial.com/", plz/ort="null "
- OSM (low, 2598m, sim=1): name="Golf Club du Domaine Impérial", web="http://www.golfdomaineimperial.ch"

### Domat Ems (Switzerland, 4 courses)

- DB: lat=46.8208086, lon=9.4345559, web=null
- SwissGolf (low, 980m, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=12): name="Domat Ems", web="https://www.golfdomatems.ch/home.html", plz/ort="null "
- OSM (low, 539m, sim=1): name="Golfclub Domat/Ems", web="https://www.golfdomatems.ch"

### Gams (Switzerland, 1 courses)

- DB: lat=47.2054106, lon=9.4421264, web=null
- SwissGolf (low, 114217m, sim=0.75, primary, id=96): name="Goms", web="https://golf-source-du-rhone.ch", plz/ort="null "
- OSM (low, 113575m, sim=0.75): name="Golf Goms", web="https://www.golfgoms.ch/"

### GC  Sedrun (Switzerland, 1 courses)

- DB: lat=46.6809591, lon=8.7762198, web=null
- SwissGolf (low, 5249m, sim=1, boost=+0.4[jaccard:1.00], primary, id=94): name="Sedrun", web="https://www.golfclub-sedrun.ch/", plz/ort="null "
- OSM (low, 5095m, sim=1): name="Golfclub Sedrun", web="http://golfclub-sedrun.ch/"

### GC Ennetsee (Switzerland, 1 courses)

- DB: lat=47.1497967, lon=8.4422557, web=null
- SwissGolf (low, 176m, sim=0.276, secondary, id=62): name="Ennetsee / Golfpark Holzhäusern", web="https://www.ennetsee-golf.ch/", plz/ort="6343 Rotkreuz"
- OSM (low, 683m, sim=0.1): name="Golfpark Holzhäusern", web="http://www.golfparkholzhaeusern.ch/"

### GC Gotthard Realp (Switzerland, 1 courses)

- DB: lat=46.5988457, lon=8.5020509, web=null
- SwissGolf (low, 433m, sim=0.321, boost=+0.4[city:realp], primary, id=4): name="Andermatt Realp: Anlage Realp", web="https://www.golf-gotthard.ch/", plz/ort="6491 Realp"
- OSM (low, 634m, sim=1): name="Golfclub Gotthard Realp", web="https://www.golf-gotthard.ch/"

### GC Samedan - Engadin (Switzerland, 1 courses)

- DB: lat=46.5332403, lon=9.874586, web=null
- SwissGolf (low, 1428m, sim=0.348, boost=+0.92[city:samedan,jaccard:0.67,typo:engadin~engadine], secondary, id=44): name="Engadine: Anlage Samedan", web="https://www.engadin-golf.ch/de", plz/ort="7503 Samedan"
- OSM (no-match, 1326m, sim=0.235): name="Golfplatz Samedan", web="https://www.engadin-golf.ch/de/golfplaetze"

### GC Vulpera (Switzerland, 1 courses)

- DB: lat=46.7953236, lon=10.2891292, web=null
- SwissGolf (low, 1202m, sim=1, boost=+0.4[jaccard:1.00], primary, id=101): name="Vulpera", web="https://www.vulperagolf.ch/", plz/ort="null "
- OSM (low, 1316m, sim=1): name="Golf Club Vulpera", web="https://www.vulperagolf.ch/"

### GC Zuoz - Engadin (Switzerland, 1 courses)

- DB: lat=46.6012885, lon=9.9608039, web=null
- SwissGolf (low, 598m, sim=0.241, boost=+0.45[jaccard:0.50,typo:engadin~engadine], secondary, id=43): name="Engadine: Anlage Zuoz-Madulain", web="https://www.engadin-golf.ch/de", plz/ort="null "
- OSM (no-match, 1512m, sim=0.226): name="Golf Engadin St.Moritz - Course Zuoz-Madulain", web="https://www.engadin-golf.ch/en/golf-courses#course-zuoz-madulain"

### GCC Schönenberg (Switzerland, 1 courses)

- DB: lat=47.1926164, lon=8.6408166, web=null
- SwissGolf (low, 1905m, sim=0.733, boost=+0.4[jaccard:1.00], secondary, id=93): name="Schönenberg", web="https://www.golf-schoenenberg.ch/", plz/ort="null "
- OSM (low, 1693m, sim=0.733): name="Golf & Country Club Schönenberg", web="https://www.golf-schoenenberg.ch/"

### GCC Wallenried (Switzerland, 1 courses)

- DB: lat=46.8736522, lon=7.1158753, web=null
- SwissGolf (low, 638m, sim=0.714, boost=+0.4[jaccard:1.00], secondary, id=102): name="Wallenried", web="http://www.golf-wallenried.ch/", plz/ort="null "
- OSM (no-match, 43167m, sim=0.353): name="Golfclub Gstaad Saanenland", web="https://www.golfclubgstaad.ch/"

### Golf Augwil (Switzerland, 1 courses)

- DB: lat=47.4627054, lon=8.5933524, web=null
- SwissGolf (low, 1414m, sim=1, boost=+0.2[jaccard:0.50], primary, id=6): name="Augwil", web="https://www.golfaugwil.ch/", plz/ort="null "
- OSM (low, 1373m, sim=1): name="Golf Augwil", web="https://www.golfaugwil.ch/"

### Golf Club Alvaneu (Switzerland, 1 courses)

- DB: lat=46.66828, lon=9.6465233, web=null
- SwissGolf (low, 179m, sim=0.636, boost=+0.2[jaccard:0.50], secondary, id=46): name="Alvaneu Bad", web="https://golf-alvaneu.ch/", plz/ort="null "
- OSM (low, 642m, sim=0.636): name="Golf Club Alvaneu Bad", web="https://golf-alvaneu.ch"

### Golf Club Vuissens (Switzerland, 1 courses)

- DB: lat=46.8523632, lon=6.8468389, web=null
- SwissGolf (low, 13677m, sim=1, boost=+0.2[jaccard:0.50], secondary, id=37): name="Vuissens", web="http://www.golfvuissens.ch/", plz/ort="null "
- OSM (low, 13886m, sim=1): name="Golf Club Vuissens", web="https://www.golfvuissens.ch/"

### Golf Kyburg (Switzerland, 1 courses)

- DB: lat=47.4421626, lon=8.7052708, web=null
- SwissGolf (low, 2376m, sim=1, boost=+0.2[jaccard:0.50], secondary, id=22): name="Kyburg", web="https://www.golf-kyburg.ch/", plz/ort="null "
- OSM (low, 2068m, sim=1): name="Golf Kyburg", web="https://www.golf-kyburg.ch/"

### Golfclub Engelberg (Switzerland, 1 courses)

- DB: lat=46.8223497, lon=8.4043996, web=null
- SwissGolf (low, 2871m, sim=1, boost=+0.4[jaccard:1.00], secondary, id=13): name="Engelberg", web="https://golfclub-engelberg.ch/", plz/ort="null "
- OSM (no-match, 3115m, sim=0.563): name="Golfclub Engelberg-Titlis", web="https://www.golfclub-engelberg.ch/"

### Golfclub Klosters (Switzerland, 1 courses)

- DB: lat=46.8829097, lon=9.8750678, web=null
- SwissGolf (low, 2802m, sim=1, boost=+0.4[jaccard:1.00], primary, id=21): name="Klosters", web="https://golf-klosters.ch/", plz/ort="null "
- OSM (no-match, 196387m, sim=0.4): name="Golf & Country Club Blumisberg", web="http://www.golf-blumisberg.ch/"

### Golfclub Leuk (Switzerland, 2 courses)

- DB: lat=46.3115552, lon=7.6407754, web=null
- SwissGolf (low, 1588m, sim=1, boost=+0.4[jaccard:1.00], secondary, id=78): name="Leuk", web="https://golfleuk.ch/home/", plz/ort="null "
- OSM (low, 2327m, sim=1): name="Golf Club Leuk", web="https://golfleuk.ch/"

### Golfidylle Brigels (Switzerland, 1 courses)

- DB: lat=46.7678264, lon=9.0803151, web=null
- SwissGolf (low, 854m, sim=0.389, boost=+0.2[jaccard:0.50], primary, id=55): name="Brigels", web="http://www.golfidylle.ch/", plz/ort="null "
- OSM (low, 137m, sim=0.389): name="Golf Club Brigels", web="https://www.golfidylle.ch/"

### Gonten (Switzerland, 2 courses)

- DB: lat=47.3300589, lon=9.3658417, web=null
- SwissGolf (low, 4m, sim=0.222, secondary, id=16): name="Appenzell", web="https://www.golfplatz.ch/home.html", plz/ort="null "
- OSM (low, 425m, sim=0.231): name="Golfplatz Gonten Appenzell", web="https://www.golfplatz.ch/"

### Gstaad-Saanenland (Switzerland, 1 courses)

- DB: lat=46.4721619, lon=7.288748, web=null
- SwissGolf (low, 4974m, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=17): name="Gstaad-Saanenland", web="https://www.golfclubgstaad.ch/", plz/ort="null "
- OSM (low, 5512m, sim=1): name="Golfclub Gstaad Saanenland", web="https://www.golfclubgstaad.ch/"

### Hittnau (Switzerland, 1 courses)

- DB: lat=47.3682799, lon=8.8233708, web=null
- SwissGolf (low, 1770m, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=19): name="Hittnau", web="http://www.gcch.ch/", plz/ort="null "
- OSM (low, 1878m, sim=1): name="Golf & Country Club Hittnau", web="https://www.gcch.ch/"

### Kuessnacht am Rigi (Switzerland, 1 courses)

- DB: lat=47.08385, lon=8.4386308, web=null
- SwissGolf (low, 880m, sim=0.5, secondary, id=71): name="Küssnacht", web="https://www.gck.swiss", plz/ort="null "
- OSM (no-match, 1157m, sim=0.5): name="Golfclub Küssnacht", web="http://www.gck.ch/"

### Küssnacht am Rigi (Switzerland, 1 courses)

- DB: lat=47.08385, lon=8.4386308, web=null
- SwissGolf (low, 880m, sim=0.529, boost=+0.2[jaccard:0.50], secondary, id=71): name="Küssnacht", web="https://www.gck.swiss", plz/ort="null "
- OSM (no-match, 1157m, sim=0.529): name="Golfclub Küssnacht", web="http://www.gck.ch/"

### Lenzerheide (Switzerland, 1 courses)

- DB: lat=46.7280297, lon=9.5584408, web=null
- SwissGolf (low, 2045m, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=75): name="Lenzerheide", web="https://golflenzerheide.ch/", plz/ort="null "
- OSM (low, 2129m, sim=1): name="Golfclub Lenzerheide", web="http://www.golf-lenzerheide.ch/"

### Les Bois (Switzerland, 1 courses)

- DB: lat=47.1770618, lon=6.9060846, web=null
- SwissGolf (low, 1113m, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=76): name="Les Bois", web="http://www.golflesbois.ch/", plz/ort="null "
- OSM (low, 1490m, sim=1): name="Golf Club Les Bois", web="https://golflesbois.ch/"

### Luzern Golf Club (Switzerland, 1 courses)

- DB: lat=47.066966, lon=8.336993, web=null
- SwissGolf (low, 266m, sim=0.714, secondary, id=27): name="Lucerne", web="http://www.golfclubluzern.ch/", plz/ort="null "
- OSM (low, 697m, sim=0.714): name="Lucerne Golf Club", web="https://www.golfclubluzern.ch/"

### Niederburen (Switzerland, 1 courses)

- DB: lat=47.4661193, lon=9.2042148, web=null
- SwissGolf (low, 758m, sim=1, boost=+0.65[jaccard:1.00,typo:niederburen~niederbüren], secondary, id=28): name="Niederbüren", web="https://www.osgc.ch/", plz/ort="null "
- OSM (low, 951m, sim=0.524): name="Golfplatz Niederbüren", web=null

### Nuolen (Switzerland, 1 courses)

- DB: lat=47.2036583, lon=8.8876137, web=null
- SwissGolf (low, 852m, sim=0.222, secondary, id=104): name="Zürichsee", web="https://www.golfpark.ch/de/", plz/ort="null "
- OSM (low, 996m, sim=0.24): name="Golfpark Zürichsee Nuolen", web="https://www.golfpark.ch/"

### Oberkirch (18-Loch reduziert) (Switzerland, 2 courses)

- DB: lat=47.1568763, lon=8.1068849, web=null
- SwissGolf (low, 207m, sim=0.429, secondary, id=89): name="Oberkirch / Golfpark Oberkirch", web="https://golfclub-oberkirch.ch/", plz/ort="null "
- OSM (low, 556m, sim=0.185): name="Golfpark Oberkirch", web="http://www.golfpark-oberkirch.ch/"

### Severiano Ballasteros (Switzerland, 1 courses)

- DB: lat=46.304419, lon=7.4670312, web=null
- SwissGolf (low, 123m, sim=0.333, boost=+0.25[name-token:crans], secondary, id=58): name="Crans-sur-Sierre", web="https://www.golfcrans.ch/fr/", plz/ort="null "
- OSM (low, 527m, sim=0.952): name="Severiano Ballesteros Course", web=null

### Sierre Golf Club (Switzerland, 1 courses)

- DB: lat=46.2588523, lon=7.4630462, web=null
- SwissGolf (low, 2645m, sim=1, boost=+0.9[city:granges,plz:3977,jaccard:0.50], secondary, id=35): name="Sierre", web="https://www.golfsierre.ch/", plz/ort="3977 Granges"
- OSM (low, 1079m, sim=1): name="Golf Club de Sierre", web="https://www.golfsierre.ch/"

### Source du Rhone Obergesteln (Switzerland, 1 courses)

- DB: lat=46.5137824, lon=8.3248669, web=null
- SwissGolf (low, 395m, sim=0.083, primary, id=96): name="Goms", web="https://golf-source-du-rhone.ch", plz/ort="null "
- OSM (no-match, 1019m, sim=0.083): name="Golf Goms", web="https://www.golfgoms.ch/"

### Verbier (Switzerland, 1 courses)

- DB: lat=46.0961011, lon=7.2286765, web=null
- SwissGolf (low, 993m, sim=1, boost=+1.1[city:verbier,db-name-substring,jaccard:1.00], secondary, id=99): name="Verbier", web="https://www.verbiergolfclub.ch", plz/ort="1936 Verbier"
- OSM (low, 815m, sim=1): name="Golf Club de Verbier", web="https://www.verbiergolfclub.ch/"

### Villars (Switzerland, 1 courses)

- DB: lat=46.791321, lon=7.1161892, web=null
- SwissGolf (low, 53513m, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], secondary, id=100): name="Villars", web="http://www.golf-villars.ch/", plz/ort="null "
- OSM (low, 53577m, sim=1): name="Golf de Villars", web="http://www.golf-villars.com"

### Zugersee (Switzerland, 1 courses)

- DB: lat=47.1502832, lon=8.4412652, web=null
- SwissGolf (low, 186m, sim=0.138, boost=+0.25[name-token:holzhäusern], secondary, id=62): name="Ennetsee / Golfpark Holzhäusern", web="https://www.ennetsee-golf.ch/", plz/ort="6343 Rotkreuz"
- OSM (low, 675m, sim=0.15): name="Golfpark Holzhäusern", web="http://www.golfparkholzhaeusern.ch/"

### Zürich Golf & Country Club (Switzerland, 1 courses)

- DB: lat=47.339835, lon=8.6282329, web=null
- SwissGolf (low, 528m, sim=0.429, boost=+0.25[name-token:zumikon], secondary, id=42): name="Zumikon", web="https://www.gccz.ch/", plz/ort="null "
- OSM (low, 327m, sim=0.429): name="Golf & Country Club Zürich Zumikon", web="http://www.gccz.zumikon.ch/"

## Orphans — DB klubber uden SwissGolf-match (manual review queue)

Disse klubber er sandsynligvis ikke Swiss Golf-medlemmer (kommercielle resorts, militær, lukkede). Auto-opdateres IKKE.

- **GCCS** (1 courses) — DB lat=47.1926164, lon=8.6408166 (best SG sim=0.5, 78960m → Goms), OSM no-match 78397m
- **Golf Sempachersee** (2 courses) — DB lat=47.1513607, lon=8.2266792 (best SG sim=0.583, 1098m → Sempach), OSM low 1308m
- **Golf Target Locarno** (1 courses) — DB lat=46.1578004, lon=8.8003213 (best SG sim=0.429, 4613m → Gerre Losone), OSM high 20m
- **Golfabout** (1 courses) — DB lat=47.5355969, lon=8.7623518 (best SG sim=0.333, 235046m → Bonmont), OSM no-match 113794m
- **Golfclub Affoltern** (1 courses) — DB lat=47.2782467, lon=8.4521518 (best SG sim=0.222, 6291m → Albis-Golf), OSM low 919m
- **Golfplatz Grindelwald** (1 courses) — DB lat=46.6167475, lon=8.0412943 (best SG sim=0.333, 56290m → Gstaad-Saanenland), OSM low 41m
- **La Cote** (1 courses) — DB lat=46.9431415, lon=7.0225152 (best SG sim=0.5, 79732m → City Golf), OSM no-match 163938m
- **Ostschweizerischer GC Niederbüren** (1 courses) — DB lat=47.4641472, lon=9.2080653 (best SG sim=0.367, 1121m → Niederbüren), OSM low 1311m
- **Pearl Mountain Golf Club** (1 courses) — DB lat=null, lon=null (best SG sim=0.429, Infinitym → Golf de Pra Roman), OSM no-match Infinitym
- **Publikumsgolf Rottal** (1 courses) — DB lat=47.1077604, lon=8.1205054 (best SG sim=0.3, 57230m → Laufental), OSM no-match 45973m
- **Saas-Fee** (1 courses) — DB lat=46.1000413, lon=7.9225095 (best SG sim=0.375, 164802m → Basel), OSM no-match 108903m
- **Swin - Golf von Cremin** (1 courses) — DB lat=46.7254444, lon=6.8418773 (best SG sim=0.294, 102461m → Saint Apollinaire), OSM low 260m
- **Swingolf Herrenmatt** (1 courses) — DB lat=47.4562417, lon=7.6402192 (best SG sim=0.368, 87107m → Indoor Golf Performance), OSM no-match 101165m
- **Zwingen Pitch 40/50/60m** (1 courses) — DB lat=null, lon=null (best SG sim=0.217, Infinitym → Golf Glarnerland - Pitch&Putt), OSM no-match Infinitym
