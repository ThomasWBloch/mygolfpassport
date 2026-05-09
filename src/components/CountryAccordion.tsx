'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CountryGroup } from '@/app/map/page'

export default function CountryAccordion({ countries }: { countries: CountryGroup[] }) {
  const [open, setOpen] = useState<string | null>(null)
  const sorted = [...countries].sort((a, b) => b.count - a.count)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {sorted.map((c) => {
        const isOpen = open === c.country
        return (
          <div
            key={c.country}
            style={{
              background: 'var(--color-mgp-paper)',
              borderRadius: 8,
              border: '1px solid var(--color-mgp-border-faint)',
              overflow: 'hidden',
            }}
          >
            {/* Row header — same shell as ProfileAccordions Accordion */}
            <button
              onClick={() => setOpen(isOpen ? null : c.country)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                fontFamily: 'inherit',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{c.flag}</span>
                <span style={{
                  fontFamily: 'var(--font-mgp-display)',
                  fontSize: 17,
                  fontWeight: 500,
                  color: 'var(--color-mgp-ink)',
                  letterSpacing: -0.2,
                }}>
                  {c.country}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 10,
                  letterSpacing: 1.5,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-mgp-ink-2)',
                  background: 'var(--color-mgp-cream-warm)',
                  border: '1px solid var(--color-mgp-border-faint)',
                  borderRadius: 4,
                  padding: '2px 8px',
                }}>
                  {c.count} {c.count === 1 ? 'course' : 'courses'}
                </span>
                <span style={{
                  fontSize: 11,
                  color: 'var(--color-mgp-ink-3)',
                  display: 'inline-block',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}>
                  ▾
                </span>
              </div>
            </button>

            {/* Expanded course list */}
            {isOpen && (
              <div style={{
                background: 'var(--color-mgp-cream-warm)',
                borderTop: '1px solid var(--color-mgp-border-faint)',
                padding: '10px 16px 12px',
              }}>
                {c.courses.map((course, i) => {
                  const full = course.rating ?? 0
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      gap: 10,
                      padding: '8px 0',
                      borderBottom: i < c.courses.length - 1 ? '1px solid var(--color-mgp-border-faint)' : 'none',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                        <span aria-hidden style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: 'var(--color-mgp-gold)',
                          flexShrink: 0,
                        }} />
                        <Link
                          href={`/courses/${course.id}`}
                          style={{
                            fontFamily: 'var(--font-mgp-body)',
                            fontSize: 14,
                            fontWeight: 500,
                            color: 'var(--color-mgp-ink)',
                            textDecoration: 'none',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}
                          onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
                          onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
                        >
                          {course.name}
                        </Link>
                      </div>
                      {course.rating != null && (
                        <span style={{ fontSize: 12, letterSpacing: 2, flexShrink: 0 }}>
                          <span style={{ color: 'var(--color-mgp-gold-dark)' }}>{'★'.repeat(full)}</span>
                          <span style={{ color: 'var(--color-mgp-border-faint)' }}>{'★'.repeat(5 - full)}</span>
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
