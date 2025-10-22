import React, { useMemo, useState, useEffect } from 'react';
import './App.css';
import './index.css';
import { applyThemeToDocument } from './theme';
import Header from './components/Header';
import KPISection from './components/KPISection';
import CallsOverTimeChart from './components/CallsOverTimeChart';
import ModelDistributionChart from './components/ModelDistributionChart';
import RecentActivityTable from './components/RecentActivityTable';
import { getMockUsage, filterUsageByRange, deriveKPIs, groupCallsByDate, groupCallsByModel } from './services/mockData';
import { getPreviousWeekRange, getPreviousMonthRange } from './utils/date';

// PUBLIC_INTERFACE
function App() {
  /** Top-level monitoring dashboard app with header, filters, KPIs, charts, and table. */
  const [range, setRange] = useState(getPreviousWeekRange());
  const [allUsage, setAllUsage] = useState([]);

  useEffect(() => {
    applyThemeToDocument();
    // Mock fetch
    setAllUsage(getMockUsage());
  }, []);

  const filtered = useMemo(() => filterUsageByRange(allUsage, range), [allUsage, range]);
  const kpis = useMemo(() => deriveKPIs(filtered, range), [filtered, range]);
  const callsOverTime = useMemo(() => groupCallsByDate(filtered, range), [filtered, range]);
  const modelDistribution = useMemo(() => groupCallsByModel(filtered), [filtered]);

  const handlePreset = (preset) => {
    if (preset === 'previousWeek') setRange(getPreviousWeekRange());
    if (preset === 'previousMonth') setRange(getPreviousMonthRange());
  };

  return (
    <div>
      <Header
        range={range}
        onRangeChange={setRange}
        onPresetSelect={handlePreset}
      />
      <main className="container" aria-label="Monitoring dashboard content">
        <KPISection
          totalCalls={kpis.totalCalls}
          avgDailyUsers={kpis.avgDailyUsers}
          distinctModels={kpis.distinctModels}
        />

        <section className="grid grid-2" style={{ marginTop: 16 }}>
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ margin: 0, color: 'var(--color-text)' }}>Calls Over Time</h3>
            <p style={{ marginTop: 4, color: 'var(--color-text-muted)' }}>
              Daily API call counts in the selected range
            </p>
            <CallsOverTimeChart data={callsOverTime} />
          </div>
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ margin: 0, color: 'var(--color-text)' }}>Model Distribution</h3>
            <p style={{ marginTop: 4, color: 'var(--color-text-muted)' }}>
              Calls grouped by LLM model
            </p>
            <ModelDistributionChart data={modelDistribution} />
          </div>
        </section>

        <section className="card" style={{ padding: 16, marginTop: 16 }}>
          <h3 style={{ margin: 0, color: 'var(--color-text)' }}>Recent Usage</h3>
          <p style={{ marginTop: 4, color: 'var(--color-text-muted)' }}>
            Latest API usage records within the selected period
          </p>
          <RecentActivityTable records={filtered.slice(0, 20)} />
        </section>
      </main>
    </div>
  );
}

export default App;
