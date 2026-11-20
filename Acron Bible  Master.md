ACORN LEGAL CONSULTANTS
Master Build Bible
The complete build, design, engineering and operations playbook for the Acorn Legal Platform
Document: Acorn Legal Platform Master Build Bible, version 1.0
Source of truth: Acorn Legal Platform PRD v2.0
Tools covered: v0.dev, Antigravity (agents, sub-agents and skills), Claude Code or Cursor for the back end
Audience: Acorn partners, product owner, legal lead, delivery lead, designers and engineers

Document control
Item
Detail
Title
Acorn Legal Platform: Master Build Bible
Version
1.0 (working draft for approval)
Basis
Acorn Legal Platform PRD v2.0; PRD tables reproduced in the appendices are extracts
Owner
Product owner, Acorn Legal Consultants
Reviewers
Managing Partner, legal lead (counsel), tech lead, security lead
Status
Statutory numbers, templates, directory entries and legal text are marked for counsel to verify before use
Confidentiality
Internal working document. Contains no client or complaint data.


Version
Date
Change
0.1
Draft
Build order, Phase 0 prompts and back-end pack
0.5
Draft
v0 prompt library for Phases 1 to 7 added
0.8
Draft
Antigravity programme (constitution, 27 skills, workflows, commands) added
1.0
Current
Quality, security, operations and PRD appendices added; consolidated


Important. This document supports delivery. It is not legal advice. Statutory deadlines, notices, templates, retention periods, data-protection duties and the content of the helpline directory must be verified and approved by Acorn counsel before real use. Real complaint data must never be used in development, testing or agent runs.
Contents
Introduction and governance5
1. Purpose, audience and how to use this document5
2. The platform at a glance5
3. Toolchain and working model6
4. Governance: roles, gates and approvals7
5. Brand and design principles at a glance10
6. Document map10
Part A. Build order and plan11
A1. How the two build tracks fit together11
A2. Week-by-week build order11
A3. Dependencies that must not be broken12
A4. Open decisions (PRD Section 20)13
A5. Kick-off checklist (week 1) and go-live checklist14
A6. Scope, effort and budget reality check (PRD 17.2A and 28.4)14
Part B. Phase 0 prompts: kick-off and design foundations16
Prompt 0.1: Design system page (v0)16
Prompt 0.2: Wireframes for the 12 key screens (v0)16
Prompt 0.3: Content tracker (v0)17
Prompt 0.4: Decision log, kick-off checklist and CI reminder (coding agent)17
Part C. Back-end build pack (coding agent)18
B0. Agent rules (paste into CLAUDE.md or the editor rules file)18
B1. Monorepo scaffold and local environment18
B2. Platform baseline18
B3. Authentication, MFA and sessions18
B4. Permissions, audit chain and tenancy18
B5. Public and admin core API, files and email18
B6. Payments with Razorpay18
B7. Real-time layer18
B8. Admin engagement modules18
B9. Rules engine (packages/rules)21
B10. Complaint intake, routing and encryption22
B11. Case lifecycle, evidence, access and break-glass22
B12. Notifications and templates23
B13. Organisations, compliance, reports and retention23
B14. Subscriptions, LMS, surveys, service desk and legal console23
B15. Background jobs and schedules24
B16. Security, quality and disaster recovery24
B17. Front-end integration and cutover (run after each phase)25
Rules of engagement for the engineering team25
Part D. v0 prompt library: Phases 1 to 726
Phase 1: Premium public website26
Phase 2: Engagement and real-time admin28
Phase 3: POSH Basic and Standard31
Phase 4: POSH Advanced (multi-organisation)35
Phase 5: Service, support and training suite38
Phase 6: Operations and hypercare console (/ops)41
Phase 7: Gap closure (optional)44
Part E. Antigravity programme: agents, skills and workflows47
E1. Set-up and operating principles47
E2. Project constitution (.agents/AGENTS.md)48
E3. Design system (docs/DESIGN_SYSTEM.md)49
E4. Skills catalogue52
E5. Skill files (full text)54
E6. Workflows62
E7. Step-by-step commands64
Part F. Quality, security and testing strategy69
F1. Test strategy69
F2. Scenario suites from the PRD70
F3. Security controls and threats74
F4. Accessibility, performance and quality requirements80
F5. Privacy and data protection82
F6. Definition of ready and done82
Part G. Launch and operations playbook83
G1. Launch sequence83
G2. Go-live checklist (17 items)83
G3. User acceptance testing84
G4. Release, rollback and feature flags84
G5. Hypercare and warranty85
G6. Monitoring, service levels and support85
G7. Incident management, break-glass and disaster recovery88
G8. SOP register and recurring duties91
G9. KPIs for the first six months94
Appendices: reference extracts from the PRD95
R1. Case lifecycle, timers and rules96
R2. Roles, permissions and confidentiality103
R3. Notifications and document templates106
R4. Compliance, services and learning109
R5. Architecture, data and API115
R6. Remedies, sectors, party rights and legal sources127
R7. Delivery planning135
R8. Design system and screen inventories139
R9. Reference144
Introduction and governance§§BODY§§
1. Purpose, audience and how to use this document
This Master Build Bible turns the Acorn Legal Platform PRD (v2.0) into an executable programme. It answers four practical questions: what do we build and in what order, which tool builds each part and with what prompt, who approves what, and how do we prove it is safe to launch and keep it safe afterwards.
Reader
Start here
What you will use
Managing Partner and product owner
Introduction, Part A, Part G
Scope scenarios, decisions, gates, go-live checklist, hypercare
Legal lead and counsel
Part A section A4, Part F, Appendices R1 to R3
Decisions to settle, rules to verify, confidentiality controls, notices and templates
Designers
Part B, Part D, Appendix R8
Design system, wireframe prompts, screen inventories
Front-end engineers
Part D, Part E, Appendix R8
v0 prompt library, Antigravity programme, screen inventories
Back-end engineers
Part C, Appendices R1 to R5
Back-end prompts B0 to B17, state machine, timers, events, jobs, endpoints
QA and security
Part F, Appendix R2
Test strategy, scenario suite, threat tables, severity definitions
DevOps and support
Part G, Appendix R6
Environments, SOP register, incident workflow, SLAs, monitoring


How to use the prompts. Every prompt in this document is written to be pasted into the named tool as it is. Replace anything in [square brackets]. Approve each plan before an agent writes code, and keep one git commit per approved stage so any stage can be rolled back.
2. The platform at a glance
The platform has three faces: a premium public website for Acorn Legal Consultants, a staff admin console, and a confidential POSH (Prevention of Sexual Harassment) compliance and case-management portal used by complainants, respondents, Internal Committee members and client organisations.
2.1 Portals and audiences
Portals defined in the PRD
Portal
Users
Purpose
Public POSH information
Anyone
Landing page, FAQs, checklists and contact. No case data.
Complaint portal
Complainants (employees)
Secure complaint filing and tracking, with or without an account (see 8.4)
IC workspace
IC Presiding Officer, members, external member
Case management for assigned cases only
Organisation console
Organisation Admin
IC roster, policy, training, notice displays, aggregate statistics and annual report. No case content.
Acorn POSH console
POSH Administrator, Super Admin
Onboard organisations, oversee timelines, support IC, produce reports, manage templates and training library


2.2 Delivery phases
Phase
Name
Weeks
Main deliverables
Exit gate
0
Foundation
W1
Kick-off, decisions, wireframes, design direction, environments, project plan
Kick-off checklist signed
1
Public site and core admin
W2 to W4
Premium website, service requests, Q&A, blog, scripts control, Razorpay payments, basic admin
Phase 1 UAT and go-live
2
Engagement and real-time admin
W5 to W7
Live alerts (Socket.io), Q&A moderation, full RBAC, audit logs, notification centre, reports, campaign pages
Alert under 5 seconds; role tests pass
3
POSH Basic and Standard
W8 to W12
Complaint intake, routing, case workflow and timers, notices, hearings, evidence vault, report, appeal, retention, break-glass
40 timeline scenarios pass; counsel sign-off
4
POSH Advanced
W13 to W16
Multi-organisation tenancy, policy library, compliance score, annual report, analytics, retention, integrations, bilingual interface
Tenant isolation tests pass
5
Service, support and training
W17 to W21
Service catalogue and subscriptions, helpdesk, directory, LMS, surveys, aftercare, Legal Console, penetration test retest
No Critical or High findings open
6
Hypercare
W22 to W25
30 days of daily checks, defect triage, warranty tracking, training refreshers, closure report
Hypercare exit test
7 (optional)
Gap closure
After go-live
Remedies page, sector overlays, party charters, amendment sandbox, flagged enhancements
Change-control sign-off


2.3 What the PRD treats as out of scope
A native mobile app, installable web app behaviour, and automatic SMS or WhatsApp messaging are not required unless agreed through change control (Phase 7 covers them behind feature flags).
The platform records and routes information. It does not give legal advice, decide complaints or replace the Internal Committee.
No testimonials, results, rankings or guarantees may appear on the website (Bar Council advertising rules).

3. Toolchain and working model
Tool
Role in this programme
Used for
v0.dev
Design track: generates working Next.js, Tailwind and shadcn/ui screens with mock data
Phases 0 to 7 prompt library (Part D): website, admin, POSH portals, consoles
Antigravity (Google)
Agent-first editor with skills, sub-agents, workflows and a browser agent
Redesigning the existing Next.js site, building the application layer in gated stages (Part E)
Claude Code or Cursor
Engineering track: builds the real MERN back end from the B-series prompts
API, authentication, rules engine, payments, jobs (Part C)
Git and CI
Source control, branches per stage, automated tests and scans
Every change; release approval gate
Humans
Counsel, product owner, security lead, finance
Legal approval, penetration test, credentials, UAT, production deployment


3.1 Two build tracks
The design track produces the working front end first. The engineering track then builds the real back end that those screens call. Design runs about one week ahead, and the engineering team does not start a screen until the design track has produced its API contract document. In Antigravity, the same agents can do both, but the rule still holds: contracts first, then implementation.
3.2 Branching and release discipline
main is always deployable. Work happens on short-lived branches such as redesign/home or app/stage-5-intake.
One approved stage equals one pull request equals one tagged commit. Tag names: pre-redesign, pre-application, v1.0.0 and so on.
Parallel agents work on separate folders (ownership rules in Part E) and merge in a fixed order, re-running the build after each merge.
Security-critical code (authentication, encryption, case access, rules engine, payments, break-glass, retention, export) needs two human reviewers.

3.3 Environments (PRD Section 27)
Environment
Purpose
Data
Access
Deployment
Local
Developer machines (Docker Compose: MongoDB replica set, Redis, mail catcher, object storage emulator)
Synthetic seed data only
Developer
Manual
CI
Automated build and tests
Synthetic
Pipeline
On every pull request
Development
Shared integration
Synthetic
Team
Automatic from the main branch
Staging
Production-like for UAT, penetration test and load test
Synthetic or masked; never real POSH data
Team, Acorn reviewers
Release candidate tag
Production
Live
Real
Named operators with MFA
Approved tag, manual approval gate


4. Governance: roles, gates and approvals
4.1 Stage gates
Gate
Milestone
Evidence required
Approvers
G0
Kick-off complete
Kick-off checklist signed; D-1, D-8, D-14 decided; wireframes approved
Product owner and project lead
G1
Phase 1 go-live
UAT signed; no open S1 or S2; payments tested in test mode; legal pages approved; request alert works
Product owner and legal lead
G2
Phase 2 accepted
RBAC and authorisation tests pass; live alert in under 5 seconds; audit log verified
Product owner and security lead
G3
POSH legal readiness
40 timeline scenarios pass; every number in the rules file verified; confidentiality review has no High findings
Counsel and security lead
G4
Multi-organisation readiness
Tenant isolation tests pass for every service; compliance score examples reproduced; annual report reviewed
Legal lead and product owner
G5
Services and support ready
LMS, surveys, service desk SLA tests pass; Legal Console blocks a failing rule set; Critical and High pen-test findings closed and retested
Security lead and product owner
G6
Production go-live
All 17 checklist items signed; restore drill within targets; counsel approval of templates; two approvers
Managing Partner and project lead
G7
Hypercare exit
30 days complete; no open S1 or S2; last 7 daily checks passed; handover accepted
Managing Partner


4.2 Responsibilities that never move to an agent or a tool
Responsibility
Owner
Why
Approve rule sets, notices, templates and disclaimers
Counsel
Legal accountability
Break-glass approval (two approvers, two-hour maximum)
Managing Partner and second reviewer
Confidentiality of complaint content
Production credentials, keys and deployment approval
Tech lead and project lead
Two-person control
External penetration test and retest
External tester
Independence
Razorpay live activation and the real payment and refund test
Finance with developer
Identity documents and money
Running and signing UAT
Named Acorn testers
Acceptance accountability
Responses to regulators and data-protection notifications
Counsel
Scope depends on legal reading
Verifying helpline and directory entries
POSH Administrator
Must be current to protect people
Handling any real complaint content
Authorised IC members and Acorn staff under undertakings
Statutory confidentiality


4.3 Change control
Anything that is not in the PRD and the agreed scope is a change request with its own estimate, owner and approval.
Each phase includes one consolidated round of design revisions and one round of functional corrections after UAT. Further rounds are chargeable.
Enhancements ship behind feature flags that default to off and are switched on per organisation after sign-off.
A decision left Open past its needed-by date takes the PRD default and is recorded. Decisions that affect law or confidentiality cannot be defaulted without counsel (D-23, D-24, D-25).


4.4 Delivery RACI (PRD Section 28)
RACI for delivery activities
Activity
Product owner
Delivery lead
Tech lead
QA
Legal lead
Security lead
Scope and priorities
A
R
C
I
C
I
Rule parameters and templates
A
I
C
I
R
I
Architecture and security design
I
I
A/R
C
I
R
Build and code review
I
I
A/R
C
I
C
Test plan and execution
I
C
C
A/R
C
C
UAT and sign-off
A
R
C
R
R
C
Penetration test and fixes
I
C
R
C
I
A
Go-live decision
A
R
C
C
C
C
Incident response
I
C
R
C
C
A


4.5 Delivery risks (PRD)
Delivery risk register
ID
Risk
Likelihood
Impact
Mitigation
Owner
DR-01
Scope is larger than the budget
High
High
Phased funding; Section 28.4 scenarios; change control
Product owner
DR-02
Legal rules misread or outdated
Medium
High
Counsel sign-off on rule parameters; rules console; watch list
Legal lead
DR-03
Late decisions on open items
High
Medium
Decision log with dates; defaults in Section 20
Delivery lead
DR-04
Security weakness in case access
Low
Critical
Authorisation matrix tests; review; penetration test
Security lead
DR-05
Translation quality
Medium
Medium
Reviewer for Bengali and Hindi; glossary
UX lead
DR-06
Third-party delays (Razorpay approval, DLT registration, email domain)
High
Medium
Start applications in week 1
Delivery lead
DR-07
AI-generated code defects
Medium
High
Human review on sensitive code; high test coverage
Tech lead
DR-08
Key person dependence
Medium
Medium
Documentation, pairing, deputies
Delivery lead
DR-09
Data migration or import errors
Medium
Medium
Validation reports; dry runs
Tech lead
DR-10
Pilot organisation not available
Medium
Medium
Use synthetic organisation; run UAT with Acorn staff
Product owner
DR-11
Regulatory change during the build (DPDP dates, new orders)
Medium
Medium
Parameters not code; backlog buffer of 5 percent
Legal lead
DR-12
Performance under load on report generation
Low
Medium
Queues and load test in week 20
Tech lead



5. Brand and design principles at a glance
The full design system is in Part E (docs/DESIGN_SYSTEM.md) and Part B (Phase 0 prompts). In short, the site follows a "Quiet Authority" identity: deep navy, warm ivory and brass, editorial typography, arch-shaped image masks, restrained and purposeful motion, and no pop-ups.
Token
Value
Use
Navy primary
#1F3864
Buttons, headings, brand surfaces
Navy deep
#14264A / #07101F
Hero and footer backgrounds
Blue hover
#2F5496
Hover and link colour, focus ring
Brass
#B08D57 (text-safe #8A6B3A)
Rules, icons, small labels, one accent word per headline
Ivory
#FBF9F4
Default page background
Ink and slate
#1B1F27 / #5B6573
Body and secondary text
Fonts
Cormorant Garamond and Inter
Display serif and interface sans, self-hosted


5.1 Trauma-informed rules for POSH screens
A Quick Exit button on every complainant and respondent page, and neutral page titles.
Calm colours, no red alarm styling, no urgency language, no countdown timers, no pop-ups.
Every step says what happens next, who will see the information and how long it takes.
Nothing is submitted until the person confirms a plain-language review screen.
No questions about clothing, behaviour or history. Optional fields are marked and skippable.

6. Document map
Part
Title
Contents
A
Build order and plan
Week-by-week order, dependencies, decisions, checklists, budget reality check
B
Phase 0 prompts
Design system, wireframes, content tracker, decision-log tool
C
Back-end build pack
Agent rules and prompts B0 to B17, jobs, events
D
v0 prompt library
Phases 1 to 7 prompts for the design track
E
Antigravity programme
Constitution, 27 skills, workflows and the full command list
F
Quality, security and testing
Test strategy, scenario suite, security controls, accessibility and performance gates
G
Launch and operations
Go-live, UAT, release, hypercare, SOPs, incidents, disaster recovery, KPIs
Appendices
Reference extracts from the PRD
State machine, timers, routing, permissions, notifications, templates, API, events, jobs, screens, glossary


Part A. Build order and plan
A1. How the two build tracks fit together
The platform is built on two tracks that run in parallel. The design track uses v0.dev to produce the working front end with mock data. The engineering track uses a coding agent (Claude Code, Cursor or similar) to build the real MERN back end that the screens will call. The prompts for the design track are numbered by phase (for example "Phase 3, Prompt 7"). The back-end prompts in Part C are numbered B0 to B17.
Design runs one week ahead. The back-end team does not start a screen until v0 has produced that screen and its API contract document (the /docs files the final prompt of each phase generates).
The PRD is the source of truth. Attach the PRD to every back-end prompt. Where a v0 screen and the PRD disagree, the PRD wins and the screen is fixed.
Security-sensitive code always gets human review. Authentication, encryption, case access, payments and the rules engine need line-by-line review and tests before merge (PRD 28.2).
Real complaint data never leaves production. All other environments use synthetic data (PRD 27.1).

One inconsistency in the PRD. Section 16.1 names Phase 2 "Engagement and real-time admin", but the weekly plan in Section 28.3 puts organisation onboarding, the compliance score and the service catalogue in weeks 5 to 7 under the same label. This playbook follows Section 16.1 for phase names and uses dependency order for what actually gets built when. The tenancy and permission foundations (B4) are built early so that nothing has to be reworked later.
A2. Week-by-week build order
Weeks follow PRD Section 16.1 and 28.3. "Ph3 P7" means Phase 3, Prompt 7. Phase 7 is the optional gap-closure pack (remedies, sector overlays, charters, amendment sandbox, and two enhancements).
Week
PRD phase
Design track (v0 prompts)
Engineering track (Part C)
Decisions, sign-offs and exit check
W1
0
Part B: 0.1 design system, 0.2 wireframes, 0.3 content tracker
B0 agent rules, B1 scaffold, B2 platform baseline, Part B 0.4 decision log
D-1, D-8, D-14 at kick-off. Kick-off checklist signed. Wireframes approved.
W2
1
Ph1 P0 to P3 (rules, layout, homepage, About)
B3 authentication, B4 RBAC, audit and tenancy
D-2 before deployment. Login and role tests pass.
W3
1
Ph1 P4 to P7 (services, POSH landing, blog, FAQ)
B5 public and admin core API, files, email
D-9, D-17 before content freeze. D-11 named recipients. Request alert in under 5 seconds.
W4
1
Ph1 P8 to P11 (request form, contact and pay, legal pages, polish)
B6 payments, then B17 integration for Phase 1
D-3 before payments. Phase 1 UAT sign-off and go-live.
W5
2
Ph2 P0 to P5 (admin system, login, dashboard, requests, Q&A, blog)
B7 real-time layer
D-7 (SMS or WhatsApp) and D-26 (NCW advisory) decided. Alert and RBAC tests pass.
W6
2
Ph2 P6 to P12 (campaign pages, users, notifications, reports, audit, settings, polish)
B8 admin engagement modules
Q&A moderation and audit log tests pass.
W7
2
Ph3 P0 and P1 (design ahead: portal rules and core engine)
B17 integration for Phase 2, Phase 2 UAT
Phase 2 UAT sign-off.
W8
3
Ph3 P2 to P4 (portal home, complaint form, complainant area)
B9 rules engine, scenarios 1 to 20
D-4, D-5, D-13, D-15 decided. Scenario tests 1 to 20 pass.
W9
3
Ph3 P5 to P7 (respondent, IC home, case file and triage)
B10 intake, routing, encryption
D-6, D-16, D-22, D-24 decided. Routing tests RT-01 to RT-21 pass.
W10
3
Ph3 P8 to P10 (conciliation and notices, hearings and evidence, findings)
B11 case lifecycle, part 1: state machine, access, declarations
D-18, D-20, D-25 decided. Authorisation matrix tests pass.
W11
3
Ph3 P11 and P12, Ph7 P1 (organisation console, audit, remedies)
B11 part 2: notices, hearings, evidence, conciliation. B12 notifications
D-23 decided. Document custody tests pass.
W12
3
Ph3 P13 (polish and tests)
B11 part 3: reports, appeals, retention, legal hold, break-glass, export
All 40 scenarios pass. Phase 3 UAT and legal sign-off. D-10 pen test booked.
W13
4
Ph4 P0 to P3 (tenancy, onboarding, plans, directory)
B13 organisation, compliance and reports, part 1
D-12 (HRMS) and D-19 (annual report format) decided. Tenant isolation tests pass.
W14
4
Ph4 P4 to P7 (policies, notices, training, compliance score)
B13 part 2, B12 finish (notification matrix and templates)
Score matches the worked examples. Content-free lint passes.
W15
4
Ph4 P8 to P11 (annual report, analytics, retention, integrations), Ph5 P12 (Legal Console)
B13 part 3, legal console APIs from B14
Rule activation workflow works with dual approval.
W16
4
Ph4 P12 and P13 (bilingual, polish)
B16 security hardening, pen test preparation
Accessibility audit. Pen test scheduled.
W17
5
Ph5 P0 to P4 (plans, LMS authoring, assignments, sessions)
B14 part 1: catalogue, subscriptions, LMS
D-21 (plans and pricing) decided. Certificate verification works.
W18
5
Ph5 P5 to P8 (surveys, risk, helpdesk, on-call)
B14 part 2: surveys, service desk, SLA
Report counts reconcile. SLA timers correct across holidays.
W19
5
Ph5 P9 to P11 (aftercare, directory, assistant), Ph7 P2 and P3 (overlays, charters)
B14 part 3: directory, assistant, aftercare, overlays
Legal sign-off on overlays, charters and assistant content.
W20
5
Ph5 P13 and P14 (offboarding, quality gates)
B16 pen test fixes, load test, restore drill, DR
No Critical or High findings open. Restore drill within RTO.
W21
5 and 6
Ph5 P15 and P16, Ph6 P2 to P4 (go-live gate, UAT manager, releases)
B15 jobs verified, B17 cutover to production
Full UAT with a pilot organisation. Go-live approval by two approvers.
W22 to W25
Hypercare
Ph6 P5 to P15 (hypercare, monitoring, incidents, break-glass, DR, SOPs, privacy, payments ops, handover, closure)
Defect fixing, monitoring wiring, knowledge transfer
Daily checks for 30 days. Handover accepted. Closure report signed.
After
Optional
Ph7 P0, P4 to P7 (amendment sandbox, messaging and PWA enhancements)
Only after change-control sign-off
Feature flags stay off until approved.


A3. Dependencies that must not be broken
Item
Must be finished first
Why
Every POSH screen (Ph3 P2 to P12)
Ph3 P1 core engine (state machine, timers, routing, permissions)
All screens call the engine. Without it each page invents its own rules.
B9 to B11 (rules engine and case lifecycle)
B4 (permissions, audit, tenancy)
Case access and audit cannot be added afterwards without rework.
Ph4 P2 to P11 (organisation features)
Ph4 P1 tenancy layer, and B4 tenant scoping
Isolation tests must exist before any organisation data is stored.
Ph5 P2 (LMS "change in law" flag)
Ph5 P12 Legal Console
The flag reads rule-set and template changes from the console.
Ph6 P2 (go-live gate)
Ph5 P14 quality tracker
The gate reads pen test and tenant test results.
Ph7 P2 (overlays)
Ph5 P12 governance model
Overlays reuse versions, effective dates and dual approval.
B12 notifications
B9 and B11
Templates use timers and case events; the content-free lint applies to every message.
B17 integration for each phase
The back-end prompts of that phase
The mock service layer is replaced only when the real endpoint passes its contract test.


A4. Open decisions (PRD Section 20)
If a decision is not made by its date, the default in the PRD applies and is recorded. Decisions D-23, D-24 and D-25 affect law or confidentiality and cannot be defaulted without counsel confirmation (PRD 28.7).
ID
Decision
Owner
Needed by
Blocks
D-1
Public site rendering: Next.js or React SPA with pre-rendering (recommended: Next.js)
Project lead and Acorn
Kick-off
Front-end structure
D-2
Hosting choice (India VPS, managed cloud or hybrid) and account owner
Acorn
Before Phase 1 deployment
B1, B17
D-3
What payments cover (packages, ad hoc invoices or both) and GST on receipts
Acorn and accountant
Before Phase 1 payments
B6
D-4
POSH as a managed service (recommended) or self-service platform
Acorn
Before Phase 3
Role model, onboarding
D-5
Complainant identity: verified account, one-time link or pseudonymous first contact
Acorn legal team
Before Phase 3
B10
D-6
Retention periods for each data class, including POSH records
Acorn legal team
Before Phase 3
Retention engine
D-7
SMS or WhatsApp needed, and which provider
Acorn
Before Phase 2
B12, Ph7 P5
D-8
Languages: English only, or with Bengali and Hindi
Acorn
Before design sign-off
All microcopy
D-9
Team or advocate profiles on the website and what may be said
Acorn legal team
Before content freeze
About page
D-10
External penetration test before POSH launch
Acorn
Before Phase 3
Go-live gate
D-11
Named recipients of admin alerts and the grievance officer
Acorn
Before Phase 1 go-live
Notifications
D-12
HRMS integration in the first year
Acorn
Before Phase 4
Ph4 P3, P11
D-13
Source of holiday calendars (West Bengal and central)
Acorn
Before Phase 3
Timer accuracy
D-14
Brand assets, tone of voice and reference sites
Acorn
Kick-off
Design system
D-15
Anchor date of the 90-day inquiry period
Acorn legal team
Before Phase 3
Rules engine default
D-16
Policy for complainants who are not women (non-statutory track)
Acorn legal team
Before Phase 3
Routing RT-09
D-17
Bar Council advertising Rule 36 and Acorn staff status
Acorn partners
Before content freeze
Website content
D-18
External member panel, fees and conflict policy
Acorn partners and counsel
Before Phase 3
IC independence
D-19
Annual report due date and format (District Officers)
Acorn legal team
Before Phase 4
Ph4 P8
D-20
Intake Counsellor role and whether they may view complaint content during assisted filing
Acorn partners
Before Phase 3
Permission matrix
D-21
Plan structure, prices and billing method (Razorpay Subscriptions or invoices)
Acorn partners and accountant
Before Phase 5
Ph5 P1
D-22
Minor complainants and child-protection reporting duty
Acorn legal team
Before Phase 3
Routing RT-13
D-23
Evidence retention and litigation hold default
Acorn legal team
Before Phase 3
Retention jobs
D-24
Hosting region and sub-processors acceptable to clients
Acorn
Before Phase 3
Contracts, DPDP
D-25
Gig and platform workers: statutory or non-statutory track
Acorn legal team
Before Phase 3
Overlay SCT-09
D-26
NCW advisory of June 2026: binding duty or good practice in the score
Acorn legal team
Before Phase 2
CMP-21 to CMP-23


A5. Kick-off checklist (week 1) and go-live checklist
Kick-off checklist (PRD 28.8)
Go-live checklist (PRD 28.8)
Signed scope, price, change control and confidentiality terms
All Section 14 acceptance criteria met and signed by the product owner
Product owner and legal lead named; decision meeting schedule fixed
40 timeline scenarios and all authorisation tests pass in the release candidate
Domain, DNS access, brand assets, About Us and service content received
Penetration test Critical and High findings closed and retested
Razorpay account application started
Backup restore drill and incident exercise completed
Email sending domain and SPF, DKIM, DMARC planned; alert mailbox decided
Rule set approved by two approvers; holiday calendars loaded for this and next year
SMS sender registration (DLT) started for content-free templates
Templates DOC-01 to DOC-38 and notices P-01 to P-40 approved by counsel
Cloud accounts created in an India region; billing owner named
Directory and helpline entries verified with dates
Repository, CI, project board and communication channels created
Privacy notice, terms, cookie notice and POSH confidentiality notice published
Decisions D-1 to D-10 made or defaulted
Service contract pack, data processing terms and undertakings approved by counsel
Pilot organisation identified or synthetic organisation agreed
Production keys, secrets, DNS, TLS, WAF and monitoring verified
Content owner and approval workflow for blog and Q&A named
Razorpay live mode tested with a small real payment and refund


A6. Scope, effort and budget reality check (PRD 17.2A and 28.4)
The PRD backlog has 142 user stories and 755 story points across 19 epics. At a conservative 3 to 5 hours per point with AI-assisted coding, that is roughly 2,300 to 3,800 hours before testing, security and legal review. The PRD offers three scenarios:
Scenario
Scope
Effort
Indicative price at market rates
A. Lean
Phase 1 only: website, admin, request alerts, Q&A, blog and scripts, Razorpay
About 350 to 600 hours with AI assistance
INR 13,000 to 90,000, depending on who builds it
B. Standard
Phases 1 and 2 plus POSH intake and a simple case tracker (no full rules engine)
About 1,200 to 1,800 hours
INR 3 to 6 lakh; legal timers are manual
C. Full
All phases of the PRD
About 2,800 to 4,500 hours including testing and security
INR 10 to 25 lakh


Decide this before spending prompt credits. The prompt packs build Scenario C. If the real budget is the ultra-low figure discussed at the start, only Scenario A (Phases 1 and the matching back-end prompts B0 to B6) is realistic. The POSH module handles highly sensitive complaint data and statutory deadlines, so it should not be built on a shortcut budget or launched without legal review and a penetration test.
Part B. Phase 0 prompts: kick-off and design foundations
Phase 0 is week 1 of the PRD plan. Its deliverables are approved wireframes and design direction, a project plan, a decision log and working environments. Prompts 0.1 to 0.3 go into v0.dev. Prompt 0.4 goes to the coding agent. Create the v0 project for the public website first and paste the Phase 1 Prompt 0 design rules into its Project Instructions before sending 0.1.
Prompt
Tool
Output
Approval needed
0.1
v0.dev
Design system page with tokens, components and microcopy
Acorn product owner approves the look (D-14)
0.2
v0.dev
Low-fidelity wireframes for 12 key screens
Product owner and legal lead approve flows
0.3
v0.dev
Content tracker for pages, copy and approvals
Content owner named (kick-off checklist)
0.4
Coding agent
Decision log, kick-off checklist and CI reminder in /docs
Decisions D-1 to D-10 made or defaulted


Prompt 0.1: Design system page (v0)
Build a /design-system page that documents the visual system for Acorn Legal Consultants (premium legal consultancy, Kolkata). It is the single reference for every later screen.
 
SECTIONS (each with a sticky side navigation):
1. Colour tokens as large swatches with hex and usage rules: navy #1F3864, navy-deep #14264A, blue-hover #2F5496, gold #B08D57 (sparingly), ink #1B1F27, slate #5B6573, border #D5DAE3, surface #F6F7F9, white, plus success #1E7B4F, warning #B7791F, danger #B42318, info #1F5FA8. Show each text-on-background pair with its contrast ratio and a pass or fail chip for WCAG AA.
2. Typography: Cormorant Garamond for headings, Inter for body and UI. Show the scale 14, 16, 18, 20, 24, 30, 36, 48, 64 with real sample text, line-height 1.6 and the 70-character line-length rule.
3. Spacing, radius (6px inputs and buttons, 10px cards), the two shadows, and the 12-column grid at 360, 768, 1024 and 1280 widths.
4. Components in every state (default, hover, focus, disabled, error, loading): buttons (primary, secondary, ghost, destructive), inputs, selects, checkboxes, radios, textarea with counter, file upload, tabs, accordion, cards, status badges (always with icon and text), alerts, toasts, modals, tables, pagination, breadcrumbs, stepper.
5. Patterns: empty state, loading skeleton, error state, success confirmation with reference ID, form layout with inline validation, and a calm "trauma-informed" variant (no red, soft amber for errors, kind wording).
6. Microcopy samples in English, Bengali and Hindi for: button labels, errors, confirmations, "Save and exit", and a neutral notification.
7. Accessibility notes: 3px focus ring #2F5496 with 2px white offset, minimum 44px touch targets, reduced-motion behaviour, skip link.
 
Keep the page itself a good example of the system: generous whitespace, thin gold dividers under eyebrow labels, no stock images.
Prompt 0.2: Wireframes for the 12 key screens (v0)
Create /wireframes with a low-fidelity, greyscale wireframe for each screen below, shown in a desktop frame and a 360px mobile frame side by side. Use boxes, grey placeholder blocks, real labels and short real microcopy, no colour except a single navy for primary actions. A toggle shows annotations: numbered callouts explaining purpose, key rules and the permission or requirement each element supports (use placeholders like [REQ-ID] where the ID is unknown).
 
SCREENS: (1) public homepage; (2) service request form; (3) admin real-time dashboard; (4) service request detail with conversation and timeline; (5) POSH applicability wizard question screen; (6) complaint form step with review screen; (7) IC case file overview with timers and available actions; (8) organisation console home with compliance score; (9) helpdesk ticket detail with SLA timers; (10) learner course player on mobile; (11) complainant "my case" status page (stage names only); (12) go-live gate screen.
 
For each screen add a "States" strip showing empty, loading and error variants. Add a sitemap diagram page (/wireframes/sitemap) covering the public site, admin panel, POSH portals and the Acorn consoles, with arrows for primary journeys. Keep it clean, printable and easy to comment on.
Prompt 0.3: Content tracker (v0)
Build /content-tracker, an internal table app for managing website and portal content.
 
Data: one row per page or content item (home, about, each service page, POSH page, FAQ answers, blog posts, legal pages, email templates, notice templates, microcopy in English, Bengali and Hindi). Columns: item, section, content owner, source (supplied by Acorn, drafted by us, legal text), status (Not started, Drafted, Legal review, Approved, Published), reviewer, due date, language versions complete (EN, BN, HI), and notes.
Features: filters and search, status summary tiles with counts, an overdue indicator, bulk status change, CSV import and export, and a "Content freeze" progress bar showing percent Approved. Rows needing legal text show a lock icon and cannot be marked Approved without a reviewer name and date. Seed realistic rows from the Acorn site map: Home, About, Services (6 pages), POSH Compliance, Insights, FAQ, Contact, Pay, Privacy, Terms, Disclaimer, Cookies, Refund policy, and the standard email and notice templates.
Add a checklist panel for the Bar Council advertising rules (no testimonials, no result claims, no rankings, disclaimer present on every page) that must be ticked before Content freeze.
Prompt 0.4: Decision log, kick-off checklist and CI reminder (coding agent)
Run this in an empty repository with the PRD attached. It creates the project documents and a small script that stops the team forgetting decisions.
Read the attached PRD (Section 20 decisions D-1 to D-26 and Section 28.8 checklists). Create these files:
 
1. /docs/decisions.md and /docs/decisions.json: a table of all 26 decisions with id, question, owner, needed-by milestone (Kick-off, Before Phase 1 deployment, and so on), the PRD recommended default, status (Open, Decided, Defaulted), decided value, decided by, date and notes. Mark D-23, D-24 and D-25 as "counsel confirmation required".
2. /docs/kickoff-checklist.md and /docs/golive-checklist.md copied from PRD 28.8 as task lists.
3. /scripts/check-decisions.ts: reads decisions.json and the current phase from /docs/phase.txt, prints every Open decision whose needed-by milestone is the current phase or earlier, and exits non-zero if any D-23, D-24 or D-25 is Defaulted without counsel confirmation.
4. A GitHub Actions workflow that runs the script on every pull request and comments the list of overdue decisions, but only blocks the merge for the counsel-confirmation rule.
5. /docs/README.md explaining the weekly rhythm from PRD 28.2: Monday planning, Friday demo, Definition of Ready and Definition of Done.
Use TypeScript, no external services, and add a unit test for the script.
Phase 0 exit check: kick-off checklist signed, decisions D-1 to D-10 made or defaulted, wireframes and design system approved by the product owner, repository and CI created. Only then start the Phase 1 prompts and B3 onwards.
Part C. Back-end build pack (coding agent)
These prompts are for a coding agent such as Claude Code or Cursor. Attach the PRD to every session and keep the v0-generated /docs files (API contracts, state machine, timers, realtime events) in the repository, because the back end must implement them exactly. Send the prompts in order. Each prompt ends with tests, and a prompt is finished only when its tests pass in CI.
Front-end note. v0 produces Next.js apps. The PRD proposed Vite single-page apps for the admin and portal and Next.js for the public site. Either works, but the tech lead should record the choice as an extension of D-1 and keep a strict content security policy on the admin and portal sub-domains.
Prompt
Topic
PRD phase and weeks
PRD sections to attach
B0
Agent rules and definition of done
Phase 0, W1
9, 27.4, 28.2
B1
Monorepo scaffold and local environment
Phase 0, W1
9.2, 9.3, 27.1, 27.4
B2
Platform baseline: config, logging, errors, API conventions
Phase 0 to 1, W1 to 2
25.1, 25.2, 27.3
B3
Authentication, MFA and sessions
Phase 1, W2
26.2, 25.3
B4
Permissions, audit chain and tenancy
Phase 1, W2
7.5, 26.3, 26.7
B5
Public and admin core API, files and email
Phase 1, W3
25.4, 25.5, 26.5
B6
Payments with Razorpay
Phase 1, W4
25.6
B7
Real-time layer (Socket.io)
Phase 2, W5
25.10
B8
Admin engagement modules
Phase 2, W6
7, 25.5
B9
Rules engine (calendar, rule sets, timers)
Phase 3, W8
8.16, 29.3
B10
Complaint intake, routing and encryption
Phase 3, W9
8.11, 26.4, 25.8
B11
Case lifecycle, evidence, access and break-glass
Phase 3, W10 to W12
8.15, 8.27, 25.8
B12
Notifications and templates
Phase 3 to 4, W11 to W14
8.25, DOC and P catalogues
B13
Organisations, compliance, reports and retention
Phase 4, W13 to W15
8.21, 8.22, 26.10, 25.7
B14
Subscriptions, LMS, surveys, service desk and legal console
Phase 5, W15 to W19
8.23, 8.29, 8.30, 25.9
B15
Background jobs and schedules
Phase 3 to 5
27.6
B16
Security, quality and disaster recovery
Phase 4 to 5, W16 and W20
26.1 to 26.11, 27.7, 27.8
B17
Front-end integration and cutover (run after each phase)
Every phase
25.12, 27.9


B0. Agent rules (paste into CLAUDE.md or the editor rules file)
PROJECT: Acorn Legal Platform (public website, admin, POSH portals, POSH compliance and case management). The attached PRD is the source of truth. If anything is ambiguous, ask or record an assumption in /docs/assumptions.md. Never invent legal rules; legal parameters come from the rules configuration and are approved by counsel.
 
STACK: Node.js LTS, TypeScript strict, Express, Mongoose on MongoDB 7 replica set, Redis with BullMQ, Socket.io with Redis adapter, Zod for validation (shared in /packages/shared), pino logging, Vitest or Jest, Supertest, MongoDB Memory Server, Playwright. Monorepo with pnpm workspaces.
 
API CONVENTIONS (PRD 25.1): base /api/v1; JSON; ISO 8601 UTC dates; money in integer paise; success envelope {data, meta}; error envelope {error:{code,message,details,requestId}}; paging with page and pageSize (max 100); Idempotency-Key on POSTs that create money or cases; If-Match with record version on PATCH and PUT; RateLimit headers; X-Request-Id on every response; Cache-Control no-store on authenticated and POSH endpoints.
 
NON-NEGOTIABLE RULES:
- Authentication tokens only in HttpOnly, Secure, SameSite=Strict cookies plus the CSRF header. Never in localStorage.
- Every endpoint declares a permission key, writes an audit event, and has an authorisation test. No endpoint ships without all three.
- Every tenant-owned record has orgId and is read only through the tenant-scoped repository. Cross-tenant access is a test failure.
- Never log or return complaint content, names of parties, tokens, OTPs or secrets. Logs, errors, notifications, emails, webhooks and real-time events carry case IDs and generic text only.
- Case content is encrypted at field level; keys come from the KMS; secrets come from the secret manager and are validated at start by a Zod schema.
- Security-sensitive paths (auth, crypto, case access, payments, rules engine) are listed in CODEOWNERS and need two reviewers and tests.
- Real complaint data exists only in production. Seed data is synthetic.
DEFINITION OF DONE: code reviewed; tests pass in CI; acceptance criteria demonstrated; audit events and permissions added; OpenAPI contract updated; accessibility and microcopy considered; docs updated; deployed to development; no open high defects.
B1. Monorepo scaffold and local environment
Create the monorepo described in PRD 27.4 with pnpm workspaces:
/apps/api, /apps/web (public), /apps/admin, /apps/portal, /apps/worker, /packages/shared (Zod schemas, permission keys, constants), /packages/contracts (OpenAPI), /packages/ui, /packages/rules (pure TypeScript rules engine, no database access), /infra, /docs.
 
Add: docker-compose for local development with MongoDB as a single-node replica set, Redis, a mail catcher, an S3-compatible emulator (MinIO) and an optional ClamAV container; seed script producing synthetic data only; scripts for dev, test, lint, typecheck, build; Husky pre-commit hooks (lint, type check, secret scan); ESLint with security rules; Prettier; conventional commits; CODEOWNERS covering /apps/api/src/auth, /crypto, /cases/access, /payments and /packages/rules; a README with setup in under 15 minutes. No application features yet.
B2. Platform baseline
In /apps/api build the cross-cutting layer used by everything else:
- Config: read environment once, validate with Zod, refuse to start on any missing or malformed value, no default for any secret. Use the variable list in PRD 27.3.
- Logging with pino and redaction (tokens, cookies, emails, phone numbers, any field named description, statement, narrative, content). X-Request-Id middleware.
- Security middleware: Helmet, CORS limited to the configured origins, cookie-parser, CSRF check, body size limits, rate-limit profiles (default and strict) with the RateLimit and Retry-After headers (PRD 26.5).
- Response helpers for the success and error envelopes and the error code catalogue in PRD 25.2; central error handler that never leaks stack traces or content.
- Idempotency middleware (24-hour key store in Redis), If-Match optimistic concurrency helper returning 409 CONFLICT_VERSION, pagination and sort helpers, Accept-Language handling for en, bn and hi.
- Health and readiness endpoints, OpenAPI generated from the Zod schemas into /packages/contracts, and a contract test harness.
Write unit tests for each piece, including one proving that a log call containing a complaint-like field is redacted.
B3. Authentication, MFA and sessions
Implement PRD 26.2 and the endpoints in 25.3.
- Password hashing with Argon2id, minimum 12 characters, breached or common password check, history of last 5.
- Access token JWT signed with ES256 and key ID for rotation, short lived, in an HttpOnly cookie; rotating refresh token with reuse detection that revokes the whole family; CSRF token header on state-changing calls.
- TOTP MFA with otplib, enrolment with QR and manual key, 8 single-use backup codes stored hashed, mandatory for Super Admin, Admin, Finance and every POSH user role.
- Lockout after 5 failed attempts for 15 minutes with a non-revealing error; generic messages for unknown users; login timing equalised.
- Invitations, accept-invite with MFA enrolment, forgot and reset password with single-use expiring links, session list and "log out this session", idle timeout of 30 minutes and an absolute session limit from settings, force logout by admin.
- Audit events for every authentication event.
Tests: lockout, refresh reuse, expired and replayed reset links, MFA bypass attempts, CSRF failures, session revocation.
B4. Permissions, audit chain and tenancy
1. Permissions: define permission keys per module and action (read, create, update, delete, publish, export) in /packages/shared. Implement the role matrix from PRD 7.5 (Super Admin, Admin, Content Editor, Marketing Manager, Support Executive, Finance) as data, an authorize(permission) middleware, and a function used by both API and tests. Add organisation and POSH roles (Organisation Admin, IC Presiding Officer, IC Member, External Member, Intake Counsellor, POSH Administrator, Legal Administrator, Complainant, Respondent) with separate case-level permissions.
2. Audit: an append-only audit collection. Each entry stores actor, role, action, entity type and ID, orgId, before and after (sensitive fields redacted), IP, user agent, request ID, the SHA-256 hash of the previous entry and its own hash. The application database user has insert and read rights only on this collection. Add a verifier function and a daily job stub that walks the chain; a broken chain raises a SEV-1 alert.
3. Tenancy: a tenant context middleware and a repository wrapper that injects orgId into every query, update and aggregate and throws TenantViolationError on mismatch. Block raw model access from route handlers with a lint rule.
Tests: a generated authorisation matrix test that calls every route as every role and checks the expected 200, 403 or 404; a tenant isolation suite proving organisation A can never read, list, count, export or search organisation B; a tamper test for the audit chain.
B5. Public and admin core API, files and email
Implement the Phase 1 endpoints in PRD 25.4 and 25.5.
- Public content: pages, services, blog, FAQ with ETag and Cache-Control; sitemap and robots generation; sanitize-html on all rich text.
- Service requests: create with Zod validation, honeypot and CAPTCHA verification, reference format ACN-SR-YYYY-NNNNNN, UTM capture, rate limits, attachments through the two-step upload (signed URL, then complete with type and size check and malware scan); admin list, detail, status, assignment, notes, replies by email with threading, timeline, bulk actions, CSV export for roles with the export permission.
- Q&A: submit with privacy choice, moderation states, answer by email, publish only if the asker allowed publishing, scheduled publish.
- Blog CMS with draft, review, scheduled and published states, revisions and slug uniqueness; script control with approval and a content security policy allow-list.
- Settings and maintenance mode.
- Email service: BullMQ queue, retry with back-off, dead-letter queue, MJML or Handlebars templates, SPF, DKIM and DMARC-ready sender configuration, bounce webhook.
- Real-time: emit request.created and question.created through an event bus (wired in B7).
Tests: validation, spam controls, upload type and size limits, scan quarantine, permissions, scheduled publish, email retry.
B6. Payments with Razorpay
Implement PRD 25.6.
- Create orders on the server with the amount taken from the catalogue or invoice, never from the client; Idempotency-Key required; store payment intent with status machine (created, pending, paid, failed, refunded, partially refunded).
- Verify the checkout signature on the server; webhook endpoint reading the raw body, verifying the signature with the webhook secret, storing every event (replay-safe, idempotent), retrying failures through a job with maximum 10 attempts then alert.
- Receipts and GST invoices as PDFs with invoice number series ACN-INV-YYYY-NNNN, CGST and SGST or IGST by state, versioned templates.
- Refunds with required reason and second approval above a configured threshold; audit trail.
- Daily reconciliation job that compares gateway records to payments and alerts on any mismatch.
- Payment status page endpoints with no personal data beyond the reference.
Tests with the gateway in test mode and recorded fixtures: duplicate callbacks, delayed webhook, tampered signature, amount mismatch, failed and cancelled payments, refund approval rule.
B7. Real-time layer
Implement PRD 25.10 with Socket.io.
- Namespaces /admin, /portal and /org. Authenticate the handshake with the same cookie as HTTP. Join rooms by permission (requests, qa, payments, scripts, user:{id}, case:{caseId}, org:{orgId}, ticket:{id}). Re-evaluate rooms on role change and remove revoked users immediately.
- Redis adapter from the first release. At-least-once delivery with a catch-up endpoint using sinceId after reconnect. Long-polling fallback; the clients poll every 30 seconds if sockets fail.
- Event payload allow-list exactly as in the PRD table: request.created, request.updated, question.created, payment.updated, script.pending, notification.new, case.state, case.timer, case.document, org.compliance, org.case-counts, ticket.updated, presence. Payloads contain IDs and generic text only; a unit test fails if any other field appears.
- Target: an admin alert within 5 seconds of a new request.
Tests: room authorisation, revoked user removal, reconnect catch-up, payload allow-list, a latency test with two API instances.
B8. Admin engagement modules
Implement the Phase 2 admin features that the v0 screens call (use the generated /docs API contract):
- Request detail: conversation thread with canned responses, internal notes, assignment, follow-up date and reminder, overdue flag after 24 hours, activity timeline.
- Q&A moderation: templates, anonymisation helper that highlights names, phones and emails for redaction, publish to the FAQ with structured data, decline and spam flows, daily digest.
- Notification centre: preferences by event and channel, unread counts, read state; security alerts cannot be disabled.
- Reports: requests summary, response time, conversion by source, Q&A backlog, blog performance, payments summary, exports with the export permission and an audit entry, scheduled reports by email.
- Campaign landing pages: template-based pages with block data (no free HTML), slug uniqueness, UTM capture and conversion counts.
- Users and roles administration, session management, audit viewer endpoints with filters, idle-timeout and settings endpoints.
Tests for permission edge cases and for every export.
B9. Rules engine (packages/rules)
This is the most important package. It is pure TypeScript with no database access, shared by the API, the worker and the front end. Review it line by line.
Build /packages/rules from PRD 8.16 and the scenario catalogue in 29.3.
- Calendar: weekly off configuration, holiday union (central, state, organisation), addWorkingDays, addCalendarDays, addMonths with end-of-month handling, workingDaysBetween.
- Rule sets: versioned, effective-dated parameters (complaint period, extension, copy to respondent days, reply days, inquiry days and anchor, report days, employer action days, appeal days, interim relief days, notice lead days, aftercare days). A case and its timers use the rule set in force at the triggering event unless an approved migration says otherwise.
- Timers TM-01 to TM-21: compute start, due date, status (not started, running, due soon, overdue, met, stopped), alert dates (50, 80 and 95 percent and breach per PRD 27.6), and a plain-language explanation of how the date was derived. The 90-day inquiry clock stops only for a recorded legal ground; any other delay needs a reason code and is counted for reporting.
- Table-driven tests with all 40 scenarios (month ends, leap years, weekends, holidays, last day of limitation, extension, anchor variants, rule-set change mid-case, conciliation stop and resume, ex parte notice) plus property tests for working-day arithmetic.
Deterministic, no use of the system clock inside the package (the current time is passed in). 100 percent branch coverage on the calendar and timer modules.
B10. Complaint intake, routing and encryption
Implement PRD 8.11 and the intake endpoints in 25.8.
- Routing RT-01 to RT-21 as pure functions in /packages/rules returning outcome (IC, Local Committee, non-statutory, concern report, child-protection route, no tenant) with reasons, warnings and flags. Submission is never blocked; unusual matters are stored and routed with an explanation.
- Drafts: saved server-side, expire after 30 days with one content-free reminder on day 25; assisted filing by an Intake Counsellor with recorded consent.
- OTP signature: 6-digit code stored hashed, expiry, attempt limits, resend limits, device and IP throttles.
- Case creation with ID POSH-ORG-YYYY-NNNN (race-safe sequence per organisation and year), receipt, and locked-copy PDFs with a verification code.
- Encryption: AES-256-GCM field-level encryption with per-tenant data keys wrapped by the KMS key; key rotation support; blind indexes for lookups; no plaintext complaint content in logs, caches, search indexes or backups.
- Evidence upload: direct signed upload, server-side SHA-256 computed after upload, size and type checks, malware scan, quarantine after 3 failures.
Tests: routing table for all 21 rules, draft expiry, OTP abuse, race on case numbers, decryption only through the access layer, no plaintext in the database (inspect raw documents in a test).
B11. Case lifecycle, evidence, access and break-glass
Run this prompt three times, as listed in the build order (W10, W11, W12). Each time ask the agent to finish one part and its tests before moving on.
PART 1 (W10): state machine and access.
Implement the case state machine T01 to T30 in /packages/rules as a transition table with guards and side effects (PRD 8.15), exposed through the API only as executeTransition(caseId, action, payload) which re-checks every guard on the server. Implement canAccessCase(user, case): access only for assigned users who signed the case-specific confidentiality undertaking and conflict declaration; recusal with reassignment; masked lists; Organisation Admin and POSH Administrator never see content. Break-glass: server-side, time-boxed (default 60 minutes, hard maximum 2 hours), approved by the Managing Partner plus a second reviewer for content, named user, case-specific undertaking, every view logged, automatic content-free notice to the Presiding Officer, auto-expiry.
PART 2 (W11): notices and proceedings.
Notices with templates and delivery log, hearings, adjournments with reason codes, non-appearance counter and ex parte rules with the 15-day notice, statements, documents per party with release approval, chain-of-custody log, SHA-256 verification endpoint, conciliation with a server-side monetary-term guard, interim relief with the 3-working-day timer.
PART 3 (W12): outcomes and records.
Reports with quorum signatures and lint, compensation worksheet, employer action with the 60-day timer, appeals and legal hold, aftercare tasks at 30, 90 and 180 days, reopen with dual approval, retention reviews that never delete without dual approval and legal-hold check, encrypted case-file export with re-authentication, and all audit events.
Tests: authorisation matrix per case role, every guard failing and passing, custody and release rules, break-glass limits, retention and hold rules.
B12. Notifications and templates
Implement the notification system from PRD 8.25 and the catalogues of 40 notices (P-01 to P-40) and 38 templates (DOC-01 to DOC-38).
- Notification matrix: event, recipient role, channel, timing, and neutral subject lines. All messages are content-free: the only allowed merge fields are caseId, orgName, date, dueDate, portalLink and genericMessage. A lint test fails the build if a template uses any other field, and the notification factory throws at runtime if a payload contains anything outside the allow-list.
- Templates stored as versioned content with languages en, bn, hi, states Draft, In review, Approved, Published, Retired, and a requirement for a second approver to publish. Footer prints template and rule-set versions.
- Channels: email through the queue with retries, bounce handling and a dead-letter queue; SMS and WhatsApp adapters behind a feature flag and the DLT template registry; in-app notifications; safe contact preferences and quiet hours for complainants.
- Delivery log and read receipts (portal read only).
Tests: lint failure on a forbidden field, quiet hours, preference rules, retry and dead-letter behaviour.
B13. Organisations, compliance, reports and retention
Implement PRD 8.21, 8.22, 26.10 and endpoints 25.7.
- Organisations and branches with headcount, IC and Local Committee flags; IC roster with composition validation (presiding officer, external member, gender balance, tenure) and tenure alerts at 90, 60 and 30 days.
- HRMS: CSV import with mapping, validation and dry-run; REST endpoints for directory push and compliance status with scoped API keys (hashed, rate limited) and signed outbound webhooks (HMAC-SHA256).
- Policy library with versions and acknowledgements through one-time links; notice display tracker; training records feeding the score.
- Compliance score engine in /packages/rules: duty register CMP-01 to CMP-23, the domain weights and bands from the product spec, daily snapshots and history, top five gaps with consequence and linked service. It reads only aggregates and metadata; add a test proving it cannot read complaint content.
- Annual report generator on the server (DOCX and PDF) with exact statutory counts and no identifiers; Board's Report and BRSR data sheets; analytics with k-anonymity (minimum group size from settings) applied to every breakdown and export.
- Retention engine: scheduled review tasks, dual approval, re-authentication, crypto-shredding of case keys, statistical residue, legal hold block.
- Readiness pack ZIP.
Tests: tenant isolation for every endpoint, score worked examples, suppression in exports, report free of identifiers.
B14. Subscriptions, LMS, surveys, service desk and legal console
Implement Phase 5 (PRD 8.23, 8.29, 8.30, endpoints 25.9). Build in this order and test each part before the next.
1. Service catalogue, plans (Starter, Professional, Enterprise), add-ons, subscriptions, usage meters with 80 percent warnings, GST invoices; a plan limit never locks an open case.
2. LMS: courses with versions, lessons and quiz banks, assignment engine with dedupe and new-joiner window, one-time learner links with code verification, progress and resume, certificates with verification code and public verify endpoint, live sessions with check-in, completion reports.
3. Surveys: anonymous one-use tokens that are not linked to employee IDs, results with k-anonymity, free-text screening against the directory, action plans.
4. Service desk: tickets, categories, P1 to P4 SLA engine using the working-day calendar and business hours, escalation ladders, on-call rota and a paging adapter that repeats until acknowledged, a content guard blocking case content, link-to-case only for assigned agents.
5. Support directory with verification dates, knowledge base, and a rule-based assistant (intent matching over approved articles, redirect of complaint-like input to the helpline, no language model).
6. Legal console: rule sets with effective dates and dual approval, the 40-scenario gate that blocks publishing on any failure, template and holiday management, statutory watch list.
7. Aftercare, offboarding and contract pack.
Tests: SLA across holidays, assignment dedupe, anonymity of survey storage, scenario gate, tenant isolation.
B15. Background jobs and schedules
Run these in a separate worker deployment using BullMQ with Redis and a leader lock so duplicate schedulers cannot run (PRD 27.6). Each job is idempotent, logs start, end, count and duration, and alerts after two consecutive misses.
Job
Schedule (IST)
Purpose
timer-scan
Every 5 minutes
Evaluate running case timers, send threshold alerts (50, 80, 95 percent and breach), apply clock stops
limitation-watch
Daily 06:00
Flag cases nearing the 3-month and extension limits and drafts about to lapse
compliance-score
Daily 02:00
Recalculate duties and the 100-point score; create gap tasks
duty-reminders
Daily 08:00
Remind organisations of due duties, tenure end, training expiry, annual report (content-free)
annual-report-window
Monthly
Open the annual report workflow and remind
payment-reconcile
Daily 03:00
Compare gateway records with payments; alert on any mismatch
webhook-retry
Every 10 minutes
Re-process failed webhook events; maximum 10 attempts then alert
email-retry
Continuous queue
Send and retry notifications with back-off; monitor dead-letter queue
draft-expiry
Daily 01:00
Delete expired complaint drafts; one reminder before expiry
link-and-otp-purge
Hourly
Remove expired links and codes
retention-scan
Daily 01:30
Create retention reviews; never deletes by itself
audit-chain-verify
Daily 04:00
Verify the audit hash chain; a break is SEV-1
file-scan-retry
Every 15 minutes
Retry scan errors; quarantine after 3 failures
sitemap-and-cache
On publish and daily
Regenerate sitemap and revalidate pages
scheduled-publish
Every minute
Publish scheduled posts and answers
sla-scan
Every 5 minutes
Support SLA timers and escalations
rule-calendar-check
Weekly
Warn if next year holiday calendars are missing; flag directory entries unverified for 180 days
aftercare-scan
Daily 09:00
Create 30, 90 and 180 day check-in tasks
usage-meter
Daily
Update subscription usage; warn at 80 and 100 percent
backup-verify
Daily
Check last backup success and age; alert if older than 26 hours
cert-and-key-expiry
Daily
Alert 30 days before certificates, API keys or keys expire


Implement the worker app with BullMQ, a leader lock, the job table above and a registry that records each run (start, end, processed count, duration, error). Add a test harness that runs each job against synthetic data with a fake clock, an alert when a job misses twice, and an admin endpoint listing last run status for the operations console.
B16. Security, quality and disaster recovery
Implement the programme in PRD 26.1 to 26.11 and 27.7 to 27.8.
- Authorisation matrix and tenant isolation suites generated for every route in CI; a test that fails when a new route has no permission or audit declaration.
- Static analysis (SAST), dependency and licence scan, secret scan on every pull request; OWASP ZAP baseline against staging; Playwright end-to-end journeys for the critical flows; axe accessibility checks; k6 scripts (100 concurrent learners, 50 concurrent ticket creators, intake spikes).
- Content security policy, HSTS, cookie flags and CORS verified by tests; WAF and bot rules documented; rate limits per PRD 26.5.
- Key management: separate keys per environment, rotation runbook, a test that rotates a tenant key and re-reads data, crypto-shredding test.
- Backups: point-in-time recovery for the database, versioned and replicated object storage, restore scripts and a quarterly drill checklist; audit-chain verification after restore; RPO 15 minutes for the database and 1 hour for files, RTO 4 hours.
- Penetration test preparation pack: architecture, endpoints, roles, test accounts and a findings tracker; Critical and High findings must be fixed and retested before POSH go-live.
- Endpoints that feed the operations console: go-live gate inputs, job status, backup status, tenant test result and open defect counts.
B17. Front-end integration and cutover (run after each phase)
For the phase that just finished, connect the v0 front end to the real API.
1. Generate a typed client from /packages/contracts. Replace each mock function in /lib/api with the real call, one module at a time, keeping the same function signatures so the screens do not change.
2. Use TanStack Query for fetching and caching; handle the error envelope, the 409 version conflict (reload and retry prompt), 429 with Retry-After, and idempotency keys for money and case creation.
3. Replace the mock real-time provider with socket.io-client using the same event names, the catch-up call after reconnect and the 30-second polling fallback.
4. Remove the developer "Sign in as" and "Preview as role" switchers from production builds; load feature flags from the server.
5. Enforce the strict content security policy on admin and portal, no third-party scripts, and the neutral page titles on complainant and respondent pages.
6. Run the contract tests, Playwright journeys, axe checks and the tenant and authorisation suites against staging. A mock function is removed only when its real endpoint passes the contract test.
7. Cutover checklist: production keys and secrets, DNS and TLS, email authentication, Razorpay live test with a small payment and refund, backup and monitoring verified, rollback plan and previous release available. Production release needs two approvers.
Rules of engagement for the engineering team
Review gate. Anything the agent writes in authentication, encryption, case access, payments or the rules engine is read line by line by a human before merge.
No shortcuts on confidentiality. If a feature seems to need complaint content in a log, email, ticket or event, stop and ask. The answer is almost always to send only the case ID.
Counsel owns the legal numbers. Deadlines, templates and notices in the rules configuration need counsel approval and a second approver before they are published.
Test what the PRD says, not what the code does. Write scenario and authorisation tests from the PRD tables first, then make the code pass them.
Keep a change log. Scope changes after a phase starts go through written change control with effort, price and schedule impact (PRD 28.2).

Part D. v0 prompt library: Phases 1 to 7
This library drives the design track. v0.dev produces working Next.js screens with mock data and an API contract that the engineering track (Part C) implements. Send prompts one at a time, in order, and review each result before sending the next.
v0 project
Phases
Notes
1. Website
Phase 1, parts of Phase 7
Public marketing site. Uses the full editorial design system.
2. Admin console
Phase 2 and the /ops area of Phase 6
Dense staff skin. Separate sub-domain; no third-party scripts.
3. POSH portal
Phases 3, 4, 5 and the rest of 6 and 7
Calm mode. Separate sub-domain. Extends one shared /lib/posh engine.


Rules for every prompt below. Paste the Project Instructions of the phase first. Use [placeholders] for facts you have not supplied. No testimonials, results, rankings or guarantees. Footer disclaimer on every page: "The information on this website is for general information only and does not constitute legal advice or create a lawyer-client relationship."
Phase 1: Premium public website
Goal: a premium, complete public site. Create a new v0 project and paste Prompt 1.0 into Project Instructions. For the richest visual result, also paste the design system from Part E.
Prompt 1.0 Project Instructions (design system)
You are building the website for "Acorn Legal Consultants", a premium legal consultancy in Kolkata, India. Tagline: "Excellence in Law. Integrity in Practice." Sub-tagline: "Where Legal Expertise Meets Strategic Excellence."
 
STACK: Next.js App Router, TypeScript, Tailwind, shadcn/ui, lucide-react, next/font, Framer Motion for subtle effects only.
FEEL: prestigious, calm, trustworthy, discreet. Generous whitespace, strong typography, no clutter, no cartoon art.
COLOURS: navy #1F3864, navy-deep #14264A, blue-hover #2F5496, gold #B08D57 (sparingly), ink #1B1F27, slate #5B6573, border #D5DAE3, surface #F6F7F9, status colours success #1E7B4F warning #B7791F danger #B42318 info #1F5FA8. All text WCAG AA.
FONTS: headings Cormorant Garamond 500/600/700, body Inter 400/500/600; eyebrow labels Inter 600 12px uppercase tracking 0.14em in gold. Scale 14 to 64px, base 16, line-height 1.6, 70-character measure.
LAYOUT: 1200px max, 12 columns, 4px base, breakpoints 360/768/1024/1280, section padding 96px desktop and 64px mobile, radius 6px inputs and 10px cards, two shadows only.
MOTION: subtle fade-up, transitions under 200ms, respect prefers-reduced-motion, no auto-playing carousels or video.
ACCESSIBILITY AND SEO: semantic HTML, skip link, visible focus, alt text, heading hierarchy, metadata on every page, JSON-LD (Organization, LegalService, FAQPage).
CONDUCT: no testimonials, results, rankings or guarantees; use [placeholders] for unsupplied facts; disclaimer in every footer.
Keep reusable components in /components and all copy in one content file so a CMS can replace it later.
Prompt 1.1 Global layout
Create the global layout. HEADER: sticky, white, shadow on scroll. Left: text logo ACORN (Cormorant Garamond 700) with a small gold leaf icon and LEGAL CONSULTANTS in spaced Inter caps. Menu: Home, About, Services (dropdown with the six practice areas), POSH Compliance, Insights, FAQ, Contact. Right: click-to-call icon and primary button "Request a Consultation". Mobile: accessible full-height drawer with the same links and a prominent call button.
FOOTER (navy-deep): four columns: firm intro, practice areas, quick links, contact ([address] Kolkata, [phone], [email]). Below: Privacy Policy, Terms, Disclaimer, Cookie Policy, Refund and Cancellation Policy, the disclaimer line and "(c) 2026 Acorn Legal Consultants".
COOKIE BANNER: bottom card with "Accept all", "Reject non-essential", "Preferences" opening a modal with category switches (Essential locked on, Analytics, Marketing).
Add a skip-to-content link and back-to-top button.
Prompt 1.2 Homepage
Build / with these sections in order: (1) HERO on navy-deep with a fine geometric pattern and soft blue gradient; eyebrow ACORN LEGAL CONSULTANTS; H1 in Cormorant Garamond 64px "Excellence in Law. Integrity in Practice."; sub-headline "A professional legal consultancy delivering thoughtful, precise and result-oriented solutions for individuals, businesses and organisations."; buttons "Request a Consultation" and "Explore Services"; three trust points (Discretion, Diligence, Transparency). (2) WHO WE ARE two columns with the philosophy quote card. (3) PRACTICE AREAS grid of six cards: Advisory, Legal Documentation, Dispute Resolution, Representation, Corporate and Commercial Support, POSH Compliance, each with icon, two-line description and Learn more. (4) PHILOSOPHY band: "To protect what matters, navigate complexity with confidence, and uphold the highest standards of professional integrity." (5) WHY ACORN six pillars (Integrity, Strategic Insight, Commercial Understanding, Discretion, Diligence, Transparency). (6) HOW WE WORK five-step timeline: Enquire, Understand, Advise, Act, Review. (7) POSH HIGHLIGHT split card with "Explore POSH Compliance" and "Report a Concern". (8) LATEST INSIGHTS three cards. (9) FAQ PREVIEW accordion of four questions. (10) CTA BAND "Ready to discuss your matter?" with "Request a Consultation" and "Pay a Fee Online".
Prompt 1.3 About page
Build /about: page header with breadcrumb; "Our Story" using the About Us text ("We are a professional legal consultancy dedicated to delivering thoughtful, precise, and result-oriented legal solutions tailored to the unique needs of individuals, businesses, and organisations..."); "Our Approach" (advisory, legal documentation, dispute resolution, representation); "Our Philosophy" pull-quote; "Our Values" six cards; "Our Team" with three placeholder profile cards marked [to be supplied]; closing CTA band.
Prompt 1.4 Services index and detail
Build /services and a reusable /services/[slug]. INDEX: header, intro paragraph, six large service cards in two columns. DETAIL TEMPLATE: hero with a "Request this service" button linking to /request-service?category=[slug]; Overview; Who this is for; Typical engagements (checklist); Our process (4 steps); Related articles (3 cards); service FAQ accordion; sticky side card on desktop with a short enquiry prompt and call button. Generate sample content for advisory, legal-documentation, dispute-resolution, representation, corporate-commercial and posh-compliance. Keep claims factual and promise no outcomes.
Prompt 1.5 POSH landing page
Build /posh as a calm, reassuring landing page. Hero "Safe, compliant workplaces" with buttons "Book a POSH Consultation", "Report a Concern", "Download Compliance Checklist". Sections: why POSH compliance matters (Internal Committee, policy, awareness, annual report, penalties in plain language); what Acorn offers (policy drafting, IC constitution support, IC training, inquiry assistance, annual report support, awareness sessions, secure case management platform); how the platform works in six steps (File, Acknowledge, Inquire, Report, Act, Close); who it is for (employers of all sizes); confidentiality and trust (encryption, access control, audit); resources; FAQ; short consultation form. Style: softer blue surfaces, more whitespace, no urgency language, no red, no exclamation marks. Add "This page is general information, not legal advice."
Prompt 1.6 Blog (Insights)
Build /blog and /blog/[slug]. Index: header with search, category filter chips, featured article, grid of cards (cover image, category, title, excerpt, date, read time), pagination, empty state. Article: breadcrumb, serif title, author and date, cover image, 70-character reading column with styled headings, quotes, lists and tables, share buttons, author box, related posts, disclaimer and consultation CTA. Add Article JSON-LD and SEO metadata.
Prompt 1.7 FAQ and Ask a Question
Build /faq: search bar, category tabs, accessible accordion with an anchor link for each question, disclaimer ("Answers are general information and do not create a lawyer-client relationship"), and an "Ask a Question" form: name (optional), email (required), category, question (20 to 1,500 characters with counter), radio "Private reply only" or "Allow publishing after anonymisation". Use react-hook-form and zod, a Turnstile placeholder, and a confirmation state showing a reference ID like ACN-Q-2026-000123. Include FAQPage JSON-LD.
Prompt 1.8 Request a Service
Build /request-service as a two-column page: form left, reassurance panel right ("We respond within one business day", confidentiality note, call button). Fields: Full name*, Email*, Mobile (+91, 10 digits)*, Client type* (Individual, Business, Organisation), Organisation name (only for Business or Organisation), City, Service category* (Advisory, Legal Documentation, Dispute Resolution, Representation, Corporate and Commercial, POSH Compliance, Other; preselected from ?category), Subject* (5 to 120 characters), Description* (20 to 3,000 with counter), Preferred contact mode and time window, Attachments (up to 3 files, 5 MB each, PDF/DOCX/JPG/PNG with progress), Consent checkbox* linking to the Privacy Policy, Turnstile placeholder. Zod validation with kind inline messages, loading state, success screen with reference ID ACN-SR-2026-000123 and "A confirmation has been sent to your email." Fully keyboard accessible.
Prompt 1.9 Contact and Pay online
Build /contact: header, three info cards (address in Kolkata, phone with click-to-call, email), office hours, map placeholder with "Open in Google Maps", short form (name, email, phone, message, consent). Build /pay: step 1 choose a service or enter an invoice reference; step 2 amount in INR (read-only, from the server), name, email, phone; step 3 "Pay securely with Razorpay" (placeholder handler); security note ("Card and UPI details are handled by Razorpay and never stored by us"), links to the Refund Policy and Terms. Also build /pay/status/[id] with Success, Failed and Pending states, a receipt download button and retry guidance.
Prompt 1.10 Legal and error pages
Build a shared template for /privacy, /terms, /disclaimer, /cookies and /refund-policy: header, "Effective date" and "Version" labels, sticky table of contents on desktop, readable body, print button, placeholder text "[Legal text to be supplied by Acorn counsel]". Then build a branded 404 and 500 page with search, helpful links and a contact button.
Prompt 1.11 Polish pass
Review the whole site and fix: consistent spacing and heading hierarchy; hover and focus states on every control; Lighthouse accessibility 95+; 360px layout on every page; next/image optimisation; consistent gold-rule eyebrows; sitemap.xml and robots.txt; metadata and Open Graph on every page; remove any placeholder claims about results, rankings or testimonials. Add a subtle fade-up on sections that respects prefers-reduced-motion.
Phase 2: Engagement and real-time admin
Goal: the live staff console. Use a new, separate v0 project. The admin must have no third-party scripts, fonts or analytics.
Prompt 2.0 Project Instructions (admin)
You are building the ADMIN CONTROL SYSTEM for Acorn Legal Consultants: internal, secure, data-dense, used by lawyers, support staff, editors, marketers and finance.
STACK: Next.js App Router, TypeScript, Tailwind, shadcn/ui, lucide-react, TanStack Table, Recharts, react-hook-form + zod, date-fns, TipTap. All data is mock in /lib/mock behind a service layer in /lib/api so a real API can replace it.
LOOK: same brand as the public site but calmer and denser, light theme, optional dark sidebar. Tokens as the website. Status colours always with an icon or text. Cormorant Garamond 600 for page titles only; Inter everywhere else; base 14px in tables.
SHELL: collapsible left sidebar grouped (Overview, Engagement, Content, Marketing, Finance, Administration), top bar with search, connection pill (Live, Reconnecting, Polling), notification bell, user menu, breadcrumbs.
RBAC: roles Super Admin, Admin, Content Editor, Marketing Manager, Support Executive, Finance. Build a Can component and useRole hook; sidebar, buttons and routes hide or disable by role. Add a developer-only "Preview as role" switcher.
MATRIX (R read, C create, U update, D delete, P publish, X export): Requests: SuperAdmin RCUDX, Admin RUX, Support RU, Marketing counts only. Q&A: SuperAdmin RCUDP, Admin RUP, Editor RU, Support RU. Blog and pages: SuperAdmin RCUDP, Admin RCUP, Editor RCU. Scripts: SuperAdmin RCUDP, Marketing RCUP, Admin R. Payments: SuperAdmin RUX, Finance RUX, Admin R. Users and roles: SuperAdmin only. Audit and Settings: SuperAdmin only.
TABLES: server-style pagination, sortable columns, filters, search, saved filters, row selection, CSV export (only with X), sticky header, skeleton, empty and error states.
SAFETY: destructive actions confirm and name the item; soft delete with Undo; idle-timeout warning at 28 minutes; unsaved-changes guard. WCAG 2.1 AA, keyboard navigation, aria-live for real-time updates. No third-party scripts or fonts. Realistic Indian mock data (names, +91 numbers, INR, IST dates).
Prompt 2.1 Login, MFA, invites (A-01)
Build /admin/login (split layout: navy-deep brand panel left, sign-in card right with email, password show/hide, Forgot password, Sign in; states loading, invalid credentials with no hint which field is wrong, locked after 5 attempts with "Too many attempts. Try again in 15 minutes."). MFA step: six-digit OTP input with auto-advance and paste, "Use a backup code". /admin/forgot-password and /reset-password with expired-link state, strength meter, minimum 12 characters. /admin/accept-invite: set password, TOTP enrolment (QR placeholder, manual key, 8 backup codes shown once with Download and an "I have saved these" checkbox). Then the authenticated shell with role-aware navigation.
Prompt 2.2 Real-time dashboard (A-02)
FIRST create a mock real-time layer in /lib/realtime: a RealtimeProvider and useRealtime hook that simulate Socket.io, exposing connection state (connected, reconnecting, polling) and emitting typed events every 8 to 20 seconds: request.new, question.new, payment.succeeded, payment.failed, security.alert; each with id, type, title, summary, entityId, createdAt and audience roles (filter by current role). In polling state show "Live updates paused. Refreshing every 30 seconds."
DASHBOARD: animated live tiles (New requests today, Unanswered questions, Awaiting client, Payments today INR, Overdue follow-ups); live activity feed (newest first, icon per type, relative time, click opens record, slide-in with brief highlight, aria-live polite, Mute sound toggle, toast with optional chime); Recharts: requests per day (30 days), conversion by source, median first-response time, payments by status, Q&A backlog by age; "Needs attention" list (requests older than 24 hours, questions pending over 3 business days); widgets differ by role; date range selector.
Prompt 2.3 Requests list and detail (A-03, A-04)
Build /admin/requests and /admin/requests/[id]. LIST columns: Reference (ACN-SR-2026-000123), Name, Category, Subject, Client type, Source (UTM), Status badge, Assignee, Received, Follow-up. Unread rows bold with a dot. Filters: status, category, assignee, date range, source, unread. Bulk actions: assign, change status, mark spam, export CSV. Statuses: New, In Review, Contacted, Awaiting Client, Proposal Sent, Converted, Closed, Spam.
DETAIL: left, requester card, full description, attachments as link chips with size and "Scanned clean" badge (never inline), tabs Conversation (reply thread with composer and canned responses) and Internal notes. Right: status with required reason when Closed, assignee, follow-up date with remind-me, priority, tags, Activity timeline of every change. "Overdue" chip beyond 24 hours. Optimistic updates with toasts. Role rules: Support cannot delete; Marketing sees counts only (render a "No access" state).
Prompt 2.4 Q&A moderation (A-05)
Build /admin/questions as a three-pane view. Left: queue with tabs Pending, Answered, Published, Declined, Spam with counts, search, category filter, oldest first with an age indicator. Middle: question detail (asker or Anonymous, email, category, privacy badge "Private reply only" or "May publish after anonymisation", time, reference ACN-Q-2026-000123). Right: tools. Answer editor in TipTap with canned-response picker, mandatory disclaimer preview, "Send answer by email" and "Save draft". Publishing tools only when publishing is allowed: an Anonymise assistant that highlights names, phones, emails and places with one-click redaction; edit text; public category; pin; order; live preview of the public FAQ with FAQPage structured data; "Publish to FAQ" requiring the Publish permission. Decline flow with reason and templated message. Block publish when the privacy choice is "Private reply only" and explain why. Templates manager dialog. Daily digest toggle.
Prompt 2.5 Blog workflow and media (A-06, A-07)
Build /admin/posts, /admin/posts/[id] and /admin/media. LIST columns Title, Author, Category, Status (Draft, In Review, Scheduled, Published, Archived), Publish date, Last edited. EDITOR: title, auto slug, TipTap (headings, lists, tables, links, quotes, media-library images, video embeds) with word count and read time; side panels Publish (status, IST schedule, author), Categories and tags, Cover image, SEO (title with 60-character counter, description with 160 counter, canonical, no-index, Google and social previews), Revisions (compare and restore). Workflow: Editor sees "Submit for review"; Admin and Super Admin see "Publish" and "Request changes" with a comment. Autosave indicator; live preview drawer (desktop and mobile). MEDIA: grid and list, drag-and-drop upload (JPG, PNG, WebP up to 5 MB) with progress and validation, required alt text before insertion, details drawer (size, dimensions, used-in), replace, delete blocked when in use.
Prompt 2.6 Campaign landing pages
ADMIN /admin/pages (tab Campaign pages) and /admin/pages/lp/[id]: list (title, slug, status, views, submissions, conversion rate, last edited; Edit, Duplicate, Preview link, Publish or Unpublish). Builder: pick from three approved templates (Consultation, POSH Compliance, Document Review); reorderable blocks Hero, Benefits, Trust points, Process, FAQ, Form with simple fields (no free HTML); settings: validated unique slug, SEO title and description, no-index, UTM capture, default form category; side-by-side live preview; expiring preview links. PUBLIC /lp/[slug]: minimal navigation (logo and call button), conversion focus, brand styling, short form (name, mobile, email, category, message, consent), stores utm_source, utm_medium and utm_campaign with the submission, footer disclaimer, no testimonials or result claims.
Prompt 2.7 Users, roles and sessions (A-15)
Build /admin/users (Super Admin only): table (name, email, role, MFA status, last login, status Active, Invited, Deactivated) with Invite, Edit role, Reset MFA, Deactivate, Reactivate, Force logout. Invite dialog (email, name, role, optional IP allow-list) showing what access the person will get. User drawer: profile, role, active sessions (device, browser, IP, last active, Log out this session), recent activity. Roles and Permissions tab: an interactive matrix (modules by roles with R, C, U, D, P, X chips) with a diff and confirmation on change; protect the last Super Admin; banner for roles needing mandatory MFA (Super Admin, Admin, Finance).
Prompt 2.8 Notification centre (A-16)
Build the bell dropdown (unread badge, latest 8 with icon, title, time; Mark all as read; link to the centre), /admin/notifications (tabs All, Unread, Requests, Questions, Payments, Security; read and unread styling; bulk actions; date filter), a Preferences tab (matrix of events by In-app and Email; security alerts cannot be turned off with an explanation; sound for new requests and questions; daily digest time), and a toast component with an Open action, six-second auto-dismiss, pause on hover. Connect to the mock real-time provider.
Prompt 2.9 Reports (A-17)
Build /admin/reports for Admin, Finance and Super Admin: report picker cards (Requests summary, Response time and SLA, Conversion by source, Q&A backlog and answer rate, Blog performance, Payments and settlement, Refunds); filters (date range, category, assignee, source); KPI tiles with deltas; a chart; a detailed table; Export CSV and PDF (disabled with a tooltip without X); a "Compare with previous period" toggle; a "Scheduled reports" dialog (weekly email to recipients); empty and loading states.
Prompt 2.10 Audit log (A-18)
Build /admin/audit (Super Admin only): append-only table with Time (IST), Actor, Role, Action (create, update, delete, publish, login, failed login, role change, export, settings change), Entity, IP, and View. Filters: actor, role, action, entity, date range, IP. Detail drawer with before and after diff in a two-column view with sensitive fields "[redacted]", plus user agent and request ID. An Export button that itself writes an audit entry. Banner: "This log is read-only and cannot be edited from the application." A small chart of events per day and a "Suspicious activity" chip (repeated failed logins, exports outside hours, role changes).
Prompt 2.11 Settings and maintenance (A-19)
Build /admin/settings (Super Admin only) with tabs: General (site name, contacts, alert recipients), Email (sender, SPF, DKIM, DMARC checklist, Send test email), Payments (Razorpay Test or Live switch with confirmation, webhook status, secrets masked and never editable), Security (idle timeout, absolute session limit, rate limits, lockout policy, optional IP allow-list, MFA summary), Retention (periods per record type), Maintenance (toggle with a preview of the visitor notice, scheduled window, admins keep access). Sticky Save bar with a change summary and Reset to defaults. Also build the global idle-timeout modal "You will be signed out in 2:00" with Stay signed in and Sign out now.
Prompt 2.12 Polish and handover
Review the admin: consistent spacing and badges; loading, empty and error states on every table; validation, disabled states and unsaved-changes protection on every form; keyboard order; aria-live announcements; layouts to 768px; role hiding on every route (test all six roles); no external fonts or scripts. Generate /docs/api-contract.md (every mock service function with intended REST endpoint, request and response) and /docs/realtime-events.md (event names, payloads, allowed roles).
Phase 3: POSH Basic and Standard
Goal: a working complaint and case workflow in a third v0 project (the POSH portal), on its own sub-domain. v0 runs the logic in the browser against an in-memory store; the real back end enforces the same rules (Part C, B9 to B12). Have Acorn counsel confirm every deadline in the rules file before production.
Prompt 3.0 Project Instructions (portal rules)
You are building the POSH (Prevention of Sexual Harassment) compliance and case-management portal for Acorn Legal Consultants, Kolkata. It supports the Sexual Harassment of Women at Workplace Act, 2013 workflow and handles extremely sensitive information. Safety, dignity and confidentiality come before visual flair.
STACK: Next.js App Router, TypeScript, Tailwind, shadcn/ui, lucide-react, react-hook-form + zod, date-fns, Zustand with persist disabled (memory only, no localStorage for case content). Mock backend in /lib/mock behind /lib/api. Fonts via next/font only. NO analytics, NO third-party scripts, NO external fonts or images.
ROUTE GROUPS: complainant (/posh/portal, /start, /file, /my-case, /concern, /retaliation), respondent (/posh/respondent), IC workspace (/posh/ic), organisation console (/posh/org), Acorn console (/posh/admin). Developer-only "Sign in as" switcher: Complainant, Respondent, IC Presiding Officer, IC Member, External Member, Organisation Admin, Acorn POSH Administrator, Super Admin.
TRAUMA-INFORMED DESIGN: a Quick Exit button on every page (click or Esc twice) that clears in-memory state and replaces the location with an internal /neutral page that looks like a generic weather or news page (never an external site); neutral page titles and notification text; calm quiet-blue palette (navy #1F3864, soft blue #EEF3FA, ink #1B1F27, slate #5B6573, gold used very sparingly); no red, gentle amber for errors; no pop-ups, countdown timers or urgency language; every step says what happens next, who will see it and how long it takes; language switch (English, Bengali, Hindi); typed, audio or assisted filing; nothing submits until a review screen is confirmed; a persistent "Talk to someone" link; never ask about clothing, behaviour, past relationships or character; grade-8 reading level; WCAG 2.1 AA; 360px support; no CAPTCHA (honeypot only).
CONFIDENTIALITY (enforce in code): (1) case content visible only to users assigned to that case who signed the confidentiality undertaking and conflict declaration; (2) lists show masked names and case IDs only; (3) emails, notifications and real-time events contain only case ID, generic text and dates; (4) Organisation Admins and Acorn POSH Administrators never see complaint text, and Super Admin needs break-glass with a written reason that auto-expires and is logged; (5) every view, download, edit, export and print writes an audit entry; (6) case content is excluded from global search.
CASE ID: POSH-ORG-YYYY-NNNN. Dates stored UTC, shown IST (dd MMM yyyy). Currency INR. All statutory numbers live in /lib/posh/rules.config.ts (effective-dated, with a "counsel to verify" comment); never hard-code a deadline elsewhere. Footer: "This portal records and routes information. It does not give legal advice. Decisions are made by the Internal Committee."
Prompt 3.1 Core engine (/lib/posh)
Create pure, unit-tested TypeScript with Vitest.
1 rules.config.ts (effective-dated, editable): complaintPeriodMonths 3, extensionMonths 3, ackBusinessDays 1, triageDays 7, copyToRespondentWorkingDays 7, respondentReplyWorkingDays 10, hearingNoticeLeadDays 7, inquiryDays 90 with anchor complaintReceived or inquiryStart, reportDays 10, employerActionDays 60, appealDays 90, interimDecisionWorkingDays 3, exParteNoticeDays 15, interimLeaveMonthsMax 3, icTenureYearsMax 3, draftExpiryDays 30, aftercareDays [30, 90, 180].
2 calendar.ts: working days with configurable weekly off, holiday union (Central, West Bengal, organisation), addWorkingDays, addCalendarDays, addMonths, workingDaysBetween; seed 2026 and 2027 holidays.
3 timeline.ts: computeTimers(case) returns TM-01 to TM-21 with {code, name, startsAt, dueAt, status notStarted|running|dueSoon|overdue|met|stopped, alertsAt, explanation} where explanation is a plain-English sentence. The 90-day clock stops only for a recorded legal ground (court stay, or conciliation before the inquiry began); any other delay needs a reason code and is counted for reporting. Alerts at 15, 7, 3 and 1 days before deadlines plus overdue.
4 stateMachine.ts: states DRAFT, SUBMITTED, TRIAGE, LATE_REVIEW, AWAITING_INFO, CONCILIATION, NOTICE_ISSUED, INQUIRY, LEGAL_STAY, DELIBERATION, REPORT_ISSUED, ACTION_PENDING, ACTION_COMPLETED, APPEAL_WINDOW, APPEAL_FILED, REFERRED_LC, REJECTED, WITHDRAWN, CLOSED. Transitions T01 to T30 as a table {id, from, action, guards, to, sideEffects}; availableActions(case, user); transition() throws a typed GuardError with a kind, human-readable message. Guards include: required fields, consents and OTP signature for submit; conflict declaration signed before triage; last incident older than three months goes to late review; extension within a further three months with reasons; conciliation terms must not be monetary (scan for money terms); quorum for notice and inquiry; stay order uploaded; ex parte only after three non-appearances and 15-day notice; report needs findings, majority decision and quorum signatures; closure needs note and outcome code; reopen needs two approvals. Every transition appends audit, recomputes timers and queues notifications.
5 routing.ts: rules RT-01 to RT-21 as pure functions returning {outcome IC|LC|NonStatutory|ConcernReport|ChildProtection|NoTenant, reasons, warnings, flags}. Never block submission; store and explain.
6 committee.ts: validateIcComposition (senior woman Presiding Officer, minimum members, an external member, at least half women, tenure under 3 years) with warnings 90, 60, 30 days before tenure end.
7 evidence.ts: real SHA-256 via Web Crypto, chain-of-custody log, release rules (documents separate per party until the IC approves release).
8 permissions.ts: canAccessCase(user, case) enforcing the confidentiality rules including break-glass.
9 audit.ts and notifications.ts: append-only audit; a notification factory that THROWS if any field is outside an allow-list (caseId, orgCode, date, genericMessage).
10 seed.ts: two organisations (one with three branches, one with six employees for the Local Committee case), full IC rosters, eight cases in varied states, a user for every persona. Write Vitest tests for working-day maths, every transition guard, all 21 routing rules, deadlines, composition and the notification allow-list.
Prompt 3.2 Portal home, Quick Exit, applicability wizard
Build /posh/portal and /posh/start. HOME: calm hero "A safe place to raise a concern", three cards (Start a complaint, Report a concern without giving your name, Check my case), a confidentiality statement, a six-step "What happens after you file" preview with typical durations, a permanent "Talk to someone" panel (helpline directory with last-verified dates, Intake Counsellor contact), Quick Exit and language switcher in the header, and a /neutral decoy page. WIZARD: one question per screen with Back and Skip: organisation or invitation code, office or branch, relationship to the organisation, who the person involved is (colleague, superior, employer, third party), where it happened, date of the most recent incident, age band, whether the organisation is registered. Run routing.ts and explain the result kindly (Internal Committee, Local Committee referral with a downloadable pack, late-complaint explanation with the extension option, concern report, child-protection protocol, or "your organisation is not on this portal yet" with information only and no data stored). Never a dead end.
Prompt 3.3 Complaint form, signature, confirmation
Build /posh/file as a guided multi-step form with a stepper, "Saved just now" indicator and "Save and exit". Steps: A Routing (prefilled). B About you (name, gender identity, age band, designation, department, employee ID, email, mobile, safe contact preferences, language, accessibility needs, support person, filing on behalf of another with authorisation upload). C The respondent (repeating: names, relationship, designation, department, contact). D What happened (first and most recent incident dates, place, nature of conduct as multi-select with plain examples, description up to 10,000 characters in typed, audio-recording or assisted mode, witnesses, earlier reports, effect on you, safety concern now, other legal action). E What you want (inquiry, conciliation, interim relief, compensation, other). F Evidence (up to 20 files, 25 MB each; real SHA-256 shown as "Fingerprint saved"). G Declarations (statement of truth, consent to share with the respondent and IC, consent to data processing, typed-name signature). Optional fields never block. Review screen in plain language with Edit links; nothing submits until "Submit my complaint". /posh/file/sign: six-digit OTP (mock 123456 with a dev banner) and typed signature. /posh/file/done: case ID, receipt wording "Your complaint has been received. The details are private.", printable locked copies with verification code, next steps and support. On submit run transition T01 and create the neutral IC notification. Also support assisted filing by an Intake Counsellor with recorded consent.
Prompt 3.4 Complainant area (C-06 to C-12)
Build /posh/my-case (stage name only, plain "what happens next", key dates from the timer engine, hearings, notices addressed to her, messages), /my-case/docs (documents released to her; supplementary upload with hash and scan status), /my-case/interim (interim relief form with the 3-working-day decision tracker), /my-case/request (withdraw, or request conciliation with a plain note that money cannot be the basis of settlement), /my-case/support (support person, interpreter, accommodations), /posh/concern (anonymous concern report with a secure inbox code and an explanation of what an anonymous concern can and cannot do), /posh/retaliation (priority form creating a linked fast-track case, T29).
Prompt 3.5 Respondent portal (R-01 to R-03)
Build a respectful, neutral respondent portal with equal dignity. /posh/respondent: the notice with process explanation, rights, anti-retaliation statement, reply deadline from the timer engine (10 working days from receipt of the copy) and the copy of the complaint as released by the IC, with a read receipt. /respondent/reply: reply text, hashed document uploads, witness list, "Request more time" decided by the IC. /respondent/status: dates, hearings, released documents, the report when issued. The respondent never sees complainant identity beyond what the IC releases, IC notes, or other parties' documents unless released.
Prompt 3.6 IC sign-in, declarations gate, workspace home
Build /posh/ic. DECLARATIONS GATE (I-11): before opening any case an IC member signs a confidentiality undertaking and a case-specific conflict-of-interest declaration, with a "I have a conflict, recuse me" path that triggers recusal and reassignment with audit; enforce with canAccessCase(). HOME: My cases table (masked names, case ID, stage, age, next deadline chip running, due soon, overdue; urgent flag), a next-10-deadlines widget, tasks, filters, live alerts from the mock real-time layer (metadata only, generic text "You have an update"). /posh/ic/guide: conduct guide and checklists.
Prompt 3.7 Case file and triage (I-02, I-03)
Build /posh/ic/cases/[id] with tabs Overview, Complaint, Parties, Evidence, Hearings, Notices, Notes, Timeline, Report. OVERVIEW: stage, progress bar, "Available actions" generated only from availableActions() (disabled actions show the guard message kindly), all timers with plain explanations, case diary. COMPLAINT and PARTIES show real names only here, with field-level Reveal that writes an audit entry, a watermark with the viewer's name and time, and a notice that views and prints are logged. NOTES private to the IC. TIMELINE visual of timers, stops and legal grounds. TRIAGE: completeness checklist, routing confirmation with reasons, limitation status with the late-review path (T04 to T06, extension by majority with reasons), declarations status, urgent needs, Request information (T07, T08), Start conciliation (T09), Refer to Local Committee (T03), Accept for inquiry and issue notice (T12) only when guards pass.
Prompt 3.8 Conciliation and notices (I-04, I-05)
CONCILIATION: written request on record; terms-of-settlement editor with a live guard that detects monetary terms (amounts, pay, compensation, rupees, Rs, INR) and blocks saving with "Money cannot be the basis of settlement under the Act. Please describe non-monetary terms."; consent checkboxes for both parties; recorded outcome; forward to the employer; Settle (T10) and Resume (T11). NOTICES: template picker (acknowledgement, notice to respondent with copy, hearing notice, document request, findings intimation, extension order, interim relief order) with admin-managed merge fields ({{caseId}}, {{respondentName}}, {{replyDueDate}}, {{hearingDate}}, {{icPresidingOfficer}}); live preview; warn if a hearing notice gives less than the minimum lead days; delivery log (email status mock, portal read receipt, timestamps). The respondent notice must be issued within 7 working days of receipt with a visible countdown and breach status.
Prompt 3.9 Hearings and the evidence vault (I-06, I-07)
HEARINGS: scheduler (date, IST time, mode, video link entered manually, participants), automatic hearing notice, attendance and minutes, adjournment with a mandatory reason code (counted in reporting, never a silent clock pause), structured witness statements, non-appearance counter; after three consecutive non-appearances with sufficient written notice (15-day tracker with reminders on day 10 and 14) offer T18 with a recorded order. EVIDENCE VAULT: exhibit list; uploads by IC and parties; real SHA-256 fingerprint with a Verify integrity button; per-file access; chain-of-custody log (viewed, downloaded, released); dynamic watermark with user ID; download counts; redaction notes; "Release to other party" needing approval by an IC member and audited. Parties' documents stay separate until released.
Prompt 3.10 Findings, report, interim relief, closure, appeal
FINDINGS AND REPORT: editor (summary, issues, evidence considered, findings with reasons per issue, majority decision with votes, recommendations, proposed action); compensation worksheet listing the statutory factors with narrative, optional INR amount and instalment scheduler; a "report lint" panel (completeness, quorum signatures, 10-day deadline) that blocks issuing on failures; T19 issues a locked read-only report with timestamp and verification code to the employer and both parties. INTERIM RELIEF: request, decision within 3 working days, employer implementation tracking, leave limit. EMPLOYER ACTION: 60-day timer (T20 to T22), proof upload, IC verification, overdue flag from day 61 with escalation. APPEAL: 90-day window tracker (T23 to T25) and a legal-hold banner when an appeal is recorded. CLOSURE AND AFTERCARE: checklist, outcome code and note, retention clock, check-ins at 30, 90 and 180 days, reopen (T27) with dual approval.
Prompt 3.11 Organisation and Acorn consoles
Neither console may show complaint content. ORGANISATION CONSOLE (/posh/org): home with tasks and deadlines; IC roster (O-02) with member roles, gender, tenure and live composition validation, tenure alerts at 90, 60, 30 days, vacancy warnings; employer action tasks (case ID and recommended action only, proof upload, 60-day timer); aggregated reports with no identities. ACORN CONSOLE (/posh/admin): onboard organisations and branches with headcount (Local Committee flag under 10), assign IC members, oversight of timelines (masked list), support requests, notice template management with versions and approval, and a break-glass dialog for Super Admin (written reason, 60-minute expiry, alert to the Managing Partner, permanent log).
Prompt 3.12 Audit, notifications, real-time
Build the POSH audit viewer (filter by case ID, user, role, action view, download, edit, export, print, reveal, break-glass, transition, release; export is itself audited; append-only banner). Build the notification centre using a mock real-time provider whose events are strictly {caseId, orgCode, eventType, genericMessage, dueDate}: posh.case.new, posh.case.stage, posh.deadline.approaching, posh.deadline.overdue, posh.notice.read. Email previews (acknowledgement, new complaint alert, deadline alerts at 15, 7, 3 and 1 days) contain only case ID, organisation and dates. Add a unit test proving that putting complaint text in a notification throws. Add alert banners for approaching and breached deadlines.
Prompt 3.13 Polish, test, handover
Verify and fix: Quick Exit and neutral titles on every complainant and respondent page; no red error styling; every state-machine action reachable only when guards pass; masked names in every list; canAccessCase() blocks every unauthorised persona; audit records view, reveal, download and transition; 360px and keyboard navigation; no third-party requests; loading, empty and error states; all Vitest tests pass. Generate /docs/posh-api-contract.md, /docs/posh-state-machine.md (T01 to T30), /docs/posh-timers.md (TM-01 to TM-21 with the rules config) and /docs/posh-realtime.md.
Phase 4: POSH Advanced (multi-organisation)
Goal: tenancy, compliance, reporting and integrations. Continue in the same POSH v0 project. Plan names follow PRD Section 8.12.2: Starter, Professional, Enterprise.
Prompt 4.0 Project Instructions additions
MULTI-TENANCY: every record carries orgId; all data access goes through a tenant-scoped repository /lib/posh/tenant.ts that throws without a tenant context; Acorn POSH Administrators access only assigned organisations; Vitest tests prove a user in organisation A can never read, list, count, export or search organisation B's data through any service function. AGGREGATE-ONLY RULE: scores, analytics, annual reports and readiness packs use metadata and aggregates only and never complaint content, names or identifiers; breakdowns enforce a minimum group size (default 5, configurable) merging small cells into "Other" or "Fewer than 5". SENSITIVE ACTIONS (retention, legal hold, case-file export, role changes, API keys, break-glass) require re-authentication (password plus OTP mock 123456). LANGUAGES: English, Bengali, Hindi via a typed dictionary with a "needs review" flag. DESIGN: status bands (Green, Amber, Orange, Red) always carry text and an icon. Use real browser libraries: docx, jspdf, jszip, qrcode, Web Crypto (SHA-256, HMAC-SHA256, AES-GCM).
Prompt 4.1 Tenancy, organisations, branches, settings
Types: Organisation {id, code, legalName, type, plan, branding, language, retention, settings, status}; Branch {orgId, name, state, district, headcount, icRequired (headcount >= 10), icId}. tenant.ts scoped repository with TenantViolationError logged to audit. Tests: for every service function, org A cannot access org B. Seed four organisations: a 420-employee manufacturer with branches in West Bengal, Maharashtra and Karnataka; a listed company with BRSR duties; a 6-employee firm (Local Committee case); a government PSU. Tenant switcher in the Acorn console with a clear "Viewing: [Organisation]" banner. /posh/org/settings (A-003): timeline defaults, inquiry anchor, weekly off, holiday editor, acknowledgement text, template overrides, language, retention, minimum group size; every change audited with a diff.
Prompt 4.2 Onboarding wizard, plans, service catalogue
Wizard /posh/admin/orgs/new: legal details and type, locations and branches with headcount (live IC-required and Local Committee flags), IC rows, contacts, plan and add-ons, branding preview on a sample notice, review and create (runs composition validation, creates onboarding tasks). Catalogue /posh/admin/catalogue: services PS-01 to PS-21 (gap audit, policy drafting, IC constitution support, external member panel, Local Committee liaison, notice pack, awareness programme, manager training, IC orientation, induction, refresher, intake desk, case secretariat) with code, deliverables and delivery tasks; plan builder (Starter, Professional, Enterprise) with usage limits and INR price; assign a plan. /posh/org/plan (O-09): current plan, usage meters with an 80 percent warning, invoices list, "Upgrade request" form.
Prompt 4.3 HRMS directory by CSV (EXT-08)
Build /posh/org/directory: downloadable CSV template (employee ID, name, department, location or branch, designation, gender, manager ID, joining date, email, mobile, employee type); upload with PapaParse, column mapping with auto-detect, validation (duplicate IDs, missing branch, bad dates, invalid emails) with a downloadable error report, a dry-run summary ("120 new, 14 updated, 3 removed, 5 errors"), confirm and import. After import update branch headcount, recompute IC-required and Local Committee flags and create tasks where a branch crosses 10 employees. Directory table visible only to Organisation Admin and Acorn service staff; audit every import; support removing a leaver while keeping aggregate counts.
Prompt 4.4 Policy library and acknowledgements
Build /posh/org/policies: policies (POSH policy, gender-neutral annex, remote and hybrid annex, third-party clause) with versions, effective dates, language versions, status Draft, Active, Superseded; publishing supersedes the old version. Acknowledgement campaigns: choose version, audience (all, department, location, new joiners), due date, reminders at 14, 7 and 1 days; progress bar and pending table with Send reminder. Employee page /posh/acknowledge/[token] (one-time link, read, tick "I have read and understood this policy", receipt, mobile friendly). Policy currency feeds the score: the current version must be acknowledged by at least 90 percent. Reminder emails are content-free.
Prompt 4.5 Notice display tracker
Build /posh/org/notices (CMP-03, CMP-22): printable notice generator (statutory notice of penal consequences, IC order, member contacts) per branch in English, Bengali, Hindi with org logo as print-ready PDF, text marked "[to be approved by Acorn counsel]"; display tracker (location, photo hashed, date verified, verifier, next verification in 12 months with alerts at 60, 30, 0 days); website disclosure tracker (page URL, screenshot, last verified, checklist of IC details, contacts, online complaint procedure). Both feed the "Notice display" score domain.
Prompt 4.6 Awareness training module
Basic module (the full LMS is Phase 5): course builder (lessons as text, document link or video link; quiz with pass mark and attempts; validity in months; audience; language versions; approval status) seeded with TRN-101, TRN-102, TRN-201, TRN-301, TRN-601. Learner page /posh/learn/[token] (one-time link, lesson player with resume, quiz with feedback; a "Need help or want to raise a concern?" button showing the helpline directory and concern-report link, never a free-text box). Certificates as PDF with name, course, date, expiry, verification code and a real QR code (qrcode); public /verify/[code]. Session register with attendance upload. Dashboard (O-05): completion by department and location, overdue learners, expiry list, IC orientation status; learner-level data only for Organisation Admin and Acorn service staff.
Prompt 4.7 Compliance duty register and health score
Engine /lib/posh/compliance.ts and config. DUTY REGISTER: seed CMP-01 to CMP-23 (constitute IC, composition, notice display, policy, workshops, IC orientation, facilities, assistance, information, criminal complaint support, action within 60 days, timeline monitoring, annual report, Board's Report, BRSR, SHe-Box, inclusive policy track, records and inspection readiness, vendor awareness, process timelines, annual POSH audit, website disclosure, retaliation protection) with source section, evidence stored, frequency, status Met, Due soon, Overdue, Not applicable, last evidence date, plain-language consequence and a linked service (PS code). SCORE: computeScore(org, branch?) 0 to 100: IC validity 20, Policy 10, Notice display 8, Employee awareness 15, IC training 10, Annual report 12, Case handling timeliness 12, SHe-Box 5, Board's Report and BRSR data 4, Documentation and audit readiness 4. Bands: 90 to 100 Green, 75 to 89 Amber, 50 to 74 Orange, below 50 Red. Rules: IC validity zero for any branch of 10 or more employees without a valid IC; awareness full marks at 90 percent trained in 12 months; policy needs 90 percent acknowledgement; deductions per overdue case. The engine reads only aggregates (test that it cannot access complaint content). Store daily history; show the top five gaps with consequence, action and linked service. UI: gauge with band text, domain bars, 12-month chart, task list with owners and escalation, branch scores; Vitest tests for each domain and band.
Prompt 4.8 Annual report generator
Build /posh/org/reports: wizard (organisation, financial or calendar year) with auto-compiled figures (complaints received, disposed, pending over 90 days, workshops, nature of action, IC composition) and clearly marked manual entries. Output DOCX (docx library) and PDF (jspdf) with logo, title, period, Presiding Officer signature block, reference number; template config so the district format (D-19) changes without code. Strictly aggregate: a test scans generated text for party names or case IDs and fails if found. Statutory counts are exact; category breakdowns use the minimum group size. Submission tracker with alerts at 60, 30, 14, 7 days. Extra generators: Board's Report disclosure sheet (including gender headcount), BRSR extract, SHe-Box data sheet; each carries a "counsel to verify format" banner.
Prompt 4.9 Analytics with re-identification protection
Build /posh/org/analytics and /posh/admin/analytics: cases by stage; average days per stage against targets; overdue cases; outcomes; volume over time; training coverage by department; retaliation reports (counts only); respondent-type split; adherence for TM-05, TM-06, TM-08, TM-09, TM-10. Department and location cuts pass through the minimum-group-size function with an explanatory note. A policy effectiveness view comparing two periods. The Acorn version shows portfolio analytics across assigned organisations (aggregate only). CSV export applies the same suppression, with a test proving suppressed cells never appear in the export.
Prompt 4.10 Retention, legal hold, encrypted export
RETENTION: per-organisation rules (default for counsel to confirm); a "Run daily check" button simulating the scheduler flags closed cases for review at 90 and 30 days; the review screen shows case ID, closure date and outcome only; options extend, archive or securely delete with DUAL APPROVAL, reason and re-authentication; deletion leaves a non-identifying statistical record; cases under legal hold can never be deleted. ENCRYPTED EXPORT (Presiding Officer only): PDF bundle with index, evidence hashes and report, encrypted with AES-GCM using a passphrase through Web Crypto, downloaded as .enc, with a decrypt utility page; requires re-authentication; audited; passphrase never stored.
Prompt 4.11 Integrations, reminders, audit-readiness pack
API keys (scoped directory:write and compliance:read, shown once, revocable, last used, rate limit); an OpenAPI 3 spec and readable page for POST /api/v1/directory and GET /api/v1/compliance/status (aggregate only); webhooks (URL, events compliance.score.changed, training.completed, deadline.approaching) with signing secrets and real HMAC-SHA256 signatures, Send test event, delivery log and retry. Reminder configuration matrix (events by roles and channels; SMS or WhatsApp marked "paid provider, DLT registration needed"), with a test that every template contains no sensitive text. Audit-readiness pack: one button builds a ZIP (jszip) with index.html and folders for IC orders, policy and acknowledgement summaries, notice records, training registers, annual reports and timeliness statistics, no case details, audited.
Prompt 4.12 Bilingual interface and passkeys
Add typed i18n (en, bn, hi). Translate the complainant portal, respondent portal, learner pages and notices first. Language switcher for the session, correct Bengali and Devanagari rendering (Noto Sans Bengali and Noto Sans Devanagari via next/font), locale number and date formats, layouts that survive longer text, "needs review" flags for Acorn admins and a translation coverage report. Add an optional WebAuthn passkey enrolment screen (UI and mock service) with a recovery-codes view, noting that TOTP MFA remains mandatory.
Prompt 4.13 Polish, tests, handover
Verify: tenant isolation tests pass for every service function; the compliance engine and annual report never read complaint content; analytics and exports apply the minimum group size; every sensitive action asks for re-authentication and is audited; DOCX, PDF, ZIP, QR, HMAC and AES-GCM outputs work; Bengali and Hindi render; keyboard, 360px and tablet layouts; no third-party requests except next/font. Generate /docs/phase4-api-contract.md, /docs/compliance-scoring.md, /docs/annual-report-spec.md, /docs/retention-spec.md and /docs/webhooks.md.
Phase 5: Service, support and training suite
Goal: subscriptions, LMS, surveys, service desk, directory, assistant and the Legal Console. Same POSH v0 project. These prompts add three staff personas: L1 Support Executive, Legal Administrator and Intake Counsellor.
Prompt 5.0 Project Instructions additions
SERVICE DESK TIERS (enforce in code): L1 Support Executives handle account access, how-to, training and invoices and NEVER see case content. L2 POSH Administrators, Intake Counsellors and service managers handle onboarding, IC setup, compliance tasks, scheduling and assisted filing; Intake Counsellors see content only during assisted filing and aftercare; POSH Administrators never, except by break-glass. L3 Legal Administrator, counsel and senior engineers handle rules, templates, legal questions, defects and security incidents; counsel only on assigned cases; engineers never see production data.
CONTENT GOVERNANCE: every legal parameter, template, notice, directory entry, KB article, assistant answer and lesson is versioned content (Draft, In review, Approved, Published, Retired) needing a second approver; documents print the rule-set and template version in the footer.
LINT: notification templates may use only caseId, orgName, date, dueDate, portalLink, genericMessage; any other merge field fails a test. PRIVACY: free-text survey answers are screened for names and contact details before anyone reads them; reporting cells under the minimum group size (default 5) are hidden. Tickets, assistant chats and surveys never collect complaint content. SLA clock: all logic in /lib/posh/sla.ts using the working-day calendar (09:30 to 18:00 IST, Monday to Friday plus organisation holidays; P1 runs 24 by 7).
Prompt 5.1 Catalogue, plans, subscriptions (SVC-001 to SVC-006)
Rename plans Starter, Professional, Enterprise everywhere. Starter: up to 100 employees, 1 branch, 3 cases a year (policy template, IC setup, notices pack, employee e-learning, annual report data sheet, portal for one IC). Professional: up to 1,000 employees, 5 branches, 15 cases a year (adds audit, manager and IC training, case secretariat, compliance score, quarterly review, Board's Report data pack, one climate survey a year). Enterprise: custom limits (adds external member panel, report drafting support, retaliation monitoring, HRMS sync, BRSR extract, multi-language, dedicated service manager). Add-ons: extra cases, storage, training seats, on-site sessions, appeal support, languages. Admin catalogue with versions and effective dates, price points in INR, GST (default 18 percent), billing cycle. Subscriptions: one active per organisation, usage counters, 80 percent warning banner, a limit breach blocks NEW cases only after Acorn approval and NEVER blocks or suspends access to an open case; a failed renewal notifies Finance and the organisation and does not suspend access. Ordering a service creates delivery tasks and a visible service timeline; service SLA report. GST invoices (CGST and SGST or IGST, series ACN-INV-2026-0001) as PDF, mock Razorpay payment link with return pages. Tests for limits, the 80 percent warning, the open-case rule and GST.
Prompt 5.2 LMS authoring and governance (LMS-001, LMS-007)
Build /posh/admin/lms: courses with code, audience (all, managers, IC members, Presiding Officers, vendors, new joiners, HR), duration, language versions, validity, pass mark, attempts, status and version; lessons (rich text, document link, video link, quiz); question bank (single, multi, scenario) with feedback and randomisation. Seed TRN-101 (35 min, 10 questions, pass 80 percent, valid 12 months), TRN-102 (25 min, 8 scenarios), TRN-201 managers (45 min, 12 scenarios), TRN-301 IC members (3 hours blended with mock inquiry exercise), TRN-302 Presiding Officer masterclass (valid 24 months), TRN-401 remote and hybrid (20 min), TRN-501 vendors (15 min), TRN-601 induction (once), TRN-701 HR and employer duties (60 min). Only the Legal Administrator approves; publishing needs a second approver; a "change in law" flag marks lessons tagged to a changed rule "Needs legal review"; learner-mode preview at desktop and mobile widths; autosave and revision compare.
Prompt 5.3 Assignments and learner experience
ASSIGNMENT ENGINE (/posh/org/training): assign to all, department, location, role, manager; new joiners auto-assigned within 30 days of joining; due dates and annual recurrence; a "Run assignment job" button creating assignments without duplicates, with a preview. REMINDERS: due minus 14, 7, 1 days; overdue escalates to the manager then the Organisation Admin; content-free templates and a delivery log. LEARNER (/posh/learn/[token]): one-time link, six-digit verification (mock 123456) so staff need no password, mobile-first player with progress and resume, quizzes with retries, pass or fail feedback, certificate with QR; a persistent "Need help or want to raise a concern?" button opening the helpline directory and the concern-report link, with NO free-text box anywhere. Tests: dedupe, 30-day window, reminder schedule, attempts limit.
Prompt 5.4 Live sessions, certificates, LMS reports
SESSIONS: schedule in-person or online (course, date, trainer, audience, venue), generate a QR and short check-in code; attendees check in at /posh/checkin/[code] by employee ID or QR link; alternative CSV attendance upload; optional post-session quiz gates the certificate; attendance feeds the annual report. CERTIFICATE REGISTER: learner, course, issue, expiry, code, status (valid, expiring in 60 days, expired, revoked), reissue, revoke with reason. REPORTS (LMS-006): completion by department, location and course; overdue; average scores; expiry timeline; IC orientation within 60 days of appointment and refreshed within 12 months. Learner-level rows only for the Organisation Admin and Acorn service staff; others see k-anonymised aggregates; CSV export applies the same rules and is audited.
Prompt 5.5 Climate and pulse surveys (PRV-001, PRV-002)
Build /posh/org/surveys and /posh/survey/[token]. BUILDER: single choice, multi choice, 1 to 5 scale, free text; sections, required flags, branching; schedule, reminders, language versions; anonymous links with unguessable one-use tokens NOT linked to employee IDs in the stored response. TEMPLATES: climate and pulse (10 to 20 questions on awareness, trust, safety, willingness to report, retaliation fears, bystander confidence), bystander and manager pulse, exit feedback after case closure. RESULTS: hide or merge any cell below the minimum group size for every breakdown; free-text goes through screening that flags names (matched to the directory), phones, emails and IDs and redacts them before anyone reads them, with a flagged-for-review queue; a test proves suppressed cells never appear in the UI or CSV. ACTION PLANS (PRV-003): findings become tracked tasks with owner, due date, status.
Prompt 5.6 Organisation risk assessment
Build /posh/org/risk: questionnaire by domain (locations and hours incl. night shifts, field work and travel; power imbalances; remote and hybrid; vendors and third parties; past complaint trends auto-filled from aggregates; reporting channels; trust in the process from the latest pulse survey; support facilities). Each answer carries a weight from rules config; compute a score per domain and an overall Low, Moderate or High rating with the top drivers. Output a heat map by domain and location (suppress locations under 5 employees), a prioritised action list linked to PS services, an action plan creating tracked tasks, history comparison and a PDF export. No individual data is read.
Prompt 5.7 Helpdesk and ticketing (DESK-001 to DESK-003)
Build /posh/help and /posh/desk. TICKETS: category (Account access, How-to, Training, Billing, IC setup, Compliance task, Scheduling, Technical issue, Legal content, Security concern, Other), priority P1 to P4, attachments with scan status chip, optional case ID link, change history, staff-only internal notes. CONTENT GUARD: block submission and warn when the text appears to contain complaint content (incident words, names matched to parties of the linked case, long narrative with a case ID): "Please do not include details about a case here. Use the case ID only." An agent can link a case ONLY if assigned (canAccessCase); L1 agents see only the case ID. SLA ENGINE: P1 first response 15 minutes (24x7), resolve in 4 hours or workaround; P2 1 business hour and 1 business day; P3 4 business hours and 3 business days; P4 1 business day, planned. Timers Running, Due soon, Breached, Met; escalation ladders (P1 Managing Partner and security lead; P2 POSH Administrator then service manager; P3 team lead; P4 product owner). Vitest tests across weekends, holidays and after hours. Tools: macros with allowed merge fields, knowledge-base suggester, satisfaction survey (1 to 5), weekly report of categories, SLA performance, repeat issues.
Prompt 5.8 On-call rota and P1 paging (DESK-004, DESK-005)
Build /posh/desk/oncall: weekly rota calendar (primary and secondary, phone, email, swap requests with approval) and a published escalation matrix (for example P1: on-call at 0 minutes, secondary at 10, Managing Partner at 20). P1 PAGING SIMULATION: creating a P1 ticket starts an escalation run that "pages" by phone and email (mock providers with a delivery log), repeating until acknowledged; live timeline; every attempt audited; "Test paging drill" button. Quarterly review reminder with sign-off record and an overdue banner after 90 days. Security incident quick action "Suspected confidentiality breach" creating a P1 ticket with the incident checklist.
Prompt 5.9 Aftercare, retaliation monitoring, feedback, process grievance
AFTERCARE: when a case closes create check-in tasks at 30, 90 and 180 days (TM-19, alert 3 days before) for the Intake Counsellor; the screen records ONLY retaliation (No, Yes, Unsure), support needed (checkboxes, no narrative) and date; Yes or Unsure offers one-click creation of a linked fast-track retaliation case (T29) with a generic-text notice to the POSH Administrator. RETALIATION MONITORING: counts per period with k-anonymity feeding CMP-23. POST-CLOSURE FEEDBACK: optional anonymous experience survey. PROCESS GRIEVANCE: a route from both portals ("I have a concern about how this process is being run") to the Managing Partner or grievance officer, confidential inbox, no access for the IC or the people complained about. Add a reusable anti-victimisation statement component used in every notice template.
Prompt 5.10 Support directory and guides
Build /posh/support (public) and /posh/admin/directory: entries for emergency (112), women's helpline (181), legal helpline (15100), SHe-Box, police, district legal services authority, counselling and medical referrals, an approved counsellor panel, interpreter and sign-language panel, legal aid; search and filters by type and language; every entry shows "Last verified: dd MMM yyyy by [name]" and a freshness chip (current, verify soon after 90 days, stale after 180). Admin: draft and approval, bulk re-verify with reminders, export. Interpreter and counsellor request flow creating a task and logging the interpreter in hearing minutes. District directory for West Bengal (District Officers, Nodal Officers) used by the Local Committee referral pack and annual report. Plain-language guides /posh/guide in English, Bengali, Hindi ("Before you file", timelines, confidentiality, helpful evidence, alternatives).
Prompt 5.11 Knowledge base and rule-based assistant
KNOWLEDGE BASE (/posh/kb and admin): searchable articles per role, versioned, approved by the Legal Administrator, with last-reviewed dates and helpful or not-helpful feedback. ASSISTANT: a floating chat that is rule-based, NOT a language model, using keyword scoring over approved articles in /lib/assistant. First message: "I am an automated guide. I give general information only, not legal advice, and I cannot take details of a complaint here." Answer from approved articles with the link; with no confident match offer the helpline directory and "Create a service request"; if the user types anything that looks like complaint content, stop discussing it, respond calmly and show the helpline directory, concern-report channel and Quick Exit. Never ask for names, phones or case details. Log only anonymous intent and fallback counts. Seed 30 approved Q&A entries and Vitest tests for matching, fallback and the complaint-content redirect.
Prompt 5.12 Legal Console (LEG-001 to LEG-006)
Build /posh/legal. (1) RULE SETS: every parameter with value, source note and approver; editing creates a DRAFT version with an effective date; new cases use the rule set in force at the triggering event and existing timers keep theirs unless a migration is approved; conciliation_allows_monetary is locked false (code change only). (2) Dual approval before publishing, recording who, when, what, why and legal source. (3) SCENARIO GATE: an in-browser runner of 40 timeline scenarios (month-end, leap-year, weekends, holidays, last day of limitation, extension, inquiry anchor variants, rule-set change mid-case, conciliation stop and resume, ex parte notice); publishing is BLOCKED while any scenario fails, with a diff of expected versus actual dates. (4) Templates and content with content lint and preview; notification template management per language; holiday calendars (central, West Bengal). (5) Statutory watch list with owner, due date, status and overdue alerts. (6) Rule-set diff viewer and rollback.
Prompt 5.13 Offboarding and contract pack
CONTRACT PACK per organisation: documents and key terms (term, plan, retention, sub-processor approvals, DPA version), version history, expiry alerts at 90, 60, 30 days. OFFBOARDING WORKFLOW: freeze new cases; confirm legal holds and open cases; encrypted export for the employer (AES-GCM, passphrase handed over separately); employer acknowledgement receipt; agreed secure-deletion date; dual-approved deletion respecting legal holds; final certificate of deletion with no case details. Every step audited with re-authentication on export and deletion.
Prompt 5.14 Quality and security layer
Add: Playwright journeys (file complaint and receive case ID; IC declarations gate; conciliation money-term block; notice and timer start; report and employer action; annual report; tenant isolation; ticket without case content; assistant redirect; survey small-cell suppression; Legal Console publish blocked by a failing scenario) with a nightly README; axe checks and a manual accessibility checklist; Lighthouse CI (performance 90, accessibility 95) and a k6 script (100 concurrent learners, 50 concurrent ticket creators); a penetration-test tracker (/posh/admin/security) with findings, severity, owner, status, retest date, evidence and a go-live gate indicator (Critical and High must be fixed and retested); a lint test that fails the build if any template uses a disallowed merge field.
Prompt 5.15 Hypercare console and handover pack
Build /posh/admin/hypercare: per-organisation go-live date with a 30-day countdown, daily health checklist (timers firing, notifications delivering, backups, error rate, open P1 and P2 tickets), bug triage board (New, Investigating, Fix ready, Verified), refresher scheduler, closure report generator. Generate downloadable role manuals and quick-start sheets (Complainant, Respondent, IC Member, Presiding Officer, Organisation Admin, POSH Administrator, Intake Counsellor, Support Executive, Legal Administrator), runbooks (incident, P1 paging, backup and restore, key rotation, retention, offboarding) and an operations calendar of recurring duties.
Prompt 5.16 Final integration review
Review Phases 3 to 5: tenant isolation tests for every new service function; no ticket, chat, survey or LMS screen can collect complaint content; k-anonymity applied wherever aggregates appear; SLA and rule-set scenario tests pass; content lint and permission-matrix tests pass; L1, L2 and L3 personas see exactly their tier; 360px and keyboard; no third-party requests; loading, empty and error states. Generate /docs/phase5-api-contract.md, /docs/sla-spec.md, /docs/legal-console-spec.md, /docs/assistant-spec.md and /docs/lms-spec.md.
Phase 6: Operations and hypercare console (/ops)
Goal: the control room for Acorn staff. v0 cannot monitor real servers or send pages; it builds checklists, gates, timers, procedures and evidence. Real monitoring, backups and paging are wired in by DevOps (Part G).
Prompt 6.0 Operations addendum
Build an Operations area at /ops for Acorn staff only; personas Managing Partner, Security Lead, Tech Lead, DevOps, QA Engineer, Service Manager, Privacy Officer, Finance, Product Owner, Legal Administrator. Every procedure is a state machine with owner, time targets, evidence uploads, an audit entry per step and a visible overdue state. Nothing in /ops shows complaint content (case IDs only). Sensitive operations (break-glass approval, retention execution, key rotation, rollback, refund over a threshold) need re-authentication and a second approver where the procedure says so. All targets live in /lib/ops/ops.config.ts (RPO 15 minutes for the database and 1 hour for files; RTO 4 hours for the full platform and 1 hour for the public site and request intake in degraded mode; availability 99.5 percent monthly; warranty 30 days). Dense staff skin with an environment banner (Production or Staging) and global search across SOPs, tickets, incidents and releases.
Prompt 6.1 Command centre, KPIs, availability
Tiles: environment health (Healthy, Degraded, Incident), open incidents by severity, open P1 and P2 tickets, go-live gate status per phase and organisation, warranty days remaining, overdue SOP duties, next release, last backup and restore drill. KPI panel with target, actual, trend and Met, At risk or Missed: enquiry conversion 2 percent or more; first response under 1 business day (median); Q&A answered within 3 business days for 90 percent or more; four or more articles a month; payment success 85 percent or more; POSH timeline adherence 100 percent; Core Web Vitals good. Availability calculator against 99.5 percent showing the downtime budget (about 3 hours 36 minutes in a 30-day month), consumed and remaining minutes and a projected breach warning. Weekly operations digest as PDF.
Prompt 6.2 Go-live readiness gate
Per phase and per organisation POSH launch, track these 17 items with owner, status, evidence, date and sign-off: (1) Must requirements accepted in UAT; (2) no open S1 or S2, scan and pen test reviewed; (3) production hardened; (4) environment variables and secrets set, test keys removed, live Razorpay keys and webhook secret configured; (5) Razorpay live tested with a small real transaction and refund; (6) domain, DNS, TLS and email authentication verified; (7) admin users created, MFA enrolled, demo accounts removed; (8) legal pages, disclaimers and cookie logic live; (9) content loaded; (10) SEO, sitemap, Search Console and Analytics configured; (11) backups running and restore tested; (12) monitoring and alert recipients tested; (13) rollback plan reviewed; (14) staff training done and manuals handed over; (15) POSH legal sign-off, tenant isolation tests passed, break-glass documented; (16) production smoke test passed; (17) hypercare contact list shared. The gate is RED while any item is open, any S1 or S2 defect is open, any Critical or High pen-test finding is open or tenant tests have not passed. "Approve go-live" needs two approvers, re-authentication and an audit entry and is blocked while red with a list of blockers. Include a smoke-test form and a printable contact list.
Prompt 6.3 UAT manager
Script library by role and phase with steps, expected result and evidence upload; execution with Pass, Fail, Blocked per step, failures linking to new defects, hashed screenshots, a coverage matrix against Must requirements; a 5-working-day UAT window clock; computed entry criteria (zero open critical or high defects, Must requirements tested, performance and accessibility passed) and exit criteria (UAT signed, no open critical or high defects, medium defects with an agreed plan, scan clean, rollback verified, go-live checklist complete); sign-off sheet PDF with tester names, results and signature block; a counter for the one design-revision round and one functional-correction round per phase, flagging extra rounds as chargeable.
Prompt 6.4 Release, rollback, feature flags (SOP-22)
Release calendar (fortnightly; warn on Fridays, before holidays or at peak hours unless urgent with a reason; hot fixes on demand; legal rule updates are data changes through the Legal Console). A six-stage pipeline tracker: commit (lint, types, unit tests, secret scan); pull request (integration tests, SAST, dependency scan, build, review); merge (build and preview deploy); staging (migrations, end-to-end and smoke tests, DAST); production (manual approval, database backup first, blue-green or rolling, smoke tests); post-release 60-minute monitoring. Rollback panel: an S1 or S2 in the window starts a 30-minute rollback timer with checklist, re-authentication and record. Per-organisation feature flags with a kill switch and degraded-mode notice; release announcements without case data; release history with outcome.
Prompt 6.5 Hypercare, defects, warranty
Defects S1 to S4 (S1 platform or confidentiality failure; S2 major function broken or timers or notifications failing; S3 minor with workaround; S4 cosmetic) with statuses and links to UAT scripts, tickets and releases; engineers reproduce with synthetic data only. Warranty tracker of 30 days per go-live with classification In warranty or Out of warranty (new feature, content change, third-party change, change outside process) and a chargeable flag. Daily run checklist, stand-up note and an exit test: close only when no S1 or S2 are open and the last 7 daily checks passed. Refresher scheduler per role.
Prompt 6.6 Monitoring, status page, degraded modes
Simulated monitors with a swappable interface: uptime for home page, API health, payment endpoint; CPU, memory, disk, database thresholds; job heartbeats (timer scan every 5 minutes, reminders, retention, backups) with alert rules, recipients, Test alert and history. Build a real PII scrubber /lib/ops/scrub.ts (emails, phones, tokens, IPs, directory names, case narrative fields) with Vitest tests including attempts to smuggle complaint text; a structured JSON log viewer (90-day retention). Switchable degraded modes: portal down (public banner with Intake Counsellor contacts), payment gateway down (payment buttons disabled while requests still work), email failure (on-screen confirmation with reference ID and queued retries). A public plain-language /status page by component with incident history and maintenance windows.
Prompt 6.7 Incident management (SOP-01)
Interactive 11-step workflow with severity SEV-1 to SEV-4: (1) detect and report immediately with a content guard; (2) triage by the Security Lead within 30 minutes for SEV-1; (3) contain by the Tech Lead within 2 hours (disable path, revoke sessions, rotate keys, block links, pause jobs) with simulated one-click actions; (4) preserve evidence (snapshot logs, hold audit exports); (5) assess within 24 hours what was exposed to whom; (6) notify authorities with a live 6-hour countdown from the noticed-at time for CERT-In where applicable and the Data Protection Board when the breach provisions apply (counsel confirms scope); (7) notify the client with template N-SEC within 24 hours; (8) support affected people through the Intake Counsellor within 24 hours; (9) counsel assesses employer consequences within 5 business days; (10) recover and review within 5 business days; (11) close with a final report to the Managing Partner within 10 business days, retained 8 years. Each step shows timer, owner, evidence and notes, a timeline and a final report PDF. Records hold case IDs only.
Prompt 6.8 Break-glass (SOP-02)
Replace the earlier dialog with the full workflow: (1) a POSH Administrator submits case ID, reason (technical fault, court order, regulator request, other), the exact data needed and proof that no less intrusive route exists; (2) the Managing Partner approves, with a SECOND reviewer for content access, both re-authenticating; (3) access goes to one named person for the minimum period (default 60 minutes, hard maximum 2 hours) after signing a case-specific undertaking; (4) every view and download is logged and the Presiding Officer automatically receives a content-free message that Acorn accessed the case; (5) access expires automatically with a visible countdown and the person writes a record of what was done; (6) a monthly review compares break-glass events with tickets and flags exceptions. Tests prove access cannot start without both approvals or exceed 2 hours.
Prompt 6.9 Backup, disaster recovery, drills (SOP-15)
Backup dashboard: policy (point-in-time recovery 7 days, daily snapshots 35 days, weekly 12 weeks, separate India region and account; object versioning and replication; deleted objects recoverable 35 days), last success per component, RPO and RTO targets, daily check with overdue chip. Quarterly RESTORE DRILL checklist: restore database and object storage, decrypt a test case, verify the audit chain, run smoke tests, record elapsed time against the 4-hour RTO, sign off. Build a REAL audit-chain verifier (each audit entry stores the SHA-256 hash of the previous entry plus its own content; verify the whole chain; a "simulate tampering" button proves detection). Runbooks for region failure, database corruption, ransomware, key loss, accidental deletion, provider outage and payment gateway outage with triggers, actions, communication templates, owners; a contact tree; yearly key-recovery test with two custodians; note crypto-erasure of a case key renders backup copies unreadable.
Prompt 6.10 SOP register and recurrence engine
Register SOP-01 to SOP-22 (incident workflow, break-glass, legal hold, retention review, annual report cycle, org onboarding, offboarding, joiner mover leaver, on-call and escalation, rule-set and template change, statutory watch review monthly, complainant welfare contact, data subject requests, payments, backup and DR, access review quarterly, vendors yearly and on change, complaint about Acorn, external panel assignment, content moderation, script change approval, release management) with owner and frequency. Build /lib/ops/recurrence.ts with tests: generate dated tasks (daily, monthly, quarterly, yearly, event-driven), assign owners, show Due soon and Overdue, store run records with evidence and sign-off; include monthly OS and dependency patching (emergency patching of critical vulnerabilities within 48 hours), quarterly cloud configuration review, annual penetration test, quarterly escalation-matrix and script reviews. Access review and joiner-mover-leaver: export roles, manager attestation (keep or remove), removals within 2 working days with a timer, leaver checklist completed before the leaving date.
Prompt 6.11 Privacy, vendor, service-complaint operations
DATA SUBJECT REQUESTS (SOP-13): intake, identity check, 30-day timer, types (access, correction, erasure, withdrawal of consent), a mandatory explanation of POSH confidentiality and legal-hold limits, decision with reasons, letter template, audit trail; cases under legal hold show why erasure is refused. VENDORS (SOP-17): register (hosting, email, SMS, payments, antivirus, key management) with questionnaire status, contract terms, India hosting flag, yearly review and a publishable sub-processor list. COMPLAINTS ABOUT ACORN (SOP-18): acknowledge within 2 working days, independent partner review with a conflict guard, response within 15 working days. EXTERNAL PANEL (SOP-19): conflict check against organisation, parties and counsel, fee and independence declaration, rotation history, training currency check.
Prompt 6.12 Payment operations (SOP-14)
Daily reconciliation of platform orders versus mock settlements (matched, unmatched, delayed) with sign-off and an overdue chip; failed or disputed payment queue with a 2-working-day timer; refunds with reason code, second approval above a threshold (default Rs 10,000) and re-authentication, GST records exportable; Razorpay readiness checklists for test scenarios (success, failure, pending, cancel, duplicate callback, delayed webhook, refund) and the live test (one small real transaction and refund), with a reminder to remove test keys; a payment-outage drill switching degraded mode on and off.
Prompt 6.13 Handover, training, support model
Handover acceptance per deliverable (role manuals, quick-start sheets, runbooks, API docs, architecture notes, environment setup, deployment guide) with version, owner, download and acceptance tick by the product owner. Two training sessions per phase with attendance, materials, feedback and sign-off. Support model after warranty: retainer configuration (response times by priority, covered versus chargeable work, monthly report schedule) and a transition checklist. Key-person dependency table (critical knowledge area, primary and backup owner, last knowledge transfer) flagging areas with no backup.
Prompt 6.14 Closure report and six-month review
Closure report generator per phase and overall (PDF): scope delivered, UAT results, go-live dates, defects by severity, warranty usage, SLA performance, KPIs against targets, availability against 99.5 percent, incidents with lessons, outstanding items with owners, sign-off block. Six-month review page: KPI actuals versus targets, backlog and enhancement requests (P4) with prioritisation, quarterly security items, a Now, Next, Later roadmap board, and a lessons-learned log that feeds SOP updates.
Prompt 6.15 Final review and documentation
Review /ops: every procedure step has an owner, timer and audit entry; sensitive actions require re-authentication and the second approver; no screen or log shows complaint content; scrubber, recurrence, break-glass and audit-chain tests pass; the go-live gate cannot turn green while any blocker is open; 360px layouts for on-call and incident screens; keyboard and accessibility. Generate /docs/ops-runbook-index.md, /docs/go-live-checklist.md, /docs/dr-runbooks.md, /docs/incident-playbook.md, /docs/monitoring-spec.md and /docs/ops-api-contract.md.
Phase 7: Gap closure (optional)
Items from the PRD that the main phases did not cover, plus two enhancements that the PRD lists as out of scope. Enhancements ship behind feature flags that default off, only after change-control sign-off. The tables referred to as [paste table] in Prompts 7.1 to 7.3 are reproduced in Appendix R6. The product never advises which route a person should choose.
Prompt 7.0 Additions
CHANGE CONTROL: items marked [ENHANCEMENT] are outside the agreed scope; build each behind a feature flag (default off). NEUTRALITY: never advise which route or forum a person should choose; list options in plain language, record what the person says they chose, and state that using one route never removes the right to use another. ADMIN-MANAGED LISTS: organisation types, relationship types, places, sector overlays, remedies routes and charters are data with versions, effective dates and dual approval. Where a value is not supplied use "[to be confirmed by counsel]", never an invented legal statement.
Prompt 7.1 Remedies and justice pathways
Build /posh/options: a neutral, plain-language page shown at the start of the wizard and at closure, listing routes relevant to the person's situation as cards (what it is, who may use it, what to expect, typical timeline, cost, contact), seeded from PRD Section 8.34 (REM-01 Internal Committee inquiry, REM-02 Local Committee, REM-03 SHe-Box, REM-04 police and criminal law, and the remaining routes up to REM-17) [paste table]. No route is preselected or ranked and there is no pressure language. Required statement on every card and the footer: "Using the Internal Committee does not remove your right to approach the police or a court." In the IC case file add a panel recording other routes the person told us about (route, forum, reference number, date, who recorded it); a court or tribunal matter shows on the timeline and offers the legal-hold banner; a guard blocks any note text implying discouragement. Directory entries have a "needs verification" badge after 180 days.
Prompt 7.2 Sector overlays (SCT-R01 to SCT-R04)
Build /posh/admin/overlays: admin-managed lists for organisation types, relationships and places with versions and dual approval; seed overlay codes SCT-01 to SCT-17 from PRD Section 8.33 [paste table], including sectors routed to the Local Committee (households, unorganised sector, organisations under 10 employees) and counsel-assisted ones (armed forces and police, political parties and trade unions). Each overlay switches on a training variant, notice template variant, risk question set and routing hint. Counsel-assisted overlays create the tenant in "Pending counsel approval": it cannot be activated and no complaint can be filed until counsel approves with a note. At triage the Presiding Officer or counsel records the forum and legal basis chosen (the Act, university regulations, service rules, organisational policy) with decision-maker, date and reasons; this drives the timers and templates and appears in the case diary. For unsettled positions (for example gig and platform workers, SCT-09) show a gentle explanation, store the matter and route it to counsel without turning anyone away.
Prompt 7.3 Party charters and witness link
Build a charter component shown on the first screen each party uses (complainant portal, respondent notice, witness link, IC workspace, organisation console) from PRD Section 8.35 [paste table]: for the complainant (file with help, confidentiality, know what happens next and by when, ask for conciliation without monetary terms, ask for interim relief, a fair hearing) and for the respondent (copy of the complaint, time to reply, to be heard, a reasoned report, appeal, confidentiality, respectful treatment). A "Got it" acknowledgement is recorded with the date; calm tone, equal dignity, English, Bengali, Hindi; governed content with versions and approval, version printed in notice footers. Witness link: one-time page for a witness invited by the IC with their charter, a statement field limited to case issues or an upload, a confidentiality undertaking, logged access and no view of other parties' material.
Prompt 7.4 Amendment-readiness sandbox (LAW-37)
Extend the Legal Console with /posh/legal/sandbox. Clone the current rule set into a sandbox copy with a "SIMULATION - NOT LAW" banner on every screen and output; change parameters (complaint period months, whether conciliation before inquiry is allowed, other timelines) and an effective date; run the 40-scenario suite and an impact report (open cases whose deadlines would change, transitions newly allowed or blocked, templates and wizard texts that would change, as counts and case IDs only). Never alter live timers; publishing a real change still uses dual approval and the scenario gate. Output a printable note for counsel. Tests prove sandbox changes cannot affect production timers.
Prompt 7.5 [ENHANCEMENT] SMS and WhatsApp reminders
Behind the flag channels.messaging (default off): provider settings (mock provider, template IDs, sender ID placeholder), per-user opt-in with a confirmed phone, a content-free template library (only caseId, orgName, date, dueDate, portalLink, genericMessage, enforced by the lint test), per-event channel matrix, delivery log (queued, sent, delivered, failed) with retry, quiet hours 21:00 to 08:00 IST except an explicit safety alert type, and an opt-out keyword. For complainants default OFF and shown as "safe contact preferences". Tests for opt-in, quiet hours and the lint rule.
Prompt 7.6 [ENHANCEMENT] Installable web app (PWA)
Behind the flag pwa.learner, add installable behaviour ONLY for the public site, learner pages and organisation console: manifest and icons; a service worker that caches only static assets and NEVER case content, complainant or respondent pages or API responses with personal data (a test lists every excluded route); an offline page; an install prompt never shown on complaint or respondent screens. The POSH complainant and respondent portals stay non-installable and non-cached so nothing sensitive is left on a shared phone.
Prompt 7.7 Regression pass
Verify: remedies pages never rank or pressure; the discouragement guard works; pending-approval tenants cannot receive complaints; forum decisions drive the right timers; charters appear on every first screen and are versioned; the sandbox cannot affect live timers; messaging and PWA are inert while flags are off; no new third-party requests; 360px, keyboard, Bengali and Hindi on all new screens. Re-run all earlier Vitest and Playwright suites. Generate /docs/phase7-spec.md with the data model, API contract and feature-flag list.
Part E. Antigravity programme: agents, skills and workflows
This part is the complete configuration for running the Acorn programme in Google Antigravity: a project constitution, 27 specialist skills, master workflows for the four parts of the programme, and the step-by-step commands. The same content ships as a ready-to-copy .agents folder (Acorn_Antigravity_Agents_Pack.zip).
E1. Set-up and operating principles
Mode: use Planning mode for every design or build task. Read the Implementation Plan before approving.
Rules, skills and workflows: save the constitution as a workspace rule (always on), each skill as a folder with a SKILL.md, and each workflow as a Markdown file run with a slash command. Folder names differ between versions (.agents or .agent); trust the Customizations panel.
Browser agent: install the Chrome extension, keep the URL allowlist on (localhost only), and make the agent attach screenshots and recordings to every stage.
Terminal policy: request review for installs and any deployment command.
Sub-agents: where available, skills run in parallel with their own context. If not, open one conversation per parallel row, give each a git branch and merge in the stated order.
Gates: every stage ends with build, lint, type-check, tests, screenshots, a walkthrough and a commit, then waits for approval.

Folder
Contains
Notes
.agents/AGENTS.md
Constitution with rules for all four parts
Always on; every agent reads it
.agents/skills/<name>/SKILL.md
27 skills with a YAML header (name, description) and steps
Loaded when the task matches the description
.agents/workflows/*.md
3 master workflows and 6 recurring workflows
Run with /build-acorn and so on
docs/DESIGN_SYSTEM.md
Quiet Authority design system
Referenced by the art director and builders
docs/PRD.md and docs/PLAYBOOK.md
The PRD and this playbook as Markdown
Convert with pandoc so agents can read them


E1.1 Parallel ownership and merge order
Stage
Parallel agents and the folders each owns
Merge order
Website phase 4
A: Home. B: About, Services index and detail. C: POSH landing, Insights, FAQ. D: Request service, Contact, Pay, legal pages, campaign template
A, B, C, D, then art director review
Website phase 5
SEO and compliance, accessibility, performance, security
Accessibility, performance, SEO, security
App stage 2
A: requests and Q&A. B: content, media, scripts. C: payments. D: email and files
D, A, B, C
App stage 3
A: dashboard and live feed. B: requests and questions. C: posts, pages, media. D: users, roles, audit, settings
A, B, C, D
App stage 5
A: intake and evidence APIs. B: case lifecycle and IC UI. C: portal UIs. D: notifications, audit, break-glass
D, A, B, C
App stage 6
A: organisations and compliance. B: reports and analytics. C: learning. D: service desk and Legal Console
A, D, C, B
Launch stage 8
A: command centre. B: go-live gate, UAT, releases. C: incident, break-glass, DR. D: SOPs and operations
A, B, C, D


E1.2 When something goes wrong
Problem
Fix
The agent starts rewriting copy
Revert. Rule 1 of the constitution: suggestions go to docs/COPY_SUGGESTIONS.md. Use Undo changes up to this point.
Two agents edited the same file
Stop both. Re-run with one agent per folder, or use separate branches and merge in order.
The build breaks after a merge
Revert the last merge and re-apply one agent at a time, running the build after each.
The design looks generic
Run the polish command (Command 8) and supply three reference sites for layout principles, not copying.
A skill never activates
Improve the description line (it must say when to use the skill) or name the skill in the prompt.
Quota runs out
Run phases on separate days; use Planning mode for the big stages and short runs for fixes.


E2. Project constitution (.agents/AGENTS.md)
# ACORN LEGAL CONSULTANTS: PROJECT CONSTITUTION
 
## Mission
Transform the existing Next.js website into a premium, editorial, blue-and-ivory law-firm website, then build the application layer (API, admin, POSH portals), launch it safely and operate it. The design source of truth is docs/DESIGN_SYSTEM.md. Brand lines: "Excellence in Law. Integrity in Practice." and "Where Legal Expertise Meets Strategic Excellence."
 
## PART 1 RULES: WEBSITE REDESIGN (always apply)
1. The site is already built and its content is configured. DO NOT delete, rename or rewrite existing content, routes, API routes, forms, payment logic, environment variables or data files. Restyle, restructure presentation and add components around them. Copy suggestions go to docs/COPY_SUGGESTIONS.md and are not applied.
2. Detect the stack first (Next.js version, App Router or Pages Router, styling system, component library). Adapt to it. If Tailwind or shadcn/ui are missing, propose adding them in the plan and wait for approval.
3. Use only design tokens from docs/DESIGN_SYSTEM.md. No hard-coded hex values in components.
4. Legal advertising rules: no testimonials, client results, rankings, guarantees, "best lawyer" claims or invented statistics. Use [placeholders] for unknown facts. Keep the disclaimer in the footer of every page.
5. Banned UI: popups, newsletter modals, auto-play carousels, infinite marquees, scroll hijacking, splash loaders, chat widgets, parallax over 24px, repeating animation.
6. POSH pages and portals use "calm mode" (fade-only motion, no red alarm styling, no urgency language). Admin and console screens are dense and functional.
7. No new dependency without listing it in the plan (name, size, reason). At most one animation library (Framer Motion or GSAP).
8. Performance budget: LCP under 2.5s, CLS under 0.1, INP under 200ms, Lighthouse accessibility 95+.
9. Never read, print or commit secrets or .env values.
 
## PART 2 RULES: APPLICATION LAYER
Source of truth: docs/PRD.md and docs/PLAYBOOK.md (back-end prompts B0 to B17). Where they disagree with a screen or skill, the PRD wins and you must say so.
1. Real complaint data never exists outside production. All seed and test data is synthetic.
2. Never log, print or store complaint content, names, phone numbers or tokens in logs, errors, tickets, notifications, analytics or test output. Use the PII scrubber.
3. Notifications, emails and real-time events carry only case ID, organisation code, generic text and dates. A lint test must fail the build if any other merge field appears.
4. Case access is enforced on the SERVER by one function (canAccessCase). Hiding buttons in the UI is not security.
5. Every record carries orgId; every query goes through the tenant-scoped repository. Cross-tenant access throws and is audited.
6. The audit log is append-only with a hash chain. No update or delete path exists in application code.
7. Secrets only from environment variables validated at startup.
8. Money in paise integers; dates in UTC, shown in IST.
9. Security-critical areas (auth, MFA, encryption, key handling, canAccessCase, rules engine, payments, break-glass, retention, export) MUST be flagged "NEEDS HUMAN REVIEW" and cannot be merged by agents alone.
10. Legal rules and timelines live only in packages/rules config files, effective-dated, with a "counsel to verify" comment. Never hard-code a deadline elsewhere.
Method: plan first; tests first for security and rules code; each stage ends with build, lint, type-check, tests, a walkthrough artifact and a git commit, then wait for approval.
 
## PART 3 RULES: LAUNCH
1. You NEVER receive, read, request or store production credentials, private keys, live payment keys or real personal data. Production deployment runs only from the CI pipeline after a human approves. Do not run deployment commands against production from this editor.
2. Deploy only to STAGING, only with synthetic data.
3. No force-push, history rewriting, or deleting tags or branches without explicit instruction. Every release has a git tag and a rollback plan.
4. Never disable a failing test, security check or lint rule to make a pipeline pass. Report the defect.
5. Infrastructure is code: everything is committed and reviewable. No manual-only steps without a written runbook.
6. Operational screens (/ops) never show complaint content; they use case IDs only.
7. Every procedure is a state machine with owner, time targets, evidence upload, audit entry per step and overdue state.
8. Defaults for open legal decisions are not yours to choose. Where the PRD says counsel must confirm, build the setting and leave it Open.
 
## PART 4 RULES: OPERATIONS
1. Production is read-only for you. You may analyse exports, scrubbed logs and metrics.
2. Law and rule changes go ONLY through the Legal Console workflow. You may prepare the draft and test results; you may never publish, approve or activate a rule set.
3. Dependency upgrades: patch and minor versions may be proposed in a branch with tests. Major upgrades need approval and a plan. Critical security fixes are proposed immediately with a rollback plan.
4. Every recurring task writes evidence into docs/ops-evidence/YYYY-MM/.
5. Never weaken a test, alert or security setting to quiet noise.
6. Content you propose is marked "for counsel review" and never contains testimonials, results, rankings, guarantees or legal advice.
 
## WORKING METHOD (all parts)
- Always plan before coding. Produce an Implementation Plan and Task List and wait for approval at each gate.
- Respect file ownership when agents run in parallel. Never edit files owned by another agent; leave a note in docs/HANDOFFS.md.
- After each stage: build, lint, type-check, tests, browser screenshots at 360, 768, 1280 and 1536 px, a walkthrough, a commit, then STOP and ask for approval.
E3. Design system (docs/DESIGN_SYSTEM.md)
# ACORN LEGAL CONSULTANTS: PREMIUM DESIGN SYSTEM
 
You are a senior UI/UX designer and design engineer with 15 years of experience designing for top-tier law firms and luxury brands. Every screen must look hand-crafted, calm, expensive and trustworthy. Generic template output is a failure.
 
## 1. Concept: "Quiet Authority"
An editorial, architectural law-firm identity: a Victorian courthouse arch seen through a modern lens. Deep navy, warm ivory, brass details, generous whitespace, strong typography. Confidence comes from restraint.
Signature devices (consistent, never overused):
- Arch-shaped image and card masks (border-radius: 999px 999px 0 0).
- One italic brass accent word in each major headline (Cormorant Garamond italic).
- Hairline 1px rules with a 24px brass tick at the left end as section dividers.
- Oversized outlined section numerals (01, 02, 03) in very low-contrast navy.
- Subtle paper-grain texture (3% opacity SVG noise) on ivory sections.
- Faint line-art oak leaf and acorn motif (SVG, 6 to 8% opacity) as background ornament.
 
## 2. Colour tokens (CSS variables and Tailwind theme)
--ink-950 #07101F | --navy-900 #0E1F3D | --navy-800 #14264A (brand navy-deep) | --navy-700 #1F3864 (brand primary) | --blue-600 #2F5496 (hover, links) | --blue-100 #E4ECF8
--ivory-50 #FBF9F4 (default page background) | --stone-100 #F1EEE7 | --white #FFFFFF
--brass-300 #D9C29A | --brass-500 #B08D57 (brand gold, accents, rules) | --brass-700 #8A6B3A (gold text on ivory; verify contrast)
--text #1B1F27 | --text-muted #5B6573 | --border #D5DAE3
Status: success #1E7B4F, warning #B7791F, danger #B42318, info #1F5FA8.
Gradients: hero = ink-950 to navy-800 with a soft radial brass glow (10% opacity) top right and a faint blue-600 glow bottom left. No neon or rainbow gradients.
All text and interactive elements pass WCAG 2.1 AA. Check every pairing with a script and fix failures at token level.
 
## 3. Typography (self-hosted via next/font, display swap, subsets)
- Display and headings: Cormorant Garamond 500, 600, 700 plus italic 500 for accent words.
- Body, UI, forms: Inter 400, 500, 600 with tabular numerals for figures.
- Fluid scale with clamp(): display-xl 56 to 104px (line-height 1.02, tracking -0.02em), display-l 44 to 72px, h2 34 to 52px, h3 24 to 32px, body-l 19 to 21px, body 17px (line-height 1.65), small 14px.
- Eyebrow: Inter 600, 12px, uppercase, letter-spacing 0.16em, brass-700.
- Paragraph measure 62 to 70 characters. Never justify. text-wrap: balance on headings, text-wrap: pretty on paragraphs.
- Pull quotes: Cormorant Garamond italic 32 to 44px with a large brass quotation mark.
 
## 4. Layout and space
- Container 1240px max, 12-column grid, 24px gutters (16px mobile). Section padding clamp(80px, 12vw, 160px).
- Prefer asymmetric compositions: 7/5 and 5/7 splits, offset images, overlapping cards (max 48px). Centre alignment only for short statements and CTAs.
- Alternate section backgrounds: ivory, white, stone, with one dark navy section per page (maximum two).
- Radius: 6px inputs and buttons, 14px cards, arch masks for hero and portrait imagery.
- Elevation, two levels only. Card: 0 1px 2px rgba(14,31,61,.06), 0 8px 24px rgba(14,31,61,.06). Raised: 0 24px 60px rgba(14,31,61,.14).
- Mobile first from 360px. Test at 360, 390, 768, 1024, 1280, 1536.
 
## 5. Imagery and icons
- NO gavels, scales of justice, handshakes, padlock clip-art or generic stock photos of suits.
- Use abstract architectural line art, arched windows and doorways, oak-leaf and acorn line illustrations, topographic contour patterns, soft navy gradient meshes. Photography direction (supplied by Acorn): warm natural light, books and paper, hands writing, Kolkata architectural details, shallow depth, slightly desaturated.
- Until real photos exist, use tasteful gradient and line-art placeholders with clear labels, never grey boxes.
- If image generation is available, generate only abstract textures and patterns, never faces or people.
- Icons: lucide-react, 1.5px stroke, brass-500 or navy-700, 24px, inside a 48px soft circle only when needed.
 
## 6. Motion (premium, never annoying)
- Purposeful, short, subtle, once. 200 to 450ms, easing cubic-bezier(0.22, 1, 0.36, 1). Animate only transform and opacity.
- Allowed: headline line reveal (once), 24px fade-up for sections, image clip-path reveal, count-up (once), card hover lift 4px with a cursor-following spotlight (desktop pointer only), animated link underlines, magnetic effect on the main hero button only, sticky header that shrinks and blurs after 24px scroll, thin brass reading-progress bar on articles, View Transitions API route transitions at 250ms.
- Banned: auto-play carousels, auto-play video with sound, infinite marquees, parallax over 24px, 3D tilt, confetti, cursor trails, splash loaders, scroll hijacking, blocking animation, repeating animation.
- Respect prefers-reduced-motion: replace motion with instant states.
 
## 7. Component standards
- Buttons: primary = navy-700 background, ivory text, 52px high, 6px radius, brass arrow slides 4px on hover; on dark sections primary = brass-500 with ink-950 text. Secondary = 1px navy outline. Text links with animated underline. Focus ring 3px blue-600 with 2px white offset.
- Header: transparent over dark heroes, ivory with blur after scroll. Services opens a mega-menu (2 columns of practice areas plus a description panel). Right side: phone link and primary button. Mobile: full-screen drawer with large serif links, staggered fade-in (max 6 items).
- Cards: white, 1px border, 14px radius, number or icon at top, spotlight hover, arrow appears on hover.
- Forms: 52px inputs, label above, helper text, inline validation in calm amber or red with plain language, filled focus state, character counters, stepper for long forms, success state with a subtle check animation (once).
- Accordion: smooth height animation, plus/minus morph. Tables: hairline rules, sticky header on long tables.
- Footer: ink-950, oversized faint "ACORN" wordmark, four columns, legal strip with the disclaimer.
- Cookie notice: small card bottom-left (max 360px), never blocks the page, three buttons, remembers the choice.
- No chat widgets, newsletter pop-ups, exit-intent pop-ups or sticky banners (except the cookie card).
 
## 8. Page variants
- Marketing pages: full editorial style.
- POSH pages and portals: calm mode. Lighter ivory and soft blue surfaces, fade-only motion, no dramatic dark hero, no red, no urgency language, no exclamation marks, generous whitespace, persistent Quick Exit on complainant screens.
- Admin and organisation consoles (dense skin): white cards on ivory-50, navy sidebar with brass active marker, Inter 14px tables with hairline rules, status chips with icon and text, KPI tiles with a thin brass top rule, charts in navy, blue, brass and slate. No grain, no oak-leaf ornament, no decorative motion except live-feed highlight.
 
## 9. Professional conduct and copy
- Bar Council advertising rules: NO testimonials, client results, rankings, "best lawyer" claims, guarantees or invented statistics. Use principle statements, not numbers. Use [placeholders] for facts not supplied.
- Tone: calm, precise, respectful, active voice, plain language.
- Footer disclaimer on every page: "The information on this website is for general information only and does not constitute legal advice or create a lawyer-client relationship."
 
## 10. Performance and accessibility (non-negotiable)
- LCP under 2.5s, CLS under 0.1, INP under 200ms. next/image, preload the hero font, no render-blocking scripts, no layout shift from fonts or images.
- WCAG 2.1 AA, keyboard navigation, visible focus, skip link, semantic landmarks, alt text, one H1 per page, aria-live for form results.
- No third-party scripts on POSH pages or the admin. No analytics until consent.
- Keep the animation library footprint small (Framer Motion or GSAP, one only).
 
## 11. Definition of done for every page
1. Looks premium at 360, 768, 1280 and 1536 px. 2. Passes contrast and keyboard checks. 3. Uses only tokens. 4. Has loading, empty and error states. 5. No banned motion. 6. A screenshot at each width is attached to the walkthrough.
 
## 12. Page signatures (layout brief per page type)
- Home: split hero with arch glass panel; philosophy statement; practice-area bento; sticky-scroll "How we work" with brass progress line; principles on stone; dark POSH feature panel; insights; FAQ preview; closing CTA.
- About: editorial long-form, offset arch image, full-bleed navy pull quote, numbered approach rows, six values with thin dividers, team arch portraits [to be supplied].
- Services index: premium index list (number, serif title, one line, arrow) with cursor-following arch preview on desktop only. Service detail: sticky table of contents, sticky enquiry card (bottom bar on mobile).
- POSH landing: calm mode, six-step vertical timeline, confidentiality section, short form.
- Insights: magazine layout, featured article, filter chips, 68ch reading column, reading-progress bar, drop cap, pull quotes.
- FAQ: sticky category rail, search, accordion, "Ask a question" panel.
- Request service: three-step form with stepper and a sticky navy reassurance panel. Contact: three info cards, stylised map card. Pay: minimal three-step checkout with calm status pages.
- 404 and 500: elegant arch illustration with helpful links.
E4. Skills catalogue
Twenty-seven skills grouped by programme part. Each description is also the trigger that tells Antigravity when to load the skill.
Part 1 website redesign
Skill
Use when
acorn-codebase-auditor
Use first on the existing Acorn Next.js project. Maps the stack, routes, content sources, styling system, forms, API routes and risks, and writes docs/AUDIT.md. Use before any redesign work.
acorn-art-director
Use when defining or reviewing the visual language, layouts, hierarchy, spacing, imagery direction and brand consistency of any Acorn page. Owns design tokens and the design-system page.
acorn-frontend-builder
Use to build or restyle React and Next.js components and pages for Acorn from the page briefs. Preserves existing content, routes and data wiring.
acorn-motion-engineer
Use for subtle scroll, hover and transition effects: line reveals, fade-ups, count-ups, spotlight hover, sticky header, reading progress, route transitions. Must respect reduced motion and the banned-motion list.
acorn-content-seo-editor
Use for metadata, structured data, sitemap, robots, headings, alt text and legal-advertising compliance checks. Never rewrites existing copy.
acorn-accessibility-auditor
Use to audit and fix WCAG 2.1 AA: contrast, keyboard use, focus, landmarks, forms, reduced motion, touch targets.
acorn-performance-engineer
Use to meet Core Web Vitals: image optimisation, font loading, bundle size, render-blocking resources, layout shift.
acorn-security-reviewer
Use to review headers, CSP, form handling, rate limiting, dependency risks and secret handling for the Next.js site before release.
acorn-browser-qa
Use to verify the running site in a real browser: screenshots at all widths, scroll recordings, console errors, broken links, form flows, and visual comparison against page briefs.
acorn-release-engineer
Use at the end of the website redesign to prepare the release: final build, type-check, lint, bundle report, environment checklist, deployment steps, rollback plan.


Part 2 application layer
Skill
Use when
acorn-backend-architect
Use to design and build the Node, Express, MongoDB and Redis API: monorepo structure, config validation, error envelope, pagination, idempotency, OpenAPI. Follows PRD sections 25 and 27.
acorn-auth-security-engineer
Use for authentication, MFA, sessions, RBAC, tenancy scoping, audit hash chain, encryption and key handling. Always marks work NEEDS HUMAN REVIEW.
acorn-rules-engine-engineer
Use to build packages/rules: calendar, effective-dated rule sets, timers, state machine, routing and committee validation for the POSH workflow. Pure TypeScript, no database.
acorn-posh-confidentiality-reviewer
Read-only red-team reviewer for the POSH module. Tries to break confidentiality: leaks in logs, notifications, lists, search, exports, errors, and cross-tenant or cross-case access.
acorn-admin-ui-builder
Use to build the staff admin console and the organisation and IC consoles in the dense professional skin, wired to the real API through typed clients.
acorn-realtime-payments-engineer
Use for Socket.io live alerts and Razorpay payments. Server-verified amounts, signed webhooks, idempotency, content-free events.
acorn-test-engineer
Use to write and run unit, integration, contract, end-to-end (Playwright), accessibility and load tests, and to keep CI green.
acorn-devops-sre
Use for Docker Compose, CI pipeline, environments, backups, monitoring, background jobs, and release and rollback procedures.


Part 3 launch
Skill
Use when
acorn-deploy-engineer
Use to create infrastructure as code, staging and production pipelines, TLS, secrets handling, WAF and environment configuration. Deploys to staging only.
acorn-uat-coordinator
Use to prepare User Acceptance Testing: role-based test scripts, evidence capture, defect linking, entry and exit criteria, and the sign-off sheet.
acorn-ops-console-builder
Use to build the /ops operations area for Acorn staff: command centre, go-live gate, release and rollback tracker, incident workflow, break-glass workflow, DR drills, SOP register and recurrence engine.
acorn-observability-engineer
Use to implement monitoring, uptime checks, job heartbeats, structured logging with PII scrubbing, error tracking, alert routing and a public status page.
acorn-docs-trainer
Use to produce role manuals, quick-start sheets, runbooks and training material, and to build the handover pack.
acorn-growth-seo-analyst
Use after launch for search visibility, content planning, consent-based analytics and conversion tracking. Never writes legal advice or banned claims.
acorn-gapclosure-engineer
Use to build the optional Phase 7 items: remedies and options page, sector overlays with counsel-approval gate, rights and duties charters, amendment sandbox, and flagged enhancements (SMS or WhatsApp, installable web app).


Part 4 operations
Skill
Use when
acorn-ops-runner
Use for recurring operations: monthly patching, quarterly access and restore reviews, directory re-verification lists, KPI digests, evidence packs. Prepares work and evidence; humans approve.
acorn-rule-change-engineer
Use when a statute, court order, state notification or advisory changes POSH timelines or duties. Prepares a draft rule set, runs scenario tests and an impact report; never publishes.


E5. Skill files (full text)
Create each file at .agents/skills/<skill name>/SKILL.md exactly as shown.
acorn-accessibility-auditor
---
name: acorn-accessibility-auditor
description: Use to audit and fix WCAG 2.1 AA: contrast, keyboard use, focus, landmarks, forms, reduced motion, touch targets.
---
# Steps
1. Run an automated check (axe) per route plus a manual keyboard pass: skip link, header and mega-menu, forms, accordion, drawer, dialogs (focus trap and Escape).
2. Verify every token colour pairing meets AA with a script; fix tokens, not components.
3. Check 44px touch targets, visible focus (3px ring), aria-live for form results, labels, error association and prefers-reduced-motion.
4. Write docs/A11Y_REPORT.md with before and after results.
acorn-admin-ui-builder
---
name: acorn-admin-ui-builder
description: Use to build the staff admin console and the organisation and IC consoles in the dense professional skin, wired to the real API through typed clients.
---
# Steps
1. Use docs/DESIGN_SYSTEM.md section 8 (dense skin).
2. Build TanStack Table lists with server pagination, filters, saved filters and permission-gated CSV export; detail pages with timelines; forms with react-hook-form and zod from packages/shared.
3. Use a <Can> component and useRole() from the permission matrix; every route is also protected on the server.
4. Every list and form has loading, empty and error states and keyboard support.
# Owns
apps/admin
acorn-art-director
---
name: acorn-art-director
description: Use when defining or reviewing the visual language, layouts, hierarchy, spacing, imagery direction and brand consistency of any Acorn page. Owns design tokens and the design-system page.
---
# Role
Senior UI/UX designer. Source of truth: docs/DESIGN_SYSTEM.md.
# Steps
1. Implement tokens (colours, fluid type scale, radii, shadows, easing) in the project's styling system, mapped exactly to docs/DESIGN_SYSTEM.md.
2. Set up fonts with next/font (Cormorant Garamond with italic, Inter), self-hosted.
3. For each page, write a short layout brief (grid, hierarchy, signature device, image treatment) in docs/PAGE_BRIEFS.md before the builder starts, using section 12 of the design system.
4. Review builder output against the brief. Reject template-looking sections: equal-weight card rows with no hierarchy, centred everything, stock-photo styling.
5. Keep one dark section, maximum two, per page and alternate ivory, white and stone.
# Owns
Tailwind config or token CSS, globals.css, app/layout font setup, /design-system page, docs/PAGE_BRIEFS.md
acorn-auth-security-engineer
---
name: acorn-auth-security-engineer
description: Use for authentication, MFA, sessions, RBAC, tenancy scoping, audit hash chain, encryption and key handling. Always marks work NEEDS HUMAN REVIEW.
---
# Steps
1. Implement PLAYBOOK prompts B3 and B4: Argon2id, short-lived signed tokens in httpOnly cookies, rotating refresh with reuse detection, CSRF protection, TOTP MFA with hashed backup codes, lockout after 5 failures, session list and revoke, idle and absolute timeouts, role and permission matrix, tenant-scoped repository, append-only audit with hash chain and a verifier.
2. Write tests first: authorisation matrix for every route and role, tenant isolation for every service function, audit chain tamper detection.
3. Never invent crypto. Use well-known libraries and managed key services. Flag every file NEEDS HUMAN REVIEW.
# Owns
apps/api/src/auth, rbac, audit, tenancy, crypto
acorn-backend-architect
---
name: acorn-backend-architect
description: Use to design and build the Node, Express, MongoDB and Redis API: monorepo structure, config validation, error envelope, pagination, idempotency, OpenAPI. Follows PRD sections 25 and 27.
---
# Steps
1. Read docs/PRD.md sections 12, 25 and 27 and docs/PLAYBOOK.md prompts B0 to B2.
2. Build apps/api with strict TypeScript, zod env validation, pino logging with redaction, helmet, CORS, rate limits, request IDs, the standard error envelope, health and readiness endpoints, and OpenAPI generated from zod.
3. Put shared schemas in packages/shared so the web and admin apps import the same types.
# Owns
apps/api (except auth, rules, realtime, payments folders), packages/shared
acorn-browser-qa
---
name: acorn-browser-qa
description: Use to verify the running site in a real browser: screenshots at all widths, scroll recordings, console errors, broken links, form flows, and visual comparison against page briefs.
---
# Steps
1. Start the dev or production build locally. Visit every route at 360, 768, 1280 and 1536 px; capture screenshots.
2. Record a scroll-through of home, one service page, one article and the request form.
3. Check console errors, 404s, broken links, image failures, hydration warnings, layout shift, clipped or overlapping content.
4. Submit each form with valid and invalid data and verify messages and success states.
5. Compare with docs/PAGE_BRIEFS.md; list defects with page, width and screenshot in docs/QA_REPORT.md.
acorn-codebase-auditor
---
name: acorn-codebase-auditor
description: Use first on the existing Acorn Next.js project. Maps the stack, routes, content sources, styling system, forms, API routes and risks, and writes docs/AUDIT.md. Use before any redesign work.
---
# Role
Read-only investigator.
# Steps
1. Read package.json, next.config, tsconfig, tailwind or CSS setup, app or pages directories, components, content and data files, middleware, API routes and .env.example (never .env).
2. Produce docs/AUDIT.md with: stack and versions; route map with page purpose; where every piece of content lives; existing components and reuse potential; forms and what they call; payment or auth code to protect; existing accessibility, SEO and performance problems; dead code; risks for a redesign; a protected-files list.
3. Run build, lint and a Lighthouse pass on 3 key pages and record baseline numbers.
4. Do NOT modify any file except docs/AUDIT.md.
acorn-content-seo-editor
---
name: acorn-content-seo-editor
description: Use for metadata, structured data, sitemap, robots, headings, alt text and legal-advertising compliance checks. Never rewrites existing copy.
---
# Role
Technical SEO and compliance editor.
# Steps
1. One H1 per page; correct heading order; descriptive link text; alt text for every image.
2. Metadata API on every route (title under 60 characters, description under 160, canonical, Open Graph, Twitter). JSON-LD: Organization and LegalService on home, FAQPage on FAQ, Article on posts, BreadcrumbList.
3. sitemap.xml, robots.txt and an Open Graph image template in brand colours.
4. Scan all copy for banned claims (testimonials, results, rankings, guarantees, superlatives, statistics without source). Report to docs/COMPLIANCE_REPORT.md; do not edit copy.
5. Confirm the disclaimer appears in every footer.
# Owns
Metadata exports, app/sitemap, app/robots, JSON-LD components, docs/COMPLIANCE_REPORT.md
acorn-deploy-engineer
---
name: acorn-deploy-engineer
description: Use to create infrastructure as code, staging and production pipelines, TLS, secrets handling, WAF and environment configuration. Deploys to staging only.
---
# Steps
1. Read docs/PRD.md sections 26 and 27 and docs/PLAYBOOK.md B15 to B17.
2. Create Dockerfiles, compose and IaC for web, admin, api, worker, MongoDB, Redis and object storage, in an India region. Separate dev, staging and production configs with no shared secrets.
3. CI/CD: build once, promote the same image; staging deploy automatic; production deploy requires manual approval; database backup before every production release; blue-green or rolling deploy; rollback target of 30 minutes.
4. Secrets only from a managed secrets store; write names only to docs/ENV_CHECKLIST.md.
5. Security headers, CSP, HSTS, WAF rules, rate limits at the edge.
6. Deploy to staging and prove it with a smoke-test run. Never touch production.
# Owns
infra/, CI config, Dockerfiles, docs/ENV_CHECKLIST.md
acorn-devops-sre
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
acorn-docs-trainer
---
name: acorn-docs-trainer
description: Use to produce role manuals, quick-start sheets, runbooks and training material, and to build the handover pack.
---
# Steps
1. Plain-language manuals for: Managing Partner, POSH Administrator, Intake Counsellor, Support Executive, Content Editor, Marketing Manager, Finance, IC member and Presiding Officer, Organisation Admin, complainant, respondent.
2. Runbooks: incident response, P1 paging, backup and restore, key rotation, retention execution, break-glass, release and rollback, offboarding.
3. Operations calendar of recurring duties (patching, access review, restore drill, directory re-verification, rule-set review, annual report dates).
4. Output to docs/handover/. Use screenshots from the running staging site; no real data.
acorn-frontend-builder
---
name: acorn-frontend-builder
description: Use to build or restyle React and Next.js components and pages for Acorn from the page briefs. Preserves existing content, routes and data wiring.
---
# Role
Design engineer.
# Steps
1. Read docs/AUDIT.md, docs/DESIGN_SYSTEM.md and docs/PAGE_BRIEFS.md.
2. Build reusable primitives (Button, Link, Eyebrow, SectionHeading, Rule, ArchImage, Card with spotlight hover, form fields, Accordion, Stepper) before pages.
3. Refactor pages to use primitives while keeping the existing content source. Never hard-code content that already lives in a data file.
4. Keep components server components unless interactivity is needed.
5. Add loading, empty and error states. Use next/image and next/font.
# Owns
Only the page folders and component files named in the task. Report anything outside via docs/HANDOFFS.md.
acorn-gapclosure-engineer
---
name: acorn-gapclosure-engineer
description: Use to build the optional Phase 7 items: remedies and options page, sector overlays with counsel-approval gate, rights and duties charters, amendment sandbox, and flagged enhancements (SMS or WhatsApp, installable web app).
---
# Steps
1. Build items as admin-managed, versioned, dual-approved content. Never state which route a person should choose; always show "Using the Internal Committee does not remove your right to approach the police or a court."
2. Sector overlays needing counsel assistance create the organisation in "Pending counsel approval"; no complaint may be filed until approved.
3. The amendment sandbox must be unable to influence live timers; every output is stamped "SIMULATION - NOT LAW".
4. Enhancements ship behind feature flags, default OFF, only after change control.
acorn-growth-seo-analyst
---
name: acorn-growth-seo-analyst
description: Use after launch for search visibility, content planning, consent-based analytics and conversion tracking. Never writes legal advice or banned claims.
---
# Steps
1. Verify sitemap and Search Console readiness (submission is a human step), review Core Web Vitals field data, and propose a quarterly content calendar of educational articles per practice area, each marked "for counsel review".
2. Consent-based analytics events: request started, request submitted, Q&A submitted, payment started and succeeded, POSH consultation requested. No analytics on the POSH portal or admin.
3. Weekly report against the PRD KPIs: enquiry conversion 2 percent or more, first response under 1 business day (median), Q&A answered within 3 business days for 90 percent, four or more articles a month, payment success 85 percent or more.
4. Never produce testimonials, results, rankings or guarantees.
acorn-motion-engineer
---
name: acorn-motion-engineer
description: Use for subtle scroll, hover and transition effects: line reveals, fade-ups, count-ups, spotlight hover, sticky header, reading progress, route transitions. Must respect reduced motion and the banned-motion list.
---
# Role
Interaction designer and engineer.
# Rules
- Animate only transform and opacity. 200 to 450ms. Easing cubic-bezier(0.22, 1, 0.36, 1). Each effect plays once.
- Build Reveal, LineReveal, CountUp, Spotlight, ReadingProgress and a usePrefersReducedMotion hook; all fall back to static.
- Header shrinks and blurs after 24px scroll. Route transition 250ms via the View Transitions API with fallback.
- Banned: carousels, marquees, parallax over 24px, cursor trails, confetti, scroll hijacking, loaders.
- Verify with the browser agent that no animation blocks content or shifts layout.
# Owns
/components/motion/*, header scroll behaviour, transition wrapper
acorn-observability-engineer
---
name: acorn-observability-engineer
description: Use to implement monitoring, uptime checks, job heartbeats, structured logging with PII scrubbing, error tracking, alert routing and a public status page.
---
# Steps
1. Health checks for web, api and payments; job heartbeats for the timer scan (every 5 minutes), reminders, retention and backups; alert after two missed runs.
2. Build /lib/scrub with tests: remove emails, phone numbers, tokens, IPs, directory names and case narrative fields from logs and error events. Include tests that try to smuggle complaint text.
3. Availability SLO 99.5 percent monthly (about 3 hours 36 minutes downtime budget) with dashboards.
4. Public status page hosted separately from the main stack, plain language, no technical or case details.
5. Alert recipients are placeholders until decision D-11 is made.
# Owns
apps/api/src/observability, status page app, docs/MONITORING_SPEC.md
acorn-ops-console-builder
---
name: acorn-ops-console-builder
description: Use to build the /ops operations area for Acorn staff: command centre, go-live gate, release and rollback tracker, incident workflow, break-glass workflow, DR drills, SOP register and recurrence engine.
---
# Steps
1. Build: command centre and KPIs; go-live readiness gate with the 17 checklist items; UAT manager; release and feature flags; hypercare and warranty; monitoring and status page; incident workflow (11 steps with the 6-hour regulator clock); break-glass (two approvals, 2-hour maximum); backup and DR drills with a real audit-chain verifier; SOP register of 22 SOPs with a tested recurrence engine; privacy and vendor operations; payment reconciliation.
2. Every step has an owner, timer, evidence, audit entry, overdue chip, and re-authentication where sensitive.
3. The go-live gate stays RED while any S1 or S2 defect, Critical or High pen-test finding, or failed tenant-isolation test is open.
# Owns
apps/admin/app/ops, apps/api/src/ops
acorn-ops-runner
---
name: acorn-ops-runner
description: Use for recurring operations: monthly patching, quarterly access and restore reviews, directory re-verification lists, KPI digests, evidence packs. Prepares work and evidence; humans approve.
---
# Steps
1. Read docs/PRD.md section 30 (SOP register) and the /ops recurrence config.
2. For the requested cycle, produce a checklist with owners and due dates, run every automated check available (npm audit, dependency report, backup freshness, restore drill on staging, job heartbeat history, certificate expiry, stale directory entries over 90 and 180 days, tenure alerts, overdue SOP tasks), and write results to docs/ops-evidence/YYYY-MM/.
3. Patching: create a branch, apply patch and minor updates, run the full test suite, scenario suite and Playwright journeys, and open a pull request with a rollback plan. Critical vulnerabilities get a separate emergency branch.
4. Produce the digest or report in plain language for the Managing Partner.
5. Never deploy; never approve your own work.
acorn-performance-engineer
---
name: acorn-performance-engineer
description: Use to meet Core Web Vitals: image optimisation, font loading, bundle size, render-blocking resources, layout shift.
---
# Steps
1. Baseline Lighthouse mobile on home, a service page, a blog article and the request form.
2. Fix: next/image with sizes, priority only on the LCP image, font subsets with display swap, dynamic import for below-the-fold interactive components, remove unused dependencies, reserve space to avoid layout shift.
3. Targets: performance 90+, LCP under 2.5s, CLS under 0.1, INP under 200ms. Report in docs/PERF_REPORT.md.
acorn-posh-confidentiality-reviewer
---
name: acorn-posh-confidentiality-reviewer
description: Read-only red-team reviewer for the POSH module. Tries to break confidentiality: leaks in logs, notifications, lists, search, exports, errors, and cross-tenant or cross-case access.
---
# Steps
1. Read docs/PRD.md section 8 (confidentiality controls) and the code under review. Do not edit application code.
2. Attempt: access a case as every persona without assignment; read another tenant's data; find complaint text in logs, error messages, notification payloads, emails, real-time events, search, CSV exports and analytics; bypass declarations; extend break-glass past two hours; download evidence without a custody log.
3. Write failing tests for each finding and docs/CONFIDENTIALITY_REVIEW.md with severity, steps and fix. Block the stage gate while any High finding is open.
acorn-realtime-payments-engineer
---
name: acorn-realtime-payments-engineer
description: Use for Socket.io live alerts and Razorpay payments. Server-verified amounts, signed webhooks, idempotency, content-free events.
---
# Steps
1. Realtime (PLAYBOOK B7): namespaces and rooms by permission, cookie auth, Redis adapter, catch-up endpoint, role-filtered events with an allow-listed payload, polling fallback, a test that a request alert reaches admins within 5 seconds.
2. Payments (PLAYBOOK B6): create orders with the amount computed on the server, verify signatures, process webhooks from the raw body with replay protection, idempotency keys, reconciliation job, refunds with approval, receipts and GST invoice numbers. Razorpay TEST keys only. Flag NEEDS HUMAN REVIEW.
# Owns
apps/api/src/realtime, apps/api/src/payments
acorn-release-engineer
---
name: acorn-release-engineer
description: Use at the end of the website redesign to prepare the release: final build, type-check, lint, bundle report, environment checklist, deployment steps, rollback plan.
---
# Steps
1. Run build, type-check, lint and tests. Fix or report failures.
2. Produce docs/RELEASE_CHECKLIST.md: environment variable names only, DNS and TLS, redirects for changed URLs, analytics consent behaviour, sitemap submission, rollback steps (git tag, previous deployment).
3. Write a pull request summary with before and after screenshots and metrics. Do not deploy; wait for human approval.
acorn-rule-change-engineer
---
name: acorn-rule-change-engineer
description: Use when a statute, court order, state notification or advisory changes POSH timelines or duties. Prepares a draft rule set, runs scenario tests and an impact report; never publishes.
---
# Steps
1. Input comes from the Legal Administrator: source document, effective date and proposed parameter changes.
2. Create a DRAFT rule set in packages/rules with the effective date. Existing timers keep their original rule set unless a migration is approved.
3. Add or update scenarios for the change (boundary dates, mid-case change). Run the full scenario suite and show expected versus actual dates for every failure.
4. Use the amendment sandbox to produce an impact report: open cases whose deadlines would change, transitions newly allowed or blocked, templates and wizard texts affected (case IDs and counts only). Stamp every output "SIMULATION - NOT LAW" until approved.
5. Write docs/RULE_CHANGE_<date>.md for counsel and STOP. A human performs dual approval in the Legal Console.
acorn-rules-engine-engineer
---
name: acorn-rules-engine-engineer
description: Use to build packages/rules: calendar, effective-dated rule sets, timers, state machine, routing and committee validation for the POSH workflow. Pure TypeScript, no database.
---
# Steps
1. Follow PLAYBOOK prompts B9 and B11 and PRD sections 8.15, 8.16, 23 and 29.
2. Implement working-day maths with holiday union, timers TM-01 to TM-21 with plain-language explanations, the state machine T01 to T30 with typed guards, routing RT-01 to RT-21, and IC composition validation.
3. Build a table-driven suite of 40 scenarios (month-end, leap year, weekends, holidays, last day of limitation, extension, rule-set change mid-case, conciliation stop and resume, ex parte notice) plus property tests for date arithmetic.
4. Statutory numbers only in rules.config.ts, effective-dated. Flag NEEDS HUMAN REVIEW and list every number for counsel to verify in docs/RULES_FOR_COUNSEL.md.
# Owns
packages/rules
acorn-security-reviewer
---
name: acorn-security-reviewer
description: Use to review headers, CSP, form handling, rate limiting, dependency risks and secret handling for the Next.js site before release.
---
# Steps
1. Add security headers in next.config (HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors) and a strict CSP matching the scripts actually used.
2. Review form handlers and API routes: validation (zod), rate limiting, honeypot, no sensitive data in logs or URLs.
3. Run npm audit and list high and critical issues; do not auto-upgrade major versions without approval.
4. Confirm no secrets in the repository and that .env files are ignored. Report in docs/SECURITY_REPORT.md.
acorn-test-engineer
---
name: acorn-test-engineer
description: Use to write and run unit, integration, contract, end-to-end (Playwright), accessibility and load tests, and to keep CI green.
---
# Steps
1. Add contract tests from the OpenAPI spec, Playwright journeys (request submission and admin alert, Q&A moderation, blog publish, payment test flow, complaint filing, IC declarations gate, tenant isolation), axe checks and a k6 load script.
2. Keep a coverage summary in docs/TEST_REPORT.md. Never weaken a test to make it pass; report the real defect.
acorn-uat-coordinator
---
name: acorn-uat-coordinator
description: Use to prepare User Acceptance Testing: role-based test scripts, evidence capture, defect linking, entry and exit criteria, and the sign-off sheet.
---
# Steps
1. From docs/PRD.md sections 14 and 28, write UAT scripts per role (Acorn staff, IC member, Organisation Admin, complainant journey, respondent journey, finance) in docs/UAT/.
2. Provide a tracker (CSV or a /ops/uat page) with pass, fail, blocked, evidence links and a coverage matrix against Must requirements.
3. Entry criteria: zero open Critical or High defects, performance and accessibility checks passed. Exit criteria: UAT signed, only agreed Medium defects remain, rollback verified.
4. Generate the sign-off sheet (names, results, open defects, signature block). Humans run the tests; you only prepare, log and fix.
E6. Workflows
.agents/workflows/annual-cycle.md
For [organisation or all]: prepare the annual report data check (counts reconcile with case records, aggregate only), submission due dates and alerts, Board's Report and BRSR data sheets where relevant, vendor and sub-processor review, penetration test scheduling pack, key-recovery test plan, retention review list (case IDs and dates only), and a compliance score trend report. Everything is a draft for the responsible human to approve.
.agents/workflows/build-acorn-app.md
Run the Acorn application build as seven gated stages. Planning mode. At each stage: show the plan, wait for approval, build, run all tests, produce a walkthrough with screenshots where UI exists, commit, STOP for approval. Flag anything security-critical as NEEDS HUMAN REVIEW.
 
STAGE 1 FOUNDATION (sequential): monorepo, shared package, API baseline, Docker services, CI, authentication with MFA, RBAC, tenancy, audit chain. Agents: acorn-backend-architect, acorn-auth-security-engineer, acorn-devops-sre, acorn-test-engineer.
STAGE 2 PUBLIC BACK END (parallel A to D): A requests and Q&A; B blog CMS, media, scripts, settings; C payments (acorn-realtime-payments-engineer); D email queue and files with scanning. Then wire the existing Next.js forms to the real API (keep graceful fallbacks).
STAGE 3 ADMIN CONSOLE AND REAL-TIME (parallel A to D, acorn-admin-ui-builder): A dashboard and live feed; B requests and Q&A moderation; C posts, pages, media, campaign pages; D users, roles, audit viewer, settings, notifications.
STAGE 4 POSH RULES ENGINE (sequential, no UI): acorn-rules-engine-engineer builds packages/rules with 40 scenarios. Human legal review of the rules config before proceeding.
STAGE 5 POSH APPLICATION (parallel A to D, then review): A intake, drafts, OTP signature, routing, encryption, evidence; B IC workspace, case lifecycle, notices, hearings, report; C complainant, respondent and organisation portals in calm mode; D content-free notifications, audit viewer, break-glass. Then acorn-posh-confidentiality-reviewer runs.
STAGE 6 COMPLIANCE AND SERVICES (parallel A to D): A organisations, branches, IC roster, policy library, notices, compliance score; B annual report generator and analytics with small-group suppression; C LMS, surveys, certificates; D service desk with SLA timers, directory, knowledge base, legal console.
STAGE 7 HARDENING AND RELEASE: security review, load and accessibility tests, backup and restore drill, monitoring, runbooks, go-live checklist, release PR. Never deploy.
 
Parallel ownership: each agent edits only its own folders; merge order for stage 2 is D, A, B, C; stage 3 is A, B, C, D; stage 5 is D, A, B, C; stage 6 is A, D, C, B.
.agents/workflows/build-acorn-launch.md
Run the Acorn launch programme in six gated stages. Planning mode. After each stage: tests, walkthrough, screenshots, commit, then STOP for approval. Production deployment is never done from this editor.
 
STAGE 8 OPERATIONS CONSOLE (parallel A to D, acorn-ops-console-builder)
A: command centre, KPIs, availability calculator. B: go-live gate, UAT manager, release and feature flags. C: incident workflow, break-glass workflow, DR drill screens with audit-chain verifier. D: SOP register with recurrence engine, access review, privacy and vendor operations, payment operations.
STAGE 9 STAGING DEPLOYMENT (sequential)
acorn-deploy-engineer builds infrastructure as code and the pipeline; acorn-observability-engineer adds monitoring, scrubber and status page. Deploy to staging only. Run smoke tests and a restore drill on staging.
STAGE 10 UAT AND SECURITY CLOSURE (human-led)
acorn-uat-coordinator prepares scripts and tracker. Humans run UAT. Agents fix defects by severity. Track penetration-test findings; Critical and High must be fixed and retested. acorn-posh-confidentiality-reviewer re-runs on the release candidate.
STAGE 11 GO-LIVE PREPARATION (sequential)
Complete the 17-item go-live checklist as evidence. Prepare production configuration names (no values), rollback plan, release notes and announcement text. Present the gate. STOP: a human performs the production deployment through the pipeline.
STAGE 12 HYPERCARE (30 days, daily)
Daily checklist, defect triage by severity, warranty classification, training refreshers, weekly digest. Exit only when no S1 or S2 is open and the last 7 daily checks passed. Generate the closure report (acorn-docs-trainer for handover documents).
STAGE 13 GROWTH AND ENHANCEMENTS (optional, flagged)
acorn-growth-seo-analyst and acorn-gapclosure-engineer work from the approved backlog; every enhancement behind a feature flag, default off.
.agents/workflows/build-acorn.md
Run the Acorn premium website redesign as a gated programme. Use Planning mode. Use sub-agents (skills) in parallel only where stated. After each phase: build, lint, type-check, screenshots at 360/768/1280/1536, a short walkthrough, a git commit, then STOP and ask me to approve before the next phase.
 
PHASE 1 AUDIT (sequential)
- acorn-codebase-auditor writes docs/AUDIT.md and the protected-files list. Wait for approval.
 
PHASE 2 FOUNDATION (sequential)
- acorn-art-director: tokens, fonts, /design-system page, docs/PAGE_BRIEFS.md for every route.
- acorn-frontend-builder: shared primitives (Button, Link, Eyebrow, SectionHeading, Rule, ArchImage, Card, form fields, Accordion, Stepper).
- acorn-motion-engineer: motion helpers and the reduced-motion hook.
 
PHASE 3 GLOBAL SHELL (sequential)
- acorn-frontend-builder: header with mega-menu, mobile drawer, footer, cookie card, 404 and 500 pages.
- acorn-motion-engineer: sticky header behaviour and route transition.
 
PHASE 4 PAGES (parallel, four sub-agents, each owns its folders)
- Agent A: Home page.
- Agent B: About, Services index, Service detail template.
- Agent C: POSH landing (calm mode), Insights index and article, FAQ.
- Agent D: Request service, Contact, Pay and status pages, legal pages, campaign landing template.
- acorn-art-director reviews all four against PAGE_BRIEFS.md and sends rejections back.
 
PHASE 5 QUALITY (parallel, four sub-agents)
- acorn-content-seo-editor, acorn-accessibility-auditor, acorn-performance-engineer, acorn-security-reviewer.
Merge order: accessibility, performance, SEO, security. Re-run build after each merge.
 
PHASE 6 BROWSER QA AND POLISH (sequential)
- acorn-browser-qa: full route and form testing at four widths, recordings, docs/QA_REPORT.md. Fix every defect and re-test until clean.
 
PHASE 7 RELEASE (sequential)
- acorn-release-engineer: docs/RELEASE_CHECKLIST.md and a pull request summary. Do not deploy.
 
At every gate report: what changed, files touched, dependencies added, screenshots, metrics, risks, and what you need from me.
.agents/workflows/incident-drill.md
Run a tabletop and technical drill on STAGING with synthetic data for scenario [scenario]: walk the 11-step incident workflow, test P1 paging, containment steps, evidence preservation, the regulator clock timers and client notification templates. Record timings and gaps in docs/ops-evidence/[date]/drill.md and propose fixes.
.agents/workflows/monthly-ops.md
Use acorn-ops-runner. Run the monthly cycle for [month]: patch branch with full tests and a pull request; dependency and vulnerability report; backup and heartbeat summary; certificate and domain expiry check; stale directory entries; statutory watch list items due; content calendar proposals marked "for counsel review"; KPI digest against the PRD targets (enquiry conversion 2 percent or more, first response under 1 business day median, Q&A answered within 3 business days for 90 percent, four or more articles a month, payment success 85 percent or more). Save evidence to docs/ops-evidence/[month]/. Do not deploy.
.agents/workflows/new-organisation.md
Prepare onboarding for [organisation]: checklist from the onboarding wizard (legal details, branches with headcount, IC roster validation, plan and add-ons, branding preview, notice pack, policy and training assignments, directory import template). Use synthetic data to rehearse the flow on staging, list gaps (for example a branch of 10 or more employees without an IC, or a counsel-assisted overlay needing approval), and produce a welcome checklist. Do not create real tenants or touch production.
.agents/workflows/quarterly-review.md
Use acorn-ops-runner and acorn-security-reviewer in parallel. Prepare: access review export with keep-or-remove attestations for each user; restore drill on staging with elapsed time against the 4-hour target and audit-chain verification; escalation-matrix review sheet; script and third-party tag review for the public site; cloud configuration review; re-run authorisation matrix and tenant isolation suites; refresh docs/RISK_REGISTER.md. Present findings by severity and what needs a human decision.
.agents/workflows/rule-change.md
Use acorn-rule-change-engineer. Source document: [attach]. Effective date: [date]. Proposed changes: [list]. Produce the draft rule set, updated scenarios with results, the impact report, and docs/RULE_CHANGE_[date].md for counsel. Do not publish. Stop and wait.
E7. Step-by-step commands
Run in order, approving each plan before the agent writes code. Replace [brackets]. Run one part of the programme at a time.
PART 1: WEBSITE REDESIGN   (workflow: /build-acorn)
Command 0: Orientation
Read .agents/AGENTS.md and docs/DESIGN_SYSTEM.md. List the skills you have available and confirm you understand the hard rules. Do not change any file. Then tell me in one paragraph how you will run /build-acorn.
Command 1: Audit
Use the acorn-codebase-auditor skill. Audit this Next.js project and write docs/AUDIT.md including the route map, content sources, protected files, risks and Lighthouse baselines for home, one service page, one article and the request form. My content files are in [paths]. Do not modify anything else.
Command 2: Foundation
Run PHASE 2 of /build-acorn. First show me the Implementation Plan, including any dependency you propose to add. After I approve: implement tokens and fonts, the /design-system page, docs/PAGE_BRIEFS.md for every route, the shared primitives and the motion helpers. Attach screenshots of /design-system at 360 and 1280 px and a contrast report.
Command 3: Global shell
Run PHASE 3. Build the header (transparent over dark heroes, ivory and blur after 24px scroll, shrinking from 88px to 72px), the Services mega-menu with a side description panel, the full-screen mobile drawer, the ink-950 footer with the oversized faint ACORN wordmark and the disclaimer line, the small non-blocking cookie card, 404 and 500 pages, and a 250ms route transition. Keep all existing links and routes working. Verify with the browser agent.
Command 4: Pages in parallel
Run PHASE 4 with four parallel sub-agents A, B, C and D exactly as in the workflow, each editing only its own folders. Use the layouts in docs/PAGE_BRIEFS.md and the signature devices in docs/DESIGN_SYSTEM.md: arch masks, one italic brass accent word per headline, hairline rules with brass ticks, outlined section numerals, paper grain. Preserve all existing content and data wiring. Hero H1 on the home page: "Excellence in Law. Integrity in Practice." with "Integrity" in italic brass. Services index uses the premium index-list layout with the cursor-following arch preview on desktop only. POSH pages use calm mode. When all four agents finish, have acorn-art-director review each page and return rejected sections for rework. Show screenshots at all four widths.
Command 5: Quality in parallel
Run PHASE 5 with four parallel sub-agents (SEO and compliance, accessibility, performance, security). Merge in the order accessibility, performance, SEO, security and re-run build after each. Deliver docs/COMPLIANCE_REPORT.md, A11Y_REPORT.md, PERF_REPORT.md and SECURITY_REPORT.md with before and after numbers. Targets: Lighthouse performance 90+, accessibility 95+, LCP under 2.5s, CLS under 0.1. Do not rewrite existing copy.
Command 6: Browser QA
Run PHASE 6 with acorn-browser-qa. Test every route at 360, 768, 1280 and 1536 px, record scroll-throughs of the home page, one service page, one article and the request form, test every form with valid and invalid input, and check console errors and broken links. Write docs/QA_REPORT.md, fix every defect, and re-test until the report is clean.
Command 7: Release preparation
Run PHASE 7 with acorn-release-engineer. Run build, type-check, lint and tests; write docs/RELEASE_CHECKLIST.md (env variable names only, DNS and TLS, redirects, consent behaviour, sitemap submission, rollback plan); prepare a pull request summary with before and after screenshots and metrics. Do not deploy.
Command 8 (optional): Polish pass
Act as a ruthless senior design reviewer. Open the home page at 1280 px and list ten specific improvements that would make it look more expensive and more distinctive (hierarchy, whitespace, type pairing, imagery, rhythm). Do not make changes yet. Show the list and wait for me to pick.
PART 2: APPLICATION LAYER   (workflow: /build-acorn-app)
Prerequisite: docs/PRD.md and docs/PLAYBOOK.md exist; branch app/build; tag pre-application.
Command 9: Foundation
Run STAGE 1 of /build-acorn-app. Read docs/PRD.md and docs/PLAYBOOK.md prompts B0 to B4 first. Show me the plan including the monorepo layout, every dependency, and how the existing Next.js site moves into apps/web without breaking. Build the API baseline, Docker services, CI, authentication with TOTP MFA, RBAC, tenant scoping and the audit hash chain. Write the authorisation matrix, tenant isolation and audit tamper tests first. Mark security-critical files NEEDS HUMAN REVIEW.
Command 10: Public back end
Run STAGE 2 with four parallel agents A to D using the ownership map. Implement PLAYBOOK prompts B5 and B6 using the shared zod schemas. Then connect the existing website forms (service request, ask a question, pay) to the real API while keeping graceful fallbacks, and keep all existing content untouched. Use Razorpay TEST mode only. Show contract test results and a screen recording of a request being submitted and an email arriving in Mailpit.
Command 11: Admin console
Run STAGE 3 with four parallel agents. Build apps/admin in the dense skin from docs/DESIGN_SYSTEM.md section 8: login with MFA, live dashboard with connection status, requests list and detail, Q&A moderation with the anonymiser, posts workflow, users and roles with the permission matrix, audit viewer, settings, notification centre. Add the Socket.io layer (PLAYBOOK B7). Prove a new request appears on the dashboard within 5 seconds with a recording. Include a developer-only "Preview as role" switcher disabled in production.
Command 12: POSH rules engine
Run STAGE 4. Build packages/rules per PLAYBOOK B9 and PRD sections 8.15, 8.16 and 29. Write the 40 scenario tests and property tests before implementation. List every statutory number in docs/RULES_FOR_COUNSEL.md. Do not build any POSH UI yet. Mark everything NEEDS HUMAN REVIEW and stop for my approval.
Command 13: POSH application
Run STAGE 5 with four parallel agents. Implement PLAYBOOK B10, B11 and B12 and the portals in calm mode with a Quick Exit button and neutral page titles. Enforce case access only on the server through canAccessCase, require declarations before any case access, use content-free notifications with the lint test, and add server-side break-glass with a two-hour maximum. When the build is complete, run acorn-posh-confidentiality-reviewer, fix every High finding, and show me docs/CONFIDENTIALITY_REVIEW.md. Everything in this stage is NEEDS HUMAN REVIEW.
Command 14: Compliance and services
Run STAGE 6 with four parallel agents. Implement PLAYBOOK B13 and B14: organisations and branches, IC roster validation, policy library and acknowledgements, notice display tracker, compliance score engine with the PRD weights, annual report generator (DOCX and PDF, aggregate only), analytics with minimum group size 5, LMS with certificates, anonymous surveys, service desk with SLA timers, directory and knowledge base, Legal Console with dual approval and the scenario gate. Prove tenant isolation with tests for every service function.
Command 15: Hardening and release
Run STAGE 7. Run acorn-security-reviewer, acorn-test-engineer and acorn-devops-sre in parallel: security headers and CSP, dependency audit, Playwright journeys, k6 load test for 100 concurrent users, axe checks, backup and restore drill, monitoring, background-job heartbeat, docs/RUNBOOK.md and the go-live checklist from PRD section 28.8. Prepare a release pull request with test and performance results. Do not deploy.
PART 3: LAUNCH   (workflow: /build-acorn-launch)
Prerequisites: counsel has verified docs/RULES_FOR_COUNSEL.md; pen test booked; decisions D-2, D-11, D-23, D-24 settled; domain, DNS, Razorpay live account, email domain ready.
Command 16: Operations console
Run STAGE 8 of /build-acorn-launch with four parallel agents A to D. Use the Phase 6 build prompts in docs/PLAYBOOK.md and the dense admin skin. The go-live gate must stay red while any S1 or S2 defect, Critical or High pen-test finding, or failed tenant-isolation test is open. Break-glass needs two approvals and cannot exceed two hours; prove it with tests. Build the audit-chain verifier with a "simulate tampering" test. Flag break-glass, retention and incident code NEEDS HUMAN REVIEW.
Command 17: Staging deployment
Run STAGE 9. Read docs/PRD.md sections 26 and 27. Use acorn-deploy-engineer to create infrastructure as code, Docker images and the CI/CD pipeline with a manual production approval step, a database backup before every production release, and a 30-minute rollback path. Use acorn-observability-engineer for health checks, job heartbeats, the PII scrubber with tests, and the status page. Deploy to STAGING ONLY. Run the smoke tests and a restore drill, and record the elapsed time against the 4-hour recovery target in docs/DR_DRILL.md. Do not request or use any production credential.
Command 18: UAT preparation and fixes
Run STAGE 10 preparation. Use acorn-uat-coordinator to write role-based UAT scripts in docs/UAT/, a tracker, and the sign-off sheet generator. Do not run UAT yourself; humans will. As defects arrive from me, fix them by severity (S1 to S4), add a regression test for each, and update the tracker. Maintain a penetration-test findings table in docs/PENTEST.md with status and retest dates. Re-run acorn-posh-confidentiality-reviewer on the release candidate and show the result.
Command 19: Go-live preparation
Run STAGE 11. Build the 17-item go-live checklist as evidence with owners and dates. Verify automatically what can be verified (build, tests, scenarios, tenant isolation, security headers, backup freshness, restore drill, monitoring alerts test, rollback tag). Produce docs/ENV_CHECKLIST.md with variable NAMES only, release notes and the client announcement text. Present the gate status and everything blocking it. STOP. I will approve and a human will run the production deployment through the pipeline.
Command 20: Hypercare (run daily for 30 days)
Run STAGE 12, day [N]. Run the daily checklist: timers firing, notification delivery, backups, error rate, payments and email flows, open P1 and P2 tickets, job heartbeats. Summarise anomalies, triage new defects by severity, classify each as in warranty or out of warranty with a reason, and propose fixes with tests. Never use production data; reproduce with synthetic data. Output a one-page daily note. On day 30 generate the closure report with defects, SLA performance, KPIs against targets, availability against 99.5 percent, incidents with lessons learned and outstanding items.
Command 21: Growth and enhancements (optional)
Run STAGE 13. Using acorn-growth-seo-analyst, produce a quarterly content calendar of educational articles per practice area, each marked "for counsel review", consent-based analytics events (none on POSH portal or admin), and the weekly KPI report format. Using acorn-gapclosure-engineer, build only the items I name, behind feature flags that default to off: [list items]. Keep every legal text as a placeholder pending counsel approval.
PART 4: OPERATIONS   (recurring workflows)
Part 4 recurring operations
Daily:      "Summarise yesterday's backup status, job heartbeats, error rate (scrubbed logs), payment and email flows, and open P1 or P2 tickets. Flag anything abnormal in three bullet points."
Monthly:    /monthly-ops
Quarterly:  /quarterly-review and /incident-drill
Law change: /rule-change   (counsel approves; agents never publish)
New client: /new-organisation
Yearly:     /annual-cycle  (book the external penetration test at least eight weeks before the anniversary)
Six-monthly: "Compare KPI actuals with targets, list enhancement requests by value and risk, and propose a Now, Next, Later roadmap. Do not start any build."
Human-only steps (agents must never do these)
- Buy domain, set DNS, issue TLS, create production accounts and secrets.
- Activate Razorpay live mode and run the small real payment and refund test.
- Run UAT and sign it. Commission the external penetration test.
- Counsel approval of rule sets, templates, notices and disclaimers.
- Break-glass approvals. Approve and trigger production deployment (two approvers).
- Handle any real complaint content, and respond to regulators.
Part F. Quality, security and testing strategy
The platform records statutory deadlines and handles highly sensitive complaints. Quality here means three things at once: correct (deadlines and state transitions behave exactly as the rules say), confidential (nothing leaks between people, organisations or channels) and usable (calm, accessible and fast). This part defines how each is proved before launch and kept proved afterwards.
F1. Test strategy
Layer
What it proves
Tools
Runs
Gate
Unit
Pure logic: calendar, timers, state machine, routing, committee validation, scrubber, recurrence, compliance score
Vitest
Every commit
Merge
Property tests
Working-day arithmetic holds for any date, holiday set and duration
fast-check
Every commit
Merge
Integration
API with database, queue and file store; tenant scoping; audit chain
Supertest, test containers
Pull request
Merge
Contract
Front end and API agree with the generated OpenAPI spec
OpenAPI validator
Pull request
Merge
End to end
Critical journeys in a real browser
Playwright
Nightly and release
Release
Accessibility
WCAG 2.1 AA on key flows, keyboard, screen reader labels, 200 percent zoom
axe, manual pass
Release
Release
Performance
Core Web Vitals and load (100 learners, 50 ticket creators)
Lighthouse CI, k6
Release
Release
Security
Injection, access control, headers, dependencies, secrets
ZAP, SAST, dependency scan, penetration test
Pull request and annual
Go-live
Confidentiality review
Attempts to read content across cases, tenants, logs, notifications, exports
Red-team skill plus human review
Before each POSH release
G3 and G6
UAT
Acceptance by Acorn users against the requirements
Scripts and tracker
Per phase
Go-live


F1.1 Critical end-to-end journeys
Visitor submits a service request; admin sees a live alert within 5 seconds; client receives a confirmation email.
Payment in test mode: success, failure, cancelled, duplicate callback, delayed webhook, refund.
Q&A: asker submits privately; moderator anonymises, publishes only when publishing was allowed; private-only questions cannot be published.
Complaint filing: wizard routing, draft autosave, OTP signature, case ID, neutral notification to the Internal Committee.
IC member cannot open a case without signed declarations; a recusal reassigns and is audited.
Conciliation with a monetary term is blocked with the Act-based message.
Notice issuance starts the reply timer; the 90-day clock stops only for a recorded legal ground.
Report issuance requires findings, majority decision and quorum signatures; employer action timer starts.
Tenant isolation: a user of organisation A cannot read, list, count, export or search organisation B.
Ticket and assistant content guards block complaint narrative and redirect to the helpline.
Survey cells under the minimum group size never appear in the UI or CSV; free text is screened for names.
Legal Console cannot publish a rule set while any scenario in the suite fails.

F2. Scenario suites from the PRD
The PRD defines 40 timeline scenarios (Section 29.3) and a functional scenario list. The scenario tests are the legal-correctness backbone: they run in CI on every commit that touches the rules package, and again as a hard gate before any rule set is published. Both tables are reproduced below.

F2.1 Timeline scenarios (PRD)
No
Scenario
Expected behaviour
S-01
Complaint on day 1 after incident
Within period; TM-01 ok; acknowledgement due per rule
S-02
Complaint exactly 3 months after the last incident
Within period on the last day; calendar month arithmetic checked
S-03
Complaint one day after 3 months
LIMITATION_EXPIRED unless extension is requested; late review created
S-04
Last incident on 31 May, complaint on 30 August
Month-end arithmetic handled
S-05
Series of incidents, last within 3 months
Period runs from the last incident
S-06
Extension granted by 3 months
Deadline moves; limit of 6 months in total
S-07
Extension requested beyond 6 months
Rejected by rule; reason shown
S-08
Incapacity of the complainant
Representative route; period computed from the date of capacity or as per order
S-09
Copy to respondent within 7 working days with a state holiday in the period
Holiday skipped; date correct
S-10
Weekly off on Friday and Saturday (organisation setting)
Working days follow the organisation calendar
S-11
Respondent reply due in 10 working days
Counting begins the next working day after service
S-12
Service by post with deemed delivery
Deemed date per rule, reply date follows
S-13
Reply filed late
Flagged late; case continues; breach not hidden
S-14
Inquiry 90 days from the date of inquiry start
Date correct; counts calendar days
S-15
Inquiry start anchored on complaint receipt (organisation setting)
Anchor option respected
S-16
Conciliation request during the inquiry
Clock is not stopped unless the rule says so; documented
S-17
Hearing adjourned at the request of a party
Delay reason recorded; no pause without a legal ground
S-18
Court stay for 40 days
Pause with order; resume; deadline extended by exactly 40 days
S-19
Overlapping pauses
Overlap counted once
S-20
Pause without an order document
Blocked with RULE_BLOCKED
S-21
Report due 10 days after inquiry completion
Calendar days; holidays do not extend
S-22
Employer action within 60 days of the report
Date correct; overdue flag on day 61
S-23
Appeal within 90 days of the recommendations
Date correct; window closes without action
S-24
Appeal filed on day 90
Within time
S-25
Appeal filed on day 91
Marked out of time; counsel review task
S-26
Interim relief request decision within the set time
TM-12 correct
S-27
Rule set changes in the middle of a case
Existing timers keep the earlier version; new timers use the new one; both shown
S-28
Rule set effective date on a holiday
Next working day is used as stated in the rule
S-29
Organisation moves weekly off during a case
Calendar versioning prevents silent changes; admin must confirm effect
S-30
Leap year date arithmetic (29 February)
No error; month arithmetic correct
S-31
Daylight and time zone (server in UTC, user in IST)
Dates evaluated in IST; no off-by-one around midnight
S-32
Complaint at 23:59 IST on the last day
Within period; receipt time recorded
S-33
Complaint transferred from another organisation (referral)
Receipt date retained for limitation; new timers from referral
S-34
Local Committee forwarding by the Nodal Officer in 7 days
Forwarding timer and reminder
S-35
Retaliation case linked to an open case
Short timers; independent clock
S-36
Counter-complaint
Separate case; separate committee check; no shared access
S-37
Withdrawal then re-filing within period
Allowed with prior case link; period unaffected
S-38
Case reopened for an addendum after closure
Retention date recalculated; audit note
S-39
Legal hold during appeal and release
Retention blocked and then recalculated from the hold end
S-40
Outage of 6 hours across a threshold
Alerts sent on recovery with a note; no deadline shortened


F2.2 Functional test scenarios (PRD)
ID
Area
Scenario
Expected result
TC-REQ-01
Service request
Submit valid form with attachment
Reference generated, DB record created, admin email within 60 s, dashboard alert within 5 s, acknowledgement email sent
TC-REQ-02
Service request
Submit with script tags in description
Input stored safely as text; no script execution in admin view
TC-REQ-03
Service request
Submit 6 requests in an hour from one IP
Sixth request is rejected with rate limit message
TC-QNA-01
Q&A
Admin answers and publishes after anonymising
Public FAQ shows answer without asker details; FAQPage schema valid
TC-BLG-01
Blog
Editor pastes HTML containing an onerror attribute
Attribute stripped on save and on render
TC-BLG-02
Blog
Change slug of published article
301 redirect from old URL; sitemap updated
TC-SCR-01
Scripts
Enable analytics script, visitor declines cookies
Script does not load
TC-SCR-02
Scripts
Content Editor tries to create a script
HTTP 403 and audit entry
TC-SCR-03
Scripts
Activate kill switch
All custom scripts disappear from pages within 60 s
TC-PAY-01
Payments
Successful payment in test mode
Signature verified, status Paid, receipt emailed, admin alert sent
TC-PAY-02
Payments
Tamper with amount in the browser request
Server ignores client amount; order uses catalogue price
TC-PAY-03
Payments
Forge payment verification with a wrong signature
Rejected; payment remains unpaid; security alert logged
TC-PAY-04
Payments
Webhook delivered twice
Processed once; second returns success without duplicate effect
TC-PAY-05
Payments
User closes browser after paying; verification call never arrives
Webhook or reconciliation job marks payment Paid within 15 minutes
TC-AUTH-01
Authentication
5 wrong passwords
Account lockout or delay; alert email
TC-AUTH-02
Authentication
Reuse of an old refresh token
Session family revoked; user must log in again
TC-RBAC-01
Authorisation
Support user calls POSH case API
HTTP 403; attempt logged
TC-RBAC-02
Authorisation
IC member not assigned to a case opens it by ID
HTTP 403 or 404; logged
TC-TEN-01
Tenant isolation
Organisation A admin requests Organisation B resources
No data returned
TC-POSH-01
POSH intake
File a complaint with attachment
Case ID created, encrypted fields stored, email carries no content, IC alerted
TC-POSH-02
POSH timers
Inquiry started on day 0; simulate time to day 75
15-day alert sent; day 83 shows 7-day alert; day 87 shows 3-day alert; day 91 shows overdue
TC-POSH-03
POSH timers
Complainant requests conciliation before the inquiry starts, then withdraws it
Inquiry clock starts only when the inquiry starts; conciliation period is excluded; history preserved; no silent pause is possible after inquiry start
TC-POSH-04
POSH evidence
Alter a stored file directly in storage
Integrity check detects hash mismatch and alerts
TC-POSH-05
POSH confidentiality
Super Admin opens a case without break-glass
Access denied; with break-glass reason, access granted, alert sent to Managing Partner
TC-POSH-06
POSH reports
Generate annual report for seeded data
Counts match manual calculation; no identifying details
TC-NFR-01
Performance
200 concurrent users on public pages and request form
p95 API latency under 400 ms; error rate under 1%
TC-NFR-02
Accessibility
Keyboard-only complete of request and complaint forms
All controls reachable, focus visible, errors announced
TC-OPS-01
Backup
Restore latest backup to isolated environment
Data restored within RTO; application starts and passes smoke test



F3. Security controls and threats
Security is layered: authentication and sessions, authorisation on every route, tenant scoping, input validation, encryption, audit, rate limiting, and operational controls. The detailed control tables from the PRD follow in landscape.
F3.1 Review rules for security-critical code
Two human reviewers for authentication, MFA, encryption and key handling, canAccessCase and tenancy, the rules engine, payments, break-glass, retention and export.
Tests come first for these areas: authorisation matrix for every route and role, tenant isolation for every service function, audit chain tamper detection.
No custom cryptography. Use well-known libraries and a managed key service; keys never in code, logs or the repository.
Failing security tests are never weakened. They are fixed or escalated.

F3.2 Penetration test plan
Item
Plan
Scope
Public site, admin console, POSH portals, API, authentication flows, file upload and download, real-time channel, payment webhook endpoint, tenancy boundaries
Timing
Book at least 8 weeks before go-live; test the release candidate on staging with synthetic data
Rules
Critical and High findings must be fixed and retested before POSH go-live. Medium findings need an agreed plan. Evidence is stored in the findings tracker.
Repeat
Annually and after any major change to authentication, case access or hosting



F3.3 Layered controls (PRD)
Layer
Control
Route guard
Every route declares a permission key; a test fails if a route is registered without one. Permission checks run in middleware before the handler.
Tenant guard
A data-access layer adds orgId to every query and write for tenant-scoped collections; direct model access from handlers is blocked by lint. A test suite creates two organisations and tries every endpoint with the wrong tenant.
Case guard
Access to a case requires an active caseRoles record, an unexpired undertaking, a cleared conflict declaration and, for the role, the field-level view in the matrix in Section 8.28. Anything else returns NOT_FOUND to avoid revealing the case.
Field filter
Responses are built through serializers per role; fields not in the role view never leave the server.
Object-level checks
IDs in URLs are checked against the caller scope (no trust in client IDs) to prevent insecure direct object references.
Acorn staff
Acorn roles see metadata, timers and anonymised metrics; content access requires break-glass (BR-061), approved by the Managing Partner, limited to 2 hours, fully logged and reviewed monthly.
Four-eyes actions
Two approvers are needed for: refunds over the threshold, rule set activation, retention execution, lifting a legal hold, inline script enabling, role grants of super_admin.
Least privilege in infrastructure
The application database user can only touch application collections; the audit collection allows insert and read only; backup and key roles are separate.


F3.4 Authentication and session controls (PRD)
Control
Specification
Password
Minimum 12 characters; checked against a breached-password list; hashed with Argon2id (memory 64 MB, 3 iterations, parallelism 1) with a per-user salt; no composition rules beyond length; no periodic forced change.
Lockout
5 failed attempts lock for 15 minutes with progressive delay; the response is identical for wrong user and wrong password; an alert goes to the user on lockout.
MFA
Mandatory for staff roles, legal_admin, posh_admin, org_admin and all IC roles; TOTP with 10 single-use backup codes; WebAuthn passkeys as an optional second option in Phase 4. Re-authentication is required for sensitive actions (refund, user role change, retention execution, break-glass approval, legal hold).
Access token
JWT signed with ES256, 15 minutes, in an HttpOnly Secure SameSite=Strict cookie; contains user ID, roles, orgId and session ID only.
Refresh token
Opaque, 7 days sliding up to 30 days absolute, stored hashed, rotated on each use; reuse of an old token revokes the whole family.
Idle and absolute timeout
POSH portal and admin: 15 minutes idle, 8 hours absolute; public pages have no session.
CSRF
Double-submit token plus SameSite; all state-changing requests require the X-CSRF-Token header.
Complainant and respondent access
No password is required. A single-use link plus email or mobile OTP (6 digits, 10 minutes, 5 attempts) opens a short session of 60 minutes; links are bound to the case and role, expire in 72 hours by default and are never placed in subject lines.
Device and location
New-device sign-in sends an alert. Staff accounts may be restricted to an IP allow-list by setting. Concurrent sessions are listed and revocable.
Account recovery
Staff recovery needs a second administrator or a backup code; no recovery by email alone for POSH roles.
Service accounts
No shared logins; API keys are scoped, hashed, expire in 1 year and are rotated.
Offboarding
Deactivation revokes sessions, closes case roles (with reassignment tasks) and removes access to rooms within one minute.


F3.5 Input, output and API controls (PRD)
Area
Control
Input validation
Zod schema on every request body, query and parameter; unknown fields rejected; maximum lengths on every string; Mongo operator injection prevented by schema typing and by stripping keys beginning with $ or containing dots.
Output encoding
React escapes by default; rich text is sanitised on save and on render with an allow-list (DOMPurify on the server and client); no dangerouslySetInnerHTML except through the sanitiser.
Security headers
Content-Security-Policy (default-src self; no unsafe-inline for scripts, nonces for approved inline script; connect-src allow-list); X-Content-Type-Options nosniff; Referrer-Policy strict-origin-when-cross-origin; Permissions-Policy minimal; frame-ancestors none; Cross-Origin-Opener-Policy same-origin.
POSH portal isolation
The portal and admin run on separate sub-domains from the marketing site; the custom script control cannot inject into portal or admin pages; no third-party scripts, fonts or analytics there.
Custom scripts
Enabled only after approval; allowed hosts list; SRI hash for external scripts; consent category enforced; inline code is length-limited and diffed; every change audited; one-click disable (BR-007, BR-008).
File handling
Maximum 25 MB per file; allow-list of types (pdf, jpg, png, docx, xlsx, mp3, mp4, txt) by content sniffing, not extension; macros blocked; scan before use; stored under random keys; downloads served with Content-Disposition attachment and no inline execution; images re-encoded for the public library.
SSRF and redirects
No server-side fetch of user-supplied URLs except through an allow-list; redirects validated.
Dependency hygiene
Lock files committed; npm audit and software composition analysis in CI; critical vulnerabilities block merge; monthly update window; a software bill of materials is generated per release.
Error handling
Stack traces never reach clients; errors are logged with a request ID and redaction.
Logging redaction
A central logger removes fields on the X list in Section 24 and any value matching email, phone, Aadhaar-like or PAN-like patterns; POSH narrative fields are never logged.
Third-party content
No external fonts or analytics on POSH pages; images served from own storage.
Browser storage
No tokens or case data in localStorage; POSH drafts are server-side; the interface clears sensitive state on sign-out.
Anti-automation
CAPTCHA on public forms, bot score, and behavioural rate limits.
Content-free messaging
Linting prevents free text in POSH notification templates and verifies that no case, party or conduct words appear (BR-018).


F3.6 Rate limits (PRD)
Endpoint group
Limit
Key
Extra control
Public forms (request, question, risk check)
5 per 10 minutes and 20 per day
IP plus device hash
CAPTCHA, honeypot field, minimum fill time of 3 seconds
Login
10 per 15 minutes per IP and 5 per account
IP and account
Progressive delay, lockout
OTP request
3 per 15 minutes and 10 per day
Contact hash
Cool-down of 60 seconds between sends
OTP verify
5 attempts per code
Challenge
Code is invalidated after attempts
Payments order
10 per hour
IP and session
Amount only from catalogue
Document verification
20 per hour
IP


Authenticated API
300 per minute
User
Burst allowance of 50
Exports and report generation
10 per hour
User
Queued
File upload
30 per hour
User
Total storage quota by plan
Webhooks
Provider IP allow-list where published
Source
Signature mandatory
Search
60 per minute
IP




F3.7 What is logged (PRD)
Group
Actions logged
Authentication
login success and failure, lockout, MFA enrolment and removal, password change, token reuse detected, session revoked, link used, OTP failures
Users and roles
user created, invited, role granted or revoked, deactivated, permission catalogue change
Content
page or post create, edit, publish, schedule, unpublish, delete; media upload; redirect create; settings change
Scripts
script create, edit, submit, approve, enable, disable, delete, version restore
Requests and Q&A
request viewed, status change, assignment, reply, export; question answer, publish, anonymise, decline
Payments
order created, verified, webhook processed, failure, refund requested and approved, link created, reconciliation result, catalogue price change
Organisation and committee
organisation created or edited, branch change, committee constituted, member added or ended, validation result, roster import, policy publish
Case lifecycle
case created, transition executed (code and reason), routing decision, limitation decision, timer started, paused, resumed, breached, rule set version applied
Case access
case viewed, complaint viewed, document viewed or downloaded or released or redacted, case exported, report read, statement read
Case roles
role assigned or revoked, conflict declared, conflict match cleared, undertaking signed
Sensitive operations
break-glass requested, approved, used, expired; legal hold placed or lifted; retention review approved; deletion executed; certificate issued
Legal console
rule set drafted, tested, approved, activated; template approved; calendar changed; directory entry verified
Privacy
consent given or withdrawn, data request received, decided, fulfilled
Security events
rate limit exceeded repeatedly, CSRF failure, blocked upload, scan result, anomalous access alert


F3.8 Threat model, general (PRD)
Threat
Example
Primary mitigations
Account takeover
Credential stuffing, phishing of admin users
MFA, breached password check, rate limiting, lockout, alerts, session management
Broken access control
Support user opening a POSH case; one tenant reading another
Server-side RBAC, case-level authorisation, tenant scoping in every query, automated negative tests
Injection
NoSQL operator injection, command injection in file handling
Schema validation, operator sanitisation, parameterised queries, no shell calls with user input
Cross-site scripting
Malicious blog HTML or script entered by an editor
Server-side sanitisation, CSP, output encoding, restricted script manager
Cross-site request forgery
Forged admin action from another site
SameSite cookies, CSRF tokens, origin checks
Payment tampering
Changed amount, forged success callback
Server-set amounts, signature verification, webhook verification, reconciliation
Malicious uploads
Malware or script in attachments
Type and size whitelist, content sniffing, antivirus scan, storage outside web root, forced download headers
Data leakage
Complaint text in logs or emails; backup exposure
Redaction, generic notifications, encrypted backups, restricted access
Insider misuse
Admin browsing sensitive cases
Least privilege, break-glass with alerts, audit logs, periodic access reviews
Denial of service
Request floods, expensive queries
CDN and WAF, rate limiting, pagination limits, timeouts, resource limits
Supply chain
Compromised npm package
Lockfiles, dependency scanning, minimal dependencies, review of updates
Third-party script risk
Compromised marketing script stealing data
Consent gating, allow-list, CSP, no scripts on sensitive pages, kill switch


F3.9 Threat model, POSH-specific (PRD)
ID
Threat
Asset at risk
Primary controls
TH-01
Respondent or colleague obtains the complaint or the complainant identity
Case content, party identity
Case-level roles, conflict declarations, masked lists, content-free notifications, audit of every view, break-glass only with approval
TH-02
Insider at Acorn browses cases out of curiosity
Case content
Acorn staff have no content access by default (BR-028); break-glass; view audit and monthly review
TH-03
Cross-tenant data exposure
All tenant data
orgId in every query via a data-access layer; tests that fail when a query lacks orgId; per-tenant keys
TH-04
Account takeover of an IC member or admin
Case access
Mandatory MFA for staff and IC roles, lockout, session binding, new-device alerts
TH-05
Payment tampering or fake success
Money, receipts
Server-side amounts, signature check, webhook confirmation, idempotency, reconciliation
TH-06
Malicious script injected through script control
Visitors, site integrity
Approval workflow, allow-listed domains, SRI, CSP, no script on POSH portal pages
TH-07
Stored XSS through blog, Q&A or tickets
Admin and visitor sessions
Sanitisation on save and render, CSP, escaping by default
TH-08
Malware or malicious files uploaded as evidence
Staff devices
Type checks, scanning, quarantine, download as attachment with safe headers
TH-09
Data leak through logs, errors, emails or analytics
Personal data
Redaction, content-free messages, no trackers on POSH pages, log review
TH-10
Backup or storage exposure
Everything
Encrypted backups, restricted keys, no public buckets
TH-11
Denial of service or abuse of forms
Availability
Rate limits, CAPTCHA, queue limits, CDN protection
TH-12
Retaliation through disclosure by employer admin
Complainant safety
Org admin sees metadata only; no free-text in notices; warnings in the interface
TH-13
Deepfake or forged evidence and impersonation of parties
Case integrity
Hashes at upload, chain of custody, identity checks on OTP, signature records
TH-14
Supply chain compromise of a dependency
Application
Lock files, audit in CI, pinned versions, review of new packages
TH-15
Secrets leak
Keys, gateway credentials
Secret manager, no secrets in code, rotation and scanning
TH-16
Legal coercion or unlawful access demand
Case content
Counsel review path; disclosure only on valid order; logged


F3.10 Inquiry integrity controls (PRD)
Ref
Control
Design
INQ-01
Quorum
Each hearing and each decision records the members present. The system blocks signing a report unless the configured quorum (default: Presiding Officer or a designated senior member and at least half of the members, including the external member where the policy requires) signed. The quorum rule is a parameter confirmed by counsel.
INQ-02
Conflict of interest and recusal
Every member signs a declaration per case. A member can recuse at any time or be recused by order. Recused members lose access immediately.
INQ-03
Notice and copies
The respondent receives the complaint and the documents relied upon; the complainant receives the reply and the documents. Release to the other party needs an IC release action that logs what was released and when.
INQ-04
Hearing management
Scheduling with participants, mode (in person, video, hybrid), venue, interpreter, support person and accessibility needs; notice generation; calendar invites with no case content.
INQ-05
In-camera hearings
Hearings are closed to everyone except the parties, the IC, support persons, interpreters and the witness being heard. Attendance is recorded and each attendee accepts a confidentiality undertaking before joining.
INQ-06
Separate and protected sessions
The IC can hear parties and witnesses separately, with screens or by video, to protect them from intimidation.
INQ-07
Questions through the Presiding Officer
Parties may submit questions to the Presiding Officer in writing or orally; the Presiding Officer decides which to put. The system records questions asked and answers given. The IC conduct guide reminds members that questions about character or past sexual history are inappropriate.
INQ-08
Statements and minutes
Statements are recorded in the language of the deponent, read back, corrected and signed (typed signature plus OTP, or scan). Minutes record date, time, mode, attendees, adjournments and next steps and are signed by the Presiding Officer.
INQ-09
Evidence handling
Each exhibit gets a number, description, source, date and SHA-256 hash at upload; custody events (viewed, downloaded, released, redacted) are logged. Electronic evidence has an integrity statement template aligned with the Bharatiya Sakshya Adhiniyam certificate requirements (counsel to confirm).
INQ-10
Redaction
The IC can create redacted copies (witness identity, unrelated personal data) while the original stays locked; the redacted copy carries a link to the original and a reason.
INQ-11
Summons and production
The IC uses civil-court-like powers under Section 11(3): summons to witnesses and calls for documents using templates; employer duty to secure attendance is tracked (Section 19).
INQ-12
Video hearings
Meeting links are entered by the IC or generated by an integrated provider; waiting room; no recording by default; if the IC decides to record, all participants consent and the recording is stored in the vault with the same controls.
INQ-13
Absence and ex parte path
If a party is absent, the system proposes the notices the Rules require (including written notice of 15 days before termination or ex parte action after three consecutive absences without sufficient cause) and blocks T18 until they are on record. Counsel verifies the rule text.
INQ-14
Standard of decision
The report template states the standard the IC applied (commonly the balance of probabilities in service matters; counsel to confirm) and the reasoning for each finding.
INQ-15
Parallel proceedings
Criminal complaint or court proceedings are recorded; the IC continues unless a court orders otherwise.
INQ-16
IC conduct guide
A short guide in the IC workspace: neutrality, no victim-blaming, confidentiality, no recording on personal phones, no discussion outside the committee, courteous treatment of both parties, accessible hearings.
INQ-17
Anti-intimidation notice
Every notice and hearing page states that retaliation is prohibited and how to report it.
INQ-18
Time per stage visibility
The IC sees a simple timeline of the days used and left, and the reasons for each adjournment.



F4. Accessibility, performance and quality requirements
Accessibility: WCAG 2.1 AA; keyboard navigation and visible focus; 44px touch targets; skip link; semantic landmarks; aria-live for results; reduced-motion support; English with Bengali and Hindi as agreed (D-8).
Performance: LCP under 2.5s, CLS under 0.1, INP under 200ms; Lighthouse performance 90 and accessibility 95 or higher on key pages.
Browser support: current evergreen browsers; 360px and up; no features that fail on low-end phones.
Resilience: degraded modes for portal, payment and email failures; graceful fallbacks on forms.


F4.1 Non-functional requirements (PRD)
ID
Category
Requirement
Target
NFR-001
Performance
Public pages: Largest Contentful Paint at the 75th percentile
Under 2.5 s on 4G mobile
NFR-002
Performance
Interaction to Next Paint and Cumulative Layout Shift
INP under 200 ms; CLS under 0.1
NFR-003
Performance
API response time for standard reads (95th percentile)
Under 400 ms
NFR-004
Performance
API response for writes and payment order creation (95th percentile)
Under 800 ms excluding third-party latency
NFR-005
Scalability
Concurrent users supported without degradation on the initial hosting size
200 concurrent users; horizontal scale path documented
NFR-006
Availability
Monthly uptime of production
99.5% or better (excluding planned maintenance announced 48 hours ahead)
NFR-007
Recovery
Recovery point objective and recovery time objective
RPO 24 hours or less (target 1 hour with point-in-time recovery); RTO 4 hours
NFR-008
Backups
Automated encrypted backups of database and storage, retained and tested
Daily, 30-day retention, restore test quarterly
NFR-009
Accessibility
Conformance with WCAG 2.1 Level AA on public pages and portals
No critical axe violations; manual keyboard and screen reader checks
NFR-010
Compatibility
Browsers and devices
Latest two versions of Chrome, Edge, Firefox, Safari; Android 10 and above; iOS 15 and above
NFR-011
SEO
Technical SEO
Lighthouse SEO score 95 or above; valid structured data; sitemap and robots; clean URLs
NFR-012
Usability
Task completion for core flows by first-time users in testing
Request a service in under 2 minutes; file a complaint in under 10 minutes
NFR-013
Maintainability
Code quality and documentation
Linting clean, 80% or higher unit-test coverage on services, documented setup and runbooks
NFR-014
Observability
Logging, error tracking and alerting
Structured logs, error alerts within 5 minutes, uptime alerts within 2 minutes
NFR-015
Compliance
Privacy and legal compliance by design
See Section 13 and Appendix B
NFR-016
Data integrity
Transactional safety for payments and POSH state changes
MongoDB transactions where multi-document consistency is required
NFR-017
Time handling
All timestamps stored in UTC and shown in IST (Asia/Kolkata); working-day calculations use a configurable holiday calendar
Verified by timeline tests
NFR-018
Email deliverability
Transactional emails reach the inbox
SPF, DKIM, DMARC pass; bounce and complaint handling
NFR-019
Security headers
Strict headers on all responses
A grade on securityheaders.com equivalent
NFR-020
Localisation (optional)
Support for English with Bengali and Hindi content fields and UI strings
Could-have; scheduled in Phase 4



F5. Privacy and data protection
Acorn acts as an organisation tenant and a service provider for client organisations. Data-protection duties (including the Digital Personal Data Protection regime) and sector rules must be confirmed by counsel; the platform implements the controls, and counsel decides scope and wording. Retention defaults are open decisions D-6 and D-23.
Data class
Examples
Handling
Public
Published articles, FAQ, directory entries
No restrictions; versioned and approved
Client and enquiry
Service requests, contact details, attachments, payments
Role-based access; attachments scanned; payments handled by Razorpay, card data never stored
Staff and tenant
Users, sessions, audit records, organisation settings
MFA for privileged roles; append-only audit with hash chain
Complaint content
Narrative, parties, evidence, notices, hearings, reports
Field-level encryption, case-scoped access, declarations, watermarking, custody log, content-free notifications
Aggregates
Scores, analytics, annual reports
No identifiers; small-group suppression (minimum 5)


F6. Definition of ready and done
Definition of ready (story can start)
Definition of done (story can merge and ship)
Requirement ID and acceptance criteria are clear
Acceptance criteria demonstrated with evidence
Open decisions that affect it are settled or defaulted
Unit, integration and contract tests written and passing
Design or v0 screen and API contract exist
Accessibility and performance checks pass for the affected screens
Data and permission impact identified
Permissions, tenant scoping and audit entries covered by tests
Security-critical flag set where relevant
Security-critical code reviewed by two humans
Test data is synthetic
Docs and API contract updated; no secrets or personal data in code or logs


Part G. Launch and operations playbook
Launching a legal platform is a controlled event, not a deployment. This part sets out the sequence from user acceptance testing to hypercare and the recurring operations that keep the platform safe. Agents prepare checklists, evidence and drafts; named humans approve.
G1. Launch sequence
When
Activity
Owner
T minus 8 weeks
Book the penetration test; start Razorpay live account application; start SMS sender registration if D-7 requires it; confirm hosting region and sub-processors (D-24)
Managing Partner, finance, tech lead
T minus 6 weeks
Content freeze for the public site; counsel review of legal pages, notices, templates and disclaimers; directory and helpline verification starts
Legal lead, content owner
T minus 4 weeks
Release candidate on staging; UAT window opens (5 working days); restore drill on staging; confidentiality review re-run
Product owner, QA, security lead
T minus 2 weeks
Penetration test report received; Critical and High findings fixed and retested; rules file verified by counsel
Security lead, counsel
T minus 1 week
Go-live checklist at 100 percent except production items; rollback plan reviewed; staff training completed; manuals handed over
Project lead
T minus 1 day
Database backup; production configuration verified (names only reviewed by agents); smoke-test script rehearsed on staging
DevOps, QA
T
Two approvers sign the gate; production deployment through the pipeline; smoke test on production; hypercare starts
Managing Partner, project lead
T plus 1 to 30 days
Daily checklist, defect triage, weekly digest, refreshers; exit test on day 30
Service manager, DevOps


G2. Go-live checklist (17 items)
No.
Item
Owner
Evidence
1
All Must requirements accepted in UAT; sign-off recorded
Product owner and project lead
Signed UAT sheet
2
No open S1 or S2 defects; security scan and penetration test reviewed
QA and security lead
Defect list, test report
3
Production hardened: firewall, SSH, updates verified
DevOps
Hardening checklist
4
Environment variables and secrets set; test keys removed; live Razorpay keys and webhook secret configured
DevOps and Acorn
Variable names list (no values)
5
Razorpay live account active; one small real transaction and refund tested
Finance and QA
Receipt and refund record
6
Domain, DNS, TLS and email authentication (SPF, DKIM, DMARC) verified
DevOps
DNS and header checks
7
Admin users created; MFA enrolled; demo and default accounts removed
Super Admin
User list
8
Legal pages, disclaimers, cookie banner and consent logic approved and live
Legal team
Counsel approval
9
Content loaded: home, services, About, POSH page, initial articles, FAQs
Content owner
Content tracker at Approved
10
SEO titles and meta, sitemap submitted, robots reviewed, Search Console and Analytics configured
Marketing
Console screenshots
11
Backups running; restore test completed
DevOps
Drill record with elapsed time
12
Monitoring, uptime checks and alert recipients tested
DevOps
Test alert log
13
Rollback plan reviewed; previous release available
DevOps
Tagged release, plan
14
Acorn staff trained; manuals handed over
Project lead
Attendance, acceptance
15
POSH: legal sign-off on templates and timelines; tenant isolation tests passed; break-glass documented
Legal team and QA
Sign-off, test report
16
Production smoke test passed
QA
Smoke-test form
17
Hypercare contact list shared
Project lead
Contact list


G3. User acceptance testing
Window: 5 working days on the staging release candidate with synthetic data. Humans run the scripts; agents prepare, log and fix.
Entry criteria: zero open Critical or High defects; all Must requirements covered by a script; performance and accessibility checks passed.
Exit criteria: UAT signed; no open Critical or High defects; Medium defects have an agreed plan; security scan clean; backup and rollback verified; go-live checklist complete.
Rounds: one consolidated design-revision round and one functional-correction round per phase. Additional rounds are chargeable change requests.
Roles tested: Acorn staff roles, IC member, Presiding Officer, Organisation Admin, complainant, respondent, finance.

G4. Release, rollback and feature flags
Stage
Name
What must pass
1
Commit
Lint, type check, unit tests, secret scan
2
Pull request
Integration tests, static analysis, dependency scan, build, code review (two reviewers for security-critical code)
3
Merge
Build and preview deployment
4
Staging
Migrations, end-to-end and smoke tests, dynamic scan
5
Production
Manual approval by project lead and client contact; database backup first; blue-green or rolling deployment; migrations; smoke tests
6
Post-release
60-minute monitoring window; confirm payments and email flows


Cadence: fortnightly releases; hot fixes on demand. Avoid Fridays, days before holidays and peak hours unless urgent with a recorded reason.
Rollback: an S1 or S2 in the monitoring window starts a 30-minute rollback (previous image plus migration reversal or restore) with re-authentication and a record.
Legal rule changes are data changes through the Legal Console and do not need a release.
Feature flags: new POSH features ship dark and are enabled per organisation after UAT; the whole POSH portal can be switched off without redeploying.

G5. Hypercare and warranty
Severity
Definition
Response
S1
Platform down or a confidentiality failure
Immediate; incident workflow; rollback or containment
S2
Major function broken, or timers or notifications failing
Same business day; fix or workaround
S3
Minor defect with workaround
Scheduled fix
S4
Cosmetic or enhancement
Backlog


Warranty: 30 days from each go-live for defects against the PRD. Out of warranty: new features, content changes, third-party service changes, or changes made outside the agreed process.
Daily run (30 days): timers firing, notification delivery, backups, error rate, payments and email flows, open P1 and P2 tickets, job heartbeats.
Exit test: no open S1 or S2 and the last 7 daily checks passed. Then the closure report and handover acceptance.
Engineers reproduce defects with synthetic data only. Production complaint data is never accessed for debugging.

G6. Monitoring, service levels and support

G6.1 Service levels (PRD)
Service level
Target
Availability of public site
99.5 percent monthly
Availability of POSH portal and API
99.5 percent monthly during the first year, 99.9 percent target later
Planned maintenance
Announced 3 days ahead; outside 10:00 to 19:00 on working days where possible
Incident response
P1 within 30 minutes at any time; P2 within 2 hours; P3 next business day
Status communication
Status banner and email to organisation contacts for P1 incidents lasting over 30 minutes


G6.2 Monitoring signals and alert thresholds (PRD)
Signal
Measure
Alert threshold
Severity
Availability
Uptime check of public site, API health, portal login and payment page every minute
2 failures in a row
P1 for portal and API, P2 for site
Latency
p95 API response time
Above 800 ms for 10 minutes
P2
Errors
HTTP 5xx rate
Above 1 percent for 5 minutes
P2
Request alert path
Time from request submission to admin alert and email
Above 30 seconds
P2
Queues
Queue depth and oldest job age; dead-letter count
Age above 5 minutes; any dead letter
P2
Payment health
Failure rate, webhook backlog, reconciliation mismatches
Failure rate above 15 percent; any mismatch
P1 for mismatch
Timer engine
Last successful timer-scan run
Older than 15 minutes
P1
Database
Replica lag, connections, disk, slow queries
Lag above 10 seconds; disk above 75 percent
P2
Security
Login failure spikes, denied access spikes, break-glass use, audit chain break, WAF blocks
Per rules in 26.7
P1 to P2
Email and SMS
Delivery and bounce rates
Bounce above 5 percent
P3
Backups
Success and age
Older than 26 hours
P1
Certificates and keys
Days to expiry
Under 30 days
P3
Cost
Monthly spend versus budget
Above 80 percent
P3


G6.3 Support priorities (PRD)
Priority
Definition
First response
Target resolution
Escalation
P1 Critical
Complainant or party cannot access the portal; suspected confidentiality breach; urgent safety flag; payment outage for statutory services
15 minutes (24 by 7)
4 hours or workaround
Immediate call to the Managing Partner and security lead
P2 High
Timer or notification failure; IC cannot work; report cannot be issued
1 business hour
1 business day
POSH Administrator, then service manager
P3 Normal
Feature questions, minor defects, content changes
4 business hours
3 business days
Team lead
P4 Low
Requests, enhancements
1 business day
Planned
Product owner


G6.4 Support tiers (PRD)
Tier
Team
Scope
May see case content?
L1 Support
Support Executives
Account access, how-to questions, training, invoices, general enquiries
No
L2 POSH Service
POSH Administrators, Intake Counsellors, service managers
Onboarding, IC setup, compliance tasks, scheduling support, assisted filing
Intake Counsellors only during assisted filing and aftercare scripts; POSH Administrators never, except by break-glass
L3 Legal and Engineering
Legal Administrator, counsel, senior engineers
Rules, templates, legal questions, defects, security incidents
Counsel only on assigned cases; engineers never (support access to production data is prohibited; debugging uses synthetic reproduction)



Availability target: 99.5 percent monthly, which allows about 3 hours 36 minutes of downtime in a 30-day month. Recovery targets: database 15 minutes (RPO), files 1 hour, full platform 4 hours (RTO), public site and request intake 1 hour in degraded mode.
G7. Incident management, break-glass and disaster recovery

G7.1 Incident severity (PRD)
Severity
Definition
Response time
Examples
SEV-1
Confirmed or likely exposure of POSH case content or identity, or payment data compromise
Incident commander within 30 minutes; contain within 2 hours
Case file sent to wrong person; database exposed; credential theft with case access
SEV-2
Possible exposure with limited scope, or failure of a key control
Within 2 hours; contain within 8 hours
Misconfigured role granting wider view; log containing identifiers
SEV-3
Security weakness without evidence of exposure
Within 1 business day
Vulnerability found in a dependency
SEV-4
Minor policy deviation
Within 5 business days
Late access review


G7.2 Incident workflow (PRD)
Step
Action
Who
Time target
1 Detect and report
Anyone who suspects exposure reports to the security channel and phone line; a ticket with severity is opened; no case content is pasted into the ticket
Any staff
Immediately
2 Triage
Incident commander classifies severity (Section 26.8), starts the incident log, appoints roles
Security Lead
30 minutes for SEV-1
3 Contain
Disable the access path, revoke sessions, rotate keys, block links, pause the affected export or notification job
Tech Lead
2 hours for SEV-1
4 Preserve
Snapshot logs and affected data state; hold audit exports; do not delete anything
DevOps
During containment
5 Assess
Determine what was exposed, to whom, for which cases and organisations, using audit records
Security Lead and Legal lead
24 hours
6 Notify authorities
CERT-In within 6 hours of noticing, where applicable; Data Protection Board when the DPDP breach provisions apply; counsel confirms scope
Legal lead
As per law
7 Notify the client
Inform the organisation contact and the Presiding Officer using template N-SEC; offer a briefing
Service Manager
Within 24 hours of confirmation
8 Support the affected
Intake Counsellor offers a call; assess retaliation risk; propose interim protection with the organisation
Intake Counsellor
Within 24 hours
9 Section 16 and employer consequences
Counsel assesses penalties and discipline exposure; decisions recorded
Legal lead
5 business days
10 Recover and review
Fix cause, restore services, test controls; hold the post-incident review; add tests; update training
Security Lead
5 business days
11 Close
Final report to the Managing Partner; retained 8 years
Security Lead
10 business days


G7.3 Backup and recovery (PRD)
Item
Target and method
Database backups
Continuous point-in-time recovery for 7 days plus daily snapshots kept for 35 days; weekly snapshots kept for 12 weeks; stored in a separate region of India under a separate account
Object storage
Versioning and cross-region replication within India; deleted objects recoverable for 35 days
Recovery point objective (RPO)
Maximum 15 minutes for the database; 1 hour for files
Recovery time objective (RTO)
Maximum 4 hours for the full platform; 1 hour for the public site and request intake in degraded mode
Erasure and backups
Crypto-erasure of the case key makes backup copies unreadable (Section 26.10); backups roll off in 35 days
Disaster scenarios
Region failure, database corruption, ransomware, key loss, accidental deletion, provider outage, payment gateway outage. Each has a runbook in Section 30.
Degraded modes
If the portal is down, the public site shows contact numbers for the Intake Counsellor and an email option; if the payment gateway is down, payment buttons are disabled with a message and requests still work; if email fails, in-app alerts and the queue continue.
Restore drills
Quarterly restore to an isolated environment with a checklist that includes decryption of a test case and audit chain verification.
Key backup
Master key recovery by the cloud provider process with two named custodians; documented and tested yearly.
Business continuity
Deputy for each role, an out-of-hours contact sheet, and a statutory timer protection rule: timers continue to be computed from stored events after any outage and no deadline is shortened by downtime (the system adds a note and notifies users).



G7.4 Break-glass procedure (SOP-02)
Step
Action
1
A POSH Administrator submits case ID, reason, the exact data needed and proof that no less intrusive route exists
2
The Managing Partner approves; content access also needs a second reviewer; both re-authenticate
3
Access is granted to one named person for the minimum period (default 60 minutes, hard maximum 2 hours) after signing a case-specific undertaking
4
Every view and download is logged; the Presiding Officer automatically receives a content-free message that Acorn accessed the case
5
Access expires automatically; the person records what was done
6
A monthly review compares break-glass events with tickets and flags exceptions


G8. SOP register and recurring duties

G8.1 Standard operating procedures (PRD)
ID
Procedure
Owner
Trigger or frequency
SOP-01
Confidentiality or security incident workflow
Security Lead
Any suspected breach
SOP-02
Break-glass access
Managing Partner
Request by POSH admin
SOP-03
Legal hold
Legal Admin
Appeal, court order, notice of litigation
SOP-04
Retention review and deletion
Legal Admin
Daily scan; monthly review
SOP-05
Annual report and audit cycle
Service Manager
Yearly window per organisation
SOP-06
Organisation onboarding
Service Manager
New client
SOP-07
Organisation offboarding
Service Manager
Contract end
SOP-08
Staff joiner, mover and leaver
HR and Security Lead
Each change
SOP-09
On-call and escalation
Tech Lead
Continuous
SOP-10
Rule set and template change
Legal Admin
Law change, quarterly review
SOP-11
Statutory watch review
Legal Admin
Monthly
SOP-12
Complainant support and welfare contact
Intake Counsellor
On case submission and at aftercare dates
SOP-13
Data subject request handling
Privacy Officer
On receipt; due dates tracked
SOP-14
Payment issue and refund handling
Finance
Failed or disputed payment
SOP-15
Backup, restore and disaster recovery
DevOps
Daily check; quarterly drill
SOP-16
Access review
Managing Partner
Quarterly
SOP-17
Vendor and sub-processor review
Security Lead
Yearly and on change
SOP-18
Complaint about Acorn service
Managing Partner
On receipt
SOP-19
Panel member (external) assignment and independence check
Legal Admin
Each committee or inquiry need
SOP-20
Content publication and moderation (blog, Q&A)
Content Lead
Daily
SOP-21
Script change approval
Marketing Manager and Admin
Each request
SOP-22
Release management
Tech Lead
Fortnightly


G8.2 Recurring engineering and security activities (PRD)
Activity
When
Owner
Pass criterion
Static analysis and secret scan
Every commit
Developers
No high findings; no secrets
Dependency audit
Every build and weekly
Tech Lead
No critical or high without an approved exception
Authorisation tests
Every build
QA
All matrix cases pass (Section 29.4)
Dynamic scan
Weekly on staging
Security Lead
No high findings
Penetration test
Before go-live and yearly; after major change
Independent firm
No critical or high open; retest done
Cloud configuration review
Before go-live and quarterly
Security Lead
No public storage; least privilege confirmed
Backup restore drill
Quarterly
DevOps
Restore within targets in Section 27.7
Incident exercise
Twice a year
Security Lead
Timings in Section 26.8 met
Access review
Quarterly
Managing Partner
All roles justified; leavers removed
Privacy review
Before each release that adds data fields
Legal Admin
Inventory and notices updated




Frequency
Duty
Owner
Daily
Backup check, job heartbeats, error and payment checks
DevOps
Weekly
KPI digest, ticket and SLA review
Service manager
Monthly
Patching (critical fixes within 48 hours), statutory watch review, content calendar
DevOps, Legal Administrator, editor
Quarterly
Access review, restore drill, escalation-matrix review, script review, cloud configuration review
Security lead, tech lead
90 and 180 days
Re-verify helpline and directory entries
POSH Administrator
Yearly
Penetration test, vendor review, annual report cycle per organisation, key-recovery test
Partners


G9. KPIs for the first six months
KPI
Target
Source
Enquiry conversion
2 percent or more
Consent-based analytics events
First response time
Under 1 business day (median)
Service request records
Q&A answered within 3 business days
90 percent or more
Q&A moderation
Articles published
4 or more per month
Blog workflow
Payment success rate
85 percent or more
Payment records
POSH timeline adherence
100 percent with alerts before each deadline
Timer engine
Availability
99.5 percent monthly
Monitoring
Core Web Vitals
LCP, INP, CLS in the good range
Field data


Counsel decides legal scope. Notifications to CERT-In and the Data Protection Board, regulator responses and data-subject decisions depend on counsel's reading of when duties apply. The workflows record and time them; they do not decide them.
Appendices: reference extracts from the PRD
These appendices reproduce key tables from the Acorn Legal Platform PRD v2.0 so that designers, engineers, testers and counsel can work from one document. They are extracts, not replacements: where this document and the PRD differ, the PRD governs. Tables are printed in landscape.

R1. Case lifecycle, timers and rules
The state machine, deadline engine, routing rules and edge cases that drive the POSH workflow. Statutory numbers are effective-dated parameters marked for counsel to verify.
R1.1 Case states
State
Meaning
DRAFT
Complaint being prepared by the complainant or an Intake Counsellor; not yet received by the IC
SUBMITTED
Received; case ID issued; awaiting triage
TRIAGE
IC checks completeness, routing, conflicts, limitation and urgent safety needs
LATE_REVIEW
Extension of the complaint period under consideration
AWAITING_INFO
IC has asked the complainant for missing information
CONCILIATION
Settlement attempt at the complainant’s request, before inquiry
NOTICE_ISSUED
Copy of the complaint sent to the respondent; reply window running
INQUIRY
Hearings, statements and evidence in progress
LEGAL_STAY
A court or tribunal order has stopped the inquiry
DELIBERATION
Evidence closed; the IC is deciding and drafting the report
REPORT_ISSUED
Report delivered to the employer and the parties
ACTION_PENDING
Employer has 60 days to act on the recommendations
ACTION_COMPLETED
Employer has recorded action taken and the IC has verified it
APPEAL_WINDOW
90-day appeal period running
APPEAL_FILED
An appeal has been filed; legal hold applies
REFERRED_LC
Case referred to the Local Committee; platform case locked
REJECTED
Time-barred or outside the Act, with a recorded order and referral guidance
WITHDRAWN
Complainant has withdrawn, with a recorded reason
CLOSED
Outcome recorded; retention clock running


R1.2 State transitions T01 to T30 with guards
ID
From
Action
Guards
To
Side effects
T01
DRAFT
Submit
Required fields complete; consents given; OTP signature verified
SUBMITTED
Case ID; encryption; P-01 acknowledgement; P-02 alerts; urgent flag evaluation; limitation and routing computed
T02
SUBMITTED
Start triage
Presiding Officer or assigned IC member has signed the conflict declaration
TRIAGE
Triage timer (internal target 7 days); IC access granted to assigned members only
T03
TRIAGE
Refer to Local Committee
Routing RT-02, RT-03 or RT-04 confirmed by the POSH Administrator
REFERRED_LC
Referral pack; complainant notified in plain language; retention clock; case locked
T04
TRIAGE
Open late review
Last incident more than three months before receipt
LATE_REVIEW
Extension request recorded; internal decision target 7 days
T05
LATE_REVIEW
Grant extension
Within a further three months; reasons recorded; majority of the IC
TRIAGE
Order generated; limitation status Extended
T06
LATE_REVIEW
Reject as time-barred
Outside the extended period, or reasons not accepted; recorded order
REJECTED
Order and guidance letter; offer concern report and police and legal aid information
T07
TRIAGE
Request information
Specific questions recorded
AWAITING_INFO
Complainant notified (generic); internal reminder timer
T08
AWAITING_INFO
Information received or period lapsed
Reply recorded or deadline reached
TRIAGE
Resume triage
T09
TRIAGE
Start conciliation
Written request by the complainant recorded; no monetary basis
CONCILIATION
Inquiry clock not started; conciliation record opened
T10
CONCILIATION
Settle
Terms recorded in writing; no monetary element; both parties consent; IC records outcome
CLOSED
Copies to both parties and to the employer for action; terms monitoring task; closure code Settled
T11
CONCILIATION
Resume process
Complainant withdraws from conciliation, or terms are not complied with
TRIAGE
Record reason; continue to notice
T12
TRIAGE
Accept for inquiry and issue notice
IC quorum present; copies prepared; interim relief request handled if made
NOTICE_ISSUED
Notice and copies to the respondent within 7 working days of receipt; 10-working-day reply timer starts on receipt; 90-day inquiry clock set per the organisation’s anchor
T13
NOTICE_ISSUED
Begin inquiry
Reply received or reply window expired; hearing notice issued; quorum present
INQUIRY
Inquiry start recorded; hearing schedule opened
T14
INQUIRY
Hold or adjourn hearing
Minutes recorded; reason code if adjourned
INQUIRY
Delay reason counted for reporting; reminders for next hearing
T15
INQUIRY
Record court stay
Order uploaded and verified by the Presiding Officer
LEGAL_STAY
Clock stopped with legal ground; alerts to POSH Administrator and counsel
T16
LEGAL_STAY
Stay vacated
Order uploaded
INQUIRY
Clock resumes; new dates computed and shown
T17
INQUIRY
Close evidence
Both parties heard, or the ex parte path was followed with the required notice
DELIBERATION
Findings workspace opens; 10-day report timer starts
T18
INQUIRY
Terminate or proceed ex parte
Three consecutive non-appearances without sufficient cause after the required written notice (15 days) as the Rules provide
DELIBERATION or CLOSED
Order recorded with notices as evidence; counsel flag
T19
DELIBERATION
Issue report
Findings recorded; majority decision; signatures of quorum; report lint passed
REPORT_ISSUED
Locked PDF with timestamp; delivered to the employer and both parties; P-08; 60-day action clock and 90-day appeal clock start
T20
REPORT_ISSUED
Await action
Automatic
ACTION_PENDING
Employer task created
T21
ACTION_PENDING
Record action taken
Organisation Admin records action with proof; IC verifies
ACTION_COMPLETED
P-notification; compensation tracking if ordered
T22
ACTION_PENDING
Flag overdue
Day 61 with no action recorded
ACTION_PENDING
Overdue flag; escalation to the POSH Administrator and the Managing Partner; report to District Officer where policy requires
T23
ACTION_COMPLETED
Open appeal window
Appeal period not yet expired
APPEAL_WINDOW
Window end date shown
T24
APPEAL_WINDOW
Record appeal
Filing details and order uploaded
APPEAL_FILED
Legal hold on all case data; counsel assigned
T25
APPEAL_WINDOW
Close
Window lapsed with no appeal, and all actions complete
CLOSED
Closure note; retention clock; aftercare schedule 30, 90 and 180 days
T26
Any state before REPORT_ISSUED
Withdraw
Complainant’s written request; Presiding Officer confirms the request is voluntary; reason recorded
WITHDRAWN
IC may decide to continue where safety or law requires; counsel flag; closure notices
T27
CLOSED
Reopen
Court or tribunal order, new material evidence, or non-compliance with a settlement; approved by the Presiding Officer and the POSH Administrator
TRIAGE
Reason and approvals recorded; timers recomputed under the rule set in force
T28
Any open state
Close as filed in error
Dual approval; reason recorded; no complaint content exposed to approvers beyond metadata
CLOSED
Retention rules apply
T29
Any open state
Link retaliation case
Retaliation reported by a party or witness
Unchanged (new linked case)
Fast-track case with priority 1; same IC unless conflicted
T30
Any open state
Link counter-complaint
Counter-complaint received
Unchanged (new linked case)
Separate IC composition decided by the Presiding Officer and counsel; no shared access without approval


R1.3 Statutory timers TM-01 to TM-21
Code
Timer
Starts at
Duration
Alerts
Basis
Config
TM-01
Complaint period
Date of the last incident
3 months
Warning to IC at intake if exceeded
Section 9(1)
Effective-dated
TM-02
Extension of complaint period
End of TM-01
Up to a further 3 months
Decision reminder at day 5 of the review
Section 9(1) proviso
Effective-dated
TM-03
Acknowledgement
Receipt
1 business day
Breach alert to the Presiding Officer
Service standard
Yes
TM-04
Triage
Receipt
7 days
5, 2 and 0 days
Service standard
Yes
TM-05
Copy to respondent
Receipt of complaint
7 working days
5, 2 and 0 working days
Rules (counsel to verify)
Effective-dated
TM-06
Respondent reply
Respondent’s receipt of copy
10 working days
5, 2 and 0 working days; reminder to respondent
Rules (counsel to verify)
Effective-dated
TM-07
Hearing notice lead time
Hearing notice date
Minimum 7 days (default)
Warning if shorter
Natural justice, internal default
Yes
TM-08
Inquiry completion
Anchor per organisation: date complaint received (default) or inquiry start date
90 days
30, 15, 7, 3 and 1 days; overdue
Section 11(4)
Anchor yes; duration effective-dated
TM-09
Report to employer
Completion of inquiry
10 days
7, 3 and 1 days; overdue
Section 13(1)
Effective-dated
TM-10
Employer action
Employer’s receipt of report
60 days
30, 15, 7, 3 and 1 days; overdue
Section 13(4)
Effective-dated
TM-11
Appeal period
Date of the recommendation (or of its non-implementation)
90 days
30, 7 and 1 days
Section 18
Effective-dated
TM-12
Interim relief decision
Request received
3 working days
1 working day and breach
Service standard
Yes
TM-13
Notice before ex parte action
Notice date
15 days
Day 10 and day 14
Rules (counsel to verify)
Effective-dated
TM-14
Interim leave limit
Leave start
Up to 3 months
Day 75 reminder
Section 12
Effective-dated
TM-15
IC member tenure
Nomination date
Up to 3 years
90, 60 and 30 days
Section 4
Effective-dated
TM-16
Annual report
Reporting period end
Due date per District Officer instruction (to be configured per district)
60, 30, 14 and 7 days
Sections 21 and 22; decision D-19
Yes
TM-17
Board’s Report disclosure data
Financial year end
Ready before the Board’s Report is finalised
60 and 30 days
Companies Rules 2025
Yes
TM-18
Awareness training cycle
Last session
12 months
60, 30 and 0 days
Section 19 (regular intervals)
Yes
TM-19
Aftercare check-ins
Closure
30, 90 and 180 days
3 days before
Acorn standard
Yes
TM-20
Retention review
Closure
Per organisation policy; default review at 3 years if no litigation hold
90 and 30 days
DPDP and Acorn policy; decision D-23
Yes
TM-21
Draft expiry
Last edit of a draft complaint
30 days
Day 25 content-free reminder
Data minimisation
Yes


R1.4 Timer rule definitions
Rule
Definition
Working day
A day that is not a weekly off and not a holiday in the organisation’s calendar. Weekly off is configurable (Sunday only, or Saturday and Sunday). Holidays are the union of central holidays, West Bengal holidays and the organisation’s own list, maintained by the Legal Administrator and the Organisation Admin.
Counting
The day of the triggering event is day 0. Day 1 is the next calendar day (or next working day for working-day timers). A deadline falling on a non-working day moves to the next working day only for timers that the rule set marks as extendable; statutory timers marked strict are shown on the last working day before the deadline as the “safe date”.
Month arithmetic
Three months from 31 January is 30 April (the last day of the month when the day does not exist). Month and day durations are never mixed.
Receipt
A document is received when it is delivered to the party’s portal inbox and the delivery is logged, or on the date of acknowledged hand delivery recorded by the IC, whichever the IC records. Email dispatch alone is not receipt unless the party opens the portal notice or the organisation’s policy defines it as receipt.
Time zone
Asia/Kolkata for display and calendar day boundaries; UTC for storage.
Safe date and legal date
Every timer shows a legal date (computed) and a safe date (one working day earlier) so that the IC aims earlier than the last day.
Explainability
Each deadline stores the rule ID, rule set version, inputs and the calculation text.
Recalculation
When an input changes (for example the date of receipt is corrected), the engine recomputes dependent timers, writes an audit event and notifies the Presiding Officer.


R1.5 Legal grounds that stop a clock
Code
Ground or reason
Effect on the statutory clock
Required record
CS-01
Court or tribunal stay of the inquiry
Clock stopped from the date of the order until it is vacated
Order upload; Presiding Officer verification
CS-02
Conciliation requested before the inquiry starts
The inquiry has not started; the inquiry clock starts from the anchor chosen by the organisation only after conciliation ends if the anchor is inquiry start. If the anchor is complaint receipt the clock runs unless counsel decides otherwise (decision D-15)
Written request; conciliation record
DR-01
Party unavailable (illness, travel)
No stop. Delay reason recorded; counts towards “pending beyond 90 days”
Evidence of unavailability
DR-02
Witness unavailable
No stop. Delay reason recorded
Notice and reason
DR-03
Quorum failure or vacancy in the IC
No stop. Delay reason recorded; vacancy alert to the Organisation Admin and the POSH Administrator
Vacancy record
DR-04
Adjournment at a party’s request
No stop. Delay reason recorded
Request and order
DR-05
Complexity or volume of evidence
No stop. Delay reason recorded
IC note
DR-06
Other
No stop. Free text required
IC note


R1.6 Applicability and routing rules
Rule
Condition
Routing outcome
System behaviour
RT-01
Office or branch has 10 or more employees and the respondent is not the employer
Internal Committee of that office or branch
Create statutory case; assign the IC; start timers
RT-02
Office or establishment has fewer than 10 employees
Local Committee (District Officer)
Flag as Local Committee matter; generate referral pack; give Nodal Officer and District Officer contacts; lock case after referral; no statutory timers run on the platform
RT-03
Complaint is against the employer (owner, managing director or head of the organisation)
Local Committee
Same as RT-02; warn the organisation that the IC may not handle the complaint
RT-04
Complainant is a domestic worker or works in the unorganised sector
Local Committee
Same as RT-02; plain-language guidance and legal aid directory
RT-05
Respondent is a third party (client, customer, vendor, visitor, contractor staff)
Internal Committee of the complainant’s workplace
Third-party respondent record; notice delivered through the respondent’s organisation contact where known; employer assistance duties tracked; police referral support
RT-06
Incident occurred at another organisation’s premises (client site, event)
Internal Committee of the complainant’s employer, with intimation to the host organisation where legally permitted
Host organisation contact recorded; sharing limited to what the IC authorises; counsel review flag
RT-07
Respondent is employed by a different organisation
IC where the complainant works
Cooperation request letter template; no cross-tenant data access
RT-08
Complainant is an intern, trainee, apprentice, volunteer, consultant or contract worker
Covered as an employee under the wide definition; routed per workplace
Relationship type stored; no eligibility rejection on this ground
RT-09
Complainant is not a woman (man, non-binary, transgender person)
Outside the statutory definition of aggrieved woman; handled under the organisation’s gender-neutral policy if configured
Mark case type Non-statutory; apply organisation-chosen timelines; never count in statutory annual statistics unless the organisation elects; counsel decision D-16
RT-10
Harassment through online, remote or virtual means linked to work
Treated as a workplace matter
Evidence types include screenshots, chat exports and email headers; same workflow
RT-11
Incident during travel, employer transport or an off-site event
Treated as a workplace matter
Place values captured; no rejection
RT-12
Respondent is the Presiding Officer or an IC member
Member recused; IC reconstituted for this case
Automatic conflict check on names; recusal order; replacement Presiding Officer (another senior woman, or external nominee through Acorn); access of the conflicted member removed
RT-13
Complainant is under 18
Child-protection protocol
Case flagged; counsel notified; guardian involvement option; assessment of mandatory reporting duties; restricted access list
RT-14
Facts indicate a criminal offence (assault, stalking, voyeurism, sexual assault)
IC proceeds and the employer assists the criminal complaint if the woman chooses
Parallel criminal track record (FIR number, police station, status); inquiry is not delayed by the criminal track unless a court orders
RT-15
Last incident is more than three months before receipt
Late complaint review
Open extension request (up to a further three months for recorded reasons); otherwise handled as a concern report
RT-16
Organisation has several offices or branches in different states
IC per office or branch, or a designated IC as the organisation’s policy and the Act allow
Branch IC mapping; cross-branch Presiding Officer nomination
RT-17
Organisation has fewer than 10 employees but wishes to run a voluntary IC
Voluntary IC (non-statutory); Local Committee remains available to the complainant
Organisation flag Voluntary IC; warn that statutory protections come from the Local Committee
RT-18
Submission is anonymous
Concern report (not a statutory complaint)
Create a concern record; offer anonymous guidance; explain that a named written complaint is needed to start an inquiry; no timers
RT-19
Complaint filed by a legal heir or other authorised person because the woman is incapacitated or has died
Statutory complaint with representative record
Authorisation or relationship proof stored; counsel flag
RT-20
Government department, PSU or public authority
IC and registration on SHe-Box expected
Organisation type Public authority; SHe-Box registration check in the compliance score
RT-21
Complainant’s employer is not an onboarded organisation on the platform
No tenant available
Do not store a case; show information, the Local Committee and SHe-Box links and the helpline directory; offer an enquiry to Acorn


R1.7 Edge cases and handling
ID
Scenario
Handling rule
System behaviour
EC-01
Complaint is against the Presiding Officer or an IC member
The member is recused; another senior woman presides, or Acorn nominates an external Presiding Officer if the organisation has none
Conflict match on names; RT-12; access removed; DOC-08
EC-02
Complaint is against the employer, owner or head of the organisation
Local Committee jurisdiction; the IC does not inquire
RT-03 referral pack and contacts
EC-03
Respondent is a client, vendor or visitor
IC inquires; employer assists; client escalation per contract; police assistance if the woman chooses
RT-05; third-party record; DOC-17 not used on external parties without legal advice
EC-04
Respondent resigns or is terminated during the inquiry
The IC continues and decides; the report is still issued; the employer records what action is possible (for example exit record, reference restrictions); compensation by direct payment if no salary
Respondent status field; T17 and T19 unchanged; counsel flag
EC-05
Complainant resigns during the inquiry
The inquiry continues; the complainant remains a party; communications use her personal contact details
Contact preference locked to personal channels
EC-06
Complainant asks to withdraw
The Presiding Officer checks that the request is free from pressure; the IC may continue where safety or law requires
T26 with reason and counsel flag; aftercare scheduled
EC-07
Respondent files a counter-complaint
Handled as a separate case with separate conflict decisions; the first inquiry is not paused
T30
EC-08
Several complainants against one respondent
Separate cases linked by the respondent record; the IC may hear together with consent and with confidentiality safeguards
Link record; no cross-visibility between complainants without release
EC-09
Incident across states or offices
IC of the complainant’s workplace; cross-branch presiding officer allowed
RT-16
EC-10
Complainant is a minor
Child-protection protocol: restricted access, guardian, counsel assessment of mandatory reporting and notifications
RT-13; extra approvals
EC-11
Criminal offence alleged (assault, stalking, voyeurism)
The IC inquires; the employer assists the criminal complaint if the woman chooses; evidence is preserved
RT-14; parallel track; legal hold option
EC-12
A court stays the inquiry
Record the order; stop the clock only on CS-01; plan the restart
T15, T16
EC-13
Leak or suspected breach of confidentiality
Contain, preserve logs, notify the Presiding Officer and Managing Partner, assess legal notifications, start disciplinary referral
Incident workflow in Section 30
EC-14
IC quorum fails because of vacancy or conflicts
Employer must fill the vacancy; Acorn can supply an external member; delay reason DR-03 recorded
Vacancy alert; replacement workflow
EC-15
IC tenure expires during a case
Members continue for pending cases unless the policy says otherwise; replacements are appointed for new cases
Tenure alert; policy flag
EC-16
Harassment through chat, social media or email
Treated as workplace conduct if linked to work; evidence preserved with headers and exports
RT-10; evidence guidance
EC-17
Complainant fears retaliation by the manager
Interim relief (reporting line change, remote work, transfer); retaliation monitoring; manager is told of the anti-retaliation duty without case details
SUP-08, SUP-09
EC-18
Complainant has a disability or needs language help
Accommodation and interpreter flow
SUP-05, SUP-06
EC-19
Respondent denies receiving the notice
Delivery log, portal read receipt and registered post proof; re-service with extended reply time
DOC-12 re-issue; timer recomputed with reason
EC-20
Party refuses to take part
Follow the ex parte path after the notices the Rules require
INQ-13; T18
EC-21
Request for case information by the media or the public
Refuse; Section 16 applies; refer to the Managing Partner
Template response; log
EC-22
Data subject request (access, correction, erasure) on case data
Handled by the grievance officer with counsel; confidentiality and legal retention limits explained; no deletion during legal hold
DOC-38; hold check
EC-23
Court order or police request for case documents
Counsel verifies the order; the minimum necessary is released; every release is logged
Export with BG; DOC-29 hold
EC-24
Organisation stops using Acorn services
Return or export of cases and records to the employer in encrypted form; secure deletion on the agreed date; legal hold respected
Offboarding workflow
EC-25
Complaint relates to an incident outside India or abroad (remote team)
Counsel assesses jurisdiction and the employer’s policy; platform records and processes under policy
Counsel flag; non-statutory label if needed
EC-26
Acorn staff member has a conflict with a case
Declaration, access removed, case reassigned
Same as INQ-02
EC-27
Complainant uses a work email that the employer can read
Warn and offer personal channels; do not send case messages to monitored mailboxes
Contact preference rules
EC-28
Same person is both complainant and IC member in another case
Role separation per case; no cross-access
Per-case role assignment


R1.8 Rule parameters (effective-dated, editable only through the Legal Console)
Parameter
Default (rule set v1, October 2026)
Source note
Change approval
complaint_period_months
3
Section 9(1)
Legal Administrator and counsel (dual)
complaint_extension_months
3
Section 9(1) proviso
Dual
copy_to_respondent_working_days
7
Rules (counsel to verify)
Dual
respondent_reply_working_days
10
Rules (counsel to verify)
Dual
inquiry_days
90
Section 11(4)
Dual
inquiry_anchor
complaint_received
Decision D-15
Dual
report_days
10
Section 13(1)
Dual
employer_action_days
60
Section 13(4)
Dual
appeal_days
90
Section 18
Dual
ex_parte_notice_days
15
Rules (counsel to verify)
Dual
interim_leave_max_months
3
Section 12
Dual
ic_min_members
Presiding Officer + 2 members + 1 external, at least half women
Section 4
Dual
ic_tenure_max_years
3
Section 4
Dual
ic_size_threshold_employees
10
Section 4
Dual
nodal_officer_forward_days
7
Supreme Court directions, 3 Dec 2024
Dual
conciliation_allows_monetary
false
Section 10
Locked (code change)
k_anonymity_threshold
5
Acorn policy
Legal Administrator
draft_expiry_days
30
Acorn policy
Product owner
retention_review_years
3
Decision D-23
Dual
aftercare_days
30, 90, 180
Acorn policy
Product owner


R2. Roles, permissions and confidentiality
Role definitions, the admin permission matrix, the case-level permission matrix and the controls that protect complaint content.
R2.1 Roles
Role
Scope
Summary of permissions
Super Admin
Platform
Everything: users, roles, settings, payments configuration, scripts, audit logs, data export, POSH oversight (break-glass access is logged and alerted)
Admin
Platform
Manage requests, Q&A, payments view, reports; no role management or system settings
Content Editor
Platform
Create and edit blog posts, pages and FAQs; cannot publish scripts or view payments or POSH data
Marketing Manager
Platform
Manage scripts and SEO settings, view analytics summaries; cannot view client request details beyond counts
Support Executive
Platform
View and respond to service requests and Q&A; no payments configuration, no POSH access
Finance
Platform
View payments, refunds, reconciliation reports, invoices
POSH Administrator (Acorn)
POSH, all assigned organisations
Onboard organisations, configure IC, oversee case timelines, access only cases they are assigned to, generate reports
Organisation Admin
One organisation
Manage that organisation's IC members, policy documents, training records and reports; does not see case details unless also an IC member
IC Presiding Officer
Assigned cases
Full case workflow for assigned cases, issue notices, schedule hearings, record findings, submit report
IC Member
Assigned cases
View and contribute to assigned cases, record notes and votes, upload evidence
External Member
Assigned cases
Same as IC Member, with mandatory external-member flag for committee composition checks
Complainant
Own complaint only
File complaint, track status, upload documents, receive notices, withdraw or request conciliation
Respondent
Own case notices only
Receive notice, submit reply, upload documents, receive findings as permitted
Public visitor
Public site
Browse, submit service requests and questions, pay fees


R2.2 Admin permission matrix
Module
Super Admin
Admin
Content Editor
Marketing Mgr
Support
Finance
POSH Admin
Service requests
R C U D X
R U X
-
R (counts)
R U
-
-
Q&A
R C U D P
R U P
R U
-
R U
-
-
Blog and pages
R C U D P
R C U P
R C U
-
-
-
-
Scripts and SEO
R C U D P
R
-
R C U P
-
-
-
Payments
R U X
R
-
-
-
R U X
-
Users and roles
R C U D
-
-
-
-
-
-
POSH organisations
R C U
-
-
-
-
-
R C U
POSH cases
Break-glass only (logged)
-
-
-
-
-
Assigned cases only
Audit log
R X
-
-
-
-
-
-
Settings
R U
-
-
-
-
-
-


R2.3 Case-level permission matrix
Action
Cmp
Res
PO
ICM
PAd
OAd
SAd
Cns
IC
See case status (stage name and dates)
Own
Own
Asg
Asg
Asg
N
N
Asg
Asg (meta)
Read complaint narrative
Own
Rel
Asg
Asg
N
N
BG
Asg
During assisted filing only
See party identities
Own
Rel
Asg
Asg
N (masked)
N
BG
Asg
N
Edit complaint after submission
N (adds supplements)
N
Asg
N
N
N
N
N
N
Upload evidence
Own
Own
Asg
Asg
N
N
N
N
N
View evidence
Own
Rel
Asg
Asg
N
N
BG
Asg
N
Release a document to the other party
N
N
Y
N
N
N
N
N
N
Add private IC notes
N
N
Asg
Asg
N
N
N
N
N
Read private IC notes
N
N
Asg
Asg
N
N
BG
N
N
Schedule hearings and issue notices
N
N
Asg
Asg (if delegated)
Meta only
N
N
N
N
Record minutes and statements
N
N
Asg
Asg
N
N
N
N
N
Record findings and sign the report
N
N
Asg
Asg
N
N
N
Review comments only
N
View issued report
Rel
Rel
Asg
Asg
Outcome only
Outcome and recommended action only
BG
Asg
N
Record employer action taken
N
N
Verify
N
N
Y
N
N
N
Request interim relief
Own
N
N
N
N
N
N
N
Help the complainant
Withdraw or request conciliation
Own
N
N
N
N
N
N
N
Help the complainant
Export case bundle
Own copy of own documents
N
Y (logged)
N
N
N
BG
Asg (logged)
N
See organisation statistics
N
N
Y
N
Y
Y
Y
N
N
Apply or lift legal hold
N
N
Request
N
Y with counsel
N
N
Y
N
Delete any case data
N
N
N
N
Dual approval retention job
N
N
N
N


R2.4 Confidentiality controls
Control
Description
Role separation
POSH roles are separate from general admin roles. Content, marketing and support staff have no access path to POSH data.
Case-level authorisation
Access is granted per case to named users after confidentiality undertaking and conflict check. No wildcard access.
Field-level encryption
Complaint narrative, party identities, witness details and notes are encrypted at the application layer (AES-256-GCM) with keys held in a managed key service or secured environment, in addition to disk and database encryption.
Break-glass access
Super Admin access to a case requires a written reason, triggers an alert to the Managing Partner, expires automatically and is permanently logged.
No sensitive content in channels
Email, SMS and real-time messages carry only case ID and generic text. Complaint content is never sent through any notification.
Document protection
Downloads use short-lived signed links, optional dynamic watermarking with user ID, and download counts. Print and export are logged.
Data minimisation
Only fields necessary for the inquiry are collected. Aggregated reports exclude identities.
Search restrictions
Case content is not indexed by any public search or by the global admin search.
Logging hygiene
Application logs and error trackers never contain complaint text or personal identifiers; sensitive fields are redacted before logging.
Backup protection
Backups are encrypted and access-controlled. Restores happen only in an isolated environment with approval.
Data subject rights
The system supports access, correction and erasure requests under data protection law, balanced against statutory retention duties and the confidentiality provisions, with a documented review by counsel.


R2.5 Protected items and who may see them
Item protected (Section 16)
Who may see it
Display and export rule
Contents of the complaint
Assigned IC members; the complainant; the respondent (copy as the Act requires); Acorn staff only when they hold a case role
Never in email, SMS or push content; never in logs; never in search results; viewer is read-only with watermark; download needs a reason
Identity and address of the aggrieved woman
Assigned IC members; the respondent only to the extent the copy of the complaint contains it; the complainant
Masked in all lists and dashboards (initials or case ID only)
Identity and address of the respondent
Assigned IC members; the complainant to the extent the Act requires; the employer for action under Section 13
Masked in lists
Identity and address of witnesses
Assigned IC members; released to a party only by IC release and after redaction
Masked; witness codes (W1, W2)
Inquiry proceedings, statements and minutes
Assigned IC members; parties to the extent they take part
Time-limited signed links
Recommendations and action taken
Employer (as needed to act), parties
Locked PDF; employer action record shows outcome only
Aggregated statistics
Organisation Admin, Acorn, District Officer (annual report)
Counts only; small-cell suppression (see below)


R3. Notifications and document templates
Every system notification and every generated document, with recipients, channel, timing and merge fields. All notifications are content-free.
R3.1 Notification catalogue
ID
Event
Recipients
Channel
Timing and rule
P-01
Complaint received
Complainant
Email or SMS, in-portal
Immediately; case ID and next steps only
P-02
New complaint alert
Presiding Officer, POSH Administrator
Email, real-time
Immediately; case ID, organisation, urgent flag
P-03
Notice available
Respondent or complainant
Email, in-portal
On issue; “You have a notice. Sign in to view.”
P-04
Hearing scheduled or changed
Participants
Email, calendar invite without content
On issue; at least 7 days ahead; reminder 48 hours and 2 hours before
P-05
Deadline approaching
Presiding Officer, POSH Administrator
Email, real-time
At thresholds in Section 8.16.1
P-06
Deadline breached
Presiding Officer, POSH Administrator, Managing Partner (configurable)
Email, real-time
At breach and every 3 days until resolved
P-07
IC tenure ending or vacancy
Organisation Admin, POSH Administrator
Email
90, 60 and 30 days; on vacancy
P-08
Report issued
Employer contact, complainant, respondent
Email, in-portal
On issue; generic message
P-09
Break-glass access used
Managing Partner, POSH Administrator
Email, real-time
Immediately
P-10
Annual report due
Organisation Admin
Email
60, 30, 14 and 7 days
P-11
Training assigned or overdue
Employee, Organisation Admin
Email
At assignment and at reminders in LMS-005
P-12
Draft complaint reminder
Complainant
Email or SMS
Day 25 of inactivity; no content
P-13
Extension request opened
Presiding Officer
Real-time
On T04
P-14
Information requested
Complainant
Email, in-portal
On T07
P-15
Conciliation started or ended
Complainant, Presiding Officer
In-portal, email
On T09 to T11
P-16
Notice to respondent dispatched
Respondent
In-portal, email, registered post if policy requires
Within TM-05
P-17
Reply reminder
Respondent
Email
Day 5, 2 and 0 of TM-06
P-18
Reply received
Presiding Officer
Real-time
On receipt
P-19
Interim relief requested or decided
Presiding Officer, complainant, employer contact
In-portal, email
On request and on decision
P-20
Court stay recorded
POSH Administrator, counsel
Email
On T15
P-21
Employer action due
Organisation Admin, employer contact
Email
30, 15, 7, 3 and 1 days
P-22
Employer action overdue
POSH Administrator, Managing Partner
Email
Day 61 and weekly
P-23
Appeal window ending
Complainant, respondent
Email, in-portal
30, 7 and 1 days
P-24
Retaliation report received
Presiding Officer, POSH Administrator
Real-time, email
Immediately; priority 1
P-25
Aftercare check-in due
Intake Counsellor
Task, email
3 days before
P-26
Case closed
Parties, Presiding Officer
In-portal, email
On T10, T25 or T26
P-27
Referral to Local Committee
Complainant
In-portal, email, printed pack
On T03
P-28
Time-barred order
Complainant
In-portal, email
On T06 with guidance
P-29
Recusal or reconstitution
POSH Administrator, Presiding Officer
Real-time, email
On recusal
P-30
Unusual access detected
Presiding Officer, Managing Partner
Email, real-time
Immediately
P-31
Legal hold applied or lifted
POSH Administrator, counsel
Email
On change
P-32
Retention review due
POSH Administrator, counsel
Email
90 and 30 days
P-33
Compliance score dropped by 10 points or more
Organisation Admin, Acorn service manager
Email
Weekly digest
P-34
Service order created or delivered
Organisation Admin
Email
On change
P-35
Subscription renewal or usage limit
Organisation Admin, Finance
Email
60, 30 and 7 days; at 80% usage
P-36
Support ticket updated
Requester
Email
On change; SLA breach to team lead
P-37
Survey open or closing
Invited employees
Email
On open; 3 days and 1 day before close
P-38
Interpreter or accessibility request status
Requester, Intake Counsellor
Email, in-portal
On change
P-39
Confidentiality undertaking due
Case role holders
Email
Before first access; annually
P-40
Security alert (new device, lockout)
User, Super Admin
Email
Immediately


R3.2 Document templates
Code
Template
Stage
Parties
Key merge fields
Signature
DOC-01
Written complaint (generated record)*
Intake
Complainant
Case ID, party details, narrative, declarations
Complainant e-sign
DOC-02
Acknowledgement of complaint*
Intake
Complainant
Case ID, date, next steps
System
DOC-03
Assisted filing record
Intake
Complainant, Intake Counsellor
Counsellor ID, consent, time
Both
DOC-04
Authorisation for representative filing
Intake
Representative
Relationship, proof
Representative
DOC-05
IC constitution order*
Setup
Employer
Members, roles, tenure
Employer e-sign
DOC-06
IC member declaration and confidentiality undertaking*
Setup and case
IC members
Name, case ID, Section 16 text
Member
DOC-07
Conflict-of-interest declaration
Case
IC members
Case ID, relationship questions
Member
DOC-08
Recusal order and reconstitution note
Case
IC
Member, reason
Presiding Officer
DOC-09
Extension of complaint period: request and order*
Triage
Complainant, IC
Dates, reasons, decision
Presiding Officer
DOC-10
Request for further information
Triage
Complainant
Questions, due date
Presiding Officer
DOC-11
Conciliation request, terms and outcome record*
Conciliation
Complainant, respondent
Terms (non-monetary check), consents
Both, Presiding Officer
DOC-12
Notice to respondent with copy of complaint*
Notice
Respondent
Case ID, reply date, documents list, anti-retaliation statement
Presiding Officer
DOC-13
Respondent’s reply format*
Notice
Respondent
Reply, documents, witness list
Respondent
DOC-14
Interim relief request and recommendation*
Any
Complainant, IC, employer
Relief type, dates, reasons
Complainant; Presiding Officer
DOC-15
Notice of commencement of inquiry
Inquiry
Parties
Dates, venue, rights, support person
Presiding Officer
DOC-16
Hearing notice
Inquiry
Parties, witnesses
Date, time, mode, link
Presiding Officer
DOC-17
Summons to witness and request to produce documents*
Inquiry
Witness
Case reference (no names in the subject), date
Presiding Officer
DOC-18
Statement record
Inquiry
Deponent
Statement, language, interpreter
Deponent; Presiding Officer
DOC-19
Hearing minutes
Inquiry
IC
Attendance, summary, next steps
Presiding Officer
DOC-20
Evidence index and integrity statement
Inquiry
IC
Exhibit numbers, hashes, custody
Presiding Officer
DOC-21
Notice before ex parte action*
Inquiry
Absent party
Dates of absence, 15-day notice
Presiding Officer
DOC-22
Inquiry report*
Report
Employer, parties
Structured findings and recommendations
Quorum members
DOC-23
Covering letter to employer for action*
Report
Employer
Recommended action, 60-day date
Presiding Officer
DOC-24
Employer action-taken record
Action
Employer, IC
Action, date, proof
Employer; Presiding Officer
DOC-25
Notice of appeal rights
Report
Parties
90-day window, forum information
Presiding Officer
DOC-26
Closure certificate
Closure
IC
Outcome code, dates
Presiding Officer
DOC-27
Aftercare check-in script
Post-closure
Intake Counsellor
Questions
Counsellor
DOC-28
Local Committee referral pack
Triage
Complainant
Routing reason, contacts
POSH Administrator
DOC-29
Legal hold notice
Any
Internal
Reason, scope
POSH Administrator, counsel
DOC-30
Retention review note and destruction certificate
Post-closure
Internal
Case ID, approvals
Dual approval
DOC-31
Annual report (IC)*
Reporting
District Officer, employer
Counts, workshops, actions
Presiding Officer
DOC-32
Board’s Report disclosure data sheet
Reporting
Employer
Counts, gender composition
Employer
DOC-33
POSH policy*
Policy
Employees
Organisation details, IC, procedure
Employer
DOC-34
Notice of penal consequences and IC details (display)*
Policy
All
Penal text, IC members, contact
Employer
DOC-35
Policy acknowledgement
Policy
Employee
Version, date
Employee
DOC-36
Training certificate
Training
Learner
Course, score, validity, QR
System
DOC-37
Interpreter and support person undertaking
Case
Interpreter, support person
Case ID, Section 16 text
Signatory
DOC-38
Data subject request response
Privacy
Requester
Request, action, date
Grievance officer


R4. Compliance, services and learning
The compliance duty register and score, the service catalogue, plans and course catalogue.
R4.1 Compliance duties
Ref
Duty (source)
Evidence the platform stores
Frequency
Linked service
CMP-01
Constitute an IC at each office or branch with 10 or more employees by written order (Section 4)
IC order document, member list with dates, composition validation result
On change; review every 3 years
PS-03
CMP-02
Presiding Officer is a senior woman employee; external member present; at least half women
Composition validator output
Continuous
PS-03, PS-04
CMP-03
Display the penal consequences of sexual harassment and the IC order conspicuously (Section 19)
Notice version, locations, photo upload, date verified
Annual check
PS-06
CMP-04
Publish and communicate the POSH policy to all employees
Policy version and acknowledgement records
On change; annual refresh
PS-02, PS-14
CMP-05
Organise workshops and awareness programmes at regular intervals for employees (Section 19)
Sessions held, attendance, e-learning completion, certificate register
At least annual
PS-10, PS-11
CMP-06
Orientation programme for IC members (Section 19)
IC training completion and certificates
On appointment; annual refresher
PS-12
CMP-07
Provide facilities to the IC for dealing with a complaint and inquiry (Section 19)
Facilities checklist: private room, secure storage, time, secretariat
Per case; annual check
PS-21
CMP-08
Assist in securing the attendance of the respondent and witnesses (Section 19)
Attendance assistance log on each case
Per case
PS-21
CMP-09
Make information available to the IC (Section 19)
Information requests and responses on the case
Per case
PS-21
CMP-10
Assist the woman to file a criminal complaint if she chooses; act against a third-party perpetrator (Section 19)
Parallel track record
Per case
PS-23
CMP-11
Treat sexual harassment as misconduct under service rules and act within 60 days of the report (Sections 13 and 19)
Action-taken record and proof
Per case
PS-23
CMP-12
Monitor timely submission of IC reports (Section 19)
Dashboard of timers and overdue items
Continuous
PS-35
CMP-13
IC prepares and submits an annual report to the employer and the District Officer (Section 21); employer includes the information in its annual report or informs the District Officer (Section 22)
Generated report, submission proof, acknowledgement number
Annual
PS-30
CMP-14
Companies: disclose complaints received, disposed of and pending beyond 90 days, and gender composition, in the Board’s Report (from 14 July 2025)
Disclosure data sheet and sign-off
Annual (companies)
PS-31
CMP-15
Listed entities: include statistics in BRSR
BRSR extract
Annual (listed)
PS-32
CMP-16
Register ICs on SHe-Box where the government requires or invites it
Registration confirmation and update log
On change
PS-33
CMP-17
Maintain a gender-neutral or inclusive policy track if the organisation chooses it (non-statutory)
Policy and routing setting
Annual review
PS-02
CMP-18
Maintain records and be inspection ready (Sections 23 to 25)
Audit pack export
On demand
PS-34
CMP-19
Third-party and vendor awareness (contracts, visitors)
Vendor briefing records, contract clause check
Annual
PS-15
CMP-20
Run a complaint-handling process that meets every statutory timeline
Timeline adherence statistics
Continuous
PS-21, PS-23
CMP-21
Conduct an annual POSH audit for each establishment with 10 or more employees and submit it as the District Officer directs (NCW advisory, June 2026, as reported; counsel to confirm how far it binds)
Audit questionnaire, evidence, score, report, submission proof
Annual
PS-01, PS-34
CMP-22
Display IC and Local Committee details, member contacts and the online complaint procedure at the workplace and on the employer’s website; keep them current (Section 19; NCW advisory)
Page URL, screenshot, last verified date
Annual check; on change
PS-06
CMP-23
Protect complainants, witnesses and IC members from retaliation, intimidation and adverse transfers, and monitor it
Retaliation report counts, aftercare logs (counts only)
Continuous
PS-27


R4.2 Compliance score domains and weights
Domain
Weight
How it is scored
IC validity
20
Full marks when CMP-01 and CMP-02 pass for every office or branch with 10 or more employees; zero for any branch without a valid IC; partial for expiring tenure or vacancies
Policy
10
Current policy version, acknowledged by 90% or more of employees
Notice display
8
Verified within the last 12 months for every location
Employee awareness
15
Share of employees trained in the last 12 months (full marks at 90% or more)
IC training
10
Every IC member oriented within 60 days of appointment and refreshed within 12 months
Annual report
12
Report generated and submitted by the due date for the previous period
Case handling timeliness
12
Share of cases meeting TM-05, TM-06, TM-08, TM-09 and TM-10; deductions for each overdue case
SHe-Box registration
5
Registered and current where applicable
Board’s Report and BRSR data
4
Data pack prepared for applicable organisations
Documentation and audit readiness
4
Audit pack complete and the annual POSH audit (CMP-21) done; website disclosure (CMP-22) verified
Total
100
Bands: 90 to 100 Green (compliant), 75 to 89 Amber (minor gaps), 50 to 74 Orange (significant gaps), below 50 Red (high risk)


R4.3 Service catalogue
Code
Service
Deliverables
Platform support
Target turnaround
PS-01
POSH gap audit and annual POSH audit
Review of policy, IC, training, notices, reports, website disclosures, SHe-Box registration and case handling; scored report with prioritised gaps and a remediation plan; annual audit report in the format the District Officer directs (see LAW-38)
Audit questionnaire, evidence upload, score and report generator (Section 8.21)
10 working days
PS-02
POSH policy drafting and review
Organisation-specific policy; optional gender-neutral annex; remote and hybrid work annex; third-party and visitor clause
Policy library with versions and acknowledgement
7 working days
PS-03
IC constitution support
Nomination, composition check, appointment order, member declarations, tenure calendar
IC management module and order templates
5 working days
PS-04
External member panel
Nominated external members with conflict checks and per-case fee terms
Panel directory, conflict check, assignment workflow
5 working days
PS-05
Local Committee liaison and referral
Referral pack for small establishments and for complaints against the employer; District Officer and Nodal Officer contact details
Referral pack generator and district directory
2 working days
PS-06
Notice and display pack
Notice of penal consequences and IC details in English, Bengali and Hindi; display tracking
Template library and display tracker
3 working days
PS-10
Employee awareness programme
E-learning with quiz plus optional live session; certificates
LMS and attendance (Section 8.23)
Per schedule
PS-11
Manager and supervisor training
Scenario-based training for people managers; handling of disclosures; anti-retaliation duties
LMS
Per schedule
PS-12
IC member orientation and certification
Orientation on the Act, procedure and natural justice; assessment and certificate (supports the employer’s Section 19 duty)
LMS, assessment, certificate register
Per schedule
PS-13
Induction module for new joiners
Automatic assignment within 30 days of joining
HRMS or CSV roster sync; reminders
Continuous
PS-14
Annual refresher and policy acknowledgement campaign
Campaign with reminders and completion report
Campaign engine and reports
Annual
PS-15
Specialised programmes
Hybrid and remote work, field staff, third-party and vendor briefings
LMS content tracks
Per schedule
PS-20
Complaint intake desk and assisted filing
Phone, email and portal intake; trained Intake Counsellor helps the complainant to file in writing, with consent
Intake Counsellor role, assisted filing mode (POSH-B-003)
Same business day
PS-21
Case secretariat
Scheduling, notices, minutes, document handling and timeline monitoring for the IC (no decision-making)
Case management with secretariat role limited to metadata and documents the IC releases
Continuous
PS-22
Inquiry facilitation by an external expert
External member or legal expert supports the IC in procedure and natural justice
Panel assignment; per-case access
As needed
PS-23
Report drafting support and legal review
Structured drafting of findings and recommendations; legal quality check before issue
Report workspace with review comments (Section 8.18)
5 working days
PS-24
Interim relief and safety planning
Guidance on interim measures; tracking of implementation
Interim relief tracker
2 working days
PS-25
Conciliation facilitation
Process support only; no monetary terms
Conciliation workflow
As needed
PS-26
Appeal and writ support
Legal support in appeals and writ proceedings (outside the platform, tracked inside it)
Appeal tracker and legal hold
As needed
PS-27
Retaliation monitoring and aftercare
Check-ins at 30, 90 and 180 days after closure; escalation of reported retaliation
Aftercare scheduler (Section 8.19)
Scheduled
PS-30
Annual report preparation and filing support
Annual report in the District Officer’s format; submission support
Annual report generator (POSH-A-020)
Annual
PS-31
Board’s Report disclosure data pack
Complaints received, disposed of and pending beyond 90 days; workforce gender composition
Disclosure data sheet
Annual
PS-32
BRSR data extract
Statistics in the format needed by listed entities
Report builder
Annual
PS-33
SHe-Box registration support
Registration and update of IC details on the government portal
Checklist and data export
3 working days
PS-34
Inspection and audit readiness pack
Evidence index of IC orders, notices, training and reports
Audit pack export
2 working days
PS-35
Quarterly compliance health review
Review of score, gaps and actions with the employer
Health score and action tracker
Quarterly
PS-40
Risk assessment and hotspot analysis
Structured assessment of locations, roles and practices; aggregated findings
Risk assessment module (Section 8.24)
10 working days
PS-41
Climate and pulse surveys
Anonymous surveys with aggregated, privacy-safe results
Survey module
Per schedule
PS-42
Culture and communication campaigns
Posters, emails and manager talking points
Communication kit library
Per schedule
PS-43
Policy effectiveness review
Review of complaints trends, timeliness and outcomes (aggregated)
Analytics
Annual


R4.4 Plans
Plan
Intended for
Includes
Usage limits (configurable)
Support
Starter
Small employers with one office
Policy template, IC setup, notices pack, e-learning for employees, annual report data sheet, complaint portal for one IC
Up to 100 employees; 1 branch; 3 cases per year; 5 GB storage
Email, next business day
Professional
Mid-size employers
Starter plus audit, manager and IC training, case secretariat, compliance health score, quarterly review, Board’s Report data pack, climate survey once a year
Up to 1,000 employees; 5 branches; 15 cases per year; 50 GB storage
Email and phone, same business day
Enterprise
Large and multi-state employers
Professional plus external member panel, report drafting support, retaliation monitoring, HRMS sync, BRSR extract, multi-language, dedicated service manager
Custom limits; unlimited branches; custom retention
Priority, 4-hour response for urgent items
Add-ons
Any plan
Extra cases, extra storage, extra training seats, on-site sessions, appeal support, extra languages
Per unit
As the plan


R4.5 Course catalogue
Course
Title
Audience
Duration
Assessment
Certificate validity
TRN-101
Understanding the POSH Act and your rights
All employees
35 minutes
10 questions, pass 80%
12 months
TRN-102
Respectful workplaces: what is and is not acceptable
All employees
25 minutes
8 scenario questions
12 months
TRN-201
Managers: responding to disclosures and preventing retaliation
People managers
45 minutes
12 scenario questions, pass 80%
12 months
TRN-301
IC members: procedure, natural justice and confidentiality
IC members, external members
3 hours (blended)
Assessment and a mock inquiry exercise
12 months
TRN-302
IC Presiding Officer masterclass: running hearings and writing reports
Presiding Officers
3 hours (blended)
Case study assessment
24 months
TRN-401
Remote and hybrid work: online harassment and evidence
All employees, IC
20 minutes
6 questions
12 months
TRN-501
Third parties and vendors: expected conduct
Vendors, contractors, visitors
15 minutes
5 questions
12 months
TRN-601
Induction briefing
New joiners
20 minutes
5 questions
Once
TRN-701
HR and employer duties under the Act
HR, Organisation Admins
60 minutes
12 questions
12 months


R4.6 Acorn as an organisation tenant
Ref
Obligation or control
Detail
ACN-01
Acorn is an organisation tenant
Acorn’s own IC (or, if it has fewer than 10 employees, voluntary IC with Local Committee access), policy, notices, training and annual report are managed in an Acorn tenant. The tenant is separate from every client tenant and from the service desk.
ACN-02
Separation of duties
People who sit on Acorn’s own IC do not hold service-desk or case-secretariat roles for client cases; the IC for a client case never includes an Acorn employee unless Acorn is appointed external member under Section 8.37.
ACN-03
No marketing from case outcomes
No client name, outcome, number of cases or testimonial is published unless counsel has approved it against Bar Council rules and Section 16; any “justice secured” note passes the Anonymised Outcome Publisher (CONF-001).
ACN-04
Staff screening and undertakings
Background checks as permitted by law for staff with case roles; signed confidentiality undertakings (DOC-06, DOC-37) renewed yearly; access removed on the day of exit.
ACN-05
Advocate–client confidentiality
Case content held by Acorn lawyers acting for an employer is also subject to professional confidentiality and privilege rules; counsel confirms how privilege interacts with Section 16, with the IC’s independence and with data portability on offboarding.
ACN-06
Professional indemnity and cyber insurance
Acorn holds cover appropriate to the service; the policy is listed in the contract pack (Section 8.37).
ACN-07
Grievance officer
Acorn names a grievance officer for data principals and for process complaints (SUP-19); contact details appear on the Privacy Policy and in the portals.
ACN-08
Annual external review
An independent review of the POSH service (access logs, timeliness, incident register, template currency) is commissioned once a year, and its summary is shared with clients.


R4.7 Independence rules for external members
Ref
Rule
Enforcement
IND-01
An Acorn lawyer appointed as external member acts independently of Acorn’s commercial relationship and may not advise the employer on the same case or on the outcome.
External-member role excludes counsel and service-manager roles on that case
IND-02
Acorn does not act for the employer and for a party (complainant or respondent) in the same matter, or for both parties.
Conflict register checked at onboarding of each case; hard block on conflicting role assignment
IND-03
External members are paid per sitting at a fee fixed in advance (or as the Rules allow), never by outcome; fees are visible to the Organisation Admin.
Panel fee schedule; invoice line type
IND-04
The IC decides alone. Acorn staff in secretariat or drafting-support roles (PS-21, PS-23) do not vote, sign the report or influence findings, and their access is limited to the documents the IC releases.
Role permissions in Section 8.27; report signature restricted to IC members
IND-05
The annual audit (PS-01) is not performed by the same person who set up the organisation’s IC or wrote its policy within the previous 12 months, unless the client is told and agrees.
Audit assignment check
IND-06
Every Acorn person with a case role declares conflicts per case (DOC-07) and annually; relationships with a party, the employer’s senior management or a competitor of the client must be declared.
Declaration gate before access (US-103)
IND-07
Acorn does not accept instructions from the employer to change findings, delay a report, suppress a complaint or disclose case content.
Escalation to the Managing Partner; audit entry; contract clause


R5. Architecture, data and API
The technical reference for the engineering track: layers, technology choices, scheduled jobs, real-time events, data collections, API groups and endpoints, conventions and configuration.
R5.1 Architecture layers
Layer
Components
Responsibilities
Client
Public site (React), Admin panel (React SPA), POSH portals (React SPA)
UI, form validation, API calls, Razorpay Checkout, Socket.io client
Edge
Nginx reverse proxy (or cloud load balancer), Cloudflare (optional) for CDN, WAF and DDoS protection
TLS termination, compression, caching of static assets, rate limiting, security headers
Application
Node.js and Express API, Socket.io server
Authentication, RBAC, business logic, validation, payment and webhook handling, real-time events
Workers
Job queue and scheduler (BullMQ with Redis, or Agenda on MongoDB for the lean deployment)
Emails, timeline alerts, reminders, report generation, payment reconciliation, retention jobs
Data
MongoDB (replica set or managed Atlas, Mumbai region), object storage (S3-compatible), Redis (optional)
Primary data, files, queues and rate limit counters
Security services
ClamAV antivirus, managed key store or secrets manager, audit log collection
File scanning, encryption keys, immutable audit trail
Observability
Sentry (with data scrubbing), uptime monitor, structured logs, metrics
Errors, availability, performance and alerts


R5.2 Technology choices
Area
Choice
Notes
Front end
React 18 or later with Vite, React Router, TanStack Query, React Hook Form with Zod, a utility CSS framework (Tailwind CSS) or CSS modules
Admin and portals are SPAs
Public site rendering
Server-side rendering or static pre-rendering for SEO (recommended: Next.js, a React framework, for the public site; alternative: Vite with a pre-render plugin)
Decision D-1 in Section 20
Back end
Node.js (current LTS), Express.js, Mongoose ODM, Zod or Joi validation, Helmet, express-rate-limit, cors, cookie-parser, pino logging
REST JSON API, versioned at /api/v1
Real time
Socket.io with JWT handshake authentication and per-user and per-role rooms
Event payloads contain IDs and generic text only
Database
MongoDB 7 or later, Mongoose schemas with validation, indexes and TTL where appropriate
Replica set required for transactions
Authentication
JWT access tokens, rotating refresh tokens in httpOnly cookies, TOTP MFA (otplib), Argon2id password hashing
No tokens in localStorage
Payments
Razorpay Node SDK and Checkout.js
Server-side signature verification and webhooks
Email
Amazon SES (Mumbai) or Brevo or SendGrid with Handlebars or MJML templates
SPF, DKIM, DMARC configured
File storage
S3-compatible bucket with server-side encryption, private by default, pre-signed URLs
Region in India where possible
PDF generation
Puppeteer or PDFKit for receipts, notices and reports; docx library for DOCX reports
Templates stored as versioned files
Rich text
TipTap or Quill on the client; sanitize-html or DOMPurify on the server
Prevents stored XSS
Testing
Jest or Vitest, Supertest, MongoDB Memory Server, Playwright, axe-core, k6, OWASP ZAP
See Section 14
DevOps
GitHub (private repo), GitHub Actions, Docker, PM2 or Docker Compose, Nginx, Let's Encrypt
See Section 15


R5.3 Scheduled jobs
Job
Schedule (IST)
Purpose
Notes
timer-scan
Every 5 minutes
Evaluate running case timers, send threshold alerts (50, 80, 95 percent and breach), apply clock stops
Idempotent; records alertsSent
limitation-watch
Daily 06:00
Flag cases nearing the 3-month and extension limits and drafts about to lapse


compliance-score
Daily 02:00
Recalculate duty status and the 100-point score; create gap tasks and service suggestions
Stores history
duty-reminders
Daily 08:00
Remind organisations about due and overdue duties, committee tenure end, training expiry, annual report
Content-free
annual-report-window
Monthly
Open the annual report workflow in the configured period; remind


payment-reconcile
Daily 03:00
Compare gateway records with payments; raise mismatches
Alert on any mismatch
webhook-retry
Every 10 minutes
Re-process failed webhook events
Max 10 attempts then alert
email-retry
Continuous queue
Send and retry notifications with back-off
Dead-letter queue monitored
draft-expiry
Daily 01:00
Delete expired complaint drafts and send a one-time reminder before expiry
BR-026
link-and-otp-purge
Hourly
Remove expired links and codes


retention-scan
Daily 01:30
Create retention reviews for eligible cases
Never deletes
audit-chain-verify
Daily 04:00
Verify the hash chain
Break is SEV-1
file-scan-retry
Every 15 minutes
Retry scan errors, quarantine after 3 failures


sitemap-and-cache
On publish and daily
Regenerate sitemap; revalidate pages


scheduled-publish
Every minute
Publish scheduled posts and answers
BR-005
sla-scan
Every 5 minutes
Support SLA timers and escalations
BR-057
rule-calendar-check
Weekly
Warn if holiday calendars for next year are missing; show directory entries unverified for 180 days
BR-060, BR-068
aftercare-scan
Daily 09:00
Create 30, 90 and 180 day check-in tasks
TM-19
usage-meter
Daily
Update subscription usage; warn at 80 and 100 percent


backup-verify
Daily
Check last backup success and age
Alert if older than 26 hours
cert-and-key-expiry
Daily
Alert 30 days before certificates, API keys or keys expire




R5.4 Real-time events
Event
Room
Payload
Trigger
request.created
requests
{ id, reference, category, createdAt }
New service request (alert target under 5 seconds, BR-003)
request.updated
requests
{ id, status, assignedTo }
Status or owner changes
question.created
qa
{ id, reference }
New question
payment.updated
payments
{ id, status }
Webhook processed
script.pending
scripts
{ id, name }
Script awaits approval
notification.new
user:{id}
{ id, type, title, severity }
Any in-app notification
case.state
case:{caseId}
{ caseId, state, stateSince }
Transition executed
case.timer
case:{caseId}
{ caseId, code, status, legalDate }
Timer thresholds, pause or breach
case.document
case:{caseId}
{ caseId, documentId, kind }
Document added or released
org.compliance
org:{orgId}
{ score, band, changedDuties[] }
Score recalculated
org.case-counts
org:{orgId}
{ counts by state and timer status }
Case metadata changes
ticket.updated
ticket:{id}
{ id, status }
Support activity
presence
case:{caseId}
{ role codes only }
Optional for hearings; no names


R5.5 Real-time rules
Real-time rule
Detail
Delivery
At-least-once to connected clients; reconnect triggers a catch-up call (GET with sinceId) so no event is lost.
Scale
Redis adapter for Socket.io from the first release so more than one API instance can run.
Authorisation
Rooms are re-evaluated on role change; revoked users are removed from rooms immediately.
Fallback
Long polling is allowed; if both fail, the interface polls every 30 seconds.


R5.6 Data collections
Collection
Key fields
Notes and indexes
users
name, email (unique), passwordHash, roles, mfaEnabled, mfaSecret (encrypted), status, lastLoginAt, failedAttempts, lockUntil, organisationId (POSH users)
Unique index on email; index on role and status
sessions
userId, refreshTokenHash, family, device, ip, expiresAt, revokedAt
TTL index on expiresAt
serviceRequests
reference, name, email, mobile, clientType, organisation, city, category, subject, description, attachments, source (UTM), status, assignedTo, notes, followUpAt, consent
Index on status, createdAt, reference; text index on subject
requestActivities
requestId, actorId, action, from, to, message, createdAt
Timeline of changes and replies
questions
reference, askerName, email, category, text, visibility choice, status, answer, answeredBy, publishedAt, faqOrder, pinned
Text index on text and answer
blogPosts
title, slug (unique), excerpt, body (sanitised HTML), coverImage, categoryIds, tagIds, authorId, status, publishAt, seo {title, description, canonical, noindex}, revisions
Index on status, publishAt, slug
pages
key, title, sections[], seo, status, version
Homepage and landing page content blocks
mediaAssets
filename, url, mime, size, alt, uploadedBy
Image library
scripts
name, description, placement, scope, category, code, enabled, version, history[], createdBy, approvedBy
Audit logged on every change
redirects
from, to, type, active
Unique on from
services (catalogue)
name, description, amount, gstRate, active, category
Payment catalogue
payments
orderId, paymentId, receiptNo, amount, currency, status, method, payer {name, email, mobile}, itemRef, gstBreakup, razorpayEvents[], refunds[], createdAt
Unique on orderId and paymentId; index on status, createdAt
webhookEvents
eventId (unique), type, payloadHash, processedAt, result
Idempotency store
organisations
name, type, branches[], headcount, planTier, contacts[], settings {timelines, retention, language}, status
Tenant root for POSH
icMembers
organisationId, branchId, userId, role, gender, isExternal, tenureStart, tenureEnd, status, undertakingSignedAt
Composition validation
poshCases
caseId, organisationId, branchId, stage, complainantRef (encrypted), respondentRef (encrypted), incidentDates, narrative (encrypted), reliefSought, assignedIcIds, timers {limitation, replyDue, inquiryDue, reportDue, actionDue, appealDue}, pauses[], outcome, closedAt, retentionUntil
Composite index on organisationId, stage; never text-indexed
caseEvents
caseId, type, actorId, summary (generic), createdAt
Case diary (details encrypted in related records)
caseDocuments
caseId, uploaderId, type, storageKey, sha256, size, mime, visibility, releasedTo[], scanStatus
Evidence vault; chain of custody
hearings
caseId, scheduledAt, mode, link, participants, minutes (encrypted), attendance


notices
caseId, templateId, issuedBy, issuedTo, deliveredAt, readAt, documentKey


conciliations
caseId, requestedAt, terms (encrypted), consents, outcome, forwardedAt


caseReports
caseId, findings (encrypted), recommendations, signedBy, issuedAt, deliveredTo[]
Locked after issue
trainingModules
organisationId (optional), title, content, quiz, passMark, version
Advanced tier
trainingRecords
organisationId, userRef, moduleId, score, completedAt, certificateKey
Advanced tier
policyDocs
organisationId, version, effectiveFrom, fileKey
Policy library
policyAcks
organisationId, employeeRef, policyId, acknowledgedAt


annualReports
organisationId, period, stats, generatedAt, fileKeys
Aggregates only
notifications
userId, type, title, body (generic), link, readAt
TTL after 90 days
auditLogs
actorId, role, action, entity, entityId, before (redacted), after (redacted), ip, userAgent, at
Append-only; no update or delete APIs; separate collection or store with restricted credentials
settings
key, value, updatedBy
Site and security settings (no secrets)


R5.7 Data conventions
Topic
Rule
Names
Collections are plural lowerCamelCase (serviceRequests). Fields are lowerCamelCase. Enumeration values are lowercase snake_case in the database and shown in plain language by the interface, except case states (DRAFT, SUBMITTED and so on) and transition codes (T01 to T30), which are stored exactly as written in Section 8.15.
Types used below
s string; n number; i integer; pr integer amount in paise; b boolean; d date (UTC); oid ObjectId reference; a[] array; o object; e:Name enumeration from Section 24.5; mixed free structure (avoided).
Flags
* required; U unique; E encrypted at the application layer (Section 26.4); P personal data; X never written to logs or error reports; T tenant-scoped (carries orgId and is queried only through the tenant data-access layer); H hashed (one-way); BI blind index for equality search of an encrypted value.
Common fields
Every collection has _id (oid), createdAt (d), updatedAt (d) and version (i, optimistic concurrency). Collections that can be removed also have isDeleted (b), deletedAt (d), deletedBy (oid). Tenant-scoped collections have orgId (oid) and, for case data, caseId (oid). Case data also carries ruleSetVersion (s) where a legal rule applied.
Time
All dates are stored in UTC. Calendar-day boundaries and working-day logic use Asia/Kolkata. Dates without a time (for example an incident date) are stored as an ISO date string YYYY-MM-DD in a string field to avoid time-zone shifts.
Money
Stored as integer paise with a currency field (INR). Tax rates are stored as basis points (1800 = 18.00%).
Files
Files live in object storage. Documents reference a files record (key, size, mime, sha256, scanStatus, encrypted). The database never holds file bytes.
Soft delete
Soft delete applies to users, content, requests, questions, payments (never physically removed), organisations and POSH records (removed only by the retention engine in Section 26.10).
Concurrency
Updates send the expected version in the If-Match header; a mismatch returns 409 CONFLICT_VERSION.
Transactions
Multi-document changes (payment status with receipt number, case transition with timers and events, retention execution) use MongoDB transactions on a replica set.
Search
Public content uses MongoDB text indexes. POSH case content is never text-indexed (BR-046); lists use metadata fields and blind indexes only.


R5.8 API conventions
Topic
Rule
Base and versioning
Base path /api/v1. A breaking change creates /api/v2; old versions are kept for 6 months after notice.
Format
JSON in UTF-8. Dates are ISO 8601 UTC strings; date-only values are YYYY-MM-DD. Money is integer paise with a currency code.
Authentication
Staff and portal users: short-lived access token in an HttpOnly, Secure, SameSite=Strict cookie plus a rotating refresh token cookie; state-changing calls also send the X-CSRF-Token header. Webhooks use signature headers. Machine integrations use scoped API keys in the Authorization header (Bearer).
Success envelope
{ "data": ..., "meta": { "requestId": "...", "page": 1, "pageSize": 20, "total": 134 } }. The meta paging fields appear on list responses only.
Error envelope
{ "error": { "code": "VALIDATION_FAILED", "message": "Readable, content-safe message", "details": [ { "field": "email", "rule": "format" } ], "requestId": "..." } }. Messages never contain complaint content or personal data.
Paging, sorting, filtering
page and pageSize (default 20, maximum 100); sort=field or sort=-field; filters as query parameters named after the field; q for text search on permitted collections. Cursor paging (cursor, limit) is used for logs and notifications.
Idempotency
All POST calls that create money or cases accept an Idempotency-Key header (UUID). The same key within 24 hours returns the original result. Payment order creation and webhook handling are idempotent by design.
Concurrency
PATCH and PUT require If-Match with the record version; a mismatch returns 409 CONFLICT_VERSION.
Rate limits
Per Section 26.5; responses carry RateLimit-Limit, RateLimit-Remaining and Retry-After headers; exceeded limits return 429 RATE_LIMITED.
Request ID
Every response includes X-Request-Id; clients quote it in support tickets.
Language
Accept-Language en, bn or hi selects message language where translations exist; data is returned in its stored language.
Caching
Public content endpoints send ETag and Cache-Control; authenticated and POSH endpoints send Cache-Control: no-store.
File upload
Two steps: POST /files/upload-url returns a short-lived signed URL and file ID; the client uploads directly; POST /files/{id}/complete triggers the type check, size check and malware scan. Files are usable only when scanStatus is clean.
Content negotiation
PDF and CSV exports use /export endpoints with an Accept header or a format parameter; they return a file ID that is downloaded through a signed URL.
CORS
Only the public site, admin and portal origins from configuration.
Deprecation
Deprecated endpoints send the Deprecation and Sunset headers.


R5.9 API groups
Group
Method and path (examples)
Access
Auth
POST /auth/login, /auth/mfa/verify, /auth/refresh, /auth/logout, /auth/forgot, /auth/reset
Public (rate limited)
Public content
GET /public/pages/:key, /public/posts, /public/posts/:slug, /public/faqs, /public/services, /public/settings
Public (cached)
Service requests
POST /requests (public); GET /admin/requests, GET /admin/requests/:id, PATCH /admin/requests/:id, POST /admin/requests/:id/reply, GET /admin/requests/export
Public create; admin read and write
Q&A
POST /questions (public); GET /admin/questions, PATCH /admin/questions/:id, POST /admin/questions/:id/answer, POST /admin/questions/:id/publish
Public create; admin
Blog and pages
CRUD /admin/posts, /admin/categories, /admin/tags, /admin/pages, /admin/media; POST /admin/posts/:id/publish
Content roles
Scripts
CRUD /admin/scripts, POST /admin/scripts/:id/toggle, POST /admin/scripts/killswitch; GET /public/scripts (consent-aware)
Marketing and Super Admin
Payments
POST /payments/orders, POST /payments/verify, POST /payments/webhook, GET /payments/:id/receipt; GET /admin/payments, POST /admin/payments/:id/refund, GET /admin/payments/export
Public create; webhook with signature; admin and finance
Users
CRUD /admin/users, POST /admin/users/:id/roles, POST /admin/users/:id/force-logout
Super Admin
Notifications
GET /notifications, PATCH /notifications/:id/read; Socket.io namespace /rt
Authenticated
Reports
GET /admin/reports/requests, /admin/reports/payments, /admin/reports/qna, /admin/reports/blog
Admin, Finance
Audit
GET /admin/audit
Super Admin
POSH organisations
CRUD /posh/organisations, /posh/organisations/:id/ic-members, /posh/organisations/:id/policies
POSH Admin, Organisation Admin
POSH complaints
POST /posh/complaints; GET /posh/complaints/mine; PATCH /posh/complaints/:id/withdraw
Complainant
POSH cases
GET /posh/cases, GET /posh/cases/:id, POST /posh/cases/:id/events, /documents, /hearings, /notices, /conciliation, /report, /close
Assigned IC users
POSH respondent
GET /posh/respondent/cases/:id/notices, POST /posh/respondent/cases/:id/reply
Respondent
POSH reports
GET /posh/organisations/:id/annual-report?period=, GET /posh/analytics
POSH Admin, Organisation Admin (aggregates)
POSH training
CRUD /posh/training/modules, POST /posh/training/:id/attempt, GET /posh/training/records
POSH Admin, Organisation Admin, employees
Health
GET /health, /health/ready
Monitoring (restricted)


R5.10 Endpoints: authentication and users
Method and path
Purpose
Permission or access
Notes
POST /auth/login
Email and password sign in
Public, rate limited
Returns MFA_REQUIRED when enrolled; lockout after 5 failures
POST /auth/mfa/verify
Verify TOTP or backup code
Pending session


POST /auth/refresh
Rotate refresh token
Refresh cookie
Reuse of an old token revokes the family
POST /auth/logout
End session
Authenticated
Optional all=true
POST /auth/forgot, POST /auth/reset
Password reset
Public, rate limited
Generic response; token single use
POST /auth/accept-invite
Set password from invitation
Token


POST /auth/otp/request, POST /auth/otp/verify
One-time code for complainants and learners
Public, strict limits
purpose in body; no account enumeration
GET /me, PATCH /me
Own profile and language
Authenticated


POST /me/mfa/enrol, POST /me/mfa/confirm, DELETE /me/mfa
MFA management
Authenticated
Re-authentication required to remove
GET /me/sessions, DELETE /me/sessions/{id}
Session list and revoke
Authenticated


GET /users, POST /users, PATCH /users/{id}, POST /users/{id}/deactivate
User administration
users.manage
POSH roles need orgId
GET /roles, GET /permissions
Role and permission catalogue
users.manage
Read only


R5.11 Endpoints: content and SEO
Method and path
Purpose
Permission or access
Notes
GET /public/pages/{key}
Page sections and SEO
Public
Cached with ETag
GET /public/menus
Navigation
Public


GET /public/posts, GET /public/posts/{slug}
Blog list and article
Public
Filters category, tag, q; only published
GET /public/qa, GET /public/qa/{slug}
Published questions
Public


POST /public/qa
Ask a question
Public, CAPTCHA, limited
Creates pending question and sends receipt
POST /public/requests
Service request
Public, CAPTCHA, limited
Idempotency-Key; dedupe window 2 minutes; triggers real-time alert and email (BR-001 to BR-003)
GET /public/requests/{reference}/status
Requester status check
Public with email OTP
Returns stage only
GET /public/services, GET /public/services/{code}
Service catalogue
Public
Plans and prices without internal notes
GET /public/scripts
Enabled scripts by placement and path
Public
Respects consent categories; response contains no secrets
GET /public/settings
Contact details, social links, hours, notice banner
Public
Allow-listed keys only
GET /public/sitemap, GET /robots.txt
Crawl files
Public
Generated
POST /public/consent
Record cookie consent choices
Public
Category list; stored with notice version
POST /public/verify-document
Verify certificate or document code
Public, limited
Returns validity and issue date only
GET /public/directory
Helplines and agencies
Public
Shows verifiedAt; entries needing verification are labelled
GET /public/risk-check, POST /public/risk-check
Free POSH readiness quiz and result
Public
No personal data stored without consent


R5.12 Endpoints: pages and homepage
Method and path
Purpose
Permission or access
Notes
GET/POST /admin/pages, PATCH /admin/pages/{id}, POST /admin/pages/{id}/publish, POST /admin/pages/{id}/restore
Pages and homepage sections
content.edit, content.publish
Versioned; preview token
GET/POST/PATCH/DELETE /admin/posts, POST /admin/posts/{id}/schedule, /publish, /unpublish
Blog administration
blog.write, blog.publish
SEO check blocks publish (BR-006)
GET/POST/PATCH /admin/categories, /admin/tags
Taxonomy
blog.write


POST /admin/media, GET /admin/media, DELETE /admin/media/{id}
Media library
media.manage
Alt text required
GET /admin/requests, GET /admin/requests/{id}, PATCH /admin/requests/{id}, POST /admin/requests/{id}/notes, /reply, /assign
Request inbox and handling
requests.read, requests.write
Real-time updates over Socket.io
POST /admin/requests/export
CSV export
requests.export
Audited
GET/PATCH /admin/questions, POST /admin/questions/{id}/answer, /publish, /anonymise, /decline
Q&A moderation
qa.moderate
BR-004
GET/POST/PATCH /admin/scripts, POST /admin/scripts/{id}/submit, /approve, /enable, /disable, GET /admin/scripts/{id}/versions
Script control
scripts.write, scripts.approve
Two-person approval for inline code (BR-007 and BR-008)
GET/PUT /admin/settings/{key}
Settings
settings.manage
Secrets rejected
GET/PUT /admin/feature-flags/{key}
Flags
settings.manage


GET /admin/audit-logs
Audit search
audit.read
Cursor paging; filters actor, action, entity, date
GET /admin/dashboard
Counts and trends
dashboard.read
Aggregates only


R5.13 Endpoints: payments
Method and path
Purpose
Permission or access
Notes
GET /public/fees
Fee items open for payment
Public
Amount from the catalogue; clients never send amounts
POST /payments/orders
Create order
Public or portal, limited
Body: itemId, payer; server creates the Razorpay order and returns orderId and key id
POST /payments/verify
Verify checkout signature
Same session
HMAC check; status becomes authorised; the webhook confirms paid (BR-010)
POST /webhooks/razorpay
Gateway events
Signature header
Raw body verified; idempotent by event ID; events payment.captured, payment.failed, refund.processed, order.paid
GET /payments/{orderId}/receipt
Download receipt
Payer link or payments.read
PDF with receipt number
GET /admin/payments, GET /admin/payments/{id}
Payment list and detail
payments.read
Masked payer details for non-finance roles
POST /admin/payments/{id}/refund
Refund full or part
payments.refund
Reason required; second approval above the threshold (BR-013)
POST /admin/payment-links, GET /admin/payment-links
Payment links
payments.write
Expiry required
POST /admin/payments/reconcile
Run reconciliation
payments.reconcile
Compares gateway records with the database daily; the job calls the same service
GET/POST/PATCH /admin/catalogue
Fee items
catalogue.manage
Price history kept
GET /org/billing, GET /org/invoices, POST /org/invoices/{id}/pay
Organisation billing
org_admin
Plan, usage and invoices
GET /admin/invoices, POST /admin/invoices
Invoice administration
payments.write
GST fields


R5.14 Endpoints: organisations
Method and path
Purpose
Permission or access
Notes
GET/POST /admin/orgs, GET/PATCH /admin/orgs/{id}
Organisation management by Acorn
posh.orgs.manage
Onboarding wizard steps are PATCH calls
GET /org/profile, PATCH /org/profile
Own organisation settings
org_admin
Weekly off, languages, retention years
GET/POST/PATCH /org/branches
Branches
org_admin
Triggers committee validation
GET/POST/PATCH /org/committees, POST /org/committees/{id}/members, PATCH /org/committees/{id}/members/{mid}, POST /org/committees/{id}/validate
Internal Committee
org_admin
Returns validation issues (BR-019 to BR-022)
GET /org/committees/{id}/order
Constitution order document
org_admin
Generated from template
GET/POST /org/employees/import, GET /org/employees
Roster import and list
org_admin
CSV validation report
GET/POST /org/policies, POST /org/policies/{id}/publish
Policy versions
org_admin


POST /org/policies/{id}/ack
Acknowledge policy
Learner link
Records employeeRef
GET/POST /org/notices
Notice display tracker
org_admin
Photo evidence optional
GET /org/compliance, GET /org/compliance/duties, PATCH /org/compliance/duties/{code}
Compliance dashboard and duty updates
org_admin
Score and reasons returned
GET /org/compliance/score-history
Trend
org_admin


GET/POST /org/reports/annual, POST /org/reports/annual/{id}/generate, /submit
Annual report workflow
org_admin, ic_presiding
Counts computed from case metadata
GET /org/dashboard
Anonymous case counts and timers by branch
org_admin
Metadata only (BR-047)
GET /org/audits, POST /org/audits
Annual POSH audit
org_admin
PS-01
GET /org/orders, POST /org/orders
Service orders
org_admin


GET /org/tickets, POST /org/tickets
Help desk
org_admin, ic_presiding
Case content scan on submit


R5.15 Endpoints: complaints and cases
Method and path
Purpose
Permission or access
Notes
POST /posh/intake/drafts, PATCH /posh/intake/drafts/{id}
Create and autosave a complaint draft
Verified complainant or assisted session
Draft expires after 30 days of inactivity (BR-026)
POST /posh/intake/drafts/{id}/submit
Submit complaint
Same
Creates case in SUBMITTED, runs routing RT-01 to RT-21, computes limitation, starts TM timers, issues receipt; idempotent
POST /posh/intake/assisted
Counsellor-assisted intake
intake_counsellor
Records filedBy=assisted
POST /posh/concerns
Raise a non-statutory concern
Public or portal
No timers
GET /posh/cases
Case list (metadata)
Case roles
Masked names; filters state, branch, timer status
GET /posh/cases/{id}
Case summary
Case roles
Fields filtered by role matrix (Section 8.28)
GET /posh/cases/{id}/complaint
Read the complaint
Presiding, IC members, complainant
Audited view event
POST /posh/cases/{id}/supplements
Add to the complaint
Complainant, counsellor
New record, original unchanged
POST /posh/cases/{id}/transitions
Execute a transition
By transition rules
Body: code (T01 to T30), reason, parameters; returns the new state and timers; STATE_INVALID if not allowed
GET /posh/cases/{id}/transitions/available
Allowed actions for the caller
Case roles
Drives interface buttons
GET /posh/cases/{id}/timers, POST /posh/cases/{id}/timers/{code}/pause, /resume
Timer view and clock stop
Presiding officer
Ground and order document required (Section 8.16.2)
GET /posh/cases/{id}/events
Diary
Case roles
Content-safe
POST /posh/cases/{id}/roles, DELETE /posh/cases/{id}/roles/{rid}
Assign and revoke case roles
posh_admin or presiding
Conflict declaration required first
POST /posh/cases/{id}/conflicts/declare
Declare conflict
Assigned user
Triggers reassignment
GET /posh/cases/{id}/conflicts/matches
Name-match results
Presiding, posh_admin
Blind index only
POST /posh/cases/{id}/conciliation, PATCH /posh/cases/{id}/conciliation
Conciliation record
Presiding
Monetary-basis block (BR-032)
POST /posh/cases/{id}/notices
Issue notice from template
Presiding, secretariat
Returns document with verification code
POST /posh/cases/{id}/replies
Respondent reply
Respondent link
Due date shown; late reply flagged not rejected
GET/POST /posh/cases/{id}/hearings, PATCH /posh/cases/{id}/hearings/{hid}
Hearings
Presiding, secretariat
Interpreter and support person fields
POST /posh/cases/{id}/statements, POST /posh/cases/{id}/statements/{sid}/sign
Statements
Presiding, deponent
Locks on signature
GET/POST /posh/cases/{id}/documents, GET /posh/cases/{id}/documents/{did}/download
Exhibits
Case roles by release rules
Custody event recorded
POST /posh/cases/{id}/documents/{did}/release
Release a document to a party
Presiding
Redaction check first
POST /posh/cases/{id}/interim
Interim relief request and decision
Complainant, presiding
TM-12
GET/PUT /posh/cases/{id}/report, POST /posh/cases/{id}/report/lint, /sign, /issue
Inquiry report
Presiding, IC members
Quorum and signature checks (BR-040, BR-041)
GET/PUT /posh/cases/{id}/compensation
Compensation worksheet
Presiding
Section 15 factors
POST /posh/cases/{id}/employer-action, PATCH /posh/cases/{id}/employer-action/{aid}
Employer action tracking
org_admin, presiding
Overdue alerts (TM-10)
POST /posh/cases/{id}/appeals
Record appeal or parallel proceeding
posh_admin, counsel
Starts legal hold
POST /posh/cases/{id}/legal-hold, DELETE /posh/cases/{id}/legal-hold
Place or lift hold
legal_admin with approval
BR-050
POST /posh/cases/{id}/break-glass
Request emergency access
posh_admin
Needs Managing Partner approval; two hour maximum
POST /posh/cases/{id}/retaliation
Report retaliation
Complainant, witness
Creates linked priority case
GET /posh/cases/{id}/export
Export case file
Presiding, counsel
Purpose required; audited (BR-045)
GET /posh/portal/status
Complainant or respondent status view
Authenticated party
Stage, next date and rights; no other party details


R5.16 Endpoints: rules engine administration
Method and path
Purpose
Permission or access
Notes
GET/POST /legal/rule-sets, POST /legal/rule-sets/{v}/run-scenarios, /approve, /activate
Rules engine administration
legal_admin, second approver
BR-059; scenario run must pass
GET/POST/PATCH /legal/templates, POST /legal/templates/{code}/approve
Template management
legal_admin
Lint for merge fields
GET/POST/PATCH /legal/calendars
Holiday calendars
legal_admin
BR-068
GET/POST/PATCH /legal/directory
Helpline and district directory
legal_admin
verifiedAt required (BR-060)
GET/POST/PATCH /legal/watch
Statutory watch list
legal_admin


GET /legal/dashboard
Rule status, items due for review
legal_admin


GET /learn/courses, GET /learn/assignments, POST /learn/assignments/{id}/start, /progress, /submit
Learner flow
Learner link or account
Quiz answers stored encrypted
GET /learn/certificates/{code}
Certificate download
Owner


GET/POST /org/training/assignments, GET /org/training/report
Assign and report training
org_admin
Completion data only for the organisation
POST /org/surveys, GET /org/surveys/{id}/results, POST /survey/{token}/submit
Surveys
org_admin; token holder
Minimum group size (BR-053)
GET/POST /admin/tickets, PATCH /admin/tickets/{id}, POST /admin/tickets/{id}/messages
Support desk
support.manage
SLA fields
GET /admin/kb, POST /admin/kb
Knowledge base
support.manage


GET/POST /admin/retention-reviews, POST /admin/retention-reviews/{id}/approve, /execute
Retention workflow
legal_admin plus second approver
Hold check; certificate generated
GET/POST /admin/data-requests, PATCH /admin/data-requests/{id}
Rights requests
privacy.manage
Due dates tracked
GET /admin/services, POST /admin/services, GET /admin/subscriptions, PATCH /admin/subscriptions/{id}
Services and subscriptions
service_manager


GET/POST /admin/orders, PATCH /admin/orders/{id}, POST /admin/orders/{id}/tasks
Service delivery
service_manager
Org sees the timeline
GET /admin/posh/dashboard
Acorn-wide anonymised metrics
posh_admin
No case content


R5.17 Configuration variables
Variable
Type
Secret
Meaning
NODE_ENV
enum
No
development, test, staging or production
APP_BASE_URL, ADMIN_BASE_URL, PORTAL_BASE_URL
url
No
Public origins used for links and CORS
MONGODB_URI
string
Yes
Connection string with TLS and replica set
REDIS_URL
string
Yes
Connection string
JWT_PRIVATE_KEY, JWT_PUBLIC_KEY
PEM
Yes
ES256 signing keys; key ID for rotation
COOKIE_DOMAIN, CSRF_SECRET
string
Yes for secret
Cookie scope and token secret
KMS_KEY_ID, KMS_REGION
string
No
Master key reference
BLIND_INDEX_MASTER
bytes
Yes
Used to derive tenant blind-index keys
RAZORPAY_KEY_ID
string
No
Public key for checkout
RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET
string
Yes
Server-side signing and webhook verification
EMAIL_PROVIDER_KEY, EMAIL_FROM, EMAIL_FROM_POSH
string
Yes for key
Sending settings
SMS_PROVIDER_KEY, SMS_SENDER_ID, DLT_ENTITY_ID
string
Yes for key
SMS settings
STORAGE_BUCKET_PUBLIC, STORAGE_BUCKET_CASES, STORAGE_REGION
string
No
Buckets
SCANNER_URL, SCANNER_KEY
string
Yes for key
Malware scanning service
CAPTCHA_SITE_KEY, CAPTCHA_SECRET
string
Yes for secret
Bot protection
SENTRY_DSN (or equivalent), LOG_LEVEL
string
Partial
Error reporting and logging
RATE_LIMIT_PROFILE
enum
No
default or strict
TZ
string
No
Asia/Kolkata for display; storage stays UTC
FEATURE_FLAGS_SOURCE
enum
No
database or environment
ALERT_WEBHOOK_URL
url
Yes
On-call notification target


R6. Remedies, sectors, party rights and legal sources
Inputs for the Phase 7 prompts (remedies and options, sector overlays, party charters) and the legal source register. Counsel must verify all legal content before use.
R6.1 Remedies and routes (REM)
Code
Route and forum
Who may use it
What it can do
Time and conditions (summary)
Platform support
REM-01
Internal Committee inquiry (Act, Sections 4, 9 to 13)
Woman who works for, or visits, an establishment with 10 or more employees
Conciliation on request; inquiry; interim relief; findings; recommended action and compensation
Complaint within three months of the last incident (extendable by three months); inquiry within 90 days
Full case workflow (Sections 8.14 to 8.20)
REM-02
Local Committee (Act, Sections 5 to 7)
Women in establishments with fewer than 10 employees, complaints against the employer, domestic and unorganised workers
Same powers as the Internal Committee at district level
Nodal Officer forwards within 7 days (Supreme Court directions); same limitation and inquiry periods
Referral pack, district directory, status note (RT-02 to RT-04)
REM-03
SHe-Box portal (central government)
Women in central and state government and private workplaces
Registers a complaint and routes it to the competent committee; monitors status
Statute does not make it exclusive; registration of ICs is required in some districts
Registration helper, routed-complaint intake, response-time tracking (LAW-40)
REM-04
Police complaint and criminal law (Bharatiya Nyaya Sanhita, Chapter V on offences against women, Sections 74 to 79, including sexual harassment, voyeurism, stalking and insulting modesty; other provisions for assault and intimidation)
The woman, with the employer’s duty to assist if she chooses (Act, Section 19)
Registration of an FIR or complaint, investigation, prosecution
No fixed period for most of these offences; evidence is best preserved early; the IC inquiry is not delayed by the criminal case unless a court orders
Criminal-track record, police-support pack, legal hold option (RT-14, EXT-04)
REM-05
Employer’s disciplinary proceedings under service rules
Employer, on the IC’s recommendation
Warning, withholding of promotion or increments, termination and other measures in the service rules
Employer acts within 60 days of the report (Section 13(4))
Action-taken tracker (RPT-003, US-152)
REM-06
Appeal against IC or LC recommendations (Act, Section 18)
Either party, or the employer, as the service rules allow
Review of recommendations or non-implementation by the court or tribunal
Within 90 days of the recommendations
Appeal tracker with forum field (POST-01)
REM-07
Writ petition to a High Court (Article 226) or Supreme Court (Article 32)
Parties, mainly against state action, public employers or procedural failures
Quashing of orders, directions to constitute committees, relief against arbitrary action
Prompt filing expected; counsel to advise on availability against private employers
Court stay handling (T15, T16); legal hold
REM-08
Civil suit, injunction, damages and defamation claims
Either party
Compensation, restraining orders, claims arising from false statements or breach of confidentiality (Sections 16 and 17)
Limitation law applies; counsel to advise
Legal hold; export for counsel (BR-045)
REM-09
Industrial dispute and labour forums
Workers who allege retaliation or unfair termination
Reinstatement, back wages, conciliation
Forum and time limit depend on the labour law applicable to the worker; counsel to advise
Retaliation report and linked case (POST-04); counsel flag
REM-10
National Commission for Women and State Commission for Women (West Bengal)
Any woman or on its own motion
Complaint intake, calling for reports, recommending action
No fixed period; not a substitute for the statutory committee
Directory entries and complaint-portal links (SUP-02)
REM-11
Legal aid: NALSA helpline 15100, State and District Legal Services Authorities, legal service clinics and paralegal volunteers
Women (free legal services are available to women as a category under the Legal Services Authorities Act, counsel to confirm)
Advice, a lawyer, help to approach the Local Committee, the IC or the police
Available throughout
Directory with district legal services authority for Kolkata and other West Bengal districts (verify entries)
REM-12
Women’s helpline 181, emergency 112, One Stop Centres (Sakhi)
Any woman in distress
Immediate response, counselling, shelter, medical and legal assistance
Available throughout; verify current numbers in West Bengal
Directory; click-to-call on mobile; always visible “Talk to someone” link
REM-13
Mental health support: Tele-MANAS 14416, the organisation’s employee assistance programme, approved counsellor panel
Complainant, respondent, witness, IC member
Counselling and referral
Available throughout
SUP-07 counselling referral; no clinical data stored
REM-14
Cyber harassment reporting: National Cyber Crime Reporting Portal; platform and intermediary grievance officers
Anyone harassed online
Complaint, content takedown requests
Preserve evidence quickly (headers, screenshots, URLs)
Evidence guidance (RT-10); takedown request template (counsel review)
REM-15
District Officer and appropriate government (Act, Sections 20 to 26)
Any person aware of non-compliance; the government on its own
Inspection, calling for information, penalties for non-compliance
Fine up to ₹50,000, doubled for repeat and possible licence consequences (Section 26)
Compliance score; audit pack; inspection readiness (CMP-18)
REM-16
Board, Audit Committee and whistle-blower channel (companies)
Directors, employees
Governance oversight, disclosure in the Board’s Report
Annual disclosure of complaints received, disposed of and pending beyond 90 days (LAW-27)
Board’s Report data pack (PS-31)
REM-17
Medical examination and treatment
The woman, where physical harm or assault is alleged
Care and evidence of injury
As early as possible
Directory of services; guidance page; no medical data stored


R6.2 Sector overlays (SCT)
Code
Sector or workplace
Legal and regulatory touchpoints (summary)
Platform handling
SCT-01
Schools, colleges and universities
Employees are covered by the Act. For higher education the University Grants Commission Regulations, 2015 on prevention, prohibition and redressal of sexual harassment of women employees and students require an Internal Complaints Committee and student-facing procedures. The Act’s definition of aggrieved woman covers a woman “whether employed or not” at a workplace. The NCW advisory (LAW-38) is reported to apply closer scrutiny to educational institutions.
Organisation type Educational; relationship types Student and Research scholar; student-facing language and templates; student representation in the IC where the regulations require; training track for faculty and students; counsel flag on which regime governs each complaint
SCT-02
Hospitals, clinics and medical colleges
Employees, trainee doctors, nurses, contract and outsourced staff; frequent third-party respondents (patients, attendants); night shifts and on-call rooms; closer scrutiny reported for healthcare institutions.
Third-party respondent flow (RT-05) with patient-privacy guard; shift and location values in the risk assessment; hospital-specific awareness course variant; interim relief options that account for rosters
SCT-03
IT, ITES, global capability centres and start-ups
Remote and hybrid teams, client sites, chat and video platforms, multi-state offices, listed or investor-backed companies with Board’s Report and BRSR duties.
Online-conduct evidence types (RT-10); branch-per-city IC mapping (RT-16); Board’s Report and BRSR data packs; TRN-401 remote work course
SCT-04
Hospitality, retail, security and facility services
Shift work, customers and guests as respondents, outsourced and agency staff, frontline staff with low access to email.
Mobile-first and low-literacy flows; QR-code entry posters at sites; audio narrative option; third-party respondent flow; Bengali and Hindi first
SCT-05
Factories, construction sites and contractor-heavy workplaces
Contract labour and the principal employer; the Act’s wide definition of employee includes contract workers whether or not the principal employer knows. Which employer’s committee hears a complaint (principal employer or contractor) needs counsel input.
Relationship type Contract worker with contractor name; routing choice recorded with reason; site-level branch records; counsel flag RT-06
SCT-06
Media, film, theatre and event production units
Temporary and project-based workplaces, freelancers, many employers on one set, power imbalance. Production units need an IC while the production runs.
Project-type organisation with start and end dates; short-term IC with tenure bound to the project; freelancer relationship type; archive of records after wrap
SCT-07
Domestic workers and households
A dwelling place is a workplace for a woman employed there. The Local Committee handles complaints; households are not onboarded organisations.
RT-04 and RT-21 information path: plain-language guidance, Nodal Officer and District Officer contacts, legal aid, police support; no case stored without an organisation tenant, except an optional anonymous enquiry to Acorn
SCT-08
Unorganised sector (farm, street vending, home-based and informal work)
Local Committee and Nodal Officers at block, taluka, tehsil or municipality level; complaints reach the Local Committee within 7 days of receipt by the Nodal Officer (Supreme Court directions).
Information path and directory; printable guidance in Bengali and Hindi; offline-friendly pack for NGOs and trade unions to carry
SCT-09
Gig and platform workers
Whether a platform owes statutory POSH duties to a gig worker depends on the worker’s classification and the workplace concept; the position is unsettled and new labour codes are still being implemented.
Relationship type Platform worker; organisation policy track (non-statutory unless counsel decides otherwise); decision D-25
SCT-10
Law firms, advocates’ chambers and bar associations
A law firm or consultancy with 10 or more employees is an employer under the Act. The Kerala High Court (2026, as reported) held a bar association not to be an employer capable of constituting an Internal Committee, so chambers and associations raise open questions about the forum. Bar Council rules on advertising and solicitation limit how results can be described (Appendix B).
Organisation type Legal; counsel flag at onboarding on forum; Local Committee referral path remains available; Acorn’s own compliance is covered in Section 8.36
SCT-11
Government departments, public sector undertakings and autonomous bodies
Internal Committees expected in every department and undertaking; Supreme Court directions on compliance surveys and SHe-Box; service rules and Central Civil Services Conduct Rules apply to the respondent; appeals go to tribunals.
Organisation type Public authority; SHe-Box registration check weighted in the score; tribunal forum field in appeals; RTI request handling note (information is exempt under Section 16)
SCT-12
Armed forces, police and paramilitary
Separate service rules and tribunals (the Armed Forces Tribunal point in LAW-39); committees often constituted under departmental orders.
Counsel-assisted onboarding only; forum field; no standard template without counsel review
SCT-13
NGOs, trusts, societies and clubs
Employees and volunteers; small organisations (fewer than 10) fall to the Local Committee; volunteers and beneficiaries are workplace-adjacent.
Volunteer and beneficiary relationship types; Voluntary IC (RT-17); counsel flag for beneficiary complaints
SCT-14
Co-working spaces, shared offices and business parks
Several employers share premises; the respondent may be an employee of another tenant or of the space operator.
Host organisation record (RT-06); cross-organisation cooperation letter (RT-07); no shared case data
SCT-15
Sports bodies, academies and training institutes
Athletes and trainees are not always employees; federations and academies are often societies; closer duty of care.
Trainee and athlete relationship types; Voluntary IC; counsel flag
SCT-16
Political parties and trade unions
Courts have held that some such bodies are not employers for the Act; counsel must decide on the forum.
Counsel-assisted onboarding; non-statutory policy track
SCT-17
Multinational and offshore teams
Extra-territorial incidents and local laws (EC-25); employer’s global code of conduct.
Non-statutory label where counsel decides; local-law note on the case


R6.3 Party rights and duties
Party
Rights
Duties and expectations
Complainant
To file a written complaint, with help if she cannot write; to confidentiality of her identity and the complaint; to be told what happens next and by when; to ask for conciliation before an inquiry (without monetary terms); to ask for interim relief; to a fair hearing; to a copy of the reply, the report and the employer’s action; to appeal; to protection from retaliation; to approach the police, a court or other forum at the same time; to a support person and an interpreter; to reasonable accommodation
To give information in good faith; to take part in the inquiry; to keep the proceedings confidential; to tell the IC about other proceedings
Respondent
To receive a copy of the complaint and documents relied on; to reply within the time allowed and to submit documents and witnesses; to be heard; to question through the Presiding Officer; to a reasoned report; to appeal; to confidentiality of identity; to be treated as a person against whom findings are not yet made; to protection from public disclosure; to a support person and an interpreter
To cooperate; not to retaliate, intimidate or contact the complainant or witnesses about the case; to keep the proceedings confidential; not to destroy evidence
Witness
To confidentiality; to give evidence separately and by video where needed; to protection from retaliation; to an interpreter
To tell the truth; to keep the matter confidential
IC member and Presiding Officer
To orientation and training; to facilities and time; to a secretariat; to independence from the employer’s pressure; to external legal support (PS-22)
To declare conflicts; to act with neutrality, follow natural justice and the timelines; to keep records; to keep confidentiality for life; to report breaches
Employer and Organisation Admin
To a clear compliance picture; to templates and support; to the IC’s timely report
To provide a safe workplace, display notices, train, support the IC, secure attendance, act on recommendations within 60 days, treat harassment as misconduct, file annual reports and not interfere with the inquiry
Support person and interpreter
To be present as the party allows
To sign the undertaking (DOC-37); not to speak for the party unless allowed; to keep the matter confidential
Acorn staff
To clear procedures and training; to protection from abuse
To respect the permission matrix; never to read case content without a role; to report incidents; to keep Section 16 confidentiality


R6.4 Legal source register
Ref
Instrument and provision
Obligation or rule (summary)
Platform response
Status
LAW-01
Constitution of India, Articles 14, 15, 19(1)(g), 21
Equality, non-discrimination, freedom to practise a profession, life with dignity. Foundation of the right to a safe workplace.
Policy preamble text; dignity-first, trauma-informed design (Section 22.2)
Counsel to confirm
LAW-02
Vishaka v. State of Rajasthan (1997)
Supreme Court guidelines requiring a complaints mechanism, awareness and protection from victimisation, until the Act was passed.
Basis of non-victimisation controls (retaliation monitoring, Section 8.19)
Counsel to confirm
LAW-03
Apparel Export Promotion Council v. A.K. Chopra (1999)
Sexual harassment is judged by the unwelcome nature of conduct; intent of the harasser is not decisive.
Training content and IC conduct guide (Sections 8.17 and 8.23)
Counsel to confirm
LAW-04
Medha Kotwal Lele v. Union of India (2013)
Directed compliance with the Vishaka guidelines and treated complaints committees as inquiry authorities for disciplinary action.
Case outcome feeds the employer’s disciplinary process (Section 8.18)
Counsel to confirm
LAW-05
Aureliano Fernandes v. State of Goa (2023) and Supreme Court orders of 12 May 2023, 22 Oct 2024 and 3 Dec 2024
Found widespread non-compliance; ordered district-wise compliance surveys; directed notification of a District Officer in every district, constitution of Local Committees, appointment of Nodal Officers at block, taluka, tehsil or municipality level who forward complaints to the Local Committee within 7 days, publication of Nodal Officer details, SHe-Box use, and access through Legal Service Clinics, paralegals and the legal helpline 15100.
Compliance health score, SHe-Box registration helper, Local Committee referral pack, helpline directory (Sections 8.13, 8.21 and 8.22)
Source-checked
LAW-06
POSH Act 2013, Section 2 (definitions)
Aggrieved woman: a woman of any age, employed or not. Employee: regular, temporary, ad hoc, daily wage, contract, probationer, trainee, apprentice, co-worker, with or without the principal employer’s knowledge, paid or voluntary. Workplace is wide: any place visited in the course of employment, employer-provided transport, and a dwelling place or house. Sexual harassment means unwelcome acts: physical contact and advances, demand or request for sexual favours, sexually coloured remarks, showing pornography, or other unwelcome physical, verbal or non-verbal conduct of a sexual nature.
Applicability wizard and harassment taxonomy on the intake form (Sections 8.11 and 8.14)
Counsel to confirm
LAW-07
Section 3 (prevention and circumstances)
No woman shall be subjected to sexual harassment. Circumstances that may amount to it include an implied or explicit promise of preferential treatment, threat of detrimental treatment, threat about present or future employment status, interference with work or an intimidating, offensive or hostile environment, and humiliating treatment likely to affect health or safety.
Taxonomy values for quid pro quo, threat and hostile environment on the form
Counsel to confirm
LAW-08
Section 4 (Internal Committee)
Written order constituting an IC at each office or branch with 10 or more employees. Presiding Officer is a senior-level woman employee (from another office if none is available). At least two employee members committed to women’s causes or with social work or legal knowledge, and one external member from an NGO or association committed to women’s causes or familiar with sexual harassment issues. At least half the members are women. Maximum term of three years from nomination.
IC composition validator, tenure alerts, external member panel (Section 8.5.1, POSH-S-001 to S-006)
Source-checked
LAW-09
Sections 5 to 7 (District Officer, Local Committee)
Appropriate government notifies a District Officer. The Local Committee handles establishments with fewer than 10 employees and complaints against the employer, and works in addition to ICs. Nodal Officers forward complaints within 7 days.
Routing rules RT-02, RT-03, RT-04; referral pack (Sections 8.11 and 8.22)
Source-checked (Nodal Officer point); counsel to confirm composition
LAW-10
Section 9 (complaint)
Written complaint within three months of the incident (of the last incident in a series). The IC may extend by up to a further three months for recorded reasons. If the woman cannot write, the IC renders all reasonable assistance. If she is incapacitated or has died, her legal heir or another prescribed person may complain.
Limitation check, extension workflow, assisted filing, representative filing (Sections 8.14 to 8.16)
Source-checked (three months); counsel to confirm extension and representative rules
LAW-11
Section 10 (conciliation)
Before an inquiry and only at the woman’s request, the IC may attempt settlement. No monetary settlement as the basis of conciliation. The settlement is recorded and forwarded to the employer to act on; copies go to both parties; no further inquiry if terms are honoured; if terms are not complied with, the woman may ask the IC to proceed.
Conciliation workflow with a guard against monetary terms (Section 8.15 states T09 to T11)
Source-checked
LAW-12
Section 11 (inquiry)
Inquiry follows the service rules applicable to the respondent, or the prescribed manner where there are none. The IC has civil court powers (summoning, discovery and production of documents, evidence). Principles of natural justice apply. Inquiry is completed within 90 days. Where the respondent is not an employee, the IC proceeds under the Act and may seek police registration where a prima facie case exists.
Hearing, evidence, summons, 90-day countdown (Sections 8.16 and 8.17)
Source-checked
LAW-13
Section 12 (interim relief)
On the woman’s written request during the inquiry, the IC may recommend that the employer transfer the woman or the respondent, grant the woman leave of up to three months, or grant other prescribed relief.
Interim relief request, decision and employer implementation tracking (Section 8.18)
Source-checked
LAW-14
Section 13 (inquiry report and action)
Report with findings goes to the employer within 10 days of completing the inquiry and to both parties. If the allegation is not proved, no action. If proved, the IC recommends action under service rules (or as prescribed) and deduction from the respondent’s salary to pay compensation. The employer acts within 60 days.
Report issuance, 10-day and 60-day timers, action-taken record (Section 8.18)
Source-checked
LAW-15
Section 14 (false or malicious complaint)
Action can follow only where the IC finds the complaint knowingly false or malicious, or that forged or misleading documents or false evidence were given. Inability to substantiate or provide proof is not by itself a ground. A separate inquiry establishes malice.
Guarded workflow; no automatic labelling; wording on the declaration (Section 8.18)
Source-checked
LAW-16
Section 15 (compensation factors)
The IC considers mental trauma, pain, suffering and emotional distress; loss of career opportunity; medical expenses for physical or psychiatric treatment; the respondent’s income and financial status; and the feasibility of payment in a lump sum or instalments.
Compensation worksheet (Section 8.18)
Source-checked
LAW-17
Section 16 (prohibition of publication)
Contents of the complaint, identity and addresses of the aggrieved woman, respondent and witnesses, inquiry proceedings, recommendations and action taken are not to be published, communicated or made known to the public, press or media. Information about the justice secured may be disseminated without disclosing names, addresses, identity or other particulars.
Confidentiality controls and anonymised outcome publisher (Section 8.20)
Source-checked (core rule); counsel to confirm the proviso wording
LAW-18
Section 17 (penalty for publication)
Penalty for breach of Section 16 under the service rules or, where none, as prescribed by the Rules.
Staff undertakings, access logging, discipline workflow
Counsel to confirm amount
LAW-19
Section 18 (appeal)
An aggrieved person may appeal against the recommendations or their non-implementation within 90 days to the court or tribunal under the service rules, or as prescribed.
Appeal window tracker and appeal record (Section 8.19)
Source-checked
LAW-20
Section 19 (employer duties)
Provide a safe workplace; display conspicuously the penal consequences of sexual harassment and the IC order; organise workshops and awareness programmes at regular intervals and orientation for IC members; provide facilities to the IC; assist in securing the attendance of respondent and witnesses; make information available to the IC; assist the woman to file a criminal complaint if she chooses; initiate action against a perpetrator who is not an employee; treat sexual harassment as misconduct under service rules; monitor timely submission of IC reports.
Employer compliance suite and scoring (Section 8.21)
Source-checked (core duties); counsel to confirm full list
LAW-21
Sections 20 to 25 (government duties, annual reports, inspection)
Appropriate government and District Officer duties; the IC prepares an annual report and submits it to the employer and the District Officer; the employer includes the information in its annual report or informs the District Officer; the government may call for information and inspect records.
Annual report generator, audit pack (Sections 8.21 and 8.22)
Source-checked (annual report content); counsel to confirm section mapping
LAW-22
Section 26 (penalty)
Fine up to ₹50,000 for contraventions such as not constituting an IC or not filing the annual report. Repeat contravention attracts twice the penalty and possible cancellation, suspension or non-renewal of the licence or registration.
Compliance health score weights; risk messaging in dashboards
Source-checked
LAW-23
Sections 27 and 28
Cognizance of offences by courts; the Act is in addition to, not in derogation of, other laws.
Parallel criminal track in the workflow (RT-14)
Counsel to confirm
LAW-24
Sexual Harassment of Women at Workplace Rules, 2013
Prescribes the form of complaint (several copies), dispatch of the complaint to the respondent within 7 working days, respondent’s reply with documents and witnesses within 10 working days, manner of inquiry, notice before ex parte action, recommendations, quorum, annual report and penalty for confidentiality breach.
Timers TM-05, TM-06, TM-13; inquiry controls (Sections 8.16 and 8.17)
7-day and 90-day points source-checked; other rule numbers: counsel to confirm
LAW-25
Handbook on Sexual Harassment of Women at Workplace (Ministry of Women and Child Development, 2015)
Model policy, forms and procedure that practitioners follow.
Template library baseline (Section 8.26)
Counsel to confirm
LAW-26
Bharatiya Nyaya Sanhita, 2023 (replacing the Indian Penal Code)
Offences relevant to workplace conduct include assault or criminal force to outrage modesty, sexual harassment, voyeurism, stalking and words or gestures insulting modesty. The Act continues to treat police registration as an option where a prima facie case exists.
Criminal-track support: employer assistance, referral pack (RT-14, Section 8.22)
Counsel to confirm section mapping
LAW-27
Companies (Accounts) Second Amendment Rules, 2025 (effective 14 July 2025)
Companies disclose in the Board’s Report the number of sexual harassment complaints received in the year, disposed of, and pending beyond 90 days, together with workforce gender composition including transgender persons.
Board report data sheet and counts (Sections 8.21 and 8.22)
Source-checked
LAW-28
SEBI BRSR disclosures (top listed companies)
Listed entities disclose sexual harassment complaint statistics in their sustainability reports.
BRSR data extract (PS-32)
Counsel to confirm
LAW-29
Digital Personal Data Protection Act 2023 and Rules 2025 (notified 14 Nov 2025)
Rules 1, 2 and 17 to 21 in force on publication; consent manager provisions later; consent manager provisions commence 12 months after publication (about 13 November 2026); most obligations (notice, consent, security safeguards, breach notification, rights, retention, children’s data, Significant Data Fiduciary duties) commence 18 months after publication (about 13 May 2027, as reported). Clear separate notice in simple language; breach intimation to affected persons without delay and to the Data Protection Board; erasure when the purpose is served unless law requires retention, with at least 48 hours’ notice; logs retained at least one year; verifiable parental consent for children.
Section 26.9 control mapping; privacy notice (Appendix E); retention engine (Section 26.10)
Source-checked (as reported); counsel to confirm applicability to Acorn and to employer clients
LAW-30
Information Technology Act 2000 and CERT-In Directions (April 2022)
Reasonable security practices; reporting of specified cyber incidents to CERT-In within 6 hours; retention of ICT logs for 180 days within India.
Incident playbook and log retention (Sections 26.8 and 27)
Counsel to confirm
LAW-31
Bharatiya Sakshya Adhiniyam, 2023 (replacing the Indian Evidence Act)
Electronic records are admissible with a prescribed certificate and integrity assurance.
Evidence vault with SHA-256 hash, chain of custody and certificate template (Sections 8.17 and 8.26)
Counsel to confirm
LAW-32
Bar Council of India Rules, Part VI, Chapter II, Section II, Rule 36 (and 2024 to 2025 notices to online legal service providers)
Advocates must not advertise or solicit work; limited factual information on a website is permitted.
Website content rules and marketing review (Appendix B)
Counsel to confirm applicability to a legal consultancy
LAW-33
Rights of Persons with Disabilities Act 2016; Transgender Persons (Protection of Rights) Act 2019
Accessibility, reasonable accommodation and non-discrimination; inclusive treatment in policy and communication.
Accessibility support, inclusive policy track (Sections 8.13 and 22)
Counsel to confirm
LAW-34
Protection of Children from Sexual Offences Act 2012
Mandatory reporting duties where the person is under 18.
Routing rule RT-13; child-protection protocol (Section 8.28)
Counsel to confirm
LAW-35
State and service rules: West Bengal notifications of District Officers; model or certified standing orders; service conduct rules
Inquiry follows service rules; sexual harassment is misconduct; Local Committee and Nodal Officer contacts vary by district.
District directory managed by Legal Administrator (Section 8.30)
Counsel to confirm
LAW-36
GST law (legal services)
Invoices for legal and consultancy services carry GST as applicable; confirm the SAC code and the reverse-charge position for advocates’ services with Acorn’s accountant.
Tax invoice engine (PAY-006, PAY-007)
Accountant to confirm
LAW-37
Proposed amendments to the POSH Act (reported, not enacted)
A reported proposal would extend the complaint period to one year and remove pre-inquiry conciliation. Not law at the date of this document.
Effective-dated rules engine so that a future change is configuration (Section 8.30)
Source-checked as proposal only
LAW-38
National Commission for Women advisory to employers (June 2026, as reported by a compliance advisory firm)
Reported to ask employers to: constitute an IC at each office, branch or unit with 10 or more employees; ensure a functioning Local Committee and Nodal Officers in each district; display IC and Local Committee details, member contacts and the online complaint procedure at the workplace and on the website and keep them current; register on and actively use SHe-Box; file annual reports under Section 21; protect complainants, witnesses and committee members from retaliation, intimidation and adverse transfers; and carry out an annual POSH audit (establishments with 10 or more employees) covering IC constitution, a woman Presiding Officer, IC functioning, complaint handling, confidentiality, training, disclosures, workplace safety and SHe-Box registration, with the report submitted to the District Officer, the District Magistrate or Deputy Commissioner and the administrative department. Educational and healthcare institutions are reported to face closer scrutiny.
Annual audit service PS-01 and duties CMP-21 to CMP-23; website disclosure checklist; SHe-Box helper (Sections 8.21 and 8.22); sector overlays (Section 8.33)
Reported by a secondary source; read the advisory itself; whether and how far it binds is for counsel
LAW-39
Recent decisions and orders (2026, as reported)
Supreme Court, 7 January 2026: sought structured updates on POSH implementation in courts and tribunals and on statutory appointments such as District Officers and Nodal Officers. Supreme Court, 20 January 2026 (Cdr Yogesh Mahla v. Union of India): observed that an IC report may be challengeable before the Armed Forces Tribunal depending on jurisdiction; matter restored for consideration. Kerala High Court (X v. Kollam Bar Association, 2026): a bar association was held not to be an employer under the Act and could not constitute an Internal Committee under Section 4; the proceedings were set aside. Gauhati High Court (as reported): conciliation under Section 10 does not by itself bar the employer from starting disciplinary action under service rules.
Watch list LEG-004; employer-type and applicability notes in the wizard and in Section 8.33; forum field in the appeal tracker (POST-01); a Settled closure does not hide the employer’s own disciplinary track
Reported by a secondary source; read the judgments before relying
LAW-40
SHe-Box (Ministry of Women and Child Development), revamped August 2024
Central web portal for registering workplace sexual harassment complaints and for routing them to the right committee, with monitoring of status. Parliamentary data cited in a 2026 digest reports 296 complaints since the revamp (254 in 2025). Several district administrations have directed private establishments to register their ICs; the statute does not make exclusive use of the portal mandatory.
SHe-Box registration helper, referral records for complaints that arrive from the portal, response-time tracking (Sections 8.21 and 8.22, EXT-02)
Source-checked (as reported); counsel to confirm district-specific orders for Kolkata and West Bengal


R7. Delivery planning
Epics, the phase and week plan, the full decision log and the product risk register.
R7.1 Phases
Phase
Week range
Key milestones
Deliverable and sign-off
0. Kick-off and design
Week 1
Requirements walkthrough, content checklist, sitemap, wireframes, design direction, environment setup
Approved wireframes and design; project plan
1. Website and core admin
Weeks 2 to 4
Pages, service request with email, blog and script admin, Razorpay, deployment to staging then production
Phase 1 UAT sign-off; live website
2. Engagement and real-time admin
Weeks 5 to 7
Socket.io alerts, Q&A, RBAC, audit logs, reports, campaign pages
Phase 2 UAT sign-off
3. POSH basic and standard
Weeks 8 to 12
Complaint portal, case management, IC, notices, hearings, evidence vault, timeline engine, penetration test
Legal and UAT sign-off; POSH soft launch with first client
4. POSH advanced
Weeks 13 to 16
Multi-organisation, policy library, annual report generator, compliance health score, analytics, retention, integrations
Phase 4 sign-off
5. Service, support and training suite
Weeks 17 to 21
Service catalogue and subscriptions, helpdesk, support directory, LMS, climate surveys, aftercare, legal content console, external penetration retest
Final sign-off; handover
6. Hypercare
Weeks 22 to 25 (or 30 days after each go-live)
Bug fixes, tuning, training refreshers
Closure report


R7.2 Week-by-week plan
Week
Phase
Goals and deliverables
Exit check
W1
0
Kick-off, decisions D-1 to D-10, repository, CI skeleton, environments, design system tokens, rules and data-model walkthrough, access to accounts (domain, Razorpay, email, SMS)
Kick-off checklist (28.8) signed
W2
1
Auth and roles, settings, audit log, public site shell, homepage sections, navigation (E01 start)
Login and role tests pass
W3
1
Landing pages, service pages, request form with real-time alert and email, Q&A submit, SEO base
Request alert under 5 seconds
W4
1
Razorpay orders, verify, webhook, receipts, admin inbox, blog CMS and script control, Phase 1 hardening and UAT
Phase 1 acceptance (Section 14.1)
W5
2
Organisation onboarding wizard, branches, committee builder and validation, roster import
Committee validation tests
W6
2
Policies, notices tracker, duty register, compliance score, organisation dashboard
Score matches worked examples
W7
2
Service catalogue, plans, subscriptions, orders, delivery tasks, invoices, support tickets basics
Phase 2 acceptance
W8
3
Rules engine core: calendars, rule sets, timer calculation, clock stop, scenarios 1 to 20
Scenario tests 1 to 20 pass
W9
3
Intake form, drafts, OTP, routing RT-01 to RT-21, limitation, case creation, receipts
Routing tests pass
W10
3
State machine T01 to T30, case roles, conflict declarations, undertakings, case diary
Authorisation matrix tests pass
W11
3
Notices, replies, hearings, statements, documents, chain of custody, conciliation, interim relief
Document custody tests
W12
3
Reports, compensation, employer action, appeals, aftercare, legal hold, break-glass, retention engine, case export, scenarios 21 to 40
Phase 3 UAT; all 40 scenarios pass
W13
4
Complainant and respondent portals, status views, accessibility, Bengali and Hindi microcopy
Accessibility audit
W14
4
Notification matrix P-01 to P-40, templates DOC-01 to DOC-38, real-time case events
Content-free lint passes
W15
4
Legal console: rule set approvals, template approvals, directory, watch list; support systems SUP
Rule activation workflow
W16
4
Security hardening, encryption verification, penetration test preparation, performance work
Pen test scheduled
W17
5
LMS: courses, assignments, quizzes, certificates, live sessions
Certificate verification
W18
5
Annual reports, board and BRSR data, compliance exports, anonymous surveys
Report counts reconcile
W19
5
Sector overlays, remedies map, rights charters, Acorn own compliance, independence and contract pack
Legal sign-off
W20
5
Penetration test fixes, load test, backup restore drill, DR runbooks
No critical or high open
W21
5
Full UAT with a pilot organisation, content freeze, training of Acorn staff, go-live checklist
Go-live approval
W22 to W25
Hypercare
Daily monitoring, defect fixing, first month metrics, knowledge transfer, handover of documentation and accounts
Handover accepted


R7.3 Epics
Epic
Name
Scope
Phase
Stories
E01
Platform foundation
Repository, CI, auth, RBAC, audit, settings, email, notifications, files, validation, rate limiting
1 to 2
14
E02
Public website and CMS
Layout, homepage, pages, POSH landing page, legal pages, SEO, cookie consent, campaign pages
1 to 2
11
E03
Service requests
Form, spam protection, admin handling, replies, alerts, reminders
1 to 2
7
E04
Q&A support
Ask, moderate, answer, publish, FAQ
2
5
E05
Blog
Editor, media, public pages, workflow, redirects
1 to 2
5
E06
Script management
Manager, consent-aware loading, kill switch, versions
1 to 2
4
E07
Payments
Catalogue, Razorpay order, verify, webhook, reconciliation, receipts, refunds
1 to 2
8
E08
Admin dashboard and users
Dashboard, users, sessions, reports, audit viewer
1 to 2
5
E09
POSH organisations and IC
Tenants, branches, IC validation, tenure, undertakings, isolation, policies
3 to 4
7
E10
POSH complaint intake
Applicability wizard, form, OTP, evidence, assisted filing, concern report, status page
3
10
E11
POSH case workflow
State machine, triage, conciliation, notices, respondent portal, interim relief, timeline engine
3
11
E12
POSH inquiry
Hearings, minutes, evidence vault, release, quorum, ex parte, video, linked participants
3
8
E13
POSH report, closure, appeals
Report builder, issuance, employer action, compensation, appeal, closure, aftercare, reopening
3 to 4
8
E14
POSH compliance and reporting
Duty register, score, annual report, board data, analytics, audit pack, retention, offboarding
4
9
E15
Training (LMS)
Courses, assignments, certificates, attendance, reminders
5
5
E16
Prevention and surveys
Surveys, suppression-safe reports, risk assessment
5
3
E17
Services, helpdesk, legal console
Catalogue, plans, subscriptions, tasks, tickets, directory, assistant, legal console
5
9
E18
Security and privacy engineering
Encryption, break-glass, watermark, log scrubbing, pen test, privacy flows, backups
3 to 5
7
E19
Quality and operations
E2E, performance, accessibility, monitoring, seed data, documentation
1 to 5
6


R7.4 Open decisions (full PRD text)
ID
Question or decision
Why it matters
Owner
Needed by
D-1
Public site rendering: Next.js (SSR) or a pure React SPA with pre-rendering?
SEO quality and hosting model. Recommended: Next.js for the public site.
Project lead and Acorn
Kick-off
D-2
Hosting choice (VPS in India, managed cloud or hybrid) and who owns the account
Cost, resilience and data residency
Acorn
Before Phase 1 deployment
D-3
What does "service" payment cover: fixed packages, ad hoc invoices, or both? Is GST invoicing required on receipts?
Payment catalogue and invoice design
Acorn and accountant
Before Phase 1 payments
D-4
Will Acorn operate POSH as a managed service for client organisations (recommended), or sell a self-service platform?
Role model, onboarding and liability
Acorn
Before Phase 3
D-5
Complainant identity model: verified account, one-time link, or pseudonymous first contact
Balance of confidentiality, legal requirements and usability
Acorn legal team
Before Phase 3
D-6
Retention periods for each data class, including POSH records
Compliance and automated deletion
Acorn legal team
Before Phase 3
D-7
Are SMS or WhatsApp notifications required? If yes, which provider?
Cost and scope
Acorn
Before Phase 2
D-8
Languages: English only, or English with Bengali and Hindi?
Content and UI effort
Acorn
Before design sign-off
D-9
Will team or advocate profiles appear on the website? What can be said under professional-conduct rules?
Compliance and content
Acorn legal team
Before content freeze
D-10
Is an external penetration test by a third party required before POSH launch?
Budget and assurance
Acorn
Before Phase 3
D-11
Who are the named recipients of admin alerts and who is the grievance officer?
Notification setup and Privacy Policy
Acorn
Before Phase 1 go-live
D-12
Is integration with client HRMS systems needed in the first year?
Scope of POSH-A-032
Acorn
Before Phase 4
D-13
Source of holiday calendar for working-day calculations (West Bengal and central holidays)
Accuracy of reply deadlines
Acorn
Before Phase 3
D-14
Brand assets, tone of voice and design preferences (reference sites)
Design direction
Acorn
Kick-off
D-15
Anchor date for the 90-day inquiry period (date complaint received, or date inquiry starts)
Deadline engine default and annual report accuracy (Section 8.16)
Acorn legal team
Before Phase 3
D-16
Policy for complainants who are not women (gender-neutral track, non-statutory)
Routing rule RT-09 and templates
Acorn legal team
Before Phase 3
D-17
Are Acorn staff enrolled advocates, and does Bar Council advertising Rule 36 apply to the website and POSH marketing?
Website content, testimonials and service pages
Acorn partners
Before content freeze
D-18
Acorn external member panel: who, fees, conflict-check policy, and whether Acorn may nominate its own lawyers as external members for client organisations
Conflict of interest and independence of IC
Acorn partners and counsel
Before Phase 3
D-19
Annual report due date and format required by the West Bengal District Officers
Annual report generator output
Acorn legal team
Before Phase 4
D-20
Intake Counsellor role: who staffs it, training, and whether they may view complaint content during assisted filing
Confidentiality model and permission matrix
Acorn partners
Before Phase 3
D-21
Service plan structure and price points (Starter, Professional, Enterprise) and whether subscriptions are billed through Razorpay Subscriptions or invoices
Service catalogue and billing design
Acorn partners and accountant
Before Phase 5
D-22
Minor complainants (under 18, for example apprentices): policy and child-protection reporting duty
Routing rule RT-13 and workflow
Acorn legal team
Before Phase 3
D-23
Evidence retention and litigation hold period default
Retention jobs and storage cost
Acorn legal team
Before Phase 3
D-24
Hosting region and sub-processors acceptable to employer clients for POSH data
Contracts and DPDP obligations
Acorn
Before Phase 3
D-25
Gig and platform workers: whether POSH duties are offered to them as a statutory or a non-statutory track (Section 8.33, SCT-09)
Routing rule and sector overlay
Acorn legal team
Before Phase 3
D-26
Treatment of the NCW advisory of June 2026 (annual POSH audit, website disclosure) as binding duty or good practice in the compliance score
Duty register CMP-21 to CMP-23 and score weights
Acorn legal team
Before Phase 2


R7.5 Product risk register
ID
Risk
Likelihood
Impact
Mitigation
Owner
R-01
Scope creep, especially in POSH (every client wants custom workflows)
High
High
Strict phase scope, change control, configurable templates instead of custom code
Project lead
R-02
Confidentiality breach of POSH data
Low
Critical
Controls in Sections 8.7 and 13, penetration test, no sensitive content in notifications, access reviews
Security lead
R-03
Statutory timelines or content configured incorrectly
Medium
High
Legal sign-off, scenario-based timeline tests, configurable rules, clear disclaimers
Acorn legal
R-04
Payment mismatch or fraud
Low
High
Server-side amounts, signature and webhook verification, reconciliation job, alerts
Developer and Finance
R-05
Low-quality AI-generated code introducing vulnerabilities
Medium
High
Mandatory review, tests, SAST, extra scrutiny of authentication, payments, encryption and authorisation
Project lead
R-06
Delayed content, legal text or Razorpay KYC
High
Medium
Early checklist, placeholders, test mode build, dependency tracking in weekly updates
Acorn
R-07
Professional-conduct or advertising rule non-compliance on the website
Medium
High
Counsel review of content and disclaimers (Appendix B)
Acorn legal
R-08
Single-server failure or data loss
Medium
High
Backups, restore tests, managed database before POSH, documented DR
DevOps
R-09
Third-party script compromises visitors
Low
High
Consent gating, CSP, allow-list, kill switch, restricted roles
Marketing and Super Admin
R-10
Spam and abuse of forms
High
Low
CAPTCHA, honeypot, rate limit, moderation
Developer
R-11
Key person dependency in a small team
Medium
Medium
Documentation, code in client-owned repository, runbooks
Project lead
R-12
Changing law or rules (POSH rules, data protection rules)
Medium
Medium
Configurable timers and templates, periodic legal review, maintenance plan
Acorn legal
R-13
Low adoption of POSH portal by employees
Medium
Medium
Plain-language UX, awareness material, organisation onboarding kit
Acorn and organisations
R-14
Performance issues from heavy media and scripts
Medium
Medium
Image optimisation, CDN, script governance, Lighthouse CI budgets
Developer


R8. Design system and screen inventories
The design tokens, principles and patterns, and the complete screen lists with routes and roles for the public site, the admin console and the POSH portals.
R8.1 Design tokens
Token group
Definition
Colour
Primary navy #1F3864; primary hover #2F5496; accent warm gold #B08D57; ink #1B1F27; slate #5B6573; border #D5DAE3; surface #F6F7F9; white #FFFFFF; success #1E7B4F; warning #B7791F; danger #B42318; info #1F5FA8; focus ring 3 px #2F5496 with 2 px white offset. Text on every background meets contrast 4.5 to 1 (3 to 1 for large text and UI components).
Typography
Headings in a refined serif (for example Source Serif 4 or Cormorant Garamond); body and UI in a clean sans (for example Inter or Source Sans 3). Scale: 14, 16 (base), 18, 20, 24, 30, 36, 48 px; line height 1.5 for body; maximum line length 70 characters. Bengali and Hindi use Noto Sans Bengali and Noto Sans Devanagari with the same scale. Fonts self-hosted.
Spacing and layout
4 px base grid; spacing steps 4, 8, 12, 16, 24, 32, 48, 64; content width 1200 px; 12-column grid; breakpoints 360, 768, 1024, 1280, 1536.
Shape and elevation
Radius 6 px for inputs and buttons, 10 px for cards; two shadows only (card and modal).
Motion
Short, subtle transitions under 200 ms; respect “reduce motion”; no auto-playing media or carousels.
Iconography
One outline icon set; icons always have text labels in the complaint portal.
Components
Button (primary, secondary, quiet, danger), input, textarea, select, radio, checkbox, switch, date picker with manual entry, file uploader with progress, stepper, tabs, accordion, modal and drawer, toast, alert banner, table with sticky header, filter bar, pagination, breadcrumb, badge, timeline, empty state, skeleton loader, tooltip (not for essential information), stat tile, calendar, rich text editor, code input for OTP.
Tone of voice
Calm, plain and respectful. Active voice. No legal jargon without a short explanation. Reading level around grade 8. No exclamation marks in the POSH portal. Never blame or pressure the complainant.


R8.2 Design principles
Principle
Application in the product
Safety first
A Quick Exit button on every complaint page leaves the site instantly and replaces the history entry with a neutral page. Page titles and notification text are neutral (for example “Support portal”, “You have an update”). No sensitive wording in browser tabs, emails or lock-screen notifications.
Choice and control
The complainant chooses language, contact channel and safe times, typed or audio or assisted filing, whether to use a support person, and can pause or save at any time. Nothing is submitted until she reviews and confirms.
Transparency
Every step says what will happen next, who will see this, and how long it will take. The confidentiality statement and the timeline are visible from the first screen.
No unnecessary re-telling
The complainant tells the story once; the IC works from the record. Optional questions are marked optional and can be skipped.
Calm interface
Quiet colours, generous spacing, no countdown timers, no pop-ups, no urgency language, no red error shouting. Error messages explain how to fix the problem in kind words.
Dignity
No victim-blaming prompts; no questions about clothing, behaviour or history; respectful language for all parties including the respondent.
Human help always visible
A persistent “Talk to someone” link opens the helpline directory and an Intake Counsellor contact option.
Accessibility
WCAG 2.1 AA; full keyboard use; screen reader labels; captions and transcripts for any audio or video; resizable text up to 200%; forms that work on small screens and slow connections; no CAPTCHA that blocks assistive technology (use risk-based and alternative checks).
Language
English, Bengali and Hindi; language switch always visible; key explanatory text reviewed by native speakers.
Respect for devices and privacy
No tracking scripts on any complaint or portal page; no third-party fonts or analytics there; private-browsing guidance; session timeout warning with the option to save the draft.


R8.3 Interface patterns
Pattern
Rule
Navigation
Admin: left rail by module with role-based items, top bar with search, notifications and profile. Portals: simple top bar with page title, language, help and Quick Exit. Public: sticky header with the primary call to action.
Forms
One column; labels above fields; helper text under fields; inline validation on blur and on submit; error summary at the top with links to fields; required marks explained; no placeholder-only labels; autosave where stated.
Tables
Server-side pagination, sorting, filtering; column chooser; sticky header; row actions in a menu; export per permission; empty and error states; keyboard navigable.
Confirmations
Destructive or irreversible actions use a modal that states the consequence and requires a typed word for the most severe (delete, lift legal hold).
Feedback
Toast for success; inline alert for problems; progress indicators for uploads; skeletons for loading; optimistic updates only for non-critical actions.
Session handling
Idle warning 2 minutes before timeout with a Stay signed in button; unsaved drafts preserved; sign-in return to the same page.
Masking
Names in lists show initials or case IDs; reveal only inside the case file; reveal actions are logged.
Print and PDF
Locked documents print with verification code, rule set and template version footer; case screens do not print by default.
Responsive behaviour
Admin tables collapse to cards under 768 px; complaint portal is designed mobile first.
Internationalisation
All strings in resource files with keys; dates in DD MMM YYYY; Indian numbering (lakh, crore) where money is shown; currency ₹.


R8.4 Public site screens
ID
Screen
Route
Roles
Key elements and states
W-01
Homepage
/
Public
Sections per 6.3; hero call to action; latest posts; FAQ preview
W-02
About
/about
Public
Firm profile, philosophy, values, team if approved
W-03
Services index
/services
Public
Cards; filters not required
W-04
Service detail
/services/:slug
Public
Overview, process, FAQs, request button with category pre-selected
W-05
POSH landing page
/posh
Public
Blocks per 6.4.1; resources; concern report link; consultation form
W-06
Campaign landing page
/lp/:slug
Public
Template blocks; form; UTM capture; no-index flag
W-07
Blog index
/blog
Public
Search, categories, pagination, empty state
W-08
Blog article
/blog/:slug
Public
Content, author, date, share, related posts, JSON-LD
W-09
FAQ and ask a question
/faq
Public
Search, accordion, ask form with privacy choice, confirmation
W-10
Request a service
/request-service
Public
Form per 6.5.1; confirmation with reference
W-11
Contact
/contact
Public
Details, map link, form
W-12
Pay online
/pay
Public
Service picker or invoice reference; amount shown from the server; Razorpay Checkout
W-13
Payment status and receipt
/pay/status/:id
Public
Success, failure, pending, receipt download, retry guidance
W-14
Privacy policy, terms, disclaimer, cookies, refund policy
/privacy etc.
Public
Versioned text with effective date
W-15
Cookie preferences
Overlay
Public
Categories, accept, reject, save
W-16
Knowledge base and POSH help centre
/help
Public
Search, article by role, helpline directory link
W-17
Helpline and referral directory
/help/directory
Public
Filter by need and district; last-verified date
W-18
Rule-based assistant
Widget
Public
Scripted questions; disclaimer; hand-off to service request
W-19
Certificate verification
/verify/:code
Public
Shows certificate validity without personal data beyond name and course
W-20
404 and error pages
*
Public
Navigation, search, contact


R8.5 Admin console screens
ID
Screen
Route
Roles
Key elements and states
A-01
Sign in and MFA
/admin/login
All admin
Email and password, MFA code, backup code, lockout message
A-02
Dashboard
/admin
All admin
Role-based widgets, live counters, charts, deadlines
A-03
Service requests list
/admin/requests
Admin, Support
Filters, search, export, bulk assign, unread badges
A-04
Service request detail
/admin/requests/:id
Admin, Support
Details, timeline, notes, reply, status, follow-up
A-05
Q&A queue and detail
/admin/questions
Admin, Support, Editor
Queue, answer editor, anonymise, publish, templates
A-06
Blog list and editor
/admin/posts
Editor, Admin
Rich text, SEO panel, schedule, revisions, preview
A-07
Media library
/admin/media
Editor, Admin
Grid, upload, alt text
A-08
Pages and homepage sections
/admin/pages
Editor, Admin
Section list, drag order, preview, versions
A-09
Menus, footer and contact details
/admin/site
Admin
Forms and preview
A-10
Scripts
/admin/scripts
Marketing, Super Admin
List, editor, scope, consent category, kill switch, versions
A-11
Redirects and SEO defaults
/admin/seo
Marketing, Super Admin
Table and editor
A-12
Payment catalogue
/admin/catalogue
Admin, Finance
Items, GST, active
A-13
Payments
/admin/payments
Finance, Admin
List, filters, detail, refund, export, reconciliation view
A-14
Payment links
/admin/payment-links
Finance, Admin
Create, expire, status
A-15
Users and roles
/admin/users
Super Admin
List, invite, role matrix, deactivate, sessions
A-16
Notifications and preferences
/admin/notifications
All admin
Centre, preferences
A-17
Reports
/admin/reports
Admin, Finance
Report picker, date range, export
A-18
Audit log
/admin/audit
Super Admin
Filters, detail, export
A-19
Settings
/admin/settings
Super Admin
Email, Razorpay mode, security, retention, maintenance mode
A-20
Service catalogue and plans
/admin/services
POSH Admin, Super Admin
Services, plans, add-ons, versions
A-21
Subscriptions and orders
/admin/subscriptions
POSH Admin, Finance
List, detail, usage, invoices
A-22
Delivery tasks
/admin/delivery
POSH Admin
Board by status, due dates
A-23
Helpdesk
/admin/helpdesk
Support, POSH Admin
Queue, ticket detail, macros, SLA indicators
A-24
Knowledge base admin
/admin/kb
Legal Admin, Support
Articles, approval, versions
A-25
Support directory admin
/admin/directory
POSH Admin, Legal Admin
Entries, verification dates
A-26
Legal Console: rule sets
/admin/legal/rules
Legal Admin
Parameters, effective dates, approval, scenario test results
A-27
Legal Console: templates
/admin/legal/templates
Legal Admin
Versions, languages, preview, approval
A-28
Legal Console: watch list
/admin/legal/watch
Legal Admin
Items, owner, review date, outcome
A-29
Holiday calendars
/admin/legal/calendars
Legal Admin
Central, state, organisation lists
A-30
Course builder
/admin/lms/courses
POSH Admin
Lessons, quiz, versions
A-31
Survey builder
/admin/surveys
POSH Admin
Questions, schedule, links


R8.6 POSH portal screens
ID
Screen
Route
Roles
Key elements and states
C-01
POSH portal home
/posh/portal
Complainant, public
Plain explanation, start a complaint, concern report, helpline, Quick Exit, language
C-02
Applicability wizard
/posh/start
Complainant
Plain questions; result with explanation; Local Committee referral view
C-03
Complaint form, steps A to H
/posh/file
Complainant
Stepper, autosave status, review screen, save and exit
C-04
OTP and signature
/posh/file/sign
Complainant
OTP entry, typed signature, confirmation
C-05
Submission confirmation
/posh/file/done
Complainant
Case ID, printable copies, next steps, support options
C-06
My case status
/posh/my-case
Complainant
Stage, next step, dates, hearings, notices, messages
C-07
My documents and notices
/posh/my-case/docs
Complainant
Released documents, upload supplements
C-08
Interim relief request
/posh/my-case/interim
Complainant
Short form, status
C-09
Withdraw or conciliation request
/posh/my-case/request
Complainant
Choices with plain consequences
C-10
Support and accessibility requests
/posh/my-case/support
Complainant
Support person, interpreter, accommodation
C-11
Concern report
/posh/concern
Anyone
Short form and secure inbox
C-12
Retaliation report
/posh/retaliation
Complainant, witness
Short form; priority handling note
R-01
Respondent notice
/posh/respondent
Respondent
Notice, rights, anti-retaliation statement, reply deadline
R-02
Respondent reply
/posh/respondent/reply
Respondent
Reply, documents, witness list, extension request
R-03
Respondent case status
/posh/respondent/status
Respondent
Dates, hearings, released documents, report
I-01
IC workspace home
/posh/ic
IC members
My cases, deadlines, tasks, urgent flags
I-02
Case file
/posh/ic/cases/:id
IC members
Tabs: overview, complaint, parties, evidence, hearings, notices, notes, timeline, report
I-03
Triage
/posh/ic/cases/:id/triage
IC members
Checklist, limitation, routing, conflicts, information request
I-04
Conciliation
/posh/ic/cases/:id/conciliation
IC members
Request, terms, guard messages, outcome
I-05
Notices
/posh/ic/cases/:id/notices
IC members
Template picker, preview, issue, delivery log
I-06
Hearings
/posh/ic/cases/:id/hearings
IC members
Scheduler, participants, minutes, statements
I-07
Evidence vault
/posh/ic/cases/:id/evidence
IC members
Exhibits, hash, custody log, redact, release
I-08
Findings and report
/posh/ic/cases/:id/report
IC members
Structured editor, compensation worksheet, lint results, sign
I-09
Interim relief
/posh/ic/cases/:id/interim
IC members
Request, decision, employer tracking
I-10
Closure and aftercare
/posh/ic/cases/:id/close
IC members
Checklist, outcome, aftercare schedule
I-11
Confidentiality and conflict declarations
/posh/ic/declarations
IC members
Sign before access
I-12
IC conduct guide and quick reference
/posh/ic/guide
IC members
Checklists and procedure
O-01
Organisation console home
/posh/org
Organisation Admin
Compliance score, tasks, deadlines, service timeline
O-02
IC roster
/posh/org/ic
Organisation Admin
Members, composition validation, tenure
O-03
Policy library
/posh/org/policies
Organisation Admin
Versions, acknowledgement campaigns
O-04
Notice display tracker
/posh/org/notices
Organisation Admin
Locations and verification
O-05
Training dashboard
/posh/org/training
Organisation Admin
Assignments, completion, certificates
O-06
Employer action tasks
/posh/org/actions
Organisation Admin
Case ID and recommended action only
O-07
Reports and annual report
/posh/org/reports
Organisation Admin
Generate, download, submission proof
O-08
Surveys and risk assessments
/posh/org/prevention
Organisation Admin
Run, results, action plans
O-09
Subscription and invoices
/posh/org/plan
Organisation Admin
Plan, usage, invoices, upgrade request
O-10
Support
/posh/org/support
Organisation Admin
Tickets, knowledge base
X-01
POSH Admin home
/posh/admin
POSH Admin
All organisations, deadlines, overdue, urgent flags
X-02
Organisations
/posh/admin/orgs
POSH Admin
List, onboarding wizard, settings
X-03
Case oversight
/posh/admin/cases
POSH Admin
Metadata list; no content; break-glass request
X-04
External member panel
/posh/admin/panel
POSH Admin
Directory, conflict checks, assignments
X-05
Compliance overview
/posh/admin/compliance
POSH Admin
Scores, gaps, tasks across organisations
X-06
Break-glass requests
/posh/admin/breakglass
Super Admin
Reason, approval, expiry, log
X-07
Aftercare and retaliation queue
/posh/admin/aftercare
Intake Counsellor
Tasks by due date
X-08
Intake desk
/posh/admin/intake
Intake Counsellor
Assisted filing sessions, concern inbox
X-09
Retention and legal hold
/posh/admin/retention
POSH Admin, counsel
Review queue, holds, dual approvals
X-10
Reports and analytics
/posh/admin/analytics
POSH Admin
Aggregate dashboards with suppression


R9. Reference
Requirement ID prefixes and the project glossary.
R9.1 Requirement ID prefixes
Prefix
Meaning
Where defined
POSH-B, POSH-S, POSH-A
POSH Basic, Standard and Advanced requirements
Sections 8.4 to 8.6
POSH-AC
POSH acceptance criteria
Sections 8.9 and 8.31
LAW
Legal sources and obligations
Section 8.10
RT
Routing rules
Section 8.11
PS, SVC
Services and service catalogue requirements
Section 8.12
SUP
Support systems
Section 8.13
T (T01 to T30)
Case workflow transitions
Section 8.15
TM, CS, DR, TL
Timers, clock-stop grounds, delay reasons, timeline requirements
Section 8.16
INQ, IR, RPT
Inquiry controls, interim relief, report requirements
Sections 8.17 and 8.18
POST, CONF
Post-closure and confidentiality requirements
Sections 8.19 and 8.20
CMP
Compliance duties and scoring
Section 8.21
EXT
External interfaces
Section 8.22
TRN, LMS, PRV
Training, LMS and prevention
Sections 8.23 and 8.24
P
POSH notifications
Section 8.25 and Appendix A
DOC
Document templates
Section 8.26
EC
Edge cases
Section 8.28
DESK, LEG
Service desk and legal governance requirements
Sections 8.29 and 8.30
SCT
Sector overlays
Section 8.33
REM
Remedies and justice pathways
Section 8.34
RGT
Rights and duties charters
Section 8.35
ACN
Acorn own POSH compliance
Section 8.36
IND
Independence, conflicts and service contract pack
Section 8.37
BR, US, E, W/A/C/R/I/O/X
Business rules, user stories, epics, screen IDs
Sections 21 to 23
SEC, AZ, PERF, E2E, S, SOP, TH
Security tests, authorisation tests, performance tests, journeys, timeline scenarios, procedures, threats
Sections 26, 29 and 30


R9.2 Glossary
Term
Meaning
Acorn
Acorn Legal Consultants, the client
API
Application Programming Interface, the server interface used by the front end
Audit log
Append-only record of who did what, when and from where
Break-glass
Emergency, time-limited and logged access outside normal permissions
CMS
Content Management System
CSP
Content Security Policy, a browser security control that restricts which scripts and resources can load
CSRF
Cross-Site Request Forgery, an attack that tricks a logged-in user's browser into sending unwanted requests
DPDP Act
Digital Personal Data Protection Act, 2023 (India)
GST / GSTIN
Goods and Services Tax / GST Identification Number
HMAC
Hash-based Message Authentication Code, used to verify signatures
IC
Internal Committee under the POSH Act
LC
Local Committee constituted by the District Officer under the POSH Act
JWT
JSON Web Token
MERN
MongoDB, Express.js, React, Node.js
MFA / TOTP
Multi-factor authentication / time-based one-time password
MoSCoW
Must, Should, Could, Won't: a prioritisation method
OWASP
Open Worldwide Application Security Project, a source of security standards
POSH Act
Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013
RBAC
Role-Based Access Control
RPO / RTO
Recovery Point Objective (acceptable data loss) / Recovery Time Objective (acceptable downtime)
SEO
Search Engine Optimisation
SSR
Server-Side Rendering
Tenant
One client organisation whose data is logically isolated within the shared platform
UAT
User Acceptance Testing
WAF
Web Application Firewall
WCAG
Web Content Accessibility Guidelines
XSS
Cross-Site Scripting, an attack that injects malicious scripts into pages
Aggrieved woman
Under the POSH Act, a woman of any age, whether employed or not, who alleges sexual harassment at a workplace
Respondent
The person against whom the complaint is made
Presiding Officer (PO)
Chair of the Internal Committee; a senior-level woman employee
External Member
IC member from an NGO or association committed to women’s causes, or a person familiar with sexual harassment issues
District Officer (DO)
Officer notified by the appropriate government (for example District Magistrate or Collector) who constitutes the Local Committee and receives annual reports
Nodal Officer
Officer appointed at block, taluka, tehsil or municipality level who forwards complaints to the Local Committee within 7 days of receipt (Supreme Court directions of 3 December 2024)
SHe-Box
Government of India online portal for registering sexual harassment complaints and IC details
Conciliation
Settlement attempt by the IC at the complainant’s request before inquiry, without monetary settlement as the basis
Interim relief
Temporary measures recommended during the inquiry, such as transfer or leave of up to three months
Quid pro quo
Harassment through a promise or threat linked to employment benefits or detriment
Hostile work environment
Conduct that creates an intimidating or offensive workplace
Ex parte
Proceeding or decision made in the absence of one party after due notice
Legal hold
Suspension of deletion because litigation or an appeal is pending or reasonably expected
k-anonymity
A rule that a reported group or cell must contain at least k people so that nobody can be identified
Envelope encryption
Data encrypted with a data key, which is itself encrypted by a master key held in a key service
DEK / KEK
Data Encryption Key / Key Encryption Key
BNS
Bharatiya Nyaya Sanhita, 2023, which replaced the Indian Penal Code
BSA
Bharatiya Sakshya Adhiniyam, 2023, which replaced the Indian Evidence Act
BRSR
Business Responsibility and Sustainability Report required of top listed companies
Intake Counsellor
Trained Acorn staff role that helps complainants file, with case-limited, logged access
District Officer
Officer notified by the State under the POSH Act who constitutes the Local Committee and receives annual reports
NCW
National Commission for Women
Blind index
Keyed hash of a normalised value that allows equality matching without decrypting or revealing the value
Crypto-erasure
Destroying an encryption key so that all copies of the data it protected, including backups, become unreadable
Content-free message
A notification that carries no case facts, names or conduct description, only a secure link
Legal Administrator
Acorn role that maintains statutory parameters, templates and legal content under dual approval


