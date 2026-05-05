# France match report
Generated: 2026-05-05T04:20:04

2-source: ffgolf federation + OSM. Federation-first per-felt-confidence.
Trust hierarki: ffgolf > OSM > DB (Golfapi).
Scope: website + email + phone (ffgolf har alle tre).

## Summary

| Bucket | Clubs | Courses |
|---|---:|---:|
| High conf | 511 | 773 |
| Medium conf | 15 | 20 |
| Low conf | 5 | 6 |
| No match | 0 | 0 |
| Orphans (no fed match) | 67 | 114 |

## Field-fill projection (excl. orphans)

| Field | Clubs | Courses |
|---|---:|---:|
| website | 211 | 415 |
| email | 516 | 782 |
| phone | 515 | 780 |

## High confidence (recommended to apply)

### Aa Golf De Saint-Omer Club (France, 4 courses)

- DB: addr="Chemin du Bois, Lumbres", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.55[coord:401m,jaccard:1.00], 401m, 62380 ACQUIN WESTBECOURT): name="AA SAINT OMER GOLF CLUB", web="https://www.golfsaintomer.fr", email="info@golfsaintomer.fr", phone="+33 3 21 38 59 90"
- OSM (low, 96m, sim=0.571): name="Golf de Saint-Omer", web=null, email=null, phone=null

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Aix Marseille Golf Club (France, 1 courses)

- DB: addr="Rue Jean René Guillibert Gauthier de la Lauzière, Aix-en-Provence", web="https://www.golfaixmarseille.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:0m,jaccard:1.00], 0m, 13290 LES MILLES): name="GOLF AIX-MARSEILLE", web="https://www.golfaixmarseille.com", email="secretariat@golfclubaixmarseille.fr", phone="+33 4 42 24 20 41"
- OSM (medium, 310m, sim=1): name="Golf Club Aix Marseille", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Albret Golf Expérience (France, 1 courses)

- DB: addr="Le Pusocq, Barbaste", web="https://www.golf-albret.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:barbaste,jaccard:1.00,typo:expérience~experience], 0m, 47230 BARBASTE): name="ALBRET GOLF EXPERIENCE", web="https://www.golf-albret.fr", email="contact@golf-albret.fr", phone="+33 5 53 65 30 30"
- OSM (low, 80m, sim=0.235): name="Golf d'Albret", web="http://www.golf-albret.fr", email=null, phone="+33 5 53 65 30 30; +33 5 53 97 26 22"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Alsace Golf (France, 1 courses)

- DB: addr="-, Rouffach", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:635m,city:rouffach,db-name-substring,jaccard:0.67], 635m, 68250 ROUFFACH): name="ALSACE GOLF LINKS", web="https://www.alsacegolflinks.com", email="info@alsacegolflinks.com", phone="+33 3 89 78 52 12"
- OSM (high, 120m, sim=1): name="Alsace Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Amirauté Golf Deauville (France, 1 courses)

- DB: addr="D278, Tourgéville", web=null, email=null, phone=null
- ffgolf (high, sim=0.333, boost=+0.65[coord:433m,jaccard:0.67,typo:amirauté~amiraute], 433m, 14800 TOURGEVILLE): name="GOLF CLUB DE L'AMIRAUTE", web="https://www.amiraute.com", email="commercial-golf@amiraute.com", phone="+33 2 31 14 42 00"
- OSM (high, 42m, sim=0.9): name="Golf de l'Amirauté Deauville", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.333)
  - email: from fed(high, sim=0.333)
  - phone: from fed(high, sim=0.333)

### Angouleme Golf L'hirondelle (France, 1 courses)

- DB: addr="Chemin de l'Hirondelle, Angoulême", web="http://www.golf-angouleme.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 16000 ANGOULEME): name="ANGOULEME GOLF L'HIRONDELLE", web="http://www.golf-angouleme.com", email="contact@golf-angouleme.com", phone="+33 5 45 61 16 94"
- OSM (low, 421m, sim=0.545): name="Golf de l'Hirondelle", web="https://golf-angouleme.com/", email="contact@golf-angouleme.com", phone="+33 5 45 61 16 94"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Anjou Golf & Country Club (France, 2 courses)

- DB: addr="Route de Cheffes, Les Hauts-d'Anjou", web=null, email=null, phone=null
- ffgolf (high, sim=0.714, boost=+0.45[coord:274m,jaccard:0.67], 274m, 49330 CHAMPIGNE): name="GOLF D'ANJOU", web="http://www.anjou-golf.com", email="contact@anjou-golf.com", phone="+33 2 41 42 01 01"
- OSM (high, 92m, sim=1): name="Anjou golf & country club", web="https://www.anjou-golf.com/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.714)
  - email: from fed(high, sim=0.714)
  - phone: from fed(high, sim=0.714)

### Balata Golf (France, 1 courses)

- DB: addr="20 Route de l'Océan, Grayan-et-l'Hôpital", web=null, email=null, phone=null
- ffgolf (high, sim=0.4, boost=+1.15[coord:102m,city:grayan,db-name-substring,jaccard:0.67], 102m, 33590 GRAYAN ET L'HOPITAL): name="BALATA GOLF PRACTICE", web="https://balata-golf-medoc.com/", email="contact@balata-golf-medoc.com", phone="+33 6 51 10 06 34"
- OSM (no-match, 49408m, sim=0.5): name="Golf du Baganais", web="https://www.ucpa.com/centres-sportifs/golf-lacanau", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.4)
  - email: from fed(high, sim=0.4)
  - phone: from fed(high, sim=0.4)

### Belle Dune Golf (France, 1 courses)

- DB: addr="Promenade du Marquenterre, Fort-Mahon-Plage", web="https://www.baiedesomme.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:fort,jaccard:1.00], 0m, 80120 FORT MAHON PLAGE): name="GOLF DE BELLE DUNE", web="https://www.baiedesomme.fr", email="golf.belledune@baiedesomme.fr", phone="+33 3 22 23 45 50"
- OSM (high, 249m, sim=1): name="Golf de Belle Dune", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Biarritz Le Phare (France, 1 courses)

- DB: addr="Biarritz", web="https://www.golfbiarritz.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.15[coord:0m,city:biarritz,db-name-substring,jaccard:0.67], 0m, 64200 BIARRITZ): name="GOLF DE BIARRITZ LE PHARE", web="https://www.golfbiarritz.com", email="info@golfbiarritz.com", phone="+33 5 59 03 71 80"
- OSM (high, 155m, sim=1): name="Golf de Biarritz le Phare", web="https://golfbiarritz.com", email="info@golfbiarritz.com", phone="+33 5 59037180"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bourgenay Golf Club (France, 2 courses)

- DB: addr="Avenue de la Mine, Talmont-Saint-Hilaire", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.1[coord:485m,city:talmont,db-name-substring,jaccard:1.00], 485m, 85440 TALMONT SAINT HILAIRE): name="BOURGENAY GOLF CLUB", web="https://www.bourgenaygolfclub.com", email="contact@bourgenaygolfclub.com", phone="+33 2 51 23 35 45"
- OSM (high, 233m, sim=1): name="Bourgenay Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Bresse Golf (France, 2 courses)

- DB: addr="2958 Route de Servas, Condeissiat", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:289m,city:condeissiat,jaccard:1.00], 289m, 01400 CONDEISSIAT): name="GOLF DE LA BRESSE", web="http://www.golfdelabresse.fr", email="secretariat@golfdelabresse.com", phone="+33 4 74 51 42 09"
- OSM (high, 76m, sim=1): name="Golf de la Bresse", web="http://www.golfdelabresse.fr", email="secretariat@golfdelabresse.com", phone="+33 474514209"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cannes Mougins Golf Country Club (France, 1 courses)

- DB: addr="1175 Avenue du Golf, Mougins", web="https://www.golfcannesmougins.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:mougins,jaccard:1.00], 0m, 06250 MOUGINS): name="GOLF COUNTRY CLUB DE CANNES MOUGINS", web="https://www.golfcannesmougins.com", email="contact@golfcannesmougins.com", phone="+33 4 93 75 79 13"
- OSM (low, 921m, sim=1): name="Golf Country Club Cannes-Mougins", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Cap d'Agde (France, 9 courses)

- DB: addr="4 avenue des alizés, Le cap d'agde", web=null, email=null, phone=null
- ffgolf (high, sim=0.417, boost=+0.65[coord:1309m,city:agde,db-name-substring], 1309m, 34300 CAP D'AGDE): name="GOLF INTERNATIONAL CAP D'AGDE", web="https://www.golfcapdagde.com", email="golf@ville-agde.fr", phone="+33 4 67 26 54 40"
- OSM (low, 1483m, sim=1): name="Golf du Cap d'Agde", web="https://www.golfcapdagde.com", email=null, phone=null

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=0.417)
  - email: from fed(high, sim=0.417)
  - phone: from fed(high, sim=0.417)

### Chateau d'Augerville (France, 1 courses)

- DB: addr="Place du chateau., Augerville la riviere", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.15[coord:110m,city:augerville,db-name-substring,jaccard:0.67], 110m, 45330 AUGERVILLE LA RIVIERE): name="GOLF DU CHATEAU D'AUGERVILLE", web="https://www.chateau-augerville.com", email="golf@chateau-augerville.com", phone="+33 2 38 32 12 07"
- OSM (high, 223m, sim=1): name="Golf du château d’Augerville", web="https://www.chateau-augerville.com/", email="golf@chateau-augerville.com", phone="+33 2 38 32 12 07"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Château des Vigiers (France, 9 courses)

- DB: addr="644 Route Lars Urban Petersson, Monestier", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:229m,city:monestier], 229m, 24240 MONESTIER): name="GOLF DES VIGIERS", web="https://www.vigiers.com", email="golf@vigiers.com", phone="+33 5 53 61 50 33"
- OSM (low, 223m, sim=0.538): name="Golfe des Vigiers", web="https://vigiers.com/fr/golf-bergerac-dordogne.php", email=null, phone=null

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Château Golf des Sept Tours (France, 1 courses)

- DB: addr="-, Courcelles-de-Touraine", web=null, email=null, phone=null
- ffgolf (no-match, sim=0.2, boost=+0.35[jaccard:0.50,typo:château~chateau], 605272m, 13710 FUVEAU): name="CHATEAU L'ARC GOLF CLUB", web="https://www.chateaularcgolfclub.com", email="golf@chateaularcgolfclub.com", phone="+33 4 42 29 83 41"
- OSM (high, 22m, sim=1): name="Golf du Château des Sept Tours", web="https://www.golfchateaudes7tours.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 22m, sim=1)

### Château l’Arc Golf Club (France, 1 courses)

- DB: addr="Lieu dit Château l'Arc Chemin Maurel , Fuveau", web="https://www.chateaularcgolfclub.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:fuveau,jaccard:1.00,typo:château~chateau], 0m, 13710 FUVEAU): name="CHATEAU L'ARC GOLF CLUB", web="https://www.chateaularcgolfclub.com", email="golf@chateaularcgolfclub.com", phone="+33 4 42 29 83 41"
- OSM (high, 250m, sim=1): name="Château l'Arc Golf Club", web="https://www.chateaularcgolfclub.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Club de golf d'Étretat (France, 1 courses)

- DB: addr="Route du Havre, Étretat", web="https://golfetretat.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.9[coord:0m,jaccard:1.00,typo:étretat~etretat], 0m, 76790 ETRETAT): name="GOLF D'ETRETAT", web="https://golfetretat.com", email="contact@golfdetretat.fr", phone="+33 2 35 27 04 89"
- OSM (low, 717m, sim=1): name="Golf d'Étretat", web="https://golfetretat.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### CLUB LA CRINIERE (France, 1 courses)

- DB: addr="LA MANOIR DE LA VILLE GOURIO, Lamballe-Armor", web="https://www.lacriniere.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:lamballe,db-name-substring,jaccard:1.00], 0m, 22400 LAMBALLE): name="CLUB LA CRINIERE", web="https://www.lacriniere.fr", email="la-criniere@orange.fr", phone="+33 2 96 32 72 60"
- OSM (medium, 288m, sim=1): name="Golf de la Crinière", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Coutainville Golf Club (France, 1 courses)

- DB: addr="6 Avenue du Golf, Agon-Coutainville", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:308m,city:agon,jaccard:1.00], 308m, 50230 AGON COUTAINVILLE): name="GOLF DE COUTAINVILLE", web="https://www.golf-coutainville.com", email="accueil@golf-coutainville.com", phone="+33 2 33 47 03 31"
- OSM (low, 583m, sim=1): name="Golf de Coutainville", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Crécy Golf Club (France, 2 courses)

- DB: addr="Route de Guérard, Crécy-la-Chapelle", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:322m,city:chapelle,jaccard:1.00], 322m, 77580 CRECY LA CHAPELLE): name="CRECY GOLF", web="https://www.domainedecrecy.com", email="info@domainedecrecy.com", phone="+33 1 64 75 34 44"
- OSM (high, 54m, sim=1): name="Crécy Golf Club", web="https://www.domainedecrecy.com/", email="info@domainedecrecy.com", phone="+33 1 64 75 34 44"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Daily Golf de St Ouen l'Aumône (France, 1 courses)

- DB: addr="Allée de l'Abbaye, Saint-Ouen-l'Aumône", web="https://jouer.golf/saint-ouen-laumone-daily/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:saint,jaccard:1.00], 0m, 95310 SAINT OUEN L'AUMONE): name="DAILY GOLF DE ST OUEN L'AUMONE", web="https://jouer.golf/saint-ouen-laumone-daily/", email="contact@dailygolf-saintouen.fr", phone="+33 1 34 40 07 87"
- OSM (low, 125m, sim=0.684): name="Golf de Saint-Ouen l'Aumône", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Dinard Golf (France, 1 courses)

- DB: addr="53 Boulevard de la Houle, Saint-Briac-sur-Mer", web="https://www.dinardgolf.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:saint,db-name-substring,jaccard:1.00], 0m, 35800 SAINT BRIAC SUR MER): name="DINARD GOLF", web="https://www.dinardgolf.com", email="dinardgolf@dinardgolf.com", phone="+33 2 99 88 32 07"
- OSM (high, 197m, sim=1): name="Dinard Golf", web="http://dinardgolf.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Domaine du Golf d'Albon (France, 1 courses)

- DB: addr="410 Senaud, Albon", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.75[coord:445m,city:albon,jaccard:0.67], 445m, 26140 ALBON): name="GOLF D'ALBON", web="https://www.golf-albon.com", email="contact@golf-albon.com", phone="+33 4 75 03 03 90"
- OSM (high, 125m, sim=1): name="Golf d'Albon", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Etiolles Country Club (France, 2 courses)

- DB: addr="Rue du Vieux Chemin de Paris, Étiolles", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.4[coord:115m], 115m, 91450 ETIOLLES): name="ETIOLLES GOLF CLUB", web="https://golf.etiolles.com", email="golf@etiolles.com", phone="+33 1 69 89 59 90"
- OSM (low, 483m, sim=0.8): name="Golf d'Étiolles", web="https://golf.etiolles.com/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Evian Resort Golf Club (France, 2 courses)

- DB: addr="Route du Golf, Évian-les-Bains", web="https://golf-club.evianresort.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:bains,db-name-substring,jaccard:1.00], 0m, 74500 EVIAN LES BAINS): name="EVIAN RESORT GOLF CLUB", web="https://golf-club.evianresort.com", email="golf@evianresort.com", phone="+33 4 50 75 46 66"
- OSM (low, 884m, sim=0.714): name="Golf d'Evian", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Exclusiv Golf Béthemont (France, 1 courses)

- DB: addr="12 Rue du Parc de Béthemont, Poissy", web="https://jouer.golf/exclusivgolf-bethemont", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:poissy,jaccard:1.00,typo:béthemont~bethemont], 0m, 78300 POISSY): name="EXCLUSIV GOLF DE BETHEMONT", web="https://jouer.golf/exclusivgolf-bethemont", email="contact@exclusivgolf-bethemont.fr", phone="+33 1 39 08 13 70"
- OSM (low, 89m, sim=0.5): name="Golf de Bethemont", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Exclusiv Golf de Toulouse Seilh (France, 2 courses)

- DB: addr="Route de Grenade, Seilh", web="https://jouer.golf/toulouse-seilh/", email=null, phone=null
- ffgolf (high, sim=0.696, boost=+0.7[coord:0m,city:seilh], 0m, 31840 SEILH): name="UGOLF TOULOUSE SEILH", web="https://jouer.golf/toulouse-seilh/", email="contact.seilh@ugolf.eu", phone="+33 5 62 13 14 14"
- OSM (low, 431m, sim=0.609): name="Golf de Toulouse - Seilh", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.696)
  - phone: from fed(high, sim=0.696)

### Font-Romeu Golf (France, 1 courses)

- DB: addr="Avenue Jean Paul, Font-Romeu-Odeillo-Via", web="https://golfdefontromeu.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:font,jaccard:1.00], 0m, 66120 FONT ROMEU): name="GOLF DE FONT ROMEU", web="https://golfdefontromeu.com", email="golfaltitude@gmail.com", phone="+33 4 68 30 10 78"
- OSM (low, 474m, sim=0.526): name="Golf communal de Font-Romeu", web="https://www.golf-font-romeu.fr/", email="contacts@golfdefontromeu.com", phone="+33 4 68 30 10 78"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Fontainebleau Golf Club (France, 1 courses)

- DB: addr="Route d'Orléans, Fontainebleau", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:754m,city:fontainebleau,jaccard:1.00], 754m, 77300 FONTAINEBLEAU): name="GOLF DE FONTAINEBLEAU", web="https://www.golfdefontainebleau.org", email="accueil@golfdefontainebleau.com", phone="+33 1 64 22 22 95"
- OSM (high, 32m, sim=1): name="Golf de Fontainebleau", web="https://www.golfdefontainebleau.org/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Fregate Provence Golf & Country Club (France, 2 courses)

- DB: addr="Route de Bandol, Saint-Cyr-sur-Mer", web="https://www.lefregateprovence-golfclub.com/", email=null, phone=null
- ffgolf (high, sim=0.842, boost=+0.92[coord:0m,city:saint,jaccard:0.75], 0m, 83270 SAINT CYR SUR MER): name="LE FREGATE PROVENCE GOLF & CC", web="https://www.lefregateprovence-golfclub.com/", email="golf@lefregateprovence.com", phone="+33 4 94 29 38 00"
- OSM (low, 730m, sim=1): name="Golf Frégate Provence", web="https://www.lefregateprovence-golfclub.com", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.842)
  - phone: from fed(high, sim=0.842)

### Garden Golf - Rouen Green Forest (France, 2 courses)

- DB: addr="Route de Tendos, Bosc-Guérard-Saint-Adrien", web=null, email=null, phone=null
- ffgolf (high, sim=0.536, boost=+0.55[coord:770m,city:bosc], 770m, 76710 BOSC GUERARD SAINT ADRIEN): name="GARDENGOLF ROUEN FORET VERTE", web="https://jouer.golf/rouen-la-foret-verte/", email="contact.rouen@ugolf.eu", phone="+33 2 35 33 62 94"
- OSM (no-match, 1122m, sim=0.36): name="Golf de Rouen La Forêt Verte", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.536)
  - email: from fed(high, sim=0.536)
  - phone: from fed(high, sim=0.536)

### Garden Golf Cergy (France, 1 courses)

- DB: addr="2 Allée de l'Obstacle d'Eau, Vauréal", web="http://www.ngf-golf.com/gardengolf-cergy/", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:0m,jaccard:1.00], 0m, 95490 VAUREAL): name="GARDEN GOLF DE CERGY", web="http://www.ngf-golf.com/gardengolf-cergy/", email="contact@gardengolf-cergy.fr", phone="+33 1 34 21 03 48"
- OSM (low, 342m, sim=0.154): name="Golf de Cergy Vauréal", web=null, email=null, phone="+33 1 34 21 03 48"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Garden Golf de Toulouse Téoula (France, 1 courses)

- DB: addr="71 Rue des Landes, Plaisance-du-Touch", web="https://www.jouer.golf/toulouse-teoula/", email=null, phone=null
- ffgolf (high, sim=0.727, boost=+0.7[coord:0m,city:plaisance], 0m, 31830 PLAISANCE DU TOUCH): name="UGOLF TOULOUSE TEOULA", web="https://www.jouer.golf/toulouse-teoula/", email="contact@gardengolf-toulouse-teoula.fr", phone="+33 5 61 91 98 80"
- OSM (low, 238m, sim=0.273): name="Golf de Téoula", web="www.ngf-golf.com/gardengolf-teoula/", email=null, phone="+33 5 61 91 98 80"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.727)
  - phone: from fed(high, sim=0.727)

### Garden Golf Senart (France, 2 courses)

- DB: addr="Route de Villepecle, Saint-Pierre-du-Perray", web="https://www.jouer.golf/senart/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:pierre,jaccard:1.00], 0m, 91280 ST PIERRE DU PERRAY): name="GARDEN GOLF DE SENART", web="https://www.jouer.golf/senart/", email="contact.senart@ugolf.eu", phone="+33 1 60 75 40 60"
- OSM (low, 327m, sim=0.462): name="Golf de Sénart", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Gardengolf de Metz-Technopôle (France, 2 courses)

- DB: addr="3 Rue Félix Savart, Metz", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.05[coord:372m,city:metz,jaccard:1.00,typo:technopôle~technopole], 372m, 57070 METZ): name="GARDENGOLF DE METZ TECHNOPOLE", web="https://jouer.golf/metz/", email="contact.metz@ugolf.eu", phone="+33 3 87 78 71 04"
- OSM (low, 207m, sim=0.577): name="Golf de Metz-Technopôle", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf  Club Barbaroux (France, 1 courses)

- DB: addr="Route de Cabasse, Brignoles", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:383m,city:brignoles,jaccard:1.00], 383m, 83170 BRIGNOLES): name="GOLF DE BARBAROUX", web="https://www.barbaroux.com", email="contact@barbaroux.com", phone="+33 4 94 69 63 63"
- OSM (high, 100m, sim=1): name="Golf de Barbaroux", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf & Country Club de Bossey (France, 1 courses)

- DB: addr="Château de Crevin, Bossey", web="https://www.golfbossey.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:bossey,db-name-substring,jaccard:1.00], 0m, 74160 BOSSEY): name="GOLF & COUNTRY CLUB DE BOSSEY", web="https://www.golfbossey.com", email="gccb@golfbossey.com", phone="+33 4 50 43 95 50"
- OSM (medium, 366m, sim=1): name="Golf & Country Club de Bossey", web="https://www.golfbossey.com/", email=null, phone="+33 4 50 43 95 50"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf & Country Club de Fourqueux (France, 9 courses)

- DB: addr="36 Rue de Saint-Nom, Fourqueux", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.75[coord:416m,city:fourqueux,jaccard:0.67], 416m, 78112 FOURQUEUX): name="GOLF DE FOURQUEUX", web="https://www.golfdefourqueux.com", email="accueil@golfdefourqueux.com", phone="+33 1 34 51 41 47"
- OSM (high, 12m, sim=1): name="Golf de Fourqueux", web="https://www.golfdefourqueux.com", email=null, phone=null

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf & Country Club de Maison Blanche (France, 2 courses)

- DB: addr="2870 Route de Mury, Échenevex", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:130m,jaccard:1.00], 130m, 01170 ECHENEVEX): name="GOLF&COUNTRY DE MAISON BLANCHE", web="https://www.golfmaisonblanche.fr", email="info@golfmaisonblanche.fr", phone="+33 4 50 42 44 42"
- OSM (medium, 268m, sim=1): name="Golf de la Maison Blanche", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Aisses (France, 2 courses)

- DB: addr="-, La Ferté-Saint-Aubin", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:291m,city:saint,jaccard:1.00], 291m, 45240 LA FERTE SAINT-AUBIN): name="LES AISSES GOLF", web="https://www.aissesgolf.com", email="lesaisses@aissesgolf.com", phone="+33 2 38 64 80 87"
- OSM (high, 86m, sim=1): name="Golf des Aisses", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Auch Embats (France, 1 courses)

- DB: addr="Au , Auch", web="https://www.golf-auch-embats.com", email=null, phone=null
- ffgolf (high, sim=0.846, boost=+1[coord:0m,city:auch,jaccard:1.00], 0m, 32000 AUCH): name="GOLF D'AUCH-EMBATS", web="https://www.golf-auch-embats.com", email="asgolfauch@gmail.com", phone="+33 5 62 61 10 11"
- OSM (high, 122m, sim=0.846): name="Golf d'Auch- Embats", web="https://www.asgolfauch.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.846)
  - phone: from fed(high, sim=0.846)

### Golf Barrière de Deauville (France, 2 courses)

- DB: addr="-, Deauville", web="https://www.golfbarriere-deauville.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:deauville,jaccard:1.00,typo:barrière~barriere], 0m, 14800 DEAUVILLE): name="GOLF BARRIERE DEAUVILLE", web="https://www.golfbarriere-deauville.com", email="accueil-golfdeauville@groupebarriere.com", phone="+33 2 31 14 24 24"
- OSM (high, 244m, sim=1): name="Golf Barrière Deauville", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Barthe (France, 1 courses)

- DB: addr="Route de Villeneuve,, Tombebœuf", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.55[coord:505m,jaccard:1.00], 505m, 47380 TOMBEBOEUF): name="GOLF DE BARTHE", web="https://www.golfdebarthe.com", email="samantha@golfdebarthe.com", phone="+33 5 53 88 83 31"
- OSM (high, 71m, sim=1): name="Golf de Barthe", web="https://www.golfdebarthe.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Bastide de La Salette (France, 1 courses)

- DB: addr="65 Impasse des Vaudrans, Marseille", web="https://www.bastidedelasalette.com/fr/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:marseille,db-name-substring,jaccard:1.00], 0m, 13011 MARSEILLE): name="GOLF BASTIDE DE LA SALETTE", web="https://www.bastidedelasalette.com/fr/", email="bastidedelasalette@resonance.golf", phone="+33 4 91 27 12 16"
- OSM (low, 714m, sim=0.706): name="Golf de Marseille la Salette", web="https://www.golfmarseillesalette.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Bégard (France, 1 courses)

- DB: addr="Route de Prat, Bégard", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:120m,jaccard:1.00], 120m, 22140 BEGARD): name="GOLF DE BEGARD", web="https://asgolfbegard22.wixsite.com/asgolfbegard", email="gaetane@golfdebegard.fr", phone="+33 2 96 45 32 64"
- OSM (high, 19m, sim=1): name="Golf de Bégard", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Bellême Saint Martin (France, 1 courses)

- DB: addr="Les Sablons, Bellême", web="https://www.golfdebelleme.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.9[coord:0m,jaccard:1.00,typo:bellême~belleme], 0m, 61130 BELLEME): name="GOLF DE BELLEME SAINT MARTIN", web="https://www.golfdebelleme.com", email="contact@golfdebelleme.com", phone="+33 2 33 73 12 79"
- OSM (low, 269m, sim=0.5): name="Golf de Bellême", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Beziers Saint Thomas (France, 1 courses)

- DB: addr="Route de Bessan, Béziers", web="http://www.golfsaintthomas.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 34500 BEZIERS): name="GOLF BEZIERS SAINT THOMAS", web="http://www.golfsaintthomas.com", email="info@golfsaintthomas.com", phone="+33 4 67 39 03 09"
- OSM (low, 7250m, sim=1): name="Golf de Béziers Saint-Thomas", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Biscarrosse (France, 2 courses)

- DB: addr="400 Avenue du Golf, Biscarrosse", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:507m,city:biscarrosse,jaccard:1.00], 507m, 40600 BISCARROSSE): name="GOLF DE BISCARROSSE", web="http://www.biscarrossegolf.com", email="golfdebiscarrosse@wanadoo.fr", phone="+33 5 58 09 84 93"
- OSM (low, 903m, sim=1): name="Golf de Biscarrosse", web="https://jouer.golf/golf/ugolf-biscarosse", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Blue Green Bordeaux Lac (France, 2 courses)

- DB: addr="Avenue de Pernon, Bordeaux", web="https://bluegreen.fr/bordeaux-lac", email=null, phone=null
- ffgolf (high, sim=0.957, boost=+0.7[coord:0m,city:bordeaux], 0m, 33300 BORDEAUX): name="GOLF BLUEGREEN BORDEAUX LAC", web="https://bluegreen.fr/bordeaux-lac", email="bordeaux.lac@bluegreen.fr", phone="+33 5 56 50 92 72"
- OSM (medium, 314m, sim=1): name="Golf Blue Green Bordeaux Lac", web="www.bluegreen.com/bordeaux", email=null, phone="+33 5 56 50 92 72"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.957)
  - phone: from fed(high, sim=0.957)

### Golf Blue Green Croisic (France, 1 courses)

- DB: addr="Chemin de Port-aux-Rocs, Le Croisic", web="https://bluegreen.fr", email=null, phone=null
- ffgolf (high, sim=0.944, boost=+0.55[coord:722m,city:croisic], 722m, 44490 LE CROISIC): name="GOLF BLUEGREEN LE CROISIC", web="https://bluegreen.fr/croisic", email="lecroisic@bluegreen.fr", phone="+33 2 40 23 14 60"
- OSM (low, 323m, sim=0.389): name="Golf du Croisic", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.944)
  - phone: from fed(high, sim=0.944)

### Golf Blue Green Grand Lyon Chassieu (France, 2 courses)

- DB: addr="Route de Lyon, Chassieu", web="https://bluegreen.fr/chassieu", email=null, phone=null
- ffgolf (high, sim=0.967, boost=+0.85[coord:0m,city:chassieu,jaccard:0.50], 0m, 69680 CHASSIEU): name="GOLF BLUEGREEN GRAND LYON CHASSIEU", web="https://bluegreen.fr/chassieu", email="lyon.chassieu@bluegreen.fr", phone="+33 4 78 90 84 77"
- OSM (low, 320m, sim=0.267): name="Golf de Chassieu", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.967)
  - phone: from fed(high, sim=0.967)

### Golf Blue Green Grand Rodez (France, 1 courses)

- DB: addr="Avenue de Vabre, Onet-le-Château", web="https://bluegreen.fr", email=null, phone=null
- ffgolf (high, sim=0.414, boost=+0.55[coord:419m,city:onet], 419m, 12850 ONET LE CHATEAU): name="BLUEGREEN GOLF DE RODEZ AGGLOMERATION", web="https://bluegreen.fr/rodez", email="rodez@bluegreen.fr", phone="+33 5 65 78 38 00"
- OSM (low, 165m, sim=0.5): name="Golf du Grand Rodez", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.414)
  - phone: from fed(high, sim=0.414)

### Golf Blue Green Guerville (France, 1 courses)

- DB: addr="Rue des Mauduits, Guerville", web="https://bluegreen.fr", email=null, phone=null
- ffgolf (high, sim=0.95, boost=+0.55[coord:285m,city:guerville], 285m, 78930 GUERVILLE): name="GOLF BLUEGREEN GUERVILLE", web="https://bluegreen.fr/guerville", email="guerville@bluegreen.fr", phone="+33 1 30 92 45 45"
- OSM (low, 663m, sim=0.45): name="Golf de Guerville", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.95)
  - phone: from fed(high, sim=0.95)

### Golf Blue Green Gujan (France, 3 courses)

- DB: addr="Route des Lacs, Gujan-Mestras", web="https://bluegreen.fr", email=null, phone=null
- ffgolf (high, sim=0.609, boost=+0.75[coord:886m,city:gujan,name-token:mestras], 886m, 33470 GUJAN MESTRAS): name="GOLF BLUEGREEN GUJAN-MESTRAS", web="https://bluegreen.fr/gujan", email="gujan@bluegreen.fr", phone="+33 5 57 52 73 73"
- OSM (no-match, 1046m, sim=0.313): name="Golf de Gujan", web="www.bluegreen.com/gujan", email=null, phone="+33 5 57 52 73 73"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=0.609)
  - phone: from fed(high, sim=0.609)

### Golf Blue Green Houlgate (France, 1 courses)

- DB: addr="D24, Gonneville-sur-Mer", web="https://bluegreen.fr", email=null, phone=null
- ffgolf (high, sim=0.947, boost=+0.4[coord:1470m,city:gonneville], 1470m, 14510 GONNEVILLE-SUR-MER): name="GOLF BLUEGREEN HOULGATE", web="https://bluegreen.fr/houlgate", email="houlgate@bluegreen.fr", phone="+33 2 31 24 80 49"
- OSM (no-match, 1417m, sim=0.316): name="Clubhouse", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.947)
  - phone: from fed(high, sim=0.947)

### Golf Blue Green Marolles-en-Brie (France, 1 courses)

- DB: addr="Mail de la Justice, Marolles-en-Brie", web="https://bluegreen.fr/marolles", email=null, phone=null
- ffgolf (high, sim=0.963, boost=+0.85[coord:0m,city:marolles,jaccard:0.50], 0m, 94440 MAROLLES EN BRIE): name="GOLF BLUEGREEN MAROLLES EN BRIE", web="https://bluegreen.fr/marolles", email="marolles.en.brie@bluegreen.fr", phone="+33 1 45 95 18 18"
- OSM (low, 336m, sim=0.296): name="Golf de Marolles", web="https://bluegreen.fr/marolles/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.963)
  - phone: from fed(high, sim=0.963)

### Golf Blue Green Pau Artiguelouve (France, 1 courses)

- DB: addr="Domaine de Saint-Michel, Artiguelouve", web="https://bluegreen.fr/pau", email=null, phone=null
- ffgolf (high, sim=0.963, boost=+0.7[coord:0m,city:artiguelouve], 0m, 64230 ARTIGUELOUVE): name="GOLF BLUEGREEN PAU ARTIGUELOUVE", web="https://bluegreen.fr/pau", email="pau@bluegreen.fr", phone="+33 5 59 83 09 29"
- OSM (no-match, 1327m, sim=0.593): name="Golf de Pau-Artiguelouve", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.963)
  - phone: from fed(high, sim=0.963)

### Golf Blue Green Pleneuf-Val-Andre (France, 1 courses)

- DB: addr="Rue de la Plage des Vallées, Pléneuf-Val-André", web="https://bluegreen.fr/pleneuf", email=null, phone=null
- ffgolf (high, sim=0.964, boost=+0.55[coord:0m,jaccard:0.50], 0m, 22370 PLENEUF VAL ANDRE): name="GOLF BLUEGREEN PLENEUF VAL ANDRE", web="https://bluegreen.fr/pleneuf", email="pleneuf.val.andre@bluegreen.fr", phone="+33 2 96 63 01 12"
- OSM (low, 361m, sim=0.607): name="Golf de Pléneuf Val André", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.964)
  - phone: from fed(high, sim=0.964)

### Golf Blue Green Pornic (France, 1 courses)

- DB: addr="Avenue de Scalby Newby, Pornic", web="https://bluegreen.fr", email=null, phone=null
- ffgolf (high, sim=0.353, boost=+0.85[coord:168m,city:pornic,jaccard:0.50], 168m, 44210 PORNIC): name="GOLF DE PORNIC", web="http://www.golfdepornic.fr", email="contact@golfdepornic.fr", phone="+33 2 40 82 06 69"
- OSM (low, 327m, sim=0.353): name="Golf de Pornic", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.353)
  - phone: from fed(high, sim=0.353)

### Golf Blue Green Quetigny Grand Dijon (France, 1 courses)

- DB: addr="Rue du Golf, Quetigny", web="https://bluegreen.fr/quetigny", email=null, phone=null
- ffgolf (high, sim=0.968, boost=+0.85[coord:0m,city:quetigny,jaccard:0.50], 0m, 21800 QUETIGNY): name="GOLF BLUEGREEN QUETIGNY GRAND DIJON", web="https://bluegreen.fr/quetigny", email="quetigny@bluegreen.fr", phone="+33 3 80 48 95 20"
- OSM (low, 109m, sim=0.581): name="Golf Bluegreen Quétigny", web="https://bluegreen.fr/quetigny/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.968)
  - phone: from fed(high, sim=0.968)

### Golf Blue Green Rueil Malmaison (France, 1 courses)

- DB: addr="25 Boulevard Marcel Pourtout, Rueil-Malmaison", web="https://bluegreen.fr/rueil", email=null, phone=null
- ffgolf (high, sim=0.962, boost=+0.85[coord:0m,city:rueil,jaccard:0.50], 0m, 92500 RUEIL-MALMAISON): name="GOLF BLUEGREEN RUEIL MALMAISON", web="https://bluegreen.fr/rueil", email="rueil@bluegreen.fr", phone="+33 1 47 49 64 67"
- OSM (medium, 326m, sim=0.962): name="Golf Bluegreen Rueil-Malmaison", web="https://bluegreen.fr/rueil/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.962)
  - phone: from fed(high, sim=0.962)

### Golf Blue Green Sainte-Maxime (France, 1 courses)

- DB: addr="Avenue du Débarquement, Sainte-Maxime", web="https://bluegreen.fr", email=null, phone=null
- ffgolf (high, sim=0.941, boost=+0.55[coord:344m,city:sainte], 344m, 83120 SAINTE MAXIME): name="GOLF BLUEGREEN SAINTE MAXIME", web="https://bluegreen.fr/sainte-maxime", email="ste.maxime@bluegreen.fr", phone="+33 4 94 55 02 02"
- OSM (low, 91m, sim=0.353): name="Golf de Sainte-Maxime", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.941)
  - phone: from fed(high, sim=0.941)

### Golf Blue Green Savenay (France, 3 courses)

- DB: addr="Le Chambeau, Savenay", web="https://bluegreen.fr", email=null, phone=null
- ffgolf (high, sim=0.944, boost=+0.55[coord:504m,city:savenay], 504m, 44260 SAVENAY): name="GOLF BLUEGREEN SAVENAY", web="https://bluegreen.fr/savenay", email="savenay@bluegreen.fr", phone="+33 2 40 56 88 05"
- OSM (low, 543m, sim=0.389): name="Golf de Savenay", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=0.944)
  - phone: from fed(high, sim=0.944)

### Golf Blue Green Seyssins Grenoble (France, 1 courses)

- DB: addr="29 Avenue Louis Vicat, Seyssins", web="https://bluegreen.fr/seyssins", email=null, phone=null
- ffgolf (high, sim=0.393, boost=+0.85[coord:0m,city:seyssins,jaccard:0.50], 0m, 38180 SEYSSINS): name="GOLF BLUEGREEN GRENOBLE SEYSSINS", web="https://bluegreen.fr/seyssins", email="seyssins@bluegreen.fr", phone="+33 4 76 70 12 63"
- OSM (low, 462m, sim=0.286): name="Golf de Seyssins", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.393)
  - phone: from fed(high, sim=0.393)

### Golf Blue Green Villennes-sur-Seine (France, 1 courses)

- DB: addr="Route d'Orgeval, Villennes-sur-Seine", web="https://bluegreen.fr/villennes", email=null, phone=null
- ffgolf (high, sim=0.967, boost=+0.85[coord:0m,city:villennes,jaccard:0.50], 0m, 78670 VILLENNES SUR SEINE): name="GOLF BLUEGREEN VILLENNES SUR SEINE", web="https://bluegreen.fr/villennes", email="villennes@bluegreen.fr", phone="+33 1 39 08 18 18"
- OSM (low, 70m, sim=0.3): name="Golf de Villennes", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.967)
  - phone: from fed(high, sim=0.967)

