# Startup Landing Kit — Gemini CLI Instructions

This file contains instructions for Gemini CLI. Follow these steps to customize this
template for a user.

## Quick Start

1. Read `AGENTS.md` for full architecture and setup instructions
2. The same three setup paths apply: Quick, AI, and Pro
3. All content lives in `site.config.yaml`, design in `design.config.yaml`
4. Pick the right template from `templates/` before editing `site.config.yaml`

## Template Selection

| Startup type | Use this template |
|---|---|
| SaaS / software | `site.config.yaml` (default) |
| Hardware / physical product | `templates/hardware.config.yaml` |
| Nonprofit / impact | `templates/impact.config.yaml` |
| Biotech / science | `templates/biotech.config.yaml` |
| Pre-launch waitlist | `templates/waitlist.config.yaml` |
| Partnership / reseller | `templates/partnership.config.yaml` |

Copy the chosen template to `site.config.yaml`, then fill in the user's content.

## Gemini-Specific Notes

- Use `@site.config.yaml` to reference the config file
- Use `@design.config.yaml` for design customization
- The template uses Astro 5 with static output — no React needed
- All components are `.astro` files (HTML with frontmatter)
- Run `npm run geo-check` after any content changes to verify GEO score
- `contactForm` in the config replaces the waitlist form; set `hero.primaryCtaLink`
  and `finalCta.ctaTarget` to `#contact` when using it
- Homepage (`/`) is the template gallery. Each template has a live demo at `/templates/{slug}`
- Dark mode toggle (sun/moon) in the header, with localStorage persistence

## Key Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run geo-check    # Verify GEO optimization score
npm run verify-deploy -- --url <URL>  # Verify deployment
```

## For Detailed Instructions

See `AGENTS.md` — it contains the complete setup flow, architecture overview,
config schemas, template library reference, and post-deploy checklist.
