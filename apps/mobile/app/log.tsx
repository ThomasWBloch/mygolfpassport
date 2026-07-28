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
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import { colors } from '@mygolfpassport/shared';

import Confetti from '@/components/Confetti';
import CountryPicker from '@/components/CountryPicker';
import CourseGroupList from '@/components/CourseGroupList';
import PassportStamp from '@/components/PassportStamp';
import { useAuth } from '@/lib/auth-context';
import { getContinent } from '@/lib/continents';
import { groupByClub } from '@/lib/course-groups';
import { courseDisplayLabel, courseSecondaryLabel, usStateSuffix } from '@/lib/course-display';
import {
  fetchCourseById,
  fetchCourses,
  fetchLastRoundCoords,
  fetchNearbyCourses,
  searchCourses,
  type Course,
  type NearbyCourse,
} from '@/lib/courses';
import { COUNTRY_FLAGS } from '@/lib/countries';
import { bodyFont, displayFont } from '@/lib/fonts';
import { fetchPrevCountries, logRound } from '@/lib/log';

type Step = 'search' | 'detail' | 'success';
const CLUBS_PAGE_SIZE = 50;

// "YYYY-MM-DD" parsed/formatted using local Y/M/D throughout — avoids the
// classic new Date(iso).toISOString() UTC round-trip shifting the date by a
// day depending on the device's timezone offset.
function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function fromIsoDate(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

function todayIso(): string {
  return toIsoDate(new Date());
}

function formatPlayedAt(iso: string): string {
  return fromIsoDate(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function LogScreen() {
  const { session } = useAuth();
  const userId = session?.user.id;
  const router = useRouter();
  const { course: prefillCourseId } = useLocalSearchParams<{ course?: string }>();

  const [step, setStep] = useState<Step>('search');
  const [selected, setSelected] = useState<Course | null>(null);

  // Search step
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<Course[] | null>(null);
  const [searching, setSearching] = useState(true);
  const [country, setCountry] = useState<string | null>(null);
  const [displayLimit, setDisplayLimit] = useState(CLUBS_PAGE_SIZE);
  const [nearbyCourses, setNearbyCourses] = useState<NearbyCourse[] | null>(null);
  const [nearbyError, setNearbyError] = useState(false);

  // Detail step
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState('');
  const [playedAt, setPlayedAt] = useState(todayIso());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Success step — territory banner
  const [isNewCountry, setIsNewCountry] = useState(false);
  const [isNewContinent, setIsNewContinent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    let cancelled = false;
    setSearching(true);
    setDisplayLimit(CLUBS_PAGE_SIZE);
    const load = debouncedQuery.length >= 2 ? searchCourses(debouncedQuery, country) : fetchCourses(country);
    load
      .then((result) => { if (!cancelled) setResults(result); })
      .catch(() => { if (!cancelled) setResults([]); })
      .finally(() => { if (!cancelled) setSearching(false); });
    return () => { cancelled = true; };
  }, [debouncedQuery, country]);

  // "Courses near you" — requests device geolocation once on mount. If
  // denied/unavailable, falls back to the user's last-round coordinates
  // (native-only per memory project_log_nearby_fallback — web deliberately
  // has no such fallback since browser geolocation denial is a much weaker
  // signal than a native permission denial).
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    (async () => {
      try {
        let coords: { lat: number; lng: number } | null = null;
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
          coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        } else {
          coords = await fetchLastRoundCoords(userId);
        }
        if (cancelled) return;
        if (!coords) { setNearbyCourses([]); return; }
        const nearby = await fetchNearbyCourses(userId, coords.lat, coords.lng, 5);
        if (!cancelled) setNearbyCourses(nearby);
      } catch {
        if (!cancelled) { setNearbyError(true); setNearbyCourses([]); }
      }
    })();

    return () => { cancelled = true; };
  }, [userId]);

  function pickCourse(course: Course) {
    setSelected(course);
    setRating(0);
    setNote('');
    setPlayedAt(todayIso());
    setSaveError('');
    setStep('detail');
  }

  // Arriving via /log?course=<id> (e.g. the course detail screen's "Log
  // new round" / "Stamp here" actions) skips straight to the detail step
  // instead of the search step.
  useEffect(() => {
    if (!prefillCourseId) return;
    let cancelled = false;
    fetchCourseById(prefillCourseId)
      .then((course) => { if (!cancelled && course) pickCourse(course); })
      .catch(() => {});
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillCourseId]);

  // NearbyCourse doesn't carry `holes` (the nearby query doesn't select it) —
  // not needed to log a round, so it's fine to leave null here.
  function pickNearbyCourse(course: NearbyCourse) {
    pickCourse({ ...course, holes: null });
  }

  function resetToSearch() {
    setStep('search');
    setSelected(null);
    setRating(0);
    setNote('');
    setPlayedAt(todayIso());
    setSaveError('');
    setIsNewCountry(false);
    setIsNewContinent(false);
  }

  async function handleSave() {
    if (!selected || !userId) return;
    setSaving(true);
    setSaveError('');
    try {
      await logRound({
        userId,
        courseId: selected.id,
        rating: rating || null,
        note: note.trim() || null,
        playedAt,
      });

      const prevCountries = await fetchPrevCountries(userId, selected.id);
      const newCountry = !!selected.country && !prevCountries.includes(selected.country);
      const selectedContinent = selected.country ? getContinent(selected.country) : 'Other';
      const prevContinents = new Set(prevCountries.map((c) => getContinent(c)));
      const newContinent = newCountry && selectedContinent !== 'Other' && !prevContinents.has(selectedContinent);
      setIsNewCountry(newCountry);
      setIsNewContinent(newContinent);

      setStep('success');
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Could not save this round.');
    } finally {
      setSaving(false);
    }
  }

  if (!userId) return null;

  if (step === 'search') {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.paper.cream, paddingTop: 20 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ color: colors.passport.cover, fontFamily: displayFont.semibold, fontSize: 26, marginBottom: 14 }}>
            Log a round
          </Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
            <CountryPicker value={country} onChange={setCountry} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search by name or club…"
              placeholderTextColor={colors.ink.tertiary}
              autoCapitalize="none"
              autoFocus
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
        </View>

        {searching && <ActivityIndicator color={colors.accent.gold} style={{ marginTop: 20 }} />}

        {!searching && results && (
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
            {debouncedQuery.length < 2 && (
              <>
                {nearbyCourses && nearbyCourses.length > 0 && (
                  <View style={{ marginBottom: 16 }}>
                    <Text
                      className="uppercase"
                      style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 2, color: colors.ink.tertiary, marginBottom: 8 }}
                    >
                      Courses near you
                    </Text>
                    <View
                      style={{
                        backgroundColor: colors.paper.white,
                        borderWidth: 1,
                        borderColor: colors.border.paper,
                        borderRadius: 8,
                        overflow: 'hidden',
                      }}
                    >
                      {nearbyCourses.map((c, i) => (
                        <Pressable
                          key={c.id}
                          onPress={() => pickNearbyCourse(c)}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 10,
                            padding: 14,
                            borderBottomWidth: i < nearbyCourses.length - 1 ? 1 : 0,
                            borderBottomColor: colors.border.paperFaint,
                          }}
                        >
                          <View style={{ flex: 1, minWidth: 0 }}>
                            <Text
                              numberOfLines={1}
                              style={{ fontFamily: displayFont.medium, fontSize: 15, color: colors.ink.primary }}
                            >
                              {c.flag ? `${c.flag} ` : ''}{c.club ?? c.name}
                            </Text>
                            {c.club && c.club !== c.name && (
                              <Text
                                className="uppercase"
                                numberOfLines={1}
                                style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.tertiary, marginTop: 2 }}
                              >
                                {c.name}
                              </Text>
                            )}
                          </View>
                          <Text style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1, color: colors.ink.secondary }}>
                            {c.distanceKm} km
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                )}
                {nearbyCourses === null && !nearbyError && (
                  <Text
                    className="uppercase"
                    style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.tertiary, marginBottom: 12 }}
                  >
                    Looking around you…
                  </Text>
                )}
              </>
            )}

            <CourseGroupList
              groups={groupByClub(results)}
              displayLimit={displayLimit}
              pageSize={CLUBS_PAGE_SIZE}
              onLoadMore={() => setDisplayLimit((n) => n + CLUBS_PAGE_SIZE)}
              mode="log"
              onSelectCourse={pickCourse}
            />
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    );
  }

  if (step === 'detail' && selected) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.paper.cream }} contentContainerStyle={{ padding: 20 }}>
        <Pressable onPress={resetToSearch} style={{ marginBottom: 16 }}>
          <Text style={{ color: colors.accent.goldDark, fontFamily: bodyFont.semibold, fontSize: 14 }}>
            ← Search again
          </Text>
        </Pressable>

        <View
          style={{
            backgroundColor: colors.passport.cover,
            borderRadius: 8,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <Text style={{ color: colors.ink.inverse, fontFamily: displayFont.semibold, fontSize: 22 }}>
            {courseDisplayLabel({ courseName: selected.name, clubName: selected.club })}
          </Text>
          <Text style={{ color: colors.ink.inverseSoft, fontFamily: bodyFont.regular, fontSize: 13, marginTop: 4 }}>
            {[
              courseSecondaryLabel({ courseName: selected.name, clubName: selected.club }),
              `${selected.country ?? ''}${usStateSuffix(selected.country, selected.state)}` || null,
              selected.holes ? `${selected.holes} holes` : null,
            ]
              .filter(Boolean)
              .join(' · ')}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.paper.white,
            borderWidth: 1,
            borderColor: colors.border.paper,
            borderRadius: 8,
            padding: 16,
            marginBottom: 14,
          }}
        >
          <Text
            className="uppercase"
            style={{ color: colors.ink.tertiary, fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, marginBottom: 10 }}
          >
            Your rating (optional)
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
              <Pressable key={v} onPress={() => setRating(rating === v ? 0 : v)}>
                <Text style={{ fontSize: 24, lineHeight: 26, color: v <= rating ? colors.accent.gold : colors.border.paperFaint }}>
                  ★
                </Text>
              </Pressable>
            ))}
          </View>
          {rating > 0 && (
            <Text style={{ color: colors.accent.goldDark, fontFamily: displayFont.medium, fontSize: 18, marginTop: 8 }}>
              {rating}/10
            </Text>
          )}
        </View>

        <View
          style={{
            backgroundColor: colors.paper.white,
            borderWidth: 1,
            borderColor: colors.border.paper,
            borderRadius: 8,
            padding: 16,
            marginBottom: 14,
          }}
        >
          <Text
            className="uppercase"
            style={{ color: colors.ink.tertiary, fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, marginBottom: 10 }}
          >
            Date played
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setShowDatePicker(true)}
            style={{
              borderWidth: 1,
              borderColor: colors.border.paperFaint,
              backgroundColor: colors.paper.creamWarm,
              borderRadius: 6,
              paddingHorizontal: 12,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontFamily: bodyFont.regular, fontSize: 15, color: colors.ink.primary }}>
              {formatPlayedAt(playedAt)}
            </Text>
          </Pressable>
          {showDatePicker && (
            <>
              <DateTimePicker
                value={fromIsoDate(playedAt)}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                maximumDate={new Date()}
                themeVariant="light"
                style={Platform.OS === 'ios' ? { height: 180, marginTop: 6 } : undefined}
                onChange={(event, date) => {
                  if (Platform.OS === 'android') setShowDatePicker(false);
                  if (event.type === 'set' && date) setPlayedAt(toIsoDate(date));
                }}
              />
              {Platform.OS === 'ios' && (
                <Pressable onPress={() => setShowDatePicker(false)} style={{ marginTop: 6, alignSelf: 'flex-end' }}>
                  <Text style={{ fontFamily: bodyFont.semibold, fontSize: 12, color: colors.accent.goldDark }}>
                    Done
                  </Text>
                </Pressable>
              )}
            </>
          )}
        </View>

        <View
          style={{
            backgroundColor: colors.paper.white,
            borderWidth: 1,
            borderColor: colors.border.paper,
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <Text
            className="uppercase"
            style={{ color: colors.ink.tertiary, fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, marginBottom: 10 }}
          >
            Your note (optional)
          </Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="What did you think?"
            placeholderTextColor={colors.ink.tertiary}
            multiline
            numberOfLines={3}
            style={{
              borderWidth: 1,
              borderColor: colors.border.paperFaint,
              backgroundColor: colors.paper.creamWarm,
              borderRadius: 6,
              padding: 12,
              fontFamily: bodyFont.regular,
              fontSize: 15,
              color: colors.ink.primary,
              minHeight: 70,
              textAlignVertical: 'top',
            }}
          />
        </View>

        {saveError.length > 0 && (
          <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, marginBottom: 12 }}>{saveError}</Text>
        )}

        <Pressable
          accessibilityRole="button"
          onPress={handleSave}
          disabled={saving}
          style={{
            backgroundColor: colors.passport.cover,
            borderRadius: 8,
            paddingVertical: 16,
            alignItems: 'center',
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving ? (
            <ActivityIndicator color={colors.ink.inverse} />
          ) : (
            <Text className="uppercase" style={{ color: colors.ink.inverse, fontFamily: bodyFont.bold, fontSize: 13, letterSpacing: 1.5 }}>
              ⛳ Add to my passport
            </Text>
          )}
        </Pressable>
      </ScrollView>
    );
  }

  // step === 'success'
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.paper.cream,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <Confetti />
      <View style={{ minHeight: 200, alignItems: 'center', justifyContent: 'center' }}>
        <PassportStamp year={fromIsoDate(playedAt).getFullYear()} size={180} animate />
      </View>
      <Text
        className="uppercase"
        style={{
          color: colors.accent.goldDark,
          fontFamily: bodyFont.bold,
          fontSize: 12,
          letterSpacing: 2,
          marginBottom: 8,
        }}
      >
        Course logged
      </Text>
      <Text
        style={{
          color: colors.passport.cover,
          fontFamily: displayFont.semibold,
          fontSize: 28,
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        {selected ? courseDisplayLabel({ courseName: selected.name, clubName: selected.club }) : ''}
      </Text>

      {isNewCountry && (
        <TerritoryCard
          emoji={isNewContinent ? '🌍' : (selected?.country ? (COUNTRY_FLAGS[selected.country] ?? '🌍') : '🌍')}
          eyebrow={isNewContinent ? 'Frontier crossed' : 'Passage granted'}
          title={isNewContinent ? getContinent(selected?.country ?? '') : (selected?.country ?? '')}
          subtitle={isNewContinent ? 'New continent in your atlas' : 'New country in your atlas'}
        />
      )}

      <Pressable
        accessibilityRole="button"
        onPress={resetToSearch}
        style={{
          backgroundColor: colors.passport.cover,
          borderRadius: 8,
          paddingVertical: 14,
          paddingHorizontal: 32,
          marginBottom: 10,
          width: '100%',
          maxWidth: 320,
          alignItems: 'center',
        }}
      >
        <Text className="uppercase" style={{ color: colors.ink.inverse, fontFamily: bodyFont.bold, fontSize: 12, letterSpacing: 1.5 }}>
          Stamp another course
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace('/')}
        style={{
          borderWidth: 1,
          borderColor: colors.border.paperStrong,
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 32,
          width: '100%',
          maxWidth: 320,
          alignItems: 'center',
        }}
      >
        <Text className="uppercase" style={{ color: colors.passport.cover, fontFamily: bodyFont.bold, fontSize: 12, letterSpacing: 1.5 }}>
          Back to passport
        </Text>
      </Pressable>
    </View>
  );
}

