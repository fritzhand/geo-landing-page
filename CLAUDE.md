# Startup Landing Kit

## Project Status
GEO-optimized Astro 5 landing page template. v2 is the current version.

Key artifacts:
- Design system: `DESIGN.md` (in repo root)
- Config: `site.config.yaml` (content) + `design.config.yaml` (visuals)

## Architecture
- Astro 5 with static output + one server API route (waitlist form)
- Tailwind CSS v4 via `@tailwindcss/vite`
- Vercel adapter for deployment
- Two YAML configs validated by Zod at build time
- GEO-optimized HTML: Schema.org JSON-LD, llms.txt, semantic landmarks, FAQ microdata

## Setup Flow
For customizing this template with Claude Code:
1. Ask user about their startup (name, product, audience, features, pricing)
2. Generate `site.config.yaml` from answers
3. Optionally customize `design.config.yaml`
4. Use `/design-consultation` for design system creation
5. Use `/frontend-design` for component customization
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
