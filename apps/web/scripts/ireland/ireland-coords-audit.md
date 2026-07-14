# Ireland coordinate audit
Generated: 2026-05-02T04:02:51

## Summary

| Status | Clubs |
|---|---:|
| OK (DB coords match source consensus) | 223 |
| Flagged — DB diverges from sources | 130 |
|   level=high (OSM+GI agree, DB wrong) | 27 |
|   level=medium (one source >1km off) | 83 |
|   level=low (sources disagree) | 20 |
| No source match (cant audit) | 73 |

## HIGH confidence flags

### [high] Killeen Castle (Ireland, 1 courses)

- DB:  lat=53.3128008, lon=-8.9787371 — Killeen Road, Dunsany
- OSM: lat=53.5357476, lon=-6.5921081 (sim=1, 160060m from DB)
- GI:  lat=53.53551, lon=-6.593918 (sim=1, 159938m from DB)
- OSM↔GI distance: 122m
- **Reason:** OSM+GI consensus (apart 122m), but DB diverges (osm=160060m, gi=159938m)
- Suggested fix: lat=53.5356288, lon=-6.5930130 (OSM+GI midpoint)

### [high] Down Royal Golf Course (Northern Ireland, 3 courses)

- DB:  lat=54.223194, lon=-5.8765903 — 6 Dunygarton Road, Lisburn
- OSM: lat=54.4922742, lon=-6.1279215 (sim=1, 34065m from DB)
- GI:  lat=54.4908829, lon=-6.126685 (sim=1, 33891m from DB)
- OSM↔GI distance: 174m
- **Reason:** OSM+GI consensus (apart 174m), but DB diverges (osm=34065m, gi=33891m)
- Suggested fix: lat=54.4915785, lon=-6.1273033 (OSM+GI midpoint)

### [high] Lisburn Golf Club (Northern Ireland, 1 courses)

- DB:  lat=54.5520331, lon=-5.8833533 —  68 Eglantine Road, Lisburn
- OSM: lat=54.485947, lon=-6.0732916 (sim=1, 14293m from DB)
- GI:  lat=54.4859467, lon=-6.072137 (sim=1, 14229m from DB)
- OSM↔GI distance: 75m
- **Reason:** OSM+GI consensus (apart 75m), but DB diverges (osm=14293m, gi=14229m)
- Suggested fix: lat=54.4859469, lon=-6.0727143 (OSM+GI midpoint)

### [high] Beaufort Golf Club (Ireland, 1 courses)

- DB:  lat=52.0595746, lon=-9.505322 — -, Killarney
- OSM: lat=52.068691, lon=-9.6739858 (sim=1, 11574m from DB)
- GI:  lat=52.06822, lon=-9.672048 (sim=1, 11438m from DB)
- OSM↔GI distance: 142m
- **Reason:** OSM+GI consensus (apart 142m), but DB diverges (osm=11574m, gi=11438m)
- Suggested fix: lat=52.0684555, lon=-9.6730169 (OSM+GI midpoint)

### [high] Ring of Kerry Golf Club (Ireland, 1 courses)

- DB:  lat=51.8844767, lon=-9.5808413 — Ring of Kerry, Kenmare
- OSM: lat=51.8757684, lon=-9.673132 (sim=1, 6409m from DB)
- GI:  lat=51.87518, lon=-9.672369 (sim=1, 6367m from DB)
- OSM↔GI distance: 84m
- **Reason:** OSM+GI consensus (apart 84m), but DB diverges (osm=6409m, gi=6367m)
- Suggested fix: lat=51.8754742, lon=-9.6727505 (OSM+GI midpoint)

### [high] Corballis Links Golf Club (Ireland, 1 courses)

- DB:  lat=53.4926215, lon=-6.1944889 — Dublin, Donabate
- OSM: lat=53.4712543, lon=-6.1249715 (sim=1, 5177m from DB)
- GI:  lat=53.4712944, lon=-6.126084 (sim=1, 5110m from DB)
- OSM↔GI distance: 74m
- **Reason:** OSM+GI consensus (apart 74m), but DB diverges (osm=5177m, gi=5110m)
- Suggested fix: lat=53.4712744, lon=-6.1255277 (OSM+GI midpoint)

### [high] Newlands Golf Club (Ireland, 1 courses)

- DB:  lat=53.3170152, lon=-6.43853 — -, Dublin 22
- OSM: lat=53.3085622, lon=-6.393342 (sim=1, 3146m from DB)
- GI:  lat=53.3079567, lon=-6.390957 (sim=1, 3317m from DB)
- OSM↔GI distance: 172m
- **Reason:** OSM+GI consensus (apart 172m), but DB diverges (osm=3146m, gi=3317m)
- Suggested fix: lat=53.3082594, lon=-6.3921495 (OSM+GI midpoint)

### [high] Ballinamore Golf Club (Ireland, 1 courses)

- DB:  lat=54.0552864, lon=-7.7894733 — 12 An Leathard, Ballinamore
- OSM: lat=54.0548663, lon=-7.8339911 (sim=1, 2906m from DB)
- GI:  lat=54.05571, lon=-7.83358669 (sim=1, 2880m from DB)
- OSM↔GI distance: 97m
- **Reason:** OSM+GI consensus (apart 97m), but DB diverges (osm=2906m, gi=2880m)
- Suggested fix: lat=54.0552881, lon=-7.8337889 (OSM+GI midpoint)

### [high] Slade Valley Golf Club (Ireland, 1 courses)

- DB:  lat=53.2360108, lon=-6.4541965 — Brittas
- OSM: lat=53.2566793, lon=-6.4703478 (sim=1, 2537m from DB)
- GI:  lat=53.2566376, lon=-6.471379 (sim=1, 2563m from DB)
- OSM↔GI distance: 69m
- **Reason:** OSM+GI consensus (apart 69m), but DB diverges (osm=2537m, gi=2563m)
- Suggested fix: lat=53.2566585, lon=-6.4708634 (OSM+GI midpoint)

### [high] Greencastle Golf Club (Ireland, 1 courses)

- DB:  lat=55.2036701, lon=-6.981019 — -, Greencastle
- OSM: lat=55.2106127, lon=-6.9600348 (sim=1, 1539m from DB)
- GI:  lat=55.2122078, lon=-6.958682 (sim=1, 1706m from DB)
- OSM↔GI distance: 197m
- **Reason:** OSM+GI consensus (apart 197m), but DB diverges (osm=1539m, gi=1706m)
- Suggested fix: lat=55.2114103, lon=-6.9593584 (OSM+GI midpoint)

### [high] Bray Golf Club (Ireland, 1 courses)

- DB:  lat=53.1877864, lon=-6.0770253 — Bray-Greystones Cliff Walk, Bray
- OSM: lat=53.182073, lon=-6.0923568 (sim=1, 1203m from DB)
- GI:  lat=53.1814, lon=-6.094498 (sim=1, 1364m from DB)
- OSM↔GI distance: 161m
- **Reason:** OSM+GI consensus (apart 161m), but DB diverges (osm=1203m, gi=1364m)
- Suggested fix: lat=53.1817365, lon=-6.0934274 (OSM+GI midpoint)

### [high] Castlerea Golf Club (Ireland, 1 courses)

- DB:  lat=53.7803982, lon=-8.5153629 — Clonalis, Castlerea
- OSM: lat=53.7715751, lon=-8.5011964 (sim=1, 1352m from DB)
- GI:  lat=53.77086, lon=-8.502409 (sim=1, 1360m from DB)
- OSM↔GI distance: 113m
- **Reason:** OSM+GI consensus (apart 113m), but DB diverges (osm=1352m, gi=1360m)
- Suggested fix: lat=53.7712176, lon=-8.5018027 (OSM+GI midpoint)

