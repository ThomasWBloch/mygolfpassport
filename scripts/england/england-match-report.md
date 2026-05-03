# England match report
Generated: 2026-05-02T09:12:32

## Summary

| Bucket | Clubs | Courses |
|---|---:|---:|
| High conf — auto-apply candidate | 192 | 228 |
| Medium conf — review | 142 | 200 |
| Low conf — manual | 0 | 0 |
| No match in OSM or EG | 146 | 167 |

## Field-fill projection

| Field | Clubs | Courses |
|---|---:|---:|
| website | 333 | 427 |
| address | 3 | 3 |
| latitude | 0 | 0 |

## High confidence (recommended to apply)

### Addington Court Golf Club (England, 3 courses)

- DB: lat=51.3462581, lon=-0.0312782, addr="Featherbed Lane, Croydon", website=null, phone=null
- OSM (high, 172m, sim=1): name="Addington Court Golf Club", website="https://www.addingtoncourt-golfclub.co.uk/", addr="Featherbed Lane, CR0 9AA, Croydon"
- EG  (high, 172m, sim=1): name="Addington Court Golf Club", addr="Featherbed Lane, Croydon", phone="02086570281"

**Proposed UPDATE** (applied to all 3 course rows for this club, overall=high):
  - website: from osm(high, 172m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.addingtoncourt-golfclub.co.uk/'
WHERE id IN (
  '3264a369-184c-42fa-97ec-1852df076206',
  '3f6472b7-cb61-4080-ab6a-7d2567f2d277',
  '5123b03c-8b80-4a45-a9e5-029b7ab50ed2'
);
```

### Aldwickbury Park Golf Club (England, 2 courses)

- DB: lat=51.813415, lon=-0.3268929, addr="Piggottshill Lane , Harpenden", website=null, phone=null
- OSM (high, 116m, sim=1): name="Aldwickbury Park Golf Course", website="https://aldwickburyparkgolfclub.co.uk", addr="Piggottshill Lane, AL5 1AB, Harpenden"
- EG  (high, 116m, sim=1): name="Aldwickbury Park Golf Club", addr="Piggottshill Lane, Harpenden", phone="01582760112"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 116m, sim=1)
```sql
UPDATE courses SET
  website = 'https://aldwickburyparkgolfclub.co.uk'
WHERE id IN (
  '33873e9f-ef0d-48ea-9990-b84192444cc5',
  '8ad58be2-2f62-4629-9399-e6d20ee6e4cd'
);
```

### Alfreton Golf Club (England, 1 courses)

- DB: lat=53.0920254, lon=-1.4097321, addr="Wingfield Road, Alfreton", website=null, phone=null
- OSM (high, 166m, sim=1): name="Alfreton Golf Club", website="https://alfretongolfclub.co.uk/", addr="Wingfield Road, DE55 7LH, Alfreton"
- EG  (high, 166m, sim=1): name="Alfreton Golf Club", addr="Wingfield Road, Alfreton", phone="01773832070"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 166m, sim=1)
```sql
UPDATE courses SET
  website = 'https://alfretongolfclub.co.uk/'
WHERE id IN (
  '7cf8a43a-8dd2-44c1-9096-e3c5c18e6a3d'
);
```

### Ashbourne Golf Club (England, 1 courses)

- DB: lat=53.0042724, lon=-1.7414767, addr="Wyaston Road, Ashbourne", website=null, phone=null
- OSM (high, 78m, sim=1): name="Ashbourne Golf Club", website="https://www.ashbournegolfclub.co.uk/", addr="Wyaston Road, DE6 1NB, Ashbourne"
- EG  (high, 78m, sim=1): name="Ashbourne Golf Club", addr="Wyaston Road, Ashbourne", phone="01335342078"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 78m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.ashbournegolfclub.co.uk/'
WHERE id IN (
  '65788be3-0f0b-4b88-9ddb-0b4efe0a5633'
);
```

### Bakewell Golf Club (England, 1 courses)

- DB: lat=53.2176145, lon=-1.6640435, addr="Station Road, Bakewell", website=null, phone=null
- OSM (high, 226m, sim=1): name="Bakewell Golf Club", website="https://www.bakewellgolfclub.co.uk/", addr="Station Road, DE45 1GB, Bakewell"
- EG  (high, 226m, sim=1): name="Bakewell Golf Club", addr="Golf House, Station Road, Bakewell", phone="01629812307"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 226m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.bakewellgolfclub.co.uk/'
WHERE id IN (
  '34a6c1cf-bce1-48e5-a3e5-b32ee5288b73'
);
```

### Barnard Castle Golf Club (England, 1 courses)

- DB: lat=54.5565079, lon=-1.924796, addr="Harmire Road, Barnard Castle", website=null, phone=null
- OSM (high, 248m, sim=1): name="Barnard Castle Golf Course", website="https://www.barnardcastlegolfclub.org/", addr="Harmire Road, DL12 8QN, Barnard Castle"
- EG  (high, 248m, sim=1): name="Barnard Castle Golf Club", addr="Harmire Road, Barnard Castle", phone="01833638355"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 248m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.barnardcastlegolfclub.org/'
WHERE id IN (
  '226ef9ac-f965-46b1-97d7-85a675362352'
);
```

### Batchworth Park Golf Club (England, 1 courses)

- DB: lat=51.62768, lon=-0.4627244, addr="London Rd, Rickmansworth", website=null, phone=null
- OSM (high, 80m, sim=1): name="Batchworth Park Golf Club", website="https://www.batchworthparkgolf.co.uk/", addr="London Road, WD3 1JS, Rickmansworth"
- EG  (high, 80m, sim=1): name="Batchworth Park Golf Club", addr="London Road, Rickmansworth", phone="01923711400"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 80m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.batchworthparkgolf.co.uk/'
WHERE id IN (
  '1904ad3a-66c1-417c-b141-d49a5ae8f8bf'
);
```

### Bawburgh Golf Club (England, 2 courses)

- DB: lat=52.6417896, lon=1.1769941, addr="Marlingford Road, Norwich", website=null, phone=null
- OSM (high, 139m, sim=1): name="Bawburgh Golf Course", website="https://bawburgh.com/", addr="NR9 3LU, Norwich"
- EG  (high, 139m, sim=1): name="Bawburgh Golf Club", addr="Glen Lodge, Marlingford Road, Bawburgh", phone="01603 740404"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 139m, sim=1)
```sql
UPDATE courses SET
  website = 'https://bawburgh.com/'
WHERE id IN (
  '30f7d1c7-01ae-41c7-837c-fe5246594c9d',
  '857fcde0-346f-4d2c-9724-bce6ef47fa3f'
);
```

### Bearsted Golf Club (England, 1 courses)

- DB: lat=51.2782533, lon=0.5758853, addr="Ware Street, Maidstone", website=null, phone=null
- OSM (high, 214m, sim=1): name="Bearsted Golf Club", website="https://www.bearstedgolfclub.co.uk/", addr="Ware Street, ME14 4PQ, Maidstone"
- EG  (high, 214m, sim=1): name="Bearsted Golf Club", addr="Ware Street, Maidstone", phone="01622738198"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 214m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.bearstedgolfclub.co.uk/'
WHERE id IN (
  'fd438ee0-2f72-416b-b8f4-c8e4259529f0'
);
```

### Beauport Park Golf & Country Club (England, 2 courses)

- DB: lat=50.8971987, lon=0.5366072, addr="Battle Road, Saint Leonards-on-sea", website=null, phone=null
- OSM (high, 234m, sim=1): name="Beauport Park Golf Course", website="http://www.beauportparkgolf.co.uk/", addr="Battle Road, TN37 7BP, St. Leonards-on-Sea"
- EG  (high, 234m, sim=1): name="Beauport Park Golf & Country Club", addr="Battle Road, St. Leonards-on-Sea", phone="01424854245"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 234m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.beauportparkgolf.co.uk/'
WHERE id IN (
  '58519b31-1dc6-4b22-936d-ca036c352f6b',
  'c9eb8530-dc3a-4ec2-90d4-dde39c49dd9a'
);
```

### Bedfordshire Golf Club (England, 2 courses)

- DB: lat=52.1316498, lon=-0.5541935, addr="Spring Lane, Stagsden", website=null, phone=null
- OSM (high, 218m, sim=1): name="Bedfordshire Golf Club", website="https://www.bedfordshiregolf.com/", addr="Spring Lane, MK43 8SR, Stagsden"
- EG  (high, 218m, sim=1): name="Bedfordshire Golf Club", addr="Spring Lane, Stagsden, Bedford", phone="01234822555"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 218m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.bedfordshiregolf.com/'
WHERE id IN (
  '8071d792-42b1-4b30-a2bf-8a31807582d1',
  'd3f5533e-857a-4db4-baa6-06f7416d7e2f'
);
```

### Bentley Golf Club (England, 1 courses)

- DB: lat=51.6533225, lon=0.2703185, addr="Ongar Road, Pilgrims Hatch, Brentwood", website=null, phone=null
- OSM (high, 161m, sim=1): name="Bentley Golf Course", website="https://www.bentleygolfclub.com/", addr="Ongar Road, CM15 9SS, Brentwood"
- EG  (high, 161m, sim=1): name="Bentley Golf Club", addr="Ongar Road, Brentwood", phone="01277373179"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 161m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.bentleygolfclub.com/'
WHERE id IN (
  '697262e9-d198-42c6-b4a1-76934baf3e77'
);
```

### Birch Grove Golf Club (England, 1 courses)

- DB: lat=51.8583989, lon=0.871442, addr="Layer Road, Colchester", website=null, phone=null
- OSM (high, 113m, sim=1): name="Birch Grove Golf Club", website="http://golf.tappages.com/", addr="Layer Road, CO2 0HS, Colchester"
- EG  (high, 113m, sim=1): name="Birch Grove Golf Club", addr="Layer Road, Colchester", phone="01206734276"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 113m, sim=1)
```sql
UPDATE courses SET
  website = 'http://golf.tappages.com/'
WHERE id IN (
  '7d228700-4f46-46bb-b829-463a39b51286'
);
```

### Birstall Golf Club (England, 1 courses)

- DB: lat=52.6707241, lon=-1.1361199, addr="Station Road, Leicester", website=null, phone=null
- OSM (high, 187m, sim=1): name="Birstall Golf Club", website="https://www.birstallgolfclub.co.uk/", addr=null
- EG  (high, 187m, sim=1): name="Birstall Golf Club", addr="Station Road, Abbey, Leicester", phone="01162674322"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 187m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.birstallgolfclub.co.uk/'
WHERE id IN (
  '28746a52-03b9-4ced-ab7d-7c6fdfe1731c'
);
```

### Blackpool North Shore (England, 1 courses)

- DB: lat=53.84227, lon=-3.0450732, addr="Devonshire Road, Blackpool", website=null, phone=null
- OSM (high, 110m, sim=1): name="Blackpool North Shore Golf Course", website="https://www.bnsgc.com/", addr="Devonshire Road, FY2 0RD, Blackpool"
- EG  (high, 110m, sim=1): name="Blackpool North Shore Golf Club", addr="Devonshire Road, Blackpool", phone="01253354640"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 110m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.bnsgc.com/'
WHERE id IN (
  'ba9b613f-ea89-44ac-ad30-558f50d60caa'
);
```

### Blakes Golf Club (England, 1 courses)

- DB: lat=51.7190886, lon=0.1850157, addr="Epping Road, Epping", website=null, phone=null
- OSM (high, 192m, sim=1): name="Blakes Golf Course", website="https://www.blakesgolfclub.com/", addr="Epping Road, CM16 6RZ, North Weald"
- EG  (high, 192m, sim=1): name="Blakes Golf Club", addr="Epping Road, Epping", phone="01992525151"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 192m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.blakesgolfclub.com/'
WHERE id IN (
  '66571cfb-07eb-4715-bd65-41490c78877f'
);
```

### Boston Golf Club (England, 1 courses)

- DB: lat=53.0075381, lon=-0.0174588, addr="Horncastle Road, Boston", website=null, phone=null
- OSM (high, 111m, sim=1): name="Boston Golf Club", website="https://www.bostongc.co.uk/", addr="Horncastle Road, PE22 7EL, Boston"
- EG  (high, 111m, sim=1): name="Boston Golf Club", addr="Cowbridge, Horncastle Road, Boston", phone="01205350589"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 111m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.bostongc.co.uk/'
WHERE id IN (
  'be2d73f2-f39f-4a32-9266-d996b3e01295'
);
```

### Bracken Ghyll Golf (England, 1 courses)

- DB: lat=53.9506696, lon=-1.897596, addr="Skipton Road, Ilkley", website=null, phone=null
- OSM (high, 132m, sim=1): name="Bracken Ghyll Golf Club", website="http://www.brackenghyll.co.uk", addr=null
- EG  (high, 132m, sim=1): name="Bracken Ghyll Golf Club", addr="Skipton Road, Addingham", phone="01943831207"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 132m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.brackenghyll.co.uk'
WHERE id IN (
  '14b3b566-aeca-455b-92ed-7e9bc1815bf4'
);
```

### Brampton Golf Club (England, 1 courses)

- DB: lat=54.9205967, lon=-2.7188085, addr="Tarn Road, Brampton", website=null, phone=null
- OSM (high, 210m, sim=1): name="Brampton Golf Club", website="https://www.bramptongolfclub.com/", addr="Tarn Road, CA8 1HN, Brampton"
- EG  (high, 210m, sim=1): name="Brampton Golf Club", addr="Tarn Road, Brampton", phone="0169772255"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 210m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.bramptongolfclub.com/'
WHERE id IN (
  '2e19eeb6-4b18-4aa3-9ab7-4dda92bdf769'
);
```

### Bridlington Links (England, 3 courses)

- DB: lat=54.0712171, lon=-0.2100874, addr="Flamborough Road, Marton, Bridlington", website=null, phone=null
- OSM (high, 151m, sim=1): name="Bridlington Golf Club", website="https://www.bridlingtongolfclub.co.uk/", addr="Belvedere Road, YO15 3NA, Bridlington"
- EG  (high, 151m, sim=1): name="Bridlington Golf Club", addr="Belvedere Road, Bridlington", phone="01262606367"

**Proposed UPDATE** (applied to all 3 course rows for this club, overall=high):
  - website: from osm(high, 151m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.bridlingtongolfclub.co.uk/'
WHERE id IN (
  '28938eae-497b-48c8-86ff-c4e98a2b3d8c',
  'aa57c98f-cd6c-4986-9a2c-3acac7ad852b',
  'eb361937-afa4-427e-8176-af63621599b4'
);
```

### Brookdale Golf Club (England, 1 courses)

- DB: lat=53.4977647, lon=-2.1400598, addr="Medlock Road, Manchester", website=null, phone=null
- OSM (high, 73m, sim=1): name="Brookdale Golf Club", website="https://www.brookdalegolf.co.uk/", addr=null
- EG  (high, 73m, sim=1): name="Brookdale Golf Club", addr="Medlock Road, Woodhouses, Manchester", phone="01616814534"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 73m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.brookdalegolf.co.uk/'
WHERE id IN (
  'de54eb01-94cb-4896-a32f-299c05868601'
);
```

### Broome Park Golf Club (England, 1 courses)

- DB: lat=51.1930598, lon=1.1745859, addr="Canterbury Road, Canterbury", website=null, phone=null
- OSM (high, 155m, sim=1): name="Broome Park Golf Club", website="https://www.broomepark.co.uk/", addr="Canterbury Road, CT4 6QX"
- EG  (high, 155m, sim=1): name="Broome Park Golf Club", addr="Canterbury Road, Barnham, Canterbury", phone="01227831126"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 155m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.broomepark.co.uk/'
WHERE id IN (
  '8713756c-db54-458d-bffe-ce80bba15659'
);
```

### Brough Golf Club (England, 1 courses)

- DB: lat=53.7350813, lon=-0.5794213, addr="Cave Road, Brough", website=null, phone=null
- OSM (high, 208m, sim=1): name="Brough Golf Club", website="https://www.brough-golfclub.co.uk/", addr="Cave Road, HU15 1HB, Brough"
- EG  (high, 208m, sim=1): name="Brough Golf Club", addr="Cave Road, Brough", phone="01482667291"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 208m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.brough-golfclub.co.uk/'
WHERE id IN (
  '4259d84a-f1f9-4d81-ba3a-9ed122c0fb07'
);
```

### Broughton Heath Golf Course (England, 1 courses)

- DB: lat=52.8875367, lon=-1.6794742, addr="Bent Lane, Derby", website=null, phone=null
- OSM (high, 171m, sim=1): name="Broughton Heath Golf Course", website="https://www.broughtonheathgolfclub.co.uk/", addr="Bent Lane, DE65 5BA, Derby"
- EG  (high, 171m, sim=1): name="Broughton Heath Golf Club", addr="Bent Lane, Church Broughton", phone="07849132648"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 171m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.broughtonheathgolfclub.co.uk/'
WHERE id IN (
  'ea325264-8b2d-4c8e-bee2-8d0d33299ed5'
);
```

### Buckingham Golf Club (England, 1 courses)

- DB: lat=51.9968794, lon=-1.0194569, addr="Tingewick Road, Buckingham", website=null, phone=null
- OSM (high, 192m, sim=1): name="Buckingham Golf Club", website="https://www.buckinghamgolfclub.co.uk/", addr=null
- EG  (high, 192m, sim=1): name="Buckingham Golf Club", addr="Tingewick Road, Buckingham", phone="01280815566"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 192m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.buckinghamgolfclub.co.uk/'
WHERE id IN (
  '2f4960fe-f756-4098-bd34-b000bc6f4f3e'
);
```

### Burnham-on-Crouch Golf Club (England, 1 courses)

- DB: lat=51.6375719, lon=0.7889849, addr="Ferry Road, Burnham-on-Crouch", website=null, phone=null
- OSM (high, 244m, sim=1): name="Burnham-on-Crouch Golf Club", website="https://www.burnhamgolfclub.co.uk/", addr="Ferry Road, CM0 8PQ, Burnham-On-Crouch"
- EG  (high, 244m, sim=1): name="Burnham-On-Crouch Golf Club", addr="Ferry Road, Burnham on Crouch, Burnham-on-Crouch", phone="01621 782 282"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 244m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.burnhamgolfclub.co.uk/'
WHERE id IN (
  '26c4f441-581c-4a92-9120-0c7bd052b490'
);
```

### Burton-On-Trent Golf Club (England, 1 courses)

- DB: lat=52.7990507, lon=-1.5821531, addr="43 Ashby Road East, Burton-on-Trent", website=null, phone=null
- OSM (high, 152m, sim=1): name="Burton-on-Trent Golf Club", website="http://www.burtonontrentgolfclub.co.uk/", addr="Ashby Road East, DE15 0PS, Burton-on-Trent"
- EG  (high, 152m, sim=1): name="Burton-On-Trent Golf Club", addr="Ashby Road East, 43 Ashby Rd E, Burton-on-Trent", phone="01283544551"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 152m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.burtonontrentgolfclub.co.uk/'
WHERE id IN (
  '7c55a618-cad6-440f-ae84-b64560bd198d'
);
```

### Calcot Park Golf Course (England, 1 courses)

- DB: lat=51.4461534, lon=-1.0366386, addr="Bath Road, Reading", website=null, phone=null
- OSM (high, 89m, sim=1): name="Calcot Park Golf Club", website="https://www.calcotpark.com", addr="Bath Road, Calcot, RG31 7RN, Reading"
- EG  (high, 89m, sim=1): name="Calcot Park Golf Club", addr="Bath Road, Calcot, Reading", phone="01189427124"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 89m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.calcotpark.com'
WHERE id IN (
  '81fa1d4c-8c60-4d89-8d74-d69277dd0ca3'
);
```

### Cambridge Country Club (England, 1 courses)

- DB: lat=52.1860473, lon=-0.054537, addr="Toft Road, Cambridge", website=null, phone=null
- OSM (high, 185m, sim=1): name="Cambridge Country Club", website="https://www.cambridgecountryclub.com/", addr="Toft Road, CB23 2TT, Cambridge"
- EG  (high, 185m, sim=1): name="Cambridge Country Club", addr="Toft Road, Bourn, Cambridge", phone="01954718057"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 185m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.cambridgecountryclub.com/'
WHERE id IN (
  '7ad3d840-d39b-44cc-b0e4-c5b47ed1859f'
);
```

### Carus Green Golf Club (England, 1 courses)

- DB: lat=54.3478589, lon=-2.7499325, addr="Burneside Rd, Kendal", website=null, phone=null
- OSM (high, 167m, sim=1): name="Carus Green Golf Club", website="https://www.carusgreen.co.uk/", addr="Burnside Road, LA9 6EB, Kendal"
- EG  (high, 167m, sim=1): name="Carus Green Golf Club", addr="Burneside Road, Kendal", phone="01539 721097"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 167m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.carusgreen.co.uk/'
WHERE id IN (
  'da22bf80-be41-4a01-b620-bea8707bd884'
);
```

### Castle Royle (England, 1 courses)

- DB: lat=51.5003024, lon=-0.8198242, addr="Bath Road, Reading", website=null, phone=null
- OSM (high, 232m, sim=1): name="Castle Royle Golf & Country Club", website="https://www.castleroyle.com/", addr="Bath Road, RG10 9XA, Reading"
- EG  (high, 232m, sim=1): name="Castle Royle Golf & Country Club", addr="Bath Road, Knowl Hill, Reading", phone="01628820700"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 232m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.castleroyle.com/'
WHERE id IN (
  '40c8287f-b6eb-45f2-bb9d-e2848088b84f'
);
```

### Chapel-en-le-Frith Golf Club (England, 1 courses)

- DB: lat=53.3173678, lon=-1.9400191, addr="Manchester Road, High Peak", website=null, phone=null
- OSM (high, 119m, sim=1): name="Chapel-en-le-Frith Golf Club", website="https://www.chapelgolf.co.uk/", addr="Manchester Road, SK23 9UH, High Peak"
- EG  (high, 119m, sim=1): name="Chapel-En-Le-Frith Golf Club", addr="The Cockyard, Manchester Road, High Peak", phone="01298812118"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 119m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.chapelgolf.co.uk/'
WHERE id IN (
  '87ca9998-a8a3-43d2-8d92-68c8617bb271'
);
```

### Chartham Park (England, 1 courses)

- DB: lat=51.1481924, lon=-0.0256735, addr="Felcourt Road, East Grinstead", website=null, phone=null
- OSM (high, 51m, sim=1): name="Chartham Park", website="https://www.charthampark.com/", addr=null
- EG  (high, 51m, sim=1): name="Chartham Park", addr="Felcourt Road, Felcourt, East Grinstead", phone="01342870340"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 51m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.charthampark.com/'
WHERE id IN (
  'fa621da2-12d2-4196-9ad7-6598ddb55605'
);
```

### Chartridge Park Golf Club (England, 1 courses)

- DB: lat=51.7208969, lon=-0.6439651, addr="Chartridge Lane, Chesham", website=null, phone=null
- OSM (high, 232m, sim=1): name="Chartridge Park Golf Club", website="https://www.chartridgepark.co.uk/", addr="Chartridge Lane, HP5 2TF, Chartridge"
- EG  (high, 232m, sim=1): name="Chartridge Park Golf Club", addr="Chartridge, Chesham", phone="01494791772"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 232m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.chartridgepark.co.uk/'
WHERE id IN (
  '19e8b27a-5a90-42cb-a5b8-7f73b571733d'
);
```

### Cherwell Edge Golf Club (England, 1 courses)

- DB: lat=52.0841848, lon=-1.2764825, addr="Middleton Road, Chacombe", website=null, phone=null
- OSM (high, 125m, sim=1): name="Cherwell Edge Golf Club", website="https://www.cherwelledgegolfclub.co.uk/", addr="Middleton Road, OX17 2EN, Banbury"
- EG  (high, 125m, sim=1): name="Cherwell Edge Golf Club", addr="Chacombe, Banbury, Banbury", phone="01295711591"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 125m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.cherwelledgegolfclub.co.uk/'
WHERE id IN (
  '43031fa6-568f-4384-aae6-83f937a049b3'
);
```

### Chesfield Downs (England, 1 courses)

- DB: lat=51.9486827, lon=-0.2015956, addr="-, Hitchin", website=null, phone=null
- OSM (high, 105m, sim=1): name="Chesfield Downs Golf Club", website="https://www.chesfielddownsgolf.co.uk/", addr="Jack's Hill, SG4 7EQ, Hitchin"
- EG  (high, 105m, sim=1): name="Chesfield Downs Golf & Country Club", addr="Jack's Hill, Graveley, Nr Stevenage", phone="01462482929"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 105m, sim=1)
  - address: from eg(high, 105m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.chesfielddownsgolf.co.uk/',
  address = 'Jack''s Hill, Graveley, Nr Stevenage'
WHERE id IN (
  'a7b6405d-359e-4929-b9b4-dc53a8815235'
);
```

### Chester Le Street Golf Club (England, 1 courses)

- DB: lat=54.8537019, lon=-1.5570541, addr="16 Hauxley Drive, Chester-le-Street", website=null, phone=null
- OSM (high, 157m, sim=1): name="Chester-le-Street Golf Club", website="https://www.clsgolfclub.co.uk/", addr="Lumley Park, DH3 4NS, Chester-le-Street"
- EG  (high, 157m, sim=1): name="Chester-Le-Street Golf Club", addr="Lumley Park, Chester-le-Street", phone="01913883218"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 157m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.clsgolfclub.co.uk/'
WHERE id IN (
  '2aa0d9e9-d246-4c75-87ae-651148a97cde'
);
```

### Chesterfield Golf Club (England, 1 courses)

- DB: lat=53.2178478, lon=-1.4493608, addr="-, Chesterfield", website=null, phone=null
- OSM (high, 76m, sim=1): name="Chesterfield Golf Club", website="https://www.chesterfieldgolfclub.co.uk/", addr="Matlock Road, S42 7LA, Chesterfield"
- EG  (high, 76m, sim=1): name="Chesterfield Golf Club", addr="Matlock Road, Walton, Chesterfield", phone="01246279256"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 76m, sim=1)
  - address: from eg(high, 76m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.chesterfieldgolfclub.co.uk/',
  address = 'Matlock Road, Walton, Chesterfield'
WHERE id IN (
  'ad1828d8-12b0-44d1-b004-225a573cbe85'
);
```

### Chipping Sodbury Golf Club (England, 1 courses)

- DB: lat=51.5494554, lon=-2.3899866, addr="Trinity Lane, Chipping Sodbury", website=null, phone=null
- OSM (high, 57m, sim=1): name="Chipping Sodbury Golf Club", website="https://www.chippingsodburygolfclub.co.uk/", addr="Trinity Lane, BS37 6PU, Chipping Sodbury"
- EG  (high, 57m, sim=1): name="Chipping Sodbury Golf Club", addr="Trinity Lane, Chipping Sodbury, Bristol", phone="01454319042"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 57m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.chippingsodburygolfclub.co.uk/'
WHERE id IN (
  'eaa7ddf0-1e79-47ed-936e-f8b6a52cfa6b'
);
```

### Clandon Golf Club (England, 1 courses)

- DB: lat=51.2453912, lon=-0.5187098, addr="Epsom Road, Guildford", website=null, phone=null
- OSM (high, 165m, sim=1): name="Clandon Golf", website="https://www.clandongolf.co.uk/", addr="Epsom Road, GU4 7AA, Merrow"
- EG  (high, 165m, sim=1): name="Clandon Golf", addr="Epsom Road, Guildford", phone="01483451867"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 165m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.clandongolf.co.uk/'
WHERE id IN (
  '1c5b1a19-3c80-4fff-8563-27ec182d5fa9'
);
```

### Clitheroe Golf Club (England, 1 courses)

- DB: lat=53.8463384, lon=-2.400526, addr="Whalley Rd, Clitheroe", website=null, phone=null
- OSM (high, 239m, sim=1): name="Clitheroe Golf Course", website="https://www.clitheroegolfclub.com/", addr=null
- EG  (high, 239m, sim=1): name="Clitheroe Golf Club", addr="Whalley Road, Pendleton, Clitheroe", phone="01200422292"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 239m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.clitheroegolfclub.com/'
WHERE id IN (
  '2ecd0fd6-b98b-45f8-8cf9-19edd01dbb7f'
);
```

### Close House Golf Club (England, 2 courses)

- DB: lat=54.986375, lon=-1.8048866, addr="B6528 Road, Heddon-on-the-Wall", website=null, phone=null
- OSM (high, 39m, sim=1): name="Close House Hotel & Golf Club", website="https://www.closehouse.com/golf", addr="Heddon on the Wall, NE15 0HT, Newcastle upon Tyne"
- EG  (high, 39m, sim=1): name="Close House Golf Club", addr="Heddon on the Wall, Newcastle upon Tyne", phone="01661852255"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 39m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.closehouse.com/golf'
WHERE id IN (
  '895849b2-aa9a-47d3-bf9d-c2b4c068b217',
  'fcb2c880-4f1a-414c-bbff-ea803c1b930a'
);
```

### Cocken Lodge Golf Course (England, 1 courses)

- DB: lat=54.8188915, lon=-1.5305767, addr="Cocken Road, Leamside", website=null, phone=null
- OSM (high, 82m, sim=1): name="Cocken Lodge Golf Course", website="https://cockenlodgegolf.my.canva.site/cocken-website", addr="DH4 6QP, Houghton-le-Spring"
- EG  (high, 82m, sim=1): name="Cocken Lodge Golf Course", addr="Cocken Lodge Golf Course, Leamside, Houghton-le-Spring, DH4 6QP", phone="01915841053"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 82m, sim=1)
```sql
UPDATE courses SET
  website = 'https://cockenlodgegolf.my.canva.site/cocken-website'
WHERE id IN (
  'dc59a9b9-2059-4fe3-a2c0-f46fecd63b7a'
);
```

### Copthorne Golf Club (England, 1 courses)

