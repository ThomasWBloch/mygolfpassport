// Generate the MGP Partner Guide — Courses Database (.docx)
// Focused on safe course/club data operations, dependency management, and
// practical examples. Output: MGP_Partner_Guide_Courses_Database.docx (root).
//
// Run with: node scripts/generate-partner-guide.mjs

import { writeFileSync } from 'fs'
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  TableOfContents, StyleLevel, PageBreak, LevelFormat,
} from 'docx'

// ── Style helpers ──────────────────────────────────────────────────────────
const FONT = 'Arial'

const text = (str, opts = {}) => new TextRun({ text: str, font: FONT, ...opts })

const p = (content, opts = {}) => new Paragraph({
  children: Array.isArray(content)
    ? content
    : [typeof content === 'string' ? text(content) : content],
  spacing: { after: 120 },
  ...opts,
})

const h1 = (str) => new Paragraph({
  children: [text(str, { bold: true, size: 32 })],
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 240, after: 120 },
})

const h2 = (str) => new Paragraph({
  children: [text(str, { bold: true, size: 26 })],
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 200, after: 80 },
})

const h3 = (str) => new Paragraph({
  children: [text(str, { bold: true, size: 22 })],
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 160, after: 60 },
})

const bullet = (str) => new Paragraph({
  children: [typeof str === 'string' ? text(str) : str],
  bullet: { level: 0 },
  spacing: { after: 60 },
})

const code = (str) => new Paragraph({
  children: [text(str, { font: 'Consolas', size: 18 })],
  shading: { type: ShadingType.CLEAR, fill: 'F2F2F2', color: 'auto' },
  spacing: { before: 80, after: 80 },
  indent: { left: 200, right: 200 },
})

const warningBox = (title, body) => new Paragraph({
  children: [
    text('⚠ ' + title, { bold: true, color: '8B0000' }),
    text('\n' + body, { color: '3A3A3A' }),
  ],
  shading: { type: ShadingType.CLEAR, fill: 'FFF3CD', color: 'auto' },
  border: {
    top:    { style: BorderStyle.SINGLE, size: 8, color: 'FFC107' },
    bottom: { style: BorderStyle.SINGLE, size: 8, color: 'FFC107' },
    left:   { style: BorderStyle.SINGLE, size: 8, color: 'FFC107' },
    right:  { style: BorderStyle.SINGLE, size: 8, color: 'FFC107' },
  },
  spacing: { before: 120, after: 120 },
  indent: { left: 100, right: 100 },
})

const infoBox = (title, body) => new Paragraph({
  children: [
    text('ℹ ' + title, { bold: true, color: '0C5460' }),
    text('\n' + body, { color: '3A3A3A' }),
  ],
  shading: { type: ShadingType.CLEAR, fill: 'D1ECF1', color: 'auto' },
  border: {
    top:    { style: BorderStyle.SINGLE, size: 8, color: '17A2B8' },
    bottom: { style: BorderStyle.SINGLE, size: 8, color: '17A2B8' },
    left:   { style: BorderStyle.SINGLE, size: 8, color: '17A2B8' },
    right:  { style: BorderStyle.SINGLE, size: 8, color: '17A2B8' },
  },
  spacing: { before: 120, after: 120 },
  indent: { left: 100, right: 100 },
})

// ── Tables ─────────────────────────────────────────────────────────────────
const cell = (content, { bold = false, fill } = {}) => new TableCell({
  children: [new Paragraph({
    children: [text(content, { bold, size: 20 })],
  })],
  width: { size: 100, type: WidthType.AUTO },
  ...(fill ? { shading: { type: ShadingType.CLEAR, fill, color: 'auto' } } : {}),
})

const makeTable = (rows) => new Table({
  rows: rows.map((row, i) => new TableRow({
    children: row.map(c => typeof c === 'string'
      ? cell(c, i === 0 ? { bold: true, fill: 'E7E6E6' } : {})
      : c),
  })),
  width: { size: 100, type: WidthType.PERCENTAGE },
})

// ── Build document ─────────────────────────────────────────────────────────
const children = []

