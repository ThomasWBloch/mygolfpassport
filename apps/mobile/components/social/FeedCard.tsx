import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import Avatar from '@/components/Avatar';
import WaxSealBadge from '@/components/WaxSealBadge';
import { courseDisplayLabel, courseSecondaryLabel, isGenericCourseName, usStateSuffix } from '@/lib/course-display';
import type { FeedBadgeItem, FeedFriendshipItem, FeedItem, FeedRoundItem } from '@/lib/feed';
import { relativeTimestamp } from '@/lib/feed';
import { playedAtLabel } from '@/lib/played-date';
import { bodyFont, displayFont } from '@/lib/fonts';

/**
 * Ported from apps/web/src/components/FeedCard.tsx — same three variants
 * (round/badge/friendship) and copy, rebuilt with React Native primitives
 * and the same design tokens the other Social subtabs already use instead
 * of web's div/span/img + CSS variables.
 */

const CARD_STYLE = {
  backgroundColor: colors.paper.white,
  borderWidth: 1,
  borderColor: colors.border.paper,
  borderRadius: 8,
  padding: 14,
} as const;

function StampLabel({ children }: { children: string }) {
  return (
    <Text
      className="uppercase"
      style={{ fontFamily: bodyFont.bold, fontSize: 10, letterSpacing: 1, color: colors.ink.tertiary, marginTop: 8 }}
    >
      {children}
    </Text>
  );
}

function RatingPill({ value }: { value: number }) {
  return (
    <View
      style={{
        backgroundColor: colors.paper.creamWarm,
        borderWidth: 1,
        borderColor: colors.border.paperFaint,
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        alignSelf: 'flex-start',
      }}
    >
      <Text style={{ fontFamily: displayFont.medium, fontSize: 12, color: colors.accent.goldDark }}>{value}/10</Text>
    </View>
  );
}

export default function FeedCard({ item, viewerId }: { item: FeedItem; viewerId?: string }) {
  switch (item.type) {
    case 'round':
      return <RoundCard item={item} viewerId={viewerId} />;
    case 'badge':
      return <BadgeCard item={item} />;
    case 'friendship':
      return <FriendshipCard item={item} />;
  }
}

// ── Round card ──────────────────────────────────────────────────────────────

function RoundCard({ item, viewerId }: { item: FeedRoundItem; viewerId?: string }) {
  const router = useRouter();
  const hasRating = item.rating != null;
  const playedYear = item.playedAt ? new Date(item.playedAt).getFullYear() : null;
  const isOwn = !!viewerId && item.actorId === viewerId;
  const dateLabel = playedAtLabel(item.playedAt, item.playedAtPrecision) ?? relativeTimestamp(item.timestamp);

  const courseIsGeneric = isGenericCourseName(item.courseName);
  const courseAndClubAreSame =
    !!item.clubName && !!item.courseName && item.courseName.trim().toLowerCase() === item.clubName.trim().toLowerCase();
  const stateSuffix = usStateSuffix(item.country, item.state);

  // Course name primary, club secondary — matches log.tsx and the home
  // screen's "Your recent courses" (courseDisplayLabel/courseSecondaryLabel
  // from lib/course-display). Previously this had its own inline logic that
  // put the club name first whenever the course/club names differed and
  // neither was generic — backwards from every other screen.
  const headline = courseDisplayLabel({ courseName: item.courseName, clubName: item.clubName });
  const secondary = courseSecondaryLabel({ courseName: item.courseName, clubName: item.clubName });

  return (
    <View style={{ ...CARD_STYLE, flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
      {!isOwn && (
        <Pressable onPress={() => router.push(`/profile/${item.actorId}?from=feed`)}>
          <Avatar name={item.actorName} avatarUrl={item.actorAvatarUrl} size={36} />
        </Pressable>
      )}

      <View style={{ flex: 1, minWidth: 0 }}>
        {isOwn ? (
          <Pressable onPress={() => router.push(`/courses/${item.courseId}?from=feed`)}>
            <Text style={{ fontFamily: displayFont.medium, fontSize: 17, color: colors.ink.primary, letterSpacing: -0.2 }}>
              {headline}
              {stateSuffix}
            </Text>
            {!!secondary && (
              <Text
                className="uppercase"
                numberOfLines={1}
                style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.2, color: colors.ink.tertiary, marginTop: 3 }}
              >
                {secondary}
              </Text>
            )}
          </Pressable>
        ) : (
          <Text style={{ fontSize: 14, color: colors.ink.primary, lineHeight: 20 }}>
            <Text
              onPress={() => router.push(`/profile/${item.actorId}?from=feed`)}
              style={{ fontFamily: bodyFont.medium, color: colors.ink.primary }}
            >
              {item.actorName}
            </Text>
            {courseIsGeneric && item.clubName ? (
              <>
                {' '}added{' '}
                <Text
                  onPress={() => router.push(`/courses/${item.courseId}?from=feed`)}
                  style={{ fontFamily: bodyFont.medium, color: colors.ink.primary }}
                >
                  {item.clubName}
                  {stateSuffix}
                </Text>
                {' '}to their passport
              </>
            ) : courseAndClubAreSame || !item.clubName ? (
              <>
                {' '}added{' '}
                <Text
                  onPress={() => router.push(`/courses/${item.courseId}?from=feed`)}
                  style={{ fontFamily: bodyFont.medium, color: colors.ink.primary }}
                >
                  {item.courseName}
                  {stateSuffix}
                </Text>
                {' '}to their passport
              </>
            ) : (
              <>
                {' '}added{' '}
                <Text
                  onPress={() => router.push(`/courses/${item.courseId}?from=feed`)}
                  style={{ fontFamily: bodyFont.medium, color: colors.ink.primary }}
                >
                  {item.courseName}
                  {stateSuffix}
                </Text>
                {' '}<Text style={{ color: colors.ink.secondary }}>at</Text>{' '}
                <Text
                  onPress={() => router.push(`/courses/${item.courseId}?from=feed`)}
                  style={{ color: colors.ink.secondary }}
                >
                  {item.clubName}
                </Text>
                {' '}to their passport
              </>
            )}
          </Text>
        )}

        {(hasRating || (item.country && !isOwn)) && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
            {hasRating && <RatingPill value={item.rating as number} />}
            {item.country && !isOwn && (
              <Text style={{ fontSize: 13, color: colors.ink.tertiary }}>
                {hasRating ? '· ' : ''}
                {item.country}
              </Text>
            )}
          </View>
        )}

        {item.note && (
          <Text
            numberOfLines={2}
            style={{ marginTop: 6, fontFamily: displayFont.regularItalic, fontSize: 15, color: colors.ink.secondary, lineHeight: 20 }}
          >
            “{item.note}”
          </Text>
        )}

        <StampLabel>{dateLabel}</StampLabel>
      </View>

      {playedYear && (
        <View style={{ alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 1.5,
              borderStyle: 'dashed',
              borderColor: colors.stamp.red,
              transform: [{ rotate: '-8deg' }],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: bodyFont.semibold,
                fontSize: 8,
                color: colors.stamp.red,
                textAlign: 'center',
                letterSpacing: 0.5,
              }}
            >
              PLAYED{'\n'}
              {playedYear}
            </Text>
          </View>
          {item.flag && <Text style={{ fontSize: 18 }}>{item.flag}</Text>}
        </View>
      )}
    </View>
  );
}

