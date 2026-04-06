import type { APIRoute } from 'astro';
import { getSiteConfig } from '@/lib/config';

export const prerender = false;

// Simple in-memory rate limiting (per serverless invocation)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

async function submitToProvider(
  provider: string,
  data: Record<string, string>,
): Promise<{ success: boolean; error?: string }> {
  switch (provider) {
    case 'resend': {
      // Forward all contact fields as a plain-text email to the site owner.
      // Reuses the Resend provider; email content is the serialised data object.
      const { submitResend } = await import('@/lib/providers/resend');
      const body = Object.entries(data)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
      return submitResend(`contact+${data.email ?? 'unknown'}@noreply (${body})`);
    }
    case 'sheets': {
      const { submitSheets } = await import('@/lib/providers/sheets');
      // Pass JSON-encoded data as the "email" argument so the sheets handler
      // can store the full contact record — update submitSheets if richer
      // column support is needed.
      return submitSheets(JSON.stringify(data));
    }
    case 'mock':
    default: {
      console.log('[mock] Contact form submission:', data);
      return { success: true };
    }
  }
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress || 'unknown';

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Too many requests. Please try again later.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const { contactForm } = getSiteConfig();
  if (!contactForm) {
    return new Response(
      JSON.stringify({ success: false, error: 'Contact form is not configured.' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const contentType = request.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const isXhr = !!request.headers.get('x-requested-with');

  let fields: Record<string, string> = {};

  if (isJson) {
    const body = await request.json();
    fields = body as Record<string, string>;
  } else {
    const formData = await request.formData();

    // Honeypot check
    if (formData.get('company_url')) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Collect all named fields
    const knownFields = ['name', 'email', 'company', 'org', 'role', 'firm', 'stage', 'area', 'interest', 'message', 'form_type'];
    for (const key of knownFields) {
      const val = formData.get(key);
      if (val !== null) {
        fields[key] = String(val).trim();
      }
    }
  }

  // Validate that an email field is present and valid
  const email = fields['email'] ?? '';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (!isJson && !isXhr) {
      return Response.redirect(new URL('/error', request.url).href, 303);
    }
    return new Response(
      JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Sanitise: strip any field values that look like injection attempts
  for (const [key, value] of Object.entries(fields)) {
    if (value.length > 2000) {
      fields[key] = value.slice(0, 2000);
    }
  }

  const result = await submitToProvider(contactForm.provider, fields);

  if (!result.success) {
    if (!isJson && !isXhr) {
      return Response.redirect(new URL('/error', request.url).href, 303);
    }
    return new Response(
      JSON.stringify({ success: false, error: result.error ?? 'Submission failed.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // No-JS fallback: redirect to thank-you page
  if (!isJson && !isXhr) {
    return Response.redirect(new URL('/thank-you', request.url).href, 303);
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
