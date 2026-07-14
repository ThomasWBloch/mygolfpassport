import { slugifyClub, slugifyCountry } from './slugs'

export function buildClubHref(country: string | null | undefined, club: string | null | undefined): string | null {
  if (!country || !club) return null
  const c = slugifyCountry(country)
  const k = slugifyClub(club)
  if (!c || !k) return null
  return `/clubs/${c}/${k}`
}
