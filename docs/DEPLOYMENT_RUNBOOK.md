# ACORN LEGAL PLATFORM: PRODUCTION DEPLOYMENT RUNBOOK
**Document Version:** 3.0.0  
**Effective Date:** 2026-11-08  
**Classification:** Operational Security & SRE Architecture  
**Governing Standard:** Bar Council of India Regulations & POSH Act 2013 Section 16  

---

## 1. Overview & Operational Principles

This runbook outlines the standard operating procedure for deploying, verifying, and maintaining the **Acorn Legal Consultants Platform** in Staging and Production environments.

### Hard Rules Compliance
1. **Zero Live Credentials in Repo**: No real passwords, API secrets, private keys, or certificates are stored in source code or git history.
2. **Synthetic Data Policy**: Production databases and test environments never cross. All staging tests run strictly against synthetic fixtures.
3. **Statutory Confidentiality (Section 16 POSH Act)**: Loggers, error monitors, notifications, and analytics scrub all personal identifiable identifiers (PII). Real-time events carry only opaque IDs.
4. **Health-Monitored Zero Downtime Cutover**: Deployments utilize rolling container updates or blue/green cuts with internal health validation before receiving ingress traffic.

---

## 2. Pre-Deployment Verification Checklist

Before initiating any deployment, ensure the following commands pass with zero errors:

```bash
# 1. Typecheck the entire codebase
npx tsc --noEmit

# 2. Execute automated test suite (workflow tests, API tests, link crawlers)
npm test

# 3. Production standalone compilation
npm run build
```

---

## 3. Container Deployment (Docker / Docker Compose)

The application produces an unprivileged Alpine container via Next.js standalone tracing (~120 MB image).

### Staging Deployment:
```bash
# Clone or pull target release tag
git checkout v3.0.0-release

# Copy environment template
cp .env.example .env.production

# Build and start services in detached mode
docker-compose up -d --build

# Inspect container health
docker-compose ps
```

### Direct Docker Execution:
```bash
docker build -t acorn-legal-platform:v3.0.0 .
docker run -d \
  --name acorn-legal-web \
  -p 3000:3000 \
  --restart unless-stopped \
  --env-file .env.production \
  acorn-legal-platform:v3.0.0
```

---

## 4. Verification & Health Probing

Once the container is initialized, verify internal health via the `/api/health` probe:

```bash
curl -I http://localhost:3000/api/health
```

Expected HTTP Status: `200 OK`  
Expected Payload Structure:
```json
{
  "status": "healthy",
  "version": "3.0.0",
  "timestamp": "2026-11-08T15:35:00.000Z",
  "uptimeSeconds": 42,
  "environment": "production",
  "checks": {
    "store": "healthy",
    "servicesCount": 6,
    "postsCount": 3,
    "casesCount": 5,
    "memory": {
      "rssMb": 68,
      "heapUsedMb": 38,
      "heapTotalMb": 48
    }
  },
  "audit": {
    "piiScrubberActive": true,
    "sec16PoshCompliance": "ENFORCED",
    "disclaimerAppended": true
  }
}
```

---

## 5. Rollback Procedure

In the event of an unresolvable defect or health check failure:

1. **Tag Rollback**:
   ```bash
   # Revert to previous confirmed stable release tag
   git checkout v2.9.8
   ```

2. **Re-deploy Previous Image**:
   ```bash
   docker-compose up -d --no-deps acorn-app
   ```

3. **Verify Restored Endpoint**:
   ```bash
   curl http://localhost:3000/api/health
   ```

4. **Incident Postmortem**:
   Log incident in `/admin/ops/reliability` with root-cause analysis within 24 hours.

---

## 6. SRE & Support Contacts

- **Operations Desk**: ops@acornlegal.in
- **Statutory POSH Grievance Desk**: statutory-desk@acornlegal.in
- **Calcutta Chambers Physical**: Camac Street, Park Street District, Kolkata 700016

