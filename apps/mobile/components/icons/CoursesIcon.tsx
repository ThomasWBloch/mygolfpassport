import Svg, { Circle, Ellipse, Line, Path } from 'react-native-svg';

// Ported 1:1 from apps/web/src/components/BottomNav.tsx's CoursesIcon.
export default function CoursesIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Ellipse
        cx="12"
        cy="16"
        rx="9"
        ry="2.5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line x1="14" y1="16" x2="14" y2="3" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M 14 3 L 22 6 L 14 9 Z"
        fill={color}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="8" cy="16" r="1.2" fill={color} />
    </Svg>
  );
}
