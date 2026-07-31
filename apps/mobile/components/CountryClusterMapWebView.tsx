import { useEffect, useMemo, useRef } from 'react';
import { View } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import type { CountryMapCourse } from '@/lib/map';

/**
 * Ported from apps/web/src/components/CountryClusterMap.tsx — one pin per
 * course in a country, colored by played status (red = played, green =
 * not), collapsing into cluster bubbles via leaflet.markercluster when
 * pins are too close to render individually. Tapping a loose cluster
 * zooms in; tapping a "stack" (same address — e.g. a multi-course resort)
 * opens a compact list popup instead of Leaflet's unreadable spiderfy
 * fan-out, same as web.
 *
 * Diverges from web on two points (Thomas's call, 2026-07):
 *  - Smaller pins (16px vs web's 22px) + a tighter maxClusterRadius (35 vs
 *    50) + disableClusteringAtZoom so individual courses become tappable
 *    without needing to zoom all the way in — better for "use the map to
 *    find a course" than web's denser default.
 *  - `onlyPlayed` filters markers via a live injectJavaScript call instead
 *    of rebuilding the WebView's HTML, so toggling it doesn't reset the
 *    user's current pan/zoom.
 */
type Props = {
  courses: CountryMapCourse[];
  onlyPlayed: boolean;
  onPressCourse: (courseId: string) => void;
};

const COLORS = {
  cover: '#1f3a2e',
  inverse: '#f4ecd8',
  gold: '#c9a84c',
  goldDark: '#9a7e2a',
  stampRed: '#a84a2c',
  ink: '#1f3a2e',
  inkTertiary: '#8a7d5f',
  creamWarm: '#f9efd5',
  borderFaint: '#e0d5b0',
};

