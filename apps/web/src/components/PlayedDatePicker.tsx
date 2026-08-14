'use client'
import { useState } from 'react'
import {
  daysInMonth,
  decodePlayedDate,
  encodePlayedDate,
  formatPlayedDate,
  isDaySelectable,
  isMonthSelectable,
  isYearSelectable,
  type PlayedDateValue,
} from '@/lib/played-date'

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MIN_YEAR_OFFSET = 75

type Stage = 'closed' | 'year' | 'month' | 'day'

type Props = {
  value: PlayedDateValue
  onChange: (value: PlayedDateValue) => void
  maxDate?: Date
}

const gridCell = (marked: boolean, disabled: boolean): React.CSSProperties => ({
  padding: '9px 4px',
  borderRadius: 8,
  border: `0.5px solid ${marked ? 'var(--color-mgp-cover)' : 'var(--color-mgp-border)'}`,
  background: marked ? 'var(--color-mgp-cover)' : 'var(--color-mgp-paper)',
  color: marked ? 'var(--color-mgp-ink-inv)' : 'var(--color-mgp-ink)',
  fontSize: 14,
  fontFamily: 'var(--font-mgp-body)',
  cursor: disabled ? 'default' : 'pointer',
  opacity: disabled ? 0.35 : 1,
})

const dontRememberButton: React.CSSProperties = {
  width: '100%',
  padding: '11px',
  borderRadius: 8,
  border: '0.5px solid var(--color-mgp-gold)',
  background: 'var(--color-mgp-gold-faint)',
  color: 'var(--color-mgp-gold-dark)',
  fontSize: 13,
  fontWeight: 600,
  fontFamily: 'var(--font-mgp-body)',
  cursor: 'pointer',
  marginBottom: 14,
}

/**
 * Stepped year -> month -> day picker, replacing the old plain
 * <input type="date">. Nothing is ever pre-selected on a fresh round;
 * editing an existing round opens at the year step with its known year
 * marked (and carries month/day forward too, if known) so the user sees
 * what's already saved instead of starting blank. Ported to match
 * apps/mobile/components/PlayedDatePicker.tsx exactly, rendered inline
 * (no modal) within the parent's own Card wrapper.
 */