### Golf Bluegreen du Pays de Saint Gilles Croix de Vi (France, 1 courses)

- DB: addr="Route de Coex, L'Aiguillon-sur-Vie", web="https://bluegreen.fr/saint-gilles", email=null, phone=null
- ffgolf (high, sim=0.833, boost=+0.94[coord:0m,city:aiguillon,jaccard:0.80], 0m, 85220 L'AIGUILLON SUR VIE): name="GOLF BLUEGREEN PAYS SAINT GILLES X VIE", web="https://bluegreen.fr/saint-gilles", email="psgcv@bluegreen.fr", phone="+33 2 51 54 13 94"
- OSM (medium, 306m, sim=0.968): name="Golf Bluegreen du Pays de Saint-Gilles-Croix-de-Vie", web="https://bluegreen.fr/saint-gilles", email="psgcv@bluegreen.fr", phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.833)
  - phone: from fed(high, sim=0.833)

### Golf Bluegreen Grenoble-Bresson (France, 1 courses)

- DB: addr="Chemin de Montavit, Bresson", web="https://bluegreen.fr/bresson/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:bresson,db-name-substring,jaccard:1.00], 0m, 38320 BRESSON): name="GOLF BLUEGREEN GRENOBLE-BRESSON", web="https://bluegreen.fr/bresson/", email="bresson@bluegreen.fr", phone="+33 4 76 54 19 49"
- OSM (low, 372m, sim=0.269): name="Golf International de Grenoble", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Bluegreen l'Ailette (France, 2 courses)

- DB: addr="Golf de l'Ailette, Cerny-en-Laonnois", web="https://bluegreen.fr", email=null, phone=null
- ffgolf (high, sim=0.474, boost=+0.75[coord:375m,city:cerny,jaccard:0.67], 375m, 02860 CERNY EN LAONNOIS): name="GOLF DE L'AILETTE", web="https://bluegreen.fr/ailette", email="ailette@bluegreen.fr", phone="+33 3 23 24 83 99"
- OSM (low, 429m, sim=0.474): name="Golf de l'Ailette", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.474)
  - phone: from fed(high, sim=0.474)

### Golf Bluegreen Lac Au Duc Ploërmel, Morbihan (France, 1 courses)

- DB: addr="-, Ploërmel", web="https://bluegreen.fr/lac-au-duc", email=null, phone=null
- ffgolf (high, sim=0.743, boost=+0.82[coord:0m,jaccard:0.75,typo:ploërmel~ploermel], 0m, 56800 PLOERMEL): name="GOLF BLUEGREEN LAC AU DUC PLOERMEL", web="https://bluegreen.fr/lac-au-duc", email="ploermel@bluegreen.fr", phone="+33 2 97 72 37 20"
- OSM (low, 671m, sim=0.743): name="Golf Bluegreen Lac au Duc Ploërmel", web="https://www.bluegreen.fr/lac-au-duc/", email="ploermel@bluegreen.fr", phone="+33 297723720"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.743)
  - phone: from fed(high, sim=0.743)

### Golf Bluegreen Lacanau - La Méjanne (France, 1 courses)

- DB: addr="Route de l'Atlantique, Lacanau", web="https://bluegreen.fr/lacanau", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:lacanau,jaccard:1.00,typo:méjanne~mejanne], 0m, 33680 LACANAU OCEAN): name="GOLF BLUEGREEN LACANAU - LA MEJANNE", web="https://bluegreen.fr/lacanau", email="mejanne@bluegreen.fr", phone="+33 5 56 03 28 80"
- OSM (low, 1199m, sim=1): name="Golf Bluegreen Lacanau-La-Méjanne", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Bluegreen Lacanau - La Méjanne - Gironde (France, 1 courses)

- DB: addr="Route de l'Atlantique, Lacanau", web="https://bluegreen.fr/lacanau", email=null, phone=null
- ffgolf (high, sim=0.758, boost=+1.14[coord:0m,city:lacanau,jaccard:0.80,typo:méjanne~mejanne], 0m, 33680 LACANAU OCEAN): name="GOLF BLUEGREEN LACANAU - LA MEJANNE", web="https://bluegreen.fr/lacanau", email="mejanne@bluegreen.fr", phone="+33 5 56 03 28 80"
- OSM (low, 482m, sim=0.303): name="UGOLF Lacanau", web="https://jouer.golf/golf/ugolf-lacanau/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.758)
  - phone: from fed(high, sim=0.758)

### Golf Bluegreen Mazières-en-Gâtine (France, 1 courses)

- DB: addr="Le Petit Chêne, Mazières-en-Gâtine", web="https://bluegreen.fr/mazieres", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.9[coord:0m,jaccard:1.00,typo:mazières~mazieres], 0m, 79310 MAZIERES EN GATINE): name="GOLF BLUEGREEN MAZIERES EN GATINE", web="https://bluegreen.fr/mazieres", email="mazieres@bluegreen.fr", phone="+33 5 49 63 20 95"
- OSM (medium, 259m, sim=1): name="Golf Bluegreen Mazières-en-Gâtine", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Bluegreen Nantes-Erdre (France, 1 courses)

- DB: addr="Avenue du Bout des Landes, Nantes", web="https://bluegreen.fr/nantes-erdre/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:nantes,jaccard:1.00], 0m, 44300 NANTES): name="GOLF BLUEGREEN NANTES ERDRE", web="https://bluegreen.fr/nantes-erdre/", email="nantes.erdre@bluegreen.fr", phone="+33 2 40 59 21 21"
- OSM (low, 329m, sim=0.545): name="Golf de Nantes - Erdre", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Bluegreen Niort (France, 1 courses)

- DB: addr="Chemin du Grand Ormeau, Niort", web="https://bluegreen.fr/niort", email=null, phone=null
- ffgolf (high, sim=0.652, boost=+1.17[coord:0m,city:niort,db-name-substring,jaccard:0.75], 0m, 79000 NIORT): name="GOLF BLUEGREEN NIORT ROMAGNE", web="https://bluegreen.fr/niort", email="niort@bluegreen.fr", phone="+33 5 49 04 64 48"
- OSM (low, 347m, sim=0.652): name="Golf Bluegreen Niort-Romagné", web="https://bluegreen.fr/niort/", email=null, phone="+33 5 49 04 64 48"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.652)
  - phone: from fed(high, sim=0.652)

### Golf Bluegreen Rennes/Saint-Jacques (France, 3 courses)

- DB: addr="Temple du Cerisier, Saint-Jacques-de-la-Lande", web="https://bluegreen.fr/rennes", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:saint,jaccard:1.00], 0m, 35136 SAINT JACQUES DE LA LANDE): name="GOLF BLUEGREEN RENNES ST JACQUES", web="https://bluegreen.fr/rennes", email="rennes@bluegreen.fr", phone="+33 2 99 30 18 18"
- OSM (low, 398m, sim=0.583): name="Golf de Rennes Saint-Jacques", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Bluegreen Rhuys Kerver (France, 1 courses)

- DB: addr="Lieu-dit Kerver, Saint-Gildas-de-Rhuys", web="https://bluegreen.fr/rhuys", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:saint,db-name-substring,jaccard:1.00], 0m, 56730 SAINT GILDAS DE RHUYS): name="GOLF BLUEGREEN RHUYS KERVER", web="https://bluegreen.fr/rhuys", email="rhuyskerver@bluegreen.fr", phone="+33 2 97 45 30 09"
- OSM (low, 521m, sim=0.545): name="Golf de Rhuys Kerver", web="https://bluegreen.fr/rhuys/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Bluegreen Saint-Quentin-en-Yvelines (France, 3 courses)

- DB: addr="route départementale 912, Trappes", web="https://bluegreen.fr/saint-quentin", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.92[coord:0m,city:trappes,jaccard:0.75], 0m, 78190 TRAPPES): name="BLUEGREEN SAINT QUENTIN EN YVELINES", web="https://bluegreen.fr/saint-quentin", email="st.quentin@bluegreen.fr", phone="+33 1 30 50 86 40"
- OSM (low, 694m, sim=0.655): name="Golf de Saint-Quentin en Yvelines", web="https://bluegreen.fr/saint-quentin/", email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Bluegreen Tours-Ardrée (France, 1 courses)

- DB: addr="Le Gué des Prés, Saint-Antoine-du-Rocher", web="https://bluegreen.fr/tours-ardree/", email=null, phone=null
- ffgolf (no-match, sim=0.5, boost=+0.5[city:saint,name-token:saint], 176295m, 91190 SAINT AUBIN): name="GOLF BLUEGREEN SAINT AUBIN", web="https://bluegreen.fr/saint-aubin", email="st.aubin@bluegreen.fr", phone="+33 1 69 41 25 19"
- OSM (high, 108m, sim=1): name="Golf Bluegreen Tours Ardrée", web="https://www.bluegreen.fr/tours-ardree/", email="tours.ardree@bluegreen.fr", phone="+33 247567738"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from osm(high, 108m, sim=1)
  - phone: from osm(high, 108m, sim=1)

### Golf Bluegreen Val Queven (France, 1 courses)

- DB: addr="5 Allée de Kerrousseau, Quéven", web="https://bluegreen.fr/val-queven", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 56530 QUEVEN): name="GOLF BLUEGREEN VAL QUEVEN", web="https://bluegreen.fr/val-queven", email="valqueven@bluegreen.fr", phone="+33 2 97 05 17 96"
- OSM (low, 762m, sim=0.5): name="Golf de Val Queven", web="https://bluegreen.fr/val-queven/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Bordelais (France, 1 courses)

- DB: addr="9 Allée Arago, Bordeaux", web="https://www.golf-bordelais.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:bordeaux,db-name-substring,jaccard:1.00], 0m, 33200 BORDEAUX): name="GOLF BORDELAIS", web="https://www.golf-bordelais.fr", email="secretariat@golf-bordelais.fr", phone="+33 5 56 28 56 04"
- OSM (high, 225m, sim=1): name="Golf Bordelais", web="https://www.golf-bordelais.fr/", email=null, phone="+33 5 56 28 56 04"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Bréhal (France, 1 courses)

- DB: addr="3 Rue du Golf, Bréhal", web=null, email=null, phone=null
- ffgolf (high, sim=0.375, boost=+0.6[coord:228m,jaccard:0.67], 228m, 50290 BREHAL): name="GOLF MUNICIPAL DE BREHAL", web="https://www.golf-de-brehal.com", email="golfdebrehal@golf-de-brehal.com", phone="+33 2 33 51 58 88"
- OSM (high, 17m, sim=1): name="Golf de Bréhal", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.375)
  - email: from fed(high, sim=0.375)
  - phone: from fed(high, sim=0.375)

### Golf Brest Iroise (France, 1 courses)

- DB: addr="Parc de Lann Rohou, Saint-Urbain", web="https://www.assogolfbrestiroise.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:0m,jaccard:1.00], 0m, 29800 LANDERNEAU): name="GOLF DE BREST IROISE", web="https://www.assogolfbrestiroise.fr", email="asso.golfbrestiroise@gmail.com", phone=null
- OSM (medium, 392m, sim=1): name="Golf de Brest Iroise", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)

### Golf Brigode (France, 1 courses)

- DB: addr="36 Avenue du Golf, Villeneuve-d'Ascq", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:7m,city:villeneuve,jaccard:1.00], 7m, 59650 VILLENEUVE D'ASCQ): name="GOLF DE BRIGODE", web="https://www.golfbrigode.com", email="contact@golfbrigode.com", phone="+33 3 20 91 17 86"
- OSM (high, 86m, sim=1): name="Golf de Brigode", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Caen-Garcelles (France, 2 courses)

- DB: addr="Route de Lorguichon, Le Castelet", web="https://www.golfdecaengarcelles.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:castelet,jaccard:1.00], 0m, 14540 LE CASTELET): name="GOLF DE CAEN GARCELLES", web="https://www.golfdecaengarcelles.com", email="garcelles@golfdegarcelles.com", phone="+33 2 31 39 09 09"
- OSM (low, 303m, sim=0.643): name="Golf de Garcelles", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Cap Malo (France, 1 courses)

- DB: addr="Avenue du Phare du Grand Jardin, Melesse", web="https://www.le-golf-cap-malo.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:melesse,jaccard:1.00], 0m, 35520 MELESSE): name="CAP MALO LE GOLF", web="https://www.le-golf-cap-malo.com", email="contact@golfcapmalo.fr", phone="+33 2 99 13 10 10"
- OSM (low, 690m, sim=1): name="Golf Cap Malo", web="https://www.le-golf-cap-malo.com", email=null, phone="+33 2 99 13 10 10"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Casteljaloux (France, 1 courses)

- DB: addr="Route de Mont de Marsan, Casteljaloux", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:307m,city:casteljaloux,jaccard:1.00], 307m, 47700 CASTELJALOUX): name="GOLF DE CASTELJALOUX", web="https://www.golfdecasteljaloux.com", email="contact@golfdecasteljaloux.fr", phone="+33 5 53 93 51 60"
- OSM (high, 81m, sim=1): name="Golf de Casteljaloux", web="https://www.golfdecasteljaloux.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Center Parcs Bois Francs (France, 1 courses)

- DB: addr="Rue des Bois Francs, Verneuil d'Avre et d'Iton", web="https://www.centerparcs.fr/fr-fr/sejour-golf_ms", email=null, phone=null
- ffgolf (high, sim=0.5, boost=+0.88[coord:0m,city:verneuil,jaccard:0.60], 0m, 27130 VERNEUIL SUR AVRE): name="GOLF CENTER PARCS", web="https://www.centerparcs.fr/fr-fr/sejour-golf_ms", email="golf.bf@groupepvcp.com", phone="+33 2 32 60 50 02"
- OSM (low, 188m, sim=0.458): name="Golf des Bois-Francs", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Golf Centre Manche (France, 1 courses)

- DB: addr="Le Haut Boscq, Saint-Martin-d'Aubigny", web="https://golfcentremanche.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 50190 MARCHESIEUX): name="GOLF CENTRE MANCHE", web="https://golfcentremanche.com", email="contact@golfcentremanche.com", phone="+33 2 33 45 24 52"
- OSM (medium, 448m, sim=1): name="Golf Centre Manche", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Chalon-sur-Saône la Roseraie (France, 1 courses)

- DB: addr="-, Châtenoy-en-Bresse", web="http://www.golfchalon.com", email=null, phone=null
- ffgolf (high, sim=0.84, boost=+1[coord:0m,city:bresse,jaccard:1.00], 0m, 71380 CHATENOY EN BRESSE): name="GOLF CHALON/SAONE LA ROSERAIE", web="http://www.golfchalon.com", email="contact@golfchalon.com", phone="+33 3 85 93 49 65"
- OSM (low, 630m, sim=0.6): name="Golf de Chalon La Roseraie", web="http://www.golfchalon.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.84)
  - phone: from fed(high, sim=0.84)

### Golf Chantaco (France, 1 courses)

- DB: addr="550 Route d'Ascain, Saint-Jean-de-Luz", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:359m,city:saint,jaccard:1.00], 359m, 64500 SAINT JEAN DE LUZ): name="GOLF DE CHANTACO", web="https://www.chantaco.com", email="contact@chantaco.com", phone="+33 5 59 26 14 22"
- OSM (high, 181m, sim=1): name="Golf de Chantaco", web="https://www.chantaco.com/", email="contact@chantaco.com", phone="+33 5 59 26 14 22"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Chartres-Fontenay (France, 2 courses)

- DB: addr="480 Chemin du Golf, Fontenay-sur-Eure", web="https://www.golf-chartres.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:fontenay,jaccard:1.00], 0m, 28630 FONTENAY SUR EURE): name="GOLF DE CHARTRES FONTENAY", web="https://www.golf-chartres.com", email="contact@golf-chartres.com", phone="+33 2 37 30 78 98"
- OSM (low, 335m, sim=0.471): name="Golf de Fontenay", web="https://www.golf-chartres.com", email="contact@golf-chartres.com", phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Château de Bournel (France, 1 courses)

- DB: addr="-, Cubry", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.05[coord:630m,city:cubry,jaccard:1.00,typo:château~chateau], 630m, 25680 CUBRY): name="GOLF DU CHATEAU DE BOURNEL", web="https://www.domainedebournel.com", email="contact@domainedebournel.com", phone="+33 3 81 86 00 10"
- OSM (low, 523m, sim=1): name="Golf du Château de Bournel", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Chaumont-en-Vexin (France, 1 courses)

- DB: addr="1 Bertichères, Chaumont-en-Vexin", web="http://www.golf-de-chaumont.com", email=null, phone=null
- ffgolf (high, sim=0.85, boost=+1[coord:0m,city:chaumont,jaccard:1.00], 0m, 60240 CHAUMONT-EN-VEXIN): name="GOLF CC DE CHAUMONT-EN-VEXIN", web="http://www.golf-de-chaumont.com", email="infos@golf-de-chaumont.com", phone="+33 3 44 49 00 81"
- OSM (low, 729m, sim=1): name="Golf Country-Club de Chaumont-en-Vexin", web="http://www.golf-de-chaumont.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.85)
  - phone: from fed(high, sim=0.85)

### Golf Club Agen Bon-Encontre (France, 1 courses)

- DB: addr="Lieu-Dit Barré PARADOU, Bon-Encontre", web="http://www.agen-golf.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:encontre,jaccard:1.00], 0m, 47240 BON ENCONTRE): name="GOLF AGEN BON ENCONTRE", web="http://www.agen-golf.com", email="golfagen1983@gmail.com", phone="+33 6 18 78 86 50"
- OSM (high, 184m, sim=0.895): name="Golf d'Agen Bon Encontre", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club Aigueleze (France, 1 courses)

- DB: addr="-, Rivières", web=null, email=null, phone=null
- ffgolf (high, sim=0.818, boost=+0.7[coord:217m,jaccard:1.00], 217m, 81600 RIVIERES): name="GOLF CLUB D'AIGUELEZE", web="http://www.golfaigueleze.com/site/index.php", email="accueil@golfaigueleze.com", phone="+33 5 63 33 08 93"
- OSM (high, 43m, sim=0.818): name="Le Golf d'Aiguelèze", web="http://www.golfaigueleze.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.818)
  - email: from fed(high, sim=0.818)
  - phone: from fed(high, sim=0.818)

### Golf Club Ales Ribaute (France, 1 courses)

- DB: addr="Puech Serrier, Chemin du golf, Ribaute-les-Tavernes", web="https://alesribaute.golf", email=null, phone=null
- ffgolf (high, sim=0.857, boost=+1[coord:0m,city:ribaute,jaccard:1.00], 0m, 30720 RIBAUTE LES TAVERNES): name="GOLF CLUB D'ALES RIBAUTE", web="https://alesribaute.golf", email="news@alesribaute.golf", phone="+33 6 08 24 24 10"
- OSM (high, 37m, sim=1): name="Golf Alès-Ribaute", web="https://alesribaute.golf", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.857)
  - phone: from fed(high, sim=0.857)

### Golf Club Avoriaz (France, 1 courses)

- DB: addr="Le Proclou, Morzine", web="http://bit.ly/golfavoriazmorzine", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 74110 AVORIAZ): name="GOLF CLUB AVORIAZ", web="http://bit.ly/golfavoriazmorzine", email="golf@avoriaz.com", phone="+33 4 50 74 24 39"
- OSM (medium, 378m, sim=1): name="Golf Club Avoriaz", web="https://www.golf-morzine-avoriaz.com/", email="golfavoriaz@orange.fr", phone="+33 4 50 74 17 08"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club D'amiens (France, 2 courses)

- DB: addr="RD 929, Querrieu", web="https://www.golfamiens.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:querrieu,db-name-substring,jaccard:1.00], 0m, 80115 QUERRIEU): name="GOLF CLUB D'AMIENS", web="https://www.golfamiens.fr", email="contact@golfamiens.fr", phone="+33 3 22 93 04 26"
- OSM (high, 224m, sim=1): name="Golf Club d'Amiens", web="http://www.golfamiens.fr/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club D'espalais (France, 1 courses)

- DB: addr="524 CHEMIN DE SAINTE FOIX, Espalais", web=null, email=null, phone=null
- ffgolf (high, sim=0.8, boost=+1[coord:112m,city:espalais,jaccard:1.00], 112m, 82400 ESPALAIS): name="GOLF CLUB ESPALAIS", web="https://www.golfespalais.com", email="golf.espalais@gmail.com", phone="+33 5 63 29 04 56"
- OSM (high, 119m, sim=0.8): name="Golf Club Espalais", web="https://www.golfespalais.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.8)
  - email: from fed(high, sim=0.8)
  - phone: from fed(high, sim=0.8)

### Golf Club d'Uriage (France, 1 courses)

- DB: addr="Les alberges, VAULNAVEYS LE HAUT", web="https://www.golfduriage.com", email=null, phone=null
- ffgolf (high, sim=0.75, boost=+1[coord:0m,city:vaulnaveys,jaccard:1.00], 0m, 38410 VAULNAVEYS LE HAUT): name="GOLF URIAGE", web="https://www.golfduriage.com", email="direction@golfduriage.com", phone="+33 9 62 50 47 89"
- OSM (low, 138m, sim=0.467): name="Golf de Grenoble-Uriage", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.75)
  - phone: from fed(high, sim=0.75)

### Golf Club d'Uzes (France, 1 courses)

- DB: addr="1200 Pont des Charrettes, Uzès", web="https://www.golfuzes.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 30700 UZES): name="GOLF CLUB D'UZES", web="https://www.golfuzes.fr", email="info@golfuzes.fr", phone="+33 6 28 35 69 48"
- OSM (no-match, 678674m, sim=0.5): name="Golf Club d'Amiens", web="http://www.golfamiens.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club de Borgo (France, 1 courses)

- DB: addr="Route du golf, Borgo", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:202m,jaccard:1.00], 202m, 20290 BASTIA): name="GOLF CLUB BORGO", web="http://www.borgo-golf-club.fr", email="borgogolfclub@gmail.com", phone="+33 4 95 38 33 99"
- OSM (high, 34m, sim=1): name="Golf club de Borgo", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club de Cabourg Le Home (France, 1 courses)

- DB: addr="38 Avenue du Président René Coty, Varaville", web="https://www.golfclubdecabourglehome.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:varaville,db-name-substring,jaccard:1.00], 0m, 14390 VARAVILLE): name="GOLF CLUB DE CABOURG LE HOME", web="https://www.golfclubdecabourglehome.com", email="contact@golfclubdecabourglehome.com", phone="+33 2 31 91 25 56"
- OSM (high, 177m, sim=1): name="Golf de Cabourg Le Home", web=null, email=null, phone="+33 2 31 91 25 56"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club de Chamonix (France, 1 courses)

- DB: addr="35, route du Golf, Chamonix Mont-Blanc", web=null, email=null, phone=null
- ffgolf (high, sim=0.471, boost=+1.2[coord:661m,city:chamonix,name-token:blanc,db-name-substring,jaccard:0.67], 661m, 74400 LES PRAZ DE CHAMONIX): name="GOLF CLUB DE CHAMONIX MT BLANC", web="https://www.golfdechamonix.com", email="info@golfdechamonix.com", phone="+33 4 50 53 06 28"
- OSM (low, 526m, sim=1): name="Golf de Chamonix", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.471)
  - email: from fed(high, sim=0.471)
  - phone: from fed(high, sim=0.471)

### Golf Club de la Valserine (France, 1 courses)

- DB: addr="2278 Route de la Combe en Haut, Mijoux", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:84m,city:mijoux,jaccard:1.00], 84m, 01410 MIJOUX): name="GOLF DE LA VALSERINE", web="https://www.golfdelavalserine.com", email="dir.golf.valserine@gmail.com", phone="+33 9 75 90 09 54"
- OSM (high, 34m, sim=1): name="Golf de la Valserine", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club de Lezza (France, 1 courses)

- DB: addr="Route de Bonifacio, Porto-Vecchio", web=null, email=null, phone=null
- ffgolf (high, sim=0.333, boost=+1[coord:280m,city:porto,db-name-substring,jaccard:0.67], 280m, 20137 PORTO VECCHIO): name="GOLF CLUB DE LEZZA SUD CORSE", web="https://www.golfclubdelezza.com/", email="contact@golfclubdelezza.com", phone="+33 4 95 72 06 89"
- OSM (high, 12m, sim=1): name="Golf de Lezza", web=null, email=null, phone="+33 4 95 72 06 89"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.333)
  - email: from fed(high, sim=0.333)
  - phone: from fed(high, sim=0.333)

### Golf Club de Lyon (France, 2 courses)

- DB: addr="Rue des Peupliers, Villette-d'Anthon", web="http://WWW.GOLFCLUBDELYON.COM", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:villette,db-name-substring,jaccard:1.00], 0m, 38280 VILLETTE D'ANTHON): name="GOLF CLUB DE LYON", web="http://WWW.GOLFCLUBDELYON.COM", email="info@golfclubdelyon.com", phone="+33 4 78 31 11 33"
- OSM (medium, 287m, sim=1): name="Golf Club de Lyon", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club de Mimizan (France, 1 courses)

- DB: addr="Avenue de Woolsack, Mimizan", web=null, email=null, phone=null
- ffgolf (high, sim=0.412, boost=+0.9[coord:16m,city:mimizan,jaccard:0.67], 16m, 40200 MIMIZAN): name="GOLF MUNICIPAL MIMIZAN", web="https://www.golfclubmimizan.fr", email="golf@mimizan.com", phone="+33 5 58 07 71 45"
- OSM (high, 98m, sim=1): name="Golf de Mimizan", web="https://www.mimizan.fr/sport-culture/sports-loisirs/golf", email="golf@mimizan.com", phone="+33558077145"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.412)
  - email: from fed(high, sim=0.412)
  - phone: from fed(high, sim=0.412)

### Golf Club de Mionnay (France, 2 courses)

- DB: addr="2900 Chemin Beau Logis, Mionnay", web=null, email=null, phone=null
- ffgolf (high, sim=0.35, boost=+0.7[coord:214m,city:mionnay], 214m, 01390 MIONNAY): name="UGOLF MIONNAY GARDEN", web="https://jouer.golf/mionnay/", email="contact.mionnay@ugolf.eu", phone="+33 4 78 91 84 84"
- OSM (low, 113m, sim=0.5): name="Garden Golf de Mionnay", web="https://jouer.golf/golf/ugolf-mionnay/", email="contact.mionnay@ugolf.eu", phone="+33 4 78 91 84 84"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.35)
  - email: from fed(high, sim=0.35)
  - phone: from fed(high, sim=0.35)

### Golf Club de Miramas (France, 1 courses)

- DB: addr="Chemin de Foulon, Miramas", web=null, email=null, phone=null
- ffgolf (high, sim=0.318, boost=+0.7[coord:416m,city:miramas,jaccard:0.50], 416m, 13140 MIRAMAS): name="GOLF OUEST PROVENCE MIRAMAS", web="http://golfouestprovencemiramas.fr", email="accueil@golfopm.fr", phone="+33 4 90 58 56 55"
- OSM (high, 129m, sim=1): name="Golf Club de Miramas", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.318)
  - email: from fed(high, sim=0.318)
  - phone: from fed(high, sim=0.318)

### Golf Club De Montal (France, 1 courses)

- DB: addr="69 Allée Jeanne de Balsac, Saint-Jean-Lespinasse", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:442m,city:saint,jaccard:1.00], 442m, 46400 SAINT-JEAN LESPINASSE): name="GOLF DE MONTAL", web="https://www.golf-montal.fr", email="golf.montal@gmail.com", phone="+33 5 65 10 83 09"
- OSM (low, 729m, sim=1): name="Golf de Montal", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club de Montravel (France, 1 courses)

- DB: addr="Le Cluzeau, Saint-Méard-de-Gurçon", web="http://www.smgc.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:saint,db-name-substring,jaccard:1.00], 0m, 24610 SAINT MEARD DE GURCON): name="GOLF CLUB DE MONTRAVEL", web="http://www.smgc.fr", email="contact@smgc.fr", phone="+33 6 82 83 99 82"
- OSM (low, 300m, sim=0.083): name="Golf Club de Saint Méard de Gurçon", web="https://smgc.fr/", email=null, phone="+33 7 49 14 83 12"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club de Mortemart (France, 1 courses)

- DB: addr="-, Mortemart", web="https://golfdemortemart.jimdoweb.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:mortemart,db-name-substring,jaccard:1.00], 0m, 87330 MORTEMART): name="GOLF CLUB DE MORTEMART", web="https://golfdemortemart.jimdoweb.com/", email="golfdemortemart@orange.fr", phone="+33 5 55 60 45 16"
- OSM (high, 56m, sim=1): name="Golf de Mortemart", web="https://golfdemortemart.jimdoweb.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club de Valence Saint Didier (France, 1 courses)

- DB: addr="620 Route de Montelier, Charpey", web="https://www.golfclubvalence.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:charpey,jaccard:1.00], 0m, 26300 CHARPEY): name="GOLF DE VALENCE SAINT DIDIER", web="https://www.golfclubvalence.com", email="golfclubvalence@wanadoo.fr", phone="+33 4 75 59 67 01"
- OSM (medium, 451m, sim=1): name="Golf de Valence Saint-Didier", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club des Deux Alpes (France, 1 courses)

- DB: addr="Rue des Banchets, Les Deux Alpes", web="https://www.golfclub-2alpes.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:deux,db-name-substring,jaccard:1.00], 0m, 38860 LES DEUX ALPES): name="GOLF CLUB DES DEUX ALPES", web="https://www.golfclub-2alpes.fr", email="golf2alpes@gmail.com", phone="+33 6 87 21 58 30"
- OSM (medium, 269m, sim=1): name="Golf des Deux Alpes", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club des Images d'Epinal (France, 1 courses)

- DB: addr="Rue Philippe Séguin, Épinal", web="https://www.golf-epinal.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 88006 EPINAL CEDEX): name="GOLF CLUB DES IMAGES D'EPINAL", web="https://www.golf-epinal.fr", email="asgolfepinal@orange.fr", phone="+33 3 29 34 65 97"
- OSM (low, 318m, sim=0.533): name="Golf d'Épinal", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club Domaine de Champlong (France, 1 courses)

- DB: addr="100 Chemin de la chapelle, Villerest", web="https://www.domaine-de-champlong.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:villerest,db-name-substring,jaccard:1.00], 0m, 42300 VILLEREST): name="GOLF CLUB DOMAINE DE CHAMPLONG", web="https://www.domaine-de-champlong.com/", email="golf@domaine-de-champlong.com", phone="+33 4 77 69 69 69"
- OSM (low, 501m, sim=1): name="Golf Club Domaine de Champlong", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf club du Castellet (France, 1 courses)

- DB: addr="RDN8 – 3001 Route des Hauts du Camp , Le castellet", web=null, email=null, phone=null
- ffgolf (high, sim=0.36, boost=+0.7[coord:264m,city:castellet,jaccard:0.50], 264m, 83330 LE CASTELLET): name="SWING CENTER MY GOLF LE CASTELLET", web="https://www.hotelducastellet.net/fr/detente/golf.html", email="p.giraud@hotelducastellet.com", phone="+33 4 94 98 37 77"
- OSM (no-match, 156507m, sim=0.615): name="Golf de Castelnau le Lez", web="https://www.golfcastelnaulelez.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.36)
  - email: from fed(high, sim=0.36)
  - phone: from fed(high, sim=0.36)

### Golf Club du Colorado (France, 1 courses)

- DB: addr="160 Chemin du Colorado, LA MONTAGNE", web="https://www.golfclubcolorado.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:montagne,db-name-substring,jaccard:1.00], 0m, 97417 LA MONTAGNE): name="GOLF CLUB DU COLORADO", web="https://www.golfclubcolorado.fr", email="accueil@golfclubcolorado.fr", phone="262237950"
- OSM (medium, 481m, sim=1): name="Golf du Colorado", web="https://www.golfclubcolorado.fr", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club du Forez (France, 1 courses)

- DB: addr="342 Impasse du Golf, Craintilleux", web="https://www.golfclubduforez.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:craintilleux,db-name-substring,jaccard:1.00], 0m, 42210 CRAINTILLEUX): name="GOLF CLUB DU FOREZ", web="https://www.golfclubduforez.com", email="golfclubduforez@orange.fr", phone="+33 4 77 30 86 85"
- OSM (high, 136m, sim=1): name="Golf du Forez", web="https://www.golfclubduforez.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club du Val de Cher (France, 1 courses)

- DB: addr="1 Route de Vallon, Nassigny", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.1[coord:344m,city:nassigny,db-name-substring,jaccard:1.00], 344m, 03190 NASSIGNY): name="GOLF CLUB DU VAL DE CHER", web="https://golfclub-valdecher.fr/", email="contact@golfclub-valdecher.fr", phone="+33 4 70 06 71 15"
- OSM (medium, 376m, sim=1): name="Golf Club du Val de Cher", web="https://golfclub-valdecher.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club Esery - Grand Genève (France, 2 courses)

- DB: addr="28 Allée du Château, Reignier-Esery", web="https://www.golf-club-esery.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:reignier,jaccard:1.00], 0m, 74930 REIGNIER-ESERY): name="GOLF CLUB ESERY GRAND GENEVE", web="https://www.golf-club-esery.com", email="info@golf-club-esery.com", phone="+33 4 50 36 58 70"
- OSM (low, 328m, sim=0.222): name="Golf Country Club d'Ésery", web="http://www.golf-club-esery.com/", email=null, phone="+33 4 50 36 58 70"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club Flers le Houlme (France, 1 courses)

- DB: addr="-, La Selle-la-Forge", web="https://www.golf-flerslehoulme.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:selle,db-name-substring,jaccard:1.00], 0m, 61100 LA SELLE LA FORGE): name="GOLF CLUB FLERS LE HOULME", web="https://www.golf-flerslehoulme.fr", email="golf.flers.lehoulme@wanadoo.fr", phone="+33 2 33 64 42 83"
- OSM (medium, 382m, sim=1): name="golf Flers Le Houlme", web="http://www.golf-flerslehoulme.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club in Sully sur Loire (France, 9 courses)

- DB: addr="Domaine de l'Ousseau - Viglain, Sully-sur-Loire", web=null, email=null, phone=null
- ffgolf (high, sim=0.833, boost=+1[coord:61m,city:sully,jaccard:1.00], 61m, 45600 SULLY SUR LOIRE): name="GOLF DE SULLY SUR LOIRE", web="https://www.golfdesully.com", email="golfdesully@orange.fr", phone="+33 2 38 36 52 08"
- OSM (high, 162m, sim=0.833): name="Golf de Sully sur Loire", web="http://www.golfdesully.com", email="golfdesully@orange.fr", phone="+33 2 38 36 52 08"

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=0.833)
  - email: from fed(high, sim=0.833)
  - phone: from fed(high, sim=0.833)

### Golf Club of Ozoir-la-Ferriere (France, 2 courses)

- DB: addr="Château des Agneaux, Ozoir-la-Ferrière", web=null, email=null, phone=null
- ffgolf (high, sim=0.882, boost=+0.7[coord:1764m,city:ozoir,jaccard:1.00], 1764m, 77330 OZOIR LA FERRIERE): name="GOLF D'OZOIR LA FERRIERE", web="https://www.golfozoir.fr", email="secretariat@golfozoir.fr", phone="+33 1 60 02 60 79"
- OSM (low, 2152m, sim=0.882): name="Golf d'Ozoir-la-Ferrière", web="https://www.golfozoir.fr/", email=null, phone="+33 1 60 02 60 79"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.882)
  - email: from fed(high, sim=0.882)
  - phone: from fed(high, sim=0.882)

### Golf Club Palmola (France, 1 courses)

- DB: addr="Route D'Albi, Buzet-sur-Tarn", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.5[city:buzet,jaccard:0.67], 3219m, 31660 BUZET-SUR-TARN): name="GOLF COUNTRY CLUB DE PALMOLA", web="https://www.golfdepalmola.com", email="contact@golfdepalmola.com", phone="+33 5 61 84 20 50"
- OSM (low, 2773m, sim=1): name="Golf de Palmola", web="https://www.golfdepalmola.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club Perigueux (France, 1 courses)

- DB: addr="Boulevard de Saltgourde, Marsac-sur-l'Isle", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:1928m,city:marsac,jaccard:1.00], 1928m, 24430 MARSAC SUR L'ISLE): name="GOLF CLUB DE PERIGUEUX", web="https://www.golfdeperigueux.com", email="accueil@golfdeperigueux.com", phone="+33 5 53 53 02 35"
- OSM (no-match, 1566m, sim=0.563): name="Golf Public de Périgueux", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club Saint-Tropez (France, 1 courses)

- DB: addr="600 Route du Golf, Gassin", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:2871m,city:gassin,jaccard:1.00], 2871m, 83580 GASSIN): name="GOLF CLUB DE SAINT-TROPEZ", web="https://www.golfclubsainttropez.com", email="proshop@golfclubsainttropez.com", phone="+33 4 94 55 13 44"
- OSM (no-match, 319561m, sim=0.5): name="Golf du Forez", web="https://www.golfclubduforez.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club Strasbourg (France, 9 courses)

- DB: addr="-, Illkirch-Graffenstaden", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:2222m,city:illkirch,jaccard:1.00], 2222m, 67400 ILLKIRCH GRAFFENSTADEN): name="GOLF CLUB DE STRASBOURG", web="https://www.golf-strasbourg.com/", email="contact@golf-strasbourg.com", phone="+33 3 88 66 17 22"
- OSM (low, 2530m, sim=1): name="Golf de Strasbourg", web=null, email=null, phone=null

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club Thumeries-Moncheaux (France, 1 courses)

- DB: addr="Le Bois Langlart, Thumeries", web="https://www.golfdethumeries.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:thumeries,db-name-substring,jaccard:1.00], 0m, 59239 THUMERIES): name="GOLF CLUB THUMERIES-MONCHEAUX", web="https://www.golfdethumeries.fr", email="accueil@golfdethumeries.fr", phone="+33 3 20 86 58 98"
- OSM (low, 514m, sim=0.474): name="Golf de Thumeries", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club Val de l'Indre (France, 1 courses)

- DB: addr="85 Rue du Général de Gaulle, Villedieu-sur-Indre", web="https://www.golfvaldelindre.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:villedieu,jaccard:1.00], 0m, 36320 VILLEDIEU SUR INDRE): name="GOLF CLUB DU VAL DE L'INDRE", web="https://www.golfvaldelindre.fr", email="golfvaldelindre@gmail.com", phone="+33 2 54 26 59 44"
- OSM (low, 513m, sim=1): name="Golf du Val de l'Indre", web="https://www.golfvaldelindre.fr/", email="clients@golfvaldelindre.fr", phone="+33 2 54 26 59 44"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club Valenciennes (France, 1 courses)

- DB: addr="33 Rue du Chemin Vert, Marly", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:282m,city:marly,jaccard:1.00], 282m, 59770 MARLY): name="GOLF CLUB DE VALENCIENNES", web="https://www.golfdevalenciennes.com", email="golfvalenciennes@orange.fr", phone="+33 3 27 46 30 10"
- OSM (high, 31m, sim=1): name="Club Golf de Valenciennes", web="http://www.golfdevalenciennes.com/index.php?option=com_content&view=category&layout=blog&id=34&Itemid=28", email="golfvalenciennes@wanadoo.fr", phone="+33 3 27 46 30 10"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Club Valescure (France, 2 courses)

