'use client'

import dynamic from 'next/dynamic'
import type { AtlasCourseMarker } from '@/components/CountryClusterMap'

/**
 * Client wrapper for the Atlas country-state map. Dynamic-imports
 * CountryClusterMap with ssr:false (Leaflet needs `window`), and shows
 * the same stamp-styled "Loading map…" stub MapWrapper does while the
 * chunk arrives.
 */

const CountryClusterMap = dynamic(
  () => import('@/components/CountryClusterMap'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: '100%',
          height: 'min(60vh, 520px)',
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
  },
)

interface Props {
  courses: AtlasCourseMarker[]
  country: string
}

export default function AtlasCountryMapView(props: Props) {
  return <CountryClusterMap {...props} />
}
