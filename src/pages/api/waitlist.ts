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
  email: string,
): Promise<{ success: boolean; error?: string }> {
  switch (provider) {
    case 'resend': {
      const { submitResend } = await import('@/lib/providers/resend');
      return submitResend(email);
    }
    case 'sheets': {
      const { submitSheets } = await import('@/lib/providers/sheets');
      return submitSheets(email);
    }
    case 'mock':
    default: {
      const { submitMock } = await import('@/lib/providers/mock');
      return submitMock(email);
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

  let email: string;

  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const body = await request.json();
    email = body.email;
  } else {
    const formData = await request.formData();
    // Honeypot check
    const honeypot = formData.get('company_url');
    if (honeypot) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    email = formData.get('email') as string;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    // No-JS fallback: redirect to error page
    if (!contentType.includes('application/json') && !request.headers.get('x-requested-with')) {
      return Response.redirect(new URL('/error', request.url).href, 303);
    }
    return new Response(
      JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const config = getSiteConfig();
  const result = await submitToProvider(config.waitlist.provider, email);

  // No-JS fallback: redirect
  if (!contentType.includes('application/json') && !request.headers.get('x-requested-with')) {
    if (result.success) {
      return Response.redirect(new URL('/thank-you', request.url).href, 303);
    }
    return Response.redirect(new URL('/error', request.url).href, 303);
  }

  return new Response(JSON.stringify(result), {
    status: result.success ? 200 : 500,
    headers: { 'Content-Type': 'application/json' },
  });
};
