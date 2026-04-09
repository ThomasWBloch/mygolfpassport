'use client'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

type Course = {
  n: string
  c: string
  f: string
  club?: string
  top100?: boolean
  major?: boolean
}

const COURSES: Course[] = [
  { n: 'Barløseborg Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Blokhus Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Blåvandshuk Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Bogense – HC Andersen', c: 'Danmark', f: '🇩🇰' },
  { n: 'Dragsholm Golf Club', c: 'Danmark', f: '🇩🇰' },
  { n: 'Elisefarm Golfklubb', c: 'Danmark', f: '🇩🇰' },
  { n: 'Esbjerg – Marbæk', c: 'Danmark', f: '🇩🇰' },
  { n: 'Falster Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Faaborg Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Fredericia Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Gilleleje Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Helsingør Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Himmelbjerg Golf Club', c: 'Danmark', f: '🇩🇰' },
  { n: 'Himmerland Old', c: 'Danmark', f: '🇩🇰', club: 'Himmerland Golfklub' },
  { n: 'Himmerland New', c: 'Danmark', f: '🇩🇰', club: 'Himmerland Golfklub' },
  { n: 'Holstebro Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Køge Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Odense Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Roskilde Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Rungsted Golf Klub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Silkeborg Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Sorø Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Vejle Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Aalborg Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Aarhus Golfklub', c: 'Danmark', f: '🇩🇰' },
  { n: 'Falsterbo', c: 'Sverige', f: '🇸🇪' },
  { n: 'Vasatorp – TC', c: 'Sverige', f: '🇸🇪' },
  { n: 'Rya Golf Club', c: 'Sverige', f: '🇸🇪' },
  { n: 'Göteborg Golfklub', c: 'Sverige', f: '🇸🇪' },
  { n: 'Ljunghusen', c: 'Sverige', f: '🇸🇪' },
  { n: 'Barsebäck Golf & Country Club', c: 'Sverige', f: '🇸🇪' },
  { n: 'Castle Course, St. Andrews', c: 'Skotland', f: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', top100: true, major: true, club: 'The Royal and Ancient Golf Club' },
  { n: 'Prestwick', c: 'Skotland', f: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', top100: true, major: true, club: 'Prestwick Golf Club' },
  { n: 'Western Gailes', c: 'Skotland', f: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { n: 'Portmarnock Links', c: 'Irland', f: '🇮🇪', top100: true, club: 'Portmarnock Golf Club' },
  { n: 'Kenmare', c: 'Irland', f: '🇮🇪' },
  { n: 'Royal Porthcawl', c: 'Wales', f: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', top100: true },
  { n: 'Langland Bay', c: 'Wales', f: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
  { n: 'Mandelieu', c: 'Frankrig', f: '🇫🇷', club: 'Golf Club Cannes Mandelieu' },
  { n: 'Valescure', c: 'Frankrig', f: '🇫🇷' },
  { n: 'Winston Links', c: 'Tyskland', f: '🇩🇪' },
]

const STAR_LABELS = ['', 'Ikke imponeret 😕', 'Okay 🙂', 'God 👍', 'Rigtig god 🌟', 'Fantastisk! 🏆']

type ConfettiPiece = {
  id: number
  x: number
  color: string
  delay: number
  duration: number
  size: number
}

const CONFETTI_COLORS = ['#1a5c38', '#c9a84c', '#2a7a4f', '#f5d070', '#4ade80', '#fbbf24', '#e8f5ee', '#0f3d24']

function generateConfetti(): ConfettiPiece[] {
  return Array.from({ length: 70 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 2.5,
    duration: 2.5 + Math.random() * 2,
    size: 6 + Math.random() * 8,
  }))
}

type Step = 'search' | 'detail' | 'success'

export default function LogPage() {
  const [step, setStep] = useState<Step>('search')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Course | null>(null)
  const [rating, setRating] = useState(0)
  const [note, setNote] = useState('')
  const [playedAt, setPlayedAt] = useState(() => new Date().toISOString().split('T')[0])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [isFirstRound, setIsFirstRound] = useState(false)
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const filtered = query.length < 1
    ? COURSES.slice(0, 12)
    : COURSES.filter(c =>
        c.n.toLowerCase().includes(query.toLowerCase()) ||
        c.c.toLowerCase().includes(query.toLowerCase()) ||
        (c.club ?? '').toLowerCase().includes(query.toLowerCase())
      )

  function selectCourse(course: Course) {
    setSelected(course)
    setRating(0)
    setNote('')
    setStep('detail')
  }

  async function save() {
    if (!selected || rating === 0) return
    setSaving(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('Ikke logget ind. Prøv at genindlæse siden.')
      setSaving(false)
      return
    }

    const { count } = await supabase
      .from('rounds')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    const { error: insertError } = await supabase.from('rounds').insert({
      user_id: user.id,
      course_name: selected.n,
      country: selected.c,
      rating,
      note: note.trim() || null,
      played_at: playedAt,
    })

    if (insertError) {
      setError('Noget gik galt. Prøv igen.')
      setSaving(false)
      return
    }

    setIsFirstRound(count === 0)
    setConfetti(generateConfetti())
    setStep('success')
    setSaving(false)
  }

  const s = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }

  /* ── SEARCH STEP ── */
  if (step === 'search') return (
    <div style={{ minHeight: '100vh', background: '#f2f4f0', display: 'flex', flexDirection: 'column', ...s }}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .course-row {
          animation: fadeSlideIn 0.15s ease both;
        }
        .course-row:active { background: #e8f5ee !important; }
      `}</style>

      {/* Top bar */}
      <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <Link href="/" style={{ color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
          ← Tilbage
        </Link>
        <div style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 17, fontWeight: 700 }}>Log en bane</div>
        <div style={{ width: 70 }} />
      </div>

      {/* Search field */}
      <div style={{ padding: '14px 14px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1.5px solid #1a5c38', borderRadius: 12, padding: '10px 14px' }}>
          <span style={{ fontSize: 18, color: '#1a5c38' }}>🔍</span>
          <input
            type="text"
            placeholder="Søg bane eller klub..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, color: '#1a1a1a', background: 'transparent' }}
          />
          {query.length > 0 && (
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: 18, lineHeight: 1 }}>×</button>
          )}
        </div>
      </div>

      {/* Section label */}
      <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.6px', padding: '0 18px', margin: '18px 0 10px' }}>
        {query.length > 0 ? `${filtered.length} resultater` : 'Alle baner'}
      </div>

      {/* Course list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 30, textAlign: 'center', color: '#6b7280' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
            <div style={{ fontSize: 14 }}>Ingen baner fundet</div>
          </div>
        ) : filtered.map((course, i) => (
          <button
            key={course.n}
            className="course-row"
            onClick={() => selectCourse(course)}
            style={{
              animationDelay: `${i * 0.03}s`,
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
                {course.n}
                {course.major && (
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 6, background: '#f5e9c8', color: '#7a5a00', border: '1px solid #c9a84c' }}>Major</span>
                )}
                {course.top100 && (
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 6, background: '#1a5c38', color: '#fff' }}>Top 100</span>
                )}
              </div>
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                {course.club ? `${course.club} · ` : ''}{course.c}
              </div>
            </div>
            <span style={{ fontSize: 22, flexShrink: 0 }}>{course.f}</span>
          </button>
        ))}
      </div>
    </div>
  )

  /* ── DETAIL STEP ── */
  if (step === 'detail' && selected) return (
    <div style={{ minHeight: '100vh', background: '#f2f4f0', display: 'flex', flexDirection: 'column', ...s }}>
      {/* Top bar */}
      <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button onClick={() => setStep('search')} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', padding: 0 }}>
          ← Søg igen
        </button>
        <div style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 17, fontWeight: 700 }}>Log bane</div>
        <div style={{ width: 70 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Course header card */}
        <div style={{ background: 'linear-gradient(135deg, #1a5c38, #0f3d24)', borderRadius: 14, padding: 18 }}>
          <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{selected.n}</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 }}>
            {selected.club ? `Del af ${selected.club} · ` : ''}{selected.c} {selected.f}
          </div>
          {(selected.major || selected.top100) && (
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              {selected.major && <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8, background: '#c9a84c', color: '#7a5a00' }}>Major</span>}
              {selected.top100 && <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8, background: '#fff', color: '#1a5c38' }}>Top 100</span>}
            </div>
          )}
        </div>

        {/* Rating */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Din rating</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3, 4, 5].map(v => (
              <button
                key={v}
                onClick={() => setRating(v)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  fontSize: 36,
                  color: v <= rating ? '#c9a84c' : '#e5e7eb',
                  transition: 'color 0.1s, transform 0.1s',
                  transform: v <= rating ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                ★
              </button>
            ))}
          </div>
          {rating > 0 && (
            <div style={{ marginTop: 8, fontSize: 13, color: '#c9a84c', fontWeight: 600 }}>
              {STAR_LABELS[rating]}
            </div>
          )}
        </div>

        {/* Date */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Dato spillet</div>
          <input
            type="date"
            value={playedAt}
            onChange={e => setPlayedAt(e.target.value)}
            style={{
              width: '100%', border: '1px solid #e5e7eb', borderRadius: 10,
              padding: '10px 12px', fontSize: 14, color: '#1a1a1a',
              outline: 'none', fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Note */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Din note (valgfri)</div>
          <textarea
            placeholder="Hvad syntes du? Tips til andre? 🏌️"
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={3}
            style={{
              width: '100%', border: '1px solid #e5e7eb', borderRadius: 10,
              padding: '10px 12px', fontSize: 14, color: '#1a1a1a',
              resize: 'none', fontFamily: 'inherit', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#dc2626' }}>
            {error}
          </div>
        )}

        {/* Save button */}
        <button
          onClick={save}
          disabled={rating === 0 || saving}
          style={{
            background: rating === 0 ? '#9ca3af' : '#1a5c38',
            color: '#fff',
            border: 'none',
            borderRadius: 14,
            padding: 16,
            fontSize: 16,
            fontWeight: 700,
            cursor: rating === 0 || saving ? 'not-allowed' : 'pointer',
            width: '100%',
            transition: 'background 0.2s',
          }}
        >
          {saving ? 'Gemmer...' : '⛳ Tilføj til mit pas'}
        </button>
        {rating === 0 && (
          <div style={{ textAlign: 'center', fontSize: 12, color: '#6b7280', marginTop: -8 }}>
            Vælg en rating for at fortsætte
          </div>
        )}
      </div>
    </div>
  )

  /* ── SUCCESS STEP ── */
  return (
    <div style={{ minHeight: '100vh', background: '#f2f4f0', display: 'flex', flexDirection: 'column', ...s, position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg);   opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(110vh) rotate(540deg); opacity: 0; }
        }
        @keyframes popIn {
          0%   { transform: scale(0.7); opacity: 0; }
          70%  { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        .success-content { animation: popIn 0.4s cubic-bezier(.34,1.56,.64,1) both; }
      `}</style>

      {/* Confetti */}
      {confetti.map(p => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: `${p.x}%`,
            top: -10,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Top bar */}
      <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span style={{ fontSize: 22 }}>⛳</span>
        <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>My Golf Passport</span>
      </div>

      {/* Success content */}
      <div className="success-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', gap: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 72 }}>🎉</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: '#1a5c38' }}>Bane logget!</div>
        <div style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.5 }}>
          <strong style={{ color: '#1a1a1a' }}>{selected?.n}</strong> er nu en del af dit golfpas.
        </div>

        {isFirstRound && (
          <div style={{
            background: '#f5e9c8', border: '1px solid #c9a84c',
            borderRadius: 14, padding: '16px 20px',
            textAlign: 'center', width: '100%', maxWidth: 320,
          }}>
            <div style={{ fontSize: 36 }}>⭐</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#7a5a00', marginTop: 8 }}>Første badge optjent!</div>
            <div style={{ fontSize: 13, color: '#8a6a10', marginTop: 4 }}>"Første bane" — Du er godt i gang!</div>
          </div>
        )}

        {!isFirstRound && (
          <div style={{
            background: '#e8f5ee', border: '1px solid #c8e6d4',
            borderRadius: 14, padding: '14px 20px',
            textAlign: 'center', width: '100%', maxWidth: 320,
          }}>
            <div style={{ fontSize: 28 }}>📍</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1a5c38', marginTop: 6 }}>Godt gået!</div>
            <div style={{ fontSize: 13, color: '#2a7a4f', marginTop: 3 }}>Bliv ved med at samle baner til dit pas</div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 320, marginTop: 8 }}>
          <button
            onClick={() => { setStep('search'); setQuery(''); setSelected(null) }}
            style={{
              background: '#1a5c38', color: '#fff', border: 'none',
              borderRadius: 14, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}
          >
            ⛳ Log en ny bane
          </button>
          <Link
            href="/"
            style={{
              background: '#e8f5ee', color: '#1a5c38', border: 'none',
              borderRadius: 14, padding: 14, fontSize: 15, fontWeight: 600, cursor: 'pointer',
              display: 'block', textDecoration: 'none',
            }}
          >
            Tilbage til forsiden
          </Link>
        </div>
      </div>
    </div>
  )
}
