# Belgium match report
Generated: 2026-05-04T19:08:09

2-source: golf.be federation + OSM. Federation-first per-felt-confidence.
Trust hierarki: golf.be > OSM > DB (Golfapi).
Scope: website + email + phone (federation har alle tre).

## Summary

| Bucket | Clubs | Courses |
|---|---:|---:|
| High conf | 71 | 148 |
| Medium conf | 2 | 3 |
| Low conf | 1 | 1 |
| No match | 0 | 0 |
| Orphans (no fed match) | 14 | 22 |

## Field-fill projection (excl. orphans)

| Field | Clubs | Courses |
|---|---:|---:|
| website | 32 | 65 |
| email | 73 | 151 |
| phone | 73 | 151 |

## High confidence (recommended to apply)

### Antwerp Golf School (Belgium, 1 courses)

- DB: addr=" 10, Groenenhoek, Aartselaar", web=null, email=null, phone=null
- golf.be (high, sim=0.778, boost=+0.4[city:aartselaar], 2630 Aartselaar): name="Antwerp Golfschool", web="http://www.ags.be/", email="info@ags.be", phone="+3238870170"
- OSM (high, 209m, sim=1): name="Antwerp Golf School", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.778)
  - email: from fed(high, sim=0.778)
  - phone: from fed(high, sim=0.778)

### Avernas Golf Club (Belgium, 1 courses)

- DB: addr="19a, Route de Grand Hallet, Avernas-le-Bauduin", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], 4280 Hannut): name="Avernas Golf Club", web="http://www.golfavernas.be", email="info@golfavernas.be", phone="+3219513066"
- OSM (high, 32m, sim=1): name="Avernas Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### BDGC Brussels Drohme Golf Club (Belgium, 1 courses)

- DB: addr="Chaussée de la Hulpe 53a, Uccle", web=null, email=null, phone=null
- golf.be (high, sim=0.75, boost=+0.7[city:uccle,jaccard:0.75], 1180 Uccle): name="Brussels Drohme Golf Club", web="http://www.bdgc.be", email="info@bdgc.be", phone="+3226722222"
- OSM (low, 193m, sim=0.4): name="Brussels Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.75)
  - email: from fed(high, sim=0.75)
  - phone: from fed(high, sim=0.75)

### Bossenstein Golf & Polo Club (Belgium, 2 courses)

- DB: addr="16, Maas en Moor, Bossenstein", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], 2520 Ranst): name="Bossenstein Golf & Polo Club", web="http://www.bossenstein.be", email="golf@bossenstein.be", phone="+3234856446"
- OSM (no-match, 46865m, sim=0.364): name="Brussels Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Brabantse Golf Club (Belgium, 1 courses)

- DB: addr="11, Steenwagenstraat, Melsbroek", web="https://www.brabantsegolf.be/", email=null, phone=null
- golf.be (high, sim=0.474, boost=+0.52[name-token:melsbroek,jaccard:0.67], 1820 Steenokkerzeel): name="Brabantse Golf (Melsbroek)", web="http://www.brabantsegolf.be", email="secretariaat@brabantsegolf.be", phone="+3227518205"
- OSM (medium, 297m, sim=1): name="Brabantse Golf", web="https://www.brabantsegolf.be/", email="secretariaat@brabantsegolf.be", phone="+32 2 751 82 05"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.474)
  - phone: from fed(high, sim=0.474)

### Brasschaat Open Golf & Country Club (Belgium, 5 courses)

- DB: addr="248, Miksebaan, Brasschaat", web="https://brasschaatgolf.be/en", email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:brasschaat,db-name-substring,jaccard:1.00], 2930 Brasschaat): name="Brasschaat Open Golf & Country Club", web="http://www.brasschaatgolf.be", email="info@brasschaatgolf.be", phone="+3236531084"
- OSM (high, 53m, sim=1): name="Brasschaat Open Golf & Country Club", web="https://brasschaatgolf.be/en", email=null, phone="+32 3 653 10 84"

**Proposed UPDATE** (alle 5 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cleydael Golf & Country Club (Belgium, 2 courses)

- DB: addr="Cleydaellaan 36, Aartselaar", web="https://cleydael.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:aartselaar,db-name-substring,jaccard:1.00], 2630 Aartselaar): name="Cleydael Golf & Country Club", web="http://www.cleydael.be", email="administratie@cleydael.be", phone="+3238870079"
- OSM (low, 525m, sim=0.727): name="Cleydael Golf en Country Club", web="https://cleydael.be/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Club de Golf D'Hulencourt (Belgium, 4 courses)

- DB: addr="15, Bruyere d'Hulencourt, Vieux-Genappe", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.8[city:genappe,jaccard:1.00], 1472 Genappe): name="Golf Club d'Hulencourt", web="http://www.golfhulencourt.be", email="info@golfhulencourt.be", phone="+3267794040"
- OSM (high, 91m, sim=1): name="Golf d'Hulencourt", web=null, email=null, phone=null

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Damme Golf & Country Club (Belgium, 3 courses)

