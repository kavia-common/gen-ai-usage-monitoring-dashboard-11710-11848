import React from 'react';

/**
 * PUBLIC_INTERFACE
 * KPICard shows a labeled KPI metric with optional delta text.
 */
export default function KPICard({ title, value, delta }) {
  return (
    <div className="card">
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">{value.toLocaleString()}</div>
      {delta != null && <div className="kpi-delta">▲ {delta}</div>}
    </div>
  );
}
