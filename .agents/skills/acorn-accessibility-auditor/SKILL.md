---
name: acorn-accessibility-auditor
description: Use to audit and fix WCAG 2.1 AA: contrast, keyboard use, focus, landmarks, forms, reduced motion, touch targets.
---
# Steps
1. Run an automated check (axe) per route plus a manual keyboard pass: skip link, header and mega-menu, forms, accordion, drawer, dialogs (focus trap and Escape).
2. Verify every token colour pairing meets AA with a script; fix tokens, not components.
3. Check 44px touch targets, visible focus (3px ring), aria-live for form results, labels, error association, and prefers-reduced-motion.
4. Write docs/A11Y_REPORT.md with before and after results.
