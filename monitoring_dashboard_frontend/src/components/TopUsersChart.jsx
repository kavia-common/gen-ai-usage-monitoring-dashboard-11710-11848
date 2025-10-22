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
export default function TopUsersChart({ data }) {
  /** Horizontal bar chart of top users by calls */
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 10, bottom: 0, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis type="number" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
          <YAxis type="category" dataKey="user" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)' }} />
          <Bar dataKey="calls" fill="var(--color-primary)" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