- DB: addr="725 Avenue des Golfs, Saint-Raphaël", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:447m,city:saint,jaccard:1.00], 447m, 83700 SAINT RAPHAEL): name="GOLF DE VALESCURE", web="https://www.jouer.golf", email="valescure@ugolf.eu", phone="+33 4 94 82 40 46"
- OSM (low, 560m, sim=1): name="Golf de Valescure", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Compact de Louvigny (France, 3 courses)

- DB: addr="Route de Louvigny, Louvigny", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:413m,city:louvigny,jaccard:1.00], 413m, 14111 LOUVIGNY): name="GOLF COMPACT LOUVIGNY", web="https://www.golfcompactlouvigny.com", email="golfcompactlouvigny@gmail.com", phone="+33 2 31 91 07 81"
- OSM (high, 102m, sim=1): name="Golf compact de Louvigny", web="http://www.golfcompactlouvigny.com", email=null, phone="+33 2 31 91 07 81"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Compact Idron (France, 1 courses)

- DB: addr="1 A Rue du Parc, Idron", web="https://www.golf-compact-idron.fr/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:idron,db-name-substring,jaccard:1.00], 0m, 64320 IDRON): name="GOLF COMPACT IDRON", web="https://www.golf-compact-idron.fr/", email="contact@golf-compact-idron.fr", phone="+33 5 59 27 70 94"
- OSM (low, 2291m, sim=0.867): name="Golf Compact d'Idron", web="https://www.golf-compact-idron.fr", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Corrençon en Vercors (France, 1 courses)

- DB: addr="Les Ritons, Corrençon-en-Vercors", web="https://www.golfdecorrencon.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:vercors,jaccard:1.00,typo:corrençon~correncon], 0m, 38250 CORRENCON EN VERCORS): name="GOLF DE CORRENCON EN VERCORS", web="https://www.golfdecorrencon.com", email="info@golfdecorrencon.com", phone="+33 4 76 95 80 42"
- OSM (low, 772m, sim=0.45): name="Golf de Corrençon", web="https://www.golfdecorrencon.com/", email="info@golfdecorrencon.com", phone="+33 4 76958042"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Cote des Isles (France, 2 courses)

- DB: addr="39 Chemin de Coutances, Saint-Jean-de-la-Rivière", web="http://www.golfcotedesisles.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:saint,jaccard:1.00], 0m, 50270 SAINT JEAN DE LA RIVIERE): name="GOLF DE LA COTE DES ISLES", web="http://www.golfcotedesisles.fr", email="contact@golfcotedesisles.com", phone="+33 2 33 87 31 10"
- OSM (medium, 325m, sim=1): name="Golf de la côte des isles", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Country Club De Bigorre (France, 1 courses)

- DB: addr="1 Chemin du Golf, Pouzac", web="https://www.golf-bigorre.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:pouzac,db-name-substring,jaccard:1.00], 0m, 65200 POUZAC): name="GOLF COUNTRY CLUB DE BIGORRE", web="https://www.golf-bigorre.fr", email="contact@golf-bigorre.fr", phone="+33 5 62 91 06 20"
- OSM (medium, 287m, sim=1): name="Golf de la Bigorre", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Country Club de Nice (France, 1 courses)

- DB: addr="698 Boulevard du Mercantour, Nice", web="https://www.golf-club-nice.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:nice,db-name-substring,jaccard:1.00], 0m, 06200 NICE): name="GOLF COUNTRY CLUB DE NICE", web="https://www.golf-club-nice.com", email="sebastiao.golfdenice@yahoo.fr", phone="+33 4 93 29 82 00"
- OSM (low, 24m, sim=0): name="Golf Country Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Country Club Estolosa (France, 1 courses)

- DB: addr="Borde Haute, Dremil Lafage", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.5[city:dremil,jaccard:0.67], 3015m, 31280 DREMIL LAFAGE): name="GOLF ESTOLOSA", web="https://www.estolosa.fr", email="accueil@estolosa.fr", phone="+33 5 62 18 84 00"
- OSM (low, 3033m, sim=1): name="Domaine Estolosa", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf d'Ableiges (France, 3 courses)

- DB: addr="Chaussée Jules César, Ableiges", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:345m,city:ableiges,jaccard:1.00], 345m, 95450 ABLEIGES): name="GOLF CLUB D'ABLEIGES", web="https://www.ableiges-golf.com", email="golf@ableiges-golf.com", phone="+33 1 30 27 97 00"
- OSM (high, 27m, sim=1): name="Golf d'Ableiges", web=null, email="golf@ableigesgolf.com", phone="+33 1 30 27 97 00"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf d'Aix-en-Provence (France, 1 courses)

- DB: addr="1335 Chemin de Granet, Aix-en-Provence", web="http://www.golfdaixenprovence.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:provence,jaccard:1.00], 0m, 13090 AIX EN PROVENCE): name="GOLF D'AIX EN PROVENCE", web="http://www.golfdaixenprovence.fr", email="michelsarkissian@golf-aixenprovence.fr", phone="+33 4 42 29 63 69"
- OSM (low, 623m, sim=0.059): name="Set Golf", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf d'Aix-les-Bains (France, 1 courses)

- DB: addr="95, avenue du Golf, Aix-les-Bains", web="https://www.golf-aixlesbains.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:bains,jaccard:1.00], 0m, 73100 AIX LES BAINS): name="GOLF D'AIX LES BAINS", web="https://www.golf-aixlesbains.com", email="info@golf-aixlesbains.com", phone="+33 4 79 61 23 35"
- OSM (low, 737m, sim=0.818): name="Golf Club Aix les Bains", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf d'Alençon Arçonnay (France, 1 courses)

- DB: addr="Rue du Petit Maleffre, Arçonnay", web="https://www.alencon.golf", email=null, phone=null
- ffgolf (high, sim=0.857, boost=+0.9[coord:0m,jaccard:1.00,typo:alençon~alencon], 0m, 72610 ARCONNAY): name="GOLF D'ALENCON EN ARCONNAY", web="https://www.alencon.golf", email="sasteamgolf@gmail.com", phone="+33 6 69 48 64 90"
- OSM (low, 294m, sim=0.737): name="Golf Alençon en Arçonnay", web="https://www.golfalencon.com/", email=null, phone="+33 2 33 28 56 67"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.857)
  - phone: from fed(high, sim=0.857)

### Golf d'Angers (France, 1 courses)

- DB: addr="32 Rue du Golf, Les Garennes sur Loire", web="https://www.golfangers.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:garennes,db-name-substring,jaccard:1.00], 0m, 49320 LES GARENNES SUR LOIRE): name="GOLF D'ANGERS", web="https://www.golfangers.fr", email="contact@golfangers.com", phone="+33 2 41 91 96 56"
- OSM (low, 608m, sim=1): name="Golf d'Angers", web="https://www.golfangers.com/", email=null, phone="+33 2 41 91 96 56"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf D'angers St Sylvain D'anjou (France, 1 courses)

- DB: addr="Bechalière, Verrières-en-Anjou", web="https://www.golfdesaintsylvain.fr", email=null, phone=null
- ffgolf (high, sim=0.625, boost=+0.92[coord:0m,city:anjou,jaccard:0.75], 0m, 49480 VERRIERES EN ANJOU): name="GOLF DE SAINT SYLVAIN D'ANJOU", web="https://www.golfdesaintsylvain.fr", email="golfdesaintsylvain@gmail.com", phone="+33 2 41 27 78 48"
- OSM (low, 208m, sim=0.625): name="Golf de Saint-Sylvain d'Anjou", web="https://www.golfdesaintsylvain.com/", email=null, phone="+33 2 41 27 78 48"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.625)
  - phone: from fed(high, sim=0.625)

### Golf d'Arc en Barrois (France, 1 courses)

- DB: addr="Chemin du calvaire, Arc-en-Barrois", web=null, email=null, phone=null
- ffgolf (no-match, sim=0.611, boost=+0.5[city:barrois,jaccard:0.67], 90736m, 55000 COMBLES EN BARROIS): name="GOLF CLUB COMBLES EN BARROIS", web="https://www.golfdecomblesenbarrois.fr", email="golfdecomblesenbarrois@gmail.com", phone="+33 3 29 45 16 03"
- OSM (high, 83m, sim=1): name="Golf d'Arc-en-Barrois", web="https://golfarc.fr/", email="clubhouse@golfarc.fr", phone="+33 3 25 01 54 54"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 83m, sim=1)
  - email: from osm(high, 83m, sim=1)
  - phone: from osm(high, 83m, sim=1)

### Golf d'Arcachon (France, 2 courses)

- DB: addr="35 Boulevard d'Arcachon, La Teste-de-Buch", web=null, email=null, phone=null
- ffgolf (high, sim=0.417, boost=+0.75[coord:406m,city:teste,jaccard:0.67], 406m, 33260 LA TESTE): name="GOLF INTERNATIONAL D'ARCACHON", web="https://golfarcachon.org", email="accueil@golfarcachon.org", phone="+33 5 56 54 44 00"
- OSM (medium, 385m, sim=1): name="Golf d'Arcachon", web="www.golfarcachon.org", email=null, phone="+33 5 56 54 44 00"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.417)
  - email: from fed(high, sim=0.417)
  - phone: from fed(high, sim=0.417)

### Golf d'Arcangues (France, 1 courses)

- DB: addr="Chemin de Jaureguiborda, Arcangues", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:408m,city:arcangues,jaccard:1.00], 408m, 64200 ARCANGUES): name="GOLF CLUB D'ARCANGUES", web="http://www.golfdarcangues.com/fr", email="accueil@golfdarcangues.com", phone="+33 5 59 43 10 56"
- OSM (medium, 316m, sim=1): name="Golf d'Arcangues", web="https://www.golfdarcangues.com/", email="accueil@golfdarcangues.com", phone="+33 5 59 43 10 56"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf d'Arnouville (France, 1 courses)

- DB: addr="12 rue du douzieme chasseur, Ermenouville", web="http://www.golfdarnouville.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:ermenouville,db-name-substring,jaccard:1.00], 0m, 76740 ERMENOUVILLE): name="GOLF D'ARNOUVILLE", web="http://www.golfdarnouville.com/", email="contact@golfdarnouville.com", phone="+33 7 50 72 37 58"
- OSM (medium, 349m, sim=1): name="Golf d'Arnouville", web="http://www.golfdarnouville.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf d'Arras (France, 2 courses)

- DB: addr="1020 Rue Briquet-Taillandier, Anzin-Saint-Aubin", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:340m,city:anzin,db-name-substring,jaccard:0.67], 340m, 62223 ANZIN SAINT AUBIN): name="LES PARCOURS - GOLF D'ARRAS", web="https://www.golfdarras.com", email="contact@golfdarras.com", phone="+33 3 74 24 02 00"
- OSM (high, 226m, sim=1): name="Golf d'Arras", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf d'Aubeterre (France, 1 courses)

- DB: addr="Manoir de Longeveau, Pillac", web="https://www.longeveau.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:pillac,db-name-substring,jaccard:1.00], 0m, 16390 PILLAC): name="GOLF D'AUBETERRE", web="https://www.longeveau.com", email="bonjour@longeveau.com", phone="+33 5 45 98 55 13"
- OSM (high, 173m, sim=1): name="Golf d’Aubeterre", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf d'Avignon Châteaublanc (France, 2 courses)

- DB: addr="1596 Route de Chateaublanc, Morières-lès-Avignon", web=null, email=null, phone=null
- ffgolf (high, sim=0.808, boost=+1.1[coord:434m,city:avignon,name-token:chateaublanc,jaccard:0.50,typo:châteaublanc~chateaublanc], 434m, 84310 MORIERES LES AVIGNON): name="UGOLF AVIGNON CHATEAUBLANC", web="https://www.jouer.golf/avignon", email="contact.avignon@ugolf.eu", phone="+33 4 90 33 39 08"
- OSM (low, 38m, sim=0.545): name="Golf de Châteaublanc", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.808)
  - email: from fed(high, sim=0.808)
  - phone: from fed(high, sim=0.808)

### Golf d'Eauze Grand Armagnac (France, 4 courses)

- DB: addr="Lieu dit Guinlet, Eauze", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:113m,city:eauze,db-name-substring,jaccard:1.00], 113m, 32800 EAUZE): name="GOLF D'EAUZE GRAND ARMAGNAC", web="https://www.golfdeauze.com/", email="golfdeauze@gmail.com", phone="+33 5 62 09 80 84"
- OSM (low, 289m, sim=0.091): name="Golf Club de Guinlet", web=null, email=null, phone=null

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf d'Ecancourt (France, 1 courses)

- DB: addr="Cour du Mûrier, Jouy-le-Moutier", web=null, email=null, phone=null
- ffgolf (high, sim=0.786, boost=+1.25[coord:213m,city:jouy,db-name-substring,jaccard:1.00], 213m, 95280 JOUY LE MOUTIER): name="AS DU GOLF D'ECANCOURT", web="http://https//golf-ecancourt.fr", email="jjdaniel78@gmail.com", phone="+33 1 34 21 17 99"
- OSM (high, 21m, sim=1): name="Golf d'Ecancourt", web="https://golf-ecancourt.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.786)
  - email: from fed(high, sim=0.786)
  - phone: from fed(high, sim=0.786)

### Golf d'Hardelot (France, 2 courses)

- DB: addr="3 Avenue du Golf, Neufchâtel-Hardelot", web="https://www.hardelotgolfclub.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:hardelot,db-name-substring,jaccard:1.00], 0m, 62152 NEUFCHATEL HARDELOT): name="GOLF D'HARDELOT", web="https://www.hardelotgolfclub.com", email="hardelot@resonance.golf", phone="+33 3 21 83 73 10"
- OSM (low, 205m, sim=0.667): name="Golf d’Hardelot - Les Pins", web="https://www.hardelotgolfclub.com", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf d'Hossegor (France, 1 courses)

- DB: addr="333 Avenue du Golf, Soorts-Hossegor", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:551m,city:hossegor,jaccard:1.00], 551m, 40150 HOSSEGOR): name="GOLF CLUB D'HOSSEGOR", web="https://www.golfhossegor.com", email="secretariat@golfhossegor.fr", phone="+33 5 58 43 56 99"
- OSM (medium, 278m, sim=1): name="Golf d'Hossegor", web="https://www.golfhossegor.com/", email=null, phone="+335 58 43 56 99"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf D'ilbarritz (France, 1 courses)

- DB: addr="Avenue du Château, Bidart", web="https://golfilbarritz.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:bidart,db-name-substring,jaccard:1.00], 0m, 64210 BIDART): name="GOLF D'ILBARRITZ", web="https://golfilbarritz.com", email="info@golfilbarritz.com", phone="+33 5 59 43 81 30"
- OSM (high, 96m, sim=1): name="Golf d'Ilbarritz", web="https://golfilbarritz.com/", email=null, phone="+33 5 59 43 81 30"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf D'ormesson (France, 1 courses)

- DB: addr="1 Chemin du Belvédère, Ormesson-sur-Marne", web="https://www.golformesson.com/fr/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:ormesson,db-name-substring,jaccard:1.00], 0m, 94490 ORMESSON SUR MARNE): name="GOLF D'ORMESSON", web="https://www.golformesson.com/fr/", email="contact.ormesson@ugolf.eu", phone="+33 1 45 76 20 71"
- OSM (medium, 441m, sim=1): name="Golf d’Ormesson", web="https://www.golformesson.fr", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf d'Utah Beach (France, 2 courses)

- DB: addr="1 La Brèche, Fontenay-sur-Mer", web="https://www.golf-cotentin.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:fontenay,db-name-substring,jaccard:1.00], 0m, 50310 FONTENAY SUR MER): name="GOLF D'UTAH BEACH", web="https://www.golf-cotentin.fr", email="contact@golf-utahbeach.fr", phone="+33 2 33 21 44 27"
- OSM (low, 518m, sim=0.158): name="Golf de la presqu'île du Cotentin", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Baden (France, 1 courses)

- DB: addr="Kernic, Baden", web=null, email=null, phone=null
- ffgolf (high, sim=0.333, boost=+0.75[coord:562m,city:baden,jaccard:0.67], 562m, 56870 BADEN): name="GOLF BLUEGREEN BADEN", web="https://bluegreen.fr/baden", email="baden@bluegreen.fr", phone="+33 2 97 57 18 96"
- OSM (low, 600m, sim=1): name="Golf de Baden", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.333)
  - email: from fed(high, sim=0.333)
  - phone: from fed(high, sim=0.333)

### Golf de Bauge (France, 1 courses)

- DB: addr="Bordé, Baugé en Anjou", web="https://www.golf-bauge.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:anjou,db-name-substring,jaccard:1.00], 0m, 49150 BAUGE-EN-ANJOU): name="GOLF DE BAUGE", web="https://www.golf-bauge.fr", email="golf@golf-bauge.fr", phone="+33 2 41 89 01 27"
- OSM (medium, 381m, sim=1): name="Golf de Baugé", web="https://golf-bauge.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Beaune Levernois (France, 2 courses)

- DB: addr="21 Rue du Golf, Levernois", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:299m,city:levernois,jaccard:1.00], 299m, 21200 LEVERNOIS): name="GOLF DE BEAUNE-LEVERNOIS", web="https://www.golfdebeaune.com/", email="contact@golfdebeaune.com", phone="+33 3 80 24 10 29"
- OSM (high, 113m, sim=1): name="Golf de Beaune Levernois", web="http://www.golfbeaune.fr/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De Beauvallon (France, 1 courses)

- DB: addr="Boulevard des Collines, Grimaud", web="https://www.golf-club-de-beauvallon.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:grimaud,db-name-substring,jaccard:1.00], 0m, 83310 GRIMAUD): name="GOLF DE BEAUVALLON", web="https://www.golf-club-de-beauvallon.com", email="administration@golf-club-de-beauvallon.com", phone="+33 4 94 96 16 98"
- OSM (low, 802m, sim=1): name="Golf de Beauvallon", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Besançon (France, 1 courses)

- DB: addr="1 route de Naisey, La Chevillotte", web="https://www.golfbesancon.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:chevillotte,jaccard:1.00,typo:besançon~besancon], 0m, 25620 LA CHEVILLOTTE): name="GOLF DE BESANCON", web="https://www.golfbesancon.com", email="contact@golfdebesancon.fr", phone="+33 3 81 55 73 54"
- OSM (medium, 333m, sim=1): name="Golf de Besançon", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Biot (France, 1 courses)

- DB: addr="1379 Route d'Antibes, Biot", web="http://www.golfdebiot.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:biot,db-name-substring,jaccard:1.00], 0m, 06410 BIOT): name="GOLF DE BIOT", web="http://www.golfdebiot.com", email="contact@golfdebiot.fr", phone="+33 4 93 65 08 48"
- OSM (high, 46m, sim=1): name="Golf de Biot", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Bitche (France, 9 courses)

- DB: addr="22A Rue des Prés, Bitche", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:1141m,city:bitche,db-name-substring,jaccard:1.00], 1141m, 57230 BITCHE): name="GOLF DE BITCHE", web="https://www.golf-bitche.com", email="golf.bitche@wanadoo.fr", phone="+33 3 87 96 15 30"
- OSM (high, 20m, sim=1): name="Golf de Bitche", web=null, email=null, phone=null

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Bondues (France, 2 courses)

- DB: addr="Domaine de la Vigne, Bondues", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.1[coord:712m,city:bondues,db-name-substring,jaccard:1.00], 712m, 59910 BONDUES): name="GOLF DE BONDUES", web="https://golfdebondues.com", email="contact@golfdebondues.com", phone="+33 3 20 23 13 87"
- OSM (low, 564m, sim=1): name="Golf de Bondues", web="https://www.golfdebondues.com", email=null, phone="+33 3 20 23 20 62"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Bordeaux-Cameyrac (France, 2 courses)

- DB: addr="Allée du Golf, Saint-Sulpice-et-Cameyrac", web=null, email=null, phone=null
- ffgolf (high, sim=0.739, boost=+0.7[coord:299m,city:saint,jaccard:0.50], 299m, 33450 SAINT SULPICE ET CAMEYRAC): name="UGOLF BORDEAUX CAMEYRAC", web="https://jouer.golf/golf/ugolf-bordeaux-cameyrac/", email="contact.cameyrac@ugolf.eu", phone="+33 5 56 72 96 79"
- OSM (low, 511m, sim=1): name="Golf de Bordeaux-Cameyrac", web="www.golf-bordeaux-cameyrac.com", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.739)
  - email: from fed(high, sim=0.739)
  - phone: from fed(high, sim=0.739)

### Golf de Bourges (France, 2 courses)

- DB: addr="16 Rue Jacques Becker, Bourges", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:126m,city:bourges,db-name-substring,jaccard:1.00], 126m, 18000 BOURGES): name="GOLF DE BOURGES", web="https://jouer.golf/bourges/", email="contact.bourges@ugolf.eu", phone="+33 2 48 21 20 01"
- OSM (high, 175m, sim=1): name="Golf de Bourges", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Bressuire (France, 2 courses)

- DB: addr="Le Grand Puchaud, Bressuire", web="https://www.golf-bressuire.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:bressuire,db-name-substring,jaccard:1.00], 0m, 79300 BRESSUIRE): name="GOLF DE BRESSUIRE", web="https://www.golf-bressuire.fr", email="lesregiesdugolf@ville-bressuire.fr", phone="+33 5 49 80 69 18"
- OSM (no-match, 435221m, sim=0.667): name="Golf de la Bresse", web="http://www.golfdelabresse.fr", email="secretariat@golfdelabresse.com", phone="+33 474514209"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Brest les Abers (France, 1 courses)

- DB: addr="Kerhoaden, Plouarzel", web="http://www.golf-armorique.com/golf-des-abers.aspx", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:plouarzel,db-name-substring,jaccard:1.00], 0m, 29810 PLOUARZEL): name="GOLF DE BREST LES ABERS", web="http://www.golf-armorique.com/golf-des-abers.aspx", email="golf@abersgolf.com", phone="+33 2 98 89 68 33"
- OSM (low, 341m, sim=0.455): name="Golf des Abers", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Bussy-Guermantes (France, 2 courses)

- DB: addr="1 Promenade des Golfeurs, Bussy-Saint-Georges", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.1[coord:940m,city:bussy,db-name-substring,jaccard:1.00], 940m, 77600 BUSSY SAINT GEORGES): name="GOLF DE BUSSY-GUERMANTES", web="https://www.golfbussyguermantes.com", email="accueil@bussygolf.com", phone="+33 1 64 66 00 00"
- OSM (low, 517m, sim=1): name="Golf de Bussy-Guermantes", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Caden (France, 2 courses)

- DB: addr="Le Four Bourdin, Caden", web="http://www.golfdecaden.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:caden,db-name-substring,jaccard:1.00], 0m, 56220 CADEN): name="GOLF DE CADEN", web="http://www.golfdecaden.fr", email="bienvenue@golfdecaden.com", phone="+33 2 97 66 11 81"
- OSM (medium, 421m, sim=1): name="Golf de Caden", web="https://www.golfdecaden.com/", email="welcome@golfdecaden.com", phone="+33 2 97 66 11 81"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Caen la Mer (France, 3 courses)

- DB: addr="Le Vallon, Biéville-Beuville", web="https://www.golf-caenlamer.fr/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:beuville,db-name-substring,jaccard:1.00], 0m, 14112 BIEVILLE BEUVILLE): name="GOLF DE CAEN LA MER", web="https://www.golf-caenlamer.fr/", email="contact@golf-caenlamer.fr", phone="+33 2 31 94 72 09"
- OSM (low, 731m, sim=0.5): name="Golf de Caen", web="https://golf-caenlamer.fr/", email=null, phone="+33 2 31 94 72 09"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Carcassonne (France, 1 courses)

- DB: addr="5001F Route de Saint-Hilaire, Carcassonne", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:180m,city:carcassonne,jaccard:1.00], 180m, 11000 CARCASSONNE): name="GOLF CLUB DE CARCASSONNE", web="https://www.golf-de-carcassonne.com", email="contact@golf-de-carcassonne.com", phone="+33 6 13 20 85 43"
- OSM (high, 37m, sim=1): name="Golf de Carcassonne", web="https://golf-de-carcassonne.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Castres-Gourjade (France, 1 courses)

- DB: addr="746 Allée de Gourjade, Castres", web="https://www.golf-castres.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:castres,db-name-substring,jaccard:1.00], 0m, 81100 CASTRES): name="GOLF DE CASTRES-GOURJADE", web="https://www.golf-castres.com", email="contact@golf-castres.com", phone="+33 5 63 72 27 06"
- OSM (medium, 442m, sim=1): name="Golf de Castres Gourjade", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Chantilly (France, 1 courses)

- DB: addr="Allée de la Ménagerie, Vineuil-Saint-Firmin", web="https://www.golfdechantilly.com", email=null, phone=null
- ffgolf (high, sim=0.409, boost=+0.7[coord:561m,city:vineuil,jaccard:0.50], 561m, 60500 VINEUIL SAINT FIRMIN): name="GARDEN GOLF FORET DE CHANTILLY", web="https://jouer.golf/foret-de-chantilly/", email="contact.chantilly@ugolf.eu", phone="+33 3 44 58 47 74"
- OSM (low, 1267m, sim=1): name="Golf de Chantilly", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.409)
  - phone: from fed(high, sim=0.409)

### Golf De Cherbourg-En-Cotentin (France, 1 courses)

- DB: addr="Rue des Verriers, Cherbourg-en-Cotentin", web=null, email=null, phone=null
- ffgolf (high, sim=0.429, boost=+0.9[coord:243m,city:cherbourg,jaccard:0.67], 243m, 50470 CHERBOURG EN COTENTIN): name="GOLF DE CHERBOURG", web="http://www.golfdecherbourg.fr", email="contact@golfdecherbourg.fr", phone="+33 2 33 44 45 48"
- OSM (low, 25m, sim=0.429): name="Golf de Cherbourg", web="https://www.golfdecherbourg.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.429)
  - email: from fed(high, sim=0.429)
  - phone: from fed(high, sim=0.429)

### Golf de Chiberta (France, 2 courses)

- DB: addr="104 boulevard des plages, Anglet", web="https://www.golfchiberta.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:anglet,db-name-substring,jaccard:1.00], 0m, 64600 ANGLET): name="GOLF DE CHIBERTA", web="https://www.golfchiberta.com", email="accueil@golfchiberta.com", phone="+33 5 59 52 51 10"
- OSM (high, 22m, sim=1): name="Golf de Chiberta", web="https://www.golfchiberta.com/", email=null, phone="+33 5 59 52 51 10"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De Cholet (France, 1 courses)

- DB: addr="Allée du Chêne Landry, Cholet", web="https://www.choletgolf.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:cholet,db-name-substring,jaccard:1.00], 0m, 49300 CHOLET): name="GOLF DE CHOLET", web="https://www.choletgolf.com", email="golf@csl-cholet.fr", phone="+33 2 41 71 05 01"
- OSM (high, 69m, sim=1): name="Golf de Cholet", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Cicé-Blossac (France, 1 courses)

- DB: addr="Avenue de la Chaise, Bruz", web="https://jouer.golf/golf/ugolf-domaine-de-cice-blossac/", email=null, phone=null
- ffgolf (high, sim=0.571, boost=+0.92[coord:0m,city:bruz,jaccard:0.75], 0m, 35170 BRUZ): name="EXCLUSIV GOLF DE CICE-BLOSSAC", web="https://jouer.golf/golf/ugolf-domaine-de-cice-blossac/", email="contact.cice@ugolf.eu", phone="+33 2 99 52 79 79"
- OSM (high, 197m, sim=1): name="Golf de Cicé-Blossac", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.571)
  - phone: from fed(high, sim=0.571)

### Golf de Clairis (France, 1 courses)

- DB: addr="Domaine de Clairis, Savigny-sur-Clairis", web="https://www.golfdeclairis.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:savigny,db-name-substring,jaccard:1.00], 0m, 89150 SAVIGNY SUR CLAIRIS): name="GOLF DE CLAIRIS", web="https://www.golfdeclairis.fr", email="golfdeclairis89150@gmail.com", phone="+33 3 86 86 33 90"
- OSM (medium, 319m, sim=1): name="Golf de Clairis", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Clecy Cantelou (France, 2 courses)

- DB: addr="Cantelou, Clécy", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:165m,db-name-substring,jaccard:1.00], 165m, 14570 CLECY): name="GOLF DE CLECY CANTELOU", web="https://www.golf-de-clecy.com", email="golf-de-clecy@golf-de-clecy.com", phone="+33 2 31 69 72 72"
- OSM (high, 8m, sim=1): name="Golf de Clécy-Cantelou", web="https://www.golf-de-clecy.com/", email=null, phone="+33231697272"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Combles-en-Barrois (France, 1 courses)

- DB: addr="38 Rue Basse, Combles-en-Barrois", web="https://www.golfdecomblesenbarrois.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:combles,jaccard:1.00], 0m, 55000 COMBLES EN BARROIS): name="GOLF CLUB COMBLES EN BARROIS", web="https://www.golfdecomblesenbarrois.fr", email="golfdecomblesenbarrois@gmail.com", phone="+33 3 29 45 16 03"
- OSM (low, 651m, sim=0.389): name="Golf de Combles", web="https://golfdecomblesenbarrois.fr/", email=null, phone="+33 3 29 45 16 03"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Cornouaille (France, 1 courses)

- DB: addr="13 Route du Mesmeur, La Forêt-Fouesnant", web="https://www.golfdecornouaille.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:fouesnant,db-name-substring,jaccard:1.00], 0m, 29940 LA FORET FOUESNANT): name="GOLF DE CORNOUAILLE", web="https://www.golfdecornouaille.com", email="contact@golfdecornouaille.com", phone="+33 2 98 56 97 09"
- OSM (low, 540m, sim=1): name="Golf de Cornouaille", web="https://www.golfdecornouaille.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Cunlhat (France, 1 courses)

- DB: addr="7 La Croix Noire, Cunlhat", web="https://www.golfdecunlhat.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:cunlhat,db-name-substring,jaccard:1.00], 0m, 63590 CUNLHAT): name="GOLF DE CUNLHAT", web="https://www.golfdecunlhat.com", email="assosportivegolfcunlhat@gmail.com", phone="+33 9 83 89 57 00"
- OSM (medium, 291m, sim=1): name="Golf de Cunlhat", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De Deauville Saint-Gatien (France, 2 courses)

- DB: addr="Chemin de la Mue, Saint-Gatien-des-Bois", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:2752m,city:saint,jaccard:1.00], 2752m, 14130 SAINT GATIEN DES BOIS): name="GOLF DE DEAUVILLE ST GATIEN", web="https://www.golfdeauville.com", email="accueil@golfdeauville.com", phone="+33 2 31 65 19 99"
- OSM (no-match, 836361m, sim=0.438): name="Golf de Beauvallon", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Dieppe Pourville (France, 1 courses)

- DB: addr="51 Route de Pourville, Dieppe", web="https://www.golf-dieppe-normandie.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:dieppe,jaccard:1.00], 0m, 76200 DIEPPE): name="GOLF DE DIEPPE-POURVILLE", web="https://www.golf-dieppe-normandie.com", email="contact@dieppe.golf", phone="+33 2 35 84 25 05"
- OSM (medium, 494m, sim=1): name="Golf de Dieppe Pourville", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Divonne Les Bains (France, 1 courses)

- DB: addr="604 Rue des Bains, Divonne-les-Bains", web=null, email=null, phone=null
- ffgolf (no-match, sim=0.538, boost=+0.5[city:bains,jaccard:0.67], 78793m, 73100 AIX LES BAINS): name="GOLF D'AIX LES BAINS", web="https://www.golf-aixlesbains.com", email="info@golf-aixlesbains.com", phone="+33 4 79 61 23 35"
- OSM (high, 160m, sim=1): name="Golf de Divonne-les-Bains", web="https://www.golfdedivonne.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 160m, sim=1)

### Golf de Falgos (France, 1 courses)

- DB: addr="Domaine de falgos, St Laurent de Cerdans", web="http://www.falgos.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:laurent,db-name-substring,jaccard:1.00], 0m, 66260 SAINT-LAURENT DE CERDANS): name="GOLF DE FALGOS", web="http://www.falgos.com", email="contact@falgos.com", phone="+33 4 68 39 51 42"
- OSM (high, 112m, sim=1): name="Domaine de Falgos", web="https://www.falgos.com/fr/hotel-de-charme-pyrenees-orientales", email=null, phone="+33468395142"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Faulquemont-Pontpierre (France, 2 courses)

- DB: addr="Avenue Jean Monnet, Faulquemont", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:453m,city:faulquemont,jaccard:1.00], 453m, 57380 FAULQUEMONT): name="GOLF DE FAULQUEMONT PONTPIERRE", web="https://www.golf-faulquemont.com", email="golf.faulquemont@gmail.com", phone="+33 3 87 81 30 52"
- OSM (low, 18m, sim=0.5): name="Golf de Faulquemont", web="https://www.golf-faulquemont.com/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De Fleurance (France, 1 courses)

- DB: addr="Lassalle, Fleurance", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:fleurance,db-name-substring,jaccard:1.00], 0m, 32500 FLEURANCE): name="GOLF DE FLEURANCE", web=null, email="fleurance.assogolf@gmail.com", phone="+33 5 62 06 26 26"
- OSM (medium, 355m, sim=1): name="Golf de Fleurance", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Fleuray-Amboise (France, 1 courses)

- DB: addr="-, Cangey", web="https://www.golfdefleuray-amboise.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:cangey,db-name-substring,jaccard:1.00], 0m, 37530 CANGEY): name="GOLF DE FLEURAY-AMBOISE", web="https://www.golfdefleuray-amboise.com", email="contact@golfdefleuray-amboise.com", phone="+33 2 47 29 56 28"
- OSM (high, 208m, sim=1): name="Golf de Fleuray - Amboise", web="https://www.golfdefleuray-amboise.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Fréhel - Sables d'Or Les Pins (France, 1 courses)

- DB: addr="17 Avenue du Golf, Fréhel", web="https://www.golfdessablesdor.fr/", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:0m,jaccard:1.00], 0m, 22240 FREHEL): name="GOLF DE FREHEL - SABLES D'OR LES PINS", web="https://www.golfdessablesdor.fr/", email="contact@golfsablesdor.fr", phone="+33 2 96 41 42 57"
- OSM (low, 258m, sim=0.478): name="Golf des Sables d'Or", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Gaillon (France, 1 courses)

- DB: addr="Route de la Garenne, Gaillon", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:397m,city:gaillon,jaccard:1.00], 397m, 27600 GAILLON): name="GOLF CLUB DE GAILLON", web="https://www.golfdegaillon.com", email="golfgaillon@wanadoo.fr", phone="+33 2 32 53 89 40"
- OSM (high, 74m, sim=1): name="Golf de Gaillon", web="https://golfdegaillon.com/", email="contact@golfdegaillon.com", phone="+33 2 32 53 89 40"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Gap-Bayard (France, 1 courses)

- DB: addr="Plateau de Bayard, Gap", web="https://www.gap-bayard.com", email=null, phone=null
- ffgolf (high, sim=0.4, boost=+0.55[coord:0m,jaccard:0.50], 0m, 05000 GAP): name="GOLF ALPES PROVENCE GAP BAYARD", web="https://www.gap-bayard.com", email="contact@gap-bayard.com", phone="+33 4 92 50 16 83"
- OSM (low, 1145m, sim=1): name="Golf de Gap-Bayard", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.4)
  - phone: from fed(high, sim=0.4)

### Golf de Gascogne - Masseube (France, 1 courses)

- DB: addr="-, Masseube", web=null, email=null, phone=null
- ffgolf (high, sim=0.471, boost=+0.9[coord:174m,city:masseube,jaccard:0.67], 174m, 32140 MASSEUBE): name="GOLF DE GASCOGNE", web="https://golfdegascogne32.com", email="golfdegascogne32@gmail.com", phone="+33 5 62 66 64 46"
- OSM (low, 13m, sim=0.471): name="Golf de Gascogne", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.471)
  - email: from fed(high, sim=0.471)
  - phone: from fed(high, sim=0.471)

### Golf de Gif-Chevry (France, 1 courses)

- DB: addr="Rond-Point du Golf, Gif-sur-Yvette", web="https://jouer.golf/golf/ugolf-gif-chevry/", email=null, phone=null
- ffgolf (high, sim=0.625, boost=+0.7[coord:0m,city:yvette], 0m, 91190 GIF SUR YVETTE): name="UGOLF GIF CHEVRY", web="https://jouer.golf/golf/ugolf-gif-chevry/", email="contact.gif@ugolf.eu", phone="+33 1 60 12 40 33"
- OSM (low, 501m, sim=0.476): name="Golf de Gif-sur-Yvette Chevry", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.625)
  - phone: from fed(high, sim=0.625)

### Golf de Gonesse (France, 1 courses)

- DB: addr="15 Avenue Pierre Salvi, Gonesse", web="https://jouer.golf/golf/ugolf-gonesse/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:gonesse,db-name-substring,jaccard:1.00], 0m, 95500 GONESSE): name="GOLF DE GONESSE", web="https://jouer.golf/golf/ugolf-gonesse/", email="contact.gonesse@ugolf.eu", phone="+33 1 39 87 02 70"
- OSM (low, 351m, sim=0.308): name="Golf de la Grande Vallée", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Gonville (France, 1 courses)

- DB: addr="542 Route du Chêne, Saint-Jean-de-Gonville", web="http://www.golfgonville.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:saint,db-name-substring,jaccard:1.00], 0m, 01630 SAINT JEAN DE GONVILLE): name="GOLF DE GONVILLE", web="http://www.golfgonville.com", email="accueil@golfgonville.com", phone="+33 4 50 56 40 92"
- OSM (medium, 363m, sim=1): name="Golf de Gonville", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De Haute Auvergne - Aurillac (France, 1 courses)

- DB: addr="2 Route du Golf, Sansac-de-Marmiesse", web=null, email=null, phone=null
- ffgolf (high, sim=0.609, boost=+0.75[coord:486m,city:sansac,jaccard:0.67], 486m, 15130 SANSAC DE MARMIESSE): name="GOLF DE HAUTE AUVERGNE", web="https://golfdehauteauvergne.fr", email="contact@golfdehauteauvergne.fr", phone="+33 4 71 47 73 75"
- OSM (low, 172m, sim=0.609): name="Golf de Haute Auvergne", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.609)
  - email: from fed(high, sim=0.609)
  - phone: from fed(high, sim=0.609)

### Golf de Joyenval (France, 2 courses)

- DB: addr="-, Chambourcy", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:1839m,city:chambourcy,db-name-substring,jaccard:1.00], 1839m, 78240 CHAMBOURCY): name="GOLF DE JOYENVAL", web="https://www.golfdejoyenval.com", email="joyenval@golfdejoyenval.com", phone="+33 1 39 22 27 50"
- OSM (low, 1694m, sim=1): name="Golf de Joyenval", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de l'École de l'Air (France, 1 courses)

