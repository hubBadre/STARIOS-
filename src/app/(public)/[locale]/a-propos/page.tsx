import {
  ArrowRight,
  BadgeCheck,
  Leaf,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { AppLocale } from '@/i18n/routing';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';
import { Logo } from '@/components/layout/Logo';

export const metadata = {
  title: 'À propos - Starios',
  description: "Qui nous sommes, notre mission et notre savoir-faire en climatisation.",
};

const valueIcons = [Leaf, ShieldCheck, Wrench] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'about' });
  const tc = await getTranslations({ locale, namespace: 'common' });

  const values = valueIcons.map((icon, index) => ({
    icon,
    title: t(`values.${index}.title`),
    text: t(`values.${index}.text`),
  }));

  const differentiators = Array.from({ length: 3 }, (_, index) => ({
    title: t(`differentiators.${index}.title`),
    text: t(`differentiators.${index}.text`),
  }));

  const process = Array.from({ length: 4 }, (_, index) => t(`process.${index}`));
  const points = Array.from({ length: 3 }, (_, index) => t(`adnPoints.${index}`));

  const stats = [
    { value: '18+', label: t('stats.experience') },
    { value: '5 000+', label: t('stats.projects') },
    { value: '98%', label: t('stats.satisfaction') },
  ];

  return (
    <main className="container relative py-12 md:py-16">
      <div className="pointer-events-none absolute inset-x-0 -top-12 h-64 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.2),transparent_60%)] blur-3xl" />

      <section className="relative mb-16 overflow-hidden rounded-[2rem] border border-sky-100 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <div className="grid gap-10 p-6 md:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
          <div className="flex flex-col justify-center">
            <div className="mb-6 flex justify-center lg:justify-start">
              <Logo
                size="lg"
                motion="float"
                variant="luxury"
                className="drop-shadow-[0_12px_28px_rgba(14,165,233,0.18)]"
              />
            </div>

            <SectionHeading
              eyebrow={t('eyebrow')}
              title={t('title')}
              subtitle={t('subtitle')}
              align="start"
              className="max-w-xl"
            />

            <Reveal className="mt-8">
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {t('intro')}
              </p>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/${locale}/contact`} className="btn-primary inline-flex items-center gap-2">
                {t('ctaPrimary')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
              >
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((stat) => (
              <Reveal key={stat.label}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <div className="text-3xl font-extrabold text-navy">{stat.value}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-16">
        <SectionHeading
          eyebrow={t('whyEyebrow')}
          title={t('whyTitle')}
          subtitle={t('whySubtitle')}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <Reveal key={value.title}>
                <div className="group h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_18px_40px_rgba(14,165,233,0.12)]">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mb-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)] md:p-8">
          <SectionHeading
            eyebrow={t('diffEyebrow')}
            title={t('diffTitle')}
            subtitle={t('diffSubtitle')}
            align="start"
            className="max-w-2xl"
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {differentiators.map((item) => (
              <Reveal key={item.title}>
                <div className="h-full rounded-2xl border border-sky-100 bg-sky-50/60 p-5">
                  <div className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-sky-700 ring-1 ring-sky-200">
                    0{differentiators.indexOf(item) + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-16 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-sky-200 ring-1 ring-white/10">
            <Sparkles className="h-4 w-4" />
            {t('adnBadge')}
          </div>
          <h3 className="text-3xl font-bold">{t('adnTitle')}</h3>
          <p className="mt-4 text-slate-200">{t('adnBody')}</p>
          <div className="mt-8 space-y-4">
            {points.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 text-sky-300" />
                <span className="text-sm text-slate-100">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-slate-50 p-8">
          <SectionHeading
            title={t('methodTitle')}
            subtitle={t('methodSubtitle')}
            align="start"
            className="max-w-lg"
          />

          <div className="mt-8 space-y-4">
            {process.map((step, index) => (
              <div key={step} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 font-bold text-sky-700">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-relaxed text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex justify-center">
        <div className="w-full max-w-4xl rounded-[2rem] border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-slate-50 p-8 text-center shadow-[0_16px_35px_rgba(14,165,233,0.08)] md:p-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
            <Zap className="h-4 w-4" />
            {t('finalBadge')}
          </div>
          <h3 className="text-3xl font-bold text-navy">{t('finalTitle')}</h3>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t('finalBody')}</p>
          <div className="mt-8 flex justify-center">
            <Link href={`/${locale}/contact`} className="btn-primary inline-flex items-center gap-2">
              {t('finalCta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
