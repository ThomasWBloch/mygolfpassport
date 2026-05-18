# Focus group moderator script — My Golf Passport

*For: in-person session, 6 participants, 45 minutes, ~2026-06-12*
*Moderator: Thomas*
*Format: think-aloud usability testing + short debrief, tight time-box*

---

## What you are trying to learn

Three questions, in priority order — viral loop first because if that breaks, nothing else matters:

1. **Does the share-card → SMS → recipient-sign-up loop complete end-to-end?** Three sub-checks: (a) can the sender find and tap the share affordance without searching, (b) is the SMS the recipient receives clear and inviting rather than spammy, and (c) does the recipient land somewhere that converts them and connects them to the sender. This is the viral loop. Without it, growth is single-digit-per-month.
2. **Can a new golfer get from QR-scan to first stamped round in under 3 minutes without help?** If yes, the core value proposition lands. If no, find the first wall.
3. **Does the passport / stamp metaphor click immediately?** Watch for the "wait, what's a stamp here?" moment, and listen for which words people use when they explain the app back to each other.

Everything else is bonus. Do not let the session turn into a feature-request brainstorm — you have 45 minutes, not 2 hours.

---

## Pre-session checklist (do the day before)

- [ ] 6 chairs arranged as **three pairs facing each other** (Task 3 is pair-based — pairing is the whole point)
- [ ] Each chair has: phone-stand, notepad, pen, paper consent form, name tag, personal QR-code to `https://mygolfpassport.com/welcome`
- [ ] 2 backup phones charged + app pre-installed
- [ ] WiFi password card on the table + backup hotspot powered on
- [ ] Voice recorder + phone recorder both running (test 5 min before participants arrive)
- [ ] Laptop nearby with Supabase + Vercel deploys + Sentry open
- [ ] Print 1 copy of this script for yourself + 6 consent / recording-release forms
- [ ] **Pair participants in advance.** Ideally one iPhone + one Android per pair so Task 3 tests iMessage → SMS-fallback. Write pair-names on a card so you don't fumble the room mid-session.
- [ ] Collect each participant's phone number ahead of time so you can hand them a paper backup if they forget their partner's number in the moment.
- [ ] Snacks + water on a side table; coffee available but no caffeinated drama
- [ ] Mute your own phone

**Bring with you:** a stress ball or fidget. You will want to interrupt. Don't.

---

## Welcome (3 minutes)

Read this out, fast (~45 seconds):

> Tak fordi I er kommet. I tester en golf-app jeg har bygget, My Golf Passport — golfere "stempler" baner de har spillet, som et rejsepas. **I tester ikke jer selv, I tester appen.** Når noget irriterer eller forvirrer jer, så sig det højt — det er guld for mig. Jeg hjælper ikke undervejs; sidder I fast, fortæl mig hvad I prøvede. Vi optager (kun til mig). Vi har 45 minutter, så det går stærkt.

Then ~2 minutes:

- Collect signed consent forms
- One-sentence intros each: navn + cirka handicap (eller "spiller ikke") + iPhone eller Android
- Confirm pair assignments for Task 3 out loud so nobody is surprised later

---

## Task 1 — sign up from cold (7 minutes)

**Setup:** Hand each participant their QR-code card. Ask them to scan it.

**Prompt:**

> Forestil jer at en ven har sendt jer linket. Få oprettet en konto og kom ind i appen. Tænk højt hele vejen.

**Watch for:**

- Hvilken sektion på `/welcome` fanger dem (passport-mock, marquee, feature-tiles, final CTA)
- "First 500 lifetime premium" — troværdigt eller for-godt-til-at-være-sandt?
- På `/signup`: rækkefølge de udfylder felter i
- Tid mellem "Submit" og at de tjekker email — skifter de app mens de venter?
- Onboarding: vælger de fra autocomplete eller skriver de? Vælger de country?
- Total tid fra QR-scan til "jeg er inde"

**Probes (only if silent for 20+ sec):**

- "Hvad tænker du på lige nu?"
- "Hvad forventer du sker hvis du klikker den?"

**Do not probe:** "Hvad synes du om designet?", "Er det nemt nok?", "Hvad ville du ændre?" — all leading.

