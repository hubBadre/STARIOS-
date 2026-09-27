import type { Metadata } from 'next';
import { site } from './site';
import type { AppLocale } from '@/i18n/routing';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

interface BuildMetadataArgs {
  title: string;
  description: string;
  locale: AppLocale;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  locale,
  path = '',
  image,
  noIndex,
}: BuildMetadataArgs): Metadata {
  const url = `${baseUrl}${locale === 'fr' ? '' : `/${locale}`}${path}`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${baseUrl}${path}`,
        ar: `${baseUrl}/ar${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: locale === 'fr' ? 'fr_MA' : 'ar_MA',
      type: 'website',
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

/** JSON-LD LocalBusiness — décisif pour le référencement local marocain. */
export function localBusinessJsonLd(locale: AppLocale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: site.legalName,
    alternateName: site.name,
    description: site.tagline[locale],
    url: baseUrl,
    telephone: site.phoneRaw,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: 'MA',
    },
    areaServed: site.cities.map((city) => ({ '@type': 'City', name: city })),
    openingHours: 'Mo-Sa 08:30-19:00',
    priceRange: 'MAD',
    sameAs: Object.values(site.social),
  };
}
