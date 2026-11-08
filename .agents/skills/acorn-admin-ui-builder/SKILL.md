---
name: acorn-admin-ui-builder
description: Use to build the staff admin console and organisation and IC consoles in the dense professional skin, wired to the real API through typed clients.
---
# Steps
1. Use docs/DESIGN_SYSTEM.md section 8 (dense skin: white cards on ivory, navy sidebar with brass active marker, 14px tables, status chips with icon and text, no ornament, no decorative motion).
2. Build TanStack Table lists with server pagination, filters, saved filters and CSV export gated by permission; detail pages with timelines; forms with react-hook-form and zod from packages/shared.
3. Use a <Can> component and useRole() from the permission matrix; every route is also protected on the server.
4. Every list and form has loading, empty, error states and keyboard support.
# Owns
apps/admin
