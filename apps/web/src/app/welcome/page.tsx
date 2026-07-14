import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

/**
 * Welcome — Trin 0 public landing page.
 *
 * Mockup source: design-system/welcome-hero-mockup-v4.html
 *
 * Sections (top → bottom):
 *  · Top bar (sticky, dark green, M-monogram + Features/Pricing/Sign in)
 *  · 500-lifetime sticky promo banner (gold, animated pulse)
 *  · Hero (eyebrow, headline, sub, CTAs, trust signals, passport mock-up)
 *  · Marquee strip (36k+ courses · 149 countries · 30+ badges · golf buddies)
 *  · F1 Stamp every course — passport spread with 6 country illustrations
 *  · F2 Atlas — world map (24 continent paths, 8 stamped pins)
 *  · F3 Trophy room (merged from old F3+F7) — 8-tile badge grid
 *  · F4 Companions — friend list
 *  · F5 Standings — ranked leaderboard
 *  · F6 Meet new golfers — Member-invite + Open-invite cards (v2.1 feature)
 *  · F7 Recruit your buddies — share link + buddy counter
 *  · Final CTA (dark) — Begin your journey + 500-lifetime urgency
 *  · Footer — Made by golfers, for golfers
 *
 * Notes:
 *  · Authenticated users redirect to / (no need to see marketing once aboard)
 *  · Hero passport is a CSS mock-up with gold-initials disc (TB). Eventually
 *    swap to a real app screenshot with AI-cartoon-avatar in the disc slot.
 *  · World map SVG uses simplified continent paths. Future polish: real
 *    topojson or real /map screenshot.
 *  · Country-stamp illustrations are placeholder SVGs (Scotland thistle,
 *    Ireland clover, DK Dannebrog, FR Eiffel, ENG crown, NL tulip). Will be
 *    redrawn by an illustrator + expanded to ~149 countries over time.
 *  · The 500-lifetime banner stays until we hit 500 signups — then remove
 *    both the sticky strip + the Final-CTA urgency block.
 */

