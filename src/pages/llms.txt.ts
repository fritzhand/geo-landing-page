import type { APIRoute } from 'astro';
import { getSiteConfig } from '@/lib/config';
import { generateLlmsTxt } from '@/lib/llms';

export const GET: APIRoute = () => {
  const config = getSiteConfig();
  const content = generateLlmsTxt(config);

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
