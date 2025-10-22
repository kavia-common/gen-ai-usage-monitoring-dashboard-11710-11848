import React from 'react';
import FiltersBar from './FiltersBar';

// PUBLIC_INTERFACE
export default function Header({
  range,
  onRangeChange,
  onPresetSelect,
  models,
  selectedModels,
  onModelsChange,
  userFilter,
  onUserFilterChange,
}) {
  /** Header with compact navbar and filters bar */
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
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 8,
          paddingBottom: 8,
          minHeight: 56,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 22, color: 'var(--color-text)' }}>Gen AI Usage Monitoring</h1>
          <p style={{ margin: '4px 0 0', color: 'var(--color-text-muted)', fontSize: 13 }}>
            AWS Bedrock usage insights and trends
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 0, paddingBottom: 12 }}>
        <FiltersBar
          range={range}
          onRangeChange={onRangeChange}
          onPresetSelect={onPresetSelect}
          models={models}
          selectedModels={selectedModels}
          onModelsChange={onModelsChange}
          userFilter={userFilter}
          onUserFilterChange={onUserFilterChange}
        />
      </div>
    </header>
  );
}
