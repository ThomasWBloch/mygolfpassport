import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import { isGenericCourseName } from '@/lib/course-display';
import { bodyFont, displayFont } from '@/lib/fonts';
import { fetchCourseCountryEntries, type CountryEntry, type CourseEntry } from '@/lib/you';

/**
 * Ported from apps/web/src/app/you/YouCoursesView.tsx +
 * components/ProfileAccordions.tsx — two collapsible accordions:
 * "Courses" (grouped by country, country header shows round count, default
 * open) and "Countries" (grouped by country, header shows course count,
 * expanding reveals rating + played date per row). "My Map" and inline
 * round delete/edit are deliberately not ported yet.
 */
function RatingBadge({ value }: { value: number }) {
  return (
    <View
      style={{
        backgroundColor: colors.paper.creamWarm,
        borderWidth: 1,
        borderColor: colors.border.paperFaint,
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        alignSelf: 'flex-start',
      }}
    >
      <Text style={{ fontFamily: displayFont.medium, fontSize: 12, color: colors.accent.goldDark }}>{value}/10</Text>
    </View>
  );
}

function courseRow(c: CourseEntry, showDate: boolean, onPress: () => void, isLast: boolean) {
  const secondary =
    c.clubName && c.courseName && c.courseName !== c.clubName && !isGenericCourseName(c.courseName) ? c.courseName : null;
  return (
    <Pressable
      key={c.courseId}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        paddingLeft: 24,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: colors.border.paperFaint,
      }}
    >
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text numberOfLines={1} style={{ fontFamily: displayFont.medium, fontSize: 15, color: colors.ink.primary }}>
          {c.clubName ?? c.courseName}
        </Text>
        {secondary && (
          <Text
            className="uppercase"
            numberOfLines={1}
            style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.2, color: colors.ink.tertiary, marginTop: 2 }}
          >
            {secondary}
          </Text>
        )}
      </View>
      <View style={{ alignItems: 'flex-end', gap: 4 }}>
        {c.rating != null && c.rating > 0 ? (
          <RatingBadge value={c.rating} />
        ) : (
          <Text style={{ color: colors.border.paperFaint, fontSize: 12 }}>—</Text>
        )}
        {showDate && c.playedAt && (
          <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 10, letterSpacing: 1, color: colors.ink.tertiary }}>
            {new Date(c.playedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

function Accordion({
  title,
  count,
  defaultOpen,
  children,
}: {
  title: string;
  count: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <View style={{ backgroundColor: colors.paper.white, borderWidth: 1, borderColor: colors.border.paperFaint, borderRadius: 14, overflow: 'hidden' }}>
      <Pressable
        accessibilityRole="button"
        onPress={() => setOpen((o) => !o)}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={{ fontFamily: displayFont.medium, fontSize: 17, color: colors.ink.primary }}>{title}</Text>
          <View
            style={{
              backgroundColor: colors.paper.creamWarm,
              borderWidth: 1,
              borderColor: colors.border.paperFaint,
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 2,
            }}
          >
            <Text style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.secondary }}>{count}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 13, color: colors.ink.tertiary }}>{open ? '▴' : '▾'}</Text>
      </Pressable>
      {open && <View style={{ borderTopWidth: 1, borderTopColor: colors.border.paperFaint }}>{children}</View>}
    </View>
  );
}

function CountryGroupList({
  countries,
  courses,
  headerMetric,
  showRatingDate,
  onPressCourse,
}: {
  countries: { country: string; flag: string | null; itemCount: number }[];
  courses: CourseEntry[];
  headerMetric: (n: number) => string;
  showRatingDate: boolean;
  onPressCourse: (courseId: string) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <View>
      {countries.map((c, i) => {
        const isOpen = expanded === c.country;
        const countryCourses = courses.filter((cr) => cr.country === c.country);
        return (
          <View key={c.country}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setExpanded(isOpen ? null : c.country)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 12,
                paddingHorizontal: 16,
                borderBottomWidth: !isOpen && i < countries.length - 1 ? 1 : 0,
                borderBottomColor: colors.border.paperFaint,
                backgroundColor: isOpen ? colors.paper.creamWarm : 'transparent',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Text style={{ fontSize: 20 }}>{c.flag ?? '🌍'}</Text>
                <Text style={{ fontFamily: displayFont.medium, fontSize: 15, color: colors.ink.primary }}>{c.country}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View
                  style={{
                    backgroundColor: colors.paper.creamWarm,
                    borderWidth: 1,
                    borderColor: colors.border.paperFaint,
                    borderRadius: 4,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                  }}
                >
                  <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.2, color: colors.ink.secondary }}>
                    {headerMetric(c.itemCount)}
                  </Text>
                </View>
                <Text style={{ fontSize: 13, color: colors.ink.tertiary }}>{isOpen ? '▴' : '▾'}</Text>
              </View>
            </Pressable>

            {isOpen && (
              <View style={{ backgroundColor: colors.paper.creamWarm, borderBottomWidth: i < countries.length - 1 ? 1 : 0, borderBottomColor: colors.border.paperFaint }}>
                {countryCourses.map((cr, j) =>
                  courseRow(cr, showRatingDate, () => onPressCourse(cr.courseId), j === countryCourses.length - 1)
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

export default function YouCoursesView({ userId }: { userId: string }) {
  const router = useRouter();
  const [data, setData] = useState<{ courseEntries: CourseEntry[]; countryEntries: CountryEntry[] } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetchCourseCountryEntries(userId)
      .then((res) => { if (!cancelled) setData(res); })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load courses.'); });
    return () => { cancelled = true; };
  }, [userId]);

  if (error.length > 0) {
    return <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, padding: 20 }}>{error}</Text>;
  }

  if (!data) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 }}>
        <ActivityIndicator color={colors.accent.gold} />
      </View>
    );
  }

  const { courseEntries, countryEntries } = data;

  // "Courses" accordion groups by country too, but sorted by round-count
  // DESC (most-played country first) — same courseEntries, different order
  // than countryEntries (already course-count DESC from the fetcher).
  const byRoundCount = [...countryEntries].sort((a, b) => {
    const ac = courseEntries.filter((c) => c.country === a.country).length;
    const bc = courseEntries.filter((c) => c.country === b.country).length;
    return bc - ac;
  });

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 40 }}>
      {courseEntries.length === 0 ? (
        <Text style={{ fontFamily: bodyFont.regular, fontSize: 14, color: colors.ink.tertiary, textAlign: 'center', marginTop: 24 }}>
          You haven't logged any rounds yet.
        </Text>
      ) : (
        <>
          <Accordion title="Courses" count={courseEntries.length} defaultOpen>
            <CountryGroupList
              countries={byRoundCount.map((c) => ({
                country: c.country,
                flag: c.flag,
                itemCount: courseEntries.filter((cr) => cr.country === c.country).length,
              }))}
              courses={courseEntries}
              headerMetric={(n) => `${n} ${n === 1 ? 'round' : 'rounds'}`}
              showRatingDate={false}
              onPressCourse={(id) => router.push(`/courses/${id}`)}
            />
          </Accordion>

          <Accordion title="Countries" count={countryEntries.length} defaultOpen>
            <CountryGroupList
              countries={countryEntries.map((c) => ({ country: c.country, flag: c.flag, itemCount: c.courseCount }))}
              courses={courseEntries}
              headerMetric={(n) => `${n} ${n === 1 ? 'course' : 'courses'}`}
              showRatingDate
              onPressCourse={(id) => router.push(`/courses/${id}`)}
            />
          </Accordion>
        </>
      )}
    </ScrollView>
  );
}
