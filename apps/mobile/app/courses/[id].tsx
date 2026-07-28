import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@mygolfpassport/shared';

import Avatar from '@/components/Avatar';
import PassportStamp from '@/components/PassportStamp';
import ReportIncorrectInfoLink from '@/components/ReportIncorrectInfoLink';
import { useAuth } from '@/lib/auth-context';
import { isGenericCourseName, usStateSuffix } from '@/lib/course-display';
import { fetchCourseDetail, type CourseDetailResult } from '@/lib/courses';
import { bodyFont, displayFont } from '@/lib/fonts';

/**
 * Course detail screen — ported from apps/web/src/app/courses/[id]/page.tsx
 * + CourseHero.tsx. Club-members / friends-who-played / others-who-played
 * accordions are deliberately not ported yet (see apps/mobile/STATUS.md).
 */
export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { session } = useAuth();
  const userId = session?.user.id;
  const insets = useSafeAreaInsets();

  const [detail, setDetail] = useState<CourseDetailResult | null>(null);
  const [error, setError] = useState('');
  const scrollRef = useRef<ScrollView>(null);
  const reviewsY = useRef(0);

  useEffect(() => {
    if (!id || !userId) return;
    let cancelled = false;
    fetchCourseDetail(id, userId)
      .then((result) => { if (!cancelled) setDetail(result); })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load course.'); });
    return () => { cancelled = true; };
  }, [id, userId]);

  if (!userId) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.paper.cream }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingHorizontal: 16,
          paddingTop: insets.top + 14,
          paddingBottom: 14,
          backgroundColor: colors.passport.cover,
        }}
      >
        <Pressable accessibilityRole="button" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={colors.paper.cream} />
        </Pressable>
        <Text numberOfLines={1} style={{ flex: 1, color: colors.paper.cream, fontFamily: displayFont.medium, fontSize: 18 }}>
          {detail ? (isGenericCourseName(detail.course.name) ? (detail.course.club ?? detail.course.name) : detail.course.name) : '…'}
        </Text>
      </View>

      {error.length > 0 && (
        <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, padding: 16 }}>{error}</Text>
      )}

      {!detail && error.length === 0 && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={colors.accent.gold} />
        </View>
      )}

      {detail && (
        <ScrollView ref={scrollRef} contentContainerStyle={{ padding: 16, gap: 14 }}>
          <Hero detail={detail} onStamp={() => router.push(`/log?course=${detail.course.id}`)} />

          <Card>
            {detail.avgRating != null ? (
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                <Text style={{ fontFamily: displayFont.medium, fontSize: 34, color: colors.accent.goldDark }}>
                  {detail.avgRating.toFixed(1)}
                </Text>
                <Text style={{ fontSize: 22, color: colors.accent.gold }}>★</Text>
                <Text
                  className="uppercase"
                  style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.tertiary, marginLeft: 4 }}
                >
                  {detail.ratingCount} {detail.ratingCount === 1 ? 'review' : 'reviews'}
                </Text>
              </View>
            ) : (
              <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.tertiary }}>
                No reviews yet
              </Text>
            )}
            {detail.visit.userRating != null && detail.visit.userRating > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
                <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.secondary }}>
                  Your rating
                </Text>
                <Text style={{ fontFamily: displayFont.medium, fontSize: 16, color: colors.ink.primary }}>
                  {detail.visit.userRating}/10
                </Text>
              </View>
            )}
            {detail.reviews.length > 0 && (
              <Pressable
                accessibilityRole="button"
                onPress={() => scrollRef.current?.scrollTo({ y: reviewsY.current, animated: true })}
                style={{ marginTop: 12, borderTopWidth: 1, borderTopColor: colors.border.paperFaint, paddingTop: 10 }}
              >
                <Text
                  className="uppercase"
                  style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.passport.cover }}
                >
                  See all reviews ›
                </Text>
              </Pressable>
            )}
          </Card>

          <View
            style={{
              backgroundColor: colors.paper.white,
              borderWidth: 1,
              borderColor: colors.border.paper,
              borderLeftWidth: 3,
              borderLeftColor: detail.visit.hasAnyRound ? colors.state.success : colors.border.paper,
              borderRadius: 6,
              padding: 16,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
              {detail.visit.hasAnyRound && <Text style={{ fontSize: 16, color: colors.state.success }}>✓</Text>}
              <View style={{ flex: 1 }}>
                <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.primary }}>
                  {detail.visit.hasAnyRound ? 'Stamped in your passport' : 'Not yet stamped'}
                </Text>
                {detail.visit.latestPlayedAt && (
                  <Text style={{ fontSize: 13, color: colors.ink.secondary, marginTop: 2 }}>
                    {formatDate(detail.visit.latestPlayedAt)}
                  </Text>
                )}
                {detail.visit.roundCount > 1 && (
                  <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.2, color: colors.ink.tertiary, marginTop: 6 }}>
                    {detail.visit.roundCount} rounds
                    {detail.visit.earliestPlayedAt && ` · Since ${formatDateShort(detail.visit.earliestPlayedAt)}`}
                  </Text>
                )}
              </View>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push(`/log?course=${detail.course.id}`)}
              style={{ backgroundColor: colors.accent.gold, borderRadius: 4, paddingVertical: 12, alignItems: 'center', marginTop: 12 }}
            >
              <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, color: colors.passport.cover }}>
                {detail.visit.hasAnyRound ? '+ Log new round' : '+ Log round'}
              </Text>
            </Pressable>
          </View>

          {detail.reviews.length > 0 && (
            <View onLayout={(e) => { reviewsY.current = e.nativeEvent.layout.y; }}>
              <Text
                className="uppercase"
                style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 2, color: colors.ink.tertiary, marginBottom: 10 }}
              >
                Reviews · {detail.reviews.length}
              </Text>
              <View style={{ gap: 8 }}>
                {detail.reviews.map((r) => (
                  <View
                    key={r.userId}
                    style={{
                      flexDirection: 'row',
                      gap: 12,
                      backgroundColor: colors.paper.white,
                      borderWidth: 1,
                      borderColor: colors.border.paper,
                      borderRadius: 8,
                      padding: 14,
                    }}
                  >
                    <Avatar name={r.fullName} avatarUrl={r.avatarUrl} size={36} />
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                        <Text numberOfLines={1} style={{ fontFamily: displayFont.medium, fontSize: 16, color: colors.ink.primary, flexShrink: 1 }}>
                          {r.fullName}
                        </Text>
                        {r.rating != null && (
                          <Text style={{ fontFamily: displayFont.medium, fontSize: 14, color: colors.accent.goldDark, flexShrink: 0 }}>
                            {r.rating}/10
                          </Text>
                        )}
                      </View>
                      {r.note && (
                        <Text style={{ fontFamily: displayFont.medium, fontSize: 14, fontStyle: 'italic', color: colors.ink.secondary, marginTop: 6 }}>
                          “{r.note}”
                        </Text>
                      )}
                      {r.playedAt && (
                        <Text
                          className="uppercase"
                          style={{ fontFamily: bodyFont.semibold, fontSize: 10, letterSpacing: 1.5, color: colors.ink.tertiary, marginTop: 8 }}
                        >
                          Played {formatDateShort(r.playedAt)}
                        </Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {(detail.course.address || detail.course.website || detail.course.phone || detail.course.foundedYear) && (
            <View
              style={{
                backgroundColor: colors.paper.white,
                borderWidth: 1,
                borderColor: colors.border.paper,
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <Text style={{ fontFamily: displayFont.medium, fontSize: 16, color: colors.ink.primary, padding: 16, paddingBottom: 10 }}>
                Club info
              </Text>
              {detail.course.address && <InfoRow label="Address" value={detail.course.address} />}
              {detail.course.website && (
                <InfoRow
                  label="Website"
                  value={detail.course.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  onPress={() => Linking.openURL(detail.course.website!)}
                />
              )}
              {detail.course.phone && (
                <InfoRow label="Phone" value={detail.course.phone} onPress={() => Linking.openURL(`tel:${detail.course.phone}`)} />
              )}
              {detail.course.foundedYear && <InfoRow label="Founded" value={String(detail.course.foundedYear)} last />}
            </View>
          )}

          <ReportIncorrectInfoLink courseId={detail.course.id} />
        </ScrollView>
      )}
    </View>
  );
}

function Hero({ detail, onStamp }: { detail: CourseDetailResult; onStamp: () => void }) {
  const { course, visit } = detail;
  const courseGeneric = isGenericCourseName(course.name);
  const promoteClubToHeadline = courseGeneric && !!course.club;
  const headline = promoteClubToHeadline ? course.club! : course.name;
  const showClubRow = !promoteClubToHeadline && !!course.club;

  const stats = [
    course.holes && `${course.holes} HOLES`,
    course.par && `PAR ${course.par}`,
    course.foundedYear && `EST. ${course.foundedYear}`,
  ].filter(Boolean) as string[];

  const playedYear = visit.latestPlayedAt ? new Date(visit.latestPlayedAt).getFullYear() : null;

  return (
    <View style={{ borderTopWidth: 1.5, borderBottomWidth: 1.5, borderColor: colors.border.paperStrong, backgroundColor: colors.paper.creamWarm, padding: 18 }}>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
        <View style={{ flex: 1, minWidth: 0 }}>
          {course.country && (
            <Text
              className="uppercase"
              style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 2, color: colors.ink.tertiary, marginBottom: 6 }}
            >
              {course.flag ? `${course.flag} ` : ''}
              {course.country}
              {usStateSuffix(course.country, course.state)}
            </Text>
          )}
          <Text style={{ fontFamily: displayFont.semibold, fontSize: 24, color: colors.ink.primary, lineHeight: 28 }}>{headline}</Text>
          {showClubRow && (
            <Text style={{ fontSize: 14, fontWeight: '500', color: colors.ink.secondary, marginTop: 6 }}>{course.club}</Text>
          )}
          {stats.length > 0 && (
            <Text
              className="uppercase"
              style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.secondary, marginTop: 14, lineHeight: 18 }}
            >
              {stats.join(' · ')}
            </Text>
          )}
          {(course.isMajor || detail.top100 != null) && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              {course.isMajor && (
                <View style={{ backgroundColor: colors.accent.gold, borderWidth: 1, borderColor: colors.accent.goldDark, borderRadius: 2, paddingHorizontal: 10, paddingVertical: 4 }}>
                  <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.passport.coverInk }}>
                    Major venue
                  </Text>
                </View>
              )}
              {detail.top100 != null && (
                <View style={{ borderWidth: 1, borderColor: colors.border.paperStrong, borderRadius: 2, paddingHorizontal: 10, paddingVertical: 4 }}>
                  <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.primary }}>
                    Top {detail.top100.listName ?? '100'}{detail.top100.rank ? ` · #${detail.top100.rank}` : ''}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

        <View style={{ paddingTop: 8 }}>
          {visit.latestPlayedAt ? (
            <PassportStamp year={playedYear ?? new Date().getFullYear()} size={86} />
          ) : (
            <Pressable
              accessibilityRole="button"
              onPress={onStamp}
              style={{
                width: 86,
                height: 86,
                borderRadius: 43,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: colors.ink.tertiary,
                transform: [{ rotate: '-4deg' }],
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(31, 58, 46, 0.03)',
              }}
            >
              <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 9, letterSpacing: 2, color: colors.ink.secondary }}>
                Stamp
              </Text>
              <Text style={{ fontFamily: displayFont.medium, fontSize: 14, color: colors.ink.secondary, letterSpacing: 1 }}>Here</Text>
              <Text style={{ fontSize: 16, color: colors.ink.secondary, marginTop: 2 }}>+</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ backgroundColor: colors.paper.white, borderWidth: 1, borderColor: colors.border.paper, borderRadius: 8, padding: 16 }}>
      {children}
    </View>
  );
}

function InfoRow({ label, value, onPress, last }: { label: string; value: string; onPress?: () => void; last?: boolean }) {
  const content = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
        padding: 16,
        paddingTop: 12,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: colors.border.paperFaint,
      }}
    >
      <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.tertiary }}>
        {label}
      </Text>
      <Text
        style={{ fontSize: 14, color: onPress ? colors.passport.cover : colors.ink.primary, fontWeight: '500', flex: 1, textAlign: 'right' }}
      >
        {value}
      </Text>
    </View>
  );
  return onPress ? <Pressable onPress={onPress}>{content}</Pressable> : content;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
}
