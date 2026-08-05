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
  const { from, userId: friendUserId, name: friendName } = useLocalSearchParams<{
    from?: string;
    userId?: string;
    name?: string;
  }>();
  const router = useRouter();
  const { session } = useAuth();
  const ownUserId = session?.user.id;
  const userId = friendUserId || ownUserId;
  const isFriendMap = !!friendUserId;

  const [data, setData] = useState<{ countries: CountryGroup[]; totalRounds: number; totalCountries: number } | null>(null);
  const [error, setError] = useState('');
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countryCourses, setCountryCourses] = useState<CountryMapCourse[] | null>(null);
  const [countryError, setCountryError] = useState('');
  const [showPlayed, setShowPlayed] = useState(true);
  const [showUnplayed, setShowUnplayed] = useState(false);

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
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <MapFilterCheckbox label="Show played" checked={showPlayed} onPress={() => setShowPlayed((v) => !v)} />
                <MapFilterCheckbox label="Show unplayed" checked={showUnplayed} onPress={() => setShowUnplayed((v) => !v)} />
              </View>

              <CountryClusterMapWebView
                courses={countryCourses}
                showPlayed={showPlayed}
                showUnplayed={showUnplayed}
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
                  {isFriendMap ? `${friendName}'s map` : 'My map'}
                </Text>
                <Text style={{ fontSize: 14, color: colors.ink.tertiary }}>
                  {isFriendMap
                    ? `All courses ${friendName} has stamped into their passport — tap a country to see every course there`
                    : "All courses you've stamped into your passport — tap a country to see every course there"}
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
                    {isFriendMap ? `${friendName} hasn't logged any courses yet` : 'No courses logged yet'}
                  </Text>
                  {!isFriendMap && (
                    <>
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
                    </>
                  )}
                </View>
              )}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
}

function MapFilterCheckbox({ label, checked, onPress }: { label: string; checked: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: checked ? colors.accent.goldDark : colors.border.paper,
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 4,
      }}
    >
      <View
        style={{
          width: 14,
          height: 14,
          borderRadius: 3,
          borderWidth: 1.5,
          borderColor: checked ? colors.accent.goldDark : colors.border.paperStrong,
          backgroundColor: checked ? colors.accent.goldDark : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700', lineHeight: 12 }}>✓</Text>}
      </View>
      <Text
        className="uppercase"
        style={{ fontFamily: bodyFont.semibold, fontSize: 10, letterSpacing: 1, color: checked ? colors.accent.goldDark : colors.ink.tertiary }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