// Ported from LogForm.tsx's "Passage granted" card — wax-seal disc + stamp
// eyebrow + ink title. Same shape reused for the continent milestone with
// a globe disc and different copy instead of a second, separately-styled
// card.
function TerritoryCard({
  emoji,
  eyebrow,
  title,
  subtitle,
}: {
  emoji: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <View
      style={{
        backgroundColor: colors.paper.cream,
        borderWidth: 0.5,
        borderColor: colors.border.paperStrong,
        padding: 14,
        width: '100%',
        maxWidth: 320,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
      }}
    >
      <LinearGradient
        colors={[colors.accent.goldLight, colors.accent.gold, colors.accent.goldDark]}
        start={{ x: 0.35, y: 0.3 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          borderWidth: 2,
          borderColor: colors.accent.goldDark,
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ rotate: '-6deg' }],
        }}
      >
        <Text style={{ fontSize: 26, lineHeight: 30 }}>{emoji}</Text>
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <Text
          className="uppercase"
          style={{ color: colors.accent.goldDark, fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 2, marginBottom: 3 }}
        >
          {eyebrow}
        </Text>
        <Text style={{ color: colors.ink.primary, fontFamily: displayFont.medium, fontSize: 18 }}>
          {title}
        </Text>
        <Text
          className="uppercase"
          style={{ color: colors.ink.tertiary, fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, marginTop: 3 }}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
