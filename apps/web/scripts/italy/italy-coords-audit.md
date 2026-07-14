# Italy coord-audit report
Generated: 2026-05-04T11:18:23

Source: 149 klubber i `italy-match-candidates.json` reviewCoordAudit-bucket.
Marco Simone-mønstret: navn matcher 1:1 i OSM+LC men DB-coords er off med >1km.


## Tier-kriterier

| Tier | Kriterier | Action |
|---|---|---|
| **high** | sim≥0.9 i BÅDE OSM+LC, OSM↔LC ≤500m, DB→consensus ≥1km | Auto-fix kandidat |
| **medium** | sim≥0.9 i mindst én, OSM↔LC ≤1000m, DB→consensus ≥1km | Manuel review |
| **low** | sim≥0.7 i mindst én | Manuel inspektion |
| **none** | Ingen klar coord-fejl | Skip — vent på bedre data |

Consensus = mean(OSM, LC) hvis begge findes; ellers den ene source.

## Summary

| Tier | Klubber | Courses |
|---|---:|---:|
| high | 17 | 25 |
| medium | 9 | 11 |
| low | 75 | 115 |
| none | 48 | 72 |

## High confidence (recommended to apply)

### Castellaro Golf Resort (1 courses)

- DB:        lat=44.2425741, lon=10.7857668
- OSM:       lat=43.857851, lon=7.8776193, sim=1, name="Castellaro Golf Resort"
- LC:        lat=43.855515, lon=7.877661, sim=1, name="Castellaro Golf Club"
- Consensus: lat=43.8566830, lon=7.8776401 (mean(osm,lc))
- DB → consensus:   236332m
- OSM ↔ LC agreement: 260m

```sql
UPDATE courses SET
  latitude = 43.8566830,
  longitude = 7.8776401
WHERE id IN (
  '32fb2e6a-a2ad-49d2-8eca-906bea40e9c9'
);
```

### Lanzo (1 courses)

- DB:        lat=45.2733505, lon=7.4774108
- OSM:       lat=45.9742221, lon=9.0365905, sim=1, name="Golf Club Lanzo"
- LC:        lat=45.975845, lon=9.038944, sim=1, name="Lanzo Golf Club"
- Consensus: lat=45.9750335, lon=9.0377673 (mean(osm,lc))
- DB → consensus:   144258m
- OSM ↔ LC agreement: 256m

```sql
UPDATE courses SET
  latitude = 45.9750335,
  longitude = 9.0377673
WHERE id IN (
  '53df7ee8-265d-4eb0-87e2-dee9fde8522e'
);
```

### La Rossera (1 courses)

- DB:        lat=45.7566557, lon=9.7542192
- OSM:       lat=45.6613682, lon=9.8506165, sim=1, name="Golf Club La Rossera"
- LC:        lat=45.66077, lon=9.850118, sim=1, name="Golf Club La Rossera"
- Consensus: lat=45.6610691, lon=9.8503672 (mean(osm,lc))
- DB → consensus:   12989m
- OSM ↔ LC agreement: 77m

```sql
UPDATE courses SET
  latitude = 45.6610691,
  longitude = 9.8503672
WHERE id IN (
  '59dccca5-3cdb-443b-8ed6-3a1100774c68'
);
```

### Barialto (1 courses)

- DB:        lat=40.9279932, lon=16.9323455
- OSM:       lat=40.9864337, lon=16.9089712, sim=1, name="Barialto Golf Club"
- LC:        lat=40.990288, lon=16.910553, sim=1, name="Barialto Golf Club"
- Consensus: lat=40.9883608, lon=16.9097621 (mean(osm,lc))
- DB → consensus:   6975m
- OSM ↔ LC agreement: 449m

```sql
UPDATE courses SET
  latitude = 40.9883608,
  longitude = 16.9097621
WHERE id IN (
  'a85fd66c-1e6d-467f-bd15-22bf8ebdb696'
);
```

### Centanni Golf Club (2 courses)

- DB:        lat=43.7697955, lon=11.2556404
- OSM:       lat=43.7435242, lon=11.3322324, sim=1, name="Golf Club Centanni"
- LC:        lat=43.744976, lon=11.333381, sim=1, name="Golf Club Centanni"
- Consensus: lat=43.7442501, lon=11.3328067 (mean(osm,lc))
- DB → consensus:   6817m
- OSM ↔ LC agreement: 186m

```sql
UPDATE courses SET
  latitude = 43.7442501,
  longitude = 11.3328067
WHERE id IN (
  'f045614a-875d-4a92-ab7d-3a6c2b68928b',
  'f062914a-48ae-42bc-931c-fcf549984382'
);
```

### Royal Golf La Bagnaia (1 courses)

- DB:        lat=43.2661182, lon=11.3293984
- OSM:       lat=43.2204878, lon=11.2910751, sim=1, name="Royal Golf La Bagnaia"
- LC:        lat=43.218452, lon=11.293819, sim=1, name="Royal Golf La Bagnaia"
- Consensus: lat=43.2194699, lon=11.2924470 (mean(osm,lc))
- DB → consensus:   5989m
- OSM ↔ LC agreement: 317m

```sql
UPDATE courses SET
  latitude = 43.2194699,
  longitude = 11.2924470
WHERE id IN (
  '9452d905-8cba-4baa-8014-7063290a3928'
);
```

### Golf Nazionale (1 courses)

- DB:        lat=42.2387896, lon=12.2304755
- OSM:       lat=42.2089839, lon=12.286971, sim=1, name="Golf Nazionale"
- LC:        lat=42.211102, lon=12.283401, sim=1, name="Golf Nazionale"
- Consensus: lat=42.2100430, lon=12.2851860 (mean(osm,lc))
- DB → consensus:   5524m
- OSM ↔ LC agreement: 377m

```sql
UPDATE courses SET
  latitude = 42.2100430,
  longitude = 12.2851860
WHERE id IN (
  '1e95f1ea-3586-4133-9ad6-ca0b45ad2f43'
);
```

### Molinetto Country Club (1 courses)

- DB:        lat=45.5169745, lon=9.350991
- OSM:       lat=45.5166291, lon=9.3100824, sim=1, name="Molinetto Country Club"
- LC:        lat=45.516766, lon=9.311782, sim=1, name="Molinetto Country Club"
- Consensus: lat=45.5166976, lon=9.3109322 (mean(osm,lc))
- DB → consensus:   3121m
- OSM ↔ LC agreement: 133m

```sql
UPDATE courses SET
  latitude = 45.5166976,
  longitude = 9.3109322
WHERE id IN (
  '0d0d8cb8-3206-4935-969c-ff79eac93296'
);
```

### Tarquinia (1 courses)

- DB:        lat=42.2395922, lon=11.7271593
- OSM:       lat=42.255134, lon=11.7014475, sim=1, name="Tarquinia Country Club"
- LC:        lat=42.255306, lon=11.697418, sim=1, name="Tarquinia Country Club"
- Consensus: lat=42.2552200, lon=11.6994327 (mean(osm,lc))
- DB → consensus:   2868m
- OSM ↔ LC agreement: 332m

```sql
UPDATE courses SET
  latitude = 42.2552200,
  longitude = 11.6994327
WHERE id IN (
  '9bc7768d-4abe-41b9-bfff-fbd0fd202faf'
);
```

### Versilia Golf Club (2 courses)

- DB:        lat=43.9595891, lon=10.1699392
- OSM:       lat=43.9828935, lon=10.1715422, sim=1, name="Versilia Golf Club"
- LC:        lat=43.985916, lon=10.172916, sim=1, name="Versilia Golf Resort"
- Consensus: lat=43.9844048, lon=10.1722291 (mean(osm,lc))
- DB → consensus:   2765m
- OSM ↔ LC agreement: 354m

```sql
UPDATE courses SET
  latitude = 43.9844048,
  longitude = 10.1722291
WHERE id IN (
  '90ceed26-666c-4b3a-923c-64bfe3d49090',
  'd48a56ae-0370-4192-9b4e-1e2c9bcc8fd9'
);
```

### Marco Simone Golf & Country Club (2 courses)

- DB:        lat=41.9417766, lon=12.6445899
- OSM:       lat=41.9633362, lon=12.6356077, sim=1, name="Marco Simone Golf and Country Club"
- LC:        lat=41.960274, lon=12.634192, sim=1, name="Marco Simone Golf & Country Club"
- Consensus: lat=41.9618051, lon=12.6348999 (mean(osm,lc))
- DB → consensus:   2367m
- OSM ↔ LC agreement: 360m

```sql
UPDATE courses SET
  latitude = 41.9618051,
  longitude = 12.6348999
WHERE id IN (
  'b2edb22d-fdb2-41df-908f-cceec7a76f18',
  'd7f85202-7a56-46f7-874e-290940c3add4'
);
```

### Fioranello Golf Club (1 courses)

- DB:        lat=41.7613238, lon=12.5611043
- OSM:       lat=41.7751868, lon=12.5794465, sim=1, name="Fioranello Golf Club"
- LC:        lat=41.771816, lon=12.58058, sim=1, name="Fioranello Golf Club"
- Consensus: lat=41.7735014, lon=12.5800133 (mean(osm,lc))
- DB → consensus:   2072m
- OSM ↔ LC agreement: 386m

```sql
UPDATE courses SET
  latitude = 41.7735014,
  longitude = 12.5800133
WHERE id IN (
  '2df46827-8c57-4f67-bb56-59fe80d3f518'
);
```

### I Ciliegi Golf Club (1 courses)

