# Austria match report
Generated: 2026-05-04T17:49:55

3-source: OEGV (forbund) + OSM + LC. Federation-first per-felt-confidence.
Trust hierarki: OEGV > LC > OSM > DB (Golfapi).
Scope: website (OEGV→OSM), email (OEGV), holes (OEGV→LC), address (OEGV→LC→OSM). Phone droppet.

## Summary

| Bucket | Clubs | Courses |
|---|---:|---:|
| High conf | 156 | 223 |
| Medium conf | 12 | 16 |
| Low conf | 13 | 16 |
| No match | 0 | 0 |
| Orphans (no OEGV match) | 37 | 43 |

## Field-fill projection (excl. orphans)

| Field | Clubs | Courses |
|---|---:|---:|
| website | 10 | 15 |
| email | 11 | 19 |
| holes | 0 | 0 |
| address | 15 | 16 |

## High confidence (recommended to apply)

### AtterseeGolfClub Weyregg (Austria, 2 courses)

- DB: lat=47.8956878, lon=13.5774601, addr="Wachtbergstraße 30, Weyregg", web="http://www.gcweyregg.at", email="office@gcweyregg.at", holes=[18]
- OEGV (high, sim=0.667, boost=+0.8[city:weyregg,jaccard:1.00], Oberösterreich 4852): name="Attersee GolfClub Weyregg", web="http://www.gcweyregg.at", email="office@gcweyregg.at", holes=9, addr="Wachtbergstrasse 30\nA-4852 Weyregg am Attersee"
- OSM (low, 126m, sim=0.667): name="Attersee Golf Club Weyregg", web="https://www.gcweyregg.at/", addr="Wachtbergstraße, 30, 4852, Weyregg am Attersee"
- LC  (low, 817m, sim=0.667): name="Attersee Golfclub Weyregg", addr="Wachtbergstrasse 30, A-4852 Weyregg am Attersee", courses=AtterseeGolfClub Weyregg(9)

### Bad Gleichenberg (Austria, 1 courses)

- DB: lat=46.8744727, lon=15.9049632, addr="Am Hoffeld 3, Bad Gleichenbeg", web="http://www.golf-Gleichenberg.at", email="office@gc-badgleichenberg.at", holes=[18]
- OEGV (high, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], Steiermark 8344): name="Bad Gleichenberg", web="http://www.golf-Gleichenberg.at", email="office@gc-badgleichenberg.at", holes=9, addr="Hoffeldweg 3\nA-8344 Bad Gleichenberg"
- OSM (low, 3168m, sim=1): name="Golfclub Bad Gleichenberg", web=null, addr=null
- LC  (low, 3661m, sim=1): name="Golf Club Bad Gleichenberg", addr="Hoffeldweg 3, A-8344 Bad Gleichenberg", courses=Bad Gleichenberg(9)

### Bad Kleinkirchheim (Austria, 1 courses)

- DB: lat=46.8144214, lon=13.7983599, addr="Bad Kleinkirchheim", web="http://www.nockgolf.at", email="golf@badkleinkirchheim.at", holes=[18]
- OEGV (high, sim=0.621, boost=+0.5[db-name-substring,jaccard:0.50], Kärnten 9564): name="Golfclub Bad Kleinkirchheim - Kaiserburg", web="http://www.nockgolf.at", email="golf@badkleinkirchheim.at", holes=18, addr="Plass 19\nA-9564 Patergassen"
- OSM (no-match, 3366m, sim=0.621): name="Golf Club Bad Kleinkirchheim - Kaiserburg", web="https://www.badkleinkirchheim.at/de/golf/", addr="Plaß, 19, 9564, Patergassen"
- LC  (low, 3501m, sim=1): name="Golfanlage Bad Kleinkirchheim", addr="Dorfstraße 74, A-9546 Bad Kleinkirchheim", courses=Kaiserburg(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - address: from oegv(high, sim=0.621)
```sql
UPDATE courses SET
  address = 'Plass 19\nA-9564 Patergassen'
WHERE id IN (
  '75de582e-d749-410b-82da-9fe735f425ad'
);
```

### Bad Tatzmannsdorf (Austria, 2 courses)

- DB: lat=47.3222169, lon=16.2388457, addr="Am Golfplatz 2, Bad Tatzmannsdorf", web="http://reitersgolfresort.at", email="sport@reitershotels.at", holes=[18]
- OEGV (high, sim=0.68, boost=+0.7[city:tatzmannsdorf,db-name-substring], Burgenland 7431): name="REITERS GOLF & COUNTRY CLUB Bad Tatzmannsdorf", web="http://reitersgolfresort.at", email="sport@reitershotels.at", holes=27, addr="Am Golfplatz 2\nA-7431 Bad Tatzmannsdorf"
- OSM (low, 523m, sim=0.654): name="Reiter's Golf- & Country Club Bad Tatzmannsdorf.", web="http://reitersgolfresort.at/", addr="Am Golfplatz, 2, 7431, Bad Tatzmannsdorf"
- LC  (low, 165m, sim=0.654): name="Reiter’s Golf & Country Club (Bad Tatzmannsdorf)", addr="Am Golfplatz 2, A-7431 Bad Tatzmannsdorf", courses=Reiter&#x27;s G & CC Bad Tatzmannsdorf Lichtenwald-Platz(9)

### Bad Waltersdorf - A620 (Austria, 1 courses)

- DB: lat=47.168506, lon=16.0088882, addr="Bad Waltersdorf", web="http://www.golf-badwaltersdorf.at", email="office@golf-badwaltersdorf.at", holes=[18]
- OEGV (high, sim=0.75, boost=+0.6[city:waltersdorf,jaccard:0.50], Steiermark 8271): name="Golfclub Bad Waltersdorf", web="http://www.golf-badwaltersdorf.at", email="office@golf-badwaltersdorf.at", holes=18, addr="Bad Waltersdorf 348\nA-8271 Bad Waltersdorf"
- OSM (low, 1610m, sim=0.75): name="Golfclub Bad Waltersdorf", web="https://www.golf-badwaltersdorf.at/", addr=null
- LC  (low, 1105m, sim=0.75): name="Golfclub Bad Waltersdorf", addr="348, A-8271 Bad Waltersdorf", courses=9.1(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - address: from oegv(high, sim=0.75)
```sql
UPDATE courses SET
  address = 'Bad Waltersdorf 348\nA-8271 Bad Waltersdorf'
WHERE id IN (
  '7ecdd68b-1382-4a27-8dba-e428225b9e61'
);
```

### Bludenz-Braz - A803 (Austria, 3 courses)

- DB: lat=47.1517925, lon=9.8840351, addr="Oberradin 60, Bludenz", web="http://www.gc-bludenz-braz.at", email="gcbraz@golf.at", holes=[18]
- OEGV (high, sim=0.706, boost=+0.67[city:bludenz,jaccard:0.67], Vorarlberg 6751): name="GC Bludenz-Braz", web="http://www.gc-bludenz-braz.at", email="gcbraz@golf.at", holes=18, addr="Oberradin 60\nA-6751 Braz bei Bludenz"
- OSM (high, 78m, sim=0.706): name="Golfclub Bludenz-Braz", web="https://gc-bludenz-braz.at/", addr="Oberradin, 60, 6751, Radin"
- LC  (low, 440m, sim=0.706): name="GC Bludenz-Braz", addr="Oberradin 60, A-6751 Braz bei Bludenz", courses=7.9(18)

### City & Country Club Wienerberg (Austria, 1 courses)

- DB: lat=48.163287, lon=16.3426997, addr="Gutheil-Schoder-Gasse 7, Wien", web="http://www.cityandcountry.at", email="u.baumgartner@cityandcountry.at", holes=[9]
- OEGV (high, sim=0.706, boost=+0.4[city:wien], Wien 1100): name="C&C Golfclub am Wienerberg", web="http://www.cityandcountry.at", email="u.baumgartner@cityandcountry.at", holes=9, addr="Gutheil Schodergasse 7\nA-1100 Wien"
- OSM (high, 17m, sim=0.833): name="City & Country Golf Club am Wienerberg", web="https://www.cityandcountry.at/wienerberg", addr="Gutheil-Schoder-Gasse, 7, 1100, Wien"
- LC  (high, 223m, sim=0.706): name="C&C Golfclub am Wienerberg", addr="Gutheil Schodergasse 9, A-1100 Wien", courses=C&C Golfclub am Wienerberg(9)

### City & Country Golfclub Richardhof (Austria, 2 courses)

- DB: lat=48.0553904, lon=16.2738124, addr="Am Richardhof 248, Gumpoldskirchen", web="http://www.gcgutrichardhof.at", email="office@gcgutrichardhof.at", holes=[9,18]
- OEGV (high, sim=0.8, boost=+0.4[city:gumpoldskirchen], Niederösterreich 2352): name="Golfclub Gut Richardhof", web="http://www.gcgutrichardhof.at", email="office@gcgutrichardhof.at", holes=9, addr="Am Richardhof 248\nA-2352 Gumpoldskirchen"
- OSM (high, 47m, sim=0.8): name="Golfclub Gut Richardhof", web="https://gcgutrichardhof.at/", addr="Richardhof, 248, 2352, Gumpoldskirchen"
- LC  (high, 40m, sim=1): name="City & Country Golfclub Richardhof", addr="Richardhof 248, A-2352 Gumpoldskirchen", courses=City & Country Golfclub Richardhof(9)

### Citygolf Vienna (Austria, 1 courses)

- DB: lat=48.2858646, lon=16.4964012, addr="Weingartenallee 3, Wien", web="http://www.golfpark-vienna.at", email="golf@golfpark-vienna.at", holes=[9]
- OEGV (high, sim=1, boost=+1.1[city:wien,db-name-substring,jaccard:1.00], Wien 1220): name="Golfclub Citygolf Vienna", web="http://www.golfpark-vienna.at", email="golf@golfpark-vienna.at", holes=9, addr="Weingartenallee 3\nA-1220 Wien"
- OSM (high, 64m, sim=1): name="Citygolf Vienna", web="http://www.citygolfvienna.at/", addr="Weingartenallee, 3, 1220, Wien"
- LC  (low, 403m, sim=0.125): name="Golf Club Wien-Süßenbrunn", addr="Weingartenallee 22, A-1220 Wien", courses=8.5(18)

### Colony Golf Gutenhof (Austria, 2 courses)

- DB: lat=-28.0602792, lon=153.3890179, addr="Gutenhof 20, Himberg bei Wien", web="http://www.colonygolf.com", email="club@colonygolf.com", holes=[18]
- OEGV (high, sim=1, boost=+0.67[city:himberg,jaccard:0.67], Niederösterreich 2325): name="Colony Club Gutenhof", web="http://www.colonygolf.com", email="club@colonygolf.com", holes=36, addr="Gutenhof 20/Golfplatz\nA-2325 Himberg"
- OSM (low, 15716528m, sim=1): name="Colony Club Gutenhof", web="https://www.colonygolf.com/", addr="20, 2325, Himberg"
- LC  (low, 15716255m, sim=1): name="Colony Club Gutenhof", addr="Gutenhof, A-2325 Himberg", courses=Westkurs(18)

### Diamond Club Ottenstein (Austria, 1 courses)

- DB: lat=48.5387103, lon=15.3571636, addr="Niedergrünbach 60, Rastenfeld", web="http://www.golfclub-ottenstein.at", email="info@golfclub-ottenstein.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:rastenfeld,db-name-substring,jaccard:1.00], Niederösterreich 3532): name="DIAMOND CLUB OTTENSTEIN", web="http://www.golfclub-ottenstein.at", email="info@golfclub-ottenstein.at", holes=18, addr="Niedergrünbach 60\nA-3532 Rastenfeld"
- OSM (low, 45m, sim=0.556): name="Golfclub Ottenstein", web="https://www.golfclub-ottenstein.at/", addr="60, 3532, Rastenfeld"
- LC  (medium, 400m, sim=1): name="Diamond Club Ottenstein", addr="Niedergrünbach 60, A-3532 Rastenfeld", courses=Golfclub Ottenstein(18)

### Diamond Country Club (Austria, 3 courses)

- DB: lat=48.3152321, lon=15.911922, addr="Am Golfplatz 1, Atzenbrugg", web="http://www.countryclub.at", email="office@countryclub.at", holes=[18,9]
- OEGV (high, sim=1, boost=+1.1[city:atzenbrugg,db-name-substring,jaccard:1.00], Niederösterreich 3452): name="DIAMOND COUNTRY CLUB", web="http://www.countryclub.at", email="office@countryclub.at", holes=36, addr="Am Golfplatz 1\nA-3452 Atzenbrugg"
- OSM (high, 11m, sim=1): name="Diamond Country Club", web="https://www.countryclub.at/", addr="Am Golfplatz, 1, 3452, Atzenbrugg"
- LC  (low, 663m, sim=1): name="Diamond Country Club", addr="Am Golfplatz 1, 3452 Atzenbrugg", courses=Diamond Championship Course(18)

### Dolomitengolf Osttirol - A709 (Austria, 11 courses)

- DB: lat=46.807003, lon=12.8336635, addr="Am Golfplatz 1, Lavant", web="http://www.dolomitengolf.at", email="info@dolomitengolf.at", holes=[9,18]
- OEGV (high, sim=0.815, boost=+0.67[city:lavant,jaccard:0.67], Tirol 9906): name="GC Dolomitengolf Osttirol", web="http://www.dolomitengolf.at", email="info@dolomitengolf.at", holes=36, addr="Am Golfplatz 3\nA-9906 Lavant"
- OSM (low, 84m, sim=0.481): name="Golfclub Dolomitengolf", web="https://www.dolomitengolf.at/", addr="Am Golfplatz, 1, 9900, Lavant"
- LC  (low, 594m, sim=0.815): name="Golfclub Dolomitengolf Osttirol", addr="Am Golfplatz, A-9906 Lavant", courses=TIROLER VERSICHERUNG Course - Silber(9)

### Drautal Berg (Austria, 1 courses)

- DB: lat=46.7369397, lon=13.1291534, addr="Berg 221, Berg im Drautal", web="http://www.drautalgolf.at", email="office@drautalgolf.at", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:berg,jaccard:1.00], Kärnten 9771): name="Golfclub Drautal/Berg", web="http://www.drautalgolf.at", email="office@drautalgolf.at", holes=9, addr="Berg 221\nA-9771 Berg im Drautal"
- OSM (high, 11m, sim=1): name="GC Drautal Berg", web="https://www.drautalgolf.at/", addr="Berg, 221, 9771, Berg im Drautal"
- LC  (high, 186m, sim=1): name="Golfclub Drautal/Berg", addr="Berg 221, A-9771 Berg im Drautal", courses=8.1(9)

### Drautal Golf Berg (Austria, 1 courses)

- DB: lat=47.5291871, lon=15.5160864, addr="Am Golfplatz 1, Berg im Drautal", web="http://www.drautalgolf.at", email="office@drautalgolf.at", holes=[18]
- OEGV (high, sim=1, boost=+0.67[city:berg,jaccard:0.67], Kärnten 9771): name="Golfclub Drautal/Berg", web="http://www.drautalgolf.at", email="office@drautalgolf.at", holes=9, addr="Berg 221\nA-9771 Berg im Drautal"
- OSM (low, 200904m, sim=1): name="GC Drautal Berg", web="https://www.drautalgolf.at/", addr="Berg, 221, 9771, Berg im Drautal"
- LC  (low, 200813m, sim=1): name="Golfclub Drautal/Berg", addr="Berg 221, A-9771 Berg im Drautal", courses=8.1(9)

### Ennstal-Weißenbach/Liezen - A603 (Austria, 2 courses)

- DB: lat=47.4221905, lon=13.750484, addr="Weißenbach, Weißenbach / Liezen", web="http://www.glcennstal.at", email="glcennstal@golf.at", holes=[18]
- OEGV (high, sim=0.6, boost=+0.6[city:liezen,jaccard:0.50], Steiermark 8940): name="Golf- & Landclub Ennstal Weißenbach/Liezen", web="http://www.glcennstal.at", email="glcennstal@golf.at", holes=18, addr="Am Golfplatz 1, Postfach 193\nA-8940 Liezen"
- OSM (no-match, 1564m, sim=0.226): name="Golf und Country Club Dachstein-Tauern", web="https://www.schladming-golf.at/", addr="Oberhaus, 59, 8967, Haus"
- LC  (no-match, 37082m, sim=0.6): name="Golf- & Landclub Ennstal Weißenbach/Liezen", addr="Am Golfplatz 1, A-8940 Liezen", courses=Golf- & Landclub Ennstal Weißenbach/Liezen(18)

### Fontana Golf Club (Austria, 1 courses)

- DB: lat=47.9820146, lon=16.3036948, addr="Fontana Allee 1, Oberwaltersdorf", web="http://www.fontana.at", email="office@fontana.at", holes=[18]
- OEGV (high, sim=1, boost=+0.6[city:oberwaltersdorf,jaccard:0.50], Niederösterreich 2522): name="FONTANA", web="http://www.fontana.at", email="office@fontana.at", holes=18, addr="Fontana Allee 1\nA-2522 Oberwaltersdorf"
- OSM (low, 611m, sim=1): name="Golfclub Fontana", web="http://www.fontana.at/", addr="Fontana Allee, 1, 2522, Oberwaltersdorf"
- LC  (low, 967m, sim=1): name="Fontana Golf Club", addr="Fontana Allee 1, A-2522 Oberwaltersdorf", courses=Fontana GC(18)

### Frauenthal (Austria, 1 courses)

- DB: lat=47.0506959, lon=15.4494032, addr="Ulrichsberg 7\nA-8530 Deutschlandsberg", web="http://www.gcfrauenthal.at", email="office@gcfrauenthal.at", holes=[18]
- OEGV (high, sim=0.556, boost=+1.2[city:deutschlandsberg,plz:8530,db-name-substring,jaccard:0.50], Steiermark 8530): name="GC Schloß Frauenthal", web="http://www.gcfrauenthal.at", email="office@gcfrauenthal.at", holes=18, addr="Ulrichsberg 7\nA-8530 Deutschlandsberg"
- OSM (no-match, 30664m, sim=0.556): name="Golfclub Schloss Frauenthal", web="https://www.gcfrauenthal.at/", addr="Ulrichsberg, 7, 8530, Deutschlandsberg"
- LC  (no-match, 30615m, sim=0.556): name="Golf Club Schloß Frauenthal", addr="Ulrichsberg 7, A-8530 Deutschlandsberg", courses=GC Schloß Frauenthal(18)

### GC Almenland (Austria, 1 courses)

- DB: lat=47.2783827, lon=15.4935251, addr="Fladnitzer Straße 61, Passail", web="http://www.almenlandgolf.at", email="office@almenlandgolf.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:passail,db-name-substring,jaccard:1.00], Steiermark 8162): name="GC Almenland", web="http://www.almenlandgolf.at", email="office@almenlandgolf.at", holes=18, addr="Fladnitzer Straße 61\nA-8162 Passail"
- OSM (high, 196m, sim=1): name="Golfclub Almenland", web="https://www.almenlandgolf.at/", addr=null
- LC  (low, 259m, sim=0.529): name="GC Almenland-Passail", addr="Tober 1, A-8163 Fladnitz/Teichalm", courses=8.0(18)

### GC am Attersee (Austria, 1 courses)

- DB: lat=47.9071111, lon=13.5172467, addr="Am Golfplatz 1, Attersee am Attersee", web="http://www.golfamattersee.at", email="office@golfamattersee.at", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:attersee,jaccard:1.00], Oberösterreich 4864): name="Golfclub am Attersee", web="http://www.golfamattersee.at", email="office@golfamattersee.at", holes=18, addr="Am Golfplatz 1\nA-4864 Attersee am Attersee"
- OSM (low, 1006m, sim=1): name="Golfclub am Attersee", web="https://www.golfamattersee.at/", addr="Am Golfplatz, 1, 4864, Attersee am Attersee"
- LC  (low, 2542m, sim=1): name="Golfclub am Attersee", addr="Dorfstraße 57, A-4865 Nussdorf am Attersee", courses=7.6(18)

### GC Eldorado (Austria, 1 courses)

- DB: lat=47.4840707, lon=16.1460685, addr="A-2871 Zöbern, Golfplatz 1", web="http://www.golf1.at", email="buckligewelt@golf1.at", holes=[18]
- OEGV (high, sim=0.364, boost=+0.7[city:zöbern,plz:2871], Niederösterreich 2871): name="GOLF ELDORADO-Bucklige Welt", web="http://www.golf1.at", email="buckligewelt@golf1.at", holes=18, addr="Golfplatz 1\nA-2871 Bucklige Welt / Zöbern"
- OSM (low, 102m, sim=0.364): name="Golf Eldorado - Bucklige Welt", web="https://www.golf1.at/", addr=null
- LC  (low, 134m, sim=0.364): name="Golf Eldorado - Bucklige Welt", addr="Golfplatz 1, A--2871 Bucklige Welt", courses=6.5(18)

### GC Föhrenwald Wr. Neustadt - A302 (Austria, 1 courses)

- DB: lat=47.7667609, lon=16.2271879, addr="Am Golfplatz 1, Lanzenkirchen", web="http://www.golfarea36.at", email="office@gcf.at", holes=[18]
- OEGV (high, sim=0.815, boost=+0.67[city:lanzenkirchen,jaccard:0.67], Niederösterreich 2821): name="GC Föhrenwald Wr. Neustadt", web="http://www.golfarea36.at", email="office@gcf.at", holes=18, addr="Am Golfplatz 1\nA-2821 Lanzenkirchen"
- OSM (low, 302m, sim=0.37): name="Golf Club Föhrenwald", web="https://www.gcf.at/", addr="Kleinwolkersdorf, 2700, Wiener Neustadt"
- LC  (low, 622m, sim=0.37): name="GC Föhrenwald", addr="Kleinwolkersdorf 217, A-2700 Wr.Neustadt", courses=8.9(18)

### GC Frühling - Lake Course (Austria, 2 courses)

- DB: lat=48.0374768, lon=16.5508334, addr="Am Golfplatz,  Götzendorf/Leitha", web="http://www.gcfruehling.at", email="office@gcfruehling.at", holes=[9]
- OEGV (high, sim=0.615, boost=+0.4[city:götzendorf], Niederösterreich 2434): name="Golfclub Frühling", web="http://www.gcfruehling.at", email="office@gcfruehling.at", holes=36, addr="Am Golfplatz\nA-2434 Götzendorf / Leitha"
- OSM (low, 436m, sim=0.615): name="Golfclub Frühling", web="https://gcfruehling.at/", addr="Am Golfplatz, 2434, Götzendorf / Leitha"
- LC  (low, 112m, sim=0.615): name="Golfclub Frühling", addr="Am Golfplatz, A-2434 Götzendorf / Leitha", courses=GC Frühling Night Course(9)

### GC GolfmaxX Tuttenhof (Austria, 1 courses)

