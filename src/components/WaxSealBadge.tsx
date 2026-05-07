/**
 * WaxSealBadge — circular wax-seal style badge with tier progression.
 *
 * Replaces the old rectangular emoji-card pattern with a passport/letter-seal
 * aesthetic that fits the Adventure design system. Four tier visualisations
 * (matte black → midnight blue → crimson → gold) make rarity instantly
 * readable at a glance.
 *
 * The center symbol is dispatched from the badge name via SYMBOL_MAP.
 * Names not mapped fall back to the original emoji rendered inside the seal.
 */

interface Props {
  /** Badge name from the badges table — used to look up the SVG symbol */
  name: string
  /** Tier — drives wax colour */
  tier: 'common' | 'uncommon' | 'rare' | 'legendary' | string
  /** Original emoji from DB — used as fallback if name not in SYMBOL_MAP */
  emoji?: string
  /** Diameter in px. 80 default; 32 for compact usage on PassportCard */
  size?: number
  /** Slight rotation so a row of seals doesn't feel mechanical */
  rotation?: number
}

// ── Tier wax palette ─────────────────────────────────────────────────────────
const TIER_PALETTE = {
  common: {
    light: '#5a564b',
    dark: '#2c2920',
    rim: '#1f1a14',
    accent: '#1f1a14',
    symbol: '#f4ecd8',
  },
  uncommon: {
    light: '#5a7290',
    dark: '#2a3e54',
    rim: '#0a1c2e',
    accent: '#0a1c2e',
    symbol: '#f4ecd8',
  },
  rare: {
    light: '#c46748',
    dark: '#7a2e15',
    rim: '#5a2a18',
    accent: '#5a2a18',
    symbol: '#f9efd5',
  },
  legendary: {
    light: '#e6c668',
    dark: '#8a6d24',
    rim: '#5a4218',
    accent: '#5a4218',
    symbol: '#3a2a08',
  },
} as const