- DB:        lat=45.0168826, lon=7.7499491
- OSM:       lat=45.0019547, lon=7.7557582, sim=1, name="Golf Club i Ciliegi"
- LC:        lat=45.002071, lon=7.759744, sim=1, name="Golf Club I Ciliegi"
- Consensus: lat=45.0020128, lon=7.7577511 (mean(osm,lc))
- DB → consensus:   1764m
- OSM ↔ LC agreement: 314m

```sql
UPDATE courses SET
  latitude = 45.0020128,
  longitude = 7.7577511
WHERE id IN (
  '72663bdb-85d3-4744-91b5-3fe060577e3f'
);
```

### Olgiata Golf Club (4 courses)

- DB:        lat=42.0252129, lon=12.3744241
- OSM:       lat=42.0383341, lon=12.3669433, sim=1, name="Olgiata Golf Club"
- LC:        lat=42.038681, lon=12.369361, sim=1, name="Olgiata Golf Club"
- Consensus: lat=42.0385075, lon=12.3681522 (mean(osm,lc))
- DB → consensus:   1566m
- OSM ↔ LC agreement: 203m

```sql
UPDATE courses SET
  latitude = 42.0385075,
  longitude = 12.3681522
WHERE id IN (
  '28657c0f-39ab-4ba4-ac2c-e1d539e58fc4',
  '2aaf6f14-526c-461c-b0d7-ac96da8843e2',
  'dabdeeb0-15da-4b0e-bc27-cb9046827e7d',
  'f30a5c9e-3b65-4e89-aac1-fa81800a8333'
);
```

### Golf Club Quarrata (1 courses)

- DB:        lat=43.8770604, lon=10.9970259
- OSM:       lat=43.8805343, lon=10.9786133, sim=1, name="Golf Club Quarrata"
- LC:        lat=43.882431, lon=10.980081, sim=1, name="Golf Club Quarrata"
- Consensus: lat=43.8814826, lon=10.9793471 (mean(osm,lc))
- DB → consensus:   1500m
- OSM ↔ LC agreement: 241m

```sql
UPDATE courses SET
  latitude = 43.8814826,
  longitude = 10.9793471
WHERE id IN (
  '1249b784-be69-4ef0-aaaa-0c327e9f8348'
);
```

### Golf club Salerno (1 courses)

- DB:        lat=40.5839556, lon=14.8839997
- OSM:       lat=40.5926292, lon=14.8770026, sim=1, name="Golf Club Salerno"
- LC:        lat=40.591251, lon=14.876129, sim=1, name="Golf Club Salerno"
- Consensus: lat=40.5919401, lon=14.8765658 (mean(osm,lc))
- DB → consensus:   1087m
- OSM ↔ LC agreement: 170m

```sql
UPDATE courses SET
  latitude = 40.5919401,
  longitude = 14.8765658
WHERE id IN (
  'c86a5656-b751-48ab-9476-b0a1d9931757'
);
```

### Ca Amata Golf Club (3 courses)

- DB:        lat=45.6871304, lon=11.9489962
- OSM:       lat=45.694757, lon=11.937917, sim=1, name="Golf Club Ca' Amata"
- LC:        lat=45.694099, lon=11.94201, sim=1, name="Golf Club Ca' Amata"
- Consensus: lat=45.6944280, lon=11.9399635 (mean(osm,lc))
- DB → consensus:   1073m
- OSM ↔ LC agreement: 326m

```sql
UPDATE courses SET
  latitude = 45.6944280,
  longitude = 11.9399635
WHERE id IN (
  '23322a86-c584-4255-b142-853b61514bc3',
  '4114b977-acff-4921-bf6b-2f145d2cf592',
  '87cbde47-68eb-4e7f-808b-f16e13a2e7ba'
);
```

## Medium confidence (review before applying)

### Golf Club Valdichiana (1 courses)

- DB:        lat=43.2121236, lon=11.7364829
- OSM:       lat=43.2194151, lon=11.8204874, sim=1, name="Golf Club Valdichiana"
- LC:        lat=43.220379, lon=11.818276, sim=0.818, name="Golf Club Val di Chiana"
- Consensus: lat=43.2198971, lon=11.8193817 (mean(osm,lc))
- DB → consensus:   6773m
- OSM ↔ LC agreement: 209m

```sql
UPDATE courses SET
  latitude = 43.2198971,
  longitude = 11.8193817
WHERE id IN (
  '83afa559-2e3f-449c-bdc4-dfd6d8eabf6d'
);
```

### Golf Club Cervino (1 courses)

- DB:        lat=45.8769793, lon=7.622792
- OSM:       lat=45.930134, lon=7.6213156, sim=1, name="Golf Club del Cervino"
- LC:        lat=45.934364, lon=7.629275, sim=1, name="Golf Club Del Cervino"
- Consensus: lat=45.9322490, lon=7.6252953 (mean(osm,lc))
- DB → consensus:   6149m
- OSM ↔ LC agreement: 775m

```sql
UPDATE courses SET
  latitude = 45.9322490,
  longitude = 7.6252953
WHERE id IN (
  'cae6c915-306a-4ebf-b6ec-23e5e77560ea'
);
```

### Ugolino Golf Club (1 courses)

- DB:        lat=43.7287475, lon=11.2955063
- OSM:       lat=43.6978458, lon=11.2957036, sim=0.583, name="Golf dell'Ugolino"
- LC:        lat=43.697044, lon=11.296606, sim=1, name="Circolo Golf Ugolino"
- Consensus: lat=43.6974449, lon=11.2961548 (mean(osm,lc))
- DB → consensus:   3481m
- OSM ↔ LC agreement: 115m

```sql
UPDATE courses SET
  latitude = 43.6974449,
  longitude = 11.2961548
WHERE id IN (
  '0c398b53-10b1-41ef-b78b-9e38d0952189'
);
```

### I Girasoli Golf Club (1 courses)

- DB:        lat=44.8532723, lon=7.7737163
- OSM:       lat=44.8613824, lon=7.8149318, sim=1, name="Golf Club I Girasoli"
- LC:        lat=44.857327, lon=7.818123, sim=1, name="Golf Club I Girasoli"
- Consensus: lat=44.8593547, lon=7.8165274 (mean(osm,lc))
- DB → consensus:   3442m
- OSM ↔ LC agreement: 516m

```sql
UPDATE courses SET
  latitude = 44.8593547,
  longitude = 7.8165274
WHERE id IN (
  'b30e0c07-c4fa-413f-a5ef-9d28763dcf5d'
);
```

### Torre dei Ronchi (1 courses)

- DB:        lat=44.4580704, lon=7.5581367
- OSM:       lat=44.4399009, lon=7.5819, sim=1, name="Torre dei Ronchi Golf Club"
- LC:        lat=44.434029, lon=7.587705, sim=1, name="Torre Dei Ronchi Golf Club Asd"
- Consensus: lat=44.4369650, lon=7.5848025 (mean(osm,lc))
- DB → consensus:   3160m
- OSM ↔ LC agreement: 799m

```sql
UPDATE courses SET
  latitude = 44.4369650,
  longitude = 7.5848025
WHERE id IN (
  'c25fa691-b001-45c8-8dee-1597e881ddaf'
);
```

### Golf Club Punta Ala (1 courses)

- DB:        lat=42.8012564, lon=10.75113
- OSM:       lat=42.8018837, lon=10.7711937, sim=0.75, name="Punta Ala GC"
- LC:        lat=42.799259, lon=10.772846, sim=1, name="Golf Club Punta Ala"
- Consensus: lat=42.8005713, lon=10.7720198 (mean(osm,lc))
- DB → consensus:   1706m
- OSM ↔ LC agreement: 321m

```sql
UPDATE courses SET
  latitude = 42.8005713,
  longitude = 10.7720198
WHERE id IN (
  'eac1b559-a38d-4fb5-aa1c-f5f4b88c64cc'
);
```

### Is Arenas Golf & Country Club (1 courses)

- DB:        lat=40.0570481, lon=8.4707501
- OSM:       lat=40.0504538, lon=8.4843485, sim=1, name="Golf Club Is Arenas"
- LC:        lat=40.046146, lon=8.486509, sim=1, name="Is Arenas Golf & Country Club"
- Consensus: lat=40.0482999, lon=8.4854288 (mean(osm,lc))
- DB → consensus:   1583m
- OSM ↔ LC agreement: 513m

```sql
UPDATE courses SET
  latitude = 40.0482999,
  longitude = 8.4854288
WHERE id IN (
  '80e03896-b799-4dcb-8eb9-bca321a8f975'
);
```

### Golf Club Grado (1 courses)

- DB:        lat=45.7055341, lon=13.4633207
- OSM:       lat=45.7022429, lon=13.4531843, sim=1, name="Golf Club Grado"
- LC:        lat=45.694073, lon=13.450303, sim=1, name="Golf Club Grado"
- Consensus: lat=45.6981580, lon=13.4517437 (mean(osm,lc))
- DB → consensus:   1217m
- OSM ↔ LC agreement: 936m

```sql
UPDATE courses SET
  latitude = 45.6981580,
  longitude = 13.4517437
WHERE id IN (
  'cb485dc3-0500-427a-be87-43a421681d4e'
);
```

### Golf Continental Verbania (3 courses)

- DB:        lat=45.9456753, lon=8.4892373
- OSM:       lat=45.9468665, lon=8.4755968, sim=0.6, name="Golf & Sporting Club Verbania"
- LC:        lat=45.948002, lon=8.475395, sim=1, name="Golf Continental Verbania"
- Consensus: lat=45.9474343, lon=8.4754959 (mean(osm,lc))
- DB → consensus:   1080m
- OSM ↔ LC agreement: 127m

```sql
UPDATE courses SET
  latitude = 45.9474343,
  longitude = 8.4754959
WHERE id IN (
  '0ba0067b-b792-40a6-9d3d-0382f1251192',
  '5a599c72-27be-4184-879c-d73402374790',
  'bc9fac7d-e342-456e-b4f8-50afe6eb1437'
);
```

