'use client'

import dynamic from 'next/dynamic'
import type { CountryGroup } from '@/app/map/page'

const WorldMap = dynamic(() => import('./WorldMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%', height: '65vh', borderRadius: 16,
      background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Indlæser kort…</div>
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
