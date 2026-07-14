# Portugal match report

Trin 4: kortlæg DB-rækker (country=Portugal) mod FPG-scrapen.
Database er **ikke ændret**.

## Oversigt

| Kategori | Antal |
|---|---:|
| FPG-klubber (unikke ncourse_id) | 75 |
| DB-rækker (Portugal) | 115 |
| DB unikke klub-navne | 80 |
| EXACT matches | 34 |
| FUZZY matches (manuel review) | 2 |
| DB_ONLY klubber (ikke i FPG) | 44 (70 rækker) |
| FPG_ONLY (mangler i DB) | 39 |

## EXACT matches

| DB club | FPG club_name | ncourse | Region | Tier | DB rows |
|---|---|---|---|---|---:|
| Áxis Golfe Ponte de Lima | Áxis Golfe Ponte de Lima | 041 | Zona Norte | tier1-lower | 1 |
| Benamor Golf | Benamor Golf | 011 | Algarve | tier1-lower | 1 |
| Boavista Golfe | Boavista Golfe | 059 | Algarve | tier1-lower | 1 |
| Campo de Golfe da Ilha Terceira | Campo de Golfe da Ilha Terceira | 050 | Ilhas | tier1-lower | 1 |
| Campo de Golfe das Furnas | Campo de Golfe das Furnas | 046 | Ilhas | tier1-lower | 1 |
| Campo de Golfe de Amarante | Campo de Golfe de Amarante | 030 | Zona Norte | tier1-lower | 1 |
| Campo de Golfe de Rilhadas | Campo de Golfe de Rilhadas | 086 | Zona Norte | tier1-lower | 1 |
| Campo de Golfe do Belas Clube de Campo | Campo de Golfe do Belas Clube de Campo | 010 | Lisboa | tier1-lower | 1 |
| CampoReal | CampoReal | 075 | Lisboa | tier1-lower | 2 |
| Castro Marim Golf & Country Club | Castro Marim Golf & Country Club | 067 | Algarve | tier1-lower | 3 |
| Club Golf Miramar | Club Golf Miramar | 038 | Zona Norte | tier1-lower | 1 |
| Espiche Golf | Espiche Golf | 070 | Algarve | tier1-lower | 1 |
| Estela Golf | Estela Golf | 036 | Zona Norte | tier1-lower | 1 |
| Golfe da Quinta do Fojo | Golfe da Quinta do Fojo | 068 | Zona Norte | tier1-lower | 1 |
| Guardian Bom Sucesso Golf | Guardian Bom Sucesso Golf | 090 | Zona Centro | tier1-lower | 1 |
| Lisbon Sports Club | Lisbon Sports Club | 026 | Lisboa | tier1-lower | 1 |
| Monte Rei Golf & Country Club | Monte Rei Golf & Country Club | 085 | Algarve | tier1-lower | 1 |
| Montebelo Golfe | Montebelo Golfe | 012 | Zona Centro | tier1-lower | 3 |
| Morgado Golf Course | Morgado Golf Course | 063 | Algarve | tier1-lower | 2 |
| Oitavos Dunes | Oitavos Dunes | 037 | Lisboa | tier1-lower | 1 |
| Oporto Golf Club | Oporto Golf Club | 031 | Zona Norte | tier1-lower | 1 |
| Palheiro Golfe | Palheiro Golfe | 032 | Ilhas | tier1-lower | 1 |
| Pestana Silves Golf Resort | Pestana Silves Golf Resort | 081 | Algarve | tier1-lower | 1 |
| Pinheiros Altos | Pinheiros Altos | 080 | Algarve | tier1-lower | 3 |
| Porto Santo Golfe | Porto Santo Golfe | 073 | Ilhas | tier1-lower | 1 |
| Quinta do Peru Golf & Country Club | Quinta do Peru Golf & Country Club | 007 | Zona Centro | tier1-lower | 1 |
| Royal Óbidos | Royal Óbidos | 056 | Zona Centro | tier1-lower | 1 |
| Salgados Golf | Salgados Golf | 017 | Algarve | tier1-lower | 1 |
| Santo Estêvão Golfe | Santo Estêvão Golfe | 071 | Lisboa | tier1-lower | 1 |
| THE ONE Hills Lisbon City Golf | THE ONE Hills Lisbon City Golf | 064 | Lisboa | tier1-lower | 1 |
| Vale de Milho Golf | Vale de Milho Golf | 014 | Algarve | tier1-lower | 1 |
| Vidago Palace Golf Course | Vidago Palace Golf Course | 060 | Zona Norte | tier1-lower | 1 |
| West Cliffs | West Cliffs | 108 | Zona Centro | tier1-lower | 1 |
| Praia D'El Rey Golf Course | Praia D' El Rey Golf Course | 002 | Zona Centro | tier2-norm | 1 |

