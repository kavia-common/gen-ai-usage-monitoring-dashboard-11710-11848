# Gen AI Usage Monitoring Dashboard (React)

This app provides a modern, responsive dashboard themed with Ocean Professional:
- Header with right-aligned time-range filter (Previous Week, Previous Month, custom via date inputs)
- KPI cards for Total API Calls, Avg Daily Bedrock Users, Distinct Models Used
- Charts: Calls Over Time (area) and Model Distribution (bar)
- Recent activity table

All data comes from a mock data service (`src/services/mockData.js`) filtered by the chosen date range.

## Getting Started

- npm install
- npm start
Open http://localhost:3000

## Files of interest
- src/theme.js — theme variables and applyThemeToDocument()
- src/components/ — modular components (Header, DateRangePicker, KPISection, charts, table)
- src/services/mockData.js — mock data and metrics derivation
- src/utils/date.js — date helpers and range presets

## Future integration
Placeholders (fetchUsage, subscribeToUpdates) are provided to integrate the monitoring_dashboard_database at a later stage.

See also README-DASHBOARD.md for more detail.