// ── Symbol library — paths/elements rendered at viewBox -32..32 ──────────────
//
// Each symbol is a render fn so we can parameterize numbers/letters into it.
// All symbols are designed flat (no gradients/strokes) so they read like
// pressed/embossed details on the wax.
function renderSymbol(
  symbolKey: string,
  modifier: string | null,
  fill: string,
  size: number,
): React.ReactNode {
  const sw = Math.max(0.5, size / 60) // stroke width scales with size

  switch (symbolKey) {
    case 'tee':
      // Golf tee with ball on top
      return (
        <g fill={fill}>
          <circle cx="0" cy="-12" r="8" />
          <path d="M-8 -4 L-4 14 L4 14 L8 -4 Z" />
        </g>
      )

    case 'flag':
      // Golf flag on a pole, with optional number on flag
      return (
        <g fill={fill} stroke={fill} strokeWidth={sw}>
          <line x1="-8" y1="-16" x2="-8" y2="16" strokeLinecap="round" />
          <path d="M-8 -16 L14 -10 L-8 -4 Z" />
          {modifier && (
            <text
              x="3"
              y="-9"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontSize={size > 60 ? 9 : 8}
              fontWeight={500}
              fill={fill === '#f4ecd8' ? '#1f1a14' : '#f4ecd8'}
              stroke="none"
            >
              {modifier}
            </text>
          )}
        </g>
      )

    case 'crown':
      // Royal crown — for Top 100 and Major Master
      return (
        <g fill={fill}>
          <path d="M-16 4 L-16 -10 L-10 -3 L-4 -12 L0 -3 L4 -12 L10 -3 L16 -10 L16 4 Z" />
          <rect x="-17" y="5" width="34" height="3" />
          <circle cx="-10" cy="-5" r="1.5" />
          <circle cx="0" cy="-7" r="1.5" />
          <circle cx="10" cy="-5" r="1.5" />
        </g>
      )

    case 'medal':
      // Medal/decoration with optional Roman/Arabic number
      return (
        <g fill={fill}>
          <path d="M0 -14 L4 -2 L0 0 L-4 -2 Z" />
          <circle cx="0" cy="6" r="10" />
          {modifier && (
            <text
              x="0"
              y="10"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontSize={size > 60 ? 11 : 9}
              fontWeight={500}
              fill={fill === '#f4ecd8' ? '#1f1a14' : '#f4ecd8'}
            >
              {modifier}
            </text>
          )}
        </g>
      )

    case 'globe':
      // Globe with meridian/equator + optional number overlay
      return (
        <g fill="none" stroke={fill} strokeWidth={sw * 1.4}>
          <circle cx="0" cy="0" r="14" />
          <ellipse cx="0" cy="0" rx="6" ry="14" />
          <line x1="-14" y1="0" x2="14" y2="0" />
          {modifier && (
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontSize={size > 60 ? 11 : 9}
              fontWeight={600}
              fill={fill}
              stroke="none"
            >
              {modifier}
            </text>
          )}
        </g>
      )

    case 'compass':
      // Compass rose — for Grand Slam (multi-region pilgrimage)
      return (
        <g fill={fill}>
          <circle cx="0" cy="0" r="14" fill="none" stroke={fill} strokeWidth={sw * 1.4} />
          <polygon points="0,-12 3,0 0,12 -3,0" />
          <polygon points="-12,0 0,-3 12,0 0,3" opacity="0.6" />
        </g>
      )

    case 'coffee':
      // Coffee cup — for The Continental Breakfast
      return (
        <g fill={fill}>
          <path d="M-9 -4 L-9 8 Q-9 12 -5 12 L5 12 Q9 12 9 8 L9 -4 Z" />
          <path
            d="M9 0 Q14 0 14 4 Q14 8 9 8"
            fill="none"
            stroke={fill}
            strokeWidth={sw * 1.5}
          />
          <path
            d="M-4 -10 Q-4 -14 -2 -14 M0 -10 Q0 -14 2 -14 M4 -10 Q4 -14 6 -14"
            fill="none"
            stroke={fill}
            strokeWidth={sw}
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>
      )

    case 'calendar':
      // Calendar with quarters marked — for Year Rounder
      return (
        <g fill={fill}>
          <rect x="-13" y="-11" width="26" height="22" rx="2" fill="none" stroke={fill} strokeWidth={sw * 1.4} />
          <line x1="-13" y1="-5" x2="13" y2="-5" stroke={fill} strokeWidth={sw} />
          <line x1="0" y1="-5" x2="0" y2="11" stroke={fill} strokeWidth={sw * 0.8} />
          <line x1="-13" y1="3" x2="13" y2="3" stroke={fill} strokeWidth={sw * 0.8} />
          <rect x="-9" y="-15" width="3" height="6" />
          <rect x="6" y="-15" width="3" height="6" />
        </g>
      )

    case 'flame':
      // Stylised flame — for On a Roll (3 in 30 days streak)
      return (
        <g fill={fill}>
          <path d="M0 -16 Q-8 -8 -8 0 Q-8 8 0 14 Q8 8 8 0 Q8 -4 4 -8 Q4 -2 0 0 Q-2 -8 0 -16 Z" />
        </g>
      )

    case 'bullseye':
      // Concentric circles — for Top 100 Hunter
      return (
        <g fill="none" stroke={fill} strokeWidth={sw * 1.4}>
          <circle cx="0" cy="0" r="13" />
          <circle cx="0" cy="0" r="8" />
          <circle cx="0" cy="0" r="3" fill={fill} />
        </g>
      )

    case 'sapling':
      // Sapling/leaf — for Getting Started (10 courses)
      return (
        <g fill={fill}>
          <path d="M0 14 L0 -2" stroke={fill} strokeWidth={sw * 1.5} strokeLinecap="round" />
          <path d="M0 0 Q-10 -4 -8 -14 Q-2 -10 0 0 Z" />
          <path d="M0 4 Q10 0 8 -10 Q2 -6 0 4 Z" />
        </g>
      )

    case 'country-banner':
      // Banner ribbon with country 2-letter code — for country-specific badges
      return (
        <g fill={fill}>
          <path d="M-15 -12 L15 -12 L18 0 L15 12 L-15 12 L-12 0 Z" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize={size > 60 ? 13 : 11}
            fontWeight={500}
            fill={fill === '#f4ecd8' ? '#1f1a14' : '#f4ecd8'}
          >
            {modifier ?? ''}
          </text>
        </g>
      )

    case 'tee-flag':
      // Combined tee + small flag — for First Tee specifically
      return (
        <g fill={fill}>
          <line x1="-2" y1="-14" x2="-2" y2="14" stroke={fill} strokeWidth={sw * 1.6} strokeLinecap="round" />
          <path d="M-2 -14 L10 -10 L-2 -6 Z" />
          <ellipse cx="-2" cy="14" rx="8" ry="2" />
        </g>
      )

    default:
      return null
  }
}

// ── Badge name → symbol dispatch ─────────────────────────────────────────────
//
// Returns [symbolKey, modifier]. Modifier is rendered as a number/code on
// symbols that support it (flag/medal/globe/country-banner).
function symbolForBadge(name: string): [string, string | null] {
  // Course-count milestones
  if (name === 'First Tee') return ['tee-flag', null]
  if (name === 'Getting Started') return ['sapling', null]
  if (name === 'Club Regular') return ['flag', '25']
  if (name === 'Seasoned Golfer') return ['flag', '50']
  if (name === 'Century Club') return ['flag', '100']
  if (name === 'Golf Legend') return ['flag', '250']

  // Country-count
  if (name === 'Border Crosser') return ['globe', '2']
  if (name === 'European Explorer') return ['globe', '5']
  if (name === 'Globetrotter') return ['globe', '10']
  if (name === 'World Traveler') return ['globe', '15']

  // Major / Top 100
  if (name === 'Major Hunter') return ['medal', 'I']
  if (name === 'Major Collector') return ['medal', 'V']
  if (name === 'Major Master') return ['medal', 'X']
  if (name === 'Top 100') return ['crown', null]
  if (name === 'Top 100 Hunter') return ['bullseye', null]

  // Special
  if (name === 'The Grand Slam') return ['compass', null]
  if (name === 'The Continental Breakfast') return ['coffee', null]
  if (name === 'Year Rounder') return ['calendar', null]
  if (name === 'On a Roll') return ['flame', null]

  // Country-specific (2-letter code on banner)
  if (name === 'Danish Devotee') return ['country-banner', 'DK']
  if (name === 'Dutch Master') return ['country-banner', 'NL']
  if (name === 'English Rose') return ['country-banner', 'EN']
  if (name === 'Finnish Line') return ['country-banner', 'FI']
  if (name === 'French Connection') return ['country-banner', 'FR']
  if (name === 'German Precision') return ['country-banner', 'DE']
  if (name === 'Irish Wanderer') return ['country-banner', 'IE']
  if (name === 'Norwegian Wood') return ['country-banner', 'NO']
  if (name === 'Scotland Pilgrim') return ['country-banner', 'SC']
  if (name === 'Swedish Viking') return ['country-banner', 'SE']
  if (name === 'Welsh Dragon') return ['country-banner', 'WA']

  // Fallback — no mapped symbol
  return ['', null]
}

