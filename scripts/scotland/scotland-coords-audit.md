# Scotland coordinate audit
Generated: 2026-05-02T04:35:53


## Summary

| Status | Clubs |
|---|---:|
| OK (DB matches source consensus) | 360 |
| Flagged | 89 |
|   level=high | 4 |
|   level=medium | 42 |
|   level=medium-sg-only | 17 |
|   level=medium-osm-only | 12 |
|   level=low | 14 |
| No source match | 114 |

## high flags (4)

### [high] Uphall Golf Club (1 courses)
- DB:  lat=55.000827, lon=-1.6722067 — A899, Broxburn
- OSM: lat=55.9253104, lon=-3.5172869 (sim=1, 155221m from DB)
- SG:  lat=55.927, lon=-3.518 (sim=1, 155377m from DB)
- OSM↔SG distance: 193m
- **Reason:** OSM+SG consensus (193m apart), DB diverges (osm=155221m, sg=155377m)
- Suggested fix: lat=55.9261552, lon=-3.5176435 (OSM+SG midpoint)

### [high] Liberton Golf Club (1 courses)
- DB:  lat=56.3435366, lon=-2.8023867 — 297 Gilmerton Road, Edinburgh
- OSM: lat=55.9181696, lon=-3.1462482 (sim=1, 51877m from DB)
- SG:  lat=55.9194, lon=-3.148158 (sim=1, 51801m from DB)
- OSM↔SG distance: 181m
- **Reason:** OSM+SG consensus (181m apart), DB diverges (osm=51877m, sg=51801m)
- Suggested fix: lat=55.9187848, lon=-3.1472031 (OSM+SG midpoint)

### [high] St. Michaels Golf Club (1 courses)
- DB:  lat=56.3435366, lon=-2.8023867 — A919, St Andrews
- OSM: lat=56.3884809, lon=-2.9003724 (sim=1, 7836m from DB)
- SG:  lat=56.3875, lon=-2.9022 (sim=1, 7854m from DB)
- OSM↔SG distance: 157m
- **Reason:** OSM+SG consensus (157m apart), DB diverges (osm=7836m, sg=7854m)
- Suggested fix: lat=56.3879905, lon=-2.9012862 (OSM+SG midpoint)

### [high] Colville Park Country Club (1 courses)
- DB:  lat=55.8129379, lon=-3.9778665 — New Jerviston House, Merry Street, Motherwell
- OSM: lat=55.8017242, lon=-3.9805732 (sim=1, 1258m from DB)
- SG:  lat=55.8013725, lon=-3.982487 (sim=1, 1318m from DB)
- OSM↔SG distance: 126m
- **Reason:** OSM+SG consensus (126m apart), DB diverges (osm=1258m, sg=1318m)
- Suggested fix: lat=55.8015484, lon=-3.9815301 (OSM+SG midpoint)

## medium flags (42)

### [medium] Drumoig Golf Course (2 courses)
- DB:  lat=56.4127273, lon=-2.9024535 — Forgan Drive, St Andrews
- OSM: lat=56.4128338, lon=-2.9022873 (sim=1, 16m from DB)
- SG:  lat=52.9645653, lon=-0.00279246364 (sim=1, 426222m from DB)
- OSM↔SG distance: 426228m
- **Reason:** Single source >1km off (osm=16m, sg=426222m)

### [medium] Kings Links Golf Course (3 courses)
- DB:  lat=57.166419, lon=-2.0816888 — Golf Road, Aberdeen
- OSM: lat=57.1664695, lon=-2.0830734 (sim=1, 84m from DB)
- SG:  lat=57.4660263, lon=-4.255089 (sim=1, 134682m from DB)
- OSM↔SG distance: 134599m
- **Reason:** Single source >1km off (osm=84m, sg=134682m)

### [medium] Ralston Golf Club (1 courses)
- DB:  lat=56.3435366, lon=-2.8023867 — Strathmore Avenue, Ralston , Paisley
- OSM: lat=55.8418927, lon=-4.3833946 (sim=1, 112820m from DB)
- SG:  lat=55.8441544, lon=-4.383896 (sim=1, 112720m from DB)
- OSM↔SG distance: 253m
- **Reason:** Both >500m off, OSM↔SG=253m

### [medium] Minto Golf Club (1 courses)
- DB:  lat=56.3435366, lon=-2.8023867 — Minto, Hawick
- OSM: lat=55.4747459, lon=-2.6838441 (sim=1, 96887m from DB)
- SG:  lat=55.4722328, lon=-2.683086 (sim=1, 97169m from DB)
- OSM↔SG distance: 283m
- **Reason:** Both >500m off, OSM↔SG=283m