## Low confidence (manual decision)

### virginia golf club (1 courses)

- DB:        lat=53.8340832, lon=-7.0937717
- OSM:       lat=43.6213135, lon=10.2998894, sim=0.625, name="Golf Club Tirrenia"
- LC:        lat=45.732635, lon=8.966534, sim=1, name="Virginia Golf"
- Consensus: lat=44.6769743, lon=9.6332117 (mean(osm,lc))
- DB → consensus:   1577548m
- OSM ↔ LC agreement: 257344m

```sql
UPDATE courses SET
  latitude = 44.6769743,
  longitude = 9.6332117
WHERE id IN (
  '869d1082-73ec-4e7a-92f3-d64ce1860c86'
);
```

### Le Saie Golf Club (1 courses)

- DB:        lat=45.1230122, lon=7.7775114
- OSM:       lat=40.5926292, lon=14.8770026, sim=0.429, name="Golf Club Salerno"
- LC:        lat=37.344933, lon=15.086546, sim=1, name="Le Saie Golf Club"
- Consensus: lat=38.9687811, lon=14.9817743 (mean(osm,lc))
- DB → consensus:   905982m
- OSM ↔ LC agreement: 361581m

```sql
UPDATE courses SET
  latitude = 38.9687811,
  longitude = 14.9817743
WHERE id IN (
  'fbf0b688-8cb9-4cd2-abe1-348bb2044f64'
);
```

### Sant'Arnica (1 courses)

- DB:        lat=37.3684522, lon=15.0770171
- OSM:       lat=44.4028279, lon=8.638901, sim=0.727, name="Golf Sant'Anna"
- LC:        lat=40.875786, lon=17.398825, sim=0.5, name="San Domenico Golf"
- Consensus: lat=42.6393069, lon=13.0188630 (mean(osm,lc))
- DB → consensus:   611692m
- OSM ↔ LC agreement: 816224m

```sql
UPDATE courses SET
  latitude = 42.6393069,
  longitude = 13.0188630
WHERE id IN (
  'db482dc5-c5ec-42ec-a636-e1c1c8835e70'
);
```

### Donnafugata Golf (2 courses)

- DB:        lat=36.8711246, lon=14.4825213
- OSM:       lat=46.0459798, lon=11.4173464, sim=0.444, name="Golf Club Roncegno - Valsugana Golf"
- LC:        lat=36.870205, lon=14.488751, sim=1, name="Donnafugata Golf Resort & Spa"
- Consensus: lat=41.4580924, lon=12.9530487 (mean(osm,lc))
- DB → consensus:   526790m
- OSM ↔ LC agreement: 1051688m

```sql
UPDATE courses SET
  latitude = 41.4580924,
  longitude = 12.9530487
WHERE id IN (
  '4fb58759-3dab-4639-b584-ba6c7beb5e25',
  'd1915f4d-55a8-40ac-85aa-55240b844232'
);
```

### golf club madesimo (1 courses)

- DB:        lat=46.4483242, lon=9.3644014
- OSM:       lat=46.4422476, lon=9.3644401, sim=1, name="Golf Club Madesimo"
- LC:        lat=37.93029, lon=13.8912, sim=0.5, name="Le Madonie Golf Club"
- Consensus: lat=42.1862688, lon=11.6278201 (mean(osm,lc))
- DB → consensus:   506918m
- OSM ↔ LC agreement: 1016868m

```sql
UPDATE courses SET
  latitude = 42.1862688,
  longitude = 11.6278201
WHERE id IN (
  '6675ec8d-5bcb-458a-a666-4ee9c3d23fa1'
);
```

### Ita Donnafugata (2 courses)

- DB:        lat=36.8798936, lon=14.5668227
- OSM:       lat=45.694757, lon=11.937917, sim=0.4, name="Golf Club Ca' Amata"
- LC:        lat=36.870205, lon=14.488751, sim=0.733, name="Donnafugata Golf Resort & Spa"
- Consensus: lat=41.2824810, lon=13.2133340 (mean(osm,lc))
- DB → consensus:   503272m
- OSM ↔ LC agreement: 1003978m

```sql
UPDATE courses SET
  latitude = 41.2824810,
  longitude = 13.2133340
WHERE id IN (
  '6708879d-00cb-4e68-be1e-986b5d9cc1e7',
  '8237ec9c-9c24-464c-8cb8-1aa02346c33b'
);
```

### Feudo Montalto Golf Club (1 courses)

- DB:        lat=44.95554, lon=8.1278108
- OSM:       lat=44.9554796, lon=8.1285381, sim=0.357, name="Golf Club Feudo"
- LC:        lat=38.557404, lon=15.965386, sim=1, name="Feudo Montalto Golf Club"
- Consensus: lat=41.7564418, lon=12.0469621 (mean(osm,lc))
- DB → consensus:   476264m
- OSM ↔ LC agreement: 962775m

```sql
UPDATE courses SET
  latitude = 41.7564418,
  longitude = 12.0469621
WHERE id IN (
  '4e18b0f8-1cd7-4cc8-8c9c-4803f1376b3a'
);
```

### Musella Golf (1 courses)

- DB:        lat=45.4233324, lon=11.093442
- OSM:       lat=43.857851, lon=7.8776193, sim=0.5, name="Castellaro Golf Resort"
- LC:        lat=null, lon=null, sim=1, name="Golf Musella"
- Consensus: lat=43.8578510, lon=7.8776193 (osm)
- DB → consensus:   308241m

```sql
UPDATE courses SET
  latitude = 43.8578510,
  longitude = 7.8776193
WHERE id IN (
  '6063b27f-b1cb-4a82-a44b-e45d400d061f'
);
```

### Varvarusa Golf Club (1 courses)

- DB:        lat=41.545332, lon=14.0561754
- OSM:       lat=41.5351187, lon=14.07612, sim=1, name="Varvarusa Golf Club"
- LC:        lat=44.940014, lon=8.412867, sim=0.556, name="Golf Club Margara"
- Consensus: lat=43.2375663, lon=11.2444935 (mean(osm,lc))
- DB → consensus:   297836m
- OSM ↔ LC agreement: 594562m

```sql
UPDATE courses SET
  latitude = 43.2375663,
  longitude = 11.2444935
WHERE id IN (
  'aa795a11-f795-4ba2-9160-e6120dfa5f66'
);
```

### Oasi Golf Club (2 courses)

- DB:        lat=45.5539628, lon=9.1775419
- OSM:       lat=45.5539045, lon=9.1774854, sim=0.154, name="Golf su Pista - Oasi del Divertimento"
- LC:        lat=41.552471, lon=12.632539, sim=1, name="Oasi Golf Club"
- Consensus: lat=43.5531877, lon=10.9050122 (mean(osm,lc))
- DB → consensus:   261196m
- OSM ↔ LC agreement: 524754m

```sql
UPDATE courses SET
  latitude = 43.5531877,
  longitude = 10.9050122
WHERE id IN (
  '27ce69fe-8c37-4e6d-a955-20d2c951e4f9',
  'a7ba36dc-6fdf-474e-b80c-8f503a046d70'
);
```

### Parco dei Colli (1 courses)

- DB:        lat=45.7566557, lon=9.7542192
- OSM:       lat=45.6987167, lon=9.6254906, sim=1, name="Golf Club Parco Dei Colli"
- LC:        lat=41.966766, lon=12.473345, sim=0.636, name="Parco di Roma Golf Club"
- Consensus: lat=43.8327413, lon=11.0494178 (mean(osm,lc))
- DB → consensus:   237080m
- OSM ↔ LC agreement: 473614m

```sql
UPDATE courses SET
  latitude = 43.8327413,
  longitude = 11.0494178
WHERE id IN (
  'c8ccf7bd-1298-4c17-a8a3-56d16812ce8a'
);
```

### MAREMMELLO (1 courses)

- DB:        lat=42.5960283, lon=11.2234774
- OSM:       lat=46.7616208, lon=12.0344189, sim=0.5, name="Golf Club Mirabell"
- LC:        lat=42.565723, lon=11.176765, sim=1, name="Maremmello Circolo Golf"
- Consensus: lat=44.6636719, lon=11.6055920 (mean(osm,lc))
- DB → consensus:   231958m
- OSM ↔ LC agreement: 471459m

```sql
UPDATE courses SET
  latitude = 44.6636719,
  longitude = 11.6055920
WHERE id IN (
  'd125b205-d035-42ee-9f2c-5c2941507b8c'
);
```

### Golf Club Sappada (1 courses)

- DB:        lat=46.5613723, lon=12.6846799
- OSM:       lat=46.5634727, lon=12.6821397, sim=1, name="Golf Club Sappada"
- LC:        lat=43.422592, lon=11.142018, sim=0.444, name="Circolo Golf L'Abbadia"
- Consensus: lat=44.9930324, lon=11.9120789 (mean(osm,lc))
- DB → consensus:   184395m
- OSM ↔ LC agreement: 369632m

```sql
UPDATE courses SET
  latitude = 44.9930324,
  longitude = 11.9120789
WHERE id IN (
  'ee61ae36-3bad-47a5-a01b-9046c3e60159'
);
```

### Piacenza golf (1 courses)

- DB:        lat=44.8476352, lon=9.6665313
- OSM:       lat=45.5377443, lon=11.479346, sim=0.75, name="Golf Club Vicenza"
- LC:        lat=45.535351, lon=11.482584, sim=0.75, name="Golf Club Vicenza"
- Consensus: lat=45.5365477, lon=11.4809650 (mean(osm,lc))
- DB → consensus:   161501m
- OSM ↔ LC agreement: 367m

