import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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

  const [courseResult, ratingsResult, userRoundResult] = await Promise.all([
    supabase
      .from('courses')
      .select('id, name, club, country, flag, is_major, holes, par, website, founded_year')
      .eq('id', id)
      .single(),

    supabase
      .from('rounds')
      .select('rating')
      .eq('course_id', id)
      .not('rating', 'is', null),

    supabase
      .from('rounds')
      .select('rating, note, played_at, created_at')
      .eq('user_id', user!.id)
      .eq('course_id', id)
      .order('created_at', { ascending: false })
      .limit(1),
  ])

  if (!courseResult.data) notFound()

  const course = courseResult.data
  const ratings = (ratingsResult.data ?? []).map(r => r.rating as number)
  const avgRating = ratings.length > 0
    ? Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length)
    : null

  const userRound = (userRoundResult.data ?? [])[0] ?? null

  const font = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }

  function formatDate(iso: string | null): string {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f2f4f0', ...font }}>

      {/* Top bar */}
      <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>⛳</span>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>My Golf Passport</span>
          </Link>
        </div>
        <Link href="/map" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
          ← Tilbage til kortet
        </Link>
      </div>

      <div style={{ padding: '16px 14px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Hero card */}
        <div style={{
          background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d24 100%)',
          borderRadius: 14, padding: 20, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -30, top: -30,
            width: 130, height: 130, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>
                {course.name}
              </div>
              {course.club && (
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 }}>
                  {course.club}
                </div>
              )}
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 }}>
                {course.country} {course.flag ?? ''}
              </div>

              {course.is_major && (
                <div style={{ marginTop: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8, background: '#c9a84c', color: '#7a5a00' }}>
                    Major
                  </span>
                </div>
              )}
            </div>
            <span style={{ fontSize: 44, flexShrink: 0 }}>{course.flag ?? '🌍'}</span>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { label: 'Huller', value: course.holes ?? '–' },
            { label: 'Par', value: course.par ?? '–' },
            { label: 'Gns. rating', value: avgRating != null ? '★'.repeat(avgRating) : '–' },
          ].map(({ label, value }) => (
            <div key={label} style={{
              background: '#fff', borderRadius: 12, padding: '12px 8px',
              textAlign: 'center', border: '1px solid #e5e7eb',
            }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1a5c38', lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 10, color: '#6b7280', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Extra info */}
        {(course.founded_year || course.website) && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {course.founded_year && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: '#6b7280' }}>Grundlagt</span>
                <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{course.founded_year}</span>
              </div>
            )}
            {course.website && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, alignItems: 'center' }}>
                <span style={{ color: '#6b7280' }}>Website</span>
                <a
                  href={course.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1a5c38', fontWeight: 600, textDecoration: 'none' }}
                >
                  Besøg →
                </a>
              </div>
            )}
          </div>
        )}

        {/* Community ratings summary */}
        {ratings.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
              Anmeldelser
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 28, color: '#c9a84c', fontWeight: 700, lineHeight: 1 }}>
                {avgRating != null ? avgRating.toFixed(1) : '–'}
              </span>
              <div>
                <div style={{ fontSize: 16, color: '#c9a84c' }}>
                  {avgRating != null ? '★'.repeat(avgRating) + '☆'.repeat(5 - avgRating) : ''}
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                  baseret på {ratings.length} {ratings.length === 1 ? 'runde' : 'runder'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Already-logged banner */}
        {userRound && (
          <div style={{
            background: '#e8f5ee', border: '1px solid #a7d5b8',
            borderRadius: 14, padding: '16px 18px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>✓</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#1a5c38' }}>Du har spillet denne bane</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {(userRound.played_at || userRound.created_at) && (
                <div style={{ fontSize: 13, color: '#2a7a4f' }}>
                  📅 {formatDate(userRound.played_at ?? userRound.created_at)}
                </div>
              )}
              {userRound.rating != null && userRound.rating > 0 && (
                <div style={{ fontSize: 13, color: '#2a7a4f' }}>
                  {'★'.repeat(userRound.rating)}{'☆'.repeat(5 - userRound.rating)}
                  <span style={{ color: '#6b7280', marginLeft: 6 }}>din rating</span>
                </div>
              )}
              {userRound.note && (
                <div style={{ fontSize: 13, color: '#374151', fontStyle: 'italic', marginTop: 2 }}>
                  "{userRound.note}"
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA button */}
        <Link
          href={`/log?course=${id}`}
          style={{
            background: '#1a5c38', color: '#fff', borderRadius: 14,
            padding: 16, fontSize: 16, fontWeight: 700,
            display: 'block', textAlign: 'center', textDecoration: 'none',
            marginTop: 4,
          }}
        >
          {userRound ? '⛳ Log igen / opdater anmeldelse' : '⛳ Log denne bane'}
        </Link>
      </div>
    </div>
  )
}