### [medium] The Woll Golf Club (1 courses)
- DB:  lat=56.3435366, lon=-2.8023867 — New Woll Estate, Ashkirk
- OSM: lat=55.4851896, lon=-2.8548357 (sim=1, 95500m from DB)
- SG:  lat=55.48391, lon=-2.851526 (sim=1, 95635m from DB)
- OSM↔SG distance: 252m
- **Reason:** Both >500m off, OSM↔SG=252m

### [medium] Braehead Golf Club (1 courses)
- DB:  lat=56.1252771, lon=-3.8304047 — Alloa Road, Alloa
- OSM: lat=56.1259423, lon=-3.8258897 (sim=1, 289m from DB)
- SG:  lat=55.4694366, lon=-4.604505 (sim=1, 87516m from DB)
- OSM↔SG distance: 87734m
- **Reason:** Single source >1km off (osm=289m, sg=87516m)

### [medium] Renfrew Golf Club (1 courses)
- DB:  lat=55.918185, lon=-4.5849737 — Blythswood Estate, Renfrew
- OSM: lat=55.8866993, lon=-4.4007935 (sim=1, 12003m from DB)
- SG:  lat=55.8827934, lon=-4.402651 (sim=1, 12028m from DB)
- OSM↔SG distance: 449m
- **Reason:** Both >500m off, OSM↔SG=449m

### [medium] Balbirnie Park Golf Course (1 courses)
- DB:  lat=56.1785688, lon=-3.1433748 — A92, Glenrothes
- OSM: lat=56.2094742, lon=-3.1490117 (sim=1, 3454m from DB)
- SG:  lat=56.2082748, lon=-3.145155 (sim=1, 3305m from DB)
- OSM↔SG distance: 273m
- **Reason:** Both >500m off, OSM↔SG=273m

### [medium] The Musselburgh Golf Club (1 courses)
- DB:  lat=55.9469557, lon=-3.0384578 — Musselburgh, Musselburgh
- OSM: lat=55.9300364, lon=-3.0550749 (sim=1, 2147m from DB)
- SG:  lat=55.9311829, lon=-3.059641 (sim=1, 2195m from DB)
- OSM↔SG distance: 312m
- **Reason:** Both >500m off, OSM↔SG=312m

### [medium] Wick Golf Club (1 courses)
- DB:  lat=58.4931648, lon=-3.134008 — Reiss, Wick
- OSM: lat=58.4932168, lon=-3.1335844 (sim=1, 25m from DB)
- SG:  lat=58.4747925, lon=-3.134827 (sim=1, 2043m from DB)
- OSM↔SG distance: 2050m
- **Reason:** Single source >1km off (osm=25m, sg=2043m)

### [medium] Tain Golf Club (1 courses)
- DB:  lat=57.8155694, lon=-4.0274956 — Chapel Road, Tain , Inverness
- OSM: lat=57.8158047, lon=-4.0292411 (sim=1, 107m from DB)
- SG:  lat=57.8033562, lon=-4.047002 (sim=1, 1783m from DB)
- OSM↔SG distance: 1739m
- **Reason:** Single source >1km off (osm=107m, sg=1783m)

### [medium] Cowdenbeath Golf Club (1 courses)
- DB:  lat=56.1138645, lon=-3.336414 — Seco Place, Cowdenbeath
- OSM: lat=56.1156334, lon=-3.3298179 (sim=1, 454m from DB)
- SG:  lat=56.11378, lon=-3.36457 (sim=1, 1746m from DB)
- OSM↔SG distance: 2164m
- **Reason:** Single source >1km off (osm=454m, sg=1746m)

### [medium] Routenburn Golf Club (1 courses)
- DB:  lat=55.8212246, lon=-4.8735622 — Routenburn Rd, Largs
- OSM: lat=55.8211617, lon=-4.875485 (sim=1, 120m from DB)
- SG:  lat=55.80663, lon=-4.872294 (sim=1, 1625m from DB)
- OSM↔SG distance: 1628m
- **Reason:** Single source >1km off (osm=120m, sg=1625m)

### [medium] Buchanan Castle Golf Club (1 courses)
- DB:  lat=56.0632777, lon=-4.4787736 — Buchanan Castle Estate, Drymen
- OSM: lat=56.0635381, lon=-4.4803593 (sim=1, 103m from DB)
- SG:  lat=56.0759163, lon=-4.489967 (sim=1, 1568m from DB)
- OSM↔SG distance: 1500m
- **Reason:** Single source >1km off (osm=103m, sg=1568m)

### [medium] Ranfurly Castle Golf Club (1 courses)
- DB:  lat=55.8527427, lon=-4.6094319 — Golf Road, Bridge Of Weir
- OSM: lat=55.8526622, lon=-4.6032974 (sim=1, 383m from DB)
- SG:  lat=55.8546333, lon=-4.586823 (sim=1, 1427m from DB)
- OSM↔SG distance: 1051m
- **Reason:** Single source >1km off (osm=383m, sg=1427m)

