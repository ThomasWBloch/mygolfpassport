import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { computeInitials } from '@/lib/initials'
import { getLevelTitle } from '@/lib/levels'

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
  if (!user) redirect('/login')

  // ── Parallel data fetch ──────────────────────────────────────────────────
  const [profileResult, roundCountResult, countriesResult, userBadgesResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, handicap, home_club, total_xp, level')
      .eq('id', user!.id)
      .single(),

    supabase
      .from('rounds')
      .select('course_id')
      .eq('user_id', user!.id),

    supabase
      .from('rounds')
      .select('courses(country)')
      .eq('user_id', user!.id),

    // Earned badges with badge details, ordered by tier weight then earned_at desc
    supabase
      .from('user_badges')
      .select('earned_at, badges(emoji, name, tier)')
      .eq('user_id', user!.id)
      .order('earned_at', { ascending: false }),
  ])

  // ── Derived values ───────────────────────────────────────────────────────
  const profile = profileResult.data

  const fullName: string =
    profile?.full_name ??
    user?.user_metadata?.full_name ??
    user?.email?.split('@')[0] ??
    'Golfer'

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w: string) => w[0].toUpperCase())
    .join('')

  const roundCount = new Set((roundCountResult.data ?? []).map(r => r.course_id)).size

  const countrySet = new Set(
    (countriesResult.data ?? [])
      .map((r) => (r.courses as unknown as { country: string } | null)?.country)
      .filter(Boolean)
  )
  const countryCount = countrySet.size

  // XP & Level
  const totalXP = (profile?.total_xp as number) ?? 0
  const level = (profile?.level as number) ?? 1
  const levelTitle = getLevelTitle(level)
  const xpInLevel = totalXP % 500
  const xpForNext = 500

  // Earned badges — sort by tier (legendary first)
  const tierWeight: Record<string, number> = { legendary: 0, rare: 1, uncommon: 2, common: 3 }
  const earnedBadges = (userBadgesResult.data ?? [])
    .map(ub => {
      const b = ub.badges as unknown as { emoji: string; name: string; tier: string } | null
      return b ? { emoji: b.emoji, name: b.name, tier: b.tier } : null
    })
    .filter((b): b is { emoji: string; name: string; tier: string } => b !== null)
    .sort((a, b) => (tierWeight[a.tier] ?? 9) - (tierWeight[b.tier] ?? 9))

  const badgeCount = earnedBadges.length
  const displayBadges = earnedBadges.slice(0, 5)

  const showCta = roundCount === 0

  return (
    <div style={{ minHeight: '100vh', background: '#f2f4f0', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>
      <style>{`.stat-link:hover{background:rgba(255,255,255,0.15)!important}`}</style>

      {/* Top bar */}
      <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>⛳</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>My Golf Passport</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/messages" style={{ color: '#fff', fontSize: 20, textDecoration: 'none', lineHeight: 1 }}>
            💬
          </Link>
          <Link
            href="/profile"
            style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              border: '2px solid rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 12, fontWeight: 700,
              textDecoration: 'none', letterSpacing: '-0.3px',
            }}
          >
            {computeInitials(profile?.full_name ?? user?.user_metadata?.full_name, user?.email)}
          </Link>
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
                    : 'Your golf passport'}
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
              ↑ Share
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { value: roundCount,   label: 'Courses',   href: '/map' },
              { value: countryCount, label: 'Countries', href: '/map' },
              { value: badgeCount,   label: 'Badges',    href: '/profile' },
            ].map(({ value, label, href }) => (
              <Link key={label} href={href} className="stat-link" style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 10, padding: '10px 8px', textAlign: 'center',
                textDecoration: 'none', display: 'block',
                transition: 'background 0.15s',
              }}>
                <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{value}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, marginTop: 3, textTransform: 'uppercase' }}>{label}</div>
              </Link>
            ))}
          </div>

          {/* Level progress bar */}
          <div style={{ marginTop: 14 }}>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#c9a84c', fontWeight: 600 }}>Lvl {level} · {levelTitle}</span>
              <span>{xpInLevel} / {xpForNext} XP</span>
            </div>
            <div style={{ height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.round((xpInLevel / xpForNext) * 100)}%`, background: 'linear-gradient(90deg, #c9a84c, #f5d070)', borderRadius: 3, transition: 'width 0.4s ease' }} />
            </div>
          </div>

          {/* Badge emojis footer */}
          {displayBadges.length > 0 && (
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
              {displayBadges.map((b, i) => (
                <span key={i} title={b.name} style={{ fontSize: 20 }}>{b.emoji}</span>
              ))}
              {earnedBadges.length > 5 && (
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginLeft: 4 }}>+{earnedBadges.length - 5}</span>
              )}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.6px', padding: '0 18px', margin: '18px 0 10px' }}>
          Quick actions
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, padding: '0 14px' }}>
          {[
            { icon: '⛳', label: 'Log course',   bg: '#e8f5ee', href: '/log' },
            { icon: '🗺️', label: 'My map',      bg: '#f5e9c8', href: '/map' },
            { icon: '🌍', label: 'Courses',     bg: '#e8f0fe', href: '/courses' },
            { icon: '👥', label: 'Friends',     bg: '#fef3c7', href: '/friends' },
            { icon: '🏆', label: 'Leaderboard', bg: '#f0eafa', href: '/leaderboard' },
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
                Log your first course
              </div>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16, lineHeight: 1.5 }}>
                Start your golf passport by logging the first course you've played.
              </div>
              <Link href="/log" style={{
                background: '#1a5c38', color: '#fff', borderRadius: 14,
                padding: '14px 32px', fontSize: 15, fontWeight: 700,
                display: 'block', textDecoration: 'none', boxSizing: 'border-box',
              }}>
                Log course →
              </Link>
            </div>
          </div>
        )}

        {!showCta && <div style={{ height: 32 }} />}

      </div>
    </div>
  )
}
