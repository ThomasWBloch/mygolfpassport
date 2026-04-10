/**
 * Maps country names (as stored in the courses table) to continents.
 * Handles both Danish and English country names from the database.
 */
const COUNTRY_TO_CONTINENT: Record<string, string> = {
  // Europe — Danish names
  'Danmark': 'Europe',
  'Sverige': 'Europe',
  'Skotland': 'Europe',
  'Irland': 'Europe',
  'Frankrig': 'Europe',
  'Tyskland': 'Europe',
  'Spanien': 'Europe',
  'Italien': 'Europe',
  'Holland': 'Europe',
  'Norge': 'Europe',
  'Finland': 'Europe',
  'Belgien': 'Europe',
  'Schweiz': 'Europe',
  'Østrig': 'Europe',
  'Polen': 'Europe',
  'Tjekkiet': 'Europe',
  'Grækenland': 'Europe',
  'Tyrkiet': 'Europe',
  'Portugal': 'Europe',

  // Europe — English names
  'Denmark': 'Europe',
  'Sweden': 'Europe',
  'Scotland': 'Europe',
  'Ireland': 'Europe',
  'Northern Ireland': 'Europe',
  'England': 'Europe',
  'Wales': 'Europe',
  'France': 'Europe',
  'Germany': 'Europe',
  'Spain': 'Europe',
  'Italy': 'Europe',
  'Netherlands': 'Europe',
  'Norway': 'Europe',
  'Belgium': 'Europe',
  'Switzerland': 'Europe',
  'Austria': 'Europe',
  'Poland': 'Europe',
  'Czech Republic': 'Europe',
  'Czechia': 'Europe',
  'Greece': 'Europe',
  'Turkey': 'Europe',
  'Iceland': 'Europe',
  'United Kingdom': 'Europe',
  'UK': 'Europe',

  // North America
  'USA': 'North America',
  'United States': 'North America',
  'Canada': 'North America',
  'Mexico': 'North America',

  // Asia
  'Japan': 'Asia',
  'South Korea': 'Asia',
  'China': 'Asia',
  'Thailand': 'Asia',
  'Vietnam': 'Asia',
  'India': 'Asia',
  'UAE': 'Asia',
  'United Arab Emirates': 'Asia',

  // Africa
  'South Africa': 'Africa',
  'Morocco': 'Africa',
  'Kenya': 'Africa',
  'Egypt': 'Africa',

  // Oceania
  'Australia': 'Oceania',
  'New Zealand': 'Oceania',

  // South America
  'Argentina': 'South America',
  'Brazil': 'South America',
  'Colombia': 'South America',
}

export function getContinent(country: string): string {
  return COUNTRY_TO_CONTINENT[country] ?? 'Other'
}
