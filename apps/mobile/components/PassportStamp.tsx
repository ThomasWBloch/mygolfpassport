import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '@mygolfpassport/shared';

import { bodyFont } from '@/lib/fonts';

/**
 * Ported from apps/web/src/components/PassportStamp.tsx — the dashed-circle
 * passport stamp. Web labels it "VISITED"; mobile uses "PLAYED" for
 * consistency with the "Played" wording used everywhere else in the app.
 * Web plays a multi-keyframe slam-in (rotate/scale overshoot in 3 steps);
 * here a single back-out bezier easing on one shared value gives the same
 * overshoot-then-settle feel without hand-porting each keyframe, plus two
 * extras on top for more of a physical "thud" (Thomas's ask, 2026-08-02):
 * a brief post-landing rotation wobble, and an expanding/fading "impact
 * ring" timed to when the stamp actually lands (~70% into the slam).
 */
type Props = {
  year: number;
  size?: number;
  rotate?: number;
  animate?: boolean;
};

const SLAM_DURATION = 600;
const IMPACT_AT = SLAM_DURATION * 0.7;

export default function PassportStamp({ year, size = 86, rotate = -8, animate = false }: Props) {
  const labelFontSize = Math.max(9, Math.round(size * 0.105));
  const yearFontSize = Math.max(20, Math.round(size * 0.26));
  const underlineWidth = Math.round(size * 0.55);
  const borderWidth = size >= 140 ? 4 : 2;

  const progress = useSharedValue(animate ? 0 : 1);
  const wobble = useSharedValue(0);
  const ring = useSharedValue(animate ? 0 : 1);

  useEffect(() => {
    if (animate) {
      progress.value = withTiming(1, { duration: SLAM_DURATION, easing: Easing.bezier(0.34, 1.56, 0.64, 1) });
      wobble.value = withDelay(
        IMPACT_AT,
        withSequence(
          withTiming(1, { duration: 90, easing: Easing.out(Easing.quad) }),
          withTiming(-0.6, { duration: 110, easing: Easing.inOut(Easing.quad) }),
          withTiming(0, { duration: 120, easing: Easing.out(Easing.quad) })
        )
      );
      ring.value = withDelay(IMPACT_AT, withTiming(1, { duration: 380, easing: Easing.out(Easing.quad) }));
    }
  }, [animate, progress, wobble, ring]);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = 2.4 - progress.value * 1.4;
    const currentRotate = rotate - 18 + progress.value * 18 + wobble.value * 4;
    return {
      opacity: Math.min(progress.value * 3, 1),
      transform: [{ rotate: `${currentRotate}deg` }, { scale }],
    };
  });

  const ringStyle = useAnimatedStyle(() => ({
    opacity: (1 - ring.value) * 0.5,
    transform: [{ scale: 1 + ring.value * 0.35 }],
  }));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {animate && (
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth,
              borderStyle: 'dashed',
              borderColor: colors.stamp.red,
            },
            ringStyle,
          ]}
        />
      )}
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
        Played
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
    </View>
  );
}
