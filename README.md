<p align="center">
  <img src="public/logo.svg" width="48" height="48" alt="Startup Landing Kit" />
</p>

<h1 align="center">Startup Landing Kit</h1>

<p align="center">
  <strong>The open-source, GEO-optimized landing page template for startups.</strong><br />
  Fork it. Customize with any AI coding tool. Deploy to Vercel. Score 80+ on GEO.
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> &bull;
  <a href="#geo-optimization">GEO Features</a> &bull;
  <a href="#customization">Customization</a> &bull;
  <a href="#deployment">Deploy</a> &bull;
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffritzhand%2Fstartup-landing-kit"><img src="https://vercel.com/button" alt="Deploy with Vercel" /></a>
</p>

---

## Why This Exists

Every Astro/Next.js landing page template nails traditional SEO (Lighthouse 100). None of them think about **Generative Engine Optimization** — making your site citable by ChatGPT, Perplexity, Gemini, and Google AI Overviews.

This template does both. The GEO signals are **structural** (baked into the HTML), not bolted on. You can't break them by editing content.

### What's Different

| Feature | Typical Template | This Template |
|---------|-----------------|---------------|
| SEO | Meta tags, sitemap | Meta tags, sitemap, **plus all GEO signals below** |
| AI Citability | None | First-200-words optimization, Schema.org JSON-LD, FAQ microdata |
| AI Discovery | None | Auto-generated `llms.txt`, AI-friendly `robots.txt` |
| Setup | Manual editing | **Any AI coding tool** generates your config from a conversation |
| Config | Scattered across components | **Two YAML files** — content and design, validated by Zod |
| Design System | CSS variables | Full design system doc (`DESIGN.md`) + 4 theme presets |

---

## Quick Start

```bash
# Clone
git clone https://github.com/fritzhand/startup-landing-kit.git
cd startup-landing-kit
npm install

# Edit content
# Open site.config.yaml — replace the demo startup with yours

# Preview
npm run dev

# Verify GEO score (target: 80+)
npm run build && npm run geo-check

# Deploy
npx vercel
```

### Three Ways to Set Up

| Path | Best For | What Happens |
|------|----------|-------------|
| **Quick** | Power users | Pick a template, edit `site.config.yaml` by hand, deploy |
| **AI** | Most users | Open repo with AI tool — it asks about your startup, generates config |
| **Pro** | Best results | Write a PRD, create `DESIGN.md` via AI, generate a fully customized site |

> **AI setup works with any tool.** Claude Code reads `CLAUDE.md`, Codex/Antigravity reads `AGENTS.md`, Gemini CLI reads `GEMINI.md`. Same flow, different files.

### Pick a Template

Copy the template closest to your startup type into `site.config.yaml`, then fill in your content.

| Template | File | CTA | Use when… |
|---|---|---|---|
| **SaaS** | `site.config.yaml` (default) | Pricing tiers | Software product with free/paid plans |
| **Hardware** | `templates/hardware.config.yaml` | Pre-order card | Physical product not yet shipping |
| **Impact / Nonprofit** | `templates/impact.config.yaml` | "Get Involved" waitlist | Mission-driven org, no pricing |
| **Biotech** | `templates/biotech.config.yaml` | Investor contact form | Pre-commercial science company |
| **Waitlist Only** | `templates/waitlist.config.yaml` | Email capture | Pre-launch, build the list |
| **Partnership** | `templates/partnership.config.yaml` | Partnership contact form | Seeking resellers, partners, or collaborators |

```bash
# Use a template
cp templates/hardware.config.yaml site.config.yaml
```

---

## GEO Optimization

The default template scores **102/100** on the built-in GEO checker (bonus points from Product schema).

### Built-In GEO Signals

- **First 200 words** — Hero section directly answers "What is [company]?" in HTML source order
- **Schema.org JSON-LD** — Organization, FAQPage, WebSite, SoftwareApplication, auto-generated from config
- **`llms.txt`** — AI-readable summary at `/llms.txt`, auto-generated from config
- **`robots.txt`** — Explicitly allows Googlebot, ChatGPT-User, PerplexityBot, ClaudeBot, GPTBot
- **FAQ microdata** — Schema.org `Question`/`Answer` markup on every FAQ item
- **Semantic HTML5** — `<main>`, `<section>`, `aria-label`, proper heading hierarchy (H1 includes company + value prop)
- **Content-first HTML order** — No decorative elements before the core message

### GEO Verification

```bash
npm run build && npm run geo-check
```

