import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { mainNav, footerNav, SERVICE_SLUGS } from '@/lib/navigation';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...mainNav.map((item) => item.href),
    ...footerNav.map((item) => item.href),
    '/devis',
    ...Object.values(SERVICE_SLUGS).map((slug) => `/services/${slug}`),
  ];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      const clean = path === '/' ? '' : path;
      return {
        url: `${baseUrl}${prefix}${clean}` || baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: path === '/' ? 1 : path === '/devis' ? 0.9 : 0.7,
      };
    }),
  );
}
