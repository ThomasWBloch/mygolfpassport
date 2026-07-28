import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { colors } from '@mygolfpassport/shared';

import WaxSealBadge from '@/components/WaxSealBadge';
import { bodyFont, displayFont } from '@/lib/fonts';
import { fetchAllBadgesWithEarned, type BadgeTierGroup } from '@/lib/you';

/**
 * Ported from apps/web/src/app/you/YouBadgesView.tsx — the trophy room:
 * every badge in the catalog, grouped by tier, dimmed + "Locked" when
 * unearned.
 */
const TIER_LABELS: Record<string, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  legendary: 'Legendary',
};

export default function YouBadgesView({ userId }: { userId: string }) {
  const [groups, setGroups] = useState<BadgeTierGroup[] | null>(null);
  const [counts, setCounts] = useState<{ earned: number; total: number } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetchAllBadgesWithEarned(userId)
      .then((res) => {
        if (cancelled) return;
        setGroups(res.groups);
        setCounts({ earned: res.earnedCount, total: res.totalCount });
      })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load badges.'); });
    return () => { cancelled = true; };
  }, [userId]);

  if (error.length > 0) {
    return <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, padding: 20 }}>{error}</Text>;
  }

  if (!groups || !counts) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 }}>
        <ActivityIndicator color={colors.accent.gold} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <View style={{ alignItems: 'flex-end', marginBottom: 18 }}>
        <View
          style={{
            backgroundColor: colors.accent.goldFaint,
            borderWidth: 1,
            borderColor: colors.accent.gold,
            borderRadius: 6,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, color: colors.accent.goldDark }}>
            {counts.earned} / {counts.total} earned
          </Text>
        </View>
      </View>

      {groups.map((g) => {
        const tierEarned = g.badges.filter((b) => b.earned).length;
        return (
          <View key={g.tier} style={{ marginBottom: 28 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 12,
                marginBottom: 14,
                paddingBottom: 6,
                borderBottomWidth: 1,
                borderBottomColor: colors.border.paper,
              }}
            >
              <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 2, color: colors.ink.tertiary }}>
                {TIER_LABELS[g.tier] ?? g.tier}
              </Text>
              <Text style={{ fontFamily: bodyFont.semibold, fontSize: 11, color: colors.ink.tertiary }}>
                {tierEarned} / {g.badges.length}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
              {g.badges.map((b) => (
                <View
                  key={b.id}
                  style={{
                    width: '47%',
                    backgroundColor: colors.paper.white,
                    borderWidth: 1,
                    borderColor: colors.border.paper,
                    borderRadius: 14,
                    paddingTop: 20,
                    paddingBottom: 16,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    gap: 6,
                    opacity: b.earned ? 1 : 0.45,
                    position: 'relative',
                  }}
                >
                  <WaxSealBadge name={b.name} tier={g.tier} emoji={b.emoji} size={72} rotation={(b.name.charCodeAt(0) % 7) - 3} />

                  {!b.earned && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: colors.paper.creamWarm,
                        borderWidth: 1,
                        borderColor: colors.border.paper,
                        borderRadius: 4,
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                      }}
                    >
                      <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 9, letterSpacing: 1, color: colors.ink.tertiary }}>
                        Locked
                      </Text>
                    </View>
                  )}

                  <Text style={{ fontFamily: displayFont.medium, fontSize: 15, color: colors.ink.primary, textAlign: 'center', marginTop: 2 }}>
                    {b.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.ink.tertiary, textAlign: 'center', lineHeight: 16 }}>
                    {b.description}
                  </Text>
                  <Text
                    className="uppercase"
                    style={{ fontFamily: bodyFont.semibold, fontSize: 10, letterSpacing: 1, color: b.earned ? colors.state.success : 'transparent', marginTop: 2 }}
                  >
                    {b.earned && b.earnedAt
                      ? `Earned ${new Date(b.earnedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}`
                      : '—'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