- DB: lat=51.1326219, lon=-0.1134971, addr="Borers Arms Road, Copthorne", website=null, phone=null
- OSM (high, 163m, sim=1): name="Copthorne Golf Club", website="https://www.copthornegolfclub.co.uk/", addr=null
- EG  (high, 163m, sim=1): name="Copthorne Golf Club", addr="Borers Arms Road, Copthorne and Worth, Crawley", phone="01342712033"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 163m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.copthornegolfclub.co.uk/'
WHERE id IN (
  'eaddf1c6-657b-4c3a-9ea6-25f2d5673c1c'
);
```

### Coxmoor Golf Club (England, 1 courses)

- DB: lat=53.1115487, lon=-1.2154227, addr="Coxmoor Road, Sutton-in-Ashfield", website=null, phone=null
- OSM (high, 95m, sim=1): name="Coxmoor Golf Club", website="https://www.coxmoorgolfclub.co.uk/", addr="Coxmoor Road, NG17 5LF, Sutton-in-Ashfield"
- EG  (high, 95m, sim=1): name="Coxmoor Golf Club", addr="Coxmoor Road, Sutton-in-Ashfield", phone="01623557359"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 95m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.coxmoorgolfclub.co.uk/'
WHERE id IN (
  '2cacc897-e6a2-4a0f-95de-8d8bd4ea432a'
);
```

### Cranleigh Golf Club (England, 1 courses)

- DB: lat=51.1554206, lon=-0.4705567, addr="Barhatch Lane, Cranleigh", website=null, phone=null
- OSM (high, 106m, sim=1): name="Cranleigh Golf Club", website="http://www.ccgcranleigh.com/", addr=null
- EG  (high, 106m, sim=1): name="Cranleigh Golf & Country Club", addr="Barhatch Lane, Cranleigh", phone="01483268855"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 106m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.ccgcranleigh.com/'
WHERE id IN (
  '9a5b41bd-ba6b-4806-8eae-adbf58c4d77b'
);
```

### Crookhill Park Golf Course (England, 1 courses)

- DB: lat=53.4692644, lon=-1.2103651, addr="Carr Lane, Doncaster", website=null, phone=null
- OSM (high, 145m, sim=1): name="Crookhill Park Golf Course", website="http://www.crookhillgolfcourse.co.uk/", addr="Carr Lane, Doncaster"
- EG  (high, 145m, sim=1): name="Crookhill Park Golf Club", addr="Carr Lane, Conisbrough, Doncaster", phone="01709862974"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 145m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.crookhillgolfcourse.co.uk/'
WHERE id IN (
  '3f0153d9-449f-46e9-b28d-994f49d63ba9'
);
```

### Darnford Moors Golf Club (England, 1 courses)

- DB: lat=52.6761176, lon=-1.7949157, addr="Darnford Lane, Lichfield", website=null, phone=null
- OSM (high, 71m, sim=1): name="Darnford Moors Golf Course", website="https://www.darnfordmoors.com/", addr=null
- EG  (high, 71m, sim=1): name="Darnford Moors Golf Club", addr="Darnford Lane, Lichfield", phone="01543256661"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 71m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.darnfordmoors.com/'
WHERE id IN (
  '13fbc288-13af-4b6b-9cee-21d352e01b2c'
);
```

### Davenport Golf Club (England, 1 courses)

- DB: lat=53.3512831, lon=-2.096389, addr="Middlewood Road, Stockport", website=null, phone=null
- OSM (high, 79m, sim=1): name="Davenport Golf Club", website="https://www.davenportgolf.co.uk/", addr=null
- EG  (high, 79m, sim=1): name="Davenport Golf Club", addr="Middlewood Road, Poynton", phone="01625876951"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 79m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.davenportgolf.co.uk/'
WHERE id IN (
  '7df28442-228d-4600-bd89-b26f01a52f5b'
);
```

### Daventry & District Golf Club (England, 1 courses)

- DB: lat=52.2640234, lon=-1.1424693, addr="Norton Road, Daventry", website=null, phone=null
- OSM (high, 143m, sim=1): name="Daventry & District Golf Club", website="http://www.daventrygolfclub.co.uk/", addr="Norton Way, NN11 2LS, Daventry"
- EG  (high, 143m, sim=1): name="Daventry & District Golf Club", addr="Norton Road, Daventry", phone="01327702829"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 143m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.daventrygolfclub.co.uk/'
WHERE id IN (
  '41e05b74-537f-49b9-a278-07fa79db2627'
);
```

### Denham Golf Club (England, 1 courses)

- DB: lat=51.5833473, lon=-0.5168503, addr="Tilehouse Lane, Denham", website=null, phone=null
- OSM (high, 144m, sim=1): name="Denham Golf Club", website="https://www.denhamgolfclub.co.uk/", addr="Tilehouse Lane, UB9 5DE, Uxbridge"
- EG  (high, 144m, sim=1): name="Denham Golf Club", addr="Tilehouse Lane, Denham, Uxbridge", phone="01895832022"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 144m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.denhamgolfclub.co.uk/'
WHERE id IN (
  '6a3f1196-50d6-4fd3-8e06-18f318967fd4'
);
```

### Driffield Golf Club (England, 1 courses)

- DB: lat=53.9881682, lon=-0.4519575, addr="Beverley Road, Sunderlandwick", website=null, phone=null
- OSM (high, 151m, sim=1): name="Driffield Golf Course", website="https://www.driffieldgolfclub.co.uk/", addr="Beverley Road, YO25 9AD, Driffield"
- EG  (high, 151m, sim=1): name="Driffield Golf Club", addr="Sunderlandwick, Driffield", phone="01377253116"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 151m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.driffieldgolfclub.co.uk/'
WHERE id IN (
  '5960c587-15bd-4361-92d0-42879e9c3370'
);
```

### Dukinfield Golf Club (England, 1 courses)

- DB: lat=53.4695115, lon=-2.055398, addr="Yew Tree Lane, Dukinfield", website=null, phone=null
- OSM (high, 153m, sim=1): name="Dukinfield Golf Course", website="https://www.dukinfieldgolfclub.co.uk/", addr=null
- EG  (high, 153m, sim=1): name="Dukinfield Golf Club", addr="Lyne Edge, Yew Tree Lane, Dukinfield", phone="01613382340"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 153m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.dukinfieldgolfclub.co.uk/'
WHERE id IN (
  'cab70093-1ef2-42ef-833d-ad123db5faa4'
);
```

### Dunnerholme Golf Club (England, 1 courses)

- DB: lat=54.1993836, lon=-3.2070734, addr="Duddon Road, Askam-in-Furness", website=null, phone=null
- OSM (high, 244m, sim=1): name="Dunnerholme Golf Course", website="https://dunnerholme.co.uk/golf/", addr="Duddon Road, LA16 7AW, Askam-in-Furness"
- EG  (high, 244m, sim=1): name="The Dunnerholme Golf Club", addr="Duddon Road, Askam in Furness", phone="01229462675"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 244m, sim=1)
```sql
UPDATE courses SET
  website = 'https://dunnerholme.co.uk/golf/'
WHERE id IN (
  'a1de2d89-1f5c-4538-b23b-e38c7f32e9b5'
);
```

### Duxbury Park Golf Club (England, 1 courses)

- DB: lat=53.630809, lon=-2.6238911, addr="Duxbury Hall Road, Chorley", website=null, phone=null
- OSM (high, 75m, sim=1): name="Duxbury Park Golf Course", website="https://www.glendalegolf.co.uk/Duxbury-Park-Golf-Course", addr="Duxbury Hall Road, PR7 4AT, Chorley"
- EG  (high, 75m, sim=1): name="Duxbury Park Golf Club", addr=null, phone=null

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 75m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.glendalegolf.co.uk/Duxbury-Park-Golf-Course'
WHERE id IN (
  'e6885f6e-dc11-4fd4-86c2-67ce1884aba2'
);
```

### East Morton (England, 1 courses)

- DB: lat=53.8721611, lon=-1.8582402, addr="Carr Lane, Keighley", website=null, phone=null
- OSM (high, 128m, sim=1): name="East Morton Golf Club", website="https://eastmortongolf.co.uk/", addr="Carr Lane, BD20 5RY, Keighley"
- EG  (high, 128m, sim=1): name="East Morton Golf Club", addr="Carr Lane, East Morton, Keighley", phone="01274 525125"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 128m, sim=1)
```sql
UPDATE courses SET
  website = 'https://eastmortongolf.co.uk/'
WHERE id IN (
  '750c835f-2f3c-4959-8d5e-ea5456bf52f1'
);
```

### Ellesmere Golf Club (England, 1 courses)

- DB: lat=53.5174075, lon=-2.3789128, addr="Old Clough Lane, Worsley , Manchester", website=null, phone=null
- OSM (high, 213m, sim=1): name="Ellesmere Golf Club", website="https://www.ellesmeregolfclub.co.uk/", addr="Old Clough Lane, M28 7HZ, Worsley"
- EG  (high, 213m, sim=1): name="Ellesmere Golf Club", addr="Old Clough Lane, Worsley, Manchester", phone="01617902122"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 213m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.ellesmeregolfclub.co.uk/'
WHERE id IN (
  '909927a5-fb62-4095-937a-543bfe04c191'
);
```

### Elton Furze Golf Club (England, 1 courses)

- DB: lat=52.5312432, lon=-0.3594009, addr="Bullock Road, Peterborough", website=null, phone=null
- OSM (high, 245m, sim=1): name="Elton Furze Golf Club", website="https://www.efgc.co.uk/", addr=null
- EG  (high, 245m, sim=1): name="Elton Furze Golf Club", addr="Bullock Road, Haddon, Peterborough", phone="01832280189"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 245m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.efgc.co.uk/'
WHERE id IN (
  'ab88626b-f58e-4fc7-93ed-44fa0cce0491'
);
```

### Etchinghill Golf Club (England, 3 courses)

- DB: lat=51.1182913, lon=1.0936921, addr="Canterbury Road, Etchinghill", website=null, phone=null
- OSM (high, 106m, sim=1): name="Etchinghill Golf Club", website="http://www.pentlandgolf.co.uk/etchinghill/etchinghill-golf-club", addr="Canterbury Road, CT18 8FA, Etchinghill"
- EG  (high, 106m, sim=1): name="Etchinghill Golf Club", addr="Canterbury Road, Etchinghill, Folkestone", phone="01303863863"

**Proposed UPDATE** (applied to all 3 course rows for this club, overall=high):
  - website: from osm(high, 106m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.pentlandgolf.co.uk/etchinghill/etchinghill-golf-club'
WHERE id IN (
  '4b441dea-e33a-48c2-8bca-acbdf6af5eb8',
  '56f58f0e-bf3b-47e5-99f8-6517e6072505',
  'c16b4adf-9c06-424c-9ca3-c8c06d6c69c0'
);
```

### Eton College Golf Club (England, 1 courses)

- DB: lat=51.4972054, lon=-0.6122943, addr="Eton College, Eton", website=null, phone=null
- OSM (high, 131m, sim=1): name="Eton College Golf Course", website="https://www.etoncollege.com/ecgc-home.aspx", addr="SL4 6DJ, Windsor"
- EG  (high, 131m, sim=1): name="Eton College Golf Club", addr="Eton College, Windsor", phone="01753 719520"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 131m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.etoncollege.com/ecgc-home.aspx'
WHERE id IN (
  'c4413068-4cfa-4534-b83b-9f1da5dd057b'
);
```

### Fakenham Golf Course (England, 1 courses)

- DB: lat=52.823722, lon=0.8563144, addr="Hempton Road, Fakenham", website=null, phone=null
- OSM (high, 185m, sim=1): name="Fakenham Golf Club", website="https://www.fakenhamgolfclub.co.uk/", addr="NR21 7NY, Fakenham"
- EG  (high, 185m, sim=1): name="Fakenham Golf Club", addr=null, phone="01328863534"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 185m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.fakenhamgolfclub.co.uk/'
WHERE id IN (
  '764f6254-0a92-482f-8a20-739070d982aa'
);
```

### Finchley Golf Club (England, 1 courses)

- DB: lat=51.6101171, lon=-0.2018722, addr="Frith Lane, London", website=null, phone=null
- OSM (high, 61m, sim=1): name="Finchley Golf Course", website="https://www.finchleygolfclub.com/", addr="Nether Court, Frith Lane, NW7 1PU, London"
- EG  (high, 61m, sim=1): name="Finchley Golf Club", addr="Nether Court, Frith lane, Mill Hill, London", phone="020 8346 2436"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 61m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.finchleygolfclub.com/'
WHERE id IN (
  'fe050954-19ec-447e-b08f-6613f3e9f64b'
);
```

### Flamborough Head Golf Club (England, 1 courses)

- DB: lat=54.1199036, lon=-0.0900743, addr="Lighthouse Road, Flamborough", website=null, phone=null
- OSM (high, 169m, sim=1): name="Flamborough Head Golf Club", website="https://www.flamboroughheadgolfclub.co.uk/", addr="Lighthouse Road, YO15 1AR, Bridlington"
- EG  (high, 169m, sim=1): name="Flamborough Head Golf Club", addr="Lighthouse Road, Flamborough, Bridlington", phone="01262850333"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 169m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.flamboroughheadgolfclub.co.uk/'
WHERE id IN (
  'bbca89dd-bdd0-478f-a056-d43861f82864'
);
```

### Flempton Golf Club (England, 1 courses)

- DB: lat=52.3001251, lon=0.6520724, addr="Bury Road, Bury Saint Edmunds", website=null, phone=null
- OSM (high, 78m, sim=1): name="Flempton Golf Club", website="https://www.flemptongolfclub.co.uk/", addr="Bury Road, IP28 6EG, Flempton"
- EG  (high, 78m, sim=1): name="Flempton Golf Club", addr="The ClubHouse, Flempton, Bury St. Edmunds", phone="01284728291"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 78m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.flemptongolfclub.co.uk/'
WHERE id IN (
  '68088ccb-8513-4fce-b673-49d6d69c4c95'
);
```

### Forest of Arden Country Club (England, 1 courses)

- DB: lat=52.463946, lon=-1.6628175, addr="Maxstoke Lane, Birmingham", website=null, phone=null
- OSM (high, 32m, sim=1): name="Forest of Arden Country Club", website="https://www.marriott.co.uk/hotels/travel/cvtgs-forest-of-arden-marriott-hotel-and-country-club/", addr="Maxstoke Lane, CV7 7HR, Meriden"
- EG  (high, 32m, sim=1): name="Forest Of Arden Hotel & Country Club", addr="Maxstoke Lane, Meriden, Birmingham", phone="01676526107"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 32m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.marriott.co.uk/hotels/travel/cvtgs-forest-of-arden-marriott-hotel-and-country-club/'
WHERE id IN (
  'a23a7bd9-80c9-4d06-8a95-878079de59f2'
);
```

### Forest Park Golf Club (England, 2 courses)

- DB: lat=53.9953404, lon=-1.0082175, addr="Stockton-on-the-Forest, York", website=null, phone=null
- OSM (high, 199m, sim=1): name="Forest Park Golf Club", website="https://www.forestparkgolfclub.co.uk/", addr="YO32 9HF, Stockton-on-the-Forest"
- EG  (high, 199m, sim=1): name="Forest Park Golf Club", addr="Stockton-on-the-Forest, York", phone="01904400425"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 199m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.forestparkgolfclub.co.uk/'
WHERE id IN (
  '9b861c4d-4762-4f8b-805c-c6e1eafdcbeb',
  'f664d5b7-22f8-4a55-9f0e-ae98c9338928'
);
```

### Fulneck Golf Club (England, 1 courses)

- DB: lat=53.7821843, lon=-1.6680837, addr="Fulneck, Pudsey", website=null, phone=null
- OSM (high, 136m, sim=1): name="Fulneck Golf Club", website="https://fulneckgolfclub.co.uk/", addr="Fulneck, LS28 8NT, Pudsey"
- EG  (high, 136m, sim=1): name="Fulneck Golf Club", addr="Fulneck, Pudsey", phone="01132565191"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 136m, sim=1)
```sql
UPDATE courses SET
  website = 'https://fulneckgolfclub.co.uk/'
WHERE id IN (
  '57fdebcc-0cc1-4196-a1e7-5e866d31f003'
);
```

### Ganton Golf Club (England, 1 courses)

- DB: lat=54.1885454, lon=-0.4953191, addr="Station Rd, Scarborough", website=null, phone=null
- OSM (high, 240m, sim=1): name="Ganton Golf Club", website="https://www.gantongolfclub.com/", addr="YO12 4PA, Scarborough"
- EG  (high, 240m, sim=1): name="Ganton Golf Club", addr="Ganton, Nr Scarborough", phone="01944710329"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 240m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.gantongolfclub.com/'
WHERE id IN (
  '3d42ef66-6243-4d61-aa5f-8f326f6fac7e'
);
```

### Gathurst Golf Club (England, 1 courses)

- DB: lat=53.5687548, lon=-2.7021467, addr="62 Miles Lane, Shevington", website=null, phone=null
- OSM (high, 246m, sim=1): name="Gathurst Golf Club", website="https://gathurstgc.co.uk/", addr="Miles Lane, WN6 8EW, Wigan"
- EG  (high, 246m, sim=1): name="Gathurst Golf Club", addr="Miles Lane, Shevington, Wigan", phone="01257255235"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 246m, sim=1)
```sql
UPDATE courses SET
  website = 'https://gathurstgc.co.uk/'
WHERE id IN (
  '9e2de938-d8ef-400c-a36a-60276290563a'
);
```

### Gloucester Golf Club (England, 1 courses)

- DB: lat=51.8301262, lon=-2.2273435, addr="Matson Lane, Robinswood Hill, Gloucester", website=null, phone=null
- OSM (high, 129m, sim=1): name="Gloucester Golf Club", website="https://www.gloucestergolf.com/", addr="Matson Lane, GL4 6DX, Gloucester"
- EG  (high, 129m, sim=1): name="Gloucester Golf Club", addr="MATSON LANE, Robinswood Hill, Gloucester", phone="01452411331"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 129m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.gloucestergolf.com/'
WHERE id IN (
  'ac22d4eb-b2fc-4fc2-8a3a-fa73b792b1b7'
);
```

### Gotts Park Golf Club (England, 1 courses)

- DB: lat=53.8051737, lon=-1.6003447, addr="Armley ridge road, Leeds", website=null, phone=null
- OSM (high, 66m, sim=1): name="Gotts Park Golf Course", website="https://gottsparkgolfclub.co.uk/", addr=null
- EG  (high, 66m, sim=1): name="Gotts Park Golf Club", addr="Armley Ridge Road, Leeds", phone="01132311896"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 66m, sim=1)
```sql
UPDATE courses SET
  website = 'https://gottsparkgolfclub.co.uk/'
WHERE id IN (
  '93a05e79-c557-42ad-8cfe-3abe165bdb39'
);
```

### Grange Fell Golf Club (England, 1 courses)

- DB: lat=54.1945767, lon=-2.9311784, addr="Fell Rd, Grange-over-Sands", website=null, phone=null
- OSM (high, 167m, sim=1): name="Grange Fell Golf Club", website="https://www.grangefellgolfclub.co.uk/", addr="LA11 6HB"
- EG  (high, 167m, sim=1): name="Grange Fell Golf Club", addr="Fell Road, Grange-over-Sands", phone="01539532536"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 167m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.grangefellgolfclub.co.uk/'
WHERE id IN (
  '4112a8d5-0308-400b-b102-a61705cfeba9'
);
```

### Great Hadham Country Club (England, 1 courses)

- DB: lat=51.8564842, lon=0.1012111, addr="Great Hadham Road, Bishop's Stortford", website=null, phone=null
- OSM (high, 216m, sim=1): name="Great Hadham Golf Course", website="https://www.greathadham.co.uk/", addr="Great Hadham Road, SG10 6JE, Much Hadham"
- EG  (high, 216m, sim=1): name="Great Hadham Country Club", addr="Great Hadham Road, Much Hadham", phone="01279843558"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 216m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.greathadham.co.uk/'
WHERE id IN (
  'b4c421b2-543a-4d79-b2ea-e5e21627c5c7'
);
```

### Great Harwood Golf Club (England, 1 courses)

- DB: lat=53.7931415, lon=-2.3857326, addr="Whalley Road, Blackburn", website=null, phone=null
- OSM (high, 95m, sim=1): name="Great Harwood Golf Club", website="http://www.greatharwoodgolfclub.co.uk/", addr=null
- EG  (high, 95m, sim=1): name="Great Harwood Golf Club", addr="Harwood Bar, Whalley Road, Great Harwood", phone="01254887895"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 95m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.greatharwoodgolfclub.co.uk/'
WHERE id IN (
  '8061753d-2cd9-4911-b660-09d43dc76317'
);
```

### Grims Dyke Golf Club (England, 1 courses)

- DB: lat=51.620121, lon=-0.3641106, addr="Oxhey Lane, Pinner", website=null, phone=null
- OSM (high, 95m, sim=1): name="Grims Dyke Golf Club", website="http://www.grimsdyke.co.uk", addr="Oxhey Lane, HA5 4AL, Pinner"
- EG  (high, 95m, sim=1): name="Grims Dyke Golf Club", addr="Oxhey Lane, Hatch End, Pinner, Middlesex", phone="02084284539"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 95m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.grimsdyke.co.uk'
WHERE id IN (
  '5e1be8ec-f479-44f6-9cdd-589cc2ee3cea'
);
```

### Handsworth (England, 1 courses)

- DB: lat=52.5262369, lon=-1.9439016, addr="11 Sunningdale Close, Handsworth Wood, Birmingham", website=null, phone=null
- OSM (high, 201m, sim=1): name="Handsworth Golf Club", website="https://www.handsworthgc.co.uk/", addr="Sunningdale Close, 11, B20 1NP, Birmingham"
- EG  (high, 201m, sim=1): name="Handsworth Golf Club", addr="11 Sunningdale Close, Handsworth Wood, Birmingham", phone="01215543387"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 201m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.handsworthgc.co.uk/'
WHERE id IN (
  'dbd18c53-3627-4755-90c9-977628bd271c'
);
```

### Hankley Common Golf Club (England, 1 courses)

- DB: lat=51.1731902, lon=-0.7436242, addr="Tilford Road, Tilford", website=null, phone=null
- OSM (high, 223m, sim=1): name="Hankley Common Golf Club", website="https://www.hankley.co.uk/", addr=null
- EG  (high, 223m, sim=1): name="Hankley Common Golf Club", addr="The Clubhouse, Tilford Road, Tilford, Farnham", phone="01252792493"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 223m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.hankley.co.uk/'
WHERE id IN (
  '06d24115-af52-4237-b318-c45225c985b7'
);
```

### Hart Common Golf Club (England, 1 courses)

- DB: lat=53.5390797, lon=-2.5468044, addr="Westhoughton, Wigan Road, Bolton", website=null, phone=null
- OSM (high, 202m, sim=1): name="Hart Common Golf Club", website="https://www.hartcommongolfclub.co.uk/", addr="Wigan Road, BL5 2BX, Bolton"
- EG  (high, 202m, sim=1): name="Hart Common Golf Club", addr="Wigan Road, Westhoughton, Bolton", phone="01942813195"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 202m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.hartcommongolfclub.co.uk/'
WHERE id IN (
  'b382404f-df6f-48e9-8c3b-ba8e6d9f0a5e'
);
```

### Hartlepool Golf Club (England, 2 courses)

- DB: lat=54.7173967, lon=-1.2378216, addr="Hart Warren, Hartlepool", website=null, phone=null
- OSM (high, 44m, sim=1): name="Hartlepool Golf Club", website="https://www.hartlepoolgolfclub.co.uk/", addr=null
- EG  (high, 44m, sim=1): name="Hartlepool Golf Club", addr="Hart Warren, Hartlepool", phone="01429274398"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 44m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.hartlepoolgolfclub.co.uk/'
WHERE id IN (
  '0763109e-b6b3-41ed-b9d2-578fc3bc6d10',
  'c94a9211-75ed-4406-93b6-d8f2e7e27a86'
);
```

### Hatchford Brook Golf Course (England, 1 courses)

- DB: lat=52.454988, lon=-1.7620229, addr="Coventry Road, Birmingham", website=null, phone=null
- OSM (high, 241m, sim=1): name="Hatchford Brook Golf Course", website="https://www.mytimeactive.co.uk/golf/centres/hatchford-brook/default.aspx", addr="Coventry Road, B26 3PY, Birmingham"
- EG  (high, 241m, sim=1): name="Hatchford Brook Golf Club", addr="Coventry Road, Sheldon, Birmingham", phone="01217439821"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 241m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.mytimeactive.co.uk/golf/centres/hatchford-brook/default.aspx'
WHERE id IN (
  '167a6c76-d764-4ef7-ab29-45b3f727cccd'
);
```

### Heart Common Golf Club (England, 1 courses)

- DB: lat=53.5390797, lon=-2.5468044, addr="Wigan Road , Westhoughton ", website=null, phone=null
- OSM (high, 202m, sim=0.917): name="Hart Common Golf Club", website="https://www.hartcommongolfclub.co.uk/", addr="Wigan Road, BL5 2BX, Bolton"
- EG  (high, 202m, sim=0.917): name="Hart Common Golf Club", addr="Wigan Road, Westhoughton, Bolton", phone="01942813195"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 202m, sim=0.917)
```sql
UPDATE courses SET
  website = 'https://www.hartcommongolfclub.co.uk/'
WHERE id IN (
  'fe3caee7-83de-40e9-9f3b-5d302426ebaa'
);
```

### Heaton Park Golf Club (England, 2 courses)

- DB: lat=53.5373548, lon=-2.2445908, addr="Middleton Road, Prestwich, Manchester", website=null, phone=null
- OSM (high, 117m, sim=1): name="Heaton Park Golf Course", website="https://www.heatonparkgolfclub.co.uk/", addr="Middleton Road, M25 2SW, Prestwich"
- EG  (high, 117m, sim=1): name="Heaton Park Golf Club", addr="Heaton Park, Middleton Road, Prestwich, Manchester", phone="01614599975"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 117m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.heatonparkgolfclub.co.uk/'
WHERE id IN (
  '223a686a-0bb3-4e90-8db1-4b443f75a122',
  '76025017-a50d-4b1c-8e1e-de68eafe797d'
);
```

### Heysham Golf Club (England, 1 courses)

- DB: lat=54.0311545, lon=-2.8986587, addr="Middleton Road, Heysham", website=null, phone=null
- OSM (high, 184m, sim=1): name="Heysham Golf Club", website="https://www.heyshamgolfclub.co.uk/", addr="Trumacar Park, LA3 3JH, Lancaster"
- EG  (high, 184m, sim=1): name="Heysham Golf Club", addr="Trumacar Park, Heysham", phone="01524851011"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 184m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.heyshamgolfclub.co.uk/'
WHERE id IN (
  '229128cf-f59a-499c-bf7f-9a9e099c66ee'
);
```

### Highgate Golf Club (England, 1 courses)

- DB: lat=51.5780397, lon=-0.1635785, addr="Denewood Road, London", website=null, phone=null
- OSM (high, 57m, sim=1): name="Highgate Golf Club", website="https://www.highgategc.co.uk/", addr="Denewood Road, N6 4AH, London"
- EG  (high, 57m, sim=1): name="Highgate Golf Club", addr="Denewood Road, Highgate, London", phone="020 8340 1906"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 57m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.highgategc.co.uk/'
WHERE id IN (
  '088c47a2-402d-4064-a3e8-cd8b40fd9b7f'
);
```

### Hill Barn Golf Club (England, 1 courses)

- DB: lat=50.8400568, lon=-0.3791612, addr="Hill Barn Lane, Worthing", website=null, phone=null
- OSM (high, 193m, sim=1): name="Hill Barn Golf Club", website="https://hillbarngolf.com/", addr="Hill Barn Lane, BN14 9QF, Worthing"
- EG  (high, 193m, sim=1): name="Hill Barn Golf Club", addr="Hill Barn Lane, Worthing", phone="01903237301"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 193m, sim=1)
```sql
UPDATE courses SET
  website = 'https://hillbarngolf.com/'
WHERE id IN (
  'b09823dc-cd36-4b0e-90f4-276665e4e90e'
);
```

### Hindley Hall Golf Club (England, 1 courses)

- DB: lat=53.548738, lon=-2.580579, addr="Hall Lane, Hindley , Wigan", website=null, phone=null
- OSM (high, 81m, sim=1): name="Hindley Hall Golf Club", website="https://www.hindleyhallgolfclub.co.uk/", addr="Hall Lane, WN2 2SQ, Wigan"
- EG  (high, 81m, sim=1): name="Hindley Hall Golf Club", addr="Hall Lane, Hindley, Wigan", phone="01942255131"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 81m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.hindleyhallgolfclub.co.uk/'
WHERE id IN (
  '3a7d5cc1-47c7-4515-9ed3-0dd30ab111c3'
);
```

### Huddersfield Golf Club (England, 1 courses)

- DB: lat=53.6714068, lon=-1.8007757, addr="Lightridge Road, Huddersfield", website=null, phone=null
- OSM (high, 39m, sim=1): name="Huddersfield Golf Club", website="https://www.huddersfield-golf.co.uk/", addr="Lightbridge Road, HD2 2EP, Huddersfield"
- EG  (high, 39m, sim=1): name="Huddersfield Golf Club", addr="Fixby Hall, Lightridge Road, Fixby, Huddersfield", phone="01484426203"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 39m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.huddersfield-golf.co.uk/'
WHERE id IN (
  '1b73b614-ae38-4fc2-a15f-7010daad6a20'
);
```

### Ilfracombe Golf Course (England, 1 courses)

- DB: lat=51.2113156, lon=-4.0887614, addr="Hele Bay, Ilfracombe", website=null, phone=null
- OSM (high, 140m, sim=0.909): name="Illfracombe Golf Club", website="https://ilfracombegolfclub.com/", addr=null
- EG  (high, 140m, sim=1): name="Ilfracombe Golf Club", addr="Hele Bay, Ilfracombe", phone="01271862176"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 140m, sim=0.909)
```sql
UPDATE courses SET
  website = 'https://ilfracombegolfclub.com/'
WHERE id IN (
  'fe5080f0-23f5-4bcd-a58a-ce2107c6817d'
);
```

### Ineos Golf Club (England, 1 courses)

- DB: lat=54.6019915, lon=-1.5913798, addr="School Aycliffe Lane, Newton Aycliffe", website=null, phone=null
- OSM (high, 230m, sim=1): name="Ineos Golf Club", website="https://ineosgolfclub.webs.com/", addr="School Aycliffe Lane, DL5 6EA, Newton Aycliffe"
- EG  (high, 230m, sim=1): name="Ineos Golf Club", addr="School Aycliffe Lane, Aycliffe East, Newton Aycliffe", phone="01325303525"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 230m, sim=1)
```sql
UPDATE courses SET
  website = 'https://ineosgolfclub.webs.com/'
