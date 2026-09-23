const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * Guard for ids taken from a request body before they're interpolated into
 * a PostgREST filter string (e.g. `.or(...)`), where ',' and ')' in an
 * unchecked value would otherwise rewrite the filter.
 */
export function isUuid(value: unknown): value is string {
  return typeof value === 'string' && UUID_RE.test(value)
}
