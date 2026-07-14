# Ireland match report
Generated: 2026-05-02T18:24:32

## Summary

| Bucket | Clubs | Courses |
|---|---:|---:|
| High conf — auto-apply candidate | 10 | 12 |
| Medium conf — review | 1 | 1 |
| Low conf — manual | 0 | 0 |
| No match in OSM or GI | 19 | 20 |

## Field-fill projection

| Field | Clubs | Courses |
|---|---:|---:|
| website | 9 | 11 |
| address | 5 | 5 |
| phone | 0 | 0 |
| latitude | 0 | 0 |

## High confidence (recommended to apply)

### Beaufort Golf Club (Ireland, 1 courses)

- DB: lat=52.0684555, lon=-9.6730169, addr="-, Killarney", website=null, phone=null
- OSM (high, 71m, sim=1): name="Beaufort Golf Club", website="https://www.beaufortgc.com/", addr="V93 E8HW"
- GI  (high, 71m, sim=1): name="Beaufort Golf Club", addr="Beaufort, Killarney, Co. Kerry", phone="0646644440"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 71m, sim=1)
  - address: from gi(high, 71m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.beaufortgc.com/',
  address = 'Beaufort, Killarney, Co. Kerry'
WHERE id IN (
  '1dcafaee-364b-42a8-b153-4697209cf5d0'
);
```

### Corballis Links Golf Club (Ireland, 1 courses)

- DB: lat=53.4712744, lon=-6.1255277, addr="Dublin, Donabate", website=null, phone=null
- OSM (high, 37m, sim=1): name="Corballis Golf Course", website="https://www.corballislinks.com/", addr="Donabate"
- GI  (high, 37m, sim=1): name="Corballis Links Golf Club", addr="Corballis Road, Donabate, Co. Dublin", phone="018436583"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 37m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.corballislinks.com/'
WHERE id IN (
  '0eb4dc7b-d176-4e91-8dc0-8c7228e495b7'
);
```

### Deer Park Golf (Ireland, 3 courses)

- DB: lat=53.3822784, lon=-6.0797535, addr="Howth Road, Dublin", website=null, phone=null
- OSM (high, 234m, sim=1): name="Deer Park Golf Course", website="https://deerparkgolf.ie/", addr=null
- GI  (high, 234m, sim=1): name="Deer Park Golf Club", addr="Deer Park Hotel, Howth Demesne, Howth, Co. Dublin", phone="018395587"

**Proposed UPDATE** (applied to all 3 course rows for this club, overall=high):
  - website: from osm(high, 234m, sim=1)
```sql
UPDATE courses SET
  website = 'https://deerparkgolf.ie/'
WHERE id IN (
  '27d68ccf-9ce4-4e66-bb02-cdd5d0bc568c',
  'b7fef2d7-d028-41f6-b3ff-1ec7daed9ab9',
  'e3d3c736-9cff-4180-8deb-7540cc4f0c3e'
);
```

### Gowran Park Golf Club (Ireland, 1 courses)

- DB: lat=52.6180444, lon=-7.07002, addr="-, Kilkenny", website=null, phone=null
- OSM (high, 210m, sim=1): name="Gowran Park", website="https://www.gowranpark.ie/", addr=null
- GI  (high, 210m, sim=1): name="Gowran Park Golf Club", addr="Gowran, Co. Kilkenny", phone="0567726699"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 210m, sim=1)
  - address: from gi(high, 210m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.gowranpark.ie/',
  address = 'Gowran, Co. Kilkenny'
WHERE id IN (
  'da0030ca-90e3-4f74-b549-cf2da9b76144'
);
```

### Moate Golf Club (Ireland, 1 courses)

- DB: lat=53.4014301, lon=-7.7275614, addr="Station Road, Aghanargit, Moate", website=null, phone=null
- OSM (high, 245m, sim=1): name="Moate Golf Course", website="http://www.moategolfclub.ie", addr=null
- GI  (high, 245m, sim=1): name="Moate Golf Club", addr="Aghanargit, Moate, Co. Westmeath", phone="0906481271"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 245m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.moategolfclub.ie'
WHERE id IN (
  '53126687-2d4b-4965-b992-6535e1ee52ca'
);
```

### Ring of Kerry Golf Club (Ireland, 1 courses)

- DB: lat=51.8754742, lon=-9.6727505, addr="Ring of Kerry, Kenmare", website=null, phone=null
- OSM (high, 42m, sim=1): name="Ring of Kerry Golf Course", website="https://www.ringofkerrygolf.com", addr="Templenoe, V93 AK85, Kerry"
- GI  (high, 42m, sim=1): name="Ring Of Kerry Golf Club", addr="Templenoe, Killarney, Co. Kerry", phone="0646642000"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 42m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.ringofkerrygolf.com'
WHERE id IN (
  'ec845d5c-7fec-49ba-9ad6-01e72f6c3810'
);
```

### Royal Curragh Golf Club (Ireland, 1 courses)

- DB: lat=53.1466063, lon=-6.8097107, addr="-, The Curragh", website=null, phone=null
- OSM (high, 152m, sim=1): name="The Royal Curragh Golf Course", website="http://www.curraghgolf.com/", addr=null
- GI  (high, 152m, sim=1): name="Royal Curragh Golf Club", addr="The Curragh, Co. Kildare", phone="045441714"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 152m, sim=1)
  - address: from gi(high, 152m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.curraghgolf.com/',
  address = 'The Curragh, Co. Kildare'
WHERE id IN (
  'e4240331-9d87-47b3-a6b7-4ccfb1233bef'
);
```

### The Island Golf Club (Ireland, 1 courses)

- DB: lat=53.4626482, lon=-6.1364578, addr="Corballis, Donabate", website=null, phone=null
- OSM (high, 122m, sim=1): name="The Island Golf Club", website="https://www.theislandgolfclub.com/", addr="K36 V993, Donabate"
- GI  (high, 122m, sim=1): name="The Island Golf Club", addr="Corballis, Donabate", phone="+353 (0) 1 843 6205"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 122m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.theislandgolfclub.com/'
WHERE id IN (
  'd0e08acf-757f-436f-aacc-810744e13234'
);
```

### Tralee Golf Club (Ireland, 1 courses)

- DB: lat=52.3020736, lon=-9.8578491, addr="-, Ardfert", website=null, phone=null
- OSM (high, 103m, sim=1): name="Tralee Golf Club", website=null, addr=null
- GI  (high, 103m, sim=1): name="Tralee Golf Club", addr="Ardfert, Co. Kerry", phone="0667136379"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - address: from gi(high, 103m, sim=1)
```sql
UPDATE courses SET
  address = 'Ardfert, Co. Kerry'
WHERE id IN (
  '603ae19e-f56f-4633-884e-4e70a7836fa9'
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

## Medium confidence (review before applying)

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

## Low confidence (manual decision)

## No match found in OSM or GI

- Ballinlough Castle Golf Club (Ireland, 1 courses) — DB lat=53.6651408, lon=-7.0176632
- Ballymascanlon Golf Club (Ireland, 1 courses) — DB lat=54.0712455, lon=-6.2331763
- Blackwater Golf Course & Footgolf (Ireland, 2 courses) — DB lat=52.4467413, lon=-6.3492863
- Buttermountain Golf & Leisure Club (Ireland, 1 courses) — DB lat=53.3493795, lon=-6.2605593
- Castle Dargan Hotel, Sligo (Ireland, 1 courses) — DB lat=54.1914404, lon=-8.4464938
- Dargle View Golf Club (Ireland, 1 courses) — DB lat=53.2046474, lon=-6.1165318
- Dundrum House Hotel Golf & Leisure Resort (Ireland, 1 courses) — DB lat=52.5523338, lon=-8.0619753
- Fernhill Golf and Country Club (Ireland, 1 courses) — DB lat=51.8193647, lon=-8.376515
- Larkspur Park Sports Complex (Ireland, 1 courses) — DB lat=54.6938561, lon=-8.7179593
- Maine Valley members golf club (Ireland, 1 courses) — DB lat=52.1061973, lon=-9.7867881
- Oldfield Larks Golf Society (Ireland, 1 courses) — DB lat=53.2507692, lon=-6.2784892
- R & R Golf Course (Ireland, 1 courses) — DB lat=53.4163262, lon=-6.4813329
- Sandfield House Pitch and Putt (Ireland, 1 courses) — DB lat=52.938529, lon=-9.3924098
- Spanish Point Golf and Social Club (Ireland, 1 courses) — DB lat=52.8497247, lon=-9.438044
- St Patrick's Pitch & Putt (Ireland, 1 courses) — DB lat=52.4977191, lon=-6.5714786
- The Golf Course at Luttrellstown Castle Resort (Ireland, 1 courses) — DB lat=53.3729581, lon=-6.3624744
- Benone Tourist Complex (Northern Ireland, 1 courses) — DB lat=55.1640737, lon=-6.8722424
- Bowood Hotel, Spa & Golf Resort (Northern Ireland, 1 courses) — DB lat=51.4351698, lon=-2.0615968
- Limitless Adventure Centre, Football Golf (Northern Ireland, 1 courses) — DB lat=55.0781139, lon=-6.9999569