import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  Line,
  Path,
  Polygon,
  RadialGradient,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

import { displayFont } from '@/lib/fonts';

/**
 * Ported from apps/web/src/components/WaxSealBadge.tsx — circular wax-seal
 * style badge with tier progression (matte black -> midnight blue -> crimson
 * -> gold) and a per-badge center symbol dispatched from the badge name.
 */
type Props = {
  name: string;
  tier: 'common' | 'uncommon' | 'rare' | 'legendary' | string;
  emoji?: string;
  size?: number;
  rotation?: number;
};

const TIER_PALETTE = {
  common: { light: '#5a564b', dark: '#2c2920', rim: '#1f1a14', accent: '#1f1a14', symbol: '#f4ecd8' },
  uncommon: { light: '#5a7290', dark: '#2a3e54', rim: '#0a1c2e', accent: '#0a1c2e', symbol: '#f4ecd8' },
  rare: { light: '#c46748', dark: '#7a2e15', rim: '#5a2a18', accent: '#5a2a18', symbol: '#f9efd5' },
  legendary: { light: '#e6c668', dark: '#8a6d24', rim: '#5a4218', accent: '#5a4218', symbol: '#3a2a08' },
} as const;

function renderCountryFlag(code: string, borderColor: string, sw: number) {
  const w = 26;
  const h = 17;
  const x0 = -w / 2;
  const y0 = -h / 2;
  const cross = 3.5;
  const vBarX = -2;

  const border = <Rect x={x0} y={y0} width={w} height={h} fill="none" stroke={borderColor} strokeWidth={sw * 0.8} />;

  switch (code) {
    case 'DK':
      return (
        <G>
          <Rect x={x0} y={y0} width={w} height={h} fill="#c8102e" />
          <Rect x={x0} y={-cross / 2} width={w} height={cross} fill="#fff" />
          <Rect x={vBarX - cross / 2} y={y0} width={cross} height={h} fill="#fff" />
          {border}
        </G>
      );
    case 'NO':
      return (
        <G>
          <Rect x={x0} y={y0} width={w} height={h} fill="#ba0c2f" />
          <Rect x={x0} y={-cross / 2 - 0.6} width={w} height={cross + 1.2} fill="#fff" />
          <Rect x={vBarX - cross / 2 - 0.6} y={y0} width={cross + 1.2} height={h} fill="#fff" />
          <Rect x={x0} y={-cross / 2 + 0.4} width={w} height={cross - 0.8} fill="#003087" />
          <Rect x={vBarX - cross / 2 + 0.4} y={y0} width={cross - 0.8} height={h} fill="#003087" />
          {border}
        </G>
      );
    case 'SE':
      return (
        <G>
          <Rect x={x0} y={y0} width={w} height={h} fill="#006aa7" />
          <Rect x={x0} y={-cross / 2} width={w} height={cross} fill="#fecc00" />
          <Rect x={vBarX - cross / 2} y={y0} width={cross} height={h} fill="#fecc00" />
          {border}
        </G>
      );
    case 'FI':
      return (
        <G>
          <Rect x={x0} y={y0} width={w} height={h} fill="#ffffff" />
          <Rect x={x0} y={-cross / 2} width={w} height={cross} fill="#003580" />
          <Rect x={vBarX - cross / 2} y={y0} width={cross} height={h} fill="#003580" />
          {border}
        </G>
      );
    case 'EN':
      return (
        <G>
          <Rect x={x0} y={y0} width={w} height={h} fill="#ffffff" />
          <Rect x={x0} y={-cross / 2} width={w} height={cross} fill="#ce1124" />
          <Rect x={-cross / 2} y={y0} width={cross} height={h} fill="#ce1124" />
          {border}
        </G>
      );
    case 'SC':
      return (
        <G>
          <Rect x={x0} y={y0} width={w} height={h} fill="#005eb8" />
          <Line x1={x0} y1={y0} x2={x0 + w} y2={y0 + h} stroke="#fff" strokeWidth={cross} />
          <Line x1={x0 + w} y1={y0} x2={x0} y2={y0 + h} stroke="#fff" strokeWidth={cross} />
          {border}
        </G>
      );
    case 'WA':
      return (
        <G>
          <Rect x={x0} y={y0} width={w} height={h / 2} fill="#ffffff" />
          <Rect x={x0} y={0} width={w} height={h / 2} fill="#00b140" />
          <Path d="M-7 -2 Q-4 -5 0 -3 Q5 -1 7 -3 Q5 1 0 1 Q-3 2 -7 1 Z" fill="#d30731" />
          <Path d="M-5 1 L-3 4 L-1 1 Z" fill="#d30731" />
          {border}
        </G>
      );
    case 'IE':
      return (
        <G>
          <Rect x={x0} y={y0} width={w / 3} height={h} fill="#169b62" />
          <Rect x={x0 + w / 3} y={y0} width={w / 3} height={h} fill="#ffffff" />
          <Rect x={x0 + (2 * w) / 3} y={y0} width={w / 3} height={h} fill="#ff883e" />
          {border}
        </G>
      );
    case 'FR':
      return (
        <G>
          <Rect x={x0} y={y0} width={w / 3} height={h} fill="#002654" />
          <Rect x={x0 + w / 3} y={y0} width={w / 3} height={h} fill="#ffffff" />
          <Rect x={x0 + (2 * w) / 3} y={y0} width={w / 3} height={h} fill="#ce1126" />
          {border}
        </G>
      );
    case 'DE':
      return (
        <G>
          <Rect x={x0} y={y0} width={w} height={h / 3} fill="#000000" />
          <Rect x={x0} y={y0 + h / 3} width={w} height={h / 3} fill="#dd0000" />
          <Rect x={x0} y={y0 + (2 * h) / 3} width={w} height={h / 3} fill="#ffce00" />
          {border}
        </G>
      );
    case 'NL':
      return (
        <G>
          <Rect x={x0} y={y0} width={w} height={h / 3} fill="#ae1c28" />
          <Rect x={x0} y={y0 + h / 3} width={w} height={h / 3} fill="#ffffff" />
          <Rect x={x0} y={y0 + (2 * h) / 3} width={w} height={h / 3} fill="#21468b" />
          {border}
        </G>
      );
    default:
      return (
        <G>
          <Rect x={x0} y={y0} width={w} height={h} fill="#f4ecd8" stroke={borderColor} strokeWidth={sw * 0.8} />
          <SvgText x="0" y={3} textAnchor="middle" fontFamily={displayFont.semibold} fontSize="11" fill="#1f1a14">
            {code}
          </SvgText>
        </G>
      );
  }
}

