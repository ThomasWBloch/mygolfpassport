import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import BackHeader from '@/components/BackHeader';
import CountryClusterMapWebView from '@/components/CountryClusterMapWebView';
import MapCountryAccordion from '@/components/MapCountryAccordion';
import WorldMapWebView from '@/components/WorldMapWebView';
import { useAuth } from '@/lib/auth-context';
import { resolveBackLabel } from '@/lib/back-labels';
import { bodyFont, displayFont } from '@/lib/fonts';
import { fetchCountryMapCourses, fetchMapData, type CountryGroup, type CountryMapCourse } from '@/lib/map';

/**
 * "My Map" — ported from apps/web/src/app/courses/CoursesMapView.tsx (web's
 * /map route redirects into /courses?view=map, same screen). World map via
 * WorldMapWebView, plus the country accordion listing every stamped course.
 *
 * Tapping a country marker drills into a per-course cluster map
 * (CountryClusterMapWebView) showing every displayable course in that
 * country — played ones in red, unplayed in green — ported from
 * apps/web/src/components/CountryClusterMap.tsx, which web only otherwise
 * surfaces from the Atlas country view, not from "My Map" itself.
 */
export default function MapScreen() {
  const { from } = useLocalSearchParams<{ from?: string }>();
  const router = useRouter();
  const { session } = useAuth();
  const userId = session?.user.id;

  const [data, setData] = useState<{ countries: CountryGroup[]; totalRounds: number; totalCountries: number } | null>(null);
  const [error, setError] = useState('');
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countryCourses, setCountryCourses] = useState<CountryMapCourse[] | null>(null);
  const [countryError, setCountryError] = useState('');
  const [showOnlyPlayed, setShowOnlyPlayed] = useState(true);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    fetchMapData(userId)
      .then((res) => { if (!cancelled) setData(res); })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load your map.'); });
    return () => { cancelled = true; };
  }, [userId]);

  useEffect(() => {
    if (!selectedCountry || !userId) return;
    let cancelled = false;
    setCountryCourses(null);
    setCountryError('');
    fetchCountryMapCourses(selectedCountry, userId)
      .then((res) => { if (!cancelled) setCountryCourses(res); })
      .catch((err) => { if (!cancelled) setCountryError(err instanceof Error ? err.message : 'Failed to load this country.'); });
    return () => { cancelled = true; };
  }, [selectedCountry, userId]);

  if (!userId) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.paper.cream }}>
      <BackHeader label={selectedCountry ?? resolveBackLabel(from, 'Back to courses')} />

      {selectedCountry ? (
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
          <Pressable onPress={() => setSelectedCountry(null)} style={{ alignSelf: 'flex-start' }}>
            <Text className="uppercase" style={{ color: colors.ink.tertiary, fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5 }}>
              ← All countries
            </Text>
          </Pressable>

          <View>
            <Text style={{ fontFamily: displayFont.medium, fontSize: 24, color: colors.ink.primary, marginBottom: 4, letterSpacing: -0.3 }}>
              {selectedCountry}
            </Text>
            {countryCourses && (
              <Text style={{ fontSize: 14, color: colors.ink.tertiary }}>
                {countryCourses.filter((c) => c.played).length} played · {countryCourses.length} courses in {selectedCountry}
              </Text>
            )}
          </View>

          {countryError.length > 0 && (
            <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular }}>{countryError}</Text>
          )}

          {!countryCourses && countryError.length === 0 && (
            <ActivityIndicator color={colors.accent.gold} style={{ marginTop: 20 }} />
          )}

          {countryCourses && (
            <>
              <Pressable
                accessibilityRole="button"
                onPress={() => setShowOnlyPlayed((v) => !v)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  alignSelf: 'flex-start',
                  borderWidth: 1,
                  borderColor: showOnlyPlayed ? colors.accent.goldDark : colors.border.paper,
                  borderRadius: 14,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
              >
                <View
                  style={{
                    width: 22,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: showOnlyPlayed ? colors.accent.goldDark : colors.border.paperStrong,
                    justifyContent: 'center',
                    paddingHorizontal: 1,
                    alignItems: showOnlyPlayed ? 'flex-end' : 'flex-start',
                  }}
                >
                  <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#fff' }} />
                </View>
                <Text
                  className="uppercase"
                  style={{ fontFamily: bodyFont.semibold, fontSize: 10, letterSpacing: 1, color: showOnlyPlayed ? colors.accent.goldDark : colors.ink.tertiary }}
                >
                  Show only played
                </Text>
              </Pressable>

              <CountryClusterMapWebView
                courses={countryCourses}
                onlyPlayed={showOnlyPlayed}
                onPressCourse={(id) => router.push(`/courses/${id}?from=courses`)}
              />
            </>
          )}
        </ScrollView>
      ) : (
        <>
          {error.length > 0 && (
            <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, padding: 16 }}>{error}</Text>
          )}

          {!data && error.length === 0 && (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator color={colors.accent.gold} />
            </View>
          )}

          {data && (
            <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
              <View>
                <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 2, color: colors.ink.tertiary, marginBottom: 6 }}>
                  Atlas
                </Text>
                <Text style={{ fontFamily: displayFont.medium, fontSize: 24, color: colors.ink.primary, marginBottom: 4, letterSpacing: -0.3 }}>
                  My map
                </Text>
                <Text style={{ fontSize: 14, color: colors.ink.tertiary }}>
                  All courses you&apos;ve stamped into your passport — tap a country to see every course there
                </Text>
              </View>

              {data.countries.length > 0 && (
                <WorldMapWebView
                  countries={data.countries}
                  totalRounds={data.totalRounds}
                  totalCountries={data.totalCountries}
                  onPressCountry={setSelectedCountry}
                />
              )}

              {data.countries.length > 0 ? (
                <View>
                  <Text
                    className="uppercase"
                    style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 2, color: colors.ink.tertiary, marginBottom: 10 }}
                  >
                    Countries visited
                  </Text>
                  <MapCountryAccordion
                    countries={data.countries}
                    expandedCountry={expandedCountry}
                    onToggle={(country) => setExpandedCountry((c) => (c === country ? null : country))}
                    onPressCourse={(id) => router.push(`/courses/${id}?from=courses`)}
                  />
                </View>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    padding: 32,
                    backgroundColor: colors.paper.white,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: colors.border.paper,
                  }}
                >
                  <Text style={{ fontSize: 32, marginBottom: 8 }}>🗺️</Text>
                  <Text style={{ fontFamily: displayFont.medium, fontSize: 20, color: colors.ink.primary, marginBottom: 6 }}>
                    No courses logged yet
                  </Text>
                  <Text style={{ fontSize: 14, color: colors.ink.tertiary, marginBottom: 16, textAlign: 'center' }}>
                    Log your first course to see it on the map.
                  </Text>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => router.push('/log')}
                    style={{ backgroundColor: colors.passport.cover, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24 }}
                  >
                    <Text className="uppercase" style={{ color: colors.ink.inverse, fontFamily: bodyFont.bold, fontSize: 12, letterSpacing: 1.5 }}>
                      Log course →
                    </Text>
                  </Pressable>
                </View>
              )}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
}
