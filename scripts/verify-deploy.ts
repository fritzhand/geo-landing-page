/**
 * Deploy Verification Script
 * Checks a deployed site for health and GEO prerequisites.
 *
 * Usage: npm run verify-deploy -- --url https://your-site.vercel.app
 */

const args = process.argv.slice(2);
const urlFlag = args.indexOf('--url');
const siteUrl = urlFlag !== -1 ? args[urlFlag + 1] : null;

if (!siteUrl) {
  console.error('Usage: npm run verify-deploy -- --url https://your-site.vercel.app');
  process.exit(1);
}

interface Check {
  name: string;
  pass: boolean;
  details: string;
}

async function checkUrl(url: string, label: string): Promise<Check> {
  try {
    const res = await fetch(url);
    return {
      name: label,
      pass: res.ok,
      details: `HTTP ${res.status}`,
    };
  } catch (err) {
    return {
      name: label,
      pass: false,
      details: `Failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
    };
  }
}

async function checkRobotsTxt(baseUrl: string): Promise<Check> {
  try {
    const res = await fetch(`${baseUrl}/robots.txt`);
    if (!res.ok) return { name: 'robots.txt', pass: false, details: `HTTP ${res.status}` };

    const text = await res.text();
    const crawlers = ['Googlebot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot'];
    const found = crawlers.filter((c) => text.includes(c));

    return {
      name: 'robots.txt AI crawlers',
      pass: found.length >= 3,
      details: `Found: ${found.join(', ')}`,
    };
  } catch (err) {
    return { name: 'robots.txt', pass: false, details: `Error: ${err}` };
  }
}

async function main() {
  console.log(`\n🔍 Verifying deployment: ${siteUrl}\n`);
  console.log('─'.repeat(50));

  const checks: Check[] = await Promise.all([
    checkUrl(siteUrl, 'Site loads (HTTP 200)'),
    checkUrl(`${siteUrl}/llms.txt`, 'llms.txt accessible'),
    checkUrl(`${siteUrl}/robots.txt`, 'robots.txt accessible'),
    checkRobotsTxt(siteUrl),
    checkUrl(`${siteUrl}/sitemap-index.xml`, 'Sitemap accessible'),
  ]);

  let allPass = true;
  for (const check of checks) {
    const icon = check.pass ? '✅' : '❌';
    console.log(`${icon} ${check.name}: ${check.details}`);
    if (!check.pass) allPass = false;
  }

  console.log('─'.repeat(50));

  if (allPass) {
    console.log('\n🎉 All deployment checks passed!\n');
  } else {
    console.log('\n⚠️  Some checks failed. Review above.\n');
  }

  process.exit(allPass ? 0 : 1);
}

main();
