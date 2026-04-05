# Startup Landing Kit — AI Agent Instructions

This file contains instructions for AI coding tools (Codex CLI, Antigravity, or any
agent that reads AGENTS.md). Follow these steps to customize this template for a user.

## Overview

This is a GEO-optimized (Generative Engine Optimization) landing page template built
with Astro 5. It generates static HTML that is optimized for citation by AI search
engines (ChatGPT, Perplexity, Gemini, Google AI Overviews) while maintaining perfect
traditional SEO scores.

## Architecture

- **Framework:** Astro 5 (static HTML output)
- **Styling:** Tailwind CSS v4 + CSS custom properties
- **Deployment:** Vercel (static + one API route for waitlist form)
- **Config:** Two YAML files drive all content and design

## Setup Paths

### Quick Path (Power Users)
1. Edit `site.config.yaml` with your startup's content
2. Optionally edit `design.config.yaml` for colors/fonts
3. Run `npm install && npm run dev` to preview
4. Run `npm run geo-check` to verify GEO score
5. Deploy: `npx vercel` or connect GitHub repo to Vercel

### AI Path (Recommended)
1. Ask the user about their startup:
   - What is the product/company name?
   - What does it do in one sentence?
   - Who is the target audience?
   - What are the top 3-4 features/benefits?
   - What pricing model? (free, freemium, paid)
   - Any existing brand colors or design preferences?
2. Generate `site.config.yaml` from their answers
3. Generate `design.config.yaml` if they have design preferences
4. Run `npm run dev` and ask user to preview
5. Run `npm run geo-check` to verify GEO score
6. Help deploy to Vercel

### Pro Path (Best Results)
1. Create a PRD document about the startup
2. Create a `DESIGN.md` design system document
3. Use the PRD + DESIGN.md to generate both config files
4. Customize Astro components if needed
5. Preview, GEO check, deploy

## Config Files

### site.config.yaml
All content lives here: company name, headlines, features, FAQ, pricing, etc.
See the file for the full schema with comments.

### design.config.yaml
Visual customization: colors, fonts, spacing, card style, hero layout.
If this file is missing, sensible defaults are used.

## Key Files
- `src/pages/index.astro` — Main landing page
- `src/components/` — All section components
- `src/lib/config.ts` — Config loading + Zod validation
- `src/lib/schema.ts` — Schema.org JSON-LD generation
- `src/lib/llms.ts` — llms.txt generation
- `src/pages/api/waitlist.ts` — Waitlist form API route
- `scripts/geo-check.ts` — GEO verification (0-100 score)
- `scripts/verify-deploy.ts` — Post-deploy verification

## Waitlist Form

The form at `#waitlist` uses progressive enhancement:
- Without JS: Standard form POST to `/api/waitlist`, redirects to `/thank-you`
- With JS: Inline validation, async submit, inline success/error messages

Providers (set in `site.config.yaml` under `waitlist.provider`):
- `mock` — Logs to console (default, for development)
- `resend` — Sends confirmation email via Resend API (set `RESEND_API_KEY`)
- `sheets` — Appends row to Google Sheet via App Script webhook (set `SHEETS_WEBHOOK_URL`)

## GEO Optimization

This template is structurally optimized for AI citation. Key signals:
1. **First 200 words** directly answer "What is [company]?"
2. **Schema.org JSON-LD** (Organization, FAQPage, WebSite, SoftwareApplication)
3. **llms.txt** at `/llms.txt` for AI system discovery
4. **robots.txt** explicitly allows AI crawlers
5. **FAQ with microdata** (Schema.org Question/Answer markup)
6. **Semantic HTML5** (main, section, aria-labels, heading hierarchy)
7. **Content-first HTML order** (no decorative elements before core message)

## Post-Deploy

After deploying, remind the user to:
1. Replace the default OG image (`public/placeholders/og.png`) with their own (1200x630)
2. Update `meta.url` in `site.config.yaml` with their production URL
3. Update the `Sitemap` URL in `public/robots.txt`
4. Run `npm run verify-deploy -- --url https://their-site.com`
