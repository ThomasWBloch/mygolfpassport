'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

// ── Types ─────────────────────────────────────────────────────────────────────
export type Badge = {
  key: string
  label: string
  emoji: string
  earned: boolean
  description: string
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

const COUNTRY_FLAGS: Record<string, string> = {
  Denmark: '🇩🇰', Sweden: '🇸🇪', Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', Ireland: '🇮🇪',
  Wales: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', France: '🇫🇷', Germany: '🇩🇪',
  Netherlands: '🇳🇱', Norway: '🇳🇴', Finland: '🇫🇮',
}

type Props = {
  userId: string
  email: string
  initials: string
  fullName: string
  handicap: number | null
  homeClub: string | null
  homeCountry: string | null
  clubFlag: string | null
  avatarUrl: string | null
  allowFriends: boolean
  allowStrangers: boolean
  showInSearch: boolean
  showCourseCount: boolean
  roundCount: number
  countryCount: number
  badges: Badge[]
  totalXP?: number
  level?: number
  levelTitle?: string
}

// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      style={{
        width: 46, height: 26, borderRadius: 13,
        background: checked ? '#1a5c38' : '#d1d5db',
        border: 'none', cursor: 'pointer', padding: 3,
        position: 'relative', transition: 'background 0.2s', flexShrink: 0,
      }}
    >
      <div style={{
        width: 20, height: 20, borderRadius: '50%', background: '#fff',
        position: 'absolute', top: 3,
        left: checked ? 23 : 3,
        transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
      }} />
    </button>
  )
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: '0.6px', marginBottom: 10 }}>
      {children}
    </div>
  )
}

// ── Club search result type ──────────────────────────────────────────────────
interface ClubResult {
  club: string
  country: string | null
  flag: string | null
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ProfileClient(props: Props) {
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Form state
  const [fullName, setFullName] = useState(props.fullName)
  const [handicap, setHandicap] = useState(props.handicap != null ? String(props.handicap) : '')
  const [homeClub, setHomeClub] = useState(props.homeClub ?? '')
  const [homeCountry, setHomeCountry] = useState(props.homeCountry ?? '')
  const [avatarUrl, setAvatarUrl] = useState(props.avatarUrl)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState('')

  // Privacy toggles
  const [allowFriends, setAllowFriends]     = useState(props.allowFriends)
  const [allowStrangers, setAllowStrangers] = useState(props.allowStrangers)
  const [showInSearch, setShowInSearch]     = useState(props.showInSearch)
  const [showCourseCount, setShowCourseCount] = useState(props.showCourseCount)

  // Club search state (on-demand from Supabase)
  const [clubResults, setClubResults] = useState<ClubResult[]>([])
  const [clubDropdownOpen, setClubDropdownOpen] = useState(false)

  const searchClubs = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setClubResults([])
      return
    }
    const trimmed = q.trim()
    const { data } = await supabase
      .from('courses')
      .select('club, country, flag')
      .ilike('club', `%${trimmed}%`)
      .not('club', 'is', null)
      .order('club')
      .limit(100)

