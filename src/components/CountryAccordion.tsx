'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CountryGroup } from '@/app/map/page'

const STAR_LABELS = ['', '★', '★★', '★★★', '★★★★', '★★★★★']

export default function CountryAccordion({ countries }: { countries: CountryGroup[] }) {
  const [open, setOpen] = useState<string | null>(null)
  const sorted = [...countries].sort((a, b) => b.count - a.count)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {sorted.map((c) => {
        const isOpen = open === c.country
        return (
          <div key={c.country} style={{ borderRadius: 12, overflow: 'hidden', border: isOpen ? '1px solid #a7d5b8' : '1px solid #e5e7eb' }}>
            {/* Row header */}
            <button
              onClick={() => setOpen(isOpen ? null : c.country)}
              style={{
                width: '100%', background: isOpen ? '#e8f5ee' : '#fff',
                border: 'none', cursor: 'pointer',
                padding: '12px 14px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'background 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{c.flag}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{c.country}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  background: isOpen ? '#1a5c38' : '#e8f5ee',
                  color: isOpen ? '#fff' : '#1a5c38',
                  fontSize: 12, fontWeight: 700, borderRadius: 8,
                  padding: '4px 10px',
                  transition: 'background 0.15s, color 0.15s',
                }}>
                  {c.count} {c.count === 1 ? 'bane' : 'baner'}
                </span>
                <span style={{
                  fontSize: 12, color: '#6b7280',
                  display: 'inline-block',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}>
                  ▼
                </span>
              </div>
            </button>

            {/* Expanded course list */}
            {isOpen && (
              <div style={{ background: '#f9fafb', borderTop: '1px solid #e5e7eb', padding: '8px 14px 12px' }}>
                {c.courses.map((course, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '7px 0',
                    borderBottom: i < c.courses.length - 1 ? '1px solid #f0f0f0' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: '#1a5c38', fontSize: 12 }}>⛳</span>
                      <Link
                        href={`/courses/${course.id}`}
                        style={{ fontSize: 13, color: '#1a5c38', fontWeight: 600, textDecoration: 'none' }}
                        onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
                        onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
                      >
                        {course.name}
                      </Link>
                    </div>
                    {course.rating != null && (
                      <span style={{ fontSize: 11, color: '#c9a84c', fontWeight: 700 }}>
                        {STAR_LABELS[course.rating]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
