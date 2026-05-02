# Ireland match report
Generated: 2026-05-02T03:21:32

## Summary

| Bucket | Clubs | Courses |
|---|---:|---:|
| High conf — auto-apply candidate | 51 | 77 |
| Medium conf — review | 56 | 59 |
| Low conf — manual | 0 | 0 |
| No match in OSM or GI | 20 | 21 |

## Field-fill projection

| Field | Clubs | Courses |
|---|---:|---:|
| website | 100 | 129 |
| address | 10 | 10 |
| phone | 0 | 0 |
| latitude | 0 | 0 |

## High confidence (recommended to apply)

### Westport Golf Club (Ireland, 1 courses)

- DB: lat=53.8108376, lon=-9.5641284, addr="Carrowholly, Carrowholly", website=null, phone=null
- OSM (high, 12m, sim=1): name="Westport Golf Club", website="https://www.westportgolfclub.ie/", addr="Westport"
- GI  (high, 177m, sim=1): name="Westport Golf Club", addr="Carrowholly, Westport, Co. Mayo, F28 VY07", phone="09828262"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 12m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.westportgolfclub.ie/'
WHERE id IN (
  'd6108a54-f7f8-4dfe-b1af-f976b7222a31'
);
```

### Tramore Pitch & Putt (Ireland, 1 courses)

- DB: lat=52.1427191, lon=-7.1793788, addr=null, website=null, phone=null
- OSM (high, 33m, sim=0.818): name="Tramore Pitch and Putt", website=null, addr="Westownn, Tramore"
- GI  (no-match, 1554m, sim=0.389): name="Tramore Golf Club", addr="Newtown, Tramore, Co. Waterford", phone="051 386170"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - address: from osm(high, 33m, sim=0.818)
```sql
UPDATE courses SET
  address = 'Westownn, Tramore'
WHERE id IN (
  '4ceeb4cb-211a-4f87-b00c-4559dd336fe9'
);
```

### Adare Manor Golf Club (Ireland, 1 courses)

- DB: lat=52.5704929, lon=-8.7790615, addr="Limerick Road, Adare", website=null, phone=null
- OSM (high, 6m, sim=1): name="Adare Manor Golf Club", website="https://adaremanorgolfclub.com/", addr=null
- GI  (medium, 682m, sim=1): name="Adare Manor Golf Club", addr="Adare (Old Course), Co. Limerick", phone="061-396204"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 6m, sim=1)
```sql
UPDATE courses SET
  website = 'https://adaremanorgolfclub.com/'
WHERE id IN (
  'c3bf0363-6dfd-4674-89b3-be011ef16ff8'
);
```

### Williamstown Golf Course (Ireland, 1 courses)

- DB: lat=52.2339412, lon=-7.088488, addr="Outer Ring Road, Williamstown", website=null, phone=null
- OSM (high, 3m, sim=1): name="Williamstown Golf Course", website="http://williamstowngolfcourse.ie", addr=null
- GI  (medium, 549m, sim=1): name="Williamstown Golf Club", addr="Williamstown Golf Club, Outer Ring Road, Williamstown, Waterford City", phone="051 849 610"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 3m, sim=1)
```sql
UPDATE courses SET
  website = 'http://williamstowngolfcourse.ie'
WHERE id IN (
  'd4a5bda4-d63b-4101-972f-28cac7e01109'
);
```

### Wexford Golf Club (Ireland, 1 courses)

- DB: lat=52.3216558, lon=-6.4634862, addr="Mulgannon, Wexford", website=null, phone=null
- OSM (high, 239m, sim=1): name="Wexford Golf Club", website="https://wexfordgolfclub.ie/", addr="Wexford"
- GI  (medium, 473m, sim=1): name="Wexford Golf Club", addr="Mulgannon, Wexford", phone="0539142238"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 239m, sim=1)
```sql
UPDATE courses SET
  website = 'https://wexfordgolfclub.ie/'
WHERE id IN (
  '2cc32cf0-0552-4142-94e4-1e29293781e1'
);
```

### Strandhill Golf Club (Ireland, 1 courses)

- DB: lat=54.2656246, lon=-8.6067085, addr="Golf Course Road, Strandhill", website=null, phone=null
- OSM (high, 40m, sim=1): name="Strandhill Golf Club", website="https://www.strandhillgolfclub.com/", addr=null
- GI  (high, 195m, sim=1): name="Strandhill Golf Club", addr="Strandhill, Co Sligo", phone="0719168188"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 40m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.strandhillgolfclub.com/'
WHERE id IN (
  '445e925e-ad2b-4a4b-b861-a48b8295eab3'
);
```

### St Anne's Golf Club (Ireland, 1 courses)

- DB: lat=53.3741855, lon=-6.1405452, addr="Bull Island Nature Reserve, Dollymount", website=null, phone=null
- OSM (high, 4m, sim=1): name="St Anne's Golf Club", website="https://www.stanneslinksgolf.com/", addr=null
- GI  (high, 217m, sim=1): name="St. Anne's Golf Club", addr="Bull Island Nature Reserve, Dollymount, Dublin 5", phone="018336471"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 4m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.stanneslinksgolf.com/'
WHERE id IN (
  'd5c19f39-9d33-49ce-8fb6-0149ba10a73c'
);
```

### Redcastle Golf Club (Ireland, 1 courses)

- DB: lat=55.1593135, lon=-7.1284134, addr="Inishowen Peninsula, Moville", website=null, phone=null
- OSM (high, 9m, sim=1): name="Redcastle Hotel golf course", website="https://www.redcastlehoteldonegal.com/", addr=null
- GI  (high, 204m, sim=1): name="Redcastle Golf Club", addr="Redcastle Hotel, Redcastle, Co. Donegal", phone="00353789"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 9m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.redcastlehoteldonegal.com/'
WHERE id IN (
  '58bcd102-7ada-4fe8-8fb0-389b558f9b5f'
);
```

### Rathaspeck Manor Golf Course (Ireland, 1 courses)

- DB: lat=52.3063944, lon=-6.4990812, addr="Rathaspeck Manor, Rathaspeck", website=null, phone=null
- OSM (high, 157m, sim=1): name="Rathaspeck Manor Golf Course", website="https://www.rathaspeckmanor.ie/", addr="Wexford"
- GI  (no-match, 157120m, sim=0.563): name="Adare Manor Golf Club", addr="Adare (Old Course), Co. Limerick", phone="061-396204"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 157m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.rathaspeckmanor.ie/'
WHERE id IN (
  'eb2dfecc-e5ac-43f6-a387-66aed5483945'
);
```

### Portsalon Golf Club (Ireland, 1 courses)

- DB: lat=55.1998813, lon=-7.626505, addr="Fanad Way, Portsalon", website=null, phone=null
- OSM (high, 169m, sim=1): name="Portsalon Golf Club", website="https://www.portsalongolfclub.ie/", addr=null
- GI  (medium, 833m, sim=1): name="Portsalon Golf Club", addr="Portsalon, Fanad, Co. Donegal", phone="0749159459"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 169m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.portsalongolfclub.ie/'
WHERE id IN (
  'bf90faad-f963-4ab2-9685-896c0f9e9694'
);
```

### Ballymoney Golf Club (Ireland, 1 courses)

- DB: lat=52.6757922, lon=-6.236426, addr="The New Line, Ballymoney, Gorey", website=null, phone=null
- OSM (high, 50m, sim=1): name="Ballymoney Golf Course", website="https://ballymoneygolfclub.ie/", addr="Ballymoney"
- GI  (high, 163m, sim=1): name="Ballymoney Golf Club", addr="Ballymoney, Gorey, Co. Wexford", phone="0539421976"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 50m, sim=1)
```sql
UPDATE courses SET
  website = 'https://ballymoneygolfclub.ie/'
WHERE id IN (
  'abc22b74-84ed-4c53-85b1-a9fc0e389a53'
);
```

### Carrick On Shannon Golf Club (Ireland, 1 courses)

- DB: lat=53.9634954, lon=-8.1720845, addr="Woodbrook, Carrick-On-Shannon", website=null, phone=null
- OSM (high, 193m, sim=1): name="Carrick on Shannon Golf Club", website="https://www.carrickgolfclub.ie/", addr="Carrick-on-Shannon"
- GI  (medium, 465m, sim=1): name="Carrick-on-Shannon GC", addr="Usna, Woodbrook, Carrick on Shannon, Co. Roscommon", phone="0719667015"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 193m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.carrickgolfclub.ie/'
WHERE id IN (
  'c49d97d7-d374-4a29-ae19-2aa8b42207df'
);
```

### Castlegregory Golf Links (Ireland, 1 courses)

- DB: lat=52.2584183, lon=-10.0618943, addr="Stradbally, Castlegregory", website=null, phone=null
- OSM (high, 12m, sim=1): name="Castlegregory Golf Links", website="https://castlegregorygolflinks.com/", addr=null
- GI  (medium, 316m, sim=1): name="Castlegregory Golf Club", addr="Stradbally, Castlegregory, Tralee, Co. Kerry", phone="0667139444"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 12m, sim=1)
```sql
UPDATE courses SET
  website = 'https://castlegregorygolflinks.com/'
WHERE id IN (
  '191d0cc3-02e0-4c08-a2c8-352c95959bb1'
);
```

### Cork Golf Club (Ireland, 1 courses)

- DB: lat=51.8968815, lon=-8.3533637, addr="Castleview Road, Little Island", website=null, phone=null
- OSM (high, 153m, sim=1): name="Cork Golf Club", website="https://www.corkgolfclub.ie", addr="Little Island"
- GI  (medium, 497m, sim=1): name="Cork Golf Club", addr="Little Island, Co. Cork", phone="0214353451"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 153m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.corkgolfclub.ie'
WHERE id IN (
  'ce0650ad-945b-49ec-9201-a09fd8c3a2e1'
);
```

