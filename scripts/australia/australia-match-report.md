# Australia match report
Generated: 2026-05-06T07:02:14

2-source: golf.com.au federation + OSM. Federation-first per-felt-confidence.
Trust hierarki: golf.com.au > OSM > DB (Golfapi).
Scope: website + email + phone (federation har alle tre + holes).

## Summary

| Bucket | Clubs | Courses |
|---|---:|---:|
| High conf | 1254 | 1657 |
| Medium conf | 57 | 85 |
| Low conf | 12 | 15 |
| No match | 0 | 0 |
| Orphans (no fed match) | 413 | 469 |

## Field-fill projection (excl. orphans)

| Field | Clubs | Courses |
|---|---:|---:|
| website | 771 | 1088 |
| email | 582 | 794 |
| phone | 1256 | 1662 |

## High confidence (recommended to apply)

### 13th Beach Golf Links (Australia, 2 courses)

- DB: addr="Barwon Heads Rd, Melways", web=null, email=null, phone=null
- golf.com.au (high, sim=0.5, boost=+0.55[coord:278m,city:barwon], 278m, VIC 3227): name="Thirteenth Beach Golf Club", web=null, email=null, phone="03 5254 2922"
- OSM (high, 72m, sim=1): name="13th Beach Golf Links", web="http://www.13thbeach.net/", email="info@13thbeach.net", phone="+61 3 5254 2922"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 72m, sim=1)
  - email: from osm(high, 72m, sim=1)
  - phone: from fed(high, sim=0.5)

### 1770 Golf Course (Australia, 1 courses)

- DB: addr="2366 Round Hill Road, Round Hill", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.6[coord:18m,jaccard:0.67], 18m, QLD 4677): name="1770 Golf Club", web="https://www.1770golf.com.au/", email="proshop@1770golf.com.au", phone="(07) 4974 9663"
- OSM (no-match, 1710224m, sim=0.1): name="13th Beach Golf Links", web="http://www.13thbeach.net/", email="info@13thbeach.net", phone="+61 3 5254 2922"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Adelong Golf Club (Australia, 1 courses)

- DB: addr="Reka Road, Adelong", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2820m,city:adelong,db-name-substring,jaccard:1.00], 2820m, NSW 2729): name="Adelong Golf Club", web=null, email=null, phone="6946 2343"
- OSM (low, 3863m, sim=1): name="Adelong Golf Course", web=null, email=null, phone="+61 2 6946 2343"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Albany Golf Club (Australia, 1 courses)

- DB: addr="1 Barry Court (off Golf Links Road) Middleton Beach, Albany", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:6m,city:albany,db-name-substring,jaccard:1.00], 6m, WA 6331): name="Albany Golf Club", web="https://www.albanygolfclub.com.au", email=null, phone="08 9844 8855"
- OSM (low, 731m, sim=1): name="Albany Golf Club", web="http://www.albanygolfclub.com.au/", email=null, phone="+61 8 9844 8433;+61 8 9844 8855"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Albert Park Public Golf Course (Australia, 1 courses)

- DB: addr="Queens Road, Melbourne", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.78[coord:641m,city:melbourne,jaccard:0.75], 641m, VIC 3004): name="Albert Park Golf Course", web=null, email=null, phone="03 9510 5588"
- OSM (high, 12m, sim=1): name="Albert Park Public Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Alexandra Golf Club (Australia, 1 courses)

- DB: addr="Gordon Street, Alexandra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:408m,city:alexandra,db-name-substring,jaccard:1.00], 408m, VIC 3714): name="Alexandra Golf Club", web=null, email=null, phone="03 5772 1570"
- OSM (high, 105m, sim=1): name="Alexandra  Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Alice Springs Golf Club (Australia, 1 courses)

- DB: addr="Cromwell Drive, Alice Springs", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:129m,city:alice,db-name-substring,jaccard:1.00], 129m, NT 0871): name="Alice Springs Golf Club", web="http://www.alicespringsgolfclub.com.au", email="proshop@asgc.com.au", phone="(08) 8952 1921"
- OSM (high, 122m, sim=1): name="Alice Springs Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Allora Golf Club (Australia, 1 courses)

- DB: addr="Warwick, St Allora", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:186m,city:allora,db-name-substring,jaccard:1.00], 186m, QLD 4362): name="Allora Golf Club", web=null, email=null, phone="07 4666 3380"
- OSM (low, 628m, sim=1): name="Allora Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Alpha Golf Club (Australia, 1 courses)

- DB: addr="Dryden Street, Alpha", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:456m,city:alpha,db-name-substring,jaccard:1.00], 456m, QLD 4724): name="Alpha Golf Club", web=null, email="alphagolfclub@gmail.com", phone="07 4985 1398"
- OSM (high, 83m, sim=1): name="Alpha Golf Club", web=null, email=null, phone="+61 7 4985 1398"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Altona Lakes Golf Course (Australia, 1 courses)

- DB: addr="Mason St, Paisley Park", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.63[coord:227m,jaccard:0.75], 227m, VIC 3015): name="Altona Lakes Golf Club", web=null, email=null, phone="0417585113"
- OSM (high, 83m, sim=1): name="Altona Lakes Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Altone Park (Australia, 1 courses)

- DB: addr=null, web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.65[coord:278m,db-name-substring,jaccard:0.50], 278m, WA 6062): name="Altone Park Golf Club", web=null, email=null, phone="08 92796318"
- OSM (high, 190m, sim=1): name="Altone Park Golf Course", web="http://www.altoneparkgolf.com.au/", email=null, phone="+61 8 9279 5988"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 190m, sim=1)
  - phone: from fed(high, sim=1)

### Alyangula Golf Club (Australia, 1 courses)

- DB: addr="1 Alebuwa Road, Alyangula", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:213m,city:alyangula,db-name-substring,jaccard:1.00], 213m, NT 0885): name="Alyangula Golf Club", web=null, email="info@alyangulagc.com.au", phone="(08) 8987 6060"
- OSM (high, 88m, sim=1): name="Alyangula Golf Club", web="http://www.alyangulagolfclub.com.au/", email=null, phone="+61 8 8987 6060"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 88m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Anglesea Golf Club (Australia, 1 courses)

- DB: addr="Golf Links Road, Anglesea", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:241m,city:anglesea,db-name-substring,jaccard:1.00], 241m, VIC 3230): name="Anglesea Golf Club", web="http://www.angleseagolfclub.com.au", email="info@angleseagolfclub.com.au", phone="03 5263 1582"
- OSM (high, 212m, sim=1): name="Anglesea Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Antill park country club (Australia, 1 courses)

- DB: addr=null, web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.45[coord:251m,jaccard:0.67], 251m, NSW 2571): name="Antill Park Country Golf Club", web=null, email=null, phone="02 46771512"
- OSM (high, 30m, sim=1): name="Antill Park Country Golf Club", web="https://www.antillpark.com.au/", email=null, phone="+61 2 4677 1240;+61 2 4677 1512"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 30m, sim=1)
  - phone: from fed(high, sim=1)

### Antill Park Golf Club (Australia, 1 courses)

- DB: addr="Jarvisfield Road, Picton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:251m,city:picton,jaccard:0.67], 251m, NSW 2571): name="Antill Park Country Golf Club", web=null, email=null, phone="02 46771512"
- OSM (high, 30m, sim=1): name="Antill Park Country Golf Club", web="https://www.antillpark.com.au/", email=null, phone="+61 2 4677 1240;+61 2 4677 1512"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 30m, sim=1)
  - phone: from fed(high, sim=1)

### Apollo Bay Golf Club (Australia, 1 courses)

- DB: addr="Nelson Street, Apollo Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:72m,city:apollo,db-name-substring,jaccard:1.00], 72m, VIC 3233): name="Apollo Bay Golf Club", web=null, email="info@apollobaygolfclub.org.au", phone="03 5237 6474"
- OSM (high, 0m, sim=1): name="Apollo Bay Golf Club", web="https://www.apollobaygolfclub.org.au/", email=null, phone="+61 3 5237 6474"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 0m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Apsley Golf Club (Australia, 1 courses)

- DB: addr="Wimmera Highway, Apsley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:990m,city:apsley,db-name-substring,jaccard:1.00], 990m, VIC 3319): name="Apsley Golf Club", web=null, email=null, phone="03 5586 1403"
- OSM (high, 29m, sim=1): name="Apsley Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Aradale Golf Club (Australia, 1 courses)

- DB: addr="Grano Street, Ararat", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:388m,city:ararat,db-name-substring,jaccard:1.00], 388m, VIC 3377): name="Aradale Golf Club", web=null, email="aradalegolfclub@gmail.com", phone="0407877067"
- OSM (high, 38m, sim=1): name="Aradale Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ardath Golf Club (Australia, 1 courses)

- DB: addr="Corrigin Road, Ardath", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:43m,city:ardath,db-name-substring,jaccard:1.00], 43m, WA 6419): name="Ardath Golf Club", web=null, email="mitch.hunter6@hotmail.com", phone="0429704985"
- OSM (high, 0m, sim=1): name="Ardath Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ardrossan Golf Club (Australia, 1 courses)

- DB: addr="Dinham Drive, Ardrossan", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:450m,city:ardrossan,db-name-substring,jaccard:1.00], 450m, SA 5571): name="Ardrossan Golf Club", web="http://www.adrossangolf.asn.au", email="ardgolf@bigpond.com", phone="0418859694"
- OSM (high, 12m, sim=1): name="Ardrossan Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ariah Park Golf Club (Australia, 1 courses)

- DB: addr="Mary Gilmore Way, Ariah Park", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:461m,city:ariah,db-name-substring,jaccard:1.00], 461m, NSW 2665): name="Ariah Park Golf Club", web=null, email=null, phone="02 6973 2123"
- OSM (high, 31m, sim=1): name="Ariah Park Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Armidale Golf Club (Australia, 1 courses)

- DB: addr="Golf Links Rd, West Armidale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:386m,city:west,db-name-substring,jaccard:1.00], 386m, NSW 2350): name="Armidale Golf Club", web="http://www.armidalegolf.com.au", email="golf@armidalegolf.com.au", phone="02 6772 5837"
- OSM (high, 36m, sim=1): name="Armidale Golf Club", web="https://www.armidalegolf.com.au/", email=null, phone="+61 2 6772 6592;+61 2 6772 5837"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ashbourne Private Golf Course (Australia, 1 courses)

- DB: addr="Signal Flat Road, Ashbourne", web=null, email=null, phone=null
- golf.com.au (high, sim=0.85, boost=+0.8[coord:335m,db-name-substring,jaccard:1.00], 335m, SA 5157): name="Ashbourne Private Golf Course (SA)", web=null, email=null, phone=null
- OSM (low, 22m, sim=0.529): name="Ashbourne Golf Club", web=null, email=null, phone=null

### Ashgrove Golf Club (Australia, 1 courses)

- DB: addr="863 Waterworks Road, The Gap", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:324m,db-name-substring,jaccard:1.00], 324m, QLD 4061): name="Ashgrove Golf Club", web="http://www.ashgrovegolf.com.au", email=null, phone="07 3366 1842"
- OSM (high, 198m, sim=1): name="Ashgrove Golf Club", web="https://www.ashgrovegolf.com.au/", email="admin@ashgrovegolf.com.au", phone="+61 7 3366 3438;+61 7 3366 1842"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 198m, sim=1)
  - phone: from fed(high, sim=1)

### Asquith Golf Club (Australia, 1 courses)

- DB: addr="Lord Street, Mt Colah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:326m,city:colah,db-name-substring,jaccard:1.00], 326m, NSW 2079): name="Asquith Golf Club", web="http://www.asquithgolfclub.com.au", email=null, phone="(02) 9477 1266"
- OSM (high, 7m, sim=1): name="Asquith Golf Club", web="https://www.asquithgolfclub.com.au/", email="office@asquithgolfclub.com.au", phone="+61 2 9477 1403;+61 2 9477 1266"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 7m, sim=1)
  - phone: from fed(high, sim=1)

### Atherton Golf Club (Australia, 1 courses)

- DB: addr="PO Box 128,, Atherton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:580m,city:atherton,db-name-substring,jaccard:1.00], 580m, QLD 4883): name="Atherton Golf Club", web="http://www.athertongolf.org.au", email=null, phone="4091 1283"
- OSM (high, 245m, sim=1): name="Atherton Golf Course", web="http://athertongolf.fnqnet.org/", email=null, phone="+61 7 4091 1283"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Augathella Golf Club (Australia, 1 courses)

- DB: addr="Elfin Street, Augathella", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:141m,city:augathella,db-name-substring,jaccard:1.00], 141m, QLD 4477): name="Augathella Golf Club", web=null, email=null, phone="07545034"
- OSM (high, 235m, sim=1): name="Augathella Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Avalon Public Golf Course (Australia, 1 courses)

- DB: addr="32 Old Barrenjoey Rd, Avalon", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.92[coord:175m,city:avalon,jaccard:0.75], 175m, NSW 2107): name="Avalon Golf Course", web=null, email=null, phone="02 9918 2606"
- OSM (high, 19m, sim=1): name="Avalon Golf Course", web="https://www.avalongolfcourse.com.au/", email="info@avalongolfcourse.com.au", phone="+61 2 9918 2606"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 19m, sim=1)
  - email: from osm(high, 19m, sim=1)
  - phone: from fed(high, sim=1)

### Avenel Golf Club (Australia, 1 courses)

- DB: addr="Bank Street, Avenel", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:428m,city:avenel,db-name-substring,jaccard:1.00], 428m, VIC 3664): name="Avenel Golf Club", web=null, email=null, phone="03 57985268"
- OSM (high, 31m, sim=1): name="Avenel Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Avoca Country Golf Bowls Club (Australia, 2 courses)

- DB: addr="1701 N. Willow, Avoca", web=null, email=null, phone=null
- golf.com.au (high, sim=0.455, boost=+0.7[coord:426m,city:avoca,jaccard:0.50], 426m, VIC 3467): name="Avoca Golf Club", web=null, email="avocagolf@outlook.com", phone="(03) 5465 3030"
- OSM (low, 112m, sim=0.455): name="Avoca Country Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.455)
  - phone: from fed(high, sim=0.455)

### Avondale Golf Club (Australia, 1 courses)

- DB: addr="Lonsdale Ave, Pymble", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:531m,city:pymble,db-name-substring,jaccard:1.00], 531m, NSW 1670): name="Avondale Golf Club", web="https://www.avondalegolfclub.com.au", email=null, phone="02 9449 6455"
- OSM (high, 121m, sim=1): name="Avondale Golf Club", web="https://www.avondalegolfclub.com.au/", email=null, phone="+61 2 9449 6455"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Axedale Golf Club (Australia, 1 courses)

- DB: addr="75 Mitchell Street, Axedale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:267m,city:axedale,db-name-substring,jaccard:1.00], 267m, VIC 3554): name="Axedale Golf Club", web=null, email=null, phone="0354397243"
- OSM (high, 10m, sim=1): name="Axedale Golf Course", web="http://www.axedalegc.com.au/", email=null, phone="+61 3 5439 7243"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 10m, sim=1)
  - phone: from fed(high, sim=1)

### Ayr Golf Club (Australia, 1 courses)

- DB: addr="Edward Street, Ayr", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:315m,db-name-substring,jaccard:1.00], 315m, QLD 4807): name="Ayr Golf Club", web="https://www.facebook.com/ayrgolfclub/", email="info@ayrgc.com.au", phone="07 4783 1296"
- OSM (high, 19m, sim=1): name="Ayr Golf Club", web="http://ayr.au-golf.net/", email=null, phone="+61 7 4783 2780"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Baandee Golf Club (Australia, 1 courses)

- DB: addr="Garbin Road,, Baandee", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.65[coord:2380m,db-name-substring,jaccard:1.00], 2380m, WA 6415): name="Baandee Golf Club", web=null, email=null, phone="0428126298"
- OSM (no-match, 2793947m, sim=0.5): name="Bairnsdale Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Babinda Golf Club (Australia, 1 courses)

- DB: addr="Hospital Street, Babinda", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:373m,city:babinda,db-name-substring,jaccard:1.00], 373m, QLD 4861): name="Babinda Golf Club", web="http://www.babindagolfclub.com.au", email="babindagolf@gmail.com", phone="(07) 4067 1790"
- OSM (high, 170m, sim=1): name="Babinda Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bacchus Marsh West Golf Club (Australia, 1 courses)

- DB: addr="Bacchus Marsh-Balliang Rd, Maddingley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:128m,city:bacchus,db-name-substring,jaccard:1.00], 128m, VIC 3340): name="Bacchus Marsh West Golf Club", web=null, email="info.bmwgc@gmail.com", phone="03 5367 3492"
- OSM (high, 76m, sim=1): name="Bacchus Marsh West Golf Club", web="https://www.bacchusmarshgolfclub.com.au", email=null, phone="+61 3 5367 3492"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 76m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bagdad Community Golf Club (Australia, 1 courses)

- DB: addr="Midland Highway, Bagdad", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:74m,city:bagdad,db-name-substring,jaccard:1.00], 74m, TAS 7030): name="Bagdad Community Golf Club", web=null, email="bagdadgc@hotmail.com", phone="0409123046"
- OSM (low, 211m, sim=0.375): name="Bagdad Public Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bairnsdale Golf Club (Australia, 1 courses)

- DB: addr="1090 Paynesville Road, Eagle Point", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:459m,city:eagle,db-name-substring,jaccard:1.00], 459m, VIC 3875): name="Bairnsdale Golf Club", web=null, email=null, phone="03 5156 6252"
- OSM (high, 6m, sim=1): name="Bairnsdale Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Bakers Hill Golf Club (Australia, 1 courses)

- DB: addr="St. George Street, Bakers Hill", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:282m,city:bakers,db-name-substring,jaccard:1.00], 282m, WA 6562): name="Bakers Hill Golf Club", web="http://www.bakershillgolf.com", email=null, phone="08 95740015"
- OSM (high, 25m, sim=1): name="Bakers Hill Golf Club", web=null, email=null, phone="+61 427 190 571"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Balaklava Golf Club (Australia, 1 courses)

- DB: addr="Auburn Rd, Balaklava", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:356m,city:balaklava,db-name-substring,jaccard:1.00], 356m, SA 5461): name="Balaklava Golf Club", web=null, email=null, phone="0438286275"
- OSM (high, 110m, sim=1): name="Balaklava Golf Club", web="http://www.balaklavagolfclub.websyte.com.au/", email=null, phone="+61 8 8528 6275;+61 8 8862 1594"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 110m, sim=1)
  - phone: from fed(high, sim=1)

### Balgowlah Golf Club (Australia, 1 courses)

- DB: addr="506 Sydney Road, Balgowlah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:17m,city:balgowlah,db-name-substring,jaccard:1.00], 17m, NSW 2093): name="Balgowlah Golf Club", web="http://www.balgowlahgolfclub.com.au", email="admin@balgowlahgolfclub.com.au", phone="(02) 9948 1900"
- OSM (high, 23m, sim=1): name="Balgowlah Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Balingup Golf Club (Australia, 1 courses)

- DB: addr="South Western Highway, Balingup", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:159m,city:balingup,db-name-substring,jaccard:1.00], 159m, WA 6253): name="Balingup Golf Club", web=null, email="T_s.payne@bigpond.com", phone="(08) 9764 1885"
- OSM (high, 47m, sim=1): name="Balingup Golf Club", web="http://www.balingup.asn.au/balingup-golf-club.html", email=null, phone="+61 8 9764 1090;+61 8 9764 1885"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 47m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ballarat Golf Club (Australia, 1 courses)

- DB: addr="1800 Sturt Street, Ballarat", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:769m,city:ballarat,db-name-substring,jaccard:1.00], 769m, VIC 3350): name="Ballarat Golf Club", web=null, email="info@ballaratgolfclub.com.au", phone="(03) 5338 3000"
- OSM (low, 530m, sim=1): name="Ballarat Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ballidu Golf Club (Australia, 1 courses)

- DB: addr="Northam Pithara Road, Ballidu", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:561m,city:ballidu,db-name-substring,jaccard:1.00], 561m, WA 6606): name="Ballidu Golf Club", web="https://www.facebook.com/ballidugolfclub", email="sharon@btp94.com.au", phone="0429741239"
- OSM (high, 107m, sim=1): name="Ballidu Golf Club", web=null, email=null, phone="+61 8 9674 4012"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ballina Golf and Sports Club (Australia, 1 courses)

- DB: addr="Jameson Avenue, East Ballina", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:239m,city:east,db-name-substring,jaccard:1.00], 239m, NSW 2478): name="Ballina Golf and Sports Club", web="http://www.ballinagolfclub.com.au", email="admin@ballinagolfclub.com.au", phone="(02) 6686 2766"
- OSM (high, 211m, sim=1): name="Ballina Golf & Sports Club", web="https://www.ballinagolfclub.com.au/", email=null, phone="+61 2 6686 2766"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Balranald Golf & Sports Club (Australia, 1 courses)

- DB: addr="116 O'connor Street, Balranald", web=null, email=null, phone=null
- golf.com.au (high, sim=0.563, boost=+0.9[coord:206m,city:balranald,jaccard:0.67], 206m, NSW 2715): name="Balranald Golf Club", web=null, email=null, phone="0350202222"
- OSM (low, 55m, sim=0.563): name="Balranald Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.563)

### Balyang Par-3 Golf Course (Australia, 1 courses)

- DB: addr="Marnock Road, Newtown", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:146m,jaccard:1.00], 146m, VIC 3220): name="Balyang Par 3 Golf Course", web=null, email=null, phone="0421831846"
- OSM (high, 7m, sim=1): name="Balyang Par 3 Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Bamawm Golf Club (Australia, 1 courses)

- DB: addr="Cunnington Road, Bamawm", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1678m,city:bamawm,db-name-substring,jaccard:1.00], 1678m, VIC 3561): name="Bamawm Golf Club", web=null, email="bamawmgolfclub@bigpond.com", phone="03 5486 5385"
- OSM (high, 4m, sim=1): name="Bamawm Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bannockburn Golf Club (Australia, 1 courses)

- DB: addr="300 Shelford/Teesdale Road, Bannockburn", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:178m,city:bannockburn,db-name-substring,jaccard:1.00], 178m, VIC 3331): name="Bannockburn Golf Club", web="https://www.bannockburngolfclub.org.au", email="info@bannockburngolfclub.org.au", phone="03 52819216"
- OSM (high, 155m, sim=1): name="Bannockburn Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Baradine Golf Club (Australia, 1 courses)

- DB: addr="Gulargambone Road, Baradine", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1586m,city:baradine,db-name-substring,jaccard:1.00], 1586m, NSW 2396): name="Baradine Golf Club", web=null, email=null, phone="0428638708"
- OSM (low, 903487m, sim=0.8): name="Barcaldine Golf Club", web="https://www.facebook.com/BarcaldineGolfClub/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Baralaba Golf Club (Australia, 1 courses)

- DB: addr="Alberta Road, Baralaba", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:535m,city:baralaba,db-name-substring,jaccard:1.00], 535m, QLD 4702): name="Baralaba Golf Club", web=null, email="aglrtrail@gmail.com", phone="07 4998 1244"
- OSM (medium, 455m, sim=1): name="Baralaba Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Barcaldine Golf Club (Australia, 1 courses)

- DB: addr="Pine Street North, Barcaldine", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:463m,city:barcaldine,db-name-substring,jaccard:1.00], 463m, QLD 4725): name="Barcaldine Golf Club", web=null, email=null, phone="07 4651 2441"
- OSM (high, 125m, sim=1): name="Barcaldine Golf Club", web="https://www.facebook.com/BarcaldineGolfClub/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 125m, sim=1)
  - phone: from fed(high, sim=1)

### Bardwell Valley Golf Club (Australia, 2 courses)

- DB: addr="Hillcrest Avenue, Bardwell Valley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:316m,city:bardwell,db-name-substring,jaccard:1.00], 316m, NSW 2207): name="Bardwell Valley Golf Club", web="http://www.bardwellvalleygolf.com.au", email=null, phone="02 9567 7600"
- OSM (high, 104m, sim=1): name="Bardwell Valley Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bargara Golf Club (Australia, 2 courses)

- DB: addr="120 Miller Street, Bargara", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:254m,city:bargara,db-name-substring,jaccard:1.00], 254m, QLD 4670): name="Bargara Golf Club", web="http://www.bargaragolf.com.au", email=null, phone="(07) 4159 2221"
- OSM (high, 48m, sim=1): name="Bargara Golf Club", web="https://www.bargaragolf.com.au/", email=null, phone="+61 7 4159 2257;+61 7 4159 2221"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Barmera Golf Club (Australia, 1 courses)

- DB: addr="Hawdon Street, Barmera", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:744m,city:barmera,db-name-substring,jaccard:1.00], 744m, SA 5345): name="Barmera Golf Club", web="https://www.barmeragolfclub.com.au", email="bgc@riverland.net.au", phone="08 8588 2350"
- OSM (low, 1561331m, sim=0.714): name="Bargara Golf Club", web="https://www.bargaragolf.com.au/", email=null, phone="+61 7 4159 2257;+61 7 4159 2221"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Barnawartha Golf Club (Australia, 1 courses)

- DB: addr="Havelock Street, Barnawartha", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:354m,city:barnawartha,db-name-substring,jaccard:1.00], 354m, VIC 3688): name="Barnawartha Golf Club", web=null, email=null, phone=null
- OSM (high, 116m, sim=1): name="Barnawartha Golf Course", web=null, email=null, phone=null

### Barnbougle Dunes Golf Links (Australia, 2 courses)

- DB: addr="89 George Street, Scottsdale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:213m,db-name-substring,jaccard:1.00], 213m, TAS 7262): name="Barnbougle Dunes Golf Links", web=null, email=null, phone="03 6356 0094"
- OSM (medium, 457m, sim=1): name="Barnbougle Dunes Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Barnwell Park Golf Club (Australia, 3 courses)

- DB: addr="551 Lyons Rd West, Five Dock ", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:20m,city:five,db-name-substring,jaccard:1.00], 20m, NSW 2046): name="Barnwell Park Golf Club", web="https://www.barnwellparkgolfclub.com.au/", email="membership@barnwellparkgolfclub.com.au", phone="02 9713 1162"
- OSM (high, 136m, sim=1): name="Barnwell Park Golf Club", web="https://www.barnwellparkgolfclub.com.au/", email=null, phone="+61 2 9713 9019;+61 2 9713 1162"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Barossa Valley Golf Club (Australia, 1 courses)

- DB: addr="Golf Course Road, Nuriootpa", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:27m,city:nuriootpa,db-name-substring,jaccard:1.00], 27m, SA 5355): name="Barossa Valley Golf Club", web="https://www.barossavalleygolf.com", email="peterbaldwin951@gmail.com", phone="(08) 8562 1589"
- OSM (high, 8m, sim=1): name="Barossa Valley Golf Club", web="https://www.barossavalleygolf.com.au/", email=null, phone="+61 8 8562 1589;+61 8 8562 3766"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Barraba Golf Club (Australia, 1 courses)

- DB: addr="Trevallyn Road, Barraba", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:301m,city:barraba,db-name-substring,jaccard:1.00], 301m, NSW 2347): name="Barraba Golf Club", web=null, email="barrabagolf@gmail.com", phone="0267821029"
- OSM (medium, 342m, sim=1): name="Barraba Golf Course", web=null, email=null, phone="+61 2 6782 1264"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Barwon Heads Golf Club (Australia, 1 courses)

- DB: addr="Golf Links Road, Barwon Heads", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:34m,city:barwon,db-name-substring,jaccard:1.00], 34m, VIC 3227): name="Barwon Heads Golf Club", web="http://www.bhgc.com.au", email=null, phone="03 5255 6255"
- OSM (medium, 446m, sim=1): name="Barwon Heads Golf Course", web="http://www.bhgc.com.au/", email=null, phone="+61 3 5255 6255"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Barwon Valley Golf Club (Australia, 1 courses)

- DB: addr="Barwon Heads Road, Belmont", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:13m,city:belmont,db-name-substring,jaccard:1.00], 13m, VIC 3216): name="Barwon Valley Golf Club", web=null, email=null, phone="03 5243 5443"
- OSM (high, 178m, sim=1): name="Barwon Valley Golf Course", web="https://barwonvalleygolfclub.com.au", email=null, phone="+61 3 5243 5443"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 178m, sim=1)
  - phone: from fed(high, sim=1)

### Bathurst (Australia, 1 courses)

- DB: addr=null, web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.5[coord:2427m,db-name-substring,jaccard:0.50], 2427m, NSW 2795): name="Bathurst Golf Club", web="http://www.bathurstgolf.com.au", email=null, phone="(02) 6331 4144"
- OSM (low, 2530m, sim=1): name="Bathurst Golf Club", web="https://www.bathurstgolf.com.au/", email=null, phone="+61 2 6331 4144"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bathurst Golf Club (Australia, 2 courses)

- DB: addr="Orange Road, Bathurst", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:382m,city:bathurst,db-name-substring,jaccard:1.00], 382m, NSW 2795): name="Bathurst Golf Club", web="http://www.bathurstgolf.com.au", email=null, phone="(02) 6331 4144"
- OSM (high, 95m, sim=1): name="Bathurst Golf Club", web="https://www.bathurstgolf.com.au/", email=null, phone="+61 2 6331 4144"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Batlow Golf Club (Australia, 1 courses)

- DB: addr="Fosters Rd, Batlow", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:218m,city:batlow,db-name-substring,jaccard:1.00], 218m, NSW 2730): name="Batlow Golf Club", web=null, email=null, phone="02 6949 1799"
- OSM (high, 0m, sim=1): name="Batlow Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Bay Views Golf Course (Australia, 1 courses)

- DB: addr="Elizabeth Drive, Rosebud", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:166m,city:rosebud,db-name-substring,jaccard:1.00], 166m, VIC 3939): name="Bay Views Golf Course", web="https://bayviewsgolf.com.au/", email="golf@bayviewsgolf.com.au", phone="03 59812833"
- OSM (high, 246m, sim=1): name="Bay Views Golf Course", web=null, email=null, phone="+61 3 5981 2833"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bayview Golf Club (Australia, 1 courses)

- DB: addr="1825 Pittwater Road, Mona Vale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:543m,city:mona,db-name-substring,jaccard:1.00], 543m, NSW 1660): name="Bayview Golf Club", web="https://www.bayviewgolfclub.com.au", email="reception@bayviewgolfclub.com.au", phone="(02) 9999 3786"
- OSM (high, 20m, sim=1): name="Bayview Golf Club", web="https://www.bayviewgolfclub.com/", email="proshop@bayviewgolfclub.com.au", phone="+61 2 9999 3078;+61 2 9999 3786"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Beachport Golf Club (Australia, 1 courses)

- DB: addr="Government Road, Beachport", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:302m,city:beachport,db-name-substring,jaccard:1.00], 302m, SA 5280): name="Beachport Golf Club", web=null, email="beachportgolfclub@gmail.com", phone="(08) 8735 8105"
- OSM (high, 62m, sim=1): name="Beachport Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Beaconhills Golf Club (Australia, 9 courses)

- DB: addr="85-87 Stoney Creek Road, Beaconsfield Upper", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:194m,city:upper,db-name-substring,jaccard:1.00], 194m, VIC 3808): name="Beaconhills Golf Club", web="http://www.beaconhillsgolf.com.au", email=null, phone="(03) 5945 9210"
- OSM (low, 21m, sim=0.55): name="Cardinia Beaconhills Golf Links", web="https://www.beaconhillsgolf.com.au/", email=null, phone="+61 3 5945 9230"

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Beaudesert Golf Club (Australia, 1 courses)

- DB: addr="Kerry Road, Beaudesert", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:598m,city:beaudesert,db-name-substring,jaccard:1.00], 598m, QLD 4285): name="Beaudesert Golf Club", web=null, email=null, phone="07 5541 2291"
- OSM (low, 651m, sim=1): name="Beaudesert Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Beaufort Golf & Bowling Club (Australia, 1 courses)

- DB: addr="Park Road, Beaufort", web=null, email=null, phone=null
- golf.com.au (high, sim=0.5, boost=+0.9[coord:116m,city:beaufort,jaccard:0.67], 116m, VIC 3373): name="Beaufort Golf Club", web=null, email=null, phone="03 53492312"
- OSM (high, 96m, sim=0.813): name="Beaufort Golf / Bowls Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.5)

### Beeac Golf Club (Australia, 1 courses)

- DB: addr="Mingawalla Road, Beeac", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:237m,city:beeac,db-name-substring,jaccard:1.00], 237m, VIC 3251): name="Beeac Golf Club", web=null, email="beeacgc@gmail.com", phone="0423841849"
- OSM (high, 2m, sim=1): name="Beeac Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Beerwah Golf Club (Australia, 1 courses)

- DB: addr="24 Biondi Crescent, Beerwah", web=null, email=null, phone=null
- golf.com.au (high, sim=0.438, boost=+0.75[coord:303m,city:beerwah,jaccard:0.67], 303m, QLD 4519): name="Beerwah & District Golf Club", web="https://www.beerwahgolfclub.com.au/cms/", email="admin@beerwahgolfclub.com.au", phone="07 5494 0630"
- OSM (high, 115m, sim=1): name="Beerwah Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.438)
  - email: from fed(high, sim=0.438)
  - phone: from fed(high, sim=0.438)

### Bega Country Club (Australia, 1 courses)

- DB: addr="Tarraganda Lane, Bega", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:275m,city:bega,jaccard:0.50], 275m, NSW 2550): name="Club Bega", web="http://www.begarslgolfclub.com.au", email=null, phone="(02) 6492 1570"
- OSM (high, 249m, sim=1): name="Bega Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bellarine Lakes Golf Park (Australia, 1 courses)

- DB: addr="402-404 Bellarine Hwy, Moolap", web=null, email=null, phone=null
- golf.com.au (high, sim=0.789, boost=+0.78[coord:342m,city:moolap,jaccard:0.75], 342m, VIC 3224): name="Bellarine Lakes Resort Golf Club inc", web=null, email=null, phone="03 5250 7837"
- OSM (low, 26m, sim=0.652): name="Bellarine Lakes Resort Golf Club (private)", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.789)

### Bellata Golf Club (Australia, 1 courses)

- DB: addr="80 Berrigal Creek-Bellata Rd, Bellata", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:107m,city:bellata,db-name-substring,jaccard:1.00], 107m, NSW 2397): name="Bellata Golf Club", web=null, email="bellatagolfclub@gmail.com", phone="02 6793 7559"
- OSM (high, 127m, sim=1): name="Bellata Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bellingen Golf Club (Australia, 1 courses)

- DB: addr="1172 Waterfall Way, Bellingen", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:318m,city:bellingen,db-name-substring,jaccard:1.00], 318m, NSW 2454): name="Bellingen Golf Club", web="http://www.bellingengc.com.au", email=null, phone="02 6655 1312"
- OSM (medium, 330m, sim=1): name="Bellingen Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Belmont Golf Club (Australia, 1 courses)

- DB: addr="801A Pacific Highway, Marks Point", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:433m,city:marks,db-name-substring,jaccard:1.00], 433m, NSW 2284): name="Belmont Golf Club", web=null, email="office@belmontgolf.com.au", phone="02 4945 4348"
- OSM (high, 206m, sim=1): name="Belmont Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Belvoir Park Golf Club (Australia, 1 courses)

- DB: addr="77 Belvoir Park Road, Ravenswood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:205m,city:ravenswood,db-name-substring,jaccard:1.00], 205m, VIC 3453): name="Belvoir Park Golf Club", web=null, email="info@belvoirparkgc.com.au", phone="0354353370"
- OSM (high, 213m, sim=1): name="Belvoir Park Golf Course", web="www.belvoirparkgc.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 213m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bembridge Golf Course (Australia, 1 courses)

- DB: addr="125 Tyabb-Tooradin Road, Somerville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.63[coord:209m,jaccard:0.75], 209m, VIC 3912): name="Bembridge Public Golf Course", web=null, email=null, phone=null
- OSM (high, 4m, sim=1): name="Bembridge Golf Course", web=null, email=null, phone=null

### Bembridge Public Golf Course (Australia, 1 courses)

- DB: addr="125 Tyabb-Tooradin Rd, Somerville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:209m,db-name-substring,jaccard:1.00], 209m, VIC 3912): name="Bembridge Public Golf Course", web=null, email=null, phone=null
- OSM (high, 4m, sim=1): name="Bembridge Golf Course", web=null, email=null, phone=null

### Benalla Golf Club (Australia, 2 courses)

- DB: addr="170 Mansfield Road, Benalla", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:377m,city:benalla,db-name-substring,jaccard:1.00], 377m, VIC 3672): name="Benalla Golf Club", web=null, email=null, phone="03 57621920"
- OSM (high, 193m, sim=1): name="Benalla Golf Club", web="https://www.benallagolfclub.com.au/", email=null, phone="+61 3 5762 1920;+61 3 5762 2404"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 193m, sim=1)
  - phone: from fed(high, sim=1)

### Bendigo Golf Club (Australia, 1 courses)

- DB: addr="Golf Course Road, Epsom", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:348m,city:epsom,db-name-substring,jaccard:1.00], 348m, VIC 3551): name="Bendigo Golf Club", web=null, email="proshop@bendigogolfclub.com.au", phone="03 5448 4206"
- OSM (high, 135m, sim=1): name="Bendigo Golf Club", web="https://www.bendigogolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 135m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bermagui Country Club (Australia, 1 courses)

- DB: addr="Tuross St, Bermagui", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:735m,city:bermagui,db-name-substring,jaccard:1.00], 735m, NSW 2546): name="Bermagui Country Club", web=null, email="info@bermaguicountryclub.com.au", phone="(02) 6493 4340"
- OSM (high, 163m, sim=1): name="Bermagui Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Berrigan Golf & Bowling Club (Australia, 1 courses)

- DB: addr="18 Stewart Street, Berrigan", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1[coord:54m,city:berrigan,jaccard:1.00], 54m, NSW 2712): name="Berrigan Golf and Bowling Club", web=null, email=null, phone="(03) 5873 4304"
- OSM (low, 205m, sim=0.5): name="Berrigan Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Berriwillock Golf Club (Australia, 1 courses)

- DB: addr="Golf Street, Berriwillock", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:97m,db-name-substring,jaccard:1.00], 97m, VIC xxxxxx): name="Berriwillock Golf Club", web=null, email="berriwillockgolfclub@gmail.com", phone="xxxxxxxxx"
- OSM (high, 145m, sim=1): name="Berriwillock Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Berwick Montuna Golf Club (Australia, 1 courses)

- DB: addr="335 Beaconsfield-Emerald Road, Guys Hill", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:451m,city:guys,db-name-substring,jaccard:1.00], 451m, VIC 3807): name="Berwick Montuna Golf Club", web="http://www.berwickmontuna.com.au", email=null, phone="(03) 9707 1887"
- OSM (low, 158m, sim=0.467): name="Montuna Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bethanga & District Golf Club (Australia, 1 courses)

- DB: addr="Bethanga-Tallangatta Rd, Bethanga", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:151m,city:bethanga,db-name-substring,jaccard:1.00], 151m, VIC 3691): name="Bethanga & District Golf Club", web=null, email="hello@bethangagolf.club", phone="0429436347"
- OSM (low, 74m, sim=0.471): name="Bethanga Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Beverley Golf Club (Australia, 1 courses)

- DB: addr="Forrest Street Beverley, Beverley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:505m,city:beverley,db-name-substring,jaccard:1.00], 505m, WA 6304): name="Beverley Golf Club", web=null, email="bevgolf@wn.com.au", phone="0429 461 200"
- OSM (high, 117m, sim=1): name="Beverley Golf Club", web=null, email=null, phone="+61 8 9646 1090"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Beverley Park Golf Club (Australia, 3 courses)

- DB: addr="87 A Jubilee Ave, Sydney", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:454m,db-name-substring,jaccard:1.00], 454m, NSW 2217): name="Beverley Park Golf Club", web="http://www.bpgc.com.au", email="admin@bpgc.com.au", phone="(02) 9587 3424"
- OSM (high, 15m, sim=1): name="Beverley Park Golf Club", web="https://bpgc.com.au/", email=null, phone="+61 2 9588 5828"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bexley Golf Club (Australia, 2 courses)

- DB: addr="203 Stoney Creek Rd, Kingsgrove", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:32m,city:kingsgrove,db-name-substring,jaccard:1.00], 32m, NSW 2207): name="Bexley Golf Club", web="https://www.bexleygolf.com.au", email="info@bexleygolf.com.au", phone="02 9150 9062"
- OSM (high, 1m, sim=1): name="Bexley Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bicheno Golf Club (Australia, 3 courses)

- DB: addr="Tasman Highway, Bicheno", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:bicheno,db-name-substring,jaccard:1.00], 3922m, TAS 7215): name="Bicheno Golf Club", web="http://bichenogolfclub.com.au", email="bicheno.golfclub@bigpond.com", phone="03 6375 1208"
- OSM (low, 4083m, sim=1): name="Bicheno Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Big River - Berri Golf Course (Australia, 1 courses)

- DB: addr="63 Shiell Road, Berri", web=null, email=null, phone=null
- golf.com.au (high, sim=0.333, boost=+0.85[coord:217m,city:berri,jaccard:0.50], 217m, SA 5343): name="Berri Golf Club", web="http://www.bigrivergolf.com.au/golf.html", email="admin@berrigolf.com.au", phone="(08) 8582 3666"
- OSM (medium, 251m, sim=1): name="Big River Golf and Country Club Berri", web="https://www.bigrivergolf.com/", email=null, phone="+61 8 8582 3666"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.333)
  - email: from fed(high, sim=0.333)
  - phone: from fed(high, sim=0.333)

### Biggenden Golf Club (Australia, 1 courses)

- DB: addr="103 Isis Highway, Biggenden", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:110m,city:biggenden,db-name-substring,jaccard:1.00], 110m, QLD 4621): name="Biggenden Golf Club", web=null, email=null, phone="0482174827"
- OSM (high, 5m, sim=1): name="Biggenden Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Biloela Golf Club (Australia, 1 courses)

- DB: addr="Valentine Plains Road, Biloela", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:113m,city:biloela,db-name-substring,jaccard:1.00], 113m, QLD 4715): name="Biloela Golf Club", web=null, email=null, phone="4992 1860"
- OSM (high, 42m, sim=1): name="Biloela Golf Club/", web="https://www.facebook.com/BiloelaGolfClubInc/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 42m, sim=1)
  - phone: from fed(high, sim=1)

### Binalong Golf Club (Australia, 1 courses)

- DB: addr="Oliver Street, Binalong", web=null, email=null, phone=null
- golf.com.au (high, sim=0.667, boost=+1.25[coord:20m,city:binalong,db-name-substring,jaccard:1.00], 20m, NSW 2584): name="Binalong Golf Club Ltd", web=null, email=null, phone="6227 4241"
- OSM (high, 133m, sim=1): name="Binalong Golf Club", web=null, email=null, phone="+61 2 6227 4241"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.667)

### Bingara Gorge (Australia, 1 courses)

- DB: addr="50 The Irons Dr, Wilton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:899m,city:wilton,db-name-substring,jaccard:0.50], 899m, NSW 2571): name="Bingara Gorge Golf Course", web=null, email=null, phone="02 4630 8500"
- OSM (low, 743m, sim=0.214): name="Stirling Drive", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Bingara Sporting Club (Australia, 1 courses)

- DB: addr="8 Bombelli Street, Bingara", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:648m,city:bingara,db-name-substring,jaccard:1.00], 648m, NSW 2404): name="Bingara Sporting Club", web=null, email=null, phone="02 6724 1206"
- OSM (low, 820m, sim=1): name="Bingara Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Binnaway Golf Club (Australia, 1 courses)

- DB: addr="Mollyann Road, Binnaway", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:19m,city:binnaway,db-name-substring,jaccard:1.00], 19m, NSW 2395): name="Binnaway Golf Club", web=null, email=null, phone="02 6844 2280"
- OSM (medium, 472m, sim=1): name="Binnaway Golf Course", web=null, email=null, phone="+61 2 6844 1590"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Birchip Golf Club (Australia, 1 courses)

- DB: addr="Watson Street, Birchip", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:273m,city:birchip,db-name-substring,jaccard:1.00], 273m, VIC 3483): name="Birchip Golf Club", web=null, email=null, phone="03 5492 2339"
- OSM (high, 68m, sim=1): name="Birchip Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Birregurra Golf Club (Australia, 1 courses)

- DB: addr="Park Lane, Birregurra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:48m,db-name-substring,jaccard:1.00], 48m, VIC 3250): name="Birregurra Golf Club", web=null, email="birregurragolfclub@gmail.com", phone="0352314771"
- OSM (high, 47m, sim=1): name="Birregurra Golf Club", web="https://birregurragolfclub.com.au/", email=null, phone="+61 3 5236 2308"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 47m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Black Springs Golf Course (Australia, 1 courses)

- DB: addr="Bakers Creek, Mackay ", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.92[coord:245m,city:bakers,jaccard:0.75], 245m, QLD 4741): name="Black Springs Golf Club", web=null, email=null, phone="07 4952 6446"
- OSM (high, 51m, sim=1): name="Black Springs Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Blackall Golf Club (Australia, 2 courses)

- DB: addr="Shamrock Street, Blackall", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1320m,city:blackall,db-name-substring,jaccard:1.00], 1320m, QLD 4472): name="Blackall Golf Club", web=null, email="blackallgolfclub@gmail.com", phone="4657 4362"
- OSM (low, 1289327m, sim=0.7): name="Black Bull Golf Course", web="http://www.blackbullgc.com.au/", email=null, phone="+61 3 5744 0044"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Blackheath Golf Club (Australia, 1 courses)

- DB: addr="Brightlands Avenue, Blackheath", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:28m,city:blackheath,db-name-substring,jaccard:1.00], 28m, NSW 2785): name="Blackheath Golf Club", web="http://www.blackheathgolf.com.au", email=null, phone="02 4787 8406"
- OSM (low, 522m, sim=1): name="Blackheath Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Blackwater Country  Club (Australia, 1 courses)

- DB: addr="2 Mulga Street, Blackwater", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:225m,city:blackwater], 225m, QLD 4717): name="Blackwater Golf Club", web=null, email="blackwatergolfclub1972@gmail.com", phone="07 4982 5275"
- OSM (high, 56m, sim=0.714): name="Blackwater Country Cub", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Blayney Golf Club (Australia, 2 courses)

- DB: addr="Mid Western Highway, Blayney", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:274m,city:blayney,db-name-substring,jaccard:1.00], 274m, NSW 2799): name="Blayney Golf Club", web=null, email=null, phone="(02) 6368 2939"
- OSM (high, 38m, sim=1): name="Blayney Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Blinman Golf Club (Australia, 1 courses)

- DB: addr="Wilpena Road, Blinman", web=null, email=null, phone=null
- golf.com.au (high, sim=0.5, boost=+0.6[coord:1362m,city:blinman,jaccard:0.67], 1362m, SA 5730): name="Blinman Sports Golf Club", web=null, email=null, phone="8648 4861"
- OSM (no-match, 1143648m, sim=0.571): name="Denman Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.5)

### Blyth Golf Club (Australia, 1 courses)

- DB: addr="Clare Road, Blyth", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:891m,city:blyth,db-name-substring,jaccard:1.00], 891m, SA 5462): name="Blyth Golf Club", web=null, email=null, phone="0428445232"
- OSM (no-match, 1152901m, sim=0.429): name="Bellata Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Boddington Golf & Country Club (Australia, 1 courses)

- DB: addr="Club Drive, Boddington", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:526m,city:boddington,jaccard:0.67], 526m, WA 6390): name="Boddington Golf Club", web="http://N/A", email="rwspoon57@hotmail.com", phone="0417096127"
- OSM (high, 96m, sim=1): name="Boddington Golf Club", web=null, email=null, phone="+61 8 9883 8107;+61 8 9883 8108;+61 8 9883 9192"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Boggabri Golf Club (Australia, 1 courses)

- DB: addr="Gunnedah Road, Boggabri", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:230m,city:boggabri,db-name-substring,jaccard:1.00], 230m, NSW 2382): name="Boggabri Golf Club", web=null, email="robyn.grover8@gmail.com", phone="02 6743 4411"
- OSM (high, 112m, sim=1): name="Boggabri Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bolgart Golf Club (Australia, 1 courses)

- DB: addr="Bolgart East Road, Bolgar", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:362m,city:bolgart,db-name-substring,jaccard:1.00], 362m, WA 6568): name="Bolgart Golf Club", web=null, email=null, phone="(08) 9627 5157"
- OSM (high, 84m, sim=1): name="Bolgart Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Bombala Golf Club (Australia, 1 courses)

- DB: addr="Gunningrah Road, Bombala", web=null, email=null, phone=null
- golf.com.au (high, sim=0.636, boost=+1.1[coord:605m,city:bombala,db-name-substring,jaccard:1.00], 605m, NSW 2632): name="Bombala Golf Club Ltd", web=null, email="deingram42@hotmail.com", phone="(02) 6458 3306"
- OSM (high, 118m, sim=1): name="Bombala Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.636)
  - phone: from fed(high, sim=0.636)

### Bondi Golf & Diggers Club (Australia, 1 courses)

- DB: addr="5 Military Road, North Bondi", web=null, email=null, phone=null
- golf.com.au (high, sim=0.385, boost=+0.9[coord:4m,city:north,jaccard:0.67], 4m, NSW 2026): name="Bondi Golf Club", web="http://www.bondigolf.com.au", email=null, phone="02 9130 3170"
- OSM (low, 133m, sim=0.385): name="Bondi Golf Course", web="https://www.bondigolf.com.au/", email="admin@bondigolf.com.au", phone="+61 2 9130 3170"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.385)
  - phone: from fed(high, sim=0.385)

### Bonnie Doon Golf Club (Australia, 1 courses)

- DB: addr="Banks Avenue, Pagewood ", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:620m,city:pagewood,db-name-substring,jaccard:1.00], 620m, NSW 2035): name="Bonnie Doon Golf Club", web="http://www.bonniedoongolfclub.com.au", email=null, phone="(02) 9349 2101"
- OSM (high, 25m, sim=1): name="Bonnie Doon Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bonville Golf Resort (Australia, 2 courses)

- DB: addr="North Bonville Road, Bonville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:715m,city:bonville,db-name-substring,jaccard:1.00], 715m, NSW 2450): name="Bonville Golf Resort", web="http://www.bonvillegolf.com.au", email="info@bonvillegolf.com.au", phone="02 6653 4002"
- OSM (low, 272m, sim=0.364): name="Bonville International Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Boolbardie Country Club (Australia, 1 courses)

- DB: addr="Monkey Mia Road, Denham", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:233m,city:denham,db-name-substring,jaccard:1.00], 233m, WA 6537): name="Boolbardie Country Club", web=null, email=null, phone=null
- OSM (low, 95m, sim=0.588): name="Denham Golf Course / Boolbardie Country Club", web=null, email=null, phone=null

### Booleroo Centre Golf Club (Australia, 1 courses)

- DB: addr="Arthur St, Brisbane", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:901m,db-name-substring,jaccard:1.00], 901m, SA 5482): name="Booleroo Centre Golf Club", web=null, email=null, phone="(08) 8667 2305"
- OSM (low, 1056m, sim=1): name="Booleroo Centre Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Boomerang Public Golf Course (Australia, 2 courses)

- DB: addr="167 Old Princes Highway, Maddens Plains", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:144m,city:maddens,db-name-substring,jaccard:1.00], 144m, NSW ): name="Boomerang Public Golf Course", web=null, email=null, phone="02 4294 3434"
- OSM (high, 193m, sim=1): name="Boomerang Public Golf Course", web="http://boomeranggolfcourse.com/", email="info@boomeranggolfcourse.com", phone="+61 2 4294 3434"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 193m, sim=1)
  - email: from osm(high, 193m, sim=1)
  - phone: from fed(high, sim=1)

### Boonah Golf Club (Australia, 2 courses)

- DB: addr="Bruckner Hill Road, Boonah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:183m,city:boonah,db-name-substring,jaccard:1.00], 183m, QLD 4310): name="Boonah Golf Club", web="http://www.boonahgolfclub.com", email="info@boonahgolfclub.com", phone="(07) 5463 1470"
- OSM (high, 14m, sim=1): name="Boonah Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Boorowa Golf & Bowling Club (Australia, 1 courses)

- DB: addr="Market Street, Boorowa", web=null, email=null, phone=null
- golf.com.au (high, sim=0.467, boost=+0.9[coord:23m,city:boorowa,jaccard:0.67], 23m, NSW 2586): name="Boorowa Golf Club", web=null, email=null, phone="6385 3224"
- OSM (low, 3130254m, sim=0.8): name="Morawa Golf and Bowling Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.467)

### Boort Golf Club (Australia, 1 courses)

- DB: addr="Charlton Rd, Boort", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:boort,db-name-substring,jaccard:1.00], 3559m, VIC 3537): name="Boort Golf Club", web=null, email=null, phone="0354552518"
- OSM (low, 3678m, sim=1): name="Boort Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Borden Golf Club (Australia, 2 courses)

- DB: addr="Moir Street, Borden", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:331m,city:borden,db-name-substring,jaccard:1.00], 331m, WA 6338): name="Borden Golf Club", web=null, email=null, phone="0427279235"
- OSM (high, 244m, sim=1): name="Borden Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Bordertown Golf Club (Australia, 1 courses)

- DB: addr="Golf Course Road, Bordertown", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:bordertown,db-name-substring,jaccard:1.00], 4348m, SA 5268): name="Bordertown Golf Club", web=null, email="admin@bordertowngc.com.au", phone="08 8752 0082"
- OSM (low, 4314m, sim=1): name="Bordertown Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Borneo Barracks Golf Club (Australia, 1 courses)

- DB: addr="New England Highway, Cabarlah", web=null, email=null, phone=null
- golf.com.au (high, sim=0.267, boost=+0.9[coord:90m,city:cabarlah,name-token:cabarlah], 90m, QLD 4352): name="Cabarlah Golf Course", web="https://www.cabarlahgolfcourse.com.au", email=null, phone="07 4696 6396"
- OSM (high, 139m, sim=1): name="Borneo Barracks Golf Club", web=null, email=null, phone="+61 7 4696 6396"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.267)
  - phone: from fed(high, sim=0.267)

### Botany Golf Club (Australia, 1 courses)

- DB: addr="1414 Botany Road, Botany", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:73m,city:botany,jaccard:0.67], 73m, NSW 2019): name="Botany Golf Course", web=null, email=null, phone="0419520928"
- OSM (high, 75m, sim=1): name="Botany Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Boulia Golf Club (Australia, 1 courses)

- DB: addr="Winton Road, Boulia", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:65m,city:boulia,db-name-substring,jaccard:1.00], 65m, QLD 4829): name="Boulia Golf Club", web=null, email=null, phone="0473007160"
- OSM (low, 586m, sim=1): name="Boulia Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Bowen Golf Club (Australia, 1 courses)

- DB: addr="Golf Links Road, Bowen", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:46m,city:bowen,db-name-substring,jaccard:1.00], 46m, QLD 4805): name="Bowen Golf Club", web="https://bowengolfclub.com.au", email=null, phone="07 4785 1206"
- OSM (high, 64m, sim=1): name="Bowen Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bowral Golf Club (Australia, 4 courses)

- DB: addr="Cnr Kangaloon Road and David Stree, Bowral", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:169m,city:bowral,db-name-substring,jaccard:1.00], 169m, NSW 2576): name="Bowral Golf Club", web="https://www.bowralgolfclub.com.au", email=null, phone="02 4861 1042"
- OSM (high, 121m, sim=1): name="Bowral Golf Club", web="https://www.bowralgolfclub.com.au/", email=null, phone="+61 2 4861 1042"

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Box Hill Golf Club (Australia, 1 courses)

- DB: addr="202 Station Street, Box Hill South", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:490m,city:hill,db-name-substring,jaccard:1.00], 490m, VIC 3128): name="Box Hill Golf Club", web="http://www.boxhillgolfclub.com.au", email=null, phone="03 9808 1526"
- OSM (high, 39m, sim=1): name="Box Hill Golf Club", web="https://www.boxhillgolfclub.com.au/", email=null, phone="+61 3 9808 4519"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Boyne Island Tannum Sands Country Club (Australia, 1 courses)

- DB: addr="Jacaranda Drive, Boyne Island", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:85m,city:boyne,jaccard:0.67], 85m, QLD 4680): name="Boyne Island Tannum Sands Golf Club", web="https://www.facebook.com/bits.golf", email=null, phone="(07) 4973 3773"
- OSM (high, 95m, sim=1): name="Boyne Island Tannum Sands Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Boyup Brook Golf Club (Australia, 1 courses)

- DB: addr="PO Box 128, Boyup", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:375m,city:boyup,db-name-substring,jaccard:1.00], 375m, WA 6244): name="Boyup Brook Golf Club", web=null, email="boyupbrookgc@bigpond.com", phone="08 9765 1261"
- OSM (high, 134m, sim=1): name="Boyup Brook Golf Club", web="http://www.boyupbrookgolfclub.myclub.org.au/", email=null, phone="+61 8 9765 1261"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 134m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Braidwood Golf Club (Australia, 1 courses)

- DB: addr="Corner Coronation Ave and Victory St, Braidwood", web=null, email=null, phone=null
- golf.com.au (high, sim=0.429, boost=+0.7[coord:25m,city:braidwood], 25m, NSW 2622): name="Braidwood Servicemens Club", web=null, email=null, phone="02 4842 2108"
- OSM (high, 178m, sim=1): name="Braidwood Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.429)

### Branxton Golf Club (Australia, 2 courses)

- DB: addr="25 Cessnock Road, Branxton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:184m,city:branxton,db-name-substring,jaccard:1.00], 184m, NSW 2335): name="Branxton Golf Club", web=null, email=null, phone="(02) 4938 1421"
- OSM (medium, 343m, sim=1): name="Branxton Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Breakers Country Club (Australia, 1 courses)

- DB: addr="64 Dover Road, Wamberal", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:106m,city:wamberal,db-name-substring,jaccard:1.00], 106m, NSW 2260): name="Breakers Country Club", web="http://www.terrigalmemorial.com.au", email="hendersongolf@bigpond.com", phone="02 4384 2661"
- OSM (high, 21m, sim=1): name="Breakers Country Club", web="https://breakerscc.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bremer Bay Golf Club (Australia, 2 courses)

- DB: addr="Frantom Way, Bremer Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:204m,city:bremer,db-name-substring,jaccard:1.00], 204m, WA 6338): name="Bremer Bay Golf Club", web="http://Bremerbaysportsclub.com.au", email="bremerbaygc@gmail.com", phone="0456571436"
- OSM (high, 37m, sim=1): name="Bremer Bay Golf Club", web="https://www.bremerbaysportsclub.com.au/golf-club", email=null, phone="+61 8 9837 4392"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Brewarrina District Golf Club (Australia, 1 courses)

- DB: addr="Tarrion Road, Brewarrina", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:335m,city:brewarrina,db-name-substring,jaccard:1.00], 335m, NSW 2839): name="Brewarrina District Golf Club", web=null, email="gracecatering@bigpond.com", phone="0415972904"
- OSM (low, 62m, sim=0.526): name="Brewarrina Golf Club", web=null, email=null, phone="+61 2 6839 2050;+61 2 6839 2252"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bribie Island Golf Club (Australia, 1 courses)

- DB: addr="Links Court, Woorim", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:487m,city:woorim,db-name-substring,jaccard:1.00], 487m, QLD 4507): name="Bribie Island Golf Club", web="http://www.bribieislandgolfclub.com.au", email=null, phone="(07) 3408 1457"
- OSM (high, 8m, sim=1): name="Bribie Island Golf Club", web="http://www.bribieislandgolfclub.com.au/", email=null, phone="+61 7 3408 2484;+61 7 3408 1457;+61 7 3408 1563"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bridport Golf Club (Australia, 1 courses)

- DB: addr="Main Street, Bridport", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2364m,city:bridport,db-name-substring,jaccard:1.00], 2364m, TAS 7262): name="Bridport Golf Club", web=null, email="admin@bridportgolfclub.com.au", phone="03 6356 1557"
- OSM (high, 20m, sim=1): name="Bridport Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bright Country Golf Club (Australia, 1 courses)

- DB: addr="Back Porepunkah Road, Bright", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:859m,city:bright,db-name-substring,jaccard:1.00], 859m, VIC 3741): name="Bright Country Golf Club", web="https://brightgolf.org.au/", email=null, phone="03 5755 1773"
- OSM (high, 216m, sim=1): name="Bright Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Brighton Lakes RGC (Australia, 1 courses)

- DB: addr="43 Brickmakers Dr, Moorebank", web=null, email=null, phone=null
- golf.com.au (high, sim=0.778, boost=+0.55[coord:1165m,city:moorebank,jaccard:0.50], 1165m, NSW 2170): name="Brighton Lakes Recreation & Golf Club", web="https://www.brightonlakesrgc.com.au", email="reception@brightonlakesrgc.com.au", phone="02 9602 8072"
- OSM (high, 9m, sim=0.778): name="Brighton Lakes Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.778)
  - email: from fed(high, sim=0.778)
  - phone: from fed(high, sim=0.778)

### Brighton Public Golf Course (Australia, 1 courses)

- DB: addr="230 Dendy Street, Brighton East", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:330m,city:brighton,db-name-substring,jaccard:1.00], 330m, VIC 3186): name="Brighton Public Golf Course", web=null, email=null, phone="(03) 9592 1388"
- OSM (high, 140m, sim=1): name="Brighton Public Golf Course", web="https://www.brightongolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 140m, sim=1)
  - phone: from fed(high, sim=1)

### Briighton Golf (Australia, 1 courses)

- DB: addr="Glencairn Ave , Brighton East", web=null, email=null, phone=null
- golf.com.au (high, sim=0.889, boost=+0.95[coord:330m,city:brighton,name-token:brighton,typo:briighton~brighton], 330m, VIC 3186): name="Brighton Public Golf Course", web=null, email=null, phone="(03) 9592 1388"
- OSM (high, 140m, sim=0.889): name="Brighton Public Golf Course", web="https://www.brightongolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 140m, sim=0.889)
  - phone: from fed(high, sim=0.889)

### Brisbane Golf Club (Australia, 2 courses)

- DB: addr="70 Tennyson Memorial Avenue, Yeerongpilly", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:578m,city:yeerongpilly,db-name-substring,jaccard:1.00], 578m, QLD 4105): name="The Brisbane Golf Club", web="http://www.brisbanegolfclub.com.au", email=null, phone="0738481008"
- OSM (low, 10m, sim=0.667): name="The Brisbane Golf Club Inc.", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Broadford Golf Club (Australia, 1 courses)

- DB: addr="Davidson St, Broadford", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:369m,city:broadford,db-name-substring,jaccard:1.00], 369m, VIC 3658): name="Broadford Golf Club", web=null, email="broadfordgc@gmail.com", phone="(03) 5784 1092"
- OSM (high, 35m, sim=1): name="Broadford Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Broken Hill Golf & Country Club (Australia, 3 courses)

- DB: addr="Racecourse Rd, Broken Hil", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2800m,city:broken,db-name-substring,jaccard:1.00], 2800m, NSW 2880): name="Broken Hill Golf & Country Club", web=null, email="bhillgolfclub@bigpond.com", phone="08 8087 9099"
- OSM (no-match, 7804m, sim=0.647): name="South Broken Hill Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Brookwater Golf & Country Club (Australia, 1 courses)

- DB: addr="1 Tournament Drive, Brookwater", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:250m,city:brookwater,jaccard:0.67], 250m, QLD 4300): name="Brookwater Golf Club", web="http://www.brookwatergolf.com", email=null, phone="(07) 3814 5500"
- OSM (medium, 445m, sim=1): name="Brookwater Golf & Country Club", web="https://www.brookwatergolf.com.au", email=null, phone="+61 7 3814 5500"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Broome Golf Club (Australia, 1 courses)

- DB: addr="223 Port Drive, Broome", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:212m,db-name-substring,jaccard:1.00], 212m, WA 6725): name="Broome Golf Club", web="http://www.broomegolfclub.com.au", email="proshop@broomegolfclub.com.au", phone="(08) 9192 2092"
- OSM (low, 714m, sim=1): name="Broome Golf Club", web="https://www.broomegolfclub.net.au/", email="manager@broomegolfclub.com.au", phone="+61 8 9192 2092"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Broomehill Golf Club (Australia, 1 courses)

- DB: addr="Tie Line Road, Broomehill", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:414m,city:broomehill,db-name-substring,jaccard:1.00], 414m, WA 6318): name="Broomehill Golf Club", web=null, email=null, phone="0428229613"
- OSM (high, 77m, sim=1): name="Broomehill Golf Course", web=null, email=null, phone="+61 8 9824 1308"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Bruce Rock Golf Club (Australia, 1 courses)

- DB: addr="Perth Road, Bruce Rock", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:bruce,db-name-substring,jaccard:1.00], 3231m, WA 6418): name="Bruce Rock Golf Club", web=null, email=null, phone="(08) 9061 1070"
- OSM (high, 115m, sim=1): name="Bruce Rock Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Buchan Valley Golf Club (Australia, 1 courses)

- DB: addr="Buchan South, Buchan", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:188m,city:buchan,db-name-substring,jaccard:1.00], 188m, VIC 3885): name="Buchan Valley Golf Club", web=null, email=null, phone="03 5155 9298"
- OSM (low, 53m, sim=0.542): name="Buchan Valley Golf Course and Racecourse", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Bulahdelah Golf Club (Australia, 1 courses)

- DB: addr="Recovery Road, Bulahdelah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:75m,city:bulahdelah,db-name-substring,jaccard:1.00], 75m, NSW 2423): name="Bulahdelah Golf Club", web="https://bulahdelahgolfclub.com.au", email=null, phone="0419230042"
- OSM (high, 161m, sim=1): name="Bulahdelah Golf Course", web=null, email=null, phone="+61 2 4997 4327"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bulimba Golf Club (Australia, 1 courses)

- DB: addr="Quay Street, Bulimba", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:114m,city:bulimba,db-name-substring,jaccard:1.00], 114m, QLD 4171): name="Bulimba Golf Club", web="https://www.bulimbagolfclub.com.au/", email=null, phone="(07) 3399 6524"
- OSM (high, 11m, sim=1): name="Bulimba Golf Club", web=null, email=null, phone="+61 7 3399 6524"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bunbury Golf Club (Australia, 1 courses)

- DB: addr="PO BOX 7036, Eaton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:509m,db-name-substring,jaccard:1.00], 509m, WA 6232): name="Bunbury Golf Club", web=null, email="info@bunburygolfclub.com.au", phone="(08) 9725 1231"
- OSM (high, 15m, sim=1): name="Bunbury Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bundaberg Golf Club (Australia, 1 courses)

- DB: addr="One Mile Road, Bundaberg", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:5m,city:bundaberg,db-name-substring,jaccard:1.00], 5m, QLD 4670): name="Bundaberg Golf Club", web="https://bundaberggolfclub.com.au", email=null, phone="(07) 4152 6765"
- OSM (medium, 447m, sim=1): name="Bundaberg Golf Course", web="https://bundaberggolfclub.com.au/", email=null, phone="+61 7 4151 6706;+61 7 4152 6765"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bundoora Park Public Golf Course (Australia, 1 courses)

- DB: addr="1069 Plenty Road, Bundoora", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:259m,city:bundoora,db-name-substring,jaccard:1.00], 259m, VIC 3083): name="Bundoora Park Public Golf Course", web="https://bundooraparkpublicgolfcourse.com.au/", email="info@bundooraparkpublicgolfcourse.com.au", phone="03 9469 3880"
- OSM (high, 42m, sim=1): name="Bundoora Park Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Buninyong Golf Club (Australia, 1 courses)

- DB: addr="613 Learmonth Street, Buninyong", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:405m,city:buninyong,db-name-substring,jaccard:1.00], 405m, VIC 3357): name="Buninyong Golf Club", web="https://buninyong.golf/", email="admin@buninyong.golf", phone="03 43113805"
- OSM (high, 24m, sim=1): name="Buninyong Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Burcher Golf & Citizens Recreation Club (Australia, 2 courses)

- DB: addr="Bena Street, Burcher", web=null, email=null, phone=null
- golf.com.au (high, sim=0.438, boost=+0.85[coord:82m,city:burcher,jaccard:0.50], 82m, NSW 2671): name="Burcher Golf Club", web=null, email=null, phone="(02) 6972 5217"
- OSM (low, 227m, sim=0.438): name="Burcher Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.438)

### Burleigh Heads (Australia, 1 courses)

- DB: addr="114 Albion street Miami qld, Miami", web=null, email=null, phone=null
- golf.com.au (high, sim=0.571, boost=+0.4[coord:2822m,city:miami], 2822m, QLD 4220): name="Burleigh Golf Club", web="http://www.burleighgolfclub.com.au", email="office@burleighgolfclub.com.au", phone="(07) 5572 8266"
- OSM (low, 907m, sim=0.357): name="Rule 5 Golf Balls", web="https://rule5golfballs.com.au/", email=null, phone="+61 7 5520 3633"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.571)
  - email: from fed(high, sim=0.571)
  - phone: from fed(high, sim=0.571)

### Burleigh Palms Golf Club (Australia, 1 courses)

- DB: addr="234 Tallebudgera Creek Road, Tallebudgera", web=null, email=null, phone=null
- golf.com.au (high, sim=0.643, boost=+0.4[coord:156m], 156m, QLD 4228): name="Burleigh West Golf Driving Range", web=null, email=null, phone="0411230374"
- OSM (no-match, 1072m, sim=0.192): name="Cliff Douglas Tally Valley Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.643)

### Burnie Golf Club (Australia, 1 courses)

- DB: addr="47-49 Scarfe Street, Camdale ", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:150m,city:camdale,db-name-substring,jaccard:1.00], 150m, TAS 7320): name="Burnie Golf Club", web="http://www.burniegc.com", email="info@burniegc.com", phone="03 6435 1443"
- OSM (high, 58m, sim=1): name="Burnie Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Burnley Golf Course (Australia, 1 courses)

- DB: addr="102 Madden Grove, Burnley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.45[coord:301m,jaccard:0.67], 301m, VIC 3079): name="Burnley Golf Club", web=null, email="burnley.golfaust@gmail.com", phone="(03) 9499 7001"
- OSM (high, 32m, sim=1): name="Burnley Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Burns Golf Club Belconnen (Australia, 2 courses)

- DB: addr="Stockdill Drive, Holt", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:21m,city:holt,db-name-substring,jaccard:1.00], 21m, ACT 2915): name="Burns Golf Club Belconnen", web="https://www.burnsclub.com.au/", email=null, phone="02 6254 2922"
- OSM (low, 562m, sim=0.6): name="Belconnen Golf Course", web="https://belconnenmagpies.com.au/", email=null, phone="+61 2 6254 2922"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Burrum District Golf Club (Australia, 1 courses)

- DB: addr="William Street, Howard", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:46m,city:howard,db-name-substring,jaccard:1.00], 46m, QLD 4659): name="Burrum District Golf Club", web="http://burrumdistrictgolf.club", email="admin@burrumdistrictgolf.club", phone="0481568296"
- OSM (high, 86m, sim=1): name="Burrum District Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Burswood Park Golf Course (Australia, 2 courses)

- DB: addr="Roger Mackay Drive, Burswood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.63[coord:1249m,city:burswood,jaccard:0.75], 1249m, WA 6100): name="Burswood Park Public Golf Course", web=null, email=null, phone="08 9470 2992"
- OSM (no-match, 2134958m, sim=0.556): name="Blackwood Golf Course", web="https://www.blackwoodgolf.club/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Busselton Golf Club (Australia, 2 courses)

- DB: addr="277 Chapman Hill Road, Busselton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:busselton,db-name-substring,jaccard:1.00], 4973m, WA 6280): name="Busselton Golf Club", web="https://busseltongolfclub.com.au/cms/", email="reception@busseltongolfclub.com.au", phone="(08) 9753 1050"
- OSM (low, 5408m, sim=1): name="Busselton Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bute Golf Club (Australia, 1 courses)

- DB: addr="Port Broughton Road, Bute", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2145m,city:bute,db-name-substring,jaccard:1.00], 2145m, SA 5560): name="Bute Golf Club", web=null, email=null, phone="(08) 8826 2103"
- OSM (no-match, 2064671m, sim=0.571): name="Buntine Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Byron Bay Golf Course (Australia, 1 courses)

- DB: addr="62 Broken Head Road, Byron Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.5[city:byron,jaccard:0.67], 3168m, NSW 2481): name="Byron Bay Golf Club", web=null, email="admin@byronbaygolfclub.com.au", phone="02 6685 6470"
- OSM (low, 2993m, sim=1): name="Byron Bay Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cabramatta Golf Club (Australia, 1 courses)

- DB: addr="P.O. Box 8063 Mt PRITCHARD, Cabramatta", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:92m,city:cabramatta,db-name-substring,jaccard:1.00], 92m, NSW 2170): name="Cabramatta Golf Club", web="http://www.cabragolf.com.au", email="admin@cabragolf.com.au", phone="(02) 9602 8283"
- OSM (medium, 447m, sim=1): name="Cabramatta Golf Course", web="www.cabragolf.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cadoux Golf Club (Australia, 1 courses)

- DB: addr="King Street, Cadoux", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:694m,city:cadoux,db-name-substring,jaccard:1.00], 694m, WA 6466): name="Cadoux Golf Club", web=null, email="Cadouxgolfclub@gmail.com", phone="0428236693"
- OSM (high, 52m, sim=1): name="Cadoux Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cairns Golf Club (Australia, 3 courses)

- DB: addr="Links Drive, Woree", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:356m,city:woree,db-name-substring,jaccard:1.00], 356m, QLD 4870): name="Cairns Golf Club", web="http://www.cairnsgolfclub.com.au", email="info@cairnsgolfclub.com.au", phone="(07) 4037 6700"
- OSM (high, 115m, sim=1): name="Cairns Golf Club", web="https://cairnsgolfclub.com.au", email=null, phone="+61 7 4037 6700"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Calderwood Valley Golf Course (Australia, 3 courses)

- DB: addr="532 Calderwood Road, Albion Park", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:20m,city:albion,db-name-substring,jaccard:1.00], 20m, NSW ): name="Calderwood Valley Golf Course", web=null, email=null, phone="02 4256 3055"
- OSM (high, 25m, sim=1): name="Calderwood Valley Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Calingiri Golf Club (Australia, 1 courses)

- DB: addr="Cavell Street, Calingiri", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:747m,city:calingiri,db-name-substring,jaccard:1.00], 747m, WA 6569): name="Calingiri Golf Club", web=null, email="calingirigolf@gmail.com", phone="(08) 96711583"
- OSM (high, 93m, sim=1): name="Calingiri Golf Club", web=null, email=null, phone="+61 8 9628 7003;+61 8 9628 7084"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Callala RSL Country Club (Australia, 1 courses)

- DB: addr="43 Callala Beach Road, Callala Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=0.636, boost=+0.9[coord:75m,city:callala,jaccard:0.67], 75m, NSW 2540): name="Callala Country Golf Club", web=null, email="callalagolf@gmail.com", phone="0412535972"
- OSM (low, 678m, sim=0.615): name="Callala Beach Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.636)
  - phone: from fed(high, sim=0.636)

### Calliope Country Club Golf (Australia, 1 courses)

- DB: addr="Stowe Road, Calliope", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:253m,city:calliope,jaccard:0.67], 253m, QLD 4680): name="Calliope Golf Club", web=null, email=null, phone="07 4975 7454"
- OSM (high, 48m, sim=1): name="Calliope Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Caloundra Golf Club (Australia, 3 courses)

- DB: addr="Charles Woodward Drive, Caloundra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:326m,city:caloundra,db-name-substring,jaccard:1.00], 326m, QLD 4551): name="Caloundra Golf Club", web="https://www.caloundragolfclub.com", email=null, phone="07 5491 1811"
- OSM (high, 102m, sim=1): name="Caloundra Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Camden Golf Club (Australia, 1 courses)

- DB: addr="50 Lodges Road, Narellan", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:105m,city:narellan,db-name-substring,jaccard:1.00], 105m, NSW 2570): name="Camden Golf Club", web="http://www.camdengolf.com.au", email=null, phone="4646 1203"
- OSM (medium, 333m, sim=1): name="Camden Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cammeray Golf Club (Australia, 2 courses)

- DB: addr="Park Avenue, Cremorne", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:168m,city:cremorne,db-name-substring,jaccard:1.00], 168m, NSW 2090): name="Cammeray Golf Club", web="http://www.cammeraygolf.com.au", email="admin@cammeraygolf.com.au", phone="(02) 9953 1522"
- OSM (medium, 275m, sim=1): name="Cammeray Golf Course", web="https://cammeraygolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Campbell Town Golf Club (Australia, 1 courses)

- DB: addr="Torlesse Street, Campell Town", web=null, email=null, phone=null
- golf.com.au (high, sim=0.765, boost=+1.1[coord:343m,city:town,db-name-substring,jaccard:1.00], 343m, TAS 7210): name="Campbell Town Golf Club - TAS", web=null, email="campbelltowngolfclub@gmail.com", phone="03 63811209"
- OSM (high, 82m, sim=1): name="Campbell Town Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.765)
  - phone: from fed(high, sim=0.765)

### Campbelltown Golf Club (Australia, 1 courses)

- DB: addr="1 Golf Course Drive, Glen Alpine", web=null, email=null, phone=null
- golf.com.au (high, sim=0.75, boost=+1.25[coord:40m,city:glen,db-name-substring,jaccard:1.00], 40m, NSW 2560): name="Campbelltown Golf Club - NSW", web=null, email=null, phone="02 4622 2900"
- OSM (high, 115m, sim=1): name="Campbelltown Golf Course", web="https://www.campbelltowngolfclub.com.au/", email=null, phone="+61 2 4622 2900"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 115m, sim=1)
  - phone: from fed(high, sim=0.75)

### Camperdown Golf Club (Australia, 1 courses)

- DB: addr="Lake Bullen Merri Road, Camperdown", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:90m,city:camperdown,db-name-substring,jaccard:1.00], 90m, VIC 3260): name="Camperdown Golf Club", web="https://www.camperdowngolf.com.au", email=null, phone="0355931437"
- OSM (medium, 270m, sim=1): name="Camperdown Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Canowindra (Australia, 1 courses)

- DB: addr="1 Browns Avenue, Canowindra ", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:1316m,city:canowindra,db-name-substring,jaccard:0.50], 1316m, NSW 2804): name="Canowindra Golf Club", web=null, email=null, phone="(02) 6344 1342"
- OSM (low, 1340m, sim=1): name="Canowindra Golf course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Canowindra Golf Club (Australia, 1 courses)

- DB: addr="Browns Avenue, Canowindra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1491m,city:canowindra,db-name-substring,jaccard:1.00], 1491m, NSW 2804): name="Canowindra Golf Club", web=null, email=null, phone="(02) 6344 1342"
- OSM (low, 1520m, sim=1): name="Canowindra Golf course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Canterbury Public Golf Course (Australia, 1 courses)

- DB: addr="Moorefields Rd, , Beverly Hills", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:340m,city:hills,db-name-substring,jaccard:1.00], 340m, NSW 2209): name="Canterbury Public Golf Course", web=null, email=null, phone=null
- OSM (high, 9m, sim=1): name="Canterbury Public Golf Course", web="https://canterburygolf.com.au/", email=null, phone="+61 2 9759 5444"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 9m, sim=1)
  - phone: from osm(high, 9m, sim=1)

### Cape Wickham (Australia, 1 courses)

- DB: addr="Cape Wickham Road, King Island, TASMANIA, 7256, King Island", web=null, email=null, phone=null
- golf.com.au (high, sim=0.75, boost=+0.65[plz:7256,db-name-substring,jaccard:0.50], 3081m, TAS 7256): name="Cape Wickham Golf Links (TAS)", web=null, email=null, phone=null
- OSM (low, 719m, sim=1): name="Cape Wickham Golf Course", web=null, email=null, phone=null

### Capel Golf Club (Australia, 1 courses)

- DB: addr="Bussell Highway, Stratha", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:153m,db-name-substring,jaccard:1.00], 153m, WA 6230): name="Capel Golf Club", web="http://www.capelgolfclub.org.au", email=null, phone="(08) 9795 7033"
- OSM (high, 40m, sim=1): name="Capel Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Capella Golf Club (Australia, 1 courses)

- DB: addr="Bonney Doon Rd, Capella", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1327m,city:capella,db-name-substring,jaccard:1.00], 1327m, QLD 4702): name="Capella Golf Club", web=null, email=null, phone="4984 9294"
- OSM (low, 3361326m, sim=0.714): name="Capel Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Caragabal Country Club (Australia, 1 courses)

- DB: addr="Marsden Road, Caragabal", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:312m,city:caragabal,jaccard:0.67], 312m, NSW 2810): name="Caragabal Country Golf Club", web=null, email=null, phone="02 6347 5270"
- OSM (no-match, 1092454m, sim=0.667): name="Baralaba Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Carbrook Golf Club (Australia, 1 courses)

- DB: addr="653 Beenleigh Redland Bay Road, Carbrook", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:312m,city:carbrook,db-name-substring,jaccard:1.00], 312m, QLD 4130): name="Carbrook Golf Club", web="https://carbrookgolfclub.com.au", email="admin@carbrookgolfclub.com.au", phone="(07) 3287 6499"
- OSM (medium, 251m, sim=1): name="Carbrook Golf Club", web="https://carbrookgolfclub.com.au/home.php", email=null, phone="+61 7 3287 6440;+61 7 3287 6499"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cardwell Country Club (Australia, 1 courses)

- DB: addr="Gregory Street, Cardwell", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:187m,city:cardwell], 187m, QLD 4849): name="Cardwell Golf Club", web="https://cardwellgolfclub.com.au/", email="info@cardwellgolfclub.com.au", phone="0448098260"
- OSM (low, 1806273m, sim=0.75): name="Barnwell Park Golf Club", web="https://www.barnwellparkgolfclub.com.au/", email=null, phone="+61 2 9713 9019;+61 2 9713 1162"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Carpentaria Golf Club (Australia, 2 courses)

- DB: addr="1 Tom Morrison Drive, Weipa", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:867m,city:weipa,db-name-substring,jaccard:1.00], 867m, QLD 4874): name="Carpentaria Golf Club", web="http://www.carpentariagolfclub.com.au", email="cgclub@bigpond.net.au", phone="(07) 4069 7332"
- OSM (medium, 367m, sim=1): name="Carpentaria Golf Club", web="http://www.carpentariagolfclub.com/", email=null, phone="+61 7 4069 7332"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Casino Golf Club (Australia, 1 courses)

- DB: addr="147 West Street, Casino", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:41m,city:casino,db-name-substring,jaccard:1.00], 41m, NSW 2470): name="Casino Golf Club", web="http://www.casinogolfclub.com.au", email=null, phone="02 6662 1259"
- OSM (medium, 462m, sim=1): name="Casino Golf Club", web="https://www.casinogolfclub.com.au", email=null, phone="+61 2 6662 1259;+61 2 6662 4047"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Castlecove Country Club (Australia, 2 courses)

- DB: addr="68 Deepwater Road , Castlecove", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:203m,city:castlecove,db-name-substring,jaccard:1.00], 203m, NSW 2087): name="Castlecove Country Club", web="http://www.castlecovegolf.com.au", email=null, phone="9417 5444"
- OSM (high, 115m, sim=0.909): name="Castle Cove Golf Club", web="https://www.castlecovegolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Catalina Club Batemans Bay (Australia, 9 courses)

- DB: addr="154 Beach Road, Batemans Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=0.381, boost=+0.85[coord:37m,city:batemans,jaccard:0.50], 37m, NSW 2536): name="Catalina Club", web="http://www.catalinaclub.com.au", email="golfshop@catalinaclub.com.au", phone="(02) 4472 4022"
- OSM (low, 497m, sim=0.381): name="Catalina Country Club", web="http://www.catalinacountryclub.com.au/", email=null, phone="+61 2 4472 4022"

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=0.381)
  - email: from fed(high, sim=0.381)
  - phone: from fed(high, sim=0.381)

### Cecil Plains Golf Club (Australia, 1 courses)

- DB: addr="Dalby Road, Dalby Road", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:375m,db-name-substring,jaccard:1.00], 375m, QLD 4407): name="Cecil Plains Golf Club", web=null, email=null, phone="07 4668 0155"
- OSM (high, 60m, sim=1): name="Cecil Plains Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Ceduna Golf Course (Australia, 1 courses)

- DB: addr="Kuhlman Street, Ceduna", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:479m,city:ceduna,jaccard:0.67], 479m, SA 5690): name="Ceduna Golf Club", web=null, email=null, phone="(08)86252826"
- OSM (high, 35m, sim=1): name="Ceduna Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Centenary Park Public Golf Course (Australia, 1 courses)

- DB: addr="Centenary Park Mcclelland Dr, Frankston", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.92[coord:14m,city:frankston,jaccard:0.75], 14m, VIC ): name="Centenary Park Golf Course", web="https://centenarypark.com.au", email=null, phone="03 9789 1480"
- OSM (medium, 481m, sim=1): name="Centenary Park Golf Course", web="https://www.centenaryparkgolfclub.org/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cerberus Golf Club (Australia, 2 courses)

- DB: addr="Stony Point Rd HMAS, Cerberus", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:417m,city:hmas,db-name-substring,jaccard:1.00], 417m, VIC 3920): name="Cerberus Golf Club", web=null, email="manager@cerberusgolfclub.com.au", phone="03 5983 6006"
- OSM (high, 137m, sim=1): name="Cerberus Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cervantes Golf Club (Australia, 1 courses)

- DB: addr="Aragon Street, Cervantes", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:566m,city:cervantes,db-name-substring,jaccard:1.00], 566m, WA 6511): name="Cervantes Golf Club", web=null, email=null, phone="(08) 9652 7054"
- OSM (high, 45m, sim=1): name="Cervantes Golf Club", web="https://theclubcervantes.com.au/golf/", email=null, phone="+61 8 9652 7700;+61 8 9652 7078"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 45m, sim=1)
  - phone: from fed(high, sim=1)

### Chambers Pines Golf Course (Australia, 1 courses)

- DB: addr="657a Chambers Flat Road, Chambers Flat", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:410m,city:chambers,db-name-substring,jaccard:1.00], 410m, QLD ): name="Chambers Pines Golf Course", web=null, email=null, phone="0738035402"
- OSM (no-match, 1099349m, sim=0.6): name="Charters Towers Golf Club", web=null, email=null, phone="+61 7 4787 1229"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Charlestown Golf Club (Australia, 1 courses)

- DB: addr="Barker Ave, Warners Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.65[coord:1622m,db-name-substring,jaccard:1.00], 1622m, NSW 2282): name="Charlestown Golf Club", web="http://www.charlestowngolfclub.com", email="admin@charlestowngolfclub.com.au", phone="02 4943 7944"
- OSM (low, 1436m, sim=1): name="Charlestown Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Charleville Golf Club (Australia, 1 courses)

- DB: addr="May Street, Charleville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:581m,city:charleville,db-name-substring,jaccard:1.00], 581m, QLD 4470): name="Charleville Golf Club", web=null, email=null, phone="07 4654 3551"
- OSM (high, 67m, sim=1): name="Charleville Golf Club", web=null, email=null, phone="+61 7 4654 1551"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Charlton Golf Club (Australia, 1 courses)

- DB: addr="Off Borung Highway, Charlton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:88m,city:charlton,db-name-substring,jaccard:1.00], 88m, VIC 3525): name="Charlton Golf Club", web=null, email=null, phone="0419335900"
- OSM (high, 204m, sim=1): name="Charlton Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Charters Towers Golf Club (Australia, 2 courses)

- DB: addr="Darymple Road, Charters Towers", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:315m,city:charters,db-name-substring,jaccard:1.00], 315m, QLD 4820): name="Charters Towers Golf Club", web=null, email=null, phone="07 47871229"
- OSM (high, 12m, sim=1): name="Charters Towers Golf Club", web=null, email=null, phone="+61 7 4787 1229"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Chatswood Golf Club (Australia, 2 courses)

- DB: addr="Club House, Beaconsfield Road, Chatswood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:375m,city:chatswood,db-name-substring,jaccard:1.00], 375m, NSW 1570): name="Chatswood Golf Club", web="http://www.chatswoodgolf.com.au", email="info@newgreenschatswood.com.au", phone="(02) 9419 2336"
- OSM (high, 113m, sim=1): name="Chatswood Golf Club", web="https://chatswoodgolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cheltenham Golf Club (Australia, 1 courses)

- DB: addr="33 Victor Avenue, Cheltenham", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:59m,city:cheltenham,db-name-substring,jaccard:1.00], 59m, VIC 3192): name="Cheltenham Golf Club", web="https://cheltenhamgolf.com.au/", email="info@cheltenhamgolf.com.au", phone="03 95836419"
- OSM (high, 10m, sim=1): name="Cheltenham Golf Club", web="https://www.cheltenhamgolf.com.au/", email=null, phone="+61 3 9583 2567"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Chequers Golf Club (Australia, 2 courses)

- DB: addr="Sounness Drive, Bullsbrook", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:357m,city:bullsbrook,db-name-substring,jaccard:1.00], 357m, WA 6084): name="Chequers Golf Club", web="https://www.chequersgolf.com/", email=null, phone="(08) 9571 1277"
- OSM (high, 21m, sim=1): name="Chequers Golf Club", web="https://chequersgolf.org/", email="bookings@chequersgolf.org", phone="+61 8 9571 1277"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 21m, sim=1)
  - phone: from fed(high, sim=1)

### Chinchilla Golf Club (Australia, 1 courses)

- DB: addr="Warrego Highway, Chinchilla", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:chinchilla,db-name-substring,jaccard:1.00], 3026m, QLD 4413): name="Chinchilla Golf Club", web=null, email=null, phone="4662 7438"
- OSM (low, 2794m, sim=1): name="Chinchilla Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Chinderah Golf Course (Australia, 2 courses)

- DB: addr="Lot 2 Tweed Coast Road, Chinderah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:327m,db-name-substring,jaccard:1.00], 327m, NSW 2487): name="Chinderah Golf Course", web=null, email=null, phone="0450495558"
- OSM (high, 39m, sim=1): name="Chinderah Golf Course", web="https://chinderahgolf.com.au/", email=null, phone="+61 2 6674 0420"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 39m, sim=1)
  - phone: from fed(high, sim=1)

### Christmas Island Golf Club (Australia, 1 courses)

- DB: addr="Settlement, Christmas Island", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:76m,city:christmas,db-name-substring,jaccard:1.00], 76m, WA 6798): name="Christmas Island Golf Club", web="https://www.christmasislandgolfclub.com", email="christmasislandgolf@gmail.com", phone="(08) 9164 8546"
- OSM (high, 43m, sim=1): name="Christmas Island Golf Course", web="https://www.christmasislandgolfclub.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Churchill and Monash Golf Course (Australia, 1 courses)

- DB: addr="Mary Grant Bruce Drive, Churchill", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.92[coord:215m,city:churchill,jaccard:0.75], 215m, VIC 3842): name="Churchill and Monash Golf Club", web=null, email="churchillmonashgc@bigpond.com", phone="0351221777"
- OSM (high, 96m, sim=1): name="Churchill & Monash Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Churchill Park Golf Club (Australia, 2 courses)

- DB: addr="113 Churchill Park Drive, Endeavour Hills", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:249m,city:endeavour,db-name-substring,jaccard:1.00], 249m, VIC 3802): name="Churchill Park Golf Club", web="http://www.churchillparkgolf.com.au", email=null, phone="03 97004445"
- OSM (high, 12m, sim=1): name="Churchill Park Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### City Golf Club (Australia, 2 courses)

- DB: addr="254 South Street, Toowoomba", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:343m,city:south,db-name-substring,jaccard:1.00], 343m, QLD 4350): name="City Golf Club", web="https://citygolf.com.au", email=null, phone="07 4636 9020"
- OSM (high, 39m, sim=1): name="City Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### City Golf Club Toowoomba (Australia, 1 courses)

- DB: addr="254 South Street, South Toowoomba", web=null, email=null, phone=null
- golf.com.au (high, sim=0.286, boost=+0.75[coord:343m,city:south,jaccard:0.67], 343m, QLD 4350): name="City Golf Club", web="https://citygolf.com.au", email=null, phone="07 4636 9020"
- OSM (low, 39m, sim=0.286): name="City Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.286)
  - phone: from fed(high, sim=0.286)

### City Of Adelaide Par 3 Links (Australia, 1 courses)

- DB: addr="War Memorial Drive, Adelaide", web=null, email=null, phone=null
- golf.com.au (high, sim=0.579, boost=+0.6[coord:19m,jaccard:0.67], 19m, SA 5000): name="Adelaide Par 3 Links (SA)", web=null, email=null, phone="0452220577"
- OSM (low, 312m, sim=0.8): name="North Adelaide Golf Course Par 3", web="https://northadelaidegolf.com.au/", email=null, phone="+61 8 8203 7273"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.579)

### Clare Golf Club (Australia, 1 courses)

- DB: addr="White Hut Road, Clare", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:209m,city:clare,db-name-substring,jaccard:1.00], 209m, SA 5453): name="Clare Golf Club", web="http://www.claregolfclub.com.au", email=null, phone="(08) 8842 1022"
- OSM (high, 151m, sim=1): name="Clare Golf Course", web="http://www.claregolfclub.com/", email=null, phone="+61 8 8842 1022;+61 8 8842 4084"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Claremont Golf Club (Australia, 2 courses)

- DB: addr="Claremont Golf Club, Claremont", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:78m,city:claremont,db-name-substring,jaccard:1.00], 78m, TAS 7011): name="Claremont Golf Club", web="https://www.claremontgolf.com.au/", email="info@claremontgolf.com.au", phone="03 6249 1000"
- OSM (medium, 479m, sim=1): name="Claremont Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Clermont Golf Club (Australia, 2 courses)

- DB: addr="East Stree, Clermont", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:844m,city:clermont,db-name-substring,jaccard:1.00], 844m, QLD 4721): name="Clermont Golf Club", web=null, email=null, phone="07 4983 1163"
- OSM (low, 776m, sim=1): name="Clermont Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Cleve Golf Club (Australia, 2 courses)

- DB: addr="Golf Drive, Cleve", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:709m,city:cleve,db-name-substring,jaccard:1.00], 709m, SA 5640): name="Cleve Golf Club", web=null, email=null, phone=null
- OSM (high, 30m, sim=1): name="Cleve Golf Club", web=null, email=null, phone=null

### Clover Leigh Golf Club (Australia, 1 courses)

- DB: addr="777 Karoopa Lane, Crowther", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:112m,city:crowther,db-name-substring,jaccard:1.00], 112m, NSW 2803): name="Clover Leigh Golf Club", web="http://www.cloverleighgolfclub.com.au", email=null, phone="02 6383 7383"
- OSM (high, 121m, sim=0.917): name="Cloverleigh Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Club Banora Golf Club (Australia, 2 courses)

- DB: addr="Leisure Drive, Banora Point", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:542m,city:banora,db-name-substring,jaccard:1.00], 542m, NSW 2485): name="Club Banora Golf Club", web="http://www.twintowns.com.au", email=null, phone="07 5524 1544"
- OSM (high, 30m, sim=1): name="Club Banora Golf Club", web="https://clubbanoragolfclub.com.au", email=null, phone="+61 7 5524 6666"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Club Mandalay (Australia, 1 courses)

- DB: addr="Mandalay Circuit, Beveridge", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:10m,city:beveridge,jaccard:0.50], 10m, VIC 3753): name="Mandalay Golf Club", web="https://www.clubmandalay.com.au/", email="play@clubmandalay.com.au", phone="03 9037 3700"
- OSM (low, 313491m, sim=0.75): name="Nandaly Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### cluBarham Golf & Sports (Australia, 1 courses)

- DB: addr="6-8 Niemur Street, Barham", web=null, email=null, phone=null
- golf.com.au (high, sim=0.375, boost=+0.6[coord:1644m,city:barham,name-token:barham], 1644m, NSW 2732): name="Barham Golf Club", web="http://www.clubarham.com.au", email=null, phone="(03) 5453 2772"
- OSM (no-match, 1621m, sim=0.375): name="Barham Golf Resort", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.375)
  - phone: from fed(high, sim=0.375)

### Clunes Golf Club (Australia, 1 courses)

- DB: addr="65 Golf Course Road, Clunes", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:267m,city:clunes,db-name-substring,jaccard:1.00], 267m, VIC 3370): name="Clunes Golf Club", web=null, email="clunesgolf@gmail.com", phone="03 5345 3499"
- OSM (high, 164m, sim=1): name="Clunes Golf Course", web=null, email=null, phone="+61 3 5345 3499"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cobar Bowling & Golf Club (Australia, 1 courses)

- DB: addr="Bloxham Street, Cobar", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:835m,city:cobar,jaccard:1.00], 835m, NSW 2835): name="Cobar Bowling and Golf Club", web=null, email="fayhardwick48@hotmail.com", phone="6836 2214"
- OSM (high, 101m, sim=1): name="Cobar Bowling & Golf Club", web="https://www.cobarbowls.com.au/", email=null, phone="+61 2 6836 2214"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 101m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cobden Golf Club (Australia, 3 courses)

- DB: addr="Neylon Street, Cobden", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:246m,city:cobden,db-name-substring,jaccard:1.00], 246m, VIC 3266): name="Cobden Golf Club", web="https://cobdengolf.com.au", email="info@cobdengolf.com.au", phone="03 5595 1393"
- OSM (high, 42m, sim=1): name="Cobden Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cobram-Barooga Golf Club (Australia, 2 courses)

- DB: addr="Burkinshaw St, Barooga", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:110m,city:barooga,db-name-substring,jaccard:1.00], 110m, NSW 3644): name="Cobram-Barooga Golf Club", web="http://www.cbgc.com.au", email=null, phone="(03) 5873 4448"
- OSM (medium, 437m, sim=1): name="Cobram-Barooga Golf Club", web="https://cbgc.com.au/", email=null, phone="+61 3 5873 4372;+61 3 5873 4304"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cocos Islands Golf Club (Australia, 1 courses)

- DB: addr="Cocos Islands", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:19m,db-name-substring,jaccard:1.00], 19m, WA 6799): name="Cocos Islands Golf Club", web=null, email=null, phone="08 9162 7707"
- OSM (no-match, 6101435m, sim=0.615): name="Bay Islands Golf Club", web="https://macleayislandgolfclub.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Coffin Bay Golf Club (Australia, 1 courses)

- DB: addr="Giles Road, Coffin Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:84m,city:coffin,db-name-substring,jaccard:1.00], 84m, SA 5607): name="Coffin Bay Golf Club", web=null, email=null, phone="(04) 27854379"
- OSM (high, 134m, sim=1): name="Coffin Bay Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Coffs Harbour Golf Club (Australia, 10 courses)

- DB: addr="Earl Street, Coffs Harbour", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:150m,city:coffs,db-name-substring,jaccard:1.00], 150m, NSW 2450): name="Coffs Harbour Golf Club", web="http://www.coffsharbourgolfclub.com.au", email="reception@coffsharbourgolfclub.com.au", phone="02 6652 3244"
- OSM (high, 53m, sim=1): name="Coffs Harbour Golf Club", web="https://www.coffsharbourgolfclub.com.au/", email=null, phone="+61 2 6652 3244"

**Proposed UPDATE** (alle 10 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cohuna Golf Club (Australia, 1 courses)

- DB: addr="Weymouth Road, Cohuna", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:199m,city:cohuna,db-name-substring,jaccard:1.00], 199m, VIC 3568): name="Cohuna Golf Club", web="https://www.cohunagolfclub.au/", email=null, phone="03 5456 2820"
- OSM (high, 28m, sim=1): name="Cohuna Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Colac Golf Club (Australia, 2 courses)

- DB: addr="32 Colac - Lavers Hill Road, Elliminyt", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:620m,city:elliminyt,db-name-substring,jaccard:1.00], 620m, VIC 3250): name="Colac Golf Club", web="https://colacgolfclub.com.au", email="info@colacgolfclub.com", phone="03 5231 5769"
- OSM (medium, 389m, sim=1): name="Colac Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Coleambally Golf Club (Australia, 1 courses)

- DB: addr="Pine Drive, Coleambally", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:216m,city:coleambally,db-name-substring,jaccard:1.00], 216m, NSW 2707): name="Coleambally Golf Club", web=null, email="coleamballygolfclub@gmail.com", phone="+61404442426"
- OSM (high, 14m, sim=1): name="Coleambally Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Colebrook Golf Club (Australia, 1 courses)

- DB: addr="Bartonvale Road, Campania", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:105m,city:campania,db-name-substring,jaccard:1.00], 105m, TAS 7026): name="Colebrook Golf Club", web="http://www.colebrookgolfclub.org.au", email=null, phone="(03) 6260 4402"
- OSM (high, 0m, sim=1): name="Colebrook Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Coleraine Golf Club (Australia, 1 courses)

- DB: addr="Gordeon Street, Coleraine", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:227m,city:coleraine,db-name-substring,jaccard:1.00], 227m, VIC 3315): name="Coleraine Golf Club", web=null, email=null, phone="(03) 5575 2050"
- OSM (high, 22m, sim=1): name="Coleraine Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Collarenebri Golf Club (Australia, 1 courses)

- DB: addr="Wilson Street, Collarenebri", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:893m,city:collarenebri,db-name-substring,jaccard:1.00], 893m, NSW 2833): name="Collarenebri Golf Club", web=null, email=null, phone="02 6756 5171"
- OSM (no-match, 3124016m, sim=0.5): name="Collier Park Golf Course", web="https://www.collierparkgolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Collie Golf Club (Australia, 1 courses)

- DB: addr="Mungalup Road, Collie", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:65m,city:collie,db-name-substring,jaccard:1.00], 65m, WA 6225): name="Collie Golf Club", web=null, email="colliegolf@westnet.com.au", phone="(08) 9734 1655"
- OSM (high, 10m, sim=1): name="Collie Golf Club", web="http://colliegolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 10m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Collier Park Golf Club (Australia, 9 courses)

- DB: addr="Hayman Rd, Como ", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:69m,city:como,jaccard:0.50], 69m, WA 6152): name="Collier Park Public Golf Course", web=null, email=null, phone="08 9450 6488"
- OSM (high, 66m, sim=1): name="Collier Park Golf Course", web="https://www.collierparkgolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from osm(high, 66m, sim=1)
  - phone: from fed(high, sim=1)

### Collinsville Golf Club (Australia, 1 courses)

- DB: addr="Moongunya Drive, Collinsville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:56m,city:collinsville,db-name-substring,jaccard:1.00], 56m, QLD 4804): name="Collinsville Golf Club", web=null, email=null, phone="0747855352"
- OSM (high, 145m, sim=1): name="Collinsville Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Colonial Golf Course (Australia, 1 courses)

- DB: addr="Werrington Rd, Werrington", web=null, email=null, phone=null
- golf.com.au (high, sim=0.471, boost=+0.63[coord:23m,jaccard:0.75], 23m, NSW 2747): name="Colonial Golf and Footgolf Course", web=null, email=null, phone="0433214389"
- OSM (high, 23m, sim=1): name="Colonial Golf Course", web=null, email=null, phone="+61 2 9673 3639"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.471)

### Commonwealth Golf Club (Australia, 1 courses)

- DB: addr="Glennie Avenue South, Oakleigh", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:153m,city:south,db-name-substring,jaccard:1.00], 153m, VIC 3167): name="Commonwealth Golf Club", web=null, email=null, phone="03 95750444"
- OSM (high, 37m, sim=1): name="The Commonwealth Golf Club", web="https://www.commonwealthgolf.com.au/", email=null, phone="+61 3 9575 0444"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 37m, sim=1)
  - phone: from fed(high, sim=1)

### Concord Golf Club (Australia, 1 courses)

- DB: addr="Majors Bay Road, Concord", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:148m,city:concord,db-name-substring,jaccard:1.00], 148m, NSW 2137): name="Concord Golf Club", web="http://www.concordgolfclub.com.au", email=null, phone="9743 6111"
- OSM (high, 151m, sim=1): name="Concord Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Condobolin Golf Club (Australia, 1 courses)

- DB: addr="Tasker Street, Condobolin", web=null, email=null, phone=null
- golf.com.au (high, sim=0.476, boost=+0.55[coord:395m,city:condobolin], 395m, NSW 2877): name="Condobolin Sports Club Ltd", web=null, email="michaelhanlon55@icloud.com", phone="0268952465"
- OSM (high, 90m, sim=1): name="Condobolin Golf Club", web=null, email=null, phone="+61 2 6895 2465"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.476)
  - phone: from fed(high, sim=0.476)

### Cooktown Country Golf Club (Australia, 1 courses)

- DB: addr="Quarantine Bay Road, Cooktown", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:97m,city:cooktown,jaccard:0.67], 97m, QLD 4895): name="Cooktown Golf Club", web="http://www.cooktowngolfclub.com.au", email=null, phone="0476968471"
- OSM (high, 0m, sim=1): name="Cooktown Country Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Coolah Golf Club (Australia, 1 courses)

- DB: addr="Goddard Street, Coolah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[coord:363m,city:coolah], 363m, NSW 2843): name="Coolah Sporting Club", web=null, email="coolahgolf@gmail.com", phone="6377 1222"
- OSM (medium, 464m, sim=1): name="Coolah Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Coolamatong Country Sports Club (Australia, 1 courses)

- DB: addr="Jindabyne Road, Berridale", web=null, email=null, phone=null
- golf.com.au (high, sim=0.577, boost=+0.85[coord:41m,city:berridale,jaccard:0.50], 41m, NSW 2628): name="Coolamatong Snowy Mountain Country Club", web="http://www.coolamatonggolfclub.com.au", email="accounts@coolamatonggolfclub.com.au", phone="6456 3321"
- OSM (low, 267m, sim=0.611): name="Coolamatong Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.577)
  - email: from fed(high, sim=0.577)
  - phone: from fed(high, sim=0.577)

### Coolamon repairs (Australia, 1 courses)

- DB: addr="Coolamon", web=null, email=null, phone=null
- golf.com.au (high, sim=0.688, boost=+0.55[coord:999m,city:coolamon], 999m, NSW 2701): name="Coolamon Sport and Recreation Club", web=null, email=null, phone="02 6927 3178"
- OSM (no-match, 1359m, sim=0.5): name="Coolamon Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.688)

### Coolangatta Tweed (Australia, 2 courses)

- DB: addr="Soorley Street, Tweed Heads South", web=null, email=null, phone=null
- golf.com.au (high, sim=0.739, boost=+0.65[city:tweed,name-token:heads,jaccard:0.50], 3476m, NSW 2486): name="Coolangatta and Tweed Heads Golf Club", web="https://www.cooltweedgolf.com.au", email=null, phone="07 5524 4544"
- OSM (low, 2678m, sim=0.739): name="Coolangatta & Tweed Heads Golf Club", web="https://www.cooltweedgolf.com.au", email="golfbookings@cooltweedgolf.com.au", phone="+61 7 5524 5545;+61 7 5524 4544"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.739)
  - phone: from fed(high, sim=0.739)

### Cooma Golf Club (Australia, 1 courses)

- DB: addr="Dry Plains Road, Cooma", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:333m,city:cooma,db-name-substring,jaccard:1.00], 333m, NSW 2630): name="Cooma Golf Club", web="http://www.coomagolfclub.com.au", email="coomagc@bigpond.net.au", phone="02 6452 2243"
- OSM (high, 136m, sim=1): name="Cooma Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Coomealla Golf Club (Australia, 1 courses)

- DB: addr="Silver City Highway, Dareton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:231m,city:dareton,db-name-substring,jaccard:1.00], 231m, NSW 2717): name="Coomealla Golf Club", web="https://www.coomeallaclub.com.au/golf-club/", email=null, phone="03 5027 4517"
- OSM (high, 16m, sim=1): name="Coomealla Golf Club", web="https://www.coomeallaclub.com.au/golf-club", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Coonabarabran Golf Club (Australia, 1 courses)

- DB: addr="River Road, Coonabarabran", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:239m,city:coonabarabran,db-name-substring,jaccard:1.00], 239m, NSW 2357): name="Coonabarabran Golf Club", web=null, email="coonagolf@bigpond.com", phone="6842 1292"
- OSM (high, 34m, sim=1): name="Coonabarabran Golf Course", web=null, email=null, phone="+61 2 6842 1292"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Coonalpyn Golf Club (Australia, 1 courses)

- DB: addr="Lameroo Road, Coonalpyn", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:130m,city:coonalpyn,db-name-substring,jaccard:1.00], 130m, SA 5265): name="Coonalpyn Golf Club", web=null, email=null, phone="0885736536"
- OSM (high, 156m, sim=1): name="Coonalpyn Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Coonamble Golf Club (Australia, 1 courses)

- DB: addr="Caswell Street, Coonamble", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:32m,city:coonamble,db-name-substring,jaccard:1.00], 32m, NSW 2829): name="Coonamble Golf Club", web=null, email="admin@coonamblegolfclub.com.au", phone="02 6822 1303"
- OSM (medium, 470m, sim=1): name="Coonamble Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Coorow Golf Club (Australia, 1 courses)

- DB: addr="Jensen Street , Coorow", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:251m,city:coorow,db-name-substring,jaccard:1.00], 251m, WA 6515): name="Coorow Golf Club", web=null, email=null, phone="0899511327"
- OSM (high, 129m, sim=1): name="Coorow Golf Club", web=null, email=null, phone="+61 8 9952 1011;+61 8 9952 1225"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Cootamundra Country Club (Australia, 1 courses)

- DB: addr="94 Hurley Street,, Cootamundra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:761m,city:cootamundra,db-name-substring,jaccard:1.00], 761m, NSW 2590): name="Cootamundra Country Club", web=null, email=null, phone="026942 1330"
- OSM (no-match, 1190m, sim=0.611): name="Cootamundra Golf & Sports Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Coraki Golf Club (Australia, 1 courses)

- DB: addr="Kardina Street, Coraki", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:117m,city:coraki,db-name-substring,jaccard:1.00], 117m, NSW 2471): name="Coraki Golf Club", web="https://corakigolf.com.au", email=null, phone="02 66832001"
- OSM (medium, 454m, sim=1): name="Coraki Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Coral Cove Golf Club (Australia, 1 courses)

- DB: addr="1 Pebble Beach Drive, Coral Cove", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:139m,city:coral,db-name-substring,jaccard:1.00], 139m, QLD 4670): name="Coral Cove Golf Club ", web="https://www.coralcovegolfclub.com.au", email="proshop@coralcovegolfclub.com", phone="07 4159 3333"
- OSM (low, 806m, sim=1): name="Coral Cove Golf Course", web="http://www.coralcoveresort.com.au/", email="reservations@coralcoveresort.com.au", phone="+61 7 4159 3333;+61 7 4132 5600"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Corinda Golf Course (Australia, 2 courses)

- DB: addr="375 Cliveden Avenue, Oxley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:438m,db-name-substring,jaccard:1.00], 438m, QLD 4075): name="Corinda Golf Course", web=null, email=null, phone=null
- OSM (low, 182m, sim=0.333): name="Oxley Golf Complex - Corinda Golf Course", web="https://oxleygolfcomplex.com.au/", email=null, phone="+61 7 3379 7836"

### Corowa Golf Club (Australia, 6 courses)

- DB: addr="Hume St, Corowa", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:33m,city:corowa,db-name-substring,jaccard:1.00], 33m, NSW 2646): name="Corowa Golf Club", web="http://www.corowagolfclub.com.au", email=null, phone="02 6033 1466"
- OSM (high, 105m, sim=1): name="Corowa Golf Course", web="http://corowagolf.com.au/", email=null, phone="+61 2 6033 1466"

**Proposed UPDATE** (alle 6 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Corrigin Golf Club (Australia, 1 courses)

- DB: addr="Dry Well Road, Corrigin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:484m,city:corrigin,db-name-substring,jaccard:1.00], 484m, WA 6375): name="Corrigin Golf Club", web=null, email=null, phone="0437263398"
- OSM (high, 87m, sim=1): name="Corrigin Golf Club", web=null, email=null, phone="+61 8 9063 2361;+61 8 9063 2165"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Corryong Golf Club (Australia, 1 courses)

- DB: addr="Jardine Street, Corryong", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:174m,city:corryong,db-name-substring,jaccard:1.00], 174m, VIC 3707): name="Corryong Golf Club", web=null, email="corryonggolf@gmail.com", phone="02 6076 1081"
- OSM (high, 163m, sim=1): name="Corryong Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cosgrove Golf Club (Australia, 1 courses)

- DB: addr="New Dookie Road, Cosgrove", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:64m,db-name-substring,jaccard:1.00], 64m, VIC 3631): name="Cosgrove Golf Club", web=null, email=null, phone="(03) 5828 8203"
- OSM (high, 46m, sim=1): name="Cosgrove Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Cottesloe Golf Club (Australia, 1 courses)

- DB: addr="173 Alfred Road, Perth", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[db-name-substring,jaccard:1.00], 3769m, WA 6912): name="Cottesloe Golf Club", web="http://www.cottesloegc.com", email="enquiries@cottesloegc.com", phone="(08) 9384 3222"
- OSM (low, 309m, sim=0.111): name="Seaview Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Country Club Tasmania (Australia, 1 courses)

- DB: addr="Country Club Avenue, Prospect Vale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:380m,city:prospect,db-name-substring,jaccard:1.00], 380m, TAS 7250): name="Country Club Tasmania", web=null, email=null, phone="03 63355740"
- OSM (low, 361m, sim=0.364): name="Country Club Tasmania / Prospect Vale Golf Club", web="https://www.countryclubtasmania.com.au/default.asp?pID=286", email=null, phone="+61 3 6225 7092"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Cowell Golf Club (Australia, 1 courses)

- DB: addr="Lincoln Highway, Cowell", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:240m,city:cowell,db-name-substring,jaccard:1.00], 240m, SA 5602): name="Cowell Golf Club", web=null, email="zachary.crabb38@gmail.com", phone="0419744723"
- OSM (high, 142m, sim=1): name="Cowell Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cragieburn Public Golf Course (Australia, 2 courses)

- DB: addr="Craigieburn Road West, Craigieburn", web=null, email=null, phone=null
- golf.com.au (high, sim=0.5, boost=+0.95[coord:290m,city:craigieburn,name-token:craigieburn,typo:cragieburn~craigieburn], 290m, VIC 3064): name="Craigieburn Willmott Golf Club", web="https://craigieburnsc.com.au", email="craigieburngolfproshop@gmail.com", phone="03 9308 2774"
- OSM (high, 69m, sim=0.909): name="Craigieburn Public Golf Course", web="https://craigieburnsc.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.5)
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Craignish Country Golf Club (Australia, 1 courses)

- DB: addr="72 Castles Road, Craignish", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.36, boost=+0.55[coord:485m,city:craignish], 485m, QLD 4655): name="Craignish Golf Club at Fraser Lakes Course", web=null, email=null, phone=null
- OSM (high, 106m, sim=1): name="Craignish Country Club", web=null, email=null, phone="+61 7 4128 7186"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from osm(high, 106m, sim=1)

### Creekside Golf Club (Australia, 1 courses)

- DB: addr="Morack Road, Heathmont", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[db-name-substring,jaccard:1.00], 4274m, VIC 3131): name="Creekside Golf Club", web=null, email="creeksidegc@outlook.com", phone="0447037097"
- OSM (no-match, 1335826m, sim=0.556): name="Lakeside Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Crescent Head Country Club (Australia, 1 courses)

- DB: addr="1 Rankine Street, Crescent Head", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:16m,city:crescent,db-name-substring,jaccard:1.00], 16m, NSW 2440): name="Crescent Head Country Club", web=null, email=null, phone="02 6566 0268"
- OSM (high, 249m, sim=1): name="Crescent Head Country Club", web="https://www.chcclub.com.au/", email=null, phone="+61 2 6566 0268"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 249m, sim=1)
  - phone: from fed(high, sim=1)

### Cromer Golf Club (Australia, 1 courses)

- DB: addr="Cromer Road, Cromer", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:285m,city:cromer,db-name-substring,jaccard:1.00], 285m, NSW 2099): name="Cromer Golf Club", web="http://www.cromergolfclub.com.au", email="admin@cromergolfclub.com.au", phone="02 9982 3088"
- OSM (high, 26m, sim=1): name="Cromer Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cronulla Golf Club (Australia, 1 courses)

- DB: addr="Cnr Hume & Elouera Roads, Sydney", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:7m,db-name-substring,jaccard:1.00], 7m, NSW 2229): name="Cronulla Golf Club", web="http://www.cronullagolf.com.au", email="info@cronullagolf.com.au", phone="(02) 9523 6777"
- OSM (medium, 466m, sim=1): name="Cronulla Golf Course", web="https://www.cronullagolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Crookwell Golf Club (Australia, 1 courses)

- DB: addr="Grange Road, Crookwell", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:79m,city:crookwell,db-name-substring,jaccard:1.00], 79m, NSW 2583): name="Crookwell Golf Club", web=null, email="crookwellgolf@gmail.com", phone="0468797483"
- OSM (high, 79m, sim=1): name="Crookwell Golf Club", web=null, email=null, phone="+61 2 4832 1323"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Crowra Golf club (Australia, 1 courses)

- DB: addr="Mees Road, Cowra", web=null, email=null, phone=null
- golf.com.au (high, sim=0.833, boost=+0.9[coord:66m,city:cowra,name-token:cowra], 66m, NSW 2794): name="Cowra Golf Club", web="http://www.cowragolfclub.com.au", email=null, phone="(02) 6342 2299"
- OSM (low, 473m, sim=0.833): name="Cowra Golf Club", web="https://www.cowragolfclub.com.au/", email="cowragolfclub@bigpond.com", phone="+61 2 6342 2299"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.833)
  - phone: from fed(high, sim=0.833)

### Crows Nest Golf Club (Australia, 1 courses)

- DB: addr="Andrews Road, Crows Nest", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:76m,city:crows,db-name-substring,jaccard:1.00], 76m, QLD 4355): name="Crows Nest Golf Club", web="https://www.crowsnestgolfclub.com.au/", email="golfcrowsnest@gmail.com", phone="4698 1408"
- OSM (high, 234m, sim=1): name="Crows Nest Golf Course", web="https://www.crowsnestgolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Croydon Golf Club at Yering Meadows (Australia, 3 courses)

- DB: addr="178 - 180 Victoria Road, Yering", web=null, email=null, phone=null
- golf.com.au (high, sim=0.56, boost=+0.78[coord:319m,city:yering,jaccard:0.75], 319m, VIC 3775): name="Yering Meadows Golf Club", web=null, email=null, phone="03 9738 9000"
- OSM (low, 84m, sim=0.56): name="Yering Meadows Golf Club", web="https://www.yeringmeadows.com.au/", email="ym.reception@yeringmeadows.com.au", phone="+61 3 9738 9000"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.56)

### Crystal Brook Golf Club (Australia, 2 courses)

- DB: addr="Eyre Road, Crystal Brook", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:836m,city:crystal,db-name-substring,jaccard:1.00], 836m, SA 5523): name="Crystal Brook Golf Club", web=null, email="crystalbrookgolf@outlook.com", phone="0487 165 793"
- OSM (high, 161m, sim=1): name="Crystal Brook Golf Course", web=null, email=null, phone="+61 8 8636 2064"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cuballing Golf Club (Australia, 1 courses)

- DB: addr="Stratherne Road, Cuballing", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:201m,city:cuballing,db-name-substring,jaccard:1.00], 201m, WA 6311): name="Cuballing Golf Club", web=null, email="cuballinggolfclub@outlook.com", phone="0898836201"
- OSM (high, 46m, sim=1): name="Cuballing Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Culcairn Golf Club (Australia, 1 courses)

- DB: addr="Holbrook Road, Culcairn", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:447m,city:culcairn,db-name-substring,jaccard:1.00], 447m, NSW 2660): name="Culcairn Golf Club", web=null, email="michandmartin@bigpond.com", phone=null
- OSM (high, 26m, sim=1): name="Culcairn Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)

### Culgoa Golf Club (Australia, 1 courses)

- DB: addr="Calder Highway, Culgoa", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:404m,city:culgoa,db-name-substring,jaccard:1.00], 404m, VIC 3530): name="Culgoa Golf Club", web=null, email=null, phone="(03) 50772295"
- OSM (high, 55m, sim=1): name="Culgoa Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Cumberland Country Golf Club Greystanes (Australia, 1 courses)

- DB: addr="248 Old Prospect Road, Greystanes", web=null, email=null, phone=null
- golf.com.au (high, sim=0.571, boost=+0.63[coord:127m,jaccard:0.75], 127m, NSW 2145): name="Cumberland Country Golf Club (NSW)", web=null, email=null, phone="0414383874"
- OSM (low, 475m, sim=0.476): name="Cumberland Country Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.571)

### Cummins Golf Club (Australia, 2 courses)

- DB: addr="Tumby Bay Road, Cummins", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:447m,db-name-substring,jaccard:1.00], 447m, SA 5631): name="Cummins Golf Club", web=null, email="cumminsgolfclub@gmail.com", phone="0429091081"
- OSM (low, 20m, sim=0.077): name="Yallunda Flat Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cumnock Golf Club (Australia, 1 courses)

- DB: addr="Baldry Road, Cumnock", web=null, email=null, phone=null
- golf.com.au (high, sim=0.636, boost=+1.25[coord:188m,city:cumnock,db-name-substring,jaccard:1.00], 188m, NSW 2867): name="Cumnock Golf Club Inc", web=null, email=null, phone="(02) 6367 7313"
- OSM (medium, 338m, sim=1): name="Cumnock Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.636)

### Cunderdin Golf Club (Australia, 1 courses)

- DB: addr="Watts Street, Cunderdin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:303m,city:cunderdin,db-name-substring,jaccard:1.00], 303m, WA 6407): name="Cunderdin Golf Club", web=null, email="cundygolfclub@gmail.com", phone="0429206380"
- OSM (high, 23m, sim=1): name="Cunderdin Golf Club", web=null, email=null, phone="+61 8 9635 1386"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cunnamulla Golf Club (Australia, 1 courses)

- DB: addr="Humeburn Road, Cunnamulla", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:435m,city:cunnamulla,db-name-substring,jaccard:1.00], 435m, QLD 4490): name="Cunnamulla Golf Club", web=null, email=null, phone="07 4655 1231"
- OSM (medium, 344m, sim=1): name="Cunnamulla Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Curlewis Golf Club (Australia, 2 courses)

- DB: addr="Portarlington Road, Curlewis", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:225m,city:curlewis,db-name-substring,jaccard:1.00], 225m, VIC 3222): name="Curlewis Golf Club", web=null, email=null, phone="03 5251 2534"
- OSM (high, 22m, sim=1): name="Curlewis Golf Course", web="https://curlewisgolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 22m, sim=1)
  - phone: from fed(high, sim=1)

### Curramulka Golf Club (Australia, 1 courses)

- DB: addr="Main Road, Curramulka", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:340m,city:curramulka,db-name-substring,jaccard:1.00], 340m, SA 5580): name="Curramulka Golf Club", web=null, email=null, phone="(08) 8854 2017"
- OSM (low, 1055757m, sim=0.7): name="Cunnamulla Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Cypress Lakes Golf Course (Australia, 1 courses)

- DB: addr="Cnr McDonalds and Thompsons Rd, Pokolbin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.78[coord:289m,city:pokolbin,jaccard:0.75], 289m, NSW 2325): name="Cypress Lakes Golf Club", web="http://www.cypresslakes.com.au", email=null, phone="(02) 4993 1555"
- OSM (medium, 339m, sim=1): name="Cypress Lakes Golf & Country Club", web="https://www.cypresslakes.com.au/cms/golf/", email=null, phone="+61 2 4993 1555"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Dalby Golf Club (Australia, 1 courses)

- DB: addr="Moreton Street, Dalby", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:422m,city:dalby,db-name-substring,jaccard:1.00], 422m, QLD 4405): name="Dalby Golf Club", web=null, email="admin@dalbygolfclub.com.au", phone="(07) 46622259"
- OSM (high, 43m, sim=1): name="Dalby Golf Club", web="https://www.dalbygolfclub.com.au/", email="admin@dalbygolfclubinc.com.au", phone="+61 7 4662 4622;+61 7 4662 2259"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 43m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Dalwallinu Golf Club (Australia, 1 courses)

- DB: addr="ohnston Street, Dalwallinu", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:204m,city:dalwallinu,db-name-substring,jaccard:1.00], 204m, WA 6609): name="Dalwallinu Golf Club", web=null, email=null, phone="0421201256"
- OSM (high, 98m, sim=1): name="Dalwallinu Golf Club", web=null, email=null, phone="+61 8 9661 1005"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Dandaragan Golf Club (Australia, 1 courses)

- DB: addr="Golf Links Drive, Dandaragan", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:359m,city:dandaragan,db-name-substring,jaccard:1.00], 359m, WA 6507): name="Dandaragan Golf Club", web=null, email=null, phone="(08) 9651 4340"
- OSM (no-match, 312678m, sim=0.5): name="Darkan Golf Club", web="http://www.darkangolf.myclub.org.au/", email=null, phone="+61 8 9736 1240"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Dangaragan Golf Club (Australia, 1 courses)

- DB: addr="Dandaragan Road, Dangaragan", web=null, email=null, phone=null
- golf.com.au (high, sim=0.9, boost=+0.95[coord:359m,city:dandaragan,name-token:dandaragan,typo:dangaragan~dandaragan], 359m, WA 6507): name="Dandaragan Golf Club", web=null, email=null, phone="(08) 9651 4340"
- OSM (no-match, 171734m, sim=0.6): name="Dongara Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.9)

### Darkan Golf Club (Australia, 1 courses)

- DB: addr="Memorial Drive, Darkan", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:731m,city:darkan,db-name-substring,jaccard:1.00], 731m, WA 6392): name="Darkan Golf Club", web=null, email=null, phone="0429949748"
- OSM (high, 23m, sim=1): name="Darkan Golf Club", web="http://www.darkangolf.myclub.org.au/", email=null, phone="+61 8 9736 1240"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 23m, sim=1)
  - phone: from fed(high, sim=1)

### Darke Peak Golf Club (Australia, 1 courses)

- DB: addr="Balumbah Kinnard Road, Darke Peak", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:101m,city:darke,db-name-substring,jaccard:1.00], 101m, SA 5640): name="Darke Peak Golf Club", web=null, email="darkepeakgolf@gmail.com", phone="0427282622"
- OSM (high, 52m, sim=1): name="Darke Peak Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Dartmoor Golf Club (Australia, 1 courses)

- DB: addr="Wapling Avenue, Dartmoor", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:288m,city:dartmoor,db-name-substring,jaccard:1.00], 288m, VIC 3304): name="Dartmoor Golf Club", web=null, email=null, phone="(03) 5528 1469"
- OSM (high, 93m, sim=1): name="Dartmoor Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Darwin Golf Club (Australia, 1 courses)

- DB: addr="Links Road, Marrara", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1401m,city:marrara,db-name-substring,jaccard:1.00], 1401m, NT 0812): name="Darwin Golf Club", web="https://www.darwingolfclub.com.au/cms/", email="accounts@darwingolfclub.com.au", phone="(08) 8927 1322"
- OSM (low, 1410m, sim=1): name="Darwin Golf Course", web="https://www.darwingolfclub.com.au", email=null, phone="+61 8 8927 1322"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Dederang Golf Club (Australia, 1 courses)

- DB: addr="Kiewa Valley Highway, Dederang", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:123m,db-name-substring,jaccard:1.00], 123m, VIC 3690): name="Dederang Golf Club", web=null, email=null, phone="0431232896"
- OSM (high, 55m, sim=1): name="Dederang Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Deepwater Golf Club (Australia, 1 courses)

- DB: addr="Stannum Road, Deepwater", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:128m,city:deepwater,db-name-substring,jaccard:1.00], 128m, NSW 2371): name="Deepwater Golf Club", web=null, email=null, phone="02 6734 5375"
- OSM (high, 109m, sim=1): name="Deepwater Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Delegate Country Club (Australia, 1 courses)

- DB: addr="Bombala Road, Delegate", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:464m,city:delegate,db-name-substring,jaccard:1.00], 464m, NSW 2633): name="Delegate Country Club", web=null, email=null, phone="02 6458 8169"
- OSM (high, 23m, sim=1): name="Delegate Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Deloraine (Australia, 1 courses)

- DB: addr=null, web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.4[db-name-substring,jaccard:0.50], 3666m, TAS 7304): name="Deloraine Golf Club", web="https://delorainegolfclub.com.au/", email=null, phone="03 63622132"
- OSM (low, 3827m, sim=1): name="Deloraine Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Deloraine Golf Club (Australia, 2 courses)

- DB: addr="Osmaston Road, Deloraine", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:123m,city:deloraine,db-name-substring,jaccard:1.00], 123m, TAS 7304): name="Deloraine Golf Club", web="https://delorainegolfclub.com.au/", email=null, phone="03 63622132"
- OSM (high, 87m, sim=1): name="Deloraine Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Delungra Golf Club (Australia, 1 courses)

- DB: addr="Warialda Road, Delungra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:627m,db-name-substring,jaccard:1.00], 627m, NSW 2403): name="Delungra Golf Club", web=null, email=null, phone=null
- OSM (no-match, 291554m, sim=0.625): name="Canungra Golf Course", web=null, email=null, phone=null

### Deniliquin Golf Club (Australia, 1 courses)

- DB: addr="Golf Club Road, Deniliquin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:173m,city:deniliquin,db-name-substring,jaccard:1.00], 173m, NSW 2710): name="Deniliquin Golf Club", web="http://www.denigolfclub.com.au", email=null, phone="03 5881 1325"
- OSM (medium, 486m, sim=1): name="Deniliquin Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Denman Golf Club (Australia, 1 courses)

- DB: addr="Ogilvie Street, Denman", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:425m,city:denman,db-name-substring,jaccard:1.00], 425m, NSW 2328): name="Denman Golf Club", web="https://www.facebook.com/p/Denman-Golf-Club-100076494338672/", email="steven.harris2@bigpond.com", phone=null
- OSM (high, 52m, sim=1): name="Denman Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)

### Denmark Country Club (Australia, 2 courses)

- DB: addr="South Coast Highway, Denmark", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:32m,city:denmark,db-name-substring,jaccard:1.00], 32m, WA 6333): name="Denmark Country Club", web=null, email="admin@denmarkcountryclub.com.au", phone="(08) 9848 1413"
- OSM (high, 0m, sim=1): name="Denmark Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Derby Golf Club (Australia, 1 courses)

- DB: addr="Ashley Street, Derby", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:350m,city:derby,db-name-substring,jaccard:1.00], 350m, WA 6728): name="Derby Golf Club", web=null, email=null, phone="(08) 9191 1126"
- OSM (high, 66m, sim=1): name="Derby Golf Club", web="https://www.sdwk.wa.gov.au/facilities/communitysportsfacilities/derbyrecreationcentre.html", email=null, phone="+61 8 9191 1126"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 66m, sim=1)
  - phone: from fed(high, sim=1)

### Devilbend Golf Club (Australia, 1 courses)

- DB: addr="48 Loders Road, Moorooduc", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:174m,city:moorooduc,db-name-substring,jaccard:1.00], 174m, VIC 3933): name="Devilbend Golf Club ", web="https://www.devilbendgolf.com.au", email="info@devilbendgolf.com.au", phone="03 5978 8470"
- OSM (low, 573m, sim=0.818): name="Devils Bend Golf Course", web="https://www.devilbendgolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Devonport Golf Club (Australia, 1 courses)

- DB: addr="66 Woodrising Avenue, Spreyton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:217m,city:spreyton], 217m, TAS 7310): name="Devonport Country Club", web="https://devonportcountryclub.com.au/", email="reception@devonportcountryclub.com.au", phone="03 6427 2381"
- OSM (high, 9m, sim=1): name="Devonport Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Dimboola Golf Club (Australia, 1 courses)

- DB: addr="Golf Course Road, Dimboola", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2021m,city:dimboola,db-name-substring,jaccard:1.00], 2021m, VIC 3414): name="Dimboola Golf Club", web=null, email="dimboolagolfclub@gmail.com", phone="0400113686"
- OSM (low, 2587m, sim=1): name="Dimboola Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Donald Golf Club (Australia, 1 courses)

- DB: addr="Golf Links Road, Donald", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:273m,city:donald,db-name-substring,jaccard:1.00], 273m, VIC 3480): name="Donald Golf Club", web=null, email="donaldgolf31206@gmail.com", phone="(03) 5497 1019"
- OSM (high, 118m, sim=1): name="Donald Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Dongara Golf Club (Australia, 1 courses)

- DB: addr="Golf Course Road, Dongara", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:171m,city:dongara,db-name-substring,jaccard:1.00], 171m, WA 6525): name="Dongara Golf Club", web="http://www.dongaragolf.com.au", email=null, phone="(08) 9927 2727"
- OSM (high, 93m, sim=1): name="Dongara Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Donnybrook Country Club (Australia, 1 courses)

- DB: addr="South West Highway, Donnybrook", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:317m,city:donnybrook,db-name-substring,jaccard:1.00], 317m, WA 6239): name="Donnybrook Country Club", web=null, email=null, phone="0414973099"
- OSM (high, 113m, sim=1): name="Donnybrook Country Club", web="http://www.donnybrookcountryclub.myclub.org.au/", email="cc@donnybrook.wa.au", phone="+61 8 9731 1268"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 113m, sim=1)
  - email: from osm(high, 113m, sim=1)
  - phone: from fed(high, sim=1)

### Dorrigo Memorial RSL Golf Club (Australia, 1 courses)

- DB: addr="P.O. Box 163, Dorrigo", web=null, email=null, phone=null
- golf.com.au (high, sim=0.35, boost=+0.6[coord:1455m,city:dorrigo,jaccard:0.67], 1455m, NSW 2453): name="Dorrigo Golf Club", web="http://www.dorrigoclubgolf.com", email=null, phone="02 6657 2006"
- OSM (no-match, 1428m, sim=0.35): name="Dorrigo Golf Course", web="https://www.dorrigorslgolf.com.au", email=null, phone="+61 2 6657 2294"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.35)
  - phone: from fed(high, sim=0.35)

### Dorset Golf Course (Australia, 1 courses)

- DB: addr="Trawalla Road, Croydon", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.78[coord:293m,city:croydon,jaccard:0.75], 293m, VIC 3136): name="Dorset Public Golf Course", web="https://www.maroondahleisure.com.au/Our-venues/Dorset-Golf", email=null, phone="03 9294 5555"
- OSM (high, 93m, sim=1): name="Dorset Golf", web="https://www.maroondahleisure.com.au/venues/dorset-golf/", email=null, phone="+61 3 9294 5555"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Dover Golf Club Inc (Australia, 1 courses)

- DB: addr="Cemetery Rd, Dover", web=null, email=null, phone=null
- golf.com.au (high, sim=0.556, boost=+1[coord:221m,city:dover,jaccard:1.00], 221m, TAS 7117): name="Dover Golf Club", web="https://www.facebook.com/", email=null, phone="03 6298 1562"
- OSM (low, 207m, sim=0.556): name="Dover Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.556)
  - phone: from fed(high, sim=0.556)

### Dowerin Golf Club (Australia, 1 courses)

- DB: addr="Cnr Metcalf & Jones St, Dowerin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:119m,city:dowerin,db-name-substring,jaccard:1.00], 119m, WA 6461): name="Dowerin Golf Club", web=null, email="doweringolfclub@gmail.com", phone="08 96311063"
- OSM (high, 3m, sim=1): name="Dowerin Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Drouin Golf Club 2020 (Australia, 1 courses)

- DB: addr="McGlone Rd, Drouin", web=null, email=null, phone=null
- golf.com.au (high, sim=0.545, boost=+0.85[coord:40m,city:drouin,jaccard:0.50], 40m, VIC 3818): name="Drouin Golf and Country Club", web=null, email=null, phone="03 5625 1330"
- OSM (low, 395m, sim=0.545): name="Drouin Golf & Country Club", web="https://www.drouingolf.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.545)

### Drouin Golf Club 2022 (Australia, 1 courses)

- DB: addr="McGlone Rd, Drouin", web=null, email=null, phone=null
- golf.com.au (high, sim=0.545, boost=+0.85[coord:40m,city:drouin,jaccard:0.50], 40m, VIC 3818): name="Drouin Golf and Country Club", web=null, email=null, phone="03 5625 1330"
- OSM (low, 395m, sim=0.545): name="Drouin Golf & Country Club", web="https://www.drouingolf.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.545)

### Drung Golf Club (Australia, 1 courses)

- DB: addr="Horsham-Lubeck Road, Horsham", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:57m,db-name-substring,jaccard:1.00], 57m, VIC 3401): name="Drung Golf Club", web=null, email=null, phone="0428844267"
- OSM (high, 117m, sim=1): name="Drung Golf Club", web=null, email=null, phone="+61 3 5384 4342"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Duaringa Golf Club (Australia, 2 courses)

- DB: addr="Capricorn Highway, Duaringa", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:15m,city:duaringa,db-name-substring,jaccard:1.00], 15m, QLD 4712): name="Duaringa Golf Club", web="http://duaringagolfclub.com", email=null, phone="07 4935 7250"
- OSM (medium, 302m, sim=1): name="Duaringa Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Duaringa18 (Australia, 1 courses)

- DB: addr="Duaringa", web=null, email=null, phone=null
- golf.com.au (high, sim=0.8, boost=+0.65[city:duaringa,name-token:duaringa,jaccard:0.50], 3180m, QLD 4712): name="Duaringa Golf Club", web="http://duaringagolfclub.com", email=null, phone="07 4935 7250"
- OSM (low, 3464m, sim=0.8): name="Duaringa Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.8)
  - phone: from fed(high, sim=0.8)

### Dubbo Golf Club (Australia, 4 courses)

- DB: addr="Newell Highway, Dubbo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:382m,city:dubbo,db-name-substring,jaccard:1.00], 382m, NSW 2830): name="Dubbo Golf Club", web=null, email="admin@dubbogolfclub.com.au", phone="02 6882 1255"
- OSM (high, 97m, sim=1): name="Dubbo Golf Club", web="https://www.dubbogolfclub.com.au/", email="admin@dubbogolfclub.com.au", phone="+61 2 6882 2201;+61 2 6882 1255"

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - website: from osm(high, 97m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Dudinin Golf Club (Australia, 1 courses)

- DB: addr="Wogolin Road, Wickepin", web=null, email=null, phone=null
- golf.com.au (high, sim=0.25, boost=+0.75[coord:402m,city:wickepin,name-token:wickepin], 402m, WA 6370): name="Wickepin Golf Club", web=null, email=null, phone="(08) 98881032"
- OSM (low, 414m, sim=0.25): name="Wickepin Golf Club", web="https://www.facebook.com/wickepinsportsclub/", email=null, phone="+61 8 9888 1080"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.25)

### Dulacca Country Golf Club (Australia, 1 courses)

- DB: addr="Whatley Park, Dulacca", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:310m,city:dulacca,db-name-substring,jaccard:1.00], 310m, QLD 4425): name="Dulacca Country Golf Club", web=null, email=null, phone="-"
- OSM (no-match, 619943m, sim=0.444): name="Melaleuca Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Dunedoo Golf Club (Australia, 1 courses)

- DB: addr="Wargundy Street, Dunedoo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:283m,city:dunedoo,db-name-substring,jaccard:1.00], 283m, NSW 2844): name="Dunedoo Golf Club", web=null, email="dunedoosportsclub@hotmail.com", phone="02 6375 1018"
- OSM (medium, 284m, sim=1): name="Dunedoo Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Dunes Port Hughes (Australia, 1 courses)

- DB: addr="South Tce, Port Hughes", web=null, email=null, phone=null
- golf.com.au (high, sim=0.607, boost=+0.88[coord:1025m,city:port,db-name-substring,jaccard:0.75], 1025m, SA 5558): name="Copperclub, The Dunes Port Hughes", web="https://www.copperclub.com.au", email="golf@copperclub.com.au", phone="08 8825 2001"
- OSM (low, 801m, sim=0.118): name="Moonta Golf Club", web=null, email=null, phone="+61 8 8825 2107"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.607)
  - email: from fed(high, sim=0.607)
  - phone: from fed(high, sim=0.607)

### Dunheved Golf Club (Australia, 3 courses)

- DB: addr="Links Rd, St. Marys", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:15m,city:marys,db-name-substring,jaccard:1.00], 15m, NSW 2790): name="Dunheved Golf Club", web=null, email="proshop@dunhevedgolfclub.com.au", phone="02 9623 0239"
- OSM (high, 2m, sim=1): name="Dunheved Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Dunolly Golf Club (Australia, 1 courses)

- DB: addr="Short Street, Dunolly", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:253m,db-name-substring,jaccard:1.00], 253m, VIC 3472): name="Dunolly Golf Club", web=null, email="dunollygolfclub@gmail.com", phone="54613457"
- OSM (high, 175m, sim=1): name="Dunolly Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Dunsborough & Districts Country Club (Australia, 1 courses)

- DB: addr="40 Gifford Road, Dunsborough", web=null, email=null, phone=null
- golf.com.au (high, sim=0.524, boost=+0.75[coord:652m,city:dunsborough,jaccard:0.67], 652m, WA 6281): name="Dunsborough Country Club", web="https://dunsboroughcountryclub.org.au/", email=null, phone="(08) 9755 3250"
- OSM (high, 173m, sim=1): name="Dunsborough and Districts Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.524)
  - phone: from fed(high, sim=0.524)

### Dunsborough Lakes Resort Golf Club (Australia, 1 courses)

- DB: addr="Cnr Caves Road and Clubhouse Drive, Dunsborough", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.78[coord:366m,city:dunsborough,jaccard:0.75], 366m, WA 6281): name="Dunsborough Lakes Golf Club", web="https://www.dlgc.com.au", email=null, phone="(08) 9756 8733"
- OSM (high, 32m, sim=1): name="Dunsborough Lakes Resort Golf Course", web="http://dunsboroughlakes.au-golf.net/", email=null, phone="+61 8 9756 8733"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Duntryleague Golf Course (Australia, 2 courses)

- DB: addr="Woodward Street, Orange", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:63m,city:orange,jaccard:0.67], 63m, NSW 2800): name="Duntryleague Golf Club", web="https://duntryleague.com.au", email=null, phone="(02) 6362 3466"
- OSM (high, 24m, sim=1): name="Duntryleague Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Dwellingup Golf Club (Australia, 1 courses)

- DB: addr="Pinjarra Williams Road, Dwellingup", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2777m,city:dwellingup,db-name-substring,jaccard:1.00], 2777m, WA 6213): name="Dwellingup Golf Club", web=null, email=null, phone="08 9538 1172"
- OSM (no-match, 115843m, sim=0.6): name="Balingup Golf Club", web="http://www.balingup.asn.au/balingup-golf-club.html", email=null, phone="+61 8 9764 1090;+61 8 9764 1885"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Dysart Golf Club (Australia, 1 courses)

- DB: addr="Fischer Street, Dysart", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1998m,city:dysart,db-name-substring,jaccard:1.00], 1998m, QLD 4745): name="Dysart Golf Club", web=null, email="dysartgc.treasurer@gmail.com", phone="07 4958 2378"
- OSM (no-match, 1279253m, sim=0.5): name="Golf Mart", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### East Framlingham Golf Club (Australia, 1 courses)

- DB: addr="560 Ellerslie-Panmure Road, Framlingham", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:135m,city:framlingham,db-name-substring,jaccard:1.00], 135m, VIC 3265): name="East Framlingham Golf Club", web=null, email=null, phone="0408502811"
- OSM (high, 30m, sim=1): name="East Framlingham Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### East Geelong Golf Club (Australia, 1 courses)

- DB: addr="Eastern Park, Geelong", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:20m,city:geelong,db-name-substring,jaccard:1.00], 20m, VIC 3220): name="East Geelong Golf Club", web="http://www.eastgeelonggc.com.au", email="manager@eggc.com.au", phone="0352293634"
- OSM (medium, 272m, sim=1): name="East Geelong Golf Course", web="https://eastgeelonggolfclub.com.au", email=null, phone="+61 3 5229 3634"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Eastern Sward Golf Club (Australia, 1 courses)

- DB: addr="Cnr. Thompson and Worsley Rds., Bangholme", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:345m,city:bangholme,db-name-substring,jaccard:1.00], 345m, VIC 3197): name="Eastern Sward Golf Club", web="http://easternswardgc.com.au", email="golf@easternswardgc.com.au", phone="(03) 9775 0363"
- OSM (high, 180m, sim=1): name="Eastern Sward golf club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Eastlake Golf Club (Australia, 2 courses)

- DB: addr="67 Gardeners Road, Daceyville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.6[coord:17m,jaccard:0.67], 17m, NSW 2032): name="Eastlake Golf Course", web=null, email=null, phone=null
- OSM (low, 1266m, sim=1): name="Eastlake Golf Course", web="https://www.eastlakegolfclub.com.au/", email=null, phone=null

### eastlakes (Australia, 2 courses)

- DB: addr=null, web=null, email=null, phone=null
- golf.com.au (high, sim=0.889, boost=+0.3[coord:1094m,typo:eastlakes~eastlake], 1094m, NSW 2032): name="Eastlake Golf Course", web=null, email=null, phone=null
- OSM (high, 210m, sim=0.889): name="Eastlake Golf Course", web="https://www.eastlakegolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 210m, sim=0.889)

### Eastwood Golf Club (Australia, 1 courses)

- DB: addr="Liverpool Rd, Kilsyth", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:68m,city:kilsyth,db-name-substring,jaccard:1.00], 68m, VIC 3137): name="Eastwood Golf Club", web=null, email=null, phone="03 9728 2944"
- OSM (high, 132m, sim=1): name="Eastwood Golf Club", web="https://www.eastwoodgolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 132m, sim=1)
  - phone: from fed(high, sim=1)

### Echuca Back Nine Golf Course (Australia, 1 courses)

- DB: addr="Cnr. Eyre & McKenzie Streets, Echuca", web=null, email=null, phone=null
- golf.com.au (high, sim=0.75, boost=+0.79[coord:298m,city:echuca,jaccard:0.80], 298m, VIC 3564): name="Echuca Back 9 Golf Course", web=null, email=null, phone="0429616027"
- OSM (high, 16m, sim=1): name="Echuca Back Nine Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.75)

### Echunga Golf Club (Australia, 2 courses)

- DB: addr="Corner Hahndorf and Dolman Roads, Echunga", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:265m,city:echunga,db-name-substring,jaccard:1.00], 265m, SA 5153): name="Echunga Golf Club", web="http://www.echungagolf.com.au", email=null, phone="(08) 8388 8038"
- OSM (medium, 355m, sim=1): name="Echunga Golf Club", web="http://www.echungagolf.com.au/", email=null, phone="+61 8 8388 8038"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Edenhope Golf Club (Australia, 1 courses)

- DB: addr="Laidlaw Avenue, Edenhope", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:109m,city:edenhope,db-name-substring,jaccard:1.00], 109m, VIC 3318): name="Edenhope Golf Club", web=null, email=null, phone="03 5585 1139"
- OSM (high, 133m, sim=1): name="Edenhope Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Eidsvold Golf Club (Australia, 1 courses)

- DB: addr="Crown Street, Eidsvold", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:64m,city:eidsvold,db-name-substring,jaccard:1.00], 64m, QLD 4627): name="Eidsvold Golf Club", web=null, email=null, phone=null
- OSM (high, 52m, sim=1): name="Eidsvold Golf Course", web=null, email=null, phone=null

### El Arish Country Golf Club (Australia, 1 courses)

- DB: addr="Golf Course Road, El Arish", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:281m,city:arish,jaccard:0.67], 281m, QLD 4855): name="El Arish Country Club", web=null, email="info@elarishcc.com.au", phone="(07) 4068 5140"
- OSM (high, 19m, sim=1): name="El Arish Country Club", web="http://www.elarishgolf.websyte.com.au/", email=null, phone="+61 7 4068 5140"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 19m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Elanora Country Club (Australia, 2 courses)

- DB: addr="154 Elanora Road, Elanora Heights", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:276m,city:elanora,db-name-substring,jaccard:1.00], 276m, NSW 2101): name="Elanora Country Club", web="http://www.elanoracc.com.au", email=null, phone="02 9913 7336"
- OSM (high, 119m, sim=1): name="Elanora Country Club", web="https://www.elanoracc.com.au/", email="ecc@elanoracc.com.au", phone="+61 2 9913 7336"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 119m, sim=1)
  - phone: from fed(high, sim=1)

### Elcho Park Golf Club (Australia, 1 courses)

- DB: addr="Elcho Road, Lara", web=null, email=null, phone=null
- golf.com.au (high, sim=0.238, boost=+0.85[coord:132m,city:lara,jaccard:0.50], 132m, VIC 3212): name="Lara Golf Club (previously Elcho Park)", web=null, email="admin@laragolfclub.com.au", phone="0352822955"
- OSM (high, 174m, sim=1): name="Elcho Park Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.238)
  - phone: from fed(high, sim=0.238)

### Elderslie Golf Club (Australia, 1 courses)

- DB: addr="Andersons Road , Broadmarsh", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:136m,city:broadmarsh,db-name-substring,jaccard:1.00], 136m, TAS 7030): name="Elderslie Golf Club", web="https://www.eldersliegolfclub.com.au/", email="eldersliegc634@gmail.com", phone="03 6268 5292"
- OSM (high, 105m, sim=1): name="ELDERSLIE GOLF CLUB", web="https://www.eldersliegolfclub.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Elliott Golf Club (Australia, 2 courses)

- DB: addr="Elliott, Elliott", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:84m,city:elliott,db-name-substring,jaccard:1.00], 84m, NT 0862): name="Elliott Golf Club", web=null, email=null, phone="(08) 8969 2085"
- OSM (high, 25m, sim=1): name="Elliott Golf Course", web="http://nt.golfer.com.au/directory/elliott-golf-course-northern-territory-australia/928", email=null, phone="+61 8 8969 2069"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 25m, sim=1)
  - phone: from fed(high, sim=1)

### Elliston Golf Club (Australia, 1 courses)

- DB: addr="High Street, Elliston", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:16m,city:elliston,db-name-substring,jaccard:1.00], 16m, SA 5670): name="Elliston Golf Club", web=null, email=null, phone="0477050051"
- OSM (high, 90m, sim=1): name="Elliston Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Elmhurst Golf Club (Australia, 1 courses)

- DB: addr="Green Street, Elmhurst", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:420m,city:elmhurst,db-name-substring,jaccard:1.00], 420m, VIC 3469): name="Elmhurst Golf Club", web=null, email="Elmhurstgolf@Gmail.com", phone="03 53524929"
- OSM (high, 117m, sim=1): name="Elmhurst Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Elmore Golf Club (Australia, 1 courses)

- DB: addr="Hunter Road, Elmore", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:353m,city:elmore,db-name-substring,jaccard:1.00], 353m, VIC 3588): name="Elmore Golf Club", web=null, email=null, phone="03 5432 6233"
- OSM (high, 61m, sim=1): name="Elmore Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Elsternwick Park Golf Course (Australia, 2 courses)

- DB: addr="170 Glenhuntly Road, Elsternwick", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.2[jaccard:0.67], 4533m, VIC 3165): name="Elsternwick Park Golf Club", web=null, email=null, phone="(03) 9570 5211"
- OSM (no-match, 36474m, sim=0.545): name="Eastern Golf Club", web="https://www.easterngolfclub.com.au/", email="info@easterngolfclub.com.au", phone="+61 3 9739 0110"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Emerald Downs Golf Course (Australia, 1 courses)

- DB: addr="67 Emerald Drive, Port Macquarie", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.78[coord:261m,city:port,jaccard:0.75], 261m, NSW 2444): name="Emerald Downs Golf Club", web=null, email=null, phone="(02) 6582 6120"
- OSM (medium, 340m, sim=1): name="Emerald Downs Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Emerald Golf Club (Australia, 1 courses)

- DB: addr="Theresa Street, Emerald", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:116m,city:emerald,db-name-substring,jaccard:1.00], 116m, QLD 4720): name="Emerald Golf Club", web="http://www.emeraldgolfclub.com", email=null, phone="07 4982 1274"
- OSM (medium, 402m, sim=1): name="Emerald Golf Club", web="http://users.tpg.com.au/bradstal/", email=null, phone="+61 7 4982 1274"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Emerald Lakes Golf Club (Australia, 1 courses)

- DB: addr="3 Alabaster Drive, Carrara", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:78m,city:carrara,db-name-substring,jaccard:1.00], 78m, QLD 4211): name="Emerald Lakes Golf Club", web="http://www.emeraldlakesgolf.com.au/golf/", email="golf@emeraldlakes.com.au", phone="(07) 5594 4400"
- OSM (low, 559m, sim=1): name="Emerald Lakes Golf Club", web="https://emeraldlakesgolf.com.au/", email=null, phone="+61 7 5594 4400"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Emmaville Golf Club (Australia, 1 courses)

- DB: addr="Gulf Road, Emmaville", web=null, email=null, phone=null
- golf.com.au (high, sim=0.692, boost=+1.1[coord:319m,city:emmaville,db-name-substring,jaccard:1.00], 319m, NSW 2371): name="Emmaville Golf Club Inc", web=null, email=null, phone="02 6734 7324"
- OSM (high, 2m, sim=1): name="Emmaville Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.692)

### Eneabba Golf Club (Australia, 1 courses)

- DB: addr="Brand Highway, Eneabba", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:69m,city:eneabba,db-name-substring,jaccard:1.00], 69m, WA 6518): name="Eneabba Golf Club", web=null, email=null, phone="0418938836"
- OSM (low, 514m, sim=1): name="Eneabba Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Esk Golf Club (Australia, 2 courses)

- DB: addr="Hampton Road, Esk", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:299m,db-name-substring,jaccard:1.00], 299m, QLD 4312): name="Esk Golf Club", web=null, email=null, phone="5424 1261"
- OSM (high, 9m, sim=1): name="Esk Country Golf Club", web="https://www.eskgolfclub.com/", email="eskgolfclub@gmail.com", phone="+61 7 5424 1261"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 9m, sim=1)
  - email: from osm(high, 9m, sim=1)
  - phone: from fed(high, sim=1)

### Esperance Golf Club (Australia, 1 courses)

- DB: addr="Dickerson Street, Esperance", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:745m,city:esperance,db-name-substring,jaccard:1.00], 745m, WA 6450): name="Esperance Golf Club", web=null, email=null, phone="(08) 9071 1083"
- OSM (high, 38m, sim=1): name="Esperance Golf Club", web="http://esperancegolfclub.com.au/", email="admin@esperancegolfclub.com.au", phone="+61 8 9071 1083"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 38m, sim=1)
  - email: from osm(high, 38m, sim=1)
  - phone: from fed(high, sim=1)

### Euroa Golf Club (Australia, 1 courses)

- DB: addr="Golf Course Road, Euroa", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:261m,city:euroa,db-name-substring,jaccard:1.00], 261m, VIC 3666): name="Euroa Golf Club", web="http://www.euroagolfclub.com", email="secretary.euroagolfclub@gmail.com", phone="03 5795 2565"
- OSM (high, 50m, sim=1): name="Euroa Golf Course", web="https://www.euroagolfclub.com/", email=null, phone="+61 3 5795 2635"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Everett Country Club (Australia, 1 courses)

- DB: addr="Hopetoun Ravensthorpe Road, Everett", web=null, email=null, phone=null
- golf.com.au (high, sim=0.438, boost=+1.35[coord:70m,city:hopetoun,name-token:hopetoun,db-name-substring,jaccard:0.67], 70m, WA 6348): name="Hopetoun Everett Country Club", web=null, email="hopetoungolfclub@outlook.com", phone="(08) 9838 3456"
- OSM (low, 19m, sim=0.438): name="Hopetoun Everett Country Club", web=null, email=null, phone="+61 8 9838 1057;+61 8 9838 3057"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.438)
  - phone: from fed(high, sim=0.438)

### Everglades Country Club (Australia, 1 courses)

- DB: addr="Dunban Road, Woy Woy", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:16m,db-name-substring,jaccard:1.00], 16m, NSW 2256): name="Everglades Country Club", web="http://www.everglades.net.au", email=null, phone="02 4341 1866"
- OSM (low, 568m, sim=1): name="Everglades Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Exeter Golf Club (Australia, 1 courses)

- DB: addr="West Tamar Highway, Exeter", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:281m,city:exeter,db-name-substring,jaccard:1.00], 281m, TAS 7275): name="Exeter Golf Club", web="https://www.exetergolfclub.com.au/", email=null, phone="0363944427"
- OSM (high, 27m, sim=1): name="Exeter Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Exmouth Golf Club (Australia, 1 courses)

- DB: addr="Willersdorf Road, Exmouth", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:528m,city:exmouth,db-name-substring,jaccard:1.00], 528m, WA 6707): name="Exmouth Golf Club", web=null, email="admin@exmouthgolfclub.com.au", phone="(08) 9949 1066"
- OSM (high, 41m, sim=1): name="Exmouth Golf Club", web="http://exmouthgolfclub.myclub.org.au/", email="admin@exmouthgolfclub.com.au", phone="+61 8 9949 1066"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 41m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Eynesbury Golf Course (Australia, 2 courses)

- DB: addr="487 Eynesbury Road, Eynesbury", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.6[coord:1204m,city:eynesbury,jaccard:0.67], 1204m, VIC 3338): name="Eynesbury Golf Club", web=null, email="alex@eynesbury.com.au", phone="1300 396 372"
- OSM (low, 764m, sim=1): name="Eynesbury Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Fairbairn Golf Club (Australia, 1 courses)

- DB: addr="Laverton Ave, Fairbairn", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:47m,city:fairbairn,db-name-substring,jaccard:1.00], 47m, ACT 2609): name="Fairbairn Golf Club", web="https://www.fairbairngolfclub.com.au/", email="manager@fairbairngolfclub.com.au", phone="02 6257 9000"
- OSM (high, 130m, sim=1): name="Fairbairn Golf Course", web="https://www.fairbairngolfclub.com.au/", email="fairbairngc@netspeed.com.au", phone="+61 2 6257 9000"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Fairbairn White Tee ACT Golfers (Australia, 1 courses)

- DB: addr="35 Laverton Ave, Fairbairn", web=null, email=null, phone=null
- golf.com.au (high, sim=0.29, boost=+0.7[coord:47m,city:fairbairn], 47m, ACT 2609): name="Fairbairn Golf Club", web="https://www.fairbairngolfclub.com.au/", email="manager@fairbairngolfclub.com.au", phone="02 6257 9000"
- OSM (low, 130m, sim=0.29): name="Fairbairn Golf Course", web="https://www.fairbairngolfclub.com.au/", email="fairbairngc@netspeed.com.au", phone="+61 2 6257 9000"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.29)
  - email: from fed(high, sim=0.29)
  - phone: from fed(high, sim=0.29)

### Fairfield Golf Course (Australia, 1 courses)

- DB: addr="Corner of Smithfield road & Beavors street, Prairiewood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:538m,city:prairiewood,jaccard:0.67], 538m, NSW 2175): name="Fairfield Golf Club", web="https://fairfieldgolf.com.au/", email=null, phone="02 9604 4007"
- OSM (low, 102m, sim=0.643): name="Fairfield City Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Farrell Flat Golf Club (Australia, 1 courses)

- DB: addr="Farrell Flat, Allora", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:130m,city:farrell,db-name-substring,jaccard:1.00], 130m, SA 5416): name="Farrell Flat Golf Club", web=null, email=null, phone=null
- OSM (high, 82m, sim=1): name="Farrell Flat Golf course", web=null, email=null, phone=null

### Federal Golf Club (Australia, 1 courses)

- DB: addr="Gowrie Drive, Red Hill", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:617m,city:hill,db-name-substring,jaccard:1.00], 617m, ACT 2603): name="Federal Golf Club", web="https://federalgolf.com.au", email="admin@fgc.com.au", phone="02 6281 1888"
- OSM (low, 709m, sim=1): name="Federal Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Finley Golf Club (Australia, 1 courses)

- DB: addr="Tongs Street, Finley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:301m,city:finley,db-name-substring,jaccard:1.00], 301m, NSW 2713): name="Finley Golf Club", web="https://www.finleygolf.com.au", email="hello@finleygolfclub.com.au", phone="03 5883 1360"
- OSM (high, 33m, sim=1): name="Finley Golf Club", web="http://www.finleygolfclub.com.au/", email=null, phone="+61 3 5883 1360"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Flagstaff Hill Golf & Country Club (Australia, 1 courses)

- DB: addr="Memford Way, Flagstaff Hill", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.78[coord:514m,city:flagstaff,jaccard:0.75], 514m, SA 5159): name="Flagstaff Hill Golf Club", web="http://www.fhgc.com.au", email=null, phone="(08) 8270 2300"
- OSM (high, 36m, sim=1): name="Flagstaff Hill Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Flinders Golf Club (Australia, 2 courses)

- DB: addr="1 Bass Street, Flinders", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:553m,city:flinders,db-name-substring,jaccard:1.00], 553m, VIC 3929): name="Flinders Golf Club", web="http://www.flindersgolfclub.com.au", email="admin@flindersgolfclub.com.au", phone="(03) 5989 0583"
- OSM (medium, 286m, sim=1): name="Flinders Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Forster Tuncurry Golf Club (Australia, 2 courses)

- DB: addr="Strand Street, Forster", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:3m,city:forster,db-name-substring,jaccard:1.00], 3m, NSW 2428): name="Forster Tuncurry Golf Club", web="https://forstertuncurrygolf.com.au/", email=null, phone="02 6554 6799"
- OSM (high, 1m, sim=1): name="Forster Tuncurry Golf Club", web="https://www.forstertuncurrygolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Fortescue Golf Club (Australia, 1 courses)

- DB: addr="Giles Avenue, Newman", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:626m,city:newman,db-name-substring,jaccard:1.00], 626m, WA 6753): name="Fortescue Golf Club", web="http://www.fortescuegc.com", email=null, phone="(08) 9175 2680"
- OSM (high, 92m, sim=1): name="Fortescue Golf Club", web="http://www.fortescuegc.com/", email="admin@fortescuegc.com", phone="+61 8 9175 2680"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 92m, sim=1)
  - phone: from fed(high, sim=1)

### Foster Golf Club (Australia, 1 courses)

- DB: addr="7 Reserve Rd, Foster", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:14m,city:foster,db-name-substring,jaccard:1.00], 14m, VIC 3960): name="Foster Golf Club", web=null, email=null, phone="(03) 5682 2272"
- OSM (high, 221m, sim=1): name="Foster Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Fox Hills Golf Club (Australia, 3 courses)

- DB: addr="55 Fox Hills Crescent, , Prospect ", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2037m,city:prospect,db-name-substring,jaccard:1.00], 2037m, NSW 2149): name="Fox Hills Golf Club", web="https://foxhillsgolfclub.com.au", email=null, phone="02 9631 3390"
- OSM (low, 475m, sim=0.1): name="Cumberland Country Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Fraser Lakes Golf Club (Australia, 1 courses)

- DB: addr="Hervey Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:404m,db-name-substring,jaccard:1.00], 404m, QLD 4655): name="Fraser Lakes Golf Club", web=null, email=null, phone="0410 640 183"
- OSM (high, 27m, sim=1): name="Fraser Lakes Golf Club", web=null, email=null, phone="+61 7 4128 7770"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Frederickton Golf Club (Australia, 1 courses)

- DB: addr="43 Yarrabandinni Road, Frederickton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:68m,city:frederickton,db-name-substring,jaccard:1.00], 68m, NSW 2440): name="Frederickton Golf Club", web=null, email=null, phone="02 6566 8261"
- OSM (high, 1m, sim=1): name="Frederickton Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Freeway Golf Course (Australia, 1 courses)

- DB: addr="Columba Street, North Balwyn", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:154m,city:balwyn,db-name-substring,jaccard:1.00], 154m, VIC 3104): name="Freeway Golf Course", web="https://freewaygolf.com.au/", email=null, phone="03 9078 3076"
- OSM (high, 68m, sim=1): name="Freeway Public Golf Course", web="http://www.freewaygc.com.au/", email=null, phone="+61 3 9859 9000"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Fremantle Public Golf Course (Australia, 1 courses)

- DB: addr="Montreal Street, Fremantle", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:217m,city:fremantle,db-name-substring,jaccard:1.00], 217m, WA 6162): name="Fremantle Public Golf Course", web=null, email="kbaatjes@belgravialeisure.com.au", phone="08 9336 3933"
- OSM (high, 96m, sim=1): name="Fremantle Public Golf Course", web="https://fremantlegolfcourse.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 96m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Freycinet Golf Club (Australia, 1 courses)

- DB: addr="Swanwick Drive, Cloes Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:503m,city:swanwick,db-name-substring,jaccard:1.00], 503m, TAS 7215): name="Freycinet Golf Club", web="https://www.freycinetgolfclub.com/", email=null, phone="0408136885"
- OSM (high, 15m, sim=1): name="Freycinet Golf Course", web="http://www.freycinetgolfcourse.com.au", email=null, phone="+61 3 6257 0448"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Gailes Golf Club (Australia, 2 courses)

- DB: addr="299 Wilruna Street, Wacol", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:347m,city:wacol,db-name-substring,jaccard:1.00], 347m, QLD 4076): name="Gailes Golf Club", web="https://gailesgolf.com.au", email="gailes@gailesgolf.com.au", phone="07 3271 2333"
- OSM (high, 18m, sim=1): name="Gailes Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Gainsborough Greens Golf Club (Australia, 1 courses)

- DB: addr="Yawalpah Road, Pimpama", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:295m,city:pimpama,jaccard:0.67], 295m, QLD 4210): name="Gainsborough Greens", web="http://www.gainsboroughgreens.com.au", email=null, phone="07 5546 6003"
- OSM (high, 70m, sim=1): name="Gainsborough Greens", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ganmain Golf Club (Australia, 1 courses)

- DB: addr="Robing Pole Road, Ganmain", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:940m,city:ganmain,db-name-substring,jaccard:1.00], 940m, NSW 2702): name="Ganmain Golf Club", web=null, email=null, phone="02 6927 6193"
- OSM (no-match, 1109m, sim=0.5): name="Ganmain Sports Club", web=null, email=null, phone="+61 2 6927 6193"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Gardens Park Golf Links (Australia, 1 courses)

- DB: addr=" 1 Chin Quan Rd, Darwin", web=null, email=null, phone=null
- golf.com.au (high, sim=0, boost=+0.95[coord:42m,db-name-substring,jaccard:1.00], 42m, NT 0821): name="Gardens Park Golf Links", web="https://www.gardensparkgolflinks.com.au", email="gardensparkgolflinks@hotmail.com", phone="08 8981 6365"
- OSM (low, 362m, sim=0): name="Gardens Park Golf Links", web="https://www.gardensparkgolflinks.com.au/", email=null, phone="+61 8 8981 6365"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0)
  - email: from fed(high, sim=0)
  - phone: from fed(high, sim=0)

### Gardiners Run (Australia, 2 courses)

- DB: addr="130-132 Victoria Road, Lilydale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:2780m,city:lilydale,db-name-substring,jaccard:0.50], 2780m, VIC 3140): name="Gardiners Run Golf Club", web="https://gardinersrun.com.au", email="manager@gardinersrun.com.au", phone="03 9739 7522"
- OSM (high, 209m, sim=1): name="Gardiners Run Golf Course", web="https://www.gardinersrun.com.au/", email=null, phone="+61 3 9739 7522"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Garfield Golf Club (Australia, 1 courses)

- DB: addr="180 Thirteen Mile Road, Garfield", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:190m,city:garfield,db-name-substring,jaccard:1.00], 190m, VIC 3814): name="Garfield Golf Club", web="https://www.garfieldgolf.com.au/cms/", email=null, phone="(03) 5629 2794"
- OSM (high, 14m, sim=1): name="Garfield Golf Club", web="https://www.garfieldgolf.com.au/", email=null, phone="+61 3 5629 2794"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Gatton Jubilee Golf Club (Australia, 1 courses)

- DB: addr="Woodlands Road, Gatton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:165m,city:gatton,db-name-substring,jaccard:1.00], 165m, QLD 4343): name="Gatton Jubilee Golf Club", web="https://www.gattongolf.com.au", email="manager@gattongolf.com.au", phone="5462 1420"
- OSM (high, 215m, sim=1): name="Gatton Jubilee Golf Club", web="https://www.gattongolf.com.au/", email=null, phone="+61 7 5462 1420"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Gawler Golf Club (Australia, 2 courses)

- DB: addr="129 Williamstown Road, Gawler", web=null, email=null, phone=null
- golf.com.au (high, sim=0.5, boost=+0.6[coord:247m,jaccard:0.67], 247m, SA 5118): name="Gawler Par 3 Golf Course", web=null, email=null, phone=null
- OSM (no-match, 1555570m, sim=0.667): name="Gailes Golf Club", web=null, email=null, phone=null

### Gayndah Golf Club (Australia, 1 courses)

- DB: addr="Nanango Road, Gayndah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:139m,city:gayndah,db-name-substring,jaccard:1.00], 139m, QLD 4625): name="Gayndah Golf Club", web=null, email="info@gayndahgolfclub.com", phone="(07) 4161 1587"
- OSM (high, 19m, sim=1): name="Gayndah Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Geelong Golf Club (Australia, 1 courses)

- DB: addr="Ballarat Road, Geelong", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:173m,city:geelong,db-name-substring,jaccard:1.00], 173m, VIC 3215): name="Geelong Golf Club", web=null, email=null, phone="03 5278 9800"
- OSM (high, 38m, sim=1): name="Geelong Golf Club", web="https://geelonggolf.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 38m, sim=1)
  - phone: from fed(high, sim=1)

### Geeveston Golf Club (Australia, 1 courses)

- DB: addr="Kermandie Road, Geeveston", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:270m,city:geeveston,db-name-substring,jaccard:1.00], 270m, TAS 7116): name="Geeveston Golf Club", web="https://geevestongc.com.au/", email="geevestongolfclub@gmail.com", phone=null
- OSM (high, 50m, sim=1): name="Geeveston Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)

### George Town Golf Club (Australia, 1 courses)

- DB: addr="East Tamar Highway, George Town", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.6[coord:2100m,city:george,jaccard:0.67], 2100m, TAS 7253): name="George Town", web="https://georgetowngolfclub.com.au/", email=null, phone="(03) 6382 1435"
- OSM (high, 24m, sim=1): name="George Town Golf Course", web="http://georgetowngolfclub.com.au/", email=null, phone="+61 3 6382 1435"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Georges River Golf Course (Australia, 1 courses)

- DB: addr="255 Henry Lawson Drive, Georges Hall", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.78[coord:420m,city:georges,jaccard:0.75], 420m, NSW 2198): name="Georges River Golf Club", web="https://www.geocites.com/riverwood_golf", email="phorinek@optusnet.com.au", phone="02 9724 1615"
- OSM (high, 54m, sim=1): name="Georges River Golf Course", web="https://georgesrivergolf.com.au/", email=null, phone="+61 2 9724 1615"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Geraldton Golf Club (Australia, 1 courses)

- DB: addr="Pass Street, Geraldton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:453m,city:geraldton,db-name-substring,jaccard:1.00], 453m, WA 6531): name="Geraldton Golf Club", web=null, email="email@geraldtongolfclub.com.au", phone="(08) 9921 3326"
- OSM (high, 45m, sim=1): name="Geraldton Golf Club", web="https://www.geraldtongolfclub.com.au/", email=null, phone="+61 8 9921 3326"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 45m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Gerringong Golf Club (Australia, 1 courses)

- DB: addr="Crooked River Road, Gerringong", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:148m,city:gerringong,db-name-substring,jaccard:1.00], 148m, NSW 2534): name="Gerringong Golf Club", web="https://www.gerringonggolf.com.au/", email="Bookings@gerringonggolf.com.au", phone="(02) 42343333"
- OSM (high, 112m, sim=1): name="Gerringong Golf Club", web="https://www.gerringonggolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Gibraltar Golf Club (Australia, 2 courses)

- DB: addr="Boronia Street, Bowral", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:182m,city:bowral,jaccard:0.67], 182m, NSW 2576): name="Gibraltar Golf Course", web="https://www.parkproxibowral.com/golf/", email=null, phone="02 48628615"
- OSM (low, 75m, sim=0.563): name="Gibraltar Hotel Bowral Golf Course", web="https://www.gibraltarbowral.com.au/country-golf.html", email=null, phone="+61 2 4862 8600"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Gilgandra Golf Club (Australia, 1 courses)

- DB: addr="Race Course Rd, Gilgandra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:28m,city:gilgandra,db-name-substring,jaccard:1.00], 28m, NSW 2827): name="Gilgandra Golf Club", web=null, email=null, phone="02 6847 2426"
- OSM (high, 0m, sim=1): name="Gilgandra Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Gin Gin Golf Club (Australia, 1 courses)

- DB: addr="4664 Bundaberg Road, Gin Gin", web=null, email=null, phone=null
- golf.com.au (high, sim=0.636, boost=+0.95[coord:81m,db-name-substring,jaccard:1.00], 81m, QLD 4671): name="Gin Gin Golf Club - QLD", web="https://www.gingingolf.asn.au", email="gingingolf2026@outlook.com", phone="0498495497"
- OSM (high, 58m, sim=1): name="Gin Gin Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.636)
  - email: from fed(high, sim=0.636)
  - phone: from fed(high, sim=0.636)

### Gisborne Golf Club (Australia, 2 courses)

- DB: addr="25 Daly Street, Gisborne", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:95m,city:gisborne,db-name-substring,jaccard:1.00], 95m, VIC 3437): name="Gisborne Golf Club", web="https://www.gisbornegolf.com.au", email="manager@gisbornegolf.com.au", phone="03 5428 2493"
- OSM (high, 32m, sim=1): name="Gisborne Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Glades Golf Club (Australia, 1 courses)

- DB: addr="Riverwalk Way, Robina", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.25[coord:748m], 748m, QLD 4226): name="The Glades Driving Range", web=null, email=null, phone="0403170287"
- OSM (low, 645m, sim=1): name="Glades Golf Course", web="https://www.glades.com.au/", email=null, phone="+61 7 5569 1900"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Gladstone Golf Club (Australia, 3 courses)

- DB: addr="Huddleston Road, Gladstone", web=null, email=null, phone=null
- golf.com.au (high, sim=0.75, boost=+1.1[coord:487m,city:gladstone,db-name-substring,jaccard:1.00], 487m, SA 5473): name="Gladstone Golf Club - SA", web=null, email="dmwebs47@gmail.com", phone="0435642018"
- OSM (high, 68m, sim=1): name="Gladstone Golf Club", web=null, email=null, phone="+61 8 8662 2442"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=0.75)
  - phone: from fed(high, sim=0.75)

### Glanville Par 3 Golf Course (Australia, 1 courses)

- DB: addr="Park Ave, Semaphore", web=null, email=null, phone=null
- golf.com.au (high, sim=0.733, boost=+0.92[coord:125m,city:semaphore,jaccard:0.75], 125m, SA 5019): name="Glanville Hall Golf Course", web="https://www.glanvillehallgolfcourse.com.au/", email="glanvillegc@belgravialeisure.com.au", phone="82499921"
- OSM (low, 5m, sim=0.267): name="3 Par Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.733)
  - email: from fed(high, sim=0.733)
  - phone: from fed(high, sim=0.733)

### Glanville Par 3 GPS (Australia, 1 courses)

- DB: addr="1A Wald Ave, Semaphore South  , Adelaide", web=null, email=null, phone=null
- golf.com.au (high, sim=0.579, boost=+0.55[coord:411m,city:semaphore], 411m, SA 5019): name="Glanville Hall Golf Course", web="https://www.glanvillehallgolfcourse.com.au/", email="glanvillegc@belgravialeisure.com.au", phone="82499921"
- OSM (low, 476m, sim=0.211): name="3 Par Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.579)
  - email: from fed(high, sim=0.579)
  - phone: from fed(high, sim=0.579)

### Glen Innes Golf Club (Australia, 1 courses)

- DB: addr="Hutchison Rd, Glen Innes", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:380m,city:glen,db-name-substring,jaccard:1.00], 380m, NSW 2370): name="Glen Innes Golf Club", web="https://gigolf.com.au", email="gigolf@giservices.com.au", phone="02 6732 1555"
- OSM (high, 4m, sim=1): name="Glen Innes Golf Club", web="https://gigolf.com.au/", email="gigolf@bigpond.net.au", phone="+61 2 6732 1555"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Glen Waverley Public Golf Course (Australia, 1 courses)

- DB: addr="Waverely Road, Glen Waverley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.88[coord:47m,city:glen,jaccard:0.60], 47m, VIC 3150): name="Glen Waverley Golf Club", web="http://www.glenwaverleygolfclub.com.au/", email="itsupport@glenwaverleygolfclub.com.au", phone="03 9560 7806"
- OSM (high, 41m, sim=1): name="Glen Waverley Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Glen Waverly Golf Course (Australia, 1 courses)

- DB: addr="915 Waverly early Rd, Glen Waverly", web=null, email=null, phone=null
- golf.com.au (high, sim=0.923, boost=+1.13[coord:47m,city:glen,jaccard:0.75,typo:waverly~waverley], 47m, VIC 3150): name="Glen Waverley Golf Club", web="http://www.glenwaverleygolfclub.com.au/", email="itsupport@glenwaverleygolfclub.com.au", phone="03 9560 7806"
- OSM (high, 41m, sim=0.923): name="Glen Waverley Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.923)
  - email: from fed(high, sim=0.923)
  - phone: from fed(high, sim=0.923)

### Glenden Golf Club (Australia, 1 courses)

- DB: addr="Gilbert Avenue, Glenden", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:474m,city:glenden,db-name-substring,jaccard:1.00], 474m, QLD 4743): name="Glenden Golf Club", web=null, email=null, phone="04 2742 7372"
- OSM (low, 710m, sim=1): name="Glenden Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Glenelg Golf Club (Australia, 2 courses)

- DB: addr="James Melrose Road, Novar Gardens", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:29m,city:novar,db-name-substring,jaccard:1.00], 29m, SA 5045): name="Glenelg Golf Club", web="http://www.glenelggolf.com", email=null, phone="(08) 83503250"
- OSM (high, 12m, sim=1): name="Glenelg Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Glenmore Heritage Golf Club (Australia, 4 courses)

- DB: addr="690 Mulgoa Road, Trentham", web=null, email=null, phone=null
- golf.com.au (high, sim=0.708, boost=+0.78[coord:424m,city:mulgoa,jaccard:0.75], 424m, NSW 2745): name="Glenmore Heritage Valley Golf Club", web="http://www.glenmoregolf.com.au", email=null, phone="02 4733 1230"
- OSM (low, 357m, sim=0.708): name="Glenmore Heritage Valley Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - website: from fed(high, sim=0.708)
  - phone: from fed(high, sim=0.708)

### Glenorchy Golf Club (Australia, 1 courses)

- DB: addr="Arapiles Street, Glenorchy", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:385m,city:glenorchy,db-name-substring,jaccard:1.00], 385m, VIC 3385): name="Glenorchy Golf Club", web=null, email=null, phone="04 2994 6303"
- OSM (high, 78m, sim=1): name="Glenorchy Golf Club", web=null, email=null, phone="+61 3 5359 0222"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Gloucester Country Club (Australia, 1 courses)

- DB: addr="4651 Bucketts Way, Gloucester", web=null, email=null, phone=null
- golf.com.au (high, sim=0.714, boost=+1.1[coord:266m,city:gloucester,db-name-substring,jaccard:1.00], 266m, NSW 2422): name="Gloucester Country Club Ltd", web="http://gloucestergolfclub.com.au", email="admin@gloucestercountryclub.com.au", phone="(02) 6558 1602"
- OSM (high, 15m, sim=1): name="Gloucester Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.714)
  - email: from fed(high, sim=0.714)
  - phone: from fed(high, sim=0.714)

### Gnowangerup Golf Club (Australia, 1 courses)

- DB: addr="Hinkley Road, Gnowangerup", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:292m,city:gnowangerup,db-name-substring,jaccard:1.00], 292m, WA 6335): name="Gnowangerup Golf Club", web=null, email=null, phone="0428428124"
- OSM (high, 32m, sim=1): name="Gnowangerup Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Gold Coast Burleigh Golf Club (Australia, 2 courses)

- DB: addr="Cnr Bardon Avenue and Hillcrest Parade,, Miami", web=null, email=null, phone=null
- golf.com.au (high, sim=0.421, boost=+0.7[coord:467m,city:miami,jaccard:0.50], 467m, QLD 4220): name="Burleigh Golf Club", web="http://www.burleighgolfclub.com.au", email="office@burleighgolfclub.com.au", phone="(07) 5572 8266"
- OSM (high, 14m, sim=1): name="Gold Coast Burleigh Golf Club", web="https://www.burleighgolfclub.com.au/", email=null, phone="+61 7 5572 8266"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.421)
  - email: from fed(high, sim=0.421)
  - phone: from fed(high, sim=0.421)

### Gold Creek Country Club (Australia, 1 courses)

- DB: addr="50 Curran Drive, Nicholls", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1020m,city:nicholls,db-name-substring,jaccard:1.00], 1020m, ACT 2913): name="Gold Creek Country Club", web=null, email=null, phone="02 6123 0601"
- OSM (low, 627m, sim=1): name="Gold Creek Country Club", web="https://www.goldcreekcountryclub.com.au/", email=null, phone="+61 2 6123 0601"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Golden Vale Golf Club (Australia, 1 courses)

- DB: addr="Golden Vale Road, Benalla", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:365m,city:benalla,db-name-substring,jaccard:1.00], 365m, VIC 3671): name="Golden Vale Golf Club", web=null, email=null, phone="0438700936"
- OSM (high, 72m, sim=1): name="Golden Vale Golf Course", web=null, email=null, phone="+61 3 5762 1993"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Goolgowi Golf Club (Australia, 1 courses)

- DB: addr="Zara Street, Goolgowi", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:770m,city:goolgowi,db-name-substring,jaccard:1.00], 770m, NSW 2652): name="Goolgowi Golf Club", web=null, email=null, phone="02 6968 8242"
- OSM (low, 916m, sim=1): name="Goolgowi Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Goombungee Golf Club (Australia, 1 courses)

- DB: addr="Golf Course Road, Goombungee", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:353m,city:goombungee,db-name-substring,jaccard:1.00], 353m, QLD 4354): name="Goombungee Golf Club", web="http://www.goombungeegolfclub.com", email="goombungeegolfclub@bigpond.com", phone="4696 5245"
- OSM (high, 105m, sim=1): name="Goombungee Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Goomeri Golf Club (Australia, 1 courses)

- DB: addr="Goomeri West Road, Goomeri", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:43m,city:goomeri,db-name-substring,jaccard:1.00], 43m, QLD 4601): name="Goomeri Golf Club", web=null, email=null, phone="07 4168 4145"
- OSM (high, 25m, sim=1): name="Goomeri Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Goonawarra Golf Club (Australia, 1 courses)

- DB: addr="2 Francis Boulevard, Sunbury", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:123m,city:sunbury,db-name-substring,jaccard:1.00], 123m, VIC 3429): name="Goonawarra Golf Club", web="http://www.goonawarragolfclub.com.au", email=null, phone="03 9744 4344"
- OSM (high, 167m, sim=0.909): name="Goona Warra Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Goondiwindi Golf Club (Australia, 1 courses)

- DB: addr="Hindmarsh Street, Goondiwindi", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:162m,city:goondiwindi,db-name-substring,jaccard:1.00], 162m, QLD 4390): name="Goondiwindi Golf Club", web=null, email=null, phone="07 4671 1171"
- OSM (high, 17m, sim=1): name="Goondiwindi Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Gordon Golf Club (Australia, 1 courses)

- DB: addr="2 Lynn Ridge Avenue, Gordon", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:361m,city:gordon,db-name-substring,jaccard:1.00], 361m, NSW 2072): name="Gordon Golf Club", web="http://www.gordongolfclub.com.au", email="info@gordongolfclub.com.au", phone="02 9498 1913"
- OSM (high, 63m, sim=1): name="Gordon Golf Club", web="https://www.gordongolfcourse.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Gosnells Golf Club (Australia, 1 courses)

- DB: addr="Warton Road, Gosnells", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:263m,db-name-substring,jaccard:1.00], 263m, WA 6155): name="Gosnells Golf Club", web="http://www.gosnellsgc.com.au", email="reception@gosnellsgc.com.au", phone="(08) 9455 1983"
- OSM (high, 79m, sim=1): name="Gosnells Golf Course", web="https://www.gosnellsgc.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Goulburn Golf Club (Australia, 1 courses)

- DB: addr="Blackshaw Road, Goulburn", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:78m,city:goulburn,db-name-substring,jaccard:1.00], 78m, NSW 2580): name="Goulburn Golf Club", web="http://www.goulburngolfclub.com.au", email=null, phone="02 4821 2454"
- OSM (high, 65m, sim=1): name="Goulburn Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Gove Country Golf Club (Australia, 1 courses)

- DB: addr="East Woody Road, Nhulunbuy", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:291m,city:nhulunbuy,db-name-substring,jaccard:1.00], 291m, NT 0881): name="Gove Country Golf Club", web="https://www.govecountrygolfclub.net", email="manager.golfinggove@gmail.com", phone="(08) 8987 3191"
- OSM (high, 46m, sim=1): name="Gove Country Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Gracemere Lake Golf Club (Australia, 1 courses)

- DB: addr="Fisher Street, Gracemere", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:359m,city:gracemere,db-name-substring,jaccard:1.00], 359m, QLD 4702): name="Gracemere Lake Golf Club", web=null, email=null, phone=" 07 4933 2266"
- OSM (high, 6m, sim=0.933): name="Gracemere Lakes Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Grafton District Golf Club (Australia, 1 courses)

- DB: addr="Bent Street, South Grafton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:485m,city:south,db-name-substring,jaccard:1.00], 485m, NSW 2460): name="Grafton District Golf Club", web=null, email="admin@graftongolf.com.au", phone="02 6642 2255"
- OSM (low, 122m, sim=0.438): name="Grafton Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Grampians Golf Club (Australia, 1 courses)

- DB: addr="Victoria Valley Road, Dunkeld", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:404m,city:victoria,db-name-substring,jaccard:1.00], 404m, VIC 3294): name="Grampians Golf Club", web="https://grampiansgolfclub.com.au", email=null, phone="0448261785"
- OSM (medium, 338m, sim=1): name="Grampians Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Green Acres Golf Club (Australia, 1 courses)

- DB: addr="51 Elm Grove, Kew East", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:311m,city:east,db-name-substring,jaccard:1.00], 311m, VIC 3102): name="Green Acres Golf Club", web="https://greenacresgolf.com.au", email="reception@greenacresgolf.com.au", phone="03 9859 1294"
- OSM (high, 203m, sim=1): name="Green Acres Golf Club", web="http://www.greenacresgolf.com.au/", email=null, phone="+61 3 9859 2338;+61 3 9859 1294"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Green Head Golf Club (Australia, 1 courses)

- DB: addr="The Lakes Rd, Green Head", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:748m,city:green,db-name-substring,jaccard:1.00], 748m, WA 6514): name="Green Head Golf Club", web=null, email=null, phone="0429870143"
- OSM (high, 49m, sim=1): name="Green Head Golf Club", web=null, email=null, phone="+61 8 9953 1223;+61 8 9953 1858"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Greenbushes Golf Club (Australia, 1 courses)

- DB: addr="Greenbushes-Boyup Brook Rd, Greenbushes", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:242m,city:greenbushes,db-name-substring,jaccard:1.00], 242m, WA 6254): name="Greenbushes Golf Club", web=null, email=null, phone="0409827648"
- OSM (high, 63m, sim=1): name="Greenbushes Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Greens Beach Golf Club (Australia, 3 courses)

- DB: addr="1765 Greens Beach Road, Greens Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:47m,city:greens,db-name-substring,jaccard:1.00], 47m, TAS 7270): name="Greens Beach Golf Club", web="https://greensbeachgolf.com.au/", email=null, phone="03 6383 9102"
- OSM (high, 41m, sim=1): name="Greens Beach Golf Club", web="https://greensbeachgolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Grenfell Country Club (Australia, 1 courses)

- DB: addr="Gooloogong Road, Grenfell", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:224m,city:grenfell,db-name-substring,jaccard:1.00], 224m, NSW 2810): name="Grenfell Country Club", web=null, email="b343127@gmail.com", phone="0478710260"
- OSM (high, 0m, sim=1): name="Grenfell Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Griffith Golf Club (Australia, 1 courses)

- DB: addr="Remembrance Drive, Griffith", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:546m,city:griffith,db-name-substring,jaccard:1.00], 546m, NSW 2680): name="Griffith Golf Club", web="http://www.griffithgolfclub.com.au", email=null, phone="6962 3173"
- OSM (high, 43m, sim=1): name="Griffith Golf Club", web="https://www.griffithgolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Grong Grong Golf Club (Australia, 1 courses)

- DB: addr="Narrandera Road, Grong Grong", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:583m,city:grong,db-name-substring,jaccard:1.00], 583m, NSW 2652): name="Grong Grong Golf Club", web="https://www.facebook.com/people/Grong-Grong-Sports-Club/61572914204257/#", email=null, phone="02 6956 2232"
- OSM (high, 66m, sim=1): name="Grong Grong Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Growling Frog Golf Course (Australia, 1 courses)

- DB: addr="1910 Donnybrook Road, Yan Yean", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:584m,city:yean,db-name-substring,jaccard:1.00], 584m, VIC 3755): name="Growling Frog Golf Course", web="https://growlingfroggolf.com.au/", email="gfgolf@growlingfroggolf.com.au", phone="(03) 9716 3477"
- OSM (high, 124m, sim=1): name="Growling Frog Golf Course", web="http://www.growlingfroggolfcourse.com.au/", email=null, phone="+61 3 9716 3477"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Guilderton Golf Club (Australia, 1 courses)

- DB: addr="Wedge Street, Guilderton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:202m,city:guilderton,db-name-substring,jaccard:1.00], 202m, WA 6041): name="Guilderton Golf Club", web="https://guildertoncc.wixsite.com/guildertoncc/golf", email="guildertongolfclub@gmail.com", phone="0417 186 805"
- OSM (high, 70m, sim=1): name="Guilderton Golf Club", web=null, email=null, phone="+61 8 9577 1053;+61 8 9577 1013"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Gulgong Golf Club (Australia, 1 courses)

- DB: addr="Tallawang Road, Gulgong", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:121m,city:gulgong,db-name-substring,jaccard:1.00], 121m, NSW 2852): name="Gulgong Golf Club", web=null, email="sparkleelectricalservices16@gmail.com", phone="0458676895"
- OSM (high, 9m, sim=1): name="Gulgong Golf Club", web=null, email=null, phone="+61 2 6374 1979"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Gungahlin Lakes ACT Golfers Index (Australia, 1 courses)

- DB: addr="110 Gundaroo Dr, Nicholls", web=null, email=null, phone=null
- golf.com.au (high, sim=0.455, boost=+0.7[coord:71m,city:nicholls], 71m, ACT 2911): name="Gungahlin Lakes Golf Club", web="http://www.gungahlinlakes.com", email=null, phone="61800821 / 62426283"
- OSM (low, 577m, sim=0.455): name="Gungahlin Lakes Golf Club", web="https://www.gungahlinlakesgolf.com.au/cms/", email="golfsec@gungahlinlakes.com", phone="+61 2 6108 0821;+61 2 6180 0840;+61 2 6242 4662"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.455)
  - phone: from fed(high, sim=0.455)

### Gungahlin Lakes Golf Club (Australia, 1 courses)

- DB: addr="Cnr Gundaroo and Gungahlin Drives, Nicholls", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:71m,city:nicholls,db-name-substring,jaccard:1.00], 71m, ACT 2911): name="Gungahlin Lakes Golf Club", web="http://www.gungahlinlakes.com", email=null, phone="61800821 / 62426283"
- OSM (low, 577m, sim=1): name="Gungahlin Lakes Golf Club", web="https://www.gungahlinlakesgolf.com.au/cms/", email="golfsec@gungahlinlakes.com", phone="+61 2 6108 0821;+61 2 6180 0840;+61 2 6242 4662"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Gungahlin Lakes Not Used (Australia, 1 courses)

- DB: addr="110 Gundaroo Dr, Nicholls", web=null, email=null, phone=null
- golf.com.au (high, sim=0.625, boost=+0.85[coord:71m,city:nicholls,jaccard:0.50], 71m, ACT 2911): name="Gungahlin Lakes Golf Club", web="http://www.gungahlinlakes.com", email=null, phone="61800821 / 62426283"
- OSM (low, 577m, sim=0.625): name="Gungahlin Lakes Golf Club", web="https://www.gungahlinlakesgolf.com.au/cms/", email="golfsec@gungahlinlakes.com", phone="+61 2 6108 0821;+61 2 6180 0840;+61 2 6242 4662"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.625)
  - phone: from fed(high, sim=0.625)

### Gunnedah Golf Club (Australia, 1 courses)

- DB: addr="George Street, Gunnedah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:471m,city:gunnedah,db-name-substring,jaccard:1.00], 471m, NSW 2380): name="Gunnedah Golf Club", web=null, email=null, phone="02 6742 2111"
- OSM (high, 2m, sim=1): name="Gunnedah Golf Club", web="https://www.gunnedahgolfclub.com.au/", email=null, phone="+61 2 6742 2111"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 2m, sim=1)
  - phone: from fed(high, sim=1)

### Gunning Golf Club (Australia, 1 courses)

- DB: addr="Gundaroo Road, Gunning", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:314m,city:gunning,db-name-substring,jaccard:1.00], 314m, NSW 2581): name="Gunning Golf Club", web=null, email=null, phone="(02) 4845 1195"
- OSM (high, 24m, sim=1): name="Gunning Golf Course", web=null, email=null, phone="+61 2 4845 1195"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Guyra Golf Club (Australia, 1 courses)

- DB: addr="Mckie Parkway, Guyra", web=null, email=null, phone=null
- golf.com.au (high, sim=0.385, boost=+0.7[coord:105m,city:guyra], 105m, NSW 2365): name="Guyra Bowling and Recreation Club", web=null, email="admin@guyrabowlingclub.com", phone="02 6779 1499"
- OSM (medium, 378m, sim=1): name="Guyra Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.385)
  - phone: from fed(high, sim=0.385)

### Gympie Golf Club (Australia, 2 courses)

- DB: addr="2 Shields Street, Gympie", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:403m,city:gympie,db-name-substring,jaccard:1.00], 403m, QLD 4570): name="Gympie Golf Club", web="https://gympiesportsclub.com.au", email=null, phone="1300 51 30 80"
- OSM (high, 22m, sim=1): name="Gympie Golf Club", web="https://www.gympiegolfclub.org/", email=null, phone="+61 7 5481 2795"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Half Moon Bay Country Golf Club (Australia, 3 courses)

- DB: addr="66 Wattle Street, Yorkeys Knob", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.78[coord:341m,city:yorkeys,jaccard:0.75], 341m, QLD 4878): name="Half Moon Bay Golf Club", web="https://halfmoonbaygolf.com.au", email="golfadmin@halfmoonbaygolf.com.au", phone="07 4055 7884"
- OSM (high, 135m, sim=1): name="Half Moon Bay Golf Club", web=null, email=null, phone="+61 7 4055 7933"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Halls Gap Golf Club (Australia, 1 courses)

- DB: addr="231 Red Gum Lease Track, Halls Gap", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:3m,city:halls,db-name-substring,jaccard:1.00], 3m, VIC 3381): name="Halls Gap Golf Club", web="http://www.hallsgapgolfclub.com.au", email=null, phone="0353564566"
- OSM (low, 341m, sim=0.36): name="Halls Gap - Mount Difficult Golf Course", web="http://www.hallsgapgolfclub.com.au/", email=null, phone="+61 3 5356 4217;+61 3 5356 4679"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Hamersley Public Golf Course (Australia, 1 courses)

- DB: addr="102 Marmion Avenue, Karrinyup", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:352m,city:karrinyup,db-name-substring,jaccard:1.00], 352m, WA 6018): name="Hamersley Public Golf Course", web=null, email=null, phone="08 9447 7137"
- OSM (high, 59m, sim=1): name="Hamersley Golf Course", web="https://www.stirling.wa.gov.au/Recreation/Pages/Hamersley-Golf-Course.aspx", email=null, phone="+61 8 9447 7137"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 59m, sim=1)
  - phone: from fed(high, sim=1)

### Hamilton Golf Club (Australia, 1 courses)

- DB: addr="170 Rippon Rd, Hamilton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:194m,city:hamilton,db-name-substring,jaccard:1.00], 194m, VIC 3300): name="Hamilton Golf Club", web=null, email="admin@hamiltongolfclub.com.au", phone="03 5571 2644"
- OSM (high, 15m, sim=1): name="Hamilton Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Hamley Bridge Golf Club (Australia, 1 courses)

- DB: addr="Stockport Road, Stockport", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:198m,db-name-substring,jaccard:1.00], 198m, SA 5401): name="Hamley Bridge Golf Club", web=null, email=null, phone="(08) 8528 2202"
- OSM (low, 70m, sim=0.077): name="Stockport Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Harden Country Club (Australia, 1 courses)

- DB: addr="East Street, Harden", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:733m,city:harden,db-name-substring,jaccard:1.00], 733m, NSW 2587): name="Harden Country Club", web="http://www.hardencountryclub.com.au/", email=null, phone="02 63862483"
- OSM (low, 791m, sim=1): name="Harden Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Harrow Golf Club (Australia, 1 courses)

- DB: addr="Nhill-Harrow Road, Harrow", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:276m,city:harrow,db-name-substring,jaccard:1.00], 276m, VIC 3317): name="Harrow Golf Club", web=null, email=null, phone="03 5588 1399"
- OSM (high, 48m, sim=1): name="Harrow Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Hartfield Country Club (Australia, 2 courses)

- DB: addr="90 Hartfield Road, Forrestfield", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:230m,city:forrestfield,db-name-substring,jaccard:1.00], 230m, WA 6058): name="Hartfield Country Club", web="http://www.hartfieldgolf.com.au", email=null, phone="(08) 9453 6137"
- OSM (high, 112m, sim=1): name="Hartfield Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Hawks Nest Golf Club (Australia, 1 courses)

- DB: addr="Sandereling Ave, Hawks  Nest", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:249m,city:hawks,db-name-substring,jaccard:1.00], 249m, NSW 2324): name="Hawks Nest Golf Club", web="https://www.hawksnestgolfclub.com.au", email="reception@hawksnestgolfclub.com.au", phone="02 4997 0145"
- OSM (high, 198m, sim=1): name="Hawks Nest Golf Club", web="https://www.hawksnestgolfclub.com.au/", email=null, phone="+61 2 4997 0145"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Headland Golf Club (Australia, 1 courses)

- DB: addr="Golf Links Road, Buderim", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:286m,city:buderim,db-name-substring,jaccard:1.00], 286m, QLD 4556): name="Headland Golf Club", web="http://www.headlandgolfclub.com.au", email="golf@headlandgolfclub.com.au", phone="07 5444 5800"
- OSM (high, 140m, sim=1): name="Headland Golf Club", web="https://www.headlandgolfclub.com.au/", email=null, phone="+61 7 5444 5944;+61 7 5444 5800"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Heathcote Golf Club (Australia, 1 courses)

- DB: addr="61 Patterson Street, Heathcote", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:349m,city:heathcote,db-name-substring,jaccard:1.00], 349m, VIC 3523): name="Heathcote Golf Club", web="http://www.heathcotegolfclub.com.au", email="info@heathcotegolfclub.com.au", phone="0418470465"
- OSM (high, 17m, sim=1): name="Heathcote Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Heathmont Par 3 Golf Course (Australia, 1 courses)

- DB: addr="341 Canterbury Road, Heathmont", web=null, email=null, phone=null
- golf.com.au (high, sim=0.6, boost=+0.45[coord:328m,jaccard:0.67], 328m, VIC 3153): name="Heathmont Golf Park", web=null, email=null, phone=null
- OSM (low, 86m, sim=0.6): name="Heathmont Golf Park", web="http://www.heathmontgolfpark.com/", email=null, phone="+61 3 9729 8861"

### Heidelberg Golf Club (Australia, 1 courses)

- DB: addr="8 Main Road,, Lower Plenty", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:193m,city:lower,db-name-substring,jaccard:1.00], 193m, VIC 3093): name="Heidelberg Golf Club", web="https://www.heidelberggc.com.au", email=null, phone="03 9433 5300"
- OSM (high, 38m, sim=1): name="Heidelberg Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Helensvale Golf Club (Australia, 1 courses)

- DB: addr="16 Wandilla Drive, Helensvale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.6[coord:2226m,city:helensvale,jaccard:0.67], 2226m, QLD 4212): name="Helensvale Golf Course", web="https://www.helensvalegolfcourse.com.au/", email=null, phone="0408724541"
- OSM (low, 2153m, sim=1): name="Helensvale Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Henbury Golf Club (Australia, 1 courses)

- DB: addr="Henbury Avenue, Kandos", web=null, email=null, phone=null
- golf.com.au (high, sim=0.412, boost=+0.55[coord:568m,city:kandos], 568m, NSW 2848): name="Henbury Sport and Recreation Club Ltd", web="https://henburygolf.com.au/", email="henburysport@outlook.com", phone="6379 4101"
- OSM (high, 11m, sim=1): name="Henbury Golf Club", web="https://henburygolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.412)
  - email: from fed(high, sim=0.412)
  - phone: from fed(high, sim=0.412)

### Henty Golf Club (Australia, 1 courses)

- DB: addr="21 Rosler Parade, Henty  ", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:334m,city:henty,db-name-substring,jaccard:1.00], 334m, NSW 2658): name="Henty Golf Club", web=null, email=null, phone="02 6929 3250"
- OSM (high, 53m, sim=1): name="Henty Golf Course", web="http://henty.nsw.au/SportRecreation/HentyGolfClub/tabid/540/Default.aspx", email=null, phone="+61 2 6929 3250"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 53m, sim=1)
  - phone: from fed(high, sim=1)

### Heritage Golf & Country Club (Australia, 2 courses)

- DB: addr="Heritage Avenue, Chirnside Park", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.6[city:chirnside,jaccard:1.00], 3573m, VIC 3116): name="Heritage Golf and Country Club", web="http://www.hgcc.com.au", email="shingeley@pgamember.org.au", phone="03 9760 3200"
- OSM (low, 5181m, sim=1): name="Heritage Golf and Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Hervey Bay Golf Club (Australia, 2 courses)

- DB: addr="Cnr Tooth St and Old Maryborough Road, Pialba", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2092m,city:pialba,db-name-substring,jaccard:1.00], 2092m, QLD 4655): name="Hervey Bay Golf Club", web="https://hbgcc.com.au", email="admin@hbgcc.com.au", phone="07 4124 4544"
- OSM (low, 2395m, sim=1): name="Hervey Bay Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Heyfield Golf Club (Australia, 1 courses)

- DB: addr="PO Box 43, Heyfield", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:389m,city:heyfield,db-name-substring,jaccard:1.00], 389m, VIC 3858): name="Heyfield Golf Club", web="http://www.heyfieldgolfclub.com.au", email="secretaryheygc@gmail.com", phone="03 5148 2517"
- OSM (high, 71m, sim=1): name="Heyfield Golf Club", web="http://www.heyfieldgolfclub.com/", email="secretary@heyfieldgolfclub.com", phone="+61 3 5148 2517"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Heywood Golf Club (Australia, 1 courses)

- DB: addr="Golf Course Road, Heywood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:469m,city:heywood,db-name-substring,jaccard:1.00], 469m, VIC 3304): name="Heywood Golf Club", web=null, email="jkmcleod99@gmail.com", phone="0414770967"
- OSM (high, 93m, sim=1): name="Heywood Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Hidden Valley Golf & Country Club (Australia, 1 courses)

- DB: addr="189 Hidden Valley Boulevard, Wallan", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.4[coord:1130m,city:wallan], 1130m, VIC 3756): name="Hidden Valley Resort", web="https://www.hiddenvalleyresort.com.au/", email=null, phone="03 4701 0000"
- OSM (medium, 453m, sim=1): name="Hidden Valley Golf & Country Club Golf", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Highercombe Golf & Country Club (Australia, 1 courses)

- DB: addr="101 Paracombe Rd, Paracombe", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1[coord:195m,city:paracombe,jaccard:1.00], 195m, SA 5132): name="Highercombe Golf + Country Club", web="http://www.highercombegolf.com.au", email="highercombe@highercombegolf.com.au", phone="(08) 8380 5220"
- OSM (high, 93m, sim=1): name="Highercombe Public Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Highlands Golf Club (Australia, 4 courses)

- DB: addr="Old Hume Highway, Mittagong", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:760m,city:mittagong,db-name-substring,jaccard:1.00], 760m, NSW 2575): name="Highlands Golf Club", web="http://highlandsgolf.com.au", email=null, phone="(02) 4871 1995"
- OSM (low, 619m, sim=1): name="Highlands Golf Club", web="https://www.highlandsgolfclub.com.au/", email=null, phone="+61 2 4871 1995"

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Hill Top Golf & Country Club (Australia, 1 courses)

- DB: addr="71 Gowrie Street, Tatura", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:241m,city:tatura,db-name-substring,jaccard:1.00], 241m, VIC 3616): name="Hill Top Golf & Country Club", web="http://hilltopgolfclub.com.au", email="info@hilltopgolfclub.com.au", phone="0358241689"
- OSM (high, 84m, sim=1): name="Hill Top Golf and Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Hillview Public Golf Course (Australia, 9 courses)

- DB: addr="350 Kalamunda Road, Maida Vale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:142m,city:maida,db-name-substring,jaccard:1.00], 142m, WA 6057): name="Hillview Public Golf Course", web=null, email=null, phone="08 9454 5554"
- OSM (medium, 295m, sim=1): name="Hillview Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Holbrook Golf Club (Australia, 1 courses)

- DB: addr="38 Swift Street, Holbrook", web=null, email=null, phone=null
- golf.com.au (high, sim=0.267, boost=+0.7[coord:479m,city:holbrook,jaccard:0.50], 479m, NSW 2644): name="Holbrook Returned Servicemen's Golf Club", web="https://www.facebook.com/profile.php?id=100057239569643", email="holbrookgolfclub@gmail.com", phone="02 6036 2199"
- OSM (high, 84m, sim=1): name="Holbrook Golf Club", web=null, email=null, phone="+61 2 6036 2199"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.267)
  - email: from fed(high, sim=0.267)
  - phone: from fed(high, sim=0.267)

### Home Hill Golf Club (Australia, 1 courses)

- DB: addr="Iona Road, Home Hill", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:home,db-name-substring,jaccard:1.00], 3234m, QLD 4806): name="Home Hill Golf Club", web=null, email="homehillgc@gmail.com", phone="0467 566 448"
- OSM (no-match, 2033195m, sim=0.667): name="Box Hill Golf Club", web="https://www.boxhillgolfclub.com.au/", email=null, phone="+61 3 9808 4519"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Hopetoun Everett Country Golf Club (Australia, 1 courses)

- DB: addr="Hopetoun, Esperance", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.92[coord:70m,city:hopetoun,jaccard:0.75], 70m, WA 6348): name="Hopetoun Everett Country Club", web=null, email="hopetoungolfclub@outlook.com", phone="(08) 9838 3456"
- OSM (high, 19m, sim=1): name="Hopetoun Everett Country Club", web=null, email=null, phone="+61 8 9838 1057;+61 8 9838 3057"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Hopetoun Golf Club (Australia, 1 courses)

- DB: addr="Rainbow Road, Hopetoun", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:510m,city:hopetoun,db-name-substring,jaccard:1.00], 510m, VIC 3396): name="Hopetoun Golf Club", web=null, email="tomhuf89@gmail.com", phone="0350833370"
- OSM (high, 62m, sim=1): name="Hopetoun Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Horizons Golf Resort (Australia, 1 courses)

- DB: addr="5 Horizons Drive, Salamander Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1258m,city:salamander,db-name-substring,jaccard:1.00], 1258m, NSW 2317): name="Horizons Golf Resort", web="http://www.horizons.com.au", email="proshop@horizons.com.au", phone="02 4982 0474"
- OSM (high, 18m, sim=1): name="Horizons Golf Course", web="https://horizons.com.au", email=null, phone="+61 2 4982 0474"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Horsham Golf Club (Australia, 1 courses)

- DB: addr="304 Golf Course Road, Haven", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:124m,city:haven,db-name-substring,jaccard:1.00], 124m, VIC 3401): name="Horsham Golf Club", web="http://horshamgolfclub.com.au", email=null, phone="03 5382 1652"
- OSM (high, 35m, sim=1): name="Horsham Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Howeston Golf Course (Australia, 10 courses)

- DB: addr="100A Creek Road, Birkdale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:462m,db-name-substring,jaccard:1.00], 462m, QLD 4159): name="Howeston Golf Course", web=null, email=null, phone=null
- OSM (high, 140m, sim=1): name="Howeston Golf Course", web=null, email=null, phone=null

### Hudson Park Golf Course (Australia, 1 courses)

- DB: addr="Arthur Street, Strathfield", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.4[coord:1397m,city:strathfield], 1397m, NSW ): name="Hudson Park Driving Range", web=null, email=null, phone=null
- OSM (low, 326m, sim=0.105): name="Strathfield Golf Course (private)", web="https://www.strathfieldgolf.com.au/", email=null, phone="+61 2 9642 8642"

### Hughenden Golf Club (Australia, 1 courses)

- DB: addr="Hann Highway, Hughenden", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:362m,city:hughenden,db-name-substring,jaccard:1.00], 362m, QLD 4821): name="Hughenden Golf Club", web=null, email=null, phone="07 4741 1195"
- OSM (high, 168m, sim=1): name="Hughenden Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Humpty Doo & Rural Area Golf Club (Australia, 1 courses)

- DB: addr="565 Pioneer Drv, Humpty Doo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:152m,city:humpty,db-name-substring,jaccard:1.00], 152m, NT 0836): name="Humpty Doo & Rural Area Golf Club", web="https://www.humptydoogolfclub.com.au", email="golf@humptydoogolfclub.com.au", phone="(08) 8988 1118"
- OSM (high, 109m, sim=1): name="Humpty Doo & Rural Area Golf Club", web="https://www.humptydoogolfclub.com.au/", email=null, phone="+61 8 8988 1118"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Hunter Valley Golf & Country Club (Australia, 1 courses)

- DB: addr="430 Wine Country Drive, Lovedale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1[coord:16m,city:lovedale,jaccard:1.00], 16m, NSW 2325): name="Hunter Valley Golf and Country Club", web="https://www.rydges.com/accommodation/regional-nsw/hunter-valley/facilities/hunter-valley-golf-club/", email="golf_rydgesresorthuntervalley@evt.com", phone="0249910977"
- OSM (no-match, 772535m, sim=0.692): name="Hidden Valley Golf & Country Club", web="http://www.hiddenvalleygolf.com.au/home", email=null, phone="+61 3 5783 0200"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Huntingdale Golf Club (Australia, 2 courses)

- DB: addr="Windsor Avenue, South Oakleigh", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:283m,city:south,db-name-substring,jaccard:1.00], 283m, VIC 3167): name="Huntingdale Golf Club", web=null, email=null, phone="03 9579 4622"
- OSM (high, 7m, sim=1): name="Huntingdale Golf Club", web="https://www.huntingdalegolf.com.au/", email="info@huntingdalegolf.com.au", phone="+61 3 9570 4133;+61 3 9579 4622"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 7m, sim=1)
  - email: from osm(high, 7m, sim=1)
  - phone: from fed(high, sim=1)

### Huon Valley Golf Club (Australia, 2 courses)

- DB: addr="Golf Course Road, Huonville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:36m,city:huonville,db-name-substring,jaccard:1.00], 36m, TAS 7109): name="Huon Valley Golf Club", web="https://hvgolfclub.com.au/", email=null, phone="0427738108"
- OSM (high, 177m, sim=1): name="Huon Valley Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Hurstville Golf Course (Australia, 1 courses)

- DB: addr="Lorraine Street, Peakhurst", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.6[coord:9m,jaccard:0.67], 9m, NSW 2223): name="Hurstville Golf Club", web="http://www.hurstvillegolfclub.com.au", email="h.gc@live.com.au", phone="(02) 9534 5024"
- OSM (high, 216m, sim=1): name="Hurstville Golf Course", web="http://www.hurstvillegolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Hyatt  Regency Coolum (Australia, 1 courses)

- DB: addr="Warran Road, Coolum Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=0.45, boost=+0.55[coord:863m,city:coolum], 863m, QLD 4573): name="Palmer Coolum Resort", web="https://www.palmercoolumresort.com.au", email="golf@palmercolumresort.com.au", phone="07 5449 33366"
- OSM (low, 892m, sim=0.136): name="Beachside Championship Golf Course", web="https://palmercoolumresort.com.au/", email=null, phone="+61 7 5446 1234"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.45)
  - email: from fed(high, sim=0.45)
  - phone: from fed(high, sim=0.45)

### Hyden Golf Club (Australia, 1 courses)

- DB: addr="442 King Rock North Road, Hyden", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:90m,city:hyden,db-name-substring,jaccard:1.00], 90m, WA 6359): name="Hyden Golf Club", web=null, email="hydengolf@gmail.com", phone="(08) 9880 8015"
- OSM (high, 0m, sim=1): name="Hyden Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ilfracombe Golf Club (Australia, 1 courses)

- DB: addr="Paddy Behan Way, Ilfracombe", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:642m,city:ilfracombe,db-name-substring,jaccard:1.00], 642m, QLD 4727): name="Ilfracombe Golf Club", web=null, email="ilfracombegolf4727@gmail.com", phone="0746589215"
- OSM (high, 64m, sim=1): name="Ilfracombe Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Iluka Golf Club (Australia, 1 courses)

- DB: addr="Hickey Street, Iluka", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:356m,city:iluka,db-name-substring,jaccard:1.00], 356m, NSW 2466): name="Iluka Golf Club", web="https://www.ilukagolf.com.au", email="manager@ilukagolf.com.au", phone="02 6646 6408"
- OSM (high, 62m, sim=1): name="Iluka Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Indooroopilly Golf Club (Australia, 6 courses)

- DB: addr="Meiers Road, Indooroopilly", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:23m,city:indooroopilly,db-name-substring,jaccard:1.00], 23m, QLD 4068): name="Indooroopilly Golf Club", web="http://www.indooroopillygolf.com.au", email="golf@igcgolf.com.au", phone="07 3721 2121"
- OSM (high, 203m, sim=1): name="Indooroopilly Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 6 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ingham Golf Club (Australia, 1 courses)

- DB: addr="Marina Parade, Ingham", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:391m,city:ingham,db-name-substring,jaccard:1.00], 391m, QLD 4850): name="Ingham Golf Club", web=null, email=null, phone="4776 5600"
- OSM (high, 3m, sim=1): name="Ingham Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Inglestone Golf Club (Australia, 1 courses)

- DB: addr="Westmar Road, Meandarra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:122m,city:meandarra,db-name-substring,jaccard:1.00], 122m, QLD 4422): name="Inglestone Golf Club", web=null, email=null, phone="4663 0760"
- OSM (low, 571086m, sim=0.7): name="Singleton Golf Club", web="https://www.singletongolfclub.com", email=null, phone="+61 2 6572 1633"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Inglewood Golf Club (Australia, 3 courses)

- DB: addr="Albert Street, Inglewood", web=null, email=null, phone=null
- golf.com.au (high, sim=0.692, boost=+1.1[coord:381m,city:inglewood,db-name-substring,jaccard:1.00], 381m, VIC 3517): name="Inglewood Golf Club (VIC)", web=null, email=null, phone="03 5438 3471"
- OSM (high, 96m, sim=1): name="Inglewood Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.692)

### Innes Park Country Club (Australia, 1 courses)

- DB: addr="Innes Park Road, Bundaberg", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:36m,city:innes], 36m, QLD 4670): name="Innes Park Golf Club", web=null, email=null, phone="(07) 4159 3489"
- OSM (high, 45m, sim=1): name="Innes Park Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Innisfail Golf Club (Australia, 1 courses)

- DB: addr="Palmerston Highway, Innisfail", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1639m,city:innisfail,db-name-substring,jaccard:1.00], 1639m, QLD 4860): name="Innisfail Golf Club", web="http://www.innisfailgolf.com", email=null, phone="07 4061 2223"
- OSM (low, 1740m, sim=1): name="Innisfail Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Inverell Golf Club (Australia, 1 courses)

- DB: addr="Kareela Road, Penrose", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:255m,db-name-substring,jaccard:1.00], 255m, NSW 2360): name="Inverell Golf Club", web=null, email=null, phone="02 6722 4203"
- OSM (high, 79m, sim=1): name="Inverell Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Inverleigh Golf Club (Australia, 1 courses)

- DB: addr="Common Road, Inverleigh", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:211m,city:inverleigh,db-name-substring,jaccard:1.00], 211m, VIC 3321): name="Inverleigh Golf Club", web=null, email="golf3321@bigpond.com", phone="0414524866"
- OSM (low, 634m, sim=1): name="Inverleigh Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Iron Knob Golf Club (Australia, 1 courses)

- DB: addr="Eyre Highway, Iron Knob", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1199m,city:iron,db-name-substring,jaccard:1.00], 1199m, SA 5601): name="Iron Knob Golf Club", web=null, email=null, phone="0448689233"
- OSM (no-match, 1456451m, sim=0.667): name="Iron Pot Golf Course", web=null, email=null, phone="+61 409 972 150"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Iron Pot Golf Club (Australia, 1 courses)

- DB: addr="10 Nerang Street, Lauderdale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:255m,db-name-substring,jaccard:1.00], 255m, TAS 7022): name="Iron Pot Golf Club", web="https://iron-pot-golf-course.edan.io/", email=null, phone="(03) 62399171"
- OSM (high, 104m, sim=1): name="Iron Pot Golf Course", web=null, email=null, phone="+61 409 972 150"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Isis Golf Club (Australia, 1 courses)

- DB: addr="Goodwood Road, Childers", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:212m,db-name-substring,jaccard:1.00], 212m, QLD 4660): name="Isis Golf Club", web=null, email="isisgolfclubinc@bigpond.com", phone="07 4126 1430"
- OSM (low, 36m, sim=0.308): name="Isis Golf Club (Childers Golf Club)", web="http://www.isisgolfclub.com.au/", email="isisgolfclubinc@bigpond.com", phone="+61 7 4126 1430"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Isisford Golf Club (Australia, 1 courses)

- DB: addr="Isisford", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:178m,city:isisford,db-name-substring,jaccard:1.00], 178m, QLD 4731): name="Isisford Golf Club", web=null, email=null, phone="0427588174"
- OSM (high, 175m, sim=1): name="Isisford Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Ivanhoe Golf Course (Australia, 2 courses)

- DB: addr="Ivanhoe Golf Course, Vasey Street", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.92[coord:108m,city:ivanhoe,jaccard:0.75], 108m, VIC 3079): name="Ivanhoe Public Golf Course", web="https://www.ivanhoegolf.com.au", email=null, phone="03 9499 7001"
- OSM (high, 96m, sim=1): name="Ivanhoe Public Golf Course", web="http://www.ivanhoegolfcourse.com.au/", email=null, phone="+61 3 9499 7001"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Jabiru Golf Club (Australia, 1 courses)

- DB: addr="Lot 2004 Jabiru Drive, Dr Jabiru", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:152m,city:jabiru,db-name-substring,jaccard:1.00], 152m, NT 0886): name="Jabiru Golf Club", web="http://www.jabirugolfclub.com.au", email="secretary.JGC@gmail.com", phone="(08) 8979 2575"
- OSM (high, 102m, sim=1): name="Jabiru Golf Course", web="https://www.tourismtopend.com.au/kakadu-national-park/jabiru-golf-club", email="jabiru_golf_club@bigpond.com", phone="+61 8 8979 2575"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Jamberoo Golf Club (Australia, 1 courses)

- DB: addr="Allowrie Street, Jamberoo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:453m,city:jamberoo,db-name-substring,jaccard:1.00], 453m, NSW 2533): name="Jamberoo Golf Club", web="https://jamberoogolf.com.au", email="golf@jamberoogolf.com.au", phone="02 4236 0291"
- OSM (high, 26m, sim=1): name="Jamberoo Golf Club", web="https://jamberoogolf.com.au/", email=null, phone="+61 2 4236 0404"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Jamestown Golf Club (Australia, 1 courses)

- DB: addr="Bundaleer Forest Reserve, Jamestown", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:106m,city:jamestown,db-name-substring,jaccard:1.00], 106m, SA 5491): name="Jamestown Golf Club", web=null, email="JamestownGC@gmail.com", phone="(08) 8664 1004"
- OSM (high, 18m, sim=1): name="Jamestown Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Jeparit Golf Club (Australia, 1 courses)

- DB: addr="Lake Road, Jeparit", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:136m,city:jeparit,db-name-substring,jaccard:1.00], 136m, VIC 3423): name="Jeparit Golf Club", web=null, email=null, phone="0418160247"
- OSM (high, 171m, sim=1): name="Jeparit Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Jerilderie Golf Club (Australia, 1 courses)

- DB: addr="Newell Highway, Jerilderie", web=null, email=null, phone=null
- golf.com.au (high, sim=0.588, boost=+1[coord:834m,city:jerilderie,db-name-substring,jaccard:0.67], 834m, NSW 2716): name="Jerilderie Golf Club and Sports Club", web=null, email=null, phone="03 5886 1445"
- OSM (high, 97m, sim=1): name="Jerilderie Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.588)

### Jerramungup Golf Club (Australia, 1 courses)

- DB: addr="Derrick Street, Jerramungup", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:267m,city:jerramungup,db-name-substring,jaccard:1.00], 267m, WA 6337): name="Jerramungup Golf Club", web=null, email="jerrygolfclub@gmail.com", phone="(08) 98351128"
- OSM (high, 104m, sim=1): name="Jerramungup Golf Club", web=null, email=null, phone="+61 8 9835 1006;+61 8 9835 1058"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Jindalee Golf Club (Australia, 2 courses)

- DB: addr="62 Yallambee Road, Brisbane", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:176m,db-name-substring,jaccard:1.00], 176m, QLD 4074): name="Jindalee Golf Club", web="http://www.jindaleegolf.com.au", email="manager@jindaleegolf.com.au", phone="07 33761468"
- OSM (high, 24m, sim=1): name="Jindalee Golf Club", web="https://www.jindaleegolf.com.au/", email=null, phone="+61 7 3376 0713"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Jindera Country Golf Club (Australia, 1 courses)

- DB: addr="Drumwood Road, Jindera", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:307m,city:jindera,db-name-substring,jaccard:1.00], 307m, NSW 2642): name="Jindera Country Golf Club", web="https://www.jinderagolfclub.com", email="admin@jinderagolfclub.com", phone="02 6026 3458"
- OSM (high, 125m, sim=1): name="Jindera Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Junee Golf Club (Australia, 1 courses)

- DB: addr="Golf Avenue, Junee", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:399m,city:junee,db-name-substring,jaccard:1.00], 399m, NSW 2663): name="Junee Golf Club", web=null, email=null, phone="02 69243371"
- OSM (high, 35m, sim=1): name="Junee Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Jurien Bay Country Golf Club (Australia, 1 courses)

- DB: addr="19th Avenue, Jurien", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:665m,city:jurien,jaccard:0.67], 665m, WA 6516): name="Jurien Bay Golf Club", web="http://juriengolf.com.au", email=null, phone="08 96521353"
- OSM (high, 115m, sim=1): name="Jurien Bay Golf Club", web=null, email="jurienbaygolf@bigpond.com", phone="+61 8 9652 1353"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 115m, sim=1)
  - phone: from fed(high, sim=1)

### Kadina Golf Club (Australia, 1 courses)

- DB: addr="Digby Street, Kadina", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:190m,city:kadina,db-name-substring,jaccard:1.00], 190m, SA 5554): name="Kadina Golf Club", web=null, email="kadinagolfclub@gmail.com", phone="(08) 8821 2568"
- OSM (high, 81m, sim=1): name="Kadina Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kalannie Golf Club (Australia, 1 courses)

- DB: addr="Stanley Street, Kalannie", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:469m,city:kalannie,db-name-substring,jaccard:1.00], 469m, WA 6468): name="Kalannie Golf Club", web=null, email=null, phone="08-96662088"
- OSM (high, 59m, sim=1): name="Kalannie Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Kalbarri Golf & Bowling Club (Australia, 1 courses)

- DB: addr="Rochester Street, Kalbarri", web=null, email=null, phone=null
- golf.com.au (high, sim=0.5, boost=+0.75[coord:472m,city:kalbarri,jaccard:0.67], 472m, WA 6536): name="Kalbarri Golf Club", web=null, email=null, phone="(08) 99371499"
- OSM (low, 168m, sim=0.5): name="Kalbarri Golf Club", web="http://www.kalbarrigolfclub.com.au/", email=null, phone="+61 8 9937 1499"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.5)

### Kalgoorlie Golf Club (Australia, 1 courses)

- DB: addr="93 Aslett Drive, Karlkula", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.3[coord:1923m,jaccard:0.67], 1923m, WA 6430): name="Kalgoorlie Golf Course", web=null, email="jemmapricegolf@gmail.com", phone="(08) 9021 2252"
- OSM (high, 119m, sim=1): name="Kalgoorlie Golf Course", web="http://www.ckb.wa.gov.au/Kalgoorlie-Golf-Course.aspx", email="golf@kalgoorliegolfcourse.com", phone="+61 8 9026 2626"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 119m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kangaroo Valley Golf & Country Resort (Australia, 2 courses)

- DB: addr="390 Mt Scanzi Road, Kangaroo Valley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.88[coord:117m,city:kangaroo,jaccard:0.60], 117m, NSW 2577): name="Kangaroo Valley Country Club", web="http://www.kangaroovalleygolf.com.au", email=null, phone="(02) 4465 0200"
- OSM (high, 131m, sim=1): name="Kangaroo Valley Golf & Country Resort", web="https://kangaroovalleygolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kangaroo Valley Golf and Country Resort (Australia, 1 courses)

- DB: addr="390 Mt Scanzi Road, Kangaroo Valley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.88[coord:117m,city:kangaroo,jaccard:0.60], 117m, NSW 2577): name="Kangaroo Valley Country Club", web="http://www.kangaroovalleygolf.com.au", email=null, phone="(02) 4465 0200"
- OSM (high, 131m, sim=1): name="Kangaroo Valley Golf & Country Resort", web="https://kangaroovalleygolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kaniva Golf Club (Australia, 1 courses)

- DB: addr="60 Madden Street, Kaniva", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:157m,city:kaniva,db-name-substring,jaccard:1.00], 157m, VIC 3419): name="Kaniva Golf Club", web=null, email="kanivagolfclub@outlook.com", phone="0427931237"
- OSM (high, 7m, sim=1): name="Kaniva Golf Club", web="https://golfer.com.au/directory/kaniva-golf-club-west-wimmera-victoria/1266", email=null, phone="+61 3 5392 2337"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 7m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kapunda Golf Club (Australia, 1 courses)

- DB: addr="Hancock Road, Kapunda", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:373m,city:kapunda,db-name-substring,jaccard:1.00], 373m, SA 5373): name="Kapunda Golf Club", web="http://www.kapundagolf.com.au", email="kapundagolfclub@outlook.com", phone="(08) 8566 2711"
- OSM (high, 38m, sim=1): name="Kapunda Golf Club", web="https://kapundagolf.com.au/", email=null, phone="+61 8 8566 2711"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kareela 2018 (Australia, 1 courses)

- DB: addr="1 Bates Drive, Kareela", web=null, email=null, phone=null
- golf.com.au (high, sim=0.583, boost=+0.55[coord:568m,city:kareela], 568m, NSW 2232): name="Kareela Golf Club", web="http://www.kareelagolf.com.au", email=null, phone="02 9521 5555"
- OSM (low, 499m, sim=0.583): name="Kareela Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.583)
  - phone: from fed(high, sim=0.583)

### Kareela Golf Club (Australia, 3 courses)

- DB: addr="1 Bates Drive, Sutherland", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:20m,db-name-substring,jaccard:1.00], 20m, NSW 2232): name="Kareela Golf Club", web="http://www.kareelagolf.com.au", email=null, phone="02 9521 5555"
- OSM (high, 0m, sim=1): name="Kareela Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Karoonda Golf Club (Australia, 1 courses)

- DB: addr="Wilson Drive, Karoonda", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:91m,city:karoonda,db-name-substring,jaccard:1.00], 91m, SA 5307): name="Karoonda Golf Club", web=null, email="karoondagolfclub@gmail.com", phone="04338 263 105"
- OSM (high, 3m, sim=1): name="Karoonda Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Karratha Golf Club (Australia, 3 courses)

- DB: addr="Searipple Road, Karratha", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[coord:314m,city:karratha], 314m, WA 6714): name="Karratha Country Club", web=null, email=null, phone="(08) 91851045"
- OSM (high, 54m, sim=1): name="Karratha Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Karuah Golf Club (Australia, 1 courses)

- DB: addr="154 Tarean Road, Karuah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:426m,city:karuah,db-name-substring,jaccard:1.00], 426m, NSW 2324): name="Karuah Golf Club", web="http://karuahgolfclub.com.au", email=null, phone="0499975693"
- OSM (high, 16m, sim=1): name="Karuah Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Karumba Golf Club (Australia, 1 courses)

- DB: addr="Karumba Road, Karumba", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:281m,city:karumba,db-name-substring,jaccard:1.00], 281m, QLD 4891): name="Karumba Golf Club", web=null, email=null, phone="4745 9100"
- OSM (high, 150m, sim=1): name="Karumba Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Katanning Country Club (Australia, 1 courses)

- DB: addr="Round Drive, Katanning", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2123m,city:katanning,db-name-substring,jaccard:1.00], 2123m, WA 6317): name="Katanning Country Club", web=null, email="kcclub@outlook.com.au", phone="(08) 9821 1817"
- OSM (low, 2263m, sim=1): name="Katanning Golf Course", web="http://katanningcountryclub.com/", email=null, phone="+61 8 9821 2726;+61 8 9821 1817"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Katherine Golf Club (Australia, 2 courses)

- DB: addr="40 Pearce Street, Katherine", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:214m,city:katherine,db-name-substring,jaccard:1.00], 214m, NT 0851): name="Katherine Golf Club", web="http://katherinecountryclub.com.au", email="proshop@katherinecountryclub.com.au", phone="(08) 8972 1276"
- OSM (high, 135m, sim=1): name="Katherine Golf Club", web="https://www.katherinecountryclub.com.au/", email=null, phone="+61 8 8972 1276"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Keilor Public Golf Course (Australia, 2 courses)

- DB: addr="Calder Highway, Keilor North", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:152m,city:keilor,db-name-substring,jaccard:1.00], 152m, VIC 3036): name="Keilor Public Golf Course", web=null, email="kpgc@brimbank.vic.gov.au", phone="03 9390 1538"
- OSM (high, 39m, sim=1): name="Keilor Public Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Keith Golf Club (Australia, 1 courses)

- DB: addr="Emu Flat Road, Keith", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:204m,city:keith,db-name-substring,jaccard:1.00], 204m, SA 5267): name="Keith Golf Club", web=null, email="keithgolfclub2015@gmail.com", phone="0408308820"
- OSM (high, 51m, sim=1): name="Keith Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kempsey Golf Club (Australia, 1 courses)

- DB: addr="330 Macleay Valley Way, South Kempsey", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2476m,city:kempsey,db-name-substring,jaccard:1.00], 2476m, NSW 2440): name="Kempsey Golf Club", web="https://kempseygolfclub.com.au", email="info@kempseygolfclub.com.au", phone="02 6562 6291"
- OSM (low, 2870m, sim=1): name="Kempsey Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kendenup Country Club (Australia, 1 courses)

- DB: addr="Beverley Road, Kendenup", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:63m,city:kendenup,db-name-substring,jaccard:1.00], 63m, WA 6323): name="Kendenup Country Club", web=null, email=null, phone="(08) 9851 4097"
- OSM (high, 2m, sim=1): name="Kendenup Country Club", web=null, email=null, phone="+61 8 9851 4056;+61 8 9851 4085;+61 8 9851 4243"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Keperra Golf Club (Australia, 6 courses)

- DB: addr="44 Duggan Street, Keperra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:18m,city:keperra,jaccard:0.67], 18m, QLD 4055): name="Keperra Country Golf Club", web="http://www.keperragolf.com.au", email=null, phone="07 3355 7744"
- OSM (low, 583m, sim=1): name="Keperra Golf Course", web="https://www.keperragolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 6 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kerang Golf Club (Australia, 1 courses)

- DB: addr="Koondrook Road, Kerang", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:117m,city:kerang,db-name-substring,jaccard:1.00], 117m, VIC 3579): name="Kerang Golf Club", web=null, email=null, phone="0354521506"
- OSM (high, 153m, sim=1): name="Kerang Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Kew Country Club (Australia, 1 courses)

- DB: addr="185 Kendall Road, Kew", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:776m,db-name-substring,jaccard:1.00], 776m, NSW 2439): name="Kew Country Club", web="http://www.kewcountryclub.com.au", email=null, phone="6559 4203"
- OSM (low, 366m, sim=0.083): name="Camden Haven Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kew Golf Club (Australia, 1 courses)

- DB: addr="120 Belford Road, Kew East", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:625m,city:east,db-name-substring,jaccard:1.00], 625m, VIC 3102): name="Kew Golf Club", web="https://www.kewgolfclub.com.au", email=null, phone="03 9859 6848"
- OSM (high, 63m, sim=1): name="Kew Golf Club", web="https://www.kewgolfclub.com.au/", email="info@kewgolf.com.au", phone="+61 3 9859 2039;+61 3 9859 6848"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 63m, sim=1)
  - phone: from fed(high, sim=1)

### Keysborough Golf Club (Australia, 1 courses)

- DB: addr="55 Hutton Road, Keysborough", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:245m,city:keysborough,db-name-substring,jaccard:1.00], 245m, VIC 3175): name="Keysborough Golf Club", web="https://www.keysboroughgolf.com.au/cms/", email=null, phone="03 9798 1333"
- OSM (high, 5m, sim=1): name="Keysborough Golf Course", web="https://www.keysboroughgolf.com.au/", email="info@keysboroughgolf.com.au", phone="+61 3 9798 2436;+61 3 9798 1333"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 5m, sim=1)
  - phone: from fed(high, sim=1)

### Khancoban Country Club (Australia, 1 courses)

- DB: addr="Mitchell Avenue, Khancoban", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:192m,city:khancoban,db-name-substring,jaccard:1.00], 192m, NSW 2642): name="Khancoban Country Club", web=null, email="sam.patricks@snowyhydro.com.au", phone="0400598729"
- OSM (high, 126m, sim=1): name="Khancoban Country Golf Club", web=null, email=null, phone="+61 2 6076 9468"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kialla Golf Club (Australia, 1 courses)

- DB: addr="360 Central Kialla Road, Kialla", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:177m,db-name-substring,jaccard:1.00], 177m, VIC 3632): name="Kialla Golf Club", web=null, email="hello@kiallagolf.com.au", phone="(03) 5827 1390"
- OSM (high, 136m, sim=1): name="Kialla Golf Club", web="https://kiallagolf.com.au/", email=null, phone="+61 3 5827 1390"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 136m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kiama Golf Club (Australia, 2 courses)

- DB: addr="79-81 Oxley Avenue, Kiama Downs", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:503m,city:kiama,db-name-substring,jaccard:1.00], 503m, NSW 2533): name="Kiama Golf Club", web="https://www.kiamagolfclub.com.au", email="kiamagolfclub@kiamagolfclub.com.au", phone="02 4237 7300"
- OSM (low, 1110m, sim=1): name="Kiama Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kilcoy Golf Club (Australia, 1 courses)

- DB: addr="Carseldine Street, Kilcoy", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1277m,city:kilcoy,db-name-substring,jaccard:1.00], 1277m, QLD 4515): name="Kilcoy Golf Club", web="https://kilcoygolf.com.au", email=null, phone="(07) 5405 5705"
- OSM (low, 1294m, sim=1): name="Kilcoy Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Killarney Golf Club (Australia, 1 courses)

- DB: addr="Willow St, Killarney", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:691m,city:killarney,db-name-substring,jaccard:1.00], 691m, QLD 4373): name="Killarney Golf Club", web=null, email=null, phone="07 4664 1332"
- OSM (high, 72m, sim=1): name="Killarney Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Kilmore Golf Club (Australia, 1 courses)

- DB: addr="Anderson Road, Kilmore", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:60m,city:kilmore,db-name-substring,jaccard:1.00], 60m, VIC 3764): name="Kilmore Golf Club", web="https://kilmoregolfclub.com.au/", email="info@kilmoregolfclub.com.au", phone="03 5782 1123"
- OSM (high, 8m, sim=1): name="Kilmore Golf Club", web="https://www.kilmoregolfclub.com.au/", email=null, phone="+61 3 5782 1123"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kimba Golf Club (Australia, 2 courses)

- DB: addr="Buckleboo Road, Kimba", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:77m,city:kimba,db-name-substring,jaccard:1.00], 77m, SA 5641): name="Kimba Golf Club", web=null, email=null, phone="(08) 8627 2139"
- OSM (high, 197m, sim=1): name="Kimba Golf Course", web=null, email=null, phone="+61 8 8627 2235"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### King Island Golf Club (Australia, 1 courses)

- DB: addr="Owen Smith Drive, Currie", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:1m,city:currie,db-name-substring,jaccard:1.00], 1m, TAS 7256): name="King Island Golf Club", web="https://golfkingisland.com/", email=null, phone="0428 170 148"
- OSM (low, 245m, sim=0.579): name="King Island Golf & Bowling Club", web="https://golfkingisland.com/", email="kingislandgolfbowling@gmail.com", phone="+61 3 6462 1126"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kingaroy Golf Club (Australia, 1 courses)

- DB: addr="Kumbia Road, Kingaroy", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:425m,city:kingaroy,db-name-substring,jaccard:1.00], 425m, QLD 4610): name="Kingaroy Golf Club", web=null, email="kingaroygolfclub@bigpond.com", phone="4162 1720"
- OSM (high, 22m, sim=1): name="Kingaroy Golf Club", web="https://kingaroygolfclub.com.au/", email=null, phone="+61 7 4162 1720"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 22m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kingscote Golf Club (Australia, 1 courses)

- DB: addr="Burden Drive, Kingscote", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:466m,city:kingscote,db-name-substring,jaccard:1.00], 466m, SA 5223): name="Kingscote Golf Club", web=null, email=null, phone="08 8553 2520"
- OSM (high, 14m, sim=1): name="Kingscote Golf", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Kingston Beach Golf Club (Australia, 2 courses)

- DB: addr="1 Channel HighwayKingston, Kingston", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:62m,city:kingston,db-name-substring,jaccard:1.00], 62m, TAS 7050): name="Kingston Beach Golf Club", web="https://kbgc.com.au", email="info@kbgc.com.au", phone="03 6229 8300"
- OSM (high, 40m, sim=1): name="Kingston Beach Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kingston Heath Golf Club (Australia, 2 courses)

- DB: addr="Kingston Rd, Cheltenham VIC 3192, Australia, Cheltenham", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:415m,city:cheltenham,db-name-substring,jaccard:1.00], 415m, VIC 3189): name="Kingston Heath Golf Club", web="http://www.kingstonheath.com.au", email="info@kingstonheath.melbourne", phone="03 8558 2700"
- OSM (high, 87m, sim=1): name="Kingston Heath Golf Club", web="www.kingstonheath.com.au", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kingston Links (Australia, 1 courses)

- DB: addr="Corporate Avenue, Rowville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[city:rowville,db-name-substring,jaccard:0.67], 3584m, VIC 3178): name="Kingston Links Golf Links", web=null, email=null, phone="(03) 9764 4520"
- OSM (low, 706m, sim=0.063): name="Waterford Valley Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Kingston SE Golf Club (Australia, 1 courses)

- DB: addr="Corner of Golf Links and Robe Road, Kingston", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:572m,city:kingston,db-name-substring,jaccard:1.00], 572m, SA 5275): name="Kingston SE Golf Club", web="http://kingstonsegolf@bigpond.com", email=null, phone="(08) 87687267"
- OSM (high, 249m, sim=0.727): name="Kingston Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kingswood Golf Club (Australia, 1 courses)

- DB: addr="Dandenong Road, Dingley", web=null, email=null, phone=null
- golf.com.au (high, sim=0.474, boost=+0.7[coord:394m,db-name-substring,jaccard:0.67], 394m, VIC 3199): name="Peninsula-Kingswood Golf Club", web=null, email="proshop@peninsualkingswood.com.au", phone="03 9789 2222"
- OSM (low, 9m, sim=0.474): name="Peninsula Kingswood Country Golf Club", web="https://www.peninsulakingswood.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.474)
  - phone: from fed(high, sim=0.474)

### Kojonup Golf Club (Australia, 1 courses)

- DB: addr="Blackwood Road, Kojonup", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:294m,city:kojonup,db-name-substring,jaccard:1.00], 294m, WA 6395): name="Kojonup Golf Club", web=null, email=null, phone="(08) 98311283"
- OSM (high, 143m, sim=1): name="Kojonup Golf Club", web="http://kojonupgolfclub.com.au/", email=null, phone="+61 8 9831 1329"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 143m, sim=1)
  - phone: from fed(high, sim=1)

### Kooindah Waters Golf Club (Australia, 1 courses)

- DB: addr="40 Kooindah Blvd, Wyong", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:302m,city:wyong,db-name-substring,jaccard:1.00], 302m, NSW 2259): name="Kooindah Waters Golf Club", web="http://www.kooindahwatersgolf.com.au", email="info@kwgc.com.au", phone="02 4351 0700"
- OSM (medium, 270m, sim=1): name="Kooindah Waters Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kooralbyn Valley Golf Course (Australia, 1 courses)

- DB: addr="1 Routely Drive, Kooralbyn", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:132m,city:kooralbyn,db-name-substring,jaccard:1.00], 132m, QLD 4285): name="Kooralbyn Valley Golf Course", web=null, email="golf@thekooralbynvalley.com.au", phone=null
- OSM (high, 108m, sim=1): name="Kooralbyn Valley Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)

### Koorda Golf Club (Australia, 1 courses)

- DB: addr="Greenham Street, Koorda", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:317m,city:koorda,db-name-substring,jaccard:1.00], 317m, WA 6475): name="Koorda Golf Club", web=null, email="linzinkoorda@gmail.com", phone="(08) 9684 1204"
- OSM (high, 96m, sim=1): name="Koorda Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kooringal Golf Club (Australia, 2 courses)

- DB: addr="Wilga Avenue, Altona", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:589m,city:altona,db-name-substring,jaccard:1.00], 589m, VIC 3018): name="Kooringal Golf Club", web="http://www.kooringalgolf.com.au", email=null, phone="03 9315 0855"
- OSM (high, 77m, sim=1): name="Kooringal Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kooyonga Golf Club (Australia, 2 courses)

- DB: addr="May Terrace, Lockleys", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:339m,city:lockleys,db-name-substring,jaccard:1.00], 339m, SA 5032): name="Kooyonga Golf Club", web="http://www.kooyongagolf.com.au", email="administrator@kooyongagolf.com.au", phone="(08) 8352 5444"
- OSM (high, 35m, sim=1): name="Kooyonga Golf Club", web="https://www.kooyongagolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Korbelka Golf Club (Australia, 1 courses)

- DB: addr="Belka-Korbell Road, Bruce Rock", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[db-name-substring,jaccard:1.00], 3238m, WA 6415): name="Korbelka Golf Club", web=null, email=null, phone="(08) 9046 9045"
- OSM (no-match, 3072739m, sim=0.625): name="Kareela Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Korong Vale Golf Club (Australia, 1 courses)

- DB: addr="Korong Vale - Kinypanial Road, Korong Vale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:250m,city:korong,db-name-substring,jaccard:1.00], 250m, VIC 3520): name="Korong Vale Golf Club", web=null, email=null, phone="0354947401"
- OSM (high, 121m, sim=1): name="Korong Vale Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Korumburra Golf Club (Australia, 1 courses)

- DB: addr="65 Warragul Road, Korumburra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:463m,city:korumburra,db-name-substring,jaccard:1.00], 463m, VIC 3950): name="Korumburra Golf Club", web="http://korumburragolf.com.au", email="korumburragolf@outlook.com", phone="(03) 5659 8115"
- OSM (high, 75m, sim=1): name="Korumburra Golf Course", web="https://korumburragolf.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kulin Golf Club (Australia, 1 courses)

- DB: addr="Williams-Kandinin Road, Kulin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2147m,city:kulin,db-name-substring,jaccard:1.00], 2147m, WA 6365): name="Kulin Golf Club", web=null, email=null, phone="0427801240"
- OSM (no-match, 112532m, sim=0.571): name="Kukerin Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Kurri Kurri Golf Club (Australia, 1 courses)

- DB: addr="Clift StreetHeddon, Greta", web=null, email=null, phone=null
- golf.com.au (high, sim=0.455, boost=+0.85[coord:281m,city:greta,jaccard:1.00], 281m, NSW 2327): name="Kurri Golf Club", web="https://www.kurrigolfclub.com.au", email=null, phone="02 4937 1224"
- OSM (low, 224m, sim=0.455): name="Kurri Golf Club", web="https://www.kurrigolfclub.com.au", email="admin@kurrigolfclub.com.au", phone="+61 2 4937 1091;+61 2 4937 1224"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.455)
  - phone: from fed(high, sim=0.455)

### Kwinana Golf Club (Australia, 1 courses)

- DB: addr="PO Box 3, Kiwnana", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:590m,db-name-substring,jaccard:1.00], 590m, WA 6966): name="Kwinana Golf Club", web=null, email=null, phone="08 9419 2888"
- OSM (high, 55m, sim=1): name="Kwinana Golf Club", web="https://www.kwinanagolfclub.com.au/", email=null, phone="+61 8 9419 4959;+61 8 9419 2888"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 55m, sim=1)
  - phone: from fed(high, sim=1)

### Kyabram Parkland Golf Club (Australia, 2 courses)

- DB: addr="P.O. Box 374 Kyabram, Kyabram", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:311m,city:kyabram,db-name-substring,jaccard:1.00], 311m, VIC 3620): name="Kyabram Parkland Golf Club", web=null, email=null, phone="03 58523146"
- OSM (high, 101m, sim=1): name="Kyabram Parkland Golf Course", web="https://kyabramparkland.com.au/", email=null, phone="+61 3 5852 3146"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 101m, sim=1)
  - phone: from fed(high, sim=1)

### Kyabram Valley View Golf & Country Club (Australia, 1 courses)

- DB: addr="Curr Road, Mount Scobie Kyabram", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.64[coord:1449m,city:kyabram,jaccard:0.80], 1449m, VIC 3620): name="Kyabram Valley View Golf Club", web="https://www.kyabramvalleyview.com.au", email="office@kyabramvalleyview.com.au", phone="03 5852 1490"
- OSM (low, 1252m, sim=0.76): name="Kyabram Valley View Golf and Bowls Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kyancutta Golf Club (Australia, 1 courses)

- DB: addr="Mullan Road, Kyancutta", web=null, email=null, phone=null
- golf.com.au (high, sim=0.5, boost=+0.6[coord:1933m,city:kyancutta,jaccard:0.67], 1933m, SA 5651): name="Kyancutta Ramblers Golf Club", web=null, email="ramblersgolfclub@outlook.com", phone="0886818088"
- OSM (no-match, 1114918m, sim=0.455): name="Tallangatta Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Kyneton Golf Club (Australia, 1 courses)

- DB: addr="61 Blackhill Rd, Kyneton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:342m,city:kyneton,db-name-substring,jaccard:1.00], 342m, VIC 3444): name="Kyneton Golf Club", web=null, email="info@kynetongolfclub.com.au", phone="03 5422 1151"
- OSM (high, 5m, sim=1): name="Kyneton Golf Club", web="https://kynetongolfclub.com.au/", email=null, phone="+61 3 5422 1151"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 5m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Laidley Golf Club (Australia, 1 courses)

- DB: addr="Forest Hill Road, Laidley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:343m,city:laidley,db-name-substring,jaccard:1.00], 343m, QLD 4341): name="Laidley Golf Club", web="http://www.laidley-golfclub.com", email=null, phone="(07) 5465 1518"
- OSM (high, 64m, sim=1): name="Laidley Golf Club", web="https://www.laidley-golfclub.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lake Albert Golf Club (Australia, 1 courses)

- DB: addr="Princes Highway, Meningie", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:95m,city:meningie,db-name-substring,jaccard:1.00], 95m, SA 5264): name="Lake Albert Golf Club", web="http://www.lakealbertgolfclub.com.au", email="lakealbertgolfclubsecretary@gmail.com", phone=null
- OSM (high, 48m, sim=1): name="Lake Albert Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)

### Lake Bolac Golf Club (Australia, 2 courses)

- DB: addr="Mortlake Road, Lake Bolac", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:203m,city:lake,db-name-substring,jaccard:1.00], 203m, VIC 3351): name="Lake Bolac Golf Club", web=null, email="lakebolacgolfclub7@gmail.com", phone="03 5350 2314"
- OSM (high, 80m, sim=1): name="Lake Bolac Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lake Claremont Golf Course (Australia, 1 courses)

- DB: addr="Lapsley Road, Claremont", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:93m,city:claremont,db-name-substring,jaccard:1.00], 93m, WA 6010): name="Lake Claremont Golf Course", web=null, email=null, phone="08 9384 2887"
- OSM (low, 38m, sim=0.643): name="Claremont Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Lake Grace Golf Club (Australia, 1 courses)

- DB: addr="6823 Dumbleyung-Lake Grace Road, Lake Grace", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:426m,city:lake,db-name-substring,jaccard:1.00], 426m, WA 6353): name="Lake Grace Golf Club", web=null, email="lakegracegolfclub@outlook.com", phone="(08) 9865 1108"
- OSM (high, 87m, sim=1): name="Lake Grace Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lake Karrinyup Country Club (Australia, 3 courses)

- DB: addr="North Beach Road, Perth", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:402m,db-name-substring,jaccard:1.00], 402m, WA 6018): name="Lake Karrinyup Country Club", web=null, email=null, phone="(08) 9422 8222"
- OSM (high, 142m, sim=1): name="Lake Karrinyup Country Club", web="https://www.lkcc.com.au/", email=null, phone="+61 8 9422 8222"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from osm(high, 142m, sim=1)
  - phone: from fed(high, sim=1)

### Lake King Golf Club (Australia, 1 courses)

- DB: addr="Varley Road, Lake King", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:369m,city:lake,db-name-substring,jaccard:1.00], 369m, WA 6356): name="Lake King Golf Club", web=null, email=null, phone="0428 105059"
- OSM (medium, 320m, sim=1): name="Lake King Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Lake Kununurra Golf Club (Australia, 2 courses)

- DB: addr="Lake View Drive, Kununurra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:35m,city:kununurra,db-name-substring,jaccard:1.00], 35m, WA 6743): name="Lake Kununurra Golf Club", web=null, email="admin@lkgc.org", phone="08 9169 1055"
- OSM (low, 545m, sim=1): name="Lake Kununurra Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lake View Golf Club (Australia, 1 courses)

- DB: addr="Dumbleyung-Katanning Road, Dumbleyung", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:467m,city:dumbleyung,db-name-substring,jaccard:1.00], 467m, WA 6350): name="Lake View Golf Club", web=null, email=null, phone="0433 120 948"
- OSM (low, 536m, sim=0): name="Dumbleyung Golf Club", web=null, email=null, phone="+61 8 9863 4174"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Lake Yealering Golf Club (Australia, 1 courses)

- DB: addr="Sewell Street, Yealering", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1010m,city:yealering,db-name-substring,jaccard:1.00], 1010m, WA 6372): name="Lake Yealering Golf Club", web=null, email=null, phone="0429887067"
- OSM (low, 943m, sim=0.643): name="Yealering Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Lakelands Country Club (Australia, 1 courses)

- DB: addr="44 Clubhouse Lane, Gnangara", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:23m,city:gnangara,db-name-substring,jaccard:1.00], 23m, WA 6947): name="Lakelands Country Club", web=null, email=null, phone="08 9405 4888"
- OSM (high, 13m, sim=1): name="Lakelands Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Lakelands Golf Club (Australia, 1 courses)

- DB: addr="100 Lakelands Drive, Merrimac", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2257m,city:merrimac,db-name-substring,jaccard:1.00], 2257m, QLD 4226): name="Lakelands Golf Club", web=null, email=null, phone="07 5579 8700"
- OSM (high, 55m, sim=1): name="Lakelands Golf Course", web="https://www.lakelandsgolfclub.com.au/", email=null, phone="+61 7 5579 8700"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 55m, sim=1)
  - phone: from fed(high, sim=1)

### Lakes Entrance Golf Club (Australia, 1 courses)

- DB: addr="Golf Links Road, Lakes Entrance", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:lakes,db-name-substring,jaccard:1.00], 4695m, VIC 3909): name="Lakes Entrance Golf Club", web="http://www.lakesentrancegolf.com.au", email="info@legc.net", phone="03 5155 1431"
- OSM (low, 4892m, sim=1): name="Lakes Entrance Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lakeside Country Club (Australia, 2 courses)

- DB: addr="433 Brisbane Road, Coombabah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:108m,db-name-substring,jaccard:1.00], 108m, QLD 4216): name="Lakeside Country Club", web=null, email=null, phone=null
- OSM (high, 9m, sim=1): name="Lakeside Country Club", web=null, email=null, phone=null

### Lakeside Golf Club Camden (Australia, 2 courses)

- DB: addr="188 Ballandean Boulevard, Gledswood Hills", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.65[coord:1261m,db-name-substring,jaccard:1.00], 1261m, NSW 2560): name="Lakeside Golf Club Camden", web="http://www.camdenlakeside.com.au", email=null, phone="02 46345840"
- OSM (medium, 314m, sim=1): name="Lakeside Golf Club Camden", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lakeside Lake Boga Golf Club (Australia, 1 courses)

- DB: addr="Lalbert Road, Lake Boga", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:432m,city:lake,jaccard:1.00], 432m, VIC 3584): name="Lakeside Golf Club Lake Boga", web=null, email=null, phone="03 5037 2728"
- OSM (medium, 441m, sim=1): name="Lakeside Lake Boga Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Lameroo Golf Club (Australia, 1 courses)

- DB: addr="Chandos Terrace, Lameroo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:85m,city:lameroo,db-name-substring,jaccard:1.00], 85m, SA 5302): name="Lameroo Golf Club", web=null, email="lameroogc@gmail.com", phone="0407874777"
- OSM (high, 0m, sim=1): name="Lameroo Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lancefield Golf Club (Australia, 1 courses)

- DB: addr="34 Heddle Road, Lancefield", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:304m,city:lancefield,db-name-substring,jaccard:1.00], 304m, VIC 3435): name="Lancefield Golf Club", web=null, email="admin@lancefieldgolfclub.com.au", phone="0466918757"
- OSM (high, 130m, sim=1): name="Lancefield Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lancelin Golf Club (Australia, 1 courses)

- DB: addr="Lancelin Road, Lancelin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:395m,city:lancelin,db-name-substring,jaccard:1.00], 395m, WA 6044): name="Lancelin Golf Club", web="https://www.lancelingc.au/", email=null, phone="+61 412 928 403"
- OSM (high, 6m, sim=1): name="Lancelin Golf Club", web="https://lancelingolfclub.weebly.com/", email=null, phone="+61 8 9655 2156"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lane Cove Country Club (Australia, 2 courses)

- DB: addr="River Road, Northwood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[coord:212m,jaccard:0.50], 212m, NSW ): name="Lane Cove Golf Club", web="https://www.lanecovegolfclub.com.au", email="info@lanecovegolfclub.com.au", phone="02 9427 6631"
- OSM (high, 155m, sim=1): name="Lane Cove Country Club", web="http://www.lanecovegolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lang Lang Golf Club (Australia, 1 courses)

- DB: addr="90 Golf Club Road, Lang Lang", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:227m,city:lang,db-name-substring,jaccard:1.00], 227m, VIC 3984): name="Lang Lang Golf Club", web="http://www.langlanggolfclub.com.au", email="gm@langlanggolfclub.com.au", phone="(03) 5659 6284"
- OSM (high, 37m, sim=1): name="Lang Lang Golf Club", web="https://www.langlanggolfclub.com.au/", email=null, phone="+61 3 5659 6284"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Latham Golf Club (Australia, 1 courses)

- DB: addr="Summers Road, Latham", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:323m,city:latham,db-name-substring,jaccard:1.00], 323m, WA 6616): name="Latham Golf Club", web=null, email="lathamgolfclub@gmail.com", phone="0429374371"
- OSM (high, 237m, sim=1): name="Latham Golf Club", web=null, email=null, phone="+61 8 9973 6096"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Latrobe Golf Club (Australia, 2 courses)

- DB: addr="Farm Road, Alphington", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:308m,city:alphington,db-name-substring,jaccard:1.00], 308m, VIC 3078): name="Latrobe Golf Club", web="http://www.latrobegolf.com.au", email="golfshop@latrobegolf.com.au", phone="03 9497 1622"
- OSM (high, 118m, sim=1): name="Latrobe Golf Club", web="https://www.latrobegolf.com.au/", email=null, phone="+61 3 9497 1000"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Launceston Golf Club (Australia, 2 courses)

- DB: addr="Opossum Road, Kings Meadows", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:534m,city:kings,db-name-substring,jaccard:1.00], 534m, TAS 7249): name="Launceston Golf Club", web="https://www.launcestongolfclub.com.au/cms/", email=null, phone="03 6344 1154"
- OSM (high, 33m, sim=1): name="Launceston Golf Course", web="https://www.launcestongolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Laura Golf Club (Australia, 1 courses)

- DB: addr="Riverside, Laura", web=null, email=null, phone=null
- golf.com.au (high, sim=0.333, boost=+0.95[coord:299m,city:laura,name-token:riverside,jaccard:0.67], 299m, SA 5480): name="Laura Riverside Golf Club", web=null, email=null, phone="08 8663 2387"
- OSM (medium, 500m, sim=1): name="Laura Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.333)

### Leeton Golf Club (Australia, 1 courses)

- DB: addr="Cnr Yanco and Acacia Ave, Leeton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1367m,city:leeton,db-name-substring,jaccard:1.00], 1367m, NSW 2705): name="Leeton Golf Club", web="http://www.leetongolf.com.au", email="jason@leetongolf.com.au", phone="0427594667"
- OSM (low, 759m, sim=1): name="Leeton Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Leigh Creek Golf Club (Australia, 1 courses)

- DB: addr="Bluebush Road, Leigh Creek", web=null, email=null, phone=null
- golf.com.au (high, sim=0.44, boost=+0.55[coord:1167m,db-name-substring,jaccard:0.67], 1167m, SA ): name="Leigh Creek Golf Club Not operating", web=null, email=null, phone="."
- OSM (no-match, 1168266m, sim=0.583): name="Werris Creek Golf Course", web=null, email=null, phone="+61 2 6768 7165"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.44)

### Leinster Golf Club (Australia, 1 courses)

- DB: addr="Mainsbridge Road, Leinster", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:386m,city:leinster,db-name-substring,jaccard:1.00], 386m, WA 6437): name="Leinster Golf Club", web=null, email=null, phone="0438914544"
- OSM (high, 85m, sim=1): name="Leinster Golf Club", web=null, email=null, phone="+61 8 9037 3000;+61 8 9037 9481"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Leonay Golf Club (Australia, 1 courses)

- DB: addr="PO Box 69, Emu Plains", web=null, email=null, phone=null
- golf.com.au (high, sim=0.353, boost=+0.85[coord:42m,db-name-substring,jaccard:0.67], 42m, NSW 2750): name="Emu Sports Club (Leonay Golf Club)", web="http://www.emusportsclub.com.au", email=null, phone="02 4735 5300"
- OSM (medium, 402m, sim=1): name="Leonay Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.353)
  - phone: from fed(high, sim=0.353)

### Leongatha Golf Club (Australia, 1 courses)

- DB: addr="855 Koonwarra-Inverloch Road, Leongatha South", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:347m,city:leongatha,db-name-substring,jaccard:1.00], 347m, VIC 3953): name="Leongatha Golf Club", web="http://www.leongathagolf.com.au", email="info@leongathagolf.com.au", phone="(03) 5664 3314"
- OSM (medium, 287m, sim=1): name="Leongatha Golf Club", web="http://www.leongathagolf.com.au", email=null, phone="+61 3 5664 3314"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Leonoroa Golf Club (Australia, 1 courses)

- DB: addr="Rajah Street, Leonora", web=null, email=null, phone=null
- golf.com.au (high, sim=0.875, boost=+1.1[coord:1978m,city:leonora,name-token:leonora,jaccard:1.00,typo:leonoroa~leonora], 1978m, WA 6438): name="Leonora Golf Club", web=null, email=null, phone="0429 376 044"
- OSM (no-match, 2499033m, sim=0.556): name="Leongatha Golf Club", web="http://www.leongathagolf.com.au", email=null, phone="+61 3 5664 3314"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.875)

### Leura Golf Club (Australia, 1 courses)

- DB: addr="1 Sublime Point Road, Leura", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:577m,city:leura,db-name-substring,jaccard:1.00], 577m, NSW 2780): name="Leura Golf Club", web="https://www.leuragolfclub.com.au/", email=null, phone="02 4710 9784"
- OSM (high, 249m, sim=1): name="Leura Golf Course", web="https://www.leuragolfclub.com.au/", email="admin@leuragolfclub.com.au", phone="+61 2 4782 5011;+61 2 4784 1503"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 249m, sim=1)
  - phone: from fed(high, sim=1)

### Lexton Golf Club (Australia, 1 courses)

- DB: addr="Talbot Road, Lexton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:186m,city:lexton,db-name-substring,jaccard:1.00], 186m, VIC 3352): name="Lexton Golf Club", web=null, email="lextongolfclub@gmail.com", phone="0354667267"
- OSM (high, 72m, sim=1): name="Lexton Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Links Hope Island Golf (Australia, 3 courses)

- DB: addr="Hope Island Road, Hope Island", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:3m,city:hope,db-name-substring,jaccard:1.00], 3m, QLD 4212): name="Links Hope Island Golf Club", web="https://www.linkshopeisland.com.au/cms/", email="golfshop@linkshopeisland.com.au", phone="(07) 5530 9000"
- OSM (high, 240m, sim=1): name="Links Hope Island", web="https://www.linkshopeisland.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Links Kennedy Bay Golf Club (Australia, 1 courses)

- DB: addr="Lot 199 Port Kennedy Drive, Port Kennedy", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:746m,city:port,jaccard:0.67], 746m, WA 6169): name="Links Kennedy Bay", web="https://linkskennedybay.com.au", email="golf@linkskennedybay.com.au", phone="08 9524 5991"
- OSM (medium, 387m, sim=1): name="The Links Kennedy Bay", web="https://www.kennedybay.com.au/", email="admin@kennedybay.com.au", phone="+61 8 9524 5991"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Links Lady Bay (Australia, 2 courses)

- DB: addr="6 Huntingdale Drive, Normanville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.15[coord:80m,city:normanville,db-name-substring,jaccard:0.67], 80m, SA 5204): name="Links Lady Bay Golf Club", web="http://www.linksladybay.com", email="golf@linksladybay.com.au", phone="(08) 8558 0600"
- OSM (no-match, 240573m, sim=0.556): name="Louth Bay Golf Course", web=null, email=null, phone="+61 8 8684 6015"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lismore Workers Golf Club (Australia, 1 courses)

- DB: addr="1 Barham St, Lismore", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:449m,city:lismore,db-name-substring,jaccard:1.00], 449m, NSW 2480): name="Lismore Workers Golf Club", web=null, email="info@lismoreworkers.com.au", phone="02 6621 2255"
- OSM (high, 23m, sim=1): name="Lismore Workers Golf Club", web="https://lismoreworkers.com.au/lismore-workers-golf-club/", email="lisgolf@lismoreworkers.com.au", phone="+61 2 6621 2255"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 23m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lithgow (Australia, 1 courses)

- DB: addr="1 Golf Links Rd, Marrangaroo NSW 2790, LITHGOW ", web=null, email=null, phone=null
- golf.com.au (high, sim=0.636, boost=+0.95[city:marrangaroo,plz:2790,db-name-substring,jaccard:0.50], 4657m, NSW 2790): name="Lithgow Golf Club Ltd", web=null, email=null, phone="0263513164"
- OSM (low, 4996m, sim=1): name="Lithgow Golf Club", web="https://www.lithgowgolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.636)

### Lithgow Golf Club (Australia, 1 courses)

- DB: addr="Great Western Highway, Lithgow", web=null, email=null, phone=null
- golf.com.au (high, sim=0.636, boost=+0.8[coord:483m,db-name-substring,jaccard:1.00], 483m, NSW 2790): name="Lithgow Golf Club Ltd", web=null, email=null, phone="0263513164"
- OSM (high, 136m, sim=1): name="Lithgow Golf Club", web="https://www.lithgowgolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 136m, sim=1)
  - phone: from fed(high, sim=0.636)

### Little Para Golf Course Par 3 (Australia, 1 courses)

- DB: addr="Martins Road , Salisbury North", web=null, email=null, phone=null
- golf.com.au (high, sim=0.647, boost=+0.55[coord:799m,jaccard:1.00], 799m, SA 5108): name="Little Para Golf Course", web="https://littleparagolf.com.au/", email=null, phone="08 8285 9177"
- OSM (low, 624m, sim=0.647): name="Little Para Golf Course", web="https://littleparagolf.com.au/", email=null, phone="+61 8 8285 9177"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.647)
  - phone: from fed(high, sim=0.647)

### Liverpool Golf Club (Australia, 1 courses)

- DB: addr="Hollywood Drive, Lansvale", web=null, email=null, phone=null
- golf.com.au (low, sim=0.111, boost=+0.7[coord:382m,city:lansvale,jaccard:0.50], 382m, NSW 2166): name="Oak Point Golf Club", web="https://liverpoolgolf.com.au", email=null, phone="02 9728 7777"
- OSM (high, 9m, sim=1): name="Liverpool Golf Club", web="https://liverpoolgolf.com.au/", email=null, phone="+61 2 9728 7777"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 9m, sim=1)
  - phone: from osm(high, 9m, sim=1)

### Llanherne Golf Club (Australia, 1 courses)

- DB: addr="132 Surf Rd, Seven Mile Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:8m,city:seven,db-name-substring,jaccard:1.00], 8m, TAS 7018): name="Llanherne Golf Club", web="https://www.llanhernegolfclub.org.au/", email="llanhernegolfclub@bigpond.com", phone="03 6248 7711"
- OSM (medium, 314m, sim=1): name="Llanherne Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Loch Sport Golf Club (Australia, 2 courses)

- DB: addr="Spermwhale Head Road, Loch Sport", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:524m,city:loch,db-name-substring,jaccard:1.00], 524m, VIC 3851): name="Loch Sport Golf Club", web="http://lochsportgolfclub.com.au", email="admin@lochsportgolfclub.com", phone="0419 008 730"
- OSM (high, 137m, sim=1): name="Loch Sport Golf Club", web=null, email=null, phone="+61 3 5146 0890"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lock Golf Club (Australia, 1 courses)

- DB: addr="Lock", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:659m,city:lock,db-name-substring,jaccard:1.00], 659m, SA 5633): name="Lock Golf Club", web=null, email="heathandrew14@gmail.com", phone="0427 976 258"
- OSM (low, 890m, sim=1): name="Lock Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lockhart Golf Club (Australia, 1 courses)

- DB: addr="John Grant Drive, Lockhart", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:483m,city:lockhart,db-name-substring,jaccard:1.00], 483m, NSW 2656): name="Lockhart Golf Club", web=null, email=null, phone="0429857085"
- OSM (high, 239m, sim=1): name="Lockhart Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Lockington Golf Club (Australia, 1 courses)

- DB: addr="2067 Middleton Road, Lockington", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:lockington,db-name-substring,jaccard:1.00], 4017m, VIC 3563): name="Lockington Golf Club", web=null, email=null, phone="0428 862 292"
- OSM (low, 3732m, sim=1): name="Lockington Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Long Reef Golf Club (Australia, 1 courses)

- DB: addr="Anzac Avenue, Collaroy", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:82m,city:collaroy,db-name-substring,jaccard:1.00], 82m, NSW 2097): name="Long Reef Golf Club", web="http://www.lrgc.com.au", email=null, phone="02 9971 8113"
- OSM (medium, 351m, sim=1): name="Long Reef Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Longford Golf Club (Australia, 1 courses)

- DB: addr="16 Chatsworth Lane, Longford", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:30m,city:longford,db-name-substring,jaccard:1.00], 30m, TAS 7301): name="Longford Golf Club", web="http://longfordgolf.com.au", email=null, phone="03 6391 1938"
- OSM (medium, 363m, sim=1): name="Longford Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Longyard Golf Course (Australia, 1 courses)

- DB: addr="Longyard Drive, Hillvue", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.45[coord:631m,jaccard:0.67], 631m, NSW 2340): name="Longyard Golf Club", web="http://O", email=null, phone="02 6765 2988"
- OSM (high, 38m, sim=1): name="Longyard Golf Course", web="https://longyardgolf.com.au", email=null, phone="+61 2 6765 2988"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lonsdale Golf Club (Australia, 2 courses)

- DB: addr="69 Fellows Road,, Point Lonsdale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[coord:496m,city:point], 496m, VIC 3225): name="Lonsdale Links", web="http://www.lonsdalegc.com.au", email="admin@lonsdalelinks.com.au", phone="03 52581955"
- OSM (high, 28m, sim=1): name="Lonsdale Links Golf Club", web="https://www.lonsdalegc.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lonsdale Links (Australia, 1 courses)

- DB: addr="1 Clubhouse Drive, Point Lonsdale, VIC 3225, Point Lonsdale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.5[coord:9m,city:point,plz:3225,db-name-substring,jaccard:1.00], 9m, VIC 3225): name="Lonsdale Links", web="http://www.lonsdalegc.com.au", email="admin@lonsdalelinks.com.au", phone="03 52581955"
- OSM (low, 527m, sim=1): name="Lonsdale Links Golf Club", web="https://www.lonsdalegc.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lorne Golf Club (Australia, 1 courses)

- DB: addr="Holliday Road, Lorne", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:99m,city:lorne], 99m, VIC 3232): name="Lorne Country Club", web="http://www.lornecountryclub.com.au", email=null, phone="0352891267"
- OSM (high, 39m, sim=1): name="Lorne Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lowood & District Golf Club (Australia, 1 courses)

- DB: addr="Main Street, Lowood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1[coord:41m,city:lowood,jaccard:1.00], 41m, QLD 4311): name="Lowood and District Golf Club", web="http://www.lowoodgolfclub.com.au", email=null, phone="(07) 5426 1365"
- OSM (high, 136m, sim=1): name="Lowood & District Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Loxton Golf Club (Australia, 2 courses)

- DB: addr="Edwards Road, Loxton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:213m,city:loxton,db-name-substring,jaccard:1.00], 213m, SA 5333): name="Loxton Golf Club", web="http://www.loxtongolf.com.au", email="email@loxtongolf.com.au", phone="(08) 8584 1490"
- OSM (high, 2m, sim=1): name="Loxton Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lucindale Golf Club (Australia, 1 courses)

- DB: addr="Woolumbool Road, Lucindale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:250m,city:lucindale], 250m, SA 5272): name="Lucindale Country Club", web=null, email=null, phone="0438824861"
- OSM (high, 2m, sim=1): name="Lucindale Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Lynwood Country Club (Australia, 2 courses)

- DB: addr="4 Pitt Town Bottoms Road, Pitt Town", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:368m,city:pitt,db-name-substring,jaccard:1.00], 368m, NSW 2756): name="Lynwood Country Club", web="https://www.lynwood.com.au/", email=null, phone="02 8858 4800"
- OSM (low, 518m, sim=1): name="Lynwood Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Macarthur Golf Club (Australia, 1 courses)

- DB: addr="Hamilton Road, Macarthur", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:222m,city:macarthur,db-name-substring,jaccard:1.00], 222m, VIC 3286): name="MacArthur Golf Club", web=null, email="macarthurgolfclub@gmail.com", phone="0407516647"
- OSM (high, 81m, sim=1): name="Macarthur Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Macarthur Grange Country Club (Australia, 2 courses)

- DB: addr="Raby Rd, Kearns", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:684m,db-name-substring,jaccard:1.00], 684m, NSW 2567): name="Macarthur Grange Country Club", web="http://www.macarthurgrange.com.au", email="hello@macarthurgrange.com.au", phone="(02)9820 4446"
- OSM (high, 157m, sim=1): name="Macarthur Grange Country Club", web="https://macarthurgrange.com.au/", email=null, phone="+61 2 9820 4446;+61 2 9820 4599"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mackay Golf Club (Australia, 1 courses)

- DB: addr="Bucasia Road, Mackay Mt Pleasent", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[db-name-substring,jaccard:1.00], 3333m, QLD 4740): name="Mackay Golf Club", web="https://www.mackaygolf.com.au", email="reception@mackaygolf.com.au", phone="07 4942 1521"
- OSM (low, 2870m, sim=1): name="Mackay Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Macksville Country Club (Australia, 1 courses)

- DB: addr="Wallace Street, Macksville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:607m,city:macksville,db-name-substring,jaccard:1.00], 607m, NSW 2447): name="Macksville Country Club", web="https://macksvillecountryclub.com.au/", email=null, phone="02 6568 1400"
- OSM (high, 131m, sim=1): name="Macksville Country Club", web="https://www.macksvillecountryclub.com.au/", email="office@macksvillecountryclub.com.au", phone="+61 2 6568 1400"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 131m, sim=1)
  - phone: from fed(high, sim=1)

### Maclean Golf Club (Australia, 1 courses)

- DB: addr="Golf Links Road, Maclean", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:719m,db-name-substring,jaccard:1.00], 719m, NSW 2463): name="Maclean Golf Club", web=null, email=null, phone="02 6645 2183"
- OSM (high, 84m, sim=1): name="Maclean Golf Club", web="https://www.macleangolfclub.com.au", email="mail@macleangolfclub.com.au", phone="+61 2 6645 2183"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 84m, sim=1)
  - email: from osm(high, 84m, sim=1)
  - phone: from fed(high, sim=1)

### Maffra Golf Club (Australia, 1 courses)

- DB: addr="Fulton Road, Maffra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:478m,city:maffra,db-name-substring,jaccard:1.00], 478m, VIC 3860): name="Maffra Golf Club", web=null, email=null, phone="03 5147 1884"
- OSM (high, 78m, sim=1): name="Maffra Golf Club", web="http://www.maffragolf.com.au/", email=null, phone="+61 3 5147 1884"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 78m, sim=1)
  - phone: from fed(high, sim=1)

### Magenta Shores (Australia, 2 courses)

- DB: addr="1 Magenta Drive, Magenta", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:114m,city:magenta,db-name-substring,jaccard:0.50], 114m, NSW 2261): name="Magenta Shores Golf and Country Club", web="https://www.magentagolf.com.au", email="golf@magentagolf.com.au", phone="02 4316 5600"
- OSM (no-match, 567077m, sim=0.571): name="Ocean Shores Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Magnetic Island Country Golf Club (Australia, 2 courses)

- DB: addr="Hurst Street, Picnic Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.92[coord:141m,city:picnic,jaccard:0.75], 141m, QLD 4819): name="Magnetic Island Country Club", web=null, email=null, phone="07 4778 5188"
- OSM (high, 95m, sim=1): name="Magnetic Island Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Malahide Golf Club (Australia, 1 courses)

- DB: addr="Esk Highway, Fingal", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2562m,city:fingal,db-name-substring,jaccard:1.00], 2562m, TAS 7214): name="Malahide Golf Club", web="https://www.facebook.com/profile.php?id=100063524681828#", email=null, phone="03 6374 2389"
- OSM (high, 0m, sim=1): name="Malahide Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Maldon Golf Club (Australia, 1 courses)

- DB: addr="11 Golf Link Rd, Maldon", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:18m,city:maldon,db-name-substring,jaccard:1.00], 18m, VIC 3463): name="Maldon Golf Club", web=null, email=null, phone="0354752005"
- OSM (high, 90m, sim=1): name="Maldon Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Maleny Golf Club (Australia, 2 courses)

- DB: addr="15 Porters Lane, North Maleny", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:437m,city:north,db-name-substring,jaccard:1.00], 437m, QLD 4552): name="Maleny Golf Club", web="https://malenygolfclub.com.au", email=null, phone="5499 9960"
- OSM (no-match, 303547m, sim=0.571): name="Maclean Golf Club", web="https://www.macleangolfclub.com.au", email="mail@macleangolfclub.com.au", phone="+61 2 6645 2183"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mallacoota Golf & Country Club (Australia, 2 courses)

- DB: addr="Nelson Drive, Mallacoota", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:163m,city:mallacoota,jaccard:0.67], 163m, VIC 3892): name="Mallacoota Golf Club", web="http://mallacootagolf.com.au", email=null, phone="03 5158 0277"
- OSM (high, 56m, sim=1): name="Mallacoota Golf & Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Malvern Valley Golf Course (Australia, 1 courses)

- DB: addr="Golfers Drv, East Malvern", web=null, email=null, phone=null
- golf.com.au (high, sim=0.778, boost=+0.43[coord:423m,jaccard:0.60], 423m, VIC 3145): name="Malvern Valley Public Golf Club (VIC)", web=null, email=null, phone="0395684433"
- OSM (high, 96m, sim=1): name="Malvern Valley Public Golf Course", web="https://www.malvernvalleygolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 96m, sim=1)
  - phone: from fed(high, sim=0.778)

### Malvern Valley Public Golf Course (Australia, 1 courses)

- DB: addr="1 Golfers Drive, Malvern", web=null, email=null, phone=null
- golf.com.au (high, sim=0.778, boost=+0.49[coord:423m,jaccard:0.80], 423m, VIC 3145): name="Malvern Valley Public Golf Club (VIC)", web=null, email=null, phone="0395684433"
- OSM (high, 96m, sim=1): name="Malvern Valley Public Golf Course", web="https://www.malvernvalleygolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 96m, sim=1)
  - phone: from fed(high, sim=0.778)

### Managatang Golf Club (Australia, 1 courses)

- DB: addr="Recreation Reserve Sports Road, Managatang", web=null, email=null, phone=null
- golf.com.au (high, sim=0.909, boost=+0.6[coord:248m,typo:managatang~manangatang], 248m, VIC 3546): name="Manangatang Golf Club", web=null, email=null, phone="0438362712"
- OSM (low, 11m, sim=0.455): name="Manangatang Golf Course and Racecourse", web="https://country.racing.com/manangatang", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.909)

### Mandurah Country Club (Australia, 1 courses)

- DB: addr="16 Marsh Pl, Halls Head, Mandurah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:545m,city:mandurah,db-name-substring,jaccard:1.00], 545m, WA 6210): name="Mandurah Country Club", web="https://www.mandcountryclub.com.au/cms/", email="admin@mandcountryclub.com.au", phone="(08) 9581 2968"
- OSM (high, 111m, sim=1): name="Mandurah Country Club & Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mangrove Mountain Memorial Club & Golf Course (Australia, 1 courses)

- DB: addr="18 Hallards Road, Central Mangrove", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:175m,city:central,jaccard:0.50], 175m, NSW 2250): name="Mangrove Mountain Memorial Club", web=null, email=null, phone="02 4373 1129"
- OSM (high, 175m, sim=1): name="Mangrove Mountain Memorial Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Manilla Golf Club (Australia, 1 courses)

- DB: addr="Halls Creek Road, Manilla", web=null, email=null, phone=null
- golf.com.au (high, sim=0.636, boost=+0.7[coord:1966m,city:manilla,jaccard:1.00], 1966m, NSW 2346): name="Manilla NSW Golf Club", web=null, email="manillagolfclub@outlook.com", phone="02 6785 1417"
- OSM (low, 331241m, sim=0.75): name="Manildra Golf Course", web=null, email=null, phone="+61 2 6364 5024"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.636)
  - phone: from fed(high, sim=0.636)

### Manjimup Country Club (Australia, 1 courses)

- DB: addr="Perup Road, Manjimup", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:470m,city:manjimup,db-name-substring,jaccard:1.00], 470m, WA 6258): name="Manjimup Country Club", web="http://www.manjimupcountryclub.com.au", email=null, phone="0427515545"
- OSM (high, 39m, sim=1): name="Manjimup Country Club Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Manly Golf Club (Australia, 1 courses)

- DB: addr="38 Balgowlah Road, Manly", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1989m,city:manly,db-name-substring,jaccard:1.00], 1989m, NSW 1655): name="Manly Golf Club", web="http://www.manlygolf.com.au", email="reception@manlygolf.com.au", phone="02 9948 0256"
- OSM (low, 219m, sim=0.222): name="Warringah Golf Club", web="https://www.warringahgolfclub.com.au/", email=null, phone="+61 2 9905 1326;+61 2 9905 4709"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mannum Golf Club (Australia, 3 courses)

- DB: addr="Douglas Street, MANNUM", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:162m,city:mannum,db-name-substring,jaccard:1.00], 162m, SA 5238): name="Mannum Golf Club", web="https://mannumgolfclub.com.au", email=null, phone="0411 107 450"
- OSM (high, 74m, sim=1): name="Mannum Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Marangaroo Golf Course (Australia, 1 courses)

- DB: addr="Aylesford Drive, Marangaroo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:265m,city:marangaroo,db-name-substring,jaccard:1.00], 265m, WA 6064): name="Marangaroo Golf Course", web="https://www.marangaroogolf.com.au/", email=null, phone="08 9247 1733"
- OSM (high, 54m, sim=1): name="Marangaroo Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mareeba Golf Club (Australia, 1 courses)

- DB: addr="1 Hampe Street, Mareeba", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:300m,city:mareeba,db-name-substring,jaccard:1.00], 300m, QLD 4880): name="Mareeba Golf Club", web="http://www.mareebagolfclub.com.au/", email="manager@mareebagolfclub.com.au", phone="07 4092 1528"
- OSM (high, 37m, sim=1): name="Mareeba Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Margaret River Golf Club (Australia, 1 courses)

- DB: addr="599 Wallcliffe Road, Margaret River", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:411m,city:margaret,db-name-substring,jaccard:1.00], 411m, WA 6285): name="Margaret River Golf Club", web="http://www.margaretrivergolfclub.com.au", email="admin@margaretrivergolfclub.com.au", phone="(08) 9757 2197"
- OSM (high, 91m, sim=1): name="Margaret River Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Marong Golf Club (Australia, 1 courses)

- DB: addr="Ravenswood Road, Marong", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:365m,city:marong,db-name-substring,jaccard:1.00], 365m, VIC 3550): name="Marong Golf Club", web="http://www.maronggolfclub.com.au", email=null, phone="0431 086 080"
- OSM (high, 108m, sim=1): name="Marong Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Marri Park Golf Course (Australia, 2 courses)

- DB: addr="Thomas Road, Casuarina, Perth", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.78[coord:293m,city:casuarina,jaccard:0.75], 293m, WA 6167): name="Marri Park Public Golf Course", web=null, email=null, phone="08 9419 3037"
- OSM (high, 217m, sim=1): name="Marri Park Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Maryborough Golf Club (Australia, 2 courses)

- DB: addr="Park Road, Maryborough", web=null, email=null, phone=null
- golf.com.au (high, sim=0.733, boost=+1.25[coord:40m,city:maryborough,db-name-substring,jaccard:1.00], 40m, VIC 3465): name="Maryborough Golf Club (VIC)", web=null, email="enquiries@maryboroughgolfclub.com.au", phone="03 5460 4900"
- OSM (low, 257m, sim=0.647): name="Maryborough Golf & Bowls Club", web="http://www.maryboroughgolfclub.com.au/", email=null, phone="+61 3 5460 4900"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.733)
  - phone: from fed(high, sim=0.733)

### Marysville Golf Club (Australia, 1 courses)

- DB: addr="956 Buxton-Marysville Road, Marysville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:387m,city:marysville,db-name-substring,jaccard:1.00], 387m, VIC 3779): name="Marysville Golf Club", web=null, email=null, phone="03 5963 3241"
- OSM (low, 92m, sim=0.385): name="Marysville Community Golf & Bowls Club", web="https://www.marysvillegolfandbowls.com.au/", email="enquiries@marysvillegolfandbowls.com.au", phone="+61 3 5963 3241"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Massey Park Golf Club (Australia, 1 courses)

- DB: addr="Ian Parade, Concord", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:47m,city:concord,db-name-substring,jaccard:1.00], 47m, NSW 2137): name="Massey Park Golf Club", web="https://www.masseypark.com.au", email=null, phone="02 9743 1917"
- OSM (medium, 351m, sim=1): name="Massey Park Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mathoura Golf Club (Australia, 1 courses)

- DB: addr="Cobb Highway, Mathoura", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:315m,city:mathoura,db-name-substring,jaccard:1.00], 315m, NSW 2710): name="Mathoura Golf Club", web=null, email=null, phone="58843774"
- OSM (high, 8m, sim=1): name="Mathoura Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Maylands Peninsula Public Golf Course (Australia, 1 courses)

- DB: addr="Swan Bank Rd, Maylands, Perth", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:294m,city:maylands,db-name-substring,jaccard:1.00], 294m, WA 6051): name="Maylands Peninsula Public Golf Course", web=null, email=null, phone="08 9370 3211"
- OSM (high, 52m, sim=1): name="Maylands Peninsula Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### McCracken Country Club (Australia, 2 courses)

- DB: addr="Mccracken Drive, Victor Harbor", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:205m,city:victor,db-name-substring,jaccard:1.00], 205m, SA 5211): name="McCracken Country Club", web="http://www.mccrackengolf.com", email="admin@mccrackengolfclub.com.au", phone="(08) 8551 0200"
- OSM (high, 64m, sim=1): name="McCracken Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### McLeod Country Golf Club (Australia, 1 courses)

- DB: addr="61 Gertrude McLeod Crescent, Mount Ommaney", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:18m,city:mount,jaccard:0.67], 18m, QLD 4074): name="McLeod Golf Club", web="http://www.mcleodgolf.com.au", email=null, phone="07 3376 3666"
- OSM (medium, 462m, sim=1): name="McLeod Country Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Meadow Springs Golf and Country Club (Australia, 1 courses)

- DB: addr="23 Meadow Springs Drive, Meadow Springs", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.47[coord:755m,jaccard:0.75], 755m, WA 6210): name="Meadow Springs Country Club", web=null, email=null, phone="(08) 9581 6360"
- OSM (low, 867m, sim=1): name="Meadow Springs Golf & Country Club", web="https://www.msgcc.com.au/", email="golf@msgcc.com.au", phone="+61 8 9581 6002"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Meckering Golf Club (Australia, 1 courses)

- DB: addr="Dempster Street, Meckering", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:567m,city:meckering,db-name-substring,jaccard:1.00], 567m, WA 6405): name="Meckering Golf Club", web=null, email="meckeringgolfclub@gmail.com", phone="(08)96251272"
- OSM (high, 219m, sim=1): name="Meckering Golf Club", web=null, email=null, phone="+61 8 9625 1202"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Medway Golf Club (Australia, 1 courses)

- DB: addr="57 Omar Street, Maidstone", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:198m,city:maidstone,db-name-substring,jaccard:1.00], 198m, VIC 3012): name="Medway Golf Club", web="https://www.medwaygolf.com.au", email=null, phone="(03) 9317 9031"
- OSM (high, 13m, sim=1): name="Medway Golf Club", web="https://www.medwaygolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Meeniyan Golf Club (Australia, 1 courses)

- DB: addr="Meeniyan-Promontory Road, Meeniyan", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:733m,city:meeniyan,db-name-substring,jaccard:1.00], 733m, VIC 3956): name="Meeniyan Golf Club", web="http://meeniyangolf.com.au", email="meeniyangolfclub@meeniyangolfclub.com.au", phone="03 5664 7490"
- OSM (no-match, 327482m, sim=0.5): name="Berrigan Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Melbourne Airport Golf Club (Australia, 1 courses)

- DB: addr="Operations Road, Melbourne", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:442m,db-name-substring,jaccard:1.00], 442m, VIC 3042): name="Melbourne Airport Golf Club", web=null, email=null, phone="03 9338 4595"
- OSM (high, 59m, sim=1): name="Melbourne Airport Golf Club", web="melbourneairportgolfclub.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 59m, sim=1)
  - phone: from fed(high, sim=1)

### Melton Valley Golf Club (Australia, 2 courses)

- DB: addr="2-30 Melton Valley Drive, Melton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:322m,city:melton,db-name-substring,jaccard:1.00], 322m, VIC 3337): name="Melton Valley Golf Club", web="https://www.meltongolf.com.au", email="admin@meltonvalleygolf.com.au", phone="03 9747 8216"
- OSM (high, 94m, sim=1): name="Melton Valley Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Melville Glades Golf Club (Australia, 1 courses)

- DB: addr="Beasley Road, Leeming", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:690m,city:leeming,db-name-substring,jaccard:1.00], 690m, WA 6955): name="Melville Glades Golf Club", web="http://www.melvilleglades.com", email="admin@melvilleglades.com", phone="(08) 9332 7333"
- OSM (medium, 261m, sim=1): name="Melville Glades Golf Course", web="https://www.melvilleglades.com/", email="admin@melvilleglades.com", phone="+61 8 9332 7497;+61 8 9332 7333"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Merbein (Australia, 1 courses)

- DB: addr="355 McEdward Street, Cabarita", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:570m,city:cabarita,db-name-substring,jaccard:0.50], 570m, VIC 3505): name="Merbein Golf Club", web=null, email="secretary@merbeingolfclub.com.au", phone="03 5025 6421"
- OSM (high, 40m, sim=1): name="Merbein Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Merbein Golf Club (Australia, 1 courses)

- DB: addr="355 McEdwards Street, Merbein", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[db-name-substring,jaccard:1.00], 4073m, VIC 3505): name="Merbein Golf Club", web=null, email="secretary@merbeingolfclub.com.au", phone="03 5025 6421"
- OSM (low, 4545m, sim=1): name="Merbein Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Meredith Golf Club (Australia, 1 courses)

- DB: addr="Midland Highway, Meredith", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:59m,city:meredith,db-name-substring,jaccard:1.00], 59m, VIC 3333): name="Meredith Golf Club", web=null, email="meredithgolfclub@gmail.com", phone="0407795342"
- OSM (high, 17m, sim=1): name="Meredith Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Merewether Golf Club (Australia, 1 courses)

- DB: addr="40 King Street, Adamstown", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:28m,city:adamstown,db-name-substring,jaccard:1.00], 28m, NSW 2289): name="Merewether Golf Club", web="http://www.merewethergolf.com.au", email=null, phone="02 4963 1128"
- OSM (medium, 253m, sim=1): name="Merewether Golf Course", web="https://www.merewethergolf.com.au/", email=null, phone="+61 2 4963 1869"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Merino Golf Club (Australia, 1 courses)

- DB: addr="Digby Road, Merino", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:78m,city:merino,db-name-substring,jaccard:1.00], 78m, VIC 3310): name="Merino Golf Club", web=null, email=null, phone="0400271621"
- OSM (high, 79m, sim=1): name="Merino Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Merredin Golf Club (Australia, 1 courses)

- DB: addr="Telfer Avenue, Merredin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:49m,city:merredin,db-name-substring,jaccard:1.00], 49m, WA 6415): name="Merredin Golf Club", web=null, email="dponeill@bigpond.net.au", phone="0427293888"
- OSM (high, 44m, sim=1): name="Merredin Golf", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Merrigum Golf Club (Australia, 1 courses)

- DB: addr="Ryan Road, Merrigum", web=null, email=null, phone=null
- golf.com.au (high, sim=0.667, boost=+1.1[coord:457m,city:merrigum,db-name-substring,jaccard:1.00], 457m, VIC 3618): name="Merrigum Golf Club Inc", web=null, email=null, phone=null
- OSM (high, 4m, sim=1): name="Merrigum Golf Club", web=null, email=null, phone=null

### Merriwa Sports Club (Australia, 1 courses)

- DB: addr="King George 5th Avenue, Merriwa", web=null, email=null, phone=null
- golf.com.au (high, sim=0.5, boost=+0.55[coord:506m,city:merriwa], 506m, NSW 2329): name="Merriwa Golf Club", web=null, email=null, phone="0427482303"
- OSM (low, 571m, sim=0.5): name="Merriwa Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.5)

### Metropolitan Golf Club (Australia, 1 courses)

- DB: addr="Golf Road, South Oakleigh", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:503m,city:south,db-name-substring,jaccard:1.00], 503m, VIC 3167): name="The Metropolitan Golf Club", web="https://www.metropolitangolf.com.au", email="info@metropolitangolf.com.au", phone="03 9579 3122"
- OSM (high, 37m, sim=1): name="The Metropolitan Golf Club", web="https://www.metropolitangolf.com.au/", email=null, phone="+61 3 9570 3774"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Middlemount Golf Club (Australia, 1 courses)

- DB: addr="Centenary Drive, Middlemount", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:75m,city:middlemount,db-name-substring,jaccard:1.00], 75m, QLD 4746): name="Middlemount Golf Club", web=null, email="club.manager@middlemountgolf.com.au", phone="07 4985 7830"
- OSM (medium, 412m, sim=1): name="Middlemount Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Midlands Golf Club (Australia, 1 courses)

- DB: addr="330 Heinz Lane, Invermay Park", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:167m,db-name-substring,jaccard:1.00], 167m, VIC 3350): name="Midlands Golf Club", web=null, email=null, phone="0353314400"
- OSM (low, 255m, sim=0.615): name="Midlands Gold Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Mildura Golf Resort (Australia, 1 courses)

- DB: addr="287 Twelfth Street, Mildura", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:195m,city:mildura,jaccard:0.67], 195m, VIC 3502): name="Mildura Golf Club", web="http://milduragolf.com.au", email=null, phone="0350231147"
- OSM (high, 24m, sim=1): name="Mildura Golf Resort", web="https://www.milduragolfresort.com.au/", email=null, phone="+61 3 5023 1147"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Miling Golf Club (Australia, 1 courses)

- DB: addr="177 Golf Course Road, Miling", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:200m,city:miling,db-name-substring,jaccard:1.00], 200m, WA 6575): name="Miling Golf Club", web=null, email=null, phone="0896542067"
- OSM (high, 13m, sim=1): name="Miling Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Millaa Millaa Golf Club (Australia, 1 courses)

- DB: addr="Malanda Road, Millaa Millaa", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:265m,city:millaa,db-name-substring,jaccard:1.00], 265m, QLD 4886): name="Millaa Millaa Golf Club", web=null, email="millaamillaagc@gmail.com", phone="07 40972441"
- OSM (high, 29m, sim=1): name="Millaa Millaa Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Millicent Golf Club (Australia, 1 courses)

- DB: addr="Sec 230 hd of Riddoch, Mount Burr", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:393m,city:burr,db-name-substring,jaccard:1.00], 393m, SA 5280): name="Millicent Golf Club", web="https://www.millicentgolfclub.com.au", email=null, phone="(08) 8734 8124"
- OSM (high, 173m, sim=1): name="Millicent Golf Club", web="https://millicentgolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Millmerran Golf Club (Australia, 1 courses)

- DB: addr="Millmerran, Wangaratta", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:286m,city:millmerran,db-name-substring,jaccard:1.00], 286m, QLD 4357): name="Millmerran Golf Club", web=null, email="lachlan.bliss89@gmail.com", phone="07 4695 1476"
- OSM (high, 64m, sim=1): name="Millmerran Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mingenew Golf Club (Australia, 1 courses)

- DB: addr="Midlands Rd, Mingenew", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1086m,city:mingenew,db-name-substring,jaccard:1.00], 1086m, WA 6522): name="Mingenew Golf Club", web=null, email="mingenewgolfclub@hotmail.com", phone="0427728011"
- OSM (high, 21m, sim=1): name="Mingenew Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Minlaton Golf Club (Australia, 1 courses)

- DB: addr="East Terrace, Minlaton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:194m,city:minlaton,db-name-substring,jaccard:1.00], 194m, SA 5575): name="Minlaton Golf Club", web=null, email=null, phone="08 88532275"
- OSM (medium, 412m, sim=1): name="Minlaton Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Minnippi Golf & Range (Australia, 1 courses)

- DB: addr="Minnippi Boulevard, Cannon Hill", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:696m,city:cannon,db-name-substring,jaccard:1.00], 696m, QLD 4170): name="Minnippi Golf & Range", web=null, email=null, phone=null
- OSM (no-match, 1406106m, sim=0.625): name="Minyip Golf Club", web=null, email=null, phone=null

### Minyip Golf Club (Australia, 1 courses)

- DB: addr="Ubergang's Road, Minyip", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:222m,city:minyip,db-name-substring,jaccard:1.00], 222m, VIC 3392): name="Minyip Golf Club", web=null, email=null, phone="0353857476"
- OSM (medium, 272m, sim=1): name="Minyip Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Mirage Country Club (Australia, 1 courses)

- DB: addr="Port Douglas Road, Port Douglas", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:134m,city:port,db-name-substring,jaccard:1.00], 134m, QLD 4877): name="Mirage Country Club", web=null, email="info@miragecountryclub.com.au", phone="(07) 4099 5537"
- OSM (low, 611m, sim=1): name="Mirage Country Club", web="http://www.sheratonportdouglas.com/miragecountryclub", email=null, phone="+61 7 4099 5537;+61 7 4099 5888;+61 7 4099 5488"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mirboo North Golf Club (Australia, 1 courses)

- DB: addr="16 Galvins Road, Mirboo North", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:178m,city:mirboo,db-name-substring,jaccard:1.00], 178m, VIC 3871): name="Mirboo North Golf Club", web="http://mirboonorthgolfclub.com.au", email=null, phone="(03) 5668 1515"
- OSM (high, 58m, sim=1): name="Mirboo North Golf Club", web="https://mirboonorthgolfclub.com.au/", email=null, phone="+61 3 5668 1515"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Miriam Vale Golf Club (Australia, 1 courses)

- DB: addr="Claude Wharton Drive, Miriam Vale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:399m,city:miriam,db-name-substring,jaccard:1.00], 399m, QLD 4677): name="Miriam Vale Golf Club", web=null, email=null, phone="4974 5250"
- OSM (high, 10m, sim=1): name="Miriam Vale Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Mitiamo Golf Club (Australia, 1 courses)

- DB: addr="Cohuna Road, Mitiamo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:mitiamo,db-name-substring,jaccard:1.00], 3700m, VIC 3573): name="Mitiamo Golf Club", web=null, email="lister3556@gmail.com", phone="0427365221"
- OSM (low, 3856m, sim=1): name="Mitiamo Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Moe Golf Course (Australia, 1 courses)

- DB: addr="Thompsons Road, Newborough", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.4[coord:392m,jaccard:0.50], 392m, VIC 3825): name="Moe Golf Club", web="https://moegolfclub.com.au/", email="golf@moegolfclub.com.au", phone="03 5127 2731"
- OSM (high, 114m, sim=1): name="Moe Golf Course", web="https://moegolfclub.com.au/", email=null, phone="+61 3 5127 2731"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mollymook Golf Club (Australia, 2 courses)

- DB: addr="72 Golf Avenue, Mollymook", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:251m,city:mollymook,db-name-substring,jaccard:1.00], 251m, NSW 2539): name="Mollymook Golf Club", web="https://www.mollymookgolf.com.au", email=null, phone="02 4455 1911"
- OSM (high, 0m, sim=1): name="Mollymook Golf Club", web="https://www.mollymookgolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Molong Golf Club (Australia, 1 courses)

- DB: addr="Euchareena Road, Molong", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1792m,city:molong,db-name-substring,jaccard:1.00], 1792m, NSW 2866): name="Molong Golf Club", web=null, email="molonggolfclub@outlook.com", phone="6366 8321"
- OSM (low, 381086m, sim=0.714): name="Howlong Golf Course", web="https://www.howlonggolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Monash Country Club (Australia, 1 courses)

- DB: addr="Powderworks Road, Ingleside", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:315m,city:ingleside,db-name-substring,jaccard:1.00], 315m, NSW 2101): name="Monash Country Club", web="http://www.monashcc.com.au", email="proshop@monashcc.com.au", phone="02 9913 8282"
- OSM (high, 14m, sim=1): name="Monash Country Club", web="https://www.monashcc.com.au/", email=null, phone="+61 2 9913 8282"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Monto Golf Club (Australia, 1 courses)

- DB: addr="Rifle Range Road, Monto", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:255m,city:monto,db-name-substring,jaccard:1.00], 255m, QLD 4630): name="Monto Golf Club", web=null, email=null, phone="(07) 4166 1670"
- OSM (high, 43m, sim=1): name="Monto Golf Club", web=null, email=null, phone="+61 7 4166 1670"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Moonah Links (Australia, 2 courses)

- DB: addr="55 Peter Thomson Drive, Fingal", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.15[coord:232m,city:fingal,db-name-substring,jaccard:0.67], 232m, VIC 3939): name="Moonah Links Golf Club", web="http://www.moonahlinks.com.au", email="proshop@moonahlinks.com.au", phone="(03) 5988 2088"
- OSM (high, 127m, sim=1): name="Moonah Links Golf Club", web="https://www.moonahlinks.com.au/", email=null, phone="+61 3 5988 2047;+61 3 5988 2088"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Moonta Golf Club (Australia, 1 courses)

- DB: addr="Milne Terrace, Moonta", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2847m,city:moonta,db-name-substring,jaccard:1.00], 2847m, SA 5558): name="Moonta Golf Club", web=null, email=null, phone="0412949739"
- OSM (high, 120m, sim=1): name="Moonta Golf Club", web=null, email=null, phone="+61 8 8825 2107"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Mooralla Golf Club (Australia, 1 courses)

- DB: addr="Henty Highway, Cavendish", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[db-name-substring,jaccard:1.00], 3832m, VIC 3314): name="Mooralla Golf Club", web=null, email=null, phone="03 5574 2294"
- OSM (no-match, 381009m, sim=0.667): name="Coomealla Golf Club", web="https://www.coomeallaclub.com.au/golf-club", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Moore Park Golf Course (Australia, 1 courses)

- DB: addr="Cleveland Street, Moore Park", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:291m,city:moore,jaccard:0.67], 291m, NSW 1465): name="Moore Park Golf Club", web="http://www.mooreparkgolf.com.au", email=null, phone="02 9697 3877"
- OSM (high, 163m, sim=1): name="Moore Park Golf", web="https://www.mooreparkgolf.com.au/", email="info@mpgolf.com.au", phone="+61 2 9663 1064"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 163m, sim=1)
  - phone: from fed(high, sim=1)

### Moorina Golf Club (Australia, 1 courses)

- DB: addr="Tasman Highway, Derby", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:227m,db-name-substring,jaccard:1.00], 227m, TAS 7264): name="Moorina Golf Club", web="https://www.facebook.com/profile.php?id=100057407743391#", email=null, phone="0438542413"
- OSM (high, 239m, sim=1): name="Moorina Golf Club", web=null, email=null, phone="+61 3 6344 1717"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Moorings Golf Course (Australia, 1 courses)

- DB: addr="2152 George Bass Drive, Tomakin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:76m,city:tomakin,jaccard:0.67], 76m, NSW ): name="The Moorings Golf Club", web=null, email=null, phone=null
- OSM (low, 623518m, sim=0.75): name="Moorina Golf Club", web=null, email=null, phone="+61 3 6344 1717"

### Mooroopna Golf Club (Australia, 1 courses)

- DB: addr="2 Fairway Drive, Mooroopna", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:19m,city:mooroopna,db-name-substring,jaccard:1.00], 19m, VIC 3629): name="Mooroopna Golf Club", web="https://mooroopnagolfclub.com.au/", email=null, phone="03 5825 4135"
- OSM (medium, 491m, sim=1): name="Mooroopna Golf Club", web="https://www.mooroopnagolfclub.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Morack Public Golf Course (Australia, 1 courses)

- DB: addr="Cnr Morack & East Roads, Vermont South", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.92[coord:222m,city:vermont,jaccard:0.75], 222m, VIC 3131): name="Morack Golf Course", web=null, email="morackinfo@swingfactory.com.au", phone="03 9801 4479"
- OSM (high, 177m, sim=1): name="Morack Public Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Morawa Golf Club (Australia, 1 courses)

- DB: addr="Mullewa Wubin Road, Morawa", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:59m,city:morawa,db-name-substring,jaccard:1.00], 59m, WA 6623): name="Morawa Golf Club", web=null, email="bam@westnet.com.au", phone="08 9971 1257"
- OSM (low, 324m, sim=0.429): name="Morawa Golf and Bowling Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Moree Golf Club (Australia, 1 courses)

- DB: addr="Heber Street, Moree", web=null, email=null, phone=null
- golf.com.au (high, sim=0.556, boost=+1.25[coord:242m,city:moree,db-name-substring,jaccard:1.00], 242m, NSW 2400): name="Moree Golf Club Ltd", web=null, email=null, phone="02 6752 1405"
- OSM (high, 172m, sim=1): name="Moree Golf Club", web="https://www.moreegolfclub.com.au", email=null, phone="+61 2 6752 1405"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 172m, sim=1)
  - phone: from fed(high, sim=0.556)

### Morgan-Cadell Golf Club (Australia, 1 courses)

- DB: addr="Main Road, Morgan", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:morgan,db-name-substring,jaccard:1.00], 3380m, SA 5320): name="Morgan-Cadell Golf Club", web=null, email=null, phone="0427788100"
- OSM (no-match, 1600592m, sim=0.462): name="Coral Cove Golf Course", web="http://www.coralcoveresort.com.au/", email="reservations@coralcoveresort.com.au", phone="+61 7 4159 3333;+61 7 4132 5600"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Mornington Country Golf Club (Australia, 1 courses)

- DB: addr="Tallis Drive, Mornington", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:357m,city:mornington,jaccard:0.67], 357m, VIC 3931): name="Mornington Golf Club", web="https://www.morningtongolf.com.au/cms/", email=null, phone="(03) 5975 2784"
- OSM (high, 24m, sim=1): name="Mornington Golf Club", web="https://www.morningtongolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mornington Golf Club (Australia, 1 courses)

- DB: addr="Tallis Drive, Mornington", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:357m,city:mornington,db-name-substring,jaccard:1.00], 357m, VIC 3931): name="Mornington Golf Club", web="https://www.morningtongolf.com.au/cms/", email=null, phone="(03) 5975 2784"
- OSM (high, 24m, sim=1): name="Mornington Golf Club", web="https://www.morningtongolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mortlake Golf Club (Australia, 1 courses)

- DB: addr="Hopetoun Street, Mortlake", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:447m,city:mortlake,db-name-substring,jaccard:1.00], 447m, VIC 3272): name="Mortlake Golf Club", web=null, email=null, phone="0418995478"
- OSM (high, 189m, sim=1): name="Mortlake Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Morven Golf Club (Australia, 1 courses)

- DB: addr="Racecourse Reserve, Morven", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:252m,db-name-substring,jaccard:1.00], 252m, QLD 4468): name="Morven Golf Club", web=null, email=null, phone=null
- OSM (high, 5m, sim=1): name="Morven Golf Course", web=null, email=null, phone=null

### Morwell Golf Club (Australia, 1 courses)

- DB: addr="Fairway Drive, Morwell", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:224m,city:morwell,db-name-substring,jaccard:1.00], 224m, VIC 3840): name="Morwell Golf Club", web=null, email="office@morwellgolfclub.com.au", phone="03 5134 5307"
- OSM (high, 131m, sim=1): name="Morwell Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mosman Park Golf Club (Australia, 2 courses)

- DB: addr="2 Marshall Street, Mosman Park", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:260m,city:mosman,db-name-substring,jaccard:1.00], 260m, WA 6012): name="Mosman Park Golf Club", web="http://www.mosmanparkgolfclub.com.au", email=null, phone="(08) 9384 6312"
- OSM (high, 55m, sim=1): name="Mosman Park Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Moss Vale Golf Club (Australia, 1 courses)

- DB: addr="38 Arthur Street, Moss Vale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:326m,city:moss,db-name-substring,jaccard:1.00], 326m, NSW 2577): name="Moss Vale Golf Club", web="https://www.mossvalegolfclub.com.au", email=null, phone="4868 1811"
- OSM (high, 47m, sim=1): name="Moss Vale Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mossman Golf Club (Australia, 2 courses)

- DB: addr="Newell Beach Road, Mossman", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:460m,city:mossman,db-name-substring,jaccard:1.00], 460m, QLD 4873): name="Mossman Golf Club", web="http://www.mossmangolf.com.au", email="info@mossmangolfclub.com.au", phone="0405142554"
- OSM (high, 44m, sim=1): name="Mossman Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mount Alexander Golf Club (Australia, 1 courses)

- DB: addr="Wimble Street, Castlemaine", web=null, email=null, phone=null
- golf.com.au (high, sim=0.8, boost=+0.85[coord:307m,city:castlemaine,jaccard:1.00], 307m, VIC 3450): name="Mt Alexander Golf Club", web=null, email="robertpratt1@bigpond.com", phone="03 5472 3969"
- OSM (high, 97m, sim=1): name="Mount Alexander Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.8)
  - phone: from fed(high, sim=0.8)

### Mount Beauty Golf Club (Australia, 1 courses)

- DB: addr="Tawonga Crescent, Mount Beauty", web=null, email=null, phone=null
- golf.com.au (high, sim=0.75, boost=+0.7[coord:1206m,city:beauty,jaccard:1.00], 1206m, VIC 3699): name="Mt Beauty Golf Club", web=null, email="secretary@mtbeautygolfclub.org.au", phone="03 5754 4002"
- OSM (high, 83m, sim=0.75): name="Mt Beauty Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.75)
  - phone: from fed(high, sim=0.75)

### Mount Broughton Golf & Country Club (Australia, 2 courses)

- DB: addr="Kater Road, Sutton Forest", web=null, email=null, phone=null
- golf.com.au (high, sim=0.8, boost=+0.9[coord:33m,city:sutton,jaccard:0.67], 33m, NSW 2577): name="Mt Broughton Golf Club", web="http://www.mtbroughton.com.au", email=null, phone="4868 3700"
- OSM (low, 534m, sim=1): name="Mount Broughton Golf and Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.8)
  - phone: from fed(high, sim=0.8)

### Mount Compass Golf Course (Australia, 1 courses)

- DB: addr="1 George Francis Dr, Mount Compass", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:159m,city:mount,jaccard:0.67], 159m, SA 5210): name="Mount Compass Golf Club", web="http://www.mcgc.com.au", email=null, phone="(08) 8556 8500"
- OSM (low, 258m, sim=0): name="Fleurieu Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mount Coolum Golf Club (Australia, 4 courses)

- DB: addr="17 Lumeah Drive, Mount Coolum", web=null, email=null, phone=null
- golf.com.au (high, sim=0.75, boost=+0.85[coord:461m,city:mount,jaccard:1.00], 461m, QLD 4573): name="Mt Coolum Golf Club", web="http://www.mtcoolumgolf.com", email=null, phone="07 5446 1539"
- OSM (high, 65m, sim=1): name="Mount Coolum Golf Club", web="https://www.mtcoolumgolf.com/", email="info@mtcoolumgolf.com", phone="+61 7 5446 3125;+61 7 5446 1539"

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - website: from fed(high, sim=0.75)
  - email: from osm(high, 65m, sim=1)
  - phone: from fed(high, sim=0.75)

### Mount Gambier Golf Club (Australia, 1 courses)

- DB: addr="Attamurra Road, Mount Gambier", web=null, email=null, phone=null
- golf.com.au (high, sim=0.769, boost=+1[coord:11m,city:mount,jaccard:1.00], 11m, SA 5290): name="Mt Gambier Golf Club", web=null, email=null, phone="(08) 8725 7739"
- OSM (medium, 402m, sim=1): name="Mount Gambier Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.769)

### Mount Garnet Golf Club (Australia, 1 courses)

- DB: addr="Kennedy Highway, Mt Garnett", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:236m,city:garnett,db-name-substring,jaccard:1.00], 236m, QLD 4872): name="Mount Garnet Golf Club", web=null, email=null, phone="0498 488 141"
- OSM (medium, 254m, sim=1): name="Mount Garnet Golf Course.", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Mount Isa Golf Club (Australia, 1 courses)

- DB: addr="Powerhouse Road, Mount Isa", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:20m,city:mount,db-name-substring,jaccard:1.00], 20m, QLD 4825): name="Mount Isa Golf Club", web="https://www.mountisagolfclub.com", email="info@mtisagolf.com", phone="07 4743 2371"
- OSM (high, 208m, sim=1): name="Mount Isa Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mount Macedon Golf Club (Australia, 3 courses)

- DB: addr="282 Mount Macedon Road, Mount Macedon", web=null, email=null, phone=null
- golf.com.au (high, sim=0.769, boost=+1[coord:188m,city:mount,jaccard:1.00], 188m, VIC 3441): name="Mt Macedon Golf Club", web="https://www.mtmacedongolfclub.com.au/", email="mmgccaptain@gmail.com", phone="0417367788"
- OSM (high, 48m, sim=1): name="Mount Macedon Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=0.769)
  - email: from fed(high, sim=0.769)
  - phone: from fed(high, sim=0.769)

### Mount Magnet Golf Club (Australia, 1 courses)

- DB: addr="Lot 362 Watson Street, Mount Magnet", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:660m,city:magnet,db-name-substring,jaccard:1.00], 660m, WA 6638): name="Mount Magnet Golf Club", web=null, email=null, phone=null
- OSM (low, 3009563m, sim=0.833): name="Mount Garnet Golf Course.", web=null, email=null, phone=null

### Mount Martha Public Golf Course (Australia, 1 courses)

- DB: addr="275 Forest Drive, Mount Martha", web=null, email=null, phone=null
- golf.com.au (high, sim=0.75, boost=+0.85[coord:269m,city:martha,jaccard:1.00], 269m, VIC 3934): name="Mt Martha Public Golf Course", web="https://mtmarthapublicgc.com.au/", email="proshop@mornpen.vic.gov.au", phone="03 5970 2888"
- OSM (high, 69m, sim=1): name="Mount Martha Public Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.75)
  - email: from fed(high, sim=0.75)
  - phone: from fed(high, sim=0.75)

### Mount Morgan Golf Club (Australia, 1 courses)

- DB: addr="Corner of Burnett Highway Golflinks Road, Mount Morgan", web=null, email=null, phone=null
- golf.com.au (high, sim=0.75, boost=+0.3[jaccard:1.00], 4212m, QLD 4714): name="Mt Morgan Golf Club", web=null, email=null, phone="49381220"
- OSM (low, 4518m, sim=1): name="Mount Morgan Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.75)

### Mount Osmond Golf Club (Australia, 2 courses)

- DB: addr="60 Mt Osmond Road,, Mount Osmond", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:93m,city:mount,db-name-substring,jaccard:1.00], 93m, SA 5064): name="Mount Osmond Golf Club", web="https://www.mogc.com.au", email="info@mogc.com.au", phone="08 8379 1673"
- OSM (medium, 416m, sim=1): name="Mount Osmond Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mount Perry Golf Club (Australia, 1 courses)

- DB: addr="Scott Street, Mount Perry", web=null, email=null, phone=null
- golf.com.au (high, sim=0.727, boost=+0.7[coord:1928m,city:perry,jaccard:1.00], 1928m, QLD 4671): name="Mt Perry Golf Club", web=null, email=null, phone="41563409"
- OSM (no-match, 322501m, sim=0.667): name="Mount Warren Park Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.727)

### Mount Walker Golf Club (Australia, 1 courses)

- DB: addr="Mount Walker Road, Narembeen", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:325m,city:narembeen,db-name-substring,jaccard:1.00], 325m, WA 6369): name="Mount Walker Golf Club", web=null, email=null, phone="(08) 9061 7007"
- OSM (low, 303584m, sim=0.833): name="Mount Barker Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Mount Warren Park Golf Club (Australia, 1 courses)

- DB: addr="13 Bardyn Halliday Drive, Mt Warren Park", web=null, email=null, phone=null
- golf.com.au (high, sim=0.75, boost=+0.85[coord:260m,city:warren,jaccard:1.00], 260m, QLD 4207): name="Mt Warren Park Golf Club", web="http://www.beenleighrsl.com", email="memberservices@beenleighrsl.com.au", phone="07 3287 4000"
- OSM (high, 116m, sim=1): name="Mount Warren Park Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.75)
  - email: from fed(high, sim=0.75)
  - phone: from fed(high, sim=0.75)

### Mountain View Golf Club (Australia, 1 courses)

- DB: addr="East Road, Tom Price", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:34m,city:price], 34m, WA 6751): name="Mountain View Sporting Club", web="https://www.facebook.com/mvgctomprice", email="mountainviewgolfclub1986@gmail.com", phone="0497361672"
- OSM (low, 3317371m, sim=0.786): name="Mountain Vista Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mountain Vista Golf Club (Australia, 1 courses)

- DB: addr="1 Camp Road, Waratah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:366m,city:waratah,db-name-substring,jaccard:1.00], 366m, TAS 7321): name="Mountain Vista Golf Club", web="https://www.facebook.com/MountainVistaGolfClub/", email=null, phone="(03) 6439 2011"
- OSM (high, 89m, sim=1): name="Mountain Vista Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Moura & District Golf Club (Australia, 1 courses)

- DB: addr="Dawson Highway, Moura", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:449m,city:moura,jaccard:1.00], 449m, QLD 4718): name="Moura and District Golf Club", web=null, email="mouragolfclub@gmail.com", phone="0409 485 173"
- OSM (low, 64m, sim=0.357): name="Moura Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mowbray Golf Club (Australia, 1 courses)

- DB: addr="28 Grubb St, Mowbray", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:426m,city:mowbray,db-name-substring,jaccard:1.00], 426m, TAS 7248): name="Mowbray Golf Club", web="http://www.mowbraygolfclub.com", email="golf@mowbraygolfclub.com", phone="03 63261333"
- OSM (low, 801m, sim=1): name="Mowbray Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mt Broughton Golf & Country Club (Australia, 1 courses)

- DB: addr=" Kater Road, Sutton Forest", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:33m,city:sutton,jaccard:0.67], 33m, NSW 2577): name="Mt Broughton Golf Club", web="http://www.mtbroughton.com.au", email=null, phone="4868 3700"
- OSM (low, 534m, sim=0.8): name="Mount Broughton Golf and Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mt Derrimut Golf Club (Australia, 1 courses)

- DB: addr="475 Mt Derrimut Road, Mt Derrimut", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:266m,city:derrimut,db-name-substring,jaccard:0.50], 266m, VIC 3026): name="Mt Derrimut Golf Club - Driving Range", web=null, email="devonsmith@pgamember.org.au", phone=null
- OSM (low, 18m, sim=0.524): name="Mt Derrimut Golf and Community Club", web="http://www.sunshinegolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)

### Mt. Xavier Golf Club (Australia, 1 courses)

- DB: addr="118 Fortune Street, Ballarat", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:477m,city:ballarat,jaccard:1.00], 477m, VIC 3353): name="Mt Xavier Golf Club", web="https://www.mtxaviergolfclub.com/", email="mtxaviergolfandbowls@gmail.com", phone="0353313691"
- OSM (low, 44m, sim=0.45): name="Mt Xavier Golf Course and Lawn Bowls Club", web="http://www.mtxavier.com.au/", email="info@mtxavier.com.au", phone="+61 3 5331 3691"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mudgee Golf Club (Australia, 1 courses)

- DB: addr="21 Robertson Street, Mudgee", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:265m,city:mudgee,db-name-substring,jaccard:1.00], 265m, NSW 2850): name="Mudgee Golf Club", web="http://www.mudgeegolfclub.com.au", email="admin@mudgeegolfclub.com.au", phone="02 6372 1811"
- OSM (high, 4m, sim=1): name="Mudgee Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Muirfield Golf Club (Australia, 1 courses)

- DB: addr="Barclay Road, North Rocks", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:45m,city:north,db-name-substring,jaccard:1.00], 45m, NSW 2151): name="Muirfield Golf Club", web="http://www.muirfieldgolf.com.au", email=null, phone="9871 1388"
- OSM (medium, 301m, sim=1): name="Muirfield Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### muirfield nsw (Australia, 1 courses)

- DB: addr=null, web=null, email=null, phone=null
- golf.com.au (high, sim=0.692, boost=+0.4[coord:551m,jaccard:0.50], 551m, NSW 2151): name="Muirfield Golf Club", web="http://www.muirfieldgolf.com.au", email=null, phone="9871 1388"
- OSM (low, 576m, sim=0.692): name="Muirfield Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.692)
  - phone: from fed(high, sim=0.692)

### Mukinbudin Golf Club (Australia, 1 courses)

- DB: addr="Earl Drive, Mukinbudin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:11m,city:mukinbudin,db-name-substring,jaccard:1.00], 11m, WA 6479): name="Mukinbudin Golf Club", web=null, email=null, phone="(08) 90471089"
- OSM (high, 186m, sim=1): name="Mukinbudin Golf Club", web=null, email=null, phone="+61 8 9046 5136;+61 8 9047 1093"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Mullumbimby Golf Club (Australia, 1 courses)

- DB: addr="Jubilee Avenue, Mullumbimby", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:414m,city:mullumbimby,db-name-substring,jaccard:1.00], 414m, NSW 2482): name="Mullumbimby Golf Club", web=null, email="admin@mullumgolf.com.au", phone="02 6684 2273"
- OSM (high, 38m, sim=1): name="Mullumbimby Golf Club", web="https://www.mullumgolf.com.au", email=null, phone="+61 2 6684 2273"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 38m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mundaring Sporting Club (Australia, 1 courses)

- DB: addr="665 Coolgardie Street, Mundaring", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:16m,city:mundaring,db-name-substring,jaccard:1.00], 16m, WA 6073): name="Mundaring Sporting Club", web=null, email=null, phone="(08) 92951109"
- OSM (low, 549m, sim=1): name="Mundaring Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Mundubbera Golf Club (Australia, 1 courses)

- DB: addr="Frank McCauley Street, Mundubbera", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:273m,city:mundubbera,db-name-substring,jaccard:1.00], 273m, QLD 4626): name="Mundubbera Golf Club", web=null, email=null, phone="04 2765 4765"
- OSM (medium, 322m, sim=1): name="Mundubbera Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Mungindi Golf Club (Australia, 1 courses)

- DB: addr="Boomi Road, Mungindi", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.65[coord:1512m,db-name-substring,jaccard:1.00], 1512m, NSW 2406): name="Mungindi Golf Club", web=null, email=null, phone=null
- OSM (high, 14m, sim=1): name="Mungindi Golf Course", web=null, email=null, phone=null

### Munglinup Golf Club (Australia, 1 courses)

- DB: addr="Reynolds Road, Munglinup", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:188m,db-name-substring,jaccard:1.00], 188m, WA 6450): name="Munglinup Golf Club", web=null, email="munglinupgolfclub@gmail.com", phone="0417920908"
- OSM (high, 21m, sim=1): name="Munglinup Golf Club", web=null, email=null, phone="+61 8 9075 1011;+61 8 9071 2864"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Murchison Golf Club (Australia, 1 courses)

- DB: addr="Goulburn Valley Highway, Murchison East", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:36m,db-name-substring,jaccard:1.00], 36m, VIC ): name="Murchison Golf Club", web=null, email="murchisongolf@gmail.com", phone=null
- OSM (high, 12m, sim=1): name="Murchison Golf Club", web=null, email=null, phone="+61 3 5826 2473"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from osm(high, 12m, sim=1)

### Muree Golf Club (Australia, 1 courses)

- DB: addr="7 Walker Crescent, Raymond Terrace", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:332m,city:raymond,db-name-substring,jaccard:1.00], 332m, NSW 2324): name="Muree Golf Club", web="https://www.mureegolfclub.com.au/", email="luke.tranter@learsmith.com.au", phone="02 4987 2142"
- OSM (high, 13m, sim=1): name="Muree Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Murgon Golf Club (Australia, 1 courses)

- DB: addr="Bunya Hwy, Murgon", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:171m,city:murgon,db-name-substring,jaccard:1.00], 171m, QLD 4605): name="Murgon Golf Club", web="http://murgongolfclub.org/", email=null, phone="07 4168 1608"
- OSM (high, 53m, sim=1): name="Murgon Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Murgon Golf Club 18 Hole (Australia, 1 courses)

- DB: addr="194 Lamb St, Murgon", web=null, email=null, phone=null
- golf.com.au (high, sim=0.429, boost=+0.9[coord:171m,city:murgon,jaccard:0.67], 171m, QLD 4605): name="Murgon Golf Club", web="http://murgongolfclub.org/", email=null, phone="07 4168 1608"
- OSM (low, 53m, sim=0.429): name="Murgon Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.429)
  - phone: from fed(high, sim=0.429)

### Murrabit Golf Club (Australia, 1 courses)

- DB: addr="Murrabit Road, Murrabit", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:320m,db-name-substring,jaccard:1.00], 320m, VIC 3580): name="Murrabit Golf Club", web=null, email=null, phone="0418506481"
- OSM (high, 127m, sim=1): name="Murrabit Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Murray Bridge Golf Club (Australia, 2 courses)

- DB: addr="Ritter Street, Murray Bridge", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:325m,city:murray,db-name-substring,jaccard:1.00], 325m, SA 5253): name="Murray Bridge Golf Club", web="http://www.murraybridgegolfclub.com.au", email="accounts@murraybridgegolfclub.com.au", phone="(08) 8531 1388"
- OSM (high, 31m, sim=1): name="Murray Bridge Golf Club", web="https://murraybridgegolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Murray Downs Golf & Country Club (Australia, 2 courses)

- DB: addr=" Murray Downs Drive, Swan Hill", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:murray,db-name-substring,jaccard:1.00], 3961m, VIC 3585): name="Murray Downs Golf & Country Club", web="https://murraydownsresort.com.au", email="proshop@mdclubs.com.au", phone="03 5033 1422"
- OSM (low, 3720m, sim=1): name="Murray Downs Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Murrayville Golf Club (Australia, 2 courses)

- DB: addr="Recreation Reserve, Murrayville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:415m,db-name-substring,jaccard:1.00], 415m, VIC ): name="Murrayville Golf Club", web=null, email=null, phone="0401 962 544"
- OSM (low, 1022229m, sim=0.909): name="Murraville Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Murrumbidgee Country Club (Australia, 1 courses)

- DB: addr="Kambah Pool Rd, Kambah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:465m,city:kambah,db-name-substring,jaccard:1.00], 465m, ACT 2611): name="Murrumbidgee Country Club", web="https://www.murrumbidgeegolf.com.au", email=null, phone="6296 2888"
- OSM (high, 218m, sim=1): name="Murrumbidgee Golf Club", web="https://www.murrumbidgeegolf.com.au/", email=null, phone="+61 2 6296 2311;+61 2 6296 2888"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Murrunbidgee ACT Golfers Special Index (Australia, 1 courses)

- DB: addr="Kambah Pool Road, Kambah", web=null, email=null, phone=null
- golf.com.au (high, sim=0.289, boost=+0.75[coord:944m,city:kambah,typo:murrunbidgee~murrumbidgee], 944m, ACT 2611): name="Murrumbidgee Country Club", web="https://www.murrumbidgeegolf.com.au", email=null, phone="6296 2888"
- OSM (no-match, 1456m, sim=0.289): name="Murrumbidgee Golf Club", web="https://www.murrumbidgeegolf.com.au/", email=null, phone="+61 2 6296 2311;+61 2 6296 2888"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.289)
  - phone: from fed(high, sim=0.289)

### Murrurundi Golf Club (Australia, 1 courses)

- DB: addr="Paradise Street, Murrurundi", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:308m,city:murrurundi,db-name-substring,jaccard:1.00], 308m, NSW 2338): name="Murrurundi Golf Club", web=null, email=null, phone="(02) 6546 6038"
- OSM (high, 75m, sim=1): name="Murrurundi Golf Club", web=null, email="murrurundigolfclub@outlook.com", phone="+61 2 6546 6038"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from osm(high, 75m, sim=1)
  - phone: from fed(high, sim=1)

### Murtoa Golf Club (Australia, 1 courses)

- DB: addr="Murtoa Lubeck Road, Murtoa", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:495m,city:murtoa,db-name-substring,jaccard:1.00], 495m, VIC 3390): name="Murtoa Golf Club", web=null, email=null, phone="0466016374"
- OSM (high, 155m, sim=1): name="Murtoa Golf Club", web="http://murtoagolfclub.com", email=null, phone="+61 3 5385 2355"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 155m, sim=1)
  - phone: from fed(high, sim=1)

### Murwillumbah Golf Club (Australia, 1 courses)

- DB: addr="233 Byangum Road, Murwillumbah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:161m,city:murwillumbah,db-name-substring,jaccard:1.00], 161m, NSW 2484): name="Murwillumbah Golf Club", web="https://www.murwillumbahgolfclub.com.au", email=null, phone="02 6672 1799"
- OSM (high, 215m, sim=1): name="Murwillumbah Golf Club", web="https://www.murwillumbahgolfclub.com.au/", email=null, phone="+61 2 6672 4200;+61 2 6672 1799"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Muswellbrook Golf Club (Australia, 1 courses)

- DB: addr="3 Bell Street, Muswellbrook", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:841m,city:muswellbrook,db-name-substring,jaccard:1.00], 841m, NSW 2333): name="Muswellbrook Golf Club", web=null, email=null, phone="(02) 6543 1767"
- OSM (high, 72m, sim=1): name="Muswellbrook Golf Club", web="https://muswellbrookgolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 72m, sim=1)
  - phone: from fed(high, sim=1)

### Muttaburra Golf Club (Australia, 1 courses)

- DB: addr="Muttaburra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2870m,city:muttaburra,db-name-substring,jaccard:1.00], 2870m, QLD 4732): name="Muttaburra Golf Club", web=null, email=null, phone="0429474261"
- OSM (high, 4m, sim=1): name="Muttaburra Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Myrtleford Golf Club (Australia, 1 courses)

- DB: addr="Yackandandah Road, Myrtleford", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:266m,city:myrtleford,db-name-substring,jaccard:1.00], 266m, VIC 3737): name="Myrtleford Golf Club", web="http://www.myrtlefordgolf.com.au", email=null, phone="03 5752 2286"
- OSM (medium, 436m, sim=1): name="Myrtleford Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mystic Sands golf course (Australia, 1 courses)

- DB: addr="135 Ocean Parade, Balgal Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.73[coord:437m,city:balgal,jaccard:0.60], 437m, QLD 4816): name="Mystic Sands Golf Resort", web=null, email="Admin@Mysticsands.com.au", phone="07 4770 7355"
- OSM (high, 45m, sim=1): name="Mystic Sands Golf and Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Nagambie Golf Club (Australia, 1 courses)

- DB: addr="CEMETERY LANE, Nagambie", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:523m,city:nagambie,db-name-substring,jaccard:1.00], 523m, VIC 3608): name="Nagambie Golf Club", web="http://Nagambiegolfclub.com.au", email=null, phone="(03) 5794 2382"
- OSM (high, 124m, sim=1): name="Nagambie Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Nairne Golf Club (Australia, 1 courses)

- DB: addr="Oval Rd, Nairne", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:397m,city:nairne,db-name-substring,jaccard:1.00], 397m, SA 5252): name="Nairne Golf Club", web=null, email="nairnegolfclub@gmail.com", phone="0411 774 486"
- OSM (no-match, 2120372m, sim=0.667): name="Cairns Golf Club", web="https://cairnsgolfclub.com.au", email=null, phone="+61 7 4037 6700"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Nambour Golf Club (Australia, 1 courses)

- DB: addr="1051 Nambour Connection Road, Nambour", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:291m,city:nambour,db-name-substring,jaccard:1.00], 291m, QLD 4560): name="Nambour Golf Club", web="http://www.nambourgolfclub.com.au", email=null, phone="07 5441 2049"
- OSM (high, 54m, sim=1): name="Nambour Golf Club", web="https://www.nambourgolfclub.com.au/", email=null, phone="+61 7 5441 4413;+61 7 5441 2049"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Nambucca Heads Island Golf Club (Australia, 1 courses)

- DB: addr="Stuart Island, Nambucca Heads", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:133m,city:nambucca,db-name-substring,jaccard:1.00], 133m, NSW 2448): name="Nambucca Heads Island Golf Club", web="http://www.namgolf.com.au", email=null, phone="02 6569 4111"
- OSM (low, 509m, sim=1): name="Nambucca Heads Island Golf Club", web="https://www.namgolf.com/", email=null, phone="+61 2 6568 8172;+61 2 6569 4111"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Nanango Golf Club (Australia, 1 courses)

- DB: addr="Lot 14 Mills Way, Nanango", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2078m,city:nanango,db-name-substring,jaccard:1.00], 2078m, QLD 4615): name="Nanango Golf Club", web=null, email=null, phone="0407642521"
- OSM (low, 2525m, sim=1): name="Nanango Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Naracoorte Golf Club (Australia, 1 courses)

- DB: addr="Stewart Terrace, Naracoorte", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:27m,city:naracoorte,db-name-substring,jaccard:1.00], 27m, SA 5271): name="Naracoorte Golf Club", web="https://naracoortegolfclub.webflow.io/", email="office@naracoortegolf.com.au", phone="(08) 8762 2121"
- OSM (high, 33m, sim=1): name="Naracoorte Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Narooma Golf Club (Australia, 1 courses)

- DB: addr="1 Ballingalla Street, Narooma", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:958m,city:narooma,db-name-substring,jaccard:1.00], 958m, NSW 2546): name="Narooma Golf Club", web="http://www.naroomagolf.com.au", email=null, phone="(02) 4476 0500"
- OSM (low, 532m, sim=1): name="Narooma Golf Course", web="https://www.naroomagolf.com.au/", email=null, phone="+61 2 4476 0507;+61 2 4476 2522"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Narrabri Golf Club (Australia, 1 courses)

- DB: addr="Gibbons Street, Narrabri", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:878m,city:narrabri,db-name-substring,jaccard:1.00], 878m, NSW 2390): name="Narrabri Golf Club", web=null, email="golfie@clubnarrabri.com.au", phone="02 6792 2344"
- OSM (low, 1122m, sim=1): name="Narrabri Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Narrandera Golf Club (Australia, 1 courses)

- DB: addr="Racecourse Road, Narrandera", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:11m,city:narrandera,db-name-substring,jaccard:1.00], 11m, NSW 2700): name="Narrandera Golf Club", web=null, email=null, phone="02 6959 1327"
- OSM (low, 513m, sim=1): name="Narrandera Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Narromine Golf Club (Australia, 1 courses)

- DB: addr="Warren Road, Narromine", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:402m,city:narromine,db-name-substring,jaccard:1.00], 402m, NSW 2821): name="Narromine Golf Club", web=null, email=null, phone="6889 1179"
- OSM (high, 32m, sim=1): name="Narromine Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Nathalia Golf Club (Australia, 1 courses)

- DB: addr="Numurkah Road, Nathalia", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:nathalia,db-name-substring,jaccard:1.00], 4072m, VIC 3638): name="Nathalia Golf Club", web=null, email=null, phone="58662204"
- OSM (low, 4062m, sim=1): name="Nathalia Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Neangar Park Golf Club (Australia, 1 courses)

- DB: addr="7 Averys Road, Eaglehawk", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:87m,city:eaglehawk,db-name-substring,jaccard:1.00], 87m, VIC 3556): name="Neangar Park Golf Club", web=null, email=null, phone="03 5446 3670"
- OSM (high, 94m, sim=1): name="Neangar Park Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Nedlands Golf Club (Australia, 1 courses)

- DB: addr="Melvista Avenue, Nedlands", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:155m,city:nedlands,db-name-substring,jaccard:1.00], 155m, WA 6909): name="Nedlands Golf Club", web="https://www.nedlandsgolfclub.com.au/cms/", email="office@nedlandsgolfclub.com.au", phone="(08) 9389 1244"
- OSM (high, 87m, sim=1): name="Nedlands Golf Club", web="https://www.nedlandsgolfclub.com.au/", email=null, phone="+61 8 9389 1244"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Needilup Golf Club (Australia, 1 courses)

- DB: addr="Gnowangerup Jerramungup Road, Ongerup", web=null, email=null, phone=null
- golf.com.au (high, sim=0.375, boost=+0.75[coord:313m,city:ongerup,name-token:ongerup], 313m, WA 6336): name="Ongerup Golf Club", web=null, email=null, phone=null
- OSM (low, 307m, sim=0.375): name="Ongerup Golf Club", web=null, email=null, phone="+61 8 9828 2120;+61 8 9828 2282"

### Nelson Bay Golf Club (Australia, 9 courses)

- DB: addr="Dowling Street, Nelson Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:521m,city:nelson,db-name-substring,jaccard:1.00], 521m, NSW 2315): name="Nelson Bay Golf Club", web="http://www.nelsonbaygolf.com", email=null, phone="02 4981 1132"
- OSM (high, 80m, sim=1): name="Nelson Bay Golf Club", web="https://www.nelsonbaygolf.com/", email="golfclub@nelsonbaygolf.com.au", phone="+61 2 4981 1132"

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 80m, sim=1)
  - phone: from fed(high, sim=1)

### New Norfolk Golf Club (Australia, 2 courses)

- DB: addr="253 Back River Road, New Norfolk", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:326m,city:norfolk,db-name-substring,jaccard:1.00], 326m, TAS 7140): name="New Norfolk Golf Club", web="https://www.newnorfolkgolfclub.com/", email="nngc@newnorfolkgolfclub.com", phone="04 1736 5867"
- OSM (high, 48m, sim=1): name="New Norfolk Golf Club", web=null, email=null, phone="+61 3 6261 2653"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### New Town Bay Golf Club (Australia, 2 courses)

- DB: addr="258 Risdon Road Lutana, Hobart", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:129m,city:lutana,db-name-substring,jaccard:1.00], 129m, TAS 7009): name="New Town Bay Golf Club", web="https://www.newtownbaygc.com.au/", email=null, phone="03 6228 6415"
- OSM (high, 1m, sim=1): name="New Town Bay Golf Club", web="https://newtownbaygc.com/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Newcastle Golf Club (Australia, 1 courses)

- DB: addr="4 Vardon Road, Fern Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:432m,city:fern,db-name-substring,jaccard:1.00], 432m, NSW 2295): name="Newcastle Golf Club", web="http://www.newcastlegolf.com.au", email=null, phone="02 4928 1365"
- OSM (high, 64m, sim=1): name="Newcastle Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Newdegate Golf Club (Australia, 1 courses)

- DB: addr="Magenta Road, Newdegate", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:147m,city:newdegate,db-name-substring,jaccard:1.00], 147m, WA 6355): name="Newdegate Golf Club", web=null, email=null, phone="+61439880378"
- OSM (high, 55m, sim=1): name="Newdegate Country Club", web=null, email=null, phone="+61 8 9871 1583"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Newry Golf Club (Australia, 1 courses)

- DB: addr="Three Chain Road, Newry", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:125m,db-name-substring,jaccard:1.00], 125m, VIC 3860): name="Newry Golf Club", web=null, email=null, phone="03 51430838"
- OSM (high, 107m, sim=1): name="Newry Golf Club", web=null, email=null, phone="+61 3 5145 1365"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Nokaning Golf Club (Australia, 1 courses)

- DB: addr="North Nangeenan Road, Merredin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:514m,city:merredin,db-name-substring,jaccard:1.00], 514m, WA 6415): name="Nokaning Golf Club", web=null, email=null, phone="0438790833"
- OSM (low, 49m, sim=0.667): name="Nokaning Golf Club Inc.", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Noosa Golf Club (Australia, 1 courses)

- DB: addr="Cooroy Noosa Road, Tewantin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:tewantin,db-name-substring,jaccard:1.00], 3937m, QLD 4565): name="Noosa Golf Club", web="http://www.noosagolf.com.au", email="admin@noosagolf.com.au", phone="07 5447 1407"
- OSM (high, 15m, sim=1): name="Noosa Golf Club", web="https://www.noosagolf.com.au/", email=null, phone="+61 7 5447 1910"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Noosa Hills Par 3 Golf Course (Australia, 2 courses)

- DB: addr="3 Hollett Road, Noosaville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:204m,db-name-substring,jaccard:1.00], 204m, QLD 4566): name="Noosa Hills Par 3 Golf Course", web=null, email=null, phone="0402092332"
- OSM (no-match, 1415585m, sim=0.529): name="Sale Par 3 Golf Course", web=null, email=null, phone="+61 3 5144 5655"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Noosa Par 3 Golf Course (Australia, 4 courses)

- DB: addr="3 Hollett Road, Noosaville", web=null, email=null, phone=null
- golf.com.au (high, sim=0.647, boost=+0.63[coord:204m,jaccard:0.75], 204m, QLD 4566): name="Noosa Hills Par 3 Golf Course", web=null, email=null, phone="0402092332"
- OSM (no-match, 4627m, sim=0.583): name="Noosa Valley Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.647)

### Noosa Springs Golf & Spa Resort (Australia, 1 courses)

- DB: addr="Links Drive, Noosa Heads", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:407m,city:noosa,db-name-substring,jaccard:1.00], 407m, QLD 4567): name="Noosa Springs Golf & Spa Resort", web="http://www.noosasprings.com.au", email=null, phone="07 5440 3333"
- OSM (low, 599m, sim=0.765): name="Noosa Springs", web="https://www.noosasprings.com.au/", email=null, phone="+61 7 5440 3333"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Norfolk Island Golf Club (Australia, 1 courses)

- DB: addr="Quality Row, Kingston", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:254m,db-name-substring,jaccard:1.00], 254m, NSW 2899): name="Norfolk Island Golf Club", web="https://www.norfolkislandgolf.com", email="nigolfclub@ni.net.nf", phone="0011 6723 23603"
- OSM (high, 130m, sim=1): name="Norfolk Island Golf Club", web="https://www.norfolkislandgolf.com/", email=null, phone="+672 3 22354"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Norseman Golf Club (Australia, 1 courses)

- DB: addr="Coolgardie Esperance Hwy, Norseman", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:716m,city:norseman,db-name-substring,jaccard:1.00], 716m, WA 6443): name="Norseman Golf Club", web=null, email=null, phone="0890391102"
- OSM (medium, 320m, sim=1): name="Norseman Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### North Adelaide Golf Course (Australia, 3 courses)

- DB: addr="Strangways Terrace, North Adelaide", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1019m,city:north,db-name-substring,jaccard:1.00], 1019m, SA ): name="North Adelaide Golf Course", web=null, email="teeoff@northadelaidegolf.com.au", phone=null
- OSM (low, 731m, sim=1): name="North Adelaide Golf Course", web="https://northadelaidegolf.com.au/", email="teeoff@northadelaidegolf.com.au", phone="+61 8 8203 7888"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)

### North Haven Golf Club (Australia, 1 courses)

- DB: addr="Lady Ruthven Dr, Outer Harbour", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:96m,city:outer,db-name-substring,jaccard:1.00], 96m, SA 5015): name="North Haven Golf Club", web=null, email="secretary.northhavengc@gmail.com", phone="(08) 8248 1049"
- OSM (high, 38m, sim=1): name="North Haven Golf Club", web="http://www.btmgolf.com.au/new_nth_haven_home/", email=null, phone="+61 8 8248 3832"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 38m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### North Rockhampton Golf Club (Australia, 3 courses)

- DB: addr="131 Richardson Road, Kawana", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:691m,city:kawana,db-name-substring,jaccard:1.00], 691m, QLD 4701): name="North Rockhampton Golf Club", web=null, email=null, phone="07 4927 7766"
- OSM (high, 2m, sim=1): name="North Rockhampton Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### North Ryde Golf Club (Australia, 1 courses)

- DB: addr="Twin Road, North Ryde", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:185m,city:north,db-name-substring,jaccard:1.00], 185m, NSW 2113): name="North Ryde Golf Club", web="http://www.northrydegolfclub.com.au", email=null, phone="9887 4422"
- OSM (high, 42m, sim=1): name="North Ryde Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### North Star Golf Club (Australia, 1 courses)

- DB: addr="4550 S Bagley Rd, Ithaca", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:94m,db-name-substring,jaccard:1.00], 94m, NSW 2402): name="North Star Golf Club", web=null, email=null, phone="07 4676 3183"
- OSM (no-match, 1589586m, sim=0.643): name="North West Bay Golf Club", web="https://northwestbaygolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### North Stradbroke Island Golf Club (Australia, 1 courses)

- DB: addr="North Stradbroke Island Hwy, Dunwich", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:dunwich,db-name-substring,jaccard:1.00], 4268m, QLD 4183): name="North Stradbroke Island Golf Club", web="http://www.northstradbrokeislandgolfclub.com.au", email="info@northstradbrokeislandgolfclub.com.au", phone="07 3409 9999"
- OSM (low, 3812m, sim=1): name="North Stradbroke Island Golf Club", web="https://www.northstradbrokeislandgolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### North West Bay Golf Club (Australia, 2 courses)

- DB: addr="Channel Highway, Margate", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:3m,city:margate,db-name-substring,jaccard:1.00], 3m, TAS 7051): name="North West Bay Golf Club", web="https://northwestbaygolfclub.com.au", email="admin@northwestbaygolfclub.com.au", phone="03 6267 2166"
- OSM (high, 0m, sim=1): name="North West Bay Golf Club", web="https://northwestbaygolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Northam Golf Club (Australia, 1 courses)

- DB: addr="Buckland Street, Northam", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:394m,city:northam,jaccard:0.50], 394m, WA 6401): name="Northam Country Golf Club", web=null, email=null, phone="(08) 9622 1050"
- OSM (high, 11m, sim=1): name="Northam Golf Club", web="http://ourgolfclub.com.au/golf/?course=northam", email=null, phone="+61 8 9622 1050"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 11m, sim=1)
  - phone: from fed(high, sim=1)

### Northampton Golf Club (Australia, 1 courses)

- DB: addr="Stephen Street, Northampton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:333m,city:northampton,db-name-substring,jaccard:1.00], 333m, WA 6535): name="Northampton Golf Club", web=null, email=null, phone="(08) 9934 2777"
- OSM (high, 14m, sim=1): name="Northampton Golf Club", web=null, email=null, phone="+61 8 9934 1144;+61 8 9934 1357"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Northbridge Golf Club (Australia, 1 courses)

- DB: addr="296C Sailors Bay Road, Northbridge", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:355m,city:northbridge,db-name-substring,jaccard:1.00], 355m, NSW 2063): name="Northbridge Golf Club", web="http://www.northbridgegolfclub.com.au", email="admin@northbridgegolfclub.com.au", phone="02 9958 6900"
- OSM (high, 124m, sim=1): name="Northbridge Golf Club", web="https://northbridgegolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Northcote Municipal Golf Links (Australia, 2 courses)

- DB: addr="143 Normanby Avenue, Thornbury", web=null, email=null, phone=null
- golf.com.au (high, sim=0.474, boost=+0.7[coord:78m,city:thornbury], 78m, VIC 3072): name="Northcote Golf Club", web="http://northcotegolfclub.com", email="ngc@northcotegolfclub.com", phone="0417 573 876"
- OSM (low, 311m, sim=0.474): name="Northcote Public Golf Course", web="https://www.northcotegolfclub.com/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.474)
  - email: from fed(high, sim=0.474)
  - phone: from fed(high, sim=0.474)

### Northern Golf Club (Australia, 1 courses)

- DB: addr="97 Glenroy Rd, Glenroy", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:480m,city:glenroy,db-name-substring,jaccard:1.00], 480m, VIC 3046): name="Northern Golf Club", web=null, email="admin@northerngc.com.au", phone="03 93061677"
- OSM (high, 70m, sim=1): name="Northern Golf Club", web="https://northerngc.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 70m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Nowra Golf Club (Australia, 2 courses)

- DB: addr="Fairway Drive, North Nowra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:193m,city:nowra,jaccard:0.67], 193m, NSW 2541): name="Nowra Golf and Recreation Club", web="http://www.nowragolf.com.au", email="info@nowragolf.com.au", phone="02 4421 3900"
- OSM (high, 51m, sim=1): name="Nowra Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Nudgee Golf Club (Australia, 2 courses)

- DB: addr="1207 Nudgee Road, Nudgee", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:215m,city:nudgee,db-name-substring,jaccard:1.00], 215m, QLD 4014): name="Nudgee Golf Club", web="https://www.nudgeegolf.com.au", email=null, phone="07 3267 7744"
- OSM (high, 15m, sim=1): name="Nudgee Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Numurkah Golf & Bowls Club Inc (Australia, 1 courses)

- DB: addr="Tunnock Road, ,  Numurkah", web=null, email=null, phone=null
- golf.com.au (high, sim=0.444, boost=+0.9[coord:154m,city:numurkah,jaccard:0.67], 154m, VIC 3636): name="Numurkah Golf Club", web=null, email=null, phone="03 58623445"
- OSM (high, 237m, sim=0.778): name="Numurkah Golf and Bowls Club", web="https://ngbc.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 237m, sim=0.778)
  - phone: from fed(high, sim=0.444)

### Numurkah Golf Club (Australia, 1 courses)

- DB: addr="Tunnock Road, Nichols Point", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:154m,db-name-substring,jaccard:1.00], 154m, VIC 3636): name="Numurkah Golf Club", web=null, email=null, phone="03 58623445"
- OSM (low, 237m, sim=0.571): name="Numurkah Golf and Bowls Club", web="https://ngbc.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Nundle Golf Club (Australia, 2 courses)

- DB: addr="Crosby Street, Nundle", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:222m,city:nundle,db-name-substring,jaccard:1.00], 222m, NSW 2340): name="Nundle Golf Club", web=null, email=null, phone="0427693364"
- OSM (high, 43m, sim=1): name="Nundle Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Nyabing Golf Club (Australia, 1 courses)

- DB: addr="Dumbleyung Road, Nyabing", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:nyabing,db-name-substring,jaccard:1.00], 4003m, WA 6341): name="Nyabing Golf Club", web=null, email=null, phone="0437272972"
- OSM (high, 53m, sim=1): name="Nyabing Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Nyah District Golf Club (Australia, 1 courses)

- DB: addr="Murray Valley Highway, Nyah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1012m,city:nyah,db-name-substring,jaccard:1.00], 1012m, VIC 3594): name="Nyah District Golf Club", web=null, email=null, phone="0350302396"
- OSM (high, 109m, sim=1): name="Nyah District Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Nyngan Golf Club (Australia, 1 courses)

- DB: addr="Tottenham Road, Nyngan", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:42m,city:nyngan,db-name-substring,jaccard:1.00], 42m, NSW 2825): name="Nyngan Golf Club", web=null, email=null, phone="6832 1127"
- OSM (medium, 404m, sim=1): name="Nyngan Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Oakbank Golf Club (Australia, 2 courses)

- DB: addr="Smith Street, Oakbank", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:101m,city:oakbank,db-name-substring,jaccard:1.00], 101m, SA 5243): name="Oakbank Golf Club", web="http://www.oakbankgolfclub.com.au", email="obgc@bigpond.net.au", phone="(08) 8391 3669"
- OSM (high, 36m, sim=1): name="Oakbank Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Oakey Golf Club (Australia, 2 courses)

- DB: addr="290 Boundary Road, Oakey", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:317m,db-name-substring,jaccard:1.00], 317m, QLD 4401): name="Oakey Golf Club", web="http://oakeygolfclub.com.au", email=null, phone="07 46922158"
- OSM (high, 117m, sim=1): name="Oakey Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Oaklands Golf Club (Australia, 2 courses)

- DB: addr="Hunter Street, Oaklands", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:324m,city:oaklands,db-name-substring,jaccard:1.00], 324m, NSW 2646): name="Oaklands Golf Club", web=null, email=null, phone="0428354138"
- OSM (high, 67m, sim=1): name="Oaklands Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Oakleigh Golf Club (Australia, 2 courses)

- DB: addr="Park Road,, Oakleigh", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.25[coord:2771m,jaccard:0.50], 2771m, VIC 3148): name="Oakleigh Public Golf Course", web=null, email=null, phone="03 9568 3307"
- OSM (low, 37m, sim=0.167): name="The Metropolitan Golf Club", web="https://www.metropolitangolf.com.au/", email=null, phone="+61 3 9570 3774"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Oakwood Park Golf Club (Australia, 2 courses)

- DB: addr="95 Cummins Street, Bundaberg North", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:408m,city:bundaberg,db-name-substring,jaccard:1.00], 408m, QLD 4670): name="Oakwood Park Golf Club", web=null, email=null, phone="(07) 4152 0659"
- OSM (high, 42m, sim=1): name="Oakwood Park Golf Course", web="https://sites.google.com/site/oakwoodparkgolfclub/", email=null, phone="+61 7 4152 0659"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 42m, sim=1)
  - phone: from fed(high, sim=1)

### Oberon Golf Club (Australia, 1 courses)

- DB: addr="Ross st, P.O. Box 30, Oberon ", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:8m,city:oberon,db-name-substring,jaccard:1.00], 8m, NSW 2787): name="Oberon Golf Club", web=null, email=null, phone="02 6336 0262"
- OSM (medium, 419m, sim=1): name="Oberon Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Ocean Dunes Golf Course (Australia, 1 courses)

- DB: addr="396 North Road, Loorana, King Island, TAS 7256, King Island", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.65[coord:881m,plz:7256,jaccard:0.50], 881m, TAS 7256): name="Ocean Dunes", web=null, email=null, phone="0404 764 851"
- OSM (low, 851m, sim=1): name="Ocean Dunes", web="https://www.oceandunes.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Ocean Grove Golf Club (Australia, 1 courses)

- DB: addr="9 Guthridge Street, Ocean Grove", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:71m,city:ocean,db-name-substring,jaccard:1.00], 71m, VIC 3220): name="Ocean Grove Golf Club", web="http://www.oceangrovegc.com.au", email=null, phone="03 5256 2795"
- OSM (medium, 421m, sim=1): name="Ocean Grove Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ocean Shores Country Club (Australia, 2 courses)

- DB: addr="Orana Rd., Ocean Shores", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:696m,city:ocean,db-name-substring,jaccard:1.00], 696m, NSW 2483): name="Ocean Shores Country Club", web="https://oceanshorescc.com.au", email="info@oceanshorescc.com.au", phone="02 6680 1008"
- OSM (low, 939m, sim=1): name="Ocean Shores Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Olinda Golf Club (Australia, 1 courses)

- DB: addr="75 Olinda-Monbulk Rd, Olinda", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:294m,db-name-substring,jaccard:1.00], 294m, VIC 3788): name="Olinda Golf Club", web="https://olindagolfclub.org.au", email=null, phone="0428421892"
- OSM (no-match, 2280601m, sim=0.571): name="Babinda Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Omeo Golf Club (Australia, 1 courses)

- DB: addr="Stanley Drive, Omeo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:191m,city:omeo,db-name-substring,jaccard:1.00], 191m, VIC 3898): name="Omeo Golf Club", web=null, email="omeogolfclub@gmail.com", phone="03 5159 1355"
- OSM (high, 21m, sim=1): name="Omeo Golf Club", web="http://www.omeoregion.com.au/index.php?option=com_sobi2&sobi2Task=sobi2Details&catid=57&sobi2Id=135&Itemid=75", email="omeogolfclub@gmail.com", phone="+61 3 5159 1247;+61 3 5159 1356"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 21m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### One Mile Country Club (Australia, 1 courses)

- DB: addr="Youngs Crossing Road, Lawnton", web=null, email=null, phone=null
- golf.com.au (low, sim=0.4, boost=+0.4[coord:179m], 179m, QLD 4500): name="North Pine Golf Club", web=null, email=null, phone=null
- OSM (high, 16m, sim=1): name="One Mile Country Club", web=null, email=null, phone=null

### Onkaparinga Golf Club (Australia, 1 courses)

- DB: addr="Oakbank, Batlow", web=null, email=null, phone=null
- golf.com.au (high, sim=0.364, boost=+0.75[coord:392m,city:oakbank,name-token:oakbank], 392m, SA 5243): name="Oakbank Golf Club", web="http://www.oakbankgolfclub.com.au", email="obgc@bigpond.net.au", phone="(08) 8391 3669"
- OSM (low, 442m, sim=0.364): name="Oakbank Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.364)
  - email: from fed(high, sim=0.364)
  - phone: from fed(high, sim=0.364)

### Orbost Golf Club (Australia, 1 courses)

- DB: addr="96 Bonang Highway, Orbost", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:437m,city:orbost,db-name-substring,jaccard:1.00], 437m, VIC 3888): name="Orbost Golf Club", web="http://www.orbostgolf.com", email="golf3888@bigpond.net.au", phone="0418380058"
- OSM (high, 101m, sim=1): name="Orbost Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Orford Golf Club (Australia, 2 courses)

- DB: addr="75 Tasman Highway, Orford ", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:183m,city:orford,db-name-substring,jaccard:1.00], 183m, TAS 7190): name="Orford Golf Club", web="http://www.orfordgolfclub.com.au", email="admin@orfordgolfclub.com.au", phone="362571249"
- OSM (high, 84m, sim=1): name="Orford Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Orroroo Golf Club (Australia, 1 courses)

- DB: addr="Main Road, Orroroo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:923m,city:orroroo,db-name-substring,jaccard:1.00], 923m, SA 5431): name="Orroroo Golf Club", web=null, email=null, phone="(08) 8658 1128"
- OSM (no-match, 1360662m, sim=0.571): name="Orford Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Ouse Golf Club (Australia, 3 courses)

- DB: addr="6850 Lyell Hwy, Ouse", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:248m,city:ouse,db-name-substring,jaccard:1.00], 248m, TAS 7140): name="Ouse Golf Club", web="https://www.facebook.com/profile.php?id=61555407485806", email=null, phone="(03) 6287 1219"
- OSM (high, 60m, sim=1): name="Ouse Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ouyen Golf Club (Australia, 1 courses)

- DB: addr="Dakers Street, Ouyen", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:12m,city:ouyen,db-name-substring,jaccard:1.00], 12m, VIC 3490): name="Ouyen Golf Club", web=null, email="secretary@ouyengolfclub.com.au", phone="0350921068"
- OSM (medium, 436m, sim=1): name="Ouyen Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Owen Golf Club (Australia, 1 courses)

- DB: addr="North West Terrace, Owen", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:176m,city:owen,db-name-substring,jaccard:1.00], 176m, SA 5460): name="Owen Golf Club", web=null, email=null, phone="(08) 8528 6039"
- OSM (high, 58m, sim=1): name="Owen Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Oxley Golf Club (Australia, 2 courses)

- DB: addr="290 Boundary Road, Oxley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:315m,city:oxley,db-name-substring,jaccard:1.00], 315m, QLD 4075): name="Oxley Golf Club", web="https://www.oxleygolfclub.com.au", email="golf@oxleygolfclub.com.au", phone="07 3379 6322"
- OSM (medium, 317m, sim=1): name="Oxley Golf Club", web="https://www.oxleygolfclub.com.au/", email="admin@oxleygolfclub.com.au", phone="+61 7 3379 6322"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Pacific Dunes (Australia, 1 courses)

- DB: addr="Huntingdale Place, Medowie", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.15[coord:147m,city:medowie,db-name-substring,jaccard:0.67], 147m, NSW 2318): name="Pacific Dunes Golf Club", web="http://www.pacificdunes.com.au", email=null, phone="02 4916 0500"
- OSM (high, 143m, sim=1): name="Pacific Dunes Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Pacific Golf Club (Australia, 1 courses)

- DB: addr="430 Pine Mountain Road, Carindale ", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:506m,city:carindale,db-name-substring,jaccard:1.00], 506m, QLD 4122): name="Pacific Golf Club", web="https://pacificgolf.com.au/", email=null, phone="07 3343 0888"
- OSM (high, 97m, sim=1): name="Pacific Golf Club", web="https://www.pacificgolf.com.au/", email=null, phone="+61 7 3343 0888"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Palm Beach Golf Club (Australia, 1 courses)

- DB: addr="2 Beach Road, Palm Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=0.714, boost=+1.25[coord:22m,city:palm,db-name-substring,jaccard:1.00], 22m, NSW 2108): name="Palm Beach Golf Club Ltd", web="http://www.palmbeachgolf.com.au", email=null, phone="02 9974 4079"
- OSM (medium, 268m, sim=1): name="Palm Beach Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.714)
  - phone: from fed(high, sim=0.714)

### Palm Meadows Golf Course (Australia, 2 courses)

- DB: addr="Palm Meadows Drive, Carrara", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:189m,city:carrara,db-name-substring,jaccard:1.00], 189m, QLD 4217): name="Palm Meadows Golf Course", web="http://www.palmmeadows.com.au", email=null, phone="(07) 5594 2450"
- OSM (medium, 359m, sim=1): name="Palm Meadows Golf Course", web="https://www.palmmeadows.com.au/", email=null, phone="+61 7 5594 2450"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Palmer Colonial Golf Course (Australia, 1 courses)

- DB: addr="Paradise Springs Ave, Robina", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:487m,city:robina,jaccard:0.50], 487m, QLD 4226): name="Palmer Colonial", web="http://www.thecolonialgc.com.au", email=null, phone="(07) 5593 2777"
- OSM (high, 20m, sim=1): name="Palmer Colonial Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Palmer Coolum Resort (Australia, 2 courses)

- DB: addr="Warran Road, Coolum Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:400m,city:coolum,db-name-substring,jaccard:1.00], 400m, QLD 4573): name="Palmer Coolum Resort", web="https://www.palmercoolumresort.com.au", email="golf@palmercolumresort.com.au", phone="07 5449 33366"
- OSM (low, 349m, sim=0.182): name="Beachside Championship Golf Course", web="https://palmercoolumresort.com.au/", email=null, phone="+61 7 5446 1234"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Palmer Gold Coast (Australia, 1 courses)

- DB: addr="Ron Penhaligon Way, Robina", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:588m,city:robina,db-name-substring,jaccard:1.00], 588m, QLD 4226): name="Palmer Gold Coast", web="http://www.palmergolf.com.au", email=null, phone="(07) 5617 4600"
- OSM (low, 413m, sim=0.567): name="Palmer Gold Coast (Robina Woods) Golf Club", web="http://robinawoods.au-golf.net/", email=null, phone="+61 7 5593 1766"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Palmerston Golf & Country Club (Australia, 2 courses)

- DB: addr="University Avenue & Dwyer Circuit, Driver", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.6[coord:18m,jaccard:0.67], 18m, NT 0831): name="Palmerston Golf Club", web="https://www.palmerstongolfcourse.com.au", email="committee@palmerstongolfclub.com.au", phone="0447 296 449"
- OSM (high, 157m, sim=1): name="Palmerston Golf Course", web="https://www.palmerstongolfcourse.com.au/", email=null, phone="+61 8 8932 2681"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Pambula Merimbula Golf Club (Australia, 3 courses)

- DB: addr="173 Arthur Kaine Drive, Merimbula", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1[coord:74m,city:merimbula,jaccard:1.00], 74m, NSW 2548): name="Pambula-Merimbula Golf Club", web="http://www.merimbulagolf.com.au", email=null, phone="(02) 6495 6154"
- OSM (low, 758m, sim=1): name="Pambula Merimbula Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Paradise Palms Golf Course (Australia, 1 courses)

- DB: addr="Paradise Palms Drive, Clifton Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:711m,city:clifton,db-name-substring,jaccard:1.00], 711m, QLD 4878): name="Paradise Palms Golf Course", web="http://www.paradisepalms.com.au", email=null, phone="(07) 4059 9901"
- OSM (no-match, 900321m, sim=0.5): name="Reef Palms Golf Course", web="http://reefpalmsresort.com.au/golf-leisure/golf/", email=null, phone="+61 7 4938 7777"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Parkes Golf Club (Australia, 1 courses)

- DB: addr="London Road, Parkes", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:496m,city:parkes,db-name-substring,jaccard:1.00], 496m, NSW 2870): name="Parkes Golf Club", web="http://www.parkesgolfclub.com.au", email=null, phone="02 6862 2044"
- OSM (high, 126m, sim=1): name="Parkes Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Parklands Golf Club (Australia, 1 courses)

- DB: addr="Corner of Boundary & Hemmsley Park Roads, Hamilton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:572m,city:hamilton,db-name-substring,jaccard:1.00], 572m, VIC 3300): name="Parklands Golf Club", web=null, email=null, phone="(03) 5572 5729"
- OSM (high, 113m, sim=1): name="Parklands Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Parkwood International Golf Course (Australia, 3 courses)

- DB: addr="75-122 Napper Road, Parkwood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.78[coord:865m,city:parkwood,jaccard:0.75], 865m, QLD 4214): name="Parkwood International Golf Club", web="http://www.parkwoodgc.com.au", email="golfoperations@parkwoodgc.com.au", phone="(07) 5563 3342"
- OSM (medium, 326m, sim=1): name="Parkwood International Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Parndana Golf Club (Australia, 1 courses)

- DB: addr="Playford Highway, Parndana", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:475m,db-name-substring,jaccard:1.00], 475m, SA 5220): name="Parndana Golf Club", web=null, email="andrewhenderson65@msn.com", phone="08 85530021"
- OSM (high, 12m, sim=1): name="Parndana Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Parramatta Golf Club (Australia, 1 courses)

- DB: addr="Park Parade, Parramatta", web=null, email=null, phone=null
- golf.com.au (high, sim=0.667, boost=+0.85[coord:186m,db-name-substring,jaccard:0.67], 186m, NSW 2114): name="Ryde Parramatta Golf Club", web="http://www.rydeparramatta.com.au", email=null, phone="(02) 9874 1204"
- OSM (low, 556m, sim=0.667): name="Ryde Parramatta Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.667)
  - phone: from fed(high, sim=0.667)

### Patchewollock Golf Club (Australia, 1 courses)

- DB: addr="Baring Road, Patchewollock", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:340m,city:patchewollock,db-name-substring,jaccard:1.00], 340m, VIC 3491): name="Patchewollock Golf Club", web=null, email=null, phone="0350841276"
- OSM (high, 67m, sim=1): name="Patchewollock Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Paterson Golf Club (Australia, 1 courses)

- DB: addr="80 Webbers Creek Road, Paterson", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:205m,city:paterson,db-name-substring,jaccard:1.00], 205m, NSW 2421): name="Paterson Golf Club", web=null, email="patersongolfclub@bigpond.com", phone="4938 5828"
- OSM (high, 131m, sim=1): name="Paterson Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Patterson River (Australia, 1 courses)

- DB: addr="The Fairway, Bonbeach", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:2432m,city:bonbeach,db-name-substring,jaccard:0.67], 2432m, VIC 3196): name="Patterson River Golf Club", web="http://www.pattersonriver.com.au", email="membership@pattersonriver.com.au", phone="03 9772 1855"
- OSM (low, 444m, sim=0.2): name="Cornish Links", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Patterson River Golf Club (Australia, 2 courses)

- DB: addr="The Fairway Bon Beach, Bonbeach", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:434m,city:bonbeach,db-name-substring,jaccard:1.00], 434m, VIC 3196): name="Patterson River Golf Club", web="http://www.pattersonriver.com.au", email="membership@pattersonriver.com.au", phone="03 9772 1855"
- OSM (high, 44m, sim=1): name="Patterson River Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Pelican Waters Golf Club (Australia, 2 courses)

- DB: addr="40 Mahogany Drive, Pelican Waters", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:410m,city:pelican,db-name-substring,jaccard:1.00], 410m, QLD 4551): name="Pelican Waters Golf Club", web="https://www.pelicanwatersgolfclub.com.au", email="reception@pelicangolf.com.au", phone="07 5437 5000"
- OSM (medium, 354m, sim=1): name="Pelican Waters Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Pemberton Golf Club (Australia, 1 courses)

- DB: addr="Golf Links Road, Pemberton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:271m,city:pemberton,db-name-substring,jaccard:1.00], 271m, WA 6260): name="Pemberton Golf Club", web="https://www.facebook.com/PembertonGolfClub", email=null, phone=null
- OSM (high, 155m, sim=1): name="Pemberton Golf Club", web=null, email=null, phone="+61 8 9776 1455;+61 8 9776 1261"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from osm(high, 155m, sim=1)

### Penguin Golf Club (Australia, 3 courses)

- DB: addr="Sports Complex Road, Penguin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:305m,city:penguin,db-name-substring,jaccard:1.00], 305m, TAS 7316): name="Penguin Golf Club", web="http://www.penguingolfclub.com.au", email="info@penguingolfclub.com.au", phone="03 6437 2029"
- OSM (high, 211m, sim=1): name="Penguin Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Peninsula Kingswood Country Golf Club (Australia, 2 courses)

- DB: addr="211-279 Skye Road, Frankston", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.47[coord:394m,jaccard:0.75], 394m, VIC 3199): name="Peninsula-Kingswood Golf Club", web=null, email="proshop@peninsualkingswood.com.au", phone="03 9789 2222"
- OSM (high, 9m, sim=1): name="Peninsula Kingswood Country Golf Club", web="https://www.peninsulakingswood.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 9m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Pennant Hills Golf Club (Australia, 1 courses)

- DB: addr="Cnr Copeland & Burns Road, Beecroft", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:347m,city:beecroft,db-name-substring,jaccard:1.00], 347m, NSW 2119): name="Pennant Hills Golf Club", web="http://www.pennanthillsgolfclub.com.au", email=null, phone="02 8860 5800"
- OSM (high, 22m, sim=1): name="Pennant Hills Golf Course", web="https://www.pennanthillsgolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Penneshaw Golf Club (Australia, 1 courses)

- DB: addr="MARY SEYMOUR LANE, PENNESHAW", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:255m,city:penneshaw,db-name-substring,jaccard:1.00], 255m, SA 5222): name="Penneshaw Golf Club", web=null, email=null, phone="0429013503"
- OSM (high, 21m, sim=1): name="Penneshaw Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Penola Golf Club (Australia, 1 courses)

- DB: addr="Mt Gambier Road, Penola", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:240m,city:penola,db-name-substring,jaccard:1.00], 240m, SA 5277): name="Penola Golf Club", web=null, email="penolagolfclub@gmail.com", phone="(08) 8737 2484"
- OSM (high, 82m, sim=1): name="Penola Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Penrith Golf Club (Australia, 2 courses)

- DB: addr="1939 The Northern Road, Penrith ", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:251m,city:penrith,jaccard:0.67], 251m, NSW 2750): name="Penrith Golf and Recreation Club", web="http://www.penrithgolfclub.com.au", email=null, phone="02 4736 1633"
- OSM (high, 34m, sim=1): name="Penrith Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Peregian Springs Golf Club (Australia, 1 courses)

- DB: addr="Peregian Springs Golf Club, Peregian Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:318m,city:peregian,db-name-substring,jaccard:1.00], 318m, QLD 4573): name="Peregian Springs Golf Club", web=null, email=null, phone=null
- OSM (high, 164m, sim=1): name="Peregian Springs Golf Club", web="http://www.peregianspringsgolfclub.com.au/", email=null, phone="+61 7 5471 5400"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 164m, sim=1)
  - phone: from osm(high, 164m, sim=1)

### Perenjori Golf Club (Australia, 1 courses)

- DB: addr="Fowler Street, Perenjori", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:326m,city:perenjori,db-name-substring,jaccard:1.00], 326m, WA 6620): name="Perenjori Golf Club", web=null, email=null, phone="0499731098"
- OSM (high, 19m, sim=1): name="Perenjori Golf Club", web=null, email=null, phone="+61 8 9973 1038;+61 8 9973 1034"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Peterborough Golf Club (Australia, 2 courses)

- DB: addr="Park Street, Peterborough", web=null, email=null, phone=null
- golf.com.au (high, sim=0.8, boost=+1.1[coord:505m,city:peterborough,db-name-substring,jaccard:1.00], 505m, SA 5422): name="Peterborough Golf Club (SA)", web=null, email="petergc@gmail.com", phone="0408271248"
- OSM (high, 103m, sim=1): name="Peterborough Golf Club", web="http://www.golfsa.com.au/playgolf-display/peterborough-golf-club/1733", email=null, phone="+61 8 8651 2012;+61 3 5598 5245"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 103m, sim=1)
  - email: from fed(high, sim=0.8)
  - phone: from fed(high, sim=0.8)

### Pine Rivers Golf Club (Australia, 1 courses)

- DB: addr="245 Narangba Road, Kurwongbah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:213m,city:kurwongbah,db-name-substring,jaccard:1.00], 213m, QLD 4503): name="Pine Rivers Golf Club", web="http://www.pineriversgolfclub.com.au", email="operations@pineriversgolfclub.com.au", phone="3285 3130"
- OSM (high, 43m, sim=1): name="Pine Rivers Golf Club", web="https://www.pineriversgolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Pingelly Golf Club (Australia, 1 courses)

- DB: addr="Review Street, Pingelly", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:210m,city:pingelly,db-name-substring,jaccard:1.00], 210m, WA 6308): name="Pingelly Golf Club", web=null, email="pingellygolfclub@bigpond.com", phone="(08) 9887 1398"
- OSM (high, 120m, sim=1): name="Pingelly Golf Club", web=null, email=null, phone="+61 8 9887 1398"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Pingrup Golf Club (Australia, 1 courses)

- DB: addr="Katanning Road, Pingrup", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:23m,city:pingrup,db-name-substring,jaccard:1.00], 23m, WA 6343): name="Pingrup Golf Club", web=null, email=null, phone="(08) 9820 4030"
- OSM (no-match, 48442m, sim=0.571): name="Ongerup Golf Club", web=null, email=null, phone="+61 8 9828 2120;+61 8 9828 2282"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Pinjarra Golf Club (Australia, 2 courses)

- DB: addr="Cnr Sutton Street & Pinjarra Road, Pinjarra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:295m,city:pinjarra,db-name-substring,jaccard:1.00], 295m, WA 6208): name="Pinjarra Golf Club", web="https://www.pinjarragolf.com.au", email="admin@pinjarragolf.com.au", phone="08 9531 1252"
- OSM (high, 96m, sim=1): name="Pinjarra Golf Club", web="https://www.pinjarragolf.com.au/", email=null, phone="+61 8 9531 2588;+61 8 9531 1252"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Pink Lake Country Club (Australia, 1 courses)

- DB: addr="Nicholson Drive, Esperance", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.4[coord:214m], 214m, WA 6450): name="Pink Lake Golf Club", web=null, email=null, phone=null
- OSM (high, 83m, sim=1): name="Pink Lake Country Club", web="http://www.pinklakegolf.org.au/", email="pinklakegolf@westnet.com.au", phone="+61 8 9071 1000"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 83m, sim=1)
  - email: from osm(high, 83m, sim=1)
  - phone: from osm(high, 83m, sim=1)

### Pinnaroo Golf Club (Australia, 2 courses)

- DB: addr="Devon Terrace, Pinnaroo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:116m,city:pinnaroo,db-name-substring,jaccard:1.00], 116m, SA 5304): name="Pinnaroo Golf Club", web=null, email=null, phone="(08) 8577 8090"
- OSM (medium, 252m, sim=1): name="Pinnaroo Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Pioneer Valley Golf Club (Australia, 2 courses)

- DB: addr="Leichhardt Road, Mirani", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:mirani,db-name-substring,jaccard:1.00], 3058m, QLD 4754): name="Pioneer Valley Golf Club", web="http://www.pioneervalleygolf.com.au", email=null, phone="074959 1277"
- OSM (no-match, 1843518m, sim=0.643): name="Hidden Valley Golf & Country Club", web="http://www.hiddenvalleygolf.com.au/home", email=null, phone="+61 3 5783 0200"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Pittsworth Golf Club (Australia, 1 courses)

- DB: addr="Hill Street, Pittsworth", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:292m,city:pittsworth,db-name-substring,jaccard:1.00], 292m, QLD 4356): name="Pittsworth Golf Club", web=null, email=null, phone="4693 1275"
- OSM (high, 48m, sim=1): name="Pittsworth Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Pittwater Golf Club (Australia, 1 courses)

- DB: addr="Penna Road, Midway Point", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:155m,city:midway,db-name-substring,jaccard:1.00], 155m, TAS 7018): name="Pittwater Golf Club", web="https://pittwatergolfclub.com/", email="pittgolf@outlook.com.au", phone="03 62652069"
- OSM (high, 1m, sim=1): name="Pittwater Golf Club", web="https://pittwatergolfclub.com/", email=null, phone="+61 3 6265 2069"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Playford Lakes Golf Course (Australia, 1 courses)

- DB: addr="Cnr Fradd Rd & Stebonheath Rd, Munno Para West", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.78[coord:331m,city:munno,jaccard:0.75], 331m, SA 5114): name="Playford Lakes Golf Club", web=null, email=null, phone="(08) 82840655"
- OSM (low, 35m, sim=0.5): name="North Lakes Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Poatina Golf Club (Australia, 3 courses)

- DB: addr="Poatina Road, Poatina", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:25m,db-name-substring,jaccard:1.00], 25m, TAS 7302): name="Poatina Golf Club", web="http://www.poatinagolfclub.com.au", email="poatinagc@gmail.com", phone="0419 776 000"
- OSM (low, 1m, sim=0.143): name="Club House", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Point Walter Golf Course (Australia, 1 courses)

- DB: addr="Honour Avenue, Bicton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.78[coord:266m,city:bicton,jaccard:0.75], 266m, WA 6163): name="Point Walter Public Golf Course", web="https://www.pointwaltergolf.com.au/", email=null, phone="08 9330 3262"
- OSM (high, 66m, sim=1): name="Point Walter Golf Course", web="https://pointwaltergolf.com.au/", email=null, phone="+61 8 9330 3262"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Port Augusta Golf Club (Australia, 1 courses)

- DB: addr="Hamilton Road, Port Augusta", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2374m,city:port,db-name-substring,jaccard:1.00], 2374m, SA 5700): name="Port Augusta Golf Club", web="http://www.portaugusta_golfclub.org", email="paga@internode.on.net", phone="(08) 86 422930"
- OSM (low, 2170m, sim=1): name="Port Augusta Golf Course", web="https://pagc.org.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Port Broughton Golf Club (Australia, 1 courses)

- DB: addr="Fishermans Bay Road, Port Broughton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:383m,city:port,db-name-substring,jaccard:1.00], 383m, SA 5522): name="Port Broughton Golf Club", web=null, email="gcportbroughton@gmail.com", phone="(08) 8635 2583"
- OSM (high, 22m, sim=1): name="Port Broughton Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Port Fairy Golf Links (Australia, 2 courses)

- DB: addr="Woodbine Road, Port Fairy", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.92[coord:33m,city:port,jaccard:0.75], 33m, VIC 3284): name="Port Fairy Golf Club", web="http://www.portfairygolf.com.au", email=null, phone="03 5568 1654"
- OSM (medium, 250m, sim=1): name="Port Fairy Golf Links", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Port Germein Golf Club (Australia, 1 courses)

- DB: addr="National Highway One, Port Germein", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2178m,city:port,db-name-substring,jaccard:1.00], 2178m, SA 5495): name="Port Germein Golf Club", web="https://www.facebook.com/profile.php?id=100057782824861", email="portgermeingolfclub@gmail.com", phone="0411838062"
- OSM (no-match, 1201020m, sim=0.583): name="Port Kembla Golf Club", web="http://www.portkemblagolf.com.au/", email=null, phone="+61 2 4274 1159"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Port Hedland Golf Club (Australia, 1 courses)

- DB: addr="North West Coastal Highway, Port Hedland", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:621m,city:hedland,db-name-substring,jaccard:1.00], 621m, WA 6722): name="Port Hedland Golf Club", web=null, email=null, phone="(08) 9172 2046"
- OSM (high, 43m, sim=1): name="Port Hedland Golf Club", web="http://www.phgolfclub.com.au/", email=null, phone="+61 8 9172 2046"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 43m, sim=1)
  - phone: from fed(high, sim=1)

### Port Kembla Golf Club (Australia, 3 courses)

- DB: addr="30 Golf Place, Primbee", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:456m,db-name-substring,jaccard:1.00], 456m, NSW 2526): name="Port Kembla Golf Club", web="http://www.portkemblagolf.com.au", email="golfshop@portkemblagolfclub.com.au", phone="02 4274 1159"
- OSM (high, 108m, sim=1): name="Port Kembla Golf Club", web="http://www.portkemblagolf.com.au/", email=null, phone="+61 2 4274 1159"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Port Kenny Golf Club (Australia, 1 courses)

- DB: addr="Government Road, Venus Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:277m,db-name-substring,jaccard:1.00], 277m, SA 5671): name="Port Kenny Golf Club", web=null, email="fncmatthews@bigpond.com", phone="0407817054"
- OSM (medium, 473m, sim=1): name="Port Kenny Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Port Macdonnell Golf Club (Australia, 1 courses)

- DB: addr="Elizabeth Street, Port Macdonnell", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:453m,city:port,db-name-substring,jaccard:1.00], 453m, SA 5291): name="Port MacDonnell Golf Club", web=null, email=null, phone="0438675853"
- OSM (high, 131m, sim=1): name="Port Macdonnell Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Port Macquarie Golf Club (Australia, 1 courses)

- DB: addr="698 Ocean Drive, Port Macquarie", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:124m,city:port,db-name-substring,jaccard:1.00], 124m, NSW 2444): name="Port Macquarie Golf Club", web="http://www.portmacquariegolf.com.au", email="YaniMuffet@hotmail.com", phone="02 6582 0409"
- OSM (high, 24m, sim=1): name="Port Macquarie Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Port Neill Golf Club (Australia, 1 courses)

- DB: addr="Coast Road, Port Neill", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1533m,city:port,db-name-substring,jaccard:1.00], 1533m, SA 5604): name="Port Neill Golf Club", web=null, email=null, phone="(08) 8688 9214"
- OSM (no-match, 1335082m, sim=0.636): name="Port Kembla Golf Club", web="http://www.portkemblagolf.com.au/", email=null, phone="+61 2 4274 1159"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Port Pirie Golf Club (Australia, 1 courses)

- DB: addr="Senate Road, Port Pirie", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:port,db-name-substring,jaccard:1.00], 3090m, SA 5540): name="Port Pirie Golf Club", web="http://www.portpiriegolfclub.com.au", email="pirigolf@tpg.com.au", phone="0424573584"
- OSM (low, 3172m, sim=1): name="Port Pirie Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Port Sorell Golf Club (Australia, 1 courses)

- DB: addr="Shearwater Bvd, Port Sorell", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:port,db-name-substring,jaccard:1.00], 3820m, TAS 7307): name="Port Sorell Golf Club", web="https://portsorellgolfclub.com.au/", email="psgc7307@bigpond.net.au", phone="03 6428 7993"
- OSM (no-match, 1163m, sim=0.091): name="Shearwater Country Club", web="www.shearwatercc.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Port Victoria Golf Club (Australia, 1 courses)

- DB: addr="Edwards Terrace, Port Victoria", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1451m,city:port,db-name-substring,jaccard:1.00], 1451m, SA 5573): name="Port Victoria Golf Club", web=null, email="portvicgolf@gmail.com", phone="0428332581"
- OSM (no-match, 151145m, sim=0.615): name="Port Pirie Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Port Vincent Golf Club (Australia, 1 courses)

- DB: addr="Hd Of Curramulka, Port Vincent", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:9m,city:port,db-name-substring,jaccard:1.00], 9m, SA 5581): name="Port Vincent Golf Club", web=null, email="portvincentgolfclub@gmail.com", phone="0419 536 177"
- OSM (no-match, 188325m, sim=0.667): name="Port Lincoln Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Port Wakefield Golf Club (Australia, 1 courses)

- DB: addr="Balaklava Road, Port Wakefield", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:241m,city:port,db-name-substring,jaccard:1.00], 241m, SA 5550): name="Port Wakefield Golf Club", web=null, email=null, phone="(08) 8867 1464"
- OSM (high, 54m, sim=1): name="Port Wakefield Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Portarlington Golf Club (Australia, 1 courses)

- DB: addr="130 Hood Road, Portarlington", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:11m,city:portarlington,db-name-substring,jaccard:1.00], 11m, VIC 3223): name="Portarlington Golf Club", web="https://www.port.golf", email="proshop@port.golf", phone="03 5259 2492"
- OSM (high, 229m, sim=1): name="Portarlington Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Portland Golf Club (Australia, 2 courses)

- DB: addr="Bell Street, Portland", web=null, email=null, phone=null
- golf.com.au (high, sim=0.667, boost=+1.25[coord:2m,city:portland,db-name-substring,jaccard:1.00], 2m, NSW 2847): name="Portland Golf Club (NSW) ", web=null, email="pgcnsw2000@gmail.com", phone="02 6355 5208"
- OSM (medium, 331m, sim=1): name="Portland Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.667)
  - phone: from fed(high, sim=0.667)

### Portsea Golf Club (Australia, 1 courses)

- DB: addr="Relph Avenue, Portsea", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:414m,city:portsea,db-name-substring,jaccard:1.00], 414m, VIC 3943): name="Portsea Golf Club", web="http://www.portseagolf.com.au", email=null, phone="(03) 5981 6155"
- OSM (high, 68m, sim=1): name="Portsea Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Preston Beach (Australia, 1 courses)

- DB: addr="33 Panorama Drive, PRESTON BEACH", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:2022m,city:preston,db-name-substring,jaccard:0.50], 2022m, WA 6215): name="Preston Beach Golf Club", web=null, email=null, phone="0402038707"
- OSM (low, 2973096m, sim=0.714): name="Kingston Beach Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Proserpine Golf Club (Australia, 1 courses)

- DB: addr="Anzac Road, Proserpine", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:62m,city:proserpine,db-name-substring,jaccard:1.00], 62m, QLD 4800): name="Proserpine Golf Club", web="http://www.proserpinegolfclub.com.au", email="proshop@proserpinegolfclub.com.au", phone="07 4945 1337"
- OSM (high, 12m, sim=1): name="Proserpine Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Proston District Golf Club Par3 (Australia, 1 courses)

- DB: addr="81 Brigooda Road, Proston", web=null, email=null, phone=null
- golf.com.au (high, sim=0.762, boost=+0.92[coord:198m,city:proston,jaccard:0.75], 198m, QLD 4613): name="Proston District Golf Club", web="https://prostongolfclub.org.au/", email="prostongolf@gmail.com", phone="0428843090"
- OSM (low, 349m, sim=0.333): name="Proston Golf Club", web="https://prostongolfclub.org.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.762)
  - email: from fed(high, sim=0.762)
  - phone: from fed(high, sim=0.762)

### Pymble Golf Club (Australia, 1 courses)

- DB: addr="Cowan Road, St Ives", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:21m,city:ives,db-name-substring,jaccard:1.00], 21m, NSW 2075): name="Pymble Golf Club", web="http://www.pymblegolf.com.au", email="office@pymblegolf.com.au", phone="(02) 9144 2884"
- OSM (medium, 352m, sim=1): name="Pymble Golf Club", web="https://www.pymblegolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Pyramid Hill Golf Club (Australia, 1 courses)

- DB: addr="Victoria Street, Pyramid Hill", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:261m,city:pyramid,db-name-substring,jaccard:1.00], 261m, VIC 3575): name="Pyramid Hill Golf Club", web="https://www.pyramidhillgolfclub.com/", email="pyramidgolfclub@gmail.com", phone="0409703880"
- OSM (high, 83m, sim=1): name="Pyramid Hill Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Quairading Golf Club (Australia, 1 courses)

- DB: addr="Quairading-York Road, Quairading", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:450m,city:quairading,db-name-substring,jaccard:1.00], 450m, WA 6383): name="Quairading Golf Club", web=null, email=null, phone="437007868"
- OSM (no-match, 3290687m, sim=0.5): name="Duaringa Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Quarry Hill Golf Club (Australia, 1 courses)

- DB: addr="47-85 Houston Street, Bendigo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1204m,city:bendigo,db-name-substring,jaccard:1.00], 1204m, VIC 3552): name="Quarry Hill Golf Club", web=null, email="secretary@quarryhillgolf.com", phone="03 5443 8610"
- OSM (low, 1729m, sim=1): name="Quarry Hill Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Queens Park Public Golf Course (Australia, 1 courses)

- DB: addr="Queens Park Road, Highton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:276m,city:highton,jaccard:0.50], 276m, VIC 3216): name="Queens Park Golf Club", web="https://queensparkgolfclub.com.au", email="info@queensparkgolfclub.com.au", phone="0488 072 935"
- OSM (high, 190m, sim=1): name="Queens Park Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Queenscliff Golf Club (Australia, 2 courses)

- DB: addr="Swan Island, Queenscliff", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:446m,city:queenscliff,db-name-substring,jaccard:1.00], 446m, VIC 3225): name="Queenscliff Golf Club", web="https://www.queenscliffgolfclub.com.au", email="info@queenscliffgolfclub.com.au", phone="5258 5344"
- OSM (high, 9m, sim=1): name="Queenscliff Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Queenstown Golf Club (Australia, 1 courses)

- DB: addr="Lynchford Road, Queenstown", web=null, email=null, phone=null
- golf.com.au (high, sim=0.714, boost=+1.1[coord:304m,city:queenstown,db-name-substring,jaccard:1.00], 304m, TAS 7467): name="Queenstown Golf Club (TAS)", web="https://www.facebook.com/QueenstownGolfClubTAS", email=null, phone="03 64711164"
- OSM (low, 56m, sim=0): name="Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.714)
  - phone: from fed(high, sim=0.714)

### Quilpie Golf Club (Australia, 1 courses)

- DB: addr="Quilpie", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:quilpie,db-name-substring,jaccard:1.00], 3280m, QLD 4480): name="Quilpie Golf Club", web=null, email="quilpiegolfclub083@gmail.com", phone="0428561468"
- OSM (low, 3599m, sim=1): name="Quilpie Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Quirindi RSL Golf Club (Australia, 1 courses)

- DB: addr="Werris Creek Road, Quirindi", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:quirindi,db-name-substring,jaccard:1.00], 3906m, NSW 2343): name="Quirindi RSL Golf Club", web=null, email=null, phone="6746 1209"
- OSM (no-match, 4132m, sim=0.667): name="Quirindi Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Quorn Golf Club (Australia, 1 courses)

- DB: addr="Ninth Avenue, Quorn", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:437m,city:quorn,db-name-substring,jaccard:1.00], 437m, SA 5433): name="Quorn Golf Club", web=null, email="quorngc@gmail.com", phone="(08) 8648 6440"
- OSM (high, 61m, sim=1): name="Quorn Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### RAAF Darwin Golf Club (Australia, 1 courses)

- DB: addr="RAAF Base, Stuart Hwy, Winnellie , Darwin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:winnellie,db-name-substring,jaccard:1.00], 4590m, NT 0821): name="RAAF Darwin Golf Club", web=null, email="raafgolf16@gmail.com", phone="(08) 8924 2535"
- OSM (no-match, 1709m, sim=0.545): name="Darwin Golf Course", web="https://www.darwingolfclub.com.au", email=null, phone="+61 8 8927 1322"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### RAAF Wagga Golf Club (Australia, 1 courses)

- DB: addr="C/- Raaf Base Wagga, Wagga", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:463m,db-name-substring,jaccard:1.00], 463m, NSW ): name="RAAF Wagga Golf Club", web=null, email=null, phone=null
- OSM (no-match, 9598m, sim=0.636): name="Wagga Wagga Country Club", web="https://wwcc.com.au/", email=null, phone=null

### RAAF Williams Golf Club (Australia, 1 courses)

- DB: addr="RAAF Base, Laverton", web=null, email=null, phone=null
- golf.com.au (high, sim=0.481, boost=+1.08[coord:43m,city:laverton,name-token:laverton,jaccard:0.60], 43m, VIC 3028): name="RAAF Williams Laverton Base Golf Club", web=null, email=null, phone="0404 773 547"
- OSM (low, 34m, sim=0.591): name="RAAF Williams Laverton Golf Club", web="https://raafwilliamsgolf.net.au/", email=null, phone="+61 3 9256 2693;+61 403 608 492"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.481)

### RACV Cape Schanck Resort (Australia, 1 courses)

- DB: addr="Trent Jones Drive, Cape Schanck", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.92[coord:231m,city:cape,jaccard:0.75], 231m, VIC 3939): name="RACV Cape Schanck", web="https://www.racv.com.au/travel-experiences/resorts/cape-schanck/golf.html", email="capeschanck@golf.racv.com.au", phone="(03) 5950 8100"
- OSM (high, 109m, sim=1): name="RACV Cape Schanck Resort", web="https://www.racv.com.au/travel-experiences/resorts/cape-schanck/golf.html", email="capeschanck@resorts.racv.com.au", phone="+61 3 5950 8000"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### RACV Healesville Country Club & Resort (Australia, 1 courses)

- DB: addr="122 Healesville-Kinglake Road, Healesville", web=null, email=null, phone=null
- golf.com.au (high, sim=0.25, boost=+0.7[coord:262m,city:healesville,jaccard:0.50], 262m, VIC 3777): name="RACV Country Club", web=null, email=null, phone="03 5962 4899"
- OSM (high, 247m, sim=1): name="RACV Healesville Country Club", web="https://www.racv.com.au/wps/wcm/connect/Internet/Primary/RACV+club/healesville+country+club", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 247m, sim=1)
  - phone: from fed(high, sim=0.25)

### RACV Royal Pines Resort Golf Course (Australia, 9 courses)

- DB: addr="Ross Street, Benowa", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.94[coord:237m,city:benowa,jaccard:0.80], 237m, QLD 9726): name="RACV Royal Pines Resort Golf Club", web="https://www.racv.com.au/royalpines", email=null, phone="(07) 5597 8700"
- OSM (medium, 322m, sim=1): name="RACV Royal Pines Resort Golf Course", web="http://www.racv.com.au/wps/wcm/connect/resorts/racv+resorts/racv+royal+pines+resort", email=null, phone="+61 7 5597 8700"

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Rainbow Golf Club (Australia, 1 courses)

- DB: addr="Nhill Road, Rainbow", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:440m,city:rainbow,db-name-substring,jaccard:1.00], 440m, VIC 3424): name="Rainbow Golf Club", web=null, email=null, phone="0427120802"
- OSM (high, 64m, sim=1): name="Rainbow Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Ramada Resort Kooralbyn Valley (Australia, 2 courses)

- DB: addr="1/21 Routley Dr, Kooralbyn", web=null, email=null, phone=null
- golf.com.au (high, sim=0.696, boost=+0.55[coord:968m,city:kooralbyn], 968m, QLD 4285): name="Kooralbyn Valley Golf Course", web=null, email="golf@thekooralbynvalley.com.au", phone=null
- OSM (low, 813m, sim=0.696): name="Kooralbyn Valley Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.696)

### Randwick Golf Club (Australia, 1 courses)

- DB: addr="1 Howe Street, Malabar", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:20m,city:malabar,db-name-substring,jaccard:1.00], 20m, NSW 2036): name="Randwick Golf Club", web="http://www.randwickgolfclub.com.au", email=null, phone="02 8347 3777"
- OSM (medium, 440m, sim=1): name="Randwick Golf Course", web="https://www.randwickgolfclub.com.au/", email=null, phone="+61 2 8347 3733;+61 2 8347 3777"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ravensthorpe Golf Club (Australia, 1 courses)

- DB: addr="Hopetoun Road, Ravensthorpe", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:278m,city:ravensthorpe,db-name-substring,jaccard:1.00], 278m, WA 6346): name="Ravensthorpe Golf Club", web=null, email="jpe.357@hotmail.com", phone="(08) 9838 9032"
- OSM (low, 262m, sim=0.6): name="Ravensthorpe Golf & Bowling Club", web=null, email=null, phone="+61 8 9838 1181"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Red Cliffs Golf Club (Australia, 1 courses)

- DB: addr="Cnr Coorong Av & Twenty Second St, Red Cliffs", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:448m,city:cliffs,db-name-substring,jaccard:1.00], 448m, VIC 3496): name="Red Cliffs Golf Club", web="http://www.redcliffsgolfclub.net/", email=null, phone="0350241531"
- OSM (high, 29m, sim=1): name="Red Cliffs Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Redcliffe Golf Club (Australia, 1 courses)

- DB: addr="Handsworth Stree, Clontarf", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:634m,city:clontarf,db-name-substring,jaccard:1.00], 634m, QLD 4019): name="Redcliffe Golf Club", web=null, email=null, phone="07 3284 5485"
- OSM (high, 64m, sim=1): name="Redcliffe Golf Club", web="https://redcliffegolf.com/", email="info@redcliffegolf.com", phone="+61 7 3284 2957;+61 7 3284 2422;+61 7 3284 5485"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 64m, sim=1)
  - email: from osm(high, 64m, sim=1)
  - phone: from fed(high, sim=1)

### Redland Bay Golf Club "OF Club" (Australia, 1 courses)

- DB: addr="North Street, Redland Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1[coord:16m,city:redland,jaccard:1.00], 16m, QLD 4165): name="Redland Bay Golf Club", web=null, email="golf@redlandbaygolf.com.au", phone="07 3206 7011"
- OSM (high, 32m, sim=1): name="Redland Bay Golf Club", web="https://redlandbaygolf.com.au/", email=null, phone="+61 7 3206 7011"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 32m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Regency Park Golf Club (Australia, 2 courses)

- DB: addr="Days Road, Regency", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:29m,city:regency,db-name-substring,jaccard:1.00], 29m, SA 5085): name="Regency Park Golf Club", web=null, email=null, phone="0448880532"
- OSM (low, 143m, sim=0.412): name="Regency Park Community Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Rich River Golf Club Resort (Australia, 2 courses)

- DB: addr="24 Lane Street, Moama", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.92[coord:57m,city:moama,jaccard:0.75], 57m, NSW 2731): name="Rich River Golf Club", web="https://www.richriver.com.au", email=null, phone="03 5481 3333"
- OSM (high, 48m, sim=1): name="Rich River Golf Club", web="https://www.richriver.com.au/", email=null, phone="+61 3 5481 3333"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Richmond Golf Club (Australia, 5 courses)

- DB: addr="34 Bourke Street, Richmond", web=null, email=null, phone=null
- golf.com.au (high, sim=0.667, boost=+1.25[coord:11m,city:richmond,db-name-substring,jaccard:1.00], 11m, QLD 4822): name="Richmond Golf Club (QLD)", web=null, email="richmondgolfclub@outlook.com", phone=null
- OSM (low, 507m, sim=1): name="Richmond Golf Course", web=null, email=null, phone="+61 7 4741 3496"

**Proposed UPDATE** (alle 5 course rows for klub, overall=high):
  - email: from fed(high, sim=0.667)

### Ringarooma Golf Club (Australia, 2 courses)

- DB: addr="Schramms Road, Legerwood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:12m,db-name-substring,jaccard:1.00], 12m, TAS 7263): name="Ringarooma Golf Club", web="https://www.facebook.com/groups/881607691914287/", email=null, phone="03 63531005"
- OSM (high, 0m, sim=1): name="Ringarooma Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ringwood Golf Club (Australia, 1 courses)

- DB: addr="350 Canterbury Road, Ringwood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.45[city:ringwood,jaccard:0.50], 4902m, VIC 3134): name="Ringwood Public Golf Course", web="https://www.maroondahleisure.com.au/Our-venues/Ringwood-Golf", email=null, phone=null
- OSM (low, 5241m, sim=1): name="Ringwood Golf", web="https://www.maroondahleisure.com.au/Our-venues/Ringwood-Golf/About-Ringwood-Golf-course", email=null, phone="+61 3 9298 4500"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)

### Riverlakes Golf Course (Australia, 2 courses)

- DB: addr="34 Gleneagles Ave, Cornubia", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:169m,city:cornubia,jaccard:0.67], 169m, QLD 4130): name="Riverlakes Golf Club", web="https://riverlakes.com.au/", email=null, phone="07 3287 6588"
- OSM (high, 69m, sim=1): name="Riverlakes Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Riversdale Golf Club (Australia, 2 courses)

- DB: addr="Cnr of Huntingdale Rd & High St Rd, Mount Waverley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:62m,city:mount,db-name-substring,jaccard:1.00], 62m, VIC 3149): name="Riversdale Golf Club", web=null, email="admin@riversdalegolf.com.au", phone="03 9807 1411"
- OSM (high, 18m, sim=1): name="Riversdale Golf Club", web="https://www.riversdalegolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 18m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Riverside Golf and Sports Centre (Australia, 1 courses)

- DB: addr="75 Newsom St, Ascot Vale, Melbourne", web=null, email=null, phone=null
- golf.com.au (high, sim=0.783, boost=+0.88[coord:167m,city:ascot,jaccard:0.60], 167m, VIC 3032): name="Riverside Golf + Tennis Centre", web=null, email=null, phone="03 9326 0755"
- OSM (low, 377m, sim=0.391): name="Riverside Golf Course", web="https://mvcc.vic.gov.au/sportsparkplay/http://www.rgtc.com.au//", email=null, phone="+61 3 9938 4545"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.783)

### Riverside Golf and Tennis Centre (Australia, 1 courses)

- DB: addr="75 Newsom St, Ascot Vale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1[coord:167m,city:ascot,jaccard:1.00], 167m, VIC 3032): name="Riverside Golf + Tennis Centre", web=null, email=null, phone="03 9326 0755"
- OSM (low, 377m, sim=0.391): name="Riverside Golf Course", web="https://mvcc.vic.gov.au/sportsparkplay/http://www.rgtc.com.au//", email=null, phone="+61 3 9938 4545"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Riverside Oaks Golf Bungool (Australia, 1 courses)

- DB: addr="74 O'Briens Rd Cattai, Sydney", web=null, email=null, phone=null
- golf.com.au (high, sim=0.636, boost=+0.78[coord:401m,city:cattai,jaccard:0.75], 401m, NSW 2756): name="Riverside Oaks Golf Club", web="http://www.riversideoaks.com.au", email="proshop@riversideoaks.com.au", phone="02 4560 3200"
- OSM (low, 0m, sim=0.636): name="Riverside Oaks Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.636)
  - email: from fed(high, sim=0.636)
  - phone: from fed(high, sim=0.636)

### Riverside Oaks Golf Club (Australia, 2 courses)

- DB: addr="74 O'Briens Rd, Cattai", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:401m,city:cattai,db-name-substring,jaccard:1.00], 401m, NSW 2756): name="Riverside Oaks Golf Club", web="http://www.riversideoaks.com.au", email="proshop@riversideoaks.com.au", phone="02 4560 3200"
- OSM (high, 0m, sim=1): name="Riverside Oaks Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Riverton Golf Club (Australia, 1 courses)

- DB: addr="Saddleworth Road, Riverton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:159m,city:riverton,db-name-substring,jaccard:1.00], 159m, SA 5412): name="Riverton Golf Club", web=null, email=null, phone="(08) 8847 2408"
- OSM (high, 19m, sim=1): name="Riverton Golf Club", web=null, email=null, phone="+61 8 8847 2169"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Riverview Country Club (Australia, 2 courses)

- DB: addr="Grey St, Albany", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:130m,db-name-substring,jaccard:1.00], 130m, WA 6331): name="Riverview Country Club", web="https://www.riverviewgolfclub.com.au/cms/", email=null, phone="0427 464 202"
- OSM (high, 26m, sim=1): name="Riverview Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Riverwood Golf Club (Australia, 1 courses)

- DB: addr="255 Henry Lawson Drive, Georges Hall", web=null, email=null, phone=null
- golf.com.au (high, sim=0.154, boost=+0.95[coord:420m,city:georges,name-token:georges,jaccard:0.67], 420m, NSW 2198): name="Georges River Golf Club", web="https://www.geocites.com/riverwood_golf", email="phorinek@optusnet.com.au", phone="02 9724 1615"
- OSM (low, 54m, sim=0.154): name="Georges River Golf Course", web="https://georgesrivergolf.com.au/", email=null, phone="+61 2 9724 1615"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.154)
  - email: from fed(high, sim=0.154)
  - phone: from fed(high, sim=0.154)

### Robe Golf Club (Australia, 1 courses)

- DB: addr="129 Morphett Street, Robe", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:43m,city:robe,db-name-substring,jaccard:1.00], 43m, SA 5276): name="Robe Golf Club", web="http://robegolfclub.wordpress.com", email="manager@robegolfclub.com", phone="0427440479"
- OSM (medium, 269m, sim=1): name="Robe Golf Course", web=null, email=null, phone="+61 8 8768 2330"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Robina Woods Golf Club (Australia, 2 courses)

- DB: addr="Ron Penhaligon Way, Robina", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.25[coord:513m], 513m, QLD 4226): name="Robina Woods Driving Range", web=null, email=null, phone=null
- OSM (low, 413m, sim=0.4): name="Palmer Gold Coast (Robina Woods) Golf Club", web="http://robinawoods.au-golf.net/", email=null, phone="+61 7 5593 1766"

### Robinvale Golf Club (Australia, 2 courses)

- DB: addr="4240 Murray Valley Highway, Robinvale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:87m,city:robinvale,db-name-substring,jaccard:1.00], 87m, VIC 3549): name="Robinvale Golf Club", web=null, email=null, phone="03 5026 3286"
- OSM (high, 183m, sim=1): name="Robinvale Golf Club", web="https://robinvalegolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 183m, sim=1)
  - phone: from fed(high, sim=1)

### Rockhampton Golf Club (Australia, 2 courses)

- DB: addr="Ann Street, Rockhampton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:552m,city:rockhampton,db-name-substring,jaccard:1.00], 552m, QLD 4700): name="Rockhampton Golf Club", web="https://www.rockygolfclub.org.au", email=null, phone="07 4927 3311"
- OSM (high, 47m, sim=1): name="Rockhampton Golf Club", web="https://www.rockygolfclub.org.au/", email=null, phone="+61 7 4927 3311"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Rockingham Golf Club (Australia, 2 courses)

- DB: addr="Elanora Drive, Rockingham", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:675m,city:rockingham,db-name-substring,jaccard:1.00], 675m, WA 6168): name="Rockingham Golf Club", web=null, email="info@bncgolf.com.au", phone="(08) 9527 1320"
- OSM (high, 69m, sim=1): name="Rockingham Golf Club", web="https://www.rockinghamgolfclub.com.au/", email=null, phone="+61 8 9527 1320"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 69m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Rokewood Golf Club (Australia, 1 courses)

- DB: addr="Rokewood-Shelford Road, Rokewood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:495m,city:rokewood,db-name-substring,jaccard:1.00], 495m, VIC 3330): name="Rokewood Golf Club", web=null, email=null, phone="0408110119"
- OSM (high, 144m, sim=1): name="Rokewood Golf Club", web="http://www.worldgolf.com/courses/australia/victoria/rokewood-golf-club.html", email=null, phone="+61 3 5238 9545;+61 3 5346 1511"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 144m, sim=1)
  - phone: from fed(high, sim=1)

### Roma Golf Club (Australia, 1 courses)

- DB: addr="119 Tiffin Street, Roma", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:251m,city:roma,db-name-substring,jaccard:1.00], 251m, QLD 4455): name="Roma Golf Club", web=null, email=null, phone="(07) 4622 1233"
- OSM (high, 157m, sim=1): name="Roma Golf Club", web="https://www.facebook.com/ROMAGOLFCLUB/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 157m, sim=1)
  - phone: from fed(high, sim=1)

### Romsey Golf Club (Australia, 2 courses)

- DB: addr="7 Park Lane, Romsey", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:376m,city:romsey,db-name-substring,jaccard:1.00], 376m, VIC 3434): name="Romsey Golf Club", web="https://www.romseygolfclub.net/", email="Treasurer@romseygolfclub.net", phone="0447187282"
- OSM (high, 120m, sim=1): name="Romsey Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Rosanna Golf Club (Australia, 1 courses)

- DB: addr="54 Cleveland Avenue, Lower Plenty", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:241m,city:lower,db-name-substring,jaccard:1.00], 241m, VIC 3093): name="Rosanna Golf Club", web="http://www.rosannagolf.com.au", email="admin@rosanna.golf", phone="03 9431 1033"
- OSM (high, 46m, sim=1): name="Rosanna Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Rosebud Country Club (Australia, 4 courses)

- DB: addr="207 Boneo Road, Rosebud", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:486m,city:rosebud,db-name-substring,jaccard:1.00], 486m, VIC 3939): name="Rosebud Country Club", web=null, email="reception@rcc.golf", phone="(03) 5950 0800"
- OSM (high, 27m, sim=1): name="Rosebud Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Roseville Golf Club (Australia, 1 courses)

- DB: addr="4 Links Avenue, Roseville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:232m,city:roseville,db-name-substring,jaccard:1.00], 232m, NSW 2069): name="Roseville Golf Club", web="http://www.rosevillegolf.com.au", email=null, phone="8467 1800"
- OSM (medium, 256m, sim=1): name="Roseville Golf Course", web="https://www.rosevillegolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Rosewood Golf Club (Australia, 2 courses)

- DB: addr="Kyeamba Street, Rosewood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:408m,city:rosewood,db-name-substring,jaccard:1.00], 408m, QLD 4340): name="Rosewood Golf Club", web="http://www.rosewoodgolfclub.com.au", email="rosewoodgc@outlook.com", phone="(07) 5464 1201"
- OSM (high, 6m, sim=1): name="Rosewood Golf Club", web="http://rosewoodgolfclub.com.au/", email="rosewoodgc@iprimus.com.au", phone="+61 7 5464 1201"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Rosnay Golf Club (Australia, 1 courses)

- DB: addr="5 Weymouth Avenue, Auburn", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:78m,city:auburn,db-name-substring,jaccard:1.00], 78m, NSW 2141): name="Rosnay Golf Club", web=null, email=null, phone="02 9649 8429"
- OSM (low, 383m, sim=0): name="Auburn Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Rossdale Golf Club (Australia, 1 courses)

- DB: addr="Sixth Avenue, Aspendale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:420m,city:aspendale,db-name-substring,jaccard:1.00], 420m, VIC 3195): name="Rossdale Golf Club", web="http://www.rossdalegolf.com.au", email=null, phone="03 9580 1008"
- OSM (high, 26m, sim=1): name="Rossdale Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Rottnest Island Country Club (Australia, 1 courses)

- DB: addr="Sommerville Drive, Rottnest Island", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[coord:12m,jaccard:0.50], 12m, WA 6152): name="Rottnest Island Golf Club", web="http://www.rottnestgolf.org", email=null, phone="0416022130"
- OSM (high, 1m, sim=1): name="Rottnest Island Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Rowes Bay Country Golf Club (Australia, 1 courses)

- DB: addr="Cape Pallarenda Road, Rowes Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:515m,city:pallarenda,jaccard:0.67], 515m, QLD 4812): name="Rowes Bay Golf Club", web="http://www.rowesbaygolfclub.com.au", email="info@rowesbaygolfclub.com.au", phone="07 4774 1188"
- OSM (high, 175m, sim=1): name="Rowes Bay Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Rowville Lakes Public Golf Course (Australia, 1 courses)

- DB: addr="Corner Police &, Stud Rd, Rowville ", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[coord:509m,city:rowville], 509m, VIC ): name="Rowville Lakes GC", web=null, email=null, phone="0433 532 846"
- OSM (high, 127m, sim=1): name="Rowville Lakes Public Golf Course", web="www.tirhatuangolf.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 127m, sim=1)
  - phone: from fed(high, sim=1)

### Roxby Downs Golf Club (Australia, 1 courses)

- DB: addr="Olympic Way, Roxby Downs", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:372m,city:roxby,db-name-substring,jaccard:1.00], 372m, SA 5725): name="Roxby Downs Golf Club", web="http://www.roxbgolf@bigpond.net.au", email="admin@roxbydownsgolfclub.com.au", phone="0439 862 784"
- OSM (no-match, 821647m, sim=0.583): name="Murray Downs Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Adelaide Golf Club (Australia, 1 courses)

- DB: addr="328 Tapleys Hill Road, Seaton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:79m,city:seaton,db-name-substring,jaccard:1.00], 79m, SA 5023): name="Royal Adelaide Golf Club", web="http://www.royaladelaidegolf.com.au", email=null, phone="(08) 8356 5511"
- OSM (high, 14m, sim=1): name="Royal Adelaide Golf Course", web="https://www.royaladelaidegolf.com.au/", email=null, phone="+61 8 8356 5511"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Canberra Golf Club (Australia, 3 courses)

- DB: addr="71 Bentham Street, Yarralumla", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:293m,city:yarralumla,db-name-substring,jaccard:1.00], 293m, ACT 2600): name="Royal Canberra Golf Club", web="https://www.royalcanberra.com.au", email="bree.arthur@royalcanberra.com.au", phone="02 6282 7000"
- OSM (high, 113m, sim=1): name="Royal Canberra Golf Club", web="https://www.royalcanberra.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Fremantle Golf Club (Australia, 1 courses)

- DB: addr="359 High Street, Fremantle", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:322m,city:fremantle,db-name-substring,jaccard:1.00], 322m, WA 6959): name="Royal Fremantle Golf Club", web=null, email=null, phone="08 9335 3866"
- OSM (high, 151m, sim=1): name="Royal Fremantle Golf Course", web="https://www.royalfremantlegc.com.au/", email=null, phone="+61 8 9335 3866"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 151m, sim=1)
  - phone: from fed(high, sim=1)

### Royal Hobart Golf Club (Australia, 1 courses)

- DB: addr="81 Seven Mile Beach Road, Seven Mile Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:304m,city:seven,db-name-substring,jaccard:1.00], 304m, TAS 7170): name="Royal Hobart Golf Club", web="http://www.rhgc.com.au", email="admin@rhgc.com.au", phone="0362486161"
- OSM (high, 104m, sim=1): name="Royal Hobart Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Melbourne Golf Club (E6) (Australia, 1 courses)

- DB: addr=null, web=null, email=null, phone=null
- golf.com.au (high, sim=0.833, boost=+0.55[coord:412m,jaccard:1.00], 412m, VIC 3193): name="Royal Melbourne Golf Club", web="https://www.royalmelbourne.com.au", email=null, phone="03 9599 0500"
- OSM (low, 304m, sim=0.833): name="Royal Melbourne Golf Club", web="https://www.royalmelbourne.com.au/", email="golfbookings@rmgolf.com.au", phone="+61 3 9599 0500"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.833)
  - phone: from fed(high, sim=0.833)

### Royal Military College Golf Club (Australia, 1 courses)

- DB: addr="6 Calculus Lane, Campbell", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:405m,city:campbell,db-name-substring,jaccard:1.00], 405m, ACT 2602): name="Royal Military College Golf Club", web="http://www.rmcgc.com.au", email=null, phone="02 6265 9620"
- OSM (medium, 320m, sim=1): name="Royal Military College Golf Club", web="https://www.rmcgc.com.au/", email=null, phone="+61 2 6265 9620"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Park Golf Club (Australia, 2 courses)

- DB: addr="Old Poplar Road, Parkville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:20m,city:parkville,jaccard:0.50], 20m, VIC 3052): name="Royal Park Golf Course ", web="https://royalparkgolfcourse.ymca.org.au", email=null, phone="03 9387 1326"
- OSM (medium, 313m, sim=1): name="Royal Park Golf Course", web="http://www.royalparkgolf.com.au/", email=null, phone="+61 3 8060 6957"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Perth Golf Club (Australia, 1 courses)

- DB: addr="Labouchere Road, South Perth", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:364m,city:south,db-name-substring,jaccard:1.00], 364m, WA 6151): name="Royal Perth Golf Club", web="https://www.rpgc.com.au", email="info@rpgc.com.au", phone="08 6436 4900"
- OSM (high, 90m, sim=1): name="Royal Perth Golf Club", web="https://www.rpgc.com.au/", email="frontdesk@rpgc.com.au", phone="+61 8 6436 4900"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Pines Resort (Australia, 2 courses)

- DB: addr="Ross Street, Benowa", web=null, email=null, phone=null
- golf.com.au (high, sim=0.688, boost=+1.1[coord:175m,city:benowa,db-name-substring,jaccard:0.50], 175m, QLD 9726): name="RACV Royal Pines Resort Golf Club", web="https://www.racv.com.au/royalpines", email=null, phone="(07) 5597 8700"
- OSM (low, 26m, sim=0.688): name="RACV Royal Pines Resort Golf Course", web="http://www.racv.com.au/wps/wcm/connect/resorts/racv+resorts/racv+royal+pines+resort", email=null, phone="+61 7 5597 8700"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.688)
  - phone: from fed(high, sim=0.688)

### Royal Queensland Golf Club (Australia, 1 courses)

- DB: addr="431 Curtin Avenue West, Eagle Farm", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:440m,city:eagle,db-name-substring,jaccard:1.00], 440m, QLD 4009): name="Royal Queensland Golf Club", web="https://www.rqgolf.com.au", email="info@rqgolf.com.au", phone="07 3633 6500"
- OSM (high, 118m, sim=1): name="Royal Queensland Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Rupanyup Golf Club (Australia, 1 courses)

- DB: addr="Frayne Avenue, Rupanyup", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:267m,city:rupanyup,db-name-substring,jaccard:1.00], 267m, VIC 3388): name="Rupanyup Golf Club", web=null, email=null, phone="(03) 5385 5340"
- OSM (high, 217m, sim=1): name="Rupanyup Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Russell Vale Golf Course (Australia, 1 courses)

- DB: addr="Hicks St, Russell Vale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.63[coord:194m,jaccard:0.75], 194m, NSW 2517): name="Russell Vale Golf Club", web="http://www.russellvalegolfclub.com.au", email=null, phone="02 4285 1286"
- OSM (high, 71m, sim=1): name="Russell Vale Public Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Rutherglen Golf Club (Australia, 1 courses)

- DB: addr="Murray Street, Rutherglen", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:323m,city:rutherglen,db-name-substring,jaccard:1.00], 323m, VIC 3685): name="Rutherglen Golf Club ", web="https://www.rutherglengolfclub.au/", email="golfrutherglen@gmail.com", phone="0429607082"
- OSM (high, 18m, sim=1): name="Rutherglen Golf Club", web="https://www.rutherglengolfclub.com.au/", email=null, phone="+61 2 6032 9735"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ryde Parramatta Golf Club (Australia, 1 courses)

- DB: addr="1156 Victoria Road, West Ryde", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:186m,city:west,db-name-substring,jaccard:1.00], 186m, NSW 2114): name="Ryde Parramatta Golf Club", web="http://www.rydeparramatta.com.au", email=null, phone="(02) 9874 1204"
- OSM (low, 556m, sim=1): name="Ryde Parramatta Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Saint Andrews Beach (Australia, 1 courses)

- DB: addr="209 Sandy Rd, Saint Andrews Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=0.842, boost=+0.25[coord:275m], 275m, VIC 3939): name="St Andrews Beach Golf Course", web="https://standrewsbeachgolf.com.au/", email="bookings@standrewsbeachgolf.com.au", phone="(03) 5988 6000"
- OSM (high, 75m, sim=1): name="Saint Andrews Beach Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.842)
  - email: from fed(high, sim=0.842)
  - phone: from fed(high, sim=0.842)

### Sale Golf Club (Australia, 1 courses)

- DB: addr="Longford-Rosedale Road, Longford", web=null, email=null, phone=null
- golf.com.au (high, sim=0.5, boost=+0.8[coord:295m,db-name-substring,jaccard:1.00], 295m, VIC 3850): name="Sale Golf Club Inc.", web="http://www.salegolfclub.com.au", email="admin@salegolfclub.com.au", phone="03 5149 7230"
- OSM (high, 171m, sim=1): name="Sale Golf Club", web="https://www.salegolfclub.com.au/", email=null, phone="+61 3 5149 7160;+61 3 5149 7230"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.5)
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Salmon Gums Golf Club (Australia, 1 courses)

- DB: addr="Moore Street, Salmon Gums", web=null, email=null, phone=null
- golf.com.au (high, sim=0.733, boost=+1.1[coord:440m,city:salmon,db-name-substring,jaccard:1.00], 440m, WA 6445): name="Salmon Gums Golf Club Inc", web=null, email=null, phone="08 9079 6008"
- OSM (high, 60m, sim=1): name="Salmon Gums Golf Club", web=null, email=null, phone="+61 8 9079 6005;+61 8 9078 5004"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.733)

### Sanctuary Cove Golf and Country Club (Australia, 2 courses)

- DB: addr="The Parkway, Hope Island", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[coord:286m,jaccard:1.00], 286m, QLD 4212): name="Sanctuary Cove Golf & Country Club", web="https://www.sanctuarycovegolf.com.au", email="pinesgolf@scgcc.com.au", phone="07 5699 9050"
- OSM (low, 327m, sim=0.071): name="Palms Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Sanctuary Golf Resort (Australia, 1 courses)

- DB: addr="Cnr Old Coast Road & Australind Bypass Pelican Point, Bunbury", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:355m,city:pelican,db-name-substring,jaccard:1.00], 355m, WA 6232): name="Sanctuary Golf Resort ", web=null, email=null, phone="(08) 9725 2999"
- OSM (high, 41m, sim=1): name="Sanctuary Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Sanctuary Lakes Resort (Australia, 1 courses)

- DB: addr="Greg Norman Drive, Sanctuary Lakes", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:488m,city:sanctuary,jaccard:0.50], 488m, VIC 3030): name="Sanctuary Lakes Golf Club", web="http://www.sanctuarylakes.com.au", email=null, phone="03 9394 9404"
- OSM (medium, 374m, sim=1): name="Sanctuary Lakes Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Sandbar Golf Course (Australia, 1 courses)

- DB: addr="3434 The Lakeway, Pacific Palms", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:688m,city:pacific,jaccard:0.67], 688m, NSW ): name="Sandbar Golf Club", web=null, email="warren.denning@hotmail.com", phone=null
- OSM (low, 20m, sim=0.233): name="Sandbar & Bushland Holiday Parks & Golf Course", web="https://www.sandbarpark.com.au", email="sandbar@paspaley.co", phone="+61 2 6554 4095"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)

### Sandgate Golf Club (Australia, 1 courses)

- DB: addr="Allpass Parade, Shorncliffe", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:222m,city:shorncliffe,db-name-substring,jaccard:1.00], 222m, QLD 4017): name="Sandgate Golf Club", web="https://www.sandgategc.com.au", email=null, phone="3269 3252"
- OSM (high, 11m, sim=1): name="Sandgate Golf Club", web="https://www.sandgategc.com.au/", email="sandgolf@bigpond.net.au", phone="+61 7 3269 3252"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 11m, sim=1)
  - phone: from fed(high, sim=1)

### Sandhurst Golf Club (Australia, 4 courses)

- DB: addr="75 Sandarra Blvd, Sandhurst ", web=null, email=null, phone=null
- golf.com.au (high, sim=0.692, boost=+0.7[coord:301m,city:sandhurst,jaccard:0.50], 301m, VIC 3977): name="Sandhurst Club Ltd", web=null, email=null, phone="03 8787 7011"
- OSM (high, 185m, sim=1): name="Sandhurst Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.692)

### Sandringham Golf Club (Australia, 1 courses)

- DB: addr="Cheltenham Road, Cheltenham", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:108m,city:cheltenham,db-name-substring,jaccard:1.00], 108m, VIC 3193): name="Sandringham Golf Club", web="http://sandringhamgolfclub.org.au", email=null, phone="0477 774 633 Shop"
- OSM (high, 189m, sim=1): name="Sandringham Golf Course", web="https://www.sandringham.golf/", email=null, phone="+61 477 774 633"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Sandy Gallop Golf Club (Australia, 1 courses)

- DB: addr="100 lobb street, Ipswich", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:115m,city:ipswich,db-name-substring,jaccard:1.00], 115m, QLD 4305): name="Sandy Gallop Golf Club", web="https://www.sandygallop.com.au", email="sandygallopgolf@hotmail.com", phone="07 3281 8544"
- OSM (high, 166m, sim=1): name="Sandy Gallop Golf Course", web="http://www.sandygallop.com.au/", email=null, phone="+61 7 3281 8544"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Sarina Golf Club (Australia, 2 courses)

- DB: addr="72 Golf Course Road, Sarina", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2899m,city:sarina,db-name-substring,jaccard:1.00], 2899m, QLD 4737): name="Sarina Golf Club", web="https://www.sarinagolfclub.com.au/cms/", email="info@sarinagolfclub.com.au", phone="07 4956 1761"
- OSM (low, 3029m, sim=1): name="Sarina Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Scaddan Country Club (Australia, 1 courses)

- DB: addr="Coolgardie Esperance Highway, Scaddan", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[coord:471m,city:scaddan], 471m, WA 6447): name="Scaddan Golf Club", web=null, email=null, phone="(08) 9075 6025"
- OSM (high, 52m, sim=1): name="Scaddan Golf Club", web=null, email=null, phone="+61 8 9075 6025"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Scamander River Golf Club (Australia, 1 courses)

- DB: addr="Scamander Avenue, Scamander", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:66m,city:scamander,db-name-substring,jaccard:1.00], 66m, TAS 7215): name="Scamander River Golf Club", web="https://www.facebook.com/scamanderrivergolfclub/", email=null, phone="0407725244"
- OSM (high, 40m, sim=1): name="Scamander River Golf Club", web="https://www.scamandergolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Scone Golf Club (Australia, 1 courses)

- DB: addr="Aberdeen Street, Scone ", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:153m,city:scone,db-name-substring,jaccard:1.00], 153m, NSW 2337): name="Scone Golf Club", web="https://www.sconegolfclub.com.au", email=null, phone="(02) 6545 1814"
- OSM (high, 0m, sim=1): name="Scone Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Scottsdale Golf Club (Australia, 1 courses)

- DB: addr="89 George Street, Scottsdale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1189m,city:scottsdale,db-name-substring,jaccard:1.00], 1189m, TAS 7260): name="Scottsdale Golf Club", web="https://www.facebook.com/scottsdalegolfclubtasmania/", email=null, phone="0417517901"
- OSM (low, 1223m, sim=1): name="Scottsdale Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Sea Lake Golf Club (Australia, 1 courses)

- DB: addr="Greenswamp Road, Sea Lake", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:261m,city:lake,db-name-substring,jaccard:1.00], 261m, VIC 3533): name="Sea Lake Golf Club", web=null, email=null, phone="0488701580"
- OSM (high, 43m, sim=1): name="Sea Lake Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Sea View Golf Club (Australia, 2 courses)

- DB: addr="Jarrad Street, Cottesloe", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:303m,city:cottesloe,db-name-substring,jaccard:1.00], 303m, WA 6011): name="Sea View Golf Club", web="http://www.seaviewgolfclub.com.au", email=null, phone="(08) 9384 0471"
- OSM (high, 157m, sim=0.875): name="Seaview Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Seabrook Golf Club (Australia, 1 courses)

- DB: addr="161 Old Bass Highway, Cooee", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:482m,db-name-substring,jaccard:1.00], 482m, TAS 7322): name="Seabrook Golf Club", web="http://www.seabrookgolfclub.com.au", email="hmackay83@gmail.com", phone="03 6442 2173"
- OSM (medium, 343m, sim=1): name="Seabrook Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Seacliff Golf Club (Australia, 1 courses)

- DB: addr="1 Clubhouse Road, Seacliff", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1493m,city:seacliff,db-name-substring,jaccard:1.00], 1493m, SA 5046): name="Seacliff Golf Club", web="https://seacliffgolfclub.com.au", email="contact@seacliffgolfclub.com.au", phone="0450556352"
- OSM (no-match, 1359m, sim=0.25): name="Marion Golf Park", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Secret Harbour Golf Links WC (Australia, 2 courses)

- DB: addr="Secret Harbour Boulevard, Secret Harbour", web=null, email=null, phone=null
- golf.com.au (high, sim=0.824, boost=+0.63[coord:1495m,city:secret,jaccard:0.75], 1495m, WA 6173): name="Secret Harbour Golf Club", web="https://www.secretsgolf.com.au/", email="mitchroberts@secretsgolf.com.au", phone="08 9524 7133"
- OSM (low, 975m, sim=0.824): name="Secret Harbour Links Golf Course", web="https://www.secretsgolf.com.au/", email=null, phone="+61 8 9524 7133"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.824)
  - email: from fed(high, sim=0.824)
  - phone: from fed(high, sim=0.824)

### Serpentine & Districts Golf Club (Australia, 1 courses)

- DB: addr="1412 Karnup Road, Serpentine", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:190m,city:serpentine,db-name-substring,jaccard:1.00], 190m, WA 6125): name="Serpentine & Districts Golf Club", web="https://serpentinegolfclub.org", email=null, phone="08 9525 2265"
- OSM (low, 66m, sim=0.5): name="Serpentine Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Serpentine & Districts Golf Club v2 (Australia, 1 courses)

- DB: addr="1412 Karnup Road , Serpentine", web=null, email=null, phone=null
- golf.com.au (high, sim=0.87, boost=+0.7[coord:1343m,city:serpentine,jaccard:1.00], 1343m, WA 6125): name="Serpentine & Districts Golf Club", web="https://serpentinegolfclub.org", email=null, phone="08 9525 2265"
- OSM (no-match, 1138m, sim=0.435): name="Serpentine Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.87)
  - phone: from fed(high, sim=0.87)

### Serviceton Golf Club (Australia, 1 courses)

- DB: addr="Adelaide-Melbourne Highway, Serviceton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:368m,city:serviceton,db-name-substring,jaccard:1.00], 368m, VIC 5268): name="Serviceton Golf Club", web=null, email=null, phone="0407184348"
- OSM (high, 13m, sim=1): name="Serviceton Golf Club", web="https://golfer.com.au/directory/serviceton-golf-club-victoria/1267", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 13m, sim=1)
  - phone: from fed(high, sim=1)

### Seymour Golf Club (Australia, 1 courses)

- DB: addr="Goulburn Valley, Seymour", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:seymour,db-name-substring,jaccard:1.00], 4766m, VIC 3660): name="Seymour Golf Club", web=null, email="seygolfclub@bigpond.com", phone="03 5792 1117"
- OSM (high, 156m, sim=1): name="Seymour Golf Club", web="www.seymourgolfclub.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 156m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Sheep Hills Golf Club (Australia, 1 courses)

- DB: addr="Minyip Road, Warracknabeal", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1764m,city:warracknabeal,db-name-substring,jaccard:1.00], 1764m, VIC 3393): name="Sheep Hills Golf Club", web=null, email=null, phone="0418114509"
- OSM (low, 1907m, sim=1): name="Sheep Hills Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Sheffield Golf Club (Australia, 1 courses)

- DB: addr="214 Nook Rd, Sheffield", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:460m,city:sheffield,db-name-substring,jaccard:1.00], 460m, TAS 7306): name="Sheffield Golf Club", web="https://sheffieldgolfclub.net.au/", email="contact@sheffieldgolfclub.net.au", phone="0418199873"
- OSM (medium, 404m, sim=1): name="Sheffield Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Shelly Beach Golf Club (Australia, 1 courses)

- DB: addr="Shelly Beach Road, Shelly Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:11m,city:shelly,db-name-substring,jaccard:1.00], 11m, NSW 2261): name="Shelly Beach Golf Club", web=null, email=null, phone="02 4332 3400"
- OSM (high, 0m, sim=1): name="Shelly Beach Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Shepparton Golf Club (Australia, 1 courses)

- DB: addr="P.O. Box 234, Shepparton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:341m,city:shepparton,db-name-substring,jaccard:1.00], 341m, VIC 3630): name="Shepparton Golf Club", web="https://www.sheppartongolf.net.au", email="info@sheppartongolf.net.au", phone="03 5821 2717"
- OSM (high, 32m, sim=1): name="Shepparton Golf Club", web="https://www.sheppartongolf.net.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Shoalhaven Heads Golf Club (Australia, 2 courses)

- DB: addr="Staples Street, Shoalhaven Heads", web=null, email=null, phone=null
- golf.com.au (high, sim=0.8, boost=+1.25[coord:22m,city:shoalhaven,db-name-substring,jaccard:1.00], 22m, NSW 2535): name="Shoalhaven Heads Golf Club Ltd", web="http://shoalhavenheadsgolf@gday.com.au", email="membership@shoalhavenheadsgolfclub.com.au", phone="02 4448 8683"
- OSM (medium, 274m, sim=1): name="Shoalhaven Heads Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.8)
  - email: from fed(high, sim=0.8)
  - phone: from fed(high, sim=0.8)

### Shortland Waters Golf Club (Australia, 1 courses)

- DB: addr="Off Vale Street, Shortland", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:677m,city:shortland,db-name-substring,jaccard:1.00], 677m, NSW 2299): name="Shortland Waters Golf Club", web="http://www.shortlandwatersgolf.com.au", email="office@shortlandwaters.com.au", phone="02 4955 8169"
- OSM (high, 42m, sim=1): name="Shortland Waters Golf Club", web="http://www.shortlandwaters.com.au", email=null, phone="+61 2 4955 8169"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Singleton Golf Club (Australia, 2 courses)

- DB: addr="51 Boundary St, Singleton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:136m,city:singleton,db-name-substring,jaccard:1.00], 136m, NSW 2330): name="Singleton Golf Club", web="http://www.singletongolfclub.com", email="admin@singletongolfclub.com.au", phone="(02) 6572 1633"
- OSM (high, 87m, sim=1): name="Singleton Golf Club", web="https://www.singletongolfclub.com", email=null, phone="+61 2 6572 1633"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Skipton Golf Club (Australia, 1 courses)

- DB: addr="Geelong-Portland Road , Skipton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:278m,city:skipton,db-name-substring,jaccard:1.00], 278m, VIC 3361): name="Skipton Golf Club", web=null, email=null, phone="53402340"
- OSM (high, 52m, sim=1): name="Skipton Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Skye Golf (Australia, 1 courses)

- DB: addr="Cnr Ballarto & Taylors Rds, Skye", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[coord:247m,jaccard:0.50], 247m, VIC 3977): name="Skye Public Golf Course", web=null, email=null, phone=null
- OSM (no-match, 163104m, sim=0.5): name="Sale Golf Club", web="https://www.salegolfclub.com.au/", email=null, phone="+61 3 5149 7160;+61 3 5149 7230"

### Smithton Country Club (Australia, 1 courses)

- DB: addr="17 Mella Road, Smithton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:206m,city:smithton], 206m, TAS 7330): name="Smithton Golf Club", web="http://www.smithtoncountryclub.com.au", email=null, phone="364522499"
- OSM (high, 58m, sim=1): name="Smithton Golf Course", web="www.smithtoncountryclub.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Smoky Bay Golf Club (Australia, 1 courses)

- DB: addr="Smoky Bay, Glenview", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:249m,city:smoky,db-name-substring,jaccard:1.00], 249m, SA 5680): name="Smoky Bay Golf Club", web=null, email="smokybaygolfclub@gmail.com", phone="(08) 8625 2107"
- OSM (high, 81m, sim=1): name="Smoky Bay Golf Club", web=null, email=null, phone="+61 8 8625 2107"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Snake Valley Golf Club (Australia, 1 courses)

- DB: addr="Chepstowe Road, Snake Valley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:181m,city:snake,db-name-substring,jaccard:1.00], 181m, VIC 3579): name="Snake Valley Golf Club", web=null, email="snakevalleygc@gmail.com", phone="(03)53449424"
- OSM (high, 38m, sim=1): name="Snake Valley Golf course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Snowtown Golf Club (Australia, 1 courses)

- DB: addr="21 High Street, Snowtown", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:283m,city:snowtown,db-name-substring,jaccard:1.00], 283m, SA 5520): name="Snowtown Golf Club", web=null, email=null, phone="0428751003"
- OSM (medium, 331m, sim=1): name="Snowtown Golf Club", web=null, email=null, phone="+61 8 8865 2081"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Sorrento Golf Club (Australia, 2 courses)

- DB: addr="1Langford Rd, Sorrento", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:490m,city:sorrento,db-name-substring,jaccard:1.00], 490m, VIC 3943): name="Sorrento Golf Club", web="http://www.sorrentogolf.com.au", email=null, phone="(03) 5984 2226"
- OSM (high, 3m, sim=1): name="Sorrento Golf Club", web="https://www.sorrentogolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### South Broken Hill Golf Club (Australia, 1 courses)

- DB: addr="Duff Street, Broken Hill South", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:279m,city:broken,db-name-substring,jaccard:1.00], 279m, NSW 2880): name="South Broken Hill Golf Club", web=null, email=null, phone="0400 114 269"
- OSM (high, 147m, sim=1): name="South Broken Hill Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### South Lakes Golf Club (Australia, 2 courses)

- DB: addr="Billabong Road, Goolwa", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:268m,city:goolwa,db-name-substring,jaccard:1.00], 268m, SA 5214): name="South Lakes Golf Club", web="http://www.southlakesgolf.com.au", email=null, phone="(08) 8555 2299"
- OSM (high, 181m, sim=1): name="South Lakes Golf Club", web="https://www.southlakesgolf.com.au/", email=null, phone="+61 8 8555 2299"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### South Pines Golf Club (Australia, 1 courses)

- DB: addr="Lindenow Road, Lindenow South", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:23m,city:lindenow,db-name-substring,jaccard:1.00], 23m, VIC 3875): name="South Pines Golf Club", web=null, email=null, phone="03 5157 1788"
- OSM (high, 46m, sim=1): name="South Pines Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### South West Rocks Country Club (Australia, 1 courses)

- DB: addr="2 Sportmans Way, South West Rocks", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:185m,city:south,db-name-substring,jaccard:1.00], 185m, NSW 2431): name="South West Rocks Country Club", web="https://rockscountryclub.com.au", email=null, phone="02 6566 6252"
- OSM (low, 809m, sim=1): name="South West Rocks Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Southern Cross Golf Club (Australia, 2 courses)

- DB: addr="Turkey Hill Road, Adelaide", web=null, email=null, phone=null
- golf.com.au (high, sim=0.824, boost=+0.95[coord:7m,db-name-substring,jaccard:1.00], 7m, WA 6426): name="Southern Cross Golf Club (WA)", web=null, email="southerncrossgolfclub@gmail.com", phone="0427775325"
- OSM (medium, 363m, sim=1): name="Southern Cross Golf Course", web=null, email=null, phone="+61 8 9049 1288"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.824)
  - phone: from fed(high, sim=0.824)

### Southern Golf Club (Australia, 2 courses)

- DB: addr="Lower Dandenong Road, Keysborough", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:280m,city:keysborough,db-name-substring,jaccard:1.00], 280m, VIC 3172): name="Southern Golf Club", web=null, email=null, phone="03 9798 3111"
- OSM (high, 195m, sim=1): name="Southern Golf Club", web="https://www.southerngolfclub.com.au/", email="info@southerngolfclub.com.au", phone="+61 3 9798 3111"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 195m, sim=1)
  - email: from osm(high, 195m, sim=1)
  - phone: from fed(high, sim=1)

### Southport Golf Club (Australia, 1 courses)

- DB: addr="Slatyer Avenue, Southport", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:224m,city:southport,db-name-substring,jaccard:1.00], 224m, QLD 9726): name="Southport Golf Club", web="http://www.southportgolfclub.com.au", email="admin@southportgolfclub.com.au", phone="(07) 5571 1444"
- OSM (high, 19m, sim=1): name="Southport Golf Club", web="https://www.southportgolfclub.com.au/", email="admin@southportgolfclub.com.au", phone="+61 7 5571 1444"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Spalding Golf Club (Australia, 1 courses)

- DB: addr="Clare Road, Spalding", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:365m,city:spalding,jaccard:1.00], 365m, WA 6530): name="Spalding Park Golf Club", web="https://spgc.com.au", email=null, phone="08 9923 1363"
- OSM (high, 84m, sim=1): name="Spalding Park Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Spalding Park Golf Club (Australia, 1 courses)

- DB: addr="Green Street, Geraldton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:365m,db-name-substring,jaccard:1.00], 365m, WA 6530): name="Spalding Park Golf Club", web="https://spgc.com.au", email=null, phone="08 9923 1363"
- OSM (high, 84m, sim=1): name="Spalding Park Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Spring Ridge Country Club (Australia, 1 courses)

- DB: addr="Park Street, Spring Ridge", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:246m,city:spring,db-name-substring,jaccard:1.00], 246m, NSW 2343): name="Spring Ridge Country Club", web=null, email="cklord@bigpond.com", phone="0427869940"
- OSM (high, 146m, sim=1): name="Spring Ridge Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Spring Valley Golf Club (Australia, 1 courses)

- DB: addr="Heatherton Road, Clayton South", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:70m,city:clayton,db-name-substring,jaccard:1.00], 70m, VIC 3168): name="Spring Valley Golf Club", web="https://www.springvalleygolf.com.au", email="reception@springvalleygolf.com.au", phone="03 9562 3811"
- OSM (high, 17m, sim=1): name="Spring Valley Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Springs Golf & Country Club (Australia, 1 courses)

- DB: addr="1080 Peats Ridge Road, Peats Ridge", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:382m,city:peats,jaccard:1.00], 382m, NSW 2250): name="The Springs Golf and Country Club", web="http://www.the-springs.com.au", email=null, phone="(02) 4373 1522"
- OSM (high, 22m, sim=1): name="The Springs Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Springsure Golf Club (Australia, 1 courses)

- DB: addr="Quarry Street, Springsure", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:225m,city:springsure,db-name-substring,jaccard:1.00], 225m, QLD 4722): name="Springsure Golf Club", web=null, email="springsuregolf@outlook.com", phone="(07) 4984 1905"
- OSM (high, 25m, sim=1): name="Springsure Golf Course", web=null, email=null, phone="+61 7 4984 1351"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Springwood Country Club (Australia, 1 courses)

- DB: addr="84 Hawkesbury Road, Springwood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:30m,city:springwood,db-name-substring,jaccard:1.00], 30m, NSW 2777): name="Springwood Country Club", web="https://www.springwoodgolfclub.com.au", email=null, phone="4751 1122"
- OSM (medium, 304m, sim=1): name="Springwood Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### St Andrews Beach (Australia, 1 courses)

- DB: addr="209 Sandy Road, St Andrews", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:1060m,city:andrews,db-name-substring,jaccard:0.50], 1060m, VIC 3939): name="St Andrews Beach Golf Club", web="http://www.standrewsbeach.com", email=null, phone="03 59885366"
- OSM (low, 1694m, sim=0.842): name="Saint Andrews Beach Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### St Arnaud Country Golf Club (Australia, 1 courses)

- DB: addr="Wycheproof Road, St. Arnaud", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:219m,city:arnaud,jaccard:0.67], 219m, VIC 3478): name="St Arnaud Golf Club", web=null, email=null, phone="0354951727"
- OSM (high, 118m, sim=1): name="St Arnaud Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### St George Golf Club (Australia, 1 courses)

- DB: addr="Golf Links Road, St. George", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:877m,city:george,db-name-substring,jaccard:1.00], 877m, QLD 4487): name="St George Golf Club", web=null, email=null, phone="0746253283"
- OSM (high, 88m, sim=1): name="St George Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### St Helens Golf Club (Australia, 1 courses)

- DB: addr="Storyford Road, St. Helens", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:325m,city:helens,db-name-substring,jaccard:1.00], 325m, TAS 7216): name="St Helens Golf Club", web="https://sthelensgolfclub.com.au", email="flackpatricksandra@gmail.com", phone="03 63761218"
- OSM (high, 35m, sim=0.75): name="Saint Helens Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### St James Golf Club (Australia, 1 courses)

- DB: addr="Benalla/Yarrawonga Road, St. James", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:243m,city:james,db-name-substring,jaccard:1.00], 243m, VIC 3727): name="St James Golf Club", web=null, email=null, phone="0357644450"
- OSM (high, 63m, sim=1): name="St James Golf Club", web=null, email=null, phone="+61 3 5764 4220"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### St Leonards Golf Club (Australia, 1 courses)

- DB: addr="282–320 Ibbotson Street, St. Leonards", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:818m,city:leonards,db-name-substring,jaccard:1.00], 818m, VIC 3223): name="St Leonards Golf Club", web="http://www.stleonards.golf", email=null, phone="0418 340 612"
- OSM (no-match, 218176m, sim=0.545): name="St Arnaud Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### St Lucia Golf Links (Australia, 1 courses)

- DB: addr="Carawa Street, Saint Lucia", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:22m,city:lucia,db-name-substring,jaccard:1.00], 22m, QLD 4067): name="St Lucia Golf Links", web=null, email=null, phone="07 3870 7084"
- OSM (low, 376m, sim=0.727): name="Saint Lucia Golf Links", web=null, email=null, phone="+61 7 3870 3433"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### St Marys Golf Club (Australia, 1 courses)

- DB: addr="Gray Road, St. Marys", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:104m,city:marys,db-name-substring,jaccard:1.00], 104m, TAS 7215): name="St Marys Golf Club", web=null, email="keithgillies3@hotmail.com", phone="03 6372 2177"
- OSM (high, 229m, sim=1): name="St Marys Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### St. Michael's Golf Club (Australia, 1 courses)

- DB: addr="Jennifer Street, Little Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:525m,city:little,jaccard:1.00], 525m, NSW 2036): name="St Michael's Golf Club", web="http://www.stmichaelsgolf.com.au", email=null, phone="(02) 9326 8000"
- OSM (high, 233m, sim=1): name="St Michael's Golf Club", web="https://www.stmichaelsgolf.com.au/", email=null, phone="+61 2 9311 0068"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Stanley Golf Club (Australia, 1 courses)

- DB: addr="32 Marine Esplanade, Stanley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:586m,city:stanley,db-name-substring,jaccard:1.00], 586m, TAS 7331): name="Stanley Golf Club", web="https://stanleygolfclub.com.au/", email="stanleygolfclub@iinet.net.au", phone="03 6458 1395"
- OSM (high, 156m, sim=1): name="Stanley Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Stansbury Golf Club (Australia, 2 courses)

- DB: addr="Gulf View Road, Stansbury", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:329m,city:stansbury,db-name-substring,jaccard:1.00], 329m, SA 5582): name="Stansbury Golf Club", web=null, email=null, phone="08 88524599"
- OSM (no-match, 836120m, sim=0.556): name="Albury Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Stanthorpe Golf Course (Australia, 1 courses)

- DB: addr="54 Amosfield Road, Stanthorpe", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:451m,city:stanthorpe,jaccard:0.67], 451m, QLD 4380): name="Stanthorpe Golf Club", web=null, email=null, phone="07 4681 1276"
- OSM (high, 10m, sim=1): name="Stanthorpe Golf Course", web=null, email=null, phone="+61 7 4681 1276"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Stawell Golf Club (Australia, 1 courses)

- DB: addr="Marnoo Road, Stawell", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2405m,city:stawell,db-name-substring,jaccard:1.00], 2405m, VIC 3380): name="Stawell Golf Club", web=null, email=null, phone="(03) 5358 1492"
- OSM (high, 197m, sim=1): name="Stawell Golf Club", web="http://stawellgolf.com.au/", email=null, phone="+61 3 5358 1492"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 197m, sim=1)
  - phone: from fed(high, sim=1)

### Strahan Golf Club (Australia, 1 courses)

- DB: addr="Meredith Street, Strahan", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:152m,city:strahan,db-name-substring,jaccard:1.00], 152m, TAS 7468): name="Strahan Golf Club", web="https://www.facebook.com/strahangolfclub/", email="strahangolfclub@gmail.com", phone="03 64717242"
- OSM (high, 50m, sim=1): name="Strahan Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Strathallan Golf Club (Australia, 1 courses)

- DB: addr="100 Main Drive, Bundoora", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:69m,city:bundoora,db-name-substring,jaccard:1.00], 69m, VIC 3081): name="Strathallan Golf Club", web=null, email=null, phone="(03) 9457 4734"
- OSM (high, 42m, sim=1): name="Strathallan Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Strathbogie Golf Club (Australia, 1 courses)

- DB: addr="Armstrong Avenue, Strathbogie", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:524m,city:strathbogie,db-name-substring,jaccard:1.00], 524m, VIC 3666): name="Strathbogie Golf Club", web=null, email="jmoorebuilder@bigpond.com", phone="0427348274"
- OSM (high, 63m, sim=1): name="Strathbogie Golf Club", web="https://www.strathbogiegolf.com.au/", email=null, phone="+61 3 5790 5206;+61 3 5778 7424"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 63m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Strathfield Golf Club (Australia, 2 courses)

- DB: addr="52 Weeroona Road, Strathfield", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1159m,city:strathfield,db-name-substring,jaccard:1.00], 1159m, NSW 2129): name="Strathfield Golf Club", web="http://www.strathfieldgolf.com.au", email="office@strathfieldgolf.com.au", phone="(02) 9642 0326"
- OSM (low, 326m, sim=0.579): name="Strathfield Golf Course (private)", web="https://www.strathfieldgolf.com.au/", email=null, phone="+61 2 9642 8642"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Strathmerton Golf Club (Australia, 1 courses)

- DB: addr="Numurkah Road, Strathmerton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:133m,city:strathmerton,db-name-substring,jaccard:1.00], 133m, VIC 3641): name="Strathmerton Golf Club", web=null, email=null, phone="(03) 5873 2550"
- OSM (low, 73m, sim=0.6): name="Strathmerton Recreation Reserve and Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Streaky Bay Golf Club (Australia, 2 courses)

- DB: addr="Montgomerie Terrace, Streaky Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:548m,city:streaky,db-name-substring,jaccard:1.00], 548m, SA 5680): name="Streaky Bay Golf Club", web=null, email=null, phone="0427395691"
- OSM (medium, 355m, sim=1): name="Streaky Bay Golf Course", web=null, email=null, phone="+61 8 8626 1294"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Streatham Golf Club (Australia, 1 courses)

- DB: addr="1 School Street, Streatham", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:267m,city:streatham,db-name-substring,jaccard:1.00], 267m, VIC 3351): name="Streatham Golf Club", web=null, email=null, phone=null
- OSM (high, 119m, sim=1): name="Streatham Golf Club", web=null, email=null, phone=null

### Stroud Golf Club (Australia, 1 courses)

- DB: addr="164 Bucketts Way, Stroud", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:13m,city:stroud,db-name-substring,jaccard:1.00], 13m, NSW 2425): name="Stroud Golf Club", web="http://www.stroudcountryclub.com.au", email=null, phone="(02) 4994 5264"
- OSM (no-match, 924153m, sim=0.556): name="St Arnaud Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Sugar Valley Golf Club (Australia, 1 courses)

- DB: addr="Boundary Street, West Wallsend", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:309m,city:west,db-name-substring,jaccard:1.00], 309m, NSW 2286): name="Sugar Valley Golf Club", web="https://sugarvalleygolfclub.com.au/", email=null, phone="02 4953 2891"
- OSM (high, 24m, sim=1): name="Sugar Valley Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Sun City Country Club (Australia, 1 courses)

- DB: addr="144 St Andrews Drive, Yanchep", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:620m,city:yanchep,db-name-substring,jaccard:1.00], 620m, WA 6035): name="Sun City Country Club", web="https://www.suncitycountryclub.com.au", email=null, phone="(08) 9561 1148"
- OSM (high, 240m, sim=1): name="Sun City Country Club", web="https://www.suncitycountryclub.com.au/", email="office@suncitycountryclub.com.au", phone="+61 8 9561 1352;+61 8 9561 1148"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 240m, sim=1)
  - phone: from fed(high, sim=1)

### Surfers Paradise Golf Club (Australia, 1 courses)

- DB: addr="1 Fairway Drive, Clear Island Waters", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:314m,city:clear,db-name-substring,jaccard:1.00], 314m, QLD 4226): name="Surfers Paradise Golf Club", web="https://www.surfersparadisegolfclub.com.au/", email="office@surfersgolf.com.au", phone="(07) 5572 6088"
- OSM (high, 7m, sim=1): name="Surfers Paradise Golf Club", web="https://www.surfersparadisegolfclub.com.au/", email=null, phone="+61 7 5575 1666;+61 7 5572 6088"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Sussex Inlet Golf Club (Australia, 1 courses)

- DB: addr="7 Golfcourse Way, Sussex Inlet", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:362m,city:sussex,db-name-substring,jaccard:1.00], 362m, NSW 2540): name="Sussex Inlet Golf Club", web="http://sussexinletgolf.com.au", email="sussexgolf@shoalhaven.net.au", phone="02 4441 2259"
- OSM (high, 16m, sim=1): name="Sussex Inlet Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Swan Reach Golf Club (Australia, 2 courses)

- DB: addr="Lot 1 Nildottie Road, Swan Reach", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:283m,city:swan,db-name-substring,jaccard:1.00], 283m, SA 5354): name="Swan Reach Golf Club", web=null, email=null, phone="(08) 8570 2340"
- OSM (high, 140m, sim=1): name="Swan Reach Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Swansea Golf Club (Australia, 1 courses)

- DB: addr="Waterloo Point, Swansea", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:9m,city:swansea,db-name-substring,jaccard:1.00], 9m, TAS 7190): name="Swansea Golf Club", web="https://swanseagolfclubtas.org.au/", email="swanseagolfclub1@bigpond.com", phone="362578262"
- OSM (high, 144m, sim=1): name="Swansea Golf Course", web="https://www.swanseagolfclubtas.org.au/", email=null, phone="+61 3 6257 8262"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Sylvan Glen Golf Course (Australia, 1 courses)

- DB: addr="Kareela Road, Penrose", web=null, email=null, phone=null
- golf.com.au (high, sim=0.182, boost=+0.9[coord:230m,city:penrose,name-token:penrose], 230m, NSW 2579): name="Penrose Country Club", web=null, email=null, phone="(02) 4884 4306"
- OSM (high, 10m, sim=1): name="Sylvan Glen Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.182)

### Tailem Bend Golf Club (Australia, 1 courses)

- DB: addr="Parkland Street, Tailem Bend", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:114m,city:tailem,db-name-substring,jaccard:1.00], 114m, SA 5260): name="Tailem Bend Golf Club", web="http://www.lm.net.au/~tbgolfcb/", email=null, phone="(08) 7554 1111"
- OSM (no-match, 603780m, sim=0.545): name="Devils Bend Golf Course", web="https://www.devilbendgolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Talbingo Golf Club (Australia, 1 courses)

- DB: addr="New Dam Road, Talbingo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:440m,city:talbingo,db-name-substring,jaccard:1.00], 440m, NSW 2720): name="Talbingo Golf Club", web=null, email=null, phone="02 6949 5260"
- OSM (high, 52m, sim=1): name="Talbingo Country Club", web="http://www.talbingocountryclub.com.au/", email=null, phone="+61 2 6949 5260"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 52m, sim=1)
  - phone: from fed(high, sim=1)

### Talbot Golf Club (Australia, 1 courses)

- DB: addr="Lexton Road, Talbot", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:176m,city:talbot,db-name-substring,jaccard:1.00], 176m, VIC 3465): name="Talbot Golf Club", web=null, email="talbotgolfclub@outlook.com", phone=null
- OSM (high, 4m, sim=1): name="Talbot Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)

### Tallai Country Club (Australia, 1 courses)

- DB: addr="Cnr Worongary Road & The Panorama, Tallai", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2164m,city:tallai,db-name-substring,jaccard:1.00], 2164m, QLD 4213): name="Tallai Country Club", web=null, email=null, phone="(07) 5530 2335"
- OSM (no-match, 1358800m, sim=0.667): name="Ballan Golf Course", web="https://www.ballangolfclub.com/", email=null, phone="+61 3 5368 1522"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Tallangatta Golf Club (Australia, 1 courses)

- DB: addr="Coorilla Street, Tallangatta", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:166m,city:tallangatta,db-name-substring,jaccard:1.00], 166m, VIC 3700): name="Tallangatta Golf Club", web=null, email=null, phone="02 60713382"
- OSM (high, 4m, sim=1): name="Tallangatta Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Tallebudgera Golf Course (Australia, 2 courses)

- DB: addr="495 Guineas Creek Road, Tallebudgera", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:9m,city:tallebudgera,db-name-substring,jaccard:1.00], 9m, QLD 4228): name="Tallebudgera Golf Course", web="http://www.tallebudgeragolfcourse.com.au", email="coplicks@bigpond.net.au", phone="(07) 5534 8484"
- OSM (high, 9m, sim=1): name="Tallebudgera Golf Course", web="https://www.tallebudgeragolfcourse.com.au/", email=null, phone="+61 7 5534 8484"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Tallegudgera Golf Club (Australia, 1 courses)

- DB: addr="495 Guineas Creek Road, Tallebudgera", web=null, email=null, phone=null
- golf.com.au (high, sim=0.917, boost=+1.3[coord:9m,city:tallebudgera,name-token:tallebudgera,jaccard:0.67,typo:tallegudgera~tallebudgera], 9m, QLD 4228): name="Tallebudgera Golf Course", web="http://www.tallebudgeragolfcourse.com.au", email="coplicks@bigpond.net.au", phone="(07) 5534 8484"
- OSM (high, 9m, sim=0.917): name="Tallebudgera Golf Course", web="https://www.tallebudgeragolfcourse.com.au/", email=null, phone="+61 7 5534 8484"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.917)
  - email: from fed(high, sim=0.917)
  - phone: from fed(high, sim=0.917)

### Tallwoods Golf Resort (Australia, 1 courses)

- DB: addr="Vardon Road, Tallwoods Village", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[coord:493m,city:tallwoods], 493m, NSW 2430): name="Tallwoods Country Club", web="http://tgc.org.au", email="proshop@tallwoods.com.au", phone="6559 3003"
- OSM (no-match, 917557m, sim=0.556): name="Eastwood Golf Club", web="https://www.eastwoodgolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Tally Valley Golf Club (Australia, 4 courses)

- DB: addr="335-385 Guineas Creek Road, Elanora", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:475m,city:elanora,db-name-substring,jaccard:1.00], 475m, QLD 4221): name="Tally Valley Golf Club", web=null, email=null, phone="0409536760"
- OSM (low, 192m, sim=0.462): name="Cliff Douglas Tally Valley Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Tam O'Shanter Golf Club (Australia, 1 courses)

- DB: addr="19 Fairway Avenue, Tam O'Shanter", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:368m,db-name-substring,jaccard:1.00], 368m, TAS 7252): name="Tam O'Shanter Golf Club", web="https://tamoshantergolfclub.com.au/", email=null, phone="(03) 6329 1225"
- OSM (high, 66m, sim=1): name="Tam O'Shanter Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Tambellup Golf Club (Australia, 1 courses)

- DB: addr="Rourke Street, Tambellup", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:93m,city:tambellup,db-name-substring,jaccard:1.00], 93m, WA 6320): name="Tambellup Golf Club", web=null, email=null, phone="0427253097"
- OSM (high, 19m, sim=1): name="Tambellup Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Tambo Golf Club (Australia, 1 courses)

- DB: addr="Alpha Road, Tambo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:261m,city:tambo,db-name-substring,jaccard:1.00], 261m, QLD 4478): name="Tambo Golf Club", web=null, email=null, phone="0447739033"
- OSM (high, 41m, sim=1): name="Tambo Golf Club", web="https://www.facebook.com/Tambo-Golf-Club-1031884293593314/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 41m, sim=1)
  - phone: from fed(high, sim=1)

### Tammin Golf Club (Australia, 1 courses)

- DB: addr="Yorkrakine Road, Tammin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:491m,city:tammin,db-name-substring,jaccard:1.00], 491m, WA 6409): name="Tammin Golf Club", web=null, email=null, phone="(08) 9045 2054"
- OSM (high, 249m, sim=1): name="Tammin Golf Club", web=null, email=null, phone="+61 8 9637 1076;+61 8 9637 1402"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Tamworth Golf Club (Australia, 1 courses)

- DB: addr="Whisky Creek Road, Tamworth", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:53m,city:tamworth,db-name-substring,jaccard:1.00], 53m, NSW 2340): name="Tamworth Golf Club", web="http://www.tamworthgolfclub.com.au", email="admin@tamworthgolfclub.com.au", phone="02 6765 9393"
- OSM (medium, 265m, sim=1): name="Tamworth Golf Course", web="https://tamworthgolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Tamworth Golf Club (Twilight) (Australia, 1 courses)

- DB: addr="Mahoney Avenue , Tamworth ", web=null, email=null, phone=null
- golf.com.au (high, sim=0.471, boost=+0.9[coord:53m,city:tamworth,jaccard:0.67], 53m, NSW 2340): name="Tamworth Golf Club", web="http://www.tamworthgolfclub.com.au", email="admin@tamworthgolfclub.com.au", phone="02 6765 9393"
- OSM (low, 265m, sim=0.471): name="Tamworth Golf Course", web="https://tamworthgolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.471)
  - email: from fed(high, sim=0.471)
  - phone: from fed(high, sim=0.471)

### Tanilba Bay Golf Club (Australia, 1 courses)

- DB: addr="Lemon Tree Passage Road, Tanilba Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:490m,city:tanilba,db-name-substring,jaccard:1.00], 490m, NSW 2319): name="Tanilba Bay Golf Club", web="http://wwwtanilbagolf.com", email="proshop@tbgc.com.au", phone="(02) 4982 3215"
- OSM (high, 101m, sim=1): name="Tanilba Bay Golf Course", web="https://tilligerryrslsports.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Tanunda Pines Golf Club (Australia, 1 courses)

- DB: addr="39 Pioneer Avenue, Rowland Flat", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:224m,city:rowland,db-name-substring,jaccard:1.00], 224m, SA 5352): name="Tanunda Pines Golf Club", web="https://www.tanundapines.com.au", email="jgumm@pgamember.org.au", phone="08 8563 1200"
- OSM (high, 29m, sim=1): name="Tanunda Pines Golf Club", web="https://www.tanundapines.com.au/", email=null, phone="+61 8 8563 1200"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Tara Golf Club (Australia, 1 courses)

- DB: addr="Kogan Road, Tara", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:916m,city:tara,db-name-substring,jaccard:1.00], 916m, QLD 4421): name="Tara Golf Club", web=null, email=null, phone="4665 3148"
- OSM (no-match, 548501m, sim=0.6): name="Club Taree", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Taralga Golf Club (Australia, 1 courses)

- DB: addr="Old Showground Road, Taralga", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1292m,city:taralga,db-name-substring,jaccard:1.00], 1292m, NSW 2580): name="Taralga Golf Club", web=null, email=null, phone="02 4843 8187"
- OSM (low, 1564m, sim=1): name="Taralga Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Tarcowie Golf Club (Australia, 1 courses)

- DB: addr="High Street, Tarcowie", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:257m,city:tarcowie,db-name-substring,jaccard:1.00], 257m, SA 5431): name="Tarcowie Golf Club", web=null, email=null, phone="0886586026"
- OSM (high, 219m, sim=1): name="Tarcowie Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Taree Golf Club (Australia, 1 courses)

- DB: addr="121 Wingham Road, Taree", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:431m,city:taree,jaccard:1.00], 431m, NSW 2430): name="Club Taree Golf", web=null, email=null, phone="02 6539 4000"
- OSM (high, 12m, sim=1): name="Club Taree Golf Course", web="https://tareerslandgolf.com.au/wp/golf-course/", email=null, phone="+61 2 6539 4000;+61 2 6552 1506"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 12m, sim=1)
  - phone: from fed(high, sim=1)

### Tarnagulla Golf Club (Australia, 1 courses)

- DB: addr="Gladstone Street, Tarnagulla", web=null, email=null, phone=null
- golf.com.au (high, sim=0.526, boost=+0.9[coord:88m,city:tarnagulla,jaccard:0.67], 88m, VIC 3551): name="Tarnagulla + District Golf Club", web=null, email=null, phone=null
- OSM (high, 125m, sim=1): name="Tarnagulla Golf Club", web=null, email=null, phone="+61 3 5438 7328"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from osm(high, 125m, sim=1)

### Taroom Golf Club (Australia, 1 courses)

- DB: addr="Leichhardt Highway, Taroom", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:15m,city:taroom,db-name-substring,jaccard:1.00], 15m, QLD 4420): name="Taroom Golf Club", web=null, email="taroomgc@outlook.com", phone="0429 234 330"
- OSM (high, 145m, sim=1): name="Taroom Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Tarraleah Golf Club (Australia, 1 courses)

- DB: addr="Probula Street, Tarraleah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:20m,db-name-substring,jaccard:1.00], 20m, TAS 7017): name="Tarraleah Golf Club", web="https://www.facebook.com/tarraleah123", email="tarraleahgolfclub@gmail.com", phone="0418327787"
- OSM (medium, 388m, sim=1): name="Tarraleah Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Tarrawingee Golf Club (Australia, 1 courses)

- DB: addr="Recreation Reserve, Ovens Highway, Tarrawingee", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:208m,city:tarrawingee,db-name-substring,jaccard:1.00], 208m, VIC 3676): name="Tarrawingee Golf Club", web=null, email=null, phone="0357251525"
- OSM (high, 201m, sim=1): name="Tarrawingee Golf Club", web=null, email=null, phone="+61 3 5725 1729;+61 3 5725 1826;+61 3 5727 9330"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Tasmania Golf Club (Australia, 1 courses)

- DB: addr="Tasman Highway, Barilla Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.65[coord:1976m,db-name-substring,jaccard:1.00], 1976m, TAS 7172): name="Tasmania Golf Club", web="http://www.tasmaniagolfclub.com.au", email="golf@tasmaniagolfclub.com.au", phone="03 6248 5098"
- OSM (low, 2099m, sim=1): name="Tasmania Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Tathra Beach Country Club (Australia, 1 courses)

- DB: addr="Andy Poole Drive, Tathra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:20m,city:tathra,db-name-substring,jaccard:1.00], 20m, NSW 2550): name="Tathra Beach Country Club", web="https://www.tathrabeachcountryclub.com/", email="tbcclub@outlook.com", phone="(02) 6494 1220"
- OSM (medium, 445m, sim=1): name="Tathra Beach Country Club - Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Tea Tree Golf Club (Australia, 4 courses)

- DB: addr="10A Volcanic Drive, Brighton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:310m,city:brighton,db-name-substring,jaccard:1.00], 310m, TAS 7030): name="Tea Tree Golf Club", web=null, email=null, phone="(03) 6268 1692"
- OSM (low, 537m, sim=1): name="Tea Tree Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Tea Tree Golf Club (TTGC) (Australia, 1 courses)

- DB: addr="10 Volcanic Dr, Brighton TAS 7030, BRIGHTON", web=null, email=null, phone=null
- golf.com.au (high, sim=0.615, boost=+1[coord:310m,city:brighton,plz:7030,jaccard:0.67], 310m, TAS 7030): name="Tea Tree Golf Club", web=null, email=null, phone="(03) 6268 1692"
- OSM (low, 537m, sim=0.615): name="Tea Tree Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.615)

### Tea Tree Gully Golf Club (Australia, 2 courses)

- DB: addr="1 Hamilton Road, Fairview Park", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:139m,city:fairview,db-name-substring,jaccard:1.00], 139m, SA 5097): name="Tea Tree Gully Golf Club", web="http://www.ttggolfclub.com.au", email=null, phone="(08) 8251 9200"
- OSM (high, 54m, sim=1): name="Tea Tree Gully Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Temora Golf Club (Australia, 1 courses)

- DB: addr="Golf Club Road, Temora", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:465m,city:temora,db-name-substring,jaccard:1.00], 465m, NSW 2666): name="Temora Golf Club", web="https://www.temoragolfclub.com.au", email=null, phone="026978 0160"
- OSM (high, 90m, sim=1): name="Temora Golf Club", web="https://www.temoragolfclub.com.au/", email=null, phone="+61 2 6978 0160"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Tenterfield Golf Club (Australia, 1 courses)

- DB: addr="Pelham St, Enterfield", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:167m,db-name-substring,jaccard:1.00], 167m, NSW 2372): name="Tenterfield Golf Club", web="http://www.tenterfieldgolfclub.com.au", email=null, phone="02 6736 1480"
- OSM (high, 118m, sim=1): name="Tenterfield Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Terang Golf Club (Australia, 2 courses)

- DB: addr="Centenary Park, High Street, Terang", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:354m,city:terang,db-name-substring,jaccard:1.00], 354m, VIC 3264): name="Terang Golf Club", web=null, email="pbeasley@bigpond.net.au", phone="03 5592 1050"
- OSM (high, 120m, sim=1): name="Terang Golf Club", web="www.teranggolfclub.com.au", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 120m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Terrey Hills Golf & Country Club (Australia, 1 courses)

- DB: addr="116 Booralie Road, Terrey Hills", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1[coord:77m,city:terrey,jaccard:1.00], 77m, NSW 2084): name="Terrey Hills Golf + Country Club", web="http://www.terreyhillsgolf.com.au", email=null, phone="(02) 9450 0155"
- OSM (high, 95m, sim=1): name="Terrey Hills Golf & Country Club", web="https://www.terreyhillsgolf.com.au/", email="info@terreyhillsgolf.com.au", phone="+61 2 9450 0155"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 95m, sim=1)
  - phone: from fed(high, sim=1)

### Texas Golf Club (Australia, 1 courses)

- DB: addr="Mingoola Road, Texas", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:162m,city:texas,db-name-substring,jaccard:1.00], 162m, QLD 4385): name="Texas Golf Club", web=null, email=null, phone="07 46531119"
- OSM (no-match, 1293901m, sim=0.5): name="Terang Golf Club", web="www.teranggolfclub.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Thaxted Park Golf Club (Australia, 1 courses)

- DB: addr="1 Golf Course Drive, Woodcroft", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:350m,city:woodcroft,db-name-substring,jaccard:1.00], 350m, SA 5162): name="Thaxted Park Golf Club", web="http://www.thaxtedparkgolfclub.com.au", email=null, phone="(08) 8325 0046"
- OSM (high, 57m, sim=1): name="Thaxted Park Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The Australian Golf Club (Australia, 1 courses)

- DB: addr="53 Bannerman Crescent, Rosebery", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:251m,city:rosebery,db-name-substring,jaccard:1.00], 251m, NSW 1445): name="The Australian Golf Club", web="http://www.australiangolfclub.com", email=null, phone="(02) 9663 2273"
- OSM (high, 51m, sim=1): name="The Australian Golf Club", web="https://www.australiangolfclub.com/", email=null, phone="+61 2 9663 2273"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The Barwon Heads Golf Club (Australia, 2 courses)

- DB: addr="Golf Links Road, Barwon Heads", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1[coord:34m,city:barwon,jaccard:1.00], 34m, VIC 3227): name="Barwon Heads Golf Club", web="http://www.bhgc.com.au", email=null, phone="03 5255 6255"
- OSM (medium, 446m, sim=1): name="Barwon Heads Golf Course", web="http://www.bhgc.com.au/", email=null, phone="+61 3 5255 6255"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The Coast Golf and Recreation Club (Australia, 1 courses)

- DB: addr="1 Coast Hospital Road, Little Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=0.556, boost=+0.9[coord:33m,city:little,jaccard:0.67], 33m, NSW 2036): name="The Coast Golf and Rec Club", web="https://www.coastgolf.com.au", email=null, phone="02 9311 7422"
- OSM (high, 201m, sim=1): name="The Coast Golf Club", web="https://www.coastgolf.com.au/", email="office@coastgolf.com.au", phone="+61 2 9311 7422"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.556)
  - email: from osm(high, 201m, sim=1)
  - phone: from fed(high, sim=0.556)

### The Country Club St Georges Basin (Australia, 1 courses)

- DB: addr="11 Paradise Beach Road, Sanctuary Point", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:338m,city:sanctuary,db-name-substring,jaccard:1.00], 338m, NSW 2540): name="The Country Club St Georges Basin", web="http://www.basincountryclub.com.au", email="dfoster955@gmail.com", phone="02 4443 0666"
- OSM (high, 237m, sim=1): name="St Georges Basin Country Club", web="https://thecountryclub.com.au/", email=null, phone="+61 2 4443 0836"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The Cut Golf Course (Australia, 1 courses)

- DB: addr="69 Country Club Drive, Dawesville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:399m,db-name-substring,jaccard:1.00], 399m, WA 6210): name="The Cut Golf Course", web="https://www.thecutgolf.com.au", email=null, phone="08 9582 4444"
- OSM (high, 134m, sim=1): name="The Cut Golf Course", web="https://the-cut.com.au/", email=null, phone="+61 8 9582 4422"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The Dunes Golf Links (Australia, 3 courses)

- DB: addr="335 Browns Road, Rye", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.45[coord:510m,jaccard:0.67], 510m, VIC 3941): name="The Dunes Golf Club", web="http://www.thedunes.com.au", email="golf@thedunes.com.au", phone="(03) 5985 1334"
- OSM (high, 226m, sim=1): name="The Dunes Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The Dunes Port Hughes (Australia, 1 courses)

- DB: addr="St Andrews Dr, Port Hughes", web=null, email=null, phone=null
- golf.com.au (high, sim=0.607, boost=+0.88[coord:1025m,city:port,db-name-substring,jaccard:0.75], 1025m, SA 5558): name="Copperclub, The Dunes Port Hughes", web="https://www.copperclub.com.au", email="golf@copperclub.com.au", phone="08 8825 2001"
- OSM (low, 801m, sim=0.118): name="Moonta Golf Club", web=null, email=null, phone="+61 8 8825 2107"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.607)
  - email: from fed(high, sim=0.607)
  - phone: from fed(high, sim=0.607)

### The Eastern Golf Club (Australia, 9 courses)

- DB: addr="215 Victoria Road, Yering", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1[coord:94m,city:yering,jaccard:1.00], 94m, VIC 3770): name="Eastern Golf Club", web=null, email=null, phone="03 9739 0110"
- OSM (high, 121m, sim=1): name="Eastern Golf Club", web="https://www.easterngolfclub.com.au/", email="info@easterngolfclub.com.au", phone="+61 3 9739 0110"

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from osm(high, 121m, sim=1)
  - email: from osm(high, 121m, sim=1)
  - phone: from fed(high, sim=1)

### The Glades Golf Club (Australia, 1 courses)

- DB: addr="1 Glades Drive, Robina", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.25[coord:748m], 748m, QLD 4226): name="The Glades Driving Range", web=null, email=null, phone="0403170287"
- OSM (low, 645m, sim=1): name="Glades Golf Course", web="https://www.glades.com.au/", email=null, phone="+61 7 5569 1900"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### The Grand Golf Club (Australia, 2 courses)

- DB: addr="Duff Street, San Diego", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:213m,db-name-substring,jaccard:1.00], 213m, QLD 4211): name="The Grand Golf Club", web="http://www.grandgolf.com.au", email=null, phone="(07) 5596 0400"
- OSM (high, 207m, sim=1): name="The Grand Golf Club", web="https://www.thegrandgolfclub.com.au/", email=null, phone="+61 7 5596 0400"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The Grand Golf Club Gold Coast (Australia, 1 courses)

- DB: addr="364 Gilston Road, Gilston", web=null, email=null, phone=null
- golf.com.au (high, sim=0.313, boost=+0.85[coord:213m,city:gilston,jaccard:0.50], 213m, QLD 4211): name="The Grand Golf Club", web="http://www.grandgolf.com.au", email=null, phone="(07) 5596 0400"
- OSM (low, 207m, sim=0.313): name="The Grand Golf Club", web="https://www.thegrandgolfclub.com.au/", email=null, phone="+61 7 5596 0400"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.313)
  - phone: from fed(high, sim=0.313)

### The Grange Golf Club (Australia, 2 courses)

- DB: addr="White Sands Drive, Grange", web=null, email=null, phone=null
- golf.com.au (high, sim=0.667, boost=+1.25[coord:67m,city:grange,db-name-substring,jaccard:1.00], 67m, SA 5021): name="The Grange Golf Club (SA) ", web="https://www.grangegolf.com.au", email="membership@grangegolf.com.au", phone="08 8355 7100"
- OSM (medium, 274m, sim=1): name="Grange Golf Course", web="https://www.grangegolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.667)
  - email: from fed(high, sim=0.667)
  - phone: from fed(high, sim=0.667)

### The Lakes Golf Club (Australia, 1 courses)

- DB: addr="Corner King St & Vernon Avenue, Eastlakes", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1084m,city:eastlakes,db-name-substring,jaccard:1.00], 1084m, NSW 1460): name="The Lakes Golf Club", web="http://www.thelakesgolfclub.com.au", email="bookings@thelakesgolfclub.com.au", phone="(02) 9669 1311"
- OSM (low, 626m, sim=1): name="The Lakes Golf Course", web="https://www.thelakesgolfclub.com.au/", email="info@thelakesgolfclub.com.au", phone="+61 2 9669 1311"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The Links - Shell Cove (Australia, 2 courses)

- DB: addr="Corner Southern Cross Boulevarde and Shellharbour Road Shell Cove, Shellharbour", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.4[coord:2114m,jaccard:1.00], 2114m, NSW 2529): name="The Links Shell Cove", web="http://www.linksshellcove.com.au", email="admin@linksshellcove.com.au", phone="02 4237 5955"
- OSM (low, 2542m, sim=1): name="The Links Shell Cove", web="https://www.linksshellcove.com.au/", email=null, phone="+61 2 4237 5955"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The National Golf Club (Australia, 4 courses)

- DB: addr="The Cups Drive, Cape Schanck", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:242m,city:cape,db-name-substring,jaccard:1.00], 242m, VIC 3939): name="The National Golf Club", web="https://www.nationalgolf.com.au", email=null, phone="(03) 5988 6666"
- OSM (high, 231m, sim=1): name="The National Golf Club", web="https://www.nationalgolf.com.au/", email=null, phone="+61 3 5988 6666"

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The Palms Mawson Lakes Golf Club (Australia, 3 courses)

- DB: addr="Mawson Lakes Boulevard, Mawson Lakes", web=null, email=null, phone=null
- golf.com.au (high, sim=0.667, boost=+0.63[coord:1571m,city:mawson,jaccard:0.75], 1571m, SA 5106): name="Mawson Lakes Golf Club", web="https://mawsonlakesgolfclub.com.au", email="mlgc@mawsonlakesgc.com.au", phone="08 8302 3412"
- OSM (no-match, 1514m, sim=0.667): name="Mawson Lakes Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=0.667)
  - email: from fed(high, sim=0.667)
  - phone: from fed(high, sim=0.667)

### The Ridge Golf Course (Australia, 1 courses)

- DB: addr="The Ridge Sports Complex, Recreation Drive off New Illawarra Road, Barden Ridge", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:155m,city:barden,db-name-substring,jaccard:1.00], 155m, NSW 2234): name="The Ridge Golf Course", web=null, email="play@theridgegolf.com.au", phone="02 9541 4960"
- OSM (no-match, 696349m, sim=0.556): name="Bembridge Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The Royal Sydney Golf Club (Australia, 2 courses)

- DB: addr="Kent Road, Rose Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:571m,city:rose,db-name-substring,jaccard:1.00], 571m, NSW 2029): name="The Royal Sydney Golf Club", web="https://www.rsgc.com.au", email=null, phone="02 8362 7000"
- OSM (high, 161m, sim=1): name="Royal Sydney Golf Club", web="https://www.rsgc.com.au/", email=null, phone="+61 2 8362 7075;+61 2 8362 7000"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The Sands - Torquay (Australia, 2 courses)

- DB: addr="2 Sands Boulevard, Torquay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:52m,city:torquay,jaccard:0.67], 52m, VIC 3228): name="The Sands Torquay Golf Club", web="https://www.thesandstorquay.com/", email="golf@thesandstorquay.com", phone="03 5264 3333"
- OSM (low, 956m, sim=0.077): name="Torquay Sands Golf Club", web="https://thesandstorquay.com", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The Springs Club (Australia, 2 courses)

- DB: addr="405 Forrest Road, Armadale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:280m,db-name-substring,jaccard:1.00], 280m, WA 6112): name="The Springs Club", web=null, email=null, phone="08 9498 2795"
- OSM (high, 136m, sim=1): name="The Springs Club", web="https://www.armadalegolf.club/", email=null, phone="+61 8 9498 2795"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 136m, sim=1)
  - phone: from fed(high, sim=1)

### The Springs Golf & Country Club (Australia, 2 courses)

- DB: addr="817 Peats Ridge Road, Peats Ridge", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:382m,city:peats,jaccard:1.00], 382m, NSW 2250): name="The Springs Golf and Country Club", web="http://www.the-springs.com.au", email=null, phone="(02) 4373 1522"
- OSM (high, 22m, sim=1): name="The Springs Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The Vines of Reynella (Australia, 1 courses)

- DB: addr="Pine Rd, Happy Valley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:208m,city:happy,jaccard:0.67], 208m, SA 5159): name="The Vines Golf Club of Reynella", web="http://www.vinesgolfclub.com.au", email=null, phone="(08) 8381 1822"
- OSM (high, 92m, sim=1): name="The Vines of Reynella", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The Vines Resort - Golf Course (Australia, 2 courses)

- DB: addr="Verdelho Drive, The Vines", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[coord:469m,city:vines], 469m, WA 6069): name="The Vines Golf and Country Club", web=null, email=null, phone="(08) 9297 3000"
- OSM (high, 9m, sim=1): name="The Vines Golf Course", web="https://www.vines.com.au/golf", email="info@vines.com.au", phone="+61 8 9297 0709"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 9m, sim=1)
  - email: from osm(high, 9m, sim=1)
  - phone: from fed(high, sim=1)

### The Vines Resort & Country Club (Australia, 2 courses)

- DB: addr="Verdhello Drive, The Vines", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:469m,city:vines,jaccard:0.50], 469m, WA 6069): name="The Vines Golf and Country Club", web=null, email=null, phone="(08) 9297 3000"
- OSM (high, 9m, sim=1): name="The Vines Golf Course", web="https://www.vines.com.au/golf", email="info@vines.com.au", phone="+61 8 9297 0709"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 9m, sim=1)
  - email: from osm(high, 9m, sim=1)
  - phone: from fed(high, sim=1)

### The Vintage Golf Club (Australia, 2 courses)

- DB: addr="Vintage Drive, Rothbury", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:632m,db-name-substring,jaccard:1.00], 632m, NSW 2320): name="The Vintage Golf Club", web="http://www.thevintage.com.au", email="aalgie@thevintage.com.au", phone="(02) 4998 2644"
- OSM (low, 801m, sim=1): name="The Vintage Golf Club", web="https://chateauelan.com.au/golf-course-hunter-valley/", email="golf@thevintage.com.au", phone="+61 2 4998 2208;+61 2 4998 6789"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The West Golf Club (Australia, 1 courses)

- DB: addr="Rowsley Road, Bacchus Marsh", web=null, email=null, phone=null
- golf.com.au (high, sim=0.222, boost=+0.9[coord:128m,city:bacchus,name-token:bacchus], 128m, VIC 3340): name="Bacchus Marsh West Golf Club", web=null, email="info.bmwgc@gmail.com", phone="03 5367 3492"
- OSM (low, 76m, sim=0.222): name="Bacchus Marsh West Golf Club", web="https://www.bacchusmarshgolfclub.com.au", email=null, phone="+61 3 5367 3492"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.222)
  - phone: from fed(high, sim=0.222)

### The Western Australian Golf Club (Australia, 1 courses)

- DB: addr="60 Hayes Avenue, Yokine", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1[coord:217m,city:yokine,jaccard:1.00], 217m, WA 6060): name="Western Australian Golf Club", web="https://www.wagolfclub.com.au", email="admin@wagolfclub.com.au", phone="08 9349 1988"
- OSM (medium, 264m, sim=1): name="Western Australian Golf Club", web="https://www.wagolfclub.com.au/", email=null, phone="+61 8 9349 1988"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Theodore Golf Club (Australia, 1 courses)

- DB: addr="Woolthorpe Road, Theodore", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:85m,city:theodore,db-name-substring,jaccard:1.00], 85m, QLD 4719): name="Theodore Golf Club", web=null, email=null, phone="0427118474"
- OSM (high, 12m, sim=1): name="Theodore Golf Club", web=null, email=null, phone="+61 7 4993 1868"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Thirlstane Golf Club (Australia, 1 courses)

- DB: addr="Squeaking Point Road, Thirlstane", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:230m,city:thirlstane,db-name-substring,jaccard:1.00], 230m, TAS 7307): name="Thirlstane Golf Club", web="http://www.thirlstanegolfclub.com.au", email="secretary@thirlstanegolfclub.com.au", phone="03 6428 6488"
- OSM (high, 40m, sim=1): name="Thirlstane Golf Club", web="https://www.thirlstanegolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Thirteenth Beach Golf Links (Australia, 2 courses)

- DB: addr="Barwon Heads Road, Barwon Heads", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:102m,city:barwon,jaccard:0.67], 102m, VIC 3227): name="Thirteenth Beach Golf Club", web=null, email=null, phone="03 5254 2922"
- OSM (low, 286m, sim=0.5): name="13th Beach Golf Links", web="http://www.13thbeach.net/", email="info@13thbeach.net", phone="+61 3 5254 2922"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Thredbo Golf Club (Australia, 1 courses)

- DB: addr="Thredbo Village, Thredbo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:621m,city:thredbo,db-name-substring,jaccard:1.00], 621m, NSW 2625): name="Thredbo Golf Club", web=null, email=null, phone="0414 700 321"
- OSM (low, 891m, sim=1): name="Thredbo Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Three Springs Golf Club (Australia, 1 courses)

- DB: addr="Eneabba Three Springs Road, Three Springs", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:82m,city:three,db-name-substring,jaccard:1.00], 82m, WA 6519): name="Three Springs Golf Club", web=null, email="baileymutter@outlook.com", phone="(08) 9954 1190"
- OSM (high, 198m, sim=1): name="Three Springs Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Thurgoona Golf Club (Australia, 1 courses)

- DB: addr="1 Evesham Place, Thurgoona", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[coord:418m,city:thurgoona], 418m, NSW 2640): name="Thurgoona Country Club Resort", web="https://www.thurgoonaresort.com.au", email=null, phone="02 6043 1411"
- OSM (high, 146m, sim=1): name="Thurgoona Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Timboon Golf Club (Australia, 1 courses)

- DB: addr="Egan Street, Timboon", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:273m,city:timboon,db-name-substring,jaccard:1.00], 273m, VIC 3268): name="Timboon Golf Club", web=null, email=null, phone="0423713994"
- OSM (high, 24m, sim=1): name="Timboon Golf Club", web="http://www.timboongolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 24m, sim=1)
  - phone: from fed(high, sim=1)

### Tin Can Bay Country Golf Club (Australia, 1 courses)

- DB: addr="74 Riverview Road, Tin Can Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[coord:189m,jaccard:0.50], 189m, QLD 4580): name="Tin Can Bay Country Club", web="https://www.tcbcc.com.au", email="info@tcbcc.com.au", phone="07 5486 4231"
- OSM (no-match, 763575m, sim=0.545): name="Tanilba Bay Golf Course", web="https://tilligerryrslsports.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Tipperary Golf Club (Australia, 1 courses)

- DB: addr="Monteagle Road, Young", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:young,db-name-substring,jaccard:1.00], 3044m, NSW 2594): name="Tipperary Golf Club", web=null, email=null, phone="0491026508"
- OSM (low, 75m, sim=0): name="Young Golf Club", web="http://www.younggolfclub.com.au/", email=null, phone="+61 2 6382 1543;+61 417 659 425"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Tirhatuan Lakes Public Golf Course (Australia, 2 courses)

- DB: addr="Corner of Police & Stud Roads, Rowville", web=null, email=null, phone=null
- golf.com.au (high, sim=0.4, boost=+0.75[coord:509m,city:rowville,name-token:rowville], 509m, VIC ): name="Rowville Lakes GC", web=null, email=null, phone="0433 532 846"
- OSM (low, 127m, sim=0.4): name="Rowville Lakes Public Golf Course", web="www.tirhatuangolf.com.au", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.4)

### Tocumwal Golf Resort (Australia, 4 courses)

- DB: addr="36-40 Tocumwal Barooga Rd, Tocumwal", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:293m,city:tocumwal,jaccard:0.67], 293m, NSW 2714): name="Tocumwal Golf Club", web="http://www.tocumwalgolf.com.au", email=null, phone="03 5874 9111"
- OSM (high, 130m, sim=1): name="Tocumwal Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Toodyay Golf Club (Australia, 1 courses)

- DB: addr="Racecourse Road, Toodyay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2787m,city:toodyay,db-name-substring,jaccard:1.00], 2787m, WA 6566): name="Toodyay Golf Club", web=null, email="toodyaygolfclub2@gmail.com", phone="(08) 9574 2056"
- OSM (low, 2941m, sim=1): name="Toodyay Golf Course", web=null, email=null, phone="+61 8 9574 2883"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Toogoolawah Golf Club (Australia, 2 courses)

- DB: addr="Annette Street, Toogoolawah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:230m,city:toogoolawah,db-name-substring,jaccard:1.00], 230m, QLD 4313): name="Toogoolawah Golf Club", web=null, email=null, phone="07 5423 1778"
- OSM (high, 68m, sim=1): name="Toogoolawah Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Tooleybuc Sporting Club (Australia, 1 courses)

- DB: addr="Lockhart Road, Tooleybuc", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:232m,city:tooleybuc,jaccard:0.67], 232m, NSW 2736): name="Tooleybuc Sporting Golf Club", web="https://tooleybucsc.com.au/", email=null, phone="(03) 5030 5476"
- OSM (high, 134m, sim=1): name="Tooleybuc Sporting Club Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Toolondo Golf Club (Australia, 1 courses)

- DB: addr="Rocklands Road, Toolondo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:522m,db-name-substring,jaccard:1.00], 522m, VIC 3402): name="Toolondo Golf Club", web=null, email=null, phone="(03) 53881314"
- OSM (high, 72m, sim=1): name="Toolondo Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Toongabbie Golf Club (Australia, 1 courses)

- DB: addr="Toongabbie Road, Toongabbie", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:344m,city:toongabbie,db-name-substring,jaccard:1.00], 344m, VIC 3844): name="Toongabbie Golf Club", web=null, email=null, phone=null
- OSM (high, 28m, sim=1): name="Toongabbie Golf Course", web=null, email=null, phone=null

### Toowoomba Golf Club Middle Ridge (Australia, 1 courses)

- DB: addr="235-323 Rowbotham Street, Middle Ridge", web=null, email=null, phone=null
- golf.com.au (high, sim=0.409, boost=+0.7[coord:688m,city:middle,jaccard:0.50], 688m, QLD 4350): name="Toowoomba Golf Club", web="https://www.toowoombagolfclub.com.au", email="admin@toowoombagolfclub.com.au", phone="07 4635 1219"
- OSM (low, 458m, sim=0.409): name="Toowoomba Golf Club", web="https://www.toowoombagolfclub.com.au/", email=null, phone="+61 7 4635 1219"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.409)
  - email: from fed(high, sim=0.409)
  - phone: from fed(high, sim=0.409)

### Toronto Country Club (Australia, 1 courses)

- DB: addr="Rathmines", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.25[coord:541m], 541m, NSW 2283): name="Toronto Golf Club", web="http://www.torontocc.com.au", email=null, phone="02 4959 1584"
- OSM (high, 30m, sim=1): name="Toronto Country Club", web="https://www.torontocc.com.au/", email=null, phone="+61 2 4959 5063;+61 2 4959 1584"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Torquay Golf Club (Australia, 1 courses)

- DB: addr="1 Great Ocean Road, Torquay", web=null, email=null, phone=null
- golf.com.au (high, sim=0.538, boost=+0.75[city:torquay,db-name-substring,jaccard:0.67], 4328m, VIC 3228): name="The Sands Torquay Golf Club", web="https://www.thesandstorquay.com/", email="golf@thesandstorquay.com", phone="03 5264 3333"
- OSM (high, 18m, sim=1): name="Torquay Golf Club", web="https://www.torquaygolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.538)
  - email: from fed(high, sim=0.538)
  - phone: from fed(high, sim=0.538)

### Tottenham Golf Club (Australia, 1 courses)

- DB: addr="Malcolm Mawson Avenue, Tottenham", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:394m,city:tottenham,db-name-substring,jaccard:1.00], 394m, NSW 2873): name="Tottenham Golf Club", web=null, email=null, phone="6892 4132"
- OSM (high, 160m, sim=1): name="Tottenham Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Toukley Golf Club (Australia, 1 courses)

- DB: addr="Key Street, Toukley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:24m,city:toukley,db-name-substring,jaccard:1.00], 24m, NSW 2263): name="Toukley Golf Club", web="https://www.toukleygolfclub.com.au", email=null, phone="02 4396 5811"
- OSM (low, 550m, sim=1): name="Toukley Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Townsville Golf Club (Australia, 3 courses)

- DB: addr="Benson Street, Rosslea", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:521m,city:rosslea,db-name-substring,jaccard:1.00], 521m, QLD 4812): name="Townsville Golf Club", web="http://www.townsvillegolfclub.com.au", email=null, phone="07 4779 0133"
- OSM (high, 87m, sim=1): name="Townsville Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Trafalgar Golf Club (Australia, 1 courses)

- DB: addr="Gibson Road, Trafalgar", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:270m,city:trafalgar,db-name-substring,jaccard:1.00], 270m, VIC 3824): name="Trafalgar Golf Club", web=null, email="golf@trafalgargolf.com.au", phone="(03) 5633 1110"
- OSM (high, 35m, sim=1): name="Trafalgar Golf Club", web="https://trafalgargolf.com.au/", email=null, phone="+61 3 5633 1110"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 35m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Trangie Golf Club (Australia, 1 courses)

- DB: addr="Dandaloo Street, Trangie", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:20m,city:trangie,db-name-substring,jaccard:1.00], 20m, NSW 2823): name="Trangie Golf Club", web=null, email=null, phone="6888 7159"
- OSM (medium, 421m, sim=1): name="Trangie Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Traralgon Golf club (Australia, 1 courses)

- DB: addr="Princes Highway, Traralgon", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:182m,city:traralgon,db-name-substring,jaccard:1.00], 182m, VIC 3844): name="Traralgon Golf Club", web="http://traralgongolfclub.com.au", email=null, phone="(03) 5174 1709"
- OSM (high, 70m, sim=1): name="Traralgon Golf Course", web="www.traralgongolfclub.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Trentham Golf Club (Australia, 1 courses)

- DB: addr="54 Falls Road , Trentham", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:652m,city:trentham,db-name-substring,jaccard:1.00], 652m, VIC 3458): name="Trentham Golf Club", web="https://www.trenthamgolf.com.au", email=null, phone="0354241240"
- OSM (medium, 394m, sim=1): name="Trentham Golf Club", web="https://www.trenthamgolf.com.au/", email=null, phone="+61 3 5424 1240"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Trundle Golf Club (Australia, 1 courses)

- DB: addr="Austral Street, Trundle", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:17m,city:trundle,db-name-substring,jaccard:1.00], 17m, NSW 2875): name="Trundle Golf Club", web=null, email=null, phone="(02) 6892 1075"
- OSM (medium, 339m, sim=1): name="Trundle Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Tully Country Golf Club (Australia, 1 courses)

- DB: addr="Pratt Street, Tully", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:27m,city:tully,db-name-substring,jaccard:1.00], 27m, QLD 4854): name="Tully Country Golf Club", web=null, email=null, phone="4068 1236"
- OSM (high, 58m, sim=1): name="Tully Golf and Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Tully Park Early Birds Golf Club (Australia, 1 courses)

- DB: addr="38 Chantry Street, Goulburn", web=null, email=null, phone=null
- golf.com.au (high, sim=0.294, boost=+0.85[coord:63m,city:goulburn,jaccard:0.50], 63m, NSW 2580): name="Tully Park Golf Club", web="https://www.tullyparkgolf.com.au", email="tullyparkgolf@gmail.com", phone="0459506696"
- OSM (low, 125m, sim=0.294): name="Tully Park Golf Course", web="http://www.tullyparkgolf.com/", email=null, phone="+61 2 4822 2828"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.294)
  - email: from fed(high, sim=0.294)
  - phone: from fed(high, sim=0.294)

### Tumbarumba Golf Club (Australia, 1 courses)

- DB: addr="Lynne Park, Tumbarumba", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:191m,city:tumbarumba,db-name-substring,jaccard:1.00], 191m, NSW 2653): name="Tumbarumba Golf Club", web=null, email=null, phone="(02) 69482286"
- OSM (high, 38m, sim=1): name="Tumbarumba Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Tumby Bay Golf Club (Australia, 2 courses)

- DB: addr="Lipson Road, Tumby Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:396m,city:tumby,db-name-substring,jaccard:1.00], 396m, SA 5605): name="Tumby Bay Golf Club", web=null, email="tumbygolf@gmail.com", phone="(08) 8688 2474"
- OSM (high, 113m, sim=1): name="Tumby Bay Golf Club", web=null, email=null, phone="+61 8 8688 2393"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Tumut Golf Club (Australia, 1 courses)

- DB: addr="Fairway Dve, Tumut", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:323m,city:tumut,db-name-substring,jaccard:1.00], 323m, NSW 2720): name="Tumut Golf Club", web=null, email="manager@tumutgolfclub.com.au", phone="02 6947 1475"
- OSM (high, 146m, sim=1): name="Tumut Golf Course", web="https://www.tumutgolfclub.com.au/", email=null, phone="+61 2 6947 1475"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 146m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Tura Beach Country Club (Australia, 1 courses)

- DB: addr="The Fairway, Tura Beach, Merimbula", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:391m,city:tura,db-name-substring,jaccard:1.00], 391m, NSW 2548): name="Tura Beach Country Club", web="http://www.turabeachcountryclub.com.au", email="reception@turabeachcountryclub.com.au", phone="(02) 6495 9002"
- OSM (high, 135m, sim=1): name="Tura Beach Country Club", web="https://www.turabeachcountryclub.com.au/", email=null, phone="+61 2 6495 9068;+61 2 6495 9002"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Tuross Head Country Club Ltd (Australia, 1 courses)

- DB: addr="40 Monash Ave, Tuross Head", web=null, email=null, phone=null
- golf.com.au (high, sim=0.733, boost=+1[coord:75m,city:tuross,jaccard:1.00], 75m, NSW 2537): name="Tuross Head Country Club", web="https://www.clubtuross.com.au/", email="turossheadmensgolf@gmail.com", phone="(02) 4473 8186"
- OSM (low, 363m, sim=0.4): name="Tuross Country Club", web="https://www.thcc.net.au/", email=null, phone="+61 2 4473 8186"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.733)
  - email: from fed(high, sim=0.733)
  - phone: from fed(high, sim=0.733)

### Twin Creeks Golf & Country Club (Australia, 1 courses)

- DB: addr="478 Luddenham Road, Luddenham", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:328m,city:luddenham,jaccard:1.00], 328m, NSW 2745): name="Twin Creeks Golf and Country Club", web="http://www.twincreeksgolf.au", email=null, phone="(02) 9670 8877"
- OSM (high, 109m, sim=1): name="Twin Creeks Golf Club", web="https://www.twincreeksgolf.com.au/", email=null, phone="+61 2 9670 8888"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Twin Waters Golf Club (Australia, 1 courses)

- DB: addr="151 Ocean Drive, Twin Waters", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:90m,db-name-substring,jaccard:1.00], 90m, QLD 4564): name="Twin Waters Golf Club", web="http://www.twinwatersgolfclub.com.au", email="admin@twinwatersgolfclub.com.au", phone="5457 2444"
- OSM (low, 629m, sim=1): name="Twin Waters Golf Club", web="https://www.twinwatersgolfclub.com.au/", email="golf@twgolf.com.au", phone="+61 7 5457 2444"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ultima Golf Club (Australia, 1 courses)

- DB: addr="Lake Boga Road, Ultima", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:277m,city:ultima,db-name-substring,jaccard:1.00], 277m, VIC 3544): name="Ultima Golf Club", web=null, email=null, phone=null
- OSM (high, 31m, sim=1): name="Ultima Golf Club", web=null, email=null, phone=null

### Ulverstone Golf Club (Australia, 1 courses)

- DB: addr="Lobster Creek Road, Ulverstone", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:420m,city:ulverstone,db-name-substring,jaccard:1.00], 420m, TAS 7315): name="Ulverstone Golf Club", web="https://ulverstonegolfclub.com.au", email="info@ulverstonegolf.com.au", phone="03 6425 2322"
- OSM (high, 68m, sim=1): name="Ulverstone Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Uralla Golf Club (Australia, 1 courses)

- DB: addr="31 Plane Ave, Uralla", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:24m,city:uralla,db-name-substring,jaccard:1.00], 24m, NSW 2358): name="Uralla Golf Club", web="http://www.urallagolfclub.com.au", email=null, phone="02 6778 4059"
- OSM (medium, 334m, sim=1): name="Uralla Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Urunga Golf and Sports Club (Australia, 1 courses)

- DB: addr="Morgo Street, Urunga", web=null, email=null, phone=null
- golf.com.au (high, sim=0.154, boost=+0.9[coord:67m,city:urunga,jaccard:0.67], 67m, NSW 2455): name="CEX Urunga Golf Club", web="http://urunga.golfcourse.com.au/", email=null, phone="02 6655 6161"
- OSM (low, 359m, sim=0.462): name="Urunga Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.154)
  - phone: from fed(high, sim=0.154)

### Valley View Par 3 Golf Course (Australia, 1 courses)

- DB: addr="Grand Junction Road, Valley View", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:74m,db-name-substring,jaccard:1.00], 74m, SA 5088): name="Valley View Par 3 Golf Course", web="https://www.valleyviewgolfcourse.com.au/", email="valleyviewgc@belgravialeisure.com.au", phone="8263 2189"
- OSM (high, 39m, sim=1): name="Valley View Par 3 Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Victor Harbor Golf Club (Australia, 1 courses)

- DB: addr="Yankalilla Road, Victor Harbor", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:170m,city:victor,db-name-substring,jaccard:1.00], 170m, SA 5211): name="Victor Harbor Golf Club", web="http://www.vhgolf.com.au", email=null, phone="(08) 8552 2030"
- OSM (high, 77m, sim=1): name="Victor Harbor Golf Club", web="https://www.victorharborgolf.com.au/", email="admin@vhgolf.com.au", phone="+61 8 8552 1713;+61 8 8552 2030"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from osm(high, 77m, sim=1)
  - phone: from fed(high, sim=1)

### Victoria Golf Club (Australia, 1 courses)

- DB: addr="Park Road, Cheltenham", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1462m,city:cheltenham,db-name-substring,jaccard:1.00], 1462m, VIC 3192): name="Victoria Golf Club", web=null, email="reception@victoriagolf.com.au", phone="03 9584 1733"
- OSM (low, 1141m, sim=1): name="Victoria Golf Club", web="https://www.victoriagolf.com.au/", email=null, phone="+61 3 9584 1733"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Victoria Park Golf Complex (Australia, 1 courses)

- DB: addr="Herston Road, Herston", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:149m,city:herston,db-name-substring,jaccard:1.00], 149m, QLD 4006): name="Victoria Park Golf Complex", web=null, email="golf.shop@victoriapark.com.au", phone="(07) 3252 9891"
- OSM (no-match, 1385961m, sim=0.5): name="Victoria Golf Club", web="https://www.victoriagolf.com.au/", email=null, phone="+61 3 9584 1733"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Village Links Golf Club (Australia, 1 courses)

- DB: addr="55 Swanborough Road, Logan Village", web=null, email=null, phone=null
- golf.com.au (high, sim=0.538, boost=+0.5[city:logan,name-token:logan], 3968m, QLD 4207): name="Logan Village Golf Course", web="https://loganvillagegolfcourse.com.au", email=null, phone="0432 831 567"
- OSM (low, 3836m, sim=1): name="Village Links", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.538)
  - phone: from fed(high, sim=0.538)

### Vincentia Golf Club (Australia, 1 courses)

- DB: addr="49 Murray Street, Vincentia", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:30m,city:vincentia], 30m, NSW 2540): name="The Country Club Vincentia", web="http://www.thecountryclub.com.au", email="vinniegolfie@gmail.com", phone="02 4443 0666"
- OSM (medium, 271m, sim=1): name="Vincentia Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Vines Golf Club of Reynella (Australia, 1 courses)

- DB: addr="Reynell Rd, Woodcroft", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:208m,db-name-substring,jaccard:1.00], 208m, SA 5159): name="The Vines Golf Club of Reynella", web="http://www.vinesgolfclub.com.au", email=null, phone="(08) 8381 1822"
- OSM (high, 92m, sim=1): name="The Vines of Reynella", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Virginia Golf Club (Australia, 2 courses)

- DB: addr="Elliott Road, Banyo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:14m,city:banyo,db-name-substring,jaccard:1.00], 14m, QLD 4014): name="Virginia Golf Club", web="https://www.virginiagolf.com.au/cms", email="golf@virginiagolf.com.au", phone="07 3267 6333"
- OSM (high, 105m, sim=1): name="Virginia Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wagga City Golf Club (Australia, 1 courses)

- DB: addr="5 Sturt Highway, Wagga Wagga", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:427m,city:wagga,db-name-substring,jaccard:1.00], 427m, NSW 2650): name="Wagga City Golf Club", web="http://wagggolf.com.au", email=null, phone="02 6931 2292"
- OSM (high, 12m, sim=1): name="Wagga City Golf Club", web="https://www.waggagolf.com.au", email=null, phone="+61 2 6931 6275"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wagga Wagga Country Club (Australia, 2 courses)

- DB: addr="Plumpton Road, Wagga Wagga", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:105m,city:wagga,db-name-substring,jaccard:1.00], 105m, NSW 2650): name="Wagga Wagga Country Club", web="http://www.wwcc.com.au", email=null, phone="02 6922 6444"
- OSM (high, 19m, sim=1): name="Wagga Wagga Country Club", web="https://wwcc.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wagin Golf Club (Australia, 1 courses)

- DB: addr="Rifle Street, Wagin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:584m,city:wagin,db-name-substring,jaccard:1.00], 584m, WA 6315): name="Wagin Golf Club", web=null, email=null, phone="0408947365"
- OSM (high, 176m, sim=1): name="Wagin Golf Club", web=null, email=null, phone="+61 8 9861 1058"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Waikerie Golf Club (Australia, 1 courses)

- DB: addr="Playford Road, Sunlands", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:210m,city:sunlands,db-name-substring,jaccard:1.00], 210m, SA 5330): name="Waikerie Golf Club", web="http://www.waikeriegolf.com.au", email="info@waikeriegolf.com.au", phone="(08) 8541 9072"
- OSM (high, 14m, sim=1): name="Waikerie Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wakehurst Golf Club (Australia, 1 courses)

- DB: addr="Upper Clontarf Street, Seaforth", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:31m,city:seaforth,db-name-substring,jaccard:1.00], 31m, NSW 2092): name="Wakehurst Golf Club", web="https://www.wakehurstgolf.com.au", email="office@wakehurstgolf.com.au", phone="02 9949 3188"
- OSM (high, 0m, sim=1): name="Wakehurst Golf Club", web="https://www.wakehurstgolf.com.au/cms/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Walcha Golf Club (Australia, 1 courses)

- DB: addr="Oxley Highway, Walcha", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:walcha,db-name-substring,jaccard:1.00], 4233m, NSW 2354): name="Walcha Golf Club", web=null, email="walchagolfclub@gmail.com", phone="02 6777 2143"
- OSM (no-match, 945808m, sim=0.667): name="Alpha Golf Club", web=null, email=null, phone="+61 7 4985 1398"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Walgett District Golf Club (Australia, 1 courses)

- DB: addr="Fox Street, Walgett", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:17m,city:walgett,jaccard:0.50], 17m, NSW 2832): name="Walgett District Sporting Club", web=null, email=null, phone="+611268281271"
- OSM (no-match, 470930m, sim=0.579): name="Woodenbong & District Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Wallacia Panthers Golf & Country Club (Australia, 1 courses)

- DB: addr="Park Road, Wallacia", web=null, email=null, phone=null
- golf.com.au (high, sim=0.471, boost=+0.7[coord:674m,city:wallacia,jaccard:0.50], 674m, NSW 2745): name="Wallacia Country Club", web=null, email="derekd@wallaciacountryclub.com.au", phone="02 4773 8417"
- OSM (low, 638m, sim=1): name="Wallacia Panthers Golf Course", web="http://wallacia.panthers.com.au/", email="wallacia@panthers.com.au", phone="+61 2 4773 8417"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.471)
  - phone: from fed(high, sim=0.471)

### Wallaloo Golf Club (Australia, 1 courses)

- DB: addr="Marnoo Road, Marnoo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:192m,city:marnoo,db-name-substring,jaccard:1.00], 192m, VIC 3387): name="Wallaloo Golf Club", web=null, email=null, phone="03 53592233"
- OSM (high, 88m, sim=1): name="Wallaloo Golf Club", web=null, email=null, phone="+61 3 5359 2217"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Wallangarra Army Area Golf Club (Australia, 1 courses)

- DB: addr="55 Fox Hills Crescent, Wallangarra", web=null, email=null, phone=null
- golf.com.au (high, sim=0.762, boost=+0.78[coord:282m,city:wallangarra,jaccard:0.75], 282m, QLD 4383): name="Wallangarra Army Golf Club", web=null, email=null, phone="(07) 4684 3773"
- OSM (low, 184m, sim=0.524): name="Wallangarra Golf Course", web=null, email=null, phone="+61 7 4684 3188"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.762)

### Wallaroo Golf Club (Australia, 2 courses)

- DB: addr="Cornish Terrace, Wallaroo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:444m,city:wallaroo,db-name-substring,jaccard:1.00], 444m, SA 5556): name="Wallaroo Golf Club", web="https://www.wallaroogolfclub.org/", email="wallaroogolfclub@gmail.com", phone="0457999749"
- OSM (high, 188m, sim=1): name="Wallaroo Golf Course", web="http://wallaroogolfclub.wix.com/wallaroogolfclub", email=null, phone="+61 8 8823 2793"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Walpole Country Club (Australia, 1 courses)

- DB: addr="Rest Point Road, Walpole", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:179m,city:walpole,db-name-substring,jaccard:1.00], 179m, WA 6398): name="Walpole Country Club", web="http://www.walpolecountryclub.org.au", email=null, phone="(08) 9840 1082"
- OSM (high, 157m, sim=1): name="Walpole Country Club Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Walwa Golf Club (Australia, 1 courses)

- DB: addr="Murray River Road, Walwa", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:9m,city:walwa,db-name-substring,jaccard:1.00], 9m, VIC 3709): name="Walwa Golf Club", web=null, email=null, phone="0260 371260"
- OSM (high, 0m, sim=1): name="Walwa Golf Club", web=null, email="walwagolfclub@gmail.com", phone="+61 430 211 000"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from osm(high, 0m, sim=1)
  - phone: from fed(high, sim=1)

### Wanaaring Golf Club (Australia, 1 courses)

- DB: addr="Bourke-Wanaaring Road, Wanaaring", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:2816m,city:wanaaring,db-name-substring,jaccard:1.00], 2816m, NSW 2840): name="Wanaaring Golf Club", web=null, email=null, phone=null
- OSM (no-match, 2678240m, sim=0.667): name="Mundaring Golf Course", web=null, email=null, phone=null

### Wangaratta Golf Club (Australia, 1 courses)

- DB: addr="68 Waldara Drive, Wangaratta", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:456m,city:waldara,db-name-substring,jaccard:1.00], 456m, VIC 3678): name="Wangaratta Golf Club", web="http://www.wangarattagolf.org.au", email=null, phone="03 57213426"
- OSM (high, 26m, sim=1): name="Wangaratta Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wanneroo Golf Club (Australia, 1 courses)

- DB: addr="44 Flynn Drive, Neerabup", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.55[db-name-substring,jaccard:1.00], 4620m, WA 6031): name="Wanneroo Golf Club", web="https://wanneroogolfclub.com.au/", email="admin@wgc.net.au", phone="(08) 9405 3677"
- OSM (low, 4844m, sim=1): name="Wanneroo Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wantima Country Club (Australia, 2 courses)

- DB: addr="530 South Pine Road, Brisbane", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.25[coord:423m], 423m, QLD 4500): name="Wantima Golf Club", web="http://www.wantimacountryclub.com", email=null, phone="3264 1633"
- OSM (high, 57m, sim=1): name="Wantima Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Waratah Golf Club (Australia, 1 courses)

- DB: addr="456 Lake Road, Argenton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:59m,city:argenton,db-name-substring,jaccard:1.00], 59m, NSW 2284): name="Waratah Golf Club", web="http://www.waratahgolfclub.com.au", email=null, phone="02 4958 1847"
- OSM (medium, 422m, sim=1): name="Waratah Golf Club", web="https://www.waratahgolfclub.com.au/", email=null, phone="+61 2 4958 3558;+61 2 4958 1847"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Warburton Golf & Sporting Club (Australia, 2 courses)

- DB: addr="17 Dammans Rd, Warburton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1[coord:75m,city:warburton,jaccard:1.00], 75m, VIC 3799): name="Warburton Golf + Sporting Club", web=null, email=null, phone="(03) 5966 2306"
- OSM (high, 36m, sim=1): name="Warburton Golf Club", web="https://www.warburtongolf.com.au/", email="warbygolf@bigpond.com.au", phone="+61 3 5966 2306"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 36m, sim=1)
  - email: from osm(high, 36m, sim=1)
  - phone: from fed(high, sim=1)

### Warialda Golf Club (Australia, 1 courses)

- DB: addr="Holden Street, Warialda", web=null, email=null, phone=null
- golf.com.au (high, sim=0.5, boost=+0.75[coord:369m,city:warialda,jaccard:0.67], 369m, NSW 2402): name="Warialda Golf and Bowling Club", web=null, email=null, phone="02 6729 1192"
- OSM (high, 69m, sim=1): name="Warialda Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.5)

### waringah (Australia, 1 courses)

- DB: addr=null, web=null, email=null, phone=null
- golf.com.au (high, sim=0.889, boost=+0.3[coord:2960m,typo:waringah~warringah], 2960m, NSW ): name="Warringah Public Golf Course", web=null, email=null, phone=null
- OSM (low, 2878m, sim=0.889): name="Warringah Golf Club", web="https://www.warringahgolfclub.com.au/", email=null, phone="+61 2 9905 1326;+61 2 9905 4709"

### Warooka Golf Club (Australia, 1 courses)

- DB: addr="Sturt Bay Road, Warooka", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:267m,city:warooka,db-name-substring,jaccard:1.00], 267m, SA 5577): name="Warooka Golf Club", web=null, email=null, phone=null
- OSM (high, 44m, sim=1): name="Warooka Golf Club", web=null, email=null, phone="+61 8 8854 5344"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from osm(high, 44m, sim=1)

### Waroona Golf Club (Australia, 1 courses)

- DB: addr="Hill Street, Waroona", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:155m,city:waroona,db-name-substring,jaccard:1.00], 155m, WA 6215): name="Waroona Golf Club", web=null, email=null, phone="08 9733 1700"
- OSM (high, 162m, sim=1): name="Waroona Golf Club", web="http://www.waroonagolfclub.com.au/", email="info@waroonagolfclub.com.au", phone="+61 8 9733 1700"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 162m, sim=1)
  - email: from osm(high, 162m, sim=1)
  - phone: from fed(high, sim=1)

### Warracknabeal Golf Club (Australia, 1 courses)

- DB: addr="102 Golf Links Rd, Warracknabeal", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:231m,city:warracknabeal,db-name-substring,jaccard:1.00], 231m, VIC 3393): name="Warracknabeal Golf Club", web=null, email=null, phone="0353982035"
- OSM (high, 34m, sim=1): name="Warracknabeal Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Warragul Country Club (Australia, 1 courses)

- DB: addr="41 Sutton Street, Warragu", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:468m,db-name-substring,jaccard:1.00], 468m, VIC 3820): name="Warragul Country Club", web="https://www.warragulcountryclub.com.au", email=null, phone="03 5623 2135"
- OSM (high, 136m, sim=1): name="Warragul Country Club", web="https://trafalgargolf.com.au/", email=null, phone="+61 3 5623 2353;+61 3 5623 2135"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Warringah Golf Club (Australia, 1 courses)

- DB: addr="397 Condamine Road, North Manly", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[coord:31m,city:north,jaccard:0.50], 31m, NSW ): name="Warringah Public Golf Course", web=null, email=null, phone=null
- OSM (high, 203m, sim=1): name="Warringah Golf Club", web="https://www.warringahgolfclub.com.au/", email=null, phone="+61 2 9905 1326;+61 2 9905 4709"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 203m, sim=1)
  - phone: from osm(high, 203m, sim=1)

### Warrnambool Golf Club (Australia, 1 courses)

- DB: addr="Younger Street, Warrnambool", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:215m,city:warrnambool,db-name-substring,jaccard:1.00], 215m, VIC 3280): name="Warrnambool Golf Club", web=null, email=null, phone="03 5562 2108"
- OSM (high, 25m, sim=1): name="Warrnambool Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Watheroo Golf Club (Australia, 1 courses)

- DB: addr="Elliott Way, Watheroo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:357m,db-name-substring,jaccard:1.00], 357m, WA 6510): name="Watheroo Golf Club", web=null, email=null, phone="08 96518075"
- OSM (high, 36m, sim=1): name="Watheroo Golf Club", web=null, email=null, phone="+61 8 9651 7100;+61 8 9651 7032"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Wattle Park Golf Course (Australia, 1 courses)

- DB: addr="1012 Riversdale Road, Burwood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.6[coord:72m,jaccard:0.67], 72m, VIC 3124): name="Wattle Park Golf Club", web=null, email=null, phone="(0408594369"
- OSM (high, 87m, sim=1): name="Wattle Park Golf Course", web="http://www.wattleparkgolf.com.au/", email="management@golfsport.net.au", phone="+61 3 9808 2455"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 87m, sim=1)
  - email: from osm(high, 87m, sim=1)
  - phone: from fed(high, sim=1)

### Wauchope Country Club (Australia, 1 courses)

- DB: addr="24 King Street, Wauchope", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:54m,city:wauchope], 54m, NSW 2446): name="Wauchope Golf Club", web="http://www.wauchopecountryclub.com.au", email=null, phone="6585 3020"
- OSM (medium, 296m, sim=1): name="Wauchope Country Club Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wedderburn Golf Club (Australia, 1 courses)

- DB: addr="Korong Vale Rd, Wedderburn", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:27m,city:wedderburn,db-name-substring,jaccard:1.00], 27m, VIC 3518): name="Wedderburn Golf Club", web=null, email=null, phone="03 5494 3133"
- OSM (high, 45m, sim=1): name="Wedderburn Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Wee Waa Golf Club (Australia, 1 courses)

- DB: addr="Golf Club Road, Wee Waa", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:161m,db-name-substring,jaccard:1.00], 161m, NSW 2388): name="Wee Waa Golf Club", web=null, email=null, phone="0267954414"
- OSM (high, 143m, sim=1): name="Wee Waa Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Weethalle Country Golf Club (Australia, 1 courses)

- DB: addr="Showground Road, Weethalle", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:338m,city:weethalle,jaccard:0.67], 338m, NSW 2669): name="Weethalle Country Club", web=null, email=null, phone="0269756177"
- OSM (high, 101m, sim=1): name="Weethalle Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Welaregang Golf Club (Australia, 1 courses)

- DB: addr="Tintaldra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.6[coord:182m,jaccard:0.67], 182m, NSW 2642): name="Welaregang Country Golf Club", web=null, email=null, phone="(02) 60779288"
- OSM (high, 68m, sim=1): name="Welaregang Country Golf Club", web="https://www.golfnsw.org.au/golf-clubs/welaregang-country-golf-club/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 68m, sim=1)
  - phone: from fed(high, sim=1)

### Wellington Golf Club (Australia, 1 courses)

- DB: addr="Caves Road, Wellington", web=null, email=null, phone=null
- golf.com.au (high, sim=0.714, boost=+1.25[coord:22m,city:wellington,db-name-substring,jaccard:1.00], 22m, NSW 2820): name="Wellington Golf Club (NSW)", web="https://www.users.bigpond.com/wellgolf", email="admin@wellingtonsoldiers.com", phone="(02) 6845 2130"
- OSM (high, 128m, sim=1): name="Wellington Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.714)
  - email: from fed(high, sim=0.714)
  - phone: from fed(high, sim=0.714)

### Welshpool Golf Club (Australia, 1 courses)

- DB: addr="95 Port Welshpool Road, Welshpool", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:36m,city:welshpool,db-name-substring,jaccard:1.00], 36m, VIC 3966): name="Welshpool Golf Club", web="https://www.facebook.com/profile.php?id=61582617611666", email=null, phone="(03) 56881556"
- OSM (high, 20m, sim=1): name="Welshpool Golf Club", web=null, email=null, phone="+61 3 5688 1556"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wembley Golf Complex (Australia, 2 courses)

- DB: addr="200 The Boulevard, Wembley Downs", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:433m,city:wembley,db-name-substring,jaccard:1.00], 433m, WA ): name="Wembley Golf Complex", web=null, email="info@wembleygc.com.au", phone="1300 818 574"
- OSM (low, 71m, sim=0.467): name="Wembley Golf Course", web=null, email=null, phone="+61 8 6280 1300"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wentworth Falls Country Club (Australia, 1 courses)

- DB: addr="206 Blaxland Rd, Wentworth Falls", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:22m,city:wentworth,db-name-substring,jaccard:1.00], 22m, NSW 2782): name="Wentworth Falls Country Club", web="http://www.wfcc.com.au", email=null, phone="02 4757 1202"
- OSM (medium, 348m, sim=1): name="Wentworth Falls Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Werribee Park Golf Club (Australia, 1 courses)

- DB: addr="350 K Road, Werribee", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:452m,city:werribee,db-name-substring,jaccard:1.00], 452m, VIC 3030): name="Werribee Park Golf Club", web="http://www.werribeeparkgolf.com.au", email="admin@werribeeparkgolf.com.au", phone="03 9742 1397"
- OSM (medium, 266m, sim=1): name="Werribee Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Werris Creek Golf Club (Australia, 1 courses)

- DB: addr="Gap Road, Werris Creek", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:312m,city:werris,db-name-substring,jaccard:1.00], 312m, NSW 2341): name="Werris Creek Golf Club", web=null, email=null, phone="02 6768 7165"
- OSM (medium, 281m, sim=1): name="Werris Creek Golf Course", web=null, email=null, phone="+61 2 6768 7165"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### West Aviat Golf Club (Australia, 1 courses)

- DB: addr="350 Kalamunda Road, Maida Vale", web=null, email=null, phone=null
- golf.com.au (high, sim=0.9, boost=+0.25[coord:315m], 315m, WA 6155): name="Westaviat Golf Club", web="http://westaviat.com", email=null, phone="0408 940 702"
- OSM (low, 295m, sim=0.2): name="Hillview Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.9)
  - phone: from fed(high, sim=0.9)

### West Beach Parks (Australia, 1 courses)

- DB: addr="Military Road, West Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=0.688, boost=+0.4[coord:150m], 150m, SA 5024): name="West Beach Mini Golf", web=null, email=null, phone=null
- OSM (no-match, 311489m, sim=0.438): name="Beachport Golf Course", web=null, email=null, phone=null

### West Beach Parks Golf (Australia, 2 courses)

- DB: addr="Military Road, West Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=0.688, boost=+0.4[coord:150m], 150m, SA 5024): name="West Beach Mini Golf", web=null, email=null, phone=null
- OSM (no-match, 311489m, sim=0.438): name="Beachport Golf Course", web=null, email=null, phone=null

### West Lakes Golf Club (Australia, 1 courses)

- DB: addr="26 Lochside Drive, West Lakes", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:249m,city:west,db-name-substring,jaccard:1.00], 249m, SA 5021): name="West Lakes Golf Club", web="https://www.westlakesgolfclub.com.au", email="office@westlakesgolfclub.com.au", phone="(08) 8268 3850"
- OSM (high, 24m, sim=1): name="West Lakes Golf Club", web="https://www.westlakesgolfclub.com.au/cms/", email="office@westlakesgolfclub.com.au", phone="+61 8 8268 3054;+61 8 8268 3850"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Westaviat Golf Club (Australia, 1 courses)

- DB: addr="350 Kalamunda Road, Maida Vale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:315m,db-name-substring,jaccard:1.00], 315m, WA 6155): name="Westaviat Golf Club", web="http://westaviat.com", email=null, phone="0408 940 702"
- OSM (low, 295m, sim=0.222): name="Hillview Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Westgate Golf Club (Australia, 1 courses)

- DB: addr="Creek St, Yarraville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:499m,db-name-substring,jaccard:1.00], 499m, VIC 3013): name="Westgate Golf Club", web="https://www.westgategolfclub.com.au", email="info@westgategolfclub.com.au", phone="03 9391 5261"
- OSM (medium, 450m, sim=1): name="Westgate Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Westonia Golf Club (Australia, 1 courses)

- DB: addr="Dellabosca Road, Westonia", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:270m,city:westonia,db-name-substring,jaccard:1.00], 270m, WA 6423): name="Westonia Golf Club", web=null, email=null, phone="(08) 9046 7171"
- OSM (no-match, 3229767m, sim=0.5): name="Eustondale Golf Course", web="http://www.eustondalegolf.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Westward Ho Golf Club (Australia, 2 courses)

- DB: addr="Military Road, West Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1572m,city:west,db-name-substring,jaccard:1.00], 1572m, SA 5045): name="Westward HO Golf Club", web="http://www.westwardho.org.au", email=null, phone="(08) 8356 7220"
- OSM (no-match, 325775m, sim=0.545): name="Wentworth Golf Course", web=null, email=null, phone="+61 3 5027 3244"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Whaleback Golf (Australia, 1 courses)

- DB: addr="Whaleback Avenue, Parkwood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.15[coord:24m,city:parkwood,db-name-substring,jaccard:0.67], 24m, WA 6147): name="Whaleback Golf Course", web=null, email=null, phone="08 9457 8999"
- OSM (high, 77m, sim=1): name="Whaleback Golf Course", web="https://www.whalebackgolfcourse.com.au/", email=null, phone="+61 8 9457 8999"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 77m, sim=1)
  - phone: from fed(high, sim=1)

### Whitsunday Green Club (Australia, 1 courses)

- DB: addr="1 Regatta Boulevard, Cannon Valley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.4[coord:1297m,jaccard:1.00], 1297m, QLD 4800): name="Whitsunday Green", web=null, email=null, phone="0458016591"
- OSM (no-match, 1860042m, sim=0.5): name="Sandy Creek Golf Club", web="https://www.sandycreekgolf.com.au/cms/", email=null, phone="+61 8 8524 4231"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Whittlesea Country Club (Australia, 1 courses)

- DB: addr="160 Humevale Road, Humevale", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.7[coord:5m,city:humevale], 5m, VIC 3757): name="Whittlesea Golf Club", web="http://www.whittleseagolfclub.com.au", email=null, phone="03 97162066"
- OSM (high, 27m, sim=1): name="Whittlesea Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Whyalla Golf Club (Australia, 1 courses)

- DB: addr="McBryde Terrace, Whyalla", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:97m,city:whyalla,db-name-substring,jaccard:1.00], 97m, SA 5600): name="Whyalla Golf Club", web="http://www.users.tpg.com.au/pklobuca/index.html", email="whyallagolf@bigpond.com", phone="(08) 86459109"
- OSM (low, 260m, sim=0.467): name="Whyalla Golf & Bowling Club", web="http://www.whyallagolf.org.au/", email=null, phone="+61 8 8645 9109"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Willaura Golf Club (Australia, 1 courses)

- DB: addr="Wickliffe Road, Willaura", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:280m,city:willaura,db-name-substring,jaccard:1.00], 280m, VIC 3379): name="Willaura Golf Club", web=null, email="willauragolfclub@gmail.com", phone=null
- OSM (high, 169m, sim=1): name="Willaura Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)

### Willmott Park Golf Club (Australia, 1 courses)

- DB: addr="Craigieburn Road West, Craigieburn", web=null, email=null, phone=null
- golf.com.au (high, sim=0.4, boost=+0.95[coord:851m,city:craigieburn,name-token:craigieburn,jaccard:0.67], 851m, VIC 3064): name="Craigieburn Willmott Golf Club", web="https://craigieburnsc.com.au", email="craigieburngolfproshop@gmail.com", phone="03 9308 2774"
- OSM (no-match, 1142m, sim=0.091): name="Craigieburn Public Golf Course", web="https://craigieburnsc.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.4)
  - email: from fed(high, sim=0.4)
  - phone: from fed(high, sim=0.4)

### Willunga Golf Club (Australia, 3 courses)

- DB: addr="St. Peter's Terrace, Willunga", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:482m,city:willunga,db-name-substring,jaccard:1.00], 482m, SA 5172): name="Willunga Golf Club", web=null, email="wgc@willungagolf.com.au", phone="0885562676"
- OSM (high, 134m, sim=1): name="Willunga Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wilmington Golf Club (Australia, 1 courses)

- DB: addr="Maria Terrace, Wilmington", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:648m,city:wilmington,db-name-substring,jaccard:1.00], 648m, SA 5485): name="Wilmington Golf Club", web=null, email=null, phone="0427180738"
- OSM (low, 746m, sim=1): name="Wilmington Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Winchelsea Golf Club (Australia, 1 courses)

- DB: addr="Lorne Road, Winchelsea", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:468m,city:winchelsea,db-name-substring,jaccard:1.00], 468m, VIC 3241): name="Winchelsea Golf Club", web="https://winchelseagolf.com.au", email=null, phone="0457791566"
- OSM (medium, 308m, sim=1): name="Winchelsea Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Windaroo Lakes Golf Club (Australia, 1 courses)

- DB: addr="Anna Louise Terrace, Windaroo", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:246m,city:windaroo,db-name-substring,jaccard:1.00], 246m, QLD 4207): name="Windaroo Lakes Golf Club", web=null, email=null, phone="07 3804 0633"
- OSM (low, 185m, sim=0.571): name="Windaroo Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Windsor Country Golf Club (Australia, 1 courses)

- DB: addr="McQuade Avenue, South Windsor", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:798m,city:south,jaccard:0.67], 798m, NSW 2756): name="Windsor Golf Club", web="http://www.windsorgolfclub.com.au", email=null, phone="02 4577 4390"
- OSM (low, 1078m, sim=1): name="Windsor Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wingham Golf Club (Australia, 1 courses)

- DB: addr="Country Club Drive, Wingham", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:101m,city:wingham,db-name-substring,jaccard:1.00], 101m, NSW 2429): name="Wingham Golf Club", web=null, email=null, phone="6553 4761"
- OSM (low, 1594350m, sim=0.857): name="Ingham Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Winton Golf Club (Australia, 1 courses)

- DB: addr="Vindex Street, Winton", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:14m,city:winton,db-name-substring,jaccard:1.00], 14m, QLD 4735): name="Winton Golf Club", web=null, email="wintongolfclub@outlook.com", phone="07 4657 1333"
- OSM (high, 5m, sim=1): name="Winton Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wirrabara Golf Club (Australia, 1 courses)

- DB: addr="East Terrace, Wirrabara", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:43m,city:wirrabara,db-name-substring,jaccard:1.00], 43m, SA 5481): name="Wirrabara Golf Club", web=null, email="bjhrwm54@gmail.com", phone="0409100134"
- OSM (medium, 264m, sim=1): name="Wirrabara Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wirrulla Golf Club (Australia, 1 courses)

- DB: addr="Wirrulla", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:32m,city:wirrulla,db-name-substring,jaccard:1.00], 32m, SA 5661): name="Wirrulla Golf Club", web=null, email=null, phone=null
- OSM (low, 279m, sim=0.615): name="Wirrulla Gold Course", web=null, email=null, phone=null

### Wodonga Golf Club (Australia, 1 courses)

- DB: addr="Parkers Road, Wodonga", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:95m,city:wodonga,db-name-substring,jaccard:1.00], 95m, VIC 3690): name="Wodonga Golf Club", web=null, email="admin@wodongagolf.com.au", phone="02 6059 1552"
- OSM (medium, 385m, sim=1): name="Wodonga Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wollongong Golf Club (Australia, 1 courses)

- DB: addr="Corner Corrimal & Bank Streets, Wollongong", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:751m,city:wollongong,db-name-substring,jaccard:1.00], 751m, NSW 2520): name="Wollongong Golf Club", web="http://www.wollongonggolfclub.com.au", email=null, phone="4222 3111"
- OSM (high, 42m, sim=1): name="Wollongong Golf Club", web="https://www.wollongonggolfclub.com.au/", email=null, phone="+61 2 4222 3111"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wolston Park Golf Club (Australia, 2 courses)

- DB: addr="Ellerton Drive, Wacol", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:426m,city:wacol,db-name-substring,jaccard:1.00], 426m, QLD 4300): name="Wolston Park Golf Club", web="http://www.wpgc.com.au", email="admin@wpgc.com.au", phone="07 3271 6641"
- OSM (high, 23m, sim=1): name="Wolston Park Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wongan Hills Golf Club (Australia, 1 courses)

- DB: addr="Sadler Road, Wongan Hills", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:1325m,city:wongan,db-name-substring,jaccard:1.00], 1325m, WA 6603): name="Wongan Hills Golf Club", web=null, email=null, phone="08 9671 1655"
- OSM (no-match, 3227028m, sim=0.692): name="Pennant Hills Golf Course", web="https://www.pennanthillsgolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Wonthaggi Golf Club (Australia, 2 courses)

- DB: addr="McKenzie Street, Wonthaggi", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:400m,city:wonthaggi,db-name-substring,jaccard:1.00], 400m, VIC 3995): name="Wonthaggi Golf Club", web=null, email=null, phone="(03) 5672 1437"
- OSM (high, 97m, sim=1): name="Wonthaggi Golf Club", web="http://www.wonthaggigolfclub.com.au/", email=null, phone="+61 3 5672 3697;+61 3 5672 1437"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from osm(high, 97m, sim=1)
  - phone: from fed(high, sim=1)

### Woodburn-Evans Head Golf Club (Australia, 1 courses)

- DB: addr="Beach Road, Woodburn", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:15m,city:woodburn,db-name-substring,jaccard:1.00], 15m, NSW 2473): name="Woodburn-Evans Head Golf Club", web="http://www.woodburn-evansheadgolfclub.com.au", email="wehgc@bigpond.net.au", phone="02 6682 2385"
- OSM (high, 4m, sim=1): name="Woodburn-Evans Head Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Woodend Golf Club (Australia, 1 courses)

- DB: addr=" Davy Street, Woodend", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:426m,city:woodend,db-name-substring,jaccard:1.00], 426m, VIC 3442): name="Woodend Golf Club", web="https://woodendgolfclub.com.au", email=null, phone="03 5427 2261"
- OSM (high, 22m, sim=1): name="Woodend Golf Club", web="http://www.woodendgolfclub.com/", email=null, phone="+61 3 5427 2261"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Woodford Golf Club (Australia, 2 courses)

- DB: addr="2-82 Golf Course Rd, Woodford", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:322m,city:woodford,db-name-substring,jaccard:1.00], 322m, QLD 4514): name="Woodford Golf Club", web=null, email=null, phone="07 5496 1004"
- OSM (high, 21m, sim=1): name="Woodford Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Woodlands Golf Club (Australia, 1 courses)

- DB: addr="109 White Street, Mordialloc", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:61m,city:mordialloc,db-name-substring,jaccard:1.00], 61m, VIC 3195): name="Woodlands Golf Club", web="http://www.woodlandsgolf.com.au", email=null, phone="03 9580 3455"
- OSM (high, 27m, sim=1): name="Woodlands Golf Club", web="https://www.woodlandsgolf.com.au/", email=null, phone="+61 3 9580 1157;+61 3 9580 3455"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Woodville Golf Club (Australia, 1 courses)

- DB: addr="118 Rawson Road, Guildford", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.45[coord:468m,jaccard:0.67], 468m, NSW 2161): name="Woodville Golf Course", web=null, email=null, phone=null
- OSM (high, 10m, sim=1): name="Woodville Golf Course", web=null, email=null, phone=null

### Wool Bay Golf Club (Australia, 1 courses)

- DB: addr="Ulonga Road, Wool Bay", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:376m,city:wool,db-name-substring,jaccard:1.00], 376m, SA 5575): name="Wool Bay Golf Club", web=null, email=null, phone="(08) 88528204"
- OSM (no-match, 672727m, sim=0.6): name="Apollo Bay Golf Club", web="https://www.apollobaygolfclub.org.au/", email=null, phone="+61 3 5237 6474"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Woolgoolga Golf Club (Australia, 1 courses)

- DB: addr="Safety Beach Road, Safety Beach", web=null, email=null, phone=null
- golf.com.au (high, sim=0.083, boost=+0.9[coord:103m,city:safety,name-token:safety], 103m, NSW 2456): name="Safety Beach Golf Club", web=null, email=null, phone="02 6654 2111"
- OSM (high, 26m, sim=0.714): name="Woolgoolga RSL Golf Club", web="https://www.woolgoolgarslgolfclub.com", email=null, phone="+61 2 6654 2111"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 26m, sim=0.714)
  - phone: from fed(high, sim=0.083)

### Woolgoolga Returned Services Golf Club (Australia, 1 courses)

- DB: addr="17 Beach Street, Woolgoolga", web=null, email=null, phone=null
- golf.com.au (high, sim=0.214, boost=+0.9[coord:103m,city:beach,name-token:beach], 103m, NSW 2456): name="Safety Beach Golf Club", web=null, email=null, phone="02 6654 2111"
- OSM (low, 26m, sim=0.464): name="Woolgoolga RSL Golf Club", web="https://www.woolgoolgarslgolfclub.com", email=null, phone="+61 2 6654 2111"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.214)

### Woolooware Golf Club (Australia, 1 courses)

- DB: addr="1R Harnleigh Avenue, Woolooware", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:56m,city:woolooware,db-name-substring,jaccard:1.00], 56m, NSW 2230): name="Woolooware Golf Club", web="http://www.wooloowaregolfclub.com.au", email=null, phone="02) 9544 0555"
- OSM (high, 230m, sim=1): name="Woolooware Golf Course", web="https://wooloowaregolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Woorayl Golf Club (Australia, 1 courses)

- DB: addr="Roughead Street, Leongatha", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:224m,city:leongatha,db-name-substring,jaccard:1.00], 224m, VIC 3953): name="Woorayl Golf Club", web=null, email="elly.berryman@bigpond.com", phone="03 5668 5285"
- OSM (high, 64m, sim=1): name="Woorayl Golf Club", web="http://www.southgippslandgolf.org.au/sggwp/woorayl/", email=null, phone="+61 3 5662 4187"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 64m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Worrigee Links Golf Course (Australia, 1 courses)

- DB: addr="131 Greenwell Point Rd, Worrigee", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:188m,city:worrigee,db-name-substring,jaccard:1.00], 188m, NSW 2540): name="Worrigee Links Golf Course", web="https://worrigeelinks.com.au/", email="golfpro@exservos.com.au", phone="4421 7430"
- OSM (high, 236m, sim=1): name="Worrigee Links Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wowan Golf Club (Australia, 2 courses)

- DB: addr="Wowan, Wallacia", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:193m,db-name-substring,jaccard:1.00], 193m, QLD 4702): name="Wowan Golf Club", web=null, email="black29@bigpond.com", phone="(07) 4937 1186"
- OSM (high, 31m, sim=1): name="Wowan Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wyalkatchem Golf Club (Australia, 1 courses)

- DB: addr="Goldfields Road, Wyalkatchem", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.65[coord:2455m,db-name-substring,jaccard:1.00], 2455m, WA 6485): name="Wyalkatchem Golf Club", web=null, email=null, phone=null
- OSM (no-match, 182989m, sim=0.455): name="Latham Golf Club", web=null, email=null, phone="+61 8 9973 6096"

### Wycheproof Golf Club (Australia, 1 courses)

- DB: addr="Calder Highway, Wycheproof", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:94m,city:wycheproof,db-name-substring,jaccard:1.00], 94m, VIC 3527): name="Wycheproof Golf Club", web=null, email="wychegolfw@gmail.com", phone="0425273781"
- OSM (high, 187m, sim=1): name="Wycheproof Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wynnum Golf Club (Australia, 1 courses)

- DB: addr="64 Stradbroke Ave, Wynnum", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:14m,city:wynnum,db-name-substring,jaccard:1.00], 14m, QLD 4178): name="Wynnum Golf Club", web="http://www.wynnumgolf.com", email=null, phone="07 3396 9000"
- OSM (high, 0m, sim=1): name="Wynnum Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wynyard Golf Club (Australia, 1 courses)

- DB: addr="Golf Links Drive, Wynyard", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.85[city:wynyard,db-name-substring,jaccard:1.00], 4183m, TAS 7325): name="Wynyard Golf Club", web="http://www.wynyardgolfclub.com.au", email=null, phone="03 6442 2614"
- OSM (low, 343m, sim=0): name="Seabrook Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wyong Golf Club (Australia, 1 courses)

- DB: addr="Pacific Highway, Wyong", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:13m,city:wyong,db-name-substring,jaccard:1.00], 13m, NSW 2259): name="Wyong Golf Club", web="https://www.wyonggolfclub.com.au", email=null, phone="02 4352 1361"
- OSM (low, 551m, sim=1): name="Wyong Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Yacka Golf Club (Australia, 1 courses)

- DB: addr="South Terrace, Elliott", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:19m,db-name-substring,jaccard:1.00], 19m, SA 5470): name="Yacka Golf Club", web=null, email=null, phone="(08) 8636 7127"
- OSM (high, 226m, sim=1): name="Yacka Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Yackandandah Golf Club (Australia, 1 courses)

- DB: addr="Racecourse Road, Yackandandah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:94m,city:yackandandah,db-name-substring,jaccard:1.00], 94m, VIC 3749): name="Yackandandah Golf Club", web="http://golfclub.yackandandah.com/", email="yackgolfclub@gmail.com", phone="0418 990 347"
- OSM (high, 132m, sim=1): name="Yackandandah Golf Course", web="https://golfclub.yackandandah.com/", email="yackgolfclub@gmail.com", phone="+61 404 481 606;+61 418 990 347"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Yallourn Golf Club (Australia, 1 courses)

- DB: addr="Golf Links Road, Yallourn Heights", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:179m,city:yallourn,db-name-substring,jaccard:1.00], 179m, VIC 3825): name="Yallourn Golf Club", web="https://www.yallourngolfclub.com.au", email="ygc@yallourngolfclub.com.au", phone="03 5127 6962"
- OSM (medium, 353m, sim=1): name="Yallourn Golf Club", web="https://yallourngolfclub.com.au", email="ygc@yallourngolfclub.com.au", phone="+61 3 5127 6962"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Yamba Golf & Country Club (Australia, 1 courses)

- DB: addr="River Street, Yamba", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:577m,city:yamba,db-name-substring,jaccard:1.00], 577m, NSW 2464): name="Yamba Golf & Country Club", web="https://www.yambagolf.com.au", email="proshop@yambagolf.com.au", phone="02 6646 2104"
- OSM (high, 92m, sim=1): name="Yamba Golf & Country Club", web="https://yambagolf.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Yankalilla Golf Club (Australia, 1 courses)

- DB: addr="Memorial Park, Yankalilla", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:338m,city:yankalilla,db-name-substring,jaccard:1.00], 338m, SA 5203): name="Yankalilla Golf Club", web=null, email="bjlburzacott@gmail.com", phone="0421334869"
- OSM (no-match, 1129670m, sim=0.5): name="Antill Park Country Golf Club", web="https://www.antillpark.com.au/", email=null, phone="+61 2 4677 1240;+61 2 4677 1512"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Yarra Bend Golf Course (Australia, 1 courses)

- DB: addr="Yarra Bend Road, Fairfield", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:375m,city:fairfield,db-name-substring,jaccard:1.00], 375m, VIC 3078): name="Yarra Bend Golf Course", web="https://www.yarrabendgolf.com", email=null, phone="03 9489 5234"
- OSM (high, 10m, sim=1): name="Yarra Bend Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Yarra Yarra Golf Club (Australia, 1 courses)

- DB: addr="567 Warrigal Road, Bentleigh East", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:321m,city:bentleigh,db-name-substring,jaccard:1.00], 321m, VIC 3165): name="Yarra Yarra Golf Club", web="http://www.yarrayarra.com.au", email=null, phone="03 9575 0575"
- OSM (high, 122m, sim=1): name="Yarra Yarra Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Yarram Golf Club (Australia, 1 courses)

- DB: addr="42 Golf Links Road, Yarram", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:274m,city:yarram,db-name-substring,jaccard:1.00], 274m, VIC 3971): name="Yarram Golf Club", web="https://www.yarramgolfclub.com/", email="yarramgolf@yarramgolfclub.com.au", phone="03 5182 5596"
- OSM (high, 76m, sim=1): name="Yarram Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Yarrambat Park Golf Course (Australia, 1 courses)

- DB: addr="649 Yan Yean Rd, Yarrambat", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.75[coord:547m,city:yarrambat,jaccard:0.67], 547m, VIC 3097): name="Yarrambat Golf Club", web="https://www.yarrambatgolfclub.com.au/security/login.msp", email="Ygcinc.secretary@gmail.com", phone="94362201"
- OSM (high, 83m, sim=1): name="Yarrambat Park Public Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Yarrawonga & Border Golf Club (Australia, 3 courses)

- DB: addr="Gulai Road, Mulwala", web=null, email=null, phone=null
- golf.com.au (high, sim=0.611, boost=+0.75[coord:374m,city:mulwala,name-token:mulwala], 374m, NSW 2647): name="Yarrawonga Mulwala Golf Club Resort", web=null, email=null, phone="03 5744 1911"
- OSM (low, 73m, sim=0.611): name="Yarrawonga Mulwala Golf Club Resort", web="https://www.yarragolf.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - phone: from fed(high, sim=0.611)

### Yass Golf Club (Australia, 1 courses)

- DB: addr="2 Worth Street, Yass", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:92m,city:yass,db-name-substring,jaccard:1.00], 92m, NSW 2582): name="Yass Golf Club", web="http://www.yassgolfclub.com.au", email=null, phone="02 6226 1894"
- OSM (medium, 337m, sim=1): name="Yass Golf Course", web="http://yassgolfclub.com.au/", email=null, phone="+61 2 6226 1977"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Yea Golf Club (Australia, 1 courses)

- DB: addr="Racecourse Road, Yea", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.8[coord:304m,db-name-substring,jaccard:1.00], 304m, VIC 3717): name="Yea Golf Club", web=null, email=null, phone="0409250086"
- OSM (high, 100m, sim=1): name="Yea Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Yenda Diggers Golf Club (Australia, 1 courses)

- DB: addr="Wade Park, Yenda", web=null, email=null, phone=null
- golf.com.au (high, sim=0.385, boost=+0.9[coord:168m,city:yenda,jaccard:0.67], 168m, NSW 2681): name="Yenda Golf Club", web="https://yendagolfclub.com.au", email=null, phone=null
- OSM (low, 144m, sim=0.385): name="Yenda Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.385)

### Yeoval Golf Club (Australia, 1 courses)

- DB: addr="Warne Street, Yeoval", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:322m,city:yeoval,db-name-substring,jaccard:1.00], 322m, NSW 2868): name="Yeoval Golf Club", web=null, email=null, phone="(02) 6846 4025"
- OSM (medium, 276m, sim=1): name="Yeoval Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Yeppoon Golf & Country Club (Australia, 2 courses)

- DB: addr="2901 Yeppoon Rd, Yeppoon", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.9[coord:161m,city:yeppoon,jaccard:0.67], 161m, QLD 4703): name="Yeppoon Golf Club", web=null, email=null, phone="07 4939 1056"
- OSM (high, 24m, sim=1): name="Yeppoon Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - phone: from fed(high, sim=1)

### Yorketown Golf Club (Australia, 2 courses)

- DB: addr="Golf Road, Yorketown", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:61m,city:yorketown,db-name-substring,jaccard:1.00], 61m, SA 5576): name="Yorketown Golf Club", web="https://yorketowngolf.com.au/", email="yorketowngolf@hotmail.com", phone=null
- OSM (low, 316996m, sim=0.7): name="Bordertown Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)

### Yowani Country Club (Australia, 1 courses)

- DB: addr="455 Nortthbourne Ave, Lyneham, Canberra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:533m,city:lyneham,db-name-substring,jaccard:1.00], 533m, ACT 2602): name="Yowani Country Club", web="http://www.yowani.com.au", email="andrewr@yowani.com.au", phone="6241 3377"
- OSM (high, 40m, sim=1): name="Yowani Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Yuleba Golf Club (Australia, 1 courses)

- DB: addr="Scott Street, Yuleba", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:64m,city:yuleba,db-name-substring,jaccard:1.00], 64m, QLD 4427): name="Yuleba Golf Club", web=null, email=null, phone=null
- OSM (low, 0m, sim=0.429): name="Yuleba Golf and Bowling Club", web=null, email=null, phone=null

### Zeehan Golf Club (Australia, 1 courses)

- DB: addr="Fowler Street, Zeehan", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:167m,city:zeehan,db-name-substring,jaccard:1.00], 167m, TAS 7469): name="Zeehan Golf Club", web="https://www.facebook.com/profile.php?id=61555866339770&sk=about", email="golfclubzeehan@gmail.com", phone="0400272947"
- OSM (high, 55m, sim=1): name="Zeehan Golf Club", web=null, email=null, phone="+61 3 6471 6291"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

## Medium confidence (review before applying)

### *Wattle Park (Australia, 1 courses)

- DB: addr="1012 Riversdale Road, Burwood", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.4[coord:305m,jaccard:0.50], 305m, VIC 3124): name="Wattle Park Golf Club", web=null, email=null, phone="(0408594369"
- OSM (medium, 290m, sim=1): name="Wattle Park Golf Course", web="http://www.wattleparkgolf.com.au/", email="management@golfsport.net.au", phone="+61 3 9808 2455"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 290m, sim=1)
  - email: from osm(medium, 290m, sim=1)
  - phone: from fed(high, sim=1)

### Amstel Golf Club (Australia, 2 courses)

- DB: addr="825 Cranbourne Frankston Road, Cranbourne", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.222, boost=+0.7[coord:44m,city:cranbourne], 44m, VIC 3977): name="Ranfurlie Golf Club", web="https://www.ranfurlie.com.au", email=null, phone="03 9788 8222"
- OSM (low, 23m, sim=0.222): name="Ranfurlie Golf Club", web="https://www.amstel.org.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.222)
  - phone: from fed(medium, sim=0.222)

### Aussie Golf Ranch (Australia, 1 courses)

- DB: addr="627a Settlement Rd, Cowes, Phillip Island", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.167, boost=+0.7[coord:28m,city:cowes], 28m, VIC 3922): name="Red Rocks Golf Club", web=null, email=null, phone="03 59521393"
- OSM (high, 14m, sim=1): name="Aussie Golf Ranch", web="https://www.aussiegolfranch.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(high, 14m, sim=1)
  - phone: from fed(medium, sim=0.167)

### Bacchus Marsh Golf Club (Australia, 1 courses)

- DB: addr="Links Road, Darley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:52m,db-name-substring,jaccard:1.00], 52m, VIC 3340): name="Bacchus Marsh Golf Club", web=null, email=null, phone="(03) 5367 2226"
- OSM (medium, 445m, sim=1): name="Bacchus Marsh Golf Club", web="https://www.bacchusmarshgolfclub.com.au/", email=null, phone="+61 3 5367 1410;+61 3 5367 2226"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 445m, sim=1)
  - phone: from fed(high, sim=1)

### Badger Heights (Australia, 1 courses)

- DB: addr="Sheffield", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.143, boost=+0.75[coord:607m,city:sheffield,name-token:sheffield], 607m, TAS 7306): name="Sheffield Golf Club", web="https://sheffieldgolfclub.net.au/", email="contact@sheffieldgolfclub.net.au", phone="0418199873"
- OSM (low, 662m, sim=0.143): name="Sheffield Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.143)
  - email: from fed(medium, sim=0.143)
  - phone: from fed(medium, sim=0.143)

### Ballan Golf Club (Australia, 1 courses)

- DB: addr="4 Blow Court, Ballan", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:216m,city:ballan,db-name-substring,jaccard:1.00], 216m, VIC 3342): name="Ballan Golf Club", web=null, email="ballangc@hotmail.com", phone="0353687353"
- OSM (medium, 289m, sim=1): name="Ballan Golf Course", web="https://www.ballangolfclub.com/", email=null, phone="+61 3 5368 1522"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 289m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bankstown Golf Club (Australia, 1 courses)

- DB: addr="70 Ashford Avenue, Milperra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:44m,city:milperra,db-name-substring,jaccard:1.00], 44m, NSW 2214): name="Bankstown Golf Club", web="http://www.bankstowngolf.com.au", email=null, phone="02 9773 0628"
- OSM (medium, 484m, sim=1): name="Bankstown Golf Club", web="https://www.bankstowngolf.com.au/", email="info@bankstowngolf.com.au", phone="+61 2 9773 0628"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(high, sim=1)
  - email: from osm(medium, 484m, sim=1)
  - phone: from fed(high, sim=1)

### Blackbutt Golf Club (Australia, 1 courses)

- DB: addr="Bowman Road, Blackbutt", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:165m,city:blackbutt,db-name-substring,jaccard:1.00], 165m, QLD 4306): name="Blackbutt Golf Club", web=null, email=null, phone="4163 0180"
- OSM (medium, 289m, sim=1): name="Blackbutt Golf Club", web="https://www.blackbuttgolfclub.com/", email=null, phone="+61 7 4163 0180"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 289m, sim=1)
  - phone: from fed(high, sim=1)

### Blue Lake Golf Club (Australia, 1 courses)

- DB: addr="Grant Avenue, Mount Gambier", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:689m,city:mount,db-name-substring,jaccard:1.00], 689m, SA 5290): name="Blue Lake Golf Club", web=null, email="admin@bluelakegolfclub.com.au", phone="(08) 8738 5215"
- OSM (medium, 342m, sim=1): name="Blue Lake Public Golf Links", web="https://bluelakepublicgolflinks.com.au/", email="bluelake@bluelakepublicgolflinks.com.au", phone="+61 8 8725 6198"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 342m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Burra Golf Club (Australia, 1 courses)

- DB: addr="40 Pearce Street, Burra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:251m,city:burra,db-name-substring,jaccard:1.00], 251m, SA 5417): name="Burra Golf Club", web=null, email=null, phone="(08) 8892 2066"
- OSM (medium, 272m, sim=1): name="Burra Golf Course", web="https://www.burragolf.com.au/", email=null, phone="+61 8 8892 2066"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 272m, sim=1)
  - phone: from fed(high, sim=1)

### Caboolture Golf Club (Australia, 2 courses)

- DB: addr="Lesley Avenue, Caboolture", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:267m,city:caboolture,db-name-substring,jaccard:1.00], 267m, QLD 4510): name="Caboolture Golf Club", web=null, email=null, phone="0754951033"
- OSM (medium, 278m, sim=1): name="Caboolture Golf Club", web="https://caboolturegolf.com.au/", email=null, phone="+61 7 5495 1033"

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - website: from osm(medium, 278m, sim=1)
  - phone: from fed(high, sim=1)

### Capricorn Rydges Golf Club (Australia, 2 courses)

- DB: addr="Farnborough Road, Yeppoon", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.478, boost=+0.4[coord:2373m,city:yeppoon], 2373m, QLD 4703): name="Capricorn International Resort", web="http://www.capricorngolf.com.au", email="golf@capricornresort.com", phone="07 49252621"
- OSM (no-match, 920330m, sim=0.5): name="Spring Ridge Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.478)
  - email: from fed(medium, sim=0.478)
  - phone: from fed(medium, sim=0.478)

### Castlemaine Golf Club (Australia, 1 courses)

- DB: addr="Pyrenees Highway, Castlemaine", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:238m,city:castlemaine,db-name-substring,jaccard:1.00], 238m, VIC 3450): name="Castlemaine Golf Club", web=null, email="admin@castlemainegolf.com", phone="0354721682"
- OSM (medium, 326m, sim=1): name="Castlemaine Golf Club", web="https://www.castlemainegolf.com/", email=null, phone="+61 3 5472 1682"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 326m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Chalambar Golf Club (Australia, 1 courses)

- DB: addr="Golf Links Rd, Ararat", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:771m,city:ararat,db-name-substring,jaccard:1.00], 771m, VIC 3377): name="Chalambar Golf Club", web=null, email=null, phone="0353524297"
- OSM (medium, 276m, sim=1): name="Chalambar Golf Club", web="https://www.araratchalambargolf.com.au/", email="chalgolf@netconnect.com.au", phone="+61 3 5352 4297"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 276m, sim=1)
  - email: from osm(medium, 276m, sim=1)
  - phone: from fed(high, sim=1)

### Clifton Springs Golf Club (Australia, 1 courses)

- DB: addr="92-94 Clearwater Drive, Clifton Springs", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:47m,city:clifton,db-name-substring,jaccard:1.00], 47m, VIC 3222): name="Clifton Springs Golf Club", web=null, email=null, phone="03 5251 3391"
- OSM (medium, 417m, sim=1): name="Clifton Springs Golf Course", web="https://www.cliftonspringsgolfclub.com.au/", email=null, phone="+61 3 5253 1488;+61 3 5251 3391"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 417m, sim=1)
  - phone: from fed(high, sim=1)

### Coober Pedy Golf Club (Australia, 1 courses)

- DB: addr="Lot 1509 Rowe Dve, Urangan", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.478, boost=+0.43[coord:628m,jaccard:0.60], 628m, SA 5723): name="Coober Pedy Opal Fields Golf Club", web=null, email="cooberpedygolfclub@gmail.com", phone="0427 569 754"
- OSM (low, 226m, sim=0.478): name="Coober Pedy Opal Fields Golf Club", web="https://www.cooberpedy.sa.gov.au/page.aspx?u=181&c=395", email=null, phone="+61 8 8672 3535;+61 8 8672 5555"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - email: from fed(medium, sim=0.478)
  - phone: from fed(medium, sim=0.478)

### Cowra Golf Club (Australia, 1 courses)

- DB: addr="Mees Road, Cowra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:66m,city:cowra,db-name-substring,jaccard:1.00], 66m, NSW 2794): name="Cowra Golf Club", web="http://www.cowragolfclub.com.au", email=null, phone="(02) 6342 2299"
- OSM (medium, 473m, sim=1): name="Cowra Golf Club", web="https://www.cowragolfclub.com.au/", email="cowragolfclub@bigpond.com", phone="+61 2 6342 2299"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(high, sim=1)
  - email: from osm(medium, 473m, sim=1)
  - phone: from fed(high, sim=1)

### Drouin Golf & Country Club (Australia, 4 courses)

- DB: addr="McGlone Road, Drouin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1[coord:40m,city:drouin,jaccard:1.00], 40m, VIC 3818): name="Drouin Golf and Country Club", web=null, email=null, phone="03 5625 1330"
- OSM (medium, 395m, sim=1): name="Drouin Golf & Country Club", web="https://www.drouingolf.com.au", email=null, phone=null

**Proposed UPDATE** (alle 4 course rows for klub, overall=medium):
  - website: from osm(medium, 395m, sim=1)
  - phone: from fed(high, sim=1)

### Drouin Golf Club (Australia, 1 courses)

- DB: addr=null, web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.6[coord:40m,jaccard:0.67], 40m, VIC 3818): name="Drouin Golf and Country Club", web=null, email=null, phone="03 5625 1330"
- OSM (medium, 395m, sim=1): name="Drouin Golf & Country Club", web="https://www.drouingolf.com.au", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 395m, sim=1)
  - phone: from fed(high, sim=1)

### Eagle Ridge Golf Club (Australia, 1 courses)

- DB: addr="Browns Road, Boneo", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.458, boost=+0.4[coord:401m,jaccard:0.50], 401m, VIC 3939): name="Carington Park Club at Eagle Ridge", web="http://www.eagleridge.com.au", email=null, phone="(03) 5988 6341"
- OSM (high, 82m, sim=1): name="Eagle Ridge Golf Course", web="https://www.eagleridge.com.au/", email=null, phone="+61 3 5988 2500"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.458)
  - phone: from fed(medium, sim=0.458)

### Eagles Nest Golf Course (Australia, 1 courses)

- DB: addr="Island View Drive, Urangan", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.545, boost=+0.4[coord:200m], 200m, QLD 4355): name="Crows Nest Golf Club", web="https://www.crowsnestgolfclub.com.au/", email="golfcrowsnest@gmail.com", phone="4698 1408"
- OSM (low, 77m, sim=0.545): name="Crows Nest Golf Course", web="https://www.crowsnestgolfclub.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.545)
  - email: from fed(medium, sim=0.545)
  - phone: from fed(medium, sim=0.545)

### Eden Gardens Country Club (Australia, 1 courses)

- DB: addr="217 Imlay Street, Eden", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.364, boost=+0.55[coord:464m,city:eden], 464m, NSW 2551): name="Eden Sports and Recreation Club", web="http://www.edensfishermens.com", email=null, phone="0406722817"
- OSM (high, 36m, sim=1): name="Eden Gardens Country Club", web="https://edenfishermens.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.364)
  - phone: from fed(medium, sim=0.364)

### Emu Park Golf Club (Australia, 1 courses)

- DB: addr="Emu Park Road, Emu Park", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:54m,city:park,db-name-substring,jaccard:1.00], 54m, QLD 4710): name="Emu Park Golf Club", web=null, email="admin@emuparkgolf.com.au", phone="07 4939 6804"
- OSM (medium, 271m, sim=1): name="Emu Park Golf Club", web="https://www.emuparkgolfclub.com.au/", email=null, phone="+61 7 4939 6804"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 271m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Fleurieu Golf Course (Australia, 1 courses)

- DB: addr="George Francis Drive, Mount Compass", web=null, email=null, phone=null
- golf.com.au (medium, sim=0, boost=+0.9[coord:159m,city:mount,name-token:mount], 159m, SA 5210): name="Mount Compass Golf Club", web="http://www.mcgc.com.au", email=null, phone="(08) 8556 8500"
- OSM (medium, 258m, sim=1): name="Fleurieu Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0)
  - phone: from fed(medium, sim=0)

### Gunabul Par 3 Golf Course (Australia, 1 courses)

- DB: addr="9 Power Road, Gympie", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.471, boost=+0.4[coord:204m], 204m, QLD 4566): name="Noosa Hills Par 3 Golf Course", web=null, email=null, phone="0402092332"
- OSM (low, 45328m, sim=1): name="Gunabul Par 3", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - phone: from fed(medium, sim=0.471)

### Hills International Golf Club (Australia, 1 courses)

- DB: addr="1 Johanna Street, Jimboomba", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.316, boost=+0.6[coord:134m,jaccard:0.67], 134m, QLD 4280): name="Hills Golf Club (QLD)", web=null, email=null, phone="0409391119"
- OSM (low, 282477m, sim=0.773): name="Bonville International Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - phone: from fed(medium, sim=0.316)

### Ipswich Golf Club (Australia, 1 courses)

- DB: addr="1a Samford Rd, Leichhardt", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:932m,city:leichhardt,db-name-substring,jaccard:1.00], 932m, QLD 4305): name="Ipswich Golf Club", web=null, email=null, phone="(07) 3812 0488"
- OSM (medium, 423m, sim=1): name="Ipswich Country Club", web="http://www.ipswichgolf.org.au", email="manager@ipswichgolf.com.au", phone="+61 7 3812 0488"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 423m, sim=1)
  - email: from osm(medium, 423m, sim=1)
  - phone: from fed(high, sim=1)

### Ipswich Par 3 Course (Australia, 1 courses)

- DB: addr="16 Gibbs Stree, Churchill", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.154, boost=+0.7[coord:115m,city:churchill], 115m, QLD 4305): name="Sandy Gallop Golf Club", web="https://www.sandygallop.com.au", email="sandygallopgolf@hotmail.com", phone="07 3281 8544"
- OSM (low, 166m, sim=0.154): name="Sandy Gallop Golf Course", web="http://www.sandygallop.com.au/", email=null, phone="+61 7 3281 8544"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.154)
  - email: from fed(medium, sim=0.154)
  - phone: from fed(medium, sim=0.154)

### Joondalup Country Club (Australia, 9 courses)

- DB: addr="Country Club Boulevard, Perth", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:188m,db-name-substring,jaccard:1.00], 188m, WA 6919): name="Joondalup Country Club", web=null, email="clubreception@joondalupresort.com.au", phone="(08) 9400 8800"
- OSM (medium, 322m, sim=1): name="Joondalup Resort Golf Course", web="https://joondalupresort.com.au/golf/", email="info@joondalupresort.com.au", phone="+61 8 9400 8811"

**Proposed UPDATE** (alle 9 course rows for klub, overall=medium):
  - website: from osm(medium, 322m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Karana Downs Golf Course (Australia, 2 courses)

- DB: addr="212 College Road, Karana Downs", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.214, boost=+0.7[coord:52m,city:karana], 52m, QLD 4306): name="Brisbane River Golf Club", web=null, email="golf@brgc.com.au", phone="(07) 3201 0833"
- OSM (high, 124m, sim=1): name="Karana Downs Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - email: from fed(medium, sim=0.214)
  - phone: from fed(medium, sim=0.214)

### Killara Golf Club (Australia, 1 courses)

- DB: addr="556 Pacific Highway, Killara", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:607m,city:killara,db-name-substring,jaccard:1.00], 607m, NSW 2071): name="Killara Golf Club", web="http://www.kgc.com.au", email=null, phone="02 9498 2700"
- OSM (medium, 490m, sim=1): name="Killara Golf Club", web="https://www.kgc.com.au/", email="reception@kgc.com.au", phone="+61 2 9498 6730;+61 2 9498 2700"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(high, sim=1)
  - email: from osm(medium, 490m, sim=1)
  - phone: from fed(high, sim=1)

### Kings Park Golf Club (Australia, 1 courses)

- DB: addr="Plenty Road, Bundoora", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.125, boost=+0.75[coord:259m,city:bundoora,name-token:bundoora], 259m, VIC 3083): name="Bundoora Park Public Golf Course", web="https://bundooraparkpublicgolfcourse.com.au/", email="info@bundooraparkpublicgolfcourse.com.au", phone="03 9469 3880"
- OSM (low, 42m, sim=0.125): name="Bundoora Park Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.125)
  - email: from fed(medium, sim=0.125)
  - phone: from fed(medium, sim=0.125)

### Lone Pine Golf Club (Australia, 1 courses)

- DB: addr="Military Area Camp Road, Broadmeadows", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.545, boost=+0.4[coord:23m], 23m, VIC 3875): name="South Pines Golf Club", web=null, email=null, phone="03 5157 1788"
- OSM (low, 46m, sim=0.545): name="South Pines Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - phone: from fed(medium, sim=0.545)

### Longreach Golf Club (Australia, 1 courses)

- DB: addr="Cramsie, Longreach", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:351m,city:longreach,db-name-substring,jaccard:1.00], 351m, QLD 4730): name="Longreach Golf Club", web=null, email="longreachgolf@outlook.com", phone="0428210326"
- OSM (medium, 272m, sim=1): name="Longreach Golf Club/", web="https://www.golf.org.au/longreach-golf-club/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 272m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Marrickville Golf Club (Australia, 1 courses)

- DB: addr="Wharf Street, Marrickville", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:835m,city:marrickville,db-name-substring,jaccard:1.00], 835m, NSW 2204): name="Marrickville Golf Club", web="http://www.marrickvillegolf.com.au", email=null, phone="02 9558 1876"
- OSM (medium, 488m, sim=1): name="Marrickville Golf Club", web="https://www.marrickvillegolf.com.au/", email="manager@marrickvillegolf.com.au", phone="+61 2 9558 6862;+61 2 9558 1876"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(high, sim=1)
  - email: from osm(medium, 488m, sim=1)
  - phone: from fed(high, sim=1)

### Meadow Park Golf Course (Australia, 2 courses)

- DB: addr="Cnr. Connection Road & Valley Drive, Tallebudgera", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.167, boost=+0.75[coord:1238m,city:tallebudgera,name-token:tallebudgera,jaccard:0.50], 1238m, QLD 4228): name="Tallebudgera Golf Course", web="http://www.tallebudgeragolfcourse.com.au", email="coplicks@bigpond.net.au", phone="(07) 5534 8484"
- OSM (high, 16m, sim=1): name="Meadow Park Golf Course", web="https://www.meadowpark.com.au/", email=null, phone="+61 7 5534 8444"

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.167)
  - email: from fed(medium, sim=0.167)
  - phone: from fed(medium, sim=0.167)

### Moranbah Golf Club (Australia, 1 courses)

- DB: addr="1 Leichhardt Drive, Moranbah", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:552m,city:moranbah,db-name-substring,jaccard:1.00], 552m, QLD 4744): name="Moranbah Golf Club", web=null, email=null, phone="0749417144"
- OSM (medium, 387m, sim=1): name="Moranbah Golf Course", web="https://sites.google.com/site/moranbahgolf/", email=null, phone="+61 7 4941 7144"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 387m, sim=1)
  - phone: from fed(high, sim=1)

### Morgan East Golf Club (Australia, 1 courses)

- DB: addr="Dawson Road, Peterborough", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.133, boost=+0.75[coord:505m,city:peterborough,name-token:peterborough], 505m, SA 5422): name="Peterborough Golf Club (SA)", web=null, email="petergc@gmail.com", phone="0408271248"
- OSM (low, 103m, sim=0): name="Peterborough Golf Club", web="http://www.golfsa.com.au/playgolf-display/peterborough-golf-club/1733", email=null, phone="+61 8 8651 2012;+61 3 5598 5245"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - email: from fed(medium, sim=0.133)
  - phone: from fed(medium, sim=0.133)

### Moruya Golf Club (Australia, 1 courses)

- DB: addr="Evans Street, Moruya", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:52m,city:moruya,db-name-substring,jaccard:1.00], 52m, NSW 2537): name="Moruya Golf Club", web="http://www.moruyagolfclub.com.au", email=null, phone="(02) 4474 2300"
- OSM (medium, 431m, sim=1): name="Moruya Golf Course", web="https://www.moruyagolfclub.com.au/", email="admin@moruyagolfclub.com.au", phone="+61 2 4474 3326;+61 2 4474 2300"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(high, sim=1)
  - email: from osm(medium, 431m, sim=1)
  - phone: from fed(high, sim=1)

### Mount Lawley Golf Club (Australia, 1 courses)

- DB: addr="Walter Road, Inglewood", web=null, email=null, phone=null
- golf.com.au (high, sim=0.75, boost=+0.85[coord:310m,city:inglewood,jaccard:1.00], 310m, WA 6052): name="Mt Lawley Golf Club", web=null, email="administration@mlgc.org", phone="08 9271 9622"
- OSM (medium, 318m, sim=1): name="Mount Lawley Golf Club", web="https://www.mlgc.org/", email=null, phone="+61 8 9271 9622;+61 8 9271 4033"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 318m, sim=1)
  - email: from fed(high, sim=0.75)
  - phone: from fed(high, sim=0.75)

### North Lakes Community Golf Club (Australia, 4 courses)

- DB: addr="Stebonheath Rd, Munno Para West", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.19, boost=+0.7[coord:894m,city:munno,jaccard:0.50], 894m, SA 5114): name="Playford Lakes Golf Club", web=null, email=null, phone="(08) 82840655"
- OSM (low, 703m, sim=0.524): name="North Lakes Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 4 course rows for klub, overall=medium):
  - phone: from fed(medium, sim=0.19)

### North Turramurra Golf Course (Australia, 1 courses)

- DB: addr="361A Bobbin Head Road, North Turramurra", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.92[coord:52m,city:north,jaccard:0.75], 52m, NSW ): name="North Turramurra Public Golf Course", web=null, email="info@elitegolfnsw.com.au", phone="9144 5110"
- OSM (medium, 311m, sim=1): name="North Turramurra Golf Course", web="http://www.kmc.nsw.gov.au/facilities_data_upload/north_turramurra_golf_course", email=null, phone="+61 2 9144 5110"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 311m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ongerup Golf Club (Australia, 1 courses)

- DB: addr="Golf Course Road, Ongerup", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:313m,city:ongerup,db-name-substring,jaccard:1.00], 313m, WA 6336): name="Ongerup Golf Club", web=null, email=null, phone=null
- OSM (medium, 307m, sim=1): name="Ongerup Golf Club", web=null, email=null, phone="+61 8 9828 2120;+61 8 9828 2282"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - phone: from osm(medium, 307m, sim=1)

### Peninsula Country Golf Club (Australia, 2 courses)

- DB: addr="211-279 Skye Road, Frankston", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.474, boost=+0.4[coord:394m,jaccard:0.50], 394m, VIC 3199): name="Peninsula-Kingswood Golf Club", web=null, email="proshop@peninsualkingswood.com.au", phone="03 9789 2222"
- OSM (low, 9m, sim=0.474): name="Peninsula Kingswood Country Golf Club", web="https://www.peninsulakingswood.com.au/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - email: from fed(medium, sim=0.474)
  - phone: from fed(medium, sim=0.474)

### Phillip Island Golf Club (Australia, 1 courses)

- DB: addr="34 - 44 Settlement Road, Cowes Phillip Island", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:695m,city:cowes,db-name-substring,jaccard:1.00], 695m, VIC 3922): name="Phillip Island Golf Club", web=null, email=null, phone="(03) 5952 1121"
- OSM (medium, 401m, sim=1): name="Phillip Island Golf Club", web="https://www.pigc.com.au/", email="proshop@pigc.com.au", phone="+61 3 5952 1121"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 401m, sim=1)
  - email: from osm(medium, 401m, sim=1)
  - phone: from fed(high, sim=1)

### Queanbeyan Golf Club (Australia, 1 courses)

- DB: addr="Brown St, Queanbeyan  East", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:7m,city:queanbeyan,db-name-substring,jaccard:1.00], 7m, NSW 2620): name="Queanbeyan Golf Club", web="http://www.queanbeyangolf.com.au", email=null, phone="6297 1669"
- OSM (medium, 323m, sim=1): name="Queanbeyan Golf Club", web="https://www.queanbeyangolf.com.au/", email="proshop@queanbeyangolf.com.au", phone="+61 2 6297 2542"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(high, sim=1)
  - email: from osm(medium, 323m, sim=1)
  - phone: from fed(high, sim=1)

### Reddy Bay Hackers 8 and 12 Out (Australia, 1 courses)

- DB: addr="North Street, Redland Bay", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.192, boost=+0.75[coord:454m,city:redland,name-token:redland], 454m, QLD 4165): name="Redland Bay Golf Club", web=null, email="golf@redlandbaygolf.com.au", phone="07 3206 7011"
- OSM (low, 54m, sim=0.192): name="Redland Bay Golf Club", web=null, email=null, phone="+61 7 3206 8143;+61 7 3206 7011"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - email: from fed(medium, sim=0.192)
  - phone: from fed(medium, sim=0.192)

### Redland Bay Hackers 18 Holes Mar 26 (Australia, 1 courses)

- DB: addr="North Street, Redland Bay", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.314, boost=+0.55[coord:454m,city:redland], 454m, QLD 4165): name="Redland Bay Golf Club", web=null, email="golf@redlandbaygolf.com.au", phone="07 3206 7011"
- OSM (low, 54m, sim=0.314): name="Redland Bay Golf Club", web=null, email=null, phone="+61 7 3206 8143;+61 7 3206 7011"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - email: from fed(medium, sim=0.314)
  - phone: from fed(medium, sim=0.314)

### Royal Melbourne Golf Club (Australia, 3 courses)

- DB: addr="88 Cheltenham Road, Black Rock", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:412m,city:black,db-name-substring,jaccard:1.00], 412m, VIC 3193): name="Royal Melbourne Golf Club", web="https://www.royalmelbourne.com.au", email=null, phone="03 9599 0500"
- OSM (medium, 304m, sim=1): name="Royal Melbourne Golf Club", web="https://www.royalmelbourne.com.au/", email="golfbookings@rmgolf.com.au", phone="+61 3 9599 0500"

**Proposed UPDATE** (alle 3 course rows for klub, overall=medium):
  - website: from fed(high, sim=1)
  - email: from osm(medium, 304m, sim=1)
  - phone: from fed(high, sim=1)

### Sawtell Golf Club (Australia, 2 courses)

- DB: addr="Bayldon Road, Sawtell", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:68m,city:sawtell,db-name-substring,jaccard:1.00], 68m, NSW 2452): name="Sawtell Golf Club", web="https://www.sawtellgolfclub.com.au/cms/", email=null, phone="02 6653 1006"
- OSM (medium, 256m, sim=1): name="Sawtell Golf Course", web="https://www.sawtellgolfclub.com.au", email="manager@sawtellgolf.com.au", phone="+61 2 6653 1006"

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - website: from fed(high, sim=1)
  - email: from osm(medium, 256m, sim=1)
  - phone: from fed(high, sim=1)

### Sefton Golf Club (Australia, 2 courses)

- DB: addr="160 Rose Street, Yagoona", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.95[coord:117m,db-name-substring,jaccard:1.00], 117m, NSW 2162): name="Sefton Golf Club", web=null, email="SeftonGolfClub@hotmail.com", phone="0420312922"
- OSM (medium, 310m, sim=1): name="Sefton Golf Course", web="http://www.bankstown.nsw.gov.au/index.aspx?NID=1441", email=null, phone="+61 2 9743 9436"

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - website: from osm(medium, 310m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Settlers Run Golf & Country Club (Australia, 1 courses)

- DB: addr="1 Settlers Run, Botanic Ridge", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:354m,city:botanic,db-name-substring,jaccard:1.00], 354m, VIC 3977): name="Settlers Run Golf & Country Club", web=null, email=null, phone="03 9785 6072"
- OSM (medium, 279m, sim=1): name="Settlers Run Golf & Country Club", web="http://www.settlersrun.com.au/", email=null, phone="+61 3 9785 6072"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 279m, sim=1)
  - phone: from fed(high, sim=1)

### Spring Park Golf Course (Australia, 3 courses)

- DB: addr="Centre Dandenong Road, Dingley", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:123m,city:dingley,db-name-substring,jaccard:1.00], 123m, VIC ): name="Spring Park Golf Course", web=null, email=null, phone="03 9551 5163"
- OSM (medium, 375m, sim=1): name="Spring Park Golf Course", web="https://www.springparkgolf.com.au/", email=null, phone="+61 3 9551 5123"

**Proposed UPDATE** (alle 3 course rows for klub, overall=medium):
  - website: from osm(medium, 375m, sim=1)
  - phone: from fed(high, sim=1)

### Stonecutters Ridge Golf Club (Australia, 1 courses)

- DB: addr="86 Stonecutters Drive, Colebee", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+0.78[coord:517m,city:colebee,jaccard:0.75], 517m, NSW 2761): name="Stonecutters Ridge Golf Course", web=null, email=null, phone=null
- OSM (medium, 499m, sim=1): name="Stonecutters Ridge Golf Club", web="https://www.stonecuttersgc.com.au/", email="reception@srgc.net.au", phone="+61 2 9627 1816;+61 2 9627 7081"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 499m, sim=1)
  - email: from osm(medium, 499m, sim=1)
  - phone: from osm(medium, 499m, sim=1)

### West Wyalong Country Golf Club (Australia, 1 courses)

- DB: addr="Tallimba Road, West Wyalong", web=null, email=null, phone=null
- golf.com.au (medium, sim=0.522, boost=+0.4[coord:2351m,city:west], 2351m, NSW 2671): name="West Wyalong S and C Sports Club", web=null, email=null, phone="(02) 6972 2111"
- OSM (low, 2197m, sim=1): name="West Wyalong Golf Course", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - phone: from fed(medium, sim=0.522)

### Wickepin Golf Club (Australia, 1 courses)

- DB: addr="Wogolin Road, Wickepin", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.1[coord:402m,city:wickepin,db-name-substring,jaccard:1.00], 402m, WA 6370): name="Wickepin Golf Club", web=null, email=null, phone="(08) 98881032"
- OSM (medium, 414m, sim=1): name="Wickepin Golf Club", web="https://www.facebook.com/wickepinsportsclub/", email=null, phone="+61 8 9888 1080"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 414m, sim=1)
  - phone: from fed(high, sim=1)

### Woollahra Golf Club (Australia, 3 courses)

- DB: addr="O'Sullivan Rd, Bellevue Hill", web=null, email=null, phone=null
- golf.com.au (high, sim=1, boost=+1.25[coord:85m,city:bellevue,db-name-substring,jaccard:1.00], 85m, NSW 2023): name="Woollahra Golf Club", web="http://www.woollahragolfclub.com.au", email=null, phone="02 9327 5404"
- OSM (medium, 308m, sim=1): name="Woollahra Golf Club", web="https://www.woollahragolfclub.com/", email="office@woollahragolfclub.com", phone="+61 2 9327 3683;+61 2 9327 5404"

**Proposed UPDATE** (alle 3 course rows for klub, overall=medium):
  - website: from fed(high, sim=1)
  - email: from osm(medium, 308m, sim=1)
  - phone: from fed(high, sim=1)

## Low confidence (manual decision)

### Belair National Park Public Golf Course & Country (Australia, 1 courses)

- DB: addr="Upper Sturt Road Belair (Adjacent to Belair National Park), Blackwood", web=null, email=null, phone=null
- golf.com.au (low, sim=0.261, boost=+0.5[city:belair,name-token:blackwood], SA 5052): name="Blackwood & Community RSL Golf", web=null, email="margwray51@gmail.com", phone="0457748519"
- OSM (no-match, Infinitym, sim=0.563): name="Yanchep National Park Golf Course", web=null, email=null, phone=null

### Commercial Golf Resort Albury (Australia, 2 courses)

- DB: addr="618 Dean St, Albury", web=null, email=null, phone=null
- golf.com.au (low, sim=0.176, boost=+0.63[coord:1781m,city:albury,jaccard:0.75], 1781m, NSW 2640): name="Albury Commercial Golf Club", web="http://www.commclubalbury.com.au", email=null, phone="02 6021 1133"
- OSM (low, 151m, sim=0.059): name="Drummond Golf", web=null, email=null, phone=null

### Cowes Golf Club (Australia, 1 courses)

- DB: addr="Settlement Road, Cowes, Philip island", web=null, email=null, phone=null
- golf.com.au (low, sim=0.071, boost=+0.75[coord:695m,city:cowes,name-token:island], 695m, VIC 3922): name="Phillip Island Golf Club", web=null, email=null, phone="(03) 5952 1121"
- OSM (low, 401m, sim=0.071): name="Phillip Island Golf Club", web="https://www.pigc.com.au/", email="proshop@pigc.com.au", phone="+61 3 5952 1121"

### Creswick the Forest Resort (Australia, 1 courses)

- DB: addr="1500 Midland Highway, Creswick", web=null, email=null, phone=null
- golf.com.au (low, sim=0.208, boost=+0.55[coord:537m,city:creswick], 537m, VIC 3363): name="RACV Goldfields Creswick Golf Club", web="http://racvgoldfieldsresort.com.au", email="josh_pegg@racv.com.au", phone="0408 532 040"
- OSM (low, 240m, sim=0.533): name="Creswick Golf Course", web=null, email=null, phone=null

### Eden Park Golf Course (Australia, 2 courses)

- DB: addr="Preston Road, Collie", web=null, email=null, phone=null
- golf.com.au (low, sim=0, boost=+0.75[coord:643m,city:collie,name-token:collie], 643m, WA 6225): name="Collie Golf Club", web=null, email="colliegolf@westnet.com.au", phone="(08) 9734 1655"
- OSM (low, 17m, sim=0.4): name="Eden Park Par 3 Golf Course", web=null, email=null, phone="+61 8 9734 3022"

### Gold Coast Country Club (Australia, 2 courses)

- DB: addr="Town Centre Drive, Helensvale", web=null, email=null, phone=null
- golf.com.au (low, sim=0.2, boost=+0.6[coord:2226m,city:helensvale,name-token:helensvale], 2226m, QLD 4212): name="Helensvale Golf Course", web="https://www.helensvalegolfcourse.com.au/", email=null, phone="0408724541"
- OSM (no-match, 901983m, sim=0.6): name="Gold Creek Country Club", web="https://www.goldcreekcountryclub.com.au/", email=null, phone="+61 2 6123 0601"

### Hobart Airport Public Golf Course (Australia, 1 courses)

- DB: addr="Golf Road, Cambridge", web=null, email=null, phone=null
- golf.com.au (low, sim=0.429, boost=+0.4[coord:2227m,city:cambridge], 2227m, TAS 7170): name="Golf Park Hobart", web="https://golfpark.com.au/", email=null, phone="0404369462"
- OSM (low, 950m, sim=0.143): name="Llanherne Golf Course", web=null, email=null, phone=null

### Kosciuszko Thredbo Resort (Australia, 1 courses)

- DB: addr="Valley Terminal, Thredbo", web=null, email=null, phone=null
- golf.com.au (low, sim=0.389, boost=+0.4[coord:1499m,city:thredbo], 1499m, NSW 2625): name="Thredbo Golf Club", web=null, email=null, phone="0414 700 321"
- OSM (no-match, 1557m, sim=0.389): name="Thredbo Golf Course", web=null, email=null, phone=null

### Nepean Golf Club (Australia, 1 courses)

- DB: addr="Golfers Drive, East Malvern", web=null, email=null, phone=null
- golf.com.au (low, sim=0.167, boost=+0.6[coord:1232m,city:malvern,name-token:malvern], 1232m, VIC 3147): name="East Malvern Golf Club", web="https://www.eastmalverngc.com.au/", email=null, phone="0409 209 769"
- OSM (no-match, 128210m, sim=0.5): name="Beeac Golf Club", web=null, email=null, phone=null

### parasidegolfclub (Australia, 1 courses)

- DB: addr="adelaide", web=null, email=null, phone=null
- golf.com.au (low, sim=0.188, boost=+0.6[coord:2101m,city:adelaide,name-token:adelaide], 2101m, SA 5006): name="North Adelaide Golf Club", web="http://www.nagc.org.au", email=null, phone="(08) 8267 3706"
- OSM (no-match, 516671m, sim=0.438): name="Pyramid Hill Golf Club", web=null, email=null, phone=null

### Sea Temple Golf Club (Australia, 1 courses)

- DB: addr="Old Port Road, Port Douglas", web=null, email=null, phone=null
- golf.com.au (low, sim=0.267, boost=+0.55[coord:353m,city:port], 353m, QLD 4877): name="Palmer Sea Reef", web="http://www.palmergolf.com.au", email=null, phone="(07) 4087 2222"
- OSM (low, 722m, sim=0.267): name="Palmer Sea Reef", web="http://www.palmerseareef.com.au/", email="seareef@palmergolf.com.au", phone="+61 7 4087 2222"

### The Grange (Kembla Grange) (Australia, 1 courses)

- DB: addr="Princes Hwy, Kembla Grange", web=null, email=null, phone=null
- golf.com.au (low, sim=0.4, boost=+0.4[coord:1016m,city:kembla], 1016m, NSW 2530): name="The Grange Golf Club (NSW)", web="https://www.thegrangegolfclub.com.au", email="proshop@thegrangegolfclub.com.au", phone="02 4261 1647"
- OSM (no-match, 1191m, sim=0.65): name="Kembla Grange Golf Club", web=null, email=null, phone=null

## Orphans — DB klubber uden golf.com.au-match

- Aberdeen Golf Club (1 courses) (best fed sim=1 → Aberdeen Golf Club), OSM low 0m
- Adelaide South Park (1 courses) (best fed sim=0.571 → Golf Park Adelaide), OSM no-match 47089m
- Albany Links Golf Course (1 courses) (best fed sim=1 → Albany Golf Club), OSM low 10m
- Albert Golf Club (1 courses) (best fed sim=1 → Albert Park Golf Course), OSM medium 301m
- Alberton Golf Club (1 courses) (best fed sim=0.75 → Albert Golf Club), OSM low 878098m
- Angles Arrow Golf Club - Square Golf (1 courses) (best fed sim=0.32 → Craignish Golf Club at Fraser Lakes Course), OSM no-match 16943019m
- Araluen Country Club (1 courses) (best fed sim=1 → Araluen Estate GC Golf Club), OSM low 142m
- Aramac Golf Club (1 courses) (best fed sim=0.143 → Kingston Beach Golf Club), OSM no-match 3007557m
- Arch McArthur Golf Club (1 courses) (best fed sim=0.615 → X-Golf Macarthur), OSM no-match 647011m
- Ardlethan Golf Club (1 courses) (best fed sim=0.556 → Ardrossan Golf Club), OSM low 795m
- Arthur River Country Club (1 courses) (best fed sim=0.571 → Margaret River Golf Club), OSM no-match 2543040m
- Arundel Hills Country Club (1 courses) (best fed sim=0.571 → X-Golf Surrey Hills), OSM no-match 1341m
- Ashford Golf Club (1 courses) (best fed sim=1 → Ashford Golf Club), OSM low 664m
- Ashlar Golf Club (1 courses) (best fed sim=0.571 → Ashford Golf Club), OSM no-match 495450m
- Augusta Hillview Golf Club (1 courses) (best fed sim=0.438 → Augusta Golf Club), OSM no-match 18320361m
- Badgingarra Golf Club (1 courses) (best fed sim=1 → Badgingarra Golf Club), OSM high 95m
- Baffle Creek Golf Club (1 courses) (best fed sim=0.583 → Sandy Creek Golf Club), OSM no-match 1285649m
- Baker Golf Club (1 courses) (best fed sim=0.455 → Bakers Hill Golf Club), OSM high 17m
- Balmoral Golf Club (1 courses) (best fed sim=1 → Balmoral Golf Club), OSM high 35m
- Bandiana Army Golf Club (1 courses) (best fed sim=0.5 → Wallangarra Army Golf Club), OSM no-match 2976884m
- Barellan Golf Club (2 courses) (best fed sim=0.75 → Ballan Golf Club), OSM high 192m
- Barham Golf & Country Club (1 courses) (best fed sim=1 → Barham Golf Club), OSM low 23m
- Barunah Plains Golf Club (1 courses) (best fed sim=0.267 → Hamilton Island Golf Club), OSM no-match 1620220m
- Battunga Golf Club (1 courses) (best fed sim=0.5 → Echunga Golf Club), OSM no-match 767771m
- Beau Vista Par 3 Golf Course (1 courses) (best fed sim=1 → Beau Vista Par 3 Golf Course), OSM low 879m
- Beechworth Golf Club (1 courses) (best fed sim=1 → Beechworth Golf Club), OSM low 201m
- Belair Park Public Golf Course (1 courses) (best fed sim=1 → Belair Park Golf Club), OSM low 42m
- Belconnen ACT Golfers Only (1 courses) (best fed sim=0.231 → Burns Golf Club Belconnen), OSM no-match 1926m
- Bell Golf Club (1 courses) (best fed sim=0.308 → Bell and District Golf Club), OSM low 331m
- Ben Lomond Golf Club (1 courses) (best fed sim=0.6 → Belmont Golf Club), OSM no-match 1010249m
- Bencubbin Golf & Bowling Club (1 courses) (best fed sim=0.647 → Berrigan Golf and Bowling Club), OSM low 0m
- Beresfield Golf Course (1 courses) (best fed sim=0.636 → Tenterfield Golf Club), OSM high 100m
- Berwick Golf Range (1 courses) (best fed sim=0.467 → Berwick Montuna Driving Range), OSM low 1243199m
- Bidgee Banks Golf Course (1 courses) (best fed sim=0.235 → Gundagai Services Golf Club), OSM low 25m
- Bigga Golf Club (3 courses) (best fed sim=1 → Bigga Golf Club), OSM low 5m
- Bindoon & Districts Golf Club (1 courses) (best fed sim=0.647 → Dungog and District Golf Club), OSM high 2m
- Binningup Golf Club (2 courses) (best fed sim=0.667 → Balingup Golf Club), OSM high 116m
- Binnu Golf Club (1 courses) (best fed sim=0.25 → Brighton Golf Club), OSM high 133m
- Black Bull Golf Club (1 courses) (best fed sim=0.7 → Blackbutt Golf Club), OSM medium 318m
- Blackwood Golf Club (1 courses) (best fed sim=1 → Blackwood Golf Club), OSM low 6764m
- Bloomfield Country Club (1 courses) (best fed sim=0.5 → Fairfield Golf Club), OSM high 165m
- Bogan Gate Golf Club (1 courses) (best fed sim=1 → Bogan Gate Golf Club), OSM no-match 818054m
- Boomerang Farm (1 courses) (best fed sim=1 → Boomerang Farm Golf Course), OSM no-match 725458m
- Boonooroo Golf Course (1 courses) (best fed sim=1 → Boonooroo Golf Club), OSM no-match 1056m
- Boorhaman Golf Club (1 courses) (best fed sim=1 → Boorhaman Golf Club), OSM low 26m
- Boree Creek Golf Club (1 courses) (best fed sim=0.583 → Werris Creek Golf Club), OSM high 41m
- Bougle Run (1 courses) (best fed sim=0.563 → Barnbougle Dunes Golf Links), OSM no-match 1383m
- Boulder Golf Club (1 courses) (best fed sim=0.5 → Southern Golf Club), OSM no-match 1858964m
- Bourke Golf Club (1 courses) (best fed sim=0.556 → Melbourne Golf Park), OSM low 45m
- Bowraville Golf Club (1 courses) (best fed sim=1 → Bowraville Golf Club), OSM low 479m
- Boxwood Hill Golf Club (1 courses) (best fed sim=0.667 → Box Hill Golf Club), OSM low 307m
- Bridgetown Golf Club (1 courses) (best fed sim=1 → Bridgetown Golf Club), OSM low 2625881m
- Bridgewater On Loddon Golf Club (1 courses) (best fed sim=0.429 → Bridgetown Golf Club), OSM low 92m
- Brim Golf Club (1 courses) (best fed sim=1 → Brim Golf Club), OSM low 34m
- Broadwater Par 3 Golf (1 courses) (best fed sim=0.375 → Broadford Golf Club), OSM high 7m
- Brookton Golf Club (1 courses) (best fed sim=1 → Brookton Country Club), OSM low 0m
- Bundarra Golf Club (1 courses) (best fed sim=1 → Bundarra Golf Club), OSM low 1007241m
- Buntine Golf Club (1 courses) (best fed sim=0.444 → Mount Isa Golf Club), OSM high 1m
- Burren Junction Golf Club (1 courses) (best fed sim=0.067 → Trafalgar Golf Club), OSM no-match 2973042m
- California Creek Golf Course (1 courses) (best fed sim=0.5 → Werris Creek Golf Club), OSM no-match 328282m
- Calival Golf Club (1 courses) (best fed sim=0.571 → Kaniva Golf Club), OSM low 206068m
- Cambrai Golf Club (1 courses) (best fed sim=0.25 → Tasmania Golf Club), OSM low 90m
- Camden Valley Golf Resort (9 courses) (best fed sim=0.667 → Bardwell Valley Golf Club), OSM low 518m
- Campaspe Golf Club (1 courses) (best fed sim=0.231 → Echuca Back 9 Golf Course), OSM low 0m
- Canberra Southern Cross Club (1 courses) (best fed sim=0.478 → Southern Cross Golf Club (WA)), OSM no-match 2796771m
- Candelo Kameruka Golf Club (1 courses) (best fed sim=0.375 → Canberra Public Golf Course), OSM no-match 634989m
- Canning Vale Country Club (1 courses) (best fed sim=0.583 → Korong Vale Golf Club), OSM no-match 2724123m
- Canungra Area Golf Club (1 courses) (best fed sim=1 → Canungra Area Golf Club), OSM low 109m
- Capital Golf ACT Golfers (1 courses) (best fed sim=0.158 → Canberra Public Golf Course), OSM low 307m
- Capital Golf Course (1 courses) (best fed sim=0.636 → Capital Golf Club (Vic)), OSM low 792m
- Capitol Hill Golf Resort (1 courses) (best fed sim=0.667 → Capital Golf Club (Vic)), OSM no-match 19490m
- Captain Cook Golf Club (1 courses) (best fed sim=0.231 → Kotarana Golf Club (TEST)), OSM no-match 25447m
- Caramut Golf Club (1 courses) (best fed sim=0.625 → Carramar Golf Course), OSM high 74m
- Carinda Golf Club (1 courses) (best fed sim=0.857 → Corinda Golf Course), OSM low 1469057m
- Carnamah Golf Club (1 courses) (best fed sim=0.75 → Carramar Golf Course), OSM high 16m
- Carnarvon Golf Club (3 courses) (best fed sim=0.75 → Carnarvon Golf Club (WA)), OSM low 1120m
- Carramar Golf Club (1 courses) (best fed sim=1 → Carramar Golf Course), OSM low 310m
- Casterton Golf Club (1 courses) (best fed sim=1 → Casterton Golf Club), OSM low 79m
- Castle Hill Country Club (2 courses) (best fed sim=1 → Castle Hill Country Club), OSM low 5608m
- Castle Hill Temp (Oct 2018) Blue Tees (1 courses) (best fed sim=0.286 → Peak Hill Golf Club Co-Operative Ltd), OSM no-match 4086m
- Cerise Brook Family Golf Course (1 courses) (best fed sim=0.105 → St Helens Golf Club), OSM no-match 784167m
- Cessnock Golf Club (1 courses) (best fed sim=0.375 → Esk Golf Club), OSM low 358m
- Chapman Valley Golf Club (1 courses) (best fed sim=1 → Chapman Valley Golf Club), OSM no-match 408947m
- Chartest Towers (1 courses) (best fed sim=0.867 → Charters Towers Golf Club), OSM low 12048901m
- Chelsea Public Golf Course (2 courses) (best fed sim=0.7 → Winchelsea Golf Club), OSM low 102110m
- City Of Kingston Public Golf Course (2 courses) (best fed sim=0.231 → Spring Park Golf Course), OSM no-match 1367m
- Clifton Golf Club (1 courses) (best fed sim=1 → Clifton Golf Club), OSM low 68m
- Cloncurry Golf Club (1 courses) (best fed sim=0.556 → Concord Golf Club), OSM no-match 1743643m
- Cobargo Golf Club (1 courses) (best fed sim=0.462 → Cobar Bowling and Golf Club), OSM no-match 659062m
- Condamine Golf Club (1 courses) (best fed sim=0.556 → Coonamble Golf Club), OSM low 203m
- Condingup Country Club (1 courses) (best fed sim=0.556 → Kondinin Golf Club), OSM no-match 640433m
- Coolamon Golf Club (1 courses) (best fed sim=0.571 → Coolamon Sport and Recreation Club), OSM low 38m
- Coolgardie Golf Club (1 courses) (best fed sim=1 → Coolgardie Golf Club), OSM no-match 2452682m
- Cooroy Golf Club (1 courses) (best fed sim=1 → Cooroy Golf Club), OSM low 15m
- Craggy Peaks Golf Course (1 courses) (best fed sim=0.5 → Darke Peak Golf Club), OSM no-match 1363272m
- Cranbourne Golf Club (1 courses) (best fed sim=1 → Cranbourne Golf Club), OSM low 23m
- Cranbrook Golf Club (1 courses) (best fed sim=1 → Cranbrook Golf Club), OSM low 34m
- Croppa Creek Golf Club (1 courses) (best fed sim=0.5 → Werris Creek Golf Club), OSM high 21m
- Croxton Linxs (1 courses) (best fed sim=0.533 → Clifton Springs Golf Club), OSM no-match 54878m
- Cudlee Creek Golf Course (1 courses) (best fed sim=0.5 → Sandy Creek Golf Club), OSM no-match 711128m
- Cue Golf Club (1 courses) (best fed sim=0.667 → The Cut Golf Course), OSM low 23m
- Cygnet Public Golf Course (1 courses) (best fed sim=0.333 → Dorset Public Golf Course), OSM no-match 711345m
- Darlington Park Golf Course (1 courses) (best fed sim=0.8 → Carrington Park Golf Club), OSM low 28m
- Darlington Point Golf Club (1 courses) (best fed sim=0.5 → Ledge Point Country Club), OSM high 22m
- Defence Establishment Orchard Hills (1 courses) (best fed sim=0.257 → Terrey Hills Golf + Country Club), OSM no-match 2189m
- Dingo Golf Club (1 courses) (best fed sim=0.375 → Pin High), OSM no-match 1327422m
- Dumbleyung Golf Club (1 courses) (best fed sim=0.2 → Katanning Country Club), OSM low 536m
- Dungog & District Golf Club (1 courses) (best fed sim=1 → Dungog and District Golf Club), OSM no-match 344432m
- Dunkeld Memorial Golf Club (1 courses) (best fed sim=1 → Dunkeld Memorial Golf Club), OSM high 0m
- Eaglehawk Golf Club (1 courses) (best fed sim=0.13 → Macquarie Links International Golf Club), OSM no-match 195622m
- Eatonvale Golf Club (1 courses) (best fed sim=0.667 → Avondale Golf Club), OSM low 240553m
- Edinburgh Golf Club (1 courses) (best fed sim=0.8 → Edithburgh Golf Club), OSM low 115m
- Edithburgh Golf Club (1 courses) (best fed sim=1 → Edithburgh Golf Club), OSM low 115m
- Eildon Golf Club (1 courses) (best fed sim=1 → Eildon Golf Club), OSM high 38m
- El Caballo Golf Course (1 courses) (best fed sim=1 → El Caballo Golf Club), OSM low 90m
- Embleton Golf Course (2 courses) (best fed sim=0.667 → Pemberton Golf Club), OSM low 25m
- Emerald Golf & Country Resort (1 courses) (best fed sim=1 → Emerald Golf Club), OSM high 239m
- Erina Creek (1 courses) (best fed sim=0.667 → Werris Creek Golf Club), OSM no-match 489970m
- Eudunda Golf Club (1 courses) (best fed sim=0.231 → Crescent Head Country Club), OSM high 155m
- Eustondale Golf Course (1 courses) (best fed sim=0.5 → Eastlake Golf Course), OSM high 163m
- Fairbairn Black Tee ACT Golfers (1 courses) (best fed sim=0.194 → RAAF Williams Laverton Base Golf Club), OSM low 130m
- Flinders Island Golf Club (1 courses) (best fed sim=1 → Flinders Island Golf Club), OSM no-match 1511310m
- Forbes Golf Club (1 courses) (best fed sim=0.667 → Forest Resort Golf Course), OSM low 24m
- Forcett Lakes Golf Club (2 courses) (best fed sim=0.615 → South Lakes Golf Club), OSM no-match 1191308m
- Forrest Hill Golf Club (1 courses) (best fed sim=0.583 → Home Hill Golf Club), OSM high 221m
- Frankland Golf Club (1 courses) (best fed sim=0.556 → Parklands Golf Club), OSM high 166m
- Frankston Golf Club (1 courses) (best fed sim=0.556 → Kingston Links Golf Links), OSM high 27m
- Gawler Par 3 Golf Course (1 courses) (best fed sim=1 → Gawler Par 3 Golf Course), OSM low 5m
- Geoff Heath Par 3 Golf Complex (1 courses) (best fed sim=0.24 → North Adelaide Golf Course), OSM no-match 1156573m
- Georgetown Golf Club (3 courses) (best fed sim=0.909 → George Town), OSM high 45m
- Gepps Cross Golf Club (1 courses) (best fed sim=0.071 → North Adelaide Golf Course), OSM no-match 1842593m
- Gingin Golf Club (1 courses) (best fed sim=0.667 → Gingin Golf Club - WA), OSM low 1125985m
- Glen Iris Country Club (1 courses) (best fed sim=0.7 → Glen Innes Golf Club), OSM low 3421595m
- Glen Iris Public Golf Course (1 courses) (best fed sim=0.7 → Glen Innes Golf Club), OSM low 3421202m
- Glenview (1 courses) (best fed sim=1 → Glenview Golf Course), OSM no-match 1770m
- Goldfields Golf Club (1 courses) (best fed sim=0.667 → RACV Goldfields Resort), OSM no-match 2357824m
- Golf Club Lake Wood - Square Golf (1 courses) (best fed sim=0.412 → Calderwood Valley Golf Course), OSM low 441m
- Golf Club Lazy Dogs - Square Golf (1 courses) (best fed sim=0.375 → Golf Square), OSM low 265m
- Golf Club Sunny Bay - Square Golf (1 courses) (best fed sim=0.375 → Golf Square), OSM low 0m
- Goodooga Golf Club (1 courses) (best fed sim=0.625 → Wodonga Golf Club), OSM no-match 921246m
- Goolabri Country Resort (1 courses) (best fed sim=0.625 → Goolgowi Golf Club), OSM no-match 502968m
- Goolwa Golf Club (1 courses) (best fed sim=0.182 → South Lakes Golf Club), OSM low 181m
- Goomalling Golf Club (1 courses) (best fed sim=1 → Goomalling Golf Club), OSM low 61m
- Goornong Golf Club (1 courses) (best fed sim=0.625 → Corryong Golf Club), OSM no-match 307235m
- Goose Gully Golf Greens (1 courses) (best fed sim=0.474 → Gainsborough Greens), OSM low 22m
- Gordonvale Golf Club (2 courses) (best fed sim=1 → Gordonvale Golf Club), OSM no-match 1066m
- Goroke Golf Club (1 courses) (best fed sim=1 → Goroke Golf Club), OSM low 5509m
- Gosford Golf Club (1 courses) (best fed sim=1 → Gosford Golf Club), OSM low 1m
- Grange Golf Club (2 courses) (best fed sim=0.667 → The Grange Golf Club (SA) ), OSM low 465m
- Green Range Country Club (1 courses) (best fed sim=1 → Green Range Country Club), OSM low 779m
- Greenvale Golf Club (1 courses) (best fed sim=0.545 → Greenbushes Golf Club), OSM high 42m
- Grose River Golf Course (1 courses) (best fed sim=0.692 → Georges River Golf Club), OSM no-match 45329m
- Grove Park Public Golf Links (1 courses) (best fed sim=0.8 → Gove Country Golf Club), OSM high 62m
- Hahndorf Golf Club (1 courses) (best fed sim=0.5 → Club Banora Golf Club), OSM low 115m
- Hallett Golf Club (1 courses) (best fed sim=0.231 → X-Golf Clyde North ), OSM high 14m
- Halls Creek Golf Club (1 courses) (best fed sim=0.545 → Halls Gap Golf Club), OSM high 127m
- Hamilton Island (1 courses) (best fed sim=1 → Hamilton Island Golf Club), OSM no-match 2014377m
- Harrismith Golf Club (1 courses) (best fed sim=1 → Harrismith Golf Club), OSM high 207m
- Harvey Golf Club (1 courses) (best fed sim=1 → Harvey Golf Club), OSM high 122m
- Hattonvale Golf Club (1 courses) (best fed sim=0.455 → Korong Vale Golf Club), OSM no-match 699391m
- Hawker Golf Club (1 courses) (best fed sim=0.6 → Hawker Golf Club Inc), OSM low 75m
- Hay Golf Club (1 courses) (best fed sim=0.111 → Balranald Golf Club), OSM high 26m
- Hepburn Springs Golf Club (1 courses) (best fed sim=0.6 → Clifton Springs Golf Club), OSM high 58m
- HMAS Creswell Golf Club (1 courses) (best fed sim=1 → HMAS Creswell Golf Club), OSM low 341m
- Horton Park Golf Club (1 courses) (best fed sim=0.833 → Hoxton Park Driving Range), OSM no-match 812005m
- Howlong Country Club (2 courses) (best fed sim=1 → Howlong Country Golf Club), OSM low 19m
- Hume Country Golf Club (1 courses) (best fed sim=0.5 → Rod Hume Golf), OSM low 207m
- Humula Golf Club (1 courses) (best fed sim=0.5 → Tumut Golf Club), OSM no-match 12053194m
- Illawarra Golf Course (2 courses) (best fed sim=0.529 → Illawarra Golf Complex), OSM no-match 638603m
- Injune Golf Club (1 courses) (best fed sim=1 → Injune Golf Club), OSM no-match 405265m
- Ivanhoe Golf Club (1 courses) (best fed sim=1 → Ivanhoe Public Golf Course), OSM high 62m
- Jandowae Golf Club (1 courses) (best fed sim=1 → Jandowae Golf Club), OSM low 8203m
- Jandowae Golf Club 18 Hole (1 courses) (best fed sim=0.5 → Jandowae Golf Club), OSM no-match 40016m
- Jarklin Golf Club (1 courses) (best fed sim=0.2 → Kangaroo Valley Country Club), OSM no-match 2500509m
- Jericho Golf Club (1 courses) (best fed sim=0.571 → Merino Golf Club), OSM no-match 16646300m
- Jindabyne Golf Club (1 courses) (best fed sim=0.667 → Jindalee Golf Club), OSM no-match 1068116m
- Jingalup Golf Club (1 courses) (best fed sim=0.25 → Kojonup Golf Club), OSM no-match 301888m
- Jubilee Golf Club (1 courses) (best fed sim=1 → Jubilee Golf Club), OSM low 26m
- Jugiong Golf Club (1 courses) (best fed sim=0.571 → Gulgong Golf Club), OSM no-match 248743m
- Jundah Golf Club (1 courses) (best fed sim=1 → Jundah Golf Club), OSM low 51m
- Kabi Golf Course (1 courses) (best fed sim=0.5 → Kumbia Golf Course), OSM low 317m
- Kambalda Country Club (1 courses) (best fed sim=0.5 → Korbelka Golf Club), OSM low 3544m
- Kapooka Golf Club (1 courses) (best fed sim=0.714 → Warooka Golf Club), OSM high 88m
- Katoomba Golf Club (1 courses) (best fed sim=0.625 → Coomba Park Golf and Country Club), OSM no-match 317834m
- Kellerberrin Golf Club (1 courses) (best fed sim=1 → Kellerberrin Golf Club), OSM low 10m
- Kenton Valley Golf Course (1 courses) (best fed sim=0.846 → Melton Valley Golf Club), OSM high 25m
- Kings Cove Club (1 courses) (best fed sim=0.6 → Lane Cove Golf Club), OSM low 217m
- Kogarah Golf Club (2 courses) (best fed sim=0.231 → Bacchus Marsh Golf Club), OSM high 159m
- Kondinin Golf Club (1 courses) (best fed sim=1 → Kondinin Golf Club), OSM low 414m
- Kukerin Golf Club (1 courses) (best fed sim=1 → Kukerin Golf Club), OSM high 8m
- Kweda Golf Club (1 courses) (best fed sim=1 → Kweda Golf Club), OSM high 0m
- Kyancutta Ramblers Golf Club (1 courses) (best fed sim=1 → Kyancutta Ramblers Golf Club), OSM no-match 718363m
- Lachlan River Sporting Club (1 courses) (best fed sim=0.591 → Hillston (Lachlan River Sporting Club)), OSM no-match 317467m
- Lake Cargelligo Golf Club (1 courses) (best fed sim=0.4 → Lake Bolac Golf Club), OSM medium 315m
- Lakes View Golf Course (1 courses) (best fed sim=0.9 → Lake View Golf Club), OSM high 3m
- Lakeside Country Club, Coombabah, Gold Coast (1 courses) (best fed sim=0.276 → Lakeside Country Club), OSM low 9m
- Lakeside Golf Club (2 courses) (best fed sim=1 → Lakeside Country Club), OSM low 244m
- Lalbert Golf Club (1 courses) (best fed sim=1 → Lalbert Golf Club), OSM low 441m
- Landsborough Golf Club (1 courses) (best fed sim=0.75 → Dunsborough Country Club), OSM low 81m
- Lavarack Golf Club (1 courses) (best fed sim=0.5 → Morack Golf Course), OSM high 44m
- Lawson Lodge (1 courses) (best fed sim=0.222 → Aston Hills Golf Club at Mount Barker), OSM no-match 609909m
- Leisure Club Sorrento - Square Golf (1 courses) (best fed sim=0.13 → Clare Golf Club), OSM low 151m
- Lightning Ridge Golf Club (1 courses) (best fed sim=0.6 → Spring Ridge Country Club), OSM low 820m
- Lindeman Island Golf Club (1 courses) (best fed sim=0.6 → King Island Golf Club), OSM no-match 2184026m
- Lismore Golf Club (1 courses) (best fed sim=1 → Lismore Golf Club), OSM low 23m
- Logan City Golf Club (3 courses) (best fed sim=0.6 → Golf in the City), OSM low 60m
- Long Island Country Club (2 courses) (best fed sim=0.818 → King Island Golf Club), OSM high 62m
- Longwood Social Golf Club (1 courses) (best fed sim=0.5 → Hamilton Hill Social Golf Club), OSM low 198m
- Lord Howe Island Golf Club (1 courses) (best fed sim=0.625 → Links Hope Island Golf Club), OSM high 34m
- Lost Farm (1 courses) (best fed sim=0.6 → Port Fairy Golf Club), OSM low 220m
- Louth Bay Golf Club (1 courses) (best fed sim=0.5 → North Star Golf Club), OSM low 51m
- Lyndhurst Golf Club (1 courses) (best fed sim=0.556 → Bathurst Golf Club), OSM high 30m
- Macquarie Links International Golf Club (2 courses) (best fed sim=1 → Macquarie Links International Golf Club), OSM low 24m
- Maitland Golf Club (2 courses) (best fed sim=0.727 → Maitland Golf Club (SA)), OSM low 118m
- Mandeni Family Fun Park and Golf Center (2 courses) (best fed sim=0.16 → Pambula-Merimbula Golf Club), OSM no-match 3147585m
- Mango Hill Golf Club (1 courses) (best fed sim=0.5 → Box Hill Golf Club), OSM no-match 3558385m
- Manildra Golf Club (1 courses) (best fed sim=0.455 → Manilla NSW Golf Club), OSM high 229m
- Mansfield Golf Club (1 courses) (best fed sim=1 → Mansfield Golf Club), OSM low 193m
- Marble Bar Golf Club (1 courses) (best fed sim=0.6 → Mareeba Golf Club), OSM no-match 2733925m
- Marino Golf Club (1 courses) (best fed sim=0.833 → Merino Golf Club), OSM low 92m
- Maroochy River Golf Club (1 courses) (best fed sim=1 → Maroochy River Golf Club), OSM high 83m
- Marrabel Golf Club (1 courses) (best fed sim=0.625 → Murrabit Golf Club), OSM no-match 1176536m
- Marsden Park Golf Academy (1 courses) (best fed sim=0.478 → Ballarat Junior Golf Academy), OSM no-match 700312m
- Martinsfield Golf Club (1 courses) (best fed sim=0.75 → Mansfield Golf Club), OSM low 115m
- Meekatharra Golf Club (1 courses) (best fed sim=0.545 → Mathoura Golf Club), OSM no-match 2696176m
- Melaleuca Golf Course (1 courses) (best fed sim=0.333 → Tallebudgera Golf Course), OSM high 9m
- Melaleuca Links (1 courses) (best fed sim=0.444 → Benalla Golf Club), OSM low 1977934m
- Mendooran Golf Club (1 courses) (best fed sim=0.667 → Bundoora Park Public Golf Course), OSM no-match 752627m
- Menindee Golf Club (1 courses) (best fed sim=0.111 → Wilcannia Golf Club), OSM high 86m
- Merriwagga Golf Club (1 courses) (best fed sim=0.7 → Merriwa Golf Club), OSM high 232m
- Miles Golf Club (1 courses) (best fed sim=1 → Miles Golf Club), OSM low 6m
- Mitchell Golf Club (1 courses) (best fed sim=1 → Mitchell Golf Club), OSM low 0m
- Mitta Mitta Golf Club (1 courses) (best fed sim=1 → Mitta Mitta Golf Club), OSM low 39402m
- Mona Vale Golf Club (2 courses) (best fed sim=0.778 → Moss Vale Golf Club), OSM low 20m
- Moodiarrup Golf Club (1 courses) (best fed sim=1 → Moodiarrup Golf Club), OSM no-match 238384m
- Moor Park Golf Club (1 courses) (best fed sim=1 → Moor Park Golf Club), OSM low 304m
- Moora Lake View Golf Club (1 courses) (best fed sim=1 → Moora Lake View Golf Club), OSM low 26m
- Moorabbin Golf Club (1 courses) (best fed sim=0.556 → Mooralla Golf Club), OSM low 37m
- Morisset Golf Club (1 courses) (best fed sim=0.625 → Dorset Golf Club), OSM no-match 765324m
- Moulamein Golf Club (1 courses) (best fed sim=0.444 → Southern Golf Club), OSM no-match 291346m
- Mount Barker District Golf Club (2 courses) (best fed sim=0.571 → Mount Barker Golf Club), OSM low 115m
- Mount Barker Golf Club (1 courses) (best fed sim=1 → Mount Barker Golf Club), OSM low 347m
- Mount Panorama Public Golf Course (1 courses) (best fed sim=0.214 → Logan Village Golf Course), OSM no-match 1416115m
- Mount Pleasant Golf Club (1 courses) (best fed sim=0.571 → Mount Isa Golf Club), OSM no-match 530904m
- Mullewa Golf Club (1 courses) (best fed sim=0.25 → Mingenew Golf Club), OSM low 19m
- Muntadgin Golf Club (1 courses) (best fed sim=0.556 → Nungarin Golf Club), OSM high 0m
- Murraville Golf Club (1 courses) (best fed sim=0.909 → Murrayville Golf Club), OSM high 53m
- Murrumbidgee (1 courses) (best fed sim=1 → Murrumbidgee Country Club), OSM low 5995m
- Nandaly Golf Club (1 courses) (best fed sim=0.75 → Mandalay Golf Club), OSM high 11m
- Nannup Pineridge Golf Club (1 courses) (best fed sim=0.375 → Nannup Golf Club), OSM high 49m
- Narembeen Golf Club (1 courses) (best fed sim=1 → Narembeen Golf Club), OSM low 8296m
- Narpanup Golf Club (1 courses) (best fed sim=0.375 → Albany Golf Club), OSM medium 347m
- Narrogin Golf Club (1 courses) (best fed sim=1 → Narrogin Golf Club), OSM low 5052m
- Natimuk Golf Club (1 courses) (best fed sim=1 → Natimuk Golf Club), OSM high 48m
- New Brighton Golf Club (1 courses) (best fed sim=0.667 → Brighton Golf Club), OSM low 9m
- New Norcia Golf Club (1 courses) (best fed sim=0.636 → New Norfolk Golf Club), OSM no-match 3017914m
- New South Wales Golf Club (2 courses) (best fed sim=1 → New South Wales Golf Club), OSM low 51m
- Nhill Golf Club (1 courses) (best fed sim=1 → Nhill Golf Club), OSM low 48m
- Nimmitabel Golf Club (1 courses) (best fed sim=0.4 → Heritage Golf and Country Club), OSM no-match 701994m
- Nine Hats Golf Course - Square Golf (1 courses) (best fed sim=0.188 → Echuca Back 9 Golf Course), OSM low 16m
- Noosa Valley Golf Club (1 courses) (best fed sim=0.583 → Snake Valley Golf Club), OSM high 26m
- Normanton Golf Club (1 courses) (best fed sim=0.667 → Normanby Park Golf Club), OSM medium 289m
- North Lakes golf club (1 courses) (best fed sim=0.818 → South Lakes Golf Club), OSM low 24m
- North Lakes Resort Golf Club (2 courses) (best fed sim=0.818 → South Lakes Golf Club), OSM low 1594185m
- North Pine Golf Club (1 courses) (best fed sim=1 → North Pine Golf Club), OSM low 43m
- Northcliffe Golf Club (1 courses) (best fed sim=1 → Northcliffe Golf Club), OSM no-match 81871m
- Novotel Palm Cove Country Club (1 courses) (best fed sim=0.471 → Coral Cove Golf Club ), OSM low 643m
- Nudgee College Golf Club (1 courses) (best fed sim=0.429 → Nudgee Golf Club), OSM low 618m
- Nullabor Golf Links (1 courses) (best fed sim=0.5 → Wallaroo Golf Club), OSM low 22m
- Nungarin Golf Club (1 courses) (best fed sim=1 → Nungarin Golf Club), OSM no-match 188173m
- Oak Forest Golf Club (1 courses) (best fed sim=0.6 → Forest Resort Golf Course), OSM low 95m
- Oatlands Golf Club (2 courses) (best fed sim=0.875 → Oaklands Golf Club), OSM medium 436m
- Opal Cove Resort Golf Course (1 courses) (best fed sim=0.563 → The Opal Cove Golf Centre), OSM low 600394m
- Orange Ex-Services Country Golf Club (1 courses) (best fed sim=0.556 → Gundagai Services Golf Club), OSM low 563m
- Orara Park Golf Course (1 courses) (best fed sim=0.25 → Armidale Golf Club), OSM high 111m
- Pacific Harbour Golf Club (2 courses) (best fed sim=1 → Pacific Harbour Golf and Country Club), OSM low 8m
- Padthaway Golf Club (1 courses) (best fed sim=1 → Padthaway Golf Club), OSM low 39m
- Pakenham Golf Course (1 courses) (best fed sim=0.556 → Tottenham Golf Club), OSM high 47m
- Paraburdoo Golf Club (1 courses) (best fed sim=0.6 → Warburton Golf + Sporting Club), OSM high 0m
- Pasminco Hobart Golf Club (1 courses) (best fed sim=0.467 → Royal Hobart Golf Club), OSM low 1m
- Peak Hill Golf Club (1 courses) (best fed sim=0.583 → Pyramid Hill Golf Club), OSM medium 340m
- Penfield Golf Club (2 courses) (best fed sim=0.75 → Heyfield Golf Club), OSM high 115m
- Pentland Golf Club (1 courses) (best fed sim=0.545 → X-Golf Northland), OSM no-match 1049m
- Pickering Brook Sports Club (1 courses) (best fed sim=1 → Pickering Brook Sports Club), OSM no-match 7012m
- Pimpinio Golf Club (1 courses) (best fed sim=0.5 → Virginia Golf Club), OSM high 45m
- Pine Grove Country Club - Square Golf (1 courses) (best fed sim=0.353 → Pingrup Golf Course), OSM no-match 644306m
- Pineridge Golf Club (1 courses) (best fed sim=0.667 → Spring Ridge Country Club), OSM low 49m
- Pingaring Golf Club (1 courses) (best fed sim=1 → Pingaring Golf Club), OSM no-match 247279m
- Pithara Golf Club (1 courses) (best fed sim=1 → Pithara Golf Club), OSM low 107m
- Pokolbin Golf Course & Country Resort (1 courses) (best fed sim=0.5 → Kulin Golf Club), OSM low 339m
- Poochera Golf Club (1 courses) (best fed sim=0.5 → Northern Golf Club), OSM no-match 1159083m
- Port headland (1 courses) (best fed sim=0.923 → Port Hedland Golf Club), OSM low 6325m
- Port Lincoln Golf Club (1 courses) (best fed sim=1 → Port Lincoln Golf Club), OSM low 5654m
- portmcquarrie golf club (1 courses) (best fed sim=0.786 → Port Macquarie Golf Club), OSM low 51m
- Pottsville Golf Club (1 courses) (best fed sim=0.7 → Townsville Golf Club), OSM low 2316m
- Price Golf CLub (1 courses) (best fed sim=0.5 → Spring Park Golf Course), OSM high 53m
- Prospect Vale Golf Club (2 courses) (best fed sim=1 → Prospect Vale Golf Club), OSM low 361m
- Proston District Golf Club 18 Hole (1 courses) (best fed sim=0.667 → Proston District Golf Club), OSM no-match 3476041m
- Puckapunyal Military Area Golf Club (1 courses) (best fed sim=0.44 → Royal Military College Golf Club), OSM no-match 421362m
- Punk Kids Playground - Square Golf (1 courses) (best fed sim=0.148 → Clare Golf Club), OSM low 151m
- Pyalong Golf Club (1 courses) (best fed sim=0.444 → Royal Park LGC Golf Club), OSM high 59m
- Quambatook Golf Club (1 courses) (best fed sim=0.2 → Boort Golf Club), OSM high 0m
- Quamby Golf & Country Club (1 courses) (best fed sim=0.75 → Quamby Estate Golf and Country C), OSM low 361m
- Queanbeyan ACT Golfers Special Index (1 courses) (best fed sim=0.278 → Queanbeyan Golf Club), OSM no-match 1624m
- RAAF Amberley Golf Club (1 courses) (best fed sim=0.462 → RAAF Tindal Golf Club), OSM no-match 1338148m
- RAAF East Sale Golf Club (1 courses) (best fed sim=0.455 → Maitland Golf Club Easts Leisure + Golf), OSM no-match 152737m
- Raaf Tindal Golf Club (1 courses) (best fed sim=1 → RAAF Tindal Golf Club), OSM low 135m
- Rankins Springs Golf Club (1 courses) (best fed sim=0.667 → Alice Springs Golf Club), OSM low 43m
- Ratho Farm Highlands Resort (1 courses) (best fed sim=0.35 → Sanctuary Lakes Golf Club), OSM no-match 929887m
- Ravenshoe Millstream Country Golf Club (1 courses) (best fed sim=1 → Ravenshoe Millstream Country Club), OSM medium 325m
- Raywood Golf Club (1 courses) (best fed sim=1 → Raywood Golf Club), OSM low 61m
- Renmark Golf Club (2 courses) (best fed sim=0.857 → Denmark Country Club), OSM high 28m
- Richmond Valley Golf Course (2 courses) (best fed sim=0.667 → Richmond Golf Club (QLD)), OSM high 149m
- Riverlands (1 courses) (best fed sim=0.8 → Riverlakes Golf Club), OSM low 10m
- Riverside Golf Club (2 courses) (best fed sim=0.7 → Riversdale Golf Club), OSM low 192m
- Rochester Golf Club (1 courses) (best fed sim=1 → Rochester Golf Club), OSM high 89m
- Roebourne Golf Club (1 courses) (best fed sim=0.3 → North Ryde Golf Club), OSM no-match 2662794m
- Rosebery Golf Club (1 courses) (best fed sim=1 → Rosebery Golf Club), OSM low 51m
- Rosedale Golf Club (1 courses) (best fed sim=0.875 → Rossdale Golf Club), OSM medium 270m
- Rosehill Public Golf Course (2 courses) (best fed sim=1 → Rosehill Public Golf Course), OSM low 96m
- Rosny Park Public Golf Course (1 courses) (best fed sim=0.833 → Rosnay Golf Club), OSM no-match 651767m
- Rouse Hill Public Golf Course (1 courses) (best fed sim=0.7 → Home Hill Golf Club), OSM no-match 697181m
- Royal Australian Engineers Golf Club (3 courses) (best fed sim=0.423 → Golf Australia - VIC), OSM low 161m
- Rum Corps Barracks Golf Course (2 courses) (best fed sim=0.111 → Windsor Golf Club), OSM no-match 1479m
- Rushworth Golf Club (1 courses) (best fed sim=1 → Rushworth Golf Club), OSM no-match 145830m
- Saddleworth Golf Club (1 courses) (best fed sim=1 → Saddleworth Golf Club), OSM no-match 16710438m
- Safety Beach Country Club (2 courses) (best fed sim=1 → Safety Beach Golf Club), OSM low 526m
- Salisbury Country Golf Links (1 courses) (best fed sim=0.643 → The Gums Golf Club Salisbury), OSM no-match 766512m
- Salisbury Green par 3 (1 courses) (best fed sim=0.143 → North Adelaide Golf Course), OSM no-match 7072m
- Samford Valley Country Golf Club (1 courses) (best fed sim=0.571 → Hunter Valley Golf and Country Club), OSM high 47m
- Sandstone Golf Club (2 courses) (best fed sim=1 → Sandstone Golf Club), OSM no-match 1911151m
- Sapphire Golf Club - Square Golf (1 courses) (best fed sim=0.4 → Golf Square), OSM low 151m
- Shortees Golf (1 courses) (best fed sim=0.111 → Terrey Hills Par 3), OSM high 46m
- Sleepy Hollow Country Club (1 courses) (best fed sim=0.308 → Safety Beach Golf Club), OSM no-match 1356600m
- South Arm RSL Golf Club (1 courses) (best fed sim=0.538 → South Pines Golf Club), OSM low 239m
- Stirling Golf Club (1 courses) (best fed sim=0.727 → Stirling Golf Club (WA)), OSM high 5m
- Stirling North Golf Club (3 courses) (best fed sim=1 → Stirling North Golf Club), OSM low 5m
- Stonelea Country Estate (1 courses) (best fed sim=0.182 → Sandy Creek Golf Club), OSM no-match 391130m
- Strathalbyn Golf Club (2 courses) (best fed sim=1 → Strathalbyn Golf Club), OSM low 355m
- Studley Park Golf Course (1 courses) (best fed sim=0.714 → Stanley Golf Club), OSM high 153m
- Sunnyridge Golf Club (1 courses) (best fed sim=0.455 → Northbridge Golf Club), OSM high 0m
- Surat Golf Club (1 courses) (best fed sim=1 → Surat Golf Club), OSM low 114178m
- Swan Hill Golf Club (1 courses) (best fed sim=0.556 → Box Hill Golf Club), OSM low 525m
- Tallygaroopna Golf Club (1 courses) (best fed sim=0.385 → Tally Valley Golf Club), OSM no-match 411352m
- Tamar Valley Resort Grindelwald (1 courses) (best fed sim=0.458 → Kyabram Valley View Golf Club), OSM low 266m
- Tambo Valley Golf Club (1 courses) (best fed sim=1 → Tambo Valley Golf Club), OSM low 7m
- Tamborine Mountain Golf Club (3 courses) (best fed sim=1 → Tamborine Mountain Golf Club), OSM no-match 547889m
- Tanawha Valley Par 3 (1 courses) (best fed sim=0.45 → Tambo Valley Golf Club), OSM no-match 1585975m
- Tarranwingee Golf Club (1 courses) (best fed sim=0.917 → Tarrawingee Golf Club), OSM low 26m
- Tarwin Golf Course (1 courses) (best fed sim=0.833 → Darwin Golf Club), OSM low 3286186m
- Tasman Golf Club (1 courses) (best fed sim=1 → Tasman Golf Club), OSM low 11534m
- Telfer Golf Club (1 courses) (best fed sim=0.5 → Belair Park Golf Club), OSM no-match 2705490m
- Tennant Creek Golf Club (1 courses) (best fed sim=1 → Tennant Creek Golf Club), OSM no-match 2288562m
- Terranora Lakes Golf Club (1 courses) (best fed sim=0.6 → Fraser Lakes Golf Club), OSM no-match 333777m
- Thargomindah Golf Club (1 courses) (best fed sim=0.333 → Rosanna Golf Club), OSM low 22m
- The Amstel Park Public Course (1 courses) (best fed sim=0.222 → Ranfurlie Golf Club), OSM no-match 1590m
- The Hills Golf Park (1 courses) (best fed sim=0.556 → Fox Hills Golf Club), OSM no-match 634862m
- The Oaks Golf & Country Club (1 courses) (best fed sim=0.6 → The Lakes Golf Club), OSM low 339m
- The Palms Golf Club (1 courses) (best fed sim=0.417 → The Palms Golf Studio), OSM low 560635m
- The Rock Golf Club (1 courses) (best fed sim=1 → The Rock Golf Club), OSM low 51m
- The Villa Golf Course (1 courses) (best fed sim=0.667 → Kialla Golf Club), OSM low 107m
- The Willows Golf Resort (1 courses) (best fed sim=0.625 → Williams Golf Club), OSM low 2027m
- Tibooburra Golf Club (1 courses) (best fed sim=0.5 → Burra Golf Club), OSM no-match 1004168m
- Tieri Golf Club (1 courses) (best fed sim=1 → Tieri Golf Club), OSM no-match 1631608m
- Tintinara Golf Club (1 courses) (best fed sim=1 → Tintinara Golf Club), OSM medium 467m
- Tonebridge Country Club (1 courses) (best fed sim=0.636 → Northbridge Golf Club), OSM high 34m
- Toolleen Golf Club (1 courses) (best fed sim=0.5 → Collier Park Public Golf Course), OSM no-match 796009m
- Toompine Golf Club (1 courses) (best fed sim=0.375 → Quilpie Golf Club), OSM low 51m
- Tooraweenah Golf Club (1 courses) (best fed sim=0.545 → Tarraleah Golf Club), OSM high 68m
- Torrens Creek Golf Club (1 courses) (best fed sim=0.692 → Werris Creek Golf Club), OSM low 39m
- Trayning Golf Club (1 courses) (best fed sim=0.556 → Katanning Country Club), OSM high 10m
- Tullamore Golf Club (1 courses) (best fed sim=0.556 → Elmore Golf Club), OSM no-match 507423m
- Twin Towns Services Golf Club (1 courses) (best fed sim=0.263 → Barwon Heads Golf Club), OSM no-match 1387846m
- Two Wells Golf Club (1 courses) (best fed sim=1 → Two Wells Golf Club), OSM no-match 177937m
- Underbool Golf Club (1 courses) (best fed sim=0.348 → Big Swing Golf Underwood (QLD)), OSM high 173m
- Ungarie Golf & Recreation Club (1 courses) (best fed sim=0.75 → Nungarin Golf Club), OSM no-match 2875677m
- Varley Country Golf Club (1 courses) (best fed sim=1 → Varley Country Golf Club), OSM low 157m
- Violet Town Golf Club (1 courses) (best fed sim=0.4 → George Town Golf Club - TAS), OSM low 12m
- Vivonne Bay Golf Club (1 courses) (best fed sim=0.545 → Byron Bay Golf Club), OSM no-match 1739088m
- Walla Walla Golf Club (1 courses) (best fed sim=1 → Walla Walla Golf Club), OSM low 638m
- Walpeup Golf Club (1 courses) (best fed sim=1 → Walpeup Golf Club), OSM low 29321m
- Wandering Golf Club (1 courses) (best fed sim=1 → Wandering Golf Club), OSM no-match 108095m
- Wandoan Golf Club (1 courses) (best fed sim=0.625 → Jandowae Golf Club), OSM no-match 129593m
- Wardell Social Golf Club (1 courses) (best fed sim=0.444 → Putters Social Golf Club Inc), OSM no-match 1491764m
- Warwick Golf Club (1 courses) (best fed sim=1 → Warwick Golf Club), OSM low 628m
- Waterford Valley (1 courses) (best fed sim=0.706 → Calderwood Valley Golf Course), OSM medium 434m
- Waverley Golf Club (1 courses) (best fed sim=0.615 → Glen Waverley Golf Club), OSM low 340m
- Wentworth Golf Club (1 courses) (best fed sim=0.6 → Wentworth Falls Country Club), OSM low 51m
- Wentworth Services Golf Club (1 courses) (best fed sim=0.611 → Wentworth Falls Country Club), OSM low 51m
- Westside Golf Club (1 courses) (best fed sim=0.556 → Creekside Golf Club), OSM low 72m
- Whitfield & District Golf Club (1 courses) (best fed sim=0.45 → Serpentine & Districts Golf Club), OSM no-match 1186221m
- Wialki Golf Club (1 courses) (best fed sim=0.375 → Sea Lake Golf Club), OSM low 208m
- Wilcannia Golf Club (1 courses) (best fed sim=1 → Wilcannia Golf Club), OSM low 86m
- Williams Golf Club (1 courses) (best fed sim=1 → Williams Golf Club), OSM low 164m
- Windorah Golf Club (1 courses) (best fed sim=0.667 → Chinderah Golf Course), OSM no-match 1125961m
- Wirrina Cove Golf & Country Club (2 courses) (best fed sim=1 → Wirrina Cove Golf and Country Club), OSM no-match 17874m
- Wisemans Ferry Golf Club (1 courses) (best fed sim=0.429 → Truemans Road Golf Range), OSM low 310m
- Wondai Golf and Bowling Club (1 courses) (best fed sim=0.429 → Wondai Golf Club), OSM low 0m
- Woodanilling Golf Club (1 courses) (best fed sim=0.667 → Goomalling Golf Club), OSM high 36m
- Woodlands Lakeside Junior Golf Club (1 courses) (best fed sim=0.28 → Coolangatta and Tweed Heads Golf Club), OSM no-match 1663326m
- Woomelang Golf Club (1 courses) (best fed sim=0.778 → Boomerang Public Golf Course), OSM high 10m
- Woomera Golf Club (1 courses) (best fed sim=0.714 → Goomeri Golf Club), OSM low 1586734m
- Wubin Sports Club (1 courses) (best fed sim=0.667 → Eden Sports and Recreation Club), OSM low 19m
- Wundowie Golf Club (1 courses) (best fed sim=1 → Wundowie Golf Club), OSM high 52m
- Wyndham Golf Club (1 courses) (best fed sim=0.714 → Wingham Golf Club), OSM no-match 3711000m
- Yalgoo Golf Club (1 courses) (best fed sim=0.5 → Kalgoorlie Golf Course), OSM low 931m
- Yarra Valley Golf Club (1 courses) (best fed sim=0.714 → Barossa Valley Golf Club), OSM high 52m
- Yelbeni Golf Club (1 courses) (best fed sim=0.174 → Macquarie Links International Golf Club), OSM high 56m
- Yerecoin Golf Club (1 courses) (best fed sim=1 → Yerecoin Golf Club), OSM no-match 3066010m
- York Golf Club (1 courses) (best fed sim=0.118 → Southern Cross Golf Club (WA)), OSM low 249m
- Yorkeys Knob (1 courses) (best fed sim=0.5 → Iron Knob Golf Club), OSM low 568m
- Yuna Golf Club (1 courses) (best fed sim=0.5 → Yea Golf Club), OSM no-match 2820016m
- Zilzie Bay Resort (1 courses) (best fed sim=1 → Zilzie Bay Golf Club), OSM low 192m