### [medium] Kintore Golf Club (1 courses)
- DB:  lat=57.243155, lon=-2.3143404 — Balbithan, Kintore
- OSM: lat=57.2431114, lon=-2.3207408 (sim=1, 385m from DB)
- SG:  lat=57.2464676, lon=-2.336452 (sim=1, 1380m from DB)
- OSM↔SG distance: 1016m
- **Reason:** Single source >1km off (osm=385m, sg=1380m)

### [medium] Spean Bridge Golf Club (1 courses)
- DB:  lat=56.8874677, lon=-4.9311804 — Station Rd, Lochaber
- OSM: lat=56.887372, lon=-4.9284853 (sim=1, 164m from DB)
- SG:  lat=56.8950157, lon=-4.913227 (sim=1, 1376m from DB)
- OSM↔SG distance: 1257m
- **Reason:** Single source >1km off (osm=164m, sg=1376m)

### [medium] Hollandbush Golf Course (1 courses)
- DB:  lat=55.6112509, lon=-3.8893067 — Acretophead, Lesmahagow
- OSM: lat=55.6111932, lon=-3.8902109 (sim=1, 57m from DB)
- SG:  lat=55.6230927, lon=-3.892141 (sim=1, 1329m from DB)
- OSM↔SG distance: 1329m
- **Reason:** Single source >1km off (osm=57m, sg=1329m)

### [medium] Bute Golf Club (1 courses)
- DB:  lat=55.7580874, lon=-5.0578093 — 32 Marine Place, Ardbeg, Rothesay
- OSM: lat=55.7584884, lon=-5.058245 (sim=1, 52m from DB)
- SG:  lat=55.76944, lon=-5.064274 (sim=1, 1326m from DB)
- OSM↔SG distance: 1275m
- **Reason:** Single source >1km off (osm=52m, sg=1326m)

### [medium] Machrihanish Golf Club (2 courses)
- DB:  lat=55.423061, lon=-5.7312743 — Machrihanish, Machrihanish
- OSM: lat=55.4330758, lon=-5.7201844 (sim=1, 1315m from DB)
- SG:  lat=55.42388, lon=-5.731212 (sim=1, 91m from DB)
- OSM↔SG distance: 1237m
- **Reason:** Single source >1km off (osm=1315m, sg=91m)

### [medium] Drumpellier Golf Club (1 courses)
- DB:  lat=55.8603443, lon=-4.0517857 — Drumpellier Avenue, Coatbridge
- OSM: lat=55.8596514, lon=-4.0561377 (sim=1, 282m from DB)
- SG:  lat=55.8689232, lon=-4.065748 (sim=1, 1292m from DB)
- OSM↔SG distance: 1193m
- **Reason:** Single source >1km off (osm=282m, sg=1292m)

### [medium] Muirkirk (1 courses)
- DB:  lat=55.5222748, lon=-4.0659801 — 1 Cairn View, muirkirk
- OSM: lat=55.5113868, lon=-4.0727357 (sim=1, 1283m from DB)
- SG:  lat=55.522747, lon=-4.065482 (sim=1, 61m from DB)
- OSM↔SG distance: 1343m
- **Reason:** Single source >1km off (osm=1283m, sg=61m)

### [medium] Auchenblae Golf Course (1 courses)
- DB:  lat=56.9036572, lon=-2.4417279 — Auchenblae, Laurencekirk
- OSM: lat=56.9036448, lon=-2.4401106 (sim=1, 98m from DB)
- SG:  lat=56.9094467, lon=-2.424518 (sim=1, 1227m from DB)
- OSM↔SG distance: 1146m
- **Reason:** Single source >1km off (osm=98m, sg=1227m)

### [medium] Glen Golf Club (1 courses)
- DB:  lat=56.0587337, lon=-2.6856607 — Tantallon Road, North Berwick
- OSM: lat=56.0585923, lon=-2.689567 (sim=1, 243m from DB)
- SG:  lat=56.0572662, lon=-2.705085 (sim=1, 1217m from DB)
- OSM↔SG distance: 975m
- **Reason:** Single source >1km off (osm=243m, sg=1217m)

### [medium] Tarland Golf Club (1 courses)
- DB:  lat=57.1296254, lon=-2.8548635 — Aberdeen Road, Tarland
- OSM: lat=57.1288455, lon=-2.846923 (sim=1, 487m from DB)
- SG:  lat=57.13841, lon=-2.843495 (sim=1, 1194m from DB)
- OSM↔SG distance: 1083m
- **Reason:** Single source >1km off (osm=487m, sg=1194m)