- DB: lat=48.3250393, lon=16.3377866, addr="Tuttenhofstrasse, Langenzersdorf-Tuttenhof", web="http://www.gctuttendoerfl.at", email="office@gctuttendoerfl.at", holes=[9]
- OEGV (high, sim=0.444, boost=+0.6[city:langenzersdorf,jaccard:0.50], Niederösterreich 2103): name="GC GolfMaxX", web="http://www.golfmaxx.at", email="office@golfmaxx.at", holes=9, addr="Tuttenhofstrasse 140\nA-2103 Langenzersdorf-Tuttenhof"
- OSM (low, 32m, sim=0.375): name="GolfRange Tuttenhof (GolfMaxX) (9 Loch Kurs)", web="https://golfrange.at/Golfmaxx", addr="Am Hechtfang, 2103, Langenzersdorf"
- LC  (low, 286m, sim=0.667): name="GC GolfRange Tuttendörfl", addr="Tuttenhofstrasse, A-2103 Langenzersdorf", courses=GC GolfRange Wien-Tuttendörfl(9)

### GC Guntramsdorf (Austria, 1 courses)

- DB: lat=48.0646646, lon=16.3157465, addr="In den Haidwiesen, Guntramsdorf", web="http://www.golfguntramsdorf.at", email="office@golfguntramsdorf.at", holes=[9]
- OEGV (high, sim=1, boost=+0.8[city:guntramsdorf,jaccard:1.00], Niederösterreich 2353): name="Golfclub Guntramsdorf", web="http://www.golfguntramsdorf.at", email="office@golfguntramsdorf.at", holes=9, addr="Golfplatzweg 1\nA-2353 Guntramsdorf"
- OSM (low, 4686m, sim=1): name="Golfclub Guntramsdorf", web="https://www.golfguntramsdorf.at/", addr="In den Haidwiesen, 2353, Guntramsdorf"
- LC  (low, 5003m, sim=1): name="Golfclub Guntramsdorf", addr="In den Haidwiesen, 2353 Guntramsdorf", courses=7.2(9)

### GC Kitzbuehler Alpen (Austria, 1 courses)

- DB: lat=47.4244158, lon=12.2002032, addr="Holzham 120, Westendorf", web="http://www.gc-westendorf.com", email="office@gc-westendorf.com", holes=[18]
- OEGV (high, sim=0.536, boost=+0.92[city:westendorf,name-token:westendorf,jaccard:0.67], Tirol 6363): name="GC Kitzbüheler Alpen Westendorf", web="http://www.gc-westendorf.com", email="office@gc-westendorf.com", holes=18, addr="Holzham 120\nA-6363 Westendorf"
- OSM (low, 444m, sim=0.395): name="Golfplatz Kitzbüheler Alpen Westendorf", web="https://www.gc-kitzbueheler-alpen.at/", addr=null
- LC  (low, 10m, sim=0.536): name="Golfclub Kitzbüheler Alpen Westendorf", addr="Holzham 120, 6363 Westendorf", courses=8.5(18)

### GC Kitzbühel (Austria, 1 courses)

- DB: lat=47.4412854, lon=12.4038938, addr="Ried Kaps 3, Kitzbühel", web="http://www.golfclub-kitzbuehel.at", email="info@golfclub-kitzbuehel.at", holes=[9]
- OEGV (high, sim=1, boost=+1.1[city:kitzbühel,db-name-substring,jaccard:1.00], Tirol 6370): name="GC Kitzbühel", web="http://www.golfclub-kitzbuehel.at", email="info@golfclub-kitzbuehel.at", holes=9, addr="Ried Kaps 3\nA-6370 Kitzbühel"
- OSM (low, 22m, sim=0.474): name="Golfplatz Kitzbühel", web="https://www.golfclub-kitzbuehel.at/", addr="Ried Kaps, 3, 6370, Kitzbühel"
- LC  (high, 183m, sim=1): name="Golfclub Kitzbühel", addr="Ried Kaps 3, A-6370 Kitzbühel", courses=GC Kitzbühel(9)

### GC Kobaldhof (Austria, 2 courses)

- DB: lat=47.4053406, lon=13.6298168, addr="Kobaldweg 234, Ramsau am Dachstein", web="http://www.kobaldhof.at", email="info@kobaldhof.at", holes=[18]
- OEGV (high, sim=0.346, boost=+0.95[city:ramsau,name-token:ramsau,db-name-substring], Steiermark 8972): name="GC Kobaldhof-Ramsau/Dachstein", web="http://www.kobaldhof.at", email="info@kobaldhof.at", holes=9, addr="Vorberg 234\nA-8972 Ramsau am Dachstein"
- OSM (low, 231m, sim=0.346): name="Bio-Golfplatz am Kobaldhof", web="https://www.kobaldhof.at/bio-golfplatz/bio-golfplatz-am-kobaldhof/", addr="Kobaldweg, 234, 8972, Ramsau am Dachstein"
- LC  (no-match, 50926m, sim=0.667): name="Golfclub Waldhof", addr="Schoberstraße 20, A-5330 Fuschl am See", courses=7.5(9)

### GC Laab (Austria, 1 courses)

- DB: lat=48.1549258, lon=16.1729893, addr="Hoffeldstraße 1, Laab im Walde", web="http://www.golflaab.at", email="office@golflaab.at", holes=[18]
- OEGV (high, sim=0.308, boost=+0.85[city:laab,name-token:walde,jaccard:0.50], Niederösterreich 2381): name="Golfclub Laab im Walde", web="http://www.golflaab.at", email="office@golflaab.at", holes=9, addr="Hoffeldstraße am Golfplatz 1\nA-2381 Laab im Walde"
- OSM (low, 319m, sim=0.308): name="Golfclub Laab im Walde", web="https://www.golflaab.at/", addr="Hoffeldstraße, 2381, Laab im Walde"
- LC  (low, 274m, sim=0.308): name="Golfclub Laab im Walde", addr="Hoffeldstraße, Austria-2381 Laab im Walde", courses=7.1(18)

### GC Laab im Walde (349) (Austria, 1 courses)

- DB: lat=48.1555671, lon=16.1746578, addr="Laab im Walde, Hoffeldstrasse 1, Laab im Walde", web="http://www.golflaab.at", email="office@golflaab.at", holes=[18]
- OEGV (high, sim=0.765, boost=+0.8[city:laab,jaccard:1.00], Niederösterreich 2381): name="Golfclub Laab im Walde", web="http://www.golflaab.at", email="office@golflaab.at", holes=9, addr="Hoffeldstraße am Golfplatz 1\nA-2381 Laab im Walde"
- OSM (low, 446m, sim=0.765): name="Golfclub Laab im Walde", web="https://www.golflaab.at/", addr="Hoffeldstraße, 2381, Laab im Walde"
- LC  (high, 238m, sim=0.765): name="Golfclub Laab im Walde", addr="Hoffeldstraße, Austria-2381 Laab im Walde", courses=7.1(18)

### GC Lengenfeld 2 (Austria, 1 courses)

- DB: lat=48.4738545, lon=15.6169939, addr="Am Golfplatz 1\nA-3552 Lengenfeld", web="http://www.golflengenfeld.at", email="office@golflengenfeld.at", holes=[18]
- OEGV (high, sim=0.833, boost=+1.1[city:lengenfeld,plz:3552,jaccard:1.00], Niederösterreich 3552): name="Golfclub Lengenfeld", web="http://www.golflengenfeld.at", email="office@golflengenfeld.at", holes=36, addr="Am Golfplatz 1\nA-3552 Lengenfeld"
- OSM (high, 126m, sim=0.833): name="Golfclub Lengenfeld", web="http://www.golflengenfeld.at/", addr="Am Golfplatz, 1, 3552, Lengenfeld"
- LC  (low, 250m, sim=0.833): name="Golfclub Lengenfeld", addr="Am Golfplatz 1, A-3552 Lengenfeld", courses=Donauland(18)

### GC Marco Polo (Austria, 1 courses)

- DB: lat=48.2814405, lon=16.4304993, addr="Ruthnergasse 170a, Wien", web="http://www.mp1210.at", email="info@mp1210.at", holes=[18]
- OEGV (high, sim=0.588, boost=+0.67[city:wien,jaccard:0.67], Wien 1210): name="Golfclub Marco Polo Vienna", web="http://www.mp1210.at", email="info@mp1210.at", holes=9, addr="Ruthnergasse 170a\nA-1210 Wien"
- OSM (low, 7m, sim=0.455): name="Golfclub Sportcenter Marco Polo", web="https://www.marco-polo.co.at/", addr="Ruthnergasse, 170a, 1210, Wien"
- LC  (medium, 278m, sim=1): name="Golfclub Marco Polo", addr="Ruthnergasse 170, A-1210 Wien", courses=Golfclub Marco-Polo(9)

### GC Maria Taferl (Austria, 1 courses)

- DB: lat=48.2252539, lon=15.1571646, addr="Maria Taferl", web="http://www.mariataferl.golf", email="office@mariataferl.golf", holes=[18]
- OEGV (high, sim=0.632, boost=+0.9[city:maria,db-name-substring,jaccard:0.50], Niederösterreich 3672): name="GC Maria Taferl-Wachau", web="http://www.mariataferl.golf", email="office@mariataferl.golf", holes=9, addr="Maria Taferl 43\nA-3672 Maria Taferl"
- OSM (low, 657m, sim=0.632): name="Golfclub Maria Taferl-Wachau", web="https://www.mariataferl.golf/", addr="43, 3672, Maria Taferl"
- LC  (low, 502m, sim=0.167): name="Golfclub Wachau", addr="A-3672 Maria Taferl 43", courses=7.3(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - address: from oegv(high, sim=0.632)
```sql
UPDATE courses SET
  address = 'Maria Taferl 43\nA-3672 Maria Taferl'
WHERE id IN (
  'b16fa851-57fd-43ab-b1be-100966a80fce'
);
```

### GC Mieming (Austria, 2 courses)

- DB: lat=47.3412076, lon=10.9656344, addr="Mieming", web="http://www.golfmieming.at", email="info@golfmieming.at", holes=[18,9]
- OEGV (high, sim=0.412, boost=+0.9[city:mieming,db-name-substring,jaccard:0.50], Tirol 6414): name="GC Mieminger Plateau", web="http://www.golfmieming.at", email="info@golfmieming.at", holes=27, addr="Obermieming  141 e\nA-6414 Mieming/Tirol"
- OSM (no-match, 365716m, sim=0.556): name="Golf Club Semmering", web="https://www.gcsemmering.at/", addr="Meiereistraße, 3, 2680, Semmering"
- LC  (no-match, 365718m, sim=0.556): name="Golf Club Semmering", addr="Meierei 122, A-2680 Semmering", courses=7.5(9)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - address: from oegv(high, sim=0.412)
```sql
UPDATE courses SET
  address = 'Obermieming  141 e\nA-6414 Mieming/Tirol'
WHERE id IN (
  '192c65d3-dc8d-40a7-937b-688e6d92d80b',
  '8ec84644-7cc7-42b7-be20-5941c9653e7e'
);
```

### GC Montafon - 801 (Austria, 1 courses)

- DB: lat=47.1116168, lon=9.866415, addr="Zelfenstr.110, Schruns/Tschagguns", web="http://www.golfclub-montafon.at", email="info@golfclub-montafon.at", holes=[9]
- OEGV (high, sim=0.667, boost=+0.8[city:tschagguns,jaccard:1.00], Vorarlberg 6774): name="Golfclub Montafon", web="http://www.golfclub-montafon.at", email="info@golfclub-montafon.at", holes=9, addr="Zelfenstraße 110\nA-6774 Tschagguns"
- OSM (no-match, 6338m, sim=0.667): name="Golfclub Montafon", web="http://www.golfclub-montafon.at/", addr=null
- LC  (no-match, 7259m, sim=0.667): name="Golfclub Montafon", addr="Zelfenstraße 110, A--6774 Tschagguns", courses=6.7(9)

### GC Murtal (Austria, 1 courses)

- DB: lat=47.2269428, lon=14.7831527, addr="Frauenbachstr. 51, Spielberg", web="http://www.gcmurtal.at", email="gcmurtal@golf.at", holes=[18]
- OEGV (high, sim=1, boost=+0.6[city:spielberg,jaccard:0.50], Steiermark 8724): name="Golf Club Murtal", web="http://www.gcmurtal.at", email="gcmurtal@golf.at", holes=18, addr="Frauenbachstraße 51\nA-8724 Spielberg"
- OSM (high, 184m, sim=1): name="Golfclub Murtal", web="https://www.gcmurtal.at/", addr="Frauenbachstraße, 51, 8724, Spielberg"
- LC  (medium, 438m, sim=1): name="Golfclub Murtal", addr="Frauenbachstraße 51, A-8724 Spielberg", courses=8.4(18)

### GC Perg-Karlingberg (Austria, 1 courses)

- DB: lat=48.2537817, lon=14.6491584, addr="Karlingberg 3\nA-4320 Perg", web="http://www.karlingbergergut.at", email="golf@karlingbergergut.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:perg,plz:4320,jaccard:1.00], Oberösterreich 4320): name="Golfclub Perg-Karlingberg", web="http://www.karlingbergergut.at", email="golf@karlingbergergut.at", holes=9, addr="Karlingberg 3\nA-4320 Perg"
- OSM (low, 639m, sim=1): name="Golfclub Perg-Karlingberg", web="https://www.karlingbergergut.at", addr=null
- LC  (no-match, 134540m, sim=0.471): name="Golfclub Murau-Kreischberg", addr="Am Golfplatz 1, A-8861 St. Georgen/Murau", courses=8.9(18)

### GC Posthotel-Alpengolf Achenkirch (Austria, 1 courses)

- DB: lat=47.5278077, lon=11.7005715, addr="Haus-Nr. 382, Achenkirch", web="http://golfclub-achenkirch.at", email="golf@posthotel.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:achenkirch,db-name-substring,jaccard:1.00], Tirol 6215): name="GC Posthotel-Alpengolf Achenkirch", web="http://golfclub-achenkirch.at", email="golf@posthotel.at", holes=9, addr="St. Anna-Strasse 391\nA-6215 Achenkirch"
- OSM (high, 40m, sim=0.75): name="Golfplatz Posthotel-Alpengolf Achenkirch", web="http://golfclub-achenkirch.at/", addr="Achenkirch, 6215, Achenkirch"
- LC  (high, 147m, sim=1): name="GC Posthotel-Alpengolf Achenkirch", addr="St. Anna Straße 391", courses=8.0(9)

### GC Salzburg - Gut Kaltenhausen (Austria, 1 courses)

- DB: lat=48.1272165, lon=13.1147867, addr="Kaltenhausen 1, Pischelsdorf am Engelbach", web="http://www.golfclub-pischelsdorf.at", email="office@golfclub-pischelsdorf.at", holes=[18]
- OEGV (high, sim=0.69, boost=+0.65[city:pischelsdorf,name-token:pischelsdorf], Oberösterreich 5233): name="Golfclub Pischelsdorf - Gut Kaltenhausen", web="http://www.golfclub-pischelsdorf.at", email="office@golfclub-pischelsdorf.at", holes=18, addr="Kaltenhausen 1\nA-5233 Pischelsdorf"
- OSM (high, 187m, sim=0.76): name="Golfpark Gut Kaltenhausen", web="https://www.golfclub-salzburg.at/courses/kaltenhausen", addr=null
- LC  (low, 50m, sim=0.12): name="Golfclub Innviertel", addr="Gut Kaltenhausen, A-5233 Pischelsdorf", courses=7.2(18)

### GC Schärding (Austria, 1 courses)

- DB: lat=48.3826905, lon=13.5132019, addr="Maad 2, Taufkirchen/Pram", web="https://golfclub-schaerding.at", email="sekretariat@golfclub-schaerding.at", holes=[18]
- OEGV (high, sim=0.643, boost=+0.6[city:taufkirchen,jaccard:0.50], Oberösterreich 4775): name="Golfclub Schärding/Maad", web="https://golfclub-schaerding.at", email="sekretariat@golfclub-schaerding.at", holes=18, addr="Maad 2\nA-4775 Taufkirchen/Pram"
- OSM (low, 535m, sim=0.563): name="Celtic Golf Course Schärding", web="https://www.gcschaerding.at", addr=null
- LC  (low, 36m, sim=0.563): name="Celtic Golf Course Schärding", addr="Maad 2, A-4775 Taufkirchen/Pram", courses=7.6(18)

### GC Schloss Ernegg (Austria, 1 courses)

- DB: lat=48.0644846, lon=15.0663395, addr="Ernegg", web="http://www.gcschlossernegg.at", email="office@gcschlossernegg.at", holes=[18]
- OEGV (high, sim=1, boost=+0.4[jaccard:1.00], Niederösterreich 3261): name="Golfclub Schloss Ernegg", web="http://www.gcschlossernegg.at", email="office@gcschlossernegg.at", holes=18, addr="Ernegg 4\nA-3261 Steinakirchen/Forst"
- OSM (low, 579m, sim=1): name="Golfclub Schloss Ernegg", web="http://www.ernegg.at", addr="4, 3261, Steinakirchen am Forst"
- LC  (medium, 270m, sim=1): name="Golf Club Schloss Ernegg", addr="Ernegg 4, A-3261 Steinakirchen/Forst", courses=9 Hole Course(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - address: from oegv(high, sim=1)
```sql
UPDATE courses SET
  address = 'Ernegg 4\nA-3261 Steinakirchen/Forst'
WHERE id IN (
  'fedce7d1-ca65-4d5b-9abb-b262ea3f0218'
);
```

### GC Schloss Feistritz (Austria, 1 courses)

- DB: lat=47.5650708, lon=15.5797943, addr="Feistritzberg 12, Krieglach", web="http://www.golfclub-schloss-feistritz.at", email="manfred.lueger@gmx.at", holes=[9]
- OEGV (high, sim=1, boost=+0.8[city:krieglach,jaccard:1.00], Steiermark 8670): name="Golfclub Schloss Feistritz", web="http://www.golfclub-schloss-feistritz.at", email="manfred.lueger@gmx.at", holes=9, addr="Feistritzberg 12\nA-8670 Krieglach"
- OSM (high, 19m, sim=1): name="Golfclub Schloss Feistritz", web="http://www.golfgreencard.at/", addr="Feistritzberg, 8665, Langenwang"
- LC  (low, 39050m, sim=1): name="Golfclub Schloß Feistritz", addr="Verwaltung: Adriach 53, A-8130 Frohnleiten", courses=GC Schloß Feistritz - Greencard(9)

### GC Seefeld-Reith (Austria, 1 courses)

- DB: lat=47.2990916, lon=11.2043597, addr="Reitherspitzstraße 632d\nA-6100 Seefeld in Tirol", web="http://www.gc-seefeld-reith.at", email="info@gc-seefeld-reith.at", holes=[9]
- OEGV (high, sim=0.5, boost=+0.7[city:seefeld,plz:6100], Tirol 6100): name="GC Seefeld-Wildmoos", web="http://www.seefeldgolf.com", email="info@seefeldgolf.com", holes=18, addr="Wildmoos 11 (Postfach 22)\nA-6100 Seefeld in Tirol"
- OSM (low, 2722m, sim=1): name="Golfclub Seefeld-Reith", web="https://www.gc-seefeld-reith.at/", addr="Reitherspitzstraße, 138, 6100, Seefeld in Tirol"
- LC  (low, 3236m, sim=1): name="Golfclub Seefeld Reith", addr="Reitherspitzstraße 632 d, A-6100 Seefeld", courses=Seefeld Reith(9)

### GC Semmering (Austria, 2 courses)

- DB: lat=47.6446691, lon=15.8141108, addr="Meierei 122, Semmering", web="http://www.gcsemmering.at", email="gcsemmering@golf.at", holes=[9,18]
- OEGV (high, sim=0.75, boost=+0.8[city:semmering,jaccard:1.00], Niederösterreich 2680): name="Golfclub am Semmering", web="http://www.gcsemmering.at", email="gcsemmering@golf.at", holes=9, addr="Meiereistraße 3\nA-2680 Semmering"
- OSM (high, 84m, sim=1): name="Golf Club Semmering", web="https://www.gcsemmering.at/", addr="Meiereistraße, 3, 2680, Semmering"
- LC  (high, 59m, sim=1): name="Golf Club Semmering", addr="Meierei 122, A-2680 Semmering", courses=7.5(9)

### GC Sonnberg Kobernausserwald (Austria, 1 courses)

- DB: lat=48.1363174, lon=13.2648381, addr="Straß 1, St. Johann am Walde", web="http://www.golflaab.at", email="office@golflaab.at", holes=[18]
- OEGV (medium, sim=0.32, boost=+0.6[city:johann,jaccard:0.50], Oberösterreich 5251): name="Golfclub Sonnberg", web="http://www.gcsonnberg.at", email="golf@gcsonnberg.at", holes=9, addr="Strass 1\nA-5251 St. Johann am Walde"
- OSM (high, 244m, sim=1): name="Golfclub Sonnberg Kobernausserwald", web="https://www.gcsonnberg.at/", addr="1, 5251, Höhnhart"
- LC  (medium, 491m, sim=1): name="GC Sonnberg Kobernausserwald", addr="Strass 1, A-5251 5242 St. Johann am Walde", courses=6.5(18)

### GC Stärk Ansfelden (Austria, 1 courses)

- DB: lat=48.1877338, lon=14.2911462, addr="Grabwinkl 11, Ansfelden", web="http://www.ansfelden.golf-staerk.at", email="ansfelden@golf-staerk.at", holes=[18]
- OEGV (high, sim=0.75, boost=+0.67[city:ansfelden,jaccard:0.67], Oberösterreich 4052): name="GC Stärk.Linz.Ansfelden", web="http://www.ansfelden.golf-staerk.at", email="ansfelden@golf-staerk.at", holes=18, addr="Grabwinkel 11\nA-4052 Ansfelden"
- OSM (low, 654m, sim=1): name="Golf Stärk Ansfelden", web="https://golf-staerk.at/ansfelden/", addr="Grabwinkel, 11, 4052, Ansfelden"
- LC  (medium, 285m, sim=1): name="GC Stärk Ansfelden", addr="Grabwinkl 11, A-4052 Ansfelden", courses=GC Stärk-Ansfelden(18)

### GC Stärk Linz (Austria, 1 courses)

- DB: lat=48.2549008, lon=14.3637981, addr="Auhirschgasse 50, Linz", web="http://www.pichling.golf-staerk.at", email="pichling@golf-staerk.at", holes=[9]
- OEGV (high, sim=0.526, boost=+0.67[city:linz,jaccard:0.67], Oberösterreich 4030): name="Golfclub Stärk.Linz.Pichling", web="http://www.pichling.golf-staerk.at", email="pichling@golf-staerk.at", holes=9, addr="Auhirschgasse 52\nA-4030 Linz"
- OSM (low, 671m, sim=0.526): name="Golfclub Stärk Linz Pichling", web="https://golf-staerk.at/", addr="Auhirschgasse, 52, 4030, Linz"
- LC  (low, 656m, sim=0.5): name="Golfclub Stärk", addr="Auhirschgasse 52, A-4030 Linz", courses=GC Stärk-Linz(9)

### GC Traminergolf Klöch (Austria, 2 courses)

- DB: lat=46.7498186, lon=15.9701698, addr="Klöch 192, Klöch", web="http://www.traminergolf.at", email="info@traminergolf.at", holes=[18,9]
- OEGV (high, sim=1, boost=+1.1[city:klöch,db-name-substring,jaccard:1.00], Steiermark 8493): name="GC Traminergolf Klöch", web="http://www.traminergolf.at", email="info@traminergolf.at", holes=27, addr="Klöch 192\nA-8493 Klöch"
- OSM (high, 67m, sim=1): name="Traminergolf Klöch", web="https://www.traminergolf.at/", addr="192, 8493, Klöch"
- LC  (low, 1654m, sim=1): name="GC Traminergolf Klöch", addr="Klöch 192, A-8493 Klöch", courses=8.6(27)

### GC Traunsee - Kirchham (Austria, 1 courses)

- DB: lat=47.9577602, lon=13.8946226, addr="Kampesberg 21, Kirchham", web="http://www.golfclubtraunsee.at", email="sekretariat@golfclubtraunsee.at", holes=[18]
- OEGV (high, sim=0.588, boost=+0.4[city:kirchham], Oberösterreich 4656): name="Golfclub Traunsee Almtal", web="http://www.golfclubtraunsee.at", email="sekretariat@golfclubtraunsee.at", holes=18, addr="Kampesberg 21\nA-4656 Kirchham"
- OSM (high, 107m, sim=0.941): name="Golfclub Traunsee Kircham", web="https://www.golfclubtraunsee.com/", addr="21, 4656, Kirchham"
- LC  (no-match, 2340m, sim=0.471): name="Golfclub Traunsee", addr="Kampesberg 21, A-4656 Kirchham", courses=7.7(18)

### GC Über den Dächern von Passau (Austria, 1 courses)

- DB: lat=48.5680936, lon=13.4934386, addr="Freinberg 74, Freinberg", web="http://www.golfclub-passau.com", email="gcpassau@speed.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:freinberg,db-name-substring,jaccard:1.00], Oberösterreich 4785): name="GC Über den Dächern von Passau", web="http://www.golfclub-passau.com", email="gcpassau@speed.at", holes=9, addr="Freinberg 74\nA-4785 Freinberg"
- OSM (low, 2298m, sim=1): name="Golfclub über den Dächern von Passau", web="https://www.golfclub-passau.com/", addr="74, 4785, Freinberg"
- LC  (low, 2207m, sim=1): name="Golfclub über den Dächern von Passau", addr="Freinberg 74, A-4785 Freinberg", courses=GC Über den Dächern von Passau(9)

### GC Urslautal (Austria, 1 courses)

- DB: lat=47.4120432, lon=12.8867489, addr="Schinking 81, Saalfelden", web="http://www.golf-urslautal.at", email="info@golf-urslautal.at", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:saalfelden,jaccard:1.00], Salzburg 5760): name="Golfclub Urslautal", web="http://www.golf-urslautal.at", email="info@golf-urslautal.at", holes=18, addr="Schinking 81\nA-5760 Saalfelden"
- OSM (low, 232m, sim=0.225): name="Golfplatz Urslautal Saalfelden Maria Alm", web="https://www.golf-urslautal.at/", addr="Schinking, 81, 5760, Saalfelden am Steinernen Meer"
- LC  (low, 5m, sim=0.45): name="Golfclub Urslautal Saalfelden", addr="Schinking 81, A-5760 Saalfelden", courses=Golfclub Urslautal(18)

