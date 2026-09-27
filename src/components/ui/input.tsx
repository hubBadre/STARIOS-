import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        // text-base (16px) : en dessous, iOS zoome automatiquement au focus
        'flex h-12 w-full rounded-lg border border-input bg-white px-4 py-2 text-base text-navy',
        'placeholder:text-muted-foreground/70',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/30',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export { Input };