```sql
UPDATE courses SET
  latitude = 45.5365477,
  longitude = 11.4809650
WHERE id IN (
  '34186404-2777-4690-b7ae-0a5e724e277b'
);
```

### Grugliasco Circolo Golf (1 courses)

- DB:        lat=45.0568746, lon=7.5901073
- OSM:       lat=45.0550417, lon=7.6001933, sim=1, name="Circolo Golf Grugliasco"
- LC:        lat=45.663395, lon=10.637468, sim=0.6, name="Golf Bogliaco"
- Consensus: lat=45.3592183, lon=9.1188306 (mean(osm,lc))
- DB → consensus:   124388m
- OSM ↔ LC agreement: 246744m

```sql
UPDATE courses SET
  latitude = 45.3592183,
  longitude = 9.1188306
WHERE id IN (
  '1fb7f4b6-82ab-4f78-b770-19d9751b0c35'
);
```

### Golf il Torrazzo (2 courses)

- DB:        lat=45.1639603, lon=9.9835217
- OSM:       lat=45.1638816, lon=9.9839459, sim=0.727, name="Golf II Torrazzo"
- LC:        lat=43.418503, lon=11.821335, sim=0.5, name="Arezzo Golf Club"
- Consensus: lat=44.2911923, lon=10.9026404 (mean(osm,lc))
- DB → consensus:   121202m
- OSM ↔ LC agreement: 242994m

```sql
UPDATE courses SET
  latitude = 44.2911923,
  longitude = 10.9026404
WHERE id IN (
  '3af6b8f9-1880-487d-baaa-454780d81d42',
  '83a81db7-3cc8-4108-99d0-29a8e6df09fa'
);
```

### Abano Golf (1 courses)

- DB:        lat=45.3652399, lon=11.7959957
- OSM:       lat=45.3643799, lon=11.7961242, sim=1, name="Abano Golf"
- LC:        lat=45.331402, lon=9.007148, sim=0.5, name="Golf Club Ambrosiano"
- Consensus: lat=45.3478910, lon=10.4016361 (mean(osm,lc))
- DB → consensus:   108965m
- OSM ↔ LC agreement: 217972m

```sql
UPDATE courses SET
  latitude = 45.3478910,
  longitude = 10.4016361
WHERE id IN (
  '5676149c-fc49-4979-8096-75798a9266b8'
);
```

### IS ARENAS 2 (1 courses)

- DB:        lat=39.2169182, lon=9.1570681
- OSM:       lat=40.0504538, lon=8.4843485, sim=0.818, name="Golf Club Is Arenas"
- LC:        lat=40.046146, lon=8.486509, sim=0.818, name="Is Arenas Golf & Country Club"
- Consensus: lat=40.0482999, lon=8.4854288 (mean(osm,lc))
- DB → consensus:   108877m
- OSM ↔ LC agreement: 513m

```sql
UPDATE courses SET
  latitude = 40.0482999,
  longitude = 8.4854288
WHERE id IN (
  'ccdd390c-ec9b-4f78-b06d-92a308c0a6fa'
);
```

### Oasi di Magliano - I Fiordalisi Golf Club (1 courses)

- DB:        lat=44.1726429, lon=12.0776113
- OSM:       lat=46.0638694, lon=11.6054781, sim=0.346, name="Tesino Golf Club La Farfalla"
- LC:        lat=44.170609, lon=12.087772, sim=1, name="Oasi di Magliano- I Fiordalisi Golf  Club"
- Consensus: lat=45.1172392, lon=11.8466251 (mean(osm,lc))
- DB → consensus:   106612m
- OSM ↔ LC agreement: 213894m

```sql
UPDATE courses SET
  latitude = 45.1172392,
  longitude = 11.8466251
WHERE id IN (
  '9852ae0e-3cdf-4926-8f82-0f2709480835'
);
```

### Campodoglio Golf Club (1 courses)

- DB:        lat=45.538097, lon=9.8971571
- OSM:       lat=46.0645317, lon=12.4100202, sim=0.545, name="Golf Club Cansiglio"
- LC:        lat=45.552433, lon=9.875562, sim=1, name="Campodoglio Golf"
- Consensus: lat=45.8084824, lon=11.1427911 (mean(osm,lc))
- DB → consensus:   101344m
- OSM ↔ LC agreement: 204520m

```sql
UPDATE courses SET
  latitude = 45.8084824,
  longitude = 11.1427911
WHERE id IN (
  '34625263-6e2b-4e1e-ba95-22a52d8a9c3b'
);
```

### Menaggio & Cadenabbia Golf Club (1 courses)

- DB:        lat=46.0228472, lon=9.2135561
- OSM:       lat=44.6627997, lon=10.726507, sim=0.474, name="Reggio Emilia Golf Club"
- LC:        lat=46.01749, lon=9.218323, sim=1, name="Menaggio & Cadenabbia Golf Club"
- Consensus: lat=45.3401449, lon=9.9724150 (mean(osm,lc))
- DB → consensus:   96115m
- OSM ↔ LC agreement: 191266m

```sql
UPDATE courses SET
  latitude = 45.3401449,
  longitude = 9.9724150
WHERE id IN (
  '2dea2ef7-fa1b-43e1-b0cb-43d123bab429'
);
```

### USD Golf Club Santa Maria Maggiore (2 courses)

- DB:        lat=46.1350542, lon=8.4666225
- OSM:       lat=46.1299782, lon=8.4515883, sim=0.833, name="Golf Santa Maria Maggiore"
- LC:        lat=44.807888, lon=9.961989, sim=0.417, name="Salsomaggiore Golf"
- Consensus: lat=45.4689331, lon=9.2067887 (mean(osm,lc))
- DB → consensus:   93692m
- OSM ↔ LC agreement: 188365m

```sql
UPDATE courses SET
  latitude = 45.4689331,
  longitude = 9.2067887
WHERE id IN (
  '36dc2b2b-dedd-44c9-82ec-54e832792c34',
  'bdca7bae-f331-4fe1-8f63-5b4f8a0a750c'
);
```

### Break Point Golf Club (1 courses)

- DB:        lat=46.0713875, lon=11.2218966
- OSM:       lat=46.0702229, lon=11.2273478, sim=1, name="Break Point Golf Club ASD"
- LC:        lat=45.563522, lon=9.036469, sim=0.462, name="Green Club Lainate"
- Consensus: lat=45.8168724, lon=10.1319084 (mean(osm,lc))
- DB → consensus:   88902m
- OSM ↔ LC agreement: 178885m

```sql
UPDATE courses SET
  latitude = 45.8168724,
  longitude = 10.1319084
WHERE id IN (
  '6ea23f98-0495-4fc4-8cfe-2797d5c30188'
);
```

### Buena Vista Social Golf (1 courses)

- DB:        lat=45.774281, lon=9.2130426
- OSM:       lat=45.7759592, lon=9.215464, sim=1, name="Buena Vista Social Golf"
- LC:        lat=44.707699, lon=10.22634, sim=0.389, name="Golf del Ducato - La Rocca"
- Consensus: lat=45.2418291, lon=9.7209020 (mean(osm,lc))
- DB → consensus:   71215m
- OSM ↔ LC agreement: 142734m

```sql
UPDATE courses SET
  latitude = 45.2418291,
  longitude = 9.7209020
WHERE id IN (
  '01a21fa2-0b46-4665-b36d-7c502431d8df'
);
```

### Il Laghetto (1 courses)

- DB:        lat=45.437205, lon=9.323172
- OSM:       lat=45.4434457, lon=9.3170083, sim=0.875, name="Golf Club Il Lagetto"
- LC:        lat=44.857037, lon=7.819132, sim=0.5, name="Golf Club La Margherita"
- Consensus: lat=45.1502414, lon=8.5680702 (mean(osm,lc))
- DB → consensus:   67134m
- OSM ↔ LC agreement: 134345m

```sql
UPDATE courses SET
  latitude = 45.1502414,
  longitude = 8.5680702
WHERE id IN (
  'fbfd251c-0372-4795-a766-50e68e8c4f38'
);
```

### Golf Club San Vito (1 courses)

- DB:        lat=45.416489, lon=9.0131142
- OSM:       lat=45.4134406, lon=9.0151758, sim=1, name="Golf Club San Vito"
- LC:        lat=45.40871, lon=10.595609, sim=0.636, name="Golf Club San Vigilio"
- Consensus: lat=45.4110753, lon=9.8053924 (mean(osm,lc))
- DB → consensus:   61845m
- OSM ↔ LC agreement: 123369m

```sql
UPDATE courses SET
  latitude = 45.4110753,
  longitude = 9.8053924
WHERE id IN (
  '447abfd2-e254-45ef-aa98-48d9af82543b'
);
```

### Golf Le Primule (1 courses)

- DB:        lat=45.2710604, lon=7.9549735
- OSM:       lat=45.2710604, lon=7.9549735, sim=1, name="Golf Le Primule"
- LC:        lat=45.704815, lon=9.1167, sim=0.5, name="Golf Club Carimate"
- Consensus: lat=45.4879377, lon=8.5358367 (mean(osm,lc))
- DB → consensus:   51379m
- OSM ↔ LC agreement: 102603m

```sql
UPDATE courses SET
  latitude = 45.4879377,
  longitude = 8.5358367
WHERE id IN (
  '50ac7d20-a98e-4aaa-ad63-f6793be75365'
);
```

### Reggio Emilia (1 courses)

