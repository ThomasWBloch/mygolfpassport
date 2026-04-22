# Iceland — DB vs GSÍ match report

Generated 2026-04-20. Read-only — no DB changes.

## Summary

- DB courses (country = `Iceland`): **114**
- GSÍ courses (`rastimar.golf.is/vellir`): **63**
- **EXACT**: 34 | **NORMALIZED**: 1 | **FUZZY**: 11 | **COORD**: 3 | **DB-ONLY**: 65 | **GSÍ-ONLY**: 14
- Duplicate-candidate GSÍ courses (>1 DB row mapping to same GSÍ): **16**

## Category 1: EXACT MATCH (34)

Raw `name` strings are identical between DB and GSÍ.

| DB name | DB club | GSÍ name | GSÍ club |
|---|---|---|---|
| Syðridalsvöllur | GBO Syðridalsvöllur | Syðridalsvöllur | Golfklúbbur Bolungarvíkur |
| Haukadalsvöllur | Geysir Golf Course | Haukadalsvöllur | Golfklúbburinn Geysir |
| Ekkjufellsvöllur | Golfklúbbur Fljótsdalshéraðs - GFH | Ekkjufellsvöllur | Golfklúbbur Fljótsdalshéraðs |
| Silfurnesvöllur | Golfklúbbur Hornafjarðar - GHH | Silfurnesvöllur | Golfklúbbur Hornafjarðar |
| Katlavöllur | Golfklúbbur Húsavíkur - GH | Katlavöllur | Golfklúbbur Húsavíkur |
| Gufudalsvöllur | Golfklúbbur Hveragerðis - GHG | Gufudalsvöllur | Golfklúbbur Hveragerðis |
| Tungudalsvöllur | Golfklúbbur Ísafjarðar - GI | Tungudalsvöllur | Golfklúbbur Ísafjarðar |
| Mýrin | Golfklúbbur Kópavogs og Garðabæjar - GKG | Mýrin | Golfklúbbur Kópavogs og Garðabæjar |
| Bakkakot | Golfklúbbur Mosfellsbæjar - GM | Bakkakot | Golfklúbbur Mosfellsbæjar |
| Hlíðavöllur | Golfklúbbur Mosfellsbæjar - GM | Hlíðavöllur | Golfklúbbur Mosfellsbæjar |
| Grænanesvöllur | Golfklúbbur Norðfjarðar - GN | Grænanesvöllur | Golfklúbbur Norðfjarðar |
| Skeggjabrekkuvöllur | Golfklúbbur Ólafsfjarðar - GO | Skeggjabrekkuvöllur | Golfklúbbur Fjallabyggðar |
| Grafarholt | Golfklúbbur Reykjavíkur | Grafarholt | Golfklúbbur Reykjavíkur |
| Thorsvöllur | Golfklúbbur Reykjavíkur | Thorsvöllur | Golfklúbbur Reykjavíkur |
| Hlíðarendavöllur | Golfklúbbur Sauðárkróks - GSS | Hlíðarendavöllur | Golfklúbbur Skagafjarðar |
| Hagavöllur | Golfklúbbur Seyðisfjarðar - GSF | Hagavöllur | Golfklúbbur Seyðisfjarðar |
| Háagerðisvöllur | Golfklúbbur Skagastrandar - GSK | Háagerðisvöllur | Golfklúbbur Skagastrandar |
| Kálfatjarnarvöllur | Golfklúbbur Vatnsleysustrandar - GVS | Kálfatjarnarvöllur | Golfklúbbur Vatnsleysustrandar |
| Vestmannaeyjavöllur | Golfklúbbur Vestmannaeyja - GV | Vestmannaeyjavöllur | Golfklúbbur Vestmannaeyja |
| Selsvöllur | Golfklúbburinn Flúðir - GF | Selsvöllur | Golfklúbburinn Flúðir |
| Meðaldalsvöllur | Golfklúbburinn Gláma - GGL | Meðaldalsvöllur | Golfklúbburinn Gláma |
| Arnarholtsvöllur | Golfklúbburinn Hamar - GHD | Arnarholtsvöllur | Golfklúbburinn Hamar Dalvík |
| Strandarvöllur | Golfklúbburinn Hellu - GHR | Strandarvöllur | Golfklúbbur Hellu |
| Lundsvöllur | Golfklúbburinn Lundur | Lundsvöllur |  Golfklúbbur Lund Fnjóskadal |
| Víkurvöllur | Golfklúbburinn Mostri - GMS | Víkurvöllur | Golfklúbburinn Mostri |
| Setbergsvöllur | Golfklúbburinn Setberg - GSE | Setbergsvöllur | Golfklúbburinn Setberg |
| Úthlíðarvöllur | Golfklúbburinn Úthlíð - GÚ | Úthlíðarvöllur | Golfklúbburinn Úthlíð |
| Garðavöllur undir jökli | Golklubbur Staðarsveitar | Garðavöllur undir jökli | Golfklúbbur Staðarsveitar |
| Vatnahverfisvöllur | GÓS - Golfklúbburinn Ós | Vatnahverfisvöllur | Golfklúbburinn Ós |
| Hamarsvöllur | Hamarsvöllur, Borgarnes Rétt | Hamarsvöllur | Golfklúbbur Borgarness |
| Hvaleyrarvöllur | Keilir Golf Club | Hvaleyrarvöllur | Golfklúbburinn Keilir |
| Sveinskotsvöllur | Keilir Golf Club | Sveinskotsvöllur | Golfklúbburinn Keilir |
| Nesvöllur | NK - Nesklúbburinn | Nesvöllur | Nesklúbburinn |
| Svarfhólsvöllur | Svarfhólsvöllur Golf Course | Svarfhólsvöllur | Golfklúbbur Selfoss |

