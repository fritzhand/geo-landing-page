/**
 * GEO Verification Script
 * Runs against the built site to score GEO optimization (0-100).
 *
 * Usage: npm run geo-check
 * Requires: npm run build first
 */

import fs from 'node:fs';
import path from 'node:path';

// Vercel adapter outputs to dist/client/, fallback to dist/
const clientDir = path.resolve(process.cwd(), 'dist/client');
const plainDir = path.resolve(process.cwd(), 'dist');
const DIST = fs.existsSync(path.join(clientDir, 'index.html')) ? clientDir : plainDir;

interface CheckResult {
  name: string;
  weight: number;
  pass: boolean;
  score: number;
  details: string;
}

function readFile(filePath: string): string | null {
  try {
    return fs.readFileSync(path.join(DIST, filePath), 'utf-8');
  } catch {
    return null;
  }
}

function checkFirst200Words(html: string): CheckResult {
  // Extract text content from first <main> element
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!mainMatch) {
    return { name: 'First 200 words quality', weight: 20, pass: false, score: 0, details: 'No <main> element found' };
  }

  const textContent = mainMatch[1]
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = textContent.split(' ').slice(0, 200).join(' ').toLowerCase();
  const checks = [
    words.length > 100,  // Has substantial content
    /automat|workflow|founder|startup/i.test(words), // Contains relevant terms
  ];
  const passed = checks.filter(Boolean).length;
  const score = Math.round((passed / checks.length) * 20);

  return {
    name: 'First 200 words quality',
    weight: 20,
    pass: passed === checks.length,
    score,
    details: `${passed}/${checks.length} checks passed (content length: ${words.length} chars)`,
  };
}

function checkSchemaOrg(html: string): CheckResult {
  const schemas = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
  if (!schemas) {
    return { name: 'Schema.org presence', weight: 15, pass: false, score: 0, details: 'No JSON-LD found' };
  }

  let found: string[] = [];
  for (const tag of schemas) {
    const content = tag.replace(/<[^>]+>/g, '');
    try {
      const parsed = JSON.parse(content);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) {
        if (item['@type']) found.push(item['@type']);
      }
    } catch {}
  }

  const required = ['Organization', 'FAQPage', 'WebSite'];
  const hasRequired = required.filter((t) => found.includes(t));
  const hasProduct = found.includes('SoftwareApplication');
  const baseScore = Math.round((hasRequired.length / required.length) * 15);

  return {
    name: 'Schema.org presence',
    weight: 15,
    pass: hasRequired.length === required.length,
    score: baseScore + (hasProduct ? 2 : 0), // bonus for product schema
    details: `Found: ${found.join(', ')}. Required: ${hasRequired.length}/${required.length}`,
  };
}

function checkLlmsTxt(): CheckResult {
  const content = readFile('llms.txt');
  if (!content) {
    return { name: 'llms.txt present', weight: 10, pass: false, score: 0, details: 'File not found in dist/' };
  }

  const hasTitle = content.startsWith('#');
  const hasAbout = content.includes('## About');
  const hasFaq = content.includes('## FAQ');
  const checks = [hasTitle, hasAbout, hasFaq];
  const passed = checks.filter(Boolean).length;

  return {
    name: 'llms.txt present',
    weight: 10,
    pass: passed === checks.length,
    score: Math.round((passed / checks.length) * 10),
    details: `Structure checks: ${passed}/${checks.length}`,
  };
}

function checkSemanticHTML(html: string): CheckResult {
  const hasMain = /<main/.test(html);
  const hasSections = (html.match(/<section/g) || []).length >= 5;
  const hasAriaLabels = (html.match(/aria-label=/g) || []).length >= 3;
  const hasH1 = /<h1/.test(html);
  const hasH2 = /<h2/.test(html);
  const checks = [hasMain, hasSections, hasAriaLabels, hasH1, hasH2];
  const passed = checks.filter(Boolean).length;

  return {
    name: 'Semantic HTML',
    weight: 15,
    pass: passed === checks.length,
    score: Math.round((passed / checks.length) * 15),
    details: `main:${hasMain} sections:${hasSections} aria:${hasAriaLabels} h1:${hasH1} h2:${hasH2}`,
  };
}

function checkFAQStructure(html: string): CheckResult {
  const hasFaqSchema = /FAQPage/.test(html);
  const hasItemScope = /itemtype.*schema\.org\/Question/i.test(html);
  const hasDetails = /<details/.test(html);
  const checks = [hasFaqSchema, hasItemScope, hasDetails];
  const passed = checks.filter(Boolean).length;

  return {
    name: 'FAQ structure',
    weight: 10,
    pass: passed === checks.length,
    score: Math.round((passed / checks.length) * 10),
    details: `schema:${hasFaqSchema} microdata:${hasItemScope} details:${hasDetails}`,
  };
}

