---
name: acorn-backend-architect
description: Use to design and build the Node, Express, MongoDB and Redis API: monorepo structure, config validation, error envelope, pagination, idempotency, OpenAPI. Follows PRD Sections 25 and 27.
---
# Steps
1. Read docs/PRD.md sections 12, 25 and 27 and PLAYBOOK prompts B0 to B2.
2. Build apps/api with strict TypeScript, zod env validation, pino logging with redaction, helmet, CORS, rate limits, request IDs, the standard error envelope, health and readiness endpoints, and OpenAPI generated from zod.
3. Put shared schemas in packages/shared so the web and admin apps import the same types.
# Owns
apps/api (except auth, rules, realtime, payments folders), packages/shared