## Category 2: NORMALIZED MATCH (1)

Names match after `immutable_unaccent + lower + trim`. Raw names differ in case, diacritics, or whitespace.

| DB name | DB club | GSÍ name | GSÍ club | Diff |
|---|---|---|---|---|
| Sigló golf | Golfklúbbur Siglufjarðar GKS | Sigló Golf | Golfklúbbur Siglufjarðar | diacritics |

## Category 3: FUZZY MATCH (11)

Trigram similarity ≥ 0.5 on normalized names (pg_trgm-style Jaccard).

| DB name | GSÍ name | similarity | comment |
|---|---|---:|---|
| Alftanes | Álftanesvöllur | 0.500 | check — clubs differ |
| GHÓ_Skeljavíkurvöllur | Skeljavíkurvöllur | 0.667 | same club — likely legit |
| kiðjaberg | Kiðjabergsvöllur | 0.500 | check — clubs differ |
| Leirdalur | Leirdalsvöllur | 0.563 | check — clubs differ |
| Öndverdarnes 9 holur | Öndverðarnessvöllur | 0.519 | check — clubs differ |
| Korpa Áin | Korpa - Áin | 0.692 | same club — likely legit |
| Korpa Áin/Landið | Korpa - Landið | 0.524 | same club — likely legit |
| Korpa Sjórinn | Korpa - Sjórinn | 0.765 | same club — likely legit |
| Garðavöllur undir Jökli | Garðavöllur | 0.500 | check — clubs differ |
| Hólmsvöllur | Hólmsvöllur í Leiru | 0.600 | check — clubs differ |
| Þorlákshafnarvöllur | Þorláksvöllur | 0.565 | check — clubs differ |

## Category 4: COORD MATCH (3)

No name match found, but DB coordinates are within 500 m of a GSÍ course.

