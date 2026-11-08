# ACORN LEGAL CONSULTANTS: ACCESSIBILITY (WCAG 2.1 AA) AUDIT REPORT

**Audit Date:** 2026-11-08  
**Standards:** Web Content Accessibility Guidelines (WCAG) 2.1 Level AA  
**Auditor:** Acorn Accessibility Auditor (`acorn-accessibility-auditor`)

---

## 1. Color Contrast Matrix (Design Tokens)

All color pairings across public and admin interfaces meet or exceed WCAG 2.1 AA requirements (4.5:1 for body copy, 3.0:1 for large display titles and UI elements):

| Background | Foreground Token | Foreground Hex | Ratio | AA Status | Usage |
|---|---|---|---|---|---|
| Deep Navy (`#07101F`) | Ivory Text | `#FBF9F4` | 17.2:1 | **PASS** (AAA) | Hero headlines, dark cards |
| Deep Navy (`#07101F`) | Light Brass (`--brass-300`) | `#D9C29A` | 9.4:1 | **PASS** (AAA) | Subheadings, eyebrow badges |
| Deep Navy (`#07101F`) | Brand Brass (`--brass-500`)| `#B08D57` | 6.2:1 | **PASS** (AA) | Icons, hairline ticks, buttons |
| Deep Navy (`#07101F`) | Slate Muted | `#A0ABBA` | 7.8:1 | **PASS** (AAA) | Footer secondary text |
| Warm Ivory (`#FBF9F4`)| Deep Ink | `#1B1F27` | 15.1:1 | **PASS** (AAA) | Standard body text |
| Warm Ivory (`#FBF9F4`)| Dark Slate | `#4A5568` | 7.9:1 | **PASS** (AAA) | Secondary descriptions |
| Warm Ivory (`#FBF9F4`)| High-Contrast Brass (`--brass-700`)| `#8A6B3A` | 4.7:1 | **PASS** (AA) | Category tags, accent links |
| Warm Ivory (`#FBF9F4`)| Brand Blue | `#1F3864` | 9.1:1 | **PASS** (AAA) | Headings, active states |
| Stone (`#F1EEE7`)     | Deep Ink | `#1B1F27` | 14.3:1 | **PASS** (AAA) | Alternate section text |

---

## 2. Keyboard Navigation & Landmark Architecture

- **Semantic Landmarks:** `<header role="banner">`, `<main role="main">`, `<footer role="contentinfo">`, `<nav aria-label="...">` are properly designated across all page layouts.
- **Skip to Content:** Implemented for all keyboard users (`<a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>`).
- **Focus Rings:** Explicit 2px brass focus outline (`focus-visible:ring-2 focus-visible:ring-brass-500 focus-visible:ring-offset-2`) styled on all interactive elements.
- **Escape Key & Traps:** All dialogs and mobile menus trap focus when open and dismiss on `Escape`.

---

## 3. Forms & Touch Accessibility

- **Input Associations:** Every form field (`input`, `textarea`, `select`) in `/contact`, `/request-service`, `/posh/file`, and `/pay` has an explicit programmatic `<label htmlFor="...">`.
- **Error Feedback:** Errors use `aria-describedby` referencing error text containers and announce via `aria-live="polite"`.
- **Touch Target Dimensions:** All interactive buttons and mobile hamburger items are styled with minimum dimensions of 44px by 44px.
- **Reduced Motion:** Fully integrated via Tailwind's `motion-safe:` and `motion-reduce:transition-none` media query hooks.