WHERE id IN (
  '0e9fc211-d8c0-47b8-af86-dc99b4b553ba'
);
```

### Ipswich Golf Club (England, 2 courses)

- DB: lat=52.0419948, lon=1.2158073, addr="Bucklesham Rd, Ipswich", website=null, phone=null
- OSM (high, 180m, sim=1): name="Ipswich Golf Club", website="https://www.ipswichgolfclub.com/", addr="Bucklesham Road, IP3 8UQ, Ipswich"
- EG  (high, 180m, sim=1): name="Ipswich Golf Club", addr="Ipswich Golf Club, Purdis Heath, Bucklesham Road, Ipswich", phone="01473728941"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 180m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.ipswichgolfclub.com/'
WHERE id IN (
  '01d20271-6fb0-45cd-ba3f-31b75e6a5b4d',
  'f2c5860f-656d-4375-a6d2-f5746d9708da'
);
```

### King's Lynn Golf Club (England, 1 courses)

- DB: lat=52.7855021, lon=0.4538303, addr="Castle Rising, King's Lynn", website=null, phone=null
- OSM (high, 132m, sim=1): name="King’s Lynn Golf Club", website="http://www.club-noticeboard.co.uk/kingslynn/", addr="Castle Rising Road, PE31 6BD, King's Lynn"
- EG  (high, 132m, sim=0.909): name="Kings Lynn Golf Club", addr="Lynn Road, Castle Rising, King's Lynn", phone="01553631654"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 132m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.club-noticeboard.co.uk/kingslynn/'
WHERE id IN (
  'f0b9a1e6-a3cf-44d3-a4fa-315aa8ef8484'
);
```

### Kingsthorpe Golf Club (England, 1 courses)

- DB: lat=52.2582829, lon=-0.8891568, addr="Kingsley Road,, Northampton", website=null, phone=null
- OSM (high, 239m, sim=1): name="Kingsthorpe Golf Course", website="https://www.kingsthorpe-golf.co.uk/", addr=null
- EG  (high, 239m, sim=1): name="Kingsthorpe Golf Club", addr="Kingsley Road, Northampton", phone="01604711173"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 239m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.kingsthorpe-golf.co.uk/'
WHERE id IN (
  'f12f5155-a4b1-4a87-a404-243233ac875d'
);
```

### Kirby Muxloe Golf Club (England, 1 courses)

- DB: lat=52.6280368, lon=-1.2360827, addr=" Station Road, Leicester", website=null, phone=null
- OSM (high, 195m, sim=1): name="Kirby Muxloe Golf Club", website="https://www.kirbymuxloe-golf.co.uk/", addr="Station Road, LE9 2EP, Kirby Muxloe"
- EG  (high, 195m, sim=1): name="Kirby Muxloe Golf Club", addr="Station Road, Kirby Muxloe, Leicester", phone="01162393457"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 195m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.kirbymuxloe-golf.co.uk/'
WHERE id IN (
  '299c74b7-9e50-40cb-99d7-32e8e1860b16'
);
```

### Knaresborough Golf Course (England, 1 courses)

- DB: lat=54.0282929, lon=-1.4462519, addr="Boroughbridge Rd, Knaresborough", website=null, phone=null
- OSM (high, 39m, sim=1): name="Knaresborough Golf Club", website="https://www.knaresboroughgolfclub.co.uk/", addr="Boroughbridge Road, HG5 0QQ, Knaresborough"
- EG  (high, 39m, sim=1): name="Knaresborough Golf Club", addr="Boroughbridge Road, Knaresborough", phone="01423862690"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 39m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.knaresboroughgolfclub.co.uk/'
WHERE id IN (
  'b603c3b0-75d0-4d91-8ea7-1b168e101a60'
);
```

### Lansil Golf Club (England, 1 courses)

- DB: lat=54.0644782, lon=-2.7828305, addr=" Caton Rd, Lancaster", website=null, phone=null
- OSM (high, 238m, sim=1): name="Lansil Golf Club", website="https://www.lansilgolfclub.co.uk/", addr=null
- EG  (high, 238m, sim=1): name="Lansil Golf Club", addr="Caton Road, Lancaster", phone="0152461233"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 238m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.lansilgolfclub.co.uk/'
WHERE id IN (
  '21cbd5d7-2ce2-4191-880b-4d680683f00a'
);
```

### Leeds Castle (England, 1 courses)

- DB: lat=51.2513907, lon=0.6341792, addr="Leeds Village, Maidstone", website=null, phone=null
- OSM (high, 151m, sim=1): name="Leeds Castle Golf Club", website="https://www.leeds-castle.com/goto.php?sess=+A5A534C191850465D+E+852+9+B5B594A&id=122", addr="Ashford Road, ME17 1PL, Broomfield, Maidstone"
- EG  (high, 151m, sim=1): name="Leeds Castle Golf Club", addr="Hollingbourne, Leeds, Maidstone", phone="01622767828"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 151m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.leeds-castle.com/goto.php?sess=+A5A534C191850465D+E+852+9+B5B594A&id=122'
WHERE id IN (
  'b9506490-f565-47fb-a9f0-d750d7398aa8'
);
```

### Leeds Golf Centre (England, 2 courses)

- DB: lat=53.872327, lon=-1.495998, addr="Wike Ridge Lane, Leeds", website=null, phone=null
- OSM (high, 162m, sim=1): name="Leeds Golf Centre", website="https://www.leedsgolfcentre.com/", addr=null
- EG  (high, 162m, sim=1): name="Leeds Golf Centre", addr="Wike Ridge Lane, Shadwell, Leeds", phone="01132886000"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 162m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.leedsgolfcentre.com/'
WHERE id IN (
  '0ca57d26-8483-4d6f-ad35-693aab53f4c9',
  '19f7f6ff-6786-4275-a80f-aa3583095404'
);
```

### Letchworth Golf Club (England, 1 courses)

- DB: lat=51.9629996, lon=-0.2324984, addr="Letchworth ,  Garden City", website=null, phone=null
- OSM (high, 126m, sim=1): name="Letchworth Golf Club", website="http://www.letchworthgolfclub.co.uk", addr="Letchworth Lane, SG6 3NQ, Letchworth Garden City"
- EG  (high, 126m, sim=1): name="Letchworth Golf Club", addr="Letchworth Lane, Letchworth Garden City", phone="01462683203"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 126m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.letchworthgolfclub.co.uk'
WHERE id IN (
  '818a922c-a212-44a2-8241-18062a723dbe'
);
```

### Libbaton Golf Club (England, 1 courses)

- DB: lat=50.9569167, lon=-3.9936858, addr="High Bickington, Umberleigh", website=null, phone=null
- OSM (high, 125m, sim=1): name="Libbaton Golf Club", website="http://www.libbatongolfclub.co.uk/", addr=null
- EG  (high, 125m, sim=1): name="Libbaton Golf Club", addr="High Bickington, Umberleigh", phone="01769560269"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 125m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.libbatongolfclub.co.uk/'
WHERE id IN (
  '80b27a0b-df02-4538-9165-0ec115849017'
);
```

### Limpsfield Chart Golf Club (England, 1 courses)

- DB: lat=51.2555346, lon=0.0234487, addr="Westerham Road, Oxted", website=null, phone=null
- OSM (high, 113m, sim=1): name="Limpsfield Chart Golf Club", website="http://limpsfieldchartgolf.co.uk/", addr=null
- EG  (high, 113m, sim=1): name="Limpsfield Chart Golf Club", addr="Westerham Road, Oxted", phone="01883723405"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 113m, sim=1)
```sql
UPDATE courses SET
  website = 'http://limpsfieldchartgolf.co.uk/'
WHERE id IN (
  '002cf9ee-2263-4243-8612-7f3261a86600'
);
```

### Lincoln Golf Club (England, 1 courses)

- DB: lat=53.3036695, lon=-0.7350699, addr="-, Lincoln", website=null, phone=null
- OSM (high, 120m, sim=1): name="Lincoln Golf Club", website=null, addr=null
- EG  (high, 120m, sim=1): name="Lincoln Golf Club", addr="Torksey, Lincoln", phone="01427 718721"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - address: from eg(high, 120m, sim=1)
```sql
UPDATE courses SET
  address = 'Torksey, Lincoln'
WHERE id IN (
  '13d03fad-9981-46f7-ad5c-b40fd1299a42'
);
```

### Longcliffe (England, 1 courses)

- DB: lat=52.7525151, lon=-1.2638171, addr=" Snells Nook Lane, Loughborough", website=null, phone=null
- OSM (high, 219m, sim=1): name="Longcliffe Golf Club", website="https://www.longcliffegolf.co.uk/", addr=null
- EG  (high, 219m, sim=1): name="Longcliffe Golf Club", addr="Snells Nook Lane, Nanpantan, Loughborough", phone="01509 239129"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 219m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.longcliffegolf.co.uk/'
WHERE id IN (
  '0e3d60ff-8ced-482d-bd9c-6d4bed15525d'
);
```

### Lydd Golf Club (England, 1 courses)

- DB: lat=50.963836, lon=0.9255499, addr="Romney Road, Lydd", website=null, phone=null
- OSM (high, 163m, sim=1): name="Lydd Golf Club", website="https://www.lyddgolfclub.co.uk/", addr="Romney Road, TN29 9LS, Lydd"
- EG  (high, 163m, sim=1): name="Lydd Golf Club", addr="Romney Road, Lydd", phone="01797320808"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 163m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.lyddgolfclub.co.uk/'
WHERE id IN (
  '2f80ee5b-30c0-4069-9a58-0c2600e79219'
);
```

### Lymm Golf Club (England, 1 courses)

- DB: lat=53.3892024, lon=-2.4862752, addr="Whitbarrow Road, Lymm", website=null, phone=null
- OSM (high, 61m, sim=1): name="Lymm Golf Club", website="http://www.lymm-golf-club.co.uk/", addr="Whitbarrow Road, WA13 9AN, Lymm, Cheshire"
- EG  (high, 61m, sim=1): name="Lymm Golf Club", addr="Whitbarrow Road, Lymm", phone="01925 755 020"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 61m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.lymm-golf-club.co.uk/'
WHERE id IN (
  '866d14c5-fbea-4cf7-96f7-79574e2be47e'
);
```

### Lytham Green Drive Golf Club (England, 1 courses)

- DB: lat=53.7475678, lon=-2.9576269, addr="Ballam Road, Lytham", website=null, phone=null
- OSM (high, 211m, sim=1): name="Lytham Green Drive Golf Course", website="https://www.lythamgreendrive.co.uk/", addr="FY8 4LE, Lytham St Annes"
- EG  (high, 211m, sim=1): name="Lytham Green Drive Golf Club", addr="Ballam Road, Lytham St. Annes", phone="01253737390"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 211m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.lythamgreendrive.co.uk/'
WHERE id IN (
  '94474090-c682-4da6-b8de-508f4152a037'
);
```

### Manston Golf Centre (England, 1 courses)

- DB: lat=51.3454761, lon=1.3796128, addr="Manston road, Manston", website=null, phone=null
- OSM (high, 46m, sim=1): name="Manston Golf Centre", website="https://www.manstongolf.co.uk/", addr="Manston Road, CT12 5BE, Ramsgate, Kent"
- EG  (high, 46m, sim=1): name="Manston Golf Centre", addr="Manston Road, Manston, Manston", phone="01843590005"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 46m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.manstongolf.co.uk/'
WHERE id IN (
  '0aa51359-1fee-4084-8a00-86b7a9fc214c'
);
```

### Mardyke Valley Golf Club (England, 1 courses)

- DB: lat=51.5040023, lon=0.3016054, addr="South Road, South Ockendon", website=null, phone=null
- OSM (high, 176m, sim=1): name="Mardyke Valley Golf Club", website="https://www.mardykevalley.co.uk/", addr="RM15 6RR"
- EG  (high, 176m, sim=1): name="Mardyke Valley Golf Club", addr="South Road, South Ockendon", phone="01708855011"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 176m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.mardykevalley.co.uk/'
WHERE id IN (
  'c02a8587-cf75-4085-a878-b7ff5d38a0fd'
);
```

### market drayton (England, 1 courses)

- DB: lat=52.8899621, lon=-2.4928435, addr="Sutton, Shropshire", website=null, phone=null
- OSM (high, 157m, sim=1): name="Market Drayton Golf Club", website="https://www.marketdraytongolfclub.co.uk/", addr=null
- EG  (high, 157m, sim=1): name="Market Drayton Golf Club", addr="Sutton Lane, Market Drayton", phone="01630652266"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 157m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.marketdraytongolfclub.co.uk/'
WHERE id IN (
  'c77ca9fc-0408-436a-b822-460120cde084'
);
```

### Market Rasen (England, 1 courses)

- DB: lat=53.3767004, lon=-0.3013933, addr="Legsby Road, Lincolnshire", website=null, phone=null
- OSM (high, 153m, sim=1): name="Market Rasen Golf Club", website="https://www.marketrasengolfclub.co.uk/", addr="Legsby Road, LN8 3DZ, Market Rasen"
- EG  (high, 153m, sim=1): name="Market Rasen Golf Club", addr="Legsby Road, Market Rasen", phone="01673842319"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 153m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.marketrasengolfclub.co.uk/'
WHERE id IN (
  'a63d9dd6-5874-4ae6-ad36-8c7a9e96aa6b'
);
```

### Marsden Golf Club (England, 1 courses)

- DB: lat=53.590817, lon=-1.9370976, addr="Mount Road, Huddersfield", website=null, phone=null
- OSM (high, 89m, sim=1): name="Marsden Golf Club", website="http://marsdengolf.co.uk/", addr="Mount Road, HD7 6NN, Huddersfield"
- EG  (high, 89m, sim=1): name="Marsden Golf Club", addr="Mount Road, Hemplow, Huddersfield", phone="01484844253"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 89m, sim=1)
```sql
UPDATE courses SET
  website = 'http://marsdengolf.co.uk/'
WHERE id IN (
  '51c21ec1-9921-4bb9-a971-d450e66ba0bf'
);
```

### Marton Meadows Golf Club (England, 1 courses)

- DB: lat=53.2098783, lon=-2.2234659, addr="Congleton Road, Macclesfield", website=null, phone=null
- OSM (high, 144m, sim=1): name="Marton Meadows Golf Course", website="http://www.martonmeadowsgolf.co.uk/", addr="SK11 9HF, Macclesfield"
- EG  (high, 144m, sim=1): name="Marton Meadows Golf Club", addr="Congleton Road, Marton, Macclesfield", phone="01260224008"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 144m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.martonmeadowsgolf.co.uk/'
WHERE id IN (
  '9ce24a0c-9622-431a-8d39-119c44268cd7'
);
```

### Melton Mowbray (England, 1 courses)

- DB: lat=52.7847924, lon=-0.8411727, addr="Thorpe Arnold,  Melton Mowbray", website=null, phone=null
- OSM (high, 197m, sim=1): name="Melton Mowbray Golf Club", website="https://meltonmowbraygolfclub.com/", addr="Waltham Road, LE14 4SD, Melton Mowbray"
- EG  (high, 197m, sim=1): name="Melton Mowbray Golf Club", addr="Thorpe Arnold, Melton Mowbray", phone="01664562118"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 197m, sim=1)
```sql
UPDATE courses SET
  website = 'https://meltonmowbraygolfclub.com/'
WHERE id IN (
  '01cdd403-1b53-4cf9-b508-55316d84dc7c'
);
```

### Mickleover Golf Club (England, 1 courses)

- DB: lat=52.9044715, lon=-1.528233, addr="Uttoxeter Road, Mickleover", website=null, phone=null
- OSM (high, 226m, sim=1): name="Mickleover Golf Course", website="https://www.mickleovergolfclub.co.uk/", addr="Uttoxeter Road, DE3 9AD, Derby"
- EG  (high, 226m, sim=1): name="Mickleover Golf Club", addr="Uttoxeter Road, Mickleover, Derby DE3 9AF", phone="01332518662"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 226m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.mickleovergolfclub.co.uk/'
WHERE id IN (
  '3c2642a6-8c90-48f8-b8f9-1f9e18ec27cb'
);
```

### Mid-Herts Golf Club (England, 1 courses)

- DB: lat=51.8269414, lon=-0.2964705, addr="Lamer Lane, Wheathampstead", website=null, phone=null
- OSM (high, 113m, sim=1): name="Mid Herts Golf Club", website="https://www.midhertsgolfclub.co.uk/", addr="Lamer Lane, AL4 8RR, St Albans"
- EG  (high, 113m, sim=1): name="Mid Herts Golf Club", addr="Lower Gustard Wood, Lamer Lane, Wheathampstead", phone="01582832242"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 113m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.midhertsgolfclub.co.uk/'
WHERE id IN (
  '673fc108-8c6c-4d4b-8520-b245fe8d5274'
);
```

### Moor Park Golf Club (England, 2 courses)

- DB: lat=51.6276417, lon=-0.4495541, addr="Rickmansworth, Rickmansworth", website=null, phone=null
- OSM (high, 112m, sim=1): name="Moor Park Golf Club", website="https://www.moorparkgc.co.uk/", addr="WD3 1QN, Rickmansworth"
- EG  (high, 112m, sim=1): name="Moor Park Golf Club", addr="Moor Park, Rickmansworth", phone="01923773146"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 112m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.moorparkgc.co.uk/'
WHERE id IN (
  'a6825632-1571-438a-8367-1566e915049b',
  'd542542e-a7de-459f-888f-890b36de093c'
);
```

### Mossock Hall Golf Club (England, 1 courses)

- DB: lat=53.5252915, lon=-2.8918446, addr="Liverpool Road, Bickerstaffe", website=null, phone=null
- OSM (high, 115m, sim=1): name="Mossock Hall Golf Club", website="https://mossockhallgolfclub.co.uk/", addr="Liverpool Road, L39 0EE, Bickerstaffe"
- EG  (high, 115m, sim=1): name="Mossock Hall Golf Club", addr="Liverpool Road, Bickerstaffe, Ormskirk", phone="01695421717"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 115m, sim=1)
```sql
UPDATE courses SET
  website = 'https://mossockhallgolfclub.co.uk/'
WHERE id IN (
  'b19b82e8-cbeb-4518-86f4-a6fbc9b3d884'
);
```

### Mullion Golf Club (England, 1 courses)

- DB: lat=50.0399734, lon=-5.2609538, addr="Cury, Helston", website=null, phone=null
- OSM (high, 192m, sim=1): name="Mullion Golf Course", website="https://www.mulliongolfclub.co.uk/", addr=null
- EG  (high, 192m, sim=1): name="Mullion Golf Club", addr="Cury, Helston", phone="01326240276"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 192m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.mulliongolfclub.co.uk/'
WHERE id IN (
  '0aba25ba-8f46-412f-b1fb-3531808316d6'
);
```

### Mytton Fold (England, 1 courses)

- DB: lat=53.8070951, lon=-2.4382252, addr="Whalley Road, Langho", website=null, phone=null
- OSM (high, 143m, sim=1): name="Mytton Fold Golf Club", website="https://www.mytton-golf.co.uk/", addr=null
- EG  (high, 143m, sim=1): name="Mytton Fold Golf Club", addr="Whalley Road, Langho, Blackburn", phone="01254245392"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 143m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.mytton-golf.co.uk/'
WHERE id IN (
  'b58cc8b2-9d33-4cd6-a8d4-9ca774a901db'
);
```

### Naunton Downs Golf Club (England, 1 courses)

- DB: lat=51.9056661, lon=-1.8376339, addr="Naunton, Cheltenham", website=null, phone=null
- OSM (high, 123m, sim=1): name="Naunton Downs Golf Club", website="https://www.nauntondowns.co.uk/", addr="GL54 3AE, Cheltenham"
- EG  (high, 123m, sim=1): name="Naunton Downs Golf Club", addr="Naunton, Cheltenham", phone="01451850090"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 123m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.nauntondowns.co.uk/'
WHERE id IN (
  '9f7ea360-4bc1-4327-b64a-5529fb4985de'
);
```

### Nazeing Golf Club (England, 1 courses)

- DB: lat=51.7312723, lon=0.0396855, addr="Middle Street, Nazeing", website=null, phone=null
- OSM (high, 242m, sim=1): name="Nazeing Golf Club", website="https://www.nazeinggolfclub.co.uk/", addr="Middle Street, EN9 2LW, Nazeing"
- EG  (high, 242m, sim=1): name="Nazeing Golf Club", addr="Middle Street, Nazeing", phone="01992893798"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 242m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.nazeinggolfclub.co.uk/'
WHERE id IN (
  '3dad5d52-6893-4d2f-a099-05f68c8147bb'
);
```

### Newton Green (England, 1 courses)

- DB: lat=52.0320957, lon=0.7882106, addr=" SUDBURY,  SUFFOLK", website=null, phone=null
- OSM (high, 26m, sim=1): name="Newton Green Golf Course", website="https://www.newtongreengolfclub.co.uk/", addr="Newton Green, CO10 0QN, Sudbury"
- EG  (high, 26m, sim=1): name="Newton Green Golf Club", addr="Newton, Sudbury", phone="01787377217"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 26m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.newtongreengolfclub.co.uk/'
WHERE id IN (
  '6d9b3aa6-ad17-4be0-ac86-e6fd8dd321a6'
);
```

### North Middlesex Golf Club (England, 1 courses)

- DB: lat=51.6223598, lon=-0.1680892, addr="Friern Barnet Lane, London", website=null, phone=null
- OSM (high, 76m, sim=1): name="North Middlesex Golf Club", website="https://www.northmiddlesexgc.co.uk/", addr="Friern Barnet Lane, N20 0NL, London"
- EG  (high, 76m, sim=1): name="North Middlesex Golf Club", addr="Friern Barnet Lane, London", phone="02084451604"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 76m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.northmiddlesexgc.co.uk/'
WHERE id IN (
  '505218b4-95d7-41b0-949a-c89128e6780c'
);
```

### Old Thorns Golf Club (England, 1 courses)

- DB: lat=51.0744351, lon=-0.8345085, addr="Griggs Green, Liphook", website=null, phone=null
- OSM (high, 174m, sim=1): name="Old Thorns", website="https://www.oldthorns.com/", addr=null
- EG  (high, 174m, sim=1): name="Old Thorns Hotel & Resort", addr="Griggs Lane, Liphook", phone="01428724555"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 174m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.oldthorns.com/'
WHERE id IN (
  '9ba61f14-9736-4b7f-814e-5fabc04771b5'
);
```

### Orchardleigh Golf Club (England, 1 courses)

- DB: lat=51.2609487, lon=-2.318117, addr="Orchardleigh, Frome", website=null, phone=null
- OSM (high, 70m, sim=1): name="Orchardleigh Golf Club", website="https://www.orchardleighgolf.co.uk/", addr=null
- EG  (high, 70m, sim=1): name="Orchardleigh Golf Club", addr="Orchardleigh Golf Club,, Frome", phone="01373454200"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 70m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.orchardleighgolf.co.uk/'
WHERE id IN (
  '5e9278a5-e4a3-4a1d-82b6-781b81e370bb'
);
```

### Ormonde Fields (England, 1 courses)

- DB: lat=53.0419886, lon=-1.3620401, addr="Nottingham Road, Derbyshire", website=null, phone=null
- OSM (high, 172m, sim=1): name="Ormonde Fields Golf Course", website="https://www.ormondefieldsgolfclub.co.uk/", addr=null
- EG  (high, 172m, sim=1): name="Ormonde Fields Golf Club", addr="Nottingham Road, Codnor", phone="01773570043"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 172m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.ormondefieldsgolfclub.co.uk/'
WHERE id IN (
  '47570642-4c90-4675-8524-d643c3109941'
);
```

### Ormskirk Golf Club (England, 1 courses)

- DB: lat=53.5739162, lon=-2.8439736, addr="Lathom Lane, Ormskirk", website=null, phone=null
- OSM (high, 204m, sim=1): name="Ormskirk Golf Club", website="https://www.ormskirkgolfclub.com/", addr=null
- EG  (high, 204m, sim=1): name="Ormskirk Golf Club", addr="Cranes Lane, Lathom, Ormskirk", phone="01695572112"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 204m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.ormskirkgolfclub.com/'
WHERE id IN (
  'a05d9860-7b22-403a-bad5-b259e568d109'
);
```

### Otley Golf (England, 1 courses)

- DB: lat=53.9002507, lon=-1.7272857, addr="West Busk Lane, Otley", website=null, phone=null
- OSM (high, 46m, sim=1): name="Otley Golf Club", website="https://www.otleygolfclub.co.uk/", addr="West Busk Lane, LS21 3NG, Otley"
- EG  (high, 46m, sim=1): name="Otley Golf Club", addr="West Busk Lane, Otley, Leeds", phone="01943465329"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 46m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.otleygolfclub.co.uk/'
WHERE id IN (
  'b4b7ba87-0408-460c-8bfe-6776bfb7bba5'
);
```

### Park Wood Golf Club (England, 1 courses)

- DB: lat=51.2886993, lon=0.033796, addr="Chestnut Avenue, Tatsfield", website=null, phone=null
- OSM (high, 184m, sim=1): name="Park Wood Golf Club", website="https://www.parkwoodgolf.co.uk/", addr="Chestnut Avenue, TN16 2EG, Tatsfield"
- EG  (high, 184m, sim=1): name="Park Wood Golf Club", addr="Chestnut Avenue, Tatsfield", phone="01959577744"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 184m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.parkwoodgolf.co.uk/'
WHERE id IN (
  '94979041-3b08-4447-8514-d685740089a3'
);
```

### Penrith Golf Club (England, 1 courses)

- DB: lat=54.6800548, lon=-2.7530007, addr="Salkeld Road, Penrith", website=null, phone=null
- OSM (high, 103m, sim=1): name="Penrith Golf Course", website="https://www.penrithgolf.org/", addr=null
- EG  (high, 103m, sim=1): name="Penrith Golf Club", addr="Salkeld Road, Penrith", phone="01768 891919"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 103m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.penrithgolf.org/'
WHERE id IN (
  'da2f2d64-1d57-49f2-b6e8-fbf5d9446a22'
);
```

### Pike Hills Golf Club (England, 1 courses)

- DB: lat=53.9227556, lon=-1.1394578, addr="Tadcaster Road,  Askham", website=null, phone=null
- OSM (high, 233m, sim=1): name="Pike Hills Golf Club", website="https://www.pikehillsgolfclub.co.uk/", addr="Tadcaster Road, YO23 3UW, York"
- EG  (high, 233m, sim=1): name="Pike Hills Golf Club", addr="Tadcaster Road, Askham Bryan, York", phone="01904 700797"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 233m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.pikehillsgolfclub.co.uk/'
WHERE id IN (
  'a0e9c79c-b484-403f-80dd-d4329cbe5054'
);
```

### Queens Park Golf Club (England, 1 courses)

- DB: lat=53.0956842, lon=-2.4735095, addr="Queens Park West Drive, Bournemouth", website=null, phone=null
- OSM (high, 129m, sim=1): name="Queens Park Golf Club", website="https://www.qpgc.net/", addr="CW2 7SN"
- EG  (high, 129m, sim=1): name="Queens Park Golf Club", addr="Queens Park Drive, Crewe", phone="01270666724"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 129m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.qpgc.net/'
WHERE id IN (
  'b00b53b7-6da1-41f0-8f8f-4c6030a16c63'
);
```

### Redbourn Golf Club (England, 2 courses)

- DB: lat=51.8138402, lon=-0.3924342, addr="Kinsbourne Green Lane, St Albans", website=null, phone=null
- OSM (high, 79m, sim=1): name="Redbourn Golf Club", website="https://www.redbourngolfclub.co.uk/", addr="Kinsbourne Green Lane, AL3 7QA, St Albans"
- EG  (high, 79m, sim=1): name="Redbourn Golf Club", addr="Kinsbourne Green Lane, Redbourne", phone="01582793493"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 79m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.redbourngolfclub.co.uk/'
WHERE id IN (
  'bd1b9e0e-3f49-411b-bdc6-d293926d7f28',
  'ccaace35-d3a8-40f5-a7b1-8e7efa1d2d0b'
);
```

### Regent Park Golf Club (England, 1 courses)

- DB: lat=53.5766436, lon=-2.5078243, addr="Links Road, Bolton", website=null, phone=null
- OSM (high, 200m, sim=1): name="Regent Park Golf Course", website="https://regentparkgolfcourse.co.uk/", addr=null
- EG  (high, 200m, sim=1): name="Regent Park Golf Club", addr="Links Road, Bolton", phone="01204495421"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 200m, sim=1)
```sql
UPDATE courses SET
  website = 'https://regentparkgolfcourse.co.uk/'
WHERE id IN (
  '5e3320c7-e006-474f-9474-8f02e5cfb62c'
);
```

### Reigate Heath Golf Club (England, 1 courses)

- DB: lat=51.2364647, lon=-0.2326818, addr="Flanchford Road, Reigate", website=null, phone=null
- OSM (high, 40m, sim=1): name="Reigate Heath", website="http://www.reigateheathgolfclub.co.uk/", addr="Flanchford Road, RH2 8QR, Reigate"
- EG  (high, 40m, sim=1): name="Reigate Heath Golf Club", addr="Flanchford Road, Reigate Heath", phone="01737242610"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 40m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.reigateheathgolfclub.co.uk/'
WHERE id IN (
  'a89c206c-4958-40a0-8c3d-d6151b221001'
);
```

### Remedy Oak Golf Course (England, 1 courses)

- DB: lat=50.8721254, lon=-1.9205293, addr="Horton Road, Wimborne", website=null, phone=null
- OSM (high, 90m, sim=1): name="Remedy Oak", website="https://www.remedyoak.com/", addr=null
- EG  (high, 90m, sim=1): name="Remedy Oak Golf Club", addr="Horton Road, Woodlands", phone="01202812070"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 90m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.remedyoak.com/'
WHERE id IN (
  'da677a74-1d99-4341-8b72-732b53eab79e'
);
```

### Romsey Golf Club (England, 1 courses)

- DB: lat=50.9548123, lon=-1.4676625, addr="Romsey Road, Southampton", website=null, phone=null
- OSM (high, 155m, sim=1): name="Romsey Golf Club", website="https://www.romseygolfclub.com", addr=null
- EG  (high, 155m, sim=1): name="Romsey Golf Club", addr="Romsey Road, Nursling, Southampton", phone="02380734637"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 155m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.romseygolfclub.com'
WHERE id IN (
  'f6ff937c-2601-446e-8916-a9e07e9b432c'
);
```

### Roseberry Grange Golf Club (England, 1 courses)