- DB: addr="701 Chemin Saint Jean, Salon-de-Provence", web="https://golfecoledelair.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:salon,jaccard:1.00], 0m, 13661 SALON AIR): name="GOLF DE L'ECOLE DE L'AIR", web="https://golfecoledelair.fr", email="golf-ecole-air@wanadoo.fr", phone="+33 4 13 93 83 61"
- OSM (medium, 422m, sim=1): name="Golf de l'école de l'air", web="http://club.golfdelecoledelair.pagesperso-orange.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### GOLF DE L'ILE D'OR (France, 2 courses)

- DB: addr="L'Ile Dorelle, Le Cellier", web=null, email=null, phone=null
- ffgolf (high, sim=0.8, boost=+0.7[coord:58m,jaccard:1.00], 58m, 49270 LA VARENNE): name="GOLF ILE D'OR", web="https://www.golfdenantesiledor.com", email="nantesiledor@wanadoo.fr", phone="+33 2 40 98 58 00"
- OSM (high, 52m, sim=0.8): name="Golf Île d'Or", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.8)
  - email: from fed(high, sim=0.8)
  - phone: from fed(high, sim=0.8)

### Golf de l'Isle Adam (France, 1 courses)

- DB: addr="1 Chemin des Vanneaux, L'Isle-Adam", web="https://www.golfisleadam.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:isle,db-name-substring,jaccard:1.00], 0m, 95290 L'ISLE ADAM): name="GOLF DE L'ISLE ADAM", web="https://www.golfisleadam.com", email="contact@golfisleadam.com", phone="+33 1 34 08 11 11"
- OSM (low, 829m, sim=1): name="Golf de l'Isle Adam", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de la baie de morlaix (France, 1 courses)

- DB: addr="Rue François de Kergrist, Carantec", web="https://www.golf-baiedemorlaix.bzh/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:carantec,db-name-substring,jaccard:1.00], 0m, 29660 CARANTEC): name="GOLF DE LA BAIE DE MORLAIX", web="https://www.golf-baiedemorlaix.bzh/", email="accueil@golf-baiedemorlaix.bzh", phone="+33 2 98 67 09 14"
- OSM (medium, 322m, sim=1): name="Golf de la baie de Morlaix", web="https://www.golf-baiedemorlaix.bzh/", email="carantec.golf@gmail.com", phone="+33 2 98 67 09 14"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de la Bretesche (France, 1 courses)

- DB: addr="-, Missillac", web="https://www.golf-bretesche.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:missillac,db-name-substring,jaccard:1.00], 0m, 44780 MISSILLAC): name="GOLF DE LA BRETESCHE", web="https://www.golf-bretesche.com", email="golf@golf-bretesche.com", phone="+33 2 51 76 86 86"
- OSM (low, 585m, sim=1): name="Golf de la Bretesche", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de la Carte (France, 2 courses)

- DB: addr="D952, Valloire-sur-Cisse", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:242m,city:cisse,db-name-substring,jaccard:1.00], 242m, 41150 CHOUZY SUR CISSE): name="GOLF DE LA CARTE", web="http://www.domainedelacarte.fr/", email="reception@golf-hotel-la-carte.fr", phone="+33 2 54 20 49 00"
- OSM (high, 209m, sim=1): name="Golf du Domaine de la Carte", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de la Chassagne (France, 1 courses)

- DB: addr="Chemin de la Chassagne , Malain", web="https://www.golflachassagne.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:malain,db-name-substring,jaccard:1.00], 0m, 21410 MALAIN): name="GOLF DE LA CHASSAGNE", web="https://www.golflachassagne.com", email="contact@golflachassagne.com", phone="+33 3 80 40 78 57"
- OSM (low, 566m, sim=1): name="Golf de la Chassagne", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de la Commanderie (France, 1 courses)

- DB: addr="887 B Route de Mâcon, Crottet", web="https://www.golflacommanderie.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:crottet,db-name-substring,jaccard:1.00], 0m, 01290 CROTTET): name="GOLF DE LA COMMANDERIE", web="https://www.golflacommanderie.com", email="info@golflacommanderie.com", phone="+33 3 85 30 44 12"
- OSM (medium, 314m, sim=1): name="Golf de la Commanderie", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De La Drôme Provençale (France, 1 courses)

- DB: addr="chemin de la balle blanche, Clansayes", web="https://www.golf-dromeprovencale.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:clansayes,jaccard:1.00,typo:provençale~provencale], 0m, 26130 CLANSAYES): name="GOLF DE LA DROME-PROVENCALE", web="https://www.golf-dromeprovencale.com", email="contact@golf-dromeprovencale.com", phone="+33 4 75 98 57 03"
- OSM (high, 82m, sim=1): name="Golf de la Drôme Provencale", web="https://www.golf-dromeprovencale.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de la Forêt de Chantilly (France, 1 courses)

- DB: addr="4 Route d'Apremont, Vineuil-Saint-Firmin", web="https://jouer.golf/foret-de-chantilly/", email=null, phone=null
- ffgolf (high, sim=0.682, boost=+0.92[coord:0m,city:vineuil,jaccard:0.75], 0m, 60500 VINEUIL SAINT FIRMIN): name="GARDEN GOLF FORET DE CHANTILLY", web="https://jouer.golf/foret-de-chantilly/", email="contact.chantilly@ugolf.eu", phone="+33 3 44 58 47 74"
- OSM (no-match, 1128m, sim=0.6): name="Golf de Chantilly", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.682)
  - phone: from fed(high, sim=0.682)

### Golf de la Forge (France, 1 courses)

- DB: addr="Route de Belvès, Siorac-en-Perigord", web="http://www.golfdelaforge.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:siorac,db-name-substring,jaccard:1.00], 0m, 24170 SIORAC EN PERIGORD): name="GOLF DE LA FORGE", web="http://www.golfdelaforge.com", email="golfdelaforge@gmail.com", phone="+33 5 53 31 99 76"
- OSM (high, 161m, sim=1): name="Golf de la Forge", web="https://golfdelaforge.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De La Freslonnière (France, 1 courses)

- DB: addr="Le Bois Briand, Le Rheu", web="https://www.golfdelafreslonniere.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:rheu,jaccard:1.00,typo:freslonnière~freslonniere], 0m, 35650 LE RHEU): name="GOLF DE LA FRESLONNIERE", web="https://www.golfdelafreslonniere.com", email="contact@golfdelafreslonniere.com", phone="+33 2 99 14 84 09"
- OSM (low, 576m, sim=1): name="Golf de la Freslonnière", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de la Gloriette (France, 2 courses)

- DB: addr="50 Route de Savonnières, Tours", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.1[coord:293m,city:tours,db-name-substring,jaccard:1.00], 293m, 37200 TOURS): name="GOLF DE LA GLORIETTE", web="https://golfdelagloriette.com", email="golfdelagloriette@gmail.com", phone="+33 2 47 67 00 32"
- OSM (high, 30m, sim=1): name="Golf de la Gloriette", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de La Grande Romanie (France, 2 courses)

- DB: addr="La Grande Romanie, Courtisols", web=null, email=null, phone=null
- ffgolf (high, sim=0.35, boost=+0.7[coord:211m,city:courtisols], 211m, 51460 COURTISOLS): name="GOLF DE CHALONS EN CHAMPAGNE", web="http://www.par72.net", email="golfdelagranderomanie@gmail.com", phone="+33 3 26 66 65 97"
- OSM (high, 64m, sim=1): name="Golf de la Grande Romanie", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.35)
  - email: from fed(high, sim=0.35)
  - phone: from fed(high, sim=0.35)

### Golf De La Grange Aux Ormes (France, 2 courses)

- DB: addr="Rue de la Grange aux Ormes, Marly", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.1[coord:660m,city:marly,db-name-substring,jaccard:1.00], 660m, 57155 MARLY): name="GOLF DE LA GRANGE AUX ORMES", web="http://www.grange-aux-ormes.com", email="info@grange-aux-ormes.com", phone="+33 3 87 63 10 62"
- OSM (high, 173m, sim=1): name="Golf de la Grange aux Ormes", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de la Jonchère (France, 1 courses)

- DB: addr="MontGrenier, Gouzon", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.05[coord:595m,city:gouzon,jaccard:1.00,typo:jonchère~jonchere], 595m, 23230 GOUZON): name="GOLF DE LA JONCHERE", web="https://www.golfdelajonchere.com", email="accueil@golfdelajonchere.com", phone="+33 5 55 62 76 60"
- OSM (high, 22m, sim=1): name="Golf de la Jonchère", web="https://www.golfdelajonchere.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de la Manchette (France, 1 courses)

- DB: addr="396 Promenade de la Manchette, Prévessin-Moëns", web="https://www.golfmanchette.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 01280 PREVESSIN-MOENS): name="GOLF DE LA MANCHETTE", web="https://www.golfmanchette.fr", email="contact@golfmanchette.fr", phone="+33 4 50 41 19 01"
- OSM (low, 523m, sim=1): name="Golf de la Manchette", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de la Marsaudière (France, 1 courses)

- DB: addr="-, Chevry-Cossigny", web="https://www.lamarsaudiere.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:chevry,jaccard:1.00,typo:marsaudière~marsaudiere], 0m, 77173 CHEVRY COSSIGNY): name="GOLF DE LA MARSAUDIERE", web="https://www.lamarsaudiere.fr", email="contact@lamarsaudiere.fr", phone="+33 1 64 07 87 51"
- OSM (high, 73m, sim=1): name="Golf de la Marsaudière", web="https://www.lamarsaudiere.fr/", email=null, phone="+33 1 64 07 87 51"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de la Nivelle (France, 1 courses)

- DB: addr="Place William Sharp, Ciboure", web="http://www.golfdelanivelle.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:ciboure,db-name-substring,jaccard:1.00], 0m, 64500 CIBOURE): name="GOLF DE LA NIVELLE", web="http://www.golfdelanivelle.com", email="accueil@golfnivelle.com", phone="+33 5 59 47 18 99"
- OSM (low, 609m, sim=1): name="Golf de la Nivelle", web="http://www.golfnivelle.com", email="accueil@golfnivelle.com", phone="+33 5 59 47 18 99"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de la Picardière (France, 2 courses)

- DB: addr="Chemin de la Picardière, Vierzon", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.05[coord:311m,city:vierzon,jaccard:1.00,typo:picardière~picardiere], 311m, 18100 VIERZON): name="PICARDIERE GOLF CLUB", web="https://golfdelapicardiere.com", email="contact@golfdelapicardiere.com", phone="+33 2 48 75 21 43"
- OSM (high, 120m, sim=1): name="Golf de la Picardière", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de la Presqu’île (France, 1 courses)

- DB: addr="13 Chemin du Relais de Mer, La Faute sur Mer", web="https://www.golfdelapresquile.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:faute,jaccard:1.00], 0m, 85460 LA FAUTE SUR MER): name="GOLF DE LA PRESQU'ILE", web="https://www.golfdelapresquile.fr", email="direction@golfdelapresquile.fr", phone="+33 2 51 30 73 85"
- OSM (no-match, 1095m, sim=0.556): name="Golf 9 trous de la Presqu'île", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de la Sorelle (France, 1 courses)

- DB: addr="-, Villette-sur-Ain", web="https://www.golf-lasorelle.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:villette,db-name-substring,jaccard:1.00], 0m, 01320 VILLETTE SUR AIN): name="GOLF DE LA SORELLE", web="https://www.golf-lasorelle.com", email="secretariat@golf-lasorelle.com", phone="+33 4 74 35 47 27"
- OSM (high, 157m, sim=1): name="Golf de la Sorelle", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de la Valdaine (France, 1 courses)

- DB: addr="1075 Rue du Monard, Montboucher-sur-Jabron", web="http://www.domainedelavaldaine.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:montboucher,db-name-substring,jaccard:1.00], 0m, 26740 MONTBOUCHER SUR JABRON): name="GOLF DE LA VALDAINE", web="http://www.domainedelavaldaine.com", email="golf@domainedelavaldaine.com", phone="+33 4 75 00 71 33"
- OSM (high, 165m, sim=1): name="Golf de la Valdaine", web="https://www.domainedelavaldaine.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De La Vanade (France, 1 courses)

- DB: addr="Route de Grasse, Villeneuve-Loubet", web="https://www.golf-vanade.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:villeneuve,db-name-substring,jaccard:1.00], 0m, 06270 VILLENEUVE LOUBET): name="GOLF DE LA VANADE", web="https://www.golf-vanade.com/", email="golfvanade@gmail.com", phone="+33 4 92 02 24 61"
- OSM (medium, 281m, sim=1): name="Golf de la Vanade", web="https://www.golf-vanade.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Laguiole-Mezeyrac (France, 1 courses)

- DB: addr="Soulages-Bonneval - Lac des Galens , Laguiole", web=null, email=null, phone=null
- ffgolf (high, sim=0.294, boost=+0.7[coord:94m,city:soulages], 94m, 12210 SOULAGES BONNEVAL): name="GOLF DE L'AUBRAC", web="https://www.golfdelaubrac.com", email="contact@golfdelaubrac.com", phone="+33 5 65 48 11 37"
- OSM (low, 104m, sim=0.471): name="Domaine de Mezeyrac", web="http://www.hotel-laguiole.com/", email="domainedemezeyarc@gmail.com", phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.294)
  - email: from fed(high, sim=0.294)
  - phone: from fed(high, sim=0.294)

### Golf de Lancieux Gaea (France, 1 courses)

- DB: addr="Avenue des Ajoncs, Lancieux", web="https://www.gaea.fr", email=null, phone=null
- ffgolf (high, sim=0.231, boost=+1[coord:0m,city:lancieux,jaccard:1.00], 0m, 22770 LANCIEUX): name="GAEA GOLF DE LANCIEUX", web="https://www.gaea.fr", email="gaealancieux@orange.fr", phone="+33 2 96 86 31 42"
- OSM (low, 121m, sim=0.231): name="GAEA Golf de Lancieux", web="http://www.gaea.fr", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.231)
  - phone: from fed(high, sim=0.231)

### Golf de Laval (France, 2 courses)

- DB: addr="La chabossiére, Changé", web=null, email=null, phone=null
- ffgolf (high, sim=0.5, boost=+0.45[coord:595m,jaccard:0.67], 595m, 53810 CHANGE): name="GOLF CLUB DU PAYS DE LAVAL", web="https://www.golfdelaval.fr", email="accueil@golfdelaval.fr", phone="+33 2 43 53 16 03"
- OSM (high, 57m, sim=1): name="Golf de Laval", web="https://www.golfdelaval.fr/", email="accueil@golfdelaval.fr", phone="+33 2 43 53 16 03"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.5)
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Golf De Léry-Poses (France, 2 courses)

- DB: addr="D110, Poses", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:391m,city:poses,jaccard:1.00], 391m, 27740 POSES): name="GOLF DE LERY POSES", web="https://www.golfleryposes.fr", email="info@golfdeleryposes.com", phone="+33 2 32 59 47 42"
- OSM (high, 104m, sim=1): name="Golf de Léry-Poses", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De Lésigny-Réveillon (France, 9 courses)

- DB: addr="Ferme des Hyverneaux, Lésigny", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.75[coord:482m,jaccard:1.00,typo:lésigny~lesigny], 482m, 77150 LESIGNY): name="GOLF DE LESIGNY-REVEILLON", web="https://www.golflesigny.com", email="accueil@golflesigny.com", phone="+33 1 60 02 17 33"
- OSM (medium, 356m, sim=1): name="Golf de Lésigny-Réveillon", web=null, email=null, phone=null

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Loudun-Fontevraud (France, 2 courses)

- DB: addr="-, Roiffé", web="https://www.domainederoiffe.fr/se-divertir/golf", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 86120 ROIFFE): name="GOLF DE LOUDUN-FONTEVRAUD", web="https://www.domainederoiffe.fr/se-divertir/golf", email="info@domainederoiffe.fr", phone="+33 5 49 22 48 17"
- OSM (medium, 475m, sim=1): name="Golf de Loudun-Fontevraud", web="https://www.golfdomainederoiffe.fr", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Loudun-Fontevraud - Domaine de Roiffé (France, 2 courses)

- DB: addr="Route de Fontevraud, Roiffé", web=null, email=null, phone=null
- ffgolf (high, sim=0.708, boost=+0.43[coord:372m,jaccard:0.60], 372m, 86120 ROIFFE): name="GOLF DE LOUDUN-FONTEVRAUD", web="https://www.domainederoiffe.fr/se-divertir/golf", email="info@domainederoiffe.fr", phone="+33 5 49 22 48 17"
- OSM (high, 136m, sim=0.708): name="Golf de Loudun-Fontevraud", web="https://www.golfdomainederoiffe.fr", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.708)
  - email: from fed(high, sim=0.708)
  - phone: from fed(high, sim=0.708)

### Golf de Luxeuil-Bellevue (France, 1 courses)

- DB: addr="-, Genevrey", web=null, email=null, phone=null
- ffgolf (no-match, sim=0.125, boost=+0.55[coord:589m,city:genevrey], 589m, 70240 GENEVREY): name="GOLF DES VOSGES DU SUD", web="https://golfluxeuil.com", email="golfdeluxeuilbellevue@wanadoo.fr", phone="+33 3 84 95 82 00"
- OSM (high, 9m, sim=1): name="Golf de Luxeuil-Bellevue", web="https://www.golfluxeuil.com/", email="golfdeluxeuilbellevue@wanadoo.fr", phone="+33 3 84 95 82 00"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 9m, sim=1)
  - email: from osm(high, 9m, sim=1)
  - phone: from osm(high, 9m, sim=1)

### Golf de Lyon Verger (France, 2 courses)

- DB: addr="1350 Chemin de l'Allemande, Saint-Symphorien-d'Ozon", web="https://www.golf-lyonverger.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:saint,db-name-substring,jaccard:1.00], 0m, 69360 SAINT SYMPHORIEN D'OZON): name="GOLF DE LYON VERGER", web="https://www.golf-lyonverger.com", email="info@golf-lyonverger.com", phone="+33 4 78 02 84 20"
- OSM (high, 218m, sim=1): name="Golf de Lyon Verger", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Maisons Laffitte (France, 1 courses)

- DB: addr="1 Avenue de la Pelouse, Maisons-Laffitte", web="https://www.golfml.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:maisons,jaccard:1.00], 0m, 78600 MAISONS LAFFITTE): name="GOLF DE MAISONS-LAFFITTE", web="https://www.golfml.com", email="accueil@golfml.fr", phone="+33 1 39 62 37 92"
- OSM (medium, 315m, sim=1): name="Golf de Maisons Laffitte", web="https://www.golfml.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Marcilly (France, 3 courses)

- DB: addr="Domaine de la plaine, Marcilly", web=null, email=null, phone=null
- ffgolf (high, sim=0.5, boost=+1.15[coord:245m,city:marcilly,db-name-substring,jaccard:0.67], 245m, 45240 MARCILLY EN VILLETTE): name="GOLF DE MARCILLY-ORLEANS", web="https://www.marcilly.com/", email="golf@marcilly.com", phone="+33 2 38 76 11 73"
- OSM (high, 74m, sim=1): name="Golf de Marcilly", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=0.5)
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Golf de Margaux - Médoc - Bordeaux (France, 1 courses)

- DB: addr="5 Route de l'isle Vincent, Margaux-Cantenac", web=null, email=null, phone=null
- ffgolf (high, sim=0.318, boost=+0.85[coord:80m,city:margaux,jaccard:0.50], 80m, 33460 MARGAUX): name="GOLF DE MARGAUX", web="https://www.relais-margaux.com/golf/", email="golf@relais-margaux.fr", phone="+33 5 57 88 38 30"
- OSM (low, 56m, sim=0.364): name="Garden Golf de Margaux", web="www.gardengolfmargaux.com", email=null, phone="+33 5 57 88 87 40"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.318)
  - email: from fed(high, sim=0.318)
  - phone: from fed(high, sim=0.318)

### Golf de Maudetour (France, 1 courses)

- DB: addr="7 Route des Bruyères, Maudétour-en-Vexin", web=null, email=null, phone=null
- ffgolf (no-match, sim=0.15, boost=+0.5[city:vexin,name-token:vexin], 20726m, 60240 CHAUMONT-EN-VEXIN): name="GOLF CC DE CHAUMONT-EN-VEXIN", web="http://www.golf-de-chaumont.com", email="infos@golf-de-chaumont.com", phone="+33 3 44 49 00 81"
- OSM (high, 138m, sim=1): name="Golf de Maudétour", web="https://www.golfmaudetour.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 138m, sim=1)

### Golf de Meaux-Boutigny (France, 2 courses)

- DB: addr="Rue de Barrois, Boutigny", web="https://www.golf-meaux-boutigny.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:boutigny,jaccard:1.00], 0m, 77470 BOUTIGNY): name="GOLF DE MEAUX BOUTIGNY", web="https://www.golf-meaux-boutigny.com/", email="contact@golfmb.fr", phone="+33 1 60 25 63 98"
- OSM (low, 645m, sim=1): name="Golf de Meaux-Boutigny", web="https://www.golf-meauxboutigny.com/", email=null, phone="+33 1 30 25 63 98"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Metz Chérisey (France, 1 courses)

- DB: addr="38 Rue principale, CHERISEY", web="https://jouer.golf/golf/ugolf-chateau-de-metz-cherisey/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.4[coord:0m,city:cherisey,name-token:cherisey,jaccard:1.00,typo:chérisey~cherisey], 0m, 57420 CHERISEY): name="GOLF DE METZ CHERISEY", web="https://jouer.golf/golf/ugolf-chateau-de-metz-cherisey/", email="contact@exclusivgolf-cherisey.fr", phone="+33 3 87 52 70 18"
- OSM (low, 678m, sim=0.615): name="Golf de Chérisey", web="https://jouer.golf/cherisey/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Moliets (France, 2 courses)

- DB: addr="Rue Mathieu Desbieys, MOLIETS", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.1[coord:941m,city:moliets,db-name-substring,jaccard:1.00], 941m, 40660 MOLIETS ET MAA): name="GOLF DE MOLIETS", web="https://www.golfmoliets.com", email="moliets@resonance.golf", phone="+33 5 58 48 54 65"
- OSM (medium, 427m, sim=1): name="Golf de Moliets", web="https://www.golfmoliets.com", email="contact@golfmoliets.com", phone="+33 5 58 48 54 65"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Montauban L' Estang (France, 1 courses)

- DB: addr="849 Route de l'Aveyron, Montauban", web="https://www.golfdemontauban.fr", email=null, phone=null
- ffgolf (high, sim=0.55, boost=+0.45[city:montauban,jaccard:0.50], 3725m, 82000 MONTAUBAN): name="GOLF DE MONTAUBAN AIGUILLONS", web="https://golflesaiguillons.wordpress.com/", email="contactlesaiguillons@gmail.com", phone="+33 5 63 31 35 40"
- OSM (low, 716m, sim=1): name="Golf de Montauban l'Estang", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.55)
  - phone: from fed(high, sim=0.55)

### Golf de Montpellier Massane (France, 2 courses)

- DB: addr="485 Avenue du Golf, Baillargues", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:115m,city:baillargues,jaccard:1.00], 115m, 34670 BAILLARGUES): name="GOLF CLUB MONTPELLIER MASSANE", web="https://www.horizon-resort.com/fr/", email="golf@horizon-resort.com", phone="+33 4 67 87 87 89"
- OSM (low, 552m, sim=1): name="Golf de Montpellier Massane", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De Morfontaine (France, 1 courses)

- DB: addr="Mortefontaine", web="https://www.golfdemorfontaine.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:mortefontaine,db-name-substring,jaccard:1.00], 0m, 60128 MORTEFONTAINE): name="GOLF DE MORFONTAINE", web="https://www.golfdemorfontaine.fr", email="golf@golfdemorfontaine.fr", phone="+33 3 44 54 68 27"
- OSM (medium, 296m, sim=1): name="Golf de Morfontaine", web="https://www.golfdemorfontaine.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Mornex (France, 1 courses)

- DB: addr="778 Route d'Esserts, Monnetier-Mornex", web="http://www.golf-mornex.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:monnetier,db-name-substring,jaccard:1.00], 0m, 74560 MONNETIER - MORNEX): name="GOLF DE MORNEX", web="http://www.golf-mornex.com/", email="nicolas.outters@golf-mornex.com", phone="+33 7 52 02 97 19"
- OSM (high, 107m, sim=1): name="Golf de Mornex", web="http://golf-mornex.com", email=null, phone="+33 4 50 36 58 20"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Mourmelon (France, 1 courses)

- DB: addr="-, Mourmelon-le-Petit", web=null, email=null, phone=null
- ffgolf (high, sim=0.643, boost=+1[coord:339m,city:mourmelon,db-name-substring,jaccard:0.67], 339m, 51400 MOURMELON LE GRAND): name="GOLF DE MOURMELON (CSAG)", web="https://www.golfdemourmelon.com", email="golfdemourmelon1@gmail.com", phone="+33 6 73 64 25 68"
- OSM (high, 152m, sim=1): name="Golf de Mourmelon", web="https://www.golfdemourmelon.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.643)
  - email: from fed(high, sim=0.643)
  - phone: from fed(high, sim=0.643)

### Golf de Nancy - Aingeray (France, 1 courses)

- DB: addr="1 Chemin du Golf, Aingeray", web="https://jouer.golf/nancy-aingeray/", email=null, phone=null
- ffgolf (high, sim=0.7, boost=+0.85[coord:0m,city:aingeray,jaccard:0.50], 0m, 54460 AINGERAY): name="UGOLF NANCY AINGERAY", web="https://jouer.golf/nancy-aingeray/", email="commercial@exclusivgolf-aingeray.fr", phone="+33 3 83 24 53 87"
- OSM (low, 412m, sim=0.357): name="Golf Club de Nancy", web="http://www.golf-nancy.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.7)
  - phone: from fed(high, sim=0.7)

### Golf De Nantes (France, 1 courses)

- DB: addr="RD 81, Vigneux de Bretagne", web="http://www.golfclubdenantes.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:vigneux,db-name-substring,jaccard:1.00], 0m, 44360 VIGNEUX DE BRETAGNE): name="GOLF DE NANTES", web="http://www.golfclubdenantes.com", email="accueil@golfclubdenantes.com", phone="+33 2 40 63 25 82"
- OSM (low, 503m, sim=1): name="Golf de Nantes", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Nantes Carquefou (France, 1 courses)

- DB: addr="1 Boulevard de l'Epinay, Carquefou", web=null, email=null, phone=null
- ffgolf (high, sim=0.75, boost=+0.7[coord:366m,city:carquefou,jaccard:0.50], 366m, 44470 CARQUEFOU): name="GARDEN GOLF DE CARQUEFOU", web="https://jouer.golf/golf/ugolf-nantes-carquefou/", email="contact@gardengolf-carquefou.fr", phone="+33 2 40 52 73 74"
- OSM (low, 93m, sim=0.563): name="Golf de Carquefou", web="https://jouer.golf/carquefou/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.75)
  - email: from fed(high, sim=0.75)
  - phone: from fed(high, sim=0.75)

### Golf de Nîmes Vacquerolles (France, 1 courses)

- DB: addr="1075 Chemin du Golf, Nîmes", web="https://www.golf-nimes.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:0m,jaccard:1.00], 0m, 30900 NIMES): name="GOLF DE NIMES VACQUEROLLES", web="https://www.golf-nimes.com", email="contact@golf-nimes.com", phone="+33 4 66 23 33 33"
- OSM (high, 176m, sim=1): name="Golf de Nîmes Vacquerolles", web="http://www.golf-nimes.com/", email=null, phone="+33466233333"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Normandie Côte d'Albâtre (France, 2 courses)

- DB: addr="485 Route du Golf, Saint-Riquier-és-Plains", web=null, email=null, phone=null
- ffgolf (high, sim=0.667, boost=+1.08[coord:245m,city:saint,jaccard:0.60,typo:albâtre~albatre], 245m, 76460 SAINT RIQUIER ES PLAINS): name="GOLF AUX DAIMS COTE D'ALBATRE", web=null, email="accueil@golfauxdaims.fr", phone=null
- OSM (no-match, 741722m, sim=0.417): name="Golf de la Grande Motte", web="https://www.golflagrandemotte.com", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.667)

### Golf De Pen Ar Bed (France, 2 courses)

- DB: addr="Coat Camp Huella, Lanrivoaré", web="http://www.as-golf-pen-ar-bed.ccm", email=null, phone=null
- ffgolf (high, sim=0.625, boost=+0.55[coord:0m,jaccard:0.50], 0m, 29290 LANRIVOARE): name="GOLF DE BREST PEN-AR-BED", web="http://www.as-golf-pen-ar-bed.ccm", email="golfpenarbed@orange.fr", phone="+33 2 98 84 98 92"
- OSM (high, 82m, sim=1): name="Golf Pen Ar Bed", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.625)
  - phone: from fed(high, sim=0.625)

### Golf de Pinsolle (France, 1 courses)

- DB: addr="Port d\\'Albret sud, SOUSTONS PLAGE", web=null, email=null, phone=null
- ffgolf (high, sim=0.471, boost=+0.95[coord:562m,city:soustons,name-token:soustons,jaccard:0.67], 562m, 40140 SOUSTONS PLAGE): name="GOLF DE SOUSTONS-PINSOLLE", web="https://golfdepinsolle.com", email="contact@golfdepinsolle.com", phone="+33 5 58 48 03 92"
- OSM (medium, 257m, sim=1): name="Golf de Pinsolle", web="https://www.golfdepinsolle.com/", email="contact@golfdepinsolle.com", phone="+33 5 58 48 03 92"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.471)
  - email: from fed(high, sim=0.471)
  - phone: from fed(high, sim=0.471)

### Golf de Ploemeur Ocean (France, 1 courses)

- DB: addr="Saint jude - kerham, Ploemeur", web="https://bluegreen.fr/ploemeur", email=null, phone=null
- ffgolf (high, sim=0.583, boost=+0.92[coord:0m,city:ploemeur,jaccard:0.75], 0m, 56270 PLOEMEUR): name="GOLF BLUEGREEN PLOEMEUR-OCEAN", web="https://bluegreen.fr/ploemeur", email="ploemeur@bluegreen.fr", phone="+33 2 97 32 81 82"
- OSM (high, 188m, sim=1): name="Golf de Ploemeur Océan", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.583)
  - phone: from fed(high, sim=0.583)

### Golf de Poitiers-Châlons (France, 1 courses)

- DB: addr="2 Rue François Prat, Poitiers", web="https://golf-poitiers-chalons.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:poitiers,jaccard:1.00,typo:châlons~chalons], 0m, 86000 POITIERS): name="GOLF DE POITIERS-CHALONS", web="https://golf-poitiers-chalons.fr", email="accueil@golf-poitiers-chalons.fr", phone="+33 7 66 35 19 81"
- OSM (medium, 438m, sim=1): name="Golf de Poitiers-Châlons", web="https://golf-poitiers-chalons.fr/", email="joan.roch@wanadoo.fr", phone="+33 5 49 56 13 38"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Porte de Savoie (France, 1 courses)

- DB: addr="145 Chemin du Canton, Porte-de-Savoie", web="https://www.golf-portedesavoie.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:porte,jaccard:1.00], 0m, 73800 PORTE DE SAVOIE): name="PORTE DE SAVOIE GOLF CLUB", web="https://www.golf-portedesavoie.com", email="info@golf-portedesavoie.com", phone="+33 4 58 14 14 03"
- OSM (low, 1576m, sim=1): name="Golf de Porte-de-Savoie", web="https://golf-portedesavoie.com/", email="info@golf-portedesavoie.com", phone="+33 4 58 14 14 03"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Pre lamy (France, 1 courses)

- DB: addr="-, Vic-sous-Thil", web="https://golf-prelamy.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:sous,jaccard:1.00], 0m, 21390 PRECY SOUS THIL): name="GOLF DU PRE LAMY", web="https://golf-prelamy.com", email="golfprelamy@orange.fr", phone="+33 3 80 64 46 83"
- OSM (high, 229m, sim=1): name="Golf du pré lamy", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Prunevelle (France, 1 courses)

- DB: addr="Les Petits Bans, Dampierre-sur-le-Doubs", web="https://www.golf-prunevelle.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:dampierre,db-name-substring,jaccard:1.00], 0m, 25420 DAMPIERRE SUR LE DOUBS): name="GOLF DE PRUNEVELLE", web="https://www.golf-prunevelle.com", email="contact@golf-prunevelle.com", phone="+33 3 81 98 11 77"
- OSM (medium, 269m, sim=1): name="Golf de Prunevelle", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Raray (France, 3 courses)

- DB: addr="4 Rue Nicolas de Lancy, Raray", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.1[coord:698m,city:raray,db-name-substring,jaccard:1.00], 698m, 60810 RARAY): name="GOLF DE RARAY", web="https://jouer.golf/raray/", email="contact.raray@ugolf.eu", phone="+33 3 44 54 70 61"
- OSM (medium, 325m, sim=1): name="Golf du Château de Raray", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Roquebrune (France, 1 courses)

- DB: addr="1308 route du golf, Roquebrune sur Argens", web="https://www.golfderoquebrune.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:roquebrune,db-name-substring,jaccard:1.00], 0m, 83520 ROQUEBRUNE SUR ARGENS): name="GOLF DE ROQUEBRUNE", web="https://www.golfderoquebrune.com", email="roquebrune@resonance.golf", phone="+33 4 94 19 60 35"
- OSM (high, 177m, sim=1): name="Golf de Roquebrune", web="https://www.golfderoquebrune.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Rouen Mont St Aignan (France, 1 courses)

- DB: addr="Rue Francis Poulenc, Mont-Saint-Aignan", web="http://www.golfderouen.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:mont,db-name-substring,jaccard:1.00], 0m, 76130 MONT SAINT AIGNAN): name="GOLF DE ROUEN MONT ST AIGNAN", web="http://www.golfderouen.fr", email="contact@golfderouen.com", phone="+33 2 35 76 38 65"
- OSM (low, 675m, sim=1): name="Golf de Rouen Mont-Saint-Aignan", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Rougemont-le-Château (France, 1 courses)

- DB: addr=" Route de Masevaux, Rougemont-le-Château", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.05[coord:493m,city:rougemont,jaccard:1.00,typo:château~chateau], 493m, 90110 ROUGEMONT LE CHATEAU): name="GOLF DE ROUGEMONT LE CHATEAU", web="https://www.golf-rougemont.com/", email="contact@golf-rougemont.com", phone="+33 3 84 23 74 74"
- OSM (high, 233m, sim=1): name="Golf de Rougemont-le-Château", web="https://www.golf-rougemont.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Royan (France, 2 courses)

- DB: addr="Maine Gaudin - 7, rue de la Palmyre, Saint Palais sur Mer", web="https://www.golfderoyan.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:saint,db-name-substring,jaccard:1.00], 0m, 17420 SAINT PALAIS SUR MER): name="GOLF DE ROYAN", web="https://www.golfderoyan.com", email="golfderoyan@wanadoo.fr", phone="+33 5 46 23 16 24"
- OSM (medium, 444m, sim=1): name="Golf de Royan", web="https://www.golfderoyan.com/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Sablé Solesmes (France, 9 courses)

- DB: addr="997 Rte de l'Outinière, Sablé-sur-Sarthe", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:295m,city:sarthe,jaccard:1.00], 295m, 72300 SABLE SUR SARTHE): name="GOLF DE SABLE-SOLESMES", web="https://www.golfsablesolesmes.com/", email="accueil@golfsablesolesmes.com", phone="+33 2 43 95 28 78"
- OSM (high, 119m, sim=1): name="Golf de Sablé-Solesmes", web="https://www.golfsablesolesmes.com/", email=null, phone=null

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Saint Cloud (France, 3 courses)

- DB: addr="60 Rue de 19 Janvier, Paris", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.8[coord:505m,db-name-substring,jaccard:1.00], 505m, 92380 GARCHES): name="GOLF DE SAINT CLOUD", web="https://golfdesaintcloud.com", email="accueil@golfsaintcloud.com", phone="+33 1 47 01 01 85"
- OSM (high, 96m, sim=1): name="Golf de Saint-Cloud", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De Saint Donat (France, 2 courses)

- DB: addr="270 Route de Cannes, Grasse", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.9[coord:242m,city:grasse,jaccard:0.67], 242m, 06130 PLAN DE GRASSE): name="GOLF COUNTRY CLUB DE ST DONAT", web="https://www.golfsaintdonat.com", email="info@golfsaintdonat.com", phone="+33 4 93 09 76 60"
- OSM (high, 203m, sim=1): name="Golf Country Club de Saint-Donat", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De Saint Germain (France, 2 courses)

- DB: addr="Route de Poissy, Saint-Germain-en-Laye", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:384m,city:saint,jaccard:1.00], 384m, 78100 SAINT GERMAIN EN LAYE): name="GOLF DE SAINT-GERMAIN", web="https://www.golfstg.org/", email="directeur@golfstg.org", phone="+33 1 39 10 30 30"
- OSM (low, 89m, sim=0.467): name="Golf de Saint-Germain-en-Laye", web="https://www.golfstg.org/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Saint Martin de Crau (France, 1 courses)

- DB: addr="La Baïsse de Raillon, Saint Martin de Crau ", web="https://golfsaintmartindecrau.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:saint,db-name-substring,jaccard:1.00], 0m, 13310 SAINT MARTIN DE CRAU): name="GOLF DE SAINT MARTIN DE CRAU", web="https://golfsaintmartindecrau.com/", email="golfcsm@wanadoo.fr", phone="+33 4 86 52 03 41"
- OSM (high, 101m, sim=1): name="Golf de Saint Martin de Crau", web="https://golfsaintmartindecrau.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De Saint Quentin Mesnil (France, 1 courses)

- DB: addr="3 Rue du Chêne Cambrie, Mesnil-Saint-Laurent", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.1[coord:432m,city:mesnil,db-name-substring,jaccard:1.00], 432m, 02720 MESNIL SAINT LAURENT): name="GOLF DE SAINT QUENTIN MESNIL", web="https://www.golf-saint-quentin.org", email="golf-saint-quentin@wanadoo.fr", phone="+33 3 23 68 19 48"
- OSM (high, 108m, sim=1): name="Golf de Saint-Quentin - Mesnil", web="http://www.golf-saint-quentin.org/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Saint Samson (France, 1 courses)

- DB: addr="Route du Golf, Pleumeur-Bodou", web="https://www.golfhotel-saint-samson.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:pleumeur,db-name-substring,jaccard:1.00], 0m, 22560 PLEUMEUR BODOU): name="GOLF DE SAINT SAMSON", web="https://www.golfhotel-saint-samson.com", email="contact@golfhotel22.fr", phone="+33 2 96 23 87 34"
- OSM (medium, 355m, sim=1): name="Golf de Saint-Samson", web="https://www.golfhotel-saint-samson.com/golf-bretagne.html", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Saint Sebastien sur Loire (France, 1 courses)

