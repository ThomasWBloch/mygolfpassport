import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, ScrollView, Share, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import PassportCard from '@/components/PassportCard';
import ProfileRatingsReviews from '@/components/ProfileRatingsReviews';
import { useAuth } from '@/lib/auth-context';
import { bodyFont, displayFont } from '@/lib/fonts';
import { computeInitials } from '@/lib/initials';
import { fetchProfile, type Profile } from '@/lib/profile';
import { shareCard } from '@/lib/share-card';
import { fetchRatingsReviews, fetchYouProfileStats, type RatingRow, type ReviewRow, type YouProfileStats } from '@/lib/you';

const FEEDBACK_URL = 'https://mygolfpassport.golf/survey';

/**
 * Ported from apps/web/src/app/you/YouProfileView.tsx — the default "You"
 * subtab: PassportCard hero, Invite-a-friend, Show it off, Ratings &
 * Reviews, Settings and Feedback tiles.
 */
export default function YouProfileView({
  userId,
  onPressCourses,
  onPressBadges,
}: {
  userId: string;
  onPressCourses: () => void;
  onPressBadges: () => void;
}) {
  const { session } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<YouProfileStats | null>(null);
  const [ratingsReviews, setRatingsReviews] = useState<{ ratings: RatingRow[]; reviews: ReviewRow[] } | null>(null);
  const [error, setError] = useState('');
  const [sharing, setSharing] = useState(false);
  const [sharingCard, setSharingCard] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchProfile(userId)
      .then((p) => {
        if (cancelled) return;
        setProfile(p);
        return Promise.all([fetchYouProfileStats(userId, p?.home_club ?? null), fetchRatingsReviews(userId)]);
      })
      .then((res) => {
        if (cancelled || !res) return;
        setStats(res[0]);
        setRatingsReviews(res[1]);
      })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load profile.'); });
    return () => { cancelled = true; };
  }, [userId]);

  async function handleInvite() {
    if (!profile?.referral_code || sharing) return;
    setSharing(true);
    try {
      await Share.share({
        message: 'Join me on My Golf Passport — track every course you play. https://mygolfpassport.golf/i/' + profile.referral_code,
      });
    } catch {
      // user dismissed the share sheet — no-op
    } finally {
      setSharing(false);
    }
  }

  async function handleShareCard() {
    if (sharingCard) return;
    setSharingCard(true);
    try {
      await shareCard();
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Could not build your share card.');
    } finally {
      setSharingCard(false);
    }
  }

  if (error.length > 0) {
    return <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, padding: 20 }}>{error}</Text>;
  }

  if (!profile || !stats || !ratingsReviews) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 }}>
        <ActivityIndicator color={colors.accent.gold} />
      </View>
    );
  }

  const fullName = profile.full_name ?? session?.user.user_metadata?.full_name ?? session?.user.email?.split('@')[0] ?? 'Golfer';

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 40 }}>
      <PassportCard
        fullName={fullName}
        initials={computeInitials(fullName, session?.user.email)}
        homeClub={profile.home_club}
        homeCountry={profile.home_country}
        handicap={profile.handicap}
        courseCount={stats.courseCount}
        countryCount={stats.countryCount}
        badgeCount={stats.earnedBadges.length}
        badgeEmojis={stats.earnedBadges.slice(0, 5)}
        totalBadges={stats.earnedBadges.length}
        onPressCourses={onPressCourses}
        onPressBadges={onPressBadges}
        onPressHomeClub={
          profile.home_club && profile.home_country
            ? () => router.push(`/clubs/${encodeURIComponent(profile.home_country!)}/${encodeURIComponent(profile.home_club!)}?from=profile`)
            : undefined
        }
      />

      <Pressable
        accessibilityRole="button"
        onPress={handleInvite}
        disabled={sharing || !profile.referral_code}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.passport.cover,
          borderRadius: 14,
          padding: 16,
          opacity: sharing ? 0.7 : 1,
        }}
      >
        <View>
          <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 2, color: colors.accent.gold, marginBottom: 3 }}>
            Invite a friend
          </Text>
          <Text style={{ fontFamily: displayFont.medium, fontSize: 17, color: colors.paper.cream }}>
            {sharing ? 'Opening share…' : 'Share your invite link'}
          </Text>
        </View>
        <Text style={{ color: colors.accent.gold, fontSize: 18 }}>↗</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={handleShareCard}
        disabled={sharingCard}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.passport.cover,
          borderRadius: 14,
          padding: 16,
          opacity: sharingCard ? 0.7 : 1,
        }}
      >
        <View>
          <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 2, color: colors.accent.gold, marginBottom: 3 }}>
            Show it off
          </Text>
          <Text style={{ fontFamily: displayFont.medium, fontSize: 17, color: colors.paper.cream }}>
            {sharingCard ? 'Preparing…' : 'Download your passport card'}
          </Text>
        </View>
        <Text style={{ color: colors.accent.gold, fontSize: 18 }}>↗</Text>
      </Pressable>

      <ProfileRatingsReviews
        ratings={ratingsReviews.ratings}
        reviews={ratingsReviews.reviews}
        onPressCourse={(id) => router.push(`/courses/${id}?from=profile`)}
      />

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/edit-profile')}
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
            Settings
          </Text>
          <Text style={{ fontFamily: displayFont.medium, fontSize: 17, color: colors.ink.primary }}>Edit profile &amp; settings</Text>
        </View>
        <Text style={{ color: colors.ink.tertiary, fontSize: 18 }}>›</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() => Linking.openURL(FEEDBACK_URL)}
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
            Feedback
          </Text>
          <Text style={{ fontFamily: displayFont.medium, fontSize: 17, color: colors.ink.primary }}>Give feedback on the app</Text>
        </View>
        <Text style={{ color: colors.ink.tertiary, fontSize: 18 }}>›</Text>
      </Pressable>
    </ScrollView>
  );
}
