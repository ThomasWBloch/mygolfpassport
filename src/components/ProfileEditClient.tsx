'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { COUNTRY_OPTIONS as COUNTRIES } from '@/lib/countries'
import { normalizeSearch } from '@/lib/search'

// ── Types ─────────────────────────────────────────────────────────────────────
type Props = {
  userId: string
  email: string
  fullName: string
  handicap: number | null
  homeClub: string | null
  homeCountry: string | null
  allowFriends: boolean
  allowStrangers: boolean
  showInSearch: boolean
  showCourseCount: boolean
  hideFromFeeds: boolean
}

// ── Toggle (Adventure-tokens version) ────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      style={{
        width: 46, height: 26, borderRadius: 13,
        background: checked ? 'var(--color-mgp-cover)' : 'var(--color-mgp-border)',
        border: 'none', cursor: 'pointer', padding: 3,
        position: 'relative', transition: 'background 0.2s', flexShrink: 0,
      }}
    >
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        background: 'var(--color-mgp-paper)',
        position: 'absolute', top: 3,
        left: checked ? 23 : 3,
        transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.20)',
      }} />
    </button>
  )
}

// ── Stamp-style section header ────────────────────────────────────────────────
function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mgp-stamp)',
      fontSize: 11,
      letterSpacing: 2,
      textTransform: 'uppercase' as const,
      color: 'var(--color-mgp-ink-3)',
      marginBottom: 10,
    }}>
      {children}
    </div>
  )
}

// ── Card label (above each input) ─────────────────────────────────────────────
const cardLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mgp-stamp)',
  fontSize: 10,
  letterSpacing: 1.5,
  textTransform: 'uppercase' as const,
  color: 'var(--color-mgp-ink-3)',
  marginBottom: 6,
}

// ── Input style (Adventure cream-warm) ────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid var(--color-mgp-border)',
  borderRadius: 8,
  padding: '9px 12px',
  fontSize: 14,
  color: 'var(--color-mgp-ink)',
  fontFamily: 'inherit',
  outline: 'none',
  boxSizing: 'border-box',
  background: 'var(--color-mgp-cream-warm)',
}

// ── Card styling reused across sections ───────────────────────────────────────
const cardStyle: React.CSSProperties = {
  background: 'var(--color-mgp-paper)',
  borderRadius: 14,
  border: '1px solid var(--color-mgp-border)',
  overflow: 'hidden',
}

// ── Club search result type ──────────────────────────────────────────────────
interface ClubResult {
  club: string
  country: string | null
  flag: string | null
}

