# Gen AI Usage Monitoring Dashboard (Frontend)

A lightweight React app implementing a monitoring dashboard for internal usage of Gen AI tools (e.g., AWS Bedrock). It includes mock authentication and a mock API for local development.

## Features

- Ocean Professional theme with modern UI
- Mock authentication (local only) with session persistence and 8h expiry
- Dashboard with:
  - KPI cards: Total Calls, Avg Users, Top Models
  - SVG sparkline chart (no heavy chart libs)
  - Top models list with percentage bars
- Date range filters: Previous Week, Previous Month, and Custom via native date inputs
- React Router v6 with protected route

## Getting Started

Install dependencies and run the app:

```bash
npm install
npm start
```

App runs on http://localhost:3000.

### Login

Use one of the mock users:
- admin@example.com
- viewer@example.com

Password must be at least 6 characters (mock validation only).

### Environment Variables

Create a `.env` (or copy from `.env.example`) in this folder to configure an external API:

- REACT_APP_API_BASE_URL: Base URL of your backend metrics API
- REACT_APP_API_TOKEN: Optional bearer token for the API

If `REACT_APP_API_BASE_URL` is not set, the app uses deterministic mock data locally.

### Scripts

- `npm start` – Dev server
- `npm test` – Tests
- `npm run build` – Production build

## Project Structure

- src/pages/Dashboard.jsx – Dashboard page
- src/pages/Login.jsx – Login page
- src/components/* – UI components (Header, KPICard, ModelUsageList, DateRangePicker, Chart, PrivateRoute)
- src/state/useAuth.js – Auth context and reducer (mock auth)
- src/state/useDashboardStore.js – Dashboard state (date range and metrics)
- src/services/api.js – API layer (uses mock when no base URL)
- src/services/auth.js – Local session persistence for mock auth
- src/mocks/mockData.js – Deterministic mock metrics generator
- src/utils/date.js – Simple date utilities

## Notes

- This project uses only React and react-router-dom to remain lightweight.
- No design framework; styles live in `src/App.css` and use CSS variables.
