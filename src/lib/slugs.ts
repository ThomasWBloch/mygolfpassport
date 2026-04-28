import { COUNTRY_NAMES } from './countries'

function baseSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ø/g, 'o')
    .replace(/æ/g, 'ae')
    .replace(/ß/g, 'ss')
    .replace(/ð/g, 'd')
    .replace(/þ/g, 'th')
    .replace(/ł/g, 'l')
    .replace(/['‘’ʼ`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function slugifyCountry(country: string): string {
  return baseSlug(country)
}

export function slugifyClub(club: string): string {
  return baseSlug(club)
}

const COUNTRY_BY_SLUG: ReadonlyMap<string, string> = new Map(
  COUNTRY_NAMES.map(name => [slugifyCountry(name), name])
)

export function countryFromSlug(slug: string): string | null {
  return COUNTRY_BY_SLUG.get(slug.toLowerCase()) ?? null
}
