import Svg, { Circle, Path } from 'react-native-svg';

// Ported 1:1 from apps/web/src/components/BottomNav.tsx's YouIcon.
export default function YouIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M 4 18 C 4 12 8 10 12 10 C 16 10 20 12 20 18"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
