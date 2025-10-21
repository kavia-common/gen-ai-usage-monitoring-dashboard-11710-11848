function addDays(date, delta) {
  const d = new Date(date);
  d.setDate(d.getDate() + delta);
  return d;
}

/**
 * PUBLIC_INTERFACE
 * getDefaultRange returns start/end Date objects for 'week' or 'month' ending today.
 */
export function getDefaultRange(kind = 'week') {
  const end = new Date();
  const start = kind === 'month' ? addDays(end, -29) : addDays(end, -6);
  start.setHours(0,0,0,0);
  end.setHours(0,0,0,0);
  return { start, end };
}

// PUBLIC_INTERFACE
export function toISODate(date) {
  const d = new Date(date);
  return d.toISOString().slice(0, 10);
}

// PUBLIC_INTERFACE
export function eachDay(start, end) {
  const days = [];
  const cur = new Date(start);
  cur.setHours(0,0,0,0);
  const last = new Date(end);
  last.setHours(0,0,0,0);
  while (cur <= last) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return days;
}
