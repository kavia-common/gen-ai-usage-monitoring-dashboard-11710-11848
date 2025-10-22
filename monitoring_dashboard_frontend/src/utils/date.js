import { addDays, endOfDay, startOfDay, subDays, subMonths } from 'date-fns';

// PUBLIC_INTERFACE
export function getPreviousWeekRange() {
  /** Returns {start, end} for the previous 7 days including today */
  const end = endOfDay(new Date());
  const start = startOfDay(subDays(end, 6));
  return { start, end };
}

// PUBLIC_INTERFACE
export function getPreviousMonthRange() {
  /** Returns {start, end} for the previous 30 days including today */
  const end = endOfDay(new Date());
  const start = startOfDay(subDays(end, 29));
  return { start, end };
}

// PUBLIC_INTERFACE
export function formatISODate(d) {
  /** Formats a Date as yyyy-MM-dd for input[type="date"] values */
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// PUBLIC_INTERFACE
export function clampRange(start, end) {
  /** Ensures start <= end and clamps to whole day boundaries */
  let s = startOfDay(start);
  let e = endOfDay(end);
  if (s > e) [s, e] = [e, s];
  return { start: s, end: e };
}

// PUBLIC_INTERFACE
export function addDaysRange(range, days) {
  /** Shifts a range by N days */
  return {
    start: addDays(range.start, days),
    end: addDays(range.end, days),
  };
}
