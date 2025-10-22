import React from 'react';

// PUBLIC_INTERFACE
export default function RecentActivityTable({ records }) {
  /** Table of latest usage records: timestamp, user, model, and calls/tokens */
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={tableStyle} aria-label="Recent usage table">
        <thead>
          <tr>
            <th style={thStyle}>Timestamp</th>
            <th style={thStyle}>User</th>
            <th style={thStyle}>Model</th>
            <th style={thStyle}>Calls</th>
            <th style={thStyle}>Tokens</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td style={tdStyle}>{new Date(r.timestamp).toLocaleString()}</td>
              <td style={tdStyle}>{r.user}</td>
              <td style={tdStyle}>{r.model}</td>
              <td style={tdStyle}>{r.calls}</td>
              <td style={tdStyle}>{r.tokens}</td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td style={emptyTdStyle} colSpan={5}>No records match the selected filters.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 12,
  overflow: 'hidden',
};
const thStyle = {
  textAlign: 'left',
  padding: '12px 16px',
  fontWeight: 600,
  fontSize: 12,
  color: 'var(--color-text-muted)',
  borderBottom: '1px solid var(--color-border)',
  background: 'rgba(37, 99, 235, 0.05)',
};
const tdStyle = {
  padding: '12px 16px',
  borderBottom: '1px solid var(--color-border)',
  color: 'var(--color-text)',
  fontSize: 14,
};
const emptyTdStyle = {
  ...tdStyle,
  textAlign: 'center',
  color: 'var(--color-text-muted)',
};
