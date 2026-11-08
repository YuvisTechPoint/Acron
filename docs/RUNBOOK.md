# ACORN LEGAL CONSULTANTS: PLATFORM OPERATIONS & INCIDENT RUNBOOK

**Target Audience:** DevOps, SRE, and Systems Administrators  
**Author:** Acorn DevOps & SRE Agent (`acorn-devops-sre`)

---

## 1. Daily Health Checks & System Monitoring

- **Uptime Monitoring:** Verify HTTP 200 responses from `/`, `/services`, `/posh`, `/pay`, and `/api/requests`.
- **Background Worker Status:** Check BullMQ / background job processor heartbeats every 5 minutes.
- **Database Metrics:** Ensure MongoDB replica set lag is < 50ms and connection pool utilization is < 70%.
- **Redis Cache:** Verify eviction rate is zero and memory footprint is within nominal limits.

---

## 2. P1 Incident Response Procedure

A **P1 Incident** is declared when:
- Public website or client intake forms are unreachable.
- POSH portal or confidential IC cases are degraded or leaking access.
- Payment gateway is failing to verify transactions or issue receipts.

### Response Steps:
1. **Acknowledge:** On-call engineer acknowledges alert within 15 minutes.
2. **Triage & Isolate:** Inspect edge reverse proxy logs and container health:
   ```bash
   docker-compose ps
   docker-compose logs --tail=100 api
   ```
3. **Rollback (if post-deploy incident):** Re-route traffic to previous known-good deployment container. Target rollback time: < 30 minutes.
4. **Log Scrutiny:** Verify that no complaint narratives or client PII have been output to error traces (`/lib/scrub`).
5. **Post-Mortem:** Deliver incident post-mortem within 24 hours documenting root cause, impact duration, and remediation commits.

---

## 3. Database Backup & Disaster Recovery Drill

### Automated Daily Snapshots:
- Backups execute daily at 02:00 AM IST with AES-256 encryption.
- Backups are stored in secondary cloud region storage with 30-day retention.

### Restoration Drill:
1. Spin up an isolated staging test instance.
2. Restore database snapshot:
   ```bash
   mongorestore --archive=/backups/backup-latest.archive --gzip --drop
   ```
3. Run automated verification suite to validate audit trail hash chain integrity and tenant isolation.
4. Record restoration drill log in `/ops/dr-drills`.

---

## 4. Audit Hash Chain Tamper Verification
The platform enforces an append-only cryptographic hash chain on all administrative and POSH audit records. Each entry hashes the previous entry's checksum:
- Run integrity verifier:
  ```bash
  node scripts/verify-audit-chain.mjs
  ```
- If any divergence or broken link in the SHA256 chain is detected, system issues immediate high-priority alert to Managing Partner and locks compromised dockets.
