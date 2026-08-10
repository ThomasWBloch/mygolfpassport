import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import CountryPicker from '@/components/CountryPicker';
import { EmptyText, RowCard, RowInfo } from '@/components/social/shared';
import { bodyFont } from '@/lib/fonts';
import { fetchTopRatedCourses, type TopRatedCourse } from '@/lib/courses';

const MEDALS: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };
const MIN_RATINGS = 5;

export default function TopRatedCoursesPanel() {
  const router = useRouter();
  const [country, setCountry] = useState<string | null>(null);
  const [courses, setCourses] = useState<TopRatedCourse[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setCourses(null);
    setError('');
    fetchTopRatedCourses(country, MIN_RATINGS)
      .then((result) => { if (!cancelled) setCourses(result); })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load top rated courses.'); });
    return () => { cancelled = true; };
  }, [country]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
        <CountryPicker value={country} onChange={setCountry} />
      </View>

      {error.length > 0 && (
        <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, paddingHorizontal: 20 }}>
          {error}
        </Text>
      )}

      {!courses && error.length === 0 && (
        <ActivityIndicator color={colors.accent.gold} style={{ marginTop: 40 }} />
      )}

      {courses && courses.length === 0 && (
        <View style={{ paddingHorizontal: 20 }}>
          <EmptyText>
            {`No courses with at least ${MIN_RATINGS} ratings yet${country ? ' in this country' : ''}. Check back as more rounds get logged.`}
          </EmptyText>
        </View>
      )}

      {courses && courses.length > 0 && (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
          renderItem={({ item, index }) => {
            const rank = index + 1;
            return (
              <RowCard>
                <View style={{ width: 28, alignItems: 'center' }}>
                  {MEDALS[rank] ? (
                    <Text style={{ fontSize: 16 }}>{MEDALS[rank]}</Text>
                  ) : (
                    <Text style={{ color: colors.ink.tertiary, fontFamily: bodyFont.semibold, fontSize: 13 }}>
                      {rank}
                    </Text>
                  )}
                </View>
                <Pressable
                  onPress={() => router.push(`/courses/${item.id}?from=courses`)}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}
                >
                  <Text style={{ fontSize: 20 }}>{item.flag ?? '⛳'}</Text>
                  <RowInfo
                    name={item.name}
                    club={item.club}
                    meta={`${item.ratingCount} rating${item.ratingCount === 1 ? '' : 's'}`}
                  />
                </Pressable>
                <Text style={{ color: colors.accent.goldDark, fontFamily: bodyFont.bold, fontSize: 16 }}>
                  ★ {item.avgRating.toFixed(1)}
                </Text>
              </RowCard>
            );
          }}
        />
      )}
    </View>
  );
}
