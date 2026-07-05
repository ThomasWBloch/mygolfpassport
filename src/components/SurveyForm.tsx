'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 12, fontWeight: 700, color: '#6b7280',
      textTransform: 'uppercase', letterSpacing: '0.5px',
      marginBottom: 12, marginTop: 8,
    }}>
      {children}
    </div>
  )
}

function StarRating({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', gap: 6 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            style={{
              width: 44, height: 44, borderRadius: 10,
              border: `1px solid ${n <= value ? '#c9a84c' : '#e5e7eb'}`,
              background: n <= value ? '#f5e9c8' : '#fff',
              fontSize: 20, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
          >
            {n <= value ? '★' : '☆'}
          </button>
        ))}
      </div>
    </div>
  )
}

function ButtonGroup({ value, onChange, options, label }: {
  value: string
  onChange: (v: string) => void
  options: string[]
  label: string
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            style={{
              padding: '9px 18px', borderRadius: 10,
              border: `1px solid ${value === opt ? '#1a5c38' : '#e5e7eb'}`,
              background: value === opt ? '#1a5c38' : '#fff',
              color: value === opt ? '#fff' : '#374151',
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'inherit', transition: 'all 0.15s',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

function MultiSelect({ values, onChange, options, label }: {
  values: string[]
  onChange: (v: string[]) => void
  options: string[]
  label: string
}) {
  function toggle(opt: string) {
    onChange(values.includes(opt) ? values.filter(v => v !== opt) : [...values, opt])
  }
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {options.map(opt => {
          const checked = values.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', borderRadius: 10,
                border: `1px solid ${checked ? '#1a5c38' : '#e5e7eb'}`,
                background: checked ? '#e8f5ee' : '#fff',
                fontSize: 15, color: '#1a1a1a', fontWeight: 500,
                cursor: 'pointer', fontFamily: 'inherit',
                textAlign: 'left', transition: 'all 0.15s',
              }}
            >
              <span style={{
                width: 20, height: 20, borderRadius: 5,
                border: `2px solid ${checked ? '#1a5c38' : '#d1d5db'}`,
                background: checked ? '#1a5c38' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, color: '#fff', flexShrink: 0,
              }}>
                {checked ? '✓' : ''}
              </span>
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TextArea({ value, onChange, label, placeholder }: {
  value: string
  onChange: (v: string) => void
  label: string
  placeholder?: string
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>{label}</div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        style={{
          width: '100%', boxSizing: 'border-box',
          border: '1px solid #e5e7eb', borderRadius: 10,
          padding: '11px 14px', fontSize: 15, color: '#1a1a1a',
          fontFamily: 'inherit', outline: 'none', background: '#fafafa',
          resize: 'vertical', lineHeight: 1.5,
        }}
      />
    </div>
  )
}

// ── Main form ────────────────────────────────────────────────────────────────

export default function SurveyForm({ userId }: { userId: string }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Design & navigation
  const [designRating, setDesignRating] = useState(0)
  const [navigationRating, setNavigationRating] = useState(0)
  const [mobileWorks, setMobileWorks] = useState('')

  // Features
  const [triedFeatures, setTriedFeatures] = useState<string[]>([])
  const [favoriteFeature, setFavoriteFeature] = useState('')
  const [missingFeature, setMissingFeature] = useState('')

  // Social
  const [connectedOthers, setConnectedOthers] = useState('')
  const [findFriendsRating, setFindFriendsRating] = useState(0)
  const [sentMessage, setSentMessage] = useState('')
  const [messagingMissing, setMessagingMissing] = useState('')

  // Courses & data
  const [foundCourses, setFoundCourses] = useState('')
  const [missingCourses, setMissingCourses] = useState('')

  // Payment
  const [wouldPay, setWouldPay] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // Closing
  const [bestThing, setBestThing] = useState('')
  const [improvements, setImprovements] = useState('')
  const [otherComments, setOtherComments] = useState('')

  // Submit state
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit() {
    setSaving(true)
    setError('')

    const { error: insertError } = await supabase
      .from('survey_responses')
      .insert({
        user_id: userId,
        design_rating: designRating || null,
        navigation_rating: navigationRating || null,
        mobile_works: mobileWorks || null,
        tried_features: triedFeatures.length > 0 ? triedFeatures : null,
        favorite_feature: favoriteFeature.trim() || null,
        missing_feature: missingFeature.trim() || null,
        connected_others: connectedOthers === 'Yes' ? true : connectedOthers === 'No' ? false : null,
        find_friends_rating: findFriendsRating || null,
        sent_message: sentMessage === 'Yes' ? true : sentMessage === 'No' ? false : null,
        messaging_missing: messagingMissing.trim() || null,
        found_courses: foundCourses || null,
        missing_courses: missingCourses.trim() || null,
        would_pay: wouldPay || null,
        max_price: maxPrice.trim() || null,
        best_thing: bestThing.trim() || null,
        improvements: improvements.trim() || null,
        other_comments: otherComments.trim() || null,
      })

    setSaving(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    setSubmitted(true)
  }

  // ── Success screen ─────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div style={{
        background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb',
        padding: '48px 24px', textAlign: 'center',
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>
          Thank you for your feedback!
        </div>
        <div style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.6, marginBottom: 24 }}>
          Your answers help make My Golf Passport better. We really appreciate your time.
        </div>
        <Link
          href="/"
          style={{
            display: 'inline-block', background: '#1a5c38', color: '#fff',
            borderRadius: 14, padding: '14px 32px',
            fontSize: 15, fontWeight: 700, textDecoration: 'none',
          }}
        >
          Back to home →
        </Link>
      </div>
    )
  }

  // ── Form ───────────────────────────────────────────────────────────────────

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* Title */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a' }}>
          📋 Survey
        </div>
        <div style={{ fontSize: 15, color: '#6b7280', marginTop: 4, lineHeight: 1.5 }}>
          Help us improve the app — it only takes 2 minutes
        </div>
      </div>

      {/* ── Design & Navigation ─────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 18px', marginBottom: 12 }}>
        <SectionHeader>Design & navigation</SectionHeader>

        <StarRating
          value={designRating}
          onChange={setDesignRating}
          label="How would you rate the overall design?"
        />
        <StarRating
          value={navigationRating}
          onChange={setNavigationRating}
          label="Is the app easy to navigate?"
        />
        <ButtonGroup
          value={mobileWorks}
          onChange={setMobileWorks}
          options={['Yes', 'Partially', 'No']}
          label="Does the app work well on your phone?"
        />
      </div>

      {/* ── Features ────────────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 18px', marginBottom: 12 }}>
        <SectionHeader>Features</SectionHeader>

        <MultiSelect
          values={triedFeatures}
          onChange={setTriedFeatures}
          options={['Log a round', 'World map', 'Friends', 'Leaderboard', 'Bucket list', 'Messages']}
          label="Which features have you tried?"
        />
        <TextArea
          value={favoriteFeature}
          onChange={setFavoriteFeature}
          label="Which feature do you like best?"
          placeholder="Write here..."
        />
        <TextArea
          value={missingFeature}
          onChange={setMissingFeature}
          label="What do you miss the most?"
          placeholder="Write here..."
        />
      </div>

      {/* ── Social ──────────────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 18px', marginBottom: 12 }}>
        <SectionHeader>Social</SectionHeader>

        <ButtonGroup
          value={connectedOthers}
          onChange={setConnectedOthers}
          options={['Yes', 'No']}
          label="Have you connected with other golfers?"
        />
        <StarRating
          value={findFriendsRating}
          onChange={setFindFriendsRating}
          label="Was it easy to find your friends?"
        />
        <ButtonGroup
          value={sentMessage}
          onChange={setSentMessage}
          options={['Yes', 'No']}
          label="Have you sent a message to anyone?"
        />
        <TextArea
          value={messagingMissing}
          onChange={setMessagingMissing}
          label="What's missing from the messaging system?"
          placeholder="Write here..."
        />
      </div>

      {/* ── Courses & data ──────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 18px', marginBottom: 12 }}>
        <SectionHeader>Courses & data</SectionHeader>

        <ButtonGroup
          value={foundCourses}
          onChange={setFoundCourses}
          options={['Yes', 'Partially', 'No']}
          label="Could you find the courses you've played?"
        />
        <TextArea
          value={missingCourses}
          onChange={setMissingCourses}
          label="Were there any courses missing?"
          placeholder="Write the names of missing courses..."
        />
      </div>

      {/* ── Payment ─────────────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 18px', marginBottom: 12 }}>
        <SectionHeader>Payment</SectionHeader>

        <ButtonGroup
          value={wouldPay}
          onChange={setWouldPay}
          options={['Yes', 'Maybe', 'No']}
          label="Would you pay for access to all features?"
        />
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>
            What's the most you'd pay per year?
          </div>
          <input
            type="text"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            placeholder="e.g. 199 DKK"
            style={{
              width: '100%', boxSizing: 'border-box',
              border: '1px solid #e5e7eb', borderRadius: 10,
              padding: '11px 14px', fontSize: 15, color: '#1a1a1a',
              fontFamily: 'inherit', outline: 'none', background: '#fafafa',
            }}
          />
        </div>
      </div>

      {/* ── Closing ─────────────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 18px', marginBottom: 12 }}>
        <SectionHeader>Closing</SectionHeader>

        <TextArea
          value={bestThing}
          onChange={setBestThing}
          label="What's the best thing about the app?"
          placeholder="Write here..."
        />
        <TextArea
          value={improvements}
          onChange={setImprovements}
          label="What needs to improve before you'd recommend it to others?"
          placeholder="Write here..."
        />
        <TextArea
          value={otherComments}
          onChange={setOtherComments}
          label="Any other comments?"
          placeholder="Write here..."
        />
      </div>

      {/* ── Error ───────────────────────────────────────────────────────────── */}
      {error && (
        <div style={{
          fontSize: 14, color: '#dc2626', background: '#fef2f2',
          borderRadius: 10, padding: '10px 14px', marginBottom: 12,
        }}>
          {error}
        </div>
      )}

      {/* ── Submit ──────────────────────────────────────────────────────────── */}
      <button
        onClick={handleSubmit}
        disabled={saving}
        style={{
          background: '#1a5c38', color: '#fff', border: 'none',
          borderRadius: 14, padding: '16px 24px',
          fontSize: 16, fontWeight: 700,
          cursor: saving ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit', width: '100%',
          opacity: saving ? 0.6 : 1,
        }}
      >
        {saving ? 'Sending...' : 'Send feedback →'}
      </button>
    </div>
  )
}
