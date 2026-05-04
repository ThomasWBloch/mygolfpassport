# Global combo-display cleanup — 2026-05-04 (Session 27)

## Operation summary

Tilføjet `is_displayed` boolean-kolonne til `courses`-tabellen. Markeret 5939 combo-rows som is_displayed=false (skjult fra UI).

## Pre-state

- 9104 totale combo-rows globalt (is_combo=true)
- Alle havde implicit "displayed" tilstand før migration
- Top-3 lande: USA 4086, South Korea 1468, Canada 578

## Operation breakdown

| Hide reason | Rows | Logic |
|---|---:|---|
| same_loop | 2922 | Name matches `^X + X$` (samme sløjfe to gange) |
| reverse_with_canonical | 3017 | Name matches `^X + Y$` hvor X > Y alphabetically AND der findes en row `^Y + X$` i samme klub |
| **TOTAL hidden** | **5939** | |

## Kept visible

| Reason | Rows |
|---|---:|
| canonical (X + Y, X < Y) | 3120 |
| reverse_only (no canonical found) | 40 |
| weird-pattern (no `+` separator) | 5 |
| **TOTAL kept** | **3165** |

Plus alle is_combo=false rows (~33000) som er standalone courses.

## Rollback procedure

Hvis vi skal undo'e:
```sql
-- Restore all combo-rows to displayed
UPDATE courses SET is_displayed = true WHERE is_combo = true AND is_displayed = false;
```

Eller fjern kolonnen helt:
```sql
ALTER TABLE courses DROP COLUMN is_displayed;
```

## UI-query pattern (efter migration)

App'en skal queryt for kun displayed courses:
```sql
SELECT * FROM courses WHERE country = 'X' AND (is_combo = false OR is_displayed = true);
```

## Verifikation

Test-case: Het Rijk van Nijmegen (NL)
- Før: 13 combo-rows synlige
- Efter: 7 synlige (Nijmeegse + Noord+Oost + Noord+Zuid + Oost+Zuid + 3 cross-course combos)
- 6 hidden: Noord+Noord, Oost+Oost, Zuid+Zuid (same-loop), Oost+Noord, Zuid+Noord, Zuid+Oost (reverse)
