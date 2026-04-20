export function normalizeSearch(q: string): string {
  return q
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // fjerner diakritiske tegn
}
