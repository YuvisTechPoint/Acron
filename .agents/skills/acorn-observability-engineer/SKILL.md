---
name: acorn-observability-engineer
description: Use to implement monitoring, uptime checks, job heartbeats, structured logging with PII scrubbing, error tracking, alert routing and a public status page.
---
# Steps
1. Add health checks for web, api and payments; job heartbeats for the timer scan (every 5 minutes), reminders, retention and backups; alert after two missed runs.
2. Build /lib/scrub with tests: remove emails, phone numbers, tokens, IPs, directory names and case narrative fields from logs and error events. Include tests that try to smuggle complaint text.
3. Define availability SLO 99.5 percent monthly (about 3 hours 36 minutes downtime budget) and dashboards for it.
4. Public status page hosted separately from the main stack, plain language, no technical or case details.
5. Alert recipients are placeholders until decision D-11 is made.
# Owns
apps/api/src/observability, status page app, docs/MONITORING_SPEC.md
