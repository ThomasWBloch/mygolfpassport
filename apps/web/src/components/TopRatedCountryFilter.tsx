'use client'

import { useRouter } from 'next/navigation'
import { COUNTRY_OPTIONS } from '@/lib/countries'

/**
 * Country <select> for the /courses Top Rated view. Server component parent
 * (TopRatedCoursesView) can't hold onChange handlers, so this one small
 * piece is split out as a client component — same pattern as
 * ProfileEditClient's Toggle.
 */
export default function TopRatedCountryFilter({ currentCountry }: { currentCountry: string | null }) {
  const router = useRouter()

  return (
    <select
      value={currentCountry ?? ''}
      onChange={(e) => {
        const value = e.target.value
        router.push(value ? `/courses?view=top-rated&country=${encodeURIComponent(value)}` : '/courses?view=top-rated')
      }}
      style={{
        border: '1px solid var(--color-mgp-border)',
        background: 'var(--color-mgp-paper)',
        borderRadius: 8,
        padding: '10px 12px',
        fontFamily: 'var(--font-mgp-body)',
        fontSize: 14,
        color: 'var(--color-mgp-ink)',
        maxWidth: 260,
      }}
    >
      <option value="">All countries</option>
      {COUNTRY_OPTIONS.map((c) => (
        <option key={c.value} value={c.value}>{c.label}</option>
      ))}
    </select>
  )
}
