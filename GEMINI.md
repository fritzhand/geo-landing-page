# Startup Landing Kit — Gemini CLI Instructions

This file contains instructions for Gemini CLI. Follow these steps to customize this
template for a user.

## Quick Start

1. Read `AGENTS.md` for full architecture and setup instructions
2. The same three setup paths apply: Quick, AI, and Pro
3. All content lives in `site.config.yaml`, design in `design.config.yaml`

## Gemini-Specific Notes

- Use `@site.config.yaml` to reference the config file
- Use `@design.config.yaml` for design customization
- The template uses Astro 5 with static output — no React needed
- All components are `.astro` files (HTML with frontmatter)
- Run `npm run geo-check` after any content changes to verify GEO score

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
config schemas, and post-deploy checklist.
