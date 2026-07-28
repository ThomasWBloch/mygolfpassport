import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@mygolfpassport/shared';

import BackHeader from '@/components/BackHeader';
import GolfersListAccordion from '@/components/GolfersListAccordion';
import ReportIncorrectInfoLink from '@/components/ReportIncorrectInfoLink';
import { useAuth } from '@/lib/auth-context';
import { resolveBackLabel } from '@/lib/back-labels';
import { fetchClubCourses, fetchClubRatingsAndPlayed, groupByLocation, type ClubLocationGroup, type ClubRatingsAndPlayed } from '@/lib/clubs';
import { isGenericCourseName } from '@/lib/course-display';
import { fetchCourseSocial, type GolferEntry } from '@/lib/courses';
import { bodyFont, displayFont } from '@/lib/fonts';

/**
 * Club page — ported from
 * apps/web/src/app/clubs/[country]/[club]/page.tsx. Groups a club's
 * courses by physical location (a text club name can map to several
 * unrelated physical clubs, e.g. "Eagle Ridge Golf Club" across US
 * states) and shows club members / golfers who've played / friends
 * who've played.
 */
export default function ClubScreen() {
  const { country: countryParam, club: clubParam, from } = useLocalSearchParams<{ country: string; club: string; from?: string }>();
  const router = useRouter();
  const { session } = useAuth();
  const userId = session?.user.id;

  const country = decodeURIComponent(countryParam ?? '');
  const club = decodeURIComponent(clubParam ?? '');

  const [locationGroups, setLocationGroups] = useState<ClubLocationGroup[] | null>(null);
  const [ratingsAndPlayed, setRatingsAndPlayed] = useState<ClubRatingsAndPlayed | null>(null);
  const [social, setSocial] = useState<{ clubMembers: GolferEntry[]; friendRounds: GolferEntry[]; others: GolferEntry[] } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!country || !club || !userId) return;
    let cancelled = false;

    (async () => {
      try {
        const courses = await fetchClubCourses(country, club);
        if (cancelled) return;
        if (courses.length === 0) {
          setError('This club could not be found.');
          return;
        }
        setLocationGroups(groupByLocation(courses));
        const courseIds = courses.map((c) => c.id);
        const [ratings, social] = await Promise.all([
          fetchClubRatingsAndPlayed(courseIds, userId),
          fetchCourseSocial(courseIds, userId, club),
        ]);
        if (cancelled) return;
        setRatingsAndPlayed(ratings);
        setSocial(social);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load club.');
      }
    })();

    return () => { cancelled = true; };
  }, [country, club, userId]);

  if (!userId) return null;

  const loaded = locationGroups && ratingsAndPlayed && social;
  const totalCourses = locationGroups?.reduce((n, g) => n + g.courses.length, 0) ?? 0;
  const flag = locationGroups?.[0]?.courses[0]?.flag ?? null;

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
        <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
          <LinearGradient
            colors={[colors.passport.coverLight, colors.passport.coverDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 8, borderWidth: 1, borderColor: colors.passport.coverInk, padding: 24 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 2, color: colors.accent.gold, marginBottom: 6 }}>
                  Club
                </Text>
                <Text style={{ fontFamily: displayFont.medium, fontSize: 26, color: colors.paper.cream, letterSpacing: -0.3, lineHeight: 30 }}>
                  {club}
                </Text>
                <Text style={{ color: colors.paper.cream, opacity: 0.8, fontSize: 14, marginTop: 8 }}>
                  {country} {flag ?? ''}
                </Text>
                <Text
                  className="uppercase"
                  style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.paper.cream, opacity: 0.6, marginTop: 6 }}
                >
                  {totalCourses} {totalCourses === 1 ? 'course' : 'courses'}
                </Text>
              </View>
              <Text style={{ fontSize: 44 }}>{flag ?? '🏌️'}</Text>
            </View>
          </LinearGradient>

          {locationGroups.map((group) => (
            <View key={group.key} style={{ backgroundColor: colors.paper.white, borderWidth: 1, borderColor: colors.border.paper, borderRadius: 8, overflow: 'hidden' }}>
              <Text
                className="uppercase"
                style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 2, color: colors.ink.tertiary, padding: 16, paddingBottom: 10 }}
              >
                {group.label}
              </Text>
              {group.courses.map((c, i) => {
                const rating = ratingsAndPlayed.ratingsByCourse.get(c.id);
                const played = ratingsAndPlayed.playedIds.has(c.id);
                return (
                  <View
                    key={c.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      padding: 16,
                      paddingTop: 12,
                      borderTopWidth: i === 0 ? 1 : 0,
                      borderTopColor: colors.border.paperFaint,
                      borderBottomWidth: i < group.courses.length - 1 ? 1 : 0,
                      borderBottomColor: colors.border.paperFaint,
                    }}
                  >
                    <Pressable
                      onPress={() => router.push(`/courses/${c.id}?from=club`)}
                      style={{ flex: 1, minWidth: 0 }}
                    >
                      <Text style={{ fontFamily: displayFont.medium, fontSize: 17, color: colors.passport.cover, letterSpacing: -0.2 }}>
                        {isGenericCourseName(c.name) ? 'Main course' : c.name}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
                        <Text style={{ fontSize: 13, color: colors.ink.secondary }}>
                          {[c.holes && `${c.holes} holes`, c.par && `Par ${c.par}`].filter(Boolean).join(' · ')}
                        </Text>
                        {rating && (
                          <>
                            <View style={{ backgroundColor: colors.paper.creamWarm, borderWidth: 1, borderColor: colors.border.paperFaint, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 1 }}>
                              <Text style={{ fontFamily: displayFont.medium, fontSize: 12, color: colors.accent.goldDark }}>{rating.avg.toFixed(1)}/10</Text>
                            </View>
                            <Text style={{ color: colors.ink.tertiary, fontSize: 13 }}>({rating.count})</Text>
                          </>
                        )}
                      </View>
                    </Pressable>
                    {played ? (
                      <View style={{ borderWidth: 1, borderStyle: 'dashed', borderColor: colors.stamp.red, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 }}>
                        <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, color: colors.stamp.red }}>
                          ✓ Played
                        </Text>
                      </View>
                    ) : (
                      <Pressable
                        onPress={() => router.push(`/courses/${c.id}?from=club`)}
                        style={{ backgroundColor: colors.passport.cover, borderRadius: 4, paddingHorizontal: 10, paddingVertical: 5 }}
                      >
                        <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.inverse }}>
                          View →
                        </Text>
                      </Pressable>
                    )}
                  </View>
                );
              })}
            </View>
          ))}

          <GolfersListAccordion title="Club members" golfers={social.clubMembers} accentColor={colors.accent.gold} accentText={colors.passport.coverInk} linkFrom="club" />
          <GolfersListAccordion title="Golfers who've played" golfers={social.others} linkFrom="club" />
          <GolfersListAccordion title="Friends who've played" golfers={social.friendRounds} linkFrom="club" />

          <ReportIncorrectInfoLink courseId={locationGroups[0].courses[0].id} />
        </ScrollView>
      )}
    </View>
  );
}