### Dooks Golf Club (Ireland, 1 courses)

- DB: lat=52.0851868, lon=-9.9289951, addr="Dooks Golf Links, Glenbeigh", website=null, phone=null
- OSM (high, 75m, sim=1): name="Dooks Golf Club", website="https://www.dooks.com/", addr=null
- GI  (medium, 366m, sim=1): name="Dooks Golf Club", addr="Dooks, Glenbeigh, Co. Kerry", phone="066 9768205"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 75m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.dooks.com/'
WHERE id IN (
  '09bd9846-9264-4efc-97b9-ea7967cf0147'
);
```

### Dundalk Golf Club (Ireland, 1 courses)

- DB: lat=53.9735455, lon=-6.3754943, addr="New Golf Links Road, Dundalk", website=null, phone=null
- OSM (high, 13m, sim=1): name="Dundalk Golf Club", website="https://www.dundalkgolfclub.ie/", addr=null
- GI  (high, 175m, sim=1): name="Dundalk Golf Club", addr="Blackrock, Dundalk, County Louth", phone="0429321731"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 13m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.dundalkgolfclub.ie/'
WHERE id IN (
  'e25eb346-55bc-49e4-b990-f7c03abcaf80'
);
```

### Killeen Golf Club (Ireland, 1 courses)

- DB: lat=53.2619322, lon=-6.6200029, addr="Barberstown Road, Kill", website=null, phone=null
- OSM (high, 11m, sim=1): name="Killeen Golf Club", website="https://www.killeengolf.com/", addr=null
- GI  (medium, 363m, sim=1): name="Killeen Golf Club", addr="Kill, Naas, Co. Kildare", phone="045866003"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 11m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.killeengolf.com/'
WHERE id IN (
  '67dfba1b-24bd-4974-8768-127dba2fdb46'
);
```

### Mannan Castle Golf Club (Ireland, 1 courses)

- DB: lat=54.0054404, lon=-6.6974634, addr="Donaghmoyne, Carrickmacross", website=null, phone=null
- OSM (high, 225m, sim=1): name="Mannan Castle Golf Club", website="https://www.mannancastlegolfclub.ie/", addr="A81 X023, Carrickmacross"
- GI  (high, 238m, sim=1): name="Mannan Castle Golf Club", addr="Donaghmoyne, Carrickmacross, Co. Monaghan", phone="0429663308"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 225m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.mannancastlegolfclub.ie/'
WHERE id IN (
  'd3fae973-f960-4698-8cda-fa8036095bd7'
);
```

### Connemara Golf Club (Ireland, 9 courses)

- DB: lat=53.4226533, lon=-10.1426986, addr="Ballyconneely, Clifden", website=null, phone=null
- OSM (high, 49m, sim=1): name="Connemara Golf Club", website="https://www.connemaragolflinks.com/", addr=null
- GI  (high, 224m, sim=1): name="Connemara Golf Club", addr="Aillebrack, Ballyconneely, Clifden, Co.Galway", phone="09523502"

**Proposed UPDATE** (applied to all 9 course rows for this club, overall=high):
  - website: from osm(high, 49m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.connemaragolflinks.com/'
WHERE id IN (
  '149e241b-75e5-4f25-9258-2157ead1afab',
  'f439f1c3-106f-4345-9ca6-2b30c562ae40',
  'bd391a80-7e73-4aec-b3f6-62d09c6dddab',
  'a1ca4069-bfde-44e4-a3f3-51f6f1aba6aa',
  '81c8fccb-e43e-498a-aa51-c0ef35660aea',
  '3ef3d57d-1066-4718-86eb-f824125b7d83',
  'd57985ed-501d-4340-8afe-71a75a1d5473',
  '143b1d49-cff8-49fb-9420-7ff3f9465429',
  'cf8333b6-e2e4-428d-bbf6-3d7366ed5042'
);
```

### Abbey Par 3 Golf (Ireland, 1 courses)

- DB: lat=52.2309498, lon=-6.8645716, addr="Winningtown, Fethard-On-Sea", website=null, phone=null
- OSM (high, 13m, sim=1): name="Abbey Par 3 Golf Course", website="http://abbeypar3.com/", addr="Fethard"
- GI  (no-match, 83201m, sim=0.455): name="Abbeyleix Golf Club", addr="Rathmoyle, Abbeyleix, Co. Laois", phone="0578731450"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 13m, sim=1)
```sql
UPDATE courses SET
  website = 'http://abbeypar3.com/'
WHERE id IN (
  '6ac0f2e9-bca2-4a3c-99e5-8619539bfc01'
);
```

### Balbriggan Golf Club (Ireland, 1 courses)

- DB: lat=53.5908159, lon=-6.1804938, addr="Blackhall, Balbriggan", website=null, phone=null
- OSM (high, 230m, sim=1): name="Balbriggan Golf Club", website="https://www.balbriggangolfclub.com/", addr=null
- GI  (medium, 505m, sim=1): name="Balbriggan Golf Club", addr="Blackhall, Balbriggan, Co. Dublin, K32 HH00", phone="018412229"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 230m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.balbriggangolfclub.com/'
WHERE id IN (
  '56b265a1-d2c6-4e4e-bdaf-1fee522130f4'
);
```

### Ballinascorney Golf Club (Ireland, 1 courses)

- DB: lat=53.2624029, lon=-6.2816402, addr="Kilmashogue Lane, Taylorsgrange", website=null, phone=null
- OSM (high, 21m, sim=1): name="Ballinascorney Golf Club", website="https://www.ballinascorneygolfclub.com/", addr=null
- GI  (medium, 280m, sim=1): name="Ballinascorney Golf Club", addr="Oldfield, Kilmashogue Lane, Rathfarnham, Dublin 16", phone="014937755"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 21m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.ballinascorneygolfclub.com/'
WHERE id IN (
  '0ce642d5-b9dc-4d64-b94c-8f10dc28892c'
);
```

### Ballyhaunis Golf Club (Ireland, 1 courses)

- DB: lat=53.7963955, lon=-8.7751248, addr="N83, Coolnaha, Ballyhaunis", website=null, phone=null
- OSM (high, 103m, sim=1): name="Ballyhaunis Golf Club", website="https://www.ballyhaunisgolfclub.com/", addr=null
- GI  (medium, 397m, sim=1): name="Ballyhaunis Golf Club", addr="Coolnaha, Ballyhaunis, Co. Mayo, F35 P661", phone="0861652680"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 103m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.ballyhaunisgolfclub.com/'
WHERE id IN (
  '31a76a5f-d858-445e-8c37-c68cfc227924'
);
```

### Portmarnock Golf Club (Ireland, 9 courses)

- DB: lat=53.4081786, lon=-6.1198956, addr="Golf Links Road, Portmarnock", website=null, phone=null
- OSM (high, 37m, sim=1): name="Portmarnock Golf Club", website="https://www.portmarnockgolfclub.ie/", addr="Golf Links Road, Portmarnock"
- GI  (medium, 427m, sim=1): name="Portmarnock Golf Club", addr="Golf Links Road, Portmarnock, Co. Dublin", phone="018462968"

**Proposed UPDATE** (applied to all 9 course rows for this club, overall=high):
  - website: from osm(high, 37m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.portmarnockgolfclub.ie/'
WHERE id IN (
  'acb3734e-5211-42a4-bcfa-f9246e682803',
  'ed28242d-bbbe-4985-83d6-dcf734d18dda',
  '08926214-6d93-427d-a794-de107f764fb3',
  '0991cf95-0c5b-4799-a37e-7a66ef9158ec',
  'a50eef87-92d2-4b95-a66a-074bcbbce68d',
  'f422a83d-39d3-4a9d-a149-86bf67c95de3',
  'fddf5adb-4839-45ac-bb5e-c9647090e5fe',
  'ecf5519c-4163-489d-bbd3-95c10a704fe6',
  'f721a047-7cda-4975-82bf-8582d0ee5464'
);
```

### Donabate Golf Club (Ireland, 9 courses)

- DB: lat=53.4805157, lon=-6.1264579, addr="Donabate, Balcarrick", website=null, phone=null
- OSM (high, 93m, sim=1): name="Donabate Golf Club", website="https://www.donabategolfclub.com/", addr="Balcarrick Road, Donabate"
- GI  (high, 125m, sim=1): name="Donabate Golf Club", addr="Balcarrick, Donabate, Co. Dublin", phone="018436346"

**Proposed UPDATE** (applied to all 9 course rows for this club, overall=high):
  - website: from osm(high, 93m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.donabategolfclub.com/'
WHERE id IN (
  'efb371d7-9bc5-41f3-97d9-99a5e4f6a3b2',
  'b1746bd2-ffbd-4a1b-820f-c4ee9b531180',
  '87c57c45-d483-4bac-8a40-b23bf41b8b5f',
  '82172a12-f608-442d-ae53-0b8d81091a89',
  'e9662092-0567-4119-997a-27f982feb924',
  'e574be7a-16a2-48b9-86e0-b8ed3dee6f12',
  '6887fda0-3458-48ee-bc92-9123f60817b0',
  '2e09922c-4cbb-442b-9fc5-34902102bc22',
  '0fe0717e-5db2-497c-b132-7b9d6bd614dc'
);
```

### Castle Barna Golf Club (Ireland, 1 courses)

- DB: lat=53.3015683, lon=-7.2752589, addr="Castlebarnagh, Daingean", website=null, phone=null
- OSM (high, 188m, sim=1): name="Castle Barna Golf Club", website="https://www.castlebarna.ie/", addr=null
- GI  (low, 124923m, sim=0.769): name="Castle Dargan Golf Club", addr="Ballygawley, Co. Sligo", phone="9118080"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 188m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.castlebarna.ie/'
WHERE id IN (
  'bd851479-c56c-43eb-97f2-fc10ffc9766c'
);
```

### Coollattin Golf Club (Ireland, 1 courses)

- DB: lat=52.7530583, lon=-6.4998659, addr="Coollattin, Shillelagh", website=null, phone=null
- OSM (high, 4m, sim=1): name="Coollattin Golf Course", website="https://coollattingolfclub.com/", addr="Shillelagh, Y14 KH39, Co. Wicklow"
- GI  (high, 71m, sim=1): name="Coollattin Golf Club", addr="Coollattin, Shillelagh, Co Wicklow", phone="0539429125"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 4m, sim=1)
```sql
UPDATE courses SET
  website = 'https://coollattingolfclub.com/'
WHERE id IN (
  '6a97f1d9-04fc-4fab-93c0-47006fafc1fe'
);
```

### Cregmore Park Golf Club (Ireland, 1 courses)

- DB: lat=53.3272044, lon=-8.8678013, addr="Cashla, Claregalway, Claregalway", website=null, phone=null
- OSM (high, 217m, sim=1): name="Cregmore Park Golf Club", website="https://www.cregmorepark.com/", addr=null
- GI  (high, 115m, sim=1): name="Cregmore Park Golf Club", addr="Cregmore, Claregalway, Co. Galway, H91EE38", phone="091799799"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 217m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.cregmorepark.com/'
WHERE id IN (
  '93c0b50f-f001-47fd-ae98-604a02ca0092'
);
```

### Galway Bay Golf Resort (Ireland, 1 courses)

- DB: lat=53.2506387, lon=-8.9772682, addr="Renville West, Oranmore, Galway", website=null, phone=null
- OSM (high, 67m, sim=1): name="Galway Bay Golf Resort", website="https://galwaybaygolfresort.ie/", addr=null
- GI  (high, 162m, sim=1): name="Galway Bay Golf Club", addr="Oranmore, Co. Galway", phone="091790711"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 67m, sim=1)
```sql
UPDATE courses SET
  website = 'https://galwaybaygolfresort.ie/'
WHERE id IN (
  '67272949-7f23-45ca-9ba0-d6c1597f87b5'
);
```

### Kanturk Golf Club (Ireland, 1 courses)

- DB: lat=52.1565119, lon=-8.9238231, addr="Fairy Hill, Kanturk", website=null, phone=null
- OSM (high, 11m, sim=1): name="Kanturk Golf Club", website="https://www.kanturkgolf.com", addr=null
- GI  (medium, 419m, sim=1): name="Kanturk Golf Club", addr="Fairyhill, Kanturk, Co. Cork", phone="0858700935"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 11m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.kanturkgolf.com'
WHERE id IN (
  'd8719ce9-532e-4fd8-8831-ff7c70969695'
);
```

### Lee Valley Golf and Country Club (Ireland, 1 courses)

- DB: lat=51.8842113, lon=-8.7027468, addr="Clashnure, Clashanure, Ovens", website=null, phone=null
- OSM (high, 231m, sim=0.714): name="Lee Valley Golf & Country Club", website="https://www.leevalleygcc.ie", addr=null
- GI  (low, 709m, sim=0.714): name="Lee Valley Golf Club", addr="Ovens, Co.Cork", phone="0217331721"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 231m, sim=0.714)
```sql
UPDATE courses SET
  website = 'https://www.leevalleygcc.ie'
WHERE id IN (
  'bf850889-e825-413e-a258-e1719347e570'
);
```

### Limerick Golf Club (Ireland, 1 courses)

- DB: lat=52.6163384, lon=-8.6302557, addr="Rosbrien, Ballyclough", website=null, phone=null
- OSM (high, 18m, sim=1): name="Limerick Golf Club", website="https://www.limerickgolfclub.ie/", addr=null
- GI  (medium, 338m, sim=1): name="Limerick Golf Club", addr="Ballyclough, Limerick, Co. Limerick", phone="061415146"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 18m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.limerickgolfclub.ie/'
WHERE id IN (
  '78b8b4cc-5d20-4874-9e2e-c84bf498ce3e'
);
```

### Ballyneety Golf Club (Ireland, 1 courses)

- DB: lat=52.5902589, lon=-8.5515951, addr="Ballyneety, Glen", website=null, phone=null
- OSM (high, 1m, sim=1): name="Ballyneety Golf Club", website="https://ballyneetygolfclub.ie", addr=null
- GI  (high, 17m, sim=1): name="Ballyneety Golf Club", addr="Ballyneety, Limerick, Co. Limerick", phone="061351881"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 1m, sim=1)
```sql
UPDATE courses SET
  website = 'https://ballyneetygolfclub.ie'
WHERE id IN (
  '2e78ee1c-6479-4e55-81e8-f8866fa27704'
);
```