export default async function WelcomePage() {
  // If already authenticated, send them home — no need to see marketing again
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() {},
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/')

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: WELCOME_CSS }} />
      <div className="wh">

        {/* ── Top bar ────────────────────────────────────────────── */}
        <header className="wh-topbar">
          <div className="wh-brand">
            <span className="wh-monogram">M</span>
            <span className="wh-brand-name">My Golf Passport</span>
          </div>
          <nav className="wh-topnav">
            <Link href="#features">Features</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="/signin" className="signin">Sign in</Link>
          </nav>
        </header>

        {/* ── 500-lifetime promo banner ──────────────────────────── */}
        <div className="wh-promo-strip">
          <span className="pulse" />
          <span>The first <b>500</b> passports get <span className="counter">lifetime premium</span> — free, forever</span>
        </div>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="wh-hero">
          <div className="wh-eyebrow">Established 2026</div>
          <h1 className="wh-headline">One passport for every <em>course</em> you play.</h1>
          <p className="wh-sub">
            Stamp the rounds. Map the journey. Compare seasons with friends.
            Goodbye Excel sheets and lost scorecards — just the record of
            where you&apos;ve been.
          </p>
          <div className="wh-cta-row">
            <Link href="/signup" className="wh-btn wh-btn-gold">Get your passport →</Link>
            <Link href="/signin" className="wh-btn wh-btn-ghost">Sign in</Link>
          </div>
          <div className="wh-trust">
            <span>No ads</span>
            <span>No tracking</span>
          </div>

          <div className="wh-hero-art">
            <div className="hero-passport">
              <span className="hero-floater f-red">✦ Issued today</span>
              <div className="hero-pp-eyebrow">Passport Holder</div>
              <div className="hero-pp-row">
                <div className="hero-pp-disc">TB</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="hero-pp-name">Thomas Bloch</div>
                  <div className="hero-pp-meta">🇩🇰 Denmark · HCP <b>12</b></div>
                </div>
              </div>
              <div className="hero-pp-stats">
                <div className="hero-pp-stat"><div className="hero-pp-stat-n">47</div><div className="hero-pp-stat-l">Courses</div></div>
                <div className="hero-pp-stat"><div className="hero-pp-stat-n">8</div><div className="hero-pp-stat-l">Countries</div></div>
                <div className="hero-pp-stat"><div className="hero-pp-stat-n">23</div><div className="hero-pp-stat-l">Badges</div></div>
              </div>
              <div className="hero-pp-seals">
                <span className="seal seal-red">⚐</span>
                <span className="seal seal-blue">◈</span>
                <span className="seal seal-gold">✦</span>
                <span className="seal seal-purple">♛</span>
                <span className="seal seal-black">★</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Marquee ─────────────────────────────────────────────── */}
        <div className="wh-marquee">
          <span><em>36,000+</em> courses</span>
          <span><em>149</em> countries</span>
          <span><em>30+</em> badges</span>
          <span>All your <em>golf buddies</em></span>
        </div>

        {/* ── F1: Stamp every course ──────────────────────────────── */}
        <section className="wh-feature" id="features">
          <div className="wh-f-eyebrow">⚐ Round logging</div>
          <h2 className="wh-f-headline">Every course earns a stamp.</h2>
          <p className="wh-f-body">
            Tap once when you finish a round. Your passport grows page by
            page — clubs, countries, signature holes, and the rare ones
            you&apos;ve waited years to play.
          </p>
          <div className="wh-visual">
            <div className="v-spread">
              <div className="v-spread-row"><span>Page 1 · Europe</span><span>· · ·</span></div>
              <div className="v-stamp-grid">
                <div className="v-stamp">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 L10 7 L8 6 L9 9 L7 10 L11 11 L9 14 L12 13 L15 14 L13 11 L17 10 L15 9 L16 6 L14 7 Z M12 13 L12 21"/></svg>
                  <span className="v-stamp-cc">SCOT</span>
                </div>
                <div className="v-stamp blue">
                  <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="9" r="3.2"/><circle cx="8" cy="12" r="3.2"/><circle cx="16" cy="12" r="3.2"/><rect x="11" y="14" width="2" height="6" rx="0.5"/></svg>
                  <span className="v-stamp-cc">IRE</span>
                </div>
                <div className="v-stamp gold">
                  <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="10" width="18" height="3"/><rect x="8" y="3" width="3" height="18"/></svg>
                  <span className="v-stamp-cc">DK</span>
                </div>
                <div className="v-stamp purple">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 L11 8 L9 14 L7 21 L17 21 L15 14 L13 8 Z M9 14 L15 14 M10 18 L14 18"/></svg>
                  <span className="v-stamp-cc">FR</span>
                </div>
                <div className="v-stamp">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 14 L4 18 L20 18 L20 14 L17 16 L14 12 L12 16 L10 12 L7 16 Z"/></svg>
                  <span className="v-stamp-cc">ENG</span>
                </div>
                <div className="v-stamp blue">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 Q9 7 9 11 L9 14 Q12 11 12 11 Q12 11 15 14 L15 11 Q15 7 12 3 Z M12 14 L12 21 M9 20 Q12 18 15 20"/></svg>
                  <span className="v-stamp-cc">NL</span>
                </div>
                <div className="v-stamp dream">
                  <span className="v-stamp-cc">DE</span>
                  <span style={{ fontSize: 6, letterSpacing: 1, opacity: 0.7, fontFamily: 'var(--font-mgp-stamp)', marginTop: 2 }}>SOON</span>
                </div>
                <div className="v-stamp locked">
                  <span style={{ fontSize: 16, opacity: 0.5 }}>?</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── F2: Atlas ───────────────────────────────────────────── */}
        <section className="wh-feature warm">
          <div className="wh-f-eyebrow">⊕ Atlas</div>
          <h2 className="wh-f-headline">Watch your map fill in.</h2>
          <p className="wh-f-body">
            Countries light up as you stamp them. From your home club to
            every bucket-list trip — your passport remembers the route
            you took to play them all.
          </p>
          <div className="wh-visual">
            <div className="v-map">
              <div className="v-map-eyebrow"><span>Your Atlas</span><span><b>8</b> / 149</span></div>
              <div className="v-map-canvas">
                <svg viewBox="0 0 360 200" preserveAspectRatio="xMidYMid meet">
                  <line x1="0" y1="105" x2="360" y2="105" stroke="#b8a878" strokeWidth="0.4" strokeDasharray="3 4" opacity="0.5"/>
                  <line x1="0" y1="78" x2="360" y2="78" stroke="#b8a878" strokeWidth="0.25" strokeDasharray="2 5" opacity="0.32"/>
                  <line x1="0" y1="132" x2="360" y2="132" stroke="#b8a878" strokeWidth="0.25" strokeDasharray="2 5" opacity="0.32"/>
                  {/* N America */}
                  <path d="M22 42 L28 38 L38 36 L48 34 L55 36 L62 32 L72 30 L82 30 L92 32 L100 36 L106 42 L108 48 L104 50 L98 50 L93 48 L88 50 L85 56 L88 62 L94 66 L100 72 L104 80 L106 88 L107 96 L104 102 L99 106 L95 110 L92 106 L89 100 L85 98 L80 102 L75 110 L72 118 L68 124 L64 128 L60 124 L56 116 L51 108 L46 100 L40 90 L35 80 L30 70 L26 60 L23 50 Z" fill="#a8b896" opacity="0.78" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* C America */}
                  <path d="M72 128 L77 132 L82 138 L85 144 L87 150 L85 154 L81 152 L76 146 L72 138 Z" fill="#a8b896" opacity="0.72" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* S America */}
                  <path d="M86 150 L94 148 L102 148 L110 152 L116 158 L120 166 L122 176 L121 184 L118 192 L113 196 L107 192 L102 184 L97 174 L93 164 L90 156 Z" fill="#a8b896" opacity="0.74" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Greenland */}
                  <path d="M132 28 L142 26 L152 28 L156 36 L154 44 L148 48 L140 46 L134 40 Z" fill="#a8b896" opacity="0.6" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Iceland */}
                  <path d="M161 50 L167 49 L169 53 L165 55 L162 53 Z" fill="#a8b896" opacity="0.55" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* British Isles */}
                  <path d="M172 60 L176 58 L178 64 L176 70 L173 68 Z" fill="#a8b896" opacity="0.7" stroke="#7d8f6a" strokeWidth="0.5"/>
                  <path d="M168 64 L171 63 L171 67 L168 68 Z" fill="#a8b896" opacity="0.65" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Scandinavia */}
                  <path d="M184 44 L192 38 L198 42 L196 50 L192 56 L188 62 L185 60 L184 54 Z" fill="#a8b896" opacity="0.72" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Iberia */}
                  <path d="M175 78 L182 76 L187 78 L188 84 L184 86 L178 84 L175 82 Z" fill="#a8b896" opacity="0.7" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Mainland Europe + Italy */}
                  <path d="M182 62 L190 60 L198 58 L206 58 L212 60 L214 65 L212 70 L208 74 L202 74 L197 78 L194 82 L192 86 L195 90 L197 95 L195 98 L191 96 L186 90 L183 82 L182 74 Z" fill="#a8b896" opacity="0.7" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Africa */}
                  <path d="M178 88 L188 86 L198 86 L208 88 L216 92 L222 98 L226 106 L230 116 L228 126 L224 134 L220 142 L216 152 L210 162 L204 168 L198 168 L192 164 L188 156 L184 148 L182 140 L180 130 L180 120 L180 110 L180 100 Z" fill="#a8b896" opacity="0.76" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Madagascar */}
                  <path d="M232 144 L236 142 L238 150 L236 156 L233 156 Z" fill="#a8b896" opacity="0.65" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Arabia */}
                  <path d="M216 86 L226 84 L234 86 L236 92 L234 100 L230 104 L226 102 L222 96 L218 92 Z" fill="#a8b896" opacity="0.7" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Russia top mass */}
                  <path d="M200 38 L218 34 L240 32 L260 30 L280 30 L300 32 L318 36 L330 42 L336 50 L332 56 L318 60 L302 62 L286 64 L270 64 L255 62 L240 60 L226 58 L214 56 L206 52 L202 46 Z" fill="#a8b896" opacity="0.73" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Central Asia */}
                  <path d="M218 60 L240 60 L262 62 L284 64 L300 66 L302 72 L294 76 L278 78 L260 78 L242 76 L226 72 L220 66 Z" fill="#a8b896" opacity="0.7" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* China */}
                  <path d="M280 78 L302 78 L316 82 L322 90 L320 98 L310 102 L298 100 L286 94 L280 88 Z" fill="#a8b896" opacity="0.7" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Korea */}
                  <path d="M324 78 L329 76 L330 82 L327 84 Z" fill="#a8b896" opacity="0.7" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Japan */}
                  <path d="M333 78 L340 76 L344 82 L342 88 L338 92 L335 88 Z" fill="#a8b896" opacity="0.7" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* India */}
                  <path d="M266 84 L278 86 L286 92 L284 102 L280 112 L274 116 L270 112 L266 102 L264 92 Z" fill="#a8b896" opacity="0.74" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* SE Asia */}
                  <path d="M290 100 L302 100 L308 106 L304 114 L296 112 L290 106 Z" fill="#a8b896" opacity="0.7" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Indonesia */}
                  <path d="M298 116 L312 116 L320 120 L322 126 L316 130 L304 130 L296 124 Z" fill="#a8b896" opacity="0.7" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Philippines */}
                  <path d="M324 100 L328 98 L330 106 L326 108 Z" fill="#a8b896" opacity="0.62" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Australia */}
                  <path d="M300 146 L318 142 L332 144 L342 148 L348 154 L348 162 L340 168 L326 170 L310 168 L298 162 L294 154 Z" fill="#a8b896" opacity="0.76" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* NZ */}
                  <path d="M350 168 L354 166 L356 172 L354 176 L351 173 Z" fill="#a8b896" opacity="0.65" stroke="#7d8f6a" strokeWidth="0.5"/>
                  <path d="M352 178 L355 177 L356 184 L353 184 Z" fill="#a8b896" opacity="0.6" stroke="#7d8f6a" strokeWidth="0.5"/>
                  {/* Antarctica */}
                  <path d="M0 196 L60 192 L120 194 L180 192 L240 194 L300 192 L360 196 L360 200 L0 200 Z" fill="#a8b896" opacity="0.35" stroke="#7d8f6a" strokeWidth="0.3"/>
                </svg>
                <span className="v-map-pin" style={{ top: '28%', left: '51%' }} />
                <span className="v-map-pin" style={{ top: '32%', left: '47%' }} />
                <span className="v-map-pin gold" style={{ top: '27%', left: '53%' }} />
                <span className="v-map-pin" style={{ top: '33%', left: '49%' }} />
                <span className="v-map-pin" style={{ top: '31%', left: '52%' }} />
                <span className="v-map-pin" style={{ top: '36%', left: '48%' }} />
                <span className="v-map-pin" style={{ top: '30%', left: '54%' }} />
                <span className="v-map-pin" style={{ top: '50%', left: '54%' }} />
                <div className="v-map-note">8 stamped · 141 to go</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── F3: Trophy room ─────────────────────────────────────── */}
        <section className="wh-feature">
          <div className="wh-f-eyebrow">♛ Trophy room</div>
          <h2 className="wh-f-headline">Every milestone, sealed.</h2>
          <p className="wh-f-body">
            Play a Top 100. Cross your first ocean. Hit fifty rounds.
            Each milestone leaves a wax seal in your trophy room —
            common through legendary, displayed end to end.
          </p>
          <div className="wh-visual">
            <div className="v-trophy">
              <div className="v-trophy-grid">
                <div className="v-trophy-tile"><span className="seal seal-red seal-lg">⚐</span><span className="v-trophy-name">First<br/>Round</span></div>
                <div className="v-trophy-tile"><span className="seal seal-blue seal-lg">◈</span><span className="v-trophy-name">5<br/>Countries</span></div>
                <div className="v-trophy-tile"><span className="seal seal-gold seal-lg">✦</span><span className="v-trophy-name">Top<br/>100</span></div>
                <div className="v-trophy-tile"><span className="seal seal-purple seal-lg">♛</span><span className="v-trophy-name">Major<br/>Course</span></div>
                <div className="v-trophy-tile"><span className="seal seal-red seal-lg">⚐</span><span className="v-trophy-name">UK<br/>Tour</span></div>
                <div className="v-trophy-tile locked"><span className="seal seal-black seal-lg">★</span><span className="v-trophy-name">50<br/>Rounds</span></div>
                <div className="v-trophy-tile locked"><span className="seal seal-gold seal-lg">✦</span><span className="v-trophy-name">Globe<br/>trotter</span></div>
                <div className="v-trophy-tile locked"><span className="seal seal-purple seal-lg">♛</span><span className="v-trophy-name">Grand<br/>Slam</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── F4: Companions ──────────────────────────────────────── */}
        <section className="wh-feature warm">
          <div className="wh-f-eyebrow">∞ Companions</div>
          <h2 className="wh-f-headline">Bring the foursome.</h2>
          <p className="wh-f-body">
            Add your golf circle. See where they&apos;ve been. The buddies you
            already golf with, on the same passport-page as you.
          </p>
          <div className="wh-visual">
            <div className="v-comp">
              <div className="v-comp-row">
                <div className="v-comp-av a2">PB</div>
                <div className="v-comp-info"><div className="v-comp-name">Peter Bondo</div><div className="v-comp-meta">🇩🇰 · HCP 8 · 63 courses</div></div>
              </div>
              <div className="v-comp-row">
                <div className="v-comp-av a3">CH</div>
                <div className="v-comp-info"><div className="v-comp-name">Christian H.</div><div className="v-comp-meta">🇸🇪 · HCP 14 · 29 courses</div></div>
              </div>
              <div className="v-comp-row">
                <div className="v-comp-av a4">OM</div>
                <div className="v-comp-info"><div className="v-comp-name">Ole Mortensen</div><div className="v-comp-meta">🇩🇰 · HCP 18 · 22 courses</div></div>
              </div>
              <div className="v-comp-row">
                <div className="v-comp-av a5">SK</div>
                <div className="v-comp-info"><div className="v-comp-name">Sara Kjær</div><div className="v-comp-meta">🇩🇰 · HCP 21 · 11 courses</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── F5: Standings ───────────────────────────────────────── */}
        <section className="wh-feature paper">
          <div className="wh-f-eyebrow">≡ Standings</div>
          <h2 className="wh-f-headline">Friendly, competitive.</h2>
          <p className="wh-f-body">
            Who&apos;s stamped the most this season? Compare passport pages
            side-by-side. No score, no handicap drama — just the count
            of where you&apos;ve each been.
          </p>
          <div className="wh-visual">
            <div className="v-comp">
              <div className="v-comp-row">
                <div className="v-comp-rank gold">1</div>
                <div className="v-comp-av a2">PB</div>
                <div className="v-comp-info"><div className="v-comp-name">Peter Bondo</div><div className="v-comp-meta">🇩🇰 Helsingør · HCP 8</div></div>
                <div className="v-comp-stat">63<span>Courses</span></div>
              </div>
              <div className="v-comp-row">
                <div className="v-comp-rank">2</div>
                <div className="v-comp-av a1">TB</div>
                <div className="v-comp-info"><div className="v-comp-name">Thomas Bloch</div><div className="v-comp-meta">🇩🇰 Helsingør · You</div></div>
                <div className="v-comp-stat">47<span>Courses</span></div>
              </div>
              <div className="v-comp-row">
                <div className="v-comp-rank">3</div>
                <div className="v-comp-av a3">CH</div>
                <div className="v-comp-info"><div className="v-comp-name">Christian H.</div><div className="v-comp-meta">🇸🇪 Falsterbo · HCP 14</div></div>
                <div className="v-comp-stat">29<span>Courses</span></div>
              </div>
              <div className="v-comp-row">
                <div className="v-comp-rank">4</div>
                <div className="v-comp-av a4">OM</div>
                <div className="v-comp-info"><div className="v-comp-name">Ole Mortensen</div><div className="v-comp-meta">🇩🇰 Kokkedal · HCP 18</div></div>
                <div className="v-comp-stat">22<span>Courses</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── F6: Meet new golfers ─────────────────────────────────── */}
        <section className="wh-feature">
          <div className="wh-f-eyebrow">✚ Meet new golfers</div>
          <h2 className="wh-f-headline">Meet new golfers.</h2>
          <p className="wh-f-body">
            Found a course you want to play but you&apos;re not a member?
            Ask a friend who is — often at a discounted guest rate.
            Or send an open invite for any round, anywhere your circle
            has space. Booking still happens wherever you book today —
            we just connect the people.
          </p>
          <div className="wh-f-tag">Coming in v2.1</div>
          <div className="wh-visual">
            <div className="v-meet">
              <div className="v-meet-card member">
                <span className="v-meet-tag member">Member invite</span>
                <div className="v-meet-club">Falsterbo GK</div>
                <div className="v-meet-when">🇸🇪 Sweden · Top 100</div>
                <div className="v-meet-perk">★ Guest rate available</div>
                <div className="v-meet-people">
                  <div className="v-meet-avs">
                    <div className="v-comp-av a3">CH</div>
                  </div>
                  <div className="v-meet-spots">Christian plays here</div>
                </div>
                <button className="v-meet-btn" type="button">Ask Christian</button>
              </div>
              <div className="v-meet-card open">
                <span className="v-meet-tag open">Open invite</span>
                <div className="v-meet-club">Royal Copenhagen GK</div>
                <div className="v-meet-when">Sunday · 09:30</div>
                <div className="v-meet-people">
                  <div className="v-meet-avs">
                    <div className="v-comp-av a5">MK</div>
                  </div>
                  <div className="v-meet-spots">HCP &lt; 18 · 1 of 4</div>
                </div>
                <button className="v-meet-btn" type="button">Join round</button>
              </div>
            </div>
          </div>
        </section>

        {/* ── F7: Recruit your buddies ─────────────────────────────── */}
        <section className="wh-feature warm">
          <div className="wh-f-eyebrow">↗ Recruit</div>
          <h2 className="wh-f-headline">Recruit your buddies.</h2>
          <p className="wh-f-body">
            Half the fun is comparing. Send a link to the friend who
            keeps borrowing your scorecards — they&apos;ll get a blank
            passport, ready to stamp from their first round.
          </p>
          <div className="wh-visual">
            <div className="v-recruit">
              <div className="v-recruit-link">
                <span>mygolfpassport.golf/tb</span>
                <span className="copy">Copy</span>
              </div>
              <div className="v-recruit-share">
                <button type="button">WhatsApp</button>
                <button type="button">SMS</button>
                <button type="button">Mail</button>
              </div>
              <div className="v-recruit-aboard">
                <div><b>3</b> of your buddies aboard</div>
                <div className="v-recruit-avs">
                  <div className="v-comp-av a2">PB</div>
                  <div className="v-comp-av a3">CH</div>
                  <div className="v-comp-av a4">OM</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ───────────────────────────────────────────── */}
        <section className="wh-final" id="pricing">
          <div className="wh-final-eye">— Your first stamp is waiting —</div>
          <h2 className="wh-final-h">Begin <em>your journey</em>.</h2>
          <p className="wh-final-sub">
            Stamp your first course. Find out how many you&apos;ve played.
          </p>
          <div className="wh-final-urgency">
            ⚐ The first <b>500 passports</b> get lifetime premium · free, forever
          </div>
          <div className="wh-cta-row">
            <Link href="/signup" className="wh-btn wh-btn-gold">Get your passport →</Link>
            <Link href="/signin" className="wh-btn wh-btn-ghost">I already have one</Link>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer className="wh-foot">
          <div className="wh-foot-tagline">Made by golfers, for golfers.</div>
          <Link href="#">Privacy</Link>·<Link href="#">Terms</Link>·<Link href="#">Status</Link>
        </footer>

      </div>
    </>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────