### GC Veltlinerland Poysdorf (Austria, 1 courses)

- DB: lat=48.6804381, lon=16.623317, addr="Am Golfplatz 11, Poysdorf", web=null, email=null, holes=[18]
- OEGV (high, sim=0.364, boost=+0.6[city:poysdorf,jaccard:0.50], Niederösterreich 2170): name="Golfclub Poysdorf", web="http://www.poysdorf.golf", email="info@poysdorf.golf", holes=18, addr="Am Golfplatz 11\nA-2170 Poysdorf"
- OSM (low, 140m, sim=0.688): name="Golfplatz Veltlinerland Poysdorf", web="http://www.golf-veltlinerland.com/", addr="Am Golfplatz, 11, 2170, Poysdorf"
- LC  (medium, 431m, sim=1): name="Golfclub Veltlinerland Poysdorf", addr="Am Golfplatz 11, A-2170 Poysdorf", courses=6.8(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from oegv(high, sim=0.364)
  - email: from oegv(high, sim=0.364)
```sql
UPDATE courses SET
  website = 'http://www.poysdorf.golf',
  email = 'info@poysdorf.golf'
WHERE id IN (
  '8a9ede0a-04a8-4576-93d8-ccbe0c14ccfc'
);
```

### GC Walchsee Moarhof (Austria, 2 courses)

- DB: lat=47.661377, lon=12.2924909, addr="Schwaigs 42, Walchsee", web="http://moarhof.at", email="gcwalchsee@moarhof.at", holes=[9,18]
- OEGV (high, sim=1, boost=+0.8[city:walchsee,jaccard:1.00], Tirol 6344): name="GC Walchsee-Moarhof", web="http://moarhof.at", email="gcwalchsee@moarhof.at", holes=9, addr="Schwaigs 42\nA-6344 Walchsee"
- OSM (high, 41m, sim=1): name="Golfclub Walchsee-Moarhof", web="https://www.golfclub-walchsee.at/", addr="Schwaigs, 42, 6344, Walchsee"
- LC  (low, 174m, sim=0.438): name="Golfclub Moarhof", addr="Schwaigs 42, A-6344 Walchsee", courses=GC Walchsee-Moarhof(9)

### GC Wels (Austria, 1 courses)

- DB: lat=48.1356689, lon=14.0997927, addr="Golfplatzstraße 2, Weißkirchen an der Traun", web="http://www.golfclub-wels.at", email="office@golfclub-wels.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:weißkirchen,db-name-substring,jaccard:1.00], Oberösterreich 4616): name="GC Wels", web="http://www.golfclub-wels.at", email="office@golfclub-wels.at", holes=18, addr="Golfplatzstraße 2\nA-4616 Weißkirchen"
- OSM (high, 48m, sim=1): name="Golf Club Wels", web="https://www.golfclub-wels.at/", addr="Golfplatzstraße, 2, 4616, Weißkirchen"
- LC  (high, 84m, sim=1): name="GC  Wels", addr="Golfplatzstraße 2, A-4616 Weißkirchen", courses=8.2(18)

### GC Wien (Austria, 1 courses)

- DB: lat=48.2083537, lon=16.3725042, addr="Vienna", web="http://www.gcwien.at", email="office@gcwien.at", holes=[18]
- OEGV (high, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], Wien 1020): name="GC Wien", web="http://www.gcwien.at", email="office@gcwien.at", holes=18, addr="Freudenau 65a\nA-1020 Wien"
- OSM (low, 6132m, sim=1): name="Golfclub Wien", web="https://www.gcwien.at/", addr="Freudenau, 65a, 1020, Wien"
- LC  (low, 5844m, sim=1): name="Golf Club Wien", addr="Freudenau 65a, A-1020 Wien", courses=GC Wien(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - address: from oegv(high, sim=1)
```sql
UPDATE courses SET
  address = 'Freudenau 65a\nA-1020 Wien'
WHERE id IN (
  'a7897089-1d65-4b88-baf6-3e470027bd6b'
);
```

### GC Wilder Kaiser Ellmau (Austria, 3 courses)

- DB: lat=47.5193971, lon=12.3111127, addr="Dorf 2, Ellmau", web="http://www.wilder-kaiser.com", email="office@wilder-kaiser.com", holes=[18]
- OEGV (high, sim=0.65, boost=+0.67[city:ellmau,jaccard:0.67], Tirol 6352): name="Golfclub Wilder Kaiser", web="http://www.wilder-kaiser.com", email="office@wilder-kaiser.com", holes=27, addr="Dorf 2\nA-6352 Ellmau/Tirol"
- OSM (low, 760m, sim=1): name="Golfclub Wilder Kaiser-Ellmau", web="http://www.wilder-kaiser.com/", addr="Dorf, 2, 6352, Ellmau"
- LC  (no-match, 1848m, sim=0.65): name="Golfclub Wilder Kaiser", addr="Dorf 2, A-6352 Ellmau/Tirol", courses=Tirol(9)

### GC Wolfsberg (Austria, 1 courses)

- DB: lat=46.8432729, lon=14.8026623, addr="Hattendorf 25, Wolfsberg", web="http://www.golfclub-wolfsberg.com", email="gcwolfsberg@golf.at", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:wolfsberg,jaccard:1.00], Kärnten 9411): name="Golfclub Wolfsberg", web="http://www.golfclub-wolfsberg.com", email="gcwolfsberg@golf.at", holes=9, addr="Sandsteinweg 6\nA-9411 Wolfsberg - St.Michael im Lavanttal"
- OSM (high, 9m, sim=1): name="Golf Club Wolfsberg", web="http://www.golfland.kaernten.at/wolfsberg", addr="Hattendorf, 25, 9411, Wolfsberg / St. Michael im Lavanttal"
- LC  (high, 216m, sim=1): name="Golfclub Wolfsberg", addr="Hattendorf 25, A-9411, St.Michael im Lavanttal", courses=7.0(9)

### GCC Schloss Pichlarn (Austria, 2 courses)

- DB: lat=47.5049688, lon=14.1211919, addr="Zur Linde 1, Aigen im Ennstal", web="http://www.golfpichlarn.at", email="golf@schlosspichlarn.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:aigen,db-name-substring,jaccard:1.00], Steiermark 8943): name="GCC Schloss Pichlarn", web="http://www.golfpichlarn.at", email="golf@schlosspichlarn.at", holes=18, addr="Zur Linde 1\nA-8943 Aigen im Ennstal"
- OSM (low, 315m, sim=0.643): name="Golf- & Countryclub Schloss Pichlarn", web="https://www.golfpichlarn.at/home/", addr="Zur Linde, 1, 8943, Aigen im Ennstal"
- LC  (low, 358m, sim=0.8): name="Golf & Country Club Schloss Pichlarn", addr="Zur Linde 1, A-8952 Irdning", courses=Golf & Country Club Schloss Pichlarn(18)

### GLC Rasmushof (Austria, 1 courses)

- DB: lat=47.4463585, lon=12.3911473, addr="Kitzbühel", web="http://www.rasmushof.at", email="golf@rasmushof.at", holes=[9]
- OEGV (high, sim=0.611, boost=+0.4[city:kitzbühel], Tirol 6370): name="Golf & Landclub Rasmushof", web="http://www.rasmushof.at", email="golf@rasmushof.at", holes=9, addr="Hermann Reisch Weg 15\nA-6370 Kitzbühel"
- OSM (low, 594m, sim=0.611): name="Golf & Landclub Rasmushof", web="https://www.rasmushof.at/golfclub", addr="Hermann Reisch Weg, 15, 6370, Kitzbühel"
- LC  (no-match, 1011m, sim=0.611): name="Golf & Landclub Rasmushof", addr="Hermann Reisch Weg 15, A-6370 Kitzbühel", courses=Golf & Landclub Rasmushof(9)

### Goldegg (Austria, 1 courses)

- DB: lat=47.3187493, lon=13.1028812, addr="Goldegg", web="http://www.golfclub-goldegg.com", email="info@golfclub-goldegg.com", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:goldegg,db-name-substring,jaccard:1.00], Salzburg 5622): name="GC Goldegg", web="http://www.golfclub-goldegg.com", email="info@golfclub-goldegg.com", holes=18, addr="Maierhof 19\nA-5622 Goldegg"
- OSM (low, 720m, sim=1): name="Golfclub Goldegg", web="https://www.golfclub-goldegg.com/", addr="19, 5622, Goldegg"
- LC  (low, 566m, sim=0.5): name="Golfclub Goldegg am See", addr="Maierhof 5, A-5622 Goldegg", courses=GC Goldegg(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - address: from oegv(high, sim=1)
```sql
UPDATE courses SET
  address = 'Maierhof 19\nA-5622 Goldegg'
WHERE id IN (
  'b6a9b44e-6460-4c5c-b1b5-d11a9292438d'
);
```

### Golf & Country Club Gut Altentann (Austria, 1 courses)

- DB: lat=47.8911852, lon=13.1940772, addr="Hof 54, Henndorf am Wallersee", web="http://www.gutaltentann.com", email="office@gutaltentann.com", holes=[18]
- OEGV (high, sim=1, boost=+0.4[city:henndorf], Salzburg 5302): name="GC Gut Altentann", web="http://www.gutaltentann.com", email="office@gutaltentann.com", holes=18, addr="Hof 54\nA-5302 Henndorf"
- OSM (low, 581m, sim=1): name="Golf & Country Club Gut Altentann", web="https://www.gutaltentann.com/", addr="54, 5302, Henndorf am Wallersee"
- LC  (medium, 495m, sim=1): name="Golf & Country Club Gut Altentann", addr="Hof 54, A-5302 Henndorf", courses=GC Gut Altentann(18)

### Golf & Country Club Salzburg (Austria, 1 courses)

- DB: lat=47.8205896, lon=12.9941238, addr="Klessheim 21, Wals, Salzburg", web="http://www.golfclub-klessheim.com", email="office@golfclub-klessheim.com", holes=[9]
- OEGV (high, sim=0.444, boost=+1.25[city:wals,name-token:klessheim,db-name-substring,jaccard:0.75], Salzburg 5071): name="Golf & Country Club Salzburg-Klessheim", web="http://www.golfclub-klessheim.com", email="office@golfclub-klessheim.com", holes=9, addr="Klessheim 21\nA-5071 Wals I"
- OSM (low, 284m, sim=0.267): name="Golf & Countryclub Salzburg Klessheim", web="https://www.golfclub-klessheim.com/", addr="Klessheim, 5071, Salzburg - Wals"
- LC  (high, 99m, sim=1): name="Golf & Country Club Salzburg", addr="Klessheim 21, A-5071 Salzburg - Wals", courses=Golf & Country Club Salzburg(9)

### Golf Club Breitenfurt (Austria, 1 courses)

- DB: lat=48.1319854, lon=16.1766798, addr="Hauptstrasse 58, Breitenfurt", web="http://www.golf-breitenfurt.at", email="office@golf-breitenfurt.at", holes=[9]
- OEGV (medium, sim=0.524, boost=+0.4[city:breitenfurt], Niederösterreich 2384): name="Golfplatz Breitenfurt", web="http://www.golf-breitenfurt.at", email="office@golf-breitenfurt.at", holes=9, addr="Hauptstrasse 58\nA-2384 Breitenfurt bei Wien"
- OSM (high, 8m, sim=1): name="Golfclub Breitenfurt", web="http://www.golf-breitenfurt.com/", addr="Hauptstraße, 58, 2384, Breitenfurt bei Wien"
- LC  (medium, 266m, sim=1): name="Golf Club Breitenfurt", addr="Hauptstrasse 58, A-2384 Breitenfurt", courses=8.0(9)

### Golf Club Enzesfeld (Austria, 1 courses)

- DB: lat=47.9206673, lon=16.1772979, addr="Schloßstraße 38a, Enzesfeld-Lindabrunn", web="http://www.gcenzesfeld.at", email="golfclub@gcenzesfeld.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:enzesfeld,db-name-substring,jaccard:1.00], Niederösterreich 2551): name="Golf Club Enzesfeld", web="http://www.gcenzesfeld.at", email="golfclub@gcenzesfeld.at", holes=18, addr="Schloßstrasse 38 (Zufahrt)\nA-2551 Enzesfeld"
- OSM (low, 2422m, sim=1): name="Golf Club Enzesfeld", web="http://www.gcenzesfeld.at/", addr="Schlossstraße, 38, 2551, Enzesfeld-Lindabrunn"
- LC  (low, 2334m, sim=1): name="Golf Club Enzesfeld", addr="In der Jauling, 2551 Enzesfeld-Lindabrunn, Zufahrt bei Schloßstrasse 38", courses=8.9(18)

### Golf Club Gastein (Austria, 1 courses)

- DB: lat=47.1378468, lon=13.1325568, addr="Golfstraße 6, Bad Gastein", web="http://golfclub-gastein.com", email="info@golfclub-gastein.com", holes=[18]
- OEGV (high, sim=1, boost=+0.6[city:gastein,jaccard:0.50], Salzburg 5640): name="GC Gastein", web="http://golfclub-gastein.com", email="info@golfclub-gastein.com", holes=18, addr="Golfstraße 6\nA-5640 Bad Gastein"
- OSM (low, 517m, sim=1): name="Golfclub Gastein", web="https://golfclub-gastein.com/", addr="Golfstraße, 6, 5640, Bad Gastein"
- LC  (low, 1067m, sim=1): name="GC Gastein", addr="Golfstraße 6, A--5640 Bad Gastein", courses=7.3(18)

### Golf Club Gut Brandlhof (Austria, 1 courses)

- DB: lat=47.4888554, lon=12.8236148, addr="Hohlwegen 4, Saalfelden am Steinernen Meer", web="https://www.brandlhof.com", email="golfclub@brandlhof.com", holes=[18]
- OEGV (high, sim=1, boost=+0.6[city:saalfelden,jaccard:0.50], Salzburg 5760): name="Golfclub Gut Brandlhof", web="https://www.brandlhof.com", email="golfclub@brandlhof.com", holes=18, addr="Hohlwegen 4\nA-5760 Saalfelden"
- OSM (low, 571m, sim=1): name="Golfclub Gut Brandlhof", web="http://www.gc-gutbrandlhof.com", addr="Hohlwegen, 4, 5760, Saalfelden am Steinernen Meer"
- LC  (low, 1098m, sim=1): name="Golfclub Gut Brandlhof", addr="Hohlwegen 4, A-5760 Saalfelden", courses=6.7(18)

### Golf Club Liebenau (Austria, 1 courses)

- DB: lat=47.0141374, lon=15.4711469, addr="Golfstraße 10, Graz-Gössendorf", web="https://www.golf-graz.at", email="office@golf-graz.at", holes=[9]
- OEGV (high, sim=1, boost=+0.6[city:graz,jaccard:0.50], Steiermark 8077): name="Golfclub Liebenau", web="https://www.golf-graz.at", email="office@golf-graz.at", holes=9, addr="Golfstraße 10\nA-8077 Graz-Gössendorf"
- OSM (low, 228m, sim=0.242): name="Golfplatz Grazer Murauen (GC Liebenau)", web="https://golf-graz-murauen.at/", addr=null
- LC  (low, 91m, sim=0.214): name="Golfclub Grazer MurAuen", addr="Golfstraße 10, A-8041 Graz-Liebenau", courses=Mur9(9)

### Golf Club Montfort Rankweil (Austria, 1 courses)

- DB: lat=47.2865726, lon=9.6160082, addr="Kirchstraße 70, Rankweil", web="http://www.golfclub-montfort.com", email="info@golfclub-montfort.com", holes=[18]
- OEGV (high, sim=1, boost=+0.67[city:rankweil,jaccard:0.67], Vorarlberg 6830): name="Golfclub Montfort Rankweil", web="http://www.golfclub-montfort.com", email="info@golfclub-montfort.com", holes=18, addr="Kirchstraße 70\nA-6830 Rankweil"
- OSM (medium, 259m, sim=1): name="Golfclub Montfort Rankweil", web="https://www.golfclub-montfort.com/", addr="Kirchstraße, 70, 6830, Rankweil"
- LC  (high, 236m, sim=1): name="Golfclub Montfort Rankweil", addr="Kichstraße 70, A-6830 Rankweil", courses=7.5(18)

### Golf Club Sterngartl (Austria, 1 courses)

- DB: lat=48.4840521, lon=14.251916, addr="Schauerschlag 4, Oberneukirchen", web="http://www.golf-sterngartl.at", email="office@golf-sterngartl.at", holes=[18]
- OEGV (high, sim=1, boost=+0.6[city:oberneukirchen,jaccard:0.50], Oberösterreich 4181): name="Golfclub SternGartl", web="http://www.golf-sterngartl.at", email="office@golf-sterngartl.at", holes=18, addr="Schauerschlag 4\nA-4181 Oberneukirchen"
- OSM (medium, 253m, sim=1): name="Golfclub SternGartl", web="https://www.golf-sterngartl.at/", addr=null
- LC  (high, 17m, sim=1): name="Golfclub SternGartl", addr="Schauerschlag 4, A-4181 Oberneukirchen", courses=8.5(18)

### Golf Club Wien (Austria, 1 courses)

- DB: lat=48.189335, lon=16.4348425, addr="Freudenau 65A, Wien", web="http://www.gcwien.at", email="office@gcwien.at", holes=[18]
- OEGV (high, sim=1, boost=+0.6[city:wien,jaccard:0.50], Wien 1020): name="GC Wien", web="http://www.gcwien.at", email="office@gcwien.at", holes=18, addr="Freudenau 65a\nA-1020 Wien"
- OSM (low, 1059m, sim=1): name="Golfclub Wien", web="https://www.gcwien.at/", addr="Freudenau, 65a, 1020, Wien"
- LC  (low, 783m, sim=1): name="Golf Club Wien", addr="Freudenau 65a, A-1020 Wien", courses=GC Wien(18)

### Golf Club Wien-Süßenbrunn (Austria, 1 courses)

- DB: lat=48.2841937, lon=16.5046662, addr="Weingartenallee 22, Wien", web="http://www.golfpark-vienna.at", email="golf@golfpark-vienna.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:wien,db-name-substring,jaccard:1.00], Wien 1220): name="Golf Club Wien-Süßenbrunn", web="http://www.golfpark-vienna.at", email="golf@golfpark-vienna.at", holes=18, addr="Weingartenallee 22\nA-1220 Wien"
- OSM (high, 27m, sim=0.8): name="Golf ClubWien Süßenbrunn", web="http://www.gcwien-sb.at/", addr="Weingartenallee, 22, 1220, Wien"
- LC  (high, 236m, sim=1): name="Golf Club Wien-Süßenbrunn", addr="Weingartenallee 22, A-1220 Wien", courses=8.5(18)

### Golf Club Zillertal - Uderns (Austria, 1 courses)

- DB: lat=47.3181503, lon=11.8608932, addr="Golfstraße 1, Uderns", web="http://www.golf-zillertal.at", email="info@golf-zillertal.at", holes=[18]
- OEGV (high, sim=1, boost=+0.67[city:uderns,jaccard:0.67], Tirol 6271): name="GC Zillertal Uderns", web="http://www.golf-zillertal.at", email="info@golf-zillertal.at", holes=18, addr="Golfstraße 1\nA-6271  Uderns"
- OSM (medium, 307m, sim=1): name="Golfclub Zillertal Uderns", web="https://www.golf-zillertal.at/", addr="6271, Uderns"
- LC  (high, 106m, sim=1): name="Golfclub Zillertal Uderns", addr="Golfstraße 1, A-6271 Uderns", courses=Golfplatz Zillertal(18)

### Golf course Velden Köstenberg (Austria, 1 courses)

- DB: lat=46.6484419, lon=13.995652, addr="Golfweg 41, Köstenberg", web="http://www.golfvelden.at", email="office@golfvelden.at", holes=[18]
- OEGV (high, sim=0.588, boost=+0.4[city:köstenberg], Kärnten 9231): name="GC Velden Wörthersee", web="http://www.golfvelden.at", email="office@golfvelden.at", holes=18, addr="Golfweg 41\nA-9231 Köstenberg/Velden"
- OSM (high, 29m, sim=1): name="Golfanlage Velden Köstenberg", web="https://www.golfvelden.at/", addr="Golfweg, 41, 9231, Köstenberg"
- LC  (low, 521m, sim=0.235): name="Golfclub und Golfanlage Velden", addr="Golfweg 41, A-9231 Köstenberg/Velden", courses=GC Wörthersee/Velden(18)

### Golf Eichenheim - Kitzbühel (Austria, 1 courses)

- DB: lat=47.4229719, lon=12.4170675, addr="Eichenheim 8-9, Kitzbühel", web="http://www.eichenheim.com", email="rezeption@eichenheim.com", holes=[18]
- OEGV (high, sim=0.741, boost=+0.7[city:kitzbühel,jaccard:0.75], Tirol 6370): name="Golf Eichenheim Kitzbühel-Aurach", web="http://www.eichenheim.com", email="rezeption@eichenheim.com", holes=18, addr="Eichenheim 8\nA-6370 Kitzbühel-Aurach"
- OSM (low, 672m, sim=0.541): name="Golfplatz Eichenheim Kitzbühel-Aurach", web="https://www.eichenheim.com/", addr="Eichenheim, 8, 6370, Kitzbühel-Aurach"
- LC  (low, 407m, sim=0.5): name="Golf Eichenheim", addr="Eichenheim 8, A-6370 Kitzbühel-Aurach", courses=8.2(18)

### Golf Regau Attersee Traunsee (Austria, 1 courses)

- DB: lat=47.9557801, lon=13.6973825, addr="Eck 3, Regau", web="http://www.golfregau.at", email="office@golfregau.at", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:regau,jaccard:1.00], Oberösterreich 4845): name="Golf Regau Attersee-Traunsee", web="http://www.golfregau.at", email="office@golfregau.at", holes=18, addr="Eck 3\nA-4845 Regau"
- OSM (low, 559m, sim=0.739): name="Golfclub Attersee-Traunsee", web="http://www.atterseegolf.at/", addr=null
- LC  (low, 1071m, sim=1): name="Golf Regau - Attersee-Traunsee", addr="Eck 3, A-4845 Regau", courses=Golfclub Attersee-Traunsee(18)

