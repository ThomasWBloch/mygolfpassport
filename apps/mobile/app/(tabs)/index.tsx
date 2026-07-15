import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { colors, typography } from '@mygolfpassport/shared';

import { useAuth } from '@/lib/auth-context';
import { courseDisplayLabel } from '@/lib/course-display';
import { fetchPlayedCourses } from '@/lib/courses';
import { bodyFont, displayFont } from '@/lib/fonts';
import { fetchBadgeCount, fetchRecentRounds, type RecentRound } from '@/lib/home';
import { fetchProfile, type Profile } from '@/lib/profile';

type HomeStats = {
  coursesPlayed: number;
  countriesPlayed: number;
  badges: number;
};

export default function HomeScreen() {
  const { session } = useAuth();
  const user = session?.user;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<HomeStats | null>(null);
  const [recentRounds, setRecentRounds] = useState<RecentRound[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    Promise.all([
      fetchProfile(user.id),
      fetchPlayedCourses(user.id),
      fetchBadgeCount(user.id),
      fetchRecentRounds(user.id, 2),
    ])
      .then(([p, playedCourses, badges, rounds]) => {
        setProfile(p);
        setStats({
          coursesPlayed: playedCourses.length,
          countriesPlayed: new Set(playedCourses.map((c) => c.country).filter(Boolean)).size,
          badges,
        });
        setRecentRounds(rounds);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load your passport.'));
  }, [user]);

  if (!user) return null;

  const fullName = profile?.full_name ?? user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Golfer';
  const firstName = fullName.split(' ')[0];
  const loading = !profile && error.length === 0;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.paper.cream }} contentContainerStyle={{ padding: 20 }}>
      <Text style={{ color: colors.passport.cover, fontSize: 30, fontFamily: displayFont.semibold }}>
        Fore {firstName}!
      </Text>

      {loading && (
        <View style={{ paddingVertical: 40, alignItems: 'center' }}>
          <ActivityIndicator color={colors.accent.gold} />
        </View>
      )}

      {error.length > 0 && (
        <Text style={{ color: colors.state.danger, marginTop: 12 }}>{error}</Text>
      )}

      {stats && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            backgroundColor: colors.paper.white,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border.paperFaint,
            paddingVertical: 16,
          }}
        >
          <StatTile value={stats.coursesPlayed} label="Courses" />
          <StatTile value={stats.countriesPlayed} label="Countries" />
          <StatTile value={stats.badges} label="Badges" />
        </View>
      )}

      {recentRounds && (
        <View style={{ marginTop: 28 }}>
          <Text
            className="uppercase"
            style={{
              color: colors.ink.tertiary,
              fontFamily: bodyFont.semibold,
              fontSize: 12,
              letterSpacing: typography.tracking.eyebrow,
              marginBottom: 12,
            }}
          >
            Recently logged
          </Text>

          {recentRounds.length === 0 ? (
            <View
              style={{
                backgroundColor: colors.paper.white,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.border.paperFaint,
                padding: 20,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: colors.ink.secondary, fontFamily: bodyFont.regular, fontSize: 14, marginBottom: 12, textAlign: 'center' }}>
                Your passport is blank. Log your first round to start stamping it.
              </Text>
              <Link
                href="/log"
                style={{ color: colors.accent.goldDark, fontFamily: bodyFont.bold, fontSize: 14 }}
              >
                Log a round →
              </Link>
            </View>
          ) : (
            recentRounds.map((round) => (
              <View
                key={round.id}
                style={{
                  backgroundColor: colors.paper.white,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: colors.border.paperFaint,
                  padding: 14,
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: colors.ink.primary, fontSize: 17, fontFamily: displayFont.medium }}>
                  {round.course
                    ? courseDisplayLabel({ courseName: round.course.name, clubName: round.course.club })
                    : 'Unknown course'}
                </Text>
                {round.played_at && (
                  <Text style={{ color: colors.ink.tertiary, fontFamily: bodyFont.regular, fontSize: 13, marginTop: 2 }}>
                    {formatDate(round.played_at)}
                  </Text>
                )}
              </View>
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
}

function StatTile({ value, label }: { value: number; label: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ color: colors.passport.cover, fontFamily: displayFont.semibold, fontSize: 24 }}>
        {value}
      </Text>
      <Text style={{ color: colors.ink.tertiary, fontFamily: bodyFont.regular, fontSize: 12, marginTop: 2 }}>
        {label}
      </Text>
    </View>
  );
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}