### [high] Ashbourne Golf Club (Ireland, 1 courses)

- DB:  lat=53.5131373, lon=-6.3879503 — Archerstown, Ashbourne
- OSM: lat=53.50318, lon=-6.3764753 (sim=1, 1342m from DB)
- GI:  lat=53.50399, lon=-6.37915468 (sim=1, 1172m from DB)
- OSM↔GI distance: 199m
- **Reason:** OSM+GI consensus (apart 199m), but DB diverges (osm=1342m, gi=1172m)
- Suggested fix: lat=53.5035850, lon=-6.3778150 (OSM+GI midpoint)

### [high] Skerries Golf Club (Ireland, 1 courses)

- DB:  lat=53.5652299, lon=-6.103036 — Hackettstown Skerries Co. Dublin, Skerries
- OSM: lat=53.5590856, lon=-6.1176164 (sim=1, 1181m from DB)
- GI:  lat=53.5594826, lon=-6.115653 (sim=1, 1050m from DB)
- OSM↔GI distance: 137m
- **Reason:** OSM+GI consensus (apart 137m), but DB diverges (osm=1181m, gi=1050m)
- Suggested fix: lat=53.5592841, lon=-6.1166347 (OSM+GI midpoint)

### [high] Cobh Golf Club (Ireland, 1 courses)

- DB:  lat=51.8783058, lon=-8.3313704 — Marino Point, Cobh
- OSM: lat=51.875753, lon=-8.3147406 (sim=1, 1176m from DB)
- GI:  lat=51.87607, lon=-8.31466 (sim=1, 1174m from DB)
- OSM↔GI distance: 36m
- **Reason:** OSM+GI consensus (apart 36m), but DB diverges (osm=1176m, gi=1174m)
- Suggested fix: lat=51.8759115, lon=-8.3147003 (OSM+GI midpoint)

### [high] Delgany Golf Club (Ireland, 1 courses)

- DB:  lat=53.1350413, lon=-6.0877229 — Delgany, Delgany
- OSM: lat=53.1335098, lon=-6.1033801 (sim=1, 1058m from DB)
- GI:  lat=53.1327934, lon=-6.101448 (sim=1, 949m from DB)
- OSM↔GI distance: 152m
- **Reason:** OSM+GI consensus (apart 152m), but DB diverges (osm=1058m, gi=949m)
- Suggested fix: lat=53.1331516, lon=-6.1024141 (OSM+GI midpoint)

### [high] Mulranny Golf Club (Ireland, 1 courses)

- DB:  lat=53.9070181, lon=-9.7737854 — Mulranny, Mulranny
- OSM: lat=53.9009608, lon=-9.7625575 (sim=1, 997m from DB)
- GI:  lat=53.9023933, lon=-9.763286 (sim=1, 859m from DB)
- OSM↔GI distance: 166m
- **Reason:** OSM+GI consensus (apart 166m), but DB diverges (osm=997m, gi=859m)
- Suggested fix: lat=53.9016771, lon=-9.7629218 (OSM+GI midpoint)

### [high] Druids Glen Golf Resort (Ireland, 2 courses)

- DB:  lat=53.088013, lon=-6.074042 — Druid's Glen, Newtownmountkennedy
- OSM: lat=53.0962395, lon=-6.0762393 (sim=1, 926m from DB)
- GI:  lat=53.0962143, lon=-6.078787 (sim=1, 965m from DB)
- OSM↔GI distance: 170m
- **Reason:** OSM+GI consensus (apart 170m), but DB diverges (osm=926m, gi=965m)
- Suggested fix: lat=53.0962269, lon=-6.0775131 (OSM+GI midpoint)

### [high] Mullingar Golf Club (Ireland, 1 courses)

- DB:  lat=53.4773155, lon=-7.3688068 — Belvedere, Mullingar
- OSM: lat=53.4810492, lon=-7.3591702 (sim=1, 761m from DB)
- GI:  lat=53.48173, lon=-7.357139 (sim=1, 915m from DB)
- OSM↔GI distance: 154m
- **Reason:** OSM+GI consensus (apart 154m), but DB diverges (osm=761m, gi=915m)
- Suggested fix: lat=53.4813896, lon=-7.3581546 (OSM+GI midpoint)

### [high] Stackstown Golf Club (Ireland, 2 courses)

- DB:  lat=53.2672555, lon=-6.2624033 — Kellystown Road, Dublin
- OSM: lat=53.2592915, lon=-6.2658109 (sim=1, 914m from DB)
- GI:  lat=53.2608528, lon=-6.266544 (sim=1, 763m from DB)
- OSM↔GI distance: 180m
- **Reason:** OSM+GI consensus (apart 180m), but DB diverges (osm=914m, gi=763m)
- Suggested fix: lat=53.2600721, lon=-6.2661774 (OSM+GI midpoint)

### [high] Dungarvan Golf Club (Ireland, 1 courses)

- DB:  lat=52.1062731, lon=-7.5760259 — Knocknagranagh Court, Dungarvan
- OSM: lat=52.1079553, lon=-7.5868646 (sim=1, 763m from DB)
- GI:  lat=52.1081657, lon=-7.586962 (sim=1, 776m from DB)
- OSM↔GI distance: 24m
- **Reason:** OSM+GI consensus (apart 24m), but DB diverges (osm=763m, gi=776m)
- Suggested fix: lat=52.1080605, lon=-7.5869133 (OSM+GI midpoint)

### [high] Glengarriff Golf Club (Ireland, 1 courses)

- DB:  lat=51.7458032, lon=-9.5129199 — Dromgarriff, Glengarriff
- OSM: lat=51.7487806, lon=-9.5225278 (sim=1, 740m from DB)
- GI:  lat=51.74913, lon=-9.522439 (sim=1, 753m from DB)
- OSM↔GI distance: 39m
- **Reason:** OSM+GI consensus (apart 39m), but DB diverges (osm=740m, gi=753m)
- Suggested fix: lat=51.7489553, lon=-9.5224834 (OSM+GI midpoint)

### [high] Lisheen Springs Golf Club (Ireland, 1 courses)

- DB:  lat=53.2308289, lon=-6.4573997 — Lisheen Road, Dublin
- OSM: lat=53.2280744, lon=-6.4474798 (sim=0.938, 728m from DB)
- GI:  lat=53.2282333, lon=-6.449147 (sim=1, 621m from DB)
- OSM↔GI distance: 112m
- **Reason:** OSM+GI consensus (apart 112m), but DB diverges (osm=728m, gi=621m)
- Suggested fix: lat=53.2281538, lon=-6.4483134 (OSM+GI midpoint)

### [high] Baltinglass Golf Club (Ireland, 1 courses)

- DB:  lat=52.94391, lon=-6.709906 — Baltinglass, Baltinglass
- OSM: lat=52.9457623, lon=-6.7193158 (sim=1, 663m from DB)
- GI:  lat=52.9449463, lon=-6.716724 (sim=1, 471m from DB)
- OSM↔GI distance: 196m
- **Reason:** OSM+GI consensus (apart 196m), but DB diverges (osm=663m, gi=471m)
- Suggested fix: lat=52.9453543, lon=-6.7180199 (OSM+GI midpoint)

### [high] Bundoran Golf Club (Ireland, 1 courses)