### Loughrea Golf Club (Ireland, 1 courses)

- DB: lat=53.2170992, lon=-8.5582973, addr="Ballgasty, Loughrea", website=null, phone=null
- OSM (high, 134m, sim=1): name="Loughrea Golf Club", website="https://www.loughreagolfclub.com/", addr=null
- GI  (high, 208m, sim=1): name="Loughrea Golf Club", addr="Graigue, Loughrea, Co. Galway", phone="091841049"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 134m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.loughreagolfclub.com/'
WHERE id IN (
  'a64aed49-b436-4016-a8e1-3a1857cefe02'
);
```

### Athlone Golf Club (Ireland, 1 courses)

- DB: lat=53.467185, lon=-7.9871901, addr="-, Hodson Bay", website=null, phone=null
- OSM (medium, 383m, sim=0.2): name="Hodson Bay Golf Course", website="https://www.athlonegolfclub.ie/", addr=null
- GI  (high, 197m, sim=1): name="Athlone Golf Club", addr="Hodson Bay, Athlone, Co. Roscommon, N37 AX07", phone="Office 090 6492073"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - address: from gi(high, 197m, sim=1)
```sql
UPDATE courses SET
  address = 'Hodson Bay, Athlone, Co. Roscommon, N37 AX07'
WHERE id IN (
  '1a558c13-5163-427b-a74f-0555483d59a9'
);
```

### Mountbellew Golf Club (Ireland, 1 courses)

- DB: lat=53.462552, lon=-8.5271241, addr="The Demesne, Shankill, Mountbellew", website=null, phone=null
- OSM (high, 10m, sim=1): name="Mountbellew Golf Club", website="https://www.mountbellewgolfclub.com/", addr="Mountbellew"
- GI  (medium, 1416m, sim=1): name="Mountbellew Golf Club", addr="Shankill, Mountbellew, Ballinasloe, Co. Galway", phone="0909679259"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 10m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.mountbellewgolfclub.com/'
WHERE id IN (
  'a5b779c8-2d98-4148-8229-74edc801b672'
);
```

### Naas Golf Club (Ireland, 1 courses)

- DB: lat=53.2490006, lon=-6.6423374, addr="Kerdiffstown, Naas", website=null, phone=null
- OSM (high, 168m, sim=1): name="Naas Golf Club", website="https://www.naasgolfclub.com/", addr=null
- GI  (high, 186m, sim=1): name="Naas Golf Club", addr="Kerdiffstown, Naas, Co. Kildare", phone="045897509"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 168m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.naasgolfclub.com/'
WHERE id IN (
  'a56456b7-8590-4e30-90fe-b9d620ddcc1a'
);
```

### New Ross Golf Club (Ireland, 1 courses)

- DB: lat=52.4068161, lon=-6.9706388, addr="Tinneranny, New Ross", website=null, phone=null
- OSM (high, 16m, sim=1): name="New Ross Golf Club", website="https://www.newrossgolfclub.ie/", addr="New Ross"
- GI  (medium, 426m, sim=1): name="New Ross Golf Club", addr="Tinneranny, New Ross, Co. Wexford", phone="051421433"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 16m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.newrossgolfclub.ie/'
WHERE id IN (
  '6c338e21-5751-49b3-925c-c3c40150edb6'
);
```

### Newbridge Golf Club (Ireland, 1 courses)

- DB: lat=53.2028882, lon=-6.7847087, addr="Barrettstown Road, Newbridge", website=null, phone=null
- OSM (high, 184m, sim=1): name="Newbridge Golf Club", website="https://www.newbridgegolfclub.com/", addr=null
- GI  (high, 145m, sim=1): name="Newbridge Golf Club", addr="Barrettstown, Newbridge, Co. Kildare", phone="045486110"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 184m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.newbridgegolfclub.com/'
WHERE id IN (
  '480af1cf-bb58-4f3c-92ca-fdda8d1c8c65'
);
```

### Old Head Golf Links (Ireland, 1 courses)

- DB: lat=51.6104216, lon=-8.5368749, addr="Downmacpatrick, Old Head", website=null, phone=null
- OSM (high, 8m, sim=1): name="Old Head Golf Links", website="https://www.oldhead.com", addr="P17 CX88"
- GI  (no-match, 241493m, sim=0.444): name="Old Conna Golf Club", addr="Ferndale Road, Bray, Co. Wicklow, A98 H977", phone="+353 (0)1 282 6055"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 8m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.oldhead.com'
WHERE id IN (
  'eb3950b6-b6cf-4498-8640-7714b93d213a'
);
```

