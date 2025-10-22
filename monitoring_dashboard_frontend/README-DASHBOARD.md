# Gen AI Usage Monitoring Dashboard (Frontend)

This dashboard implements:
- Header with right-aligned time-range filter (Previous Week, Previous Month, and custom via calendar/date inputs)
- KPI cards: Total API Calls, Avg Daily Bedrock Users, Distinct Models Used
- Charts: Calls Over Time (area), Model Distribution (bar)
- Recent activity table of usage records

Data is provided via a mock data service for now (no external services required).

## Run locally
- npm install
- npm start
Open http://localhost:3000

## Theme
Ocean Professional: blue primary (#2563EB), amber secondary (#F59E0B), rounded corners, subtle shadows, soft gradients.

CSS variables are applied in src/theme.js via applyThemeToDocument() and base styles in src/index.css.

## Future integration
See src/services/mockData.js for placeholders to connect to monitoring_dashboard_database in the future (fetchUsage, subscribeToUpdates).
