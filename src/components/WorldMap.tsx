'use client'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import type { CountryGroup } from '@/app/map/page'

// Fix Leaflet default icon error in Next.js
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl: '', iconUrl: '', shadowUrl: '' })

function markerRadius(count: number): number {
  return Math.min(20, Math.max(8, 8 + count * 2))
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
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxZoom={20}
        />

        {countries.map((c) => (
          <CircleMarker
            key={c.country}
            center={[c.lat, c.lng]}
            radius={markerRadius(c.count)}
            pathOptions={{
              color: '#1a5c38',
              fillColor: '#2d8a5c',
              fillOpacity: 0.85,
              weight: 2,
            }}
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
                      <span>{course.name}</span>
                      {course.rating != null && (
                        <span style={{ color: '#c9a84c', marginLeft: 'auto' }}>{'★'.repeat(course.rating)}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          </CircleMarker>
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
