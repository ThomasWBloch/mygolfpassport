import { COUNTRY_FLAGS } from './countries';
import { COUNTRY_TO_CONTINENT, countryContinent, type ContinentKey } from './continents';
import { supabase } from './supabase';

export type CountryStat = {
  country: string;
  flag: string | null;
  count: number;
  playedCount: number;
};

type RoundCountryRow = { courses: { country: string | null } | { country: string | null }[] | null };

async function fetchCountryRollup(): Promise<Map<string, number>> {
  const { data, error } = await supabase.from('country_rollup').select('country, course_count');
  if (error) throw error;
  return new Map((data ?? []).map((r) => [r.country as string, r.course_count as number]));
}

async function fetchPlayedCountByCountry(userId: string): Promise<Map<string, number>> {
  const { data, error } = await supabase
    .from('rounds')
    .select('courses(country)')
    .eq('user_id', userId)
    .returns<RoundCountryRow[]>();
  if (error) throw error;

  const byCountry = new Map<string, number>();
  for (const row of data ?? []) {
    const country = Array.isArray(row.courses) ? (row.courses[0]?.country ?? null) : (row.courses?.country ?? null);
    if (country) byCountry.set(country, (byCountry.get(country) ?? 0) + 1);
  }
  return byCountry;
}

/** Per-continent course totals — mirrors web's Atlas State 0 overview. */
export async function fetchContinentCounts(): Promise<Record<ContinentKey, number>> {
  const rollup = await fetchCountryRollup();
  const counts: Record<ContinentKey, number> = { na: 0, sa: 0, eu: 0, af: 0, as: 0, oc: 0 };
  for (const [country, count] of rollup) {
    const key = countryContinent(country);
    if (key) counts[key] += count;
  }
  return counts;
}

/** Countries inside one continent, with played counts — mirrors Atlas State 1. */
export async function fetchCountriesInContinent(continent: ContinentKey, userId: string): Promise<CountryStat[]> {
  const [rollup, played] = await Promise.all([fetchCountryRollup(), fetchPlayedCountByCountry(userId)]);
  const names = Object.entries(COUNTRY_TO_CONTINENT)
    .filter(([, key]) => key === continent)
    .map(([name]) => name);

  return names
    .map((name) => ({
      country: name,
      flag: COUNTRY_FLAGS[name] ?? null,
      count: rollup.get(name) ?? 0,
      playedCount: played.get(name) ?? 0,
    }))
    .filter((c) => c.count > 0)
    .sort((a, b) => a.country.localeCompare(b.country));
}