### Jamestown Par 3 Golf Course (Ireland, 1 courses)

- DB: lat=53.2461423, lon=-6.2068579, addr="Jamestown Farm, Kilternan", website=null, phone=null
- OSM (high, 238m, sim=1): name="Jamestown Par 3 Golf Course", website="http://www.jamestownpar3.ie", addr="Enniskerry Road, Jamestown, Stepaside"
- GI  (no-match, 21127m, sim=0.474): name="Jameson Golf Links Portmarnock Resort Golf Club", addr="Portmarnock Hotel & Golf Links, Strand Road, Portmarnock, Co. Dublin", phone="018666592"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 238m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.jamestownpar3.ie'
WHERE id IN (
  'af6983ef-f17c-4ef1-bb1a-bc8b7fcdd3fa'
);
```

### Warrenpoint Golf Club (Northern Ireland, 1 courses)

- DB: lat=54.1087176, lon=-6.2693919, addr="Lower Dromore Road, Warrenpoint", website=null, phone=null
- OSM (high, 147m, sim=1): name="Warrenpoint Golf Club", website="https://www.warrenpointgolf.com/", addr="Lower Dromore Road, BT34 3LN, Warrenpoint"
- GI  (medium, 345m, sim=1): name="Warrenpoint Golf Club", addr="Lower Dromore Road, Warrenpoint, BT34 3LN", phone="02841753695"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 147m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.warrenpointgolf.com/'
WHERE id IN (
  '16219a6f-a06a-4f1e-8fc8-d4b84517a06f'
);
```

### Mayobridge Golf Club (Northern Ireland, 1 courses)

- DB: lat=54.1930944, lon=-6.2452996, addr="50 Crossan Road, Newry", website=null, phone=null
- OSM (high, 52m, sim=1): name="Mayobridge Golf Club", website="https://www.mayobridgegolf.com/", addr="Crossan Road"
- GI  (high, 232m, sim=1): name="Mayobridge Golf Club", addr="52 Crossan Road, Mayobridge, Newry, Co Down", phone="02830850295"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 52m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.mayobridgegolf.com/'
WHERE id IN (
  'e6ede204-416b-4813-a7e8-d4a8fcba89b4'
);
```

### Mahee Island Golf Club (Northern Ireland, 1 courses)

- DB: lat=54.4988129, lon=-5.6417572, addr="150 Crawfordsburn Road, Bangor", website=null, phone=null
- OSM (high, 0m, sim=1): name="Mahee Island Golf Club", website="http://www.maheegolf.com/", addr=null
- GI  (no-match, 27262m, sim=0.667): name="Greenisland Golf Club", addr="156 Upper Road, Greenisland, Carrickfergus, BT38 8RW", phone="02890862236"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 0m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.maheegolf.com/'
WHERE id IN (
  '8a6062b6-88c0-45ea-baa0-d42c80e98857'
);
```

### Killymoon Golf Club (Northern Ireland, 1 courses)

- DB: lat=54.6342535, lon=-6.7238774, addr="200 Killymoon Road, Cookstown", website=null, phone=null
- OSM (high, 50m, sim=1): name="Killymoon Golf Club", website="https://www.killymoongolfclub.com/", addr=null
- GI  (high, 184m, sim=1): name="Killymoon Golf Club", addr="200 Killymoon Road, Cookstown, BT80 8TW", phone="02886763762"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 50m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.killymoongolfclub.com/'
WHERE id IN (
  'e3f59225-fe8d-458a-8b71-e1a2f1b260e4'
);
```

### Kilrea Golf Club (Northern Ireland, 1 courses)

- DB: lat=54.942488, lon=-6.5532498, addr="47A Lisnagrot Road, Coleraine", website=null, phone=null
- OSM (high, 136m, sim=1): name="Kilrea Golf Course", website="https://kilreagolfclub.com/", addr=null
- GI  (medium, 260m, sim=1): name="Kilrea Golf Club", addr="47a Lisnagrot Road, Kilrea, BT51 5SE", phone="29540044"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 136m, sim=1)
```sql
UPDATE courses SET
  website = 'https://kilreagolfclub.com/'
WHERE id IN (
  '3f07852f-1080-4826-a415-93e026a73708'
);
```

### Carrickfergus Golf Club (Northern Ireland, 1 courses)

- DB: lat=54.7235649, lon=-5.8050747, addr="35 North Road, Carrickfergus", website=null, phone=null
- OSM (high, 42m, sim=1): name="Carrickfergus Golf Course", website="https://carrickfergusgolfclub.co.uk/", addr=null
- GI  (high, 241m, sim=1): name="Carrickfergus Golf Club", addr="35 North Road, Carrickfergus, Co Antrim, BT38 8LP", phone="02893363713"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 42m, sim=1)
```sql
UPDATE courses SET
  website = 'https://carrickfergusgolfclub.co.uk/'
WHERE id IN (
  'd7b1d906-cf61-4c57-9195-c46b1b9b6ac9'
);
```

### Cloverhill Golf Club (Northern Ireland, 1 courses)

- DB: lat=54.1035013, lon=-6.4863162, addr="Lough Road, Newry", website=null, phone=null
- OSM (high, 84m, sim=1): name="Cloverhill Golf Club", website="https://www.cloverhillgolfclub.co.uk/", addr=null
- GI  (medium, 480m, sim=1): name="Cloverhill Golf Club", addr="Lough Road, Mullaghbawn, Co. Armagh, BT35 9XP", phone="02830889580"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 84m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.cloverhillgolfclub.co.uk/'
WHERE id IN (
  '6bf04386-38a0-4e82-ab60-7f6df4cfdbe9'
);
```

### Foyle Golf Club (Northern Ireland, 2 courses)

- DB: lat=55.0395615, lon=-7.2923893, addr="12 Alder Rd, Londonderry", website=null, phone=null
- OSM (high, 99m, sim=1): name="Foyle Golf Club", website="https://www.foylegolfcentre.co.uk/", addr="Alder Road, Derry / Londonderry"
- GI  (medium, 310m, sim=1): name="Foyle Golf Club", addr="12 Alder Road, Londonderry, BT48 8DW", phone="02871352222"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 99m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.foylegolfcentre.co.uk/'
WHERE id IN (
  '3fa130df-cf4f-4e0a-905b-62d7c40bb2a7',
  '6f9b7ff7-9221-4af9-b59c-5e3e1034f335'
);
```

### Larne Golf Club (Northern Ireland, 1 courses)

- DB: lat=54.8551475, lon=-5.7790269, addr="54 Ferris Bay Rd, Islandmagee", website=null, phone=null
- OSM (high, 42m, sim=1): name="Larne Golf Club", website="https://www.larnegolfclub.co.uk/", addr=null
- GI  (medium, 265m, sim=1): name="Larne Golf Club", addr="54 Ferris Bay Road, Islandmagee, Co. Antrim BT40 3RT", phone="02893382228"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 42m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.larnegolfclub.co.uk/'
WHERE id IN (
  'd7f447c5-77be-4567-9e3a-065e4fd97383'
);
```

### Newtownstewart Golf Club (Northern Ireland, 2 courses)

- DB: lat=54.7039796, lon=-7.4215107, addr="38 Golf Course Road, Grahamstown", website=null, phone=null
- OSM (high, 18m, sim=1): name="Newtownstewart Golf Club", website="https://www.newtownstewartgolfclub.com/", addr=null
- GI  (high, 66m, sim=1): name="Newtownstewart Golf Club", addr="38 Golf Course Road, Newtownstewart, Omagh, Co Tyrone", phone="02881661466"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 18m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.newtownstewartgolfclub.com/'
WHERE id IN (
  'd71315f8-5363-42b1-9718-41437f939033',
  'b30bee3a-a6f0-4fed-91da-0485b661a979'
);
```

## Medium confidence (review before applying)

### Waterford Castle Golf Resort (Ireland, 1 courses)

- DB: lat=52.2516673, lon=-7.0583886, addr="The Island, Ballinakill", website=null, phone=null
- OSM (medium, 396m, sim=1): name="Waterford Castle Golf Club", website="https://www.waterfordcastleresort.com/golf", addr="Waterford"
- GI  (medium, 472m, sim=1): name="Waterford Castle Golf Club", addr="Hotel & Golf Resort, The Island, Ballinakill, Co. Waterford, Ireland", phone="051871633"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 396m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.waterfordcastleresort.com/golf'
WHERE id IN (
  '9eab475b-50f4-4d11-8811-0ae8c3bd7f33'
);
```

### Tuam Golf Club (Ireland, 1 courses)

- DB: lat=53.4945125, lon=-8.8384322, addr="Barnacurragh, Tuam", website=null, phone=null
- OSM (medium, 546m, sim=1): name="Tuam Golf Club", website="https://www.tuamgolfclub.com/", addr=null
- GI  (high, 163m, sim=1): name="Tuam Golf Club", addr="Barnacurragh, Tuam, Co. Galway", phone="09328993"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 546m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.tuamgolfclub.com/'
WHERE id IN (
  'c8966f5b-c603-40c9-9dc8-efdff56bc0ca'
);
```

### Tralee Golf Club (Ireland, 1 courses)

- DB: lat=52.327242, lon=-9.7809541, addr="-, Ardfert", website=null, phone=null
- OSM (medium, 5897m, sim=1): name="Tralee Golf Club", website=null, addr=null
- GI  (medium, 5962m, sim=1): name="Tralee Golf Club", addr="Ardfert, Co. Kerry", phone="0667136379"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - address: from gi(medium, 5962m, sim=1)
```sql
UPDATE courses SET
  address = 'Ardfert, Co. Kerry'
