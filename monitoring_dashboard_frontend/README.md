# Gen AI Usage Monitoring Dashboard (React)

This app provides a modern, responsive dashboard themed with Ocean Professional:
- Compact header with FiltersBar (presets, custom date, model multi-select, user text filter)
- KPI cards for Total API Calls, Avg Daily Bedrock Users, Distinct Models Used
- Charts: Calls Over Time (area), Model Distribution (bar), Daily Cost Estimate, User Activity Trend, Success vs Error, Top Users by Calls
- Recent activity table
- Accessible and responsive UI with loading skeletons

All data comes from a mock data service (`src/services/mockData.js`) filtered by the chosen date range and user/model filters.

## Getting Started

- npm install
- npm start
Open http://localhost:3000

## Files of interest
- src/theme.js — theme variables and applyThemeToDocument()
- src/components/ — modular components (Header, FiltersBar, charts, table)
- src/components/ui — shared UI primitives (Skeleton, Badge)
- src/services/mockData.js — mock data and metrics derivation (status, userId/userName, cost-per-model map)
- src/utils/date.js — date helpers and range presets

## Future integration
Placeholders (fetchUsage, subscribeToUpdates) are provided to integrate the monitoring_dashboard_database at a later stage.

See also README-DASHBOARD.md for more detail.
