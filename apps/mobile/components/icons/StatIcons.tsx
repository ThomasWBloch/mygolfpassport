import Svg, { Circle, Ellipse, Line, Path } from 'react-native-svg';

// Ported 1:1 from apps/web/src/components/PassportCard.tsx's inline
// 14x14 stat-box icons.

export function CoursesStatIcon({ color }: { color: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <Line x1="3" y1="1" x2="3" y2="13" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Path d="M3 2 L11 4 L3 6" stroke={color} strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round" />
    </Svg>
  );
}

export function CountriesStatIcon({ color }: { color: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <Circle cx="7" cy="7" r="5.5" stroke={color} strokeWidth={1.2} />
      <Ellipse cx="7" cy="7" rx="2.5" ry="5.5" stroke={color} strokeWidth={1.2} />
      <Line x1="1.5" y1="7" x2="12.5" y2="7" stroke={color} strokeWidth={1.2} />
    </Svg>
  );
}

export function BadgesStatIcon({ color }: { color: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <Circle cx="7" cy="7" r="5.5" stroke={color} strokeWidth={1.2} />
      <Path
        d="M7 3.8 L7.85 5.95 L10.2 6.05 L8.35 7.5 L9.05 9.75 L7 8.45 L4.95 9.75 L5.65 7.5 L3.8 6.05 L6.15 5.95 Z"
        stroke={color}
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
