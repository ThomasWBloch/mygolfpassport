/**
 * mapshot — Web Mercator helpers for compositing our own course dots on top
 * of a Mapbox static base map.
 *
 * We do NOT use Mapbox URL markers (the URL length caps out well before a
 * 300-course golfer). Instead we fetch a plain base map at a known
 * center+zoom, then project each course coordinate to a pixel on the same
 * canvas and draw the dot ourselves. No marker limit, full control of style.
 *
 * Mapbox GL (and the static-images API) uses 512px tiles, so worldSize =
 * 512 * 2^zoom. Keep TILE in sync with that or the dots drift off the map.
 */

export type LngLat = { lat: number; lng: number }

const TILE = 512

function lngToX01(lng: number): number {
  return (lng + 180) / 360
}
function latToY01(lat: number): number {
  const rad = (lat * Math.PI) / 180
  return (1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2
}
function y01ToLat(y: number): number {
  const n = Math.PI * (1 - 2 * y)
  return (Math.atan(Math.sinh(n)) * 180) / Math.PI
}

/** Center + zoom that fits every point inside width×height with padding. */
export function fitBounds(
  points: LngLat[],
  width: number,
  height: number,
  padding = 80
): { center: LngLat; zoom: number } {
  if (points.length === 0) {
    return { center: { lat: 25, lng: 0 }, zoom: 1.2 }
  }
  const xs = points.map((p) => lngToX01(p.lng))
  const ys = points.map((p) => latToY01(p.lat))
  const minX = Math.min(...xs), maxX = Math.max(...xs)
  const minY = Math.min(...ys), maxY = Math.max(...ys)

  const centerLng = ((minX + maxX) / 2) * 360 - 180
  const centerLat = y01ToLat((minY + maxY) / 2)

  const dx = Math.max(maxX - minX, 1e-7)
  const dy = Math.max(maxY - minY, 1e-7)
  const availW = Math.max(width - 2 * padding, 1)
  const availH = Math.max(height - 2 * padding, 1)

  let zoom = Math.min(
    Math.log2(availW / (TILE * dx)),
    Math.log2(availH / (TILE * dy))
  )
  if (!isFinite(zoom)) zoom = 8
  if (points.length === 1) zoom = 9
  zoom = Math.max(0.6, Math.min(zoom, 15))

  return { center: { lat: centerLat, lng: centerLng }, zoom }
}

/** Project a coordinate to an (x, y) pixel on the width×height canvas. */
export function project(
  p: LngLat,
  center: LngLat,
  zoom: number,
  width: number,
  height: number
): { x: number; y: number } {
  const world = TILE * Math.pow(2, zoom)
  const px = world * lngToX01(p.lng)
  const py = world * latToY01(p.lat)
  const cpx = world * lngToX01(center.lng)
  const cpy = world * latToY01(center.lat)
  return { x: width / 2 + (px - cpx), y: height / 2 + (py - cpy) }
}

/**
 * Mapbox static-images URL for the base map. Attribution + logo are left ON
 * (Mapbox ToS requires attribution); our overlays avoid the bottom corners
 * where Mapbox renders them.
 */
export function mapboxStaticUrl(opts: {
  center: LngLat
  zoom: number
  width: number
  height: number
  token: string
  style?: string
}): string {
  const style = opts.style ?? 'light-v11'
  const z = Math.round(opts.zoom * 100) / 100
  const { lng, lat } = opts.center
  return (
    `https://api.mapbox.com/styles/v1/mapbox/${style}/static/` +
    `${lng},${lat},${z},0/${opts.width}x${opts.height}` +
    `?access_token=${opts.token}`
  )
}

/**
 * Frame the PRIMARY region — the country where the user has played the most
 * courses — with a margin so neighbouring countries stay visible. Far-flung
 * outliers (a lone course on another continent) fall outside the frame rather
 * than zooming the whole map out to the ocean. Returns two corner points to
 * feed into fitBounds; falls back to all points when country is unknown.
 */
export function primaryRegionCorners(
  points: (LngLat & { country?: string | null })[]
): LngLat[] {
  if (points.length === 0) return []
  const byCountry = new Map<string, LngLat[]>()
  for (const p of points) {
    const key = p.country ?? '\u2205'
    const arr = byCountry.get(key) ?? []
    arr.push(p)
    byCountry.set(key, arr)
  }
  let top: LngLat[] = points
  let best = -1
  for (const arr of byCountry.values()) {
    if (arr.length > best) {
      best = arr.length
      top = arr
    }
  }
  const lats = top.map((p) => p.lat)
  const lngs = top.map((p) => p.lng)
  const minLat = Math.min(...lats), maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)
  const marginLat = Math.max((maxLat - minLat) * 0.7, 1.2)
  const marginLng = Math.max((maxLng - minLng) * 0.7, 2.0)
  return [
    { lat: minLat - marginLat, lng: minLng - marginLng },
    { lat: maxLat + marginLat, lng: maxLng + marginLng },
  ]
}
