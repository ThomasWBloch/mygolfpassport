#!/usr/bin/env node
/**
 * Canada Pass 2a scrape — Golf Canada (golfcanada.ca)
 *
 * Source: https://www.golfcanada.ca/findacourse/ → /golf-facility/<slug>-en/ pages.
 *
 * Strategy:
 *  1. Page through /wp-json/wp/v2/golf-facility?per_page=100 to enumerate
 *     all facility slugs (returns ~4,592 entries; ~50/50 split between
 *     -en and -fr language versions).
 *  2. Filter to English (or non-suffixed) slugs only.
 *  3. For each facility page, extract embedded Vue scorecard JSON from
 *     <scorecard :courses='[...]'> attribute. This contains all the
 *     contact data we need: email, phone, lat/lng, address, type, class,
 *     regionalAssociation, plus url / greenFeeUrl / teeTimeUrl /
 *     membershipUrl as website fallbacks.
 *  4. Skip pages with no scorecard JSON (indoor/virtual simulator
 *     locations have no real course data).
 *  5. Multi-course clubs share facilityId — that maps directly to our
 *     existing combo-course pattern. Aggregate one entry per facilityId.
 *
 * Resume-safe: per-slug files in raw-golfcanada/ are skipped on re-run.
 *
 * Usage:
 *   node scripts/canada/scrape-golfcanada-canada.mjs
 *   node scripts/canada/scrape-golfcanada-canada.mjs --reparse  (re-aggregate from raw)
 *   node scripts/canada/scrape-golfcanada-canada.mjs --limit 50 (test mode)
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.join(__dirname, 'raw-golfcanada');
const LISTING_URL = 'https://www.golfcanada.ca/wp-json/wp/v2/golf-facility';
const FACILITY_BASE = 'https://www.golfcanada.ca/golf-facility/';
const OUT_FILE = path.join(__dirname, 'canada-clubs.json');
const LISTING_FILE = path.join(__dirname, 'canada-slugs.json');

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const CONCURRENCY = 6;
const BETWEEN_BATCHES_MS = 250;

const args = new Set(process.argv.slice(2));
const REPARSE = args.has('--reparse');
const LIMIT = (() => {
  const i = process.argv.indexOf('--limit');
  return i >= 0 ? parseInt(process.argv[i + 1], 10) : 0;
})();

function decodeEntities(s) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

async function fetchText(url, opts = {}) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept': 'text/html,application/json,*/*', ...(opts.headers || {}) },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function fetchJson(url) {
  const txt = await fetchText(url);
  return JSON.parse(txt);
}

async function listAllSlugs() {
  // Resume from cached listing if present
  try {
    const cached = JSON.parse(await fs.readFile(LISTING_FILE, 'utf8'));
    if (Array.isArray(cached) && cached.length > 100) {
      console.log(`[listing] using cached ${LISTING_FILE} (${cached.length} entries)`);
      return cached;
    }
  } catch { /* not cached */ }

  // Discover page count
  const head = await fetch(`${LISTING_URL}?per_page=1`, { headers: { 'User-Agent': UA } });
  const totalStr = head.headers.get('x-wp-total');
  const total = totalStr ? parseInt(totalStr, 10) : 0;
  if (!total) throw new Error('Could not discover X-WP-Total');
  const perPage = 100;
  const pages = Math.ceil(total / perPage);
  console.log(`[listing] total=${total}, pages=${pages}`);

  const all = [];
  for (let page = 1; page <= pages; page++) {
    const url = `${LISTING_URL}?per_page=${perPage}&page=${page}&_fields=id,slug,link,status&status=publish`;
    let attempt = 0;
    while (true) {
      try {
        const arr = await fetchJson(url);
        for (const r of arr) all.push({ id: r.id, slug: r.slug, link: r.link });
        process.stdout.write(`\r[listing] page ${page}/${pages} (got ${all.length})    `);
        break;
      } catch (e) {
        attempt++;
        if (attempt >= 3) { console.error(`\n[listing] page ${page} failed: ${e.message}`); break; }
        await new Promise(r => setTimeout(r, 1000 * attempt));
      }
    }
  }
  console.log();
  await fs.writeFile(LISTING_FILE, JSON.stringify(all, null, 2));
  console.log(`[listing] wrote ${all.length} entries → ${LISTING_FILE}`);
  return all;
}