WHERE id IN (
  '603ae19e-f56f-4633-884e-4e70a7836fa9'
);
```

### The Royal Dublin Golf Club (Ireland, 1 courses)

- DB: lat=53.3657326, lon=-6.1796171, addr="Dollymount Avenue, Dublin", website=null, phone=null
- OSM (medium, 1202m, sim=1): name="Royal Dublin Golf Club", website="https://www.theroyaldublingolfclub.com/", addr=null
- GI  (medium, 1136m, sim=1): name="Royal Dublin Golf Club", addr="The Royal Dublin Golf Club, North Bull Island, Dollymount, Dublin 3", phone="0035318336346"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 1202m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.theroyaldublingolfclub.com/'
WHERE id IN (
  '5c434ba2-6e7f-4a13-a8d8-530461789ac9'
);
```

### Woodbrook Golf Club (Ireland, 1 courses)

- DB: lat=53.2098586, lon=-6.1160496, addr="Dublin Road, Bray", website=null, phone=null
- OSM (medium, 1245m, sim=1): name="Woodbrook Golf Club", website="https://www.woodbrook.ie/", addr=null
- GI  (medium, 837m, sim=1): name="Woodbrook Golf Club", addr="Dublin Road, Bray, Co. Wicklow", phone="012824799"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 1245m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.woodbrook.ie/'
WHERE id IN (
  '2003c8c0-642d-4d71-871e-12a8d8f8ffab'
);
```

### The Heritage Golf Resort (Ireland, 1 courses)

- DB: lat=53.1328299, lon=-7.1473275, addr="-, Killenard", website=null, phone=null
- OSM (medium, 832m, sim=1): name="The Heritage Golf Club", website=null, addr=null
- GI  (medium, 293m, sim=1): name="The Heritage Golf Club", addr="Killenard, Co. Laois", phone="0578642321"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - address: from gi(medium, 293m, sim=1)
```sql
UPDATE courses SET
  address = 'Killenard, Co. Laois'
WHERE id IN (
  '9e8ab1ea-4205-454e-8951-19b4f8823c9b'
);
```

### St Helens Bay Golf Resort (Ireland, 1 courses)

- DB: lat=52.2337314, lon=-6.3555653, addr="Kilrane, Rosslare Harbour", website=null, phone=null
- OSM (medium, 1461m, sim=0.929): name="St Helen's Bay Golf Club", website="https://club.sthelensbay.ie/", addr="Saint Helens Village, Kilrane"
- GI  (medium, 2102m, sim=0.929): name="St. Helen's Bay Golf Club", addr="Kilrane, Rosslare Harbour, Co. Wexford", phone="0539133234"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 1461m, sim=0.929)
```sql
UPDATE courses SET
  website = 'https://club.sthelensbay.ie/'
WHERE id IN (
  '7be37668-a266-4b77-8c8c-71d0b1d88618'
);
```

### Slade Valley Golf Club (Ireland, 1 courses)

- DB: lat=53.2360108, lon=-6.4541965, addr="Brittas", website=null, phone=null
- OSM (medium, 2537m, sim=1): name="Slade Valley Golf Club", website="https://www.sladevalleygolfclub.ie/", addr=null
- GI  (medium, 2563m, sim=1): name="Slade Valley Golf Club", addr="Lynch Park, Brittas, Co.Dublin", phone="014582183"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 2537m, sim=1)
  - address: from gi(medium, 2563m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.sladevalleygolfclub.ie/',
  address = 'Lynch Park, Brittas, Co.Dublin'
WHERE id IN (
  'e95b5ddc-c2ec-4be7-9a12-94c62b09f340'
);
```

### Skibbereen and West Carbery Golf Club (Ireland, 1 courses)

- DB: lat=51.5437901, lon=-9.2668771, addr="Baltimore Road, Skibbereen", website=null, phone=null
- OSM (medium, 2173m, sim=0.852): name="Skibbereen & West Carbery Golf Club", website="https://www.skibbgolf.com", addr=null
- GI  (no-match, 2004m, sim=0.37): name="Skibbereen Golf Club", addr="Licknavar, Skibbereen, Co. Cork", phone="02821227"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 2173m, sim=0.852)
```sql
UPDATE courses SET
  website = 'https://www.skibbgolf.com'
WHERE id IN (
  '0f823a9d-f5a4-405f-9b4d-e969a4321706'
);
```

### Skerries Golf Club (Ireland, 1 courses)

- DB: lat=53.5652299, lon=-6.103036, addr="Hackettstown Skerries Co. Dublin, Skerries", website=null, phone=null
- OSM (medium, 1181m, sim=1): name="Skerries Golf Club", website="https://www.skerriesgolfclub.ie/", addr=null
- GI  (medium, 1050m, sim=1): name="Skerries Golf Club", addr="Hacketstown, Skerries, Co. Dublin", phone="018491567"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 1181m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.skerriesgolfclub.ie/'
WHERE id IN (
  '776e2de1-2ab4-4864-9c17-43507a47f14c'
);
```

### Silloge Park Golf Club (Ireland, 1 courses)

- DB: lat=53.4130129, lon=-6.2736466, addr="Ballymun Road, Swords", website=null, phone=null
- OSM (medium, 0m, sim=0.632): name="Silloge Park Public Golf Course", website="https://www.sillogeparkgolfclub.com/", addr=null
- GI  (medium, 476m, sim=1): name="Silloge Park Golf Club", addr="Silloge Park, Ballymun Road, Swords, Co. Dublin", phone="018429956"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 0m, sim=0.632)
```sql
UPDATE courses SET
  website = 'https://www.sillogeparkgolfclub.com/'
WHERE id IN (
  '71e359d6-3558-4516-9277-feffe11dbf69'
);
```

### Rush Golf Club (Ireland, 1 courses)

- DB: lat=53.5167945, lon=-6.1023321, addr="Golf Road, Rush", website=null, phone=null
- OSM (medium, 489m, sim=1): name="Rush Golf Club", website="https://www.rushgolfclub.com/", addr="Rush"
- GI  (medium, 367m, sim=1): name="Rush Golf Club", addr="Sandyhills, Rush, Co Dublin", phone="018438177"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 489m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.rushgolfclub.com/'
WHERE id IN (
  'b5951a1a-fe17-4c68-9599-dcf3f6463835'
);
```

### Royal Curragh Golf Club (Ireland, 1 courses)

