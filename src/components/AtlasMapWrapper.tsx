'use client'

import dynamic from 'next/dynamic'
import type { LatLngBoundsExpression } from 'leaflet'
import type { CountryGroup } from '@/lib/map-types'
import type { ContinentKey } from '@/lib/continents'

const AtlasWorldMap = dynamic(() => import('./AtlasWorldMap'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: 'min(50vh, 420px)',
        borderRadius: 16,
        background: 'var(--color-mgp-cream-warm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          color: 'var(--color-mgp-ink-3)',
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 11,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
        }}
      >
        Loading map…
      </div>
    </div>
  ),
})

interface Props {
  countries: CountryGroup[]
  totalRounds: number
  totalCountries: number
  activeContinent: ContinentKey | null
  bounds: LatLngBoundsExpression | null
}

export default function AtlasMapWrapper(props: Props) {
  return <AtlasWorldMap {...props} />
}
