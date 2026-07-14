# Wales coordinate audit
Generated: 2026-05-02T04:47:04


## Summary

| Status | Clubs |
|---|---:|
| OK (DB matches source consensus) | 22 |
| Flagged | 18 |
|   level=high | 1 |
|   level=medium | 1 |
|   level=medium-sg-only | 2 |
|   level=medium-osm-only | 12 |
|   level=low | 2 |
| No source match | 45 |

## high flags (1)

### [high] Brecon Golf Club (1 courses)
- DB:  lat=53.4597094, lon=-2.203417 — Newton Park, Llanfaes
- OSM: lat=51.9481022, lon=-3.4066685 (sim=1, 186606m from DB)
- WG:  lat=51.94797, lon=-3.408139 (sim=1, 186663m from DB)
- OSM↔WG distance: 102m
- **Reason:** OSM+WG consensus (102m apart), DB diverges (osm=186606m, sg=186663m)
- Suggested fix: lat=51.9480361, lon=-3.4074037 (OSM+WG midpoint)

## medium flags (1)

### [medium] Lakeside Golf Club (1 courses)
- DB:  lat=52.395588, lon=-0.0270739 — Water St, Port Talbot
- OSM: lat=51.5507365, lon=-3.7313213 (sim=1, 270533m from DB)
- WG:  lat=51.54842, lon=-3.72911119 (sim=1, 270487m from DB)
- OSM↔WG distance: 300m
- **Reason:** Both >500m off, OSM↔WG=300m

## medium-osm-only flags (12)

### [medium-osm-only] Delamere Forest Golf Club (1 courses)
- DB:  lat=53.2269209, lon=-2.7975567 — Station Road, Cheshire
- OSM: lat=53.2289759, lon=-2.6507381 (sim=1, 9776m from DB)
- **Reason:** OSM-only and >1km off (9776m). Needs second-source verification.

### [medium-osm-only] Shrewsbury Golf Club (1 courses)
- DB:  lat=52.7322078, lon=-2.7602812 — Grange Lane, Shrewsbury
- OSM: lat=52.6498708, lon=-2.7628804 (sim=1, 9157m from DB)
- **Reason:** OSM-only and >1km off (9157m). Needs second-source verification.

### [medium-osm-only] Brampton Golf Course (1 courses)
- DB:  lat=52.0373977, lon=-2.7326037 — Brampton Road, Hereford
- OSM: lat=52.0344097, lon=-2.8642207 (sim=1, 9009m from DB)
- **Reason:** OSM-only and >1km off (9009m). Needs second-source verification.

### [medium-osm-only] Arscott Golf Club (1 courses)
- DB:  lat=52.707755, lon=-2.7540658 — -, Shrewsbury
- OSM: lat=52.6713268, lon=-2.8426065 (sim=1, 7212m from DB)
- **Reason:** OSM-only and >1km off (7212m). Needs second-source verification.

### [medium-osm-only] ludlow (1 courses)
- DB:  lat=52.3758265, lon=-2.7243006 — Bromfield, Ludlow
- OSM: lat=52.3942226, lon=-2.7461384 (sim=1, 2526m from DB)
- **Reason:** OSM-only and >1km off (2526m). Needs second-source verification.

### [medium-osm-only] Runcorn Golf Club (1 courses)
- DB:  lat=53.3095372, lon=-2.7000171 — Clifton Road, Runcorn
- OSM: lat=53.3218572, lon=-2.7278706 (sim=1, 2302m from DB)
- **Reason:** OSM-only and >1km off (2302m). Needs second-source verification.

### [medium-osm-only] Oswestry Golf Club (1 courses)
- DB:  lat=52.843467, lon=-3.0228709 — Aston Park, Queens Head
- OSM: lat=52.834794, lon=-2.9917827 (sim=1, 2300m from DB)
- **Reason:** OSM-only and >1km off (2300m). Needs second-source verification.

### [medium-osm-only] Sutton Hall Golf Club (1 courses)
- DB:  lat=53.309958, lon=-2.6585794 — Aston Lane, Runcorn
- OSM: lat=53.3045121, lon=-2.6866581 (sim=1, 1961m from DB)
- **Reason:** OSM-only and >1km off (1961m). Needs second-source verification.

### [medium-osm-only] Ashton Court Golf Course (1 courses)
- DB:  lat=51.4582897, lon=-2.6633655 — Abbots Leigh Road, Bristol
- OSM: lat=51.4500829, lon=-2.6478541 (sim=1, 1410m from DB)
- **Reason:** OSM-only and >1km off (1410m). Needs second-source verification.

### [medium-osm-only] Aston Court Golf Course (1 courses)
- DB:  lat=51.4582897, lon=-2.6633655 — Abbots Leigh Rd, Bristol
- OSM: lat=51.4500829, lon=-2.6478541 (sim=0.917, 1410m from DB)
- **Reason:** OSM-only and >1km off (1410m). Needs second-source verification.

### [medium-osm-only] Burghill Valley Golf Club (1 courses)
- DB:  lat=52.094449, lon=-2.7629975 — Tillington Road, Burghill
- OSM: lat=52.096785, lon=-2.7816547 (sim=1, 1301m from DB)
- **Reason:** OSM-only and >1km off (1301m). Needs second-source verification.

### [medium-osm-only] Eccleston Park Golf Club (1 courses)
- DB:  lat=53.4200376, lon=-2.7655748 — Rainhill Road, Rainhill 
- OSM: lat=53.4281863, lon=-2.7740322 (sim=1, 1065m from DB)
- **Reason:** OSM-only and >1km off (1065m). Needs second-source verification.

## medium-sg-only flags (2)

### [medium-sg-only] Bala Golf Club (1 courses)
- DB:  lat=51.8411653, lon=1.2613412 — -, Bala
- WG:  lat=52.9115639, lon=-3.61467886 (sim=1, 351654m from DB)
- **Reason:** WG-only and >1km off (351654m). Needs second-source verification.

### [medium-sg-only] Pontypool Golf Club (1 courses)
- DB:  lat=51.6936186, lon=-3.0057286 — Lasgarn Lane, Free State
- WG:  lat=51.7208977, lon=-3.0413785 (sim=1, 3903m from DB)
- **Reason:** WG-only and >1km off (3903m). Needs second-source verification.

## low flags (2)

### [low] Dinas Powis Golf Course (1 courses)
- DB:  lat=53.3825649, lon=-3.1910468 — Highwalls Road, Port Elizabeth
- OSM: lat=51.4395918, lon=-3.2320548 (sim=0.909, 216067m from DB)
- WG:  lat=51.43588, lon=-3.2232275 (sim=1, 216472m from DB)
- OSM↔WG distance: 738m
- **Reason:** Both off, sources disagree (738m apart)

### [low] Grove Golf Club (1 courses)
- DB:  lat=51.2202915, lon=-0.6468238 — Pyle Road, Porthcawl
- OSM: lat=51.5023953, lon=-3.7058949 (sim=1, 214681m from DB)
- WG:  lat=51.5027542, lon=-3.698675 (sim=1, 214191m from DB)
- OSM↔WG distance: 501m
- **Reason:** Both off, sources disagree (501m apart)
