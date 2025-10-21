import { eachDay, toISODate } from '../utils/date';

const MODELS = [
  'anthropic.claude-3-sonnet',
  'anthropic.claude-3-haiku',
  'amazon.titan-text-lite',
  'meta.llama2-70b-chat',
  'mistral.mistral-large',
];

/**
 * Create deterministic pseudo-random number based on seed.
 */
function seeded(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/**
 * PUBLIC_INTERFACE
 * buildMockMetrics returns a consistent dataset for a given date range.
 */
export function buildMockMetrics(startISO, endISO) {
  const days = eachDay(new Date(startISO), new Date(endISO));
  const rand = seeded(days.length * 9973);

  const timeseries = days.map((d, idx) => {
    const base = 120 + Math.floor(60 * Math.sin(idx / 3)) + Math.floor(rand() * 40);
    return { date: toISODate(d), calls: Math.max(30, base) };
  });

  // Aggregate totals and averages
  const totalCalls = timeseries.reduce((a, b) => a + b.calls, 0);
  const avgUsers = Math.round(15 + rand() * 10);
  const topModelsCount = MODELS.length;

  // Model usage distribution
  let remaining = 100;
  const modelUsages = MODELS.map((name, i) => {
    const pct = i === MODELS.length - 1 ? remaining : Math.max(8, Math.floor(rand() * (remaining / 2)));
    remaining -= pct;
    return { name, percent: pct };
  }).sort((a, b) => b.percent - a.percent);

  return {
    totalCalls,
    avgUsers,
    topModelsCount,
    timeseries,
    models: modelUsages,
  };
}