- DB: addr="Doornstraat 16, Damme", web="https://dammegolf.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:damme,db-name-substring,jaccard:1.00], 8340 Damme): name="Damme Golf & Country Club", web="http://www.dammegolf.be/", email="info@dammegolf.be", phone="+3250353572"
- OSM (low, 371m, sim=0.625): name="Damme Golf en Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Durbuy Golfclub (Belgium, 2 courses)

- DB: addr="Route d'Oppagne 34, Durbuy", web="https://www.golfdurbuy.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.2[jaccard:0.50], 6940 Barvaux-sur-Ourthe): name="Golf de Durbuy", web=null, email="info@golfdurbuy.be", phone="+3286214454"
- OSM (medium, 379m, sim=1): name="Golf de Durbuy", web="https://www.golfdurbuy.be/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Executive Club Private Golf Zwijnaarde (Belgium, 1 courses)

- DB: addr="Joachim Schayckstraat 6, Gent", web=null, email=null, phone=null
- golf.be (high, sim=0.607, boost=+0.7[city:gent,jaccard:0.75], 9052 Gent): name="Executive Club Private Golf", web=null, email="ecpgzwijnaarde@telenet.be", phone="+3292208994"
- OSM (no-match, 206042m, sim=0.321): name="Golf Découverte Virton", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.607)
  - phone: from fed(high, sim=0.607)

### Golf & Country Club De Wijnvelden (Belgium, 2 courses)

- DB: addr="74, Bergstraat, Onze-lieve-Vrouw-Waver", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.4[city:waver], 2861 Sint-Katelijne-Waver): name="Golfclub De Wijnvelden", web="http://www.golfclubdewijnvelden.be", email="info@golfclubdewijnvelden.be", phone="+3215630364"
- OSM (high, 15m, sim=1): name="De Wijnvelden", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf & Country Club Henri-Chapelle (Belgium, 3 courses)

- DB: addr="3, Rue du Vivier, Henri-Chapelle", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.3[jaccard:0.75], 4841 Welkenraedt): name="Golf Henri Chapelle", web="http://www.golfhenrichapelle.be/", email="info@golfhenrichapelle.be", phone="+3287881991"
- OSM (low, 181m, sim=0.571): name="La Chapelle", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf & Country Club Oudenaarde (Belgium, 6 courses)

- DB: addr="52, Kortrijkstraat, Wortegem-Petegem", web="https://www.golfoudenaarde.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.67[city:wortegem,jaccard:0.67], 9790 Wortegem-Petegem): name="Royal Golf Club Oudenaarde", web="http://www.golfoudenaarde.be/", email="oudenaarde@golf.be", phone="+3255334161"
- OSM (high, 54m, sim=1): name="Golf & Country Club Oudenaarde", web="https://www.golfoudenaarde.be/", email="oudenaarde@golf.be", phone="+32 55 33 41 61"

**Proposed UPDATE** (alle 6 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf 7 Fontaines (Belgium, 3 courses)

- DB: addr="1021, Chaussee d' Alsemberg, Braine-l'Alleud", web="https://www.golf7fontaines.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.8[city:braine,jaccard:1.00], 1420 Braine-l'Alleud): name="Golf Club 7 Fontaines", web="http://www.golf7fontaines.be/", email="info@golf7fontaines.be", phone="+3223530246"
- OSM (high, 22m, sim=0.714): name="Golf de Sept-Fontaines", web="https://www.golf7fontaines.be/", email=null, phone="+32 2 353 02 46"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Château de la Tournette (Belgium, 3 courses)

- DB: addr="Chemin de Baudemont 21, Nivelles", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:nivelles,db-name-substring,jaccard:1.00], 1400 Nivelles): name="Golf Château de la Tournette", web="http://www.tournette.com", email="info@tournette.com", phone="+3267894266"
- OSM (medium, 258m, sim=1): name="Golf Château de la Tournette", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club Beveren (Belgium, 2 courses)

- DB: addr="2, Singelweg, Kallo-Beveren", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.6[city:beveren,jaccard:0.50], 9120 Beveren): name="Golfclub Beveren", web="http://www.golfclubbeveren.be/", email="info@golfclubbeveren.be", phone="+3235751175"
- OSM (medium, 349m, sim=1): name="Golfclub Beveren", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club De Kluizen (Belgium, 1 courses)

- DB: addr="6, Zandberg, Aalst", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.6[city:aalst,jaccard:0.50], 9300 Aalst): name="Golfclub De Kluizen", web="http://www.dekluizen.be/", email="info@dekluizen.be", phone="+3253410847"
- OSM (high, 232m, sim=1): name="De Kluizen", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club De Pierpont (Belgium, 3 courses)