function checkMetaTags(html: string): CheckResult {
  const hasTitle = /<title[^>]*>.+<\/title>/.test(html);
  const hasDesc = /meta name="description"/.test(html);
  const hasOG = /property="og:image"/.test(html);
  const hasCanonical = /rel="canonical"/.test(html);
  const checks = [hasTitle, hasDesc, hasOG, hasCanonical];
  const passed = checks.filter(Boolean).length;

  return {
    name: 'Meta tags',
    weight: 10,
    pass: passed === checks.length,
    score: Math.round((passed / checks.length) * 10),
    details: `title:${hasTitle} desc:${hasDesc} og:${hasOG} canonical:${hasCanonical}`,
  };
}

function checkRobotsTxt(): CheckResult {
  const content = readFile('../public/robots.txt') || readFile('robots.txt');
  if (!content) {
    // Check source public/robots.txt
    try {
      const srcRobots = fs.readFileSync(path.resolve(process.cwd(), 'public/robots.txt'), 'utf-8');
      if (srcRobots) {
        const crawlers = ['Googlebot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot'];
        const allowed = crawlers.filter((c) => srcRobots.includes(c));
        return {
          name: 'robots.txt AI crawlers',
          weight: 10,
          pass: allowed.length >= 3,
          score: Math.round((allowed.length / crawlers.length) * 10),
          details: `Allowed: ${allowed.join(', ')}`,
        };
      }
    } catch {}
    return { name: 'robots.txt AI crawlers', weight: 10, pass: false, score: 0, details: 'robots.txt not found' };
  }

  const crawlers = ['Googlebot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot'];
  const allowed = crawlers.filter((c) => content.includes(c));

  return {
    name: 'robots.txt AI crawlers',
    weight: 10,
    pass: allowed.length >= 3,
    score: Math.round((allowed.length / crawlers.length) * 10),
    details: `Allowed: ${allowed.join(', ')}`,
  };
}

function checkContentFirst(html: string): CheckResult {
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/section>/);
  if (!mainMatch) {
    return { name: 'Content-first HTML order', weight: 5, pass: false, score: 0, details: 'No main content found' };
  }

  const firstContent = mainMatch[1].replace(/<[^>]+>/g, '').trim();
  const pass = firstContent.length > 50;

  return {
    name: 'Content-first HTML order',
    weight: 5,
    pass,
    score: pass ? 5 : 0,
    details: `First content length: ${firstContent.length} chars`,
  };
}

function checkHeadingDescriptiveness(html: string): CheckResult {
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!h1Match) {
    return { name: 'Heading descriptiveness', weight: 5, pass: false, score: 0, details: 'No H1 found' };
  }

  const h1Text = h1Match[1].replace(/<[^>]+>/g, '').trim();
  const hasSubstance = h1Text.split(' ').length >= 4;

  return {
    name: 'Heading descriptiveness',
    weight: 5,
    pass: hasSubstance,
    score: hasSubstance ? 5 : 2,
    details: `H1: "${h1Text}"`,
  };
}

// Main — check the SaaS demo page (the canonical landing page for GEO scoring).
// The root index.html is the template gallery, not a GEO-optimized landing page.
const geoTarget = 'templates/saas/index.html';
const indexHtml = readFile(geoTarget);
if (!indexHtml) {
  console.error(`❌ dist/${geoTarget} not found. Run \`npm run build\` first.`);
  process.exit(1);
}

const results: CheckResult[] = [
  checkFirst200Words(indexHtml),
  checkSchemaOrg(indexHtml),
  checkLlmsTxt(),
  checkSemanticHTML(indexHtml),
  checkFAQStructure(indexHtml),
  checkMetaTags(indexHtml),
  checkRobotsTxt(),
  checkContentFirst(indexHtml),
  checkHeadingDescriptiveness(indexHtml),
];

const totalScore = results.reduce((sum, r) => sum + r.score, 0);

console.log('\n🌐 GEO Score Report\n');
console.log('─'.repeat(60));

for (const r of results) {
  const icon = r.pass ? '✅' : '❌';
  console.log(`${icon} ${r.name} (${r.score}/${r.weight})`);
  console.log(`   ${r.details}`);
}

console.log('─'.repeat(60));
console.log(`\n📊 Total GEO Score: ${totalScore}/100\n`);

if (totalScore >= 80) {
  console.log('🎉 Great! Your site meets the GEO optimization target.');
} else {
  console.log('⚠️  Below target (80). Review the failing checks above.');
}

process.exit(totalScore >= 80 ? 0 : 1);
