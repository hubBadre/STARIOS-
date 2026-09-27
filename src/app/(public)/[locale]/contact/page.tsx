import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import type { AppLocale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { ContactForm } from '@/components/contact/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    locale,
    path: '/contact',
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: AppLocale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  const info = [
    {
      icon: Phone,
      label: t('info.phone'),
      value: site.phone,
      href: `tel:${site.phoneRaw}`,
    },
    {
      icon: Mail,
      label: t('info.email'),
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: MapPin,
      label: t('info.address'),
      value: `${site.address.street}, ${site.address.city}`,
    },
    { icon: Clock, label: t('info.hours'), value: site.hours[locale] },
  ];

  return (
    <div className="section-y">
      <div className="container">
        <div className="max-w-2xl">
          <p className="section-eyebrow mb-4">{t('eyebrow')}</p>
          <h1 className="text-3xl font-bold md:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ul className="space-y-5">
              {info.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-0.5 block font-medium text-navy cursor-pointer
                                   transition-colors duration-200 hover:text-brand-700"
                      >
                        {label === t('info.phone') ? <span dir="ltr" className="inline-block">{value}</span> : value}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-medium text-navy">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 overflow-hidden rounded-xl border border-border">
              <iframe
                src={site.mapsEmbed}
                title={t('mapTitle')}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