- DB: addr="1, Grand Pierpont, Frasnes-lez-Gosselies", web="https://pierpont.be/fr", email=null, phone=null
- golf.be (high, sim=1, boost=+0.4[jaccard:1.00], 6210 Les Bons Villers): name="Golf de Pierpont", web="http://www.pierpont.be", email="info@pierpont.be", phone="+3271880830"
- OSM (medium, 282m, sim=1): name="Golf Club de Pierpont", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club Kampenhout (Belgium, 1 courses)

- DB: addr="56, Wildersedreef, Kampenhout", web="https://www.golfkampenhout.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.6[city:kampenhout,jaccard:0.50], 1910 Kampenhout): name="Golfclub Kampenhout", web="http://www.golfclubkampenhout.be/", email="info@golfclubkampenhout.be", phone="+3216651216"
- OSM (low, 226m, sim=0.435): name="Golf & Businessclub Kampenhout", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club Krokkebaas (Belgium, 2 courses)

- DB: addr="161, Kasteelstraat, Buggenhout", web="https://www.krokkebaas.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.6[city:buggenhout,jaccard:0.50], 9255 Buggenhout): name="Golfclub Krokkebaas", web="http://www.krokkebaas.be", email="info@krokkebaas.be", phone="+3252332161"
- OSM (high, 52m, sim=1): name="Krokkebaas", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De L'empereur (Belgium, 2 courses)

- DB: addr="Rue Emile François 31, Genappe", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.8[city:genappe,jaccard:1.00], 1474 Genappe): name="Golf de l’Empereur", web="http://www.golfempereur.com", email="info@golfempereur.com", phone="+3267771571"
- OSM (low, 564m, sim=1): name="Golf de l'Empereur", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de L’Empereur (Belgium, 1 courses)

- DB: addr="31 Rue Emile François, Ways (Genappe)", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:genappe,db-name-substring,jaccard:1.00], 1474 Genappe): name="Golf de l’Empereur", web="http://www.golfempereur.com", email="info@golfempereur.com", phone="+3267771571"
- OSM (low, 564m, sim=1): name="Golf de l'Empereur", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Louvain La Neuve (Belgium, 1 courses)

- DB: addr="68, Rue Arthur Hardy, Louvain-la-Neuve", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.8[city:louvain,jaccard:1.00], 1348 Ottignies-Louvain-la-Neuve): name="Golf de Louvain-La-Neuve", web="http://www.pro1golf.info/pro1golf/louvain-le-neuve/", email="info@golflln.com", phone="+3210450515"
- OSM (low, 392m, sim=0.176): name="Prairie à l'avion", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De Rougemont (Belgium, 1 courses)

- DB: addr="Chemin du Beau Vallon, Profondeville", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:profondeville,db-name-substring,jaccard:1.00], 5100 Profondeville): name="Golf de Rougemont", web="http://www.golfderougemont.be", email="secretariat@golfderougemont.be", phone="+3281412131"
- OSM (high, 143m, sim=1): name="Golf de Rougemont", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Découverte Virton (Belgium, 1 courses)

- DB: addr="Dessus la Fontaine de Solumont 24, Virton", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:virton,db-name-substring,jaccard:1.00], 6762 Virton): name="Golf Découverte Virton", web="http://virton.mygolf.be/", email="secretariat@golfvirton.be", phone="+32486966336"
- OSM (high, 37m, sim=1): name="Golf Découverte Virton", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Bercuit (Belgium, 2 courses)

- DB: addr="3, Les Gottes, Grez-Doiceau", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.8[city:grez,jaccard:1.00], 1390 Grez-Doiceau): name="Royal Bercuit Golf Club", web=null, email="info@royalbercuitgolfclub.be", phone="+3210841501"
- OSM (medium, 468m, sim=1): name="Golf du Bercuit", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Château de la Bawette (Belgium, 2 courses)

- DB: addr="Chaussée du Château de Bawette 5, Wavre", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:wavre,db-name-substring,jaccard:1.00], 1300 Wavre): name="Golf du Château de la Bawette", web="https://www.golflabawette.green/", email="info@labawette.com", phone="+010223332"
- OSM (high, 111m, sim=1): name="Golf du Château de la Bawette", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Du Haras (Belgium, 1 courses)

- DB: addr="2 rue Belle vue, Pepinster", web="https://www.golfduharas.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:pepinster,db-name-substring,jaccard:1.00], 4860 Pepinster): name="Golf du Haras", web="http://www.golfduharas.be", email="secretariat@golfduharas.be", phone="+3287222410"
- OSM (high, 224m, sim=1): name="Golf du Haras", web="https://www.golfduharas.be/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Forum Lummen (Belgium, 2 courses)

