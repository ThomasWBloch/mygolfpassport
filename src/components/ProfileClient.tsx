'use client'

import { useState } from 'react'
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

type Props = {
  userId: string
  email: string
  initials: string
  fullName: string
  handicap: number | null
  homeClub: string | null
  clubs: string[]
  allowFriends: boolean
  allowStrangers: boolean
  showInSearch: boolean
  showCourseCount: boolean
  roundCount: number
  countryCount: number
  badges: Badge[]
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
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState('')

  // Privacy toggles
  const [allowFriends, setAllowFriends]     = useState(props.allowFriends)
  const [allowStrangers, setAllowStrangers] = useState(props.allowStrangers)
  const [showInSearch, setShowInSearch]     = useState(props.showInSearch)
  const [showCourseCount, setShowCourseCount] = useState(props.showCourseCount)

  // Club combobox state
  const [clubDropdownOpen, setClubDropdownOpen] = useState(false)
  const filteredClubs = props.clubs.filter(c =>
    c.toLowerCase().includes(homeClub.toLowerCase())
  ).slice(0, 8)

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
      const body = await res.json().catch(() => ({ error: 'Ukendt fejl' }))
      setDeleteError(body.error ?? 'Noget gik galt. Prøv igen.')
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
          <div style={{
            width: 48, height: 48, borderRadius: '50%', background: '#c9a84c',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 17, color: '#fff',
            border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0,
          }}>
            {displayInitials}
          </div>
          <div>
            <div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>
              {fullName || props.email}
            </div>
            {homeClub && (
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>
                🏠 {homeClub}
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { value: props.roundCount,   label: 'Baner',  href: '/map' },
            { value: props.countryCount, label: 'Lande',  href: '/map' },
            { value: earnedCount,        label: 'Badges', href: '/badges' },
          ].map(({ value, label, href }) => (
            <Link key={label} href={href} style={{
              background: 'rgba(255,255,255,0.08)', borderRadius: 10,
              padding: '10px 8px', textAlign: 'center',
              textDecoration: 'none', display: 'block',
            }}
            onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
            onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            >
              <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{value}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, marginTop: 3, textTransform: 'uppercase' }}>{label}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Edit profile ──────────────────────────────────────────────────── */}
      <div>
        <SectionHeader>Rediger profil</SectionHeader>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>

          {[
            {
              label: 'Fulde navn',
              input: (
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Dit navn"
                  style={inputStyle}
                />
              ),
            },
            {
              label: 'Hjemmeklub',
              input: (
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={homeClub}
                    onChange={e => { setHomeClub(e.target.value); setClubDropdownOpen(true) }}
                    onFocus={() => setClubDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setClubDropdownOpen(false), 150)}
                    placeholder="Søg klub…"
                    style={inputStyle}
                    autoComplete="off"
                  />
                  {clubDropdownOpen && filteredClubs.length > 0 && (
                    <div style={{
                      position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200,
                      background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.10)', marginTop: 2,
                      maxHeight: 200, overflowY: 'auto',
                    }}>
                      {filteredClubs.map((club, i) => (
                        <button
                          key={club}
                          onMouseDown={() => { setHomeClub(club); setClubDropdownOpen(false) }}
                          style={{
                            display: 'block', width: '100%', textAlign: 'left',
                            padding: '10px 12px', fontSize: 13, color: '#1a1a1a',
                            background: 'none', border: 'none', cursor: 'pointer',
                            borderBottom: i < filteredClubs.length - 1 ? '1px solid #f3f4f6' : 'none',
                            fontFamily: 'inherit',
                          }}
                        >
                          {club}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ),
            },
            {
              label: 'Handicap',
              input: (
                <input
                  type="number"
                  value={handicap}
                  onChange={e => setHandicap(e.target.value)}
                  placeholder="f.eks. 12.4"
                  min={-10}
                  max={54}
                  step={0.1}
                  style={inputStyle}
                />
              ),
            },
          ].map(({ label, input }, i, arr) => (
            <div key={label} style={{
              padding: '12px 16px',
              borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none',
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>
                {label}
              </div>
              {input}
            </div>
          ))}

          <div style={{ padding: '12px 16px', borderTop: '1px solid #f3f4f6' }}>
            {saveError && (
              <div style={{ fontSize: 12, color: '#dc2626', marginBottom: 8 }}>{saveError}</div>
            )}
            {saveSuccess && (
              <div style={{ fontSize: 13, color: '#1a5c38', fontWeight: 600, marginBottom: 8 }}>
                ✓ Gemt!
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
              {saving ? 'Gemmer…' : 'Gem ændringer'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Privacy & Social ──────────────────────────────────────────────── */}
      <div>
        <SectionHeader>Privatliv & socialt</SectionHeader>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          {[
            {
              label: 'Tillad rundeforespørgsler fra venner',
              sub: 'Venner kan sende dig en forespørgsel om at spille',
              checked: allowFriends,
              onChange: (v: boolean) => { setAllowFriends(v); saveToggle('allow_round_requests_friends', v) },
            },
            {
              label: 'Tillad rundeforespørgsler fra alle',
              sub: 'Alle brugere kan sende dig en forespørgsel',
              checked: allowStrangers,
              onChange: (v: boolean) => { setAllowStrangers(v); saveToggle('allow_round_requests_strangers', v) },
            },
            {
              label: 'Vis mig i søgeresultater',
              sub: 'Andre kan finde dig via søgning',
              checked: showInSearch,
              onChange: (v: boolean) => { setShowInSearch(v); saveToggle('show_in_search', v) },
            },
            {
              label: 'Vis mit baneantal offentligt',
              sub: 'Andre kan se hvor mange baner du har spillet',
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
        <SectionHeader>Mine badges</SectionHeader>
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
            {showAllBadges ? '↑ Vis færre' : `Se alle badges → (${props.badges.length - 4} skjulte)`}
          </button>
        )}
      </div>

      {/* ── Account ───────────────────────────────────────────────────────── */}
      <div>
        <SectionHeader>Konto</SectionHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={signOut}
            style={{
              background: '#fff', color: '#dc2626', border: '1px solid #fecaca',
              borderRadius: 12, padding: '13px 16px',
              fontSize: 14, fontWeight: 700, cursor: 'pointer', textAlign: 'left',
            }}
          >
            Log ud
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            style={{
              background: '#fff', color: '#6b7280', border: '1px solid #e5e7eb',
              borderRadius: 12, padding: '13px 16px',
              fontSize: 14, fontWeight: 600, cursor: 'pointer', textAlign: 'left',
            }}
          >
            Slet konto
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
              Slet konto?
            </div>
            <div style={{ fontSize: 13, color: '#6b7280', textAlign: 'center', lineHeight: 1.6 }}>
              Dette sletter permanent din konto, alle dine runder og badges. Handlingen kan ikke fortrydes.
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
              {deleting ? 'Sletter…' : 'Ja, slet min konto'}
            </button>
            <button
              onClick={() => { setShowDeleteConfirm(false); setDeleteError('') }}
              style={{
                background: '#f3f4f6', color: '#374151', border: 'none',
                borderRadius: 12, padding: 14,
                fontSize: 15, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Annuller
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