function renderSymbol(symbolKey: string, modifier: string | null, fill: string, size: number) {
  const sw = Math.max(0.5, size / 60);

  switch (symbolKey) {
    case 'tee':
      return (
        <G fill={fill}>
          <Circle cx="0" cy="-12" r="8" />
          <Path d="M-8 -4 L-4 14 L4 14 L8 -4 Z" />
        </G>
      );

    case 'flag':
      return (
        <G>
          <G fill={fill} stroke={fill} strokeWidth={sw}>
            <Line x1="-9" y1="-18" x2="-9" y2="6" strokeLinecap="round" />
            <Path d="M-9 -18 L13 -12 L-9 -6 Z" />
          </G>
          {modifier && (
            <G>
              <Rect x={-12} y={9} width={24} height={14} rx={2} fill="#f4ecd8" stroke={fill} strokeWidth={sw * 0.8} />
              <SvgText
                x="0"
                y={20}
                textAnchor="middle"
                fontFamily={displayFont.semibold}
                fontSize={modifier.length > 2 ? 11 : 13}
                fill="#1f1a14"
              >
                {modifier}
              </SvgText>
            </G>
          )}
        </G>
      );

    case 'crown':
      return (
        <G fill={fill}>
          <Path d="M-16 4 L-16 -10 L-10 -3 L-4 -12 L0 -3 L4 -12 L10 -3 L16 -10 L16 4 Z" />
          <Rect x="-17" y="5" width="34" height="3" />
          <Circle cx="-10" cy="-5" r="1.5" />
          <Circle cx="0" cy="-7" r="1.5" />
          <Circle cx="10" cy="-5" r="1.5" />
        </G>
      );

    case 'trophy':
      return (
        <G>
          <Circle cx="0" cy="-20" r="0.9" fill={fill} />
          <Rect x="-0.35" y="-19.2" width="0.7" height="1.6" fill={fill} />
          <Path d="M -7 -17.5 Q -7.5 -16 -6.5 -15 Q -3 -14 0 -14 Q 3 -14 6.5 -15 Q 7.5 -16 7 -17.5 Q 0 -18.5 -7 -17.5 Z" fill={fill} />
          <Rect x="-8" y="-14.5" width="16" height="0.8" fill={fill} />
          <Rect x="-7.4" y="-13.7" width="14.8" height="0.4" fill={fill} />
          <Path d="M -7.6 -13 Q -9.5 -10 -9 -5 Q -8 -1 -5 1 Q -2 2 0 2 Q 2 2 5 1 Q 8 -1 9 -5 Q 9.5 -10 7.6 -13 Z" fill={fill} />
          <Path d="M -8.6 -7 Q 0 -6.2 8.6 -7" fill="none" stroke={fill} strokeWidth="0.4" opacity="0.55" />
          <Path
            d="M -7.8 -12 C -11.5 -12.5, -12.5 -10, -12.5 -7 C -12.5 -4, -11 -2, -8.6 -2"
            fill="none"
            stroke={fill}
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M 7.8 -12 C 11.5 -12.5, 12.5 -10, 12.5 -7 C 12.5 -4, 11 -2, 8.6 -2"
            fill="none"
            stroke={fill}
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path d="M -3 2 L -2.4 3.5 L 2.4 3.5 L 3 2 Z" fill={fill} />
          <Rect x="-1.4" y="3.5" width="2.8" height="3" fill={fill} />
          <Ellipse cx="0" cy="7" rx="2" ry="0.9" fill={fill} />
          <Rect x="-3.2" y="7.9" width="6.4" height="1.0" fill={fill} />
          <Rect x="-4.8" y="8.9" width="9.6" height="1.2" fill={fill} />
          <Rect x="-6.4" y="10.1" width="12.8" height="1.4" fill={fill} />
          {modifier && (
            <G>
              <Rect x={-12} y={14} width={24} height={14} rx={2} fill="#f4ecd8" stroke={fill} strokeWidth={sw * 0.8} />
              <SvgText
                x="0"
                y={25}
                textAnchor="middle"
                fontFamily={displayFont.semibold}
                fontSize={modifier.length > 1 ? 11 : 13}
                fill="#1f1a14"
              >
                {modifier}
              </SvgText>
            </G>
          )}
        </G>
      );

    case 'globe': {
      const cx = 0;
      const cy = 0;
      const r = 12;
      return (
        <G>
          <Circle cx={cx} cy={cy} r={r} fill="none" stroke={fill} strokeWidth={sw * 1.6} />
          <Line x1={-r} y1={cy} x2={r} y2={cy} stroke={fill} strokeWidth={sw * 0.8} opacity="0.55" />
          <Ellipse cx={cx} cy={cy} rx={r} ry={r * 0.45} fill="none" stroke={fill} strokeWidth={sw * 0.6} opacity="0.4" />
          <Circle cx={cx} cy={cy - r} r="1.4" fill={fill} />
          <Line x1={cx} y1={cy - r} x2={cx} y2={cy - r - 9} stroke={fill} strokeWidth={sw * 1.5} strokeLinecap="round" />
          <Path d={`M${cx} ${cy - r - 9} L ${cx + 6} ${cy - r - 6} L ${cx} ${cy - r - 3} Z`} fill={fill} />
          {modifier && (
            <G>
              <Rect x={-12} y={14} width={24} height={14} rx={2} fill="#f4ecd8" stroke={fill} strokeWidth={sw * 0.8} />
              <SvgText
                x="0"
                y={25}
                textAnchor="middle"
                fontFamily={displayFont.semibold}
                fontSize={modifier.length > 1 ? 11 : 13}
                fill="#1f1a14"
              >
                {modifier}
              </SvgText>
            </G>
          )}
        </G>
      );
    }

    case 'compass':
      return (
        <G fill={fill}>
          <Circle cx="0" cy="0" r="14" fill="none" stroke={fill} strokeWidth={sw * 1.4} />
          <Polygon points="0,-12 3,0 0,12 -3,0" />
          <Polygon points="-12,0 0,-3 12,0 0,3" opacity="0.6" />
        </G>
      );

    case 'coffee':
      return (
        <G fill={fill}>
          <Path d="M-9 -4 L-9 8 Q-9 12 -5 12 L5 12 Q9 12 9 8 L9 -4 Z" />
          <Path d="M9 0 Q14 0 14 4 Q14 8 9 8" fill="none" stroke={fill} strokeWidth={sw * 1.5} />
          <Path
            d="M-4 -10 Q-4 -14 -2 -14 M0 -10 Q0 -14 2 -14 M4 -10 Q4 -14 6 -14"
            fill="none"
            stroke={fill}
            strokeWidth={sw}
            strokeLinecap="round"
            opacity="0.7"
          />
        </G>
      );

    case 'calendar':
      return (
        <G fill={fill}>
          <Rect x="-13" y="-11" width="26" height="22" rx="2" fill="none" stroke={fill} strokeWidth={sw * 1.4} />
          <Line x1="-13" y1="-5" x2="13" y2="-5" stroke={fill} strokeWidth={sw} />
          <Line x1="0" y1="-5" x2="0" y2="11" stroke={fill} strokeWidth={sw * 0.8} />
          <Line x1="-13" y1="3" x2="13" y2="3" stroke={fill} strokeWidth={sw * 0.8} />
          <Rect x="-9" y="-15" width="3" height="6" />
          <Rect x="6" y="-15" width="3" height="6" />
        </G>
      );

    case 'flame':
      return (
        <G fill={fill}>
          <Path d="M0 -16 Q-8 -8 -8 0 Q-8 8 0 14 Q8 8 8 0 Q8 -4 4 -8 Q4 -2 0 0 Q-2 -8 0 -16 Z" />
        </G>
      );

    case 'bullseye':
      return (
        <G fill="none" stroke={fill} strokeWidth={sw * 1.4}>
          <Circle cx="0" cy="0" r="13" />
          <Circle cx="0" cy="0" r="8" />
          <Circle cx="0" cy="0" r="3" fill={fill} />
        </G>
      );

    case 'sapling':
      return (
        <G fill={fill}>
          <Path d="M0 14 L0 -2" stroke={fill} strokeWidth={sw * 1.5} strokeLinecap="round" />
          <Path d="M0 0 Q-10 -4 -8 -14 Q-2 -10 0 0 Z" />
          <Path d="M0 4 Q10 0 8 -10 Q2 -6 0 4 Z" />
        </G>
      );

    case 'country-banner':
      return renderCountryFlag(modifier ?? '', fill, sw);

    case 'tee-flag':
      return (
        <G fill={fill}>
          <Line x1="-2" y1="-14" x2="-2" y2="14" stroke={fill} strokeWidth={sw * 1.6} strokeLinecap="round" />
          <Path d="M-2 -14 L10 -10 L-2 -6 Z" />
          <Ellipse cx="-2" cy="14" rx="8" ry="2" />
        </G>
      );

    default:
      return null;
  }
}