| DB name | DB club | DB coords | GSÍ name | GSÍ club | GSÍ coords | distance (m) |
|---|---|---|---|---|---|---:|
| 18-hole course | Byggðarholtsvöllur | 65.08049, -14.06244 | Byggðarholtsvöllur | Golfklúbbur Byggðarholts | 65.08146, -14.06395 | 130 |
| 18-hole course | Golfklúbbur Borgarness - GB | 64.75599, -21.54767 | Golfvöllurinn Glanni | Golfklúbburinn Glanni | 64.75608, -21.54741 | 16 |
| Urriðaholt | Oddur Golf Club | 64.06150, -21.89554 | Ljúflingur | Golfklúbburinn Oddur | 64.06257, -21.89777 | 160 |

## Category 5: DB-ONLY (65)

DB rows with no plausible GSÍ match. Candidates for deletion, merge, or manual review.

| DB name | DB club | Coords | Probable reason |
|---|---|---|---|
| 12-holes | Brautarholt Golf Club | 64.24155, -21.87251 | starts with a digit; generic "N-hole course" placeholder |
| 12+6 | Brautarholt Golf Club | 64.24155, -21.87251 | starts with a digit; numeric pattern (e.g. "12+6", "12-holes") |
| 18-hole course | Ekkjufellsvöllur | 65.27731, -14.44960 | starts with a digit; generic placeholder "18-hole course"; club field may be the real course name → GSÍ "Ekkjufellsvöllur" |
| 18-hole course | Fludavollur | 64.13041, -20.31491 | starts with a digit; generic placeholder "18-hole course" |
| 18-hole course | GA | 65.67511, -18.09367 | starts with a digit; generic placeholder "18-hole course" |
| 18-hole course | Gardabær vetrar | 64.08609, -21.89056 | starts with a digit; generic placeholder "18-hole course" |
| Leynir Golf Club | Garðavöllur | 64.31942, -22.03664 | club field may be the real course name → GSÍ "Garðavöllur" |
| Meðaldalsvöllur-9 holes | Gláma | 51.40641, -3.26504 | unknown — needs manual review |
| Dúddisen | Golfklúbbur Akureyrar - GA | 65.67511, -18.09367 | unknown — needs manual review |
| Jaðar | Golfklúbbur Akureyrar - GA | 65.67511, -18.09367 | unknown — needs manual review |
| Ásatúnsvöllur | Golfklúbbur Ásatúns - GÁS | 64.10462, -20.40905 | unknown — needs manual review |
| LitlaEyri | Golfklúbbur Bíldudals - GBB | 65.64171, -23.54554 | unknown — needs manual review |
| Hamar | Golfklúbbur Borgarness - GB | 64.75599, -21.54767 | unknown — needs manual review |
| Hamar/Hótel | Golfklúbbur Borgarness - GB | 64.75599, -21.54767 | unknown — needs manual review |
| Kollur | Golfklúbbur Fjarðabyggðar | 65.03409, -14.21060 | unknown — needs manual review |
| 18-hole course | Golfklúbbur Grindavíkur - GG | 63.84424, -22.43175 | starts with a digit; generic placeholder "18-hole course" |
| Golfklubbur Kiðjabergs | Golfklubbur Kidjabergs | 64.05883, -21.99208 | unknown — needs manual review |
| Leirdalur Efri (9 holur) | Golfklúbbur Kópavogs og Garðabæjar - GKG | 64.08220, -21.88845 | unknown — needs manual review |
| Leirdalur neðri (9 holur) | Golfklúbbur Kópavogs og Garðabæjar - GKG | 64.08220, -21.88845 | unknown — needs manual review |
| Hlíðarvöllur/Vetur | Golfklúbbur Mosfellsbæjar - GM | 64.16816, -21.74070 | unknown — needs manual review |
| Öndverðarnes ekki réttur | Golfklúbbur Öndverðaness - GÖ | 64.00891, -20.95796 | unknown — needs manual review |
| Öndverðarnesvöllur leiðréttur | Golfklúbbur Öndverðaness - GÖ | 64.00891, -20.95796 | unknown — needs manual review |
| Korpa Landið | Golfklúbbur Reykjavíkur | 64.15226, -21.76259 | unknown — needs manual review |
| Korpa Landið | Golfklúbbur Reykjavíkur | 64.15226, -21.76259 | unknown — needs manual review |
| Korpa Landið/Áin | Golfklúbbur Reykjavíkur | 64.15226, -21.76259 | unknown — needs manual review |
| Korpa Sjórinn/Áin | Golfklúbbur Reykjavíkur | 64.15226, -21.76259 | unknown — needs manual review |
| Korpa Sjórinn/Landið | Golfklúbbur Reykjavíkur | 64.15226, -21.76259 | unknown — needs manual review |
| Korpúlfsstaðir 9 holur | Golfklúbbur Reykjavíkur | 64.15226, -21.76259 | unknown — needs manual review |
| Sandgerðis | Golfklúbbur Sandgerðis - GSG | — | no coordinates |
| Hólsvöllur | Golfklúbbur Siglufjarðar - GKS | 66.11864, -18.93456 | unknown — needs manual review |
| Dalbúi | Golfklúbburinn Dalbúi - GD | 64.22519, -20.75249 | unknown — needs manual review |
| Glanni | Golfklúbburinn Glanni - GGB | 64.75902, -21.54765 | unknown — needs manual review |
| Ásbyrgisvöllur | Golfklúbburinn Gljúfri - GOG | 66.31259, -16.46267 | unknown — needs manual review |
| Húsafellsvöllur | Golfklúbburinn Húsafelli - GHF | 64.69907, -20.87956 | unknown — needs manual review |
| Efri Vík | Golfklúbburinn Laki - GLK | 64.75902, -21.54765 | unknown — needs manual review |
| Garðavöllur - Nýja vallarmatið | Golfklúbburinn Leynir - GL | 64.31904, -22.03489 | unknown — needs manual review |
| 18-hole course | Golfklúbburinn Öndverðarnesi | 64.69869, -20.88003 | starts with a digit; generic placeholder "18-hole course" |
| Öndverðarnes | Golfklúbburinn Öndverðarnesi | 64.69869, -20.88003 | unknown — needs manual review |
| 9-hole course | Golfklúbburinn Setberg - GSE | 64.06759, -21.93093 | starts with a digit |
| Reykholtsdalsvöllur | Golfklúbburinn Skrifla - GSR | 63.84316, -20.39819 | unknown — needs manual review |
| Bárarvöllur | Golfklúbburinn Vestarr - GVG | 64.92392, -23.27219 | unknown — needs manual review |
| 18-hole course | Golfklubburinn Vik- GKV | 63.41882, -19.00547 | starts with a digit; generic placeholder "18-hole course" |
| 18-hole course | Golfklubburinn Vik- GKV | 64.08406, -21.88247 | starts with a digit; generic placeholder "18-hole course" |
| Þverárvöllur | Golfklúbburinn Þverá Hellishólum - GÞH | 63.75081, -20.22384 | unknown — needs manual review |
| gsf | GSF | 66.00781, -22.90802 | short name (3 chars) |
| 9-hole course | Hagavöllur | 65.24997, -14.02729 | starts with a digit; club field may be the real course name → GSÍ "Hagavöllur" |
| 18-hole course | Hlidarvollur | 65.65699, -18.07332 | starts with a digit; generic placeholder "18-hole course" |
| Hlidarvollur | Hlidarvollur | 65.65699, -18.07332 | unknown — needs manual review |
| 18-hole course | Kiðjaberg | 64.00620, -20.79309 | starts with a digit; generic placeholder "18-hole course" |
| Krossdalsvöllur | Krossdalsvöllur - GKM | 65.65186, -16.92080 | unknown — needs manual review |
| Landsvirkjun ´- Búrfellsvöllur | Landsvirkjun 9 holur | 64.10520, -19.83352 | unknown — needs manual review |
| Sogsvöllur | Landsvirkjun 9 holur | 64.10520, -19.83352 | unknown — needs manual review |
| 18-hole course | Ljúflingur | 43.72444, -79.82904 | starts with a digit; generic placeholder "18-hole course"; club field may be the real course name → GSÍ "Ljúflingur" |
| 18-hole course | LV_Búrfelli_18 holur | 64.39835, -19.32011 | starts with a digit; generic placeholder "18-hole course" |
| 9 | NK - Nesklúbburinn | 64.14598, -21.94224 | short name (1 chars); starts with a digit |
| 9-hole course | Oma | 54.59932, -7.30361 | starts with a digit |
| ondverdanesvollur | ondverdarnesvollur | 64.01152, -20.92512 | unknown — needs manual review |
| 18-hole course | Oyggjarvegurin | 43.72444, -79.82904 | starts with a digit; generic placeholder "18-hole course" |
| silvurnesvöllur | silfurnes | 64.26674, -15.20576 | unknown — needs manual review |
| SteinaGolf | SteinaGolf | 64.11135, -21.90481 | unknown — needs manual review |
| Strandarvöllur | Strandarvöllur | 63.79880, -20.29819 | club field may be the real course name → GSÍ "Strandarvöllur" |
| Sveinskotsvöllur | Sveinkotsvollur | 43.72444, -79.82904 | unknown — needs manual review |
| SVG | SVG - private course | 63.66492, 13.48797 | short name (3 chars); looks like club abbreviation |
| þórirstaðavöllur | Þórisstaðir Golf | 64.31904, -22.03489 | unknown — needs manual review |
| Þverárvöllur, Eyjafjarðarsveit | Þverá Eyjafjarðarsveit | 65.53648, -18.04612 | unknown — needs manual review |

