# Master Launch Programme: Acorn Legal Platform (Part 3)

Run the Acorn launch programme in six gated stages. Planning mode. After each stage: tests, walkthrough, screenshots, commit, then STOP for approval. Production deployment is never done from this editor.

## STAGE 8 OPERATIONS CONSOLE (parallel A to D)
- **Agent A**: command centre, KPIs, availability calculator (`/ops`).
- **Agent B**: go-live gate, UAT manager, release and feature flags (`/ops/gate`).
- **Agent C**: incident workflow, break-glass workflow, DR drill screens with audit-chain verifier (`/ops/dr`).
- **Agent D**: SOP register with recurrence engine, access review, privacy and vendor operations, payment operations (`/ops/sop`).

## STAGE 9 STAGING DEPLOYMENT (sequential)
- `acorn-deploy-engineer` builds infrastructure as code and the pipeline.
- `acorn-observability-engineer` adds monitoring, scrubber and status page.
- Deploy to staging only. Run smoke tests and a restore drill on staging.

## STAGE 10 UAT AND SECURITY CLOSURE (sequential, human-led)
- `acorn-uat-coordinator` prepares scripts and tracker (`docs/UAT/`).
- Humans run UAT. Agents fix defects by severity.
- Track penetration-test findings; Critical and High must be fixed and retested.
- `acorn-posh-confidentiality-reviewer` re-runs on the release candidate.

## STAGE 11 GO-LIVE PREPARATION (sequential)
- Complete the 17-item go-live checklist as evidence.
- Prepare production configuration names (no values), rollback plan, release notes, announcement text.
- Present the gate. STOP: a human performs the production deployment through the pipeline.

## STAGE 12 HYPERCARE (30 days, daily)
- Daily checklist run, defect triage by severity, warranty classification, training refreshers, weekly digest.
- Exit only when no S1 or S2 is open and the last 7 daily checks passed.
- Generate the closure report.

## STAGE 13 GROWTH AND ENHANCEMENTS (optional, flagged)
- `acorn-growth-seo-analyst` and `acorn-gapclosure-engineer` work from the approved backlog.
- Every enhancement behind a feature flag, default off.

