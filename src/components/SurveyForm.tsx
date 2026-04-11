'use client'

import { useState } from 'react'
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
      <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>{label}</div>
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
      <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>{label}</div>
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
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
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
      <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>{label}</div>
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
                fontSize: 14, color: '#1a1a1a', fontWeight: 500,
                cursor: 'pointer', fontFamily: 'inherit',
                textAlign: 'left', transition: 'all 0.15s',
              }}
            >
              <span style={{
                width: 20, height: 20, borderRadius: 5,
                border: `2px solid ${checked ? '#1a5c38' : '#d1d5db'}`,
                background: checked ? '#1a5c38' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, color: '#fff', flexShrink: 0,
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
      <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>{label}</div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        style={{
          width: '100%', boxSizing: 'border-box',
          border: '1px solid #e5e7eb', borderRadius: 10,
          padding: '11px 14px', fontSize: 14, color: '#1a1a1a',
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

    // Pack all answers into the columns that exist in the table.
    // Existing columns: user_id, design_rating, navigation_rating,
    //   favorite_feature, missing_feature, find_friends_rating,
    //   found_courses, missing_courses, max_price, best_thing, other_comments
    //
    // Extra fields are packed into other_comments as structured text.

    const extraAnswers = [
      mobileWorks && `Mobil: ${mobileWorks}`,
      triedFeatures.length > 0 && `Prøvet: ${triedFeatures.join(', ')}`,
      connectedOthers && `Connected: ${connectedOthers}`,
      sentMessage && `Sendt besked: ${sentMessage}`,
      messagingMissing.trim() && `Beskedsystem mangler: ${messagingMissing.trim()}`,
      wouldPay && `Vil betale: ${wouldPay}`,
      improvements.trim() && `Forbedringer: ${improvements.trim()}`,
      otherComments.trim() && `Kommentarer: ${otherComments.trim()}`,
    ].filter(Boolean).join('\n')

    const { error: insertError } = await supabase
      .from('survey_responses')
      .insert({
        user_id: userId,
        design_rating: designRating || null,
        navigation_rating: navigationRating || null,
        favorite_feature: favoriteFeature.trim() || null,
        missing_feature: missingFeature.trim() || null,
        find_friends_rating: findFriendsRating || null,
        found_courses: foundCourses || null,
        missing_courses: missingCourses.trim() || null,
        max_price: maxPrice.trim() || null,
        best_thing: bestThing.trim() || null,
        other_comments: extraAnswers || null,
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
          Tak for din feedback!
        </div>
        <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginBottom: 24 }}>
          Dine svar hjælper med at gøre My Golf Passport bedre. Vi sætter stor pris på din tid.
        </div>
        <a
          href="/"
          style={{
            display: 'inline-block', background: '#1a5c38', color: '#fff',
            borderRadius: 14, padding: '14px 32px',
            fontSize: 15, fontWeight: 700, textDecoration: 'none',
          }}
        >
          Tilbage til forsiden →
        </a>
      </div>
    )
  }

  // ── Form ───────────────────────────────────────────────────────────────────

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* Title */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a' }}>
          📋 Spørgeskema
        </div>
        <div style={{ fontSize: 14, color: '#6b7280', marginTop: 4, lineHeight: 1.5 }}>
          Hjælp os med at forbedre appen — det tager kun 2 minutter
        </div>
      </div>

      {/* ── Design & Navigation ─────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 18px', marginBottom: 12 }}>
        <SectionHeader>Design & navigation</SectionHeader>

        <StarRating
          value={designRating}
          onChange={setDesignRating}
          label="Hvordan oplever du det generelle design?"
        />
        <StarRating
          value={navigationRating}
          onChange={setNavigationRating}
          label="Er appen nem at navigere i?"
        />
        <ButtonGroup
          value={mobileWorks}
          onChange={setMobileWorks}
          options={['Ja', 'Delvist', 'Nej']}
          label="Virker appen godt på din mobil?"
        />
      </div>

      {/* ── Features ────────────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 18px', marginBottom: 12 }}>
        <SectionHeader>Features</SectionHeader>

        <MultiSelect
          values={triedFeatures}
          onChange={setTriedFeatures}
          options={['Log bane', 'Verdenskort', 'Venner', 'Rangliste', 'Bucket list', 'Beskeder']}
          label="Hvilke funktioner har du prøvet?"
        />
        <TextArea
          value={favoriteFeature}
          onChange={setFavoriteFeature}
          label="Hvilken funktion synes du bedst om?"
          placeholder="Skriv her..."
        />
        <TextArea
          value={missingFeature}
          onChange={setMissingFeature}
          label="Hvad savner du mest?"
          placeholder="Skriv her..."
        />
      </div>

      {/* ── Social ──────────────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 18px', marginBottom: 12 }}>
        <SectionHeader>Det sociale</SectionHeader>

        <ButtonGroup
          value={connectedOthers}
          onChange={setConnectedOthers}
          options={['Ja', 'Nej']}
          label="Har du connected med andre golfere?"
        />
        <StarRating
          value={findFriendsRating}
          onChange={setFindFriendsRating}
          label="Var det nemt at finde dine venner?"
        />
        <ButtonGroup
          value={sentMessage}
          onChange={setSentMessage}
          options={['Ja', 'Nej']}
          label="Har du sendt en besked til nogen?"
        />
        <TextArea
          value={messagingMissing}
          onChange={setMessagingMissing}
          label="Hvad mangler i beskedsystemet?"
          placeholder="Skriv her..."
        />
      </div>

      {/* ── Courses & data ──────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 18px', marginBottom: 12 }}>
        <SectionHeader>Baner & data</SectionHeader>

        <ButtonGroup
          value={foundCourses}
          onChange={setFoundCourses}
          options={['Ja', 'Delvist', 'Nej']}
          label="Kunne du finde de baner du har spillet?"
        />
        <TextArea
          value={missingCourses}
          onChange={setMissingCourses}
          label="Var der baner der manglede?"
          placeholder="Skriv navne på manglende baner..."
        />
      </div>

      {/* ── Payment ─────────────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 18px', marginBottom: 12 }}>
        <SectionHeader>Betaling</SectionHeader>

        <ButtonGroup
          value={wouldPay}
          onChange={setWouldPay}
          options={['Ja', 'Måske', 'Nej']}
          label="Ville du betale for adgang til alle funktioner?"
        />
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>
            Hvad ville du maksimalt betale pr. år?
          </div>
          <input
            type="text"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            placeholder="f.eks. 199 DKK"
            style={{
              width: '100%', boxSizing: 'border-box',
              border: '1px solid #e5e7eb', borderRadius: 10,
              padding: '11px 14px', fontSize: 14, color: '#1a1a1a',
              fontFamily: 'inherit', outline: 'none', background: '#fafafa',
            }}
          />
        </div>
      </div>

      {/* ── Closing ─────────────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 18px', marginBottom: 12 }}>
        <SectionHeader>Afslutning</SectionHeader>

        <TextArea
          value={bestThing}
          onChange={setBestThing}
          label="Hvad er det bedste ved appen?"
          placeholder="Skriv her..."
        />
        <TextArea
          value={improvements}
          onChange={setImprovements}
          label="Hvad skal forbedres før du vil anbefale den til andre?"
          placeholder="Skriv her..."
        />
        <TextArea
          value={otherComments}
          onChange={setOtherComments}
          label="Andre kommentarer?"
          placeholder="Skriv her..."
        />
      </div>

      {/* ── Error ───────────────────────────────────────────────────────────── */}
      {error && (
        <div style={{
          fontSize: 13, color: '#dc2626', background: '#fef2f2',
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
        {saving ? 'Sender...' : 'Send feedback →'}
      </button>
    </div>
  )
}