## Category 6: GSÍ-ONLY (14)

GSÍ courses nothing in the DB maps to. Import candidates.

| GSÍ name | GSÍ club | holes | par | import? |
|---|---|---:|---:|---|
| Golf í Hraunborgum | Golfklúbbur Hraunborga | 9 | 27 | maybe — practice course |
| Grundarfjarðarvöllur | Golfklúbburinn Vestarr | 9 | 72 | yes — listed on GSÍ |
| Golfklúbburinn Vík | Golfklúbburinn Vík | 9 | 72 | yes — listed on GSÍ |
| Brautarholt | Golfklúbbur Brautarholts | 18 | 70 | yes — listed on GSÍ |
| Urriðavöllur | Golfklúbburinn Oddur | 18 | 71 | yes — listed on GSÍ |
| Vesturbotnsvöllur | Golfklúbbur Patreksfjarðar | 9 | 72 | yes — listed on GSÍ |
| Hellishólar | Golfklúbburinn á Hellishólum | 9 | 72 | yes — listed on GSÍ |
| Fróðárvöllur | Golfklúbburinn Jökull | 9 | 70 | yes — listed on GSÍ |
| Jaðarsvöllur | Golfklúbbur Akureyrar | 18 | 71 | yes — listed on GSÍ |
| Kirkjubólsvöllur | Golfklúbbur Sandgerðis | 18 | 72 | yes — active course |
| Golfklúbburinn Dalbúi | Golfklúbburinn Dalbúi | 9 | 68 | yes — listed on GSÍ |
| Húsatóftavöllur | Golfklúbbur Grindavíkur | 18 | 70 | yes — listed on GSÍ |
| Litlueyrarvöllur | Golfklúbbur Bíldudals | 9 | 70 | yes — listed on GSÍ |
| Skálavöllur | Golf­klúbbur Vopna­fjarðar | 9 | 72 | yes — listed on GSÍ |

