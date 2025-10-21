import React, { useState } from 'react';
import { toISODate } from '../utils/date';

/**
 * PUBLIC_INTERFACE
 * DateRangePicker uses native date inputs; calls onApply with {start: Date, end: Date}.
 */
export default function DateRangePicker({ start, end, onApply }) {
  const [s, setS] = useState(toISODate(start));
  const [e, setE] = useState(toISODate(end));

  const apply = () => {
    const sd = new Date(s);
    const ed = new Date(e);
    if (isNaN(sd) || isNaN(ed) || sd > ed) return;
    onApply({ start: sd, end: ed });
  };

  return (
    <div className="form-row">
      <label>
        <div className="kpi-title">Start</div>
        <input className="input" type="date" value={s} onChange={(ev) => setS(ev.target.value)} />
      </label>
      <label>
        <div className="kpi-title">End</div>
        <input className="input" type="date" value={e} onChange={(ev) => setE(ev.target.value)} />
      </label>
      <div className="form-actions">
        <button className="btn btn-primary" onClick={apply}>Apply</button>
      </div>
    </div>
  );
}