- DB:  lat=54.4809541, lon=-8.2721592 — Bundoran, Bundoran
- OSM: lat=54.4862611, lon=-8.275441 (sim=1, 627m from DB)
- GI:  lat=54.4851723, lon=-8.275989 (sim=1, 530m from DB)
- OSM↔GI distance: 126m
- **Reason:** OSM+GI consensus (apart 126m), but DB diverges (osm=627m, gi=530m)
- Suggested fix: lat=54.4857167, lon=-8.2757150 (OSM+GI midpoint)

### [high] Foxrock Golf Club (Ireland, 1 courses)

- DB:  lat=53.2708036, lon=-6.1757198 — Golf Lane, Dublin 18
- OSM: lat=53.2725058, lon=-6.1822764 (sim=1, 475m from DB)
- GI:  lat=53.2722969, lon=-6.183502 (sim=1, 543m from DB)
- OSM↔GI distance: 85m
- **Reason:** OSM+GI consensus (apart 85m), but DB diverges (osm=475m, gi=543m)
- Suggested fix: lat=53.2724013, lon=-6.1828892 (OSM+GI midpoint)

### [high] Greystones Golf Club (Ireland, 1 courses)

- DB:  lat=53.141106, lon=-6.0674664 — Whitshed Road, Greystones
- OSM: lat=53.1386228, lon=-6.0725155 (sim=1, 436m from DB)
- GI:  lat=53.1388435, lon=-6.073982 (sim=1, 502m from DB)
- OSM↔GI distance: 101m
- **Reason:** OSM+GI consensus (apart 101m), but DB diverges (osm=436m, gi=502m)
- Suggested fix: lat=53.1387332, lon=-6.0732487 (OSM+GI midpoint)

## MEDIUM confidence flags

### [medium] New Forest Golf Club (Ireland, 1 courses)

- DB:  lat=50.8795354, lon=-1.5693661 — Southampton Road, Tyrrellspass
- GI:  lat=53.3999138, lon=-7.42762 (sim=1, 487992m from DB)
- **Reason:** GI-only and >1km off (487992m)

### [medium] The Manor House & Golf Club (Northern Ireland, 1 courses)

- DB:  lat=51.499655, lon=-2.2363607 — 69 Bridge Street, Coleraine
- OSM: lat=54.9502411, lon=-6.5467042 (sim=1, 478922m from DB)
- **Reason:** OSM-only and >1km off (478922m)

### [medium] Kilkee Golf Club (Ireland, 1 courses)

- DB:  lat=54.0716741, lon=-6.0548291 — East End, Kilkee
- GI:  lat=52.68669, lon=-9.650739 (sim=1, 283860m from DB)
- **Reason:** GI-only and >1km off (283860m)

### [medium] Castle Golf Club (Ireland, 1 courses)

- DB:  lat=53.3017827, lon=-6.271691 — Woodside Drive, Rathfarnham
- OSM: lat=52.9418074, lon=-9.3461555 (sim=1, 209009m from DB)
- GI:  lat=53.2992363, lon=-6.274957 (sim=1, 357m from DB)
- OSM↔GI distance: 208747m
- **Reason:** Single source >1km off (osm=209009m, gi=357m)

### [medium] Newcastle West Golf Club (Ireland, 1 courses)

- DB:  lat=53.0840101, lon=-6.1635632 — Rathgonan, Ardagh
- GI:  lat=52.5180244, lon=-9.047243 (sim=1, 203803m from DB)
- **Reason:** GI-only and >1km off (203803m)

### [medium] Glen Mill Golf Club (Ireland, 1 courses)

- DB:  lat=53.2798097, lon=-9.0718319 — -, Newcastle
- OSM: lat=53.0694542, lon=-6.0857971 (sim=1, 200367m from DB)
- **Reason:** OSM-only and >1km off (200367m)

### [medium] Royal Curragh Golf Club (Ireland, 1 courses)

- DB:  lat=53.8487614, lon=-9.2964519 — -, The Curragh
- OSM: lat=53.1455153, lon=-6.8083254 (sim=1, 182198m from DB)
- GI:  lat=53.1476974, lon=-6.811096 (sim=1, 181925m from DB)
- OSM↔GI distance: 305m
- **Reason:** Both sources >500m off (osm=182198m, gi=181925m), partial consensus

### [medium] Waterford Golf Club (Ireland, 1 courses)

- DB:  lat=53.7279965, lon=-6.8931845 — Newrath, Newrath
- OSM: lat=52.272204, lon=-7.1183756 (sim=1, 162576m from DB)
- GI:  lat=52.2690659, lon=-7.120601 (sim=1, 162938m from DB)
- OSM↔GI distance: 380m
- **Reason:** Both sources >500m off (osm=162576m, gi=162938m), partial consensus

### [medium] Mallow Golf Club (Ireland, 1 courses)

- DB:  lat=52.7107683, lon=-6.4554836 — Ballyellis, Ballyellis
- OSM: lat=52.128134, lon=-8.6201829 (sim=1, 160451m from DB)
- GI:  lat=52.1282425, lon=-8.626718 (sim=1, 160852m from DB)
- OSM↔GI distance: 446m
- **Reason:** Both sources >500m off (osm=160451m, gi=160852m), partial consensus

### [medium] Ballaghaderreen Golf Club (Ireland, 1 courses)

- DB:  lat=53.305759, lon=-6.6240096 — Aughalustia, Ballaghaderreen
- GI:  lat=53.8752136, lon=-8.573167 (sim=1, 143377m from DB)
- **Reason:** GI-only and >1km off (143377m)

### [medium] Narin & Portnoo Links (Ireland, 1 courses)

- DB:  lat=54.4093712, lon=-6.441305 — Narin, Co. Donegal, An Fhearthainn
- GI:  lat=54.8441734, lon=-8.4257 (sim=1, 136575m from DB)
- **Reason:** GI-only and >1km off (136575m)

### [medium] Ballinastoe Golf Club (Ireland, 1 courses)

- DB:  lat=53.1057433, lon=-6.2175107 — Ballinastoe, Roundwood
- OSM: lat=53.3040898, lon=-8.2344451 (sim=0.909, 136123m from DB)
- GI:  lat=53.3032875, lon=-8.240521 (sim=0.909, 136509m from DB)
- OSM↔GI distance: 413m
- **Reason:** Both sources >500m off (osm=136123m, gi=136509m), partial consensus

### [medium] Glasson Golf Club (Ireland, 1 courses)

- DB:  lat=53.3024071, lon=-6.2460249 — -, Glasson
- GI:  lat=53.47575, lon=-7.900952 (sim=1, 111422m from DB)
- **Reason:** GI-only and >1km off (111422m)

### [medium] Donegal Golf Club (Ireland, 1 courses)

- DB:  lat=55.2105083, lon=-6.9580265 — Murvagh, Laghey
- GI:  lat=54.61294, lon=-8.159539 (sim=1, 101552m from DB)
- **Reason:** GI-only and >1km off (101552m)

### [medium] Lackan Pitch & Putt (Ireland, 1 courses)

- DB:  lat=52.7078732, lon=-8.6203076 — null
- OSM: lat=52.6495954, lon=-7.2349358 (sim=0.941, 93619m from DB)
- **Reason:** OSM-only and >1km off (93619m)

### [medium] Borris Golf Club (Ireland, 1 courses)

- DB:  lat=53.0311734, lon=-7.4891051 — Deerpark, Borris
- OSM: lat=52.5916093, lon=-6.9185079 (sim=1, 62126m from DB)
- GI:  lat=52.59274, lon=-6.921388 (sim=1, 61908m from DB)
- OSM↔GI distance: 232m
- **Reason:** Both sources >500m off (osm=62126m, gi=61908m), partial consensus