- DB: lat=54.8671685, lon=-1.6365891, addr="Grange Villa, Chester-le-Street", website=null, phone=null
- OSM (high, 176m, sim=1): name="Roseberry Grange Golf Club", website="https://roseberrygrange.com/", addr=null
- EG  (high, 176m, sim=1): name="Roseberry Grange Golf Club", addr="Grange Villa, Chester le Street", phone="01913700660"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 176m, sim=1)
```sql
UPDATE courses SET
  website = 'https://roseberrygrange.com/'
WHERE id IN (
  '31d05284-97d7-4507-bdb6-29f1e6866651'
);
```

### Royal Ascot Golf Club (England, 1 courses)

- DB: lat=51.4182352, lon=-0.6668561, addr="Winkfield Road, Ascot", website=null, phone=null
- OSM (high, 150m, sim=1): name="Royal Ascot Golf Club", website="https://www.royalascotgolfclub.co.uk/", addr=null
- EG  (high, 150m, sim=1): name="Royal Ascot Golf Club", addr="Winkfield Road, Ascot", phone="01344625175"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 150m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.royalascotgolfclub.co.uk/'
WHERE id IN (
  'f69a5555-6e11-459b-aa74-1e2ae065b989'
);
```

### Ruddington Grange GC (England, 1 courses)

- DB: lat=52.9042894, lon=-1.1489775, addr="Wilford Road, nottingham", website=null, phone=null
- OSM (high, 150m, sim=1): name="Ruddington Grange Golf Club", website="https://ruddingtongrange.com/", addr=null
- EG  (high, 150m, sim=1): name="Ruddington Grange Golf Club", addr="Wilford Road, Ruddington, Nottingham", phone="01159211951"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 150m, sim=1)
```sql
UPDATE courses SET
  website = 'https://ruddingtongrange.com/'
WHERE id IN (
  '7913f42b-0445-4fb4-8223-e2abb3225466'
);
```

### Rushden Golf Club (England, 1 courses)

- DB: lat=52.309441, lon=-0.5616653, addr="Kimbolton Road, Chelveston", website=null, phone=null
- OSM (high, 144m, sim=1): name="Rushden Golf Club", website="https://www.rushdengolfclub.org/", addr=null
- EG  (high, 144m, sim=1): name="Rushden Golf Club", addr="Kimbolton Road, Chelveston, Wellingborough", phone="01933418511"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 144m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.rushdengolfclub.org/'
WHERE id IN (
  '4474285d-a6d2-4059-984d-5cb87a60306f'
);
```

### Sand Moor (England, 1 courses)

- DB: lat=53.8640292, lon=-1.5409871, addr=" Alwoodley, Leeds, Yorkshire", website=null, phone=null
- OSM (high, 166m, sim=1): name="Sand Moor Golf Course", website="https://www.sandmoorgolf.co.uk/", addr=null
- EG  (high, 166m, sim=1): name="Sand Moor Golf Club", addr="Alwoodley Lane, Leeds", phone="01132685180"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 166m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.sandmoorgolf.co.uk/'
WHERE id IN (
  '4e7a146f-652f-4417-8ade-f329837e67de'
);
```

### Sandbach Golf club (England, 1 courses)

- DB: lat=53.147125, lon=-2.3771471, addr="117 Middlewich Rd, Cheshire", website=null, phone=null
- OSM (high, 152m, sim=1): name="Sandbach Golf Club", website="https://sandbachgolfclub.co.uk/", addr=null
- EG  (high, 152m, sim=1): name="Sandbach Golf Club", addr="117 Middlewich Road, Sandbach", phone="01270762117"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 152m, sim=1)
```sql
UPDATE courses SET
  website = 'https://sandbachgolfclub.co.uk/'
WHERE id IN (
  'b0975334-49b2-4849-8d34-d269569b470a'
);
```

### Scraptoft Golf Club (England, 1 courses)

- DB: lat=52.6523215, lon=-1.0382217, addr="Beeby Road, Leicester", website=null, phone=null
- OSM (high, 244m, sim=1): name="Scraptoft Golf Club", website="https://www.scraptoftgolfclub.co.uk/", addr="Beeby Road, LE7 9SJ, Scraptoft"
- EG  (high, 244m, sim=1): name="Scraptoft Golf Club", addr="Beeby Road, Leicester", phone="01162419000"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 244m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.scraptoftgolfclub.co.uk/'
WHERE id IN (
  'a64611cb-0c72-47e5-97ef-71bf630d990b'
);
```

### Seckford Golf Club (England, 1 courses)

- DB: lat=52.0879916, lon=1.285795, addr="Seckford Hall Road, Woodbridge", website=null, phone=null
- OSM (high, 84m, sim=1): name="Seckford Golf Club", website="http://www.seckfordgolf.co.uk/", addr="Seckford Hall Road, IP13 6NT"
- EG  (high, 84m, sim=1): name="Seckford Golf Club", addr="Seckford Hall Road, Great Bealings, Woodbridge", phone="01394388000"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 84m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.seckfordgolf.co.uk/'
WHERE id IN (
  '59b918a3-b3e5-4a9b-88b4-25feecc2dc6d'
);
```

### Sherdons Golf Centre (England, 1 courses)

- DB: lat=51.9692474, lon=-2.1332125, addr="Tredington, Tewkesbury", website=null, phone=null
- OSM (high, 136m, sim=1): name="Sherdons Golf Centre", website="https://www.sherdons.co.uk/", addr="GL20 7BP"
- EG  (high, 136m, sim=1): name="Sherdons Golf Centre", addr="Tredington, Nr Tewkesbury", phone="01684274782"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 136m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.sherdons.co.uk/'
WHERE id IN (
  '9b171b8c-dce1-4b05-ac81-e80989a3dec5'
);
```

### Shifnal (England, 2 courses)

- DB: lat=52.6838652, lon=-2.3697463, addr="Decker Hill, Shifnal", website=null, phone=null
- OSM (high, 82m, sim=1): name="Shifnal Golf Club", website="https://www.shifnalgolfclub.com/", addr=null
- EG  (high, 82m, sim=1): name="Shifnal Golf Club", addr="Decker Hill, Shifnal", phone="01952460330"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 82m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.shifnalgolfclub.com/'
WHERE id IN (
  '2af4f72f-05b6-490a-a6b1-5e229a8a125c',
  'cb4d75b1-655b-4b2b-ab2b-57a8c7e3b441'
);
```

### Sidcup Golf Club (England, 1 courses)

- DB: lat=51.4397924, lon=0.1110451, addr=" Hurst Road, Sidcup", website=null, phone=null
- OSM (high, 145m, sim=1): name="Sidcup Golf Club", website="https://www.sidcupgolfclub.co.uk/", addr="Hurst Road, DA15 9AW, Sidcup"
- EG  (high, 145m, sim=1): name="Sidcup Golf Club", addr="Hurst Road, Sidcup", phone="02083002150"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 145m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.sidcupgolfclub.co.uk/'
WHERE id IN (
  'bddb4a80-5452-48eb-b994-6482eb0859a0'
);
```

### South Moor Golf Club (England, 1 courses)

- DB: lat=54.8539648, lon=-1.6896789, addr="The Middles, Stanley", website=null, phone=null
- OSM (high, 122m, sim=1): name="South Moor Golf Club", website="https://www.southmoorgc.co.uk/", addr=null
- EG  (high, 122m, sim=1): name="South Moor Golf Club", addr="The Middles, Craghead, Stanley", phone="01207232848"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 122m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.southmoorgc.co.uk/'
WHERE id IN (
  '7c6b2bd3-11c5-4dd7-b220-38f080121e52'
);
```

### Southmoor (England, 1 courses)

- DB: lat=54.8539648, lon=-1.6896789, addr="The Middles, Craghead, Southmoor", website=null, phone=null
- OSM (high, 122m, sim=0.9): name="South Moor Golf Club", website="https://www.southmoorgc.co.uk/", addr=null
- EG  (high, 122m, sim=0.9): name="South Moor Golf Club", addr="The Middles, Craghead, Stanley", phone="01207232848"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 122m, sim=0.9)
```sql
UPDATE courses SET
  website = 'https://www.southmoorgc.co.uk/'
WHERE id IN (
  '75269f81-e782-463d-9508-ab52e844ea74'
);
```

### St Ives Golf Club (England, 1 courses)

- DB: lat=52.3393631, lon=-0.0446051, addr="Needingworth Road, St. Ives", website=null, phone=null
- OSM (high, 193m, sim=1): name="St Ives Golf Club", website="https://www.stivesgolfclub.co.uk/", addr="Needingworth Road, PE27 4NB, St Ives"
- EG  (high, 193m, sim=1): name="St Ives Golf Club", addr="St Ives (Hunts) Golf Club, Needingworth Road, St. Ives", phone="01480499920"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 193m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.stivesgolfclub.co.uk/'
WHERE id IN (
  '4ffe04d6-5ae9-48b6-a627-263750fbf3f2'
);
```

### stoneleigh deer park (England, 2 courses)

- DB: lat=52.3477982, lon=-1.5018388, addr="Coventry Road, Stoneleigh", website=null, phone=null
- OSM (high, 225m, sim=1): name="Stoneleigh Deer Park Golf Club", website="https://www.stoneleighdeerparkgolfclub.com/", addr="Coventry Road, CV8 3DR, Stoneleigh"
- EG  (high, 225m, sim=1): name="Stoneleigh Deer Park Golf Club", addr="The Old Deer Park, Coventry Road, Stoneleigh", phone="02476639991"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 225m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.stoneleighdeerparkgolfclub.com/'
WHERE id IN (
  '08aac7f5-8e37-4293-8063-65365ec55242',
  'b3c72671-2aeb-4624-b903-646ea62b1dbe'
);
```

### Stover Golf Club (England, 1 courses)

- DB: lat=50.5577684, lon=-3.6510551, addr="Bovey Tracey Road, Newton Abbot", website=null, phone=null
- OSM (high, 200m, sim=1): name="Stover Golf Club", website="https://www.stovergolfclub.co.uk/", addr="Bovey Road, TQ12 6QQ, Newton Abbot"
- EG  (high, 200m, sim=1): name="Stover Golf Club", addr="Bovey Road, Newton Abbot", phone="01626352460"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 200m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.stovergolfclub.co.uk/'
WHERE id IN (
  '6a145ebe-f7b9-4556-92b0-662906810539'
);
```

### Surrey National Golf Club (England, 1 courses)

- DB: lat=51.2862962, lon=-0.1092373, addr="Rook Lane, Chaldon", website=null, phone=null
- OSM (high, 58m, sim=1): name="Surrey National Golf Club", website="https://www.surreynational.co.uk/", addr="Rook Lane, CR3 5AA, Caterham"
- EG  (high, 58m, sim=1): name="Surrey National Golf Club", addr="Rook Lane, Chaldon, Caterham", phone="01883344555"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 58m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.surreynational.co.uk/'
WHERE id IN (
  '02851afa-41da-400d-8a03-ca826ef9db7f'
);
```

### Sutton Bridge Golf Club (England, 1 courses)

- DB: lat=52.7753613, lon=0.1950672, addr="92 New Road, Sutton Bridge", website=null, phone=null
- OSM (high, 109m, sim=1): name="Sutton Bridge Golf Club", website="http://www.club-noticeboard.co.uk/suttonbridge/", addr="New Road, PE12 9RQ, Spalding"
- EG  (high, 109m, sim=1): name="Sutton Bridge Golf Club", addr="New Road, Sutton Bridge, Spalding", phone="01406350323"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 109m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.club-noticeboard.co.uk/suttonbridge/'
WHERE id IN (
  'f06a7325-a239-4a86-bf73-e3c232349e9b'
);
```

### Swallow Hall Golf Club (England, 2 courses)

- DB: lat=53.9067934, lon=-1.0017919, addr="Crockey Hill, York", website=null, phone=null
- OSM (high, 117m, sim=1): name="Swallow Hall Golf Course", website="https://www.swallowhall.com/", addr="Wheldrake Lane, YO19 4SG, Crockey Hill"
- EG  (high, 117m, sim=1): name="Swallow Hall Golf Club", addr="Crockey Hill, York", phone="01904448889"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 117m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.swallowhall.com/'
WHERE id IN (
  '74bcd48c-de11-4a7f-a7b8-f538467be71e',
  '7990deca-369b-4cbc-a1b0-f2851c822a25'
);
```

### Tadcaster Golf Club (England, 1 courses)

- DB: lat=53.8300538, lon=-1.2544871, addr="Tadcaster, Tadcaster", website=null, phone=null
- OSM (high, 142m, sim=1): name="Tadcaster Golf Course", website="https://www.tadcastergolf.co.uk", addr=null
- EG  (high, 142m, sim=1): name="Tadcaster Golf Club", addr="Scarthingwell Lane, Tadcaster", phone="01937557878"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 142m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.tadcastergolf.co.uk'
WHERE id IN (
  'f997c8b8-ed53-4319-b0ba-6ce292f6f0bb'
);
```

### Taunton & Pickeridge Golf Club (England, 1 courses)

- DB: lat=50.9639373, lon=-3.0829969, addr="Corfe, Taunton", website=null, phone=null
- OSM (high, 144m, sim=1): name="Taunton & Pickeridge Golf Club", website="https://tauntongolf.co.uk", addr="TA3 7BY, Taunton"
- EG  (high, 144m, sim=1): name="Taunton & Pickeridge Golf Club", addr="Corfe, Taunton", phone="01823421537"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 144m, sim=1)
```sql
UPDATE courses SET
  website = 'https://tauntongolf.co.uk'
WHERE id IN (
  'cb92acc2-17b6-49d9-b56a-6a52a264b4d5'
);
```

### Tee Time Golf Centre (England, 1 courses)

- DB: lat=53.8620037, lon=-3.0342363, addr="Fleetwood Road, Thornton-Cleveleys", website=null, phone=null
- OSM (high, 84m, sim=1): name="Tee Time Golf Centre", website="https://teetimegolfcentre.com/", addr="Fleetwood Road, FY5 1RN, Thornton-Cleveleys"
- EG  (high, 84m, sim=1): name="Tee Time Golf Centre", addr="Fleetwood Road, Thornton-Cleveleys, Lancashire, FY5 1RN", phone="07917167432"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 84m, sim=1)
```sql
UPDATE courses SET
  website = 'https://teetimegolfcentre.com/'
WHERE id IN (
  'f5dc69aa-d6e8-4afa-a7f7-2e752bbdd1d9'
);
```

### The Addington Golf Club (England, 1 courses)

- DB: lat=51.3644677, lon=-0.0384406, addr="205 Shirley Church Road, Croydon", website=null, phone=null
- OSM (high, 51m, sim=1): name="The Addington Golf Club", website="https://addingtongolf.com/", addr=null
- EG  (high, 51m, sim=1): name="The Addington Golf Club", addr="205 Shirley Church Road, Croydon", phone="02087771055"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 51m, sim=1)
```sql
UPDATE courses SET
  website = 'https://addingtongolf.com/'
WHERE id IN (
  'd6fbf615-413e-41c2-9e32-df36b5c766b8'
);
```

### The Hertfordshire Golf Club (England, 1 courses)

- DB: lat=51.7457251, lon=-0.0412615, addr="White Stubbs Lane, Broxbourne", website=null, phone=null
- OSM (high, 141m, sim=1): name="The Hertfordshire Golf & Country Club", website="http://www.thehertfordshiregolf.co.uk/", addr="White Stubbs Lane, EN10 7PY, Broxbourne, Hertfordshire"
- EG  (high, 141m, sim=1): name="Hertfordshire Golf Club", addr=null, phone="07801 187317"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 141m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.thehertfordshiregolf.co.uk/'
WHERE id IN (
  '0d5cdb85-8a38-4ba2-a911-64d88612cd51'
);
```

### The Hertsmere (England, 1 courses)

- DB: lat=51.6579733, lon=-0.296179, addr="Watling Street, London", website=null, phone=null
- OSM (high, 124m, sim=1): name="The Hertsmere", website="https://www.thehertsmere.co.uk/", addr=null
- EG  (high, 124m, sim=1): name="The Hertsmere", addr="Medburn Lane, Watling Street, Elstree, Hertfordshire", phone="02045585544"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 124m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.thehertsmere.co.uk/'
WHERE id IN (
  '4db952f3-17af-4ca4-8408-1d631d038926'
);
```

### The Manor House (England, 1 courses)

- DB: lat=51.499347, lon=-2.2327607, addr="West Street, Chippenham", website=null, phone=null
- OSM (high, 220m, sim=1): name="The Manor House Golf Club", website="http://www.manorhousegolf.co.uk/", addr="SN14 7JW, Castle Combe"
- EG  (high, 220m, sim=1): name="The Manor House Golf Club", addr="Castle Combe, Chippenham", phone="01249782206"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 220m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.manorhousegolf.co.uk/'
WHERE id IN (
  'a26c7307-38c1-44c3-86dd-0db39d851d35'
);
```

### The Millbrook Golf Club (England, 1 courses)

- DB: lat=52.0337958, lon=-0.533228, addr="Millbrook, Millbrook", website=null, phone=null
- OSM (high, 138m, sim=1): name="The Millbrook Golf Club", website="https://www.themillbrook.com/", addr="Sandhill Close, MK45 2JB, Millbrook"
- EG  (high, 138m, sim=1): name="The Millbrook Golf Club", addr="Millbrook, Ampthill, Bedford", phone="01525840252"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 138m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.themillbrook.com/'
WHERE id IN (
  'aaeaea77-4eed-4bcb-82a3-192779da8c94'
);
```

### The Players Club (England, 4 courses)

- DB: lat=51.5126214, lon=-2.3771665, addr="Wapley Road, Codrington", website=null, phone=null
- OSM (high, 98m, sim=1): name="The Players Club", website="https://www.theplayersgolfclub.com/", addr=null
- EG  (high, 98m, sim=1): name="The Players Golf Club", addr="Codrington, Bristol", phone="01454313029"

**Proposed UPDATE** (applied to all 4 course rows for this club, overall=high):
  - website: from osm(high, 98m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.theplayersgolfclub.com/'
WHERE id IN (
  'be14553d-3564-4db6-a78c-def66dd90372',
  'c5f472db-e4d4-427a-9ab3-840f67d76405',
  'dd03ecb3-459d-44b3-8e68-8607c0703ec4',
  'de1b87b5-79cc-4a44-bd19-edeab948d471'
);
```

### The Ridge Golf Club (England, 1 courses)

- DB: lat=51.2201613, lon=0.6152864, addr="Chartway Street, Sutton Valence", website=null, phone=null
- OSM (high, 200m, sim=1): name="The Ridge Golf Club", website="https://www.theridgegolfclub.co.uk/", addr="Chartway Street, ME17 3JB, Sutton Valence"
- EG  (high, 200m, sim=1): name="The Ridge Golf Club", addr="Chartway Street, South Valence, Maidstone", phone="01622391000"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 200m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.theridgegolfclub.co.uk/'
WHERE id IN (
  '1af4d152-5acd-4731-a82c-7aa87f8e65f2'
);
```

### The Wisley (England, 9 courses)

- DB: lat=51.3191599, lon=-0.4819114, addr="Mill Lane, Woking", website=null, phone=null
- OSM (high, 31m, sim=1): name="The Wisley", website="https://www.thewisley.com", addr="GU23 6QU, Ripley"
- EG  (high, 31m, sim=1): name="The Wisley", addr="Mill Lane, Ripley, Woking", phone="01483211022"

**Proposed UPDATE** (applied to all 9 course rows for this club, overall=high):
  - website: from osm(high, 31m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.thewisley.com'
WHERE id IN (
  '00e3b53b-40ae-4a8b-9a20-e58c4e9d3dc1',
  '1ff229e3-798c-4fc3-aa17-2e38e0d656da',
  '2744197d-0d21-4a78-be44-7b3e0c73b383',
  '52bd9343-f57b-4185-9882-c5322dbc8d94',
  '8518c257-4292-4cb5-aff0-ba1958351c71',
  '9b76d45a-cd6b-466c-89c3-2708e47148e0',
  'b7217408-125c-44a1-a09f-d40a57b71ead',
  'cb12acc8-8609-4a1d-bdc2-71567a9a168c',
  'f3314d0e-a6f7-4da6-870b-5880641a4f4d'
);
```

### The Wychwood Golf Club (England, 1 courses)

- DB: lat=51.8844104, lon=-1.6029788, addr="Lyneham, Lyneham", website=null, phone=null
- OSM (high, 216m, sim=1): name="The Wychwood Golf Club", website="https://www.thewychwood.com/", addr="OX7 6QQ"
- EG  (high, 216m, sim=1): name="The Wychwood Golf Club", addr="Lyneham, Chipping Norton", phone="01993831841"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 216m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.thewychwood.com/'
WHERE id IN (
  'd76a42a6-e521-4af6-b458-e3b73f0ba66b'
);
```

### Thetford Golf Club (England, 1 courses)

- DB: lat=52.4190024, lon=0.7133696, addr="Brandon Road, Thetford", website=null, phone=null
- OSM (high, 51m, sim=1): name="Thetford Golf Club", website="https://www.thetfordgolfclub.co.uk/", addr="Brandon Road, IP24 3NE, Thetford"
- EG  (high, 51m, sim=1): name="Thetford Golf Club", addr="Brandon Road, Thetford", phone="01842752169"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 51m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.thetfordgolfclub.co.uk/'
WHERE id IN (
  'a2ab0022-9570-47ef-95a4-6c357fb48c8a'
);
```

### Treloy Golf Club (England, 1 courses)

- DB: lat=50.4246999, lon=-5.0175213, addr="Rialton Road, Newquay", website=null, phone=null
- OSM (high, 60m, sim=1): name="Treloy Golf Club", website="https://www.treloygolfclub.co.uk/", addr=null
- EG  (high, 60m, sim=1): name="Treloy Golf Club", addr="Treloy Golf Club, Newquay", phone="01637878554"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 60m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.treloygolfclub.co.uk/'
WHERE id IN (
  '69fe2dfb-a534-4c9f-bb74-85d9b0e99914'
);
```

### Ulverston (England, 1 courses)

- DB: lat=54.1685921, lon=-3.076304, addr="Bardsea Park, Ulverston", website=null, phone=null
- OSM (high, 188m, sim=1): name="Ulverston Golf Club", website="https://www.ulverstongolf.co.uk/", addr="LA12 9QJ, Ulverston"
- EG  (high, 188m, sim=1): name="Ulverston Golf Club", addr="Bardsea Park, Ulverston", phone="01229582824"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 188m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.ulverstongolf.co.uk/'
WHERE id IN (
  'b0ecaeb6-2c2a-4876-80a0-79ac8a170332'
);
```

### Walhampton Golf Club (England, 1 courses)

- DB: lat=50.762215, lon=-1.5263707, addr="Lisle Court Road, Lymington", website=null, phone=null
- OSM (high, 138m, sim=1): name="Walhampton Golf Club", website="http://www.walhamptongolf.org.uk/", addr="Lisle Court Road, SO41 5SH, Lymington"
- EG  (high, 138m, sim=1): name="Walhampton Golf Club", addr="South Baddesley Road, Lymington", phone="01590689631"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 138m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.walhamptongolf.org.uk/'
WHERE id IN (
  'e0082307-0bef-4fa9-957b-e70d2e3c1019'
);
```

### Weald of Kent Golf Course & Hotel (England, 2 courses)

- DB: lat=51.1897947, lon=0.6075015, addr="Maidstone Road, Ashford", website=null, phone=null
- OSM (high, 193m, sim=1): name="The Weald of Kent Golf Course", website="https://www.weald-of-kent.co.uk/", addr="Maidstone Road, TN27 9PT, Headcorn"
- EG  (high, 193m, sim=1): name="Weald Of Kent Golf Club", addr="Maidstone Road, Headcorn", phone="01622890866"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 193m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.weald-of-kent.co.uk/'
WHERE id IN (
  '7099fd34-501b-494f-a3cf-d10550142e7d',
  'ae89de4a-5c19-4e23-99de-42bcb7f0a11f'
);
```

### Wearside Golf Club (England, 1 courses)

- DB: lat=54.8940468, lon=-1.4770818, addr="Coxgreen, Sunderland", website=null, phone=null
- OSM (high, 198m, sim=1): name="Wearside Golf Club", website="http://www.wearsidegolfclub.co.uk/", addr="Coxgreen, SR4 9JT, Sunderland"
- EG  (high, 198m, sim=1): name="Wearside Golf Club", addr="Coxgreen, Sunderland", phone="01915342518"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 198m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.wearsidegolfclub.co.uk/'
WHERE id IN (
  '4367ed6c-c35d-4f34-9415-d4f68501592e'
);
```

### Wellington College Golf Club (England, 1 courses)

- DB: lat=51.3596035, lon=-0.8099525, addr="Duke's Ride, Crowthorne", website=null, phone=null
- OSM (high, 110m, sim=1): name="Wellington College Golf Course", website="https://www.wellingtoncollege.org.uk/2303/school-life/sports/golf", addr=null
- EG  (high, 110m, sim=1): name="Wellington College Golf Club", addr="Wellington College, Crowthorne", phone="01344444145"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 110m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.wellingtoncollege.org.uk/2303/school-life/sports/golf'
WHERE id IN (
  '8b5d60bc-7564-4f84-b8f4-b6e05e9b4ede'
);
```

### Wergs Golf Club (England, 1 courses)

- DB: lat=52.609767, lon=-2.1849303, addr="Keepers Lane, Wolverhampton", website=null, phone=null
- OSM (high, 217m, sim=1): name="Wergs Golf Club", website="https://www.wergsgolfclub.com/", addr="Keepers Lane, WV6 8UA, Tettenhall"
- EG  (high, 217m, sim=1): name="Wergs Golf Club", addr="Wergs Golf Club, Keepers Lane, Tettenhall, Wolverhampton", phone="01902742225"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 217m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.wergsgolfclub.com/'
WHERE id IN (
  'ffddad8c-8fb9-460a-b460-519b3d26f907'
);
```

### Werneth Golf Club (England, 1 courses)

- DB: lat=53.5185882, lon=-2.1173991, addr="122 Green Lane, Oldham", website=null, phone=null
- OSM (high, 148m, sim=1): name="Werneth Golf Course", website="https://www.wernethgolfclub.co.uk/", addr=null
- EG  (high, 148m, sim=1): name="Werneth Golf Club", addr="Green Lane, Oldham", phone="01616241190"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 148m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.wernethgolfclub.co.uk/'
WHERE id IN (
  '00652018-3b79-4698-b1b6-c20e3e93317c'
);
```

### West Bradford Golf Club (England, 1 courses)

- DB: lat=53.8120704, lon=-1.8189134, addr="Chellow Grange Road Off, Bradford", website=null, phone=null
- OSM (high, 140m, sim=1): name="West Bradford Golf Course", website="https://westbradfordgolfclub.co.uk/", addr="Chellow Grange Road, BD9 6NP, Bradford"
- EG  (high, 140m, sim=1): name="West Bradford Golf Club", addr="Chellow Grange Road, Bradford", phone="01274542767"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 140m, sim=1)
```sql
UPDATE courses SET
  website = 'https://westbradfordgolfclub.co.uk/'
WHERE id IN (
  '39baad66-23c3-4687-bdd0-4c6f0eebe65a'
);
```

### West Essex Golf Club (England, 1 courses)

- DB: lat=51.65052, lon=0.0124721, addr="Bury Road, Chingford", website=null, phone=null
- OSM (high, 70m, sim=1): name="West Essex Golf Club", website="https://www.westessexgolfclub.co.uk/", addr="Bury Road, E4 7QL, London"
- EG  (high, 70m, sim=1): name="West Essex Golf Club", addr="Bury Road, Chingford", phone="02085297558"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 70m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.westessexgolfclub.co.uk/'
WHERE id IN (
  '54917813-6dad-4abf-b0d8-ec8b8c6e7cc2'
);
```

### West London Golf Centre (England, 1 courses)

- DB: lat=51.5432809, lon=-0.3941402, addr="Ruislip Road, London", website=null, phone=null
- OSM (high, 185m, sim=1): name="West London Golf Centre", website="http://westlondongolfcentre.com/", addr="Ruislip Road, UB5 6QZ, Northolt"
- EG  (high, 185m, sim=1): name="West London Golf Centre", addr="Ruislip Road, Northolt", phone="02088455350"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 185m, sim=1)
```sql
UPDATE courses SET
  website = 'http://westlondongolfcentre.com/'
WHERE id IN (
  '62c0d88b-8256-4165-b31f-88a1b13fef01'
);
```

### West Malling Golf Club (England, 2 courses)

- DB: lat=51.3026177, lon=0.3681758, addr="Trottiscliffe Road, Addington", website=null, phone=null
- OSM (high, 131m, sim=1): name="West Malling Golf Course", website="https://www.westmallinggolf.com/", addr="Trottiscliffe Road, ME19 5AR, Addington"
- EG  (high, 131m, sim=1): name="West Malling Golf Club", addr="Trottiscliffe Road, Addington, West Malling", phone="01732844785"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 131m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.westmallinggolf.com/'
WHERE id IN (
  '1d47c881-c44b-42cc-ba44-95a44b55fcae',
  'a99bd7c4-08f6-4873-bba2-86bf243bb59c'
);
```

### Weston Turville Golf Club (England, 1 courses)

- DB: lat=51.7978654, lon=-0.7653072, addr="New Road, Weston Turville", website=null, phone=null
- OSM (high, 162m, sim=1): name="Weston Turville  Golf Club", website="https://www.westonturvillegc.co.uk/", addr="New Road, HP22 5QT, Aylesbury"
- EG  (high, 162m, sim=1): name="Weston Turville Golf Club", addr="New Road, Weston Turville, Aylesbury", phone="01296424084"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 162m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.westonturvillegc.co.uk/'
WHERE id IN (
  '197c057d-4c75-4328-bb66-eef975e28e98'
);
```

### Westridge Golf Centre (England, 1 courses)

- DB: lat=50.7089943, lon=-1.141283, addr="Brading Road, Ryde", website=null, phone=null
- OSM (high, 90m, sim=1): name="Westridge Golf Centre", website="https://www.westridgegolfcentre.com/", addr=null
- EG  (high, 90m, sim=1): name="Westridge Golf Centre", addr="Brading Road, Ryde", phone="01983613131"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 90m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.westridgegolfcentre.com/'
WHERE id IN (
  '68894674-2d14-4678-bf65-1ae260912df6'
);
```

### Whitby Golf Club (England, 1 courses)

- DB: lat=54.4927471, lon=-0.6465682, addr="Sandsend Road, Whitby", website=null, phone=null
- OSM (high, 219m, sim=1): name="Whitby Golf Club", website="https://www.whitbygolfclub.co.uk/", addr="Sandsend Road, YO21 3SR, Whitby"
- EG  (high, 219m, sim=1): name="Whitby Golf Club", addr="Low Straggleton, Sandsend Road, Whitby", phone="01947600660"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 219m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.whitbygolfclub.co.uk/'
WHERE id IN (
  '5f447b5a-20ab-4b53-a7bb-39818b4d19ce'
);
```

### Whitehaven Golf Club (England, 1 courses)

- DB: lat=54.5513907, lon=-3.5587293, addr="Red Lonning, Whitehaven", website=null, phone=null
- OSM (high, 104m, sim=1): name="Whitehaven Golf Club", website="https://www.whitehavengolfclub.com/", addr=null
- EG  (high, 104m, sim=1): name="Whitehaven Golf Club", addr="Red Lonning, Whitehaven", phone="01946591144"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 104m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.whitehavengolfclub.com/'
WHERE id IN (
  'dd4e8a74-bdd3-4428-ad20-e26898209251'
);
```

### Whittington Heath (England, 1 courses)

- DB: lat=52.6636941, lon=-1.7811096, addr="Common Lane, Whittington", website=null, phone=null
- OSM (high, 213m, sim=1): name="Whittington Heath Golf Club", website="https://www.whittingtonheathgc.co.uk/", addr="Tamworth Road, WS14 9PW, Lichfield"
- EG  (high, 213m, sim=1): name="Whittington Heath Golf Club", addr="Tamworth Road, Lichfield", phone="01543432317"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 213m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.whittingtonheathgc.co.uk/'
WHERE id IN (
  '24d0af25-e2de-4899-8794-2b94a16df4c9'
);
```

### Wickham Park Golf Club (England, 1 courses)

- DB: lat=50.898987, lon=-1.2001256, addr="Titchfield Lane, Fareham", website=null, phone=null
- OSM (high, 241m, sim=1): name="Wickham Park Golf Course", website="https://www.wickhamparkgolf.co.uk/", addr=null
- EG  (high, 241m, sim=1): name="Wickham Park Golf Club", addr="Titchfield Lane, Wickham, Fareham", phone="01329833342"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 241m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.wickhamparkgolf.co.uk/'
WHERE id IN (
  '084e95a1-9dd4-4aca-9a51-920d38636260'
);
```

### Wilpshire Golf Club (England, 1 courses)

- DB: lat=53.789025, lon=-2.4707836, addr="72 Whalley Road, blackburn", website=null, phone=null
- OSM (high, 217m, sim=1): name="Wilpshire Golf Course", website="https://www.wilpshiregolfclub.co.uk/", addr=null
- EG  (high, 217m, sim=1): name="Wilpshire Golf Club", addr="Whalley Road, Wilpshire, Blackburn", phone="01254248260"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 217m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.wilpshiregolfclub.co.uk/'
WHERE id IN (
  'ff36c3ab-5ee5-41dc-b760-5f29067f7861'
);
```

### Witney Lakes Resort (England, 1 courses)

- DB: lat=51.7860918, lon=-1.5334468, addr="Downs Road, Witney", website=null, phone=null
- OSM (high, 148m, sim=1): name="Witney Lakes Resort", website="http://www.witney-lakes.co.uk/golf.php", addr="Downs Road, OX29 0SY, Witney"
- EG  (high, 148m, sim=1): name="Witney Lakes Resort", addr="Downs Road, Witney", phone="01993 893000"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 148m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.witney-lakes.co.uk/golf.php'
WHERE id IN (
  '80bc5d98-08bc-48fb-841d-2bc8f6c75d33'
);
```

### Wollaton Park Golf Club (England, 1 courses)

- DB: lat=52.9460498, lon=-1.2004719, addr="Lime Tree Avenue, Nottingham", website=null, phone=null
- OSM (high, 213m, sim=1): name="Wollaton Park Golf Club", website="https://www.wollatonparkgolfclub.com/", addr=null
- EG  (high, 213m, sim=1): name="Wollaton Park Golf Club", addr="Lime Tree Avenue, Wollaton Park, Nottingham", phone="01159787574"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 213m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.wollatonparkgolfclub.com/'
WHERE id IN (
  '5bbf7b24-66f0-4235-9532-f156b59f1a10'
);
```

### Wrag Barn Golf  Country Club (England, 1 courses)

- DB: lat=51.6185881, lon=-1.7051852, addr="Shrivenham Road, Highworth ", website=null, phone=null
- OSM (high, 158m, sim=1): name="Wrag Barn Golf & Country Club", website="https://www.wragbarn.com/", addr="Shrivenham Road, SN6 7QQ, Swindon"
- EG  (high, 158m, sim=1): name="Wrag Barn Golf Club", addr="Shrivenham Road, Highworth, Swindon", phone="01793861327"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=high):
  - website: from osm(high, 158m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.wragbarn.com/'
WHERE id IN (
  '99f83dca-2bef-4405-bc7c-07b16920f71c'
);
```

### Wycombe Heights Golf Center (England, 2 courses)

- DB: lat=51.6185134, lon=-0.6961804, addr="Rayners Avenue, Loudwater", website=null, phone=null
- OSM (high, 94m, sim=0.909): name="Wycombe Heights Golf Centre", website="https://www.wycombeheightsgc.co.uk", addr=null
- EG  (high, 94m, sim=0.909): name="Wycombe Heights Golf Centre", addr="Rayners Avenue, Loudwater, High Wycombe", phone="01494816686"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 94m, sim=0.909)
```sql
UPDATE courses SET
  website = 'https://www.wycombeheightsgc.co.uk'
WHERE id IN (
  '3f6cb584-891d-4c13-b89d-b319d0adc162',
  'b9ae9ab0-fa0b-42b5-98b7-9066789fd81c'
);
```

### Yeovil Golf Club (England, 2 courses)

- DB: lat=50.9395765, lon=-2.6078371, addr="Sherborne Road, Yeovil", website=null, phone=null
- OSM (high, 106m, sim=1): name="Yeovil Golf Club", website="https://www.yeovilgolfclub.com/", addr="Sherborne Road, BA21 5BW, Yeovil"
- EG  (high, 106m, sim=1): name="Yeovil Golf Club", addr="Sherborne Road, Yeovil", phone="01935422965"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=high):
  - website: from osm(high, 106m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.yeovilgolfclub.com/'
WHERE id IN (
  '3938707d-b940-4ba3-adfb-bd927561a2df',
  'b0dd8660-2b47-4425-9997-a14c1d6318e4'
);
```

## Medium confidence (review before applying)

### Abbey Hill Golf Centre (England, 2 courses)

- DB: lat=52.0463216, lon=-0.8056178, addr="Monks Way, Two Mile Ash, Milton Keynes", website=null, phone=null
- OSM (medium, 479m, sim=1): name="Abbey Hill Golf Centre", website="https://abbeyhillgc.co.uk/", addr="Monks Way, MK8 8AA, Milton Keynes"
- EG  (low, 420m, sim=0.588): name="Abbey Hill Golf Club", addr="Monks Way, Two Mile Ash, Milton Keynes", phone="01908562566"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 479m, sim=1)
```sql
UPDATE courses SET
  website = 'https://abbeyhillgc.co.uk/'
WHERE id IN (
  '1f746f44-6d37-4900-8c41-b7a98c58d4fd',
  '5bcc5489-4434-4e33-b3c7-a67432bf4853'
);
```

