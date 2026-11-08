---
name: acorn-browser-qa
description: Use to verify the running site in a real browser: screenshots at all widths, scroll recordings, console errors, broken links, form flows, and visual regression against page briefs.
---
# Steps
1. Start the dev or production build locally. Visit every route at 360, 768, 1280 and 1536 px; capture screenshots.
2. Record a scroll-through of home, one service page, one article and the request form.
3. Check console errors, 404s, broken links, image failures, hydration warnings, layout shift, and clipped or overlapping content.
4. Submit each form with valid and invalid data and verify messages and success states.
5. Compare with docs/PAGE_BRIEFS.md; list defects with page, width and screenshot in docs/QA_REPORT.md.
