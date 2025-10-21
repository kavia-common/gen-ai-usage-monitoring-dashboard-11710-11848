#!/bin/bash
cd /home/kavia/workspace/code-generation/gen-ai-usage-monitoring-dashboard-11710-11848/monitoring_dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

