'use client'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { CountryGroup } from '@/app/map/page'

// Fix Leaflet default icon error in Next.js
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl: '', iconUrl: '', shadowUrl: '' })

function makeIcon(count: number): L.DivIcon {
  const size = count >= 10 ? 44 : count >= 5 ? 38 : 32
  const fontSize = size >= 44 ? 16 : 14
  return L.divIcon({
    html: `<div style="
      width:${size}px;height:${size}px;
      background:#1a5c38;
      color:#fff;
      font-weight:700;
      font-size:${fontSize}px;
      border-radius:50%;
      border:2px solid white;
      box-shadow:0 0 8px rgba(74,222,128,0.6);
      display:flex;
      align-items:center;
      justify-content:center;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    ">${count}</div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

export default function WorldMap({
  countries,
  totalRounds,
  totalCountries,
}: {
  countries: CountryGroup[]
  totalRounds: number
  totalCountries: number
}) {
  return (
    <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', width: '100%', height: '65vh' }}>
      <MapContainer
        center={[54, 15]}
        zoom={4}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          maxZoom={20}
        />

        {countries.map((c) => (
          <Marker
            key={c.country}
            position={[c.lat, c.lng]}
            icon={makeIcon(c.count)}
          >
            <Popup>
              <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", minWidth: 160 }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>{c.flag}</span>
                  <span>{c.country}</span>
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
                  {c.count} {c.count === 1 ? 'bane spillet' : 'baner spillet'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {c.courses.map((course, i) => (
                    <div key={i} style={{ fontSize: 12, color: '#374151', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ color: '#1a5c38' }}>•</span>
                      <a
                        href={`/courses/${course.id}`}
                        style={{ color: '#1a5c38', fontWeight: 600, textDecoration: 'none' }}
                        onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
                        onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
                      >
                        {course.name}
                      </a>
                      {course.rating != null && (
                        <span style={{ color: '#c9a84c', marginLeft: 'auto' }}>{'★'.repeat(course.rating)}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Stats overlay */}
      <div style={{
        position: 'absolute', bottom: 16, left: 16, zIndex: 1000,
        background: '#1a5c38', color: '#fff',
        borderRadius: 10, padding: '8px 14px',
        fontSize: 13, fontWeight: 600,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        pointerEvents: 'none',
      }}>
        {totalRounds} {totalRounds === 1 ? 'bane' : 'baner'} · {totalCountries} {totalCountries === 1 ? 'land' : 'lande'}
      </div>
    </div>
  )
}
