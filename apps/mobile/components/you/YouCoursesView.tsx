import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import ProfileAccordions from '@/components/ProfileAccordions';
import { bodyFont } from '@/lib/fonts';
import { fetchCourseCountryEntries, type CountryEntry, type CourseEntry } from '@/lib/you';

/**
 * Ported from apps/web/src/app/you/YouCoursesView.tsx — hosts the shared
 * ProfileAccordions (Courses + Countries, badges hidden since Badges has
 * its own sibling subtab). "My Map" and inline round delete are
 * deliberately not ported yet (see STATUS.md); editing a round's
 * rating/date/note is wired via the Courses accordion's pencil icon.
 */
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

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <ProfileAccordions
        courseEntries={data.courseEntries}
        countryEntries={data.countryEntries}
        hideBadges
        onPressCourse={(id) => router.push(`/courses/${id}?from=profile`)}
        onEditRound={(roundId) => router.push(`/log?edit=${roundId}`)}
      />
    </ScrollView>
  );
}