**Time-out at 6 minutes:** ask "hvor mange er inde nu?". Anyone not in: hand them a pre-created test account so they can join Task 2. Note the failure for later — that's a P0.

---

## Task 2 — log your first round (6 minutes)

**Prompt:**

> Tænk på en golfbane I har spillet for nylig. Find den i appen og log at I har spillet den.

**Watch for:**

- Klikker de FAB (+), MAP, eller noget på home?
- I `/log`: ser de søgefeltet? "Courses near you" hvis geo godkendt?
- Skriver de hele banenavnet eller stopper tidligt? Bruger de country-dropdown?
- Hvad gør de når søgningen returnerer flere klubber?
- Udfylder de rating? Played-date? Notes?
- Forstår de success-screen ("+1 STAMP", "★ NEW TERRITORY")?

**High-signal failure modes to note:**

- Bane ikke i databasen — hvilken bane søgte de efter? (Data we want.)
- Vil logge historisk runde — hvordan navigerer de played-date?
- Forventer score-indtastning — golfere = scoring-forventning

**Probes:**

- "Hvad forventede du sker når du klikkede der?"
- "Hvad ville du gerne kunne her, som du ikke kan?"

---

## Task 3 — share your passport with your pair partner (12 minutes)

**This is the most important task of the session. Give it the most attention. Do not let it run short.**

**Setup:** Confirm each pair faces each other. Both must be signed-in. Hand out the paper backup with phone numbers if anyone has forgotten their partner's.

**Prompt:**

> Forestil jer at I lige har spillet 18 huller sammen. Nu vil I dele jeres passport med hinanden. Find ud af hvordan I sender jeres passport — jeres profil — til personen overfor jer via SMS eller iMessage. Når I modtager linket fra jeres partner, så åbn det og se hvad der sker. Tænk højt hele vejen, både som afsender og modtager.

### What to watch — sender side

- Hvor leder de efter share-affordancen? (PassportCard? `/profile`? Top-bar? Settings?)
- Tid til at finde share-knappen. Over 30 sek = critical signal.
- Når de finder den: forstår de hvad næste skridt er? "Share" vs "Copy link" vs system share-sheet?
- Native iOS share-sheet: vælger de Messages? Eller AirDrop / Mail / noget andet?
- Hvad ser SMS-preview-teksten ud — inviting eller spam-agtigt?
- Får de set hvad modtageren kommer til at se, før de sender? (Trust — important.)
- Skriver de noget personligt ind i SMS'en ud over linket?

### What to watch — recipient side

- Tid fra SMS lander til de tapper linket
- Lander de på en preview af afsenderens passport? Eller på generic `/welcome`? Eller hvor?
- Genkender de afsenderen i UI? (Personlig context = conversion boost.)
- Hvis allerede logged-in: får de tilbudt at adde afsenderen som ven direkte fra linket?
- Hvis IKKE logged-in: går de gennem sign-up med afsenderens context bevaret (deres navn / klub synligt under sign-up)?
- Efter flow: er afsenderen automatisk i recipients friends-list, eller skal de manuelt søge?

### Probes

- "Hvor regnede du med share-knappen ville være?" (sender, if they hunt)
- "Hvad fortæller SMS'en din ven om dig?" (sender, after they send)
- "Hvis du fik det her link fra en kollega, ville du klikke?" (recipient, before tap)
- "Hvem inviterede dig, baseret på det her?" (recipient, after tap — should be obvious)

### If the feature is missing or broken

**This is itself the highest-value finding of the session.** Don't panic. Note exactly:

- Where each sender looked first, second, third — those are the natural slots for the button
- What workaround they tried (copy URL bar? screenshot? give up?)
- What the recipient *thought* the link was going to be when they tapped

A "viral loop with a stopper" is the single biggest growth risk. The data from a broken Task 3 is more valuable than data from a working Task 1.

### Time-box

Hard cut at 12 minutes. If pairs are still mid-share, freeze and ask each pair "where are you stuck right now?" — that becomes a 90-second mini-debrief inside the task.

---

## Task 4 — free exploration (5 minutes)

**Prompt:**

