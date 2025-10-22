import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// PUBLIC_INTERFACE
export default function SuccessErrorChart({ data }) {
  /** Stacked bar for success vs error call counts per day */
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
          <YAxis tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)' }} />
          <Legend />
          <Bar dataKey="success" stackId="a" fill="var(--color-success)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="error" stackId="a" fill="var(--color-error)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
