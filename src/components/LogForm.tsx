'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import ProfileButton from '@/components/ProfileButton'
import PassportStamp from '@/components/PassportStamp'
import { checkAndAwardBadges } from '@/lib/badges'
import CourseBrowser from '@/components/CourseBrowser'
import type { CourseRow, CountryOption } from '@/components/CourseBrowser'
import { COUNTRY_FLAGS } from '@/lib/countries'
import { isGenericCourseName } from '@/lib/course-display'

// ── Types ──────────────────────────────────────────────────────────────────
export type PrefilledCourse = {
  id: string
  name: string
  club: string | null
  country: string
  flag: string | null
  is_major: boolean
}

type SelectedCourse = {
  id: string
  name: string
  club: string | null
  country: string
  flag: string
  is_major: boolean
}

type AwardedBadge = {
  key: string
  name: string
  emoji: string
  description: string
  tier: string
  xp_reward: number
}

type Step = 'search' | 'detail' | 'success'

type ConfettiPiece = {
  id: number
  x: number
  color: string
  delay: number
  duration: number
  size: number
  round: boolean
}

// ── Constants ──────────────────────────────────────────────────────────────
const STAR_LABELS = ['', 'Not impressed 😕', 'Okay 🙂', 'Good 👍', 'Very good 🌟', 'Fantastic! 🏆']
// Confetti colors mirror the Adventure palette (cover greens + gold accents)
const CONFETTI_COLORS = ['#1f3a2e', '#c9a84c', '#2d4d40', '#dfc274', '#5a7a4a', '#efe2b5', '#a84a2c', '#0f2519']

function flagForCountry(country: string): string {
  return COUNTRY_FLAGS[country] ?? '🌍'
}

// "1st", "2nd", "3rd", "4th"… handles English suffixes including the
// 11th/12th/13th edge cases. Used by the re-log copy on success.
function ordinalSuffix(n: number): string {
  const v = n % 100
  if (v >= 11 && v <= 13) return `${n}th`
  switch (n % 10) {
    case 1: return `${n}st`
    case 2: return `${n}nd`
    case 3: return `${n}rd`
    default: return `${n}th`
  }
}

function generateConfetti(): ConfettiPiece[] {
  return Array.from({ length: 70 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 2.5,
    duration: 2.5 + Math.random() * 2,
    size: 6 + Math.random() * 8,
    round: Math.random() > 0.5,
  }))
}

// ── Shared UI ──────────────────────────────────────────────────────────────
const font = { fontFamily: 'var(--font-mgp-body)' }