- DB:        lat=44.6086674, lon=10.5940667
- OSM:       lat=44.6627997, lon=10.726507, sim=1, name="Reggio Emilia Golf Club"
- LC:        lat=43.996223, lon=11.331303, sim=0.538, name="Poggio dei Medici Golf & Country Club"
- Consensus: lat=44.3295114, lon=11.0289050 (mean(osm,lc))
- DB → consensus:   46413m
- OSM ↔ LC agreement: 88362m

```sql
UPDATE courses SET
  latitude = 44.3295114,
  longitude = 11.0289050
WHERE id IN (
  '3bbba59f-6866-4779-9e6d-aa568d6c7f71'
);
```

### Reggio Emilia Golf (1 courses)

- DB:        lat=44.6627783, lon=10.7270362
- OSM:       lat=44.6627997, lon=10.726507, sim=1, name="Reggio Emilia Golf Club"
- LC:        lat=43.996223, lon=11.331303, sim=0.538, name="Poggio dei Medici Golf & Country Club"
- Consensus: lat=44.3295114, lon=11.0289050 (mean(osm,lc))
- DB → consensus:   44119m
- OSM ↔ LC agreement: 88362m

```sql
UPDATE courses SET
  latitude = 44.3295114,
  longitude = 11.0289050
WHERE id IN (
  '99612c4c-90fe-47ca-81c4-a025b162f99b'
);
```

### GC Savigliano (1 courses)

- DB:        lat=44.6543346, lon=7.7036055
- OSM:       lat=44.6044551, lon=7.6254169, sim=0.769, name="Golf Club di Savigliano"
- LC:        lat=45.389057, lon=8.129765, sim=0.538, name="Golf Club Cavaglià"
- Consensus: lat=44.9967561, lon=7.8775910 (mean(osm,lc))
- DB → consensus:   40472m
- OSM ↔ LC agreement: 95834m

```sql
UPDATE courses SET
  latitude = 44.9967561,
  longitude = 7.8775910
WHERE id IN (
  'f5179655-efdd-4460-8684-8a7c9da732b6'
);
```

### Le madonie (1 courses)

- DB:        lat=37.853282, lon=14.1520766
- OSM:       lat=37.9775134, lon=13.8727034, sim=1, name="Le Madonie Golf"
- LC:        lat=37.93029, lon=13.8912, sim=1, name="Le Madonie Golf Club"
- Consensus: lat=37.9539017, lon=13.8819517 (mean(osm,lc))
- DB → consensus:   26208m
- OSM ↔ LC agreement: 5496m

```sql
UPDATE courses SET
  latitude = 37.9539017,
  longitude = 13.8819517
WHERE id IN (
  '6245dab7-a27f-4e6e-a7f0-1f741ea338f4'
);
```

### GOLF FEUDO DI ASTI (1 courses)

- DB:        lat=44.8260127, lon=8.2026863
- OSM:       lat=44.9554796, lon=8.1285381, sim=0.5, name="Golf Club Feudo"
- LC:        lat=44.971462, lon=8.14162, sim=0.833, name="Golf Feudo D'Asti"
- Consensus: lat=44.9634708, lon=8.1350790 (mean(osm,lc))
- DB → consensus:   16186m
- OSM ↔ LC agreement: 2054m

```sql
UPDATE courses SET
  latitude = 44.9634708,
  longitude = 8.1350790
WHERE id IN (
  '9b8bedff-898d-4671-afce-734472106126'
);
```

### Grado24 (1 courses)

- DB:        lat=45.6384551, lon=13.6005982
- OSM:       lat=45.7022429, lon=13.4531843, sim=0.714, name="Golf Club Grado"
- LC:        lat=45.694073, lon=13.450303, sim=0.714, name="Golf Club Grado"
- Consensus: lat=45.6981580, lon=13.4517437 (mean(osm,lc))
- DB → consensus:   13336m
- OSM ↔ LC agreement: 936m

```sql
UPDATE courses SET
  latitude = 45.6981580,
  longitude = 13.4517437
WHERE id IN (
  '93a831f0-bf0e-497a-8780-59239b2374d5'
);
```

### Arona (5 courses)

- DB:        lat=45.7094197, lon=8.5808962
- OSM:       lat=45.7085103, lon=8.595101, sim=1, name="Arona Golf Club"
- LC:        lat=45.548512, lon=8.515079, sim=1, name="Arona Golf Club"
- Consensus: lat=45.6285112, lon=8.5550900 (mean(osm,lc))
- DB → consensus:   9217m
- OSM ↔ LC agreement: 18848m

```sql
UPDATE courses SET
  latitude = 45.6285112,
  longitude = 8.5550900
WHERE id IN (
  '07366e1d-ba1d-4489-b32e-c107edd4559d',
  '43d3bcaf-d71a-4655-a966-c3a67d077095',
  'befa1b1c-05bb-4db8-946a-c79e1ead1dff',
  'ee6efb55-e908-4eb9-99b5-3e2e5f8de3b4',
  'f6dd102b-790f-4377-a83d-f100082134de'
);
```

### Golf Borgo di Camuzzago (2 courses)

- DB:        lat=45.6073525, lon=9.4255261
- OSM:       lat=45.6100333, lon=9.429173, sim=0.682, name="Antico Borgo Camuzzago Golf Club"
- LC:        lat=45.631058, lon=9.466162, sim=1, name="Golf borgo di Camuzzago"
- Consensus: lat=45.6205456, lon=9.4476675 (mean(osm,lc))
- DB → consensus:   2262m
- OSM ↔ LC agreement: 3707m

```sql
UPDATE courses SET
  latitude = 45.6205456,
  longitude = 9.4476675
WHERE id IN (
  '15971294-98f8-4582-a6f0-dcd15f40da44',
  '3c2bbbad-1295-4190-90ef-6f6a3f18d65b'
);
```

### Folgaria (1 courses)

- DB:        lat=45.9170363, lon=11.1670014
- OSM:       lat=45.915628, lon=11.2010157, sim=1, name="Club Golf Folgaria"
- LC:        lat=45.920887, lon=11.187737, sim=1, name="Golf Club Folgaria"
- Consensus: lat=45.9182575, lon=11.1943763 (mean(osm,lc))
- DB → consensus:   2122m
- OSM ↔ LC agreement: 1182m

```sql
UPDATE courses SET
  latitude = 45.9182575,
  longitude = 11.1943763
WHERE id IN (
  '5c542b80-aa5a-4ca3-9c34-533bbc9d7780'
);
```

### Bormio golf club (1 courses)

- DB:        lat=46.4692482, lon=10.3721712
- OSM:       lat=46.4729404, lon=10.362557, sim=1, name="Bormio Golf club"
- LC:        lat=46.498058, lon=10.389747, sim=1, name="Golf Club Bormio"
- Consensus: lat=46.4854992, lon=10.3761520 (mean(osm,lc))
- DB → consensus:   1833m
- OSM ↔ LC agreement: 3483m

```sql
UPDATE courses SET
  latitude = 46.4854992,
  longitude = 10.3761520
WHERE id IN (
  '649f9536-f850-4c2a-851e-fdbcb066973f'
);
```

### Antognolla Golf (1 courses)

- DB:        lat=43.2239714, lon=12.3277329
- OSM:       lat=43.2308247, lon=12.3390653, sim=1, name="Antognolla Golf"
- LC:        lat=43.194996, lon=12.329208, sim=1, name="Antognolla Golf Club"
- Consensus: lat=43.2129104, lon=12.3341366 (mean(osm,lc))
- DB → consensus:   1335m
- OSM ↔ LC agreement: 4063m

```sql
UPDATE courses SET
  latitude = 43.2129104,
  longitude = 12.3341366
WHERE id IN (
  '06f2db80-a3fb-4a0c-aa42-0050ba85cb1b'
);
```

### Golf Club Villa Carolina (3 courses)

- DB:        lat=44.7072207, lon=8.6983454
- OSM:       lat=44.7072381, lon=8.699825, sim=1, name="Golf Club Villa Carolina"
- LC:        lat=44.72765, lon=8.685722, sim=1, name="Golf Club Villa Carolina"
- Consensus: lat=44.7174440, lon=8.6927735 (mean(osm,lc))
- DB → consensus:   1219m
- OSM ↔ LC agreement: 2528m

```sql
UPDATE courses SET
  latitude = 44.7174440,
  longitude = 8.6927735
WHERE id IN (
  '1d5307b8-da31-411e-a32b-c5518cc87d83',
  '79d5ef3f-a632-4d8c-aece-d47ed49b86d4',
  'f5598064-cdfe-45d1-87e5-517536a6bd56'
);
```

### Golf Club Parco De Medici Roma (9 courses)

- DB:        lat=41.8134125, lon=12.4091793
- OSM:       lat=41.8157794, lon=12.4088157, sim=0.333, name="Sheraton Golf Club Parco de' Medici"
- LC:        lat=41.811539, lon=12.380755, sim=0.706, name="Parco De' Medici Golf Club"
- Consensus: lat=41.8136592, lon=12.3947853 (mean(osm,lc))
- DB → consensus:   1193m
- OSM ↔ LC agreement: 2373m

```sql
UPDATE courses SET
  latitude = 41.8136592,
  longitude = 12.3947853
WHERE id IN (
  '0ad28522-ea0d-48f9-bf2b-c06d4f64152c',
  '219bd4ce-d01f-43c0-a4b4-e44d96355c27',
  '8b93e7e7-ef06-4c58-b948-e156f978de2a',
  '98e01cca-50c1-46d7-b7f1-b53b8731b744',
  'b859c2cb-bcbe-4545-9ca6-20f6927bdb51',
  'bc06a660-0c7e-42d6-942f-da43b443b51d',
  'd0ccf2f8-1b58-49ba-9a57-f5bc3ed3dc02',
  'e9c3271a-98b8-48e8-8c29-0af29c661940',
  'ffbde310-8972-48c6-b98f-a04c8434edcd'
);
```

