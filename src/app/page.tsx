import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

// ── Badge definitions ────────────────────────────────────────────────────────
type Badge = { key: string; label: string }

function calcBadges(rounds: number, countries: number): Badge[] {
  const earned: Badge[] = []
  if (rounds >= 1)   earned.push({ key: '1-bane',   label: '1. bane' })
  if (rounds >= 10)  earned.push({ key: '10-baner',  label: '10 baner' })
  if (rounds >= 25)  earned.push({ key: '25-baner',  label: '25 baner' })
  if (countries >= 5) earned.push({ key: '5-lande',  label: '5 lande' })
  return earned
}

// ── Progress tiers (based on rounds) ────────────────────────────────────────
type Tier = { label: string; next: string; min: number; max: number }

function getTier(rounds: number): Tier {
  if (rounds < 10)  return { label: 'Begynder',      next: '10 baner',  min: 0,   max: 10  }
  if (rounds < 25)  return { label: 'Explorer',       next: '25 baner',  min: 10,  max: 25  }
  if (rounds < 50)  return { label: 'Eventyreren',    next: '50 baner',  min: 25,  max: 50  }
  if (rounds < 100) return { label: 'Globetrotteren', next: '100 baner', min: 50,  max: 100 }
  return              { label: 'Legenden',          next: '–',         min: 100, max: 100 }
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function Home() {
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

  // ── Parallel data fetch ──────────────────────────────────────────────────
  const [profileResult, roundCountResult, countriesResult] = await Promise.all([
    // 1. Profile (full_name, handicap, home_club)
    supabase
      .from('profiles')
      .select('full_name, handicap, home_club')
      .eq('id', user!.id)
      .single(),

    // 2. Total rounds played
    supabase
      .from('rounds')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user!.id),

    // 3. Distinct countries via rounds → courses join
    supabase
      .from('rounds')
      .select('courses(country)')
      .eq('user_id', user!.id),
  ])

  // ── Derived values ───────────────────────────────────────────────────────
  const profile = profileResult.data

  const fullName: string =
    profile?.full_name ??
    user?.user_metadata?.full_name ??
    user?.email?.split('@')[0] ??
    'Golfspiller'

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w: string) => w[0].toUpperCase())
    .join('')

  const roundCount = roundCountResult.count ?? 0

  const countrySet = new Set(
    (countriesResult.data ?? [])
      .map((r) => (r.courses as unknown as { country: string } | null)?.country)
      .filter(Boolean)
  )
  const countryCount = countrySet.size

  const badges = calcBadges(roundCount, countryCount)
  const badgeCount = badges.length

  const tier = getTier(roundCount)
  const progress = tier.max === tier.min
    ? 100
    : Math.round(((roundCount - tier.min) / (tier.max - tier.min)) * 100)

  const showCta = roundCount === 0

  return (
    <div style={{ minHeight: '100vh', background: '#f2f4f0', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>

      {/* Top bar */}
      <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>⛳</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>My Golf Passport</span>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </button>
        </div>
      </div>

      <div style={{ overflowY: 'auto' }}>

        {/* Passport card */}
        <div style={{
          background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d24 100%)',
          margin: '12px 14px',
          borderRadius: 14,
          padding: 18,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -30, top: -30,
            width: 140, height: 140, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }} />

          {/* User row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: '#c9a84c',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 16, color: '#fff',
                border: '2px solid rgba(255,255,255,0.3)',
                flexShrink: 0,
              }}>
                {initials}
              </div>
              <div>
                <div style={{ color: '#fff', fontSize: 15, fontWeight: 600 }}>{fullName}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>
                  {profile?.home_club
                    ? `🏠 ${profile.home_club}`
                    : 'Dit golfpas'}
                </div>
                {profile?.handicap != null && (
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2 }}>
                    HCP <span style={{ color: '#c9a84c', fontWeight: 600 }}>{profile.handicap}</span>
                  </div>
                )}
              </div>
            </div>
            <button style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 20, padding: '6px 12px',
              color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              flexShrink: 0,
            }}>
              ↑ Del pas
            </button>
          </div>

          {/* Stats: rounds / countries / badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { value: roundCount,   label: 'Baner' },
              { value: countryCount, label: 'Lande' },
              { value: badgeCount,   label: 'Badges' },
            ].map(({ value, label }) => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 10, padding: '10px 8px', textAlign: 'center',
              }}>
                <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{value}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, marginTop: 3, textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 14 }}>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#c9a84c', fontWeight: 600 }}>{tier.label}</span>
              {tier.next !== '–' && (
                <span>{roundCount}/{tier.max} til {tier.next}</span>
              )}
            </div>
            <div style={{ height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #c9a84c, #f5d070)', borderRadius: 3, transition: 'width 0.4s ease' }} />
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.6px', padding: '0 18px', margin: '18px 0 10px' }}>
          Hurtig handling
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, padding: '0 14px' }}>
          {[
            { icon: '⛳', label: 'Log bane', bg: '#e8f5ee', href: '/log' },
            { icon: '🗺️', label: 'Mit kort',  bg: '#f5e9c8', href: '/map' },
            { icon: '👥', label: 'Venner',    bg: '#e8f0fe', href: '#' },
            { icon: '🏆', label: 'Badges',    bg: '#f0eafa', href: '#' },
          ].map(({ icon, label, bg, href }) => (
            <Link key={label} href={href} style={{
              background: '#fff', borderRadius: 12, padding: '12px 6px 10px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              border: '1px solid #e5e7eb', textDecoration: 'none',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19 }}>
                {icon}
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#6b7280', textAlign: 'center', lineHeight: 1.2 }}>
                {label}
              </div>
            </Link>
          ))}
        </div>

        {/* CTA — only shown before first round */}
        {showCta && (
          <div style={{ margin: '20px 14px 32px' }}>
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>⛳</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>
                Log din første bane
              </div>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16, lineHeight: 1.5 }}>
                Start dit golfpas ved at logge den første bane, du har spillet.
              </div>
              <Link href="/log" style={{
                background: '#1a5c38', color: '#fff', borderRadius: 14,
                padding: '14px 32px', fontSize: 15, fontWeight: 700,
                display: 'block', textDecoration: 'none', boxSizing: 'border-box',
              }}>
                Log bane →
              </Link>
            </div>
          </div>
        )}

        {/* Badges section — shown once at least one badge is earned */}
        {badgeCount > 0 && (
          <div style={{ margin: '20px 14px 32px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
              Dine badges
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {badges.map(b => (
                <div key={b.key} style={{
                  background: '#f5e9c8', border: '1px solid #c9a84c',
                  borderRadius: 12, padding: '10px 14px',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span style={{ fontSize: 18 }}>⭐</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#7a5a00' }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spacer when no CTA and no badges */}
        {!showCta && badgeCount === 0 && <div style={{ height: 32 }} />}

      </div>
    </div>
  )
}