function TopBar({ onBack, title, backHref, backLabel = '← Tilbage', initials }: {
  onBack?: () => void
  title: string
  backHref?: string
  backLabel?: string
  initials: string
}) {
  const navStyle: React.CSSProperties = {
    background: 'none', border: 'none', padding: 0,
    color: 'var(--color-mgp-gold)', fontSize: 14, fontWeight: 500,
    cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap',
    fontFamily: 'var(--font-mgp-body)',
  }
  return (
    <div style={{
      background: 'var(--color-mgp-cover)',
      padding: '14px 16px',
      display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
    }}>
      {onBack ? (
        <button onClick={onBack} style={navStyle}>{backLabel}</button>
      ) : (
        <Link href={backHref ?? '/'} style={navStyle}>{backLabel}</Link>
      )}
      <div style={{
        flex: 1, textAlign: 'center',
        fontFamily: 'var(--font-mgp-display)',
        color: 'var(--color-mgp-ink-inv)',
        fontSize: 18, fontWeight: 500, letterSpacing: 0.5,
      }}>{title}</div>
      <div style={{ width: 60, display: 'flex', justifyContent: 'flex-end' }}>
        <ProfileButton initials={initials} />
      </div>
    </div>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--color-mgp-paper)',
      borderRadius: 8,
      border: '0.5px solid var(--color-mgp-border)',
      padding: 16,
    }}>
      {children}
    </div>
  )
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mgp-stamp)',
      fontSize: 10, fontWeight: 700,
      color: 'var(--color-mgp-ink-3)',
      textTransform: 'uppercase' as const,
      letterSpacing: '2px',
      marginBottom: 12,
    }}>
      {children}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function LogForm({ prefilledCourse, initials, countries = [], hiddenIds = [], userHomeCountry = null, courseCount = 0, playedIds = [] }: { prefilledCourse: PrefilledCourse | null; initials: string; countries?: CountryOption[]; hiddenIds?: string[]; userHomeCountry?: string | null; courseCount?: number; playedIds?: string[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  // Reset trigger from BottomNav FAB when user is already on /log — see
  // BottomNav.tsx for the why. Whenever this changes we reset to the search
  // step so the user can log a new course.
  const resetT = searchParams.get('t')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const toSelected = (c: PrefilledCourse): SelectedCourse => ({
    id: c.id,
    name: c.name,
    club: c.club,
    country: c.country,
    flag: c.flag ?? flagForCountry(c.country),
    is_major: c.is_major,
  })

  const today = new Date().toISOString().split('T')[0]

  const [step, setStep] = useState<Step>(prefilledCourse ? 'detail' : 'search')

  const [selected, setSelected] = useState<SelectedCourse | null>(
    prefilledCourse ? toSelected(prefilledCourse) : null
  )
  const [rating, setRating] = useState(0)
  const [note, setNote] = useState('')
  const [playedAt, setPlayedAt] = useState(today)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const [isFirstRound, setIsFirstRound] = useState(false)
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [isNewCountry, setIsNewCountry] = useState(false)
  // Total rounds the user has at the just-stamped course (includes this
  // new round). 1 means first time; > 1 means a re-log — success copy
  // adapts so the user knows the system noticed it's a repeat.
  const [roundCount, setRoundCount] = useState(1)
  const [newBadges, setNewBadges] = useState<AwardedBadge[]>([])
  const [badgeModalIndex, setBadgeModalIndex] = useState(0)
  const [nearbyCourses, setNearbyCourses] = useState<{ id: string; name: string; club: string | null; flag: string | null; distanceKm: number }[]>([])
  const [showBadgeModal, setShowBadgeModal] = useState(false)

  // ── FAB-triggered reset ──────────────────────────────────────────────────
  // BottomNav's + button appends a fresh ?t=<ms> when the user is already on
  // /log. We track the last value of that param across renders; whenever it
  // changes we rewind the form to the search step so the user isn't stuck
  // on a previous success screen. Done at render time (not in useEffect) per
  // React's "Storing information from previous renders" pattern, which is the
  // sanctioned way around the set-state-in-effect lint rule.
  // Skip when this LogForm was opened with a prefilledCourse — that flow is
  // its own /courses/[id]?course=X journey and shouldn't be auto-reset.
  const [lastResetT, setLastResetT] = useState<string | null>(resetT)
  if (resetT !== lastResetT) {
    setLastResetT(resetT)
    if (resetT && !prefilledCourse) {
      setStep('search')
      setSelected(null)
      setRating(0)
      setNote('')
      setPlayedAt(new Date().toISOString().split('T')[0])
      setSaveError('')
      setNewBadges([])
      setIsNewCountry(false)
      setNearbyCourses([])
      setIsFirstRound(false)
      setShowBadgeModal(false)
      setBadgeModalIndex(0)
      setConfetti([])
      setRoundCount(1)
    }
  }

  // ── Handlers ─────────────────────────────────────────────────────────────
  function pickCourse(course: CourseRow) {
    setSelected({
      id: course.id,
      name: course.name,
      club: course.club,
      country: course.country ?? '',
      flag: course.flag ?? flagForCountry(course.country ?? ''),
      is_major: false,
    })
    setRating(0)
    setNote('')
    setPlayedAt(today)
    setSaveError('')
    setStep('detail')
  }

  async function saveRound() {
    if (!selected) return
    setSaving(true)
    setSaveError('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setSaveError('Not signed in. Please reload the page.')
      setSaving(false)
      return
    }

    // Ensure profile row exists before inserting round (guards against FK 23503)
    await supabase
      .from('profiles')
      .upsert({ id: user.id }, { onConflict: 'id', ignoreDuplicates: true })

    const { count } = await supabase
      .from('rounds')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    const { error } = await supabase.from('rounds').insert({
      user_id: user.id,
      course_id: selected.id,
      rating: rating || null,
      note: note.trim() || null,
      played_at: playedAt || null,
    })

    if (error) {
      console.error('[saveRound]', error)
      setSaveError(`Fejl ${error.code}: ${error.message}${error.details ? '\n' + error.details : ''}`)
      setSaving(false)
      return
    }

    // ── XP & Badges ──────────────────────────────────────────────────────
    // Check if this is a new country for the user. Also count how many
    // rounds the user has at this specific course (including the one we
    // just inserted) so the success screen can switch copy when re-logging.
    const [{ data: prevCountryRounds }, { count: courseRoundCount }] = await Promise.all([
      supabase
        .from('rounds')
        .select('course_id, courses(country)')
        .eq('user_id', user.id)
        .neq('course_id', selected.id),
      supabase
        .from('rounds')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('course_id', selected.id),
    ])

    const prevCountries = new Set(
      (prevCountryRounds ?? [])
        .map(r => (r.courses as unknown as { country: string } | null)?.country)
        .filter(Boolean)
    )
    const newCountry = !!selected.country && !prevCountries.has(selected.country)

    const badges = await checkAndAwardBadges(user.id, supabase)

    setIsFirstRound(count === 0)
    setIsNewCountry(newCountry)
    setRoundCount(courseRoundCount ?? 1)
    setNewBadges(badges)
    setConfetti(generateConfetti())
    setStep('success')
    setSaving(false)

    // Fetch nearby unplayed courses
    fetch(`/api/courses/nearby?course_id=${selected.id}`)
      .then(r => r.json())
      .then(data => setNearbyCourses(data.courses ?? []))
      .catch(() => {})

    // Show badge modal after a short delay for the confetti to start
    if (badges.length > 0) {
      setTimeout(() => {
        setBadgeModalIndex(0)
        setShowBadgeModal(true)
      }, 800)
    }
  }

  // ── SEARCH step ───────────────────────────────────────────────────────────
  if (step === 'search') return (
    <div style={{ minHeight: '100vh', background: 'var(--color-mgp-cream)', display: 'flex', flexDirection: 'column', ...font }}>
      <TopBar title="Log a course" backHref="/" backLabel="← Back" initials={initials} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px 32px' }}>
        <CourseBrowser
          countries={countries}
          playedIds={playedIds}
          hiddenIds={hiddenIds}
          mode="log"
          onSelectCourse={pickCourse}
          userHomeCountry={userHomeCountry}
          courseCount={courseCount}
        />
      </div>
    </div>
  )

  // ── DETAIL step ───────────────────────────────────────────────────────────
  if (step === 'detail' && selected) return (
    <div style={{ minHeight: '100vh', background: 'var(--color-mgp-cream)', display: 'flex', flexDirection: 'column', ...font }}>
      {prefilledCourse ? (
        <TopBar
          backHref={`/courses/${prefilledCourse.id}`}
          backLabel="← Back to course"
          title="Log course"
          initials={initials}
        />
      ) : (
        <TopBar onBack={() => setStep('search')} title="Log course" backLabel="← Search again" initials={initials} />
      )}

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Course card — passport cover panel.
             When the course name is a generic placeholder ("18-hole course"),
             promote the club name to the headline and skip the redundant
             "Part of <Club>" subtitle. */}
        {(() => {
          const courseGeneric = isGenericCourseName(selected.name)
          const headline = courseGeneric && selected.club ? selected.club : selected.name
          const subtitleParts = []
          if (!courseGeneric && selected.club) subtitleParts.push(`Part of ${selected.club}`)
          subtitleParts.push(`${selected.country} ${selected.flag}`)
          return (
            <div style={{
              background: 'linear-gradient(135deg, var(--color-mgp-cover-light), var(--color-mgp-cover-dark))',
              borderRadius: 8,
              border: '0.5px solid var(--color-mgp-cover-ink)',
              padding: 20,
            }}>
              <div style={{
                fontFamily: 'var(--font-mgp-display)',
                color: 'var(--color-mgp-ink-inv)',
                fontSize: 22, fontWeight: 500,
                letterSpacing: -0.3, lineHeight: 1.2,
              }}>{headline}</div>
              <div style={{
                color: 'var(--color-mgp-ink-inv)',
                opacity: 0.75,
                fontSize: 13, marginTop: 6,
              }}>
                {subtitleParts.join(' · ')}
              </div>
              {selected.is_major && (
                <div style={{ marginTop: 12 }}>
                  <span style={{
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    padding: '4px 10px', borderRadius: 4,
                    background: 'var(--color-mgp-gold)',
                    color: 'var(--color-mgp-cover-ink)',
                  }}>Major</span>
                </div>
              )}
            </div>
          )
        })()}

        {/* Star rating */}
        <Card>
          <CardLabel>Your rating (optional)</CardLabel>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 2, 3, 4, 5].map(v => (
              <button
                key={v}
                onClick={() => setRating(rating === v ? 0 : v)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  fontSize: 38, lineHeight: 1,
                  color: v <= rating ? 'var(--color-mgp-gold)' : 'var(--color-mgp-border-faint)',
                  transition: 'color 0.1s, transform 0.1s',
                  transform: v <= rating ? 'scale(1.12)' : 'scale(1)',
                }}
              >
                ★
              </button>
            ))}
          </div>
          {rating > 0 && (
            <div style={{
              marginTop: 10, fontSize: 13, fontWeight: 600,
              color: 'var(--color-mgp-gold-dark)',
            }}>
              {STAR_LABELS[rating]}
            </div>
          )}
        </Card>

        {/* Date */}
        <Card>
          <CardLabel>Date played</CardLabel>
          <input
            type="date"
            value={playedAt}
            onChange={e => setPlayedAt(e.target.value)}
            style={{
              width: '100%',
              border: '0.5px solid var(--color-mgp-border)',
              borderRadius: 6, padding: '10px 12px',
              fontSize: 14, color: 'var(--color-mgp-ink)',
              background: 'var(--color-mgp-cream-warm)',
              outline: 'none', fontFamily: 'var(--font-mgp-body)',
              boxSizing: 'border-box',
            }}
          />
        </Card>

        {/* Note */}
        <Card>
          <CardLabel>Your note (optional)</CardLabel>
          <textarea
            placeholder="What did you think? Tips for others? 🏌️"
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              border: '0.5px solid var(--color-mgp-border)',
              borderRadius: 6, padding: '10px 12px',
              fontSize: 14, color: 'var(--color-mgp-ink)',
              background: 'var(--color-mgp-cream-warm)',
              resize: 'none', fontFamily: 'var(--font-mgp-body)',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </Card>

        {saveError && (
          <div style={{
            background: 'var(--color-mgp-cream-warm)',
            border: '1px solid var(--color-mgp-stamp-red)',
            borderRadius: 6, padding: '10px 14px',
            fontSize: 12, color: 'var(--color-mgp-stamp-red)',
            whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            fontFamily: 'var(--font-mgp-stamp)',
          }}>
            {saveError}
          </div>
        )}

        <button
          onClick={saveRound}
          disabled={saving}
          style={{
            background: 'var(--color-mgp-cover)',
            color: 'var(--color-mgp-ink-inv)',
            border: 'none', borderRadius: 8, padding: 16,
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 13, fontWeight: 700,
            letterSpacing: 2, textTransform: 'uppercase',
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.6 : 1,
            width: '100%', transition: 'background 0.2s',
          }}
        >
          {saving ? 'Saving…' : '⛳ Add to my passport →'}
        </button>
      </div>
    </div>
  )

  // ── Badge modal helpers ──────────────────────────────────────────────────
  // Tier colours map roughly to the Adventure stamp palette; only "rare" and
  // "legendary" keep their characteristic glow.
  const TIER_COLORS: Record<string, { color: string; bg: string; border: string; glow: string }> = {
    common:    { color: 'var(--color-mgp-ink-2)',     bg: 'var(--color-mgp-cream-cool)', border: 'var(--color-mgp-border)',         glow: 'none' },
    uncommon:  { color: 'var(--color-mgp-cover)',     bg: 'var(--color-mgp-cream-warm)', border: 'var(--color-mgp-cover-light)',    glow: 'none' },
    rare:      { color: 'var(--color-mgp-stamp-blue)', bg: 'var(--color-mgp-cream-warm)', border: 'var(--color-mgp-stamp-blue)',     glow: '0 0 30px rgba(58,82,102,0.45)' },
    legendary: { color: 'var(--color-mgp-gold-dark)', bg: 'var(--color-mgp-gold-faint)', border: 'var(--color-mgp-gold)',           glow: '0 0 40px rgba(201,168,76,0.6)' },
  }

  function dismissBadgeModal() {
    if (badgeModalIndex < newBadges.length - 1) {
      setBadgeModalIndex(i => i + 1)
    } else {
      setShowBadgeModal(false)
    }
  }

  const currentBadge = newBadges[badgeModalIndex] ?? null
  const tierStyle = currentBadge ? (TIER_COLORS[currentBadge.tier] ?? TIER_COLORS.common) : TIER_COLORS.common
  const isEpic = currentBadge?.tier === 'rare' || currentBadge?.tier === 'legendary'

  // ── SUCCESS step (only reached from generic search flow) ──────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-mgp-cream)', display: 'flex', flexDirection: 'column', ...font, position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(110vh) rotate(540deg); opacity: 0; }
        }
        @keyframes popIn {
          0%   { transform: scale(0.7); opacity: 0; }
          70%  { transform: scale(1.06); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes xpSlideIn {
          0%   { transform: translateX(100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes xpFade {
          0%, 80% { opacity: 1; }
          100%    { opacity: 0; }
        }
        @keyframes badgeGlow {
          0%, 100% { filter: drop-shadow(0 0 12px rgba(201,168,76,0.3)); }
          50%      { filter: drop-shadow(0 0 28px rgba(201,168,76,0.7)); }
        }
        @keyframes badgeGlowEpic {
          0%, 100% { filter: drop-shadow(0 0 16px rgba(201,168,76,0.4)); transform: scale(1); }
          50%      { filter: drop-shadow(0 0 40px rgba(201,168,76,0.9)); transform: scale(1.08); }
        }
        @keyframes modalIn {
          0%   { transform: scale(0.8) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .suc { animation: popIn 0.4s cubic-bezier(.34,1.56,.64,1) both; }
        .xp-toast { animation: xpSlideIn 0.4s ease both, xpFade 4s ease both; }
        .xp-country { animation: xpSlideIn 0.4s 0.3s ease both, xpFade 5s 0.3s ease both; }
        .badge-emoji { animation: badgeGlow 2s ease-in-out infinite; }
        .badge-emoji-epic { animation: badgeGlowEpic 1.5s ease-in-out infinite; }
        .badge-modal { animation: modalIn 0.4s cubic-bezier(.34,1.56,.64,1) both; }
      `}</style>

      {/* Confetti */}
      {confetti.map(p => (
        <div key={p.id} style={{
          position: 'fixed', left: `${p.x}%`, top: -10,
          width: p.size, height: p.size,
          background: p.color,
          borderRadius: p.round ? '50%' : '2px',
          animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
          zIndex: 10, pointerEvents: 'none',
        }} />
      ))}

      {/* Stamp toasts — top right. Stamp-collection metaphor (no XP). */}
      <div style={{ position: 'fixed', top: 70, right: 14, zIndex: 20, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
        <div className="xp-toast" style={{
          background: 'transparent',
          border: '2px dashed var(--color-mgp-stamp-red)',
          color: 'var(--color-mgp-stamp-red)',
          padding: '5px 11px',
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
          textTransform: 'uppercase',
          transform: 'rotate(-6deg)',
          whiteSpace: 'nowrap',
        }}>
          +1 Stamp ⛳
        </div>
        {isNewCountry && (
          <div className="xp-country" style={{
            background: 'var(--color-mgp-gold-faint)',
            border: '1.5px solid var(--color-mgp-gold)',
            color: 'var(--color-mgp-gold-dark)',
            padding: '5px 11px',
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
            textTransform: 'uppercase',
            transform: 'rotate(4deg)',
            whiteSpace: 'nowrap',
          }}>
            ★ New territory
          </div>
        )}
      </div>

      {/* Top bar — Adventure chrome. Whole "M · My Golf Passport" lockup
          links back to home, matching the home/courses/profile chrome. */}
      <div style={{
        background: 'var(--color-mgp-cover)',
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
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
            color: 'var(--color-mgp-ink-inv)',
            letterSpacing: 0.5,
          }}>My Golf Passport</span>
        </Link>
      </div>

      {/* Main content */}
      <div className="suc" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', gap: 18, textAlign: 'center' }}>

        {/* Hero stamp — same VISITED [year] shape used on CourseHero, scaled
            up and animated with a slam-in. Single source of truth lives in
            src/components/PassportStamp.tsx. */}
        <div style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PassportStamp
            year={new Date(playedAt).getFullYear() || new Date().getFullYear()}
            size={180}
            animate
            ariaLabel={`Stamped ${selected?.name ?? 'course'}`}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          {roundCount > 1 && (
            <div style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 9, letterSpacing: 2,
              color: 'var(--color-mgp-gold-dark)',
              textTransform: 'uppercase',
              marginBottom: 2,
            }}>Round #{roundCount}</div>
          )}
          <div style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 28, fontWeight: 500,
            color: 'var(--color-mgp-cover)',
            letterSpacing: -0.3,
            lineHeight: 1.1,
          }}>{roundCount > 1 ? 'Course re-logged' : 'Course logged'}</div>
          <div style={{
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 10, letterSpacing: 2,
            color: 'var(--color-mgp-ink-3)',
            textTransform: 'uppercase',
          }}>{roundCount > 1
            ? `Your ${ordinalSuffix(roundCount)} round here`
            : 'Entry added to your passport'}</div>
          <div style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 18,
            color: 'var(--color-mgp-ink-2)',
            marginTop: 8,
            lineHeight: 1.3,
          }}>
            {selected?.name}
          </div>
          {selected?.country && (
            <div style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 9, letterSpacing: 1.5,
              color: 'var(--color-mgp-ink-3)',
              textTransform: 'uppercase',
            }}>
              {selected?.flag} {selected?.country}
            </div>
          )}
        </div>

        {isNewCountry && (
          <div style={{
            background: 'var(--color-mgp-paper)',
            border: '0.5px solid var(--color-mgp-border-strong)',
            padding: '14px 16px',
            width: '100%', maxWidth: 320,
            display: 'flex', alignItems: 'center', gap: 14,
            textAlign: 'left',
          }}>
            {/* Wax-seal disc with country flag */}
            <div
              aria-hidden
              style={{
                width: 56, height: 56,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 30%, var(--color-mgp-gold-light) 0%, var(--color-mgp-gold) 55%, var(--color-mgp-gold-dark) 100%)',
                border: '2px solid var(--color-mgp-gold-dark)',
                boxShadow: '0 1px 2px rgba(31,58,46,0.18), inset 0 -1px 2px rgba(31,58,46,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: 'rotate(-6deg)',
                fontSize: 26, lineHeight: 1,
                flexShrink: 0,
              }}
            >
              {selected?.flag ?? '🌍'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 9, letterSpacing: 2,
                color: 'var(--color-mgp-gold-dark)',
                textTransform: 'uppercase',
                marginBottom: 3,
              }}>Passage granted</div>
              <div style={{
                fontFamily: 'var(--font-mgp-display)',
                fontSize: 18,
                color: 'var(--color-mgp-ink)',
                lineHeight: 1.15,
              }}>{selected?.country}</div>
              <div style={{
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 9, letterSpacing: 1.5,
                color: 'var(--color-mgp-ink-3)',
                textTransform: 'uppercase',
                marginTop: 3,
              }}>New country in your atlas</div>
            </div>
          </div>
        )}

        {/* Buttons — anchored above the async nearby section so they don't
            shift down when /api/courses/nearby resolves. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 320, marginTop: 8 }}>
          <Link
            href={prefilledCourse ? '/log' : '/log'}
            onClick={prefilledCourse ? undefined : (e) => { e.preventDefault(); setStep('search'); setSelected(null); setNewBadges([]); setIsNewCountry(false) }}
            style={{
              background: 'var(--color-mgp-cover)',
              color: 'var(--color-mgp-ink-inv)',
              border: '1.5px solid var(--color-mgp-gold)',
              padding: 14,
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 11, fontWeight: 700, letterSpacing: 2,
              textTransform: 'uppercase',
              textDecoration: 'none', textAlign: 'center', display: 'block',
            }}
          >
            Stamp another course →
          </Link>
          {prefilledCourse && (
            <Link
              href={`/courses/${prefilledCourse.id}`}
              style={{
                background: 'var(--color-mgp-paper)',
                color: 'var(--color-mgp-cover)',
                border: '0.5px solid var(--color-mgp-border-strong)',
                padding: 12,
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 10, fontWeight: 700, letterSpacing: 2,
                textTransform: 'uppercase',
                textDecoration: 'none', textAlign: 'center', display: 'block',
              }}
            >
              ← Back to course
            </Link>
          )}
          <Link href="/" style={{
            background: 'var(--color-mgp-cream-warm)',
            color: 'var(--color-mgp-cover)',
            border: '0.5px solid var(--color-mgp-border-strong)',
            padding: 12,
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 10, fontWeight: 700, letterSpacing: 2,
            textTransform: 'uppercase',
            display: 'block', textDecoration: 'none', textAlign: 'center',
          }}>
            Back to passport
          </Link>
        </div>

        {/* Nearby courses — async; placed BELOW the buttons so the late
            fetch resolution doesn't push the primary CTAs around the screen.
            User who wants to log a nearby course can scroll down. */}
        {nearbyCourses.length > 0 && (
          <div style={{ width: '100%', maxWidth: 360, marginTop: 16 }}>
            <div style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 10, fontWeight: 700, letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--color-mgp-ink-3)',
              marginBottom: 10, textAlign: 'left',
            }}>
              ⛳ Nearby courses
            </div>
            <div style={{
              background: 'var(--color-mgp-paper)',
              borderRadius: 8,
              border: '0.5px solid var(--color-mgp-border)',
              overflow: 'hidden',
            }}>
              {nearbyCourses.map((c, i) => (
                <Link
                  key={c.id}
                  href={`/courses/${c.id}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '11px 14px', gap: 10, textDecoration: 'none',
                    borderBottom: i < nearbyCourses.length - 1 ? '0.5px solid var(--color-mgp-border-faint)' : 'none',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 13, fontWeight: 500,
                      color: 'var(--color-mgp-ink)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      textAlign: 'left',
                    }}>
                      {c.flag && <span style={{ marginRight: 5 }}>{c.flag}</span>}
                      {c.club ?? c.name}
                    </div>
                    <div style={{
                      fontSize: 11, color: 'var(--color-mgp-ink-3)',
                      marginTop: 2, overflow: 'hidden',
                      textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      textAlign: 'left',
                    }}>
                      {c.club && c.club !== c.name ? c.name : ''}
                    </div>
                  </div>
                  <div style={{
                    flexShrink: 0,
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontSize: 10, letterSpacing: 1,
                    color: 'var(--color-mgp-ink-2)', fontWeight: 700,
                  }}>
                    {c.distanceKm} km
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Badge celebration modal */}
      {showBadgeModal && currentBadge && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(15,37,25,0.75)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }}>
          <div className="badge-modal" style={{
            background: 'var(--color-mgp-paper)',
            borderRadius: 12, padding: '36px 28px 28px',
            width: '100%', maxWidth: 340,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            textAlign: 'center', gap: 12,
            border: `2px solid ${tierStyle.border}`,
            boxShadow: tierStyle.glow,
          }}>
            {/* Badge emoji */}
            <div className={isEpic ? 'badge-emoji-epic' : 'badge-emoji'} style={{ fontSize: 80, lineHeight: 1 }}>
              {currentBadge.emoji}
            </div>

            {/* Headline */}
            <div style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 22, fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              letterSpacing: -0.3,
            }}>
              New badge unlocked!
            </div>

            {/* Badge name + description */}
            <div style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 18, fontWeight: 500, color: tierStyle.color,
            }}>
              {currentBadge.name}
            </div>
            {currentBadge.description && (
              <div style={{ fontSize: 13, color: 'var(--color-mgp-ink-2)', lineHeight: 1.4 }}>
                {currentBadge.description}
              </div>
            )}

            {/* Tier label */}
            <div style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: 2,
              color: tierStyle.color, background: tierStyle.bg,
              border: `1px solid ${tierStyle.border}`,
              borderRadius: 4, padding: '4px 12px',
            }}>
              {currentBadge.tier}
            </div>

            {/* XP reward */}
            <div style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 13, fontWeight: 700, letterSpacing: 1.5,
              color: 'var(--color-mgp-gold-dark)',
            }}>
              +{currentBadge.xp_reward} XP
            </div>

            {/* Multi-badge indicator */}
            {newBadges.length > 1 && (
              <div style={{ fontSize: 12, color: 'var(--color-mgp-ink-3)' }}>
                Badge {badgeModalIndex + 1} of {newBadges.length}
              </div>
            )}

            {/* Dismiss button */}
            <button
              onClick={dismissBadgeModal}
              style={{
                background: 'var(--color-mgp-cover)',
                color: 'var(--color-mgp-ink-inv)',
                border: 'none', borderRadius: 8,
                padding: '12px 40px',
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 12, fontWeight: 700, letterSpacing: 2,
                textTransform: 'uppercase',
                cursor: 'pointer', marginTop: 4,
              }}
            >
              Nice!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