function isEnglishSlug(slug) {
  // Keep -en slugs and any slug not ending in -fr (some custom slugs have neither)
  if (slug.endsWith('-fr')) return false;
  return true;
}

function extractScorecardJson(html) {
  // <scorecard :courses='[...]'> attribute carries the data; HTML-encoded JSON
  const m = html.match(/:courses='(\[[\s\S]*?\])'/);
  if (!m) return null;
  try {
    return JSON.parse(decodeEntities(m[1]));
  } catch (e) {
    return null;
  }
}

function extractGeneralFacts(html) {
  // Number of holes and badge type from main body — usually less useful
  // (DB already has 100% holes coverage), but kept as supplementary info.
  const facts = {};
  const m = html.match(/course__type-badge course__type-badge--(\w+)/);
  if (m) facts.badgeType = m[1]; // outdoor / indoor
  const h = html.match(/# of Holes\s*<\/dt>\s*<dd[^>]*>\s*(\d+)/);
  if (h) facts.bodyHoles = parseInt(h[1], 10);
  return facts;
}

async function fetchFacility(slug) {
  const url = FACILITY_BASE + encodeURIComponent(slug) + '/';
  const html = await fetchText(url);
  const courses = extractScorecardJson(html);
  if (!courses || courses.length === 0) {
    return { slug, url, courses: null, facts: extractGeneralFacts(html) };
  }
  return { slug, url, courses, facts: extractGeneralFacts(html) };
}

async function processWithConcurrency(items, n, fn, label = '') {
  const results = new Array(items.length);
  let idx = 0, done = 0, errors = 0;
  async function worker() {
    while (true) {
      const i = idx++;
      if (i >= items.length) return;
      try {
        results[i] = await fn(items[i], i);
      } catch (e) {
        results[i] = { error: e.message, item: items[i] };
        errors++;
      }
      done++;
      if (done % 25 === 0 || done === items.length) {
        process.stdout.write(`\r[${label}] ${done}/${items.length} (err: ${errors})        `);
      }
    }
  }
  const workers = Array.from({ length: n }, () => worker());
  await Promise.all(workers);
  console.log();
  return results;
}

async function ensureDir(d) { await fs.mkdir(d, { recursive: true }); }

async function reparseFromRaw() {
  console.log('[reparse] aggregating from raw-golfcanada/');
  const files = (await fs.readdir(RAW_DIR)).filter(f => f.endsWith('.json'));
  const byFacility = new Map();
  let skipped = 0;
  for (const f of files) {
    const data = JSON.parse(await fs.readFile(path.join(RAW_DIR, f), 'utf8'));
    if (!data.courses || data.courses.length === 0) { skipped++; continue; }
    const fac = data.courses[0];
    const key = String(fac.facilityId || `noid-${data.slug}`);
    if (!byFacility.has(key)) {
      byFacility.set(key, mergeFacility(data));
    } else {
      // Merge additional courses under same facilityId
      const existing = byFacility.get(key);
      for (const c of data.courses) {
        if (!existing.courses.find(x => x.id === c.id)) existing.courses.push(c);
      }
    }
  }
  const out = [...byFacility.values()];
  await fs.writeFile(OUT_FILE, JSON.stringify(out, null, 2));
  console.log(`[reparse] wrote ${out.length} facility entries (skipped ${skipped} no-scorecard pages) → ${OUT_FILE}`);
  // Coverage stats
  const stats = {
    total: out.length,
    withWebsite: out.filter(c => c.website).length,
    withEmail: out.filter(c => c.email).length,
    withPhone: out.filter(c => c.phone).length,
    withCoords: out.filter(c => c.latitude && c.longitude).length,
  };
  console.log('[stats]', stats);
  Object.entries(stats).forEach(([k, v]) => {
    if (k === 'total') return;
    console.log(`  ${k}: ${v}/${stats.total} (${(v / stats.total * 100).toFixed(1)}%)`);
  });
}

function deriveWebsite(fac) {
  if (fac.url && fac.url.trim()) {
    let u = fac.url.trim();
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u.replace(/^\/+/, '');
    return u;
  }
  // Fallback: extract hostname from greenFeeUrl / teeTimeUrl / membershipUrl
  for (const k of ['greenFeeUrl', 'teeTimeUrl', 'membershipUrl']) {
    const v = fac[k];
    if (!v || typeof v !== 'string') continue;
    try {
      const u = new globalThis.URL(v);
      // Skip booking platforms — they're not the club's own website
      const host = u.hostname.toLowerCase();
      if (/(chronogolf|teesnap|golfnow|golfgenius|lightspeedhq|foreupsoftware|golfbooking|cps\.golfcanada|scg\.golfcanada|tee-on\.com|teequest)/.test(host)) continue;
      return `${u.protocol}//${u.hostname}`;
    } catch { /* skip */ }
  }
  return null;
}

function mergeFacility(data) {
  const primary = data.courses[0];
  const allCourses = data.courses;
  return {
    facilityId: primary.facilityId,
    facilityName: primary.facilityName || primary.name,
    sourceSlug: data.slug,
    sourceUrl: data.url,
    address1: primary.address1 || null,
    address2: primary.address2 || null,
    city: primary.city || null,
    region: primary.region || null,
    postalCode: primary.postalCode || null,
    latitude: primary.latitude ? Number(primary.latitude) : null,
    longitude: primary.longitude ? Number(primary.longitude) : null,
    phone: primary.phone || null,
    email: primary.email || null,
    website: deriveWebsite(primary),
    rawUrl: primary.url || null,
    greenFeeUrl: primary.greenFeeUrl || null,
    teeTimeUrl: primary.teeTimeUrl || null,
    membershipUrl: primary.membershipUrl || null,
    type: primary.type || null,           // EighteenHole / NineHole / etc
    facilityClass: primary.class || null, // Public / Private / SemiPrivate / Resort
    regionalAssociation: primary.regionalAssociation || null, // Golf Ontario / Golf Québec / ...
    badgeType: data.facts?.badgeType || null,
    bodyHoles: data.facts?.bodyHoles || null,
    courses: allCourses.map(c => ({
      id: c.id,
      name: c.name,
      shortName: c.shortName,
      type: c.type,
      teesCount: Array.isArray(c.tees) ? c.tees.length : 0,
    })),
  };
}

async function main() {
  await ensureDir(RAW_DIR);
  if (REPARSE) {
    await reparseFromRaw();
    return;
  }

  const slugs = await listAllSlugs();
  let englishSlugs = slugs.filter(s => s.slug && isEnglishSlug(s.slug));
  console.log(`[filter] kept ${englishSlugs.length} english/non-fr slugs (out of ${slugs.length})`);

  if (LIMIT > 0) {
    englishSlugs = englishSlugs.slice(0, LIMIT);
    console.log(`[limit] truncated to ${englishSlugs.length}`);
  }

  // Resume: skip slugs whose raw file exists
  const existing = new Set(await fs.readdir(RAW_DIR).catch(() => []));
  const todo = englishSlugs.filter(s => !existing.has(`${s.slug}.json`));
  console.log(`[resume] ${existing.size} already cached, ${todo.length} to fetch`);

  if (todo.length > 0) {
    await processWithConcurrency(todo, CONCURRENCY, async (entry) => {
      const data = await fetchFacility(entry.slug);
      data.id = entry.id;
      await fs.writeFile(path.join(RAW_DIR, `${entry.slug}.json`), JSON.stringify(data, null, 2));
      return data;
    }, 'fetch');
    if (BETWEEN_BATCHES_MS > 0) await new Promise(r => setTimeout(r, BETWEEN_BATCHES_MS));
  }

  await reparseFromRaw();
}

main().catch(e => { console.error(e); process.exit(1); });