### Valtellina Golf Club Spa (2 courses)

- DB:        lat=46.1534801, lon=9.8147989
- OSM:       lat=46.1554175, lon=9.7908219, sim=1, name="Valtellina Golf Club"
- LC:        lat=46.167614, lon=9.851904, sim=1, name="Valtellina Golf Club"
- Consensus: lat=46.1615157, lon=9.8213629 (mean(osm,lc))
- DB → consensus:   1027m
- OSM ↔ LC agreement: 4896m

```sql
UPDATE courses SET
  latitude = 46.1615157,
  longitude = 9.8213629
WHERE id IN (
  '5242fa70-fe61-41f5-9b5e-6f5e66748fc9',
  '531a3923-ba97-4675-9c26-5af32fa28135'
);
```

### Le Fronde Golf Club (1 courses)

- DB:        lat=45.0760512, lon=7.4018926
- OSM:       lat=45.0696802, lon=7.4130611, sim=1, name="Golf Club Le Fronde"
- LC:        lat=45.072529, lon=7.411392, sim=1, name="Le Fronde Golf Club"
- Consensus: lat=45.0711046, lon=7.4122265 (mean(osm,lc))
- DB → consensus:   980m
- OSM ↔ LC agreement: 343m

```sql
UPDATE courses SET
  latitude = 45.0711046,
  longitude = 7.4122265
WHERE id IN (
  '1c66e1e3-ac76-402e-beb5-ab4a7a0a96a0'
);
```

### Serravalle Golf Club (1 courses)

- DB:        lat=44.7270073, lon=8.848624
- OSM:       lat=44.7253918, lon=8.8350176, sim=0.1, name="La Bollina Golf Club"
- LC:        lat=44.723335, lon=8.838603, sim=1, name="Serravalle Golf Club"
- Consensus: lat=44.7243634, lon=8.8368103 (mean(osm,lc))
- DB → consensus:   979m
- OSM ↔ LC agreement: 364m

```sql
UPDATE courses SET
  latitude = 44.7243634,
  longitude = 8.8368103
WHERE id IN (
  'c73d1ad5-62bc-498a-a9fb-63f62fd1f773'
);
```

### Tanka Golf Villasimius (1 courses)

- DB:        lat=39.1326416, lon=9.5145269
- OSM:       lat=39.1324265, lon=9.5145684, sim=0.294, name="Tanka Golf Club"
- LC:        lat=39.149288, lon=9.511733, sim=1, name="Tanka Golf Villasimius"
- Consensus: lat=39.1408572, lon=9.5131507 (mean(osm,lc))
- DB → consensus:   921m
- OSM ↔ LC agreement: 1891m

```sql
UPDATE courses SET
  latitude = 39.1408572,
  longitude = 9.5131507
WHERE id IN (
  'bcfbaa67-502d-4a85-a86b-f904297d96fa'
);
```

### Royal Park I Roveri (2 courses)

- DB:        lat=45.1885339, lon=7.5644047
- OSM:       lat=45.1882714, lon=7.5567889, sim=0.421, name="I Roveri"
- LC:        lat=45.186256, lon=7.549925, sim=1, name="Royal Park I Roveri"
- Consensus: lat=45.1872637, lon=7.5533569 (mean(osm,lc))
- DB → consensus:   877m
- OSM ↔ LC agreement: 583m

```sql
UPDATE courses SET
  latitude = 45.1872637,
  longitude = 7.5533569
WHERE id IN (
  '08a34b7a-c988-42d0-97f8-6ff17adf824c',
  '0e751aee-8cbf-4a73-a5e1-5eb0deec9770'
);
```

### GC Le Pavoniere Golf and Country Club (1 courses)

- DB:        lat=43.8483969, lon=11.0608265
- OSM:       lat=43.8391948, lon=11.0536775, sim=0.75, name="Golf Club Le Pavoniere"
- LC:        lat=43.84536, lon=11.054907, sim=0.75, name="Golf & Country Club Le Pavoniere"
- Consensus: lat=43.8422774, lon=11.0542922 (mean(osm,lc))
- DB → consensus:   859m
- OSM ↔ LC agreement: 693m

```sql
UPDATE courses SET
  latitude = 43.8422774,
  longitude = 11.0542922
WHERE id IN (
  'b7e4d2fb-089c-4ef5-8c24-ac633de4e645'
);
```

### Is Molas Resort (9 courses)

- DB:        lat=38.996004, lon=8.9601703
- OSM:       lat=39.0044645, lon=8.9632516, sim=1, name="Is Molas Golf Club"
- LC:        lat=39.001976, lon=8.961625, sim=1, name="Is Molas Golf Resort"
- Consensus: lat=39.0032202, lon=8.9624383 (mean(osm,lc))
- DB → consensus:   826m
- OSM ↔ LC agreement: 310m

```sql
UPDATE courses SET
  latitude = 39.0032202,
  longitude = 8.9624383
WHERE id IN (
  '04e11f5a-5d75-4e4c-82c8-7b4d7e8fa736',
  '12b7a6ea-9ecc-470d-80d0-4ead813379c2',
  '2018804a-583f-490d-953e-863baeb9e2ae',
  '5ed0df87-dbc6-4015-9425-3b4c5b894cc2',
  '64e92767-a7c6-475e-b30f-391a63cc052f',
  'ba7a3ce3-921b-431e-a3fd-67311dd3fe82',
  'bfbf044b-15c2-4ed4-9af3-432743e8a9c7',
  'dee30b40-51e2-4fe2-9b56-776feabcda44',
  'ec437e97-c3b7-4bc3-9365-648f06cd70a5'
);
```

### Golfclub St. Vigil Seis (1 courses)

- DB:        lat=46.538941, lon=11.5431586
- OSM:       lat=46.5389428, lon=11.5437438, sim=0.55, name="Golfclub San Vigilio Siusi - St.Vigil Seis"
- LC:        lat=46.544167, lon=11.562222, sim=1, name="Golfclub St. Vigil Seis"
- Consensus: lat=46.5415549, lon=11.5529829 (mean(osm,lc))
- DB → consensus:   806m
- OSM ↔ LC agreement: 1528m

```sql
UPDATE courses SET
  latitude = 46.5415549,
  longitude = 11.5529829
WHERE id IN (
  '9c9926df-7dae-4326-91d5-4dfd895e1f25'
);
```

### Monte Cimone (1 courses)

- DB:        lat=44.2342247, lon=10.7805291
- OSM:       lat=44.2280586, lon=10.7856739, sim=1, name="Monte Cimone Golf Club"
- LC:        lat=44.228542, lon=10.785345, sim=1, name="Monte Cimone Golf Club"
- Consensus: lat=44.2283003, lon=10.7855094 (mean(osm,lc))
- DB → consensus:   769m
- OSM ↔ LC agreement: 60m

```sql
UPDATE courses SET
  latitude = 44.2283003,
  longitude = 10.7855094
WHERE id IN (
  'd6061421-410c-4444-ab5f-633a3fc11102'
);
```

### Golf Club La Rocca (1 courses)

- DB:        lat=44.7139495, lon=10.2263338
- OSM:       lat=44.7072159, lon=10.2214181, sim=1, name="Golf Club La Rocca"
- LC:        lat=44.707699, lon=10.22634, sim=0.417, name="Golf del Ducato - La Rocca"
- Consensus: lat=44.7074574, lon=10.2238791 (mean(osm,lc))
- DB → consensus:   747m
- OSM ↔ LC agreement: 393m

```sql
UPDATE courses SET
  latitude = 44.7074574,
  longitude = 10.2238791
WHERE id IN (
  '8efc0719-fddd-4fef-af8c-80fbdc0b5cf8'
);
```

### Golf Club Eppan (1 courses)

- DB:        lat=46.4953176, lon=11.2560184
- OSM:       lat=46.4999387, lon=11.2500495, sim=1, name="Golf Club Eppan"
- LC:        lat=46.500549, lon=11.248884, sim=0.217, name="Golf & Country Südtirol - Golfclub Eppan"
- Consensus: lat=46.5002439, lon=11.2494667 (mean(osm,lc))
- DB → consensus:   743m
- OSM ↔ LC agreement: 112m

```sql
UPDATE courses SET
  latitude = 46.5002439,
  longitude = 11.2494667
WHERE id IN (
  'f4375d2e-7b7f-47b7-9b76-c71c24a21852'
);
```

### Torrenova Golf Club (1 courses)

- DB:        lat=43.3946485, lon=13.668355
- OSM:       lat=43.4002009, lon=13.6730888, sim=0.375, name="Torrenova Golf Club Potenza Picena"
- LC:        lat=null, lon=null, sim=1, name="Torrenova Golf Club"
- Consensus: lat=43.4002009, lon=13.6730888 (osm)
- DB → consensus:   726m

```sql
UPDATE courses SET
  latitude = 43.4002009,
  longitude = 13.6730888
WHERE id IN (
  '0b388e30-5b64-40da-a4f6-b6c52a17f763'
);
```

### Parco di Roma Golf Club (2 courses)

- DB:        lat=41.9611156, lon=12.4764326
- OSM:       lat=41.9681439, lon=12.4772267, sim=1, name="Parco di Roma Golf Club"
- LC:        lat=41.966766, lon=12.473345, sim=1, name="Parco di Roma Golf Club"
- Consensus: lat=41.9674550, lon=12.4752858 (mean(osm,lc))
- DB → consensus:   711m
- OSM ↔ LC agreement: 356m

```sql
UPDATE courses SET
  latitude = 41.9674550,
  longitude = 12.4752858
WHERE id IN (
  '189adf53-78d2-4346-a70a-e56b0904000b',
  'bdab121b-3c90-4638-8f66-67cb1c3c4d28'
);
```