- DB: lat=53.8487614, lon=-9.2964519, addr="-, The Curragh", website=null, phone=null
- OSM (medium, 182198m, sim=1): name="The Royal Curragh Golf Course", website="http://www.curraghgolf.com/", addr=null
- GI  (medium, 181925m, sim=1): name="Royal Curragh Golf Club", addr="The Curragh, Co. Kildare", phone="045441714"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 182198m, sim=1)
  - address: from gi(medium, 181925m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.curraghgolf.com/',
  address = 'The Curragh, Co. Kildare'
WHERE id IN (
  'e4240331-9d87-47b3-a6b7-4ccfb1233bef'
);
```

### Rathcore Golf and Country Club (Ireland, 1 courses)

- DB: lat=53.4483008, lon=-6.8334957, addr="Rathcore, Enfield", website=null, phone=null
- OSM (medium, 57m, sim=0.667): name="Rathcore Golf Club", website="https://www.rathcoregolfclub.ie/", addr="Co. Meath."
- GI  (medium, 490m, sim=0.667): name="Rathcore Golf Club", addr="Rathcore, Enfield, Co Meath", phone="0469541883"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 57m, sim=0.667)
```sql
UPDATE courses SET
  website = 'https://www.rathcoregolfclub.ie/'
WHERE id IN (
  '35d8e4b9-ee89-4bbb-a3b7-5e2c1dec8f0a'
);
```

### Raffeen Creek Golf Club (Ireland, 1 courses)

- DB: lat=51.8302347, lon=-8.3207701, addr="Ringaskiddy , Cork", website=null, phone=null
- OSM (medium, 2248m, sim=1): name="Raffeen Creek Golf Club", website="https://raffeencreek.ie/", addr=null
- GI  (medium, 1794m, sim=1): name="Raffeen Creek Golf Club", addr="Ringaskiddy, Co. Cork", phone="0214378430"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 2248m, sim=1)
```sql
UPDATE courses SET
  website = 'https://raffeencreek.ie/'
WHERE id IN (
  '03fd5f0d-b05d-4af9-b423-a9e034a33d6d'
);
```

### Portmarnock Hotel and Golf Links (Ireland, 1 courses)

- DB: lat=53.4252606, lon=-6.1319275, addr="Strand Road, Portmarnock", website=null, phone=null
- OSM (medium, 400m, sim=0.733): name="Portmarnock Links", website="https://www.portmarnock.com/", addr="Strand Road, Portmarnock"
- GI  (low, 639m, sim=0.368): name="Jameson Golf Links Portmarnock Resort Golf Club", addr="Portmarnock Hotel & Golf Links, Strand Road, Portmarnock, Co. Dublin", phone="018666592"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 400m, sim=0.733)
```sql
UPDATE courses SET
  website = 'https://www.portmarnock.com/'
WHERE id IN (
  'be086011-c5f9-48b9-8302-6c2c53f204ff'
);
```

### Athenry Golf Club (Ireland, 1 courses)

- DB: lat=53.2906062, lon=-8.8389781, addr="Palmerstown, Oranmore", website=null, phone=null
- OSM (medium, 725m, sim=1): name="Athenry Golf Club", website="https://www.athenrygolfclub.net/", addr=null
- GI  (medium, 1023m, sim=1): name="Athenry Golf Club", addr="Palmerstown, Oranmore, Co. Galway", phone="091794466"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 725m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.athenrygolfclub.net/'
WHERE id IN (
  'f121ceb8-9f55-497c-9175-9899c30ba575'
);
```

### Athy Golf Club (Ireland, 1 courses)

- DB: lat=52.995756, lon=-6.9698001, addr="Geraldine, Athy", website=null, phone=null
- OSM (medium, 1512m, sim=1): name="Athy Golf Club", website="https://www.athygolfclub.com/", addr=null
- GI  (medium, 1420m, sim=1): name="Athy Golf Club", addr="Geraldine, Athy, Co.Kildare", phone="0598631729"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 1512m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.athygolfclub.com/'
WHERE id IN (
  '44a760cf-7da2-4901-a153-eaef7e8b0962'
);
```

### Balcarrick  Golf Club (Ireland, 1 courses)

- DB: lat=53.4711264, lon=-6.1287736, addr="Balcarrick Golf Club, Corballis", website=null, phone=null
- OSM (medium, 500m, sim=1): name="Balcarrick Golf Club", website="https://www.balcarrickgolfclub.com/", addr="Corballis, Donabate"
- GI  (medium, 364m, sim=1): name="Balcarrick Golf Club", addr="Corballis, Donabate, Co. Dublin", phone="018436957"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 500m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.balcarrickgolfclub.com/'
WHERE id IN (
  '3099fee1-4b42-4087-819f-1498c08cd700'
);
```

### Ballina Golf club (Ireland, 1 courses)

- DB: lat=54.1070228, lon=-9.1346149, addr="Mossgrove, Ballina", website=null, phone=null
- OSM (medium, 455m, sim=1): name="Ballina Golf Course", website="https://www.ballina-golf.com/", addr=null
- GI  (high, 153m, sim=1): name="Ballina Golf Club", addr="Mossgrove, Ballina, Co. Mayo", phone="09621050"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 455m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.ballina-golf.com/'
WHERE id IN (
  '27e072e2-2ed0-4876-9cce-5bce9181a193'
);
```

### Beaufort Golf Club (Ireland, 1 courses)

- DB: lat=52.0595746, lon=-9.505322, addr="-, Killarney", website=null, phone=null
- OSM (low, 730m, sim=0.15): name="Deer Park Pitch & Putt Club", website=null, addr=null
- GI  (medium, 11438m, sim=1): name="Beaufort Golf Club", addr="Beaufort, Killarney, Co. Kerry", phone="0646644440"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - address: from gi(medium, 11438m, sim=1)
```sql
UPDATE courses SET
  address = 'Beaufort, Killarney, Co. Kerry'
WHERE id IN (
  '1dcafaee-364b-42a8-b153-4697209cf5d0'
);
```

### Beech Park Golf Club (Ireland, 1 courses)

- DB: lat=53.2757504, lon=-6.4831859, addr="Johnstown Road, Rathcoole", website=null, phone=null
- OSM (medium, 2169m, sim=1): name="Beech Park Golf Club", website="https://www.beechpark.ie/", addr=null
- GI  (medium, 1994m, sim=1): name="Beech Park Golf Club", addr="Johnstown, Rathcoole, Co. Dublin", phone="014580522"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 2169m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.beechpark.ie/'
WHERE id IN (
  'c76b3ef1-5932-48eb-84b2-f2802adcce83'
);
```

### Callan Golf Club (Ireland, 1 courses)

- DB: lat=52.6506255, lon=-7.2514438, addr="-, Kilkenny", website=null, phone=null
- OSM (no-match, 1120m, sim=0.118): name="Lacken Pitch&Putt Club", website=null, addr=null
- GI  (medium, 15594m, sim=1): name="Callan Golf Club", addr="Geraldine, Callan, Co. Kilkenny, Callan", phone="0567725136"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - address: from gi(medium, 15594m, sim=1)
```sql
UPDATE courses SET
  address = 'Geraldine, Callan, Co. Kilkenny, Callan'
WHERE id IN (
  'e5861527-06f8-4c35-95c3-1986ad263f63'
);
```

### Celbridge Elm Hall (Ireland, 1 courses)

- DB: lat=53.3342808, lon=-6.5311414, addr="Hazelhatch Road, Celbridge", website=null, phone=null
- OSM (medium, 1311m, sim=1): name="Celbridge Elm Hall Golf Course", website="https://www.celbridgeelmhallgolfclub.ie/", addr="Loughlinstown Road, Celbridge"
- GI  (medium, 1438m, sim=0.944): name="Celbridge Elmhall Golf Club", addr="Hazelhatch, Celbridge, Co. Kildare", phone="016288208"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 1311m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.celbridgeelmhallgolfclub.ie/'
WHERE id IN (
  '0f2e3bd5-3399-4717-830f-2b4368e3f447'
);
```

### Corballis Links Golf Club (Ireland, 1 courses)

- DB: lat=53.4926215, lon=-6.1944889, addr="Dublin, Donabate", website=null, phone=null
- OSM (medium, 5177m, sim=1): name="Corballis Golf Course", website="https://www.corballislinks.com/", addr="Donabate"
- GI  (medium, 5110m, sim=1): name="Corballis Links Golf Club", addr="Corballis Road, Donabate, Co. Dublin", phone="018436583"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 5177m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.corballislinks.com/'
WHERE id IN (
  '0eb4dc7b-d176-4e91-8dc0-8c7228e495b7'
);
```

### Elmgreen Golf Club (Ireland, 1 courses)

- DB: lat=53.3850467, lon=-6.3201429, addr="Dunsink Lane, Dublin", website=null, phone=null
- OSM (medium, 1921m, sim=1): name="Elmgreen Golf Club", website="https://elmgreengolfclub.ie/", addr="Castleknock, 15, Dublin"
- GI  (medium, 2008m, sim=1): name="Elmgreen Golf Club", addr="Castleknock, Dublin 15", phone="018200797"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 1921m, sim=1)
```sql
UPDATE courses SET
  website = 'https://elmgreengolfclub.ie/'
WHERE id IN (
  '88dd2aef-77c3-441d-a944-df6ab153407e'
);
```

### Enniscorthy Golf Club (Ireland, 1 courses)

- DB: lat=52.4834206, lon=-6.5986852, addr="Knockmarshal, Wexford", website=null, phone=null
- OSM (medium, 768m, sim=1): name="Enniscorthy Golf Course", website="https://www.enniscorthygc.ie/", addr="Wexford Eircode, Y21 PV07, Enniscorthy"
- GI  (medium, 693m, sim=1): name="Enniscorthy Golf Club", addr="Knockmarshall, Enniscorthy, Co. Wexford", phone="0539233191"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 768m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.enniscorthygc.ie/'
WHERE id IN (
  '5a23b947-2850-4d0c-9e64-36bea3d9bf79'
);
```

### Forrest Little Golf Club (Ireland, 1 courses)

- DB: lat=53.4544404, lon=-6.2244297, addr="Forest Road, Swords", website=null, phone=null
- OSM (medium, 1988m, sim=1): name="Forrest Little Golf Club", website="https://forrestlittle.ie/", addr="Forrest Road, K67 K825, Swords"
- GI  (medium, 2337m, sim=1): name="Forrest Little Golf Club", addr="Cloghran, Swords, Co. Dublin", phone="018401763"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 1988m, sim=1)
```sql
UPDATE courses SET
  website = 'https://forrestlittle.ie/'
WHERE id IN (
  '7eb92e3e-6ec0-4027-85d0-6cfb0e0b8b84'
);
```

### Foxrock Golf Club (Ireland, 1 courses)

- DB: lat=53.2708036, lon=-6.1757198, addr="Golf Lane, Dublin 18", website=null, phone=null
- OSM (medium, 475m, sim=1): name="Foxrock Golf Course", website="https://www.foxrockgolfclub.com/", addr="Torquay Road"
- GI  (medium, 543m, sim=1): name="Foxrock Golf Club", addr="Torquay Rd, Foxrock, Dublin 18", phone="012893992"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 475m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.foxrockgolfclub.com/'
WHERE id IN (
  '9711dbe8-3d31-4397-be83-bbef40bf4ab2'
);
```

### Greencastle Golf Club (Ireland, 1 courses)

- DB: lat=55.2036701, lon=-6.981019, addr="-, Greencastle", website=null, phone=null
- OSM (medium, 1539m, sim=1): name="Greencastle Golf Club", website=null, addr=null
- GI  (medium, 1706m, sim=1): name="Greencastle Golf Club", addr="Greencastle, Co. Donegal", phone="0749381013"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - address: from gi(medium, 1706m, sim=1)
```sql
UPDATE courses SET
  address = 'Greencastle, Co. Donegal'
WHERE id IN (
  'ec486a7b-fc13-4bd8-adae-8abfc54018dc'
);
```

### Howth Golf Club (Ireland, 2 courses)

- DB: lat=53.3842248, lon=-6.1002648, addr="Carrickbrack Road, Dublin 13", website=null, phone=null
- OSM (medium, 1750m, sim=1): name="Howth Golf Club", website="https://www.howthgolfclub.ie/", addr="Carrickbrack Road, D13 F3C1"
- GI  (medium, 1242m, sim=1): name="Howth Golf Club", addr="Carrickbrack Road, Sutton, Dublin 13", phone="018323055"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 1750m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.howthgolfclub.ie/'
WHERE id IN (
  '24f8689b-985e-4002-ac17-27a63b301e35',
  'b2ddb5e5-1783-49b8-a195-436e0fa78de0'
);
```

### Kenmare Golf Club (Ireland, 1 courses)

- DB: lat=51.8793807, lon=-9.5800701, addr="Killowen Road, Kenmare", website=null, phone=null
- OSM (medium, 625m, sim=1): name="Kenmare Golf Club", website="https://www.kenmaregolfclub.com", addr="V93 XW8E"
- GI  (high, 74m, sim=1): name="Kenmare Golf Club", addr="Kenmare, Co. Kerry", phone="0646641291"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 625m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.kenmaregolfclub.com'
WHERE id IN (
  '145d6d64-555a-42b2-9fb0-be75873757ec'
);
```

