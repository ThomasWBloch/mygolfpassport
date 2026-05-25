'use client'

import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import L from 'leaflet'
import 'leaflet.markercluster'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { useEffect } from 'react'

/**
 * Single-country marker-cluster map. One pin per course; pins collapse
 * into Adventure-styled cluster bubbles when too close to render
 * individually. Used inside the Atlas country-state's optional Map view.
 *
 * Clustering is wired by hand (rather than via react-leaflet-cluster) so
 * we can keep tight control over icon styling and the popup HTML and not
 * inherit an extra dependency layer.
 */

// Fix Leaflet default icon error in Next.js (also done in WorldMap.tsx —
// running it again here is a no-op).
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl: '', iconUrl: '', shadowUrl: '' })

export interface AtlasCourseMarker {
  id: string
  name: string
  club: string | null
  holes: number | null
  latitude: number
  longitude: number
  played: boolean
}

function singleIcon(played: boolean): L.DivIcon {
  const fill = played ? 'var(--color-mgp-stamp-red)' : 'var(--color-mgp-cover)'
  return L.divIcon({
    html: `<div style="width:22px;height:22px;background:${fill};border:2px solid var(--color-mgp-gold);border-radius:50%;box-shadow:0 2px 6px rgba(15,37,25,0.3);"></div>`,
    className: '',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  })
}

function clusterIcon(cluster: L.MarkerCluster): L.DivIcon {
  const n = cluster.getChildCount()
  const size = n >= 100 ? 48 : n >= 25 ? 42 : n >= 10 ? 38 : 32
  const fontSize = size >= 44 ? 14 : size >= 38 ? 13 : 12
  return L.divIcon({
    html: `<div style="width:${size}px;height:${size}px;background:var(--color-mgp-cover);color:var(--color-mgp-ink-inv);font-weight:500;font-size:${fontSize}px;border-radius:50%;border:2px solid var(--color-mgp-gold);box-shadow:0 4px 12px rgba(15, 37, 25, 0.25);display:flex;align-items:center;justify-content:center;font-family:var(--font-mgp-display);">${n}</div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function popupHtml(course: AtlasCourseMarker): string {
  const primary = course.club ?? course.name
  const secondary = course.club && course.club !== course.name ? course.name : null
  const holes = course.holes ? `${course.holes}H` : null
  return `
    <div style="font-family: var(--font-mgp-body); min-width: 180px;">
      <div style="font-family: var(--font-mgp-display); font-size: 16px; font-weight: 500; color: var(--color-mgp-ink); letter-spacing: -0.2px; margin-bottom: 4px;">
        ${escapeHtml(primary)}
      </div>
      ${secondary ? `
        <div style="font-family: var(--font-mgp-stamp); font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--color-mgp-ink-3); margin-bottom: 6px;">
          ${escapeHtml(secondary)}
        </div>
      ` : ''}
      <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 10px;">
        ${holes ? `<span style="font-family: var(--font-mgp-stamp); font-size: 10px; letter-spacing: 1px; color: var(--color-mgp-ink-3);">${holes}</span>` : ''}
        ${course.played ? `
          <span style="font-family: var(--font-mgp-stamp); font-size: 9px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--color-mgp-stamp-red); border: 1px dashed var(--color-mgp-stamp-red); border-radius: 4px; padding: 2px 6px;">✓ Played</span>
        ` : ''}
      </div>
      <a href="/courses/${encodeURIComponent(course.id)}" style="display: inline-block; font-family: var(--font-mgp-stamp); font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--color-mgp-gold-dark); text-decoration: none;">
        View course →
      </a>
    </div>
  `
}

function ClusterLayer({ courses }: { courses: AtlasCourseMarker[] }) {
  const map = useMap()

  useEffect(() => {
    if (courses.length === 0) return

    // leaflet.markercluster augments the L namespace at runtime, but
    // @types/leaflet.markercluster ships the type. Cast through unknown
    // to silence the structural-namespace check.
    const group = (L as unknown as { markerClusterGroup: (opts?: L.MarkerClusterGroupOptions) => L.MarkerClusterGroup }).markerClusterGroup({
      iconCreateFunction: clusterIcon,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      maxClusterRadius: 50,
    })

    const markers = courses.map((c) => {
      const m = L.marker([c.latitude, c.longitude], { icon: singleIcon(c.played) })
      m.bindPopup(popupHtml(c), { maxWidth: 260 })
      return m
    })
    for (const m of markers) group.addLayer(m)
    map.addLayer(group)

    // Fit map to all course pins on first mount. maxZoom keeps single-
    // marker countries from snapping to street-level zoom.
    const bounds = L.latLngBounds(
      courses.map((c) => L.latLng(c.latitude, c.longitude)),
    )
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 11 })
    }

    return () => {
      map.removeLayer(group)
    }
  }, [map, courses])

  return null
}

interface Props {
  courses: AtlasCourseMarker[]
  country: string
}

export default function CountryClusterMap({ courses, country }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        width: '100%',
        height: 'min(60vh, 520px)',
      }}
    >
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          maxZoom={20}
        />
        <ClusterLayer courses={courses} />
      </MapContainer>

      <div
        style={{
          position: 'absolute',
          bottom: 14,
          left: 14,
          zIndex: 1000,
          background: 'var(--color-mgp-cover)',
          color: 'var(--color-mgp-ink-inv)',
          border: '0.5px solid var(--color-mgp-gold)',
          borderRadius: 8,
          padding: '8px 12px',
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          pointerEvents: 'none',
        }}
      >
        {courses.length.toLocaleString('en-US')}{' '}
        {courses.length === 1 ? 'course' : 'courses'} in {country}
      </div>
    </div>
  )
}