### San Domenico Golf (1 courses)

- DB:        lat=40.8699069, lon=17.4002293
- OSM:       lat=40.876626, lon=17.39989, sim=1, name="San Domenico Golf"
- LC:        lat=40.875786, lon=17.398825, sim=1, name="San Domenico Golf"
- Consensus: lat=40.8762060, lon=17.3993575 (mean(osm,lc))
- DB → consensus:   704m
- OSM ↔ LC agreement: 129m

```sql
UPDATE courses SET
  latitude = 40.8762060,
  longitude = 17.3993575
WHERE id IN (
  'a0fcfbc7-84e2-4c89-a026-697fe744aef4'
);
```

### GC Terme di Saturnia (1 courses)

- DB:        lat=42.6595052, lon=11.5170708
- OSM:       lat=42.6513152, lon=11.5208798, sim=0.824, name="Terme Di Saturnia Spa & Golf"
- LC:        lat=42.656525, lon=11.518403, sim=0.824, name="Terme di Saturnia Golf Club"
- Consensus: lat=42.6539201, lon=11.5196414 (mean(osm,lc))
- DB → consensus:   656m
- OSM ↔ LC agreement: 614m

```sql
UPDATE courses SET
  latitude = 42.6539201,
  longitude = 11.5196414
WHERE id IN (
  'd1794e1a-52ad-4106-9366-fc30330e2dad'
);
```

### San Valentino Golf Club (1 courses)

- DB:        lat=44.5277122, lon=10.6886547
- OSM:       lat=44.5338655, lon=10.6912043, sim=0.846, name="Golf Club S. Valentino"
- LC:        lat=44.533031, lon=10.687401, sim=1, name="San Valentino Golf Club"
- Consensus: lat=44.5334482, lon=10.6893027 (mean(osm,lc))
- DB → consensus:   640m
- OSM ↔ LC agreement: 315m

```sql
UPDATE courses SET
  latitude = 44.5334482,
  longitude = 10.6893027
WHERE id IN (
  '77192d81-f702-4bdf-a6c5-a554156b75eb'
);
```

### San Valentino Old Course (1 courses)

- DB:        lat=44.5277122, lon=10.6886547
- OSM:       lat=44.5338655, lon=10.6912043, sim=0.647, name="Golf Club S. Valentino"
- LC:        lat=44.533031, lon=10.687401, sim=0.765, name="San Valentino Golf Club"
- Consensus: lat=44.5334482, lon=10.6893027 (mean(osm,lc))
- DB → consensus:   640m
- OSM ↔ LC agreement: 315m

```sql
UPDATE courses SET
  latitude = 44.5334482,
  longitude = 10.6893027
WHERE id IN (
  'b4ad5688-0f54-42dc-b117-ff52e0cb6633'
);
```

### Bogliaco Golf Resort (1 courses)

- DB:        lat=45.6656032, lon=10.6445137
- OSM:       lat=45.6621015, lon=10.6375885, sim=1, name="Golf Bogliaco"
- LC:        lat=45.663395, lon=10.637468, sim=1, name="Golf Bogliaco"
- Consensus: lat=45.6627482, lon=10.6375282 (mean(osm,lc))
- DB → consensus:   629m
- OSM ↔ LC agreement: 144m

```sql
UPDATE courses SET
  latitude = 45.6627482,
  longitude = 10.6375282
WHERE id IN (
  'd9cd1fd4-4127-4eda-bf65-6cc0cc83343c'
);
```

### bricch golf (1 courses)

- DB:        lat=45.6480635, lon=9.1212095
- OSM:       lat=45.6480813, lon=9.1210335, sim=1, name="Bricch golf"
- LC:        lat=45.659225, lon=9.120197, sim=0.2, name="Barlassina Country Club"
- Consensus: lat=45.6536531, lon=9.1206153 (mean(osm,lc))
- DB → consensus:   623m
- OSM ↔ LC agreement: 1241m

```sql
UPDATE courses SET
  latitude = 45.6536531,
  longitude = 9.1206153
WHERE id IN (
  'd0066ffb-26a9-46e1-9b61-df1ecad18c25'
);
```

### Country Club Castelgandolfo (1 courses)

- DB:        lat=41.737986, lon=12.6294905
- OSM:       lat=41.7359033, lon=12.6248374, sim=1, name="Castelgandolfo Golf Club Resort"
- LC:        lat=41.73558, lon=12.621317, sim=1, name="Castelgandolfo Golf Club"
- Consensus: lat=41.7357416, lon=12.6230772 (mean(osm,lc))
- DB → consensus:   588m
- OSM ↔ LC agreement: 294m

```sql
UPDATE courses SET
  latitude = 41.7357416,
  longitude = 12.6230772
WHERE id IN (
  '25c825ec-895e-48e4-8203-455b0b285c1c'
);
```

### Golf Club Milano (1 courses)

- DB:        lat=45.6111249, lon=9.2917128
- OSM:       lat=45.6169824, lon=9.2928658, sim=1, name="Golf Club Milano"
- LC:        lat=45.615299, lon=9.294691, sim=1, name="Golf Club Milano"
- Consensus: lat=45.6161407, lon=9.2937784 (mean(osm,lc))
- DB → consensus:   580m
- OSM ↔ LC agreement: 235m

```sql
UPDATE courses SET
  latitude = 45.6161407,
  longitude = 9.2937784
WHERE id IN (
  '52bb7ba1-52d9-47e5-a743-d1fea4e30157'
);
```

### Golf Zerman (2 courses)

- DB:        lat=45.5794755, lon=12.2686586
- OSM:       lat=45.5813677, lon=12.2648576, sim=0.133, name="Golf Club Villa Condulmer"
- LC:        lat=45.586853, lon=12.272834, sim=1, name="Golf Zerman"
- Consensus: lat=45.5841104, lon=12.2688458 (mean(osm,lc))
- DB → consensus:   516m
- OSM ↔ LC agreement: 870m

```sql
UPDATE courses SET
  latitude = 45.5841104,
  longitude = 12.2688458
WHERE id IN (
  '281a2f2e-e8bd-4fb0-a60b-3c2b205e3804',
  'a2f8022f-1b52-4417-86d2-11410eb054cf'
);
```

### Zerman (1 courses)

- DB:        lat=45.5794755, lon=12.2686586
- OSM:       lat=45.5813677, lon=12.2648576, sim=0.133, name="Golf Club Villa Condulmer"
- LC:        lat=45.586853, lon=12.272834, sim=1, name="Golf Zerman"
- Consensus: lat=45.5841104, lon=12.2688458 (mean(osm,lc))
- DB → consensus:   516m
- OSM ↔ LC agreement: 870m

```sql
UPDATE courses SET
  latitude = 45.5841104,
  longitude = 12.2688458
WHERE id IN (
  'a1af972c-577e-4bd6-a1ca-e77942febe39'
);
```

### Argentario Golf Club (1 courses)

- DB:        lat=42.4214361, lon=11.1892741
- OSM:       lat=42.4214489, lon=11.1837791, sim=1, name="Argentario Golf Club"
- LC:        lat=42.416138, lon=11.184522, sim=0.526, name="Argentario Golf & Wellness Resort"
- Consensus: lat=42.4187934, lon=11.1841506 (mean(osm,lc))
- DB → consensus:   513m
- OSM ↔ LC agreement: 594m

```sql
UPDATE courses SET
  latitude = 42.4187934,
  longitude = 11.1841506
WHERE id IN (
  'cf2b4b15-fc91-4da5-bb73-cc044b95a6d9'
);
```

### Adriatic Golf Club Cervia (9 courses)

- DB:        lat=44.2868132, lon=12.3381495
- OSM:       lat=44.2866923, lon=12.3353589, sim=1, name="Adriatic Golf Club Cervia"
- LC:        lat=44.279438, lon=12.338462, sim=1, name="Adriatic Golf Club Cervia"
- Consensus: lat=44.2830651, lon=12.3369104 (mean(osm,lc))
- DB → consensus:   428m
- OSM ↔ LC agreement: 844m

```sql
UPDATE courses SET
  latitude = 44.2830651,
  longitude = 12.3369104
WHERE id IN (
  '2b05e194-7017-44b5-a983-c8bc99d54469',
  '624bac8f-a23d-4519-b11b-4938f17c9065',
  '7d852125-f15d-498c-9d94-1087de3a9f54',
  '81706de4-7ed5-4600-8a7a-9720c2684aa4',
  '88108e93-69fe-481a-b3da-618e36099ed2',
  'af7d2901-2b8b-41b5-ba12-045c2f8e4223',
  'e37a7f42-6822-4dcc-8403-b947e141086b',
  'e8dda4f6-d12b-4652-bc67-44d32cbdbd81',
  'f70d5971-6203-424d-9b90-d89ff67ffa68'
);
```

### Circolo del Golf Roma Acquasanta (1 courses)

- DB:        lat=41.8515456, lon=12.5416712
- OSM:       lat=41.8523419, lon=12.5399003, sim=1, name="Circolo del Golf di Roma Acquasanta"
- LC:        lat=41.855179, lon=12.537503, sim=1, name="Circolo del Golf di Roma Acquasanta"
- Consensus: lat=41.8537604, lon=12.5387017 (mean(osm,lc))
- DB → consensus:   348m
- OSM ↔ LC agreement: 373m

```sql
UPDATE courses SET
  latitude = 41.8537604,
  longitude = 12.5387017
WHERE id IN (
  '38a44ff9-5afe-4cc8-b61e-52607ff4fca4'
);
```

### BuenaVistaSocialClub (1 courses)

