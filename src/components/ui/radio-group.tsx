'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn('grid gap-3', className)} {...props} />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/**
 * Option présentée sous forme de carte cliquable.
 * L'état sélectionné est signalé par la bordure ET la pastille : jamais par
 * la couleur seule.
 */
const RadioCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    title: string;
    description?: string;
    icon?: React.ReactNode;
  }
>(({ className, title, description, icon, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'group relative flex w-full items-start gap-3 rounded-xl border-2 border-border bg-white p-4 text-start',
      'cursor-pointer transition-colors duration-200 hover:border-brand-300 hover:bg-brand-50/50',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'data-[state=checked]:border-brand-600 data-[state=checked]:bg-brand-50',
      className,
    )}
    {...props}
  >
    {icon ? (
      <span className="mt-0.5 text-brand-600 group-data-[state=checked]:text-brand-700">{icon}</span>
    ) : null}

    <span className="flex-1">
      <span className="block font-semibold text-navy">{title}</span>
      {description ? (
        <span className="mt-0.5 block text-sm text-muted-foreground">{description}</span>
      ) : null}
    </span>

    <span
      aria-hidden="true"
      className={cn(
        'mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-border',
        'transition-colors duration-200 group-data-[state=checked]:border-brand-600',
      )}
    >
      <span className="size-2.5 rounded-full bg-brand-600 opacity-0 transition-opacity duration-200 group-data-[state=checked]:opacity-100" />
    </span>
  </RadioGroupPrimitive.Item>
));
RadioCard.displayName = 'RadioCard';

export { RadioGroup, RadioCard };