- DB: addr="1/B, Golfweg, Lummen", web=null, email=null, phone=null
- golf.be (high, sim=0.75, boost=+0.4[city:lummen], 3560 Lummen): name="Golfforum Lummen", web="http://www.golfforumlummen.be/", email="golfforum@skynet.be", phone="+3213521664"
- OSM (no-match, 80038m, sim=0.333): name="De Kluizen", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.75)
  - email: from fed(high, sim=0.75)
  - phone: from fed(high, sim=0.75)

### Golf Hotel De Falnuée-Mazy (Belgium, 1 courses)

- DB: addr="Rue Emile Pirson 55, Gembloux", web="https://www.golf-hotel-falnuee.com/", email=null, phone=null
- golf.be (high, sim=0.583, boost=+0.67[city:gembloux,jaccard:0.67], 5032 Gembloux): name="Golf de Falnuée", web="http://www.golf-hotel-falnuee.be", email="info@falnuee.be", phone="+3281633090"
- OSM (low, 447m, sim=0.583): name="Golf de Falnuée", web="https://www.golf-hotel-falnuee.com/", email="info@falnuee.be", phone="+32 81 63 30 90"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.583)
  - phone: from fed(high, sim=0.583)

### Golf La Bruyere (Belgium, 2 courses)

- DB: addr="Rue Jumerée 1, Villers-la-Ville", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.8[city:villers,jaccard:1.00], 1495 Villers-la-Ville): name="Golf la Bruyère", web="http://www.golflabruyere.be/", email="info@golflabruyere.be", phone="+3271877267"
- OSM (medium, 253m, sim=1): name="Golf La Bruyère", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Liège - Bernalmont (Belgium, 2 courses)

- DB: addr="Rue Bernalmont 2, Liège", web="http://bernalmont.mygolf.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.4[jaccard:1.00], 4000 Liège): name="Golf Club de Liege-Bernalmont", web="http://www.pro1golf.info/pro1golf/bernalmont/", email="bernalmont@pro1golf.com", phone="+3242274466"
- OSM (medium, 354m, sim=1): name="Golf de Liège-Bernalmont", web="http://bernalmont.mygolf.be/", email=null, phone="+32 4 227 44 66"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Park Tervuren (Belgium, 1 courses)

- DB: addr="Hertswegenstraat 59,  Tervuren", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:tervuren,db-name-substring,jaccard:1.00], 3080 Tervuren): name="Golf Park Tervuren", web=null, email="hallo@golfparktervuren.be", phone=null
- OSM (high, 63m, sim=1): name="Golf Park Tervuren", web=null, email="hallo@golfparktervuren.be", phone="+32 304 77 3108"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from osm(high, 63m, sim=1)

### Golf Rigenée (Belgium, 3 courses)

- DB: addr="Rue du Châtelet 62, Villers-la-Ville", web="https://www.rigenee.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.8[city:villers,jaccard:1.00], 1495 Villers-la-Ville): name="Golf de Rigenée", web="http://www.rigenee.be/", email="golf@rigenee.be", phone="+3271877765"
- OSM (low, 825m, sim=1): name="Golf de Rigenée", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf ter Hille (Belgium, 3 courses)

- DB: addr="Hazebeekstraat 11, Koksijde", web="https://www.koksijdegolfterhille.be", email=null, phone=null
- golf.be (high, sim=0.5, boost=+1.22[city:koksijde,name-token:koksijde,db-name-substring,jaccard:0.67], 8670 Koksijde): name="Koksijde Golf ter Hille", web="http://www.koksijdegolfterhille.be/", email="golfsecretariaat@koksijde.be", phone="+3258532710"
- OSM (low, 763m, sim=0.5): name="Koksijde Golf Ter Hille", web="https://www.koksijdegolfterhille.be", email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Golfclub Hasselt (Belgium, 3 courses)

- DB: addr="15, Vissenbroeckstraat, Hasselt", web="https://www.flandersnippongolf.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:hasselt,db-name-substring,jaccard:1.00], 3500 Hasselt): name="Golfclub Hasselt", web="http://www.flandersnippongolf.be", email="flanders.nippon.golf@telenet.be", phone="+3211263482"
- OSM (no-match, 83557m, sim=0.5): name="Brussels Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golfschool Gent (Belgium, 1 courses)

- DB: addr="Keiskantstraat 5, Drongen", web="https://golfschoolgent.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], 9031 Gent): name="Golfschool Gent", web="http://www.golfschool-gent.be/", email="info@golfschool-gent.be", phone="+3292162848"
- OSM (low, 139m, sim=0.267): name="Golfclub Gent", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Greenhouse Golf St. Vith (Belgium, 1 courses)

- DB: addr="Prümer Str. 42a, St. Vith", web=null, email=null, phone=null
- golf.be (high, sim=0.947, boost=+0.7[city:vith,jaccard:0.75], 4780 Sankt Vith): name="Green House Golf St.Vith", web="http://www.thegreenhouse.be/", email="info@thegreenhouse.be", phone="+3280292970"
- OSM (no-match, 158643m, sim=0.389): name="ClubHouse RGCH", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.947)
  - email: from fed(high, sim=0.947)
  - phone: from fed(high, sim=0.947)