## Duplicate candidates in DB (16)

GSÍ courses that more than one DB row maps to. Candidates for merging or deletion.

### GSÍ: **Ekkjufellsvöllur** (club: Golfklúbbur Fljótsdalshéraðs)

2 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| 18-hole course | Ekkjufellsvöllur | 65.27731, -14.44960 | COORD (486 m) |
| Ekkjufellsvöllur | Golfklúbbur Fljótsdalshéraðs - GFH | 65.27864, -14.43090 | EXACT |

### GSÍ: **Leirdalsvöllur** (club: Golfklúbbur Kópavogs og Garðabæjar)

5 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| 18-hole course | Gardabær vetrar | 64.08609, -21.89056 | COORD (459 m) |
| Leirdalur | Golfklúbbur Kópavogs og Garðabæjar - GKG | 64.08220, -21.88845 | FUZZY (0.56) |
| Leirdalur Efri (9 holur) | Golfklúbbur Kópavogs og Garðabæjar - GKG | 64.08220, -21.88845 | COORD (406 m) |
| Leirdalur neðri (9 holur) | Golfklúbbur Kópavogs og Garðabæjar - GKG | 64.08220, -21.88845 | COORD (406 m) |
| 18-hole course | Golfklubburinn Vik- GKV | 64.08406, -21.88247 | COORD (53 m) |

