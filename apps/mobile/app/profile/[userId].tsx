import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import BackHeader from '@/components/BackHeader';
import PassportCard from '@/components/PassportCard';
import ProfileAccordions from '@/components/ProfileAccordions';
import ProfileFriendButton from '@/components/ProfileFriendButton';
import ProfileRatingsReviews from '@/components/ProfileRatingsReviews';
import SendMessageButton from '@/components/SendMessageButton';
import { useAuth } from '@/lib/auth-context';
import { resolveBackLabel } from '@/lib/back-labels';
import { bodyFont } from '@/lib/fonts';
import { computeInitials } from '@/lib/initials';
import {
  fetchFriendshipStatus,
  fetchPublicProfileMeta,
  type FriendshipStatus,
  type PublicProfileMeta,
} from '@/lib/public-profile';
import {
  fetchCourseCountryEntries,
  fetchEarnedBadgeEntries,
  fetchRatingsReviews,
  fetchYouProfileStats,
  type BadgeEntry,
  type CountryEntry,
  type CourseEntry,
  type RatingRow,
  type ReviewRow,
  type YouProfileStats,
} from '@/lib/you';

/**
 * Public profile screen — ported from
 * apps/web/src/app/profile/[user_id]/page.tsx. Viewing another user:
 * passport card, friend-request button, send-message button, and the
 * shared Courses/Countries/Badges accordions.
 */
export default function PublicProfileScreen() {
  const { userId: targetId, from } = useLocalSearchParams<{ userId: string; from?: string }>();
  const router = useRouter();
  const { session } = useAuth();
  const viewerId = session?.user.id;

  const [meta, setMeta] = useState<PublicProfileMeta | null>(null);
  const [stats, setStats] = useState<YouProfileStats | null>(null);
  const [entries, setEntries] = useState<{ courseEntries: CourseEntry[]; countryEntries: CountryEntry[] } | null>(null);
  const [badges, setBadges] = useState<BadgeEntry[] | null>(null);
  const [friendship, setFriendship] = useState<FriendshipStatus | null>(null);
  const [ratingsReviews, setRatingsReviews] = useState<{ ratings: RatingRow[]; reviews: ReviewRow[] } | null>(null);
  const [error, setError] = useState('');
  const [badgesOpen, setBadgesOpen] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const accordionsY = useRef(0);
  const coursesY = useRef(0);
  const badgesY = useRef(0);

  function scrollToSection(sectionRef: { current: number }) {
    scrollRef.current?.scrollTo({ y: accordionsY.current + sectionRef.current, animated: true });
  }

  useEffect(() => {
    if (!targetId || !viewerId) return;
    let cancelled = false;

    fetchPublicProfileMeta(targetId)
      .then((m) => {
        if (cancelled) return;
        if (!m) {
          setError('This profile could not be found.');
          return;
        }
        setMeta(m);
        return Promise.all([
          fetchYouProfileStats(targetId, m.homeClub),
          fetchCourseCountryEntries(targetId),
          fetchEarnedBadgeEntries(targetId),
          fetchRatingsReviews(targetId),
          viewerId === targetId
            ? Promise.resolve<FriendshipStatus>({ status: 'none', friendshipId: null })
            : fetchFriendshipStatus(viewerId, targetId),
        ]);
      })
      .then((res) => {
        if (cancelled || !res) return;
        setStats(res[0]);
        setEntries(res[1]);
        setBadges(res[2]);
        setRatingsReviews(res[3]);
        setFriendship(res[4]);
      })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load profile.'); });

    return () => { cancelled = true; };
  }, [targetId, viewerId]);

  if (!viewerId || !targetId) return null;

  const loaded = meta && stats && entries && badges && ratingsReviews && friendship;
  const isSelf = viewerId === targetId;

  return (
    <View style={{ flex: 1, backgroundColor: colors.paper.cream }}>
      <BackHeader label={resolveBackLabel(from)} />

      {error.length > 0 && (
        <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, padding: 16 }}>{error}</Text>
      )}

      {!loaded && error.length === 0 && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={colors.accent.gold} />
        </View>
      )}

      {loaded && (
        <ScrollView ref={scrollRef} contentContainerStyle={{ padding: 16, gap: 14 }}>
          <PassportCard
            fullName={meta.fullName}
            initials={computeInitials(meta.fullName, null)}
            homeClub={meta.homeClub}
            homeCountry={meta.homeCountry}
            handicap={meta.handicap}
            courseCount={stats.courseCount}
            countryCount={stats.countryCount}
            badgeCount={stats.earnedBadges.length}
            badgeEmojis={stats.earnedBadges.slice(0, 5)}
            totalBadges={stats.earnedBadges.length}
            onPressCourses={() => scrollToSection(coursesY)}
            onPressBadges={() => {
              setBadgesOpen(true);
              scrollToSection(badgesY);
            }}
            onPressHomeClub={
              meta.homeClub && meta.homeCountry
                ? () => router.push(`/clubs/${encodeURIComponent(meta.homeCountry!)}/${encodeURIComponent(meta.homeClub!)}?from=profile`)
                : undefined
            }
          />

          {!isSelf && (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <SendMessageButton currentUserId={viewerId} targetUserId={targetId} />
              </View>
              <ProfileFriendButton currentUserId={viewerId} targetUserId={targetId} initialStatus={friendship} />
            </View>
          )}

          {!isSelf && (
            <Pressable
              accessibilityRole="button"
              onPress={() =>
                router.push(`/map?userId=${targetId}&name=${encodeURIComponent(meta.fullName)}&from=profile`)
              }
              style={{
                borderWidth: 1,
                borderColor: colors.border.paper,
                backgroundColor: colors.paper.white,
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: 'center',
              }}
            >
              <Text className="uppercase" style={{ color: colors.passport.cover, fontFamily: bodyFont.bold, fontSize: 12, letterSpacing: 1.5 }}>
                🗺️ View {meta.fullName}&apos;s map
              </Text>
            </Pressable>
          )}

          <ProfileRatingsReviews
            ratings={ratingsReviews.ratings}
            reviews={ratingsReviews.reviews}
            onPressCourse={(id) => router.push(`/courses/${id}?from=profile`)}
          />

          <View onLayout={(e) => { accordionsY.current = e.nativeEvent.layout.y; }}>
            <ProfileAccordions
              courseEntries={entries.courseEntries}
              countryEntries={entries.countryEntries}
              badges={badges}
              badgesDefaultOpen={badgesOpen}
              onPressCourse={(id) => router.push(`/courses/${id}?from=profile`)}
              onLayoutCourses={(y) => { coursesY.current = y; }}
              onLayoutBadges={(y) => { badgesY.current = y; }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
