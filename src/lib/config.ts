import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { z } from 'zod';

// --- Site Config Schema ---
const trustMetricSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const heroImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

const testimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string(),
});

const logoSchema = z.object({
  name: z.string(),
  src: z.string(),
});

const stepSchema = z.object({
  image: z.string(),
  caption: z.string(),
});

const howItWorksStepSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

const benefitSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const pricingPlanSchema = z.object({
  name: z.string(),
  price: z.string(),
  period: z.string().optional().default(''),
  description: z.string(),
  features: z.array(z.string()),
  cta: z.string(),
  popular: z.boolean().optional().default(false),
});

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const footerLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const socialSchema = z.object({
  platform: z.string(),
  href: z.string(),
});

const siteConfigSchema = z.object({
  meta: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string().max(160),
    lang: z.string().default('en'),
    url: z.string().url(),
    ogImage: z.string().default('/og-default.png'),
  }),
  branding: z.object({
    logo: z.string(),
    logoAlt: z.string(),
  }),
  hero: z.object({
    headline: z.string(),
    subheadline: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string().optional(),
    secondaryCtaLink: z.string().optional(),
    image: heroImageSchema.optional(),
    trust: z.object({ metric: trustMetricSchema }).optional(),
  }),
  socialProof: z.object({
    logos: z.array(logoSchema).optional(),
    testimonials: z.array(testimonialSchema).optional(),
  }).optional(),
  productExplanation: z.object({
    heading: z.string(),
    subheading: z.string().optional(),
    steps: z.array(stepSchema).min(2).max(4),
  }),
  howItWorks: z.object({
    heading: z.string(),
    steps: z.array(howItWorksStepSchema).length(3),
  }),
  valueBenefits: z.object({
    heading: z.string(),
    benefits: z.array(benefitSchema).min(3).max(6),
  }),
  pricing: z.object({
    heading: z.string(),
    subheading: z.string().optional(),
    plans: z.array(pricingPlanSchema).min(1).max(3),
  }).optional(),
  faq: z.object({
    heading: z.string(),
    items: z.array(faqItemSchema).min(4).max(8),
  }),
  finalCta: z.object({
    heading: z.string(),
    subheading: z.string().optional(),
    primaryCta: z.string(),
    trustSnippet: z.string().optional(),
  }),
  footer: z.object({
    copyright: z.string(),
    links: z.array(footerLinkSchema).optional(),
    socials: z.array(socialSchema).optional(),
  }),
  waitlist: z.object({
    provider: z.enum(['mock', 'resend', 'sheets']).default('mock'),
  }),
});

// --- Design Config Schema ---
const designConfigSchema = z.object({
  colors: z.object({
    primary: z.string().default('#2563EB'),
    primaryHover: z.string().default('#1D4ED8'),
    primaryLight: z.string().default('#EFF6FF'),
    text: z.string().default('#0A0A0B'),
    textMuted: z.string().default('#71717A'),
    background: z.string().default('#FFFFFF'),
    surface: z.string().default('#FAFAFA'),
    surfaceAlt: z.string().default('#F4F4F5'),
    border: z.string().default('#E4E4E7'),
    success: z.string().default('#16A34A'),
    warning: z.string().default('#D97706'),
    error: z.string().default('#DC2626'),
  }),
  dark: z.object({
    background: z.string().default('#09090B'),
    surface: z.string().default('#18181B'),
    surfaceAlt: z.string().default('#27272A'),
    text: z.string().default('#FAFAFA'),
    textMuted: z.string().default('#A1A1AA'),
    border: z.string().default('#3F3F46'),
    primary: z.string().default('#3B82F6'),
    primaryHover: z.string().default('#60A5FA'),
    primaryLight: z.string().default('#172554'),
  }).optional(),
  typography: z.object({
    headingFont: z.string().default('Cabinet Grotesk'),
    bodyFont: z.string().default('DM Sans'),
    monoFont: z.string().default('Geist Mono'),
    baseSize: z.string().default('16px'),
    scale: z.number().default(1.25),
  }).optional(),
  spacing: z.object({
    sectionPadding: z.string().default('96px'),
    sectionPaddingMobile: z.string().default('64px'),
    containerWidth: z.string().default('1200px'),
    containerPadding: z.string().default('24px'),
    borderRadius: z.string().default('8px'),
    borderRadiusSm: z.string().default('6px'),
    borderRadiusLg: z.string().default('12px'),
  }).optional(),
  aesthetic: z.object({
    style: z.enum(['clean', 'bold', 'minimal', 'playful']).default('clean'),
    heroLayout: z.enum(['split', 'centered', 'full-width']).default('split'),
    cardStyle: z.enum(['elevated', 'outlined', 'flat']).default('outlined'),
  }).optional(),
  theme: z.enum(['saas', 'devtool', 'consumer', 'enterprise']).default('saas'),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type DesignConfig = z.infer<typeof designConfigSchema>;

function loadYaml(filename: string): unknown {
  const filePath = path.resolve(process.cwd(), filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return YAML.parse(raw);
}

let _siteConfig: SiteConfig | null = null;
let _designConfig: DesignConfig | null = null;

export function getSiteConfig(): SiteConfig {
  if (_siteConfig) return _siteConfig;
  const raw = loadYaml('site.config.yaml');
  _siteConfig = siteConfigSchema.parse(raw);
  return _siteConfig;
}

export function getDesignConfig(): DesignConfig {
  if (_designConfig) return _designConfig;
  try {
    const raw = loadYaml('design.config.yaml');
    _designConfig = designConfigSchema.parse(raw);
  } catch {
    _designConfig = designConfigSchema.parse({});
  }
  return _designConfig;
}