// ── Main component ───────────────────────────────────────────────────────────
export default function ProfileEditClient(props: Props) {
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // ── Form state ──────────────────────────────────────────────────────────────
  const [fullName, setFullName] = useState(props.fullName)
  const [handicap, setHandicap] = useState(props.handicap != null ? String(props.handicap) : '')
  const [homeClub, setHomeClub] = useState(props.homeClub ?? '')
  const [homeCountry, setHomeCountry] = useState(props.homeCountry ?? '')
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState('')

  // ── Privacy toggles ─────────────────────────────────────────────────────────
  const [allowFriends, setAllowFriends]       = useState(props.allowFriends)
  const [allowStrangers, setAllowStrangers]   = useState(props.allowStrangers)
  const [showInSearch, setShowInSearch]       = useState(props.showInSearch)
  const [showCourseCount, setShowCourseCount] = useState(props.showCourseCount)
  const [hideFromFeeds, setHideFromFeeds]     = useState(props.hideFromFeeds)

  // ── Club search state (on-demand from Supabase) ─────────────────────────────
  const [clubResults, setClubResults] = useState<ClubResult[]>([])
  const [clubDropdownOpen, setClubDropdownOpen] = useState(false)

  const searchClubs = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setClubResults([])
      return
    }
    const normalized = normalizeSearch(q)
    const { data } = await supabase
      .from('courses')
      .select('club, country, flag')
      .ilike('club_normalized', `%${normalized}%`)
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
      unique.push({
        club: row.club as string,
        country: row.country as string | null,
        flag: row.flag as string | null,
      })
    }
    const currentHomeCountry = homeCountry.trim() || null
    unique.sort((a, b) => {
      if (currentHomeCountry) {
        const aHome = a.country === currentHomeCountry ? 0 : 1
        const bHome = b.country === currentHomeCountry ? 0 : 1
        if (aHome !== bHome) return aHome - bHome
      }
      const aStarts = normalizeSearch(a.club).startsWith(normalized) ? 0 : 1
      const bStarts = normalizeSearch(b.club).startsWith(normalized) ? 0 : 1
      if (aStarts !== bStarts) return aStarts - bStarts
      return a.club.localeCompare(b.club)
    })
    setClubResults(unique.slice(0, 8))
  }, [supabase, homeCountry])

  // Debounced club search
  useEffect(() => {
    if (!clubDropdownOpen) return
    const t = setTimeout(() => searchClubs(homeClub), 250)
    return () => clearTimeout(t)
  }, [homeClub, clubDropdownOpen, searchClubs])

  // ── Account UI state ────────────────────────────────────────────────────────
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting]       = useState(false)
  const [deleteError, setDeleteError] = useState('')

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
    // Refresh server data so /profile public view reflects changes immediately
    router.refresh()
  }

  // ── Save privacy toggle ─────────────────────────────────────────────────────
  async function saveToggle(field: string, value: boolean) {
    await supabase.from('profiles').update({ [field]: value }).eq('id', props.userId)
  }

  // ── Sign out ────────────────────────────────────────────────────────────────
  async function signOut() {
    await supabase.auth.signOut()
    router.push('/welcome')
  }

  // ── Delete account ──────────────────────────────────────────────────────────
  async function deleteAccount() {
    setDeleting(true)
    setDeleteError('')
    const res = await fetch('/api/delete-account', { method: 'POST' })
    if (res.ok) {
      await supabase.auth.signOut()
      router.push('/welcome')
    } else {
      const body = await res.json().catch(() => ({ error: 'Unknown error' }))
      setDeleteError(body.error ?? 'Something went wrong. Please try again.')
      setDeleting(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* ── Edit profile ──────────────────────────────────────────────────── */}
      <div>
        <SectionHeader>Editable profile</SectionHeader>
        <div style={cardStyle}>

          {/* Full name */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-mgp-border-faint)' }}>
            <div style={cardLabelStyle}>Full name</div>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Your name"
              style={inputStyle}
            />
          </div>

          {/* Home country */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-mgp-border-faint)' }}>
            <div style={cardLabelStyle}>Home country</div>
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

          {/* Home club */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-mgp-border-faint)' }}>
            <div style={cardLabelStyle}>Home club</div>
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
                  marginTop: 2,
                  maxHeight: 220, overflowY: 'auto',
                }}>
                  {clubResults.map((c, i) => (
                    <button
                      key={c.club}
                      onMouseDown={() => { setHomeClub(c.club); setClubDropdownOpen(false) }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        width: '100%', textAlign: 'left',
                        padding: '10px 12px', fontSize: 13,
                        color: 'var(--color-mgp-ink)',
                        background: 'none', border: 'none', cursor: 'pointer',
                        borderBottom: i < clubResults.length - 1 ? '1px solid var(--color-mgp-border-faint)' : 'none',
                        fontFamily: 'inherit',
                      }}
                    >
                      {c.flag && <span style={{ fontSize: 16 }}>{c.flag}</span>}
                      <span style={{ flex: 1 }}>{c.club}</span>
                      {c.country && <span style={{ fontSize: 11, color: 'var(--color-mgp-ink-3)' }}>{c.country}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Handicap */}
          <div style={{ padding: '12px 16px' }}>
            <div style={cardLabelStyle}>Handicap</div>
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

          {/* Save row */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-mgp-border-faint)' }}>
            {saveError && (
              <div style={{ fontSize: 12, color: 'var(--color-mgp-danger)', marginBottom: 8 }}>{saveError}</div>
            )}
            {saveSuccess && (
              <div style={{
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 12, letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'var(--color-mgp-success)',
                marginBottom: 8,
              }}>
                ✓ Saved
              </div>
            )}
            <button
              onClick={saveProfile}
              disabled={saving}
              style={{
                background: 'var(--color-mgp-cover)',
                color: 'var(--color-mgp-ink-inv)',
                border: 'none',
                borderRadius: 10,
                padding: '11px 20px',
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 13,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: saving ? 'not-allowed' : 'pointer',
                width: '100%',
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Privacy & Social ──────────────────────────────────────────────── */}
      <div>
        <SectionHeader>Privacy &amp; social</SectionHeader>
        <div style={cardStyle}>
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
            {
              label: 'Hide my activity from friends\' feeds',
              sub: 'New rounds, badges and connections won\'t appear in others\' home feeds',
              checked: hideFromFeeds,
              onChange: (v: boolean) => { setHideFromFeeds(v); saveToggle('hide_from_feeds', v) },
            },
          ].map(({ label, sub, checked, onChange }, i, arr) => (
            <div key={label} style={{
              padding: '14px 16px',
              borderBottom: i < arr.length - 1 ? '1px solid var(--color-mgp-border-faint)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-mgp-ink)' }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--color-mgp-ink-3)', marginTop: 2, lineHeight: 1.4 }}>{sub}</div>
              </div>
              <Toggle checked={checked} onChange={onChange} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Account ───────────────────────────────────────────────────────── */}
      <div>
        <SectionHeader>Account</SectionHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            ...cardStyle,
            padding: '12px 16px',
            fontSize: 13,
            color: 'var(--color-mgp-ink-3)',
          }}>
            Signed in as <span style={{ color: 'var(--color-mgp-ink)', fontWeight: 600 }}>{props.email}</span>
          </div>

          <button
            onClick={signOut}
            style={{
              background: 'var(--color-mgp-paper)',
              color: 'var(--color-mgp-danger)',
              border: '1px solid var(--color-mgp-border)',
              borderRadius: 12,
              padding: '13px 16px',
              fontSize: 14, fontWeight: 700,
              cursor: 'pointer', textAlign: 'left',
            }}
          >
            Sign out
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            style={{
              background: 'var(--color-mgp-paper)',
              color: 'var(--color-mgp-ink-3)',
              border: '1px solid var(--color-mgp-border)',
              borderRadius: 12,
              padding: '13px 16px',
              fontSize: 14, fontWeight: 600,
              cursor: 'pointer', textAlign: 'left',
            }}
          >
            Delete account
          </button>
        </div>
      </div>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <div>
        <SectionHeader>About</SectionHeader>
        <div style={cardStyle}>
          {[
            { label: 'Privacy policy', href: '/legal/privacy' },
            { label: 'Terms of service', href: '/legal/terms' },
            { label: 'Contact support', href: 'mailto:hello@mygolfpassport.com' },
          ].map(({ label, href }, i, arr) => (
            <Link
              key={label}
              href={href}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px',
                borderBottom: i < arr.length - 1 ? '1px solid var(--color-mgp-border-faint)' : 'none',
                color: 'var(--color-mgp-ink)',
                textDecoration: 'none',
                fontSize: 14,
              }}
            >
              <span>{label}</span>
              <span style={{ color: 'var(--color-mgp-ink-3)', fontSize: 16 }}>›</span>
            </Link>
          ))}
        </div>
        <div style={{
          marginTop: 12,
          textAlign: 'center',
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
        }}>
          My Golf Passport · v2 beta
        </div>
      </div>

      {/* ── Delete confirmation overlay ───────────────────────────────────── */}
      {showDeleteConfirm && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(15,37,25,0.55)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          zIndex: 9999, padding: 16,
        }}>
          <div style={{
            background: 'var(--color-mgp-paper)',
            borderRadius: 20, padding: 24, width: '100%', maxWidth: 440,
            display: 'flex', flexDirection: 'column', gap: 14,
            border: '1px solid var(--color-mgp-border)',
          }}>
            <div style={{ fontSize: 22, textAlign: 'center' }}>⚠️</div>
            <div style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 22, fontWeight: 500,
              color: 'var(--color-mgp-ink)', textAlign: 'center',
              letterSpacing: -0.3,
            }}>
              Delete account?
            </div>
            <div style={{
              fontSize: 13,
              color: 'var(--color-mgp-ink-2)',
              textAlign: 'center', lineHeight: 1.6,
            }}>
              This will permanently delete your account, all your rounds and badges. This action cannot be undone.
            </div>
            {deleteError && (
              <div style={{ fontSize: 12, color: 'var(--color-mgp-danger)', textAlign: 'center' }}>
                {deleteError}
              </div>
            )}
            <button
              onClick={deleteAccount}
              disabled={deleting}
              style={{
                background: 'var(--color-mgp-danger)',
                color: 'var(--color-mgp-ink-inv)',
                border: 'none', borderRadius: 12, padding: 14,
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 13, letterSpacing: 1.5,
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: deleting ? 'not-allowed' : 'pointer',
                opacity: deleting ? 0.7 : 1,
              }}
            >
              {deleting ? 'Deleting…' : 'Yes, delete my account'}
            </button>
            <button
              onClick={() => { setShowDeleteConfirm(false); setDeleteError('') }}
              style={{
                background: 'var(--color-mgp-cream-warm)',
                color: 'var(--color-mgp-ink)',
                border: '1px solid var(--color-mgp-border)',
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