Scores the built site on a 0–100 rubric across 9 checks (first-200-words quality, Schema.org, llms.txt, semantic HTML, FAQ structure, meta tags, robots.txt, content order, heading descriptiveness).

---

## Customization

### Content — `site.config.yaml`

All page content lives in one file. No component editing required.

```yaml
meta:
  title: "YourStartup"
  tagline: "One-line value prop"
  description: "150-char meta description"
  url: "https://yourstartup.com"

hero:
  headline: "Your headline here."
  subheadline: "Your subheadline here."
  primaryCta: "Join Waitlist"

# ... plus: socialProof, productExplanation, howItWorks,
#     valueBenefits, pricing, faq, finalCta, footer, waitlist
```

<details>
<summary><strong>Full config schema</strong></summary>

| Section | Required | Fields |
|---------|----------|--------|
| `meta` | Yes | title, tagline, description, url, lang, ogImage |
| `branding` | Yes | logo, logoAlt |
| `hero` | Yes | headline, subheadline, primaryCta, `primaryCtaLink`, secondaryCta, image, trust |
| `socialProof` | No | logos, testimonials |
| `productExplanation` | Yes | heading, subheading, steps (2–4) |
| `howItWorks` | Yes | heading, steps (exactly 3) |
| `valueBenefits` | Yes | heading, benefits (3–6) |
| `pricing` | No | heading, subheading, plans (1–3) |
| `preOrder` | No | heading, subheading, badge, product (name, price, features, cta…) |
| `contactForm` | No | heading, subheading, type, provider, submitCta, successMessage, fields |
| `faq` | Yes | heading, items (4–8) |
| `finalCta` | Yes | heading, subheading, primaryCta, trustSnippet, `ctaTarget` |
| `footer` | Yes | copyright, links, socials |
| `waitlist` | Yes | provider, `heading`, `subheading` |

**Notes:**
- `pricing`, `preOrder`, and `contactForm` are all optional and mutually exclusive by convention — use the one that fits your startup type.
- `hero.primaryCtaLink` defaults to `#waitlist`; set to `#contact` or `#pre-order` for other templates.
- `finalCta.ctaTarget` defaults to `#waitlist`; should match `primaryCtaLink`.
- When `contactForm` is present it replaces the waitlist form in the page layout.

</details>

### Design — `design.config.yaml`

Colors, fonts, spacing, and aesthetic. If this file is missing, the defaults from `DESIGN.md` are used.

```yaml
colors:
  primary: "#2563EB"        # Brand accent
  text: "#0A0A0B"           # Near-black (warmer than pure black)
  background: "#FFFFFF"

typography:
  headingFont: "Cabinet Grotesk"   # Geometric, confident
  bodyFont: "DM Sans"              # Clean, readable

aesthetic:
  style: "clean"            # clean | bold | minimal | playful
  heroLayout: "split"       # split | centered | full-width
  cardStyle: "outlined"     # outlined | elevated | flat

theme: "saas"               # saas | devtool | consumer | enterprise
```

### Theme Presets

| Theme | Accent | Vibe |
|-------|--------|------|
| `saas` | Blue `#2563EB` | Clean, professional, Stripe energy |
| `devtool` | Green `#10B981` | Dark-first, terminal aesthetic, monospace accents |
| `consumer` | Orange `#F97316` | Warm, rounded, friendly |
| `enterprise` | Navy `#0F172A` | Restrained, trust-heavy, data-oriented |
| `hardware` | Slate `#334155` | Solid, product-forward, industrial |
| `impact` | Teal `#0D9488` | Mission-driven, warm, accessible |
| `biotech` | Indigo `#4338CA` | Scientific, credible, future-focused |

### Dark Mode

Automatic via `prefers-color-scheme`. Dark colors are configurable in `design.config.yaml` under `dark:`.

---

## Forms

Both forms use progressive enhancement — they work with and without JavaScript.

### Waitlist Form (`/api/waitlist`)

A simple email capture form. Renders when `contactForm` is **not** present in the config.

| Provider | How It Works | Env Vars Needed |
|----------|-------------|-----------------|
| `mock` | Logs to console (default) | None |
| `resend` | Sends confirmation email | `RESEND_API_KEY`, `RESEND_FROM` |
| `sheets` | Appends row to Google Sheet | `SHEETS_WEBHOOK_URL` |

Set via `waitlist.provider` in `site.config.yaml`.

### Contact Form (`/api/contact`)

A multi-field form with four types. Renders when `contactForm` is present in the config (replaces the waitlist form).