### Lisheen Springs Golf Club (Ireland, 1 courses)

- DB: lat=53.2308289, lon=-6.4573997, addr="Lisheen Road, Dublin", website=null, phone=null
- OSM (medium, 728m, sim=0.938): name="Lisheens Springs Golf Club", website="https://www.lisheenspringsgolfclub.ie/", addr=null
- GI  (medium, 621m, sim=1): name="Lisheen Springs Golf Club", addr="Brittas Village, Co. Dublin", phone="014582965"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 728m, sim=0.938)
```sql
UPDATE courses SET
  website = 'https://www.lisheenspringsgolfclub.ie/'
WHERE id IN (
  'e41c5f75-1b99-4d25-a864-eefb13b6d103'
);
```

### Milltown Golf Club (Ireland, 1 courses)

- DB: lat=53.2983198, lon=-6.2540043, addr="Churchtown Road Lower, Dublin 14", website=null, phone=null
- OSM (medium, 575m, sim=1): name="Milltown Golf Club", website="https://www.milltowngolfclub.ie/", addr="Lower Churchtown Road, 14, Dublin"
- GI  (medium, 724m, sim=1): name="Milltown Golf Club", addr="Lower Churchtown Road, Dublin 14", phone="014976090"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 575m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.milltowngolfclub.ie/'
WHERE id IN (
  '11b4684b-ed6b-436a-b755-b45a8ab2cf1d'
);
```

### Mount Merrion Pitch and Putt (Ireland, 1 courses)

- DB: lat=53.2926432, lon=-6.1984137, addr="Priory Grove, Dublin", website=null, phone=null
- OSM (medium, 295m, sim=1): name="Mount Merrion Pitch and Putt Club", website="http://34.244.65.73/", addr="Priory Avenue"
- GI  (no-match, 134143m, sim=0.286): name="Carrick-on-Suir Golf Club", addr="Garravoone, Carrick-on-Suir, Co. Waterford", phone="051640047"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 295m, sim=1)
```sql
UPDATE courses SET
  website = 'http://34.244.65.73/'
WHERE id IN (
  '7bed08a0-e970-4b5c-b08b-679e16bb3e43'
);
```

### Achill Island Golf Club (Ireland, 1 courses)

- DB: lat=53.8000645, lon=-9.520218, addr="-, Westport", website=null, phone=null
- OSM (medium, 40415m, sim=1): name="Achill Island Golf Club", website="https://achillgolf.com/", addr=null
- GI  (no-match, 169926m, sim=0.615): name="Castleisland Golf Club", addr="Tulligabeen, Castleisland, Co. Kerry", phone="0667141709"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 40415m, sim=1)
```sql
UPDATE courses SET
  website = 'https://achillgolf.com/'
WHERE id IN (
  'a4d70daf-ccec-4281-9388-4428dbaddcf6'
);
```

### Ballinamore Golf Club (Ireland, 1 courses)

- DB: lat=54.0552864, lon=-7.7894733, addr="12 An Leathard, Ballinamore", website=null, phone=null
- OSM (medium, 2906m, sim=1): name="Ballinamore Golf Club", website="http://ballinamoregolfclub.ie", addr="Golf Links Road, Ballinamore"
- GI  (medium, 2880m, sim=1): name="Ballinamore Golf Club", addr="Creevy, Ballinamore, Co. Leitrim", phone="0868535026"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 2906m, sim=1)
```sql
UPDATE courses SET
  website = 'http://ballinamoregolfclub.ie'
WHERE id IN (
  'e7b5a143-fe0f-4752-870c-d1e4b5cc79e8'
);
```

### Ballinteskin Golf Club (Ireland, 1 courses)

- DB: lat=52.3508947, lon=-6.9409602, addr="Ballinteskin, Ballinteskin", website=null, phone=null
- OSM (medium, 82m, sim=0.667): name="Ballinteskin Par 3 Golf Course", website="https://par3golf.ie/", addr="New Ross"
- GI  (no-match, 137249m, sim=0.583): name="Ballinasloe Golf Club", addr="Rosgloss,, Ballinasloe,, Co. Galway., H53 X940", phone="0909642126"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 82m, sim=0.667)
```sql
UPDATE courses SET
  website = 'https://par3golf.ie/'
WHERE id IN (
  'aea907d5-66e9-4110-b120-e61e9cd07bb7'
);
```

### Bearna Golf Club (Ireland, 1 courses)

- DB: lat=53.2806966, lon=-9.1713398, addr="Corbally, Bearna", website=null, phone=null
- OSM (medium, 265m, sim=1): name="Bearna Golf Club", website="https://www.bearnagolfclub.com/", addr=null
- GI  (medium, 508m, sim=1): name="Bearna Golf Club", addr="Corboley, Bearna, Co. Galway", phone="091592677"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 265m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.bearnagolfclub.com/'
WHERE id IN (
  'a8f57e2f-5fcb-47f2-a09f-9a8b24297899'
);
```

### Rosslare Golf Club (Ireland, 2 courses)

- DB: lat=52.282818, lon=-6.3942334, addr="Strand Road, Rosslare", website=null, phone=null
- OSM (medium, 1168m, sim=1): name="Rosslare Golf Club", website="https://rosslaregolf.com/", addr="Rosslare"
- GI  (high, 155m, sim=1): name="Rosslare Golf Club", addr="Rosslare, Co. Wexford", phone="0539132203"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 1168m, sim=1)
```sql
UPDATE courses SET
  website = 'https://rosslaregolf.com/'
WHERE id IN (
  'e3cdb30f-45d0-409b-b1e6-c54a707dba65',
  'aa7607c4-f65b-46f5-953d-e78a61130ed6'
);
```

### Cahir Park Golf Club (Ireland, 1 courses)

- DB: lat=52.3689169, lon=-7.9637721, addr="Kilcommon, Cahir", website=null, phone=null
- OSM (medium, 2402m, sim=1): name="Cahir Park Golf Club", website="http://www.cahirparkgolfclub.com/", addr=null
- GI  (medium, 2196m, sim=1): name="Cahir Park Golf Club", addr="Kilcommon, Cahir, Co Tipperary", phone="0527441474"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 2402m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.cahirparkgolfclub.com/'
WHERE id IN (
  'f3b3c8d7-ab6f-4a89-8cc5-76c37f0dfdd1'
);
```

### Castlewarden Golf  Club (Ireland, 1 courses)

- DB: lat=53.2654397, lon=-6.5427489, addr="exit 6 off the Naas, Castlewarden", website=null, phone=null
- OSM (medium, 254m, sim=0.75): name="Castlewarden Golf and Country Club", website="https://www.castlewardengolfclub.ie", addr=null
- GI  (high, 120m, sim=1): name="Castlewarden Golf Club", addr="Castlewarden, Straffan, Co Kildare", phone="014589254"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 254m, sim=0.75)
```sql
UPDATE courses SET
  website = 'https://www.castlewardengolfclub.ie'
WHERE id IN (
  '5ff629a2-4972-4a7a-bcd5-cb176cccd3eb'
);
```

### Clonmel Golf Club (Ireland, 1 courses)

- DB: lat=52.3478497, lon=-7.6927093, addr="Mountain Road, Clonmel", website=null, phone=null
- OSM (medium, 3137m, sim=1): name="Clonmel Golf Course", website="https://www.clonmelgolfclub.com/", addr=null
- GI  (medium, 3296m, sim=1): name="Clonmel Golf Club", addr="Lyreanearla, Clonmel, Co. Tipperary, E91 N2R1", phone="0526124050"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 3137m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.clonmelgolfclub.com/'
WHERE id IN (
  '9aec2282-5a26-4e4d-b106-b18d091bf05a'
);
```

### Concra Wood Golf & Country Club (Ireland, 1 courses)

- DB: lat=54.0412555, lon=-6.1770455, addr="Dundalk Road, Dundalk Road", website=null, phone=null
- OSM (medium, 34927m, sim=1): name="Concra Wood Golf Club", website="https://www.concrawood.ie/", addr=null
- GI  (no-match, 106424m, sim=0.455): name="Roundwood Golf Club", addr="Ballinahinch, Newtownmountkennedy, Co. Wicklow", phone="2818488"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 34927m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.concrawood.ie/'
WHERE id IN (
  'e9400cf3-0537-4eb9-b71c-7fad74254341'
);
```

### Courtown Golf Club (Ireland, 1 courses)

- DB: lat=52.6658952, lon=-6.2165248, addr="Kiltennel, Gorey", website=null, phone=null
- OSM (medium, 1093m, sim=1): name="Courtown Golf Course", website="https://www.courtowngolfclub.com/", addr=null
- GI  (medium, 1262m, sim=1): name="Courtown Golf Club", addr="Kiltennel, Gorey, Co. Wexford", phone="0539425166"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 1093m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.courtowngolfclub.com/'
WHERE id IN (
  'fcb583ab-dbc6-4b9c-b223-a3d7eabbb563'
);
```

### Carlow Golf Club (Ireland, 2 courses)

