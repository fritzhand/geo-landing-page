# Contributing

We accept pull requests from the community.

## Steps to contribute

1. Fork the repo.
2. Create a branch for your feature or fix.
3. Commit your changes.
4. Push to your fork.
5. Open a Pull Request.

## Guidelines

- Follow the existing code style (Astro components, TypeScript).
- Ensure no sensitive data is committed.
- Keep the `site.config.yaml` and `design.config.yaml` schemas backward compatible. If you add new optional fields, add Zod `.optional()` defaults so existing configs don't break.
- Run `npm run build && npm run geo-check` before submitting — GEO score must stay 80+.

## Adding a New Template

Templates live in `templates/`. To add one:

1. Copy `site.config.yaml` (SaaS default) as a starting point.
2. Adapt the content and choose the appropriate optional sections (`preOrder`, `contactForm`, or `pricing`).
3. Set `hero.primaryCtaLink` and `finalCta.ctaTarget` to match the primary CTA target (`#waitlist`, `#contact`, or `#pre-order`).
4. Add the template to the table in `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and `README.md`.

## Adding a New Config Section

1. Add the Zod schema in `src/lib/config.ts` as an optional field on `siteConfigSchema`.
2. Create the corresponding Astro component in `src/components/`.
3. Import and conditionally render it in `src/pages/index.astro`.
4. If the section needs an API route, add it under `src/pages/api/` following the pattern of `waitlist.ts` (rate-limit, honeypot, provider abstraction).
5. Update all four AI instruction files (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `README.md`).