### Golf- und Landclub Achensee (Austria, 1 courses)

- DB: lat=47.4388651, lon=11.6903071, addr="Naturparkstrasse 36, Pertisau", web="http://www.golfclub-achensee.at", email="info@golfclub-achensee.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:pertisau,db-name-substring,jaccard:1.00], Tirol 6213): name="Golf- und Landclub Achensee", web="http://www.golfclub-achensee.at", email="info@golfclub-achensee.at", holes=18, addr="Naturparkstrasse 36\nA-6213 Pertisau"
- OSM (medium, 345m, sim=1): name="Golf- und Landclub Achensee", web="https://www.golfclub-achensee.at/", addr="Pertisau, 35c, 6213, Pertisau"
- LC  (low, 449m, sim=0.81): name="Golf- & Landclub Achensee", addr="Clubhaus, A-6213 Pertisau", courses=Golf-& Landclub Achensee, Pertisau(18)

### Golf-Club Hainburg/Donau (Austria, 1 courses)

- DB: lat=48.1541919, lon=16.9694079, addr="Auf der Heide 762, Hainburg an der Donau", web="http://www.golfclub-hainburg.at", email="info@golfclub-hainburg.at", holes=[18]
- OEGV (high, sim=0.571, boost=+0.67[city:hainburg,jaccard:0.67], Niederösterreich 2410): name="Golf-Club Hainburg", web="http://www.golfclub-hainburg.at", email="info@golfclub-hainburg.at", holes=18, addr="Auf der Heide 762\nA-2410 Hainburg a. d. Donau"
- OSM (low, 154m, sim=0.571): name="Golfclub Hainburg", web="https://www.golfclub-hainburg.at/", addr="Auf der Heide, 762, 2410, Hainburg an der Donau"
- LC  (low, 79m, sim=0.571): name="Golfclub Hainburg", addr="Auf der Heide 762, NÖ-2410 Hainburg a. d. Donau", courses=Golf-Club Hainburg(18)

### Golfanlage Millstätter See (Austria, 1 courses)

- DB: lat=46.8193641, lon=13.5499254, addr="Am Golfplatz 1, Millstatt", web="http://www.golf-millstatt.at", email="office@golf-millstatt.at", holes=[18]
- OEGV (high, sim=1, boost=+0.6[city:millstatt,jaccard:0.50], Kärnten 9872): name="GC Millstätter See", web="http://www.golf-millstatt.at", email="office@golf-millstatt.at", holes=18, addr="Am Golfplatz 1\nA-9872 Millstatt"
- OSM (high, 108m, sim=1): name="Golfclub Millstätter See", web="https://www.golf-millstatt.at/", addr="Am Golfplatz, 1, 9872, Millstatt"
- LC  (medium, 288m, sim=1): name="GC Millstätter See", addr="Am Golfplatz 1, A-9872 Millstatt", courses=8.3(18)

### Golfanlage Nassfeld Golf (Austria, 1 courses)

- DB: lat=46.6349412, lon=13.2154915, addr="Waidegg 66, Jenig", web="http://www.nassfeld.golf", email="office@nassfeld.golf", holes=[18]
- OEGV (high, sim=1, boost=+0.67[city:waidegg,jaccard:0.67], Kärnten 9631): name="GC Nassfeld Golf", web="http://www.nassfeld.golf", email="office@nassfeld.golf", holes=18, addr="Waidegg 66\nA-9631 Waidegg"
- OSM (low, 290m, sim=0.5): name="Nassfeld Golf (Gailtal Golf)", web="http://www.gailtalgolf.eu", addr="Waidegg, 66, 9631, Waidegg"
- LC  (low, 821m, sim=1): name="Nassfeld Golf", addr="Waidegg 66, A-9631 Waidegg", courses=18-Loch Championship Course(18)

### Golfclub Almenland (Austria, 1 courses)

- DB: lat=47.2783827, lon=15.4935251, addr="Fladnitzer Straße 61, Passail", web="http://www.almenlandgolf.at", email="office@almenlandgolf.at", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:passail,jaccard:1.00], Steiermark 8162): name="GC Almenland", web="http://www.almenlandgolf.at", email="office@almenlandgolf.at", holes=18, addr="Fladnitzer Straße 61\nA-8162 Passail"
- OSM (high, 196m, sim=1): name="Golfclub Almenland", web="https://www.almenlandgolf.at/", addr=null
- LC  (low, 259m, sim=0.529): name="GC Almenland-Passail", addr="Tober 1, A-8163 Fladnitz/Teichalm", courses=8.0(18)

### Golfclub Am Mondsee (Austria, 1 courses)

- DB: lat=47.8321672, lon=13.3588138, addr="St. Lorenz 400, Mondsee", web="http://www.golfclubmondsee.at", email="office@golfclubmondsee.at", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:mondsee,jaccard:1.00], Oberösterreich 5310): name="GC Am Mondsee", web="http://www.golfclubmondsee.at", email="office@golfclubmondsee.at", holes=18, addr="St. Lorenz 400\nA-5310 Mondsee"
- OSM (high, 32m, sim=1): name="Golfclub am Mondsee", web="https://www.golfclubmondsee.at/", addr="400, 5310, Mondsee"
- LC  (high, 132m, sim=1): name="GC Am Mondsee", addr="St. Lorenz 400, A-5310 Mondsee", courses=8.5(18)

### Golfclub Ausseer Land (Austria, 2 courses)

- DB: lat=47.6102913, lon=13.758895, addr="Sommersbergseestraße 392, Bad Aussee", web="http://www.golfclub-ausseerland.at", email="mail@golfclub-ausseerland.at", holes=[18,9]
- OEGV (high, sim=0.917, boost=+0.6[city:aussee,jaccard:0.50], Steiermark 8990): name="Golfclub Ausseerland", web="http://www.golfclub-ausseerland.at", email="mail@golfclub-ausseerland.at", holes=9, addr="Sommersbergseestraße 392\nA-8990 Bad Aussee"
- OSM (medium, 380m, sim=0.917): name="Golf Club Ausseerland", web="https://www.golfclub-ausseerland.at/", addr=null
- LC  (low, 645m, sim=0.917): name="Golfclub Ausseerland", addr="Sommersbergseestraße 392, A-8990 Bad Aussee", courses=8.2(9)

### Golfclub Breitenfurt (Austria, 1 courses)

- DB: lat=48.1319854, lon=16.1766798, addr="Hauptstraße 58, Breitenfurt", web="http://www.golf-breitenfurt.at", email="office@golf-breitenfurt.at", holes=[18]
- OEGV (high, sim=0.524, boost=+0.6[city:breitenfurt,jaccard:0.50], Niederösterreich 2384): name="Golfplatz Breitenfurt", web="http://www.golf-breitenfurt.at", email="office@golf-breitenfurt.at", holes=9, addr="Hauptstrasse 58\nA-2384 Breitenfurt bei Wien"
- OSM (high, 8m, sim=1): name="Golfclub Breitenfurt", web="http://www.golf-breitenfurt.com/", addr="Hauptstraße, 58, 2384, Breitenfurt bei Wien"
- LC  (medium, 266m, sim=1): name="Golf Club Breitenfurt", addr="Hauptstrasse 58, A-2384 Breitenfurt", courses=8.0(9)

### Golfclub Donau (Austria, 2 courses)

- DB: lat=48.3310266, lon=14.0695289, addr="Golfplatzstraße 12, Feldkirchen/Donau", web="http://www.golfclub-donau.at", email="office@golfclub-donau.at", holes=[18,9]
- OEGV (high, sim=1, boost=+1.1[city:feldkirchen,db-name-substring,jaccard:1.00], Oberösterreich 4101): name="Golfclub Donau", web="http://www.golfclub-donau.at", email="office@golfclub-donau.at", holes=27, addr="Golfplatzstraße 12\nA-4101 Feldkirchen an der Donau"
- OSM (high, 131m, sim=1): name="Golfclub Donau", web="https://www.golfclub-donau.at/", addr=null
- LC  (high, 126m, sim=1): name="GC Donau", addr="Golfplatzstr. 12, A-4101 Linz-Feldkirchen", courses=9-Hole Lake Side Academy Course(9)

### Golfclub Drachenwand (Austria, 2 courses)

- DB: lat=47.8423697, lon=13.3297067, addr="Am Golfplatz 4, Mondsee", web="http://www.golf-drachenwand.com", email="office@golfdrachenwand.at", holes=[18,9]
- OEGV (high, sim=0.579, boost=+0.85[city:mondsee,name-token:mondsee,jaccard:0.50], Oberösterreich 5310): name="GC Drachenwand - Mondsee", web="http://www.golf-drachenwand.com", email="office@golfdrachenwand.at", holes=9, addr="Am Golfplatz 4\nA-5310 Mondsee"
- OSM (high, 198m, sim=1): name="Golfclub Drachenwand", web="http://www.gcdrachenwand.at", addr="Am Golfplatz, 4, 5310, Mondsee"
- LC  (high, 38m, sim=1): name="Golfclub Drachenwand", addr="Am Golfplatz 45310 Mondsee, Österreich", courses=GC Drachenwand St. Lorenz(9)

### Golfclub Erzherzog Johann Maria Lankowitz (Austria, 1 courses)

- DB: lat=47.0590105, lon=15.055513, addr="Puchbacherstrasse 109, Maria Lankowitz", web="http://golf-marialankowitz.at", email="office@golf-marialankowitz.at", holes=[18]
- OEGV (high, sim=0.5, boost=+0.67[city:maria,jaccard:0.67], Steiermark 8591): name="GC Erzherzog Johann", web="http://golf-marialankowitz.at", email="office@golf-marialankowitz.at", holes=18, addr="Puchbacherstr. 109\nA-8591 Maria Lankowitz"
- OSM (high, 94m, sim=1): name="Golf Club Erzherzog Johann Maria Lankowitz", web="https://www.golf-marialankowitz.at/", addr="Puchbacherstraße, 109, 8591, Maria Lankowitz"
- LC  (low, 535m, sim=0.5): name="GC Erzherzog Johann", addr="Puchbacherstr. 109, A--8591 Maria Lankowitz", courses=7.7(18)

### Golfclub Frühling (Austria, 4 courses)

- DB: lat=48.0374768, lon=16.5508334, addr="Am Golfplatz, Götzendorf an der Leitha", web="http://www.gcfruehling.at", email="office@gcfruehling.at", holes=[18,9]
- OEGV (high, sim=1, boost=+1.1[city:götzendorf,db-name-substring,jaccard:1.00], Niederösterreich 2434): name="Golfclub Frühling", web="http://www.gcfruehling.at", email="office@gcfruehling.at", holes=36, addr="Am Golfplatz\nA-2434 Götzendorf / Leitha"
- OSM (medium, 436m, sim=1): name="Golfclub Frühling", web="https://gcfruehling.at/", addr="Am Golfplatz, 2434, Götzendorf / Leitha"
- LC  (high, 112m, sim=1): name="Golfclub Frühling", addr="Am Golfplatz, A-2434 Götzendorf / Leitha", courses=GC Frühling Night Course(9)

### Golfclub Goldegg (Austria, 1 courses)

- DB: lat=47.313114, lon=13.0957786, addr="Maierhof 19, Goldegg", web="http://www.golfclub-goldegg.com", email="info@golfclub-goldegg.com", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:goldegg,jaccard:1.00], Salzburg 5622): name="GC Goldegg", web="http://www.golfclub-goldegg.com", email="info@golfclub-goldegg.com", holes=18, addr="Maierhof 19\nA-5622 Goldegg"
- OSM (high, 21m, sim=1): name="Golfclub Goldegg", web="https://www.golfclub-goldegg.com/", addr="19, 5622, Goldegg"
- LC  (low, 492m, sim=0.5): name="Golfclub Goldegg am See", addr="Maierhof 5, A-5622 Goldegg", courses=GC Goldegg(18)

### Golfclub Gut Murstätten (Austria, 3 courses)

- DB: lat=46.8570815, lon=15.547372, addr="Oedt 14, Oedt", web="http://www.gcmurstaetten.at", email="office@gcmurstaetten.at", holes=[9,18]
- OEGV (high, sim=1, boost=+0.4[jaccard:1.00], Steiermark 8403): name="GC Gut Murstätten", web="http://www.gcmurstaetten.at", email="office@gcmurstaetten.at", holes=27, addr="Oedt 14\nA-8403 Lebring"
- OSM (high, 71m, sim=0.714): name="Golfclub Murstätten", web="https://www.gcmurstaetten.at/", addr="14, 8403, Lebring"
- LC  (low, 598m, sim=1): name="Golfclub Gut Murstätten", addr="Neu Oedt 14, A-8403 Lebring", courses=GC Gut Murstätten Championship Course(18)

### Golfclub Herrensee (Austria, 1 courses)

- DB: lat=48.944298, lon=15.0446232, addr="Litschau", web="http://www.herrensee.at", email="info@gcherrensee.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:litschau,db-name-substring,jaccard:1.00], Niederösterreich 3874): name="Golfclub Herrensee", web="http://www.herrensee.at", email="info@gcherrensee.at", holes=18, addr="Buchenstraße 3\nA-3874 Litschau"
- OSM (low, 1096m, sim=1): name="Golfclub Herrensee", web="https://www.golfresort.at/de/herrensee", addr="Buchenstraße, 1, 3874, Litschau"
- LC  (low, 1024m, sim=1): name="Golfclub Herrensee", addr="Buchenstraße 3, A-3874 Litschau", courses=7.4(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - address: from oegv(high, sim=1)
```sql
UPDATE courses SET
  address = 'Buchenstraße 3\nA-3874 Litschau'
WHERE id IN (
  '5bcc4b17-10d8-4732-b839-137503d9124b'
);
```

### Golfclub Innsbruck-Igls 18 Loch Rinn Course (Austria, 1 courses)

- DB: lat=47.2456284, lon=11.4923826, addr="Oberdorf 11, Rinn", web="http://www.golfclub-innsbruck-igls.at", email="office@golfclub-innsbruck-igls.at", holes=[18]
- OEGV (medium, sim=0.519, boost=+0.4[city:rinn], Tirol 6074): name="Golfclub Innsbruck-Igls", web="http://www.golfclub-innsbruck-igls.at", email="office@golfclub-innsbruck-igls.at", holes=27, addr="Oberdorf 11\nA-6074 Rinn"
- OSM (high, 25m, sim=0.741): name="Golfclub Innsbruck-Igls - Kurs Rinn", web="https://www.golfclub-innsbruck-igls.at", addr="Oberdorf, 11, 6074, Rinn"
- LC  (high, 152m, sim=0.704): name="Golfclub Innsbruck-Igls - Rinn", addr="Oberdorf 11, A-6074 Rinn", courses=Championship course Rinn(18)

### Golfclub Kitzbüheler Alpen Westendorf (Austria, 1 courses)

- DB: lat=47.4244158, lon=12.2002032, addr="Holzham 120, Westendorf", web="http://www.gc-westendorf.com", email="office@gc-westendorf.com", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:westendorf,jaccard:1.00], Tirol 6363): name="GC Kitzbüheler Alpen Westendorf", web="http://www.gc-westendorf.com", email="office@gc-westendorf.com", holes=18, addr="Holzham 120\nA-6363 Westendorf"
- OSM (low, 444m, sim=0.737): name="Golfplatz Kitzbüheler Alpen Westendorf", web="https://www.gc-kitzbueheler-alpen.at/", addr=null
- LC  (high, 10m, sim=1): name="Golfclub Kitzbüheler Alpen Westendorf", addr="Holzham 120, 6363 Westendorf", courses=8.5(18)

### Golfclub Klagenfurt-Seltenheim (Austria, 2 courses)

- DB: lat=46.6544396, lon=14.2573204, addr="Seltenheimer Straße 137, Klagenfurt-Wölfnitz", web="http://www.golf-seltenheim.at", email="office@gcseltenheim.at", holes=[18,9]
- OEGV (high, sim=1, boost=+0.8[city:klagenfurt,jaccard:1.00], Kärnten 9061): name="GC Klagenfurt-Seltenheim", web="http://www.golf-seltenheim.at", email="office@gcseltenheim.at", holes=27, addr="Seltenheimer Straße 137\nA-9061 Klagenfurt-Wölfnitz"
- OSM (low, 810m, sim=1): name="Golfanlage Klagenfurt-Seltenheim", web="https://www.golf-seltenheim.at/", addr="Seltenheimerstraße, 137, 9061, Klagenfurt am Wörthersee"
- LC  (medium, 498m, sim=1): name="GC Klagenfurt-Seltenheim", addr="Seltenheimer Straße 137 A-9061 Klagenfurt", courses=Romantic course(9)

### Golfclub Klockerhof (Austria, 1 courses)

- DB: lat=47.0534907, lon=15.5253013, addr="Hahnhofweg 22, Hart bei Graz", web="https://www.moderngolf.at/", email="info@moderngolf.at", holes=[9]
- OEGV (high, sim=1, boost=+1.1[city:hart,db-name-substring,jaccard:1.00], Steiermark 8075): name="Golfclub Klockerhof", web="https://www.moderngolf.at/", email="info@moderngolf.at", holes=9, addr="Hahnhofweg 22\nA-8075  Hart bei Graz"
- OSM (low, 64m, sim=0.3): name="Modern Golf", web="https://www.moderngolf.at/", addr="Hahnhofweg, 22, 8075, Hart bei Graz"
- LC  (no-match, 252526m, sim=0.5): name="Golfclub Moarhof", addr="Schwaigs 42, A-6344 Walchsee", courses=GC Walchsee-Moarhof(9)

### Golfclub Lech (Austria, 1 courses)

- DB: lat=47.1988013, lon=10.1050711, addr="Zug 708, Lech", web="http://www.golf-arlberg.at", email="office@golf-arlberg.at", holes=[9]
- OEGV (high, sim=1, boost=+1.1[city:lech,db-name-substring,jaccard:1.00], Vorarlberg 6764): name="Golfclub Lech", web="http://www.golf-arlberg.at", email="office@golf-arlberg.at", holes=9, addr="Zug 708\nA-6764 Lech am Arlberg"
- OSM (low, 75m, sim=0.333): name="Golfclub Lech Arlberg", web="https://www.golf-arlberg.at/", addr=null
- LC  (low, 22m, sim=0.267): name="Golfclub Lech am Arlberg", addr="Zug 708, 6764 Lech", courses=9 Loch Anlage Lech/Zug(9)

### Golfclub Leopoldsdorf (Austria, 1 courses)

- DB: lat=48.1016897, lon=16.3997491, addr="Achauerstraße 6, Leopoldsdorf bei Wien", web="http://www.gcleopoldsdorf.at", email="office@gcleopoldsdorf.at", holes=[9]
- OEGV (high, sim=1, boost=+1.1[city:leopoldsdorf,db-name-substring,jaccard:1.00], Niederösterreich 2333): name="Golfclub Leopoldsdorf", web="http://www.gcleopoldsdorf.at", email="office@gcleopoldsdorf.at", holes=9, addr="Achauerstrasse 6\nA-2333 Leopoldsdorf"
- OSM (high, 29m, sim=1): name="Golfclub Leopoldsdorf", web="https://www.gcleopoldsdorf.at/", addr="Achauerstraße, 6, 2333, Leopoldsdorf"
- LC  (high, 182m, sim=1): name="Golfclub Leopoldsdorf", addr="Ödenburgerstrasse B16, A-2333 Leopoldsdorf", courses=7.5(9)

### Golfclub Lungau (Austria, 2 courses)

