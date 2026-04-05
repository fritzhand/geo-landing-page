# Design System — Startup Landing Kit

## Product Context
- **What this is:** Open-source, GEO-optimized landing page template for startups
- **Who it's for:** Startup founders (technical and non-technical) who want to ship a professional landing page fast
- **Space/industry:** Developer tools, open source templates, startup infrastructure
- **Project type:** Marketing/landing page template

## Aesthetic Direction
- **Direction:** Editorial/Magazine meets confident geometric. Premium without being precious.
- **Decoration level:** Intentional. Accent-tinted section backgrounds, dark CTA sections, no decorative blobs or gradients.
- **Mood:** Confident, editorial, trustworthy. Like a well-designed pitch deck. Stripe energy, not Bootstrap.
- **Reference sites:** stripe.com, linear.app, vercel.com

## Typography
- **Display/Hero:** Cabinet Grotesk (800 weight) — geometric, confident, not generic. Loaded from Fontshare.
- **Headings:** Cabinet Grotesk (700 weight) — same family, slightly lighter for H2/H3.
- **Body:** DM Sans (400/500) — clean, readable, modern. Not Inter/Roboto.
- **UI/Labels:** DM Sans (500/600)
- **Data/Tables:** Geist Mono (tabular-nums) — technical credibility
- **Code:** Geist Mono
- **Loading:** Cabinet Grotesk from api.fontshare.com, DM Sans from Google Fonts
- **Scale (major third, 1.25):**
  - xs: 12px (labels, badges)
  - sm: 14px (small body, captions)
  - base: 16px (body text)
  - lg: 20px (large body, subheadlines)
  - xl: 24px (H3, section subheads)
  - 2xl: 32px (H3 display)
  - 3xl: 48px (H2, section headings)
  - 4xl: 72px (H1, hero headline)
- **Letter-spacing:** -0.03em at 72px, -0.02em at 48px, 0 at body sizes

## Color
- **Approach:** Restrained with accent. Color is meaningful, not decorative.
- **Primary text:** #0A0A0B (near-black, not pure black — warmer, more premium)
- **Accent:** #2563EB (blue-600 — trust signal for startups, earned not defaulted)
- **Accent hover:** #1D4ED8 (blue-700)
- **Accent light:** #EFF6FF (blue-50 — section background tint)
- **Surface:** #FAFAFA (warm white)
- **Surface alt:** #F4F4F5 (zinc-100)
- **Muted text:** #71717A (zinc-500)
- **Border:** #E4E4E7 (zinc-200)
- **Background:** #FFFFFF
- **Semantic:**
  - Success: #16A34A (green-600)
  - Warning: #D97706 (amber-600)
  - Error: #DC2626 (red-600)
  - Info: #2563EB (same as accent)
- **Dark mode strategy:** Surface inversion, reduce saturation 10%.
  - Background: #09090B
  - Surface: #18181B
  - Surface alt: #27272A
  - Primary text: #FAFAFA
  - Muted text: #A1A1AA
  - Border: #3F3F46
  - Accent: #3B82F6 (blue-500, slightly lighter for dark backgrounds)
  - Accent light: #172554 (blue-950)

## Spacing
- **Base unit:** 4px
- **Density:** Comfortable
- **Scale:** 2xs(2px) xs(4px) sm(8px) md(16px) lg(24px) xl(32px) 2xl(48px) 3xl(64px) 4xl(96px)
- **Section padding:** 96px desktop / 64px mobile
- **Container max-width:** 1200px
- **Container padding:** 24px

## Layout
- **Approach:** Asymmetric editorial. NOT centered-everything.
- **Hero:** Left-aligned text (1.1fr) + product visual (0.9fr). Text-first on mobile.
- **Transformation:** Asymmetric grid (1.2fr steps + 0.8fr metrics)
- **Sections:** Vary visual rhythm. Alternate: white bg, accent-tinted bg, white bg, dark bg for CTA.
- **Grid columns:** 1 (mobile) / 2 (tablet) / 3 (desktop, pricing only)

## Border & Shadow
- **Border-radius:** sm(6px), md(8px), lg(12px), full(9999px for badges)
- **Border:** 1px solid var(--color-border). Cards use border, NOT shadow.
- **Shadow:** Only on hover: `0 8px 24px rgba(0,0,0,0.06)`. No static shadows.
- **Policy:** Minimal. Premium = restraint. The page must feel premium with ALL shadows removed.

## Motion
- **Approach:** Intentional — motion serves hierarchy, not decoration
- **Scroll entrance:** Fade-up, 200ms ease-out, 50px travel, staggered 100ms between siblings
- **Hover (cards):** translateY(-4px) + shadow, 150ms ease
- **Hover (buttons):** translateY(-2px) + colored shadow, 150ms ease
- **Focus:** Ring with accent color, 3px spread, 0.1 opacity
- **Duration:** micro(100ms) short(150ms) medium(200ms) long(300ms)
- **Easing:** enter(ease-out) exit(ease-in) move(ease-in-out)
- **Reduced motion:** All animations disabled via `prefers-reduced-motion: reduce`
- **Dark mode:** `prefers-color-scheme` only, instant swap (no transition on theme change body colors transition 300ms)

## Anti-Slop Rules
- NO 3-column feature grids with icons in colored circles
- NO centered-everything layouts
- NO purple/violet gradients
- NO uniform border-radius on all elements
- NO decorative blobs, floating circles, or wavy SVG dividers
- NO Inter, Roboto, Arial, or system font stacks as primary
- Transformation section renders as asymmetric layout, not symmetric grid
- Each section has ONE job (labeled in the architecture)
- "If deleting 30% of the copy improves it, keep deleting"

## Theme Presets
The default design system above is the SaaS theme. Three additional presets override colors, typography weight, and aesthetic details:

### Dev Tool Theme
- Accent: #10B981 (emerald-500, terminal green)
- Background: #0A0A0B (dark by default)
- Display font: Cabinet Grotesk (same family, 700 weight)
- Body font: DM Sans
- Code/mono: Geist Mono (more prominent usage, inline code blocks)
- Aesthetic: darker, more technical, monospace accents in labels

### Consumer Theme
- Accent: #F97316 (orange-500, warm and energetic)
- Border-radius: sm(8px), md(12px), lg(16px) (rounder, friendlier)
- Display font: Cabinet Grotesk (same, 700 weight)
- Spacing density: Spacious (section padding: 112px desktop)
- Aesthetic: warmer neutrals, more generous whitespace, slightly playful

### B2B Enterprise Theme
- Accent: #0F172A (slate-900, conservative navy)
- Secondary accent: #2563EB (blue-600, used sparingly)
- Display font: Cabinet Grotesk (same, 700 weight)
- Spacing density: Comfortable (same as default)
- Aesthetic: more restrained, fewer animations, trust-heavy, data-oriented metrics

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-05 | Cabinet Grotesk + DM Sans typography | Geometric confidence for headlines, clean readability for body. Not Inter/Roboto. |
| 2026-04-05 | Near-black #0A0A0B over pure black | Warmer, more premium feel. Higher perceived quality. |
| 2026-04-05 | Borders over shadows | Restraint = premium. Page must feel premium with shadows removed. |
| 2026-04-05 | Asymmetric hero layout | Left-aligned breaks from centered-everything template norm. |
| 2026-04-05 | Accent-tinted + dark CTA section backgrounds | Visual rhythm variation. Each section feels distinct. |
| 2026-04-05 | 72px hero headline | Oversized typography signals editorial confidence. |