- DB: addr="Stade René Massé 1, Bd des pas enchantés, Saint-Sébastien-sur-Loire", web="https://www.golf-saint-sebastien-sur-loire.fr", email=null, phone=null
- ffgolf (high, sim=0.864, boost=+1.25[coord:0m,city:saint,db-name-substring,jaccard:1.00], 0m, 44230 SAINT SEBASTIEN SUR LOIRE): name="AS GOLF DE SAINT SEBASTIEN SUR LOIRE", web="https://www.golf-saint-sebastien-sur-loire.fr", email="golfags@orange.fr", phone="+33 2 40 80 54 57"
- OSM (low, 162m, sim=0.158): name="Zone d'approche", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.864)
  - phone: from fed(high, sim=0.864)

### Golf de Saint-Cast Côte d'Emeraude (France, 2 courses)

- DB: addr="Route du Golf, Saint-Cast-le-Guildo", web="https://www.golf-st-cast.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:saint,jaccard:1.00], 0m, 22380 SAINT CAST LE GUILDO): name="GOLF DE SAINT-CAST COTE D'EMERAUDE", web="https://www.golf-st-cast.com", email="accueil@golf-st-cast.com", phone="+33 2 96 41 91 20"
- OSM (low, 281m, sim=0.4): name="Golf de Saint-Cast Pen Guen", web="https://golf-st-cast.com/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Saint-Cyprien (France, 9 courses)

- DB: addr="Rue Jouy d'Arnaud, Saint-Cyprien", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.9[coord:116m,city:saint,jaccard:0.67], 116m, 66750 SAINT CYPRIEN PLAGE): name="SAINT CYPRIEN GOLF RESORT", web="http://www.saintcyprien-golfresort.com", email="contact@saintcyprien-golfresort.com", phone="+33 4 68 37 63 63"
- OSM (high, 182m, sim=1): name="Golf de Saint-Cyprien", web=null, email=null, phone=null

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Saint-Jean-de-Monts (France, 1 courses)

- DB: addr="33 Avenue des Pays de la Loire, Saint-Jean-de-Monts", web="https://www.golfsaintjeandemonts.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:saint,jaccard:1.00], 0m, 85160 SAINT JEAN DE MONTS): name="GOLF DE SAINT JEAN DE MONTS", web="https://www.golfsaintjeandemonts.fr", email="accueil@golfsaintjeandemonts.fr", phone="+33 2 51 58 82 73"
- OSM (medium, 324m, sim=1): name="Golf de Saint-Jean-de-Monts", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Saint-Nom-la-Bretèche (France, 2 courses)

- DB: addr="Rue Henri Frayssineau, Saint-Nom-la-Bretèche", web="https://www.golfdesaintnomlabreteche.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:saint,jaccard:1.00,typo:bretèche~breteche], 0m, 78860 SAINT NOM LA BRETECHE): name="GOLF DE SAINT NOM LA BRETECHE", web="https://www.golfdesaintnomlabreteche.com", email="jeu@golfsaintnom.com", phone="+33 1 30 80 04 40"
- OSM (low, 895m, sim=1): name="Golf de Saint-Nom la Bretêche", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Sainte Agathe (France, 1 courses)

- DB: addr="RD 2144, Néris-les-Bains", web=null, email=null, phone=null
- ffgolf (high, sim=0.273, boost=+0.7[coord:692m,city:bains,jaccard:0.50], 692m, 03310 NERIS LES BAINS): name="GOLF STE AGATHE-MONTLUCON-NERIS", web="http://www.golf-sainte-agathe.fr", email="golfsainteagathe@orange.fr", phone="+33 4 70 08 91 54"
- OSM (high, 134m, sim=1): name="Golf de Sainte-Agathe", web="https://www.golf-sainte-agathe.fr/", email="golfsainteagathe@orange.fr", phone="+33 4 70 08 91 54"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.273)
  - email: from fed(high, sim=0.273)
  - phone: from fed(high, sim=0.273)

### Golf de Salernes (France, 1 courses)

- DB: addr="Chemin Paillettes, Salernes", web="https://www.ccools.com/en/golf-van-salernes/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:salernes,db-name-substring,jaccard:1.00], 0m, 83690 SALERNES): name="GOLF DE SALERNES", web="https://www.ccools.com/en/golf-van-salernes/", email="e.giraud88@gmail.com", phone="+33 6 76 43 91 80"
- OSM (no-match, 299725m, sim=0.625): name="Golf Club des Serves", web="http://www.albatros-academy.com/", email=null, phone="+33 4 50 42 16 48"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Sancerre (France, 1 courses)

- DB: addr="La Cabarette, Lieu dit Saint Thibault, Saint-Satur", web="https://www.golfdesancerre.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 18300 SANCERRE): name="GOLF DE SANCERRE", web="https://www.golfdesancerre.com/", email="golf.sancerre@wanadoo.fr", phone="+33 2 48 54 11 22"
- OSM (low, 827m, sim=1): name="Golf de Sancerre", web="https://golfdesancerre.com", email="golf.sancerre@wanadoo.fr", phone="+33 2 48 54 11 22"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Saumane (France, 1 courses)

- DB: addr="1141 Route de Fontaine de Vaucluse, Saumane-de-Vaucluse", web="https://www.golfdesaumane.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:saumane,db-name-substring,jaccard:1.00], 0m, 84800 SAUMANE DE VAUCLUSE): name="GOLF DE SAUMANE", web="https://www.golfdesaumane.fr", email="contact@golfdesaumane.fr", phone="+33 4 90 20 20 65"
- OSM (high, 78m, sim=1): name="Golf de Saumane", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Seignosse (France, 1 courses)

- DB: addr="Avenue du Belvèdere, Seignosse", web="https://www.seignosse-golf.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:seignosse,db-name-substring,jaccard:1.00], 0m, 40510 SEIGNOSSE): name="GOLF DE SEIGNOSSE", web="https://www.seignosse-golf.com/", email="seignosse@resonance.golf", phone="+33 5 58 41 68 30"
- OSM (low, 504m, sim=1): name="Golf de Seignosse", web="https://seignosse-golf.com", email=null, phone="+33 5 58 41 68 30"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Servanes (France, 1 courses)

- DB: addr="Route de Servanes, Mouriès", web="https://www.golfservanes.com/fr/", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 13890 MOURIES): name="GOLF DE SERVANES", web="https://www.golfservanes.com/fr/", email="servanes@resonance.golf", phone="+33 4 90 47 59 95"
- OSM (high, 12m, sim=1): name="Golf de Servanes", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Spérone (France, 1 courses)

- DB: addr="Domaine de Sperone, Bonifacio", web="https://www.golfdesperone.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.4[coord:0m,city:bonifacio,name-token:sperone,jaccard:1.00,typo:spérone~sperone], 0m, 20169 BONIFACIO): name="GOLF DE SPERONE", web="https://www.golfdesperone.com", email="contact@speronegolfclub.com", phone="+33 4 95 73 17 13"
- OSM (medium, 446m, sim=1): name="Golf de Sperone", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de St Saens (France, 1 courses)

- DB: addr="Le Vaudichon, Saint-Saëns", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:222m,city:saint,name-token:saint,jaccard:1.00], 222m, 76680 SAINT SAENS): name="GOLF HOTEL DE SAINT-SAENS", web="http://www.golfdesaintsaens.com", email="golf@golfdesaintsaens.com", phone="+33 2 35 34 25 24"
- OSM (medium, 278m, sim=1): name="Golf de Saint-Saëns", web="https://www.golf-de-saint-saens.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Taulane (France, 1 courses)

- DB: addr="Le Logis du Pin, La Martre", web="https://www.chateau-taulane.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:martre,db-name-substring,jaccard:1.00], 0m, 83840 LA MARTRE): name="GOLF DE TAULANE", web="https://www.chateau-taulane.com", email="resagolf@chateau-taulane.com", phone="+33 4 93 60 31 30"
- OSM (high, 66m, sim=1): name="Domaine de Taulane", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Teynac (France, 1 courses)

- DB: addr="Domaine de Teynac, Beychac-et-Caillau", web="http://www.golf-teynac.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:beychac,db-name-substring,jaccard:1.00], 0m, 33750 BEYCHAC ET CAILLAU): name="GOLF DE TEYNAC", web="http://www.golf-teynac.com", email="accueil@golf-teynac.com", phone="+33 5 56 72 85 62"
- OSM (medium, 254m, sim=1): name="Golf de Teynac", web=null, email=null, phone="+33 5 56 72 85 62"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Toulouse (France, 2 courses)

- DB: addr="2 Chemin de la Planho, Vieille-Toulouse", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:221m,city:vieille,jaccard:1.00], 221m, 31320 VIEILLE TOULOUSE): name="GOLF CLUB DE TOULOUSE", web="https://www.golfclubdetoulouse.fr", email="contact@golfclubdetoulouse.fr", phone="+33 5 61 73 45 48"
- OSM (low, 125m, sim=0.5): name="Golf de Vieille Toulouse", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Toulouse La Ramée (France, 2 courses)

- DB: addr="Avenue du Général Eisenhower, Tournefeuille", web=null, email=null, phone=null
- ffgolf (high, sim=0.571, boost=+0.55[coord:318m,city:tournefeuille], 318m, 31170 TOURNEFEUILLE): name="UGOLF LA RAMEE", web="https://jouer.golf/toulouse-la-ramee/", email="contact.laramee@ugolf.eu", phone="+33 5 61 07 09 09"
- OSM (low, 48m, sim=0.357): name="Golf de la Ramée", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.571)
  - email: from fed(high, sim=0.571)
  - phone: from fed(high, sim=0.571)

### Golf de Touraine (France, 1 courses)

- DB: addr="Chateau de la Touche, Ballan-Miré", web="https://www.golfdetouraine.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:ballan,db-name-substring,jaccard:1.00], 0m, 37510 BALLAN MIRE): name="GOLF DE TOURAINE", web="https://www.golfdetouraine.com", email="accueil@golfdetouraine.com", phone="+33 2 47 53 20 28"
- OSM (high, 160m, sim=1): name="Golf de Touraine", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Tremereuc (France, 2 courses)

- DB: addr="14 Rue de Dinan, Tréméreuc", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.8[coord:444m,db-name-substring,jaccard:1.00], 444m, 22490 TREMEREUC): name="GOLF DE TREMEREUC", web="https://www.golfbretagne.com", email="info@golfbretagne.com", phone="+33 2 96 27 10 40"
- OSM (high, 197m, sim=1): name="Golf de Tréméreuc", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Trousse Chemise (France, 1 courses)

- DB: addr="Route de la levée verte, Les portes en Ré", web="http://www.golftroussechemise.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:portes,jaccard:1.00], 0m, 17880 LES PORTES EN RE): name="GOLF DE TROUSSE-CHEMISE", web="http://www.golftroussechemise.com/", email="contact@golftroussechemise.com", phone="+33 5 46 29 69 37"
- OSM (medium, 343m, sim=1): name="Golf de Trousse-Chemise", web="https://golftroussechemise.com/", email="contact@golftroussechemise.com", phone="+33 5 46 29 69 37"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Troyes l'Ermitage (France, 1 courses)

- DB: addr="-, Vendeuvre-sur-Barse", web="http://www.asgolfdelermitage.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:vendeuvre,db-name-substring,jaccard:1.00], 0m, 10140 VENDEUVRE-SUR-BARSE): name="GOLF DE TROYES L'ERMITAGE", web="http://www.asgolfdelermitage.fr", email="ermitage10accueil@gmail.com", phone="+33 3 25 41 11 11"
- OSM (low, 372m, sim=0.588): name="Golf de l'Ermitage", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf De Troyes La Cordeliere (France, 1 courses)

- DB: addr="Château de la Cordelière, Chaource", web="https://www.golfdetroyeslacordeliere.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:chaource,db-name-substring,jaccard:1.00], 0m, 10210 CHAOURCE): name="GOLF DE TROYES LA CORDELIERE", web="https://www.golfdetroyeslacordeliere.fr", email="contact@golfdetroyeslacordeliere.fr", phone="+33 3 25 40 18 76"
- OSM (medium, 308m, sim=1): name="Golf de Troyes la Cordelière", web="https://golfdetroyeslacordeliere.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Tumulus Tarbes (France, 1 courses)

- DB: addr="1 Rue du Bois, Laloubère", web="http://www.golf-tarbes.fr", email=null, phone=null
- ffgolf (high, sim=0.286, boost=+0.7[coord:0m,jaccard:1.00], 0m, 65310 LALOUBERE): name="GOLF DE TARBES LES TUMULUS", web="http://www.golf-tarbes.fr", email="contact@golf-tumulus.com", phone="+33 5 62 45 14 50"
- OSM (low, 426m, sim=0.5): name="Golf des Tumulus", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.286)
  - phone: from fed(high, sim=0.286)

### Golf de Valgarde (France, 1 courses)

- DB: addr="Chemin de Rabasson, La Garde", web="https://www.golf-valgarde.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:garde,db-name-substring,jaccard:1.00], 0m, 83130 LA GARDE): name="GOLF DE VALGARDE", web="https://www.golf-valgarde.com", email="contact@golf-valgarde.com", phone="+33 4 94 14 01 05"
- OSM (low, 637m, sim=1): name="Golf de Valgarde", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Vannes Atlantheix (France, 1 courses)

- DB: addr="3 Impasse Jean Bart, Theix-Noyalo", web="https://www.golfvannes-atlantheix.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:theix,jaccard:1.00], 0m, 56450 THEIX-NOYALO): name="GOLF DE VANNES-ATLANTHEIX", web="https://www.golfvannes-atlantheix.com", email="contact@golfvannes-atlantheix.com", phone="+33 2 97 26 47 51"
- OSM (high, 123m, sim=1): name="Vannes Atlantheix", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Vezac Aurillac (France, 1 courses)

- DB: addr="1 Place du 19 Mars 1962, Vezac", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:309m,city:vezac,jaccard:1.00], 309m, 15130 VEZAC): name="GOLF CLUB DE VEZAC AURILLAC", web="https://www.golfvezac.com", email="golfdevezac@gmail.com", phone="+33 4 71 62 44 11"
- OSM (low, 514m, sim=0.357): name="Golf Club de Vezac", web="https://www.golfvezac.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Villacoublay-Air (France, 1 courses)

- DB: addr="Base Aérienne 107, Bièvres", web="https://publ.golfvilla.org", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 78129 VELIZY VILLACOUBLAY-AIR): name="GOLF DE VILLACOUBLAY-AIR", web="https://publ.golfvilla.org", email="dirgolf@golfvilla.org", phone="+33 1 73 95 14 68"
- OSM (low, 491m, sim=0.75): name="Golf de Villacoublay", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Villeneuve sur Lot (France, 1 courses)

- DB: addr="-, Castelnaud-de-Gratecambe", web="https://www.vslgolf.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:castelnaud,db-name-substring,jaccard:1.00], 0m, 47290 CASTELNAUD DE GRATECAMBE): name="GOLF DE VILLENEUVE SUR LOT", web="https://www.vslgolf.com", email="info@vslgolf.com", phone="+33 5 53 01 60 19"
- OSM (high, 40m, sim=1): name="Villeneuve-sur-Lot Golf & Country Club", web="https://www.vslgolf.com/", email=null, phone="+33 5 53 01 60 19"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Vire la Dathee (France, 1 courses)

- DB: addr="La Basse Haye, Noues de Sienne", web="https://www.golf-vireladathee.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 14380 SAINT MANVIEU BOCAGE): name="GOLF DE VIRE LA DATHEE", web="https://www.golf-vireladathee.fr", email="contact@golf-vireladathee.fr", phone="+33 2 31 67 71 01"
- OSM (high, 160m, sim=1): name="Golf de Vire la Dathée", web="https://www.golf-vireladathee.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf de Yerville (France, 1 courses)

- DB: addr="367 Rue des Acacias, Yerville", web="https://golfdeyerville.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:yerville,db-name-substring,jaccard:1.00], 0m, 76760 YERVILLE): name="GOLF DE YERVILLE", web="https://golfdeyerville.fr", email="golfdeyerville@orange.fr", phone="+33 2 32 70 15 49"
- OSM (high, 232m, sim=1): name="Golf de Yerville", web="https://golfdeyerville.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Des 24 Heures (France, 1 courses)

- DB: addr="Route de Tours, Mulsanne", web="https://golfdes24heures.fr/", email=null, phone=null
- ffgolf (high, sim=0.643, boost=+1.15[coord:0m,city:mulsanne,db-name-substring,jaccard:0.67], 0m, 72230 MULSANNE): name="GOLF DES 24 HEURES - LE MANS", web="https://golfdes24heures.fr/", email="accueil@golfdes24h.fr", phone="+33 2 43 42 00 36"
- OSM (low, 2866m, sim=1): name="Golf des 24 heures", web="https://www.golfdes24heures.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.643)
  - phone: from fed(high, sim=0.643)

### Golf des Arcs (France, 2 courses)

- DB: addr="Les Arcs 1800, Bourg-Saint-Maurice", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:172m,db-name-substring,jaccard:1.00], 172m,  ): name="GOLF DES ARCS", web="http://www.golf-des-arcs.fr", email="info@golf-des-arcs.fr", phone="+33 6 10 61 37 18"
- OSM (high, 62m, sim=1): name="Golf des Arcs", web="https://www.golf-des-arcs.fr/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf des Bords de Loire (France, 1 courses)

- DB: addr="8 Rue des Garennes, Andrézieux-Bouthéon", web="https://www.golfdesbordsdeloire.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 42160 ANDREZIEUX-BOUTHEON): name="GOLF DES BORDS DE LOIRE", web="https://www.golfdesbordsdeloire.com", email="contact@golfdesbordsdeloire.com", phone="+33 4 77 94 07 08"
- OSM (medium, 296m, sim=1): name="Golf des bords de Loire", web="https://golfdesbordsdeloire.com/", email="contact@golfdesbordsdeloire.com", phone="+33 4 77 94 07 08"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Des Boucles De Seine (France, 1 courses)

- DB: addr="25 Route de Mousseaux, Moisson", web="https://bouclesdeseine.iledeloisirs.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:moisson,db-name-substring,jaccard:1.00], 0m, 78840 MOISSON-MOUSSEAUX): name="GOLF DES BOUCLES DE SEINE", web="https://bouclesdeseine.iledeloisirs.fr", email="golf@bouclesdeseine.iledeloisirs.fr", phone="+33 1 34 79 39 00"
- OSM (medium, 382m, sim=1): name="Golf des Boucles de Seine", web="https://bouclesdeseine.iledeloisirs.fr/golf/", email="golf@base-bouclesdeseine.com", phone="+33134793900"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf des Bouleaux (France, 1 courses)

- DB: addr="238 route de Reiningue, Wittelsheim", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:393m,city:wittelsheim,jaccard:1.00], 393m, 68310 WITTELSHEIM): name="GOLF CLUB DES BOULEAUX", web="https://www.golf-bouleaux.fr", email="contact@golf-bouleaux.fr", phone="+33 3 89 55 55 07"
- OSM (high, 88m, sim=1): name="Golf des Bouleaux", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf des Bruyères (France, 1 courses)

- DB: addr="Les Bruyères, Égreville", web=null, email=null, phone=null
- ffgolf (no-match, sim=0.5, 431191m, 46700 ST MARTIN LE REDON): name="BOUYSSET GOLF", web="https://www.bouysset.fr", email="golf@bouysset.fr", phone="+33 5 65 30 34 00"
- OSM (high, 0m, sim=1): name="Golf des Bruyeres", web="https://www.golfdesbruyeres.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 0m, sim=1)

### Golf des Chanalets (France, 1 courses)

- DB: addr="1812 Route Amiral Marc de Joybert, Bourg-lès-Valence", web=null, email=null, phone=null
- ffgolf (high, sim=0.391, boost=+0.9[coord:334m,city:bourg,name-token:bourg,jaccard:0.50], 334m, 26500 BOURG LES VALENCE): name="GOLF CHANALETS BOURG VALENCE", web="http://www.golf-chanalets.com", email="info@golf-chanalets.com", phone="+33 4 75 83 16 23"
- OSM (high, 120m, sim=1): name="Golf des Chanalets", web="http://www.golf-chanalets.fr/", email=null, phone="+33 4 75 83 16 23"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.391)
  - email: from fed(high, sim=0.391)
  - phone: from fed(high, sim=0.391)

### Golf des Etangs (France, 1 courses)

- DB: addr="Chemin du Golf, Savigneux", web="http://www.golfdesetangs.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:savigneux,db-name-substring,jaccard:1.00], 0m, 42600 SAVIGNEUX): name="GOLF DES ETANGS", web="http://www.golfdesetangs.fr", email="contact@golfdesetangs-savigneux.fr", phone="+33 4 77 58 86 72"
- OSM (high, 89m, sim=1): name="Golf des Étangs", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf des Gorges du Tarn (France, 1 courses)

- DB: addr="Route des Gorges du Tarn, La Canourgue", web="https://www.golf-gorgesdutarn.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:canourgue,db-name-substring,jaccard:1.00], 0m, 48500 LA CANOURGUE): name="GOLF DES GORGES DU TARN", web="https://www.golf-gorgesdutarn.com", email="mathildemirmand@wanadoo.fr", phone="+33 4 66 32 84 00"
- OSM (low, 1971m, sim=1): name="Golf des Gorges du Tarn", web="https://www.golf-gorgesdutarn.com/", email=null, phone="+33 4 66 32 84 00"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf des Poursaudes (France, 1 courses)

- DB: addr="Ferme des Poursaudes, Villers-le-Tilleul", web="https://www.golfdespoursaudes.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:villers,db-name-substring,jaccard:1.00], 0m, 08430 VILLERS-LE-TILLEUL): name="GOLF DES POURSAUDES", web="https://www.golfdespoursaudes.com", email="golfdespoursaudes@gmail.com", phone="+33 3 24 42 39 83"
- OSM (medium, 445m, sim=1): name="Golf des Poursaudes", web="https://www.golfdespoursaudes.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf des Roucous (France, 1 courses)

- DB: addr="Les Roucous, Sauveterre", web="http://www.golfdesroucous.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:sauveterre,db-name-substring,jaccard:1.00], 0m, 82110 SAUVETERRE): name="GOLF DES ROUCOUS", web="http://www.golfdesroucous.com", email="contact@golfdesroucous.com", phone="+33 5 63 95 83 70"
- OSM (medium, 252m, sim=1): name="Golf des Roucous", web="https://www.golfdesroucous.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf des Sables d'Olonne (France, 1 courses)

- DB: addr="Domaine de la Pierre Levée, Les Sables-d'Olonne", web="https://www.golfdessablesdolonne.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:olonne,db-name-substring,jaccard:1.00], 0m, 85340 OLONNE SUR MER): name="GOLF DES SABLES D'OLONNE", web="https://www.golfdessablesdolonne.com", email="contact@golfdessablesdolonne.net", phone="+33 2 51 33 16 16"
- OSM (low, 506m, sim=0.333): name="Golf des Olonnes", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf des Trois Vallons (France, 2 courses)

- DB: addr="Le Rival, L'Isle-d'Abeau", web="https://jouer.golf/golf/ugolf-les-trois-vallons/", email=null, phone=null
- ffgolf (high, sim=0.684, boost=+1.1[coord:0m,city:isle,db-name-substring,jaccard:0.50], 0m, 38080 L'ISLE D'ABEAU): name="UGOLF DES TROIS VALLONS", web="https://jouer.golf/golf/ugolf-les-trois-vallons/", email="troisvallons@ugolf.eu", phone="+33 4 74 43 28 84"
- OSM (low, 434m, sim=0.615): name="Golf des 3 vallons", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.684)
  - phone: from fed(high, sim=0.684)

### Golf des Volcans (France, 3 courses)

- DB: addr="Bruyères des Moines, Orcines", web="https://www.golfdesvolcans.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:orcines,db-name-substring,jaccard:1.00], 0m, 63870 ORCINES): name="GOLF DES VOLCANS", web="https://www.golfdesvolcans.fr", email="accueil@golfdesvolcans.fr", phone="+33 4 73 62 15 51"
- OSM (high, 162m, sim=1): name="Golf des Volcans", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf des Yvelines (France, 2 courses)

- DB: addr="Le Château de la Couharde, La Queue-lez-Yvelines", web="https://www.golfdesyvelines.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:queue,db-name-substring,jaccard:1.00], 0m, 78940 LA QUEUE LES YVELINES): name="GOLF DES YVELINES", web="https://www.golfdesyvelines.com", email="lesyvelines@resonance.golf", phone="+33 1 34 86 48 89"
- OSM (medium, 404m, sim=1): name="Golf des Yvelines", web="https://www.golfdesyvelines.com", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Domont Montmorency (France, 2 courses)

- DB: addr="2 Route de Montmorency, Domont", web="http://golfdedomont.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:domont,jaccard:1.00], 0m, 95330 DOMONT): name="GOLF DE DOMONT MONTMORENCY", web="http://golfdedomont.com", email="accueil@golfdedomont.com", phone="+33 1 39 91 07 50"
- OSM (high, 138m, sim=1): name="Golf de Domont-Montmorency", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Du Baganais (France, 1 courses)

- DB: addr="Route du Baganais, Lacanau", web="https://www.ucpa.com/centres-sportifs/golf-lacanau", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:lacanau,db-name-substring,jaccard:1.00], 0m, 33680 LACANAU OCEAN): name="GOLF DU BAGANAIS", web="https://www.ucpa.com/centres-sportifs/golf-lacanau", email="lacanau.golf@ucpa.asso.fr", phone="+33 5 56 03 14 56"
- OSM (high, 182m, sim=1): name="Golf du Baganais", web="https://www.ucpa.com/centres-sportifs/golf-lacanau", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Bassin Bleu (France, 1 courses)

- DB: addr="75 Rue du Golf, Saint-Paul", web="http://www.golfbassinbleu.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 97435 ST GILLES LES HAUTS): name="GOLF DU BASSIN BLEU", web="http://www.golfbassinbleu.com", email="accueil@bassinbleu.fr", phone="+33 2 62 70 03 00"
- OSM (low, 651m, sim=1): name="Golf du Bassin Bleu", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Beaujolais (France, 1 courses)

- DB: addr="Rue de Chiel, Lucenay", web="https://www.golfdubeaujolais.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:lucenay,db-name-substring,jaccard:1.00], 0m, 69480 LUCENAY): name="GOLF DU BEAUJOLAIS", web="https://www.golfdubeaujolais.com", email="contact@golfdubeaujolais.com", phone="+33 4 74 67 04 44"
- OSM (medium, 310m, sim=1): name="Golf du Beaujolais", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Belvédère (France, 1 courses)

- DB: addr="Route de l´Église, Saint-Martin-Bellevue", web="http://www.golfdubelvedere.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:saint,jaccard:1.00], 0m, 74370 SAINT MARTIN BELLEVUE): name="GOLF DU BELVEDERE", web="http://www.golfdubelvedere.com", email="golfdubelvedere74@gmail.com", phone="+33 4 50 60 31 78"
- OSM (high, 85m, sim=1): name="Golf du Belvédère", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Bois d'O (France, 9 courses)

- DB: addr="Le Gland, Saint-Maixme-Hauterive", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.1[coord:992m,city:saint,db-name-substring,jaccard:1.00], 992m, 28170 SAINT MAIXME HAUTERIVE): name="GOLF DU BOIS D'O", web="https://www.golf-bois-do.com/newsite/", email="contact@golf-bois-do.com", phone="+33 2 37 51 04 61"
- OSM (low, 643m, sim=1): name="Golf du bois d'O", web=null, email=null, phone=null

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Bois de Ruminghem (France, 1 courses)

- DB: addr="1625 Rue Saint-Antoine, Ruminghem", web="https://www.capgolfclub.fr/", email=null, phone=null
- ffgolf (high, sim=0.778, boost=+1[coord:0m,city:ruminghem,jaccard:1.00], 0m, 62370 RUMINGHEM): name="CAP GOLF CLUB DU BOIS DE RUMINGHEM", web="https://www.capgolfclub.fr/", email="contact@capgolfclub.fr", phone="+33 6 03 52 68 23"
- OSM (no-match, 168092m, sim=0.5): name="Golf de Bois Guillaume", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.778)
  - phone: from fed(high, sim=0.778)

### Golf du Bois des Retz (France, 1 courses)

- DB: addr="GOLF DU BOIS DES RETZ - Rue du bois des retz -, Sin-le-Noble", web="https://www.oselegolf.com", email=null, phone=null
- ffgolf (high, sim=0.5, boost=+0.92[coord:0m,city:noble,jaccard:0.75], 0m, 59450 SIN LE NOBLE): name="GOLF DU DOUAISIS, LE BOIS DES RETZ", web="https://www.oselegolf.com", email="golf@oselegolf.com", phone="+33 3 27 86 27 86"
- OSM (low, 269m, sim=0.5): name="Golf du Douaisis - Bois des Retz", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Golf du bois des Rochers - Vitré (France, 1 courses)

- DB: addr="Les Rochers, Vitré", web="https://www.golfduboisdesrochers.fr/", email=null, phone=null
- ffgolf (high, sim=0.667, boost=+0.63[coord:0m,jaccard:0.75], 0m, 35500 VITRE): name="GOLF DU BOIS DES ROCHERS", web="https://www.golfduboisdesrochers.fr/", email="contact.golfdevitre@gmail.com", phone="+33 2 21 23 00 15"
- OSM (low, 467m, sim=0.5): name="Golf des Rochers Sévigné", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.667)
  - phone: from fed(high, sim=0.667)

### Golf du Cambrésis (France, 1 courses)

- DB: addr="-, Niergnies", web="https://www.golfducambresis.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:niergnies,jaccard:1.00,typo:cambrésis~cambresis], 0m, 59400 NIERGNIES): name="GOLF DU CAMBRESIS", web="https://www.golfducambresis.com", email="contact@golfducambresis.com", phone="+33 6 45 61 24 52"
- OSM (low, 828m, sim=1): name="Golf du Cambrésis", web="https://www.golfducambresis.com/", email="contact@golfducambresis.com", phone="+33 6 45 61 24 52"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Chambon-sur-Lignon (France, 1 courses)

- DB: addr="2816 route de Mars, Le Chambon-sur-Lignon", web="https://www.golf-chambon.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:chambon,jaccard:1.00], 0m, 43400 LE CHAMBON SUR LIGNON): name="GOLF DU CHAMBON SUR LIGNON", web="https://www.golf-chambon.com", email="accueil@golf-chambon.com", phone="+33 4 71 59 28 10"
- OSM (medium, 290m, sim=1): name="Golf du Chambon-sur-Lignon", web="https://golf-chambon.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Chammet (France, 1 courses)

- DB: addr="Lacour, Peyrelevade", web=null, email=null, phone=null
- ffgolf (high, sim=0.538, boost=+0.9[coord:220m,city:peyrelevade,jaccard:0.67], 220m, 19290 PEYRELEVADE): name="GOLF RURAL DU CHAMMET", web="https://golfruralcorreze.wixsite.com/golfchammet", email="asj-golf-chammet@orange.fr", phone="+33 6 31 16 74 87"
- OSM (high, 170m, sim=1): name="Golf du Chammet", web="https://golf-chammet.wixsite.com/golf", email="accueil-golfduchammet@wanadoo.fr", phone="+33 5 55 94 77 54"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.538)
  - email: from fed(high, sim=0.538)
  - phone: from fed(high, sim=0.538)

### Golf du Champ de Bataille (France, 1 courses)

- DB: addr="Route du Champ de Bataille, Le Neubourg", web="https://www.golf-champdebataille.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:neubourg,db-name-substring,jaccard:1.00], 0m, 27110 LE NEUBOURG): name="GOLF DU CHAMP DE BATAILLE", web="https://www.golf-champdebataille.com/", email="golfcdb@gmail.com", phone="+33 2 32 35 03 72"
- OSM (low, 1013m, sim=1): name="Golf du Champ de Bataille", web="https://www.golf-champdebataille.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Château d'Avoise (France, 1 courses)

- DB: addr="Château d'Avoise, Montchanin", web="http://golf-avoise.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:montchanin,jaccard:1.00,typo:château~chateau], 0m, 71210 MONTCHANIN): name="GOLF DU CHATEAU D'AVOISE", web="http://golf-avoise.com", email="soulajc@club-internet.fr", phone="+33 3 85 78 19 19"
- OSM (low, 505m, sim=1): name="Golf du Château d'Avoise", web="https://golf-avoise.com/", email="soulajc@club-internet.fr", phone="+33 3 85 78 19 19"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Du Chateau D'Humieres (France, 1 courses)

- DB: addr="Rue de Gournay, Monchy-Humières", web="https://www.golfduchateau.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:monchy,db-name-substring,jaccard:1.00], 0m, 60113 MONCHY HUMIERES): name="GOLF DU CHATEAU D'HUMIERES", web="https://www.golfduchateau.com", email="contact@golfduchateau.com", phone="+33 3 44 86 48 22"
- OSM (low, 642m, sim=1): name="Golf du Château d'Humières", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Château de Cély (France, 1 courses)

- DB: addr="6 Route de Saint-Germain, Cély", web=null, email=null, phone=null
- ffgolf (high, sim=0.308, boost=+0.68[coord:373m,jaccard:0.75,typo:château~chateau], 373m, 77930 CELY EN BIERE): name="EXCLUSIV GOLF CHATEAU DE CELY", web="https://jouer.golf/cely/", email="contact.cely@ugolf.eu", phone="+33 1 64 38 03 07"
- OSM (high, 144m, sim=1): name="Golf de Cély", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.308)
  - email: from fed(high, sim=0.308)
  - phone: from fed(high, sim=0.308)

### Golf du Château de Chailly (France, 1 courses)

- DB: addr="Allée du Château, Chailly-sur-Armançon", web="https://www.chailly.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.9[coord:0m,jaccard:1.00,typo:château~chateau], 0m, 21320 POUILLY EN AUXOIS): name="GOLF DU CHATEAU DE CHAILLY", web="https://www.chailly.com", email="golf@chailly.com", phone="+33 3 80 90 30 30"
- OSM (low, 731m, sim=1): name="Golf du Château de Chailly", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Chateau de Cheverny (France, 1 courses)

- DB: addr="La Rousselière, Cheverny", web="http://www.golf-cheverny.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:cheverny,db-name-substring,jaccard:1.00], 0m, 41700 CHEVERNY): name="GOLF DU CHATEAU DE CHEVERNY", web="http://www.golf-cheverny.com", email="contact@golf-cheverny.com", phone="+33 2 54 79 24 70"
- OSM (medium, 352m, sim=1): name="Golf du Château de Cheverny", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Château de la Chouette (France, 1 courses)

- DB: addr="1 Rue de la Montcient, Gaillon-sur-Montcient", web="https://www.golfdelachouette.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:gaillon,jaccard:1.00,typo:château~chateau], 0m, 78250 GAILLON-SUR-MONTCIENT): name="GOLF DU CHATEAU DE LA CHOUETTE", web="https://www.golfdelachouette.com", email="accueil@golfdelachouette.com", phone="+33 1 30 91 23 91"
- OSM (low, 620m, sim=1): name="Golf du Château de la Chouette", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Château de Maintenon (France, 1 courses)

- DB: addr="10bisRoute de Gallardon, Maintenon", web="https://www.golfdemaintenon.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:maintenon,jaccard:1.00,typo:château~chateau], 0m, 28130 MAINTENON): name="GOLF DU CHATEAU DE MAINTENON", web="https://www.golfdemaintenon.com", email="info@golfdemaintenon.com", phone="+33 2 37 27 18 09"
- OSM (medium, 298m, sim=1): name="Golf du Château de Maintenon", web="https://www.golfdemaintenon.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Du Château Les Merles (France, 1 courses)

- DB: addr="3 Chemin des Merles, Mouleydier", web="https://www.lesmerles.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:mouleydier,jaccard:1.00,typo:château~chateau], 0m, 24520 MOULEYDIER): name="GOLF CHATEAU LES MERLES", web="https://www.lesmerles.com", email="remy@lesmerles.com", phone="+33 5 53 63 13 42"
- OSM (medium, 403m, sim=1): name="Golf du Château les Merles", web="https://www.lesmerles.com/fr/golf/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Claux amic (France, 1 courses)

- DB: addr="Route des Trois Ponts, GRASSE", web="https://www.claux-amic.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:grasse,jaccard:1.00], 0m, 06130 GRASSE): name="GOLF DU CLAUX-AMIC", web="https://www.claux-amic.com", email="sport@claux-amic.com", phone="+33 4 93 60 55 44"
- OSM (low, 455m, sim=0.588): name="Golf Grasse Country Club – Claux Amic", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Clou (France, 1 courses)

- DB: addr="Route Départementale 1083, Villars-les-Dombes", web="https://www.golfduclou.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:villars,db-name-substring,jaccard:1.00], 0m, 01330 VILLARS LES DOMBES): name="GOLF DU CLOU", web="https://www.golfduclou.fr", email="golf@golfduclou.fr", phone="+33 4 74 98 19 65"
- OSM (high, 133m, sim=1): name="Golf du Clou", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Cognac (France, 1 courses)

- DB: addr="2 rue de la Maurie, Saint-Brice", web="https://www.golfducognac.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:saint,db-name-substring,jaccard:1.00], 0m, 16100 SAINT BRICE): name="GOLF DU COGNAC", web="https://www.golfducognac.fr", email="asl@golfducognac.fr", phone="+33 5 45 32 18 17"
- OSM (medium, 457m, sim=1): name="Golf de Cognac", web="https://golfducognac.fr/", email="contact@golfducognac.fr", phone="+33 5 45 32 18 17"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Coiroux Aubazine (France, 2 courses)

- DB: addr="3 Route du Parc du Coiroux, Aubazine", web=null, email=null, phone=null
- ffgolf (high, sim=0.167, boost=+0.85[coord:205m,city:aubazine,jaccard:0.50], 205m, 19190 AUBAZINE): name="GOLF CLUB D'AUBAZINE-CORREZE", web="https://www.golf-coiroux.com", email="golf-club-aubazine@orange.fr", phone="+33 5 55 27 26 93"
- OSM (low, 32m, sim=0.125): name="Golf du Parc du Coiroux", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.167)
  - email: from fed(high, sim=0.167)
  - phone: from fed(high, sim=0.167)

### Golf du Domaine de Manville (France, 1 courses)

- DB: addr="Domaine de Manville, Les Baux-de-Provence", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.1[coord:328m,city:baux,db-name-substring,jaccard:1.00], 328m, 13520 LES BAUX DE PROVENCE): name="LE GOLF DU DOMAINE DE MANVILLE", web=null, email="golf@domainedemanville.fr", phone="+33 4 90 54 40 20"
- OSM (high, 0m, sim=1): name="Golf Du Domaine De Manville", web="https://www.domainedemanville.fr/fr/golf/accueil-du-golf/", email=null, phone="+33 4 90 54 40 20"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 0m, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Fort (France, 1 courses)

- DB: addr="Route du Fort Uhrich, Illkirch-Graffenstaden", web="https://www.golfdufort.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:illkirch,db-name-substring,jaccard:1.00], 0m, 67400 ILLKIRCH-GRAFFENSTADEN): name="GOLF DU FORT", web="https://www.golfdufort.com", email="information@golfdufort.com", phone="+33 3 90 40 06 70"
- OSM (medium, 285m, sim=1): name="Golf du Fort", web="https://www.golfdufort.com/", email=null, phone="+33 3 90 40 06 70"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Genêt (France, 1 courses)