### [medium] Brora Golf Club (1 courses)
- DB:  lat=58.0234824, lon=-3.8426685 — 43 Golf Road, Brora
- OSM: lat=58.0233987, lon=-3.842989 (sim=1, 21m from DB)
- SG:  lat=58.01305, lon=-3.847243 (sim=1, 1191m from DB)
- OSM↔SG distance: 1178m
- **Reason:** Single source >1km off (osm=21m, sg=1191m)

### [medium] Pollok Golf Club (1 courses)
- DB:  lat=55.8266914, lon=-4.3246305 — 90 Barrhead Road, Glasgow
- OSM: lat=55.8265162, lon=-4.3190389 (sim=1, 350m from DB)
- SG:  lat=55.82236, lon=-4.307346 (sim=1, 1182m from DB)
- OSM↔SG distance: 864m
- **Reason:** Single source >1km off (osm=350m, sg=1182m)

### [medium] Thurso Golf Club (1 courses)
- DB:  lat=58.5829183, lon=-3.5527376 — Newlands of Geise, Thurso
- OSM: lat=58.5826497, lon=-3.5523179 (sim=1, 39m from DB)
- SG:  lat=58.5734253, lon=-3.56176 (sim=1, 1178m from DB)
- OSM↔SG distance: 1163m
- **Reason:** Single source >1km off (osm=39m, sg=1178m)

### [medium] Mortonhall Golf Course (1 courses)
- DB:  lat=55.9089857, lon=-3.1913923 — 231 Briad Road, Edinburgh
- OSM: lat=55.9090551, lon=-3.1972156 (sim=1, 363m from DB)
- SG:  lat=55.91128, lon=-3.20956 (sim=1, 1161m from DB)
- OSM↔SG distance: 808m
- **Reason:** Single source >1km off (osm=363m, sg=1161m)

### [medium] Innerleithen Golf Club (1 courses)
- DB:  lat=55.639936, lon=-3.0568305 — Leithen Road, Innerleithen
- OSM: lat=55.6398916, lon=-3.0577668 (sim=1, 59m from DB)
- SG:  lat=55.64855, lon=-3.067089 (sim=1, 1154m from DB)
- OSM↔SG distance: 1127m
- **Reason:** Single source >1km off (osm=59m, sg=1154m)

### [medium] Dullatur Golf Club (2 courses)
- DB:  lat=55.9594792, lon=-4.028104 — Glen Douglas Drive, Cumbernauld
- OSM: lat=55.9594529, lon=-4.0164973 (sim=1, 722m from DB)
- SG:  lat=55.9610023, lon=-4.010301 (sim=1, 1121m from DB)
- OSM↔SG distance: 422m
- **Reason:** Both >500m off, OSM↔SG=422m

### [medium] Langlands Golf Club (1 courses)
- DB:  lat=55.7313056, lon=-4.1748544 — Langlands Road ,  Kilbride
- OSM: lat=55.7310074, lon=-4.1739774 (sim=1, 64m from DB)
- SG:  lat=55.7266464, lon=-4.190724 (sim=1, 1121m from DB)
- OSM↔SG distance: 1155m
- **Reason:** Single source >1km off (osm=64m, sg=1121m)

### [medium] Moray Golf Club (2 courses)
- DB:  lat=57.719229, lon=-3.3154421 — Stotfeild Rd, Lossiemouth
- OSM: lat=57.7192432, lon=-3.3143426 (sim=1, 65m from DB)
- SG:  lat=57.7205658, lon=-3.296795 (sim=1, 1117m from DB)
- OSM↔SG distance: 1052m
- **Reason:** Single source >1km off (osm=65m, sg=1117m)

### [medium] Meldrum House Golf Course (1 courses)
- DB:  lat=57.3524062, lon=-2.3085249 — Aberdeenshire, Inverurie
- OSM: lat=57.3524312, lon=-2.3141866 (sim=1, 340m from DB)
- SG:  lat=57.35173, lon=-2.326563 (sim=1, 1085m from DB)
- OSM↔SG distance: 747m
- **Reason:** Single source >1km off (osm=340m, sg=1085m)

### [medium] Torwoodlee Golf Club (1 courses)
- DB:  lat=55.6378248, lon=-2.84007 — Edinburgh Road, Galashiels
- OSM: lat=55.6362389, lon=-2.8370391 (sim=1, 259m from DB)
- SG:  lat=55.63, lon=-2.83 (sim=1, 1075m from DB)
- OSM↔SG distance: 822m
- **Reason:** Single source >1km off (osm=259m, sg=1075m)

### [medium] Lundin Golf Club (1 courses)
- DB:  lat=56.208761, lon=-2.9704422 — Golf Road, Leven
- OSM: lat=56.2087757, lon=-2.9649202 (sim=1, 342m from DB)
- SG:  lat=56.21098, lon=-2.953556 (sim=1, 1073m from DB)
- OSM↔SG distance: 744m
- **Reason:** Single source >1km off (osm=342m, sg=1073m)

