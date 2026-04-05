import type { SiteConfig } from './config';

export function generateOrganizationSchema(config: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.meta.title,
    url: config.meta.url,
    logo: `${config.meta.url}${config.branding.logo}`,
    description: config.meta.description,
    ...(config.footer.socials && {
      sameAs: config.footer.socials.map((s) => s.href),
    }),
  };
}

export function generateWebSiteSchema(config: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.meta.title,
    url: config.meta.url,
    description: config.meta.description,
  };
}

export function generateFAQSchema(config: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateProductSchema(config: SiteConfig) {
  if (!config.pricing) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.meta.title,
    description: config.meta.description,
    url: config.meta.url,
    applicationCategory: 'BusinessApplication',
    offers: config.pricing.plans.map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      price: plan.price.replace(/[^0-9.]/g, '') || '0',
      priceCurrency: 'USD',
      description: plan.description,
    })),
  };
}

export function generateAllSchemas(config: SiteConfig): string {
  const schemas = [
    generateOrganizationSchema(config),
    generateWebSiteSchema(config),
    generateFAQSchema(config),
    generateProductSchema(config),
  ].filter(Boolean);

  return JSON.stringify(schemas);
}