## FUZZY matches (manuel review)

| DB club | FPG club_name | ncourse | Region | Note | DB rows |
|---|---|---|---|---|---:|
| PGA Aroeira | PGA Aroeira Nº 1 e PGA Aroeira Nº 2 | 004 | Zona Centro | DB ⊂ FPG; matched 11 chars | 2 |
| Tróia Golf | Troia Golf Championship Course | 005 | Lisboa | DB ⊂ FPG; matched 10 chars | 1 |

## DB_ONLY — i DB men ingen FPG-match

Sandsynligt: resorts/private/par-3-baner som ikke er listet på FPG.
Manuel inspektion af `holes`/`is_combo`/`golfapi_id` afslører junk-kandidater.

### Academia de Golfe de Lisboa

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 10a96f86-6594-493c-8bc4-67093a0d4f46 | 18-hole course | 18 |  | false | 0121462131782190717 |

### Aldeia dos Capuchos - Hotel, Golf & Spa

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| c2bf7fc3-f6d6-4435-b02d-205d5320738d | Aldeia dos Capuchos | 18 |  | false | 0121300007810538 |
| 1150b61a-5b26-4500-8247-dc41169af280 | Campo Aldeia dos Capuchos | 9 |  | false | 0111361136346549 |

### Amendoeira Golf Resort

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 4135a3a9-df7b-4a5e-8492-6baeaf6538a8 | Faldo | 18 |  | false | 0121296807681595 |
| 33e82a9c-19fb-48b9-b662-a33f9f2550a3 | O'Connor | 18 |  | false | 0121447261470167098 |

### Arrábida Resort & Golf Academy

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 7b67dfaf-8a34-41c6-af3d-97e8a6ec1dd0 | Arrabida Golf Academy | 18 |  | false | 0121432015743648568 |

### Balaia Golf Village Resort & Golf

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 0459a3a9-bf9c-4a69-a3ad-c92a39828ebc | Balaia Golf | 9 |  | false | 0111130836689812 |

### Batalha Golf Course

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| db0584d7-bbe7-4e38-8d5b-6d5298f3e498 | A + B | 18 |  | true | 0121112791934030 |
| 2d3b6e1d-4a35-4509-bf37-9d24d7ba37cf | A + C | 18 |  | true | 0131112791934030 |
| a3bf5669-d9be-4dcd-9667-7b38e0d40e88 | B + C | 18 |  | true | 0231112791934030 |

### Campo de Golfe Club Botado

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| af1ad3a8-2468-47e6-b5ad-9f7700fbd2da | 9-hole course | 9 |  | false | 0111198503187869 |

### Campo de Golfe de Vale Pisão

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| f69081ed-c1cc-4002-96ba-8c9ef568460c | 18-hole course | 18 |  | false | 0121311979038728 |

### Cantanhede Golf Club

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 41f1d5bf-446f-45af-9ae1-37d0238dcd82 | Marialva / Laranjas | 18 |  | false | 0121502455495721120 |
| 08449139-905c-4cd9-8fe8-36fa3fdf3cd9 | Pedra / Brancas | 18 |  | false | 0121420313039709345 |
| 6fcdadf9-758d-4d78-a29e-a3b557cf2f6a | Vinha / Amarelas | 18 |  | false | 012140615400888442 |

### Centro Nacional de Formação de Golfe do Jamor

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 0338e6f4-fdc1-4e9d-8f41-e4f1f5a8102a | Golfe Jamor | 9 |  | false | 011138003890091557 |

### CityGolf - Senhora da Hora

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| a59e0dfb-0753-4692-8d31-40f71dc51e1e | Citygolf | 18 |  | false | 0121398547520999951 |

### Clube do Golfe da Quinta do Lago

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 411876c6-091c-4d5b-bba5-faa6d4bdb9fa | Laranjal | 18 |  | false | 0121239656601118 |
| 0d28f293-4f2e-4b90-a8a0-dfefba9f13e6 | Norte | 18 |  | false | 0121110988682015 |
| fdf7e4c8-fb5c-43b4-a0c1-350bafad6ad7 | Sul | 18 |  | false | 0121223633078163 |

