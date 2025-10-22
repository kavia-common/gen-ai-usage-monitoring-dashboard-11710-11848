import React, { useMemo } from 'react';
import { formatISODate } from '../utils/date';

// PUBLIC_INTERFACE
export default function DateRangePicker({ range, onChange }) {
  /** Minimal date-range picker using native date inputs for simplicity and no extra deps */
  const from = useMemo(() => formatISODate(range.start), [range.start]);
  const to = useMemo(() => formatISODate(range.end), [range.end]);

  const handleFrom = (e) => {
    const next = new Date(e.target.value);
    if (!isNaN(next)) onChange({ ...range, start: next });
  };

  const handleTo = (e) => {
    const next = new Date(e.target.value);
    if (!isNaN(next)) onChange({ ...range, end: next });
  };

  return (
    <div
      className="card"
      style={{
        padding: 8,
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        borderRadius: 12,
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}
      aria-label="Custom date range"
    >
      <label style={labelStyle}>
        From
        <input
          aria-label="From date"
          type="date"
          value={from}
          onChange={handleFrom}
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        To
        <input
          aria-label="To date"
          type="date"
          value={to}
          onChange={handleTo}
          style={inputStyle}
        />
      </label>
    </div>
  );
}

const labelStyle = { color: 'var(--color-text-muted)', fontSize: 12, display: 'flex', flexDirection: 'column', gap: 4 };
const inputStyle = {
  padding: '8px 10px',
  borderRadius: 8,
  border: '1px solid var(--color-border)',
  outline: 'none',
};