// Title page
children.push(new Paragraph({
  children: [text('MyGolfPassport', { bold: true, size: 48 })],
  alignment: AlignmentType.CENTER,
  spacing: { before: 2400, after: 120 },
}))
children.push(new Paragraph({
  children: [text('Partner Guide', { bold: true, size: 36, color: '1A5C38' })],
  alignment: AlignmentType.CENTER,
  spacing: { after: 120 },
}))
children.push(new Paragraph({
  children: [text('Courses Database — Course & Club Data Operations', { size: 28 })],
  alignment: AlignmentType.CENTER,
  spacing: { after: 400 },
}))
children.push(new Paragraph({
  children: [text('Version 1.0  ·  Generated ' + new Date().toISOString().slice(0, 10), { size: 20, color: '666666' })],
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
}))
children.push(new Paragraph({ children: [new PageBreak()] }))

// Table of Contents
children.push(h1('Table of Contents'))
children.push(new TableOfContents('', {
  hyperlink: true,
  headingStyleRange: '1-3',
  stylesWithLevels: [
    new StyleLevel('Heading1', 1),
    new StyleLevel('Heading2', 2),
    new StyleLevel('Heading3', 3),
  ],
}))
children.push(new Paragraph({ children: [new PageBreak()] }))

// Section 1
children.push(h1('1. Course & Club Data Operations'))
children.push(p(
  'This guide covers database operations on the courses table only. All other tables (users, rounds, affiliations, etc.) are out of scope here. The general principle: updates are safe, additions are safe, deletions and merges require dependency checks.'
))

children.push(h2('1.1 Safe fields to edit on a course row'))
children.push(p(
  'Any of the following fields can be updated freely. No FK references point at these column values, so an edit is purely local to the row.'
))
children.push(makeTable([
  ['Field', 'Type', 'Notes'],
  ['name', 'text', 'Course name (often differs from club name when a club has multiple loops)'],
  ['club', 'text', 'Parent club name — grouping field used by the UI'],
  ['website', 'text (URL)', 'Official club website; shown as a link in map popups'],
  ['address', 'text', 'Human-readable address string'],
  ['latitude', 'number', 'Decimal degrees; safe to adjust from geocoding correction'],
  ['longitude', 'number', 'Decimal degrees; safe to adjust from geocoding correction'],
  ['flag', 'text (emoji)', 'Country flag emoji — prefer a matching entry from src/lib/countries.ts'],
  ['par', 'int (nullable)', 'Standard par for the course'],
  ['holes', 'int', 'Number of holes (9 or 18 typically)'],
]))

children.push(h2('1.2 Operations that are always safe'))
children.push(p('Any of these can be run at any time without pre-checking FK references:'))
children.push(bullet('INSERT a new course row (with or without club, website, coordinates)'))
children.push(bullet('UPDATE any of the fields listed in §1.1 on an existing course row'))
children.push(bullet('Set website to null / fill in a missing website'))
children.push(bullet('Correct a wrong latitude/longitude'))
children.push(bullet('Add or change the flag emoji'))
children.push(bullet('Change is_combo / is_major flags'))
children.push(p('These are non-destructive — they do not orphan any FK reference and the UI will reflect the change on next page load.'))

children.push(h2('1.3 Operations that require a dependency check'))
children.push(warningBox('DESTRUCTIVE',
  'Deleting a course row without first cleaning up its foreign-key references will fail (or worse, orphan user-facing data like logged rounds). Always run the dependency check in §2.2 before deleting.'))
children.push(p('The following require the dependency check in §2 before proceeding:'))
children.push(bullet('DELETE a course row'))
children.push(bullet('Merging two courses into one (rename + delete the redundant row)'))
children.push(bullet('Renaming a club where the old and new names both already exist — the rows will coexist under one club, which may or may not be intended'))

children.push(new Paragraph({ children: [new PageBreak()] }))

// Section 2
children.push(h1('2. Dependency Management'))

