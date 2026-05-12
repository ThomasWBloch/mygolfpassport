import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Feed data layer — pulls together friends' recent rounds, badges, and new friendships
 * into a single chronologically-sorted stream for the home feed.
 *
 * Empty-state fallback: when the user has no friends yet, we surface their own
 * recent rounds so the feed never looks barren.
 */

export type FeedItem =
  | FeedRoundItem
  | FeedBadgeItem
  | FeedFriendshipItem

export interface FeedRoundItem {
  type: 'round'
  id: string                // round id (stable React key)
  timestamp: string         // ISO date for sorting
  actorId: string
  actorName: string
  actorAvatarUrl: string | null
  courseId: string
  courseName: string
  clubName: string | null
  country: string | null
  flag: string | null
  rating: number | null
  playedAt: string | null
}

export interface FeedBadgeItem {
  type: 'badge'
  id: string                // synthetic: `${userId}-${badgeName}-${earnedAt}`
  timestamp: string
  actorId: string
  actorName: string
  actorAvatarUrl: string | null
  badgeEmoji: string
  badgeName: string
  badgeDescription: string
  badgeTier: string         // common | uncommon | rare | legendary
}

export interface FeedFriendshipItem {
  type: 'friendship'
  id: string                // friendship id
  timestamp: string
  actorId: string           // the friend of mine who made the new connection
  actorName: string
  actorAvatarUrl: string | null
  otherId: string           // the new person
  otherName: string
  otherAvatarUrl: string | null
  otherIsFriendOfMine: boolean  // both are my friends → suppress the "add" prompt
}

interface FetchFeedResult {
  items: FeedItem[]
  hasFriends: boolean
  nextCursor: string | null
  // When user has no friends, populated with their own recent rounds (as feed items).
  ownStamps: FeedRoundItem[]
}

interface FetchFeedOptions {
  limit?: number
  before?: string | null   // ISO timestamp — return items strictly older than this
}

const DEFAULT_LIMIT = 20
// Per-stream upstream cap. We over-fetch each stream and then merge+sort, so
// paginating locally is safe up to ~5 pages of feed. Bumped for very active circles.
const STREAM_CAP = 100