### Keerbergen Golf Club (Belgium, 3 courses)

- DB: addr="50, Vlieghavenlaan, Keerbergen", web="https://www.royalkeerbergengolfclub.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.6[city:keerbergen,jaccard:0.50], 3140 Keerbergen): name="Royal Keerbergen Golfclub", web="http://www.golfkeerbergen.be", email="info@golfkeerbergen.be", phone="+3215226878"
- OSM (medium, 487m, sim=1): name="Keerbergen Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Kempense Golf Club (Belgium, 1 courses)

- DB: addr="78, Kiezelweg, Mol", web="https://www.kempensegolf.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], 2400 Mol): name="Kempense Golf Club", web="http://www.kempensegolf.be", email="info@kempensegolf.be", phone="+3214816234"
- OSM (medium, 285m, sim=1): name="Kempense Golfclub", web="https://www.kempensegolf.be/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lilse Golf & Country Club (Belgium, 1 courses)

- DB: addr="Haarlebeek 3, Lille", web="https://www.lilsegolf.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.8[city:lille,jaccard:1.00], 2275 Lille): name="Lilse Golf & Country", web="http://www.lilsegolfcountry.be", email="info@lilsegolfcountry.be", phone="+3214551930"
- OSM (high, 170m, sim=0.8): name="Golf Lille", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Limburg Golf & Country Club (Belgium, 1 courses)

- DB: addr="1, Golfstraat, Houthalen", web="https://klgc.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.67[city:houthalen,jaccard:0.67], 3530 Houthalen-Helchteren): name="Royal Limburg Golf", web="http://www.klgc.be", email="info@klgc.be", phone="+3289383543"
- OSM (medium, 441m, sim=1): name="Koninklijke Limburg Golf Club", web="https://klgc.be/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Méan Five Nations Golfclub (Belgium, 2 courses)

- DB: addr="Grand Scley, Havelange", web="https://www.golfdurbuy.be/", email=null, phone=null
- golf.be (high, sim=0.706, boost=+0.27[jaccard:0.67], null ): name="Five Nations Golfclub", web=null, email="info@fivenationsdurbuy.be", phone="+3286214454"
- OSM (low, 406m, sim=0.706): name="Five Nations Golf Club", web="https://www.golfdurbuy.be/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.706)
  - phone: from fed(high, sim=0.706)

### Millennium Golf Club (Belgium, 3 courses)

- DB: addr="30, Donckstraat, Paal-Beringen", web="https://www.millenniumgolf.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.8[city:beringen,jaccard:1.00], 3583 Beringen): name="Millennium Golf", web="http://www.millenniumgolf.be", email="info@millenniumgolf.be", phone="+3213618950"
- OSM (high, 177m, sim=1): name="Millennium Golf", web="https://www.millenniumgolf.be/", email="secretariaat@millenniumgolf.be", phone="+32 13 61 89 51"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Mont Garni Golf Club (Belgium, 4 courses)

- DB: addr="3, Rue du Mont Garni, Baudour", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.4[jaccard:1.00], 7331 Saint-Ghislain): name="Golf du Mont Garni", web="http://www.golfmontgarni.be/en/", email="secretariat@golfmontgarni.be", phone="+3265529410"
- OSM (high, 72m, sim=1): name="Mont garni Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Naxhelet Golf Club (Belgium, 1 courses)

- DB: addr="Chemin de Naxhelet, Wanze", web="https://naxhelet.be", email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:wanze,db-name-substring,jaccard:1.00], 4520 Wanze): name="Naxhelet Golf Club", web="http://naxhelet.be/", email="reception@naxhelet.be", phone="+3285826408"
- OSM (medium, 368m, sim=1): name="Naxhelet Golf & Country Club", web="https://naxhelet.be", email=null, phone="+32 85 82 64 08"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Puyenbroeck Golf Course (Belgium, 2 courses)

- DB: addr="5, Craenendam, Wachtebeke", web="https://oost-vlaanderen.be/ontspannen/recreatiedomeinen/puyenbroeck/sporten/golf-puyenbroeck.html", email=null, phone=null
- golf.be (high, sim=1, boost=+0.4[city:wachtebeke], 9185 Wachtebeke): name="Golfclub Puyenbroeck", web="http://www.puyenbroeck.be/sporten-en-bewegen/golf", email="golf.puyenbroeck@oost-vlaanderen.be", phone="+3293424276"
- OSM (medium, 370m, sim=1): name="Golf Puyenbroeck", web="https://oost-vlaanderen.be/ontspannen/recreatiedomeinen/puyenbroeck/sporten/golf-puyenbroeck.html", email="puyenbroeck.golf@oost-vlaanderen.be", phone="+32 9 342 42 76"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Rhode-Saint-Genèse Golf Club (Belgium, 1 courses)

