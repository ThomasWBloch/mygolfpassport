'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import ProfileButton from '@/components/ProfileButton'
import { awardCourseXP, checkAndAwardBadges } from '@/lib/badges'

// ── Types ──────────────────────────────────────────────────────────────────
type DbCourse = {
  id: string
  name: string
  club: string | null
  country: string
  flag: string | null
  is_major: boolean
}

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
const CONFETTI_COLORS = ['#1a5c38', '#c9a84c', '#2a7a4f', '#f5d070', '#4ade80', '#fbbf24', '#e8f5ee', '#0f3d24']

function flagForCountry(country: string): string {
  const map: Record<string, string> = {
    'Danmark': '🇩🇰', 'Sverige': '🇸🇪', 'Norge': '🇳🇴', 'Finland': '🇫🇮',
    'Skotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Irland': '🇮🇪', 'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    'Frankrig': '🇫🇷', 'Spanien': '🇪🇸', 'Portugal': '🇵🇹', 'Italien': '🇮🇹',
    'Tyskland': '🇩🇪', 'USA': '🇺🇸', 'Australien': '🇦🇺', 'Japan': '🇯🇵',
  }
  return map[country] ?? '🌍'
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
const font = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }

function TopBar({ onBack, title, backHref, backLabel = '← Tilbage', initials }: {
  onBack?: () => void
  title: string
  backHref?: string
  backLabel?: string
  initials: string
}) {
  return (
    <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
      {onBack ? (
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', padding: 0, whiteSpace: 'nowrap' }}>
          {backLabel}
        </button>
      ) : (
        <Link href={backHref ?? '/'} style={{ color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
          {backLabel}
        </Link>
      )}
      <div style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 17, fontWeight: 700 }}>{title}</div>
      <div style={{ width: 60, display: 'flex', justifyContent: 'flex-end' }}>
        <ProfileButton initials={initials} />
      </div>
    </div>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: 14 }}>
      {children}
    </div>
  )
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: 12 }}>
      {children}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function LogForm({ prefilledCourse, initials }: { prefilledCourse: PrefilledCourse | null; initials: string }) {
  const router = useRouter()

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
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<DbCourse[]>([])
  const [searching, setSearching] = useState(false)

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
  const [newBadges, setNewBadges] = useState<AwardedBadge[]>([])
  const [badgeModalIndex, setBadgeModalIndex] = useState(0)
  const [showBadgeModal, setShowBadgeModal] = useState(false)

  // ── Search ────────────────────────────────────────────────────────────────
  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return }
    setSearching(true)
    const { data, error } = await supabase
      .from('courses')
      .select('id, name, club, country, flag, is_major')
      .or(`name.ilike.%${q}%,club.ilike.%${q}%,country.ilike.%${q}%`)
      .order('name')
      .limit(20)
    if (error) console.error('[search]', error)
    setResults((data as DbCourse[]) ?? [])
    setSearching(false)
  }, [supabase])

  useEffect(() => {
    const t = setTimeout(() => search(query), 300)
    return () => clearTimeout(t)
  }, [query, search])

  // ── Handlers ─────────────────────────────────────────────────────────────
  function pickCourse(course: DbCourse) {
    setSelected({
      id: course.id,
      name: course.name,
      club: course.club,
      country: course.country,
      flag: course.flag ?? flagForCountry(course.country),
      is_major: course.is_major,
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
    // Check if this is a new country for the user
    const { data: prevCountryRounds } = await supabase
      .from('rounds')
      .select('course_id, courses(country)')
      .eq('user_id', user.id)
      .neq('course_id', selected.id)

    const prevCountries = new Set(
      (prevCountryRounds ?? [])
        .map(r => (r.courses as unknown as { country: string } | null)?.country)
        .filter(Boolean)
    )
    const newCountry = !!selected.country && !prevCountries.has(selected.country)

    await awardCourseXP(user.id, newCountry, supabase)
    const badges = await checkAndAwardBadges(user.id, supabase)

    setIsFirstRound(count === 0)
    setIsNewCountry(newCountry)
    setNewBadges(badges)
    setConfetti(generateConfetti())
    setStep('success')
    setSaving(false)

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
    <div style={{ minHeight: '100vh', background: '#f2f4f0', display: 'flex', flexDirection: 'column', ...font }}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cr { animation: fadeSlideIn 0.12s ease both; }
        .cr:active { background: #e8f5ee !important; }
      `}</style>

      <TopBar title="Log a course" backHref="/" backLabel="← Back" initials={initials} />

      <div style={{ padding: '14px 14px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1.5px solid #1a5c38', borderRadius: 12, padding: '10px 14px' }}>
          <span style={{ fontSize: 18, color: '#1a5c38' }}>🔍</span>
          <input
            type="text"
            placeholder="Search course or club..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, color: '#1a1a1a', background: 'transparent' }}
          />
          {query.length > 0 && (
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: 20, lineHeight: 1 }}>×</button>
          )}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {query.length < 2 && (
          <div style={{ padding: '40px 24px', textAlign: 'center', color: '#6b7280' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⛳</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>Find your course</div>
            <div style={{ fontSize: 13, lineHeight: 1.5 }}>Type at least 2 characters to search our golf course database.</div>
          </div>
        )}

        {searching && (
          <div style={{ padding: 20, textAlign: 'center', color: '#6b7280', fontSize: 14 }}>Searching...</div>
        )}

        {!searching && query.length >= 2 && (
          <div style={{ padding: '0 14px 32px', display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
            {results.map((course, i) => (
              <button
                key={course.id}
                className="cr"
                onClick={() => pickCourse(course)}
                style={{
                  animationDelay: `${i * 0.03}s`,
                  background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12,
                  padding: '12px 14px', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left', width: '100%',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
                    <span>{course.name}</span>
                    {course.is_major && (
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 5, background: '#f5e9c8', color: '#7a5a00', border: '1px solid #c9a84c', flexShrink: 0 }}>Major</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                    {course.club ? `${course.club} · ` : ''}{course.country}
                  </div>
                </div>
                <span style={{ fontSize: 22, flexShrink: 0, marginLeft: 10 }}>
                  {course.flag ?? flagForCountry(course.country)}
                </span>
              </button>
            ))}

            {results.length === 0 && (
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '20px 18px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>🏌️</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>
                  Course not found yet
                </div>
                <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
                  Write to{' '}
                  <a href="mailto:thomas@mygolfpassport.golf" style={{ color: '#1a5c38', fontWeight: 600, textDecoration: 'none' }}>
                    thomas@mygolfpassport.golf
                  </a>
                  {' '}and we'll add it as soon as possible.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )

  // ── DETAIL step ───────────────────────────────────────────────────────────
  if (step === 'detail' && selected) return (
    <div style={{ minHeight: '100vh', background: '#f2f4f0', display: 'flex', flexDirection: 'column', ...font }}>
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

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Course card */}
        <div style={{ background: 'linear-gradient(135deg, #1a5c38, #0f3d24)', borderRadius: 14, padding: 18 }}>
          <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{selected.name}</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 }}>
            {selected.club ? `Part of ${selected.club} · ` : ''}{selected.country} {selected.flag}
          </div>
          {selected.is_major && (
            <div style={{ marginTop: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8, background: '#c9a84c', color: '#7a5a00' }}>Major</span>
            </div>
          )}
        </div>

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
                  color: v <= rating ? '#c9a84c' : '#e5e7eb',
                  transition: 'color 0.1s, transform 0.1s',
                  transform: v <= rating ? 'scale(1.12)' : 'scale(1)',
                }}
              >
                ★
              </button>
            ))}
          </div>
          {rating > 0 && (
            <div style={{ marginTop: 10, fontSize: 13, color: '#c9a84c', fontWeight: 600 }}>
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
            style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 10, padding: '10px 12px', fontSize: 14, color: '#1a1a1a', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
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
            style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 10, padding: '10px 12px', fontSize: 14, color: '#1a1a1a', resize: 'none', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
          />
        </Card>

        {saveError && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: '#dc2626', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace' }}>
            {saveError}
          </div>
        )}

        <button
          onClick={saveRound}
          disabled={saving}
          style={{
            background: '#1a5c38',
            color: '#fff', border: 'none', borderRadius: 14, padding: 16,
            fontSize: 16, fontWeight: 700,
            cursor: saving ? 'not-allowed' : 'pointer',
            width: '100%', transition: 'background 0.2s',
          }}
        >
          {saving ? 'Saving...' : '⛳ Add to my passport →'}
        </button>
      </div>
    </div>
  )

  // ── Badge modal helpers ──────────────────────────────────────────────────
  const TIER_COLORS: Record<string, { color: string; bg: string; border: string; glow: string }> = {
    common:    { color: '#6b7280', bg: '#f3f4f6', border: '#d1d5db', glow: 'none' },
    uncommon:  { color: '#1a5c38', bg: '#e8f5ee', border: '#a7d5b8', glow: 'none' },
    rare:      { color: '#1d4ed8', bg: '#dbeafe', border: '#93c5fd', glow: '0 0 30px rgba(59,130,246,0.4)' },
    legendary: { color: '#92400e', bg: '#f5e9c8', border: '#c9a84c', glow: '0 0 40px rgba(201,168,76,0.6)' },
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
    <div style={{ minHeight: '100vh', background: '#f2f4f0', display: 'flex', flexDirection: 'column', ...font, position: 'relative', overflow: 'hidden' }}>
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

      {/* XP toasts — top right */}
      <div style={{ position: 'fixed', top: 60, right: 14, zIndex: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="xp-toast" style={{
          background: '#1a5c38', color: '#fff', borderRadius: 10,
          padding: '8px 14px', fontSize: 14, fontWeight: 700,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }}>
          +100 XP ⛳
        </div>
        {isNewCountry && (
          <div className="xp-country" style={{
            background: 'linear-gradient(135deg, #c9a84c, #f5d070)', color: '#7a5a00', borderRadius: 10,
            padding: '8px 14px', fontSize: 14, fontWeight: 700,
            boxShadow: '0 4px 16px rgba(201,168,76,0.3)',
          }}>
            +500 XP 🌍 New country!
          </div>
        )}
      </div>

      {/* Top bar */}
      <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span style={{ fontSize: 22 }}>⛳</span>
        <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>My Golf Passport</span>
      </div>

      {/* Main content */}
      <div className="suc" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', gap: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 72 }}>🎉</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: '#1a5c38' }}>Course logged!</div>
        <div style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.5 }}>
          <strong style={{ color: '#1a1a1a' }}>{selected?.name}</strong> is now part of your golf passport.
        </div>

        {isNewCountry && (
          <div style={{ background: 'linear-gradient(135deg, #f5e9c8, #fef3c7)', border: '1px solid #c9a84c', borderRadius: 14, padding: '14px 20px', width: '100%', maxWidth: 320 }}>
            <div style={{ fontSize: 28 }}>🌍</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#7a5a00', marginTop: 4 }}>New country unlocked!</div>
            <div style={{ fontSize: 13, color: '#92400e', marginTop: 2 }}>{selected?.country} {selected?.flag}</div>
          </div>
        )}

        <div style={{ background: '#e8f5ee', border: '1px solid #c8e6d4', borderRadius: 14, padding: '14px 20px', width: '100%', maxWidth: 320 }}>
          <div style={{ fontSize: 28 }}>📍</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1a5c38', marginTop: 4 }}>
            {isFirstRound ? 'Your journey begins!' : 'Well done!'}
          </div>
          <div style={{ fontSize: 13, color: '#2a7a4f', marginTop: 2 }}>Keep collecting courses for your passport</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 320, marginTop: 8 }}>
          <Link
            href={prefilledCourse ? '/log' : '/log'}
            onClick={prefilledCourse ? undefined : (e) => { e.preventDefault(); setStep('search'); setQuery(''); setResults([]); setSelected(null); setNewBadges([]); setIsNewCountry(false) }}
            style={{ background: '#1a5c38', color: '#fff', borderRadius: 14, padding: 14, fontSize: 15, fontWeight: 700, textDecoration: 'none', textAlign: 'center', display: 'block' }}
          >
            ⛳ Log another course
          </Link>
          {prefilledCourse && (
            <Link
              href={`/courses/${prefilledCourse.id}`}
              style={{ background: '#fff', color: '#1a5c38', border: '1px solid #a7d5b8', borderRadius: 14, padding: 14, fontSize: 15, fontWeight: 600, textDecoration: 'none', textAlign: 'center', display: 'block' }}
            >
              ← Back to course
            </Link>
          )}
          <Link href="/" style={{ background: '#e8f5ee', color: '#1a5c38', borderRadius: 14, padding: 14, fontSize: 15, fontWeight: 600, display: 'block', textDecoration: 'none', textAlign: 'center' }}>
            Back to home
          </Link>
        </div>
      </div>

      {/* Badge celebration modal */}
      {showBadgeModal && currentBadge && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }}>
          <div className="badge-modal" style={{
            background: '#fff', borderRadius: 20, padding: '36px 28px 28px',
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
            <div style={{ fontSize: 20, fontWeight: 800, color: '#1a1a1a' }}>
              New badge unlocked!
            </div>

            {/* Badge name + description */}
            <div style={{ fontSize: 17, fontWeight: 700, color: tierStyle.color }}>
              {currentBadge.name}
            </div>
            {currentBadge.description && (
              <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.4 }}>
                {currentBadge.description}
              </div>
            )}

            {/* Tier label */}
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.8px',
              color: tierStyle.color, background: tierStyle.bg,
              border: `1px solid ${tierStyle.border}`,
              borderRadius: 8, padding: '4px 12px',
            }}>
              {currentBadge.tier}
            </div>

            {/* XP reward */}
            <div style={{ fontSize: 15, fontWeight: 700, color: '#c9a84c' }}>
              +{currentBadge.xp_reward} XP
            </div>

            {/* Multi-badge indicator */}
            {newBadges.length > 1 && (
              <div style={{ fontSize: 12, color: '#9ca3af' }}>
                Badge {badgeModalIndex + 1} of {newBadges.length}
              </div>
            )}

            {/* Dismiss button */}
            <button
              onClick={dismissBadgeModal}
              style={{
                background: '#1a5c38', color: '#fff', border: 'none',
                borderRadius: 12, padding: '12px 40px',
                fontSize: 15, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', marginTop: 4,
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
