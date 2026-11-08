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