children.push(h2('2.1 What happens if you delete a course with dependencies?'))
children.push(p('Four tables have a foreign key pointing at courses.id. If any of them has a row pointing at the course you want to delete, you must delete those references first (or move them to a different course).'))
children.push(makeTable([
  ['FK table', 'Meaning', 'What a dependency represents'],
  ['rounds', 'Logged rounds', 'A user has recorded playing this course — deleting the course destroys the round history'],
  ['bucket_list', 'Wishlist entries', "A user has this course on their 'want to play' list"],
  ['course_affiliations', 'Club affiliations', 'A user has marked this course as their home / favorite / past club'],
  ['top100_rankings', 'Top-100 rankings', 'Curated ranking entries (e.g., Top 100 Sweden) that reference this course'],
]))
children.push(warningBox('Never skip the FK cleanup',
  'If you try to DELETE a course with any of these dependencies, Postgres will raise a foreign key violation and abort. Attempting to work around the error (e.g., CASCADE) will silently destroy user data. Always explicitly clean up or reassign the dependencies first.'))

children.push(h2('2.2 Full dependency check — SQL template'))
children.push(p(
  'Run this against a target course_id (UUID) to see every dependency in one query. If any count is non-zero, address those rows before deleting the course.'
))
children.push(code(
  `-- Replace '<COURSE_ID>' with the target UUID\n` +
  `SELECT\n` +
  `  (SELECT COUNT(*) FROM rounds              WHERE course_id = '<COURSE_ID>') AS rounds,\n` +
  `  (SELECT COUNT(*) FROM bucket_list         WHERE course_id = '<COURSE_ID>') AS bucket_list,\n` +
  `  (SELECT COUNT(*) FROM course_affiliations WHERE course_id = '<COURSE_ID>') AS affiliations,\n` +
  `  (SELECT COUNT(*) FROM top100_rankings     WHERE course_id = '<COURSE_ID>') AS top100_rankings;`
))
children.push(p('For a batch of IDs, use an IN clause:'))
children.push(code(
  `SELECT 'rounds' AS fk, COUNT(*) FROM rounds              WHERE course_id IN ('<ID1>', '<ID2>')\n` +
  `UNION ALL\n` +
  `SELECT 'bucket_list',         COUNT(*) FROM bucket_list         WHERE course_id IN ('<ID1>', '<ID2>')\n` +
  `UNION ALL\n` +
  `SELECT 'course_affiliations', COUNT(*) FROM course_affiliations WHERE course_id IN ('<ID1>', '<ID2>')\n` +
  `UNION ALL\n` +
  `SELECT 'top100_rankings',     COUNT(*) FROM top100_rankings     WHERE course_id IN ('<ID1>', '<ID2>');`
))

children.push(h2('2.3 Safe deletion procedure'))
children.push(p('Four steps, in order. Never skip step 2 and never combine them into a single CASCADE.'))
children.push(new Paragraph({
  children: [text('Step 1 — Identify targets', { bold: true })],
  numbering: { reference: 'steps', level: 0 },
  spacing: { after: 60 },
}))
children.push(p('Query the courses table with a predicate that narrows to exactly the rows you want gone. Inspect the returned ids, names, clubs, and coordinates to confirm before proceeding.'))
children.push(code(
  `SELECT id, name, club, latitude, longitude\n` +
  `FROM courses\n` +
  `WHERE country = 'Denmark'\n` +
  `  AND club = 'Example Golfklubb'\n` +
  `  AND name = 'Old Course';`
))

children.push(new Paragraph({
  children: [text('Step 2 — Check dependencies', { bold: true })],
  numbering: { reference: 'steps', level: 0 },
  spacing: { after: 60 },
}))
children.push(p('Run the query from §2.2 for the ids from step 1. If any count is non-zero, decide how to handle those records:'))
children.push(bullet('rounds — contact the users or delete the round (destroys their logged history)'))
children.push(bullet('bucket_list — safe to delete; user loses a wishlist entry they can recreate'))
children.push(bullet('course_affiliations — if a user marked this as their home club, the affiliation disappears silently'))
children.push(bullet('top100_rankings — must be re-pointed at the replacement course or deleted'))