### [medium] Orkney Golf Club (1 courses)
- DB:  lat=58.9873247, lon=-2.9828836 — Grainbank, Kirkwall
- OSM: lat=58.9849041, lon=-2.9869959 (sim=1, 358m from DB)
- SG:  lat=58.99452, lon=-2.99416 (sim=1, 1028m from DB)
- OSM↔SG distance: 1145m
- **Reason:** Single source >1km off (osm=358m, sg=1028m)

### [medium] Fraserburgh Golf Club (2 courses)
- DB:  lat=57.6743216, lon=-1.9806214 — Philorth links, Fraserburgh
- OSM: lat=57.6742651, lon=-1.9812047 (sim=1, 35m from DB)
- SG:  lat=57.6784, lon=-1.9961 (sim=1, 1026m from DB)
- OSM↔SG distance: 998m
- **Reason:** Single source >1km off (osm=35m, sg=1026m)

### [medium] Kilspindie Golf Club (1 courses)
- DB:  lat=56.0097806, lon=-2.8883036 — The Clubhouse, Aberlady
- OSM: lat=56.0096657, lon=-2.881928 (sim=1, 397m from DB)
- SG:  lat=56.0126, lon=-2.8726 (sim=1, 1025m from DB)
- OSM↔SG distance: 665m
- **Reason:** Single source >1km off (osm=397m, sg=1025m)

### [medium] Panmure Golf Club (1 courses)
- DB:  lat=56.4953271, lon=-2.7521733 — Burnside Road, Carnoustie
- OSM: lat=56.491712, lon=-2.7675251 (sim=1, 1024m from DB)
- SG:  lat=56.495388, lon=-2.749286 (sim=1, 177m from DB)
- OSM↔SG distance: 1192m
- **Reason:** Single source >1km off (osm=1024m, sg=177m)

### [medium] Tillicoultry (1 courses)
- DB:  lat=56.1531387, lon=-3.7414782 — Alva Road, tillicoultry
- OSM: lat=56.1554622, lon=-3.7561056 (sim=1, 942m from DB)
- SG:  lat=56.1540756, lon=-3.750558 (sim=1, 572m from DB)
- OSM↔SG distance: 377m
- **Reason:** Both >500m off, OSM↔SG=377m

### [medium] Reay Golf Course (2 courses)
- DB:  lat=58.5612603, lon=-3.7654176 — Reay , Thurso
- OSM: lat=58.5629503, lon=-3.7751396 (sim=1, 594m from DB)
- SG:  lat=58.5600166, lon=-3.779145 (sim=1, 808m from DB)
- OSM↔SG distance: 400m
- **Reason:** Both >500m off, OSM↔SG=400m

## medium-osm-only flags (12)

### [medium-osm-only] St Cuthberts Golf Club (1 courses)
- DB:  lat=56.3435366, lon=-2.8023867 — East Road, Prestwick
- OSM: lat=55.490234, lon=-4.5959083 (sim=0.917, 146597m from DB)
- **Reason:** OSM-only and >1km off (146597m). Needs second-source verification.

### [medium-osm-only] Machrie Golf Links (1 courses)
- DB:  lat=55.553374, lon=-5.3401201 — Port Ellen, Isle Of Islay
- OSM: lat=55.6643758, lon=-6.2558669 (sim=1, 58825m from DB)
- **Reason:** OSM-only and >1km off (58825m). Needs second-source verification.

### [medium-osm-only] The Machrie (1 courses)
- DB:  lat=55.553374, lon=-5.3401201 — Port Ellen, Isle of Islay
- OSM: lat=55.6643758, lon=-6.2558669 (sim=1, 58825m from DB)
- **Reason:** OSM-only and >1km off (58825m). Needs second-source verification.

### [medium-osm-only] Eastwood Golf Club (1 courses)
- DB:  lat=55.8184966, lon=-4.3213363 — Muirshield, Loganswell, Newton Mearns
- OSM: lat=55.7449343, lon=-4.3549289 (sim=1, 8445m from DB)
- **Reason:** OSM-only and >1km off (8445m). Needs second-source verification.

### [medium-osm-only] Covesea Links Golf (1 courses)
- DB:  lat=57.6485426, lon=-3.3177304 — B9040, Elgin
- OSM: lat=57.7208799, lon=-3.3595062 (sim=1, 8418m from DB)
- **Reason:** OSM-only and >1km off (8418m). Needs second-source verification.

### [medium-osm-only] Bruntsfield Links (1 courses)
- DB:  lat=55.9396962, lon=-3.2009925 — 32 Barnton Avenue, Edinburgh
- OSM: lat=55.9700204, lon=-3.2911382 (sim=1, 6547m from DB)
- **Reason:** OSM-only and >1km off (6547m). Needs second-source verification.