function buildHtml(courses: CountryMapCourse[], initialOnlyPlayed: boolean): string {
  const data = JSON.stringify(courses).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css" />
  <style>
    html, body, #map { height: 100%; margin: 0; padding: 0; font-family: -apple-system, sans-serif; }
    .mgp-cluster { background: ${COLORS.cover}; color: ${COLORS.inverse}; font-weight: 500; border-radius: 50%;
      border: 2px solid ${COLORS.gold}; box-shadow: 0 4px 12px rgba(15,37,25,0.25);
      display: flex; align-items: center; justify-content: center; }
    .mgp-single { border: 1.5px solid ${COLORS.gold}; border-radius: 50%; box-shadow: 0 2px 6px rgba(15,37,25,0.3); }
    .mgp-popup-title { font-size: 16px; font-weight: 500; color: ${COLORS.ink}; margin-bottom: 4px; }
    .mgp-popup-sub { font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: ${COLORS.inkTertiary}; margin-bottom: 6px; }
    .mgp-popup-meta { display: flex; gap: 8px; align-items: center; margin-bottom: 10px; }
    .mgp-holes { font-size: 10px; letter-spacing: 1px; color: ${COLORS.inkTertiary}; }
    .mgp-played-badge { font-size: 9px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: ${COLORS.stampRed}; border: 1px dashed ${COLORS.stampRed}; border-radius: 4px; padding: 2px 6px; }
    .mgp-view-link { display: block; margin-top: 6px; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: ${COLORS.goldDark}; cursor: pointer; }
    .mgp-stack-header { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: ${COLORS.inkTertiary}; margin-bottom: 6px; }
    .mgp-stack-row { display: block; padding: 6px 8px; border-radius: 5px; border: 0.5px solid ${COLORS.borderFaint}; background: ${COLORS.creamWarm}; margin-bottom: 4px; cursor: pointer; }
    .mgp-stack-row-title { flex: 1; min-width: 0; font-size: 13px; font-weight: 500; color: ${COLORS.ink}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .mgp-stack-row-sub { font-size: 9px; letter-spacing: 1.1px; text-transform: uppercase; color: ${COLORS.inkTertiary}; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  </style>
</head>
<body>
  <div id="map"></div>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>
  <script>
    const courses = ${data};

    function post(msg) {
      if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(msg));
    }

    function escapeHtml(s) {
      return (s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function singleIcon(played) {
      const fill = played ? '${COLORS.stampRed}' : '${COLORS.cover}';
      return L.divIcon({
        html: '<div class="mgp-single" style="width:16px;height:16px;background:' + fill + ';"></div>',
        className: '',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
    }

    function clusterIcon(cluster) {
      const n = cluster.getChildCount();
      const size = n >= 100 ? 44 : n >= 25 ? 38 : n >= 10 ? 34 : 28;
      const fontSize = size >= 40 ? 13 : size >= 34 ? 12 : 11;
      return L.divIcon({
        html: '<div class="mgp-cluster" style="width:' + size + 'px;height:' + size + 'px;font-size:' + fontSize + 'px;">' + n + '</div>',
        className: '',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
    }

    function popupHtml(course) {
      const primary = course.club || course.name;
      const secondary = course.club && course.club !== course.name ? course.name : null;
      const holes = course.holes ? course.holes + 'H' : null;
      let html = '<div style="min-width:180px">';
      html += '<div class="mgp-popup-title">' + escapeHtml(primary) + '</div>';
      if (secondary) html += '<div class="mgp-popup-sub">' + escapeHtml(secondary) + '</div>';
      html += '<div class="mgp-popup-meta">';
      if (holes) html += '<span class="mgp-holes">' + holes + '</span>';
      if (course.played) html += '<span class="mgp-played-badge">✓ Played</span>';
      html += '</div>';
      html += '<div class="mgp-view-link" data-course-id="' + course.id + '">View course →</div>';
      html += '</div>';
      return html;
    }

    function stackListHtml(stackCourses) {
      const count = stackCourses.length;
      const firstClub = stackCourses[0] ? stackCourses[0].club : null;
      const allSameClub = firstClub != null && stackCourses.every((c) => c.club === firstClub);
      const header = allSameClub ? (escapeHtml(firstClub) + ' · ' + count + ' here') : (count + (count === 1 ? ' course here' : ' courses here'));
      let html = '<div style="min-width:220px;max-width:280px">';
      html += '<div class="mgp-stack-header">' + header + '</div>';
      html += '<div style="display:flex;flex-direction:column;max-height:280px;overflow-y:auto">';
      stackCourses.forEach((c) => {
        const primary = allSameClub ? c.name : (c.club || c.name);
        const subtitle = !allSameClub && c.club && c.club !== c.name ? c.name : null;
        html += '<div class="mgp-stack-row" data-course-id="' + c.id + '">';
        html += '<div style="display:flex;align-items:center;gap:6px">';
        html += '<span class="mgp-stack-row-title">' + escapeHtml(primary) + '</span>';
        if (c.holes) html += '<span style="flex-shrink:0;font-size:9px;color:${COLORS.inkTertiary}">' + c.holes + 'H</span>';
        if (c.played) html += '<span style="flex-shrink:0;font-size:8px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${COLORS.stampRed};border:1px dashed ${COLORS.stampRed};border-radius:3px;padding:1px 4px;">✓</span>';
        html += '</div>';
        if (subtitle) html += '<div class="mgp-stack-row-sub">' + escapeHtml(subtitle) + '</div>';
        html += '</div>';
      });
      html += '</div></div>';
      return html;
    }

    const map = L.map('map', { zoomControl: true }).setView([20, 0], 2);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 20,
    }).addTo(map);

    let group = null;
    const markerEntries = [];

    if (courses.length > 0) {
      group = L.markerClusterGroup({
        iconCreateFunction: clusterIcon,
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: false,
        zoomToBoundsOnClick: false,
        maxClusterRadius: 35,
        disableClusteringAtZoom: 12,
      });

      courses.forEach((c) => {
        const m = L.marker([c.latitude, c.longitude], { icon: singleIcon(c.played) });
        m.bindPopup(popupHtml(c), { maxWidth: 260 });
        markerEntries.push({ marker: m, course: c });
      });
      const initialOnlyPlayed = ${initialOnlyPlayed ? 'true' : 'false'};
      const initialVisible = markerEntries.filter((e) => !initialOnlyPlayed || e.course.played).map((e) => e.marker);
      group.addLayers(initialVisible);
      map.addLayer(group);

      const STACK_THRESHOLD = 0.0005;

      group.on('clusterclick', (e) => {
        const cluster = e.layer;
        const bounds = cluster.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        const latDiff = Math.abs(ne.lat - sw.lat);
        const lngDiff = Math.abs(ne.lng - sw.lng);
        if (latDiff < STACK_THRESHOLD && lngDiff < STACK_THRESHOLD) {
          const childMarkers = cluster.getAllChildMarkers();
          const childCourses = markerEntries.filter((e) => childMarkers.indexOf(e.marker) !== -1).map((e) => e.course);
          L.popup({ maxWidth: 300 }).setLatLng(cluster.getLatLng()).setContent(stackListHtml(childCourses)).openOn(map);
        } else {
          map.fitBounds(bounds, { padding: [40, 40], maxZoom: 18 });
        }
      });

      map.on('popupopen', (e) => {
        const container = e.popup.getElement();
        if (!container) return;
        container.querySelectorAll('[data-course-id]').forEach((el) => {
          el.addEventListener('click', () => post({ type: 'course', id: el.getAttribute('data-course-id') }));
        });
      });

      const bounds = L.latLngBounds(courses.map((c) => [c.latitude, c.longitude]));
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
      }
    }

    // Called from RN via injectJavaScript when the "only played" toggle
    // changes — swaps which markers are in the cluster group in place
    // instead of reloading the page, so the current pan/zoom is preserved.
    window.applyFilter = function (onlyPlayed) {
      if (!group) return;
      group.clearLayers();
      const visible = markerEntries.filter((e) => !onlyPlayed || e.course.played).map((e) => e.marker);
      group.addLayers(visible);
    };
  </script>
</body>
</html>`;
}

export default function CountryClusterMapWebView({ courses, onlyPlayed, onPressCourse }: Props) {
  const webviewRef = useRef<WebView>(null);

  // Read via ref (updated every render, not a dependency) so a fresh page
  // load — e.g. picking a different country — bakes in whatever the toggle
  // is currently set to, without the toggle itself forcing a full HTML
  // rebuild (which would reset the user's pan/zoom on the same country).
  const onlyPlayedRef = useRef(onlyPlayed);
  onlyPlayedRef.current = onlyPlayed;
  const html = useMemo(() => buildHtml(courses, onlyPlayedRef.current), [courses]);

  useEffect(() => {
    webviewRef.current?.injectJavaScript(
      `if (window.applyFilter) { window.applyFilter(${onlyPlayed ? 'true' : 'false'}); } true;`
    );
  }, [onlyPlayed]);

  function handleMessage(event: WebViewMessageEvent) {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (msg.type === 'course' && msg.id) onPressCourse(msg.id);
    } catch {
      // ignore malformed messages
    }
  }

  return (
    <View style={{ width: '100%', height: 420, borderRadius: 16, overflow: 'hidden' }}>
      <WebView ref={webviewRef} originWhitelist={['*']} source={{ html }} onMessage={handleMessage} style={{ flex: 1 }} />
    </View>
  );
}