function symbolForBadge(name: string): [string, string | null] {
  if (name === 'First Tee') return ['tee-flag', null];
  if (name === 'Getting Started') return ['sapling', null];
  if (name === 'Club Regular') return ['flag', '25'];
  if (name === 'Seasoned Golfer') return ['flag', '50'];
  if (name === 'Century Club') return ['flag', '100'];
  if (name === 'Golf Legend') return ['flag', '250'];

  if (name === 'Border Crosser') return ['globe', '2'];
  if (name === 'European Explorer') return ['globe', '5'];
  if (name === 'Globetrotter') return ['globe', '10'];
  if (name === 'World Traveler') return ['globe', '15'];

  if (name === 'Major Hunter') return ['trophy', 'I'];
  if (name === 'Major Collector') return ['trophy', 'V'];
  if (name === 'Major Master') return ['trophy', 'X'];
  if (name === 'Top 100') return ['crown', null];
  if (name === 'Top 100 Hunter') return ['bullseye', null];

  if (name === 'The Grand Slam') return ['compass', null];
  if (name === 'The Continental Breakfast') return ['coffee', null];
  if (name === 'Year Rounder') return ['calendar', null];
  if (name === 'On a Roll') return ['flame', null];

  if (name === 'Danish Devotee') return ['country-banner', 'DK'];
  if (name === 'Dutch Master') return ['country-banner', 'NL'];
  if (name === 'English Rose') return ['country-banner', 'EN'];
  if (name === 'Finnish Line') return ['country-banner', 'FI'];
  if (name === 'French Connection') return ['country-banner', 'FR'];
  if (name === 'German Precision') return ['country-banner', 'DE'];
  if (name === 'Irish Wanderer') return ['country-banner', 'IE'];
  if (name === 'Norwegian Wood') return ['country-banner', 'NO'];
  if (name === 'Scotland Pilgrim') return ['country-banner', 'SC'];
  if (name === 'Swedish Viking') return ['country-banner', 'SE'];
  if (name === 'Welsh Dragon') return ['country-banner', 'WA'];

  return ['', null];
}

