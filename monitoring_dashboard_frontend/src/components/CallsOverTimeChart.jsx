import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

// PUBLIC_INTERFACE
export default function CallsOverTimeChart({ data }) {
  /** Area chart showing daily API calls in selected range */
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
          <YAxis tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)' }} />
          <Area type="monotone" dataKey="calls" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorCalls)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
