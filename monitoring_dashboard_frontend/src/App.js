import React, { useMemo, useState, useEffect, Suspense } from 'react';
import './App.css';
import './index.css';
import { applyThemeToDocument } from './theme';
import Header from './components/Header';
import KPISection from './components/KPISection';
import CallsOverTimeChart from './components/CallsOverTimeChart';
import ModelDistributionChart from './components/ModelDistributionChart';
import RecentActivityTable from './components/RecentActivityTable';
import CostEstimateChart from './components/CostEstimateChart';
import UserActivityChart from './components/UserActivityChart';
import SuccessErrorChart from './components/SuccessErrorChart';
import TopUsersChart from './components/TopUsersChart';
import Skeleton from './components/ui/Skeleton';
import {
  getMockUsage,
  filterUsageByRange,
  filterUsageAdvanced,
  deriveKPIs,
  groupCallsByDate,
  groupCallsByModel,
  calcDailyCost,
  calcDailyUserActivity,
  calcSuccessErrorSeries,
  topUsersByCalls,
  getAllModels,
} from './services/mockData';
import { getPreviousWeekRange, getPreviousMonthRange } from './utils/date';

// PUBLIC_INTERFACE
function App() {
  /** Top-level monitoring dashboard app with header, filters, KPIs, charts, and table. */
  const [range, setRange] = useState(getPreviousWeekRange());
  const [allUsage, setAllUsage] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [userFilter, setUserFilter] = useState('');

  useEffect(() => {
    applyThemeToDocument();
    // Mock fetch (simulate slight delay)
    const t = setTimeout(() => setAllUsage(getMockUsage()), 300);
    return () => clearTimeout(t);
  }, []);

  const modelsList = useMemo(() => getAllModels(), []);
  const rangeFiltered = useMemo(() => filterUsageByRange(allUsage, range), [allUsage, range]);
  const filtered = useMemo(
    () => filterUsageAdvanced(rangeFiltered, { models: selectedModels, userQuery: userFilter }),
    [rangeFiltered, selectedModels, userFilter]
  );

  const kpis = useMemo(() => deriveKPIs(filtered, range), [filtered, range]);
  const callsOverTime = useMemo(() => groupCallsByDate(filtered, range), [filtered, range]);
  const modelDistribution = useMemo(() => groupCallsByModel(filtered), [filtered]);
  const costSeries = useMemo(() => calcDailyCost(filtered, range), [filtered, range]);
  const userActivity = useMemo(() => calcDailyUserActivity(filtered, range), [filtered, range]);
  const successError = useMemo(() => calcSuccessErrorSeries(filtered, range), [filtered, range]);
  const topUsers = useMemo(() => topUsersByCalls(filtered, 8), [filtered]);

  const handlePreset = (preset) => {
    if (preset === 'previousWeek') setRange(getPreviousWeekRange());
    if (preset === 'previousMonth') setRange(getPreviousMonthRange());
  };

  const loading = allUsage.length === 0;

  return (
    <div>
      <Header
        range={range}
        onRangeChange={setRange}
        onPresetSelect={handlePreset}
        models={modelsList}
        selectedModels={selectedModels}
        onModelsChange={setSelectedModels}
        userFilter={userFilter}
        onUserFilterChange={setUserFilter}
      />
      <main className="container" aria-label="Monitoring dashboard content">
        {loading ? (
          <section className="grid grid-3" aria-busy="true" aria-label="Loading KPI cards">
            <div className="card" style={{ padding: 16 }}>
              <Skeleton width="30%" height={12} />
              <Skeleton width="60%" height={28} style={{ marginTop: 8 }} />
              <Skeleton width="40%" height={12} style={{ marginTop: 8 }} />
            </div>
            <div className="card" style={{ padding: 16 }}>
              <Skeleton width="30%" height={12} />
              <Skeleton width="60%" height={28} style={{ marginTop: 8 }} />
              <Skeleton width="40%" height={12} style={{ marginTop: 8 }} />
            </div>
            <div className="card" style={{ padding: 16 }}>
              <Skeleton width="30%" height={12} />
              <Skeleton width="60%" height={28} style={{ marginTop: 8 }} />
              <Skeleton width="40%" height={12} style={{ marginTop: 8 }} />
            </div>
          </section>
        ) : (
          <KPISection
            totalCalls={kpis.totalCalls}
            avgDailyUsers={kpis.avgDailyUsers}
            distinctModels={kpis.distinctModels}
          />
        )}

        <section className="grid grid-2" style={{ marginTop: 16 }}>
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ margin: 0, color: 'var(--color-text)' }}>Calls Over Time</h3>
            <p style={{ marginTop: 4, color: 'var(--color-text-muted)' }}>
              Daily API call counts in the selected range
            </p>
            {loading ? (
              <Skeleton height={300} rounded={12} style={{ marginTop: 8 }} />
            ) : callsOverTime.every((d) => d.calls === 0) ? (
              <EmptyState message="No calls for the selected filters." />
            ) : (
              <Suspense fallback={<Skeleton height={300} rounded={12} />}>
                <CallsOverTimeChart data={callsOverTime} />
              </Suspense>
            )}
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ margin: 0, color: 'var(--color-text)' }}>Model Distribution</h3>
            <p style={{ marginTop: 4, color: 'var(--color-text-muted)' }}>
              Calls grouped by LLM model
            </p>
            {loading ? (
              <Skeleton height={300} rounded={12} style={{ marginTop: 8 }} />
            ) : modelDistribution.length === 0 ? (
              <EmptyState message="No model data for the selected filters." />
            ) : (
              <Suspense fallback={<Skeleton height={300} rounded={12} />}>
                <ModelDistributionChart data={modelDistribution} />
              </Suspense>
            )}
          </div>
        </section>

        <section className="grid grid-2" style={{ marginTop: 16 }}>
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ margin: 0, color: 'var(--color-text)' }}>Daily Cost Estimate</h3>
            <p style={{ marginTop: 4, color: 'var(--color-text-muted)' }}>
              Estimated daily cost based on per-model rates
            </p>
            {loading ? (
              <Skeleton height={300} rounded={12} style={{ marginTop: 8 }} />
            ) : costSeries.every((d) => d.cost === 0) ? (
              <EmptyState message="No cost data for the selected filters." />
            ) : (
              <Suspense fallback={<Skeleton height={300} rounded={12} />}>
                <CostEstimateChart data={costSeries} />
              </Suspense>
            )}
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ margin: 0, color: 'var(--color-text)' }}>User Activity Trend</h3>
            <p style={{ marginTop: 4, color: 'var(--color-text-muted)' }}>
              Unique users per day in the selected range
            </p>
            {loading ? (
              <Skeleton height={300} rounded={12} style={{ marginTop: 8 }} />
            ) : userActivity.every((d) => d.users === 0) ? (
              <EmptyState message="No user activity for the selected filters." />
            ) : (
              <Suspense fallback={<Skeleton height={300} rounded={12} />}>
                <UserActivityChart data={userActivity} />
              </Suspense>
            )}
          </div>
        </section>

        <section className="grid grid-2" style={{ marginTop: 16 }}>
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ margin: 0, color: 'var(--color-text)' }}>Success vs Error</h3>
            <p style={{ marginTop: 4, color: 'var(--color-text-muted)' }}>
              Daily success and error call counts
            </p>
            {loading ? (
              <Skeleton height={300} rounded={12} style={{ marginTop: 8 }} />
            ) : successError.every((d) => d.success === 0 && d.error === 0) ? (
              <EmptyState message="No success/error data for the selected filters." />
            ) : (
              <Suspense fallback={<Skeleton height={300} rounded={12} />}>
                <SuccessErrorChart data={successError} />
              </Suspense>
            )}
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ margin: 0, color: 'var(--color-text)' }}>Top Users by Calls</h3>
            <p style={{ marginTop: 4, color: 'var(--color-text-muted)' }}>
              Users ranked by total calls
            </p>
            {loading ? (
              <Skeleton height={300} rounded={12} style={{ marginTop: 8 }} />
            ) : topUsers.length === 0 ? (
              <EmptyState message="No users match the selected filters." />
            ) : (
              <Suspense fallback={<Skeleton height={300} rounded={12} />}>
                <TopUsersChart data={topUsers} />
              </Suspense>
            )}
          </div>
        </section>

        <section className="card" style={{ padding: 16, marginTop: 16 }}>
          <h3 style={{ margin: 0, color: 'var(--color-text)' }}>Recent Usage</h3>
          <p style={{ marginTop: 4, color: 'var(--color-text-muted)' }}>
            Latest API usage records within the selected period
          </p>
          {loading ? (
            <Skeleton height={220} rounded={12} style={{ marginTop: 8 }} />
          ) : (
            <RecentActivityTable records={filtered.slice(0, 20)} />
          )}
        </section>
      </main>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        height: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-text-muted)',
        fontSize: 14,
      }}
    >
      {message}
    </div>
  );
}

export default App;
