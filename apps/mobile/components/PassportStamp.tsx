import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors } from '@mygolfpassport/shared';

import { bodyFont } from '@/lib/fonts';

/**
 * Ported from apps/web/src/components/PassportStamp.tsx — the canonical
 * "VISITED [year]" dashed-circle stamp. Web plays a multi-keyframe
 * slam-in (rotate/scale overshoot in 3 steps); here a single
 * back-out bezier easing on one shared value gives the same
 * overshoot-then-settle feel without hand-porting each keyframe.
 */
type Props = {
  year: number;
  size?: number;
  rotate?: number;
  animate?: boolean;
};

export default function PassportStamp({ year, size = 86, rotate = -8, animate = false }: Props) {
  const labelFontSize = Math.max(9, Math.round(size * 0.105));
  const yearFontSize = Math.max(20, Math.round(size * 0.26));
  const underlineWidth = Math.round(size * 0.55);
  const borderWidth = size >= 140 ? 4 : 2;

  const progress = useSharedValue(animate ? 0 : 1);

  useEffect(() => {
    if (animate) {
      progress.value = withTiming(1, { duration: 600, easing: Easing.bezier(0.34, 1.56, 0.64, 1) });
    }
  }, [animate, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = 2.4 - progress.value * 1.4;
    const currentRotate = rotate - 18 + progress.value * 18;
    return {
      opacity: Math.min(progress.value * 3, 1),
      transform: [{ rotate: `${currentRotate}deg` }, { scale }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth,
          borderStyle: 'dashed',
          borderColor: colors.stamp.red,
          backgroundColor: 'rgba(168, 74, 44, 0.04)',
          alignItems: 'center',
          justifyContent: 'center',
        },
        animatedStyle,
      ]}
    >
      <Text
        className="uppercase"
        style={{ fontFamily: bodyFont.semibold, fontSize: labelFontSize, letterSpacing: 2, color: colors.stamp.red }}
      >
        Visited
      </Text>
      <Text
        style={{
          fontFamily: bodyFont.regular,
          fontSize: yearFontSize,
          lineHeight: yearFontSize,
          letterSpacing: 1,
          color: colors.stamp.red,
          marginTop: 2,
        }}
      >
        {year}
      </Text>
      <View
        style={{
          width: underlineWidth,
          borderTopWidth: 0.5,
          borderTopColor: colors.stamp.red,
          opacity: 0.5,
          marginTop: 4,
        }}
      />
      {size >= 140 && (
        <Text
          className="uppercase"
          numberOfLines={1}
          style={{
            fontFamily: bodyFont.semibold,
            fontSize: Math.round(size * 0.06),
            letterSpacing: 2,
            opacity: 0.6,
            marginTop: 2,
            color: colors.stamp.red,
            textAlign: 'center',
          }}
        >
          Passport
        </Text>
      )}
    </Animated.View>
  );
}
