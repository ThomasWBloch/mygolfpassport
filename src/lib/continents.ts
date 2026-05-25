/**
 * Continent buckets for the Course Atlas and any other UI that needs to
 * roll countries up to a coarser geography. Every country in
 * [countries.ts](./countries.ts) maps to exactly one of the six keys
 * below — UK subdivisions (England, Scotland, Wales, Northern Ireland)
 * and Ireland live in `eu`; Russia in `eu`; Turkey in `as`; Caribbean
 * islands (Bahamas, Bermuda, Cayman Islands, Puerto Rico, etc.) in `na`;
 * Trinidad and Tobago in `sa`. Antarctica is intentionally excluded.
 *
 * `getContinent` keeps the older string-label API (returns "Europe",
 * "Other", etc.) so badges.ts and SocialLeaderboardView don't have to
 * change shape. It also tolerates a few user-typed aliases that aren't
 * canonical course-table values (Czechia, UK, United Kingdom, UAE,
 * United States, Danish names) so home_country strings from profile
 * forms still bucket correctly.
 */

import type { LatLngBoundsExpression } from 'leaflet'

export const CONTINENT_KEYS = ['na', 'sa', 'eu', 'af', 'as', 'oc'] as const
export type ContinentKey = (typeof CONTINENT_KEYS)[number]

export const CONTINENT_LABELS: Record<ContinentKey, string> = {
  na: 'North America',
  sa: 'South America',
  eu: 'Europe',
  af: 'Africa',
  as: 'Asia',
  oc: 'Oceania',
}

/**
 * Conservative geographic bounds, padded so the whole continent stays
 * visible inside a typical mobile viewport. [SW, NE] order.
 */
export const CONTINENT_BOUNDS: Record<ContinentKey, LatLngBoundsExpression> = {
  na: [[7, -170], [72, -50]],
  sa: [[-56, -82], [13, -34]],
  eu: [[35, -25], [72, 45]],
  af: [[-35, -20], [37, 52]],
  as: [[-10, 25], [78, 180]],
  oc: [[-48, 110], [0, 180]],
}

