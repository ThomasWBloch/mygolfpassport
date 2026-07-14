import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { colors, typography } from '@mygolfpassport/shared';

import { useAuth } from '@/lib/auth-context';
import { fetchCourses, fetchPlayedCourses, searchCourses, type Course } from '@/lib/courses';

type Mode = 'all' | 'played';

export default function CoursesScreen() {
  const { session } = useAuth();
  const [mode, setMode] = useState<Mode>('all');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Debounce the search box — wait 300ms after typing stops before querying.
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    const load = async () => {
      if (mode === 'played') {
        if (!session?.user) return [];
        return fetchPlayedCourses(session.user.id);
      }
      return debouncedQuery.length >= 2 ? searchCourses(debouncedQuery) : fetchCourses();
    };

    load()
      .then((result) => { if (!cancelled) setCourses(result); })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load courses.'); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [mode, debouncedQuery, session?.user]);

  const showingFirst100 = mode === 'all' && debouncedQuery.length < 2;

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

        <View style={{ flexDirection: 'row', marginTop: 14, gap: 8 }}>
          <ModeButton label="All" active={mode === 'all'} onPress={() => setMode('all')} />
          <ModeButton label="Played" active={mode === 'played'} onPress={() => setMode('played')} />
        </View>

        {mode === 'all' && (
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by name or club…"
            placeholderTextColor={colors.ink.tertiary}
            autoCapitalize="none"
            style={{
              marginTop: 12,
              borderWidth: 1,
              borderColor: colors.border.paper,
              backgroundColor: colors.paper.white,
              borderRadius: 8,
              paddingHorizontal: 14,
              paddingVertical: 10,
              fontSize: 15,
              color: colors.ink.primary,
            }}
          />
        )}

        {courses && (
          <Text style={{ color: colors.ink.tertiary, fontSize: 13, marginTop: 10 }}>
            {courses.length} course{courses.length === 1 ? '' : 's'}
            {showingFirst100 && courses.length >= 100 ? ' (showing first 100 — search to narrow)' : ''}
          </Text>
        )}
      </View>

      {error.length > 0 && (
        <Text style={{ color: colors.state.danger, paddingHorizontal: 20 }}>{error}</Text>
      )}

      {loading && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={colors.accent.gold} />
        </View>
      )}

      {!loading && courses && courses.length === 0 && (
        <Text style={{ color: colors.ink.tertiary, textAlign: 'center', marginTop: 24 }}>
          {mode === 'played' ? "You haven't logged any rounds yet." : 'No courses match your search.'}
        </Text>
      )}

      {!loading && courses && courses.length > 0 && (
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

function ModeButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: active ? colors.accent.gold : colors.paper.white,
        borderWidth: 1,
        borderColor: active ? colors.accent.gold : colors.border.paper,
      }}
    >
      <Text
        style={{
          color: active ? colors.passport.coverInk : colors.ink.secondary,
          fontWeight: '600',
          fontSize: 13,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
