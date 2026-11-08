# ACORN LEGAL CONSULTANTS: DESIGN SYSTEM ("QUIET AUTHORITY")

## 1. Visual Philosophy & Brand Ethos
The "Quiet Authority" design system represents excellence, calm institutional trust, and editorial precision. Tailored specifically for Acorn Legal Consultants (High Court Calcutta jurisdiction & Pan-India corporate advisory), the visual language avoids generic corporate cliches, noisy animations, and aggressive sales patterns.

- **Primary Brand Line:** "Excellence in Law. Integrity in Practice."
- **Secondary Descriptor:** "Where Legal Expertise Meets Strategic Excellence."
- **Atmosphere:** Deep navy, warm ivory, architectural hairline rules, single brass italic accent words, and understated typography.

---

## 2. Color Palette & Token System

### A. Core Neutral & Dark Tones
| Token | Hex Value | Semantic Role |
|---|---|---|
| `--ink-950` / `bg-ink-950` | `#07101F` | Deepest navy; used for hero sections, global footer, and dark modals |
| `--navy-900` / `bg-navy-900` | `#0E1F3D` | Surface elevation 1 in dark mode, card backings |
| `--navy-800` / `bg-navy-800` | `#14264A` | Secondary dark surface, dark borders |
| `--navy-700` / `bg-navy-700` | `#1F3864` | Primary brand blue; primary CTA button background |
| `--blue-600` / `text-blue-600` | `#2F5496` | Hover state for interactive text and links |
| `--blue-100` / `bg-blue-100` | `#E4ECF8` | Subtle tint for active items and badges |

### B. Warm Light Surfaces
| Token | Hex Value | Semantic Role |
|---|---|---|
| `--ivory-50` / `bg-ivory-50` | `#FBF9F4` | Default warm page surface (replaces sterile pure white) |
| `--stone-100` / `bg-stone-100`| `#F1EEE7` | Alternating section background for editorial rhythm |
| `--white` / `bg-white` | `#FFFFFF` | Form input backgrounds, elevated cards on ivory |

### C. Brass Accents
| Token | Hex Value | Semantic Role | Contrast (AA) |
|---|---|---|---|
| `--brass-300` | `#D9C29A` | Light gold highlight, borders on dark ink-950 backgrounds | Meets 4.5:1 on #07101F |
| `--brass-400` | `#C59A58` | Hover accent, active navigation markers | Meets 3.5:1 graphical |
| `--brass-500` | `#B08D57` | Primary brand brass accent, icons, divider ticks | Meets 4.8:1 on #07101F |
| `--brass-700` | `#8A6B3A` | High-contrast brass for text on light ivory backgrounds | Meets 4.7:1 on #FBF9F4 |

### D. Status & Regulatory Tones
- **Success:** `#1E7B4F` (Forest green; safe, confirmed)
- **Warning:** `#B7791F` (Muted amber; pending action)
- **Danger / Alert:** `#B42318` (Muted crimson; errors, critical disclosures)
- **Info:** `#1F5FA8` (Slate blue; guidance, neutral notes)

---

## 3. Typography Architecture

### A. Font Families
- **Display & Headings:** `Cormorant Garamond` (Serif, weights: 400, 500, 600, 700 with Italic)
- **Body & Interface:** `Inter` (Sans-serif, weights: 400, 500, 600, 700)
- **Numeric & Reference Data:** Inter with tabular figures (`font-variant-numeric: tabular-nums`) for case numbers, statutory timelines, and currency amounts.

### B. Hierarchy & Fluid Scale
- **Display 1 (Hero Title):** `clamp(2.75rem, 6vw, 4.5rem)` / line-height: 1.1 / tracking: -0.02em
- **H1 (Page Title):** `clamp(2.25rem, 4.5vw, 3.25rem)` / line-height: 1.15
- **H2 (Section Header):** `clamp(1.75rem, 3.5vw, 2.5rem)` / line-height: 1.25
- **H3 (Card & Sub-heading):** `1.25rem - 1.5rem` / line-height: 1.35
- **Eyebrow / Category Tag:** `11px - 12px` / uppercase / tracking: 0.18em / font-semibold / brass-700 or brass-300
- **Body Large:** `18px` / line-height: 1.7 / text-slate-700
- **Body Standard:** `16px - 17px` / line-height: 1.65 / text-slate-700
- **Body Small / Captions:** `13px - 14px` / line-height: 1.5
- **Legal Footnotes:** `11px - 12px` / text-slate-500

---

## 4. Signature Editorial Devices

1. **The Single Italic Brass Accent Word:** In primary section titles, exactly one high-impact word is rendered in serif italic brass (e.g., "Excellence in Law. *Integrity* in Practice.").
2. **Hairline Rules with Brass Ticks:** Section dividers feature a 1px rule (`border-navy-200` or `border-navy-800`) punctuated by a central or left-aligned 4px brass marker.
3. **Roman Arch Imagery:** Images illustrating practice areas, chambers, and heritage use an architectural top-radius arch curve (`rounded-t-[80px] sm:rounded-t-[120px]`).
4. **Outlined Section Numerals:** Sections feature faint Roman numerals or two-digit identifiers (`01`, `02`, `03`) set in large Cormorant Garamond outline or low opacity.
5. **Subtle Paper Grain:** Micro-texture overlay (`opacity-[0.025]`) to impart tactile gravitas without compromising performance.

---

## 5. Interaction & Calm Mode Specifications

### A. POSH & Sensitive Portals ("Calm Mode")
- Motion is strictly limited to 200ms opacity fades (`transition-opacity duration-200`).
- No pulsing badges, urgent countdowns, or red error flashes that cause emotional agitation.
- Emergency "Quick Exit" button present in fixed upper-right header to instantly redirect to a neutral portal (e.g. weather or news).
- Browser tab title reflects neutral branding ("Acorn Advisory") rather than complaint details.

### B. Admin & Legal Console ("Dense Professional Skin")
- Tables styled with tight vertical padding (py-2.5), 13-14px tabular numbers, explicit column sorting indicators.
- Persistent navy sidebar (`#0A1424`) with brass active indicators and icon badges.
- Strict server-side permission checks with `<Can>` rendering gates.

---

## 6. Accessibility Compliance (WCAG 2.1 AA)

- All text pairings exceed the 4.5:1 contrast requirement (3.0:1 for large display titles).
- Focus rings are explicitly styled: `focus-visible:ring-2 focus-visible:ring-brass-500 focus-visible:ring-offset-2`.
- Form inputs include persistent programmatic labels, error descriptions tied via `aria-describedby`, and required asterisks.
- Support for `prefers-reduced-motion`: all CSS transitions collapse to static renders when reduced motion is detected.
- Touch targets on all buttons and mobile links measure 44px by 44px minimum.
