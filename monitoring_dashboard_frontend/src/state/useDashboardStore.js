import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { getDefaultRange, toISODate } from '../utils/date';
import { fetchMetrics } from '../services/api';

// PUBLIC_INTERFACE
export const DashboardContext = createContext(null);

const initialRange = getDefaultRange('week');

const initialState = {
  dateRange: initialRange,
  metrics: {
    totalCalls: 0,
    avgUsers: 0,
    topModelsCount: 0,
    timeseries: [],
    models: [],
  },
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_RANGE':
      return { ...state, dateRange: action.payload };
    case 'LOAD':
      return { ...state, loading: true, error: null };
    case 'SUCCESS':
      return { ...state, loading: false, metrics: action.payload };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

/**
 * PUBLIC_INTERFACE
 * DashboardProvider manages date range and loads metrics from API (mock by default).
 */
export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load metrics when dateRange changes
  useEffect(() => {
    const load = async () => {
      try {
        dispatch({ type: 'LOAD' });
        const data = await fetchMetrics(
          toISODate(state.dateRange.start),
          toISODate(state.dateRange.end)
        );
        dispatch({ type: 'SUCCESS', payload: data });
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e.message || 'Failed to load metrics' });
      }
    };
    load();
  }, [state.dateRange.start, state.dateRange.end]);

  // PUBLIC_INTERFACE
  const setRange = (range) => dispatch({ type: 'SET_RANGE', payload: range });

  const value = useMemo(() => ({ ...state, setRange }), [state]);

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

// PUBLIC_INTERFACE
export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
}
