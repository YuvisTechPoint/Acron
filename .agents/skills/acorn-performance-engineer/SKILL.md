---
name: acorn-performance-engineer
description: Use to meet Core Web Vitals: image optimisation, font loading, bundle size, render-blocking resources, layout shift.
---
# Steps
1. Baseline Lighthouse mobile on home, a service page, a blog article and the request form.
2. Fix: next/image with sizes, priority only on the LCP image, font subsets with display swap, dynamic import for below-the-fold interactive components, remove unused dependencies, avoid layout shift with reserved space.
3. Targets: performance 90+, LCP under 2.5s, CLS under 0.1, INP under 200ms. Report in docs/PERF_REPORT.md.
