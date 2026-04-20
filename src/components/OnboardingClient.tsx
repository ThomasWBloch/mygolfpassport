'use client'

import { useState, useCallback, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
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

const COUNTRIES = [
  { value: 'Denmark',     label: '🇩🇰 Denmark' },
  { value: 'Sweden',      label: '🇸🇪 Sweden' },
  { value: 'Scotland',    label: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland' },
  { value: 'Ireland',     label: '🇮🇪 Ireland' },
  { value: 'Wales',       label: '🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales' },
  { value: 'England',     label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England' },
  { value: 'France',      label: '🇫🇷 France' },
  { value: 'Germany',     label: '🇩🇪 Germany' },
  { value: 'Netherlands', label: '🇳🇱 Netherlands' },
  { value: 'Norway',      label: '🇳🇴 Norway' },
  { value: 'Finland',     label: '🇫🇮 Finland' },
]

export default function OnboardingClient({ userId, initialName }: Props) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [fullName, setFullName] = useState(initialName)
  const [handicap, setHandicap] = useState('')
  const [homeCountry, setHomeCountry] = useState('')
  const [homeClub, setHomeClub] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

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
    if (!clubDropdownOpen) return
    const t = setTimeout(() => searchClubs(homeClub), 250)
    return () => clearTimeout(t)
  }, [homeClub, clubDropdownOpen, searchClubs])

  async function handleSubmit() {
    if (!fullName.trim()) { setError('Please enter your name'); return }

    setSaving(true)
    setError('')

    const hcp = handicap !== '' ? parseFloat(handicap) : null
    const updateData: Record<string, unknown> = {
      full_name: fullName.trim(),
    }
    if (hcp != null && !isNaN(hcp)) updateData.handicap = hcp
    if (homeCountry) updateData.home_country = homeCountry
    if (homeClub.trim()) updateData.home_club = homeClub.trim()

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

    // Hard redirect to ensure proxy middleware runs a clean request
    window.location.href = '/'
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    border: '1px solid #e5e7eb', borderRadius: 10,
    padding: '12px 14px', fontSize: 15, color: '#1a1a1a',
    fontFamily: 'inherit', outline: 'none', background: '#fafafa',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Name */}
      <div>
        <label style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6, display: 'block' }}>
          Full name *
        </label>
        <input
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          placeholder="Your name"
          style={inputStyle}
          autoFocus
        />
      </div>

      {/* Handicap */}
      <div>
        <label style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6, display: 'block' }}>
          Handicap
        </label>
        <input
          type="number"
          value={handicap}
          onChange={e => setHandicap(e.target.value)}
          placeholder="e.g. 18.4"
          min={0}
          max={54}
          step={0.1}
          style={inputStyle}
        />
      </div>

      {/* Home country */}
      <div>
        <label style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6, display: 'block' }}>
          Home country
        </label>
        <select
          value={homeCountry}
          onChange={e => setHomeCountry(e.target.value)}
          style={{
            ...inputStyle,
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%236b7280\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            paddingRight: 32,
          }}
        >
          <option value="">Select country...</option>
          {COUNTRIES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Home club */}
      <div>
        <label style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6, display: 'block' }}>
          Home club
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={homeClub}
            onChange={e => { setHomeClub(e.target.value); setClubDropdownOpen(true) }}
            onFocus={() => { if (homeClub.trim().length >= 2) setClubDropdownOpen(true) }}
            onBlur={() => setTimeout(() => setClubDropdownOpen(false), 150)}
            placeholder="Search club..."
            style={inputStyle}
            autoComplete="off"
          />
          {clubDropdownOpen && clubResults.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200,
              background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10,
              boxShadow: '0 4px 16px rgba(0,0,0,0.10)', marginTop: 4,
              maxHeight: 220, overflowY: 'auto',
            }}>
              {clubResults.map((c, i) => (
                <button
                  key={c.club}
                  onMouseDown={() => { setHomeClub(c.club); setClubDropdownOpen(false) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    width: '100%', textAlign: 'left',
                    padding: '11px 14px', fontSize: 14, color: '#1a1a1a',
                    background: 'none', border: 'none', cursor: 'pointer',
                    borderBottom: i < clubResults.length - 1 ? '1px solid #f3f4f6' : 'none',
                    fontFamily: 'inherit',
                  }}
                >
                  {c.flag && <span style={{ fontSize: 16 }}>{c.flag}</span>}
                  <span style={{ flex: 1 }}>{c.club}</span>
                  {c.country && <span style={{ fontSize: 11, color: '#9ca3af' }}>{c.country}</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ fontSize: 13, color: '#dc2626', background: '#fef2f2', borderRadius: 10, padding: '10px 14px' }}>
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={saving || !fullName.trim()}
        style={{
          background: '#1a5c38', color: '#fff', border: 'none',
          borderRadius: 14, padding: '15px 24px',
          fontSize: 16, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit', width: '100%',
          opacity: saving || !fullName.trim() ? 0.6 : 1,
          marginTop: 4,
        }}
      >
        {saving ? 'Saving...' : 'Get started →'}
      </button>

      {/* Skip */}
      <button
        onClick={() => { window.location.href = '/' }}
        style={{
          background: 'none', border: 'none', color: '#9ca3af',
          fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
          padding: 8, textAlign: 'center',
        }}
      >
        Skip for now
      </button>
    </div>
  )
}