    // Deduplicate by club name, sort starts-with first
    const seen = new Set<string>()
    const unique: ClubResult[] = []
    for (const row of data ?? []) {
      const key = (row.club as string).toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      unique.push({ club: row.club as string, country: row.country as string | null, flag: row.flag as string | null })
    }
    const lower = trimmed.toLowerCase()
    unique.sort((a, b) => {
      const aStarts = a.club.toLowerCase().startsWith(lower) ? 0 : 1
      const bStarts = b.club.toLowerCase().startsWith(lower) ? 0 : 1
      if (aStarts !== bStarts) return aStarts - bStarts
      return a.club.localeCompare(b.club)
    })
    setClubResults(unique.slice(0, 8))
  }, [supabase])

  // Debounced club search
  useEffect(() => {
    if (!clubDropdownOpen) return
    const t = setTimeout(() => searchClubs(homeClub), 250)
    return () => clearTimeout(t)
  }, [homeClub, clubDropdownOpen, searchClubs])

  // UI state
  const [showAllBadges, setShowAllBadges]       = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting]                 = useState(false)
  const [deleteError, setDeleteError]           = useState('')

  // Derived
  const displayInitials = fullName.trim()
    ? fullName.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')
    : props.initials
  const earnedCount = props.badges.filter(b => b.earned).length
  const countryFlag = COUNTRY_FLAGS[homeCountry] ?? ''

  // ── Upload avatar ────────────────────────────────────────────────────────────
  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingAvatar(true)
    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `${props.userId}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true, contentType: file.type })
    if (uploadError) {
      setSaveError(uploadError.message)
      setUploadingAvatar(false)
      return
    }
    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(path)
    const publicUrl = urlData.publicUrl + '?t=' + Date.now()
    await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', props.userId)
    setAvatarUrl(publicUrl)
    setUploadingAvatar(false)
  }

  // ── Save profile ────────────────────────────────────────────────────────────
  async function saveProfile() {
    setSaving(true)
    setSaveError('')
    setSaveSuccess(false)
    const hcp = handicap !== '' ? parseFloat(handicap) : null
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName.trim() || null,
        handicap: hcp,
        home_club: homeClub.trim() || null,
        home_country: homeCountry || null,
      })
      .eq('id', props.userId)
    setSaving(false)
    if (error) { setSaveError(error.message); return }
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  // ── Save privacy toggle ─────────────────────────────────────────────────────
  async function saveToggle(field: string, value: boolean) {
    await supabase.from('profiles').update({ [field]: value }).eq('id', props.userId)
  }

  // ── Sign out ────────────────────────────────────────────────────────────────
  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // ── Delete account ──────────────────────────────────────────────────────────
  async function deleteAccount() {
    setDeleting(true)
    setDeleteError('')
    const res = await fetch('/api/delete-account', { method: 'POST' })
    if (res.ok) {
      await supabase.auth.signOut()
      router.push('/login')
    } else {
      const body = await res.json().catch(() => ({ error: 'Unknown error' }))
      setDeleteError(body.error ?? 'Something went wrong. Please try again.')
      setDeleting(false)
    }
  }

  const visibleBadges = showAllBadges ? props.badges : props.badges.slice(0, 4)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Passport card ─────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d24 100%)',
        borderRadius: 14, padding: 18, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -30, top: -30,
          width: 140, height: 140, borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
        }} />

        {/* User row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0 }} />
          ) : (
            <div style={{
              width: 48, height: 48, borderRadius: '50%', background: '#c9a84c',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 17, color: '#fff',
              border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0,
            }}>
              {displayInitials}
            </div>
          )}
          <div>
            <div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>
              {fullName || props.email}
            </div>
            {homeClub && (
              <Link
                href={`/clubs/${encodeURIComponent(homeClub)}`}
                style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2, textDecoration: 'none', display: 'block' }}
              >
                🏠 {homeClub} {props.clubFlag ?? ''}
              </Link>
            )}
            {homeCountry && (
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 }}>
                📍 {homeCountry} {countryFlag}
              </div>
            )}
            {props.handicap != null && (
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2 }}>
                HCP <span style={{ color: '#c9a84c', fontWeight: 600 }}>{props.handicap}</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          {[
            { value: props.roundCount,   label: 'Courses' },
            { value: props.countryCount, label: 'Countries' },
            { value: earnedCount,        label: 'Badges' },
            { value: `Lvl ${props.level ?? 1}`, label: props.levelTitle ?? 'Beginner' },
          ].map(({ value, label }) => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.08)', borderRadius: 10,
              padding: '10px 6px', textAlign: 'center',
            }}>
              <div style={{ color: '#fff', fontSize: 20, fontWeight: 700, lineHeight: 1 }}>{value}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9, marginTop: 3, textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* XP bar */}
        {(props.totalXP ?? 0) > 0 && (
          <div style={{ marginTop: 10 }}>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span>{(props.totalXP ?? 0) % 500} / 500 XP to next level</span>
              <span style={{ color: '#c9a84c' }}>{props.totalXP?.toLocaleString()} XP total</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.round(((props.totalXP ?? 0) % 500) / 5)}%`, background: 'linear-gradient(90deg, #c9a84c, #f5d070)', borderRadius: 2 }} />
            </div>
          </div>
        )}
      </div>

      {/* ── Edit profile ──────────────────────────────────────────────────── */}
      <div>
        <SectionHeader>Edit profile</SectionHeader>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>

          {/* Avatar upload */}
          <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 14 }}>
            <label style={{ cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: 'none' }}
              />
              {avatarUrl ? (
                <img src={avatarUrl} alt="" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e5e7eb' }} />
              ) : (
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', background: '#c9a84c',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 22, color: '#fff',
                  border: '2px solid #e5e7eb',
                }}>
                  {displayInitials}
                </div>
              )}
              <div style={{
                position: 'absolute', bottom: -2, right: -2,
                width: 22, height: 22, borderRadius: '50%',
                background: '#1a5c38', border: '2px solid #fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, color: '#fff',
              }}>
                📷
              </div>
            </label>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                {uploadingAvatar ? 'Uploading…' : 'Profile photo'}
              </div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>
                Tap to change
              </div>
            </div>
          </div>

          {/* Full name */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>
              Full name
            </div>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Your name"
              style={inputStyle}
            />
          </div>

          {/* Home country */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>
              Home country
            </div>
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
              <option value="">Select country…</option>
              {COUNTRIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Home club */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>
              Home club
            </div>
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
                  background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.10)', marginTop: 2,
                  maxHeight: 220, overflowY: 'auto',
                }}>
                  {clubResults.map((c, i) => (
                    <button
                      key={c.club}
                      onMouseDown={() => { setHomeClub(c.club); setClubDropdownOpen(false) }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        width: '100%', textAlign: 'left',
                        padding: '10px 12px', fontSize: 13, color: '#1a1a1a',
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

          {/* Handicap */}
          <div style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>
              Handicap
            </div>
            <input
              type="number"
              value={handicap}
              onChange={e => setHandicap(e.target.value)}
              placeholder="e.g. 12.4"
              min={-10}
              max={54}
              step={0.1}
              style={inputStyle}
            />
          </div>

          <div style={{ padding: '12px 16px', borderTop: '1px solid #f3f4f6' }}>
            {saveError && (
              <div style={{ fontSize: 12, color: '#dc2626', marginBottom: 8 }}>{saveError}</div>
            )}
            {saveSuccess && (
              <div style={{ fontSize: 13, color: '#1a5c38', fontWeight: 600, marginBottom: 8 }}>
                ✓ Saved!
              </div>
            )}
            <button
              onClick={saveProfile}
              disabled={saving}
              style={{
                background: '#1a5c38', color: '#fff', border: 'none',
                borderRadius: 10, padding: '11px 20px',
                fontSize: 14, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer',
                width: '100%', opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Privacy & Social ──────────────────────────────────────────────── */}
      <div>
        <SectionHeader>Privacy & social</SectionHeader>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          {[
            {
              label: 'Allow round requests from friends',
              sub: 'Friends can send you a request to play',
              checked: allowFriends,
              onChange: (v: boolean) => { setAllowFriends(v); saveToggle('allow_round_requests_friends', v) },
            },
            {
              label: 'Allow round requests from everyone',
              sub: 'Any user can send you a request',
              checked: allowStrangers,
              onChange: (v: boolean) => { setAllowStrangers(v); saveToggle('allow_round_requests_strangers', v) },
            },
            {
              label: 'Show me in search results',
              sub: 'Others can find you via search',
              checked: showInSearch,
              onChange: (v: boolean) => { setShowInSearch(v); saveToggle('show_in_search', v) },
            },
            {
              label: 'Show my course count publicly',
              sub: 'Others can see how many courses you\'ve played',
              checked: showCourseCount,
              onChange: (v: boolean) => { setShowCourseCount(v); saveToggle('show_course_count', v) },
            },
          ].map(({ label, sub, checked, onChange }, i, arr) => (
            <div key={label} style={{
              padding: '14px 16px',
              borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{label}</div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{sub}</div>
              </div>
              <Toggle checked={checked} onChange={onChange} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Badges ────────────────────────────────────────────────────────── */}
      <div>
        <SectionHeader>My badges</SectionHeader>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {visibleBadges.map(b => (
            <div key={b.key} style={{
              background: b.earned ? '#f5e9c8' : '#f3f4f6',
              border: `1px solid ${b.earned ? '#c9a84c' : '#e5e7eb'}`,
              borderRadius: 12, padding: '14px 12px',
              opacity: b.earned ? 1 : 0.6,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 28 }}>{b.earned ? b.emoji : '🔒'}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: b.earned ? '#7a5a00' : '#6b7280' }}>
                {b.label}
              </span>
              <span style={{ fontSize: 11, color: b.earned ? '#8a6a10' : '#9ca3af', lineHeight: 1.3 }}>
                {b.description}
              </span>
            </div>
          ))}
        </div>

        {props.badges.length > 4 && (
          <button
            onClick={() => setShowAllBadges(v => !v)}
            style={{
              width: '100%', marginTop: 10,
              background: 'none', border: '1px solid #e5e7eb', borderRadius: 10,
              padding: '10px 16px', fontSize: 13, fontWeight: 600, color: '#1a5c38',
              cursor: 'pointer',
            }}
          >
            {showAllBadges ? '↑ Show fewer' : `See all badges → (${props.badges.length - 4} hidden)`}
          </button>
        )}
      </div>

      {/* ── Account ───────────────────────────────────────────────────────── */}
      <div>
        <SectionHeader>Account</SectionHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={signOut}
            style={{
              background: '#fff', color: '#dc2626', border: '1px solid #fecaca',
              borderRadius: 12, padding: '13px 16px',
              fontSize: 14, fontWeight: 700, cursor: 'pointer', textAlign: 'left',
            }}
          >
            Sign out
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            style={{
              background: '#fff', color: '#6b7280', border: '1px solid #e5e7eb',
              borderRadius: 12, padding: '13px 16px',
              fontSize: 14, fontWeight: 600, cursor: 'pointer', textAlign: 'left',
            }}
          >
            Delete account
          </button>
        </div>
      </div>

      {/* ── Delete confirmation overlay ───────────────────────────────────── */}
      {showDeleteConfirm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          zIndex: 9999, padding: 16,
        }}>
          <div style={{
            background: '#fff', borderRadius: 20, padding: 24, width: '100%', maxWidth: 440,
            display: 'flex', flexDirection: 'column', gap: 14,
          }}>
            <div style={{ fontSize: 22, textAlign: 'center' }}>⚠️</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a', textAlign: 'center' }}>
              Delete account?
            </div>
            <div style={{ fontSize: 13, color: '#6b7280', textAlign: 'center', lineHeight: 1.6 }}>
              This will permanently delete your account, all your rounds and badges. This action cannot be undone.
            </div>
            {deleteError && (
              <div style={{ fontSize: 12, color: '#dc2626', textAlign: 'center' }}>{deleteError}</div>
            )}
            <button
              onClick={deleteAccount}
              disabled={deleting}
              style={{
                background: '#dc2626', color: '#fff', border: 'none',
                borderRadius: 12, padding: 14,
                fontSize: 15, fontWeight: 700, cursor: deleting ? 'not-allowed' : 'pointer',
                opacity: deleting ? 0.7 : 1,
              }}
            >
              {deleting ? 'Deleting…' : 'Yes, delete my account'}
            </button>
            <button
              onClick={() => { setShowDeleteConfirm(false); setDeleteError('') }}
              style={{
                background: '#f3f4f6', color: '#374151', border: 'none',
                borderRadius: 12, padding: 14,
                fontSize: 15, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1px solid #e5e7eb', borderRadius: 8,
  padding: '9px 12px', fontSize: 14, color: '#1a1a1a',
  fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
  background: '#fafafa',
}
