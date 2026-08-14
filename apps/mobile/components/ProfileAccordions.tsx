import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@mygolfpassport/shared';

import WaxSealBadge from '@/components/WaxSealBadge';
import { isGenericCourseName } from '@/lib/course-display';
import { bodyFont, displayFont } from '@/lib/fonts';
import { formatPlayedDate } from '@/lib/played-date';
import type { BadgeEntry, CountryEntry, CourseEntry } from '@/lib/you';

/**
 * Ported from apps/web/src/components/ProfileAccordions.tsx — shared by
 * the You > Courses subtab (hideBadges, own data) and the public profile
 * screen (badges included, someone else's data). Two collapsible
 * accordions: "Courses" (grouped by country, header shows round count,
 * rows show rating + played date) and "Badges" (earned badges only,
 * unless hideBadges).
 *
 * Was three accordions (a separate "Courses" and "Countries", both just
 * the same course list grouped by country with a different header metric)
 * until 2026-08-02 — Thomas flagged it as confusing to show two near-
 * identical lists, so they were merged into one. The home-profile and
 * You-tab profile cards' "Countries" stat is now plain text, not a
 * clickable tile, for the same reason (see PassportCard.tsx).
 */
function RatingBadge({ value }: { value: number }) {
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

function courseRow(
  c: CourseEntry,
  showDate: boolean,
  onPress: () => void,
  isLast: boolean,
  onEditRound?: (roundId: string) => void,
  onDeleteRound?: (roundId: string) => void
) {
  const secondary =
    c.clubName && c.courseName && c.courseName !== c.clubName && !isGenericCourseName(c.courseName) ? c.courseName : null;
  return (
    <View
      key={c.courseId}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: colors.border.paperFaint,
      }}
    >
      <Pressable
        onPress={onPress}
        style={{ flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingHorizontal: 16, paddingLeft: 24 }}
      >
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text numberOfLines={1} style={{ fontFamily: displayFont.medium, fontSize: 15, color: colors.ink.primary }}>
            {c.clubName ?? c.courseName}
          </Text>
          {secondary && (
            <Text
              className="uppercase"
              numberOfLines={1}
              style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.2, color: colors.ink.tertiary, marginTop: 2 }}
            >
              {secondary}
            </Text>
          )}
        </View>
        <View style={{ alignItems: 'flex-end', gap: 4 }}>
          {c.rating != null && c.rating > 0 ? (
            <RatingBadge value={c.rating} />
          ) : (
            <Text style={{ color: colors.border.paperFaint, fontSize: 12 }}>—</Text>
          )}
          {showDate && c.playedAt && (
            <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 10, letterSpacing: 1, color: colors.ink.tertiary }}>
              {formatPlayedDate(c.playedAt, c.playedAtPrecision, 'short')}
            </Text>
          )}
        </View>
      </Pressable>
      {onEditRound && c.roundId && (
        <Pressable
          accessibilityRole="button"
          onPress={() => onEditRound(c.roundId!)}
          hitSlop={10}
          style={{ paddingHorizontal: 16, paddingVertical: 10 }}
        >
          <Ionicons name="pencil" size={16} color={colors.ink.tertiary} />
        </Pressable>
      )}
      {onDeleteRound && c.roundId && (
        <Pressable
          accessibilityRole="button"
          onPress={() => onDeleteRound(c.roundId!)}
          hitSlop={10}
          style={{ paddingHorizontal: 16, paddingVertical: 10 }}
        >
          <Ionicons name="trash-outline" size={16} color={colors.state.danger} />
        </Pressable>
      )}
    </View>
  );
}

function Accordion({
  title,
  count,
  defaultOpen,
  children,
}: {
  title: string;
  count: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <View style={{ backgroundColor: colors.paper.white, borderWidth: 1, borderColor: colors.border.paperFaint, borderRadius: 14, overflow: 'hidden' }}>
      <Pressable
        accessibilityRole="button"
        onPress={() => setOpen((o) => !o)}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={{ fontFamily: displayFont.medium, fontSize: 17, color: colors.ink.primary }}>{title}</Text>
          <View
            style={{
              backgroundColor: colors.paper.creamWarm,
              borderWidth: 1,
              borderColor: colors.border.paperFaint,
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 2,
            }}
          >
            <Text style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.secondary }}>{count}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 13, color: colors.ink.tertiary }}>{open ? '▴' : '▾'}</Text>
      </Pressable>
      {open && <View style={{ borderTopWidth: 1, borderTopColor: colors.border.paperFaint }}>{children}</View>}
    </View>
  );
}

