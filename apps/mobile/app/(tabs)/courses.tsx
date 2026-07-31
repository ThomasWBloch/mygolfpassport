import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import CountryPicker from '@/components/CountryPicker';
import CourseGroupList from '@/components/CourseGroupList';
import NearbyCoursesPanel from '@/components/NearbyCoursesPanel';
import Pill from '@/components/Pill';
import TopBar from '@/components/TopBar';
import { fetchContinentCounts, fetchCountriesInContinent, type CountryStat } from '@/lib/atlas';
import { useAuth } from '@/lib/auth-context';
import { CONTINENT_KEYS, CONTINENT_LABELS, type ContinentKey } from '@/lib/continents';
import { groupByClub, groupByCountry } from '@/lib/course-groups';
import { fetchCourses, fetchPlayedCourses, searchCourses, type Course } from '@/lib/courses';
import { bodyFont, displayFont } from '@/lib/fonts';

type Mode = 'all' | 'played';
const CLUBS_PAGE_SIZE = 50;

export default function CoursesScreen() {
  const { session } = useAuth();
  const router = useRouter();
  const { mode: modeParam } = useLocalSearchParams<{ mode?: string }>();
  const [mode, setMode] = useState<Mode>(modeParam === 'played' ? 'played' : 'all');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [country, setCountry] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [playedIds, setPlayedIds] = useState<Set<string>>(new Set());
  const [displayLimit, setDisplayLimit] = useState(CLUBS_PAGE_SIZE);

  // Atlas overview/continent drill-down — only relevant in "All" mode when
  // no country is selected and no search is active (the browsing default,
  // matching web's AtlasOverview/AtlasContinent instead of dumping every
  // course into one flat list).
  const [continent, setContinent] = useState<ContinentKey | null>(null);
  const [continentCounts, setContinentCounts] = useState<Record<ContinentKey, number> | null>(null);
  const [countriesInContinent, setCountriesInContinent] = useState<CountryStat[] | null>(null);

  const showingAtlas = mode === 'all' && !country && debouncedQuery.length < 2;

  // The Courses tab stays mounted across tab switches, so a fresh
  // ?mode=played navigation (e.g. from PassportCard's Courses stat) needs
  // to re-sync local state, not just seed the initial useState value.
  useEffect(() => {
    if (modeParam === 'played') setMode('played');
  }, [modeParam]);

  // Debounce the search box — wait 300ms after typing stops before querying.
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (showingAtlas) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    setDisplayLimit(CLUBS_PAGE_SIZE);

    const load = async () => {
      if (mode === 'played') {
        if (!session?.user) return [];
        return fetchPlayedCourses(session.user.id);
      }
      return debouncedQuery.length >= 2 ? searchCourses(debouncedQuery, country) : fetchCourses(country);
    };

    load()
      .then((result) => { if (!cancelled) setCourses(result); })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load courses.'); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [mode, debouncedQuery, country, session?.user, showingAtlas]);

  // Atlas State 0 — continent totals, fetched once.
  useEffect(() => {
    fetchContinentCounts()
      .then(setContinentCounts)
      .catch(() => setContinentCounts(null));
  }, []);

  // Atlas State 1 — countries inside the selected continent.
  useEffect(() => {
    if (!continent || !session?.user) return;
    let cancelled = false;
    setCountriesInContinent(null);
    fetchCountriesInContinent(continent, session.user.id)
      .then((result) => { if (!cancelled) setCountriesInContinent(result); })
      .catch(() => { if (!cancelled) setCountriesInContinent([]); });
    return () => { cancelled = true; };
  }, [continent, session?.user]);

  // Marks already-logged courses with a "Played" stamp in All mode — fetched
  // once per user, independent of search/mode, since it never changes.
  useEffect(() => {
    if (!session?.user) return;
    let cancelled = false;
    fetchPlayedCourses(session.user.id)
      .then((played) => { if (!cancelled) setPlayedIds(new Set(played.map((c) => c.id))); })
      .catch(() => { if (!cancelled) setPlayedIds(new Set()); });
    return () => { cancelled = true; };
  }, [session?.user]);

  const showingFirst2000 = mode === 'all' && debouncedQuery.length < 2;
  const groups = courses ? (mode === 'all' ? groupByClub(courses) : groupByCountry(courses)) : [];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.paper.cream }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TopBar />

      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Pill label="All" active={mode === 'all'} onPress={() => setMode('all')} />
          <Pill label="Played" active={mode === 'played'} onPress={() => setMode('played')} />
          <Pill label="My Map" active={false} onPress={() => router.push('/map?from=courses')} />
        </View>

        {mode === 'all' && (
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
            <CountryPicker
              value={country}
              onChange={(c) => { setCountry(c); setContinent(null); }}
            />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search by name or club…"
              placeholderTextColor={colors.ink.tertiary}
              autoCapitalize="none"
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: colors.border.paper,
                backgroundColor: colors.paper.white,
                borderRadius: 8,
                paddingHorizontal: 14,
                paddingVertical: 10,
                fontFamily: bodyFont.regular,
                fontSize: 15,
                color: colors.ink.primary,
              }}
            />
          </View>
        )}

        {!showingAtlas && courses && (
          <Text style={{ color: colors.ink.tertiary, fontFamily: bodyFont.regular, fontSize: 13, marginTop: 10 }}>
            {Math.min(displayLimit, groups.length)} of {groups.length} club{groups.length === 1 ? '' : 's'}
            {showingFirst2000 && courses.length >= 2000 ? ' (showing first 2000 — search to narrow)' : ''}
          </Text>
        )}
      </View>

      {error.length > 0 && (
        <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, paddingHorizontal: 20 }}>
          {error}
        </Text>
      )}

      {showingAtlas ? (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
          <NearbyCoursesPanel onSelectCourse={(c) => router.push(`/courses/${c.id}?from=courses`)} />

          {continent ? (
            <>
              <Pressable onPress={() => setContinent(null)} style={{ marginBottom: 14 }}>
                <Text className="uppercase" style={{ color: colors.ink.tertiary, fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5 }}>
                  ← All continents
                </Text>
              </Pressable>
              <Text style={{ color: colors.ink.primary, fontFamily: displayFont.medium, fontSize: 22, marginBottom: 14 }}>
                {CONTINENT_LABELS[continent]}
              </Text>
              {countriesInContinent === null ? (
                <ActivityIndicator color={colors.accent.gold} style={{ marginTop: 20 }} />
              ) : countriesInContinent.length === 0 ? (
                <Text style={{ color: colors.ink.tertiary, fontFamily: bodyFont.regular, textAlign: 'center', marginTop: 24 }}>
                  No courses with coordinates in this continent yet.
                </Text>
              ) : (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {countriesInContinent.map((c) => {
                    const hasPlayed = c.playedCount > 0;
                    return (
                      <Pressable
                        key={c.country}
                        onPress={() => setCountry(c.country)}
                        style={{
                          width: '48%',
                          backgroundColor: colors.paper.white,
                          borderWidth: 1,
                          borderColor: colors.border.paper,
                          borderRadius: 10,
                          padding: 12,
                          gap: 6,
                          opacity: hasPlayed ? 1 : 0.65,
                        }}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <Text style={{ fontSize: 18 }}>{c.flag ?? '🌍'}</Text>
                          <Text numberOfLines={1} style={{ flex: 1, fontFamily: displayFont.medium, fontSize: 15, color: colors.ink.primary }}>
                            {c.country}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.tertiary }}>
                            {c.count.toLocaleString('en-US')} {c.count === 1 ? 'course' : 'courses'}
                          </Text>
                          {hasPlayed && (
                            <View style={{ borderWidth: 1, borderStyle: 'dashed', borderColor: colors.stamp.red, borderRadius: 4, paddingHorizontal: 5, paddingVertical: 1 }}>
                              <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 10, letterSpacing: 1, color: colors.stamp.red }}>
                                ✓ {c.playedCount}
                              </Text>
                            </View>
                          )}
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </>
          ) : (
            <>
              <Text className="uppercase" style={{ color: colors.ink.tertiary, fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 2, marginBottom: 10 }}>
                Continents
              </Text>
              {continentCounts === null ? (
                <ActivityIndicator color={colors.accent.gold} style={{ marginTop: 8 }} />
              ) : (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                  {CONTINENT_KEYS.map((key) => (
                    <Pressable
                      key={key}
                      onPress={() => setContinent(key)}
                      style={{
                        width: '48%',
                        minHeight: 100,
                        backgroundColor: colors.paper.creamWarm,
                        borderWidth: 1,
                        borderColor: colors.border.paper,
                        borderRadius: 12,
                        padding: 14,
                        justifyContent: 'space-between',
                        gap: 18,
                      }}
                    >
                      <Text style={{ fontFamily: displayFont.medium, fontSize: 19, color: colors.ink.primary, letterSpacing: -0.2 }}>
                        {CONTINENT_LABELS[key]}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.tertiary }}>
                          {(continentCounts[key] ?? 0) === 1 ? 'course' : 'courses'}
                        </Text>
                        <Text style={{ fontFamily: displayFont.medium, fontSize: 18, color: colors.ink.primary }}>
                          {(continentCounts[key] ?? 0).toLocaleString('en-US')}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </>
          )}
        </ScrollView>
      ) : (
        <>
          {loading && (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator color={colors.accent.gold} />
            </View>
          )}

          {!loading && courses && courses.length === 0 && (
            <Text style={{ color: colors.ink.tertiary, fontFamily: bodyFont.regular, textAlign: 'center', marginTop: 24 }}>
              {mode === 'played' ? "You haven't logged any rounds yet." : 'No courses match your search.'}
            </Text>
          )}

          {!loading && courses && courses.length > 0 && (
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
              {mode === 'all' && country && (
                <Pressable onPress={() => setCountry(null)} style={{ marginBottom: 12 }}>
                  <Text className="uppercase" style={{ color: colors.ink.tertiary, fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5 }}>
                    ← Atlas
                  </Text>
                </Pressable>
              )}
              <CourseGroupList
                groups={groups}
                displayLimit={displayLimit}
                pageSize={CLUBS_PAGE_SIZE}
                onLoadMore={() => setDisplayLimit((n) => n + CLUBS_PAGE_SIZE)}
                mode="browse"
                rowLabel={mode === 'played' ? 'club' : 'course'}
                showPlayedStamp={mode === 'all'}
                playedIds={playedIds}
                onPressCourse={(course) => router.push(`/courses/${course.id}?from=courses`)}
              />
            </ScrollView>
          )}
        </>
      )}
    </KeyboardAvoidingView>
  );
}