- DB: addr="Golf Du Genet, Saint-Barthélémy-de-Bussière", web=null, email=null, phone=null
- ffgolf (no-match, sim=0.3, boost=+0.5[city:saint,name-token:saint], 251529m, 85160 SAINT JEAN DE MONTS): name="GOLF DE SAINT JEAN DE MONTS", web="https://www.golfsaintjeandemonts.fr", email="accueil@golfsaintjeandemonts.fr", phone="+33 2 51 58 82 73"
- OSM (high, 16m, sim=1): name="Golf du Genêt", web="https://golfdugenet.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 16m, sim=1)

### Golf du Gévaudan - Domaine de Barres (France, 1 courses)

- DB: addr="Route de Mende, Langogne", web=null, email=null, phone=null
- ffgolf (high, sim=0.533, boost=+0.75[coord:1103m,city:langogne,jaccard:0.50,typo:gévaudan~gevaudan], 1103m, 48300 LANGOGNE): name="GOLF DU GEVAUDAN", web="http://www.domainedebarres.com", email="golf@domainedebarres.com", phone="+33 6 50 16 58 13"
- OSM (medium, 384m, sim=1): name="Golf du Gévaudan - Domaine de Barres", web="https://www.domainedebarres.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.533)
  - email: from fed(high, sim=0.533)
  - phone: from fed(high, sim=0.533)

### Golf du Gouverneur (France, 3 courses)

- DB: addr="Le Breuil, Monthieux", web="http://www.domainedugouverneur.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:monthieux,db-name-substring,jaccard:1.00], 0m, 01390 MONTHIEUX): name="GOLF DU GOUVERNEUR", web="http://www.domainedugouverneur.fr", email="golf@domainedugouverneur.fr", phone="+33 4 72 26 40 34"
- OSM (medium, 425m, sim=1): name="Golf du Gouverneur", web="https://domainedugouverneur.fr", email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Du Haut Poitou (France, 2 courses)

- DB: addr="35 Rue du Golf, Beaumont Saint-Cyr", web="https://www.golfduhautpoitou.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:beaumont,jaccard:1.00], 0m, 86130 BEAUMONT SAINT-CYR): name="GOLF DU HAUT-POITOU", web="https://www.golfduhautpoitou.fr", email="contact@golfduhautpoitou.com", phone="+33 5 49 62 53 62"
- OSM (medium, 250m, sim=1): name="Golf du Haut Poitou", web="https://www.golfduhautpoitou.fr/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Havre (France, 2 courses)

- DB: addr="17 Route de Saint-Supplix, Octeville-sur-Mer", web=null, email=null, phone=null
- ffgolf (high, sim=0.263, boost=+1.2[coord:536m,city:octeville,name-token:octeville,db-name-substring,jaccard:0.67], 536m, 76930 OCTEVILLE SUR MER): name="GOLF DU HAVRE / OCTEVILLE/MER", web="https://www.golfduhavre.com", email="contact@golfduhavre.com", phone="+33 2 35 46 36 50"
- OSM (low, 309m, sim=0.217): name="Golf du Havre - Octeville-sur-Mer", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.263)
  - email: from fed(high, sim=0.263)
  - phone: from fed(high, sim=0.263)

### Golf du Lac d'Annecy (France, 1 courses)

- DB: addr="280 Route du Golf, Talloires-Montmin", web="http://www.golf-lacannecy.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:talloires,db-name-substring,jaccard:1.00], 0m, 74290 TALLOIRES): name="GOLF DU LAC D'ANNECY", web="http://www.golf-lacannecy.com", email="accueil@golf-lacannecy.com", phone="+33 4 50 60 12 89"
- OSM (medium, 411m, sim=1): name="Golf du Lac d'Annecy", web="https://www.golf-lacannecy.com/", email=null, phone="+33 4 50 60 12 89"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Du Luberon (France, 1 courses)

- DB: addr="1 Chemin du Golf, Pierrevert", web="https://www.golfduluberon.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:pierrevert,db-name-substring,jaccard:1.00], 0m, 04860 PIERREVERT): name="GOLF DU LUBERON", web="https://www.golfduluberon.com", email="info@golfduluberon.com", phone="+33 4 92 72 17 19"
- OSM (low, 523m, sim=1): name="Golf du Luberon", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Médoc Resort Bordeaux - MGallery (France, 2 courses)

- DB: addr="Chemin de Courmateau, Le Pian-Médoc", web=null, email=null, phone=null
- ffgolf (high, sim=0.435, boost=+0.7[coord:68m,city:pian], 68m, 33290 LE PIAN MEDOC): name="CABOT BORDEAUX", web="https://cabotbordeaux.com/fr", email="cbx.proshop@cabot.com", phone="+33 5 56 70 11 90"
- OSM (low, 188m, sim=0.217): name="Golf du Médoc", web="https://www.hotel-golf-du-medoc.com/", email=null, phone="+33 5 56 70 11 90"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.435)
  - email: from fed(high, sim=0.435)
  - phone: from fed(high, sim=0.435)

### Golf du Mont Dore (France, 1 courses)

- DB: addr="Route de la Tour d Auvergne, Mont-Dore", web="https://www.golfdumontdore.org", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:mont,db-name-substring,jaccard:1.00], 0m, 63240 LE MONT DORE): name="GOLF DU MONT DORE", web="https://www.golfdumontdore.org", email="contact@golfdumontdore.org", phone="+33 4 73 65 00 79"
- OSM (high, 105m, sim=1): name="Golf du Mont-Dore", web="https://www.golfdumontdore.org", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Parc du Tremblay (France, 1 courses)

- DB: addr="33 Avenue Jack Gourevitch, Champigny-sur-Marne", web="http://www.golf-parc-tremblay.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:champigny,db-name-substring,jaccard:1.00], 0m, 94500 CHAMPIGNY SUR MARNE): name="GOLF DU PARC DU TREMBLAY", web="http://www.golf-parc-tremblay.com", email="golfduparcdutremblay@vert-marine.com", phone="+33 1 48 83 36 00"
- OSM (medium, 385m, sim=1): name="Golf du Parc du Tremblay", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Perche (France, 1 courses)

- DB: addr="La Vallée des Aulnes, Souancé-au-Perche", web="https://www.golfduperche.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:perche,db-name-substring,jaccard:1.00], 0m, 28400 SOUANCE AU PERCHE): name="GOLF DU PERCHE", web="https://www.golfduperche.com", email="golfduperche@wanadoo.fr", phone="+33 2 37 29 17 33"
- OSM (high, 78m, sim=1): name="Golf du Perche", web="https://www.golfduperche.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Pic Saint-Loup (France, 4 courses)

- DB: addr="4 Allée des Écureuils, Saint-Gély-du-Fesc", web="https://www.golf-pic-saint-loup.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:saint,db-name-substring,jaccard:1.00], 0m, 34980 SAINT GELY DU FESC): name="GOLF DU PIC SAINT-LOUP", web="https://www.golf-pic-saint-loup.com/", email="contact@golf-pic-saint-loup.com", phone="+33 4 67 84 13 75"
- OSM (low, 1097m, sim=1): name="Golf du Pic Saint-Loup", web="https://www.golf-pic-saint-loup.com/", email=null, phone="+33467841375"

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Du Prieure (France, 2 courses)

- DB: addr="Domaine de Montcient, Sailly", web="https://www.golfduprieure.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:sailly,db-name-substring,jaccard:1.00], 0m, 78440 SAILLY): name="GOLF DU PRIEURE", web="https://www.golfduprieure.com", email="infos@golfduprieure.com", phone="+33 1 34 76 65 65"
- OSM (high, 189m, sim=1): name="Golf du Prieuré", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Puy en Velay (France, 1 courses)

- DB: addr="Sénilhac, Ceyssac", web="https://www.golfdupuyenvelay.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:ceyssac,db-name-substring,jaccard:1.00], 0m, 43000 CEYSSAC LA ROCHE): name="GOLF DU PUY EN VELAY", web="https://www.golfdupuyenvelay.com/", email="contactgolfdupuyenvelay@gmail.com", phone="+33 4 71 09 17 77"
- OSM (high, 16m, sim=1): name="Golf du Puy en Velay", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Rhin (France, 1 courses)

- DB: addr="Ile du Rhin, Chalampé", web="https://www.golfdurhin.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 68490 CHALAMPE): name="GOLF DU RHIN", web="https://www.golfdurhin.com", email="direction@golfdurhin.com", phone="+33 3 89 83 28 32"
- OSM (medium, 326m, sim=1): name="Golf du Rhin", web="https://www.golfdurhin.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Rochat (France, 1 courses)

- DB: addr="1305 Route du Noirmont, Les Rousses", web=null, email=null, phone=null
- ffgolf (high, sim=0.429, boost=+1.2[coord:280m,city:rousses,name-token:rousses,db-name-substring,jaccard:0.67], 280m, 39220 LES ROUSSES): name="GOLF DU ROCHAT - LES ROUSSES", web="https://www.golfdurochat.com", email="info@golfdurochat.com", phone="+33 3 84 60 06 25"
- OSM (high, 9m, sim=1): name="Golf du Rochat", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.429)
  - email: from fed(high, sim=0.429)
  - phone: from fed(high, sim=0.429)

### Golf du Roncemay (France, 1 courses)

- DB: addr="Boisserelle, Chassy", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:528m,db-name-substring,jaccard:0.67], 528m, 89110 AILLANT SUR THOLON): name="DOMAINE ET GOLF DU RONCEMAY", web="https://www.roncemay.com", email="golf@roncemay.com", phone="+33 3 86 73 50 50"
- OSM (high, 4m, sim=1): name="Golf du Roncemay", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Sart (France, 1 courses)

- DB: addr="5 Rue Jean Jaurès, Villeneuve-d'Ascq", web="https://www.golfdusart.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:villeneuve,db-name-substring,jaccard:1.00], 0m, 59650 VILLENEUVE D'ASCQ): name="GOLF DU SART", web="https://www.golfdusart.com", email="contact@golfdusart.com", phone="+33 3 20 72 02 51"
- OSM (medium, 256m, sim=1): name="Golf du Sart", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Sporting Club de Vichy (France, 1 courses)

- DB: addr="Allée Georges Baugnies, Bellerive-sur-Allier", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:176m,city:bellerive,db-name-substring,jaccard:1.00], 176m, 03700 BELLERIVE SUR ALLIER): name="GOLF DU SPORTING CLUB DE VICHY", web="https://www.golf-vichy.fr", email="sporting.vichy@wanadoo.fr", phone="+33 4 70 32 39 11"
- OSM (high, 86m, sim=1): name="Golf du Sporting Club de Vichy", web="https://www.golf-vichy.fr/", email=null, phone="+33 4 70 32 39 11"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Stade Français Courson (France, 8 courses)

- DB: addr="Ferme de Gloriette, Courson-Monteloup", web=null, email=null, phone=null
- ffgolf (high, sim=0.273, boost=+1.05[coord:383m,city:courson,jaccard:1.00,typo:français~francais], 383m, 91680 COURSON MONTELOUP): name="GOLF DE COURSON STADE FRANCAIS", web="https://jouer.golf/courson/", email="contact@exclusivgolf-courson.fr", phone="+33 1 64 58 80 80"
- OSM (high, 214m, sim=1): name="Golf du Stade Français - Courson", web="https://jouer.golf/golf/ugolf-courson/", email=null, phone=null

**Proposed UPDATE** (alle 8 course rows for klub, overall=high):
  - website: from fed(high, sim=0.273)
  - email: from fed(high, sim=0.273)
  - phone: from fed(high, sim=0.273)

### Golf Du Totche (France, 1 courses)

- DB: addr="Chemin du Golf, Villefranche-de-Rouergue", web="http://www.golftotcheaveyron.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:villefranche,db-name-substring,jaccard:1.00], 0m, 12200 VILLEFRANCHE DE ROUERGUE): name="GOLF DU TOTCHE", web="http://www. golftotcheaveyron.com", email="dgl.golfdutotche@gmail.com", phone="+33 5 65 45 70 35"
- OSM (medium, 264m, sim=1): name="Golf du Totche", web="https://www.golftotcheaveyron.com/", email="golfdutotche@wanadoo.fr", phone="+33565457035"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Du Touquet (France, 3 courses)

- DB: addr="2170 Avenue du Golf, Le Touquet-Paris-Plage", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.1[coord:555m,city:touquet,db-name-substring,jaccard:1.00], 555m, 62520 LE TOUQUET PARIS PLAGE): name="GOLF DU TOUQUET", web="https://www.letouquetgolfresort.com/fr/", email="letouquet.golf@resonance.golf", phone="+33 3 21 06 28 00"
- OSM (high, 206m, sim=1): name="Golf du Touquet", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Tremblay on Mauldre (France, 2 courses)

- DB: addr="14bis rue du Général de Gaulle, Le Tremblay-sur-Mauldre", web=null, email=null, phone=null
- ffgolf (high, sim=0.842, boost=+1[coord:32m,city:tremblay,jaccard:1.00], 32m, 78490 LE TREMBLAY SUR MAULDRE): name="GOLF DU TREMBLAY / MAULDRE", web="https://www.golfdutremblay.fr", email="contact@golfdutremblay.fr", phone="+33 1 34 94 25 76"
- OSM (low, 299m, sim=0.421): name="Golf du Tremblay", web="https://www.golfdutremblay.fr", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.842)
  - email: from fed(high, sim=0.842)
  - phone: from fed(high, sim=0.842)

### Golf du Val de Sorne (France, 1 courses)

- DB: addr="Rue du Golf, Vernantois", web="https://www.valdesorne.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:vernantois,db-name-substring,jaccard:1.00], 0m, 39570 VERNANTOIS): name="GOLF DU VAL DE SORNE", web="https://www.valdesorne.com/", email="info@valdesorne.com", phone="+33 3 84 43 04 80"
- OSM (high, 137m, sim=1): name="Golf du Val de Sorne", web="https://www.valdesorne.com/", email="info@valdesorne.com", phone="+33 3 84 43 04 80"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Val Secret (France, 1 courses)

- DB: addr="Val Secret, Château-Thierry", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.8[coord:639m,db-name-substring,jaccard:1.00], 639m, 02400 BRASLES): name="GOLF DU VAL SECRET", web="https://www.golfvalsecret.com", email="contact@golfvalsecret.com", phone="+33 3 23 83 07 25"
- OSM (medium, 372m, sim=1): name="Golf du Val Secret", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf du Vaudreuil (France, 1 courses)

- DB: addr="26 Avenue Marc de la Haye, Le Vaudreuil", web=null, email=null, phone=null
- ffgolf (high, sim=0.45, boost=+0.75[coord:427m,city:vaudreuil,jaccard:0.67], 427m, 27100 LE VAUDREUIL): name="GOLF PGA FRANCE DU VAUDREUIL", web="https://www.golfduvaudreuil.com", email="info@golfduvaudreuil.com", phone="+33 2 32 59 02 60"
- OSM (high, 24m, sim=1): name="Golf du Vaudreuil", web="http://www.golfduvaudreuil.com/", email=null, phone="+33 2 32 59 02 60"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.45)
  - email: from fed(high, sim=0.45)
  - phone: from fed(high, sim=0.45)

### Golf du Ventoux (France, 1 courses)

- DB: addr="2247 Route de Camaret, Orange", web=null, email=null, phone=null
- ffgolf (high, sim=0.5, boost=+1.05[coord:2480m,city:orange,name-token:orange,db-name-substring,jaccard:0.67], 2480m, 84100 ORANGE): name="GOLF DU VENTOUX-ORANGE", web=null, email="golfduventoux@gmail.com", phone="+33 4 90 34 34 04"
- OSM (no-match, 217213m, sim=0.571): name="Golf Club de Menton", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Golf EasyGolf Bourget (France, 2 courses)

- DB: addr="Le Bourget, Montmeyran", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.9[coord:151m,city:montmeyran,jaccard:0.67], 151m, 26120 MONTMEYRAN): name="EASYGOLF DU BOURGET", web="https://easygolf-drome-ardeche-montmeyran.fr/", email="infoeasygolf@gmail.com", phone="+33 4 75 59 48 18"
- OSM (low, 8m, sim=0.579): name="Easygolf Montmeyran", web="https://www.easygolfmontmeyran.com/", email="easygolf26@gmail.com", phone="+33 4 75 59 48 18"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Educatif de Douai (France, 1 courses)

- DB: addr="459 Rue de Ferin, Douai", web="https://www.golfdouai.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:douai,db-name-substring,jaccard:1.00], 0m, 59500 DOUAI): name="GOLF EDUCATIF DE DOUAI", web="https://www.golfdouai.fr", email="golf.educatif.douai@gmail.com", phone="+33 3 27 88 05 32"
- OSM (high, 97m, sim=1): name="Golf éducatif de Douai", web="https://golfdouai.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Estate Feucherolles (France, 1 courses)

- DB: addr="Route Départementale 307, Feucherolles", web=null, email=null, phone=null
- ffgolf (high, sim=0.667, boost=+0.7[coord:317m,city:feucherolles,jaccard:0.50], 317m, 78810 FEUCHEROLLES): name="EXCLUSIV GOLF DE FEUCHEROLLES", web="https://jouer.golf/feucherolles", email="contact.feucherolles@ugolf.eu", phone="+33 1 30 54 94 94"
- OSM (low, 130m, sim=0.632): name="Golf de Feucherolles", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.667)
  - email: from fed(high, sim=0.667)
  - phone: from fed(high, sim=0.667)

### Golf Flaine Les Carroz (France, 1 courses)

- DB: addr="Col de Pierre Carrée, Arâches-la-Frasse", web="https://golf-flaine-lescarroz.fr/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:frasse,jaccard:1.00], 0m, 74300 ARACHES-LA FRASSE): name="GOLF FLAINE-LES-CARROZ", web="https://golf-flaine-lescarroz.fr/", email="contact@golfdeflaine.com", phone="+33 4 50 90 85 44"
- OSM (low, 134m, sim=0.462): name="Golf de Flaine", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Gaia Concept Orleans-Limere (France, 1 courses)

- DB: addr="1411 Allée de la Pomme de Pin, Ardon", web="https://www.golforleanslimere.com/", email=null, phone=null
- ffgolf (high, sim=0.556, boost=+0.88[coord:0m,city:ardon,jaccard:0.60], 0m, 45160 ARDON): name="GOLF D'ORLEANS-LIMERE", web="https://www.golforleanslimere.com/", email="accueil@golflimere.com", phone="+33 2 38 63 89 40"
- OSM (low, 247m, sim=0.556): name="Golf d'Orléans Limère", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.556)
  - phone: from fed(high, sim=0.556)

### Golf Garde Guérin (France, 1 courses)

- DB: addr="RD 906, Prévenchères", web="https://golfgardeguerin.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:0m,jaccard:1.00], 0m, 48800 PREVENCHERES): name="GOLF DE LA GARDE GUERIN", web="https://golfgardeguerin.fr", email="contact@golfgardeguerin.fr", phone="+33 6 72 17 35 64"
- OSM (low, 4986m, sim=1): name="Golf de la Garde Guérin", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Gilles de Boisgelin (France, 1 courses)

- DB: addr="-, Pléhédel", web="http://www.chateauduboisgelin.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 22290 PLEHEDEL): name="GOLF GILLES DE BOISGELIN", web="http://www.chateauduboisgelin.com", email="golf@leboisgelin.com", phone="+33 2 96 22 61 67"
- OSM (high, 107m, sim=1): name="Golf Gilles de Boisgelin", web="https://www.leboisgelin.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Grand Nancy-Pulnoy (France, 2 courses)

- DB: addr="10 Rue du Golf, Pulnoy", web="https://jouer.golf/golf/ugolf-grand-nancy-pulnoy/", email=null, phone=null
- ffgolf (high, sim=0.75, boost=+0.85[coord:0m,city:pulnoy,jaccard:0.50], 0m, 54425 PULNOY): name="UGOLF GRAND NANCY PULNOY", web="https://jouer.golf/golf/ugolf-grand-nancy-pulnoy/", email="contact.pulnoy@ugolf.eu", phone="+33 3 83 18 10 18"
- OSM (low, 461m, sim=0.789): name="Garden Golf Nancy-Pulnoy", web="https://jouer.golf/grand-nancy-pulnoy/", email="commercial@gardengolf-nancypulnoy.fr", phone="+33 3 83181018"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.75)
  - phone: from fed(high, sim=0.75)

### Golf Grande Bastide (France, 1 courses)

- DB: addr="761 Chemin des Picholines, Châteauneuf-Grasse", web="https://www.golfgrandebastide.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:grasse,jaccard:1.00], 0m, 06740 CHATEAUNEUF DE GRASSE): name="GOLF DE LA GRANDE BASTIDE", web="https://www.golfgrandebastide.com", email="grandebastide@resonance.golf", phone="+33 4 93 77 70 08"
- OSM (medium, 371m, sim=1): name="Golf de la Grande Bastide", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Grenoble Charmeil (France, 1 courses)

- DB: addr="La Grande Grange, Saint-Quentin-sur-Isère", web="http://www.golfhotelcharmeil.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:saint,jaccard:1.00], 0m, 38210 SAINT QUENTIN SUR ISERE): name="GOLF DE GRENOBLE CHARMEIL", web="http://www.golfhotelcharmeil.com", email="daphnee.sarret@golfhotelcharmeil.com", phone="+33 4 76 93 35 65"
- OSM (high, 168m, sim=1): name="Golf Grenoble Charmeil", web="http://www.golfhotelcharmeil.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Guérande (France, 1 courses)

- DB: addr="Route de Bréhadour, Guérande", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.75[coord:767m,jaccard:1.00,typo:guérande~guerande], 767m, 44350 GUERANDE): name="GOLF DE GUERANDE", web="https://www.golfdeguerande.com", email="contact@golfdeguerande.com", phone="+33 2 40 66 43 21"
- OSM (high, 149m, sim=1): name="Golf de Guérande", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Hôtel de Mont Griffon (France, 3 courses)

- DB: addr="D909, Luzarches", web="http://www.golfmontgriffon.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:luzarches,jaccard:1.00], 0m, 95270 LUZARCHES): name="GOLF HOTEL DE MONT GRIFFON", web="http://www.golfmontgriffon.com", email="golf@golfmontgriffon.com", phone="+33 1 34 68 10 10"
- OSM (medium, 398m, sim=0.917): name="Golf de Montgriffon", web="https://golf-hotel-mont-griffon.fr/", email="golf@golfmontgriffon.com", phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf International Barrière La Baule (France, 3 courses)

- DB: addr="Route de Saint-Denac, Saint-André-des-Eaux", web=null, email=null, phone=null
- ffgolf (high, sim=0.679, boost=+0.78[coord:280m,city:saint,jaccard:0.75], 280m, 44117 SAINT ANDRE DES EAUX): name="GOLF INTERNATIONAL DE LA BAULE", web="https://www.golfbarriere-labaule.com/", email="accueil-golflabaule@groupebarriere.com", phone="+33 2 40 60 46 18"
- OSM (high, 136m, sim=1): name="Golf International Barrière La Baule", web="https://www.hotelsbarriere.com/fr/la-baule/golf-international-barriere-la-baule.html", email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=0.679)
  - email: from fed(high, sim=0.679)
  - phone: from fed(high, sim=0.679)

### Golf International de la Prèze (France, 1 courses)

- DB: addr="-, Rouzède", web="https://www.golfdelapreze.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:0m,jaccard:1.00], 0m, 16220 ROUZEDE): name="GOLF INTERNATIONAL DE LA PREZE", web="https://www.golfdelapreze.com", email=null, phone=null
- OSM (low, 225m, sim=0.263): name="Golf de la Prèze", web=null, email=null, phone=null

### Golf International De Roissy (France, 1 courses)

- DB: addr="Allée du Golf, Roissy-en-France", web="https://jouer.golf/golf/ugolf-golf-international-de-roissy/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:roissy,db-name-substring,jaccard:1.00], 0m, 95700 ROISSY EN FRANCE): name="GOLF INTERNATIONAL DE ROISSY", web="https://jouer.golf/golf/ugolf-golf-international-de-roissy/", email="contact.roissy@ugolf.eu", phone="+33 1 86 90 07 54"
- OSM (low, 243867m, sim=0.8): name="Golf International de Longwy", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Isabella (France, 1 courses)

- DB: addr="Avenue d'Armorique, Sainte Apolline, Plaisir", web="https://www.golfisabella.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:plaisir,db-name-substring,jaccard:1.00], 0m, 78370 PLAISIR): name="GOLF ISABELLA", web="https://www.golfisabella.fr", email="info@golfisabella.com", phone="+33 1 30 54 10 62"
- OSM (medium, 334m, sim=1): name="Golf Isabella", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Jumièges (France, 3 courses)

- DB: addr="Route du Manoir, Jumièges", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.75[coord:571m,jaccard:1.00,typo:jumièges~jumieges], 571m, 76480 JUMIEGES): name="GOLF DE JUMIEGES", web="http://golfdejumieges.fr", email="contact@golfdejumieges.fr", phone="+33 2 35 05 32 97"
- OSM (high, 77m, sim=1): name="Golf de Jumièges", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf la Cabre d'Or (France, 1 courses)

- DB: addr="1 Allee du Golf, Cabriès", web="https://www.golflacabredor.fr/", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 13480 CABRIES): name="GOLF LA CABRE D'OR", web="https://www.golflacabredor.fr/", email="contact@golflacabredor.com", phone="+33 4 42 50 46 72"
- OSM (high, 170m, sim=1): name="Golf de la Cabre d'Or", web="https://www.golflacabredor.fr/", email=null, phone="+33 4 42 50 46 72"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf La Roche Posay (France, 1 courses)

- DB: addr="5 Chemin de la Tuilerie, La Roche-Posay", web="https://www.golf-laroche-posay.fr/index.php", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:roche,db-name-substring,jaccard:1.00], 0m, 86270 LA ROCHE POSAY): name="GOLF LA ROCHE POSAY", web="https://www.golf-laroche-posay.fr/index.php", email="golf.larocheposay@gmail.com", phone="+33 5 49 86 13 39"
- OSM (high, 185m, sim=1): name="Golf de La Roche Posay", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf la Rochelle La Prée (France, 1 courses)

- DB: addr="-, Marsilly", web="https://www.golflarochelle.fr", email=null, phone=null
- ffgolf (high, sim=0.231, boost=+1[coord:0m,city:marsilly,jaccard:1.00], 0m, 17137 MARSILLY): name="GOLF DE LA PREE - LA ROCHELLE", web="https://www.golflarochelle.fr", email="golflarochelle@gmail.com", phone="+33 5 46 01 24 42"
- OSM (low, 736m, sim=0.231): name="Golf la Prée La Rochelle", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.231)
  - phone: from fed(high, sim=0.231)

### Golf La Wantzenau (France, 2 courses)

- DB: addr="Route du Golf, La Wantzenau", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:314m,city:wantzenau,jaccard:1.00], 314m, 67610 LA WANTZENAU): name="GOLF DE LA WANTZENAU", web="https://www.golf-wantzenau.fr", email="accueil@golf-wantzenau.fr", phone="+33 3 88 96 37 73"
- OSM (high, 34m, sim=1): name="Golf de La Wantzenau", web=null, email="accueil@golf-wantzenau.fr", phone="+33388963773"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Lannemezan (France, 1 courses)

- DB: addr="250 Rue du Docteur Ueberschlag, Lannemezan", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:357m,city:lannemezan,jaccard:1.00], 357m, 65300 LANNEMEZAN): name="GOLF DE LANNEMEZAN", web="https://www.golflannemezan.com", email="contact@golflannemezan.fr", phone="+33 5 62 98 01 01"
- OSM (high, 114m, sim=1): name="Golf de Lannemezan", web="https://golflannemezan.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Le Rocher Blanc (France, 2 courses)

- DB: addr="4538 Route de la Vallée du Bouchet, Le Grand-Bornand", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:134m,city:grand,db-name-substring,jaccard:1.00], 134m, 74450 GRAND BORNAND): name="GOLF LE ROCHER BLANC", web="https://www.golf-grandbornand.com/", email="teddy.perrillat@hotmail.fr", phone="+33 4 50 02 70 11"
- OSM (low, 3m, sim=0.231): name="Golf du Grand-Bornand", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Le Val Saint-Jean (France, 1 courses)

- DB: addr="BP 72, Mauriac", web=null, email=null, phone=null
- ffgolf (high, sim=0.5, boost=+1.1[coord:87m,city:mauriac,name-token:mauriac,jaccard:0.67], 87m, 15200 MAURIAC): name="GOLF DE MAURIAC - VAL SAINT JEAN", web="https://www.golfvalsaintjean.org/", email="golfvalsaintjean@gmail.com", phone="+33 4 71 68 23 59"
- OSM (low, 22m, sim=0.5): name="Golf de Mauriac Val Saint-Jean", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.5)
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Golf Les Gets (France, 2 courses)

- DB: addr="3157 Route des Chavannes, Les Gets", web="http://www.lesgets.golf", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:gets,db-name-substring,jaccard:1.00], 0m, 74260 LES GETS): name="GOLF LES GETS", web="http://www.lesgets.golf", email="info@lesgets.golf", phone="+33 4 50 75 87 63"
- OSM (low, 810m, sim=1): name="Golf Les Gets", web="https://www.lesgets.golf/", email="info@lesgets.golf", phone="+33 4 50 75 87 63"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Lille Métropole (France, 2 courses)

- DB: addr="Rond-Point des Acacias, Ronchin", web="https://www.golf-lille-metropole.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:ronchin,jaccard:1.00,typo:métropole~metropole], 0m, 59790 RONCHIN): name="GOLF DE LILLE METROPOLE", web="https://www.golf-lille-metropole.fr", email="accueil.glm@gmail.com", phone="+33 3 20 47 42 42"
- OSM (medium, 482m, sim=1): name="Golf de Lille Métropole", web="https://golf-lille-metropole.fr", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Loches-Verneuil (France, 1 courses)

- DB: addr="21 La Capitainerie, Verneuil-sur-Indre", web="https://golf-lochesverneuil.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:verneuil,db-name-substring,jaccard:1.00], 0m, 37600 VERNEUIL SUR INDRE): name="GOLF LOCHES-VERNEUIL", web="https://golf-lochesverneuil.fr", email="golf.verneuil@lochessudtouraine.com", phone="+33 2 47 94 79 48"
- OSM (high, 73m, sim=1): name="Golf de Loches-Verneuil", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Lou Verdaï (France, 1 courses)

- DB: addr="84 route de Portet, Villeneuve-Tolosane", web="https://jouer.golf/ugolf-toulouse-lou-verdai/", email=null, phone=null
- ffgolf (high, sim=0.625, boost=+0.4[coord:0m], 0m, 31120 ROQUES): name="UGOLF LOU VERDAI", web="https://jouer.golf/ugolf-toulouse-lou-verdai/", email="contact.louverdai@ugolf.eu", phone="+33 5 61 92 47 49"
- OSM (low, 301m, sim=0.4): name="Ugolf Toulouse Lou verdaï", web="https://jouer.golf/golf/ugolf-toulouse-lou-verdai/", email="contact.louverdai@ugolf.eu", phone="+33 5 61 92 47 49"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.625)
  - phone: from fed(high, sim=0.625)

### Golf Lys Chantilly (France, 2 courses)

- DB: addr="-, Lamorlaye", web="http://www.lys.golf", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:lamorlaye,jaccard:1.00], 0m, 60260 LAMORLAYE): name="GOLF LYS-CHANTILLY", web="http://www.lys.golf", email="contact@lys.golf", phone="+33 3 44 21 26 00"
- OSM (low, 340m, sim=0.231): name="Golf du Lys", web="https://lys.golf", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Machilly Compact (France, 1 courses)

- DB: addr="232 Route du Lac, Machilly", web=null, email=null, phone=null
- ffgolf (high, sim=0.5, boost=+0.9[coord:206m,city:machilly,jaccard:0.67], 206m, 74140 MACHILLY): name="GOLF DE MACHILLY", web="http://www.golfdemachilly.com/", email="jean-pierre.pasini@wanadoo.fr", phone="+33 9 67 47 63 03"
- OSM (low, 18m, sim=0.5): name="Golf de Machilly", web="https://golfdemachilly.com/", email=null, phone="+33 9 67 47 63 03"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.5)
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Golf Madine (France, 2 courses)

- DB: addr="Base de Loisirs, NONSARD LAMARCHE, Nonsard-Lamarche", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:475m,city:nonsard,jaccard:1.00], 475m, 55210 NONSARD LAMARCHE): name="GOLF DE MADINE", web="http://www.golfmadine.fr", email="golf@chambley-madine.com", phone="+33 3 29 89 56 00"
- OSM (high, 5m, sim=1): name="Golf de Madine", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Marivaux (France, 1 courses)

- DB: addr="Rue du Rouget, Janvry", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:284m,city:janvry,jaccard:1.00], 284m, 91640 JANVRY): name="GOLF DE MARIVAUX", web="https://www.golfmarivaux.com", email="contact@golfmarivaux.com", phone="+33 1 64 90 85 85"
- OSM (high, 36m, sim=1): name="Golf de Marivaux", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Marmande (France, 2 courses)

- DB: addr="639 Rue Jean Mermoz, Marmande", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:259m,city:marmande,jaccard:1.00], 259m, 47200 MARMANDE): name="GOLF DE MARMANDE", web="http://www.golfdemarmande.fr", email="accueil@golfdemarmande.fr", phone="+33 5 53 20 87 60"
- OSM (high, 20m, sim=1): name="Golf de marmande", web="http://www.golfdemarmande.fr", email=null, phone="+33 5 53 20 87 60"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Mazamet La Barouge (France, 1 courses)

- DB: addr="665 Rte du Golf de la Barouge, Pont-de-Larn", web="https://www.golfmazamet.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:pont,jaccard:1.00], 0m, 81660 PONT DE L'ARN): name="GOLF CLUB MAZAMET LA BAROUGE", web="https://www.golfmazamet.fr", email="labarouge@golfmazamet.fr", phone="+33 5 63 61 06 72"
- OSM (low, 611m, sim=0.467): name="Golf de la Barouge", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Menneville (France, 1 courses)

- DB: addr="Chemin de la Haie Migaut, Villeneuve-sur-Aisne", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.55[coord:329m,jaccard:1.00], 329m, 02190 MENNEVILLE): name="GOLF DE MENNEVILLE", web="https://www.golfdemenneville.fr", email="golfmenneville@orange.fr", phone="+33 3 23 79 79 88"
- OSM (high, 48m, sim=1): name="Golf de Menneville", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Meribel (France, 1 courses)

- DB: addr="Route de l'Altiport, Les Allues", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:750m,city:allues,jaccard:1.00], 750m, 73550 LES ALLUES): name="GOLF CLUB MERIBEL", web="https://www.golf-meribel.com", email="info@golf-meribel.com", phone="+33 4 79 00 52 67"
- OSM (low, 666m, sim=1): name="Golf de Méribel", web="https://www.golf-meribel.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Mont de Marsan (France, 1 courses)

- DB: addr="1419 Route de Pessourdat, Saint-Avit", web="https://www.golfmontdemarsan.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:saint,jaccard:1.00], 0m, 40090 SAINT AVIT): name="GOLF DE MONT DE MARSAN", web="https://www.golfmontdemarsan.com", email="montdemarsan.golf@gmail.com", phone="+33 5 58 75 63 05"
- OSM (high, 207m, sim=1): name="Golf de Mont de Marsan", web="https://www.golfmontdemarsan.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Montargis Vaugouard (France, 1 courses)

- DB: addr="Chemin des Bois, Fontenay-sur-Loing", web=null, email=null, phone=null
- ffgolf (high, sim=0.474, boost=+0.85[coord:74m,city:fontenay,jaccard:0.50], 74m, 45210 FONTENAY SUR LOING): name="DOMAINE ET GOLF DE VAUGOUARD", web="https://www.vaugouard.com", email="golf.vaugouard@lamaisonyounan.com", phone="+33 2 38 89 79 00"
- OSM (low, 171m, sim=0.474): name="Domaine de Vaugouard", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.474)
  - email: from fed(high, sim=0.474)
  - phone: from fed(high, sim=0.474)

### Golf montceau les mines (France, 1 courses)

- DB: addr="parc Saint Louis, Montceau-les-Mines", web=null, email=null, phone=null
- ffgolf (high, sim=0.133, boost=+0.85[coord:120m,city:montceau,jaccard:0.50], 120m, 71300 MONTCEAU-LES-MINES): name="GOLF PUBLIC DE MONTCEAU", web="https://asgolfmontceau71.fr/", email="golf.montceaulesmines@wanadoo.fr", phone="+33 3 85 58 38 88"
- OSM (low, 7m, sim=0.286): name="Golf Municipal", web="https://www.montceaulesmines.fr/le-golf", email="golfmunicipal@montceaulesmines.fr", phone="+33 3 85 58 38 88"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.133)
  - email: from fed(high, sim=0.133)
  - phone: from fed(high, sim=0.133)

### Golf Montereau Forteresse (France, 1 courses)

- DB: addr="Ferme de la Forteresse, Thoury-Férottes", web=null, email=null, phone=null
- ffgolf (high, sim=0.5, boost=+0.9[coord:111m,city:thoury,jaccard:0.67], 111m, 77940 THOURY FERROTTES): name="GOLF DE LA FORTERESSE", web="http://www.golf-forteresse.com", email="contact@golf-forteresse.com", phone="+33 1 60 96 95 10"
- OSM (low, 356m, sim=0.5): name="Golf de la Forteresse", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.5)
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Golf Montescot (France, 1 courses)

- DB: addr="Allée des Valmaries, Villeneuve-de-la-Raho", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.4[coord:1676m,jaccard:1.00], 1676m, 66200 MONTESCOT): name="GOLF CLUB DE MONTESCOT", web="https://www.golfclubdemontescot.fr", email="golfdemontescot@gmail.com", phone="+33 4 68 82 79 29"
- OSM (high, 68m, sim=1): name="Golf de Montescot", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Montgenevre (France, 3 courses)

- DB: addr="248 Route de France, Montgenèvre", web=null, email=null, phone=null
- ffgolf (high, sim=0.524, boost=+0.6[coord:14m,jaccard:0.67], 14m, 05100 MONTGENEVRE): name="GOLF OLYMPIQUE DE MONTGENEVRE", web="https://www.golf.montgenevre.com", email="golf@montgenevre.com", phone="+33 4 92 21 94 23"
- OSM (low, 652m, sim=1): name="Golf de Montgenèvre", web="http://www.montgenevre.com/activites/golf", email="golf@montgenevre.com", phone="+33 4 92 21 52 52"

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=0.524)
  - email: from fed(high, sim=0.524)
  - phone: from fed(high, sim=0.524)

### Golf Montpellier Fontcaude (France, 4 courses)

- DB: addr="38 Avenue les Hameaux du Golf, Juvignac", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:91m,city:juvignac,db-name-substring,jaccard:1.00], 91m, 34990 JUVIGNAC): name="GOLF MONTPELLIER FONTCAUDE", web="https://www.hotelgolf-fontcaude.com", email="orentet@promeo.fr", phone="+33 4 67 45 90 10"
- OSM (medium, 300m, sim=1): name="Golf Resort Montpellier Fontcaude", web="https://hotelgolf-fontcaude.com", email=null, phone=null

