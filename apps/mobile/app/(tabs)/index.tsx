import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { colors, typography } from '@mygolfpassport/shared';

import NearbyCoursesPanel from '@/components/NearbyCoursesPanel';
import PassportCard from '@/components/PassportCard';
import FeedCard from '@/components/social/FeedCard';
import { SmallButton } from '@/components/social/shared';
import TopBar from '@/components/TopBar';
import { useAuth } from '@/lib/auth-context';
import { courseDisplayLabel } from '@/lib/course-display';
import { fetchPlayedCourses, type NearbyCourse } from '@/lib/courses';
import { fetchFeed, type FeedItem } from '@/lib/feed';
import { bodyFont, displayFont } from '@/lib/fonts';
import { fetchBadgeCount, fetchRecentRounds, type RecentRound } from '@/lib/home';
import { computeInitials } from '@/lib/initials';
import { fetchProfile, type Profile } from '@/lib/profile';
import { supabase } from '@/lib/supabase';

type HomeStats = {
  coursesPlayed: number;
  countriesPlayed: number;
  badges: number;
};

// fetchFeed's `limit` slices the merged (rounds+badges+friendships) stream
// *before* we filter out badge items client-side — so if a friend circle's
// most recent activity happens to be all badges, one page can come back
// with zero rounds/friendships even though older ones exist. Page forward
// (bounded) until there are enough non-badge items or the feed runs out.
const FEED_PAGE_SIZE = 8;
const FEED_PREVIEW_COUNT = 2;
const FEED_MAX_PAGES = 5;

async function fetchFeedPreview(userId: string): Promise<{ hasFriends: boolean; items: FeedItem[] }> {
  const first = await fetchFeed(supabase, userId, { limit: FEED_PAGE_SIZE });
  if (!first.hasFriends) {
    // ownStamps are always round items — no badges to filter here.
    return { hasFriends: false, items: first.ownStamps };
  }

  let collected = first.items.filter((i) => i.type !== 'badge');
  let cursor = first.nextCursor;
  for (let page = 0; collected.length < FEED_PREVIEW_COUNT && cursor && page < FEED_MAX_PAGES; page++) {
    const next = await fetchFeed(supabase, userId, { limit: FEED_PAGE_SIZE, before: cursor });
    collected = collected.concat(next.items.filter((i) => i.type !== 'badge'));
    cursor = next.nextCursor;
  }

  return { hasFriends: true, items: collected };
}

/**
 * Ported from apps/web/src/app/page.tsx's section order: passport card,
 * then "Courses near you" (compact NearbyCoursesPanel preview), then
 * "Friends' activity" (feed preview, badges excluded — mobile-specific
 * deviation from web, which does include them), then "Your recent courses"
 * at the bottom.
 */