### Colina Verde Sports Resort

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 717afc9b-7abf-4c36-8c80-2ca9875b64f1 | Maragota | 18 |  | false | 0121440753278115139 |

### Estoril Golf Club

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 9c363a9f-5f8b-4954-bc17-55961232a310 | Blue Course | 9 |  | false | 0111315822746802 |
| 140c4276-5498-4b46-b6cd-721ff36ef5d7 | Championship | 18 |  | false | 0121115672566106 |

### Golden Eagle Residence & Golf Resort

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 0a5eb35e-4b32-4971-9eba-9b13a4da3541 | Championship Course | 18 |  | false | 0121302705008246 |

### Golf Course Curia - Curia Golf

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| f8bf5c75-d8be-471e-9601-c5c3368c88f5 | Curia | 18 |  | false | 0121406155109541422 |

### Golf Course Quinta da Ria

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 996c9ce6-aaa1-4e10-b2dd-601da29201e2 | Cima | 18 |  | false | 012138443563750217 |
| ec115d93-ffbe-43b2-bf32-a3369e89927b | Ria | 18 |  | false | 0121248208132118 |

### Golf Course Quinta do Vale

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 44f6062b-aded-42d0-b1b6-14e8ad27f61e | 18-hole course | 18 |  | false | 0121317046525615 |

### Golf Quinta da Barca

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 8b5a9bcc-e435-4ade-8844-e358a81ded0b | Quinta da Barca | 9 |  | false | 0111311617807251 |

### Golf Vilamoura

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 08f9de12-ebed-4068-884a-d2142df66ca9 | Laguna | 18 |  | false | 0121119898736765 |
| 4aa3915d-1ef6-4bfd-80a6-e81c54c93002 | Millennium | 18 |  | false | 0121124830503750 |
| 7266dd09-020d-4d4f-9d36-256a23a787e1 | Old Course | 18 |  | false | 0121223634158232 |
| b8798c26-f665-469b-9803-44c14d6f86a3 | Pinhal | 18 |  | false | 0121265225966962 |
| 41b8dd86-e165-472d-870e-bc7440aaa4d1 | Victoria | 18 |  | false | 0121180601281453 |

### Montado Hotel & Golf Resort

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 5ddf9371-afca-4a77-b34f-5a13bdd1db58 | 18-hole course | 18 |  | false | 0121348389669542117 |

### Oeiras Golf

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 36b49a6b-c29d-4773-a730-b34a804457b6 | 9-hole course | 9 |  | false | 0111386407967128 |

### Ombria Golf Course

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 3a607e7e-6a57-4c69-b2f3-151a36c3bee9 | 18-hole course | 18 |  | false | 0121679485722849662 |

### ONYRIA Quinta da Marinha Golf Resort

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| b75159c5-5eed-454a-af3d-e4e21d30e807 | 18-hole course | 18 |  | false | 0121114459576817 |

### Palmares Ocean Living & Golf

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| a27b807e-238a-4ae1-bc4d-ff92e5afaa62 | Alvor + Lagos | 18 |  | true | 0121145020840062 |
| e25942a2-6905-4c24-af2c-8700ec3e3b13 | Alvor + Praia | 18 |  | true | 0131145020840062 |
| 9dcdcfed-e0e1-4b18-9c52-5950c9a44251 | Lagos + Praia | 18 |  | true | 0231145020840062 |

### Palmela Village - Arrábida Resort & Golf Academy

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| ea61b841-16fa-43a1-b7b1-98d26c6949b4 | Palmela Village | 18 |  | false | 0121370857682774 |

### Penha Longa Resort

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 8b2d9f60-f24e-42b5-b69f-999e5cd0cd02 | Atlantico | 18 |  | false | 0121111417768304 |
| e58075c1-519d-4271-9c06-38910204c129 | Monastery | 9 |  | false | 0111126458727589 |

### Penina Hotel & Golf Resort

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| bc4f0cff-aa22-4844-b310-f3bbdfc6849b | Academy | 9 |  | false | 0111359897622358087 |
| 183e9178-3c8f-477a-b747-f3f3cd176104 | Resort Course | 9 |  | false | 0111359928737342864 |
| 2f61f102-10a1-4617-86dd-fe98f8491b5d | Sir Henry Cotton Championship Course | 18 |  | false | 0121458301844180766 |

