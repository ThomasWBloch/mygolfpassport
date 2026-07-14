import { Text, View } from 'react-native';
import { colors, typography } from '@mygolfpassport/shared';

/** Centered "stamp"-style label — bold, uppercase, wide letter-spacing,
 * matching the treatment web uses for tab labels (--font-mgp-stamp). */
export default function ScreenPlaceholder({ label }: { label: string }) {
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.paper.cream }}
    >
      <Text
        className="uppercase"
        style={{
          color: colors.passport.cover,
          fontWeight: '700',
          fontSize: typography.size.h3,
          letterSpacing: typography.tracking.stamp,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