### [medium-osm-only] Rutherford Castle Golf Club (1 courses)
- DB:  lat=55.7521811, lon=-3.3560656 — West Linton, West Linton
- OSM: lat=55.7700401, lon=-3.3374444 (sim=1, 2302m from DB)
- **Reason:** OSM-only and >1km off (2302m). Needs second-source verification.

### [medium-osm-only] Newcastle United Golf Club (1 courses)
- DB:  lat=55.0071647, lon=-1.6694428 — 60 Ponteland Road, Newcastle Upon Tyne
- OSM: lat=54.9927557, lon=-1.6445869 (sim=1, 2254m from DB)
- **Reason:** OSM-only and >1km off (2254m). Needs second-source verification.

### [medium-osm-only] Bamburgh Castle Golf Club (1 courses)
- DB:  lat=55.6092563, lon=-1.7158087 —  The Wynding, Bamburgh
- OSM: lat=55.6119863, lon=-1.7369533 (sim=1, 1362m from DB)
- **Reason:** OSM-only and >1km off (1362m). Needs second-source verification.

### [medium-osm-only] Haggerston Castle Golf Course (1 courses)
- DB:  lat=55.6858809, lon=-1.9385844 — Haggerston Castle, Haggerston
- OSM: lat=55.6896432, lon=-1.9212179 (sim=1, 1166m from DB)
- **Reason:** OSM-only and >1km off (1166m). Needs second-source verification.

### [medium-osm-only] Troon Lochgreen Golf Course (1 courses)
- DB:  lat=55.5437824, lon=-4.6516304 — Harling Drive, Troon
- OSM: lat=55.5362249, lon=-4.6395457 (sim=1, 1133m from DB)
- **Reason:** OSM-only and >1km off (1133m). Needs second-source verification.

### [medium-osm-only] Blyth Golf Course (1 courses)
- DB:  lat=55.107823, lon=-1.5298539 — New Delaval & Newsham, Blyth
- OSM: lat=55.1144113, lon=-1.5414009 (sim=1, 1037m from DB)
- **Reason:** OSM-only and >1km off (1037m). Needs second-source verification.

## medium-sg-only flags (17)

### [medium-sg-only] Royal Dornoch Golf Club (2 courses)
- DB:  lat=56.3435366, lon=-2.8023867 — Golf Road, Dornoch
- SG:  lat=57.87902, lon=-4.023651 (sim=1, 185974m from DB)
- **Reason:** SG-only and >1km off (185974m). Needs second-source verification.

### [medium-sg-only] Gatehouse Golf Club (1 courses)
- DB:  lat=56.3435366, lon=-2.8023867 — Laurieston Road, Gatehouse of Fleet
- SG:  lat=54.8952255, lon=-4.178061 (sim=1, 182739m from DB)
- **Reason:** SG-only and >1km off (182739m). Needs second-source verification.

### [medium-sg-only] Innellan Golf Club (1 courses)
- DB:  lat=56.3435366, lon=-2.8023867 — -, Innellan
- SG:  lat=55.89614, lon=-4.957232 (sim=1, 142527m from DB)
- **Reason:** SG-only and >1km off (142527m). Needs second-source verification.

### [medium-sg-only] Golf Course @ Woodlands Glencoe (1 courses)
- DB:  lat=55.999754, lon=-3.7840836 — Woodlands, Ballachulish
- SG:  lat=56.68548, lon=-5.18817 (sim=1, 115327m from DB)
- **Reason:** SG-only and >1km off (115327m). Needs second-source verification.

### [medium-sg-only] Caird Park Golf Club (2 courses)
- DB:  lat=55.9105418, lon=-4.2988754 — Kingsway, Dundee
- SG:  lat=56.4844627, lon=-2.958457 (sim=1, 104631m from DB)
- **Reason:** SG-only and >1km off (104631m). Needs second-source verification.

### [medium-sg-only] Dalmahoy Hotel & Country Club (2 courses)
- DB:  lat=55.5672821, lon=-2.1443391 — KIRKNEWTON, Kirknewton
- SG:  lat=55.90401, lon=-3.37051 (sim=1, 85406m from DB)
- **Reason:** SG-only and >1km off (85406m). Needs second-source verification.

### [medium-sg-only] Ballater Golf Club (1 courses)
- DB:  lat=56.3435366, lon=-2.8023867 — Victoria Road, Ballater
- SG:  lat=57.04543, lon=-3.045129 (sim=1, 79442m from DB)
- **Reason:** SG-only and >1km off (79442m). Needs second-source verification.