### Pestana Alto Golf Course

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| a1d5865e-cf68-4533-84ac-c5dbda6fbb9d | 18-hole course | 18 |  | false | 0121255968443695 |

### Pestana Gramacho golf course

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 4bed1a88-c201-4966-9642-5dcbb2483ff3 | 18-hole course | 18 |  | false | 0121255969140911 |

### Pestana Sintra Golf

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 30db2eb3-0ad1-4709-9e7a-f176692b3162 | 18-hole course | 18 |  | false | 0121150439207755 |

### Pestana Vale Da Pinta Golf Course

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 41aad062-2fa2-4eda-811d-d08d59a87c83 | 18-hole course | 18 |  | false | 0121236512898099 |

### Pestana Vila Sol Vilamoura

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 54890024-bd7a-4dbd-9289-04229446be62 | Challenge + Prestige | 18 |  | true | 0231223636010115 |
| 562a5d05-be6d-4af7-8a9f-b81ed41ac818 | Challenge + Prime | 18 |  | true | 0211223636010115 |
| ab53e0f9-8f12-433e-97f0-c0736c87d588 | Prestige + Prime | 18 |  | true | 0311223636010115 |

### Pine Cliffs Golf Course

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| d3f05eb8-3da7-4c64-aa64-fcf0da1961af | 9-hole course | 9 |  | false | 0111376693255634515 |

### Pinheirinho Comporta

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 515e55c3-964b-427c-bce5-cba30a392fb4 | 18-hole course | 18 |  | false | 0121620901567638840 |

### Quinta das Lágrimas Clube de Golfe

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| bb611fdb-6281-47ff-9d7a-3c9758793853 | Old course | 18 |  | false | 0121146941775664 |

### Quinta dos Reis - Golf & Leisure

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| e2d875cd-4e73-46ed-ab88-566a3ce142dc | 9-hole course | 9 |  | false | 0111740091521550976 |

### Ribagolfe Golf Club

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 76a1098b-1070-4992-aa2c-dd50eb333878 | Ribagolfe I | 18 |  | false | 0121145826653546 |
| 2f7a752a-2354-49a2-af24-c2257bd88343 | Ribagolfe II | 18 |  | false | 0121240684059862 |

### San Lorenzo Golf Course

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| b5febaa0-7570-460c-adea-d232466d90b3 | 18-hole course | 18 |  | false | 0121314881366596 |

### Santo António Villas Golfe

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 0fb9c5da-c001-46b8-84f4-86f86447b0f1 | 18-hole course | 18 |  | false | 0121175423595305 |

### Santo da Serra Golf Club

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| 5d48c6fb-4359-40e4-8ef4-611715a07dcb | Desertas + Machico | 18 |  | true | 0211127127699693 |
| 8d1dcf23-aeeb-47a6-a843-0f51538e063d | Desertas + Serras | 18 |  | true | 0231127127699693 |
| a3a64f88-ce67-416d-b4d4-7c48bbd05a76 | Machico + Serras | 18 |  | true | 0131127127699693 |

### Terras da Comporta

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| bcbb3a45-715b-48c4-a16c-3675639f7c3e | Dunas Golf | 18 |  | false | 0121719395892863278 |
| 16625358-92af-400b-b39a-65a0f89e8645 | Torre Golf | 18 |  | false | 0121775583194833654 |

### The Els Club Vilamoura

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| bbdb3bd4-be2d-4502-ad00-2005671d1e46 | 18-hole course | 18 |  | false | 0121746813017328852 |

### Vale do Lobo

| id | name | holes | par | is_combo | golfapi_id |
|---|---|---:|---:|---|---|
| bb7139e8-e84d-48ce-b0e3-73aaba720291 | Ocean | 18 |  | false | 0121374254766684171 |
| 13ff9727-5b53-4463-a9fb-bb84f5adefda | Royal | 18 |  | false | 0121235807300388 |

## FPG_ONLY — i FPG men ikke i DB

Sandsynligt manglende klubber. Kandidater til import.