function CountryGroupList({
  countries,
  courses,
  headerMetric,
  showRatingDate,
  onPressCourse,
  onEditRound,
  onDeleteRound,
}: {
  countries: { country: string; flag: string | null; itemCount: number }[];
  courses: CourseEntry[];
  headerMetric: (n: number) => string;
  showRatingDate: boolean;
  onPressCourse: (courseId: string) => void;
  onEditRound?: (roundId: string) => void;
  onDeleteRound?: (roundId: string) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <View>
      {countries.map((c, i) => {
        const isOpen = expanded === c.country;
        const countryCourses = courses.filter((cr) => cr.country === c.country);
        return (
          <View key={c.country}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setExpanded(isOpen ? null : c.country)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 12,
                paddingHorizontal: 16,
                borderBottomWidth: !isOpen && i < countries.length - 1 ? 1 : 0,
                borderBottomColor: colors.border.paperFaint,
                backgroundColor: isOpen ? colors.paper.creamWarm : 'transparent',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Text style={{ fontSize: 20 }}>{c.flag ?? '🌍'}</Text>
                <Text style={{ fontFamily: displayFont.medium, fontSize: 15, color: colors.ink.primary }}>{c.country}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View
                  style={{
                    backgroundColor: colors.paper.creamWarm,
                    borderWidth: 1,
                    borderColor: colors.border.paperFaint,
                    borderRadius: 4,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                  }}
                >
                  <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.2, color: colors.ink.secondary }}>
                    {headerMetric(c.itemCount)}
                  </Text>
                </View>
                <Text style={{ fontSize: 13, color: colors.ink.tertiary }}>{isOpen ? '▴' : '▾'}</Text>
              </View>
            </Pressable>

            {isOpen && (
              <View style={{ backgroundColor: colors.paper.creamWarm, borderBottomWidth: i < countries.length - 1 ? 1 : 0, borderBottomColor: colors.border.paperFaint }}>
                {countryCourses.map((cr, j) =>
                  courseRow(
                    cr,
                    showRatingDate,
                    () => onPressCourse(cr.courseId),
                    j === countryCourses.length - 1,
                    onEditRound,
                    onDeleteRound
                  )
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

type Props = {
  courseEntries: CourseEntry[];
  countryEntries: CountryEntry[];
  badges?: BadgeEntry[];
  hideBadges?: boolean;
  /** Forces the Badges accordion open on mount — used when the caller
   *  scrolls here from a "Badges" stat tap, so the section is already
   *  expanded instead of requiring an extra tap. */
  badgesDefaultOpen?: boolean;
  onPressCourse: (courseId: string) => void;
  /** Report each section's Y offset *within this component* (not the
   *  screen) so the caller can add its own measured offset of this whole
   *  block and scroll to the exact section instead of just the top. */
  onLayoutCourses?: (y: number) => void;
  onLayoutBadges?: (y: number) => void;
  /** Shows an edit-round pencil icon in the Courses accordion (own profile
   *  only — matches web's isOwnProfile-gated edit link in
   *  ProfileAccordions.tsx's CoursesByCountry). */
  onEditRound?: (roundId: string) => void;
  /** Shows a delete-round trash icon in the Courses accordion (own profile
   *  only — matches web's isOwnProfile-gated delete button in
   *  ProfileAccordions.tsx's CoursesByCountry). */
  onDeleteRound?: (roundId: string) => void;
};

export default function ProfileAccordions({
  courseEntries,
  countryEntries,
  badges,
  hideBadges,
  badgesDefaultOpen,
  onPressCourse,
  onLayoutCourses,
  onLayoutBadges,
  onEditRound,
  onDeleteRound,
}: Props) {
  // "Courses" accordion groups by country too, but sorted by round-count
  // DESC (most-played country first) — same courseEntries, different order
  // than countryEntries (already course-count DESC from the fetcher).
  const byRoundCount = [...countryEntries].sort((a, b) => {
    const ac = courseEntries.filter((c) => c.country === a.country).length;
    const bc = courseEntries.filter((c) => c.country === b.country).length;
    return bc - ac;
  });

  if (courseEntries.length === 0) {
    return (
      <Text style={{ fontFamily: bodyFont.regular, fontSize: 14, color: colors.ink.tertiary, textAlign: 'center', marginTop: 24 }}>
        No courses logged yet.
      </Text>
    );
  }

  return (
    <View style={{ gap: 12 }}>
      <View onLayout={(e) => onLayoutCourses?.(e.nativeEvent.layout.y)}>
        <Accordion title="Courses" count={courseEntries.length} defaultOpen>
          <CountryGroupList
            countries={byRoundCount.map((c) => ({
              country: c.country,
              flag: c.flag,
              itemCount: courseEntries.filter((cr) => cr.country === c.country).length,
            }))}
            courses={courseEntries}
            headerMetric={(n) => `${n} ${n === 1 ? 'round' : 'rounds'}`}
            showRatingDate
            onPressCourse={onPressCourse}
            onEditRound={onEditRound}
            onDeleteRound={onDeleteRound}
          />
        </Accordion>
      </View>

      {!hideBadges && (
        <View onLayout={(e) => onLayoutBadges?.(e.nativeEvent.layout.y)}>
        <Accordion
          key={badgesDefaultOpen ? 'badges-open' : 'badges-closed'}
          title="Badges"
          count={badges?.length ?? 0}
          defaultOpen={badgesDefaultOpen}
        >
          {!badges || badges.length === 0 ? (
            <Text style={{ fontFamily: bodyFont.regular, fontSize: 13, color: colors.ink.tertiary, textAlign: 'center', paddingVertical: 20 }}>
              No badges earned yet.
            </Text>
          ) : (
            <View style={{ paddingVertical: 4 }}>
              {badges.map((b, i) => (
                <View
                  key={b.name}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                    padding: 12,
                    paddingHorizontal: 14,
                    borderBottomWidth: i < badges.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border.paperFaint,
                  }}
                >
                  <WaxSealBadge name={b.name} tier={b.tier} emoji={b.emoji} size={48} rotation={(b.name.charCodeAt(0) % 5) - 2} />
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={{ fontFamily: displayFont.medium, fontSize: 16, color: colors.ink.primary }}>{b.name}</Text>
                    <Text style={{ fontSize: 12, color: colors.ink.tertiary, marginTop: 2 }}>{b.description}</Text>
                  </View>
                  <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 10, letterSpacing: 1, color: colors.ink.tertiary }}>
                    {b.tier}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </Accordion>
        </View>
      )}
    </View>
  );
}