### Alston Moor Golf Club (England, 1 courses)

- DB: lat=54.7892985, lon=-2.4259784, addr="Middleton in Teesdale Rd, Alston", website=null, phone=null
- OSM (medium, 374m, sim=1): name="Alston Moor Golf Course", website="https://alstonmoorgolfclub.org.uk/", addr=null
- EG  (high, 12m, sim=1): name="Alston Moor Golf Club", addr="The Hermitage, Middleton Road, Alston", phone="01434 381675"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 374m, sim=1)
```sql
UPDATE courses SET
  website = 'https://alstonmoorgolfclub.org.uk/'
WHERE id IN (
  'c85c5822-7761-4bcc-888e-0610026a5b09'
);
```

### Arkley Golf Club (England, 1 courses)

- DB: lat=51.647394, lon=-0.2355757, addr="Rowley Green Road, Arkley", website=null, phone=null
- OSM (medium, 420m, sim=1): name="Arkley Golf Club", website="https://www.arkleygolfclub.co.uk/", addr=null
- EG  (high, 210m, sim=1): name="Arkley Golf Club", addr="Rowley Green Road, Arkley", phone="02084490394"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 420m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.arkleygolfclub.co.uk/'
WHERE id IN (
  '366bcf59-9d61-49d0-91c8-57d48f995cb2'
);
```

### Ashton Golf Centre (England, 1 courses)

- DB: lat=54.0088522, lon=-2.822626, addr="Ashton with stodday, Ashton With Stodday", website=null, phone=null
- OSM (medium, 352m, sim=1): name="Ashton Golf Centre", website="https://www.facebook.com/AshtonGolfCentre", addr="Ashton With Stodday, LA2 0AJ, Lancaster"
- EG  (low, 57m, sim=0.231): name="Lancaster Golf Club", addr="Ashton Hall, Ashton-With-Stodday, Lancaster", phone="01524751247"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 352m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.facebook.com/AshtonGolfCentre'
WHERE id IN (
  '4ff1137f-bcd5-4bcc-ac8d-c998ed6e2c11'
);
```

### Aspley Guise & Woburn Sands Golf Club (England, 1 courses)

- DB: lat=52.0121779, lon=-0.6380031, addr="West Hill, Aspley Guise", website=null, phone=null
- OSM (medium, 493m, sim=1): name="Aspley Guise & Woburn Sands Golf Club", website="https://www.aspleyguisegolfclub.co.uk/", addr="West Hill, MK17 8DX, Aspley Guise"
- EG  (high, 128m, sim=1): name="Aspley Guise & Woburn Sands Golf Club", addr="West Hill, Aspley Guise, Milton Keynes", phone="01908583596"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 493m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.aspleyguisegolfclub.co.uk/'
WHERE id IN (
  '8eeba401-9bfd-4a1d-9aa9-b0a996168f9b'
);
```

### Avisford Park Golf Course (England, 1 courses)

- DB: lat=50.8501403, lon=-0.6198664, addr="Yapton Lane, Walberton, Arundel", website=null, phone=null
- OSM (medium, 490m, sim=1): name="Avisford Park Golf Club", website="https://www.avisfordparkgolfclub.com/", addr=null
- EG  (medium, 351m, sim=1): name="Avisford Park Golf Club", addr="Yapton Lane, Walberton, Nr Arundel", phone="01243554611"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 490m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.avisfordparkgolfclub.com/'
WHERE id IN (
  '82c577ed-de39-46e4-a04d-96bf044c387e'
);
```

### Barkway Park Golf Club (England, 1 courses)

- DB: lat=51.9934145, lon=0.0226772, addr="Nuthampstead Rd, Barkway", website=null, phone=null
- OSM (medium, 436m, sim=1): name="Barkway Park Golf Club", website="http://www.barkwayparkgolfclub.co.uk/", addr="Nuthampstead Road, SG8 8EN, Royston"
- EG  (low, 555m, sim=1): name="Barkway Park Golf Club", addr="Nuthampstead Road, Royston", phone="01763848215"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 436m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.barkwayparkgolfclub.co.uk/'
WHERE id IN (
  '6ad21e47-26e4-4b97-afa1-de8399afc9d5'
);
```

### Berkhamsted Golf Club (England, 1 courses)

- DB: lat=51.7707878, lon=-0.5469181, addr="The Common, Berkhamsted", website=null, phone=null
- OSM (medium, 486m, sim=1): name="Berkhamsted Golf Club", website="https://www.berkhamstedgolfclub.co.uk/", addr="The Common, HP4 2QB, Berkhamsted"
- EG  (high, 97m, sim=1): name="Berkhamsted Golf Club", addr="The Common, Berkhamsted", phone="01442865832"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 486m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.berkhamstedgolfclub.co.uk/'
WHERE id IN (
  'abff744b-3d5f-4471-b3dc-5d4e69116a03'
);
```

### Bewdley Pines Golf Club (England, 1 courses)

- DB: lat=52.3874621, lon=-2.2899901, addr="Habberley Road, Bewdley", website=null, phone=null
- OSM (medium, 436m, sim=1): name="Bewdley Pines Golf Club", website="https://www.bewdleypines.co.uk", addr=null
- EG  (medium, 304m, sim=1): name="Bewdley Pines Golf Club", addr="Habberley Road, Bewdley", phone="01299 409098"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 436m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.bewdleypines.co.uk'
WHERE id IN (
  '79170d4f-9389-4843-a451-d8077d27ece6'
);
```

### Bigbury Golf Club (England, 1 courses)

- DB: lat=50.2903278, lon=-3.8759889, addr="B3392 Rd, Bigbury-on-Sea", website=null, phone=null
- OSM (medium, 358m, sim=1): name="Bigbury Golf Club", website="https://www.bigburygolfclub.co.uk/", addr="TQ7 4BB, Bigbury-on-Sea"
- EG  (high, 63m, sim=1): name="Bigbury Golf Club", addr="Hexdown Barns, Bigbury-on-Sea", phone="01548810557"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 358m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.bigburygolfclub.co.uk/'
WHERE id IN (
  '60c4545d-f8d5-4606-97ad-e49b2df04838'
);
```

### Billingham Golf Club (England, 2 courses)

- DB: lat=54.610127, lon=-1.3110063, addr="Sandy Lane, Billingham", website=null, phone=null
- OSM (medium, 359m, sim=1): name="Billingham Golf Club", website="https://www.billinghamgolfclub.com/", addr="Sandy Lane, TS22 5NA, Billingham"
- EG  (high, 196m, sim=1): name="Billingham Golf Club", addr="Sandy Lane, Billingham", phone="01642533816"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 359m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.billinghamgolfclub.com/'
WHERE id IN (
  '88eb90be-2293-47ee-a060-537ac0f2705d',
  'bc5b2940-b4df-4d72-9b30-fbc65ddefacd'
);
```

### Bingley St Ives Golf Club (England, 1 courses)

- DB: lat=53.8506882, lon=-1.8749864, addr="Saint Ives Grove, Bingley", website=null, phone=null
- OSM (medium, 397m, sim=1): name="Bingley St Ives Golf Club", website="https://bingleystivesgc.com/", addr=null
- EG  (low, 999m, sim=1): name="Bingley St Ives Golf Club", addr="St. Ives Estate, Harden, Bingley", phone="01274562436"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 397m, sim=1)
```sql
UPDATE courses SET
  website = 'https://bingleystivesgc.com/'
WHERE id IN (
  '7d1d9a30-2a55-412c-895a-09a6b99669f6'
);
```

### Bishopswood Golf Club (England, 1 courses)

- DB: lat=51.3485525, lon=-1.1564694, addr="Bishopswood Lane, Tadley", website=null, phone=null
- OSM (medium, 256m, sim=1): name="Bishopswood Golf Course", website="https://www.bishopswoodgc.co.uk/", addr="Bishopswood Lane, RG26 4AT, Tadley"
- EG  (high, 90m, sim=1): name="Bishopswood Golf Course", addr="Bishopswood Lane, Tadley", phone="01189408600"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 256m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.bishopswoodgc.co.uk/'
WHERE id IN (
  '4853a253-57c8-4a1a-a50e-4bbc1c06b069'
);
```

### Boughton Golf Club (England, 2 courses)

- DB: lat=51.2916015, lon=0.9469247, addr="Brickfield Lane, Kent", website=null, phone=null
- OSM (medium, 468m, sim=1): name="Boughton Golf Club", website="http://www.pentlandgolf.co.uk/boughton/boughton-golf-club", addr="Brickfield Lane, ME13 9AJ, Boughton"
- EG  (low, 774m, sim=1): name="Boughton Golf Club", addr="Brickfield Lane, Boughton, Nr Faversham", phone="01227752277"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 468m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.pentlandgolf.co.uk/boughton/boughton-golf-club'
WHERE id IN (
  '3058f2d6-c575-44c0-95c2-5d1c1fa032e6',
  'f370c867-6bf0-4296-80ea-e8791b16d4e6'
);
```

### Brancepeth Castle Golf Club (England, 1 courses)

- DB: lat=54.7341291, lon=-1.6552083, addr="Brancepeth Castle , Brancepeth", website=null, phone=null
- OSM (medium, 392m, sim=1): name="Brancepeth Castle Golf Club", website="https://www.brancepeth-castle-golf.co.uk/", addr="DH7 8EA, Durham"
- EG  (medium, 396m, sim=1): name="Brancepeth Castle Golf Club", addr="The Club House, Brancepeth", phone="01913780075"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 392m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.brancepeth-castle-golf.co.uk/'
WHERE id IN (
  '049f92a9-18ed-437a-b22e-548b03d5514b'
);
```

### Brandon Golf Course (England, 1 courses)

- DB: lat=53.8564735, lon=-1.4871793, addr="Holywell Lane, Leeds", website=null, phone=null
- OSM (medium, 366m, sim=1): name="Brandon Golf Course", website="https://brandonandthevillagegolfcourses.co.uk/", addr=null
- EG  (low, 119860m, sim=0.75): name="Branston Golf & Country Club", addr="Burton Road, Branston, Burton-on-Trent", phone="01283 528304"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 366m, sim=1)
```sql
UPDATE courses SET
  website = 'https://brandonandthevillagegolfcourses.co.uk/'
WHERE id IN (
  'c591a2ad-df3c-4ea6-ae85-bf2d2fd25ebd'
);
```

### Bridlington Golf Club (England, 1 courses)

- DB: lat=54.0720346, lon=-0.205525, addr="Belvedere Road, Bridlington", website=null, phone=null
- OSM (medium, 462m, sim=1): name="Bridlington Golf Club", website="https://www.bridlingtongolfclub.co.uk/", addr="Belvedere Road, YO15 3NA, Bridlington"
- EG  (high, 162m, sim=1): name="Bridlington Golf Club", addr="Belvedere Road, Bridlington", phone="01262606367"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 462m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.bridlingtongolfclub.co.uk/'
WHERE id IN (
  'a3005f4c-9471-4563-a0d4-de0e1089ec51'
);
```

### Bromsgrove Golf Centre (England, 1 courses)

- DB: lat=52.3338676, lon=-2.0415968, addr="Old Stratford Road, Bromsgrove", website=null, phone=null
- OSM (medium, 446m, sim=1): name="Bromsgrove Golf Centre", website="https://bromsgrovegolfcentre.com/", addr="Stratford Road, B60 1LD, Bromsgrove"
- EG  (medium, 405m, sim=1): name="Bromsgrove Golf Centre", addr="Stratford Road, Bromsgrove", phone="01527575886"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 446m, sim=1)
```sql
UPDATE courses SET
  website = 'https://bromsgrovegolfcentre.com/'
WHERE id IN (
  'c49ddff7-cf5c-47c8-81d1-689a562b71ec'
);
```

### Cally Palace Golf Hotel (England, 1 courses)

- DB: lat=54.8719218, lon=-4.1814746, addr="Cally Avenue, Gatehouse of Fleet", website=null, phone=null
- OSM (medium, 342m, sim=1): name="Cally Palace Hotel & Golf Course", website="https://www.mcmillanhotels.co.uk/hotels/cally-palace-hotel/golf-at-cally-palace", addr="DG7 2DL, Gatehouse of Fleet"
- EG  (no-match, 123942m, sim=0.5): name="Allendale Golf Club", addr="Allenheads Road, High Studdon, Allendale, Hexham", phone="07005808246"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 342m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.mcmillanhotels.co.uk/hotels/cally-palace-hotel/golf-at-cally-palace'
WHERE id IN (
  '01ba468c-c499-4be2-a95d-5d2532fe1a0b'
);
```

### Calverley Golf Club (England, 1 courses)

- DB: lat=53.8144343, lon=-1.6967122, addr="Woodhall Lane, Pudsey", website=null, phone=null
- OSM (medium, 273m, sim=1): name="Calverley Golf & Country Club", website="http://www.calverleygolf.co.uk/", addr="Woodhall Lane, LS28 5QY, Pudsey"
- EG  (medium, 256m, sim=1): name="Calverley Golf Club", addr="Woodhall Lane, Calverley, Pudsey", phone="01132569244"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 273m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.calverleygolf.co.uk/'
WHERE id IN (
  '842be092-e20e-4543-9385-19e4748e9e87'
);
```

### Canons Brook Golf Club (England, 1 courses)

- DB: lat=51.7735151, lon=0.0725501, addr="Elizabeth Way, Harlow", website=null, phone=null
- OSM (medium, 312m, sim=1): name="Canons Brook Golf Course", website="https://www.canonsbrook.com/", addr="Elizabeth Way, CM19 5BE, Harlow"
- EG  (high, 108m, sim=1): name="Canons Brook Golf Club", addr="Elizabeth Way, Harlow", phone="01279421482"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 312m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.canonsbrook.com/'
WHERE id IN (
  '25d3ca3d-4faf-4001-acec-88d861e2488d'
);
```

### Castle Hawk (England, 2 courses)

- DB: lat=53.5911691, lon=-2.1883726, addr="Chadwick Lane, Castleton , Rochdale", website=null, phone=null
- OSM (medium, 265m, sim=1): name="Castle Hawk Golf Club", website="http://www.castlehawk.co.uk/", addr=null
- EG  (medium, 282m, sim=1): name="Castle Hawk Golf Club", addr="Chadwick Lane, Castleton, Rochdale", phone="01706640841"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 265m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.castlehawk.co.uk/'
WHERE id IN (
  'ce6f5e51-a882-418a-85fa-3e589b4dd55b',
  'f28a02f1-c250-4dc7-a419-8c42aa09d3b3'
);
```

### Castle Point Golf Course (England, 2 courses)

- DB: lat=51.5318088, lon=0.5792423, addr="Somnes Avenue, Canvey Island", website=null, phone=null
- OSM (medium, 313m, sim=1): name="Castle Point Golf Course", website="https://www.glendalegolf.co.uk/Castle-point-golf-course", addr="Somnes Avenue, SS8 9FG, Canvey Island"
- EG  (medium, 378m, sim=1): name="Castle Point Golf Club", addr="Somnes Avenue, Canvey Island", phone="01268511149"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 313m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.glendalegolf.co.uk/Castle-point-golf-course'
WHERE id IN (
  '6b24c677-a59c-4521-8825-e6c7aa0a1b28',
  'c31ed2ef-6c19-4f5a-bdc3-8f4e3b294f3f'
);
```

### Catterick Golf Club (England, 1 courses)

- DB: lat=54.3733927, lon=-1.7349491, addr="Leyburn Road, Catterick Garrison", website=null, phone=null
- OSM (medium, 486m, sim=1): name="Catterick Golf Club", website="https://www.catterickgolfclub.co.uk/", addr=null
- EG  (high, 163m, sim=1): name="Catterick Golf Club", addr="Leyburn Road, Catterick Garrison", phone="01748833268"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 486m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.catterickgolfclub.co.uk/'
WHERE id IN (
  'a82e91c2-e142-4d09-b3b3-22b97cdf2879'
);
```

### Charnwood Forest Golf Club (England, 1 courses)

- DB: lat=52.7285136, lon=-1.2264039, addr="Breakback Road, Loughborough", website=null, phone=null
- OSM (medium, 398m, sim=1): name="Charnwood Forest Golf Course", website="https://www.charnwoodforestgolfclub.com/", addr=null
- EG  (high, 4m, sim=1): name="Charnwood Forest Golf Club", addr="Breakback Road, Woodhouse Eaves, Loughborough, LE12 8TA", phone="01509890259"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 398m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.charnwoodforestgolfclub.com/'
WHERE id IN (
  'ee06622f-234a-4ecf-95e3-4ad61ef34330'
);
```

### Chorley Golf Club (England, 1 courses)

- DB: lat=53.62936, lon=-2.6015496, addr="Hall o'th' Hill, Heath Charnock , Chorley", website=null, phone=null
- OSM (medium, 289m, sim=1): name="Chorley Golf Club", website="https://www.chorleygolfclub.co.uk/", addr="Hall o'th' Hill, PR6 9HX, Chorley"
- EG  (high, 101m, sim=1): name="Chorley Golf Club", addr="Hall o'th'Hill, Charnock, Chorley", phone="01257480263"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 289m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.chorleygolfclub.co.uk/'
WHERE id IN (
  '46f1533e-d41e-4390-9230-d90f87bcc995'
);
```

### Clayton Golf Club (England, 1 courses)

- DB: lat=53.7774435, lon=-1.8131378, addr="Thornton View Road, Clayton, Bradford, Bradford", website=null, phone=null
- OSM (medium, 324m, sim=1): name="Clayton Golf Club", website="https://www.claytongolfclub.co.uk/", addr=null
- EG  (high, 83m, sim=1): name="Clayton Golf Club", addr="Thornton View Road, Clayton, Bradford", phone="01274880047"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 324m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.claytongolfclub.co.uk/'
WHERE id IN (
  'bf62d5d3-1d8d-42dd-b596-eb9d9b781bfe'
);
```

### Cockermouth Golf Club (England, 1 courses)

- DB: lat=54.6643727, lon=-3.2992975, addr="Cockermouth Golf Club, Embleton, Cockermouth", website=null, phone=null
- OSM (medium, 264m, sim=1): name="Cockermouth Golf Club", website="https://www.cockermouthgolf.co.uk/", addr="CA13 9SG, Embleton"
- EG  (low, 513m, sim=1): name="Cockermouth Golf Club", addr="Embleton, Cockermouth", phone="01768776223"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 264m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.cockermouthgolf.co.uk/'
WHERE id IN (
  '9028b968-b3b2-46bb-b814-6a85ee9e6d85'
);
```

### College Pines Golf Club (England, 1 courses)

- DB: lat=53.2841938, lon=-1.1085205, addr="College Drive, Worksop", website=null, phone=null
- OSM (medium, 377m, sim=1): name="College Pines Golf Club", website="http://www.collegepinesgolfclub.co.uk/", addr="Worksop College Drive, S80 3AL, Worksop"
- EG  (medium, 436m, sim=1): name="College Pines Golf Club", addr="Worksop College Drive, Worksop", phone="01909501431"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 377m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.collegepinesgolfclub.co.uk/'
WHERE id IN (
  '23c28110-d0bf-443f-a7fd-73e9726ff96b'
);
```

### Collingtree Park Golf Club (England, 1 courses)

- DB: lat=52.2025389, lon=-0.9074113, addr="90 Windingbrook Lane, Northampton", website=null, phone=null
- OSM (medium, 481m, sim=1): name="Collingtree Park Golf Club", website="https://www.collingtreeparkgolf.com/", addr="Windingbrook Lane, 90, NN4 0XN, Northampton"
- EG  (low, 614m, sim=1): name="Collingtree Park Golf Club", addr="Windingbrook Lane, Collingtree Park, Northampton", phone="01604700000"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 481m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.collingtreeparkgolf.com/'
WHERE id IN (
  'c006aee8-cc4b-4e14-94a5-f671e0c8507b'
);
```

### Crosland Heath Golf Club (England, 1 courses)

- DB: lat=53.6253337, lon=-1.8295973, addr="Felks Stile Road, Huddersfield", website=null, phone=null
- OSM (medium, 436m, sim=1): name="Crosland Heath Golf Course", website="https://croslandheath.co.uk/", addr="Felks Stile Road, HD4 7AF, Huddersfield"
- EG  (medium, 320m, sim=1): name="Crosland Heath Golf Club", addr="Felks Stile Road, Crosland Hill, Huddersfield", phone="01484653216"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 436m, sim=1)
```sql
UPDATE courses SET
  website = 'https://croslandheath.co.uk/'
WHERE id IN (
  'dee89ba6-8c5b-47d7-a33d-704179247687'
);
```

### Cumberwell Park (England, 18 courses)

- DB: lat=51.3681714, lon=-2.2615549, addr="Great Cumberwell, Bradford-on-Avon", website=null, phone=null
- OSM (medium, 364m, sim=1): name="Cumberwell Park", website="https://www.cumberwellpark.com/", addr=null
- EG  (high, 4m, sim=1): name="Cumberwell Park Golf Club", addr="Cumberwell, Bradford-on-Avon", phone="01225863322"

**Proposed UPDATE** (applied to all 18 course rows for this club, overall=medium):
  - website: from osm(medium, 364m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.cumberwellpark.com/'
WHERE id IN (
  '121ea625-1e12-46a8-91ff-99bda7a8b2d9',
  '31ea8ba8-8572-46de-91c8-fb34bd613edb',
  '3dd51049-7a3b-41e8-a1bc-36afd289a940',
  '42d3b3fd-3cf9-4d4d-9b6f-ee685cb342c2',
  '5734eef8-27bc-4d6a-8a6a-6b06a3dc8494',
  '6c61ce5c-1132-4d9c-868c-e7af53a1a77d',
  '73c5bf88-362f-40db-90a9-fec6ed89b291',
  '86587f7d-9182-44a1-a78b-167e04edaae0',
  '8dca5b11-2864-4284-9a8e-2a738cdfc33e',
  '97e9d3ec-2952-4069-89ec-f660206f42b5',
  'a0212ef2-1807-40e0-a929-6df398486f97',
  'b688fca0-80b4-4ca5-bc27-3ca7387891d0',
  'cc13b813-c493-480e-8e12-bb7fd469c567',
  'e628f7ec-f77a-4d77-b0dd-bc6a3f797bec',
  'ef2ff0af-4a55-4f1b-ae3d-93459eaa07f3',
  'f01057f1-999a-4034-a8c8-ff8ed4c2d172',
  'fc066509-7dfe-43db-9345-ab246afe362a',
  'fe9879ff-1928-4e56-8b53-9507fbaedb16'
);
```

### Dale Hill Hotel & Golf Club (England, 2 courses)

- DB: lat=51.0487989, lon=0.4288167, addr="Lower Platts, Wadhurst", website=null, phone=null
- OSM (medium, 284m, sim=1): name="Dale Hill Golf Club", website="https://www.dalehill.co.uk/golf", addr="TN5 7DQ, Ticehurst"
- EG  (medium, 352m, sim=1): name="Dale Hill Hotel & Golf Club", addr="Ticehurst, nr Wadhurst", phone="01580201090"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 284m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.dalehill.co.uk/golf'
WHERE id IN (
  '1a22f211-f86e-470d-a482-cba6a0839f12',
  '9053e336-883e-4896-9dc8-9952a19772ed'
);
```

### David Lloyd Hampton (England, 1 courses)

- DB: lat=51.4392431, lon=-0.3618154, addr="Staines Road, Hampton", website=null, phone=null
- OSM (medium, 359m, sim=1): name="David Lloyd Hampton", website="https://www.davidlloyd.co.uk/club-finder/hampton/golf", addr="Staines Road, TW2 5JD, Hampton"
- EG  (low, 832m, sim=1): name="David Lloyd Club Hampton", addr="Staines Road, Twickenham", phone="02087832400"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 359m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.davidlloyd.co.uk/club-finder/hampton/golf'
WHERE id IN (
  'ecb37647-c1b0-431d-a95a-0b8f5a3de521'
);
```

