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
    html: `<div style="width:${size}px;height:${size}px;background:var(--color-mgp-cover);color:var(--color-mgp-ink-inv);font-weight:500;font-size:${fontSize}px;border-radius:50%;border:2px solid var(--color-mgp-gold);box-shadow:0 4px 12px rgba(15, 37, 25, 0.25);display:flex;align-items:center;justify-content:center;font-family:var(--font-mgp-display);">${count}</div>`,
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
    <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', width: '100%', height: 'min(50vh, 420px)' }}>
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
              <div style={{
                fontFamily: 'var(--font-mgp-body)',
                minWidth: 200, maxHeight: 280, overflowY: 'auto',
                padding: 0,
              }}>
                {/* Country header — flag + Cormorant country name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 18 }}>{c.flag}</span>
                  <span style={{
                    fontFamily: 'var(--font-mgp-display)',
                    fontSize: 18, fontWeight: 500,
                    color: 'var(--color-mgp-ink)',
                    letterSpacing: -0.2,
                  }}>{c.country}</span>
                </div>

                {/* Stamp-uppercase course count */}
                <div style={{
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 10, letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'var(--color-mgp-ink-3)',
                  marginBottom: 10,
                }}>
                  {c.count} {c.count === 1 ? 'course played' : 'courses played'}
                </div>

                {/* Course list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {c.courses.slice(0, 5).map((course, i) => {
                    const label = course.club && course.club !== course.name
                      ? `${course.club} · ${course.name}`
                      : course.name
                    const fullStars = course.rating != null ? Math.round(course.rating) : 0
                    return (
                      <div key={i}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {/* Gold dot bullet */}
                          <span aria-hidden style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: 'var(--color-mgp-gold)',
                            flexShrink: 0,
                          }} />
                          <a
                            href={`/courses/${course.id}`}
                            style={{
                              fontSize: 13,
                              color: 'var(--color-mgp-ink)',
                              fontWeight: 500,
                              textDecoration: 'none',
                              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            }}
                            onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
                            onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
                          >
                            {label}
                          </a>
                        </div>
                        {course.rating != null && (
                          <div style={{
                            marginLeft: 14, marginTop: 2,
                            fontSize: 12, letterSpacing: 2,
                          }}>
                            <span style={{ color: 'var(--color-mgp-gold-dark)' }}>{'★'.repeat(fullStars)}</span>
                            <span style={{ color: 'var(--color-mgp-border-faint)' }}>{'★'.repeat(5 - fullStars)}</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {c.count > 5 && (
                  <a
                    href={`/profile/courses/${encodeURIComponent(c.country)}`}
                    style={{
                      display: 'block', marginTop: 12,
                      fontFamily: 'var(--font-mgp-stamp)',
                      fontSize: 10, fontWeight: 700, letterSpacing: 2,
                      textTransform: 'uppercase',
                      color: 'var(--color-mgp-gold-dark)',
                      textDecoration: 'none',
                    }}
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

      {/* Stats overlay — stamp-typography badge with gold edge */}
      <div style={{
        position: 'absolute', bottom: 16, left: 16, zIndex: 1000,
        background: 'var(--color-mgp-cover)',
        color: 'var(--color-mgp-ink-inv)',
        border: '0.5px solid var(--color-mgp-gold)',
        borderRadius: 8, padding: '8px 14px',
        fontFamily: 'var(--font-mgp-stamp)',
        fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
        textTransform: 'uppercase',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        pointerEvents: 'none',
      }}>
        {totalRounds} {totalRounds === 1 ? 'course' : 'courses'} · {totalCountries} {totalCountries === 1 ? 'country' : 'countries'}
      </div>
    </div>
  )
}