- DB: lat=52.8456784, lon=-6.9119059, addr="Dublin Road, Carlow", website=null, phone=null
- OSM (medium, 2019m, sim=1): name="Carlow Golf Club", website="https://www.carlowgolfclub.ie/", addr=null
- GI  (medium, 1437m, sim=1): name="Carlow Golf Club", addr="Deerpark, Carlow, Co. Carlow", phone="0599131695"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 2019m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.carlowgolfclub.ie/'
WHERE id IN (
  '8957a12e-af03-4528-b583-14908b3dde8f',
  '7a2a605e-28a2-44c5-98a5-6af00afc68ff'
);
```

### Elm Park Golf and Sports Club (Ireland, 1 courses)

- DB: lat=53.3147493, lon=-6.2208396, addr="Nutley Lane, Dublin", website=null, phone=null
- OSM (medium, 453m, sim=1): name="Elm Park Golf and Sports Club", website="https://www.elmpark.ie/", addr="Nutley Lane"
- GI  (high, 65m, sim=0.789): name="Elm Park Golf & Sports Club Golf Club", addr="Nutley House, Nutley Lane, Donnybrook, Dublin 4", phone="012693438"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 453m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.elmpark.ie/'
WHERE id IN (
  '94e355ee-9499-4257-b94d-868619a71eda'
);
```

### Kinsale Golf Club (Ireland, 1 courses)

- DB: lat=51.7354138, lon=-8.5396437, addr="Farrangalway, Ballyregan", website=null, phone=null
- OSM (medium, 370m, sim=1): name="Kinsale Golf Club", website="https://www.kinsalegolf.ie", addr="P17 FD73"
- GI  (high, 102m, sim=1): name="Kinsale Golf Club", addr="Farrangalway, Kinsale, Co Cork, P17 FD73", phone="0214774722"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 370m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.kinsalegolf.ie'
WHERE id IN (
  'dd0f6081-ed87-47fc-bcd3-2d0696c7fcf8'
);
```

### Glengarriff Golf Club (Ireland, 1 courses)

- DB: lat=51.7458032, lon=-9.5129199, addr="Dromgarriff, Glengarriff", website=null, phone=null
- OSM (medium, 740m, sim=1): name="Glengarriff Golf Club", website="https://www.glengarriffgolfclub.com", addr=null
- GI  (medium, 753m, sim=1): name="Glengarriff Golf Club", addr="Droumgarriff, Glengarriff, Co. Cork", phone="02763150/ 0852862555"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 740m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.glengarriffgolfclub.com'
WHERE id IN (
  '2b2425b4-5dc6-4a20-b72d-373db84adc41'
);
```

### Gowran Park Golf Club (Ireland, 1 courses)

- DB: lat=52.6506255, lon=-7.2514438, addr="-, Kilkenny", website=null, phone=null
- OSM (medium, 12868m, sim=1): name="Gowran Park", website="https://www.gowranpark.ie/", addr=null
- GI  (medium, 12670m, sim=1): name="Gowran Park Golf Club", addr="Gowran, Co. Kilkenny", phone="0567726699"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 12868m, sim=1)
  - address: from gi(medium, 12670m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.gowranpark.ie/',
  address = 'Gowran, Co. Kilkenny'
WHERE id IN (
  'da0030ca-90e3-4f74-b549-cf2da9b76144'
);
```

### Glen Mill Golf Club (Ireland, 1 courses)

- DB: lat=53.2798097, lon=-9.0718319, addr="-, Newcastle", website=null, phone=null
- OSM (medium, 200367m, sim=1): name="Glen Mill Golf Club", website="https://www.glenmillgolfclub.ie/", addr=null
- GI  (no-match, 100227m, sim=0.455): name="Esker Hills Golf Club", addr="Ballykilmurray, Tullamore, Co. Offaly", phone="0579355999"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 200367m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.glenmillgolfclub.ie/'
WHERE id IN (
  '6571e64c-8963-4e1a-affb-6f02cbf5c4b9'
);
```

### Hogs Head Golf Club (Ireland, 1 courses)

- DB: lat=51.8271274, lon=-10.1718452, addr="-, Waterville", website=null, phone=null
- OSM (medium, 1510m, sim=1): name="Hogs Head Golf Course", website="https://www.hogsheadgolfclub.com/", addr=null
- GI  (no-match, 273063m, sim=0.444): name="Highfield Golf Club", addr="Carbury, Co. Kildare", phone="0469731021"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 1510m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.hogsheadgolfclub.com/'
WHERE id IN (
  'd9b26467-31b3-4341-b94a-229ab47c685a'
);
```

### Sutton Golf Club (Ireland, 1 courses)

- DB: lat=53.3917641, lon=-6.1043078, addr="Burrow Road, Sutton", website=null, phone=null
- OSM (medium, 385m, sim=1): name="Sutton Golf Club", website="https://www.suttongolfclub.org/", addr=null
- GI  (medium, 491m, sim=1): name="Sutton Golf Club", addr="Cush Point, Sutton, Dublin 13", phone="018322965"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 385m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.suttongolfclub.org/'
WHERE id IN (
  '27274a38-ba8a-4cca-b80e-5ec30c4d34d7'
);
```

### Ardglass Golf Club (Northern Ireland, 1 courses)

- DB: lat=54.2530557, lon=-5.6082647, addr="Castle Place, Ardglass", website=null, phone=null
- OSM (medium, 255m, sim=1): name="Ardglass Golf Club", website="https://www.ardglassgolfclub.com/", addr="Castle Place, BT30 7TP, Ardglass"
- GI  (medium, 650m, sim=1): name="Ardglass Golf Club", addr="4 Castle Place, Ardglass, Co. Down, BT30 7TP", phone="02844841219"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 255m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.ardglassgolfclub.com/'
WHERE id IN (
  'd4096428-234f-4537-8768-48b79b56ca26'
);
```

### Greenisland Golf Club (Northern Ireland, 1 courses)

- DB: lat=54.7034235, lon=-5.8769065, addr="156 Upper Road, Greenisland", website=null, phone=null
- OSM (medium, 352m, sim=1): name="Greenisland Golf Club", website="https://www.greenislandgolfclub.co.uk/", addr="Upper Road, 156, BT38 8RW, Greenisland"
- GI  (medium, 369m, sim=1): name="Greenisland Golf Club", addr="156 Upper Road, Greenisland, Carrickfergus, BT38 8RW", phone="02890862236"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 352m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.greenislandgolfclub.co.uk/'
WHERE id IN (
  '162daa21-7b8b-4337-88b3-7728c1a44d27'
);
```

### Brown Trout Golf and Country Inn (Northern Ireland, 1 courses)

- DB: lat=55.0372483, lon=-6.6026407, addr="209 Agivey Road, Aghadowey", website=null, phone=null
- OSM (medium, 270m, sim=0.789): name="Brown Trout Inn golf course", website="https://browntroutinn.com/", addr=null
- GI  (no-match, 67994m, sim=0.368): name="Down Royal Golf Club", addr="Dunygarton Road, Maze, Lisburn, Co. Antrim", phone="02892621339"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 270m, sim=0.789)
```sql
UPDATE courses SET
  website = 'https://browntroutinn.com/'
WHERE id IN (
  '2348e2f5-7030-493c-9dec-1cc96ac548f2'
);
```

## Low confidence (manual decision)

## No match found in OSM or GI

- The Golf Course at Luttrellstown Castle Resort (Ireland, 1 courses) — DB lat=53.3729581, lon=-6.3624744
- Spanish Point Golf and Social Club (Ireland, 1 courses) — DB lat=52.8497247, lon=-9.438044
- Sandfield House Pitch and Putt (Ireland, 1 courses) — DB lat=52.938529, lon=-9.3924098
- Blackwater Golf Course & Footgolf (Ireland, 2 courses) — DB lat=52.4467413, lon=-6.3492863
- Buttermountain Golf & Leisure Club (Ireland, 1 courses) — DB lat=53.3493795, lon=-6.2605593
- Castle Dargan Hotel, Sligo (Ireland, 1 courses) — DB lat=54.1914404, lon=-8.4464938
- Oldfield Larks Golf Society (Ireland, 1 courses) — DB lat=53.2507692, lon=-6.2784892
- Dundrum House Hotel Golf & Leisure Resort (Ireland, 1 courses) — DB lat=52.5523338, lon=-8.0619753
- Larkspur Park Sports Complex (Ireland, 1 courses) — DB lat=54.6938561, lon=-8.7179593
- Maine Valley members golf club (Ireland, 1 courses) — DB lat=52.1061973, lon=-9.7867881
- Mount Juliet Estate (Ireland, 1 courses) — DB lat=52.5231654, lon=-7.1488957
- Dargle View Golf Club (Ireland, 1 courses) — DB lat=53.2046474, lon=-6.1165318
- Ballinlough Castle Golf Club (Ireland, 1 courses) — DB lat=53.6651408, lon=-7.0176632
- Ballymascanlon Golf Club (Ireland, 1 courses) — DB lat=54.0712455, lon=-6.2331763
- Fernhill Golf and Country Club (Ireland, 1 courses) — DB lat=51.8193647, lon=-8.376515
- R & R Golf Course (Ireland, 1 courses) — DB lat=53.4163262, lon=-6.4813329
- St Patrick's Pitch & Putt (Ireland, 1 courses) — DB lat=52.4977191, lon=-6.5714786
- Limitless Adventure Centre, Football Golf (Northern Ireland, 1 courses) — DB lat=55.0781139, lon=-6.9999569
- Benone Tourist Complex (Northern Ireland, 1 courses) — DB lat=55.1640737, lon=-6.8722424
- Bowood Hotel, Spa & Golf Resort (Northern Ireland, 1 courses) — DB lat=51.4351698, lon=-2.0615968