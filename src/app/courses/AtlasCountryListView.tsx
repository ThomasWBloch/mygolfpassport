import Link from 'next/link'
import { isGenericCourseName } from '@/lib/course-display'

/**
 * Pure list-view of courses inside a single country. Server component —
 * alphabetised at the dispatcher, just renders. Cards link to the
 * canonical course page; played courses get the dashed-red stamp the
 * rest of the app uses.
 */

export interface CountryCourse {
  id: string
  name: string
  club: string | null
  holes: number | null
  played: boolean
}

interface Props {
  courses: CountryCourse[]
}

export default function AtlasCountryListView({ courses }: Props) {
  if (courses.length === 0) {
    return (
      <div
        style={{
          background: 'var(--color-mgp-paper)',
          border: '0.5px solid var(--color-mgp-border)',
          borderRadius: 8,
          padding: '24px 16px',
          textAlign: 'center',
          color: 'var(--color-mgp-ink-2)',
          fontSize: 14,
        }}
      >
        No courses yet in this country.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {courses.map((course) => {
        const primaryLabel = course.club ?? course.name
        const courseLabelIsGeneric = isGenericCourseName(course.name)
        const secondaryLabel =
          course.club && course.club !== course.name && !courseLabelIsGeneric
            ? course.name
            : null
        return (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              padding: '12px 14px',
              background: 'var(--color-mgp-paper)',
              border: '0.5px solid var(--color-mgp-border)',
              borderRadius: 10,
              textDecoration: 'none',
              transition: 'border-color 0.15s',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mgp-display)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'var(--color-mgp-ink)',
                  letterSpacing: -0.2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {primaryLabel}
              </div>
              {secondaryLabel && (
                <div
                  style={{
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: 'var(--color-mgp-ink-3)',
                    marginTop: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {secondaryLabel}
                </div>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flexShrink: 0,
              }}
            >
              {course.holes && (
                <span
                  style={{
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: 1,
                    color: 'var(--color-mgp-ink-3)',
                  }}
                >
                  {course.holes}H
                </span>
              )}
              {course.played && (
                <span
                  style={{
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: 'var(--color-mgp-stamp-red)',
                    border: '1px dashed var(--color-mgp-stamp-red)',
                    borderRadius: 4,
                    padding: '3px 8px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ✓ Played
                </span>
              )}
              <span style={{ fontSize: 13, color: 'var(--color-mgp-ink-3)' }}>
                ›
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