| FPG club_name | Region | District | City | Website |
|---|---|---|---|---|
| Álamos Golf Course | Algarve | Faro | Portimão | [link](http://www.nauhotels.com/index.php/pt/golfe) |
| Alto Golf Pestana Golf Resort | Algarve | Faro | Carvoeiro | [link](http://www.pestanagolf.com) |
| Campo de Golfe da Belavista | Algarve |  |  | [link](http://www.golfebelavista.com) |
| Faldo Course e O'Connor Jnr. Course | Algarve | Faro | Alcantarilha | [link](http://www.amendoeiraresort.com) |
| Gramacho Pestana Golf Resort | Algarve | Faro | Carvoeiro | [link](http://www.pestanagolf.com) |
| Laguna Golf Course | Algarve | Faro | Vilamoura |  |
| Laranjal | Algarve | Faro | Almancil |  |
| Millennium Golf Course | Algarve | Faro | Vilamoura | [link](http://www.oceanicogroup.com) |
| Old Course | Algarve | Faro | Vilamoura | [link](http://www.dompedrogolf.com) |
| Pine Cliffs Golf & Country Club | Algarve | Faro | Albufeira | [link](https://www.pinecliffs.com) |
| Pinhal Golf Course | Algarve | Faro | Vilamoura | [link](http://www.oceanicogolf.com) |
| Pinta Pestana Golf Resort | Algarve | Faro | Carvoeiro | [link](http://www.pestanagolf.com) |
| Quinta da Ria e Quinta de Cima | Algarve | Faro | Tavira | [link](http://www.quintadaria.com) |
| Quinta do Lago Sul e Quinta do Lago Norte | Algarve | Faro | Almancil | [link](http://www.quintadolago.com) |
| Quinta do Vale Golf Resort | Algarve | Faro | Castro Marim | [link](http://www.quintadovalegolf.com) |
| Royal e Ocean | Algarve | Faro | Almancil | [link](http://www.valedolobo.com) |
| San Lourenzo Golf Course | Algarve | Faro | Almancil | [link](https://sanlorenzogolfcourse.com/) |
| Santo António Villas, Golf & Spa | Algarve | Faro | Lagos | [link](http://www.saresorts.com) |
| Vila Sol Pestana Golf Resort | Algarve | Faro | Vilamoura | [link](http://www.pestanagolf.com) |
| Campo de Golfe da Batalha | Ilhas | São Miguel | Ponta Delgada | [link](http://www.azoresgolfislands.com) |
| Clube de Golf Santo da Serra | Ilhas | Madeira | Funchal | [link](http://www.santodaserragolf.com) |
| C. N. F. Golfe do Jamor | Lisboa | Lisboa |  | [link](http://www.fpg.pt) |
| Campo de Golfe do Montado | Lisboa | Setúbal | Palmela | [link](http://www.montadoresort.com) |
| Clube de Golfe da Quinta da Marinha | Lisboa | Lisboa | Cascais | [link](http://www.quintadamarinha.com) |
| Estoril - Blue Course | Lisboa | Lisboa | Estoril | [link](http://www.palacioestorilhotel.com) |
| Golf Aldeia dos Capuchos | Lisboa | Setúbal | Almada |  |
| Oeiras Green Valley / Academia Municipal de Golfe | Lisboa | Lisboa | Oeiras | [link](http://www.fpg.pt) |
| Ribagolfe Lakes e Ribagolfe Oaks | Lisboa | Santarém | Benavente | [link](http://www.orizontegolf.com) |
| Sports Clube da Penha Longa | Lisboa | Lisboa | Sintra | [link](http://www.penhalonga.com/pt) |
| Bica Clube de Golfe | Zona Centro | Castelo Branco | Belmonte |  |
| Campo de Golfe de Cantanhede | Zona Centro | Coimbra | Cantanhede | [link](http://www.clubegolfecantanhede.com) |
| Beloura Pestana Golf Resort | Zona Norte | Lisboa | Sintra | [link](http://www.pestana.com) |
| Campo de Golfe de Guardizela | Zona Norte | Braga | Guimarães | [link](http://ucdrguardizela.webnode.pt/guardizela) |
| Campo de Golfe do Aqueduto | Zona Norte | Porto | Paredes | [link](http://Facebook - Paredes Golfe Clube) |
| Campo do Clube de Golfe de Vidago | Zona Norte | Vila Real | Vidago | [link](http://www.clubegolfevidago.pt) |
| Estela Golf Pitch & Putt Academy | Zona Norte | Braga | Esposende |  |
| Golfe Vale Pisão | Zona Norte | Porto | Porto | [link](http://www.golfevalepisao.com) |
| Palmares Golf | Zona Norte | Faro | Lagos | [link](http://www.palmaresliving.com) |
| Resort Course Penina | Zona Norte | Faro | Portimão | [link](http://www.penina.com) |
