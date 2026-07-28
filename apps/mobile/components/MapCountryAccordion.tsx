import { Pressable, Text, View } from 'react-native';
import { colors } from '@mygolfpassport/shared';

import { bodyFont, displayFont } from '@/lib/fonts';
import type { CountryGroup } from '@/lib/map';

/**
 * Ported from apps/web/src/components/CountryAccordion.tsx — the country
 * list below the world map, sorted by course count DESC. `expandedCountry`
 * is controlled by the parent screen so tapping "See all" inside a map
 * popup can expand + scroll to the matching row here.
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
      }}
    >
      <Text style={{ fontFamily: displayFont.medium, fontSize: 12, color: colors.accent.goldDark }}>{value.toFixed(1)}/10</Text>
    </View>
  );
}

type Props = {
  countries: CountryGroup[];
  expandedCountry: string | null;
  onToggle: (country: string) => void;
  onPressCourse: (courseId: string) => void;
  onLayoutCountry?: (country: string, y: number) => void;
};

export default function MapCountryAccordion({ countries, expandedCountry, onToggle, onPressCourse, onLayoutCountry }: Props) {
  const sorted = [...countries].sort((a, b) => b.count - a.count);

  return (
    <View style={{ gap: 8 }}>
      {sorted.map((c) => {
        const isOpen = expandedCountry === c.country;
        return (
          <View
            key={c.country}
            onLayout={(e) => onLayoutCountry?.(c.country, e.nativeEvent.layout.y)}
            style={{ backgroundColor: colors.paper.white, borderWidth: 1, borderColor: colors.border.paperFaint, borderRadius: 8, overflow: 'hidden' }}
          >
            <Pressable
              accessibilityRole="button"
              onPress={() => onToggle(c.country)}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14 }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Text style={{ fontSize: 22 }}>{c.flag}</Text>
                <Text style={{ fontFamily: displayFont.medium, fontSize: 17, color: colors.ink.primary }}>{c.country}</Text>
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
                  <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.secondary }}>
                    {c.count} {c.count === 1 ? 'course' : 'courses'}
                  </Text>
                </View>
                <Text style={{ fontSize: 13, color: colors.ink.tertiary }}>{isOpen ? '▴' : '▾'}</Text>
              </View>
            </Pressable>

            {isOpen && (
              <View style={{ backgroundColor: colors.paper.creamWarm, borderTopWidth: 1, borderTopColor: colors.border.paperFaint, paddingHorizontal: 16, paddingVertical: 10 }}>
                {c.courses.map((course, i) => {
                  const showSub = !!course.club && course.club !== course.name;
                  return (
                    <Pressable
                      key={course.id}
                      onPress={() => onPressCourse(course.id)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 10,
                        paddingVertical: 8,
                        borderBottomWidth: i < c.courses.length - 1 ? 1 : 0,
                        borderBottomColor: colors.border.paperFaint,
                      }}
                    >
                      <View style={{ flex: 1, minWidth: 0 }}>
                        <Text numberOfLines={1} style={{ fontFamily: displayFont.medium, fontSize: 15, color: colors.ink.primary }}>
                          {course.club ?? course.name}
                        </Text>
                        {showSub && (
                          <Text
                            className="uppercase"
                            numberOfLines={1}
                            style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.2, color: colors.ink.tertiary, marginTop: 2 }}
                          >
                            {course.name}
                          </Text>
                        )}
                      </View>
                      {course.rating != null && <RatingBadge value={course.rating} />}
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