### [medium] The Heath Golf Club (Ireland, 1 courses)

- DB:  lat=52.673293, lon=-7.8441558 — M7, The Heath
- OSM: lat=53.0623597, lon=-7.2138313 (sim=1, 60512m from DB)
- GI:  lat=53.06033, lon=-7.213599 (sim=1, 60362m from DB)
- OSM↔GI distance: 226m
- **Reason:** Both sources >500m off (osm=60512m, gi=60362m), partial consensus

### [medium] Blessington Lakes Golf Club (Ireland, 1 courses)

- DB:  lat=53.5518743, lon=-6.2675799 — Boystown, Blessington
- GI:  lat=53.1256866, lon=-6.540472 (sim=1, 50735m from DB)
- **Reason:** GI-only and >1km off (50735m)

### [medium] Achill Island Golf Club (Ireland, 1 courses)

- DB:  lat=53.8000645, lon=-9.520218 — -, Westport
- OSM: lat=53.9729351, lon=-10.062685 (sim=1, 40415m from DB)
- **Reason:** OSM-only and >1km off (40415m)

### [medium] Concra Wood Golf & Country Club (Ireland, 1 courses)

- DB:  lat=54.0412555, lon=-6.1770455 — Dundalk Road, Dundalk Road
- OSM: lat=54.1084125, lon=-6.700027 (sim=1, 34927m from DB)
- **Reason:** OSM-only and >1km off (34927m)

### [medium] Royal County Down Golf Club (Northern Ireland, 2 courses)

- DB:  lat=54.4920789, lon=-6.1275647 — 36 Golf Links Road, Newcastle
- OSM: lat=54.2232661, lon=-5.8758305 (sim=1, 34052m from DB)
- **Reason:** OSM-only and >1km off (34052m)

### [medium] City of Derry Golf Club (Northern Ireland, 2 courses)

- DB:  lat=54.7064167, lon=-7.4212087 — 49 Victoria Road, Prehen
- GI:  lat=54.97186, lon=-7.349701 (sim=1, 29869m from DB)
- **Reason:** GI-only and >1km off (29869m)

### [medium] Edenderry Golf Club (Ireland, 1 courses)

- DB:  lat=53.1431612, lon=-7.2391575 — Kishawanny, Edenderry
- GI:  lat=53.35337, lon=-7.023399 (sim=1, 27430m from DB)
- **Reason:** GI-only and >1km off (27430m)

### [medium] Highfield Golf Club (Ireland, 1 courses)

- DB:  lat=53.305759, lon=-6.6240096 — Carbury, Enfield, Co. Offaly, Carbury
- GI:  lat=53.36277, lon=-7.016275 (sim=1, 26807m from DB)
- **Reason:** GI-only and >1km off (26807m)

### [medium] Cill Dara Golf Club (Ireland, 1 courses)

- DB:  lat=53.3403928, lon=-6.6116774 — Off R415, Kildare
- OSM: lat=53.1735333, lon=-6.8966089 (sim=1, 26523m from DB)
- GI:  lat=53.1702652, lon=-6.893407 (sim=1, 26629m from DB)
- OSM↔GI distance: 421m
- **Reason:** Both sources >500m off (osm=26523m, gi=26629m), partial consensus

### [medium] Tubbercurry Golf Club (Ireland, 1 courses)

- DB:  lat=54.0791338, lon=-8.3770065 — Ballymote Road, Tubbercurry
- OSM: lat=54.0539683, lon=-8.7176839 (sim=1, 22406m from DB)
- GI:  lat=54.0528641, lon=-8.71467 (sim=1, 22227m from DB)
- OSM↔GI distance: 232m
- **Reason:** Both sources >500m off (osm=22406m, gi=22227m), partial consensus

### [medium] Macroom Golf Club (Ireland, 1 courses)

- DB:  lat=51.8842113, lon=-8.7027468 — off  New Street, Macroom
- OSM: lat=51.9019756, lon=-8.9739959 (sim=1, 18718m from DB)
- GI:  lat=51.90122, lon=-8.969201 (sim=1, 18382m from DB)
- OSM↔GI distance: 340m
- **Reason:** Both sources >500m off (osm=18718m, gi=18382m), partial consensus

### [medium] Callan Golf Club (Ireland, 1 courses)

- DB:  lat=52.6506255, lon=-7.2514438 — -, Kilkenny
- GI:  lat=52.53108, lon=-7.372129 (sim=1, 15594m from DB)
- **Reason:** GI-only and >1km off (15594m)

### [medium] East Cork Golf Club (Ireland, 1 courses)

- DB:  lat=51.8968814, lon=-8.3533637 — Gortacrue, Midleton
- GI:  lat=51.9395676, lon=-8.176962 (sim=1, 12996m from DB)
- **Reason:** GI-only and >1km off (12996m)

### [medium] Gowran Park Golf Club (Ireland, 1 courses)

- DB:  lat=52.6506255, lon=-7.2514438 — -, Kilkenny
- OSM: lat=52.616193, lon=-7.0693984 (sim=1, 12868m from DB)
- GI:  lat=52.6198959, lon=-7.07064152 (sim=1, 12670m from DB)
- OSM↔GI distance: 420m
- **Reason:** Both sources >500m off (osm=12868m, gi=12670m), partial consensus

### [medium] Ceann Sibéal Golf Club (Ireland, 1 courses)

- DB:  lat=52.1396308, lon=-10.2704621 — Dingle, Dingle
- GI:  lat=52.179985, lon=-10.4427652 (sim=1, 12581m from DB)
- **Reason:** GI-only and >1km off (12581m)

### [medium] Dublin City Golf Club (Ireland, 1 courses)

- DB:  lat=53.2649051, lon=-6.2794868 — Ballinascorney, Dublin
- OSM: lat=53.2469357, lon=-6.3824228 (sim=1, 7133m from DB)
- **Reason:** OSM-only and >1km off (7133m)

### [medium] Deer Park Golf (Ireland, 3 courses)

- DB:  lat=53.3776969, lon=-6.1842819 — Howth Road, Dublin
- OSM: lat=53.3836368, lon=-6.0824577 (sim=1, 6786m from DB)
- GI:  lat=53.38092, lon=-6.07704926 (sim=1, 7122m from DB)
- OSM↔GI distance: 469m
- **Reason:** Both sources >500m off (osm=6786m, gi=7122m), partial consensus

### [medium] Tralee Golf Club (Ireland, 1 courses)

- DB:  lat=52.327242, lon=-9.7809541 — -, Ardfert
- OSM: lat=52.3029873, lon=-9.8581081 (sim=1, 5897m from DB)
- GI:  lat=52.30116, lon=-9.85759 (sim=1, 5962m from DB)
- OSM↔GI distance: 206m
- **Reason:** Both sources >500m off (osm=5897m, gi=5962m), partial consensus

### [medium] Roscrea Golf Club (Ireland, 1 courses)

- DB:  lat=52.9721326, lon=-7.8205564 — Millpark, Roscrea, Roscrea
- OSM: lat=52.9555333, lon=-7.7523226 (sim=1, 4929m from DB)
- GI:  lat=52.95925, lon=-7.754878 (sim=1, 4626m from DB)
- OSM↔GI distance: 447m
- **Reason:** Both sources >500m off (osm=4929m, gi=4626m), partial consensus

### [medium] Moate Golf Club (Ireland, 1 courses)

- DB:  lat=53.4290519, lon=-7.775323 — Station Road, Aghanargit, Moate
- OSM: lat=53.403408, lon=-7.7291997 (sim=1, 4180m from DB)
- GI:  lat=53.3994522, lon=-7.725923 (sim=1, 4642m from DB)
- OSM↔GI distance: 491m
- **Reason:** Both sources >500m off (osm=4180m, gi=4642m), partial consensus