**Proposed UPDATE** (alle 4 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Mormal (France, 2 courses)

- DB: addr="14 Chemin d'Amfroipret, Preux-au-Sart", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:19m,city:preux,jaccard:1.00], 19m, 59144 PREUX AU SART): name="GOLF DE MORMAL", web="https://golfdemormal.com", email="info@golfdemormal.com", phone="+33 3 27 63 07 00"
- OSM (low, 506m, sim=1): name="Golf de Mormal", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Moulins Avenelles (France, 1 courses)

- DB: addr="les avenelleds, Toulon-sur-Allier", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:267m,city:toulon,jaccard:1.00], 267m, 03400 TOULON SUR ALLIER): name="GOLF DE MOULINS LES AVENELLES", web="http://www.golfdesavenelles.com", email="contact@golfdesavenelles.fr", phone="+33 4 63 07 19 00"
- OSM (low, 121m, sim=0.529): name="Golf des Avenelles", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Municipal de Brive Planchetorte (France, 1 courses)

- DB: addr="Chemin de la Jargasse, Brive-la-Gaillarde", web="https://www.golfdebrive.com/", email=null, phone=null
- ffgolf (high, sim=0.75, boost=+0.92[coord:0m,city:brive,jaccard:0.75], 0m, 19100 BRIVE LA GAILLARDE): name="CAB GOLF DE BRIVE PLANCHETORTE", web="https://www.golfdebrive.com/", email="golfdebrive@brive.fr", phone="+33 5 55 85 22 59"
- OSM (low, 145m, sim=0.429): name="Golf de Planchetorte", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.75)
  - phone: from fed(high, sim=0.75)

### Golf Municipal de Saint Lazare (France, 1 courses)

- DB: addr="Avenue du Golf Saint Lazare,, Limoges", web=null, email=null, phone=null
- ffgolf (high, sim=0.375, boost=+0.7[coord:454m,city:limoges,jaccard:0.50], 454m, 87000 LIMOGES): name="DOMAINE GOLF DE SAINT LAZARE", web="https://ledomainedugolf.fr/parcours-golf/", email="contact@golfsaintlazare.fr", phone="+33 5 55 06 00 00"
- OSM (low, 388m, sim=0.375): name="Domaine du Golf Saint Lazare", web="https://ledomainedugolf.fr", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.375)
  - email: from fed(high, sim=0.375)
  - phone: from fed(high, sim=0.375)

### Golf Municipal Ville d'Autun Golf Bourgogne (France, 2 courses)

- DB: addr="27 Chemin des Ragots, Autun", web="https://www.golfautun.fr", email=null, phone=null
- ffgolf (high, sim=0.697, boost=+0.94[coord:0m,city:autun,jaccard:0.80], 0m, 71400 AUTUN): name="GOLF MUNICIPAL VILLE D'AUTUN", web="https://www.golfautun.fr", email="autungolfclub@gmail.com", phone="+33 3 85 52 09 28"
- OSM (low, 64m, sim=0.212): name="Golf d'Autun", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.697)
  - phone: from fed(high, sim=0.697)

### Golf Nampont Saint-Martin (France, 2 courses)

- DB: addr="Maison Forte, Nampont", web="https://www.nampontgolfclub.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:nampont,jaccard:1.00], 0m, 80120 NAMPONT SAINT-MARTIN): name="NAMPONT SAINT MARTIN GOLF CLUB", web="https://www.nampontgolfclub.com", email="contact@nampontgolfclub.com", phone="+33 3 22 29 92 90"
- OSM (medium, 382m, sim=1): name="Nampont Saint-Martin Golf Club", web="https://www.nampontgolfclub.com/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf National (France, 3 courses)

- DB: addr="2 Avenue du Golf, Guyancourt", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:245m,city:guyancourt,db-name-substring,jaccard:1.00], 245m, 78280 GUYANCOURT): name="LE GOLF NATIONAL", web="https://www.legolfnational.com/", email="accueil@golf-national.com", phone="+33 1 30 43 36 00"
- OSM (low, 1296m, sim=1): name="Golf National", web=null, email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Nîmes Campagne (France, 2 courses)

- DB: addr="1360 Chemin du Mas de Campagne, Nîmes", web=null, email=null, phone=null
- ffgolf (high, sim=0.571, boost=+0.6[coord:196m,jaccard:0.67], 196m, 30900 NIMES): name="GOLF CLUB DE CAMPAGNE", web="https://www.golfnimescampagne.com", email="contact@golfnimescampagne.fr", phone="+33 4 66 70 17 37"
- OSM (high, 0m, sim=1): name="Golf Nîmes Campagne", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.571)
  - email: from fed(high, sim=0.571)
  - phone: from fed(high, sim=0.571)

### Golf of Bagnoles de l'Orne (France, 1 courses)

- DB: addr="Route de Domfront, Bagnoles de l'Orne Normandie", web="https://www.bagnolesdelorne.com/le-golf-dandaine/", email=null, phone=null
- ffgolf (high, sim=0.833, boost=+1[coord:0m,city:bagnoles,jaccard:1.00], 0m, 61140 BAGNOLES DE L'ORNE NORMANDIE): name="GOLF DE BAGNOLES DE L'ORNE", web="https://www.bagnolesdelorne.com/le-golf-dandaine/", email="golf@bagnolesdelorne.com", phone="+33 2 33 37 81 42"
- OSM (low, 185m, sim=0.222): name="Swin Golf Annie Goutte", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.833)
  - phone: from fed(high, sim=0.833)

### Golf Of L'île Fleurie (France, 1 courses)

- DB: addr="L'Île Fleurie, Carrières-sur-Seine", web="http://www.golf-ilefleurie.com", email=null, phone=null
- ffgolf (high, sim=0.813, boost=+0.7[coord:0m,jaccard:1.00], 0m, 78400 CHATOU): name="GOLF DE L'ILE FLEURIE", web="http://www.golf-ilefleurie.com", email="accueil@golf-ilefleurie.com", phone="+33 1 39 52 61 61"
- OSM (high, 241m, sim=0.813): name="Golf de l'Île Fleurie", web="https://www.golf-ilefleurie.com/", email="accueil@golf-ilefleurie.com", phone="+33139526161"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.813)
  - phone: from fed(high, sim=0.813)

### Golf Of La Rosière (France, 1 courses)

- DB: addr="La Rosière, Montvalezan", web=null, email=null, phone=null
- ffgolf (high, sim=0.7, boost=+1.2[coord:123m,city:montvalezan,jaccard:1.00,typo:rosière~rosiere], 123m, 73700 LA ROSIERE MONTVALEZAN): name="GOLF DE LA ROSIERE", web="http://www.golfdelarosiere.com/fr/", email="accueil@golfdelarosiere.com", phone="+33 4 79 06 75 40"
- OSM (high, 33m, sim=0.7): name="Golf de la Rosière", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.7)
  - email: from fed(high, sim=0.7)
  - phone: from fed(high, sim=0.7)

### Golf of Marterie (France, 1 courses)

- DB: addr="210 Allée du Golf de la Marterie, Saint-Félix-de-Reillac-et-Mort", web=null, email=null, phone=null
- ffgolf (high, sim=0.727, boost=+0.7[coord:64m,jaccard:1.00], 64m, 24260 ST FELIX REILHAC MORTEMART): name="GOLF DE LA MARTERIE", web="https://www.leslodgesdugolfdelamarterie.com", email="contact@lamarterie.com", phone="+33 5 53 05 61 00"
- OSM (high, 246m, sim=0.727): name="Golf de la Marterie", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.727)
  - email: from fed(high, sim=0.727)
  - phone: from fed(high, sim=0.727)

### Golf of Pont Royal (France, 2 courses)

- DB: addr="-, Mallemort", web=null, email=null, phone=null
- ffgolf (high, sim=0.5, boost=+0.78[coord:455m,city:mallemort,jaccard:0.75], 455m, 13370 MALLEMORT): name="GOLF INTERNATIONAL DE PONT ROYAL", web="https://www.golf-pontroyal.com", email="info@golf-pontroyal.com", phone="+33 4 90 57 40 79"
- OSM (low, 444m, sim=0.769): name="Golf de Pont-Royal", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.5)
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Golf Opio Valbonne (France, 1 courses)

- DB: addr="Route de Roquefort-les-Pins, Opio", web="https://www.opiovalbonnegolfresort.com/fr/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:opio,db-name-substring,jaccard:1.00], 0m, 06650 OPIO): name="GOLF OPIO VALBONNE", web="https://www.opiovalbonnegolfresort.com/fr/", email="opiovalbonne@resonance.golf", phone="+33 4 93 12 00 08"
- OSM (high, 71m, sim=0.867): name="Golf d’Opio Valbonne", web="https://www.opiovalbonnegolfresort.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Orient Forest (France, 1 courses)

- DB: addr="5 Route de Geraudot, Rouilly-Sacey", web=null, email=null, phone=null
- ffgolf (high, sim=0.5, boost=+0.55[coord:1446m,city:rouilly,jaccard:0.50], 1446m, 10220 ROUILLY SACEY): name="GOLF DE LA FORET D'ORIENT", web="https://www.domaine-foret-orient.com/", email="gestion.golf@dfo-troyes.com", phone="+33 3 25 43 80 84"
- OSM (no-match, 1778m, sim=0.5): name="Golf de la forêt d'Orient", web="https://www.domaine-foret-orient.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.5)
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Golf Paris Val d'Europe Disneyland (France, 9 courses)

- DB: addr="40 Allee de La Mare Houleuse, Magny-le-Hongre", web=null, email=null, phone=null
- ffgolf (high, sim=0.621, boost=+0.78[coord:349m,city:magny,jaccard:0.75], 349m, 77700 MAGNY-LE-HONGRE): name="GOLF PARIS VAL D'EUROPE", web="https://jouer.golf/golf/ugolf-paris-val-deurope/", email="contact.valdeurope@ugolf.eu", phone="+33 1 60 45 68 90"
- OSM (low, 618m, sim=0.345): name="Golf Disneyland", web="https://www.disneylandparis.fr/loisirs/golf-disneyland/", email="dlp.nwy.golf@disney.com", phone="+33 1 60 45 68 90"

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=0.621)
  - email: from fed(high, sim=0.621)
  - phone: from fed(high, sim=0.621)

### Golf Porcelain (France, 2 courses)

- DB: addr="Allée de Celicroux, Panazol", web=null, email=null, phone=null
- ffgolf (high, sim=0.9, boost=+1.05[coord:505m,city:panazol,jaccard:1.00,typo:porcelain~porcelaine], 505m, 87350 PANAZOL): name="GOLF DE LA PORCELAINE", web="https://www.golf-porcelaine.com/", email="golf@golf-porcelaine.com", phone="+33 5 55 31 10 69"
- OSM (high, 48m, sim=0.9): name="Golf de la porcelaine", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.9)
  - email: from fed(high, sim=0.9)
  - phone: from fed(high, sim=0.9)

### Golf Preisch (France, 9 courses)

- DB: addr="1 Rue du Vieux Moulin, Basse-Rentgen", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:749m,city:basse,jaccard:1.00], 749m, 57570 BASSE RENTGEN): name="GOLF DE PREISCH", web="https://www.golf-de-preisch.com", email="info@golf-de-preisch.com", phone="+33 3 82 83 00 00"
- OSM (low, 616m, sim=1): name="Golf Château de Preisch", web=null, email=null, phone=null

**Proposed UPDATE** (alle 9 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Rebetz (France, 1 courses)

- DB: addr="5 Chemin de Rebetz, Chaumont-en-Vexin", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:516m,city:chaumont,jaccard:1.00], 516m, 60240 CHAUMONT EN VEXIN): name="GOLF DE REBETZ", web="https://WWW.rebetz.com", email="golf@rebetz.com", phone="+33 3 44 49 15 54"
- OSM (high, 86m, sim=1): name="Golf de Rebetz", web="https://www.rebetz.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Reginu (France, 1 courses)

- DB: addr="-, Speloncato", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:247m,city:speloncato,jaccard:1.00], 247m, 20226 SPELONCATO): name="GOLF DU REGINU", web="https://www.golf-reginu.com", email="golf.reginu@wanadoo.fr", phone="+33 7 86 98 05 24"
- OSM (high, 85m, sim=1): name="Golf du Reginu", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Reims (France, 1 courses)

- DB: addr="Rue du Château, Gueux", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:435m,city:gueux,jaccard:1.00], 435m, 51390 GUEUX): name="GOLF DE REIMS", web="https://golfdereims.com", email="contact@golfdereims.com", phone="+33 3 26 05 46 10"
- OSM (high, 233m, sim=1): name="Golf de Reims", web="https://golfdereims.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### GOLF ROCHES D'AZUR (France, 1 courses)

- DB: addr="5 Rue des Oursinades, Saint-Raphaël", web="https://www.golfrochesdazur.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:saint,db-name-substring,jaccard:1.00], 0m, 83530 AGAY SAINT RAPHAEL): name="GOLF ROCHES D'AZUR", web="https://www.golfrochesdazur.com", email="golfrochesdazur@gmail.com", phone="+33 6 71 81 78 91"
- OSM (high, 193m, sim=1): name="Golf Roches d'Azur", web="https://www.golfrochesdazur.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Royat-Charade (France, 1 courses)

- DB: addr="6-8 Allée du Parc, Royat", web="https://www.golfderoyatcharade.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:royat,jaccard:1.00], 0m, 63130 ROYAT): name="GOLF DE ROYAT CHARADE", web="https://www.golfderoyatcharade.fr", email="golfderoyatcharade@gmail.com", phone="+33 4 73 35 73 09"
- OSM (low, 532m, sim=1): name="Golf de Royat-Charade", web="https://www.golfderoyatcharade.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Saint Marc (France, 2 courses)

- DB: addr="Chemin du Petit Viltain À Villeras, Jouy-en-Josas", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:414m,city:jouy,jaccard:1.00], 414m, 78350 JOUY EN JOSAS): name="GOLF DE SAINT MARC", web="https://www.golfsaintmarc.com", email="direction@golfsaintmarc.com", phone="+33 1 30 97 25 25"
- OSM (low, 73m, sim=0.333): name="Golf de Viltain Saint-Marc", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Sarrebourg (France, 1 courses)

- DB: addr="Ferme du Winkelhof, Sarrebourg", web=null, email=null, phone=null
- ffgolf (high, sim=0.667, boost=+0.75[coord:549m,city:sarrebourg,jaccard:0.67], 549m, 57400 SARREBOURG): name="GOLF DU PAYS DE SARREBOURG", web="https://www.golf-sarrebourg.fr", email="info@golf-sarrebourg.fr", phone="+33 3 87 23 01 02"
- OSM (low, 9m, sim=0.667): name="Golf du Pays de Sarrebourg", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.667)
  - email: from fed(high, sim=0.667)
  - phone: from fed(high, sim=0.667)

### Golf Sarreguemines (France, 1 courses)

- DB: addr="1 Allée du Golf, Sarreguemines", web=null, email=null, phone=null
- ffgolf (high, sim=0.52, boost=+0.85[coord:1574m,city:sarreguemines,db-name-substring,jaccard:0.67], 1574m, 57200 SARREGUEMINES): name="GOLF SARREGUEMINES CONFLUENCES", web="https://www.golf-sarreguemines-confluences.com", email="golf.sarreguemines@confluences.co", phone="+33 3 87 27 22 60"
- OSM (high, 50m, sim=1): name="Golf de Sarreguemines", web="https://www.golf-sarreguemines-confluences.com/fr/", email="golf.sarreguemines@confluences.co", phone="+33 3 87 27 22 60"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.52)
  - email: from fed(high, sim=0.52)
  - phone: from fed(high, sim=0.52)

### Golf Saumur (France, 1 courses)

- DB: addr="-, Saumur", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:428m,city:saumur,jaccard:1.00], 428m, 49400 SAUMUR): name="GOLF DE SAUMUR", web="https://www.golf-saumur.com", email="contact@golf-saumur.com", phone="+33 2 41 50 87 00"
- OSM (high, 7m, sim=1): name="Golf de Saumur", web="https://www.golf-saumur.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Seraincourt (France, 1 courses)

- DB: addr="Chemin de Dalibray, Seraincourt", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:343m,city:seraincourt,jaccard:1.00], 343m, 95450 SERAINCOURT): name="GOLF DE SERAINCOURT", web="http://www.golfdeseraincourt.fr", email="accueil@golfdeseraincourt.fr", phone="+33 1 34 75 47 28"
- OSM (high, 43m, sim=1): name="Golf de Seraincourt", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf St Genis (France, 2 courses)

- DB: addr="Route de Meyrin, Saint-Genis-Pouilly", web=null, email=null, phone=null
- ffgolf (high, sim=0.385, boost=+0.8[coord:1727m,city:saint,name-token:saint,jaccard:0.67], 1727m, 01630 SAINT GENIS POUILLY): name="GOLF DE SAINT GENIS POUILLY", web="http://www.albatros-academy.com", email="info@albatros-academy.com", phone="+33 4 50 42 16 48"
- OSM (no-match, 1459m, sim=0.333): name="Golf Club des Serves", web="http://www.albatros-academy.com/", email=null, phone="+33 4 50 42 16 48"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.385)
  - email: from fed(high, sim=0.385)
  - phone: from fed(high, sim=0.385)

### Golf Tanlay (France, 1 courses)

- DB: addr="D56, Tanlay", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:298m,city:tanlay,jaccard:1.00], 298m, 89430 TANLAY): name="GOLF DE TANLAY", web="https://www.golfdetanlay.fr", email="golfduchateaudetanlay@orange.fr", phone="+33 3 86 75 72 92"
- OSM (high, 28m, sim=1): name="Golf du château de Tanlay", web="https://golfdetanlay.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Torcy (France, 1 courses)

- DB: addr="Route de Lagny, Torcy", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:957m,city:torcy,jaccard:1.00], 957m, 77200 TORCY): name="GOLF DE TORCY", web="https://vaires-torcy.ucpa.com", email="a.wucher@vaires-torcy.iledeloisirs.fr", phone="+33 1 60 20 02 04"
- OSM (low, 356m, sim=0.417): name="Golf de Vaires-Torcy", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Val-Grand (France, 1 courses)

- DB: addr="Rue de Paris, D31, Bondoufle", web="https://www.golf-de-val-grand.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:bondoufle,jaccard:1.00], 0m, 91070 BONDOUFLE): name="GOLF DE VAL-GRAND", web="https://www.golf-de-val-grand.com", email="contact@golfval-grand.fr", phone="+33 1 60 86 41 71"
- OSM (medium, 495m, sim=1): name="Golf de Val Grand", web="https://www.golf-de-val-grand.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Vichy Forest of Montpensier (France, 1 courses)

- DB: addr="-, Serbannes", web=null, email=null, phone=null
- ffgolf (high, sim=0.852, boost=+0.43[coord:468m,jaccard:0.60], 468m, 03700 SERBANES): name="GOLF VICHY FORET/MONTPENSIER", web="https://www.golf-vichy-montpensier.com", email="golf@domainedemontpensier.fr", phone="+33 4 70 56 31 00"
- OSM (low, 270m, sim=0.63): name="Golf de la Forêt de Montpensier", web="https://www.golf-vichy-montpensier.com", email=null, phone="+33 4 70 32 05 77"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.852)
  - email: from fed(high, sim=0.852)
  - phone: from fed(high, sim=0.852)

### Golf Villarceaux (France, 1 courses)

- DB: addr="Le Couvent, Chaussy", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:1057m,city:chaussy,jaccard:1.00], 1057m, 95710 CHAUSSY): name="GOLF DE VILLARCEAUX", web="https://www.villarceaux.com", email="accueil@villarceaux.com", phone="+33 1 34 67 73 83"
- OSM (high, 42m, sim=1): name="Golf de Villarceaux", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Vittel - Hazeau (France, 1 courses)

- DB: addr="555 Avenue du Haut de Fol, Vittel", web="https://www.golf-vittel-hazeau.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:vittel,jaccard:1.00], 0m, 88800 VITTEL): name="GOLF CLUB DE VITTEL HAZEAU", web="https://www.golf-vittel-hazeau.com", email="contact@golf-vittel-hazeau.com", phone="+33 3 29 08 20 85"
- OSM (low, 473m, sim=0.462): name="Golf du Hazeau", web="https://www.golf-vittel-hazeau.com/", email=null, phone="+33 3 29 08 20 85"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golf Vittel Ermitage (France, 2 courses)

- DB: addr="Avenue Gilbert Trigano, Vittel", web=null, email=null, phone=null
- ffgolf (high, sim=0.533, boost=+0.55[coord:2148m,city:vittel,jaccard:0.50], 2148m, 88800 VITTEL): name="GOLF CLUB DE VITTEL HAZEAU", web="https://www.golf-vittel-hazeau.com", email="contact@golf-vittel-hazeau.com", phone="+33 3 29 08 20 85"
- OSM (low, 1162m, sim=1): name="Golf de Vittel Ermitage", web="https://www.golf-vittel-ermitage.com", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.533)
  - email: from fed(high, sim=0.533)
  - phone: from fed(high, sim=0.533)

### Golf Wimereux (France, 2 courses)

- DB: addr="Avenue François Mitterrand, Wimereux", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:210m,city:wimereux,jaccard:1.00], 210m, 62930 WIMEREUX): name="WIMEREUX GOLF CLUB", web="https://www.golf-wimereux.com", email="accueil@golf-wimereux.com", phone="+33 3 21 32 43 20"
- OSM (high, 64m, sim=1): name="Golf de Wimereux", web="https://www.golf-wimereux.com", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Golfclub Soufflenheim Baden-Baden (France, 1 courses)

- DB: addr="Allée du Golf, Soufflenheim", web=null, email=null, phone=null
- ffgolf (high, sim=0.5, boost=+0.55[coord:301m,city:soufflenheim], 301m, 67620 SOUFFLENHEIM): name="GOLF DE SOUFFLENHEIM", web="https://www.golfclub-soufflenheim.com", email="info@golfclub-soufflenheim.com", phone="+33 3 88 05 77 00"
- OSM (low, 639m, sim=0.5): name="Golfclub Soufflenheim", web="https://golfclub-soufflenheim.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.5)
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Grand Avignon (France, 1 courses)

- DB: addr="Vedène", web="https://golfdugrandavignon.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.8[coord:0m,db-name-substring,jaccard:0.50], 0m, 84270 VEDENE): name="GOLF DU GRAND AVIGNON", web="https://golfdugrandavignon.com/", email="info@golfgrandavignon.com", phone="+33 4 90 31 49 94"
- OSM (high, 81m, sim=1): name="Golf Grand Avignon", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Grand Saint-Emilion Golf Club (France, 1 courses)

- DB: addr="72 lieu-dit Goffre, Gardegan-et-Tourtirac", web=null, email=null, phone=null
- ffgolf (high, sim=0.765, boost=+0.7[coord:1126m,city:gardegan,jaccard:1.00], 1126m, 33350 GARDEGAN ET TOURTIRAC): name="GRAND SAINT-EMILIONNAIS GOLF CLUB", web="https://www.segolfclub.com", email="golf@segolfclub.com", phone="+33 5 57 40 88 64"
- OSM (low, 315m, sim=0.765): name="Golf Club Grand Saint-Emilionnais", web="https://www.segolfclub.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.765)
  - email: from fed(high, sim=0.765)
  - phone: from fed(high, sim=0.765)

### Granville Golf Club (France, 2 courses)

- DB: addr="1 Impasse des Dunes, Bréville-sur-Mer", web=null, email=null, phone=null
- ffgolf (low, sim=0.429, boost=+0.4[coord:537m,jaccard:0.50], 537m, 50290 BREVILLE SUR MER): name="GOLF DE GRANVILLE BAIE ST MICHEL", web="https://www.golfdegranville.com", email="contact@golfdegranville.com", phone="+33 2 33 50 23 06"
- OSM (high, 203m, sim=1): name="Golf de Granville", web=null, email=null, phone=null

### Haras de Jardy (France, 1 courses)

- DB: addr="50 Boulevard de Jardy, Vaucresson", web="http://www.golftennisjardy.com", email=null, phone=null
- ffgolf (high, sim=0.611, boost=+1.1[coord:0m,city:vaucresson,db-name-substring,jaccard:0.50], 0m, 92420 VAUCRESSON): name="GOLF&TENNIS DES HARAS DE JARDY", web="http://www.golftennisjardy.com", email="service-client@golftennisjardy.com", phone="+33 1 47 01 35 80"
- OSM (medium, 252m, sim=1): name="Golf du Haras de Jardy", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.611)
  - phone: from fed(high, sim=0.611)

### Inesis Golf Park (France, 2 courses)

- DB: addr="202 Chemin Poivré, Marcq-en-Barœul", web="https://www.inesis-golf-park.fr/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:marcq,db-name-substring,jaccard:1.00], 0m, 59700 MARCQ EN BAROEUL): name="INESIS GOLF PARK", web="https://www.inesis-golf-park.fr/", email="accueil.igp@gmail.com", phone="+33 3 28 33 49 90"
- OSM (high, 99m, sim=1): name="Inesis Golf Park", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Jiva Hill (France, 1 courses)

- DB: addr="Route d'Harée, CROZET", web="https://www.jivahillgolf.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.15[coord:0m,city:crozet,db-name-substring,jaccard:0.67], 0m, 01170 CROZET): name="JIVA HILL GOLF CLUB", web="https://www.jivahillgolf.com", email="golf@jivahill.com", phone="+33 4 50 28 48 09"
- OSM (high, 129m, sim=1): name="Jiva Hill Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### La Corbinais Golf Club (France, 2 courses)

- DB: addr="2 La Corbinais, Saint-Michel-de-Plélan", web=null, email=null, phone=null
- ffgolf (high, sim=0.6, boost=+0.9[coord:32m,city:saint,jaccard:0.67], 32m, 22980 SAINT MICHEL DE PLELAN): name="GOLF DE DINAN - LA CORBINAIS", web="https://www.golfdedinan.fr/", email="sasgolfdedinan@gmail.com", phone="+33 2 96 27 64 81"
- OSM (low, 112m, sim=0.6): name="Golf de Dinan - La Corbinais", web="https://www.golfdedinan.fr/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.6)
  - email: from fed(high, sim=0.6)
  - phone: from fed(high, sim=0.6)

### La Palmyre Golf links (France, 1 courses)

- DB: addr="Allée du Grand Large, Les Mathes", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.4[coord:538m,jaccard:0.50], 538m, 17570 LA PALMYRE): name="LA PALMYRE GOLF RESORT", web="https://www.lapalmyregolfclub.com/", email="accueil@lapalmyre.golf", phone="+33 5 46 05 04 46"
- OSM (high, 80m, sim=1): name="La Palmyre Golf Club", web="https://www.lapalmyregolfclub.com/", email="accueil@lapalmyre.golf", phone="+33 5 46 05 04 46"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### LaLargue Golf Resort (France, 2 courses)

- DB: addr="25 Rue du Golf, Mooslargue", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:56m,city:mooslargue,db-name-substring,jaccard:1.00], 56m, 68580 MOOSLARGUE): name="LALARGUE GOLF RESORT", web="https://lalargue-resort.com/", email="accueil@golflalargue.com", phone="+33 3 89 70 86 23"
- OSM (high, 241m, sim=0.75): name="Golf de La Largue", web="https://lalargue-resort.com", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Le Domaine d'Essendiéras (France, 1 courses)

- DB: addr="Essendiéras, Saint-Médard-d'Excideuil", web="http://as-golfessendieras.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.1[coord:0m,city:excideuil,jaccard:0.67,typo:essendiéras~essendieras], 0m, 24160 ST MEDARD D'EXCIDEUIL): name="GOLF DOMAINE D'ESSENDIERAS", web="http://as-golfessendieras.com", email="golf@essendieras.fr", phone="+33 5 53 55 34 34"
- OSM (medium, 346m, sim=1): name="Domaine d’Essendiéras", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Le Domaine et Golf du Roncemay (France, 1 courses)

- DB: addr="Boisserelle, Chassy", web="https://www.roncemay.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.7[coord:0m,jaccard:1.00], 0m, 89110 AILLANT SUR THOLON): name="DOMAINE ET GOLF DU RONCEMAY", web="https://www.roncemay.com", email="golf@roncemay.com", phone="+33 3 86 73 50 50"
- OSM (low, 524m, sim=1): name="Golf du Roncemay", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Le Golf De Paris (France, 1 courses)

- DB: addr="1 Rue du Camp Canadien, Saint-Cloud", web="http://www.pariscountryclub.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:saint,jaccard:1.00], 0m, 92210 SAINT CLOUD): name="GOLF DE PARIS", web="http://www.pariscountryclub.com", email="golf@pariscountryclub.com", phone="+33 1 47 77 64 66"
- OSM (low, 611m, sim=1): name="Golf de Paris", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Le Golf Parc Robert Hersant (France, 1 courses)

- DB: addr="404 Rue des Moulins, La Chaussée-d'Ivry", web="https://www.legolfparc.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:ivry,db-name-substring,jaccard:1.00], 0m, 28260 LA CHAUSSEE D'IVRY): name="LE GOLF PARC ROBERT HERSANT", web="https://www.legolfparc.com/", email="contact@legolfparc.com", phone="+33 2 37 63 06 30"
- OSM (low, 544m, sim=1): name="Le Golf Parc Robert Hersant", web="https://legolfparc.com/", email=null, phone="+33237630630"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Le Kempferhof (France, 1 courses)

- DB: addr="103 Rue du Moulin, Plobsheim", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:186m,city:plobsheim,jaccard:0.50], 186m, 67115 PLOBSHEIM): name="KEMPFERHOF RESORT", web="https://www.kempferhof.fr", email="contact@kempferhof.fr", phone="+33 3 88 98 72 72"
- OSM (high, 37m, sim=1): name="Golf du Kempferhof", web="https://kempferhof.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Le Mans Golf Club - Sargé (France, 1 courses)

- DB: addr="28 Rue du Golf, Sargé-lès-le-Mans", web="https://www.lemansgolfclub.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:mans,jaccard:1.00], 0m, 72190 SARGE LES LE MANS): name="LE MANS GOLF CLUB SARGE", web="https://www.lemansgolfclub.com", email="accueil@lemansgolfclub.com", phone="+33 2 43 76 25 07"
- OSM (low, 534m, sim=0.5): name="Golf de Sargé", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Le Provencal Golf (France, 1 courses)

- DB: addr="95, avenue de Roumanille, Biot - Sophia Antipolis", web="https://www.leprovencalgolf.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:biot,db-name-substring,jaccard:1.00], 0m, 06410 BIOT): name="LE PROVENCAL GOLF", web="https://www.leprovencalgolf.com", email="info@leprovencalgolf.com", phone="+33 4 93 00 00 57"
- OSM (medium, 261m, sim=1): name="Le Provençal Golf", web="https://www.leprovencalgolf.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Le Provençal Golf (France, 1 courses)

- DB: addr="95 Avenue Roumanille, Biot", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.05[coord:404m,city:biot,jaccard:1.00,typo:provençal~provencal], 404m, 06410 BIOT): name="LE PROVENCAL GOLF", web="https://www.leprovencalgolf.com", email="info@leprovencalgolf.com", phone="+33 4 93 00 00 57"
- OSM (high, 215m, sim=1): name="Le Provençal Golf", web="https://www.leprovencalgolf.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Les Bordes Golf Club (France, 2 courses)

- DB: addr="-, Saint-Laurent-Nouan", web=null, email=null, phone=null
- ffgolf (high, sim=0.3, boost=+0.9[coord:242m,city:saint,jaccard:0.67], 242m, 41220 SAINT LAURENT NOUAN): name="LES BORDES GOLF INTERNATIONAL", web="https://www.lesbordes.com", email="info@lesbordes.com", phone="+33 2 54 87 72 13"
- OSM (low, 630m, sim=1): name="Les Bordes Golf Club", web="https://www.lesbordesgolfclub.com", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.3)
  - email: from fed(high, sim=0.3)
  - phone: from fed(high, sim=0.3)

### Les Greens d'Eugénie (France, 1 courses)

- DB: addr="687 Route d'Eugénie, Bahus-Soubiran", web="https://golf-eugenie.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:bahus,jaccard:1.00,typo:eugénie~eugenie], 0m, 40320 BAHUS SOUBIRAN): name="LES GREENS D'EUGENIE", web="https://golf-eugenie.fr", email="contact@golf-eugenie.fr", phone="+33 5 58 51 11 63"
- OSM (low, 988m, sim=1): name="Les Greens d'Eugénie", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Les Ormes Golf Resort (France, 1 courses)

- DB: addr="Domaine Des Ormes, Dol-de-Bretagne", web="https://www.lesormes.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:bretagne,jaccard:1.00], 0m, 35120 DOL DE BRETAGNE): name="LES ORMES GOLF & RESORT", web="https://www.lesormes.com", email="golf@lesormes.com", phone="+33 2 99 73 54 44"
- OSM (medium, 467m, sim=1): name="Golf des Ormes", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Liberty Country Club (France, 1 courses)

- DB: addr="2 Route de Thiverval, Thiverval-Grignon", web="https://www.libertycountryclub.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:thiverval,db-name-substring,jaccard:1.00], 0m, 78850 THIVERVAL GRIGNON): name="LIBERTY COUNTRY CLUB", web="https://www.libertycountryclub.fr", email="stephane.goncalves@mouratoglou.com", phone="+33 6 77 13 43 67"
- OSM (low, 552m, sim=0.176): name="Golf de Thiverval-Grignon", web="https://golf.libertycountryclub.fr/", email="accueil@mouratoglou.com", phone="+33134893836"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lolivarie Golf Club (France, 1 courses)

- DB: addr="2089 Route de la Ravine, Saint-Germain-de-Belvès", web="https://www.lolivariegolfclub.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:saint,db-name-substring,jaccard:1.00], 0m, 24170 SAINT GERMAIN DE BELVES): name="LOLIVARIE GOLF CLUB", web="https://www.lolivariegolfclub.com", email="lolivariegolf24@gmail.com", phone="+33 5 53 30 22 69"
- OSM (high, 192m, sim=1): name="Golf de Lolivarie", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Lyon Salvagny Golf Club (France, 2 courses)

- DB: addr="100 Rue des Granges, La Tour-de-Salvagny", web="https://www.lyon-salvagny-golf-club.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:tour,db-name-substring,jaccard:1.00], 0m, 69890 LA TOUR DE SALVAGNY): name="LYON SALVAGNY GOLF CLUB", web="https://www.lyon-salvagny-golf-club.com", email="accueil@lyonsalvagnygolf.com", phone="+33 4 78 48 88 48"
- OSM (medium, 457m, sim=1): name="Lyon Salvagny Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Makila Golf Club (France, 1 courses)

- DB: addr="265 Route Dominique Joseph Garat, Bassussarry", web=null, email=null, phone=null
- ffgolf (high, sim=0.5, boost=+0.55[coord:847m,city:bassussarry], 847m, 64200 BASSUSSARRY): name="UGOLF MAKILA", web="https://www.makilagolfclub.com/", email="contact.makila@ugolf.eu", phone="+33 5 59 58 42 42"
- OSM (low, 686m, sim=1): name="Makila Golf Club", web="https://makilagolfclub.com", email="contact@makilagolfclub.com", phone="+33 5 59584242"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.5)
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### Miribel Jonage Golf (France, 1 courses)

- DB: addr="Chemin de la Bletta, Vaulx-en-Velin", web="https://www.golf-grand-parc.fr", email=null, phone=null
- ffgolf (high, sim=0.667, boost=+0.92[coord:0m,city:vaulx,jaccard:0.75], 0m, 69120 VAULX EN VELIN): name="GOLF PUBLIC DE MIRIBEL-JONAGE", web="https://www.golf-grand-parc.fr", email="golf.grand.parc@gmail.com", phone="+33 4 78 80 56 20"
- OSM (low, 59m, sim=0.214): name="Bureau", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.667)
  - phone: from fed(high, sim=0.667)

### Monte Carlo Golf Club (France, 1 courses)

- DB: addr="Route du Mont-Agel, La Turbie", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:turbie,db-name-substring,jaccard:1.00], 0m, 06320 LA TURBIE): name="MONTE CARLO GOLF CLUB", web=null, email="monte-carlo-golf-club@wanadoo.fr", phone="+33 4 93 41 09 11"
- OSM (medium, 367m, sim=1): name="Monte-Carlo Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Norges Country Club Golf Dijon Bourgogne (France, 2 courses)

- DB: addr="Allée Jacques Laffite, Norges-la-Ville", web="http://www.golfdijonbourgogne.com", email=null, phone=null
- ffgolf (high, sim=0.682, boost=+0.88[coord:0m,city:norges,jaccard:0.60], 0m, 21490 NORGES LA VILLE): name="COUNTRY CLUB DIJON BOURGOGNE", web="http://www.golfdijonbourgogne.com", email="accueil@golfdijonbourgogne.com", phone="+33 3 80 35 71 10"
- OSM (low, 487m, sim=0.258): name="Golf Dijon Bourgogne Jacques Laffite", web="https://www.golf-dijon.fr/", email=null, phone="+33 3 80 35 71 10"

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=0.682)
  - phone: from fed(high, sim=0.682)

### Omaha Beach Golf (France, 2 courses)

- DB: addr="La ferme St Sauveur, Port-en-Bessin-Huppain", web=null, email=null, phone=null
- ffgolf (high, sim=0.611, boost=+1.02[coord:341m,city:port,db-name-substring,jaccard:0.75], 341m, 14520 PORT EN BESSIN HUPPAIN): name="BAYEUX OMAHA BEACH GOLF", web="https://www.golf-omaha-beach.com", email="info@omahabeachgolfclub.com", phone="+33 2 31 22 12 12"
- OSM (low, 500m, sim=1): name="Golf Omaha Beach", web="https://www.golfomahabeach.fr/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=0.611)
  - email: from fed(high, sim=0.611)
  - phone: from fed(high, sim=0.611)

### Orléans Donnery (France, 1 courses)

- DB: addr="Domaine de la Touche, DONNERY", web="https://gaiaconcept-centre.fr/accueil-donnery/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.1[coord:0m,city:donnery,jaccard:0.67,typo:orléans~orleans], 0m, 45450 DONNERY): name="GOLF ORLEANS DONNERY", web="https://gaiaconcept-centre.fr/accueil-donnery/", email="direction@golfdonnery.com", phone="+33 2 38 59 25 15"
- OSM (high, 123m, sim=0.882): name="Golf d'Orléans Donnery", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Paris International Golf Club (France, 1 courses)

- DB: addr="Route du Golf, Baillet-en-France", web="https://www.paris-golf.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:baillet,db-name-substring,jaccard:1.00], 0m, 95560 BAILLET-EN-FRANCE): name="PARIS INTERNATIONAL GOLF CLUB", web="https://www.paris-golf.com", email="pigc@paris-golf.com", phone="+33 1 34 69 90 00"
- OSM (high, 223m, sim=1): name="Paris International Golf Club", web="https://www.paris-golf.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Pau Golf Club 1856 (France, 1 courses)

