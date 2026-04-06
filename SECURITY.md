# Security Policy

## Reporting a Vulnerability

Please report security vulnerabilities to the maintainers directly via email instead of opening public issues.
We will try to review and patch any vulnerabilities within 48 hours.

## Supported Versions

Only the latest version of the kit is supported.

## Built-In Security Controls

Both API routes (`/api/waitlist` and `/api/contact`) share the same security stack:

| Control | Details |
|---|---|
| **Honeypot field** | A hidden `company_url` field catches bot-submitted forms silently |
| **Rate limiting** | Per-IP limit of 5 submissions per hour (in-memory; reset per serverless invocation) |
| **Email validation** | Regex validation on all email fields before any provider call |
| **Input length capping** | All contact form fields are hard-capped at 2 000 characters to prevent payload inflation |
| **No credential exposure** | Provider API keys (`RESEND_API_KEY`, `SHEETS_WEBHOOK_URL`) are server-only environment variables — never sent to the browser |
| **CSRF (no-JS path)** | No-JS form submissions use a `303` redirect response, avoiding reflected data in the response body |

## Provider Notes

- `mock` (default): logs to server console only — safe for development and staging.
- `resend`: API key must be set in environment variables, **never** in `site.config.yaml`.
- `sheets`: Webhook URL must be set in environment variables, **never** in config files.
