import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '@mygolfpassport/shared';

import { useAuth } from '@/lib/auth-context';
import { fetchCourses, searchCourses, type Course } from '@/lib/courses';
import { logRound } from '@/lib/log';

type Step = 'search' | 'detail' | 'success';

function todayIso(): string {
  return new Date().toISOString().split('T')[0];
}

export default function LogScreen() {
  const { session } = useAuth();
  const userId = session?.user.id;
  const router = useRouter();

  const [step, setStep] = useState<Step>('search');
  const [selected, setSelected] = useState<Course | null>(null);

  // Search step
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<Course[] | null>(null);
  const [searching, setSearching] = useState(true);

  // Detail step
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    setSearching(true);
    const load = debouncedQuery.length >= 2 ? searchCourses(debouncedQuery) : fetchCourses();
    load
      .then(setResults)
      .catch(() => setResults([]))
      .finally(() => setSearching(false));
  }, [debouncedQuery]);

  function pickCourse(course: Course) {
    setSelected(course);
    setRating(0);
    setNote('');
    setSaveError('');
    setStep('detail');
  }

  function resetToSearch() {
    setStep('search');
    setSelected(null);
    setRating(0);
    setNote('');
    setSaveError('');
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
        playedAt: todayIso(),
      });
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
      <View style={{ flex: 1, backgroundColor: colors.paper.cream, paddingTop: 20 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            className="uppercase"
            style={{
              color: colors.passport.cover,
              fontWeight: '700',
              fontSize: typography.size.h2,
              letterSpacing: typography.tracking.wide,
              marginBottom: 14,
            }}
          >
            Log a round
          </Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by name or club…"
            placeholderTextColor={colors.ink.tertiary}
            autoCapitalize="none"
            autoFocus
            style={{
              borderWidth: 1,
              borderColor: colors.border.paper,
              backgroundColor: colors.paper.white,
              borderRadius: 8,
              paddingHorizontal: 14,
              paddingVertical: 10,
              fontSize: 15,
              color: colors.ink.primary,
              marginBottom: 12,
            }}
          />
        </View>

        {searching && <ActivityIndicator color={colors.accent.gold} style={{ marginTop: 20 }} />}

        {!searching && results && (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: colors.border.paperFaint }} />
            )}
            renderItem={({ item }) => (
              <Pressable
                accessibilityRole="button"
                onPress={() => pickCourse(item)}
                style={{ paddingVertical: 14 }}
              >
                <Text style={{ color: colors.ink.primary, fontSize: 16, fontWeight: '600' }}>
                  {item.club || item.name}
                </Text>
                <Text style={{ color: colors.ink.secondary, fontSize: 13, marginTop: 2 }}>
                  {[item.country, item.holes ? `${item.holes} holes` : null].filter(Boolean).join(' · ')}
                </Text>
              </Pressable>
            )}
          />
        )}
      </View>
    );
  }

  if (step === 'detail' && selected) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.paper.cream }} contentContainerStyle={{ padding: 20 }}>
        <Pressable onPress={resetToSearch} style={{ marginBottom: 16 }}>
          <Text style={{ color: colors.accent.goldDark, fontSize: 14, fontWeight: '600' }}>
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
          <Text style={{ color: colors.ink.inverse, fontSize: 20, fontWeight: '700' }}>
            {selected.club || selected.name}
          </Text>
          <Text style={{ color: colors.ink.inverseSoft, fontSize: 13, marginTop: 4 }}>
            {[selected.country, selected.holes ? `${selected.holes} holes` : null]
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
            style={{ color: colors.ink.tertiary, fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 10 }}
          >
            Your rating (optional)
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
              <Pressable key={v} onPress={() => setRating(rating === v ? 0 : v)}>
                <Ionicons
                  name={v <= rating ? 'star' : 'star-outline'}
                  size={24}
                  color={v <= rating ? colors.accent.gold : colors.border.paperStrong}
                />
              </Pressable>
            ))}
          </View>
          {rating > 0 && (
            <Text style={{ color: colors.accent.goldDark, fontSize: 16, fontWeight: '700', marginTop: 8 }}>
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
            marginBottom: 16,
          }}
        >
          <Text
            className="uppercase"
            style={{ color: colors.ink.tertiary, fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 10 }}
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
              fontSize: 15,
              color: colors.ink.primary,
              minHeight: 70,
              textAlignVertical: 'top',
            }}
          />
        </View>

        {saveError.length > 0 && (
          <Text style={{ color: colors.state.danger, marginBottom: 12 }}>{saveError}</Text>
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
            <Text className="uppercase" style={{ color: colors.ink.inverse, fontWeight: '700', fontSize: 13, letterSpacing: 1.5 }}>
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
      <Text style={{ fontSize: 48, marginBottom: 12 }}>⛳</Text>
      <Text
        className="uppercase"
        style={{
          color: colors.accent.goldDark,
          fontSize: 12,
          fontWeight: '700',
          letterSpacing: 2,
          marginBottom: 8,
        }}
      >
        Course logged
      </Text>
      <Text
        style={{
          color: colors.passport.cover,
          fontSize: 24,
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        {selected?.club || selected?.name}
      </Text>

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
        <Text className="uppercase" style={{ color: colors.ink.inverse, fontWeight: '700', fontSize: 12, letterSpacing: 1.5 }}>
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
        <Text className="uppercase" style={{ color: colors.passport.cover, fontWeight: '700', fontSize: 12, letterSpacing: 1.5 }}>
          Back to passport
        </Text>
      </Pressable>
    </View>
  );
}
