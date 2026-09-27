'use client';

import { useMemo, useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, Check, Info, Loader2, PartyPopper } from 'lucide-react';

import {
  quoteSchema,
  QUOTE_STEP_FIELDS,
  SERVICE_CATEGORIES,
  PROPERTY_TYPES,
  type QuoteInput,
} from '@/schemas/quote.schema';
import { estimateQuote } from '@/lib/estimate';
import { submitQuote } from '@/actions/quote.actions';
import { site } from '@/lib/site';
import { formatMAD, cn } from '@/lib/utils';
import { Link } from '@/i18n/routing';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label, FieldError } from '@/components/ui/label';
import { RadioGroup, RadioCard } from '@/components/ui/radio-group';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { ServiceIcon } from '@/components/shared/ServiceIcon';

const CATEGORY_META: Record<string, { icon: string; fr: string; ar: string }> = {
  INSTALLATION_CLIM: { icon: 'AirVent', fr: 'Installation de climatisation', ar: 'تركيب التكييف' },
  B13_PLATRE: { icon: 'PaintRoller', fr: 'B13 Plâtre', ar: 'بلاتر B13' },
  PRODUITS_CLIM: { icon: 'ShoppingBag', fr: 'Produits de climatisation', ar: 'منتجات التكييف' },
  MAINTENANCE: { icon: 'Wrench', fr: 'Maintenance et entretien', ar: 'الصيانة والعناية' },
  VENTILATION: { icon: 'Fan', fr: 'Ventilation', ar: 'التهوية' },
  VENTILATION_CAISSON: { icon: 'Wind', fr: 'Deshumidificateur', ar: 'أجهزة الترطيب' },
  POMPE_CHALEUR: { icon: 'Flame', fr: 'Pompe à chaleur', ar: 'مضخة حرارية' },
  CTA: { icon: 'Layers', fr: 'CTA — traitement d\'air', ar: 'مركزية معالجة الهواء' },
  PLOMBERIE: { icon: 'Droplets', fr: 'Plomberie', ar: 'السباكة' },
};

const TOTAL_STEPS = QUOTE_STEP_FIELDS.length;

