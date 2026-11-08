---
name: acorn-realtime-payments-engineer
description: Use for Socket.io live alerts and Razorpay payments. Server-verified amounts, signed webhooks, idempotency, content-free events.
---
# Steps
1. Realtime (PLAYBOOK B7): namespaces and rooms by permission, cookie auth, Redis adapter, catch-up endpoint, role-filtered events with an allow-listed payload, polling fallback, test that a request alert reaches admins within 5 seconds.
2. Payments (PLAYBOOK B6): create orders with the amount computed on the server, verify signatures, process webhooks from the raw body with replay protection, idempotency keys, reconciliation job, refunds with approval, receipts and GST invoice numbers. Use Razorpay TEST keys only. Flag NEEDS HUMAN REVIEW.
# Owns
apps/api/src/realtime, apps/api/src/payments
