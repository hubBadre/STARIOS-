import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { AppLocale } from '@/i18n/routing';
import { getServices } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ServiceIcon } from '@/components/shared/ServiceIcon';
import { Reveal } from '@/components/shared/Reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    locale,
    path: '/services',
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'services' });
  const tc = await getTranslations({ locale, namespace: 'common' });
  const services = await getServices();

  return (
    <div className="section-y">
      <div className="container">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-white p-6
                           shadow-card cursor-pointer transition-colors duration-200
                           hover:border-brand-300 hover:bg-brand-50/40"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition-colors duration-200 group-hover:bg-brand-100">
                  <ServiceIcon name={service.icon} className="size-6" />
                </span>
                <h2 className="mt-5 text-lg font-semibold">
                  {locale === 'fr' ? service.titleFr : service.titleAr}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {locale === 'fr' ? service.excerptFr : service.excerptAr}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  {tc('learnMore')}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
