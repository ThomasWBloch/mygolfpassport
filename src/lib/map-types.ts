/**
 * Shared types for the world-map components. Lives in /lib so the map UI
 * (MapWrapper, WorldMap, CountryAccordion) can keep importing the type
 * after the original /app/map page was reduced to a redirect.
 */

export type CountryGroup = {
  country: string
  flag: string
  lat: number
  lng: number
  count: number
  courses: { id: string; name: string; club: string | null; rating: number | null }[]
}