export async function fetchFeed(
  supabase: SupabaseClient,
  userId: string,
  opts: FetchFeedOptions = {}
): Promise<FetchFeedResult> {
  const limit = opts.limit ?? DEFAULT_LIMIT
  const before = opts.before ?? null

  // ── 1. Resolve my friend ids ────────────────────────────────────────────
  const { data: friendRows } = await supabase
    .from('friendships')
    .select('user_id, friend_id')
    .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
    .eq('status', 'accepted')

  const friendIds = (friendRows ?? []).map(f =>
    (f.user_id as string) === userId ? (f.friend_id as string) : (f.user_id as string)
  )
  const friendIdSet = new Set(friendIds)

  // ── 2. Empty-state — no friends yet → return own stamps so feed isn't bare ─
  if (friendIds.length === 0) {
    const { data: ownRoundRows } = await supabase
      .from('rounds')
      .select('id, user_id, course_id, rating, played_at, created_at, courses(name, club, country, flag)')
      .eq('user_id', userId)
      // Synthetic loop-rounds spawned by a combo log are bookkeeping rows,
      // not first-class events — one combo log shouldn't produce three
      // separate "stamped" feed items.
      .is('parent_round_id', null)
      .order('created_at', { ascending: false })
      .limit(10)

    const { data: meProfile } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', userId)
      .single()

    const ownName = (meProfile?.full_name as string | null) ?? 'You'
    const ownAvatar = (meProfile?.avatar_url as string | null) ?? null

    const ownStamps: FeedRoundItem[] = (ownRoundRows ?? []).map(r => {
      const c = r.courses as unknown as { name: string; club: string | null; country: string | null; flag: string | null } | null
      return {
        type: 'round' as const,
        id: r.id as string,
        timestamp: (r.created_at as string),
        actorId: userId,
        actorName: ownName,
        actorAvatarUrl: ownAvatar,
        courseId: r.course_id as string,
        courseName: c?.name ?? 'Unknown course',
        clubName: c?.club ?? null,
        country: c?.country ?? null,
        flag: c?.flag ?? null,
        rating: (r.rating as number | null) ?? null,
        playedAt: (r.played_at as string | null) ?? null,
      }
    })

    return { items: [], hasFriends: false, nextCursor: null, ownStamps }
  }

  // ── 3. Fan-out fetch the three streams in parallel ──────────────────────
  // We over-fetch each stream so merge+sort+paginate locally yields enough items.
  const [roundsRes, badgesRes, friendsRes] = await Promise.all([
    supabase
      .from('rounds')
      .select('id, user_id, course_id, rating, played_at, created_at, courses(name, club, country, flag)')
      .in('user_id', friendIds)
      // See sibling note in the empty-state branch above — synthetic loop
      // rounds from combo fan-out are excluded so a friend's single combo
      // log doesn't blow up into three feed cards.
      .is('parent_round_id', null)
      .order('created_at', { ascending: false })
      .limit(STREAM_CAP),

    supabase
      .from('user_badges')
      .select('id, user_id, earned_at, badges(emoji, name, description, tier)')
      .in('user_id', friendIds)
      .order('earned_at', { ascending: false })
      .limit(STREAM_CAP),

    // Friendships where one party is in my friend list and status accepted.
    // Two parallel queries (one per side) — simpler than a nested .or(.in.) and
    // avoids fragile PostgREST grammar. Dedup happens after the fan-out.
    Promise.all([
      supabase
        .from('friendships')
        .select('id, user_id, friend_id, created_at')
        .eq('status', 'accepted')
        .in('user_id', friendIds)
        .order('created_at', { ascending: false })
        .limit(STREAM_CAP),
      supabase
        .from('friendships')
        .select('id, user_id, friend_id, created_at')
        .eq('status', 'accepted')
        .in('friend_id', friendIds)
        .order('created_at', { ascending: false })
        .limit(STREAM_CAP),
    ]),
  ])

  const roundRows = roundsRes.data ?? []
  const badgeRows = badgesRes.data ?? []

  // Merge + dedupe the two friendship query results (a friendship where both
  // parties are my friends would otherwise appear twice).
  const [friendsByUser, friendsByFriend] = friendsRes
  const friendRowsRaw = [...(friendsByUser.data ?? []), ...(friendsByFriend.data ?? [])]
  const seenFriendshipIds = new Set<string>()
  const friendRowsDedup = friendRowsRaw.filter(f => {
    const id = f.id as string
    if (seenFriendshipIds.has(id)) return false
    seenFriendshipIds.add(id)
    return true
  })

  // Filter friendships: drop ones where I'm one of the parties (those aren't "news")
  const friendshipRowsFiltered = friendRowsDedup.filter(f =>
    (f.user_id as string) !== userId && (f.friend_id as string) !== userId
  )

  // ── 4. Collect all profile ids we need, then batch-fetch profiles ───────
  const profileIds = new Set<string>()
  roundRows.forEach(r => profileIds.add(r.user_id as string))
  badgeRows.forEach(b => profileIds.add(b.user_id as string))
  friendshipRowsFiltered.forEach(f => {
    profileIds.add(f.user_id as string)
    profileIds.add(f.friend_id as string)
  })

  let profileMap = new Map<string, { fullName: string; avatarUrl: string | null; hideFromFeeds: boolean }>()
  if (profileIds.size > 0) {
    const { data: profileRows } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, hide_from_feeds')
      .in('id', [...profileIds])
    profileMap = new Map(
      (profileRows ?? []).map(p => [
        p.id as string,
        {
          fullName: (p.full_name as string | null) ?? 'Golfer',
          avatarUrl: (p.avatar_url as string | null) ?? null,
          hideFromFeeds: (p.hide_from_feeds as boolean | null) ?? false,
        },
      ])
    )
  }

  // ── Helper: should an actor's items show up in the viewer's feed? ────────
  // Actors who've toggled hide_from_feeds stay invisible to others (but
  // their own home feed still works because empty-state branches off above).
  const isActorVisible = (actorId: string): boolean => {
    if (actorId === userId) return true
    return !profileMap.get(actorId)?.hideFromFeeds
  }

  // ── 5. Map each stream into FeedItem shape (skipping hidden actors) ─────
  const roundItems: FeedRoundItem[] = roundRows
    .filter(r => isActorVisible(r.user_id as string))
    .map(r => {
    const actor = profileMap.get(r.user_id as string)
    const c = r.courses as unknown as { name: string; club: string | null; country: string | null; flag: string | null } | null
    return {
      type: 'round' as const,
      id: r.id as string,
      timestamp: r.created_at as string,
      actorId: r.user_id as string,
      actorName: actor?.fullName ?? 'Golfer',
      actorAvatarUrl: actor?.avatarUrl ?? null,
      courseId: r.course_id as string,
      courseName: c?.name ?? 'Unknown course',
      clubName: c?.club ?? null,
      country: c?.country ?? null,
      flag: c?.flag ?? null,
      rating: (r.rating as number | null) ?? null,
      playedAt: (r.played_at as string | null) ?? null,
    }
  })

  const badgeItems: FeedBadgeItem[] = badgeRows
    .filter(b => isActorVisible(b.user_id as string))
    .map(b => {
    const actor = profileMap.get(b.user_id as string)
    const badge = b.badges as unknown as { emoji: string; name: string; description: string; tier: string } | null
    return {
      type: 'badge' as const,
      id: `${b.user_id}-${badge?.name ?? 'badge'}-${b.earned_at}`,
      timestamp: b.earned_at as string,
      actorId: b.user_id as string,
      actorName: actor?.fullName ?? 'Golfer',
      actorAvatarUrl: actor?.avatarUrl ?? null,
      badgeEmoji: badge?.emoji ?? '🏅',
      badgeName: badge?.name ?? 'Badge',
      badgeDescription: badge?.description ?? '',
      badgeTier: badge?.tier ?? 'common',
    }
  })

  const friendshipItems: FeedFriendshipItem[] = friendshipRowsFiltered
    .filter(f => {
      // Hide friendship-news if EITHER party opted out — joining is mutual,
      // so suppressing on one side avoids leaking the other's identity.
      const a = f.user_id as string
      const b = f.friend_id as string
      return isActorVisible(a) && isActorVisible(b)
    })
    .map(f => {
    // The "actor" is the friend of mine; the "other" is the new person.
    // If BOTH are my friends, pick the one with the more recent friendship as actor (deterministic: user_id wins).
    const userIsMyFriend = friendIdSet.has(f.user_id as string)
    const friendIsMyFriend = friendIdSet.has(f.friend_id as string)
    const actorId = userIsMyFriend ? (f.user_id as string) : (f.friend_id as string)
    const otherId = actorId === (f.user_id as string) ? (f.friend_id as string) : (f.user_id as string)
    const actor = profileMap.get(actorId)
    const other = profileMap.get(otherId)
    return {
      type: 'friendship' as const,
      id: f.id as string,
      timestamp: f.created_at as string,
      actorId,
      actorName: actor?.fullName ?? 'Golfer',
      actorAvatarUrl: actor?.avatarUrl ?? null,
      otherId,
      otherName: other?.fullName ?? 'Golfer',
      otherAvatarUrl: other?.avatarUrl ?? null,
      otherIsFriendOfMine: userIsMyFriend && friendIsMyFriend,
    }
  })

  // ── 6. Merge, sort by timestamp DESC, paginate ──────────────────────────
  const merged: FeedItem[] = [...roundItems, ...badgeItems, ...friendshipItems]
    .sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp))

  const filtered = before
    ? merged.filter(i => +new Date(i.timestamp) < +new Date(before))
    : merged

  const page = filtered.slice(0, limit)
  const hasMore = filtered.length > limit
  const nextCursor = hasMore && page.length > 0
    ? page[page.length - 1].timestamp
    : null

  return {
    items: page,
    hasFriends: true,
    nextCursor,
    ownStamps: [],
  }
}