### [medium-sg-only] Blairgowrie Golf Club (3 courses)
- DB:  lat=56.3435366, lon=-2.8023867 — Golf Course Road, Blairgowrie
- SG:  lat=56.57372, lon=-3.336413 (sim=1, 41613m from DB)
- **Reason:** SG-only and >1km off (41613m). Needs second-source verification.

### [medium-sg-only] Dumfries & Galloway Golf Club (1 courses)
- DB:  lat=55.0678253, lon=-4.1469042 — 2 Laurieston Avenue, Dumfries
- SG:  lat=55.0652161, lon=-3.62764 (sim=1, 33064m from DB)
- **Reason:** SG-only and >1km off (33064m). Needs second-source verification.

### [medium-sg-only] Torrance Park Golf Club (1 courses)
- DB:  lat=55.7434398, lon=-4.1497253 — 2 Morris Drive, Motherwell
- SG:  lat=55.8226433, lon=-3.957463 (sim=1, 14903m from DB)
- **Reason:** SG-only and >1km off (14903m). Needs second-source verification.

### [medium-sg-only] Alloa Golf Club (1 courses)
- DB:  lat=56.1252771, lon=-3.8304047 — Shawpark, Alloa
- SG:  lat=56.1306648, lon=-3.773243 (sim=1, 3593m from DB)
- **Reason:** SG-only and >1km off (3593m). Needs second-source verification.

### [medium-sg-only] Benbecula Golf Club (1 courses)
- DB:  lat=57.4789529, lon=-7.3586191 — 5B Nunton, Isle of Benbecula
- SG:  lat=57.45778, lon=-7.396372 (sim=1, 3262m from DB)
- **Reason:** SG-only and >1km off (3262m). Needs second-source verification.

### [medium-sg-only] Spey Valley Golf Course (2 courses)
- DB:  lat=57.2084935, lon=-3.8032283 — Dalfaber Drive, Aviemore
- SG:  lat=57.1882057, lon=-3.833783 (sim=1, 2911m from DB)
- **Reason:** SG-only and >1km off (2911m). Needs second-source verification.

### [medium-sg-only] Dumfries & County Golf Club (1 courses)
- DB:  lat=55.0570225, lon=-3.593449 — Edinburgh Road, Dumfries
- SG:  lat=55.0801277, lon=-3.601097 (sim=1, 2615m from DB)
- **Reason:** SG-only and >1km off (2615m). Needs second-source verification.

### [medium-sg-only] Blairmore  Strone Golf Club (1 courses)
- DB:  lat=55.9897004, lon=-4.9018497 — High Road, Dunoon
- SG:  lat=55.9915466, lon=-4.931159 (sim=1, 1834m from DB)
- **Reason:** SG-only and >1km off (1834m). Needs second-source verification.

### [medium-sg-only] Fort William Golf Club (1 courses)
- DB:  lat=56.8397238, lon=-5.0571728 — North Road, Torlundy , Fort William
- SG:  lat=56.8491, lon=-5.0469 (sim=1, 1215m from DB)
- **Reason:** SG-only and >1km off (1215m). Needs second-source verification.

### [medium-sg-only] Askernish Golf Club (1 courses)
- DB:  lat=57.1893274, lon=-7.4145048 — Askernish, Isle Of South Uist, Outer Hebrides, Scotland, HS8 5SY, Isle of South Uist
- SG:  lat=57.18713, lon=-7.396316 (sim=1, 1123m from DB)
- **Reason:** SG-only and >1km off (1123m). Needs second-source verification.

## low flags (14)

### [low] Dunbar Golf Course (1 courses)
- DB:  lat=57.590662, lon=-3.8513127 — East Links, Dunbar
- OSM: lat=55.993159, lon=-2.4848121 (sim=1, 196152m from DB)
- SG:  lat=55.99771, lon=-2.499694 (sim=1, 195308m from DB)
- OSM↔SG distance: 1055m
- **Reason:** Both off, sources disagree (1055m apart)

### [low] Turnberry Golf Club (3 courses)
- DB:  lat=56.4891998, lon=-3.0271535 — Maidens Road, Girvan
- OSM: lat=55.3219191, lon=-4.8361435 (sim=1, 171921m from DB)
- SG:  lat=55.314106, lon=-4.828921 (sim=1, 172292m from DB)
- OSM↔SG distance: 982m
- **Reason:** Both off, sources disagree (982m apart)

### [low] Kings Golf Club (1 courses)
- DB:  lat=57.4632517, lon=-4.2664579 — Balphadrig Road, Inverness
- OSM: lat=57.1664695, lon=-2.0830734 (sim=1, 135190m from DB)
- SG:  lat=57.4660263, lon=-4.255089 (sim=1, 747m from DB)
- OSM↔SG distance: 134599m
- **Reason:** Both off, sources disagree (134599m apart)

