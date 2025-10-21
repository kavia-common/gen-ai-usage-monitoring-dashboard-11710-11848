import React, { useMemo } from 'react';

/**
 * PUBLIC_INTERFACE
 * Chart renders a responsive SVG sparkline for timeseries [{date, calls}].
 */
export default function Chart({ data }) {
  const padding = 16;
  const width = 800;
  const height = 220;

  const pathD = useMemo(() => {
    if (!data || data.length === 0) return '';
    const xs = data.map((_, i) => i);
    const ys = data.map((d) => d.calls);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const xScale = (i) => {
      if (data.length === 1) return padding + (width - padding * 2) / 2;
      const t = i / (data.length - 1);
      return padding + t * (width - padding * 2);
    };
    const yScale = (v) => {
      if (maxY === minY) return height / 2;
      const t = (v - minY) / (maxY - minY);
      return height - padding - t * (height - padding * 2);
    };

    let d = '';
    xs.forEach((xIdx, i) => {
      const x = xScale(xIdx);
      const y = yScale(ys[i]);
      d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    });
    return d;
  }, [data]);

  return (
    <div className="card">
      <div className="kpi-title">API Calls Over Time</div>
      <div className="chart-wrapper">
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" role="img" aria-label="API calls over time">
          <defs>
            <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="1" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="fillGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width={width} height={height} fill="transparent" />
          {/* Area fill */}
          <path
            d={`${pathD} L ${width - 16} ${height - 16} L 16 ${height - 16} Z`}
            fill="url(#fillGrad)"
            stroke="none"
            opacity="0.5"
          />
          {/* Line */}
          <path d={pathD} fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <div className="chart-legend">
        <span className="legend-dot" /> Daily calls
      </div>
    </div>
  );
}