- DB: addr="24 Rue du Golf, Billère", web="https://www.paugolfclub.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 64140 BILLERE): name="PAU GOLF CLUB 1856", web="https://www.paugolfclub.com", email="contact@paugolfclub.com", phone="+33 5 59 13 18 56"
- OSM (low, 551m, sim=0.375): name="Pau Golf Club", web="https://www.paugolfclub.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Pont Au Golf (France, 1 courses)

- DB: addr="19 Route des Étangs, Toutainville", web="http://pontaugolf.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:toutainville,db-name-substring,jaccard:1.00], 0m, 27500 TOUTAINVILLE): name="PONT AU GOLF", web="http://pontaugolf.com", email="pontaugolf@gmail.com", phone="+33 6 95 22 12 16"
- OSM (medium, 336m, sim=1): name="Pont Au Golf", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Pyrenees Lourdes Golf Club (France, 1 courses)

- DB: addr="Chemin du Lac, Lourdes", web="https://www.lpgc.fr", email=null, phone=null
- ffgolf (high, sim=0.25, boost=+1[coord:0m,city:lourdes,jaccard:1.00], 0m, 65100 LOURDES): name="LOURDES PYRENEES GOLF CLUB", web="https://www.lpgc.fr", email="assogolflourdes@gmail.com", phone=null
- OSM (low, 539m, sim=0.25): name="Lourdes Pyrénées Golf Club", web="https://www.lpgc.fr/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.25)

### Riviera Golf De Barbossi (France, 1 courses)

- DB: addr="802 Avenue des Amazones, Mandelieu-la-Napoule", web="http://www.domainedebarbossi.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:mandelieu,db-name-substring,jaccard:1.00], 0m, 06210 MANDELIEU LA NAPOULE): name="RIVIERA GOLF DE BARBOSSI", web="http://www.domainedebarbossi.fr", email="rivieragolf@ddeb.fr", phone="+33 4 92 97 49 49"
- OSM (low, 597m, sim=0.438): name="Riviera Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Rochefort Golf Club Ocean (France, 1 courses)

- DB: addr="1608 Route Impériale, Saint-Laurent-de-la-Prée", web="https://bluegreen.fr/rochefort", email=null, phone=null
- ffgolf (high, sim=0.6, boost=+0.92[coord:0m,city:saint,jaccard:0.75], 0m, 17450 SAINT-LAURENT DE LA PREE): name="GOLF BLUEGREEN ROCHEFORT OCEAN", web="https://bluegreen.fr/rochefort", email="rochefort-ocean@bluegreen.fr", phone="+33 5 46 84 56 36"
- OSM (low, 484m, sim=0.6): name="Golf Bluegreen Rochefort Océan", web="https://bluegreen.fr/rochefort", email="rochefort-ocean@bluegreen.fr", phone="+33546845880"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.6)
  - phone: from fed(high, sim=0.6)

### Royal Mougins Golf Club (France, 1 courses)

- DB: addr="424 Avenue du Roi, Mougins", web="https://www.royalmougins.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.92[coord:0m,city:mougins,jaccard:0.75], 0m, 06250 MOUGINS): name="ROYAL MOUGINS GOLF RESORT", web="https://www.royalmougins.fr", email="proshop@royalmougins.fr", phone="+33 4 92 92 49 69"
- OSM (medium, 461m, sim=1): name="Royal Mougins Golf", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Saint Endréol Golf (France, 1 courses)

- DB: addr="4300 Route de Bagnols, La Motte", web=null, email=null, phone=null
- ffgolf (high, sim=0.636, boost=+1.1[coord:51m,city:motte,jaccard:0.67,typo:endréol~endreol], 51m, 83920 LA MOTTE): name="DOMAINE ST ENDREOL GOLF & SPA", web="https://www.st-endreol.com", email="golf@st-endreol.com", phone="+33 4 94 51 89 89"
- OSM (high, 243m, sim=1): name="Saint-Endréol", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=0.636)
  - email: from fed(high, sim=0.636)
  - phone: from fed(high, sim=0.636)

### Saint Germain les Corbeil (France, 1 courses)

- DB: addr="6 avenue du Golf, SAINT GERMAIN LES CORBEIL", web="https://jouer.golf/saint-germain-les-corbeil/", email=null, phone=null
- ffgolf (high, sim=0.682, boost=+0.85[coord:0m,city:saint,jaccard:0.50], 0m, 91250 SAINT GERMAIN LES CORBEIL): name="GARDEN GOLF ST-GERMAIN/CORBEIL", web="https://jouer.golf/saint-germain-les-corbeil/", email="contact.saintgermain@ugolf.eu", phone="+33 1 60 75 81 54"
- OSM (medium, 426m, sim=1): name="Golf de Saint-Germain-lès-Corbeil", web="https://jouer.golf/golf/ugolf-saint-germain-les-corbeil", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.682)
  - phone: from fed(high, sim=0.682)

### Saint Malo Golf (France, 2 courses)

- DB: addr="Domaine de Saint-Yvieux, Le Tronchet", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.85[coord:423m,city:tronchet,jaccard:1.00], 423m, 35540 LE TRONCHET): name="GOLF DE SAINT-MALO", web="https://www.saintmalogolf.com", email="golf@saintmalogolf.com", phone="+33 2 99 58 96 69"
- OSM (high, 43m, sim=1): name="Golf de Saint-Malo", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Sainte Baume (France, 1 courses)

- DB: addr="2664 Route de Brignoles, Nans-les-Pins", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.8[coord:2619m,city:nans,db-name-substring,jaccard:0.50], 2619m, 83860 NANS LES PINS): name="GOLF DE LA SAINTE BAUME", web="https://www.golfsaintebaume.com/fr/", email="saintebaume@resonance.golf", phone="+33 4 94 78 60 12"
- OSM (low, 2419m, sim=1): name="Golf de la Sainte-Baume", web="https://www.golfsaintebaume.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Salies de Béarn Golf Club (France, 1 courses)

- DB: addr="4 Chemin de Labarthe, Salies-de-Béarn", web="https://www.golfsalies.com/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:salies,jaccard:1.00], 0m, 64270 SALIES DE BEARN): name="GOLF DE SALIES DE BEARN", web="https://www.golfsalies.com/", email="golf.salies@wanadoo.fr", phone="+33 5 59 38 37 59"
- OSM (medium, 274m, sim=1): name="Golf de Salies-de-Béarn", web="https://www.golfsalies.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Souillac Golf & Country Club (France, 1 courses)

- DB: addr="Le Mas Del Teil , Lachapelle-Auzac", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:lachapelle,jaccard:1.00], 0m, 46200 LACHAPELLE AUZAC): name="SOUILLAC GOLF COUNTRY CLUB", web="https://www.souillaccountryclub.com", email="golf@souillaccountryclub.com", phone="+33 5 65 27 56 00"
- OSM (high, 248m, sim=1): name="Souillac Golf & Country Club", web="https://www.souillaccountryclub.com/golf/", email=null, phone="+33565275600"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Superflu Golf Club (France, 1 courses)

- DB: addr="Les Sucs, Saint-Romain-le-Puy", web="http://www.superflu.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:saint,db-name-substring,jaccard:1.00], 0m, 42610 SAINT ROMAIN LE PUY): name="SUPERFLU GOLF CLUB", web="http://www.superflu.fr", email="infos@superflu.fr", phone="+33 4 77 76 93 41"
- OSM (medium, 278m, sim=1): name="Superflu Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Swin Golf Quelaines (France, 1 courses)

- DB: addr="-", web=null, email=null, phone=null
- ffgolf (no-match, sim=0.429, 281251m, 87350 PANAZOL): name="GOLF DE LA PORCELAINE", web="https://www.golf-porcelaine.com/", email="golf@golf-porcelaine.com", phone="+33 5 55 31 10 69"
- OSM (high, 9m, sim=1): name="Swin golf Quelaines", web="http://www.swin-golf-quelaines.fr/", email=null, phone="+33 6 25 40 15 50"

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - website: from osm(high, 9m, sim=1)
  - phone: from osm(high, 9m, sim=1)

### Terre Blanche Golf Resort (France, 2 courses)

- DB: addr="3100 Route de Bagnols-en-Forêt, Tourrettes", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.78[coord:332m,city:tourrettes,jaccard:0.75], 332m, 83440 TOURRETTES): name="GOLF DE TERRE BLANCHE", web="https://www.terre-blanche.com/", email="info@terreblanchegolf.com", phone="+33 4 94 39 36 93"
- OSM (low, 780m, sim=1): name="Terre Blanche", web="https://www.terre-blanche.com", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Ugolf - Las Martines (France, 1 courses)

- DB: addr="Route de Sainte Livrade, L'Isle-Jourdain", web="https://jouer.golf/golf/ugolf-las-martines/#", email=null, phone=null
- ffgolf (high, sim=1, boost=+1[coord:0m,city:isle,jaccard:1.00], 0m, 32600 L'ISLE JOURDAIN): name="UGOLF LAS MARTINES", web="https://jouer.golf/golf/ugolf-las-martines/#", email="contact.lasmartines@ugolf.eu", phone="+33 5 62 07 27 12"
- OSM (low, 231m, sim=0.667): name="Golf de Las Martines", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### UGolf Albi - Château de Lasbordes (France, 1 courses)

- DB: addr="Chemin de las Bordes, Albi", web="https://jouer.golf/golf/ugolf-albi/", email=null, phone=null
- ffgolf (high, sim=0.5, boost=+0.85[coord:0m,city:albi,jaccard:0.50], 0m, 81000 ALBI): name="UGOLF ALBI", web="https://jouer.golf/golf/ugolf-albi/", email="albi@ugolf.eu", phone="+33 5 32 11 09 24"
- OSM (low, 454m, sim=0.45): name="Golf de Lasbordes", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.5)
  - phone: from fed(high, sim=0.5)

### UGOLF de Reims Bezannes (France, 1 courses)

- DB: addr="151 rue Louis Victor de Broglie, BEZANNES", web="https://jouer.golf/bezannes/", email=null, phone=null
- ffgolf (high, sim=0.8, boost=+0.7[coord:0m,city:bezannes], 0m, 51430 BEZANNES): name="DAILY GOLF DE REIMS BEZANNES", web="https://jouer.golf/bezannes/", email="contact.bezannes@ugolf.eu", phone="+33 3 26 85 19 50"
- OSM (low, 855m, sim=0.4): name="Golf de Bezannes", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.8)
  - phone: from fed(high, sim=0.8)

### UGolf Des Templiers (France, 1 courses)

- DB: addr="7 Rue de la Commanderie, Ivry-le-Temple", web="https://jouer.golf/golf/ugolf-templiers/", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:ivry,db-name-substring,jaccard:1.00], 0m, 60173 IVRY LE TEMPLE): name="UGOLF DES TEMPLIERS", web="https://jouer.golf/golf/ugolf-templiers/", email="contact.templiers@ugolf.eu", phone="+33 3 44 08 73 72"
- OSM (low, 445m, sim=0.6): name="Golf des Templiers", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### UGOLF Gadancourt (France, 1 courses)

- DB: addr="10 Chemin rural, Avernes", web="https://jouer.golf/gadancourt/", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 95450 GADANCOURT): name="UGOLF GADANCOURT", web="https://jouer.golf/gadancourt/", email="contact.gadancourt@ugolf.eu", phone="+33 1 34 66 12 97"
- OSM (low, 312m, sim=0.625): name="Golf de Gadancourt", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### UGOLF Golf de Bordeaux Villenave d'Ornon (France, 1 courses)

- DB: addr="43 Avenue Mirieu de Labarre, Villenave-d'Ornon", web="https://jouer.golf/villenave-dornon/", email=null, phone=null
- ffgolf (high, sim=0.719, boost=+0.88[coord:0m,city:villenave,jaccard:0.60], 0m, 33140 VILLENAVE-D'ORNON): name="UGOLF VILLENAVE D'ORNON", web="https://jouer.golf/villenave-dornon/", email="contact.villenavedornon@ugolf.eu", phone="+33 5 56 74 44 24"
- OSM (low, 693m, sim=1): name="UGOLF Bordeaux Villenave d’Ornon", web="https://jouer.golf/golf/ugolf-villenave-dornon/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=0.719)
  - phone: from fed(high, sim=0.719)

### Ugolf Golf du Coudray-Montceaux (France, 2 courses)

- DB: addr="Avenue du Coudray, Le Coudray-Montceaux", web="https://jouer.golf/coudray/", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.92[coord:0m,city:coudray,jaccard:0.75], 0m, 91830 LE COUDRAY MONTCEAUX): name="UGOLF DU COUDRAY MONTCEAUX", web="https://jouer.golf/coudray/", email="contact.coudray@ugolf.eu", phone="+33 1 64 93 81 76"
- OSM (low, 353m, sim=0.652): name="Golf du Coudray-Monceau", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### UGolf Mennecy Chevannes (France, 2 courses)

- DB: addr="Rue du Bois Marsas, Chevannes", web=null, email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:2171m,city:chevannes,db-name-substring,jaccard:1.00], 2171m, 91750 CHEVANNES): name="UGOLF MENNECY CHEVANNES", web="https://jouer.golf/golf/ugolf-mennecy-chevannes/", email="contact.chevannes@ugolf.eu", phone="+33 1 64 99 88 74"
- OSM (low, 1755m, sim=0.739): name="Golf de Mennecy Chevannes", web=null, email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=high):
  - website: from fed(high, sim=1)
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### UGolf Verrières-le-Buisson (France, 1 courses)

- DB: addr="Voie de la Vallée de la Bièvre, Verrières-le-Buisson", web="http://www.dailygolf-verrieres.fr", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.2[coord:0m,city:buisson,jaccard:1.00,typo:verrières~verrieres], 0m, 91370 VERRIERES LE BUISSON): name="UGOLF VERRIERES-LE-BUISSON", web="http://www.dailygolf-verrieres.fr", email="contact.verrieres@ugolf.eu", phone="+33 1 60 19 37 82"
- OSM (high, 163m, sim=0.739): name="Golf de Verrières-le-Buisson", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Valberg Golf Club (France, 1 courses)

- DB: addr="Route Sacha Sosno, Péone", web="https://valberggolfclub.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+0.95[coord:0m,db-name-substring,jaccard:1.00], 0m, 06470 VALBERG): name="VALBERG GOLF CLUB", web="https://valberggolfclub.com", email="golf@valberg.com", phone="+33 6 86 69 97 26"
- OSM (medium, 360m, sim=1): name="Valberg golf Club", web="https://www.valberggolfclub.com/", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Victoria Golf Club (France, 1 courses)

- DB: addr="Chemin du Val Martin, Valbonne", web="https://victoria-golfclub.com", email=null, phone=null
- ffgolf (high, sim=1, boost=+1.25[coord:0m,city:valbonne,db-name-substring,jaccard:1.00], 0m, 06560 VALBONNE): name="VICTORIA GOLF CLUB", web="https://victoria-golfclub.com", email="accueilgolfvgc@hotmail.fr", phone="+33 4 93 12 23 26"
- OSM (medium, 447m, sim=1): name="Victoria Golf Club", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=high):
  - email: from fed(high, sim=1)
  - phone: from fed(high, sim=1)

### Vincent Golf La Grande-Motte (France, 3 courses)

- DB: addr="1478 Avenue du Golf, La Grande-Motte", web=null, email=null, phone=null
- ffgolf (high, sim=0.6, boost=+0.6[coord:1815m,city:grande,jaccard:0.67], 1815m, 34280 LA GRANDE MOTTE): name="GOLF DE LA GRANDE MOTTE", web="http://www.golflagrandemotte.com", email="golf@lagrandemotte.fr", phone="+33 4 67 56 05 00"
- OSM (no-match, 1511m, sim=0.6): name="Golf de la Grande Motte", web="https://www.golflagrandemotte.com", email=null, phone=null

**Proposed UPDATE** (alle 3 course rows for klub, overall=high):
  - website: from fed(high, sim=0.6)
  - email: from fed(high, sim=0.6)
  - phone: from fed(high, sim=0.6)

## Medium confidence (review before applying)

### Daily Golf de Buc (France, 1 courses)

- DB: addr="1 Rue de la Croix Blanche, Buc", web=null, email=null, phone=null
- ffgolf (medium, sim=0.692, boost=+0.25[coord:2827m,jaccard:0.50], 2827m, 78530 BUC): name="DAILYGOLF DE BUC", web="https://jouer.golf/buc-daily/", email="contact@dailygolf-buc.fr", phone="+33 1 39 20 95 64"
- OSM (low, 217m, sim=0.25): name="Racing Club de France - Golf de la Boulie", web="https://racingclubdefrancelaboulie.com", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.692)
  - email: from fed(medium, sim=0.692)
  - phone: from fed(medium, sim=0.692)

### Garden Golf De Lacanau (France, 1 courses)

- DB: addr="Domaine de l’Ardilouse, Lacanau-Océan", web=null, email=null, phone=null
- ffgolf (medium, sim=0.304, boost=+0.6[coord:1527m,city:lacanau,name-token:ardilouse], 1527m, 33680 LACANAU): name="UGOLF LACANAU ARDILOUSE", web="https://jouer.golf/lacanau-ocean/", email="contact.lacanau-ardilouse@ugolf.eu", phone="+33 5 56 03 92 98"
- OSM (low, 322m, sim=0.44): name="Golf Bluegreen Lacanau-La-Méjanne", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.304)
  - email: from fed(medium, sim=0.304)
  - phone: from fed(medium, sim=0.304)

### Garden Ponds Golf Fiac (France, 1 courses)

- DB: addr="Brazis, Fiac", web=null, email=null, phone=null
- ffgolf (medium, sim=0.353, boost=+0.55[coord:677m,city:fiac], 677m, 81500 FIAC): name="UGOLF FIAC", web="https://jouer.golf/etangs-de-fiac/#presentation", email="contact@gardengolf-fiac.fr", phone="+33 5 63 70 64 70"
- OSM (low, 687m, sim=0.471): name="Golf des Étangs de Fiac", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.353)
  - email: from fed(medium, sim=0.353)
  - phone: from fed(medium, sim=0.353)

### Golf Blue Green Mignaloux Beauvoir (France, 1 courses)

- DB: addr="635 Route de Beauvoir, Mignaloux-Beauvoir", web="https://bluegreen.fr", email=null, phone=null
- ffgolf (medium, sim=0.379, boost=+0.55[coord:421m,city:mignaloux], 421m, 86550 MIGNALOUX BEAUVOIR): name="GOLF DE POITIERS-MIGNALOUX", web="https://golfmignaloux.fr", email="contact@golfmignaloux.fr", phone="+33 5 49 31 56 15"
- OSM (low, 58m, sim=0.621): name="Golf Mignaloux-Beauvoir", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - email: from fed(medium, sim=0.379)
  - phone: from fed(medium, sim=0.379)

### Golf Blue Green Odet (France, 2 courses)

- DB: addr="-, Bénodet", web="https://bluegreen.fr", email=null, phone=null
- ffgolf (medium, sim=0.813, 3632m, 29950 BENODET): name="GOLF BLUEGREEN L'ODET", web="https://bluegreen.fr/odet", email="blemetayer@bluegreen.fr", phone="+33 2 98 54 87 88"
- OSM (no-match, 78754m, sim=0.647): name="Golf Bluegreen Saint-Laurent", web="https://bluegreen.fr/saint-laurent/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - email: from fed(medium, sim=0.813)
  - phone: from fed(medium, sim=0.813)

### Golf d'Ammerschwihr/Trois-Epis (France, 1 courses)

- DB: addr="Allée du Golf, Ammerschwihr", web=null, email=null, phone=null
- ffgolf (medium, sim=0.36, boost=+0.55[coord:505m,city:ammerschwihr], 505m, 68770 AMMERSCHWIHR): name="UGOLF AMMERSCHWIHR", web="https://jouer.golf/golf/ugolf-ammerschwihr/", email="accueil@ammerschwihr.ugolf.eu", phone="+33 3 89 47 17 30"
- OSM (low, 726m, sim=0.781): name="Golf public d'Ammerschwihr Trois-Epis", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.36)
  - email: from fed(medium, sim=0.36)
  - phone: from fed(medium, sim=0.36)

### Golf des Ajoncs d'Or (France, 1 courses)

- DB: addr="Avenue des Ajoncs d'Or, Lantic", web=null, email=null, phone=null
- ffgolf (no-match, sim=0, boost=+0.7[coord:156m,city:lantic], 156m, 22410 LANTIC): name="GOLF DE LA BAIE DE SAINT-BRIEUC", web="http://www.golfbaiedesaintbrieuc.bzh/", email="golf@sbaa.fr", phone="+33 2 96 71 90 74"
- OSM (medium, 323m, sim=1): name="Golf des Ajoncs d'or", web="http://www.golfdesajoncsdor.fr", email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from osm(medium, 323m, sim=1)

### Golf du Mont Saint Jean (France, 1 courses)

- DB: addr="286 Route du Mont-Saint-Jean, Les Rousses", web="https://www.domainemontsaintjean.com", email=null, phone=null
- ffgolf (no-match, sim=0.636, boost=+0.45[city:saint,jaccard:0.50], 581813m, 40090 SAINT AVIT): name="GOLF DE MONT DE MARSAN", web="https://www.golfmontdemarsan.com", email="montdemarsan.golf@gmail.com", phone="+33 5 58 75 63 05"
- OSM (medium, 379m, sim=1): name="Golf du Mont Saint-Jean", web="https://www.domainemontsaintjean.com", email=null, phone="+33 3 84 60 09 71"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - phone: from osm(medium, 379m, sim=1)

### Golf Green Parc Illies (France, 1 courses)

- DB: addr="3 bis Ferme de l'Écuelle, Illies", web=null, email=null, phone=null
- ffgolf (medium, sim=0.353, boost=+0.55[coord:500m,city:illies], 500m, 59480 ILLIES): name="GOLF LE VERT PARC", web="https://www.golflevertparc.com/", email="accueil@golflevertparc.com", phone="+33 3 20 29 37 87"
- OSM (low, 75m, sim=0.353): name="Golf du Vert Parc", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.353)
  - email: from fed(medium, sim=0.353)
  - phone: from fed(medium, sim=0.353)

### Golf Louis Rouyer Guillet (France, 2 courses)

- DB: addr="43 Route du Golf, Fontcouverte", web=null, email=null, phone=null
- ffgolf (medium, sim=0.15, boost=+0.7[coord:232m,city:fontcouverte], 232m, 17100 FONTCOUVERTE): name="GOLF DE SAINTES", web="http://www.golf-saintes.fr", email="golfdesaintes@ville-saintes.fr", phone="+33 5 46 74 27 61"
- OSM (medium, 373m, sim=1): name="Golf Louis-Rouyer-Guillet", web="http://www.golf-saintes.fr/", email="golf-louis-rouyer-guillet@ville-saintes.fr", phone="+33 5 46 74 27 61"

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.15)
  - email: from fed(medium, sim=0.15)
  - phone: from fed(medium, sim=0.15)

### Golf Old Course Cannes Mandelieu (France, 2 courses)

- DB: addr="Route du Golf", web=null, email=null, phone=null
- ffgolf (medium, sim=0.5, boost=+0.4[coord:282m,jaccard:0.50], 282m, 06210 MANDELIEU LA NAPOULE): name="OLD COURSE CANNES", web="http://www.golfoldcourse.fr/", email="contact@golfoldcourse.fr", phone="+33 4 92 97 32 00"
- OSM (low, 433m, sim=0.5): name="Old Course Cannes Golf Links", web="https://www.golfoldcourse.com/", email=null, phone="+33 4 92 97 32 00"

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.5)
  - email: from fed(medium, sim=0.5)
  - phone: from fed(medium, sim=0.5)

### Golf Olhain Park (France, 1 courses)

- DB: addr="Rue des Garinelles, Fresnicourt-le-Dolmen", web=null, email=null, phone=null
- ffgolf (medium, sim=0.154, boost=+0.75[coord:463m,city:fresnicourt,jaccard:0.67], 463m, 62150 FRESNICOURT LE DOLMEN): name="GOLF DU PARC D'OLHAIN", web="https://www.golfdolhain.fr", email="golf@parcdolhain.fr", phone="+33 3 21 02 17 03"
- OSM (low, 89m, sim=0.2): name="Golf Public D'Olhain", web=null, email=null, phone=null

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.154)
  - email: from fed(medium, sim=0.154)
  - phone: from fed(medium, sim=0.154)

### Golf Rustique Epherra (France, 1 courses)

- DB: addr="420 Chemin d'Urlo Erreka, Souraïde", web=null, email=null, phone=null
- ffgolf (medium, sim=0.438, boost=+0.45[coord:418m,jaccard:0.67], 418m, 64250 SOURAIDE): name="GOLF EPHERRA", web=null, email="contact@golf-basque.com", phone="+33 5 59 93 84 06"
- OSM (low, 63m, sim=0.105): name="Golf Epherra - Trous 1 à 9", web="https://www.golf-basque.com/", email="contact@golf-basque.com", phone="+33 5 59 93 84 06"

**Proposed UPDATE** (alle 1 course rows for klub, overall=medium):
  - email: from fed(medium, sim=0.438)
  - phone: from fed(medium, sim=0.438)

### Golf Thionville rive droite (France, 2 courses)

- DB: addr="4 Rue Denis Papin, Basse-Ham", web=null, email=null, phone=null
- ffgolf (medium, sim=0.318, boost=+0.55[coord:276m,city:basse], 276m, 57970 BASSE HAM): name="UGOLF THIONVILLE RD", web="https://jouer.golf/golf/ugolf-thionville-rd", email="contact.thionville@ugolf.eu", phone="+33 3 82 83 08 81"
- OSM (low, 368m, sim=0.318): name="UGolf de Thionville RD", web="https://jouer.golf/golf/ugolf-thionville-rd/", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.318)
  - email: from fed(medium, sim=0.318)
  - phone: from fed(medium, sim=0.318)

### Rcf - Golf De La Boulie (France, 2 courses)

- DB: addr="Rue du Pont Colbert, Versailles", web=null, email=null, phone=null
- ffgolf (medium, sim=0.308, boost=+0.55[coord:662m,city:versailles], 662m, 78000 VERSAILLES): name="RACING CLUB DE FRANCE", web="https://racingclubdefrancelaboulie.com/", email="golfdelaboulie@rcf.asso.fr", phone="+33 1 39 50 59 41"
- OSM (low, 217m, sim=0.5): name="Racing Club de France - Golf de la Boulie", web="https://racingclubdefrancelaboulie.com", email=null, phone=null

**Proposed UPDATE** (alle 2 course rows for klub, overall=medium):
  - website: from fed(medium, sim=0.308)
  - email: from fed(medium, sim=0.308)
  - phone: from fed(medium, sim=0.308)

## Low confidence (manual decision)

### Democratic Golf (France, 1 courses)

- DB: addr="Allee Robert Jondet, Roquebrune-sur-Argens", web=null, email=null, phone=null
- ffgolf (low, sim=0, boost=+0.75[coord:749m,city:roquebrune,name-token:roquebrune], 749m, 83520 ROQUEBRUNE SUR ARGENS): name="GOLF DE ROQUEBRUNE", web="https://www.golfderoquebrune.com", email="roquebrune@resonance.golf", phone="+33 4 94 19 60 35"
- OSM (low, 729m, sim=0): name="Golf de Roquebrune", web="https://www.golfderoquebrune.com", email=null, phone=null

### Garden Golf Evreux (France, 1 courses)

- DB: addr="Chemin du Valeme, Évreux", web=null, email=null, phone=null
- ffgolf (low, sim=0.389, boost=+0.4[coord:625m,jaccard:0.50], 625m, 27000 EVREUX): name="GOLF MUNICIPAL D'EVREUX", web="https://golf-evreux.com", email="golf@evreux.fr", phone="+33 2 32 31 92 83"
- OSM (low, 142m, sim=0.615): name="Golf d'Evreux", web=null, email=null, phone=null

### Golf de Giez (France, 2 courses)

- DB: addr="304 Route du Thovey, Giez", web=null, email=null, phone=null
- ffgolf (low, sim=0.2, boost=+0.55[coord:258m,city:giez], 258m, 74210 GIEZ): name="GOLF DES ALPES", web="http://www.legolfdesalpes.com", email="accueil@legolfdesalpes.com", phone="+33 4 50 44 48 41"
- OSM (low, 33m, sim=0.2): name="Golf des Alpes", web="https://www.legolfdesalpes.com/", email=null, phone=null

### Golf de Veigy (France, 1 courses)

- DB: addr="825 Route des Plantets, Veigy-Foncenex", web=null, email=null, phone=null
- ffgolf (low, sim=0.111, boost=+0.7[coord:210m,city:veigy], 210m, 74140 VEIGY-FONCENEX): name="CEG DU LEMAN", web="https://www.golfdeveigy.com", email="infoceg@orange.fr", phone="+33 4 50 94 99 52"
- OSM (low, 4m, sim=0.2): name="Golf du Léman", web="https://www.golfdeveigy.com/", email="infoceg@orange.fr", phone="+33 4 50 94 99 52"

### Valcros Golf Association Sportive (France, 1 courses)

- DB: addr="Quartier de Valcros, La Londe-les-Maures", web=null, email=null, phone=null
- ffgolf (low, sim=0.25, boost=+0.55[coord:1410m,city:londe,jaccard:0.50], 1410m, 83250 LA LONDE LES MAURES): name="GOLF DE VALCROS", web="https://www.golfdevalcros.com", email="golfdevalcros@orange.fr", phone="+33 4 94 66 81 02"
- OSM (low, 28m, sim=0.25): name="Golf de Valcros", web=null, email=null, phone=null

## Orphans — DB klubber uden ffgolf-match

- **Apremont Golf** (1 courses) (best fed sim=0.8 → GOLF D'APREMONT), OSM low 16m
- **Belesbat** (1 courses) (best fed sim=0.214 → GOLF DE MEAUX BOUTIGNY), OSM no-match 59829m
- **Biesles** (1 courses) (best fed sim=0.571 → GOLF CHATEAU LES MERLES), OSM no-match 299048m
- **Champagne Golf** (1 courses) (best fed sim=0.889 → GOLF CLUB DE CAMPAGNE), OSM high 121m
- **Chateau de Barbet** (1 courses) (best fed sim=0.6 → GOLF DE BARBENTANE), OSM medium 402m
- **Château de l'Hermitage** (1 courses) (best fed sim=1 → GOLF DE L'HERMITAGE), OSM low 199755m
- **Cité Golf Marcq** (1 courses) (best fed sim=0.6 → GOLF DE LA CITE VERTE), OSM no-match 1310m
- **Daily Golf Rosny** (1 courses) (best fed sim=0.333 → UGOLF DE ROSNY SOUS BOIS), OSM no-match 1104m
- **Domaine de Saint-Clair** (1 courses) (best fed sim=1 → GOLF DU DOMAINE DE SAINT CLAIR), OSM low 333517m
- **Golf Amnéville** (1 courses) (best fed sim=0.7 → GOLF DE MENNEVILLE), OSM low 660696m
- **Golf Area Des Forges** (9 courses) (best fed sim=0.545 → GOLF DOMAINE DE FORGES), OSM low 314m
- **Golf Barrière de Saint-Julien** (2 courses) (best fed sim=0.611 → GOLF BARRIERE DEAUVILLE), OSM no-match 10133m
- **Golf Blue Green Avrillé** (2 courses) (best fed sim=0.737 → GOLF BLUEGREEN GUERVILLE), OSM no-match 1608m
- **Golf Blue Green de la Domangère** (1 courses) (best fed sim=0.95 → GOLF BLUEGREEN LA DOMANGERE), OSM low 323m
- **Golf Blue Green Estérel** (3 courses) (best fed sim=0.556 → GOLF BLUEGREEN SAINT AUBIN), OSM low 270m
- **Golf Blue Green Pessac** (3 courses) (best fed sim=0.941 → GOLF BLUEGREEN PESSAC), OSM no-match 362049m
- **Golf Blue Green Saint-Laurent** (2 courses) (best fed sim=0.722 → GOLF BLUEGREEN SAINT AUBIN), OSM medium 331m
- **Golf Blue Green Villeray** (1 courses) (best fed sim=0.526 → GOLF BLUEGREEN SAINT AUBIN), OSM no-match 240968m
- **Golf Bluegreen Bellefontaine** (9 courses) (best fed sim=0.652 → GOLF BLUEGREEN SAINT ETIENNE), OSM medium 451m
- **Golf Bluegreen Dunkerque Grand Littoral** (3 courses) (best fed sim=0.588 → GOLF BLUEGREEN QUETIGNY GRAND DIJON), OSM no-match 536888m
- **Golf Bluegreen Saint-Aubin** (3 courses) (best fed sim=1 → GOLF BLUEGREEN SAINT AUBIN), OSM low 130443m
- **Golf Bluegreen Saint-Etienne** (2 courses) (best fed sim=0.647 → GOLF BLUEGREEN SAINT AUBIN), OSM low 214647m
- **Golf Clément-Ader** (1 courses) (best fed sim=0.5 → GOLF DE CAEN LA MER), OSM high 103m
- **Golf Club de L'Ariège** (2 courses) (best fed sim=0.5 → ECOGOLF DE L'ARIEGE), OSM no-match 628992m
- **Golf Club Les Dryades** (1 courses) (best fed sim=0.5 → GOLF DE SERVANES), OSM medium 424m
- **Golf Club Oléron** (2 courses) (best fed sim=0.75 → GOLF CLUB D'OLERON), OSM low 5474m
- **Golf Country Club Bale** (1 courses) (best fed sim=0.6 → GOLF DE BAUGE), OSM low 369m
- **Golf de Forges-les-Bains** (1 courses) (best fed sim=0.5 → GOLF D'AIX LES BAINS), OSM low 533m
- **Golf de Garonne** (1 courses) (best fed sim=0.583 → CEDR GOLF DE GARONNE), OSM low 43m
- **Golf de la Vaucouleurs** (2 courses) (best fed sim=0.545 → DOMAINE ET GOLF DE VAUGOUARD), OSM high 138m
- **Golf de la Vigne de Mesquer** (1 courses) (best fed sim=0.389 → GOLF LA LIGNE BLEUE DES VOSGES), OSM low 777m
- **Golf de Lamalou-Les-Bains** (1 courses) (best fed sim=0.538 → GOLF D'AIX LES BAINS), OSM medium 472m
- **Golf de Réau** (1 courses) (best fed sim=0.5 → GOLF DU REGINU), OSM low 2m
- **Golf de Rimaison** (1 courses) (best fed sim=0.5 → GOLF DE SAINT SAMSON), OSM high 16m
- **Golf Départemental De La Poudrerie** (1 courses) (best fed sim=0.68 → GOLF DEPARTEMENTAL DE L'ESPERANCE), OSM low 835m
- **Golf des Verneys** (1 courses) (best fed sim=0.571 → GOLF CHATEAU LES MERLES), OSM high 27m
- **Golf du Château de Bournet** (1 courses) (best fed sim=0.857 → GOLF DU CHATEAU DE BOURNEL), OSM low 380360m
- **Golf du Chateau de Hombourg** (2 courses) (best fed sim=0.667 → GOLF DE CHERBOURG), OSM high 37m
- **Golf du Chateau Pallanne** (2 courses) (best fed sim=0.625 → GOLF DU CHATEAU DE LA VALLADE), OSM high 102m
- **Golf du Granier-Apremont** (1 courses) (best fed sim=0.563 → GOLF D'APREMONT), OSM medium 324m
- **Golf du Mont d'Arbois** (1 courses) (best fed sim=0.538 → GOLF DE MONT DE MARSAN), OSM high 72m
- **Golf du Roannais** (1 courses) (best fed sim=0.111 → GOLF CLUB DOMAINE DE CHAMPLONG), OSM no-match 421337m
- **Golf du Senonais** (1 courses) (best fed sim=0.375 → GOLF DE SAINTES), OSM high 35m
- **Golf du Stade Français** (1 courses) (best fed sim=0.636 → GOLF DE COURSON STADE FRANCAIS), OSM low 200m
- **Golf Hippodrome** (2 courses) (best fed sim=0.833 → GOLF DE L'HIPPODROME), OSM high 20m
- **Golf International de Longwy** (1 courses) (best fed sim=0.8 → GOLF INTERNATIONAL DE ROISSY), OSM low 755m
- **Golf municipal de Cesson-Sévigné** (2 courses) (best fed sim=0.542 → GOLF MUNICIPAL D'EVREUX), OSM low 733m
- **Golf Pitch130** (1 courses) (best fed sim=0.5 → GOLF DE BITCHE), OSM low 763m
- **Golf Pontarlier** (1 courses) (best fed sim=1 → GOLF CLUB DE PONTARLIER), OSM low 66m
- **Golf Resort de Digne-les-Bains** (2 courses) (best fed sim=0.636 → GOLF D'AIX LES BAINS), OSM low 401m
- **Golf Saint Apollinaire Michelbach-Le-Haut** (2 courses) (best fed sim=0.333 → GOLF DE GRANVILLE BAIE ST MICHEL), OSM low 160m
- **Golf Saint Gabriel** (2 courses) (best fed sim=0.455 → GOLF DE LA BAIE DE SAINT-BRIEUC), OSM no-match 153802m
- **Golf Sologne** (1 courses) (best fed sim=0.286 → GOLF DE SAINT-LO), OSM no-match 305572m
- **Golf Thivet** (1 courses) (best fed sim=0.5 → GOLF DE CHIBERTA), OSM no-match 725498m
- **Le Golf Des Alouettes** (1 courses) (best fed sim=0.667 → GOLF DU CHATEAU DE LA CHOUETTE), OSM low 933m
- **Mérignies Golf and Country Club** (9 courses) (best fed sim=0.692 → MERIGNIES GOLF COUNTRY CLUB), OSM low 92m
- **Neo-Golf** (2 courses) (best fed sim=0.333 → GOLF DE SAINT-LO), OSM no-match 2444m
- **Sainte Victoire Golf Club** (1 courses) (best fed sim=0.625 → VICTORIA GOLF CLUB), OSM no-match 123468m
- **SWIN GOLF BIESLES** (1 courses) (best fed sim=0.5 → GOLF DE LA COTE DES ISLES), OSM no-match 502003m
- **Swin Golf Cholet** (1 courses) (best fed sim=0.273 → GOLF DE SAINT JEAN DE MONTS), OSM no-match 6676m
- **Swin Golf des 2 caps** (1 courses) (best fed sim=0.455 → SWING HOUSE), OSM no-match 408563m
- **Swin Golf Saint Philbert de Grand Lieu** (1 courses) (best fed sim=0.333 → GOLF DE DEAUVILLE ST GATIEN), OSM low 0m
- **Swin-Golf Ancenis** (1 courses) (best fed sim=0.429 → GOLF DE CAEN GARCELLES), OSM low 7m
- **Swin-Golf Combrée** (1 courses) (best fed sim=0.5 → SWING HOUSE), OSM no-match 567781m
- **Swingolf - Multigolf Meslay du Maine** (1 courses) (best fed sim=0.387 → UGOLF MIONNAY GARDEN), OSM low 18m
- **Swingolf Cambray le Parcours** (1 courses) (best fed sim=0.438 → UGOLF ALBI), OSM low 194m
- **UGOLF Golf de Rochefort** (1 courses) (best fed sim=0.533 → GOLF DU BOIS DES ROCHERS), OSM no-match 1019m