### [medium] Swords Open Golf Course (Ireland, 1 courses)

- DB:  lat=53.4494478, lon=-6.2607991 — Naul Road, Swords
- OSM: lat=53.4879921, lon=-6.2614743 (sim=1, 4286m from DB)
- **Reason:** OSM-only and >1km off (4286m)

### [medium] Grange Castle Golf Club (Ireland, 1 courses)

- DB:  lat=53.3283621, lon=-6.3750537 — Nangor Road, Clondalkin
- OSM: lat=53.3122241, lon=-6.4332762 (sim=1, 4263m from DB)
- GI:  lat=53.3154678, lon=-6.431896 (sim=1, 4038m from DB)
- OSM↔GI distance: 372m
- **Reason:** Both sources >500m off (osm=4263m, gi=4038m), partial consensus

### [medium] Roganstown Country Club (Ireland, 1 courses)

- DB:  lat=53.4494478, lon=-6.2607991 — Naul Road, Swords
- GI:  lat=53.48636, lon=-6.2724 (sim=1, 4176m from DB)
- **Reason:** GI-only and >1km off (4176m)

### [medium] Cloughaneely Golf Club (Ireland, 1 courses)

- DB:  lat=55.136981, lon=-8.1020074 — Falcarragh, Falcarragh
- GI:  lat=55.14984, lon=-8.047919 (sim=1, 3723m from DB)
- **Reason:** GI-only and >1km off (3723m)

### [medium] Clonmel Golf Club (Ireland, 1 courses)

- DB:  lat=52.3478497, lon=-7.6927093 — Mountain Road, Clonmel
- OSM: lat=52.3389099, lon=-7.6489066 (sim=1, 3137m from DB)
- GI:  lat=52.33529, lon=-7.648761 (sim=1, 3296m from DB)
- OSM↔GI distance: 403m
- **Reason:** Both sources >500m off (osm=3137m, gi=3296m), partial consensus

### [medium] Clogher Valley Golf Club (Northern Ireland, 1 courses)

- DB:  lat=54.3673262, lon=-7.3383495 — 476 Belfast Road, Fivemiletown
- OSM: lat=54.3666837, lon=-7.3402942 (sim=1, 145m from DB)
- GI:  lat=54.38076, lon=-7.299647 (sim=1, 2918m from DB)
- OSM↔GI distance: 3063m
- **Reason:** Single source >1km off (osm=145m, gi=2918m)

### [medium] Mountain View (Ireland, 1 courses)

- DB:  lat=52.4545557, lon=-7.2259716 — Kilkenny, Ballyhale
- OSM: lat=52.455898, lon=-7.1840395 (sim=1, 2845m from DB)
- **Reason:** OSM-only and >1km off (2845m)

### [medium] Grange Castle (Ireland, 1 courses)

- DB:  lat=53.3219624, lon=-6.3942689 — Clondalkin, Dublin
- OSM: lat=53.3122241, lon=-6.4332762 (sim=1, 2808m from DB)
- GI:  lat=53.3154678, lon=-6.431896 (sim=1, 2602m from DB)
- OSM↔GI distance: 372m
- **Reason:** Both sources >500m off (osm=2808m, gi=2602m), partial consensus

### [medium] Castleisland Golf Club (Ireland, 1 courses)

- DB:  lat=52.2568977, lon=-9.4509621 — Dooneen, Castleisland
- GI:  lat=52.2720451, lon=-9.483094 (sim=1, 2760m from DB)
- **Reason:** GI-only and >1km off (2760m)

### [medium] Forrest Little Golf Club (Ireland, 1 courses)

- DB:  lat=53.4544404, lon=-6.2244297 — Forest Road, Swords
- OSM: lat=53.440596, lon=-6.2434169 (sim=1, 1988m from DB)
- GI:  lat=53.439682, lon=-6.249549 (sim=1, 2337m from DB)
- OSM↔GI distance: 419m
- **Reason:** Both sources >500m off (osm=1988m, gi=2337m), partial consensus

### [medium] Raffeen Creek Golf Club (Ireland, 1 courses)

- DB:  lat=51.8302347, lon=-8.3207701 — Ringaskiddy , Cork
- OSM: lat=51.8353762, lon=-8.352406 (sim=1, 2248m from DB)
- GI:  lat=51.83282, lon=-8.346542 (sim=1, 1794m from DB)
- OSM↔GI distance: 493m
- **Reason:** Both sources >500m off (osm=2248m, gi=1794m), partial consensus

### [medium] South Meath Golf Club (Ireland, 1 courses)

- DB:  lat=53.5455884, lon=-6.7962018 — Longwood road, Trim, Co.Meath, Trim
- GI:  lat=53.529026, lon=-6.81506252 (sim=1, 2224m from DB)
- **Reason:** GI-only and >1km off (2224m)

### [medium] Wicklow Golf Club (Ireland, 1 courses)

- DB:  lat=52.9565016, lon=-6.0142113 — Dunbur Road, Wicklow
- OSM: lat=52.9743088, lon=-6.0207263 (sim=1, 2028m from DB)
- GI:  lat=52.9749527, lon=-6.027021 (sim=1, 2224m from DB)
- OSM↔GI distance: 428m
- **Reason:** Both sources >500m off (osm=2028m, gi=2224m), partial consensus

### [medium] Beech Park Golf Club (Ireland, 1 courses)

- DB:  lat=53.2757504, lon=-6.4831859 — Johnstown Road, Rathcoole
- OSM: lat=53.2596578, lon=-6.5016286 (sim=1, 2169m from DB)
- GI:  lat=53.26016, lon=-6.497988 (sim=1, 1994m from DB)
- OSM↔GI distance: 249m
- **Reason:** Both sources >500m off (osm=2169m, gi=1994m), partial consensus

### [medium] Stepaside Golf Course (Ireland, 2 courses)

- DB:  lat=53.2330098, lon=-6.1897009 —  2 Enniskerry Rd, Kilternan, Dublin
- OSM: lat=53.2501855, lon=-6.2009427 (sim=1, 2051m from DB)
- **Reason:** OSM-only and >1km off (2051m)

### [medium] Elmgreen Golf Club (Ireland, 1 courses)

- DB:  lat=53.3850467, lon=-6.3201429 — Dunsink Lane, Dublin
- OSM: lat=53.3848848, lon=-6.34911 (sim=1, 1921m from DB)
- GI:  lat=53.3871155, lon=-6.350229 (sim=1, 2008m from DB)
- OSM↔GI distance: 259m
- **Reason:** Both sources >500m off (osm=1921m, gi=2008m), partial consensus

### [medium] Old Conna Golf Club (Ireland, 1 courses)

- DB:  lat=53.2164468, lon=-6.1120105 — Ferndale Road, Bray
- OSM: lat=53.2146644, lon=-6.1406535 (sim=1, 1917m from DB)
- GI:  lat=53.2156448, lon=-6.138012 (sim=1, 1734m from DB)
- OSM↔GI distance: 207m
- **Reason:** Both sources >500m off (osm=1917m, gi=1734m), partial consensus

### [medium] Rossmore Golf Club (Ireland, 1 courses)

- DB:  lat=54.2271164, lon=-6.9714083 — Cootehill Road, Monaghan
- OSM: lat=54.215604, lon=-6.9927769 (sim=1, 1889m from DB)
- GI:  lat=54.21706, lon=-6.988573 (sim=1, 1580m from DB)
- OSM↔GI distance: 318m
- **Reason:** Both sources >500m off (osm=1889m, gi=1580m), partial consensus

