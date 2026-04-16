'use client'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import type { CountryGroup } from '@/app/map/page'

// Fix Leaflet default icon error in Next.js
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl: '', iconUrl: '', shadowUrl: '' })

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (points.length === 0) return
    if (points.length === 1) {
      map.setView(points[0], 6)
      return
    }
    const bounds = L.latLngBounds(points.map(p => L.latLng(p[0], p[1])))
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 })
  }, [map, points])
  return null
}

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

        <FitBounds points={countries.map(c => [c.lat, c.lng] as [number, number])} />

        {countries.map((c) => (
          <Marker
            key={c.country}
            position={[c.lat, c.lng]}
            icon={makeIcon(c.count)}
          >
            <Popup>
              <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", minWidth: 180, maxHeight: 280, overflowY: 'auto' }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>{c.flag}</span>
                  <span>{c.country}</span>
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
                  {c.count} {c.count === 1 ? 'course played' : 'courses played'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {c.courses.slice(0, 5).map((course, i) => {
                    const label = course.club && course.club !== course.name
                      ? `${course.club} · ${course.name}`
                      : course.name
                    const fullStars = course.rating != null ? Math.round(course.rating) : 0
                    return (
                      <div key={i} style={{ fontSize: 12, color: '#374151' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ color: '#1a5c38' }}>•</span>
                          <a
                            href={`/courses/${course.id}`}
                            style={{ color: '#1a5c38', fontWeight: 600, textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                            onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
                            onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
                          >
                            {label}
                          </a>
                        </div>
                        {course.rating != null && (
                          <div style={{ marginLeft: 14, fontSize: 11, color: '#c9a84c', letterSpacing: 1 }}>
                            {'★'.repeat(fullStars)}{'☆'.repeat(5 - fullStars)}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
                {c.count > 5 && (
                  <a
                    href={`/courses?country=${encodeURIComponent(c.country)}`}
                    style={{ display: 'block', marginTop: 10, fontSize: 12, color: '#1a5c38', fontWeight: 600, textDecoration: 'none' }}
                    onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    See all {c.count} courses in {c.country} →
                  </a>
                )}
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
        {totalRounds} {totalRounds === 1 ? 'course' : 'courses'} · {totalCountries} {totalCountries === 1 ? 'country' : 'countries'}
      </div>
    </div>
  )
}
