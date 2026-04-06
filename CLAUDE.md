# Startup Landing Kit

## Project Status
GEO-optimized Astro 5 landing page template. v2 is the current version.

Key artifacts:
- Design system: `DESIGN.md` (in repo root)
- Config: `site.config.yaml` (content) + `design.config.yaml` (visuals)
- Templates: `templates/` folder — 5 drop-in config files for different startup types

## Architecture
- Astro 5 with static output + two server API routes (waitlist form, contact form)
- Tailwind CSS v4 via `@tailwindcss/vite`
- Vercel adapter for deployment
- Two YAML configs validated by Zod at build time
- GEO-optimized HTML: Schema.org JSON-LD, llms.txt, semantic landmarks, FAQ microdata

## Template Library
Six templates are available. When a user describes their startup type, pick the right one:

| Template | File | CTA | When to use |
|---|---|---|---|
| SaaS | `site.config.yaml` (default) | Pricing tiers | Software with free/paid plans |
| Hardware | `templates/hardware.config.yaml` | Pre-order | Physical product not yet shipping |
| Impact | `templates/impact.config.yaml` | "Get Involved" waitlist | Nonprofit / mission-driven org |
| Biotech | `templates/biotech.config.yaml` | Investor contact form | Pre-commercial science |
| Waitlist | `templates/waitlist.config.yaml` | Email capture | Pre-launch, no product yet |
| Partnership | `templates/partnership.config.yaml` | Partner contact form | Seeking partners / resellers |

## New Config Sections (v2)
- `preOrder` — Single product card with price, ship date, feature list. Used in hardware template.
- `contactForm` — Multi-field form (types: `partnership`, `investor`, `collaboration`, `general`). Used in biotech and partnership templates. When present, **replaces** the waitlist form.
- `hero.primaryCtaLink` — Configurable CTA target (default: `#waitlist`). Set to `#contact` or `#pre-order` when appropriate.
- `finalCta.ctaTarget` — Configurable. Should match `primaryCtaLink`.
- `waitlist.heading` / `waitlist.subheading` — Optional visible heading above the waitlist form.

## API Routes
- `src/pages/api/waitlist.ts` — Email capture. Rate-limited, honeypot-protected.
- `src/pages/api/contact.ts` — Multi-field contact. Same protections + input length capping.

Both support providers: `mock` (default) | `resend` | `sheets`.

## Setup Flow
For customizing this template with Claude Code:
1. Ask user about their startup (name, product, audience, features, pricing/CTA model)
2. Pick the right template from the table above
3. Generate `site.config.yaml` from their answers, starting from the chosen template
4. Optionally customize `design.config.yaml`
5. Use `/design-consultation` for design system creation
6. Run `npm run dev` to preview
7. Run `npm run geo-check` to verify GEO score (target: 80+)
8. Use `/geo-audit` for comprehensive GEO analysis
9. Deploy to Vercel

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