### Dewlands Manor Golf Course (England, 1 courses)

- DB: lat=51.0376385, lon=0.2148196, addr="Cottage Hill, Rotherfield", website=null, phone=null
- OSM (medium, 448m, sim=1): name="Dewlands Manor Golf Course", website="http://www.dewlandsmanorgolfcourse.co.uk/", addr="TN6 3JN, Rotherfield"
- EG  (no-match, 304491m, sim=0.571): name="Welbeck Manor Golf Club", addr="Welbeck Manor, Sparkwell, Plympton", phone="01752837219"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 448m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.dewlandsmanorgolfcourse.co.uk/'
WHERE id IN (
  'f100ad5a-9a96-4100-9951-7b616e97ead8'
);
```

### Dinsdale Golf Club (England, 1 courses)

- DB: lat=54.5030057, lon=-1.4826551, addr="Neasham Road, Darlington", website=null, phone=null
- OSM (medium, 452m, sim=1): name="Dinsdale Golf Club", website="http://dinsdalesgolf.com", addr="Neasham Road, DL2 1DW, Darlington"
- EG  (low, 199973m, sim=0.75): name="Lingdale Golf Club", addr="Joe Moores Lane, Woodhouse Eaves, Loughborough", phone="01509890703"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 452m, sim=1)
```sql
UPDATE courses SET
  website = 'http://dinsdalesgolf.com'
WHERE id IN (
  'cc7e2c47-59ed-4050-ae79-b98bd5508e04'
);
```

### Downshire Golf Complex (England, 2 courses)

- DB: lat=51.3986788, lon=-0.7879818, addr="Easthampstead Park, Wokingham", website=null, phone=null
- OSM (medium, 471m, sim=1): name="Downshire Golf Complex", website="https://www.bracknell-forest.gov.uk/downshiregolfcomplex", addr="Easthampstead Park, RG40 3DH, Wokingham"
- EG  (low, 752m, sim=0.529): name="The Downshire Golf Club", addr="Easthampstead Park, Wokingham", phone="01344302030"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 471m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.bracknell-forest.gov.uk/downshiregolfcomplex'
WHERE id IN (
  '8c3d571e-75c3-44ff-8ffb-8ffad82ae633',
  'bbe7d020-5898-49b4-9ad4-116fa67a53ac'
);
```

### Durham City Golf Club (England, 2 courses)

- DB: lat=54.7480623, lon=-1.6022606, addr="Littleburn Road, Durham City", website=null, phone=null
- OSM (medium, 272m, sim=1): name="Durham City Golf Course", website="https://www.durhamcitygolfclub.co.uk/", addr=null
- EG  (high, 4m, sim=1): name="Durham City Golf Club", addr="Rosebay Road, Littleburn, Langley Moor, Durham City", phone="01913780029"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 272m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.durhamcitygolfclub.co.uk/'
WHERE id IN (
  '5e9e8db7-25a8-4c3f-a5f6-d8394802c5bd',
  '68bde4d8-5b8a-4005-84ba-04c6f81a2cab'
);
```

### East Bierley Golf Club (England, 1 courses)

- DB: lat=53.7586547, lon=-1.7012551, addr="South View Road, Bradford", website=null, phone=null
- OSM (medium, 438m, sim=1): name="East Bierley Golf Club", website="https://www.eastbierleygolfclub.co.uk/", addr="South View Road, BD4 6PP, Bradford"
- EG  (medium, 308m, sim=1): name="East Bierley Golf Club", addr="South View Road, East Bierley, Bradford", phone="01274681023"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 438m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.eastbierleygolfclub.co.uk/'
WHERE id IN (
  '26f2c2f3-2f67-40fe-bda5-b8b488f16483'
);
```

### Eden Golf Club (England, 2 courses)

- DB: lat=54.920958, lon=-2.850395, addr="Crosby-on-Eden, Carlisle", website=null, phone=null
- OSM (medium, 293m, sim=1): name="Eden Golf Club", website="https://www.edengolf.co.uk/", addr=null
- EG  (medium, 371m, sim=1): name="Eden Golf Club", addr="Crosby-on-Eden, Carlisle", phone="01228573003"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 293m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.edengolf.co.uk/'
WHERE id IN (
  '5ef2ef85-2510-4b86-9c83-06b430f95305',
  'b2718b97-c059-45b4-ad19-91475a998ad6'
);
```

### Ellesborough Golf Club (England, 1 courses)

- DB: lat=51.7549009, lon=-0.7772269, addr="Wendover Road, Butlers Cross , Aylesbury", website=null, phone=null
- OSM (medium, 335m, sim=1): name="Ellesborough Golf Club", website="https://www.ellesboroughgolf.co.uk/", addr="Wendover Road, HP17 0TZ, Aylesbury"
- EG  (medium, 332m, sim=1): name="Ellesborough Golf Club", addr="Wendover Road, Butlers Cross, Aylesbury", phone="01296622114"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 335m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.ellesboroughgolf.co.uk/'
WHERE id IN (
  '64150acb-6b08-4983-bbe4-20b3207ab959'
);
```

### Ely On Par Golf Club (England, 1 courses)

- DB: lat=52.4143596, lon=0.2524112, addr="Downham Road, Ely", website=null, phone=null
- OSM (medium, 467m, sim=1): name="Ely On Par Golf Club", website="https://elydrivingrange.co.uk", addr="Downham Road, CB6 2SH, Ely"
- EG  (no-match, 81967m, sim=0.636): name="Belton Park Golf Club", addr="Londonthorpe Road, Grantham", phone="01476 567399"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 467m, sim=1)
```sql
UPDATE courses SET
  website = 'https://elydrivingrange.co.uk'
WHERE id IN (
  '9feda8c0-107e-447e-a6a4-4593f90b4c43'
);
```

### Enville Golf Club  (England, 2 courses)

- DB: lat=52.4987397, lon=-2.2348717, addr="Highgate common, enville, Stourbridge", website=null, phone=null
- OSM (medium, 276m, sim=1): name="Enville Golf Club", website="http://www.envillegolfclub.com/", addr="DY7 5BN, Enville"
- EG  (medium, 424m, sim=1): name="Enville Golf Club", addr="Highgate Common, Enville, Stourbridge", phone="01384 872074"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 276m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.envillegolfclub.com/'
WHERE id IN (
  '1ec188de-56d4-4b39-a750-d4345f3b2e73',
  '7966932e-2d65-427e-9f4c-c1b4ba4c1936'
);
```

### Epping Golf Course (England, 1 courses)

- DB: lat=51.6870598, lon=0.1168148, addr="Flux's Lane, Epping", website=null, phone=null
- OSM (medium, 486m, sim=1): name="Epping Golf Course", website="https://www.eppinggolfcourse.org.uk/", addr="Fluxs Lane, CM16 7NJ, Epping"
- EG  (medium, 463m, sim=1): name="Epping Golf Club", addr="Fluxs Lane, Epping", phone="01992572282"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 486m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.eppinggolfcourse.org.uk/'
WHERE id IN (
  '41105dd5-0300-4fe2-b5d8-2e208d9c1588'
);
```

### Eskdale Golf Course (England, 1 courses)

- DB: lat=54.3663652, lon=-3.3541584, addr="Eskdale Golf Course, Ravenglass", website=null, phone=null
- OSM (medium, 323m, sim=1): name="Eskdale Golf Course", website="www.eskdalegolf.co.uk", addr="CA18 1RL, Ravenglass"
- EG  (medium, 385m, sim=1): name="Eskdale Golf Course", addr="Ravenglass, Ravenglass", phone="01229 717680"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 323m, sim=1)
```sql
UPDATE courses SET
  website = 'www.eskdalegolf.co.uk'
WHERE id IN (
  '07decbf0-40e5-49be-bb9d-7eba5edfc56d'
);
```

### Feldon Valley Golf Club (England, 1 courses)

- DB: lat=52.0409817, lon=-1.5534421, addr="Sutton Lane, Lower Brailes", website=null, phone=null
- OSM (medium, 293m, sim=1): name="Feldon Valley Golf Club", website="http://www.feldonvalleygolf.co.uk/", addr="Sutton Lane, OX15 5BB, Lower Brailes"
- EG  (high, 126m, sim=1): name="Feldon Valley Golf Club", addr="Sutton Lane, Lower Brailes, Banbury", phone="01608685633"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 293m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.feldonvalleygolf.co.uk/'
WHERE id IN (
  'cf0c209c-980b-4bcf-bd91-786a54121174'
);
```

### Forest Of Galtres Golf Club (England, 1 courses)

- DB: lat=54.0126564, lon=-1.1322054, addr="Skelton Lane, Wigginton", website=null, phone=null
- OSM (medium, 433m, sim=1): name="Forest of Galtres Golf Club", website="https://www.forestofgaltres.co.uk/", addr=null
- EG  (low, 947m, sim=1): name="Forest Of Galtres Golf Club", addr="Skelton Lane, Wigginton, York", phone="01904766198"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 433m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.forestofgaltres.co.uk/'
WHERE id IN (
  'b8339a6d-a043-4214-870a-df226c944f5c'
);
```

### Garon Park Golf Complex (England, 10 courses)

- DB: lat=51.5532103, lon=0.746572, addr="Eastern Avenue, Southend-On-Sea", website=null, phone=null
- OSM (medium, 302m, sim=1): name="Garon Park Golf Complex", website="https://www.garonparkgolf.co.uk/", addr="Eastern Avenue, SS2 4FA, Southend-on-Sea"
- EG  (low, 526m, sim=1): name="Garon Park Golf Complex", addr="Garon Park, Eastern Avenue, Southend-on-Sea", phone="01702601701"

**Proposed UPDATE** (applied to all 10 course rows for this club, overall=medium):
  - website: from osm(medium, 302m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.garonparkgolf.co.uk/'
WHERE id IN (
  '4d60355d-cf7c-489f-a1de-73b89ade5e96',
  '65664d8e-9b07-400e-85ac-010f249e1ad2',
  '693bee3f-37c6-4f2d-874e-d7016e0640f1',
  'a5f80965-a8c4-47c6-9d81-8ca7ee79e045',
  'b0e41113-b4bf-4078-b8ec-31d6f8ea94d7',
  'b4dc7033-0735-4437-b1c8-fe299735e44b',
  'dabd7bf6-4aa2-46dd-bf2f-18d346ef59f2',
  'dea62d0f-6829-4384-867d-a4eda9297c0b',
  'f5286619-1d57-4fdd-b55a-390691462713',
  'f8763eaa-d8c4-43f5-858f-049ce6fe940d'
);
```

### Gillingham Golf Course (England, 1 courses)

- DB: lat=51.37857, lon=0.5669759, addr="Woodlands Road, Gillingham", website=null, phone=null
- OSM (medium, 290m, sim=1): name="Gillingham Golf Club", website="https://www.gillinghamgolfclub.co.uk/", addr="Woodlands Road, ME7 2AP, Gillingham"
- EG  (low, 745m, sim=1): name="Gillingham Golf Club", addr="Woodlands Road, Gillingham", phone="01634853017"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 290m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.gillinghamgolfclub.co.uk/'
WHERE id IN (
  '3d4d8a61-6e94-449a-a210-eaeff6bcebd9'
);
```

### Grange-Over-Sands Golf Club (England, 1 courses)

- DB: lat=54.2004973, lon=-2.8850888, addr="Meathop Road, Grange-over-Sands", website=null, phone=null
- OSM (medium, 267m, sim=1): name="Grange-over-Sands Golf Club", website="https://www.grangegolfclub.co.uk/", addr="Meathop Road, LA11 6QX, Grange-over-Sands"
- EG  (medium, 386m, sim=1): name="Grange Over Sands Golf Club", addr="Meathop Road, Grange-over-Sands", phone="01539533180"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 267m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.grangegolfclub.co.uk/'
WHERE id IN (
  'cb6b3af5-d5f0-4198-9109-82ac6a68be97'
);
```

### Green Haworth Golf Club (England, 1 courses)

- DB: lat=53.7337968, lon=-2.3709543, addr="Green Haworth, Accrington", website=null, phone=null
- OSM (medium, 491m, sim=1): name="Green Haworth Golf Club", website="https://greenhaworthgolf.co.uk/", addr=null
- EG  (medium, 361m, sim=1): name="Green Haworth Golf Club", addr="Green Haworth, Accrington", phone="01254237580"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 491m, sim=1)
```sql
UPDATE courses SET
  website = 'https://greenhaworthgolf.co.uk/'
WHERE id IN (
  '5a506d41-ae3c-4da2-bc5e-50057bf42af1'
);
```

### Greenfield Golf Club (England, 2 courses)

- DB: lat=52.6350222, lon=-2.1112742, addr="Cat and Kittens Lane, Wolverhampton", website=null, phone=null
- OSM (medium, 323m, sim=1): name="Greenfield Golf Club", website="http://greenfieldgolf.co.uk/", addr="Cat and Kittens Lane, WV10 7EE, Bushbury, Wolverhampton"
- EG  (high, 133m, sim=1): name="Greenfield Golf Club", addr="Cat and Kittens Lane, Fordhouses, Wolverhampton", phone="01902790686"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 323m, sim=1)
```sql
UPDATE courses SET
  website = 'http://greenfieldgolf.co.uk/'
WHERE id IN (
  '43b73b0f-89b2-4146-81e5-b212f75ed96d',
  'b0ef5edc-e69e-42a8-8d2a-191a771bf8a5'
);
```

### Hagley Golf  Country Club (England, 1 courses)

- DB: lat=52.4384186, lon=-2.1024172, addr="Wassell Grove Lane, Hagley", website=null, phone=null
- OSM (medium, 358m, sim=1): name="Hagley Golf & Country Club", website="http://www.hagleygolfandcountryclub.co.uk/", addr="Wassell Grove Lane, DY9 9JW, Hagley"
- EG  (medium, 334m, sim=1): name="Hagley Golf Club", addr="Wassell Grove Lane, Hagley", phone="01562883852"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 358m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.hagleygolfandcountryclub.co.uk/'
WHERE id IN (
  '21c3778b-b3c4-497e-9962-a85cdebd9206'
);
```

### Hanger Hill Park Pitch And Putt (England, 1 courses)

- DB: lat=51.5240431, lon=-0.2955887, addr="Hillcrest Road, London", website=null, phone=null
- OSM (medium, 283m, sim=0.871): name="Hanger Hill Park Pitch & Putt", website="https://www.londonpitchnputt.com/", addr="Hillcrest Road, W5 2JL, London"
- EG  (low, 969m, sim=0.226): name="WAGC UK Ltd Golf Club", addr=null, phone="07970 635560"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 283m, sim=0.871)
```sql
UPDATE courses SET
  website = 'https://www.londonpitchnputt.com/'
WHERE id IN (
  '0a44600b-70f0-4202-9dcc-7519579fd9cc'
);
```

### Harpenden Golf Club (England, 1 courses)

- DB: lat=51.7991713, lon=-0.3686428, addr="Hammonds End Lane, Harpenden", website=null, phone=null
- OSM (medium, 327m, sim=1): name="Harpenden Golf Course", website="https://www.harpendengolfclub.co.uk", addr="Hammonds End Lane, AL5 2AX, Harpenden"
- EG  (high, 177m, sim=1): name="Harpenden Golf Club", addr="Hammonds End, Redbourn Lane, Harpenden", phone="01582712580"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 327m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.harpendengolfclub.co.uk'
WHERE id IN (
  '86a05a3f-eff8-4967-9c25-ad01692141e7'
);
```

### Haverhill Golf Club (England, 1 courses)

- DB: lat=52.0764558, lon=0.4730485, addr="Coupals Road, Haverhill", website=null, phone=null
- OSM (medium, 434m, sim=1): name="Haverhill Golf Club", website="http://www.club-noticeboard.co.uk/haverhill/", addr="CB9 7UW"
- EG  (medium, 481m, sim=1): name="Haverhill Golf Club", addr="Coupals Road, Haverhill", phone="01440 712628"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 434m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.club-noticeboard.co.uk/haverhill/'
WHERE id IN (
  'e7c6c1a0-9124-4bbe-ae5c-7b8c9ad9b227'
);
```

### Hexham Golf Club (England, 1 courses)

- DB: lat=54.9797459, lon=-2.1153625, addr="Spital Park, Hexham", website=null, phone=null
- OSM (medium, 351m, sim=1): name="Hexham Golf Club", website="https://www.hexhamgolf.co.uk/", addr="Spital Park, NE46 3RZ, Hexham"
- EG  (high, 41m, sim=1): name="Hexham Golf Club", addr="Hexham, Hexham", phone="01434603072"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 351m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.hexhamgolf.co.uk/'
WHERE id IN (
  '4bea2f43-5796-4513-b1ba-806c4161681e'
);
```

### Highfield Golf Club (England, 1 courses)

- DB: lat=53.6952051, lon=-2.588298, addr="Buckholes lane, Higher Wheelton , Chorley", website=null, phone=null
- OSM (medium, 296m, sim=1): name="Highfield Golf Course", website="https://highfieldgolfcourse.co.uk/", addr=null
- EG  (low, 119301m, sim=0.778): name="Lichfield Golf & Country Club", addr="Elmhurst, Lichfield, Lichfield", phone="01543417333"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 296m, sim=1)
```sql
UPDATE courses SET
  website = 'https://highfieldgolfcourse.co.uk/'
WHERE id IN (
  '54c5a983-67e2-4164-8cdb-77b230d4a7d7'
);
```

### Horsley Lodge Golf Club (England, 1 courses)

- DB: lat=52.9879072, lon=-1.420071, addr="Smalley Mill Road, Horsley", website=null, phone=null
- OSM (medium, 495m, sim=1): name="Horsley Lodge Golf Club", website="http://www.horsleylodge.co.uk/", addr="Smalley Mill Road, DE21 5BL, Derby"
- EG  (low, 382m, sim=0.65): name="Horsley Lodge Estate", addr="Smalley Mill Road, Derby", phone="01332780838"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 495m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.horsleylodge.co.uk/'
WHERE id IN (
  'fe0c06e9-e418-4b9b-a40a-03728c2ca06c'
);
```

### Houghton-Le-Spring Golf Club (England, 1 courses)

- DB: lat=54.8401003, lon=-1.4432773, addr="B1404, Houghton le Spring", website=null, phone=null
- OSM (medium, 273m, sim=1): name="Houghton-le-Spring Golf Club", website="http://www.houghtongolfclub.co.uk/", addr=null
- EG  (high, 95m, sim=1): name="Houghton-Le-Spring Golf Club", addr="Copt Hill, Houghton le Spring", phone="01915841198"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 273m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.houghtongolfclub.co.uk/'
WHERE id IN (
  '0c08fed8-9b6c-40f9-a18f-8e678d6d8e87'
);
```

### Ingleby Barwick Golf Academy (England, 1 courses)

- DB: lat=54.5301895, lon=-1.3267668, addr="Lullingstone Crescent, Stockton-on-Tees", website=null, phone=null
- OSM (medium, 312m, sim=1): name="Ingleby Barwick Golf Academy", website="https://www.inglebygolf.co.uk/", addr="Lullingstone Crescent, TS17 5GJ, Stockton-on-Tees"
- EG  (high, 171m, sim=1): name="Ingleby Barwick Golf Academy", addr="Lullingstone Crescent, Ingleby Barwick, Stockton-on-Tees", phone="01642765000"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 312m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.inglebygolf.co.uk/'
WHERE id IN (
  'c89748ee-a2cb-47a2-85d5-d3882e908bf0'
);
```

### Isle of Purbeck Golf Club (England, 2 courses)

- DB: lat=50.6367013, lon=-1.9826614, addr="Corfe Road, Swanage", website=null, phone=null
- OSM (medium, 328m, sim=1): name="Isle of Purbeck Golf Club", website="https://www.purbeckgolf.co.uk/", addr="6, BH19 3AB, Studland"
- EG  (high, 16m, sim=1): name="Isle Of Purbeck Golf Club", addr="Corfe Road, Studland, Swanage", phone="01929450361"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 328m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.purbeckgolf.co.uk/'
WHERE id IN (
  '0d4c65d0-8b47-453d-a4d6-7512fc8b3cbf',
  'ab448292-cb9e-43d3-b256-42353d34ae03'
);
```

### Ivinghoe Golf Club (England, 1 courses)

- DB: lat=51.8380059, lon=-0.6294048, addr="Wellcroft, Ivinghoe", website=null, phone=null
- OSM (medium, 295m, sim=1): name="Ivinghoe Golf Club", website="https://ivinghoegolfclub.co.uk/", addr="Wellcroft, LU7 9EF, Leighton Buzzard"
- EG  (high, 113m, sim=1): name="Ivinghoe Golf Club", addr="Wellcroft, Ivinghoe, Leighton Buzzard", phone="01296668696"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 295m, sim=1)
```sql
UPDATE courses SET
  website = 'https://ivinghoegolfclub.co.uk/'
WHERE id IN (
  'f809d00f-8793-4a6e-9628-bb40ed677c1e'
);
```

### Kenilworth Golf Club (England, 1 courses)

- DB: lat=52.3502037, lon=-1.5494868, addr="Crewe Lane, Kenilworth", website=null, phone=null
- OSM (medium, 318m, sim=1): name="Kenilworth Golf Club", website="https://www.kenilworthgolfclub.co.uk/", addr="Crewe Lane, CV8 2EA, Kenilworth"
- EG  (high, 103m, sim=1): name="Kenilworth Golf Club", addr="Crewe Lane, Kenilworth", phone="01926858517"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 318m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.kenilworthgolfclub.co.uk/'
WHERE id IN (
  '27db639e-094a-46cd-8e1a-259fdc62aa07'
);
```

### Kidderminster Golf Club (England, 1 courses)

- DB: lat=52.3809317, lon=-2.2370831, addr="Russell Road, Kidderminster", website=null, phone=null
- OSM (medium, 495m, sim=1): name="The Kidderminster Golf Club", website="https://www.thekidderminstergolfclub.com/", addr="Russell Road, DY10 3HT, Kidderminster"
- EG  (high, 124m, sim=1): name="The Kidderminster Golf Club", addr="The Club House, Russell Road, Kidderminster", phone="01562822303"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 495m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.thekidderminstergolfclub.com/'
WHERE id IN (
  '1dd54762-b1a1-44d8-ad4c-1b5ead35bb93'
);
```

### Kilworth Springs Golf Club (England, 1 courses)

- DB: lat=52.4381158, lon=-1.1000065, addr="South Kilworth Road, Lutterworth", website=null, phone=null
- OSM (medium, 339m, sim=1): name="Kilworth Springs", website="https://www.kilworthsprings.co.uk/", addr="South Kilworth Road, LE17 6HJ, North Kilworth"
- EG  (high, 5m, sim=1): name="Kilworth Springs Golf Club", addr="South Kilworth Road, North Kilworth, Lutterworth", phone="01858575082"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 339m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.kilworthsprings.co.uk/'
WHERE id IN (
  'e5c40dcd-0194-4897-ba6f-2e600e8ce9fc'
);
```

### Kingsdown Golf Club (England, 1 courses)

- DB: lat=51.4027619, lon=-2.2693829, addr="Kingsdown,   Corsham", website=null, phone=null
- OSM (medium, 352m, sim=1): name="Kingsdown Golf Club", website="https://www.kingsdowngolfclub.co.uk/", addr=null
- EG  (high, 203m, sim=1): name="Kingsdown Golf Club", addr="Kingsdown Golf Club, Kingsdown, Corsham", phone="01225743472"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 352m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.kingsdowngolfclub.co.uk/'
WHERE id IN (
  'c03e8cd3-0e0f-488b-b953-2154a60a635f'
);
```

### Kingsway Cambridge Lakes (England, 1 courses)

- DB: lat=52.1826895, lon=0.1179055, addr="Trumpington Road, Cambridge", website=null, phone=null
- OSM (medium, 478m, sim=1): name="Kingsway Cambridge Lakes Golf Course", website="https://www.kingswaygolfcentre.co.uk/cambridge/", addr="Trumpington Rd, CB2 8FA, Cambridge"
- EG  (no-match, 11536m, sim=0.5): name="Kingsway Golf Centre", addr="Cambridge Road, Melbourn, Cambridge", phone="01763262943"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 478m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.kingswaygolfcentre.co.uk/cambridge/'
WHERE id IN (
  'ac828bf1-a9d2-483a-9b74-e730ebfbed93'
);
```

### Kirtlington Golf Club (England, 2 courses)

- DB: lat=51.8673692, lon=-1.2827162, addr="Lince Lane, Kirtlington", website=null, phone=null
- OSM (medium, 483m, sim=1): name="Kirtlington Golf Club", website="https://www.kirtlingtongolfclub.com/", addr="OX5 3JY"
- EG  (medium, 368m, sim=1): name="Kirtlington Golf Club", addr="Kirtlington Golf Club, Kirtlington, Kidlington", phone="01869351133"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 483m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.kirtlingtongolfclub.com/'
WHERE id IN (
  '19a1b5b6-5930-45f1-a3c2-fab31081f07d',
  'd7796d1b-5bb9-4a6f-9f2b-a5c69655ba30'
);
```

### Lancaster Golf Club (England, 2 courses)

- DB: lat=54.0088522, lon=-2.822626, addr="Ashton Hall, Ashton-with-Stodday , Lancaster", website=null, phone=null
- OSM (medium, 401m, sim=1): name="Lancaster Golf Club", website="https://www.lancastergc.co.uk/", addr="Ashton-with-stodday, LA2 0AJ, Lancaster"
- EG  (high, 57m, sim=1): name="Lancaster Golf Club", addr="Ashton Hall, Ashton-With-Stodday, Lancaster", phone="01524751247"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 401m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.lancastergc.co.uk/'
WHERE id IN (
  '531411d2-185b-464d-9471-4ebed07096d2',
  '60ed0760-ffee-49e3-82b1-5998524be3f8'
);
```

### Lightcliffe Golf Club (England, 1 courses)

- DB: lat=53.7270298, lon=-1.7991654, addr="Knowle Top Road, Lightcliffe", website=null, phone=null
- OSM (medium, 324m, sim=1): name="Lightcliffe Golf Club", website="https://www.lightcliffegolfclub.co.uk/", addr="Knowle Top Road, HX3 8SW, Halifax"
- EG  (high, 200m, sim=1): name="Lightcliffe Golf Club", addr="Knowle Top Road, Lightcliffe, Halifax", phone="01422202459"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 324m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.lightcliffegolfclub.co.uk/'
WHERE id IN (
  'f26da0f6-42aa-49bf-b31b-b73de14c896d'
);
```

### Lindrick Golf Club (England, 1 courses)

- DB: lat=53.3372477, lon=-1.18184, addr="Deep Carrs Lane, Lindrick Worksop", website=null, phone=null
- OSM (medium, 279m, sim=1): name="Lindrick Golf Club", website="https://www.lindrickgolfclub.co.uk/", addr="Deep Carrs Lane, S81 8BH, Worksop"
- EG  (low, 672m, sim=1): name="Lindrick Golf Club", addr="Deep Carrs Lane, Lindrick, South Yorkshire, S81 8BH", phone="01909475282"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 279m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.lindrickgolfclub.co.uk/'
WHERE id IN (
  'a8eef23a-7be2-47f8-94db-dffc731b5466'
);
```

### Lingdale Golf Club (England, 1 courses)

- DB: lat=52.7118677, lon=-1.2183606, addr="Joe Moores Lane, Loughborough", website=null, phone=null
- OSM (medium, 322m, sim=1): name="Lingdale Golf Club", website="http://www.lingdalegolfclub.co.uk", addr=null
- EG  (medium, 430m, sim=1): name="Lingdale Golf Club", addr="Joe Moores Lane, Woodhouse Eaves, Loughborough", phone="01509890703"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 322m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.lingdalegolfclub.co.uk'
WHERE id IN (
  '0394a1ce-0a0c-45b7-9d39-312cd2fca14b'
);
```

### Liphook Golf Club (England, 1 courses)

- DB: lat=51.0652879, lon=-0.8121229, addr="Wheatsheaf enclosure, Liphook", website=null, phone=null
- OSM (medium, 405m, sim=1): name="Liphook Golf Club", website="https://www.liphookgolfclub.com/", addr="Wheatsheaf Enclosure, GU30 7EH, Liphook"
- EG  (low, 712m, sim=1): name="Liphook Golf Club", addr="Wheatsheaf Enclosure, Liphook", phone="01428 723271"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 405m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.liphookgolfclub.com/'
WHERE id IN (
  'a4fd8f96-430e-4a3f-89ee-71d9969255ce'
);
```

### Littlehampton Golf Club (England, 1 courses)

- DB: lat=50.8042072, lon=-0.5480486, addr="170 Rope Walk, Littlehampton", website=null, phone=null
- OSM (medium, 263m, sim=1): name="Littlehampton Golf Club", website="https://www.littlehamptongolf.co.uk/", addr="Rope Walk, 170, BN17 5DL, Littlehampton"
- EG  (medium, 275m, sim=1): name="Littlehampton Golf Club", addr="170 Rope Walk, Littlehampton", phone="01903717170"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 263m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.littlehamptongolf.co.uk/'
WHERE id IN (
  '9eaf244c-6835-4a4f-9ab7-82ea74be90f2'
);
```

### Loughton Golf Club (England, 1 courses)

- DB: lat=51.6610449, lon=0.0719217, addr="Clays Ln, Loughton", website=null, phone=null
- OSM (medium, 278m, sim=1): name="Loughton Golf Club", website="https://www.loughtongolfclub.com/", addr="Clay's Lane, IG10 2BF, Loughton"
- EG  (low, 72442m, sim=0.875): name="Boughton Golf Club", addr="Brickfield Lane, Boughton, Nr Faversham", phone="01227752277"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 278m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.loughtongolfclub.com/'
WHERE id IN (
  '8189f772-d132-49e2-84e6-7bd11116154f'
);
```

### Lyme Regis Golf Club (England, 1 courses)

