import { useTranslations } from 'next-intl';
import { Calculator, PackageCheck, Ruler, LifeBuoy, Star, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';

export function WhyUs() {
  const t = useTranslations('home.why');

  const items = [
    { icon: Calculator, title: t('item1Title'), body: t('item1Body') },
    { icon: PackageCheck, title: t('item2Title'), body: t('item2Body') },
    { icon: Ruler, title: t('item3Title'), body: t('item3Body') },
    { icon: LifeBuoy, title: t('item4Title'), body: t('item4Body') },
  ];

  const highlights = [
    { title: t('highlight1Title'), body: t('highlight1Body') },
    { title: t('highlight2Title'), body: t('highlight2Body') },
    { title: t('highlight3Title'), body: t('highlight3Body') },
  ];

  const steps = [
    { title: t('process1Title'), body: t('process1Body') },
    { title: t('process2Title'), body: t('process2Body') },
    { title: t('process3Title'), body: t('process3Body') },
  ];

  return (
    <section className="section-y bg-brand-50/60">
      <div className="container">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          align="start"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map(({ icon: Icon, title, body }, index) => (
            <Reveal key={title} delay={index * 0.05}>
              <div className="flex h-full gap-4 rounded-xl border border-border bg-white p-6 shadow-card">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-sky-100 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="bg-gradient-to-br from-sky-50 via-white to-slate-50 p-8 md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                <Sparkles className="size-4" />
                {t('proofLabel')}
              </div>
              <h3 className="mt-5 text-3xl font-bold text-navy">{t('proofTitle')}</h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                {t('proofBody')}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                      <Star className="size-4" />
                    </div>
                    <h4 className="text-base font-semibold text-navy">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center bg-navy p-8 text-white md:p-10">
              <p className="text-sm uppercase tracking-[0.18em] text-sky-200">{t('reviewLabel')}</p>
              <div className="mt-6 text-5xl font-black leading-none">4.9/5</div>
              <p className="mt-4 text-lg font-medium text-slate-200">{t('reviewText')}</p>
              <div className="mt-8 space-y-3 text-sm text-slate-200">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>{t('reviewMetric1')}</span>
                  <span className="font-semibold text-white">{t('reviewMetric1Value')}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>{t('reviewMetric2')}</span>
                  <span className="font-semibold text-white">{t('reviewMetric2Value')}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>{t('reviewMetric3')}</span>
                  <span className="font-semibold text-white">{t('reviewMetric3Value')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.04)] md:p-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={t('processEyebrow')}
              title={t('processTitle')}
              subtitle={t('processSubtitle')}
              align="start"
              className="max-w-xl"
            />
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
              <CheckCircle2 className="size-4" />
              {t('processNote')}
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08}>
                <div className="group h-full rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-sky-200 hover:bg-white hover:shadow-[0_10px_28px_rgba(14,165,233,0.09)]">
                  <div className="mb-5 inline-flex size-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-navy">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
                    {t('processCta')}
                    <ArrowRight className="size-4" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
