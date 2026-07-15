import { useEffect, useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

// Same palette as apps/web/src/components/LogForm.tsx's CONFETTI_COLORS —
// passport greens + gold accents, not a generic confetti-library rainbow.
const CONFETTI_COLORS = [
  '#1f3a2e',
  '#c9a84c',
  '#2d4d40',
  '#dfc274',
  '#5a7a4a',
  '#efe2b5',
  '#a84a2c',
  '#0f2519',
];

type Shape = 'circle' | 'square' | 'ribbon';

type Piece = {
  id: number;
  xPercent: number;
  color: string;
  delayMs: number;
  durationMs: number;
  size: number;
  shape: Shape;
  swayAmplitude: number;
  swayCycles: number;
  swayPhase: number;
};

function randomShape(): Shape {
  const r = Math.random();
  if (r < 0.4) return 'circle';
  if (r < 0.75) return 'square';
  return 'ribbon';
}

function generatePieces(count = 70): Piece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    xPercent: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delayMs: Math.random() * 2500,
    durationMs: 2500 + Math.random() * 2000,
    size: 6 + Math.random() * 8,
    shape: randomShape(),
    // Gentle side-to-side drift as each piece falls, like real confetti
    // catching air — a straight-line rain of dots is what reads as generic.
    swayAmplitude: 10 + Math.random() * 20,
    swayCycles: 1.5 + Math.random() * 2,
    swayPhase: Math.random() * Math.PI * 2,
  }));
}

function ConfettiPiece({ piece, fallDistance }: { piece: Piece; fallDistance: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      piece.delayMs,
      withTiming(1, { duration: piece.durationMs, easing: Easing.in(Easing.quad) })
    );
    // Only run once per mount — this component is remounted fresh each time
    // the success screen appears, matching web's one-shot burst.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style = useAnimatedStyle(() => {
    const sway =
      Math.sin(progress.value * piece.swayCycles * Math.PI * 2 + piece.swayPhase) * piece.swayAmplitude;
    return {
      opacity: progress.value < 0.8 ? 1 : Math.max(0, 1 - (progress.value - 0.8) / 0.2),
      transform: [
        { translateY: -20 + progress.value * fallDistance },
        { translateX: sway },
        { rotate: `${interpolate(progress.value, [0, 1], [0, 540 * (piece.swayPhase > Math.PI ? 1 : -1)])}deg` },
      ],
    };
  });

  const isRibbon = piece.shape === 'ribbon';

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: `${piece.xPercent}%`,
          top: 0,
          width: isRibbon ? piece.size * 2.4 : piece.size,
          height: isRibbon ? piece.size * 0.55 : piece.size,
          borderRadius: piece.shape === 'circle' ? piece.size / 2 : 2,
          backgroundColor: piece.color,
        },
        style,
      ]}
    />
  );
}

/** One-shot falling confetti burst — mount to play, unmount to stop. */
export default function Confetti() {
  const { height } = useWindowDimensions();
  const pieces = useMemo(() => generatePieces(), []);
  const fallDistance = height * 1.1 + 20;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
      {pieces.map((p) => (
        <ConfettiPiece key={p.id} piece={p} fallDistance={fallDistance} />
      ))}
    </View>
  );
}
