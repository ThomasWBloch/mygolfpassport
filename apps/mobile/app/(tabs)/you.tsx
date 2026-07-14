import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { colors, typography } from '@mygolfpassport/shared';

import { useAuth } from '@/lib/auth-context';
import { fetchPlayedCoursesCount, fetchProfile, type Profile } from '@/lib/profile';

export default function YouScreen() {
  const { session, signOut } = useAuth();
  const user = session?.user;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [coursesPlayed, setCoursesPlayed] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    Promise.all([fetchProfile(user.id), fetchPlayedCoursesCount(user.id)])
      .then(([p, count]) => {
        setProfile(p);
        setCoursesPlayed(count);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load profile.'));
  }, [user]);

  if (!user) return null;

  const fullName = profile?.full_name ?? user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Golfer';
  const loading = !profile && error.length === 0;

  return (
    <View style={{ flex: 1, backgroundColor: colors.paper.cream, padding: 20 }}>
      <Text
        className="uppercase"
        style={{
          color: colors.passport.cover,
          fontWeight: '700',
          fontSize: typography.size.h3,
          letterSpacing: typography.tracking.stamp,
          marginBottom: 4,
        }}
      >
        You
      </Text>

      {loading && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={colors.accent.gold} />
        </View>
      )}

      {error.length > 0 && (
        <Text style={{ color: colors.state.danger, marginTop: 12 }}>{error}</Text>
      )}

      {profile && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: colors.ink.primary, fontSize: 22, fontWeight: '700' }}>
            {fullName}
          </Text>
          {user.email && (
            <Text style={{ color: colors.ink.tertiary, fontSize: 13, marginTop: 2 }}>
              {user.email}
            </Text>
          )}

          <View
            style={{
              marginTop: 20,
              backgroundColor: colors.paper.white,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border.paperFaint,
              padding: 16,
            }}
          >
            <StatRow label="Courses played" value={String(coursesPlayed ?? 0)} />
            <StatRow label="Handicap" value={profile.handicap != null ? String(profile.handicap) : '—'} />
            <StatRow label="Home club" value={profile.home_club ?? '—'} />
            <StatRow label="Home country" value={profile.home_country ?? '—'} last />
          </View>
        </View>
      )}

      <View style={{ flex: 1 }} />

      <Pressable
        accessibilityRole="button"
        onPress={() => signOut()}
        style={{
          borderWidth: 1,
          borderColor: colors.border.paperStrong,
          borderRadius: 8,
          paddingVertical: 12,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.state.danger, fontWeight: '600', fontSize: 14 }}>
          Sign out
        </Text>
      </Pressable>
    </View>
  );
}

function StatRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: colors.border.paperFaint,
      }}
    >
      <Text style={{ color: colors.ink.secondary, fontSize: 14 }}>{label}</Text>
      <Text style={{ color: colors.ink.primary, fontSize: 14, fontWeight: '600' }}>{value}</Text>
    </View>
  );
}
