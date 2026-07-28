import { useMemo } from 'react';
import { View } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import type { CountryGroup } from '@/lib/map';

/**
 * Ported from apps/web/src/components/WorldMap.tsx's map chrome (CARTO
 * Voyager tiles, circular count-badge markers, bottom-left stats badge),
 * rendered inside a WebView since Leaflet needs a DOM and react-native-maps
 * would require a custom dev-client build (out of reach right now — see
 * conversation). Deliberately diverges from web's own behavior here:
 * tapping a country marker drills straight into the per-course cluster map
 * (CountryClusterMapWebView) instead of opening a 5-course-list popup —
 * matches CountryClusterMap.tsx's existing per-course pin experience,
 * which web only otherwise surfaces from the Atlas country view.
 */
type Props = {
  countries: CountryGroup[];
  totalRounds: number;
  totalCountries: number;
  onPressCountry: (country: string) => void;
};

const COLORS = {
  cover: '#1f3a2e',
  inverse: '#f4ecd8',
  gold: '#c9a84c',
};

function buildHtml(countries: CountryGroup[], totalRounds: number, totalCountries: number): string {
  const data = JSON.stringify(countries).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    html, body, #map { height: 100%; margin: 0; padding: 0; font-family: -apple-system, sans-serif; }
    .mgp-marker { background: ${COLORS.cover}; color: ${COLORS.inverse}; font-weight: 500; border-radius: 50%;
      border: 2px solid ${COLORS.gold}; box-shadow: 0 4px 12px rgba(15,37,25,0.25);
      display: flex; align-items: center; justify-content: center; cursor: pointer; }
    .mgp-stats {
      position: absolute; bottom: 16px; left: 16px; z-index: 1000;
      background: ${COLORS.cover}; color: ${COLORS.inverse}; border: 0.5px solid ${COLORS.gold};
      border-radius: 8px; padding: 8px 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; box-shadow: 0 2px 8px rgba(0,0,0,0.3); pointer-events: none;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <div class="mgp-stats">${totalRounds} ${totalRounds === 1 ? 'course' : 'courses'} · ${totalCountries} ${totalCountries === 1 ? 'country' : 'countries'}</div>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const countries = ${data};

    function post(msg) {
      if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(msg));
    }

    function makeIcon(count) {
      const size = count >= 10 ? 44 : count >= 5 ? 38 : 32;
      const fontSize = size >= 44 ? 16 : 14;
      return L.divIcon({
        html: '<div class="mgp-marker" style="width:' + size + 'px;height:' + size + 'px;font-size:' + fontSize + 'px;">' + count + '</div>',
        className: '',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
    }

    const map = L.map('map', { zoomControl: true }).setView([54, 15], 4);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 20,
    }).addTo(map);

    const points = countries.map((c) => [c.lat, c.lng]);
    if (points.length === 1) {
      map.setView(points[0], 6);
    } else if (points.length > 1) {
      map.fitBounds(points, { padding: [50, 50], maxZoom: 10 });
    }

    countries.forEach((c) => {
      const marker = L.marker([c.lat, c.lng], { icon: makeIcon(c.count) }).addTo(map);
      marker.on('click', () => post({ type: 'country', country: c.country }));
    });
  </script>
</body>
</html>`;
}

export default function WorldMapWebView({ countries, totalRounds, totalCountries, onPressCountry }: Props) {
  const html = useMemo(() => buildHtml(countries, totalRounds, totalCountries), [countries, totalRounds, totalCountries]);

  function handleMessage(event: WebViewMessageEvent) {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (msg.type === 'country' && msg.country) onPressCountry(msg.country);
    } catch {
      // ignore malformed messages
    }
  }

  return (
    <View style={{ width: '100%', height: 340, borderRadius: 16, overflow: 'hidden' }}>
      <WebView originWhitelist={['*']} source={{ html }} onMessage={handleMessage} style={{ flex: 1 }} />
    </View>
  );
}