// ── Badge card ──────────────────────────────────────────────────────────────

function BadgeCard({ item }: { item: FeedBadgeItem }) {
  const router = useRouter();
  return (
    <View style={{ ...CARD_STYLE, flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
      <Pressable onPress={() => router.push(`/profile/${item.actorId}?from=feed`)}>
        <Avatar name={item.actorName} avatarUrl={item.actorAvatarUrl} size={36} />
      </Pressable>

      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={{ fontSize: 14, color: colors.ink.primary }}>
          <Text
            onPress={() => router.push(`/profile/${item.actorId}?from=feed`)}
            style={{ fontFamily: bodyFont.medium, color: colors.ink.primary }}
          >
            {item.actorName}
          </Text>
          {' '}earned a badge
        </Text>

        <Pressable
          onPress={() => router.push(`/profile/${item.actorId}?from=feed`)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginTop: 6,
            padding: 10,
            backgroundColor: colors.paper.creamWarm,
            borderWidth: 1,
            borderColor: colors.border.paperFaint,
            borderRadius: 8,
          }}
        >
          <WaxSealBadge name={item.badgeName} tier={item.badgeTier} emoji={item.badgeEmoji} size={36} />
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={{ fontFamily: displayFont.medium, fontSize: 15, color: colors.ink.primary }}>{item.badgeName}</Text>
            {item.badgeDescription && (
              <Text numberOfLines={1} style={{ fontSize: 13, color: colors.ink.secondary, marginTop: 2 }}>
                {item.badgeDescription}
              </Text>
            )}
          </View>
        </Pressable>

        <StampLabel>{relativeTimestamp(item.timestamp)}</StampLabel>
      </View>
    </View>
  );
}

// ── Friendship card ─────────────────────────────────────────────────────────

function FriendshipCard({ item }: { item: FeedFriendshipItem }) {
  const router = useRouter();
  return (
    <View style={CARD_STYLE}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <Pressable onPress={() => router.push(`/profile/${item.actorId}?from=feed`)}>
          <Avatar name={item.actorName} avatarUrl={item.actorAvatarUrl} size={28} />
        </Pressable>
        <View style={{ width: 16, borderTopWidth: 1, borderStyle: 'dashed', borderColor: colors.border.paper }} />
        <Pressable onPress={() => router.push(`/profile/${item.otherId}?from=feed`)}>
          <Avatar name={item.otherName} avatarUrl={item.otherAvatarUrl} size={28} />
        </Pressable>
      </View>

      <Text style={{ fontSize: 14, color: colors.ink.primary, lineHeight: 20 }}>
        Your friend,{' '}
        <Text
          onPress={() => router.push(`/profile/${item.actorId}?from=feed`)}
          style={{ fontFamily: bodyFont.medium, color: colors.ink.primary }}
        >
          {item.actorName}
        </Text>
        {' '}just connected with{' '}
        <Text
          onPress={() => router.push(`/profile/${item.otherId}?from=feed`)}
          style={{ fontFamily: bodyFont.medium, color: colors.ink.primary }}
        >
          {item.otherName}
        </Text>
      </Text>

      {!item.otherIsFriendOfMine && (
        <Pressable
          onPress={() => router.push(`/profile/${item.otherId}?from=feed`)}
          style={{
            alignSelf: 'flex-start',
            marginTop: 8,
            backgroundColor: colors.passport.cover,
            borderRadius: 4,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1, color: colors.ink.inverse }}>
            View profile ›
          </Text>
        </Pressable>
      )}

      <StampLabel>{relativeTimestamp(item.timestamp)}</StampLabel>
    </View>
  );
}
