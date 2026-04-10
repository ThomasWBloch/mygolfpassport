⛳ My Golf Passport — Projektreference
Thomas Bloch · Opdateret april 2026

Hvem jeg er
Jeg er ikke udvikler. Jeg copy-paster beskeder til Claude Code (kører i eget vindue på min computer) og kan selv køre SQL i Supabase SQL Editor. Claude Code pusher til GitHub automatisk. Vær meget konkret og tydelig — én ting ad gangen.

Tech stack

Framework: Next.js
Database: Supabase (West EU Ireland)
Styling: Tailwind CSS
Deploy: Vercel
GitHub: github.com/ThomasWBloch/mygolfpassport
Live: mygolfpassport.vercel.app


Arbejdsgang

Send besked til Claude Code → den skriver kode og pusher til GitHub → Vercel deployer automatisk
SQL-ændringer køres manuelt i Supabase SQL Editor
Brug denne fil som kontekst i starten af hver ny tråd


Supabase tabeller
profiles
id, full_name, handicap, home_club, avatar_url, allow_round_requests_friends, allow_round_requests_strangers, show_in_search, show_course_count
courses
id, name, club, country, flag, address, latitude, longitude, holes, par, website, phone, founded_year, is_major

club er et tekstfelt — ingen separat klub-tabel endnu
En klub kan have flere baner (fx Himmerland Old + Himmerland New)

rounds
id, user_id, course_id, rating, note, played_at
top100_rankings
id, course_id, year, rank, list_name
friendships
id, user_id, friend_id, status (pending/accepted/declined), created_at

Bemærk: kolonner hedder user_id og friend_id (ikke requester_id/addressee_id)

course_affiliations
id, user_id, course_id, created_at

Bruges til at markere at en bruger er medlem af en klub
Tilknytning sker på klub-niveau, ikke bane-niveau


Sider der virker
/ — Forside/passport

Live data: baner, lande, badges, navn, handicap, hjemmeklub
Passport card med niveau-bar (Explorer → Platinum ved 100 baner)
Hurtig handling: Log bane, Mit kort, Venner, Badges
Mobil-first layout, centreret på desktop med grå baggrund

/map — Verdenskort

Unikke baner per bruger
Gennemsnitsrating i popup
Alfabetisk sorteret liste

/courses/[id] — Bane-siden
Rækkefølge på siden:

Header — banenavn, klubnavn (klikbart link til /clubs/[club]), land, flag, huller, par
Rating — samlet snit + din egen rating + "Opdater →" knap + "Se alle anmeldelser →"
"Du har spillet denne bane" — dato (eller bucket list/log-knapper hvis ikke spillet — IKKE BYGGET ENDNU)
Venner der har spillet — accordion
Andre der har spillet — accordion
Klubinfo — accordion, foldet sammen som standard

/clubs/[club] — Klub-siden

Klubnavn, land, flag, antal baner
Liste over baner under klubben med rating og ✓ hvis spillet
"Jeg er medlem af denne klub" toggle
Accordion: Klubmedlemmer / Golfere der har spillet / Venner der har spillet
Navne i accordions er klikbare → /profile/[user_id]
Hver række viser: navn · antal baner · antal lande · antal badges · HCP

/profile — Min profil

Passport card med stats
Rediger: fulde navn, hjemmeklub (søgbar dropdown fra courses-tabellen), handicap
Privatliv & socialt toggles
Badges grid

/profile/[user_id] — Offentlig profil

Navn, HCP, hjemmeklub, baner, lande, badges
Respekterer show_course_count privacy-indstilling

/log — Log en bane

Søg baner, vælg, rating, dato, note, konfetti ved success


Design tokens

Grøn: #1a5c38
Guld: #c9a84c
Hvid baggrund: #fff
Grå baggrund: #f2f4f0
Border: #e5e7eb
Border-radius: 14px
Font: -apple-system, SF Pro Display, Segoe UI


Forretningsmodel

Gratis de første 6 måneder — fokus på brugervækst
€19/år for premium efter traction
Grænse ved 25 loggede baner
Facebook-deling altid gratis (vigtigste marketingkanal)
Exit-mål: $3-5 millioner inden for 3 år
Mest sandsynlige købere: GolfNow, Golf Genius, Strava


Produktbeslutninger (hvorfor)
Pris — €19/år
Nærmeste konkurrent GolfPlayed tager $59/år og har 60.000 brugere med en halvfærdig app. Lav pris fjerner friktion. 25.000 betalende × €19 = $475.000 ARR → exit-værdi $2,4-3,8M ved 5-8x multiplier.
Webapp først — ikke native app
Native app ville tilføje 3-4 måneders byggetid + App Store-godkendelse. Webapp beviser konceptet hurtigere. App bygges når folk betaler.
Ingen annoncering i v1
Med 250.000 brugere giver annoncering $70-120K/år — ikke nok til attraktivt exit, og kræver dobbelt UI. Annoncering er fase 3.
Retention-strategi
Aktive golfspillere spiller kun 2-5 nye baner/år. Løsning: socialt feed (ugentligt engagement), fantasy golf (dagligt i turneringsperioder), bucket list (drømme når man sidder hjemme).

Parkeret — næste sprint
Bucket list

Ny tabel bucket_list skal oprettes
På bane-siden: hvis ikke spillet → vis "Føj til golf log" + "Føj til bucket list"
Hvis spillet → vis din rating + din anmeldelsestekst + Opdater-knap

Rating-boks på bane-siden

Brugerens egen anmeldelsestekst skal vises i rating-boksen
Venter på bucket list så begge bygges rigtigt på én gang

Gennemsnitsrating kun fra betalende brugere

Venter til betaling er aktiveret

Share card

Facebook/Instagram/WhatsApp share card
Prototype ligger i mygolfpassport_sharecard.html som reference


Næste store sprint — OpenStreetMap 🗺️
Import af golfbaner fra OpenStreetMap — gratis, god global dækning.
GolfAPI er alt for dyrt ($399/md eller $5.699 engangsbetaling).
Mål: find smart måde at hente og importere OSM-banedata til courses-tabellen i Supabase.

Testdata i databasen

Thomas Bloch — 4b713a25-50f6-4e3a-9e39-3bb8e6429753
Helle Wernblad — 16e4a1ae-6924-4bf0-ada4-a73548b02e5e
De er venner (accepted) i friendships-tabellen
Begge har runder på Aarhus Golfklub
