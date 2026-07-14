import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { colors, typography } from '@mygolfpassport/shared';

import { fetchCourses, type Course } from '@/lib/courses';

export default function CoursesScreen() {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses()
      .then(setCourses)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load courses.'));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.paper.cream }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 }}>
        <Text
          className="uppercase"
          style={{
            color: colors.passport.cover,
            fontWeight: '700',
            fontSize: typography.size.h2,
            letterSpacing: typography.tracking.wide,
          }}
        >
          Courses
        </Text>
        {courses && (
          <Text style={{ color: colors.ink.tertiary, fontSize: 13, marginTop: 4 }}>
            {courses.length} courses
          </Text>
        )}
      </View>

      {error.length > 0 && (
        <Text style={{ color: colors.state.danger, paddingHorizontal: 20 }}>{error}</Text>
      )}

      {!courses && error.length === 0 && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={colors.accent.gold} />
        </View>
      )}

      {courses && (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: colors.border.paperFaint }} />
          )}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 14 }}>
              <Text style={{ color: colors.ink.primary, fontSize: 16, fontWeight: '600' }}>
                {item.club || item.name}
              </Text>
              <Text style={{ color: colors.ink.secondary, fontSize: 13, marginTop: 2 }}>
                {[item.country, item.holes ? `${item.holes} holes` : null]
                  .filter(Boolean)
                  .join(' · ')}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
