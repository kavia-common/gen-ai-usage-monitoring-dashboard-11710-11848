import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ModelUsageList shows top models with percentage bars.
 */
export default function ModelUsageList({ items }) {
  return (
    <div className="card">
      <div className="kpi-title">Top Models</div>
      <div className="section">
        {items.map((m) => (
          <div key={m.name} className="model-item">
            <div>
              <div className="model-name">{m.name}</div>
              <div className="model-bar" aria-label={`${m.name} usage ${m.percent}%`}>
                <div
                  className="model-bar-fill"
                  style={{ width: `${Math.min(100, Math.max(0, m.percent))}%` }}
                />
              </div>
            </div>
            <div className="model-pct">{m.percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
