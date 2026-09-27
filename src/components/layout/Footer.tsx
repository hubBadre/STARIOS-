import { useTranslations, useLocale } from 'next-intl';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { mainNav, footerNav, SERVICE_SLUGS } from '@/lib/navigation';
import { site } from '@/lib/site';
import { Logo } from './Logo';

export function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const locale = useLocale() as 'fr' | 'ar';

  const serviceLabels: Record<string, string> = {
    INSTALLATION_CLIM: locale === 'fr' ? 'Installation de climatisation' : 'تركيب التكييف',
    B13_PLATRE: locale === 'fr' ? 'B13 Plâtre' : 'بلاتر B13',
    PRODUITS_CLIM: locale === 'fr' ? 'Produits de climatisation' : 'منتجات التكييف',
    MAINTENANCE: locale === 'fr' ? 'Maintenance et entretien' : 'الصيانة',
    VENTILATION: locale === 'fr' ? 'Ventilation' : 'التهوية',
    VENTILATION_CAISSON: locale === 'fr' ? 'Deshumidificateur' : 'أجهزة الترطيب',
    POMPE_CHALEUR: locale === 'fr' ? 'Pompe à chaleur' : 'مضخة حرارية',
    CTA: locale === 'fr' ? "CTA — traitement d'air" : 'مركزية معالجة الهواء',
    PLOMBERIE: locale === 'fr' ? 'Plomberie' : 'السباكة',
  };

  return (
    <footer className="mt-auto border-t border-border bg-navy text-slate-300">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo inverted />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{t('about')}</p>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-white">
              {t('navigation')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {mainNav.slice(1).map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="cursor-pointer transition-colors duration-200 hover:text-brand-300"
                  >
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
              {footerNav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="cursor-pointer transition-colors duration-200 hover:text-brand-300"
                  >
                    {item.key === 'faq' ? tn('faq') : t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-white">
              {t('servicesTitle')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {Object.entries(SERVICE_SLUGS).map(([key, slug]) => (
                <li key={key}>
                  <Link
                    href={`/services/${slug}`}
                    className="cursor-pointer transition-colors duration-200 hover:text-brand-300"
                  >
                    {serviceLabels[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-white">
              {t('contactTitle')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="cursor-pointer transition-colors duration-200 hover:text-brand-300"
                >
                  <span dir="ltr" className="inline-block">{site.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                <a
                  href={`mailto:${site.email}`}
                  className="cursor-pointer transition-colors duration-200 hover:text-brand-300"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                <span>{site.hours[locale]}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-slate-400">
            <span className="font-semibold text-slate-300">{t('areaServed')} :</span>{' '}
            {site.cities.join(' · ')}
          </p>
          <p className="mt-3 text-xs text-slate-400">
            © {new Date().getFullYear()} {site.legalName}. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