- DB: addr="Avenue Brassine 92b, Rhode-Saint-Genèse", web=null, email=null, phone=null
- golf.be (high, sim=0.667, boost=+0.3[jaccard:0.75], 1640 Sint-Genesius-Rode): name="Golf Practice Rhode-Saint-Genèse", web="http://www.golfpracticersg.be/", email="okunoatsuko@msn.com", phone="+3223583467"
- OSM (no-match, 54959m, sim=0.389): name="Golf Club d'Andenne", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.667)
  - email: from fed(high, sim=0.667)
  - phone: from fed(high, sim=0.667)

### Rinkven International Golf & Country Club (Belgium, 2 courses)

- DB: addr="2970 Gravenwezel, Gravenwezel", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.6[plz:2970,jaccard:0.75], 2970 Schilde): name="Rinkven International Golf Club", web="http://www.rinkven.be", email="balie@rinkven.be", phone="+3233801280"
- OSM (no-match, 115323m, sim=0.476): name="Five Nations Golf Club", web="https://www.golfdurbuy.be/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Amicale Anderlecht Golf Club (Belgium, 1 courses)

- DB: addr="1, Rue Scholle, Brussels", web="https://www.golf-anderlecht.com/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], 1070 Anderlecht): name="Royal Amicale Anderlecht Golf Club", web="http://www.golf-anderlecht.com/", email="info@golf-anderlecht.com", phone="+3225211687"
- OSM (low, 511m, sim=1): name="Royal Amicale Anderlecht Golf Club", web="https://www.golf-anderlecht.com/", email="info@golf-anderlecht.com", phone="+32 2 521 16 87"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Antwerp Golf Club (Belgium, 3 courses)

- DB: addr="1A, Torenlei, Kapellen", web="https://www.ragc.be", email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:kapellen,db-name-substring,jaccard:1.00], 2950 Kapellen): name="Royal Antwerp Golf Club", web="http://www.ragc.be", email="info@ragc.be", phone="+3236668456"
- OSM (high, 51m, sim=1): name="Royal Antwerp Golf Club", web="https://www.ragc.be", email="info@ragc.be", phone="+32 3 666 84 56"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Golf Club des Fagnes (Belgium, 1 courses)

- DB: addr="1, Avenue de l'Hippodrome, Spa", web="http://www.golfdespa.be", email=null, phone=null
- golf.be (high, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], 4900 Spa): name="Royal Golf Club des Fagnes", web=null, email="info@golfdespa.be", phone="+3287793030"
- OSM (low, 555m, sim=1): name="Royal Golf Club des Fagnes", web="http://www.golfdespa.be", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Golf Club du Château d'Ardenne (Belgium, 1 courses)

- DB: addr="Ardennes 6, Houyet", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.8[city:houyet,jaccard:1.00], 5560 Houyet): name="Royal Golf Club du Château d’Ardenne", web="http://www.royal-ardenne.be/", email="secretariat@royal-ardenne.be", phone="+3282666228"
- OSM (low, 4301m, sim=1): name="Royal Golf Club du Château Royal d'Ardenne", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Golf Club Du Hainaut (Belgium, 9 courses)

- DB: addr="2, de la Verrerie, Erbisoeul", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], 7050 Jurbise): name="Royal Golf Club du Hainaut", web="http://www.golfhainaut.be", email="info@golfhainaut.be", phone="+3265229610"
- OSM (low, 560m, sim=1): name="Royal Golf Club du Hainaut", web=null, email=null, phone=null

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Golf Club of Belgium (Belgium, 2 courses)

- DB: addr="Chateau de Ravenstein, Tervuren", web=null, email=null, phone=null
- golf.be (high, sim=0.476, boost=+1.22[city:tervuren,name-token:ravenstein,db-name-substring,jaccard:0.67], 3080 Tervuren): name="Royal Golf Club of Belgium (Ravenstein)", web="http://www.rgcb.be", email="info@rgcb.be", phone="+3227675801"
- OSM (high, 47m, sim=1): name="Royal Golf Club of Belgium", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.476)
  - email: from fed(high, sim=0.476)
  - phone: from fed(high, sim=0.476)

### Royal Golf Club Sart Tilman (Belgium, 2 courses)

- DB: addr="Route du Condroz 541, Liège", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], 4031 Liège): name="Royal Golf Club Sart Tilman", web="http://www.rgcst.be", email="booking@rgcst.be", phone="+3243362021"
- OSM (medium, 457m, sim=1): name="Royal Golf Club Sart Tilman", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Latem Golf Club (Belgium, 2 courses)