### GSÍ: **Garðavöllur** (club: Golfklúbburinn Leynir)

3 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| Leynir Golf Club | Garðavöllur | 64.31942, -22.03664 | COORD (47 m) |
| Garðavöllur - Nýja vallarmatið | Golfklúbburinn Leynir - GL | 64.31904, -22.03489 | COORD (47 m) |
| þórirstaðavöllur | Þórisstaðir Golf | 64.31904, -22.03489 | COORD (47 m) |

### GSÍ: **Meðaldalsvöllur** (club: Golfklúbburinn Gláma)

2 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| Meðaldalsvöllur-9 holes | Gláma | 51.40641, -3.26504 | FUZZY (0.58) |
| Meðaldalsvöllur | Golfklúbburinn Gláma - GGL | 65.84615, -23.60620 | EXACT |

### GSÍ: **Golfvöllurinn Glanni** (club: Golfklúbburinn Glanni)

5 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| 18-hole course | Golfklúbbur Borgarness - GB | 64.75599, -21.54767 | COORD (16 m) |
| Hamar | Golfklúbbur Borgarness - GB | 64.75599, -21.54767 | COORD (16 m) |
| Hamar/Hótel | Golfklúbbur Borgarness - GB | 64.75599, -21.54767 | COORD (16 m) |
| Glanni | Golfklúbburinn Glanni - GGB | 64.75902, -21.54765 | COORD (327 m) |
| Efri Vík | Golfklúbburinn Laki - GLK | 64.75902, -21.54765 | COORD (327 m) |

### GSÍ: **Silfurnesvöllur** (club: Golfklúbbur Hornafjarðar)

2 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| Silfurnesvöllur | Golfklúbbur Hornafjarðar - GHH | 64.23335, -16.38261 | EXACT |
| silvurnesvöllur | silfurnes | 64.26674, -15.20576 | FUZZY (0.68) |

### GSÍ: **Sveinskotsvöllur** (club: Golfklúbburinn Keilir)

3 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| Golfklubbur Kiðjabergs | Golfklubbur Kidjabergs | 64.05883, -21.99208 | COORD (34 m) |
| Sveinskotsvöllur | Keilir Golf Club | 64.05883, -21.99208 | EXACT |
| Sveinskotsvöllur | Sveinkotsvollur | 43.72444, -79.82904 | EXACT |

### GSÍ: **Hlíðavöllur** (club: Golfklúbbur Mosfellsbæjar)

3 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| Hlíðarvöllur/Vetur | Golfklúbbur Mosfellsbæjar - GM | 64.16816, -21.74070 | COORD (352 m) |
| Hlíðavöllur | Golfklúbbur Mosfellsbæjar - GM | 64.16816, -21.74070 | EXACT |
| Hlidarvollur | Hlidarvollur | 65.65699, -18.07332 | FUZZY (0.67) |

