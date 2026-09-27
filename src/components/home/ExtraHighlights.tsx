import { useTranslations } from 'next-intl';
import {
  ArrowRight,
  Clock3,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';

export function ExtraHighlights() {
  const t = useTranslations('home.extra');

  const benefits = [
    {
      icon: ShieldCheck,
      title: t('benefit1Title'),
      body: t('benefit1Body'),
    },
    {
      icon: Wrench,
      title: t('benefit2Title'),
      body: t('benefit2Body'),
    },
    {
      icon: Clock3,
      title: t('benefit3Title'),
      body: t('benefit3Body'),
    },
    {
      icon: MapPinned,
      title: t('benefit4Title'),
      body: t('benefit4Body'),
    },
  ];

  const faqs = [
    { question: t('faq1Q'), answer: t('faq1A') },
    { question: t('faq2Q'), answer: t('faq2A') },
    { question: t('faq3Q'), answer: t('faq3A') },
  ];

  return (
    <section className="section-y bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.06),transparent_30%),#ffffff]">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">{t('eyebrow')}</p>
          <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map(({ icon: Icon, title, body }, index) => (
            <div
              key={title}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_18px_40px_rgba(14,165,233,0.10)]"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-brand-50 text-sky-700 ring-1 ring-sky-100">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-card">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              <MapPinned className="size-4" aria-hidden="true" />
              {t('coverageTitle')}
            </div>
            <h3 className="mt-4 text-2xl font-bold text-navy">{t('coverageSubtitle')}</h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{t('coverageText')}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {site.cities.map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700"
                >
                  {city}
                </span>
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-sky-700"
            >
              {t('coverageCta')}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              <Sparkles className="size-4" aria-hidden="true" />
              {t('faqTitle')}
            </div>

            <div className="mt-6 space-y-4">
              {faqs.map((item) => (
                <div key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h4 className="text-base font-semibold text-navy">{item.question}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