> Jeg har ingen flere opgaver. Brug appen i 5 minutter som I selv vil. Jeg sidder bare og kigger.

**Don't talk. Don't probe. Don't help.** Note:

- Hvor klikker de først?
- Hvilke skærmbilleder bliver de hængende på længst?
- Prøver de map, badges, leaderboard, friends, eget profil?
- Hvad prøver de at gøre, der ikke kan lade sig gøre?
- Sammenligner de med deres sidemand?

After 5 minutes, gently bring them back together.

---

## Group debrief (10 minutes)

Two rounds. Sit back, write fast, don't defend the design.

### Round 1 — pain points (5 min)

> Hvad blev I mest frustrerede over?
>
> Var der noget I prøvede at gøre, hvor I gav op?
>
> Specifikt om share-flowet: hvad var let, hvad var bøvlet?

### Round 2 — value & viral (5 min)

> Ville I sende det link til en golf-ven i morgen? Hvorfor / hvorfor ikke?
>
> Hvis I selv skulle pitche appen til en ven i én sætning, hvad ville I sige?
>
> Hvad blev I mest overraskede over?

The pitch question is gold: if 4 of 6 use the same word ("passport", "stempler", "rejsepas", "samling"), that's your positioning. The "send to a ven" question tests the viral intent directly — a yes-with-hesitation is different data from a confident yes.

---

## Wrap-up (2 minutes)

- Thank everyone, briefly
- "Næste version bliver den I har været med til at forme. I får besked."
- Hand out thank-you token (golf ball / bag tag / small bottle — must be a token, not expensive)
- Confirm permission to email follow-up questions

---

## Post-session — same evening

Don't sleep on it. 30 minutes immediately after:

- [ ] Write a 1-page "first impressions" note in your own words
- [ ] Save recordings to a labelled folder
- [ ] Note the 3 highest-pain issues from gut feeling

Within 48 hours:

- [ ] Re-watch the recordings — yes, all of them. Your memory will lie. Pay particular attention to Task 3.
- [ ] Tally per-task completion: who finished, who got stuck where
- [ ] Extract verbatim quotes for the top issues
- [ ] Rank issues P0 / P1 / P2 / P3
- [ ] Identify the 5 highest-leverage fixes
- [ ] Send each participant a personal thank-you

Within 1 week:

- [ ] Triage P0/P1 into the next sprint
- [ ] Decide if Task 3 findings warrant a viral-loop-specific sprint before Phase B opens
- [ ] Update `docs/SOFT_LAUNCH_PLAN.md` Phase B with concrete items

---

## Things that will go wrong (probably)

1. **Email confirmation goes to spam.** Have everyone check; if still missing, manually confirm via Supabase `auth.users`.
2. **One participant cannot find their club in the database.** Note it (data!), have them log a known course.
3. **Vercel deploy bricks mid-session.** Hard freeze in place from week 4. If broken: pause, rollback, resume.
4. **Pair's phone numbers don't match what they typed at signup.** Paper backup list ready. Type for them if needed.
5. **iPhone-to-Android SMS arrives plain instead of rich preview.** This *is* the test, not a bug — note how the recipient reacts to the stripped-down version.
6. **Someone insists on a feature-request lecture.** Acknowledge, redirect: "lad os holde det til debriefen, vi har stram tid."
7. **Danish silence during think-aloud.** Wait 10 sec, then "hvad ser du nu?" — closed-enough to unstick without leading.

---

## Quick reference card (print this separately)

```
TIME    TASK                          KEY OBSERVATION
3 min   Welcome + consent + intros    Pair assignments locked in
7 min   1. Sign up from cold          Time-to-account-confirmed
6 min   2. Log first round            Could they find their course?
12 min  3. Share passport via SMS     Sender finds button? Recipient lands somewhere converting?
5 min   4. Free exploration           What do they try first?
10 min  Debrief (pain + viral + pitch) Would they share with a real ven?
2 min   Wrap-up                       Thank-you + follow-up consent
─────────────────────────────────────
45 min  TOTAL — hard time-box
```

---

*Companion document: `docs/SOFT_LAUNCH_PLAN.md` — what to ship before this session can happen.*
