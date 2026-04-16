export const TIER_ORDER = ['common', 'uncommon', 'rare', 'legendary'] as const

export const TIER_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  common:    { color: '#6b7280', bg: '#f3f4f6', border: '#d1d5db' },
  uncommon:  { color: '#1a5c38', bg: '#e8f5ee', border: '#a7d5b8' },
  rare:      { color: '#1d4ed8', bg: '#dbeafe', border: '#93c5fd' },
  legendary: { color: '#92400e', bg: '#f5e9c8', border: '#c9a84c' },
}
