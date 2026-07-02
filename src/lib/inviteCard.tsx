import { ImageResponse } from 'next/og'
import { createClient } from '@supabase/supabase-js'
import { fitBounds, project, mapboxStaticUrl, primaryRegionCorners, type LngLat } from '@/lib/mapshot'

/**
 * Shared renderer for the invite card image — a real Mapbox map of the
 * inviter's played courses with our own dots composited on top, under a green
 * headline band.
 *
 * Used at two sizes: 1200×630 for the social OG unfurl (opengraph-image.tsx)
 * and a taller crop for the landing-page hero (i/[code]/hero/route.ts).
 *
 * Cache is short for now while we tune dot size / framing; bump it back up
 * (to ~a day) once the look is locked. Time-bounded caching is Mapbox-ToS OK.
 */

interface CardData {
  name: string
  courses: number
  countries: number
  badges: number
  coords: (LngLat & { country?: string | null })[]
}

const CACHE = 'public, max-age=600, s-maxage=600'

export async function buildInviteImage(
  code: string,
  W: number,
  H: number
): Promise<ImageResponse> {
  let card: CardData | null = null
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data } = await supabase.rpc('referral_card_data', { p_code: code })
    if (data) card = data as CardData
  } catch {
    card = null
  }

  const token = process.env.MAPBOX_TOKEN
  const coords: LngLat[] = (card?.coords ?? []).filter(
    (c) => typeof c?.lat === 'number' && typeof c?.lng === 'number'
  )
  const pad = Math.round(Math.min(W, H) * 0.06)
  const frame = primaryRegionCorners(coords)
  const { center, zoom } = fitBounds(frame.length ? frame : coords, W, H, pad)
  const mapUrl =
    token && coords.length > 0
      ? mapboxStaticUrl({ center, zoom, width: W, height: H, token, style: 'light-v11' })
      : null

  const dots = coords
    .map((c) => project(c, center, zoom, W, H))
    .filter((p) => p.x >= -20 && p.x <= W + 20 && p.y >= -20 && p.y <= H + 20)
    .slice(0, 600)

  const name = card?.name ?? 'A golfer'
  const courses = card?.courses ?? 0
  const countries = card?.countries ?? 0

  const eyebrow = Math.round(W * 0.017)
  const headline = Math.round(W * 0.052)
  const sub = Math.round(W * 0.025)
  const padX = Math.round(W * 0.045)

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: 'flex',
          position: 'relative',
          background: '#e9e3d1',
          fontFamily: 'sans-serif',
        }}
      >
        {mapUrl && (
          <img
            src={mapUrl}
            width={W}
            height={H}
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        )}

        {dots.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.x - 6,
              top: p.y - 6,
              width: 12,
              height: 12,
              borderRadius: 12,
              background: '#c9a84c',
              border: '2px solid #1f3a2e',
            }}
          />
        ))}

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: `${Math.round(padX * 0.8)}px ${padX}px`,
            background: 'rgba(20,36,28,0.82)',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: eyebrow,
              letterSpacing: 6,
              color: '#c9a84c',
              marginBottom: Math.round(eyebrow * 0.7),
            }}
          >
            MY GOLF PASSPORT
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: headline,
              fontWeight: 700,
              color: '#f4ecd8',
              lineHeight: 1.05,
            }}
          >
            {name} invited you
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: sub,
              color: '#e3d8b8',
              marginTop: Math.round(sub * 0.6),
            }}
          >
            {courses} courses · {countries} countries · join free
          </div>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      headers: { 'cache-control': CACHE },
    }
  )
}
