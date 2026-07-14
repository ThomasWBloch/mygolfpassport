# Netherlands coordinate audit
Generated: 2026-05-04T06:04:30

3-source: DB vs OSM vs LC. NGF har ingen coords, deltager ikke.

## Summary

| Status | Clubs |
|---|---:|
| OK | 157 |
| Flagged | 17 |
|   level=medium | 9 |
|   level=medium-lc-only | 4 |
|   level=medium-osm-only | 2 |
|   level=low | 2 |
| No source match | 78 |

## medium flags (9)

### [medium] De Peelse Golf (1 courses)
- DB:  lat=51.3842735, lon=5.9626562 — maasduinenweg 1, Evertsoord
- OSM: lat=53.1508949, lon=4.8516562 (sim=0.714, 210479m from DB)
- LC:  lat=51.383682, lon=5.960192 (sim=1, 183m from DB)
- OSM↔LC distance: 210480m
- **Reason:** Single source >1km off (osm=210479m, lc=183m)

### [medium] ShortGolf Utrecht (3 courses)
- DB:  lat=52.0580647, lon=5.0925733 — Sportpark Galecop 10, Nieuwegein
- OSM: lat=52.4104164, lon=6.8046557 (sim=0.706, 122996m from DB)
- LC:  lat=52.056236, lon=5.093193 (sim=1, 208m from DB)
- OSM↔LC distance: 123023m
- **Reason:** Single source >1km off (osm=122996m, lc=208m)

### [medium] Golfbaan Westwoud (1 courses)
- DB:  lat=52.6663819, lon=5.1462274 — zittend 19, Westwoud
- OSM: lat=52.6695344, lon=5.1457486 (sim=1, 352m from DB)
- LC:  lat=52.0741, lon=4.570651 (sim=0.75, 76578m from DB)
- OSM↔LC distance: 76863m
- **Reason:** Single source >1km off (osm=352m, lc=76578m)

### [medium] Houtrak (1 courses)
- DB:  lat=52.0849355, lon=5.05343 — Machineweg 1-b, Spaarnwoude
- OSM: lat=52.4054823, lon=4.724962 (sim=1, 42078m from DB)
- LC:  lat=52.404095, lon=4.728582 (sim=1, 41816m from DB)
- OSM↔LC distance: 290m
- **Reason:** Both >500m off, OSM↔LC=290m

### [medium] The Links Valley (2 courses)
- DB:  lat=52.3017649, lon=5.6898931 — Jhr. Dr. C.J. Sandbergweg 117, Ermelo
- OSM: lat=52.3002584, lon=5.6857467 (sim=1, 328m from DB)
- LC:  lat=52.303207, lon=5.712441 (sim=1, 1542m from DB)
- OSM↔LC distance: 1844m
- **Reason:** Single source >1km off (osm=328m, lc=1542m)

### [medium] Golfclub Flevoland (2 courses)
- DB:  lat=52.5443175, lon=5.4562605 — Parlaan 2A, Lelystad
- OSM: lat=52.5358944, lon=5.450565 (sim=1, 1013m from DB)
- LC:  lat=52.542274, lon=5.456466 (sim=1, 228m from DB)
- OSM↔LC distance: 814m
- **Reason:** Single source >1km off (osm=1013m, lc=228m)

### [medium] Keppelse Golfclub (1 courses)
- DB:  lat=52.006579, lon=6.2007098 — Burgemeester Vrijlandweg 35, Hoog-Keppel
- OSM: lat=52.0078489, lon=6.204944 (sim=1, 322m from DB)
- LC:  lat=52.004936, lon=6.215099 (sim=1, 1002m from DB)
- OSM↔LC distance: 767m
- **Reason:** Single source >1km off (osm=322m, lc=1002m)

### [medium] Stippelberg (2 courses)
- DB:  lat=51.5085121, lon=5.7660767 — Hooizak 7, Bakel
- OSM: lat=51.5159767, lon=5.7598919 (sim=1, 934m from DB)
- LC:  lat=51.513656, lon=5.759252 (sim=1, 742m from DB)
- OSM↔LC distance: 262m
- **Reason:** Both >500m off, OSM↔LC=262m

### [medium] Prise d'Eau Golf (9 courses)
- DB:  lat=51.5447831, lon=4.9877852 — Gilzerbaan 400, Tilburg
- OSM: lat=51.5492972, lon=4.9890321 (sim=1, 509m from DB)
- LC:  lat=51.549526, lon=4.994847 (sim=1, 719m from DB)
- OSM↔LC distance: 403m
- **Reason:** Both >500m off, OSM↔LC=403m

## medium-osm-only flags (2)

### [medium-osm-only] Haverlij (1 courses)
- DB:  lat=52.5139337, lon=5.5274743 — null
- OSM: lat=51.724256, lon=5.2559607 (sim=0.889, 89743m from DB)
- **Reason:** OSM-only og >1km off (89743m). Mangler 2-source verifikation.

### [medium-osm-only] Westerpark (1 courses)
- DB:  lat=52.0622892, lon=4.4877545 — Zoetermeer
- OSM: lat=52.054365, lon=4.4326073 (sim=1, 3872m from DB)
- **Reason:** OSM-only og >1km off (3872m). Mangler 2-source verifikation.

## medium-lc-only flags (4)

### [medium-lc-only] De Hildenberg (1 courses)
- DB:  lat=52.9423011, lon=6.3526752 — Gruun 5, Appelscha
- LC:  lat=51.683338, lon=3.724443 (sim=0.7, 226952m from DB)
- **Reason:** LC-only og >1km off (226952m). Mangler 2-source verifikation.

### [medium-lc-only] Molenberg (1 courses)
- DB:  lat=50.8856752, lon=5.9970521 — Hogeweg 53, Burgh-Hammstede
- LC:  lat=51.683338, lon=3.724443 (sim=1, 181228m from DB)
- **Reason:** LC-only og >1km off (181228m). Mangler 2-source verifikation.

### [medium-lc-only] molenslag (1 courses)
- DB:  lat=51.5851379, lon=4.8064057 — Heerenveen 75, barsingerhorn
- LC:  lat=52.786053, lon=4.868503 (sim=1, 133603m from DB)
- **Reason:** LC-only og >1km off (133603m). Mangler 2-source verifikation.

### [medium-lc-only] Golfcentrum Amsteldijk (2 courses)
- DB:  lat=52.2807056, lon=4.876173 — De Afslag 1, Amstelveen
- LC:  lat=52.286621, lon=4.961283 (sim=0.773, 5827m from DB)
- **Reason:** LC-only og >1km off (5827m). Mangler 2-source verifikation.

## low flags (2)

### [low] Gendersteijn (1 courses)
- DB:  lat=51.4190691, lon=5.4045572 — Veldhoven
- OSM: lat=51.3877343, lon=5.3727339 (sim=0.833, 4125m from DB)
- LC:  lat=52.06126, lon=5.403853 (sim=0.75, 71408m from DB)
- OSM↔LC distance: 74923m
- **Reason:** Both off, sources disagree (74923m apart)

### [low] Heemskerkse Golfclub (3 courses)
- DB:  lat=52.509555, lon=4.6934494 — Communicatieweg 18, Heemskerk
- OSM: lat=52.4920119, lon=4.7103358 (sim=1, 2261m from DB)
- LC:  lat=52.496571, lon=4.709509 (sim=1, 1807m from DB)
- OSM↔LC distance: 510m
- **Reason:** Both off, sources disagree (510m apart)
