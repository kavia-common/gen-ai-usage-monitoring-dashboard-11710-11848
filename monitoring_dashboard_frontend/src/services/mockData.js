import { addDays, eachDayOfInterval, format, isWithinInterval } from 'date-fns';
import { getPreviousWeekRange } from '../utils/date';

const MODELS = [
  'anthropic.claude-3-sonnet',
  'anthropic.claude-3-haiku',
  'amazon.titan-text-lite-v1',
  'meta.llama3-70b-instruct',
];

const USERS = ['alice', 'bob', 'carol', 'dan', 'eve', 'frank', 'gina', 'hank'];

// PUBLIC_INTERFACE
export function getMockUsage() {
  /** Returns generated mock usage events for the last ~60 days */
  const now = new Date();
  const start = addDays(now, -60);

  const days = eachDayOfInterval({ start, end: now });
  let idCounter = 1;
  const events = [];

  days.forEach((day) => {
    const dailyUsers = USERS.sort(() => 0.5 - Math.random()).slice(0, 1 + Math.floor(Math.random() * USERS.length));
    const numEvents = 10 + Math.floor(Math.random() * 40);
    for (let i = 0; i < numEvents; i++) {
      const ts = addDays(day, 0);
      ts.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0);
      events.push({
        id: idCounter++,
        timestamp: ts.toISOString(),
        user: dailyUsers[Math.floor(Math.random() * dailyUsers.length)],
        model: MODELS[Math.floor(Math.random() * MODELS.length)],
        calls: 1 + Math.floor(Math.random() * 3),
        tokens: 200 + Math.floor(Math.random() * 2000),
      });
    }
  });

  return events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// PUBLIC_INTERFACE
export function filterUsageByRange(usage, range) {
  /** Filters usage records by date range inclusive */
  return usage.filter((u) =>
    isWithinInterval(new Date(u.timestamp), { start: range.start, end: range.end })
  );
}

// PUBLIC_INTERFACE
export function deriveKPIs(usage, range) {
  /** Computes total calls, avg daily active users (distinct users/day averaged), and distinct models */
  const totalCalls = usage.reduce((sum, r) => sum + (r.calls || 0), 0);
  const byDay = {};
  const models = new Set();

  usage.forEach((r) => {
    const dayKey = format(new Date(r.timestamp), 'yyyy-MM-dd');
    if (!byDay[dayKey]) byDay[dayKey] = new Set();
    byDay[dayKey].add(r.user);
    if (r.model) models.add(r.model);
  });

  const dayKeys = Object.keys(byDay);
  const avgDailyUsers = dayKeys.length
    ? dayKeys.reduce((sum, k) => sum + byDay[k].size, 0) / dayKeys.length
    : 0;

  return {
    totalCalls,
    avgDailyUsers,
    distinctModels: models.size,
  };
}

// PUBLIC_INTERFACE
export function groupCallsByDate(usage, range) {
  /** Aggregates calls by day for AreaChart dataset */
  const days = eachDayOfInterval({ start: range.start, end: range.end });
  const map = new Map(days.map((d) => [format(d, 'yyyy-MM-dd'), 0]));
  usage.forEach((r) => {
    const key = format(new Date(r.timestamp), 'yyyy-MM-dd');
    map.set(key, (map.get(key) || 0) + (r.calls || 0));
  });
  return Array.from(map.entries()).map(([date, calls]) => ({ date, calls }));
}

// PUBLIC_INTERFACE
export function groupCallsByModel(usage) {
  /** Aggregates calls by model for BarChart dataset */
  const map = new Map();
  usage.forEach((r) => {
    const key = r.model || 'unknown';
    map.set(key, (map.get(key) || 0) + (r.calls || 0));
  });
  return Array.from(map.entries()).map(([model, calls]) => ({ model, calls }));
}

/**
 * Placeholder hooks for future backend integration with monitoring_dashboard_database:
 * - fetchUsage(range): Will call backend API to retrieve usage within a date range
 * - subscribeToUpdates(): Will open a WebSocket for live updates
 * For now, use getMockUsage() above.
 */

// PUBLIC_INTERFACE
export async function fetchUsage(/* range */) {
  /** Placeholder: replace with backend call later */
  return getMockUsage();
}

// PUBLIC_INTERFACE
export function subscribeToUpdates(/* onMessage */) {
  /** Placeholder: replace with WebSocket subscription later */
  return { unsubscribe: () => {} };
}

// PUBLIC_INTERFACE
export function defaultRange() {
  /** Convenience default range used by consumers */
  return getPreviousWeekRange();
}