### [medium] Castlebar Golf Club (Ireland, 1 courses)

- DB:  lat=53.8473852, lon=-9.2881409 — Castlebar, Castlebar
- OSM: lat=53.837019, lon=-9.2662311 (sim=1, 1843m from DB)
- GI:  lat=53.83407, lon=-9.271433 (sim=1, 1842m from DB)
- OSM↔GI distance: 473m
- **Reason:** Both sources >500m off (osm=1843m, gi=1842m), partial consensus

### [medium] Ballybunion Golf Club (Ireland, 2 courses)

- DB:  lat=52.5112359, lon=-9.6756139 — Sandhill Road, Ballybunion
- OSM: lat=52.4961373, lon=-9.6787076 (sim=1, 1692m from DB)
- GI:  lat=52.49481, lon=-9.675984 (sim=1, 1827m from DB)
- OSM↔GI distance: 236m
- **Reason:** Both sources >500m off (osm=1692m, gi=1827m), partial consensus

### [medium] The Island Golf Club (Ireland, 1 courses)

- DB:  lat=53.4775, lon=-6.143056 — Corballis, Donabate
- OSM: lat=53.4616428, lon=-6.1371777 (sim=1, 1806m from DB)
- GI:  lat=53.4636536, lon=-6.135738 (sim=1, 1614m from DB)
- OSM↔GI distance: 243m
- **Reason:** Both sources >500m off (osm=1806m, gi=1614m), partial consensus

### [medium] Westmanstown Golf Club (Ireland, 1 courses)

- DB:  lat=53.3829431, lon=-6.4231873 — Clonsilla, Dublin 
- OSM: lat=53.3761805, lon=-6.4458022 (sim=1, 1678m from DB)
- GI:  lat=53.378952, lon=-6.443655 (sim=1, 1428m from DB)
- OSM↔GI distance: 339m
- **Reason:** Both sources >500m off (osm=1678m, gi=1428m), partial consensus

### [medium] The County Sligo Golf Club (Ireland, 2 courses)

- DB:  lat=54.3054882, lon=-8.5481649 — Rosses Point, Rosses Point
- OSM: lat=54.3154512, lon=-8.5666044 (sim=1, 1630m from DB)
- **Reason:** OSM-only and >1km off (1630m)

### [medium] Shannon Golf Club (Ireland, 1 courses)

- DB:  lat=52.6986845, lon=-8.9215548 — Shannon airport, Shannon
- OSM: lat=52.6921733, lon=-8.9357629 (sim=1, 1200m from DB)
- GI:  lat=52.6888466, lon=-8.937873 (sim=1, 1551m from DB)
- OSM↔GI distance: 396m
- **Reason:** Both sources >500m off (osm=1200m, gi=1551m), partial consensus

### [medium] Athy Golf Club (Ireland, 1 courses)

- DB:  lat=52.995756, lon=-6.9698001 — Geraldine, Athy
- OSM: lat=53.0066346, lon=-6.9562336 (sim=1, 1512m from DB)
- GI:  lat=53.00784, lon=-6.962931 (sim=1, 1420m from DB)
- OSM↔GI distance: 468m
- **Reason:** Both sources >500m off (osm=1512m, gi=1420m), partial consensus

### [medium] Hogs Head Golf Club (Ireland, 1 courses)

- DB:  lat=51.8271274, lon=-10.1718452 — -, Waterville
- OSM: lat=51.8144337, lon=-10.164022 (sim=1, 1510m from DB)
- **Reason:** OSM-only and >1km off (1510m)

### [medium] Doonbeg Golf Club (Ireland, 1 courses)

- DB:  lat=52.7567885, lon=-9.4899157 — Doonbeg, Doonbeg Golf Club
- OSM: lat=52.7568824, lon=-9.4958221 (sim=1, 398m from DB)
- GI:  lat=52.7461243, lon=-9.502586 (sim=1, 1461m from DB)
- OSM↔GI distance: 1280m
- **Reason:** Single source >1km off (osm=398m, gi=1461m)

### [medium] Mountbellew Golf Club (Ireland, 1 courses)

- DB:  lat=53.462552, lon=-8.5271241 — The Demesne, Shankill, Mountbellew
- OSM: lat=53.462556, lon=-8.5272764 (sim=1, 10m from DB)
- GI:  lat=53.4499855, lon=-8.523678 (sim=1, 1416m from DB)
- OSM↔GI distance: 1418m
- **Reason:** Single source >1km off (osm=10m, gi=1416m)

### [medium] East Clare Golf Club (Ireland, 2 courses)

- DB:  lat=52.8899843, lon=-8.5906843 — Coolreagh, Bodyke
- OSM: lat=52.8987508, lon=-8.6047864 (sim=1, 1358m from DB)
- GI:  lat=52.89972, lon=-8.599346 (sim=1, 1229m from DB)
- OSM↔GI distance: 380m
- **Reason:** Both sources >500m off (osm=1358m, gi=1229m), partial consensus

### [medium] Beaverstown Golf Club (Ireland, 1 courses)

- DB:  lat=53.4857483, lon=-6.1512942 — Donabate, Donabate
- OSM: lat=53.4954932, lon=-6.1552696 (sim=1, 1115m from DB)
- GI:  lat=53.497467, lon=-6.151316 (sim=1, 1303m from DB)
- OSM↔GI distance: 341m
- **Reason:** Both sources >500m off (osm=1115m, gi=1303m), partial consensus

### [medium] Courtown Golf Club (Ireland, 1 courses)

- DB:  lat=52.6658952, lon=-6.2165248 — Kiltennel, Gorey
- OSM: lat=52.6576185, lon=-6.2252808 (sim=1, 1093m from DB)
- GI:  lat=52.6578255, lon=-6.229679 (sim=1, 1262m from DB)
- OSM↔GI distance: 298m
- **Reason:** Both sources >500m off (osm=1093m, gi=1262m), partial consensus

### [medium] Arklow Golf Club (Ireland, 1 courses)

- DB:  lat=52.79744, lon=-6.1525042 — Lower Main Street, Arklow
- OSM: lat=52.786557, lon=-6.1475128 (sim=1, 1256m from DB)
- GI:  lat=52.7904549, lon=-6.148621 (sim=1, 819m from DB)
- OSM↔GI distance: 440m
- **Reason:** Both sources >500m off (osm=1256m, gi=819m), partial consensus

### [medium] Woodbrook Golf Club (Ireland, 1 courses)

- DB:  lat=53.2098586, lon=-6.1160496 — Dublin Road, Bray
- OSM: lat=53.2202092, lon=-6.1089367 (sim=1, 1245m from DB)
- GI:  lat=53.2169037, lon=-6.111621 (sim=1, 837m from DB)
- OSM↔GI distance: 409m
- **Reason:** Both sources >500m off (osm=1245m, gi=837m), partial consensus

### [medium] Cabra Castle Hotel (Ireland, 1 courses)

- DB:  lat=53.9261742, lon=-6.780532 — Carrickmacross Road, Kingscourt
- OSM: lat=53.9157055, lon=-6.7788154 (sim=1, 1169m from DB)
- **Reason:** OSM-only and >1km off (1169m)

### [medium] Rosslare Golf Club (Ireland, 2 courses)

- DB:  lat=52.282818, lon=-6.3942334 — Strand Road, Rosslare
- OSM: lat=52.293315, lon=-6.3936342 (sim=1, 1168m from DB)
- GI:  lat=52.2842026, lon=-6.394002 (sim=1, 155m from DB)
- OSM↔GI distance: 1014m
- **Reason:** Single source >1km off (osm=1168m, gi=155m)

