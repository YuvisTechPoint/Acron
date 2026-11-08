---
name: acorn-devops-sre
description: Use for Docker Compose, CI pipeline, environments, backups, monitoring, background jobs, and release and rollback procedures.
---
# Steps
1. docker-compose for Mongo (replica set), Redis, Mailpit, MinIO and ClamAV; scripts to seed synthetic data.
2. CI: lint, type-check, unit and integration tests, secret scan, dependency audit, build, preview deploy, release approval gate.
3. BullMQ worker with a leader lock and the scheduled jobs from PRD section 27.6; job heartbeat and alerting after two missed runs.
4. Backups, restore drill script, monitoring and a status endpoint, per PRD sections 26.8 and 27. Write docs/RUNBOOK.md. Do not deploy to production.
# Owns
docker-compose files, CI config, apps/api/src/jobs, ops scripts
