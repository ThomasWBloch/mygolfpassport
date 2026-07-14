import Svg, { Path } from 'react-native-svg';

// Ported 1:1 from apps/web/src/components/BottomNav.tsx's FAB plus glyph.
export default function PlusIcon({ color, size = 20 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 4 V20 M4 12 H20" stroke={color} strokeWidth={4.5} strokeLinecap="round" />
    </Svg>
  );
}