- DB: addr="120, Latemstraat, Sint-Martens-Latem", web="https://www.latemgolf.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:sint,db-name-substring,jaccard:1.00], 9830 Sint-Martens-Latem): name="Royal Latem Golf Club", web="http://www.latemgolf.be/", email="info@latemgolf.be", phone="+3292825411"
- OSM (high, 109m, sim=1): name="Royal Latem Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Ostend Golf Club (Belgium, 1 courses)

- DB: addr="Koninklijke Baan 2, De Haan", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:haan,db-name-substring,jaccard:1.00], 8420 De Haan): name="Royal Ostend Golf Club", web="http://www.royalostendgolfclub.com/", email="info@rogc.eu", phone="+3259233283"
- OSM (low, 916m, sim=1): name="Royal Ostend Golfclub", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Waterloo Golf Club (Belgium, 4 courses)

- DB: addr="50, Vieux Chemin de Wavre, Ohain", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.2[jaccard:0.50], 1380 Lasne): name="Royal Waterloo Golfclub", web="http://www.royalwaterloogolfclub.be", email="infos@golfwaterloo.be", phone="+3226331850"
- OSM (high, 138m, sim=1): name="Royal Waterloo Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Royal Zoute Golf Club (Belgium, 2 courses)

- DB: addr="Sparrendreef 1A, Knokke-Heist", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:knokke,db-name-substring,jaccard:1.00], 8300 Knokke-Heist): name="Royal Zoute Golf Club", web="http://www.zoute.be/index_golf.htm", email="golf@zoute.be", phone="+3250601227"
- OSM (high, 205m, sim=1): name="Royal Zoute Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Spiegelven Golf Club (Belgium, 3 courses)

- DB: addr="109, Wiemesmeerstraat, Genk", web="https://spiegelven.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.6[city:genk,jaccard:0.50], 3600 Genk): name="Spiegelven Golfclub", web="http://www.spiegelven.be", email="info@spiegelven.be", phone="+3289359616"
- OSM (no-match, 40790m, sim=0.5): name="Steenhoven Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Steenhoven Country Club (Belgium, 2 courses)

- DB: addr="89, Steenovens, Postel", web="https://steenhoven.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.7[db-name-substring,jaccard:1.00], 2400 Mol): name="Steenhoven Country Club", web="http://www.steenhoven.be", email="info@steenhoven.be", phone="+3214373661"
- OSM (medium, 326m, sim=1): name="Steenhoven Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Steenpoel Golf (Belgium, 1 courses)

- DB: addr="J.M. Van Lierdelaan 24, Dilbeek", web="https://www.steenpoel.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:dilbeek,db-name-substring,jaccard:1.00], 1701 Dilbeek): name="Steenpoel Golf", web="http://www.steenpoel.be", email="info@steenpoel.be", phone="+3225696981"
- OSM (high, 26m, sim=1): name="Golf Club Steenpoel", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Steenpoel Golf Club (Belgium, 1 courses)

- DB: addr="28, J.M. Van Lierdelaan, Itterbeek", web="https://www.steenpoel.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.4[jaccard:1.00], 1701 Dilbeek): name="Steenpoel Golf", web="http://www.steenpoel.be", email="info@steenpoel.be", phone="+3225696981"
- OSM (high, 26m, sim=1): name="Golf Club Steenpoel", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ternesse Golf & Country Club (Belgium, 2 courses)

- DB: addr="15, Uilenbaan, Wommelgem", web="https://www.ternessegolf.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:wommelgem,db-name-substring,jaccard:1.00], 2160 Wommelgem): name="Ternesse Golf & Country Club", web="http://www.ternessegolf.be/", email="info@ternessegolf.be", phone="+3233551432"
- OSM (medium, 335m, sim=1): name="Ternesse Golf & Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### The Royal Golf Club of Belgium (Belgium, 1 courses)

- DB: addr="Koninklijke Wandeling 1, Tervuren", web=null, email=null, phone=null
- golf.be (high, sim=0.476, boost=+0.67[city:tervuren,jaccard:0.67], 3080 Tervuren): name="Royal Golf Club of Belgium (Ravenstein)", web="http://www.rgcb.be", email="info@rgcb.be", phone="+3227675801"
- OSM (low, 2407m, sim=1): name="Royal Golf Club of Belgium", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.476)
  - email: from fed(high, sim=0.476)
  - phone: from fed(high, sim=0.476)

### Waregem Golf Club (Belgium, 3 courses)

- DB: addr="41, Bergstraat, Waregem", web="https://www.waregemgolf.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.8[city:waregem,jaccard:1.00], 8790 Waregem): name="Waregem Golf", web="http://www.waregemgolf.be/", email="golf@waregemgolf.be", phone="+3256608808"
- OSM (high, 66m, sim=1): name="Waregem Golf", web="https://www.waregemgolf.be/", email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Wase golf  (Belgium, 1 courses)

