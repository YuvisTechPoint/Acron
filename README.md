# Acorn Legal Consultants & Statutory POSH Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-100%25%20Passing-success?style=flat)](https://github.com/YuvisTechPoint/Acron)
[![Statutory Compliance](https://img.shields.io/badge/POSH%20Act%202013-Statutory%20Compliant-navy?style=flat)](#statutory-posh-rules-engine)

> **Excellence in Law. Integrity in Practice.**  
> *Where Legal Expertise Meets Strategic Excellence.*

Acorn Legal Consultants is a premier legal consultancy and statutory advisory platform headquartered in Kolkata, delivering strategic corporate structuring, commercial dispute resolution, contractual governance, and institutional integrity management.

The platform combines an editorial, high-trust digital presence with an enterprise-grade statutory governance engine specifically architected for the **Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act)**, strict **Bar Council of India** regulatory standards, and end-to-end cryptographic confidentiality.

---

## Table of Contents

- [Key Architecture & Features](#key-architecture--features)
  - [1. Classical Legal Chamber Experience](#1-classical-legal-chamber-experience)
  - [2. Statutory POSH Rules Engine](#2-statutory-posh-rules-engine)
  - [3. Cryptographic Narrative Vault & Audit Trail](#3-cryptographic-narrative-vault--audit-trail)
  - [4. Dense Professional Consoles](#4-dense-professional-consoles)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Standalone Production Build](#standalone-production-build)
- [Verification & Test Suites](#verification--test-suites)
  - [Authoritative Test Execution](#authoritative-test-execution)
  - [Test Suite Breakdown](#test-suite-breakdown)
- [Security & Compliance Framework](#security--compliance-framework)
- [License & Chambers Attributions](#license--chambers-attributions)

---

## Key Architecture & Features

### 1. Classical Legal Chamber Experience
- **Editorial Blue-and-Ivory Design System**: Built strictly adhering to `docs/DESIGN_SYSTEM.md`, utilizing semantic CSS tokens, refined serif typography, and balanced spacing.
- **Classical Chambers Directory**: Full-screen interactive Practice Directory and Services Mega-menu featuring categorized scopes, key deliverables, and direct intake channels.
- **Bar Council Compliance**: Fully compliant with Bar Council of India guidelines—zero ostentatious marketing, zero fabricated testimonials, zero guarantee language, and permanent legal disclaimers.

### 2. Statutory POSH Rules Engine
- **Strict Limitation Monitoring (Section 9(1))**: Automatic categorization into *Within Limitation* (<= 90 days), *Requires Condonation* (91–180 days with recorded justification), or *Statutorily Barred* (> 180 days).
- **Absolute Conciliation Monetary Bar (Section 10(1))**: Programmatic prevention of financial settlements, severance packages, or monetary consideration during statutory conciliation proceedings.
- **Small-Cell Cohort Suppression**: Preservation of statistical anonymity by suppressing cohort cell counts below 5 ($k < 5$) in public and organizational transparency reports.
- **Quorum Validation (Section 4)**: Enforced meeting validity requiring a minimum of three attendees, mandatory presence of the Presiding Officer, and at least 50% women representation.

### 3. Cryptographic Narrative Vault & Audit Trail
- **AES-256-GCM Digital Sealing**: Sensitive case statements, evidence exhibits, and depositions are encrypted at rest with Galois/Counter Mode authentication tags.
- **Append-Only SHA-256 Hash Chain**: Immutable audit ledger with forward cryptographic linking preventing ledger deletion, retroactive backdating, or tampering.
- **Section 16 PII Scrubber**: Automatic redaction of Aadhaar numbers, PAN, telephone contacts, personal email addresses, and respondent/complainant identifiers across public feeds and client portals.
- **Constitution Rule 3 Notification Linter**: Real-time event payloads and outbound notifications are strictly content-free (carrying only abstract docket codes and operational timestamps).

### 4. Dense Professional Consoles
- **Staff Admin Console (`/admin`)**: Operations command center for intake triage, matter assignments, revenue/payment tracking, and dynamic legal rules management.
- **Employer Organization Portal (`/posh/org`)**: Corporate hub for policy deployment, employee training completion tracking, IC committee tenure monitoring, and statutory annual reporting under Section 21.
- **Internal Committee Workspace (`/posh/ic`)**: Dedicated investigative workbench for managing notice generation, witness hearings, evidence vaults, findings matrix, and Section 13 report generation.
- **Public Credential Verification (`/verify/[code]`)**: Dynamic cryptographic certificate verification gateway validating corporate training badges and compliance seals.

---

## Project Structure

```
├── data/
│   └── acorn-database.json        # Unified persistent database schema & seed records
├── docs/
│   ├── DESIGN_SYSTEM.md           # Visual language, tokens, and typographic scale
│   ├── PRD.md                     # Platform specification and statutory rule index
│   └── DEPLOYMENT_RUNBOOK.md      # Zero-downtime deployment and operational runbook
├── public/                        # Static assets, seals, and typography
├── scripts/
│   ├── patch-next.js              # Standalone Next.js engine & loader patch hooks
│   ├── copy-standalone.mjs        # Production asset bundler for standalone build
│   ├── test-unit.mjs              # Unit tests (Crypto vault, rules engine, access control)
│   ├── test-admin-realtime.mjs    # Admin console & SSE real-time E2E verification
│   ├── test-workflows.mjs         # Client intake, payments, and IC investigative workflows
│   └── verify-all.mjs             # 139-route crawler & 120 internal link verification
├── src/
│   ├── app/                       # Next.js 14 App Router routes & API endpoints
│   ├── components/                # Reusable UI components, navigation, and modal systems
│   └── lib/                       # Types, session auth, cryptographic utilities, and store
├── package.json                   # Scripts, dependencies, and build hooks
└── tailwind.config.ts             # Tailwind configuration wired to design system tokens
```

---

## Getting Started

### Prerequisites
- **Node.js**: `v18.18.0` or higher (`v20+` or `v22+` recommended)
- **npm**: `v9+` or `v10+`

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/YuvisTechPoint/Acron.git
cd Acron
npm install
```
*(The `postinstall` hook will automatically execute `node scripts/patch-next.js` to ensure Next.js App Router and font loader patches are ready).*

### Running the Development Server
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Standalone Production Build
Compile the optimized production build and dock all standalone assets:
```bash
npm run build
```
Launch the self-contained standalone server:
```bash
npm run start:standalone
```
The application will run on port `3000` with zero external build dependencies.

---

## Verification & Test Suites

The platform includes a test suite covering cryptography, statutory business logic, role-based access control, edge session security, and full route crawling.

### Authoritative Test Execution
Run the full verification suite:
```bash
npm run test
```

### Test Suite Breakdown

| Command | Suite | Focus Areas |
| :--- | :--- | :--- |
| `npm run test:unit` | **Unit Test Suite** | AES-256-GCM vault, tamper detection, SHA-256 audit chain, Section 9/10/11 rules engine, `canAccessCase` server checks, and Rule 3 PII notification linter. |
| `npm run test:admin` | **Admin & Real-Time E2E** | Edge authentication middleware, TOTP two-factor security, multi-counsel login, cookie revocation, and bidirectional API sync across all 11 admin modules. |
| `npm run test:workflows` | **Interactive Workflows** | Client intake, public inquiries, POSH matter registration, Section 16 masking, Razorpay order verification, and dynamic certificate verification. |
| `npm run test:verify` | **Route & Link Crawler** | Exhaustive crawler verifying **139 primary routes** (HTTP 200 OK) and **120 discovered internal links** with 0 broken routes. |
| `npm run typecheck` | **TypeScript Gate** | `tsc --noEmit` validation across 100% of application source code with 0 errors. |
| `npm run lint` | **ESLint Gate** | Next.js and React code quality and hook compliance. |

---

## Security & Compliance Framework

1. **Server-Enforced Access Control**: Access to sensitive case files is authenticated and authorized strictly on the server via `canAccessCase`. UI button suppression is never treated as security.
2. **Multi-Tenant Data Isolation**: Every case docket, policy, and inquiry record is strictly scoped by `orgId`. Cross-tenant queries are blocked and audited.
3. **Zero Real Data in Non-Production**: All test, seed, and crawler data consists exclusively of synthetic fixtures.
4. **Resilient Secret Handling**: Production secrets and encryption keys are consumed strictly via runtime environment variables and are never committed to version control.

---

## License & Chambers Attributions

Copyright &copy; 2026 Acorn Legal Consultants. All rights reserved.  
Confidential privileged legal technology platform.
