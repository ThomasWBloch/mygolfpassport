import Svg, { Circle, Path } from 'react-native-svg';

// Ported 1:1 from apps/web/src/components/BottomNav.tsx's SocialIcon.
export default function SocialIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="8" cy="7" r="3.5" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="16" cy="7" r="3.5" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M 2 18 C 2 13 5 11 8 11 C 11 11 14 13 14 18"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M 10 18 C 10 13 13 11 16 11 C 19 11 22 13 22 18"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