export default function PlayedDatePicker({ value, onChange, maxDate = new Date() }: Props) {
  const [stage, setStage] = useState<Stage>('closed')
  const [pendingYear, setPendingYear] = useState<number | null>(null)
  const [pendingMonth, setPendingMonth] = useState<number | null>(null)

  function open() {
    if (value.playedAt && value.precision) {
      const { year, month } = decodePlayedDate(value.playedAt)
      setPendingYear(year)
      setPendingMonth(value.precision !== 'year' ? month : null)
    } else {
      setPendingYear(null)
      setPendingMonth(null)
    }
    setStage('year')
  }

  function close() {
    setStage('closed')
  }

  function finish(year: number | null, month: number | null, day: number | null) {
    onChange(encodePlayedDate(year, month, day))
    close()
  }

  function selectYear(year: number) {
    if (year !== pendingYear) setPendingMonth(null)
    setPendingYear(year)
    setStage('month')
  }

  function selectMonth(month: number) {
    setPendingMonth(month)
    setStage('day')
  }

  const label = formatPlayedDate(value.playedAt, value.precision, 'long')

  if (stage === 'closed') {
    return (
      <button
        type="button"
        onClick={open}
        style={{
          width: '100%',
          textAlign: 'left',
          border: '0.5px solid var(--color-mgp-border)',
          borderRadius: 6,
          padding: '10px 12px',
          fontSize: 15,
          color: label ? 'var(--color-mgp-ink)' : 'var(--color-mgp-ink-3)',
          background: 'var(--color-mgp-cream-warm)',
          fontFamily: 'var(--font-mgp-body)',
          cursor: 'pointer',
        }}
      >
        {label ?? 'Select date'}
      </button>
    )
  }

  const currentYear = maxDate.getFullYear()
  const years = Array.from({ length: MIN_YEAR_OFFSET + 1 }, (_, i) => currentYear - i)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        {stage !== 'year' ? (
          <button
            type="button"
            onClick={() => setStage(stage === 'day' ? 'month' : 'year')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              color: 'var(--color-mgp-ink-3)', fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
            }}
          >
            ← Back
          </button>
        ) : <span />}
        <button
          type="button"
          onClick={close}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, lineHeight: '20px', color: 'var(--color-mgp-ink-3)' }}
        >
          ×
        </button>
      </div>

      <div style={{ fontFamily: 'var(--font-mgp-display)', fontSize: 17, color: 'var(--color-mgp-ink)', marginBottom: 4 }}>
        {stage === 'year' && 'When did you play here?'}
        {stage === 'month' && `Which month, ${pendingYear}?`}
        {stage === 'day' && `Which day in ${MONTH_LABELS[pendingMonth ?? 0]} ${pendingYear}?`}
      </div>
      <div style={{ fontSize: 13, color: 'var(--color-mgp-ink-3)', marginBottom: 14 }}>
        Will be saved as:{' '}
        {formatPlayedDate(
          encodePlayedDate(pendingYear, pendingMonth, null).playedAt,
          pendingMonth != null ? 'month' : pendingYear != null ? 'year' : null,
          'long'
        ) ?? 'No date — not chosen yet'}
      </div>

      {stage === 'year' && (
        <>
          <button type="button" style={dontRememberButton} onClick={() => finish(null, null, null)}>
            I don&apos;t remember at all
          </button>
          <div style={{ fontFamily: 'var(--font-mgp-stamp)', fontSize: 11, fontWeight: 700, color: 'var(--color-mgp-ink-3)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
            Or pick a year
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, maxHeight: 220, overflowY: 'auto' }}>
            {years.map((y) => {
              const disabled = !isYearSelectable(y, maxDate)
              return (
                <button key={y} type="button" disabled={disabled} style={gridCell(y === pendingYear, disabled)} onClick={() => selectYear(y)}>
                  {y}
                </button>
              )
            })}
          </div>
        </>
      )}

      {stage === 'month' && pendingYear != null && (
        <>
          <button type="button" style={dontRememberButton} onClick={() => finish(pendingYear, null, null)}>
            I don&apos;t remember the month
          </button>
          <div style={{ fontFamily: 'var(--font-mgp-stamp)', fontSize: 11, fontWeight: 700, color: 'var(--color-mgp-ink-3)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
            Or pick a month
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {MONTH_LABELS.map((label, m) => {
              const disabled = !isMonthSelectable(pendingYear, m, maxDate)
              return (
                <button key={label} type="button" disabled={disabled} style={gridCell(m === pendingMonth, disabled)} onClick={() => selectMonth(m)}>
                  {label}
                </button>
              )
            })}
          </div>
        </>
      )}

      {stage === 'day' && pendingYear != null && pendingMonth != null && (
        <>
          <button type="button" style={dontRememberButton} onClick={() => finish(pendingYear, pendingMonth, null)}>
            I don&apos;t remember the day
          </button>
          <div style={{ fontFamily: 'var(--font-mgp-stamp)', fontSize: 11, fontWeight: 700, color: 'var(--color-mgp-ink-3)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
            Or pick a day
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5 }}>
            {Array.from({ length: daysInMonth(pendingYear, pendingMonth) }, (_, i) => i + 1).map((d) => {
              const disabled = !isDaySelectable(pendingYear, pendingMonth, d, maxDate)
              return (
                <button key={d} type="button" disabled={disabled} style={{ ...gridCell(false, disabled), padding: '8px 2px', fontSize: 13 }} onClick={() => finish(pendingYear, pendingMonth, d)}>
                  {d}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
