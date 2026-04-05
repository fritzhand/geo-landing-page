import type { SiteConfig } from './config';

export function generateLlmsTxt(config: SiteConfig): string {
  const lines: string[] = [];

  lines.push(`# ${config.meta.title}`);
  lines.push('');
  lines.push(`> ${config.meta.description}`);
  lines.push('');

  lines.push('## About');
  lines.push(`${config.meta.title} ${config.meta.tagline.toLowerCase()}.`);
  lines.push(`Website: ${config.meta.url}`);
  lines.push('');

  lines.push('## Key Features');
  for (const benefit of config.valueBenefits.benefits) {
    lines.push(`- **${benefit.title}**: ${benefit.description}`);
  }
  lines.push('');

  lines.push('## How It Works');
  for (const step of config.howItWorks.steps) {
    lines.push(`- **${step.title}**: ${step.description}`);
  }
  lines.push('');

  if (config.pricing) {
    lines.push('## Pricing');
    for (const plan of config.pricing.plans) {
      lines.push(`- **${plan.name}** (${plan.price}${plan.period}): ${plan.description}`);
    }
    lines.push('');
  }

  lines.push('## FAQ');
  for (const item of config.faq.items) {
    lines.push(`### ${item.question}`);
    lines.push(item.answer);
    lines.push('');
  }

  if (config.footer.socials) {
    lines.push('## Links');
    for (const social of config.footer.socials) {
      lines.push(`- ${social.platform}: ${social.href}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}
