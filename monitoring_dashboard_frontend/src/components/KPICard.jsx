import React from 'react';

// PUBLIC_INTERFACE
export default function KPICard({ title, value, subtitle, accent = 'primary' }) {
  /** Single KPI card with value and optional subtitle */
  const accentColor = accent === 'secondary' ? 'var(--color-secondary)' : 'var(--color-primary)';
  return (
    <div className="card" style={{ padding: 16, position: 'relative', overflow: 'hidden' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: accentColor,
          opacity: 0.08,
          filter: 'blur(2px)',
        }}
      />
      <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 12 }}>{title}</p>
      <h2 style={{ margin: '6px 0 0', fontSize: 28, color: 'var(--color-text)' }}>{value}</h2>
      {subtitle && <p style={{ margin: '6px 0 0', color: 'var(--color-text-muted)', fontSize: 12 }}>{subtitle}</p>}
    </div>
  );
}
