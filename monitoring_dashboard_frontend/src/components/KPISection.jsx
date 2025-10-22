import React from 'react';
import KPICard from './KPICard.jsx';

// PUBLIC_INTERFACE
export default function KPISection({ totalCalls, avgDailyUsers, distinctModels }) {
  /** Renders three KPI cards in a responsive grid */
  return (
    <section className="grid grid-3">
      <KPICard title="Total API Calls" value={totalCalls.toLocaleString()} subtitle="Selected period" accent="primary" />
      <KPICard title="Avg Daily Bedrock Users" value={avgDailyUsers.toFixed(1)} subtitle="Selected period" accent="secondary" />
      <KPICard title="Distinct Models Used" value={distinctModels} subtitle="Selected period" accent="primary" />
    </section>
  );
}
