import { useTranslations, useLocale } from 'next-intl';
import { Star, Quote } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';

interface TestimonialLike {
  id: string;
  authorName: string;
  city: string;
  role: string | null;
  rating: number;
  contentFr: string;
  contentAr: string;
}

export function Testimonials({ testimonials }: { testimonials: TestimonialLike[] }) {
  const t = useTranslations('home.testimonials');
  const locale = useLocale() as 'fr' | 'ar';

  if (testimonials.length === 0) {
    return (
      <section className="section-y">
        <div className="container">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
          <p className="mt-8 text-center text-muted-foreground">{t('empty')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-y bg-background">
      <div className="container">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 10).map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <figure className="flex h-full flex-col rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(14,165,233,0.08)]">
                <div className="flex items-center justify-between">
                  <Quote className="size-7 text-sky-200" aria-hidden="true" />
                  <div className="flex items-center gap-0.5" role="img" aria-label={`${item.rating} / 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        aria-hidden="true"
                        className={
                          i < item.rating
                            ? 'size-4 fill-amber-400 text-amber-400'
                            : 'size-4 text-slate-300'
                        }
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-slate-700">
                  {locale === 'fr' ? item.contentFr : item.contentAr}
                </blockquote>

                <figcaption className="mt-5 border-t border-slate-200 pt-4">
                  <p className="font-semibold text-navy">{item.authorName}</p>
                  <p className="text-sm text-muted-foreground">
                    {[item.role, item.city].filter(Boolean).join(' · ')}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
