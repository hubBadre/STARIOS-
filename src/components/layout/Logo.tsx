import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  inverted,
  size = 'md',
  motion = 'none',
  variant = 'luxury',
}: {
  className?: string;
  inverted?: boolean;
  size?: 'sm' | 'md' | 'lg';
  motion?: 'none' | 'float' | 'pulse' | 'rotate';
  variant?: 'default' | 'luxury';
}) {
  const isLarge = size === 'lg';
  const motionClass =
    motion === 'none' ? '' : motion === 'pulse' ? 'logo-pulse' : motion === 'float' ? 'logo-float' : 'logo-rotate';
  const isLuxury = variant === 'luxury';

  return (
    <span className={cn('inline-flex items-center gap-2.5', isLarge && 'gap-3', className)}>
      <span
        className={cn(
          'relative flex shrink-0 items-center justify-center overflow-hidden transition-none',
          isLarge ? 'size-20' : 'size-14',
          isLuxury
            ? 'rounded-[1.35rem] border border-sky-200/70 bg-gradient-to-br from-white via-sky-50 to-slate-100 shadow-[0_18px_40px_rgba(14,165,233,0.14)] ring-1 ring-white/70'
            : 'rounded-lg bg-white shadow-sm',
          motionClass,
        )}
      >
        {isLuxury && (
          <span className="absolute inset-0 rounded-[1.35rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),transparent_52%)]" />
        )}
        <span
          className={cn(
            'relative z-10 flex items-center justify-center overflow-hidden',
            isLuxury ? 'size-[78%] rounded-[1rem] bg-white/80' : 'size-full',
          )}
        >
          <Image
            src="/images/logo.jpg"
            alt="Starios"
            width={isLarge ? 80 : 56}
            height={isLarge ? 80 : 56}
            className="size-full object-contain"
            priority
          />
        </span>
      </span>
      <span
        className={cn(
          'font-heading font-black tracking-[-0.04em]',
          isLarge ? 'text-4xl' : 'text-2xl',
          inverted ? 'text-white' : 'text-navy',
          isLuxury && (inverted ? 'drop-shadow-[0_8px_16px_rgba(255,255,255,0.15)]' : 'drop-shadow-[0_8px_16px_rgba(15,23,42,0.08)]'),
        )}
      >
        Starios
      </span>
    </span>
  );
}
