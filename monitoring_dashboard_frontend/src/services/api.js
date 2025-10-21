import { buildMockMetrics } from '../mocks/mockData';

/**
 * PUBLIC_INTERFACE
 * fetchMetrics returns metrics for the given start and end (YYYY-MM-DD).
 * If REACT_APP_API_BASE_URL is not set, returns deterministic mock data.
 */
export async function fetchMetrics(startISO, endISO) {
  const base = process.env.REACT_APP_API_BASE_URL;
  const token = process.env.REACT_APP_API_TOKEN;

  if (!base) {
    // Use mock
    return buildMockMetrics(startISO, endISO);
  }

  const url = new URL('/metrics', base);
  url.searchParams.set('start', startISO);
  url.searchParams.set('end', endISO);

  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API error ${res.status}: ${txt}`);
  }

  return res.json();
}
