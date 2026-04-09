export function computeInitials(fullName?: string | null, email?: string | null): string {
  if (fullName?.trim()) {
    return fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('')
  }
  const emailName = email?.split('@')[0]
  if (emailName) return emailName[0].toUpperCase()
  return 'G'
}