### [medium] Claremorris Golf Club (Ireland, 1 courses)

- DB:  lat=53.6930014, lon=-8.9789129 — Castlemacgarrett, Claremorris
- GI:  lat=53.70006, lon=-8.991625 (sim=1, 1147m from DB)
- **Reason:** GI-only and >1km off (1147m)

### [medium] Mahon Golf Course (Ireland, 1 courses)

- DB:  lat=51.8906523, lon=-8.4107595 — Skehard Road, Cork
- OSM: lat=51.883273, lon=-8.4220237 (sim=1, 1127m from DB)
- GI:  lat=51.8850632, lon=-8.419649 (sim=1, 871m from DB)
- OSM↔GI distance: 257m
- **Reason:** Both sources >500m off (osm=1127m, gi=871m), partial consensus

### [medium] Athenry Golf Club (Ireland, 1 courses)

- DB:  lat=53.2906062, lon=-8.8389781 — Palmerstown, Oranmore
- OSM: lat=53.2859909, lon=-8.846683 (sim=1, 725m from DB)
- GI:  lat=53.282486, lon=-8.846228 (sim=1, 1023m from DB)
- OSM↔GI distance: 391m
- **Reason:** Both sources >500m off (osm=725m, gi=1023m), partial consensus

### [medium] Portlaoise Golf Club (Ireland, 1 courses)

- DB:  lat=53.0282831, lon=-7.3013048 — Abbeyleix Road, Portlaoise
- OSM: lat=53.0219555, lon=-7.2931437 (sim=1, 890m from DB)
- GI:  lat=53.0232124, lon=-7.29797 (sim=1, 606m from DB)
- OSM↔GI distance: 352m
- **Reason:** Both sources >500m off (osm=890m, gi=606m), partial consensus

### [medium] Macreddin Golf Club (Ireland, 1 courses)

- DB:  lat=52.8851017, lon=-6.3401197 — Macreddin Village, Macreddin Village
- OSM: lat=52.8817942, lon=-6.3349261 (sim=1, 507m from DB)
- GI:  lat=52.8808441, lon=-6.329934 (sim=1, 831m from DB)
- OSM↔GI distance: 351m
- **Reason:** Both sources >500m off (osm=507m, gi=831m), partial consensus

### [medium] Kilkeel Golf Club (Northern Ireland, 1 courses)

- DB:  lat=54.0716741, lon=-6.0548291 — Mourne Park, Kilkeel
- OSM: lat=54.0745008, lon=-6.0480635 (sim=1, 542m from DB)
- GI:  lat=54.0777473, lon=-6.047675 (sim=1, 821m from DB)
- OSM↔GI distance: 362m
- **Reason:** Both sources >500m off (osm=542m, gi=821m), partial consensus

### [medium] Rathfarnham Golf Club (Ireland, 1 courses)

- DB:  lat=53.2746815, lon=-6.303309 — Stocking Lane, Dublin 16
- OSM: lat=53.2673943, lon=-6.3038134 (sim=1, 811m from DB)
- GI:  lat=53.26891, lon=-6.308858 (sim=1, 740m from DB)
- OSM↔GI distance: 375m
- **Reason:** Both sources >500m off (osm=811m, gi=740m), partial consensus

### [medium] Craddockstown Golf Club (Ireland, 1 courses)

- DB:  lat=53.2055933, lon=-6.6294273 — Blessington road, Naas
- OSM: lat=53.2044944, lon=-6.6389987 (sim=1, 649m from DB)
- GI:  lat=53.20881, lon=-6.639864 (sim=1, 782m from DB)
- OSM↔GI distance: 483m
- **Reason:** Both sources >500m off (osm=649m, gi=782m), partial consensus

### [medium] Enniscorthy Golf Club (Ireland, 1 courses)

- DB:  lat=52.4834206, lon=-6.5986852 — Knockmarshal, Wexford
- OSM: lat=52.4902263, lon=-6.6006367 (sim=1, 768m from DB)
- GI:  lat=52.48908, lon=-6.594395 (sim=1, 693m from DB)
- OSM↔GI distance: 441m
- **Reason:** Both sources >500m off (osm=768m, gi=693m), partial consensus

### [medium] Monkstown Golf Club (Ireland, 1 courses)

- DB:  lat=51.85293, lon=-8.3377928 — Monkstown, Monkstown
- OSM: lat=51.8482957, lon=-8.3455307 (sim=1, 740m from DB)
- GI:  lat=51.8502274, lon=-8.343904 (sim=1, 516m from DB)
- OSM↔GI distance: 242m
- **Reason:** Both sources >500m off (osm=740m, gi=516m), partial consensus

### [medium] Milltown Golf Club (Ireland, 1 courses)

- DB:  lat=53.2983198, lon=-6.2540043 — Churchtown Road Lower, Dublin 14
- OSM: lat=53.30337, lon=-6.2558374 (sim=1, 575m from DB)
- GI:  lat=53.3048248, lon=-6.253714 (sim=1, 724m from DB)
- OSM↔GI distance: 215m
- **Reason:** Both sources >500m off (osm=575m, gi=724m), partial consensus

### [medium] Nenagh Golf Club (Ireland, 1 courses)

- DB:  lat=52.9007723, lon=-8.1368657 — Beechwood, Nenagh
- OSM: lat=52.9044306, lon=-8.1283346 (sim=1, 702m from DB)
- GI:  lat=52.9050446, lon=-8.133576 (sim=1, 524m from DB)
- OSM↔GI distance: 358m
- **Reason:** Both sources >500m off (osm=702m, gi=524m), partial consensus

## LOW confidence flags

### [low] Moyvalley Hotel & Golf Resort (Ireland, 1 courses)

- DB:  lat=52.5587091, lon=-8.7832027 — Balyna Estate, Moyvally
- OSM: lat=53.4119029, lon=-6.9221749 (sim=1, 156582m from DB)
- GI:  lat=53.41859, lon=-6.927517 (sim=1, 156743m from DB)
- OSM↔GI distance: 824m
- **Reason:** Both sources off but they disagree (824m apart) — source quality issue

### [low] Rathsallagh Golf & Country Club (Ireland, 1 courses)

- DB:  lat=52.8370777, lon=-6.7827865 — Rathsallagh Road, Dunlavin
- OSM: lat=53.0307141, lon=-6.7338403 (sim=1, 21780m from DB)
- GI:  lat=53.02604, lon=-6.73895741 (sim=1, 21216m from DB)
- OSM↔GI distance: 622m
- **Reason:** Both sources off but they disagree (622m apart) — source quality issue

### [low] Hollywood Lakes Golf Club (Ireland, 1 courses)

- DB:  lat=53.5216726, lon=-6.2674765 — 108 Road, Ballyboughal
- OSM: lat=53.5503762, lon=-6.2626973 (sim=1, 3207m from DB)
- GI:  lat=53.5527763, lon=-6.271865 (sim=1, 3471m from DB)
- OSM↔GI distance: 662m
- **Reason:** Both sources off but they disagree (662m apart) — source quality issue

### [low] Enniscrone Golf Club (Ireland, 2 courses)

- DB:  lat=54.2163338, lon=-9.0832044 — Enniscrone, Enniscrone
- OSM: lat=54.2056801, lon=-9.1167405 (sim=1, 2482m from DB)
- GI:  lat=54.2071228, lon=-9.106036 (sim=1, 1804m from DB)
- OSM↔GI distance: 714m
- **Reason:** Both sources off but they disagree (714m apart) — source quality issue