// ── Component ────────────────────────────────────────────────────────────────
export default function WaxSealBadge({
  name,
  tier,
  emoji,
  size = 80,
  rotation = 0,
}: Props) {
  const palette = TIER_PALETTE[tier as keyof typeof TIER_PALETTE] ?? TIER_PALETTE.common
  const [symbolKey, modifier] = symbolForBadge(name)
  const gradientId = `wax-${tier}-${size}-${name.replace(/\s+/g, '')}`

  // Sun-burst rays for legendary tier — adds royal flourish
  const isLegendary = tier === 'legendary'

  return (
    <svg
      width={size}
      height={size}
      viewBox="-40 -40 80 80"
      style={{ display: 'block', transform: `rotate(${rotation}deg)` }}
      aria-label={`${name} ${tier} badge`}
    >
      <defs>
        <radialGradient id={gradientId} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor={palette.light} />
          {isLegendary && <stop offset="55%" stopColor={(palette as typeof TIER_PALETTE.legendary).dark} />}
          <stop offset="100%" stopColor={palette.dark} />
        </radialGradient>
      </defs>

      {/* Outer halo — only for legendary, evokes gold-foil glow */}
      {isLegendary && (
        <circle r="38" fill="#dfc274" opacity="0.45" />
      )}

      {/* Wax disc */}
      <circle r="36" fill={`url(#${gradientId})`} />
      <circle r="36" fill="none" stroke={palette.rim} strokeWidth="0.6" opacity="0.55" />

      {/* Inner ring — embossed detail */}
      <circle r="29" fill="none" stroke={palette.rim} strokeWidth="0.5" opacity="0.45" strokeDasharray={tier === 'common' ? '2 2' : '0'} />

      {/* Tier-specific edge decoration */}
      {tier === 'uncommon' && (
        <g fill={palette.accent} opacity="0.5">
          <circle cx="0" cy="-33" r="1.5" />
          <circle cx="33" cy="0" r="1.5" />
          <circle cx="0" cy="33" r="1.5" />
          <circle cx="-33" cy="0" r="1.5" />
          <circle cx="23" cy="-23" r="1.2" />
          <circle cx="23" cy="23" r="1.2" />
          <circle cx="-23" cy="23" r="1.2" />
          <circle cx="-23" cy="-23" r="1.2" />
        </g>
      )}

      {tier === 'rare' && (
        <g fill={palette.accent} opacity="0.5">
          <polygon points="0,-37 -2,-32 2,-32" />
          <polygon points="37,0 32,-2 32,2" />
          <polygon points="0,37 -2,32 2,32" />
          <polygon points="-37,0 -32,-2 -32,2" />
          <polygon points="26,-26 22,-24 24,-22" />
          <polygon points="26,26 22,24 24,22" />
          <polygon points="-26,26 -22,24 -24,22" />
          <polygon points="-26,-26 -22,-24 -24,-22" />
        </g>
      )}

      {isLegendary && (
        <g fill={palette.accent} opacity="0.5">
          {/* 18 sun-burst rays */}
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = (i * 20 - 90) * (Math.PI / 180)
            const r1 = 36
            const r2 = 32
            const w = 0.06
            const x1 = Math.cos(angle) * r1
            const y1 = Math.sin(angle) * r1
            const x2a = Math.cos(angle + w) * r2
            const y2a = Math.sin(angle + w) * r2
            const x2b = Math.cos(angle - w) * r2
            const y2b = Math.sin(angle - w) * r2
            return <polygon key={i} points={`${x1},${y1} ${x2a},${y2a} ${x2b},${y2b}`} />
          })}
        </g>
      )}

      {/* Center symbol — custom SVG or emoji fallback */}
      {symbolKey ? (
        renderSymbol(symbolKey, modifier, palette.symbol, size)
      ) : emoji ? (
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fontSize={size > 60 ? 22 : 14}
          aria-hidden="true"
        >
          {emoji}
        </text>
      ) : null}
    </svg>
  )
}
