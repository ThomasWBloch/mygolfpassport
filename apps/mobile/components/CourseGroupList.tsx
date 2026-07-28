import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@mygolfpassport/shared';

import { isGenericCourseName } from '@/lib/course-display';
import type { Course } from '@/lib/courses';
import type { CourseGroup } from '@/lib/course-groups';
import { bodyFont, displayFont } from '@/lib/fonts';

/**
 * Shared grouped card list — used both for club-grouped browsing (ported
 * from web's CourseBrowser.tsx: mode="browse"/"log", rowLabel="course") and
 * for the country-grouped Played list (ported from
 * apps/web/src/components/ProfileAccordions.tsx's CoursesByCountry,
 * rowLabel="club").
 *
 * The two need different per-row content: club-grouped rows already carry
 * the club name in the group header, so the row shows the course name (or
 * a generic-name fallback) plus a holes pill. Country-grouped rows have no
 * club-level header, so the row must lead with the club name instead —
 * ProfileAccordions.tsx uses `clubName ?? courseName` as the primary label,
 * with courseName as a secondary line only when it's distinct and not a
 * generic placeholder ("18", "Main course", etc).
 */
type Props = {
  groups: CourseGroup[];
  displayLimit: number;
  pageSize: number;
  onLoadMore: () => void;
  mode: 'browse' | 'log';
  rowLabel?: 'course' | 'club';
  showPlayedStamp?: boolean;
  playedIds?: Set<string>;
  onSelectCourse?: (course: Course) => void;
  /** mode="browse" only — tapping a row navigates to the course detail
   * screen instead of picking it for the Log flow. */
  onPressCourse?: (course: Course) => void;
};

export default function CourseGroupList({
  groups,
  displayLimit,
  pageSize,
  onLoadMore,
  mode,
  rowLabel = 'course',
  showPlayedStamp = true,
  playedIds,
  onSelectCourse,
  onPressCourse,
}: Props) {
  const visible = groups.slice(0, displayLimit);
  // Country-grouped Played list (rowLabel="club") is a collapsible
  // accordion, matching ProfileAccordions.tsx's CoursesByCountry (default
  // collapsed, tap a country to reveal its courses). Club-grouped browsing
  // (rowLabel="course") stays always-expanded, matching CourseBrowser.tsx.
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  return (
    <>
      {visible.map((group) => {
        const collapsible = rowLabel === 'club';
        const isExpanded = !collapsible || expandedKey === group.key;
        const header = (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: colors.paper.creamWarm,
              borderBottomWidth: isExpanded ? 1 : 0,
              borderBottomColor: colors.border.paperFaint,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ flex: 1, color: colors.ink.primary, fontFamily: displayFont.medium, fontSize: 16 }}
            >
              {group.label}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              {group.flag && <Text style={{ fontSize: 14 }}>{group.flag}</Text>}
              {collapsible ? (
                <Text style={{ fontSize: 15, fontWeight: '700', color: colors.accent.goldDark }}>
                  {isExpanded ? '▾' : '▸'}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, color: colors.ink.tertiary }}>›</Text>
              )}
            </View>
          </View>
        );
        return (
        <View
          key={group.key}
          style={{
            backgroundColor: colors.paper.white,
            borderWidth: 1,
            borderColor: colors.border.paper,
            borderRadius: 8,
            overflow: 'hidden',
            marginBottom: 8,
          }}
        >
          {collapsible ? (
            <Pressable onPress={() => setExpandedKey(isExpanded ? null : group.key)}>{header}</Pressable>
          ) : (
            header
          )}

          {isExpanded && group.courses.map((course, i) => {
            const courseLabel = isGenericCourseName(course.name) ? null : course.name;
            const played = showPlayedStamp && mode === 'browse' && (playedIds?.has(course.id) ?? false);
            // rowLabel="club" (country-grouped Played list, per
            // ProfileAccordions.tsx's CoursesByCountry): primary label is
            // the club name, falling back to the course name only when
            // there's no club. Course name renders as a secondary line
            // only when it's distinct from the club and not a generic
            // placeholder — otherwise it adds no information.
            const primaryLabel = rowLabel === 'club' ? (course.club ?? course.name) : null;
            const secondaryLabel =
              rowLabel === 'club' && course.club && course.name !== course.club && !isGenericCourseName(course.name)
                ? course.name
                : null;
            const rowStyle = {
              flexDirection: 'row' as const,
              alignItems: 'center' as const,
              justifyContent: 'space-between' as const,
              gap: 10,
              paddingVertical: 10,
              paddingRight: 16,
              paddingLeft: 28,
              borderBottomWidth: i < group.courses.length - 1 ? 1 : 0,
              borderBottomColor: colors.border.paperFaint,
            };

            const inner = (
              <>
                {rowLabel === 'club' ? (
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text numberOfLines={1} style={{ fontSize: 15, fontFamily: displayFont.medium, color: colors.ink.primary }}>
                      {primaryLabel}
                    </Text>
                    {secondaryLabel && (
                      <Text
                        className="uppercase"
                        numberOfLines={1}
                        style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.2, color: colors.ink.tertiary, marginTop: 2 }}
                      >
                        {secondaryLabel}
                      </Text>
                    )}
                  </View>
                ) : (
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6, minWidth: 0 }}>
                    {courseLabel ? (
                      <Text numberOfLines={1} style={{ fontSize: 14, color: colors.ink.primary, flexShrink: 1 }}>
                        {courseLabel}
                      </Text>
                    ) : (
                      <Text
                        className="uppercase"
                        style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.tertiary }}
                      >
                        Main course
                      </Text>
                    )}
                    {course.holes && (
                      <Text
                        style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1, color: colors.ink.tertiary, flexShrink: 0 }}
                      >
                        {course.holes}H
                      </Text>
                    )}
                  </View>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  {played && (
                    <View
                      style={{
                        borderWidth: 1,
                        borderStyle: 'dashed',
                        borderColor: colors.stamp.red,
                        borderRadius: 4,
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                      }}
                    >
                      <Text
                        className="uppercase"
                        style={{ color: colors.stamp.red, fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5 }}
                      >
                        ✓ Played
                      </Text>
                    </View>
                  )}
                  {mode === 'log' ? (
                    <View
                      style={{
                        backgroundColor: colors.passport.cover,
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                      }}
                    >
                      <Text
                        className="uppercase"
                        style={{ color: colors.ink.inverse, fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5 }}
                      >
                        Log
                      </Text>
                    </View>
                  ) : (
                    <Text style={{ fontSize: 13, color: colors.ink.tertiary }}>›</Text>
                  )}
                </View>
              </>
            );

            return (
              <Pressable
                key={course.id}
                onPress={() => (mode === 'log' ? onSelectCourse?.(course) : onPressCourse?.(course))}
                style={rowStyle}
              >
                {inner}
              </Pressable>
            );
          })}
        </View>
        );
      })}

      {groups.length > displayLimit && (
        <Pressable
          onPress={onLoadMore}
          style={{
            backgroundColor: colors.paper.white,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.border.paper,
            borderRadius: 8,
            paddingVertical: 12,
            alignItems: 'center',
            marginTop: 4,
          }}
        >
          <Text className="uppercase" style={{ color: colors.passport.cover, fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5 }}>
            Load more{' '}
            <Text style={{ color: colors.ink.tertiary, fontFamily: bodyFont.semibold, letterSpacing: 0 }}>
              +{Math.min(pageSize, groups.length - displayLimit)}
            </Text>
          </Text>
        </Pressable>
      )}
    </>
  );
}
