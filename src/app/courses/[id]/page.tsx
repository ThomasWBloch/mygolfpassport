import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import BackButton from '@/components/BackButton'
import { computeInitials } from '@/lib/initials'
import CourseReviewsAccordion from '@/components/CourseReviewsAccordion'
import type { Review } from '@/components/CourseReviewsAccordion'
import FriendsWhoPlayedAccordion from '@/components/FriendsWhoPlayedAccordion'
import type { FriendRound } from '@/components/FriendsWhoPlayedAccordion'
import GolfersListAccordion from '@/components/GolfersListAccordion'
import type { GolferEntry } from '@/components/GolfersListAccordion'
import CollapsibleCard from '@/components/CollapsibleCard'
import BucketListButton from '@/components/BucketListButton'
import CourseHero from '@/components/CourseHero'

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

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const adminSupabase = serviceKey
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceKey,
        { auth: { autoRefreshToken: false, persistSession: false } }
      )
    : supabase

  const { data: { user } } = await supabase.auth.getUser()

  // ── All independent queries in one batch ──────────────────────────────────
  const [
    courseResult, ratingsResult, userRoundResult, profileResult,
    top100Result, bucketResult,
    affiliationsResult, courseRoundsResult, friendshipsResult,
  ] = await Promise.all([
    supabase
      .from('courses')
      .select('id, name, club, country, flag, is_major, holes, par, website, phone, address, founded_year')
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

    supabase.from('profiles').select('full_name').eq('id', user!.id).single(),

    supabase
      .from('top100_rankings')
      .select('rank, list_name, year')
      .eq('course_id', id)
      .order('year', { ascending: false })
      .limit(1),

    supabase
      .from('bucket_list')
      .select('id')
      .eq('course_id', id)
      .eq('user_id', user!.id)
      .limit(1),

    supabase
      .from('course_affiliations')
      .select('user_id')
      .eq('course_id', id),

    supabase
      .from('rounds')
      .select('user_id, rating, note, played_at')
      .eq('course_id', id)
      .order('played_at', { ascending: false }),

    adminSupabase
      .from('friendships')
      .select('user_id, friend_id')
      .or(`user_id.eq.${user!.id},friend_id.eq.${user!.id}`)
      .eq('status', 'accepted'),
  ])

  if (!courseResult.data) notFound()
  const course = courseResult.data

  // ── Fetch profiles for all social sections in one admin call ─────────────
  const affiliateIds = (affiliationsResult.data ?? []).map(a => a.user_id as string)
  const roundRows    = courseRoundsResult.data ?? []
  const roundUserIds = roundRows.map(r => r.user_id as string)
  const allUserIds   = [...new Set([...affiliateIds, ...roundUserIds])]

  const [profileRowsResult, userAllRoundsResult] = await Promise.all([
    allUserIds.length > 0
      ? adminSupabase.from('profiles').select('id, full_name, handicap').in('id', allUserIds)
      : Promise.resolve({ data: [] }),
    allUserIds.length > 0
      ? adminSupabase.from('rounds').select('user_id, course_id, courses(country, is_major)').in('user_id', allUserIds)
      : Promise.resolve({ data: [] }),
  ])

  const profileRows = profileRowsResult.data
  const profileMap = new Map(
    (profileRows ?? []).map(p => [
      p.id,
      { fullName: (p.full_name as string | null) ?? 'Anonym', handicap: p.handicap as number | null },
    ])
  )

  // Per-user stats
  const userAllRounds = userAllRoundsResult.data ?? []
  const allPlayedCourseIds = [...new Set(userAllRounds.map(r => r.course_id as string))]
  const { data: top100Social } = allPlayedCourseIds.length > 0
    ? await adminSupabase.from('top100_rankings').select('course_id').in('course_id', allPlayedCourseIds)
    : { data: [] }
  const top100SocialSet = new Set((top100Social ?? []).map(r => r.course_id as string))

  function computeUserStats(uid: string) {
    const rounds = userAllRounds.filter(r => r.user_id === uid)
    const cIds = [...new Set(rounds.map(r => r.course_id as string))]
    const courseCount = cIds.length
    const countryCount = new Set(rounds.map(r => (r.courses as unknown as { country: string } | null)?.country).filter(Boolean)).size
    const hasPlayedMajor = rounds.some(r => (r.courses as unknown as { is_major: boolean } | null)?.is_major)
    const hasTop100 = cIds.some(cid => top100SocialSet.has(cid))
    let badgeCount = 0
    if (courseCount >= 1)   badgeCount++
    if (countryCount >= 2)  badgeCount++
    if (courseCount >= 10)  badgeCount++
    if (countryCount >= 5)  badgeCount++
    if (courseCount >= 50)  badgeCount++
    if (courseCount >= 100) badgeCount++
    if (hasPlayedMajor)     badgeCount++
    if (hasTop100)          badgeCount++
    return { courseCount, countryCount, badgeCount }
  }

  // ── Derived values ────────────────────────────────────────────────────────
  const rawRatings  = (ratingsResult.data ?? []).map(r => r.rating as number)
  const avgRatingFloat = rawRatings.length > 0
    ? rawRatings.reduce((a, b) => a + b, 0) / rawRatings.length
    : null
  const avgRatingRounded = avgRatingFloat != null ? Math.round(avgRatingFloat) : null

  const userRound    = (userRoundResult.data ?? [])[0] ?? null
  const top100       = (top100Result.data ?? [])[0] ?? null
  const onBucketList = (bucketResult.data ?? []).length > 0

  const initials = computeInitials(
    profileResult.data?.full_name ?? user?.user_metadata?.full_name,
    user?.email
  )

  const friendIds = new Set(
    (friendshipsResult.data ?? []).map(f =>
      f.user_id === user!.id ? f.friend_id : f.user_id
    )
  )

  // "Kender du et medlem?" — affiliates excluding current user
  const courseMembers: GolferEntry[] = affiliateIds
    .filter(uid => uid !== user!.id)
    .map(uid => {
      const p = profileMap.get(uid) ?? { fullName: 'Anonym', handicap: null }
      return { userId: uid, ...p, ...computeUserStats(uid) }
    })

  // "Venner der har spillet"
  const friendRounds: FriendRound[] = roundRows
    .filter(r => friendIds.has(r.user_id as string))
    .map(r => {
      const uid = r.user_id as string
      return {
        userId:   uid,
        fullName: profileMap.get(uid)?.fullName ?? 'Ven',
        note:     r.note as string | null,
        handicap: profileMap.get(uid)?.handicap ?? null,
        ...computeUserStats(uid),
      }
    })

  // "Andre der har spillet" — everyone except current user
  const reviews: Review[] = roundRows
    .filter(r => (r.user_id as string) !== user!.id)
    .map(r => {
      const uid = r.user_id as string
      return {
        userId:   uid,
        fullName: profileMap.get(uid)?.fullName ?? 'Anonym',
        note:     r.note as string | null,
        handicap: profileMap.get(uid)?.handicap ?? null,
        ...computeUserStats(uid),
      }
    })

  const font = { fontFamily: 'var(--font-mgp-body)' }

  function formatDate(iso: string | null): string {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  function stripProtocol(url: string): string {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  }

  const mapsUrl = course.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(course.address)}`
    : null

  const hasClubInfo = !!(course.address || course.website || course.phone || course.founded_year)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-mgp-cream)', ...font }}>

      {/* Top bar — Adventure tokens */}
      <div style={{
        background: 'var(--color-mgp-cover)',
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 24, height: 24, borderRadius: '50%',
            border: '1.5px solid var(--color-mgp-gold)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-mgp-gold)',
            fontFamily: 'var(--font-mgp-display)', fontSize: 14,
          }}>M</span>
          <span style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 18, fontWeight: 500,
            color: 'var(--color-mgp-ink-inv)', letterSpacing: 0.5,
          }}>My Golf Passport</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <BackButton fallback="/map" label="← Back" />
          <ProfileButton initials={initials} />
        </div>
      </div>

      {/* 1. Hero — illustrative passport-style header */}
      <CourseHero
        courseId={id}
        courseName={course.name}
        club={course.club ?? null}
        country={course.country ?? null}
        flag={course.flag ?? null}
        holes={course.holes ?? null}
        par={course.par ?? null}
        foundedYear={course.founded_year ?? null}
        isMajor={!!course.is_major}
        top100Rank={top100?.rank ?? null}
        top100ListName={top100?.list_name ?? null}
        playedAt={(userRound?.played_at ?? userRound?.created_at) as string | null}
      />

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '16px 14px 48px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* 2. Rating */}
        <div style={{
          background: 'var(--color-mgp-paper)',
          borderRadius: 8,
          border: '0.5px solid var(--color-mgp-border)',
          padding: '16px 18px',
        }}>
          {rawRatings.length > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{
                fontFamily: 'var(--font-mgp-display)',
                fontSize: 40, fontWeight: 500,
                color: 'var(--color-mgp-gold-dark)',
                lineHeight: 1,
              }}>
                {avgRatingFloat!.toFixed(1)}
              </span>
              <div>
                <div style={{ fontSize: 20, color: 'var(--color-mgp-gold)', lineHeight: 1, letterSpacing: 1 }}>
                  {'★'.repeat(avgRatingRounded!)}{'☆'.repeat(5 - avgRatingRounded!)}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mgp-stamp)', fontSize: 10, letterSpacing: 1.5,
                  color: 'var(--color-mgp-ink-3)', marginTop: 4,
                }}>
                  {rawRatings.length} {rawRatings.length === 1 ? 'REVIEW' : 'REVIEWS'}
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              fontFamily: 'var(--font-mgp-stamp)', fontSize: 11, letterSpacing: 1.5,
              color: 'var(--color-mgp-ink-3)',
            }}>NO REVIEWS YET</div>
          )}

          {userRound && (
            <>
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                {userRound.rating != null && userRound.rating > 0 ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      fontFamily: 'var(--font-mgp-stamp)', fontSize: 10, letterSpacing: 1.5,
                      color: 'var(--color-mgp-ink-2)', textTransform: 'uppercase',
                    }}>Your rating</span>
                    <span style={{ fontSize: 14, color: 'var(--color-mgp-gold)', letterSpacing: 1 }}>
                      {'★'.repeat(userRound.rating)}{'☆'.repeat(5 - userRound.rating)}
                    </span>
                  </div>
                ) : (
                  <span style={{
                    fontFamily: 'var(--font-mgp-stamp)', fontSize: 10, letterSpacing: 1.5,
                    color: 'var(--color-mgp-ink-3)',
                  }}>NO RATING YET</span>
                )}
                <Link
                  href={`/log?course=${id}`}
                  style={{
                    fontFamily: 'var(--font-mgp-stamp)', fontSize: 10, letterSpacing: 1.5,
                    color: 'var(--color-mgp-cover)', textDecoration: 'none', flexShrink: 0,
                  }}
                >
                  UPDATE ›
                </Link>
              </div>
              {userRound.note && (
                <div style={{
                  marginTop: 8,
                  fontFamily: 'var(--font-mgp-display)',
                  fontSize: 14, fontStyle: 'italic',
                  color: 'var(--color-mgp-ink-2)', lineHeight: 1.5,
                }}>
                  &ldquo;{userRound.note}&rdquo;
                </div>
              )}
            </>
          )}

          {rawRatings.length > 0 && (
            <div style={{
              marginTop: 12,
              borderTop: '0.5px solid var(--color-mgp-border-faint)',
              paddingTop: 10,
            }}>
              <a
                href="#reviews"
                style={{
                  fontFamily: 'var(--font-mgp-stamp)', fontSize: 10, letterSpacing: 1.5,
                  color: 'var(--color-mgp-cover)', textDecoration: 'none',
                }}
              >
                SEE ALL REVIEWS ›
              </a>
            </div>
          )}
        </div>

        {/* 3. Visit confirmation / bucket-list */}
        {userRound ? (
          <div style={{
            background: 'var(--color-mgp-paper)',
            border: '0.5px solid var(--color-mgp-border)',
            borderLeft: '3px solid var(--color-mgp-success)',
            borderRadius: 4,
            padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 16, flexShrink: 0, color: 'var(--color-mgp-success)' }}>✓</span>
            <div>
              <div style={{
                fontFamily: 'var(--font-mgp-stamp)', fontSize: 11, letterSpacing: 1.5,
                color: 'var(--color-mgp-ink)', textTransform: 'uppercase',
              }}>STAMPED IN YOUR PASSPORT</div>
              {(userRound.played_at || userRound.created_at) && (
                <div style={{
                  fontSize: 12, color: 'var(--color-mgp-ink-2)', marginTop: 2,
                }}>
                  {formatDate(userRound.played_at ?? userRound.created_at)}
                </div>
              )}
            </div>
          </div>
        ) : (
          <BucketListButton courseId={id} alreadyAdded={onBucketList} />
        )}

        {/* 4. Kender du et medlem? */}
        <GolfersListAccordion
          title="Know a member?"
          emoji="🏠"
          golfers={courseMembers}
          accentColor="var(--color-mgp-gold)"
          accentText="var(--color-mgp-cover-ink)"
          borderColor="var(--color-mgp-border)"
        />

        {/* 5. Venner der har spillet */}
        <FriendsWhoPlayedAccordion friends={friendRounds} />

        {/* 6. Andre der har spillet */}
        <div id="reviews"><CourseReviewsAccordion reviews={reviews} /></div>

        {/* 7. Klubinfo — collapsed by default */}
        {hasClubInfo && (
          <CollapsibleCard title="Club info">
            <div>
              {course.address && (
                <ClubInfoRow
                  label="Address"
                  value={course.address}
                  link={mapsUrl ? { href: mapsUrl, label: 'View on Google Maps', external: true } : null}
                />
              )}
              {course.website && (
                <ClubInfoRow
                  label="Website"
                  link={{ href: course.website, label: stripProtocol(course.website), external: true }}
                />
              )}
              {course.phone && (
                <ClubInfoRow
                  label="Phone"
                  link={{ href: `tel:${course.phone}`, label: course.phone, external: false }}
                />
              )}
              {course.founded_year && (
                <ClubInfoRow label="Founded" value={String(course.founded_year)} />
              )}
              {(course.holes || course.par) && (
                <ClubInfoRow
                  label="Holes / Par"
                  value={[course.holes && `${course.holes} holes`, course.par && `Par ${course.par}`].filter(Boolean).join(' · ')}
                  isLast
                />
              )}
            </div>
          </CollapsibleCard>
        )}

      </div>
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function ClubInfoRow({
  label,
  value,
  link,
  isLast,
}: {
  label: string
  value?: string
  link?: { href: string; label: string; external: boolean } | null
  isLast?: boolean
}) {
  const linkProps = link?.external
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {}
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: '13px 16px',
      borderBottom: isLast ? 'none' : '0.5px solid var(--color-mgp-border-faint)',
      gap: 12,
    }}>
      <div style={{
        fontFamily: 'var(--font-mgp-stamp)',
        fontSize: 10,
        letterSpacing: 1.5,
        color: 'var(--color-mgp-ink-3)',
        textTransform: 'uppercase',
        flexShrink: 0,
        paddingTop: 1,
      }}>
        {label}
      </div>
      <div style={{ textAlign: 'right', flex: 1 }}>
        {value && (
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-mgp-ink)' }}>
            {value}
          </div>
        )}
        {link && (
          <a
            href={link.href}
            {...linkProps}
            style={{
              fontFamily: value ? 'var(--font-mgp-stamp)' : 'var(--font-mgp-body)',
              fontSize: value ? 10 : 13,
              fontWeight: value ? 400 : 500,
              letterSpacing: value ? 1.5 : 0,
              color: 'var(--color-mgp-cover)',
              textDecoration: 'none',
              display: 'inline-block',
              marginTop: value ? 3 : 0,
            }}
          >
            {link.label}
            {link.external && (
              <span
                aria-hidden
                style={{
                  marginLeft: 5,
                  fontSize: '0.85em',
                  color: 'var(--color-mgp-ink-3)',
                  letterSpacing: 0,
                }}
              >
                ↗
              </span>
            )}
          </a>
        )}
      </div>
    </div>
  )
}
