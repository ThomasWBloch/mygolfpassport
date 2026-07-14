'use client'

import { useState, useCallback, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { COUNTRY_OPTIONS as COUNTRIES } from '@/lib/countries'
import { normalizeSearch } from '@/lib/search'

interface ClubOption {
  club: string
  country: string | null
  flag: string | null
}

interface Props {
  userId: string
  initialName: string
}

// ── Shared field styles (Adventure tokens) ───────────────────────────────────
const cardLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mgp-stamp)',
  fontSize: 10,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  color: 'var(--color-mgp-ink-3)',
  marginBottom: 6,
  display: 'block',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  border: '1px solid var(--color-mgp-border)',
  borderRadius: 8,
  padding: '11px 13px',
  fontSize: 15,
  color: 'var(--color-mgp-ink)',
  fontFamily: 'inherit',
  outline: 'none',
  background: 'var(--color-mgp-cream-warm)',
}

export default function OnboardingClient({ userId, initialName }: Props) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [fullName, setFullName] = useState(initialName)
  const [handicap, setHandicap] = useState('')
  const [homeCountry, setHomeCountry] = useState('')
  const [homeClub, setHomeClub] = useState('')
  const [clubless, setClubless] = useState(false)
  const [marketingOptIn, setMarketingOptIn] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  // Club search state
  const [clubResults, setClubResults] = useState<ClubOption[]>([])
  const [clubDropdownOpen, setClubDropdownOpen] = useState(false)

  const searchClubs = useCallback(async (q: string) => {
    if (q.trim().length < 2) { setClubResults([]); return }
    const normalized = normalizeSearch(q)
    const { data } = await supabase
      .from('courses')
      .select('club, country, flag')
      .ilike('club_normalized', `%${normalized}%`)
      .not('club', 'is', null)
      .order('club')
      .limit(100)

    const seen = new Set<string>()
    const unique: ClubOption[] = []
    for (const row of data ?? []) {
      const key = (row.club as string).toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      unique.push({ club: row.club as string, country: row.country as string | null, flag: row.flag as string | null })
    }
    const currentHomeCountry = homeCountry.trim() || null
    unique.sort((a, b) => {
      if (currentHomeCountry) {
        const aHome = a.country === currentHomeCountry ? 0 : 1
        const bHome = b.country === currentHomeCountry ? 0 : 1
        if (aHome !== bHome) return aHome - bHome
      }
      const aS = normalizeSearch(a.club).startsWith(normalized) ? 0 : 1
      const bS = normalizeSearch(b.club).startsWith(normalized) ? 0 : 1
      if (aS !== bS) return aS - bS
      return a.club.localeCompare(b.club)
    })
    setClubResults(unique.slice(0, 8))
  }, [supabase, homeCountry])

  useEffect(() => {
    if (!clubDropdownOpen || clubless) return
    const t = setTimeout(() => searchClubs(homeClub), 250)
    return () => clearTimeout(t)
  }, [homeClub, clubDropdownOpen, clubless, searchClubs])

  async function handleSubmit() {
    if (!fullName.trim()) { setError('Please enter your name'); return }

    setSaving(true)
    setError('')

    const hcp = handicap !== '' ? parseFloat(handicap) : null
    const updateData: Record<string, unknown> = {
      full_name: fullName.trim(),
      // Clubless is signalled by a null home_club — leaderboards already
      // render a faded "no club" stamp for these golfers.
      home_club: clubless ? null : (homeClub.trim() || null),
    }
    if (hcp != null && !isNaN(hcp)) updateData.handicap = hcp
    if (homeCountry) updateData.home_country = homeCountry
    // Explicit marketing consent — only written when actively opted in,
    // with the moment of consent recorded (GDPR).
    if (marketingOptIn) {
      updateData.marketing_opt_in = true
      updateData.marketing_opt_in_at = new Date().toISOString()
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId)

    if (updateError) {
      setError(updateError.message)
      setSaving(false)
      return
    }

    // Send welcome message via API (runs server-side with admin privileges)
    try {
      await fetch('/api/welcome', { method: 'POST' })
    } catch {
      // Don't block onboarding if welcome message fails
    }

    setSaving(false)
    setDone(true)
  }

  const firstName = fullName.trim().split(/\s+/)[0] || 'golfer'

  // ── Passport-issued success screen ──────────────────────────────────────────
  if (done) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <PassportTop
          crest="⛳"
          eyebrow="My Golf Passport"
          title={`You're all set, ${firstName}`}
        />
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 16,
          padding: '40px 26px 48px',
        }}>
          {/* Issued stamp */}
          <div style={{
            width: 132, height: 132, borderRadius: '50%',
            border: '2.5px solid var(--color-mgp-stamp-red)',
            color: 'var(--color-mgp-stamp-red)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            transform: 'rotate(-8deg)',
            fontFamily: 'var(--font-mgp-stamp)',
          }}>
            <span style={{ fontSize: 30, lineHeight: 1, letterSpacing: 1 }}>MGP</span>
            <span style={{ fontSize: 8, letterSpacing: 2, marginTop: 6 }}>★ ISSUED 2026 ★</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 24, fontWeight: 600,
            color: 'var(--color-mgp-ink)',
            margin: '6px 0 0',
          }}>
            Your passport is ready
          </h2>
          <p style={{ fontSize: 14.5, color: 'var(--color-mgp-ink-2)', lineHeight: 1.55, margin: 0, maxWidth: 300 }}>
            Now go stamp your first course. Every round you log earns a stamp on your map.
          </p>

          <button
            onClick={() => { window.location.href = '/log' }}
            style={{
              background: 'var(--color-mgp-gold)',
              color: 'var(--color-mgp-cover-dark)',
              border: 'none', borderRadius: 12,
              padding: '15px 24px',
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 13, letterSpacing: 1.5,
              textTransform: 'uppercase', fontWeight: 700,
              cursor: 'pointer', width: '100%', maxWidth: 320,
              marginTop: 8,
            }}
          >
            Log my first round →
          </button>
          <button
            onClick={() => { window.location.href = '/' }}
            style={{
              background: 'none', border: 'none',
              color: 'var(--color-mgp-ink-3)',
              fontSize: 14, cursor: 'pointer',
              fontFamily: 'inherit',
              textDecoration: 'underline', textUnderlineOffset: 2,
              padding: 6,
            }}
          >
            Maybe later — take me home
          </button>
        </div>
      </div>
    )
  }

  // ── Setup form ──────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PassportTop
        crest="⛳"
        eyebrow="Welcome aboard"
        title="Set up your passport"
        sub="A few details so other golfers can find you. Only your name is required."
      />

      <div style={{ padding: '20px 18px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Form card */}
        <div style={{
          background: 'var(--color-mgp-paper)',
          border: '1px solid var(--color-mgp-border)',
          borderRadius: 14,
          padding: '18px 16px',
          display: 'flex', flexDirection: 'column', gap: 16,
          boxShadow: '0 2px 6px rgba(31,58,46,0.07)',
        }}>

          {/* Name */}
          <div>
            <label style={cardLabelStyle}>Full name *</label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Your name"
              style={inputStyle}
            />
          </div>

          {/* Home club (hidden when clubless) */}
          {!clubless && (
            <div>
              <label style={cardLabelStyle}>Home club</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={homeClub}
                  onChange={e => { setHomeClub(e.target.value); setClubDropdownOpen(true) }}
                  onFocus={() => { if (homeClub.trim().length >= 2) setClubDropdownOpen(true) }}
                  onBlur={() => setTimeout(() => setClubDropdownOpen(false), 150)}
                  placeholder="Search club…"
                  style={inputStyle}
                  autoComplete="off"
                />
                {clubDropdownOpen && clubResults.length > 0 && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200,
                    background: 'var(--color-mgp-paper)',
                    border: '1px solid var(--color-mgp-border)',
                    borderRadius: 8,
                    boxShadow: '0 4px 16px rgba(31,58,46,0.10)',
                    marginTop: 4,
                    maxHeight: 220, overflowY: 'auto',
                  }}>
                    {clubResults.map((c, i) => (
                      <button
                        key={c.club}
                        onMouseDown={() => { setHomeClub(c.club); setClubDropdownOpen(false) }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          width: '100%', textAlign: 'left',
                          padding: '10px 13px', fontSize: 14,
                          color: 'var(--color-mgp-ink)',
                          background: 'none', border: 'none', cursor: 'pointer',
                          borderBottom: i < clubResults.length - 1 ? '1px solid var(--color-mgp-border-faint)' : 'none',
                          fontFamily: 'inherit',
                        }}
                      >
                        {c.flag && <span style={{ fontSize: 16 }}>{c.flag}</span>}
                        <span style={{ flex: 1 }}>{c.club}</span>
                        {c.country && <span style={{ fontSize: 13, color: 'var(--color-mgp-ink-3)' }}>{c.country}</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Clubless toggle */}
          <button
            type="button"
            onClick={() => { setClubless(v => !v); setClubDropdownOpen(false) }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: clubless ? 'var(--color-mgp-gold-faint)' : 'var(--color-mgp-cream-warm)',
              border: clubless ? '1px solid var(--color-mgp-gold)' : '1px dashed var(--color-mgp-border-strong)',
              borderRadius: 10, padding: '11px 13px',
              fontSize: 13.5, color: clubless ? 'var(--color-mgp-ink)' : 'var(--color-mgp-ink-2)',
              fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left', width: '100%',
            }}
          >
            <span style={{
              width: 18, height: 18, borderRadius: 5, flex: '0 0 auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13,
              border: clubless ? '1.5px solid var(--color-mgp-gold)' : '1.5px solid var(--color-mgp-border-strong)',
              background: clubless ? 'var(--color-mgp-gold)' : 'var(--color-mgp-paper)',
              color: '#fff',
            }}>
              {clubless ? '✓' : ''}
            </span>
            {clubless ? 'Playing without a home club' : "I don't have a home club yet"}
          </button>

          {/* Home country */}
          <div>
            <label style={cardLabelStyle}>Home country</label>
            <select
              value={homeCountry}
              onChange={e => setHomeCountry(e.target.value)}
              style={{
                ...inputStyle,
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%238a7d5f\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                paddingRight: 32,
              }}
            >
              <option value="">Select country…</option>
              {COUNTRIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Handicap */}
          <div>
            <label style={cardLabelStyle}>Handicap</label>
            <input
              type="number"
              value={handicap}
              onChange={e => setHandicap(e.target.value)}
              placeholder="e.g. 18.4"
              min={-10}
              max={54}
              step={0.1}
              style={inputStyle}
            />
          </div>

          {/* Marketing opt-in — unchecked by default (GDPR active consent) */}
          <button
            type="button"
            onClick={() => setMarketingOptIn(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              width: '100%', textAlign: 'left',
              background: 'var(--color-mgp-cream-warm)',
              border: '1px dashed var(--color-mgp-border-strong)',
              borderRadius: 10, padding: '12px 14px',
              fontSize: 13.5, color: 'var(--color-mgp-ink-2)',
              cursor: 'pointer', marginTop: 4,
            }}
          >
            <span style={{
              width: 20, height: 20, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 5,
              border: marketingOptIn ? '1.5px solid var(--color-mgp-gold)' : '1.5px solid var(--color-mgp-border-strong)',
              background: marketingOptIn ? 'var(--color-mgp-gold)' : 'var(--color-mgp-paper)',
              color: 'var(--color-mgp-cover-dark)', fontSize: 13,
            }}>{marketingOptIn ? '✓' : ''}</span>
            Yes, send me news and offers from My Golf Passport.
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ fontSize: 14, color: 'var(--color-mgp-danger)', background: 'var(--color-mgp-cream-warm)', borderRadius: 10, padding: '10px 14px' }}>
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={saving || !fullName.trim()}
          style={{
            background: 'var(--color-mgp-gold)',
            color: 'var(--color-mgp-cover-dark)',
            border: 'none', borderRadius: 12,
            padding: '15px 24px',
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 13, letterSpacing: 1.5,
            textTransform: 'uppercase', fontWeight: 700,
            cursor: saving ? 'not-allowed' : 'pointer',
            width: '100%',
            opacity: saving || !fullName.trim() ? 0.6 : 1,
          }}
        >
          {saving ? 'Saving…' : 'Issue my passport →'}
        </button>

        {/* Skip */}
        <button
          onClick={() => { window.location.href = '/' }}
          style={{
            background: 'none', border: 'none',
            color: 'var(--color-mgp-ink-3)',
            fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
            padding: 8, textAlign: 'center',
          }}
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}

// ── Passport-green header used by both states ─────────────────────────────────
function PassportTop({ crest, eyebrow, title, sub }: { crest: string; eyebrow: string; title: string; sub?: string }) {
  return (
    <div style={{
      background: 'linear-gradient(150deg, var(--color-mgp-cover) 0%, var(--color-mgp-cover-dark) 100%)',
      padding: '28px 22px 22px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: -30, top: -30,
        width: 130, height: 130, borderRadius: '50%',
        background: 'rgba(201,168,76,0.07)',
      }} />
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        border: '1.5px solid var(--color-mgp-gold)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 21, marginBottom: 12,
      }}>
        {crest}
      </div>
      <div style={{
        fontFamily: 'var(--font-mgp-stamp)',
        fontSize: 9, letterSpacing: 3,
        color: 'var(--color-mgp-gold-light)',
        textTransform: 'uppercase', opacity: 0.85,
      }}>
        {eyebrow}
      </div>
      <h1 style={{
        fontFamily: 'var(--font-mgp-display)',
        fontSize: 25, fontWeight: 600,
        color: 'var(--color-mgp-ink-inv)',
        margin: '6px 0 0', lineHeight: 1.15,
      }}>
        {title}
      </h1>
      {sub && (
        <p style={{ fontSize: 13.5, color: 'rgba(244,236,216,0.72)', margin: '8px 0 0', lineHeight: 1.5 }}>
          {sub}
        </p>
      )}
    </div>
  )
}
