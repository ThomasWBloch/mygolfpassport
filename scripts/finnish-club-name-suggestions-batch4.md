# Finnish golf club verification — batch 4 (missing SGL clubs)

Generated 2026-04-19.

Scope: originally 6 SGL member clubs that had no DB match. After batch 3 "rescued" 4 of them via rename of close-variant DB entries, only **2** remained as truly missing: `Aavasaksa Golf` (Ylitornio) and `Pitkäjärvi Golf Club` (Kokemäki). This batch verifies whether either should be imported.

## DECISION: DO NOT IMPORT EITHER CLUB

### 1. Pitkäjärvi Golf Club — indoor practice facility only

Site pitkajarvigolf.fi describes the facility as:
- 6 driving-range positions (≈25m hitting distance)
- "Suomen ainut sisäbunkkeri" (Finland's only indoor bunker)
- Putting / chipping / pitching greens
- Disc golf area
- Winter training hall ("talviharjoitteluhalli")

No outdoor 9-hole or 18-hole course. This is a golf academy / winter practice hall, not a playable course. It falls into the same category as the simulator and disc-golf entries deleted in batch 3 — keeping it would contradict that policy.

### 2. Aavasaksa Golf — no course on Finnish soil

SGL lists Aavasaksa Golf ry at Suksitie 4, Ylitornio (Lapland). Club's own site (aavasaksagolf.fi) and Aavasaksa region site clarify:
- Club was founded 2018-01-04 by golfers in Ylitornio
- Their "home course" is **Tureholm golf course on the Swedish side** of the Tornio river valley, in Övertorneå
- Tureholm is a 9-hole course that was expanded to 18 holes in 2018 (two tee boxes per hole)

The club exists administratively in Finland but has no Finnish course infrastructure. Their playable venue belongs to Sweden's golf federation (SGF), not SGL's course register. For mygolfpassport, adding Aavasaksa Golf as a Finland entry would point users to a club that sends them to Sweden to play.

**Follow-up for later:** verify that Tureholm / Övertorneå Golf exists in the Sweden dataset; if not, it may be worth adding there.

## SUMMARY

- Clubs reviewed: **2**
- Imported: **0**
- Reason 1: indoor practice facility only (not a playable course)
- Reason 2: club has no Finnish course — plays at a Swedish 18-hole course across the border

After batches 1–4, Finland dataset contains **285 courses across 157 clubs**, fully reconciled against SGL (golf.fi) with 0 credit cost to GolfAPI.
