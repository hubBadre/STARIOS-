import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'start' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-start',
        className,
      )}
    >
      {eyebrow ? <p className="section-eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      {subtitle ? (
        // max-w-prose garde la ligne autour de 65-75 caractères
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}
