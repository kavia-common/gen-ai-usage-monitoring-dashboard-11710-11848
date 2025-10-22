import { addDays, eachDayOfInterval, format, isWithinInterval } from 'date-fns';
import { getPreviousWeekRange } from '../utils/date';

const MODELS = [
  'anthropic.claude-3-sonnet',
  'anthropic.claude-3-haiku',
  'amazon.titan-text-lite-v1',
  'meta.llama3-70b-instruct',
];

const USERS = [
  { id: 'u1', name: 'alice' },
  { id: 'u2', name: 'bob' },
  { id: 'u3', name: 'carol' },
  { id: 'u4', name: 'dan' },
  { id: 'u5', name: 'eve' },
  { id: 'u6', name: 'frank' },
  { id: 'u7', name: 'gina' },
  { id: 'u8', name: 'hank' },
];

// Mock cost per call per model (USD) - simplified flat per-call rate
const COST_PER_MODEL = {
  'anthropic.claude-3-sonnet': 0.004,
  'anthropic.claude-3-haiku': 0.0015,
  'amazon.titan-text-lite-v1': 0.001,
  'meta.llama3-70b-instruct': 0.003,
};

// PUBLIC_INTERFACE
export function getMockUsage() {
  /** Returns generated mock usage events for the last ~60 days; includes status, userId/userName */
  const now = new Date();
  const start = addDays(now, -60);

  const days = eachDayOfInterval({ start, end: now });
  let idCounter = 1;
  const events = [];

  days.forEach((day) => {
    const shuffled = [...USERS].sort(() => 0.5 - Math.random());
    const dailyUsers = shuffled.slice(0, 1 + Math.floor(Math.random() * USERS.length));
    const numEvents = 10 + Math.floor(Math.random() * 40);
    for (let i = 0; i < numEvents; i++) {
      const ts = addDays(day, 0);
      ts.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0);
      const u = dailyUsers[Math.floor(Math.random() * dailyUsers.length)];
      const model = MODELS[Math.floor(Math.random() * MODELS.length)];
      const calls = 1 + Math.floor(Math.random() * 3);
      const tokens = 200 + Math.floor(Math.random() * 2000);
      const status = Math.random() < 0.85 ? 'success' : 'error';

      events.push({
        id: idCounter++,
        timestamp: ts.toISOString(),
        userId: u.id,
        user: u.name,
        userName: u.name,
        model,
        calls,
        tokens,
        status,
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
export function filterUsageAdvanced(usage, { models = [], userQuery = '' }) {
  /** Applies model multi-select and user text filter */
  const q = (userQuery || '').toLowerCase().trim();
  return usage.filter((u) => {
    const modelOk = !models || models.length === 0 ? true : models.includes(u.model);
    const userOk = q ? (u.user || u.userName || '').toLowerCase().includes(q) : true;
    return modelOk && userOk;
  });
}

// PUBLIC_INTERFACE
export function deriveKPIs(usage /*, range */) {
  /** Computes total calls, avg daily active users (distinct users/day averaged), and distinct models */
  const totalCalls = usage.reduce((sum, r) => sum + (r.calls || 0), 0);
  const byDay = {};
  const models = new Set();

  usage.forEach((r) => {
    const dayKey = format(new Date(r.timestamp), 'yyyy-MM-dd');
    if (!byDay[dayKey]) byDay[dayKey] = new Set();
    byDay[dayKey].add(r.userId || r.user || r.userName);
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

// PUBLIC_INTERFACE
export function calcDailyCost(usage, range) {
  /** Calculates daily total cost from cost map and calls */
  const days = eachDayOfInterval({ start: range.start, end: range.end });
  const map = new Map(days.map((d) => [format(d, 'yyyy-MM-dd'), 0]));
  usage.forEach((r) => {
    const key = format(new Date(r.timestamp), 'yyyy-MM-dd');
    const rate = COST_PER_MODEL[r.model] ?? 0.001;
    const inc = (r.calls || 0) * rate;
    map.set(key, (map.get(key) || 0) + inc);
  });
  return Array.from(map.entries()).map(([date, cost]) => ({ date, cost }));
}

// PUBLIC_INTERFACE
export function calcDailyUserActivity(usage, range) {
  /** Unique users per day */
  const days = eachDayOfInterval({ start: range.start, end: range.end });
  const map = new Map(days.map((d) => [format(d, 'yyyy-MM-dd'), new Set()]));
  usage.forEach((r) => {
    const key = format(new Date(r.timestamp), 'yyyy-MM-dd');
    map.get(key)?.add(r.userId || r.user || r.userName);
  });
  return Array.from(map.entries()).map(([date, set]) => ({ date, users: set.size }));
}

// PUBLIC_INTERFACE
export function calcSuccessErrorSeries(usage, range) {
  /** Daily success/error split */
  const days = eachDayOfInterval({ start: range.start, end: range.end });
  const map = new Map(
    days.map((d) => [format(d, 'yyyy-MM-dd'), { success: 0, error: 0 }])
  );
  usage.forEach((r) => {
    const key = format(new Date(r.timestamp), 'yyyy-MM-dd');
    const entry = map.get(key) || { success: 0, error: 0 };
    if (r.status === 'error') {
      entry.error += r.calls || 0;
    } else {
      entry.success += r.calls || 0;
    }
    map.set(key, entry);
  });
  return Array.from(map.entries()).map(([date, { success, error }]) => ({
    date,
    success,
    error,
  }));
}

// PUBLIC_INTERFACE
export function topUsersByCalls(usage, limit = 8) {
  /** Aggregates total calls per user and returns top N */
  const map = new Map();
  usage.forEach((r) => {
    const key = r.user || r.userName || r.userId || 'unknown';
    map.set(key, (map.get(key) || 0) + (r.calls || 0));
  });
  return Array.from(map.entries())
    .map(([user, calls]) => ({ user, calls }))
    .sort((a, b) => b.calls - a.calls)
    .slice(0, limit);
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

// PUBLIC_INTERFACE
export function getAllModels() {
  /** Returns list of models for filter UI */
  return MODELS;
}

// PUBLIC_INTERFACE
export function getCostPerModelMap() {
  /** Returns cost-per-model map used for estimates */
  return { ...COST_PER_MODEL };
}
