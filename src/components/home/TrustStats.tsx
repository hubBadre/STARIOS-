import { useTranslations, useLocale } from 'next-intl';
import { site } from '@/lib/site';

export function TrustStats() {
  const t = useTranslations('home.stats');
  const locale = useLocale();

  const nf = new Intl.NumberFormat(locale === 'ar' ? 'ar-MA' : 'fr-MA');

  const stats = [
    { value: `+${nf.format(site.stats.projects / 1000)}K`, label: t('projects') },
    { value: nf.format(site.stats.yearsExperience), label: t('years') },
    { value: nf.format(site.stats.technicians), label: t('technicians') },
    { value: nf.format(site.stats.responseHours), label: t('response') },
  ];

  return (
    <section className="border-b border-border bg-white/80 backdrop-blur-sm">
      <div className="container grid grid-cols-2 gap-4 py-10 md:grid-cols-4 md:py-12">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 text-center shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(14,165,233,0.09)]"
          >
            <p className="font-heading text-3xl font-black tracking-[-0.04em] text-brand-700 md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