- DB: lat=47.0905531, lon=13.6734847, addr="Feldnergasse 165, Sankt Michael im Lungau", web=null, email=null, holes=[9,18]
- OEGV (high, sim=0.353, boost=+0.6[city:michael,jaccard:0.50], Salzburg 5582): name="GC Lungau/Katschberg", web="http://www.golfclub-lungau.com", email="gclungau@golf.at", holes=27, addr="Feldnergasse 165\nA-5582 St. Michael im Lungau"
- OSM (low, 364m, sim=0.353): name="Golfclub Lungau / Katschberg", web="https://www.golfclub-lungau.com/", addr="Feldnergasse, 165, 5582, Sankt Michael im Lungau"
- LC  (high, 227m, sim=1): name="Golfclub Lungau", addr="Feldnergasse 165, A-5582 St. Michael", courses=Golfclub Lungau 18-Loch-Anlage(18)

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from oegv(high, sim=0.353)
  - email: from oegv(high, sim=0.353)
```sql
UPDATE courses SET
  website = 'http://www.golfclub-lungau.com',
  email = 'gclungau@golf.at'
WHERE id IN (
  '481a8645-fd39-443a-bbff-559bd3ce2d0d',
  '69837a36-38cc-4ec3-acc7-c2298ae496e0'
);
```

### Golfclub Maria Theresia (Austria, 1 courses)

- DB: lat=48.1740208, lon=13.6370944, addr="Letten 5, Haag am Hausruck", web="http://gcmariatheresia.at", email="office@gcmariatheresia.at", holes=[18]
- OEGV (high, sim=0.667, boost=+0.9[city:haag,db-name-substring,jaccard:0.50], Oberösterreich 4680): name="Golfclub Maria Theresia Haag-H.", web="http://gcmariatheresia.at", email="office@gcmariatheresia.at", holes=18, addr="Letten 5\nA-4680 Haag am Hausruck"
- OSM (medium, 333m, sim=1): name="Golfclub Maria Theresia", web="https://gcmariatheresia.at/", addr=null
- LC  (high, 35m, sim=1): name="Golfclub Maria Theresia", addr="Letten 5, A-4680 Haag am Hausruck", courses=8.1(18)

### Golfclub Pfarkirchen im Mühlkreis (Austria, 4 courses)

- DB: lat=48.5020644, lon=13.8243721, addr="Pfarkirchen 12, Pfarkirchen", web="https://www.gcpfarrkirchen.at/", email=null, holes=[18,9]
- OEGV (high, sim=0.741, boost=+0.25[typo:pfarkirchen~pfarrkirchen], Oberösterreich 4141): name="GC Pfarrkirchen im Mühlviertel", web="http://www.gcpfarrkirchen.at", email="office@gcpfarrkirchen.at", holes=9, addr="Pfarrkirchen 12\nA-4141 Pfarrkirchen i. M."
- OSM (high, 239m, sim=0.741): name="Golfclub Pfarrkirchen im Mühlviertel", web="https://www.gcpfarrkirchen.at/", addr="Pfarrkirchen, 12, 4141, Pfarrkirchen im Mühlkreis"
- LC  (low, 255m, sim=0.741): name="GC Pfarrkirchen im Mühlviertel", addr="Pfarrkirchen 12, A-4141 Pfarrkirchen i. M.", courses=7.5(9)

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - email: from oegv(high, sim=0.741)
```sql
UPDATE courses SET
  email = 'office@gcpfarrkirchen.at'
WHERE id IN (
  '057ab210-53cb-46df-a041-282574f3d108',
  '5bd6d215-6321-4d88-a148-2f7567002966',
  '776419d7-e912-4527-bc63-707e3973efc1',
  '9d161362-90e5-4e06-91e2-ecc4484e179b'
);
```

### Golfclub Radstadt (Austria, 1 courses)

- DB: lat=47.3759811, lon=13.4666494, addr="Römerstraße 20, Radstadt", web="http://www.radstadtgolf.at", email="info@radstadtgolf.at", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:radstadt,jaccard:1.00], Salzburg 5550): name="GC Radstadt", web="http://www.radstadtgolf.at", email="info@radstadtgolf.at", holes=27, addr="Römerstraße 20\nA-5550 Radstadt"
- OSM (low, 608m, sim=0.421): name="GC Radstadt Tauerngold", web="http://radstadtgolf.at/", addr="Römerstrasse, 18, 5550, Radstadt"
- LC  (medium, 467m, sim=1): name="Golf Club Radstadt", addr="Römerstraße 20, A-5550 Radstadt", courses=18 Hole Course(18)

### Golfclub Römergolf (Austria, 2 courses)

- DB: lat=47.8584697, lon=13.1923948, addr="Kraimoosweg 5a, Eugendorf", web="http://www.roemergolf.at", email="office@roemergolf.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:eugendorf,db-name-substring,jaccard:1.00], Salzburg 5301): name="Golfclub Römergolf", web="http://www.roemergolf.at", email="office@roemergolf.at", holes=27, addr="Kraimoosweg 5 a\nA-5301 Eugendorf"
- OSM (medium, 463m, sim=1): name="Golfclub Römergolf", web="https://www.roemergolf.at/", addr="Kraimoosweg, 5a, 5302, Henndorf am Wallersee"
- LC  (high, 129m, sim=1): name="Golfclub Römergolf", addr="Kraimoosweg 5a, A-5301 Eugendorf - Kraiwiesen", courses=18 loch panoramakurs(18)

### Golfclub Salzburg Eugendorf (Austria, 1 courses)

- DB: lat=47.8671398, lon=13.1622418, addr="Schamingstraße 17, Eugendorf", web=null, email=null, holes=[18]
- OEGV (high, sim=0.444, boost=+0.6[city:eugendorf,jaccard:0.50], Salzburg 5301): name="Golfclub Salzburg", web="http://www.golfclub-salzburg.at", email="office@golf-eugendorf.at", holes=18, addr="Schamingstraße 17 / Golfplatz 1\nA-5301 Eugendorf"
- OSM (low, 568m, sim=0.5): name="Golfanlage Eugendorf", web="https://www.golf-eugendorf.at/", addr="Schamingstraße, 17, 5301, Eugendorf"
- LC  (low, 895m, sim=1): name="Golfclub Salzburg - Eugendorf", addr="Schamingstraße 17 / Golfplatz 1, A-5301 Eugendorf", courses=Championcourse Eugendorf(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from oegv(high, sim=0.444)
  - email: from oegv(high, sim=0.444)
```sql
UPDATE courses SET
  website = 'http://www.golfclub-salzburg.at',
  email = 'office@golf-eugendorf.at'
WHERE id IN (
  '8b0da080-7399-4604-ad9d-6c1ea2522951'
);
```

### Golfclub Schladming-Dachstein (Austria, 2 courses)

- DB: lat=47.4081213, lon=13.7441729, addr="Oberhaus 59, Oberhaus", web="http://www.schladming-golf.at", email="gccschladming@golf.at", holes=[18,9]
- OEGV (high, sim=1, boost=+0.4[jaccard:1.00], Steiermark 8967): name="Golfclub Schladming Dachstein", web="http://www.schladming-golf.at", email="gccschladming@golf.at", holes=18, addr="Oberhaus 59\nA-8967 Haus"
- OSM (low, 82m, sim=0.2): name="Golf und Country Club Dachstein-Tauern", web="https://www.schladming-golf.at/", addr="Oberhaus, 59, 8967, Haus"
- LC  (low, 106m, sim=0.357): name="Golf- & Countryclub Dachstein Tauern", addr="Oberhaus 59, A-8967 Haus", courses=GCC Dachstein Tauern(18)

### Golfclub Schloss Ebreichsdorf (Austria, 1 courses)

- DB: lat=47.9693378, lon=16.3917574, addr="Schloßallee 1, Ebreichsdorf", web="http://www.gcebreichsdorf.at", email="office@gcebreichsdorf.at", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:ebreichsdorf,jaccard:1.00], Niederösterreich 2483): name="GC Schloss Ebreichsdorf", web="http://www.gcebreichsdorf.at", email="office@gcebreichsdorf.at", holes=18, addr="Schlossallee 1\nA-2483 Ebreichsdorf"
- OSM (medium, 392m, sim=1): name="Golf Club Schloß Ebreichsdorf", web="https://www.gcebreichsdorf.at/", addr="Schloßallee, 1, 2483, Ebreichsdorf"
- LC  (medium, 290m, sim=1): name="GC Schloss Ebreichsdorf", addr="Schlossallee 1, A-2483 Ebreichsdorf", courses=7.2(18)

### Golfclub Schloss Finkenstein (Austria, 1 courses)

- DB: lat=46.5636937, lon=13.8510515, addr="Schloßrainweg 8, Gödersdorf", web="http://www.golf-finkenstein.at", email="office@gcfinkenstein.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:gödersdorf,db-name-substring,jaccard:1.00], Kärnten 9585): name="Golfclub Schloss Finkenstein", web="http://www.golf-finkenstein.at", email="office@gcfinkenstein.at", holes=18, addr="Schlossrainweg 8\nA-9585 Gödersdorf"
- OSM (low, 565m, sim=1): name="Golfanlage Schloss Finkenstein", web="https://www.golf-finkenstein.at/", addr="Schlossrainweg, 9585, Gödersdorf"
- LC  (high, 22m, sim=1): name="Golfclub Schloss Finkenstein", addr="Schlossrainweg 8, Kärnten-9585 Gödersdorf", courses=Alpe Adria Golf Schloss Finkenstein(18)

### Golfclub Schloss Schönborn (Austria, 10 courses)

- DB: lat=48.4719628, lon=16.1433414, addr="Schönborn 4, Göllersdorf", web="http://www.gcschoenborn.com", email="golfclub@gcschoenborn.com", holes=[18,9]
- OEGV (high, sim=1, boost=+1.1[city:schönborn,db-name-substring,jaccard:1.00], Niederösterreich 2013): name="Golfclub Schloss Schönborn", web="http://www.gcschoenborn.com", email="golfclub@gcschoenborn.com", holes=27, addr="A-2013 Schönborn 4"
- OSM (high, 4m, sim=1): name="Golfclub Schloss Schönborn", web="https://www.gcschoenborn.com/", addr="4, 2013, Göllersdorf"
- LC  (high, 35m, sim=1): name="Golfclub Schloss Schönborn", addr=", A-2013 Schönborn 4", courses=Schönborn 1-18(18)

### Golfclub Schönfeld (Austria, 2 courses)

- DB: lat=48.2731351, lon=16.7884954, addr="Am Golfplatz 1, Schönfeld im Marchfeld", web="http://www.gcschoenfeld.at", email="office@gcschoenfeld.at", holes=[9,18]
- OEGV (high, sim=1, boost=+1.1[city:schönfeld,db-name-substring,jaccard:1.00], Niederösterreich 2291): name="GOLFCLUB SCHÖNFELD", web="http://www.gcschoenfeld.at", email="office@gcschoenfeld.at", holes=27, addr="Am Golfplatz 1\nA-2291 Schönfeld"
- OSM (high, 62m, sim=1): name="Golfclub Schönfeld", web="http://www.gcschoenfeld.at", addr="Am Golfplatz, 1, 2291, Schönfeld"
- LC  (medium, 454m, sim=1): name="Golfclub Schönfeld", addr="Am Golfplatz 1, A-2291 Schönfeld", courses=The nine(9)

### Golfclub Spillern (Austria, 1 courses)

- DB: lat=48.396778, lon=16.2524131, addr="Wiesener Straße 100, Spillern", web="http://www.gcspillern.at", email="golf@gcspillern.at", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:spillern,jaccard:1.00], Niederösterreich 2104): name="GC Spillern", web="http://www.gcspillern.at", email="golf@gcspillern.at", holes=18, addr="Wiesener Straße 100\nA-2104 Spillern"
- OSM (high, 182m, sim=1): name="Golfclub Spillern", web="http://www.gcspillern.at", addr="Wiesener Straße, 100, 2104, Spillern"
- LC  (low, 613m, sim=1): name="Golfclub Spillern", addr="Wiesener Straße 100, A-2104 Spillern", courses=GC Spillern(18)

### Golfclub Tiroler Zugspitze (Austria, 1 courses)

- DB: lat=47.4076698, lon=10.9119458, addr="Am Rettensee 1, Ehrwald", web=null, email=null, holes=[18]
- OEGV (high, sim=0.176, boost=+0.8[city:ehrwald,jaccard:1.00], Tirol 6632): name="Golfclub Zugspitze-Tirol", web="http://www.tiroler-zugspitzgolf.at", email="info@tiroler-zugspitzgolf.com", holes=9, addr="Am Rettensee 1\nA-6632 Ehrwald-Lermoos"
- OSM (low, 844m, sim=0.8): name="Tiroler Zugspitzgolf", web="https://www.tiroler-zugspitzgolf.at/", addr="Am Rettensee, 1, 6632, Ehrwald"
- LC  (low, 588m, sim=0.176): name="Golfclub Zugspitze-Tirol", addr="Am Rettensee 1, A-6632 Ehrwald", courses=8.1(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from oegv(high, sim=0.176)
  - email: from oegv(high, sim=0.176)
```sql
UPDATE courses SET
  website = 'http://www.tiroler-zugspitzgolf.at',
  email = 'info@tiroler-zugspitzgolf.com'
WHERE id IN (
  '040e796c-f3c6-41f7-9275-61e196b30c57'
);
```

### Golfclub Trofaiach (Austria, 1 courses)

- DB: lat=47.42194, lon=14.9656414, addr="Sonnenweg 10, Trofaiach", web="http://www.reiting-trofaiach.at", email="golf@reiting-trofaiach.at", holes=[18]
- OEGV (high, sim=0.529, boost=+0.6[city:trofaiach,jaccard:0.50], Steiermark 8793): name="Golfclub Reiting Trofaiach", web="http://www.reiting-trofaiach.at", email="golf@reiting-trofaiach.at", holes=18, addr="Sonnenweg 10\nA-8793 Trofaiach"
- OSM (medium, 377m, sim=1): name="Golf Club Trofaiach", web="https://www.gc-trofaiach.at/", addr="Sonnenweg, 10, 8793, Gai/Schardorf"
- LC  (low, 855m, sim=0.208): name="Styrian Mountain Golf Reiting", addr="Golfplatzweg 1, A-8793 Gai-Schardorf", courses=Golf & Country Club Reiting(18)

### Golfclub Wien-Achau (Austria, 1 courses)

- DB: lat=48.0808991, lon=16.3768068, addr="Biedermannsdorfer Straße, Achau", web="http://www.gcachau.at", email="office@gcachau.at", holes=[9]
- OEGV (high, sim=0.5, boost=+0.67[city:achau,jaccard:0.67], Niederösterreich 2481): name="GC GolfRange Wien-Achau", web="http://www.gcachau.at", email="office@gcachau.at", holes=9, addr="Biedermannsdorfer Straße\nA-2481 Achau"
- OSM (low, 634m, sim=0.467): name="GolfRange Achau", web="https://www.gcachau.at/", addr="Biedermannsdorfer Straße, 2481, Achau"
- LC  (low, 654m, sim=0.467): name="GC GolfRange Achau", addr="Biedermannsdorfer Straße, A-2481 Achau", courses=GC GolfRange Wien-Achau(9)

### Golfclub Zell am See - Kaprun - Saalbach (Austria, 2 courses)

- DB: lat=47.287859, lon=12.7742678, addr="Golfstraße 25, Zell am See", web="http://www.golf-zellamsee.at", email="welcome@golf-zellamsee.at", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:zell,jaccard:1.00], Salzburg 5700): name="GC Zell am See-Kaprun-Saalbach", web="http://www.golf-zellamsee.at", email="welcome@golf-zellamsee.at", holes=36, addr="Golfstrasse 25\nA-5700 Zell am See"
- OSM (low, 60m, sim=0.692): name="Golfclub Zell am See - Kaprun - Saalbach-Hinterglemm", web="https://www.golf-zellamsee.at/", addr="Golfstraße, 25, 5700, Zell am See"
- LC  (low, 261m, sim=0.667): name="Golfclub Zell am See - Kaprun", addr="Golfstraße 25, 5700 Zell am See", courses=Schmittenhöhe Course(18)

### Golfpark Böhmerwald (Austria, 2 courses)

- DB: lat=48.6800231, lon=13.8597825, addr="Seitelschlag 50, Ulrichsberg", web="http://www.boehmerwaldgolf.at", email="office@boehmerwaldgolf.at", holes=[18,9]
- OEGV (high, sim=1, boost=+1.1[city:ulrichsberg,db-name-substring,jaccard:1.00], Oberösterreich 4161): name="Golfpark Böhmerwald", web="http://www.boehmerwaldgolf.at", email="office@boehmerwaldgolf.at", holes=18, addr="Seitelschlag 50\nA-4161 Ulrichsberg"
- OSM (high, 45m, sim=1): name="Golfpark Böhmerwald", web="https://boehmerwaldgolf.at/", addr="50, 4161, Ulrichsberg"
- LC  (medium, 409m, sim=1): name="Golfpark Böhmerwald", addr="Seitelschlag 50, A-4161 Ulrichsberg", courses=9 Hole Panorama Course(9)

### Golfpark Klopeinersee - Südkärnten (Austria, 1 courses)

- DB: lat=46.5886257, lon=14.5911887, addr="Am Golfpark, 7, Gabelsdorf", web="http://www.golfklopein.at", email="office@golfklopein.at", holes=[18]
- OEGV (high, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], Kärnten 9122): name="Golfpark Klopeinersee - Südkärnten", web="http://www.golfklopein.at", email="office@golfklopein.at", holes=18, addr="Am Golfpark 7\nA-9122 Grabelsdorf"
- OSM (low, 73m, sim=0.656): name="Golfpark Klopeinersee", web="https://www.golfklopein.at/", addr="Am Golfpark, 7, 9122, Grabelsdorf"
- LC  (low, 569m, sim=1): name="Golfpark Klopeinersee - Südkärnten", addr="Am Golfpark 7, 9122 Grabelsdorf", courses=8.1(18)

### Golfplatz Kitzbühel-Schwarzsee-Reith (Austria, 1 courses)

- DB: lat=47.4592227, lon=12.3485548, addr="Golfweg-Schwarzsee 35, Kitzbühel", web="http://golf-schwarzsee.com", email="golfschwarzsee@kitzbuehel.com", holes=[18]
- OEGV (high, sim=0.556, boost=+0.6[city:kitzbühel,jaccard:0.50], Tirol 6370): name="GC Kitzbühel-Schwarzsee", web="http://golf-schwarzsee.com", email="golfschwarzsee@kitzbuehel.com", holes=18, addr="Golfweg Schwarzsee 35\nA-6370 Kitzbühel"
- OSM (low, 278m, sim=0.833): name="Golfplatz Kitzbühel-Schwarzsee", web="http://www.golf-schwarzsee.at", addr="Golfweg-Schwarzsee, 35, 6370, Kitzbühel"
- LC  (low, 21m, sim=0.556): name="GC Kitzbühel-Schwarzsee", addr="Golfweg Schwarzsee 35, A-6370 Kitzbühel", courses=8.4(18)

### Golfrange Bockfliess - A348 (Austria, 1 courses)

- DB: lat=48.327434, lon=16.5771788, addr="Bockfliesser Strasse, Bockfliess", web="http://www.gcbockfliess.at", email="office@gcbockfliess.at", holes=[18]
- OEGV (high, sim=0.8, boost=+0.27[jaccard:0.67], Niederösterreich 2213): name="GC GolfRange Bockfließ", web="http://www.gcbockfliess.at", email="office@gcbockfliess.at", holes=18, addr="Bockfließerstraße\nA-2213 Bockfließ"
- OSM (high, 119m, sim=0.8): name="GolfClub GolfRange Bockfließ", web="https://www.gcbockfliess.at/", addr="Bockfließerstraße, 2213, Bockfließ"
- LC  (low, 323m, sim=0.8): name="GC GolfRange Bockfließ", addr="Wendlingerhof 2213, Bockfließ", courses=8.0(18)

### Golfrange Schwechat (Austria, 2 courses)

- DB: lat=48.1291825, lon=16.4961844, addr="Brucker Bundesstrasse 80, Schwechat", web="http://www.gcschwechat.at", email="office@gcschwechat.at", holes=[9]
- OEGV (high, sim=0.474, boost=+0.6[city:schwechat,jaccard:0.50], Niederösterreich 2320): name="Golfclub Schwechat", web="http://www.gcschwechat.at", email="office@gcschwechat.at", holes=9, addr="Brucker Bundesstrasse 80\nA-2320 Schwechat"
- OSM (low, 84m, sim=0.613): name="GolfRange Schwechat (9 Loch Kurs)", web="https://golfrange.at/Schwechat", addr="Brucker Bundesstraße, 80, 2320, Schwechat"
- LC  (high, 219m, sim=1): name="GC GolfRange Schwechat", addr="Budapesterstrasse 80, Ö-2320 Schwechat", courses=GC GolfRange Wien-Schwechat(9)

### Golfrange Tuttendörfl (Austria, 1 courses)

- DB: lat=48.3171555, lon=16.3473611, addr="Tuttenhofstraße 140, Langenzersdorf", web="http://www.gctuttendoerfl.at", email="office@gctuttendoerfl.at", holes=[18]
- OEGV (high, sim=0.808, boost=+0.67[city:langenzersdorf,jaccard:0.67], Niederösterreich 2103): name="GC GolfRange Wien-Tuttendörfl", web="http://www.gctuttendoerfl.at", email="office@gctuttendoerfl.at", holes=9, addr="Tuttenhofstrasse 140\nA-2103 Langenzersdorf"
- OSM (low, 974m, sim=1): name="GolfRange Tuttendörfl", web="https://gctuttendoerfl.at", addr="Tuttenhofstraße, 2103, Langenzersdorf"
- LC  (low, 1109m, sim=1): name="GC GolfRange Tuttendörfl", addr="Tuttenhofstrasse, A-2103 Langenzersdorf", courses=GC GolfRange Wien-Tuttendörfl(9)

### GP Metzenhof (Austria, 1 courses)

- DB: lat=48.1296536, lon=14.4364543, addr="Doerfling 2, Kronstorf-Steyr", web="http://www.metzenhof.at", email="golf@metzenhof.at", holes=[18]
- OEGV (high, sim=0.667, boost=+0.6[city:kronstorf,jaccard:0.50], Oberösterreich 4484): name="Golfpark Metzenhof", web="http://www.metzenhof.at", email="golf@metzenhof.at", holes=18, addr="Dörfling 2\nA-4484 Kronstorf"
- OSM (low, 82m, sim=0.667): name="Golfpark Metzenhof", web="http://www.golfpark-metzenhof.at/", addr=null
- LC  (low, 260m, sim=0.667): name="Golfpark Metzenhof", addr="Dörfling 2, A-4484 Kronstorf", courses=7.7(18)

### GP Mieminger Plateau (Austria, 1 courses)

