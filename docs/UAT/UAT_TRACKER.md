# User Acceptance Testing (UAT) Master Tracker & Sign-Off Matrix

## UAT Execution Status: Ready for Final Human Sign-off

| Script ID | Persona / Role | Core Scenario | Expected Outcome | Status |
|---|---|---|---|---|
| UAT-PUB-01 | Prospective Client | Submit confidential consultation intake | Privilege warning displayed, intake ID generated, 200 OK | PASS |
| UAT-PUB-02 | Corporate Client | Online fee settlement via payment modal | Server order created, Razorpay modal opens, signature check | PASS |
| UAT-PUB-03 | Website Visitor | Realtime Chambers Geography Google Map | Interactive satellite/blueprint toggle, directions navigation | PASS |
| UAT-POSH-01 | Aggrieved Employee | File Section 9 POSH complaint | Calm mode, OTP draft signature, encrypted evidence upload | PASS |
| UAT-POSH-02 | IC Presiding Officer | View matter dockets and schedule inquiry | Mandatory conflict declaration gate, audit log updated | PASS |
| UAT-POSH-03 | External Member | Section 4(2)(c) Neutrality & Report Drafting | Statutory timeline tracked, recommendations drafted | PASS |
| UAT-ADM-01 | Managing Partner | Review live requests feed and audit logs | Instant real-time update, append-only hash chain verified | PASS |
| UAT-ADM-02 | Staff Administrator | Update practice area dockets & articles | Form validation, preview mode, zero layout shift | PASS |

## Entry Criteria:
- Zero open Critical or High defects: **MET**
- Lighthouse Accessibility score 95+: **MET**
- Performance budget (LCP < 2.5s, CLS < 0.1): **MET**

## Exit Sign-off Block:
- **Lead Quality Engineer**: Verified (Synthetic CI test suites passing)
- **Counsel Sign-off**: Pending final human counsel review of `docs/RULES_FOR_COUNSEL.md`
- **Managing Partner Approval**: Pending production release gate approval

