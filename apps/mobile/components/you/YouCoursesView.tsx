import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import ProfileAccordions from '@/components/ProfileAccordions';
import { bodyFont, displayFont } from '@/lib/fonts';
import { deleteRound } from '@/lib/log';
import { fetchCourseCountryEntries, type CountryEntry, type CourseEntry } from '@/lib/you';

/**
 * Ported from apps/web/src/app/you/YouCoursesView.tsx — "My Map" link +
 * the shared ProfileAccordions (Courses + Countries, badges hidden since
 * Badges has its own sibling subtab). Editing a round's rating/date/note
 * is wired via the Courses accordion's pencil icon; deleting via its
 * trash icon (calls the delete-round Edge Function, which re-evaluates
 * and revokes any badges the deleted round was propping up).
 */
export default function YouCoursesView({ userId }: { userId: string }) {
  const router = useRouter();
  const [data, setData] = useState<{ courseEntries: CourseEntry[]; countryEntries: CountryEntry[] } | null>(null);
  const [error, setError] = useState('');

  function refresh() {
    return fetchCourseCountryEntries(userId)
      .then((res) => setData(res))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load courses.'));
  }

  useEffect(() => {
    let cancelled = false;
    fetchCourseCountryEntries(userId)
      .then((res) => { if (!cancelled) setData(res); })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load courses.'); });
    return () => { cancelled = true; };
  }, [userId]);

  function confirmDeleteRound(roundId: string) {
    const course = data?.courseEntries.find((c) => c.roundId === roundId);
    const name = course?.clubName ?? course?.courseName ?? 'this round';
    const dateLabel = course?.playedAt
      ? ` on ${new Date(course.playedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
      : '';
    Alert.alert(
      'Delete this round?',
      `${name}${dateLabel}. This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { removedBadges } = await deleteRound(roundId);
              await refresh();
              if (removedBadges.length > 0) {
                Alert.alert('Round deleted', `Badge ${removedBadges.join(', ')} has also been removed.`);
              }
            } catch (err) {
              Alert.alert('Error', err instanceof Error ? err.message : 'Could not delete the round. Please try again.');
            }
          },
        },
      ]
    );
  }

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
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40, gap: 12 }}>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/map?from=profile')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.paper.white,
          borderWidth: 1,
          borderColor: colors.border.paperFaint,
          borderRadius: 14,
          padding: 16,
        }}
      >
        <View>
          <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 2, color: colors.ink.tertiary, marginBottom: 3 }}>
            My Map
          </Text>
          <Text style={{ fontFamily: displayFont.medium, fontSize: 17, color: colors.ink.primary }}>
            See your courses on the world map
          </Text>
        </View>
        <Text style={{ color: colors.ink.tertiary, fontSize: 18 }}>›</Text>
      </Pressable>

      <ProfileAccordions
        courseEntries={data.courseEntries}
        countryEntries={data.countryEntries}
        hideBadges
        onPressCourse={(id) => router.push(`/courses/${id}?from=profile`)}
        onEditRound={(roundId) => router.push(`/log?edit=${roundId}`)}
        onDeleteRound={confirmDeleteRound}
      />
    </ScrollView>
  );
}