export const COUNTRY_TO_CONTINENT: Record<string, ContinentKey> = {
  // Africa
  Algeria: 'af',
  Angola: 'af',
  Benin: 'af',
  Botswana: 'af',
  Burundi: 'af',
  Cameroon: 'af',
  Chad: 'af',
  Egypt: 'af',
  'Equatorial Guinea': 'af',
  Ethiopia: 'af',
  Ghana: 'af',
  Kenya: 'af',
  Madagascar: 'af',
  Malawi: 'af',
  Mauritius: 'af',
  Morocco: 'af',
  Mozambique: 'af',
  Namibia: 'af',
  Nigeria: 'af',
  Rwanda: 'af',
  Senegal: 'af',
  Seychelles: 'af',
  'Sierra Leone': 'af',
  'South Africa': 'af',
  Tanzania: 'af',
  Togo: 'af',
  Tunisia: 'af',
  Uganda: 'af',
  Zambia: 'af',
  Zimbabwe: 'af',

  // Asia
  Afghanistan: 'as',
  Azerbaijan: 'as',
  Bahrain: 'as',
  Bangladesh: 'as',
  Bhutan: 'as',
  Brunei: 'as',
  Cambodia: 'as',
  China: 'as',
  Georgia: 'as',
  'Hong Kong': 'as',
  India: 'as',
  Indonesia: 'as',
  Iran: 'as',
  Israel: 'as',
  Japan: 'as',
  Jordan: 'as',
  Kazakhstan: 'as',
  Kuwait: 'as',
  Laos: 'as',
  Lebanon: 'as',
  Macau: 'as',
  Malaysia: 'as',
  Maldives: 'as',
  Myanmar: 'as',
  Oman: 'as',
  Pakistan: 'as',
  Philippines: 'as',
  Qatar: 'as',
  'Saudi Arabia': 'as',
  Singapore: 'as',
  'South Korea': 'as',
  'Sri Lanka': 'as',
  Taiwan: 'as',
  Thailand: 'as',
  Turkey: 'as',
  'United Arab Emirates': 'as',
  Uzbekistan: 'as',
  Vietnam: 'as',

  // Europe (incl. UK subdivisions, Ireland, Russia, Cyprus)
  Albania: 'eu',
  Andorra: 'eu',
  Austria: 'eu',
  Belarus: 'eu',
  Belgium: 'eu',
  Bulgaria: 'eu',
  Croatia: 'eu',
  Cyprus: 'eu',
  'Czech Republic': 'eu',
  Denmark: 'eu',
  England: 'eu',
  Estonia: 'eu',
  Finland: 'eu',
  France: 'eu',
  Germany: 'eu',
  Greece: 'eu',
  Hungary: 'eu',
  Iceland: 'eu',
  Ireland: 'eu',
  Italy: 'eu',
  Latvia: 'eu',
  Lithuania: 'eu',
  Luxembourg: 'eu',
  Malta: 'eu',
  Netherlands: 'eu',
  'Northern Ireland': 'eu',
  Norway: 'eu',
  Poland: 'eu',
  Portugal: 'eu',
  Romania: 'eu',
  Russia: 'eu',
  Scotland: 'eu',
  Serbia: 'eu',
  Slovakia: 'eu',
  Slovenia: 'eu',
  Spain: 'eu',
  Sweden: 'eu',
  Switzerland: 'eu',
  Ukraine: 'eu',
  Wales: 'eu',

  // North America (incl. Caribbean except Trinidad & Tobago)
  Bahamas: 'na',
  Barbados: 'na',
  Belize: 'na',
  Bermuda: 'na',
  Canada: 'na',
  'Cayman Islands': 'na',
  'Costa Rica': 'na',
  Cuba: 'na',
  'Dominican Republic': 'na',
  'El Salvador': 'na',
  Guatemala: 'na',
  Haiti: 'na',
  Honduras: 'na',
  Jamaica: 'na',
  Mexico: 'na',
  Nicaragua: 'na',
  Panama: 'na',
  'Puerto Rico': 'na',
  'Saint Kitts and Nevis': 'na',
  'Saint Lucia': 'na',
  USA: 'na',

  // South America (incl. Trinidad & Tobago per spec)
  Argentina: 'sa',
  Bolivia: 'sa',
  Brazil: 'sa',
  Chile: 'sa',
  Colombia: 'sa',
  Ecuador: 'sa',
  Guyana: 'sa',
  Paraguay: 'sa',
  Peru: 'sa',
  Suriname: 'sa',
  'Trinidad and Tobago': 'sa',
  Uruguay: 'sa',
  Venezuela: 'sa',

  // Oceania
  Australia: 'oc',
  Fiji: 'oc',
  'New Zealand': 'oc',
  'Papua New Guinea': 'oc',
  Samoa: 'oc',
  'Solomon Islands': 'oc',
  Vanuatu: 'oc',
}

/**
 * Aliases for free-text country values (profile.home_country, older
 * Danish-named imports) that aren't canonical entries in
 * COUNTRY_TO_CONTINENT but still need to bucket correctly.
 */
const COUNTRY_ALIASES: Record<string, ContinentKey> = {
  Czechia: 'eu',
  UK: 'eu',
  'United Kingdom': 'eu',
  'United States': 'na',
  UAE: 'as',
  Danmark: 'eu',
  Sverige: 'eu',
  Skotland: 'eu',
  Irland: 'eu',
  Frankrig: 'eu',
  Tyskland: 'eu',
  Spanien: 'eu',
  Italien: 'eu',
  Holland: 'eu',
  Norge: 'eu',
  Belgien: 'eu',
  Schweiz: 'eu',
  Østrig: 'eu',
  Polen: 'eu',
  Tjekkiet: 'eu',
  Grækenland: 'eu',
  Tyrkiet: 'as',
}

export function countryContinent(country: string): ContinentKey | null {
  return COUNTRY_TO_CONTINENT[country] ?? COUNTRY_ALIASES[country] ?? null
}

export function isContinentKey(value: string): value is ContinentKey {
  return (CONTINENT_KEYS as readonly string[]).includes(value)
}

/**
 * Legacy string-label API kept for badges.ts and SocialLeaderboardView,
 * which count distinct continents and need a stable bucket name.
 * Returns "Other" when a country doesn't resolve — keeps the bucket
 * count honest if a stray value sneaks in.
 */
export function getContinent(country: string): string {
  const key = countryContinent(country)
  return key ? CONTINENT_LABELS[key] : 'Other'
}
