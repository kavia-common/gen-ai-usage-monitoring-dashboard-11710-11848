import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

// PUBLIC_INTERFACE
export default function CostEstimateChart({ data }) {
  /** Stacked/daily cost estimate bar chart (USD), derived from mock cost map */
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
          <YAxis
            tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
            tickFormatter={(v) => `$${v.toFixed(2)}`}
          />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)' }}
            formatter={(value) => [`$${Number(value).toFixed(4)}`, 'Cost']}
          />
          <Bar dataKey="cost" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
