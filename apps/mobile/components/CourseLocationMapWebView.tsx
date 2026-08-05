import { useMemo } from 'react';
import { View } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import type { NearbyCourse } from '@/lib/courses';

/**
 * Course-detail screen's "where is this course" map — the course being
 * viewed gets a distinct larger gold marker, courses within ~10km get the
 * same small red/green (played/unplayed) dots used on My Map. No
 * clustering (unlike CountryClusterMapWebView) — a 10km radius rarely has
 * enough courses to need it, and the point here is "what's nearby", not
 * browsing a whole country. Same CARTO tile source as the rest of the
 * app's maps, not Google Maps — no per-view billing to worry about.
 */
type Props = {
  course: { id: string; name: string; club: string | null; latitude: number; longitude: number };
  nearby: NearbyCourse[];
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
};

function buildHtml(course: Props['course'], nearby: NearbyCourse[]): string {
  const data = JSON.stringify({ course, nearby }).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    html, body, #map { height: 100%; margin: 0; padding: 0; font-family: -apple-system, sans-serif; }
    .mgp-current { border: 2px solid ${COLORS.inverse}; border-radius: 50%; box-shadow: 0 2px 8px rgba(15,37,25,0.4); }
    .mgp-single { border: 1.5px solid ${COLORS.gold}; border-radius: 50%; box-shadow: 0 2px 6px rgba(15,37,25,0.3); }
    .mgp-popup-title { font-size: 15px; font-weight: 500; color: ${COLORS.ink}; margin-bottom: 4px; }
    .mgp-popup-sub { font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: ${COLORS.inkTertiary}; margin-bottom: 6px; }
    .mgp-view-link { display: block; margin-top: 4px; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: ${COLORS.goldDark}; cursor: pointer; }
  </style>
</head>
<body>
  <div id="map"></div>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const data = ${data};

    function post(msg) {
      if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(msg));
    }

    function escapeHtml(s) {
      return (s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function currentIcon() {
      return L.divIcon({
        html: '<div class="mgp-current" style="width:22px;height:22px;background:${COLORS.goldDark};"></div>',
        className: '',
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });
    }

    function nearbyIcon(played) {
      const fill = played ? '${COLORS.stampRed}' : '${COLORS.cover}';
      return L.divIcon({
        html: '<div class="mgp-single" style="width:14px;height:14px;background:' + fill + ';"></div>',
        className: '',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
    }

    const map = L.map('map', { zoomControl: true }).setView([data.course.latitude, data.course.longitude], 12);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 20,
    }).addTo(map);

    const currentMarker = L.marker([data.course.latitude, data.course.longitude], { icon: currentIcon(), zIndexOffset: 1000 });
    let currentPopup = '<div style="min-width:160px"><div class="mgp-popup-title">' + escapeHtml(data.course.club || data.course.name) + '</div>';
    if (data.course.club && data.course.club !== data.course.name) {
      currentPopup += '<div class="mgp-popup-sub">' + escapeHtml(data.course.name) + '</div>';
    }
    currentPopup += '</div>';
    currentMarker.bindPopup(currentPopup, { maxWidth: 220 }).addTo(map);

    const bounds = L.latLngBounds([[data.course.latitude, data.course.longitude]]);

    data.nearby.forEach((c) => {
      const m = L.marker([c.latitude, c.longitude], { icon: nearbyIcon(c.played) }).addTo(map);
      const primary = c.club || c.name;
      const secondary = c.club && c.club !== c.name ? c.name : null;
      let html = '<div style="min-width:170px"><div class="mgp-popup-title">' + escapeHtml(primary) + '</div>';
      if (secondary) html += '<div class="mgp-popup-sub">' + escapeHtml(secondary) + '</div>';
      html += '<div style="font-size:10px;color:${COLORS.inkTertiary}">' + c.distanceKm + ' km away</div>';
      html += '<div class="mgp-view-link" data-course-id="' + c.id + '">View course →</div></div>';
      m.bindPopup(html, { maxWidth: 240 });
      bounds.extend([c.latitude, c.longitude]);
    });

    if (data.nearby.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }

    map.on('popupopen', (e) => {
      const container = e.popup.getElement();
      if (!container) return;
      container.querySelectorAll('[data-course-id]').forEach((el) => {
        el.addEventListener('click', () => post({ type: 'course', id: el.getAttribute('data-course-id') }));
      });
    });
  </script>
</body>
</html>`;
}

export default function CourseLocationMapWebView({ course, nearby, onPressCourse }: Props) {
  const html = useMemo(() => buildHtml(course, nearby), [course, nearby]);

  function handleMessage(event: WebViewMessageEvent) {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (msg.type === 'course' && msg.id) onPressCourse(msg.id);
    } catch {
      // ignore malformed messages
    }
  }

  return (
    <View style={{ height: 220, borderRadius: 8, overflow: 'hidden' }}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        onMessage={handleMessage}
        style={{ flex: 1, backgroundColor: 'transparent' }}
        scrollEnabled={false}
      />
    </View>
  );
}
