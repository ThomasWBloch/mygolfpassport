// My Golf Passport — Adventure design tokens
// Single source of truth. Portable to React Native: only the rendering layer changes.
// CSS variables are defined in src/app/globals.css; this file is for TS consumers.

export const colors = {
  passport: {
    cover: '#1f3a2e',
    coverDark: '#0f2519',
    coverLight: '#2d4d40',
    coverInk: '#0a1c14',
  },
  accent: {
    gold: '#c9a84c',
    goldDark: '#9a7e2a',
    goldLight: '#dfc274',
    goldFaint: '#efe2b5',
  },
  paper: {
    cream: '#f4ecd8',
    creamWarm: '#f9efd5',
    creamCool: '#ede4cb',
    white: '#fdf9ed',
  },
  ink: {
    primary: '#1f3a2e',
    secondary: '#6b6048',
    tertiary: '#8a7d5f',
    inverse: '#f4ecd8',
    inverseSoft: 'rgba(244,236,216,0.7)',
  },
  stamp: {
    red: '#a84a2c',
    blue: '#3a5266',
    purple: '#5e3a5b',
    black: '#1f1a14',
  },
  border: {
    paper: '#d4c79f',
    paperStrong: '#b8a878',
    paperFaint: '#e0d5b0',
    gold: '#c9a84c',
  },
  state: {
    success: '#5a7a4a',
    warning: '#c9a84c',
    danger: '#a84a2c',
    info: '#3a5266',
  },
  overlay: {
    dark: 'rgba(15,37,25,0.6)',
    paper: 'rgba(244,236,216,0.9)',
  },
} as const

export const typography = {
  family: {
    display: '"Cormorant Garamond", Georgia, serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    mono: '"Special Elite", "Courier New", monospace',
  },
  size: {
    display1: 32,
    display2: 28,
    h1: 24,
    h2: 20,
    h3: 17,
    body: 15,
    bodySmall: 13,
    caption: 12,
    eyebrow: 10,
    micro: 9,
  },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: 1.15,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.7,
  },
  tracking: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    eyebrow: 2,
    eyebrowWide: 3,
    stamp: 4,
  },
} as const

export const spacing = {
  '0': 0, '1': 4, '2': 8, '3': 12, '4': 16, '5': 20,
  '6': 24, '8': 32, '10': 40, '12': 48, '16': 64,
} as const

export const radius = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 16,
  pill: 9999,
  stamp: 9999,
} as const

export const elevation = {
  none: 'none',
  flat: '0 1px 0 rgba(31,58,46,0.06)',
  card: '0 2px 6px rgba(31,58,46,0.08)',
  cardElevated: '0 4px 12px rgba(31,58,46,0.12)',
  modal: '0 16px 48px rgba(31,58,46,0.32)',
  stamp: '0 1px 2px rgba(31,58,46,0.15)',
} as const

export const motion = {
  duration: {
    instant: 0,
    fast: 150,
    base: 220,
    slow: 320,
    deliberate: 480,
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
    stamp: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const

export const layout = {
  maxWidthMobile: 430,
  bottomNavHeight: 64,
  fabSize: 56,
  headerHeightStandard: 88,
  cardPadding: 20,
  pagePadding: 16,
} as const

export const zIndex = {
  base: 0,
  card: 1,
  sticky: 10,
  bottomNav: 50,
  modal: 100,
  toast: 200,
} as const

export const tokens = {
  colors,
  typography,
  spacing,
  radius,
  elevation,
  motion,
  layout,
  zIndex,
} as const

export type Tokens = typeof tokens
