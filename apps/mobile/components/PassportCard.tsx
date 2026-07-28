import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@mygolfpassport/shared';

import { BadgesStatIcon, CountriesStatIcon, CoursesStatIcon } from '@/components/icons/StatIcons';
import WaxSealBadge from '@/components/WaxSealBadge';
import { bodyFont, displayFont } from '@/lib/fonts';
import { COUNTRY_FLAGS } from '@/lib/countries';

/**
 * Ported from apps/web/src/components/PassportCard.tsx — the passport
 * ID-page hero: cream card, perforated tear-edges, gold initials disc,
 * Cormorant name, stamp-style country/HCP meta line, 3-up stats grid, and
 * (when badgeEmojis is passed) a mini wax-seal badge strip footer.
 */
type Props = {
  fullName: string;
  initials: string;
  homeClub: string | null;
  homeCountry: string | null;
  handicap: number | null;
  courseCount: number;
  countryCount: number;
  badgeCount: number;
  onPressCourses?: () => void;
  onPressBadges?: () => void;
  badgeEmojis?: { emoji: string; name: string; tier: string }[];
  totalBadges?: number;
};

export default function PassportCard({
  fullName,
  initials,
  homeClub,
  homeCountry,
  handicap,
  courseCount,
  countryCount,
  badgeCount,
  onPressCourses,
  onPressBadges,
  badgeEmojis,
  totalBadges,
}: Props) {
  const countryFlag = homeCountry ? (COUNTRY_FLAGS[homeCountry] ?? '') : '';

  const metaParts: string[] = [];
  if (homeCountry) metaParts.push(`${countryFlag ? `${countryFlag} ` : ''}${homeCountry}`.toUpperCase());
  if (handicap != null) metaParts.push(`HCP ${handicap}`);

  return (
    <View
      style={{
        backgroundColor: colors.paper.creamWarm,
        borderWidth: 1.5,
        borderColor: colors.border.paperStrong,
        borderRadius: 14,
        overflow: 'hidden',
      }}
    >
      <PerforatedEdge />

      <View style={{ padding: 18, paddingTop: 22, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
          <LinearGradient
            colors={[colors.accent.goldLight, colors.accent.gold, colors.accent.goldDark]}
            start={{ x: 0.35, y: 0.3 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              borderWidth: 2,
              borderColor: colors.accent.goldDark,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontFamily: displayFont.medium, fontSize: 22, color: colors.passport.coverInk }}>
              {initials}
            </Text>
          </LinearGradient>

          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={{ fontFamily: displayFont.medium, fontSize: 26, color: colors.ink.primary, lineHeight: 30 }}>
              {fullName}
            </Text>

            {homeClub && (
              <Text style={{ fontFamily: bodyFont.medium, fontSize: 15, color: colors.ink.secondary, marginTop: 6 }}>
                {homeClub}
              </Text>
            )}

            {metaParts.length > 0 && (
              <Text
                className="uppercase"
                style={{
                  fontFamily: bodyFont.semibold,
                  fontSize: 11,
                  letterSpacing: 1.8,
                  color: colors.ink.tertiary,
                  marginTop: 8,
                }}
              >
                {metaParts.join('  ·  ')}
              </Text>
            )}
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <StatBox value={courseCount} label="Courses" icon={<CoursesStatIcon color={colors.ink.tertiary} />} onPress={onPressCourses} />
          <StatBox value={countryCount} label="Countries" icon={<CountriesStatIcon color={colors.ink.tertiary} />} onPress={onPressCourses} />
          <StatBox value={badgeCount} label="Badges" icon={<BadgesStatIcon color={colors.ink.tertiary} />} onPress={onPressBadges} />
        </View>

        {badgeEmojis && badgeEmojis.length > 0 && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 14 }}>
            {badgeEmojis.map((b, i) => (
              <WaxSealBadge key={i} name={b.name} tier={b.tier} emoji={b.emoji} size={28} />
            ))}
            {(totalBadges ?? 0) > badgeEmojis.length && (
              <Text
                className="uppercase"
                style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1, color: colors.ink.tertiary, marginLeft: 2 }}
              >
                +{(totalBadges ?? 0) - badgeEmojis.length}
              </Text>
            )}
          </View>
        )}
      </View>

      <PerforatedEdge />
    </View>
  );
}

function StatBox({
  value,
  label,
  icon,
  onPress,
}: {
  value: number;
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
}) {
  const content = (
    <>
      <View style={{ position: 'absolute', top: 8, left: 10 }}>{icon}</View>
      <Text style={{ fontFamily: displayFont.medium, fontSize: 26, color: colors.ink.primary, lineHeight: 28 }}>
        {value}
      </Text>
      <Text
        className="uppercase"
        style={{
          fontFamily: bodyFont.semibold,
          fontSize: 11,
          letterSpacing: 1.5,
          color: colors.ink.tertiary,
          marginTop: 6,
        }}
      >
        {label}
      </Text>
    </>
  );

  const boxStyle = {
    flex: 1,
    backgroundColor: colors.paper.white,
    borderWidth: 1,
    borderColor: colors.border.paperFaint,
    borderRadius: 6,
    paddingTop: 16,
    paddingBottom: 10,
    paddingHorizontal: 6,
    alignItems: 'center' as const,
    position: 'relative' as const,
  };

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" onPress={onPress} style={boxStyle}>
        {content}
      </Pressable>
    );
  }
  return <View style={boxStyle}>{content}</View>;
}

// Row of small punched-through dots evoking a passport/ticket tear-edge.
// CSS's repeating radial-gradient background has no RN equivalent, so this
// is a flex row of circles in the page's background color, letting
// flexbox distribute them evenly across whatever width the card ends up.
function PerforatedEdge() {
  const dots = Array.from({ length: 22 });
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
        height: 8,
        alignItems: 'center',
      }}
    >
      {dots.map((_, i) => (
        <View key={i} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.paper.cream }} />
      ))}
    </View>
  );
}
