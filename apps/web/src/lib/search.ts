export function normalizeSearch(q: string): string {
  return q
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // fjerner diakritiske combining marks (ö → o, å → a, ü → u)
    .replace(/ø/g, 'o')
    .replace(/æ/g, 'ae')
    .replace(/ß/g, 'ss')
    .replace(/ð/g, 'd')    // islandsk eth
    .replace(/þ/g, 'th')   // islandsk thorn
    .replace(/ł/g, 'l')    // polsk l med slash
}