export default function WaxSealBadge({ name, tier, emoji, size = 80, rotation = 0 }: Props) {
  const palette = TIER_PALETTE[tier as keyof typeof TIER_PALETTE] ?? TIER_PALETTE.common;
  const [symbolKey, modifier] = symbolForBadge(name);
  const gradientId = `wax-${tier}-${size}-${name.replace(/\s+/g, '')}`;
  const isLegendary = tier === 'legendary';

  const gradientStops: React.ReactElement[] = [<Stop key="0" offset="0%" stopColor={palette.light} />];
  if (isLegendary) gradientStops.push(<Stop key="mid" offset="55%" stopColor={TIER_PALETTE.legendary.dark} />);
  gradientStops.push(<Stop key="100" offset="100%" stopColor={palette.dark} />);

  return (
    <Svg width={size} height={size} viewBox="-40 -40 80 80" style={{ transform: [{ rotate: `${rotation}deg` }] }}>
      <Defs>
        <RadialGradient id={gradientId} cx="40%" cy="35%" r="65%">
          {gradientStops}
        </RadialGradient>
      </Defs>

      {isLegendary && <Circle r="38" fill="#dfc274" opacity="0.45" />}

      <Circle r="36" fill={`url(#${gradientId})`} />
      <Circle r="36" fill="none" stroke={palette.rim} strokeWidth="0.6" opacity="0.55" />

      <Circle
        r="29"
        fill="none"
        stroke={palette.rim}
        strokeWidth="0.5"
        opacity="0.45"
        strokeDasharray={tier === 'common' ? '2 2' : '0'}
      />

      {tier === 'uncommon' && (
        <G fill={palette.accent} opacity="0.5">
          <Circle cx="0" cy="-33" r="1.5" />
          <Circle cx="33" cy="0" r="1.5" />
          <Circle cx="0" cy="33" r="1.5" />
          <Circle cx="-33" cy="0" r="1.5" />
          <Circle cx="23" cy="-23" r="1.2" />
          <Circle cx="23" cy="23" r="1.2" />
          <Circle cx="-23" cy="23" r="1.2" />
          <Circle cx="-23" cy="-23" r="1.2" />
        </G>
      )}

      {tier === 'rare' && (
        <G fill={palette.accent} opacity="0.5">
          <Polygon points="0,-37 -2,-32 2,-32" />
          <Polygon points="37,0 32,-2 32,2" />
          <Polygon points="0,37 -2,32 2,32" />
          <Polygon points="-37,0 -32,-2 -32,2" />
          <Polygon points="26,-26 22,-24 24,-22" />
          <Polygon points="26,26 22,24 24,22" />
          <Polygon points="-26,26 -22,24 -24,22" />
          <Polygon points="-26,-26 -22,-24 -24,-22" />
        </G>
      )}

      {isLegendary && (
        <G fill={palette.accent} opacity="0.5">
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = (i * 20 - 90) * (Math.PI / 180);
            const r1 = 36;
            const r2 = 32;
            const w = 0.06;
            const x1 = Math.cos(angle) * r1;
            const y1 = Math.sin(angle) * r1;
            const x2a = Math.cos(angle + w) * r2;
            const y2a = Math.sin(angle + w) * r2;
            const x2b = Math.cos(angle - w) * r2;
            const y2b = Math.sin(angle - w) * r2;
            return <Polygon key={i} points={`${x1},${y1} ${x2a},${y2a} ${x2b},${y2b}`} />;
          })}
        </G>
      )}

      {symbolKey ? (
        renderSymbol(symbolKey, modifier, palette.symbol, size)
      ) : emoji ? (
        <SvgText x="0" y="6" textAnchor="middle" fontSize={size > 60 ? 22 : 14}>
          {emoji}
        </SvgText>
      ) : null}
    </Svg>
  );
}
