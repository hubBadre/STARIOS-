import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { AppLocale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { getServiceBySlug, getServices } from '@/lib/content';
import { SERVICE_SLUGS } from '@/lib/navigation';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { ServiceIcon } from '@/components/shared/ServiceIcon';
import { ServiceGallery } from '@/components/services/ServiceGallery';
import { SERVICE_GALLERIES } from '@/lib/serviceGalleries';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.values(SERVICE_SLUGS).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: locale === 'fr' ? service.titleFr : service.titleAr,
    description: locale === 'fr' ? service.excerptFr : service.excerptAr,
    locale,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: AppLocale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: 'services' });
  const tc = await getTranslations({ locale, namespace: 'common' });

  const all = await getServices();
  const others = all.filter((s) => s.slug !== slug).slice(0, 3);

  const title = locale === 'fr' ? service.titleFr : service.titleAr;
  const excerpt = locale === 'fr' ? service.excerptFr : service.excerptAr;
  const content = locale === 'fr' ? service.contentFr : service.contentAr;

  return (
    <>
      <section className="border-b border-border bg-navy">
        <div className="container py-16 md:py-20">
          <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-slate-400">
            <Link href="/services" className="cursor-pointer hover:text-brand-300">
              {t('title')}
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-slate-300">{title}</span>
          </nav>

          <span className="inline-flex size-14 items-center justify-center rounded-xl bg-white/10 text-brand-300">
            <ServiceIcon name={service.icon} className="size-7" />
          </span>

          <h1 className="mt-6 max-w-3xl text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{excerpt}</p>
        </div>
      </section>

      <section className="section-y">
        <div className="container grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {SERVICE_GALLERIES[slug] ? (
              <div className="mb-10">
                <ServiceGallery images={SERVICE_GALLERIES[slug]} alt={title} />
              </div>
            ) : null}

            <p className="max-w-prose text-lg leading-relaxed text-slate-700">{content}</p>

            <ul className="mt-10 space-y-3">
              {[
                locale === 'fr' ? 'Devis gratuit et détaillé' : 'عرض سعر مجاني ومفصّل',
                locale === 'fr' ? 'Techniciens frigoristes certifiés' : 'فنيو تبريد معتمدون',
                locale === 'fr' ? 'Matériel garanti et facturé' : 'معدات مضمونة وبفاتورة',
                locale === 'fr' ? 'Intervention sous 24 h ouvrées' : 'تدخل خلال 24 ساعة عمل',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-xl border border-border bg-brand-50/60 p-6 shadow-card">
              <p className="font-heading text-lg font-semibold text-navy">{t('detailCta')}</p>

              <Link
                href="/devis"
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg
                           bg-cta px-5 text-sm font-semibold text-white cursor-pointer
                           transition-colors duration-200 hover:bg-cta-hover"
              >
                {tc('getQuote')}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>

              <a
                href={`tel:${site.phoneRaw}`}
                className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg
                           border border-input bg-white px-5 text-sm font-semibold text-navy cursor-pointer
                           transition-colors duration-200 hover:bg-brand-50"
              >
                <Phone className="size-4" aria-hidden="true" />
                <span dir="ltr" className="inline-block">{site.phone}</span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      {others.length > 0 ? (
        <section className="section-y border-t border-border bg-background pt-16">
          <div className="container">
            <h2 className="text-2xl font-bold">{t('otherServices')}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-white p-6
                             shadow-card cursor-pointer transition-colors duration-200
                             hover:border-brand-300 hover:bg-brand-50/40"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <ServiceIcon name={other.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">
                    {locale === 'fr' ? other.titleFr : other.titleAr}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {locale === 'fr' ? other.excerptFr : other.excerptAr}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