- DB: addr="Sint-gillis-waes", web="https://www.wasegolf.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+0.8[city:sint,jaccard:1.00], 9170 Sint-Gillis-Waas): name="Wase Golf", web="https://www.wasegolf.be", email="info@wasegolf.be", phone="+3235509404"
- OSM (low, 2999m, sim=1): name="Wase Golf", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Westgolf Course (Belgium, 1 courses)

- DB: addr="81, Bassevillestraat, Westende", web=null, email=null, phone=null
- golf.be (high, sim=1, boost=+0.2[jaccard:0.50], 8434 Middelkerke): name="WestGolf", web="http://www.westgolf.be", email="info@westgolf.be", phone="+3258241077"
- OSM (high, 207m, sim=1): name="Westgolf", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Winge Golf & Country Club (Belgium, 5 courses)

- DB: addr="252, Leuvensesteenweg, Sint-Joris-Winge", web="https://wingegolf.be/", email=null, phone=null
- golf.be (high, sim=1, boost=+1.1[city:winge,db-name-substring,jaccard:1.00], 3390 Tielt-Winge): name="Winge Golf & Country Club", web="http://www.wingegolf.be", email="info@wingegolf.be", phone="+3216634053"
- OSM (medium, 459m, sim=1): name="Winge Golf & Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 5 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

## Medium confidence (review before applying)

### Golf & Country Club De Palingbeek (Belgium, 1 courses)

- DB: addr="14, Eekhofstraat, Ypres", web="https://www.golfpalingbeek.be/", email=null, phone=null
- golf.be (medium, sim=0.455, boost=+0.4[jaccard:1.00], 8902 Ieper): name="Golf & Countryclub De Palingbeek", web=null, email="info@golfpalingbeek.be", phone="+3257200436"
- OSM (low, 121m, sim=0.455): name="Golf & Countryclub De Palingbeek", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - email: from fed(medium, sim=0.455)
  - phone: from fed(medium, sim=0.455)

### Golf du Bois d'Arlon & Resort (Belgium, 2 courses)

- DB: addr="Route de Virton 356, Arlon", web=null, email=null, phone=null
- golf.be (medium, sim=0.294, boost=+0.65[city:virton,name-token:virton], 6762 Virton): name="Golf Découverte Virton", web="http://virton.mygolf.be/", email="secretariat@golfvirton.be", phone="+32486966336"
- OSM (low, 483m, sim=0.083): name="Heathland", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.294)
  - email: from fed(medium, sim=0.294)
  - phone: from fed(medium, sim=0.294)

## Low confidence (manual decision)

### Ragnies Golf Club (Belgium, 1 courses)

- DB: addr="Rue de la Roquette 31-33, Thuin", web="https://www.ragniesgolf.be/", email=null, phone=null
- golf.be (low, sim=0.714, 4900 Spa): name="Royal Golf Club des Fagnes", web=null, email="info@golfdespa.be", phone="+3287793030"
- OSM (low, 1009m, sim=1): name="Ragnies Golf Club", web=null, email=null, phone=null

## Orphans — DB klubber uden golf.be-match

- **De Drie Eycken Golf** (1 courses) (best fed sim=0.128 → Golf.be - internet referentie voor de golfsport in België), OSM medium 353m
- **Duisburg Military Golf Club** (1 courses) (best fed sim=0.353 → Royal Golf Club Sart Tilman), OSM low 63m
- **Florennes Avia Golf Club** (1 courses) (best fed sim=0.149 → Golf.be - internet referentie voor de golfsport in België), OSM no-match 49417m
- **Golf Centrum Puurs** (1 courses) (best fed sim=0.318 → Golf & Countryclub De Palingbeek), OSM low 87m
- **Golf Club Andenne** (1 courses) (best fed sim=0.353 → Royal Golf Club du Château d’Ardenne), OSM high 110m
- **Golf Club Enghien** (2 courses) (best fed sim=0.106 → Golf.be - internet referentie voor de golfsport in België), OSM low 47m
- **Golf Club Mergelhof** (4 courses) (best fed sim=0.333 → Antwerp Golfschool), OSM high 86m
- **Golf Club Nuclea Mol** (1 courses) (best fed sim=0.4 → Cleydael Golf & Country Club), OSM low 752m
- **Golf Club Witbos** (2 courses) (best fed sim=0.085 → Golf.be - internet referentie voor de golfsport in België), OSM low 47m
- **Ieper Open Golf** (2 courses) (best fed sim=0.5 → Golfclub Beveren), OSM high 36m
- **International Gomzé** (2 courses) (best fed sim=0.421 → The National), OSM low 633m
- **Overijse Golf Club** (1 courses) (best fed sim=0.5 → Avernas Golf Club), OSM no-match 40357m
- **The National Golf Brussels** (2 courses) (best fed sim=0.471 → The National), OSM low 543m
- **Wellington Golf Course** (1 courses) (best fed sim=0.526 → Wellington Golf Oostende), OSM high 114m
