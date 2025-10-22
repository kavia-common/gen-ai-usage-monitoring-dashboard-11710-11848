import React from 'react';
import DateRangePicker from './DateRangePicker';

// PUBLIC_INTERFACE
export default function FiltersBar({
  range,
  onRangeChange,
  onPresetSelect,
  models,
  selectedModels,
  onModelsChange,
  userFilter,
  onUserFilterChange,
}) {
  /** Filters bar with presets, date range, model multi-select and user filter */
  return (
    <div
      className="card"
      role="region"
      aria-label="Filters"
      style={{
        padding: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderRadius: 12,
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}
    >
      <div role="group" aria-label="Quick range presets" style={{ display: 'flex', gap: 8 }}>
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
      </div>

      <DateRangePicker range={range} onChange={onRangeChange} />

      <label style={labelStyle}>
        Models
        <select
          aria-label="Model filter"
          multiple
          value={selectedModels}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions).map((o) => o.value);
            onModelsChange(values);
          }}
          style={selectStyle}
        >
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>

      <label style={labelStyle}>
        User
        <input
          aria-label="User filter"
          type="text"
          value={userFilter}
          onChange={(e) => onUserFilterChange(e.target.value)}
          placeholder="Search user..."
          style={inputStyle}
        />
      </label>
    </div>
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

const labelStyle = {
  color: 'var(--color-text-muted)',
  fontSize: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};

const inputStyle = {
  padding: '8px 10px',
  borderRadius: 8,
  border: '1px solid var(--color-border)',
  outline: 'none',
};

const selectStyle = {
  padding: '8px 10px',
  borderRadius: 8,
  border: '1px solid var(--color-border)',
  outline: 'none',
  minWidth: 220,
  height: 40 + 8, // at least one visible option height
};
