import { Pressable, Text } from 'react-native';
import { colors } from '@mygolfpassport/shared';

import { bodyFont } from '@/lib/fonts';

/**
 * Shared pill button used for the mode/subtab rows on Courses (All/Played/
 * My Map), Social (Feed/Friends/Leaderboard/Messages), and You (Profile/
 * Courses/Badges) — one size across all three instead of each screen
 * tuning its own, since Social's 4-pill row is the tightest fit and used
 * to define the size for everyone else.
 */
export default function Pill({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        flexShrink: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: active ? colors.accent.gold : colors.paper.white,
        borderWidth: 1,
        borderColor: active ? colors.accent.gold : colors.border.paper,
      }}
    >
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{
          color: active ? colors.passport.coverInk : colors.ink.secondary,
          fontFamily: bodyFont.semibold,
          fontSize: 12.5,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
