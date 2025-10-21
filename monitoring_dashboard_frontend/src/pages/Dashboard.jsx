import React from 'react';
import Header from '../components/Header';
import KPICard from '../components/KPICard';
import ModelUsageList from '../components/ModelUsageList';
import Chart from '../components/Chart';
import { useDashboard } from '../state/useDashboardStore';

/**
 * PUBLIC_INTERFACE
 * Dashboard shows KPI cards, chart, and top model usage list.
 */
export default function Dashboard() {
  const { metrics, loading, error } = useDashboard();

  return (
    <div>
      <Header />
      <main className="container">
        {error && <div className="card" style={{ borderColor: '#FECACA', color: '#7F1D1D' }}>Error: {error}</div>}
        <div className="section grid grid-3">
          <KPICard title="Total Calls" value={metrics.totalCalls || 0} delta="+3.2%" />
          <KPICard title="Avg Users" value={metrics.avgUsers || 0} delta="+1.1%" />
          <KPICard title="Top Models" value={metrics.topModelsCount || 0} />
        </div>

        <div className="section">
          {loading ? <div className="card">Loading chart…</div> : <Chart data={metrics.timeseries} />}
        </div>

        <div className="section">
          <ModelUsageList items={metrics.models || []} />
        </div>
      </main>
    </div>
  );
}
