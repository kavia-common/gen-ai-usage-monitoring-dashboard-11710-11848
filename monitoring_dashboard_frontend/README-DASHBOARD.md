# Gen AI Usage Monitoring Dashboard (Frontend)

This dashboard implements:
- Compact header with FiltersBar containing:
  - Presets (Previous Week, Previous Month)
  - Custom date range
  - Model multi-select
  - User text filter
- KPI cards: Total API Calls, Avg Daily Bedrock Users, Distinct Models Used
- Charts:
  - Calls Over Time (area)
  - Model Distribution (bar)
  - Daily Cost Estimate (bar, mocked from per-model cost map)
  - User Activity Trend (line, unique users/day)
  - Success vs Error rate (stacked bar)
  - Top Users by Calls (horizontal bar)
- Recent activity table of usage records
- Accessibility enhancements (ARIA labels, keyboard navigation for presets), and responsive design
- Loading skeletons for KPIs, charts, and table

Data is provided via an extended mock data service for now (no external services required).

## Run locally
- npm install
- npm start
Open http://localhost:3000

## Theme
Ocean Professional: blue primary (#2563EB), amber secondary (#F59E0B), rounded corners, subtle shadows, soft gradients.

CSS variables are applied in src/theme.js via applyThemeToDocument() and base styles in src/index.css.

## Mock data service
- src/services/mockData.js generates usage for the last ~60 days.
- Each record includes: timestamp, userId/userName, model, calls, tokens, and status (success/error).
- Cost-per-model map is defined and used to derive Daily Cost Estimate.
- Helpers include:
  - filterUsageByRange
  - filterUsageAdvanced (models multi-select + user query)
  - deriveKPIs, groupCallsByDate, groupCallsByModel
  - calcDailyCost, calcDailyUserActivity, calcSuccessErrorSeries, topUsersByCalls
  - getAllModels(), getCostPerModelMap()

## Screenshots (placeholders)
- docs/images/header-filters.png
- docs/images/kpis.png
- docs/images/charts-overview.png
- docs/images/table.png

## Future integration
See src/services/mockData.js for placeholders to connect to monitoring_dashboard_database in the future (fetchUsage, subscribeToUpdates).