/** Format an ISO timestamp as a stamp-style relative time (e.g. "2 HOURS AGO"). */
export function relativeTimestamp(iso: string, now: Date = new Date()): string {
  const then = new Date(iso)
  const diffMs = now.getTime() - then.getTime()
  const diffMin = Math.floor(diffMs / 60_000)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)
  const diffWk = Math.floor(diffDay / 7)

  if (diffMin < 1) return 'JUST NOW'
  if (diffMin < 60) return `${diffMin} MIN AGO`
  if (diffHr < 24) return `${diffHr} HOUR${diffHr === 1 ? '' : 'S'} AGO`
  if (diffDay === 1) return 'YESTERDAY'
  if (diffDay < 7) return `${diffDay} DAYS AGO`
  if (diffWk < 5) return `${diffWk} WEEK${diffWk === 1 ? '' : 'S'} AGO`
  // Older — fall back to month/year format
  return then.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
}

/**
 * Format played_at as the primary date label on round cards. Always absolute
 * so that two rounds on the same course played a year apart don't both
 * collapse to "2 WEEKS AGO" just because they were logged in the same session.
 *
 *   PLAYED 18 APR 2026   if within the past 12 months
 *   PLAYED APR 2026      older than 12 months
 *
 * Returns null when playedAt is missing or unparseable; callers should fall
 * back to relativeTimestamp(item.timestamp) in that case.
 */
export function playedAtLabel(playedAtIso: string | null, now: Date = new Date()): string | null {
  if (!playedAtIso) return null
  const d = new Date(playedAtIso)
  if (isNaN(d.getTime())) return null
  const diffDays = (now.getTime() - d.getTime()) / 86_400_000
  if (diffDays < 365) {
    return 'PLAYED ' + d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()
  }
  return 'PLAYED ' + d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
}
