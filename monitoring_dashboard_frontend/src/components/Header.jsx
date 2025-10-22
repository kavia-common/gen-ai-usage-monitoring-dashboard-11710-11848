import React from 'react';
import DateRangePicker from './DateRangePicker';

// PUBLIC_INTERFACE
export default function Header({ range, onRangeChange, onPresetSelect }) {
  /** Header with title and time-range filter aligned to the right */
  return (
    <header
      className="card"
      style={{
        border: 'none',
        borderRadius: 0,
        boxShadow: 'none',
        background: 'linear-gradient(180deg, var(--gradient-start), var(--gradient-end))',
        borderBottom: '1px solid var(--color-border)',
      }}
      aria-label="Dashboard header"
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, paddingBottom: 16 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, color: 'var(--color-text)' }}>Gen AI Usage Monitoring</h1>
          <p style={{ margin: '4px 0 0', color: 'var(--color-text-muted)' }}>AWS Bedrock usage insights and trends</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button
            onClick={() => onPresetSelect('previousWeek')}
            className="btn-preset"
            aria-label="Previous week"
            title="Previous week"
            style={presetBtnStyle}
          >
            Previous Week
          </button>
          <button
            onClick={() => onPresetSelect('previousMonth')}
            className="btn-preset"
            aria-label="Previous month"
            title="Previous month"
            style={presetBtnStyle}
          >
            Previous Month
          </button>
          <DateRangePicker range={range} onChange={onRangeChange} />
        </div>
      </div>
    </header>
  );
}

const presetBtnStyle = {
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  border: '1px solid var(--color-border)',
  borderRadius: 10,
  padding: '8px 12px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  cursor: 'pointer',
};