### [low] Milton Park Golf Club (1 courses)
- DB:  lat=55.8496877, lon=-3.1999709 — Ely Road, Milton
- OSM: lat=55.9679432, lon=-4.3541768 (sim=0.909, 73128m from DB)
- SG:  lat=55.9683876, lon=-4.36294 (sim=0.909, 73674m from DB)
- OSM↔SG distance: 548m
- **Reason:** Both off, sources disagree (548m apart)

### [low] Rothes Golf Club (1 courses)
- DB:  lat=57.4536421, lon=-4.2035316 — Rothes, Aberlour
- OSM: lat=57.5233699, lon=-3.223092 (sim=1, 59105m from DB)
- SG:  lat=57.51353, lon=-3.2383 (sim=1, 58076m from DB)
- OSM↔SG distance: 1422m
- **Reason:** Both off, sources disagree (1422m apart)

### [low] North Berwick Golf Club (1 courses)
- DB:  lat=55.7682647, lon=-1.9915831 — Beach Road, North Berwick
- OSM: lat=56.0597721, lon=-2.7464812 (sim=1, 57129m from DB)
- SG:  lat=56.0586, lon=-2.7273 (sim=1, 56074m from DB)
- OSM↔SG distance: 1198m
- **Reason:** Both off, sources disagree (1198m apart)

### [low] Spey Bay Golf Club (1 courses)
- DB:  lat=57.3331061, lon=-3.5933501 — Spey Bay Hotel, Fochabers
- OSM: lat=57.6683777, lon=-3.0642943 (sim=1, 48876m from DB)
- SG:  lat=57.67187, lon=-3.082679 (sim=1, 48473m from DB)
- OSM↔SG distance: 1160m
- **Reason:** Both off, sources disagree (1160m apart)

### [low] West Lothian Golf Club (1 courses)
- DB:  lat=55.8976768, lon=-3.6386104 — Airngath Hill, Linlithgow
- OSM: lat=55.9970119, lon=-3.6005736 (sim=1, 11297m from DB)
- SG:  lat=55.99, lon=-3.59 (sim=1, 10703m from DB)
- OSM↔SG distance: 1020m
- **Reason:** Both off, sources disagree (1020m apart)

### [low] Dumbarnie Golf Links (1 courses)
- DB:  lat=56.1951935, lon=-2.9965919 — -, Leven
- OSM: lat=56.2081078, lon=-2.8919786 (sim=1, 6628m from DB)
- SG:  lat=56.21557, lon=-2.883792 (sim=1, 7335m from DB)
- OSM↔SG distance: 972m
- **Reason:** Both off, sources disagree (972m apart)

### [low] Palacerigg Golf Course (1 courses)
- DB:  lat=55.9477764, lon=-3.9882568 — Cumbernauld, Cumbernauld
- OSM: lat=55.9391655, lon=-3.9398336 (sim=1, 3164m from DB)
- SG:  lat=55.9354248, lon=-3.957599 (sim=1, 2352m from DB)
- OSM↔SG distance: 1182m
- **Reason:** Both off, sources disagree (1182m apart)

### [low] The Bishopbriggs Golf Course (1 courses)
- DB:  lat=55.8976872, lon=-4.2172335 —  Brackenbrae Road, Bishopbriggs
- OSM: lat=55.9113111, lon=-4.2412299 (sim=1, 2129m from DB)
- SG:  lat=55.908638, lon=-4.231059 (sim=1, 1492m from DB)
- OSM↔SG distance: 700m
- **Reason:** Both off, sources disagree (700m apart)

### [low] Nairn Golf Club (2 courses)
- DB:  lat=57.5843851, lon=-3.9200548 — Seabank road, Nairn
- OSM: lat=57.5845294, lon=-3.908488 (sim=1, 690m from DB)
- SG:  lat=57.58761, lon=-3.895816 (sim=1, 1489m from DB)
- OSM↔SG distance: 829m
- **Reason:** Both off, sources disagree (829m apart)

### [low] Archerfield Golf Club (2 courses)
- DB:  lat=56.0553478, lon=-2.8005583 — Golf Club House, Dirleton
- OSM: lat=56.0556716, lon=-2.792248 (sim=1, 517m from DB)
- SG:  lat=56.0447845, lon=-2.803468 (sim=1, 1188m from DB)
- OSM↔SG distance: 1397m
- **Reason:** Both off, sources disagree (1397m apart)

### [low] Cruden Bay Golf Club (2 courses)
- DB:  lat=57.4133158, lon=-1.8635741 — Aulton Road, Cruden Bay 
- OSM: lat=57.406562, lon=-1.8585756 (sim=1, 808m from DB)
- SG:  lat=57.4151955, lon=-1.851963 (sim=1, 726m from DB)
- OSM↔SG distance: 1038m
- **Reason:** Both off, sources disagree (1038m apart)