// Scoped to .wh wrapper. Mobile-first; respects the app's 430px shell.
// CSS-variables come from src/app/globals.css.

const WELCOME_CSS = `
.wh {
  background: var(--color-mgp-cream);
  color: var(--color-mgp-ink);
  font-family: var(--font-mgp-body);
  line-height: 1.5;
  min-height: 100vh;
}
.wh a { color: inherit; }
.wh button { cursor: pointer; font-family: inherit; }

/* Top bar */
.wh-topbar {
  background: var(--color-mgp-cover);
  padding: 14px 18px;
  display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 50;
  border-bottom: 0.5px solid var(--color-mgp-gold);
}
.wh-brand { display: flex; align-items: center; gap: 10px; }
.wh-monogram {
  width: 28px; height: 28px; border-radius: 50%;
  border: 1.5px solid var(--color-mgp-gold);
  display: inline-flex; align-items: center; justify-content: center;
  color: var(--color-mgp-gold); font-family: var(--font-mgp-display); font-size: 15px;
}
.wh-brand-name {
  font-family: var(--font-mgp-display); font-size: 18px; font-weight: 500;
  color: var(--color-mgp-ink-inv); letter-spacing: 0.4px;
}
.wh-topnav { display: flex; gap: 12px; align-items: center; }
.wh-topnav a {
  color: rgba(244,236,216,0.7); text-decoration: none;
  font-family: var(--font-mgp-stamp); font-size: 10px;
  letter-spacing: 2px; text-transform: uppercase;
}
.wh-topnav .signin {
  color: var(--color-mgp-gold); border: 1px solid var(--color-mgp-gold);
  padding: 6px 14px; border-radius: 4px;
}
/* Hide Features/Pricing on tight viewports — only Sign in shown */
@media (max-width: 380px) {
  .wh-topnav a:not(.signin) { display: none; }
}

/* 500-lifetime promo sticky strip */
.wh-promo-strip {
  background: linear-gradient(180deg, var(--color-mgp-gold-light) 0%, var(--color-mgp-gold) 100%);
  color: var(--color-mgp-cover-ink);
  padding: 9px 18px; text-align: center;
  font-family: var(--font-mgp-stamp); font-size: 11px;
  letter-spacing: 1.5px; text-transform: uppercase; font-weight: 700;
  border-bottom: 1px solid var(--color-mgp-gold-dark);
  box-shadow: 0 1px 4px rgba(154,126,42,0.25);
  display: flex; align-items: center; justify-content: center; gap: 10px;
  position: sticky; top: 58px; z-index: 49;
}
.wh-promo-strip .pulse {
  display: inline-block; width: 7px; height: 7px; border-radius: 50%;
  background: var(--color-mgp-stamp-red);
  animation: wh-pulse 2s infinite;
  box-shadow: 0 0 0 0 rgba(168,74,44,0.6);
}
@keyframes wh-pulse {
  0% { box-shadow: 0 0 0 0 rgba(168,74,44,0.7); }
  70% { box-shadow: 0 0 0 8px rgba(168,74,44,0); }
  100% { box-shadow: 0 0 0 0 rgba(168,74,44,0); }
}
.wh-promo-strip b { color: var(--color-mgp-stamp-red); font-weight: 700; }
.wh-promo-strip .counter {
  font-family: var(--font-mgp-display); font-weight: 700; font-style: italic;
  text-transform: none; letter-spacing: 0; font-size: 14px;
  color: var(--color-mgp-cover);
}

/* Hero */
.wh-hero {
  position: relative; overflow: hidden;
  padding: 38px 22px 48px;
  background:
    radial-gradient(circle at 80% 10%, rgba(201,168,76,0.18) 0%, transparent 55%),
    radial-gradient(circle at 10% 90%, rgba(31,58,46,0.06) 0%, transparent 45%),
    var(--color-mgp-cream);
}
.wh-eyebrow {
  font-family: var(--font-mgp-stamp); font-size: 11px; letter-spacing: 3px;
  color: var(--color-mgp-stamp-red); text-transform: uppercase;
  display: inline-flex; align-items: center; gap: 10px; margin-bottom: 18px;
}
.wh-eyebrow::before, .wh-eyebrow::after {
  content: ''; width: 22px; height: 1px; background: var(--color-mgp-stamp-red); opacity: 0.6;
}
.wh-headline {
  font-family: var(--font-mgp-display); font-weight: 500;
  font-size: 38px; line-height: 1.05; letter-spacing: -0.6px;
  color: var(--color-mgp-ink); margin-bottom: 18px;
}
.wh-headline em { font-style: italic; color: var(--color-mgp-stamp-red); font-weight: 400; }
.wh-sub { font-size: 15px; color: var(--color-mgp-ink-2); line-height: 1.6; max-width: 420px; margin-bottom: 28px; }
.wh-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
.wh-btn {
  font-family: var(--font-mgp-stamp); font-size: 12px; letter-spacing: 2.5px;
  text-transform: uppercase; font-weight: 700;
  padding: 14px 22px; border-radius: 4px;
  text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
  border: none;
}
.wh-btn-gold {
  background: linear-gradient(180deg, var(--color-mgp-gold-light) 0%, var(--color-mgp-gold) 60%, var(--color-mgp-gold-dark) 100%);
  color: var(--color-mgp-cover-ink);
  box-shadow: 0 2px 6px rgba(154,126,42,0.35), inset 0 -1px 0 rgba(0,0,0,0.12);
}
.wh-btn-gold:hover { filter: brightness(1.06); }
.wh-btn-ghost { background: transparent; color: var(--color-mgp-cover); border: 1px solid var(--color-mgp-border-strong); }
.wh-btn-ghost:hover { background: var(--color-mgp-paper); }

.wh-trust {
  margin-top: 22px; font-family: var(--font-mgp-stamp); font-size: 10px;
  letter-spacing: 1.5px; color: var(--color-mgp-ink-3); text-transform: uppercase;
  display: flex; gap: 14px; flex-wrap: wrap;
}
.wh-trust span::before { content: '✓ '; color: var(--color-mgp-gold-dark); margin-right: 2px; }

/* Hero passport */
.wh-hero-art { margin-top: 36px; display: flex; justify-content: center; position: relative; }
.hero-passport {
  width: 280px; padding: 18px 16px 16px;
  background: var(--color-mgp-cream-warm);
  border: 1.5px solid var(--color-mgp-border-strong); border-radius: 14px;
  box-shadow: 0 14px 32px rgba(31,58,46,0.25), 0 2px 4px rgba(0,0,0,0.08);
  transform: rotate(-3deg); position: relative;
}
.hero-passport::before, .hero-passport::after {
  content: ''; position: absolute; left: 0; right: 0; height: 8px;
  background-image: radial-gradient(circle, var(--color-mgp-cream) 3px, transparent 3.5px);
  background-size: 14px 8px; background-position: 7px 50%; background-repeat: repeat-x;
}
.hero-passport::before { top: -4px; }
.hero-passport::after { bottom: -4px; }
.hero-pp-eyebrow { font-family: var(--font-mgp-stamp); font-size: 9px; letter-spacing: 2px; color: var(--color-mgp-ink-3); text-transform: uppercase; margin-bottom: 4px; }
.hero-pp-row { display: flex; gap: 12px; margin-bottom: 14px; }
.hero-pp-disc {
  width: 56px; height: 56px; border-radius: 50%; flex-shrink: 0;
  background: radial-gradient(circle at 35% 30%, var(--color-mgp-gold-light) 0%, var(--color-mgp-gold) 55%, var(--color-mgp-gold-dark) 100%);
  border: 2px solid var(--color-mgp-gold-dark);
  box-shadow: 0 1px 2px rgba(31,58,46,0.18), inset 0 -1px 2px rgba(31,58,46,0.15);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mgp-display); font-weight: 500; font-size: 22px;
  color: var(--color-mgp-cover-ink); letter-spacing: 0.5px;
}
.hero-pp-name { font-family: var(--font-mgp-display); font-size: 22px; font-weight: 500; color: var(--color-mgp-ink); line-height: 1.1; letter-spacing: -0.3px; }
.hero-pp-meta { margin-top: 6px; font-family: var(--font-mgp-stamp); font-size: 9px; letter-spacing: 1.5px; color: var(--color-mgp-ink-3); text-transform: uppercase; }
.hero-pp-meta b { color: var(--color-mgp-stamp-red); font-weight: 700; }
.hero-pp-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.hero-pp-stat { background: var(--color-mgp-paper); border: 1px solid var(--color-mgp-border-faint); border-radius: 5px; padding: 8px 4px; text-align: center; }
.hero-pp-stat-n { font-family: var(--font-mgp-display); font-size: 22px; font-weight: 500; color: var(--color-mgp-ink); line-height: 1; letter-spacing: -0.5px; }
.hero-pp-stat-l { font-family: var(--font-mgp-stamp); font-size: 8px; letter-spacing: 1.5px; color: var(--color-mgp-ink-3); margin-top: 4px; text-transform: uppercase; }
.hero-pp-seals { margin-top: 12px; display: flex; gap: 5px; }

/* Issued today stamp (double-ring) */
.hero-floater {
  position: absolute; font-family: var(--font-mgp-stamp);
  text-transform: uppercase; font-weight: 700; pointer-events: none;
}
.hero-floater.f-red {
  color: var(--color-mgp-stamp-red);
  background: rgba(244,236,216,0.45);
  border: 2.5px solid var(--color-mgp-stamp-red);
  outline: 1px solid var(--color-mgp-stamp-red);
  outline-offset: -5px;
  padding: 12px 18px 11px;
  font-size: 13px; letter-spacing: 2.8px;
  top: -22px; right: 6px;
  transform: rotate(-10deg);
  opacity: 0.92;
  text-shadow: 0.3px 0 0 var(--color-mgp-stamp-red);
}

/* Mini wax-seal */
.seal {
  width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 11px; line-height: 1; border: 1.5px solid;
  box-shadow: inset 0 -1px 2px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12);
}
.seal-red { background: radial-gradient(circle at 35% 30%, #c66a4c 0%, var(--color-mgp-stamp-red) 55%, #6b2d18 100%); border-color: #6b2d18; color: var(--color-mgp-cream); }
.seal-blue { background: radial-gradient(circle at 35% 30%, #5e7385 0%, var(--color-mgp-stamp-blue) 55%, #1f2d3a 100%); border-color: #1f2d3a; color: var(--color-mgp-cream); }
.seal-gold { background: radial-gradient(circle at 35% 30%, var(--color-mgp-gold-light) 0%, var(--color-mgp-gold) 55%, var(--color-mgp-gold-dark) 100%); border-color: var(--color-mgp-gold-dark); color: var(--color-mgp-cover-ink); }
.seal-purple { background: radial-gradient(circle at 35% 30%, #7e5a7a 0%, var(--color-mgp-stamp-purple) 55%, #3a1f37 100%); border-color: #3a1f37; color: var(--color-mgp-cream); }
.seal-black { background: radial-gradient(circle at 35% 30%, #4a4338 0%, var(--color-mgp-stamp-black) 55%, #0a0805 100%); border-color: #0a0805; color: var(--color-mgp-cream); }
.seal-lg { width: 36px; height: 36px; font-size: 16px; }

/* Marquee */
.wh-marquee {
  background: var(--color-mgp-cover); color: var(--color-mgp-cream);
  padding: 14px 12px; font-family: var(--font-mgp-stamp); font-size: 9px;
  letter-spacing: 2px; text-transform: uppercase;
  border-top: 0.5px solid var(--color-mgp-gold); border-bottom: 0.5px solid var(--color-mgp-gold);
  display: flex; gap: 10px; overflow: hidden; white-space: nowrap; justify-content: space-around;
  flex-wrap: wrap;
}
.wh-marquee span { display: inline-flex; align-items: center; gap: 6px; opacity: 0.85; }
.wh-marquee em { color: var(--color-mgp-gold); font-style: normal; }

/* Feature sections */
.wh-feature { padding: 56px 22px; border-top: 0.5px solid var(--color-mgp-border-faint); }
.wh-feature.warm { background: var(--color-mgp-cream-warm); }
.wh-feature.paper { background: var(--color-mgp-paper); }
.wh-f-eyebrow { font-family: var(--font-mgp-stamp); font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--color-mgp-stamp-red); margin-bottom: 12px; display: inline-block; opacity: 0.9; }
.wh-f-headline { font-family: var(--font-mgp-display); font-weight: 500; font-size: 30px; line-height: 1.1; letter-spacing: -0.4px; color: var(--color-mgp-ink); margin-bottom: 14px; }
.wh-f-body { font-size: 15px; color: var(--color-mgp-ink-2); line-height: 1.65; max-width: 460px; }
.wh-f-tag {
  margin-top: 14px; display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-mgp-stamp); font-size: 9px; letter-spacing: 2px;
  color: var(--color-mgp-gold-dark); text-transform: uppercase;
  background: var(--color-mgp-gold-faint); padding: 4px 10px; border-radius: 4px;
  border: 0.5px solid var(--color-mgp-gold);
}
.wh-visual { margin-top: 26px; }

/* F1 stamp grid */
.v-spread {
  background: var(--color-mgp-cream-warm); border: 1.5px solid var(--color-mgp-border-strong);
  border-radius: 12px; padding: 18px; position: relative;
  box-shadow: 0 8px 24px rgba(31,58,46,0.12);
}
.v-spread::before { content: ''; position: absolute; top: 10px; bottom: 10px; left: 50%; width: 1px; background: var(--color-mgp-border); opacity: 0.6; }
.v-spread-row { font-family: var(--font-mgp-stamp); font-size: 9px; letter-spacing: 2px; color: var(--color-mgp-ink-3); text-transform: uppercase; margin-bottom: 12px; display: flex; justify-content: space-between; }
.v-stamp-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.v-stamp {
  aspect-ratio: 1; border-radius: 50%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  position: relative; background: rgba(244,236,216,0.55);
  border: 1.5px solid var(--color-mgp-stamp-red); color: var(--color-mgp-stamp-red);
  transform: rotate(-4deg);
}
.v-stamp::after { content: ''; position: absolute; top: 3px; left: 3px; right: 3px; bottom: 3px; border: 1px solid var(--color-mgp-stamp-red); border-radius: 50%; opacity: 0.4; }
.v-stamp.blue { border-color: var(--color-mgp-stamp-blue); color: var(--color-mgp-stamp-blue); transform: rotate(6deg); }
.v-stamp.blue::after { border-color: var(--color-mgp-stamp-blue); }
.v-stamp.gold { border-color: var(--color-mgp-gold-dark); color: var(--color-mgp-gold-dark); transform: rotate(-2deg); background: var(--color-mgp-gold-faint); }
.v-stamp.gold::after { border-color: var(--color-mgp-gold-dark); border-style: dashed; }
.v-stamp.purple { border-color: var(--color-mgp-stamp-purple); color: var(--color-mgp-stamp-purple); transform: rotate(8deg); }
.v-stamp.purple::after { border-color: var(--color-mgp-stamp-purple); }
.v-stamp.dream { border-style: dashed; opacity: 0.5; transform: rotate(2deg); border-color: var(--color-mgp-ink-3); color: var(--color-mgp-ink-3); }
.v-stamp.dream::after { display: none; }
.v-stamp.locked { border-style: dotted; opacity: 0.3; background: rgba(107,96,72,0.06); }
.v-stamp.locked::after { display: none; }
.v-stamp svg { width: 60%; height: 60%; }
.v-stamp-cc { font-size: 8px; font-weight: 700; letter-spacing: 1px; font-family: var(--font-mgp-stamp); margin-top: -2px; }

/* F2 map */
.v-map { background: var(--color-mgp-paper); border: 1.5px solid var(--color-mgp-border-strong); border-radius: 12px; padding: 18px; }
.v-map-eyebrow { font-family: var(--font-mgp-stamp); font-size: 9px; letter-spacing: 2px; color: var(--color-mgp-ink-3); text-transform: uppercase; margin-bottom: 8px; display: flex; justify-content: space-between; }
.v-map-eyebrow b { color: var(--color-mgp-stamp-red); }
.v-map-canvas {
  background: linear-gradient(135deg, #e0d5b0 0%, #d4c79f 100%);
  border-radius: 6px; height: 220px; position: relative; overflow: hidden;
  border: 0.5px solid var(--color-mgp-border);
}
.v-map-canvas svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.v-map-pin {
  position: absolute; width: 10px; height: 10px; border-radius: 50%;
  background: var(--color-mgp-stamp-red); border: 1.5px solid var(--color-mgp-cream);
  box-shadow: 0 0 0 1px var(--color-mgp-stamp-red), 0 2px 4px rgba(168,74,44,0.4);
  z-index: 2;
}
.v-map-pin.gold { background: var(--color-mgp-gold); box-shadow: 0 0 0 1px var(--color-mgp-gold-dark), 0 2px 4px rgba(201,168,76,0.4); }
.v-map-note {
  position: absolute; bottom: 8px; left: 8px;
  font-family: var(--font-mgp-stamp); font-size: 8px; letter-spacing: 1.5px;
  color: var(--color-mgp-ink-3); text-transform: uppercase;
  background: rgba(253,249,237,0.9); padding: 3px 7px; border-radius: 3px;
}

/* F3 trophy grid */
.v-trophy { background: var(--color-mgp-cream-warm); border: 1.5px solid var(--color-mgp-border-strong); border-radius: 12px; padding: 18px; }
.v-trophy-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.v-trophy-tile {
  aspect-ratio: 1; border: 0.5px solid var(--color-mgp-border); border-radius: 8px;
  background: var(--color-mgp-paper); display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 6px; padding: 6px;
}
.v-trophy-name { font-family: var(--font-mgp-stamp); font-size: 7px; letter-spacing: 1px; color: var(--color-mgp-ink-3); text-transform: uppercase; text-align: center; line-height: 1.2; }
.v-trophy-tile.locked { opacity: 0.35; }

/* F4 + F5 friend/standings list */
.v-comp { background: var(--color-mgp-paper); border: 1.5px solid var(--color-mgp-border-strong); border-radius: 12px; padding: 16px; }
.v-comp-row { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 0.5px solid var(--color-mgp-border-faint); }
.v-comp-row:last-child { border-bottom: none; }
.v-comp-av {
  width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mgp-display); font-weight: 500; font-size: 14px;
  border: 1.5px solid var(--color-mgp-cover);
}
.v-comp-av.a1 { background: var(--color-mgp-gold); color: var(--color-mgp-cover); }
.v-comp-av.a2 { background: var(--color-mgp-cover); color: var(--color-mgp-cream); border-color: var(--color-mgp-gold); }
.v-comp-av.a3 { background: var(--color-mgp-stamp-red); color: var(--color-mgp-cream); }
.v-comp-av.a4 { background: var(--color-mgp-stamp-blue); color: var(--color-mgp-cream); border-color: var(--color-mgp-gold); }
.v-comp-av.a5 { background: var(--color-mgp-stamp-purple); color: var(--color-mgp-cream); }
.v-comp-info { flex: 1; min-width: 0; }
.v-comp-name { font-family: var(--font-mgp-display); font-weight: 500; font-size: 14px; color: var(--color-mgp-ink); }
.v-comp-meta { font-family: var(--font-mgp-stamp); font-size: 8px; letter-spacing: 1.5px; color: var(--color-mgp-ink-3); text-transform: uppercase; margin-top: 2px; }
.v-comp-stat { font-family: var(--font-mgp-display); font-size: 18px; font-weight: 500; color: var(--color-mgp-ink); text-align: right; min-width: 42px; }
.v-comp-stat span { font-family: var(--font-mgp-stamp); font-size: 8px; letter-spacing: 1.5px; color: var(--color-mgp-ink-3); display: block; }
.v-comp-rank { font-family: var(--font-mgp-display); font-size: 16px; font-weight: 600; color: var(--color-mgp-ink-3); width: 18px; text-align: center; flex-shrink: 0; }
.v-comp-rank.gold { color: var(--color-mgp-gold-dark); }

/* F6 meet new golfers cards */
.v-meet { display: flex; flex-direction: column; gap: 12px; }
.v-meet-card {
  background: var(--color-mgp-paper); border: 1.5px solid var(--color-mgp-border-strong);
  border-radius: 10px; padding: 14px; position: relative; overflow: hidden;
}
.v-meet-card.open {
  background: linear-gradient(180deg, var(--color-mgp-cream-warm) 0%, var(--color-mgp-paper) 100%);
  border-color: var(--color-mgp-gold);
}
.v-meet-card.member {
  background: linear-gradient(180deg, rgba(168,74,44,0.06) 0%, var(--color-mgp-paper) 100%);
  border-color: var(--color-mgp-stamp-red);
}
.v-meet-tag {
  font-family: var(--font-mgp-stamp); font-size: 8px; letter-spacing: 2px;
  text-transform: uppercase; padding: 3px 7px; border-radius: 3px;
  display: inline-block; margin-bottom: 10px;
}
.v-meet-tag.friends { background: var(--color-mgp-cream-cool); color: var(--color-mgp-ink-2); border: 0.5px solid var(--color-mgp-border); }
.v-meet-tag.open { background: var(--color-mgp-gold-faint); color: var(--color-mgp-gold-dark); border: 0.5px solid var(--color-mgp-gold); }
.v-meet-tag.member { background: rgba(168,74,44,0.12); color: var(--color-mgp-stamp-red); border: 0.5px solid var(--color-mgp-stamp-red); }
.v-meet-club {
  font-family: var(--font-mgp-display); font-size: 16px; font-weight: 500;
  color: var(--color-mgp-ink); line-height: 1.1; letter-spacing: -0.2px; margin-bottom: 4px;
}
.v-meet-when { font-family: var(--font-mgp-stamp); font-size: 9px; letter-spacing: 1.5px; color: var(--color-mgp-ink-3); text-transform: uppercase; margin-bottom: 12px; }
.v-meet-perk { font-family: var(--font-mgp-stamp); font-size: 8px; letter-spacing: 1.5px; color: var(--color-mgp-stamp-red); text-transform: uppercase; margin-top: -4px; margin-bottom: 12px; opacity: 0.85; }
.v-meet-people { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.v-meet-avs { display: flex; margin-right: 4px; }
.v-meet-avs .v-comp-av { width: 26px; height: 26px; font-size: 10px; margin-left: -8px; border-width: 1.5px; }
.v-meet-avs .v-comp-av:first-child { margin-left: 0; }
.v-meet-spots { font-family: var(--font-mgp-stamp); font-size: 9px; letter-spacing: 1px; color: var(--color-mgp-ink-2); }
.v-meet-btn {
  width: 100%; background: var(--color-mgp-cover); color: var(--color-mgp-cream);
  font-family: var(--font-mgp-stamp); font-size: 9px; letter-spacing: 1.5px;
  text-transform: uppercase; font-weight: 700;
  padding: 9px 10px; border-radius: 4px;
  border: 1px solid var(--color-mgp-gold);
}
.v-meet-btn::before { content: '✚ '; color: var(--color-mgp-gold); margin-right: 3px; }

/* F7 recruit */
.v-recruit { background: var(--color-mgp-cream-warm); border: 1.5px solid var(--color-mgp-border-strong); border-radius: 12px; padding: 18px; }
.v-recruit-link {
  background: var(--color-mgp-paper); border: 0.5px solid var(--color-mgp-border);
  border-radius: 8px; padding: 14px;
  font-family: var(--font-mgp-stamp); font-size: 14px; color: var(--color-mgp-stamp-red);
  letter-spacing: 0.5px; display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 14px;
}
.v-recruit-link .copy { font-size: 9px; color: var(--color-mgp-ink-3); letter-spacing: 1.5px; text-transform: uppercase; }
.v-recruit-share { display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; }
.v-recruit-share button {
  flex: 1; min-width: 0; padding: 10px 8px;
  background: var(--color-mgp-cover); color: var(--color-mgp-cream);
  font-family: var(--font-mgp-stamp); font-size: 9px; letter-spacing: 1.5px;
  text-transform: uppercase; font-weight: 700;
  border: 1px solid var(--color-mgp-gold); border-radius: 4px;
}
.v-recruit-aboard {
  padding-top: 12px; border-top: 0.5px dashed var(--color-mgp-border);
  text-align: center; font-family: var(--font-mgp-stamp); font-size: 9px;
  letter-spacing: 1.5px; color: var(--color-mgp-ink-2); text-transform: uppercase;
}
.v-recruit-aboard b { color: var(--color-mgp-gold-dark); font-weight: 700; font-size: 12px; }
.v-recruit-avs { display: flex; justify-content: center; gap: 0; margin-top: 8px; }
.v-recruit-avs .v-comp-av { width: 30px; height: 30px; font-size: 11px; margin-left: -10px; border-width: 1.5px; }
.v-recruit-avs .v-comp-av:first-child { margin-left: 0; }

/* Final CTA */
.wh-final {
  background: radial-gradient(circle at 30% 20%, rgba(201,168,76,0.16) 0%, transparent 60%), var(--color-mgp-cover);
  color: var(--color-mgp-cream); padding: 64px 22px; text-align: center;
  border-top: 0.5px solid var(--color-mgp-gold);
}
.wh-final-eye { font-family: var(--font-mgp-stamp); font-size: 11px; letter-spacing: 3px; color: var(--color-mgp-gold); text-transform: uppercase; margin-bottom: 18px; }
.wh-final-h { font-family: var(--font-mgp-display); font-weight: 500; font-size: 38px; line-height: 1.1; letter-spacing: -0.4px; margin-bottom: 16px; color: var(--color-mgp-ink-inv); }
.wh-final-h em { font-style: italic; color: var(--color-mgp-gold); font-weight: 400; }
.wh-final-sub { font-size: 15px; color: rgba(244,236,216,0.75); line-height: 1.6; max-width: 480px; margin: 0 auto 18px; }
.wh-final-urgency {
  display: inline-block; margin: 0 auto 28px;
  font-family: var(--font-mgp-stamp); font-size: 10px; letter-spacing: 2px;
  color: var(--color-mgp-gold); text-transform: uppercase;
  background: rgba(201,168,76,0.15); padding: 8px 14px;
  border: 0.5px dashed var(--color-mgp-gold); border-radius: 4px;
}
.wh-final-urgency b { color: var(--color-mgp-cream); font-weight: 700; }
.wh-final .wh-cta-row { justify-content: center; }
.wh-final .wh-btn-ghost { color: var(--color-mgp-cream); border-color: rgba(244,236,216,0.4); }
.wh-final .wh-btn-ghost:hover { background: rgba(244,236,216,0.08); }

/* Footer */
.wh-foot {
  background: var(--color-mgp-cover-dark); color: rgba(244,236,216,0.55);
  padding: 32px 22px;
  font-family: var(--font-mgp-stamp); font-size: 10px; letter-spacing: 2px;
  text-transform: uppercase; text-align: center;
}
.wh-foot a { color: var(--color-mgp-gold); text-decoration: none; margin: 0 6px; }
.wh-foot a:hover { opacity: 0.8; }
.wh-foot-tagline { margin-bottom: 16px; font-family: var(--font-mgp-display); font-style: italic; font-size: 13px; text-transform: none; letter-spacing: 0; color: rgba(244,236,216,0.65); }
`