children.push(new Paragraph({
  children: [text('Step 3 — Delete FK references first', { bold: true })],
  numbering: { reference: 'steps', level: 0 },
  spacing: { after: 60 },
}))
children.push(code(
  `DELETE FROM rounds              WHERE course_id IN ('<ID1>', '<ID2>');\n` +
  `DELETE FROM bucket_list         WHERE course_id IN ('<ID1>', '<ID2>');\n` +
  `DELETE FROM course_affiliations WHERE course_id IN ('<ID1>', '<ID2>');\n` +
  `DELETE FROM top100_rankings     WHERE course_id IN ('<ID1>', '<ID2>');`
))

children.push(new Paragraph({
  children: [text('Step 4 — Delete the course rows', { bold: true })],
  numbering: { reference: 'steps', level: 0 },
  spacing: { after: 60 },
}))
children.push(code(
  `DELETE FROM courses WHERE id IN ('<ID1>', '<ID2>');`
))
children.push(infoBox('Tip',
  'Wrap steps 3 and 4 in a transaction so a failure at step 4 rolls back the FK deletes. Use BEGIN; ... COMMIT; or the Supabase RPC equivalent.'))

children.push(new Paragraph({ children: [new PageBreak()] }))

// Section 3
children.push(h1('3. Practical Examples'))

children.push(h2('3.1 Update a club name across all its rows'))
children.push(p('Use when a club has renamed itself or the stored name is incorrect. No FK concerns — club is not an FK, it is a text grouping field.'))
children.push(code(
  `UPDATE courses\n` +
  `SET club = 'New Official Name'\n` +
  `WHERE country = 'Sweden'\n` +
  `  AND club = 'Old Incorrect Name';`
))
children.push(infoBox('Multiple rows is expected',
  'A club typically has several course rows (one per 9-hole loop plus any combo entries). This UPDATE statement will rename all of them in one pass.'))

children.push(h2('3.2 Add or update website URLs'))
children.push(p('Populate missing website fields or correct an outdated URL. Always point at the club\'s own domain where possible; fall back to the national federation listing only if no official site exists.'))
children.push(code(
  `UPDATE courses\n` +
  `SET website = 'https://www.example-golfklubb.se'\n` +
  `WHERE country = 'Sweden'\n` +
  `  AND club = 'Example Golfklubb';`
))

children.push(h2('3.3 Check for duplicate courses at the same club'))
children.push(p('Before merging or deleting, verify what else exists at the club.'))
children.push(code(
  `SELECT id, name, holes, is_combo, latitude, longitude\n` +
  `FROM courses\n` +
  `WHERE country = 'Sweden'\n` +
  `  AND club = 'Example Golfklubb'\n` +
  `ORDER BY name;`
))
children.push(p('Patterns to watch for:'))
children.push(bullet('Two rows with the same name at the same club — duplicate; keep one, delete the other'))
children.push(bullet('A course name matching a 9-hole loop that also appears as a component of a combo ("Blå" alongside "Blå + Gul") — expected, hidden from UI by the combo component filter'))
children.push(bullet('A course row whose coordinates differ from all its siblings at the same club by more than ~500 m — the course may be real but separately located, or it may be a bad geocode worth reviewing'))

children.push(h2('3.4 Safe deletion of a single course'))
children.push(p('Full worked example deleting a mistakenly imported course.'))
children.push(code(
  `-- 1. Find target\n` +
  `SELECT id, name, club FROM courses\n` +
  `WHERE country = 'Denmark' AND club = 'Spurious Entry';\n` +
  `\n` +
  `-- 2. Check dependencies (substitute the UUID)\n` +
  `SELECT\n` +
  `  (SELECT COUNT(*) FROM rounds              WHERE course_id = '<UUID>') AS rounds,\n` +
  `  (SELECT COUNT(*) FROM bucket_list         WHERE course_id = '<UUID>') AS bucket_list,\n` +
  `  (SELECT COUNT(*) FROM course_affiliations WHERE course_id = '<UUID>') AS affiliations,\n` +
  `  (SELECT COUNT(*) FROM top100_rankings     WHERE course_id = '<UUID>') AS top100;\n` +
  `\n` +
  `-- 3. If all counts are 0, delete directly.\n` +
  `--    Otherwise run the FK deletes from §2.3 step 3 first.\n` +
  `DELETE FROM courses WHERE id = '<UUID>';`
))

