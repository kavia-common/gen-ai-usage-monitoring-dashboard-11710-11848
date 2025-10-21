import React, { useState } from 'react';
import { useAuth } from '../state/useAuth';
import { useDashboard } from '../state/useDashboardStore';
import { getDefaultRange } from '../utils/date';
import DateRangePicker from './DateRangePicker';

/**
 * PUBLIC_INTERFACE
 * Header shows brand, time range quick filters, user info, and logout.
 */
export default function Header() {
  const { user, logout } = useAuth();
  const { setRange, dateRange } = useDashboard();
  const [showCustom, setShowCustom] = useState(false);

  const setQuick = (kind) => {
    const r = getDefaultRange(kind);
    setShowCustom(false);
    setRange(r);
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand">
          <div className="brand-badge" aria-label="App Logo">📈</div>
          <div className="brand-title">Gen AI Usage Monitoring</div>
        </div>
        <div className="header-right">
          <button className="btn" onClick={() => setQuick('week')}>Previous Week</button>
          <button className="btn" onClick={() => setQuick('month')}>Previous Month</button>
          <button className="btn" onClick={() => setShowCustom((s) => !s)}>
            {showCustom ? 'Hide Custom' : 'Custom'}
          </button>
          <span className="badge" title="Current user">{user?.email}</span>
          <button className="btn btn-primary" onClick={logout}>Logout</button>
        </div>
      </div>
      {showCustom && (
        <div className="container" style={{ paddingBottom: 16 }}>
          <div className="card">
            <DateRangePicker
              start={dateRange.start}
              end={dateRange.end}
              onApply={(r) => {
                setRange(r);
                setShowCustom(false);
              }}
            />
            <div className="helper">Select a custom date range and click Apply.</div>
          </div>
        </div>
      )}
    </header>
  );
}