- DB: lat=50.7388532, lon=-2.9286773, addr="Timber Hill, Lyme Regis", website=null, phone=null
- OSM (medium, 431m, sim=1): name="Lyme Regis Golf Club", website="https://www.lymeregisgolfclub.co.uk/", addr="Timber Hill, DT7 3HQ, Lyme Regis"
- EG  (high, 75m, sim=1): name="Lyme Regis Golf Club", addr="Timber Hill, Lyme Regis", phone="01297442963"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 431m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.lymeregisgolfclub.co.uk/'
WHERE id IN (
  '4f924863-0327-4ec7-a4aa-8c44cd44a30b'
);
```

### Magnolia Park Golf Club (England, 1 courses)

- DB: lat=51.8198939, lon=-1.1010845, addr="Arncott Road, Aylesbury", website=null, phone=null
- OSM (medium, 333m, sim=1): name="Magnolia Park", website="https://magnoliapark.co.uk/", addr=null
- EG  (no-match, 116145m, sim=0.615): name="Cannock Park Golf Club", addr="Stafford Road, Cannock", phone="01543578850"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 333m, sim=1)
```sql
UPDATE courses SET
  website = 'https://magnoliapark.co.uk/'
WHERE id IN (
  '6442d220-3fe9-4106-9659-bd8601d4bb0b'
);
```

### Mapperley Golf Club (England, 2 courses)

- DB: lat=52.9873962, lon=-1.1105373, addr="Central Avenue, Plains Road, Mapperley", website=null, phone=null
- OSM (medium, 298m, sim=1): name="Mapperley Golf Course", website="https://www.mapperleygolfclub.org/", addr=null
- EG  (high, 30m, sim=1): name="Mapperley Golf Club", addr="Central Avenue, Plains Road, Mapperley, Nottingham", phone="01159556672"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 298m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.mapperleygolfclub.org/'
WHERE id IN (
  '75e82731-2745-4ab8-8af3-ddea2c47231d',
  'd69c04d9-100d-493f-9b43-2dd5690b23bc'
);
```

### March Golf Club (England, 1 courses)

- DB: lat=52.5301301, lon=0.0671081, addr="Grange Road, March", website=null, phone=null
- OSM (medium, 303m, sim=1): name="March Golf Club", website="https://marchgolfclub.co.uk/", addr="Grange Road, PE15 0YH, March"
- EG  (high, 149m, sim=1): name="March Golf Club", addr="Frogs Abbey, Grange Road, March", phone="01354652364"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 303m, sim=1)
```sql
UPDATE courses SET
  website = 'https://marchgolfclub.co.uk/'
WHERE id IN (
  'cce061b0-3858-4156-9a14-69153cdd86c9'
);
```

### Masham Golf Club (England, 2 courses)

- DB: lat=54.2181687, lon=-1.6629475, addr="Swinton Road, Masham", website=null, phone=null
- OSM (medium, 421m, sim=1): name="Masham Golf Course", website="https://mashamgolfclub.co.uk/", addr="Swinton Road, HG4 4NS, Ripon"
- EG  (medium, 462m, sim=1): name="Masham Golf Club", addr="Burnholme, Swinton Road, Masham, Ripon", phone="01765688054"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 421m, sim=1)
```sql
UPDATE courses SET
  website = 'https://mashamgolfclub.co.uk/'
WHERE id IN (
  '413a6ea7-815b-406f-af6f-2436eb920b6e',
  '42d95595-a35c-42db-94b9-d18a272d7063'
);
```

### Mattishall Golf Club (England, 1 courses)

- DB: lat=52.6440414, lon=1.0342365, addr="South Green, Mattishall", website=null, phone=null
- OSM (medium, 410m, sim=1): name="Mattishall Golf Club", website="https://www.mattishallgolfclub.co.uk/", addr="South Green, NR20 3JZ, Mattishall"
- EG  (high, 126m, sim=1): name="Mattishall Golf Club", addr="South Green, Mattishall, Dereham", phone="01362850111"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 410m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.mattishallgolfclub.co.uk/'
WHERE id IN (
  '03e34a5f-0d7f-4ed2-aa2d-67fad6fae352'
);
```

### Mid Kent Golf Club (England, 1 courses)

- DB: lat=51.4233086, lon=0.3685978, addr="Singlewell Road, Gravesend", website=null, phone=null
- OSM (medium, 268m, sim=1): name="Mid Kent Golf Club", website="https://mkgc.co.uk/", addr="Singlewell Road, DA11 7RB, Gravesend"
- EG  (medium, 362m, sim=1): name="Mid Kent Golf Club", addr="Singlewell Road, Gravesend, Kent, DA11 7RB", phone="01474568035"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 268m, sim=1)
```sql
UPDATE courses SET
  website = 'https://mkgc.co.uk/'
WHERE id IN (
  '29dd1f6c-2877-4624-a287-65bfdc3965dd'
);
```

### Moor Allerton Golf Club (England, 9 courses)

- DB: lat=53.8700266, lon=-1.4803432, addr="Coal Road, Leeds", website=null, phone=null
- OSM (medium, 344m, sim=1): name="Moor Allerton Golf Course", website="https://moorallertongolfclub.co.uk/", addr=null
- EG  (high, 27m, sim=1): name="Moor Allerton Golf Club", addr="Coal Road, Wike, Leeds", phone="01132661154"

**Proposed UPDATE** (applied to all 9 course rows for this club, overall=medium):
  - website: from osm(medium, 344m, sim=1)
```sql
UPDATE courses SET
  website = 'https://moorallertongolfclub.co.uk/'
WHERE id IN (
  '00be0fc5-f258-4653-b159-b304ef1086ed',
  '0ae4843e-c9e7-41eb-b2f4-f24f876645a4',
  '16dc1a1a-e878-4965-85d4-26db2367b284',
  '24212678-ee0f-406d-97c9-a2dcf146e690',
  '6466c98d-b529-49c5-af14-46882f447f38',
  '74d1a555-b676-46f6-a0ee-c6a96b633a55',
  '7695b7f5-1733-4e19-acfa-551ac3925fab',
  '7aa2a64f-129b-47be-8fde-7d57b193668e',
  'e327d90e-85ba-40bd-9eba-fb0b68c2f7f0'
);
```

### Moors Valley Golf Course (England, 1 courses)

- DB: lat=50.8573635, lon=-1.8504679, addr="Horton Road, Ringwood", website=null, phone=null
- OSM (medium, 255m, sim=1): name="Moors Valley Golf Course", website="http://www.mackgolf.co.uk/moors-valley-golf-course/4", addr="Horton Road, BH24 2ET, Ringwood"
- EG  (medium, 438m, sim=1): name="Moors Valley Golf Club", addr="Horton Road, Ashley Heath, Ringwood", phone="07548479776"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 255m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.mackgolf.co.uk/moors-valley-golf-course/4'
WHERE id IN (
  'f760724d-c156-451c-9dde-19bfeef7ccf5'
);
```

### Muswell Hill Golf Club (England, 1 courses)

- DB: lat=51.6007831, lon=-0.1375036, addr="Rhodes Avenue, London", website=null, phone=null
- OSM (medium, 455m, sim=1): name="Muswell Hill Golf Club", website="https://www.muswellhillgolfclub.co.uk/", addr="Rhodes Avenue, N22 7UT, London"
- EG  (high, 95m, sim=1): name="Muswell Hill Golf Club", addr="Rhodes Avenue, London", phone="02088881764"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 455m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.muswellhillgolfclub.co.uk/'
WHERE id IN (
  '5d916461-ef90-4599-81e3-4b8488a1599a'
);
```

### Northcliffe Golf Club (England, 1 courses)

- DB: lat=53.8269714, lon=-1.8024471, addr="High Bank Lane,  West Yorkshire", website=null, phone=null
- OSM (medium, 466m, sim=1): name="Northcliffe Golf Course", website="https://www.northcliffegc.org.uk/login.php", addr=null
- EG  (medium, 307m, sim=1): name="Northcliffe Golf Club", addr="High Bank Lane, Shipley", phone="01274596731"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 466m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.northcliffegc.org.uk/login.php'
WHERE id IN (
  '8e1eb3cd-7f45-4a68-aee5-58afe79df02c'
);
```

### Nottingham City Golf Club (England, 1 courses)

- DB: lat=53.0101762, lon=-1.1987369, addr="Bulwell Hall Park, Bulwell", website=null, phone=null
- OSM (medium, 460m, sim=1): name="Nottingham City Golf Club", website="http://www.nottinghamcitygolfclub.co.uk/", addr="NG6 8LF, Nottingham"
- EG  (low, 653m, sim=1): name="Nottingham City Golf Club", addr="Bulwell Hall Park, Norwich Gardens, Bulwell, Nottingham", phone="01159272767"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 460m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.nottinghamcitygolfclub.co.uk/'
WHERE id IN (
  '4543ab55-b111-4b8d-86f6-dadfb651a932'
);
```

### Oak Leaf Golf Complex (England, 1 courses)

- DB: lat=54.6091787, lon=-1.5917652, addr="School Aycliffe Ln, Newton Aycliffe", website=null, phone=null
- OSM (medium, 498m, sim=0.938): name="Oakleaf Golf Complex", website="http://www.great-aycliffe.gov.uk/oakleafgolfcomplex/the-course.html", addr="School Aycliffe Lane, Newton Aycliffe"
- EG  (low, 395m, sim=0.438): name="Oakleaf Golf Club", addr="School Aycliffe Lane, Newton Aycliffe", phone="01325310820"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 498m, sim=0.938)
```sql
UPDATE courses SET
  website = 'http://www.great-aycliffe.gov.uk/oakleafgolfcomplex/the-course.html'
WHERE id IN (
  '02c0af95-a3a3-4af2-a9e7-79b447328cb8'
);
```

### Oak Royal Golf Club (England, 1 courses)

- DB: lat=53.7031532, lon=-2.5657167, addr="Bury Lane, Chorley", website=null, phone=null
- OSM (medium, 476m, sim=1): name="Oak Royal Golf & Country Club", website="http://www.oakroyalgolf-countryclub.co.uk", addr="Bury Lane, PR6 8SW, Chorley"
- EG  (low, 636m, sim=1): name="Oak Royal Golf & Country Club", addr="Bury Lane, Whitnell, Chorley", phone="01254831832"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 476m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.oakroyalgolf-countryclub.co.uk'
WHERE id IN (
  '1e72578d-f002-4eca-9945-a88e37546365'
);
```

### Oakland Park Golf Club (England, 1 courses)

- DB: lat=51.6266996, lon=-0.5870301, addr="THREE HOUSEHOLDS , Chalfont St Giles", website=null, phone=null
- OSM (medium, 401m, sim=1): name="Oakland Park Golf Club", website="https://www.oaklandparkgolfclub.co.uk/", addr="Three Households, HP8 4LW, Chalfont St. Giles"
- EG  (high, 103m, sim=1): name="Oakland Park Golf Club", addr="Threehouseholds, Chalfont St Giles", phone="01494871277"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 401m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.oaklandparkgolfclub.co.uk/'
WHERE id IN (
  'a3da49e1-5dd8-4999-85a6-f5ef2b377fd6'
);
```

### Oakridge Golf Club (England, 2 courses)

- DB: lat=52.5175671, lon=-1.5659656, addr="Arley Lane, Nuneaton", website=null, phone=null
- OSM (medium, 326m, sim=1): name="Oakridge Golf Club", website="https://www.oakridgegolfclub.co.uk/", addr="Arley Lane, CV10 9PH, Nuneaton"
- EG  (medium, 483m, sim=1): name="Oakridge Golf Club", addr="Arley Lane, Nuneaton", phone="01676541389"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 326m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.oakridgegolfclub.co.uk/'
WHERE id IN (
  'c7e56c72-fc26-4e1a-96ce-eec58c626a90',
  'ce5e9a70-17b8-4499-b9d3-0f5f927b3b30'
);
```

### Old Fold Manor Golf Club (England, 1 courses)

- DB: lat=51.6636108, lon=-0.2005487, addr="Old Fold Lane, Barnet", website=null, phone=null
- OSM (medium, 359m, sim=1): name="Old Fold Manor Golf Course", website="https://www.oldfoldmanor.co.uk/", addr="Old Fold Lane, EN5 4QN, Hadley Green, Barnet"
- EG  (high, 48m, sim=1): name="Old Fold Manor Golf Club", addr="Old Fold Lane, Hadley Green, Barnet", phone="02084409185"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 359m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.oldfoldmanor.co.uk/'
WHERE id IN (
  'f1085895-1f41-477c-8a0c-980cb211487f'
);
```

### Piltdown Golf Club (England, 1 courses)

- DB: lat=50.9818227, lon=0.0552396, addr="Piltdown, Uckfield", website=null, phone=null
- OSM (medium, 312m, sim=1): name="Piltdown Golf Club", website="https://www.piltdowngolfclub.co.uk/", addr="Piltdown, TN22 3XB, Uckfield"
- EG  (low, 639m, sim=1): name="Piltdown Golf Club", addr="Golf Club Lane, Piltdown, Uckfield", phone="01825722033"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 312m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.piltdowngolfclub.co.uk/'
WHERE id IN (
  '924c8d51-6218-4bd0-a38b-8c19fadbd707'
);
```

### Porthpean Golf Club (England, 1 courses)

- DB: lat=50.3229828, lon=-4.7814948, addr="Porthpean, St Austell, Camberley", website=null, phone=null
- OSM (medium, 484m, sim=1): name="Porthpean Golf Club", website="https://www.porthpeangolfclub.co.uk/", addr="PL26 6AY, Porthpean"
- EG  (low, 695m, sim=1): name="Porthpean Golf Club", addr="Porthpean, St. Austell", phone="0172664613"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 484m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.porthpeangolfclub.co.uk/'
WHERE id IN (
  'd535605f-81ff-446e-a026-1dabb2f03789'
);
```

### Prestbury Golf Club (England, 1 courses)

- DB: lat=53.280465, lon=-2.1524223, addr="Macclesfield Rd, Prestbury", website=null, phone=null
- OSM (medium, 499m, sim=1): name="Prestbury Golf Club", website="https://www.prestburygolfclub.com/", addr="Macclesfield Road, SK10 4BJ, Prestbury"
- EG  (medium, 439m, sim=1): name="Prestbury Golf Club", addr="Macclesfield Road, Prestbury, Nr Macclesfield", phone="01625828241"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 499m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.prestburygolfclub.com/'
WHERE id IN (
  'cee9958e-d34d-4bd8-9c07-f1d75da4066f'
);
```

### Princes Park Golf Course (England, 1 courses)

- DB: lat=51.4367135, lon=0.2264726, addr="Darenth Road, Dartford", website=null, phone=null
- OSM (medium, 333m, sim=1): name="Princes Park Golf Course", website="http://www.dartfordfconline.com/site/?q=pages/princes-park-golf-course", addr=null
- EG  (no-match, 261364m, sim=0.667): name="Springhead Park Golf Club", addr="Willerby Road, Hull", phone="01482363780"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 333m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.dartfordfconline.com/site/?q=pages/princes-park-golf-course'
WHERE id IN (
  '4d9eef29-1c67-414e-8c67-f1c5f24afbd7'
);
```

### Prudhoe Golf Club (England, 1 courses)

- DB: lat=54.9623593, lon=-1.8307787, addr="Eastwood Park, North West", website=null, phone=null
- OSM (medium, 289m, sim=1): name="Prudhoe Golf Club", website="https://www.prudhoegolfclub.co.uk/", addr="Eastwoods Road, NE42 5DX, Prudhoe"
- EG  (high, 2m, sim=1): name="Prudhoe Golf Club", addr="Eastwood Park, Prudhoe", phone="01661832466"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 289m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.prudhoegolfclub.co.uk/'
WHERE id IN (
  'ed61261d-1422-4413-a4ac-99077b3d8bd1'
);
```

### Queens Park (England, 1 courses)

- DB: lat=53.0950969, lon=-2.4671709, addr="Queens Park Drive, Crewe, Crewe", website=null, phone=null
- OSM (medium, 467m, sim=1): name="Queens Park Golf Club", website="https://www.qpgc.net/", addr="CW2 7SN"
- EG  (medium, 427m, sim=1): name="Queens Park Golf Club", addr="Queens Park Drive, Crewe", phone="01270666724"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 467m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.qpgc.net/'
WHERE id IN (
  '95bc5e12-3bab-4535-9ecd-bfcbacf17ca1'
);
```

### Radcliffe-On-Trent Golf Club (England, 1 courses)

- DB: lat=52.9377775, lon=-1.016827, addr="Cropwell Road, Radcliffe-on-Trent", website=null, phone=null
- OSM (medium, 474m, sim=1): name="Radcliffe-on-Trent Golf Club", website="https://www.radcliffeontrentgc.co.uk/home.aspx?i=no", addr="NG12 2JH, Nottingham"
- EG  (low, 693m, sim=1): name="Radcliffe-On-Trent Golf Club", addr="Dewberry Lane, Cropwell Road, Radcliffe-On-Trent, Nottingham", phone="01159333000"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 474m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.radcliffeontrentgc.co.uk/home.aspx?i=no'
WHERE id IN (
  'd28ad9e5-3ceb-4924-81a7-605cf571fc4f'
);
```

### Richmond Park Golf Club (England, 3 courses)

- DB: lat=52.5743194, lon=0.8164882, addr="Saham Road, Watton", website=null, phone=null
- OSM (medium, 419m, sim=1): name="Richmond Park Golf Club", website="https://www.richmondpark.co.uk/", addr="Saham Road, IP25 6EA, Thetford"
- EG  (high, 145m, sim=1): name="Richmond Park Golf Club", addr="Saham Road, Watton, Thetford", phone="01953881803"

**Proposed UPDATE** (applied to all 3 course rows for this club, overall=medium):
  - website: from osm(medium, 419m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.richmondpark.co.uk/'
WHERE id IN (
  '72bb7aeb-6a15-481f-8f50-4cab6d7a9081',
  'c0e7a4b2-7f5e-4d08-b401-63d391d69b73',
  'fbb9513b-3a52-464f-bda8-fadd60b3d21f'
);
```

### Ripon City Golf Club (England, 1 courses)

- DB: lat=54.1513837, lon=-1.5318191, addr="Palace Road, Ripon", website=null, phone=null
- OSM (medium, 397m, sim=1): name="Ripon City Golf Club", website="https://www.riponcitygolfclub.com/", addr="Palace Road, HG4 3HH, Ripon"
- EG  (high, 179m, sim=1): name="Ripon City Golf Club", addr="Palace Road, Ripon", phone="01765603640"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 397m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.riponcitygolfclub.com/'
WHERE id IN (
  'b0bd7316-2bae-467a-a5e9-c69d61558562'
);
```

### Romford Golf Club (England, 1 courses)

- DB: lat=51.5907115, lon=0.1969116, addr="Heath Drive, Romford", website=null, phone=null
- OSM (medium, 256m, sim=1): name="Romford Golf Club", website="https://www.romfordgolfclub.com/", addr="Heath Drive, RM2 5QB, Romford"
- EG  (medium, 426m, sim=1): name="Romford Golf Club", addr="Heath Drive, Gidea Park, Romford", phone="01708740986"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 256m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.romfordgolfclub.com/'
WHERE id IN (
  'ff01d9b1-5da9-440b-83f4-27aaa17fa439'
);
```

### Rookery Park Golf Club (England, 1 courses)

- DB: lat=52.4558146, lon=1.6792161, addr="Beccles Road, Carlton Colville", website=null, phone=null
- OSM (medium, 415m, sim=1): name="Rookery Park Golf Course", website="https://www.rookeryparkgolfclub.co.uk/", addr="Beccles Road, NR33 8HJ, Norwich"
- EG  (medium, 364m, sim=1): name="Rookery Park Golf Club", addr="Beccles Road, Carlton Colville, Lowestoft", phone="01502509190"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 415m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.rookeryparkgolfclub.co.uk/'
WHERE id IN (
  'f6387c17-a0dc-4853-873c-8b8deb7d282e'
);
```

### Rossendale Golf Club (England, 1 courses)

- DB: lat=53.6866094, lon=-2.3155342, addr="Ewood Lane Head, Haslingden", website=null, phone=null
- OSM (medium, 330m, sim=1): name="Rossendale Golf Club", website="https://www.rossendalegolfclub.net/", addr=null
- EG  (high, 57m, sim=1): name="Rossendale Golf Club", addr="Ewood Lane Head, Haslingden, Rossendale", phone="01706831339"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 330m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.rossendalegolfclub.net/'
WHERE id IN (
  '6c140f4d-fba0-470a-92a0-c8de253b2cef'
);
```

### Royal Eastbourne Golf Club (England, 2 courses)

- DB: lat=50.7613726, lon=0.2624783, addr="Paradise Drive, Eastbourne", website=null, phone=null
- OSM (medium, 370m, sim=1): name="The Royal Eastbourne Golf Club", website="https://www.regc.co.uk/", addr="Paradise Drive, BN20 8BP, Eastbourne"
- EG  (low, 763m, sim=1): name="Royal Eastbourne Golf Club", addr="Paradise Drive, Eastbourne", phone="01323744045"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 370m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.regc.co.uk/'
WHERE id IN (
  '27dd7667-c7b1-4ad3-b514-69e126ca58a8',
  'e2af2b5a-f73c-4723-b57e-fc378394aa4c'
);
```

### Ruislip Golf Course (England, 1 courses)

- DB: lat=51.5702857, lon=-0.4369367, addr="Ickenham Road, Hillingdon", website=null, phone=null
- OSM (medium, 472m, sim=1): name="Ruislip Golf Course", website="https://www.hillingdon.gov.uk/index.jsp?articleid=11141", addr="Ickenham Road, HA4 7DQ, Ruislip"
- EG  (no-match, 204232m, sim=0.429): name="Burslem Golf Club", addr="Wood Farm, High Lane, Stoke-on-Trent", phone="01782837006"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 472m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.hillingdon.gov.uk/index.jsp?articleid=11141'
WHERE id IN (
  'fad61abe-d4bc-4289-8b1e-aa33cc425314'
);
```

### Ryton Golf Club (England, 1 courses)

- DB: lat=54.9813528, lon=-1.7818809, addr="Clara Vale, Northern Cape", website=null, phone=null
- OSM (medium, 393m, sim=1): name="Ryton Golf Club", website="https://www.rytongolfclub.co.uk/", addr="NE40 3TD, Ryton"
- EG  (medium, 321m, sim=1): name="Ryton Golf Club", addr="Clara Vale, Ryton", phone="01914133253"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 393m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.rytongolfclub.co.uk/'
WHERE id IN (
  '8ec13601-e27b-450d-bf96-82d2c19acfe8'
);
```

### Saffron Walden Golf  Course (England, 1 courses)

- DB: lat=52.0279858, lon=0.2316703, addr="Windmill Hill, Saffron Walden", website=null, phone=null
- OSM (medium, 442m, sim=1): name="Saffron Walden Golf Club", website="https://www.swgc.com/", addr="Windmill Hill, CB10 1BX, Saffron Walden"
- EG  (medium, 281m, sim=1): name="Saffron Walden Golf Club", addr="Windmill Hill, Saffron Walden", phone="01799522786"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 442m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.swgc.com/'
WHERE id IN (
  '580c6ffb-32e8-4dbf-bb29-ccc610975f2f'
);
```

### Saltford Golf Club (England, 1 courses)

- DB: lat=51.3982413, lon=-2.4589085, addr="Golf Club Lane, Saltford", website=null, phone=null
- OSM (medium, 480m, sim=1): name="Saltford Golf Club", website="https://www.saltfordgolfclub.co.uk/", addr="Golf Club Lane, BS31 3AA, Saltford"
- EG  (medium, 255m, sim=1): name="Saltford Golf Club", addr="Golf Club Lane, Saltford, Bristol", phone="01225873513"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 480m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.saltfordgolfclub.co.uk/'
WHERE id IN (
  '087a02eb-6dc0-4f47-bf73-196b32dc00e1'
);
```

### Sedbergh Golf Club (England, 1 courses)

- DB: lat=54.311976, lon=-2.5462691, addr="Catholes-Abbott Holme  , Sedbergh", website=null, phone=null
- OSM (medium, 367m, sim=1): name="Sedbergh Golf Club", website="https://www.sedberghgolfclub.com/", addr="LA10 5SS"
- EG  (low, 621m, sim=1): name="Sedbergh Golf Club", addr="Catholes-Abbot Holme, Sedbergh", phone="01539621551"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 367m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.sedberghgolfclub.com/'
WHERE id IN (
  'c3f1c14f-0136-4391-82d7-c311905c9a4b'
);
```

### Shipley Golf Club (England, 2 courses)

- DB: lat=53.8393519, lon=-1.8357855, addr="Beckfoot Lane, Bingley", website=null, phone=null
- OSM (medium, 454m, sim=1): name="Shipley Golf Club", website="https://shipleygolf.club/", addr="Beckfoot Lane, BD16 1LX, Bingley"
- EG  (high, 46m, sim=1): name="Shipley Golf Club", addr="Beckfoot Lane, Bingley", phone="01274568652"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 454m, sim=1)
```sql
UPDATE courses SET
  website = 'https://shipleygolf.club/'
WHERE id IN (
  '67ec781e-af2f-463d-9c19-85eade36aa08',
  'c6bdbd76-9c52-492a-8887-71d3078c7eb8'
);
```

### Shortlands Golf Club (England, 1 courses)

- DB: lat=51.4071473, lon=0.0025946, addr="Meadow Road, Shortlands", website=null, phone=null
- OSM (medium, 449m, sim=1): name="Shortlands Golf Club", website="https://www.shortlandsgolfclub.com/", addr="Ravensbourne Avenue, BR2 0BP, Bromley"
- EG  (high, 167m, sim=1): name="Shortlands Golf Club", addr="Ravensbourne Avenue, Shortlands", phone="02084608828"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 449m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.shortlandsgolfclub.com/'
WHERE id IN (
  'ea63f242-3954-49c4-8eea-6fe236da9c8c'
);
```

### Shrivenham Park Golf Club (England, 1 courses)

- DB: lat=51.6054246, lon=-1.6571465, addr="Pennyhooks Lane, Shrivenham", website=null, phone=null
- OSM (medium, 473m, sim=1): name="Shrivenham Park Golf Club", website="http://www.shrivenhampark.com/", addr="Pennyhooks Lane, SN6 8EX, Swindon"
- EG  (high, 240m, sim=1): name="Shrivenham Park Golf Club", addr="Pennyhooks Lane, Shrivenham, Swindon", phone="01793783853"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 473m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.shrivenhampark.com/'
WHERE id IN (
  '57f95d33-5668-46ea-aad1-507a6e0ac6f1'
);
```

### Skipton Golf Club (England, 1 courses)

- DB: lat=53.9706087, lon=-2.0181368, addr="Short Lee Lane, Skipton", website=null, phone=null
- OSM (medium, 460m, sim=1): name="Skipton Golf Club", website="https://www.skiptongolfclub.co.uk/", addr="Short Lee Lane, BD23 3LF, Skipton"
- EG  (high, 226m, sim=1): name="Skipton Golf Club", addr="Short Lee Lane, Skipton", phone="01756795657"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 460m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.skiptongolfclub.co.uk/'
WHERE id IN (
  '2205b9f6-509d-4f64-af2d-db90fcc39447'
);
```

### Slayley Hall (England, 1 courses)

- DB: lat=54.8959831, lon=-2.0166707, addr="Slaley, Hexham", website=null, phone=null
- OSM (medium, 451m, sim=0.917): name="Slaley Hall Golf Club", website="https://www.slaleyhallhotel.com/golf/", addr=null
- EG  (high, 132m, sim=0.917): name="Slaley Hall Golf Club", addr="Slaley, Hexham", phone="01434676525"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 451m, sim=0.917)
```sql
UPDATE courses SET
  website = 'https://www.slaleyhallhotel.com/golf/'
WHERE id IN (
  '8428d5a5-9940-4c1a-962d-94d292400810'
);
```

### Solent Meads Golf Centre (England, 1 courses)

- DB: lat=50.7220334, lon=-1.7778863, addr="Rolls Drive, Bournemouth", website=null, phone=null
- OSM (medium, 308m, sim=1): name="Solent Meads Golf Centre", website="https://www.solentmeads.com/", addr="Broadway, BH23 1BD, Bournemouth"
- EG  (low, 270m, sim=0.632): name="Solent Meads Golf Course", addr="Rolls Drive, Bournemouth, Dorset, BH6 4NA", phone="01202420795"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 308m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.solentmeads.com/'
WHERE id IN (
  'c8cb9c7e-a0e7-441c-8183-e45ef859bc7f'
);
```

### Somerley Park Golf Club (England, 2 courses)

- DB: lat=50.874159, lon=-1.8234635, addr="Nea Drive, Ringwood", website=null, phone=null
- OSM (medium, 265m, sim=1): name="Somerley Park Golf Club", website="https://www.somerleyparkgolfclub.co.uk/", addr="Nea Drive"
- EG  (low, 14902m, sim=0.846): name="Merley Park Golf Course", addr="Merley Park Road, Ashington, Broadstone, Wimborne", phone="01202 885773"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 265m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.somerleyparkgolfclub.co.uk/'
WHERE id IN (
  '80c366a2-0b3b-45f6-8a34-6518f5590f6b',
  'ce50c36e-8ed8-458a-a770-c36ed7cb7c5e'
);
```

### South Staffordshire Golf Club (England, 1 courses)

- DB: lat=52.6038025, lon=-2.1715373, addr="Danescourt Rd, Wolverhampton", website=null, phone=null
- OSM (medium, 416m, sim=1): name="The South Staffordshire Golf Club", website="https://www.southstaffordshiregolfclub.co.uk/", addr="Danescourt Road, WV6 9BQ, Wolverhampton"
- EG  (high, 59m, sim=1): name="The South Staffordshire Golf Club", addr="Danescourt Road, Tettenhall Regis, Wolverhampton", phone="01902751065"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 416m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.southstaffordshiregolfclub.co.uk/'
WHERE id IN (
  'fb9136e2-5bce-4dcf-8d6b-8e0d9c5d05a6'
);
```

### Southport Old Links (England, 1 courses)

- DB: lat=53.6532043, lon=-2.9575643, addr="Moss Lane, Southport", website=null, phone=null
- OSM (medium, 472m, sim=1): name="Southport Old Links Golf Club", website="http://www.southportoldlinksgolfclub.co.uk/", addr="Moss Lane, PR9 7QS, Southport"
- EG  (medium, 261m, sim=1): name="Southport Old Links Golf Club", addr="Moss Lane, Southport", phone="01704 228207"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 472m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.southportoldlinksgolfclub.co.uk/'
WHERE id IN (
  'e0d2eceb-8b9d-4c4d-af65-46ba76fe1926'
);
```

