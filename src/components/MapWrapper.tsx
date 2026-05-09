'use client'

import dynamic from 'next/dynamic'
import type { CountryGroup } from '@/app/map/page'

const WorldMap = dynamic(() => import('./WorldMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%', height: 'min(50vh, 420px)', borderRadius: 16,
      background: 'var(--color-mgp-cream-warm)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        color: 'var(--color-mgp-ink-3)',
        fontFamily: 'var(--font-mgp-stamp)',
        fontSize: 11, letterSpacing: 1.5,
        textTransform: 'uppercase',
      }}>
        Loading map…
      </div>
    </div>
  ),
})

export default function MapWrapper({
  countries,
  totalRounds,
  totalCountries,
}: {
  countries: CountryGroup[]
  totalRounds: number
  totalCountries: number
}) {
  return (
    <WorldMap
      countries={countries}
      totalRounds={totalRounds}
      totalCountries={totalCountries}
    />
  )
}