export function QuoteWizard() {
  const t = useTranslations('quote');
  const tc = useTranslations('common');
  const locale = useLocale() as 'fr' | 'ar';

  const [step, setStep] = useState(0);
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ reference: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    mode: 'onTouched',
    defaultValues: {
      category: undefined,
      propertyType: undefined,
      surfaceM2: undefined,
      roomsCount: undefined,
      city: '',
      fullName: '',
      phone: '',
      email: '',
      preferredDate: '',
      message: '',
      website: '',
      consent: undefined,
    } as unknown as QuoteInput,
  });

  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = form;

  const watched = watch();

  // Estimation recalculée à la volée dès que le bien est décrit.
  const estimate = useMemo(() => {
    if (!watched.category || !watched.propertyType || !watched.surfaceM2) return null;
    return estimateQuote({
      category: watched.category,
      propertyType: watched.propertyType,
      surfaceM2: Number(watched.surfaceM2),
      roomsCount: watched.roomsCount ? Number(watched.roomsCount) : undefined,
    });
  }, [watched.category, watched.propertyType, watched.surfaceM2, watched.roomsCount]);

  async function goNext() {
    // QUOTE_STEP_FIELDS est readonly ; trigger() attend un tableau mutable.
    const fields = [...QUOTE_STEP_FIELDS[step]] as (keyof QuoteInput)[];
    const valid = await trigger(fields, { shouldFocus: true });
    if (valid) setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function onSubmit(values: QuoteInput) {
    setSubmitError(null);
    startTransition(async () => {
      const res = await submitQuote(values);
      if (res.ok && res.reference) setResult({ reference: res.reference });
      else setSubmitError(res.message ?? t('error.body', { phone: site.phone }));
    });
  }

  // ---------- Écran de confirmation ----------
  if (result) {
    return (
      <div className="mx-auto max-w-xl rounded-xl border border-border bg-white p-8 text-center shadow-card">
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <PartyPopper className="size-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl font-bold">{t('success.title')}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {t('success.body', { reference: result.reference })}
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex h-12 items-center justify-center rounded-lg bg-navy px-6
                     text-sm font-semibold text-white cursor-pointer
                     transition-colors duration-200 hover:bg-navy-600"
        >
          {t('success.backHome')}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progression : libellé textuel en plus de la barre, jamais la couleur seule */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
          <span>{t('stepOf', { current: step + 1, total: TOTAL_STEPS })}</span>
          <span className="font-semibold text-navy">
            {[t('steps.service'), t('steps.property'), t('steps.contact')][step]}
          </span>
        </div>
        <div
          className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-100"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
        >
          <div
            className="h-full rounded-full bg-brand-600 transition-[width] duration-300"
            style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="rounded-xl border border-border bg-white p-6 shadow-card md:p-8"
      >
        {/* Honeypot : invisible pour l'utilisateur, retiré du parcours clavier */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Site web</label>
          <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
        </div>

        {/* ---------- Étape 1 : prestation ---------- */}
        {step === 0 && (
          <fieldset>
            <legend className="mb-5 text-lg font-semibold text-navy">{t('fields.category')}</legend>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="sm:grid-cols-2"
                >
                  {SERVICE_CATEGORIES.map((key) => (
                    <RadioCard
                      key={key}
                      value={key}
                      title={CATEGORY_META[key][locale]}
                      icon={<ServiceIcon name={CATEGORY_META[key].icon} className="size-5" />}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            <FieldError>{errors.category?.message}</FieldError>
          </fieldset>
        )}

        {/* ---------- Étape 2 : le bien ---------- */}
        {step === 1 && (
          <div className="space-y-7">
            <fieldset>
              <legend className="mb-4 text-lg font-semibold text-navy">
                {t('fields.propertyType')}
              </legend>
              <Controller
                control={control}
                name="propertyType"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="sm:grid-cols-3"
                  >
                    {PROPERTY_TYPES.map((key) => (
                      <RadioCard key={key} value={key} title={t(`propertyTypes.${key}`)} />
                    ))}
                  </RadioGroup>
                )}
              />
              <FieldError>{errors.propertyType?.message}</FieldError>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="surfaceM2">{t('fields.surfaceM2')}</Label>
                <Input
                  id="surfaceM2"
                  type="number"
                  inputMode="numeric"
                  min={5}
                  className="mt-1.5"
                  aria-invalid={Boolean(errors.surfaceM2)}
                  aria-describedby={errors.surfaceM2 ? 'surfaceM2-error' : undefined}
                  {...register('surfaceM2')}
                />
                <FieldError id="surfaceM2-error">{errors.surfaceM2?.message}</FieldError>
              </div>

              <div>
                <Label htmlFor="roomsCount">
                  {t('fields.roomsCount')}{' '}
                  <span className="font-normal text-muted-foreground">({tc('optional')})</span>
                </Label>
                <Input
                  id="roomsCount"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  className="mt-1.5"
                  aria-invalid={Boolean(errors.roomsCount)}
                  {...register('roomsCount')}
                />
                <FieldError>{errors.roomsCount?.message}</FieldError>
              </div>
            </div>

            <div>
              <Label htmlFor="city">{t('fields.city')}</Label>
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="city"
                      className="mt-1.5"
                      aria-invalid={Boolean(errors.city)}
                    >
                      <SelectValue placeholder={t('fields.cityPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {site.cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError>{errors.city?.message}</FieldError>
            </div>

            <EstimateBox estimate={estimate} />
          </div>
        )}

        {/* ---------- Étape 3 : coordonnées ---------- */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="fullName">{t('fields.fullName')}</Label>
                <Input
                  id="fullName"
                  autoComplete="name"
                  className="mt-1.5"
                  aria-invalid={Boolean(errors.fullName)}
                  {...register('fullName')}
                />
                <FieldError>{errors.fullName?.message}</FieldError>
              </div>

              <div>
                <Label htmlFor="phone">{t('fields.phone')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className="mt-1.5"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby="phone-help"
                  {...register('phone')}
                />
                <p id="phone-help" className="mt-1.5 text-sm text-muted-foreground">
                  {t('fields.phoneHelp')}
                </p>
                <FieldError>{errors.phone?.message}</FieldError>
              </div>

              <div>
                <Label htmlFor="email">
                  {t('fields.email')}{' '}
                  <span className="font-normal text-muted-foreground">({tc('optional')})</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="mt-1.5"
                  aria-invalid={Boolean(errors.email)}
                  {...register('email')}
                />
                <FieldError>{errors.email?.message}</FieldError>
              </div>

              <div>
                <Label htmlFor="preferredDate">
                  {t('fields.preferredDate')}{' '}
                  <span className="font-normal text-muted-foreground">({tc('optional')})</span>
                </Label>
                <Input id="preferredDate" type="date" className="mt-1.5" {...register('preferredDate')} />
              </div>
            </div>

            <div>
              <Label htmlFor="message">
                {t('fields.message')}{' '}
                <span className="font-normal text-muted-foreground">({tc('optional')})</span>
              </Label>
              <Textarea
                id="message"
                rows={4}
                className="mt-1.5"
                placeholder={t('fields.messagePlaceholder')}
                {...register('message')}
              />
              <FieldError>{errors.message?.message}</FieldError>
            </div>

            <EstimateBox estimate={estimate} />

            <div className="flex items-start gap-3 rounded-lg bg-background p-4">
              <input
                id="consent"
                type="checkbox"
                className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-input text-brand-600
                           focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-invalid={Boolean(errors.consent)}
                {...register('consent')}
              />
              <div>
                <Label htmlFor="consent" className="font-normal leading-relaxed">
                  {t('fields.consent')}
                </Label>
                <FieldError>{errors.consent?.message}</FieldError>
              </div>
            </div>

            {submitError ? (
              <p role="alert" className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
                <strong className="block">{t('error.title')}</strong>
                {submitError}
              </p>
            ) : null}
          </div>
        )}

        {/* ---------- Navigation ---------- */}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0 || pending}
            className={cn(
              'inline-flex h-12 items-center gap-2 rounded-lg px-5 text-sm font-semibold text-navy',
              'cursor-pointer transition-colors duration-200 hover:bg-brand-50',
              'disabled:pointer-events-none disabled:opacity-0',
            )}
          >
            <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
            {tc('back')}
          </button>

          {step < TOTAL_STEPS - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-navy px-7 text-sm font-semibold
                         text-white cursor-pointer transition-colors duration-200 hover:bg-navy-600"
            >
              {tc('next')}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-cta px-7 text-sm font-semibold
                         text-white cursor-pointer transition-colors duration-200 hover:bg-cta-hover
                         disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  {tc('sending')}
                </>
              ) : (
                <>
                  <Check className="size-4" aria-hidden="true" />
                  {tc('submit')}
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function EstimateBox({ estimate }: { estimate: ReturnType<typeof estimateQuote> | null }) {
  const t = useTranslations('quote.estimate');
  if (!estimate) return null;

  return (
    <div
      aria-live="polite"
      className="rounded-xl border border-brand-200 bg-brand-50 p-5"
    >
      <p className="flex items-center gap-2 text-sm font-semibold text-brand-800">
        <Info className="size-4" aria-hidden="true" />
        {t('title')}
      </p>

      {estimate.requiresSurvey ? (
        <p className="mt-2 text-sm leading-relaxed text-brand-900">{t('survey')}</p>
      ) : (
        <>
          <p className="mt-2 font-heading text-2xl font-bold text-navy">
            {t('range', { min: formatMAD(estimate.min), max: formatMAD(estimate.max) })}
          </p>
          {estimate.estimatedBtu > 0 ? (
            <p className="mt-1 text-sm text-brand-800">
              {t('btu', { btu: estimate.estimatedBtu, units: estimate.units })}
            </p>
          ) : null}
        </>
      )}

      {/* Mention obligatoire : l'estimation n'engage pas l'entreprise */}
      <p className="mt-3 border-t border-brand-200 pt-3 text-xs leading-relaxed text-brand-900/80">
        {t('disclaimer')}
      </p>
    </div>
  );
}