### Stapleford Abbotts Golf Club (England, 1 courses)

- DB: lat=51.6383437, lon=0.2092485, addr="Horsemanside, Stapleford Abbotts", website=null, phone=null
- OSM (medium, 343m, sim=1): name="Stapleford Abbotts Golf Course", website="https://staplefordabbottsgolf.co.uk/", addr="Horseman Side, RM4 1JU, Stapleford Abbotts"
- EG  (low, 977m, sim=1): name="Stapleford Abbotts Golf Club", addr="Horseman Side, Stapleford Abbotts", phone="01708381108"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 343m, sim=1)
```sql
UPDATE courses SET
  website = 'https://staplefordabbottsgolf.co.uk/'
WHERE id IN (
  '8715649b-434b-4a83-968c-a4946f298cea'
);
```

### Sturminster Marshall Golf Club (England, 1 courses)

- DB: lat=50.7964465, lon=-2.072146, addr="Moor Lane, Sturminster Marshall", website=null, phone=null
- OSM (medium, 271m, sim=1): name="Sturminster Marshall Golf Club", website="http://www.smgc.eu/", addr="Moor Lane, BH21 4BD, Sturminster Marshall"
- EG  (high, 165m, sim=1): name="Sturminster Marshall Golf Club", addr="Moor Lane, Sturminster Marshall", phone="01258858444"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 271m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.smgc.eu/'
WHERE id IN (
  '839e3ab1-f2a6-477a-ae52-88313c476230'
);
```

### Swaffham Golf Club (England, 1 courses)

- DB: lat=52.6312338, lon=0.6720934, addr="Cley road, Swaffham", website=null, phone=null
- OSM (medium, 490m, sim=1): name="Swaffham Golf Club", website="http://www.club-noticeboard.co.uk/swaffham/", addr="Cley Road, PE37 8AE, Swaffham"
- EG  (high, 213m, sim=1): name="Swaffham Golf Club", addr="Cley Road, Swaffham", phone="01760721621"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 490m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.club-noticeboard.co.uk/swaffham/'
WHERE id IN (
  'd08fe19d-ae35-48ad-a9a7-9089f6944aeb'
);
```

### Thames Ditton and Esher Golf Club (England, 1 courses)

- DB: lat=51.3787876, lon=-0.3476532, addr="Portsmouth Road, Esher", website=null, phone=null
- OSM (medium, 294m, sim=1): name="Thames Ditton and Esher Golf Club", website="https://thamesdittonandeshergolfclub.com/", addr="Portsmouth Road, KT10 9AL, Esher"
- EG  (high, 130m, sim=0.826): name="Thames Ditton & Esher Golf Club", addr="Portsmouth Road, Esher", phone="02083981551"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 294m, sim=1)
```sql
UPDATE courses SET
  website = 'https://thamesdittonandeshergolfclub.com/'
WHERE id IN (
  'cd283adb-9ac8-4468-908d-9114a4391d97'
);
```

### The Darlington Golf Club (England, 1 courses)

- DB: lat=54.5530472, lon=-1.5316349, addr="Haughton Grange, Darlington", website=null, phone=null
- OSM (medium, 268m, sim=1): name="Darlington Golf Course", website="https://www.darlington-gc.co.uk/", addr="Haughton Grange, DL1 3JD, Darlington"
- EG  (high, 245m, sim=1): name="Darlington Golf Club", addr="Haughton Grange, Darlington", phone="01325355324"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 268m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.darlington-gc.co.uk/'
WHERE id IN (
  'd79c1784-e535-4c00-a3c7-81af407d9b48'
);
```

### The Drift golf Club (England, 1 courses)

- DB: lat=51.2869576, lon=-0.4313342, addr="The Drift, East Horsley", website=null, phone=null
- OSM (medium, 378m, sim=1): name="The Drift Golf Club", website="https://www.driftgolfclub.com", addr="KT24 5HD, Leatherhead"
- EG  (high, 249m, sim=1): name="Drift Golf Club", addr="The Drift, East Horsley", phone="01483284641"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 378m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.driftgolfclub.com'
WHERE id IN (
  'c69aae60-87bd-4b7e-bfc0-c4aa3f8bd5e5'
);
```

### The South Buckinghamshire Golf Club (England, 1 courses)

- DB: lat=51.5410407, lon=-0.6040271, addr="Park Rd, Stoke Poges", website=null, phone=null
- OSM (medium, 355m, sim=1): name="The South Buckinghamshire Golf Course", website="https://www.thesouthbuckinghamshire.co.uk/", addr="Park Road, SL2 4PJ, Slough"
- EG  (high, 202m, sim=1): name="The South Buckinghamshire", addr="Park Road, Stoke Poges, Slough", phone="01753643332"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 355m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.thesouthbuckinghamshire.co.uk/'
WHERE id IN (
  'ae10189b-2f2a-4029-be04-fc110a55d3a5'
);
```

### The Warrington Golf Club (England, 1 courses)

- DB: lat=53.3574604, lon=-2.5784812, addr="London Road, Warrington", website=null, phone=null
- OSM (medium, 488m, sim=1): name="Warrington Golf Club", website="https://www.warringtongolfclub.co.uk", addr="London Road, WA4 5HR, Warrington"
- EG  (medium, 362m, sim=1): name="Warrington Golf Club", addr="London Road, Warrington", phone="01925261775"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 488m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.warringtongolfclub.co.uk'
WHERE id IN (
  'a323f603-95be-4d56-ae2f-44d8cd32f0b5'
);
```

### The York Golf Club (England, 2 courses)

- DB: lat=54.0369023, lon=-1.02327, addr="Lords Moor Lane, Strensall", website=null, phone=null
- OSM (medium, 387m, sim=1): name="York Golf Club", website="https://www.yorkgolfclub.co.uk/", addr="YO32 5XF, Strensall"
- EG  (high, 97m, sim=1): name="York Golf Club", addr="Lords Moor Lane, Strensall, York", phone="01904491840"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 387m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.yorkgolfclub.co.uk/'
WHERE id IN (
  '0167dca8-643f-44e7-8bee-15ba78e11be5',
  '83b1a3c4-750c-4243-aebe-f07d704b3047'
);
```

### Thorne Golf Club (England, 1 courses)

- DB: lat=53.6031313, lon=-0.9782159, addr=" Kirton Lane, Thorne", website=null, phone=null
- OSM (medium, 393m, sim=1): name="Thorne Golf Club", website="https://www.thornegolf.co.uk/", addr="Kirton Lane, DN8 5RJ, Doncaster"
- EG  (high, 56m, sim=1): name="Thorne Golf Club", addr="Kirton Lane, Thorne", phone="01405812084"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 393m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.thornegolf.co.uk/'
WHERE id IN (
  '4e4d25f8-bacc-46d5-96ff-49603abd36f0'
);
```

### Wanstead Golf Club (England, 1 courses)

- DB: lat=51.5709874, lon=0.0284216, addr="Overton Drive, Wanstead", website=null, phone=null
- OSM (medium, 297m, sim=1): name="Wanstead Golf Club", website="http://www.wansteadgolf.org.uk/", addr="Overton Drive, E11 2LW, London"
- EG  (low, 361m, sim=0.2): name="WGC London Golf Club", addr="Overton Drive, Wanstead", phone=null

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 297m, sim=1)
```sql
UPDATE courses SET
  website = 'http://www.wansteadgolf.org.uk/'
WHERE id IN (
  '77358f7c-ba56-42b4-88d3-d4d74f716433'
);
```

### Waterlooville Golf Club (England, 1 courses)

- DB: lat=50.8929936, lon=-1.0079605, addr="Cherry Tree Avenue, Cowplain", website=null, phone=null
- OSM (medium, 364m, sim=1): name="Waterlooville Golf Course", website="https://waterloovillegolfclub.com", addr=null
- EG  (high, 148m, sim=1): name="Waterlooville Golf Club", addr="Cherry Tree Avenue, Cowplain, Waterlooville", phone="02392263388"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 364m, sim=1)
```sql
UPDATE courses SET
  website = 'https://waterloovillegolfclub.com'
WHERE id IN (
  '702e8886-dd9f-4b02-9b96-9be19417937e'
);
```

### Welwyn Garden City (England, 1 courses)

- DB: lat=51.8026925, lon=-0.2198849, addr="High Oaks Road, Welwyn Garden City", website=null, phone=null
- OSM (medium, 347m, sim=1): name="Welwyn Garden City Golf Club", website="https://www.welwyngardencitygolfclub.co.uk/", addr="High Oaks Road, AL8 7BP, Welwyn Garden City"
- EG  (high, 104m, sim=1): name="Welwyn Garden City Golf Club", addr="Mannicotts, High Oaks Road, Welwyn Garden City", phone="01707325243"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 347m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.welwyngardencitygolfclub.co.uk/'
WHERE id IN (
  '2a825d43-96fe-4ea5-aebb-125fcb37a210'
);
```

### West Berkshire Golf Club (England, 2 courses)

- DB: lat=51.481788, lon=-1.4154944, addr="Hangman's Stone Lane, Newbury", website=null, phone=null
- OSM (medium, 310m, sim=1): name="The West Berkshire Golf Club", website="https://www.thewbgc.co.uk/", addr="RG20 7DU, Chaddleworth"
- EG  (medium, 410m, sim=1): name="The West Berkshire Golf Club", addr="Chaddleworth, Newbury", phone="01488638574"

**Proposed UPDATE** (applied to all 2 course rows for this club, overall=medium):
  - website: from osm(medium, 310m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.thewbgc.co.uk/'
WHERE id IN (
  '6f78bc2d-eba2-4bec-bc00-bc2f44c79370',
  '7e0eae26-156f-4d07-86cd-8a4dbc96037f'
);
```

### West Kent Golf Club (England, 1 courses)

- DB: lat=51.3331331, lon=0.0417076, addr="Milking Lane, Downe", website=null, phone=null
- OSM (medium, 274m, sim=1): name="West Kent Golf Club", website="https://www.wkgc.co.uk/", addr=null
- EG  (high, 88m, sim=1): name="West Kent Golf Club", addr="Milking Lane, Downe", phone="01689851323"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 274m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.wkgc.co.uk/'
WHERE id IN (
  '2f356234-7c66-41b8-8efa-8ca63696874a'
);
```

### Westgate And Birchington Golf Club (England, 1 courses)

- DB: lat=51.380183, lon=1.3195048, addr="176 Canterbury Road, Westgate On Sea", website=null, phone=null
- OSM (medium, 294m, sim=1): name="Westgate and Birchington Golf Club", website="https://westgate-and-birchington-golfclub.co.uk/", addr="Canterbury Road, 176, CT8 8LT, Westgate-on-Sea, Kent"
- EG  (low, 830m, sim=0.833): name="Westgate & Birchington Golf Club", addr="Canterbury Road, Westgate-on-Sea", phone="01843831115"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 294m, sim=1)
```sql
UPDATE courses SET
  website = 'https://westgate-and-birchington-golfclub.co.uk/'
WHERE id IN (
  '62c05dd5-2b14-48f0-9c7b-60c70e352178'
);
```

### Whickham Golf Club (England, 1 courses)

- DB: lat=54.9261759, lon=-1.7081497, addr="Hollinside Park, Fellside Road, Whickham", website=null, phone=null
- OSM (medium, 304m, sim=1): name="Whickham Golf Club", website="https://www.whickhamgolfclub.co.uk/Intro.aspx", addr="Fellside Road, NE16 5BA, Newcastle upon Tyne"
- EG  (low, 864m, sim=1): name="Whickham Golf Club", addr="Hollinside Park, Fellside Road, Whickham, Newcastle upon Tyne", phone="01914881576"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 304m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.whickhamgolfclub.co.uk/Intro.aspx'
WHERE id IN (
  'b3babd29-6cc4-4cbe-a346-63a710ddf526'
);
```

### Wildernesse Golf Club (England, 1 courses)

- DB: lat=51.2806084, lon=0.2217194, addr="Park Lane, Seal", website=null, phone=null
- OSM (medium, 312m, sim=1): name="Wildernesse Club", website="https://www.wildernesse.co.uk/", addr="TN15 0JE, Sevenoaks"
- EG  (medium, 254m, sim=1): name="Wildernesse Golf Club", addr="Seal, Sevenoaks", phone="01732761199"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 312m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.wildernesse.co.uk/'
WHERE id IN (
  '01e01fe6-c80c-4e34-b659-cb15776f75a8'
);
```

### Wimbledon Park Golf Club (England, 1 courses)

- DB: lat=51.432801, lon=-0.2067157, addr="Home Park Road, London", website=null, phone=null
- OSM (medium, 288m, sim=1): name="Wimbledon Park Golf Club", website="https://www.wpgc.co.uk/", addr="Home Park Road, SW19 7HR, London"
- EG  (no-match, 1230m, sim=0.643): name="The Club - Wimbledon", addr="Level 2, Wimbledon Quarter, 4 Queens Road, Wimbledon", phone="07724 547331"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 288m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.wpgc.co.uk/'
WHERE id IN (
  'b8ac1c07-49d6-4af5-8b52-3c8b2374b35f'
);
```

### Windermere Golf Club (England, 1 courses)

- DB: lat=54.3591828, lon=-2.8914054, addr="Cleabarrow, Windermere", website=null, phone=null
- OSM (medium, 495m, sim=1): name="Windermere Golf Club", website="https://www.windermeregolfclub.co.uk/", addr="LA23 3NB, Windermere"
- EG  (medium, 265m, sim=1): name="Windermere Golf Club", addr="Cleabarrow, Windermere", phone="015394 43123"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 495m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.windermeregolfclub.co.uk/'
WHERE id IN (
  'f8b90367-07ae-4b56-a6b3-9673629eb5c3'
);
```

### Windlesham Golf Club (England, 1 courses)

- DB: lat=51.3680671, lon=-0.6838364, addr="Grove End, Bagshot", website=null, phone=null
- OSM (medium, 398m, sim=1): name="Windlesham Golf Club", website="https://www.windleshamgolf.com/", addr="Grove End, GU19 5HY, Bagshot"
- EG  (high, 178m, sim=1): name="Windlesham Golf Club", addr="Grove End, Bagshot", phone="01276452220"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 398m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.windleshamgolf.com/'
WHERE id IN (
  '2c5c76b0-5c63-41de-ba19-b0792cb453d8'
);
```

### Withernsea Golf Club (England, 1 courses)

- DB: lat=53.7224861, lon=0.0322098, addr="Egroms Lane, Withernsea", website=null, phone=null
- OSM (medium, 264m, sim=1): name="Withernsea Golf Club", website="https://www.withernseagolfclub.co.uk/", addr="Egroms Lane, HU19 2NA, Withernsea"
- EG  (high, 175m, sim=1): name="Withernsea Golf Club", addr="Egroms Lane, Withernsea", phone="01964612078"

**Proposed UPDATE** (applied to all 1 course rows for this club, overall=medium):
  - website: from osm(medium, 264m, sim=1)
```sql
UPDATE courses SET
  website = 'https://www.withernseagolfclub.co.uk/'
WHERE id IN (
  '341d70fd-e078-4278-bfbd-dbc8e4abb119'
);
```

## Low confidence (manual decision)

## No match found in OSM or EG

- Alnesbourne Priory Golf Club (England, 1 courses) — DB lat=52.0579324, lon=1.1528095
- Alvaston Hall (England, 1 courses) — DB lat=53.125009, lon=-2.4809622
- Aqualate Golf Club (England, 1 courses) — DB lat=51.3588993, lon=-0.1427586
- Ashbury Hotel Golf Courses (England, 5 courses) — DB lat=50.7313339, lon=-4.0430992
- Balbirnie Park Golf Course (England, 1 courses) — DB lat=52.6351134, lon=-1.1977782
- Battle Golf Club (England, 1 courses) — DB lat=50.9300931, lon=0.4721668
- Beachlands Golf Course (England, 1 courses) — DB lat=50.7852289, lon=-0.9882782
- Benone Tourist Complex (England, 1 courses) — DB lat=null, lon=null
- Bishop Park (England, 1 courses) — DB lat=53.5935757, lon=-2.0388361
- Bowenhurst Golf Center (England, 1 courses) — DB lat=51.2468139, lon=-0.8741736
- Bridgend Golf and Footgolf (England, 1 courses) — DB lat=54.2285564, lon=-0.3675159
- Brooklands Golf Center (England, 1 courses) — DB lat=50.8170364, lon=-0.3351979
- Burlish Meadows (England, 1 courses) — DB lat=52.3559384, lon=-2.2814454
- Burnley Golf Club Glen View (England, 1 courses) — DB lat=53.7313748, lon=-2.1504582
- Bushey Hall Golf Club (England, 1 courses) — DB lat=51.6552103, lon=-0.3769134
- Caldecott Hall Hotel, Golf and Leisure (England, 2 courses) — DB lat=52.5411458, lon=1.6354396
- Cedar Falls Golf Course (England, 1 courses) — DB lat=51.0671726, lon=-3.195169
- Charnock Brow Golf Club (England, 1 courses) — DB lat=53.6998919, lon=-2.6395184
- Clare Park Lake Golf Course (England, 1 courses) — DB lat=52.0722714, lon=0.5697647
- Cluny Activities (England, 1 courses) — DB lat=53.6965476, lon=-1.4032638
- Crail Golfing Society (England, 2 courses) — DB lat=51.2377448, lon=-0.2064025
- Cromwell Golf Club (England, 1 courses) — DB lat=52.293104, lon=-0.2545564
- Cullen Links Golf Club (England, 1 courses) — DB lat=54.6600485, lon=-1.2261249
- De Vere Staverton Estate - Golf & Leisure Club (England, 1 courses) — DB lat=52.2473722, lon=-1.1560219
- Deangate Ridge (England, 1 courses) — DB lat=51.4296471, lon=0.5383919
- Dumbarnie Golf Links (England, 1 courses) — DB lat=53.8942472, lon=-0.3476196
- Dundrennan (England, 1 courses) — DB lat=54.8923364, lon=-1.5285183
- Elemore Golf Club (England, 1 courses) — DB lat=54.8072459, lon=-1.4530222
- Embankment Golf Club (England, 1 courses) — DB lat=52.2910238, lon=-0.681187
- Entry Hill Golf Course (England, 1 courses) — DB lat=51.3634369, lon=-2.3650548
- Fairlop Waters and Country Park (England, 2 courses) — DB lat=51.6079785, lon=0.1138925
- Gleneagles Golf Course (England, 5 courses) — DB lat=54.7621723, lon=-1.5904909
- Golf World Stansted (England, 1 courses) — DB lat=51.885277, lon=0.1505809
- Goosnargh Golf (England, 1 courses) — DB lat=53.8476049, lon=-2.6489514
- Grimsby Golf Centre & FootGolf (England, 1 courses) — DB lat=53.5639224, lon=-0.0964294
- Grove Golf & Bowl (England, 3 courses) — DB lat=53.8626382, lon=-2.7459493
- Gubeon  Golf Club (England, 1 courses) — DB lat=55.1437311, lon=-1.7307174
- Hainault Forest Golf Complex (England, 2 courses) — DB lat=51.6181932, lon=0.1150115
- Hassocks Golf Club (England, 1 courses) — DB lat=50.928717, lon=-0.148743
- Haven Kent Coast Holiday Park (England, 1 courses) — DB lat=51.4212975, lon=0.8488207
- Hawkhurst Golf  Squash Club (England, 1 courses) — DB lat=51.0487228, lon=0.4858433
- Hayle Golf Club Short Hole (England, 1 courses) — DB lat=50.1766234, lon=-5.3896298
- Hazelwood Golf Course (England, 1 courses) — DB lat=51.408482, lon=-0.4171994
- High Farm Holiday Park, Yorkshire (England, 1 courses) — DB lat=53.8445141, lon=-0.4122894
- Hoddom Castle Caravan Park (England, 1 courses) — DB lat=51.3960214, lon=-0.5269683
- Hollinwell Notts Golf Club (England, 1 courses) — DB lat=52.9548019, lon=-1.1662891
- Hopeman Golf Club (England, 1 courses) — DB lat=51.3654415, lon=-0.4554804
- Horncastle Golf & Recuperation (England, 1 courses) — DB lat=53.2088093, lon=-0.1163752
- Horwich Golf Club (England, 1 courses) — DB lat=53.5939584, lon=-2.5406095
- Hurst Golf Course (England, 1 courses) — DB lat=51.4513959, lon=-0.9663526
- Hylands Golf Complex (England, 2 courses) — DB lat=51.6822618, lon=0.4011259
- JTSMonty (England, 1 courses) — DB lat=51.5327937, lon=-0.2012253
- Jubilee Course (England, 1 courses) — DB lat=54.5662532, lon=-1.2849337
- Lakeview Country Club (England, 1 courses) — DB lat=51.3405006, lon=-2.3012132
- Lambrook School (England, 1 courses) — DB lat=51.4349409, lon=-0.7154749
- Lilliardsedge Holiday Park (England, 1 courses) — DB lat=50.9553083, lon=-1.1997771
- Links Golf Club (England, 1 courses) — DB lat=52.2088267, lon=0.1417096
- Lochgoilhead Golf Course (England, 1 courses) — DB lat=51.5940363, lon=-1.769174
- Lochmaben Golf Club (England, 1 courses) — DB lat=55.1224656, lon=-3.4486922
- Lofthouse Hill Golf Club (England, 1 courses) — DB lat=53.7242794, lon=-1.4963744
- Macdonald Cardrona Golf Course (England, 1 courses) — DB lat=53.4501195, lon=0.1317054
- Marriott Sprowston Manor Golf Club (England, 1 courses) — DB lat=52.6566247, lon=1.3197468
- Maxey Golf Course (England, 1 courses) — DB lat=52.6570054, lon=-0.3530181
- Maylands Golf And Country Club (England, 1 courses) — DB lat=51.5951119, lon=0.2209889
- Mile End Golf Club (England, 1 courses) — DB lat=52.843467, lon=-3.0228709
- Monxton & Grateley Golf Centre (England, 1 courses) — DB lat=51.2105426, lon=-1.5142382
- Moon and sixpence (England, 1 courses) — DB lat=52.2727006, lon=0.2941308
- Mount Pleasant Golf Club and Course (England, 1 courses) — DB lat=52.0027139625255, lon=-0.316935519471564
- Mount Pleasant View (England, 1 courses) — DB lat=52.0023603, lon=-0.3170639
- Mount Skip Hebden Bridge Golf Club (England, 1 courses) — DB lat=53.7406425, lon=-2.0092336
- Mousehold  (England, 1 courses) — DB lat=52.6411863, lon=1.3204902
- Muirkirk (England, 1 courses) — DB lat=51.4398419, lon=-0.0087986
- Murrayshall Golf Course (England, 2 courses) — DB lat=51.7541905, lon=-2.2857965
- N1Golf (England, 1 courses) — DB lat=52.7724143, lon=-1.5789575
- Newbury Racecourse (England, 1 courses) — DB lat=51.3992778, lon=-1.308242
- Newton St Cyres Golf Club (England, 1 courses) — DB lat=50.7876641, lon=-3.5822543
- Noak Hill (England, 1 courses) — DB lat=51.6216658, lon=0.2271257
- North Luffenham Golf Club (England, 1 courses) — DB lat=52.5913112, lon=-0.7107024
- North Wales Golf Course and Driving Range (England, 1 courses) — DB lat=53.4984847, lon=-0.0715837
- North Weald Village Par 3 (England, 1 courses) — DB lat=51.7081008, lon=0.1298576
- Northampton Golf Club / Harlestone Park (England, 1 courses) — DB lat=52.2418873, lon=-0.9166848
- Old Joes Golf Club (England, 1 courses) — DB lat=51.5521887, lon=-0.2993264
- Old Padeswood Golf Club (England, 1 courses) — DB lat=52.8515198, lon=-1.3325381
- Pennard Golf Club (England, 1 courses) — DB lat=51.1083002, lon=-0.1905697
- Pennyhill Park (England, 1 courses) — DB lat=51.3505772, lon=-0.7099361
- Peover Golf club (England, 1 courses) — DB lat=53.2678148, lon=-2.4083066
- Pewit Golf Club (England, 1 courses) — DB lat=52.9706232, lon=-1.3168101
- Pirbright Golf Course (England, 1 courses) — DB lat=51.3009713, lon=-0.6557587
- Pontefract Park Golf Club (England, 1 courses) — DB lat=53.7065789, lon=-1.3299565
- Portmore Golf Club (England, 2 courses) — DB lat=51.0709959, lon=-4.0452375
- Priory Golf Centre (England, 1 courses) — DB lat=52.5525197, lon=0.0143359
- RAF Coningsby Golf Club (England, 1 courses) — DB lat=53.1187166, lon=-0.187729
- RAF Lakenheath Golf Club (England, 1 courses) — DB lat=52.4165983, lon=0.5268354
- RAF Marham Golf Club (England, 1 courses) — DB lat=52.6486947, lon=0.5546295
- Redhill And Reigate Golf Club (England, 1 courses) — DB lat=51.2303055, lon=-0.1749651
- Renishaw Park Golf Club (England, 1 courses) — DB lat=53.3031938, lon=-1.3368746
- RHGC 12 (England, 1 courses) — DB lat=51.5725877, lon=0.6464426
- Ribby Hall Village (England, 1 courses) — DB lat=53.7780037, lon=-2.9105068
- Riverside Family Golf Centre - N1Golf (England, 1 courses) — DB lat=52.9414063, lon=-1.1724878
- Rokers Golf Course (England, 1 courses) — DB lat=51.2659885, lon=-0.6196927
- Roundwood Hall Pay and Play Golf Club (England, 1 courses) — DB lat=51.1559752, lon=1.0511153
- Royal Dymock Grange Golf Club (England, 1 courses) — DB lat=52.0004491, lon=-2.465637
- Rusper Golf Club (England, 1 courses) — DB lat=51.1372146, lon=-0.2787876
- Ruthin-Pwllglas Golf Club (England, 1 courses) — DB lat=51.4824791, lon=0.0185813
- Rye Jubilee Course (England, 1 courses) — DB lat=50.9335416, lon=0.7337366
- Sandilands Golf Course (England, 1 courses) — DB lat=53.2902003, lon=0.3029338
- Severn Meadows Golf Club (England, 1 courses) — DB lat=52.4485723, lon=-2.3823613
- Shelthorpe Golf Course (England, 1 courses) — DB lat=51.4622779, lon=-0.0999412
- Silk Willoughby Golf Course (England, 1 courses) — DB lat=52.9834653, lon=-0.4244109
- Silsden Golf Club (England, 1 courses) — DB lat=53.9107187, lon=-1.9086489
- Sittingbourne Golf Centre  (England, 1 courses) — DB lat=51.3446568, lon=0.7765039
- Southern Valley Golf Club (England, 1 courses) — DB lat=51.4057558, lon=0.4056507
- St. Michaels Golf Club (England, 1 courses) — DB lat=51.6122157, lon=-1.8202498
- Strathendrick Golf Club (England, 1 courses) — DB lat=54.5162546, lon=-1.5061809
- Strathlene Golf Club (England, 1 courses) — DB lat=51.4949016, lon=-0.1466879
- Swadlincote Family Golf Centre (England, 1 courses) — DB lat=52.7706519, lon=-1.5826755
- Swifts Golf Club (England, 1 courses) — DB lat=54.8988087, lon=-2.9334406
- Taunton Vale Golf Club (England, 2 courses) — DB lat=51.0248781, lon=-3.0724071
- Tea Green Golf (England, 1 courses) — DB lat=51.0408604, lon=-4.2375941
- Thamesview Golf Centre (England, 1 courses) — DB lat=51.5104295, lon=0.1335165
- The Ardminnan Group (England, 1 courses) — DB lat=52.4150662, lon=0.7291029
- The County Golf Club (England, 1 courses) — DB lat=50.9063046, lon=-1.4060491
- The Ingol Village Golf Club (England, 1 courses) — DB lat=53.7890293, lon=-2.7420868
- The Laurels (England, 1 courses) — DB lat=53.734895, lon=-2.7077114
- The Machrie (England, 1 courses) — DB lat=50.7985353, lon=4.3424823
- The Mere Golf Resort (England, 1 courses) — DB lat=53.3022218, lon=-2.50099
- The Plassey Golf Club (England, 2 courses) — DB lat=51.7137892, lon=0.5066203
- The Staffordshire Golf Club (England, 1 courses) — DB lat=52.4597385, lon=-2.1604157
- The Warren Estate (England, 1 courses) — DB lat=51.7371091, lon=0.6202466
- Tillicoultry (England, 1 courses) — DB lat=52.4030308, lon=0.2910422
- Torphins Golf Club (England, 1 courses) — DB lat=51.4608741, lon=-0.9972714
- Twelve Oaks Golf Club (England, 1 courses) — DB lat=51.6308675, lon=-1.7119231
- Ullesthorpe  Golf Club (England, 1 courses) — DB lat=52.5015317, lon=-1.2476671
- Uphall Golf Club (England, 1 courses) — DB lat=51.6859049, lon=-0.0333212
- Waterbeach Golf Club (England, 1 courses) — DB lat=52.272251, lon=0.1819618
- Wenvoe Castle Golf Club (England, 1 courses) — DB lat=52.6748205, lon=1.3726118
- West Suffolk Golf Course (England, 1 courses) — DB lat=52.3685799, lon=0.4886509
- Western Park Golf Club (England, 1 courses) — DB lat=52.6332371, lon=-1.1955322
- Wheathampstead Golf Village (England, 1 courses) — DB lat=51.7619205, lon=-0.3343104
- Whitecraigs Golf Club (England, 2 courses) — DB lat=55.7844115, lon=-4.3171509
- Whitehill House (England, 1 courses) — DB lat=51.8347988, lon=-1.4357974
- Whitemoss Golf Club (England, 1 courses) — DB lat=52.0826289, lon=1.1132218
- Windlemere Golf Centre (England, 1 courses) — DB lat=51.3474666, lon=-0.6503966
- Wolleigh Golf Club (England, 1 courses) — DB lat=50.5928927, lon=-3.6812083
- Woodthorpe Leisure Park (England, 1 courses) — DB lat=53.2680613, lon=0.1948414
- Woolacombe & Mortehoe (England, 2 courses) — DB lat=51.1743624, lon=-4.1918554