- DB:        lat=45.774281, lon=9.2130426
- OSM:       lat=45.7759592, lon=9.215464, sim=0.7, name="Buena Vista Social Golf"
- LC:        lat=null, lon=null, sim=0.35, name="Botanic Golf Sacuba"
- Consensus: lat=45.7759592, lon=9.2154640 (osm)
- DB → consensus:   265m

```sql
UPDATE courses SET
  latitude = 45.7759592,
  longitude = 9.2154640
WHERE id IN (
  '85788a8b-e78c-4ac6-8e64-52ec105982c8'
);
```

### St. Anna Golf (1 courses)

- DB:        lat=44.4049436, lon=8.6426002
- OSM:       lat=44.4028279, lon=8.638901, sim=0.778, name="Golf Sant'Anna"
- LC:        lat=44.403446, lon=8.650107, sim=0.5, name="Golf Club Genova St. Anna"
- Consensus: lat=44.4031370, lon=8.6445040 (mean(osm,lc))
- DB → consensus:   251m
- OSM ↔ LC agreement: 893m

```sql
UPDATE courses SET
  latitude = 44.4031370,
  longitude = 8.6445040
WHERE id IN (
  'e576f09a-ddb2-4b2e-8bc8-a1515ce68fef'
);
```

### GC Le Cicogne (1 courses)

- DB:        lat=44.2889998, lon=11.8591761
- OSM:       lat=44.2925439, lon=11.8553479, sim=0.7, name="Golf Club Le Cicogne"
- LC:        lat=44.288822, lon=11.859375, sim=0.571, name="Golf Club Faenza (Le Cicogne)"
- Consensus: lat=44.2906830, lon=11.8573614 (mean(osm,lc))
- DB → consensus:   236m
- OSM ↔ LC agreement: 523m

```sql
UPDATE courses SET
  latitude = 44.2906830,
  longitude = 11.8573614
WHERE id IN (
  '9f4c3f14-da4b-457a-9c32-ef10638e2c3a'
);
```

### Golf Club Le Betulle (1 courses)

- DB:        lat=45.482428, lon=7.980676
- OSM:       lat=45.4790839, lon=7.9830507, sim=1, name="Golf Club Le Betulle"
- LC:        lat=45.482643, lon=7.981181, sim=0.5, name="Golf Club Biella Le Betulle"
- Consensus: lat=45.4808635, lon=7.9821158 (mean(osm,lc))
- DB → consensus:   207m
- OSM ↔ LC agreement: 422m

```sql
UPDATE courses SET
  latitude = 45.4808635,
  longitude = 7.9821158
WHERE id IN (
  'a42c8e93-ce0c-4926-a0a6-795520ea7fc5'
);
```

### Matilde di Canossa Golf Club (1 courses)

- DB:        lat=44.675888, lon=10.5321444
- OSM:       lat=44.6776936, lon=10.5342829, sim=1, name="Matilde di Canossa Golf Club"
- LC:        lat=44.67358, lon=10.534746, sim=0.6, name="Terra Di Canossa Golf Club"
- Consensus: lat=44.6756368, lon=10.5345144 (mean(osm,lc))
- DB → consensus:   189m
- OSM ↔ LC agreement: 459m

```sql
UPDATE courses SET
  latitude = 44.6756368,
  longitude = 10.5345144
WHERE id IN (
  'de6e07ac-b60e-4db7-8508-7c9272f12243'
);
```

### Golf Cento (1 courses)

- DB:        lat=44.7151228, lon=11.2826965
- OSM:       lat=44.7142246, lon=11.2855198, sim=1, name="Golf Club Cento"
- LC:        lat=44.714481, lon=11.283218, sim=0.278, name="Golf Club Augusto Fava Cento"
- Consensus: lat=44.7143528, lon=11.2843689 (mean(osm,lc))
- DB → consensus:   157m
- OSM ↔ LC agreement: 184m

```sql
UPDATE courses SET
  latitude = 44.7143528,
  longitude = 11.2843689
WHERE id IN (
  '2cbefb9b-7eb4-4b38-b276-877894f5c12a'
);
```

### Golf Club Fontevivo (1 courses)

- DB:        lat=43.6896115, lon=10.8516464
- OSM:       lat=43.6891365, lon=10.855209, sim=1, name="Golf Club Fontevivo"
- LC:        lat=43.689491, lon=10.851681, sim=0.176, name="Golf Club San Miniato A.S.D."
- Consensus: lat=43.6893137, lon=10.8534450 (mean(osm,lc))
- DB → consensus:   148m
- OSM ↔ LC agreement: 286m

```sql
UPDATE courses SET
  latitude = 43.6893137,
  longitude = 10.8534450
WHERE id IN (
  'eea59a7c-ae65-4567-a41f-515a7633e6f5'
);
```

### Elba golf acquabona (1 courses)

- DB:        lat=42.782423, lon=10.3449263
- OSM:       lat=42.7824208, lon=10.3448347, sim=0.643, name="Golf Course Acquabona"
- LC:        lat=42.784706, lon=10.343721, sim=0.737, name="Elba Golf Club Dell'Acquabona"
- Consensus: lat=42.7835634, lon=10.3442779 (mean(osm,lc))
- DB → consensus:   137m
- OSM ↔ LC agreement: 270m

```sql
UPDATE courses SET
  latitude = 42.7835634,
  longitude = 10.3442779
WHERE id IN (
  'de0c0394-77c8-44b4-999d-edc7c3e71257'
);
```

### Golf Club Centro d'Italia (1 courses)

- DB:        lat=42.4308495, lon=12.8836081
- OSM:       lat=42.4309195, lon=12.8836559, sim=1, name="Golf Club Centro d'Italia"
- LC:        lat=42.432076, lon=12.884494, sim=0.579, name="Golf Club Rieti - Centro Italia"
- Consensus: lat=42.4314978, lon=12.8840750 (mean(osm,lc))
- DB → consensus:   82m
- OSM ↔ LC agreement: 146m

```sql
UPDATE courses SET
  latitude = 42.4314978,
  longitude = 12.8840750
WHERE id IN (
  'ddd81354-44a3-4554-849f-df25040bacc0'
);
```

## None (no clear coord error)

Disse klubber har ingen tydelig coord-fejl baseret på OSM+LC triangulering.
Listet kun som klub-navn + dist for hurtig oversigt.

- Riva dei Tessali (1 courses, db→consensus 293605m)
- Golf Club Cri Cri (1 courses, db→consensus 250398m)
- PARCO DEL GOLF MUSELLA (1 courses, db→consensus 135237m)
- Origini Golf Mantova (1 courses, db→consensus 123385m)
- Golf Club Città di Asti (1 courses, db→consensus 120644m)
- Ai Colli di Bergamo Golf (1 courses, db→consensus 71852m)
- Montebelluna 9 Buche (1 courses, db→consensus 14749m)
- Golf Castell’Arquato’arquato (1 courses, db→consensus 1678m)
- Golf Salsomaggiore Terme (1 courses, db→consensus 1656m)
- Villa Carolina - I Tigli (1 courses, db→consensus 1219m)
- Golf Montecatini Terme (1 courses, db→consensus 1041m)
- GOLF PANORAMA (1 courses, db→consensus 1000m)
- Cosmopolitan Golf & Beach Resort (1 courses, db→consensus 922m)
- Cascina i Merli (1 courses, db→consensus 624m)
- Golf club Tesino (1 courses, db→consensus 559m)
- Circolo Golf degli Ulivi (1 courses, db→consensus 504m)
- La Mandria (2 courses, db→consensus 491m)
- Barolo Golf Club (2 courses, db→consensus 465m)
- Golf & Country Club Caldese (2 courses, db→consensus 465m)
- Golf Club La Castelluccia (2 courses, db→consensus 465m)
- Marco Polo Golf Club (1 courses, db→consensus 465m)
- Pinerolo Golf Club (1 courses, db→consensus 465m)
- Golf Fiuggi terme & country club (1 courses, db→consensus 356m)
- Il Picciolo Golf Club (1 courses, db→consensus 350m)
- Golf Club Como (2 courses, db→consensus 340m)
- Golf Club Toscana Castelfalfi (9 courses, db→consensus 337m)
- Golf Club Volturno (Napoli) (1 courses, db→consensus 330m)
- Golf Colline Del Gavi (10 courses, db→consensus 328m)
- GC Aviano (1 courses, db→consensus 306m)
- Villafranca le Vigne (1 courses, db→consensus 276m)
- Allegroitalia Siracusa Golf Monasteri (1 courses, db→consensus 258m)
- golf club san giovanni dei boschi (1 courses, db→consensus 251m)
- Golfclub Passeier (1 courses, db→consensus 250m)
- Golf Senza Confini (1 courses, db→consensus 238m)
- Golf & Country Club Gorizia (1 courses, db→consensus 225m)
- Arenzano (1 courses, db→consensus 223m)
- Golf Club Lana - Gutshof Brandis (1 courses, db→consensus 217m)
- Golf Les Iles (1 courses, db→consensus 215m)
- Capriva Castello di Spessa (1 courses, db→consensus 192m)
- Circolo Golf Margara (2 courses, db→consensus 171m)
- golf club carezza (1 courses, db→consensus 143m)
- Riviera Golf Club - Executive Course (1 courses, db→consensus 142m)
- Cavour Green Golf (1 courses, db→consensus 119m)
- Lainate Golf Club (1 courses, db→consensus 119m)
- Dolomiti Golfclub (2 courses, db→consensus 104m)
- Campanino golf club (1 courses, db→consensus 96m)
- Golf Club Toscana (1 courses, db→consensus 72m)
- Campo Comunale Golf Premeno Piandisole (1 courses, db→consensus 67m)