### GSÍ: **Öndverðarnessvöllur** (club: Golfklúbbur Öndverðarness)

4 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| Öndverdarnes 9 holur | Golfklúbbur Öndverðaness - GÖ | 64.00891, -20.95796 | FUZZY (0.52) |
| Öndverðarnesvöllur leiðréttur | Golfklúbbur Öndverðaness - GÖ | 64.00891, -20.95796 | FUZZY (0.58) |
| Öndverðarnes | Golfklúbburinn Öndverðarnesi | 64.69869, -20.88003 | FUZZY (0.57) |
| ondverdanesvollur | ondverdarnesvollur | 64.01152, -20.92512 | FUZZY (0.65) |

### GSÍ: **Korpa - Landið** (club: Golfklúbbur Reykjavíkur)

4 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| Korpa Áin/Landið | Golfklúbbur Reykjavíkur | 64.15226, -21.76259 | FUZZY (0.52) |
| Korpa Landið | Golfklúbbur Reykjavíkur | 64.15226, -21.76259 | FUZZY (0.75) |
| Korpa Landið | Golfklúbbur Reykjavíkur | 64.15226, -21.76259 | FUZZY (0.75) |
| Korpa Landið/Áin | Golfklúbbur Reykjavíkur | 64.15226, -21.76259 | FUZZY (0.52) |

### GSÍ: **Korpa - Sjórinn** (club: Golfklúbbur Reykjavíkur)

4 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| Korpa Sjórinn | Golfklúbbur Reykjavíkur | 64.15226, -21.76259 | FUZZY (0.76) |
| Korpa Sjórinn/Áin | Golfklúbbur Reykjavíkur | 64.15226, -21.76259 | FUZZY (0.55) |
| Korpa Sjórinn/Landið | Golfklúbbur Reykjavíkur | 64.15226, -21.76259 | COORD (43 m) |
| Korpúlfsstaðir 9 holur | Golfklúbbur Reykjavíkur | 64.15226, -21.76259 | COORD (43 m) |

### GSÍ: **Hagavöllur** (club: Golfklúbbur Seyðisfjarðar)

2 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| Hagavöllur | Golfklúbbur Seyðisfjarðar - GSF | 65.25746, -14.01206 | EXACT |
| 9-hole course | Hagavöllur | 65.24997, -14.02729 | COORD (250 m) |

### GSÍ: **Svarfhólsvöllur** (club: Golfklúbbur Selfoss)

2 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| Hólsvöllur | Golfklúbbur Siglufjarðar - GKS | 66.11864, -18.93456 | FUZZY (0.50) |
| Svarfhólsvöllur | Svarfhólsvöllur Golf Course | 64.14350, -21.87905 | EXACT |

### GSÍ: **Garðavöllur undir jökli** (club: Golfklúbbur Staðarsveitar)

2 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| Garðavöllur undir Jökli | Golfklúbbur Staðarsveitar | 64.05883, -21.99208 | NORMALIZED |
| Garðavöllur undir jökli | Golklubbur Staðarsveitar | 64.83206, -23.24600 | EXACT |

### GSÍ: **Strandarvöllur** (club: Golfklúbbur Hellu)

2 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| Strandarvöllur | Golfklúbburinn Hellu - GHR | — | EXACT |
| Strandarvöllur | Strandarvöllur | 63.79880, -20.29819 | EXACT |

### GSÍ: **Setbergsvöllur** (club: Golfklúbburinn Setberg)

2 DB rows map here:

| DB name | DB club | Coords | match via |
|---|---|---|---|
| 9-hole course | Golfklúbburinn Setberg - GSE | 64.06759, -21.93093 | COORD (403 m) |
| Setbergsvöllur | Golfklúbburinn Setberg - GSE | 64.06759, -21.93093 | EXACT |