| Type | Default Fields | Use For |
|------|---------------|---------|
| `partnership` | name, email, company, role, partnership type (select), message | Resellers, ecosystem builders |
| `investor` | name, email, firm, investment stage (select), message | Biotech, deep tech, pre-revenue |
| `collaboration` | name, email, org, area, message | Research, academic, NGO |
| `general` | name, email, message | General inquiries |

Override any field set by providing a `fields:` array in the config.

**Built-in protections on both forms:** honeypot field, IP-based rate limiting (5/hr), email validation, input length capping (2 000 chars).

---

## Project Structure

```
site.config.yaml               # Content config (what your startup IS)
design.config.yaml              # Design config (what it LOOKS like)
DESIGN.md                       # Design system documentation
CLAUDE.md / AGENTS.md / GEMINI.md  # AI tool instructions
astro.config.mjs                # Astro + Vercel + Tailwind config
templates/
  hardware.config.yaml          # Hardware / pre-order template
  impact.config.yaml            # Impact / nonprofit template
  biotech.config.yaml           # Biotech / investor template
  waitlist.config.yaml          # Pre-launch waitlist-only template
  partnership.config.yaml       # Partnership / collaboration template
scripts/
  geo-check.ts                  # GEO verification (0-100 score)
  verify-deploy.ts              # Post-deploy health check
public/
  robots.txt                    # AI crawler-friendly
  placeholders/                 # Demo images (replace with yours)
src/
  layouts/BaseLayout.astro      # HTML shell, meta, Schema.org, fonts
  pages/
    index.astro                 # Landing page
    privacy.astro               # Privacy policy
    thank-you.astro             # Form success (no-JS fallback)
    error.astro                 # Form error (no-JS fallback)
    llms.txt.ts                 # Auto-generated llms.txt endpoint
    api/
      waitlist.ts               # Waitlist API route (server-rendered)
      contact.ts                # Contact/partnership API route
  components/
    Header.astro                # Sticky nav with logo
    Hero.astro                  # First-200-words optimized (configurable CTA link)
    SocialProof.astro           # Logos + testimonials
    ProductExplanation.astro    # Asymmetric step-by-step
    HowItWorks.astro            # 3-step numbered grid
    ValueBenefits.astro         # Benefits cards
    Pricing.astro               # 1-3 plan pricing table (SaaS templates)
    PreOrder.astro              # Single product pre-order card (hardware templates)
    ContactForm.astro           # Multi-field contact form (partnership/biotech)
    FAQ.astro                   # Schema.org FAQ microdata
    FinalCTA.astro              # Dark CTA section (configurable target)
    WaitlistForm.astro          # Progressive enhancement email form
    Footer.astro                # Links + socials
  lib/
    config.ts                   # YAML loading + Zod validation
    schema.ts                   # Schema.org JSON-LD generation
    llms.ts                     # llms.txt content generation
    providers/                  # Waitlist: mock, resend, sheets
  styles/
    global.css                  # Tailwind + CSS custom properties
```

---

## Deployment

### Vercel (Recommended)

Click the deploy button at the top, or:

```bash
npx vercel
```

All pages are pre-rendered as static HTML at build time. Only the waitlist API route (`/api/waitlist`) is server-rendered.

### Post-Deploy Checklist

1. Update `meta.url` in `site.config.yaml` with your production URL
2. Replace `public/placeholders/og.png` with your OG image (1200 x 630)
3. Update the `Sitemap:` URL in `public/robots.txt`
4. Set env vars for your form provider (if not using `mock`):
   - Waitlist: `RESEND_API_KEY` / `RESEND_FROM` or `SHEETS_WEBHOOK_URL`
   - Contact form uses the same provider/vars via `contactForm.provider`
5. Verify:

```bash
npm run verify-deploy -- --url https://your-site.vercel.app
```

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run geo-check` | GEO verification score (0-100) |
| `npm run verify-deploy -- --url <URL>` | Post-deploy health check |

---

## CI/CD

A GitHub Action (`.github/workflows/geo-check.yml`) runs on every push and PR to `main`:

1. Install dependencies
2. Build the site
3. Run `geo-check` — fails the check if score drops below 80

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Astro 5](https://astro.build) | Static HTML output (critical for GEO/SEO) |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling via `@tailwindcss/vite` |
| [Zod](https://zod.dev) | Config validation at build time |
| [Vercel](https://vercel.com) | Deployment + serverless API route |
| TypeScript | End-to-end type safety |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). PRs welcome — run `npm run build && npm run geo-check` before submitting (GEO score must stay 80+).

## License

[MIT](LICENSE)
