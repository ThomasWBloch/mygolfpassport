// Generate a self-contained Leaflet map of all Danish golf courses.
// Run with: node --env-file=.env.local scripts/generate-denmark-map.mjs

import { writeFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const OUT = 'public/denmark-golf-map.html'

// ── Fetch ──────────────────────────────────────────────────────────────────
console.log('Fetching Danish courses...')
const allCourses = []
let offset = 0
while (true) {
  const { data, error } = await supabase
    .from('courses')
    .select('id, name, club, latitude, longitude, holes, par, is_major, is_combo, address, website')
    .eq('country', 'Denmark')
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)
    .range(offset, offset + 999)
  if (error) { console.error(error); process.exit(1) }
  if (!data?.length) break
  allCourses.push(...data)
  offset += data.length
  if (data.length < 1000) break
}

// Hide 9-hole components of combo courses at the same club
const clubComponents = new Map() // club -> Set of component 9-hole course names
for (const c of allCourses.filter(c => c.is_combo)) {
  const parts = String(c.name ?? '').split(' + ').map(x => x.trim()).filter(Boolean)
  if (parts.length !== 2) continue
  let set = clubComponents.get(c.club)
  if (!set) { set = new Set(); clubComponents.set(c.club, set) }
  for (const p of parts) set.add(p)
}
const hiddenIds = new Set(
  allCourses
    .filter(c => c.holes === 9 && !c.is_combo && clubComponents.get(c.club)?.has(c.name))
    .map(c => c.id)
)
const courses = allCourses.filter(c => !hiddenIds.has(c.id))
console.log(`  hidden 9-hole combo components: ${hiddenIds.size}`)

const total = courses.length
const majorCount = courses.filter(c => c.is_major).length
const comboCount = courses.filter(c => c.is_combo && !c.is_major).length
const regularCount = total - majorCount - comboCount
console.log(`  ${total} courses (major: ${majorCount}, combo: ${comboCount}, regular: ${regularCount})`)

// ── HTML ───────────────────────────────────────────────────────────────────
const data = courses.map(c => ({
  id: c.id,
  name: c.name ?? '',
  club: c.club ?? '',
  lat: c.latitude,
  lng: c.longitude,
  holes: c.holes ?? null,
  par: c.par ?? null,
  addr: c.address ?? '',
  web: c.website ?? '',
  kind: c.is_major ? 'major' : c.is_combo ? 'combo' : 'regular',
}))

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Danish Golf Courses — My Golf Passport</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="">
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css">
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css">
  <style>
    html, body { height: 100%; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif; }
    #map { position: absolute; inset: 0; }
    .legend {
      position: absolute; bottom: 16px; left: 16px; z-index: 1000;
      background: rgba(255,255,255,0.96); padding: 10px 12px;
      border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      font-size: 13px; line-height: 1.5;
    }
    .legend h4 { margin: 0 0 6px; font-size: 13px; font-weight: 700; color: #1a1a1a; }
    .legend .row { display: flex; align-items: center; gap: 8px; }
    .legend .dot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 0 1px rgba(0,0,0,0.2); }
    .header {
      position: absolute; top: 12px; left: 50%; transform: translateX(-50%);
      z-index: 1000; background: #1a5c38; color: #fff;
      padding: 8px 16px; border-radius: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      font-size: 14px; font-weight: 600;
    }
    .popup-title { font-weight: 700; font-size: 14px; color: #1a5c38; margin-bottom: 4px; }
    .popup-club  { font-size: 12px; color: #333; margin-bottom: 6px; }
    .popup-meta  { font-size: 11px; color: #555; margin: 2px 0; }
    .popup-meta b { color: #1a1a1a; }
    .popup-addr  { font-size: 11px; color: #666; margin-top: 6px; font-style: italic; }
    .popup-link  { font-size: 11px; color: #1a5c38; text-decoration: none; display: inline-block; margin-top: 6px; }
    .popup-link:hover { text-decoration: underline; }
    @media (max-width: 480px) {
      .legend { bottom: 8px; left: 8px; font-size: 12px; padding: 8px 10px; }
      .header { font-size: 12px; padding: 6px 12px; max-width: 90%; text-align: center; }
    }
  </style>
</head>
<body>
  <div class="header">⛳ Danish Golf Courses — ${total} courses</div>
  <div id="map"></div>
  <div class="legend">
    <h4>Legend</h4>
    <div class="row"><span class="dot" style="background:#dc2626"></span> Major championship (${majorCount})</div>
    <div class="row"><span class="dot" style="background:#c9a84c"></span> Combo course (${comboCount})</div>
    <div class="row"><span class="dot" style="background:#1a5c38"></span> Regular course (${regularCount})</div>
  </div>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
  <script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>
  <script>
    const COURSES = ${JSON.stringify(data)};

    const map = L.map('map', { zoomControl: true }).setView([56.0, 10.0], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const COLORS = { major: '#dc2626', combo: '#c9a84c', regular: '#1a5c38' };

    const cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 50,
    });

    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[ch]);
    }

    for (const c of COURSES) {
      const color = COLORS[c.kind] || COLORS.regular;
      const marker = L.circleMarker([c.lat, c.lng], {
        radius: 7,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      });
      const holesPar = [
        c.holes != null ? c.holes + ' holes' : null,
        c.par   != null ? 'par ' + c.par    : null,
      ].filter(Boolean).join(' · ');
      const kindLabel = c.kind === 'major' ? '🏆 Major' : c.kind === 'combo' ? '⛳ Combo' : '';
      const popup =
        '<div class="popup-title">' + escapeHtml(c.name || c.club || 'Unknown') + (kindLabel ? ' <span style="font-size:11px;color:#c9a84c">' + kindLabel + '</span>' : '') + '</div>' +
        (c.club && c.club !== c.name ? '<div class="popup-club">🏠 ' + escapeHtml(c.club) + '</div>' : '') +
        (holesPar ? '<div class="popup-meta">' + holesPar + '</div>' : '') +
        (c.addr ? '<div class="popup-addr">📍 ' + escapeHtml(c.addr) + '</div>' : '') +
        (c.web  ? '<a class="popup-link" href="' + escapeHtml(c.web) + '" target="_blank" rel="noopener">Website ↗</a>' : '');
      marker.bindPopup(popup);
      cluster.addLayer(marker);
    }

    map.addLayer(cluster);
  </script>
</body>
</html>
`

writeFileSync(OUT, html)
console.log(`\nWrote ${OUT} (${(html.length / 1024).toFixed(1)} KB, ${total} courses)`)
