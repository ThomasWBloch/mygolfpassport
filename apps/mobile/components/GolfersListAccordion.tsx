import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import { bodyFont, displayFont } from '@/lib/fonts';
import type { GolferEntry } from '@/lib/courses';

/**
 * Ported from apps/web/src/components/GolfersListAccordion.tsx — a
 * collapsible list of golfers (club members / friends who've played /
 * others who've played), each row linking to the golfer's public profile.
 * `pageSize` caps the initial render with a "See all N entries" footer.
 */
type Props = {
  title: string;
  golfers: GolferEntry[];
  accentColor?: string;
  accentText?: string;
  pageSize?: number;
  /** Entry-point context for the profile screen's back label (see
   *  lib/back-labels.ts) — e.g. 'course' or 'club'. */
  linkFrom?: string;
};

export default function GolfersListAccordion({
  title,
  golfers,
  accentColor = colors.passport.cover,
  accentText = colors.ink.inverse,
  pageSize,
  linkFrom,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  if (golfers.length === 0) return null;

  const visible = !pageSize || showAll ? golfers : golfers.slice(0, pageSize);
  const showSeeAll = !!pageSize && !showAll && golfers.length > pageSize;

  return (
    <View style={{ backgroundColor: colors.paper.white, borderWidth: 1, borderColor: colors.border.paper, borderRadius: 8, overflow: 'hidden' }}>
      <Pressable
        accessibilityRole="button"
        onPress={() => setOpen((o) => !o)}
        style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, padding: 14 }}
      >
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
          <Text style={{ flexShrink: 1, fontFamily: displayFont.medium, fontSize: 16, color: colors.ink.primary }}>{title}</Text>
          <View style={{ backgroundColor: accentColor, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 }}>
            <Text style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1, color: accentText }}>{golfers.length}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 13, color: colors.ink.tertiary, flexShrink: 0 }}>{open ? '▲' : '▼'}</Text>
      </Pressable>

      {open && (
        <View style={{ borderTopWidth: 1, borderTopColor: colors.border.paperFaint }}>
          {visible.map((g, i) => {
            const isLast = i === visible.length - 1;
            const statsLine = [`${g.courseCount} courses`, `${g.countryCount} countries`, `${g.badgeCount} badges`].join(' · ');
            return (
              <Pressable
                key={g.userId}
                onPress={() => router.push(`/profile/${g.userId}${linkFrom ? `?from=${linkFrom}` : ''}`)}
                style={{
                  paddingVertical: 14,
                  paddingHorizontal: 16,
                  gap: 4,
                  borderBottomWidth: !isLast || showSeeAll ? 1 : 0,
                  borderBottomColor: colors.border.paperFaint,
                }}
              >
                <Text style={{ fontSize: 16, fontFamily: displayFont.medium, color: colors.ink.primary }}>
                  {g.fullName}
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
                  <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1, color: colors.ink.tertiary }}>
                    {statsLine}
                  </Text>
                  {g.handicap != null && (
                    <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, color: colors.accent.goldDark }}>
                      HCP {g.handicap}
                    </Text>
                  )}
                </View>
              </Pressable>
            );
          })}

          {showSeeAll && (
            <Pressable
              accessibilityRole="button"
              onPress={() => setShowAll(true)}
              style={{ borderTopWidth: 1, borderTopColor: colors.border.paperFaint, paddingVertical: 12, alignItems: 'center' }}
            >
              <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, color: colors.passport.cover }}>
                See all {golfers.length} entries
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}
