import { setRequestLocale } from 'next-intl/server';
import type { AppLocale } from '@/i18n/routing';
import { getServices, getTestimonials, getBrands } from '@/lib/content';

import { Hero } from '@/components/home/Hero';
import { TrustStats } from '@/components/home/TrustStats';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { WhyUs } from '@/components/home/WhyUs';
import { BrandMarquee } from '@/components/home/BrandMarquee';
import { Testimonials } from '@/components/home/Testimonials';
import { ExtraHighlights } from '@/components/home/ExtraHighlights';
import { CtaBand } from '@/components/home/CtaBand';

export default async function HomePage({ params }: { params: Promise<{ locale: AppLocale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [services, testimonials, brands] = await Promise.all([
    getServices(),
    getTestimonials(),
    getBrands(),
  ]);

  return (
    <>
      <Hero />
      <TrustStats />
      <ServicesGrid services={services} />
      <WhyUs />
      <BrandMarquee brands={brands} />
      <ExtraHighlights />
      <Testimonials
        testimonials={testimonials.map((item) => ({
          id: item.id,
          authorName: item.authorName,
          city: item.city,
          role: item.role ?? null,
          rating: item.rating,
          contentFr: item.contentFr,
          contentAr: item.contentAr,
        }))}
      />
      <CtaBand />
    </>
  );
}