- DB: lat=47.3083099, lon=10.9914001, addr="Obermieming  141 e\nA-6414 Mieming/Tirol", web="http://www.golfmieming.at", email="info@golfmieming.at", holes=[18]
- OEGV (high, sim=0.85, boost=+1.1[city:mieming,plz:6414,jaccard:1.00], Tirol 6414): name="GC Mieminger Plateau", web="http://www.golfmieming.at", email="info@golfmieming.at", holes=27, addr="Obermieming  141 e\nA-6414 Mieming/Tirol"
- OSM (high, 31m, sim=0.769): name="Golfpark Mieminger Plateau", web="https://www.golfmieming.at/", addr="Obermieming, 141 e, 6414, Mieming"
- LC  (high, 145m, sim=0.769): name="Golfpark Mieminger Plateau", addr="Obermieming 141 e, A-6414, Mieming", courses=9 Parkside(9)

### Grazer Golf Club Thalersee (Austria, 2 courses)

- DB: lat=47.0667183, lon=15.366818, addr="Golfweg 1, Thal", web="http://www.grazergolf.at", email="office@grazergolf.at", holes=[18,9]
- OEGV (high, sim=1, boost=+0.27[jaccard:0.67], Steiermark 8051): name="Grazer Golfclub Thalersee", web="http://www.grazergolf.at", email="office@grazergolf.at", holes=27, addr="Golfweg 1\nA-8051 Graz"
- OSM (low, 617m, sim=0.552): name="Grazer Golfclub Thalersee - Kurs Windhof", web="http://www.golfclub-thalersee.at", addr="Golfweg, 1, 8051, Graz"
- LC  (low, 265m, sim=0.563): name="Golfclub Thalersee", addr="Golfweg 1, A-8051 Graz", courses=Golfclub Thalersee Kurs Windhof(18)

### Gut Freiberg (Austria, 1 courses)

- DB: lat=47.1268386, lon=15.6704897, addr="Freiberg Weg 32, Gleisdorf", web="http://www.gc-gut-freiberg.at", email="office@gc-gut-freiberg.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:gleisdorf,db-name-substring,jaccard:1.00], Steiermark 8200): name="GC Gut Freiberg", web="http://www.gc-gut-freiberg.at", email="office@gc-gut-freiberg.at", holes=18, addr="Freiberg 32\nA-8200 Gleisdorf"
- OSM (medium, 479m, sim=1): name="Golfclub Gut Freiberg", web="https://www.gc-gut-freiberg.at/", addr="Freiberg, 32, 8200, Gleisdorf"
- LC  (medium, 307m, sim=1): name="Golfclub Gut Freiberg", addr="Freiberg 32, A-8200 Gleisdorf", courses=GC Gut Freiberg(18)

### Haugschlag-Waldviertel - A311 (Austria, 2 courses)

- DB: lat=48.9989226, lon=15.0487639, addr="Haugschlag 160, Haugschlag", web="http://www.golfresort.at", email="info@golfresort.at", holes=[18]
- OEGV (high, sim=0.815, boost=+0.67[city:haugschlag,jaccard:0.67], Niederösterreich 3874): name="Golfclub Haugschlag-Waldviertel", web="http://www.golfresort.at", email="info@golfresort.at", holes=36, addr="Haugschlag 160\nA-3874 Haugschlag 160"
- OSM (low, 257m, sim=0.815): name="Golfclub Haugschlag-Waldviertel", web="https://www.golfresort.at/", addr="160, 3874, Haugschlag"
- LC  (low, 592m, sim=0.37): name="Golfresort Haugschlag", addr="A-3874 Haugschlag 160", courses=Haugschlag(18)

### Herzog Tassilo (Austria, 1 courses)

- DB: lat=48.0368496, lon=14.1961328, addr="Blankenberger Strasse 30, Bad Hall", web="http://www.gcherzogtassilo.at", email="info@gcherzogtassilo.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:hall,db-name-substring,jaccard:1.00], Oberösterreich 4540): name="Golfclub Herzog Tassilo", web="http://www.gcherzogtassilo.at", email="info@gcherzogtassilo.at", holes=18, addr="Blankenberger Straße 30\nA-4540 Bad Hall"
- OSM (medium, 496m, sim=1): name="Golfclub Herzog Tassilo", web="https://www.gcherzogtassilo.at/", addr=null
- LC  (low, 995m, sim=1): name="Golfclub Herzog Tassilo", addr="Blankenberger Straße 30, A-4540 Bad Hall", courses=8.2(18)

### Jacques Lemans Golfclub St. Veit Längsee (Austria, 1 courses)

- DB: lat=46.7909089, lon=14.4136288, addr="Unterlatschach 25, Sankt Georgen am Längsee", web="http://www.golfstveit.at", email="office@golfstveit.at", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:georgen,jaccard:1.00], Kärnten 9313): name="Jacques-Lemans Golfclub St. Veit-Längsee", web="http://www.golfstveit.at", email="office@golfstveit.at", holes=18, addr="Unterlatschach 25\nA-9313  St. Georgen am Längsee"
- OSM (medium, 291m, sim=1): name="Jacques Lemans Golfclub St. Veit-Längsee", web="https://www.golfstveit.at/", addr="25, 9313, St. Georgen am Längsee"
- LC  (low, 599m, sim=1): name="Jacques-Lemans Golfclub St. Veit-Längsee", addr="Unterlatschach 25, A-9313 St. Georgen am Längsee", courses=7.8(18)

### Kaiserwinkl Golf Kössen (Austria, 1 courses)

- DB: lat=47.6559491, lon=12.3917449, addr="Mühlau 1, Kössen", web="http://www.golf-koessen.at", email="club@golf-koessen.at", holes=[18]
- OEGV (high, sim=0.621, boost=+1[city:kössen,db-name-substring,jaccard:0.75], Tirol 6345): name="Kaiserwinkl Golf Kössen - Lärchenhof", web="http://www.golf-koessen.at", email="club@golf-koessen.at", holes=18, addr="Mühlau 1\nA-6345 Kössen"
- OSM (high, 219m, sim=1): name="Kaiserwinkl Golf Kössen", web="https://www.golf-koessen.at/", addr="Mühlau, 1, 6345, Kössen"
- LC  (high, 107m, sim=1): name="Kaiserwinkl Golf Kössen", addr="Mühlau 1, Tirol-6345 Kössen", courses=8.3(18)

### Kärntner Golfclub Dellach (Austria, 1 courses)

- DB: lat=46.6190615, lon=14.1100439, addr="Golfstraße 3, Maria Wörth", web="http://www.kgcdellach.at", email="office@kgcdellach.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:maria,db-name-substring,jaccard:1.00], Kärnten 9082): name="KÄRNTNER GOLFCLUB DELLACH", web="http://www.kgcdellach.at", email="office@kgcdellach.at", holes=18, addr="Golfstraße 3\nA-9082 MARIA WÖRTH"
- OSM (low, 706m, sim=1): name="Kärntner Golfclub Dellach", web="https://kgcdellach.at/", addr="Golfstraße, 3, 9082, Maria Wörth"
- LC  (low, 961m, sim=1): name="Kärntner Golfclub Dellach", addr="Golfstraße 3, A-9082 MARIA WÖRTH", courses=Kartner Golf platz(18)

### Lengenfeld (Austria, 1 courses)

- DB: lat=48.4729363, lon=15.5931017, addr="Am Golfplatz 1\nA-3552 Lengenfeld", web="http://www.golflengenfeld.at", email="office@golflengenfeld.at", holes=[9]
- OEGV (high, sim=1, boost=+1.4[city:lengenfeld,plz:3552,db-name-substring,jaccard:1.00], Niederösterreich 3552): name="Golfclub Lengenfeld", web="http://www.golflengenfeld.at", email="office@golflengenfeld.at", holes=36, addr="Am Golfplatz 1\nA-3552 Lengenfeld"
- OSM (low, 1835m, sim=1): name="Golfclub Lengenfeld", web="http://www.golflengenfeld.at/", addr="Am Golfplatz, 1, 3552, Lengenfeld"
- LC  (low, 1522m, sim=1): name="Golfclub Lengenfeld", addr="Am Golfplatz 1, A-3552 Lengenfeld", courses=Donauland(18)

### Lengenfeld - A320 (Austria, 2 courses)

- DB: lat=48.4729172, lon=15.6226387, addr="Am Golfplatz 1, Lengenfeld", web="http://www.golflengenfeld.at", email="office@golflengenfeld.at", holes=[18]
- OEGV (high, sim=0.667, boost=+0.6[city:lengenfeld,jaccard:0.50], Niederösterreich 3552): name="Golfclub Lengenfeld", web="http://www.golflengenfeld.at", email="office@golflengenfeld.at", holes=36, addr="Am Golfplatz 1\nA-3552 Lengenfeld"
- OSM (low, 342m, sim=0.667): name="Golfclub Lengenfeld", web="http://www.golflengenfeld.at/", addr="Am Golfplatz, 1, 3552, Lengenfeld"
- LC  (low, 656m, sim=0.667): name="Golfclub Lengenfeld", addr="Am Golfplatz 1, A-3552 Lengenfeld", courses=Donauland(18)

### Linsberg Golf (Austria, 1 courses)

- DB: lat=47.7394389, lon=16.2048388, addr="Föhrenauerstraße 8/4, 2821 Lanzenkirchen", web="http://www.golfarea36.at", email="office@gclinsberg.at", holes=[18]
- OEGV (high, sim=1, boost=+0.9[city:lanzenkirchen,plz:2821,jaccard:0.50], Niederösterreich 2821): name="Golfclub Linsberg", web="http://www.golfarea36.at", email="office@gclinsberg.at", holes=18, addr="Föhrenauerstraße 8/4\nA-2821 Lanzenkirchen"
- OSM (low, 550m, sim=1): name="Linsberg Golf", web="https://golfarea36.at/start-lg/", addr=null
- LC  (low, Infinitym, sim=1): name="Golfclub Linsberg", addr="Föhrenauer Straße 8/4 2821 Lanzenkirchen", courses=Golfclub Linsberg Course(18)

### Linz Sankt Florian - A402 (Austria, 1 courses)

- DB: lat=48.1990517, lon=14.4209924, addr="Tillysburg 28, St. Florian", web="http://www.gclinz.at", email="office@gclinz.at", holes=[18]
- OEGV (high, sim=0.652, boost=+0.67[city:florian,jaccard:0.67], Oberösterreich 4490): name="GC Linz - St. Florian", web="http://www.gclinz.at", email="office@gclinz.at", holes=18, addr="Tillysburg 28\nA-4490 St. Florian"
- OSM (low, 415m, sim=0.652): name="Golfclub Linz St. Florian", web="http://gclinz.at", addr=null
- LC  (low, 130m, sim=0.652): name="Golf Club Linz St. Florian", addr="Tillysburg 28, A-4490 St. Florian", courses=GC Linz(18)

### Linzer GC Luftenberg (Austria, 1 courses)

- DB: lat=48.2721242, lon=14.4176837, addr="Am Luftenberg 1a, Luftenberg", web="http://www.gclinz-luftenberg.at", email="office@gclinz-luftenberg.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:luftenberg,db-name-substring,jaccard:1.00], Oberösterreich 4225): name="Linzer GC Luftenberg", web="http://www.gclinz-luftenberg.at", email="office@gclinz-luftenberg.at", holes=18, addr="Am Luftenberg 1 a\nA-4225 Luftenberg"
- OSM (high, 100m, sim=1): name="Linzer Golfclub Luftenberg", web="https://www.gclinz-luftenberg.at/", addr="Am Luftenberg, 1a, 4225, Luftenberg an der Donau"
- LC  (low, 652m, sim=1): name="Linzer GC Luftenberg", addr="Am Luftenberg 1 a, A-4222 Luftenberg", courses=8.9(18)

### Maria Theresia (Austria, 1 courses)

- DB: lat=48.1740208, lon=13.6370944, addr="Letten 5, Haag am Hausruck", web="http://gcmariatheresia.at", email="office@gcmariatheresia.at", holes=[18]
- OEGV (high, sim=0.667, boost=+0.9[city:haag,db-name-substring,jaccard:0.50], Oberösterreich 4680): name="Golfclub Maria Theresia Haag-H.", web="http://gcmariatheresia.at", email="office@gcmariatheresia.at", holes=18, addr="Letten 5\nA-4680 Haag am Hausruck"
- OSM (medium, 333m, sim=1): name="Golfclub Maria Theresia", web="https://gcmariatheresia.at/", addr=null
- LC  (high, 35m, sim=1): name="Golfclub Maria Theresia", addr="Letten 5, A-4680 Haag am Hausruck", courses=8.1(18)

### Mittersill (Austria, 1 courses)

- DB: lat=47.2814957, lon=12.5050879, addr="Felben 133, Mittersill", web="http://www.gc-hohetauern.at", email="info@gc-hohetauern.at", holes=[18]
- OEGV (high, sim=0.286, boost=+0.7[city:mittersill,db-name-substring], Salzburg 5730): name="Golfclub Nationalpark Hohe Tauern Mittersill", web="http://www.gc-hohetauern.at", email="info@gc-hohetauern.at", holes=18, addr="Felben 133\nA-5730 Mittersill"
- OSM (low, 194m, sim=0.083): name="Golfclub Nationalpark Hohe Tauern", web="https://www.golfclub-nationalpark-hohetauern.at/de/", addr=null
- LC  (low, 7m, sim=0.083): name="Golfclub Nationalpark Hohe Tauern", addr="Felben 133, A-5730 Mittersill", courses=Golf Club Mittersill(18)

### Moosburg-Pörtschach (Austria, 5 courses)

- DB: lat=46.6667008, lon=14.1557983, addr="Golfstraße 2, Moosburg", web=null, email=null, holes=[18,9]
- OEGV (high, sim=0.421, boost=+0.6[city:moosburg,jaccard:0.50], Kärnten 9062): name="Golfclub Moosburg", web="http://www.golfclubmoosburg.at", email="office@golfmoosburg.at", holes=27, addr="Golfstraße 2\nA-9062 Moosburg"
- OSM (low, 154m, sim=0.655): name="Golfplatz Moosburg - Pörtschach", web="https://www.golfmoosburg.at/", addr="Golfstraße, 2, 9062, Moosburg"
- LC  (medium, 470m, sim=1): name="GC Moosburg Pörtschach", addr="Golfstrasse 2, A-9062 Moosburg", courses=9 Loch Akademieplatz(9)

**Proposed UPDATE** (alle 5 course rows for klub, overall=high):
  - website: from oegv(high, sim=0.421)
  - email: from oegv(high, sim=0.421)
```sql
UPDATE courses SET
  website = 'http://www.golfclubmoosburg.at',
  email = 'office@golfmoosburg.at'
WHERE id IN (
  '5fcf61c3-ca9f-4707-a3f6-ed038b2b0ddb',
  '6eea21e4-d8b8-4074-84e1-e343fb20e5c9',
  '7579c0ed-0fae-4004-92b1-17498537c1b7',
  '7992f810-3e58-48a6-b2c0-948bce743e5c',
  'e7fd17a7-f8d2-4fa3-9352-0beaa9da0379'
);
```

### Murau Kreischberg (Austria, 1 courses)

- DB: lat=47.1019419, lon=14.1144387, addr="Am Golfplatz 1, St. Georgen ob Murau", web="http://www.golf-murau-kreischberg.at", email="golf@kreischberg.at", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:georgen,jaccard:1.00], Steiermark 8861): name="Golfclub Murau-Kreischberg", web="http://www.golf-murau-kreischberg.at", email="golf@kreischberg.at", holes=18, addr="Am Golfplatz 1\nA-8861 St. Georgen/Murau"
- OSM (high, 47m, sim=1): name="Golf Club Murau Kreischberg", web="https://www.golf-murau-kreischberg.at/", addr="Am Golfplatz, 1, 8861, St. Georgen ob Murau"
- LC  (low, 551m, sim=1): name="Golfclub Murau-Kreischberg", addr="Am Golfplatz 1, A-8861 St. Georgen/Murau", courses=8.9(18)

### Murhof (Austria, 1 courses)

