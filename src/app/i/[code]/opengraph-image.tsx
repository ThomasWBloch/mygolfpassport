import { ImageResponse } from 'next/og'
import { createClient } from '@supabase/supabase-js'
import { fitBounds, project, mapboxStaticUrl, type LngLat } from '@/lib/mapshot'

export const alt = 'You have been invited to My Golf Passport'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
// Time-bounded cache (Mapbox ToS: temporary performance caching is fine).
export const revalidate = 86400

interface CardData {
  name: string
  courses: number
  countries: number
  badges: number
  coords: LngLat[]
}

export default async function Image({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const W = size.width
  const H = size.height

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
  const { center, zoom } = fitBounds(coords, W, H, 90)
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
            padding: '44px 56px 40px',
            background: 'rgba(20,36,28,0.82)',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: 6,
              color: '#c9a84c',
              marginBottom: 16,
            }}
          >
            MY GOLF PASSPORT
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 62,
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
              fontSize: 30,
              color: '#e3d8b8',
              marginTop: 18,
            }}
          >
            {courses} courses · {countries} countries · join free
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        'cache-control': 'public, max-age=86400, s-maxage=86400',
      },
    }
  )
}