export default function HomeScreen() {
  const { session } = useAuth();
  const user = session?.user;
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<HomeStats | null>(null);
  const [recentRounds, setRecentRounds] = useState<RecentRound[] | null>(null);
  const [feedItems, setFeedItems] = useState<FeedItem[] | null>(null);
  const [feedHasFriends, setFeedHasFriends] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    Promise.all([
      fetchProfile(user.id),
      fetchPlayedCourses(user.id),
      fetchBadgeCount(user.id),
      fetchRecentRounds(user.id, 2),
      fetchFeedPreview(user.id),
    ])
      .then(([p, playedCourses, badges, rounds, feed]) => {
        setProfile(p);
        setStats({
          coursesPlayed: playedCourses.length,
          countriesPlayed: new Set(playedCourses.map((c) => c.country).filter(Boolean)).size,
          badges,
        });
        setRecentRounds(rounds);
        setFeedHasFriends(feed.hasFriends);
        setFeedItems(feed.items.slice(0, FEED_PREVIEW_COUNT));
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load your passport.'));
  }, [user]);

  if (!user) return null;

  const fullName = profile?.full_name ?? user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Golfer';
  const loading = !profile && error.length === 0;

  function goToCourse(course: NearbyCourse) {
    router.push(`/courses/${course.id}?from=home`);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.paper.cream }}>
      <TopBar />

      <ScrollView contentContainerStyle={{ padding: 20 }}>

      {loading && (
        <View style={{ paddingVertical: 40, alignItems: 'center' }}>
          <ActivityIndicator color={colors.accent.gold} />
        </View>
      )}

      {error.length > 0 && (
        <Text style={{ color: colors.state.danger, marginTop: 12 }}>{error}</Text>
      )}

      {profile && stats && (
        <PassportCard
          fullName={fullName}
          initials={computeInitials(fullName, user.email)}
          homeClub={profile.home_club}
          homeCountry={profile.home_country}
          handicap={profile.handicap}
          courseCount={stats.coursesPlayed}
          countryCount={stats.countriesPlayed}
          badgeCount={stats.badges}
          onPressCourses={() => router.push('/you?tab=courses')}
          onPressBadges={() => router.push('/you?tab=badges')}
          onPressHomeClub={
            profile.home_club && profile.home_country
              ? () => router.push(`/clubs/${encodeURIComponent(profile.home_country!)}/${encodeURIComponent(profile.home_club!)}`)
              : undefined
          }
        />
      )}

      {profile && (
        <View style={{ marginTop: 28 }}>
          <NearbyCoursesPanel compact onSelectCourse={goToCourse} onSeeAll={() => router.push('/courses')} />
        </View>
      )}

      {profile && (
        <View style={{ marginTop: 8 }}>
          <SectionLabel>Friends&apos; activity</SectionLabel>

          {!feedItems && (
            <ActivityIndicator color={colors.accent.gold} style={{ marginTop: 12 }} />
          )}

          {feedItems && !feedHasFriends && (
            <View
              style={{
                backgroundColor: colors.paper.creamWarm,
                borderWidth: 1,
                borderColor: colors.border.paper,
                borderRadius: 8,
                padding: 18,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontFamily: displayFont.medium, fontSize: 18, color: colors.ink.primary, marginBottom: 4 }}>
                Find your golf circle
              </Text>
              <Text style={{ fontSize: 13, color: colors.ink.secondary, lineHeight: 18, textAlign: 'center', marginBottom: 12 }}>
                Add a friend or two — their stamps, badges, and new connections show up here.
              </Text>
              <SmallButton label="Find friends →" filled onPress={() => router.push('/social?tab=friends')} />
            </View>
          )}

          {feedItems && feedHasFriends && feedItems.length === 0 && (
            <View
              style={{
                backgroundColor: colors.paper.white,
                borderWidth: 1,
                borderColor: colors.border.paper,
                borderRadius: 8,
                padding: 18,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontFamily: displayFont.medium, fontSize: 17, color: colors.ink.primary, marginBottom: 4 }}>
                Quiet on the green
              </Text>
              <Text style={{ fontSize: 13, color: colors.ink.secondary, lineHeight: 18, textAlign: 'center' }}>
                None of your friends have stamped a course yet. When they do, it shows up here.
              </Text>
            </View>
          )}

          {feedItems && feedItems.length > 0 && (
            <View style={{ gap: 10 }}>
              {feedItems.map((item) => (
                <FeedCard key={`${item.type}-${item.id}`} item={item} viewerId={user.id} />
              ))}
            </View>
          )}
        </View>
      )}

      {recentRounds && (
        <View style={{ marginTop: 28 }}>
          <SectionLabel>Your recent courses</SectionLabel>

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
              <Pressable
                key={round.id}
                disabled={!round.course}
                onPress={() => round.course && router.push(`/courses/${round.course.id}?from=home`)}
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
                {round.rating != null && (
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      backgroundColor: colors.paper.creamWarm,
                      borderWidth: 1,
                      borderColor: colors.border.paperFaint,
                      borderRadius: 4,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      marginTop: 6,
                    }}
                  >
                    <Text style={{ fontFamily: displayFont.medium, fontSize: 12, color: colors.accent.goldDark }}>
                      {round.rating}/10
                    </Text>
                  </View>
                )}
                {round.note && (
                  <Text
                    numberOfLines={2}
                    style={{ marginTop: 6, fontFamily: displayFont.regularItalic, fontSize: 15, color: colors.ink.secondary, lineHeight: 20 }}
                  >
                    “{round.note}”
                  </Text>
                )}
              </Pressable>
            ))
          )}
        </View>
      )}
      </ScrollView>
    </View>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </Text>
  );
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}
