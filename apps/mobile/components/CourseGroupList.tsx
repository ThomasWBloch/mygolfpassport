import { Pressable, Text, View } from 'react-native';
import { colors } from '@mygolfpassport/shared';

import { isGenericCourseName } from '@/lib/course-display';
import type { Course } from '@/lib/courses';
import type { CourseGroup } from '@/lib/course-groups';
import { bodyFont, displayFont } from '@/lib/fonts';

/**
 * Shared club-grouped card list — ported from web's CourseBrowser.tsx, used
 * by both the Courses tab (mode="browse") and the Log flow's search step
 * (mode="log", where a course row is tappable and shows a gold "Log" pill
 * instead of a static chevron).
 */
type Props = {
  groups: CourseGroup[];
  displayLimit: number;
  pageSize: number;
  onLoadMore: () => void;
  mode: 'browse' | 'log';
  playedIds?: Set<string>;
  onSelectCourse?: (course: Course) => void;
};

export default function CourseGroupList({
  groups,
  displayLimit,
  pageSize,
  onLoadMore,
  mode,
  playedIds,
  onSelectCourse,
}: Props) {
  const visible = groups.slice(0, displayLimit);

  return (
    <>
      {visible.map((group) => (
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: colors.paper.creamWarm,
              borderBottomWidth: 1,
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
              <Text style={{ fontSize: 13, color: colors.ink.tertiary }}>›</Text>
            </View>
          </View>

          {group.courses.map((course, i) => {
            const courseLabel = isGenericCourseName(course.name) ? null : course.name;
            const played = mode === 'browse' && (playedIds?.has(course.id) ?? false);
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

            return mode === 'log' ? (
              <Pressable key={course.id} onPress={() => onSelectCourse?.(course)} style={rowStyle}>
                {inner}
              </Pressable>
            ) : (
              <View key={course.id} style={rowStyle}>
                {inner}
              </View>
            );
          })}
        </View>
      ))}

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
