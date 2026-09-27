'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Check, Loader2, Send } from 'lucide-react';

import { contactSchema, type ContactInput } from '@/schemas/contact.schema';
import { submitContact } from '@/actions/contact.actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label, FieldError } from '@/components/ui/label';

export function ContactForm() {
  const t = useTranslations('contact');
  const tc = useTranslations('common');

  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
  });

  function onSubmit(values: ContactInput) {
    setError(null);
    startTransition(async () => {
      const res = await submitContact(values);
      if (res.ok) {
        setSent(true);
        reset();
      } else {
        setError(t('error'));
      }
    });
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-8 text-center">
        <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-white text-brand-700">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-4 font-semibold text-navy">{t('success')}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-xl border border-border bg-white p-6 shadow-card md:p-8"
    >
      <h2 className="text-xl font-semibold">{t('formTitle')}</h2>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="c-website">Site web</label>
        <input id="c-website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-name">{t('fields.fullName')}</Label>
          <Input
            id="c-name"
            autoComplete="name"
            className="mt-1.5"
            aria-invalid={Boolean(errors.fullName)}
            {...register('fullName')}
          />
          <FieldError>{errors.fullName?.message}</FieldError>
        </div>

        <div>
          <Label htmlFor="c-email">{t('fields.email')}</Label>
          <Input
            id="c-email"
            type="email"
            autoComplete="email"
            className="mt-1.5"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-phone">
            {t('fields.phone')}{' '}
            <span className="font-normal text-muted-foreground">({tc('optional')})</span>
          </Label>
          <Input
            id="c-phone"
            type="tel"
            autoComplete="tel"
            className="mt-1.5"
            aria-invalid={Boolean(errors.phone)}
            {...register('phone')}
          />
          <FieldError>{errors.phone?.message}</FieldError>
        </div>

        <div>
          <Label htmlFor="c-subject">{t('fields.subject')}</Label>
          <Input
            id="c-subject"
            className="mt-1.5"
            aria-invalid={Boolean(errors.subject)}
            {...register('subject')}
          />
          <FieldError>{errors.subject?.message}</FieldError>
        </div>
      </div>

      <div>
        <Label htmlFor="c-message">{t('fields.message')}</Label>
        <Textarea
          id="c-message"
          rows={5}
          className="mt-1.5"
          aria-invalid={Boolean(errors.message)}
          {...register('message')}
        />
        <FieldError>{errors.message?.message}</FieldError>
      </div>

      {error ? (
        <p role="alert" className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-cta px-7
                   text-sm font-semibold text-white cursor-pointer transition-colors duration-200
                   hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            {tc('sending')}
          </>
        ) : (
          <>
            <Send className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            {tc('submit')}
          </>
        )}
      </button>
    </form>
  );
}
