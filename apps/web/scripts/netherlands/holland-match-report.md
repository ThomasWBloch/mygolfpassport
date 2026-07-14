# Netherlands match report
Generated: 2026-05-04T06:06:13

3-source: NGF (forbund) + OSM + LC. Per-felt-confidence per kilde.
Scope: website (NGF→OSM), address (LC→OSM). Phone/email droppet.

## Summary

| Bucket | Clubs | Courses |
|---|---:|---:|
| High conf | 163 | 346 |
| Medium conf | 9 | 13 |
| Low conf | 0 | 0 |
| No match | 12 | 12 |

## Field-fill projection

| Field | Clubs | Courses |
|---|---:|---:|
| website | 172 | 359 |
| address | 0 | 0 |

## High confidence (recommended to apply)

### Amsterdamse Golf Club (Netherlands, 1 courses)

- DB: lat=52.3998286, lon=4.74634, addr="Bauduinlaan 35, Amsterdam", website=null
- NGF (high, sim=1): name="Amsterdamse", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/8/amsterdamse", email="agc1934@wxs.nl"
- OSM (medium, 448m, sim=1): name="Amsterdamse Golf Club", website="https://www.amsterdamsegolfclub.nl/", addr=null
- LC  (high, 41m, sim=1): name="Amsterdamse Golf Club", addr="Bauduinlaan 35, 1047 HK Amsterdam", banen=Amsterdamse Golf Club(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/8/amsterdamse'
WHERE id IN (
  '9f2c9c88-4be9-4a02-bd99-d3e3d11a7e84'
);
```

### Best Golf Country Club (Netherlands, 1 courses)

- DB: lat=51.4923467, lon=5.4103128, addr="Golflaan 1  Best, Best", website=null
- NGF (high, sim=1): name="Best Golf", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/51/best-golf", email="info@bestgolf.nl"
- OSM (high, 64m, sim=1): name="Best Golf", website="https://bestgolf.nl/", addr=null
- LC  (medium, 391m, sim=1): name="Best Golf", addr="Golflaan 1, 5683 RZ Best", banen=9 holes Par 3(9); Best Golf & Country Club(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/51/best-golf'
WHERE id IN (
  'fb8c812d-d592-421f-9983-e8a1bb65ae80'
);
```

### Betuws Golfcentrum de Batouwe (Netherlands, 10 courses)

- DB: lat=51.9276424, lon=5.4226912, addr="Oost Kanaalweg 1, Zoelen", website=null
- NGF (no-match, sim=0.385): name="Noordwijk Golfcentrum", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/595/noordwijk-golfcentrum", email="info@golfcentrumnoordwijk.nl"
- OSM (high, 217m, sim=0.731): name="Golfcentrum De Batouwe", website="https://www.golfcentrumdebatouwe.nl", addr=null
- LC  (high, 176m, sim=0.731): name="Golfcentrum De Batouwe", addr="Oost Kanaalweg 1, 4011 LA Zoelen", banen=Pruimengaard (Par 3/4 Parcours)(9); Appel Kersengaard(18); Kersen Perengaard(18); Peren Appelgaard(18)

**Proposed UPDATE** (alle 10 course rows for klub, overall=high):
  - website: from osm(high, 217m, sim=0.731)
```sql
UPDATE courses SET
  website = 'https://www.golfcentrumdebatouwe.nl'
WHERE id IN (
  '0fea192c-8460-47d7-bf60-557dc651c00a',
  '279002e8-57fc-4bbb-9b7c-1748b93ee191',
  '3617e7bf-f776-48e0-8109-ab8c38f62d68',
  '5944379f-e8ad-4e78-8376-06906eb906af',
  '6bd3da7c-002b-449e-bc1c-72cd7838ad89',
  '8fd7c37f-753b-4fc6-95b5-4da2defd93ed',
  '9a927986-db2a-45ae-b4e9-e8475539c8c0',
  'cc16a758-847f-4ffa-8298-ac712c3c9aa5',
  'e2d5df70-f8a2-45e1-8184-adee4cdf2a76',
  'fce4b924-985e-4c34-9bdd-a287f338cb4d'
);
```

### Biltse Duinen (Netherlands, 1 courses)

- DB: lat=52.1296519, lon=5.2178693, addr="Burgemeester van der Borchlaan 6, Bilthoven", website=null
- NGF (high, sim=1): name="De Biltse Duinen", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/505/de-biltse-duinen", email="Kantoor@biltseduinen.nl"
- OSM (low, 5m, sim=0.591): name="Golfpark De Biltse Duinen", website="https://www.biltseduinen.nl/", addr="Burgemeester van der Borchlaan, 6, 3722GZ, Bilthoven"
- LC  (low, 85m, sim=0.591): name="Golfpark De Biltse Duinen", addr="Burgemeester van der Borchlaan 6, 3722 GZ, Bilthoven", banen=Golf & Country Club de Biltse Duinen(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/505/de-biltse-duinen'
WHERE id IN (
  '916855d5-d8bf-4479-9ff1-ca99bd4aeae7'
);
```

### Brabant Golf (Netherlands, 1 courses)

- DB: lat=51.5961392, lon=4.9108614, addr="Statenlaan 18, Rijen", website=null
- NGF (high, sim=1): name="Brabant Golf", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/556/brabant-golf", email="brabantgolf@hetnet.nl"
- OSM (high, 164m, sim=1): name="Brabant Golf", website="https://www.brabantgolf.nl/", addr=null
- LC  (high, 53m, sim=1): name="Brabant Golf", addr="Statenlaan 18, 5121 HD  Rijen", banen=Brabant Golf(6)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/556/brabant-golf'
WHERE id IN (
  'f14a4168-6a3b-4a16-b205-4da54b4b1ef5'
);
```

### Brunssummerheide (Netherlands, 12 courses)

- DB: lat=50.9358001, lon=6.0100305, addr="Rimburgerweg 50, Brunssum", website=null
- NGF (high, sim=1): name="Brunssummerheide", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/33/brunssummerheide", email="info@golfresortbrunssum.nl"
- OSM (high, 65m, sim=1): name="Golfbaan Brunssummerheide", website="https://www.golfresortbrunssum.nl/nl/golfbaan/", addr=null
- LC  (high, 65m, sim=1): name="Golf-Resort Brunssummerheide", addr="Rimburgerweg 52, 6445 PA Brunssum", banen=B/Geel(9); C/Rood(9); Par 3(9); A/Blauw(18)

**Proposed UPDATE** (alle 12 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/33/brunssummerheide'
WHERE id IN (
  '0dffeba8-aacd-4608-a7b5-02f1d3adc62e',
  '350d4c1c-ea7f-4a17-a182-3cd17dc5c62d',
  '843d9286-1e8c-4ac3-b4b4-0effdc1484b2',
  '868a6a57-5abc-4f92-9e6d-08029cc73844',
  '940a0b84-198a-418b-92d7-62f9b0f04409',
  'a43a2b5f-a2be-4a32-8624-72b644a9aabb',
  'b0c23319-352d-45c6-a103-307c5c909deb',
  'b53cfcad-a4e7-4e22-8ff8-939bd795422f',
  'd1253468-7eac-4021-9dc1-425797ebbe1d',
  'deb7fc11-67d4-476d-9e9f-94690ae16349',
  'e61704c8-566b-4df5-b436-aab0c02010d6',
  'edafc56b-5fa0-4d6d-bbed-686f53ae00d6'
);
```

### Crayestein Golfbaan (Netherlands, 1 courses)

- DB: lat=51.8171479, lon=4.7458374, addr="Baanhoekweg 50, Dordrecht", website=null
- NGF (high, sim=1): name="Crayestein Golf", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/52/crayestein-golf", email="info@crayesteingolf.nl"
- OSM (high, 61m, sim=1): name="Crayestein Golf", website="https://crayesteingolf.nl/", addr=null
- LC  (high, 133m, sim=1): name="Golfbaan Crayestein", addr=" Baanhoekweg 50, 3313 LP Dordrecht", banen=Crayestein Golfbaan(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/52/crayestein-golf'
WHERE id IN (
  'c5240081-f7b4-400a-8594-3fa70e07c8f5'
);
```

### Crimpenerhout (Netherlands, 1 courses)

- DB: lat=51.905775, lon=4.6209832, addr="C.G. Roosweg 9, Krimpen a/d Lek", website=null
- NGF (high, sim=1): name="Crimpenerhout", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/155/crimpenerhout", email="info@golfbaancrimpenerhout.nl"
- OSM (medium, 361m, sim=1): name="Golfbaan Crimpenerhout", website="https://www.golfbaancrimpenerhout.nl/", addr="CG Roosweg, 9, 2931LK, Krimpen aan de Lek"
- LC  (high, 142m, sim=1): name="Golfbaan Crimpenerhout", addr="C.G. Roosweg 9, 2931 LK Krimpen aan de Lek", banen=Golfbaan Crimpenerhout(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/155/crimpenerhout'
WHERE id IN (
  '8c4c30c8-84d9-4a22-89bd-69bea4a454a7'
);
```

### Crossmoor (Netherlands, 2 courses)

- DB: lat=51.2225922, lon=5.6441135, addr="Laurabosweg 8, Weert", website=null
- NGF (high, sim=1): name="Crossmoor", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/40/crossmoor", email="info@domeinlaurabos.com"
- OSM (medium, 368m, sim=1): name="Golfbaan Crossmoor", website="https://www.domeinlaurabos.com/crossmoor-golf/", addr=null
- LC  (low, 98m, sim=0.36): name="Crossmoor Golf - Domein Laurabos", addr="Laurabosweg 8 - 6006 VR - Weert - The Netherlands", banen=Crossmoorse Par 3 Course(9); Championship Course Crossmoor(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/40/crossmoor'
WHERE id IN (
  'acd2237f-ed45-491d-bc9a-5adaff8ca0c0',
  'fd6fe27a-9acb-4906-b109-24ad8efee8ec'
);
```

### De Goese Golf (Netherlands, 2 courses)

- DB: lat=51.5214952, lon=3.9113616, addr="Krukweg 31, Goes", website=null
- NGF (high, sim=1): name="De Goese Golf", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/772/de-goese-golf", email="info@goesegolf.nl"
- OSM (medium, 485m, sim=1): name="Goese Golf", website="https://goesegolf.nl", addr=null
- LC  (medium, 393m, sim=1): name="De Goese Golf", addr="Krukweg 31, 4465 BH Goes", banen=Par 3 - 9 holes(9); De Goese Golf(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/772/de-goese-golf'
WHERE id IN (
  'cc12f904-b964-4eb5-a986-4016b0590032',
  'e703c544-1499-480a-a037-990a4161d5ab'
);
```

### de Golfhorst (Netherlands, 2 courses)

- DB: lat=51.4265026, lon=5.9682364, addr="raamweg  8, america", website=null
- NGF (high, sim=1): name="De Golfhorst", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/131/de-golfhorst", email="info@golfbaandegolfhorst.nl"
- OSM (medium, 366m, sim=1): name="Golfbaan de Golfhorst", website="https://www.golfbaandegolfhorst.nl", addr=null
- LC  (high, 72m, sim=1): name="Golfbaan De Golfhorst", addr="Raamweg 8, 5966 RM  Horst (America)", banen=18-Hole Course(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/131/de-golfhorst'
WHERE id IN (
  '5d6037d2-9c7b-4591-8da6-3d266da574e6',
  '920e6930-fa4c-450e-acfd-6b8bdc2e0f8d'
);
```

### de Herkenbosche (Netherlands, 1 courses)

- DB: lat=51.1709899, lon=6.062035, addr="Stationsweg 100, Herkenbosch", website=null
- NGF (high, sim=1): name="Herkenbosche", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/73/herkenbosche", email="info@deherkenbosche.nl"
- OSM (medium, 321m, sim=1): name="de Herkenbosche", website="https://deherkenbosche.nl/", addr="Stationsweg, 100, 6075CD, Herkenbosch"
- LC  (high, 180m, sim=1): name="de Herkenbosche", addr="Stationsweg 100, 6075 CD Herkenbosch", banen=Herkenbosche Par 3 Course(9); Herkenbosch Championship Course(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/73/herkenbosche'
WHERE id IN (
  'e2260d00-b716-4655-954d-2172ab46e180'
);
```

### De Hildenberg (Netherlands, 1 courses)

- DB: lat=52.9423011, lon=6.3526752, addr="Gruun 5, Appelscha", website=null
- NGF (high, sim=1): name="De Hildenberg", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/140/de-hildenberg", email="receptie@golfparkdehildenberg.nl"
- OSM (low, 523m, sim=0.526): name="Golfpark De Hildenberg", website="https://golfparkdehildenberg.nl/", addr=null
- LC  (low, 55m, sim=0.526): name="Golfpark De Hildenberg", addr="Gruun 3, 8426 NA Appelscha", banen=Golfbaan Appelscha(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/140/de-hildenberg'
WHERE id IN (
  '1e5d7337-c066-4548-a4fa-7653fb958f0e'
);
```

### De Hoge Dijk (Netherlands, 2 courses)

- DB: lat=52.2864691, lon=4.960156, addr="Abcouderstraatweg 46, Amsterdam", website=null
- NGF (high, sim=1): name="De Hoge Dijk", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/68/de-hoge-dijk", email="ledenadministratie@dehogedijk.nl"
- OSM (medium, 360m, sim=1): name="Golfbaan De Hoge Dijk", website="https://www.dehogedijk.nl/", addr=null
- LC  (low, 78m, sim=0.429): name="Golfcentrum De Hoge Dijk", addr="Abcouderstraatweg 46, 1105 AA Amsterdam Zuid-Oost", banen=Abcoudebaan(9); Bullewijkbaan - Holendrecht(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/68/de-hoge-dijk'
WHERE id IN (
  'cfa165c4-d326-4652-8724-3fd98d3b217c',
  'efa070b2-a4f0-4bb6-b77c-ba8cfef6d91e'
);
```

### De Hooge Rotterdamsche (Netherlands, 1 courses)

- DB: lat=51.9706264, lon=4.5251458, addr="Rottebandreef 40, Bergschenhoek", website=null
- NGF (high, sim=1): name="De Hooge Rotterdamsche", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/67/de-hooge-rotterdamsche", email="info@dehoogerotterdamsche.nl"
- OSM (low, 850m, sim=1): name="Golfbaan De Hooge Rotterdamsche", website="https://www.dehoogerotterdamsche.nl/", addr=null
- LC  (high, 79m, sim=1): name="Golfbaan De Hooge Rotterdamsche", addr="Rottebandreef 40, 2661 JK Bergschenhoek", banen=Golfbaan De Hooge Rotterdamsche(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/67/de-hooge-rotterdamsche'
WHERE id IN (
  '371c40b5-b7f9-47bb-a20b-9ffee31be205'
);
```

### De Koepel (Netherlands, 1 courses)

- DB: lat=52.3422597, lon=6.5640548, addr="Rijssensestraat 142a, Wierden", website=null
- NGF (high, sim=1): name="De Koepel", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/38/de-koepel", email="info@golfclubdekoepel.nl"
- OSM (high, 127m, sim=1): name="De Koepel", website="https://www.golfclubdekoepel.nl/", addr=null
- LC  (low, 294m, sim=0.429): name="Golfclub 'de Koepel' (Wierden)", addr="Rijssensestraat 142A, 7642 NN Wierden", banen=de Koepel(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/38/de-koepel'
WHERE id IN (
  '8a997061-0222-4ba1-ba32-a433252d66a4'
);
```

### De Lage Mors (Netherlands, 1 courses)

- DB: lat=52.2564637, lon=6.7298128, addr="Sportlaan 7, Delden", website=null
- NGF (high, sim=1): name="De Lage Mors", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/150/de-lage-mors", email="info@golfbaandelagemors.nl"
- OSM (high, 173m, sim=1): name="De Lage Mors", website="https://www.golfbaandelagemors.nl/", addr=null
- LC  (high, 105m, sim=1): name="Golfclub de Lage Mors", addr="Sportlaan 7, 7491DG Delden", banen=Golfbaan de Lage Mors(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/150/de-lage-mors'
WHERE id IN (
  '2c98cfbf-b657-42b6-9458-7ff3b9ad1b49'
);
```

### De Peelse Golf (Netherlands, 1 courses)

- DB: lat=51.3842735, lon=5.9626562, addr="maasduinenweg 1, Evertsoord", website=null
- NGF (high, sim=1): name="De Peelse", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/100/de-peelse", email="info@depeelsegolf.nl"
- OSM (low, 349m, sim=0.286): name="Golfvereniging De Peelse Golf", website="https://www.depeelsegolf.nl/", addr=null
- LC  (high, 183m, sim=1): name="de Peelse Golf", addr="Maasduinenweg 1, 5977 NP Evertsoord", banen=de Peelse Golf(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/100/de-peelse'
WHERE id IN (
  '2a5bfcfc-17ca-470f-ae60-f68760c17190'
);
```

### De Pettelaar (Netherlands, 1 courses)

- DB: lat=51.6802262, lon=5.3169964, addr=null, website=null
- NGF (high, sim=1): name="de Pettelaar", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/616/de-pettelaar", email="info@pettelaar-golf.nl"
- OSM (no-match, 1410m, sim=0.643): name="Golf Parc De Pettelaar", website="https://www.pettelaar-golf.nl/", addr=null
- LC  (no-match, 1391m, sim=0.643): name="Golf Parc de Pettelaar", addr="Meerendonkweg 2, 5216 TZ Den Bosch", banen=Golf parc de Pettelaar(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/616/de-pettelaar'
WHERE id IN (
  '424acac5-411f-4419-99ab-69329cd066f7'
);
```

### De Scherpenbergh (Netherlands, 2 courses)

- DB: lat=52.1483696, lon=6.0189556, addr="Albaweg 43, Lieren", website=null
- NGF (high, sim=1): name="De Scherpenbergh", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/116/de-scherpenbergh", email="info@scherpenbergh.nl"
- OSM (low, 182m, sim=0.448): name="Golf- en Businessclub De Scherpenbergh", website="https://www.descherpenbergh.nl/", addr="Albaweg, 43, 7364CB, Lieren"
- LC  (high, 45m, sim=1): name="Golfclub De Scherpenbergh", addr="Albaweg 43, 7364 CB Lieren", banen=Rondje Business(9); Dassenbaan en Zwaluwenbaan(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/116/de-scherpenbergh'
WHERE id IN (
  '1822de32-eb23-4aa1-a08f-a5396a5ad20b',
  'b5dbca3a-0b71-44c6-a5d7-8130feab3229'
);
```

### De Star (Netherlands, 1 courses)

- DB: lat=52.0857795, lon=4.4112823, addr="De Star 51, Leidschendam", website=null
- NGF (high, sim=1): name="De Star", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/781/de-star", email="info@sportparkdestar.nl"
- OSM (low, 3m, sim=0.308): name="Golfpark De Star", website="https://www.golfparkdestar.nl/", addr="de Star, 51, 2266NA, Leidschendam"
- LC  (low, 271m, sim=0.308): name="Golfpark de Star", addr="De Star 51, 2266 NA, Leidschendam", banen=Pitch & Putt Golf Sportpark de Star(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/781/de-star'
WHERE id IN (
  '274d7bf2-7e11-44d9-93b6-9f0f9c4c35ce'
);
```

### De Texelse (Netherlands, 2 courses)

- DB: lat=53.146735, lon=4.8542825, addr="Roggeslootweg 3, De Cocksdorp", website=null
- NGF (high, sim=1): name="De Texelse", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/114/de-texelse", email="anita.hiemstra@texelse.nl"
- OSM (medium, 495m, sim=1): name="Golfbaan De Texelse", website="https://www.texelse.nl/", addr=null
- LC  (high, 40m, sim=1): name="Golfbaan de Texelse", addr="Roggeslootweg 3, 1795 JX De Cocksdorp", banen=De Texelse Linkscourse(18); Texelse Par 3 Course(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/114/de-texelse'
WHERE id IN (
  '3d9e7e4f-6f85-4b93-baf3-0b3bdce4ccce',
  '8d41cba3-7247-4a36-9349-a379c209fea0'
);
```

### De Turfvaert (Netherlands, 1 courses)

- DB: lat=51.5322891, lon=4.6977883, addr="Zwart Moerken 12, Rijsbergen", website=null
- NGF (high, sim=1): name="Turfvaert", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/157/turfvaert", email="info@deturfvaert.nl"
- OSM (low, 89m, sim=0.5): name="Golfpark De Turfvaert", website="https://www.deturfvaert.nl/", addr="Zwart Moerken, 12, 4891TK, Rijsbergen"
- LC  (low, 130m, sim=0.5): name="Golfpark de Turfvaert", addr="Zwart Moerken 12, 4891 TK Rijsbergen", banen=De Turfvaert(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/157/turfvaert'
WHERE id IN (
  '1f96f561-216d-470f-90c8-09d21984cf6d'
);
```

### De Vlietlanden (Netherlands, 1 courses)

- DB: lat=52.7445747, lon=5.1107907, addr="Grutteweide 31, Wervershoof", website=null
- NGF (high, sim=1): name="Vlietlanden", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/730/vlietlanden", email="info@golfbaandevlietlanden.nl"
- OSM (high, 204m, sim=1): name="Golfbaan De Vlietlanden", website="https://golfbaandevlietlanden.nl/", addr="Grutteweide, 31, 1693HR, Wervershoof"
- LC  (medium, 266m, sim=1): name="Golfbaan De Vlietlanden", addr="Grutteweide 31, 1693 HR, Wervershoof", banen=Old Course(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/730/vlietlanden'
WHERE id IN (
  'ebb84f90-347f-46b5-bea3-3c356f9f0574'
);
```

### De Woeste kop (Netherlands, 1 courses)

- DB: lat=51.2566334, lon=3.9004154, addr="Justaasweg 4, Axel", website=null
- NGF (high, sim=1): name="De Woeste Kop", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/43/de-woeste-kop", email="info@dewoestekop.nl"
- OSM (medium, 344m, sim=1): name="De Woeste Kop", website="https://www.dewoestekop.nl/", addr=null
- LC  (low, 31m, sim=0.4): name="Golfvereniging 'De Woeste Kop'", addr="Justaasweg 4, 4571 NB Axel", banen=Golfvereniging 'De Woeste Kop'(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/43/de-woeste-kop'
WHERE id IN (
  '69f2b332-8fc0-487e-883e-2735895d1655'
);
```

### DE ZEEUWSCHE (Netherlands, 2 courses)

- DB: lat=51.4794072, lon=3.6389544, addr="Paukenweg 1, Middelburg", website=null
- NGF (high, sim=1): name="De Zeeuwsche", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/739/de-zeeuwsche", email="ine@dezeeuwsche.nl"
- OSM (low, 587m, sim=1): name="De Zeeuwsche", website="https://www.dezeeuwsche.nl/", addr=null
- LC  (low, 188m, sim=0.45): name="De Zeeuwsche Middelburg", addr="Paukenweg 1, 4337 WH Middelburg", banen=Par-3(9); De Zeeuwsche Middelburg(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/739/de-zeeuwsche'
WHERE id IN (
  '1227d821-c6d2-4cbc-ba8b-a58829b22a6c',
  '277b928c-2b5f-4323-958d-0da9931e9c03'
);
```

### De Zuid Limburgse Golf (Netherlands, 1 courses)

- DB: lat=50.7900415, lon=5.8958786, addr="Aubelsweg 1, Gulpen-Wittem", website=null
- NGF (high, sim=1): name="De Zuid Limburgse", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/17/de-zuid-limburgse", email="clubsecretaris@zlgolf.nl"
- OSM (low, 205m, sim=0.667): name="De Zuid Limburgse Golf & Country Club Wittem", website="https://www.zlgolf.nl/", addr=null
- LC  (low, 111m, sim=0.667): name="De Zuid Limburgse Golf & Country Club Wittem", addr="Landsrade 1, Gulpen-Wittem", banen=De Zuid Limburgse(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/17/de-zuid-limburgse'
WHERE id IN (
  '4b7161b8-346f-4066-9e50-cbc70eb3274a'
);
```

### Drentse Golfclub De Gelpenberg (Netherlands, 2 courses)

- DB: lat=52.8008397, lon=6.696707, addr="Gebbeveenweg 1, Aalden", website=null
- NGF (no-match, sim=0.556): name="De Gelpenberg", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/22/de-gelpenberg", email="info@dgcdegelpenberg.nl"
- OSM (high, 228m, sim=1): name="Drentse Golfclub de Gelpenberg", website="https://www.dgcdegelpenberg.nl/", addr=null
- LC  (high, 139m, sim=1): name="Drentse Golfclub De Gelpenberg", addr="Gebbeveenweg 1, 7854 TD  Aalden", banen=Drentse Golfclub "De Gelpenberg"(18); Gelpenbergse Par 3 Course(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 228m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.dgcdegelpenberg.nl/'
WHERE id IN (
  '787d68d8-54a5-4533-859f-caecedb25b5d',
  'a45bef9b-cc85-47ed-b097-d5f8630616c4'
);
```

### Driene Golfclub (Netherlands, 1 courses)

- DB: lat=52.252078, lon=6.8258674, addr="Morshoekweg 16, Hengelo", website=null
- NGF (high, sim=1): name="Driene", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/105/driene", email="info@golfclubdriene.nl"
- OSM (high, 133m, sim=1): name="Golfclub Driene", website="https://www.golfclubdriene.nl/", addr=null
- LC  (high, 160m, sim=1): name="Golfclub Driene", addr="Morshoekweg 16, 7552 PE  Hengelo", banen=Driene Golfclub(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/105/driene'
WHERE id IN (
  'cea76bad-0beb-42a2-acf9-bf22b6845cb0'
);
```

### Edese Golfclub Papendal (Netherlands, 2 courses)

- DB: lat=52.0100497, lon=5.8283641, addr="Papendallaan 22, Arnhem", website=null
- NGF (high, sim=1): name="Edese Papendal", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/32/edese-papendal", email="info@edesegcpapendal.nl"
- OSM (medium, 368m, sim=1): name="Edese Golf Club Papendal", website="https://www.edesegcpapendal.nl/", addr=null
- LC  (low, 762m, sim=1): name="Edese Golfclub Papendal", addr="Papendallaan 22, 6816 VD  Arnhem", banen="De Edese" GC Papendal(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/32/edese-papendal'
WHERE id IN (
  '69505ed1-0293-43f8-b8e6-4a79f116cb9e',
  '8872b13b-8978-4d38-893a-48445baf0c40'
);
```

### Eindhovensche (Netherlands, 1 courses)

- DB: lat=51.3699012, lon=5.4760304, addr="Eindhovenseweg 300, Valkenswaard", website=null
- NGF (high, sim=1): name="Eindhovensche", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/6/eindhovensche", email="info@eindhovenschegolf.nl"
- OSM (medium, 475m, sim=1): name="Eindhovensche Golf", website="https://www.eindhovenschegolf.nl/", addr=null
- LC  (high, 129m, sim=1): name="Eindhovensche Golf", addr="Eindhovenseweg 300, 5553 VB  Valkenswaard", banen=De Eindhovensche(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/6/eindhovensche'
WHERE id IN (
  '53b2c619-86e7-4cf2-aef9-dcbd7c5fc989'
);
```

### ESTEC Golf Club (Netherlands, 1 courses)

- DB: lat=52.220697, lon=4.4201655, addr="Keplerlaan 1, Noordwijk", website=null
- NGF (high, sim=1): name="ESTEC", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/511/estec", email="info@egcgolf.nl"
- OSM (medium, 462m, sim=1): name="ESTEC Golf Club", website="https://www.egcgolf.nl/", addr=null
- LC  (low, 664m, sim=1): name="Estec Golf Club", addr="Keplerlaan 1, 2201 AZ  Noordwijk", banen=Estec Golf Club(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/511/estec'
WHERE id IN (
  'e0422de0-5277-4971-9d07-4c189bbb5b3d'
);
```

### GC Dirkshorn (Netherlands, 1 courses)

- DB: lat=52.7560698, lon=4.7869704, addr="Groenvelderweg 3, Dirkshorn", website=null
- NGF (high, sim=1): name="Dirkshorn", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/153/dirkshorn", email="receptie@golfbaandirkshorn.nl"
- OSM (medium, 426m, sim=1): name="Golfbaan Dirkshorn", website="https://golfbaandirkshorn.nl/", addr=null
- LC  (medium, 311m, sim=1): name="Golfbaan Dirkshorn", addr="Groenvelderweg 3, 1746 EE, Dirkshorn", banen=Golfbaan Dirkshorn(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/153/dirkshorn'
WHERE id IN (
  '7254815c-d028-418c-aad3-28f5b35dfb32'
);
```

### GC Geijsteren (Netherlands, 1 courses)

- DB: lat=51.5371024, lon=6.0555552, addr="Het Spekt 2, Geijsteren", website=null
- NGF (high, sim=1): name="Geijsteren", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/20/geijsteren", email="secretariaat@golfclubgeijsteren.nl"
- OSM (low, 233m, sim=0.455): name="Golf- & Countryclub Geijsteren", website="https://www.golfclubgeijsteren.nl/", addr=null
- LC  (high, 69m, sim=1): name="Geijsteren Golf & Country Club", addr="Het Spekt 2, 5862 AZ  Geijsteren (navigatie; Blauwe Steen Wanssum)", banen=Geijsteren Golf & Country Club(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/20/geijsteren'
WHERE id IN (
  'cd479794-846c-4d6b-b2f8-711b7b5ce4fa'
);
```

### Golf  Country Club Liemeer (Netherlands, 3 courses)

- DB: lat=52.1896037, lon=4.7436161, addr="Golfpad 1, Nieuwveen", website=null
- NGF (high, sim=1): name="Liemeer", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/147/liemeer", email="info@golfclubliemeer.nl"
- OSM (high, 32m, sim=1): name="Golf- & Country Club Liemeer", website="https://www.golfclubliemeer.nl/", addr=null
- LC  (low, 43m, sim=0.318): name="Golf- en Countryclub Liemeer", addr="Golfpad 1, 2441 EW  Nieuwveen", banen=Bovenlandenbaan(9); Torenbaan(18)

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/147/liemeer'
WHERE id IN (
  '0582ef65-5937-42a4-895c-a490be1b1cc6',
  'a31ba596-4066-493f-aa01-7785e1223f65',
  'cf9c74fa-5dac-4c51-9f31-089c3772770d'
);
```

### Golf & Country Club Lauswolt (Netherlands, 1 courses)

- DB: lat=53.0564177, lon=6.0888932, addr="Van Harinxmaweg 8-A, Beetsterzwaag", website=null
- NGF (high, sim=1): name="Lauswolt", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/18/lauswolt", email="algemeen@golfclublauswolt.nl"
- OSM (low, 621m, sim=0.4): name="Golf & Countryclub Lauswolt", website="https://www.golfclublauswolt.nl/", addr=null
- LC  (high, 211m, sim=1): name="Golf & Country Club Lauswolt", addr="van Harinxmaweg 8a, 9244 CJ Beetsterzwaag", banen=Lauswolt(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/18/lauswolt'
WHERE id IN (
  'b65ec8c7-5da2-49ff-8226-86e27c1a5da8'
);
```

### Golf & Country Club Winterswijk (Netherlands, 2 courses)

- DB: lat=51.9851601, lon=6.7684584, addr="Vredenseweg 150, Winterswijk", website=null
- NGF (no-match, sim=0.545): name="Rijswijk", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/54/rijswijk", email="caddiemaster@rijswijksegolf.nl"
- OSM (high, 83m, sim=1): name="Golf & Country Club Winterswijk", website="https://www.golfclubwinterswijk.nl/", addr=null
- LC  (low, 583m, sim=1): name="Golf & Country Club Winterswijk", addr="Vredenseweg 150, 7113 AE Winterwijk", banen=de Voortwisch(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 83m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfclubwinterswijk.nl/'
WHERE id IN (
  '1972abcc-ff63-4a97-b601-5e868c5442fe',
  'efb8755a-fe8c-4d53-af91-cfd4ea271bf2'
);
```

### Golf Club Spaarnwoude (Netherlands, 5 courses)

- DB: lat=52.4309159, lon=4.6989991, addr="Het Hoge Land 2, Velsen-Zuid", website=null
- NGF (high, sim=1): name="Spaarnwoude", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/29/spaarnwoude", email="info@golfbaanspaarnwoude.nl"
- OSM (low, 583m, sim=1): name="Golfbaan Spaarnwoude", website="https://www.golfbaanspaarnwoude.nl/", addr=null
- LC  (high, 26m, sim=1): name="Golfbaan Spaarnwoude", addr="Het Hoge Land 2, 1981 LT Velsen-Zuid", banen=Pitch & Putt (12 holes)(12); Championship Course (C)(9); Course F (Par 3)(9); Championship Course (E/D)(18); Course A(9); Course B(9)

**Proposed UPDATE** (alle 5 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/29/spaarnwoude'
WHERE id IN (
  '26ecd611-4afe-4536-87aa-d6eda757a15a',
  '52ae8f77-5834-47a1-9752-db8f69e6a5c9',
  '9055d1aa-c879-4cc8-9783-66ad531ddc40',
  'ade30586-a0d3-4552-bd81-14b9e02b2c13',
  'e193894a-1008-4345-a225-232c3a968e3a'
);
```

### Golf Course Kromme Rijn (Netherlands, 2 courses)

- DB: lat=52.0679508, lon=5.2115014, addr="Sportlaan 6, Bunnik", website=null
- NGF (high, sim=1): name="Kromme Rijn", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/120/kromme-rijn", email="secretariaat@krommerijn.nl"
- OSM (medium, 312m, sim=1): name="Golfbaan Kromme Rijn", website="https://www.krommerijn.nl/", addr=null
- LC  (high, 82m, sim=1): name="Golfbaan Kromme Rijn", addr="Sportlaan 6, 3981 HP Bunnik", banen=Golfbaan Kromme Rijn(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/120/kromme-rijn'
WHERE id IN (
  '67c8b626-8f82-4f1c-bbdb-d49af3eee4f9',
  '8d9c8fcd-7920-4e64-83f9-0339eca3e101'
);
```

### Golf Kleiburg (Netherlands, 1 courses)

- DB: lat=51.9254899, lon=4.1613043, addr="Krabbeweg 9, Brielle", website=null
- NGF (high, sim=1): name="Kleiburg", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/21/kleiburg", email="info@golfclub-kleiburg.nl"
- OSM (medium, 277m, sim=1): name="Golfclub Kleiburg", website="https://golfclub-kleiburg.nl/", addr=null
- LC  (high, 67m, sim=1): name="Golfclub Kleiburg", addr="Krabbeweg 9, 3231 NB, Brielle", banen=Kleiburg(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/21/kleiburg'
WHERE id IN (
  '12693fc8-3db6-4bb2-b2c4-243df6007259'
);
```

### Golf Wouwse Plantage (Netherlands, 1 courses)

- DB: lat=51.4760723, lon=4.3612901, addr="Zoomvlietweg 66, Bergen op Zoom", website=null
- NGF (high, sim=1): name="Wouwse Plantage", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/28/wouwse-plantage", email="secretariaat@golfwouwseplantage.nl"
- OSM (medium, 260m, sim=1): name="Golfclub Wouwse Plantage", website="https://www.golfwouwseplantage.nl/", addr=null
- LC  (high, 231m, sim=1): name="Golfclub Wouwse Plantage", addr="Zoomvlietweg 66, 4624 RP Bergen op Zoom", banen=Wouwse Plantage(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/28/wouwse-plantage'
WHERE id IN (
  '5f87812d-b526-4257-a995-d56e5a578e50'
);
```

### Golfbaan Bentwoud (Netherlands, 10 courses)

- DB: lat=52.0734311, lon=4.5722349, addr="Boslaan 3,, Benthuizen", website=null
- NGF (high, sim=1): name="Bentwoud", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/757/bentwoud", email="info@golfbaanbentwoud.nl"
- OSM (high, 208m, sim=1): name="Golfbaan Bentwoud", website="https://www.golfbaanbentwoud.nl/", addr=null
- LC  (high, 131m, sim=1): name="Golfbaan Bentwoud", addr="Boslaan 3, 2731 LD Benthuizen", banen=Lus Zuidwoud en Westwoud (B + C)(18); Par 3/4 baan(9); Lus Oostwoud en Westwoud (A + C)(18); Lus Oostwoud en Zuidwoud (A + B)(18)

**Proposed UPDATE** (alle 10 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/757/bentwoud'
WHERE id IN (
  '0fcf99cf-f6f5-4623-a05e-915dc6ad0676',
  '1e6d027c-f08c-4339-8165-1dc8966dfa0a',
  '205272c6-825e-4f6f-b607-5efcc38d53f0',
  '2a739c55-5855-495e-8fbc-ad5dc6c80323',
  '7fd90c7f-4934-4955-9b6b-f481df749e17',
  '893619ff-3f4e-495e-a2e1-37b2b86b96a0',
  'b6d2d6a3-40df-4357-8ece-85e785987ef9',
  'bbe76f61-7d58-4bab-abad-39230e6b986a',
  'dabb737e-4879-40d6-a9fd-262206d801b7',
  'e702066d-9097-4957-847a-a52993d37edd'
);
```

### Golfbaan Catharinenburg (Netherlands, 2 courses)

- DB: lat=51.7739428, lon=4.0575558, addr="Bouwdijk 9, Melissant", website=null
- NGF (high, sim=1): name="Catharinenburg", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/128/catharinenburg", email="info@catharinenburg.nl"
- OSM (medium, 422m, sim=1): name="Golfbaan Catharinenburg", website="https://www.catharinenburg.nl/", addr=null
- LC  (low, 20m, sim=0.583): name="Golfbaan Catharinenburg (Roxenisse)", addr="Bouwdijk 9, 3248 LA, Melissant", banen=9 Holes(18); Catharinenburg(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/128/catharinenburg'
WHERE id IN (
  '309e7b2f-5844-4a38-b02b-50c2b558630f',
  '44b0509a-4a14-4a5a-bbcf-7abefe2e7d26'
);
```

### Golfbaan De Swinkelsche (Netherlands, 2 courses)

- DB: lat=51.3755384, lon=5.6689323, addr="Maarheezerdijk 10, Someren", website=null
- NGF (high, sim=1): name="De Swinkelsche", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/164/de-swinkelsche", email="info@golfbaandeswinkelsche.nl"
- OSM (high, 96m, sim=1): name="Golfbaan de Swinkelsche", website="https://www.golfbaandeswinkelsche.nl/", addr=null
- LC  (high, 216m, sim=1): name="Golfbaan De Swinkelsche", addr="Maarheezerdijk 12, 5712 PC Someren", banen=Peelrijtbaan (Par 3 course)(9); Championship course(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/164/de-swinkelsche'
WHERE id IN (
  '24633ae4-bd7d-4f60-b923-d96043c74382',
  '30b06d46-a533-421a-a433-74bd4257a307'
);
```

### Golfbaan Delfland (Netherlands, 10 courses)

- DB: lat=51.9791483, lon=4.3281679, addr="Abtsrechtseweg 1, Schipluiden", website=null
- NGF (high, sim=1): name="Delfland", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/717/delfland", email="info@delflandgolf.nl"
- OSM (high, 76m, sim=1): name="Golfbaan Delfland", website="https://delflandgolf.nl/", addr=null
- LC  (high, 62m, sim=1): name="Golfbaan Delfland", addr="Abtsrechtseweg 1, Schipluiden (via A4 afslag Delft of A13 e/o N470)", banen=C. Blauwe lus (C-Course)(9); Challenge Course (Par 3)(9); A. Rode lus (A-Course)(9); B. Gele lus (B-Course)(9)

**Proposed UPDATE** (alle 10 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/717/delfland'
WHERE id IN (
  '4617efc1-33a7-4156-b866-b2658bd461a6',
  '61461b1d-439c-4910-8039-9e9fd1cca796',
  '8f92329c-2460-472d-aae8-d4db0050949b',
  '930ba42c-d03e-4b14-962c-e7b84dd81eec',
  'b7b0861d-51f5-4b60-add3-479e71a66813',
  'bef0b787-3cd3-4cb8-ba42-1e7c4b091a79',
  'e0097aa8-00b1-46e8-b6fd-220b1452b15c',
  'f8cbe8ec-7e94-45a8-9f17-471e9348e4d6',
  'fa7f002d-9cd0-4f1d-938e-a82dd729da40',
  'fee56b2a-4682-48e4-81c5-386e0b4af624'
);
```

### golfbaan Dongen (Netherlands, 1 courses)

- DB: lat=51.6217043, lon=4.9156548, addr="Duiventorenbaan 2, Dongen", website=null
- NGF (high, sim=1): name="Dongen", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/119/dongen", email="info@golfdongen.nl"
- OSM (low, 833m, sim=0.333): name="Golfcentrum Dongen", website="https://www.golfcentrumdongen.nl/", addr=null
- LC  (low, 598m, sim=0.333): name="Golfcentrum Dongen", addr="Zandeweg 2  5107 NM Dongen", banen=Golfcentrum Dongen(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/119/dongen'
WHERE id IN (
  'bccb68be-7597-432c-a1aa-d117fa1f8c1f'
);
```

### Golfbaan Echt-Susteren (Netherlands, 1 courses)

- DB: lat=51.070797, lon=5.8897082, addr="Hommelweg 3, Susteren", website=null
- NGF (high, sim=1): name="Echt-Susteren", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/152/echt-susteren", email="info@golfbaanecht-susteren.nl"
- OSM (high, 130m, sim=1): name="Golfbaan Echt-Susteren", website="https://www.golfbaanecht-susteren.nl/", addr=null
- LC  (high, 85m, sim=1): name="Golfbaan Echt-Susteren", addr="Hommelweg 3, 6114 RR Susteren", banen=Golfbaan Echt-Susteren(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/152/echt-susteren'
WHERE id IN (
  'a096a480-8004-44ea-a975-fa134d9d45a6'
);
```

### Golfbaan Eyckenduyn (Netherlands, 1 courses)

- DB: lat=51.318116, lon=6.0048378, addr="Kesselseweg 9, Helden", website=null
- NGF (high, sim=1): name="Eyckenduyn", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/619/eyckenduyn", email="info@eyckenduyn.nl"
- OSM (high, 119m, sim=1): name="Golfbaan Eyckenduyn", website="https://www.eyckenduyn.nl/", addr=null
- LC  (low, 44m, sim=0.526): name="Landgoed Eyckenduyn", addr="Kesselseweg 9, 5988 CC Helden", banen=Golfbaan Eyckenduyn(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/619/eyckenduyn'
WHERE id IN (
  '1ddb8dfe-a7fc-4337-80d3-f2b4351759e8'
);
```

### Golfbaan Heidemeer (Netherlands, 1 courses)

- DB: lat=52.9376148, lon=5.9392616, addr="Heidemeer 2, Heerenveen", website=null
- NGF (high, sim=1): name="Heidemeer", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/102/heidemeer", email="golfbaanheidemeer@live.nl"
- OSM (medium, 493m, sim=1): name="Golfclub Heidemeer", website="https://golfclubheidemeer.nl/", addr=null
- LC  (high, 34m, sim=1): name="Golfclub Heidemeer", addr="Heidemeer 2, 8445 SB Heerenveen", banen=Golfclub Heidemeer(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/102/heidemeer'
WHERE id IN (
  '117589c4-e6b0-436a-a6c0-fb42cecae62a'
);
```

### Golfbaan Het Rijk van Margraten (Netherlands, 2 courses)

- DB: lat=50.8384478, lon=5.7574572, addr="Bemelerweg 99, Cadier en Keer", website=null
- NGF (high, sim=1): name="Het Rijk van Margraten", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/142/het-rijk-van-margraten", email="generalmanager@golfbaanhetrijkvanmargraten.nl"
- OSM (high, 13m, sim=1): name="Het Rijk van Margraten", website="https://www.golfenophetrijk.nl/margraten.html", addr=null
- LC  (high, 185m, sim=1): name="Het Rijk van Margraten", addr="Bemelerweg 99, 6267 AL Cadier en Keer", banen=Short Golf Par-3(9); Het Rijk van Margraten(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/142/het-rijk-van-margraten'
WHERE id IN (
  '3b94240a-a3db-43b7-ac2f-9dce6ec7a96a',
  '5687258e-3d87-44a9-a4d7-3305164416ff'
);
```

### Golfbaan het Rijk van Nunspeet (Netherlands, 9 courses)

- DB: lat=52.3695506, lon=5.8063004, addr="Plesmanlaan 30, Nunspeet", website=null
- NGF (high, sim=1): name="Het Rijk van Nunspeet", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/53/het-rijk-van-nunspeet", email="info@golfbaanhetrijkvannunspeet.nl"
- OSM (high, 198m, sim=1): name="Golfbaan Het Rijk van Nunspeet", website="https://www.golfenophetrijk.nl/nunspeet.html", addr=null
- LC  (low, 544m, sim=1): name="Het Rijk van Nunspeet", addr="Plesmanlaan 30, 8072 PT Nunspeet", banen=Noord-Oost Course (N-E)(18); Oost-Zuid Course (E-S)(18); Noord-Zuid Course (N-S)(18)

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/53/het-rijk-van-nunspeet'
WHERE id IN (
  '27382df9-bebb-4103-88a3-a655efc26537',
  '3ac1b4ce-0e50-4d28-8d26-7bccd98b1765',
  '3fdabed5-ef11-486d-a53a-226b43da36c8',
  '8ec81398-4d92-4fa1-8f56-4b3314635e4f',
  '902b4ae8-ebcc-4591-af46-2d345ad075a2',
  '99db8d94-d38f-42e7-9fb3-61b1a7844958',
  'afdc4db6-22cc-43dc-a6c9-b5124e21e184',
  'b448ff30-f1aa-49ff-86e5-e70816369786',
  'cc6e8607-fa55-4f5a-8f3e-34406b3192af'
);
```

### Golfbaan Het Wedde (Netherlands, 1 courses)

- DB: lat=52.1393526, lon=4.4521365, addr="Richard Wagnerlaan 85,  Voorschoten", website=null
- NGF (high, sim=1): name="Het Wedde", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/607/het-wedde", email="hetwedde@sportfondsen.nl"
- OSM (high, 116m, sim=1): name="Golfbaan Het Wedde", website="https://www.golfbaanhetwedde.nl/", addr=null
- LC  (high, 15m, sim=1): name="Golfbaan Het Wedde", addr="Richard Wagnerlaan 85, 2253 CD Voorschoten", banen=Het Wedde(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/607/het-wedde'
WHERE id IN (
  '2e9d9afa-c41c-4a7d-972c-b46d2f0f4a80'
);
```

### Golfbaan Kralingen (Netherlands, 1 courses)

- DB: lat=51.9281146, lon=4.5336601, addr="Kralingseweg 200, Rotterdam", website=null
- NGF (high, sim=1): name="Kralingen", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/9/kralingen", email="info@golfbaankralingen.nl"
- OSM (low, 613m, sim=1): name="Golfbaan Kralingen", website="https://www.golfbaankralingen.nl/", addr=null
- LC  (high, 43m, sim=1): name="Golfbaan Kralingen", addr="Kralingseweg 200, 3062 CG Rotterdam", banen=Openbare Golfbaan Kralingen(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/9/kralingen'
WHERE id IN (
  'ff8eed1d-ed4c-4b66-ba82-5a407b4812b8'
);
```

### Golfbaan Kurenpolder (Netherlands, 1 courses)

- DB: lat=51.7224294, lon=4.8783649, addr="Kurenpolderweg 31, Hank", website=null
- NGF (high, sim=1): name="Kurenpolder", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/104/kurenpolder", email="info@golfparkdekurenpolder.nl"
- OSM (low, 507m, sim=0.55): name="Golfpark De Kurenpolder", website="https://golfparkdekurenpolder.nl/", addr=null
- LC  (low, 902m, sim=0.55): name="Golfpark De Kurenpolder", addr="Kurenpolderweg 33, 4273 LA HANK", banen=Grote baan, 9 holes(9); Kleine baan, 9 holes(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/104/kurenpolder'
WHERE id IN (
  '091a731b-dcc6-4fda-aa13-c1e9ead1ddf3'
);
```

### Golfbaan Landgoed Welderen (Netherlands, 2 courses)

- DB: lat=51.9424157, lon=5.8298873, addr="Grote Molenstraat 173, Elst", website=null
- NGF (high, sim=1): name="Landgoed Welderen", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/103/landgoed-welderen", email="info@welderen.nl"
- OSM (medium, 288m, sim=1): name="Golfbaan Landgoed Welderen", website="https://welderen.nl/golfen/", addr=null
- LC  (high, 103m, sim=1): name="Golfbaan Landgoed Welderen", addr="Grote Molenstraat 173, 6661 NH Elst", banen=9 holes par 3/4(9); Championship Course(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/103/landgoed-welderen'
WHERE id IN (
  '00661036-d2f5-4723-82ad-9389c641f171',
  'bea1a26e-a240-4100-8fb3-78bcbe613400'
);
```

### Golfbaan Ooghduyne (Netherlands, 1 courses)

- DB: lat=52.8952504, lon=4.7331982, addr="Ooghduyne 520, Julianadorp", website=null
- NGF (high, sim=1): name="Ooghduyne", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/82/ooghduyne", email="info@golfbaanooghduyne.nl"
- OSM (low, 518m, sim=1): name="Golfbaan Ooghduyne", website="https://golfbaanooghduyne.nl/", addr="Ooghduyne, 450, 1787PZ, Julianadorp"
- LC  (high, 179m, sim=1): name="Golfbaan Ooghduyne", addr="Ooghduyne 520, 1787 PC Julianadorp aan Zee", banen=Ooghduyne 9-holes(9); Familie-baan(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/82/ooghduyne'
WHERE id IN (
  'f31097ba-0a34-400e-a59b-0d928e2c5f74'
);
```

### Golfbaan Overloon (Netherlands, 1 courses)

- DB: lat=51.5766993, lon=5.9531214, addr="Kuluutweg 8 , Overloon", website=null
- NGF (high, sim=1): name="Overloon", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/636/overloon", email="info@golfbaanoverloon.nl"
- OSM (high, 240m, sim=1): name="Golfbaan Overloon", website="https://www.golfbaanoverloon.nl/", addr=null
- LC  (high, 16m, sim=1): name="Golfbaan Overloon", addr="Kuluutweg 8,  5825 BC Overloon", banen=Golfbaan Overloon(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/636/overloon'
WHERE id IN (
  '9d82b2bb-9b8c-42a5-afdc-1e9e08922063'
);
```

### Golfbaan Spierdijk (Netherlands, 1 courses)

- DB: lat=52.6537739, lon=4.9344947, addr="Wogmeer 86a, Spierdijk", website=null
- NGF (high, sim=1): name="Spierdijk", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/160/spierdijk", email="secretaris@golfclubdekoggen.nl"
- OSM (high, 65m, sim=1): name="Golfbaan Spierdijk", website="https://www.golfbaanspierdijk.nl/", addr="Wogmeer, 86a, 1643NH, Spierdijk"
- LC  (medium, 355m, sim=1): name="Golfbaan Spierdijk", addr="Wogmeer 86a, 1643 NH Spierdijk", banen=Golfbaan Spierdijk(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/160/spierdijk'
WHERE id IN (
  'f69a4271-6a63-47c3-b21c-8c873fbf5894'
);
```

### Golfbaan Westwoud (Netherlands, 1 courses)

- DB: lat=52.6663819, lon=5.1462274, addr="zittend 19, Westwoud", website=null
- NGF (high, sim=1): name="Westwoud", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/69/westwoud", email="caddiemaster@wfgc.nl"
- OSM (medium, 352m, sim=1): name="Golfbaan Westwoud", website="https://www.golfbaanwestwoud.nl/", addr="Zittend, 19, 1617KS, Westwoud"
- LC  (low, 235m, sim=0.421): name="Golfbaan Westwoud (Westfriese)", addr="Zittend 19, 1617 KS Westwoud", banen=Westfriese Golfclub(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/69/westwoud'
WHERE id IN (
  '3ad4116a-a95f-4291-b1cd-90465f1bbf3a'
);
```

### Golfbaan Zuid-Drenthe (Netherlands, 1 courses)

- DB: lat=52.6807109, lon=6.9412559, addr="Amsterdamscheveldlaan 9, Erica", website=null
- NGF (high, sim=1): name="Zuid-Drenthe", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/749/zuid-drenthe", email="Secretariaat@golfclubzuiddrenthe.nl"
- OSM (low, 646m, sim=1): name="Golfbaan Zuid-Drenthe", website="https://golfclubzuiddrenthe.nl/", addr=null
- LC  (high, 193m, sim=1): name="Golfbaan Zuid-Drenthe", addr="Amsterdamscheveldlaan 9, 7887 VD Erica", banen=Executive course(9); Par 3 Course(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/749/zuid-drenthe'
WHERE id IN (
  '50ec65c5-6e80-4a7c-93fe-4be4310c16eb'
);
```

### Golfcentrum Noordwijk (Netherlands, 1 courses)

- DB: lat=52.2279127, lon=4.4657492, addr="Van Berckelweg 38, Noordwijk", website=null
- NGF (no-match, sim=0.333): name="De Hoge Dijk", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/68/de-hoge-dijk", email="ledenadministratie@dehogedijk.nl"
- OSM (high, 106m, sim=0.81): name="Golf Centrum Noordwijk", website="https://www.golfcentrumnoordwijk.nl/", addr=null
- LC  (high, 1m, sim=0.81): name="Golf Centrum Noordwijk", addr="Van Berckelweg 38, 2203 LB, Noordwijk", banen=Golfcentrum Noordwijk(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 106m, sim=0.81)
```sql
UPDATE courses SET
  website = 'https://www.golfcentrumnoordwijk.nl/'
WHERE id IN (
  '13922923-d5c4-470c-a7e2-b4ea31c241ce'
);
```

### Golfclub ‘t Zelle (Netherlands, 2 courses)

- DB: lat=52.0611254, lon=6.3888663, addr="Vierblokkenweg 1, Hengelo (G)", website=null
- NGF (high, sim=1): name="’t Zelle", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/96/-t-zelle", email="info@gczelle.nl"
- OSM (high, 171m, sim=1): name="Golfclub 't Zelle", website="https://www.gczelle.nl/", addr=null
- LC  (medium, 438m, sim=1): name="Golfbaan 't Zelle", addr="Varsselseweg 45, 7255 NR Hengelo (Gld)", banen='t Zelle Wedstrijdbaan(18); 't Zelle Par 3 Course(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/96/-t-zelle'
WHERE id IN (
  '5a8bddfa-8209-411f-9e83-f775303ff94b',
  'e99e4fac-37a3-4da0-b1e5-c40e078407ea'
);
```

### Golfclub Almeerderhout (Netherlands, 9 courses)

- DB: lat=52.347253, lon=5.2884617, addr="Watersnipweg 19, Almere", website=null
- NGF (high, sim=1): name="Almeerderhout", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/46/almeerderhout", email="secretariaat@almeerderhout.nl"
- OSM (low, 539m, sim=1): name="Golfclub Almeerderhout", website="https://www.almeerderhout.nl/", addr=null
- LC  (high, 139m, sim=1): name="Golfclub Almeerderhout", addr="Watersnipweg 19-21, 1341 AA Almere", banen=Markermeer (Blauw)(9); Gooimeer (Geel)(9); IJmeer (Rood)(9)

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/46/almeerderhout'
WHERE id IN (
  '05e78bae-3cf8-414a-b3de-4ac2b630e5a8',
  '1615f4b8-fc78-4a5a-ab2f-970efd83e59d',
  '4247b982-6991-4cf7-8a76-f610cd8fdf76',
  '52fbe4e1-d007-47aa-b657-688cd668a609',
  '63263bc1-dda7-4740-9228-69454c0c4627',
  '8d333ded-e74d-44eb-bf40-50828534ae4f',
  'cb9865f9-7823-4964-a0f0-83e52792b7fc',
  'ddde0b1d-793c-4467-a9ce-f19f8e2e26ff',
  'f3133e0b-761c-4240-b9fe-e9985ba7d06b'
);
```

### Golfclub Amsterdam Old Course (Netherlands, 1 courses)

- DB: lat=52.3185079, lon=4.9365233, addr="Zwartelaantje 4, Amsterdam", website=null
- NGF (high, sim=1): name="Amsterdam Old Course", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/57/amsterdam-old-course", email="info@amsterdamoldcourse.nl"
- OSM (high, 223m, sim=1): name="Amsterdam Old Course", website="https://www.amsterdamoldcourse.nl/", addr=null
- LC  (high, 28m, sim=1): name="Golfclub Amsterdam Old Course", addr="Zwarte Laantje 4, 1114 BA Amsterdam", banen=Amsterdam Old Course(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/57/amsterdam-old-course'
WHERE id IN (
  '54a3a4e1-1ebe-4221-9a37-fffaddcc7701'
);
```

### Golfclub Anderstein (Netherlands, 9 courses)

- DB: lat=52.0634892, lon=5.3974484, addr="Woudenbergseweg 13A, Maarsbergen", website=null
- NGF (high, sim=1): name="Anderstein", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/45/anderstein", email="info@golfclubanderstein.nl"
- OSM (high, 16m, sim=1): name="Golfclub Anderstein", website="https://www.golfclubanderstein.nl", addr="Woudenbergseweg, 13a, 3953ME, Maarsbergen"
- LC  (low, 503m, sim=1): name="Golfclub Anderstein", addr="Woudenbergseweg 13a, 3953 ME Maarsbergen", banen=CA Heide - Vallei(18); AB Vallei - Heuvelrug(18); BC Heuvelrug - Heide(18)

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/45/anderstein'
WHERE id IN (
  '0e14a04c-b7d5-41da-9ae9-f206108f89c1',
  '1377d908-660c-401f-87d5-ecbb75b9df50',
  '489effe1-a7de-4a8e-aff6-43921ba27c1d',
  '6fb809b3-c070-4426-864a-7671f7fdff68',
  '89d9f1d7-219c-4300-b27f-a9db10fef5ee',
  '9050042d-1c10-4c56-86de-b27a68ff079b',
  'a89d2c05-d102-4c53-9105-800897995c12',
  'c9f96009-fcb8-4420-887d-554181651419',
  'e882d907-0ee6-49fc-819a-6513fb7aabc2'
);
```

### Golfclub Broekpolder (Netherlands, 1 courses)

- DB: lat=51.9364828, lon=4.3154059, addr="Watersportweg 100, Vlaardingen", website=null
- NGF (high, sim=1): name="Broekpolder", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/30/broekpolder", email="secretariaat@golfclubbroekpolder.nl"
- OSM (high, 184m, sim=1): name="Golfclub Broekpolder", website="https://golfclub-broekpolder.nl/", addr=null
- LC  (high, 43m, sim=1): name="Golfclub Broekpolder", addr="Watersportweg 100, 3138 HD Vlaardingen", banen=Golfclub Broekpolder(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/30/broekpolder'
WHERE id IN (
  '5d97c1b6-b8c6-42c3-bbe2-0065e5ff344a'
);
```

### Golfclub Cromstrijen (Netherlands, 2 courses)

- DB: lat=51.7225605, lon=4.4145578, addr="Veerweg 26, Numansdorp", website=null
- NGF (high, sim=1): name="Cromstrijen", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/66/cromstrijen", email="info@golfclubcromstrijen.nl"
- OSM (medium, 471m, sim=1): name="Golfclub Cromstrijen", website="https://golfclubcromstrijen.nl/", addr=null
- LC  (high, 126m, sim=1): name="Golfclub Cromstrijen", addr="Veerweg 26, 3281 LX Numansdorp", banen=Championship course(27); Challenge Course(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/66/cromstrijen'
WHERE id IN (
  '960782ec-1a5d-4d8c-ae58-b69e28d9fb30',
  '9f7b6b1e-e6de-4afc-9e18-8d3eb430a2d4'
);
```

### Golfclub De Berckt (Netherlands, 1 courses)

- DB: lat=51.342196, lon=6.1112203, addr="De Berckt 1, Baarlo", website=null
- NGF (high, sim=1): name="De Berckt", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/169/de-berckt", email="bart@golfclubdeberckt.nl"
- OSM (medium, 339m, sim=1): name="Golfclub de Berckt", website="https://www.golfclubdeberckt.nl", addr=null
- LC  (high, 62m, sim=1): name="Golfclub De Berckt", addr="Berckt 1, 5591 PD Baarlo", banen=Golfbaan De Berckt(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/169/de-berckt'
WHERE id IN (
  '44345269-c090-48a2-a5f1-35cb79a8a341'
);
```

### Golfclub De Compagnie (Netherlands, 1 courses)

- DB: lat=53.1127195, lon=6.850044, addr="Golflaan 1, Veendam", website=null
- NGF (high, sim=1): name="De Compagnie", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/79/de-compagnie", email="info@gcdecompagnie.nl"
- OSM (medium, 388m, sim=1): name="Golfclub de Compagnie", website="https://www.golfclubveendam.nl/", addr="Golflaan, 1, 9646DS, Veendam"
- LC  (low, 228m, sim=0.5): name="Golfclub Landgoed De Compagnie", addr="Golflaan 1, 9646 DS Veendam", banen=9 Holes Par 3-baan 'Pay&Play'(9); Championship Course De Compagnie(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/79/de-compagnie'
WHERE id IN (
  'd523f730-6a7f-4575-8c86-0420bab2e29f'
);
```

### Golfclub de Dommel (Netherlands, 1 courses)

- DB: lat=51.6256213, lon=5.3392352, addr="Zegenwerp 12, Sint-Michielsgestel", website=null
- NGF (high, sim=1): name="De Dommel", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/11/de-dommel", email="info@gcdedommel.nl"
- OSM (medium, 460m, sim=1): name="Golfclub de Dommel", website="https://www.gcdedommel.nl/", addr="Zegenwerp, 12, 5271, Sint-Michielsgestel"
- LC  (high, 220m, sim=1): name="Golfclub de Dommel", addr="Zegenwerp 12, 5271 NC  St. Michielsgestel", banen=Course A(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/11/de-dommel'
WHERE id IN (
  '6ee3a71f-baac-4436-ad87-e652a59faeb0'
);
```

### Golfclub de Haar (Netherlands, 1 courses)

- DB: lat=52.1181891, lon=4.9849364, addr="Parkweg 5, Vleuten", website=null
- NGF (high, sim=1): name="De Haar", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/12/de-haar", email="info@gcdehaar.nl"
- OSM (low, 568m, sim=1): name="Golfclub De Haar", website="https://www.gcdehaar.nl/", addr=null
- LC  (high, 18m, sim=1): name="Golfclub De Haar", addr="Parkweg 5, 3455 RH Haarzuilens", banen=De Haar (18H)(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/12/de-haar'
WHERE id IN (
  '7f2bf86d-1981-494d-adf6-a1f1a14ceeca'
);
```

### Golfclub De Semslanden (Netherlands, 1 courses)

- DB: lat=52.9856743, lon=6.8067103, addr="Nieuwe Dijk 1, Gasselternijveen", website=null
- NGF (high, sim=1): name="Semslanden", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/64/semslanden", email="secretariaat@semslanden.nl"
- OSM (medium, 315m, sim=1): name="Golfclub de Semslanden", website="https://semslanden.nl/", addr=null
- LC  (low, 965m, sim=1): name="Golfclub 'de Semslanden'", addr="Nieuwe Dijk 1, 9514 BX Gasselternijveen", banen=Wedstrijdbaan 18 holes(18); Par 3 oefenbaan 9 holes(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/64/semslanden'
WHERE id IN (
  '69331766-08b7-4ad1-9bb7-c324ee4dd9d9'
);
```

### Golfclub Dorhout Mees (Netherlands, 4 courses)

- DB: lat=52.4098599, lon=5.67777, addr="Strandgaperweg 30, Biddinghuizen", website=null
- NGF (high, sim=1): name="Dorhout Mees", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/118/dorhout-mees", email="golf@dorhoutmees.nl"
- OSM (medium, 299m, sim=1): name="Golfbaan Dorhout Mees", website="https://www.dorhoutmeesgolf.nl/", addr=null
- LC  (low, 598m, sim=1): name="Golfclub Dorhout Mees", addr="Strandgaperweg 30, 8256 PZ Biddinghuizen", banen=Dorhout Mees - Links Course(9)

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/118/dorhout-mees'
WHERE id IN (
  '05aa12e8-4a9b-4ad2-9265-70469596c69b',
  '5c13427c-ec4a-4fce-83d4-ad303af997de',
  '8eeeb94b-339d-477b-b09c-ae00e0467f42',
  'baffa312-643e-4295-9081-8675ec9db21f'
);
```

### Golfclub Duurswold (Netherlands, 1 courses)

- DB: lat=53.2652117, lon=6.8385598, addr="Roegeweg 2, Steendam", website=null
- NGF (high, sim=1): name="Duurswold", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/159/duurswold", email="info@golfclubduurswold.nl"
- OSM (low, 242m, sim=0.474): name="Groningse Golfclub Duurswold", website="https://golfclubduurswold.nl/", addr=null
- LC  (high, 48m, sim=1): name="Golfclub Duurswold", addr="Roegeweg 2, 9629 PA, Steendam", banen=Golfbaan Duurswold(9); 6-hole Par 3(6)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/159/duurswold'
WHERE id IN (
  '69b233ff-8217-41e3-91cd-a40e84afb73e'
);
```

### Golfclub Emmeloord (Netherlands, 2 courses)

- DB: lat=52.7362817, lon=5.7819472, addr="Casteleynsweg 6, Emmeloord", website=null
- NGF (high, sim=1): name="Emmeloord", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/158/emmeloord", email="info@golfclub-emmeloord.nl"
- OSM (high, 3m, sim=1): name="Golfclub Emmeloord", website=null, addr="Casteleynsweg, 6, 8305AN, Emmeloord"
- LC  (medium, 330m, sim=1): name="Golfclub Emmeloord", addr="Casteleynsweg 6, 8300 AK, Emmeloord", banen=Golfbaan Emmeloord(9); Par 3 golfbaan(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/158/emmeloord'
WHERE id IN (
  '80514ac8-7b6f-42de-b819-83c156f99c5d',
  'd125fc4c-2b47-48b4-9718-2593d47223f0'
);
```

### Golfclub Flevoland (Netherlands, 2 courses)

- DB: lat=52.5443175, lon=5.4562605, addr="Parlaan 2A, Lelystad", website=null
- NGF (high, sim=1): name="Flevoland", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/72/flevoland", email="info@gcflevoland.nl"
- OSM (low, 1013m, sim=1): name="Golfclub Flevoland", website="https://www.gcflevoland.nl/", addr=null
- LC  (high, 228m, sim=1): name="Golfclub Flevoland", addr="Parlaan 2a, 8241 BG Lelystad", banen=18-holes baan(12)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/72/flevoland'
WHERE id IN (
  '0890b647-3cc9-4d6c-bb55-06e8b1c6cfc7',
  'ade2540d-ced6-4c95-b07e-ed35fedfaa67'
);
```

### Golfclub Gaasterland (Netherlands, 1 courses)

- DB: lat=52.8707469, lon=5.5448287, addr="Sminkewei 10, Oudemirdum", website=null
- NGF (high, sim=1): name="Gaasterland", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/133/gaasterland", email="info@golfclubgaasterland.nl"
- OSM (medium, 384m, sim=1): name="Golfclub Gaasterland", website="https://golfclubgaasterland.nl/", addr=null
- LC  (low, 579m, sim=1): name="Golfclub Gaasterland", addr="Sminkewei 10, 8567 HB  Oudemirdum", banen=Gaasterland(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/133/gaasterland'
WHERE id IN (
  'e9267fbe-db38-42c8-b382-ab7e1d773346'
);
```

### Golfclub Golfresidentie Dronten (Netherlands, 1 courses)

- DB: lat=52.5000628, lon=5.7139283, addr="Golfresidentie 127, Dronten", website=null
- NGF (high, sim=1): name="Golfresidentie Dronten", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/112/golfresidentie-dronten", email="RHCie@golfresidentie.nl"
- OSM (low, 411m, sim=0.818): name="Golf Residentie Dronten", website="https://golfresidentie.nl/", addr=null
- LC  (low, 343m, sim=0.818): name="Golfclub Golf Residentie Dronten", addr="Golfresidentie 129, 8251 NS Dronten", banen=Dronten Golfclub Golfresidentie(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/112/golfresidentie-dronten'
WHERE id IN (
  'c86b6ead-dd9d-4b10-956a-2b4f1d21253d'
);
```

### Golfclub Grevelingenhout (Netherlands, 2 courses)

- DB: lat=51.6698489, lon=4.0619094, addr="Oudendijk 3, Bruinisse", website=null
- NGF (high, sim=1): name="Grevelingenhout", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/58/grevelingenhout", email="golfclub@grevelingenhout.nl"
- OSM (medium, 405m, sim=1): name="Golfclub Grevelingenhout", website="https://www.grevelingenhout.nl/", addr=null
- LC  (high, 126m, sim=1): name="Golfclub Grevelingenhout", addr="Oudendijk 3, 4311 NA Bruinisse", banen=Golfclub 'Grevelingenhout'(18); Golfclub Grevelingenhout Par-3 baan(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/58/grevelingenhout'
WHERE id IN (
  '833a68a9-b0ed-4641-9c59-0d4e035ec29a',
  'c9155398-80a4-4c52-a7a3-d154baac7603'
);
```

### Golfclub Havelte (Netherlands, 1 courses)

- DB: lat=52.7840508, lon=6.2479983, addr="Kolonieweg 2, Havelte", website=null
- NGF (high, sim=1): name="Havelte", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/63/havelte", email="info@golfclubhavelte.nl"
- OSM (medium, 329m, sim=1): name="Golf Club Havelte", website="https://www.golfclubhavelte.nl/", addr=null
- LC  (high, 43m, sim=1): name="Golfclub Havelte", addr="Kolonieweg 2, 7971 RA Havelte", banen=Golf Club Havelte(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/63/havelte'
WHERE id IN (
  '6fa1da6b-31ee-4ad1-9d81-169be1365345'
);
```

### Golfclub Heelsum (Netherlands, 9 courses)

- DB: lat=51.987856, lon=5.7564158, addr="Ginkelseweg 14, Heelsum", website=null
- NGF (high, sim=1): name="Heelsum", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/136/heelsum", email="info@gcheelsum.nl"
- OSM (medium, 336m, sim=1): name="Golfclub Heelsum", website="https://gcheelsum.nl/nl", addr=null
- LC  (high, 15m, sim=1): name="Golfclub Heelsum", addr="Ginkelseweg 14, 6866 DZ Heelsum", banen=Sandr(9); Airborne(9); Helsum(9)

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/136/heelsum'
WHERE id IN (
  '3932e2c7-463f-4370-abf4-25bb73128769',
  '9a1c4456-3e5c-4258-90c1-14df3865a00a',
  '9adf674c-0856-43e1-bf41-48967f73b9b0',
  'b3ffa2a7-749a-4479-9af1-82ffcec4577c',
  'b5a4a8a1-2fad-4b27-80dc-a52d6479a8b2',
  'c2347918-bf80-44a4-bf7f-c8f0423b260c',
  'c33d5462-7292-4d5b-ae6f-0bde366a1439',
  'c8962b11-fbc0-48a5-a9c3-6c49c89d396b',
  'e93d4357-7430-4d82-b6e0-8048a7320743'
);
```

### Golfclub Holthuizen (Netherlands, 2 courses)

- DB: lat=53.1439724, lon=6.4480057, addr="Oosteinde 7a, Roden", website=null
- NGF (high, sim=1): name="Holthuizen", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/39/holthuizen", email="info@golfclubholthuizen.nl"
- OSM (medium, 393m, sim=1): name="Golfclub Holthuizen", website="https://golfclubholthuizen.nl/", addr=null
- LC  (high, 69m, sim=1): name="Golfclub Holthuizen", addr="Oosteinde 7a, 9301 ZP Roden", banen=Holthuizen(9); ‘Kleintje Holthuizen’ 9-holes par-3(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/39/holthuizen'
WHERE id IN (
  '086f3cf5-12c3-4f61-bba4-695e4e3489e2',
  '08871ee3-57a2-4943-9d6a-6f612a455b8d'
);
```

### Golfclub Landgoed Bergvliet (Netherlands, 2 courses)

- DB: lat=51.6353989, lon=4.7945712, addr="Salesdreef 2, Oosterhout", website=null
- NGF (high, sim=1): name="Landgoed Bergvliet", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/144/landgoed-bergvliet", email="contact@landgoedbergvliet.nl"
- OSM (medium, 495m, sim=1): name="Landgoed Bergvliet", website="https://www.landgoedbergvliet.nl/", addr=null
- LC  (medium, 319m, sim=1): name="Golfbaan Landgoed Bergvliet", addr="Salesdreef 2, 4904 SW Oosterhout", banen=Golfbaan Landgoed Bergvliet(18); Par 3 golfbaan(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/144/landgoed-bergvliet'
WHERE id IN (
  '72d1db8f-58bb-4ea0-9a1f-a864f2c0212a',
  'a2d79fb2-045c-4f49-91e0-8c6b3afe70d8'
);
```

### Golfclub Meerssen (Netherlands, 1 courses)

- DB: lat=50.8964337, lon=5.7441933, addr="Heiveld 4, Bunde", website=null
- NGF (high, sim=1): name="Meerssen", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/610/meerssen", email="info@golfclubmeerssen.nl"
- OSM (high, 88m, sim=1): name="Golfclub Meerssen", website="https://www.golfclubmeerssen.nl/", addr=null
- LC  (high, 82m, sim=1): name="Golfclub Meerssen", addr="Heiveld 4, 6241 GA Bunde", banen=Golfclub Meerssen(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/610/meerssen'
WHERE id IN (
  '93073209-82b9-489f-b791-77cb2d817f50'
);
```

### Golfclub Ookmeer (Netherlands, 1 courses)

- DB: lat=52.3719258, lon=4.7948803, addr="Abe Lenstralaan 8 , Amsterdam Osdorp  ​", website=null
- NGF (high, sim=1): name="Ookmeer", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/547/ookmeer", email="info@golfclubookmeer.nl"
- OSM (high, 1m, sim=1): name="Golfclub Ookmeer", website="https://www.golfclubookmeer.nl/", addr=null
- LC  (high, 182m, sim=1): name="Golfclub Ookmeer", addr="Abe Lenstralaan 8, 1067 MV Amsterdam", banen=Golfclub Ookmeer(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/547/ookmeer'
WHERE id IN (
  '46cc5909-cec2-426e-b8f4-8c00db426b13'
);
```

### Golfclub Oostburg (Netherlands, 1 courses)

- DB: lat=51.3242419, lon=3.4631962, addr="Brugsevaart 10, Oostburg", website=null
- NGF (no-match, sim=0.5): name="Kleiburg", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/21/kleiburg", email="info@golfclub-kleiburg.nl"
- OSM (high, 18m, sim=1): name="Golfclub Oostburg", website="https://www.golfoostburg.com", addr=null
- LC  (low, 45m, sim=0.381): name="Golfclub Oostburg - Brugse Vaart", addr="Brugsevaart 10, 4501 NE Oostburg", banen=De Brugse Vaart(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 18m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfoostburg.com'
WHERE id IN (
  '76bdbf3f-2e1b-4d2a-9fa6-a4f73649f202'
);
```

### Golfclub Princenbosch (Netherlands, 10 courses)

- DB: lat=51.5480606, lon=4.8732433, addr="Bavelseweg 153, Molenschot", website=null
- NGF (high, sim=1): name="Princenbosch", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/80/princenbosch", email="golfclub@princenbosch.nl"
- OSM (medium, 296m, sim=1): name="Golfclub Princenbosch", website="https://www.princenbosch.nl/", addr=null
- LC  (high, 67m, sim=1): name="Golfclub Princenbosch", addr="Bavelseweg 153, 5124 PX Molenschot", banen=Combinatie B/C(18); Lus B(9); Combinatie C/A(18); Lus A(9); Combinatie A/B(18); Princenbosch Par 3 Course(9); Lus C(9)

**Proposed UPDATE** (alle 10 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/80/princenbosch'
WHERE id IN (
  '328c3660-f1dd-4ea7-b2d8-60f6b7bb1d67',
  '5c297e9b-7fcc-42f0-885d-15d242a6858c',
  '87ba71da-fc11-4b0c-833f-96a1ef3bbda0',
  '96fe9e2f-91c6-48ae-886b-9a656bf73001',
  'a7b727f3-08a6-43a0-9e57-88c611f73b5f',
  'ad215a35-c7f2-44c2-90dd-cd260cade6e6',
  'c0aff192-9666-48a6-8291-66d59a1d8a55',
  'c0dec8f2-0d77-4c0c-b1bf-1680fce37979',
  'ec44f6c7-66de-4d4d-a548-bcf79ad14c23',
  'f090eb4e-6558-41f0-b095-92cf76c2d521'
);
```

### Golfclub Riel (Netherlands, 1 courses)

- DB: lat=51.4227127, lon=5.5352573, addr="Gijzenrooiseweg 23, Geldrop", website=null
- NGF (high, sim=1): name="Riel", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/571/riel", email="secretaris@gcriel.nl"
- OSM (high, 197m, sim=1): name="Golfclub Riel", website="https://gcriel.nl/", addr=null
- LC  (medium, 357m, sim=1): name="Golfclub Riel", addr="Gijzenrooiseweg 23, 5661 MA Geldrop", banen=Golfclub Riel(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/571/riel'
WHERE id IN (
  'c1adc3a1-8aa3-4849-8193-82acb517da48'
);
```

### Golfclub Son (Netherlands, 1 courses)

- DB: lat=51.522775, lon=5.4880365, addr="Sportpark \"de Gentiaan\" Vlielandlaan12, Son", website=null
- NGF (high, sim=1): name="Son", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/579/son", email="clubhuis@golfson.nl"
- OSM (high, 108m, sim=1): name="Golfclub Son", website="https://www.golfson.nl/", addr=null
- LC  (high, 102m, sim=1): name="Golfclub Son", addr="Vlielandlaan 12, 5691 ZK Son", banen=Golfclub Son(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/579/son'
WHERE id IN (
  'c6ea8a66-9077-45fa-9618-dc4bd8476f2b'
);
```

### Golfclub the Dorpswaard (Netherlands, 1 courses)

- DB: lat=51.7800745, lon=5.3301576, addr="Piekenwaardweg 3, Kerkdriel", website=null
- NGF (high, sim=1): name="De Dorpswaard", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/92/de-dorpswaard", email="info@dorpswaard.com"
- OSM (high, 178m, sim=1): name="Golfclub De Dorpswaard", website="https://www.dorpswaard.com/", addr=null
- LC  (high, 48m, sim=1): name="Golfclub De Dorpswaard", addr="Piekenwaardweg 3, 5331 PD  Kerkdriel", banen=De Dorpswaard Golfvereniging(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/92/de-dorpswaard'
WHERE id IN (
  '9ba1e839-6998-494b-b837-730e046d0aa9'
);
```

### Golfclub Westerwolde (Netherlands, 1 courses)

- DB: lat=53.0370216, lon=7.1076302, addr="Laan van Westerwolde 8, Vlagtwedde", website=null
- NGF (high, sim=1): name="Westerwolde", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/138/westerwolde", email="info@gcwesterwolde.nl"
- OSM (medium, 284m, sim=1): name="Golfclub Westerwolde", website="https://www.gcwesterwolde.nl/", addr=null
- LC  (high, 95m, sim=1): name="Golfclub Westerwolde", addr="Laan van Westerwolde 8, 9541 ZA Vlagtwedde", banen=Golfclub Westerwolde(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/138/westerwolde'
WHERE id IN (
  '089b7ca8-9f33-42b8-9a6e-6f31461dd523'
);
```

### Golfclub Westland (Netherlands, 1 courses)

- DB: lat=51.9937325, lon=4.1738314, addr="Koningin Julianaweg 154, 's-Gravenzande", website=null
- NGF (high, sim=1): name="Westland", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/754/westland", email="info@golfclubwestland.nl"
- OSM (high, 120m, sim=1): name="Golfclub Westland", website="https://golfclubwestland.nl/", addr=null
- LC  (high, 168m, sim=1): name="Golfclub Westland", addr="Koningin Julianaweg 154, 2691 GH 's-Gravenzande", banen=Golfbaan Westland(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/754/westland'
WHERE id IN (
  '73d2ee61-04df-4e35-ba4d-1396e13b03b7'
);
```

### Golfclub Zwolle (Netherlands, 1 courses)

- DB: lat=52.4979266, lon=6.1435279, addr="Zalnéweg 75, Zwolle", website=null
- NGF (high, sim=1): name="Zwolle", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/91/zwolle", email="receptie@golfclubzwolle.nl"
- OSM (low, 537m, sim=1): name="Golfclub Zwolle", website="https://www.golfclubzwolle.nl/", addr=null
- LC  (high, 22m, sim=1): name="Golfclub Zwolle", addr="Zalnéweg 75, 8026 PZ Zwolle", banen=Golfclub Zwolle(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/91/zwolle'
WHERE id IN (
  'd0344b68-06b3-4b5a-8637-60907f42fd55'
);
```

### Golfpark De Haenen (Netherlands, 1 courses)

- DB: lat=51.6144504, lon=4.8371984, addr="Laan der Continenten 70, Teteringen", website=null
- NGF (no-match, sim=0.556): name="Golfpark Rotterdam", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/1001/golfpark-rotterdam", email="info@golfparkrotterdam.nl"
- OSM (high, 142m, sim=1): name="Golfpark de Haenen", website="https://www.dehaenen.nl/", addr="Laan der Continenten, 70, 4847DG, Teteringen"
- LC  (medium, 416m, sim=1): name="Golfpark De Haenen", addr="Laan der Continenten 70 4847 DG Teteringen", banen=Golfbaan de Haenen(18); Academy Course(6)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 142m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.dehaenen.nl/'
WHERE id IN (
  '314a0ce5-7f42-4b18-844e-f43e7a587a47'
);
```

### Golfpark De Loonsche Duynen (Netherlands, 1 courses)

- DB: lat=51.6390768, lon=5.0317428, addr="Veldstraat 6, De Moer", website=null
- NGF (no-match, sim=0.625): name="De Loonsche Duynen", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/90/de-loonsche-duynen", email="info@golfparkdeloonscheduynen.nl"
- OSM (high, 230m, sim=1): name="Golfpark De Loonsche Duynen", website="https://golfparkdeloonscheduynen.nl/", addr=null
- LC  (high, 33m, sim=1): name="Golfpark De Loonsche Duynen", addr="Veldstraat 6, 5176 NB  De Moer (Kaatsheuvel)", banen=Loonsche Duynen(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 230m, sim=1)
```sql
UPDATE courses SET
  website = 'https://golfparkdeloonscheduynen.nl/'
WHERE id IN (
  'f1e007c8-bb22-4a6b-a06a-2787cd0dcd0e'
);
```

### golfpark Exloo (Netherlands, 1 courses)

- DB: lat=52.8754237, lon=6.8847936, addr="Valtherweg, Exloo", website=null
- NGF (no-match, sim=0.556): name="Golfpark Rotterdam", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/1001/golfpark-rotterdam", email="info@golfparkrotterdam.nl"
- OSM (high, 71m, sim=1): name="Golfpark Exloo", website="https://www.golfparkexloo.nl/", addr=null
- LC  (high, 71m, sim=1): name="Golfpark Exloo", addr="Valtherweg 27b, 7875 TA Exloo", banen=Openbare baan Exloo (Noord-Zuid)(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 71m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfparkexloo.nl/'
WHERE id IN (
  'dcacb414-bdfc-443f-96d3-ebdbe575ac31'
);
```

### Golfpark Weilenseind (Netherlands, 2 courses)

- DB: lat=51.5350093, lon=4.9441928, addr="Alphenseweg 14A, Gilze", website=null
- NGF (no-match, sim=0.55): name="Weilenseind", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/642/weilenseind", email="info@golfparkweilenseind.nl"
- OSM (high, 154m, sim=1): name="Golfpark Weilenseind", website="https://golfparkweilenseind.nl/", addr=null
- LC  (high, 54m, sim=1): name="Golfpark Weilenseind", addr="Alphenseweg 14A, 5126 PN Gilze", banen=Weilenseind (9 holes)(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 154m, sim=1)
```sql
UPDATE courses SET
  website = 'https://golfparkweilenseind.nl/'
WHERE id IN (
  '6d1e9245-f3b7-472d-8299-ee81a2d78382',
  '9645b993-e4bf-4c5f-90b2-b45391d9c267'
);
```

### Golfplezier Twente (Netherlands, 2 courses)

- DB: lat=52.4081829, lon=6.5710503, addr="Bekkenhaarsweg 28, Hengelo", website=null
- NGF (high, sim=1): name="Golfplezier Twente", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/725/golfplezier-twente", email="info@golfpleziertwente.nl"
- OSM (high, 21m, sim=1): name="Golfplezier Twente", website="https://golfpleziertwente.nl/", addr=null
- LC  (medium, 280m, sim=1): name="Golfplezier Twente", addr="Bekkenhaarsweg 28, 7645 AJ, Hoge Hexel", banen=Shortgolf(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/725/golfplezier-twente'
WHERE id IN (
  '1dc6cec2-91f9-472e-88b3-c74f2b64b6a9',
  'da5bfe32-fac6-4fb8-84c0-e1b5387ac3e2'
);
```

### Golftuin Zwolle (Netherlands, 1 courses)

- DB: lat=52.4655147, lon=6.1265124, addr="Harculose Esweg 2, Zwolle", website=null
- NGF (high, sim=1): name="Golftuin Zwolle", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/379/golftuin-zwolle", email="info@golftuinzwolle.nl"
- OSM (high, 132m, sim=1): name="Golftuin Zwolle", website="https://www.golftuinzwolle.nl/", addr=null
- LC  (high, 147m, sim=1): name="Golftuin Zwolle", addr="Harculose Esweg 2, 8015 RH Zwolle (Navigatie: Jan van Arkelweg 2a)", banen=Par-3 baan(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/379/golftuin-zwolle'
WHERE id IN (
  'a7fce286-9297-4953-b662-e632b4ac4165'
);
```

### Golfvereniging Albatross (Netherlands, 1 courses)

- DB: lat=51.6188437, lon=4.6985249, addr="Weimerseef 19, Prinsenbeek", website=null
- NGF (no-match, sim=0.375): name="Albatross", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/89/albatross", email="info@albatrossgolf.nl"
- OSM (high, 22m, sim=1): name="Golfvereniging Albatross", website="https://www.albatrossgolf.nl/", addr=null
- LC  (high, 121m, sim=1): name="Golfvereniging Albatross", addr="Weimersedreef 19, 4841 KG Prinsenbeek", banen=Golfvereniging Albatross(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 22m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.albatrossgolf.nl/'
WHERE id IN (
  '68424a01-6ed1-4c18-b2ff-83adf7bbd2c0'
);
```

### Golfvereniging Reymerswael (Netherlands, 1 courses)

- DB: lat=51.387883, lon=4.2421495, addr="Grensweg 21, Rilland Bath", website=null
- NGF (no-match, sim=0.423): name="Golfresidentie Dronten", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/112/golfresidentie-dronten", email="RHCie@golfresidentie.nl"
- OSM (high, 228m, sim=1): name="Golfvereniging Reymerswael", website="https://www.reymerswael.nl/", addr="Grensweg, 21, 4411ST, Rilland"
- LC  (low, 358m, sim=0.692): name="Golfcentrum Reymerswael", addr="Grensweg 21, 4411 ST Rilland Bath", banen=Golfcentrum Reymerswael(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 228m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.reymerswael.nl/'
WHERE id IN (
  'be1e05cc-be00-49c7-a3b9-902bf11305b1'
);
```

### Gooise Golfclub (Netherlands, 1 courses)

- DB: lat=52.2094823, lon=5.1339932, addr="Het Jagerspaadje 24, Loosdrecht", website=null
- NGF (high, sim=1): name="Gooise", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/567/gooise", email="secretariaat@gooisegolfclub.nl"
- OSM (high, 100m, sim=1): name="Gooise Golfclub", website="https://www.gooisegolfclub.nl/", addr="'t Jagerspaadje, 24A, 1231KJ, Loosdrecht"
- LC  (high, 170m, sim=1): name="Gooise Golfclub", addr="‘t Jagerspaadje 24, 1231 KJ Loosdrecht", banen=Gooise Golfclub(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/567/gooise'
WHERE id IN (
  'bee0416c-dc57-4103-9315-225e9b7daf8f'
);
```

### Groendael (Netherlands, 1 courses)

- DB: lat=52.1090593, lon=4.3365689, addr="Groenendaal 3, Wassenaar", website=null
- NGF (high, sim=1): name="Groendael", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/148/groendael", email="info@wassenaarsegolf.nl"
- OSM (low, 234m, sim=0.429): name="Wassenaarse Golf Groendael", website="https://www.wassenaarsegolf.nl", addr=null
- LC  (low, 20m, sim=0.429): name="Wassenaarse Golf Groendael", addr="Groenendaal 3, 2244 BK, Wassenaar", banen=Golfbaan Groendael(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/148/groendael'
WHERE id IN (
  '25af2534-b87f-4eda-9c26-8363a01feeb4'
);
```

### Gulbergen (Netherlands, 2 courses)

- DB: lat=51.4503117, lon=5.5813519, addr="Heiderschoor 26, Mierlo", website=null
- NGF (high, sim=1): name="De Gulbergen", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/99/de-gulbergen", email="info@golfdegulbergen.nl"
- OSM (medium, 294m, sim=1): name="Golf De Gulbergen", website="https://www.golfdegulbergen.nl/", addr="Heiderschoor, 26, 5731RG, Mierlo"
- LC  (high, 167m, sim=1): name="Golf de Gulbergen", addr="Heiderschoor 26, 5731 RG Mierlo", banen=Old Course(9); Sprookjesbaan / Libellenbaan(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/99/de-gulbergen'
WHERE id IN (
  '619cd40b-9ce1-4520-a024-96758917acfb',
  '69fcb11a-8726-4595-b8ee-fe04b6895be4'
);
```

### Haagse Golfvereniging Leeuwenbergh (Netherlands, 1 courses)

- DB: lat=52.0574152, lon=4.3631529, addr="Elzenlaan 31, Den Haag", website=null
- NGF (no-match, sim=0.353): name="Leeuwenbergh", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/75/leeuwenbergh", email="info@leeuwenbergh.nl"
- OSM (high, 215m, sim=1): name="Haagse Golfvereniging Leeuwenbergh", website="https://www.leeuwenbergh.nl/", addr=null
- LC  (low, 40m, sim=0.353): name="Golfbaan Leeuwenbergh", addr="Elzenlaan 31, 2495 AZ Den Haag", banen=Leeuwenbergh(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 215m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.leeuwenbergh.nl/'
WHERE id IN (
  '0e3f2e76-42a2-4c97-b557-cd8f32f4bd90'
);
```

### Haarlemmermeersche Golfclub (Netherlands, 10 courses)

- DB: lat=52.3383062, lon=4.6575458, addr="Spieringweg 745, Cruquius", website=null
- NGF (high, sim=1): name="Haarlemmermeersche", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/49/haarlemmermeersche", email="info@haarlemmermeerschegolfclub.nl"
- OSM (high, 106m, sim=1): name="Haarlemmermeersche Golfclub", website="https://www.hgcgolf.nl/", addr=null
- LC  (high, 171m, sim=1): name="Haarlemmermeersche Golfclub", addr="Spieringweg 745, 2142 ED Cruquius", banen=Leeghwater - Cruquius Course(18); Leeghwater - Lynden Course(18); Lynden - Cruquius Course(18); Bolstra Course (Par 3)(9)

**Proposed UPDATE** (alle 10 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/49/haarlemmermeersche'
WHERE id IN (
  '3a304dee-b58c-417a-a30c-e9e85888ed15',
  '531d8763-c222-48c2-946d-d4c38c1a6ebf',
  '76f31ff1-8e13-4c15-a137-06538c21f401',
  '7db01fab-e34b-4475-8551-dacbdda8756e',
  '821e2d09-b3fd-4c2e-8292-341a9319a506',
  '9b0f316e-b89f-42fd-84e6-5fb08c469896',
  'a8e3767b-2a21-4dd8-8eaf-fbc755abad11',
  'c91b265a-9f53-49e6-ad3e-85f1cfddf7fe',
  'ca53ca6a-9cc7-426f-8836-9f5547f698c2',
  'f1eabd5e-eabf-43f3-8d88-13272c054543'
);
```

### Hattemse Golf&Country Club (Netherlands, 1 courses)

- DB: lat=52.4546487, lon=6.074257, addr="Veendam 11, Hattem", website=null
- NGF (high, sim=1): name="Hattemse", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/15/hattemse", email="info@golfclub-hattem.nl"
- OSM (high, 46m, sim=1): name="De Hattemse Golf & Country Club", website="https://www.golfclub-hattem.nl/", addr=null
- LC  (high, 176m, sim=1): name="Hattemse Golf & Country Club", addr="Veenwal 11, 8051 AS Hattem", banen=Hattemse Golf & Country Club(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/15/hattemse'
WHERE id IN (
  'ecab75ec-4b88-4e04-8b38-9bf717c73d81'
);
```

### Haviksoord (Netherlands, 1 courses)

- DB: lat=51.3386084, lon=5.5858907, addr="Maarheezerweg Nrd. 11, Leende", website=null
- NGF (high, sim=1): name="Haviksoord", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/26/haviksoord", email="info@haviksoord.nl"
- OSM (high, 36m, sim=1): name="Haviksoord", website="https://www.haviksoord.nl/", addr=null
- LC  (medium, 429m, sim=1): name="Haviksoord Golf Club", addr="Maarheezerweg Noord 11, 5595 XG Leende", banen=Haviksoord(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/26/haviksoord'
WHERE id IN (
  'd6e415ec-d6b5-4d6e-b5a1-682c5a282204'
);
```

### Heemskerkse Golfclub (Netherlands, 3 courses)

- DB: lat=52.509555, lon=4.6934494, addr="Communicatieweg 18, Heemskerk", website=null
- NGF (high, sim=1): name="Heemskerkse", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/108/heemskerkse", email="receptie@heemskerksegolfclub.nl"
- OSM (low, 2261m, sim=1): name="Heemskerkse Golfclub", website="https://www.heemskerksegolfclub.nl/", addr=null
- LC  (low, 1807m, sim=1): name="Heemskerkse Golfclub", addr="Communicatieweg 18, 1967 PR  Heemskerk", banen=PAR-3 Weidelus(9); De Heemskerkse(18)

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/108/heemskerkse'
WHERE id IN (
  '50bc0576-476d-400f-a1af-dc7896a2c2d4',
  '8f72dbdc-cae8-4cf1-8f25-368f2fbd86d1',
  'ba244211-a399-4591-bb55-2d38d4c0cb7e'
);
```

### Helmondse Overbrug (Netherlands, 1 courses)

- DB: lat=51.497565, lon=5.6481699, addr="Verliefd Laantje 3A, 5707 LG Helmond, Netherlands", website=null
- NGF (high, sim=1): name="Helmondse Overbrug", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/113/helmondse-overbrug", email="administratie@hgc-overbrug.nl"
- OSM (high, 39m, sim=1): name="Helmondse Golfclub 'Overbrug'", website="https://hgc-overbrug.nl/", addr=null
- LC  (high, 142m, sim=1): name="Helmondse Golfclub 'Overbrug'", addr="Verliefd Laantje 3A, 5707 LG Helmond", banen=Overburg Helmondse Golfclub(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/113/helmondse-overbrug'
WHERE id IN (
  'ad7e0669-8400-4319-bb1d-efedda775bc8'
);
```

### het Lohr (Netherlands, 1 courses)

- DB: lat=51.8696099, lon=6.4165109, addr="Lohrpad 2, Voorst", website=null
- NGF (low, sim=0.75): name="’t Lohr", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/371/-t-lohr", email="info@hetlohr.nl"
- OSM (high, 129m, sim=0.75): name="Golfclub 't Lohr", website="https://golfinvoorst.nl/", addr=null
- LC  (high, 62m, sim=0.75): name="Golfclub 't Lohr", addr="Lohrpad 2, Voorst 7083AX", banen=Shortgolf Voorst(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 129m, sim=0.75)
```sql
UPDATE courses SET
  website = 'https://golfinvoorst.nl/'
WHERE id IN (
  'ea73b977-c58c-459f-a258-2f997a2eba15'
);
```

### Het Rijk van Nijmegen (Netherlands, 13 courses)

- DB: lat=51.7902888, lon=5.9224192, addr="Postweg 17, Groesbeek", website=null
- NGF (high, sim=1): name="Het Rijk van Nijmegen", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/41/het-rijk-van-nijmegen", email="info@golfbaanhetrijkvannijmegen.nl"
- OSM (low, 517m, sim=1): name="Het Rijk van Nijmegen", website="https://www.golfenophetrijk.nl/nijmegen.html", addr=null
- LC  (high, 73m, sim=1): name="Het Rijk van Nijmegen", addr="Postweg 17, 6561 KJ Groesbeek", banen=Groesbeekse Baan Zuid-Noord(18); Nijmeegse Baan(18); Groesbeekse Baan Oost-Zuid(18); Groesbeekse Baan Noord-Oost(18)

**Proposed UPDATE** (alle 13 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/41/het-rijk-van-nijmegen'
WHERE id IN (
  '0480fdeb-71d1-47ab-a580-cbb29db96a3f',
  '0551eeab-660b-44aa-b14a-efd39655d0d3',
  '14374404-8a89-41d6-a563-0258f8748bda',
  '1b15dba4-eae6-4ae8-a67d-583ce502e116',
  '2fc1edf3-899b-469b-a56a-a0e0f4be5f54',
  '4cb98fc8-18d9-422b-b34d-a661ae87930b',
  '545e8d5a-87be-45a4-8bfc-9e9990a1e12f',
  '5ce633f4-b723-4412-848b-804fad8a9ee2',
  '794a7039-0274-47bf-a28d-db7949b3e7af',
  '84e1bca7-3d1e-4b23-bcd9-9a62fa335b3e',
  'a8adbbb8-fd97-4bf2-b465-6cb8e9c687f4',
  'b5d94708-9a1c-473c-8955-56c96b91dce9',
  'f1b1f077-15ce-49be-9241-186871e1f0a9'
);
```

### Het Rijk van Sybrook (Netherlands, 9 courses)

- DB: lat=52.2728541, lon=6.9312209, addr="Veendijk 100, Enschede", website=null
- NGF (high, sim=1): name="Het Rijk van Sybrook", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/85/het-rijk-van-sybrook", email="vzjeugdcommissie@gccsybrook.nl"
- OSM (high, 188m, sim=1): name="Golfbaan Het Rijk van Sybrook", website="https://www.golfenophetrijk.nl/sybrook.html", addr=null
- LC  (high, 248m, sim=1): name="Het Rijk van Sybrook", addr="Veendijk 100, 7525 PZ Enschede", banen=Oost-Noord(18); Noord-Zuid(18); Zuid-Oost(18)

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/85/het-rijk-van-sybrook'
WHERE id IN (
  '25866500-851e-444b-8ec0-e4c7f5b4ffbc',
  '4e5167ed-ad33-4ff9-8382-d3a77cb50f86',
  '5637c1dd-8383-4337-84af-2d10016e0e05',
  '819a869f-5820-4109-bf4e-5ba05cca5d9c',
  '9cd213fe-1fa4-4a52-8524-17e3962d4893',
  'aee44d2e-9978-4587-a5ab-243a5b3bb08b',
  'bbef37fc-f789-42bb-ada5-6c7cc7b1fe22',
  'be827f7f-b82c-4948-b04b-0de5f5b2affe',
  'f6daba50-b8de-4713-8e02-c84cadde570b'
);
```

### Het Woold (Netherlands, 2 courses)

- DB: lat=51.3630919, lon=5.7725474, addr="Gezandebaan 44, Asten Heusden", website=null
- NGF (high, sim=1): name="Het Woold", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/161/het-woold", email="info@golfbaanhetwoold.nl"
- OSM (low, 530m, sim=1): name="Golfbaan het Woold", website=null, addr="Gezandebaan, 46a, 5725, Heusden"
- LC  (high, 21m, sim=1): name="Golfbaan het Woold", addr="Gezandebaan 46a, 5725 TN, Asten-Heusden (parkeren Veluwsedijk)", banen=Gezandebaan (9-holes par 3)(9); Vier Eijckenbaan(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/161/het-woold'
WHERE id IN (
  '2e152ccb-1d21-4389-aa79-a064e6b13435',
  '34153e4e-a4f9-4901-8737-4d6449f51172'
);
```

### Hilversumsche (Netherlands, 1 courses)

- DB: lat=52.2000331, lon=5.213057, addr="Soestdijkerstraatweg 172, Hilversum", website=null
- NGF (high, sim=1): name="Hilversumsche", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/3/hilversumsche", email="clubmanager@hilversumschegolfclub.nl"
- OSM (high, 194m, sim=1): name="Hilversumsche Golf Club", website="https://www.hilversumschegolfclub.nl/", addr="Soestdijkerstraatweg, 172, 1213XJ, Hilversum"
- LC  (low, 723m, sim=1): name="Hilversumsche Golf Club", addr="Soestdijkerstraatweg 172, 1213 XJ Hilversum", banen=De Hilversumsche(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/3/hilversumsche'
WHERE id IN (
  '3e4c5cea-b5e8-4d9a-9775-c96986e5bb12'
);
```

### Hoenderdaal Golf (Netherlands, 1 courses)

- DB: lat=52.0544603, lon=5.2609041, addr="Hoendersteeg 7, Driebergen", website=null
- NGF (high, sim=1): name="Hoenderdaal", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/763/hoenderdaal", email="info@hoenderdaal.com"
- OSM (high, 12m, sim=1): name="Golfbaan Hoenderdaal", website="https://hoenderdaal.com/", addr="Hoendersteeg, 7, 3972NA, Driebergen-Rijsenburg"
- LC  (low, 271m, sim=0.268): name="Sportpark Hoenderdaal Utrechtse Heuvelrug", addr="Hoendersteeg 7, 3972 NA, Driebergen-Rijsenburg", banen=Hoenderdaal(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/763/hoenderdaal'
WHERE id IN (
  'ce99fceb-2a24-488e-b31f-f0593e0759fa'
);
```

### Hoge Kleij (Netherlands, 1 courses)

- DB: lat=52.1305877, lon=5.3623757, addr="Loes van Overeemlaan 16, Leusden", website=null
- NGF (high, sim=1): name="De Hoge Kleij", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/34/de-hoge-kleij", email="secretariaat@hogekleij.nl"
- OSM (medium, 445m, sim=1): name="Golfclub De Hoge Kleij", website="https://hogekleij.nl/", addr=null
- LC  (high, 57m, sim=1): name="Golfclub De Hoge Kleij", addr="Loes van Overeemlaan 16, 3832 RZ Leusden", banen=De Hoge Kleij(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/34/de-hoge-kleij'
WHERE id IN (
  'd45b94ee-6e39-40a8-a2ba-c4d9df51fa5b'
);
```

### Hoog Vaals (Netherlands, 2 courses)

- DB: lat=50.7693759, lon=6.0024335, addr="Eschberg 11, Vaals", website=null
- NGF (no-match, sim=0.5): name="Hooge Graven", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/77/hooge-graven", email="info@hoogegraven.nl"
- OSM (high, 211m, sim=1): name="Golf Club Hoog Vaals", website="https://golfclubhoogvaals.com/", addr=null
- LC  (high, 68m, sim=1): name="Golfclub Hoog Vaals", addr="Eschberg 11a, 6291 NK, Vaals", banen=Par 3 baan(9); C-baan(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 211m, sim=1)
```sql
UPDATE courses SET
  website = 'https://golfclubhoogvaals.com/'
WHERE id IN (
  '47bdfc65-f281-422e-96e8-ef05e098ff04',
  '556fe805-a468-408d-8512-8295c166bb6b'
);
```

### Hooge Graven (Netherlands, 2 courses)

- DB: lat=52.5423424, lon=6.4471128, addr="Hessenweg Oost 3a, Arrien", website=null
- NGF (high, sim=1): name="Hooge Graven", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/77/hooge-graven", email="info@hoogegraven.nl"
- OSM (low, 446m, sim=0.667): name="Hooge Graven Golfclub Ommen", website="https://www.hoogegraven.nl/", addr=null
- LC  (low, 104m, sim=0.667): name="Hooge Graven Golfclub Ommen", addr="Hessenweg Oost 3a, 7735 KP Arriën (bij Ommen)", banen=9 Holes Par 3(9); 18 Holes(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/77/hooge-graven'
WHERE id IN (
  '40760989-e0ac-42ff-aa21-df147d8cf897',
  '88b26c4e-11fc-4ff7-a057-3559d71f95cb'
);
```

### Houtrak (Netherlands, 1 courses)

- DB: lat=52.4047887, lon=4.726772, addr="Machineweg 1-b, Spaarnwoude", website=null
- NGF (high, sim=1): name="Houtrak", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/110/houtrak", email="secretariaat@houtrak.nl"
- OSM (high, 145m, sim=1): name="Golfclub Houtrak", website="https://houtrak.nl/", addr=null
- LC  (high, 145m, sim=1): name="Golfclub Houtrak", addr="Machineweg 1b, 1165 NB Halfweg NH", banen=Noord - Zuid(18); Buiten - Binnen(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/110/houtrak'
WHERE id IN (
  '7f623197-df43-47bd-ab19-e433849a7a2a'
);
```

### Kagerzoom (Netherlands, 1 courses)

- DB: lat=52.1871505, lon=4.5022839, addr="Veerpolder 20, Warmond", website=null
- NGF (high, sim=1): name="Kagerzoom", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/87/kagerzoom", email="info@kagerzoom.nl"
- OSM (medium, 354m, sim=1): name="Golfclub Kagerzoom", website="https://www.kagerzoom.nl/", addr=null
- LC  (high, 86m, sim=1): name="Golfclub Kagerzoom", addr="Veerpolder 22, 2361 KV Warmond", banen=Golfclub Kagerzoom(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/87/kagerzoom'
WHERE id IN (
  '99a9835c-3338-4117-af79-98bfe487d760'
);
```

### Kapelkeshof (Netherlands, 2 courses)

- DB: lat=51.3653149, lon=5.9431894, addr="Roomweg 85, 5985 NS Grashoek, Netherlands, Grashoek", website=null
- NGF (high, sim=1): name="Kapelkeshof", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/639/kapelkeshof", email="info@kapelkeshof.nl"
- OSM (high, 200m, sim=1): name="Kapèlkeshof", website="https://www.kapelkeshof.nl/golf/", addr=null
- LC  (low, 18m, sim=0.367): name="Wijn en Golfdomein Kapelkeshof", addr="Roomweg 85, 5985NS Grashoek", banen=Kapelkeshof baan - 18 holes par 3(18); Solarisbaan - 9 holes par 3/4(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/639/kapelkeshof'
WHERE id IN (
  '499d50f0-7554-49e8-b514-c6af130c011f',
  '4a2dec2f-2815-4e3f-9ed4-512cfe120e75'
);
```

### Kennemer Golf & Country Club (Netherlands, 9 courses)

- DB: lat=52.372837, lon=4.5559717, addr="Kennemerweg 78, Zandvoort", website=null
- NGF (high, sim=1): name="Kennemer", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/5/kennemer", email="secretariaat@kennemergolf.nl"
- OSM (high, 107m, sim=1): name="Kennemer Golf & Country Club", website="https://kennemergolf.nl/", addr=null
- LC  (medium, 422m, sim=1): name="Kennemer Golf & Country Club", addr="Kennemerweg 78, 2042 XT Zandvoort", banen=C (Colt course)(9); A (Van Hengel course)(9); B (Pennink course)(9)

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/5/kennemer'
WHERE id IN (
  '140a8cfa-a4a4-43ca-b468-1c3653cce354',
  '193099a3-ce22-48d9-b296-740405e217de',
  '2fb2ec42-1369-4f63-bc5b-d5c51728e4ce',
  '771d6e2d-817a-4947-9526-2fec0a3b2ded',
  'b2e3a550-9bbf-4899-8a34-71be855ae803',
  'b86eef29-71a2-4b71-bb29-f7b84223640a',
  'c9df57a2-d290-43a3-854a-a57eb8e37dae',
  'ddb4de9f-50e3-4066-9c51-cb873a3026b3',
  'e00ec9fc-b1ab-41a5-9592-d279d8198d55'
);
```

### Keppelse Golfclub (Netherlands, 1 courses)

- DB: lat=52.006579, lon=6.2007098, addr="Burgemeester Vrijlandweg 35, Hoog-Keppel", website=null
- NGF (high, sim=1): name="Keppelse", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/24/keppelse", email="info@keppelse.nl"
- OSM (medium, 322m, sim=1): name="Keppelse Golfclub", website="https://www.keppelse.nl/", addr=null
- LC  (low, 1002m, sim=1): name="Keppelse Golfclub", addr="Burgemeester Vrijlandweg 35, 6997AB, Hoog-Keppel", banen=Keppelse Golfclub(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/24/keppelse'
WHERE id IN (
  '5a6c99bb-6574-4e35-b510-9b290f6146a2'
);
```

### Koninklijke Haagsche Golf & Country Club (Netherlands, 1 courses)

- DB: lat=52.1331889, lon=4.3708163, addr="Groot Hasebroekseweg 22, Wassenaar", website=null
- NGF (high, sim=1): name="Koninklijke Haagsche", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/1/koninklijke-haagsche", email="secretariaat@khgcc.nl"
- OSM (medium, 379m, sim=0.87): name="Koninklijke Haagsche Golf- en Country Club", website="https://khgcc.nl/", addr="Groot Haesebroekseweg, 22, Wassenaar"
- LC  (high, 36m, sim=0.8): name="Koninklijke Haagsche G&CC", addr="Groot Haesebroekseweg 22, 2243 EC  Wassenaar", banen=Koninklijke Haagsche(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/1/koninklijke-haagsche'
WHERE id IN (
  'f689d017-d734-4f2e-bbd8-aa570275dc24'
);
```

### Land van Thorn (Netherlands, 1 courses)

- DB: lat=51.187297, lon=5.8185872, addr="Kallestraat 37A, Hunsel", website=null
- NGF (high, sim=1): name="Land van Thorn", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/145/land-van-thorn", email="info@golfparklandvanthorn.nl"
- OSM (high, 164m, sim=1): name="Golfbaan Land van Thorn", website="https://www.landvanthorn.nl/", addr="Kallestraat, 37, 6013RM, Hunsel"
- LC  (low, 48m, sim=0.609): name="Golfpark Land van Thorn", addr="Kallestraat 37A, 6013 RM Hunsel", banen=Hunsel(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/145/land-van-thorn'
WHERE id IN (
  '3c6d4a84-15b9-4d17-ad35-7cfc325a972a'
);
```

### Landgoed Bleijenbeek (Netherlands, 2 courses)

- DB: lat=51.6364389, lon=6.0624044, addr="Bleijenbeek 14, Afferden", website=null
- NGF (high, sim=1): name="Landgoed Bleijenbeek", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/141/landgoed-bleijenbeek", email="info@bleijenbeek.nl"
- OSM (low, 610m, sim=0.55): name="Golfclub Bleijenbeek", website="https://golfclubbleijenbeek.nl/", addr=null
- LC  (high, 67m, sim=1): name="Golfbaan Landgoed Bleijenbeek", addr="Bleijenbeek 14, 5851 EE Afferden", banen=Pitch & Puttbaan(9); 9 holes Par 3-4 baan(9); Championship Course(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/141/landgoed-bleijenbeek'
WHERE id IN (
  '0adca9e8-ec0b-48ef-8940-f35360970d06',
  '2d942969-f604-4257-a6f4-ae4cbc827298'
);
```

### Marine Golfclub Nieuwediep (Netherlands, 1 courses)

- DB: lat=52.9236426, lon=4.771898, addr="Kortevliet 1BB, Den Helder", website=null
- NGF (high, sim=1): name="Marine Nieuwediep", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/109/marine-nieuwediep", email="secretaris@marinegolfclub.nl"
- OSM (low, 533m, sim=1): name="Marine Golfclub Nieuwediep", website="https://www.marinegolfclub.nl/", addr=null
- LC  (low, 242m, sim=0.176): name="Nieuwediep Marine Golf Club", addr="Kortevliet 1bb, 1786 PK Den Helder", banen=Nieuwediep Marine Golf Club(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/109/marine-nieuwediep'
WHERE id IN (
  '262d757c-f6c0-436d-a708-e739abb39e32'
);
```

### Martensplek (Netherlands, 1 courses)

- DB: lat=52.7614341, lon=6.5642267, addr="Haarweg 22, Tiendeveen", website=null
- NGF (high, sim=1): name="Martensplek", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/95/martensplek", email="receptie@martensplek.nl"
- OSM (medium, 427m, sim=1): name="Golfbaan Martensplek", website="https://www.martensplek.nl/", addr=null
- LC  (high, 107m, sim=1): name="Golfclub Martensplek", addr="Haarweg 22, 7936 TP Tiendeveen", banen=Golfclub Martensplek(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/95/martensplek'
WHERE id IN (
  '7486217e-6a6d-458e-af9e-d3c5e3b2b40e'
);
```

### molenslag (Netherlands, 1 courses)

- DB: lat=51.5851379, lon=4.8064057, addr="Heerenveen 75, barsingerhorn", website=null
- NGF (high, sim=1): name="Molenslag", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/795/molenslag", email="info@molenslag.nl"
- OSM (no-match, 176996m, sim=0.455): name="Golfbaan Martensplek", website="https://www.martensplek.nl/", addr=null
- LC  (low, 133603m, sim=1): name="Golfbaan Molenslag", addr="Heerenweg 75,   1768 BL Barsingerhorn", banen=Golfbaan Molenslag(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/795/molenslag'
WHERE id IN (
  'd9944a41-0e1b-440a-9192-696fc350cabb'
);
```

### Noord nederlandse golf & country club (Netherlands, 1 courses)

- DB: lat=53.120721, lon=6.6317429, addr="Pollselaan 5, Glimmen", website=null
- NGF (high, sim=1): name="Noord-Nederlandse", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/14/noord-nederlandse-", email="secretariaat@nngcc.nl"
- OSM (medium, 497m, sim=1): name="Noord-Nederlandse Golf & Country Club", website="https://www.nngcc.nl/", addr=null
- LC  (high, 4m, sim=1): name="Noord-Nederlandse Golf & Country Club", addr="Pollselaan 5, 9756 CJ Glimmen", banen=Noord-Nederlandse Golf & Country Club(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/14/noord-nederlandse-'
WHERE id IN (
  'e91aa873-f441-45c9-9fb0-32a78732db3c'
);
```

### Noordwijkse Golfclub (Netherlands, 1 courses)

- DB: lat=52.284218, lon=4.4726153, addr="Randweg 25, Noordwijkerhout", website=null
- NGF (high, sim=1): name="Noordwijkse", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/2/noordwijkse", email="info@noordwijksegolfclub.nl"
- OSM (high, 29m, sim=1): name="Noordwijkse Golfclub", website="https://www.noordwijksegolfclub.nl/", addr=null
- LC  (low, 686m, sim=1): name="Noordwijkse Golfclub", addr="Randweg 25, 2204 AL Noordwijk", banen=de Noordwijkse(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/2/noordwijkse'
WHERE id IN (
  '591456fd-f6c9-49b7-b8e2-af68865d74ac'
);
```

### Ockenburgh (Netherlands, 1 courses)

- DB: lat=52.0564296, lon=4.2171906, addr="Wijndaelerweg 125, Den Haag", website=null
- NGF (high, sim=1): name="Ockenburgh", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/171/ockenburgh", email="info@golfockenburgh.nl"
- OSM (high, 246m, sim=1): name="Golf Ockenburgh", website="https://golfockenburgh.nl/", addr=null
- LC  (medium, 274m, sim=1): name="Golfbaan Ockenburgh", addr="Wijndaelerweg 125, 2554 BZ Den Haag (Kijkduin)", banen=Golfbaan Ockenburgh(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/171/ockenburgh'
WHERE id IN (
  '0da4e4ae-ef7e-4a03-b445-01c0f16250ef'
);
```

### Old Course Loenen (Netherlands, 1 courses)

- DB: lat=52.2121857, lon=5.0087294, addr="Rijksstraatweg 171, Loenen aan de Vecht", website=null
- NGF (high, sim=1): name="Old Course Loenen", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/154/old-course-loenen", email="info@oldcourseloenen.nl"
- OSM (high, 135m, sim=1): name="Old Course Loenen", website="https://oldcourseloenen.nl/", addr=null
- LC  (medium, 421m, sim=1): name="Old Course Loenen", addr="Rijksstraatweg 171, 3632 AC Loenen aan de Vecht", banen=Old Course Loenen(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/154/old-course-loenen'
WHERE id IN (
  'df0a22f8-c6e6-4315-bc05-cf6a3713ca55'
);
```

### Oosterhoutse Golf Club (Netherlands, 1 courses)

- DB: lat=51.6212058, lon=4.8694026, addr="Dukaatstraat 21, Oosterhout Nb", website=null
- NGF (high, sim=1): name="De Oosterhoutse", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/60/de-oosterhoutse", email="info@ogcgolf.nl"
- OSM (medium, 468m, sim=1): name="Oosterhoutse Golf Club", website="https://www.oosterhoutse.nl/", addr=null
- LC  (high, 124m, sim=1): name="De Oosterhoutse", addr="Dukaatstraat 21, 4903 RN  Oosterhout", banen=De Oosterhoutse(18); Oosterhoutse Par 3 Course(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/60/de-oosterhoutse'
WHERE id IN (
  '2d050849-2214-4d3b-909c-e9bd265b48ef'
);
```

### Prinses Wilhelmina (Netherlands, 1 courses)

- DB: lat=52.2326111, lon=6.8765657, addr="Maatmanweg 27, Enschede", website=null
- NGF (high, sim=1): name="Prinses Wilhelmina", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/540/prinses-wilhelmina", email="info@pwgolf.nl"
- OSM (high, 194m, sim=1): name="Golfclub Prinses Wilhelmina", website="https://www.pwgolf.nl/", addr=null
- LC  (low, 152m, sim=0.621): name="Prinses Wilhelmina Enschedese Golfclub", addr="Maatmanweg 27, 7522 AN Enschede", banen=Prinses Wilhelmina Enschedese Golfclub(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/540/prinses-wilhelmina'
WHERE id IN (
  'fcec74e7-c16c-415d-8435-75e5b54fa9a9'
);
```

### Prise d'Eau Golf (Netherlands, 9 courses)

- DB: lat=51.5494116, lon=4.9919395, addr="Gilzerbaan 400, Tilburg", website=null
- NGF (high, sim=1): name="Prise d Eau", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/97/prise-d-eau", email="receptie@prisedeaugolf.nl"
- OSM (high, 201m, sim=1): name="Prise d'Eau Golf", website="https://prisedeau-golf.nl/", addr=null
- LC  (high, 201m, sim=1): name="Prise d'Eau Golf", addr="Gilzerbaan 400, 5032 VC Tilburg", banen=Warande - Par 3 course(9); Sijsten / Leij(18); Blaak / Sijsten(18); Leij / Blaak(18)

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/97/prise-d-eau'
WHERE id IN (
  '19781447-21c3-4214-8711-69828a4bf79c',
  '2450c5d8-1197-45db-9014-ad157d15f928',
  '6403dc5e-7a16-4549-a50f-953497d40503',
  '7bfb165e-8023-4757-96ec-623244b27127',
  '7c82f85c-2e86-475c-877b-69a84bddf0b5',
  '82471be2-d0d7-463b-abe2-1187252ee9a9',
  '8f0aa967-19c6-405a-b2da-21defe3fb895',
  'ac9911c9-4d40-4b14-bb5c-8d05b69ceaf7',
  'd965526b-e9ae-4c0f-b702-a34cfa187843'
);
```

### Rijswijkse Golfclub (Netherlands, 1 courses)

- DB: lat=52.0336566, lon=4.3508016, addr="Delftweg 59, Rijswijk", website=null
- NGF (medium, sim=0.8): name="Rijswijk", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/54/rijswijk", email="caddiemaster@rijswijksegolf.nl"
- OSM (high, 158m, sim=1): name="Rijswijkse Golfclub", website="https://www.rijswijksegolf.nl/", addr=null
- LC  (low, 535m, sim=1): name="Rijswijkse Golfclub", addr="Delftweg 59, 2289 AL Rijswijk", banen=Rijswijkse Golfbaan(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 158m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.rijswijksegolf.nl/'
WHERE id IN (
  '13055218-4d63-48cb-ac39-0d448a54b8ea'
);
```

### Rosendaelsche Golfclub (Netherlands, 1 courses)

- DB: lat=52.0190343, lon=5.9264036, addr="Apeldoornseweg 450, Arnhem", website=null
- NGF (high, sim=1): name="Rosendaelsche", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/10/rosendaelsche", email="secretariaat@rosendaelsche.nl"
- OSM (low, 598m, sim=1): name="Rosendaelsche Golfclub", website="https://rosendaelsche.nl/", addr=null
- LC  (high, 30m, sim=1): name="Rosendaelsche Golfclub", addr="Apeldoornseweg 450, 6816 SN Arnhem", banen=Rosendaelsche(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/10/rosendaelsche'
WHERE id IN (
  '8194ebc8-2253-4234-a787-99522f1a7612'
);
```

### Rozenstein (Netherlands, 1 courses)

- DB: lat=52.1540115, lon=4.3926712, addr="Dr. Mansveltkade 15, Wassenaar", website=null
- NGF (high, sim=1): name="Rozenstein", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/35/rozenstein", email="secretariaat@rozenstein.nl"
- OSM (low, 341m, sim=0.455): name="Wassenaarse Golfclub Rozenstein", website="https://rozenstein.nl/", addr="Wassenaar"
- LC  (low, 140m, sim=0.4): name="Golfclub De Kieviten", addr="Dr Mansveltkade 11, 2242 TZ Wassenaar", banen=Kieviten, Golfclub De(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/35/rozenstein'
WHERE id IN (
  '53cc3b11-da8d-459c-9be5-918f34ba5b2a'
);
```

### Sallandsche Golfclub (Netherlands, 1 courses)

- DB: lat=52.2964558, lon=6.1633064, addr="Golfweg 2, Diepenveen", website=null
- NGF (high, sim=1): name="Sallandsche", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/19/sallandsche", email="secretariaat@sallandsche.nl"
- OSM (low, 441m, sim=0.688): name="Sallandsche Golfclub 'de Hoek'", website="https://sallandsche.nl/", addr=null
- LC  (low, 294m, sim=0.688): name="Sallandsche Golfclub 'de Hoek'", addr="Golfweg 2, 7431 PR Diepenveen", banen=Sallandsche Golfclub 'de Hoek'(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/19/sallandsche'
WHERE id IN (
  '3c7d0eb2-1dd6-423e-9551-2a75a731f021'
);
```

### Schaerweijde Golf (Netherlands, 1 courses)

- DB: lat=52.1037897, lon=5.2667881, addr="HEIN BOTTINGALAAN 1, Zeist", website=null
- NGF (high, sim=1): name="Schaerweijde", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/532/schaerweijde", email="secretaris.golf@schaerweijde.nl"
- OSM (high, 161m, sim=1): name="Schaerweijde Golf", website="https://schaerweijde-golf.nl/", addr=null
- LC  (high, 45m, sim=1): name="Schaerweijde Golf", addr="Hein Bottingalaan 1, 3707 NX  Zeist", banen=Schaerweijde Golf(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/532/schaerweijde'
WHERE id IN (
  '3349734b-8264-4adb-95cf-7e1c5962ab65'
);
```

### Shortgolf Swifterbant (Netherlands, 1 courses)

- DB: lat=52.5816975, lon=5.6262493, addr="Rivierduinweg 9, 8255 PJ Swifterbant, Netherlands", website=null
- NGF (high, sim=1): name="Shortgolf Swifterbant", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/759/shortgolf-swifterbant", email="info@shortgolf.nl"
- OSM (medium, 284m, sim=1): name="Shortgolf Swifterbant", website="https://www.shortgolf.nl", addr=null
- LC  (high, 67m, sim=1): name="Shortgolf Swifterbant", addr="Rivierduinweg 9, 8255 PJ, Swifterbant", banen=Shortgolf Swifterbant(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/759/shortgolf-swifterbant'
WHERE id IN (
  'ff958faa-81f1-4ce2-906a-cd725dad8ca2'
);
```

### ShortGolf Utrecht (Netherlands, 3 courses)

- DB: lat=52.0580647, lon=5.0925733, addr="Sportpark Galecop 10, Nieuwegein", website=null
- NGF (high, sim=1): name="Shortgolf Utrecht", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/382/shortgolf-utrecht", email="info@shortgolf-utrecht.nl"
- OSM (low, 112m, sim=0.235): name="Galecop Golf", website="https://www.galecop-golf.nl/", addr=null
- LC  (high, 208m, sim=1): name="ShortGolf Utrecht", addr="Sportpark Galecop 10, 3438 HX Nieuwegein", banen=9-holes Par 3(9); 9-holes Par 3/Par 4(9)

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/382/shortgolf-utrecht'
WHERE id IN (
  '27c5e836-844f-4e0b-894e-35c4bc5d81d2',
  '4a967487-a235-4291-a03a-433d27b69f63',
  '849b7cf8-75c6-442a-94ee-c7d2e3d23fc1'
);
```

### Sluispolder (Netherlands, 1 courses)

- DB: lat=52.6575573, lon=4.7396779, addr="Sluispolderweg 7, Alkmaar", website=null
- NGF (high, sim=1): name="Sluispolder", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/31/sluispolder", email="info@sluispolder.nl"
- OSM (medium, 267m, sim=1): name="Sluispolder", website="https://sluispolder.nl/", addr=null
- LC  (high, 25m, sim=1): name="Golfbaan Sluispolder", addr="Sluispolderweg 7, 1817 BM Alkmaar", banen=Par 3(9); Golfbaan Sluispolder(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/31/sluispolder'
WHERE id IN (
  '5837156d-adda-47ab-bf92-8964b721d134'
);
```

### Soestduinen (Netherlands, 1 courses)

- DB: lat=52.1419196, lon=5.2917463, addr="van Weerden Poelmanweg 8, Soestduinen", website=null
- NGF (high, sim=1): name="Soestduinen", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/797/soestduinen", email="info@golfparksoestduinen.nl"
- OSM (low, 93m, sim=0.55): name="Golfpark Soestduinen", website="https://www.golfparksoestduinen.nl/", addr=null
- LC  (low, 183m, sim=0.55): name="Golfpark Soestduinen", addr="van Weerden Poelmanweg 8, 3768 MN Soestduinen", banen=Par 3 Soestduinen(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/797/soestduinen'
WHERE id IN (
  '26e00f9c-f0f1-4c5e-a909-a81b68e65362'
);
```

### Spandersbosch (Netherlands, 2 courses)

- DB: lat=52.2555442, lon=5.1726752, addr="Sportpark Crailoo 26, Hilversum", website=null
- NGF (high, sim=1): name="Spandersbosch", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/139/spandersbosch", email="info@golfparkspandersbosch.nl"
- OSM (low, 124m, sim=0.591): name="Golfpark Spandersbosch", website="https://golfparkspandersbosch.nl/", addr=null
- LC  (low, 134m, sim=0.591): name="Golfpark Spandersbosch", addr="Sportpark Crailoo 26, 1222 AA  Hilversum", banen=Boschbaan(9); Crailoobaan(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/139/spandersbosch'
WHERE id IN (
  '544d9b4b-6467-40e4-86fd-4682f318f4fd',
  'eb4efa60-d6c5-4b80-8852-1e84e65a2fcc'
);
```

### St Golfclub Noordeloos (Netherlands, 1 courses)

- DB: lat=51.8980999, lon=4.9277511, addr="Nieuwendijk 20, Noordeloos", website=null
- NGF (low, sim=0.769): name="Noordeloos", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/790/noordeloos", email="info@golfbaannoordeloos.nl"
- OSM (high, 83m, sim=0.769): name="Golfbaan Noordeloos", website="https://www.golfbaannoordeloos.nl/", addr=null
- LC  (high, 54m, sim=0.769): name="Golfbaan Noordeloos", addr="Nieuwendijk 20, 4225 PE Noordeloos", banen=Golfbaan Noordeloos Par 3(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 83m, sim=0.769)
```sql
UPDATE courses SET
  website = 'https://www.golfbaannoordeloos.nl/'
WHERE id IN (
  '0771aa2a-fd47-45c0-8e23-ec86d61737d3'
);
```

### Stippelberg (Netherlands, 2 courses)

- DB: lat=51.5148164, lon=5.7595719, addr="Hooizak 7, Bakel", website=null
- NGF (high, sim=1): name="Stippelberg", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/162/stippelberg", email="info@golfbaan-stippelberg.com"
- OSM (high, 131m, sim=1): name="Golfbaan Stippelberg", website="https://golfbaan-stippelberg.com/", addr="Hooizak, 7, 5761RZ, Bakel"
- LC  (high, 131m, sim=1): name="Golfbaan Stippelberg", addr="Hooizak 7, 5761 RZ Bakel", banen=Executive course(9); Championship course(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/162/stippelberg'
WHERE id IN (
  'a7823068-fb37-457a-9520-3145b81e4af7',
  'dbe1eacf-4f28-458e-ae50-7d41d9d6129f'
);
```

### Tespelduyn (Netherlands, 2 courses)

- DB: lat=52.2833916, lon=4.5258492, addr="Tespellaan 53, Noordwijkerhout", website=null
- NGF (high, sim=1): name="Tespelduyn", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/414/tespelduyn", email="info@tespelduyn.nl"
- OSM (medium, 337m, sim=1): name="Golfbaan Tespelduyn", website="https://golfbaantespelduyn.nl/", addr=null
- LC  (high, 247m, sim=1): name="Golfbaan Tespelduyn", addr="Tespellaan 53, 2211VT Noordwijkerhout", banen=Bloembollenbaan(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/414/tespelduyn'
WHERE id IN (
  '0a4f96a5-dff6-4991-afba-1958ed6ef5c3',
  '4f3c7ff8-5fb2-4c22-9e47-deb045e479fa'
);
```

### The Duke (Netherlands, 2 courses)

- DB: lat=51.7175277, lon=5.5609073, addr="Slotenseweg 11, Nistelrode", website=null
- NGF (high, sim=1): name="The Duke", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/768/the-duke", email="receptie@thedukegolf.nl"
- OSM (medium, 390m, sim=1): name="The Duke Club", website="https://thedukegolf.nl/", addr=null
- LC  (high, 135m, sim=1): name="The Duke Club", addr="Slotenseweg 11, 5388 RC Nistelrode", banen=The Duke(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/768/the-duke'
WHERE id IN (
  '5219c270-30e2-4451-b63f-509b8834f502',
  '7f531c8d-a8ed-47b3-a9b3-42b5fb10cdc8'
);
```

### The Dutch (Netherlands, 1 courses)

- DB: lat=51.8501949, lon=5.0199612, addr="Haarweg 3, Spijk", website=null
- NGF (high, sim=1): name="The Dutch", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/737/the-dutch", email="membershipservices@thedutch.nl"
- OSM (medium, 448m, sim=1): name="The Dutch", website="https://www.thedutch.nl", addr=null
- LC  (medium, 303m, sim=1): name="The Dutch", addr="Haarweg 3, 4212 KJ Spijk", banen=Montgomerie Course(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/737/the-dutch'
WHERE id IN (
  '2c68a2f5-9327-4da7-957b-ed4a1f80d530'
);
```

### The golf club Breuninkhof (Netherlands, 2 courses)

- DB: lat=52.1990305, lon=6.1245203, addr="Bussloselaan 6, Voorst Gem Voorst", website=null
- NGF (high, sim=1): name="Breuninkhof", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/76/breuninkhof", email="info@debreuninkhof.nl"
- OSM (medium, 327m, sim=1): name="De Breuninkhof", website="https://debreuninkhof.nl/", addr=null
- LC  (low, 48m, sim=0.55): name="Golfpark De Breuninkhof", addr="Bussloselaan 6, 7383 RP Voorst", banen=Korte Baan (Par 3)(9); Grote Baan(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/76/breuninkhof'
WHERE id IN (
  'a215f84e-399d-46a8-ba0a-8b0ff30ad418',
  'd8897a7f-b72d-4bed-b6b0-47ecfa5bd796'
);
```

### The International (Netherlands, 1 courses)

- DB: lat=52.3302884, lon=4.8020098, addr="Oude Haagseweg 200, Badhoevedorp", website=null
- NGF (high, sim=1): name="The International", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/762/the-international", email="info@theinternational.nl"
- OSM (high, 43m, sim=1): name="The International", website="https://www.theinternational.nl/", addr="Oude Haagseweg, 200, 1171PE, Badhoevedorp"
- LC  (high, 215m, sim=1): name="The International", addr="Oude Haagseweg 200, 1171 PE, Badhoevedorp", banen=The International - Championship Course(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/762/the-international'
WHERE id IN (
  'e1c35a75-bee2-4ff8-b023-0f62a8ed6431'
);
```

### The Links Valley (Netherlands, 2 courses)

- DB: lat=52.3017649, lon=5.6898931, addr="Jhr. Dr. C.J. Sandbergweg 117, Ermelo", website=null
- NGF (high, sim=1): name="The Links Valley", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/172/the-links-valley", email="info@thelinksvalley.nl"
- OSM (medium, 328m, sim=1): name="The Links Valley", website="https://www.thelinksvalley.nl/", addr="3852PT, Ermelo"
- LC  (low, 1542m, sim=1): name="The Links Valley", addr="Jonkheer Doctor C.J. Sandbergweg 117 , 3852 PT  Ermelo", banen=North Course(9); South Course(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/172/the-links-valley'
WHERE id IN (
  'd536c25e-22c1-4f5c-ad3d-328c02bf5fb3',
  'f53b9d27-8f53-4c1c-8460-e438b1f07795'
);
```

### Twentsche Golfclub (Netherlands, 1 courses)

- DB: lat=52.2894486, lon=6.674608, addr="Almelosestraat 17, Ambt-Delden", website=null
- NGF (high, sim=1): name="Twentsche", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/13/twentsche", email="info@twentschegolfclub.nl"
- OSM (high, 167m, sim=1): name="Twentsche Golfclub", website="https://www.twentschegolfclub.nl/", addr=null
- LC  (high, 46m, sim=1): name="Twentsche Golfclub", addr="Almelosestraat 17, 7495 TG Ambt-Delden", banen=Twentsche Golfclub(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/13/twentsche'
WHERE id IN (
  'd3b17b7c-8405-41d7-968d-50240393ff94'
);
```

### Twentse Golf Park (Netherlands, 1 courses)

- DB: lat=52.1402133, lon=6.7288295, addr="Hasseltweg 5a, Haaksbergen", website=null
- NGF (high, sim=1): name="Twentse Golf Park", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/615/twentse-golf-park", email="info@twentsegolfpark.nl"
- OSM (high, 55m, sim=1): name="Twentse Golf Park", website="https://www.twentsegolfpark.nl/", addr=null
- LC  (high, 55m, sim=1): name="Golfclub Twentse Golf Park", addr="Watermolenweg 1, 7481 VL Haaksbergen", banen=Parkbaan(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/615/twentse-golf-park'
WHERE id IN (
  'a7ce0695-d4f3-4860-a21b-3b80d572559c'
);
```

### Valkenswaardse Golfclub (Netherlands, 1 courses)

- DB: lat=51.365114, lon=5.4612648, addr="Pastoor Heerkensdreef 16c, valkenswaard", website=null
- NGF (high, sim=1): name="Valkenswaardse", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/596/valkenswaardse", email="secretaris@valkenswaardsegolfclub.nl"
- OSM (high, 184m, sim=1): name="Valkenswaardse Golfclub", website="https://www.valkenswaardsegolfclub.nl", addr=null
- LC  (medium, 469m, sim=1): name="De Valkenswaardse Golfclub", addr="Pastoor Heerkensdreef 16c, 5552 BG Valkenswaard", banen=De Valkenswaardse Golfclub(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/596/valkenswaardse'
WHERE id IN (
  '76dbdf47-7f45-42fc-a93e-b663a8cbaeb8'
);
```

### Veluwse Golf Club (Netherlands, 1 courses)

- DB: lat=52.2173624, lon=5.8710322, addr="Hoog Soeren 57, Hoog Soeren", website=null
- NGF (high, sim=1): name="Veluwse", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/16/veluwse", email="secretariaat@veluwsegolfclub.nl"
- OSM (medium, 252m, sim=1): name="Veluwse Golfclub", website="https://www.veluwsegolfclub.nl/", addr=null
- LC  (high, 116m, sim=1): name="Veluwse Golf Club", addr="Hoog Soeren 57, 7346 AC Hoog-Soeren", banen=Veluwse Golf Club(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/16/veluwse'
WHERE id IN (
  'bdbf0857-1c5e-4760-9145-02d9bc1e45e2'
);
```

### Westerpark (Netherlands, 1 courses)

- DB: lat=52.0622892, lon=4.4877545, addr="Zoetermeer", website=null
- NGF (high, sim=1): name="Westerpark", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/126/westerpark", email="info@golfparkwesterpark.nl"
- OSM (low, 3872m, sim=1): name="Golfclub Westerpark", website="https://www.burggolf.nl/golfbanen/golfclub-westerpark-zoetermeer/", addr=null
- LC  (no-match, 153262m, sim=0.667): name="Golfclub Twentse Golf Park", addr="Watermolenweg 1, 7481 VL Haaksbergen", banen=Parkbaan(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/126/westerpark'
WHERE id IN (
  '2172c5af-cf1d-4cc6-a56d-f02fc681c923'
);
```

### Zaanse Golf Club (Netherlands, 1 courses)

- DB: lat=52.4716067, lon=4.8634835, addr="Zuiderweg 68, Wijdewormer", website=null
- NGF (high, sim=1): name="De Zaanse", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/55/de-zaanse", email="receptie@dezaanse.nl"
- OSM (high, 212m, sim=1): name="Zaanse Golf Club", website="https://zaansegolfclub.nl/", addr=null
- LC  (medium, 471m, sim=1): name="De Zaanse", addr="Zuiderweg 68, 1456 NH  Wijdewormer", banen=De Zaanse (Wijdewormer)(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/55/de-zaanse'
WHERE id IN (
  'a8094283-c435-4507-8978-10d802ad48af'
);
```

### Zeegersloot (Netherlands, 2 courses)

- DB: lat=52.1439815, lon=4.6972412, addr="Kromme Aarweg 5, Alphen aan den Rijn", website=null
- NGF (high, sim=1): name="Zeegersloot", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/37/zeegersloot", email="secretariaat@zeegersloot.nl"
- OSM (high, 232m, sim=1): name="Golfclub Zeegersloot", website="https://www.zeegersloot.nl/", addr=null
- LC  (high, 75m, sim=1): name="Golfclub Zeegersloot", addr="Kromme Aarweg 5, 2403 NB Alphen a/d Rijn", banen=Parkbaan (9 Holes)(9); Griend- en Heuvelbaan(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/37/zeegersloot'
WHERE id IN (
  '13865c99-86d5-43d0-bfc0-6b531c57082a',
  '53fb3465-398e-4b6e-a2c4-a7ef25f1d79c'
);
```

### Zeewolde (Netherlands, 10 courses)

- DB: lat=52.32401, lon=5.5070426, addr="Golflaan 1, Zeewolde", website=null
- NGF (high, sim=1): name="Zeewolde", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/36/zeewolde", email="secretariaat@golfclub-zeewolde.nl"
- OSM (medium, 388m, sim=1): name="Golfclub Zeewolde", website="https://www.golfclub-zeewolde.nl/", addr=null
- LC  (high, 53m, sim=1): name="Golfclub Zeewolde", addr="Golflaan 1, 3896 LL Zeewolde", banen=Aak - Botter(18); Pluut - Aak(18); Botter - Pluut(18); Jol (9 holes, par 3-4)(9)

**Proposed UPDATE** (alle 10 course rows for klub, overall=high):
  - website: from ngf(high, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/36/zeewolde'
WHERE id IN (
  '11a5b6f5-f277-4d51-bc42-82fa986bf619',
  '26f0b86a-abfe-4708-bf2b-5383da1fde6e',
  '370f4e8b-900e-4028-9ba8-0b6af379354d',
  '3d37f8eb-fcb4-4286-83c0-5f6eb4bbf60e',
  '46f5578d-5b93-44e7-bd44-9c0a47978093',
  '5fc7dc0d-ce83-4964-8a23-fc17056dc7a5',
  '6d43b0d2-9aec-49f7-8cdf-85f91c030fc5',
  'b0318c9e-16be-4a87-8eb0-e6919df95517',
  'bbac2560-462b-47b9-b627-4ad21084bde5',
  'c1f4dde8-e465-4b50-b07b-2a4d213e2b41'
);
```

## Medium confidence (review before applying)

### Bernardus Golf (Netherlands, 1 courses)

- DB: lat=51.6651777, lon=5.2297158, addr="Deutersestraat 39D, Cromvoirt", website=null
- NGF (no-match, sim=0.444): name="Bentwoud", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/757/bentwoud", email="info@golfbaanbentwoud.nl"
- OSM (medium, 455m, sim=1): name="Bernardus Golf", website="https://bernardusgolf.com/", addr=null
- LC  (high, 94m, sim=1): name="Bernardus Golf", addr="Deutersestraat 39D, 5266 AW Cromvoirt", banen=Championship Course(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 455m, sim=1)
```sql
UPDATE courses SET
  website = 'https://bernardusgolf.com/'
WHERE id IN (
  'f97796a1-8526-47c7-83d4-b6ffe412177f'
);
```

### GC Hoogland Amersfoort (Netherlands, 1 courses)

- DB: lat=52.1870421, lon=5.3669444, addr="Bunschoterstraat 23,  Hoogland", website=null
- NGF (no-match, sim=0.421): name="Hoogland", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/166/hoogland", email="info@gcha.nl"
- OSM (medium, 251m, sim=1): name="Golfclub Hoogland Amersfoort", website="https://www.gcha.nl/", addr=null
- LC  (high, 56m, sim=1): name="Golfclub Hoogland Amersfoort", addr="Bunschoterstraat 23, 3828 NR, Hoogland", banen=Indoorbaan(9); Hoogland 9-holes(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 251m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.gcha.nl/'
WHERE id IN (
  '9018cfe4-1420-496e-a025-4d28af1cb202'
);
```

### Golfbaan Waterland Amsterdam (Netherlands, 2 courses)

- DB: lat=52.4093905, lon=4.9422258, addr="Buikslotermeerdijk 141, Amsterdam", website=null
- NGF (no-match, sim=0.474): name="Waterland", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/74/waterland", email="info@golfwaterland.nl"
- OSM (medium, 475m, sim=1): name="Golfbaan Waterland Amsterdam", website="https://www.golfbaanwaterlandamsterdam.nl/", addr=null
- LC  (low, 173m, sim=0.474): name="Golf Waterland", addr="Buikslotermeerdijk 141, 1027 AC Amsterdam", banen=Amsterdam Waterland(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - website: from osm(medium, 475m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golfbaanwaterlandamsterdam.nl/'
WHERE id IN (
  'df192fde-9990-46dd-b38c-a132f8922c05',
  'fd4399ad-8b2d-42cc-9cd3-45ba37d7997a'
);
```

### Golfcentrum Eindhoven (Netherlands, 1 courses)

- DB: lat=51.4543746, lon=5.4935959, addr="J.C. Dirkxpad, Eindhoven", website=null
- NGF (no-match, sim=0.409): name="Golfresidentie Dronten", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/112/golfresidentie-dronten", email="RHCie@golfresidentie.nl"
- OSM (medium, 262m, sim=1): name="Golfcentrum Eindhoven", website="https://golfcentrumeindhoven.nl/", addr=null
- LC  (high, 78m, sim=1): name="Golfcentrum Eindhoven", addr="J.C. Dirkxpad 5631 BZ, Eindhoven", banen=Par 3 golfbaan(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 262m, sim=1)
```sql
UPDATE courses SET
  website = 'https://golfcentrumeindhoven.nl/'
WHERE id IN (
  'b9fa333c-ac73-41a4-bd39-5998c0901792'
);
```

### Golfpark Almkreek (Netherlands, 3 courses)

- DB: lat=51.7716623, lon=4.9719917, addr="Hoekje 7B, Almkerk", website=null
- NGF (no-match, sim=0.556): name="Golfpark Rotterdam", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/1001/golfpark-rotterdam", email="info@golfparkrotterdam.nl"
- OSM (medium, 274m, sim=1): name="Golfpark Almkreek", website="https://golfpark-almkreek.nl/", addr=null
- LC  (medium, 370m, sim=1): name="Golfpark Almkreek", addr="Hoekje 7b, 4286 LN Almkerk", banen=18 holes Course (Almkreek)(18); 14 holes par 3/4 baan(14); 9 holes par 3(9)

**Proposed UPDATE** (alle 3 course rows for klub, overall=medium):
  - website: from osm(medium, 274m, sim=1)
```sql
UPDATE courses SET
  website = 'https://golfpark-almkreek.nl/'
WHERE id IN (
  '93c08ba7-fff3-4bdb-9013-91bcc88926d5',
  '9ae6b915-ddfd-4ce3-8126-49ebfea35625',
  'd9e646a6-0e0e-4254-8044-59df4b8e49ca'
);
```

### Golfsociëteit de Lage Vuursche (Netherlands, 1 courses)

- DB: lat=52.1530043, lon=5.2399012, addr="Dolderseweg 262, 3734 BS Den Dolder, Netherlands", website=null
- NGF (no-match, sim=0.481): name="De Lage Vuursche", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/122/de-lage-vuursche", email="secretariaat@golflagevuursche.nl"
- OSM (medium, 423m, sim=1): name="Golfsociëteit De Lage Vuursche", website="https://www.golflagevuursche.nl/", addr=null
- LC  (high, 69m, sim=1): name="Golfsociëteit De Lage Vuursche", addr="Dolderseweg 262, 3734 BS Den Dolder", banen=De Lage Vuursche(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 423m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.golflagevuursche.nl/'
WHERE id IN (
  '4729638a-8a28-4fa5-a528-20553e595ca1'
);
```

### Haverlij (Netherlands, 1 courses)

- DB: lat=52.5139337, lon=5.5274743, addr=null, website=null
- NGF (medium, sim=0.889): name="De Haverleij", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/130/de-haverleij", email="info@golfparkdehaverleij.nl"
- OSM (low, 89743m, sim=0.889): name="Golfclub De Haverleij", website="https://www.burggolf.nl/golfbanen/golfclub-de-haverleij-s-hertogenbosch/", addr=null
- LC  (low, 206m, sim=0.111): name="Golf & Country Club Buitenhof", addr="Runderweg 15, 8219 PK Lelystad", banen=Hoofdbaan(4)

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from ngf(medium, sim=0.889)
```sql
UPDATE courses SET
  website = 'http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/130/de-haverleij'
WHERE id IN (
  'd1740ac7-5f2d-470a-990e-09f9e68517b6'
);
```

### Kasteel Engelenburg (Netherlands, 1 courses)

- DB: lat=52.090482, lon=6.1345987, addr="Eerbeekseweg 6, Brummen", website=null
- NGF (no-match, sim=0.579): name="Engelenburg", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/134/engelenburg", email="info@engelenburg.com"
- OSM (medium, 398m, sim=1): name="Golfbaan Kasteel Engelenburg", website="https://www.engelenburg.com/nl/golf", addr=null
- LC  (high, 99m, sim=1): name="Golfbaan Kasteel Engelenburg", addr="Eerbeekseweg 6, 6971 LB Brummen", banen=Kasteel Engelenburg(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 398m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.engelenburg.com/nl/golf'
WHERE id IN (
  '6526dc48-96ff-4552-bf1d-8546aa7f4b3f'
);
```

### Utrechtse Golfclub Amelisweerd (Netherlands, 2 courses)

- DB: lat=52.0630525, lon=5.1508361, addr="Mereveldseweg 7, Utrecht", website=null
- NGF (no-match, sim=0.524): name="Amelisweerd", website="http://www.golf.nl/banen-en-clubs/waar-kan-ik-golfen/121/amelisweerd", email="secretariaat@amelisweerd.nl"
- OSM (medium, 404m, sim=1): name="Utrechtse Golfclub Amelisweerd", website="https://www.amelisweerd.nl/", addr=null
- LC  (high, 134m, sim=1): name="Utrechtse Golfclub Amelisweerd", addr="Mereveldseweg 7, 3585 LH Utrecht", banen=Golfbaan Amelisweerd(18); Par 3 baan(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - website: from osm(medium, 404m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.amelisweerd.nl/'
WHERE id IN (
  '218ae76d-dc3d-45a2-b1cb-065588a9cadc',
  'faca6f34-2c5b-455e-8681-9f622d05d2ee'
);
```

## Low confidence (manual decision)

## No match in NGF/OSM/LC

- Blue Bay Curaçao (Netherlands, 1 courses) — DB lat=12.1432982, lon=-68.9768434
- Curacao Golf Club (Netherlands, 1 courses) — DB lat=51.690024, lon=4.4430083
- Delft (Netherlands, 1 courses) — DB lat=51.9994572, lon=4.3627245
- Düneburg turnier (Netherlands, 1 courses) — DB lat=51.820118, lon=5.8201461
- Golf Estate Nieuwkerk (Netherlands, 1 courses) — DB lat=51.5095148, lon=5.0474436
- Golf Event Center (Netherlands, 1 courses) — DB lat=52.5150949, lon=5.4768915
- Golfbaan De Achterste Hoef (Netherlands, 1 courses) — DB lat=51.3434035, lon=5.2278062
- Heiloo G & CC (Netherlands, 1 courses) — DB lat=52.6050033, lon=4.7125066
- Het langeloo (Netherlands, 1 courses) — DB lat=52.145665, lon=6.7425055
- Old Quarry Golf Course Curacao (Netherlands, 1 courses) — DB lat=12.0636217, lon=-68.8499249
- The Fox Golf Course (Netherlands, 1 courses) — DB lat=51.4071244, lon=6.1096701
- Vossenhole (Netherlands, 1 courses) — DB lat=51.5856184, lon=5.0660616