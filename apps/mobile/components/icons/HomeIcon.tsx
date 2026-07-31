import Svg, { Path } from 'react-native-svg';

// Ported 1:1 from apps/web/src/app/courses/page.tsx's home-icon link path
// (also used in social/page.tsx and you/page.tsx) — a simple roof+door
// outline, used as the tappable "back to home" glyph replacing this
// screen's title text.
export default function HomeIcon({ color, size = 26 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M3 10 L11 3 L19 10 L19 18 L13.5 18 L13.5 12.5 L8.5 12.5 L8.5 18 L3 18 Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}
