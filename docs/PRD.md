# ACORN LEGAL PLATFORM: PRODUCT REQUIREMENTS DOCUMENT (v2.0)


## PRODUCT REQUIREMENTS DOCUMENT

Acorn Legal Consultants Digital Platform

Corporate Website, Landing Pages, Q&A, Blog and Script Management, Payment Gateway, Admin Control System and POSH Compliance and Case Management System

Technology Stack: MERN (MongoDB, Express.js, React, Node.js)

Version 2.0  |  29 October 2026  |  CONFIDENTIAL

Prepared for

Acorn Legal Consultants, Kolkata, West Bengal, India

Prepared by

[Development team / agency name to be inserted]

Document type

Product Requirements Document (PRD) and development specification covering functional, legal, technical, security, testing, deployment and operational requirements

Document status

Development-ready baseline (v2.0) for client review and sign-off

Classification

Confidential. For the use of Acorn Legal Consultants and the appointed development team only.

Document Control

Revision history

Version

Date

Author

Description of change


## 0.1

27 Oct 2026

[Author]

Initial draft prepared from the client brief


## 1.0

27 Oct 2026

[Author]

Complete PRD issued for client review: website, admin, Q&A, payments, POSH basic to advanced, security, testing and deployment


## 2.0

29 Oct 2026

[Author]

Development-ready release: POSH legal framework checked against published sources, applicability and routing engine, service catalogue and plans, support systems, intake field specification, case state machine, timeline and calendar engine, inquiry controls, compliance suite, training, prevention, notifications, templates, edge-case playbook, backlog with user stories, screen inventory, business rules, data dictionary, API contracts, security implementation, DevOps, delivery plan, test specification, SOPs and appendices

Review and approval

Name

Role

Organisation

Signature

Date

[Name]

Managing Partner / Authorised Signatory

Acorn Legal Consultants

[Name]

Project Sponsor / Business Owner

Acorn Legal Consultants

[Name]

Project Lead / Technical Lead

[Development team]

How to read this document

Requirements carry unique IDs (for example WEB-001, POSH-B-004) so that every requirement can be traced to a design item, a test case and an acceptance decision.

Priority uses MoSCoW: Must (required for the phase to be accepted), Should (important, included unless time-boxed out), Could (desirable, delivered if capacity allows).

Phase shows the release in which a requirement is delivered (see Section 5).

Sections 8.10 to 8.37 deepen the POSH specification (law, services, support systems, workflow and operations). Sections 21 to 30 are the development specification: backlog, screens, rules, data, API, security, DevOps, delivery plan, tests and SOPs.

Legal references to the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 and related rules are included to shape the product. They are not legal advice. Acorn Legal Consultants must validate all statutory content, timelines, templates and disclaimers before go-live.

Contents

Section

Title

1

Executive Summary

2

Business Context and Objectives

3

Scope, Assumptions, Constraints and Dependencies

4

Stakeholders, User Personas and Role Model

5

Release Strategy and Phasing

6

Public Website, Landing Pages and Engagement Features

7

Admin Control System

8

POSH Compliance and Case Management System (8.1 to 8.9 core; 8.10 to 8.37 legal framework, services, support systems, workflow, timelines, compliance, training, templates, scenarios, governance, sector overlays, remedies, charters, independence)

9

Technical Architecture

10

Data Model (summary)

11

API Specification Summary

12

Non-Functional Requirements

13

Security and Privacy

14

Testing Strategy and Quality Assurance

15

Deployment, DevOps and Operations

16

Project Plan, Milestones and Acceptance

17

Commercial Summary (Indicative)

18

Risks and Mitigation

19

Support and Maintenance

20

Open Questions and Decisions Required

21

Product Backlog: Epics, User Stories and Acceptance Criteria

22

UX Specification: Design System, Trauma-Informed Design and Screen Inventory

23

Business Rules Catalogue and State Machines

24

Data Dictionary and Database Design

25

API Contract Specification

26

Security Implementation

27

Environment, Configuration and DevOps

28

Delivery Plan

29

Test Specification

30

Operations: Runbooks and Standard Procedures

31

Glossary

Appendix A

Notification and Email Template Catalogue

Appendix B

Legal and Professional-Conduct Checklist

Appendix C

Statutory Reference and Sources Reviewed

Appendix D

Seed Data and Configuration Defaults

Appendix E

Draft Microcopy and Notice Text (for counsel review)


## 1. Executive Summary


## 1.1 Purpose of this document

This Product Requirements Document defines, end to end, the digital platform to be built for Acorn Legal Consultants ("Acorn"), a legal consultancy based in Kolkata that serves individuals, businesses and organisations with advisory, legal documentation, dispute resolution and representation. The document specifies what will be built, for whom, why, how it will be tested and secured, and how it will be deployed and supported.


## 1.2 Product vision

To give Acorn a credible, professional and secure online presence that converts visitors into enquiries and paying clients, and that extends Acorn's practice into a technology-enabled POSH (Prevention of Sexual Harassment) compliance service that Acorn can offer to the organisations it advises. The platform reflects Acorn's brand promise: Excellence in Law. Integrity in Practice.


## 1.3 What will be delivered

#

Capability

Summary

1

Public website and landing pages

Responsive homepage, About, Practice Areas, POSH landing page, Contact, FAQ and legal pages, built for trust, clarity and search visibility.

2

Service request system

Visitors submit service requests. Each request is saved, assigned a reference number, emailed to the admin immediately and shown on the admin dashboard in real time.

3

Q&A support

Visitors submit legal or service questions. Admin moderates, answers and publishes selected questions to a searchable public FAQ.

4

Blog (CMS)

Admin creates, edits, schedules and publishes articles with SEO fields, categories, tags and images, with no developer involvement.

5

Script management

Admin adds, edits, enables or disables tracking and third-party scripts (analytics, pixels, chat widgets) in the head or body of the site, with safeguards.

6

Payment gateway

Razorpay integration for consultation fees, service packages and invoices, with server-side verification, webhooks, receipts and reconciliation reports.

7

Admin control system

Role-based admin panel that governs all content, requests, Q&A, payments, users, POSH cases, settings and audit logs.

8

POSH system, basic to advanced

Confidential complaint intake, case management, Internal Committee (IC) workflow with statutory timelines, document vault, hearings, reports, annual compliance reporting, training modules and multi-organisation support.

9

Quality and operations

Security hardening, a complete test strategy, CI/CD deployment, monitoring, backups and a support model.

10

POSH legal compliance engine

Applicability and routing, effective-dated statutory rules, working-day calendar, deadline engine, case state machine and legal content governance.

11

POSH service catalogue and plans

Advisory, training, case handling, compliance reporting and prevention services sold as plans, add-ons and subscriptions, with usage limits and invoicing.

12

Support systems

Helpdesk, helpline directory, assisted filing, support person, interpreter and accessibility support, interim relief tracking, retaliation monitoring, aftercare and feedback.

13

Training, prevention and compliance suite

E-learning and attendance, policy acknowledgement, climate surveys, risk assessment, compliance health score, annual report and board report data.


## 1.4 Why this matters

Credibility: a law firm is judged on its website before the first call. Clarity, speed, accuracy and professionalism are essential.

Lead capture: structured service requests and Q&A convert anonymous traffic into qualified enquiries, with an audit trail of every lead.

New revenue line: a POSH compliance platform lets Acorn serve employers who must constitute an Internal Committee and file annual reports, and creates recurring service revenue.

Trust and confidentiality: POSH matters involve highly sensitive personal data. The platform is designed so that confidentiality is enforced by the system, not just by policy.


## 2. Business Context and Objectives


## 2.1 Client profile

Client

Acorn Legal Consultants

Location

Kolkata, West Bengal, India

Nature of business

Professional legal consultancy: advisory, legal documentation, dispute resolution and representation

Client segments

Individuals, businesses and organisations

Brand positioning

Excellence in Law. Integrity in Practice. Where Legal Expertise Meets Strategic Excellence.

Brand values

Integrity, strategic insight, discretion, diligence, transparency and professional accountability


## 2.2 Problem statement

Prospective clients cannot easily find Acorn online, understand its services, or contact the firm in a structured way.

Enquiries arrive through unstructured channels (phone, email, messaging) with no central tracking, no response-time visibility and no reporting.

Content (articles, announcements) and marketing scripts depend on a developer for every change.

Employers who need POSH compliance support have no secure, auditable channel to receive complaints and manage inquiries, and manual processes risk missed statutory timelines and breaches of confidentiality.


## 2.3 Business objectives


## ID

Objective

Measure of success


## BO-1

Establish a trusted, professional online presence

Site live on the client domain with HTTPS, Lighthouse performance and accessibility scores of 90 or above on key pages


## BO-2

Increase qualified enquiries

All service requests captured with reference IDs; admin notified within 5 seconds (in-app) and 60 seconds (email); target of 100% of requests visible in the dashboard


## BO-3

Reduce response time

Median time from request to first admin response tracked on the dashboard; target under one business day


## BO-4

Self-manage content and marketing scripts

Admin publishes a blog post or adds a tracking script in under 5 minutes without developer help


## BO-5

Collect fees online

Successful Razorpay payments reconciled with 100% accuracy against bank settlements; zero unverified payments marked as paid


## BO-6

Launch a POSH compliance offering

Complaint-to-closure workflow tracked against statutory timelines; zero confidentiality breaches; annual report generated in one click


## BO-7

Operate safely and reliably

Availability of 99.5% or better per month; recovery point objective of 24 hours or less; no critical or high vulnerabilities open at go-live


## 2.4 Key performance indicators (post-launch)


## KPI

Definition

Target (first 6 months)

Enquiry conversion rate

Service requests divided by unique visitors

2% or above

First response time

Time from request to first admin action

Under 1 business day (median)

Q&A answer rate

Questions answered or closed divided by questions received

90% or above within 3 business days

Blog cadence

Articles published per month

4 or more

Payment success rate

Successful payments divided by initiated payments

85% or above

POSH timeline adherence

Cases whose statutory milestones were met divided by total cases

100% (with alerts raised before every deadline)

Core Web Vitals

LCP, INP and CLS at the 75th percentile

All in the "good" range


## 3. Scope, Assumptions, Constraints and Dependencies


## 3.1 In scope

Public website: homepage, About, Practice Areas and service pages, POSH landing page, campaign landing pages, Blog, FAQ/Q&A, Contact, legal pages (Privacy Policy, Terms of Use, Disclaimer, Cookie Policy, Refund and Cancellation Policy).

Service request module with real-time admin alerts and email notifications.

Q&A module with moderation, answers and public FAQ publishing.

Blog CMS with SEO controls, scheduling and media library.

Script manager for head and body scripts with validation and rollback.

Razorpay payment integration with webhooks, receipts and reports.

Admin control system with role-based access control (RBAC), audit logs and settings.

POSH system: basic, standard and advanced tiers as defined in Section 8, plus the legal compliance engine, service catalogue, support systems, training and prevention suite defined in Sections 8.10 to 8.37.

Security hardening, automated and manual testing, CI/CD, deployment to production, monitoring, backups, documentation, training and a support period.


## 3.2 Out of scope (unless agreed through change control)

Mobile applications (iOS and Android). The website is responsive and installable behaviour is not required.

Legal case management for non-POSH matters (court diaries, billing and time tracking for litigation).

Video conferencing development. Hearings use external meeting links entered by the admin or IC.

Native SMS and WhatsApp messaging (can be added through paid third-party APIs; see Open Questions).

Content writing, legal drafting of the POSH policy and statutory templates, logo and brand design, photography.

Domain registration, hosting subscription and third-party service fees (these are client-owned costs).

Legal advice of any kind. The platform records and routes information. Legal decisions remain with Acorn and the Internal Committee.


## 3.3 Assumptions


## ID

Assumption


## A-1

Acorn will supply brand assets (logo, colours), content for all pages, partner and team profiles, and legal page text within the timeline agreed in Section 16.


## A-2

The client will open a Razorpay business account and complete KYC. The developer will integrate using test credentials until live keys are issued.


## A-3

A transactional email service (for example Amazon SES, Brevo or SendGrid) will be configured on the client domain with SPF, DKIM and DMARC records.


## A-4

The client nominates one decision-maker who consolidates feedback. Revision rounds are limited as per Section 16.


## A-5

POSH functionality is delivered as a service that Acorn operates on behalf of employer clients. Acorn staff act as administrators; employer-side users are onboarded as Organisation Admins and IC members.


## A-6

The statutory content, timelines and templates configured in the POSH module will be reviewed and approved by Acorn's own legal team before production use.


## A-7

Traffic is expected to be small to moderate (up to roughly 50,000 visits per month) in the first year. The architecture allows scale-up without redesign.


## A-8

English is the primary language. Bengali and Hindi content support is an optional enhancement (Section 12, NFR-020).


## 3.4 Constraints

Technology: MongoDB, Express.js, React and Node.js as the primary stack.

Data residency: personal and complaint data should be stored in India-based infrastructure where practical, subject to the hosting decision in Section 15.

Regulatory: the platform must be designed with the Indian IT Act 2000, the Digital Personal Data Protection Act 2023 and its rules, the POSH Act 2013 and the Bar Council of India rules on advertising and solicitation in mind (see Appendix B). Applicability and timelines of these laws are to be confirmed by Acorn's counsel.

Payments: all card, UPI and netbanking data is handled by Razorpay. The platform never stores card numbers, CVV or UPI PINs.


## 3.5 Dependencies

Dependency

Owner

Needed by

Final site content, logo, brand guidelines

Acorn

Before design sign-off

Razorpay account with KYC and live keys

Acorn

Before payment UAT

Domain name and DNS access

Acorn

Before staging and production

Email sending domain and DNS records

Acorn and developer

Before notification testing

Cloud or VPS hosting account

Acorn (or developer-managed with pass-through cost)

Before staging

POSH policy text, statutory templates, notice formats

Acorn legal team

Before POSH build starts

Legal page text (privacy, terms, disclaimer)

Acorn legal team

Before go-live


## 4. Stakeholders, User Personas and Role Model


## 4.1 Stakeholders

Stakeholder

Interest

Involvement

Managing Partner / Owner, Acorn

Brand, revenue, confidentiality, risk

Sponsor, approves scope and go-live

Acorn legal consultants and associates

Handle requests, Q&A, POSH cases

Primary admin users, UAT participants

Acorn operations / marketing

Blog, scripts, analytics, enquiries

Content and marketing admins

Employer organisations (POSH clients)

Statutory compliance and protection from liability

Organisation Admins, IC members

Employees (complainants and respondents)

Safe, confidential and fair process

End users of POSH module

Website visitors and prospective clients

Understand services, ask questions, pay, enquire

Public users

Development team

Deliver to scope, quality and security

Build, test, deploy, support


## 4.2 User personas

Persona

Profile and goals

Key needs

Aarav, prospective business client

Startup founder in Kolkata needing contract and compliance support

Fast clarity on services, easy enquiry form, trust signals, ability to pay a consultation fee online

Meera, HR head at a mid-size employer

Must comply with POSH, constitute an IC and file annual reports

Secure setup of the committee, case tracking against timelines, ready-made reports, training for staff

An employee (complainant)

Wants to raise a concern safely

Simple, private, non-intimidating complaint form, confirmation of receipt, status visibility, option to withdraw or request conciliation, assurance of confidentiality

An employee (respondent)

Has been named in a complaint

Clear notice, access to the complaint copy as permitted by law, time-bound reply, fair opportunity to respond

IC Presiding Officer / member

Runs the inquiry

Case file in one place, deadline alerts, hearing scheduling, evidence vault, report templates, conflict-of-interest declaration

Acorn administrator

Oversees all activity

Dashboard, real-time alerts, moderation tools, audit trail, control over content and scripts

Acorn Super Admin

Owns the platform

User and role management, system settings, payment configuration, security and audit visibility


## 4.3 Role model (RBAC)

The platform uses role-based access control with least privilege. Roles are assigned per user and, for POSH, scoped per organisation and per case. The POSH roles are deliberately separated from Acorn's general admin roles so that marketing or content staff can never see complaint data.

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


## 5. Release Strategy and Phasing

The product is built in clear phases so that Acorn gets a working, revenue-capable website early and the sensitive POSH system is built and tested with the care it needs. Each phase is independently deployable and has its own acceptance criteria. Phase 1 can go live on its own.

Phase

Name

Main deliverables

Indicative duration

1

Website and Core Admin

Homepage, landing pages, About, Practice Areas, Contact, legal pages, service request form with email alert, blog and script control (basic admin), Razorpay payments, deployment

2 to 3 weeks

2

Engagement and Real-Time Admin

Real-time dashboard alerts (Socket.io), Q&A moderation and public FAQ, full RBAC, audit logs, notification centre, reports

2 to 3 weeks

3

POSH Basic and Standard

Complaint intake, case ID, tracking, IC setup, notices, hearings, document vault, statutory timers, case reports, confidentiality controls

4 to 5 weeks

4

POSH Advanced

Multi-organisation tenancy, policy library, annual report generator, compliance health score, analytics, retention automation, external integrations

3 to 4 weeks

5

Service, Support and Training Suite

POSH service catalogue and subscriptions, helpdesk and support directory, training (LMS), prevention surveys, aftercare, service desk tooling, legal content governance console

4 to 5 weeks


## 5.1 Feature tiers for the POSH system

Tier

Intended for

Highlights

Basic

Start-up POSH offering to a few clients

Complaint form, case ID, status tracking, admin case list, email and real-time alerts, document upload, audit log

Standard

Production-grade compliance service

Basic plus IC management, notices, hearing scheduler, statutory timeline engine, evidence vault, findings and report templates, conciliation workflow

Advanced

Scalable multi-client compliance platform

Standard plus multi-organisation tenancy, policy acknowledgement, annual report generator, compliance health score, analytics, reminders, data retention automation, API hooks

Service and Support Suite

Acorn as a full-service POSH provider

Advanced plus service catalogue and subscriptions, helpdesk, support directory, training and quizzes, climate surveys, aftercare and retaliation monitoring


## 5.2 Delivery principles

Security and confidentiality are built in from the first sprint, not added at the end.

Every phase ends with a demo, a test report and a signed acceptance record.

Changes after sign-off follow change control with a written estimate (Section 16.5).

Environments are separated: development, staging and production, with production access restricted and logged.


## 6. Public Website, Landing Pages and Engagement Features


## 6.1 Design principles

Trust first: restrained, professional visual language that matches the brand promise. Generous whitespace, strong typography, no clutter or stock-photo excess.

Clarity of action: every page has one primary call to action (Request a Consultation, Ask a Question, Report a Concern, Pay Fee).

Mobile first: most visitors in India browse on mobile. Layouts are designed for 360 px width upward.

Speed and accessibility: fast loading and WCAG 2.1 AA compliance.

Professional conduct: content and layout respect advocates' rules on advertising and solicitation (Appendix B).


## 6.2 Sitemap

Page / Area

URL pattern

Purpose

Phase

Homepage

/

Brand introduction, services overview, trust, calls to action

1

About Us

/about

Firm profile, philosophy, values, team (if approved by client)

1

Practice Areas (index)

/services

List of legal services with summaries

1

Practice Area (detail)

/services/:slug

Detail page per service with FAQs and request CTA

1

POSH landing page

/posh

Dedicated page for POSH compliance and the POSH platform

1 (content), 3 and 4 (platform links)

Campaign landing pages

/lp/:slug

Focused pages for ads and campaigns, created by admin from templates

2

Blog (index)

/blog

Articles with categories, tags and search

1

Blog article

/blog/:slug

Single article with SEO metadata, share links, related posts

1

FAQ and Q&A

/faq

Searchable published questions and answers; ask-a-question form

2

Request a Service

/request-service

Structured service request form

1

Contact

/contact

Address, phone, email, map link, contact form

1

Pay Online

/pay

Select service or enter invoice reference and pay via Razorpay

1

Payment status and receipt

/pay/status/:id

Success, failure, pending and receipt download

1

Legal pages

/privacy, /terms, /disclaimer, /cookies, /refund-policy

Statutory and policy pages

1

POSH portal (login)

/posh/portal

Entry to complaint filing, IC workspace and organisation dashboard

3

Admin panel

/admin

Protected admin interface (not indexed)

1 and 2

404 and error pages

*

Helpful navigation and branded error handling

1


## 6.3 Homepage

The homepage presents Acorn as a thoughtful, precise and trustworthy legal partner. Sections are managed from the admin panel where marked (CMS), so that text, images and order can be changed without a developer.

Section

Content and behaviour

CMS editable

Header and navigation

Logo, menu (Home, About, Services, POSH, Blog, FAQ, Contact), prominent Request Consultation button, sticky on scroll, accessible mobile menu

Menu items, button label

Hero

Headline "Excellence in Law. Integrity in Practice.", sub-headline describing the consultancy, primary CTA (Request a Consultation), secondary CTA (Explore Services)

Yes

Who we are

Short introduction drawn from the firm profile, with link to About

Yes

Practice areas grid

Cards for advisory, legal documentation, dispute resolution, representation, corporate and commercial support, POSH compliance. Each links to a service page

Yes (add, order, hide)

Our philosophy

Statement: to protect what matters, navigate complexity with confidence and uphold the highest standards of professional integrity

Yes

Why Acorn

Four to six pillars: integrity, strategic insight, commercial understanding, discretion, diligence, transparency

Yes

How we work

Simple process steps: enquire, understand, advise, act, review

Yes

POSH compliance highlight

Callout to the POSH landing page and the secure POSH portal

Yes

Latest insights

Three most recent blog posts

Automatic

Frequently asked questions

Top published Q&A items with link to the full FAQ

Automatic and pinned items

Call to action band

Request a consultation or pay a fee online

Yes

Footer

Address, contact, links, legal pages, social links, disclaimer line, copyright

Yes


## ID

Requirement

Priority

Phase


## WEB-001

The homepage shall render all sections above, in the order set in the admin panel, with server-side metadata for SEO.

Must

1


## WEB-002

The site shall be fully responsive for widths from 360 px to 1920 px and tested on current Chrome, Edge, Safari and Firefox and on Android and iOS browsers.

Must

1


## WEB-003

Every page shall have a unique title, meta description, canonical URL, Open Graph and Twitter card tags, editable by admin for blog and service pages.

Must

1


## WEB-004

The site shall generate sitemap.xml and robots.txt automatically, and expose structured data (Organization, LegalService, Article, FAQPage, BreadcrumbList).

Should

1


## WEB-005

Images shall be optimised (WebP or AVIF where supported, responsive sizes, lazy loading) and carry alt text.

Must

1


## WEB-006

A cookie consent banner shall block non-essential scripts (analytics, pixels) until the visitor consents, and record the choice.

Must

1


## WEB-007

The footer shall show the approved professional disclaimer on every page.

Must

1


## WEB-008

A click-to-call and click-to-email action shall be available on mobile in the header and contact page.

Should

1


## 6.4 Landing pages


## 6.4.1 POSH landing page (/posh)

This page explains the POSH Act in plain language, positions Acorn's POSH compliance service and routes users to the right action. It is a trust and conversion page and must be reviewed by Acorn's legal team.

Block

Content

Hero

Headline on safe, compliant workplaces; CTAs: Book a POSH Consultation, Report a Concern (to the portal), Download Compliance Checklist

Why POSH compliance matters

Plain-language summary of obligations: Internal Committee, policy, awareness, annual report, penalties for non-compliance

What Acorn offers

Policy drafting, IC constitution support, IC member training, inquiry assistance, annual report filing support, employee awareness sessions, the secure case management platform

How the platform works

Step list: file, acknowledge, inquire, report, act, close; confidentiality assurances

Who it is for

Employers of all sizes, including those with fewer than ten employees (where a Local Committee at district level applies) and unorganised sector context

Confidentiality and trust

Statement of data protection, access controls, encryption and audit

Resources

Downloadable checklist, sample policy outline, FAQs, links to relevant blog posts


## POSH FAQ

Questions on who must constitute an IC, time limits, confidentiality, conciliation, penalties

Contact and request form

Short form to request a POSH consultation (feeds the service request module with category POSH)


## 6.4.2 Service landing pages

Each practice area has a landing page with an overview, who it is for, typical engagements, process, related articles, FAQs and a request-service button that pre-selects the service category.


## 6.4.3 Campaign landing pages (admin generated)


## ID

Requirement

Priority

Phase


## LP-001

Admin shall create campaign landing pages from approved templates (hero, benefits, trust, FAQ, form) with a custom URL slug, title and SEO fields.

Should

2


## LP-002

Each campaign page shall support UTM parameter capture and store the source with every request submitted from the page.

Should

2


## LP-003

Campaign pages shall be publishable, unpublishable and duplicable, with a preview link for unpublished versions.

Should

2


## LP-004

Campaign pages shall be excluded from search indexing if the admin ticks the no-index option.

Could

2


## 6.5 Service request module

Visitors submit service requests that are stored in the database, assigned a unique reference, emailed to the admin immediately and pushed to the admin dashboard in real time.


## 6.5.1 Form fields

Field

Type

Validation

Required

Full name

Text

2 to 80 characters, letters and common punctuation

Yes

Email

Email

RFC-valid; domain MX check optional

Yes

Mobile number

Phone

Indian format (+91, 10 digits) with international option

Yes

Client type

Select

Individual, Business, Organisation

Yes

Organisation name

Text

Shown if Business or Organisation

Conditional

City

Text

2 to 60 characters

No

Service category

Select

Advisory, Legal Documentation, Dispute Resolution, Representation, Corporate and Commercial, POSH Compliance, Other

Yes

Subject

Text

5 to 120 characters

Yes

Description

Textarea

20 to 3,000 characters

Yes

Preferred contact mode and time

Select

Phone, Email, Video call; time window

No

Attachments

File upload

Up to 3 files, 5 MB each; PDF, DOCX, JPG, PNG; malware scanned

No

Consent

Checkbox

Consent to be contacted and to data processing per Privacy Policy

Yes

Anti-spam

Honeypot and CAPTCHA

Cloudflare Turnstile or Google reCAPTCHA v3

Yes


## 6.5.2 Request lifecycle

Status

Meaning

Set by

New

Received and unread

System

In Review

Opened and being assessed

Admin

Contacted

Client has been contacted

Admin

Awaiting Client

Waiting for documents or response

Admin

Proposal Sent

Quote or engagement terms shared

Admin

Converted

Became an engagement

Admin

Closed

Closed without engagement, with reason

Admin

Spam

Marked as spam; excluded from reports

Admin or system


## ID

Requirement

Priority

Phase


## SR-001

On submission the system shall validate on client and server, save the request, generate a reference in the format ACN-SR-YYYY-NNNNNN and show a confirmation page with the reference.

Must

1


## SR-002

The system shall send an email to the admin distribution list within 60 seconds containing the reference, name, contact, category, subject and a secure link to the admin record. Sensitive attachments are not attached; they are linked.

Must

1


## SR-003

The system shall send an acknowledgement email to the requester with the reference and expected response time.

Must

1


## SR-004

The admin dashboard shall display a new-request alert (toast, badge counter and optional sound) within 5 seconds of submission, through a WebSocket (Socket.io) connection.

Must

2


## SR-005

Admin shall filter, search, sort, assign, add internal notes, change status, set follow-up dates and export requests to CSV.

Must

1


## SR-006

The system shall rate-limit submissions (for example 5 per hour per IP) and discard bot submissions detected by honeypot or CAPTCHA.

Must

1


## SR-007

The system shall prevent duplicate submissions within 2 minutes from the same email with identical content.

Should

1


## SR-008

Each status change shall be recorded in an activity timeline with user and timestamp.

Must

2


## SR-009

The admin shall be able to reply to the requester from the panel; replies are sent by email and stored in the thread.

Should

2


## SR-010

Unattended requests older than a configurable threshold (default 24 hours) shall trigger a reminder email to the admin.

Could

2


## 6.6 Q&A support module

The Q&A module lets visitors ask questions. Admin moderates and answers, and may publish a question and answer to the public FAQ. Private questions remain confidential and are never published without explicit consent and anonymisation.


## ID

Requirement

Priority

Phase


## QNA-001

Visitors shall submit a question with name (optional), email (required for reply), category, question text (20 to 1,500 characters) and a choice: Private reply only, or Allow publishing after anonymisation.

Must

2


## QNA-002

Each question shall receive a reference ID and enter the moderation queue with status Pending.

Must

2


## QNA-003

Admin shall answer from the panel using a rich text editor. The answer is emailed to the asker.

Must

2


## QNA-004

Admin shall be able to edit, anonymise and publish a question and answer to the public FAQ, assign a category, pin it and set display order.

Must

2


## QNA-005

Statuses: Pending, Answered, Published, Declined (with reason), Spam. Declined questions can send a polite templated message.

Must

2


## QNA-006

The public FAQ shall support search, category filter, accordion display and FAQPage structured data.

Must

2


## QNA-007

The system shall show a standard disclaimer that answers are general information and do not create a lawyer-client relationship.

Must

2


## QNA-008

Admin shall define reusable answer templates (canned responses).

Should

2


## QNA-009

The system shall suggest similar published answers to the asker while typing (to reduce duplicates).

Could

2


## QNA-010

The system shall apply spam and profanity filtering and rate limiting on submissions.

Must

2


## QNA-011

Admin shall be notified in real time and by email of each new question; daily digest option for pending items.

Should

2


## 6.7 Blog (content management)


## ID

Requirement

Priority

Phase


## BLG-001

Admin shall create, edit, preview, schedule, publish, unpublish, archive and delete articles with title, slug, excerpt, body, cover image, categories, tags, author, publish date, SEO title, SEO description, canonical URL and no-index option.

Must

1


## BLG-002

The editor shall be a sanitised rich text editor (for example TipTap or Quill) supporting headings, lists, tables, links, quotes, images and embedded video links. HTML output shall be sanitised on the server to prevent stored XSS.

Must

1


## BLG-003

The system shall provide a media library with upload (JPG, PNG, WebP up to 5 MB), automatic resizing, alt text and reuse.

Must

1


## BLG-004

Article status workflow: Draft, In Review, Scheduled, Published, Archived. Content Editors can submit for review; Admin publishes.

Should

2


## BLG-005

The public blog shall support pagination, category and tag pages, search, related posts, estimated reading time and social share links.

Must

1


## BLG-006

The system shall store revision history for each article and allow restore of an earlier version.

Should

2


## BLG-007

The system shall generate an RSS feed and include articles in the sitemap.

Could

2


## BLG-008

Slug changes shall create automatic 301 redirects from the old URL.

Should

2


## 6.8 Script management (admin control over scripts)

This module lets authorised staff add marketing and analytics scripts without a developer, while protecting the site from broken or malicious code. Scripts are a major security risk: a single bad script can steal data from every visitor. The module therefore includes validation, approval and an instant kill switch.


## ID

Requirement

Priority

Phase


## SCR-001

Admin shall add a script with name, description, placement (head, body start, body end), page scope (all pages, selected paths, or excluded paths), category (Analytics, Marketing, Chat, Functional) and code or URL.

Must

1


## SCR-002

Scripts shall be enabled, disabled or deleted individually, with an immediate effect after a cache refresh of no more than 60 seconds.

Must

1


## SCR-003

Scripts categorised as Analytics or Marketing shall load only after the visitor gives consent through the cookie banner.

Must

1


## SCR-004

Only Super Admin and Marketing Manager roles can create or change scripts. Every change is audit logged with before and after values.

Must

1


## SCR-005

The system shall warn on risky patterns (for example eval, document.write, unknown external domains) and require explicit confirmation. A configurable allow-list of script domains shall be supported.

Should

2


## SCR-006

The system shall set a Content Security Policy that permits only allow-listed script sources and nonces, and shall never run scripts on admin, payment or POSH portal pages.

Must

1


## SCR-007

A global kill switch shall disable all custom scripts instantly.

Must

1


## SCR-008

Admin shall preview a script on a test URL before enabling it site-wide.

Could

2


## SCR-009

Scripts shall be versioned; the admin can roll back to a previous version.

Should

2


## 6.9 Payment gateway (Razorpay)

Online payment supports consultation fees, service packages and invoice settlement. Razorpay handles all sensitive payment data. The platform creates orders, verifies signatures on the server and treats webhook events as the source of truth.


## 6.9.1 Payment flow

Step

Action

System behaviour

1

User selects a service or enters an invoice reference and amount

Server validates the item and amount against the catalogue or invoice; the amount is never trusted from the browser

2

Server creates a Razorpay order

Order ID, amount in paise, currency INR, receipt number and notes stored with status Created

3

User pays in Razorpay Checkout

UPI, cards, netbanking, wallets as enabled on the account

4

Client returns payment ID, order ID and signature

Server verifies the HMAC-SHA256 signature using the key secret; only then marks the payment Verified

5

Razorpay sends webhooks (payment.captured, payment.failed, refund events)

Webhook signature verified; event processing is idempotent; status updated to Paid, Failed or Refunded

6

Receipt and notifications

Receipt PDF generated, emailed to the payer and visible to admin; admin alert sent

7

Reconciliation

Admin and Finance can export transactions and compare with Razorpay settlement reports


## ID

Requirement

Priority

Phase


## PAY-001

The system shall integrate Razorpay Orders API and Checkout with test mode and live mode switchable by Super Admin through environment configuration.

Must

1


## PAY-002

The server shall verify the payment signature and reconcile the order with Razorpay before marking a payment as paid. A payment is never marked paid on the client's word alone.

Must

1


## PAY-003

The server shall process Razorpay webhooks with signature verification, idempotency keys and replay protection, and shall recover from missed webhooks through a scheduled reconciliation job that queries pending orders.

Must

1


## PAY-004

The system shall store: order ID, payment ID, amount, currency, method, status, payer name, email, mobile, service or invoice reference, timestamps, and gateway error codes. It shall never store card numbers, CVV, UPI PIN or full bank details.

Must

1


## PAY-005

The admin shall manage a service and price catalogue (name, description, amount, GST rate, active flag) and generate payment links for specific amounts.

Must

1


## PAY-006

The system shall calculate GST as configured (for example 18% for legal services) and show a tax breakup on the receipt and invoice. Final tax treatment is to be confirmed by Acorn's accountant.

Should

1


## PAY-007

The system shall generate a PDF receipt or invoice with sequential numbering, Acorn's GSTIN and details, and email it on success.

Must

1


## PAY-008

Admin or Finance shall initiate full or partial refunds from the panel where Razorpay permits, with reason capture and audit logging.

Should

2


## PAY-009

The system shall display payment status pages for success, failure and pending, with retry and support guidance.

Must

1


## PAY-010

Finance shall view, filter and export payment reports (date range, status, method, service) as CSV and PDF.

Must

2


## PAY-011

Refund, cancellation and shipping-delivery (not applicable) policy pages shall be published as required by the gateway.

Must

1


## PAY-012

All payment endpoints shall be rate-limited and monitored for abnormal failure spikes with alerts to admin.

Should

2


## 6.10 Contact and legal pages


## ID

Requirement

Priority

Phase


## CON-001

The contact page shall show address, phone, email, working hours, and a contact form with the same anti-spam protection as the service request form.

Must

1


## CON-002

Legal pages (Privacy Policy, Terms of Use, Disclaimer, Cookie Policy, Refund and Cancellation Policy) shall be editable by Admin and versioned with an effective date.

Must

1


## CON-003

The site shall display a standard notice that the website is for information only, does not constitute solicitation or advertisement, and that browsing it does not create a lawyer-client relationship, in line with the approved text from Acorn's counsel.

Must

1


## 7. Admin Control System

The admin panel is the control centre for the whole platform. It is a secure React single-page application backed by role-protected APIs. It provides one place to operate content, enquiries, payments, scripts, users and (through separate permissions) POSH operations.


## 7.1 Module overview

Module

Functions

Primary roles

Dashboard

Live counters (new requests, pending questions, payments today, open POSH cases by stage), recent activity, deadlines, charts of enquiries and revenue

All admin roles (widgets depend on role)

Service requests

List, filter, assign, notes, status, reply, export, follow-up reminders

Super Admin, Admin, Support


## Q&A

Moderation queue, answer editor, publish to FAQ, templates

Super Admin, Admin, Support, Content Editor

Blog and pages

Articles, categories, tags, media library, homepage sections, service pages, landing pages, menus, SEO

Super Admin, Admin, Content Editor

Scripts and SEO

Script manager, kill switch, redirects, metadata defaults, sitemap controls

Super Admin, Marketing Manager

Payments and catalogue

Service catalogue, payment links, transactions, refunds, receipts, reports

Super Admin, Admin, Finance

Users and roles

Create, deactivate, reset, role assignment, session and device view, force logout

Super Admin

POSH operations

Organisations, IC setup, cases, timelines, reports, templates (see Section 8)

POSH Administrator, Super Admin

POSH service catalogue and subscriptions

Plans, add-ons, usage limits, subscriptions, orders, invoices (see Section 8.12)

POSH Administrator, Finance, Super Admin

Helpdesk and support directory

Tickets, SLAs, knowledge base, helpline and referral directory, interpreter and counsellor panel (see Sections 8.13 and 8.29)

POSH Administrator, Intake Counsellor, Support

Training and prevention

Courses, quizzes, certificates, attendance, climate surveys, risk assessments (see Sections 8.23 and 8.24)

POSH Administrator, Organisation Admin

Legal rules and content governance

Effective-dated statutory parameters, holiday calendars, template versions, statutory watch list (see Section 8.30)

Legal Administrator, Super Admin

Notifications

Notification centre, preferences, email templates, digests

All

Reports

Enquiry funnel, response times, Q&A stats, payments, blog performance, POSH compliance summary

Super Admin, Admin, Finance

Audit log

Immutable log of sensitive actions with filters and export

Super Admin (read only)

Settings

Site settings, contact details, SMTP, Razorpay mode, security settings, retention rules, backup status

Super Admin


## 7.2 Authentication and account management


## ID

Requirement

Priority

Phase


## ADM-001

Admin login with email and password. Passwords hashed with Argon2id or bcrypt (cost 12 or higher). Minimum length 12 characters with breach-list check.

Must

1


## ADM-002

Mandatory multi-factor authentication (TOTP authenticator app) for Super Admin, Admin, Finance and all POSH roles. Backup codes provided.

Must

2


## ADM-003

Short-lived access tokens (15 minutes) and rotating refresh tokens stored in httpOnly, secure, SameSite cookies. Refresh token reuse detection revokes the session family.

Must

1


## ADM-004

Account lockout or progressive delay after 5 failed attempts, with email alert to the user and Super Admin.

Must

1


## ADM-005

Forgot and reset password via single-use, expiring (30 minutes) link. Invite-based onboarding of new users with forced password and MFA setup.

Must

1


## ADM-006

Idle session timeout (default 30 minutes) with warning, absolute session limit of 12 hours, and device and session list with remote logout.

Should

2


## ADM-007

Optional IP allow-listing for Super Admin and POSH roles.

Could

2


## 7.3 Dashboard and real-time features


## ID

Requirement

Priority

Phase


## ADM-010

The dashboard shall show real-time counters and a live activity feed using WebSockets (Socket.io) with authenticated connections and room-based authorisation, so that a user only receives events they are permitted to see.

Must

2


## ADM-011

Real-time events shall include: new service request, new question, payment success or failure, new POSH complaint (metadata only, never content), approaching or breached POSH deadline, and security alerts.

Must

2


## ADM-012

If the WebSocket is unavailable, the client shall fall back to polling at a modest interval and the system shall still send email alerts.

Must

2


## ADM-013

A notification centre shall store alerts with read and unread status, and users shall choose channels (in-app, email) per event type.

Should

2


## ADM-014

The dashboard shall present charts for requests per day, conversion by source, response time, payments by status and Q&A backlog.

Should

2


## 7.4 Content, user and settings control


## ID

Requirement

Priority

Phase


## ADM-020

Admin shall edit homepage sections, menus, footer, contact details and legal pages through forms with preview and publish controls.

Must

1


## ADM-021

Super Admin shall create, edit, deactivate and delete users, and assign roles and permissions from a permission matrix.

Must

1


## ADM-022

All list screens shall support server-side pagination, sorting, filtering, search and CSV export subject to role permission.

Must

1


## ADM-023

Destructive actions shall require confirmation, and critical items (users, payments, POSH records) shall use soft delete with retention rules.

Must

1


## ADM-024

The audit log shall record actor, role, action, entity, before and after values (redacted for sensitive fields), IP address, user agent and timestamp. It is append-only and cannot be edited through the application.

Must

1


## ADM-025

Super Admin shall configure email sender details, notification recipients, Razorpay mode, rate limits and retention periods from the settings screen, with secrets stored only in the server environment and never returned to the browser.

Should

2


## ADM-026

A maintenance mode switch shall show a branded notice to visitors while admin retains access.

Could

2


## 7.5 Permission matrix (summary)

R = read, C = create, U = update, D = delete, P = publish or approve, X = export. A dash means no access.

Module

Super Admin

Admin

Content Editor

Marketing Mgr

Support

Finance

POSH Admin

Service requests


## R C U D X


## R U X

-

R (counts)


## R U

-

-


## Q&A


## R C U D P


## R U P


## R U

-


## R U

-

-

Blog and pages


## R C U D P


## R C U P


## R C U

-

-

-

-

Scripts and SEO


## R C U D P


## R

-


## R C U P

-

-

-

Payments


## R U X


## R

-

-

-


## R U X

-

Users and roles


## R C U D

-

-

-

-

-

-

POSH organisations


## R C U

-

-

-

-

-


## R C U

POSH cases

Break-glass only (logged)

-

-

-

-

-

Assigned cases only

Audit log


## R X

-

-

-

-

-

-

Settings


## R U

-

-

-

-

-

-


## 8. POSH Compliance and Case Management System (Basic to Advanced)

This module digitises the workflow required under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 ("POSH Act") and the rules made under it. It is designed so that Acorn can run a secure compliance service for employer clients. The system supports the process; it does not make legal determinations.


## 8.1 Legal and compliance background used to shape the product

The table below summarises the main statutory touchpoints that drive features. Acorn's legal team must verify every item, including current amendments, state-specific rules and Local Committee arrangements, before configuration.

Topic

Summary of requirement (to be verified by counsel)

Product implication

Internal Committee (IC)

Employers with 10 or more employees at an office or branch constitute an IC. The Presiding Officer is a senior woman employee; the committee has at least two employee members committed to women's causes or with legal or social work experience, and one external member from an NGO or with legal knowledge; at least half the members are women.

Committee composition validator, external member flag, member term tracking, vacancy alerts

Local Committee (LC)

For establishments with fewer than 10 employees, or where the complaint is against the employer, the District Officer constitutes a Local Committee.

Organisation type setting; complaint routing note; case export for LC referral where applicable

Written complaint and time limit

A complaint is made in writing, generally within 3 months of the incident (or the last incident in a series), extendable by a further 3 months for recorded reasons. The IC must provide assistance if the complainant cannot write.

Complaint form with incident date, limitation check, extension request workflow, assisted filing by IC member

Conciliation

On the complainant's request, the IC may attempt settlement before inquiry. No monetary settlement as the basis of conciliation. Recorded settlement is forwarded to the employer for action.

Conciliation workflow with consent capture and settlement record; inquiry paused and resumed

Notice and reply

The IC sends a copy of the complaint and documents to the respondent within 7 working days of receipt; the respondent files a reply with documents and a witness list within 10 working days of receiving the copy (2013 Rules, counsel to verify rule numbers).

Notice generator, 7-day dispatch timer, 10-day reply timer, document exchange log

Inquiry

The IC follows principles of natural justice, gives both parties a hearing, and completes the inquiry within 90 days.

90-day countdown, hearing scheduler, minutes, evidence vault, extension and delay reasons

Inquiry report and action

The IC submits its report to the employer within 10 days of completing the inquiry; copies go to both parties. The employer acts on the recommendations within 60 days.

10-day and 60-day timers, report template, delivery receipts, action-taken record

Interim relief

On request, the IC may recommend interim measures such as transfer or leave.

Interim relief request and recommendation record

Appeal

An aggrieved party may appeal within 90 days of the recommendations as per service rules or the Act.

Appeal window tracker and appeal record

Confidentiality (Section 16)

Contents of the complaint, identity and addresses of parties and witnesses, inquiry proceedings, recommendations and action taken must not be published or made known to the public, press or media.

Strict RBAC, masking, encryption, watermarking, access logs, no public search of case data

Employer duties

Display a notice of penalties, organise awareness programmes, publish the IC details and policy, provide facilities, and cooperate with the inquiry.

Policy library, notice display tracker, training module, IC directory

Annual report

The IC prepares an annual report with the number of complaints received, disposed of and pending, which is included in the employer's annual report and submitted to the District Officer.

Annual report generator with statistical fields

Penalties

Non-compliance attracts a fine, with higher penalties for repeat offences and possible cancellation of licences.

Compliance health score and gap alerts for organisations


## 8.2 Actors and portal structure

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


## 8.3 Case lifecycle and statutory timers

Stage

Description

Timer or rule

Who acts


## 1. Received

Complaint filed; case ID generated; acknowledgement issued

Acknowledge within 1 business day (configurable)

System, IC


## 2. Limitation check

Incident date compared with the 3-month window; extension request if outside

Alert if beyond 3 months; extension up to 3 months with recorded reason

IC Presiding Officer


## 3. Preliminary review

Completeness check, conflict-of-interest declarations, assignment of IC members

Internal target (default 7 days)


## IC


## 4. Conciliation (optional)

If requested by the complainant, settlement attempt

Inquiry clock paused or not started; settlement record

IC, parties


## 5. Notice to respondent

Copy of complaint and notice of reply issued

Copy issued within 7 working days of receipt; reply due in 10 working days from respondent’s receipt of the copy


## IC


## 6. Inquiry

Statements, evidence, witnesses, hearings, minutes

90 days; anchor date configurable per organisation (default is the conservative anchor: date the complaint is received); countdown with 15, 7 and 3-day alerts


## IC


## 7. Findings and report

Findings recorded; report prepared and signed

Submit within 10 days of completion

IC Presiding Officer


## 8. Employer action

Action recommended by IC is implemented

60 days from report receipt

Employer (Organisation Admin records)


## 9. Appeal window

Appeal tracking if any

90 days from recommendation

Parties, employer

10. Closed

Outcome recorded, retention clock starts

Retention per policy

IC, system

Withdrawn / Not proceeded

Complaint withdrawn, found outside jurisdiction, or referred (for example to LC)

Reason mandatory; audit logged


## IC


## 8.4 Basic tier requirements

The Basic tier delivers a safe, usable complaint intake and case tracking service. It can be offered to the first clients while Standard and Advanced features are built.


## 8.4.1 Complaint intake


## ID

Requirement

Priority

Phase


## POSH-B-001

Complainants shall file a complaint through a dedicated secure page. They may register with email or mobile verification (OTP), or file through a one-time secure link issued by the organisation or Acorn. Anonymous initial contact is supported by allowing a pseudonymous contact method; the legal requirement of a written complaint and identity is explained and handled by the IC.

Must

3


## POSH-B-002

The form shall capture: organisation (selected or invited), complainant name and contact, designation and department, respondent name and designation, date or date range of incident, place, description of the incident, witnesses (optional), whether the respondent is a colleague, superior, third party or the employer, relief sought, and optional supporting documents.

Must

3


## POSH-B-003

The form shall support saving a draft, resuming later, and an assisted mode where an IC member files on behalf of a complainant who cannot write, with the complainant's consent recorded.

Should

3


## POSH-B-004

On submission the system shall generate a case ID (format POSH-ORG-YYYY-NNNN), show an on-screen acknowledgement and email or SMS (if enabled) a receipt that contains no complaint content.

Must

3


## POSH-B-005

Attachments shall be accepted (PDF, DOCX, JPG, PNG, MP3, MP4 up to configurable limits), virus scanned, encrypted at rest and stored outside the web root with signed, expiring access links.

Must

3


## POSH-B-006

A plain-language privacy and confidentiality notice shall be shown before filing, with explicit consent to data processing for the inquiry.

Must

3


## 8.4.2 Tracking and notifications


## ID

Requirement

Priority

Phase


## POSH-B-010

The complainant shall see the case status (stage name only), next expected step and dates, upcoming hearings and notices addressed to them, without exposing internal IC deliberations.

Must

3


## POSH-B-011

The system shall email the IC Presiding Officer and the Acorn POSH Administrator a new-complaint alert containing the case ID, organisation and date only. Complaint text is never sent by email.

Must

3


## POSH-B-012

The system shall push a real-time alert to authorised POSH users on new complaints and status changes, with no sensitive text in the payload.

Must

3


## POSH-B-013

The complainant shall be able to withdraw the complaint or request conciliation through the portal, with confirmation and recording.

Should

3


## 8.4.3 Basic admin case management


## ID

Requirement

Priority

Phase


## POSH-B-020

The POSH Administrator shall view a case list for assigned organisations showing case ID, organisation, stage, age in days and next deadline. Complaint content is visible only to assigned IC users and, by logged break-glass, to Super Admin.

Must

3


## POSH-B-021

IC users shall update case status, add private notes, upload documents and record decisions in a chronological case diary.

Must

3


## POSH-B-022

Every view, download, edit and export of case data shall be written to the audit log with user, time and IP address.

Must

3


## POSH-B-023

The system shall mask party names in lists and dashboards by default, revealing them only inside the case file.

Should

3


## 8.5 Standard tier requirements


## 8.5.1 Internal Committee management


## ID

Requirement

Priority

Phase


## POSH-S-001

Organisation Admin or POSH Administrator shall create and maintain an IC: members, roles (Presiding Officer, employee members, external member), gender, tenure start and end, and contact details.

Must

3


## POSH-S-002

The system shall validate committee composition against the Act (a senior woman Presiding Officer, minimum number of members, one external member, at least half women) and show non-compliance warnings with the reason.

Must

3


## POSH-S-003

The system shall alert 60 days before an IC member's tenure ends (maximum three years under the Act) and when a vacancy exists.

Should

3


## POSH-S-004

IC members shall sign a confidentiality undertaking and a conflict-of-interest declaration for each case, recorded digitally before gaining access.

Must

3


## POSH-S-005

The system shall support recusal of a member and reassignment of case access with an audit trail.

Must

3


## POSH-S-006

Where an organisation has fewer than 10 employees or the complaint is against the employer, the system shall flag the matter as a Local Committee case and offer a referral export instead of IC workflow.

Should

3


## 8.5.2 Notices, hearings and evidence


## ID

Requirement

Priority

Phase


## POSH-S-010

The system shall generate notices (acknowledgement, notice to respondent, hearing notice, request for documents, findings intimation) from admin-managed templates with merge fields, and keep a record of issue and delivery (email delivery status and portal read receipt).

Must

3


## POSH-S-011

The respondent portal shall allow reply submission within the deadline, document upload, and request for time extension with IC decision recorded.

Must

3


## POSH-S-012

IC users shall schedule hearings with date, time, mode (in person or video link), participants and notice generation, and record minutes and attendance. Video links are entered manually.

Must

3


## POSH-S-013

A secure evidence vault shall store documents, statements, audio and video with hash values (SHA-256) at upload for integrity, per-file access rules, and a chain-of-custody log.

Must

3


## POSH-S-014

Witness statements shall be recorded as structured entries linked to the case, with the option to attach signed scans.

Should

3


## POSH-S-015

The system shall keep parties' documents separate and release them to the other party only when an IC member approves, in line with natural justice and confidentiality.

Must

3


## 8.5.3 Timeline engine, conciliation and reporting


## ID

Requirement

Priority

Phase


## POSH-S-020

A timeline engine shall compute and display deadlines (limitation, respondent reply, 90-day inquiry, 10-day report, 60-day action, appeal window) from recorded dates, The statutory 90-day period is never paused silently: only a recorded legal ground (for example a court stay order, or conciliation before an inquiry has begun) may stop or defer the clock, and any other delay needs a recorded reason code and is reported as pending beyond 90 days (see Section 8.16).

Must

3


## POSH-S-021

The system shall send escalating alerts to the Presiding Officer and the POSH Administrator at 15, 7, 3 and 1 days before each statutory deadline, and an overdue alert after the date passes.

Must

3


## POSH-S-022

A conciliation workflow shall capture the complainant's request, terms of settlement (with a guard that prevents monetary settlement as the basis), consent of both parties and IC's recorded outcome, and forward the record to the employer.

Must

3


## POSH-S-023

The IC shall record findings, reasons, recommendations and the proposed action using a structured report template. The final report is exportable as a locked PDF with a digital timestamp and sent to the employer and both parties through the portal.

Must

3


## POSH-S-024

The Organisation Admin shall record the employer's action taken within 60 days and attach supporting proof.

Must

3


## POSH-S-025

The system shall record interim relief requests and IC recommendations.

Should

3


## POSH-S-026

The system shall track the appeal window and appeals, if any.

Should

3


## POSH-S-027

Case closure shall require a closure note and outcome code (Substantiated, Not substantiated, Settled through conciliation, Withdrawn, Referred, Malicious or false complaint finding as per Act, Other), and shall start the retention clock.

Must

3


## 8.6 Advanced tier requirements


## 8.6.1 Multi-organisation platform


## ID

Requirement

Priority

Phase


## POSH-A-001

The platform shall support multiple client organisations with strict logical tenant isolation: every record carries an organisation ID, every query is scoped server-side, and automated tests prove that one tenant can never read another's data.

Must

4


## POSH-A-002

The Acorn POSH Administrator shall onboard an organisation with legal name, locations and branches, headcount by branch, IC details, contact persons, plan, and optional branding (logo on notices).

Must

4


## POSH-A-003

Organisation-specific settings shall include timelines defaults, notice templates, acknowledgement text, language, and retention period.

Should

4


## POSH-A-004

The system shall support multiple branches or offices per organisation, each with its own IC where required.

Should

4


## 8.6.2 Policy, awareness and training


## ID

Requirement

Priority

Phase


## POSH-A-010

A policy library shall host the organisation's POSH policy versions with effective dates and a record of employee acknowledgement (employee ID, date and version).

Must

4


## POSH-A-011

A training module shall provide awareness content (text, document and embedded video links) for employees, managers and IC members, with short quizzes and pass marks.

Should

4


## POSH-A-012

The system shall record training completion, generate certificates and show completion percentages per department.

Should

4


## POSH-A-013

The system shall track awareness sessions and workshops held (date, audience, trainer, attendance) for annual reporting.

Should

4


## POSH-A-014

The system shall help display the mandatory notice (penalties, IC details) by generating a printable notice and tracking where it is displayed.

Could

4


## 8.6.3 Annual report, analytics and compliance health


## ID

Requirement

Priority

Phase


## POSH-A-020

The annual report generator shall compile, per organisation and period, the number of complaints received, disposed of and pending for more than 90 days, workshops held, and actions taken, and output a formatted DOCX and PDF for the employer to submit and to include in its annual report.

Must

4


## POSH-A-021

Reports shall contain aggregate statistics only. No names or details that identify parties shall appear.

Must

4


## POSH-A-022

Analytics dashboards shall show cases by stage, average days per stage, overdue cases, resolution outcomes, department patterns (aggregated with minimum group size suppression to prevent re-identification), and training coverage.

Should

4


## POSH-A-023

A compliance health score per organisation shall assess IC validity, training coverage, policy currency, notice display, annual report status and overdue cases, and list gaps with recommended actions.

Should

4


## 8.6.4 Retention, integrations and administration


## ID

Requirement

Priority

Phase


## POSH-A-030

Retention rules shall be configurable per organisation (default to be confirmed by counsel). At the end of the period the system shall flag cases for review, then securely delete or archive under dual approval, leaving a non-identifying statistical record.

Should

4


## POSH-A-031

Reminder emails (and optionally SMS or WhatsApp through a paid provider) shall be configurable by event and by role, always without sensitive content.

Could

4


## POSH-A-032

A secured REST API and webhooks shall allow an organisation's HRMS to push employee directory data and receive aggregate compliance status, with scoped API keys and rate limits.

Could

4


## POSH-A-033

The system shall support encrypted export of a full case file (PDF bundle with index) for legal proceedings, restricted to the Presiding Officer and logged.

Should

4


## POSH-A-034

Bilingual interface (English and Bengali) for the complaint portal, with Hindi as an option.

Could

4


## 8.7 Confidentiality and data-protection controls specific to POSH

Section 16 of the POSH Act makes confidentiality a legal duty. The following controls are therefore mandatory and are tested explicitly (Section 14).

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


## 8.8 Templates to be supplied or approved by Acorn

Template

Used in

Owner

Complaint form wording and consent text

Complaint portal

Acorn legal team

Acknowledgement of complaint

Intake

Acorn legal team

Notice to respondent with complaint copy

Notice stage

Acorn legal team

Hearing notice and minutes format

Inquiry

Acorn legal team

Conciliation record format

Conciliation

Acorn legal team

Inquiry report format

Findings

Acorn legal team

Employer action-taken record

Action stage

Acorn legal team

Annual report format

Reporting

Acorn legal team

POSH policy template and notice of penalties

Policy library

Acorn legal team

Training content and quiz bank

Training module

Acorn legal team or training partner


## 8.9 POSH acceptance criteria


## ID

Acceptance criterion


## POSH-AC-1

A complaint filed on staging produces a case ID, an acknowledgement and alerts to authorised users without any complaint text in email or real-time payloads.


## POSH-AC-2

An unauthorised role (for example Content Editor, Support or an IC member not assigned to the case) receives HTTP 403 for every case endpoint, verified by automated tests.


## POSH-AC-3

Tenant isolation tests show no cross-organisation read or write across all case, document, report and user endpoints.


## POSH-AC-4

The timeline engine produces the correct deadlines for at least 20 documented scenarios, including pauses, extensions and conciliation.


## POSH-AC-5

Alerts are delivered at 15, 7, 3 and 1 days and on breach, in a time-travel test.


## POSH-AC-6

Evidence uploads store a SHA-256 hash, and a tamper test shows a hash mismatch alert.


## POSH-AC-7

Every access to case data appears in the audit log; the log cannot be edited through the application.


## POSH-AC-8

The annual report matches manual counts for a seeded test dataset and contains no identifying details.


## POSH-AC-9

Penetration test findings of critical or high severity on the POSH module are resolved and retested.


## POSH-AC-10

Acorn's legal team signs off all wording, templates and timelines in writing.


## 8.10 Legal and regulatory framework

Sections 8.10 to 8.32 deepen the POSH specification into a complete legal, service and operations design. They apply to every tier unless a phase is stated. The table maps each legal source to the platform feature that implements it. Status shows whether the point was checked against a published source during preparation of v2.0 (October 2026) or is carried from general knowledge and must be confirmed by Acorn’s counsel. Neither status is legal advice. The rules engine (Section 8.30) holds every number as an effective-dated parameter so that an amendment changes configuration, not code.

Ref

Instrument and provision

Obligation or rule (summary)

Platform response

Status


## LAW-01

Constitution of India, Articles 14, 15, 19(1)(g), 21

Equality, non-discrimination, freedom to practise a profession, life with dignity. Foundation of the right to a safe workplace.

Policy preamble text; dignity-first, trauma-informed design (Section 22.2)

Counsel to confirm


## LAW-02

Vishaka v. State of Rajasthan (1997)

Supreme Court guidelines requiring a complaints mechanism, awareness and protection from victimisation, until the Act was passed.

Basis of non-victimisation controls (retaliation monitoring, Section 8.19)

Counsel to confirm


## LAW-03

Apparel Export Promotion Council v. A.K. Chopra (1999)

Sexual harassment is judged by the unwelcome nature of conduct; intent of the harasser is not decisive.

Training content and IC conduct guide (Sections 8.17 and 8.23)

Counsel to confirm


## LAW-04

Medha Kotwal Lele v. Union of India (2013)

Directed compliance with the Vishaka guidelines and treated complaints committees as inquiry authorities for disciplinary action.

Case outcome feeds the employer’s disciplinary process (Section 8.18)

Counsel to confirm


## LAW-05

Aureliano Fernandes v. State of Goa (2023) and Supreme Court orders of 12 May 2023, 22 Oct 2024 and 3 Dec 2024

Found widespread non-compliance; ordered district-wise compliance surveys; directed notification of a District Officer in every district, constitution of Local Committees, appointment of Nodal Officers at block, taluka, tehsil or municipality level who forward complaints to the Local Committee within 7 days, publication of Nodal Officer details, SHe-Box use, and access through Legal Service Clinics, paralegals and the legal helpline 15100.

Compliance health score, SHe-Box registration helper, Local Committee referral pack, helpline directory (Sections 8.13, 8.21 and 8.22)

Source-checked


## LAW-06

POSH Act 2013, Section 2 (definitions)

Aggrieved woman: a woman of any age, employed or not. Employee: regular, temporary, ad hoc, daily wage, contract, probationer, trainee, apprentice, co-worker, with or without the principal employer’s knowledge, paid or voluntary. Workplace is wide: any place visited in the course of employment, employer-provided transport, and a dwelling place or house. Sexual harassment means unwelcome acts: physical contact and advances, demand or request for sexual favours, sexually coloured remarks, showing pornography, or other unwelcome physical, verbal or non-verbal conduct of a sexual nature.

Applicability wizard and harassment taxonomy on the intake form (Sections 8.11 and 8.14)

Counsel to confirm


## LAW-07


## Section 3 (prevention and circumstances)

No woman shall be subjected to sexual harassment. Circumstances that may amount to it include an implied or explicit promise of preferential treatment, threat of detrimental treatment, threat about present or future employment status, interference with work or an intimidating, offensive or hostile environment, and humiliating treatment likely to affect health or safety.

Taxonomy values for quid pro quo, threat and hostile environment on the form

Counsel to confirm


## LAW-08


## Section 4 (Internal Committee)

Written order constituting an IC at each office or branch with 10 or more employees. Presiding Officer is a senior-level woman employee (from another office if none is available). At least two employee members committed to women’s causes or with social work or legal knowledge, and one external member from an NGO or association committed to women’s causes or familiar with sexual harassment issues. At least half the members are women. Maximum term of three years from nomination.

IC composition validator, tenure alerts, external member panel (Section 8.5.1, POSH-S-001 to S-006)

Source-checked


## LAW-09

Sections 5 to 7 (District Officer, Local Committee)

Appropriate government notifies a District Officer. The Local Committee handles establishments with fewer than 10 employees and complaints against the employer, and works in addition to ICs. Nodal Officers forward complaints within 7 days.

Routing rules RT-02, RT-03, RT-04; referral pack (Sections 8.11 and 8.22)

Source-checked (Nodal Officer point); counsel to confirm composition


## LAW-10


## Section 9 (complaint)

Written complaint within three months of the incident (of the last incident in a series). The IC may extend by up to a further three months for recorded reasons. If the woman cannot write, the IC renders all reasonable assistance. If she is incapacitated or has died, her legal heir or another prescribed person may complain.

Limitation check, extension workflow, assisted filing, representative filing (Sections 8.14 to 8.16)

Source-checked (three months); counsel to confirm extension and representative rules


## LAW-11


## Section 10 (conciliation)

Before an inquiry and only at the woman’s request, the IC may attempt settlement. No monetary settlement as the basis of conciliation. The settlement is recorded and forwarded to the employer to act on; copies go to both parties; no further inquiry if terms are honoured; if terms are not complied with, the woman may ask the IC to proceed.

Conciliation workflow with a guard against monetary terms (Section 8.15 states T09 to T11)

Source-checked


## LAW-12


## Section 11 (inquiry)

Inquiry follows the service rules applicable to the respondent, or the prescribed manner where there are none. The IC has civil court powers (summoning, discovery and production of documents, evidence). Principles of natural justice apply. Inquiry is completed within 90 days. Where the respondent is not an employee, the IC proceeds under the Act and may seek police registration where a prima facie case exists.

Hearing, evidence, summons, 90-day countdown (Sections 8.16 and 8.17)

Source-checked


## LAW-13


## Section 12 (interim relief)

On the woman’s written request during the inquiry, the IC may recommend that the employer transfer the woman or the respondent, grant the woman leave of up to three months, or grant other prescribed relief.

Interim relief request, decision and employer implementation tracking (Section 8.18)

Source-checked


## LAW-14


## Section 13 (inquiry report and action)

Report with findings goes to the employer within 10 days of completing the inquiry and to both parties. If the allegation is not proved, no action. If proved, the IC recommends action under service rules (or as prescribed) and deduction from the respondent’s salary to pay compensation. The employer acts within 60 days.

Report issuance, 10-day and 60-day timers, action-taken record (Section 8.18)

Source-checked


## LAW-15


## Section 14 (false or malicious complaint)

Action can follow only where the IC finds the complaint knowingly false or malicious, or that forged or misleading documents or false evidence were given. Inability to substantiate or provide proof is not by itself a ground. A separate inquiry establishes malice.

Guarded workflow; no automatic labelling; wording on the declaration (Section 8.18)

Source-checked


## LAW-16


## Section 15 (compensation factors)

The IC considers mental trauma, pain, suffering and emotional distress; loss of career opportunity; medical expenses for physical or psychiatric treatment; the respondent’s income and financial status; and the feasibility of payment in a lump sum or instalments.

Compensation worksheet (Section 8.18)

Source-checked


## LAW-17


## Section 16 (prohibition of publication)

Contents of the complaint, identity and addresses of the aggrieved woman, respondent and witnesses, inquiry proceedings, recommendations and action taken are not to be published, communicated or made known to the public, press or media. Information about the justice secured may be disseminated without disclosing names, addresses, identity or other particulars.

Confidentiality controls and anonymised outcome publisher (Section 8.20)

Source-checked (core rule); counsel to confirm the proviso wording


## LAW-18


## Section 17 (penalty for publication)

Penalty for breach of Section 16 under the service rules or, where none, as prescribed by the Rules.

Staff undertakings, access logging, discipline workflow

Counsel to confirm amount


## LAW-19


## Section 18 (appeal)

An aggrieved person may appeal against the recommendations or their non-implementation within 90 days to the court or tribunal under the service rules, or as prescribed.

Appeal window tracker and appeal record (Section 8.19)

Source-checked


## LAW-20


## Section 19 (employer duties)

Provide a safe workplace; display conspicuously the penal consequences of sexual harassment and the IC order; organise workshops and awareness programmes at regular intervals and orientation for IC members; provide facilities to the IC; assist in securing the attendance of respondent and witnesses; make information available to the IC; assist the woman to file a criminal complaint if she chooses; initiate action against a perpetrator who is not an employee; treat sexual harassment as misconduct under service rules; monitor timely submission of IC reports.

Employer compliance suite and scoring (Section 8.21)

Source-checked (core duties); counsel to confirm full list


## LAW-21

Sections 20 to 25 (government duties, annual reports, inspection)

Appropriate government and District Officer duties; the IC prepares an annual report and submits it to the employer and the District Officer; the employer includes the information in its annual report or informs the District Officer; the government may call for information and inspect records.

Annual report generator, audit pack (Sections 8.21 and 8.22)

Source-checked (annual report content); counsel to confirm section mapping


## LAW-22


## Section 26 (penalty)

Fine up to ₹50,000 for contraventions such as not constituting an IC or not filing the annual report. Repeat contravention attracts twice the penalty and possible cancellation, suspension or non-renewal of the licence or registration.

Compliance health score weights; risk messaging in dashboards

Source-checked


## LAW-23

Sections 27 and 28

Cognizance of offences by courts; the Act is in addition to, not in derogation of, other laws.

Parallel criminal track in the workflow (RT-14)

Counsel to confirm


## LAW-24

Sexual Harassment of Women at Workplace Rules, 2013

Prescribes the form of complaint (several copies), dispatch of the complaint to the respondent within 7 working days, respondent’s reply with documents and witnesses within 10 working days, manner of inquiry, notice before ex parte action, recommendations, quorum, annual report and penalty for confidentiality breach.

Timers TM-05, TM-06, TM-13; inquiry controls (Sections 8.16 and 8.17)

7-day and 90-day points source-checked; other rule numbers: counsel to confirm


## LAW-25

Handbook on Sexual Harassment of Women at Workplace (Ministry of Women and Child Development, 2015)

Model policy, forms and procedure that practitioners follow.

Template library baseline (Section 8.26)

Counsel to confirm


## LAW-26

Bharatiya Nyaya Sanhita, 2023 (replacing the Indian Penal Code)

Offences relevant to workplace conduct include assault or criminal force to outrage modesty, sexual harassment, voyeurism, stalking and words or gestures insulting modesty. The Act continues to treat police registration as an option where a prima facie case exists.

Criminal-track support: employer assistance, referral pack (RT-14, Section 8.22)

Counsel to confirm section mapping


## LAW-27

Companies (Accounts) Second Amendment Rules, 2025 (effective 14 July 2025)

Companies disclose in the Board’s Report the number of sexual harassment complaints received in the year, disposed of, and pending beyond 90 days, together with workforce gender composition including transgender persons.

Board report data sheet and counts (Sections 8.21 and 8.22)

Source-checked


## LAW-28

SEBI BRSR disclosures (top listed companies)

Listed entities disclose sexual harassment complaint statistics in their sustainability reports.

BRSR data extract (PS-32)

Counsel to confirm


## LAW-29

Digital Personal Data Protection Act 2023 and Rules 2025 (notified 14 Nov 2025)

Rules 1, 2 and 17 to 21 in force on publication; consent manager provisions later; consent manager provisions commence 12 months after publication (about 13 November 2026); most obligations (notice, consent, security safeguards, breach notification, rights, retention, children’s data, Significant Data Fiduciary duties) commence 18 months after publication (about 13 May 2027, as reported). Clear separate notice in simple language; breach intimation to affected persons without delay and to the Data Protection Board; erasure when the purpose is served unless law requires retention, with at least 48 hours’ notice; logs retained at least one year; verifiable parental consent for children.

Section 26.9 control mapping; privacy notice (Appendix E); retention engine (Section 26.10)

Source-checked (as reported); counsel to confirm applicability to Acorn and to employer clients


## LAW-30

Information Technology Act 2000 and CERT-In Directions (April 2022)

Reasonable security practices; reporting of specified cyber incidents to CERT-In within 6 hours; retention of ICT logs for 180 days within India.

Incident playbook and log retention (Sections 26.8 and 27)

Counsel to confirm


## LAW-31

Bharatiya Sakshya Adhiniyam, 2023 (replacing the Indian Evidence Act)

Electronic records are admissible with a prescribed certificate and integrity assurance.

Evidence vault with SHA-256 hash, chain of custody and certificate template (Sections 8.17 and 8.26)

Counsel to confirm


## LAW-32

Bar Council of India Rules, Part VI, Chapter II, Section II, Rule 36 (and 2024 to 2025 notices to online legal service providers)

Advocates must not advertise or solicit work; limited factual information on a website is permitted.

Website content rules and marketing review (Appendix B)

Counsel to confirm applicability to a legal consultancy


## LAW-33

Rights of Persons with Disabilities Act 2016; Transgender Persons (Protection of Rights) Act 2019

Accessibility, reasonable accommodation and non-discrimination; inclusive treatment in policy and communication.

Accessibility support, inclusive policy track (Sections 8.13 and 22)

Counsel to confirm


## LAW-34

Protection of Children from Sexual Offences Act 2012

Mandatory reporting duties where the person is under 18.

Routing rule RT-13; child-protection protocol (Section 8.28)

Counsel to confirm


## LAW-35

State and service rules: West Bengal notifications of District Officers; model or certified standing orders; service conduct rules

Inquiry follows service rules; sexual harassment is misconduct; Local Committee and Nodal Officer contacts vary by district.

District directory managed by Legal Administrator (Section 8.30)

Counsel to confirm


## LAW-36

GST law (legal services)

Invoices for legal and consultancy services carry GST as applicable; confirm the SAC code and the reverse-charge position for advocates’ services with Acorn’s accountant.

Tax invoice engine (PAY-006, PAY-007)

Accountant to confirm


## LAW-37

Proposed amendments to the POSH Act (reported, not enacted)

A reported proposal would extend the complaint period to one year and remove pre-inquiry conciliation. Not law at the date of this document.

Effective-dated rules engine so that a future change is configuration (Section 8.30)

Source-checked as proposal only


## LAW-38

National Commission for Women advisory to employers (June 2026, as reported by a compliance advisory firm)

Reported to ask employers to: constitute an IC at each office, branch or unit with 10 or more employees; ensure a functioning Local Committee and Nodal Officers in each district; display IC and Local Committee details, member contacts and the online complaint procedure at the workplace and on the website and keep them current; register on and actively use SHe-Box; file annual reports under Section 21; protect complainants, witnesses and committee members from retaliation, intimidation and adverse transfers; and carry out an annual POSH audit (establishments with 10 or more employees) covering IC constitution, a woman Presiding Officer, IC functioning, complaint handling, confidentiality, training, disclosures, workplace safety and SHe-Box registration, with the report submitted to the District Officer, the District Magistrate or Deputy Commissioner and the administrative department. Educational and healthcare institutions are reported to face closer scrutiny.

Annual audit service PS-01 and duties CMP-21 to CMP-23; website disclosure checklist; SHe-Box helper (Sections 8.21 and 8.22); sector overlays (Section 8.33)

Reported by a secondary source; read the advisory itself; whether and how far it binds is for counsel


## LAW-39

Recent decisions and orders (2026, as reported)

Supreme Court, 7 January 2026: sought structured updates on POSH implementation in courts and tribunals and on statutory appointments such as District Officers and Nodal Officers. Supreme Court, 20 January 2026 (Cdr Yogesh Mahla v. Union of India): observed that an IC report may be challengeable before the Armed Forces Tribunal depending on jurisdiction; matter restored for consideration. Kerala High Court (X v. Kollam Bar Association, 2026): a bar association was held not to be an employer under the Act and could not constitute an Internal Committee under Section 4; the proceedings were set aside. Gauhati High Court (as reported): conciliation under Section 10 does not by itself bar the employer from starting disciplinary action under service rules.

Watch list LEG-004; employer-type and applicability notes in the wizard and in Section 8.33; forum field in the appeal tracker (POST-01); a Settled closure does not hide the employer’s own disciplinary track

Reported by a secondary source; read the judgments before relying


## LAW-40

SHe-Box (Ministry of Women and Child Development), revamped August 2024

Central web portal for registering workplace sexual harassment complaints and for routing them to the right committee, with monitoring of status. Parliamentary data cited in a 2026 digest reports 296 complaints since the revamp (254 in 2025). Several district administrations have directed private establishments to register their ICs; the statute does not make exclusive use of the portal mandatory.

SHe-Box registration helper, referral records for complaints that arrive from the portal, response-time tracking (Sections 8.21 and 8.22, EXT-02)

Source-checked (as reported); counsel to confirm district-specific orders for Kolkata and West Bengal


## 8.11 Applicability, jurisdiction and routing engine

Before a complaint becomes a statutory case, the system decides which body has jurisdiction and whether the Act applies. The decision is made by an applicability wizard (asked to the complainant in simple language) and a rules engine (confirmed by the Presiding Officer or the POSH Administrator). Every routing outcome is recorded with the rule ID that produced it.

Rule

Condition

Routing outcome

System behaviour


## RT-01

Office or branch has 10 or more employees and the respondent is not the employer

Internal Committee of that office or branch

Create statutory case; assign the IC; start timers


## RT-02

Office or establishment has fewer than 10 employees

Local Committee (District Officer)

Flag as Local Committee matter; generate referral pack; give Nodal Officer and District Officer contacts; lock case after referral; no statutory timers run on the platform


## RT-03

Complaint is against the employer (owner, managing director or head of the organisation)

Local Committee

Same as RT-02; warn the organisation that the IC may not handle the complaint


## RT-04

Complainant is a domestic worker or works in the unorganised sector

Local Committee

Same as RT-02; plain-language guidance and legal aid directory


## RT-05

Respondent is a third party (client, customer, vendor, visitor, contractor staff)

Internal Committee of the complainant’s workplace

Third-party respondent record; notice delivered through the respondent’s organisation contact where known; employer assistance duties tracked; police referral support


## RT-06

Incident occurred at another organisation’s premises (client site, event)

Internal Committee of the complainant’s employer, with intimation to the host organisation where legally permitted

Host organisation contact recorded; sharing limited to what the IC authorises; counsel review flag


## RT-07

Respondent is employed by a different organisation

IC where the complainant works

Cooperation request letter template; no cross-tenant data access


## RT-08

Complainant is an intern, trainee, apprentice, volunteer, consultant or contract worker

Covered as an employee under the wide definition; routed per workplace

Relationship type stored; no eligibility rejection on this ground


## RT-09

Complainant is not a woman (man, non-binary, transgender person)

Outside the statutory definition of aggrieved woman; handled under the organisation’s gender-neutral policy if configured

Mark case type Non-statutory; apply organisation-chosen timelines; never count in statutory annual statistics unless the organisation elects; counsel decision D-16


## RT-10

Harassment through online, remote or virtual means linked to work

Treated as a workplace matter

Evidence types include screenshots, chat exports and email headers; same workflow


## RT-11

Incident during travel, employer transport or an off-site event

Treated as a workplace matter

Place values captured; no rejection


## RT-12

Respondent is the Presiding Officer or an IC member

Member recused; IC reconstituted for this case

Automatic conflict check on names; recusal order; replacement Presiding Officer (another senior woman, or external nominee through Acorn); access of the conflicted member removed


## RT-13

Complainant is under 18

Child-protection protocol

Case flagged; counsel notified; guardian involvement option; assessment of mandatory reporting duties; restricted access list


## RT-14

Facts indicate a criminal offence (assault, stalking, voyeurism, sexual assault)

IC proceeds and the employer assists the criminal complaint if the woman chooses

Parallel criminal track record (FIR number, police station, status); inquiry is not delayed by the criminal track unless a court orders


## RT-15

Last incident is more than three months before receipt

Late complaint review

Open extension request (up to a further three months for recorded reasons); otherwise handled as a concern report


## RT-16

Organisation has several offices or branches in different states

IC per office or branch, or a designated IC as the organisation’s policy and the Act allow

Branch IC mapping; cross-branch Presiding Officer nomination


## RT-17

Organisation has fewer than 10 employees but wishes to run a voluntary IC

Voluntary IC (non-statutory); Local Committee remains available to the complainant

Organisation flag Voluntary IC; warn that statutory protections come from the Local Committee


## RT-18

Submission is anonymous

Concern report (not a statutory complaint)

Create a concern record; offer anonymous guidance; explain that a named written complaint is needed to start an inquiry; no timers


## RT-19

Complaint filed by a legal heir or other authorised person because the woman is incapacitated or has died

Statutory complaint with representative record

Authorisation or relationship proof stored; counsel flag


## RT-20

Government department, PSU or public authority

IC and registration on SHe-Box expected

Organisation type Public authority; SHe-Box registration check in the compliance score


## RT-21

Complainant’s employer is not an onboarded organisation on the platform

No tenant available

Do not store a case; show information, the Local Committee and SHe-Box links and the helpline directory; offer an enquiry to Acorn


## 8.12 POSH service catalogue and plans

Acorn sells POSH compliance as a managed service on top of the platform. The service catalogue module records every service, its deliverables and its delivery tasks, and lets Acorn combine services into plans and add-ons, set usage limits, take orders and subscriptions, schedule delivery tasks and invoice through the payment module.


## 8.12.1 Services

Code

Service

Deliverables

Platform support

Target turnaround


## PS-01

POSH gap audit and annual POSH audit

Review of policy, IC, training, notices, reports, website disclosures, SHe-Box registration and case handling; scored report with prioritised gaps and a remediation plan; annual audit report in the format the District Officer directs (see LAW-38)

Audit questionnaire, evidence upload, score and report generator (Section 8.21)

10 working days


## PS-02

POSH policy drafting and review

Organisation-specific policy; optional gender-neutral annex; remote and hybrid work annex; third-party and visitor clause

Policy library with versions and acknowledgement

7 working days


## PS-03

IC constitution support

Nomination, composition check, appointment order, member declarations, tenure calendar

IC management module and order templates

5 working days


## PS-04

External member panel

Nominated external members with conflict checks and per-case fee terms

Panel directory, conflict check, assignment workflow

5 working days


## PS-05

Local Committee liaison and referral

Referral pack for small establishments and for complaints against the employer; District Officer and Nodal Officer contact details

Referral pack generator and district directory

2 working days


## PS-06

Notice and display pack

Notice of penal consequences and IC details in English, Bengali and Hindi; display tracking

Template library and display tracker

3 working days


## PS-10

Employee awareness programme

E-learning with quiz plus optional live session; certificates

LMS and attendance (Section 8.23)

Per schedule


## PS-11

Manager and supervisor training

Scenario-based training for people managers; handling of disclosures; anti-retaliation duties


## LMS

Per schedule


## PS-12

IC member orientation and certification

Orientation on the Act, procedure and natural justice; assessment and certificate (supports the employer’s Section 19 duty)

LMS, assessment, certificate register

Per schedule


## PS-13

Induction module for new joiners

Automatic assignment within 30 days of joining

HRMS or CSV roster sync; reminders

Continuous


## PS-14

Annual refresher and policy acknowledgement campaign

Campaign with reminders and completion report

Campaign engine and reports

Annual


## PS-15

Specialised programmes

Hybrid and remote work, field staff, third-party and vendor briefings

LMS content tracks

Per schedule


## PS-20

Complaint intake desk and assisted filing

Phone, email and portal intake; trained Intake Counsellor helps the complainant to file in writing, with consent

Intake Counsellor role, assisted filing mode (POSH-B-003)

Same business day


## PS-21

Case secretariat

Scheduling, notices, minutes, document handling and timeline monitoring for the IC (no decision-making)

Case management with secretariat role limited to metadata and documents the IC releases

Continuous


## PS-22

Inquiry facilitation by an external expert

External member or legal expert supports the IC in procedure and natural justice

Panel assignment; per-case access

As needed


## PS-23

Report drafting support and legal review

Structured drafting of findings and recommendations; legal quality check before issue

Report workspace with review comments (Section 8.18)

5 working days


## PS-24

Interim relief and safety planning

Guidance on interim measures; tracking of implementation

Interim relief tracker

2 working days


## PS-25

Conciliation facilitation

Process support only; no monetary terms

Conciliation workflow

As needed


## PS-26

Appeal and writ support

Legal support in appeals and writ proceedings (outside the platform, tracked inside it)

Appeal tracker and legal hold

As needed


## PS-27

Retaliation monitoring and aftercare

Check-ins at 30, 90 and 180 days after closure; escalation of reported retaliation

Aftercare scheduler (Section 8.19)

Scheduled


## PS-30

Annual report preparation and filing support

Annual report in the District Officer’s format; submission support

Annual report generator (POSH-A-020)

Annual


## PS-31

Board’s Report disclosure data pack

Complaints received, disposed of and pending beyond 90 days; workforce gender composition

Disclosure data sheet

Annual


## PS-32

BRSR data extract

Statistics in the format needed by listed entities

Report builder

Annual


## PS-33

SHe-Box registration support

Registration and update of IC details on the government portal

Checklist and data export

3 working days


## PS-34

Inspection and audit readiness pack

Evidence index of IC orders, notices, training and reports

Audit pack export

2 working days


## PS-35

Quarterly compliance health review

Review of score, gaps and actions with the employer

Health score and action tracker

Quarterly


## PS-40

Risk assessment and hotspot analysis

Structured assessment of locations, roles and practices; aggregated findings

Risk assessment module (Section 8.24)

10 working days


## PS-41

Climate and pulse surveys

Anonymous surveys with aggregated, privacy-safe results

Survey module

Per schedule


## PS-42

Culture and communication campaigns

Posters, emails and manager talking points

Communication kit library

Per schedule


## PS-43

Policy effectiveness review

Review of complaints trends, timeliness and outcomes (aggregated)

Analytics

Annual


## 8.12.2 Plans, limits and billing

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


## ID

Requirement

Priority

Phase


## SVC-001

Super Admin and POSH Administrator shall create, edit, retire and version services, plans and add-ons with code, name, description, deliverables, price points, GST rate, billing cycle and usage limits.

Must

5


## SVC-002

An organisation shall hold one active subscription with start and end dates, plan, add-ons, usage counters (employees, branches, cases, storage, training seats) and renewal date. Limits shall warn at 80% and block new cases only after Acorn approval so that a complainant is never turned away.

Must

5


## SVC-003

Orders for services and add-ons shall generate delivery tasks assigned to Acorn staff with due dates, status and notes, visible to the organisation as a service timeline.

Must

5


## SVC-004

Subscription and service invoices shall be generated with GST and paid through Razorpay payment links or orders, using the payment module (Section 6.9). Failed renewals shall notify Finance and the organisation and shall not suspend access to an open case.

Must

5


## SVC-005

The platform shall show the organisation a plan comparison and an upgrade request button that creates a service request for Acorn.

Should

5


## SVC-006

Service delivery SLAs shall be tracked and reported (on time, late, average turnaround) per service and per organisation.

Should

5


## 8.13 Support systems for all parties

The platform supports every person in the process, not only the complainant. Support systems are designed to be available without revealing case content to anyone who does not need it.

Ref

Support system

Who benefits

Description and features

Phase


## SUP-01

Plain-language guide and “Before you file” pages

Complainant, respondent, witness

What the law covers, what happens next, timelines, confidentiality, what evidence helps, what a written complaint means, and the alternatives (police, Local Committee, legal aid). Available in English, Bengali and Hindi; read-aloud friendly.

3


## SUP-02

Helpline and referral directory

Anyone

Admin-managed directory with verified entries and a last-verified date: emergency (112), women’s helpline (181), legal helpline (15100), SHe-Box, police, district legal services authority, counselling and medical services, District Officer and Nodal Officer contacts by district. Each entry has hours, languages and a verification owner.

3


## SUP-03

Assisted filing by an Intake Counsellor

Complainant who cannot write or prefers help

Counsellor helps record the complaint in writing with consent; sees only what the complainant tells them; access ends at submission; all actions logged (POSH-B-003).

3


## SUP-04

Support person

Complainant, respondent

A person of the party’s choice (colleague, friend, counsellor, representative) may be registered to receive notices at the party’s direction and attend hearings as allowed by the IC. The support person signs a confidentiality undertaking. Access is limited to what the party grants.

3


## SUP-05

Interpreter and sign language support

Any party or witness

Request flow for an interpreter (language, hearing date); panel directory; interpreter undertaking; minutes record the interpreter.

3


## SUP-06

Accessibility accommodations

Parties with disabilities

Accessible forms (WCAG 2.1 AA), alternative formats, extra time, hearing in an accessible venue or by video, large text and screen reader support, and a request flow for reasonable accommodation.

3


## SUP-07

Counselling and wellbeing referral

Complainant, respondent, witness

Referral to the organisation’s EAP or an Acorn-approved counsellor panel; recommendation of counselling as an outcome where the IC recommends it; no clinical data stored.

4


## SUP-08

Interim relief and safety planning

Complainant

Request form, IC decision, employer implementation tracker (transfer of either party, leave up to three months, other relief such as change of reporting line, remote work, seating), and review dates.

3


## SUP-09

Protection from retaliation

Complainant, witnesses

Anti-victimisation statement in every notice; a Retaliation Report button; fast-track linked case; automatic check-ins at 30, 90 and 180 days after closure.

4


## SUP-10

Witness protection measures

Witnesses

Identity limited to the IC; separate-session hearings; video hearing; statement released to a party only after IC approval and redaction.

3


## SUP-11

Respondent support and fair-hearing assistance

Respondent

Plain-language guide on rights, copy of the complaint and documents, time to reply, support person, ability to request extension, ability to submit documents and witness list, and access to the report and appeal information.

3


## SUP-12

IC member support

IC members

Orientation, quick reference guides, procedure checklists, templates, access to the external legal expert (PS-22), reminders and a conduct guide for hearings.

3


## SUP-13

Employer and HR support

Organisation Admin, HR

Compliance dashboard, task list of what is due, templates, audit pack, helpdesk, annual and board data packs.

4


## SUP-14

Helpdesk with ticketing

Organisation users, Acorn

Tickets with category, priority, SLA, internal notes and attachments; no case content in tickets; links to knowledge base (Section 8.29).

5


## SUP-15

Knowledge base and FAQs

All

Searchable articles for each role; versioned and approved by the Legal Administrator.

5


## SUP-16

Rule-based POSH assistant (chat)

Visitors, employees

A scripted assistant that answers general questions from approved content, shows the helpline directory and creates a service request. It does not give legal advice, does not take complaint details and shows a clear notice.

5


## SUP-17

Concern report and anonymous guidance channel

Anyone unsure about filing

Non-statutory channel for guidance; an Intake Counsellor can respond through a secure inbox without identity; an option to convert into a formal complaint.

4


## SUP-18

Post-closure feedback

Parties

Optional anonymous experience survey after closure; results aggregated for improvement.

4


## SUP-19

Complaint about the process (grievance on the platform)

Parties

A route to the Managing Partner or a designated grievance officer if a party believes the process is not fair or confidentiality is at risk.

4


## SUP-20

Status notifications and reminders

Parties, IC, employer

Generic, content-free messages with deep links to the portal (Section 8.25).

3


## SUP-21

Offline-friendly and print support

Parties, IC

Printable notice and complaint copies with a verification code, because the Act contemplates written copies and some parties prefer paper; a scan-and-upload path.

3


## SUP-22

Language and localisation

All

English, Bengali and Hindi UI strings and templates; right-to-left not required.

4


## 8.14 Complaint intake specification

The complaint form is a guided, multi-step, save-as-you-go form. Every field below is encrypted at rest where marked Enc. The form never blocks a complainant for missing optional information, and it never asks questions that blame or probe the complainant’s conduct.

Step

Field

Type and options

Req

Validation and logic

Enc

A. Routing

Organisation

Select (active organisations) or invitation code


## Y

Unknown organisation triggers RT-21 information page


## N

A. Routing

Office or branch

Select from the organisation’s branches


## Y

Maps to the IC of the branch


## N

A. Routing

Relationship to the organisation

Employee, contract or temporary, intern or trainee or apprentice, volunteer, consultant or third party, domestic worker or other


## Y

Domestic worker triggers RT-04


## N

A. Routing

Applicability check (system)

Computed from answers

Auto

Applies RT-01 to RT-21 and shows the result in plain language


## N

B. About you

Full name

Text, 2 to 100 characters


## Y

May be a pseudonym only for a concern report


## Y

B. About you

Gender identity

Woman, man, non-binary or transgender, prefer not to say


## Y

Not a woman triggers RT-09 explanation; the complainant can still submit


## Y

B. About you

Age band

Under 18, 18 or above


## Y

Under 18 triggers RT-13


## Y

B. About you

Designation and department

Text


## Y / N

Used for conflict checks only


## Y

B. About you

Employee ID

Text


## N

Optional


## Y

B. About you

Contact email

Email


## Y

Personal email allowed to avoid employer mail monitoring; OTP verified


## Y

B. About you

Mobile number

Phone


## N

OTP verified if provided


## Y

B. About you

Safe contact preferences

Channel and safe times; do not call; do not email employer address


## N

Respected by all notifications


## Y

B. About you

Language

English, Bengali, Hindi


## Y

Sets UI and templates


## N

B. About you

Accessibility needs

Multi-select and text


## N

Creates a SUP-06 request


## Y

B. About you

Support person

Name, relationship, contact, scope of access


## N

Creates SUP-04 record after confirmation


## Y

B. About you

Filing on behalf of another

Checkbox, relationship, authorisation upload


## N

Triggers RT-19


## Y

C. The respondent

Name(s)

Repeating text


## Y

At least one; auto-match against the IC for conflicts (RT-12)


## Y

C. The respondent

Relationship to the complainant

Colleague, superior, subordinate, senior management, employer or owner, client or customer, vendor or contractor, other third party


## Y

Employer or owner triggers RT-03; third party triggers RT-05


## Y

C. The respondent

Designation, department, organisation, contact details

Text


## N

Organisation shown if third party


## Y

D. What happened

Date of first incident

Date


## Y

Not in the future


## Y

D. What happened

Date of most recent incident

Date


## Y

Not before the first date; limitation computed from this date (TM-01)


## Y

D. What happened

Place

Office premises, client site, employer transport, off-site event or travel, online or remote, residence or dwelling place, other


## Y

Maps to RT-06, RT-10, RT-11


## Y

D. What happened

Nature of conduct

Multi-select aligned to Section 2(n) and Section 3: physical contact or advances; demand or request for sexual favours; sexually coloured remarks; showing pornography; other unwelcome physical, verbal or non-verbal conduct of a sexual nature; promise of preferential treatment; threat of detrimental treatment; threat about employment status; intimidating, offensive or hostile environment; humiliating treatment affecting health or safety


## Y

At least one; labels are in plain language with examples


## Y

D. What happened

Description

Long text up to 10,000 characters, or audio or document upload


## Y

Autosave; no minimum that pressures detail; “skip and add later” allowed for urgent filing


## Y

D. What happened

Witnesses

Repeating: name, contact, what they saw or know


## N

Optional


## Y

D. What happened

Earlier reports

Text: whom, when, result


## N

Optional


## Y

D. What happened

Effect on you

Text


## N

Supports compensation factors in Section 15 of the Act


## Y

D. What happened

Safety concern now

Checkbox


## N

Sets the urgent flag; alerts the Presiding Officer and POSH Administrator within 15 minutes


## Y

D. What happened

Other legal action

None, police complaint, court case, other, with details


## N

Creates parallel track record (RT-14)


## Y

E. What you want

Relief sought

Inquiry; conciliation; interim relief (transfer, leave up to three months, other); compensation; other


## N

Conciliation choice is recorded as a request under Section 10; interim relief choice opens a request


## Y

F. Evidence

Files

Upload up to 20 files, 25 MB each: PDF, DOCX, JPG, PNG, MP3, MP4, TXT, EML


## N

Malware scan; SHA-256 hash; description, date and source per file


## Y

G. Declarations

Statement of truth

Checkbox with plain wording: I have given the information in good faith. I understand that only a complaint found to be knowingly false or malicious can lead to action, and that being unable to prove something is not a reason for action.


## Y

Version of the wording stored


## N

G. Declarations

Consent to share copies

Checkbox: I understand that the Act requires a copy of my complaint to be given to the respondent and to the Internal Committee.


## Y

Version stored


## N

G. Declarations

Consent to data processing

Checkbox linked to the complaint portal privacy notice


## Y

Notice version and timestamp stored


## N

G. Declarations

Electronic signature

Typed name plus OTP; optional upload of a signed scan


## Y

Signature record stored with timestamp and hashed device data


## Y

H. System

Case ID, received time, form version, routing outcome, limitation status, urgent flag, language

System fields

Auto

Case ID format POSH-ORG-YYYY-NNNN


## N


## 8.14.1 Intake rules

The written complaint is the signed record generated by the system. The system produces the number of printed copies the Rules require (for the IC file, the respondent, and the complainant) as locked PDFs with a verification code.

A complainant can save a draft for 30 days. Drafts are encrypted and are deleted automatically after 30 days of inactivity, with a reminder at day 25 that contains no content.

Submission always succeeds technically. If routing says the matter belongs to a Local Committee or is time-barred, the complaint is still stored, the complainant receives a clear explanation and a referral pack, and the IC or POSH Administrator decides the next step.

No field asks about the complainant’s clothing, behaviour, past relationships or character. Reviewers do not add such fields.

A complainant may switch between typed, audio and assisted modes at any time.


## 8.15 Case workflow state machine

The case state machine is the single source of truth for what can happen next. Only the transitions below are allowed. The server enforces guards; the client only shows available actions. Every transition writes an audit event, updates timers and creates the notifications listed in Section 8.25.


## 8.15.1 States

State

Meaning


## DRAFT

Complaint being prepared by the complainant or an Intake Counsellor; not yet received by the IC


## SUBMITTED

Received; case ID issued; awaiting triage


## TRIAGE

IC checks completeness, routing, conflicts, limitation and urgent safety needs


## LATE_REVIEW

Extension of the complaint period under consideration


## AWAITING_INFO

IC has asked the complainant for missing information


## CONCILIATION

Settlement attempt at the complainant’s request, before inquiry


## NOTICE_ISSUED

Copy of the complaint sent to the respondent; reply window running


## INQUIRY

Hearings, statements and evidence in progress


## LEGAL_STAY

A court or tribunal order has stopped the inquiry


## DELIBERATION

Evidence closed; the IC is deciding and drafting the report


## REPORT_ISSUED

Report delivered to the employer and the parties


## ACTION_PENDING

Employer has 60 days to act on the recommendations


## ACTION_COMPLETED

Employer has recorded action taken and the IC has verified it


## APPEAL_WINDOW

90-day appeal period running


## APPEAL_FILED

An appeal has been filed; legal hold applies


## REFERRED_LC

Case referred to the Local Committee; platform case locked


## REJECTED

Time-barred or outside the Act, with a recorded order and referral guidance


## WITHDRAWN

Complainant has withdrawn, with a recorded reason


## CLOSED

Outcome recorded; retention clock running


## 8.15.2 Transitions


## ID

From

Action

Guards

To

Side effects


## T01


## DRAFT

Submit

Required fields complete; consents given; OTP signature verified


## SUBMITTED

Case ID; encryption; P-01 acknowledgement; P-02 alerts; urgent flag evaluation; limitation and routing computed


## T02


## SUBMITTED

Start triage

Presiding Officer or assigned IC member has signed the conflict declaration


## TRIAGE

Triage timer (internal target 7 days); IC access granted to assigned members only


## T03


## TRIAGE

Refer to Local Committee

Routing RT-02, RT-03 or RT-04 confirmed by the POSH Administrator


## REFERRED_LC

Referral pack; complainant notified in plain language; retention clock; case locked


## T04


## TRIAGE

Open late review

Last incident more than three months before receipt


## LATE_REVIEW

Extension request recorded; internal decision target 7 days


## T05


## LATE_REVIEW

Grant extension

Within a further three months; reasons recorded; majority of the IC


## TRIAGE

Order generated; limitation status Extended


## T06


## LATE_REVIEW

Reject as time-barred

Outside the extended period, or reasons not accepted; recorded order


## REJECTED

Order and guidance letter; offer concern report and police and legal aid information


## T07


## TRIAGE

Request information

Specific questions recorded


## AWAITING_INFO

Complainant notified (generic); internal reminder timer


## T08


## AWAITING_INFO

Information received or period lapsed

Reply recorded or deadline reached


## TRIAGE

Resume triage


## T09


## TRIAGE

Start conciliation

Written request by the complainant recorded; no monetary basis


## CONCILIATION

Inquiry clock not started; conciliation record opened


## T10


## CONCILIATION

Settle

Terms recorded in writing; no monetary element; both parties consent; IC records outcome


## CLOSED

Copies to both parties and to the employer for action; terms monitoring task; closure code Settled


## T11


## CONCILIATION

Resume process

Complainant withdraws from conciliation, or terms are not complied with


## TRIAGE

Record reason; continue to notice


## T12


## TRIAGE

Accept for inquiry and issue notice

IC quorum present; copies prepared; interim relief request handled if made


## NOTICE_ISSUED

Notice and copies to the respondent within 7 working days of receipt; 10-working-day reply timer starts on receipt; 90-day inquiry clock set per the organisation’s anchor


## T13


## NOTICE_ISSUED

Begin inquiry

Reply received or reply window expired; hearing notice issued; quorum present


## INQUIRY

Inquiry start recorded; hearing schedule opened


## T14


## INQUIRY

Hold or adjourn hearing

Minutes recorded; reason code if adjourned


## INQUIRY

Delay reason counted for reporting; reminders for next hearing


## T15


## INQUIRY

Record court stay

Order uploaded and verified by the Presiding Officer


## LEGAL_STAY

Clock stopped with legal ground; alerts to POSH Administrator and counsel


## T16


## LEGAL_STAY

Stay vacated

Order uploaded


## INQUIRY

Clock resumes; new dates computed and shown


## T17


## INQUIRY

Close evidence

Both parties heard, or the ex parte path was followed with the required notice


## DELIBERATION

Findings workspace opens; 10-day report timer starts


## T18


## INQUIRY

Terminate or proceed ex parte

Three consecutive non-appearances without sufficient cause after the required written notice (15 days) as the Rules provide

DELIBERATION or CLOSED

Order recorded with notices as evidence; counsel flag


## T19


## DELIBERATION

Issue report

Findings recorded; majority decision; signatures of quorum; report lint passed


## REPORT_ISSUED

Locked PDF with timestamp; delivered to the employer and both parties; P-08; 60-day action clock and 90-day appeal clock start


## T20


## REPORT_ISSUED

Await action

Automatic


## ACTION_PENDING

Employer task created


## T21


## ACTION_PENDING

Record action taken

Organisation Admin records action with proof; IC verifies


## ACTION_COMPLETED

P-notification; compensation tracking if ordered


## T22


## ACTION_PENDING

Flag overdue

Day 61 with no action recorded


## ACTION_PENDING

Overdue flag; escalation to the POSH Administrator and the Managing Partner; report to District Officer where policy requires


## T23


## ACTION_COMPLETED

Open appeal window

Appeal period not yet expired


## APPEAL_WINDOW

Window end date shown


## T24


## APPEAL_WINDOW

Record appeal

Filing details and order uploaded


## APPEAL_FILED

Legal hold on all case data; counsel assigned


## T25


## APPEAL_WINDOW

Close

Window lapsed with no appeal, and all actions complete


## CLOSED

Closure note; retention clock; aftercare schedule 30, 90 and 180 days


## T26

Any state before REPORT_ISSUED

Withdraw

Complainant’s written request; Presiding Officer confirms the request is voluntary; reason recorded


## WITHDRAWN

IC may decide to continue where safety or law requires; counsel flag; closure notices


## T27


## CLOSED

Reopen

Court or tribunal order, new material evidence, or non-compliance with a settlement; approved by the Presiding Officer and the POSH Administrator


## TRIAGE

Reason and approvals recorded; timers recomputed under the rule set in force


## T28

Any open state

Close as filed in error

Dual approval; reason recorded; no complaint content exposed to approvers beyond metadata


## CLOSED

Retention rules apply


## T29

Any open state

Link retaliation case

Retaliation reported by a party or witness

Unchanged (new linked case)

Fast-track case with priority 1; same IC unless conflicted


## T30

Any open state

Link counter-complaint

Counter-complaint received

Unchanged (new linked case)

Separate IC composition decided by the Presiding Officer and counsel; no shared access without approval


## 8.16 Timeline and calendar engine

The timeline engine computes every statutory and service deadline from recorded dates using one working-day calendar and one rule set, and it explains each deadline in plain language (“due on 14 March 2027 because the inquiry started on …”). All dates are stored in UTC and displayed in IST.


## 8.16.1 Timers

Code

Timer

Starts at

Duration

Alerts

Basis

Config


## TM-01

Complaint period

Date of the last incident

3 months

Warning to IC at intake if exceeded


## Section 9(1)

Effective-dated


## TM-02

Extension of complaint period

End of TM-01

Up to a further 3 months

Decision reminder at day 5 of the review


## Section 9(1) proviso

Effective-dated


## TM-03

Acknowledgement

Receipt

1 business day

Breach alert to the Presiding Officer

Service standard

Yes


## TM-04

Triage

Receipt

7 days

5, 2 and 0 days

Service standard

Yes


## TM-05

Copy to respondent

Receipt of complaint

7 working days

5, 2 and 0 working days

Rules (counsel to verify)

Effective-dated


## TM-06

Respondent reply

Respondent’s receipt of copy

10 working days

5, 2 and 0 working days; reminder to respondent

Rules (counsel to verify)

Effective-dated


## TM-07

Hearing notice lead time

Hearing notice date

Minimum 7 days (default)

Warning if shorter

Natural justice, internal default

Yes


## TM-08

Inquiry completion

Anchor per organisation: date complaint received (default) or inquiry start date

90 days

30, 15, 7, 3 and 1 days; overdue


## Section 11(4)

Anchor yes; duration effective-dated


## TM-09

Report to employer

Completion of inquiry

10 days

7, 3 and 1 days; overdue


## Section 13(1)

Effective-dated


## TM-10

Employer action

Employer’s receipt of report

60 days

30, 15, 7, 3 and 1 days; overdue


## Section 13(4)

Effective-dated


## TM-11

Appeal period

Date of the recommendation (or of its non-implementation)

90 days

30, 7 and 1 days


## Section 18

Effective-dated


## TM-12

Interim relief decision

Request received

3 working days

1 working day and breach

Service standard

Yes


## TM-13

Notice before ex parte action

Notice date

15 days

Day 10 and day 14

Rules (counsel to verify)

Effective-dated


## TM-14

Interim leave limit

Leave start

Up to 3 months

Day 75 reminder


## Section 12

Effective-dated


## TM-15

IC member tenure

Nomination date

Up to 3 years

90, 60 and 30 days


## Section 4

Effective-dated


## TM-16

Annual report

Reporting period end

Due date per District Officer instruction (to be configured per district)

60, 30, 14 and 7 days

Sections 21 and 22; decision D-19

Yes


## TM-17

Board’s Report disclosure data

Financial year end

Ready before the Board’s Report is finalised

60 and 30 days

Companies Rules 2025

Yes


## TM-18

Awareness training cycle

Last session

12 months

60, 30 and 0 days


## Section 19 (regular intervals)

Yes


## TM-19

Aftercare check-ins

Closure

30, 90 and 180 days

3 days before

Acorn standard

Yes


## TM-20

Retention review

Closure

Per organisation policy; default review at 3 years if no litigation hold

90 and 30 days

DPDP and Acorn policy; decision D-23

Yes


## TM-21

Draft expiry

Last edit of a draft complaint

30 days

Day 25 content-free reminder

Data minimisation

Yes


## 8.16.2 Calendar and calculation rules

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


## 8.16.3 Clock-stop grounds and delay reasons

Code

Ground or reason

Effect on the statutory clock

Required record


## CS-01

Court or tribunal stay of the inquiry

Clock stopped from the date of the order until it is vacated

Order upload; Presiding Officer verification


## CS-02

Conciliation requested before the inquiry starts

The inquiry has not started; the inquiry clock starts from the anchor chosen by the organisation only after conciliation ends if the anchor is inquiry start. If the anchor is complaint receipt the clock runs unless counsel decides otherwise (decision D-15)

Written request; conciliation record


## DR-01

Party unavailable (illness, travel)

No stop. Delay reason recorded; counts towards “pending beyond 90 days”

Evidence of unavailability


## DR-02

Witness unavailable

No stop. Delay reason recorded

Notice and reason


## DR-03

Quorum failure or vacancy in the IC

No stop. Delay reason recorded; vacancy alert to the Organisation Admin and the POSH Administrator

Vacancy record


## DR-04

Adjournment at a party’s request

No stop. Delay reason recorded

Request and order


## DR-05

Complexity or volume of evidence

No stop. Delay reason recorded

IC note


## DR-06

Other

No stop. Free text required

IC note


## ID

Requirement

Priority

Phase


## TL-001

The engine shall compute all timers in Section 8.16.1 from recorded events, using the rule set in force on the date of the triggering event.

Must

3


## TL-002

The engine shall display the legal date, the safe date, the days remaining, and the explanation for every timer on the case, the dashboard and in reports.

Must

3


## TL-003

The engine shall never pause a statutory timer without a clock-stop ground from Section 8.16.3 and a verified record.

Must

3


## TL-004

The engine shall send alerts at the stated thresholds to the stated roles, once each, with no case content, and shall escalate an overdue timer to the POSH Administrator and the Managing Partner.

Must

3


## TL-005

The engine shall count every case that exceeds 90 days as “pending beyond 90 days” for the annual report and the Board’s Report data sheet, whatever the reason.

Must

4


## TL-006

The engine shall be covered by at least 40 automated scenarios (Section 29.3) including month-end, leap year, holiday and weekend boundaries, with a time-travel test harness.

Must

3


## TL-007

Rule sets shall be effective-dated and versioned. A case keeps the rule set that applied when each timer started, unless the Legal Administrator and counsel approve a migration.

Must

3


## 8.17 Inquiry procedure and natural-justice controls

The Internal Committee decides; the platform only supports. The controls below help the IC follow the Act, the Rules and the principles of natural justice, and record that it did.

Ref

Control

Design


## INQ-01

Quorum

Each hearing and each decision records the members present. The system blocks signing a report unless the configured quorum (default: Presiding Officer or a designated senior member and at least half of the members, including the external member where the policy requires) signed. The quorum rule is a parameter confirmed by counsel.


## INQ-02

Conflict of interest and recusal

Every member signs a declaration per case. A member can recuse at any time or be recused by order. Recused members lose access immediately.


## INQ-03

Notice and copies

The respondent receives the complaint and the documents relied upon; the complainant receives the reply and the documents. Release to the other party needs an IC release action that logs what was released and when.


## INQ-04

Hearing management

Scheduling with participants, mode (in person, video, hybrid), venue, interpreter, support person and accessibility needs; notice generation; calendar invites with no case content.


## INQ-05

In-camera hearings

Hearings are closed to everyone except the parties, the IC, support persons, interpreters and the witness being heard. Attendance is recorded and each attendee accepts a confidentiality undertaking before joining.


## INQ-06

Separate and protected sessions

The IC can hear parties and witnesses separately, with screens or by video, to protect them from intimidation.


## INQ-07

Questions through the Presiding Officer

Parties may submit questions to the Presiding Officer in writing or orally; the Presiding Officer decides which to put. The system records questions asked and answers given. The IC conduct guide reminds members that questions about character or past sexual history are inappropriate.


## INQ-08

Statements and minutes

Statements are recorded in the language of the deponent, read back, corrected and signed (typed signature plus OTP, or scan). Minutes record date, time, mode, attendees, adjournments and next steps and are signed by the Presiding Officer.


## INQ-09

Evidence handling

Each exhibit gets a number, description, source, date and SHA-256 hash at upload; custody events (viewed, downloaded, released, redacted) are logged. Electronic evidence has an integrity statement template aligned with the Bharatiya Sakshya Adhiniyam certificate requirements (counsel to confirm).


## INQ-10

Redaction

The IC can create redacted copies (witness identity, unrelated personal data) while the original stays locked; the redacted copy carries a link to the original and a reason.


## INQ-11

Summons and production

The IC uses civil-court-like powers under Section 11(3): summons to witnesses and calls for documents using templates; employer duty to secure attendance is tracked (Section 19).


## INQ-12

Video hearings

Meeting links are entered by the IC or generated by an integrated provider; waiting room; no recording by default; if the IC decides to record, all participants consent and the recording is stored in the vault with the same controls.


## INQ-13

Absence and ex parte path

If a party is absent, the system proposes the notices the Rules require (including written notice of 15 days before termination or ex parte action after three consecutive absences without sufficient cause) and blocks T18 until they are on record. Counsel verifies the rule text.


## INQ-14

Standard of decision

The report template states the standard the IC applied (commonly the balance of probabilities in service matters; counsel to confirm) and the reasoning for each finding.


## INQ-15

Parallel proceedings

Criminal complaint or court proceedings are recorded; the IC continues unless a court orders otherwise.


## INQ-16

IC conduct guide

A short guide in the IC workspace: neutrality, no victim-blaming, confidentiality, no recording on personal phones, no discussion outside the committee, courteous treatment of both parties, accessible hearings.


## INQ-17

Anti-intimidation notice

Every notice and hearing page states that retaliation is prohibited and how to report it.


## INQ-18

Time per stage visibility

The IC sees a simple timeline of the days used and left, and the reasons for each adjournment.


## 8.18 Findings, recommendations, compensation and the report


## 8.18.1 Findings and recommendations

Outcome

Available recommendations (configurable)

System checks

Allegation not proved

No action; recommendations for prevention (training, policy review, interim safeguards) where suitable

Report states reasons; Section 14 route is not triggered automatically

Allegation proved

Action under the service rules of the respondent, or where there are none the prescribed measures: written apology, warning, reprimand or censure, withholding of promotion, withholding of pay rise or increments, termination from service, counselling, community service (counsel to confirm the list in the Rules); deduction from salary for compensation under Section 15

Each recommendation tagged to a legal basis; compensation worksheet complete

Proved against a third party

Employer assistance in police complaint; restriction of access to premises; vendor or client escalation; as the Act and contracts allow

Third-party record complete

Malicious or false complaint (separate inquiry)

Action as per service rules, only after a separate inquiry that finds knowing falsity or malice or false or forged evidence; inability to prove is never enough

Separate case type, separate IC decision, extra approval by the POSH Administrator, counsel review before issue

Settled through conciliation

Recorded terms; monitoring of compliance

No monetary basis; both consents; copies sent


## 8.18.2 Compensation worksheet (Section 15)

Field

Description

Mental trauma, pain, suffering, emotional distress

Narrative and optional amount proposed

Loss in career opportunity

Narrative and optional amount

Medical expenses (physical or psychiatric)

Amounts with supporting documents

Income and financial status of the respondent

Recorded from employer records with restricted visibility to the IC

Feasibility of payment

Lump sum or instalments with schedule

Recovery route

Deduction from salary; if not possible because the respondent is not employed, direct payment by the respondent; if unpaid, recovery as arrears of land revenue through the District Officer (counsel to confirm wording and rule)

Employer implementation

Amounts deducted and paid, dates and proof recorded by the Organisation Admin


## 8.18.3 Interim relief


## ID

Requirement

Priority

Phase


## IR-001

The complainant shall be able to request interim relief in writing at any time during the inquiry using a short form that lists the options (transfer of either party, leave up to three months, other relief).

Must

3


## IR-002

The IC shall decide within TM-12, record reasons, and send a recommendation to the employer; the system shall track implementation and review dates.

Must

3


## IR-003

Leave granted as interim relief shall not be recorded as ordinary leave in any report visible to non-IC users.

Should

4


## 8.18.4 Report structure and quality check

The report is built from structured sections so that it is complete, consistent and defensible: case reference (without names in the header export), summary of the complaint, procedure followed with dates, evidence considered, findings on each issue with reasons, the standard applied, recommendations, compensation if any, dissent if any, signatures and a verification code. The report quality check blocks issuance if any section is empty, if the dates do not match the case record, if a party was not heard, if the quorum rule is not met, or if the 10-day timer has passed without a recorded reason.


## ID

Requirement

Priority

Phase


## RPT-001

The system shall generate the report from the structured sections as a locked, timestamped PDF with a verification code, deliver it to the employer and to both parties through the portal, and record delivery.

Must

3


## RPT-002

A dissenting member shall be able to record a note of dissent that is attached to the report.

Should

3


## RPT-003

The employer’s action-taken record shall capture each recommended action, its date, proof, and status, and shall be verified by the IC.

Must

3


## RPT-004

Report content shall never be exported to the Organisation Admin dashboards; only outcome codes and statistics are shared.

Must

3


## 8.19 Appeals, legal hold, aftercare and reopening

Ref

Feature

Design


## POST-01

Appeal tracker

Records appellant, forum (court or tribunal), filing date, case number, grounds summary (restricted), hearing dates and orders. Starts a legal hold. Shows the 90-day appeal window and its end date to the parties and the IC.


## POST-02

Legal hold

A flag on the case that freezes deletion and retention jobs, keeps the audit log, and prevents edits to locked documents. Only the POSH Administrator with counsel approval can lift it. A hold also applies automatically when a criminal case or writ is recorded.


## POST-03

Aftercare check-ins

At 30, 90 and 180 days after closure the system prompts the Intake Counsellor to check in with the complainant and, where appropriate, the respondent and witnesses, using a script that records only whether retaliation or distress is reported and what help was offered. Details go to the case record and are encrypted.


## POST-04

Retaliation response

A report of retaliation creates a linked priority case (T29), notifies the Presiding Officer and the POSH Administrator, proposes interim measures and requires an IC decision within the TM-12 target.


## POST-05

Reopening

Allowed under T27 with approvals; the original report and timelines remain visible as history.


## POST-06

Lessons learned

After closure the Presiding Officer can add anonymised lessons (process, training, policy) that feed the prevention module without identifying anyone.


## POST-07

Settlement monitoring

For conciliated cases, tasks check compliance with the recorded terms at dates the terms set; failure lets the complainant ask the IC to proceed.


## POST-08

Closure checklist

Report issued or settlement recorded, employer action verified, appeal window status, aftercare scheduled, retention set, documents locked, statistics recorded.


## 8.20 Confidentiality, publication limits and anonymised outcomes

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


## ID

Requirement

Priority

Phase


## CONF-001

The platform shall let Acorn publish or share information about the justice secured in a case (for example a short anonymised learning note for training) only through the Anonymised Outcome Publisher, which strips names, addresses, dates, locations, designations, departments, industry specifics and any detail that could identify a person, requires approval by the Presiding Officer and counsel, and applies a k-anonymity check (default k = 5) to any statistic.

Should

4


## CONF-002

No report, chart or export shall show a number for a group smaller than the suppression threshold (default 5); small cells are shown as “fewer than 5”.

Must

4


## CONF-003

Every person with a case role shall accept a confidentiality undertaking that restates Section 16 and the consequences, before first access and each year.

Must

3


## CONF-004

The system shall alert the Presiding Officer and Acorn’s Managing Partner when there is an unusual access pattern (many views, bulk download, out-of-hours access) on a case.

Should

4


## CONF-005

A suspected breach of confidentiality shall start the incident workflow in Section 30 with immediate containment, notification and disciplinary referral.

Must

3


## CONF-006

Screens containing case content shall carry a dynamic watermark with the viewer’s name and time, and shall block bulk selection and print unless the Presiding Officer grants print access.

Should

3


## 8.21 Employer compliance suite (Section 19 duties and scoring)

The compliance suite turns the employer’s statutory duties into a task list, evidence register and score. It is the product Organisation Admins see every day. It shows what is due, what is missing and what the consequence is (for example the Section 26 fine), and it links each gap to an Acorn service that can fix it.


## 8.21.1 Duty register

Ref

Duty (source)

Evidence the platform stores

Frequency

Linked service


## CMP-01

Constitute an IC at each office or branch with 10 or more employees by written order (Section 4)

IC order document, member list with dates, composition validation result

On change; review every 3 years


## PS-03


## CMP-02

Presiding Officer is a senior woman employee; external member present; at least half women

Composition validator output

Continuous


## PS-03, PS-04


## CMP-03

Display the penal consequences of sexual harassment and the IC order conspicuously (Section 19)

Notice version, locations, photo upload, date verified

Annual check


## PS-06


## CMP-04

Publish and communicate the POSH policy to all employees

Policy version and acknowledgement records

On change; annual refresh


## PS-02, PS-14


## CMP-05

Organise workshops and awareness programmes at regular intervals for employees (Section 19)

Sessions held, attendance, e-learning completion, certificate register

At least annual


## PS-10, PS-11


## CMP-06

Orientation programme for IC members (Section 19)

IC training completion and certificates

On appointment; annual refresher


## PS-12


## CMP-07

Provide facilities to the IC for dealing with a complaint and inquiry (Section 19)

Facilities checklist: private room, secure storage, time, secretariat

Per case; annual check


## PS-21


## CMP-08

Assist in securing the attendance of the respondent and witnesses (Section 19)

Attendance assistance log on each case

Per case


## PS-21


## CMP-09

Make information available to the IC (Section 19)

Information requests and responses on the case

Per case


## PS-21


## CMP-10

Assist the woman to file a criminal complaint if she chooses; act against a third-party perpetrator (Section 19)

Parallel track record

Per case


## PS-23


## CMP-11

Treat sexual harassment as misconduct under service rules and act within 60 days of the report (Sections 13 and 19)

Action-taken record and proof

Per case


## PS-23


## CMP-12

Monitor timely submission of IC reports (Section 19)

Dashboard of timers and overdue items

Continuous


## PS-35


## CMP-13

IC prepares and submits an annual report to the employer and the District Officer (Section 21); employer includes the information in its annual report or informs the District Officer (Section 22)

Generated report, submission proof, acknowledgement number

Annual


## PS-30


## CMP-14

Companies: disclose complaints received, disposed of and pending beyond 90 days, and gender composition, in the Board’s Report (from 14 July 2025)

Disclosure data sheet and sign-off

Annual (companies)


## PS-31


## CMP-15

Listed entities: include statistics in BRSR

BRSR extract

Annual (listed)


## PS-32


## CMP-16

Register ICs on SHe-Box where the government requires or invites it

Registration confirmation and update log

On change


## PS-33


## CMP-17

Maintain a gender-neutral or inclusive policy track if the organisation chooses it (non-statutory)

Policy and routing setting

Annual review


## PS-02


## CMP-18

Maintain records and be inspection ready (Sections 23 to 25)

Audit pack export

On demand


## PS-34


## CMP-19

Third-party and vendor awareness (contracts, visitors)

Vendor briefing records, contract clause check

Annual


## PS-15


## CMP-20

Run a complaint-handling process that meets every statutory timeline

Timeline adherence statistics

Continuous


## PS-21, PS-23


## CMP-21

Conduct an annual POSH audit for each establishment with 10 or more employees and submit it as the District Officer directs (NCW advisory, June 2026, as reported; counsel to confirm how far it binds)

Audit questionnaire, evidence, score, report, submission proof

Annual


## PS-01, PS-34


## CMP-22

Display IC and Local Committee details, member contacts and the online complaint procedure at the workplace and on the employer’s website; keep them current (Section 19; NCW advisory)

Page URL, screenshot, last verified date

Annual check; on change


## PS-06


## CMP-23

Protect complainants, witnesses and IC members from retaliation, intimidation and adverse transfers, and monitor it

Retaliation report counts, aftercare logs (counts only)

Continuous


## PS-27


## 8.21.2 Compliance health score

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


## ID

Requirement

Priority

Phase


## CMP-R01

The system shall compute the score per organisation and per branch daily, keep a history, and show the top five gaps with the legal consequence in plain language and a linked service.

Must

4


## CMP-R02

The system shall create tasks from gaps and from the timers in Section 8.16 and assign them to the Organisation Admin, with reminders and escalation to the Acorn service manager.

Must

4


## CMP-R03

The score shall use only aggregate and metadata inputs and shall never read complaint content.

Must

4


## CMP-R04

The system shall generate an audit readiness pack (zip with index) containing IC orders, policy and acknowledgements, notices, training registers, annual reports, and timeliness statistics, without any case details.

Should

4


## 8.22 Statutory and external interfaces

Ref

Interface

Direction

Content

Mechanism

Phase


## EXT-01

District Officer annual report

Out

Counts of complaints received, disposed of, pending beyond 90 days; workshops held; action taken

Generated DOCX and PDF in the district’s format, submitted by the organisation or Acorn

4


## EXT-02

SHe-Box registration

Out (manual)

IC details and organisation details

Export checklist and data sheet; status recorded in the platform

4


## EXT-03

Local Committee referral

Out

Referral pack: complaint copy, routing reason, contacts

Locked PDF given to the complainant or sent with her consent; Nodal Officer and District Officer contact details from the directory

3


## EXT-04

Police and criminal complaint support

Out

Guidance and, with consent, a documents pack

Printable pack; record of FIR number

3


## EXT-05

Legal aid and helpline directory

In and out

Contacts including 15100 and district legal services authorities

Admin-managed directory with last-verified date

3


## EXT-06

Companies Act Board’s Report

Out

Disclosure counts and gender composition

Disclosure data sheet

4


## EXT-07


## BRSR

Out

Statistics per the format

Report builder

5


## EXT-08

HRMS and employee directory

In

Employee roster (ID, name, department, location, joining date) for training assignment and headcount

CSV upload (Phase 4); scoped API with keys (later)

4


## EXT-09

Email service

Out

Transactional email

SES, Brevo or SendGrid

1


## EXT-10

SMS and WhatsApp (optional)

Out

Content-free alerts

Paid provider; DLT registration needed in India for SMS

5


## EXT-11

Payments

Out and in

Orders, payments, refunds, webhooks

Razorpay

1


## EXT-12

Video meeting provider (optional)

Out

Link creation for hearings

Manual link entry (Phase 3); provider API optional later

3


## EXT-13

E-signature

Out

Signature of reports and undertakings

Typed name plus OTP (default); optional Aadhaar eSign provider

3


## EXT-14

Antivirus

Internal

File scanning

ClamAV service

1


## EXT-15

Key management

Internal

Envelope encryption keys

Cloud KMS or a hardened local key service

3


## 8.23 Training and awareness (LMS) specification

Course

Title

Audience

Duration

Assessment

Certificate validity


## TRN-101

Understanding the POSH Act and your rights

All employees

35 minutes

10 questions, pass 80%

12 months


## TRN-102

Respectful workplaces: what is and is not acceptable

All employees

25 minutes

8 scenario questions

12 months


## TRN-201

Managers: responding to disclosures and preventing retaliation

People managers

45 minutes

12 scenario questions, pass 80%

12 months


## TRN-301

IC members: procedure, natural justice and confidentiality

IC members, external members

3 hours (blended)

Assessment and a mock inquiry exercise

12 months


## TRN-302

IC Presiding Officer masterclass: running hearings and writing reports

Presiding Officers

3 hours (blended)

Case study assessment

24 months


## TRN-401

Remote and hybrid work: online harassment and evidence

All employees, IC

20 minutes

6 questions

12 months


## TRN-501

Third parties and vendors: expected conduct

Vendors, contractors, visitors

15 minutes

5 questions

12 months


## TRN-601

Induction briefing

New joiners

20 minutes

5 questions

Once


## TRN-701

HR and employer duties under the Act

HR, Organisation Admins

60 minutes

12 questions

12 months


## ID

Requirement

Priority

Phase


## LMS-001

Admin shall create a course with lessons (text, document, embedded video link, quiz), pass mark, attempts allowed, language versions, validity and an approval status.

Must

5


## LMS-002

The Organisation Admin shall assign courses to groups (all, department, location, role, new joiners) and set due dates; assignment rules run daily.

Must

5


## LMS-003

Learners shall access courses through a secure link (no password required for staff using one-time email or mobile verification) on mobile and desktop, resume progress and see a completion certificate with a verification code and QR.

Must

5


## LMS-004

In-person sessions shall record attendance by QR check-in or by list upload, and shall issue certificates on attendance plus a short quiz where required.

Should

5


## LMS-005

The system shall send reminders at due date minus 14, 7 and 1 days and escalate non-completion to the manager and the Organisation Admin.

Should

5


## LMS-006

Reports shall show completion by department, location and course, overdue learners, average scores and certificate expiry. Learner-level data is visible only to the Organisation Admin and Acorn service staff.

Must

5


## LMS-007

Course content shall be versioned and approved by the Legal Administrator; changes in law trigger a review flag on affected lessons.

Must

5


## LMS-008

Learners who report a concern from within a course shall see the helpline directory and a button to the concern report channel, never a free text box that collects complaint content inside the LMS.

Should

5


## 8.24 Prevention, risk assessment and climate surveys

Instrument

Content

Privacy and method rules

Risk assessment (organisation level)

Structured questionnaire on locations (night shifts, field work, travel), power imbalances, remote work, vendor interactions, past complaint trends, reporting channels, trust in the process, support facilities. Output: heat map by domain and a prioritised action plan.

Completed by HR and the IC; no personal data; results stored by organisation and location

Climate and pulse survey

Short anonymous survey on awareness, trust, safety, willingness to report, retaliation fears and bystander confidence, with 10 to 20 questions.

Anonymous by design; no login link between the person and the answer; minimum 5 responses per reported group; free text screened for names; results shown only as aggregates

Bystander and manager pulse

Quick check after training

As above

Exit and feedback

Optional question set after closure (experience of the process)

Aggregated across at least 5 cases before sharing

Policy effectiveness review

Compares trends (complaints, timeliness, outcomes, training coverage) across periods

Aggregates only


## ID

Requirement

Priority

Phase


## PRV-001

The survey builder shall support single choice, multi choice, scale and free text, with scheduling, reminders, language versions and anonymous links.

Should

5


## PRV-002

The reporting layer shall enforce the minimum group size and shall merge or hide cells below the threshold.

Must

5


## PRV-003

Action plans from risk assessments and surveys shall be tracked as tasks with owners and dates.

Should

5


## 8.25 POSH notification and communication matrix

Every message is content-free: it contains the case ID or a generic phrase, never a name, a description or an attachment from the case. Messages respect the complainant’s safe-contact preferences. Each message has a template, a language version and an audit entry. The first 11 IDs match Appendix A.


## ID

Event

Recipients

Channel

Timing and rule


## P-01

Complaint received

Complainant

Email or SMS, in-portal

Immediately; case ID and next steps only


## P-02

New complaint alert

Presiding Officer, POSH Administrator

Email, real-time

Immediately; case ID, organisation, urgent flag


## P-03

Notice available

Respondent or complainant

Email, in-portal

On issue; “You have a notice. Sign in to view.”


## P-04

Hearing scheduled or changed

Participants

Email, calendar invite without content

On issue; at least 7 days ahead; reminder 48 hours and 2 hours before


## P-05

Deadline approaching

Presiding Officer, POSH Administrator

Email, real-time

At thresholds in Section 8.16.1


## P-06

Deadline breached

Presiding Officer, POSH Administrator, Managing Partner (configurable)

Email, real-time

At breach and every 3 days until resolved


## P-07

IC tenure ending or vacancy

Organisation Admin, POSH Administrator

Email

90, 60 and 30 days; on vacancy


## P-08

Report issued

Employer contact, complainant, respondent

Email, in-portal

On issue; generic message


## P-09

Break-glass access used

Managing Partner, POSH Administrator

Email, real-time

Immediately


## P-10

Annual report due

Organisation Admin

Email

60, 30, 14 and 7 days


## P-11

Training assigned or overdue

Employee, Organisation Admin

Email

At assignment and at reminders in LMS-005


## P-12

Draft complaint reminder

Complainant

Email or SMS

Day 25 of inactivity; no content


## P-13

Extension request opened

Presiding Officer

Real-time

On T04


## P-14

Information requested

Complainant

Email, in-portal

On T07


## P-15

Conciliation started or ended

Complainant, Presiding Officer

In-portal, email

On T09 to T11


## P-16

Notice to respondent dispatched

Respondent

In-portal, email, registered post if policy requires

Within TM-05


## P-17

Reply reminder

Respondent

Email

Day 5, 2 and 0 of TM-06


## P-18

Reply received

Presiding Officer

Real-time

On receipt


## P-19

Interim relief requested or decided

Presiding Officer, complainant, employer contact

In-portal, email

On request and on decision


## P-20

Court stay recorded

POSH Administrator, counsel

Email

On T15


## P-21

Employer action due

Organisation Admin, employer contact

Email

30, 15, 7, 3 and 1 days


## P-22

Employer action overdue

POSH Administrator, Managing Partner

Email

Day 61 and weekly


## P-23

Appeal window ending

Complainant, respondent

Email, in-portal

30, 7 and 1 days


## P-24

Retaliation report received

Presiding Officer, POSH Administrator

Real-time, email

Immediately; priority 1


## P-25

Aftercare check-in due

Intake Counsellor

Task, email

3 days before


## P-26

Case closed

Parties, Presiding Officer

In-portal, email

On T10, T25 or T26


## P-27

Referral to Local Committee

Complainant

In-portal, email, printed pack

On T03


## P-28

Time-barred order

Complainant

In-portal, email

On T06 with guidance


## P-29

Recusal or reconstitution

POSH Administrator, Presiding Officer

Real-time, email

On recusal


## P-30

Unusual access detected

Presiding Officer, Managing Partner

Email, real-time

Immediately


## P-31

Legal hold applied or lifted

POSH Administrator, counsel

Email

On change


## P-32

Retention review due

POSH Administrator, counsel

Email

90 and 30 days


## P-33

Compliance score dropped by 10 points or more

Organisation Admin, Acorn service manager

Email

Weekly digest


## P-34

Service order created or delivered

Organisation Admin

Email

On change


## P-35

Subscription renewal or usage limit

Organisation Admin, Finance

Email

60, 30 and 7 days; at 80% usage


## P-36

Support ticket updated

Requester

Email

On change; SLA breach to team lead


## P-37

Survey open or closing

Invited employees

Email

On open; 3 days and 1 day before close


## P-38

Interpreter or accessibility request status

Requester, Intake Counsellor

Email, in-portal

On change


## P-39

Confidentiality undertaking due

Case role holders

Email

Before first access; annually


## P-40

Security alert (new device, lockout)

User, Super Admin

Email

Immediately


## 8.26 POSH document and template library

Templates are versioned, approved by the Legal Administrator and the client’s counsel, available in English, Bengali and Hindi, and filled with merge fields. Generated documents are locked PDFs with a verification code and timestamp. Templates marked * are the ones the Act or Rules effectively require; Acorn’s legal team supplies the final wording.

Code

Template

Stage

Parties

Key merge fields

Signature


## DOC-01

Written complaint (generated record)*

Intake

Complainant

Case ID, party details, narrative, declarations

Complainant e-sign


## DOC-02

Acknowledgement of complaint*

Intake

Complainant

Case ID, date, next steps

System


## DOC-03

Assisted filing record

Intake

Complainant, Intake Counsellor

Counsellor ID, consent, time

Both


## DOC-04

Authorisation for representative filing

Intake

Representative

Relationship, proof

Representative


## DOC-05

IC constitution order*

Setup

Employer

Members, roles, tenure

Employer e-sign


## DOC-06

IC member declaration and confidentiality undertaking*

Setup and case

IC members

Name, case ID, Section 16 text

Member


## DOC-07

Conflict-of-interest declaration

Case

IC members

Case ID, relationship questions

Member


## DOC-08

Recusal order and reconstitution note

Case


## IC

Member, reason

Presiding Officer


## DOC-09

Extension of complaint period: request and order*

Triage

Complainant, IC

Dates, reasons, decision

Presiding Officer


## DOC-10

Request for further information

Triage

Complainant

Questions, due date

Presiding Officer


## DOC-11

Conciliation request, terms and outcome record*

Conciliation

Complainant, respondent

Terms (non-monetary check), consents

Both, Presiding Officer


## DOC-12

Notice to respondent with copy of complaint*

Notice

Respondent

Case ID, reply date, documents list, anti-retaliation statement

Presiding Officer


## DOC-13

Respondent’s reply format*

Notice

Respondent

Reply, documents, witness list

Respondent


## DOC-14

Interim relief request and recommendation*

Any

Complainant, IC, employer

Relief type, dates, reasons

Complainant; Presiding Officer


## DOC-15

Notice of commencement of inquiry

Inquiry

Parties

Dates, venue, rights, support person

Presiding Officer


## DOC-16

Hearing notice

Inquiry

Parties, witnesses

Date, time, mode, link

Presiding Officer


## DOC-17

Summons to witness and request to produce documents*

Inquiry

Witness

Case reference (no names in the subject), date

Presiding Officer


## DOC-18

Statement record

Inquiry

Deponent

Statement, language, interpreter

Deponent; Presiding Officer


## DOC-19

Hearing minutes

Inquiry


## IC

Attendance, summary, next steps

Presiding Officer


## DOC-20

Evidence index and integrity statement

Inquiry


## IC

Exhibit numbers, hashes, custody

Presiding Officer


## DOC-21

Notice before ex parte action*

Inquiry

Absent party

Dates of absence, 15-day notice

Presiding Officer


## DOC-22

Inquiry report*

Report

Employer, parties

Structured findings and recommendations

Quorum members


## DOC-23

Covering letter to employer for action*

Report

Employer

Recommended action, 60-day date

Presiding Officer


## DOC-24

Employer action-taken record

Action

Employer, IC

Action, date, proof

Employer; Presiding Officer


## DOC-25

Notice of appeal rights

Report

Parties

90-day window, forum information

Presiding Officer


## DOC-26

Closure certificate

Closure


## IC

Outcome code, dates

Presiding Officer


## DOC-27

Aftercare check-in script

Post-closure

Intake Counsellor

Questions

Counsellor


## DOC-28

Local Committee referral pack

Triage

Complainant

Routing reason, contacts

POSH Administrator


## DOC-29

Legal hold notice

Any

Internal

Reason, scope

POSH Administrator, counsel


## DOC-30

Retention review note and destruction certificate

Post-closure

Internal

Case ID, approvals

Dual approval


## DOC-31

Annual report (IC)*

Reporting

District Officer, employer

Counts, workshops, actions

Presiding Officer


## DOC-32

Board’s Report disclosure data sheet

Reporting

Employer

Counts, gender composition

Employer


## DOC-33

POSH policy*

Policy

Employees

Organisation details, IC, procedure

Employer


## DOC-34

Notice of penal consequences and IC details (display)*

Policy

All

Penal text, IC members, contact

Employer


## DOC-35

Policy acknowledgement

Policy

Employee

Version, date

Employee


## DOC-36

Training certificate

Training

Learner

Course, score, validity, QR

System


## DOC-37

Interpreter and support person undertaking

Case

Interpreter, support person

Case ID, Section 16 text

Signatory


## DOC-38

Data subject request response

Privacy

Requester

Request, action, date

Grievance officer


## 8.27 Case-level permission matrix

Access is checked on every request using the user’s role, the case assignment, the case state, the document’s release status and the case’s legal hold. Y = allowed; Own = only items they created or are addressed to; Asg = only on assigned cases; Rel = only after release by the IC; BG = break-glass with reason and alert; N = never. Cmp = complainant, Res = respondent, PO = Presiding Officer, ICM = IC member (including external), PAd = POSH Administrator, OAd = Organisation Admin, SAd = Super Admin, Cns = counsel (assigned), IC = Intake Counsellor.

Action

Cmp

Res


## PO


## ICM

PAd

OAd

SAd

Cns


## IC

See case status (stage name and dates)

Own

Own

Asg

Asg

Asg


## N


## N

Asg

Asg (meta)

Read complaint narrative

Own

Rel

Asg

Asg


## N


## N


## BG

Asg

During assisted filing only

See party identities

Own

Rel

Asg

Asg

N (masked)


## N


## BG

Asg


## N

Edit complaint after submission

N (adds supplements)


## N

Asg


## N


## N


## N


## N


## N


## N

Upload evidence

Own

Own

Asg

Asg


## N


## N


## N


## N


## N

View evidence

Own

Rel

Asg

Asg


## N


## N


## BG

Asg


## N

Release a document to the other party


## N


## N


## Y


## N


## N


## N


## N


## N


## N

Add private IC notes


## N


## N

Asg

Asg


## N


## N


## N


## N


## N

Read private IC notes


## N


## N

Asg

Asg


## N


## N


## BG


## N


## N

Schedule hearings and issue notices


## N


## N

Asg

Asg (if delegated)

Meta only


## N


## N


## N


## N

Record minutes and statements


## N


## N

Asg

Asg


## N


## N


## N


## N


## N

Record findings and sign the report


## N


## N

Asg

Asg


## N


## N


## N

Review comments only


## N

View issued report

Rel

Rel

Asg

Asg

Outcome only

Outcome and recommended action only


## BG

Asg


## N

Record employer action taken


## N


## N

Verify


## N


## N


## Y


## N


## N


## N

Request interim relief

Own


## N


## N


## N


## N


## N


## N


## N

Help the complainant

Withdraw or request conciliation

Own


## N


## N


## N


## N


## N


## N


## N

Help the complainant

Export case bundle

Own copy of own documents


## N

Y (logged)


## N


## N


## N


## BG

Asg (logged)


## N

See organisation statistics


## N


## N


## Y


## N


## Y


## Y


## Y


## N


## N

Apply or lift legal hold


## N


## N

Request


## N

Y with counsel


## N


## N


## Y


## N

Delete any case data


## N


## N


## N


## N

Dual approval retention job


## N


## N


## N


## N

Support persons, interpreters and witnesses do not receive accounts by default. They receive time-limited, single-purpose links (for example to attend a hearing, or to read a statement for signature) after they sign the undertaking DOC-37, and the links expire after use.


## 8.28 Special scenarios and edge-case playbook


## ID

Scenario

Handling rule

System behaviour


## EC-01

Complaint is against the Presiding Officer or an IC member

The member is recused; another senior woman presides, or Acorn nominates an external Presiding Officer if the organisation has none

Conflict match on names; RT-12; access removed; DOC-08


## EC-02

Complaint is against the employer, owner or head of the organisation

Local Committee jurisdiction; the IC does not inquire

RT-03 referral pack and contacts


## EC-03

Respondent is a client, vendor or visitor

IC inquires; employer assists; client escalation per contract; police assistance if the woman chooses

RT-05; third-party record; DOC-17 not used on external parties without legal advice


## EC-04

Respondent resigns or is terminated during the inquiry

The IC continues and decides; the report is still issued; the employer records what action is possible (for example exit record, reference restrictions); compensation by direct payment if no salary

Respondent status field; T17 and T19 unchanged; counsel flag


## EC-05

Complainant resigns during the inquiry

The inquiry continues; the complainant remains a party; communications use her personal contact details

Contact preference locked to personal channels


## EC-06

Complainant asks to withdraw

The Presiding Officer checks that the request is free from pressure; the IC may continue where safety or law requires

T26 with reason and counsel flag; aftercare scheduled


## EC-07

Respondent files a counter-complaint

Handled as a separate case with separate conflict decisions; the first inquiry is not paused


## T30


## EC-08

Several complainants against one respondent

Separate cases linked by the respondent record; the IC may hear together with consent and with confidentiality safeguards

Link record; no cross-visibility between complainants without release


## EC-09

Incident across states or offices

IC of the complainant’s workplace; cross-branch presiding officer allowed


## RT-16


## EC-10

Complainant is a minor

Child-protection protocol: restricted access, guardian, counsel assessment of mandatory reporting and notifications

RT-13; extra approvals


## EC-11

Criminal offence alleged (assault, stalking, voyeurism)

The IC inquires; the employer assists the criminal complaint if the woman chooses; evidence is preserved

RT-14; parallel track; legal hold option


## EC-12

A court stays the inquiry

Record the order; stop the clock only on CS-01; plan the restart


## T15, T16


## EC-13

Leak or suspected breach of confidentiality

Contain, preserve logs, notify the Presiding Officer and Managing Partner, assess legal notifications, start disciplinary referral

Incident workflow in Section 30


## EC-14

IC quorum fails because of vacancy or conflicts

Employer must fill the vacancy; Acorn can supply an external member; delay reason DR-03 recorded

Vacancy alert; replacement workflow


## EC-15

IC tenure expires during a case

Members continue for pending cases unless the policy says otherwise; replacements are appointed for new cases

Tenure alert; policy flag


## EC-16

Harassment through chat, social media or email

Treated as workplace conduct if linked to work; evidence preserved with headers and exports

RT-10; evidence guidance


## EC-17

Complainant fears retaliation by the manager

Interim relief (reporting line change, remote work, transfer); retaliation monitoring; manager is told of the anti-retaliation duty without case details


## SUP-08, SUP-09


## EC-18

Complainant has a disability or needs language help

Accommodation and interpreter flow


## SUP-05, SUP-06


## EC-19

Respondent denies receiving the notice

Delivery log, portal read receipt and registered post proof; re-service with extended reply time

DOC-12 re-issue; timer recomputed with reason


## EC-20

Party refuses to take part

Follow the ex parte path after the notices the Rules require


## INQ-13; T18


## EC-21

Request for case information by the media or the public

Refuse; Section 16 applies; refer to the Managing Partner

Template response; log


## EC-22

Data subject request (access, correction, erasure) on case data

Handled by the grievance officer with counsel; confidentiality and legal retention limits explained; no deletion during legal hold

DOC-38; hold check


## EC-23

Court order or police request for case documents

Counsel verifies the order; the minimum necessary is released; every release is logged

Export with BG; DOC-29 hold


## EC-24

Organisation stops using Acorn services

Return or export of cases and records to the employer in encrypted form; secure deletion on the agreed date; legal hold respected

Offboarding workflow


## EC-25

Complaint relates to an incident outside India or abroad (remote team)

Counsel assesses jurisdiction and the employer’s policy; platform records and processes under policy

Counsel flag; non-statutory label if needed


## EC-26

Acorn staff member has a conflict with a case

Declaration, access removed, case reassigned

Same as INQ-02


## EC-27

Complainant uses a work email that the employer can read

Warn and offer personal channels; do not send case messages to monitored mailboxes

Contact preference rules


## EC-28

Same person is both complainant and IC member in another case

Role separation per case; no cross-access

Per-case role assignment


## 8.29 POSH service desk, SLAs and escalation

The service desk is Acorn’s operating team for the platform and the POSH service. It has three tiers and strict rules on what each tier may see.

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


## ID

Requirement

Priority

Phase


## DESK-001

Tickets shall have categories, priority, SLA timers, internal notes, attachments (scanned), a link to the case ID only (never case content), and a visible history. Agents shall be blocked from linking a ticket to a case they are not assigned to.

Must

5


## DESK-002

The desk shall have a knowledge base with approved articles, a macro library of replies and a satisfaction survey after each ticket.

Should

5


## DESK-003

A weekly report shall show tickets by category, SLA performance, repeat issues and common questions to turn into articles.

Should

5


## DESK-004

A P1 ticket shall page the on-call person by phone and email until acknowledged.

Must

5


## DESK-005

The desk shall have an on-call rota with a published escalation matrix, reviewed quarterly.

Must

5


## 8.30 Rules engine and legal content governance

Law changes. The platform therefore keeps every legal number, template and directory entry as governed content, not as code. This section defines the parameters and the governance process.

Parameter

Default (rule set v1, October 2026)

Source note

Change approval

complaint_period_months

3


## Section 9(1)

Legal Administrator and counsel (dual)

complaint_extension_months

3


## Section 9(1) proviso

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


## Section 11(4)

Dual

inquiry_anchor

complaint_received

Decision D-15

Dual

report_days

10


## Section 13(1)

Dual

employer_action_days

60


## Section 13(4)

Dual

appeal_days

90


## Section 18

Dual

ex_parte_notice_days

15

Rules (counsel to verify)

Dual

interim_leave_max_months

3


## Section 12

Dual

ic_min_members

Presiding Officer + 2 members + 1 external, at least half women


## Section 4

Dual

ic_tenure_max_years

3


## Section 4

Dual

ic_size_threshold_employees

10


## Section 4

Dual

nodal_officer_forward_days

7

Supreme Court directions, 3 Dec 2024

Dual

conciliation_allows_monetary

false


## Section 10

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


## ID

Requirement

Priority

Phase


## LEG-001

The Legal Administrator shall manage rule sets, templates, directory entries, holiday calendars and knowledge articles in a Legal Console with draft, review, approval and publish states. Publishing a parameter or template needs a second approver (counsel or the Managing Partner).

Must

5


## LEG-002

Rule sets shall have an effective date. New cases and new timers use the rule set in force at the triggering event. Existing timers keep their rule set unless a migration is approved.

Must

3


## LEG-003

Every change shall record who, when, what, why and the legal source, shall run the timeline scenario tests against the new values, and shall block publishing if a test fails.

Must

5


## LEG-004

A statutory watch list shall track items to review each quarter: Supreme Court and High Court orders, amendments, state notifications (West Bengal District Officers and Nodal Officers), DPDP commencement dates (for example the consent manager provisions and the 18-month date), Companies Act disclosures, BCI advisories and SHe-Box changes. Each item has an owner, a review date and an outcome.

Must

5


## LEG-005

Documents and reports shall print the rule set version and template version in the footer.

Must

3


## LEG-006

A district directory shall list District Officers and Nodal Officers for West Bengal with contact details, last verified date and the verifier.

Must

3


## 8.31 Additional POSH acceptance criteria


## ID

Acceptance criterion


## POSH-AC-11

Every route in the applicability matrix RT-01 to RT-21 has at least one automated test with the expected routing and system behaviour.


## POSH-AC-12

Every transition T01 to T30 is covered by a test that proves the guard blocks invalid use and the side effects occur exactly once.


## POSH-AC-13

The timeline engine passes the 40 scenarios in Section 29.3 including month-end, leap year, weekend and holiday boundaries and a rule-set change.


## POSH-AC-14

The case-level permission matrix in Section 8.27 is implemented as a data-driven policy and a test iterates over every cell.


## POSH-AC-15

No notification template contains merge fields that can carry case content; a lint test fails the build if one is added.


## POSH-AC-16

The annual report and the Board’s Report data sheet match a manual count for the seeded dataset, count every case above 90 days as pending, and apply small-cell suppression.


## POSH-AC-17

The complainant can complete the complaint form on a 360 px mobile screen with a screen reader, save a draft, resume, and submit, without any blocking error from an optional field.


## POSH-AC-18

A concern report, assisted filing and representative filing each produce the correct record type and workflow.


## POSH-AC-19

Legal hold prevents any deletion job from removing case data, proven by a test that runs the retention job on a held case.


## POSH-AC-20

A break-glass access requires a reason, expires, alerts the Managing Partner and appears in the audit log; the same access without a reason fails.


## POSH-AC-21

The compliance score for a seeded organisation matches the expected value for each of the 10 domains.


## POSH-AC-22

The legal console blocks publishing a parameter without a second approver, and a failed scenario test blocks publishing.


## POSH-AC-23

A tenant offboarding export is complete, encrypted and verified, and deletion removes data except under a legal hold.


## POSH-AC-24

The service desk cannot link a ticket to a case outside the agent’s assignment, and no ticket field accepts case content from an automated integration.


## 8.32 POSH requirement ID index

Prefix

Meaning

Where defined


## POSH-B, POSH-S, POSH-A

POSH Basic, Standard and Advanced requirements

Sections 8.4 to 8.6


## POSH-AC

POSH acceptance criteria

Sections 8.9 and 8.31


## LAW

Legal sources and obligations


## Section 8.10


## RT

Routing rules


## Section 8.11


## PS, SVC

Services and service catalogue requirements


## Section 8.12


## SUP

Support systems


## Section 8.13

T (T01 to T30)

Case workflow transitions


## Section 8.15


## TM, CS, DR, TL

Timers, clock-stop grounds, delay reasons, timeline requirements


## Section 8.16


## INQ, IR, RPT

Inquiry controls, interim relief, report requirements

Sections 8.17 and 8.18


## POST, CONF

Post-closure and confidentiality requirements

Sections 8.19 and 8.20


## CMP

Compliance duties and scoring


## Section 8.21


## EXT

External interfaces


## Section 8.22


## TRN, LMS, PRV

Training, LMS and prevention

Sections 8.23 and 8.24


## P

POSH notifications


## Section 8.25 and Appendix A


## DOC

Document templates


## Section 8.26


## EC

Edge cases


## Section 8.28


## DESK, LEG

Service desk and legal governance requirements

Sections 8.29 and 8.30


## SCT

Sector overlays


## Section 8.33


## REM

Remedies and justice pathways


## Section 8.34


## RGT

Rights and duties charters


## Section 8.35


## ACN

Acorn own POSH compliance


## Section 8.36


## IND

Independence, conflicts and service contract pack


## Section 8.37


## BR, US, E, W/A/C/R/I/O/X

Business rules, user stories, epics, screen IDs

Sections 21 to 23


## SEC, AZ, PERF, E2E, S, SOP, TH

Security tests, authorisation tests, performance tests, journeys, timeline scenarios, procedures, threats

Sections 26, 29 and 30


## 8.33 Sector overlays and special workplaces

The Act applies to every workplace, but the facts differ by sector: who the respondent is, where the incident happens, which regulator watches, and which committee has jurisdiction. Each overlay below is a configuration of the platform (organisation type, relationship types, templates, training track and routing hints), not a separate product. Legal statements are summaries for design purposes and carry the status “counsel to confirm” unless stated.

Code

Sector or workplace

Legal and regulatory touchpoints (summary)

Platform handling


## SCT-01

Schools, colleges and universities

Employees are covered by the Act. For higher education the University Grants Commission Regulations, 2015 on prevention, prohibition and redressal of sexual harassment of women employees and students require an Internal Complaints Committee and student-facing procedures. The Act’s definition of aggrieved woman covers a woman “whether employed or not” at a workplace. The NCW advisory (LAW-38) is reported to apply closer scrutiny to educational institutions.

Organisation type Educational; relationship types Student and Research scholar; student-facing language and templates; student representation in the IC where the regulations require; training track for faculty and students; counsel flag on which regime governs each complaint


## SCT-02

Hospitals, clinics and medical colleges

Employees, trainee doctors, nurses, contract and outsourced staff; frequent third-party respondents (patients, attendants); night shifts and on-call rooms; closer scrutiny reported for healthcare institutions.

Third-party respondent flow (RT-05) with patient-privacy guard; shift and location values in the risk assessment; hospital-specific awareness course variant; interim relief options that account for rosters


## SCT-03

IT, ITES, global capability centres and start-ups

Remote and hybrid teams, client sites, chat and video platforms, multi-state offices, listed or investor-backed companies with Board’s Report and BRSR duties.

Online-conduct evidence types (RT-10); branch-per-city IC mapping (RT-16); Board’s Report and BRSR data packs; TRN-401 remote work course


## SCT-04

Hospitality, retail, security and facility services

Shift work, customers and guests as respondents, outsourced and agency staff, frontline staff with low access to email.

Mobile-first and low-literacy flows; QR-code entry posters at sites; audio narrative option; third-party respondent flow; Bengali and Hindi first


## SCT-05

Factories, construction sites and contractor-heavy workplaces

Contract labour and the principal employer; the Act’s wide definition of employee includes contract workers whether or not the principal employer knows. Which employer’s committee hears a complaint (principal employer or contractor) needs counsel input.

Relationship type Contract worker with contractor name; routing choice recorded with reason; site-level branch records; counsel flag RT-06


## SCT-06

Media, film, theatre and event production units

Temporary and project-based workplaces, freelancers, many employers on one set, power imbalance. Production units need an IC while the production runs.

Project-type organisation with start and end dates; short-term IC with tenure bound to the project; freelancer relationship type; archive of records after wrap


## SCT-07

Domestic workers and households

A dwelling place is a workplace for a woman employed there. The Local Committee handles complaints; households are not onboarded organisations.

RT-04 and RT-21 information path: plain-language guidance, Nodal Officer and District Officer contacts, legal aid, police support; no case stored without an organisation tenant, except an optional anonymous enquiry to Acorn


## SCT-08

Unorganised sector (farm, street vending, home-based and informal work)

Local Committee and Nodal Officers at block, taluka, tehsil or municipality level; complaints reach the Local Committee within 7 days of receipt by the Nodal Officer (Supreme Court directions).

Information path and directory; printable guidance in Bengali and Hindi; offline-friendly pack for NGOs and trade unions to carry


## SCT-09

Gig and platform workers

Whether a platform owes statutory POSH duties to a gig worker depends on the worker’s classification and the workplace concept; the position is unsettled and new labour codes are still being implemented.

Relationship type Platform worker; organisation policy track (non-statutory unless counsel decides otherwise); decision D-25


## SCT-10

Law firms, advocates’ chambers and bar associations

A law firm or consultancy with 10 or more employees is an employer under the Act. The Kerala High Court (2026, as reported) held a bar association not to be an employer capable of constituting an Internal Committee, so chambers and associations raise open questions about the forum. Bar Council rules on advertising and solicitation limit how results can be described (Appendix B).

Organisation type Legal; counsel flag at onboarding on forum; Local Committee referral path remains available; Acorn’s own compliance is covered in Section 8.36


## SCT-11

Government departments, public sector undertakings and autonomous bodies

Internal Committees expected in every department and undertaking; Supreme Court directions on compliance surveys and SHe-Box; service rules and Central Civil Services Conduct Rules apply to the respondent; appeals go to tribunals.

Organisation type Public authority; SHe-Box registration check weighted in the score; tribunal forum field in appeals; RTI request handling note (information is exempt under Section 16)


## SCT-12

Armed forces, police and paramilitary

Separate service rules and tribunals (the Armed Forces Tribunal point in LAW-39); committees often constituted under departmental orders.

Counsel-assisted onboarding only; forum field; no standard template without counsel review


## SCT-13

NGOs, trusts, societies and clubs

Employees and volunteers; small organisations (fewer than 10) fall to the Local Committee; volunteers and beneficiaries are workplace-adjacent.

Volunteer and beneficiary relationship types; Voluntary IC (RT-17); counsel flag for beneficiary complaints


## SCT-14

Co-working spaces, shared offices and business parks

Several employers share premises; the respondent may be an employee of another tenant or of the space operator.

Host organisation record (RT-06); cross-organisation cooperation letter (RT-07); no shared case data


## SCT-15

Sports bodies, academies and training institutes

Athletes and trainees are not always employees; federations and academies are often societies; closer duty of care.

Trainee and athlete relationship types; Voluntary IC; counsel flag


## SCT-16

Political parties and trade unions

Courts have held that some such bodies are not employers for the Act; counsel must decide on the forum.

Counsel-assisted onboarding; non-statutory policy track


## SCT-17

Multinational and offshore teams

Extra-territorial incidents and local laws (EC-25); employer’s global code of conduct.

Non-statutory label where counsel decides; local-law note on the case


## ID

Requirement

Priority

Phase


## SCT-R01

Organisation type, relationship type and place values used by the wizard, the form, the routing rules and the reports shall be admin-managed lists (Section 8.30 governance), with the sector overlay codes above as the seed values.

Must

3


## SCT-R02

Each overlay shall be able to switch on a training variant, a template variant, a risk-assessment question set and a routing hint without code changes.

Should

5


## SCT-R03

Onboarding of an organisation in an overlay marked “counsel-assisted” (SCT-12, SCT-16) shall require counsel approval before the tenant is activated.

Must

4


## SCT-R04

The platform shall store the forum and legal basis chosen for a complaint (Act, university regulations, service rules, policy) as a recorded decision by a named person, because the same facts can fall under more than one regime.

Must

3


## 8.34 Remedies and justice pathways map

A person who has been harassed, a person accused, and an employer each have more than one route. The platform does not decide which route to take. It shows the routes in plain language, records the ones the person chooses, and keeps the timelines of parallel routes visible so that using one does not accidentally close another. The directory (SUP-02) carries the contact details with a last-verified date; entries marked “verify” must be checked by the directory owner before go-live and every 180 days (BR-060).

Code

Route and forum

Who may use it

What it can do

Time and conditions (summary)

Platform support


## REM-01

Internal Committee inquiry (Act, Sections 4, 9 to 13)

Woman who works for, or visits, an establishment with 10 or more employees

Conciliation on request; inquiry; interim relief; findings; recommended action and compensation

Complaint within three months of the last incident (extendable by three months); inquiry within 90 days

Full case workflow (Sections 8.14 to 8.20)


## REM-02

Local Committee (Act, Sections 5 to 7)

Women in establishments with fewer than 10 employees, complaints against the employer, domestic and unorganised workers

Same powers as the Internal Committee at district level

Nodal Officer forwards within 7 days (Supreme Court directions); same limitation and inquiry periods

Referral pack, district directory, status note (RT-02 to RT-04)


## REM-03

SHe-Box portal (central government)

Women in central and state government and private workplaces

Registers a complaint and routes it to the competent committee; monitors status

Statute does not make it exclusive; registration of ICs is required in some districts

Registration helper, routed-complaint intake, response-time tracking (LAW-40)


## REM-04

Police complaint and criminal law (Bharatiya Nyaya Sanhita, Chapter V on offences against women, Sections 74 to 79, including sexual harassment, voyeurism, stalking and insulting modesty; other provisions for assault and intimidation)

The woman, with the employer’s duty to assist if she chooses (Act, Section 19)

Registration of an FIR or complaint, investigation, prosecution

No fixed period for most of these offences; evidence is best preserved early; the IC inquiry is not delayed by the criminal case unless a court orders

Criminal-track record, police-support pack, legal hold option (RT-14, EXT-04)


## REM-05

Employer’s disciplinary proceedings under service rules

Employer, on the IC’s recommendation

Warning, withholding of promotion or increments, termination and other measures in the service rules

Employer acts within 60 days of the report (Section 13(4))

Action-taken tracker (RPT-003, US-152)


## REM-06

Appeal against IC or LC recommendations (Act, Section 18)

Either party, or the employer, as the service rules allow

Review of recommendations or non-implementation by the court or tribunal

Within 90 days of the recommendations

Appeal tracker with forum field (POST-01)


## REM-07

Writ petition to a High Court (Article 226) or Supreme Court (Article 32)

Parties, mainly against state action, public employers or procedural failures

Quashing of orders, directions to constitute committees, relief against arbitrary action

Prompt filing expected; counsel to advise on availability against private employers

Court stay handling (T15, T16); legal hold


## REM-08

Civil suit, injunction, damages and defamation claims

Either party

Compensation, restraining orders, claims arising from false statements or breach of confidentiality (Sections 16 and 17)

Limitation law applies; counsel to advise

Legal hold; export for counsel (BR-045)


## REM-09

Industrial dispute and labour forums

Workers who allege retaliation or unfair termination

Reinstatement, back wages, conciliation

Forum and time limit depend on the labour law applicable to the worker; counsel to advise

Retaliation report and linked case (POST-04); counsel flag


## REM-10

National Commission for Women and State Commission for Women (West Bengal)

Any woman or on its own motion

Complaint intake, calling for reports, recommending action

No fixed period; not a substitute for the statutory committee

Directory entries and complaint-portal links (SUP-02)


## REM-11

Legal aid: NALSA helpline 15100, State and District Legal Services Authorities, legal service clinics and paralegal volunteers

Women (free legal services are available to women as a category under the Legal Services Authorities Act, counsel to confirm)

Advice, a lawyer, help to approach the Local Committee, the IC or the police

Available throughout

Directory with district legal services authority for Kolkata and other West Bengal districts (verify entries)


## REM-12

Women’s helpline 181, emergency 112, One Stop Centres (Sakhi)

Any woman in distress

Immediate response, counselling, shelter, medical and legal assistance

Available throughout; verify current numbers in West Bengal

Directory; click-to-call on mobile; always visible “Talk to someone” link


## REM-13

Mental health support: Tele-MANAS 14416, the organisation’s employee assistance programme, approved counsellor panel

Complainant, respondent, witness, IC member

Counselling and referral

Available throughout

SUP-07 counselling referral; no clinical data stored


## REM-14

Cyber harassment reporting: National Cyber Crime Reporting Portal; platform and intermediary grievance officers

Anyone harassed online

Complaint, content takedown requests

Preserve evidence quickly (headers, screenshots, URLs)

Evidence guidance (RT-10); takedown request template (counsel review)


## REM-15

District Officer and appropriate government (Act, Sections 20 to 26)

Any person aware of non-compliance; the government on its own

Inspection, calling for information, penalties for non-compliance

Fine up to ₹50,000, doubled for repeat and possible licence consequences (Section 26)

Compliance score; audit pack; inspection readiness (CMP-18)


## REM-16

Board, Audit Committee and whistle-blower channel (companies)

Directors, employees

Governance oversight, disclosure in the Board’s Report

Annual disclosure of complaints received, disposed of and pending beyond 90 days (LAW-27)

Board’s Report data pack (PS-31)


## REM-17

Medical examination and treatment

The woman, where physical harm or assault is alleged

Care and evidence of injury

As early as possible

Directory of services; guidance page; no medical data stored


## ID

Requirement

Priority

Phase


## REM-R01

The platform shall show a “Your options” page in plain language at the start of the wizard and again when a case is closed, listing the routes in REM-01 to REM-17 that are relevant to the person’s situation, with a neutral tone and no pressure to choose one.

Must

3


## REM-R02

The platform shall record each parallel route the person tells the IC about (police, court, tribunal, commission, labour forum) with reference numbers and dates, so that the case timeline and the legal hold reflect them.

Must

3


## REM-R03

The platform shall never discourage or delay a person from using any route, and shall state that using the Internal Committee does not remove the right to approach the police or a court.

Must

3


## REM-R04

The directory shall carry for every entry: name, type, scope (national, state, district), phone, email or portal, hours, languages, cost (free or paid), last verified date, verifier, and a “needs verification” badge after 180 days.

Must

3


## 8.35 Rights and duties charters for every party

Each party sees a short charter in plain language at the first screen they use (complaint portal, respondent notice, witness link, IC workspace, organisation console). The charters summarise rights and duties that come from the Act, the Rules, the principles of natural justice and Acorn’s service terms. Counsel approves the wording (Appendix E).

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


## ID

Requirement

Priority

Phase


## RGT-001

The charter for each party shall appear on the first POSH screen the party sees, in the party’s language, and shall be printable and downloadable as part of every notice.

Must

3


## RGT-002

The party shall acknowledge the charter once with a checkbox; the acknowledgement shall be stored with the charter version.

Should

3


## 8.36 Acorn’s own POSH compliance and professional conduct

A firm that sells POSH compliance must be able to show its own. Acorn is therefore the first tenant of the platform, on the same rules as any client, and its service staff work under strict separation. These rules protect clients, protect Acorn from conflict, and give Acorn credible evidence for its marketing.

Ref

Obligation or control

Detail


## ACN-01

Acorn is an organisation tenant

Acorn’s own IC (or, if it has fewer than 10 employees, voluntary IC with Local Committee access), policy, notices, training and annual report are managed in an Acorn tenant. The tenant is separate from every client tenant and from the service desk.


## ACN-02

Separation of duties

People who sit on Acorn’s own IC do not hold service-desk or case-secretariat roles for client cases; the IC for a client case never includes an Acorn employee unless Acorn is appointed external member under Section 8.37.


## ACN-03

No marketing from case outcomes

No client name, outcome, number of cases or testimonial is published unless counsel has approved it against Bar Council rules and Section 16; any “justice secured” note passes the Anonymised Outcome Publisher (CONF-001).


## ACN-04

Staff screening and undertakings

Background checks as permitted by law for staff with case roles; signed confidentiality undertakings (DOC-06, DOC-37) renewed yearly; access removed on the day of exit.


## ACN-05

Advocate–client confidentiality

Case content held by Acorn lawyers acting for an employer is also subject to professional confidentiality and privilege rules; counsel confirms how privilege interacts with Section 16, with the IC’s independence and with data portability on offboarding.


## ACN-06

Professional indemnity and cyber insurance

Acorn holds cover appropriate to the service; the policy is listed in the contract pack (Section 8.37).


## ACN-07

Grievance officer

Acorn names a grievance officer for data principals and for process complaints (SUP-19); contact details appear on the Privacy Policy and in the portals.


## ACN-08

Annual external review

An independent review of the POSH service (access logs, timeliness, incident register, template currency) is commissioned once a year, and its summary is shared with clients.


## 8.37 Independence, conflicts and the service contract pack

Acorn may play several roles for a client: adviser to the employer, trainer, auditor, secretariat, external member of the IC, and counsel in appeals. Some combinations are unsafe. The rules below are enforced by the role model and by the conflict check at onboarding and per case.

Ref

Rule

Enforcement


## IND-01

An Acorn lawyer appointed as external member acts independently of Acorn’s commercial relationship and may not advise the employer on the same case or on the outcome.

External-member role excludes counsel and service-manager roles on that case


## IND-02

Acorn does not act for the employer and for a party (complainant or respondent) in the same matter, or for both parties.

Conflict register checked at onboarding of each case; hard block on conflicting role assignment


## IND-03

External members are paid per sitting at a fee fixed in advance (or as the Rules allow), never by outcome; fees are visible to the Organisation Admin.

Panel fee schedule; invoice line type


## IND-04

The IC decides alone. Acorn staff in secretariat or drafting-support roles (PS-21, PS-23) do not vote, sign the report or influence findings, and their access is limited to the documents the IC releases.

Role permissions in Section 8.27; report signature restricted to IC members


## IND-05

The annual audit (PS-01) is not performed by the same person who set up the organisation’s IC or wrote its policy within the previous 12 months, unless the client is told and agrees.

Audit assignment check


## IND-06

Every Acorn person with a case role declares conflicts per case (DOC-07) and annually; relationships with a party, the employer’s senior management or a competitor of the client must be declared.

Declaration gate before access (US-103)


## IND-07

Acorn does not accept instructions from the employer to change findings, delay a report, suppress a complaint or disclose case content.

Escalation to the Managing Partner; audit entry; contract clause

Contract document

Purpose and key terms (for counsel to draft)

Master services agreement

Scope, plans, fees, term, renewal, termination, liability and indemnity, insurance, governing law and courts at Kolkata, dispute resolution, publicity ban, non-solicitation, force majeure

Order form or statement of work

Plan, add-ons, usage limits, deliverables, dates, price, GST, payment schedule

Data processing agreement

Roles (employer as data fiduciary, Acorn as processor, or joint as counsel advises), purposes, instructions, security measures, sub-processors, breach notification timelines, assistance with rights requests, audit rights, return and deletion on exit, cross-border limits

Confidentiality and Section 16 schedule

Duties of Acorn staff and the employer, access rules, no publication, consequences, incident handling

SLA schedule

Service levels in Section 8.29, support hours, credits or remedies, exclusions, reporting

Security schedule

Controls summary from Sections 13 and 26, penetration test cadence, certification roadmap, incident duties

Sub-processor list

Hosting, email, SMS, payment, antivirus, monitoring (scrubbed), key management, with locations; change notice period

Exit and offboarding schedule

Encrypted export format, checksum, timeline, deletion certificate, legal hold carve-out, transition help

Independence and conflict schedule

Rules IND-01 to IND-07 and the right of the client to ask for a different external member

Acceptable use and complainant-facing terms

Terms shown to complainants and respondents in the portal (separate from the employer contract); privacy notice; charter


## ID

Requirement

Priority

Phase


## IND-R01

The platform shall keep a conflict register for Acorn staff, panel members and counsel, and block assignment of a person to a case when a declared conflict matches a party, the organisation or a related person.

Must

3


## IND-R02

The platform shall store the contract pack documents and key terms per organisation (term, plan, retention period, sub-processor approvals, DPA version) and show expiry and renewal alerts to Acorn.

Should

5


## IND-R03

The platform shall let the Organisation Admin request a different external member, with the reason recorded and a replacement proposed within 5 working days.

Should

4


## 9. Technical Architecture


## 9.1 Architecture overview

The platform is a three-tier web application. A React front end (public site, admin panel and POSH portals) talks to a Node.js and Express REST API over HTTPS. The API stores data in MongoDB, files in encrypted object storage, and uses background workers for email, timers and report generation. Socket.io provides authenticated real-time updates. All external services (Razorpay, email, storage, antivirus, monitoring) are accessed from the server side only.

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


## 9.2 Technology stack

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


## 9.3 Code organisation

Directory

Contents

/apps/web

Public website

/apps/admin

Admin panel and POSH console

/apps/portal

Complaint, respondent and IC portals (may share the admin shell with separate routes)

/apps/api

Express API: routes, controllers, services, models, middleware, validators, jobs, sockets, templates

/packages/shared

Shared types, constants, validation schemas, role and permission definitions

/infra

Dockerfiles, Compose files, Nginx configuration, deployment scripts, backup scripts

/docs

API documentation (OpenAPI), runbooks, architecture notes, user manuals

/tests

Unit, integration, end-to-end, security and performance tests


## 9.4 Engineering standards

TypeScript is recommended across front end and back end for safer code; JavaScript is acceptable if agreed in writing.

ESLint, Prettier and Husky pre-commit hooks; conventional commits; pull-request reviews even for a small team.

AI-assisted code generation is permitted, but every change must pass the same review, tests and security checks as hand-written code. Generated code in authentication, payments, encryption and POSH authorisation is reviewed line by line by a senior engineer.

Secrets are never committed. Secret scanning is enabled on the repository.

Dependencies are pinned, scanned weekly and updated for security fixes within 7 days for critical issues.

10. Data Model

The tables below list the main collections and their key fields. The detailed schema is finalised in the design phase. Every collection includes createdAt, updatedAt and, where relevant, soft-delete fields (isDeleted, deletedAt, deletedBy). POSH collections carry organisationId on every record.

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

10.1 Data classification

Class

Examples

Handling

Public

Published blog posts, FAQs, service pages

No restriction

Internal

Service requests, Q&A drafts, scripts, payment records (non-card)

Authenticated access, role-based, encrypted at rest and in transit

Confidential

POSH complaints, evidence, hearings, reports, IC details, user MFA secrets

Application-layer encryption, case-level authorisation, access logging, no logging of content

11. API Specification Summary

All endpoints are served under /api/v1 over HTTPS, return JSON, use consistent error envelopes, validate input with schemas, and enforce authentication, RBAC and tenant scope on the server. Full OpenAPI documentation is delivered with the code.

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


## Q&A

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

11.1 API standards

Consistent error format: code, message, details (no stack traces in production).

Pagination with page and limit (maximum limit enforced); sorting and filtering whitelists to prevent injection.

Idempotency keys on payment creation and webhook processing.

CORS limited to the known front-end origins; CSRF protection for cookie-based flows through SameSite cookies and a double-submit token on state-changing requests.

Request size limits, schema validation, MongoDB operator sanitisation (reject keys starting with $ or containing dots).

12. Non-Functional Requirements


## ID

Category

Requirement

Target


## NFR-001

Performance

Public pages: Largest Contentful Paint at the 75th percentile

Under 2.5 s on 4G mobile


## NFR-002

Performance

Interaction to Next Paint and Cumulative Layout Shift

INP under 200 ms; CLS under 0.1


## NFR-003

Performance

API response time for standard reads (95th percentile)

Under 400 ms


## NFR-004

Performance

API response for writes and payment order creation (95th percentile)

Under 800 ms excluding third-party latency


## NFR-005

Scalability

Concurrent users supported without degradation on the initial hosting size

200 concurrent users; horizontal scale path documented


## NFR-006

Availability

Monthly uptime of production

99.5% or better (excluding planned maintenance announced 48 hours ahead)


## NFR-007

Recovery

Recovery point objective and recovery time objective

RPO 24 hours or less (target 1 hour with point-in-time recovery); RTO 4 hours


## NFR-008

Backups

Automated encrypted backups of database and storage, retained and tested

Daily, 30-day retention, restore test quarterly


## NFR-009

Accessibility

Conformance with WCAG 2.1 Level AA on public pages and portals

No critical axe violations; manual keyboard and screen reader checks


## NFR-010

Compatibility

Browsers and devices

Latest two versions of Chrome, Edge, Firefox, Safari; Android 10 and above; iOS 15 and above


## NFR-011


## SEO

Technical SEO

Lighthouse SEO score 95 or above; valid structured data; sitemap and robots; clean URLs


## NFR-012

Usability

Task completion for core flows by first-time users in testing

Request a service in under 2 minutes; file a complaint in under 10 minutes


## NFR-013

Maintainability

Code quality and documentation

Linting clean, 80% or higher unit-test coverage on services, documented setup and runbooks


## NFR-014

Observability

Logging, error tracking and alerting

Structured logs, error alerts within 5 minutes, uptime alerts within 2 minutes


## NFR-015

Compliance

Privacy and legal compliance by design

See Section 13 and Appendix B


## NFR-016

Data integrity

Transactional safety for payments and POSH state changes

MongoDB transactions where multi-document consistency is required


## NFR-017

Time handling

All timestamps stored in UTC and shown in IST (Asia/Kolkata); working-day calculations use a configurable holiday calendar

Verified by timeline tests


## NFR-018

Email deliverability

Transactional emails reach the inbox

SPF, DKIM, DMARC pass; bounce and complaint handling


## NFR-019

Security headers

Strict headers on all responses

A grade on securityheaders.com equivalent


## NFR-020

Localisation (optional)

Support for English with Bengali and Hindi content fields and UI strings

Could-have; scheduled in Phase 4

13. Security and Privacy

A legal consultancy holds some of the most sensitive information a client can share, and a POSH system holds some of the most sensitive information an employee can share. Security is therefore a primary product feature. The controls below follow the OWASP Application Security Verification Standard (ASVS) and OWASP Top 10 as the baseline.

13.1 Threat model summary

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

13.2 Security requirements


## ID

Requirement

Priority

Phase


## SEC-001

All traffic shall use HTTPS with TLS 1.2 or higher, HSTS with preload eligibility, and automatic certificate renewal.

Must

1


## SEC-002

Security headers shall be set: Content-Security-Policy, X-Content-Type-Options, X-Frame-Options or frame-ancestors, Referrer-Policy, Permissions-Policy, and Cross-Origin policies as applicable.

Must

1


## SEC-003

Passwords shall be hashed with Argon2id or bcrypt; reset tokens hashed at rest, single use and expiring.

Must

1


## SEC-004

MFA shall be enforced for privileged and POSH roles (see ADM-002).

Must

2


## SEC-005

Authorisation checks shall occur on the server for every endpoint and object. The default is deny. Object-level checks shall prevent insecure direct object references.

Must

1


## SEC-006

Tenant isolation shall be enforced centrally through a data access layer that injects organisationId into all POSH queries, with tests that fail the build if a query bypasses it.

Must

4


## SEC-007

Sensitive POSH fields shall be encrypted at the application layer with AES-256-GCM using envelope encryption; keys shall be rotated annually and on suspected compromise.

Must

3


## SEC-008

Database and storage shall be encrypted at rest; database network access shall be restricted to the application servers (private network or IP allow-list); MongoDB authentication shall be enabled.

Must

1


## SEC-009

Rate limiting shall apply to login, password reset, OTP, request forms, Q&A, payment creation and file upload endpoints.

Must

1


## SEC-010

All user input shall be validated on the server against strict schemas; unknown fields shall be rejected.

Must

1


## SEC-011

File uploads shall be validated by extension, MIME type and magic bytes, size limited, renamed to random identifiers, scanned for malware, and served only through authorised, expiring links with Content-Disposition set.

Must

1


## SEC-012

Secrets (database credentials, Razorpay secret, JWT keys, SMTP) shall be stored in environment variables or a secrets manager, never in code or client bundles, and rotated on staff changes.

Must

1


## SEC-013

Audit logs shall be tamper-resistant and retained for at least 3 years or as advised by counsel. Logs shall exclude passwords, tokens, card data and complaint content.

Must

1


## SEC-014

The system shall alert Super Admin on suspicious events: repeated failed logins, new device login for privileged users, role changes, break-glass access, webhook signature failures, mass exports.

Should

2


## SEC-015

Dependencies shall be scanned in CI (npm audit and a software composition analysis tool); builds fail on critical vulnerabilities.

Must

1


## SEC-016

A static analysis scan (for example CodeQL or Semgrep) and secret scanning shall run on every pull request.

Should

1


## SEC-017

The production server shall be hardened: non-root processes, firewall with only 80 and 443 open publicly, SSH with keys only and no root login, automatic security updates, fail2ban or equivalent.

Must

1


## SEC-018

Error responses in production shall not reveal stack traces, library versions or database details.

Must

1


## SEC-019

An independent or structured internal penetration test shall be carried out on staging before the POSH phase goes live, and a retest after fixes.

Must

3


## SEC-020

An incident response plan shall define roles, severity levels, containment, evidence preservation, notification to affected parties and the regulator where required by law, and post-incident review.

Must

1

13.3 Privacy and data protection

Area

Requirement

Lawful basis and consent

Collect consent at every form with a clear purpose statement; record consent version and timestamp; allow withdrawal where the law permits.

Notice

Privacy Policy explains what is collected, why, retention, sharing (Razorpay, email provider, hosting), rights and the grievance officer contact.

Data minimisation

Collect only what is needed. No unnecessary identifiers on public forms.

Retention

Defined retention per data class (service requests, Q&A, payments, POSH cases) as confirmed by counsel; automated review and deletion jobs.

Data subject rights

Process to handle access, correction and erasure requests within the period defined in law, with identity verification.

Cross-border transfer

Prefer India-region hosting; list sub-processors; ensure contracts with processors.

Breach notification

Procedure to assess and notify as required by the applicable law within the prescribed timeline.

Children's data

The site is not directed at children; no collection of children's data is intended.

Grievance redressal

A named grievance officer and contact details on the Privacy Policy page.

The Digital Personal Data Protection Rules, 2025 were notified on 14 November 2025 and are being phased in, with most obligations commencing 18 months after notification (around May 2027). The platform is built to meet them from the first release. The obligations that apply to Acorn (as a data fiduciary) and to the platform (as a processor for employer clients) must be confirmed by counsel and reflected in contracts and the Privacy Policy. See Section 26.9 for the control mapping.

14. Testing Strategy and Quality Assurance

14.1 Quality objectives

No critical or high severity defects and no open critical or high security findings at go-live.

Every Must requirement has at least one automated or documented manual test linked by ID.

Payments and POSH confidentiality, timelines and authorisation are tested more heavily than any other area.

14.2 Test levels and types

Level / type

Scope

Tools

Responsible

Frequency

Unit tests

Services, utilities, timeline calculations, permission checks, validators, GST and amount calculations

Jest or Vitest

Developers

Every commit (CI)

Component tests

React components, forms and validation messages

Vitest or Jest with Testing Library

Developers

Every commit

API and integration tests

Endpoints with real database, auth flows, RBAC, tenant isolation, payment and webhook handling with mocked gateway

Supertest, MongoDB Memory Server

Developers and QA

Every pull request

End-to-end tests

Critical user journeys in a real browser

Playwright


## QA

Nightly and before release

Security testing

SAST, dependency scan, secret scan, DAST, authorisation tests, manual penetration testing

CodeQL or Semgrep, npm audit, OWASP ZAP, Burp Suite

Security lead

Per PR (automated); per phase (manual)

Performance testing

Load and stress on key APIs; page speed on key pages

k6, Lighthouse CI


## QA

Before each phase release

Accessibility testing

Automated and manual WCAG 2.1 AA checks

axe-core, keyboard and screen reader checks


## QA

Before each phase release

Compatibility testing

Browsers, devices and viewport sizes

BrowserStack or real devices, Playwright


## QA

Before release

Payment testing

Razorpay test mode: success, failure, pending, user cancel, duplicate callback, delayed webhook, refund

Razorpay test cards and UPI test IDs


## QA

Before go-live and after any payment change

Email and notification testing

Delivery, rendering, SPF and DKIM, bounce handling, real-time alerts

Mailtrap or test inbox, mail-tester


## QA

Before release

Data and migration tests

Seed data, backups, restore drill, migrations on a copy of data

Scripts

DevOps

Before go-live

User acceptance testing (UAT)

Business scenarios by Acorn staff on staging

Test scripts and sign-off sheet

Acorn

End of each phase

Regression testing

Re-run of automated suite after changes

CI pipeline


## QA

Every release

Post-deployment smoke tests

Key paths on production after release

Playwright smoke suite

DevOps and QA

Every deployment

14.3 Environments and test data

Staging mirrors production configuration and uses Razorpay test keys and a separate email domain or sandbox.

Test data is synthetic. Real complaint data is never copied to any non-production environment.

A seed script creates demo users for each role, sample organisations, ICs and cases at every stage of the lifecycle for UAT.

14.4 Entry and exit criteria

Gate

Criteria

Entry to QA (per phase)

Features code complete and merged, unit and integration tests passing, build deployed to staging, test data seeded, release notes prepared

Entry to UAT

Zero open critical or high defects, all Must requirements tested, performance and accessibility checks passed, UAT scripts shared with Acorn

Exit to production

UAT signed, no open critical or high defects, medium defects documented with agreed plan, security scan clean, backup and rollback plan verified, go-live checklist complete (Section 15.6)

14.5 Defect severity and handling

Severity

Definition

Target fix time during build

Target fix time in warranty

Critical (S1)

System down, data loss or exposure, payment or confidentiality failure, security breach

Same day

Within 4 hours

High (S2)

Major function unusable with no workaround

2 working days

Within 1 working day

Medium (S3)

Function impaired with workaround

Before phase release

Within 5 working days

Low (S4)

Cosmetic or minor

Backlog

Next maintenance release

14.6 Representative test cases

The full test suite is maintained in the repository and the test management sheet. The list below shows the depth expected for the highest-risk areas.


## ID

Area

Scenario

Expected result


## TC-REQ-01

Service request

Submit valid form with attachment

Reference generated, DB record created, admin email within 60 s, dashboard alert within 5 s, acknowledgement email sent


## TC-REQ-02

Service request

Submit with script tags in description

Input stored safely as text; no script execution in admin view


## TC-REQ-03

Service request

Submit 6 requests in an hour from one IP

Sixth request is rejected with rate limit message


## TC-QNA-01


## Q&A

Admin answers and publishes after anonymising

Public FAQ shows answer without asker details; FAQPage schema valid


## TC-BLG-01

Blog

Editor pastes HTML containing an onerror attribute

Attribute stripped on save and on render


## TC-BLG-02

Blog

Change slug of published article

301 redirect from old URL; sitemap updated


## TC-SCR-01

Scripts

Enable analytics script, visitor declines cookies

Script does not load


## TC-SCR-02

Scripts

Content Editor tries to create a script

HTTP 403 and audit entry


## TC-SCR-03

Scripts

Activate kill switch

All custom scripts disappear from pages within 60 s


## TC-PAY-01

Payments

Successful payment in test mode

Signature verified, status Paid, receipt emailed, admin alert sent


## TC-PAY-02

Payments

Tamper with amount in the browser request

Server ignores client amount; order uses catalogue price


## TC-PAY-03

Payments

Forge payment verification with a wrong signature

Rejected; payment remains unpaid; security alert logged


## TC-PAY-04

Payments

Webhook delivered twice

Processed once; second returns success without duplicate effect


## TC-PAY-05

Payments

User closes browser after paying; verification call never arrives

Webhook or reconciliation job marks payment Paid within 15 minutes


## TC-AUTH-01

Authentication

5 wrong passwords

Account lockout or delay; alert email


## TC-AUTH-02

Authentication

Reuse of an old refresh token

Session family revoked; user must log in again


## TC-RBAC-01

Authorisation

Support user calls POSH case API

HTTP 403; attempt logged


## TC-RBAC-02

Authorisation

IC member not assigned to a case opens it by ID

HTTP 403 or 404; logged


## TC-TEN-01

Tenant isolation

Organisation A admin requests Organisation B resources

No data returned


## TC-POSH-01

POSH intake

File a complaint with attachment

Case ID created, encrypted fields stored, email carries no content, IC alerted


## TC-POSH-02

POSH timers

Inquiry started on day 0; simulate time to day 75

15-day alert sent; day 83 shows 7-day alert; day 87 shows 3-day alert; day 91 shows overdue


## TC-POSH-03

POSH timers

Complainant requests conciliation before the inquiry starts, then withdraws it

Inquiry clock starts only when the inquiry starts; conciliation period is excluded; history preserved; no silent pause is possible after inquiry start


## TC-POSH-04

POSH evidence

Alter a stored file directly in storage

Integrity check detects hash mismatch and alerts


## TC-POSH-05

POSH confidentiality

Super Admin opens a case without break-glass

Access denied; with break-glass reason, access granted, alert sent to Managing Partner


## TC-POSH-06

POSH reports

Generate annual report for seeded data

Counts match manual calculation; no identifying details


## TC-NFR-01

Performance

200 concurrent users on public pages and request form

p95 API latency under 400 ms; error rate under 1%


## TC-NFR-02

Accessibility

Keyboard-only complete of request and complaint forms

All controls reachable, focus visible, errors announced


## TC-OPS-01

Backup

Restore latest backup to isolated environment

Data restored within RTO; application starts and passes smoke test

15. Deployment, DevOps and Operations

15.1 Environments

Environment

Purpose

Data

Access

Local

Developer machines with Docker Compose

Synthetic

Developers

Development / Preview

Automatic deployment of the main branch for internal checks

Synthetic

Team

Staging

Production-like environment for QA, UAT, security testing and client demos

Synthetic, Razorpay test mode

Team and Acorn UAT users (basic auth or IP allow-list)

Production

Live system

Real

Restricted deployers and Super Admin; SSH keys only

15.2 Hosting options

Option

Description

Pros

Cons

Indicative cost

A. Single VPS in India (recommended for the lean start)

One VPS (for example 2 vCPU, 4 GB RAM) running Nginx, Node API, MongoDB or a managed MongoDB, with Docker Compose

Lowest cost, simple, India region

Single point of failure; requires disciplined backups and patching

About ₹6,000 to ₹12,000 per year for VPS (plus managed DB if chosen)

B. Cloud with managed services

Front end on a static host or CDN, API on a container service, MongoDB Atlas in Mumbai, S3 for files

Better resilience and scaling, managed backups

Higher and variable cost, more complexity

About ₹2,500 to ₹8,000 per month depending on tiers

C. Hybrid

VPS for API and workers, Atlas for the database, object storage for files

Good balance of cost and resilience

Two vendors to manage

About ₹1,500 to ₹4,000 per month

Costs are approximate and must be checked against current provider pricing. The recommended path is Option A for Phases 1 and 2 and Option C before the POSH phases go live, because the POSH data justifies managed backups and point-in-time recovery.

15.3 CI/CD pipeline

Stage

Actions

Gate


## 1. Commit

Lint, type check, unit tests, secret scan

Must pass to merge


## 2. Pull request

Integration tests, SAST, dependency scan, build

Review approval and all checks green


## 3. Merge to main

Build Docker images, push to registry, deploy to preview

Automatic


## 4. Staging release

Deploy tagged build, run migrations, run end-to-end and smoke tests, DAST scan

Pass criteria in Section 14.4


## 5. Production release

Manual approval, database backup, deploy with zero or minimal downtime (blue-green or rolling), run migrations, smoke tests

Approval by project lead and client contact


## 6. Post-release

Monitor errors and latency for 60 minutes, confirm payments and email flows

Rollback if S1 or S2 appears

15.4 Operations

Area

Approach

Domain and DNS

Domain registered in the client's name; DNS records for web, API, SPF, DKIM, DMARC; low TTL during cutover

TLS certificates

Let's Encrypt with automatic renewal and expiry monitoring

Backups

Daily automated database and storage backups, encrypted, stored in a separate account or region, 30 days retention, weekly off-site copy; quarterly restore test

Monitoring

Uptime checks on home page, API health and payment endpoint; CPU, memory, disk and database alerts; error tracking with PII scrubbing; alerts to email and phone for critical events

Logging

Structured JSON logs rotated and retained 90 days; no sensitive content; separate audit log retention

Patching

Monthly OS and dependency patches; emergency patching within 48 hours for critical vulnerabilities

Scaling

Vertical scaling first; documented path to separate database, add workers and a second API instance behind a load balancer

Disaster recovery

Documented runbook; target RTO 4 hours; infrastructure scripts allow rebuild in a new region or server

Access management

Named accounts, key-based SSH, least privilege, access review quarterly, immediate revocation on exit

Documentation

Runbooks for deploy, rollback, restore, certificate renewal, key rotation, incident handling

15.5 Rollback and release management

Every release is tagged and has release notes. Database migrations are written to be backward compatible and reversible where possible.

Rollback is a redeploy of the previous image plus migration reversal or restore if needed, targeting completion within 30 minutes.

Feature flags are used for risky features such as the POSH portal so that they can be switched off without redeploying.

Releases are scheduled outside peak hours and not on Fridays or before holidays unless urgent.

15.6 Go-live checklist

#

Item

Owner

Done

1

All Must requirements for the phase accepted in UAT; sign-off recorded

Acorn and project lead

2

No open S1 or S2 defects; security scan and penetration test results reviewed

QA and security lead

3

Production environment hardened; firewall, SSH, updates verified

DevOps

4

Environment variables and secrets set; test keys removed; live Razorpay keys and webhook secret configured

DevOps and Acorn

5

Razorpay live account activated; one small real transaction and refund tested

Acorn and QA

6

Domain, DNS, TLS and email authentication (SPF, DKIM, DMARC) verified

DevOps

7

Admin users created; MFA enrolled; default or demo accounts removed

Super Admin

8

Legal pages, disclaimers, cookie banner and consent logic approved and live

Acorn legal team

9

Content loaded: homepage, services, About, POSH page, initial blog posts, FAQs

Acorn and content editor

10

SEO: titles, meta, sitemap submitted, robots reviewed, Search Console and Analytics configured

Marketing

11

Backups running and restore test completed

DevOps

12

Monitoring, uptime checks and alert recipients tested

DevOps

13

Rollback plan reviewed; previous release available

DevOps

14

Training of Acorn staff completed; manuals handed over

Project lead

15

POSH module: legal sign-off on templates and timelines, tenant isolation tests passed, break-glass process documented

Acorn legal team and QA

16

Post-launch smoke test on production passed


## QA

17

Hypercare support contact list shared

Project lead

16. Project Plan, Milestones and Acceptance

16.1 Indicative timeline

Durations assume prompt feedback and timely supply of content, legal text and accounts. Phases may overlap where teams and dependencies allow. AI-assisted development shortens coding time, but design review, security testing and client UAT remain the critical path.

Phase

Week range

Key milestones

Deliverable and sign-off


## 0. Kick-off and design

Week 1

Requirements walkthrough, content checklist, sitemap, wireframes, design direction, environment setup

Approved wireframes and design; project plan


## 1. Website and core admin

Weeks 2 to 4

Pages, service request with email, blog and script admin, Razorpay, deployment to staging then production

Phase 1 UAT sign-off; live website


## 2. Engagement and real-time admin

Weeks 5 to 7

Socket.io alerts, Q&A, RBAC, audit logs, reports, campaign pages

Phase 2 UAT sign-off


## 3. POSH basic and standard

Weeks 8 to 12

Complaint portal, case management, IC, notices, hearings, evidence vault, timeline engine, penetration test

Legal and UAT sign-off; POSH soft launch with first client


## 4. POSH advanced

Weeks 13 to 16

Multi-organisation, policy library, annual report generator, compliance health score, analytics, retention, integrations

Phase 4 sign-off


## 5. Service, support and training suite

Weeks 17 to 21

Service catalogue and subscriptions, helpdesk, support directory, LMS, climate surveys, aftercare, legal content console, external penetration retest

Final sign-off; handover


## 6. Hypercare

Weeks 22 to 25 (or 30 days after each go-live)

Bug fixes, tuning, training refreshers

Closure report

16.2 Team and responsibilities

Role

Responsibilities

Allocation

Project lead and solution architect

Scope, planning, architecture, code review of critical modules, client communication


## Part to full time

Full-stack MERN developer(s)

Front end, back end, integrations; use of AI coding assistants under review

Full time

UI and UX designer

Wireframes, design system, accessibility


## Part time in Phase 0 and 1

QA engineer

Test plans, automation, regression, UAT support


## Part time, full time near releases

Security reviewer

Threat model review, penetration test, secure code review of authentication, payments and POSH

Milestone based

DevOps engineer

Infrastructure, CI/CD, monitoring, backups


## Part time

Acorn product owner

Decisions, content, approvals, UAT

Weekly

Acorn legal reviewer

POSH content, templates, privacy and disclaimer text

As scheduled

For a small engagement one person may hold several roles. Security review of authentication, payments and POSH authorisation must still be performed by someone other than the author of that code, or by a documented self-review checklist with an external review at least once before POSH go-live.

16.3 Governance and communication

Weekly progress call or written update with completed work, next steps, risks and decisions needed.

Shared tracker (for example Trello, Jira or a spreadsheet) for requirements and defects, keyed by the IDs in this document.

A single point of contact at Acorn consolidates feedback within 3 working days of each demo.

16.4 Acceptance procedure

At the end of each phase the team delivers a staging build, release notes, test report and UAT scripts.

Acorn performs UAT within 5 working days and records results. Defects are fixed and retested.

A phase is accepted when all Must requirements pass and no S1 or S2 defects remain open. Acceptance is signed by the Acorn authorised signatory.

If Acorn does not respond within 10 working days of delivery, the phase is deemed accepted for billing purposes, without prejudice to warranty fixes.

16.5 Change control and revision policy

The agreed scope is this document. Anything not listed is out of scope.

Each phase includes one consolidated round of design revisions and one round of functional corrections after UAT. Additional rounds are chargeable.

New features and changes in scope are raised as change requests with an impact statement (effort, cost, schedule, risk) and require written approval before work starts.

17. Commercial Summary (Indicative)

The commercial terms below are indicative and are meant to align the PRD with the budget discussion. They assume a lean, AI-assisted development model with a small team, India-based delivery and a Kolkata client. Final pricing, taxes and payment terms are fixed in the commercial proposal or service agreement. All amounts exclude GST and third-party costs unless stated.

17.1 Phase-wise development cost (indicative)

Phase

Scope

Indicative price (₹)

1

Website, landing pages (including POSH landing page), blog and script admin, service request with email alert, Razorpay payments, basic admin login, deployment, 30 days support

13,000

2

Real-time admin alerts (Socket.io), Q&A moderation and public FAQ, full RBAC, audit logs, reports, campaign pages

8,000 to 10,000


## 3A

POSH Basic: complaint intake, case ID, tracking, real-time and email alerts, document upload, audit log, basic case management

15,000 to 18,000


## 3B

POSH Standard: IC management, case state machine, timeline and calendar engine, notices, hearings, evidence vault, conciliation, reports, field-level encryption, break-glass

18,000 to 25,000

4

POSH Advanced: multi-organisation tenancy, policy library, annual report generator, compliance health score, analytics, retention automation, integrations, bilingual option

20,000 to 30,000

5

Service, Support and Training Suite: service catalogue and subscriptions, helpdesk, support directory, LMS, climate surveys, aftercare, legal content governance console

20,000 to 30,000

All

Security hardening, test automation, documentation and hypercare are spread across the phases and included in the phase prices

Included

Total

All phases as specified in this document

94,000 to 1,26,000

Earlier discussion figures were for narrower scopes. This document describes the full, production-grade scope, so its total is higher. Acorn can commission Phase 1 alone, or any combination, because the phases are independently deployable. Work outside this document is handled through change control (Section 16.5).

17.2 Suggested payment schedule

Milestone

Share

On signing and advance for the phase

40%

On staging demo of the phase

30%

On go-live of the phase

30%

17.2A Effort and price reality check (read with Section 28.4)

The Version 2.0 backlog totals 142 stories and 755 story points. The indicative total above assumes a heavily AI-assisted, founder-supervised delivery with very little legal, security and testing overhead. At normal market rates, the full scope would cost several times more (Section 28.4 gives three scenarios). Only Phase 1 fits the original ultra-low budget. Section 27.10 shows monthly running costs, which are not part of the build price. Acorn should fund Phase 1 first, obtain fixed-price written bids for later phases and use revenue from Phase 1 to fund the POSH system.

17.3 Recurring and third-party costs (client-owned, approximate)

Item

Approximate cost

Notes

Domain name

₹800 to ₹1,500 per year

Registered in the client's name

Hosting

₹6,000 to ₹12,000 per year (VPS) or ₹1,500 to ₹8,000 per month (managed)

See Section 15.2

Transactional email

Free tier to a few hundred rupees per month at this volume

SES, Brevo or SendGrid

Razorpay fees

About 2% plus GST per transaction (standard plans; verify current rates)

Deducted at settlement

SMS or WhatsApp (optional)

Per-message charges via a provider

Out of base scope

Error tracking and uptime monitoring

Free tiers to low monthly cost

Sentry, UptimeRobot or similar

Penetration test by an external firm (optional)

Quoted separately

Recommended before POSH go-live; internal structured test is included

Annual maintenance (optional)

Typically 15% to 20% of build cost per year, or a monthly retainer


## Section 19

18. Risks and Mitigation


## ID

Risk

Likelihood

Impact

Mitigation

Owner


## R-01

Scope creep, especially in POSH (every client wants custom workflows)

High

High

Strict phase scope, change control, configurable templates instead of custom code

Project lead


## R-02

Confidentiality breach of POSH data

Low

Critical

Controls in Sections 8.7 and 13, penetration test, no sensitive content in notifications, access reviews

Security lead


## R-03

Statutory timelines or content configured incorrectly

Medium

High

Legal sign-off, scenario-based timeline tests, configurable rules, clear disclaimers

Acorn legal


## R-04

Payment mismatch or fraud

Low

High

Server-side amounts, signature and webhook verification, reconciliation job, alerts

Developer and Finance


## R-05

Low-quality AI-generated code introducing vulnerabilities

Medium

High

Mandatory review, tests, SAST, extra scrutiny of authentication, payments, encryption and authorisation

Project lead


## R-06

Delayed content, legal text or Razorpay KYC

High

Medium

Early checklist, placeholders, test mode build, dependency tracking in weekly updates

Acorn


## R-07

Professional-conduct or advertising rule non-compliance on the website

Medium

High

Counsel review of content and disclaimers (Appendix B)

Acorn legal


## R-08

Single-server failure or data loss

Medium

High

Backups, restore tests, managed database before POSH, documented DR

DevOps


## R-09

Third-party script compromises visitors

Low

High

Consent gating, CSP, allow-list, kill switch, restricted roles

Marketing and Super Admin


## R-10

Spam and abuse of forms

High

Low

CAPTCHA, honeypot, rate limit, moderation

Developer


## R-11

Key person dependency in a small team

Medium

Medium

Documentation, code in client-owned repository, runbooks

Project lead


## R-12

Changing law or rules (POSH rules, data protection rules)

Medium

Medium

Configurable timers and templates, periodic legal review, maintenance plan

Acorn legal


## R-13

Low adoption of POSH portal by employees

Medium

Medium

Plain-language UX, awareness material, organisation onboarding kit

Acorn and organisations


## R-14

Performance issues from heavy media and scripts

Medium

Medium

Image optimisation, CDN, script governance, Lighthouse CI budgets

Developer

19. Support and Maintenance

19.1 Warranty

Each phase carries a 30-day warranty from go-live during which defects against this PRD are fixed at no charge. The warranty does not cover new features, content changes, third-party service changes, or issues caused by changes made outside the agreed process.

19.2 Support model after warranty (optional retainer)

Item

Standard plan

Support hours

Monday to Saturday, 10:00 to 18:00 IST

Channels

Email and a shared tracker; phone for S1 issues

Response targets

S1: 4 hours; S2: 1 business day; S3: 3 business days; S4: next maintenance release

Included

Bug fixes, security patches, dependency updates, monthly backup and restore verification, uptime monitoring, minor content or configuration changes up to an agreed number of hours per month

Excluded

New features, redesigns, content writing, third-party fees, legal updates to templates (can be taken as change requests)

Reporting

Monthly summary: uptime, incidents, releases, security updates, backups, enquiry and payment statistics

19.3 Handover and training

Two training sessions (about 90 minutes each) for Acorn staff: admin panel, content, requests, Q&A, payments, scripts; and POSH console for POSH administrators.

Written user manuals with screenshots for each role, and short quick-start sheets for IC members and Organisation Admins.

Technical documentation: architecture, environment setup, deployment, runbooks, API documentation.

Source code in a repository owned by Acorn, with credentials and access transferred on final payment, as per the commercial agreement.

20. Open Questions and Decisions Required


## ID

Question or decision

Why it matters

Owner

Needed by


## D-1

Public site rendering: Next.js (SSR) or a pure React SPA with pre-rendering?

SEO quality and hosting model. Recommended: Next.js for the public site.

Project lead and Acorn

Kick-off


## D-2

Hosting choice (VPS in India, managed cloud or hybrid) and who owns the account

Cost, resilience and data residency

Acorn

Before Phase 1 deployment


## D-3

What does "service" payment cover: fixed packages, ad hoc invoices, or both? Is GST invoicing required on receipts?

Payment catalogue and invoice design

Acorn and accountant

Before Phase 1 payments


## D-4

Will Acorn operate POSH as a managed service for client organisations (recommended), or sell a self-service platform?

Role model, onboarding and liability

Acorn

Before Phase 3


## D-5

Complainant identity model: verified account, one-time link, or pseudonymous first contact

Balance of confidentiality, legal requirements and usability

Acorn legal team

Before Phase 3


## D-6

Retention periods for each data class, including POSH records

Compliance and automated deletion

Acorn legal team

Before Phase 3


## D-7

Are SMS or WhatsApp notifications required? If yes, which provider?

Cost and scope

Acorn

Before Phase 2


## D-8

Languages: English only, or English with Bengali and Hindi?

Content and UI effort

Acorn

Before design sign-off


## D-9

Will team or advocate profiles appear on the website? What can be said under professional-conduct rules?

Compliance and content

Acorn legal team

Before content freeze


## D-10

Is an external penetration test by a third party required before POSH launch?

Budget and assurance

Acorn

Before Phase 3


## D-11

Who are the named recipients of admin alerts and who is the grievance officer?

Notification setup and Privacy Policy

Acorn

Before Phase 1 go-live


## D-12

Is integration with client HRMS systems needed in the first year?

Scope of POSH-A-032

Acorn

Before Phase 4


## D-13

Source of holiday calendar for working-day calculations (West Bengal and central holidays)

Accuracy of reply deadlines

Acorn

Before Phase 3


## D-14

Brand assets, tone of voice and design preferences (reference sites)

Design direction

Acorn

Kick-off


## D-15

Anchor date for the 90-day inquiry period (date complaint received, or date inquiry starts)

Deadline engine default and annual report accuracy (Section 8.16)

Acorn legal team

Before Phase 3


## D-16

Policy for complainants who are not women (gender-neutral track, non-statutory)

Routing rule RT-09 and templates

Acorn legal team

Before Phase 3


## D-17

Are Acorn staff enrolled advocates, and does Bar Council advertising Rule 36 apply to the website and POSH marketing?

Website content, testimonials and service pages

Acorn partners

Before content freeze


## D-18

Acorn external member panel: who, fees, conflict-check policy, and whether Acorn may nominate its own lawyers as external members for client organisations

Conflict of interest and independence of IC

Acorn partners and counsel

Before Phase 3


## D-19

Annual report due date and format required by the West Bengal District Officers

Annual report generator output

Acorn legal team

Before Phase 4


## D-20

Intake Counsellor role: who staffs it, training, and whether they may view complaint content during assisted filing

Confidentiality model and permission matrix

Acorn partners

Before Phase 3


## D-21

Service plan structure and price points (Starter, Professional, Enterprise) and whether subscriptions are billed through Razorpay Subscriptions or invoices

Service catalogue and billing design

Acorn partners and accountant

Before Phase 5


## D-22

Minor complainants (under 18, for example apprentices): policy and child-protection reporting duty

Routing rule RT-13 and workflow

Acorn legal team

Before Phase 3


## D-23

Evidence retention and litigation hold period default

Retention jobs and storage cost

Acorn legal team

Before Phase 3


## D-24

Hosting region and sub-processors acceptable to employer clients for POSH data

Contracts and DPDP obligations

Acorn

Before Phase 3


## D-25

Gig and platform workers: whether POSH duties are offered to them as a statutory or a non-statutory track (Section 8.33, SCT-09)

Routing rule and sector overlay

Acorn legal team

Before Phase 3


## D-26

Treatment of the NCW advisory of June 2026 (annual POSH audit, website disclosure) as binding duty or good practice in the compliance score

Duty register CMP-21 to CMP-23 and score weights

Acorn legal team

Before Phase 2

21. Product Backlog: Epics, User Stories and Acceptance Criteria

The backlog is the working list for development. Each story is small enough to finish in one sprint, has testable acceptance criteria, and traces to requirements in earlier sections. Points use a Fibonacci scale (1, 2, 3, 5, 8, 13) where 1 is a few hours of AI-assisted work and 13 is the largest allowed story; anything bigger is split before the sprint starts. Acceptance criteria are written as short conditions; the full Given, When, Then scripts are created in the test management sheet from these lines.

21.1 Epics

Epic

Name

Scope

Phase

Stories


## E01

Platform foundation

Repository, CI, auth, RBAC, audit, settings, email, notifications, files, validation, rate limiting

1 to 2

14


## E02

Public website and CMS

Layout, homepage, pages, POSH landing page, legal pages, SEO, cookie consent, campaign pages

1 to 2

11


## E03

Service requests

Form, spam protection, admin handling, replies, alerts, reminders

1 to 2

7


## E04

Q&A support

Ask, moderate, answer, publish, FAQ

2

5


## E05

Blog

Editor, media, public pages, workflow, redirects

1 to 2

5


## E06

Script management

Manager, consent-aware loading, kill switch, versions

1 to 2

4


## E07

Payments

Catalogue, Razorpay order, verify, webhook, reconciliation, receipts, refunds

1 to 2

8


## E08

Admin dashboard and users

Dashboard, users, sessions, reports, audit viewer

1 to 2

5


## E09

POSH organisations and IC

Tenants, branches, IC validation, tenure, undertakings, isolation, policies

3 to 4

7


## E10

POSH complaint intake

Applicability wizard, form, OTP, evidence, assisted filing, concern report, status page

3

10


## E11

POSH case workflow

State machine, triage, conciliation, notices, respondent portal, interim relief, timeline engine

3

11


## E12

POSH inquiry

Hearings, minutes, evidence vault, release, quorum, ex parte, video, linked participants

3

8


## E13

POSH report, closure, appeals

Report builder, issuance, employer action, compensation, appeal, closure, aftercare, reopening

3 to 4

8


## E14

POSH compliance and reporting

Duty register, score, annual report, board data, analytics, audit pack, retention, offboarding

4

9


## E15

Training (LMS)

Courses, assignments, certificates, attendance, reminders

5

5


## E16

Prevention and surveys

Surveys, suppression-safe reports, risk assessment

5

3


## E17

Services, helpdesk, legal console

Catalogue, plans, subscriptions, tasks, tickets, directory, assistant, legal console

5

9


## E18

Security and privacy engineering

Encryption, break-glass, watermark, log scrubbing, pen test, privacy flows, backups

3 to 5

7


## E19

Quality and operations

E2E, performance, accessibility, monitoring, seed data, documentation

1 to 5

6

21.2 E01 Platform foundation


## ID

Story

Acceptance criteria

Pts

Phase


## US-001

As a developer I can start the whole stack locally with one command

Compose starts web, admin, api, MongoDB replica set, Redis, mail catcher, object storage emulator; seed script creates a demo user for each role; a fresh machine is productive in under 30 minutes

3

1


## US-002

As a team we have CI on every pull request

Lint, type check, unit tests, secret scan, dependency scan and build run; merge is blocked on failure; build time under 10 minutes

5

1


## US-003

As an admin I can sign in securely

Valid credentials return a 15-minute access token and a rotating refresh cookie (httpOnly, secure, SameSite); wrong password never reveals which field failed; 5 failures trigger delay and an alert; refresh reuse revokes the session family

8

1


## US-004

As a Super Admin I can invite users and users can reset passwords

Invite and reset links are single use and expire (invite 72 hours, reset 30 minutes); password rules and breach-list check enforced; tokens stored hashed

5

1


## US-005

As a privileged user I must use MFA

TOTP enrolment with QR and manual key; 10 backup codes shown once; MFA required on privileged roles; recovery needs Super Admin approval and is logged

8

2


## US-006

As a system I enforce role-based permissions from data

Permissions load from the role matrix; every route declares the permission it needs; default deny; automated test fails if a route has no declared permission

8

1


## US-007

As an auditor I can see an append-only audit trail

Sensitive actions write actor, role, entity, before and after (redacted), IP, user agent; the app has no update or delete path; viewer filters by actor, entity, date

5

1


## US-008

As a Super Admin I can change site settings

Settings are validated, cached for 60 seconds, versioned; secrets are never returned

3

1


## US-009

As a system I send transactional email reliably

Queue with retries and backoff; templates with Handlebars; plain-text alternative; bounce and complaint handling; a log of every send without content for POSH messages

5

1


## US-010

As an admin I receive real-time notifications

Socket.io handshake with JWT; rooms per user and role; events carry IDs and generic text only; polling fallback; notification centre with read state

8

2


## US-011

As a user I can upload files safely

Type, size and magic-byte checks; ClamAV scan; random storage keys; private bucket; signed expiring URLs; infected files quarantined and alerted

8

1


## US-012

As a system I validate input and limit abuse

Zod schemas on every endpoint; unknown fields rejected; operator injection blocked; rate limits per Section 26.5; uniform error format

5

1


## US-013

As a system I support soft delete and retention flags

Soft delete fields; queries exclude deleted by default; retention job scaffold respects legal hold

3

1


## US-014

As a team we can switch features on and off

Feature flags stored in settings; flags for the POSH portal, assistant, LMS and surveys; flag state visible to Super Admin only

2

1

21.3 E02 to E08 Website, requests, Q&A, blog, scripts, payments, admin


## ID

Story

Acceptance criteria

Pts

Phase


## US-020

As a visitor I see a fast, responsive layout

Header with sticky navigation and primary call to action; mobile menu accessible by keyboard; footer with disclaimer; LCP under 2.5 s on a mid-range phone

5

1


## US-021

As an admin I can control the homepage sections

Sections editable and re-orderable; preview before publish; revert to previous version

8

1


## US-022

As a visitor I can read About, Services and each service page

Pages render from CMS; each service page has a pre-filled request button and FAQs

5

1


## US-023

As a visitor I can use the POSH landing page

All blocks in Section 6.4.1 present; report-a-concern button routes to the portal; checklist download captures an email with consent

5

1


## US-024

As a visitor I can contact the firm

Contact form saves to database and emails admin; anti-spam; map and click-to-call on mobile

3

1


## US-025

As an admin I can maintain legal pages

Versioned pages with effective dates; disclaimer text appears in the footer on every page

3

1


## US-026

As a marketer I get SEO basics

Unique title and description per page; canonical, Open Graph, sitemap.xml, robots.txt, structured data validates

5

1


## US-027

As a visitor I control cookies

Banner with accept, reject and manage; non-essential scripts blocked until consent; choice stored and revisitable

5

1


## US-028

As a marketer I can build campaign landing pages

Template picker, slug, UTM capture stored with requests, no-index option, preview link

8

2


## US-029

As a visitor I get helpful error pages

Branded 404 and 500; no stack traces; links to key pages

2

1


## US-030

As an admin I can edit menus, footer and contact details

Changes publish within 60 seconds; audit logged

8

1


## US-040

As a visitor I can submit a service request

Fields per Section 6.5.1; server validation; reference ACN-SR-YYYY-NNNNNN; confirmation page; admin email within 60 seconds; acknowledgement email

8

1


## US-041

As the firm I am protected from spam

Honeypot and Turnstile; 5 per hour per IP; duplicate block for 2 minutes; blocked attempts logged

3

1


## US-042

As an admin I can list, filter and export requests

Filters by status, category, date, assignee; search; CSV export respects role

5

1


## US-043

As an admin I can work a request

Status changes, assignment, notes, follow-up date; timeline records each change

5

1


## US-044

As an admin I can reply to a requester

Rich text reply sent by email and stored in the thread; replies logged

5

2


## US-045

As an admin I get a live alert for a new request

Toast, counter and optional sound within 5 seconds; polling fallback works

3

2


## US-046

As a manager I get reminders for stale requests

Configurable threshold; daily digest; no duplicate reminders

3

2


## US-050

As a visitor I can ask a question

Fields per QNA-001; private or publishable choice; reference; confirmation

5

2


## US-051

As an admin I can moderate and answer

Queue with status filters; rich text answer emailed; decline with reason template

5

2


## US-052

As an admin I can publish an anonymised Q&A

Anonymise tool removes names and details; category, pin and order; publish and unpublish

5

2


## US-053

As a visitor I can search the FAQ

Search, category filter, accordion, FAQPage markup valid

5

2


## US-054

As an admin I can reuse answers

Canned response library with variables

2

2


## US-060

As an editor I can write and publish articles safely

Rich text editor; server sanitisation proves script and event attributes are removed; SEO fields; statuses

8

1


## US-061

As an editor I can manage images

Upload, resize, alt text required, reuse; WebP variants

5

1


## US-062

As a visitor I can browse the blog

List, detail, categories, tags, search, related posts, reading time, share links

8

1


## US-063

As an editor I can schedule and review

Draft, In Review, Scheduled, Published, Archived; scheduled posts publish within 1 minute; revision history with restore

5

2


## US-064

As an SEO owner I keep old links alive

Slug change creates 301; RSS feed; sitemap includes posts

3

2


## US-070

As a marketer I can add scripts

Name, placement, scope, category, code or URL; enable and disable; role limited

5

1


## US-071

As a visitor my consent is respected

Analytics and marketing scripts load only after consent; CSP nonce for first-party inline scripts; no custom script on admin, payment or POSH pages

8

1


## US-072

As an admin I can stop all scripts instantly

Kill switch takes effect within 60 seconds; risky patterns warn and need confirmation

3

1


## US-073

As an admin I can roll back a script

Versions with diff and restore

3

2


## US-080

As an admin I manage the fee catalogue

Name, description, amount, GST rate, active; price history

3

1


## US-081

As a payer I can start a payment

Server creates the Razorpay order from the catalogue amount; tampered client amount is ignored; order stored

5

1


## US-082

As a payer I see the correct result

Server verifies HMAC signature then fetches the payment from Razorpay; only then marks Paid; wrong signature is rejected and alerted

5

1


## US-083

As the system I process webhooks correctly

Signature verified; event ID idempotency; out-of-order events handled; failures retried

5

1


## US-084

As Finance I trust the records

Reconciliation job every 15 minutes resolves pending orders and daily compares with settlements

3

1


## US-085

As a payer I get a receipt

Sequential receipt number; GST breakup; PDF emailed and downloadable

5

1


## US-086

As Finance I can search, export and refund

Filters; CSV and PDF export; full or partial refund with reason; audit

5

2


## US-087

As an admin I can send a payment link

Link for fixed amount and reference; expiry; status tracking

3

1


## US-090

As an admin I see the day at a glance

Counters and charts per role; live updates; no case content for POSH widgets

5

2


## US-091

As a Super Admin I manage users

Create, deactivate, assign roles from the matrix; cannot remove the last Super Admin

5

1


## US-092

As a Super Admin I manage sessions

See devices; force logout; idle and absolute timeout; new-device alert

3

2


## US-093

As a manager I read reports

Enquiry funnel, response time, Q&A backlog, payments by status, blog performance; CSV export

5

2


## US-094

As a Super Admin I can read the audit log

Filters, export, no edit path

3

1

21.4 E09 to E13 POSH core


## ID

Story

Acceptance criteria

Pts

Phase


## US-100

As a POSH Administrator I can onboard an organisation

Legal name, type, branches, headcount, contacts, plan; organisation settings; branding for notices

5

3


## US-101

As an Organisation Admin I can create the IC

Members with roles and gender; composition validator flags missing external member, wrong ratio, no senior woman as Presiding Officer; appointment order generated

8

3


## US-102

As a POSH Administrator I get IC tenure and vacancy alerts

Alerts at 90, 60 and 30 days; vacancy detected immediately

3

3


## US-103

As an IC member I sign confidentiality and conflict declarations

Cannot open a case until both are signed; yearly renewal; audit trail

5

3


## US-104

As an Organisation Admin I invite IC members and staff

Invites with role scope; MFA enrolment forced

3

3


## US-105

As the platform I isolate tenants

Data access layer injects organisationId; build fails on direct collection access in POSH code; negative tests for every endpoint

8

3 to 4


## US-106

As an Organisation Admin I keep the policy current

Policy versions; acknowledgement campaign; reports

5

4


## US-110

As a complainant I am guided to the right place

Wizard asks plain questions; routing outcome per RT-01 to RT-21; nothing is rejected silently; result explained in plain language

8

3


## US-111

As a complainant I can file in steps and save as I go

Steps A to H of Section 8.14; autosave every 20 seconds; resume within 30 days; optional fields never block; works at 360 px; keyboard and screen reader usable

13

3


## US-112

As a complainant I can verify and sign

Email or mobile OTP; typed name and OTP signature; signature record saved

5

3


## US-113

As a complainant I can attach evidence

Upload, description, date and source per file; scan; hash; progress and retry; mobile camera upload

5

3


## US-114

As an Intake Counsellor I can help a complainant file

Assisted mode with consent record; access ends on submit; every view logged

5

3


## US-115

As anyone unsure I can send a concern without a formal complaint

Concern record without statutory timers; secure reply inbox; convert to complaint

3

4


## US-116

As a legal heir or representative I can file where permitted

Authorisation upload; record type; counsel flag

3

4


## US-117

As a complainant I get an acknowledgement and printable copies

Case ID; locked PDF copies with verification code; content-free email or SMS

5

3


## US-118

As a complainant I can see where my case stands

Stage name, next step, dates, hearings, notices; no IC deliberations

5

3


## US-119

As a complainant I can withdraw or request conciliation

Clear confirmation; recorded; Presiding Officer notified

3

3


## US-120

As the system I enforce the case state machine

Only T01 to T30 allowed; guards enforced server-side; every transition audited; invalid transitions return a clear error; transition table data-driven

13

3


## US-121

As an IC member or POSH Administrator I see my cases

Masked names; stage, age, next deadline; filters; no content in search

5

3


## US-122

As the Presiding Officer I run triage

Completeness, routing, conflicts, limitation, urgent flag; extension request and order; information request

5

3


## US-123

As an IC member I keep a case diary and private notes

Chronological events; notes encrypted; not visible to parties

3

3


## US-124

As the IC I can run conciliation properly

Request record, terms editor with monetary-term guard, consents, outcome, copies

5

3


## US-125

As the IC I can issue notices

Templates with merge; delivery log; read receipts; printable; 7-day timer

8

3


## US-126

As a respondent I can read notice and reply

Secure link or account; copy of complaint and documents as released; reply with documents; extension request

5

3


## US-127

As a complainant I can ask for interim relief and the IC can decide

Request, decision, employer tracking, review dates

5

3


## US-128

As the Presiding Officer I trust the deadlines

All TM timers computed with explanation; legal and safe dates; calendar rules; recalculation on change

13

3


## US-129

As the Presiding Officer I get alerts and escalations

Thresholds in Section 8.16.1; once per threshold; escalation to POSH Administrator and Managing Partner

5

3


## US-130

As the Presiding Officer I see urgent safety cases first

Urgent flag raises an alert within 15 minutes and pins the case

2

3


## US-140

As the IC I can schedule hearings

Participants, mode, venue, interpreter, support person, accessibility; notices; reminders

5

3


## US-141

As the IC I can record minutes and statements

Structured minutes; statement read-back; e-sign by deponent

5

3


## US-142

As the IC I can manage evidence

Exhibit numbering, hash, custody log, redacted copies, integrity statement

8

3


## US-143

As the IC I can release documents to a party

Release action logs what and when; recipient sees only released items

3

3


## US-144

As the IC I follow quorum, recusal and conflict rules

Quorum check before sign; recusal removes access; replacement flow

5

3


## US-145

As the IC I can follow the absence and ex parte path

Notices recorded; T18 blocked until prerequisites exist

3

3


## US-146

As the IC I can run a video hearing

Link entry; waiting room guidance; undertaking before join; recording policy flag

2

3


## US-147

As a witness, support person or interpreter I can take part

Single-purpose links after undertaking; expire after use

5

3


## US-150

As the IC I can write the findings and report

Structured sections; majority and dissent; compensation worksheet; report lint blocks issuance on defects

13

3


## US-151

As the IC I can issue the report

Locked PDF with verification code; delivery to employer and parties; 60 and 90 day timers start

5

3


## US-152

As an Organisation Admin I record action taken

Per recommendation with proof; IC verification; overdue escalation

3

3


## US-153

As the IC I can calculate compensation


## Section 15 factors; instalments; recovery route; employer implementation

3

3


## US-154

As the POSH Administrator I can record appeals and legal holds

Appeal record; legal hold freezes deletion; lifted only with counsel approval

5

3


## US-155

As the IC I can close a case properly

Closure checklist; outcome code; retention clock; aftercare schedule

3

3


## US-156

As an Intake Counsellor I run aftercare and retaliation response

Check-in tasks at 30, 90 and 180 days; retaliation creates linked priority case

5

4


## US-157

As the Presiding Officer I can reopen and link cases

Approvals recorded; counter-complaint linking with conflict decisions

3

4

21.5 E14 to E19 Compliance, training, services, security and quality


## ID

Story

Acceptance criteria

Pts

Phase


## US-160

As an Organisation Admin I see what is due

Duty register CMP-01 to CMP-23 with status, evidence and due dates; tasks and reminders

5

4


## US-161

As an Organisation Admin I see my compliance score

Daily score, history, top gaps with legal consequence and linked service; branch view

8

4


## US-162

As a POSH Administrator I can generate the annual report

Counts match the case records; pending beyond 90 days included; DOCX and PDF; no identifying detail

8

4


## US-163

As an employer I get the Board’s Report and BRSR data

Data sheet with counts and gender composition; BRSR extract

5

4


## US-164

As a manager I see analytics safely

Cases by stage, days per stage, overdue, outcomes; small-cell suppression; no names

8

4


## US-165

As an employer I can export an audit readiness pack

Zip with index; no case content

3

4


## US-166

As a POSH Administrator I keep the district and SHe-Box directory

District Officers, Nodal Officers, last verified, verifier

3

4


## US-167

As the platform I run retention safely

Review flags, dual approval, certificate of destruction, legal hold respected, statistical record kept

5

4


## US-168

As an employer leaving Acorn I can take my data

Encrypted export, checksum, deletion on agreed date except held data

3

4


## US-170

As an admin I can build courses

Lessons, quiz, pass mark, versions, languages, approval

8

5


## US-171

As an Organisation Admin I can assign training

Rules by group, new joiner, role; learner link; resume; mobile friendly

8

5


## US-172

As a learner I receive a certificate

Verification code and QR; expiry; register

3

5


## US-173

As an admin I record live session attendance

QR check-in or list upload; certificate on pass

3

5


## US-174

As an Organisation Admin I track completion

Reminders; escalation; reports by department

5

5


## US-180

As an admin I can run an anonymous survey

Builder, schedule, anonymous links, language versions

8

5


## US-181

As an admin I can read survey results safely

Cells below 5 hidden; free text screened for names

5

5


## US-182

As an Organisation Admin I can run a risk assessment

Questionnaire, heat map, action plan tasks

5

5


## US-190

As Acorn I can define services, plans and add-ons

CRUD with versions, prices, GST, limits; comparison page

8

5


## US-191

As Acorn I can run subscriptions

Start, renew, upgrade; usage counters with warning at 80%; invoices through payment module; no lockout of an open case

8

5


## US-192

As an Organisation Admin I can see the service timeline

Delivery tasks, due dates, status, notes

5

5


## US-193

As a user I can raise and track a ticket

Categories, priorities, SLA timers, knowledge base, no case content, satisfaction survey

8

5


## US-194

As anyone I can find help

Helpline, legal aid, counsellor and interpreter directory with last verified date

3

3 to 5


## US-195

As a visitor I can ask the rule-based assistant

Answers from approved articles; shows helpline directory; offers a service request; no advice and no complaint collection

5

5


## US-196

As the Legal Administrator I govern rules and templates

Rule sets, templates, directories, watch list; dual approval; scenario tests gate publishing

13

5


## US-197

As an admin I manage notification templates and preferences

Templates by language; content lint; user preferences within allowed channels

5

5


## US-198

As a party I can give anonymous feedback after closure

Short survey; results aggregated across at least 5 cases

2

4


## US-200

As the platform I encrypt sensitive fields

Envelope encryption library with per-tenant data keys; key rotation; decryption only in service layer; unit and property tests

8

3


## US-201

As a Managing Partner I control break-glass

Reason required; time-limited; alert to Managing Partner and POSH Administrator; logged

5

3


## US-202

As the IC I read case documents in a protected viewer

Watermark with name and time; no bulk select; download needs a reason

5

3


## US-203

As a security lead I prevent sensitive data in logs

Redaction middleware; tests that scan logs and error reports for seeded sensitive strings

3

3


## US-204

As a security lead I complete a penetration test cycle

Test plan, findings tracked, critical and high fixed and retested before POSH go-live

8

3 and 5


## US-205

As a data principal I can exercise my rights

Notice, consent records, request intake, identity check, response tracking, hold check

5

4


## US-206

As an operator I can prove backups work

Daily encrypted backups; restore script; drill report each quarter

5

1 and 3


## US-210

As QA I run end-to-end tests of critical journeys

Journeys in Section 29.1 automated in Playwright and run nightly

13

1 to 5


## US-211

As QA I enforce performance budgets

k6 scenarios; Lighthouse CI budgets; failures block release

5

1 to 5


## US-212

As QA I verify accessibility

axe checks in CI; manual keyboard and screen reader review for key flows; defects fixed

5

1 to 5


## US-213

As an operator I can see health

Uptime checks, error tracking with scrubbing, dashboards, alerts per Section 27.8

5

1


## US-214

As a team we have a demo and test dataset

Seed script creates demo organisation, IC, cases at every stage, courses, tickets

3

3


## US-215

As a client I receive manuals and training

Role manuals, quick-start sheets, two training sessions, runbooks

8

1 to 5

22. UX Specification: Design System, Trauma-Informed Design and Screen Inventory

22.1 Design system

The design system below is a proposal that the designer confirms against Acorn’s logo and brand assets. It is written as tokens so that developers can build once and re-theme.

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

22.2 Trauma-informed design for the complaint portal

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

22.3 Global UI patterns

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

22.4 Screen inventory

Each screen has an ID used in tickets and tests. “States” lists the states the designer and developer must cover in addition to the normal state: loading, empty, error, no permission, and offline where relevant.

22.4.1 Public site


## ID

Screen

Route

Roles

Key elements and states


## W-01

Homepage

/

Public

Sections per 6.3; hero call to action; latest posts; FAQ preview


## W-02

About

/about

Public

Firm profile, philosophy, values, team if approved


## W-03

Services index

/services

Public

Cards; filters not required


## W-04

Service detail

/services/:slug

Public

Overview, process, FAQs, request button with category pre-selected


## W-05

POSH landing page

/posh

Public

Blocks per 6.4.1; resources; concern report link; consultation form


## W-06

Campaign landing page

/lp/:slug

Public

Template blocks; form; UTM capture; no-index flag


## W-07

Blog index

/blog

Public

Search, categories, pagination, empty state


## W-08

Blog article

/blog/:slug

Public

Content, author, date, share, related posts, JSON-LD


## W-09

FAQ and ask a question

/faq

Public

Search, accordion, ask form with privacy choice, confirmation


## W-10

Request a service

/request-service

Public

Form per 6.5.1; confirmation with reference


## W-11

Contact

/contact

Public

Details, map link, form


## W-12

Pay online

/pay

Public

Service picker or invoice reference; amount shown from the server; Razorpay Checkout


## W-13

Payment status and receipt

/pay/status/:id

Public

Success, failure, pending, receipt download, retry guidance


## W-14

Privacy policy, terms, disclaimer, cookies, refund policy

/privacy etc.

Public

Versioned text with effective date


## W-15

Cookie preferences

Overlay

Public

Categories, accept, reject, save


## W-16

Knowledge base and POSH help centre

/help

Public

Search, article by role, helpline directory link


## W-17

Helpline and referral directory

/help/directory

Public

Filter by need and district; last-verified date


## W-18

Rule-based assistant

Widget

Public

Scripted questions; disclaimer; hand-off to service request


## W-19

Certificate verification

/verify/:code

Public

Shows certificate validity without personal data beyond name and course


## W-20

404 and error pages

*

Public

Navigation, search, contact

22.4.2 Admin panel


## ID

Screen

Route

Roles

Key elements and states


## A-01

Sign in and MFA

/admin/login

All admin

Email and password, MFA code, backup code, lockout message


## A-02

Dashboard

/admin

All admin

Role-based widgets, live counters, charts, deadlines


## A-03

Service requests list

/admin/requests

Admin, Support

Filters, search, export, bulk assign, unread badges


## A-04

Service request detail

/admin/requests/:id

Admin, Support

Details, timeline, notes, reply, status, follow-up


## A-05

Q&A queue and detail

/admin/questions

Admin, Support, Editor

Queue, answer editor, anonymise, publish, templates


## A-06

Blog list and editor

/admin/posts

Editor, Admin

Rich text, SEO panel, schedule, revisions, preview


## A-07

Media library

/admin/media

Editor, Admin

Grid, upload, alt text


## A-08

Pages and homepage sections

/admin/pages

Editor, Admin


## Section list, drag order, preview, versions


## A-09

Menus, footer and contact details

/admin/site

Admin

Forms and preview


## A-10

Scripts

/admin/scripts

Marketing, Super Admin

List, editor, scope, consent category, kill switch, versions


## A-11

Redirects and SEO defaults

/admin/seo

Marketing, Super Admin

Table and editor


## A-12

Payment catalogue

/admin/catalogue

Admin, Finance

Items, GST, active


## A-13

Payments

/admin/payments

Finance, Admin

List, filters, detail, refund, export, reconciliation view


## A-14

Payment links

/admin/payment-links

Finance, Admin

Create, expire, status


## A-15

Users and roles

/admin/users

Super Admin

List, invite, role matrix, deactivate, sessions


## A-16

Notifications and preferences

/admin/notifications

All admin

Centre, preferences


## A-17

Reports

/admin/reports

Admin, Finance

Report picker, date range, export


## A-18

Audit log

/admin/audit

Super Admin

Filters, detail, export


## A-19

Settings

/admin/settings

Super Admin

Email, Razorpay mode, security, retention, maintenance mode


## A-20

Service catalogue and plans

/admin/services

POSH Admin, Super Admin

Services, plans, add-ons, versions


## A-21

Subscriptions and orders

/admin/subscriptions

POSH Admin, Finance

List, detail, usage, invoices


## A-22

Delivery tasks

/admin/delivery

POSH Admin

Board by status, due dates


## A-23

Helpdesk

/admin/helpdesk

Support, POSH Admin

Queue, ticket detail, macros, SLA indicators


## A-24

Knowledge base admin

/admin/kb

Legal Admin, Support

Articles, approval, versions


## A-25

Support directory admin

/admin/directory

POSH Admin, Legal Admin

Entries, verification dates


## A-26

Legal Console: rule sets

/admin/legal/rules

Legal Admin

Parameters, effective dates, approval, scenario test results


## A-27

Legal Console: templates

/admin/legal/templates

Legal Admin

Versions, languages, preview, approval


## A-28

Legal Console: watch list

/admin/legal/watch

Legal Admin

Items, owner, review date, outcome


## A-29

Holiday calendars

/admin/legal/calendars

Legal Admin

Central, state, organisation lists


## A-30

Course builder

/admin/lms/courses

POSH Admin

Lessons, quiz, versions


## A-31

Survey builder

/admin/surveys

POSH Admin

Questions, schedule, links

22.4.3 POSH portals


## ID

Screen

Route

Roles

Key elements and states


## C-01

POSH portal home

/posh/portal

Complainant, public

Plain explanation, start a complaint, concern report, helpline, Quick Exit, language


## C-02

Applicability wizard

/posh/start

Complainant

Plain questions; result with explanation; Local Committee referral view


## C-03

Complaint form, steps A to H

/posh/file

Complainant

Stepper, autosave status, review screen, save and exit


## C-04

OTP and signature

/posh/file/sign

Complainant

OTP entry, typed signature, confirmation


## C-05

Submission confirmation

/posh/file/done

Complainant

Case ID, printable copies, next steps, support options


## C-06

My case status

/posh/my-case

Complainant

Stage, next step, dates, hearings, notices, messages


## C-07

My documents and notices

/posh/my-case/docs

Complainant

Released documents, upload supplements


## C-08

Interim relief request

/posh/my-case/interim

Complainant

Short form, status


## C-09

Withdraw or conciliation request

/posh/my-case/request

Complainant

Choices with plain consequences


## C-10

Support and accessibility requests

/posh/my-case/support

Complainant

Support person, interpreter, accommodation


## C-11

Concern report

/posh/concern

Anyone

Short form and secure inbox


## C-12

Retaliation report

/posh/retaliation

Complainant, witness

Short form; priority handling note


## R-01

Respondent notice

/posh/respondent

Respondent

Notice, rights, anti-retaliation statement, reply deadline


## R-02

Respondent reply

/posh/respondent/reply

Respondent

Reply, documents, witness list, extension request


## R-03

Respondent case status

/posh/respondent/status

Respondent

Dates, hearings, released documents, report


## I-01

IC workspace home

/posh/ic

IC members

My cases, deadlines, tasks, urgent flags


## I-02

Case file

/posh/ic/cases/:id

IC members

Tabs: overview, complaint, parties, evidence, hearings, notices, notes, timeline, report


## I-03

Triage

/posh/ic/cases/:id/triage

IC members

Checklist, limitation, routing, conflicts, information request


## I-04

Conciliation

/posh/ic/cases/:id/conciliation

IC members

Request, terms, guard messages, outcome


## I-05

Notices

/posh/ic/cases/:id/notices

IC members

Template picker, preview, issue, delivery log


## I-06

Hearings

/posh/ic/cases/:id/hearings

IC members

Scheduler, participants, minutes, statements


## I-07

Evidence vault

/posh/ic/cases/:id/evidence

IC members

Exhibits, hash, custody log, redact, release


## I-08

Findings and report

/posh/ic/cases/:id/report

IC members

Structured editor, compensation worksheet, lint results, sign


## I-09

Interim relief

/posh/ic/cases/:id/interim

IC members

Request, decision, employer tracking


## I-10

Closure and aftercare

/posh/ic/cases/:id/close

IC members

Checklist, outcome, aftercare schedule


## I-11

Confidentiality and conflict declarations

/posh/ic/declarations

IC members

Sign before access


## I-12

IC conduct guide and quick reference

/posh/ic/guide

IC members

Checklists and procedure


## O-01

Organisation console home

/posh/org

Organisation Admin

Compliance score, tasks, deadlines, service timeline


## O-02

IC roster

/posh/org/ic

Organisation Admin

Members, composition validation, tenure


## O-03

Policy library

/posh/org/policies

Organisation Admin

Versions, acknowledgement campaigns


## O-04

Notice display tracker

/posh/org/notices

Organisation Admin

Locations and verification


## O-05

Training dashboard

/posh/org/training

Organisation Admin

Assignments, completion, certificates


## O-06

Employer action tasks

/posh/org/actions

Organisation Admin

Case ID and recommended action only


## O-07

Reports and annual report

/posh/org/reports

Organisation Admin

Generate, download, submission proof


## O-08

Surveys and risk assessments

/posh/org/prevention

Organisation Admin

Run, results, action plans


## O-09

Subscription and invoices

/posh/org/plan

Organisation Admin

Plan, usage, invoices, upgrade request


## O-10

Support

/posh/org/support

Organisation Admin

Tickets, knowledge base


## X-01

POSH Admin home

/posh/admin

POSH Admin

All organisations, deadlines, overdue, urgent flags


## X-02

Organisations

/posh/admin/orgs

POSH Admin

List, onboarding wizard, settings


## X-03

Case oversight

/posh/admin/cases

POSH Admin

Metadata list; no content; break-glass request


## X-04

External member panel

/posh/admin/panel

POSH Admin

Directory, conflict checks, assignments


## X-05

Compliance overview

/posh/admin/compliance

POSH Admin

Scores, gaps, tasks across organisations


## X-06

Break-glass requests

/posh/admin/breakglass

Super Admin

Reason, approval, expiry, log


## X-07

Aftercare and retaliation queue

/posh/admin/aftercare

Intake Counsellor

Tasks by due date


## X-08

Intake desk

/posh/admin/intake

Intake Counsellor

Assisted filing sessions, concern inbox


## X-09

Retention and legal hold

/posh/admin/retention

POSH Admin, counsel

Review queue, holds, dual approvals


## X-10

Reports and analytics

/posh/admin/analytics

POSH Admin

Aggregate dashboards with suppression

23. Business Rules Catalogue and State Machines

23.1 Business rules

Business rules are numbered so that developers, testers and the client can discuss them without ambiguity. Rules that carry legal weight cross-refer to Section 8.


## ID

Area

Rule


## BR-001

Requests

A reference number is unique, sequential per year and never reused, even for deleted or spam requests.


## BR-002

Requests

Requests marked Spam are excluded from counts and reports but remain stored for 90 days for abuse analysis.


## BR-003

Requests

Attachments are scanned before an admin can open them; a failed scan quarantines the file and alerts the Super Admin.


## BR-004


## Q&A

A question marked Private reply only can never be published; Publish requires the asker’s consent flag plus anonymisation by an admin.


## BR-005


## Q&A

Published answers show the standard disclaimer and the date of last review.


## BR-006

Blog

A post cannot be published without a title, slug, excerpt, cover alt text and SEO description.


## BR-007

Blog

Content Editors can submit for review; only Admin or Super Admin can publish.


## BR-008

Scripts

Only the Marketing Manager and Super Admin can enable a script; any change to an enabled script takes it offline until re-approved if the code changed.


## BR-009

Scripts

No custom script ever loads on /admin, /pay or /posh routes.


## BR-010

Payments

The amount, currency and item are always set by the server; the client sends only the item ID.


## BR-011

Payments

A payment moves to Paid only after signature verification and a server-side fetch of the payment from Razorpay, or a verified webhook.


## BR-012

Payments

A receipt number is allocated once at the moment of Paid and is never changed; refunds create a credit note number.


## BR-013

Payments

Refunds can only be issued up to the captured amount and only by Finance or Super Admin with a reason.


## BR-014

Admin

The last active Super Admin cannot be deactivated or demoted.


## BR-015

Admin

A user cannot change their own role or approve their own break-glass request.


## BR-016

Admin

Privileged roles must have MFA enabled before access to any module other than their profile.


## BR-017

Admin

Admin sessions expire after 30 minutes idle and 12 hours absolute.


## BR-018

Notifications

Any message about a POSH case uses only templates flagged content-safe; templates with free text or merge fields from case data are blocked.


## BR-019

POSH org

An organisation with 10 or more employees at a branch must have an IC for that branch before cases can be accepted for that branch; otherwise the system warns and routes new complaints to the POSH Administrator for guidance, but never refuses to store a complaint.


## BR-020

POSH org

An IC member cannot be active in two ICs of the same organisation at the same time unless the policy allows.


## BR-021

POSH org

A member whose tenure ended cannot be assigned to new cases; they can finish existing ones if the policy allows.


## BR-022


## IC

Composition is valid only if there is a Presiding Officer who is a senior woman employee (or nominated per Section 4), at least two employee members, one external member, and at least half women; validity is evaluated on every membership change.


## BR-023

Intake

A complaint is never rejected by the system. Routing may refer or flag it, but the record is stored and a human decides.


## BR-024

Intake

Limitation is computed from the date of the last incident; a complaint beyond three months follows T04.


## BR-025

Intake

A complainant’s contact preference rules override defaults: if she chooses a personal channel, no message goes to a work address.


## BR-026

Intake

Draft complaints are encrypted and deleted after 30 days without edits.


## BR-027

Intake

The urgent flag sends an alert within 15 minutes and cannot be removed except by the Presiding Officer with a note.


## BR-028

Case

Only transitions in Section 8.15.2 are allowed; each requires its guards.


## BR-029

Case

A case’s rule set version is stamped on creation and on each timer start.


## BR-030

Case

A respondent’s name is matched against IC members, Acorn staff and the organisation’s IC roster on submission and on every update; matches create a conflict task.


## BR-031

Case

A member with a conflict cannot open the case until the conflict is cleared by the Presiding Officer (or by the POSH Administrator if the Presiding Officer is conflicted).


## BR-032

Conciliation

Conciliation starts only on a recorded written request of the complainant; terms with a monetary amount are blocked at save and at close.


## BR-033

Notice

The copy of the complaint must be dispatched within 7 working days of receipt; if missed, a delay reason is mandatory and the Presiding Officer and the POSH Administrator are alerted.


## BR-034

Notice

A notice is “delivered” only when the portal logs it as available to the party and the party’s contact preference was respected.


## BR-035

Inquiry

A report cannot be issued unless both parties had an opportunity to be heard on record or the ex parte path was completed.


## BR-036

Inquiry

The inquiry clock stops only for a recorded clock-stop ground (CS-01).


## BR-037

Inquiry

Any case above 90 days is counted as pending beyond 90 days in every report, whatever the reason.


## BR-038

Evidence

Evidence is immutable after upload; corrections are new versions; every version keeps its hash.


## BR-039

Evidence

A document is released to the other party only by an IC release action; releasing the original without redaction when a redacted copy exists needs a confirmation.


## BR-040

Report

Reports are locked after issuance; changes need a new dated addendum signed by the quorum.


## BR-041

Report

A finding of malicious or false complaint requires a separate case, a separate decision and counsel review before issue; it is never a field on the original case.


## BR-042

Action

The 60-day period starts on the employer’s recorded receipt of the report; overdue action escalates on day 61.


## BR-043

Appeal

The 90-day period starts on the date of the recommendation; the system shows the end date to both parties.


## BR-044

Closure

A case cannot close with an unverified employer action or an open interim relief, unless the Presiding Officer records a reason.


## BR-045

Confidentiality

Any export of case content needs the Presiding Officer’s permission or break-glass, a reason, and is watermarked and logged.


## BR-046

Confidentiality

Case content is never indexed by search, never included in analytics and never sent to third-party services (including error trackers and email providers).


## BR-047

Reporting

All statistics apply the suppression threshold and show “fewer than 5” for small cells.


## BR-048

Reporting

The annual report counts cases by the date received for “received”, by the date closed for “disposed of”, and by open status at period end for “pending”, and separately shows those above 90 days.


## BR-049

Retention

Retention jobs never delete data under legal hold; deletion needs dual approval and produces a certificate; a non-identifying statistical record is kept.


## BR-050

Retention

Data subject erasure requests are assessed against statutory retention and hold; the response explains the outcome.


## BR-051


## LMS

A certificate expires after its validity; assignment rules create a new assignment 30 days before expiry.


## BR-052


## LMS

A learner’s answers are visible only to the Organisation Admin and Acorn service staff, and never to the learner’s manager unless the organisation enables it.


## BR-053

Surveys

A survey cannot be linked to a person; the platform stores no mapping between invite and response.


## BR-054

Surveys

Results are hidden for any group below the threshold, and for the whole survey if fewer than 5 responses.


## BR-055

Services

A subscription limit warns at 80% and 100% but never blocks an existing case, a complainant or an IC member.


## BR-056

Services

Plan changes take effect on the next billing date unless Acorn approves an immediate change; usage history is kept.


## BR-057

Helpdesk

A ticket may refer to a case by ID only; free text is scanned for patterns like names near “complaint” and warns the agent not to enter case details.


## BR-058

Helpdesk

SLA timers pause only in the Waiting for customer state.


## BR-059

Legal Console

No parameter or template reaches production without a second approver and a passing scenario test run.


## BR-060

Directory

A directory entry not verified within 180 days shows a “needs verification” badge and is reported to the Legal Administrator.


## BR-061

Security

Break-glass access lasts at most 2 hours, needs a written reason and a second approver, alerts the Managing Partner, and is shown in the audit log with a banner to the user.


## BR-062

Security

A privileged user logging in from a new device triggers an email alert and, for POSH roles, a step-up MFA prompt.


## BR-063

Privacy

Consent records store the notice version, language, timestamp and channel and can be exported on request.


## BR-064

Privacy

Personal data of visitors who submit a request but never become clients is reviewed for deletion after 24 months, unless a legal reason applies.


## BR-065

Tenancy

No query in POSH code may omit organisationId; the data access layer throws if it is missing.


## BR-066

Tenancy

Acorn staff roles are scoped to the organisations they are assigned; a POSH Administrator sees only assigned organisations.


## BR-067

Language

Documents are generated in the language chosen by the recipient, with the English version stored as the record of reference.


## BR-068

Calendar

The calendar for a branch is the central holidays, the state holidays of the branch’s state and the organisation’s own list; changes are versioned and apply to future timers.


## BR-069

Non-statutory cases

A case marked Non-statutory (RT-09, RT-17, concern report) uses the organisation’s policy timelines, appears separately in reports and is excluded from statutory counts unless the organisation elects to include it.


## BR-070

Aftercare

Aftercare check-ins are offered, never forced; a declined check-in is recorded.

23.2 State machines for other modules

Module

States and allowed transitions

Service request

New → In Review → Contacted → Awaiting Client → Proposal Sent → Converted or Closed. Any state → Spam (admin). Closed and Converted can be reopened to In Review by Admin.

Question

Pending → Answered → Published (optional) → Unpublished. Pending → Declined (reason) or Spam. Published → Answered (unpublish).

Blog post

Draft → In Review → Scheduled or Published → Archived. Published → Draft (unpublish). Scheduled → Published (job). Archived → Draft.

Script

Draft → Pending approval → Enabled → Disabled → Archived. Enabled → Pending approval when code changes.

Payment

Created → Attempted → Authorised (if applicable) → Paid or Failed. Paid → Partially refunded → Refunded. Created or Attempted → Expired. Webhook can move Attempted → Paid; Failed can be retried as a new attempt on the same order.

Payment link

Active → Paid or Expired or Cancelled.

Subscription

Trial → Active → Past due → Active (paid) or Suspended (new service stops; open cases unaffected) → Cancelled. Active → Upgraded or Downgraded at the next billing date.

Service order and delivery task

Requested → Accepted → In progress → Waiting for client → Delivered → Accepted by client or Reopened.

Support ticket

New → Open → Waiting for customer → Resolved → Closed (auto after 7 days) or Reopened.

Course assignment

Assigned → In progress → Completed or Overdue → Completed (late). Completed → Expired (at validity end) → Reassigned.

Survey

Draft → Scheduled → Open → Closed → Results published.


## IC

Draft → Valid (composition passes) → Warning (tenure or vacancy issue) → Invalid (composition fails) → Valid (after fix). Any → Archived on dissolution.

Break-glass request

Requested → Approved or Rejected → Active → Expired or Revoked.

Legal hold

None → Requested → Active → Lifting requested → Lifted.

Retention review

Due → In review → Approved by first approver → Approved by second approver → Executed (certificate) or Held.

Rule set or template

Draft → In review → Approved by first approver → Approved by second approver and tests passed → Published (effective date) → Superseded.

24. Data Dictionary and Database Design

This section is the build-ready schema. It defines naming rules, identifiers, every collection with its fields, enumerations, encryption, indexes and relationships. Section 10 is the summary; where the two differ, this section governs. All collections are MongoDB collections accessed through Mongoose models in /apps/api/src/models, with validation in Zod schemas shared from /packages/shared.

24.1 Conventions

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

24.2 Reference numbers and counters

Reference

Format

Generated by

Reset

Service request


## ACN-SR-YYYY-NNNNNN

counters key SR:YYYY, atomic increment

Each calendar year

Question


## ACN-QA-YYYY-NNNNNN

counters key QA:YYYY

Each calendar year

Payment receipt

ACN/RC/FY/NNNNNN (FY like 2026-27)

counters key RC:FY at the moment of Paid

Each financial year (1 April)

Credit note


## ACN/CN/FY/NNNNNN

counters key CN:FY

Each financial year

Tax invoice


## ACN/INV/FY/NNNNNN

counters key INV:FY

Each financial year

POSH case

POSH-ORG-YYYY-NNNN, where ORG is the organisation code (3 to 6 letters, unique)

counters key CASE:ORG:YYYY

Each calendar year per organisation

Concern report


## CR-ORG-YYYY-NNNN

counters key CR:ORG:YYYY

Each calendar year per organisation

Exhibit

EX-NNN within the case

counters key EX:caseId

Per case

Witness code

W1, W2 within the case

counters key W:caseId

Per case

Support ticket


## TKT-YYYY-NNNNNN

counters key TKT:YYYY

Each calendar year

Service order


## SO-YYYY-NNNN

counters key SO:YYYY

Each calendar year

Certificate

CERT- plus 10 random base32 characters

Random, unique index

None

Document verification code

12 random base32 characters plus a check character

Random, unique index; HMAC of document hash stored

None

Numbers are never reused. A failed insert after a counter increment leaves a gap, which is acceptable except for receipts and tax invoices, which are allocated inside the same transaction that marks the payment Paid.

24.3 Core platform collections

Collection

Purpose

Fields

Indexes, constraints and notes

users

Staff and portal accounts

email* U P; name* P; phone P; passwordHash* X H; roles* a[e:Role]; orgId oid (organisation and IC users); status* e:UserStatus; mfaEnabled b; locale e:Lang; lastLoginAt d; failedAttempts i; lockUntil d; invitedBy oid; timezone s (default Asia/Kolkata)

Unique lower-cased email; index roles, status, orgId. A user can hold several roles; POSH roles require orgId.

roles

Role definitions

key* U; label*; scope* e:RoleScope; permissions* a[s]; isSystem b

Seeded from /packages/shared/permissions; system roles cannot be deleted.

permissionCatalog

List of permission keys used by routes

key* U (module.action, for example payments.refund); module*; description

Test fails if a route uses a key not in the catalogue.

sessions

Refresh sessions

userId* ; familyId*; refreshHash* H X; device {ua, ipHash, label}; createdAt; lastUsedAt; expiresAt*; revokedAt; revokeReason

TTL index on expiresAt; index userId, familyId.

mfaFactors

MFA enrolment

userId*; type* e:MfaType; secret E X; backupCodeHashes a[s] H; verifiedAt; lastUsedAt

Unique (userId, type).

invitations

User invitations

email*; roles*; orgId; tokenHash* H X; expiresAt*; invitedBy*; acceptedAt

TTL on expiresAt plus 7 days.

authTokens

Password reset and email verification

userId*; purpose* e:TokenPurpose; tokenHash* H X; expiresAt*; usedAt

TTL; single use enforced by usedAt.

otpChallenges

One-time codes for complainants, respondents and learners

subjectHash* H (email or phone); purpose* e:OtpPurpose; codeHash* H X; attempts i; maxAttempts i (5); expiresAt* (10 minutes); verifiedAt; ipHash

TTL on expiresAt; rate-limited by subjectHash.

accessLinks

Single-purpose links for witnesses, support persons, interpreters, learners and respondents

purpose* e:LinkPurpose; orgId T; caseId; subjectRef (role code, never a name); scopes* a[s]; tokenHash* H X; expiresAt*; maxUses i; usedCount i; undertakingId oid; createdBy*

TTL on expiresAt; links die on first use when maxUses is 1.

auditLogs

Append-only audit trail

at* d; actorId oid; actorRole s; orgId oid; action* s (catalogue in Section 26.7); entityType s; entityId s; before o (redacted); after o (redacted); ip s; userAgent s; requestId s; outcome e:AuditOutcome; prevHash s; hash* s

No update or delete path in application code; database user for the app has insert and find only on this collection; hash chain (hash = SHA-256 of record plus prevHash) verified daily; index at, actorId, entityType+entityId, orgId+at.

settings

Site and security settings

key* U; value* mixed (validated per key); updatedBy; description

Secrets are never stored here.

featureFlags

Feature switches

key* U; enabled* b; scope e:FlagScope (global or orgId list); orgIds a[oid]; updatedBy

Cached 60 seconds.

notifications

In-app notification centre

userId*; type*; title* (generic); body (generic, content-safe); link; readAt; severity e:Severity

TTL 90 days; index userId+readAt.

notificationPrefs

User channel preferences

userId*; eventType*; channels {inApp b, email b, sms b}

Unique (userId, eventType).

emailLog

Delivery log without content for POSH

templateId*; toHash* H; orgId; caseRef s (case ID only); status* e:MailStatus; providerMessageId; sentAt; bounceType; contentStored b (false for POSH)

Index templateId, status, sentAt; retained 12 months.

counters

Sequences

key* U; seq* i

Updated with findOneAndUpdate and $inc.

files

Stored file metadata

key* U (random storage key); ownerType*; ownerId*; orgId T; caseId; filename P; mime*; size*; sha256*; scanStatus* e:ScanStatus; encrypted* b; wrappedDek s (per-file or per-case key id); uploadedBy*; retentionUntil d

Index ownerType+ownerId; index scanStatus; no public URL stored.

consents

Consent records

subjectHash* H; subjectType e:SubjectType; purpose* e:ConsentPurpose; noticeVersion*; language*; channel* e:Channel; givenAt*; withdrawnAt; ipHash

Index subjectHash+purpose; exportable on request (BR-063).

dataRequests

Data subject rights requests

reference* U; requesterHash H; type* e:DataRequestType; orgId; identityVerifiedAt; status* e:DataRequestStatus; decision; reason; dueAt*; handledBy; holdChecked b

Index status, dueAt.

24.4 Website, requests, Q&A, payments and services collections

Collection

Purpose

Fields

Indexes, constraints and notes

pages

CMS pages and homepage sections

key* U; title*; sections* a[{id, type, data o, order i, visible b}]; seo {title, description, canonical, noindex b, ogImageId}; status* e:PublishStatus; publishedAt; lang e:Lang

Versions in pageVersions.

pageVersions

Page revisions

pageKey*; snapshot* o; createdBy*; reason

Index pageKey+createdAt.

menus

Navigation and footer

key* U (header, footer); items* a[{label, href, children[], order}]; version

legalPages

Policies with effective dates

slug*; version* i; title; body* (sanitised HTML); effectiveFrom*; status; approvedBy

Unique (slug, version).

posts

Blog articles

title*; slug* U; excerpt*; body* (sanitised HTML); coverMediaId; coverAlt*; categoryIds a[oid]; tagIds a[oid]; authorId*; status* e:PostStatus; publishAt; publishedAt; seo {title*, description*, canonical, noindex}; readingMinutes i; revisions a[{at, by, snapshotId}]

Text index title, excerpt, body; index status+publishAt; BR-006 enforced.

categories / tags

Blog taxonomy

name*; slug* U; description

media

Image library

fileId* oid; alt*; width; height; variants a[{w, key, format}]; usedIn a[s]

Alt text required (US-061).

redirects

301 redirects

from* U; to*; type i (301); active b; createdBy

Auto-created on slug change.

scripts

Custom scripts

name*; description; placement* e:ScriptPlacement; scope* {mode e:ScopeMode, paths a[s]}; category* e:ScriptCategory; type* e:ScriptType (inline or url); code (inline) ; url; integrity (SRI hash); status* e:ScriptStatus; version* i; createdBy*; approvedBy; approvedAt

Index status, placement. Inline code length capped at 20 KB.

scriptVersions

Script history

scriptId*; version*; snapshot*; by*; at*

Supports diff and restore.

serviceRequests

Visitor service requests

reference* U; name* P; email* P; mobile* P; clientType* e:ClientType; organisationName P; city; category* e:ServiceCategory; subject*; description* P; contactMode e:ContactMode; contactWindow; fileIds a[oid]; source {utmSource, utmMedium, utmCampaign, landingPath}; status* e:RequestStatus; assignedTo oid; followUpAt d; consent* {noticeVersion, at, ipHash}; spamScore n; dedupeKey s H

Index status+createdAt, assignedTo, dedupeKey (2-minute window), text index subject. 90-day retention of spam.

requestActivities

Request timeline

requestId*; actorId; type* e:ActivityType; from; to; note P; at*

Index requestId+at.

requestReplies

Replies to requesters

requestId*; actorId*; body* (sanitised); sentAt; emailStatus

questions

Public Q&A

reference* U; askerName P; email* P; category; text* P; visibility* e:QuestionVisibility (private or publishable); status* e:QuestionStatus; answer (sanitised); answeredBy; answeredAt; anonymised* b; publishedAt; pinned b; displayOrder i; declineReason; consent {noticeVersion, at}

Text index on text and answer for published only; BR-004 enforced.

answerTemplates

Canned answers

title*; body*; variables a[s]; category

catalogueItems

Payable fee items

name*; description; amountPaise* pr; gstBps* i; sacCode; active* b; category; validFrom; validTo; priceHistory a[{amountPaise, from}]

Index active.

payments

Payments

orderId* U; paymentId U; itemId oid*; itemSnapshot* {name, amountPaise, gstBps}; amountPaise* pr; taxPaise pr; currency* (INR); method; status* e:PaymentStatus; payer* {name P, email P, mobile P}; invoiceRef; receiptNo U; receiptAt; failure {code, description}; attempts n; notes {orgId, subscriptionId, serviceOrderId}; razorpayRaw o (allow-listed fields only)

Index status+createdAt, receiptNo, payer.email; never deleted; BR-010 to BR-012.

webhookEvents

Idempotency store for webhooks

eventId* U; type*; payloadHash*; receivedAt*; processedAt; result e:WebhookResult; attempts i; error

TTL 180 days.

refunds

Refunds

paymentId*; refundId U; amountPaise*; reason*; status e:RefundStatus; initiatedBy*; creditNoteNo U; processedAt


## BR-013.

paymentLinks

Payment links

reference*; itemId; amountPaise*; payerHint; expiresAt*; status e:LinkStatus; paymentId; createdBy

Index status, expiresAt.

invoices

Tax invoices for subscriptions and services

invoiceNo* U; orgId; lines* a[{code, desc, qty, ratePaise, gstBps}]; totalPaise*; status e:InvoiceStatus; issuedAt; dueAt; paymentId; pdfFileId

GSTIN and SAC code from settings.

services

POSH service catalogue

code* U (PS-nn); name*; description; deliverables a[s]; turnaroundDays i; pricePaise; gstBps; billing e:BillingCycle; active b; version i; category e:ServiceGroup

Versioned; old versions kept for orders.

plans

Plans and add-ons

code* U; name*; kind* e:PlanKind (plan or addon); includes a[serviceCode]; limits {employees, branches, casesPerYear, storageGb, trainingSeats}; pricePaise; billing; active; version

subscriptions

Organisation subscription

orgId* T; planCode*; planVersion; addOns a[{code, qty}]; status* e:SubscriptionStatus; startAt*; renewAt*; endAt; usage {employees, branches, cases, storageGb, seats}; warned80 b; warned100 b

Unique active subscription per org.

serviceOrders

Orders for services

reference* U; orgId* T; serviceCode*; status* e:OrderStatus; requestedBy; scope; dueAt; deliveredAt; acceptedAt; invoiceId

deliveryTasks

Delivery tasks

orderId*; title*; assignee oid; dueAt; status* e:TaskStatus; notes; fileIds a[oid]

Visible to org as service timeline.

24.5 POSH organisation, committee and compliance collections

Collection

Purpose

Fields

Indexes, constraints and notes

organisations

Client tenant root

code* U (3 to 6 letters); legalName*; displayName; type* e:OrgType; sectorOverlay e:SectorCode; gstin; address; headcount i; status* e:OrgStatus; planCode; settings* {weeklyOff a[e:Weekday], inquiryAnchor e:AnchorType, retentionYears i, languages a[e:Lang], branding {logoFileId}, notifyEmails a[s] P, gender neutral track b, publicNoticeUrl}; contacts a[{name P, role, email P, phone P}]; legalHold b; onboardedAt; contractRef

Unique code; index status, type.

branches

Offices and units

orgId* T; name*; address; state*; district*; headcount* i; hasIc* b; weeklyOff; holidayCalendarId; timezone; status

Index orgId+state. A branch with headcount 10 or more must have an active committee (BR-019).

committees

Internal Committee per branch

orgId* T; branchId*; status* e:CommitteeStatus; orderFileId; validation {valid b, issues a[s], checkedAt}; effectiveFrom*; effectiveTo; notes

Index orgId+branchId; one active per branch.

icMembers

Committee members

orgId* T; committeeId*; userId; name* P E; gender* e:Gender E; role* e:IcRole (presiding, employee_member, external_member); isExternal b; affiliation (for external); designation; tenureStart*; tenureEnd*; status e:MemberStatus; undertakingId; trainingCertId; conflictNotes

Index committeeId, tenureEnd. BR-020, BR-021, BR-022.

externalPanel

Acorn external member panel

name* P; qualifications; affiliation; languages; feePerSittingPaise; conflicts a[{orgId, reason}]; active b; lastAssignedAt

Used by PS-04.

employees

Roster for training and headcount

orgId* T; employeeRef* (hashed ID H); nameEnc E P; email E P; department; branchId; gender E; joinedOn; role; status e:EmpStatus; sourceImportId

Unique (orgId, employeeRef). Never joined to case data.

rosterImports

CSV roster uploads

orgId* T; fileId; rows i; added i; updated i; errors a[{row, message}]; by; at

policies

POSH policy versions

orgId* T; version* i; title; fileId*; effectiveFrom*; language; status e:PublishStatus; approvedBy

Unique (orgId, version).

policyAcks

Employee acknowledgements

orgId* T; policyId*; employeeRef* H; acknowledgedAt*; method e:AckMethod

Unique (policyId, employeeRef).

noticeDisplays

Notice display tracker

orgId* T; branchId*; location*; noticeVersion*; verifiedAt*; verifiedBy; photoFileId

CMP-03 and CMP-22.

dutyRecords

Compliance duty status

orgId* T; branchId; dutyCode* e:DutyCode (CMP-01 to CMP-23); status* e:DutyStatus; dueAt; evidenceFileIds a[oid]; lastVerifiedAt; owner oid; notes

Index orgId+dutyCode.

complianceScores

Daily score history

orgId* T; branchId; date* ; total* n; domains* a[{key, weight, score, reasons[]}]; band* e:ScoreBand; gaps a[{dutyCode, consequence, serviceCode}]

Unique (orgId, branchId, date).

annualReports

Annual and board data reports

orgId* T; branchId; period* {from, to}; kind* e:ReportKind (ic_annual, board, brsr); counts* {received, disposed, pending, pendingOver90, workshops, actions}; ruleSetVersion; generatedAt*; generatedBy; fileIds a[oid]; submission {at, mode, reference, fileId}; status e:ReportStatus

Counts computed by the reporting service from case metadata only (BR-047, BR-048).

poshAudits

Annual POSH audits

orgId* T; branchId; period*; responses a[{questionId, answer, evidenceIds}]; score; findings a[{title, severity, action, dueAt}]; auditorId; independenceChecked b; reportFileId; submission {to, at, reference}; status


## PS-01, CMP-21.

riskAssessments

Risk assessments

orgId* T; branchId; answers*; heatmap {domain: score}; actions a[{title, owner, dueAt, status}]; completedBy; completedAt

conflictRegister

Conflicts of Acorn staff, panel and counsel

personRef*; orgId; relationship; declaredAt*; clearedAt; clearedBy

Checked by role assignment (IND-R01).

24.6 POSH case collections (all tenant-scoped; narrative fields encrypted)

Every collection in this group carries orgId and caseId. Fields marked E are encrypted with the case data key (Section 26.4). Fields marked BI have a keyed blind index for equality matching (used for conflict checks) and are never searchable by free text.

Collection

Purpose

Fields

Indexes, constraints and notes

poshCases

The case record

caseId* U (POSH-ORG-YYYY-NNNN); orgId*; branchId*; type* e:CaseType (statutory, non_statutory, concern_to_complaint); state* e:CaseState; stateSince*; routing* {ruleId, outcome, decidedBy, decidedAt, reason}; limitation* {lastIncidentOn, deadline, status e:LimitationStatus, extensionOrderId}; urgent* b; urgentSetBy; language*; contactPrefs E {channel, safeTimes, doNotEmail, personalEmail, personalPhone}; complainantId oid; filedBy e:FiledBy (self, assisted, representative); intakeCounsellorId; assignedIcIds a[oid]; presidingOfficerId; linkedCaseIds a[oid]; legalHold {active b, reason, since, by}; ruleSetVersion*; formVersion*; priority i; closure {outcomeCode e:OutcomeCode, closedAt, note E}; retentionUntil; counselId; statutory b

Index orgId+state, orgId+branchId+state, assignedIcIds, limitation.deadline; no text index; BR-028, BR-029.

caseParties

Complainant, respondent, representatives

role* e:PartyRole; nameEnc* E P BI; designation E; department E; relationship* e:Relationship; organisationName E (third party); contact E P; employeeRef H; gender E; ageBand E e:AgeBand; accessibility E; supportPersonId oid; userId oid

Blind index on normalised name for BR-030 conflict checks; masked in lists.

complaintContent

The written complaint

formData* E (steps A to H); narrative* E; nature* a[e:Conduct] E; incidentDates* E {first, last}; place* E e:PlaceType; witnesses a[{name, contact, note}] E; earlierReports E; effect E; reliefSought E a[e:Relief]; otherLegalAction E; declarations* {truthVersion, copyConsentVersion, privacyVersion, at}; signature* {typedName E, otpVerifiedAt, deviceHash H, at}; printedCopiesFileIds a[oid]; versions a[{at, by, hash}]

Immutable after submit; supplements are new records (complaintSupplements).

complaintDrafts

Drafts

userId*; orgId*; formData E; step; lastEditAt*; expiresAt*

TTL 30 days from last edit (BR-026).

caseRoles

Per-case role assignments

caseId*; userId*; role* e:CaseRole; assignedBy*; assignedAt; revokedAt; reason; conflictClearedAt; undertakingId*

Unique active (caseId, userId, role); the permission engine reads this.

caseTimers

Computed deadlines

caseId*; code* e:TimerCode (TM-01 to TM-21); startedAt*; startEvent*; legalDate*; safeDate*; status e:TimerStatus (running, paused, met, breached, cancelled); pauses a[{from, to, groundCode, orderFileId, by}]; explanation* (text); ruleId*; ruleSetVersion*; alertsSent a[{threshold, at}]

Index status+legalDate for the scan job; unique (caseId, code, startedAt).

caseEvents

Case diary (content-safe)

at*; type* e:EventType; transitionCode e:TransitionCode; actorId; actorRole; summary* (generic, content-safe); detail E; delayReasonCode

Index caseId+at.

caseDocuments

Documents and exhibits

exhibitNo U within case; title* E; kind* e:DocKind; source e:DocSource; fileId*; sha256*; version i; supersedes oid; redactedOf oid; uploadedBy*; uploadedByRole; description E; dateOfDocument; status e:DocStatus; releasedTo a[{partyRole, at, by}]

Immutable after upload (BR-038); custody in documentEvents.

documentEvents

Chain of custody

documentId*; at*; action* e:CustodyAction (viewed, downloaded, released, redacted, printed, exported); actorId*; reason; ipHash

Append-only; index documentId+at.

conflictDeclarations

Per-case conflict declarations

userId*; caseId*; answers*; declaredConflict b; clearedBy; clearedAt; signedAt*; signatureHash

Gate to case access (BR-031).

undertakings

Confidentiality undertakings

userId*; kind* e:UndertakingKind (ic_member, counsellor, support_person, interpreter, witness, staff, learner_admin); textVersion*; signedAt*; expiresAt; signatureHash; caseId

Renewed yearly (CONF-003).

hearings

Hearings

caseId*; scheduledAt*; mode* e:HearingMode; venue E; videoLink E X; participants a[{partyRole, supportPersonId, interpreterId}]; noticeDocIds; status e:HearingStatus; adjournmentReason e:DelayReason; minutesId; interpreterRequested b; accessibilityNeeds E

Index caseId+scheduledAt.

statements

Statements and minutes

caseId*; hearingId; deponentRole*; deponentLabel (party or W-code); language*; text* E; readBackAt; signedAt; signatureHash; interpreterId; recordedBy*

Locked after signature; corrections are new versions.

noticesIssued

Notices issued

caseId*; templateCode*; templateVersion*; issuedBy*; issuedTo* e:PartyRole; channel* a[e:Channel]; dueDate; fileId*; verificationCode* U; deliveredAt; readAt; deliveryProof {mode, ref}; reissueOf oid

Index caseId+templateCode; BR-034.

conciliations

Conciliation records

caseId*; requestedAt*; requestFileId*; terms* E; monetaryCheckPassed* b; consentComplainantAt; consentRespondentAt; outcome e:ConciliationOutcome; outcomeAt; employerForwardedAt; monitoringTasks a[{dueAt, status}]

BR-032 enforced at save and close.

interimRequests

Interim relief

caseId*; requestedAt*; type* e:InterimType; details E; decision e:InterimDecision; decidedAt; reasons E; employerImplementation {at, proof, by}; reviewDates a[d]


## TM-12.

conflictMatches

Name-match results

caseId*; matchedRef; matchedType e:MatchType; status e:MatchStatus; clearedBy; clearedAt

Generated by blind-index compare (BR-030).

reports

Inquiry reports

caseId*; version*; sections* a[{key, content E}]; standardApplied*; findings* a[{issue, finding, reasons E}]; recommendations a[{type, legalBasis, detail E}]; dissents a[{memberId, note E}]; signatures a[{memberId, at, hash}]; quorumOk* b; lintResult {passed, issues[]}; issuedAt; fileId; verificationCode U; deliveredTo a[{role, at}]; addendumOf oid

Locked after issue (BR-040).

compensations


## Section 15 worksheet

caseId*; factors* E {trauma, careerLoss, medical, income, feasibility}; amountPaise E; scheduleType e:PayType; instalments a[{dueOn, amountPaise}]; recoveryRoute e:RecoveryRoute; implementation a[{at, amountPaise, proofFileId}]

employerActions

Employer action taken

caseId*; recommendationRef*; action* E; takenOn; proofFileId; verifiedBy; verifiedAt; status e:ActionStatus; overdueFlaggedAt


## TM-10; BR-042.

appeals

Appeals and parallel proceedings

caseId*; kind* e:ProceedingKind (appeal, writ, civil, criminal, labour, commission); forum*; filedOn*; courtCaseNo; appellantRole; orderFileIds a[oid]; status; nextHearingOn; counselId

Starts legal hold (POST-02).

legalHolds

Legal hold history

caseId*; reason*; requestedBy*; approvedBy; counselId; status* e:HoldStatus; since; liftedAt; liftReason

Retention jobs must read the active hold.

aftercareTasks

Aftercare check-ins

caseId*; dueAt* (30, 90, 180 days); assignedTo; status e:TaskStatus; outcome e:AftercareOutcome; retaliationReported b; notes E


## TM-19.

retaliationReports

Retaliation reports

orgId*; reporterRole; relatedCaseId; summary E; priority i (1); linkedCaseId; status

Creates linked case T29.

concernReports

Non-statutory concerns

reference* U; orgId*; channelContact E; message E; status e:ConcernStatus; counsellorId; convertedCaseId; createdAt

No timers (RT-18).

supportRequests

Support person, interpreter and accessibility requests

caseId*; type* e:SupportType; details E; status e:SupportStatus; assignedTo; fulfilledAt

SUP-04 to SUP-06.

breakGlass

Break-glass access

caseId*; requestedBy*; reason* E; approvedBy; status* e:BreakGlassStatus; startsAt; expiresAt (max 2 hours); revokedAt; usageLog a[{at, action}]

BR-061; alert to Managing Partner.

caseExportLogs

Exports

caseId*; by*; reason*; kind; fileId; at


## BR-045.

24.7 Legal console, support, training, survey and helpdesk collections

Collection

Purpose

Fields

Indexes, constraints and notes

ruleSets

Versioned rule parameters

version* U; effectiveFrom*; status* e:RuleStatus; parameters* o (keys listed in Section 8.30); changeNote*; legalSource*; approvals a[{by, role, at}]; scenarioRun {passed n, failed n, at}

BR-059; two approvers required.

templates / templateVersions

Documents and messages

code* (DOC-nn, P-nn, N-nn); kind e:TemplateKind; language* e:Lang; subject; body*; mergeFields a[s]*; contentSafe* b; version* i; status; approvals; effectiveFrom

Lint rejects free-text merge fields for POSH messages (BR-018).

holidayCalendars

Calendars

scope* e:CalScope (central, state, organisation); stateCode; orgId; year*; holidays* a[{date, name}]; version


## BR-068.

directoryEntries

Helpline and district directory

type* e:DirType; name*; scope e:DirScope; state; district; phone; email; url; hours; languages; cost; notes; verifiedAt*; verifiedBy*; needsVerification b (computed)

BR-060; index type, district.

watchItems

Statutory watch list

title*; source; type e:WatchType; owner*; reviewDate*; outcome; status; relatedParameter


## LEG-004.

kbArticles

Knowledge base

slug* U; title*; body*; audience e:Audience; language; version; status; approvedBy; reviewDue

Public or role-restricted.

courses / lessons / quizQuestions

LMS content

code*; title*; audience; durationMin; passMarkPct; attemptsAllowed; validityMonths; languages; lessons a[{type, content, order}]; questions a[{text, options, answer, explanation}]; version; status


## LMS-001.

courseAssignments

Assignments

orgId* T; employeeRef* H; courseCode*; courseVersion; assignedAt; dueAt; status* e:AssignStatus; progressPct; completedAt; expiresAt

Unique (orgId, employeeRef, courseCode, dueAt).

quizAttempts

Attempts

assignmentId*; startedAt; submittedAt; answers E; scorePct; passed b

Visible to Organisation Admin and Acorn only (BR-052).

certificates

Certificates

code* U; orgId; employeeRef H; nameOnCert P; courseCode; issuedAt; expiresAt; fileId; verifyCount

Public verification shows name and course only.

liveSessions

In-person sessions

orgId* T; title; date; trainer; audience; attendance a[{employeeRef, at}]; certificateIssued b

LMS-004; annual report workshops count.

surveys

Anonymous surveys

orgId* T; title; questions*; schedule {opensAt, closesAt}; language; status e:SurveyStatus; minGroup i (5); tokensIssued n

No link between a person and a response (BR-053).

surveyResponses

Responses

surveyId*; answers*; groupKeys {department, location} (only if group size above threshold); submittedAt (rounded to day)

No userId, no IP, no token reference.

tickets

Support tickets

reference* U; orgId; requesterId; category*; priority* e:Priority; status* e:TicketStatus; subject; caseRef s (ID only); assignedTo; sla {firstResponseDue, resolveDue, pausedMs}; satisfaction n


## BR-057, BR-058.

ticketMessages

Ticket thread

ticketId*; authorId; internal b; body*; fileIds; at

Scanned for case-content patterns.

macros

Canned ticket replies

title*; body*; category

retentionReviews

Retention queue

orgId*; caseId*; dueAt*; status* e:RetentionStatus; approvals a[{by, at}]; decision; holdChecked b; executedAt; certificateId


## BR-049.

deletionCertificates

Proof of destruction

caseId (hashed); orgId; items a[{collection, count}]; executedAt; approvers; checksum

Kept permanently without identities.

24.8 Enumerations

Enumeration

Values

Role

super_admin, admin, content_editor, marketing_manager, support_executive, finance, posh_admin, legal_admin, intake_counsellor, service_manager, org_admin, ic_presiding, ic_member, ic_external, counsel, complainant, respondent

RoleScope

platform, organisation, case

UserStatus

invited, active, locked, suspended, deactivated

Lang

en, bn, hi

CaseState

DRAFT, SUBMITTED, TRIAGE, LATE_REVIEW, AWAITING_INFO, CONCILIATION, NOTICE_ISSUED, INQUIRY, LEGAL_STAY, DELIBERATION, REPORT_ISSUED, ACTION_PENDING, ACTION_COMPLETED, APPEAL_WINDOW, APPEAL_FILED, REFERRED_LC, REJECTED, WITHDRAWN, CLOSED

CaseType

statutory, non_statutory, concern_to_complaint, retaliation, counter_complaint, false_complaint_assessment

CaseRole

presiding_officer, ic_member, external_member, intake_counsellor, posh_admin_meta, counsel, secretariat, complainant, respondent

PartyRole

complainant, respondent, witness, support_person, interpreter, representative

Relationship

colleague, superior, subordinate, senior_management, employer_owner, client_customer, vendor_contractor, other_third_party, student, volunteer, contract_worker, platform_worker, domestic_worker, other

OutcomeCode

substantiated, not_substantiated, settled_conciliation, withdrawn, referred_lc, rejected_time_barred, malicious_or_false_finding, closed_in_error, other

LimitationStatus

within_period, extension_requested, extended, time_barred

TimerCode

TM-01 to TM-21 as defined in Section 8.16.1

TimerStatus

running, paused, met, breached, cancelled

Conduct

physical_contact_advances, demand_sexual_favours, sexually_coloured_remarks, showing_pornography, other_unwelcome_sexual_conduct, promise_preferential_treatment, threat_detrimental_treatment, threat_employment_status, hostile_environment, humiliating_treatment

PlaceType

office_premises, client_site, employer_transport, offsite_event_travel, online_remote, residence_dwelling, other

Relief

inquiry, conciliation, interim_transfer, interim_leave, interim_other, compensation, other

DocKind

complaint_supplement, reply, evidence_document, evidence_media, statement_scan, order, notice, minutes, report, proof, other

CustodyAction

viewed, downloaded, released, redacted, printed, exported

HearingMode

in_person, video, hybrid, written

InterimType

transfer_complainant, transfer_respondent, leave_up_to_3_months, reporting_line_change, remote_work, other

ConciliationOutcome

settled, not_settled, withdrawn_by_complainant, terms_breached

PaymentStatus

created, attempted, authorised, paid, failed, partially_refunded, refunded, expired

PublishStatus / PostStatus

draft, in_review, scheduled, published, archived

RequestStatus

new, in_review, contacted, awaiting_client, proposal_sent, converted, closed, spam

QuestionStatus

pending, answered, published, unpublished, declined, spam

ScriptStatus

draft, pending_approval, enabled, disabled, archived

ScriptCategory

analytics, marketing, chat, functional

ScanStatus

pending, clean, infected, error

OrgType

private_company, partnership_llp, proprietorship, ngo_trust, educational, healthcare, public_authority, legal, production_unit, other

SubscriptionStatus

trial, active, past_due, suspended, cancelled

TaskStatus

open, in_progress, waiting, done, cancelled

TicketStatus / Priority

new, open, waiting_customer, resolved, closed, reopened / p1, p2, p3, p4

DutyStatus

compliant, due_soon, overdue, missing_evidence, not_applicable

ScoreBand

green, amber, orange, red

AssignStatus

assigned, in_progress, completed, overdue, expired

SurveyStatus

draft, scheduled, open, closed, results_published

RetentionStatus

due, in_review, first_approval, second_approval, executed, held

HoldStatus

requested, active, lifting_requested, lifted

BreakGlassStatus

requested, approved, rejected, active, expired, revoked

Channel

email, sms, portal, whatsapp, post, hand_delivery, phone

Severity

info, warning, critical

24.9 Encryption field map

Data

Where

Key and method

Searchable by

Complaint narrative, form data, incident dates, effect, relief

complaintContent

Case data key (AES-256-GCM, AAD = collection:docId:field)

Not searchable

Party names and contacts

caseParties, icMembers, employees

Tenant data key; blind index (HMAC-SHA256 with a tenant blind-index key over normalised text)

Equality only, for conflict checks

Notes, minutes, statements, reports, compensation

caseEvents.detail, statements, reports, compensations, hearings

Case data key

Not searchable

Evidence files

object storage

Per-file data key wrapped by the case data key; server-side encryption of the bucket as a second layer

File metadata only

MFA secrets

mfaFactors

Platform key

Not searchable

Contact preferences, safe times

poshCases.contactPrefs

Case data key

Not searchable

Survey and LMS answers

quizAttempts, surveyResponses

Tenant data key (quiz); surveys stored without identity

Aggregates only

24.10 Relationships

From

To

Cardinality

Rule

organisations

branches

1 to many

Every branch belongs to one organisation

branches

committees

1 to 1 active

A branch with headcount of 10 or more needs an active committee

committees

icMembers

1 to many

Composition validated on each change (BR-022)

organisations

poshCases

1 to many

Case ID unique per organisation and year

poshCases

caseParties, complaintContent, caseRoles, caseTimers, caseEvents, caseDocuments, hearings, statements, noticesIssued, conciliations, interimRequests, reports, compensations, employerActions, appeals, legalHolds, aftercareTasks, breakGlass

1 to many

All carry caseId and orgId; cascade is by the retention engine only

poshCases

poshCases

many to many (linked)

Retaliation and counter-complaint links; no shared access

caseDocuments

documentEvents

1 to many

Append-only chain of custody

users

caseRoles

1 to many

Access to a case exists only through an active caseRoles record

organisations

subscriptions, serviceOrders, invoices, tickets

1 to many

Billing and service links

payments

refunds, invoices, subscriptions

1 to many

Receipt number allocated once

ruleSets

poshCases, caseTimers

1 to many

Each timer stores the rule set version in force

courses

courseAssignments, certificates

1 to many

Assignments reference a course version

25. API Contract Specification

This section fixes the HTTP and real-time contract between the React clients and the Express API so frontend and backend can be built in parallel. The machine-readable source is an OpenAPI 3.1 file in /packages/contracts, generated from the Zod schemas; this section is the human-readable reference. Paths are shown without the base /api/v1.

25.1 Conventions

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


## CORS

Only the public site, admin and portal origins from configuration.

Deprecation

Deprecated endpoints send the Deprecation and Sunset headers.

25.2 Error code catalogue


## HTTP

Code

Meaning

Client behaviour

400


## VALIDATION_FAILED

Input failed schema rules; details list fields

Show field messages

400


## MALFORMED_REQUEST

Body is not valid JSON or has the wrong type

Show generic error and log

401


## AUTH_REQUIRED

No valid session

Redirect to sign in

401


## AUTH_EXPIRED

Access token expired and refresh failed

Sign in again

401


## MFA_REQUIRED

Second factor needed

Show MFA step

401


## OTP_INVALID

Wrong or expired code

Allow retry up to limit

403


## FORBIDDEN

Authenticated but not permitted

Show not-allowed page; no hint about existence

403


## CASE_ACCESS_DENIED

No active case role, undertaking or conflict clearance

Show access guidance without case details

403


## CSRF_FAILED

Missing or wrong CSRF token

Reload and retry

404


## NOT_FOUND

Record absent or hidden from the caller (the same answer for both)

Show not found

409


## CONFLICT_VERSION

Record changed since read

Reload and merge

409


## STATE_INVALID

Transition not allowed from the current state

Show allowed actions

409


## DUPLICATE

Unique constraint or duplicate submission

Show existing reference if safe

409


## LEGAL_HOLD_ACTIVE

Action blocked by legal hold

Show hold notice

410


## LINK_EXPIRED

Access link or token is expired or used

Offer to request a new link

413


## FILE_TOO_LARGE

Size over limit

Show limit

415


## FILE_TYPE_BLOCKED

Type not allowed or content mismatch

Show allowed types

422


## RULE_BLOCKED

A legal or business rule prevents the action (BR number in details)

Show reason and next step

422


## CONFLICT_OF_INTEREST

Conflict declared or matched

Stop and route to reassignment

422


## QUORUM_NOT_MET

Committee composition or quorum invalid

Show composition issues

422


## LIMITATION_EXPIRED

Complaint beyond the allowed period without an extension order

Offer late-filing review

423


## LOCKED

Record locked after signature or issue

Offer addendum

429


## RATE_LIMITED

Too many requests

Back off by Retry-After

502


## UPSTREAM_FAILED

Gateway, email or storage dependency failed

Retry later; no partial state

503


## MAINTENANCE

Planned maintenance or degraded mode

Show banner

500


## INTERNAL

Unexpected failure

Show request ID

25.3 Authentication and account endpoints

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

25.4 Public website endpoints

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

25.5 Content, request, Q&A, script and settings administration

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


## BR-004

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

25.6 Payments and billing endpoints

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

25.7 POSH organisation and compliance endpoints

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


## PS-01

GET /org/orders, POST /org/orders

Service orders

org_admin

GET /org/tickets, POST /org/tickets

Help desk

org_admin, ic_presiding

Case content scan on submit

25.8 POSH case endpoints

All endpoints below require an active case role, a signed undertaking and conflict clearance unless stated. Every call writes an audit record. Responses never include narrative content in list endpoints.

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


## TM-12

GET/PUT /posh/cases/{id}/report, POST /posh/cases/{id}/report/lint, /sign, /issue

Inquiry report

Presiding, IC members

Quorum and signature checks (BR-040, BR-041)

GET/PUT /posh/cases/{id}/compensation

Compensation worksheet

Presiding


## Section 15 factors

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


## BR-050

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

25.9 Legal console, training, survey and support endpoints

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


## BR-068

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

25.10 Real-time events (Socket.io)

One namespace per audience: /admin, /portal and /org. A client authenticates with the same cookie as HTTP; the server joins rooms by permission (for example room requests for requests.read, room org:{orgId} for organisation users, room case:{caseId} for case role holders). Event payloads carry identifiers and generic labels only; clients fetch details through the HTTP API, which enforces authorisation again.

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

25.11 Webhooks and outbound integrations

Integration

Direction

Contract

Failure handling

Razorpay

Inbound webhook

POST /webhooks/razorpay with X-Razorpay-Signature; raw body kept for HMAC; events processed once by event ID

Non-2xx causes provider retries; all events logged in webhookEvents; unmatched events raise an alert

Email provider

Outbound API and inbound bounce webhook

POST /webhooks/email with provider signature; updates emailLog status

Hard bounce marks the address and alerts the owner

SMS and WhatsApp provider

Outbound and delivery webhook

Content-free templates only for POSH

Fallback to email on failure

Malware scanner

Internal call

Scan on file complete; result sets scanStatus

Files stay quarantined on error

Storage

Signed URLs

Expiry of 5 minutes for download and 10 minutes for upload

No public bucket access

Search console and analytics

Script based

Managed through the script control, not the API

None

Reporting portal

Manual hand-off

Generated file for upload to the government portal (EXT list in Section 8.24)

Tracked as a task

25.12 Contract testing and documentation

Item

Rule

Source of truth

Zod schemas in /packages/shared generate OpenAPI 3.1 and TypeScript types; the build fails if the generated file differs from the committed one.

Contract tests

Each endpoint has tests for success, validation failure, unauthenticated, unauthorised and wrong-tenant cases, run in continuous integration.

Mock server

A mock server generated from OpenAPI lets frontend work start before the backend is ready.

Docs site

Internal developer documentation is served at /docs only in non-production environments.

Change control

Any contract change needs a pull request that updates the schema and an entry in the API changelog.

Versioned examples

Example requests and responses for every endpoint are kept in /packages/contracts/examples and exercised by tests.

26. Security Implementation

This section turns the security requirements in Section 12 into controls that developers build and testers verify. POSH data is among the most sensitive data a legal business can hold: a leak can cause real harm to a complainant, so controls are layered and the default is to deny.

26.1 Threat model summary


## ID

Threat

Asset at risk

Primary controls


## TH-01

Respondent or colleague obtains the complaint or the complainant identity

Case content, party identity

Case-level roles, conflict declarations, masked lists, content-free notifications, audit of every view, break-glass only with approval


## TH-02

Insider at Acorn browses cases out of curiosity

Case content

Acorn staff have no content access by default (BR-028); break-glass; view audit and monthly review


## TH-03

Cross-tenant data exposure

All tenant data

orgId in every query via a data-access layer; tests that fail when a query lacks orgId; per-tenant keys


## TH-04

Account takeover of an IC member or admin

Case access

Mandatory MFA for staff and IC roles, lockout, session binding, new-device alerts


## TH-05

Payment tampering or fake success

Money, receipts

Server-side amounts, signature check, webhook confirmation, idempotency, reconciliation


## TH-06

Malicious script injected through script control

Visitors, site integrity

Approval workflow, allow-listed domains, SRI, CSP, no script on POSH portal pages


## TH-07

Stored XSS through blog, Q&A or tickets

Admin and visitor sessions

Sanitisation on save and render, CSP, escaping by default


## TH-08

Malware or malicious files uploaded as evidence

Staff devices

Type checks, scanning, quarantine, download as attachment with safe headers


## TH-09

Data leak through logs, errors, emails or analytics

Personal data

Redaction, content-free messages, no trackers on POSH pages, log review


## TH-10

Backup or storage exposure

Everything

Encrypted backups, restricted keys, no public buckets


## TH-11

Denial of service or abuse of forms

Availability

Rate limits, CAPTCHA, queue limits, CDN protection


## TH-12

Retaliation through disclosure by employer admin

Complainant safety

Org admin sees metadata only; no free-text in notices; warnings in the interface


## TH-13

Deepfake or forged evidence and impersonation of parties

Case integrity

Hashes at upload, chain of custody, identity checks on OTP, signature records


## TH-14

Supply chain compromise of a dependency

Application

Lock files, audit in CI, pinned versions, review of new packages


## TH-15

Secrets leak

Keys, gateway credentials

Secret manager, no secrets in code, rotation and scanning


## TH-16

Legal coercion or unlawful access demand

Case content

Counsel review path; disclosure only on valid order; logged

26.2 Authentication and session controls

Control

Specification

Password

Minimum 12 characters; checked against a breached-password list; hashed with Argon2id (memory 64 MB, 3 iterations, parallelism 1) with a per-user salt; no composition rules beyond length; no periodic forced change.

Lockout

5 failed attempts lock for 15 minutes with progressive delay; the response is identical for wrong user and wrong password; an alert goes to the user on lockout.


## MFA

Mandatory for staff roles, legal_admin, posh_admin, org_admin and all IC roles; TOTP with 10 single-use backup codes; WebAuthn passkeys as an optional second option in Phase 4. Re-authentication is required for sensitive actions (refund, user role change, retention execution, break-glass approval, legal hold).

Access token

JWT signed with ES256, 15 minutes, in an HttpOnly Secure SameSite=Strict cookie; contains user ID, roles, orgId and session ID only.

Refresh token

Opaque, 7 days sliding up to 30 days absolute, stored hashed, rotated on each use; reuse of an old token revokes the whole family.

Idle and absolute timeout

POSH portal and admin: 15 minutes idle, 8 hours absolute; public pages have no session.


## CSRF

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

26.3 Authorisation controls

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

26.4 Encryption and key management

Topic

Specification

In transit

TLS 1.2 or higher, HSTS with preload, modern cipher suites, TLS between the application and the database and between the application and Redis.

At rest, platform

Database volumes, object storage and backups encrypted by the provider (AES-256).

At rest, application layer

POSH fields listed in Section 24.9 are encrypted with AES-256-GCM using envelope encryption: a data encryption key (DEK) per case encrypts content; DEKs are wrapped by a tenant key encryption key (KEK); tenant KEKs are wrapped by a master key held in the cloud key management service (KMS). Each ciphertext stores key ID, nonce and tag; AAD binds the ciphertext to its collection, record and field.

Blind indexes

HMAC-SHA256 over normalised values with a tenant blind-index key, used only for equality checks (conflict matching).

Key rotation

Master key yearly or on suspicion; tenant KEK yearly; DEK re-wrapping is done online without re-encrypting content; a job tracks key versions and reports stragglers.

Crypto-erasure

Destroying a case DEK renders its ciphertext and backup copies unreadable; this supports deletion from backups (Section 26.10).

Secrets

Held in the secret manager and injected at start; never in the repository, images or logs; secret scanning runs in CI and on commit.

Password and token storage

Only hashes are stored; reset and access tokens are random 256-bit values shown once.

Randomness

Cryptographically secure generator only; no use of Math.random for security values.

26.5 Rate limits and abuse controls

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


## IP

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


## IP

26.6 Application security controls

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

26.7 Audit logging catalogue

Every action below writes an audit record with actor, role, organisation, entity, IP, request ID and outcome. The audit trail is hash-chained and append-only. Audit records for POSH never contain narrative content.

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

Audit rule

Detail

Integrity

Hash chain verified daily by a job; a break raises a P1 incident.

Retention

Audit logs are kept for 8 years for POSH and 3 years otherwise, and are kept after case deletion without personal narrative.

Review

Monthly review of break-glass use and unusual access by the Managing Partner and the Security Lead; the review is recorded.

Alerts

Same user viewing many unrelated cases, access outside working hours by Acorn staff, repeated denied access, and bulk exports raise alerts.

26.8 Security and confidentiality incident response

A confidentiality breach in a POSH matter is also a potential offence under Section 16 of the POSH Act and a personal data breach under the DPDP Act. The incident process below is used for any suspected unauthorised access, disclosure, loss or alteration. The operating workflow is in Section 30.

Severity

Definition

Response time

Examples


## SEV-1

Confirmed or likely exposure of POSH case content or identity, or payment data compromise

Incident commander within 30 minutes; contain within 2 hours

Case file sent to wrong person; database exposed; credential theft with case access


## SEV-2

Possible exposure with limited scope, or failure of a key control

Within 2 hours; contain within 8 hours

Misconfigured role granting wider view; log containing identifiers


## SEV-3

Security weakness without evidence of exposure

Within 1 business day

Vulnerability found in a dependency


## SEV-4

Minor policy deviation

Within 5 business days

Late access review

Obligation

Timing and action

Contain and preserve

Immediately disable the access path, revoke sessions and keys, snapshot evidence and logs before any change.

CERT-In reporting

Cyber incidents of the notified types must be reported to CERT-In within 6 hours of noticing (as per the 2022 directions; counsel to confirm current scope). Logs are kept for 180 days in India.

DPDP Act breach intimation

When the breach provisions apply (main obligations expected about May 2027), intimate the Data Protection Board and each affected person without delay, with the detailed report to the Board within 72 hours (timing per Rules; counsel to confirm).

Client notification

Notify the affected organisation contact and the Presiding Officer without disclosing identities to unauthorised persons; the notification states facts, impact and steps, using the template N-SEC.

Affected individual

Offer a conversation through the Intake Counsellor and the support options in Section 8.14; do not send details by an unsecured channel.

Safety review

Assess retaliation risk and offer interim protection steps through the organisation if identity may have been exposed.


## Section 16 review

Counsel assesses whether the matter amounts to a Section 16 breach by any person and the employer consequences under Section 17 and Section 26.

Root cause and closure

Post-incident review within 5 business days; corrective actions tracked; lessons added to tests and training; report kept for 8 years.

Role in incident

Holder

Duty

Incident commander

Security Lead (deputy: Tech Lead)

Runs the incident and the log

Legal lead

Legal Admin or counsel

Statutory and client notices

Communications

Managing Partner

Approves external statements

Scribe

Support Lead

Timeline record

Client liaison

Service Manager

Contact with organisation

26.9 DPDP Act control mapping

The Digital Personal Data Protection Act 2023 and the Rules of 2025 are being phased in. Acorn acts as a data fiduciary for its own site visitors and, for organisation clients, as a data processor with the organisation as fiduciary (to be fixed in the service contract, IND-R03). The mapping below lists controls; counsel confirms dates and details.

Requirement area

Control in the platform

Section

Notice and consent

Itemised notice in English, Bengali and Hindi at every collection point; purpose-linked consent records; withdrawal as easy as giving

Appendix E, 24.3

Purpose limitation and minimisation

Forms collect only fields in the data inventory; POSH narrative is stored only for the case


## 8.13, 24

Accuracy

Edit and correction paths; supplements for the case record


## 8.13

Storage limitation

Retention schedule and automatic review queue

26.10

Security safeguards

Encryption, access control, audit, backups, monitoring

26.2 to 26.7

Breach intimation

Incident process and templates

26.8, 30

Rights of data principals

Access, correction, erasure, grievance and nomination handled as data requests with due dates, with the POSH confidentiality and legal-hold exceptions explained

24.3, 25.9

Grievance redressal

Named contact and a response period; published on the site

Appendix E

Children

No collection from persons under 18 except through a complaint made on their behalf by a legal guardian; counsel reviews any such case


## 8.34, 8.33

Processors

Written contracts and sub-processor list for email, SMS, hosting, payment, support


## 8.37

Cross-border

Hosting in India by default (D-24); any transfer needs counsel approval

27

Records and logs

Logs kept at least one year; audit retained as per 26.7

26.7, 27.8

Significant data fiduciary readiness

Data protection impact assessment and audit programme prepared in case of designation

30

Vendor and consent manager

Interfaces designed so consent can be shown through a consent manager when available

25.11

26.10 Retention, deletion and erasure engine

Item

Specification

Default schedule

POSH case file: 8 years after closure (organisation may extend; D-23). Audit and chain-of-custody metadata: 8 years. Payment records and invoices: 8 years (tax law). Service requests: 3 years; spam: 90 days. Unanswered private Q&A: 1 year. Drafts: 30 days. Access links and OTP data: purge on expiry. Training records: 5 years after completion. Backups: roll off in 35 days.

Trigger

A nightly job finds closed cases past retentionUntil and creates a retentionReviews record; nothing is deleted by the job itself.

Review workflow

Legal Admin checks holds, appeals and parallel proceedings; first approval by the Legal Admin; second approval by the Managing Partner or the organisation Presiding Officer as agreed in the contract; the decision is recorded.

Execution

The engine runs in a transaction: deletes or anonymises case collections, deletes files from storage, destroys the case DEK (crypto-erasure so backups become unreadable), removes blind index entries, keeps a deletion certificate containing the hashed case ID, counts per collection and approvers.

Retained after deletion

Anonymous counts for annual reports, the audit chain without narrative, and the deletion certificate.

Legal hold

An active hold blocks every retention step for that case and tenant; holds are checked again immediately before execution (LEGAL_HOLD_ACTIVE).

Erasure requests

A data principal request for erasure is assessed against law and legal duties. For POSH records the answer is normally deferral until the statutory period ends, explained in the template; non-case data (marketing, Q&A) is erased within 30 days.

Tenant offboarding

On contract end, the organisation can export its records (case file bundles go to the Presiding Officer only); after the export window of 60 days the data follows the retention schedule; no early deletion that could breach record-keeping duties.

Verification

Quarterly test restores a backup and confirms that erased cases are not readable.

26.11 Security testing programme

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


## QA

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

27. Environment, Configuration and DevOps

This section defines how the platform is hosted, configured, built, released, monitored and recovered. It is written so a developer or DevOps engineer can set up the project on day one.

27.1 Environments

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


## CI

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

Real complaint data never enters any environment except production. Support staff cannot copy production data to other environments. Test accounts in production are marked and excluded from reports.

27.2 Hosting architecture

Component

Choice

Notes

Region

India (Mumbai or Hyderabad) for all data (D-24)

No cross-border storage by default

Compute

Containers on a managed platform (two instances minimum for the API; one worker pool for jobs)

Stateless API; autoscaling on CPU and queue length

Public site

Next.js on managed hosting or containers behind a CDN

Static generation and incremental revalidation for blog and pages

Admin and portal

React single-page apps on separate sub-domains

Strict content security policy

Database

MongoDB Atlas replica set (3 nodes) with encryption and point-in-time recovery

Dedicated cluster; IP allow-list and private link

Cache and queues

Redis (managed) for sessions throttling, Socket.io adapter and BullMQ queues

Persistence on; TLS

Object storage

S3-compatible bucket, private, versioned, server-side encryption

Separate buckets for public media and case files

Email

Transactional email provider with DKIM, SPF and DMARC; separate sending domain for POSH

Bounce webhook

SMS and WhatsApp

DLT-registered provider; templates registered

Content-free templates

CDN and WAF

CDN with web application firewall and bot protection

Rate rules and geo rules by setting


## DNS

Managed DNS with DNSSEC where available

Short TTL during cutover

Secrets and keys

Cloud secret manager and KMS

Separate keys per environment

Monitoring

Logs, metrics, traces and uptime service


## Section 27.8

27.3 Configuration and environment variables

Configuration is read once at start from the environment and validated by a Zod schema; the application refuses to start if a required value is missing or malformed. Secrets come from the secret manager. No default values for secrets are allowed.

Variable

Type

Secret

Meaning


## NODE_ENV

enum

No

development, test, staging or production


## APP_BASE_URL, ADMIN_BASE_URL, PORTAL_BASE_URL

url

No

Public origins used for links and CORS


## MONGODB_URI

string

Yes

Connection string with TLS and replica set


## REDIS_URL

string

Yes

Connection string


## JWT_PRIVATE_KEY, JWT_PUBLIC_KEY


## PEM

Yes

ES256 signing keys; key ID for rotation


## COOKIE_DOMAIN, CSRF_SECRET

string

Yes for secret

Cookie scope and token secret


## KMS_KEY_ID, KMS_REGION

string

No

Master key reference


## BLIND_INDEX_MASTER

bytes

Yes

Used to derive tenant blind-index keys


## RAZORPAY_KEY_ID

string

No

Public key for checkout


## RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET

string

Yes

Server-side signing and webhook verification


## EMAIL_PROVIDER_KEY, EMAIL_FROM, EMAIL_FROM_POSH

string

Yes for key

Sending settings


## SMS_PROVIDER_KEY, SMS_SENDER_ID, DLT_ENTITY_ID

string

Yes for key

SMS settings


## STORAGE_BUCKET_PUBLIC, STORAGE_BUCKET_CASES, STORAGE_REGION

string

No

Buckets


## SCANNER_URL, SCANNER_KEY

string

Yes for key

Malware scanning service


## CAPTCHA_SITE_KEY, CAPTCHA_SECRET

string

Yes for secret

Bot protection

SENTRY_DSN (or equivalent), LOG_LEVEL

string

Partial

Error reporting and logging


## RATE_LIMIT_PROFILE

enum

No

default or strict


## TZ

string

No

Asia/Kolkata for display; storage stays UTC


## FEATURE_FLAGS_SOURCE

enum

No

database or environment


## ALERT_WEBHOOK_URL

url

Yes

On-call notification target

27.4 Source control and repository layout

Item

Specification

Repository

One monorepo (pnpm workspaces): /apps/api, /apps/web (Next.js public), /apps/admin, /apps/portal, /packages/shared (Zod schemas, permissions, rules), /packages/contracts (OpenAPI), /packages/ui, /packages/rules-engine, /infra, /docs.

Branching

Trunk-based with short-lived feature branches; main is always releasable; release tags vMAJOR.MINOR.PATCH.

Pull requests

At least one reviewer; two for security-sensitive paths (auth, crypto, case access, payments, rules engine) defined in CODEOWNERS; checks must pass.

Commits

Conventional commit messages; signed commits for maintainers.

Code quality

TypeScript strict mode; ESLint with security rules; Prettier; no any in shared packages; maximum function complexity enforced.

Definition of code complete

Tests written, contract updated, audit events added, permissions declared, microcopy in three languages or flagged, accessibility checked, documentation updated.

27.5 CI/CD pipeline

Stage

Actions

Gate

1 Validate

Install with lock file, type check, lint, secret scan, licence check

Zero errors

2 Test

Unit tests, rules-engine scenario tests (40 timeline scenarios), contract tests, authorisation matrix tests, tenant isolation tests

All pass; coverage at least 80 percent overall and 95 percent on rules engine, auth, crypto and payments

3 Build

Build container images, generate OpenAPI and compare, generate software bill of materials, scan images

No critical vulnerabilities

4 Deploy to development

Automatic; run migrations; smoke tests

Smoke tests pass

5 End-to-end

Playwright journeys on development (Section 29.1)

Critical journeys pass

6 Release candidate

Tag; deploy to staging; dynamic scan; performance smoke

No high findings

7 Approval

Product owner and Security Lead sign off the checklist in Section 28.8

Two approvals

8 Production

Blue-green or rolling deploy; migrations in expand-contract order; health checks; automatic rollback on failed checks

Health green for 15 minutes

9 Post-release

Smoke test of payment sandbox, request alert, case creation in a test organisation; release notes published

All pass

Migration rule

Detail

Tooling

Versioned migration scripts with up and down functions, tracked in a migrations collection.

Pattern

Expand then contract: add fields and indexes first, deploy code that handles both, back-fill, then remove old fields in a later release.

Indexes

Built in the background; large builds are scheduled in low traffic windows.

Safety

Every migration is tested on a copy of staging data and has a dry-run mode.

27.6 Background jobs and schedules

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


## BR-026

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


## BR-005

sla-scan

Every 5 minutes

Support SLA timers and escalations


## BR-057

rule-calendar-check

Weekly

Warn if holiday calendars for next year are missing; show directory entries unverified for 180 days


## BR-060, BR-068

aftercare-scan

Daily 09:00

Create 30, 90 and 180 day check-in tasks


## TM-19

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

Jobs run in a separate worker deployment using BullMQ with Redis, with a leader lock so duplicate schedulers do not run. Every job logs start, end, count and duration, and failures alert after two consecutive misses.

27.7 Backup, recovery and continuity

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

27.8 Monitoring, alerting and service levels

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


## P2

Errors

HTTP 5xx rate

Above 1 percent for 5 minutes


## P2

Request alert path

Time from request submission to admin alert and email

Above 30 seconds


## P2

Queues

Queue depth and oldest job age; dead-letter count

Age above 5 minutes; any dead letter


## P2

Payment health

Failure rate, webhook backlog, reconciliation mismatches

Failure rate above 15 percent; any mismatch

P1 for mismatch

Timer engine

Last successful timer-scan run

Older than 15 minutes


## P1

Database

Replica lag, connections, disk, slow queries

Lag above 10 seconds; disk above 75 percent


## P2

Security

Login failure spikes, denied access spikes, break-glass use, audit chain break, WAF blocks

Per rules in 26.7

P1 to P2

Email and SMS

Delivery and bounce rates

Bounce above 5 percent


## P3

Backups

Success and age

Older than 26 hours


## P1

Certificates and keys

Days to expiry

Under 30 days


## P3

Cost

Monthly spend versus budget

Above 80 percent


## P3

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

Logs are kept for 180 days (hot for 30), metrics for 13 months, traces for 14 days. On-call rotation and escalation are in Section 30.

27.9 Release and rollback

Item

Rule

Release cadence

Fortnightly after go-live; hot fixes on demand; legal rule updates are data changes through the rules console and do not need a release.

Freeze windows

No releases during the last 3 days of March (financial year end), on days when an annual report window closes, or on a holiday.

Feature flags

New POSH features ship dark and are enabled per organisation after UAT.

Rollback

Previous image is kept; rollback within 15 minutes; database changes follow expand-contract so rollback is code only; if data is affected, restore of the specific collection from point-in-time recovery under incident command.

Release notes

Every release has notes in plain language for organisation admins and a technical changelog.

Post-release review

Health and error review at 1 hour and 24 hours.

27.10 Cost control of infrastructure

Item

Indicative monthly cost for the first year (INR, to be confirmed against current provider prices)

Notes

Compute containers (API, workers, web)

4,000 to 9,000

Autoscale ceiling set

MongoDB Atlas dedicated small cluster

8,000 to 15,000

Backups included; shared tier is not allowed for POSH data

Redis managed

1,500 to 3,000

Object storage and CDN

1,000 to 3,000

Grows with evidence files

Email, SMS, WhatsApp

1,500 to 5,000

Usage based

Monitoring, error tracking, uptime

1,500 to 4,000

Malware scanning, WAF

1,500 to 4,000

Total

19,000 to 43,000

This running cost is separate from the development quotation and has to be funded by the plans in Section 17

28. Delivery Plan

This section converts the scope into a week-by-week plan, team roles, quality gates and the effort check. It aligns with the phases in Section 16 (Phase 0 week 1; Phase 1 weeks 2 to 4; Phase 2 weeks 5 to 7; Phase 3 weeks 8 to 12; Phase 4 weeks 13 to 16; Phase 5 weeks 17 to 21; hypercare weeks 22 to 25).

28.1 Team and roles

Role

Count

Responsibility

Product owner (Acorn Managing Partner or delegate)

1

Priorities, acceptance, decisions D-1 to D-26

Delivery lead / Scrum master

1

Plan, risks, reporting

Tech lead (full-stack, MERN)

1

Architecture, security-sensitive code, reviews

Backend developers

2

API, rules engine, jobs, integrations

Frontend developers

2

Website, admin, portal, accessibility

QA engineer (with automation)

1

Test plan, E2E, authorisation tests

DevOps and security engineer

1 (part-time after setup)

Infrastructure, CI/CD, hardening

UX designer (text-based specs, no graphics in this document)

1 (part-time)

Flows, accessibility, microcopy in three languages

Legal subject-matter lead (Acorn counsel)

1 (part-time)

Rule parameters, templates, notices, UAT on legal flows

Translator and reviewer (Bengali, Hindi)

As needed

Microcopy and templates

28.2 Working method

Item

Rule

Sprints

One-week sprints with planning on Monday, demo on Friday and a short retrospective; stories sized in points (Section 21).

Definition of Ready

Story has acceptance criteria, linked requirement IDs, permission keys, data fields, API calls, test notes and microcopy; dependencies identified; legal question resolved or marked.

Definition of Done

Code reviewed; tests pass in CI; acceptance criteria demonstrated; audit events and permissions added; accessibility check; microcopy approved; documentation and contract updated; deployed to development; no open high defects.

AI-assisted development

AI code assistants may be used for scaffolding and tests; all generated code in security-sensitive areas (auth, crypto, case access, payments, rules engine) needs line-by-line human review and tests before merge.

Change control

Scope changes after a phase starts go through a written change request with effort, price and schedule impact.

Reporting

Weekly status: progress by epic, risks, decisions needed, budget used.

28.3 Weekly plan

Week

Phase

Goals and deliverables

Exit check


## W1

0

Kick-off, decisions D-1 to D-10, repository, CI skeleton, environments, design system tokens, rules and data-model walkthrough, access to accounts (domain, Razorpay, email, SMS)

Kick-off checklist (28.8) signed


## W2

1

Auth and roles, settings, audit log, public site shell, homepage sections, navigation (E01 start)

Login and role tests pass


## W3

1

Landing pages, service pages, request form with real-time alert and email, Q&A submit, SEO base

Request alert under 5 seconds


## W4

1

Razorpay orders, verify, webhook, receipts, admin inbox, blog CMS and script control, Phase 1 hardening and UAT

Phase 1 acceptance (Section 14.1)


## W5

2

Organisation onboarding wizard, branches, committee builder and validation, roster import

Committee validation tests


## W6

2

Policies, notices tracker, duty register, compliance score, organisation dashboard

Score matches worked examples


## W7

2

Service catalogue, plans, subscriptions, orders, delivery tasks, invoices, support tickets basics

Phase 2 acceptance


## W8

3

Rules engine core: calendars, rule sets, timer calculation, clock stop, scenarios 1 to 20

Scenario tests 1 to 20 pass


## W9

3

Intake form, drafts, OTP, routing RT-01 to RT-21, limitation, case creation, receipts

Routing tests pass


## W10

3

State machine T01 to T30, case roles, conflict declarations, undertakings, case diary

Authorisation matrix tests pass


## W11

3

Notices, replies, hearings, statements, documents, chain of custody, conciliation, interim relief

Document custody tests


## W12

3

Reports, compensation, employer action, appeals, aftercare, legal hold, break-glass, retention engine, case export, scenarios 21 to 40

Phase 3 UAT; all 40 scenarios pass


## W13

4

Complainant and respondent portals, status views, accessibility, Bengali and Hindi microcopy

Accessibility audit


## W14

4

Notification matrix P-01 to P-40, templates DOC-01 to DOC-38, real-time case events

Content-free lint passes


## W15

4

Legal console: rule set approvals, template approvals, directory, watch list; support systems SUP

Rule activation workflow


## W16

4

Security hardening, encryption verification, penetration test preparation, performance work

Pen test scheduled


## W17

5

LMS: courses, assignments, quizzes, certificates, live sessions

Certificate verification


## W18

5

Annual reports, board and BRSR data, compliance exports, anonymous surveys

Report counts reconcile


## W19

5

Sector overlays, remedies map, rights charters, Acorn own compliance, independence and contract pack

Legal sign-off


## W20

5

Penetration test fixes, load test, backup restore drill, DR runbooks

No critical or high open


## W21

5

Full UAT with a pilot organisation, content freeze, training of Acorn staff, go-live checklist

Go-live approval

W22 to W25

Hypercare

Daily monitoring, defect fixing, first month metrics, knowledge transfer, handover of documentation and accounts

Handover accepted

28.4 Effort estimate and price reality check

The backlog in Section 21 has 142 user stories totalling 755 story points across 19 epics. Using a conservative delivery rate of 3 to 5 hours per point for a team that uses AI-assisted coding on well-specified work (about 2,300 to 3,800 hours), plus testing, security, project management and legal review, the realistic effort for the whole scope is large.

Epic

Points

Epic

Points

E01 Foundation and auth

76

E11 Case lifecycle and rules engine

69

E02 Public website and CMS

57

E12 Documents and evidence

36

E03 Service requests

32

E13 Portals and notifications

40


## E04 Q&A

22

E14 Legal console and templates

48

E05 Payments

29

E15 Support systems

27

E06 Blog and script control

19

E16 Retention, privacy and security tooling

18

E07 Organisation and committee

34

E17 LMS and prevention

57

E08 Compliance and score

21

E18 Reports and surveys

39

E09 Services and billing

37

E19 Sector overlays and charters

39

E10 Intake and routing

55

Total

755

Scenario

Scope

Estimated effort

Indicative price at market rates (INR)

Comment

A Lean

Phase 1 only: website, admin, request alerts, Q&A, blog and scripts, Razorpay

About 350 to 600 hours with AI assistance

13,000 to 90,000 depending on who builds and how much AI automation

The only scope that fits the ultra-low budget the client first discussed

B Standard

Phases 1 and 2 plus POSH intake and a simple case tracker (no full rules engine)

About 1,200 to 1,800 hours

3 to 6 lakh

Useful product; manual legal timers

C Full

All phases of this document

About 2,800 to 4,500 hours including testing and security

10 to 25 lakh depending on team and rates

The scope of this PRD at industry grade

Important: the indicative total of INR 94,000 to 1,26,000 in Section 17 is a build-cost target for a heavily AI-driven, founder-supervised delivery of the entire scope and carries high risk. It does not include legal review, penetration testing, running costs (Section 27.10) or the effort of the legal and content team. Acorn should treat Section 17 as the minimum cost case and should obtain written fixed-price bids for Scenarios A, B and C before committing. The phased approach allows funding Phase 1 first and building later phases from revenue.

28.5 RACI for key activities

Activity

Product owner

Delivery lead

Tech lead


## QA

Legal lead

Security lead

Scope and priorities


## A


## R


## C


## I


## C


## I

Rule parameters and templates


## A


## I


## C


## I


## R


## I

Architecture and security design


## I


## I


## A/R


## C


## I


## R

Build and code review


## I


## I


## A/R


## C


## I


## C

Test plan and execution


## I


## C


## C


## A/R


## C


## C

UAT and sign-off


## A


## R


## C


## R


## R


## C

Penetration test and fixes


## I


## C


## R


## C


## I


## A

Go-live decision


## A


## R


## C


## C


## C


## C

Incident response


## I


## C


## R


## C


## C


## A

R means responsible, A accountable, C consulted, I informed.

28.6 Risk register for delivery


## ID

Risk

Likelihood

Impact

Mitigation

Owner


## DR-01

Scope is larger than the budget

High

High

Phased funding; Section 28.4 scenarios; change control

Product owner


## DR-02

Legal rules misread or outdated

Medium

High

Counsel sign-off on rule parameters; rules console; watch list

Legal lead


## DR-03

Late decisions on open items

High

Medium

Decision log with dates; defaults in Section 20

Delivery lead


## DR-04

Security weakness in case access

Low

Critical

Authorisation matrix tests; review; penetration test

Security lead


## DR-05

Translation quality

Medium

Medium

Reviewer for Bengali and Hindi; glossary

UX lead


## DR-06

Third-party delays (Razorpay approval, DLT registration, email domain)

High

Medium

Start applications in week 1

Delivery lead


## DR-07

AI-generated code defects

Medium

High

Human review on sensitive code; high test coverage

Tech lead


## DR-08

Key person dependence

Medium

Medium

Documentation, pairing, deputies

Delivery lead


## DR-09

Data migration or import errors

Medium

Medium

Validation reports; dry runs

Tech lead


## DR-10

Pilot organisation not available

Medium

Medium

Use synthetic organisation; run UAT with Acorn staff

Product owner


## DR-11

Regulatory change during the build (DPDP dates, new orders)

Medium

Medium

Parameters not code; backlog buffer of 5 percent

Legal lead


## DR-12

Performance under load on report generation

Low

Medium

Queues and load test in week 20

Tech lead

28.7 Decision log process

All open decisions are in Section 20 (D-1 to D-26). Each has a recommended default, an owner and a needed-by week. If a decision is not made by its date the default is applied and recorded, and the delivery lead informs the product owner. Decisions that affect law or confidentiality (D-23, D-24, D-25) cannot be defaulted without counsel confirmation.

28.8 Kick-off and go-live checklists

Kick-off checklist (week 1)

Done

Signed scope, price, change control and confidentiality terms

[ ]

Product owner and legal lead named; decision meeting schedule fixed

[ ]

Domain, DNS access, brand assets, About Us and service content received

[ ]

Razorpay account application started (business documents, bank details)

[ ]

Email sending domain and SPF, DKIM, DMARC planned; mailbox for alerts decided

[ ]

SMS sender registration (DLT) started for content-free templates

[ ]

Cloud accounts created in India region; billing owner named

[ ]

Repository, CI, project board and communication channels created

[ ]

Decisions D-1 to D-10 made or defaulted

[ ]

Pilot organisation identified or synthetic organisation agreed

[ ]

Content owner and approval workflow for blog and Q&A named

[ ]

Go-live checklist

Done

All acceptance criteria in Section 14 met and signed by the product owner

[ ]

40 timeline scenarios and all authorisation tests pass in the release candidate

[ ]

Penetration test critical and high findings closed and retested

[ ]

Backup restore drill and incident exercise completed

[ ]

Rule set approved by two approvers; holiday calendars loaded for the current and next year

[ ]

Templates DOC-01 to DOC-38 and notices P-01 to P-40 approved by counsel in all three languages or marked as English only

[ ]

Directory and helpline entries verified with dates

[ ]

Privacy notice, terms, cookie notice and POSH confidentiality notice published

[ ]

Service contract pack, data processing terms and undertakings approved by counsel

[ ]

Production keys, secrets, DNS, TLS, WAF and monitoring verified

[ ]

Razorpay live mode tested with a small real payment and refund

[ ]

Acorn staff trained; break-glass and incident procedures rehearsed

[ ]

Support rota and on-call set; status page ready

[ ]

Rollback plan reviewed; freeze window confirmed

[ ]

28.9 Handover and acceptance

Deliverable

Contents

Source code and infrastructure

Repository ownership transferred to Acorn; infrastructure code; build instructions

Documentation

This PRD, API contract, data dictionary, runbooks, admin manual, organisation admin guide, IC member guide, complainant guide

Accounts and keys

Transfer of cloud, payment gateway, email, SMS, domain and monitoring accounts; key custodians named

Training

Sessions for Acorn admins, intake counsellors and legal admin; recorded as text guides

Warranty

Defect fixes for 90 days after go-live for issues against this specification

Support and maintenance

Optional annual plan covering updates, security patches, rule updates and hosting management

29. Test Specification

This section defines what is tested, how, by whom and to what standard. The overall strategy is in Section 13; here are the build-ready cases. A story is done only when its tests are automated and run in the pipeline, except usability and legal reviews, which are manual and recorded.

29.1 Critical end-to-end journeys


## ID

Journey

Steps (summary)

Expected result


## E2E-01

Visitor submits a service request

Open landing page, fill form with consent, submit with CAPTCHA

Reference shown; email to requester; admin alert within 5 seconds; record in inbox; audit event


## E2E-02

Duplicate and spam handling

Submit twice within 2 minutes; submit with honeypot filled

Second returns the original reference; spam is flagged and hidden


## E2E-03

Q&A ask, answer, publish

Visitor asks; admin answers, anonymises, publishes

Public page shows anonymous question and answer; asker receives email


## E2E-04

Payment success

Choose fee item, pay with test card, return

Order, verification, webhook, receipt number, email, admin alert


## E2E-05

Payment failure and retry

Fail first attempt, then pay

Status failed then paid; one receipt only


## E2E-06

Webhook before return

Deliver webhook, then verify call

Idempotent; single receipt; no double mail


## E2E-07

Refund

Admin refunds a payment partially then fully

Credit note numbers; payer email; status updates


## E2E-08

Blog publish with SEO checks

Draft, add image without alt, schedule

Blocked until alt text and meta added; publishes at the time; sitemap updated


## E2E-09

Script approval

Editor submits inline script; admin approves; enable

Script appears only on chosen paths and only after consent; disable removes it


## E2E-10

Organisation onboarding

Create organisation, branches, committee, import roster

Validation shows issues until composition is valid; score starts


## E2E-11

Complaint filed by an employee

OTP, form steps A to H, declarations, submit

Case created, routing outcome shown, receipt, timers started, content-free email


## E2E-12

Counsellor-assisted intake

Counsellor records a complaint for a person

filedBy assisted; same routing; person receives copy


## E2E-13

Case to closure (substantiated)

Triage, notice, reply, hearings, report, action, close

All transitions allowed; timers met; documents issued; aftercare tasks


## E2E-14

Conciliation settlement

Request, consent, settlement without money basis

Case moves to settled and closed; monetary block tested separately


## E2E-15

Late complaint with extension

Submit after 3 months with reasons

Late review created; extension order recorded; case proceeds


## E2E-16

Case against a senior (conflict)

IC member related to respondent

Conflict declared; reassignment; access denied until cleared


## E2E-17

Local Committee route

Organisation under 10 staff or complaint against employer

Referral to the Local Committee with 7-day forwarding task and directory


## E2E-18

Legal stay and clock stop

Court stay recorded

Timers paused with ground and order; resume after vacate


## E2E-19

Break-glass

Request, approval, use, expiry

Access limited to 2 hours; Managing Partner alerted; entry in monthly review


## E2E-20

Legal hold and retention

Place hold; run retention scan; lift hold; execute

Hold blocks deletion; execution produces certificate and crypto-erasure


## E2E-21

Annual report

Generate for a year with mixed cases

Counts match metadata; no personal data in the output


## E2E-22

Training and certificate

Assign, complete, quiz, verify certificate

Pass mark applied; certificate verifies publicly with name and course only


## E2E-23

Compliance score

Complete duties, upload evidence, let items expire

Score and band change per formula; tasks created


## E2E-24

Support ticket with case-content scan

Organisation pastes complaint text in a ticket

Submission blocked or masked with a warning


## E2E-25

Rule set change

Draft new parameters, run scenarios, two approvals, activate

New cases use the new version; existing timers keep the old version


## E2E-26

Language switch

Complete intake in Bengali and Hindi

Labels, errors, receipt and templates in the chosen language


## E2E-27

Accessibility

Keyboard-only and screen-reader pass for intake and portal

No blockers; targets in 29.7


## E2E-28

Retaliation report

Report retaliation by a complainant

Linked priority case created; short timers; counsellor task

29.2 Unit and component tests by module

Module

Must cover

Auth

Password policy, lockout, token rotation and reuse detection, MFA, OTP limits, link expiry, CSRF

Permissions

Every role against every permission key; route guard coverage; tenant guard on every collection

Payments

Amount from catalogue only, signature check, webhook idempotency, replay, out-of-order events, refund limits, reconciliation mismatch, rounding and tax in basis points


## CMS

Sanitisation, slug changes and redirects, scheduling, SEO rule enforcement, version restore

Scripts

Approval flow, host allow-list, SRI check, consent categories, path scope, disable and restore

Requests and Q&A

Deduplication, spam scoring, assignment, status machine, anonymisation, publishing rules

Rules engine

Working-day calendar, weekly off, state and central holidays, anchor events, day counts, clock stop, 3-month and 90-day rules, effective-dated parameters, explanation text

Routing

All 21 routing rules with edge combinations (headcount, employer, domestic worker, student, contractor, third party)

State machine

Every allowed and every forbidden transition, with reasons and role requirements

Case access

Role view filters, masked lists, undertaking and conflict gates, denial returns NOT_FOUND

Encryption

Round trip, AAD binding, wrong key, key rotation, crypto-erasure, blind index equality

Documents

Hashing, custody events, immutability, redaction copies, release rules

Retention

Schedule calculation, hold check, two-approval rule, certificate content

Notifications

Template lint for free text, channel fallback, language selection, quiet-hours rule

Compliance score

Domain weights, reasons, evidence expiry, band thresholds


## LMS

Attempts, pass mark, expiry, certificate code and verification

Surveys

Anonymity, minimum group size, no linkage

Reports

Count rules, period boundaries, no personal data

29.3 Timeline engine scenarios (forty cases)

Each scenario is a data file with inputs (events, dates, calendars, rule set version) and expected outputs (timer dates and explanations). All must pass in CI. Dates below are illustrative; the actual files use fixed calendar data. Parameters come from the rule set in Section 8.30.

No

Scenario

Expected behaviour


## S-01

Complaint on day 1 after incident

Within period; TM-01 ok; acknowledgement due per rule


## S-02

Complaint exactly 3 months after the last incident

Within period on the last day; calendar month arithmetic checked


## S-03

Complaint one day after 3 months

LIMITATION_EXPIRED unless extension is requested; late review created


## S-04

Last incident on 31 May, complaint on 30 August

Month-end arithmetic handled


## S-05

Series of incidents, last within 3 months

Period runs from the last incident


## S-06

Extension granted by 3 months

Deadline moves; limit of 6 months in total


## S-07

Extension requested beyond 6 months

Rejected by rule; reason shown


## S-08

Incapacity of the complainant

Representative route; period computed from the date of capacity or as per order


## S-09

Copy to respondent within 7 working days with a state holiday in the period

Holiday skipped; date correct


## S-10

Weekly off on Friday and Saturday (organisation setting)

Working days follow the organisation calendar


## S-11

Respondent reply due in 10 working days

Counting begins the next working day after service


## S-12

Service by post with deemed delivery

Deemed date per rule, reply date follows


## S-13

Reply filed late

Flagged late; case continues; breach not hidden


## S-14

Inquiry 90 days from the date of inquiry start

Date correct; counts calendar days


## S-15

Inquiry start anchored on complaint receipt (organisation setting)

Anchor option respected


## S-16

Conciliation request during the inquiry

Clock is not stopped unless the rule says so; documented


## S-17

Hearing adjourned at the request of a party

Delay reason recorded; no pause without a legal ground


## S-18

Court stay for 40 days

Pause with order; resume; deadline extended by exactly 40 days


## S-19

Overlapping pauses

Overlap counted once


## S-20

Pause without an order document

Blocked with RULE_BLOCKED


## S-21

Report due 10 days after inquiry completion

Calendar days; holidays do not extend


## S-22

Employer action within 60 days of the report

Date correct; overdue flag on day 61


## S-23

Appeal within 90 days of the recommendations

Date correct; window closes without action


## S-24

Appeal filed on day 90

Within time


## S-25

Appeal filed on day 91

Marked out of time; counsel review task


## S-26

Interim relief request decision within the set time

TM-12 correct


## S-27

Rule set changes in the middle of a case

Existing timers keep the earlier version; new timers use the new one; both shown


## S-28

Rule set effective date on a holiday

Next working day is used as stated in the rule


## S-29

Organisation moves weekly off during a case

Calendar versioning prevents silent changes; admin must confirm effect


## S-30

Leap year date arithmetic (29 February)

No error; month arithmetic correct


## S-31

Daylight and time zone (server in UTC, user in IST)

Dates evaluated in IST; no off-by-one around midnight


## S-32

Complaint at 23:59 IST on the last day

Within period; receipt time recorded


## S-33

Complaint transferred from another organisation (referral)

Receipt date retained for limitation; new timers from referral


## S-34

Local Committee forwarding by the Nodal Officer in 7 days

Forwarding timer and reminder


## S-35

Retaliation case linked to an open case

Short timers; independent clock


## S-36

Counter-complaint

Separate case; separate committee check; no shared access


## S-37

Withdrawal then re-filing within period

Allowed with prior case link; period unaffected


## S-38

Case reopened for an addendum after closure

Retention date recalculated; audit note


## S-39

Legal hold during appeal and release

Retention blocked and then recalculated from the hold end


## S-40

Outage of 6 hours across a threshold

Alerts sent on recovery with a note; no deadline shortened

29.4 Authorisation and tenant isolation tests


## ID

Test

Expected


## AZ-01

Matrix test: every role calls every endpoint with a valid and an invalid case role

Only matrix cells marked allowed return success


## AZ-02

Organisation A admin calls organisation B resources by ID

NOT_FOUND on every endpoint


## AZ-03

IC member with no case role opens a case


## NOT_FOUND


## AZ-04

IC member without a signed undertaking


## CASE_ACCESS_DENIED


## AZ-05

IC member with a declared conflict

No access; reassignment task


## AZ-06

Respondent sees complainant details or other party documents

Never; only released items


## AZ-07

Complainant sees IC deliberation notes

Never


## AZ-08

Organisation admin requests case content

Denied; metadata only


## AZ-09

Acorn staff opens case content without break-glass

Denied; alert logged


## AZ-10

Access after deactivation, role revocation or tenure end

Denied within 1 minute; socket rooms removed


## AZ-11

Mass assignment (sending extra fields such as roles or orgId)

Rejected by schema


## AZ-12

Insecure direct object references on files and documents

Denied unless role permits


## AZ-13

Signed download URL used after expiry or by another user

Denied


## AZ-14

List endpoints for names and narratives

Masked or absent


## AZ-15

Notification and email content for POSH

Contains only content-free text; lint test on every template


## AZ-16

Search endpoints

Do not index or reveal POSH text


## AZ-17

Log scan after a full E2E run

No names, narratives or contact details in logs


## AZ-18

Export of a case without a purpose or by a wrong role

Denied

29.5 Security tests


## ID

Test

Expected


## SEC-01

SQL and NoSQL injection payloads in every input

Rejected or neutralised


## SEC-02

Cross-site scripting in blog, Q&A, ticket, request description

Sanitised; CSP blocks inline


## SEC-03

CSRF attempts on all state-changing routes

Denied


## SEC-04

Session fixation and token theft replay

Refresh reuse revokes family


## SEC-05

Brute force on login and OTP

Lockout and rate limit


## SEC-06

Webhook with wrong signature or replay

Rejected or ignored


## SEC-07

Amount tampering in payment order

Server amount used


## SEC-08

File upload: executable renamed as pdf, oversized, zip bomb, EICAR test file

Blocked or quarantined


## SEC-09

SSRF through URL fields

Blocked


## SEC-10

Open redirect on return URLs

Blocked


## SEC-11

Clickjacking

Frame ancestors none


## SEC-12

TLS configuration and headers scan

Grade A or equivalent


## SEC-13

Dependency and container scan

No critical or high


## SEC-14

Secrets in repository history

None


## SEC-15

Database and storage exposure from the internet

Not reachable


## SEC-16

Backup restore and key recovery

Meets 27.7


## SEC-17

Audit chain tamper test

Detected the same day


## SEC-18

Third-party script injection through script control

Needs approval; blocked on portal pages

29.6 Performance and resilience tests


## ID

Scenario

Target


## PERF-01

Public pages under 500 concurrent visitors

p95 below 800 ms for cached pages; no errors


## PERF-02

Request submission burst of 50 per minute

All stored; alerts within 5 seconds


## PERF-03

Payment checkout 30 per minute

No duplicate receipts


## PERF-04

Case list with 50,000 cases per organisation

p95 below 1.5 seconds with filters


## PERF-05

Timer scan with 100,000 active timers

Complete in under 2 minutes


## PERF-06

Report generation for 5,000 cases

Under 3 minutes in the queue


## PERF-07

File upload of 25 MB over a slow network

Resumable and successful


## PERF-08

Socket.io with 1,000 connections

Event latency below 2 seconds


## PERF-09

Failure injection: database primary stepdown, Redis restart, email outage, gateway outage

Degraded modes in 27.7 work; no data loss


## PERF-10

Soak test of 8 hours

No memory growth beyond 20 percent

29.7 Accessibility, usability and language tests

Area

Standard and method

Accessibility

WCAG 2.2 AA for public site and portals: keyboard operation, focus order, contrast, labels, error identification, reflow at 400 percent zoom, screen-reader checks with NVDA and TalkBack; automated checks with axe in CI; manual audit before go-live. Compliance with the Rights of Persons with Disabilities Act accessibility expectations and the GIGW guidance where relevant.

Usability

Moderated test with at least 5 users per role group (complainant-like, IC member, organisation admin, Acorn admin) on mobile and desktop; trauma-informed review of intake wording by a counsellor.

Language

Full journeys in English, Bengali and Hindi; text expansion; fonts for Bengali and Devanagari; date and number formats; review by native reviewers.

Browsers and devices

Latest two versions of Chrome, Edge, Safari, Firefox; Android 11 or higher; iOS 15 or higher; slow 3G profile for the complaint form.

Print and PDF

Generated documents checked in print layout and PDF with accessible tags where possible.

29.8 Legal content review and UAT

Activity

Who

Output

Legal review of rule parameters, templates, notices and microcopy

Acorn counsel plus an independent counsel for rule sets

Signed review log with changes

Scenario walk-through of 10 realistic case files

Legal lead, IC practitioner

Defects and clarifications

UAT scripts for each acceptance criterion in Section 14 and POSH-AC-11 to POSH-AC-24

Product owner, QA

Pass or fail record

Pilot with a friendly organisation (synthetic or consenting)

Service Manager

Feedback report

Defect triage: critical (blocks go-live), high (fix before go-live), medium (within 30 days), low (backlog)

Delivery lead

Defect list

29.9 Requirements traceability

Every requirement ID, business rule, state transition, timer and screen is traced to at least one story and one test. The traceability matrix is generated from tags in the test files (for example @REQ:PS-04, @BR:BR-031, @T:T14) and compared with the ID index in Section 8.32. The pipeline fails if a Must requirement has no tagged test.

Source

Traced to

Coverage rule

Requirements (Sections 6 to 8 IDs)

Stories US-xxx and tests

100 percent of Must; 90 percent of Should

Business rules BR-001 to BR-070

Unit and integration tests

100 percent

Transitions T01 to T30

State machine tests and E2E

100 percent allowed and forbidden

Timers TM-01 to TM-21

Scenarios S-01 to S-40

100 percent

Routing rules RT-01 to RT-21

Routing tests

100 percent

Notifications P-01 to P-40

Template lint and delivery tests

100 percent

Edge cases EC-01 to EC-28

Integration tests

100 percent

Acceptance criteria

UAT scripts

100 percent

29.10 Test data

Item

Rule

Synthetic data

Generated by seed scripts: three organisations (small under 10 staff, medium multi-branch, large with a hostile-environment edge case), 60 cases across all states, 200 roster rows, payments in all statuses

No real personal data

Test data never uses real names, phone numbers or complaint text; the generator uses fictional values and reserved test domains

Reset

Staging can be reset from seed in under 15 minutes

Payment testing

Razorpay test keys and documented test cards; live mode only for the go-live smoke test with a small real payment

Time travel

A test clock lets scenarios move time forward without waiting; disabled in production

30. Operations: Runbooks and Standard Procedures

These are the standing operating procedures that keep a POSH platform lawful, confidential and available after go-live. Each procedure has an owner, a trigger, steps, records to keep and a review cycle. They are written so they can be adopted as Acorn policies with light editing by counsel.

30.1 Procedure register


## ID

Procedure

Owner

Trigger or frequency


## SOP-01

Confidentiality or security incident workflow

Security Lead

Any suspected breach


## SOP-02

Break-glass access

Managing Partner

Request by POSH admin


## SOP-03

Legal hold

Legal Admin

Appeal, court order, notice of litigation


## SOP-04

Retention review and deletion

Legal Admin

Daily scan; monthly review


## SOP-05

Annual report and audit cycle

Service Manager

Yearly window per organisation


## SOP-06

Organisation onboarding

Service Manager

New client


## SOP-07

Organisation offboarding

Service Manager

Contract end


## SOP-08

Staff joiner, mover and leaver

HR and Security Lead

Each change


## SOP-09

On-call and escalation

Tech Lead

Continuous


## SOP-10

Rule set and template change

Legal Admin

Law change, quarterly review


## SOP-11

Statutory watch review

Legal Admin

Monthly


## SOP-12

Complainant support and welfare contact

Intake Counsellor

On case submission and at aftercare dates


## SOP-13

Data subject request handling

Privacy Officer

On receipt; due dates tracked


## SOP-14

Payment issue and refund handling

Finance

Failed or disputed payment


## SOP-15

Backup, restore and disaster recovery

DevOps

Daily check; quarterly drill


## SOP-16

Access review

Managing Partner

Quarterly


## SOP-17

Vendor and sub-processor review

Security Lead

Yearly and on change


## SOP-18

Complaint about Acorn service

Managing Partner

On receipt


## SOP-19

Panel member (external) assignment and independence check

Legal Admin

Each committee or inquiry need


## SOP-20

Content publication and moderation (blog, Q&A)

Content Lead

Daily


## SOP-21

Script change approval

Marketing Manager and Admin

Each request


## SOP-22

Release management

Tech Lead

Fortnightly

30.2 SOP-01 Confidentiality or security incident workflow

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

30.3 SOP-02 Break-glass access

Step

Action

1

POSH Admin submits a request with the case ID, reason (for example, technical fault, court order, regulator request) and the exact data needed.

2

The Managing Partner approves or rejects after checking that no less intrusive route exists; a second reviewer is needed for content access.

3

Access is granted for the minimum period (maximum 2 hours) and only to the named person; the person signs a case-specific undertaking.

4

Every view and download is logged; the case Presiding Officer is informed in a content-free message that Acorn accessed the case.

5

Access expires automatically; the person writes a short record of what was done.

6

Monthly review by the Managing Partner and Security Lead compares all break-glass events with tickets; exceptions are escalated.

30.4 SOP-03 Legal hold and SOP-04 retention

Step

Action

Hold 1

Counsel records a hold when an appeal, writ, civil, criminal or labour proceeding, or a notice of litigation, is known; hold applies to the case and linked cases.

Hold 2

The system blocks edits that would change evidence, retention steps, and exports without counsel approval.

Hold 3

Quarterly review of active holds with counsel; a hold is lifted only on written confirmation that the proceeding has ended and the appeal period has passed.

Retention 1

Retention scan lists cases whose retention date has passed; the Legal Admin reviews the list monthly.

Retention 2

Check for holds, pending appeals, aftercare tasks, open employer actions and organisation requests to extend the period.

Retention 3

First approval by the Legal Admin and second approval as agreed in the contract; the decision is recorded.

Retention 4

Run the execution; confirm the deletion certificate; confirm that files and keys are gone; sample-test a backup restore in the next drill.

Retention 5

Notify the organisation that the case file was destroyed, with a content-free certificate.

30.5 SOP-05 Annual report and audit cycle

Step

Action

Timing

1

System opens the annual report task for each organisation and branch and reminds the Presiding Officer

60 days before the period end set in the organisation profile

2

Presiding Officer reviews the computed counts (received, disposed, pending, pending over 90 days), workshops and awareness programmes

30 days before

3

Acorn reviews drafts for the director report and board disclosure wording (Companies Act and the 2025 amendment) and the annual POSH audit where purchased

21 days before

4

Organisation approves and files the report with the District Officer or as required; the filing reference is recorded

By the legal deadline

5

Evidence is stored; the duty register updates; the score recalculates

On filing

6

Acorn updates its own anonymised statistics

After the year ends

30.6 SOP-06 Onboarding and SOP-07 offboarding of organisations

Phase

Steps

Onboarding

Signed service contract and data processing terms; identify the organisation contact and Presiding Officer; create the organisation and branches; capture headcount; check Internal or Local Committee need; constitute the committee and external member; collect undertakings; load the policy and notices; schedule training; run the gap audit; set the score baseline; train organisation admins; hand over the quick guide; schedule a 30-day review.

Offboarding

Give 60 days notice; deliver the final compliance report; close open orders; transfer open cases to the Presiding Officer with a hand-off record or keep them under a continuation arrangement; export organisation data to the authorised contact; disable user access; apply retention schedule; issue a closure letter and a confirmation of data handling.

30.7 SOP-08 Staff joiner, mover and leaver

Event

Actions

Joiner

Background check as lawful; confidentiality agreement; POSH and data protection training before access; MFA enrolment; least-privilege role; undertaking signed; access logged

Mover

Role change request approved by the manager and Security Lead; old access removed the same day; conflict check for any case assignment

Leaver

Access removed within 1 hour of exit; devices recovered; case roles reassigned with hand-over; exit reminder of confidentiality duties; log review for the last 30 days

Contractor or panel member

Same as staff plus conflict declaration for each case and expiry of access at the end of the engagement

30.8 SOP-09 On-call and escalation

Level

Who

When

Response


## L1

Support executive on duty (business hours) or on-call engineer (outside hours)

Alert or ticket

Acknowledge within 15 minutes for P1


## L2

Tech Lead or DevOps

Not resolved in 30 minutes or any SEV-1

Lead the fix


## L3

Security Lead and Legal lead

Any suspected confidentiality or data exposure

Incident workflow


## L4

Managing Partner

SEV-1 or client-facing outage over 2 hours

Decisions, communications

A rota of at least two named engineers is kept; handovers are written; the on-call phone and alert routes are tested monthly.

30.9 SOP-10 and SOP-11 legal change management

Step

Action

1 Watch

Review official sources monthly: Gazette and Ministry of Women and Child Development, Ministry of Labour, MCA, SHe-Box notices, Supreme Court and High Court decisions, NCW advisories, DPDP notifications, state circulars and CERT-In directions.

2 Assess

Counsel records whether a change affects a rule parameter, template, notice, duty, service, content page or training course.

3 Draft

Create a draft rule set or template version with an effective date and the legal source; link a watch item.

4 Test

Run the 40 scenarios and compare against the old version; review differences.

5 Approve

Two approvers (Legal Admin and independent counsel or Managing Partner).

6 Activate

Activate on the effective date; notify affected organisations in plain language; update public content and the knowledge base; update training.

7 Record

Record the change in the legal register; keep versions permanently.

30.10 SOP-12 complainant welfare contact

Moment

Contact and content

Within 1 working day of submission

Intake Counsellor calls or messages through the chosen safe channel to confirm receipt, explain steps, offer support options and ask about immediate safety and the need for interim relief

After each major event (notice issued, hearing scheduled, report issued)

Short content-free check-in; explanation of what happens next; offer to prepare for hearings

Aftercare at 30, 90 and 180 days

Ask about retaliation, work conditions and wellbeing; escalate any report as a retaliation case

Respondent welfare

A parallel neutral contact explains rights, timelines and fair-hearing options without accessing complainant information

Distress or risk indicators

The counsellor offers helplines (Tele-MANAS 14416 and others from the directory, to be verified) and escalates to the Presiding Officer for urgent protection

30.11 SOP-13 to SOP-22 summary controls


## SOP

Key controls

SOP-13 Data subject requests

Identity check; log; 30-day target; explain POSH confidentiality and legal-hold limits; decision recorded with reasons

SOP-14 Payments

Daily reconciliation; failed payment follow-up in 2 working days; refunds need reason and second approval over the threshold; GST records kept

SOP-15 Backup and DR

Daily backup check; quarterly restore; DR contact tree; communication templates ready

SOP-16 Access review

Export of all roles; manager and owner attest; removals within 2 working days; evidence stored

SOP-17 Vendors

Security questionnaire; contract with confidentiality and breach terms; India hosting preference; sub-processor list published to clients

SOP-18 Complaints about Acorn

Acknowledge in 2 working days; independent review by a partner not involved; response in 15 working days; record kept

SOP-19 External member panel

Conflict check against the organisation, parties and counsel; fee and independence declaration; rotation; training currency check

SOP-20 Content moderation

Two-step check for legal claims; no legal advice on public Q&A; anonymisation checklist; correction policy within 2 working days

SOP-21 Script approval

Business reason, privacy review, host allow-list, test on staging, approval by Admin, quarterly script review

SOP-22 Release

Checklist in Section 28.8; communication to organisations; rollback ready

31. Glossary

Term

Meaning

Acorn

Acorn Legal Consultants, the client


## API

Application Programming Interface, the server interface used by the front end

Audit log

Append-only record of who did what, when and from where

Break-glass

Emergency, time-limited and logged access outside normal permissions


## CMS

Content Management System


## CSP

Content Security Policy, a browser security control that restricts which scripts and resources can load


## CSRF

Cross-Site Request Forgery, an attack that tricks a logged-in user's browser into sending unwanted requests

DPDP Act

Digital Personal Data Protection Act, 2023 (India)


## GST / GSTIN

Goods and Services Tax / GST Identification Number


## HMAC

Hash-based Message Authentication Code, used to verify signatures


## IC

Internal Committee under the POSH Act


## LC

Local Committee constituted by the District Officer under the POSH Act


## JWT

JSON Web Token


## MERN

MongoDB, Express.js, React, Node.js


## MFA / TOTP

Multi-factor authentication / time-based one-time password

MoSCoW

Must, Should, Could, Won't: a prioritisation method


## OWASP

Open Worldwide Application Security Project, a source of security standards

POSH Act

Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013


## RBAC

Role-Based Access Control


## RPO / RTO

Recovery Point Objective (acceptable data loss) / Recovery Time Objective (acceptable downtime)


## SEO

Search Engine Optimisation


## SSR

Server-Side Rendering

Tenant

One client organisation whose data is logically isolated within the shared platform


## UAT

User Acceptance Testing


## WAF

Web Application Firewall


## WCAG

Web Content Accessibility Guidelines


## XSS

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


## DEK / KEK

Data Encryption Key / Key Encryption Key


## BNS

Bharatiya Nyaya Sanhita, 2023, which replaced the Indian Penal Code


## BSA

Bharatiya Sakshya Adhiniyam, 2023, which replaced the Indian Evidence Act


## BRSR

Business Responsibility and Sustainability Report required of top listed companies

Intake Counsellor

Trained Acorn staff role that helps complainants file, with case-limited, logged access

District Officer

Officer notified by the State under the POSH Act who constitutes the Local Committee and receives annual reports


## NCW

National Commission for Women

Blind index

Keyed hash of a normalised value that allows equality matching without decrypting or revealing the value

Crypto-erasure

Destroying an encryption key so that all copies of the data it protected, including backups, become unreadable

Content-free message

A notification that carries no case facts, names or conduct description, only a secure link

Legal Administrator

Acorn role that maintains statutory parameters, templates and legal content under dual approval

Appendix A: Notification and Email Template Catalogue

All templates use the Acorn brand, a plain-text alternative, and a footer with the confidentiality notice and contact details. No template for POSH contains complaint content.


## ID

Trigger

Recipient

Channel

Content notes


## N-01

New service request

Admin list

Email and real-time

Reference, name, category, subject, secure link


## N-02

Service request received

Requester

Email

Reference, expected response time, copy of submitted fields


## N-03

Admin reply to request

Requester

Email

Reply text and thread reference


## N-04

Request pending beyond threshold

Assigned admin

Email

Reminder with link


## N-05

New question

Admin list

Email and real-time

Reference, category, link


## N-06

Question answered

Asker

Email

Answer and disclaimer


## N-07

Payment success

Payer and admin

Email and real-time

Receipt PDF, amount, reference


## N-08

Payment failure spike

Super Admin, Finance

Email

Counts and time window


## N-09

Refund processed

Payer

Email

Amount and expected credit time


## N-10

Admin invite

New user

Email

Single-use setup link and MFA instructions


## N-11

Password reset

User

Email

Expiring link


## N-12

Suspicious login or lockout

User and Super Admin

Email

Time, device, location approximation


## N-13

Script changed or kill switch used

Super Admin

Email

Who changed what


## P-01

POSH complaint received

Complainant

Email or SMS

Case ID and generic acknowledgement


## P-02

POSH complaint received (alert)

Presiding Officer, POSH Admin

Email and real-time

Case ID and organisation only


## P-03

Notice available

Respondent or complainant

Email

Generic message to sign in; no case details


## P-04

Hearing scheduled or changed

Participants

Email

Date, time, mode, link through portal


## P-05

Deadline approaching (15, 7, 3, 1 days)

Presiding Officer, POSH Admin

Email and real-time

Case ID, deadline type, date


## P-06

Deadline breached

Presiding Officer, POSH Admin, Managing Partner (configurable)

Email and real-time

Case ID, deadline type


## P-07

IC tenure ending or vacancy

Organisation Admin, POSH Admin

Email

Member and date


## P-08

Report issued

Parties and employer

Email

Generic message to sign in


## P-09

Break-glass access used

Managing Partner and POSH Admin

Email

Who, when, reason, case ID


## P-10

Annual report due

Organisation Admin

Email

Period and link


## P-11

Training assigned or overdue

Employee, Organisation Admin

Email

Module name and due date

Appendix B: Legal and Professional-Conduct Checklist for the Website

This checklist is for Acorn's counsel to confirm. It is a prompt for review, not legal advice.

#

Check

Notes

Status

1

Advertising and solicitation rules applicable to advocates and legal consultancies (including Bar Council of India rules and recent directions) are reviewed; the site presents information, not solicitation

Applies to homepage copy, service descriptions, testimonials, awards, claims of expertise and calls to action

2

Standard disclaimer approved and shown in the footer and on forms

No lawyer-client relationship from browsing or submitting a form

3

Privacy Policy aligned with the IT Act and the DPDP Act and rules; grievance officer named

Includes sub-processors (Razorpay, email provider, hosting)

4

Terms of Use approved

Includes limitation of liability and governing law (courts at Kolkata, as Acorn prefers)

5

Cookie Policy and consent mechanism match the actual scripts used

Analytics and marketing scripts load only after consent

6

Refund and Cancellation Policy published for the payment gateway

Required by Razorpay for activation

7

Fee and GST disclosures clear on the payment page and receipts

GSTIN, SAC code and tax rate confirmed by accountant

8

No client names, case details or testimonials published without written consent and rule compliance

Applies to blog posts and landing pages

9

Confidentiality statements about data handling are accurate and not overstated

Do not promise absolute security

10

POSH landing page content reviewed for legal accuracy and currency

Statutory references, time limits and penalties

11

POSH templates, notices and report formats approved


## Section 8.8

12

Contracts with employer clients for the POSH service define roles (data fiduciary or processor), confidentiality, retention, liability and breach procedure

Master services agreement and data processing terms

13

Copyright and image licensing confirmed for all site content

Use licensed or original images only

14

Accessibility statement and contact for accessibility issues published

Optional but recommended

15

POSH service marketing reviewed for professional-conduct compliance (no guarantees of outcome, no comparative claims, no unsolicited outreach)

Applies to landing pages, emails and campaigns

16

Employer contract for the POSH service defines Acorn’s role in the inquiry (support only; IC remains the decision-maker) and avoids any conflict of interest

Independence of the Internal Committee

17

Statutory text, rule numbers and timelines in Section 8.10 and the rules engine verified against the current gazette and amendments

Quarterly review (Section 8.30)

18

Complaint portal privacy notice, confidentiality statement and consent text approved (Appendix E)

DPDP notice requirements: clear, separate, simple language, how to withdraw consent and how to complain

19

Data processing agreement with each employer client and with each sub-processor

Roles, security, breach, retention, return and deletion

20

Retention and deletion schedule approved, including litigation hold


## Section 26.10

21

Incident response and breach notification playbook approved (Data Protection Board, affected persons, CERT-In where applicable)


## Section 26.8 and Section 30

22

Accessibility and reasonable accommodation approach for complainants with disabilities approved

RPwD Act 2016 and WCAG 2.1 AA

23

Policy for minors, gender-neutral track and third-party respondents approved

Routing rules RT-09, RT-13, RT-05

24

Indemnity, limitation of liability and insurance (professional indemnity and cyber) reviewed for the POSH platform service

Commercial risk

End of document.

Appendix C. Statutory Reference and Sources Reviewed

This appendix lists the legal sources used to design the platform so counsel can verify each. It is a design aid, not legal advice. Items marked “verify” were not confirmed from an official text during preparation and must be checked by counsel before go-live.

C.1 Primary legislation and rules

Source

Relevance to the platform

Status

Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013

Definitions (Section 2), Internal Committee (Section 4), Local Committee (Sections 5 and 6), complaint (Section 9), conciliation (Section 10), inquiry (Section 11), interim relief (Section 12), report (Section 13), action (Sections 12 to 15), false complaints (Section 14), appeal (Section 18), confidentiality (Section 16), employer duties (Section 19), District Officer duties (Section 20), annual report (Section 21 and 22), penalties (Sections 26 and 27)

In force; counsel to confirm text

POSH Rules, 2013

Complaint format, timelines (7 days for copy, 10 days for reply, 10 days for report), conciliation, inquiry procedure, compensation, appeal

In force; rule numbers “verify”

Bharatiya Nyaya Sanhita, 2023

Sections 74 to 79 relating to sexual harassment, assault or force to outrage modesty, voyeurism, stalking and insult to modesty, used in the remedies map

In force; section mapping “verify”

Companies Act, 2013 and Companies (Accounts) Rules (as amended, including the Second Amendment Rules 2025 effective 14 July 2025)

Board report disclosures on Internal Committee compliance and complaint numbers

Counsel to confirm wording

Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025

Notice, consent, rights, breach intimation, retention; dates about 13 November 2026 (consent managers) and about 13 May 2027 (main obligations)

Phased; “verify”

Information Technology Act, 2000 and CERT-In directions of 2022

Incident reporting within 6 hours; log retention of 180 days

In force; “verify”

Goods and Services Tax law (CGST Act and rules)

Tax invoice, SAC code, credit notes, e-invoice thresholds

Counsel and accountant to confirm

Rights of Persons with Disabilities Act, 2016

Accessibility of services and accommodations in inquiry

In force

Industrial and labour codes and Shops and Establishments Acts of states

Applicability to employees, working days and holidays by state

State specific

Indian Evidence Act replacement (Bharatiya Sakshya Adhiniyam, 2023)

Electronic evidence handling; hash and custody design

In force; “verify”

C.2 Judicial and institutional developments

Source

Relevance

Status

Vishaka v State of Rajasthan (1997)

Origin of workplace guidelines; broad workplace and duty concepts

Settled

Medha Kotwal Lele v Union of India (2013)

Compliance monitoring and committee functioning

Settled

Aureliano Fernandes v State of Goa (2023)

Statutory compliance and training; orders to ensure committees exist

Reported; “verify”

Supreme Court order 12 May 2023 and later directions (22 October 2024 and 3 December 2024)

District Officers, Nodal Officers forwarding within 7 days, SHe-Box, legal helpline 15100, compliance reporting

Reported; “verify”

Kerala High Court (Kollam Bar Association matter) and Gauhati High Court decisions on conciliation (2026)

Scope of Internal Committee over bar associations and limits of conciliation

Reported; “verify”

Supreme Court, 20 January 2026 (Cdr Yogesh Mahla matter)

Procedural fairness and committee findings

Reported; “verify”

NCW advisory, June 2026

Annual POSH audit, website disclosures, SHe-Box registration, anti-retaliation steps

Reported; “verify”; binding force is D-26

SHe-Box portal (revamped August 2024)

Central complaint and monitoring portal; registration of Internal Committees

Operating

UGC (Prevention, Prohibition and Redressal of Sexual Harassment of Women Employees and Students in Higher Educational Institutions) Regulations, 2015

Educational sector overlay

In force

Tele-MANAS 14416

Mental health support listing in the directory

Operating; “verify”

C.3 Source verification protocol

Step

Rule

Evidence

Each statutory item in the rules console stores the official source link, the date checked and the reviewer.

Quality

Secondary news or commentary is never the only source for a rule parameter.

Re-check

Parameters are re-verified at each rule-set approval and at least every 6 months.

Conflicts

If counsel interprets a provision differently from this PRD, counsel’s written view prevails and the rule set records it.

Appendix D. Seed Data and Configuration Defaults

These defaults are loaded by the seed scripts on first deployment. Each can be changed through the admin or legal console except the ones marked fixed. Items marked “verify” are shown with a warning label in the interface until a named person verifies them (BR-060).

D.1 Roles and default permissions (summary)

Role

Key permissions

super_admin

All platform permissions; user and role management; settings; no case content access without break-glass

admin

Content, requests, Q&A, scripts approve, payments read, users except super_admin, dashboards

content_editor

Pages and posts write; media; no publish of scripts or payments

marketing_manager

Scripts write, SEO, blog publish, analytics views

support_executive

Requests read and write, Q&A moderate, tickets

finance

Payments read, refund within threshold, invoices, reconciliation

posh_admin

Organisations, committees metadata, case metadata, timers, service orders, break-glass request; no case content

legal_admin

Rule sets, templates, calendars, directory, retention approvals, legal hold; no case content by default

intake_counsellor

Assisted intake, welfare contact, assigned case content on the intake side only

service_manager

Services, plans, orders, subscriptions, delivery tasks

org_admin

Own organisation profile, branches, committees, roster, policies, compliance, training, billing; case metadata and anonymous counts

ic_presiding, ic_member, ic_external

Case content for assigned cases after undertaking and conflict clearance

counsel

Assigned case content for appeals and legal opinions

complainant, respondent

Own case view and actions through links and OTP

D.2 Default settings

Setting

Default

Weekly off

Sunday (organisation can add Saturday or other days)

Complaint period

3 months from the last incident, extendable by 3 months for reasons recorded

Copy of complaint to respondent

7 working days

Reply by respondent

10 working days

Inquiry completion

90 days

Report

10 days from completion of inquiry

Employer action

60 days from the report

Appeal period

90 days

Alert thresholds

50, 80 and 95 percent of the period and on breach

Draft expiry

30 days after the last edit

Access link validity

72 hours; OTP 10 minutes

Session

15 minutes idle; 8 hours absolute

Break-glass

Maximum 2 hours

Retention of POSH case files

8 years after closure

Minimum survey group size

5

Languages

English, Bengali, Hindi

Time zone

Asia/Kolkata

Quiz pass mark

70 percent with 3 attempts per 30 days

Training validity

12 months for employees; 12 months for IC members

Refund second approval threshold

INR 10,000 (configurable)

Support SLA

P1 first response 1 hour; P2 4 hours; P3 1 working day; P4 3 working days

D.3 Directory and helpline seed (all entries require verification before use)

Type

Entry

Notes

Central portal

SHe-Box (Ministry of Women and Child Development) online complaint and registration portal

verify current address

Women helpline

Women helpline 181 and the legal helpline 15100 reported in Supreme Court directions

verify numbers and hours

Emergency

Police 112

verify

Mental health

Tele-MANAS 14416

verify languages and hours

Legal aid

West Bengal State Legal Services Authority and District Legal Services Authorities (Kolkata and districts)

verify contacts

State commission

West Bengal Commission for Women

verify contacts

National commission

National Commission for Women (NCW) complaint channels

verify contacts

District Officer

District Officers designated under the POSH Act for each West Bengal district (list to be loaded from the state notification)

verify against current notification

Local Committee

Local Committee contacts by district

verify against current notification

Labour authorities

Labour department offices for industrial disputes

verify

Cyber crime

National cyber crime reporting portal and helpline 1930 for online harassment evidence

verify

Counselling

Partner counsellors and NGOs chosen by Acorn

to be named by Acorn

D.4 Service catalogue and plan seed

The service catalogue PS-01 to PS-43 and the plans Starter, Professional and Enterprise are defined in Section 8.12 and are loaded exactly as written there. Prices are placeholders that Acorn sets through decision D-21 before go-live.

D.5 Course seed

Code

Course

Audience

Duration


## TRN-101

POSH Act basics for employees

All employees

30 minutes


## TRN-102

Managers and supervisors: prevention and response

Managers

45 minutes


## TRN-103

Internal Committee member essentials

IC members

2 hours


## TRN-104

Presiding Officer masterclass: inquiry procedure and report writing

Presiding Officers

3 hours


## TRN-105

Respectful workplaces and bystander action

All employees

20 minutes


## TRN-106

Confidentiality and data handling for IC members and staff

IC members and staff

30 minutes


## TRN-107

Intake counselling: trauma-informed response

Counsellors

2 hours


## TRN-108

Remote and hybrid workplace harassment

All employees

25 minutes


## TRN-109

Sector module: education, healthcare, production units, public authorities

By sector

30 minutes

D.6 Holiday calendar seed

Central public holidays and West Bengal state holidays are loaded for the current and next year from official notifications, then verified by the Legal Admin. Organisations may add their own holidays; changes create a new calendar version (BR-068).

D.7 Initial content to be provided by Acorn

Content

Owner

Needed by

About Us, team profiles, service descriptions, FAQs, contact details

Acorn partners

Week 2

Eight starting blog articles and 20 starting Q&A entries

Content Lead and counsel

Week 4

Policy, notice and undertaking texts in English, Bengali, Hindi

Counsel and translator

Week 10

Template texts DOC-01 to DOC-38

Counsel

Week 12

Training content for TRN-101 to TRN-109

Acorn trainers

Week 16

Directory verification

Legal Admin

Week 20

Appendix E. Draft Microcopy and Notice Text

Draft wording for counsel and a native-language reviewer. The wording is trauma-informed and content-free where required. English is shown; Bengali and Hindi versions are produced from the approved English text. Placeholders appear in braces.

E.1 Complaint intake screens

Screen or element

Draft text

Start page headline

You can tell us what happened. You decide how much to share, and you can pause and return anytime.

Start page support

You can bring a person you trust. We can arrange an interpreter. If you need help right now, see support options at the bottom of this page.

Safety check

Is there anything that makes you feel unsafe at the moment? If yes, we can help you ask for interim protection.

Confidentiality notice

What you write here is confidential. Only the people who are legally responsible for your case can read it. We will not put the details of your case in emails, texts or calls.

Contact preference

How should we contact you? Tell us the safest way and the times that are suitable. We will not share this with your employer.

Time limit notice

The law normally asks for a complaint within 3 months of the last incident. It may be extended for good reasons. If it has been longer, you can still tell us. We will review the reasons.

Draft saved

Your draft is saved. You can finish it later within 30 days.

Declarations

I confirm that the information is true to the best of my knowledge. I understand how my information will be used and shared with the committee.

Submit success

Your complaint was submitted. Your reference is {caseRef}. We have sent you a copy. A counsellor will contact you within one working day, in the way you chose.

Routing result (Internal Committee)

Your complaint goes to the Internal Committee of {organisation}. You can ask for support or interim measures.

Routing result (Local Committee)

Your complaint will be forwarded to the Local Committee for {district}. This is required by the law for your situation. We will tell you the date and contact.

Late complaint

Your complaint is outside the usual period. Please add the reasons. The committee will decide whether to accept it.

E.2 Respondent communication

Screen or element

Draft text

Link page

A complaint has been made under the POSH law. You have the right to be heard, to see the complaint, to respond, and to bring a person to support you.

Notice of complaint (DOC)

You are asked to give your written reply within {10} working days of receiving this notice. Please do not contact the complainant or any witness about this matter. Any action against anyone for making a complaint or taking part in the inquiry is not allowed and may lead to action.

Reminder (content-free)

You have a pending item for a confidential matter. Please open your secure link: {link}. Do not forward this message.

E.3 Content-free notifications

Template

Text

P-01 to P-40 generic pattern (email)

Subject: Update on a confidential matter. Body: You have an update on {caseRef}. Please sign in with the secure link. Do not forward this message. If you did not expect it, contact {helpdeskContact}.

SMS pattern

Acorn Legal: you have a confidential update. Open: {shortLink} Valid {hours}h. Do not share.

Wrong person warning in every message

If this message reached you by mistake, please delete it and tell us at {contact}. Reading or sharing it may be a breach of confidentiality.

E.4 Interface warnings for organisation admins and IC members

Moment

Warning

Org admin opens a case list

You can see only the status and deadlines. Content is limited to the committee. Asking for details may harm the process and the people involved.

Ticket form

Do not include names or details of a complaint. If you need help on a case, write only the case number.

Document release

Check that the document hides names and facts that the other party must not see. A person who shares confidential details may face penalties.

Conflict declaration

Tell us if you know any party or witness, or have any interest in the matter. You will be replaced and this will not count against you.

Retaliation reminder (organisation)

No one may punish or pressure a person for making a complaint or helping an inquiry. Report any concern to the Presiding Officer.

E.5 Public website notices

Item

Draft text

Legal disclaimer (Q&A and blog)

This page gives general information and is not legal advice. For advice on your situation, request a consultation.

Cookie notice

We use necessary cookies to run this site. With your permission we also use analytics and marketing cookies. You can change your choice at any time.

Form consent

I agree that Acorn Legal Consultants may use my details to reply to this request. I have read the privacy notice.

Q&A submission note

Your question may be published without your name. Do not include details that can identify you or others.

Payment note

Payments are processed by Razorpay. We do not store your card details. You will receive a receipt by email.

E.6 Privacy notice (outline for counsel)

Heading

Content to include

Who we are

Acorn Legal Consultants, Kolkata, contact for privacy matters, grievance officer name and contact

What we collect

Contact details and request text from visitors; account details for portal users; payment details through the gateway; POSH case information from complainants, respondents and witnesses; device and log data

Why we use it

To reply to requests, deliver legal services, run the POSH inquiry process for employers, process payments, meet legal duties, secure the site and improve services

Legal basis and consent

Consent for site features and marketing; legitimate legal and employment uses permitted by the data protection law for case processing; separate consent for optional uses

Roles

Acorn as fiduciary for its own site and as processor for organisation clients, who decide the purpose for their employees’ case data as per the contract

Who we share with

The Internal or Local Committee for the case, the employer as needed for action, service providers (hosting, email, SMS, payment), authorities when required by law

How long we keep it

As per the retention schedule in Section 26.10, with reasons

Your rights

Access, correction, erasure, grievance redressal, nomination; limits for POSH records during legal retention and legal hold; how to request and the response time

Security

Encryption, access control, audit, incident process

Children

Not directed at persons under 18; guardian route for any complaint concerning a minor

Cookies and scripts

Categories and how to change them

Changes and versions

Version number, date and a way to see earlier versions

E.7 Security incident notice to a client (template N-SEC)

Subject: Important notice about a confidentiality matter. Body: On {date} we identified {short description of the event without any names or case content}. The matter affects {number} case record(s) of {organisation}. We have {containment steps}. We are assessing the impact and have informed {authorities where applicable}. Please speak to your Presiding Officer and use the secure line {contact} to discuss steps for people who may be affected. We will send a written update by {date}. This message does not contain details of any case.