- DB: lat=47.2715315, lon=15.3260206, addr="Frohnleiten", web="http://www.murhof.at", email="office@murhof.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:frohnleiten,db-name-substring,jaccard:1.00], Steiermark 8130): name="Murhof", web="http://www.murhof.at", email="office@murhof.at", holes=18, addr="Adriach-Rabenstein 53\nA-8130 Frohnleiten"
- OSM (no-match, 41092m, sim=0.5): name="Golfclub Murtal", web="https://www.gcmurtal.at/", addr="Frauenbachstraße, 51, 8724, Spielberg"
- LC  (low, 231925m, sim=0.714): name="Golfclub Moarhof", addr="Schwaigs 42, A-6344 Walchsee", courses=GC Walchsee-Moarhof(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - address: from oegv(high, sim=1)
```sql
UPDATE courses SET
  address = 'Adriach-Rabenstein 53\nA-8130 Frohnleiten'
WHERE id IN (
  'dd63a7ae-896e-425a-9810-465f2d7e692c'
);
```

### Neulengbach (Austria, 1 courses)

- DB: lat=48.1971022, lon=15.9062674, addr="Berging1, Neulengbach", web="http://www.golfclub-neulengbach.at", email="sekretariat@golfclub-neulengbach.at", holes=[9]
- OEGV (high, sim=1, boost=+1.1[city:neulengbach,db-name-substring,jaccard:1.00], Niederösterreich 3040): name="Golfclub Neulengbach", web="http://www.golfclub-neulengbach.at", email="sekretariat@golfclub-neulengbach.at", holes=9, addr="Berging 1\nA-3040 Neulengbach"
- OSM (low, 4085m, sim=1): name="Golfclub Neulengbach", web="https://www.golfclub-neulengbach.at/", addr="3040, Neulengbach"
- LC  (no-match, 115920m, sim=0.455): name="Golfschaukel Stegersbach", addr="Zum Golfzentrum 8, A-8292 Neudauberg", courses=Panorama course(45)

### Neusiedlersee-Donnerskirchen - A101 (Austria, 1 courses)

- DB: lat=47.8809268, lon=16.6648855, addr="Am Golfplatz 1, Donnerskirchen", web="http://www.gcdonnerskirchen.at", email="office@gcdonnerskirchen.at", holes=[18]
- OEGV (high, sim=0.848, boost=+0.67[city:donnerskirchen,jaccard:0.67], Burgenland 7082): name="GC Neusiedlersee - Donnerskirchen", web="http://www.gcdonnerskirchen.at", email="office@gcdonnerskirchen.at", holes=18, addr="Am Golfplatz 1\nA-7082 Donnerskirchen"
- OSM (high, 52m, sim=0.848): name="Golf Club Neusiedlersee-Donnerskirchen", web="https://www.gcdonnerskirchen.at/", addr="Am Golfplatz, 1, 7082, Donnerskirchen"
- LC  (low, 633m, sim=0.848): name="GC Neusiedlersee - Donnerskirchen", addr="Am Golfplatz 1, A-7082 Donnerskirchen", courses=7.1(18)

### Öko-Golf-Neusiedler Csarda (Austria, 1 courses)

- DB: lat=47.9501317, lon=16.8222204, addr="Obere Wiesn 1, Neusiedl am See", web="http://www.csardagolf.at", email=null, holes=[9]
- OEGV (high, sim=1, boost=+1.1[city:neusiedl,db-name-substring,jaccard:1.00], Burgenland 7100): name="Öko-Golf-Neusiedler Csarda", web=null, email=null, holes=9, addr="Obere Wiesen 1\nA-7100 Neusiedl am See"
- OSM (high, 42m, sim=1): name="Öko-Golf-Neusiedler Csarda", web="http://www.csardagolf.at", addr="Obere Wiesen, 1, 7100, Neusiedl am See"
- LC  (medium, 289m, sim=1): name="Öko Golf - Neusiedler Csarda", addr="Obere Wiesen 1 , A-7100 Neusiedl am See", courses=Öko-Golf-Neusiedler Csarda(9)

### Olympia Golf Igls (Austria, 1 courses)

- DB: lat=47.2245932, lon=11.4241736, addr="Badhausstraße 60 b, Innsbruck/Igls", web="http://www.olympia-golf.at", email="office@olympia-golf.at", holes=[9]
- OEGV (high, sim=1, boost=+0.67[city:igls,jaccard:0.67], Tirol 6080): name="Olympia Golfclub Igls", web="http://www.olympia-golf.at", email="office@olympia-golf.at", holes=9, addr="Badhausstraße  60 b\nA-6080 Igls"
- OSM (high, 37m, sim=1): name="Olympia Golf Club Igls", web="https://www.olympia-golf.at/", addr="Badhausstraße, 60b, 6080, Innsbruck"
- LC  (medium, 358m, sim=1): name="Olympia Golf Igls", addr="Badhausstraße 60 b, A-6080 Igls", courses=Olympia Golfclub Igls(9)

### Open Golf St. Johann Alpendorf (Austria, 1 courses)

- DB: lat=47.3803885, lon=13.2170154, addr="Urreiting 105, St. Johann", web="http://www.golfsanktjohann.at", email="info@golfsanktjohann.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:johann,db-name-substring,jaccard:1.00], Salzburg 5600): name="OPEN GOLF St. Johann Alpendorf", web="http://www.golfsanktjohann.at", email="info@golfsanktjohann.at", holes=18, addr="Urreiting 105\nA-5600 St. Johann im Pongau"
- OSM (high, 117m, sim=1): name="OPEN GOLF St. Johann Alpendorf", web="https://www.golfsanktjohann.at/", addr="Urreiting, 105, 5600, St. Johann im Pongau"
- LC  (high, 203m, sim=0.792): name="Golf Club St. Johann-Alpendorf", addr="Urreiting 105, 5600 Sankt Johann", courses=Turnierplatz (Blue Course)(9)

### Pfarrkirchen (Austria, 1 courses)

- DB: lat=48.5032202, lon=13.8259523, addr="Pfarrkirchen", web="http://www.gcpfarrkirchen.at", email="office@gcpfarrkirchen.at", holes=[9]
- OEGV (high, sim=0.444, boost=+0.9[city:pfarrkirchen,db-name-substring,jaccard:0.50], Oberösterreich 4141): name="GC Pfarrkirchen im Mühlviertel", web="http://www.gcpfarrkirchen.at", email="office@gcpfarrkirchen.at", holes=9, addr="Pfarrkirchen 12\nA-4141 Pfarrkirchen i. M."
- OSM (low, 82m, sim=0.444): name="Golfclub Pfarrkirchen im Mühlviertel", web="https://www.gcpfarrkirchen.at/", addr="Pfarrkirchen, 12, 4141, Pfarrkirchen im Mühlkreis"
- LC  (low, 128m, sim=0.444): name="GC Pfarrkirchen im Mühlviertel", addr="Pfarrkirchen 12, A-4141 Pfarrkirchen i. M.", courses=7.5(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - address: from oegv(high, sim=0.444)
```sql
UPDATE courses SET
  address = 'Pfarrkirchen 12\nA-4141 Pfarrkirchen i. M.'
WHERE id IN (
  'a9fb9608-2cd7-4866-91b4-583859965758'
);
```

### Riefensberg (Austria, 1 courses)

- DB: lat=47.5166836, lon=9.9564012, addr="Unterlitten 3a, Riefensberg", web="http://www.golf-bregenzerwald.com", email="office@golf-bregenzerwald.com", holes=[18]
- OEGV (high, sim=0.55, boost=+0.7[city:riefensberg,db-name-substring], Vorarlberg 6943): name="Golf Club Riefensberg-Sulzberg", web="http://www.golf-bregenzerwald.com", email="office@golf-bregenzerwald.com", holes=18, addr="Unterlitten 3 a\nA-6943 Riefensberg"
- OSM (low, 48m, sim=0.256): name="Golfpark Bregenzerwald / Golfclub Riefensberg-Sulzberg", web="https://golf-bregenzerwald.com/", addr="Unterlitten, 3a, 6943, Riefensberg"
- LC  (low, 390m, sim=0.227): name="Golfpark Bregenzerwald", addr="Unterlitten 3 a, A-6943 Riefensberg", courses=18 Loch Platz(18)

### Sankt Lorenzen - A612 (Austria, 1 courses)

- DB: lat=47.4787177, lon=15.3398583, addr="Gassing 22, St. Lorenzen/Muerztal", web="http://www.gclorenzen.at", email="office@gclorenzen.at", holes=[9]
- OEGV (high, sim=0.579, boost=+0.6[city:lorenzen,jaccard:0.50], Steiermark 8642): name="GC St.Lorenzen", web="http://www.gclorenzen.at", email="office@gclorenzen.at", holes=9, addr="Gassing 22\nA-8642 St.Lorenzen/Mürztal"
- OSM (low, 219m, sim=0.579): name="Golfclub St. Lorenzen", web="https://www.gclorenzen.at/", addr=null
- LC  (low, 218m, sim=0.579): name="Golfclub St. Lorenzen", addr="Gassing 22, A-8642 St.Lorenzen/Mürztal", courses=GC St.Lorenzen(9)

### Schloß  Frauenthal (Austria, 1 courses)

- DB: lat=46.8152176, lon=15.2495804, addr="Ulrichsberg 7, Deutschlandsberg", web="http://www.gcfrauenthal.at", email="office@gcfrauenthal.at", holes=[18]
- OEGV (high, sim=1, boost=+0.8[city:deutschlandsberg,jaccard:1.00], Steiermark 8530): name="GC Schloß Frauenthal", web="http://www.gcfrauenthal.at", email="office@gcfrauenthal.at", holes=18, addr="Ulrichsberg 7\nA-8530 Deutschlandsberg"
- OSM (medium, 410m, sim=1): name="Golfclub Schloss Frauenthal", web="https://www.gcfrauenthal.at/", addr="Ulrichsberg, 7, 8530, Deutschlandsberg"
- LC  (medium, 430m, sim=1): name="Golf Club Schloß Frauenthal", addr="Ulrichsberg 7, A-8530 Deutschlandsberg", courses=GC Schloß Frauenthal(18)

### Seefeld-Wildmoos - A704 (Austria, 1 courses)

- DB: lat=47.3289241, lon=11.1867187, addr="Seefeld in Tirol", web="http://www.seefeldgolf.com", email="info@seefeldgolf.com", holes=[18]
- OEGV (high, sim=0.762, boost=+0.67[city:seefeld,jaccard:0.67], Tirol 6100): name="GC Seefeld-Wildmoos", web="http://www.seefeldgolf.com", email="info@seefeldgolf.com", holes=18, addr="Wildmoos 11 (Postfach 22)\nA-6100 Seefeld in Tirol"
- OSM (low, 893m, sim=0.381): name="Golfclub Seefeld-Reith", web="https://www.gc-seefeld-reith.at/", addr="Reitherspitzstraße, 138, 6100, Seefeld in Tirol"
- LC  (low, 409m, sim=0.381): name="Golfclub Seefeld Reith", addr="Reitherspitzstraße 632 d, A-6100 Seefeld", courses=Seefeld Reith(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - address: from oegv(high, sim=0.762)
```sql
UPDATE courses SET
  address = 'Wildmoos 11 (Postfach 22)\nA-6100 Seefeld in Tirol'
WHERE id IN (
  'b3ca40b6-6369-4480-a6aa-2188d4ba0fb7'
);
```

### St. Oswald-Freistadt (Austria, 1 courses)

- DB: lat=48.4983022, lon=14.596435, addr="Am Golfplatz 1, St. Oswald bei Freistadt", web="http://www.gcstoswald.at", email="office@gcstoswald.at", holes=[18]
- OEGV (high, sim=0.613, boost=+0.67[city:oswald,jaccard:0.67], Oberösterreich 4271): name="GC Mühlviertel St.Oswald-Freistadt", web="http://www.gcstoswald.at", email="office@gcstoswald.at", holes=18, addr="Am Golfplatz 1\nA-4271 St. Oswald-Freistadt"
- OSM (low, 603m, sim=1): name="Golfclub St.Oswald - Freistadt", web="https://www.gcstoswald.at/", addr="Am Golfplatz, 1, 4271, St. Oswald bei Freistadt"
- LC  (low, 84m, sim=0.613): name="Golfclub Mühlviertel St. Oswald-Freistadt", addr="Am Golfplatz 1, A-4271 St. Oswald", courses=GC St.Oswald-Freistadt(18)

### Styrian Mountain Golf Mariahof (Austria, 1 courses)

- DB: lat=47.106742, lon=14.3665135, addr="Forst 300, Mariahof", web="http://www.gc-mariahof.at", email="info@gc-mariahof.at", holes=[18]
- OEGV (medium, sim=0.48, boost=+0.4[city:mariahof], Steiermark 8812): name="Golfclub Grebenzen-Mariahof", web="http://www.gc-mariahof.at", email="info@gc-mariahof.at", holes=18, addr="Forst 300\nA-8812 Mariahof"
- OSM (high, 157m, sim=1): name="Styrian Mountain Golf Mariahof", web="https://www.gc-mariahof.at/", addr="300, 8812, Mariahof"
- LC  (low, 523m, sim=0.32): name="Golfclub Mariahof", addr="Mariahof 300, A-8812 Mariahof", courses=7.8(18)

### Thermengolf Fürstenfeld - Loipersdorf - A604 (Austria, 5 courses)

- DB: lat=46.9973356, lon=16.1388454, addr="Gillersdorf 50, Loipersdorf", web="http://www.thermengolf.at", email="office@thermengolf.at", holes=[18]
- OEGV (high, sim=0.775, boost=+0.7[city:loipersdorf,jaccard:0.75], Steiermark 8282): name="Thermengolfclub Fürstenfeld-Loipersdorf", web="http://www.thermengolf.at", email="office@thermengolf.at", holes=27, addr="Golfplatzstraße 50\nA-8282 Loipersdorf"
- OSM (low, 932m, sim=0.575): name="Thermengolf Loipersdorf", web="https://www.thermengolf.at/", addr=null
- LC  (no-match, 1420m, sim=0.45): name="Thermengolfclub Loipersdorf - Fürstenfeld", addr="Gillersdorf 50, A-8282 LOIPERSDORF", courses=Rott(9)

### Traminergolf Klöch (Austria, 1 courses)

- DB: lat=46.7498186, lon=15.9701698, addr="Klöch 192\nA-8493 Klöch", web="http://www.traminergolf.at", email="info@traminergolf.at", holes=[18]
- OEGV (high, sim=1, boost=+1.4[city:klöch,plz:8493,db-name-substring,jaccard:1.00], Steiermark 8493): name="GC Traminergolf Klöch", web="http://www.traminergolf.at", email="info@traminergolf.at", holes=27, addr="Klöch 192\nA-8493 Klöch"
- OSM (high, 67m, sim=1): name="Traminergolf Klöch", web="https://www.traminergolf.at/", addr="192, 8493, Klöch"
- LC  (low, 1654m, sim=1): name="GC Traminergolf Klöch", addr="Klöch 192, A-8493 Klöch", courses=8.6(27)

### Traminergolf Klöch 1-9 (Austria, 1 courses)

- DB: lat=46.7498186, lon=15.9701698, addr="Klöch 192\nA-8493 Klöch", web="http://www.traminergolf.at", email="info@traminergolf.at", holes=[18]
- OEGV (high, sim=0.818, boost=+1.1[city:klöch,plz:8493,jaccard:1.00], Steiermark 8493): name="GC Traminergolf Klöch", web="http://www.traminergolf.at", email="info@traminergolf.at", holes=27, addr="Klöch 192\nA-8493 Klöch"
- OSM (high, 67m, sim=0.818): name="Traminergolf Klöch", web="https://www.traminergolf.at/", addr="192, 8493, Klöch"
- LC  (low, 1654m, sim=0.818): name="GC Traminergolf Klöch", addr="Klöch 192, A-8493 Klöch", courses=8.6(27)

### Traminergolf Klöch 10-18 (Austria, 1 courses)

- DB: lat=null, lon=null, addr=null, web=null, email=null, holes=[9]
- OEGV (high, sim=0.75, boost=+0.4[jaccard:1.00], Steiermark 8493): name="GC Traminergolf Klöch", web="http://www.traminergolf.at", email="info@traminergolf.at", holes=27, addr="Klöch 192\nA-8493 Klöch"
- OSM (low, Infinitym, sim=0.75): name="Traminergolf Klöch", web="https://www.traminergolf.at/", addr="192, 8493, Klöch"
- LC  (low, Infinitym, sim=0.75): name="GC Traminergolf Klöch", addr="Klöch 192, A-8493 Klöch", courses=8.6(27)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from oegv(high, sim=0.75)
  - email: from oegv(high, sim=0.75)
  - address: from oegv(high, sim=0.75)
```sql
UPDATE courses SET
  website = 'http://www.traminergolf.at',
  email = 'info@traminergolf.at',
  address = 'Klöch 192\nA-8493 Klöch'
WHERE id IN (
  '2926bf4e-c1b0-410b-934a-0c21ab837d15'
);
```

### Urslauthal (Austria, 1 courses)

- DB: lat=47.4266166, lon=12.8481048, addr="Saalfelden", web="http://www.golf-urslautal.at", email="info@golf-urslautal.at", holes=[18]
- OEGV (high, sim=0.9, boost=+1.05[city:saalfelden,jaccard:1.00,typo:urslauthal~urslautal], Salzburg 5760): name="Golfclub Urslautal", web="http://www.golf-urslautal.at", email="info@golf-urslautal.at", holes=18, addr="Schinking 81\nA-5760 Saalfelden"
- OSM (no-match, 213796m, sim=0.4): name="Golfclub Murstätten", web="https://www.gcmurstaetten.at/", addr="14, 8403, Lebring"
- LC  (no-match, 3325m, sim=0.45): name="Golfclub Urslautal Saalfelden", addr="Schinking 81, A-5760 Saalfelden", courses=Golfclub Urslautal(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - address: from oegv(high, sim=0.9)
```sql
UPDATE courses SET
  address = 'Schinking 81\nA-5760 Saalfelden'
WHERE id IN (
  'c95d1298-05ef-4e9b-9a42-bc0ee35844f1'
);
```

### Weitra (Austria, 1 courses)

- DB: lat=48.6897213, lon=14.8819822, addr="Hausschachen 313, Weitra", web="http://www.hausschachen.at", email="gcweitra@hausschachen.at", holes=[18]
- OEGV (high, sim=1, boost=+1.1[city:weitra,db-name-substring,jaccard:1.00], Niederösterreich 3970): name="GC Weitra", web="http://www.hausschachen.at", email="gcweitra@hausschachen.at", holes=18, addr="Hausschachen 313\nA-3970 Weitra"
- OSM (low, 501m, sim=1): name="Golf Club Weitra", web="http://www.golfweitra.at/", addr="Hausschachen, 313, 3970, Weitra"
- LC  (no-match, 1327m, sim=0.316): name="Hausschachen - GC Weitra", addr="Hausschachen 313, A-3970 Weitra", courses=GC Weitra(18)

### Wienerwald (Austria, 1 courses)

- DB: lat=48.1472945, lon=16.0583661, addr="Forsthof 211\nA-3053 Brand/Laaben", web="http://www.gcww.at", email="office@gcleopoldsdorf.at", holes=[9]
- OEGV (high, sim=1, boost=+1.4[city:brand,plz:3053,db-name-substring,jaccard:1.00], Niederösterreich 3053): name="Golfclub Wienerwald", web="http://www.gcww.at", email="office@gcleopoldsdorf.at", holes=9, addr="Forsthof 211\nA-3053 Brand/Laaben"
- OSM (low, 10451m, sim=1): name="Golfclub Wienerwald", web="https://www.gcww.at/", addr="211, 3053, Brand/Laaben"
- LC  (no-match, 43639m, sim=0.5): name="GC Föhrenwald", addr="Kleinwolkersdorf 217, A-2700 Wr.Neustadt", courses=8.9(18)

## Medium confidence (review before applying)

### Brand - A802 (Austria, 1 courses)

- DB: lat=47.4140499, lon=9.84997, addr="Brand, Bludenz-Brand", web="http://www.gc-bludenz-braz.at", email="gcbraz@golf.at", holes=[18]
- OEGV (medium, sim=0.25, boost=+0.65[city:bludenz,name-token:bludenz], Vorarlberg 6751): name="GC Bludenz-Braz", web="http://www.gc-bludenz-braz.at", email="gcbraz@golf.at", holes=18, addr="Oberradin 60\nA-6751 Braz bei Bludenz"
- OSM (no-match, 492808m, sim=0.333): name="GolfRange Achau", web="https://www.gcachau.at/", addr="Biedermannsdorfer Straße, 2481, Achau"
- LC  (no-match, 492795m, sim=0.333): name="GC GolfRange Achau", addr="Biedermannsdorfer Straße, A-2481 Achau", courses=GC GolfRange Wien-Achau(9)

### GC Pfarrkirchen (Austria, 1 courses)

- DB: lat=48.5032202, lon=13.8259523, addr=null, web=null, email=null, holes=[18]
- OEGV (medium, sim=0.444, boost=+0.5[db-name-substring,jaccard:0.50], Oberösterreich 4141): name="GC Pfarrkirchen im Mühlviertel", web="http://www.gcpfarrkirchen.at", email="office@gcpfarrkirchen.at", holes=9, addr="Pfarrkirchen 12\nA-4141 Pfarrkirchen i. M."
- OSM (low, 82m, sim=0.444): name="Golfclub Pfarrkirchen im Mühlviertel", web="https://www.gcpfarrkirchen.at/", addr="Pfarrkirchen, 12, 4141, Pfarrkirchen im Mühlkreis"
- LC  (low, 128m, sim=0.444): name="GC Pfarrkirchen im Mühlviertel", addr="Pfarrkirchen 12, A-4141 Pfarrkirchen i. M.", courses=7.5(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from oegv(medium, sim=0.444)
  - email: from oegv(medium, sim=0.444)
  - address: from oegv(medium, sim=0.444)
```sql
UPDATE courses SET
  website = 'http://www.gcpfarrkirchen.at',
  email = 'office@gcpfarrkirchen.at',
  address = 'Pfarrkirchen 12\nA-4141 Pfarrkirchen i. M.'
WHERE id IN (
  'f7c7836a-98e0-47aa-9d97-187468d68e2a'
);
```

### GCC Lärchenhof (Austria, 1 courses)

- DB: lat=47.582195, lon=12.4942047, addr="Salzburger Strasse 65, Erpfendorf", web="http://www.gcclaerchenhof.com", email="golf@laerchenhof-tirol.at", holes=[18]
- OEGV (medium, sim=0.545, boost=+0.4[city:erpfendorf], Tirol 6383): name="Golf & Countryclub Lärchenhof", web="http://www.gcclaerchenhof.com", email="golf@laerchenhof-tirol.at", holes=9, addr="Salzburger Strasse 65\nA-6383 Erpfendorf"
- OSM (low, 487m, sim=0.545): name="Golf & Countryclub Lärchenhof", web="https://www.laerchenhof-tirol.at/", addr="6383, Kirchdorf in Tirol"
- LC  (low, 105m, sim=0.545): name="Golf & Countryclub Lärchenhof", addr="Salzburger Strasse 65, A-6383 Erpfendorf", courses=Golf & Countryclub Lärchenhof(9)

### Golf & Countryclub Brunn - A312 (Austria, 1 courses)

- DB: lat=48.1043162, lon=16.3039664, addr="Rennweg 50, Brunn am Gebirge", web=null, email=null, holes=[18]
- OEGV (medium, sim=0.227, boost=+0.7[city:brunn,jaccard:0.75], Niederösterreich 2345): name="Golf & Country Club Brunn", web="http://www.gccbrunn.at", email="club@gccbrunn.at", holes=18, addr="Rennweg 50\nA-2345 Brunn am Gebirge"
- OSM (low, 8m, sim=0.227): name="Golf & Country Club Brunn", web="https://www.gccbrunn.at/", addr="Rennweg, 50, 2345, Brunn am Gebirge"
- LC  (low, 337m, sim=0.227): name="Golf & Country Club Brunn", addr="Rennweg 50, A-2345 Brunn am Gebirge", courses=Golf & Country Club Brunn(18)

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from oegv(medium, sim=0.227)
  - email: from oegv(medium, sim=0.227)
```sql
UPDATE courses SET
  website = 'http://www.gccbrunn.at',
  email = 'club@gccbrunn.at'
WHERE id IN (
  '2979da1c-e8e0-4512-b205-86cf5f65a392'
);
```

### Golf Club Adamstal (Austria, 2 courses)

- DB: lat=-33.9177624, lon=151.2146682, addr="Gaupmannsgraben 21, Ramsau bei Hainfeld", web="http://www.kobaldhof.at", email="info@kobaldhof.at", holes=[18]
- OEGV (medium, sim=0.231, boost=+0.65[city:ramsau,name-token:ramsau], Steiermark 8972): name="GC Kobaldhof-Ramsau/Dachstein", web="http://www.kobaldhof.at", email="info@kobaldhof.at", holes=9, addr="Vorberg 234\nA-8972 Ramsau am Dachstein"
- OSM (low, 16023955m, sim=1): name="Golfclub Adamstal", web="https://www.adamstal.at/", addr="Gaupmannsgraben, 21, 3172, Ramsau"
- LC  (no-match, 16141992m, sim=0.625): name="Golf Resort Kremstal", addr="Am Golfplatz 1, A--4531 Kematen an der Krems O.Ö.", courses=Scherndlgutkurs(9)

### Golf Club Veltlinerland Poysdorf (Austria, 2 courses)

- DB: lat=48.6804381, lon=16.623317, addr="Am Golfplatz 11, Poysdorf", web=null, email=null, holes=[18]
- OEGV (low, sim=0.364, boost=+0.4[city:poysdorf], Niederösterreich 2170): name="Golfclub Poysdorf", web="http://www.poysdorf.golf", email="info@poysdorf.golf", holes=18, addr="Am Golfplatz 11\nA-2170 Poysdorf"
- OSM (low, 140m, sim=0.688): name="Golfplatz Veltlinerland Poysdorf", web="http://www.golf-veltlinerland.com/", addr="Am Golfplatz, 11, 2170, Poysdorf"
- LC  (medium, 431m, sim=1): name="Golfclub Veltlinerland Poysdorf", addr="Am Golfplatz 11, A-2170 Poysdorf", courses=6.8(18)

### Golfclub Frühling - Lake Course 18 (Austria, 1 courses)

- DB: lat=48.0377893, lon=16.5493309, addr="Am Golfplatz 1, Götzendorf", web="http://www.gcfruehling.at", email="office@gcfruehling.at", holes=[18]
- OEGV (medium, sim=0.5, boost=+0.4[city:götzendorf], Niederösterreich 2434): name="Golfclub Frühling", web="http://www.gcfruehling.at", email="office@gcfruehling.at", holes=36, addr="Am Golfplatz\nA-2434 Götzendorf / Leitha"
- OSM (low, 371m, sim=0.5): name="Golfclub Frühling", web="https://gcfruehling.at/", addr="Am Golfplatz, 2434, Götzendorf / Leitha"
- LC  (low, 6m, sim=0.5): name="Golfclub Frühling", addr="Am Golfplatz, A-2434 Götzendorf / Leitha", courses=GC Frühling Night Course(9)

### Golfclub Waldhof Fuschl am See (Austria, 1 courses)

- DB: lat=47.8049455, lon=13.3010609, addr="Schoberstrasse 20, Fuschl am See", web=null, email=null, holes=[18]
- OEGV (medium, sim=0.333, boost=+0.6[city:fuschl,jaccard:0.50], Salzburg 5330): name="Golfclub Waldhof", web="http://www.golfclub-waldhof.at", email="birdie@golfclub-waldhof.at", holes=9, addr="Schoberstraße 20\nA-5330 Fuschl am See"
- OSM (low, 147m, sim=0.333): name="Golfclub Waldhof", web="https://www.golfclub-waldhof.at/", addr="Schoberstraße, 20, 5330, Fuschl am See"
- LC  (low, 173m, sim=0.333): name="Golfclub Waldhof", addr="Schoberstraße 20, A-5330 Fuschl am See", courses=7.5(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from oegv(medium, sim=0.333)
  - email: from oegv(medium, sim=0.333)
```sql
UPDATE courses SET
  website = 'http://www.golfclub-waldhof.at',
  email = 'birdie@golfclub-waldhof.at'
WHERE id IN (
  '97974932-e920-44db-b7f7-84c6e1a3ba96'
);
```

### Golfpark Bregenzerwald (Austria, 1 courses)

- DB: lat=47.5166836, lon=9.9564012, addr="Unterlitten 3a, Riefensberg", web=null, email=null, holes=[18]
- OEGV (low, sim=0.136, boost=+0.65[city:riefensberg,name-token:riefensberg], Vorarlberg 6943): name="Golf Club Riefensberg-Sulzberg", web="http://www.golf-bregenzerwald.com", email="office@golf-bregenzerwald.com", holes=18, addr="Unterlitten 3 a\nA-6943 Riefensberg"
- OSM (low, 48m, sim=0.512): name="Golfpark Bregenzerwald / Golfclub Riefensberg-Sulzberg", web="https://golf-bregenzerwald.com/", addr="Unterlitten, 3a, 6943, Riefensberg"
- LC  (medium, 390m, sim=1): name="Golfpark Bregenzerwald", addr="Unterlitten 3 a, A-6943 Riefensberg", courses=18 Loch Platz(18)

### Graz Golfzentrum Andritz (Austria, 1 courses)

- DB: lat=47.1107397, lon=15.4072769, addr="Andritzer ReichsstraÃŸe 157, graz", web=null, email=null, holes=[9]
- OEGV (medium, sim=0.25, boost=+0.6[city:graz,jaccard:0.50], Steiermark 8046): name="Golfclub Graz Andritz St. Gotthard", web="http://www.golf-andritz.at", email="office@golf-andritz.at", holes=9, addr="Andritzer Reichsstr. 157\nA-8046 Graz"
- OSM (low, 22m, sim=0.5): name="Golfclub Graz-Andritz", web="https://www.golf-andritz.at/", addr="Andritzer Reichsstraße, 157, 8046, Graz"
- LC  (low, 193m, sim=0.25): name="Golfclub Graz-Andritz St. Gotthard", addr="Andritzer Reichsstr. 157, 8046- Graz", courses=Andritz St. Gotthard(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from oegv(medium, sim=0.25)
  - email: from oegv(medium, sim=0.25)
```sql
UPDATE courses SET
  website = 'http://www.golf-andritz.at',
  email = 'office@golf-andritz.at'
WHERE id IN (
  '9d4e7556-59e1-4cd2-bea7-c23bf67af5b6'
);
```

### St. Pölten Park - A340 (Austria, 3 courses)

- DB: lat=48.233385, lon=15.5289359, addr="Goldegg Golf 1, Neidling", web="http://www.noe-golfclub.at", email="office@noe-golfclub.at", holes=[18,9]
- OEGV (medium, sim=0.474, boost=+0.4[city:neidling], Niederösterreich 3110): name="GC St. Pölten", web="http://www.noe-golfclub.at", email="office@noe-golfclub.at", holes=18, addr="Goldegg Golf 1\nA-3110 Neidling"
- OSM (low, 114m, sim=0.474): name="Golfclub St. Pölten", web="https://www.noe-golfclub.at/", addr="Goldegg Golf, 1, 3110, Neidling"
- LC  (low, 193m, sim=0.105): name="GC 2000 - NÖ Golfclub St. Pölten", addr="Goldegg Golf 1, A-3110 Neidling", courses=Schloss Kurs(9)

### Swingolf Böhmerwaldpark (Austria, 1 courses)

- DB: lat=48.6751701, lon=13.9105182, addr="Ulrichsberg", web="http://www.boehmerwaldgolf.at", email="office@boehmerwaldgolf.at", holes=[18]
- OEGV (medium, sim=0.478, boost=+0.4[city:ulrichsberg], Oberösterreich 4161): name="Golfpark Böhmerwald", web="http://www.boehmerwaldgolf.at", email="office@boehmerwaldgolf.at", holes=18, addr="Seitelschlag 50\nA-4161 Ulrichsberg"
- OSM (no-match, 3809m, sim=0.478): name="Golfpark Böhmerwald", web="https://boehmerwaldgolf.at/", addr="50, 4161, Ulrichsberg"
- LC  (no-match, 3581m, sim=0.478): name="Golfpark Böhmerwald", addr="Seitelschlag 50, A-4161 Ulrichsberg", courses=9 Hole Panorama Course(9)

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - address: from oegv(medium, sim=0.478)
```sql
UPDATE courses SET
  address = 'Seitelschlag 50\nA-4161 Ulrichsberg'
WHERE id IN (
  '48ff947c-542e-4ff0-8e22-eec24a02d012'
);
```

## Low confidence (manual decision)

### A-Maria Lankowitz (Austria, 1 courses)

- DB: lat=47.065416, lon=14.9981321, addr="8591 Maria Lankowitz", web=null, email=null, holes=[18]
- OEGV (low, sim=0.059, boost=+0.7[city:maria,plz:8591], Steiermark 8591): name="GC Erzherzog Johann", web="http://golf-marialankowitz.at", email="office@golf-marialankowitz.at", holes=18, addr="Puchbacherstr. 109\nA-8591 Maria Lankowitz"
- OSM (no-match, 4311m, sim=0.531): name="Golf Club Erzherzog Johann Maria Lankowitz", web="https://www.golf-marialankowitz.at/", addr="Puchbacherstraße, 109, 8591, Maria Lankowitz"
- LC  (no-match, 160035m, sim=0.412): name="Golfclub Maria Theresia", addr="Letten 5, A-4680 Haag am Hausruck", courses=8.1(18)

### Gc Brunn am Geb. (Austria, 1 courses)

- DB: lat=48.1043162, lon=16.3039664, addr="Brunn a. Geb. ", web=null, email=null, holes=[18]
- OEGV (low, sim=0.417, boost=+0.4[city:brunn], Niederösterreich 2345): name="Golf & Country Club Brunn", web="http://www.gccbrunn.at", email="club@gccbrunn.at", holes=18, addr="Rennweg 50\nA-2345 Brunn am Gebirge"
- OSM (low, 8m, sim=0.417): name="Golf & Country Club Brunn", web="https://www.gccbrunn.at/", addr="Rennweg, 50, 2345, Brunn am Gebirge"
- LC  (low, 337m, sim=0.417): name="Golf & Country Club Brunn", addr="Rennweg 50, A-2345 Brunn am Gebirge", courses=Golf & Country Club Brunn(18)

### GC Dilly Windischgarsten (Austria, 2 courses)

- DB: lat=47.7156845, lon=14.3559301, addr="Edelbach 96, Windischgarsten", web=null, email=null, holes=[18]
- OEGV (low, sim=0.238, boost=+0.6[city:windischgarsten,jaccard:0.50], Oberösterreich 4580): name="GC Dilly", web="http://www.golfanlage.at", email="info@golfanlage.at", holes=18, addr="Edlbach 96\nA-4580 Edlbach / Windischgarsten"
- OSM (low, 643m, sim=0.714): name="Golfclub Windischgarsten", web="http://www.golfanlage.at", addr="Edlbach, 96, 4580, Edlbach"
- LC  (low, 2234m, sim=1): name="Golfclub Dilly Windischgarsten", addr="Edlbach 96, A-4580 Edlbach / Windischgarsten", courses=GC Windischgarsten Pyhrn-Priel(18)

### GC St Anton am Arlberg (Austria, 1 courses)

- DB: lat=47.1288996, lon=10.2663669, addr="St Anton am Arlberg", web=null, email=null, holes=[18]
- OEGV (low, sim=0.368, boost=+0.4[city:anton], Tirol 6580): name="Golf-Club Arlberg", web="http://www.golfarlberg.at", email="info@golfarlberg.at", holes=9, addr="Ortsteil Nasserein\nA-6580 St. Anton am Arlberg"
- OSM (low, 691m, sim=0.368): name="Golfclub Arlberg", web="https://www.stantonamarlberg.com/en/sommer/sport-aktiv/golf.html", addr="Nassereinstraße, 49, 6580, St. Anton"
- LC  (low, 160m, sim=0.105): name="Golfclub Lech", addr="Nassereinerstraße 49, 6580 St. Anton am Arlberg, Oostenrijk", courses=Golf-Club Arlberg(9)

### GC Swarco Ferschnitz-Amstetten (Austria, 1 courses)

- DB: lat=48.0864747, lon=14.9765349, addr="Ferschnitz-Amstetten", web=null, email=null, holes=[18]
- OEGV (low, sim=0.188, boost=+0.6[city:ferschnitz,jaccard:0.50], Niederösterreich 3325): name="Golfclub MOSTVIERTEL Amstetten-Ferschnitz", web="http://www.golfclub-amstetten.at", email="office@golfclub-amstetten.at", holes=18, addr="Edla 18\nA-3325 Ferschnitz"
- OSM (low, 320m, sim=0.333): name="Golfclub Swarco Amstetten-Ferschnitz", web="http://golfclub-amstetten.at/", addr="18, 3325, Ferschnitz"
- LC  (low, 653m, sim=0.333): name="Golfclub  SWARCO Amstetten-Ferschnitz", addr="Edla 18, A-3325 Ferschnitz", courses=6.6(18)

### Golf Murauen 9 (Austria, 1 courses)

- DB: lat=47.0141374, lon=15.4711469, addr="Golfstrasse 10, Gössendorf", web=null, email=null, holes=[18]
- OEGV (low, sim=0.357, boost=+0.4[city:gössendorf], Steiermark 8077): name="Golfclub Grazer MurAuen", web="http://www.golf-graz.at", email="office@golf-graz.at", holes=9, addr="Golfstraße 10\nA-8077 Gössendorf"
- OSM (low, 228m, sim=0.242): name="Golfplatz Grazer Murauen (GC Liebenau)", web="https://golf-graz-murauen.at/", addr=null
- LC  (low, 91m, sim=0.357): name="Golfclub Grazer MurAuen", addr="Golfstraße 10, A-8041 Graz-Liebenau", courses=Mur9(9)

### Golf S1 (Austria, 1 courses)

- DB: lat=-53.142591, lon=-70.8829951, addr="Raststaion Schwechat S1, Schwechat", web=null, email=null, holes=[9]
- OEGV (low, sim=0.111, boost=+0.65[city:schwechat,name-token:schwechat], Niederösterreich 2320): name="Golfclub Schwechat", web="http://www.gcschwechat.at", email="office@gcschwechat.at", holes=9, addr="Brucker Bundesstrasse 80\nA-2320 Schwechat"
- OSM (no-match, 13671372m, sim=0.143): name="Golfclub Gastein", web="https://golfclub-gastein.com/", addr="Golfstraße, 6, 5640, Bad Gastein"
- LC  (no-match, 13825030m, sim=0.2): name="Golfclub Stärk", addr="Auhirschgasse 52, A-4030 Linz", courses=GC Stärk-Linz(9)

### Golfclub Kaiserburg (Austria, 1 courses)

- DB: lat=46.8133685, lon=13.799223, addr="Dorfstraße 74, Bad Kleinkirchheim", web=null, email=null, holes=[18]
- OEGV (low, sim=0.345, boost=+0.45[name-token:kleinkirchheim,jaccard:0.50], Kärnten 9564): name="Golfclub Bad Kleinkirchheim - Kaiserburg", web="http://www.nockgolf.at", email="golf@badkleinkirchheim.at", holes=18, addr="Plass 19\nA-9564 Patergassen"
- OSM (no-match, 280877m, sim=0.6): name="Golfclub Hainburg", web="https://www.golfclub-hainburg.at/", addr="Auf der Heide, 762, 2410, Hainburg an der Donau"
- LC  (no-match, 281069m, sim=0.6): name="Golfclub Hainburg", addr="Auf der Heide 762, NÖ-2410 Hainburg a. d. Donau", courses=Golf-Club Hainburg(18)

### Golfclub Tuttendörfl (Austria, 1 courses)

- DB: lat=48.3171555, lon=16.3473611, addr="Tuttenhofstraße 140, Langenzersdorf", web=null, email=null, holes=[9]
- OEGV (low, sim=0.423, boost=+0.4[city:langenzersdorf], Niederösterreich 2103): name="GC GolfRange Wien-Tuttendörfl", web="http://www.gctuttendoerfl.at", email="office@gctuttendoerfl.at", holes=9, addr="Tuttenhofstrasse 140\nA-2103 Langenzersdorf"
- OSM (low, 974m, sim=0.524): name="GolfRange Tuttendörfl", web="https://gctuttendoerfl.at", addr="Tuttenhofstraße, 2103, Langenzersdorf"
- LC  (no-match, 1109m, sim=0.524): name="GC GolfRange Tuttendörfl", addr="Tuttenhofstrasse, A-2103 Langenzersdorf", courses=GC GolfRange Wien-Tuttendörfl(9)

### Kremstal Bergergut - A425 (Austria, 3 courses)

- DB: lat=48.1086333, lon=14.1824692, addr="Am Golfplatz 1, Kematen an der Krems", web=null, email=null, holes=[18]
- OEGV (low, sim=0.391, boost=+0.4[city:kematen], Oberösterreich 4531): name="Golf Club Bergergut", web="http://www.golfresort-kremstal.at", email="info@golfresort-kremstal.at", holes=9, addr="Am Golfplatz 1\nA-4531 Kematen"
- OSM (low, 531m, sim=0.478): name="Golf Resort Kremstal Kematen", web="https://www.golfresort-kremstal.at/", addr="Am Golfplatz, 1, 4531, Kematen an der Krems"
- LC  (low, 81m, sim=0.348): name="Golf Resort Kremstal", addr="Am Golfplatz 1, A--4531 Kematen an der Krems O.Ö.", courses=Scherndlgutkurs(9)

### Maria Lankowitz (Austria, 1 courses)

- DB: lat=47.0590105, lon=15.055513, addr="Puchbacherstrasse 109, Maria Lankowitz", web=null, email=null, holes=[18]
- OEGV (low, sim=0.421, boost=+0.4[city:maria], Niederösterreich 3672): name="GC Maria Taferl-Wachau", web="http://www.mariataferl.golf", email="office@mariataferl.golf", holes=9, addr="Maria Taferl 43\nA-3672 Maria Taferl"
- OSM (low, 94m, sim=0.469): name="Golf Club Erzherzog Johann Maria Lankowitz", web="https://www.golf-marialankowitz.at/", addr="Puchbacherstraße, 109, 8591, Maria Lankowitz"
- LC  (low, 535m, sim=0.063): name="GC Erzherzog Johann", addr="Puchbacherstr. 109, A--8591 Maria Lankowitz", courses=7.7(18)

### Panoramakurs (Austria, 1 courses)

- DB: lat=47.1592565, lon=16.1682822, addr="Stegersbach", web=null, email=null, holes=[18]
- OEGV (low, sim=0.156, boost=+0.65[city:stegersbach,name-token:stegersbach], Burgenland 7551): name="Bundesleistungszentrum GOLF-HAK Stegersbach (1. ÖSGC) *", web="http://www.golfhak.at", email="office@golfhak.at", holes=null, addr="Kirchengasse 44\nA-7551 Stegersbach"
- OSM (low, 236468m, sim=1): name="Panoramakurs", web=null, addr=null
- LC  (no-match, 97959m, sim=0.417): name="Golfclub Guntramsdorf", addr="In den Haidwiesen, 2353 Guntramsdorf", courses=7.2(9)

### Suedburgenland (Austria, 1 courses)

- DB: lat=47.1592565, lon=16.1682822, addr="Stegersbach", web=null, email=null, holes=[18]
- OEGV (low, sim=0.156, boost=+0.65[city:stegersbach,name-token:stegersbach], Burgenland 7551): name="Bundesleistungszentrum GOLF-HAK Stegersbach (1. ÖSGC) *", web="http://www.golfhak.at", email="office@golfhak.at", holes=null, addr="Kirchengasse 44\nA-7551 Stegersbach"
- OSM (no-match, 187872m, sim=0.429): name="Golf Club Ausseerland", web="https://www.golfclub-ausseerland.at/", addr=null
- LC  (no-match, 239968m, sim=0.444): name="Golfclub Salzburg - Eugendorf", addr="Schamingstraße 17 / Golfplatz 1, A-5301 Eugendorf", courses=Championcourse Eugendorf(18)

## No match in OEGV/OSM/LC (review)


## Orphans — DB klubber uden OEGV-match (manual review queue)

Disse klubber er ikke ÖGV-medlemmer. De auto-opdateres IKKE.
Beslutning per klub: keep / merge / hide (is_displayed=false) / delete.

- **Braz** (1 courses) — DB lat=47.1477789, lon=9.8950939 (best OEGV sim=0.6 → Golf Club Brand), OSM no-match 1016m, LC low 928m
- **Bregenzenwald** (1 courses) — DB lat=47.3521014, lon=9.8085365 (best OEGV sim=0.538 → Golfclub Wienerwald), OSM no-match 465486m, LC no-match 21608m
- **City Golf Graz-Puntigam** (3 courses) — DB lat=47.0325349, lon=15.4465902 (best OEGV sim=0.278 → MEDIA GOLF AUSTRIA *), OSM no-match 159975m, LC high 22m
- **Defereggental Golf Park** (1 courses) — DB lat=46.9146746, lon=12.3719856 (best OEGV sim=0.389 → Golfclub Drautal/Berg), OSM high 34m, LC no-match 60838m
- **GC** (1 courses) — DB lat=48.1308826, lon=16.4931131 (best OEGV sim=0 → ADAMSTAL Franz Wittmann), OSM low 366m, LC low 446m
- **GC Gailtalgolf Kärnten** (1 courses) — DB lat=47.3278195, lon=16.2388732 (best OEGV sim=0.105 → GC Nassfeld Golf), OSM no-match 1004m, LC low 710m
- **GC Golfacademy Seefeld** (2 courses) — DB lat=47.3289241, lon=11.1867187 (best OEGV sim=0.211 → Golfclub Seefeld Reith), OSM low 893m, LC low 409m
- **GC Innsbruck-Igls 9 Loch Parkland Course Lans** (1 courses) — DB lat=47.2448755, lon=11.4287879 (best OEGV sim=0.4 → Golfclub Innsbruck-Igls), OSM low 176m, LC low 89m
- **GC Klopein 2005** (1 courses) — DB lat=46.5944396, lon=14.5935579 (best OEGV sim=0.25 → Golfpark Klopeinersee - Südkärnten), OSM low 698m, LC low 103m
- **GC Modern Golf** (1 courses) — DB lat=47.0534907, lon=15.5253013 (best OEGV sim=0.3 → Golfclub Klockerhof), OSM high 64m, LC no-match 423694m
- **GC Montafon Nässebedingt Ohne 1 & 2** (1 courses) — DB lat=null, lon=null (best OEGV sim=0.3 → Golfclub Maria Theresia Haag-H.), OSM no-match Infinitym, LC no-match Infinitym
- **GC Salzburg - Fuschl** (1 courses) — DB lat=47.7963895, lon=13.3027787 (best OEGV sim=0.533 → Golfclub Salzburg), OSM low 991m, LC no-match 1032m
- **GC Salzkammergut Bad Ischl** (1 courses) — DB lat=47.7115299, lon=13.6239333 (best OEGV sim=0.565 → Salzkammergut Golfclub), OSM no-match 5027m, LC no-match 4972m
- **GC Silvretta** (1 courses) — DB lat=46.9689831, lon=10.0606567 (best OEGV sim=0.385 → Golfclub Seefeld Reith), OSM no-match 94285m, LC low 1049m
- **GC Thayatal Drosendorf** (1 courses) — DB lat=48.8740471, lon=15.5976214 (best OEGV sim=0.474 → Golfclub Bad Waltersdorf), OSM high 14m, LC medium 394m
- **GC Traunsee - Range** (1 courses) — DB lat=48.138081, lon=14.1023437 (best OEGV sim=0.6 → Golfclub Traunsee Almtal), OSM low 296m, LC low 412m
- **Golf Club Reit im Winkl e.V. - Kössen** (1 courses) — DB lat=47.6711825, lon=12.4388461 (best OEGV sim=0.276 → Kaiserwinkl Golf Kössen - Lärchenhof), OSM low 780m, LC no-match 4018m
- **Golf-ClubFoehrenwald** (1 courses) — DB lat=47.8131847, lon=16.2441166 (best OEGV sim=0.227 → GC Föhrenwald Wr. Neustadt), OSM no-match 5031m, LC no-match 5095m
- **Golfacademy Salzburg-Rif** (1 courses) — DB lat=47.719359, lon=13.0646352 (best OEGV sim=0.333 → Golfclub Salzburg), OSM high 3m, LC high 164m
- **Golfclub Moosburg-Pörtschach 9-Loch** (1 courses) — DB lat=46.6667008, lon=14.1557983 (best OEGV sim=0.308 → Golfclub Moosburg), OSM low 154m, LC low 470m
- **Golfclub Salzburg - Schloss Fuschl** (1 courses) — DB lat=47.8114903, lon=13.248673 (best OEGV sim=0.522 → Golf & Country Club Salzburg-Klessheim), OSM low 28m, LC low 140m
- **Golfschaukel Stegersbach** (3 courses) — DB lat=47.1647646, lon=16.1276953 (best OEGV sim=0.455 → Golfclub Neulengbach), OSM low 659m, LC high 98m
- **GZ Bruck/Mur** (1 courses) — DB lat=47.4037816, lon=15.2282615 (best OEGV sim=0.429 → Golfclub Innsbruck-Igls), OSM low 31m, LC no-match 282219m
- **Himberg** (2 courses) — DB lat=48.0550549, lon=16.4477411 (best OEGV sim=0.625 → Golf-Club Hainburg), OSM low 642m, LC low 469m
- **Kaisergolf Ellmau** (1 courses) — DB lat=47.5181297, lon=12.2848209 (best OEGV sim=0.5 → GC Traminergolf Klöch), OSM high 7m, LC low 232m
- **Klupeinersee** (1 courses) — DB lat=-33.9177624, lon=151.2146682 (best OEGV sim=0.417 → Golfclub am Attersee), OSM no-match 16131369m, LC no-match 16194035m
- **Köstenberg** (1 courses) — DB lat=46.6513727, lon=14.0117846 (best OEGV sim=0.6 → Golfclub Sonnberg), OSM no-match 1302m, LC low 755m
- **Mühlberghof Ellmau** (1 courses) — DB lat=47.5181297, lon=12.2848209 (best OEGV sim=0.222 → Golfclub Wilder Kaiser), OSM low 7m, LC low 232m
- **Rinn** (1 courses) — DB lat=47.2500928, lon=11.5026927 (best OEGV sim=0.6 → Golf & Country Club Brunn), OSM low 945m, LC low 989m
- **Robinson Golfclub Ampflwang** (1 courses) — DB lat=48.0924656, lon=13.5661129 (best OEGV sim=0.292 → OPEN GOLF St. Johann Alpendorf), OSM no-match 83266m, LC no-match 1894m
- **Schloss Caps** (1 courses) — DB lat=46.5636937, lon=13.8510515 (best OEGV sim=0.571 → Golfclub Schloss Ernegg), OSM low 565m, LC low 22m
- **Schmittenhöhe** (1 courses) — DB lat=47.3239636, lon=12.7963165 (best OEGV sim=0.15 → German Golf Teacher Federation e.V. of Austria *), OSM no-match 57553m, LC no-match 116452m
- **schruns** (1 courses) — DB lat=47.0802089, lon=9.9197063 (best OEGV sim=0.429 → Golf & Country Club Brunn), OSM no-match 1345m, LC no-match 491942m
- **Styrian Mountain Golf Reiting - A611** (1 courses) — DB lat=47.4219882, lon=14.9580305 (best OEGV sim=0.276 → DIAMOND CLUB OTTENSTEIN), OSM low 195m, LC low 1231m
- **Swingolf Linz** (1 courses) — DB lat=48.3244516, lon=14.2986754 (best OEGV sim=0.316 → Golfclub Stärk.Linz.Pichling), OSM no-match 162537m, LC no-match 213923m
- **Thayatal** (1 courses) — DB lat=48.8147061, lon=15.2762681 (best OEGV sim=0.444 → Golfclub Urslautal), OSM no-match 102209m, LC no-match 24393m
- **Vienna Hurricanes** (1 courses) — DB lat=48.2089469, lon=16.4058698 (best OEGV sim=0.235 → Golf Club Wien-Süßenbrunn), OSM no-match 147288m, LC no-match 146987m
