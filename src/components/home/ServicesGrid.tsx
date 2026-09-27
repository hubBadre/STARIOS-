import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ServiceIcon } from '@/components/shared/ServiceIcon';
import { ServiceCover } from '@/components/shared/ServiceCover';
import { ServiceGallery } from '@/components/services/ServiceGallery';
import { Reveal } from '@/components/shared/Reveal';
import type { ServiceContent } from '@/lib/content';
import { SERVICE_GALLERIES } from '@/lib/serviceGalleries';

export function ServicesGrid({ services }: { services: ServiceContent[] }) {
  const t = useTranslations('home.services');
  const tc = useTranslations('common');
  const locale = useLocale() as 'fr' | 'ar';

  return (
    <section className="section-y bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.08),transparent_30%),#f8fafc]">
      <div className="container">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-sky-200 hover:shadow-[0_24px_50px_rgba(14,165,233,0.12)]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden border-b border-slate-200 bg-slate-100">
                  {SERVICE_GALLERIES[service.slug] ? (
                    <div className="size-full transition-transform duration-500 group-hover:scale-105">
                      <ServiceGallery
                        images={SERVICE_GALLERIES[service.slug]}
                        alt={locale === 'fr' ? service.titleFr : service.titleAr}
                        variant="bare"
                      />
                    </div>
                  ) : (
                    <ServiceCover
                      name={service.icon}
                      className="size-full transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-sky-100 text-brand-700 ring-1 ring-brand-100 transition-colors duration-200 group-hover:from-brand-100 group-hover:to-brand-50">
                    <ServiceIcon name={service.icon} className="size-6" />
                  </span>

                  <h3 className="mt-5 text-xl font-semibold text-navy">
                    {locale === 'fr' ? service.titleFr : service.titleAr}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {locale === 'fr' ? service.excerptFr : service.excerptAr}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    {tc('learnMore')}
                    <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
