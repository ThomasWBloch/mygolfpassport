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
  H: number,
  variant: 'invite' | 'share' = 'invite'
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

  const eyebrow = Math.round(W * 0.017)
  const headline = Math.round(W * 0.052)
  const sub = Math.round(W * 0.025)
  const padX = Math.round(W * 0.045)
  const dotSize = Math.max(8, Math.round(W * 0.0085)) // ~9px @1080, ~10px @1200
  const dotR = dotSize / 2

  // 'share' stacks the header band above the map as its own non-overlapping
  // region instead of laying it over the map as a transparent overlay (which
  // is how 'invite' still works, unchanged below). bandHeight is 0 for
  // 'invite', so mapHeight collapses to H and every fitBounds/mapboxStaticUrl/
  // project call below behaves exactly as it always has for that variant.
  //
  // Sized from the actual eyebrow/headline/sub content (all scaled off W, not
  // H) rather than a flat fraction of H — the 1200×630 OG size is wide and
  // short, so a plain H-based fraction undersizes the block and the text
  // overflows into the map below it.
  const bandHeight =
    variant === 'share'
      ? Math.round(padX * 0.8) * 2 +
        eyebrow +
        Math.round(eyebrow * 0.7) +
        Math.round(headline * 1.05) +
        Math.round(sub * 0.6) +
        sub
      : 0
  const mapHeight = H - bandHeight

  const pad = Math.round(Math.min(W, H) * 0.06)
  const frame = variant === 'share' ? [] : primaryRegionCorners(coords)
  const { center, zoom } = fitBounds(frame.length ? frame : coords, W, mapHeight, pad)
  const mapUrl =
    token && coords.length > 0
      ? mapboxStaticUrl({ center, zoom, width: W, height: mapHeight, token, style: 'light-v11' })
      : null

  const dots = coords
    .map((c) => project(c, center, zoom, W, mapHeight))
    .filter((p) => p.x >= -20 && p.x <= W + 20 && p.y >= -20 && p.y <= mapHeight + 20)
    .slice(0, 600)

  const name = card?.name ?? 'A golfer'
  const courses = card?.courses ?? 0
  const countries = card?.countries ?? 0
  const badges = card?.badges ?? 0

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
        <div
          style={{
            position: 'absolute',
            top: bandHeight,
            left: 0,
            width: W,
            height: mapHeight,
            display: 'flex',
          }}
        >
          {mapUrl && (
            <img
              src={mapUrl}
              width={W}
              height={mapHeight}
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          )}

          {variant === 'share' && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: W,
                height: mapHeight,
                display: 'flex',
                background: 'rgba(244,236,216,0.18)',
              }}
            />
          )}

          {dots.map((p, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: p.x - dotR,
                top: p.y - dotR,
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize,
                background: '#c9a84c',
                border: '2px solid #1f3a2e',
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: `${Math.round(padX * 0.8)}px ${padX}px`,
            background: variant === 'share' ? '#14241c' : 'rgba(20,36,28,0.82)',
            ...(variant === 'share' ? { height: bandHeight } : {}),
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
            {variant === 'share' ? `${name}'s golf passport` : `${name} invited you`}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: sub,
              color: '#e3d8b8',
              marginTop: Math.round(sub * 0.6),
            }}
          >
            {variant === 'share'
              ? `${courses} courses · ${countries} countries · ${badges} badges`
              : `${courses} courses · ${countries} countries · join free`}
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
