import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import MapWrapper from '@/components/MapWrapper'

export type CountryGroup = {
  country: string
  flag: string
  lat: number
  lng: number
  count: number
  courses: { name: string; rating: number | null }[]
}

export default async function MapPage() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() {},
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const { data: rows } = await supabase
    .from('rounds')
    .select('rating, courses(name, country, flag, latitude, longitude)')
    .eq('user_id', user!.id)

  // Group by country
  const grouped = new Map<string, CountryGroup>()

  for (const row of rows ?? []) {
    const course = row.courses as unknown as {
      name: string
      country: string
      flag: string
      latitude: number | null
      longitude: number | null
    } | null

    if (!course || course.latitude == null || course.longitude == null) continue

    const key = course.country
    if (!grouped.has(key)) {
      grouped.set(key, {
        country: course.country,
        flag: course.flag ?? '',
        lat: course.latitude,
        lng: course.longitude,
        count: 0,
        courses: [],
      })
    }
    const entry = grouped.get(key)!
    entry.count += 1
    entry.courses.push({ name: course.name, rating: row.rating })
  }

  const countries: CountryGroup[] = Array.from(grouped.values())
  const totalRounds = (rows ?? []).length
  const totalCountries = countries.length

  return (
    <div style={{ minHeight: '100vh', background: '#f2f4f0', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>

      {/* Top bar */}
      <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>⛳</span>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>My Golf Passport</span>
          </Link>
        </div>
        <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
          ← Tilbage
        </Link>
      </div>

      <div style={{ padding: '16px 14px 32px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>
          🗺️ Mit kort
        </div>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
          Alle baner du har spillet
        </div>

        <MapWrapper
          countries={countries}
          totalRounds={totalRounds}
          totalCountries={totalCountries}
        />

        {/* Country list below map */}
        {countries.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
              Lande besøgt
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {countries
                .sort((a, b) => b.count - a.count)
                .map((c) => (
                  <div key={c.country} style={{
                    background: '#fff', borderRadius: 12, padding: '12px 14px',
                    border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 22 }}>{c.flag}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{c.country}</span>
                    </div>
                    <span style={{
                      background: '#e8f5ee', color: '#1a5c38',
                      fontSize: 12, fontWeight: 700, borderRadius: 8,
                      padding: '4px 10px',
                    }}>
                      {c.count} {c.count === 1 ? 'bane' : 'baner'}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {countries.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', marginTop: 16 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🗺️</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>
              Ingen baner logget endnu
            </div>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
              Log din første bane for at se den på kortet.
            </div>
            <Link href="/log" style={{
              background: '#1a5c38', color: '#fff', borderRadius: 12,
              padding: '12px 24px', fontSize: 14, fontWeight: 700,
              display: 'inline-block', textDecoration: 'none',
            }}>
              Log bane →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