### [low] Cahir Park Golf Club (Ireland, 1 courses)

- DB:  lat=52.3689169, lon=-7.9637721 — Kilcommon, Cahir
- OSM: lat=52.3671384, lon=-7.9285099 (sim=1, 2402m from DB)
- GI:  lat=52.3628654, lon=-7.932989 (sim=1, 2196m from DB)
- OSM↔GI distance: 564m
- **Reason:** Both sources off but they disagree (564m apart) — source quality issue

### [low] St Helens Bay Golf Resort (Ireland, 1 courses)

- DB:  lat=52.2337314, lon=-6.3555653 — Kilrane, Rosslare Harbour
- OSM: lat=52.2342054, lon=-6.3341284 (sim=0.929, 1461m from DB)
- GI:  lat=52.2319946, lon=-6.32483149 (sim=0.929, 2102m from DB)
- OSM↔GI distance: 679m
- **Reason:** Both sources off but they disagree (679m apart) — source quality issue

### [low] Carlow Golf Club (Ireland, 2 courses)

- DB:  lat=52.8456784, lon=-6.9119059 — Dublin Road, Carlow
- OSM: lat=52.8590466, lon=-6.891566 (sim=1, 2019m from DB)
- GI:  lat=52.8524551, lon=-6.893686 (sim=1, 1437m from DB)
- OSM↔GI distance: 747m
- **Reason:** Both sources off but they disagree (747m apart) — source quality issue

### [low] Rosapenna Hotel & Golf Resort (Ireland, 3 courses)

- DB:  lat=55.1899656, lon=-7.8426074 — Downings, Downings
- OSM: lat=55.179295, lon=-7.8183822 (sim=1, 1942m from DB)
- GI:  lat=55.1872978, lon=-7.822957 (sim=1, 1282m from DB)
- OSM↔GI distance: 936m
- **Reason:** Both sources off but they disagree (936m apart) — source quality issue

### [low] Royal Tara Golf Club (Ireland, 11 courses)

- DB:  lat=53.5981572, lon=-6.6622373 — Bellinter, Navan
- OSM: lat=53.5936025, lon=-6.6481708 (sim=1, 1057m from DB)
- GI:  lat=53.5926857, lon=-6.63656 (sim=1, 1800m from DB)
- OSM↔GI distance: 773m
- **Reason:** Both sources off but they disagree (773m apart) — source quality issue

### [low] Howth Golf Club (Ireland, 2 courses)

- DB:  lat=53.3842248, lon=-6.1002648 — Carrickbrack Road, Dublin 13
- OSM: lat=53.3731816, lon=-6.0814669 (sim=1, 1750m from DB)
- GI:  lat=53.3760338, lon=-6.087544 (sim=1, 1242m from DB)
- OSM↔GI distance: 513m
- **Reason:** Both sources off but they disagree (513m apart) — source quality issue

### [low] Fermoy Golf Club (Ireland, 1 courses)

- DB:  lat=52.1149804, lon=-8.2825117 — Corrin Hill, Fermoy
- OSM: lat=52.1099433, lon=-8.3059542 (sim=1, 1696m from DB)
- GI:  lat=52.1130943, lon=-8.29882 (sim=1, 1133m from DB)
- OSM↔GI distance: 600m
- **Reason:** Both sources off but they disagree (600m apart) — source quality issue

### [low] Roscommon Golf Club (Ireland, 1 courses)

- DB:  lat=53.6257844, lon=-8.187166 — Golf Links Road, Roscommon
- OSM: lat=53.6150029, lon=-8.1740378 (sim=1, 1479m from DB)
- GI:  lat=53.6186562, lon=-8.181232 (sim=1, 884m from DB)
- OSM↔GI distance: 625m
- **Reason:** Both sources off but they disagree (625m apart) — source quality issue

### [low] Clones Golf Club (Ireland, 1 courses)

- DB:  lat=54.1341104, lon=-7.2533932 — Hilton Park, Clones
- OSM: lat=54.1354287, lon=-7.2389437 (sim=1, 953m from DB)
- GI:  lat=54.13989, lon=-7.23304 (sim=1, 1473m from DB)
- OSM↔GI distance: 628m
- **Reason:** Both sources off but they disagree (628m apart) — source quality issue

### [low] Woodenbridge Golf Club (Ireland, 1 courses)

- DB:  lat=52.8435544, lon=-6.222553 — Vale of Avoca, Arklow
- OSM: lat=52.8322312, lon=-6.2242735 (sim=1, 1264m from DB)
- GI:  lat=52.8321342, lon=-6.233412 (sim=1, 1464m from DB)
- OSM↔GI distance: 614m
- **Reason:** Both sources off but they disagree (614m apart) — source quality issue

### [low] Celbridge Elm Hall (Ireland, 1 courses)

- DB:  lat=53.3342808, lon=-6.5311414 — Hazelhatch Road, Celbridge
- OSM: lat=53.3300724, lon=-6.5126994 (sim=1, 1311m from DB)
- GI:  lat=53.33956, lon=-6.511376 (sim=0.944, 1438m from DB)
- OSM↔GI distance: 1059m
- **Reason:** Both sources off but they disagree (1059m apart) — source quality issue

### [low] Grange Golf Club (Ireland, 3 courses)

- DB:  lat=53.2863534, lon=-6.2860938 — Whitechurch Rd, Rathfarnham
- OSM: lat=53.2744497, lon=-6.2785434 (sim=1, 1416m from DB)
- GI:  lat=53.2808151, lon=-6.282296 (sim=1, 666m from DB)
- OSM↔GI distance: 750m
- **Reason:** Both sources off but they disagree (750m apart) — source quality issue

### [low] Millicent Golf Club (Ireland, 1 courses)

- DB:  lat=53.2886468, lon=-6.6880414 — 80 Millicent Road, Clane
- OSM: lat=53.2773447, lon=-6.6836091 (sim=1, 1291m from DB)
- GI:  lat=53.2809448, lon=-6.688444 (sim=1, 857m from DB)
- OSM↔GI distance: 513m
- **Reason:** Both sources off but they disagree (513m apart) — source quality issue

### [low] The Royal Dublin Golf Club (Ireland, 1 courses)

- DB:  lat=53.3657326, lon=-6.1796171 — Dollymount Avenue, Dublin
- OSM: lat=53.3634199, lon=-6.1619286 (sim=1, 1202m from DB)
- GI:  lat=53.35692, lon=-6.17097 (sim=1, 1136m from DB)
- OSM↔GI distance: 939m
- **Reason:** Both sources off but they disagree (939m apart) — source quality issue

### [low] Hermitage Golf Club (Ireland, 1 courses)

- DB:  lat=53.3573624, lon=-6.4263286 — Ballydowd, Lucan
- OSM: lat=53.3635758, lon=-6.4116069 (sim=1, 1197m from DB)
- GI:  lat=53.3593369, lon=-6.417649 (sim=1, 616m from DB)
- OSM↔GI distance: 619m
- **Reason:** Both sources off but they disagree (619m apart) — source quality issue

### [low] Mountrath Golf Club (Ireland, 1 courses)

- DB:  lat=52.9848469, lon=-7.4809028 — Knockanina, Mountrath
- OSM: lat=52.9779951, lon=-7.4839751 (sim=1, 789m from DB)
- GI:  lat=52.9806366, lon=-7.492077 (sim=1, 882m from DB)
- OSM↔GI distance: 617m
- **Reason:** Both sources off but they disagree (617m apart) — source quality issue