children.push(h2('3.5 Merging two duplicate course entries'))
children.push(p('Occasionally two rows represent the same physical course. Pick a canonical keeper, move any FK references to the keeper, then delete the duplicate.'))
children.push(code(
  `-- Let KEEP = the id you want to keep, DROP = the duplicate\n` +
  `\n` +
  `-- 1. Re-point FK references from DROP to KEEP\n` +
  `UPDATE rounds              SET course_id = '<KEEP>' WHERE course_id = '<DROP>';\n` +
  `UPDATE bucket_list         SET course_id = '<KEEP>' WHERE course_id = '<DROP>';\n` +
  `UPDATE course_affiliations SET course_id = '<KEEP>' WHERE course_id = '<DROP>';\n` +
  `UPDATE top100_rankings     SET course_id = '<KEEP>' WHERE course_id = '<DROP>';\n` +
  `\n` +
  `-- 2. Delete the duplicate row\n` +
  `DELETE FROM courses WHERE id = '<DROP>';`
))
children.push(warningBox('Watch for unique constraints',
  'If either bucket_list or course_affiliations has a UNIQUE(user_id, course_id) index and the same user has a row for both KEEP and DROP, the UPDATE will fail. In that case, DELETE the DROP row\'s duplicate first, then re-point the remaining references.'))

children.push(new Paragraph({ children: [new PageBreak()] }))

// Appendix
children.push(h1('Appendix — Quick reference'))
children.push(h3('FK tables that reference courses.id'))
children.push(bullet('rounds.course_id'))
children.push(bullet('bucket_list.course_id'))
children.push(bullet('course_affiliations.course_id'))
children.push(bullet('top100_rankings.course_id'))
children.push(h3('Always-safe operations (no dependency check)'))
children.push(bullet('UPDATE name, club, website, address, latitude, longitude, flag, par, holes'))
children.push(bullet('INSERT a new course'))
children.push(h3('Operations that require dependency check first'))
children.push(bullet('DELETE a course'))
children.push(bullet('Merging two courses into one'))
children.push(h3('Golden rules'))
children.push(bullet('Never use ON DELETE CASCADE as a shortcut — you will silently destroy user data (logged rounds, wishlists).'))
children.push(bullet('Always run the dependency check in §2.2 first.'))
children.push(bullet('Wrap multi-step deletes in a transaction.'))
children.push(bullet('When a club rebrands, update the name in place — do not delete the old row and create a new one (that would orphan user rounds).'))

// ── Document & numbering ───────────────────────────────────────────────────
const doc = new Document({
  creator: 'MyGolfPassport',
  title: 'MGP Partner Guide — Courses Database',
  description: 'Course & club data operations — partner reference',
  styles: {
    default: {
      document: { run: { font: FONT, size: 22 } },
    },
    paragraphStyles: [
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        next: 'Normal',
        run: { font: FONT, size: 32, bold: true, color: '1A5C38' },
        paragraph: { spacing: { before: 240, after: 120 } },
      },
      {
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        next: 'Normal',
        run: { font: FONT, size: 26, bold: true, color: '1A5C38' },
        paragraph: { spacing: { before: 200, after: 80 } },
      },
      {
        id: 'Heading3',
        name: 'Heading 3',
        basedOn: 'Normal',
        next: 'Normal',
        run: { font: FONT, size: 22, bold: true, color: '3A3A3A' },
        paragraph: { spacing: { before: 160, after: 60 } },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: 'steps',
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: '%1.',
            alignment: AlignmentType.START,
            style: { paragraph: { indent: { left: 360, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  sections: [{ children }],
})

const buf = await Packer.toBuffer(doc)
const out = 'MGP_Partner_Guide_Courses_Database.docx'
writeFileSync(out, buf)
console.log(`Wrote ${out} (${(buf.length / 1024).toFixed(1)} KB)`)
