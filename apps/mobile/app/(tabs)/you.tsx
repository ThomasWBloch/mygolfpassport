import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography } from '@mygolfpassport/shared';

import PassportCard from '@/components/PassportCard';
import { useAuth } from '@/lib/auth-context';
import { fetchPlayedCourses } from '@/lib/courses';
import { bodyFont } from '@/lib/fonts';
import { fetchBadgeCount } from '@/lib/home';
import { computeInitials } from '@/lib/initials';
import { fetchProfile, type Profile } from '@/lib/profile';

type YouStats = {
  courseCount: number;
  countryCount: number;
  badgeCount: number;
};

export default function YouScreen() {
  const { session, signOut } = useAuth();
  const user = session?.user;
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<YouStats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    Promise.all([fetchProfile(user.id), fetchPlayedCourses(user.id), fetchBadgeCount(user.id)])
      .then(([p, playedCourses, badgeCount]) => {
        setProfile(p);
        setStats({
          courseCount: playedCourses.length,
          countryCount: new Set(playedCourses.map((c) => c.country).filter(Boolean)).size,
          badgeCount,
        });
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load profile.'));
  }, [user]);

  if (!user) return null;

  const fullName = profile?.full_name ?? user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Golfer';
  const loading = !profile && error.length === 0;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.paper.cream }}
      contentContainerStyle={{ padding: 20, paddingTop: insets.top + 16, flexGrow: 1 }}
    >
      <Text
        className="uppercase"
        style={{
          color: colors.ink.tertiary,
          fontFamily: bodyFont.semibold,
          fontSize: typography.size.caption,
          letterSpacing: typography.tracking.stamp,
          marginBottom: 12,
        }}
      >
        You
      </Text>

      {loading && (
        <View style={{ paddingVertical: 40, alignItems: 'center' }}>
          <ActivityIndicator color={colors.accent.gold} />
        </View>
      )}

      {error.length > 0 && (
        <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, marginBottom: 12 }}>{error}</Text>
      )}

      {profile && stats && (
        <PassportCard
          fullName={fullName}
          initials={computeInitials(fullName, user.email)}
          homeClub={profile.home_club}
          homeCountry={profile.home_country}
          handicap={profile.handicap}
          courseCount={stats.courseCount}
          countryCount={stats.countryCount}
          badgeCount={stats.badgeCount}
          onPressCourses={() => router.push('/courses?mode=played')}
        />
      )}

      {profile && (
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/edit-profile')}
          style={{
            borderWidth: 1,
            borderColor: colors.border.paperStrong,
            borderRadius: 8,
            paddingVertical: 12,
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <Text style={{ color: colors.passport.cover, fontFamily: bodyFont.semibold, fontSize: 14 }}>
            Edit profile
          </Text>
        </Pressable>
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
          marginTop: 20,
        }}
      >
        <Text style={{ color: colors.state.danger, fontFamily: bodyFont.semibold, fontSize: 14 }}>
          Sign out
        </Text>
      </Pressable>
    </ScrollView>
  );
}
